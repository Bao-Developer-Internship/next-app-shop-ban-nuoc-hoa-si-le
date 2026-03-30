/**
 * POST /api/auth/reset-password
 * Body: { token, newPassword }
 * Xác thực JWT token và cập nhật mật khẩu mới
 */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu tối thiểu 6 ký tự' }, { status: 400 });
    }

    // Xác thực và giải mã JWT token
    let payload: { userId: string; email: string; purpose: string };
    try {
      payload = jwt.verify(token, JWT_SECRET) as typeof payload;
    } catch {
      return NextResponse.json({ error: 'Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn' }, { status: 400 });
    }

    if (payload.purpose !== 'password-reset') {
      return NextResponse.json({ error: 'Token không hợp lệ' }, { status: 400 });
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: 'Không thể kết nối cơ sở dữ liệu' }, { status: 503 });
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ error: 'Người dùng không tồn tại' }, { status: 404 });
    }

    // Hash mật khẩu mới và lưu
    user.password = await hashPassword(newPassword);
    await user.save();

    return NextResponse.json({ message: 'Đặt lại mật khẩu thành công' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
