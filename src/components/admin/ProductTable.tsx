"use client"
import { useState } from 'react';

export interface Product {
  id: number;
  brand: string;
  name: string;
  season: string;
  seasonColor: string;
  retailPrice: string;
  wholesalePrice: string;
  stock: number | 'Hết hàng';
  status: 'Hiển thị' | 'Ẩn';
  img: string;
}

interface ProductTableProps {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
  onToggleStatus: (p: Product) => void;
}

export default function ProductTable({ products, onEdit, onDelete, onToggleStatus }: ProductTableProps) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) =>
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const toggleAll = () =>
    setSelected(selected.length === products.length ? [] : products.map(p => p.id));

  const seasonStyle = (color: string): React.CSSProperties => {
    const map: Record<string, React.CSSProperties> = {
      gold: { background: 'rgba(197,160,89,0.12)', border: '1px solid rgba(197,160,89,0.3)', color: '#c5a059' },
      green: { background: 'rgba(22,163,74,0.1)', border: '1px solid rgba(22,163,74,0.25)', color: '#16a34a' },
      slate: { background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b' },
      blue: { background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', color: '#2563eb' },
    };
    return map[color] ?? map.slate;
  };

  return (
    <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ padding: '14px 20px', width: '40px' }}>
              <input type="checkbox" checked={selected.length === products.length && products.length > 0}
                onChange={toggleAll}
                style={{ accentColor: '#0a3d2b', width: '15px', height: '15px', cursor: 'pointer' }} />
            </th>
            {['Sản phẩm', 'Mùa', 'Giá bán lẻ', 'Giá sỉ', 'Tồn kho', 'Trạng thái', ''].map(h => (
              <th key={h} style={{ padding: '14px 16px', textAlign: h === 'Giá bán lẻ' || h === 'Giá sỉ' ? 'right' : h === 'Mùa' || h === 'Tồn kho' || h === 'Trạng thái' ? 'center' : 'left', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id}
              style={{ borderBottom: i < products.length - 1 ? '1px solid #f1f5f9' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <td style={{ padding: '16px 20px' }}>
                <input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)}
                  style={{ accentColor: '#0a3d2b', width: '15px', height: '15px', cursor: 'pointer' }} />
              </td>
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #e2e8f0', flexShrink: 0, background: '#f8fafc' }}>
                    <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 2px' }}>{p.brand}</p>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{p.name}</p>
                  </div>
                </div>
              </td>
              <td style={{ padding: '16px', textAlign: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', letterSpacing: '0.06em', textTransform: 'uppercase', ...seasonStyle(p.seasonColor) }}>
                  {p.season}
                </span>
              </td>
              <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{p.retailPrice}</td>
              <td style={{ padding: '16px', textAlign: 'right', fontSize: '14px', color: '#64748b' }}>{p.wholesalePrice}</td>
              <td style={{ padding: '16px', textAlign: 'center' }}>
                {p.stock === 'Hết hàng'
                  ? <span style={{ fontSize: '12px', fontWeight: '700', color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Hết hàng</span>
                  : <span style={{ fontSize: '14px', fontWeight: '700', color: (p.stock as number) < 10 ? '#f59e0b' : '#1e293b' }}>{String(p.stock).padStart(2, '0')}</span>
                }
              </td>
              <td style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: p.status === 'Hiển thị' ? '#16a34a' : '#94a3b8' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: p.status === 'Hiển thị' ? '#16a34a' : '#cbd5e1', display: 'inline-block', animation: p.status === 'Hiển thị' ? 'pulse 2s infinite' : 'none' }} />
                  {p.status}
                </div>
              </td>
              <td style={{ padding: '16px', textAlign: 'right', position: 'relative' }}>
                <button onClick={() => setOpenMenu(openMenu === p.id ? null : p.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '6px' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#0a3d2b')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>more_vert</span>
                </button>
                {openMenu === p.id && (
                  <div style={{ position: 'absolute', right: '12px', top: '44px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 50, minWidth: '160px', overflow: 'hidden' }}
                    onMouseLeave={() => setOpenMenu(null)}>
                    {[
                      { icon: 'edit', label: 'Chỉnh sửa', action: () => { onEdit(p); setOpenMenu(null); } },
                      { icon: p.status === 'Hiển thị' ? 'visibility_off' : 'visibility', label: p.status === 'Hiển thị' ? 'Ẩn sản phẩm' : 'Hiển thị', action: () => { onToggleStatus(p); setOpenMenu(null); } },
                      { icon: 'delete', label: 'Xóa', action: () => { onDelete(p); setOpenMenu(null); }, danger: true },
                    ].map(item => (
                      <button key={item.label} onClick={item.action}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: item.danger ? '#ef4444' : '#475569', fontFamily: "'Inter', sans-serif", textAlign: 'left' }}
                        onMouseEnter={e => (e.currentTarget.style.background = item.danger ? '#fee2e2' : '#f8fafc')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'none')}>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
    </div>
  );
}
