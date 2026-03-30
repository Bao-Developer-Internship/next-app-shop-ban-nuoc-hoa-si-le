"use client"
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/store/authStore";
import LuxuryHeader from "@/component/LuxuryHeader";
import LuxuryFooter from "@/component/LuxuryFooter";
import { ADDRESS_DATA, PROVINCES } from "@/data/vietnam-address";

const STEPS = [
  { number: 1, label: 'Giỏ hàng' },
  { number: 2, label: 'Thanh toán' },
  { number: 3, label: 'Xác nhận' },
];

const SHIPPING_OPTIONS = [
  { id: 'economy', label: 'Giao hàng tiết kiệm', desc: '1 – 3 tuần', note: 'Phí ship rẻ nhất', price: 20000, icon: '📦' },
  { id: 'standard', label: 'Giao hàng bình thường', desc: '1 – 2 tuần', note: '', price: 35000, icon: '🚚' },
  { id: 'express', label: 'Giao hàng hỏa tốc', desc: '1 – 2 tiếng', note: 'Nhanh nhất', price: 95000, icon: '⚡' },
];

const PAYMENT_OPTIONS = [
  { id: 'momo', label: 'Ví MoMo', bg: '#A50064', short: 'MoMo' },
  { id: 'domestic_bank', label: 'Ngân hàng nội địa', emoji: '🏦' },
  { id: 'international_bank', label: 'Ngân hàng quốc tế', emoji: '💳' },
];

// ── Progress Bar ──────────────────────────────────────────────
function ProgressBar({ currentStep }) {
  return (
    <div style={{ marginBottom: '50px' }}>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ position: 'absolute', top: '16px', left: 0, width: '100%', height: '2px', background: 'rgba(10,61,42,0.1)' }} />
        <div style={{ position: 'absolute', top: '16px', left: 0, width: `${((currentStep - 1) / 2) * 100}%`, height: '2px', background: 'var(--emerald-green)', transition: 'width 0.5s ease' }} />
        {STEPS.map(step => (
          <div key={step.number} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 1 }}>
            <div style={{
              width: '35px', height: '35px', borderRadius: '50%',
              background: currentStep >= step.number ? 'var(--emerald-green)' : 'rgba(10,61,42,0.1)',
              color: currentStep >= step.number ? 'white' : '#999',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '700', fontSize: '14px',
              border: '4px solid var(--cream-white)', transition: 'all 0.3s ease'
            }}>
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <span style={{ fontSize: '12px', fontWeight: currentStep >= step.number ? '700' : '500', color: currentStep >= step.number ? 'var(--emerald-green)' : '#999' }}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Order Summary Sidebar ─────────────────────────────────────
function OrderSummary({ cartItems, subtotal, shippingFee, discount, total, voucher, setVoucher, onApplyVoucher, showVoucher, actionBtn }) {
  return (
    <div style={{ position: 'sticky', top: '100px' }}>
      <section style={{ background: 'white', borderRadius: '20px', padding: '30px', border: '1px solid rgba(10,61,42,0.1)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--emerald-green)', marginBottom: '20px' }}>Tổng đơn hàng</h2>
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', background: 'rgba(10,61,42,0.05)' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '13px', fontWeight: '600', margin: 0 }}>{item.name}</p>
                <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>x{item.quantity}</p>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--emerald-green)' }}>{(item.price * item.quantity).toLocaleString()}₫</span>
            </div>
          ))}
        </div>
        <div style={{ height: '1px', background: 'rgba(10,61,42,0.1)', marginBottom: '15px' }} />

        {/* Voucher */}
        {showVoucher && (
          <div style={{ marginBottom: '15px' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>Mã voucher</p>
            <div className="d-flex gap-2">
              <input type="text" value={voucher} onChange={e => setVoucher(e.target.value)}
                placeholder="Nhập mã (không bắt buộc)"
                style={{ flex: 1, padding: '10px 12px', border: '1px solid rgba(10,61,42,0.2)', borderRadius: '10px', fontSize: '13px' }} />
              <button onClick={onApplyVoucher}
                style={{ padding: '10px 14px', background: 'rgba(10,61,42,0.1)', border: 'none', borderRadius: '10px', color: 'var(--emerald-green)', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}>
                Áp dụng
              </button>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
          <div className="d-flex justify-content-between"><span style={{ color: '#888' }}>Tạm tính</span><span style={{ fontWeight: '600' }}>{subtotal.toLocaleString()}₫</span></div>
          <div className="d-flex justify-content-between"><span style={{ color: '#888' }}>Vận chuyển</span><span style={{ fontWeight: '600' }}>{shippingFee.toLocaleString()}₫</span></div>
          {discount > 0 && <div className="d-flex justify-content-between"><span style={{ color: '#888' }}>Giảm giá</span><span style={{ fontWeight: '600', color: '#22c55e' }}>-{discount.toLocaleString()}₫</span></div>}
        </div>
        <div style={{ height: '1px', background: 'rgba(10,61,42,0.1)', margin: '15px 0' }} />
        <div className="d-flex justify-content-between align-items-baseline" style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--emerald-green)', textTransform: 'uppercase' }}>Tổng cộng</span>
          <span style={{ fontSize: '26px', fontWeight: '700', color: 'var(--emerald-green)' }}>{total.toLocaleString()}₫</span>
        </div>
        {actionBtn}
      </section>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'rgba(10,61,42,0.05)', padding: '18px', borderRadius: '15px' }}>
        {[{ icon: '🔒', text: 'Thanh toán bảo mật SSL 256-bit' }, { icon: '🔄', text: 'Đổi trả miễn phí trong 7 ngày' }, { icon: '✓', text: 'Cam kết 100% hàng chính hãng' }].map((b, i) => (
          <div key={i} className="d-flex align-items-center gap-2">
            <span style={{ fontSize: '16px' }}>{b.icon}</span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--emerald-green)' }}>{b.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── STEP 1: Giỏ hàng ─────────────────────────────────────────
function Step1({ cartItems, removeFromCart, updateQuantity, summaryProps, onNext }) {
  return (
    <div className="row g-4">
      <div className="col-lg-8">
        <section style={{ background: 'white', borderRadius: '20px', padding: '30px', border: '1px solid rgba(10,61,42,0.1)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--emerald-green)', marginBottom: '25px' }}>
            Giỏ hàng của bạn ({cartItems.length} sản phẩm)
          </h2>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '80px', marginBottom: '20px' }}>🛒</div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--emerald-green)', marginBottom: '12px' }}>Giỏ hàng trống</h3>
              <p style={{ color: '#888', marginBottom: '30px' }}>Hãy khám phá bộ sưu tập nước hoa cao cấp của chúng tôi</p>
              <a href="/shop" className="luxury-btn" style={{ display: 'inline-block', padding: '15px 40px', textDecoration: 'none' }}>Khám phá ngay</a>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '20px', paddingBottom: '20px', borderBottom: '1px solid rgba(10,61,42,0.1)' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '12px' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{item.name}</h3>
                        <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>{item.volume || '50ml'}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px', color: '#ccc' }}>🗑️</button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid rgba(10,61,42,0.2)', borderRadius: '25px', padding: '5px 10px' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '25px', height: '25px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: '700' }}>-</button>
                        <span style={{ width: '30px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '25px', height: '25px', borderRadius: '50%', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: '700' }}>+</button>
                      </div>
                      <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--emerald-green)', margin: 0 }}>{(item.price * item.quantity).toLocaleString()}₫</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <div className="col-lg-4">
        <OrderSummary {...summaryProps} showVoucher
          actionBtn={
            <button onClick={onNext} className="luxury-btn" disabled={cartItems.length === 0}
              style={{ width: '100%', padding: '16px', fontSize: '14px', letterSpacing: '1px', opacity: cartItems.length === 0 ? 0.5 : 1, cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer' }}>
              TIẾP TỤC THANH TOÁN →
            </button>
          }
        />
      </div>
    </div>
  );
}

// ── STEP 2: Địa chỉ + Vận chuyển + Thanh toán ────────────────
function Step2({ address, setAddress, isAddressValid, selectedShipping, setSelectedShipping, selectedPayment, setSelectedPayment, summaryProps, onPlace, onBack }) {
  const { user, isLoggedIn } = useAuth();
  const wards = ADDRESS_DATA[address.province] || [];

  const handleProvinceChange = (province) => {
    const firstWard = ADDRESS_DATA[province]?.[0] || '';
    setAddress(a => ({ ...a, province, ward: firstWard }));
  };

  const inputStyle = (readOnly) => ({
    width: '100%', padding: '12px', borderRadius: '10px', fontSize: '14px', outline: 'none',
    border: '1px solid rgba(10,61,42,0.2)',
    background: readOnly ? 'rgba(10,61,42,0.04)' : 'white',
    color: readOnly ? '#555' : '#222',
    cursor: readOnly ? 'default' : 'text',
  });
  const labelStyle = { fontSize: '12px', fontWeight: '600', color: '#888', marginBottom: '6px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' };
  const selectStyle = { width: '100%', padding: '12px', border: '1px solid rgba(10,61,42,0.2)', borderRadius: '10px', fontSize: '14px', background: 'white', color: '#222', outline: 'none' };
  const sectionStyle = { background: 'white', borderRadius: '20px', padding: '30px', border: '1px solid rgba(10,61,42,0.1)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '20px' };

  const isFormValid = isAddressValid && selectedPayment;

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        {/* Địa chỉ */}
        <section style={sectionStyle}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--emerald-green)', marginBottom: '20px' }}>Thông tin giao hàng</h2>

          <p style={{ fontSize: '12px', fontWeight: '700', color: '#aaa', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>Thông tin người nhận</p>
          {isLoggedIn ? (
            <div style={{ background: 'rgba(10,61,42,0.04)', borderRadius: '12px', padding: '16px 20px', border: '1px solid rgba(10,61,42,0.1)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '20px' }}>👤</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '15px', color: '#1a1a1a' }}>{user.name}</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>{user.email} · {user.phone}</p>
              </div>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--emerald-green)', background: 'rgba(10,61,42,0.1)', padding: '3px 10px', borderRadius: '999px' }}>Đã đăng nhập</span>
            </div>
          ) : (
            <div className="row g-3" style={{ marginBottom: '20px' }}>
              <div className="col-12">
                <div style={{ padding: '10px 14px', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: '10px', fontSize: '13px', color: '#7a6020' }}>
                  💡 <a href="/login" style={{ color: 'var(--emerald-green)', fontWeight: '600' }}>Đăng nhập</a> để tự động điền thông tin và theo dõi đơn hàng dễ dàng hơn.
                </div>
              </div>
              {[
                { label: 'Họ và tên', key: 'fullName', placeholder: 'Nguyễn Văn A', col: 'col-md-6', type: 'text' },
                { label: 'Số điện thoại', key: 'phone', placeholder: '0901234567', col: 'col-md-6', type: 'tel' },
                { label: 'Email', key: 'email', placeholder: 'email@example.com', col: 'col-12', type: 'email' },
              ].map(f => (
                <div key={f.key} className={f.col}>
                  <label style={labelStyle}>{f.label}</label>
                  <input type={f.type} value={address[f.key]} onChange={e => setAddress(a => ({ ...a, [f.key]: e.target.value }))}
                    placeholder={f.placeholder} style={inputStyle(false)} />
                </div>
              ))}
            </div>
          )}

          <p style={{ fontSize: '12px', fontWeight: '700', color: '#aaa', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>Địa chỉ giao hàng</p>
          <div className="row g-3">
            <div className="col-md-6">
              <label style={labelStyle}>Tỉnh / Thành phố</label>
              <select value={address.province} onChange={e => handleProvinceChange(e.target.value)} style={selectStyle}>
                {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label style={labelStyle}>Phường / Xã</label>
              <select value={address.ward} onChange={e => setAddress(a => ({ ...a, ward: e.target.value }))} style={selectStyle}>
                {wards.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div className="col-12">
              <label style={labelStyle}>Địa chỉ cụ thể (số nhà, tên đường)</label>
              <input type="text" value={address.detail} onChange={e => setAddress(a => ({ ...a, detail: e.target.value }))}
                placeholder="VD: 123 Nguyễn Huệ" style={inputStyle(false)} />
            </div>
          </div>
        </section>

        {/* Vận chuyển */}
        <section style={sectionStyle}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--emerald-green)', marginBottom: '20px' }}>Phương thức vận chuyển</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {SHIPPING_OPTIONS.map(opt => (
              <label key={opt.id} onClick={() => setSelectedShipping(opt.id)} style={{
                display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 20px',
                border: selectedShipping === opt.id ? '2px solid var(--emerald-green)' : '1px solid #e5e5e5',
                borderRadius: '14px', cursor: 'pointer',
                background: selectedShipping === opt.id ? 'rgba(10,61,42,0.04)' : 'white',
                transition: 'all 0.2s ease'
              }}>
                <input type="radio" name="shipping" value={opt.id} checked={selectedShipping === opt.id} onChange={() => setSelectedShipping(opt.id)} style={{ accentColor: 'var(--emerald-green)' }} />
                <span style={{ fontSize: '24px' }}>{opt.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: '700', fontSize: '15px' }}>{opt.label}</p>
                  <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>
                    Ước tính: {opt.desc}
                    {opt.note && <span style={{ marginLeft: '8px', fontSize: '11px', fontWeight: '700', color: 'var(--emerald-green)', background: 'rgba(10,61,42,0.08)', padding: '2px 8px', borderRadius: '999px' }}>{opt.note}</span>}
                  </p>
                </div>
                <span style={{ fontWeight: '700', color: 'var(--emerald-green)', fontSize: '15px' }}>{opt.price.toLocaleString()}₫</span>
              </label>
            ))}
          </div>
        </section>

        {/* Thanh toán */}
        <section style={sectionStyle}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--emerald-green)', marginBottom: '20px' }}>Phương thức thanh toán</h2>
          <div className="row g-3">
            {PAYMENT_OPTIONS.map(pm => (
              <div key={pm.id} className="col-sm-6">
                <label style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
                  border: selectedPayment === pm.id ? '2px solid var(--emerald-green)' : '1px solid #e5e5e5',
                  borderRadius: '12px', cursor: 'pointer',
                  background: selectedPayment === pm.id ? 'rgba(10,61,42,0.05)' : 'white',
                  transition: 'all 0.2s ease'
                }}>
                  <input type="radio" name="payment" value={pm.id} checked={selectedPayment === pm.id} onChange={() => setSelectedPayment(pm.id)} style={{ accentColor: 'var(--emerald-green)' }} />
                  {pm.bg
                    ? <div style={{ width: '35px', height: '35px', borderRadius: '8px', background: pm.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: '700' }}>{pm.short}</div>
                    : <span style={{ fontSize: '24px' }}>{pm.emoji}</span>
                  }
                  <span style={{ fontSize: '14px', fontWeight: '600' }}>{pm.label}</span>
                </label>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px', padding: '14px', background: 'rgba(197,160,89,0.1)', border: '1px solid rgba(197,160,89,0.2)', borderRadius: '10px', display: 'flex', gap: '10px' }}>
            <span>ℹ️</span>
            <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: '1.6', fontStyle: 'italic' }}>
              Do giá trị mặt hàng cao, chúng tôi không hỗ trợ thanh toán khi nhận hàng (COD).
            </p>
          </div>
        </section>
      </div>

      <div className="col-lg-4">
        <OrderSummary {...summaryProps}
          actionBtn={
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button onClick={onPlace} className="luxury-btn" disabled={!isFormValid}
                style={{ width: '100%', padding: '16px', fontSize: '14px', letterSpacing: '1px', opacity: isFormValid ? 1 : 0.5, cursor: isFormValid ? 'pointer' : 'not-allowed' }}>
                ĐẶT HÀNG NGAY
              </button>
              <button onClick={onBack} style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid rgba(10,61,42,0.2)', borderRadius: '8px', color: 'var(--emerald-green)', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
                ← Quay lại giỏ hàng
              </button>
            </div>
          }
        />
      </div>
    </div>
  );
}

// ── Main CartPage ─────────────────────────────────────────────
export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [voucher, setVoucher] = useState('');
  const [discount, setDiscount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState({
    fullName: '', phone: '', email: '',
    province: 'Hồ Chí Minh', ward: ADDRESS_DATA['Hồ Chí Minh'][0], detail: ''
  });

  useEffect(() => {
    if (isLoggedIn && user) {
      setAddress(a => ({ ...a, fullName: user.name || '', phone: user.phone || '', email: user.email || '' }));
    }
  }, [isLoggedIn, user]);

  const shippingFee = SHIPPING_OPTIONS.find(o => o.id === selectedShipping)?.price ?? 35000;
  const subtotal = getCartTotal();
  const total = subtotal + shippingFee - discount;

  const isAddressValid = isLoggedIn
    ? address.ward && address.detail
    : address.fullName && address.phone && address.email && address.ward && address.detail;

  const handleApplyVoucher = () => {
    if (voucher.trim().toUpperCase() === 'LUXE10') setDiscount(Math.round(subtotal * 0.1));
    else alert('Mã voucher không hợp lệ');
  };

  const handlePlaceOrder = () => { setOrderPlaced(true); clearCart(); };

  const summaryProps = { cartItems, subtotal, shippingFee, discount, total, voucher, setVoucher, onApplyVoucher: handleApplyVoucher };

  if (orderPlaced) return (
    <>
      <LuxuryHeader />
      <main style={{ maxWidth: '600px', margin: '80px auto', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🎉</div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--emerald-green)', marginBottom: '15px' }}>Đặt hàng thành công!</h1>
        <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px' }}>
          Cảm ơn bạn đã tin tưởng Luxe Scent. Chúng tôi sẽ xử lý đơn hàng và gửi thông báo qua email sớm nhất.
        </p>
        <a href="/shop" className="luxury-btn" style={{ display: 'inline-block', padding: '15px 40px', textDecoration: 'none' }}>Tiếp tục mua sắm</a>
      </main>
      <LuxuryFooter />
    </>
  );

  return (
    <>
      <LuxuryHeader />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <ProgressBar currentStep={currentStep} />
        {currentStep === 1 && (
          <Step1
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            summaryProps={summaryProps}
            onNext={() => cartItems.length > 0 && setCurrentStep(2)}
          />
        )}
        {currentStep === 2 && (
          <Step2
            address={address}
            setAddress={setAddress}
            isAddressValid={isAddressValid}
            selectedShipping={selectedShipping}
            setSelectedShipping={setSelectedShipping}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            summaryProps={summaryProps}
            onPlace={handlePlaceOrder}
            onBack={() => setCurrentStep(1)}
          />
        )}
      </main>
      <LuxuryFooter />
    </>
  );
}
