import type { Product, ProductGroup } from '../types'

/**
 * Groups products that are the same physical item in different flavors
 * into a single ProductGroup, so the catalog doesn't show 3 near-identical
 * cards for one tartlet in choc/salty/sweet.
 *
 * Grouping key is category + name + size + packageQty — deliberately
 * conservative: it only merges items whose name is byte-identical, so it
 * never accidentally merges genuinely different products. Some catalog
 * families (e.g. the "קרמו שוקולד" cups, where the flavor is baked into
 * the name string itself) won't group with this rule and still show as
 * separate cards — that would need manual grouping, not automatic.
 */
export function groupProducts(products: Product[]): ProductGroup[] {
  const groups = new Map<string, ProductGroup>()

  for (const product of products) {
    const key = `${product.category}|${product.name}|${product.size}|${product.packageQty}`
    const existing = groups.get(key)
    if (existing) {
      existing.variants.push(product)
    } else {
      groups.set(key, {
        groupKey: key,
        category: product.category,
        name: product.name,
        size: product.size,
        packageQty: product.packageQty,
        catalogNumber: product.catalogNumber,
        storageTemp: product.storageTemp,
        variants: [product],
      })
    }
  }

  return Array.from(groups.values())
}

/**
 * Picks which variant should be pre-selected in a group's flavor picker:
 * prefer one matching an active flavor filter, then one matching an
 * active "special order only" filter, then the first non-special-order
 * variant (the one any customer can order without waiting), else index 0.
 */
export function getDefaultVariantIndex(
  group: ProductGroup,
  options: { preferredFlavor?: string; preferSpecial?: boolean },
): number {
  if (options.preferredFlavor) {
    const idx = group.variants.findIndex(v => v.flavor === options.preferredFlavor)
    if (idx !== -1) return idx
  }
  if (options.preferSpecial) {
    const idx = group.variants.findIndex(v => v.isSpecialOrder)
    if (idx !== -1) return idx
  }
  const idx = group.variants.findIndex(v => !v.isSpecialOrder)
  return idx !== -1 ? idx : 0
}
