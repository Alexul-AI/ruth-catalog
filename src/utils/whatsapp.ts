import type { CartItem, OrderDetails } from '../types'

/**
 * Business WhatsApp number, country code + number, no spaces or dashes.
 */
export const WHATSAPP_NUMBER = '972549793967'

/** Build the Hebrew order message from cart + customer details. */
export function buildOrderMessage(cart: CartItem[], details: OrderDetails): string {
  const lines: string[] = []

  lines.push('שלום, אני רוצה לבצע הזמנה:')
  lines.push('')

  lines.push('פרטי לקוח:')
  lines.push(`שם לקוח: ${details.customerName || '—'}`)
  lines.push(`שם העסק: ${details.businessName || '—'}`)
  lines.push('')

  lines.push('סיכום הזמנה:')
  lines.push('')

  cart.forEach((item, index) => {
    lines.push(`${index + 1}. מוצר: ${item.name}`)
    lines.push(`   מק״ט: ${item.sku}`)
    lines.push(`   כמות: ${item.qty}`)
    lines.push('')
  })

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0)
  lines.push(`סה"כ: ${totalItems} פריטים ב-${cart.length} שורות`)
  lines.push('')

  if (details.notes.trim()) {
    lines.push(`הערות: ${details.notes.trim()}`)
    lines.push('')
  }

  lines.push('---')
  lines.push('נא לחזור אליי לאישור ההזמנה.')
  lines.push('תודה.')

  return lines.join('\n')
}

/** Build the wa.me deep link for the given cart + customer details. */
export function buildWhatsAppUrl(cart: CartItem[], details: OrderDetails): string {
  const message = buildOrderMessage(cart, details)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Open WhatsApp with the pre-filled order message.
 * Returns false if the popup was blocked, so the caller can show a fallback link.
 */
export function sendWhatsAppOrder(cart: CartItem[], details: OrderDetails): boolean {
  const url = buildWhatsAppUrl(cart, details)
  const win = window.open(url, '_blank')
  return win != null
}
