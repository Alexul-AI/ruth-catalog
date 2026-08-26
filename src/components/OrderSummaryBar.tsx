import styles from './OrderSummaryBar.module.css'

interface OrderSummaryBarProps {
  totalLines: number
  totalItems: number
  onOpen: () => void
}

/**
 * Fixed bottom bar, replaces the old per-card "add to order" button as the
 * moment a customer confirms their selection - shows up once at least one
 * product has a nonzero quantity and opens the cart/order screen.
 */
export default function OrderSummaryBar({ totalLines, totalItems, onOpen }: OrderSummaryBarProps) {
  if (totalLines === 0) return null

  return (
    <button type="button" className={styles.bar} onClick={onOpen}>
      <span className={styles.label}>לסיכום ההזמנה</span>
      <span className={styles.counts}>
        {totalLines} מוצרים · {totalItems} אריזות
      </span>
    </button>
  )
}
