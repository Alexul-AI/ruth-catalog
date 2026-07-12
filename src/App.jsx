import { useState, useMemo } from 'react'
import { products } from './data/products'
import { useCart } from './hooks/useCart'

import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Filters from './components/Filters'
import ProductCard from './components/ProductCard'
import CartPanel from './components/CartPanel'

import styles from './App.module.css'

const DEFAULT_FILTERS = {
  search: '',
  category: 'הכל',
  flavor: 'הכל',
  onlySpecial: false,
}

export default function App() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [cartOpen, setCartOpen] = useState(false)

  const { cart, addItem, removeItem, updateQty, totalItems } = useCart()

  // Derived: filtered product list
  const filtered = useMemo(() => {
    const q = filters.search.toLowerCase().trim()
    return products.filter(p => {
      if (filters.category !== 'הכל' && p.category !== filters.category) return false
      if (filters.flavor !== 'הכל' && p.flavor !== filters.flavor) return false
      if (filters.onlySpecial && !p.isSpecialOrder) return false
      if (q) {
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.flavor ?? '').toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        )
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

          <p className={styles.resultCount}>{filtered.length} מוצרים</p>

          {filtered.length === 0 ? (
            <div className={styles.noResults}>
              😕 לא נמצאו מוצרים — נסו לשנות את הסינון
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={addItem}
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
