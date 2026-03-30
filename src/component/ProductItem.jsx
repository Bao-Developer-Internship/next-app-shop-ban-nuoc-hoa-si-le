"use client"
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function ProductItem({ name, price, onAdd, image, brand, discount, volume, badge, id }) {
    const { addToWishlist, isInWishlist } = useCart();
    const router = useRouter();
    const finalPrice = discount ? Math.round(price * (1 - discount / 100)) : price;
    const inWishlist = isInWishlist(id);

    const handleWishlistClick = (e) => {
        e.stopPropagation();
        addToWishlist({ id, name, price, image, brand, volume, discount, badge });
    };

    const handleAddClick = (e) => {
        e.stopPropagation();
        onAdd && onAdd();
    };

    return (
        <div
            className="card h-100 hover-scale"
            onClick={() => router.push(`/product/${id}`)}
            style={{ border: 'none', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', background: 'white', position: 'relative', cursor: 'pointer' }}
        >
            <div className="position-relative" style={{ overflow: 'hidden' }}>
                <img
                    src={image || "/images/San-Pham/SP1.jpg"}
                    className="card-img-top"
                    alt={name}
                    style={{ height: '350px', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Quick Add */}
                <div className="position-absolute bottom-0 start-0 end-0 p-3"
                    style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = 1; e.currentTarget.style.transform = 'translateY(0)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = 0; e.currentTarget.style.transform = 'translateY(20px)'; }}
                >
                    <button onClick={handleAddClick}
                        style={{ width: '100%', background: 'var(--emerald-green)', color: 'white', border: 'none', padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 5px 15px rgba(10,61,42,0.3)' }}>
                        🛒 THÊM VÀO GIỎ
                    </button>
                </div>

                {badge && (
                    <span className="position-absolute top-0 start-0 m-3"
                        style={{ background: badge === 'Mới' ? 'var(--soft-gold)' : 'white', color: badge === 'Mới' ? 'white' : 'var(--emerald-green)', padding: '6px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        {badge}
                    </span>
                )}

                {discount && (
                    <span className="position-absolute top-0 end-0 m-3"
                        style={{ background: 'var(--rose-gold)', color: 'white', padding: '8px 15px', borderRadius: '25px', fontSize: '12px', fontWeight: '600' }}>
                        -{discount}%
                    </span>
                )}

                <button onClick={handleWishlistClick} className="position-absolute"
                    style={{ top: discount ? '50px' : '10px', right: '10px', background: inWishlist ? 'var(--rose-gold)' : 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', fontSize: '18px', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', transition: 'all 0.3s ease' }}>
                    {inWishlist ? '❤️' : '🤍'}
                </button>
            </div>

            <div className="card-body d-flex flex-column" style={{ padding: '20px' }}>
                <small style={{ color: 'var(--soft-gold)', fontSize: '11px', letterSpacing: '1.5px', fontWeight: '600', textTransform: 'uppercase' }}>
                    {brand || "LUXE SCENT"}
                </small>
                <h6 className="card-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', color: 'var(--emerald-green)', margin: '8px 0', minHeight: '50px' }}>
                    {name}
                </h6>
                <small style={{ color: '#888', marginBottom: '10px' }}>{volume || "50ml"} • EDP</small>
                <div className="mt-auto">
                    {discount ? (
                        <div className="mb-2">
                            <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '14px', marginRight: '8px' }}>{price.toLocaleString()}đ</span>
                            <span style={{ color: 'var(--rose-gold)', fontWeight: '700', fontSize: '20px' }}>{finalPrice.toLocaleString()}đ</span>
                        </div>
                    ) : (
                        <p style={{ color: 'var(--emerald-green)', fontWeight: '700', fontSize: '20px', marginBottom: '10px' }}>{price.toLocaleString()}đ</p>
                    )}
                </div>
            </div>
        </div>
    );
}
