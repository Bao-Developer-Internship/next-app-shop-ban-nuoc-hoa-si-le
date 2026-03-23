"use client"
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Danh sách sản phẩm dùng chung cho gợi ý tìm kiếm
export const ALL_PRODUCTS = [
  { id: 1, name: 'Baccarat Rouge 540', brand: 'Maison Francis', path: '/product/1' },
  { id: 2, name: 'Rose of No Man\'s Land', brand: 'Byredo', path: '/product/2' },
  { id: 3, name: 'Santal 33', brand: 'Le Labo', path: '/product/3' },
  { id: 4, name: 'Sauvage Elixir', brand: 'Dior', path: '/product/4' },
  { id: 5, name: 'Tobacco Vanille', brand: 'Tom Ford', path: '/product/5' },
  { id: 6, name: 'Aventus', brand: 'Creed', path: '/product/6' },
  { id: 7, name: 'Black Opium', brand: 'YSL', path: '/product/7' },
  { id: 8, name: 'Oud Wood', brand: 'Tom Ford', path: '/product/8' },
  { id: 9, name: 'La Vie Est Belle', brand: 'Lancôme', path: '/product/9' },
  { id: 10, name: 'Bleu de Chanel', brand: 'Chanel', path: '/product/10' },
  { id: 11, name: 'Midnight Velvet', brand: 'Luxe Scent', path: '/product/11' },
  { id: 12, name: 'Ocean Breeze EDP', brand: 'Luxe Scent', path: '/product/12' },
  { id: 13, name: 'Velvet Morning Mist', brand: 'Luxe Scent', path: '/product/13' },
  { id: 14, name: 'Amber Noir', brand: 'Luxe Scent', path: '/product/14' },
  { id: 15, name: 'Snow Cedar', brand: 'Luxe Scent', path: '/product/15' },
  { id: 16, name: 'Vanilla Frost', brand: 'Luxe Scent', path: '/product/16' },
  { id: 17, name: 'Oud Wood Intense', brand: 'Tom Ford', path: '/product/17' },
  { id: 18, name: 'Citrus Soleil', brand: 'Luxe Scent', path: '/product/18' },
  { id: 19, name: 'Rose de Mai', brand: 'Luxe Scent', path: '/product/19' },
  { id: 20, name: 'Golden Amber', brand: 'Luxe Scent', path: '/product/20' },
];

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  // Lọc gợi ý theo query (case-insensitive)
  useEffect(() => {
    const q = query.trim();
    if (!q) { setSuggestions([]); setOpen(false); return; }
    const filtered = ALL_PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.brand.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 6);
    setSuggestions(filtered);
    setOpen(filtered.length > 0);
    setActiveIndex(-1);
  }, [query]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0) {
        goTo(suggestions[activeIndex]);
      } else if (query.trim()) {
        setOpen(false);
        router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const goTo = (product) => {
    setQuery(product.name);
    setOpen(false);
    router.push(product.path);
  };

  // Highlight matched text
  const highlight = (text, q) => {
    if (!q.trim()) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} style={{ background: 'rgba(197,160,89,0.25)', color: '#0a3d2b', borderRadius: '2px', padding: '0 1px' }}>{part}</mark>
        : part
    );
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%' }}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        placeholder="Tìm kiếm nước hoa..."
        style={{
          width: '100%',
          border: '1px solid #ddd',
          borderRadius: '30px',
          padding: '12px 50px 12px 20px',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
          fontFamily: 'Inter, sans-serif',
          background: '#fff',
          boxSizing: 'border-box',
        }}
        onMouseEnter={e => e.target.style.borderColor = '#0a3d2b'}
        onMouseLeave={e => { if (document.activeElement !== e.target) e.target.style.borderColor = '#ddd'; }}
        onFocusCapture={e => { e.target.style.borderColor = '#0a3d2b'; e.target.style.boxShadow = '0 0 0 3px rgba(10,61,43,0.08)'; }}
        onBlurCapture={e => { e.target.style.borderColor = '#ddd'; e.target.style.boxShadow = 'none'; }}
      />
      <button
        onClick={() => { setOpen(false); if (query.trim()) router.push(`/shop?search=${encodeURIComponent(query.trim())}`); }}
        style={{
          position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)',
          background: 'var(--emerald-green, #0a3d2b)', border: 'none', borderRadius: '50%',
          width: '40px', height: '40px', color: 'white', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#0d4f38'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--emerald-green, #0a3d2b)'}>
        🔍
      </button>

      {/* Dropdown gợi ý */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
          background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0',
          boxShadow: '0 12px 40px rgba(0,0,0,0.12)', zIndex: 9999,
          overflow: 'hidden', fontFamily: 'Inter, sans-serif',
        }}>
          <div style={{ padding: '8px 16px 6px', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Gợi ý tìm kiếm
            </span>
          </div>
          {suggestions.map((p, i) => (
            <div
              key={p.id}
              onMouseDown={() => goTo(p)}
              onMouseEnter={() => setActiveIndex(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '11px 16px', cursor: 'pointer', transition: 'background 0.15s',
                background: activeIndex === i ? '#f6f8f7' : 'transparent',
                borderBottom: i < suggestions.length - 1 ? '1px solid #f8fafc' : 'none',
              }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                background: 'rgba(10,61,43,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '16px' }}>🌸</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {highlight(p.name, query)}
                </p>
                <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
                  {p.brand}
                </p>
              </div>
              <span style={{ fontSize: '11px', color: '#cbd5e1', flexShrink: 0 }}>↵</span>
            </div>
          ))}
          {query.trim() && (
            <div
              onMouseDown={() => { setOpen(false); router.push(`/shop?search=${encodeURIComponent(query.trim())}`); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 16px',
                cursor: 'pointer', borderTop: '1px solid #f1f5f9',
                background: activeIndex === suggestions.length ? '#f6f8f7' : 'transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f6f8f7'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span style={{ fontSize: '14px', color: '#0a3d2b' }}>🔍</span>
              <span style={{ fontSize: '13px', color: '#0a3d2b', fontWeight: '600' }}>
                Tìm kiếm "<strong>{query}</strong>" trong tất cả sản phẩm
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
