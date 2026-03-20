"use client"
import Link from 'next/link';

const GOLD = '#D4AF37';
const GREEN_DARK = '#0a3d2b';

const orders = [
  { id: '#LS-9021', customer: 'Lê Nam', initials: 'LN', product: 'Midnight Rose EDP x2', price: '3.200.000đ', status: 'Hoàn thành', badge: 'badge-green', date: '22/05/2024' },
  { id: '#LS-9022', customer: 'Hà Thảo', initials: 'HT', product: 'Emerald Forest x1', price: '1.550.000đ', status: 'Đang giao', badge: 'badge-blue', date: '23/05/2024' },
  { id: '#LS-9023', customer: 'Phan Vinh', initials: 'PV', product: 'Set Discovery x3', price: '2.850.000đ', status: 'Chờ xử lý', badge: 'badge-yellow', date: '24/05/2024' },
  { id: '#LS-9024', customer: 'Minh Anh', initials: 'MA', product: 'Gold Scent V1 x1', price: '4.200.000đ', status: 'Đã hủy', badge: 'badge-red', date: '24/05/2024' },
];

const bars = [
  { month: 'THÁNG 1', height: 40, fill: 70 },
  { month: 'THÁNG 2', height: 60, fill: 85 },
  { month: 'THÁNG 3', height: 45, fill: 60 },
  { month: 'THÁNG 4', height: 80, fill: 95 },
  { month: 'THÁNG 5', height: 70, fill: 80 },
  { month: 'THÁNG 6', height: 90, fill: 100, active: true },
];

export default function DashboardPage() {
  return (
    <div style={{ padding: '40px', background: '#f6f8f7', minHeight: '100%' }}>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {[
          { icon: 'payments', iconBg: '#fefce8', iconColor: '#ca8a04', label: 'Tổng doanh thu', value: '250.000.000đ', badge: '+15.4%', badgeColor: '#16a34a' },
          { icon: 'shopping_cart', iconBg: '#eff6ff', iconColor: '#2563eb', label: 'Đơn hàng mới', value: '128', badge: '+8.2%', badgeColor: '#16a34a' },
          { icon: 'inventory', iconBg: '#faf5ff', iconColor: '#9333ea', label: 'Tổng sản phẩm', value: '452', badge: 'Ổn định', badgeColor: '#94a3b8' },
          { icon: 'storefront', iconBg: '#fefce8', iconColor: '#ca8a04', label: 'Khách sỉ mới', value: '12', badge: '+5%', badgeColor: '#16a34a' },
        ].map((card, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ padding: '10px', background: card.iconBg, borderRadius: '8px', color: card.iconColor }}>
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>{card.icon}</span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: card.badgeColor }}>{card.badge}</span>
            </div>
            <p style={{ fontSize: '11px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px 0' }}>
              {card.label}
            </p>
            <h3 style={{ fontSize: '24px', fontFamily: 'Playfair Display, serif', fontWeight: '700', color: '#0f172a', margin: 0 }}>
              {card.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', marginBottom: '40px' }}>

        {/* Bar Chart */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
                Doanh thu hàng tháng
              </h4>
              <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                Thống kê 6 tháng gần nhất
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ padding: '4px 12px', fontSize: '11px', fontWeight: '700', border: `1px solid ${GOLD}40`, borderRadius: '6px', background: `${GOLD}15`, color: '#ca8a04', cursor: 'pointer' }}>
                Năm 2024
              </button>
              <button style={{ padding: '4px 12px', fontSize: '11px', fontWeight: '700', border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                Xuất báo cáo
              </button>
            </div>
          </div>

          {/* Bars */}
          <div style={{ height: '256px', display: 'flex', alignItems: 'flex-end', gap: '24px', padding: '0 16px' }}>
            {bars.map((bar, i) => (
              <div key={i} className="bar-group">
                <div
                  className="bar-inner"
                  style={{
                    width: '100%',
                    height: `${bar.height}%`,
                    background: bar.active ? GOLD : '#f1f5f9',
                    borderRadius: '6px 6px 0 0',
                    position: 'relative',
                    borderBottom: bar.active ? `4px solid ${GOLD}` : 'none',
                    transition: 'background 0.2s',
                  }}>
                  {!bar.active && (
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: `${bar.fill}%`,
                      background: `${GOLD}40`,
                      borderRadius: '6px 6px 0 0',
                    }} />
                  )}
                </div>
                <span
                  className="bar-label"
                  style={{
                    fontSize: '9px',
                    fontWeight: '700',
                    color: bar.active ? GOLD : '#94a3b8',
                    letterSpacing: '0.05em',
                  }}>
                  {bar.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 24px 0' }}>
            Sản phẩm bán chạy
          </h4>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto' }}>
              <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#D4AF37" strokeWidth="4" strokeDasharray="40 100" strokeLinecap="round" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#0a3d2b" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-40" strokeLinecap="round" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#2563eb" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-65" strokeLinecap="round" />
                <circle cx="18" cy="18" r="16" fill="transparent" stroke="#9333ea" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="-85" strokeLinecap="round" />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '20px', fontWeight: '700', fontFamily: 'Playfair Display, serif', color: GOLD }}>85%</span>
                <span style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8' }}>Mục tiêu</span>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { color: GOLD, label: 'Midnight Rose', pct: '40%' },
                { color: GREEN_DARK, label: 'Emerald Forest', pct: '25%' },
                { color: '#2563eb', label: 'Ocean Breeze', pct: '20%' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }} />
                    <span style={{ fontSize: '12px', color: '#64748b' }}>{item.label}</span>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>{item.pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
            Đơn hàng gần đây
          </h4>
          <Link href="/admin/orders" style={{ color: GOLD, fontSize: '12px', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'none' }}>
            Xem tất cả →
          </Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Mã đơn hàng', 'Khách hàng', 'Sản phẩm', 'Giá trị', 'Trạng thái', 'Ngày đặt'].map((h) => (
                  <th key={h} style={{ padding: '12px 24px', fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className="order-row" style={{ borderTop: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{order.id}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: `${GOLD}25`, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#ca8a04',
                      }}>
                        {order.initials}
                      </div>
                      <span style={{ fontSize: '14px', color: '#0f172a' }}>{order.customer}</span>
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#64748b' }}>{order.product}</td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{order.price}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span className={`badge ${order.badge}`}>{order.status}</span>
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '12px', color: '#94a3b8' }}>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid #f1f5f9', marginTop: '40px' }}>
        <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
          © 2026 Luxe Scent Perfumery. Bản quyền được bảo lưu.
        </p>
      </div>
    </div>
  );
}
