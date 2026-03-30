/**
 * POST /api/auth/forgot-password
 * Body: { email }
 * Tạo JWT reset token (15 phút) và gửi email
 */
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendPasswordResetEmail } from '@/lib/email';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Vui lòng nhập email' }, { status: 400 });
    }

    const db = await connectDB();

    // Luôn trả về thành công để tránh lộ thông tin user tồn tại
    if (!db) {
      return NextResponse.json({ message: 'Nếu email tồn tại, bạn sẽ nhận được hướng dẫn.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      // Tạo JWT token có thời hạn 15 phút, nhúng userId + email
      const resetToken = jwt.sign(
        { userId: user._id.toString(), email: user.email, purpose: 'password-reset' },
        JWT_SECRET,
        { expiresIn: '15m' }
      );

      const resetUrl = `${BASE_URL}/reset-password?token=${resetToken}`;
      await sendPasswordResetEmail(user.email, resetUrl);
    }

    return NextResponse.json({ message: 'Nếu email tồn tại, bạn sẽ nhận được hướng dẫn.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}
