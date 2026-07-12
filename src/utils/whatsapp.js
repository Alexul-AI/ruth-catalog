/**
 * WhatsApp order utilities
 *
 * Replace WHATSAPP_NUMBER with the real business number before deploying.
 * Format: country-code + number, no spaces or dashes.
 * Example: '972521234567'
 */
export const WHATSAPP_NUMBER = "97254979367";

/**
 * Build the Hebrew order message from cart + customer details.
 * @param {Array}  cart    — items from useCart
 * @param {Object} details — customer form fields
 * @returns {string}
 */
export function buildOrderMessage(cart, details) {
  const lines = [];

  lines.push("שלום, אני רוצה לבצע הזמנה:");
  lines.push("");

  lines.push("פרטי לקוח:");
  lines.push(`שם לקוח: ${details.customerName || "—"}`);
  lines.push(`שם העסק: ${details.businessName || "—"}`);
  lines.push(`טלפון: ${details.phone || "—"}`);
  lines.push(`כתובת אספקה: ${details.address || "—"}`);
  lines.push(`תאריך אספקה מבוקש: ${details.deliveryDate || "—"}`);
  lines.push("");

  lines.push("סיכום הזמנה:");
  lines.push("");

  cart.forEach((item, index) => {
    lines.push(`${index + 1}. מק״ט: ${item.sku}`);
    lines.push(`   מוצר: ${item.name}`);
    lines.push(`   קטגוריה: ${item.category}`);
    if (item.flavor) lines.push(`   טעם: ${item.flavor}`);
    if (item.size && item.size !== "—") lines.push(`   גודל: ${item.size}`);
    lines.push(`   כמות באריזה: ${item.packageQty}`);
    lines.push(`   כמות להזמנה: ${item.qty}`);
    lines.push("");
  });

  if (details.notes?.trim()) {
    lines.push(`הערות: ${details.notes.trim()}`);
    lines.push("");
  }

  lines.push("---");

  if (details.contactBeforeConfirm) {
    lines.push("נא לחזור אליי לפני אישור ההזמנה.");
  }

  lines.push("נא לחזור אליי לאישור ההזמנה.");
  lines.push("תודה.");

  return lines.join("\n");
}

/**
 * Open WhatsApp with the pre-filled order message.
 * @param {Array}  cart
 * @param {Object} details
 */
export function sendWhatsAppOrder(cart, details) {
  const message = buildOrderMessage(cart, details);
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, "_blank");
}
