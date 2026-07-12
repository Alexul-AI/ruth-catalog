# CLAUDE.md — Project context for Claude Code

## What this project is
A mobile-first B2B ordering catalog for **רות פטיפורים בע"מ** (Ruth Patiforim Ltd.).  
The app converts a printed PDF product catalog into a digital ordering experience.  
Customers browse products, build a cart, and send a structured Hebrew order via WhatsApp.

## Business context
- **Seller:** רות פטיפורים בע"מ — pastry and dessert product manufacturer
- **Buyers:** B2B customers — cafes, bakeries, restaurants, event caterers
- **No payment:** The app generates an *order request*, not a paid checkout
- **Language:** Hebrew (RTL), direction: rtl

## Key files to understand before making changes

| File | Purpose |
|------|---------|
| `src/data/products.ts` | All 93 products from the PDF catalog — source of truth |
| `src/utils/whatsapp.ts` | WhatsApp number + message builder — number is already set to the real business number |
| `src/hooks/useCart.ts` | All cart logic (add / remove / update qty), persisted to localStorage |
| `src/hooks/useOrderDetails.ts` | Customer-details form state — remembers name/business/phone/address between visits (not deliveryDate/notes, those are per-order) |
| `src/utils/lastOrder.ts` | Snapshot of the last sent cart, used by the "🔁 order again" button when the cart is empty |
| `src/hooks/useFavorites.ts` | Persisted set of favorited `ProductGroup.groupKey`s — the "⭐ my regulars" filter in `Filters.tsx` only renders once at least one favorite exists |
| `src/types.ts` | Shared TypeScript types (`Product`, `CartItem`, `OrderDetails`, `FiltersState`, `ProductGroup`) |
| `src/index.css` | Global CSS variables (design tokens) — colors, radii, font |

Project is TypeScript (converted 2026-07-12). All source files are `.ts`/`.tsx`; run `npm run typecheck` before committing.

## Design rules
- **RTL always** — `direction: rtl` on body, all layout must work RTL
- **Brand color:** `--red: #B91C1C` (deep red matching original catalog)
- **Font:** Heebo (loaded from Google Fonts in index.html)
- **CSS Modules** for all component styles — no global class names except tokens in index.css
- Mobile-first — grid collapses to 2-col then 1-col on small screens

## Product data shape
```js
{
  id: string,           // e.g. 't-001'
  category: string,     // Hebrew category name
  name: string,         // Hebrew product name
  catalogNumber: string,// מספר קטלוגי (may be '—')
  sku: string,          // מק"ט
  flavor: string,       // טעם
  size: string,         // גודל / dimensions
  packageQty: string,   // כמות באריזה
  isSpecialOrder: bool, // מוצר בהזמנה מיוחדת
  storageTemp?: string, // optional, e.g. '-18°'
}
```

## Product grouping (flavor variants)

Many catalog items are the same physical product offered in choc/salty/sweet
flavors as separate rows in `products.ts` (e.g. `t-001`/`t-002`/`t-003` are
all "טארטלט מיני", just different flavor + sku). Showing those as 3 near-
identical cards was bad mobile UX (more scrolling, harder to compare), so
`src/utils/groupProducts.ts` merges them into one `ProductGroup` per
distinct `category+(groupBaseName ?? name)+size+packageQty`, rendered as a
single card with a flavor-chip picker (`ProductCard.tsx`) instead of one
card per flavor. This took the catalog from 93 cards to 72, then to 67
once `g-001`..`g-006` (the "קרמו שוקולד לבן – ציפוי X" cups) were opted in
via `groupBaseName` (below).

**Automatic grouping (by `name` alone) is deliberately conservative** — it
only merges rows whose `name` string is byte-identical, so it never
accidentally merges genuinely different products. Families that encode
the flavor *inside* the name (e.g. `g-001`..`g-006`, or `mc-001`..`mc-009`
macaron flavors) don't group automatically. `g-001`..`g-006` were opted in
by setting `groupBaseName: 'קרמו שוקולד לבן'` on each — `groupProducts.ts`
uses that as the group's key/display name instead of `name`, while each
variant's own full `name` (e.g. "...– ציפוי פיסטוק") is still what shows
up in the cart line and WhatsApp message. `mc-001`..`mc-009` were
deliberately left ungrouped — macaron flavor feels like the primary
purchase decision there, not an interchangeable topping, so collapsing
them into one card was judged more likely to hide options than help; this
is a judgment call, not a technical limitation, and can be revisited.
Don't "fix" grouping gaps by loosening the automatic name match itself
(e.g. to size+packageQty alone) — that risks merging genuinely different
products; use `groupBaseName` per-product instead.

Default flavor selected in the picker: whichever flavor matches an active
flavor/special-order filter, else the first non-special-order flavor (so a
customer isn't defaulted into a variant that requires a special order).

## Repeat-customer flow

`CartPanel.tsx` has a third step, `'sent'`, shown right after "שליחת הזמנה
ב-WhatsApp" is clicked. At that point the cart is cleared (`onOrderSent` →
`clearCart`) and the cart snapshot is saved via `saveLastOrder` — this is
what makes the empty-cart state able to show "🔁 הזמינו שוב את ההזמנה
הקודמת". If you ever need the cart to *not* clear after sending (e.g. to
let someone send the same order to two people), that's an intentional
behavior change, not a bug — flag it before "fixing" it back.

Customer name/business/phone/address persist across visits via
`useOrderDetails` (separate from the cart snapshot above) so a repeat
customer never retypes their contact info, even if they don't use "order
again."

## WhatsApp message format
The final message sent is structured Hebrew text:
```
שלום, אני רוצה לבצע הזמנה:

פרטי לקוח:
שם לקוח: ...
...

סיכום הזמנה:

1. מק״ט: ...
   מוצר: ...
   ...
```

## Common tasks
- **Add a product:** edit `src/data/products.ts` following the `Product` shape in `src/types.ts`
- **Change WhatsApp number:** edit `WHATSAPP_NUMBER` in `src/utils/whatsapp.ts`
- **Add a new page/route:** this is a single-page app (no router yet) — add React Router if needed
- **Add product images:** add `imageUrl` field to `Product` in `src/types.ts` and update `ProductCard.tsx` to render `<img>` instead of the emoji placeholder
