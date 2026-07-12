import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ruth-catalog-favorites'

function loadInitial(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set()
  } catch {
    return new Set()
  }
}

/**
 * Favorites are keyed by ProductGroup.groupKey (the base product, not a
 * specific flavor variant) - a customer marking "טארטלט מיני" as a regular
 * item means that regardless of which flavor they pick each time.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(favorites)))
  }, [favorites])

  function toggleFavorite(groupKey: string) {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(groupKey)) {
        next.delete(groupKey)
      } else {
        next.add(groupKey)
      }
      return next
    })
  }

  return { favorites, toggleFavorite }
}
