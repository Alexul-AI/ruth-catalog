import { CATEGORY_EMOJI } from '../data/products'
import type { Product, ProductGroup } from '../types'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  group: ProductGroup
  qty: number
  onQtyChange: (product: Product, qty: number) => void
  isFavorite: boolean
  onToggleFavorite: () => void
}

export default function ProductCard({
  group,
  qty,
  onQtyChange,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  const product = group.variants[0]

  return (
    <article className={`${styles.card} ${qty > 0 ? styles.cardSelected : ''}`}>
      {product.isSpecialOrder && (
        <div className={styles.specialBadge}>★ הזמנה מיוחדת</div>
      )}

      <button
        type="button"
        className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteBtnActive : ''}`}
        onClick={onToggleFavorite}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <div className={styles.image}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.flavor ? `${product.name} – ${product.flavor}` : product.name}
            className={styles.photo}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span role="img" aria-label={group.category}>
            {CATEGORY_EMOJI[group.category] ?? '🍰'}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.category}>{group.category}</div>
        <h2 className={styles.name}>{group.name}</h2>

        {product.flavor && <div className={styles.flavorHighlight}>טעם: {product.flavor}</div>}

        <div className={styles.tags}>
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
            onClick={() => onQtyChange(product, qty - 1)}
            disabled={qty === 0}
            aria-label="הפחת כמות"
          >
            −
          </button>
          <span className={styles.qtyVal}>{qty}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => onQtyChange(product, qty + 1)}
            aria-label="הגדל כמות"
          >
            +
          </button>
        </div>
      </div>
    </article>
  )
}
