import type { CartItem, OrderDetails } from '../types'

/**
 * Business WhatsApp number, country code + number, no spaces or dashes.
 */
export const WHATSAPP_NUMBER = '972549793967'

function pluralProducts(count: number): string {
  return count === 1 ? 'מוצר' : 'מוצרים'
}

function pluralPackages(count: number): string {
  return count === 1 ? 'אריזה' : 'אריזות'
}

/**
 * Build the Hebrew order message from cart + customer details. This is the
 * only thing Shai actually receives right now - no link, no attached page:
 * the message has to stand on its own (see CLAUDE-adjacent discussion:
 * a URL-embedded order page was tried and deliberately shelved because it
 * had nowhere safe to live without a backend - see the wip/order-view-design
 * branch if that direction gets picked back up later).
 */
export function buildOrderMessage(cart: CartItem[], details: OrderDetails): string {
  const lines: string[] = []

  lines.push('*בקשת הזמנה חדשה - טרם אושרה*')
  lines.push('')

  lines.push('*פרטי לקוח*')
  lines.push(`שם: ${details.customerName || '—'}`)
  if (details.businessName.trim()) {
    lines.push(`עסק: ${details.businessName.trim()}`)
  }
  lines.push('')

  lines.push('*פרטי ההזמנה*')
  lines.push('')

  cart.forEach((item, index) => {
    const totalUnits = item.qty * item.unitsPerPackage
    lines.push(`${index + 1}. *${item.name}*`)
    lines.push(`   מק״ט: ${item.sku}`)
    lines.push(`   טעם: ${item.flavor}`)
    lines.push(`   כמות: ${item.qty} ${pluralPackages(item.qty)} × ${item.unitsPerPackage} יח׳ = ${totalUnits} יח׳`)
    if (item.isSpecialOrder) {
      lines.push('   *הזמנה מיוחדת*')
    }
    lines.push('')
  })

  const totalPackages = cart.reduce((sum, i) => sum + i.qty, 0)
  lines.push(`*סה״כ: ${cart.length} ${pluralProducts(cart.length)} · ${totalPackages} ${pluralPackages(totalPackages)}*`)

  if (details.notes.trim()) {
    lines.push('')
    lines.push('*הערות:*')
    lines.push(details.notes.trim())
  }

  lines.push('')
  lines.push('*שימו לב: הבקשה כפופה לבדיקת מלאי ואישור סופי מול שי.*')
  lines.push('')
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
