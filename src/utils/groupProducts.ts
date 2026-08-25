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
