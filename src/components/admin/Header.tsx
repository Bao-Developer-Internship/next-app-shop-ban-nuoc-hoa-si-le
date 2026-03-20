"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminHeader() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('admin_user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/login');
  };

  return (
    <header style={{
      background: '#fff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '14px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          color: '#64748b', textDecoration: 'none', fontSize: '13px',
          padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0',
          transition: 'all 0.2s', fontWeight: '500',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#0a3d2b'; e.currentTarget.style.borderColor = '#0a3d2b'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#e2e8f0'; }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px', fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
          Trang chủ
        </Link>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '18px',
          fontWeight: '700',
          color: '#0f172a',
          margin: 0,
        }}>Tổng quan</h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Search */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span className="material-symbols-outlined" style={{
            position: 'absolute', left: '10px',
            color: '#94a3b8', fontSize: '18px', pointerEvents: 'none',
            fontVariationSettings: "'FILL' 0",
          }}>search</span>
          <input
            style={{
              paddingLeft: '36px', paddingRight: '14px', paddingTop: '8px', paddingBottom: '8px',
              background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px',
              width: '240px', fontSize: '13px', color: '#0f172a', outline: 'none',
              fontFamily: "'Inter', sans-serif",
            }}
            placeholder="Tìm kiếm đơn hàng, khách hàng..."
            type="text"
            onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '1px solid #e2e8f0', paddingLeft: '20px' }}>
          {/* Bell */}
          <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#64748b', display: 'flex' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '22px', fontVariationSettings: "'FILL' 0" }}>notifications</span>
            <span style={{
              position: 'absolute', top: '6px', right: '6px',
              width: '7px', height: '7px', background: '#ef4444',
              borderRadius: '50%', border: '2px solid #fff',
            }}></span>
          </button>

          {/* User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>
                {user?.name || 'Admin Luxe'}
              </div>
              <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Quản trị viên
              </div>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #D4AF37', padding: '2px', flexShrink: 0 }}>
              <img
                alt="Ảnh đại diện"
                style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByzfItdv_1bo4af9U6gMnvEAR_jq00UXuLmClCHehz-l21ppdXbhCvV_OnrQm41mAstnIfYHhp5UPx2QdPAucDr6cXBgzo4F5EspWiKqqT_6DboFHig8FRQrt2XE8R3VW2bbEaq9_NJ2S-nTLJ_EHlVqgIaclQOVpPaoepd4lys5W30qfxeejvKD8xWCOW4cED6CWcy5ASAXe3Iaov0zTSBSS-sngT6-0qKiMUmSgnH5QVif4he9cEDqUaNd09SZiklHLiQhNw73E"
              />
            </div>
            {/* Logout icon button */}
            <button
              onClick={handleLogout}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px', color: '#94a3b8', display: 'flex',
                borderRadius: '6px', transition: 'all 0.2s',
              }}
              title="Đăng xuất"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ef4444';
                e.currentTarget.style.background = '#fee2e2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.background = 'none';
              }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 0" }}>
                logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
