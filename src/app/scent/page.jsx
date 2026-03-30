"use client"
import Link from "next/link";
import LuxuryHeader from "@/component/LuxuryHeader";
import LuxuryFooter from "@/component/LuxuryFooter";

const FAMILIES = [
  {
    id: 'floral',
    name: 'Hương Hoa',
    nameEn: 'Floral',
    icon: '🌸',
    color: '#FFB6C1',
    accent: '#e91e8c',
    bg: 'linear-gradient(135deg, #fff0f5, #ffd6e8)',
    desc: 'Tinh tế, nữ tính — hoa hồng, hoa nhài, hoa lan',
    count: 5,
  },
  {
    id: 'woody',
    name: 'Hương Gỗ',
    nameEn: 'Woody',
    icon: '🌲',
    color: '#c8956c',
    accent: '#8B4513',
    bg: 'linear-gradient(135deg, #fdf6f0, #ede0d0)',
    desc: 'Trầm ấm, bí ẩn — đàn hương, trầm hương, tuyết tùng',
    count: 5,
  },
  {
    id: 'citrus',
    name: 'Hương Cam Chanh',
    nameEn: 'Citrus',
    icon: '🍊',
    color: '#FFA500',
    accent: '#d97706',
    bg: 'linear-gradient(135deg, #fffbeb, #fde68a)',
    desc: 'Tươi mát, sảng khoái — bergamot, chanh, cam ngọt',
    count: 4,
  },
  {
    id: 'oriental',
    name: 'Hương Phương Đông',
    nameEn: 'Oriental',
    icon: '✨',
    color: '#9370DB',
    accent: '#7c3aed',
    bg: 'linear-gradient(135deg, #f5f3ff, #ddd6fe)',
    desc: 'Huyền bí, quyến rũ — hổ phách, xạ hương, vani',
    count: 3,
  },
];

export default function ScentPage() {
  return (
    <>
      <LuxuryHeader />
      <main>
        {/* Hero */}
        <section style={{ background: 'linear-gradient(135deg, #0a3d2b 0%, #1a6b4a 100%)', padding: '80px 20px', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', letterSpacing: '3px', color: '#D4AF37', marginBottom: '16px', textTransform: 'uppercase' }}>KHÁM PHÁ</p>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: '700', color: '#fff', marginBottom: '20px' }}>
              Gia Đình Hương Thơm
            </h1>
            <div style={{ width: '60px', height: '3px', background: '#D4AF37', margin: '0 auto 24px', borderRadius: '2px' }} />
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', fontStyle: 'italic' }}>
              Mỗi gia đình hương thơm kể một câu chuyện riêng. Hãy khám phá và tìm ra ngôn ngữ hương thơm của bạn.
            </p>
          </div>
        </section>

        {/* Family Grid */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '28px' }}>
            {FAMILIES.map(f => (
              <Link key={f.id} href={`/scent/${f.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.3s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${f.color}40`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}>
                  {/* Color header */}
                  <div style={{ background: f.bg, padding: '48px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '64px', marginBottom: '12px' }}>{f.icon}</div>
                    <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: f.accent, textTransform: 'uppercase', margin: 0 }}>{f.nameEn}</p>
                  </div>
                  {/* Info */}
                  <div style={{ background: '#fff', padding: '24px' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: '700', color: '#0a3d2b', margin: '0 0 8px' }}>{f.name}</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px', lineHeight: '1.6' }}>{f.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: f.accent, background: `${f.color}20`, padding: '4px 12px', borderRadius: '999px' }}>
                        {f.count} sản phẩm
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: '700', color: '#0a3d2b' }}>Xem ngay →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <LuxuryFooter />
    </>
  );
}
