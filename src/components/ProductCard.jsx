import { useState } from 'react'
import { CATEGORY_EMOJI } from '../data/products'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, onAdd }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    onAdd(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article className={styles.card}>
      {product.isSpecialOrder && (
        <div className={styles.specialBadge}>★ הזמנה מיוחדת</div>
      )}

      <div className={styles.image}>
        <span role="img" aria-label={product.category}>
          {CATEGORY_EMOJI[product.category] ?? '🍰'}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.category}>{product.category}</div>
        <h2 className={styles.name}>{product.name}</h2>

        <div className={styles.tags}>
          {product.flavor && (
            <span className={`${styles.tag} ${styles.flavor}`}>{product.flavor}</span>
          )}
          {product.size && product.size !== '—' && (
            <span className={styles.tag}>{product.size}</span>
          )}
          <span className={styles.tag}>📦 {product.packageQty}</span>
          {product.catalogNumber && product.catalogNumber !== '—' && (
            <span className={styles.tag}>קטלוג #{product.catalogNumber}</span>
          )}
          {product.storageTemp && (
            <span className={`${styles.tag} ${styles.temp}`}>❄ {product.storageTemp}</span>
          )}
        </div>

        <div className={styles.sku}>מק״ט: {product.sku}</div>
      </div>

      <div className={styles.footer}>
        <div className={styles.qtyControl}>
          <button
            className={styles.qtyBtn}
            onClick={() => setQty(q => Math.max(1, q - 1))}
            aria-label="הפחת כמות"
          >
            −
          </button>
          <span className={styles.qtyVal}>{qty}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => setQty(q => q + 1)}
            aria-label="הגדל כמות"
          >
            +
          </button>
        </div>

        <button
          className={`${styles.addBtn} ${added ? styles.added : ''}`}
          onClick={handleAdd}
        >
          {added ? '✓ נוסף' : 'הוסף להזמנה'}
        </button>
      </div>
    </article>
  )
}
