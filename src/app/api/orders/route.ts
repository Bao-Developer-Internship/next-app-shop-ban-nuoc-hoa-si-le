/**
 * POST /api/orders — Tạo đơn hàng mới (Checkout)
 * GET  /api/orders — Lấy danh sách đơn hàng (Admin)
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const orderSchema = z.object({
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().regex(/^0\d{9}$/),
    address: z.string().min(10),
    city: z.string().min(2),
  }),
  items: z.array(z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number().min(1),
    image: z.string(),
  })).min(1),
  total: z.number().positive(),
  type: z.enum(['retail', 'wholesale']),
  note: z.string().optional(),
});

// In-memory orders store (thay bằng MongoDB sau)
const orders: unknown[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const order = {
      id: `ORD-${Date.now()}`,
      ...parsed.data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    orders.push(order);

    return NextResponse.json({ order, message: 'Đặt hàng thành công!' }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ orders, total: orders.length });
}
