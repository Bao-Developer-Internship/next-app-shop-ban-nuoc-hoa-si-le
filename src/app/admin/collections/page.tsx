"use client"
import { useState } from 'react';
import SaveConfirmModal from '@/components/admin/SaveConfirmModal';

type Product = { badge: string; badgeColor: string; name: string; price: string; img: string };
type Season = {
  label: string; icon: string; title: string; desc: string; status: string;
  img: string; products: Product[];
  stats: { icon: string; label: string; value: string }[];
};
type Change = { field: string; oldValue: string; newValue: string };

const initialData: Record<string, Season> = {
  spring: {
    label: 'Mùa Xuân', icon: 'filter_vintage', title: 'Bộ sưu tập Xuân 2026', status: 'Đang hiển thị',
    desc: 'Hương thơm nhẹ nhàng từ hoa cỏ và cam chanh, mang lại cảm giác tươi mới của buổi sáng đầu xuân.',
    img: 'https://laluz.vn/wp-content/uploads/2024/12/tieu-chi-chon-mua-chai-nuoc-hoa-mua-xuan-cho-nu.jpg',
    products: [
      { badge: 'Best Seller', badgeColor: '#c5a059', name: 'Velvet Morning Mist', price: '2.400.000đ', img: '/images/San-Pham/SP1.jpg' },
      { badge: 'New', badgeColor: '#2563eb', name: 'Rose de Mai', price: '3.100.000đ', img: '/images/San-Pham/Sp5.jpg' },
      { badge: 'Limited', badgeColor: '#94a3b8', name: 'Golden Amber', price: '2.750.000đ', img: '/images/San-Pham/SP4.jpg' },
    ],
    stats: [
      { icon: 'analytics', label: 'Lượt xem', value: '12.840' },
      { icon: 'shopping_cart', label: 'Chuyển đổi', value: '3.2%' },
      { icon: 'inventory', label: 'Tổng tồn kho', value: '458 sp' },
      { icon: 'star', label: 'Đánh giá TB', value: '4.9/5.0' },
    ],
  },
  summer: {
    label: 'Mùa Hạ', icon: 'light_mode', title: 'Bộ sưu tập Hạ 2026', status: 'Đang hiển thị',
    desc: 'Hương biển mát lạnh, trái cây nhiệt đới và gỗ trắng — năng lượng của mùa hè rực rỡ.',
    img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop',
    products: [
      { badge: 'Best Seller', badgeColor: '#c5a059', name: 'Ocean Breeze EDP', price: '2.800.000đ', img: '/images/San-Pham/SP7.jpg' },
      { badge: 'New', badgeColor: '#2563eb', name: 'Citrus Soleil', price: '1.950.000đ', img: '/images/San-Pham/SP3.jpg' },
      { badge: 'Limited', badgeColor: '#94a3b8', name: 'Tropical Mango Mist', price: '3.200.000đ', img: '/images/San-Pham/SP6.jpg' },
    ],
    stats: [
      { icon: 'analytics', label: 'Lượt xem', value: '9.210' },
      { icon: 'shopping_cart', label: 'Chuyển đổi', value: '2.8%' },
      { icon: 'inventory', label: 'Tổng tồn kho', value: '312 sp' },
      { icon: 'star', label: 'Đánh giá TB', value: '4.7/5.0' },
    ],
  },
  autumn: {
    label: 'Mùa Thu', icon: 'eco', title: 'Bộ sưu tập Thu 2026', status: 'Sắp ra mắt',
    desc: 'Hương gỗ ấm áp, lá khô và gia vị — gợi lên vẻ đẹp trầm mặc của những buổi chiều thu.',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
    products: [
      { badge: 'Signature', badgeColor: '#c5a059', name: 'Oud Wood Intense', price: '4.200.000đ', img: '/images/San-Pham/SP16.jpg' },
      { badge: 'New', badgeColor: '#d97706', name: 'Amber Noir', price: '3.500.000đ', img: '/images/San-Pham/SP4.jpg' },
      { badge: 'Limited', badgeColor: '#94a3b8', name: 'Spiced Cedar', price: '2.900.000đ', img: '/images/San-Pham/SP6.jpg' },
    ],
    stats: [
      { icon: 'analytics', label: 'Lượt xem', value: '7.430' },
      { icon: 'shopping_cart', label: 'Chuyển đổi', value: '4.1%' },
      { icon: 'inventory', label: 'Tổng tồn kho', value: '280 sp' },
      { icon: 'star', label: 'Đánh giá TB', value: '4.8/5.0' },
    ],
  },
  winter: {
    label: 'Mùa Đông', icon: 'ac_unit', title: 'Bộ sưu tập Đông 2026', status: 'Sắp ra mắt',
    desc: 'Hương xạ hương, vani và gỗ tuyết tùng — ấm áp và sang trọng như những đêm đông lạnh giá.',
    img: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=200&h=200&fit=crop',
    products: [
      { badge: 'Exclusive', badgeColor: '#c5a059', name: 'Midnight Velvet', price: '5.100.000đ', img: '/images/San-Pham/SP8.jpg' },
      { badge: 'Limited', badgeColor: '#94a3b8', name: 'Snow Cedar', price: '3.800.000đ', img: '/images/San-Pham/SP2.jpg' },
      { badge: 'New', badgeColor: '#6366f1', name: 'Vanilla Frost', price: '2.900.000đ', img: '/images/San-Pham/SP12.jpg' },
    ],
    stats: [
      { icon: 'analytics', label: 'Lượt xem', value: '5.670' },
      { icon: 'shopping_cart', label: 'Chuyển đổi', value: '3.6%' },
      { icon: 'inventory', label: 'Tổng tồn kho', value: '195 sp' },
      { icon: 'star', label: 'Đánh giá TB', value: '4.9/5.0' },
    ],
  },
};

const BADGE_OPTIONS = [
  { label: 'Best Seller', color: '#c5a059' },
  { label: 'New', color: '#2563eb' },
  { label: 'Limited', color: '#94a3b8' },
  { label: 'Signature', color: '#d97706' },
  { label: 'Exclusive', color: '#6366f1' },
];

const PRODUCT_IMAGES = [
  '/images/San-Pham/SP1.jpg', '/images/San-Pham/SP2.jpg', '/images/San-Pham/SP3.jpg',
  '/images/San-Pham/SP4.jpg', '/images/San-Pham/Sp5.jpg', '/images/San-Pham/SP6.jpg',
  '/images/San-Pham/SP7.jpg', '/images/San-Pham/SP8.jpg', '/images/San-Pham/SP9.jpg',
  '/images/San-Pham/SP10.jpg', '/images/San-Pham/SP11.jpg', '/images/San-Pham/SP12.jpg',
  '/images/San-Pham/SP13.jpg', '/images/San-Pham/SP14.jpg', '/images/San-Pham/SP15.jpg',
  '/images/San-Pham/SP16.jpg', '/images/San-Pham/SP17.jpg',
];

export default function CollectionsPage() {
  const [activeTab, setActiveTab] = useState('spring');
  const [seasons, setSeasons] = useState<Record<string, Season>>(initialData);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [changes, setChanges] = useState<Change[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ index: number; name: string } | null>(null);
  const [form, setForm] = useState({ name: '', price: '', badge: 'New', badgeColor: '#2563eb', img: PRODUCT_IMAGES[0] });
  const [editingDesc, setEditingDesc] = useState(false);
  const [descDraft, setDescDraft] = useState('');

  const season = seasons[activeTab];

  const addChange = (field: string, oldValue: string, newValue: string) => {
    setChanges(prev => {
      const filtered = prev.filter(c => c.field !== field);
      return [...filtered, { field, oldValue, newValue }];
    });
  };

  const handleToggleStatus = () => {
    const oldStatus = season.status;
    const newStatus = oldStatus === 'Đang hiển thị' ? 'Sắp ra mắt' : 'Đang hiển thị';
    setSeasons(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], status: newStatus } }));
    addChange(`Trạng thái — ${season.label}`, oldStatus, newStatus);
  };

  const handleDeleteProduct = (index: number, name: string) => {
    setDeleteConfirm({ index, name });
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    const { index } = deleteConfirm;
    const oldList = season.products.map(p => p.name).join(', ');
    const newProducts = season.products.filter((_, i) => i !== index);
    setSeasons(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], products: newProducts } }));
    addChange(`Xóa sản phẩm — ${season.label}`, oldList, newProducts.map(p => p.name).join(', ') || '(trống)');
    setDeleteConfirm(null);
  };

  const handleAddProduct = () => {
    if (!form.name.trim() || !form.price.trim()) return;
    const newProduct: Product = { name: form.name.trim(), price: form.price.trim(), badge: form.badge, badgeColor: form.badgeColor, img: form.img };
    const oldList = season.products.map(p => p.name).join(', ');
    const newList = [...season.products, newProduct].map(p => p.name).join(', ');
    setSeasons(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], products: [...prev[activeTab].products, newProduct] } }));
    addChange(`Thêm sản phẩm — ${season.label}`, oldList || '(trống)', newList);
    setForm({ name: '', price: '', badge: 'New', badgeColor: '#2563eb', img: PRODUCT_IMAGES[0] });
    setAddModalOpen(false);
  };

  const handleEditDesc = () => { setDescDraft(season.desc); setEditingDesc(true); };

  const handleSaveDesc = () => {
    if (descDraft.trim() === season.desc) { setEditingDesc(false); return; }
    addChange(`Mô tả — ${season.label}`, season.desc, descDraft.trim());
    setSeasons(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], desc: descDraft.trim() } }));
    setEditingDesc(false);
  };

  const handleSaveConfirm = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setSaving(false);
    setModalOpen(false);
    setChanges([]);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const statusColor = (status: string) =>
    status === 'Đang hiển thị' ? { background: '#dcfce7', color: '#16a34a' } : { background: '#fef9c3', color: '#ca8a04' };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px',
    fontSize: '13px', fontFamily: "'Inter', sans-serif", outline: 'none', boxSizing: 'border-box',
    color: '#1e293b', background: '#fff',
  };
  return (
    <div style={{ minHeight: '100vh', background: '#f6f8f7', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      <div style={{ padding: '32px 40px', maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0a3d2b', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>Quản lý Bộ sưu tập</h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Điều chỉnh thứ tự hiển thị và danh sách sản phẩm theo từng mùa.</p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '4px' }}>
          {Object.entries(seasons).map(([key, s]) => {
            const active = activeTab === key;
            return (
              <button key={key} onClick={() => { setActiveTab(key); setEditingDesc(false); }} style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px', borderRadius: '12px',
                fontWeight: active ? '700' : '500', fontSize: '14px', cursor: 'pointer', whiteSpace: 'nowrap',
                fontFamily: "'Inter', sans-serif", transition: 'all 0.2s',
                background: active ? 'linear-gradient(135deg, #c5a059, #f1d592, #c5a059)' : '#fff',
                color: active ? '#0a3d2b' : '#64748b',
                boxShadow: active ? '0 4px 16px rgba(197,160,89,0.3)' : 'none',
                border: active ? 'none' : '1px solid #e2e8f0',
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                {s.label}
              </button>
            );
          })}
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
              <div style={{ width: '96px', height: '96px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img src={season.img} alt={season.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#0a3d2b', margin: 0, fontFamily: "'Playfair Display', serif" }}>{season.title}</h3>
                  <button onClick={handleToggleStatus} title="Nhấn để đổi trạng thái" style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', border: 'none', cursor: 'pointer', ...statusColor(season.status) }}>
                    {season.status}
                  </button>
                </div>
                {editingDesc ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '480px' }}>
                    <textarea value={descDraft} onChange={e => setDescDraft(e.target.value)} rows={3}
                      style={{ fontSize: '13px', color: '#334155', lineHeight: '1.6', border: '1px solid #c5a059', borderRadius: '8px', padding: '8px', fontFamily: "'Inter', sans-serif", resize: 'vertical', outline: 'none', width: '100%' }} />
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={handleSaveDesc} style={{ padding: '5px 14px', background: '#0a3d2b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Lưu</button>
                      <button onClick={() => setEditingDesc(false)} style={{ padding: '5px 14px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>Hủy</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0, maxWidth: '480px', lineHeight: '1.6' }}>{season.desc}</p>
                    <button onClick={handleEditDesc} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '2px', display: 'flex', flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>edit</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button onClick={() => setAddModalOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0a3d2b', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: '600' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_circle</span>
              Thêm sản phẩm
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {season.products.map((p, i) => (
              <div key={i} onMouseEnter={() => setHoveredProduct(i)} onMouseLeave={() => setHoveredProduct(null)}
                style={{ position: 'relative', background: '#f8fafc', borderRadius: '12px', border: `1.5px dashed ${hoveredProduct === i ? '#c5a059' : '#cbd5e1'}`, padding: '16px', transition: 'all 0.2s', boxShadow: hoveredProduct === i ? '0 8px 24px rgba(0,0,0,0.1)' : 'none' }}>
                <div style={{ aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', marginBottom: '14px', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hoveredProduct === i ? 'scale(1.1)' : 'scale(1)' }} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: '700', background: p.badgeColor + '22', color: p.badgeColor, padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.08em' }}>{p.badge}</span>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '6px 0 8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#c5a059' }}>{p.price}</span>
                  <button onClick={() => handleDeleteProduct(i, p.name)}
                    style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', borderRadius: '6px', display: 'flex' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                  </button>
                </div>
              </div>
            ))}
            <div onClick={() => setAddModalOpen(true)}
              style={{ minHeight: '260px', background: 'rgba(248,250,252,0.5)', borderRadius: '12px', border: '2px dashed #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#c5a059'; (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(248,250,252,0.5)'; }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#64748b' }}>add</span>
              </div>
              <span style={{ fontWeight: '700', color: '#64748b', fontSize: '14px' }}>Thêm sản phẩm mới</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {season.stats.map(s => (
            <div key={s.label} style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(10,61,43,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#0a3d2b', fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
              </div>
              <div>
                <p style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px' }}>{s.label}</p>
                <p style={{ fontSize: '20px', fontWeight: '900', color: '#0a3d2b', margin: 0 }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {saved && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', background: '#0a3d2b', color: '#fff', padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 200, fontSize: '14px', fontWeight: '600' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#c5a059', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          Đã lưu thay đổi thành công!
        </div>
      )}

      {changes.length > 0 && (
        <div style={{ position: 'fixed', bottom: '32px', right: '32px', background: 'rgba(10,61,43,0.92)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', padding: '8px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '16px', zIndex: 100 }}>
          <div style={{ padding: '4px 16px' }}>
            <p style={{ fontSize: '10px', fontWeight: '700', color: '#c5a059', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Đang chỉnh sửa</p>
            <p style={{ fontSize: '13px', color: '#fff', margin: 0 }}>{changes.length} thay đổi chưa lưu</p>
          </div>
          <button onClick={() => setModalOpen(true)} style={{ background: 'linear-gradient(135deg, #c5a059, #f1d592, #c5a059)', color: '#0a3d2b', fontWeight: '900', padding: '12px 28px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.05em' }}>
            LƯU THAY ĐỔI
          </button>
        </div>
      )}

      {addModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setAddModalOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'relative', background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 24px 64px rgba(0,0,0,0.15)', fontFamily: "'Inter', sans-serif", margin: '0 16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 4px' }}>Thêm sản phẩm</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px' }}>Thêm vào bộ sưu tập {season.label}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>Tên sản phẩm *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="VD: Rose de Mai EDP" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>Giá *</label>
                <input value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="VD: 2.500.000đ" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '6px' }}>Badge</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {BADGE_OPTIONS.map(b => (
                    <button key={b.label} onClick={() => setForm(f => ({ ...f, badge: b.label, badgeColor: b.color }))}
                      style={{ padding: '5px 12px', borderRadius: '6px', border: `2px solid ${form.badge === b.label ? b.color : '#e2e8f0'}`, background: form.badge === b.label ? b.color + '22' : '#fff', color: b.color, fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>Hình ảnh</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                  {PRODUCT_IMAGES.map(img => (
                    <div key={img} onClick={() => setForm(f => ({ ...f, img }))}
                      style={{ aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', border: `2px solid ${form.img === img ? '#c5a059' : '#e2e8f0'}`, cursor: 'pointer' }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setAddModalOpen(false)} style={{ flex: 1, padding: '11px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Hủy</button>
              <button onClick={handleAddProduct} disabled={!form.name.trim() || !form.price.trim()}
                style={{ flex: 1, padding: '11px', background: !form.name.trim() || !form.price.trim() ? '#94a3b8' : '#0a3d2b', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: !form.name.trim() || !form.price.trim() ? 'not-allowed' : 'pointer', fontFamily: "'Inter', sans-serif" }}>
                Thêm vào bộ sưu tập
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setDeleteConfirm(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'relative', background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px', boxShadow: '0 24px 64px rgba(0,0,0,0.15)', fontFamily: "'Inter', sans-serif", margin: '0 16px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#dc2626', fontVariationSettings: "'FILL' 1" }}>delete</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px' }}>Xóa sản phẩm?</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px', lineHeight: '1.6' }}>
              Bạn có chắc muốn xóa <strong>{deleteConfirm.name}</strong> khỏi bộ sưu tập {season.label}?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ flex: 1, padding: '11px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Hủy</button>
              <button onClick={confirmDelete} style={{ flex: 1, padding: '11px', background: '#dc2626', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Xóa</button>
            </div>
          </div>
        </div>
      )}

      <SaveConfirmModal
        open={modalOpen}
        changes={changes}
        saving={saving}
        onConfirm={handleSaveConfirm}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}
