"use client"
import React, { useState } from 'react';

interface Employee {
  id: number; name: string; email: string; phone: string;
  role: string; status: 'active' | 'inactive'; avatar: string; joinDate: string;
}

interface AuditLog {
  id: number; account: string; page: string; action: string; detail: string; time: string;
}

const ROLES = ['Tất cả', 'Admin', 'Quản lý', 'Nhân viên', 'Kế toán'];
const AVATAR_COLORS = ['#0a3d2b', '#1e40af', '#7c3aed', '#b45309', '#be185d'];
const getAvatarColor = (id: number) => AVATAR_COLORS[id % AVATAR_COLORS.length];

const mockEmployees: Employee[] = [
  { id: 1, name: 'Nguyễn Văn An', email: 'an.nguyen@luxescent.com', phone: '0901234567', role: 'Admin', status: 'active', avatar: 'AN', joinDate: '01/01/2024' },
  { id: 2, name: 'Trần Thị Bình', email: 'binh.tran@luxescent.com', phone: '0912345678', role: 'Quản lý', status: 'active', avatar: 'TB', joinDate: '15/03/2024' },
  { id: 3, name: 'Lê Minh Châu', email: 'chau.le@luxescent.com', phone: '0923456789', role: 'Nhân viên', status: 'active', avatar: 'LC', joinDate: '01/06/2024' },
  { id: 4, name: 'Phạm Thị Dung', email: 'dung.pham@luxescent.com', phone: '0934567890', role: 'Kế toán', status: 'inactive', avatar: 'PD', joinDate: '20/08/2024' },
  { id: 5, name: 'Hoàng Văn Em', email: 'em.hoang@luxescent.com', phone: '0945678901', role: 'Nhân viên', status: 'active', avatar: 'HE', joinDate: '10/10/2024' },
];

const mockAuditLogs: AuditLog[] = [
  { id: 1, account: 'admin@luxescent.com', page: 'Trang quản lý bộ sưu tập', action: 'Sửa', detail: 'Cập nhật thứ tự sản phẩm Mùa Xuân', time: '18/03/2026 09:14' },
  { id: 2, account: 'binh.tran@luxescent.com', page: 'Trang quản lý đơn hàng', action: 'Sửa', detail: 'Cập nhật trạng thái đơn #ORD-001 → Đang giao', time: '18/03/2026 08:52' },
  { id: 3, account: 'admin@luxescent.com', page: 'Trang quản lý nhân viên', action: 'Thêm', detail: 'Thêm nhân viên mới: Hoàng Văn Em', time: '17/03/2026 16:30' },
  { id: 4, account: 'chau.le@luxescent.com', page: 'Trang quản lý sản phẩm', action: 'Xóa', detail: 'Xóa sản phẩm: Velvet Morning Mist (cũ)', time: '17/03/2026 14:10' },
  { id: 5, account: 'admin@luxescent.com', page: 'Trang cài đặt', action: 'Sửa', detail: 'Cập nhật thông tin nhân viên: Trần Thị Bình', time: '16/03/2026 11:05' },
  { id: 6, account: 'binh.tran@luxescent.com', page: 'Trang quản lý khách hàng', action: 'Sửa', detail: 'Cập nhật hạng khách hàng: Nguyễn Thị Mai → VIP', time: '15/03/2026 10:22' },
];

const emptyForm = { name: '', email: '', phone: '', role: 'Nhân viên' };

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '8px',
  fontSize: '13px', fontFamily: "'Inter', sans-serif", color: '#1e293b',
  background: '#fff', outline: 'none', boxSizing: 'border-box',
};

// ─── Phân quyền ───────────────────────────────────────────────
const PERMISSION_LIST = [
  { key: 'update_orders',     label: 'Cập nhật đơn hàng',            group: 'Đơn hàng' },
  { key: 'view_customers',    label: 'Xem thông tin khách hàng',      group: 'Khách hàng' },
  { key: 'manage_customers',  label: 'Chỉnh sửa khách hàng',          group: 'Khách hàng' },
  { key: 'add_products',      label: 'Thêm sản phẩm',                 group: 'Sản phẩm' },
  { key: 'delete_products',   label: 'Xóa sản phẩm',                  group: 'Sản phẩm' },
  { key: 'add_to_collection', label: 'Thêm sản phẩm vào bộ sưu tập',  group: 'Sản phẩm' },
  { key: 'view_revenue',      label: 'Xem doanh thu',                  group: 'Báo cáo' },
  { key: 'manage_employees',  label: 'Quản lý nhân viên',              group: 'Hệ thống' },
  { key: 'manage_settings',   label: 'Cài đặt hệ thống',               group: 'Hệ thống' },
];

// Quyền mặc định theo role
const DEFAULT_ROLE_PERMS: Record<string, string[]> = {
  'Nhân viên': ['update_orders', 'view_customers'],
  'Quản lý':   ['update_orders', 'view_customers', 'add_products', 'add_to_collection', 'view_revenue'],
  'Admin':     PERMISSION_LIST.map(p => p.key),
  'Kế toán':   ['view_revenue'],
};

const ROLE_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  'Admin':      { bg: 'rgba(10,61,43,0.1)',    color: '#0a3d2b', border: '#0a3d2b' },
  'Quản lý':   { bg: 'rgba(37,99,235,0.1)',   color: '#1d4ed8', border: '#2563eb' },
  'Nhân viên': { bg: 'rgba(100,116,139,0.1)', color: '#475569', border: '#94a3b8' },
  'Kế toán':   { bg: 'rgba(180,83,9,0.1)',    color: '#b45309', border: '#d97706' },
};

export default function SettingsPage() {
  const [tab, setTab] = useState<'employees' | 'permissions' | 'audit'>('employees');
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('Tất cả');
  const [empPage, setEmpPage] = useState(1);
  const [auditSearch, setAuditSearch] = useState('');
  const [auditAccount, setAuditAccount] = useState('');
  const [auditPage, setAuditPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [detailModal, setDetailModal] = useState<Employee | null>(null);
  const [deleteModal, setDeleteModal] = useState<Employee | null>(null);
  const [form, setForm] = useState(emptyForm);

  // Permissions state — role-level matrix
  const [rolePerms, setRolePerms] = useState<Record<string, string[]>>(DEFAULT_ROLE_PERMS);
  // Per-employee overrides: { empId: Set of permKeys }
  const [empPerms, setEmpPerms] = useState<Record<number, string[]>>({});
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [permMode, setPermMode] = useState<'role' | 'individual'>('role');
  const [permSaved, setPermSaved] = useState(false);

  const PER_PAGE = 5;

  const filteredEmps = employees.filter(e =>
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase())) &&
    (roleFilter === 'Tất cả' || e.role === roleFilter)
  );
  const pagedEmps = filteredEmps.slice((empPage - 1) * PER_PAGE, empPage * PER_PAGE);
  const totalEmpPages = Math.ceil(filteredEmps.length / PER_PAGE);

  const filteredAudit = mockAuditLogs.filter(a =>
    (a.detail.toLowerCase().includes(auditSearch.toLowerCase()) || a.page.toLowerCase().includes(auditSearch.toLowerCase())) &&
    (!auditAccount || a.account.toLowerCase().includes(auditAccount.toLowerCase()))
  );
  const pagedAudit = filteredAudit.slice((auditPage - 1) * PER_PAGE, auditPage * PER_PAGE);
  const totalAuditPages = Math.ceil(filteredAudit.length / PER_PAGE);

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    const newEmp: Employee = {
      id: Date.now(), ...form, status: 'active',
      avatar: form.name.split(' ').map((w: string) => w[0]).slice(-2).join('').toUpperCase(),
      joinDate: new Date().toLocaleDateString('vi-VN'),
    };
    setEmployees(prev => [newEmp, ...prev]);
    setAddModal(false);
    setForm(emptyForm);
  };

  const handleDelete = () => {
    if (!deleteModal) return;
    setEmployees(prev => prev.filter(e => e.id !== deleteModal.id));
    setDeleteModal(null);
  };

  const actionBadge = (action: string) => {
    if (action === 'Thêm') return { background: '#dcfce7', color: '#16a34a' };
    if (action === 'Xóa') return { background: '#fee2e2', color: '#dc2626' };
    return { background: '#dbeafe', color: '#2563eb' };
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f6f8f7', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ padding: '32px 40px', maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0a3d2b', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '-0.5px' }}>
            Quản lý Nhân viên
          </h2>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0 }}>Quản lý tài khoản nhân viên và lịch sử cập nhật hệ thống.</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', borderRadius: '12px', padding: '4px', marginBottom: '32px', width: 'fit-content' }}>
          {([
            { key: 'employees', label: 'Danh sách nhân viên', icon: 'group' },
            { key: 'permissions', label: 'Phân quyền', icon: 'admin_panel_settings' },
            { key: 'audit', label: 'Lịch sử cập nhật hệ thống', icon: 'history' },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', fontFamily: "'Inter', sans-serif", transition: 'all 0.2s', background: tab === t.key ? '#fff' : 'transparent', color: tab === t.key ? '#0a3d2b' : '#64748b', boxShadow: tab === t.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px', fontVariationSettings: "'FILL' 1" }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* EMPLOYEES TAB */}
        {tab === 'employees' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#94a3b8' }}>search</span>
                  <input value={search} onChange={e => { setSearch(e.target.value); setEmpPage(1); }} placeholder="Tìm theo tên, email..."
                    style={{ ...inputStyle, paddingLeft: '40px', width: '260px' }} />
                </div>
                <select value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setEmpPage(1); }}
                  style={{ ...inputStyle, width: '160px', cursor: 'pointer' }}>
                  {ROLES.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
              <button onClick={() => setAddModal(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0a3d2b', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '700', fontFamily: "'Inter', sans-serif" }}>
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person_add</span>
                Thêm nhân viên
              </button>
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    {['Nhân viên', 'Liên hệ', 'Vai trò', 'Ngày tham gia', 'Trạng thái', 'Thao tác'].map(h => (
                      <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pagedEmps.map((emp, i) => (
                    <tr key={emp.id} style={{ borderBottom: i < pagedEmps.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${getAvatarColor(emp.id)}, ${getAvatarColor(emp.id + 2)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '13px', fontWeight: '700', flexShrink: 0 }}>
                            {emp.avatar}
                          </div>
                          <div>
                            <p style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: 0 }}>{emp.name}</p>
                            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>ID #{emp.id}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <p style={{ fontSize: '13px', color: '#475569', margin: '0 0 2px' }}>{emp.email}</p>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{emp.phone}</p>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ fontSize: '12px', fontWeight: '700', padding: '4px 10px', borderRadius: '6px', background: emp.role === 'Admin' ? 'rgba(10,61,43,0.1)' : '#f1f5f9', color: emp.role === 'Admin' ? '#0a3d2b' : '#475569' }}>{emp.role}</span>
                      </td>
                      <td style={{ padding: '16px 20px', fontSize: '13px', color: '#64748b' }}>{emp.joinDate}</td>
                      <td style={{ padding: '16px 20px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', background: emp.status === 'active' ? '#dcfce7' : '#f1f5f9', color: emp.status === 'active' ? '#16a34a' : '#94a3b8' }}>
                          {emp.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 20px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => setDetailModal(emp)}
                            style={{ padding: '7px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#475569', fontFamily: "'Inter', sans-serif" }}>
                            Xem chi tiết
                          </button>
                          <button onClick={() => setDeleteModal(emp)}
                            style={{ padding: '7px', background: '#fee2e2', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', color: '#dc2626' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '16px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>Hiển thị {pagedEmps.length} / {filteredEmps.length} nhân viên</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {Array.from({ length: totalEmpPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setEmpPage(p)}
                      style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', background: empPage === p ? '#0a3d2b' : '#f8fafc', color: empPage === p ? '#fff' : '#64748b' }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PERMISSIONS TAB */}
        {tab === 'permissions' && (
          <div>
            {/* Mode toggle */}
            <div style={{ display: 'flex', gap: '4px', background: '#f1f5f9', borderRadius: '10px', padding: '4px', marginBottom: '28px', width: 'fit-content' }}>
              {([
                { key: 'role', label: 'Theo vai trò', icon: 'groups' },
                { key: 'individual', label: 'Theo nhân viên', icon: 'person' },
              ] as const).map(m => (
                <button key={m.key} onClick={() => { setPermMode(m.key); setSelectedEmp(null); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', fontFamily: "'Inter', sans-serif", background: permMode === m.key ? '#fff' : 'transparent', color: permMode === m.key ? '#0a3d2b' : '#64748b', boxShadow: permMode === m.key ? '0 1px 4px rgba(0,0,0,0.08)' : 'none' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>{m.icon}</span>
                  {m.label}
                </button>
              ))}
            </div>

            {/* ── ROLE MODE ── */}
            {permMode === 'role' && (() => {
              const roles = ['Nhân viên', 'Quản lý', 'Admin', 'Kế toán'];
              const groups = [...new Set(PERMISSION_LIST.map(p => p.group))];

              const toggleRolePerm = (role: string, key: string) => {
                if (role === 'Admin') return; // Admin luôn có tất cả
                setRolePerms(prev => {
                  const cur = prev[role] || [];
                  return { ...prev, [role]: cur.includes(key) ? cur.filter(k => k !== key) : [...cur, key] };
                });
              };

              const saveRolePerms = () => {
                setPermSaved(true);
                setTimeout(() => setPermSaved(false), 2500);
              };

              return (
                <div>
                  <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                          <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em', width: '36%' }}>Quyền hạn</th>
                          {roles.map(role => {
                            const c = ROLE_COLORS[role] || ROLE_COLORS['Nhân viên'];
                            return (
                              <th key={role} style={{ padding: '16px 12px', textAlign: 'center' }}>
                                <span style={{ fontSize: '12px', fontWeight: '700', padding: '4px 12px', borderRadius: '999px', background: c.bg, color: c.color }}>{role}</span>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        {groups.map(group => (
                          <React.Fragment key={group}>
                            <tr style={{ background: '#f8fafc' }}>
                              <td colSpan={roles.length + 1} style={{ padding: '8px 24px', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{group}</td>
                            </tr>
                            {PERMISSION_LIST.filter(p => p.group === group).map((perm, pi, arr) => (
                              <tr key={perm.key} style={{ borderBottom: pi < arr.length - 1 ? '1px solid #f1f5f9' : '2px solid #e2e8f0' }}>
                                <td style={{ padding: '14px 24px', fontSize: '14px', color: '#1e293b', fontWeight: '500' }}>{perm.label}</td>
                                {roles.map(role => {
                                  const isAdmin = role === 'Admin';
                                  const has = isAdmin || (rolePerms[role] || []).includes(perm.key);
                                  return (
                                    <td key={role} style={{ padding: '14px 12px', textAlign: 'center' }}>
                                      <button
                                        onClick={() => toggleRolePerm(role, perm.key)}
                                        disabled={isAdmin}
                                        title={isAdmin ? 'Admin luôn có tất cả quyền' : (has ? 'Nhấn để thu hồi' : 'Nhấn để cấp quyền')}
                                        style={{ background: 'none', border: 'none', cursor: isAdmin ? 'default' : 'pointer', padding: '4px', borderRadius: '6px', transition: 'background 0.15s', opacity: isAdmin ? 0.6 : 1 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '24px', color: has ? '#16a34a' : '#cbd5e1', fontVariationSettings: "'FILL' 1", display: 'block' }}>
                                          {has ? 'check_circle' : 'radio_button_unchecked'}
                                        </span>
                                      </button>
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>* Admin luôn có toàn quyền, không thể chỉnh sửa.</p>
                    <button onClick={saveRolePerms}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: 'linear-gradient(135deg, #c5a059, #f1d592, #c5a059)', color: '#0a3d2b', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '900', fontFamily: "'Inter', sans-serif" }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>save</span>
                      Lưu phân quyền
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* ── INDIVIDUAL MODE ── */}
            {permMode === 'individual' && (
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px', alignItems: 'start' }}>
                {/* Employee list */}
                <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                  <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', fontSize: '12px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Chọn nhân viên
                  </div>
                  {employees.map(emp => {
                    const isSelected = selectedEmp?.id === emp.id;
                    const hasOverride = !!empPerms[emp.id];
                    const c = ROLE_COLORS[emp.role] || ROLE_COLORS['Nhân viên'];
                    return (
                      <button key={emp.id} onClick={() => setSelectedEmp(emp)}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', background: isSelected ? 'rgba(10,61,43,0.06)' : 'transparent', border: 'none', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', textAlign: 'left', borderLeft: isSelected ? '3px solid #0a3d2b' : '3px solid transparent' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: `linear-gradient(135deg, ${getAvatarColor(emp.id)}, ${getAvatarColor(emp.id + 2)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: '700', flexShrink: 0 }}>
                          {emp.avatar}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{emp.name}</p>
                          <span style={{ fontSize: '11px', fontWeight: '700', padding: '2px 8px', borderRadius: '999px', background: c.bg, color: c.color }}>{emp.role}</span>
                        </div>
                        {hasOverride && (
                          <span title="Có quyền tùy chỉnh" className="material-symbols-outlined" style={{ fontSize: '16px', color: '#c5a059', flexShrink: 0, fontVariationSettings: "'FILL' 1" }}>star</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Permission editor */}
                {selectedEmp ? (() => {
                  const basePerms = rolePerms[selectedEmp.role] || [];
                  const overridePerms = empPerms[selectedEmp.id];
                  const currentPerms = overridePerms ?? basePerms;
                  const isAdmin = selectedEmp.role === 'Admin';
                  const groups = [...new Set(PERMISSION_LIST.map(p => p.group))];

                  const toggleEmpPerm = (key: string) => {
                    if (isAdmin) return;
                    setEmpPerms(prev => {
                      const cur = prev[selectedEmp.id] ?? [...basePerms];
                      return { ...prev, [selectedEmp.id]: cur.includes(key) ? cur.filter(k => k !== key) : [...cur, key] };
                    });
                  };

                  const resetToRole = () => {
                    setEmpPerms(prev => { const n = { ...prev }; delete n[selectedEmp.id]; return n; });
                  };

                  const saveEmpPerms = () => {
                    setPermSaved(true);
                    setTimeout(() => setPermSaved(false), 2500);
                  };

                  const c = ROLE_COLORS[selectedEmp.role] || ROLE_COLORS['Nhân viên'];

                  return (
                    <div>
                      {/* Header */}
                      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px 24px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: `linear-gradient(135deg, ${getAvatarColor(selectedEmp.id)}, ${getAvatarColor(selectedEmp.id + 2)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '16px', fontWeight: '700' }}>
                            {selectedEmp.avatar}
                          </div>
                          <div>
                            <p style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b', margin: '0 0 4px' }}>{selectedEmp.name}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', background: c.bg, color: c.color }}>{selectedEmp.role}</span>
                              {overridePerms && <span style={{ fontSize: '11px', color: '#c5a059', fontWeight: '700' }}>⭐ Quyền tùy chỉnh</span>}
                            </div>
                          </div>
                        </div>
                        {overridePerms && !isAdmin && (
                          <button onClick={resetToRole}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#64748b', fontFamily: "'Inter', sans-serif" }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>restart_alt</span>
                            Đặt lại theo vai trò
                          </button>
                        )}
                      </div>

                      {/* Permission checkboxes */}
                      <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                        {groups.map(group => (
                          <div key={group}>
                            <div style={{ padding: '10px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{group}</div>
                            {PERMISSION_LIST.filter(p => p.group === group).map((perm, pi, arr) => {
                              const has = isAdmin || currentPerms.includes(perm.key);
                              const fromRole = basePerms.includes(perm.key);
                              const isOverridden = overridePerms && (has !== fromRole);
                              return (
                                <div key={perm.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: pi < arr.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                  <div>
                                    <span style={{ fontSize: '14px', color: '#1e293b', fontWeight: '500' }}>{perm.label}</span>
                                    {isOverridden && (
                                      <span style={{ marginLeft: '8px', fontSize: '11px', color: '#c5a059', fontWeight: '700' }}>
                                        {has ? '(+thêm)' : '(−thu hồi)'}
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    onClick={() => toggleEmpPerm(perm.key)}
                                    disabled={isAdmin}
                                    style={{ position: 'relative', width: '44px', height: '24px', borderRadius: '999px', border: 'none', cursor: isAdmin ? 'default' : 'pointer', background: has ? '#0a3d2b' : '#e2e8f0', transition: 'background 0.2s', flexShrink: 0 }}>
                                    <span style={{ position: 'absolute', top: '3px', left: has ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <button onClick={saveEmpPerms} disabled={isAdmin}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: isAdmin ? '#e2e8f0' : 'linear-gradient(135deg, #c5a059, #f1d592, #c5a059)', color: isAdmin ? '#94a3b8' : '#0a3d2b', border: 'none', borderRadius: '10px', cursor: isAdmin ? 'not-allowed' : 'pointer', fontSize: '13px', fontWeight: '900', fontFamily: "'Inter', sans-serif" }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>save</span>
                          {isAdmin ? 'Admin không thể chỉnh sửa' : 'Lưu quyền cá nhân'}
                        </button>
                      </div>
                    </div>
                  );
                })() : (
                  <div style={{ background: '#fff', borderRadius: '16px', border: '2px dashed #e2e8f0', padding: '60px 24px', textAlign: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#cbd5e1', display: 'block', marginBottom: '12px' }}>person_search</span>
                    <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>Chọn một nhân viên để chỉnh sửa quyền cá nhân</p>
                  </div>
                )}
              </div>
            )}

            {/* Save toast */}
            {permSaved && (
              <div style={{ position: 'fixed', top: '24px', right: '24px', background: '#0a3d2b', color: '#fff', padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 200, fontSize: '14px', fontWeight: '600' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#c5a059', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Đã lưu phân quyền thành công!
              </div>
            )}
          </div>
        )}

        {/* AUDIT LOG TAB */}
        {tab === 'audit' && (
          <div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <span className="material-symbols-outlined" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', color: '#94a3b8' }}>search</span>
                <input value={auditSearch} onChange={e => { setAuditSearch(e.target.value); setAuditPage(1); }} placeholder="Tìm theo trang, chi tiết..."
                  style={{ ...inputStyle, paddingLeft: '40px', width: '280px' }} />
              </div>
              <input value={auditAccount} onChange={e => { setAuditAccount(e.target.value); setAuditPage(1); }} placeholder="Lọc theo tài khoản..."
                style={{ ...inputStyle, width: '220px' }} />
            </div>

            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    {['Tài khoản', 'Trang thực hiện', 'Thao tác', 'Chi tiết thay đổi', 'Thời gian'].map(h => (
                      <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pagedAudit.map((log, i) => (
                    <tr key={log.id} style={{ borderBottom: i < pagedAudit.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <td style={{ padding: '14px 20px', fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{log.account}</td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#475569' }}>{log.page}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '999px', ...actionBadge(log.action) }}>{log.action}</span>
                      </td>
                      <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748b', maxWidth: '280px' }}>{log.detail}</td>
                      <td style={{ padding: '14px 20px', fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: '16px 20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>Hiển thị {pagedAudit.length} / {filteredAudit.length} bản ghi</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {Array.from({ length: totalAuditPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setAuditPage(p)}
                      style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '600', background: auditPage === p ? '#0a3d2b' : '#f8fafc', color: auditPage === p ? '#fff' : '#64748b' }}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ADD MODAL */}
      {addModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setAddModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'relative', background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '480px', boxShadow: '0 24px 64px rgba(0,0,0,0.15)', fontFamily: "'Inter', sans-serif", margin: '0 16px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 24px' }}>Thêm nhân viên mới</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Họ và tên *', key: 'name', placeholder: 'Nguyễn Văn A' },
                { label: 'Email *', key: 'email', placeholder: 'email@luxescent.com' },
                { label: 'Số điện thoại', key: 'phone', placeholder: '09xxxxxxxx' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</label>
                  <input value={(form as Record<string, string>)[f.key]} onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                    placeholder={f.placeholder} style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vai trò</label>
                <select value={form.role} onChange={e => setForm(prev => ({ ...prev, role: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                  {ROLES.filter(r => r !== 'Tất cả').map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setAddModal(false)} style={{ flex: 1, padding: '11px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px', fontWeight: '600', color: '#475569', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Hủy</button>
              <button onClick={handleAdd} style={{ flex: 1, padding: '11px', background: '#0a3d2b', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Thêm nhân viên</button>
            </div>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {detailModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setDetailModal(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
          <div style={{ position: 'relative', background: '#fff', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '420px', boxShadow: '0 24px 64px rgba(0,0,0,0.15)', fontFamily: "'Inter', sans-serif", margin: '0 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: `linear-gradient(135deg, ${getAvatarColor(detailModal.id)}, ${getAvatarColor(detailModal.id + 2)})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: '700', flexShrink: 0 }}>
                {detailModal.avatar}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 4px' }}>{detailModal.name}</h3>
                <span style={{ fontSize: '12px', fontWeight: '700', padding: '3px 10px', borderRadius: '6px', background: detailModal.role === 'Admin' ? 'rgba(10,61,43,0.1)' : '#f1f5f9', color: detailModal.role === 'Admin' ? '#0a3d2b' : '#475569' }}>{detailModal.role}</span>
              </div>
            </div>
            {[
              { label: 'Email', value: detailModal.email },
              { label: 'Số điện thoại', value: detailModal.phone },
              { label: 'Ngày tham gia', value: detailModal.joinDate },
              { label: 'Trạng thái', value: detailModal.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '600' }}>{row.label}</span>
                <span style={{ fontSize: '13px', color: '#1e293b', fontWeight: '600' }}>{row.value}</span>
              </div>
            ))}
            <button onClick={() => setDetailModal(null)} style={{ width: '100%', marginTop: '24px', padding: '11px', background: '#0a3d2b', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', color: '#fff', cursor: 'pointer', fontFamily: "'Inter', sans-serif" }}>Đóng</button>
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
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', margin: '0 0 8px' }}>Xóa nhân viên?</h3>
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
    </div>
  );
}
