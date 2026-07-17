export interface Product {
  id: string
  category: string
  name: string
  catalogNumber: string
  sku: string
  flavor: string
  size: string
  packageQty: string
  isSpecialOrder: boolean
  storageTemp?: string
  /**
   * Manual override for grouping products whose flavor/topping is baked
   * into `name` itself (e.g. "קרמו שוקולד לבן – ציפוי תות"), where the
   * automatic category+name+size+packageQty grouping in groupProducts.ts
   * can't merge them because `name` differs per variant. When set, this
   * is used as the group's display name and grouping key instead of
   * `name` — the individual variant's real `name` is still used in the
   * cart line and WhatsApp message.
   */
  groupBaseName?: string
  /**
   * Set to `false` for a product line the business currently can't
   * fulfil (e.g. a paused department) — excluded from the catalog
   * entirely, but the data stays in products.ts so it can come back by
   * flipping this one flag. Omitted/`true` = active (the default).
   */
  active?: boolean
  /**
   * Real product photo (e.g. "/products/t-012.jpg"), per-variant — not
   * every flavor of a group needs one. ProductCard falls back to the
   * category emoji when absent, so photos can be added incrementally.
   */
  imageUrl?: string
}

export interface CartItem extends Product {
  qty: number
}

export interface OrderDetails {
  customerName: string
  businessName: string
  notes: string
}

export interface FiltersState {
  search: string
  category: string
  onlySpecial: boolean
  onlyFavorites: boolean
}

/**
 * A group of products that are really the same physical item offered in
 * different flavors — either identical category/name/size/packageQty
 * (automatic grouping), or sharing a manual `groupBaseName` when the
 * flavor is baked into `name` itself. Rendered as one catalog card with
 * a flavor picker instead of one card per flavor.
 */
export interface ProductGroup {
  groupKey: string
  category: string
  name: string
  size: string
  packageQty: string
  catalogNumber: string
  storageTemp?: string
  variants: Product[]
}
