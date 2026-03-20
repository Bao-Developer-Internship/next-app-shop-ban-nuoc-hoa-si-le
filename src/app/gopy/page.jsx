'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Gopy() {
  const [dsGopy, themDsGopy] = useState([]);
  const [gopY, themGopy] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gopY.trim().length > 0) {
      themDsGopy([...dsGopy, { id: Date.now(), noidung: gopY.trim() }]);
      themGopy('');
    }
  };

  const handleDelete = (id) => {
    themDsGopy(dsGopy.filter((g) => g.id !== id));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8F4F0', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ background: '#0A3D2A', padding: '20px 0' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ color: '#D4AF37', textDecoration: 'none', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            ← Về trang chủ
          </Link>
          <span style={{ fontFamily: "'Playfair Display', serif", color: '#D4AF37', fontSize: '18px', fontWeight: '700', letterSpacing: '0.1em' }}>
            LUXE SCENT
          </span>
        </div>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: '#0A3D2A', fontWeight: '700', margin: '0 0 12px' }}>
            Góp Ý & Phản Hồi
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px', margin: 0 }}>
            Ý kiến của bạn giúp chúng tôi hoàn thiện hơn mỗi ngày
          </p>
        </div>

        {/* Form */}
        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '32px', border: '1px solid #f1f5f9' }}>
          <form onSubmit={handleSubmit}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#0A3D2A', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Nội dung góp ý
            </label>
            <textarea
              value={gopY}
              onChange={(e) => themGopy(e.target.value)}
              placeholder="Chia sẻ trải nghiệm hoặc góp ý của bạn về sản phẩm, dịch vụ..."
              rows={4}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '10px',
                border: '1px solid #e2e8f0', fontSize: '14px', color: '#0f172a',
                resize: 'vertical', outline: 'none', fontFamily: "'Inter', sans-serif",
                boxSizing: 'border-box', background: '#f8fafc',
              }}
              onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>{gopY.length} ký tự</span>
              <button
                type="submit"
                disabled={!gopY.trim()}
                style={{
                  background: gopY.trim() ? '#0A3D2A' : '#cbd5e1',
                  color: gopY.trim() ? '#D4AF37' : '#94a3b8',
                  border: 'none', borderRadius: '8px', padding: '10px 28px',
                  fontSize: '13px', fontWeight: '700', cursor: gopY.trim() ? 'pointer' : 'not-allowed',
                  letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 0.2s',
                }}>
                Gửi góp ý
              </button>
            </div>
          </form>
        </div>

        {/* List */}
        {dsGopy.length > 0 && (
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px 32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', marginBottom: '32px' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: '#0A3D2A', margin: '0 0 20px', fontWeight: '700' }}>
              Góp ý đã gửi ({dsGopy.length})
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {dsGopy.map((g) => (
                <li key={g.id} style={{
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px',
                  padding: '14px 16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #f1f5f9',
                }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', flex: 1 }}>
                    <span style={{ color: '#D4AF37', fontSize: '16px', marginTop: '1px' }}>✦</span>
                    <span style={{ fontSize: '14px', color: '#334155', lineHeight: '1.6' }}>{g.noidung}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(g.id)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#cbd5e1', fontSize: '18px', padding: '0 4px', flexShrink: 0,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#cbd5e1'}
                    title="Xóa">
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Contact */}
        <div style={{ background: '#0A3D2A', borderRadius: '16px', padding: '28px 32px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(212,175,55,0.7)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 16px' }}>
            Liên hệ trực tiếp
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            <span style={{ color: '#D4AF37', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📞 1900-LUXE
            </span>
            <span style={{ color: '#D4AF37', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ✉️ hello@luxescent.vn
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
