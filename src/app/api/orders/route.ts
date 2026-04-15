/**
 * POST /api/orders — Tạo đơn hàng mới (Checkout)
 * GET  /api/orders — Lấy danh sách đơn hàng (Admin)
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

const orderSchema = z.object({
  customer: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().regex(/^0\d{9}$/),
    address: z.string().min(1),
    city: z.string().min(1),
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
  paymentMethod: z.string().optional(),
  note: z.string().optional(),
});

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

    const { customer, items, total, type, paymentMethod, note } = parsed.data;

    await connectDB();

    const orderNumber = `LX-${Date.now()}`;

    // Normalize paymentMethod về đúng enum MongoDB
    const paymentMap: Record<string, string> = {
      momo: 'momo',
      domestic_bank: 'bank_transfer',
      international_bank: 'card',
      card: 'card',
      vnpay: 'vnpay',
      bank_transfer: 'bank_transfer',
    };
    const normalizedPayment = paymentMap[paymentMethod || ''] || 'bank_transfer';

    const order = await Order.create({
      orderNumber,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      type,
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      subtotal: total,
      shippingFee: 0,
      discount: 0,
      total,
      status: 'pending',
      paymentMethod: normalizedPayment,
      shippingAddress: `${customer.address}, ${customer.city}`,
      notes: note,
    });

    return NextResponse.json({ order, message: 'Đặt hàng thành công!' }, { status: 201 });
  } catch (err) {
    console.error('POST /api/orders error:', JSON.stringify(err, null, 2));
    const message = err instanceof Error ? err.message : 'Lỗi server';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (status && status !== 'all') query.status = status;
    if (type && type !== 'all') query.type = type;
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
        { customerEmail: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({ orders, total, page, limit });
  } catch (err) {
    console.error('GET /api/orders error:', err);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
