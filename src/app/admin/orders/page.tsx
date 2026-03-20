"use client"
import { useState } from 'react';

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#fff', fontFamily: "'Inter', sans-serif" },
  wrap: { padding: '32px 40px', maxWidth: '1440px', margin: '0 auto' },
  titleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', gap: '16px', flexWrap: 'wrap' },
  h1: { fontSize: '24px', fontWeight: '900', color: '#1e293b', margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.5px' },
  sub: { fontSize: '13px', color: '#94a3b8', marginTop: '4px', fontFamily: "'Inter', sans-serif" },
  btnRow: { display: 'flex', gap: '12px' },
  btnOutline: { display: 'flex', alignItems: 'center', gap: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
  btnPrimary: { display: 'flex', alignItems: 'center', gap: '8px', background: '#0a3d2b', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
  tabBar: { borderBottom: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
  filterBox: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', alignItems: 'flex-end' },
  label: { display: 'block', fontSize: '10px', fontWeight: '700', color: '#c5a059', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px', fontFamily: "'Inter', sans-serif" },
  input: { width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', color: '#334155', height: '40px', padding: '0 12px 0 36px', outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' },
  select: { width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', color: '#334155', height: '40px', padding: '0 12px', outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '14px 20px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c5a059', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' },
  td: { padding: '14px 20px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' },
  mono: { fontFamily: 'monospace', fontSize: '13px', color: '#c5a059', fontWeight: '700' },
  actionBtn: { padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', borderRadius: '6px', display: 'inline-flex' },
  pagination: { background: '#f8fafc', padding: '14px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  pageInfo: { fontSize: '12px', color: '#94a3b8', fontFamily: "'Inter', sans-serif" },
  pageBtn: { width: '32px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
  pageBtnActive: { width: '32px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1px solid #c5a059', background: '#0a3d2b', color: '#c5a059', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
  card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', position: 'relative', overflow: 'hidden' },
  cardLabel: { fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px', fontFamily: "'Inter', sans-serif" },
  cardValue: { fontSize: '24px', fontWeight: '900', color: '#1e293b', fontFamily: "'Inter', sans-serif" },
};

// Đơn hàng — sắp xếp cũ nhất lên trước (id tăng dần)
const orders = [
  { id: '#LX-88920', initials: 'TN', name: 'Trần Nhật Anh', email: 'nhatanh@gmail.com', product: 'Nước hoa Oud Wood x2', extra: '+1 sản phẩm khác', total: '4,250,000₫', status: 'Hoàn thành', date: '14/10/2023', time: '14:22', sBg: '#dcfce7', sColor: '#16a34a', sBorder: '#bbf7d0' },
  { id: '#LX-88921', initials: 'HL', name: 'Hoàng Lan', email: 'lan.hoang@luxury.vn', product: 'Set Scent of Heaven', extra: '', total: '1,890,000₫', status: 'Đang giao', date: '15/10/2023', time: '09:45', sBg: '#dbeafe', sColor: '#2563eb', sBorder: '#bfdbfe' },
  { id: '#LX-88922', initials: 'MV', name: 'Minh Vũ', email: 'mvu.design@icloud.com', product: 'Nến thơm Jasmine Night', extra: '', total: '850,000₫', status: 'Chờ xử lý', date: '15/10/2023', time: '11:10', sBg: '#fef3c7', sColor: '#d97706', sBorder: '#fde68a' },
  { id: '#LX-88923', initials: 'QD', name: 'Quốc Duy', email: 'duyq@outlook.com', product: 'Rose Essence x1', extra: '', total: '2,100,000₫', status: 'Đã hủy', date: '15/10/2023', time: '12:30', sBg: '#fee2e2', sColor: '#dc2626', sBorder: '#fecaca' },
];

const summaryCards = [
  { icon: 'shopping_cart', label: 'Đơn hàng mới hôm nay', value: '24', badge: '+12%', badgeColor: '#16a34a' },
  { icon: 'payments', label: 'Doanh thu tạm tính', value: '45,200,000₫', badge: '+5.4%', badgeColor: '#16a34a' },
  { icon: 'pending_actions', label: 'Chờ xử lý', value: '08', badge: 'Cần xử lý ngay', badgeColor: '#d97706' },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<'retail' | 'wholesale'>('retail');

  const sortedOrders = [...orders].sort((a, b) =>
    parseInt(a.id.replace('#LX-', '')) - parseInt(b.id.replace('#LX-', ''))
  );

  const tabStyle = (active: boolean): React.CSSProperties => ({
    paddingBottom: '16px',
    borderBottom: active ? '2px solid #c5a059' : '2px solid transparent',
    color: active ? '#c5a059' : '#94a3b8',
    fontWeight: '700', fontSize: '13px', textTransform: 'uppercase',
    letterSpacing: '0.05em', background: 'none', border: 'none',
    cursor: 'pointer', marginRight: '32px', fontFamily: "'Inter', sans-serif",
  });

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* Title */}
        <div style={S.titleRow}>
          <div>
            <h1 style={S.h1}>Quản lý Đơn hàng</h1>
            <p style={S.sub}>Hệ thống xử lý đơn hàng cao cấp LUXE SCENT</p>
          </div>
          <div style={S.btnRow}>
            <button style={S.btnOutline}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
              Xuất báo cáo
            </button>
            <button style={S.btnPrimary}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_circle</span>
              Tạo đơn mới
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={S.tabBar}>
          <div style={{ display: 'flex' }}>
            <button style={tabStyle(activeTab === 'retail')} onClick={() => setActiveTab('retail')}>Đơn hàng Lẻ</button>
            <button style={tabStyle(activeTab === 'wholesale')} onClick={() => setActiveTab('wholesale')}>Đơn hàng Sỉ</button>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8', paddingBottom: '8px', fontStyle: 'italic', fontFamily: "'Inter', sans-serif" }}>
            Cập nhật mới nhất: 2 phút trước
          </span>
        </div>

        {/* Filters */}
        <div style={S.filterBox}>
          <div>
            <label style={S.label}>Tìm kiếm</label>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#94a3b8', pointerEvents: 'none' }}>search</span>
              <input style={S.input} placeholder="Mã đơn, khách hàng..." type="text" />
            </div>
          </div>
          <div>
            <label style={S.label}>Trạng thái</label>
            <select style={S.select}>
              <option>Tất cả trạng thái</option>
              <option>Chờ xử lý</option>
              <option>Đang giao hàng</option>
              <option>Đã hoàn thành</option>
              <option>Đã hủy</option>
            </select>
          </div>
          <div>
            <label style={S.label}>Thời gian</label>
            <select style={S.select}>
              <option>7 ngày qua</option>
              <option>Tháng này</option>
              <option>Tháng trước</option>
              <option>Tùy chọn...</option>
            </select>
          </div>
          <div>
            <label style={S.label}>Phương thức</label>
            <select style={S.select}>
              <option>Tất cả thanh toán</option>
              <option>Chuyển khoản</option>
              <option>Thẻ tín dụng</option>
              <option>MoMo / VNPay</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ ...S.btnPrimary, flex: 1, justifyContent: 'center', height: '40px' }}>Lọc dữ liệu</button>
            <button style={{ ...S.actionBtn, width: '40px', height: '40px', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '8px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>restart_alt</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={S.table}>
              <thead>
                <tr>
                  {['Mã đơn hàng', 'Khách hàng', 'Sản phẩm', 'Tổng cộng', 'Trạng thái', 'Ngày đặt', 'Thao tác'].map((h, i) => (
                    <th key={h} style={{ ...S.th, textAlign: i === 3 ? 'right' : i === 6 ? 'center' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedOrders.map((o) => (
                  <tr key={o.id}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                    <td style={S.td}><span style={S.mono}>{o.id}</span></td>
                    <td style={S.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(10,61,43,0.08)', border: '1px solid rgba(10,61,43,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#0a3d2b', flexShrink: 0, fontFamily: "'Inter', sans-serif" }}>
                          {o.initials}
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0, fontFamily: "'Inter', sans-serif" }}>{o.name}</p>
                          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, fontFamily: "'Inter', sans-serif" }}>{o.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={S.td}>
                      <p style={{ fontSize: '13px', color: '#475569', margin: 0, fontFamily: "'Inter', sans-serif" }}>{o.product}</p>
                      {o.extra && <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, fontFamily: "'Inter', sans-serif" }}>{o.extra}</p>}
                    </td>
                    <td style={{ ...S.td, textAlign: 'right' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', fontFamily: "'Inter', sans-serif" }}>{o.total}</span>
                    </td>
                    <td style={S.td}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', background: o.sBg, color: o.sColor, border: `1px solid ${o.sBorder}`, fontFamily: "'Inter', sans-serif" }}>
                        {o.status}
                      </span>
                    </td>
                    <td style={S.td}>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: 0, fontFamily: "'Inter', sans-serif" }}>{o.date}</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, fontFamily: "'Inter', sans-serif" }}>{o.time}</p>
                    </td>
                    <td style={{ ...S.td, textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                        <button style={S.actionBtn} title="Xem chi tiết"
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.1)'; e.currentTarget.style.color = '#c5a059'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#94a3b8'; }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>visibility</span>
                        </button>
                        <button style={S.actionBtn} title="Cập nhật"
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.1)'; e.currentTarget.style.color = '#c5a059'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#94a3b8'; }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={S.pagination}>
            <p style={S.pageInfo}>Hiển thị <strong style={{ color: '#334155' }}>1 - 4</strong> của <strong style={{ color: '#334155' }}>156</strong> đơn hàng</p>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button style={S.pageBtn}><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_left</span></button>
              {[1, 2, 3].map(n => (
                <button key={n} style={n === 1 ? S.pageBtnActive : S.pageBtn}>{n}</button>
              ))}
              <span style={{ color: '#94a3b8', fontSize: '13px' }}>...</span>
              <button style={S.pageBtn}><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span></button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginTop: '32px' }}>
          {summaryCards.map(card => (
            <div key={card.label} style={S.card}>
              <div style={{ position: 'absolute', top: '12px', right: '12px', opacity: 0.06 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '64px', color: '#0a3d2b' }}>{card.icon}</span>
              </div>
              <p style={S.cardLabel}>{card.label}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={S.cardValue}>{card.value}</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: card.badgeColor, fontFamily: "'Inter', sans-serif" }}>{card.badge}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
