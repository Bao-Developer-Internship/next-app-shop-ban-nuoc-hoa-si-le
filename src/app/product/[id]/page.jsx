'use client';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import LuxuryHeader from '@/component/LuxuryHeader';
import LuxuryFooter from '@/component/LuxuryFooter';

const PRODUCTS = {
  1:  { name: 'Velvet Rose Intense',    brand: 'Luxe Scent',         price: 4200000, volume: '50ml', image: '/images/San-Pham/SP1.jpg',  gender: 'Nữ',    family: 'Floral',              longevity: 4, sillage: 3, notes: { top: 'Hoa hồng, Hoa mẫu đơn',        heart: 'Nhung hoa hồng, Iris',        base: 'Xạ hương, Gỗ đàn hương' },           desc: 'Velvet Rose Intense là bản tình ca của những cánh hoa hồng nhung đỏ thẫm, được chắt lọc từ vườn hoa Bulgary. Hương thơm nồng nàn, quyến rũ và đầy nữ tính.' },
  2:  { name: 'Oud Mystique',           brand: 'Luxe Scent',         price: 5800000, volume: '50ml', image: '/images/San-Pham/SP2.jpg',  gender: 'Unisex',family: 'Oriental / Woody',    longevity: 5, sillage: 5, notes: { top: 'Hoa tiêu hồng, Nghệ tây',       heart: 'Trầm hương Oud, Hoa hồng',    base: 'Hổ phách, Xạ hương, Gỗ tuyết tùng' }, desc: 'Oud Mystique là hành trình vào trái tim của phương Đông huyền bí. Trầm hương Oud quý hiếm kết hợp với hoa hồng Bulgary tạo nên một kiệt tác khứu giác.' },
  3:  { name: 'Citrus Garden',          brand: 'Luxe Scent',         price: 3100000, volume: '50ml', image: '/images/San-Pham/SP3.jpg',  gender: 'Unisex',family: 'Citrus / Fresh',      longevity: 3, sillage: 3, notes: { top: 'Chanh vàng, Bergamot, Bưởi',   heart: 'Hoa nhài, Hoa cam',           base: 'Gỗ trắng, Xạ hương' },               desc: 'Citrus Garden mang đến cảm giác tươi mát như đứng giữa vườn cam chanh rực rỡ dưới ánh nắng ban mai. Nhẹ nhàng, sảng khoái và đầy sức sống.' },
  4:  { name: 'Amber Noir',             brand: 'Luxe Scent',         price: 4900000, volume: '50ml', image: '/images/San-Pham/SP4.jpg',  gender: 'Unisex',family: 'Oriental / Woody',    longevity: 5, sillage: 4, notes: { top: 'Hổ phách, Cam Bergamot',        heart: 'Hoa nhài, Hoa hồng',          base: 'Gỗ đàn hương, Xạ hương, Vani' },     desc: 'Amber Noir là sự giao thoa giữa ánh sáng và bóng tối. Hổ phách nồng ấm bao bọc lấy những nốt hoa tinh tế, tạo nên một hương thơm đầy chiều sâu và bí ẩn.' },
  5:  { name: 'White Jasmine',          brand: 'Luxe Scent',         price: 3600000, volume: '50ml', image: '/images/San-Pham/Sp5.jpg',  gender: 'Nữ',    family: 'Floral',              longevity: 4, sillage: 3, notes: { top: 'Hoa nhài, Hoa cam',             heart: 'Hoa nhài trắng, Hoa huệ',     base: 'Xạ hương trắng, Gỗ đàn hương' },     desc: 'White Jasmine là tinh túy của những bông hoa nhài trắng tinh khôi, được hái vào lúc bình minh khi hương thơm đạt đỉnh điểm. Thuần khiết và quyến rũ.' },
  6:  { name: 'Sandalwood Dream',       brand: 'Luxe Scent',         price: 4400000, volume: '50ml', image: '/images/San-Pham/SP6.jpg',  gender: 'Nam',   family: 'Woody',               longevity: 5, sillage: 4, notes: { top: 'Bergamot, Hạt tiêu',            heart: 'Gỗ đàn hương, Hoa hồng',      base: 'Gỗ đàn hương Mysore, Xạ hương' },    desc: 'Sandalwood Dream đưa bạn vào giấc mơ giữa rừng đàn hương Mysore huyền thoại. Ấm áp, mềm mại và sang trọng — một hương thơm dành cho những tâm hồn tinh tế.' },
  7:  { name: 'Bergamot Bliss',         brand: 'Luxe Scent',         price: 2900000, volume: '50ml', image: '/images/San-Pham/SP7.jpg',  gender: 'Unisex',family: 'Citrus / Aromatic',   longevity: 3, sillage: 3, notes: { top: 'Bergamot Calabria, Chanh',     heart: 'Hoa oải hương, Hoa nhài',     base: 'Gỗ tuyết tùng, Xạ hương' },          desc: 'Bergamot Bliss là sự bùng nổ của Bergamot Calabria tươi mát, kết hợp với hoa oải hương thư giãn. Một hương thơm hoàn hảo cho những ngày năng động.' },
  8:  { name: 'Midnight Orchid',        brand: 'Luxe Scent',         price: 5200000, volume: '50ml', image: '/images/San-Pham/SP8.jpg',  gender: 'Nữ',    family: 'Floral / Oriental',   longevity: 5, sillage: 5, notes: { top: 'Hoa lan, Hoa hồng đen',        heart: 'Hoa lan hồ điệp, Hoa nhài',   base: 'Xạ hương đen, Gỗ đàn hương, Vani' }, desc: 'Midnight Orchid là bản nhạc đêm của những bông hoa lan huyền bí. Sang trọng, quyến rũ và đầy mê hoặc — dành cho những người phụ nữ tự tin và bí ẩn.' },
  9:  { name: 'Baccarat Rouge 540',     brand: 'Maison Francis',     price: 8500000, volume: '70ml', image: '/images/San-Pham/SP9.jpg',  gender: 'Unisex',family: 'Floral / Oriental',   longevity: 5, sillage: 5, notes: { top: 'Nghệ tây, Hoa nhài',           heart: 'Hoa nhài Sambac, Hoa hồng',   base: 'Hổ phách, Gỗ tuyết tùng, Xạ hương' }, desc: 'Baccarat Rouge 540 là kiệt tác của nhà Maison Francis Kurkdjian. Sự kết hợp hoàn hảo giữa hoa nhài Sambac và hổ phách tạo nên một hương thơm không thể quên.' },
  10: { name: 'Santal 33',              brand: 'Le Labo',            price: 6800000, volume: '50ml', image: '/images/San-Pham/SP10.jpg', gender: 'Unisex',family: 'Woody / Aromatic',    longevity: 4, sillage: 4, notes: { top: 'Violet, Iris, Cardamom',        heart: 'Gỗ đàn hương, Gỗ tuyết tùng', base: 'Xạ hương, Hổ phách, Gỗ đàn hương' }, desc: 'Santal 33 của Le Labo là biểu tượng của sự tối giản sang trọng. Gỗ đàn hương ấm áp kết hợp với Iris tinh tế tạo nên một hương thơm đặc trưng không thể nhầm lẫn.' },
  11: { name: 'Sauvage Elixir',         brand: 'Dior',               price: 4800000, volume: '60ml', image: '/images/San-Pham/SP11.jpg', gender: 'Nam',   family: 'Citrus / Woody',      longevity: 4, sillage: 4, notes: { top: 'Bergamot, Hạt tiêu, Gừng',    heart: 'Hoa oải hương, Geranium',     base: 'Hổ phách, Gỗ tuyết tùng, Xạ hương' }, desc: 'Sauvage Elixir của Dior là phiên bản đậm đặc và quyến rũ nhất của dòng Sauvage. Bergamot tươi mát mở đầu, nhường chỗ cho hổ phách nồng nàn và gỗ tuyết tùng ấm áp.' },
  12: { name: 'Black Opium',            brand: 'YSL',                price: 3200000, volume: '50ml', image: '/images/San-Pham/SP12.jpg', gender: 'Nữ',    family: 'Oriental / Gourmand', longevity: 4, sillage: 4, notes: { top: 'Cà phê, Hoa cam, Hoa lê',     heart: 'Hoa nhài, Hoa cam, Hoa hồng', base: 'Vani, Gỗ đàn hương, Xạ hương' },     desc: 'Black Opium của YSL là sự kết hợp táo bạo giữa cà phê đen và hoa nhài trắng. Một hương thơm đầy năng lượng, quyến rũ và hiện đại dành cho người phụ nữ mạnh mẽ.' },
  13: { name: "Rose of No Man's Land",  brand: 'Byredo',             price: 5400000, volume: '50ml', image: '/images/San-Pham/SP13.jpg', gender: 'Nữ',    family: 'Floral / Woody',      longevity: 4, sillage: 3, notes: { top: 'Hoa hồng Thổ Nhĩ Kỳ, Hoa mẫu đơn', heart: 'Hoa hồng, Hoa nhài',    base: 'Gỗ đàn hương, Xạ hương trắng' },     desc: "Rose of No Man's Land của Byredo là lời tri ân dành cho những y tá dũng cảm trong chiến tranh. Hoa hồng Thổ Nhĩ Kỳ và hoa mẫu đơn tạo nên một hương thơm vừa mạnh mẽ vừa dịu dàng." },
  14: { name: 'Tobacco Vanille',        brand: 'Tom Ford',           price: 8150000, volume: '50ml', image: '/images/San-Pham/SP14.jpg', gender: 'Unisex',family: 'Woody / Oriental',    longevity: 5, sillage: 5, notes: { top: 'Thuốc lá, Rum, Gừng',          heart: 'Vani, Gỗ tuyết tùng, Cacao',  base: 'Gỗ đàn hương, Hổ phách, Xạ hương' }, desc: 'Tobacco Vanille của Tom Ford là sự kết hợp táo bạo giữa thuốc lá thơm và vani ngọt ngào. Ấm áp, sang trọng và đầy cá tính — một hương thơm không dành cho số đông.' },
  15: { name: 'Aventus',                brand: 'Creed',              price: 9600000, volume: '75ml', image: '/images/San-Pham/SP15.jpg', gender: 'Nam',   family: 'Citrus / Chypre',     longevity: 5, sillage: 5, notes: { top: 'Dứa, Bergamot, Táo xanh',     heart: 'Hoa hồng Bulgary, Bạch dương', base: 'Xạ hương, Hổ phách, Gỗ đàn hương' }, desc: 'Aventus của Creed là biểu tượng của sự thành công và quyền lực. Lấy cảm hứng từ Napoleon Bonaparte, hương thơm này kết hợp dứa tươi mát với gỗ đàn hương sang trọng.' },
  16: { name: 'Oud Wood',               brand: 'Tom Ford',           price: 7500000, volume: '50ml', image: '/images/San-Pham/SP16.jpg', gender: 'Unisex',family: 'Woody / Oriental',    longevity: 5, sillage: 4, notes: { top: 'Trầm hương Oud, Hoa hồng',     heart: 'Gỗ tuyết tùng, Cardamom',     base: 'Gỗ đàn hương, Hổ phách, Xạ hương' }, desc: 'Oud Wood của Tom Ford là hành trình vào trái tim của rừng trầm hương phương Đông. Sang trọng, bí ẩn và đầy quyền lực — một hương thơm dành cho những người dám khác biệt.' },
  17: { name: 'La Vie Est Belle',       brand: 'Lancôme',            price: 3800000, volume: '50ml', image: '/images/San-Pham/SP17.jpg', gender: 'Nữ',    family: 'Floral / Gourmand',   longevity: 4, sillage: 4, notes: { top: 'Hoa lê, Hoa cam, Quả lý chua đen', heart: 'Hoa nhài, Hoa diên vĩ',  base: 'Praline, Gỗ đàn hương, Vani' },      desc: 'La Vie Est Belle của Lancôme là tuyên ngôn về hạnh phúc và vẻ đẹp cuộc sống. Praline ngọt ngào kết hợp với hoa nhài và hoa diên vĩ tạo nên một hương thơm đầy niềm vui.' },
};

function RatingDots({ value, max = 5 }) {
  return (
    <div style={{ display: 'flex', gap: '6px' }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{
          width: 10, height: 10, borderRadius: '50%',
          background: i < value ? 'var(--emerald-green)' : '#e0e0e0',
          display: 'inline-block'
        }} />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  const product = PRODUCTS[Number(id)];

  if (!product) {
    return (
      <>
        <LuxuryHeader />
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <h2 style={{ color: 'var(--emerald-green)' }}>Không tìm thấy sản phẩm</h2>
          <button onClick={() => router.push('/shop')} style={{ padding: '12px 28px', background: 'var(--emerald-green)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Quay lại cửa hàng
          </button>
        </div>
        <LuxuryFooter />
      </>
    );
  }

  const inWishlist = isInWishlist(Number(id));

  const handleAddToCart = () => {
    addToCart({ id: Number(id), name: product.name, price: product.price, brand: product.brand, volume: product.volume, image: product.image });
  };

  const handleWishlist = () => {
    addToWishlist({ id: Number(id), name: product.name, price: product.price, brand: product.brand, volume: product.volume, image: product.image });
  };

  return (
    <>
      <LuxuryHeader />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: 13, color: '#999', marginBottom: 32 }}>
          <a href="/" style={{ color: '#999' }}>Trang chủ</a>
          <span className="mx-2">/</span>
          <a href="/shop" style={{ color: '#999' }}>Cửa hàng</a>
          <span className="mx-2">/</span>
          <span style={{ color: 'var(--emerald-green)', fontWeight: 600 }}>{product.name}</span>
        </nav>

        <div className="row g-5">
          {/* Image */}
          <div className="col-md-5">
            <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.12)' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Info */}
          <div className="col-md-7">
            <small style={{ color: 'var(--soft-gold)', fontSize: 11, letterSpacing: '2px', fontWeight: 700, textTransform: 'uppercase' }}>
              {product.brand}
            </small>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px,4vw,42px)', color: 'var(--emerald-green)', margin: '10px 0 6px' }}>
              {product.name}
            </h1>
            <p style={{ color: '#888', marginBottom: 20 }}>{product.volume} • EDP • {product.gender}</p>

            <p style={{ fontSize: 32, fontWeight: 700, color: 'var(--emerald-green)', marginBottom: 24 }}>
              {product.price.toLocaleString()}đ
            </p>

            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: 28 }}>{product.desc}</p>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap' }}>
              <button onClick={handleAddToCart} style={{
                flex: 1, minWidth: 180, padding: '14px 24px', background: 'var(--emerald-green)',
                color: 'white', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer'
              }}>
                🛒 Thêm vào giỏ hàng
              </button>
              <button onClick={handleWishlist} style={{
                padding: '14px 20px', background: inWishlist ? 'var(--rose-gold)' : 'white',
                color: inWishlist ? 'white' : '#666', border: '1px solid #e0e0e0',
                borderRadius: 10, fontSize: 20, cursor: 'pointer'
              }}>
                {inWishlist ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Details */}
            <div style={{ background: '#f9f9f9', borderRadius: 14, padding: 24 }}>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <p style={{ fontSize: 12, color: '#999', marginBottom: 6 }}>NHÓM HƯƠNG</p>
                  <p style={{ fontWeight: 600, color: '#333' }}>{product.family}</p>
                </div>
                <div className="col-6">
                  <p style={{ fontSize: 12, color: '#999', marginBottom: 6 }}>GIỚI TÍNH</p>
                  <p style={{ fontWeight: 600, color: '#333' }}>{product.gender}</p>
                </div>
                <div className="col-6">
                  <p style={{ fontSize: 12, color: '#999', marginBottom: 6 }}>ĐỘ LƯU HƯƠNG</p>
                  <RatingDots value={product.longevity} />
                </div>
                <div className="col-6">
                  <p style={{ fontSize: 12, color: '#999', marginBottom: 6 }}>ĐỘ TOẢ HƯƠNG</p>
                  <RatingDots value={product.sillage} />
                </div>
              </div>

              {/* Scent Pyramid */}
              <div style={{ borderTop: '1px solid #eee', paddingTop: 16 }}>
                <p style={{ fontSize: 12, color: '#999', marginBottom: 12, fontWeight: 700, letterSpacing: 1 }}>THÁP HƯƠNG</p>
                {[
                  { label: 'Hương đầu', value: product.notes.top, icon: '🌿' },
                  { label: 'Hương giữa', value: product.notes.heart, icon: '🌸' },
                  { label: 'Hương cuối', value: product.notes.base, icon: '🪵' },
                ].map(({ label, value, icon }) => (
                  <div key={label} style={{ display: 'flex', gap: 12, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 16 }}>{icon}</span>
                    <div>
                      <span style={{ fontSize: 11, color: '#aaa', fontWeight: 600 }}>{label}: </span>
                      <span style={{ fontSize: 14, color: '#444' }}>{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <LuxuryFooter />
    </>
  );
}
