"use client"
import { useState, useEffect, useCallback } from 'react';
import { getProducts, StoreProduct } from '@/store/productStore';

export function useProducts(options?: { featured?: boolean; limit?: number }) {
  const [products, setProducts] = useState<StoreProduct[]>([]);

  const load = useCallback(() => {
    let data = getProducts().filter(p => p.status === 'active');
    if (options?.featured) data = data.slice(0, options.limit ?? 8);
    else if (options?.limit) data = data.slice(0, options.limit);
    setProducts(data);
  }, [options?.featured, options?.limit]);

  useEffect(() => {
    load();
    window.addEventListener('products-updated', load);
    return () => window.removeEventListener('products-updated', load);
  }, [load]);

  return products;
}
