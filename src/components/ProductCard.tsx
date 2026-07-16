import { useEffect, useRef, useState } from 'react'
import { CATEGORY_EMOJI } from '../data/products'
import { getDefaultVariantIndex } from '../utils/groupProducts'
import type { Product, ProductGroup } from '../types'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  group: ProductGroup
  onAdd: (product: Product, qty: number) => void
  preferSpecial?: boolean
  isFavorite: boolean
  onToggleFavorite: () => void
}

export default function ProductCard({
  group,
  onAdd,
  preferSpecial,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  const defaultIndex = getDefaultVariantIndex(group, { preferSpecial })
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addedTimeout = useRef<ReturnType<typeof setTimeout>>()

  // Keep the selection in sync when filters change which variant should lead,
  // without discarding a manual choice the customer already made for this render.
  useEffect(() => setSelectedIndex(defaultIndex), [defaultIndex])

  useEffect(() => () => clearTimeout(addedTimeout.current), [])

  const product = group.variants[selectedIndex]
  const hasMultipleFlavors = group.variants.length > 1

  function handleAdd() {
    onAdd(product, qty)
    setAdded(true)
    clearTimeout(addedTimeout.current)
    addedTimeout.current = setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article className={styles.card}>
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
        <span role="img" aria-label={group.category}>
          {CATEGORY_EMOJI[group.category] ?? '🍰'}
        </span>
      </div>

      <div className={styles.body}>
        <div className={styles.category}>{group.category}</div>
        <h2 className={styles.name}>{group.name}</h2>

        {hasMultipleFlavors ? (
          <div className={styles.flavorRow} role="group" aria-label="בחירת טעם">
            {group.variants.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className={`${styles.flavorChip} ${i === selectedIndex ? styles.flavorChipActive : ''}`}
                aria-pressed={i === selectedIndex}
                onClick={() => setSelectedIndex(i)}
              >
                {v.flavor}
              </button>
            ))}
          </div>
        ) : (
          product.flavor && (
            <div className={styles.tags}>
              <span className={`${styles.tag} ${styles.flavor}`}>{product.flavor}</span>
            </div>
          )
        )}

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
