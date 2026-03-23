/**
 * POST /api/auth/register
 * Đăng ký tài khoản mới
 * Body: { name, email, phone, password }
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

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

    // Trong production: kiểm tra DB, hash password với bcrypt
    // Hiện tại: lưu vào localStorage phía client (xử lý ở login page)
    const newUser = {
      id: `user-${Date.now()}`,
      name, email, phone,
      role: 'customer',
      joinDate: new Date().toLocaleDateString('vi-VN'),
    };

    const token = `customer-token-${Date.now()}-${newUser.id}`;

    return NextResponse.json({ user: newUser, token }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
