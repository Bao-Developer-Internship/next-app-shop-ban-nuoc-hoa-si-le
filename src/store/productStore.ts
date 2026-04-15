/**
 * Product Store — single source of truth cho sản phẩm
 * Dùng localStorage để sync giữa admin và frontend
 */

export interface StoreProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  wholesalePrice: number;
  discount?: number;
  volume: string;
  image: string;
  season: string;
  gender: string;
  stock: number | 'Hết hàng';
  status: 'active' | 'hidden';
  badge?: string;
}

const STORAGE_KEY = 'luxescent_products';

// Dữ liệu mặc định
export const DEFAULT_PRODUCTS: StoreProduct[] = [
  { id: 1, name: 'Velvet Rose Intense', brand: 'LUXE SCENT', price: 3500000, wholesalePrice: 2975000, discount: 15, volume: '50ml', image: '/images/San-Pham/SP1.jpg', season: 'spring', gender: 'Nữ', stock: 45, status: 'active', badge: 'Bán Chạy' },
  { id: 2, name: 'Oud Mystique', brand: 'LUXE SCENT', price: 4200000, wholesalePrice: 3360000, discount: 20, volume: '75ml', image: '/images/San-Pham/SP2.jpg', season: 'winter', gender: 'Nam', stock: 28, status: 'active', badge: 'Mới' },
  { id: 3, name: 'Citrus Garden', brand: 'LUXE SCENT', price: 2800000, wholesalePrice: 2380000, volume: '50ml', image: '/images/San-Pham/SP3.jpg', season: 'summer', gender: 'Unisex', stock: 62, status: 'active' },
  { id: 4, name: 'Amber Noir', brand: 'LUXE SCENT', price: 3900000, wholesalePrice: 3315000, discount: 10, volume: '100ml', image: '/images/San-Pham/SP4.jpg', season: 'autumn', gender: 'Unisex', stock: 33, status: 'active' },
  { id: 5, name: 'White Jasmine', brand: 'LUXE SCENT', price: 3200000, wholesalePrice: 2720000, volume: '50ml', image: '/images/San-Pham/Sp5.jpg', season: 'spring', gender: 'Nữ', stock: 51, status: 'active' },
  { id: 6, name: 'Sandalwood Dream', brand: 'LUXE SCENT', price: 3600000, wholesalePrice: 2700000, discount: 25, volume: '75ml', image: '/images/San-Pham/SP6.jpg', season: 'autumn', gender: 'Nam', stock: 19, status: 'active', badge: 'Sale' },
  { id: 7, name: 'Bergamot Bliss', brand: 'LUXE SCENT', price: 2900000, wholesalePrice: 2465000, volume: '50ml', image: '/images/San-Pham/SP7.jpg', season: 'summer', gender: 'Unisex', stock: 74, status: 'active' },
  { id: 8, name: 'Midnight Orchid', brand: 'LUXE SCENT', price: 4500000, wholesalePrice: 3825000, discount: 15, volume: '100ml', image: '/images/San-Pham/SP8.jpg', season: 'winter', gender: 'Nữ', stock: 22, status: 'active', badge: 'Limited' },
  { id: 9, name: 'Baccarat Rouge 540', brand: 'Maison Francis', price: 8500000, wholesalePrice: 7225000, volume: '70ml', image: '/images/San-Pham/SP9.jpg', season: 'all', gender: 'Unisex', stock: 15, status: 'active', badge: 'Bán Chạy' },
  { id: 10, name: 'Santal 33', brand: 'Le Labo', price: 6800000, wholesalePrice: 5780000, volume: '50ml', image: '/images/San-Pham/SP10.jpg', season: 'all', gender: 'Unisex', stock: 8, status: 'active', badge: 'Mới' },
  { id: 11, name: 'Sauvage Elixir', brand: 'Dior', price: 4800000, wholesalePrice: 4080000, discount: 12, volume: '60ml', image: '/images/San-Pham/SP11.jpg', season: 'all', gender: 'Nam', stock: 37, status: 'active' },
  { id: 12, name: 'Black Opium', brand: 'YSL', price: 3200000, wholesalePrice: 2560000, discount: 20, volume: '50ml', image: '/images/San-Pham/SP12.jpg', season: 'winter', gender: 'Nữ', stock: 44, status: 'active' },
];

export function getProducts(): StoreProduct[] {
  if (typeof window === 'undefined') return DEFAULT_PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PRODUCTS;
    return JSON.parse(raw) as StoreProduct[];
  } catch {
    return DEFAULT_PRODUCTS;
  }
}

export function saveProducts(products: StoreProduct[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  // Dispatch event để các tab/component khác biết có thay đổi
  window.dispatchEvent(new Event('products-updated'));
}

export function addProduct(product: Omit<StoreProduct, 'id'>): StoreProduct {
  const products = getProducts();
  const newProduct: StoreProduct = { ...product, id: Date.now() };
  saveProducts([newProduct, ...products]);
  return newProduct;
}

export function updateProduct(updated: StoreProduct): void {
  const products = getProducts();
  saveProducts(products.map(p => p.id === updated.id ? updated : p));
}

export function deleteProduct(id: number): void {
  const products = getProducts();
  saveProducts(products.filter(p => p.id !== id));
}
