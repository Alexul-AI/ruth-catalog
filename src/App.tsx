import { useMemo, useState } from 'react'
import { products } from './data/products'
import { useCart } from './hooks/useCart'
import { groupProducts } from './utils/groupProducts'
import type { FiltersState } from './types'

import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Filters from './components/Filters'
import ProductCard from './components/ProductCard'
import CartPanel from './components/CartPanel'

import styles from './App.module.css'

const DEFAULT_FILTERS: FiltersState = {
  search: '',
  category: 'הכל',
  flavor: 'הכל',
  onlySpecial: false,
}

const PRODUCT_GROUPS = groupProducts(products)

export default function App() {
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS)
  const [cartOpen, setCartOpen] = useState(false)

  const { cart, addItem, removeItem, updateQty, totalItems } = useCart()

  // Derived: filtered product groups
  const filteredGroups = useMemo(() => {
    const q = filters.search.toLowerCase().trim()
    return PRODUCT_GROUPS.filter(group => {
      if (filters.category !== 'הכל' && group.category !== filters.category) return false

      // A group passes the flavor/special filters if at least one of its
      // flavor variants satisfies them — the card itself still offers all
      // flavors once shown, since it's really one product either way.
      const hasMatchingVariant = group.variants.some(v => {
        if (filters.flavor !== 'הכל' && v.flavor !== filters.flavor) return false
        if (filters.onlySpecial && !v.isSpecialOrder) return false
        return true
      })
      if (!hasMatchingVariant) return false

      if (q) {
        const haystack = [
          group.name,
          group.category,
          ...group.variants.flatMap(v => [v.sku, v.flavor]),
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }

      return true
    })
  }, [filters])

  function scrollToCatalog() {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header totalItems={totalItems} onCartOpen={() => setCartOpen(true)} />

      <main>
        <HeroSection onStart={scrollToCatalog} />

        <section className={styles.catalogSection} id="catalog">
          <h2 className={styles.sectionTitle}>קטלוג מוצרים</h2>

          <Filters filters={filters} onChange={setFilters} />

          <p className={styles.resultCount}>{filteredGroups.length} מוצרים</p>

          {filteredGroups.length === 0 ? (
            <div className={styles.noResults}>
              😕 לא נמצאו מוצרים — נסו לשנות את הסינון
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredGroups.map(group => (
                <ProductCard
                  key={group.groupKey}
                  group={group}
                  onAdd={addItem}
                  preferredFlavor={filters.flavor !== 'הכל' ? filters.flavor : undefined}
                  preferSpecial={filters.onlySpecial}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {cartOpen && (
        <CartPanel
          cart={cart}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeItem}
        />
      )}
    </>
  )
}
