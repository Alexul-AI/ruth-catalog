import { useEffect, useState } from 'react'
import type { CartItem, Product } from '../types'

const STORAGE_KEY = 'ruth-catalog-cart'

function loadInitialCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

/**
 * useCart — manages cart state and operations.
 * Persists to localStorage so an accidental refresh/close doesn't lose the order.
 */
export function useCart() {
  const [cart, setCart] = useState<CartItem[]>(loadInitialCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  /** Add product to cart (or increment qty if already present) */
  function addItem(product: Product, qty = 1) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { ...product, qty }]
    })
  }

  /** Remove product from cart entirely */
  function removeItem(id: string) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  /** Update quantity of an existing cart item (0 = remove) */
  function updateQty(id: string, qty: number) {
    if (qty <= 0) {
      removeItem(id)
      return
    }
    setCart(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)))
  }

  /** Clear the entire cart */
  function clearCart() {
    setCart([])
  }

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0)
  const totalLines = cart.length

  return { cart, addItem, removeItem, updateQty, clearCart, totalItems, totalLines }
}
