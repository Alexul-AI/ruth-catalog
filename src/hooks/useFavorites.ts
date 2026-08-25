import { useEffect, useState } from 'react'
import { products } from '../data/products'
import type { Product } from '../types'

const STORAGE_KEY = 'ruth-catalog-favorites'

/**
 * Before the catalog stopped grouping flavor variants into one
 * flavor-picker card, a favorite was keyed by the group's
 * category|name|size|packageQty string, not a product id - shared by
 * every flavor in that group. Reconstructed here (from fields that
 * didn't change) purely to migrate old localStorage data forward.
 */
function legacyGroupKey(product: Product): string {
  const groupName = product.groupBaseName ?? product.name
  return `${product.category}|${groupName}|${product.size}|${product.packageQty}`
}

/**
 * A stored key from before the ungrouping change won't match any
 * current product id, so a returning customer's favorites would just
 * silently vanish post-upgrade. Expand each legacy group key into
 * every product id that used to belong to that group (1 for a family
 * that was already single-flavor, several for e.g. "טארטלט מיני סירה"
 * which had 3) - all of them become favorited individually, which is
 * the closest match to "I had this whole family starred" under a UI
 * that no longer has a concept of a family.
 */
function migrateLegacyKeys(storedKeys: string[]): { migrated: Set<string>; changed: boolean } {
  const currentIds = new Set(products.map(p => p.id))
  const legacyKeyToIds = new Map<string, string[]>()
  for (const product of products) {
    const key = legacyGroupKey(product)
    const list = legacyKeyToIds.get(key)
    if (list) list.push(product.id)
    else legacyKeyToIds.set(key, [product.id])
  }

  const migrated = new Set<string>()
  let changed = false
  for (const key of storedKeys) {
    if (currentIds.has(key)) {
      migrated.add(key)
      continue
    }
    const ids = legacyKeyToIds.get(key)
    if (ids) {
      ids.forEach(id => migrated.add(id))
      changed = true
    } else {
      // Unrecognized key (discontinued product, corrupted data) - drop it.
      changed = true
    }
  }
  return { migrated, changed }
}

function loadInitial(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const storedKeys = JSON.parse(raw) as string[]
    const { migrated, changed } = migrateLegacyKeys(storedKeys)
    if (changed) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(migrated)))
    }
    return migrated
  } catch {
    return new Set()
  }
}

/** Favorites are keyed by product id - one flavor, one favorite. */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)))
  }, [favorites])

  function toggleFavorite(productId: string) {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(productId)) {
        next.delete(productId)
      } else {
        next.add(productId)
      }
      return next
    })
  }

  return { favorites, toggleFavorite }
}
