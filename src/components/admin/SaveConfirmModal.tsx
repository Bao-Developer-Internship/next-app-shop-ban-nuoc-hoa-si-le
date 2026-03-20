"use client"

interface Change {
  field: string;
  oldValue: string;
  newValue: string;
}

interface SaveConfirmModalProps {
  open: boolean;
  changes: Change[];
  saving: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function SaveConfirmModal({ open, changes, saving, onConfirm, onCancel }: SaveConfirmModalProps) {
  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Backdrop */}
      <div onClick={onCancel} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />

      {/* Modal */}
      <div style={{ position: 'relative', background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 24px 64px rgba(0,0,0,0.15)', fontFamily: "'Inter', sans-serif", margin: '0 16px' }}>
        {/* Icon */}
        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(10,61,43,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#0a3d2b' }}>save</span>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px', fontFamily: "'Inter', sans-serif" }}>
          Xác nhận lưu thay đổi
        </h3>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 24px', lineHeight: '1.6', fontFamily: "'Inter', sans-serif" }}>
          Bạn có chắc chắn muốn lưu những thay đổi này không?
        </p>

        {/* Changes list */}
        {changes.length > 0 && (
          <div style={{ background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '24px', overflow: 'hidden' }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid #e2e8f0', fontSize: '10px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {changes.length} thay đổi
            </div>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {changes.map((c, i) => (
                <div key={i} style={{ padding: '12px 16px', borderBottom: i < changes.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <p style={{ fontSize: '12px', fontWeight: '700', color: '#334155', margin: '0 0 6px', fontFamily: "'Inter', sans-serif" }}>{c.field}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: '4px', fontFamily: "'Inter', sans-serif", textDecoration: 'line-through' }}>
                      {c.oldValue || '(trống)'}
                    </span>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#94a3b8' }}>arrow_forward</span>
                    <span style={{ fontSize: '11px', background: '#dcfce7', color: '#16a34a', padding: '2px 8px', borderRadius: '4px', fontFamily: "'Inter', sans-serif" }}>
                      {c.newValue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={onCancel} disabled={saving}
            style={{ flex: 1, padding: '11px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>
            Hủy
          </button>
          <button onClick={onConfirm} disabled={saving}
            style={{ flex: 1, padding: '11px', background: saving ? '#94a3b8' : '#0a3d2b', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {saving && <span className="material-symbols-outlined" style={{ fontSize: '16px', animation: 'spin 1s linear infinite' }}>progress_activity</span>}
            {saving ? 'Đang lưu...' : 'Xác nhận lưu'}
          </button>
        </div>
      </div>
    </div>
  );
}
