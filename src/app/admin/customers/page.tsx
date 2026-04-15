"use client"
import { useState, useMemo } from 'react';

interface Customer {
  id: string; initials: string; name: string; email: string;
  phone: string; orders: number; total: string; totalNum: number;
  date: string; type: 'retail' | 'wholesale';
}

const ALL_CUSTOMERS: Customer[] = [
  { id: '#LS-9021', initials: 'NT', name: 'Nguyễn Thành Trung', email: 'trung.nt@gmail.com', phone: '0902 123 456', orders: 12, total: '15,400,000đ', totalNum: 15400000, date: '12/10/2023', type: 'retail' },
  { id: '#LS-8945', initials: 'LH', name: 'Lê Minh Hương', email: 'huong.le@luxe.vn', phone: '0981 444 888', orders: 4, total: '4,250,000đ', totalNum: 4250000, date: '05/11/2023', type: 'retail' },
  { id: '#LS-8822', initials: 'PA', name: 'Phạm Tuấn Anh', email: 'anhpt@hotmail.com', phone: '0355 678 901', orders: 21, total: '28,900,000đ', totalNum: 28900000, date: '18/09/2023', type: 'retail' },
  { id: '#LS-8801', initials: 'TL', name: 'Trần Thị Lan', email: 'lan.tran@gmail.com', phone: '0912 333 444', orders: 7, total: '9,100,000đ', totalNum: 9100000, date: '01/08/2023', type: 'retail' },
  { id: '#LS-8750', initials: 'BV', name: 'Bùi Văn Minh', email: 'minh.bv@yahoo.com', phone: '0934 555 666', orders: 3, total: '3,200,000đ', totalNum: 3200000, date: '20/07/2023', type: 'retail' },
  { id: '#WS-001', initials: 'HD', name: 'Hoa Đại Phát (Đại lý)', email: 'hoadaiphat@biz.vn', phone: '0901 999 888', orders: 45, total: '320,000,000đ', totalNum: 320000000, date: '01/01/2023', type: 'wholesale' },
  { id: '#WS-002', initials: 'SG', name: 'Saigon Luxury Store', email: 'contact@sgluxury.vn', phone: '028 3333 4444', orders: 30, total: '210,000,000đ', totalNum: 210000000, date: '15/02/2023', type: 'wholesale' },
  { id: '#WS-003', initials: 'HN', name: 'Hanoi Perfume House', email: 'info@hanoiperfume.vn', phone: '024 2222 3333', orders: 18, total: '145,000,000đ', totalNum: 145000000, date: '10/03/2023', type: 'wholesale' },
];

const PER_PAGE = 5;

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#f6f8f7', fontFamily: "'Inter', sans-serif" },
  wrap: { padding: '32px 40px', maxWidth: '1280px', margin: '0 auto' },
  h1: { fontSize: '28px', fontWeight: '900', color: '#1e293b', margin: 0, letterSpacing: '-0.5px' },
  sub: { fontSize: '13px', color: '#94a3b8', marginTop: '4px' },
  btnPrimary: { display: 'flex', alignItems: 'center', gap: '8px', background: '#0a3d2b', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  btnOutline: { display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #e2e8f0', color: '#475569', padding: '10px 20px', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  th: { padding: '14px 24px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#94a3b8', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' as const },
  td: { padding: '16px 24px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' as const },
  input: { width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', color: '#334155', height: '44px', padding: '0 14px 0 40px', outline: 'none', boxSizing: 'border-box' as const },
  overlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  modal: { background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '480px', maxHeight: '90vh', overflowY: 'auto' as const, boxShadow: '0 24px 64px rgba(0,0,0,0.2)', fontFamily: "'Inter', sans-serif" },
  inputModal: { width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', color: '#1e293b', outline: 'none', boxSizing: 'border-box' as const, fontFamily: "'Inter', sans-serif" },
};

function DetailModal({ customer, onClose }: { customer: Customer; onClose: () => void }) {
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: 0 }}>Chi tiết khách hàng</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#94a3b8' }}>✕</button>
        </div>
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #d4af37, #f9e29c)', padding: '2px', flexShrink: 0 }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0a3d2b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '700', color: '#d4af37' }}>{customer.initials}</div>
            </div>
            <div>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px' }}>{customer.name}</p>
              <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 10px', borderRadius: '999px', background: customer.type === 'wholesale' ? 'rgba(10,61,43,0.1)' : '#f1f5f9', color: customer.type === 'wholesale' ? '#0a3d2b' : '#64748b' }}>
                {customer.type === 'wholesale' ? 'Khách sỉ' : 'Khách lẻ'}
              </span>
            </div>
          </div>
          {[
            { label: 'Mã khách hàng', value: customer.id },
            { label: 'Email', value: customer.email },
            { label: 'Số điện thoại', value: customer.phone },
            { label: 'Số đơn hàng', value: String(customer.orders) },
            { label: 'Tổng chi tiêu', value: customer.total },
            { label: 'Ngày đăng ký', value: customer.date },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>{row.label}</span>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{row.value}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '20px 28px', borderTop: '1px solid #f1f5f9' }}>
          <button onClick={onClose} style={{ width: '100%', padding: '12px', background: '#0a3d2b', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Đóng</button>
        </div>
      </div>
    </div>
  );
}

function EditModal({ customer, onClose, onSave }: { customer: Customer; onClose: () => void; onSave: (c: Customer) => void }) {
  const [form, setForm] = useState({ name: customer.name, email: customer.email, phone: customer.phone });
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: 0 }}>Chỉnh sửa khách hàng</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#94a3b8' }}>✕</button>
        </div>
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'Họ và tên', key: 'name', type: 'text', placeholder: 'Nguyễn Văn A' },
            { label: 'Email', key: 'email', type: 'email', placeholder: 'email@example.com' },
            { label: 'Số điện thoại', key: 'phone', type: 'tel', placeholder: '09xxxxxxxx' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
              <input type={f.type} value={(form as Record<string, string>)[f.key]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder} style={S.inputModal} />
            </div>
          ))}
        </div>
        <div style={{ padding: '20px 28px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Hủy</button>
          <button onClick={() => onSave({ ...customer, ...form })} style={{ flex: 1, padding: '12px', background: '#0a3d2b', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>Lưu thay đổi</button>
        </div>
      </div>
    </div>
  );
}

function AddModal({ type, onClose, onAdd }: { type: 'retail' | 'wholesale'; onClose: () => void; onAdd: (c: Customer) => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const handleAdd = () => {
    if (!form.name || !form.email) return;
    const initials = form.name.split(' ').map((w: string) => w[0]).slice(-2).join('').toUpperCase();
    onAdd({ id: `#LS-${Date.now()}`, initials, ...form, orders: 0, total: '0đ', totalNum: 0, date: new Date().toLocaleDateString('vi-VN'), type });
  };
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '24px 28px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: 0 }}>Thêm khách hàng mới</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#94a3b8' }}>✕</button>
        </div>
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'Họ và tên *', key: 'name', type: 'text', placeholder: 'Nguyễn Văn A' },
            { label: 'Email *', key: 'email', type: 'email', placeholder: 'email@example.com' },
            { label: 'Số điện thoại', key: 'phone', type: 'tel', placeholder: '09xxxxxxxx' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
              <input type={f.type} value={(form as Record<string, string>)[f.key]}
                onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                placeholder={f.placeholder} style={S.inputModal} />
            </div>
          ))}
        </div>
        <div style={{ padding: '20px 28px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Hủy</button>
          <button onClick={handleAdd} disabled={!form.name || !form.email}
            style={{ flex: 1, padding: '12px', background: !form.name || !form.email ? '#94a3b8' : '#0a3d2b', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: !form.name || !form.email ? 'not-allowed' : 'pointer' }}>
            Thêm khách hàng
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ customer, onClose, onDelete }: { customer: Customer; onClose: () => void; onDelete: () => void }) {
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={{ ...S.modal, maxWidth: '400px', textAlign: 'center' as const }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '32px 28px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '24px' }}>🗑️</div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px' }}>Xóa khách hàng?</h3>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px', lineHeight: '1.6' }}>
            Bạn có chắc muốn xóa <strong>{customer.name}</strong>? Hành động này không thể hoàn tác.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={onClose} style={{ flex: 1, padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Hủy</button>
            <button onClick={onDelete} style={{ flex: 1, padding: '12px', background: '#dc2626', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>Xóa</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(ALL_CUSTOMERS);
  const [activeTab, setActiveTab] = useState<'retail' | 'wholesale'>('retail');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [deleteCustomer, setDeleteCustomer] = useState<Customer | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return customers.filter(c =>
      c.type === activeTab &&
      (!search || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q))
    );
  }, [customers, activeTab, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSaveEdit = (updated: Customer) => {
    setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
    setEditCustomer(null);
    showToast('Đã cập nhật thông tin khách hàng!');
  };

  const handleAdd = (c: Customer) => {
    setCustomers(prev => [c, ...prev]);
    setShowAdd(false);
    showToast('Đã thêm khách hàng mới!');
  };

  const handleDelete = () => {
    if (!deleteCustomer) return;
    setCustomers(prev => prev.filter(c => c.id !== deleteCustomer.id));
    setDeleteCustomer(null);
    showToast('Đã xóa khách hàng!');
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '16px 32px', fontSize: '13px', fontWeight: active ? '700' : '500',
    borderTop: 'none', borderLeft: 'none', borderRight: 'none',
    borderBottom: active ? '2px solid #0a3d2b' : '2px solid transparent',
    color: active ? '#0a3d2b' : '#94a3b8', background: 'none',
    cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif",
  });

  const statCards = [
    { label: 'Tổng khách hàng', value: String(customers.filter(c => c.type === 'retail').length), border: '#c5a059' },
    { label: 'Đại lý / Khách sỉ', value: String(customers.filter(c => c.type === 'wholesale').length), border: '#0a3d2b' },
    { label: 'Doanh thu sỉ tháng', value: '2.4 tỷ VNĐ', border: '#c5a059' },
    { label: 'Mức chiết khấu TB', value: '35% - 45%', border: '#0a3d2b' },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', gap: '16px', flexWrap: 'wrap' }}>
          <div><h1 style={S.h1}>Quản lý Khách hàng</h1><p style={S.sub}>Hệ thống quản trị dữ liệu khách hàng cao cấp</p></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={S.btnPrimary} onClick={() => setShowAdd(true)}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person_add</span>Thêm Khách Hàng
            </button>
            <button style={S.btnOutline}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>file_download</span>Xuất File
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid #e2e8f0', marginBottom: '28px', display: 'flex' }}>
          <button style={tabStyle(activeTab === 'retail')} onClick={() => { setActiveTab('retail'); setPage(1); setSearch(''); }}>Khách hàng Bán lẻ</button>
          <button style={tabStyle(activeTab === 'wholesale')} onClick={() => { setActiveTab('wholesale'); setPage(1); setSearch(''); }}>Khách hàng Lớn (Bán sỉ)</button>
        </div>

        {/* Search */}
        <div style={{ background: 'rgba(10,61,43,0.04)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
          <div style={{ position: 'relative', maxWidth: '360px' }}>
            <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#94a3b8' }}>search</span>
            <input style={S.input} placeholder="Tìm theo tên, email, SĐT..." value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {[
                    { label: 'ID', align: 'left' }, { label: 'Khách hàng', align: 'left' },
                    { label: 'Thông tin liên hệ', align: 'left' }, { label: 'Đơn hàng', align: 'center' },
                    { label: 'Tổng chi tiêu', align: 'right' }, { label: 'Ngày đăng ký', align: 'left' },
                    { label: 'Thao tác', align: 'right' },
                  ].map(h => (
                    <th key={h.label} style={{ ...S.th, textAlign: h.align as React.CSSProperties['textAlign'] }}>{h.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>Không tìm thấy khách hàng</td></tr>
                ) : paged.map(c => (
                  <tr key={c.id} style={{ background: '#fff' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                    <td style={S.td}><span style={{ fontSize: '13px', color: '#94a3b8' }}>{c.id}</span></td>
                    <td style={S.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #d4af37, #f9e29c)', padding: '1.5px', flexShrink: 0 }}>
                          <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#0a3d2b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', color: '#d4af37' }}>{c.initials}</div>
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={S.td}>
                      <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 2px' }}>{c.email}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{c.phone}</p>
                    </td>
                    <td style={{ ...S.td, textAlign: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600', background: 'rgba(10,61,43,0.08)', color: '#0a3d2b', border: '1px solid rgba(10,61,43,0.15)' }}>{c.orders}</span>
                    </td>
                    <td style={{ ...S.td, textAlign: 'right' }}>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#c5a059' }}>{c.total}</span>
                    </td>
                    <td style={S.td}><span style={{ fontSize: '13px', color: '#64748b' }}>{c.date}</span></td>
                    <td style={{ ...S.td, textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button onClick={() => setViewCustomer(c)}
                          style={{ padding: '6px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#475569' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = '#c5a059'; e.currentTarget.style.color = '#c5a059'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; }}>
                          Xem
                        </button>
                        <button onClick={() => setEditCustomer(c)}
                          style={{ padding: '6px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#475569' }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a3d2b'; e.currentTarget.style.color = '#0a3d2b'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.color = '#475569'; }}>
                          Sửa
                        </button>
                        <button onClick={() => setDeleteCustomer(c)}
                          style={{ padding: '6px', background: '#fee2e2', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', color: '#dc2626' }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#fecaca')}
                          onMouseLeave={e => (e.currentTarget.style.background = '#fee2e2')}>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ background: '#f8fafc', padding: '14px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
              Hiển thị <strong style={{ color: '#334155' }}>{filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)}</strong> trong tổng số <strong style={{ color: '#334155' }}>{filtered.length}</strong> khách hàng
            </p>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_left</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  style={{ width: '32px', height: '32px', borderRadius: '6px', border: n === page ? 'none' : '1px solid #e2e8f0', background: n === page ? '#0a3d2b' : '#fff', color: n === page ? '#c5a059' : '#64748b', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                  {n}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0}
                style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', cursor: (page === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer', opacity: (page === totalPages || totalPages === 0) ? 0.4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginTop: '40px' }}>
          {statCards.map(card => (
            <div key={card.label} style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', borderLeft: `4px solid ${card.border}` }}>
              <p style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8', marginBottom: '8px' }}>{card.label}</p>
              <h4 style={{ fontSize: '24px', fontWeight: '900', color: '#1e293b', margin: 0 }}>{card.value}</h4>
            </div>
          ))}
        </div>
      </div>

      {viewCustomer && <DetailModal customer={viewCustomer} onClose={() => setViewCustomer(null)} />}
      {editCustomer && <EditModal customer={editCustomer} onClose={() => setEditCustomer(null)} onSave={handleSaveEdit} />}
      {deleteCustomer && <DeleteModal customer={deleteCustomer} onClose={() => setDeleteCustomer(null)} onDelete={handleDelete} />}
      {showAdd && <AddModal type={activeTab} onClose={() => setShowAdd(false)} onAdd={handleAdd} />}

      {toast && (
        <div style={{ position: 'fixed', bottom: '32px', right: '32px', background: '#0a3d2b', color: '#fff', padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 2000, fontSize: '14px', fontWeight: '600' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#c5a059' }}>check_circle</span>
          {toast}
        </div>
      )}
    </div>
  );
}

