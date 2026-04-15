"use client"
/**
 * Trang Home — kết nối /api/products?featured=true
 * Dùng: CartContext (addToCart), toast (sonner)
 */
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/hooks/useProducts";
import ProductItem from "@/component/ProductItem";
import LuxuryHeader from "@/component/LuxuryHeader";
import LuxuryFooter from "@/component/LuxuryFooter";
import HeroSection from "@/component/HeroSection";
import ScentFamilies from "@/component/ScentFamilies";

// Skeleton loader cho product grid
function ProductSkeleton() {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
      <div style={{ height: '260px', background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ padding: '16px' }}>
        <div style={{ height: '12px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '8px', width: '60%' }} />
        <div style={{ height: '16px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '12px' }} />
        <div style={{ height: '20px', background: '#f0f0f0', borderRadius: '4px', width: '40%' }} />
      </div>
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
  );
}

const SEASONS = [
  { key: 'spring', label: 'Mùa Xuân', emoji: '🌸', color: 'rgba(255,182,193,0.9)', img: 'https://fimgs.net/mdimg/perfume/375x500.7955.jpg', desc: 'Hương hoa cỏ tươi mới' },
  { key: 'summer', label: 'Mùa Hạ', emoji: '☀️', color: 'rgba(255,165,0,0.9)', img: 'https://fimgs.net/mdimg/perfume/375x500.41675.jpg', desc: 'Cam chanh & Biển cả' },
  { key: 'autumn', label: 'Mùa Thu', emoji: '🍂', color: 'rgba(210,105,30,0.9)', img: 'https://fimgs.net/mdimg/perfume/375x500.14365.jpg', desc: 'Gỗ & Hổ phách ấm áp' },
  { key: 'winter', label: 'Mùa Đông', emoji: '❄️', color: 'rgba(70,130,180,0.9)', img: 'https://fimgs.net/mdimg/perfume/375x500.73669.jpg', desc: 'Gia vị & Trầm hương' },
];

const TESTIMONIALS = [
  { name: 'Nguyễn Minh Anh', role: 'Khách hàng thân thiết', text: 'Hương thơm rất sang trọng và lưu hương cực kỳ lâu. Tôi đã giới thiệu cho rất nhiều bạn bè và họ đều rất hài lòng. Dịch vụ chăm sóc khách hàng tuyệt vời!' },
  { name: 'Trần Thị Bảo Châu', role: 'Đối tác bán sỉ', text: 'Hợp tác với LUXE SCENT đã giúp doanh thu cửa hàng tôi tăng 40%. Sản phẩm chất lượng, giao hàng nhanh, chính sách hỗ trợ rất tốt.' },
  { name: 'Lê Hoàng Nam', role: 'Khách hàng VIP', text: 'Đã mua nhiều nơi nhưng LUXE SCENT vẫn là lựa chọn số 1 của tôi. Hương thơm độc đáo, đóng gói sang trọng, xứng đáng với từng đồng bỏ ra.' },
];

export default function Home() {
  const { addToCart } = useCart();
  const products = useProducts({ featured: true, limit: 8 });
  const loading = products.length === 0;

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`Đã thêm "${product.name}" vào giỏ hàng`, {
      description: `${product.brand} · ${product.volume}`,
      duration: 2500,
    });
  };

  return (
    <>
      <LuxuryHeader />
      <HeroSection />

      {/* Seasonal Collections */}
      <section style={{ padding: '80px 0', background: 'rgba(10,61,42,0.03)' }}>
        <div className="container">
          <div className="text-center mb-5">
            <p style={{ color: 'var(--soft-gold)', fontSize: '14px', letterSpacing: '3px', fontWeight: '500', marginBottom: '10px' }}>BỘ SƯU TẬP ĐẶC BIỆT</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,5vw,48px)', color: 'var(--emerald-green)', marginBottom: '15px' }}>Khám Phá Theo Mùa</h2>
            <div className="gold-divider" />
            <p style={{ color: '#888', maxWidth: '700px', margin: '20px auto 0', fontSize: '15px' }}>Mỗi mùa mang một câu chuyện riêng, một hương thơm đặc trưng</p>
          </div>
          <div className="row g-4">
            {SEASONS.map(s => (
              <div key={s.key} className="col-md-6 col-lg-3">
                <a href={`/collections/${s.key}`} style={{ textDecoration: 'none' }}>
                  <div style={{ position: 'relative', height: '400px', borderRadius: '15px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 5px 20px rgba(0,0,0,0.1)' }}>
                    <img src={s.img} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${s.color}, transparent)`, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '25px' }}>
                      <span style={{ fontSize: '40px', marginBottom: '10px' }}>{s.emoji}</span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>{s.label}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '13px', margin: 0 }}>{s.desc}</p>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <a href="/collections"><button className="luxury-btn-outline">XEM TẤT CẢ BỘ SƯU TẬP</button></a>
          </div>
        </div>
      </section>

      <ScentFamilies />

      {/* Best Sellers — từ API */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <p style={{ color: 'var(--soft-gold)', fontSize: '14px', letterSpacing: '3px', fontWeight: '500', marginBottom: '10px' }}>BÁN CHẠY NHẤT</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,5vw,48px)', color: 'var(--emerald-green)', marginBottom: '15px' }}>Sản Phẩm Nổi Bật</h2>
            <div className="gold-divider" />
          </div>
          <div className="row g-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="col-6 col-md-4 col-lg-3"><ProductSkeleton /></div>
                ))
              : products.map(product => (
                  <div key={product.id} className="col-6 col-md-4 col-lg-3">
                    <ProductItem
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      brand={product.brand}
                      discount={product.discount}
                      volume={product.volume}
                      image={product.image}
                      badge={product.badge}
                      onAdd={() => handleAddToCart(product)}
                    />
                  </div>
                ))
            }
          </div>
          <div className="text-center mt-5">
            <a href="/shop"><button className="luxury-btn-outline">XEM TẤT CẢ SẢN PHẨM</button></a>
          </div>
        </div>
      </section>

      {/* Wholesale CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--emerald-green) 0%, #0d5738 100%)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-white">
              <p style={{ color: 'var(--soft-gold)', fontSize: '14px', letterSpacing: '3px', fontWeight: '500', marginBottom: '15px' }}>CHƯƠNG TRÌNH ĐẶC BIỆT</p>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,5vw,48px)', marginBottom: '20px' }}>Đăng Ký Bán Sỉ</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '25px', opacity: '0.9' }}>
                Trở thành đối tác của LUXE SCENT để nhận được giá sỉ tốt nhất thị trường, chính sách hỗ trợ đặc biệt và cơ hội kinh doanh bền vững.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
                {['Giá sỉ cạnh tranh, chiết khấu cao', 'Hỗ trợ vận chuyển toàn quốc', 'Tư vấn kinh doanh miễn phí', 'Chính sách đổi trả linh hoạt'].map(item => (
                  <li key={item} style={{ marginBottom: '12px', fontSize: '15px' }}>✓ {item}</li>
                ))}
              </ul>
              <a href="/wholesale"><button className="luxury-btn-outline">ĐĂNG KÝ NGAY</button></a>
            </div>
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '20px', padding: '50px', border: '2px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontSize: '80px', marginBottom: '20px' }}>📦</div>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '15px', fontSize: '28px' }}>Liên Hệ Ngay</h4>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px' }}>Hotline: 1900-LUXE (5893)</p>
                <p style={{ color: 'var(--soft-gold)', fontSize: '14px' }}>Tư vấn miễn phí 24/7</p>
              </div>
            </div>
          </div>
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="scent-particle" style={{ left: `${10 + i * 15}%`, bottom: '20%', animationDelay: `${i * 0.8}s` }} />
        ))}
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div className="text-center mb-5">
            <p style={{ color: 'var(--soft-gold)', fontSize: '14px', letterSpacing: '3px', fontWeight: '500', marginBottom: '10px' }}>KHÁCH HÀNG NÓI GÌ</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px,5vw,48px)', color: 'var(--emerald-green)', marginBottom: '15px' }}>Câu Chuyện Thành Công</h2>
            <div className="gold-divider" />
          </div>
          <div className="row g-4">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="col-md-4">
                <div style={{ background: 'var(--cream-white)', padding: '30px', borderRadius: '15px', height: '100%' }}>
                  <div style={{ color: 'var(--soft-gold)', fontSize: '32px', marginBottom: '15px' }}>★★★★★</div>
                  <p style={{ fontSize: '15px', lineHeight: '1.8', marginBottom: '20px', fontStyle: 'italic', color: '#555' }}>"{t.text}"</p>
                  <div className="d-flex align-items-center">
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--soft-gold)', marginRight: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '18px' }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h6 style={{ fontFamily: 'var(--font-heading)', color: 'var(--emerald-green)', marginBottom: '3px' }}>{t.name}</h6>
                      <small style={{ color: '#888' }}>{t.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LuxuryFooter />
    </>
  );
}
