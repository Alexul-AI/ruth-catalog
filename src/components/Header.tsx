import styles from './Header.module.css'

interface HeaderProps {
  totalItems: number
  onCartOpen: () => void
}

export default function Header({ totalItems, onCartOpen }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoCircle}>R</div>
          <div>
            <div className={styles.logoTitle}>רות פטיפורים בע״מ</div>
            <div className={styles.logoSub}>קטלוג הזמנות דיגיטלי</div>
          </div>
        </div>

        <button className={styles.cartBtn} onClick={onCartOpen} aria-label="פתח סל הזמנה">
          <span>🛒</span>
          <span>הזמנה</span>
          {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </button>
      </div>
    </header>
  )
}
