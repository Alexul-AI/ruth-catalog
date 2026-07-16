import { useState } from 'react'
import { buildWhatsAppUrl, sendWhatsAppOrder } from '../utils/whatsapp'
import { loadLastOrder, saveLastOrder } from '../utils/lastOrder'
import { useOrderDetails } from '../hooks/useOrderDetails'
import type { CartItem } from '../types'
import styles from './CartPanel.module.css'

type Step = 'list' | 'form' | 'sent'

interface CartPanelProps {
  cart: CartItem[]
  onClose: () => void
  onUpdateQty: (id: string, qty: number) => void
  onRemove: (id: string) => void
  onRestoreLastOrder: (items: CartItem[]) => void
  onOrderSent: () => void
}

export default function CartPanel({ cart, onClose, onUpdateQty, onRemove, onRestoreLastOrder, onOrderSent }: CartPanelProps) {
  const [step, setStep] = useState<Step>('list')
  const { details, set } = useOrderDetails()
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null)
  const [lastOrder] = useState(loadLastOrder)

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const formValid = details.customerName.trim() !== '' && cart.length > 0
  const hasSpecialOrderItem = cart.some(i => i.isSpecialOrder)

  function handleFieldChange<K extends keyof typeof details>(key: K, value: (typeof details)[K]) {
    set(key, value)
    setFallbackUrl(null)
  }

  function handleSend() {
    const opened = sendWhatsAppOrder(cart, details)
    saveLastOrder(cart)
    if (!opened) {
      setFallbackUrl(buildWhatsAppUrl(cart, details))
    }
    onOrderSent()
    setStep('sent')
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label="סל הזמנה">

        {/* Header */}
        <div className={styles.header}>
          <h2>
            {step === 'list' && '🛒 סיכום הזמנה'}
            {step === 'form' && '📋 סיכום הזמנה'}
            {step === 'sent' && '✅ ההזמנה נשלחה'}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="סגור">✕</button>
        </div>

        {/* ── Step: Sent confirmation ── */}
        {step === 'sent' && (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>✅</div>
            <p className={styles.emptyTitle}>ההזמנה נשלחה!</p>
            <p className={styles.emptySub}>
              {fallbackUrl
                ? 'אם WhatsApp לא נפתח אוטומטית אצלכם, לחצו על הקישור למטה כדי לפתוח ולשלוח את ההודעה.'
                : 'חלון WhatsApp נפתח עם פרטי ההזמנה — נשאר רק לאשר ולשלוח שם.'}
            </p>
            <div className={styles.sentActions}>
              {fallbackUrl && (
                <a
                  className={`${styles.repeatBtn} ${styles.fallbackLink}`}
                  href={fallbackUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  פתיחת WhatsApp
                </a>
              )}
              <button className={styles.nextBtn} onClick={onClose}>
                סגירה
              </button>
            </div>
          </div>
        )}

        {/* ── Step: Cart list ── */}
        {step === 'list' && (
          <>
            <div className={styles.items}>
              {cart.length === 0 ? (
                <div className={styles.empty}>
                  <div className={styles.emptyIcon}>🛒</div>
                  <p className={styles.emptyTitle}>ההזמנה ריקה</p>
                  <p className={styles.emptySub}>הוסיפו מוצרים מהקטלוג</p>
                  {lastOrder && lastOrder.length > 0 && (
                    <button
                      className={styles.repeatBtn}
                      onClick={() => onRestoreLastOrder(lastOrder)}
                    >
                      🔁 הזמינו שוב את ההזמנה הקודמת ({lastOrder.length} פריטים)
                    </button>
                  )}
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className={styles.item}>
                    <div className={styles.itemHeader}>
                      <span className={styles.itemName}>{item.name}</span>
                      <button
                        className={styles.removeBtn}
                        onClick={() => onRemove(item.id)}
                        aria-label={`הסר ${item.name}`}
                      >
                        🗑
                      </button>
                    </div>
                    <div className={styles.itemMeta}>
                      <span>מק״ט: {item.sku}</span>
                      {item.flavor && <span>טעם: {item.flavor}</span>}
                      <span>אריזה: {item.packageQty}</span>
                    </div>
                    <div className={styles.itemFooter}>
                      <span className={styles.qtyLabel}>כמות:</span>
                      <div className={styles.qtyControl}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        >−</button>
                        <span className={styles.qtyVal}>{item.qty}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        >+</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className={styles.bottom}>
                <p className={styles.summary}>{totalItems} פריטים ב-{cart.length} שורות</p>
                <button className={styles.nextBtn} onClick={() => setStep('form')}>
                  לפרטי לקוח ›
                </button>
              </div>
            )}
          </>
        )}

        {/* ── Step: Customer form ── */}
        {step === 'form' && (
          <>
            <div className={styles.items}>
              {cart.map(item => (
                <div key={item.id} className={styles.summaryLine}>
                  {item.name} · מק״ט: {item.sku} · ×{item.qty}
                </div>
              ))}
            </div>

            <div className={styles.form}>
              <h3 className={styles.formTitle}>פרטי הלקוח</h3>

              <div className={styles.grid}>
                <label className={styles.field}>
                  <span>שם לקוח *</span>
                  <input
                    placeholder="ישראל ישראלי"
                    value={details.customerName}
                    onChange={e => handleFieldChange('customerName', e.target.value)}
                  />
                </label>

                <label className={styles.field}>
                  <span>שם העסק</span>
                  <input
                    placeholder="בית קפה X"
                    value={details.businessName}
                    onChange={e => handleFieldChange('businessName', e.target.value)}
                  />
                </label>

                {hasSpecialOrderItem && (
                  <p className={`${styles.specialNote} ${styles.fullWidth}`}>
                    ⚠ ההזמנה כוללת מוצר/ים "הזמנה מיוחדת" — אלה עשויים לדרוש זמן הכנה נוסף.
                    מומלץ לתאם זמינות וזמני הכנה מול העסק.
                  </p>
                )}

                <label className={`${styles.field} ${styles.fullWidth}`}>
                  <span>הערות</span>
                  <textarea
                    rows={3}
                    placeholder="הערות נוספות להזמנה..."
                    value={details.notes}
                    onChange={e => handleFieldChange('notes', e.target.value)}
                  />
                </label>
              </div>

              <button
                className={styles.waBtn}
                disabled={!formValid}
                onClick={handleSend}
              >
                📱 שליחת הזמנה ב-WhatsApp
              </button>

              {fallbackUrl && (
                <a
                  className={`${styles.backBtn} ${styles.fallbackLink}`}
                  href={fallbackUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp לא נפתח? לחצו כאן לפתיחה ידנית
                </a>
              )}

              <button className={styles.backBtn} onClick={() => setStep('list')}>
                ← חזרה לסיכום
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}
