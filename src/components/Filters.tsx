import { CATEGORIES, CATEGORY_EMOJI } from '../data/products'
import type { FiltersState } from '../types'
import styles from './Filters.module.css'

interface FiltersProps {
  filters: FiltersState
  onChange: (filters: FiltersState) => void
  favoritesCount: number
}

export default function Filters({ filters, onChange, favoritesCount }: FiltersProps) {
  const { search, category, onlySpecial, onlyFavorites } = filters

  function set<K extends keyof FiltersState>(key: K, value: FiltersState[K]) {
    onChange({ ...filters, [key]: value })
  }

  return (
    <div className={styles.wrap}>
      {/* Search */}
      <input
        className={styles.search}
        type="search"
        placeholder="חיפוש לפי שם, מק״ט, טעם..."
        value={search}
        onChange={e => set('search', e.target.value)}
        aria-label="חיפוש מוצרים"
      />

      {/* Special order / favorites toggles */}
      <div className={styles.toggleRow}>
        <label className={styles.specialToggle}>
          <input
            type="checkbox"
            checked={onlySpecial}
            onChange={e => set('onlySpecial', e.target.checked)}
          />
          הזמנה מיוחדת בלבד
        </label>

        {favoritesCount > 0 && (
          <label className={styles.specialToggle}>
            <input
              type="checkbox"
              checked={onlyFavorites}
              onChange={e => set('onlyFavorites', e.target.checked)}
            />
            ⭐ המועדפים שלי בלבד ({favoritesCount})
          </label>
        )}
      </div>

      {/* Category tabs */}
      <div className={styles.catTabs}>
        <button
          className={`${styles.catTab} ${category === 'הכל' ? styles.active : ''}`}
          onClick={() => set('category', 'הכל')}
        >
          הכל
        </button>
        {CATEGORIES.map(c => (
          <button
            key={c}
            className={`${styles.catTab} ${category === c ? styles.active : ''}`}
            onClick={() => set('category', c)}
          >
            {CATEGORY_EMOJI[c]} {c}
          </button>
        ))}
      </div>
    </div>
  )
}
