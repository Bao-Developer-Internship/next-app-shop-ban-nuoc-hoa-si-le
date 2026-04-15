"use client"
import { useState, useMemo, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import LuxuryHeader from "@/component/LuxuryHeader";
import LuxuryFooter from "@/component/LuxuryFooter";
import ProductItem from "@/component/ProductItem";
import { getProducts } from "@/store/productStore";

const PRODUCTS_PER_PAGE = 6;

// Map StoreProduct → shape dùng trong shop
function toShopProduct(p) {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand,
    price: p.price,
    wholesalePrice: p.wholesalePrice,
    discount: p.discount,
    volume: p.volume,
    image: p.image,
    badge: p.badge,
    gender: p.gender,
    scent: "Hương gỗ",
    longevity: "Lâu (7-12 giờ)",
  };
}

const PRICE_RANGES = [
  { label: "Dưới 3.000.000", min: 0, max: 3000000 },
  { label: "3.000.000 - 5.000.000", min: 3000000, max: 5000000 },
  { label: "5.000.000 - 8.000.000", min: 5000000, max: 8000000 },
  { label: "Trên 8.000.000", min: 8000000, max: Infinity },
];

const SCENT_FAMILIES = [
  { icon: "🌸", name: "Hương hoa cỏ" },
  { icon: "🌲", name: "Hương gỗ" },
  { icon: "🍊", name: "Hương cam chanh" },
  { icon: "✨", name: "Hương gia vị" },
];

const LONGEVITY_OPTIONS = ["Tất cả", "Trung bình (3-6 giờ)", "Lâu (7-12 giờ)", "Rất lâu (Trên 12 giờ)"];

export default function ShopPage() {
  const { addToCart } = useCart();
  const [isWholesale, setIsWholesale] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

  // Load từ store + lắng nghe cập nhật
  useEffect(() => {
    const load = () => setAllProducts(getProducts().filter(p => p.status === 'active').map(toShopProduct));
    load();
    window.addEventListener('products-updated', load);
    return () => window.removeEventListener('products-updated', load);
  }, []);

  // Filter states
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedScents, setSelectedScents] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedLongevity, setSelectedLongevity] = useState("Tất cả");

  // Brands dynamic từ store
  const brands = useMemo(() => [...new Set(allProducts.map(p => p.brand))].sort(), [allProducts]);

  const toggleSet = (setter, value) => {
    setter(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedGender(null);
    setSelectedPrices([]);
    setSelectedScents([]);
    setSelectedBrands([]);
    setSelectedLongevity("Tất cả");
    setCurrentPage(1);
  };

  const hasActiveFilters = selectedGender || selectedPrices.length > 0 || selectedScents.length > 0 || selectedBrands.length > 0 || selectedLongevity !== "Tất cả";

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedGender) {
      result = result.filter(p => p.gender.toLowerCase() === selectedGender.toLowerCase());
    }

    if (selectedPrices.length > 0) {
      result = result.filter(p => {
        const price = isWholesale ? p.wholesalePrice : p.price;
        return selectedPrices.some(label => {
          const range = PRICE_RANGES.find(r => r.label === label);
          return range && price >= range.min && price < range.max;
        });
      });
    }

    if (selectedScents.length > 0) {
      result = result.filter(p => selectedScents.includes(p.scent));
    }

    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }

    if (selectedLongevity !== "Tất cả") {
      result = result.filter(p => p.longevity === selectedLongevity);
    }

    switch (sortBy) {
      case "price-low": result.sort((a, b) => (isWholesale ? a.wholesalePrice - b.wholesalePrice : a.price - b.price)); break;
      case "price-high": result.sort((a, b) => (isWholesale ? b.wholesalePrice - a.wholesalePrice : b.price - a.price)); break;
      case "popular": result.sort((a, b) => (b.badge ? 1 : 0) - (a.badge ? 1 : 0)); break;
      default: break;
    }

    return result;
  }, [selectedGender, selectedPrices, selectedScents, selectedBrands, selectedLongevity, sortBy, isWholesale, allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, "...", totalPages];
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const btnStyle = (active) => ({
    width: "45px", height: "45px", borderRadius: "10px",
    border: active ? "none" : "1px solid #e5e5e5",
    background: active ? "var(--emerald-green)" : "white",
    color: active ? "white" : "#666",
    fontWeight: "700", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s"
  });

  return (
    <>
      <LuxuryHeader />
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 20px" }}>
        {/* Hero & Breadcrumb */}
        <div className="row align-items-end mb-5">
          <div className="col-md-8">
            <nav style={{ fontSize: "12px", color: "#999", marginBottom: "15px" }}>
              <a href="/" style={{ color: "#999" }}>Trang chủ</a>
              <span className="mx-2">/</span>
              <span style={{ color: "var(--emerald-green)", fontWeight: "600" }}>Cửa hàng</span>
            </nav>
            <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(36px, 5vw, 56px)", color: "var(--emerald-green)", marginBottom: "15px", fontWeight: "700" }}>
              Khám Phá Hương Thơm Đẳng Cấp
            </h1>
            <div className="gold-divider" style={{ margin: "15px 0", width: "100px" }}></div>
            <p style={{ color: "#666", fontSize: "16px", fontStyle: "italic", maxWidth: "600px" }}>
              Tinh hoa từ những nhà làm hương danh tiếng nhất thế giới, được tuyển chọn dành riêng cho phong cách thượng lưu của bạn.
            </p>
          </div>
          <div className="col-md-4 text-end mt-4 mt-md-0">
            <div style={{ background: "white", padding: "25px", borderRadius: "15px", boxShadow: "0 5px 20px rgba(0,0,0,0.08)", display: "inline-block" }}>
              <div className="d-flex align-items-center gap-3">
                <div className="text-end">
                  <p style={{ fontSize: "11px", fontWeight: "700", color: "var(--emerald-green)", letterSpacing: "1px", marginBottom: "3px" }}>CHẾ ĐỘ GIÁ</p>
                  <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>Giá Lẻ ↔ Giá Sỉ</p>
                </div>
                <label style={{ position: "relative", display: "inline-block", width: "56px", height: "32px", cursor: "pointer" }}>
                  <input type="checkbox" checked={isWholesale} onChange={(e) => { setIsWholesale(e.target.checked); setCurrentPage(1); }} style={{ opacity: 0, width: 0, height: 0 }} />
                  <span style={{ position: "absolute", cursor: "pointer", top: 0, left: 0, right: 0, bottom: 0, background: isWholesale ? "var(--emerald-green)" : "#ddd", transition: "0.4s", borderRadius: "34px" }}>
                    <span style={{ position: "absolute", height: "24px", width: "24px", left: isWholesale ? "28px" : "4px", bottom: "4px", background: "white", transition: "0.4s", borderRadius: "50%" }}></span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-lg-3 mb-4">
            <div style={{ position: "sticky", top: "100px" }}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 style={{ fontSize: "14px", fontWeight: "700", color: "var(--emerald-green)", letterSpacing: "2px", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "20px" }}>⚙️</span> BỘ LỌC
                </h3>
                {hasActiveFilters && (
                  <button onClick={clearFilters} style={{ fontSize: "12px", color: "#e53e3e", background: "none", border: "none", cursor: "pointer", fontWeight: "600", padding: 0 }}>
                    Xóa tất cả
                  </button>
                )}
              </div>

              {/* Price Filter */}
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "#2c2c2c" }}>Khoảng giá (VNĐ)</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {PRICE_RANGES.map((range) => (
                    <label key={range.label} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={selectedPrices.includes(range.label)}
                        onChange={() => toggleSet(setSelectedPrices, range.label)}
                        style={{ width: "18px", height: "18px", accentColor: "var(--emerald-green)", cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "14px", color: "#666" }}>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "#2c2c2c" }}>Giới tính</p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["Nam", "Nữ", "Unisex"].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => { setSelectedGender(selectedGender === gender ? null : gender); setCurrentPage(1); }}
                      style={{
                        padding: "8px 16px", borderRadius: "8px",
                        border: selectedGender === gender ? "2px solid var(--emerald-green)" : "2px solid #e5e5e5",
                        background: selectedGender === gender ? "var(--emerald-green)" : "white",
                        color: selectedGender === gender ? "white" : "#666",
                        fontSize: "12px", fontWeight: "700", cursor: "pointer", transition: "all 0.2s"
                      }}
                    >
                      {gender.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scent Family */}
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "#2c2c2c" }}>Nhóm hương</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {SCENT_FAMILIES.map((family) => {
                    const active = selectedScents.includes(family.name);
                    return (
                      <label key={family.name} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 12px", borderRadius: "10px", cursor: "pointer",
                        border: active ? "1px solid var(--emerald-green)" : "1px solid #f0f0f0",
                        background: active ? "rgba(10,61,42,0.05)" : "white",
                        transition: "all 0.2s"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={() => toggleSet(setSelectedScents, family.name)}
                            style={{ width: "16px", height: "16px", accentColor: "var(--emerald-green)", cursor: "pointer" }}
                          />
                          <span style={{ fontSize: "18px" }}>{family.icon}</span>
                          <span style={{ fontSize: "13px", color: "#555" }}>{family.name}</span>
                        </div>
                        <span style={{ fontSize: "11px", color: "#aaa", fontWeight: "700" }}>
                          {allProducts.filter(p => p.scent === family.name).length}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Longevity */}
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "#2c2c2c" }}>Độ lưu hương</p>
                <select
                  value={selectedLongevity}
                  onChange={(e) => { setSelectedLongevity(e.target.value); setCurrentPage(1); }}
                  className="form-select"
                  style={{ border: "1px solid #e5e5e5", borderRadius: "10px", padding: "10px 12px", fontSize: "14px", color: "#555" }}
                >
                  {LONGEVITY_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                </select>
              </div>

              {/* Brand Filter */}
              <div style={{ marginBottom: "28px" }}>
                <p style={{ fontSize: "14px", fontWeight: "600", marginBottom: "12px", color: "#2c2c2c" }}>Thương hiệu</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {brands.map((brand) => (
                    <label key={brand} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleSet(setSelectedBrands, brand)}
                        style={{ width: "16px", height: "16px", accentColor: "var(--emerald-green)", cursor: "pointer" }}
                      />
                      <span style={{ fontSize: "14px", color: "#666" }}>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-lg-9">
            {/* Sort Bar */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3" style={{ borderBottom: "1px solid #f0f0f0" }}>
              <p style={{ fontSize: "14px", color: "#888", margin: 0 }}>
                Hiển thị <span style={{ color: "var(--emerald-green)", fontWeight: "700" }}>{filteredProducts.length}</span> sản phẩm
                {hasActiveFilters && <span style={{ color: "#aaa" }}> (đã lọc)</span>}
              </p>
              <div className="d-flex align-items-center gap-3">
                <span style={{ fontSize: "14px", color: "#888" }}>Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                  style={{ border: "none", background: "transparent", fontSize: "14px", fontWeight: "700", color: "var(--emerald-green)", cursor: "pointer" }}
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-low">Giá: Thấp đến Cao</option>
                  <option value="price-high">Giá: Cao đến Thấp</option>
                  <option value="popular">Phổ biến nhất</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="row g-4">
                {paginatedProducts.map((product) => (
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
                        id: product.id, name: product.name,
                        price: isWholesale ? product.wholesalePrice : product.price,
                        brand: product.brand, volume: product.volume, image: product.image
                      })}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "80px 20px", color: "#aaa" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
                <p style={{ fontSize: "16px", marginBottom: "12px" }}>Không tìm thấy sản phẩm phù hợp</p>
                <button onClick={clearFilters} style={{ padding: "10px 24px", background: "var(--emerald-green)", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}>
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
                <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                  style={{ ...btnStyle(false), color: currentPage === 1 ? "#ccc" : "var(--emerald-green)", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}>
                  ‹
                </button>
                {getPageNumbers().map((page, i) =>
                  page === "..." ? (
                    <span key={`ellipsis-${i}`} style={{ color: "#ccc", padding: "0 4px" }}>...</span>
                  ) : (
                    <button key={page} onClick={() => goToPage(page)} style={btnStyle(currentPage === page)}>
                      {page}
                    </button>
                  )
                )}
                <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
                  style={{ ...btnStyle(false), color: currentPage === totalPages ? "#ccc" : "var(--emerald-green)", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}>
                  ›
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <p style={{ textAlign: "center", fontSize: "13px", color: "#aaa", marginTop: "12px" }}>
                Trang {currentPage} / {totalPages}
              </p>
            )}
          </div>
        </div>
      </main>
      <LuxuryFooter />
    </>
  );
}
