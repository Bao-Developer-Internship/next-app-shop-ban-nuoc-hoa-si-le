/**
 * POST /api/auth/register
 * Đăng ký tài khoản mới
 * Body: { name, email, phone, password }
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword, generateToken } from '@/lib/auth';

const registerSchema = z.object({
  name: z.string().min(2, 'Tên tối thiểu 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z.string().regex(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, phone, password } = parsed.data;

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: 'Không thể kết nối cơ sở dữ liệu' }, { status: 503 });
    }

    // Kiểm tra email đã tồn tại chưa
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'Email đã được sử dụng' }, { status: 409 });
    }

    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashed,
      role: 'retail',
      isActive: true,
    });

    const token = generateToken({ id: user._id, email: user.email, role: user.role });

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        joinDate: new Date().toLocaleDateString('vi-VN'),
      },
      token,
    }, { status: 201 });
  } catch (err) {
    console.error('POST /api/auth/register error:', err);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
