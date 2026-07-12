# 🍰 Ruth Patiforim — Digital Order Catalog

A mobile-first B2B ordering catalog for **רות פטיפורים בע"מ**.  
Customers browse products, build an order, and send it to the business via WhatsApp.

## Stack

- **React 18** + **Vite** — fast dev + build
- **CSS Modules** — scoped, zero-dependency styling
- **No backend** — pure client-side, deploys as static files

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173
```

---

## ⚠️ Before deploying — set your WhatsApp number

Open `src/utils/whatsapp.js` and replace:

```js
export const WHATSAPP_NUMBER = '972XXXXXXXXX'
```

With the real number, e.g.:

```js
export const WHATSAPP_NUMBER = '972521234567'
```

---

## Deploy to Vercel

```bash
# Option A — Vercel CLI
npm i -g vercel
vercel

# Option B — GitHub integration
# Push to GitHub → import repo at vercel.com → auto-deploy on every push
```

No config needed — Vercel auto-detects Vite.

---

## Project Structure

```
src/
├── components/
│   ├── Header.jsx / .module.css
│   ├── HeroSection.jsx / .module.css
│   ├── Filters.jsx / .module.css
│   ├── ProductCard.jsx / .module.css
│   └── CartPanel.jsx / .module.css
├── data/
│   └── products.js        ← all 80+ products from the PDF catalog
├── hooks/
│   └── useCart.js         ← cart state management
├── utils/
│   └── whatsapp.js        ← WhatsApp message builder
├── App.jsx
├── App.module.css
├── index.css              ← design tokens (:root CSS variables)
└── main.jsx
```

---

## Roadmap / Next Steps

- [ ] Add real product images (replace emoji placeholders)
- [ ] Admin panel to edit products without touching code (Supabase / Airtable)
- [ ] Minimum order quantity validation per product
- [ ] Order history saved locally (localStorage)
- [ ] Google Analytics / order tracking
- [ ] PDF order summary download option
