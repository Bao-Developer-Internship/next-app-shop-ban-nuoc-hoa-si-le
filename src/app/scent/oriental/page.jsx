"use client"
import { useCart } from "@/context/CartContext";
import LuxuryHeader from "@/component/LuxuryHeader";
import LuxuryFooter from "@/component/LuxuryFooter";
import ProductItem from "@/component/ProductItem";
import Link from "next/link";
import { toast } from "sonner";

const FAMILY = {
  id: 'oriental',
  name: 'Hương Phương Đông',
  nameEn: 'Oriental',
  icon: '✨',
  color: '#9370DB',
  accent: '#7c3aed',
  desc: 'Huyền bí và quyến rũ, hương phương đông mang đến chiều sâu và sự sang trọng không thể cưỡng lại. Từ hổ phách nồng nàn đến xạ hương bí ẩn — mỗi nốt hương là một câu chuyện ngàn lẻ một đêm.',
  notes: ['Hổ phách', 'Xạ hương', 'Vani', 'Nhựa thơm', 'Gia vị phương đông'],
};

const PRODUCTS = [
  { id: 4,  name: 'Amber Noir',       brand: 'LUXE SCENT',    price: 3900000, wholesalePrice: 3315000, discount: 10, volume: '100ml', image: '/images/San-Pham/SP4.jpg' },
  { id: 9,  name: 'Baccarat Rouge 540', brand: 'Maison Francis', price: 8500000, wholesalePrice: 7225000,              volume: '70ml',  image: '/images/San-Pham/SP9.jpg',  badge: 'Bán Chạy' },
  { id: 12, name: 'Black Opium',      brand: 'YSL',           price: 3200000, wholesalePrice: 2560000, discount: 20, volume: '50ml',  image: '/images/San-Pham/SP12.jpg' },
];

const OTHER_FAMILIES = [
  { id: 'floral',  name: 'Hương Hoa',       icon: '🌸', color: '#FFB6C1' },
  { id: 'woody',   name: 'Hương Gỗ',         icon: '🌲', color: '#8B4513' },
  { id: 'citrus',  name: 'Hương Cam Chanh', icon: '🍊', color: '#FFA500' },
];

export default function OrientalPage() {
  const { addToCart } = useCart();
  const handleAdd = (p) => { addToCart(p); toast.success(`Đã thêm ${p.name} vào giỏ hàng`); };

  return (
    <>
      <LuxuryHeader />
      <main>
        <section style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #ddd6fe 100%)', padding: '80px 20px 60px', textAlign: 'center' }}>
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
                <span key={n} style={{ padding: '6px 16px', borderRadius: '999px', background: 'rgba(124,58,237,0.1)', color: FAMILY.accent, fontSize: '13px', fontWeight: '600' }}>{n}</span>
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
              <div key={p.id} className="col-sm-6 col-lg-4">
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
