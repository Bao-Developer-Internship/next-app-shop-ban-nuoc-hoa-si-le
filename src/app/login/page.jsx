"use client"
/**
 * Login/Register page — kết nối /api/auth/login và /api/auth/register
 * Dùng: useAuth (AuthContext), toast (sonner), Zod validation
 *
 * Tài khoản test:
 *   User:  user@luxescent.vn / User@123456
 *   Admin: admin@luxescent.com / Admin@123456
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuth } from '@/store/authStore';

// Zod-style validation (inline, không cần import để giữ nhẹ)
function validate(data, isLogin) {
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    return 'Email không hợp lệ';
  if (!data.password || data.password.length < 6)
    return 'Mật khẩu tối thiểu 6 ký tự';
  if (!isLogin) {
    if (!data.name || data.name.length < 2) return 'Tên tối thiểu 2 ký tự';
    if (!data.phone || !/^0\d{9}$/.test(data.phone)) return 'Số điện thoại không hợp lệ (VD: 0901234567)';
  }
  return null;
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '', phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    const validationError = validate(formData, isLogin);
    if (validationError) { setError(validationError); return; }

    setLoading(true);
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Có lỗi xảy ra');

      // Lưu session
      login(data.user, data.token);

      // Redirect theo role
      if (data.user.role === 'admin') {
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        toast.success('Đăng nhập admin thành công!');
        window.location.href = '/admin/dashboard';
      } else {
        toast.success(isLogin ? `Chào mừng trở lại, ${data.user.name}!` : 'Đăng ký thành công!');
        router.push('/');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(to bottom, rgba(10, 61, 43, 0.8), rgba(10, 26, 20, 0.95)), url("https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflowX: 'hidden',
      fontFamily: 'Inter, sans-serif',
      color: '#f1f5f9'
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }}></div>
      
      <div style={{
        display: 'flex',
        height: '100%',
        flexGrow: 1,
        flexDirection: 'column',
        position: 'relative',
        zIndex: 10
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%',
              background: '#d4af37', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: '#0a1a14',
              fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: '700',
              flexShrink: 0,
            }}>L</div>
            <h2 style={{
              color: '#d4af37',
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: 0
            }}>
              Luxe Scent
            </h2>
          </Link>


        </header>

        {/* Main Content */}
        <main style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem 1rem'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '480px',
            background: 'rgba(10, 26, 20, 0.8)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(10, 61, 43, 0.3)',
            borderRadius: '0.75rem',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h1 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '2.25rem',
                color: '#d4af37',
                marginBottom: '0.75rem',
                letterSpacing: '-0.025em',
                margin: '0 0 0.75rem 0'
              }}>
                Chào mừng trở lại
              </h1>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.875rem',
                fontWeight: '300',
                margin: 0
              }}>
                {isLogin ? 'Vui lòng đăng nhập để tiếp tục mua sắm' : 'Tạo tài khoản để trải nghiệm mua sắm tốt nhất'}
              </p>
            </div>

            {/* Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid rgba(10, 61, 43, 0.3)',
              marginBottom: '2rem'
            }}>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
                style={{
                  flex: 1,
                  paddingBottom: '1rem',
                  color: isLogin ? '#d4af37' : '#64748b',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  background: 'none',
                  border: 'none',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: isLogin ? '2px solid #d4af37' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
                style={{
                  flex: 1,
                  paddingBottom: '1rem',
                  color: !isLogin ? '#d4af37' : '#64748b',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  background: 'none',
                  border: 'none',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: !isLogin ? '2px solid #d4af37' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                Đăng ký
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div style={{
                marginBottom: '1.5rem',
                padding: '0.75rem',
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                borderRadius: '0.5rem',
                color: '#fecaca',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {!isLogin && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: '#d4af37',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    Họ và tên
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span className="material-symbols-outlined" style={{
                      position: 'absolute',
                      left: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'rgba(10, 61, 43, 0.6)',
                      fontSize: '1.125rem'
                    }}>
                      person
                    </span>
                    <input
                      style={{
                        width: '100%',
                        background: 'rgba(10, 61, 43, 0.1)',
                        border: '1px solid rgba(10, 61, 43, 0.4)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                        color: '#f1f5f9',
                        outline: 'none',
                        transition: 'all 0.2s',
                        fontSize: '1rem'
                      }}
                      placeholder="Nguyễn Văn A"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required={!isLogin}
                      onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(10, 61, 43, 0.4)'}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: '#d4af37',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}>
                  {isLogin ? 'Email' : 'Địa chỉ Email'}
                </label>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(10, 61, 43, 0.6)',
                    fontSize: '1.125rem'
                  }}>
                    mail
                  </span>
                  <input
                    style={{
                      width: '100%',
                      background: 'rgba(10, 61, 43, 0.1)',
                      border: '1px solid rgba(10, 61, 43, 0.4)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      color: '#f1f5f9',
                      outline: 'none',
                      transition: 'all 0.2s',
                      fontSize: '1rem'
                    }}
                    placeholder="email@example.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(10, 61, 43, 0.4)'}
                  />
                </div>
              </div>

              {!isLogin && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: '#d4af37',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    Số điện thoại
                  </label>
                  <div style={{ position: 'relative' }}>
                    <span className="material-symbols-outlined" style={{
                      position: 'absolute',
                      left: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'rgba(10, 61, 43, 0.6)',
                      fontSize: '1.125rem'
                    }}>
                      phone
                    </span>
                    <input
                      style={{
                        width: '100%',
                        background: 'rgba(10, 61, 43, 0.1)',
                        border: '1px solid rgba(10, 61, 43, 0.4)',
                        borderRadius: '0.5rem',
                        padding: '0.75rem 1rem 0.75rem 2.5rem',
                        color: '#f1f5f9',
                        outline: 'none',
                        transition: 'all 0.2s',
                        fontSize: '1rem'
                      }}
                      placeholder="0912345678"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required={!isLogin}
                      onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(10, 61, 43, 0.4)'}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    color: '#d4af37',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}>
                    Mật khẩu
                  </label>
                  {isLogin && (
                    <a href="#" style={{
                      fontSize: '0.625rem',
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.025em',
                      textDecoration: 'none'
                    }}>
                      Quên mật khẩu?
                    </a>
                  )}
                </div>
                <div style={{ position: 'relative' }}>
                  <span className="material-symbols-outlined" style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(10, 61, 43, 0.6)',
                    fontSize: '1.125rem'
                  }}>
                    lock
                  </span>
                  <input
                    style={{
                      width: '100%',
                      background: 'rgba(10, 61, 43, 0.1)',
                      border: '1px solid rgba(10, 61, 43, 0.4)',
                      borderRadius: '0.5rem',
                      padding: '0.75rem 1rem 0.75rem 2.5rem',
                      color: '#f1f5f9',
                      outline: 'none',
                      transition: 'all 0.2s',
                      fontSize: '1rem'
                    }}
                    placeholder="••••••••"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    onFocus={(e) => e.target.style.borderColor = '#d4af37'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(10, 61, 43, 0.4)'}
                  />
                </div>
                {!isLogin && (
                  <p style={{
                    fontSize: '0.625rem',
                    color: '#64748b',
                    marginTop: '0.25rem',
                    margin: '0.25rem 0 0 0'
                  }}>
                    Mật khẩu phải có ít nhất 6 ký tự
                  </p>
                )}
              </div>

              {isLogin && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0' }}>
                  <input
                    style={{
                      borderRadius: '0.25rem',
                      border: '1px solid rgba(10, 61, 43, 0.4)',
                      background: 'rgba(10, 61, 43, 0.1)',
                      color: '#d4af37'
                    }}
                    id="remember"
                    type="checkbox"
                  />
                  <label htmlFor="remember" style={{
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    cursor: 'pointer',
                    margin: 0
                  }}>
                    Ghi nhớ đăng nhập
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: '#d4af37',
                  color: '#0a1a14',
                  fontWeight: 'bold',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.5 : 1,
                  transition: 'all 0.3s',
                  boxShadow: '0 0 0 rgba(212, 175, 55, 0.4)'
                }}
                onMouseEnter={(e) => !loading && (e.target.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.4)')}
                onMouseLeave={(e) => e.target.style.boxShadow = '0 0 0 rgba(212, 175, 55, 0.4)'}>
                {loading ? 'Đang xử lý...' : isLogin ? 'Đăng nhập ngay' : 'Đăng ký ngay'}
              </button>
            </form>

            <div style={{
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(10, 61, 43, 0.2)',
              textAlign: 'center'
            }}>
              <p style={{
                color: '#64748b',
                fontSize: '0.75rem',
                margin: 0
              }}>
                Cần hỗ trợ?{' '}
                <a href="#" style={{
                  color: '#d4af37',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  textDecorationColor: 'rgba(212, 175, 55, 0.3)'
                }}>
                  Liên hệ chúng tôi
                </a>
              </p>

            </div>
          </div>
        </main>

        {/* Footer */}
        <footer style={{
          padding: '2rem 1.5rem',
          textAlign: 'center',
          color: '#475569',
          fontSize: '0.625rem',
          textTransform: 'uppercase',
          letterSpacing: '0.3em'
        }}>
          © 2026 Luxe Scent Fragrance House. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}
