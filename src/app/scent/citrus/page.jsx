"use client"
import { useCart } from "@/context/CartContext";
import LuxuryHeader from "@/component/LuxuryHeader";
import LuxuryFooter from "@/component/LuxuryFooter";
import ProductItem from "@/component/ProductItem";
import Link from "next/link";
import { toast } from "sonner";

const FAMILY = {
  id: 'citrus',
  name: 'Hương Cam Chanh',
  nameEn: 'Citrus',
  icon: '🍊',
  color: '#FFA500',
  accent: '#d97706',
  desc: 'Sảng khoái và tươi mát, hương cam chanh mang đến năng lượng tích cực cho mỗi ngày. Từ bergamot Ý đến chanh vàng Sicilia — những nốt hương đầu bùng nổ, tươi sáng như ánh nắng ban mai.',
  notes: ['Bergamot', 'Chanh vàng', 'Cam ngọt', 'Bưởi', 'Quýt'],
};

const PRODUCTS = [
  { id: 3,  name: 'Citrus Garden',  brand: 'LUXE SCENT', price: 2800000, wholesalePrice: 2380000,              volume: '50ml',  image: '/images/San-Pham/SP3.jpg' },
  { id: 7,  name: 'Bergamot Bliss', brand: 'LUXE SCENT', price: 2900000, wholesalePrice: 2465000,              volume: '50ml',  image: '/images/San-Pham/SP7.jpg' },
  { id: 11, name: 'Sauvage Elixir', brand: 'Dior',        price: 4800000, wholesalePrice: 4080000, discount: 12, volume: '60ml',  image: '/images/San-Pham/SP11.jpg' },
  { id: 15, name: 'Aventus',        brand: 'Creed',       price: 9600000, wholesalePrice: 8200000,              volume: '75ml',  image: '/images/San-Pham/SP15.jpg' },
];

const OTHER_FAMILIES = [
  { id: 'floral',   name: 'Hương Hoa',         icon: '🌸', color: '#FFB6C1' },
  { id: 'woody',    name: 'Hương Gỗ',           icon: '🌲', color: '#8B4513' },
  { id: 'oriental', name: 'Hương Phương Đông', icon: '✨', color: '#9370DB' },
];

export default function CitrusPage() {
  const { addToCart } = useCart();
  const handleAdd = (p) => { addToCart(p); toast.success(`Đã thêm ${p.name} vào giỏ hàng`); };

  return (
    <>
      <LuxuryHeader />
      <main>
        <section style={{ background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)', padding: '80px 20px 60px', textAlign: 'center' }}>
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
                <span key={n} style={{ padding: '6px 16px', borderRadius: '999px', background: 'rgba(217,119,6,0.1)', color: FAMILY.accent, fontSize: '13px', fontWeight: '600' }}>{n}</span>
              ))}
            </div>
          </div>
        </section>

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
