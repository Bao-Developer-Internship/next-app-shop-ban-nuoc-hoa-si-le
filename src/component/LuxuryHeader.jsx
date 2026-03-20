"use client"
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function LuxuryHeader() {
    const [searchQuery, setSearchQuery] = useState('');
    const { cartCount, wishlistCount } = useCart();

    return (
        <header className="sticky-top" style={{background: 'var(--cream-white)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'}}>
            {/* Top Bar */}
            <div style={{background: 'var(--emerald-green)', color: 'white', padding: '8px 0', fontSize: '13px'}}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 text-center text-md-start">
                            <span>✨ Miễn phí vận chuyển cho đơn hàng từ 500.000đ</span>
                        </div>
                        <div className="col-md-6 text-center text-md-end">
                            <span className="me-3">📞 1900-LUXE</span>
                            <span className="me-3">📧 hello@luxescent.vn</span>
                            <Link href="/gopy" style={{color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none', borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '12px'}}>
                                💬 Góp ý
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="container py-3">
                <div className="row align-items-center">
                    <div className="col-6 col-md-3">
                        <Link href="/" style={{textDecoration: 'none'}}>
                            <h1 style={{
                                fontFamily: 'var(--font-heading)',
                                color: 'var(--emerald-green)',
                                fontSize: '28px',
                                fontWeight: '700',
                                letterSpacing: '2px',
                                margin: 0
                            }}>
                                LUXE SCENT
                            </h1>
                            <p style={{
                                fontSize: '11px',
                                color: 'var(--soft-gold)',
                                letterSpacing: '3px',
                                margin: 0,
                                fontWeight: '300'
                            }}>
                                HƯƠNG THƠM VĨNH CỬU
                            </p>
                        </Link>
                    </div>
                    
                    <div className="col-md-6 d-none d-md-block">
                        <div className="position-relative">
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Tìm kiếm nước hoa..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '30px',
                                    padding: '12px 50px 12px 20px',
                                    fontSize: '14px'
                                }}
                            />
                            <button style={{
                                position: 'absolute',
                                right: '5px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'var(--emerald-green)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                color: 'white',
                                cursor: 'pointer'
                            }}>
                                🔍
                            </button>
                        </div>
                    </div>
                    
                    <div className="col-6 col-md-3 text-end">
                        <Link href="/login" className="btn position-relative me-2" style={{border: 'none', background: 'transparent', fontSize: '14px', color: 'var(--emerald-green)', fontWeight: '500'}}>
                            👤 Đăng nhập
                        </Link>
                        <Link href="/favorite" className="btn position-relative me-2" style={{border: 'none', background: 'transparent'}}>
                            <span style={{fontSize: '22px'}}>❤️</span>
                            {wishlistCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" 
                                      style={{background: 'var(--rose-gold)', fontSize: '10px'}}>
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/cart" className="btn position-relative" style={{border: 'none', background: 'transparent'}}>
                            <span style={{fontSize: '22px'}}>🛒</span>
                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" 
                                      style={{background: 'var(--emerald-green)', fontSize: '10px'}}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5'}}>
                <div className="container">
                    <ul className="nav justify-content-center" style={{fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: '500'}}>
                        <li className="nav-item">
                            <Link href="/" className="nav-link" style={{color: 'var(--emerald-green)', padding: '15px 20px'}}>
                                TRANG CHỦ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/shop" className="nav-link" style={{color: '#2c2c2c', padding: '15px 20px'}}>
                                MUA LẺ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/wholesale" className="nav-link" style={{color: '#2c2c2c', padding: '15px 20px'}}>
                                MUA SỈ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/collections" className="nav-link" style={{color: '#2c2c2c', padding: '15px 20px'}}>
                                BỘ SƯU TẬP
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about" className="nav-link" style={{color: '#2c2c2c', padding: '15px 20px'}}>
                                VỀ CHÚNG TÔI
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
