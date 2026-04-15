/**
 * POST /api/auth/login
 * Xử lý đăng nhập cho cả user và admin
 * Body: { email, password }
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyPassword, generateToken } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // Kiểm tra admin mặc định từ env (không cần DB)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@luxescent.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    if (email === adminEmail && password === adminPassword) {
      const token = generateToken({ id: 'admin-default', email, role: 'admin' });
      return NextResponse.json({
        user: { id: 'admin-default', email, name: 'Admin Luxe Scent', role: 'admin' },
        token,
      });
    }

    // Tìm trong MongoDB
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: 'Không thể kết nối cơ sở dữ liệu' }, { status: 503 });
    }

    const user = await User.findOne({ email: email.toLowerCase(), isActive: true });
    if (!user) {
      return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
    }

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
    }

    const token = generateToken({ id: user._id, email: user.email, role: user.role });

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.error('POST /api/auth/login error:', err);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
