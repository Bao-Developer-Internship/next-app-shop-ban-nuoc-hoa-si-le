/**
 * GET /api/orders/my — Lấy đơn hàng của khách hàng theo email
 */
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Thiếu email' }, { status: 400 });
    }

    await connectDB();

    const orders = await Order.find({ customerEmail: email.toLowerCase() })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ orders });
  } catch (err) {
    console.error('GET /api/orders/my error:', err);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
