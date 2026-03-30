"use client"
import { useCart } from "@/context/CartContext";
import LuxuryHeader from "@/component/LuxuryHeader";
import LuxuryFooter from "@/component/LuxuryFooter";
import ProductItem from "@/component/ProductItem";
import Link from "next/link";
import { toast } from "sonner";

const FAMILY = {
  id: 'floral',
  name: 'Hương Hoa',
  nameEn: 'Floral',
  icon: '🌸',
  color: '#FFB6C1',
  accent: '#e91e8c',
  desc: 'Tinh tế và nữ tính, hương hoa gợi lên vẻ đẹp thuần khiết của những cánh hoa đang nở rộ. Từ hoa hồng nhung đến hoa nhài trắng muốt — mỗi nốt hương là một bài thơ về thiên nhiên.',
  notes: ['Hoa hồng', 'Hoa nhài', 'Hoa mẫu đơn', 'Hoa lan', 'Hoa anh đào'],
};

const PRODUCTS = [
  { id: 1,  name: 'Velvet Rose Intense',    brand: 'LUXE SCENT',  price: 3500000, wholesalePrice: 2975000, discount: 15, volume: '50ml',  image: '/images/San-Pham/SP1.jpg',  badge: 'Bán Chạy' },
  { id: 5,  name: 'White Jasmine',          brand: 'LUXE SCENT',  price: 3200000, wholesalePrice: 2720000,              volume: '50ml',  image: '/images/San-Pham/Sp5.jpg' },
  { id: 8,  name: 'Midnight Orchid',        brand: 'LUXE SCENT',  price: 4500000, wholesalePrice: 3825000, discount: 15, volume: '100ml', image: '/images/San-Pham/SP8.jpg',  badge: 'Limited' },
  { id: 13, name: "Rose of No Man's Land",  brand: 'Byredo',      price: 5400000, wholesalePrice: 4600000,              volume: '50ml',  image: '/images/San-Pham/SP13.jpg' },
  { id: 17, name: 'La Vie Est Belle',       brand: 'Lancôme',     price: 3800000, wholesalePrice: 3200000,              volume: '50ml',  image: '/images/San-Pham/SP17.jpg' },
];

const OTHER_FAMILIES = [
  { id: 'woody',    name: 'Hương Gỗ',         icon: '🌲', color: '#8B4513' },
  { id: 'citrus',   name: 'Hương Cam Chanh',   icon: '🍊', color: '#FFA500' },
  { id: 'oriental', name: 'Hương Phương Đông', icon: '✨', color: '#9370DB' },
];

export default function FloralPage() {
  const { addToCart } = useCart();

  const handleAdd = (p) => {
    addToCart(p);
    toast.success(`Đã thêm ${p.name} vào giỏ hàng`);
  };

  return (
    <>
      <LuxuryHeader />
      <main>
        {/* Hero */}
        <section style={{ background: 'linear-gradient(135deg, #fff0f5 0%, #ffe4ef 50%, #ffd6e8 100%)', padding: '80px 20px 60px', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <nav style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '24px' }}>
              <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Trang chủ</Link>
              <span style={{ margin: '0 8px' }}>/</span>
              <Link href="/scent" style={{ color: '#94a3b8', textDecoration: 'none' }}>Gia đình hương</Link>
              <span style={{ margin: '0 8px' }}>/</span>
              <span style={{ color: FAMILY.accent, fontWeight: '600' }}>{FAMILY.name}</span>
            </nav>
            <div style={{ fontSize: '72px', marginBottom: '16px' }}>{FAMILY.icon}</div>
            <p style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '3px', color: FAMILY.accent, marginBottom: '12px', textTransform: 'uppercase' }}>{FAMILY.nameEn}</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: '700', color: '#0a3d2b', marginBottom: '20px' }}>{FAMILY.name}</h1>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.8', fontStyle: 'italic' }}>{FAMILY.desc}</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
              {FAMILY.notes.map(n => (
                <span key={n} style={{ padding: '6px 16px', borderRadius: '999px', background: 'rgba(233,30,140,0.1)', color: FAMILY.accent, fontSize: '13px', fontWeight: '600' }}>{n}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', paddingBottom: '20px', borderBottom: '1px solid #f1f5f9' }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: '700', color: '#0a3d2b', margin: '0 0 6px' }}>Sản phẩm nổi bật</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>{PRODUCTS.length} hương thơm được tuyển chọn</p>
            </div>
          </div>
          <div className="row g-4">
            {PRODUCTS.map(p => (
              <div key={p.id} className="col-sm-6 col-lg-3">
                <ProductItem id={p.id} name={p.name} price={p.price} brand={p.brand} discount={p.discount} volume={p.volume} image={p.image} badge={p.badge} onAdd={() => handleAdd(p)} />
              </div>
            ))}
          </div>
        </section>

        {/* Other families */}
        <section style={{ background: '#f6f8f7', padding: '64px 20px', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: '700', color: '#0a3d2b', marginBottom: '32px' }}>Khám phá gia đình hương khác</h2>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {OTHER_FAMILIES.map(f => (
                <Link key={f.id} href={`/scent/${f.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '28px 36px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', minWidth: '160px' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = f.color; e.currentTarget.style.boxShadow = `0 8px 24px ${f.color}30`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>{f.icon}</div>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#0a3d2b', margin: 0 }}>{f.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <LuxuryFooter />
    </>
  );
}
