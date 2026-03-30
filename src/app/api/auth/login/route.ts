/**
 * POST /api/auth/login
 * Xử lý đăng nhập cho cả user và admin
 * Body: { email, password }
 */
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu tối thiểu 6 ký tự'),
});

// Mock users DB (thay bằng MongoDB sau)
const MOCK_USERS = [
  {
    id: 'test-user-001',
    email: 'user@luxescent.vn',
    password: 'User@123456',
    name: 'Nguyễn Thị Mai',
    phone: '0901234567',
    role: 'customer',
    address: '123 Nguyễn Huệ, Q.1, TP.HCM',
  },
  {
    id: 'admin-default',
    email: 'admin@luxescent.com',
    password: 'Admin@123456',
    name: 'Admin Luxe Scent',
    role: 'admin',
  },
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // Tìm user (check localStorage users + mock users)
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { error: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    // Tạo token đơn giản (production: dùng JWT)
    const token = `${user.role}-token-${Date.now()}-${user.id}`;
    const { password: _, ...safeUser } = user;

    return NextResponse.json({ user: { ...safeUser, password }, token }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
