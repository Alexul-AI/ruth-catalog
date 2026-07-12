# 🍰 Ruth Patiforim — Digital Order Catalog

A mobile-first B2B ordering catalog for **רות פטיפורים בע"מ**.  
Customers browse products, build an order, and send it to the business via WhatsApp.

## Stack

- **React 18** + **TypeScript** + **Vite** — fast dev + build
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

## WhatsApp number

Already set in `src/utils/whatsapp.ts` (`WHATSAPP_NUMBER = '972549793967'`). If it ever needs to change, edit that constant.

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
│   ├── Header.tsx / .module.css
│   ├── HeroSection.tsx / .module.css
│   ├── Filters.tsx / .module.css
│   ├── ProductCard.tsx / .module.css
│   └── CartPanel.tsx / .module.css
├── data/
│   └── products.ts        ← all 93 products from the PDF catalog
├── hooks/
│   └── useCart.ts         ← cart state management (persisted to localStorage)
├── utils/
│   └── whatsapp.ts        ← WhatsApp message builder
├── types.ts               ← shared TypeScript types
├── App.tsx
├── App.module.css
├── index.css              ← design tokens (:root CSS variables)
└── main.tsx
```

Run `npm run typecheck` to type-check without building.

---

## Roadmap / Next Steps

- [x] Cart persisted locally (localStorage) so a refresh doesn't lose an order
- [x] Fallback WhatsApp link if the popup is blocked
- [ ] Add real product images (replace emoji placeholders)
- [ ] Admin panel to edit products without touching code (Supabase / Airtable)
- [ ] Minimum order quantity validation per product (e.g. enforce ordering by full package/carton, not loose units — needs a business decision on whether customers order by unit or by package)
- [ ] Google Analytics / order tracking
- [ ] PDF order summary download option
