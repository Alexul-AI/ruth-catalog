import { useEffect, useState } from 'react'
import type { OrderDetails } from '../types'

const STORAGE_KEY = 'ruth-catalog-customer-details'

const EMPTY_DETAILS: OrderDetails = {
  customerName: '',
  businessName: '',
  notes: '',
}

/** Only "who is this customer" fields are remembered between orders. */
type RememberedFields = Pick<OrderDetails, 'customerName' | 'businessName'>

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
 * retype their name/business every visit, so those fields are persisted
 * and pre-filled. `notes` is per-order and deliberately NOT remembered —
 * silently pre-filling an old note would be actively misleading, not a
 * convenience. Phone/address/delivery-date fields were removed entirely
 * (2026-07-16, client request) — the order is sent from the customer's
 * own WhatsApp, so their number is already visible to the business
 * natively; address/delivery timing get discussed in the chat itself for
 * known clients.
 */
export function useOrderDetails() {
  const [details, setDetails] = useState<OrderDetails>(loadInitialDetails)

  useEffect(() => {
    const { customerName, businessName } = details
    const remembered: RememberedFields = { customerName, businessName }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(remembered))
  }, [details.customerName, details.businessName])

  function set<K extends keyof OrderDetails>(key: K, value: OrderDetails[K]) {
    setDetails(prev => ({ ...prev, [key]: value }))
  }

  return { details, set }
}
