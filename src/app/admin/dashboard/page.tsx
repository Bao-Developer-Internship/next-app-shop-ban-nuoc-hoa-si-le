"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';

const GOLD = '#D4AF37';
const GREEN_DARK = '#0a3d2b';

const STATUS_MAP: Record<string, { label: string; badge: string; color: string }> = {
  pending:    { label: 'Chờ xử lý',  badge: 'badge-yellow', color: '#ca8a04' },
  processing: { label: 'Đang xử lý', badge: 'badge-blue',   color: '#2563eb' },
  shipping:   { label: 'Đang giao',  badge: 'badge-blue',   color: '#2563eb' },
  completed:  { label: 'Hoàn thành', badge: 'badge-green',  color: '#16a34a' },
  cancelled:  { label: 'Đã hủy',     badge: 'badge-red',    color: '#dc2626' },
};

function fmt(n: number) {
  return n.toLocaleString('vi-VN') + 'đ';
}

function growthColor(n: number) {
  return n >= 0 ? '#16a34a' : '#dc2626';
}

function growthLabel(n: number) {
  return (n >= 0 ? '+' : '') + n + '%';
}

interface DashboardData {
  stats: {
    totalRevenue: number; revGrowth: number;
    totalOrders: number; orderGrowth: number;
    totalProducts: number;
    wholesaleOrders: number; wholesaleGrowth: number;
  };
  monthlyRevenue: { month: string; revenue: number }[];
  recentOrders: {
    _id: string; orderNumber: string; customerName: string; customerEmail: string;
    items: { name: string; quantity: number }[];
    total: number; status: string; createdAt: string;
  }[];
  statusBreakdown: { _id: string; count: number }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/dashboard')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats;
  const monthly = data?.monthlyRevenue || [];
  const recentOrders = data?.recentOrders || [];
  const maxRevenue = Math.max(...monthly.map(m => m.revenue), 1);

  // Stat cards config
  const cards = [
    {
      icon: 'payments', iconBg: '#fefce8', iconColor: '#ca8a04',
      label: 'Tổng doanh thu',
      value: loading ? '...' : fmt(stats?.totalRevenue || 0),
      badge: loading ? '...' : growthLabel(stats?.revGrowth || 0),
      badgeColor: growthColor(stats?.revGrowth || 0),
    },
    {
      icon: 'shopping_cart', iconBg: '#eff6ff', iconColor: '#2563eb',
      label: 'Đơn hàng (đã xác nhận)',
      value: loading ? '...' : String(stats?.totalOrders || 0),
      badge: loading ? '...' : growthLabel(stats?.orderGrowth || 0),
      badgeColor: growthColor(stats?.orderGrowth || 0),
    },
    {
      icon: 'inventory', iconBg: '#faf5ff', iconColor: '#9333ea',
      label: 'Tổng sản phẩm',
      value: loading ? '...' : String(stats?.totalProducts || 0),
      badge: 'Ổn định', badgeColor: '#94a3b8',
    },
    {
      icon: 'storefront', iconBg: '#fefce8', iconColor: '#ca8a04',
      label: 'Đơn sỉ',
      value: loading ? '...' : String(stats?.wholesaleOrders || 0),
      badge: loading ? '...' : growthLabel(stats?.wholesaleGrowth || 0),
      badgeColor: growthColor(stats?.wholesaleGrowth || 0),
    },
  ];

  return (
    <div style={{ padding: '40px', background: '#f6f8f7', minHeight: '100%' }}>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '40px' }}>
        {cards.map((card, i) => (
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

        {/* Bar Chart — doanh thu 6 tháng */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px 0' }}>
                Doanh thu hàng tháng
              </h4>
              <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
                Thống kê 6 tháng gần nhất · Chỉ tính đơn hoàn thành
              </p>
            </div>
          </div>
          <div style={{ height: '256px', display: 'flex', alignItems: 'flex-end', gap: '24px', padding: '0 16px', position: 'relative' }}>
            {/* Y-axis gridlines */}
            {!loading && (
              <div style={{ position: 'absolute', inset: '0 0 28px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
                {[100, 75, 50, 25, 0].map(pct => (
                  <div key={pct} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '9px', color: '#cbd5e1', fontWeight: '600', width: '0px' }} />
                    <div style={{ flex: 1, height: '1px', background: '#f1f5f9' }} />
                  </div>
                ))}
              </div>
            )}
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bar-group">
                    <div style={{ width: '100%', height: '40%', background: '#f1f5f9', borderRadius: '6px 6px 0 0' }} />
                    <span className="bar-label" style={{ fontSize: '9px', fontWeight: '700', color: '#94a3b8' }}>...</span>
                  </div>
                ))
              : monthly.map((m, i) => {
                  const isLast = i === monthly.length - 1;
                  const hasRevenue = m.revenue > 0;
                  const heightPct = hasRevenue ? Math.max((m.revenue / maxRevenue) * 100, 8) : 6;
                  const barColor = isLast ? GOLD : hasRevenue ? `${GOLD}60` : '#e2e8f0';
                  return (
                    <div key={i} className="bar-group" style={{ position: 'relative' }} title={fmt(m.revenue)}>
                      {/* Value label on top */}
                      {hasRevenue && (
                        <div style={{
                          position: 'absolute', bottom: `calc(${heightPct}% + 28px)`, left: '50%',
                          transform: 'translateX(-50%)', whiteSpace: 'nowrap',
                          fontSize: '9px', fontWeight: '700', color: isLast ? GOLD : '#94a3b8',
                          background: '#fff', padding: '2px 4px', borderRadius: '4px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                        }}>
                          {m.revenue >= 1000000
                            ? (m.revenue / 1000000).toFixed(1) + 'tr'
                            : (m.revenue / 1000).toFixed(0) + 'k'}
                        </div>
                      )}
                      <div className="bar-inner" style={{
                        width: '100%', height: `${heightPct}%`,
                        background: barColor,
                        borderRadius: '6px 6px 0 0',
                        borderBottom: isLast ? `4px solid ${GOLD}` : 'none',
                        transition: 'height 0.5s ease',
                      }} />
                      <span className="bar-label" style={{ fontSize: '9px', fontWeight: '700', color: isLast ? GOLD : '#94a3b8', letterSpacing: '0.05em' }}>{m.month.toUpperCase()}</span>
                    </div>
                  );
                })
            }
          </div>
        </div>

        {/* Status Breakdown */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
          <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 24px 0' }}>
            Trạng thái đơn hàng
          </h4>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ height: '36px', background: '#f1f5f9', borderRadius: '8px' }} />
                ))
              : (data?.statusBreakdown || []).map(s => {
                  const info = STATUS_MAP[s._id] || { label: s._id, color: '#94a3b8' };
                  const total = (data?.statusBreakdown || []).reduce((a, b) => a + b.count, 0) || 1;
                  const pct = Math.round((s.count / total) * 100);
                  return (
                    <div key={s._id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{info.label}</span>
                        <span style={{ fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>{s.count} ({pct}%)</span>
                      </div>
                      <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: info.color, borderRadius: '999px', transition: 'width 0.6s ease' }} />
                      </div>
                    </div>
                  );
                })
            }
            {!loading && (data?.statusBreakdown || []).length === 0 && (
              <p style={{ fontSize: '13px', color: '#94a3b8', textAlign: 'center' }}>Chưa có đơn hàng nào</p>
            )}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: '0 0 4px' }}>
              Đơn hàng gần đây
            </h4>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Không bao gồm đơn đã hủy</p>
          </div>
          <Link href="/admin/orders" style={{ color: GOLD, fontSize: '12px', fontWeight: '700', textDecoration: 'none' }}>
            Xem tất cả →
          </Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['Mã đơn hàng', 'Khách hàng', 'Sản phẩm', 'Giá trị', 'Trạng thái', 'Ngày đặt'].map(h => (
                  <th key={h} style={{ padding: '12px 24px', fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'left' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} style={{ borderTop: '1px solid #f1f5f9' }}>
                      {Array.from({ length: 6 }).map((__, j) => (
                        <td key={j} style={{ padding: '16px 24px' }}>
                          <div style={{ height: '14px', background: '#f1f5f9', borderRadius: '4px' }} />
                        </td>
                      ))}
                    </tr>
                  ))
                : recentOrders.length === 0
                  ? (
                    <tr>
                      <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                        Chưa có đơn hàng nào
                      </td>
                    </tr>
                  )
                  : recentOrders.map((order, i) => {
                      const statusInfo = STATUS_MAP[order.status] || { label: order.status, badge: 'badge-yellow', color: '#ca8a04' };
                      const initials = order.customerName.split(' ').map((w: string) => w[0]).slice(-2).join('').toUpperCase();
                      const productSummary = order.items.map(it => `${it.name} x${it.quantity}`).join(', ');
                      const date = new Date(order.createdAt).toLocaleDateString('vi-VN');
                      return (
                        <tr key={order._id} className="order-row" style={{ borderTop: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{order.orderNumber}</td>
                          <td style={{ padding: '16px 24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: `${GOLD}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#ca8a04', flexShrink: 0 }}>
                                {initials}
                              </div>
                              <span style={{ fontSize: '14px', color: '#0f172a' }}>{order.customerName}</span>
                            </div>
                          </td>
                          <td style={{ padding: '16px 24px', fontSize: '13px', color: '#64748b', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{productSummary}</td>
                          <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{fmt(order.total)}</td>
                          <td style={{ padding: '16px 24px' }}>
                            <span className={`badge ${statusInfo.badge}`}>{statusInfo.label}</span>
                          </td>
                          <td style={{ padding: '16px 24px', fontSize: '12px', color: '#94a3b8' }}>{date}</td>
                        </tr>
                      );
                    })
              }
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ padding: '40px', textAlign: 'center', borderTop: '1px solid #f1f5f9', marginTop: '40px' }}>
        <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', margin: 0 }}>
          © 2026 Luxe Scent Perfumery. Bản quyền được bảo lưu.
        </p>
      </div>
    </div>
  );
}
