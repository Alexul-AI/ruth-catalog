import { useState } from 'react'
import { sendWhatsAppOrder } from '../utils/whatsapp'
import styles from './CartPanel.module.css'

const EMPTY_DETAILS = {
  customerName: '',
  businessName: '',
  phone: '',
  address: '',
  deliveryDate: '',
  notes: '',
  contactBeforeConfirm: false,
}

export default function CartPanel({ cart, onClose, onUpdateQty, onRemove }) {
  const [step, setStep] = useState('list') // 'list' | 'form'
  const [details, setDetails] = useState(EMPTY_DETAILS)

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const formValid = details.customerName.trim() && details.phone.trim() && cart.length > 0

  function set(key, value) {
    setDetails(prev => ({ ...prev, [key]: value }))
  }

  function handleSend() {
    sendWhatsAppOrder(cart, details)
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.panel} role="dialog" aria-modal="true" aria-label="סל הזמנה">

        {/* Header */}
        <div className={styles.header}>
          <h2>{step === 'list' ? '🛒 סיכום הזמנה' : '📋 פרטי לקוח'}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="סגור">✕</button>
        </div>

        {/* ── Step: Cart list ── */}
        {step === 'list' && (
          <>
            <div className={styles.items}>
              {cart.length === 0 ? (
                <div className={styles.empty}>
                  <div className={styles.emptyIcon}>🛒</div>
                  <p className={styles.emptyTitle}>ההזמנה ריקה</p>
                  <p className={styles.emptySub}>הוסיפו מוצרים מהקטלוג</p>
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
                    onChange={e => set('customerName', e.target.value)}
                  />
                </label>

                <label className={styles.field}>
                  <span>שם העסק</span>
                  <input
                    placeholder="בית קפה X"
                    value={details.businessName}
                    onChange={e => set('businessName', e.target.value)}
                  />
                </label>

                <label className={styles.field}>
                  <span>טלפון *</span>
                  <input
                    type="tel"
                    placeholder="050-0000000"
                    value={details.phone}
                    onChange={e => set('phone', e.target.value)}
                  />
                </label>

                <label className={styles.field}>
                  <span>תאריך אספקה</span>
                  <input
                    type="date"
                    value={details.deliveryDate}
                    onChange={e => set('deliveryDate', e.target.value)}
                  />
                </label>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                  <span>כתובת אספקה</span>
                  <input
                    placeholder="רחוב, עיר"
                    value={details.address}
                    onChange={e => set('address', e.target.value)}
                  />
                </label>

                <label className={`${styles.field} ${styles.fullWidth}`}>
                  <span>הערות</span>
                  <textarea
                    rows={3}
                    placeholder="הערות נוספות להזמנה..."
                    value={details.notes}
                    onChange={e => set('notes', e.target.value)}
                  />
                </label>

                <label className={`${styles.checkboxRow} ${styles.fullWidth}`}>
                  <input
                    type="checkbox"
                    checked={details.contactBeforeConfirm}
                    onChange={e => set('contactBeforeConfirm', e.target.checked)}
                  />
                  נא לחזור אליי לפני אישור ההזמנה
                </label>
              </div>

              <button
                className={styles.waBtn}
                disabled={!formValid}
                onClick={handleSend}
              >
                📱 שליחת הזמנה ב-WhatsApp
              </button>

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
