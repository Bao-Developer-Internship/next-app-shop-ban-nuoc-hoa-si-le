"use client"
import { useState } from 'react';
import ProductTable, { Product } from '@/components/admin/ProductTable';
import SaveConfirmModal from '@/components/admin/SaveConfirmModal';

const initialProducts: Product[] = [
  { id: 1, brand: 'Maison Francis Kurkdjian', name: 'Baccarat Rouge 540 Extrait de Parfum', season: 'Thu / Đông', seasonColor: 'gold', retailPrice: '12.500.000đ', wholesalePrice: '9.850.000đ', stock: 42, status: 'Hiển thị', img: '/images/San-Pham/SP9.jpg' },
  { id: 2, brand: 'Tom Ford', name: 'Oud Wood Intense', season: 'Tất cả mùa', seasonColor: 'slate', retailPrice: '9.200.000đ', wholesalePrice: '7.100.000đ', stock: 8, status: 'Hiển thị', img: '/images/San-Pham/SP16.jpg' },
  { id: 3, brand: 'Creed', name: 'Aventus For Men', season: 'Xuân / Hạ', seasonColor: 'green', retailPrice: '8.500.000đ', wholesalePrice: '6.400.000đ', stock: 124, status: 'Ẩn', img: '/images/San-Pham/SP15.jpg' },
  { id: 4, brand: 'Le Labo', name: 'Santal 33', season: 'Tất cả mùa', seasonColor: 'slate', retailPrice: '7.800.000đ', wholesalePrice: '5.900.000đ', stock: 'Hết hàng', status: 'Hiển thị', img: '/images/San-Pham/SP10.jpg' },
  { id: 5, brand: 'Chanel', name: 'Bleu de Chanel Parfum', season: 'Tất cả mùa', seasonColor: 'slate', retailPrice: '6.200.000đ', wholesalePrice: '4.800.000đ', stock: 67, status: 'Hiển thị', img: '/images/San-Pham/SP2.jpg' },
  { id: 6, brand: 'Dior', name: 'Sauvage Elixir', season: 'Thu / Đông', seasonColor: 'gold', retailPrice: '5.900.000đ', wholesalePrice: '4.500.000đ', stock: 33, status: 'Hiển thị', img: '/images/San-Pham/SP11.jpg' },
  { id: 7, brand: 'Byredo', name: 'Bal d\'Afrique', season: 'Xuân / Hạ', seasonColor: 'green', retailPrice: '7.100.000đ', wholesalePrice: '5.500.000đ', stock: 19, status: 'Ẩn', img: '/images/San-Pham/SP13.jpg' },
];

const TABS = ['Tất cả', 'Đang bán', 'Hết hàng', 'Bản nháp'];
const PER_PAGE = 5;

const emptyForm = { brand: '', name: '', season: 'Tất cả mùa', seasonColor: 'slate', retailPrice: '', wholesalePrice: '', stock: '', img: '' };

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState<Product | null>(null);
  const [deleteModal, setDeleteModal] = useState<Product | null>(null);
  const [saveModal, setSaveModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const filtered = products.filter(p => {
    const matchSearch = p.brand.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === 'Tất cả' ? true
      : activeTab === 'Đang bán' ? p.status === 'Hiển thị' && p.stock !== 'Hết hàng'
      : activeTab === 'Hết hàng' ? p.stock === 'Hết hàng'
      : false;
    return matchSearch && matchTab;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleAdd = () => {
    if (!form.brand || !form.name) return;
    const newP: Product = {
      id: Date.now(), brand: form.brand, name: form.name,
      season: form.season, seasonColor: form.seasonColor,
      retailPrice: form.retailPrice || '0đ', wholesalePrice: form.wholesalePrice || '0đ',
      stock: form.stock === 'Hết hàng' ? 'Hết hàng' : Number(form.stock) || 0,
      status: 'Hiển thị',
      img: form.img || 'https://fimgs.net/mdimg/perfume/375x500.25889.jpg',
    };
    setProducts(prev => [newP, ...prev]);
    setAddModal(false);
    setForm(emptyForm);
  };

  const handleEdit = () => {
    if (!editModal) return;
    setProducts(prev => prev.map(p => p.id === editModal.id ? editModal : p));
    setEditModal(null);
    setSaveModal(true);
  };

  const handleDelete = () => {
    if (!deleteModal) return;
    setProducts(prev => prev.filter(p => p.id !== deleteModal.id));
    setDeleteModal(null);
  };

  const handleToggleStatus = (p: Product) => {
    setProducts(prev => prev.map(x => x.id === p.id ? { ...x, status: x.status === 'Hiển thị' ? 'Ẩn' : 'Hiển thị' } : x));
  };

  const handleSaveConfirm = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setSaveModal(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px',
    fontSize: '13px', fontFamily: "'Inter', sans-serif", color: '#1e293b',
    background: '#fff', outline: 'none', boxSizing: 'border-box',
  };

  const SEASON_OPTIONS = [
    { label: 'Tất cả mùa', value: 'slate' },
    { label: 'Xuân / Hạ', value: 'green' },
    { label: 'Thu / Đông', value: 'gold' },
    { label: 'Mùa Xuân', value: 'green' },
    { label: 'Mùa Hạ', value: 'blue' },
    { label: 'Mùa Thu', value: 'gold' },
    { label: 'Mùa Đông', value: 'slate' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f6f8f7', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ padding: '32px 40px', maxWidth: '1280px', margin: '0 auto' }}>

        {/* Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0a3d2b', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '-0.5px', fontFamily: "'Playfair Display', serif" }}>
              Quản lý Sản phẩm
            </h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Danh mục nước hoa cao cấp &amp; Bộ sưu tập giới hạn</p>
          </div>
          <button onClick={() => { setForm(emptyForm); setAddModal(true); }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'linear-gradient(135deg, #c5a059, #f1d592, #c5a059)', color: '#0a3d2b', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '800', fontFamily: "'Inter', sans-serif", boxShadow: '0 4px 16px rgba(197,160,89,0.3)', letterSpacing: '0.04em' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
            Thêm sản phẩm mới
          </button>
        </div>

        {/* Tabs + Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '0' }}>
            {TABS.map(t => (
              <button key={t} onClick={() => { setActiveTab(t); setPage(1); }}
                style={{ padding: '12px 20px', background: 'none', border: 'none', borderBottom: activeTab === t ? '2px solid #c5a059' : '2px solid transparent', cursor: 'pointer', fontSize: '13px', fontWeight: activeTab === t ? '700' : '500', color: activeTab === t ? '#c5a059' : '#94a3b8', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.06em', transition: 'all 0.2s', marginBottom: '-1px' }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#94a3b8' }}>search</span>
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Tìm sản phẩm, thương hiệu..."
                style={{ ...inputStyle, paddingLeft: '40px', width: '240px' }} />
            </div>
            {/* View toggle */}
            <div style={{ display: 'flex', background: '#f1f5f9', borderRadius: '8px', padding: '3px', border: '1px solid #e2e8f0' }}>
              {(['table', 'grid'] as const).map(v => (
                <button key={v} onClick={() => setViewMode(v)}
                  style={{ padding: '6px 8px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: viewMode === v ? '#fff' : 'transparent', color: viewMode === v ? '#0a3d2b' : '#94a3b8', boxShadow: viewMode === v ? '0 1px 3px rgba(0,0,0,0.08)' : 'none', display: 'flex', alignItems: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{v === 'table' ? 'table_rows' : 'grid_view'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table or Grid */}
        {viewMode === 'table' ? (
          <ProductTable
            products={paged}
            onEdit={p => setEditModal({ ...p })}
            onDelete={p => setDeleteModal(p)}
            onToggleStatus={handleToggleStatus}
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {paged.map(p => (
              <div key={p.id} style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)')}>
                <div style={{ height: '160px', background: '#f8fafc', overflow: 'hidden' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '16px' }}>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 4px', fontWeight: '600' }}>{p.brand}</p>
                  <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</p>
                  <p style={{ fontSize: '15px', fontWeight: '800', color: '#c5a059', margin: '0 0 12px' }}>{p.retailPrice}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: p.status === 'Hiển thị' ? '#16a34a' : '#94a3b8' }}>● {p.status}</span>
                    <button onClick={() => setEditModal({ ...p })}
                      style={{ padding: '5px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#475569', fontFamily: "'Inter', sans-serif" }}>
                      Sửa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>
            Hiển thị {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–{Math.min(page * PER_PAGE, filtered.length)} của {filtered.length} sản phẩm
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', color: page === 1 ? '#cbd5e1' : '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_left</span>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                style={{ width: '36px', height: '36px', borderRadius: '8px', border: page === p ? 'none' : '1px solid #e2e8f0', cursor: 'pointer', fontSize: '13px', fontWeight: '700', background: page === p ? '#0a3d2b' : '#fff', color: page === p ? '#fff' : '#475569' }}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', color: page === totalPages ? '#cbd5e1' : '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {saved && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', background: '#0a3d2b', color: '#fff', padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 200, fontSize: '14px', fontWeight: '600' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#c5a059', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          Đã lưu thay đổi thành công!
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {(addModal || editModal) && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => { setAddModal(false); setEditModal(null); }} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'relative', background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '520px', boxShadow: '0 24px 64px rgba(0,0,0,0.15)', fontFamily: "'Inter', sans-serif", margin: '0 16px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 24px' }}>
              {addModal ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Thương hiệu *', key: 'brand', placeholder: 'Chanel, Dior...' },
                { label: 'Tên sản phẩm *', key: 'name', placeholder: 'Tên nước hoa' },
                { label: 'Giá bán lẻ', key: 'retailPrice', placeholder: '5.000.000đ' },
                { label: 'Giá sỉ', key: 'wholesalePrice', placeholder: '3.800.000đ' },
                { label: 'Tồn kho', key: 'stock', placeholder: 'Số lượng hoặc "Hết hàng"' },
                { label: 'URL ảnh', key: 'img', placeholder: 'https://...' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
                  <input
                    value={addModal ? (form as Record<string, string>)[f.key] : String((editModal as Record<string, unknown>)[f.key] ?? '')}
                    onChange={e => addModal
                      ? setForm(prev => ({ ...prev, [f.key]: e.target.value }))
                      : setEditModal(prev => prev ? { ...prev, [f.key]: e.target.value } : null)}
                    placeholder={f.placeholder} style={{ ...inputStyle }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mùa</label>
                <select
                  value={addModal ? form.season : editModal?.season}
                  onChange={e => {
                    const opt = SEASON_OPTIONS.find(o => o.label === e.target.value);
                    if (addModal) setForm(prev => ({ ...prev, season: e.target.value, seasonColor: opt?.value ?? 'slate' }));
                    else setEditModal(prev => prev ? { ...prev, season: e.target.value, seasonColor: opt?.value ?? 'slate' } : null);
                  }}
                  style={{ ...inputStyle, cursor: 'pointer' }}>
                  {SEASON_OPTIONS.map(o => <option key={o.label}>{o.label}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => { setAddModal(false); setEditModal(null); }}
                style={{ flex: 1, padding: '11px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Hủy</button>
              <button onClick={addModal ? handleAdd : handleEdit}
                style={{ flex: 1, padding: '11px', background: '#0a3d2b', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
                {addModal ? 'Thêm sản phẩm' : 'Lưu thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setDeleteModal(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'relative', background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px', boxShadow: '0 24px 64px rgba(0,0,0,0.15)', fontFamily: "'Inter', sans-serif", margin: '0 16px', textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#dc2626', fontVariationSettings: "'FILL' 1" }}>delete</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px' }}>Xóa sản phẩm?</h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px', lineHeight: '1.6' }}>
              Bạn có chắc muốn xóa <strong>{deleteModal.name}</strong>? Hành động này không thể hoàn tác.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDeleteModal(null)} style={{ flex: 1, padding: '11px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Hủy</button>
              <button onClick={handleDelete} style={{ flex: 1, padding: '11px', background: '#dc2626', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Xóa</button>
            </div>
          </div>
        </div>
      )}

      {/* SAVE CONFIRM MODAL */}
      <SaveConfirmModal
        open={saveModal}
        changes={editModal ? [{ field: editModal.name, oldValue: 'Thông tin cũ', newValue: 'Đã cập nhật' }] : []}
        saving={saving}
        onConfirm={handleSaveConfirm}
        onCancel={() => setSaveModal(false)}
      />
    </div>
  );
}
