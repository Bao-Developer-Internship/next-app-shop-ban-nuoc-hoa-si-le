"use client"
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
    } else {
      setAuthorized(true);
    }
  }, [router, pathname]);

  if (!authorized) return null;

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />
      <style>{`
        .admin-wrap { display: flex; min-height: 100vh; background: #f6f8f7; font-family: 'Inter', sans-serif; }
        .admin-main { flex: 1; overflow-y: auto; background: #f6f8f7; }
        .admin-scrollbar::-webkit-scrollbar { width: 4px; }
        .admin-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .admin-scrollbar::-webkit-scrollbar-thumb { background: #0a3d2b; border-radius: 10px; }
        .sidebar-link { display: flex; align-items: center; gap: 16px; padding: 16px 32px; transition: all 0.2s; text-decoration: none; color: rgba(212,175,55,0.7); }
        .sidebar-link:hover { color: #D4AF37; background: rgba(255,255,255,0.05); }
        .sidebar-link.active { background: rgba(212,175,55,0.15); border-right: 3px solid #D4AF37; color: #D4AF37; }
        .sidebar-link .material-symbols-outlined { font-size: 22px; }
        .stat-card { background: #fff; border-radius: 12px; border: 1px solid #f1f5f9; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); transition: box-shadow 0.2s; }
        .stat-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; }
        .bar-group:hover .bar-inner { background: rgba(212,175,55,0.4) !important; }
        .bar-group:hover .bar-label { color: #D4AF37 !important; }
        .order-row:hover { background: #f8fafc; }
        .badge { padding: 3px 10px; border-radius: 999px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .badge-green { background: #dcfce7; color: #16a34a; }
        .badge-blue { background: #dbeafe; color: #2563eb; }
        .badge-yellow { background: #fef9c3; color: #ca8a04; }
        .badge-red { background: #fee2e2; color: #dc2626; }
        .new-product-btn { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; background: #D4AF37; color: #0a3d2b; font-weight: 700; padding: 12px 16px; border-radius: 8px; border: none; cursor: pointer; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; transition: background 0.2s; }
        .new-product-btn:hover { background: #c49d2f; }
      `}</style>
      <div className="admin-wrap">
        <Sidebar />
        <main className="admin-main admin-scrollbar">
          <AdminHeader />
          {children}
        </main>
      </div>
    </>
  );
}
