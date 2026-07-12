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
