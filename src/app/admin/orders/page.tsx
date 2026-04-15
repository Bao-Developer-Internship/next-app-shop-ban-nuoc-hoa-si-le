"use client"
import { useState, useMemo, useEffect, useCallback } from 'react';

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#f6f8f7', fontFamily: "'Inter', sans-serif" },
  wrap: { padding: '32px 40px', maxWidth: '1440px', margin: '0 auto' },
  h1: { fontSize: '24px', fontWeight: '900', color: '#1e293b', margin: 0, letterSpacing: '-0.5px' },
  sub: { fontSize: '13px', color: '#94a3b8', marginTop: '4px' },
  btnOutline: { display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid #e2e8f0', color: '#475569', padding: '8px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' },
  btnPrimary: { display: 'flex', alignItems: 'center', gap: '8px', background: '#0a3d2b', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontWeight: '700', fontSize: '13px', cursor: 'pointer' },
  filterBox: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', alignItems: 'flex-end' },
  label: { display: 'block', fontSize: '10px', fontWeight: '700', color: '#c5a059', textTransform: 'uppercase' as const, letterSpacing: '0.1em', marginBottom: '6px' },
  input: { width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', color: '#334155', height: '40px', padding: '0 12px 0 36px', outline: 'none', boxSizing: 'border-box' as const },
  select: { width: '100%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', color: '#334155', height: '40px', padding: '0 12px', outline: 'none', boxSizing: 'border-box' as const },
  th: { padding: '14px 20px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#c5a059', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap' as const },
  td: { padding: '14px 20px', borderBottom: '1px solid #f1f5f9', verticalAlign: 'middle' as const },
  mono: { fontFamily: 'monospace', fontSize: '13px', color: '#c5a059', fontWeight: '700' },
  actionBtn: { padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', borderRadius: '6px', display: 'inline-flex' as const },
  pageBtn: { width: '32px', height: '32px', display: 'inline-flex' as const, alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: '12px', fontWeight: '700', cursor: 'pointer' },
  pageBtnActive: { width: '32px', height: '32px', display: 'inline-flex' as const, alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1px solid #c5a059', background: '#0a3d2b', color: '#c5a059', fontSize: '12px', fontWeight: '700', cursor: 'pointer' },
  card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', position: 'relative' as const, overflow: 'hidden' as const },
  overlay: { position: 'fixed' as const, inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  modal: { background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' as const, boxShadow: '0 24px 64px rgba(0,0,0,0.2)', fontFamily: "'Inter', sans-serif" },
};

type Status = 'Hoàn thành' | 'Đang giao' | 'Chờ xử lý' | 'Đã hủy';

interface Order {
  id: string; _id?: string; initials: string; name: string; email: string;
  product: string; extra: string; total: string; totalNum: number;
  status: Status; date: string; time: string; payment: string;
  address: string; phone: string; cancelReason?: string;
}

const STATUS_STYLE: Record<Status, { bg: string; color: string; border: string }> = {
  'Hoàn thành': { bg: '#dcfce7', color: '#16a34a', border: '#bbf7d0' },
  'Đang giao':  { bg: '#dbeafe', color: '#2563eb', border: '#bfdbfe' },
  'Chờ xử lý':  { bg: '#fef3c7', color: '#d97706', border: '#fde68a' },
  'Đã hủy':     { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' },
};

// Map từ MongoDB status sang UI status
const STATUS_MAP: Record<string, Status> = {
  pending: 'Chờ xử lý',
  processing: 'Chờ xử lý',
  shipping: 'Đang giao',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

const STATUS_REVERSE: Record<Status, string> = {
  'Chờ xử lý': 'pending',
  'Đang giao': 'shipping',
  'Hoàn thành': 'completed',
  'Đã hủy': 'cancelled',
};

const PAYMENT_MAP: Record<string, string> = {
  card: 'Thẻ tín dụng',
  momo: 'MoMo',
  vnpay: 'VNPay',
  bank_transfer: 'Chuyển khoản',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapApiOrder(o: any): Order {
  const initials = (o.customerName || 'KH')
    .split(' ').map((w: string) => w[0]).slice(-2).join('').toUpperCase();
  const items = o.items || [];
  const product = items.length > 0 ? `${items[0].name}${items[0].quantity > 1 ? ` x${items[0].quantity}` : ''}` : 'N/A';
  const extra = items.length > 1 ? `+${items.length - 1} sản phẩm khác` : '';
  const createdAt = new Date(o.createdAt);
  const mongoId = o._id ? o._id.toString() : '';
  return {
    id: `#${o.orderNumber || mongoId}`,
    _id: mongoId,
    initials,
    name: o.customerName || '',
    email: o.customerEmail || '',
    phone: o.customerPhone || '',
    product,
    extra,
    total: `${(o.total || 0).toLocaleString('vi-VN')}₫`,
    totalNum: o.total || 0,
    status: STATUS_MAP[o.status] || 'Chờ xử lý',
    date: createdAt.toLocaleDateString('vi-VN'),
    time: createdAt.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    payment: PAYMENT_MAP[o.paymentMethod] || o.paymentMethod || 'Chuyển khoản',
    address: o.shippingAddress || '',
    cancelReason: o.notes,
  };
}

const PER_PAGE = 6;
const STATUSES: Status[] = ['Hoàn thành', 'Đang giao', 'Chờ xử lý', 'Đã hủy'];

function Badge({ status }: { status: Status }) {
  const s = STATUS_STYLE[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.04em', background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>
      {status}
    </span>
  );
}

function DetailModal({ order, onClose }: { order: Order; onClose: () => void }) {
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '28px 32px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 4px' }}>Chi tiết đơn hàng</h3>
            <span style={S.mono}>{order.id}</span>
          </div>
          <button onClick={onClose} style={{ ...S.actionBtn, fontSize: '20px' }}>✕</button>
        </div>
        <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>Trạng thái</span>
            <Badge status={order.status} />
          </div>
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Thông tin khách hàng</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(10,61,43,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: '#0a3d2b', flexShrink: 0 }}>{order.initials}</div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 2px' }}>{order.name}</p>
                <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 2px' }}>{order.email}</p>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{order.phone}</p>
              </div>
            </div>
          </div>
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Thông tin đơn hàng</p>
            {[
              { label: 'Sản phẩm', value: order.product + (order.extra ? ' ' + order.extra : '') },
              { label: 'Tổng tiền', value: order.total },
              { label: 'Thanh toán', value: order.payment },
              { label: 'Địa chỉ', value: order.address },
              { label: 'Ngày đặt', value: `${order.date} ${order.time}` },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>{row.label}</span>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', textAlign: 'right', maxWidth: '60%' }}>{row.value}</span>
              </div>
            ))}
          </div>
          {order.cancelReason && (
            <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '14px 16px', border: '1px solid #fecaca' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>Lý do hủy</p>
              <p style={{ fontSize: '13px', color: '#dc2626', margin: 0 }}>{order.cancelReason}</p>
            </div>
          )}
        </div>
        <div style={{ padding: '20px 32px', borderTop: '1px solid #f1f5f9' }}>
          <button onClick={onClose} style={{ width: '100%', padding: '12px', background: '#0a3d2b', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>Đóng</button>
        </div>
      </div>
    </div>
  );
}

function EditModal({ order, onClose, onSave }: { order: Order; onClose: () => void; onSave: (updated: Order) => void }) {
  const [status, setStatus] = useState<Status>(order.status);
  const [cancelReason, setCancelReason] = useState(order.cancelReason || '');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (status === 'Đã hủy' && !cancelReason.trim()) {
      setError('Vui lòng nhập lý do hủy đơn hàng.');
      return;
    }
    onSave({ ...order, status, cancelReason: status === 'Đã hủy' ? cancelReason.trim() : undefined });
  };

  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.modal} onClick={e => e.stopPropagation()}>
        <div style={{ padding: '28px 32px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 4px' }}>Chỉnh sửa đơn hàng</h3>
            <span style={S.mono}>{order.id}</span>
          </div>
          <button onClick={onClose} style={{ ...S.actionBtn, fontSize: '20px' }}>✕</button>
        </div>
        <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', background: '#f8fafc', borderRadius: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(10,61,43,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#0a3d2b', flexShrink: 0 }}>{order.initials}</div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{order.name}</p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{order.product}</p>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '14px', fontWeight: '800', color: '#c5a059' }}>{order.total}</span>
          </div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 10px' }}>Thao tác nhanh</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => { setStatus('Hoàn thành'); setError(''); }}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '2px solid', borderColor: status === 'Hoàn thành' ? '#16a34a' : '#e2e8f0', background: status === 'Hoàn thành' ? '#dcfce7' : '#fff', color: status === 'Hoàn thành' ? '#16a34a' : '#64748b', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                ✓ Xác nhận
              </button>
              <button onClick={() => { setStatus('Đã hủy'); setError(''); }}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '2px solid', borderColor: status === 'Đã hủy' ? '#dc2626' : '#e2e8f0', background: status === 'Đã hủy' ? '#fee2e2' : '#fff', color: status === 'Đã hủy' ? '#dc2626' : '#64748b', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                ✕ Hủy đơn
              </button>
            </div>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trạng thái đơn hàng</label>
            <select value={status} onChange={e => { setStatus(e.target.value as Status); setError(''); }}
              style={{ ...S.select, height: '44px', padding: '0 14px' }}>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {status === 'Đã hủy' && (
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#dc2626', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Lý do hủy * (bắt buộc)
              </label>
              <textarea value={cancelReason} onChange={e => { setCancelReason(e.target.value); setError(''); }}
                placeholder="Nhập lý do hủy đơn hàng..." rows={3}
                style={{ width: '100%', padding: '12px 14px', border: `1px solid ${error ? '#dc2626' : '#e2e8f0'}`, borderRadius: '8px', fontSize: '13px', color: '#1e293b', outline: 'none', resize: 'vertical' as const, fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' as const }} />
              {error && <p style={{ fontSize: '12px', color: '#dc2626', margin: '6px 0 0', fontWeight: '600' }}>{error}</p>}
            </div>
          )}
        </div>
        <div style={{ padding: '20px 32px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px' }}>
          <button onClick={onClose} style={{ flex: 1, padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer' }}>Hủy</button>
          <button onClick={handleSave} style={{ flex: 1, padding: '12px', background: '#0a3d2b', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer' }}>Lưu thay đổi</button>
        </div>
      </div>
    </div>
  );
}

// Xuất CSV
function exportToCSV(data: Order[]) {
  const headers = ['Mã đơn', 'Khách hàng', 'Email', 'Điện thoại', 'Sản phẩm', 'Tổng tiền', 'Trạng thái', 'Thanh toán', 'Địa chỉ', 'Ngày đặt', 'Lý do hủy'];
  const rows = data.map(o => [
    o.id, o.name, o.email, o.phone,
    o.product + (o.extra ? ' ' + o.extra : ''),
    o.total, o.status, o.payment, o.address,
    `${o.date} ${o.time}`, o.cancelReason || '',
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `don-hang-luxescent-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'retail' | 'wholesale'>('retail');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả trạng thái');
  const [paymentFilter, setPaymentFilter] = useState('Tất cả thanh toán');
  const [page, setPage] = useState(1);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/orders?type=${activeTab}&limit=100`);
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders.map(mapApiOrder));
      }
    } catch (err) {
      console.error('Fetch orders error:', err);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const q = search.toLowerCase();
      const matchSearch = !search || o.name.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.email.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'Tất cả trạng thái' || o.status === statusFilter;
      const matchPayment = paymentFilter === 'Tất cả thanh toán' || o.payment === paymentFilter;
      return matchSearch && matchStatus && matchPayment;
    });
  }, [orders, search, statusFilter, paymentFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleSaveEdit = async (updated: Order) => {
    try {
      if (updated._id) {
        const res = await fetch(`/api/orders/${updated._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: STATUS_REVERSE[updated.status],
            cancelReason: updated.cancelReason,
          }),
        });
        if (!res.ok) throw new Error('Cập nhật thất bại');
      }
      setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
      setEditOrder(null);
      showToast(`Đã cập nhật đơn ${updated.id} → ${updated.status}`);
    } catch {
      showToast('Lỗi khi cập nhật đơn hàng');
    }
  };

  const resetFilters = () => {
    setSearch(''); setStatusFilter('Tất cả trạng thái'); setPaymentFilter('Tất cả thanh toán'); setPage(1);
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    paddingBottom: '16px',
    borderTop: 'none', borderLeft: 'none', borderRight: 'none',
    borderBottom: active ? '2px solid #c5a059' : '2px solid transparent',
    color: active ? '#c5a059' : '#94a3b8', fontWeight: '700', fontSize: '13px',
    textTransform: 'uppercase', letterSpacing: '0.05em', background: 'none',
    cursor: 'pointer', marginRight: '32px',
  });

  const summaryCards = [
    { icon: 'shopping_cart', label: 'Tổng đơn hàng', value: String(orders.length), badge: activeTab === 'retail' ? 'Lẻ' : 'Sỉ', badgeColor: '#16a34a' },
    { icon: 'payments', label: 'Doanh thu tạm tính', value: `${orders.reduce((s, o) => s + o.totalNum, 0).toLocaleString('vi-VN')}₫`, badge: 'Tất cả', badgeColor: '#16a34a' },
    { icon: 'pending_actions', label: 'Chờ xử lý', value: String(orders.filter(o => o.status === 'Chờ xử lý').length), badge: 'Cần xử lý ngay', badgeColor: '#d97706' },
  ];

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px', gap: '16px', flexWrap: 'wrap' }}>
          <div><h1 style={S.h1}>Quản lý Đơn hàng</h1><p style={S.sub}>Hệ thống xử lý đơn hàng cao cấp LUXE SCENT</p></div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={S.btnOutline} onClick={() => { exportToCSV(filtered); showToast('Đã xuất báo cáo CSV thành công!'); }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>Xuất báo cáo
            </button>
            <button style={S.btnOutline} onClick={fetchOrders}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>refresh</span>Làm mới
            </button>
            <button style={S.btnPrimary}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_circle</span>Tạo đơn mới
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid #e2e8f0', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex' }}>
            <button style={tabStyle(activeTab === 'retail')} onClick={() => { setActiveTab('retail'); setPage(1); }}>Đơn hàng Lẻ</button>
            <button style={tabStyle(activeTab === 'wholesale')} onClick={() => { setActiveTab('wholesale'); setPage(1); }}>Đơn hàng Sỉ</button>
          </div>
          <span style={{ fontSize: '12px', color: '#94a3b8', paddingBottom: '8px', fontStyle: 'italic' }}>Cập nhật mới nhất: 2 phút trước</span>
        </div>

        {/* Filters */}
        <div style={S.filterBox}>
          <div>
            <label style={S.label}>Tìm kiếm</label>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#94a3b8', pointerEvents: 'none' }}>search</span>
              <input style={S.input} placeholder="Mã đơn, khách hàng..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
            </div>
          </div>
          <div>
            <label style={S.label}>Trạng thái</label>
            <select style={S.select} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
              <option>Tất cả trạng thái</option>
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={S.label}>Thời gian</label>
            <select style={S.select}><option>7 ngày qua</option><option>Tháng này</option><option>Tháng trước</option></select>
          </div>
          <div>
            <label style={S.label}>Phương thức</label>
            <select style={S.select} value={paymentFilter} onChange={e => { setPaymentFilter(e.target.value); setPage(1); }}>
              <option>Tất cả thanh toán</option>
              <option>Chuyển khoản</option><option>Thẻ tín dụng</option><option>MoMo</option><option>VNPay</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ ...S.btnPrimary, flex: 1, justifyContent: 'center', height: '40px' }} onClick={() => setPage(1)}>Lọc dữ liệu</button>
            <button onClick={resetFilters} style={{ ...S.actionBtn, width: '40px', height: '40px', border: '1px solid #e2e8f0', background: '#fff', borderRadius: '8px' }} title="Xóa bộ lọc">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>restart_alt</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Mã đơn hàng', 'Khách hàng', 'Sản phẩm', 'Tổng cộng', 'Trạng thái', 'Ngày đặt', 'Thao tác'].map((h, i) => (
                    <th key={h} style={{ ...S.th, textAlign: i === 3 ? 'right' : i === 6 ? 'center' : 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '32px', display: 'block', marginBottom: '8px', animation: 'spin 1s linear infinite' }}>progress_activity</span>
                    Đang tải đơn hàng...
                  </td></tr>
                ) : paged.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>Không tìm thấy đơn hàng phù hợp</td></tr>
                ) : paged.map(o => (
                  <tr key={o.id} style={{ background: '#fff', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                    <td style={S.td}><span style={S.mono}>{o.id}</span></td>
                    <td style={S.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(10,61,43,0.08)', border: '1px solid rgba(10,61,43,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '700', color: '#0a3d2b', flexShrink: 0 }}>{o.initials}</div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{o.name}</p>
                          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>{o.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={S.td}>
                      <p style={{ fontSize: '13px', color: '#475569', margin: 0 }}>{o.product}</p>
                      {o.extra && <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>{o.extra}</p>}
                    </td>
                    <td style={{ ...S.td, textAlign: 'right' }}><span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{o.total}</span></td>
                    <td style={S.td}><Badge status={o.status} /></td>
                    <td style={S.td}>
                      <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{o.date}</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>{o.time}</p>
                    </td>
                    <td style={{ ...S.td, textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
                        <button style={S.actionBtn} title="Xem chi tiết" onClick={() => setViewOrder(o)}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.1)'; e.currentTarget.style.color = '#c5a059'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#94a3b8'; }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>visibility</span>
                        </button>
                        <button style={S.actionBtn} title="Chỉnh sửa" onClick={() => setEditOrder(o)}
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
          <div style={{ background: '#f8fafc', padding: '14px 20px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
              Hiển thị <strong style={{ color: '#334155' }}>{filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)}</strong> của <strong style={{ color: '#334155' }}>{filtered.length}</strong> đơn hàng
            </p>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                style={{ ...S.pageBtn, opacity: page === 1 ? 0.4 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_left</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)} style={n === page ? S.pageBtnActive : S.pageBtn}>{n}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages || totalPages === 0}
                style={{ ...S.pageBtn, opacity: (page === totalPages || totalPages === 0) ? 0.4 : 1, cursor: (page === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>chevron_right</span>
              </button>
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
              <p style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>{card.label}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#1e293b' }}>{card.value}</span>
                <span style={{ fontSize: '12px', fontWeight: '700', color: card.badgeColor }}>{card.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {viewOrder && <DetailModal order={viewOrder} onClose={() => setViewOrder(null)} />}
      {editOrder && <EditModal order={editOrder} onClose={() => setEditOrder(null)} onSave={handleSaveEdit} />}

      {toast && (
        <div style={{ position: 'fixed', bottom: '32px', right: '32px', background: '#0a3d2b', color: '#fff', padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 2000, fontSize: '14px', fontWeight: '600' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#c5a059' }}>check_circle</span>
          {toast}
        </div>
      )}
    </div>
  );
}
