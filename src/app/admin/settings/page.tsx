"use client"
import { useState } from 'react';

const DEFAULT_COLORS = {
  emeraldGreen: '#0A3D2A',
  softGold: '#D4AF37',
  roseGold: '#B76E79',
  creamWhite: '#F8F4F0',
  darkBg: '#0a1a14',
};

const FONT_OPTIONS = ['Playfair Display', 'Cormorant Garamond', 'EB Garamond', 'Lora'];
const FONT_BODY_OPTIONS = ['Inter', 'Poppins', 'Nunito', 'DM Sans'];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px',
  fontSize: '13px', fontFamily: "'Inter', sans-serif", color: '#1e293b',
  background: '#fff', outline: 'none', boxSizing: 'border-box',
};

const sectionCard: React.CSSProperties = {
  background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0',
  padding: '28px 32px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: '24px',
};

export default function SettingsPage() {
  const [tab, setTab] = useState<'colors' | 'general' | 'contact'>('colors');
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const [fontHeading, setFontHeading] = useState('Playfair Display');
  const [fontBody, setFontBody] = useState('Inter');
  const [saved, setSaved] = useState(false);
  const [siteName, setSiteName] = useState('LUXE SCENT');
  const [tagline, setTagline] = useState('HƯƠNG THƠM VĨNH CỬU');
  const [hotline, setHotline] = useState('1900-LUXE (5893)');
  const [email, setEmail] = useState('hello@luxescent.vn');
  const [address, setAddress] = useState('123 Đường Lê Lợi, Q.1, TP.HCM');
  const [hours, setHours] = useState('8:00 - 22:00 (Tất cả các ngày)');
  const [minFreeShip, setMinFreeShip] = useState('500.000');

  const handleSave = async () => {
    await new Promise(r => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const resetColors = () => setColors(DEFAULT_COLORS);

  const colorFields = [
    { key: 'emeraldGreen', label: 'Màu chủ đạo (Emerald Green)', desc: 'Header, nút chính, tiêu đề' },
    { key: 'softGold', label: 'Màu điểm nhấn (Soft Gold)', desc: 'Badge, border, nút phụ' },
    { key: 'roseGold', label: 'Màu phụ (Rose Gold)', desc: 'Wishlist, accent nhỏ' },
    { key: 'creamWhite', label: 'Màu nền (Cream White)', desc: 'Background trang chính' },
    { key: 'darkBg', label: 'Màu nền tối (Dark BG)', desc: 'Admin sidebar, dark sections' },
  ] as const;

  return (
    <div style={{ minHeight: '100vh', background: '#f6f8f7', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ padding: '32px 40px', maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0a3d2b', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            Cài đặt hệ thống
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Cấu hình giao diện, màu sắc và thông tin website.</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', borderRadius: '12px', padding: '4px', marginBottom: '32px', width: 'fit-content' }}>
          {([
            { key: 'colors', label: 'Màu sắc & Font', icon: 'palette' },
            { key: 'general', label: 'Thông tin chung', icon: 'tune' },
            { key: 'contact', label: 'Liên hệ & Vận chuyển', icon: 'contact_phone' },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s', background: tab === t.key ? '#fff' : 'transparent', color: tab === t.key ? '#0a3d2b' : '#64748b', boxShadow: tab === t.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* COLORS TAB */}
        {tab === 'colors' && (
          <div>
            <div style={sectionCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', margin: '0 0 4px' }}>Bảng màu thương hiệu</h3>
                  <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>Thay đổi màu sắc sẽ ảnh hưởng toàn bộ giao diện website.</p>
                </div>
                <button onClick={resetColors}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#64748b', fontFamily: "'Inter', sans-serif" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>restart_alt</span>
                  Đặt lại mặc định
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {colorFields.map(f => (
                  <div key={f.key} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <input type="color" value={colors[f.key]}
                        onChange={e => setColors(prev => ({ ...prev, [f.key]: e.target.value }))}
                        style={{ width: '56px', height: '56px', borderRadius: '12px', border: '2px solid #e2e8f0', cursor: 'pointer', padding: '4px', background: 'none' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 2px' }}>{f.label}</p>
                      <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 6px' }}>{f.desc}</p>
                      <input value={colors[f.key]} onChange={e => setColors(prev => ({ ...prev, [f.key]: e.target.value }))}
                        style={{ ...inputStyle, width: '140px', fontFamily: 'monospace', fontSize: '13px' }} />
                    </div>
                    <div style={{ width: '120px', height: '56px', borderRadius: '12px', background: colors[f.key], border: '1px solid #e2e8f0', flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div style={sectionCard}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', margin: '0 0 20px' }}>Xem trước</h3>
              <div style={{ background: colors.creamWhite, borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' }}>
                <div style={{ background: colors.emeraldGreen, padding: '12px 20px', borderRadius: '8px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: colors.softGold, fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: '700', letterSpacing: '2px' }}>{siteName}</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px' }}>MUA LẺ · MUA SỈ · BỘ SƯU TẬP</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button style={{ background: colors.emeraldGreen, color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: '700', cursor: 'default' }}>Mua ngay</button>
                  <button style={{ background: 'transparent', color: colors.emeraldGreen, border: `2px solid ${colors.softGold}`, borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: '700', cursor: 'default' }}>Xem thêm</button>
                  <span style={{ background: colors.softGold, color: colors.emeraldGreen, borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: '800', alignSelf: 'center' }}>SALE</span>
                  <span style={{ background: colors.roseGold, color: '#fff', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: '800', alignSelf: 'center' }}>❤️ 12</span>
                </div>
              </div>
            </div>

            {/* Font */}
            <div style={sectionCard}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', margin: '0 0 20px' }}>Typography</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Font tiêu đề</label>
                  <select value={fontHeading} onChange={e => setFontHeading(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {FONT_OPTIONS.map(f => <option key={f}>{f}</option>)}
                  </select>
                  <p style={{ fontFamily: `'${fontHeading}', serif`, fontSize: '22px', color: colors.emeraldGreen, marginTop: '10px', fontWeight: '700' }}>LUXE SCENT</p>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Font nội dung</label>
                  <select value={fontBody} onChange={e => setFontBody(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {FONT_BODY_OPTIONS.map(f => <option key={f}>{f}</option>)}
                  </select>
                  <p style={{ fontFamily: `'${fontBody}', sans-serif`, fontSize: '14px', color: '#475569', marginTop: '10px', lineHeight: '1.6' }}>Hương thơm sang trọng, lưu hương lâu dài.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GENERAL TAB */}
        {tab === 'general' && (
          <div style={sectionCard}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', margin: '0 0 24px' }}>Thông tin website</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Tên thương hiệu', value: siteName, set: setSiteName, placeholder: 'LUXE SCENT' },
                { label: 'Slogan / Tagline', value: tagline, set: setTagline, placeholder: 'HƯƠNG THƠM VĨNH CỬU' },
                { label: 'Đơn hàng miễn phí vận chuyển từ (VNĐ)', value: minFreeShip, set: setMinFreeShip, placeholder: '500.000' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
                  <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} style={inputStyle} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT TAB */}
        {tab === 'contact' && (
          <div style={sectionCard}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', margin: '0 0 24px' }}>Thông tin liên hệ</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { label: 'Hotline', value: hotline, set: setHotline, placeholder: '1900-LUXE' },
                { label: 'Email', value: email, set: setEmail, placeholder: 'hello@luxescent.vn' },
                { label: 'Địa chỉ', value: address, set: setAddress, placeholder: '123 Đường...' },
                { label: 'Giờ làm việc', value: hours, set: setHours, placeholder: '8:00 - 22:00' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
                  <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} style={inputStyle} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <button onClick={handleSave}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 32px', background: 'linear-gradient(135deg, #c5a059, #f1d592, #c5a059)', color: '#0a3d2b', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '14px', fontWeight: '900', fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>save</span>
            LƯU CÀI ĐẶT
          </button>
        </div>
      </div>

      {saved && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', background: '#0a3d2b', color: '#fff', padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 200, fontSize: '14px', fontWeight: '600' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#c5a059', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          Đã lưu cài đặt thành công!
        </div>
      )}
    </div>
  );
}
