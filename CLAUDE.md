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
| `src/data/products.js` | All 80+ products from the PDF catalog — source of truth |
| `src/utils/whatsapp.js` | WhatsApp number + message builder — **change number before deploy** |
| `src/hooks/useCart.js` | All cart logic (add / remove / update qty) |
| `src/index.css` | Global CSS variables (design tokens) — colors, radii, font |

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
- **Add a product:** edit `src/data/products.js` following the existing shape
- **Change WhatsApp number:** edit `WHATSAPP_NUMBER` in `src/utils/whatsapp.js`
- **Add a new page/route:** this is a single-page app (no router yet) — add React Router if needed
- **Add product images:** add `imageUrl` field to products and update `ProductCard.jsx` to render `<img>` instead of the emoji placeholder
