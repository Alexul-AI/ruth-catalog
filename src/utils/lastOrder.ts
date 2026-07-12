import type { CartItem } from '../types'

const STORAGE_KEY = 'ruth-catalog-last-order'

/**
 * Remembers only the product lines of the most recently sent order, not
 * customer details (handled separately by useOrderDetails) or the delivery
 * date/notes (those are specific to one order and shouldn't resurface on a
 * repeat order without the customer re-entering them).
 */
export function saveLastOrder(cart: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch {
    // Repeat-order is a convenience feature; failing silently (e.g. storage
    // quota in private browsing) shouldn't block the order that was just sent.
  }
}

export function loadLastOrder(): CartItem[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : null
  } catch {
    return null
  }
}
