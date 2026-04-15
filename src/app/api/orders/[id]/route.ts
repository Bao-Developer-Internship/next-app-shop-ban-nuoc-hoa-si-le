/**
 * PATCH /api/orders/[id] — Cập nhật trạng thái đơn hàng
 * GET   /api/orders/[id] — Lấy chi tiết đơn hàng
 */
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { sendOrderStatusEmail } from '@/lib/email';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await connectDB();
    const order = await Order.findById(id).lean();
    if (!order) return NextResponse.json({ error: 'Không tìm thấy đơn hàng' }, { status: 404 });
    return NextResponse.json({ order });
  } catch (err) {
    console.error('GET /api/orders/[id] error:', err);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    await connectDB();
    const body = await req.json();
    const { status, cancelReason } = body;

    const validStatuses = ['pending', 'processing', 'shipping', 'completed', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Trạng thái không hợp lệ' }, { status: 400 });
    }

    // Lấy đơn hàng hiện tại
    const existing = await Order.findById(id);
    if (!existing) return NextResponse.json({ error: 'Không tìm thấy đơn hàng' }, { status: 404 });

    // Cập nhật status + lịch sử + ghi chú
    const historyEntry = {
      status,
      note: cancelReason || undefined,
      changedAt: new Date(),
    };

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (cancelReason) updateData.notes = cancelReason;

    const order = await Order.findByIdAndUpdate(
      id,
      {
        $set: updateData,
        $push: { statusHistory: historyEntry },
      },
      { new: true }
    ).lean();

    // Gửi email thông báo (không block response nếu lỗi)
    if (status && existing.customerEmail) {
      sendOrderStatusEmail({
        to: existing.customerEmail,
        customerName: existing.customerName,
        orderNumber: existing.orderNumber,
        status,
        cancelReason,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items: (existing.items || []).map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: existing.total,
      }).catch(err => console.error('Send email error:', err));
    }

    return NextResponse.json({ order, message: 'Cập nhật thành công' });
  } catch (err) {
    console.error('PATCH /api/orders/[id] error:', err);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
