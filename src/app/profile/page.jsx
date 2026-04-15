"use client"
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/store/authStore';
import LuxuryHeader from '@/component/LuxuryHeader';
import LuxuryFooter from '@/component/LuxuryFooter';
import { toast } from 'sonner';

const STATUS_STEPS = ['Chờ xác nhận', 'Đang xử lý', 'Đang giao', 'Đã giao'];
const STATUS_COLOR = {
  'Chờ xác nhận': { bg: '#fef9c3', color: '#ca8a04' },
  'Đang xử lý':   { bg: '#dbeafe', color: '#2563eb' },
  'Đang giao':    { bg: '#e0f2fe', color: '#0284c7' },
  'Đã giao':      { bg: '#dcfce7', color: '#16a34a' },
  'Đã hủy':       { bg: '#fee2e2', color: '#dc2626' },
};

const MOCK_ORDERS = [
  { id: 'LS-2026-001', date: '2026-03-10', status: 'Đã giao', total: 8500000, items: [{ name: 'Baccarat Rouge 540', qty: 1, price: 8500000, img: '/images/San-Pham/SP9.jpg' }] },
  { id: 'LS-2026-002', date: '2026-03-18', status: 'Đang giao', total: 7100000, items: [{ name: 'Velvet Rose Intense', qty: 2, price: 3500000, img: '/images/San-Pham/SP1.jpg' }, { name: 'Citrus Garden', qty: 1, price: 100000, img: '/images/San-Pham/SP3.jpg' }] },
  { id: 'LS-2026-003', date: '2026-03-22', status: 'Đang xử lý', total: 4200000, items: [{ name: 'Oud Mystique', qty: 1, price: 4200000, img: '/images/San-Pham/SP2.jpg' }] },
];

function validatePassword(pw) {
  if (pw.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự';
  if (!/[A-Z]/.test(pw)) return 'Phải có ít nhất 1 chữ hoa';
  if (!/[0-9]/.test(pw)) return 'Phải có ít nhất 1 chữ số';
  return null;
}

// ─── Tab: Thông tin cá nhân ──────────────────────────────────────────────────
function ProfileTab({ user, updateUser }) {
  const [form, setForm] = useState({ name: user.name || '', phone: user.phone || '', address: user.address || '' });
  const [saving, setSaving] = useState(false);
  const fileRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error('Ảnh tối đa 2MB'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => { updateUser({ avatarUrl: ev.target.result }); toast.success('Đã cập nhật ảnh đại diện'); };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Vui lòng nhập họ tên'); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    updateUser(form);
    setSaving(false);
    toast.success('Đã lưu thông tin cá nhân');
  };

  const initials = user.name?.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase() || '?';
  const inputStyle = { width: '100%', padding: '11px 14px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'Inter, sans-serif', color: '#1e293b', outline: 'none', boxSizing: 'border-box', background: '#fff' };
  const labelStyle = { fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', alignItems: 'start' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #D4AF37', margin: '0 auto', background: 'linear-gradient(135deg, #0a3d2b, #1a6b4a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {user.avatarUrl
              ? <img src={user.avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ color: '#D4AF37', fontSize: '32px', fontWeight: '700' }}>{initials}</span>
            }
          </div>
          <button onClick={() => fileRef.current?.click()}
            style={{ position: 'absolute', bottom: 0, right: 0, width: '32px', height: '32px', borderRadius: '50%', background: '#0a3d2b', border: '2px solid #fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#D4AF37', fontSize: '16px' }}>✏️</span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
        </div>
        <p style={{ fontWeight: '700', fontSize: '16px', color: '#1e293b', margin: '0 0 4px' }}>{user.name}</p>
        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 16px' }}>{user.email}</p>
        <span style={{ fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '999px', background: '#dcfce7', color: '#16a34a' }}>Thành viên</span>
      </div>

      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0a3d2b', margin: '0 0 24px', fontFamily: "'Playfair Display', serif" }}>Thông tin cá nhân</h3>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={labelStyle}>Họ và tên *</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Nguyễn Văn A" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input value={user.email} disabled style={{ ...inputStyle, background: '#f8fafc', color: '#94a3b8', cursor: 'not-allowed' }} />
          </div>
          <div>
            <label style={labelStyle}>Số điện thoại</label>
            <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="0901 234 567" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Địa chỉ giao hàng</label>
            <textarea value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }} />
          </div>
          <button type="submit" disabled={saving}
            style={{ padding: '12px 32px', background: saving ? '#94a3b8' : 'linear-gradient(135deg, #c5a059, #f1d592, #c5a059)', color: '#0a3d2b', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '800', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', alignSelf: 'flex-start', letterSpacing: '0.04em' }}>
            {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Tab: Đơn hàng ───────────────────────────────────────────────────────────
function OrdersTab() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  // Map MongoDB status sang UI status
  const STATUS_DB_MAP = {
    pending: 'Chờ xác nhận',
    processing: 'Đang xử lý',
    shipping: 'Đang giao',
    completed: 'Đã giao',
    cancelled: 'Đã hủy',
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.email) { setLoading(false); return; }
      try {
        const res = await fetch(`/api/orders/my?email=${encodeURIComponent(user.email)}`);
        const data = await res.json();
        if (data.orders && data.orders.length > 0) {
          // Map từ MongoDB format sang UI format
          const mapped = data.orders.map(o => ({
            id: o.orderNumber || o._id,
            _id: o._id,
            date: o.createdAt,
            status: STATUS_DB_MAP[o.status] || 'Chờ xác nhận',
            total: o.total,
            items: (o.items || []).map(item => ({
              name: item.name,
              qty: item.quantity,
              price: item.price,
              img: item.image || '/images/San-Pham/SP1.jpg',
            })),
            address: o.shippingAddress,
            cancelReason: o.notes,
            statusHistory: (o.statusHistory || []).map(h => ({
              status: STATUS_DB_MAP[h.status] || h.status,
              note: h.note,
              changedAt: h.changedAt,
            })),
          }));
          setOrders(mapped);
        } else {
          setOrders([]);
        }
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user?.email]);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
      <p style={{ fontSize: '14px', color: '#94a3b8' }}>Đang tải đơn hàng...</p>
    </div>
  );

  if (!orders.length) return (
    <div style={{ textAlign: 'center', padding: '80px 20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
      <p style={{ fontSize: '16px', fontWeight: '600', color: '#64748b' }}>Bạn chưa có đơn hàng nào</p>
      <a href="/shop" style={{ display: 'inline-block', marginTop: '16px', padding: '10px 24px', background: '#0a3d2b', color: '#fff', borderRadius: '10px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>Mua sắm ngay</a>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {orders.map(order => {
        const stepIdx = STATUS_STEPS.indexOf(order.status);
        const isOpen = expanded === order.id;
        const sc = STATUS_COLOR[order.status] || STATUS_COLOR['Chờ xác nhận'];
        return (
          <div key={order.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div onClick={() => setExpanded(isOpen ? null : order.id)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', cursor: 'pointer', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 3px' }}>#{order.id}</p>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{new Date(order.date).toLocaleDateString('vi-VN')}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '999px', background: sc.bg, color: sc.color }}>{order.status}</span>
                <p style={{ fontSize: '15px', fontWeight: '800', color: '#c5a059', margin: 0 }}>{order.total?.toLocaleString('vi-VN')}đ</p>
                <span style={{ fontSize: '18px', color: '#94a3b8', display: 'inline-block', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
              </div>
            </div>

            {order.status !== 'Đã hủy' && (
              <div style={{ padding: '0 24px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {STATUS_STEPS.map((step, i) => (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < STATUS_STEPS.length - 1 ? 1 : 'none' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: i <= stepIdx ? '#0a3d2b' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {i < stepIdx
                            ? <span style={{ color: '#D4AF37', fontSize: '14px' }}>✓</span>
                            : <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === stepIdx ? '#D4AF37' : '#94a3b8', display: 'block' }} />
                          }
                        </div>
                        <span style={{ fontSize: '10px', fontWeight: i === stepIdx ? '700' : '500', color: i <= stepIdx ? '#0a3d2b' : '#94a3b8', whiteSpace: 'nowrap' }}>{step}</span>
                      </div>
                      {i < STATUS_STEPS.length - 1 && (
                        <div style={{ flex: 1, height: '2px', background: i < stepIdx ? '#0a3d2b' : '#e2e8f0', margin: '0 4px', marginBottom: '22px' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isOpen && (
              <div style={{ borderTop: '1px solid #f1f5f9', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Danh sách sản phẩm */}
                {(order.items || []).map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '10px', overflow: 'hidden', background: '#f8fafc', flexShrink: 0 }}>
                      <img src={item.img || '/images/San-Pham/SP1.jpg'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: '0 0 2px' }}>{item.name}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>x{item.qty}</p>
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#c5a059', margin: 0 }}>{(item.price * item.qty).toLocaleString('vi-VN')}đ</p>
                  </div>
                ))}

                {/* Lý do hủy */}
                {order.status === 'Đã hủy' && order.cancelReason && (
                  <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '14px 16px', border: '1px solid #fecaca' }}>
                    <p style={{ fontSize: '12px', fontWeight: '700', color: '#dc2626', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Lý do hủy</p>
                    <p style={{ fontSize: '13px', color: '#dc2626', margin: 0 }}>{order.cancelReason}</p>
                  </div>
                )}

                {/* Lịch sử trạng thái */}
                {order.statusHistory && order.statusHistory.length > 0 && (
                  <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', border: '1px solid #e2e8f0' }}>
                    <p style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Lịch sử cập nhật</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[...order.statusHistory].reverse().map((h, i) => {
                        const sc = STATUS_COLOR[h.status] || STATUS_COLOR['Chờ xác nhận'];
                        return (
                          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: sc.color, flexShrink: 0, marginTop: '5px' }} />
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '12px', fontWeight: '700', padding: '2px 8px', borderRadius: '999px', background: sc.bg, color: sc.color }}>{h.status}</span>
                                <span style={{ fontSize: '11px', color: '#94a3b8' }}>{new Date(h.changedAt).toLocaleString('vi-VN')}</span>
                              </div>
                              {h.note && <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0' }}>{h.note}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Password Field (defined outside to prevent re-mount on re-render) ────────
const pwInputStyle = { width: '100%', padding: '11px 44px 11px 14px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontFamily: 'Inter, sans-serif', color: '#1e293b', outline: 'none', boxSizing: 'border-box', background: '#fff' };
const pwLabelStyle = { fontSize: '12px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' };

function PasswordField({ id, label, placeholder, value, showPw, error, onChange, onToggle }) {
  return (
    <div>
      <label style={pwLabelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={showPw ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ ...pwInputStyle, borderColor: error ? '#ef4444' : '#e2e8f0' }}
        />
        <button type="button" onClick={onToggle}
          style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#94a3b8' }}>
          {showPw ? '🙈' : '👁️'}
        </button>
      </div>
      {error && <p style={{ fontSize: '12px', color: '#ef4444', margin: '4px 0 0' }}>{error}</p>}
    </div>
  );
}

// ─── Tab: Đổi mật khẩu ───────────────────────────────────────────────────────
function PasswordTab({ user, updateUser }) {
  const [form, setForm] = useState({ current: '', newPw: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState({ current: false, newPw: false, confirm: false });

  const validate = () => {
    const e = {};
    if (!form.current) {
      e.current = 'Vui lòng nhập mật khẩu hiện tại';
    } else if (form.current !== (user.password || '')) {
      e.current = 'Mật khẩu hiện tại không đúng';
    }
    const pwErr = validatePassword(form.newPw);
    if (pwErr) e.newPw = pwErr;
    if (form.newPw !== form.confirm) e.confirm = 'Mật khẩu xác nhận không khớp';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    // Cập nhật password mới vào user store
    updateUser({ password: form.newPw });
    setSaving(false);
    setForm({ current: '', newPw: '', confirm: '' });
    setErrors({});
    toast.success('Đã đổi mật khẩu thành công');
  };

  const handleChange = (id) => (e) => {
    setForm(p => ({ ...p, [id]: e.target.value }));
    setErrors(p => ({ ...p, [id]: '' }));
  };

  const handleToggle = (id) => () => setShow(p => ({ ...p, [id]: !p[id] }));

  return (
    <div style={{ maxWidth: '480px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0a3d2b', margin: '0 0 8px', fontFamily: "'Playfair Display', serif" }}>Đổi mật khẩu</h3>
        <p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 24px' }}>Mật khẩu phải có ít nhất 8 ký tự, 1 chữ hoa và 1 chữ số.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <PasswordField id="current" label="Mật khẩu hiện tại" placeholder="••••••••" value={form.current} showPw={show.current} error={errors.current} onChange={handleChange('current')} onToggle={handleToggle('current')} />
          <PasswordField id="newPw" label="Mật khẩu mới" placeholder="••••••••" value={form.newPw} showPw={show.newPw} error={errors.newPw} onChange={handleChange('newPw')} onToggle={handleToggle('newPw')} />
          <PasswordField id="confirm" label="Xác nhận mật khẩu mới" placeholder="••••••••" value={form.confirm} showPw={show.confirm} error={errors.confirm} onChange={handleChange('confirm')} onToggle={handleToggle('confirm')} />
          <button type="submit" disabled={saving}
            style={{ padding: '12px 32px', background: saving ? '#94a3b8' : '#0a3d2b', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif', alignSelf: 'flex-start' }}>
            {saving ? 'Đang lưu...' : 'Đổi mật khẩu'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'profile',  label: '👤 Thông tin cá nhân' },
  { id: 'orders',   label: '📦 Đơn hàng của tôi' },
  { id: 'password', label: '🔒 Đổi mật khẩu' },
];

export default function ProfilePage() {
  const { user, isLoggedIn, loading, updateUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (!loading && !isLoggedIn) router.replace('/login');
  }, [loading, isLoggedIn, router]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && TABS.find(t => t.id === tab)) setActiveTab(tab);
  }, [searchParams]);

  if (loading || !user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f6f8f7' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#0a3d2b', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Đang tải...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  return (
    <>
      <LuxuryHeader />
      <main style={{ minHeight: '80vh', background: '#f6f8f7', padding: '48px 20px', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px' }}>
            <nav style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '12px' }}>
              <a href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Trang chủ</a>
              <span style={{ margin: '0 8px' }}>/</span>
              <span style={{ color: '#0a3d2b', fontWeight: '600' }}>Tài khoản</span>
            </nav>
            <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#0a3d2b', margin: 0, fontFamily: "'Playfair Display', serif" }}>
              Tài khoản của tôi
            </h1>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', borderBottom: '1px solid #e2e8f0' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{ padding: '12px 20px', background: 'none', border: 'none', borderBottom: activeTab === t.id ? '2px solid #c5a059' : '2px solid transparent', cursor: 'pointer', fontSize: '14px', fontWeight: activeTab === t.id ? '700' : '500', color: activeTab === t.id ? '#0a3d2b' : '#94a3b8', fontFamily: 'Inter, sans-serif', transition: 'all 0.2s', marginBottom: '-1px', whiteSpace: 'nowrap' }}>
                {t.label}
              </button>
            ))}
          </div>

          {activeTab === 'profile'  && <ProfileTab user={user} updateUser={updateUser} />}
          {activeTab === 'orders'   && <OrdersTab />}
          {activeTab === 'password' && <PasswordTab user={user} updateUser={updateUser} />}
        </div>
      </main>
      <LuxuryFooter />
    </>
  );
}
