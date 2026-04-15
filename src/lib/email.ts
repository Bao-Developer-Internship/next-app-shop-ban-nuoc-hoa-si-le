import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  await transporter.sendMail({
    from: `"Luxe Scent" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Đặt lại mật khẩu - Luxe Scent',
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px">
        <h2 style="color:#1a1a1a">Đặt lại mật khẩu</h2>
        <p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào nút bên dưới để tiếp tục:</p>
        <a href="${resetUrl}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:6px">
          Đặt lại mật khẩu
        </a>
        <p style="color:#666;font-size:14px">Link có hiệu lực trong <strong>15 phút</strong>. Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
        <p style="color:#999;font-size:12px">Luxe Scent &copy; 2024</p>
      </div>
    `,
  });
}

export async function sendOrderStatusEmail(params: {
  to: string;
  customerName: string;
  orderNumber: string;
  status: string;
  cancelReason?: string;
  items?: { name: string; quantity: number; price: number }[];
  total?: number;
}) {
  const { to, customerName, orderNumber, status, cancelReason, items, total } = params;

  const statusConfig: Record<string, { subject: string; title: string; color: string; icon: string; message: string }> = {
    processing: {
      subject: `Đơn hàng #${orderNumber} đã được xác nhận`,
      title: 'Đơn hàng đã được xác nhận!',
      color: '#2563eb',
      icon: '✅',
      message: 'Chúng tôi đã xác nhận đơn hàng của bạn và đang chuẩn bị hàng.',
    },
    shipping: {
      subject: `Đơn hàng #${orderNumber} đang được giao`,
      title: 'Đơn hàng đang trên đường giao!',
      color: '#7c3aed',
      icon: '🚚',
      message: 'Đơn hàng của bạn đã được bàn giao cho đơn vị vận chuyển.',
    },
    completed: {
      subject: `Đơn hàng #${orderNumber} đã giao thành công`,
      title: 'Giao hàng thành công!',
      color: '#16a34a',
      icon: '🎉',
      message: 'Đơn hàng của bạn đã được giao thành công. Cảm ơn bạn đã tin tưởng Luxe Scent!',
    },
    cancelled: {
      subject: `Đơn hàng #${orderNumber} đã bị hủy`,
      title: 'Đơn hàng đã bị hủy',
      color: '#dc2626',
      icon: '❌',
      message: cancelReason
        ? `Đơn hàng của bạn đã bị hủy với lý do: <strong>${cancelReason}</strong>`
        : 'Đơn hàng của bạn đã bị hủy.',
    },
  };

  const cfg = statusConfig[status];
  if (!cfg) return;

  const itemsHtml = items && items.length > 0
    ? `<table style="width:100%;border-collapse:collapse;margin:16px 0">
        ${items.map(item => `
          <tr style="border-bottom:1px solid #f1f5f9">
            <td style="padding:10px 0;font-size:14px;color:#334155">${item.name} x${item.quantity}</td>
            <td style="padding:10px 0;font-size:14px;font-weight:700;color:#c5a059;text-align:right">${(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
          </tr>`).join('')}
        ${total ? `<tr><td style="padding:12px 0;font-size:15px;font-weight:700;color:#0a3d2b">Tổng cộng</td><td style="padding:12px 0;font-size:15px;font-weight:700;color:#c5a059;text-align:right">${total.toLocaleString('vi-VN')}đ</td></tr>` : ''}
      </table>` : '';

  await transporter.sendMail({
    from: `"Luxe Scent" <${process.env.SMTP_USER}>`,
    to,
    subject: cfg.subject,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">
        <div style="background:linear-gradient(135deg,#0a3d2b,#1a6b4a);padding:32px 24px;text-align:center">
          <h1 style="color:#c5a059;font-size:24px;margin:0;letter-spacing:2px">LUXE SCENT</h1>
          <p style="color:rgba(255,255,255,0.7);font-size:12px;margin:4px 0 0;letter-spacing:1px">HƯƠNG THƠM VĨNH CỬU</p>
        </div>
        <div style="padding:32px 24px">
          <div style="text-align:center;margin-bottom:24px">
            <div style="font-size:48px;margin-bottom:12px">${cfg.icon}</div>
            <h2 style="color:${cfg.color};font-size:22px;margin:0 0 8px">${cfg.title}</h2>
            <p style="color:#64748b;font-size:14px;margin:0">Mã đơn hàng: <strong style="color:#0a3d2b">#${orderNumber}</strong></p>
          </div>
          <p style="color:#334155;font-size:15px;line-height:1.7">Xin chào <strong>${customerName}</strong>,</p>
          <p style="color:#334155;font-size:15px;line-height:1.7">${cfg.message}</p>
          ${itemsHtml}
          <div style="background:#f8fafc;border-radius:12px;padding:20px;margin:24px 0;border-left:4px solid ${cfg.color}">
            <p style="margin:0;font-size:13px;color:#64748b">Nếu bạn có thắc mắc, vui lòng liên hệ chúng tôi qua email hoặc hotline.</p>
          </div>
          <div style="text-align:center;margin-top:24px">
            <a href="${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/profile" 
               style="display:inline-block;padding:12px 32px;background:#0a3d2b;color:#c5a059;text-decoration:none;border-radius:8px;font-weight:700;font-size:14px;letter-spacing:1px">
              XEM ĐƠN HÀNG
            </a>
          </div>
        </div>
        <div style="background:#f8fafc;padding:20px 24px;text-align:center;border-top:1px solid #e2e8f0">
          <p style="color:#94a3b8;font-size:12px;margin:0">Luxe Scent &copy; 2026 · Hương thơm vĩnh cửu</p>
        </div>
      </div>
    `,
  });
}
