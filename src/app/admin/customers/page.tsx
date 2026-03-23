"use client"
import { useState } from 'react';

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#fff', fontFamily: "'Inter', sans-serif" },
  wrap: { padding: '32px 40px', maxWidth: '1280px', margin: '0 auto' },
  titleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', gap: '16px', flexWrap: 'wrap' },
  h1: { fontSize: '28px', fontWeight: '900', color: '#1e293b', margin: 0, fontFamily: "'Inter', sans-serif", letterSpacing: '-0.5px' },
  sub: { fontSize: '13px', color: '#94a3b8', marginTop: '4px', fontFamily: "'Inter', sans-serif" },
  btnPrimary: { display: 'flex', alignItems: 'center', gap: '8px', background: '#0a3d2b', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", boxShadow: '0 2px 8px rgba(10,61,43,0.2)' },
  btnOutline: { display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #e2e8f0', color: '#475569', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
  filterBox: { background: 'rgba(10,61,43,0.04)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '12px', padding: '24px', marginBottom: '24px' },
  filterGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' },
  label: { display: 'block', fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', fontFamily: "'Inter', sans-serif" },
  inputWrap: { position: 'relative' },
  inputIcon: { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#94a3b8', pointerEvents: 'none' },
  input: { width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', color: '#334155', height: '44px', padding: '0 14px 0 40px', outline: 'none', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { padding: '14px 24px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' },
  td: { padding: '16px 24px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' },
  idText: { fontSize: '13px', fontWeight: '500', color: '#94a3b8', fontFamily: "'Inter', sans-serif" },
  nameText: { fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: "'Inter', sans-serif" },
  emailText: { fontSize: '13px', color: '#475569', fontFamily: "'Inter', sans-serif" },
  phoneText: { fontSize: '11px', color: '#94a3b8', fontFamily: "'Inter', sans-serif" },
  totalText: { fontSize: '13px', fontWeight: '700', color: '#c5a059', fontFamily: "'Inter', sans-serif", textAlign: 'right' },
  dateText: { fontSize: '13px', color: '#64748b', fontFamily: "'Inter', sans-serif" },
  actionBtn: { padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', borderRadius: '6px', display: 'inline-flex', transition: 'color 0.15s' },
  pagination: { background: '#f8fafc', padding: '14px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' },
  pageInfo: { fontSize: '13px', color: '#94a3b8', fontFamily: "'Inter', sans-serif" },
  pageBtn: { width: '32px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
  pageBtnActive: { width: '32px', height: '32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1px solid #c5a059', background: '#0a3d2b', color: '#c5a059', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
  statCard: { background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', borderLeft: '4px solid #c5a059' },
  statLabel: { fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: '8px', fontFamily: "'Inter', sans-serif" },
  statValue: { fontSize: '24px', fontWeight: '900', color: '#1e293b', fontFamily: "'Inter', sans-serif" },
  statBadge: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '700', color: '#16a34a', marginTop: '12px', fontFamily: "'Inter', sans-serif" },
};

const customers = [
  { id: '#LS-9021', initials: 'NT', name: 'Nguyễn Thành Trung', email: 'trung.nt@gmail.com', phone: '0902 123 456', orders: 12, total: '15,400,000đ', date: '12/10/2023' },
  { id: '#LS-8945', initials: 'LH', name: 'Lê Minh Hương', email: 'huong.le@luxe.vn', phone: '0981 444 888', orders: 4, total: '4,250,000đ', date: '05/11/2023' },
  { id: '#LS-8822', initials: 'PA', name: 'Phạm Tuấn Anh', email: 'anhpt@hotmail.com', phone: '0355 678 901', orders: 21, total: '28,900,000đ', date: '18/09/2023' },
];

const statCards = [
  { label: 'Đại lý hạng Diamond', value: '12 Đối tác', badge: '+2 trong tháng này', borderColor: '#c5a059' },
  { label: 'Mức chiết khấu TB', value: '35% - 45%', note: 'Theo hợp đồng năm 2026', borderColor: '#0a3d2b' },
  { label: 'MOQ Trung bình', value: '500 Đơn vị', note: 'Tối thiểu mỗi đơn hàng', borderColor: '#c5a059' },
  { label: 'Doanh thu sỉ tháng', value: '2.4 tỷ VNĐ', badge: '+15.2% so với tháng trước', borderColor: '#0a3d2b' },
];

export default function CustomersPage() {
  const [activeTab, setActiveTab] = useState<'retail' | 'wholesale'>('retail');

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '16px 32px', fontSize: '13px', fontWeight: active ? '700' : '500',
    borderTop: 'none', borderLeft: 'none', borderRight: 'none',
    borderBottom: active ? '2px solid #0a3d2b' : '2px solid transparent',
    color: active ? '#0a3d2b' : '#94a3b8', background: 'none',
    cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif",
    transition: 'color 0.2s',
  });

  return (
    <div style={S.page}>
      <div style={S.wrap}>

        {/* Title */}
        <div style={S.titleRow}>
          <div>
            <h1 style={S.h1}>Quản lý Khách hàng</h1>
            <p style={S.sub}>Hệ thống quản trị dữ liệu khách hàng cao cấp</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={S.btnPrimary}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person_add</span>
              Thêm Khách Hàng
            </button>
            <button style={S.btnOutline}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>file_download</span>
              Xuất File
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid #e2e8f0', marginBottom: '32px', display: 'flex', overflowX: 'auto' }}>
          <button style={tabStyle(activeTab === 'retail')} onClick={() => setActiveTab('retail')}>Khách hàng Bán lẻ</button>
          <button style={tabStyle(activeTab === 'wholesale')} onClick={() => setActiveTab('wholesale')}>Khách hàng Lớn (Bán sỉ)</button>
        </div>

        {/* Filters */}
        <div style={S.filterBox}>
          <div style={S.filterGrid}>
            <div>
              <label style={S.label}>Tên khách hàng</label>
              <div style={S.inputWrap}>
                <span className="material-symbols-outlined" style={S.inputIcon}>person</span>
                <input style={S.input} placeholder="Nhập tên khách hàng..." type="text"
                  onFocus={e => e.target.style.borderColor = '#c5a059'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>
            <div>
              <label style={S.label}>Email</label>
              <div style={S.inputWrap}>
                <span className="material-symbols-outlined" style={S.inputIcon}>mail</span>
                <input style={S.input} placeholder="example@luxescent.vn" type="email"
                  onFocus={e => e.target.style.borderColor = '#c5a059'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>
            <div>
              <label style={S.label}>Số điện thoại</label>
              <div style={S.inputWrap}>
                <span className="material-symbols-outlined" style={S.inputIcon}>call</span>
                <input style={S.input} placeholder="090x xxx xxx" type="text"
                  onFocus={e => e.target.style.borderColor = '#c5a059'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={S.table}>
              <thead>
                <tr>
                  {[
                    { label: 'ID', align: 'left' },
                    { label: 'Khách hàng', align: 'left' },
                    { label: 'Thông tin liên hệ', align: 'left' },
                    { label: 'Đơn hàng', align: 'center' },
                    { label: 'Tổng chi tiêu', align: 'right' },
                    { label: 'Ngày đăng ký', align: 'left' },
                    { label: 'Thao tác', align: 'right' },
                  ].map(h => (
                    <th key={h.label} style={{ ...S.th, textAlign: h.align as any }}>{h.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map(c => (
                  <tr key={c.id}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                    <td style={S.td}><span style={S.idText}>{c.id}</span></td>
                    <td style={S.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* Gold gradient avatar */}
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #d4af37, #f9e29c, #d4af37)', padding: '1.5px', flexShrink: 0 }}>
                          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0a3d2b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#d4af37', fontFamily: "'Inter', sans-serif" }}>
                            {c.initials}
                          </div>
                        </div>
                        <span style={S.nameText}>{c.name}</span>
                      </div>
                    </td>
                    <td style={S.td}>
                      <p style={{ ...S.emailText, margin: 0 }}>{c.email}</p>
                      <p style={{ ...S.phoneText, margin: 0 }}>{c.phone}</p>
                    </td>
                    <td style={{ ...S.td, textAlign: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600', background: 'rgba(10,61,43,0.08)', color: '#0a3d2b', border: '1px solid rgba(10,61,43,0.15)', fontFamily: "'Inter', sans-serif" }}>
                        {c.orders}
                      </span>
                    </td>
                    <td style={{ ...S.td, textAlign: 'right' }}><span style={S.totalText}>{c.total}</span></td>
                    <td style={S.td}><span style={S.dateText}>{c.date}</span></td>
                    <td style={{ ...S.td, textAlign: 'right' }}>
                      <button style={S.actionBtn} title="Chỉnh sửa"
                        onMouseEnter={e => (e.currentTarget.style.color = '#c5a059')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
                      </button>
                      <button style={S.actionBtn} title="Xóa"
                        onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={S.pagination}>
            <p style={S.pageInfo}>Hiển thị <strong style={{ color: '#334155' }}>1 - 3</strong> trong tổng số <strong style={{ color: '#334155' }}>1,240</strong> khách hàng</p>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button style={{ ...S.pageBtn, opacity: 0.4, cursor: 'not-allowed' }} disabled>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_left</span>
              </button>
              {[1, 2, 3].map(n => (
                <button key={n} style={n === 1 ? S.pageBtnActive : S.pageBtn}>{n}</button>
              ))}
              <span style={{ color: '#94a3b8', fontSize: '13px', padding: '0 4px' }}>...</span>
              <button style={S.pageBtn}>42</button>
              <button style={S.pageBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Wholesale Summary */}
        <div style={{ marginTop: '48px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Inter', sans-serif" }}>
            <span className="material-symbols-outlined" style={{ color: '#c5a059' }}>analytics</span>
            Tóm lược Khách hàng Sỉ
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {statCards.map(card => (
              <div key={card.label} style={{ ...S.statCard, borderLeftColor: card.borderColor }}>
                <p style={S.statLabel}>{card.label}</p>
                <h4 style={S.statValue}>{card.value}</h4>
                {card.badge && (
                  <div style={S.statBadge}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>trending_up</span>
                    {card.badge}
                  </div>
                )}
                {card.note && (
                  <p style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '12px', fontFamily: "'Inter', sans-serif" }}>
                    {card.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
