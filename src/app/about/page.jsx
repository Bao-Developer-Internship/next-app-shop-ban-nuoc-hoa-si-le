"use client"
import LuxuryHeader from "@/component/LuxuryHeader";
import LuxuryFooter from "@/component/LuxuryFooter";

export default function AboutPage() {
  return (
    <>
      <LuxuryHeader />
      
      <main>
        {/* Hero Section */}
        <section style={{
          position: 'relative',
          height: '80vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              zIndex: 10
            }}></div>
            <img 
              alt="Atelier"
              src="https://fimgs.net/mdimg/perfume/375x500.73669.jpg"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <div style={{
            position: 'relative',
            zIndex: 20,
            textAlign: 'center',
            padding: '0 24px',
            maxWidth: '1024px'
          }}>
            <span style={{
              color: 'var(--soft-gold)',
              fontWeight: '500',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontSize: '14px',
              marginBottom: '16px',
              display: 'block'
            }}>
              Hành Trình Di Sản
            </span>
            <h1 style={{
              color: 'white',
              fontSize: 'clamp(48px, 7vw, 72px)',
              fontWeight: '700',
              marginBottom: '24px',
              lineHeight: '1.2',
              fontFamily: 'var(--font-heading)'
            }}>
              Câu Chuyện LUXE SCENT
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 'clamp(16px, 2vw, 20px)',
              maxWidth: '800px',
              margin: '0 auto 40px',
              fontWeight: '300',
              lineHeight: '1.7'
            }}>
              Nghệ thuật chế tác nước hoa Pháp thượng lưu, nơi mỗi giọt tinh dầu là một bản giao hưởng của cảm xúc và ký ức.
            </p>
            <div style={{
              marginTop: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <button className="luxury-btn" style={{
                background: 'var(--emerald-green)',
                color: 'white',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                Khám phá ngay
                <span style={{fontSize: '20px'}}>↓</span>
              </button>
              <button className="luxury-btn-outline" style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.3)'
              }}>
                Xem phim tư liệu
              </button>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section style={{padding: '100px 24px'}}>
          <div className="container" style={{maxWidth: '1280px'}}>
            <div style={{textAlign: 'center', marginBottom: '64px'}}>
              <div style={{
                height: '4px',
                width: '80px',
                background: 'var(--soft-gold)',
                margin: '0 auto 24px'
              }}></div>
              <h2 style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: '700',
                color: 'var(--emerald-green)',
                fontFamily: 'var(--font-heading)'
              }}>
                Dòng Thời Gian Di Sản
              </h2>
            </div>

            <div style={{position: 'relative'}}>
              {/* Timeline Line */}
              <div className="d-none d-md-block" style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                height: '100%',
                width: '1px',
                background: 'rgba(197, 160, 89, 0.3)'
              }}></div>

              <div style={{display: 'flex', flexDirection: 'column', gap: '64px'}}>
                {/* Event 1 - 1992 */}
                <div className="row align-items-center">
                  <div className="col-md-5 text-md-end pe-md-5">
                    <span style={{
                      color: 'var(--soft-gold)',
                      fontWeight: '700',
                      fontSize: '28px',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      1992
                    </span>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: 'var(--emerald-green)',
                      marginBottom: '8px'
                    }}>
                      Khởi nguồn tại Grasse
                    </h3>
                    <p style={{color: '#666'}}>
                      Tại thánh địa nước hoa của thế giới, LUXE SCENT bắt đầu với xưởng chế tác nhỏ giữa những cánh đồng oải hương bất tận.
                    </p>
                  </div>
                  <div className="col-md-2 d-flex justify-content-center">
                    <div style={{
                      position: 'relative',
                      zIndex: 10,
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--emerald-green)',
                      border: '4px solid var(--cream-white)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      <span style={{color: 'white', fontSize: '20px'}}>🌿</span>
                    </div>
                  </div>
                  <div className="col-md-5 ps-md-5 d-none d-md-block">
                    <img 
                      alt="Grasse"
                      src="https://fimgs.net/mdimg/perfume/375x500.1406.jpg"
                      style={{
                        borderRadius: '12px',
                        width: '256px',
                        height: '160px',
                        objectFit: 'cover',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }}
                    />
                  </div>
                </div>

                {/* Event 2 - 2005 */}
                <div className="row align-items-center">
                  <div className="col-md-5 text-md-end pe-md-5 d-none d-md-flex justify-content-end">
                    <img 
                      alt="Heritage Collection"
                      src="https://fimgs.net/mdimg/perfume/375x500.14365.jpg"
                      style={{
                        borderRadius: '12px',
                        width: '256px',
                        height: '160px',
                        objectFit: 'cover',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }}
                    />
                  </div>
                  <div className="col-md-2 d-flex justify-content-center">
                    <div style={{
                      position: 'relative',
                      zIndex: 10,
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--emerald-green)',
                      border: '4px solid var(--cream-white)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      <span style={{color: 'white', fontSize: '20px'}}>💎</span>
                    </div>
                  </div>
                  <div className="col-md-5 ps-md-5">
                    <span style={{
                      color: 'var(--soft-gold)',
                      fontWeight: '700',
                      fontSize: '28px',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      2005
                    </span>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: 'var(--emerald-green)',
                      marginBottom: '8px'
                    }}>
                      Bộ Sưu Tập Di Sản
                    </h3>
                    <p style={{color: '#666'}}>
                      Ra mắt dòng nước hoa 'L'Odeur d'Or', đánh dấu bước ngoặt trong nghệ thuật kết hợp nguyên liệu quý hiếm và kỹ thuật hiện đại.
                    </p>
                  </div>
                </div>

                {/* Event 3 - 2020 */}
                <div className="row align-items-center">
                  <div className="col-md-5 text-md-end pe-md-5">
                    <span style={{
                      color: 'var(--soft-gold)',
                      fontWeight: '700',
                      fontSize: '28px',
                      marginBottom: '8px',
                      display: 'block'
                    }}>
                      2020
                    </span>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: 'var(--emerald-green)',
                      marginBottom: '8px'
                    }}>
                      Vươn Tầm Thế Giới
                    </h3>
                    <p style={{color: '#666'}}>
                      Mở rộng hệ thống showroom sang trọng tại các kinh đô thời trang: Paris, New York, Tokyo và Việt Nam.
                    </p>
                  </div>
                  <div className="col-md-2 d-flex justify-content-center">
                    <div style={{
                      position: 'relative',
                      zIndex: 10,
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'var(--emerald-green)',
                      border: '4px solid var(--cream-white)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      <span style={{color: 'white', fontSize: '20px'}}>🌍</span>
                    </div>
                  </div>
                  <div className="col-md-5 ps-md-5 d-none d-md-block">
                    <img 
                      alt="Global Expansion"
                      src="https://fimgs.net/mdimg/perfume/375x500.41675.jpg"
                      style={{
                        borderRadius: '12px',
                        width: '256px',
                        height: '160px',
                        objectFit: 'cover',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section style={{
          background: 'rgba(10, 61, 42, 0.05)',
          padding: '100px 24px'
        }}>
          <div className="container" style={{maxWidth: '1280px'}}>
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div style={{position: 'relative'}}>
                  <img 
                    alt="Perfumer"
                    src="https://fimgs.net/mdimg/perfume/375x500.7955.jpg"
                    style={{
                      borderRadius: '20px',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                      zIndex: 20,
                      position: 'relative',
                      width: '100%'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '-24px',
                    left: '-24px',
                    width: '128px',
                    height: '128px',
                    background: 'rgba(197, 160, 89, 0.2)',
                    borderRadius: '50%',
                    zIndex: -10
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-24px',
                    right: '-24px',
                    width: '192px',
                    height: '192px',
                    border: '2px solid rgba(197, 160, 89, 0.3)',
                    borderRadius: '50%',
                    zIndex: -10
                  }}></div>
                </div>
              </div>
              <div className="col-lg-6">
                <h2 style={{
                  color: 'var(--soft-gold)',
                  fontWeight: '500',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  fontSize: '14px',
                  marginBottom: '16px'
                }}>
                  Triết Lý Sáng Tạo
                </h2>
                <h3 style={{
                  fontSize: 'clamp(28px, 5vw, 42px)',
                  fontWeight: '700',
                  color: 'var(--emerald-green)',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  Bàn Tay Phù Thủy & Tâm Hồn Nghệ Sĩ
                </h3>
                <p style={{
                  color: '#666',
                  lineHeight: '1.8',
                  fontSize: '18px',
                  marginBottom: '20px'
                }}>
                  Mỗi chai nước hoa tại LUXE SCENT được hoàn thiện dưới sự giám sát khắt khe của các bậc thầy chế tác người Pháp. Chúng tôi không chỉ tạo ra mùi hương, chúng tôi kể những câu chuyện bằng khứu giác.
                </p>
                <p style={{
                  color: '#666',
                  lineHeight: '1.8',
                  fontSize: '18px',
                  marginBottom: '32px'
                }}>
                  Triết lý của chúng tôi dựa trên sự thuần khiết: 100% nguyên liệu tự nhiên được tuyển chọn thủ công, bảo tồn sự tinh túy từ thiên nhiên vào trong từng giọt nước hoa.
                </p>
                <div className="row g-4">
                  <div className="col-6">
                    <span style={{
                      display: 'block',
                      fontSize: '36px',
                      fontWeight: '700',
                      color: 'var(--emerald-green)'
                    }}>
                      100+
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Nguyên liệu quý
                    </span>
                  </div>
                  <div className="col-6">
                    <span style={{
                      display: 'block',
                      fontSize: '36px',
                      fontWeight: '700',
                      color: 'var(--emerald-green)'
                    }}>
                      30+
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: '#888',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Năm kinh nghiệm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section style={{padding: '100px 24px'}}>
          <div className="container" style={{maxWidth: '1280px'}}>
            <div style={{textAlign: 'center', marginBottom: '64px'}}>
              <h2 style={{
                fontSize: 'clamp(32px, 5vw, 42px)',
                fontWeight: '700',
                color: 'var(--emerald-green)',
                marginBottom: '16px',
                fontFamily: 'var(--font-heading)'
              }}>
                Giá Trị Cốt Lõi
              </h2>
              <p style={{color: '#888', maxWidth: '600px', margin: '0 auto'}}>
                Những giá trị định hình nên thương hiệu và cam kết của chúng tôi đối với khách hàng.
              </p>
            </div>
            <div className="row g-4">
              {[
                {icon: '🌱', title: 'Sự Bền Vững', desc: 'Cam kết bảo vệ môi trường thông qua bao bì tái chế và quy trình chiết xuất không hóa chất.'},
                {icon: '📜', title: 'Di Sản', desc: 'Gìn giữ và phát huy các công thức cổ truyền từ thế kỷ 18 kết hợp cùng tư duy đương đại.'},
                {icon: '✓', title: 'Chất Lượng', desc: 'Mọi sản phẩm đều trải qua 50 bước kiểm định nghiêm ngặt trước khi đến tay giới mộ điệu.'}
              ].map((value, index) => (
                <div key={index} className="col-md-4">
                  <div className="hover-scale" style={{
                    padding: '40px',
                    background: 'white',
                    border: '1px solid rgba(10, 61, 42, 0.1)',
                    borderRadius: '20px',
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--soft-gold)';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(10, 61, 42, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      background: 'rgba(10, 61, 42, 0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      fontSize: '32px'
                    }}>
                      {value.icon}
                    </div>
                    <h4 style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      marginBottom: '12px'
                    }}>
                      {value.title}
                    </h4>
                    <p style={{color: '#888', fontSize: '14px', lineHeight: '1.6'}}>
                      {value.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section style={{
          padding: '100px 24px',
          background: 'var(--emerald-green)',
          color: 'white'
        }}>
          <div className="container" style={{maxWidth: '1280px'}}>
            <div className="row justify-content-between align-items-end mb-5 g-4">
              <div className="col-lg-8">
                <h2 style={{
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  fontWeight: '700',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-heading)'
                }}>
                  Đội Ngũ Nghệ Nhân
                </h2>
                <p style={{color: 'rgba(255,255,255,0.7)', maxWidth: '600px'}}>
                  Những con người tài hoa đứng sau ánh hào quang của LUXE SCENT.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end">
                <button className="luxury-btn-outline" style={{
                  border: '2px solid var(--soft-gold)',
                  color: 'var(--soft-gold)',
                  background: 'transparent'
                }}>
                  Gia nhập đội ngũ
                </button>
              </div>
            </div>
            <div className="row g-4">
              {[
                {name: 'Jean-Louis Martin', role: 'Giám đốc Sáng tạo', img: '/images/Nhan-Vien/Gemini_Generated_Image_qlenh1qlenh1qlen.png'},
                {name: 'Sophie Claire', role: 'Bậc thầy Mùi hương (Nose)', img: '/images/Nhan-Vien/z7647997649633_ee16332a1e447cc33f48323741d068ff.jpg'},
                {name: 'Lê Minh', role: 'Giám đốc Vận hành', img: '/images/Nhan-Vien/z7647997932664_3f9aab56a97e448f6611556bf7b98b41.jpg'},
                {name: 'Elena Rodriguez', role: 'Thiết kế Trải nghiệm', img: '/images/Nhan-Vien/z7647997937857_8282068c92924605d55382d15698e9ca.jpg'}
              ].map((member, index) => (
                <div key={index} className="col-sm-6 col-lg-3">
                  <div className="hover-scale">
                    <div style={{
                      aspectRatio: '3/4',
                      overflow: 'hidden',
                      borderRadius: '12px',
                      marginBottom: '16px'
                    }}>
                      <img 
                        alt={member.name}
                        src={member.img}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'grayscale(100%)',
                          transition: 'all 0.5s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.filter = 'grayscale(0%)'}
                        onMouseLeave={(e) => e.currentTarget.style.filter = 'grayscale(100%)'}
                      />
                    </div>
                    <h5 style={{fontSize: '20px', fontWeight: '700', marginBottom: '4px'}}>
                      {member.name}
                    </h5>
                    <p style={{color: 'var(--soft-gold)', fontSize: '14px'}}>
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '100px 24px',
          background: 'var(--cream-white)',
          borderTop: '1px solid rgba(10, 61, 42, 0.1)',
          borderBottom: '1px solid rgba(10, 61, 42, 0.1)'
        }}>
          <div className="container" style={{maxWidth: '1024px', textAlign: 'center'}}>
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontWeight: '700',
              color: 'var(--emerald-green)',
              marginBottom: '32px',
              lineHeight: '1.3',
              fontStyle: 'italic',
              fontFamily: 'var(--font-heading)'
            }}>
              "Nước hoa là hình thức mãnh liệt nhất của ký ức."
            </h2>
            <div style={{
              height: '2px',
              width: '96px',
              background: 'var(--soft-gold)',
              margin: '0 auto 40px'
            }}></div>
            <button className="luxury-btn" style={{
              padding: '20px 40px',
              fontSize: '14px',
              letterSpacing: '2px'
            }}>
              GHÉ THĂM CỬA HÀNG
            </button>
          </div>
        </section>
      </main>

      <LuxuryFooter />
    </>
  );
}
