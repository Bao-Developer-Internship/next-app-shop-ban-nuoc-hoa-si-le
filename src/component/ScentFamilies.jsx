import Link from 'next/link';

export default function ScentFamilies() {
    const families = [
        { id: 'floral',   icon: '🌸', name: 'Hương Hoa',         description: 'Floral',   color: '#FFB6C1', count: 5 },
        { id: 'woody',    icon: '🌲', name: 'Hương Gỗ',           description: 'Woody',    color: '#c8956c', count: 5 },
        { id: 'citrus',   icon: '🍊', name: 'Hương Cam Chanh',   description: 'Citrus',   color: '#FFA500', count: 4 },
        { id: 'oriental', icon: '✨', name: 'Hương Phương Đông', description: 'Oriental', color: '#9370DB', count: 3 },
    ];

    return (
        <section style={{padding: '80px 0', background: 'white'}}>
            <div className="container">
                <div className="text-center mb-5">
                    <p style={{ color: 'var(--soft-gold)', fontSize: '14px', letterSpacing: '3px', fontWeight: '500', marginBottom: '10px' }}>
                        KHÁM PHÁ
                    </p>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--emerald-green)', marginBottom: '15px' }}>
                        Gia Đình Hương Thơm
                    </h2>
                    <div className="gold-divider"></div>
                </div>

                <div className="row g-4">
                    {families.map((family) => (
                        <div key={family.id} className="col-6 col-md-3">
                            <Link href={`/scent/${family.id}`} style={{ textDecoration: 'none' }}>
                                <div className="text-center p-4 hover-scale"
                                    style={{ background: 'var(--cream-white)', borderRadius: '15px', cursor: 'pointer', transition: 'all 0.3s ease', border: '2px solid transparent' }}
                                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = family.color; e.currentTarget.style.boxShadow = `0 10px 30px ${family.color}30`; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}>
                                    <div style={{ fontSize: '60px', marginBottom: '15px' }}>{family.icon}</div>
                                    <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--emerald-green)', marginBottom: '5px', fontSize: '20px' }}>
                                        {family.name}
                                    </h5>
                                    <p style={{ fontSize: '13px', color: '#888', fontStyle: 'italic', marginBottom: '8px' }}>{family.description}</p>
                                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--emerald-green)', background: `${family.color}25`, padding: '3px 10px', borderRadius: '999px' }}>
                                        {family.count} sản phẩm
                                    </span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
