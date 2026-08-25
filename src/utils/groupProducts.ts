import type { Product, ProductGroup } from '../types'

/**
 * One card per product - flavor variants are NOT merged into a shared
 * flavor-picker card. Shai's customer base is largely non-technical and
 * was missing that a card's flavor chips picked between different
 * products before adding to cart; a customer could tap + and add
 * whichever flavor happened to be pre-selected without noticing there
 * was a choice. Every product gets its own always-visible card instead -
 * the printed-catalog mental model these customers already know.
 */
export function groupProducts(products: Product[]): ProductGroup[] {
  return products.map(product => ({
    groupKey: product.id,
    category: product.category,
    name: product.name,
    size: product.size,
    packageQty: product.packageQty,
    catalogNumber: product.catalogNumber,
    storageTemp: product.storageTemp,
    variants: [product],
  }))
}

/**
 * Picks which variant should be pre-selected in a group's flavor picker:
 * prefer one matching an active "special order only" filter, then among the
 * non-special-order variants (the ones any customer can order without
 * waiting) prefer one that actually has a photo, then the first
 * non-special-order variant regardless, else index 0.
 */
export function getDefaultVariantIndex(
  group: ProductGroup,
  options: { preferSpecial?: boolean },
): number {
  if (options.preferSpecial) {
    const idx = group.variants.findIndex(v => v.isSpecialOrder)
    if (idx !== -1) return idx
  }
  const withImageIdx = group.variants.findIndex(v => !v.isSpecialOrder && v.imageUrl)
  if (withImageIdx !== -1) return withImageIdx
  const idx = group.variants.findIndex(v => !v.isSpecialOrder)
  return idx !== -1 ? idx : 0
}
