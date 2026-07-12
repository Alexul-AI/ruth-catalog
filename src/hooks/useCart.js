import { useState } from 'react'

/**
 * useCart — manages cart state and operations
 * Returns cart items and all mutation functions.
 */
export function useCart() {
  const [cart, setCart] = useState([])

  /** Add product to cart (or increment qty if already present) */
  function addItem(product, qty = 1) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i)
      }
      return [...prev, { ...product, qty }]
    })
  }

  /** Remove product from cart entirely */
  function removeItem(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  /** Update quantity of an existing cart item (0 = remove) */
  function updateQty(id, qty) {
    if (qty <= 0) {
      removeItem(id)
      return
    }
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  /** Clear the entire cart */
  function clearCart() {
    setCart([])
  }

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0)
  const totalLines = cart.length

  return { cart, addItem, removeItem, updateQty, clearCart, totalItems, totalLines }
}
