/**
 * GET /api/admin/dashboard — Thống kê dashboard
 * Chỉ tính đơn hàng có status: pending | processing | shipping | completed
 * Không tính: cancelled
 */
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { PRODUCTS_DB } from '@/app/api/products/route';

const COUNTED_STATUSES = ['pending', 'processing', 'shipping', 'completed'];

export async function GET() {
  try {
    await connectDB();

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    // --- Tổng doanh thu (completed only) ---
    const revenueAgg = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    const totalRevenue = revenueAgg[0]?.total || 0;

    // --- Doanh thu tháng này vs tháng trước (completed) ---
    const revenueThisMonth = await Order.aggregate([
      { $match: { status: 'completed', createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    const revenueLastMonth = await Order.aggregate([
      { $match: { status: 'completed', createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    const revThisM = revenueThisMonth[0]?.total || 0;
    const revLastM = revenueLastMonth[0]?.total || 1;
    const revGrowth = Math.round(((revThisM - revLastM) / revLastM) * 100);

    // --- Đơn hàng (không tính cancelled) ---
    const totalOrders = await Order.countDocuments({ status: { $in: COUNTED_STATUSES } });
    const ordersThisMonth = await Order.countDocuments({ status: { $in: COUNTED_STATUSES }, createdAt: { $gte: startOfMonth } });
    const ordersLastMonth = await Order.countDocuments({ status: { $in: COUNTED_STATUSES }, createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } });
    const orderGrowth = ordersLastMonth > 0 ? Math.round(((ordersThisMonth - ordersLastMonth) / ordersLastMonth) * 100) : 0;

    // --- Khách sỉ (wholesale orders, không tính cancelled) ---
    const wholesaleOrders = await Order.countDocuments({ type: 'wholesale', status: { $in: COUNTED_STATUSES } });
    const wholesaleThisMonth = await Order.countDocuments({ type: 'wholesale', status: { $in: COUNTED_STATUSES }, createdAt: { $gte: startOfMonth } });
    const wholesaleLastMonth = await Order.countDocuments({ type: 'wholesale', status: { $in: COUNTED_STATUSES }, createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } });
    const wholesaleGrowth = wholesaleLastMonth > 0 ? Math.round(((wholesaleThisMonth - wholesaleLastMonth) / wholesaleLastMonth) * 100) : 0;

    // --- Tổng sản phẩm ---
    const totalProducts = PRODUCTS_DB.length;

    // --- Doanh thu 6 tháng gần nhất (completed) ---
    const monthlyRevenue = [];
    for (let i = 5; i >= 0; i--) {
      const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
      const agg = await Order.aggregate([
        { $match: { status: 'completed', createdAt: { $gte: start, $lte: end } } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]);
      monthlyRevenue.push({
        month: start.toLocaleDateString('vi-VN', { month: 'short', year: '2-digit' }),
        revenue: agg[0]?.total || 0,
      });
    }

    // --- Đơn hàng gần đây (10 đơn mới nhất, không tính cancelled) ---
    const recentOrders = await Order.find({ status: { $in: COUNTED_STATUSES } })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // --- Phân bổ theo trạng thái ---
    const statusBreakdown = await Order.aggregate([
      { $match: { status: { $in: COUNTED_STATUSES } } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    return NextResponse.json({
      stats: {
        totalRevenue,
        revGrowth,
        totalOrders,
        orderGrowth,
        totalProducts,
        wholesaleOrders,
        wholesaleGrowth,
      },
      monthlyRevenue,
      recentOrders,
      statusBreakdown,
    });
  } catch (err) {
    console.error('Dashboard API error:', err);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
