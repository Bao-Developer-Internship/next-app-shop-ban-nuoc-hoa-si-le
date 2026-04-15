"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/admin/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { href: '/admin/orders', icon: 'shopping_bag', label: 'Đơn hàng' },
  { href: '/admin/customers', icon: 'group', label: 'Khách hàng' },
  { href: '/admin/products', icon: 'inventory_2', label: 'Sản phẩm' },
  { href: '/admin/collections', icon: 'auto_awesome_motion', label: 'Bộ sưu tập' },
  { href: '/admin/employees', icon: 'manage_accounts', label: 'Nhân viên' },
  { href: '/admin/settings', icon: 'settings', label: 'Cài đặt' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={{
      width: '240px',
      minWidth: '240px',
      height: '100vh',
      position: 'sticky',
      top: 0,
      backgroundColor: '#0a3d2b',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingTop: '28px',
      paddingBottom: '28px',
      borderRight: '1px solid rgba(212,175,55,0.2)',
    }}>
      <div>
        {/* Logo */}
        <div style={{ padding: '0 24px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              backgroundColor: '#D4AF37', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#0a3d2b',
              fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: '700',
            }}>L</div>
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontSize: '16px',
                letterSpacing: '0.12em', color: '#D4AF37', textTransform: 'uppercase', fontWeight: '700',
              }}>Luxe Scent</div>
              <div style={{
                fontSize: '9px', letterSpacing: '0.18em',
                color: 'rgba(212,175,55,0.6)', textTransform: 'uppercase',
              }}>Quản lý</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link${isActive ? ' active' : ''}`}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>
                  {item.icon}
                </span>
                <span style={{ fontSize: '13px', fontWeight: '500', letterSpacing: '0.02em' }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Button */}
      <div style={{ padding: '0 20px' }} />
    </aside>
  );
}
