import { CATEGORIES, CATEGORY_EMOJI } from '../data/products'
import styles from './Filters.module.css'

const FLAVORS = ['הכל', 'מתוק', 'מלוח', 'שוקו', 'ניטרלי', 'לבן פרווה / מריר', 'פיסטוק', 'פירות יער', 'וניל', 'פטל', 'תות', 'קפה', 'קרמל מלוח', 'פסיפלורה']

export default function Filters({ filters, onChange }) {
  const { search, category, flavor, onlySpecial } = filters

  function set(key, value) {
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

      {/* Flavor chips */}
      <div className={styles.row}>
        <span className={styles.label}>טעם:</span>
        <div className={styles.chips}>
          {FLAVORS.map(f => (
            <button
              key={f}
              className={`${styles.chip} ${flavor === f ? styles.active : ''}`}
              onClick={() => set('flavor', f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Special order toggle */}
      <label className={styles.specialToggle}>
        <input
          type="checkbox"
          checked={onlySpecial}
          onChange={e => set('onlySpecial', e.target.checked)}
        />
        הזמנה מיוחדת בלבד
      </label>

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
