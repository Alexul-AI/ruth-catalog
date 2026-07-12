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
}

export interface CartItem extends Product {
  qty: number
}

export interface OrderDetails {
  customerName: string
  businessName: string
  phone: string
  address: string
  deliveryDate: string
  notes: string
  contactBeforeConfirm: boolean
}

export interface FiltersState {
  search: string
  category: string
  flavor: string
  onlySpecial: boolean
}

/**
 * A group of products that are really the same physical item offered in
 * different flavors (identical category/name/size/packageQty, only
 * flavor + sku + isSpecialOrder differ). Rendered as one catalog card
 * with a flavor picker instead of one card per flavor.
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
