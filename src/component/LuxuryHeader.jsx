"use client"
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/store/authStore';
import SearchBar from '@/component/SearchBar';
import { toast } from 'sonner';

// Avatar dropdown cho user đã đăng nhập
function UserDropdown({ user, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lấy initials từ tên
  const initials = user.name?.split(' ').map(w => w[0]).slice(-2).join('').toUpperCase() || '?';

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', borderRadius: '999px', transition: 'background 0.2s' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(10,61,43,0.06)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}>
        {/* Avatar */}
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
          background: user.avatarUrl ? 'transparent' : 'linear-gradient(135deg, #0a3d2b, #1a6b4a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', border: '2px solid var(--soft-gold)',
        }}>
          {user.avatarUrl
            ? <img src={user.avatarUrl} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <span style={{ color: '#D4AF37', fontSize: '13px', fontWeight: '700' }}>{initials}</span>
          }
        </div>
        <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--emerald-green)', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user.name?.split(' ').pop()}
        </span>
        <span style={{ fontSize: '10px', color: '#94a3b8' }}>▾</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', right: 0, top: 'calc(100% + 8px)',
          background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)', zIndex: 9999,
          minWidth: '220px', overflow: 'hidden', fontFamily: 'Inter, sans-serif',
        }}>
          {/* User info header */}
          <div style={{ padding: '16px', borderBottom: '1px solid #f1f5f9', background: 'rgba(10,61,43,0.03)' }}>
            <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 2px' }}>{user.name}</p>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{user.email}</p>
          </div>

          {/* Menu items */}
          {[
            { href: '/profile', icon: '👤', label: 'Trang cá nhân' },
            { href: '/profile?tab=orders', icon: '📦', label: 'Đơn hàng của tôi' },
            { href: '/favorite', icon: '❤️', label: 'Sản phẩm yêu thích' },
            ...(user.role === 'admin' ? [{ href: '/admin/dashboard', icon: '⚙️', label: 'Quản lý hệ thống' }] : []),
          ].map(item => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 16px', textDecoration: 'none', color: '#475569', fontSize: '13px', fontWeight: '500', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}

          <div style={{ borderTop: '1px solid #f1f5f9' }}>
            <button onClick={() => { onLogout(); setOpen(false); }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 16px', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', fontSize: '13px', fontWeight: '600', fontFamily: 'Inter, sans-serif', textAlign: 'left' }}
              onMouseEnter={e => e.currentTarget.style.background = '#fee2e2'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}>
              <span>🚪</span>
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LuxuryHeader() {
  const { cartCount, wishlistCount } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    logout();
    toast.success('Đã đăng xuất');
    router.push('/');
  };

  return (
    <header className="sticky-top" style={{ background: 'var(--cream-white)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', zIndex: 1000 }}>
      {/* Top Bar */}
      <div style={{ background: 'var(--emerald-green)', color: 'white', padding: '8px 0', fontSize: '13px' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <span>✨ Miễn phí vận chuyển cho đơn hàng từ 500.000đ</span>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <span className="me-3">📞 1900-LUXE</span>
              <span className="me-3">📧 hello@luxescent.vn</span>
              <Link href="/gopy" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none', borderLeft: '1px solid rgba(255,255,255,0.3)', paddingLeft: '12px' }}>
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
            <Link href="/" style={{ textDecoration: 'none' }}>
              <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--emerald-green)', fontSize: '28px', fontWeight: '700', letterSpacing: '2px', margin: 0 }}>
                LUXE SCENT
              </h1>
              <p style={{ fontSize: '11px', color: 'var(--soft-gold)', letterSpacing: '3px', margin: 0, fontWeight: '300' }}>
                HƯƠNG THƠM VĨNH CỬU
              </p>
            </Link>
          </div>

          <div className="col-md-6 d-none d-md-block">
            <SearchBar />
          </div>

          <div className="col-6 col-md-3 text-end" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
            {/* User đã đăng nhập: avatar dropdown | Vãng lai: nút đăng nhập */}
            {mounted && (isLoggedIn ? (
              <UserDropdown user={user} onLogout={handleLogout} />
            ) : (
              <Link href="/login" className="btn position-relative me-2"
                style={{ border: 'none', background: 'transparent', fontSize: '14px', color: 'var(--emerald-green)', fontWeight: '500' }}>
                👤 Đăng nhập
              </Link>
            ))}

            <Link href="/favorite" className="btn position-relative"
              style={{ border: 'none', background: 'transparent', padding: '6px 8px' }}>
              <span style={{ fontSize: '22px' }}>❤️</span>
              {mounted && wishlistCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{ background: 'var(--rose-gold)', fontSize: '10px' }}>
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link href="/cart" className="btn position-relative"
              style={{ border: 'none', background: 'transparent', padding: '6px 8px' }}>
              <span style={{ fontSize: '22px' }}>🛒</span>
              {mounted && cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{ background: 'var(--emerald-green)', fontSize: '10px' }}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
        <div className="container">
          <ul className="nav justify-content-center" style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: '500' }}>
            {[
              { href: '/', label: 'TRANG CHỦ' },
              { href: '/shop', label: 'MUA LẺ' },
              { href: '/wholesale', label: 'MUA SỈ' },
              { href: '/collections', label: 'BỘ SƯU TẬP' },
              { href: '/about', label: 'VỀ CHÚNG TÔI' },
            ].map(nav => (
              <li key={nav.href} className="nav-item">
                <Link href={nav.href} className="nav-link" style={{ color: '#2c2c2c', padding: '15px 20px' }}>
                  {nav.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
