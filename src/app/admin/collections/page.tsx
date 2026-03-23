"use client"
import { useState } from 'react';
import SaveConfirmModal from '@/components/admin/SaveConfirmModal';

const seasonData: Record<string, {
  label: string; icon: string; title: string; desc: string; status: string;
  img: string; products: { badge: string; badgeColor: string; name: string; price: string; img: string }[];
  stats: { icon: string; label: string; value: string }[];
}> = {
  spring: {
    label: 'Mùa Xuân', icon: 'filter_vintage',
    title: 'Bộ sưu tập Xuân 2026', status: 'Đang hiển thị',
    desc: 'Hương thơm nhẹ nhàng từ hoa cỏ và cam chanh, mang lại cảm giác tươi mới của buổi sáng đầu xuân.',
    img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc5e?w=200&h=200&fit=crop',
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
    label: 'Mùa Hạ', icon: 'light_mode',
    title: 'Bộ sưu tập Hạ 2026', status: 'Đang hiển thị',
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
    label: 'Mùa Thu', icon: 'eco',
    title: 'Bộ sưu tập Thu 2026', status: 'Sắp ra mắt',
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
    label: 'Mùa Đông', icon: 'ac_unit',
    title: 'Bộ sưu tập Đông 2026', status: 'Sắp ra mắt',
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

const mockChanges = [
  { field: 'Thứ tự sản phẩm — Mùa Xuân', oldValue: 'Velvet Morning Mist, Rose de Mai, Golden Amber', newValue: 'Rose de Mai, Velvet Morning Mist, Golden Amber' },
  { field: 'Trạng thái — Mùa Thu', oldValue: 'Đang hiển thị', newValue: 'Sắp ra mắt' },
  { field: 'Sản phẩm mới thêm — Mùa Hạ', oldValue: '(trống)', newValue: 'Tropical Mango Mist' },
  { field: 'Mô tả — Bộ sưu tập Đông', oldValue: 'Hương đông lạnh', newValue: 'Hương xạ hương, vani và gỗ tuyết tùng...' },
];

export default function CollectionsPage() {
  const [activeTab, setActiveTab] = useState('spring');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const season = seasonData[activeTab];

  const handleSaveConfirm = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1200));
    setSaving(false);
    setModalOpen(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const statusColor = (status: string) =>
    status === 'Đang hiển thị'
      ? { background: '#dcfce7', color: '#16a34a' }
      : { background: '#fef9c3', color: '#ca8a04' };

  return (
    <div style={{ minHeight: '100vh', background: '#f6f8f7', fontFamily: "'Inter', sans-serif", position: 'relative' }}>
      <div style={{ padding: '32px 40px', maxWidth: '1200px', margin: '0 auto' }}>

        {/* Title */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0a3d2b', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            Quản lý Bộ sưu tập
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            Điều chỉnh thứ tự hiển thị và danh sách sản phẩm theo từng mùa.
          </p>
        </div>

        {/* Season Tabs */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '4px' }}>
          {Object.entries(seasonData).map(([key, s]) => {
            const active = activeTab === key;
            return (
              <button key={key} onClick={() => setActiveTab(key)} style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px',
                borderRadius: '12px', fontWeight: active ? '700' : '500', fontSize: '14px',
                cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: "'Inter', sans-serif",
                transition: 'all 0.2s',
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

        {/* Collection Detail Card */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '32px' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #f1f5f9', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ width: '96px', height: '96px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <img src={season.img} alt={season.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#0a3d2b', margin: 0, fontFamily: "'Playfair Display', serif" }}>{season.title}</h3>
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', ...statusColor(season.status) }}>
                    {season.status}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, maxWidth: '480px', lineHeight: '1.6' }}>{season.desc}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0a3d2b', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: '600' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_circle</span>
                Thêm sản phẩm
              </button>
              <button style={{ padding: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', cursor: 'pointer', display: 'flex', color: '#64748b' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_horiz</span>
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {season.products.map((p, i) => (
              <div key={i}
                onMouseEnter={() => setHoveredProduct(i)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  position: 'relative', background: '#f8fafc', borderRadius: '12px',
                  border: `1.5px dashed ${hoveredProduct === i ? '#c5a059' : '#cbd5e1'}`,
                  padding: '16px', cursor: 'grab', transition: 'all 0.2s',
                  boxShadow: hoveredProduct === i ? '0 8px 24px rgba(0,0,0,0.1)' : 'none',
                }}>
                <div style={{ position: 'absolute', top: '8px', left: '8px', opacity: hoveredProduct === i ? 1 : 0, transition: 'opacity 0.2s', background: '#c5a059', color: '#0a3d2b', borderRadius: '6px', padding: '3px', display: 'flex' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>drag_indicator</span>
                </div>
                <div style={{ aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', marginBottom: '14px', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', transform: hoveredProduct === i ? 'scale(1.1)' : 'scale(1)' }} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: '700', background: p.badgeColor + '22', color: p.badgeColor, padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.08em' }}>{p.badge}</span>
                <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '6px 0 8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</h4>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#c5a059' }}>{p.price}</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', borderRadius: '6px', display: 'flex' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                    </button>
                    <button style={{ padding: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', borderRadius: '6px', display: 'flex' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#0a3d2b')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>visibility</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add Card */}
            <div
              style={{ minHeight: '260px', background: 'rgba(248,250,252,0.5)', borderRadius: '12px', border: '2px dashed #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#c5a059'; (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#cbd5e1'; (e.currentTarget as HTMLDivElement).style.background = 'rgba(248,250,252,0.5)'; }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#64748b' }}>add</span>
              </div>
              <span style={{ fontWeight: '700', color: '#64748b', fontSize: '14px' }}>Thêm sản phẩm mới</span>
              <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', marginTop: '6px', lineHeight: '1.5' }}>Kéo thả hoặc nhấn để chọn</p>
            </div>
          </div>
        </div>

        {/* Stats */}
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

      {/* Toast */}
      {saved && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', background: '#0a3d2b', color: '#fff', padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 200, fontSize: '14px', fontWeight: '600' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#c5a059', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          Đã lưu thay đổi thành công!
        </div>
      )}

      {/* Floating Save Bar */}
      <div style={{ position: 'fixed', bottom: '32px', right: '32px', background: 'rgba(10,61,43,0.92)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', padding: '8px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: '16px', zIndex: 100 }}>
        <div style={{ padding: '4px 16px' }}>
          <p style={{ fontSize: '10px', fontWeight: '700', color: '#c5a059', textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Đang chỉnh sửa</p>
          <p style={{ fontSize: '13px', color: '#fff', margin: 0 }}>{mockChanges.length} thay đổi chưa lưu</p>
        </div>
        <button onClick={() => setModalOpen(true)}
          style={{ background: 'linear-gradient(135deg, #c5a059, #f1d592, #c5a059)', color: '#0a3d2b', fontWeight: '900', padding: '12px 28px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.05em' }}>
          LƯU THAY ĐỔI
        </button>
      </div>

      {/* Save Confirm Modal */}
      <SaveConfirmModal
        open={modalOpen}
        changes={mockChanges}
        saving={saving}
        onConfirm={handleSaveConfirm}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}
