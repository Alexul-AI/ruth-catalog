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

  /**
   * Adjust a product's cart quantity by +1/-1 (adds it if absent, removes
   * it once the result is <= 0) - the operation the catalog's +/- steppers
   * need now that they write straight to the cart with no separate "add"
   * commit step. Computes the new quantity from the live `prev` inside the
   * setCart updater, not from a qty value the caller read earlier - a few
   * taps in quick succession each still see the real current quantity even
   * if they land in the same React batch, instead of every tap computing
   * "+1" off the same stale number and only the last one winning.
   */
  function adjustItemQty(product: Product, delta: number) {
    setCart(prev => {
      const currentQty = prev.find(i => i.id === product.id)?.qty ?? 0
      const nextQty = currentQty + delta
      if (nextQty <= 0) {
        return prev.filter(i => i.id !== product.id)
      }
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => (i.id === product.id ? { ...i, qty: nextQty } : i))
      }
      return [...prev, { ...product, qty: nextQty }]
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

  /** Replace the whole cart at once (used by "repeat last order") */
  function restoreCart(items: CartItem[]) {
    setCart(items)
  }

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0)
  const totalLines = cart.length

  return { cart, adjustItemQty, removeItem, updateQty, clearCart, restoreCart, totalItems, totalLines }
}
