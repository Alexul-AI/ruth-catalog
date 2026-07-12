import { useEffect, useState } from 'react'
import type { OrderDetails } from '../types'

const STORAGE_KEY = 'ruth-catalog-customer-details'

const EMPTY_DETAILS: OrderDetails = {
  customerName: '',
  businessName: '',
  phone: '',
  address: '',
  deliveryDate: '',
  notes: '',
  contactBeforeConfirm: false,
}

/** Only "who is this customer" fields are remembered between orders. */
type RememberedFields = Pick<OrderDetails, 'customerName' | 'businessName' | 'phone' | 'address' | 'contactBeforeConfirm'>

function loadInitialDetails(): OrderDetails {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_DETAILS
    const remembered = JSON.parse(raw) as Partial<RememberedFields>
    return { ...EMPTY_DETAILS, ...remembered }
  } catch {
    return EMPTY_DETAILS
  }
}

/**
 * Manages the customer-details form. Repeat customers shouldn't have to
 * retype their name/business/phone/address every visit, so those fields
 * are persisted and pre-filled. deliveryDate/notes are per-order and are
 * deliberately NOT remembered — silently pre-filling an old delivery date
 * would be actively misleading, not a convenience.
 */
export function useOrderDetails() {
  const [details, setDetails] = useState<OrderDetails>(loadInitialDetails)

  useEffect(() => {
    const { customerName, businessName, phone, address, contactBeforeConfirm } = details
    const remembered: RememberedFields = { customerName, businessName, phone, address, contactBeforeConfirm }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remembered))
  }, [details.customerName, details.businessName, details.phone, details.address, details.contactBeforeConfirm])

  function set<K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) {
    setDetails(prev => ({ ...prev, [key]: value }))
  }

  return { details, set }
}
