"use client"
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import LuxuryHeader from "@/component/LuxuryHeader";
import LuxuryFooter from "@/component/LuxuryFooter";
import ProductItem from "@/component/ProductItem";

export default function ShopPage() {
  const { addToCart } = useCart();
  const [isWholesale, setIsWholesale] = useState(false);
  const [selectedGender, setSelectedGender] = useState("NỮ");
  const [sortBy, setSortBy] = useState("newest");

  const products = [
    {
      id: 1,
      name: "Baccarat Rouge 540",
      brand: "Maison Francis",
      price: 8500000,
      wholesalePrice: 7250000,
      discount: 15,
      volume: "70ml",
      image: "/images/San-Pham/SP9.jpg",
      badge: "Bán Chạy",
      gender: "Unisex"
    },
    {
      id: 2,
      name: "Rose of No Man's Land",
      brand: "Byredo",
      price: 5400000,
      wholesalePrice: 4600000,
      volume: "50ml",
      image: "/images/San-Pham/SP13.jpg",
      gender: "Nữ"
    },
    {
      id: 3,
      name: "Santal 33",
      brand: "Le Labo",
      price: 6800000,
      wholesalePrice: 5800000,
      volume: "50ml",
      image: "/images/San-Pham/SP10.jpg",
      badge: "Mới",
      gender: "Unisex"
    },
    {
      id: 4,
      name: "Sauvage Elixir",
      brand: "Dior",
      price: 4800000,
      wholesalePrice: 4200000,
      discount: 12,
      volume: "60ml",
      image: "/images/San-Pham/SP11.jpg",
      gender: "Nam"
    },
    {
      id: 5,
      name: "Tobacco Vanille",
      brand: "Tom Ford",
      price: 8150000,
      wholesalePrice: 6900000,
      volume: "50ml",
      image: "/images/San-Pham/SP14.jpg",
      gender: "Unisex"
    },
    {
      id: 6,
      name: "Aventus",
      brand: "Creed",
      price: 9600000,
      wholesalePrice: 8200000,
      volume: "75ml",
      image: "/images/San-Pham/SP15.jpg",
      gender: "Nam"
    },
    {
      id: 7,
      name: "Black Opium",
      brand: "YSL",
      price: 3200000,
      wholesalePrice: 2700000,
      discount: 20,
      volume: "50ml",
      image: "/images/San-Pham/SP12.jpg",
      gender: "Nữ"
    },
    {
      id: 8,
      name: "Oud Wood",
      brand: "Tom Ford",
      price: 7500000,
      wholesalePrice: 6400000,
      volume: "50ml",
      image: "/images/San-Pham/SP16.jpg",
      gender: "Unisex"
    },
    {
      id: 9,
      name: "La Vie Est Belle",
      brand: "Lancôme",
      price: 3800000,
      wholesalePrice: 3200000,
      volume: "50ml",
      image: "/images/San-Pham/SP17.jpg",
      gender: "Nữ"
    },
  ];

  return (
    <>
      <LuxuryHeader />
      
      <main style={{maxWidth: '1400px', margin: '0 auto', padding: '40px 20px'}}>
        {/* Hero & Breadcrumb */}
        <div className="row align-items-end mb-5">
          <div className="col-md-8">
            <nav style={{fontSize: '12px', color: '#999', marginBottom: '15px'}}>
              <a href="/" style={{color: '#999'}}>Trang chủ</a>
              <span className="mx-2">/</span>
              <span style={{color: 'var(--emerald-green)', fontWeight: '600'}}>Cửa hàng</span>
            </nav>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(36px, 5vw, 56px)',
              color: 'var(--emerald-green)',
              marginBottom: '15px',
              fontWeight: '700'
            }}>
              Khám Phá Hương Thơm Đẳng Cấp
            </h1>
            <div className="gold-divider" style={{margin: '15px 0', width: '100px'}}></div>
            <p style={{color: '#666', fontSize: '16px', fontStyle: 'italic', maxWidth: '600px'}}>
              Tinh hoa từ những nhà làm hương danh tiếng nhất thế giới, 
              được tuyển chọn dành riêng cho phong cách thượng lưu của bạn.
            </p>
          </div>
          
          {/* Price Toggle */}
          <div className="col-md-4 text-end mt-4 mt-md-0">
            <div style={{
              background: 'white',
              padding: '25px',
              borderRadius: '15px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
              display: 'inline-block'
            }}>
              <div className="d-flex align-items-center gap-3">
                <div className="text-end">
                  <p style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: 'var(--emerald-green)',
                    letterSpacing: '1px',
                    marginBottom: '3px'
                  }}>
                    CHẾ ĐỘ GIÁ
                  </p>
                  <p style={{fontSize: '13px', color: '#888', margin: 0}}>
                    Giá Lẻ ↔ Giá Sỉ
                  </p>
                </div>
                <label style={{position: 'relative', display: 'inline-block', width: '56px', height: '32px', cursor: 'pointer'}}>
                  <input 
                    type="checkbox" 
                    checked={isWholesale}
                    onChange={(e) => setIsWholesale(e.target.checked)}
                    style={{opacity: 0, width: 0, height: 0}}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: isWholesale ? 'var(--emerald-green)' : '#ddd',
                    transition: '0.4s',
                    borderRadius: '34px'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '24px',
                      width: '24px',
                      left: isWholesale ? '28px' : '4px',
                      bottom: '4px',
                      background: 'white',
                      transition: '0.4s',
                      borderRadius: '50%'
                    }}></span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-lg-3 mb-4">
            <div style={{position: 'sticky', top: '100px'}}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '700',
                color: 'var(--emerald-green)',
                letterSpacing: '2px',
                marginBottom: '25px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{fontSize: '20px'}}>⚙️</span>
                BỘ LỌC NÂNG CAO
              </h3>

              {/* Price Filter */}
              <div style={{marginBottom: '30px'}}>
                <p style={{fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#2c2c2c'}}>
                  Khoảng giá (VNĐ)
                </p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  {['Dưới 1.000.000', '1.000.000 - 3.000.000', '3.000.000 - 5.000.000', 'Trên 5.000.000'].map((range) => (
                    <label key={range} style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                      <input type="checkbox" style={{
                        width: '18px',
                        height: '18px',
                        accentColor: 'var(--emerald-green)'
                      }} />
                      <span style={{fontSize: '14px', color: '#666'}}>{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div style={{marginBottom: '30px'}}>
                <p style={{fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#2c2c2c'}}>
                  Giới tính
                </p>
                <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                  {['NAM', 'NỮ', 'UNISEX'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setSelectedGender(gender)}
                      style={{
                        padding: '10px 20px',
                        borderRadius: '8px',
                        border: selectedGender === gender ? '2px solid var(--emerald-green)' : '2px solid #e5e5e5',
                        background: selectedGender === gender ? 'var(--emerald-green)' : 'white',
                        color: selectedGender === gender ? 'white' : '#666',
                        fontSize: '12px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scent Family */}
              <div style={{marginBottom: '30px'}}>
                <p style={{fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#2c2c2c'}}>
                  Nhóm hương
                </p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {[
                    {icon: '🌸', name: 'Hương hoa cỏ', count: 24},
                    {icon: '🌲', name: 'Hương gỗ', count: 18},
                    {icon: '🍊', name: 'Hương cam chanh', count: 15},
                    {icon: '✨', name: 'Hương gia vị', count: 12}
                  ].map((family) => (
                    <label key={family.name} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid #f0f0f0',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--soft-gold)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f0f0f0'}
                    >
                      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                        <span style={{fontSize: '20px'}}>{family.icon}</span>
                        <span style={{fontSize: '14px', color: '#666'}}>{family.name}</span>
                      </div>
                      <span style={{fontSize: '11px', color: '#ccc', fontWeight: '700'}}>{family.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Longevity */}
              <div style={{marginBottom: '30px'}}>
                <p style={{fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#2c2c2c'}}>
                  Độ lưu hương
                </p>
                <select className="form-select" style={{
                  border: '1px solid #e5e5e5',
                  borderRadius: '10px',
                  padding: '12px',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <option>Tất cả</option>
                  <option>Lâu (7-12 giờ)</option>
                  <option>Rất lâu (Trên 12 giờ)</option>
                  <option>Trung bình (3-6 giờ)</option>
                </select>
              </div>

              {/* Brand Filter */}
              <div style={{marginBottom: '30px'}}>
                <p style={{fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#2c2c2c'}}>
                  Thương hiệu
                </p>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  {['Dior', 'Chanel', 'Tom Ford', 'Creed', 'Le Labo'].map((brand) => (
                    <label key={brand} style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                      <input type="checkbox" style={{
                        width: '18px',
                        height: '18px',
                        accentColor: 'var(--emerald-green)'
                      }} />
                      <span style={{fontSize: '14px', color: '#666'}}>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9">
            {/* Sort Bar */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3" style={{borderBottom: '1px solid #f0f0f0'}}>
              <p style={{fontSize: '14px', color: '#888', margin: 0}}>
                Hiển thị <span style={{color: 'var(--emerald-green)', fontWeight: '700'}}>{products.length}</span> sản phẩm
              </p>
              <div className="d-flex align-items-center gap-3">
                <span style={{fontSize: '14px', color: '#888'}}>Sắp xếp:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: 'var(--emerald-green)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-low">Giá: Thấp đến Cao</option>
                  <option value="price-high">Giá: Cao đến Thấp</option>
                  <option value="popular">Phổ biến nhất</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="row g-4">
              {products.map((product) => (
                <div key={product.id} className="col-sm-6 col-lg-4">
                  <ProductItem
                    id={product.id}
                    name={product.name}
                    price={isWholesale ? product.wholesalePrice : product.price}
                    brand={product.brand}
                    discount={!isWholesale ? product.discount : null}
                    volume={product.volume}
                    image={product.image}
                    badge={product.badge}
                    onAdd={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: isWholesale ? product.wholesalePrice : product.price,
                      brand: product.brand,
                      volume: product.volume,
                      image: product.image
                    })}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
              <button style={{
                width: '45px',
                height: '45px',
                borderRadius: '10px',
                border: '1px solid #e5e5e5',
                background: 'white',
                color: 'var(--emerald-green)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} disabled>
                ‹
              </button>
              <button style={{
                width: '45px',
                height: '45px',
                borderRadius: '10px',
                border: 'none',
                background: 'var(--emerald-green)',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                1
              </button>
              <button style={{
                width: '45px',
                height: '45px',
                borderRadius: '10px',
                border: '1px solid #e5e5e5',
                background: 'white',
                color: '#666',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                2
              </button>
              <button style={{
                width: '45px',
                height: '45px',
                borderRadius: '10px',
                border: '1px solid #e5e5e5',
                background: 'white',
                color: '#666',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                3
              </button>
              <span style={{color: '#ccc'}}>...</span>
              <button style={{
                width: '45px',
                height: '45px',
                borderRadius: '10px',
                border: '1px solid #e5e5e5',
                background: 'white',
                color: '#666',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                12
              </button>
              <button style={{
                width: '45px',
                height: '45px',
                borderRadius: '10px',
                border: '1px solid #e5e5e5',
                background: 'white',
                color: 'var(--emerald-green)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                ›
              </button>
            </div>
          </div>
        </div>
      </main>

      <LuxuryFooter />
    </>
  );
}
