/**
 * GET /api/products — Lấy danh sách sản phẩm
 * Query params: ?search=&season=&page=&limit=
 */
import { NextRequest, NextResponse } from 'next/server';

// Mock product data — thay bằng MongoDB query sau
export const PRODUCTS_DB = [
  { id: 1, name: 'Velvet Rose Intense', brand: 'LUXE SCENT', price: 3500000, wholesalePrice: 2975000, discount: 15, volume: '50ml', image: '/images/San-Pham/SP1.jpg', season: 'spring', gender: 'Nữ', stock: 45, status: 'active', badge: 'Bán Chạy' },
  { id: 2, name: 'Oud Mystique', brand: 'LUXE SCENT', price: 4200000, wholesalePrice: 3360000, discount: 20, volume: '75ml', image: '/images/San-Pham/SP2.jpg', season: 'winter', gender: 'Nam', stock: 28, status: 'active', badge: 'Mới' },
  { id: 3, name: 'Citrus Garden', brand: 'LUXE SCENT', price: 2800000, wholesalePrice: 2380000, volume: '50ml', image: '/images/San-Pham/SP3.jpg', season: 'summer', gender: 'Unisex', stock: 62, status: 'active' },
  { id: 4, name: 'Amber Noir', brand: 'LUXE SCENT', price: 3900000, wholesalePrice: 3315000, discount: 10, volume: '100ml', image: '/images/San-Pham/SP4.jpg', season: 'autumn', gender: 'Unisex', stock: 33, status: 'active' },
  { id: 5, name: 'White Jasmine', brand: 'LUXE SCENT', price: 3200000, wholesalePrice: 2720000, volume: '50ml', image: '/images/San-Pham/Sp5.jpg', season: 'spring', gender: 'Nữ', stock: 51, status: 'active' },
  { id: 6, name: 'Sandalwood Dream', brand: 'LUXE SCENT', price: 3600000, wholesalePrice: 2700000, discount: 25, volume: '75ml', image: '/images/San-Pham/SP6.jpg', season: 'autumn', gender: 'Nam', stock: 19, status: 'active', badge: 'Sale' },
  { id: 7, name: 'Bergamot Bliss', brand: 'LUXE SCENT', price: 2900000, wholesalePrice: 2465000, volume: '50ml', image: '/images/San-Pham/SP7.jpg', season: 'summer', gender: 'Unisex', stock: 74, status: 'active' },
  { id: 8, name: 'Midnight Orchid', brand: 'LUXE SCENT', price: 4500000, wholesalePrice: 3825000, discount: 15, volume: '100ml', image: '/images/San-Pham/SP8.jpg', season: 'winter', gender: 'Nữ', stock: 22, status: 'active', badge: 'Limited' },
  { id: 9, name: 'Baccarat Rouge 540', brand: 'Maison Francis', price: 8500000, wholesalePrice: 7225000, discount: 0, volume: '70ml', image: '/images/San-Pham/SP9.jpg', season: 'all', gender: 'Unisex', stock: 15, status: 'active', badge: 'Bán Chạy' },
  { id: 10, name: 'Santal 33', brand: 'Le Labo', price: 6800000, wholesalePrice: 5780000, volume: '50ml', image: '/images/San-Pham/SP10.jpg', season: 'all', gender: 'Unisex', stock: 8, status: 'active', badge: 'Mới' },
  { id: 11, name: 'Sauvage Elixir', brand: 'Dior', price: 4800000, wholesalePrice: 4080000, discount: 12, volume: '60ml', image: '/images/San-Pham/SP11.jpg', season: 'all', gender: 'Nam', stock: 37, status: 'active' },
  { id: 12, name: 'Black Opium', brand: 'YSL', price: 3200000, wholesalePrice: 2560000, discount: 20, volume: '50ml', image: '/images/San-Pham/SP12.jpg', season: 'winter', gender: 'Nữ', stock: 44, status: 'active' },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const season = searchParams.get('season') || '';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const featured = searchParams.get('featured') === 'true';

  let results = [...PRODUCTS_DB];

  if (search) {
    results = results.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.brand.toLowerCase().includes(search)
    );
  }

  if (season) {
    results = results.filter(p => p.season === season || p.season === 'all');
  }

  if (featured) {
    results = results.slice(0, 8);
  }

  const total = results.length;
  const paginated = results.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    products: paginated,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
