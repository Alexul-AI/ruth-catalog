/**
 * Product catalog — Ruth Patiforim
 * Source: printed PDF catalog (pages 01–13)
 *
 * Category taxonomy simplified 2026-07-12 per the client's request to a
 * short 7-item filter list — see CLAUDE.md for the full mapping.
 *
 * The chocolate-base/decoration products (c-* and d-*, 22 total, still
 * carrying category: 'שוקולד' internally) are marked `active: false` —
 * Ruth Petifours currently has no working chocolate department, so these
 * can't actually be fulfilled. Not deleted: the department may reopen
 * later, at which point flip `active` back and 'שוקולד' can return to
 * CATEGORIES. See CLAUDE.md for the full story.
 */
import type { Product } from '../types'

export const CATEGORIES = [
  'טארטלטים',
  'מקרונים מלאים',
  'קינוחים מוכנים',
  'מקרונים למילוי',
  'מאפים',
  'פאיים',
  'מרנגים',
]

export const CATEGORY_EMOJI: Record<string, string> = {
  'טארטלטים':       '🫙',
  'מקרונים מלאים':  '🎨',
  'קינוחים מוכנים': '🍰',
  'מקרונים למילוי': '🔵',
  'מאפים':          '🥐',
  'פאיים':          '🥧',
  'מרנגים':         '☁️',
  'שוקולד':         '🍫',
}

const ALL_PRODUCTS: Product[] = [
  // ── טארטלטים מיני ──────────────────────────────────────────────────
  { id: 't-001', category: 'טארטלטים', name: 'טארטלט מיני סירה',   catalogNumber: '1',  sku: '001',   flavor: 'שוקו',   size: '70×30 מ"מ', packageQty: '240 י"ח', isSpecialOrder: true, imageUrl: '/products/t-001.jpg' },
  { id: 't-002', category: 'טארטלטים', name: 'טארטלט מיני סירה',   catalogNumber: '1',  sku: '01',    flavor: 'מלוח',   size: '70×30 מ"מ', packageQty: '240 י"ח', isSpecialOrder: true, imageUrl: '/products/t-002.jpg' },
  { id: 't-003', category: 'טארטלטים', name: 'טארטלט מיני סירה',   catalogNumber: '1',  sku: '1',     flavor: 'מתוק',   size: '70×30 מ"מ', packageQty: '240 י"ח', isSpecialOrder: false, imageUrl: '/products/t-003.jpg' },
  { id: 't-004', category: 'טארטלטים', name: 'טארטלט מיני ריבוע',  catalogNumber: '2B', sku: 'B002',  flavor: 'שוקו',   size: '35×35 מ"מ', packageQty: '400 י"ח', isSpecialOrder: true, imageUrl: '/products/t-004.jpg' },
  { id: 't-005', category: 'טארטלטים', name: 'טארטלט מיני ריבוע',  catalogNumber: '2B', sku: 'B02',   flavor: 'מלוח',   size: '35×35 מ"מ', packageQty: '400 י"ח', isSpecialOrder: true, imageUrl: '/products/t-005.jpg' },
  { id: 't-006', category: 'טארטלטים', name: 'טארטלט מיני ריבוע',  catalogNumber: '2B', sku: 'B2',    flavor: 'מתוק',   size: '35×35 מ"מ', packageQty: '400 י"ח', isSpecialOrder: false, imageUrl: '/products/t-006.jpg' },
  { id: 't-007', category: 'טארטלטים', name: 'טארטלט מיני עגול',   catalogNumber: '2',  sku: '002',   flavor: 'שוקו',   size: '70×30 מ"מ', packageQty: '400 י"ח', isSpecialOrder: true, imageUrl: '/products/t-007.jpg' },
  { id: 't-008', category: 'טארטלטים', name: 'טארטלט מיני עגול',   catalogNumber: '2',  sku: '02',    flavor: 'מלוח',   size: '70×30 מ"מ', packageQty: '400 י"ח', isSpecialOrder: false, imageUrl: '/products/t-008.jpg' },
  { id: 't-009', category: 'טארטלטים', name: 'טארטלט מיני עגול',   catalogNumber: '2',  sku: '2',     flavor: 'מתוק',   size: '70×30 מ"מ', packageQty: '400 י"ח', isSpecialOrder: false, imageUrl: '/products/t-009.jpg' },

  // ── טארטלטים אישיים ────────────────────────────────────────────────
  { id: 't-010', category: 'טארטלטים', name: 'טארטלט אישי',       catalogNumber: '3', sku: '003', flavor: 'שוקו',   size: '60×11 מ"מ', packageQty: '150 י"ח', isSpecialOrder: true, imageUrl: '/products/t-010.jpg' },
  { id: 't-011', category: 'טארטלטים', name: 'טארטלט אישי',       catalogNumber: '3', sku: '03',  flavor: 'מלוח',   size: '60×11 מ"מ', packageQty: '150 י"ח', isSpecialOrder: false },
  { id: 't-012', category: 'טארטלטים', name: 'טארטלט אישי',       catalogNumber: '3', sku: '3',   flavor: 'מתוק',   size: '60×11 מ"מ', packageQty: '150 י"ח', isSpecialOrder: false, imageUrl: '/products/t-012.jpg' },
  { id: 't-013', category: 'טארטלטים', name: 'טארטלט אישי',       catalogNumber: '4', sku: '004', flavor: 'שוקו',   size: '50×11 מ"מ', packageQty: '240 י"ח', isSpecialOrder: false, imageUrl: '/products/t-013.jpg' },
  { id: 't-014', category: 'טארטלטים', name: 'טארטלט אישי',       catalogNumber: '4', sku: '04',  flavor: 'מלוח',   size: '50×11 מ"מ', packageQty: '240 י"ח', isSpecialOrder: false, imageUrl: '/products/t-014.jpg' },
  { id: 't-015', category: 'טארטלטים', name: 'טארטלט אישי',       catalogNumber: '4', sku: '4',   flavor: 'מתוק',   size: '50×11 מ"מ', packageQty: '240 י"ח', isSpecialOrder: false, imageUrl: '/products/t-015.jpg' },
  { id: 't-016', category: 'טארטלטים', name: 'טארטלט אישי פרח',   catalogNumber: '5', sku: '5',   flavor: 'מתוק',   size: '48×11 מ"מ', packageQty: '240 י"ח', isSpecialOrder: false, imageUrl: '/products/t-016.jpg' },

  // ── טארטלטים פרימיום ────────────────────────────────────────────────
  { id: 't-017', category: 'טארטלטים', name: 'טארטלט פרימיום 300',   catalogNumber: '300',  sku: '00300',  flavor: 'שוקו',  size: '60×14 מ"מ',    packageQty: '150 י"ח', isSpecialOrder: false, imageUrl: '/products/t-017.jpg' },
  { id: 't-018', category: 'טארטלטים', name: 'טארטלט פרימיום 300',   catalogNumber: '300',  sku: '0300',   flavor: 'מלוח',  size: '60×14 מ"מ',    packageQty: '150 י"ח', isSpecialOrder: false, imageUrl: '/products/t-018.jpg' },
  { id: 't-019', category: 'טארטלטים', name: 'טארטלט פרימיום 300',   catalogNumber: '300',  sku: '300',    flavor: 'מתוק',  size: '60×14 מ"מ',    packageQty: '150 י"ח', isSpecialOrder: false, imageUrl: '/products/t-019.jpg' },
  { id: 't-020', category: 'טארטלטים', name: 'טארטלט פרימיום 400',   catalogNumber: '400',  sku: '00400',  flavor: 'שוקו',  size: '50×14 מ"מ',    packageQty: '240 י"ח', isSpecialOrder: false },
  { id: 't-021', category: 'טארטלטים', name: 'טארטלט פרימיום 400',   catalogNumber: '400',  sku: '0400',   flavor: 'מלוח',  size: '50×14 מ"מ',    packageQty: '240 י"ח', isSpecialOrder: false },
  { id: 't-022', category: 'טארטלטים', name: 'טארטלט פרימיום 400',   catalogNumber: '400',  sku: '400',    flavor: 'מתוק',  size: '50×14 מ"מ',    packageQty: '240 י"ח', isSpecialOrder: false },
  { id: 't-023', category: 'טארטלטים', name: 'טארטלט פרימיום B400',  catalogNumber: 'B400', sku: 'B00400', flavor: 'שוקו',  size: '45×45×14 מ"מ', packageQty: '240 י"ח', isSpecialOrder: false },
  { id: 't-024', category: 'טארטלטים', name: 'טארטלט פרימיום B400',  catalogNumber: 'B400', sku: 'B0400',  flavor: 'מלוח',  size: '45×45×14 מ"מ', packageQty: '240 י"ח', isSpecialOrder: false },
  { id: 't-025', category: 'טארטלטים', name: 'טארטלט פרימיום B400',  catalogNumber: 'B400', sku: 'B400',   flavor: 'מתוק',  size: '45×45×14 מ"מ', packageQty: '240 י"ח', isSpecialOrder: false },
  { id: 't-026', category: 'טארטלטים', name: 'טארטלט פרימיום 600',   catalogNumber: '600',  sku: '00600',  flavor: 'שוקו',  size: '60/60×14 מ"מ', packageQty: '150 י"ח', isSpecialOrder: false },
  { id: 't-027', category: 'טארטלטים', name: 'טארטלט פרימיום 600',   catalogNumber: '600',  sku: '0600',   flavor: 'מלוח',  size: '60/60×14 מ"מ', packageQty: '150 י"ח', isSpecialOrder: false },
  { id: 't-028', category: 'טארטלטים', name: 'טארטלט פרימיום 600',   catalogNumber: '600',  sku: '600',    flavor: 'מתוק',  size: '60/60×14 מ"מ', packageQty: '150 י"ח', isSpecialOrder: false },

  // ── טארט כפרי ───────────────────────────────────────────────────────
  { id: 't-029', category: 'טארטלטים', name: 'טארט כפרי',        catalogNumber: '044',  sku: '044',  flavor: 'ניטרלי', size: '48×16 מ"מ', packageQty: '240 י"ח', isSpecialOrder: true, imageUrl: '/products/t-029.jpg' },
  { id: 't-030', category: 'טארטלטים', name: 'טארט כפרי ירוק',   catalogNumber: '0442', sku: '0442', flavor: 'ניטרלי', size: '48×16 מ"מ', packageQty: '240 י"ח', isSpecialOrder: true, imageUrl: '/products/t-030.jpg' },
  { id: 't-031', category: 'טארטלטים', name: 'טארט כפרי ורוד',   catalogNumber: '0443', sku: '0443', flavor: 'ניטרלי', size: '48×16 מ"מ', packageQty: '240 י"ח', isSpecialOrder: true, imageUrl: '/products/t-031.jpg' },

  // ── פאיים (was בסיסי פאי) ─────────────────────────────────────────────
  { id: 'p-001', category: 'פאיים', name: 'בסיס פאי עגול',    catalogNumber: '8',  sku: '008', flavor: 'שוקו',  size: '90×14 מ"מ',  packageQty: '80 י"ח',  isSpecialOrder: true, imageUrl: '/products/p-001.jpg' },
  { id: 'p-002', category: 'פאיים', name: 'בסיס פאי עגול',    catalogNumber: '8',  sku: '08',  flavor: 'מלוח',  size: '90×14 מ"מ',  packageQty: '80 י"ח',  isSpecialOrder: false, imageUrl: '/products/p-002.jpg' },
  { id: 'p-003', category: 'פאיים', name: 'בסיס פאי עגול',    catalogNumber: '8',  sku: '8',   flavor: 'מתוק',  size: '90×14 מ"מ',  packageQty: '80 י"ח',  isSpecialOrder: false, imageUrl: '/products/p-003.jpg' },
  { id: 'p-004', category: 'פאיים', name: 'בסיס פאי בינוני',  catalogNumber: '12', sku: '012', flavor: 'מלוח',  size: '120×16 מ"מ', packageQty: '64 י"ח',  isSpecialOrder: false, imageUrl: '/products/p-004.jpg' },
  { id: 'p-005', category: 'פאיים', name: 'בסיס פאי בינוני',  catalogNumber: '12', sku: '12',  flavor: 'מתוק',  size: '120×16 מ"מ', packageQty: '64 י"ח',  isSpecialOrder: false, imageUrl: '/products/p-005.jpg' },
  { id: 'p-006', category: 'פאיים', name: 'בסיס פאי גדול',    catalogNumber: '24', sku: '10',  flavor: 'מתוק',  size: '240×18 מ"מ', packageQty: '10 י"ח',  isSpecialOrder: true, imageUrl: '/products/p-006.jpg' },

  // ── שוקולד (was בסיסי שוקולד למילוי) — active: false, chocolate dept paused ──
  { id: 'c-001', category: 'שוקולד', name: 'ספל קפה בינויו',    catalogNumber: '—', sku: '401/40/402', flavor: 'לבן פרווה / מריר',        size: '50×30 מ"מ', packageQty: '120 י"ח', isSpecialOrder: false, active: false },
  { id: 'c-002', category: 'שוקולד', name: 'כוס משוננת',         catalogNumber: '—', sku: '037/37',     flavor: 'לבן פרווה / 60% מריר',    size: '35×25 מ"מ', packageQty: '250 י"ח', isSpecialOrder: false, active: false },
  { id: 'c-003', category: 'שוקולד', name: 'כוס קטנה',           catalogNumber: '—', sku: '035/35',     flavor: 'לבן פרווה / 60% מריר',    size: '30×25 מ"מ', packageQty: '300 י"ח', isSpecialOrder: false, active: false },
  { id: 'c-004', category: 'שוקולד', name: 'חצי כדור גדול',      catalogNumber: '—', sku: '601/60',     flavor: 'לבן פרווה / 60% מריר',    size: '60×30 מ"מ', packageQty: '60 י"ח',  isSpecialOrder: false, active: false },
  { id: 'c-005', category: 'שוקולד', name: 'חצי כדור קטן',       catalogNumber: '—', sku: '501/50',     flavor: 'לבן פרווה / 60% מריר',    size: '50×25 מ"מ', packageQty: '100 י"ח', isSpecialOrder: false, active: false },
  { id: 'c-006', category: 'שוקולד', name: 'גביע עגול',           catalogNumber: '—', sku: '0262/262',   flavor: 'לבן פרווה / 60% מריר',    size: '50×30 מ"מ', packageQty: '120 י"ח', isSpecialOrder: false, active: false },
  { id: 'c-007', category: 'שוקולד', name: 'גביע מרובע',          catalogNumber: '—', sku: '0263/263',   flavor: 'לבן פרווה / 60% מריר',    size: '50×30 מ"מ', packageQty: '120 י"ח', isSpecialOrder: false, active: false },
  { id: 'c-008', category: 'שוקולד', name: 'גביע עגול נמוך',      catalogNumber: '—', sku: '025/25',     flavor: 'לבן פרווה / 60% מריר',    size: '38×16 מ"מ', packageQty: '180 י"ח', isSpecialOrder: false, active: false },
  { id: 'c-009', category: 'שוקולד', name: 'כוס גדולה',           catalogNumber: '—', sku: '0247/247',   flavor: 'לבן פרווה / 60% מריר',    size: '30×31 מ"מ', packageQty: '330 י"ח', isSpecialOrder: false, active: false },

  // ── שוקולד (was קישוטי שוקולד) — active: false, chocolate dept paused ──────
  { id: 'd-001', category: 'שוקולד', name: 'משולש עם חור',     catalogNumber: '—', sku: '2670/2671', flavor: 'לבן פרווה / 60% מריר', size: '32×80 מ"מ',    packageQty: '192 י"ח', isSpecialOrder: false, active: false },
  { id: 'd-002', category: 'שוקולד', name: 'כוס משוננת שוקולד', catalogNumber: '—', sku: '2320/2321', flavor: 'לבן פרווה / 60% מריר', size: '79×2 מ"מ',     packageQty: '168 י"ח', isSpecialOrder: false, active: false },
  { id: 'd-003', category: 'שוקולד', name: 'פולי קפה',           catalogNumber: '—', sku: '042/42',    flavor: 'לבן פרווה / 60% מריר', size: '10 מ"מ',        packageQty: '330 י"ח', isSpecialOrder: false, active: false },
  { id: 'd-004', category: 'שוקולד', name: 'משולש',              catalogNumber: '—', sku: '2570/2571', flavor: 'לבן פרווה / 60% מריר', size: '30×50 מ"מ',    packageQty: '288 י"ח', isSpecialOrder: false, active: false },
  { id: 'd-005', category: 'שוקולד', name: 'דיסקית עגולה',       catalogNumber: '—', sku: '2860/2861', flavor: 'לבן פרווה / 60% מריר', size: 'קוטר 40 מ"מ',  packageQty: '192 י"ח', isSpecialOrder: false, active: false },
  { id: 'd-006', category: 'שוקולד', name: 'עלה שוקולד',         catalogNumber: '—', sku: '039/39',    flavor: 'לבן פרווה / 60% מריר', size: '10 מ"מ',        packageQty: '800 י"ח', isSpecialOrder: false, active: false },
  { id: 'd-007', category: 'שוקולד', name: 'לב גדול',            catalogNumber: '—', sku: '3930/3931', flavor: 'לבן פרווה / 60% מריר', size: '31×34 מ"מ',    packageQty: '320 י"ח', isSpecialOrder: false, active: false },
  { id: 'd-008', category: 'שוקולד', name: 'כתם',                catalogNumber: '—', sku: '3250/3521', flavor: 'לבן פרווה / 60% מריר', size: '35 מ"מ',        packageQty: '192 י"ח', isSpecialOrder: false, active: false },
  { id: 'd-009', category: 'שוקולד', name: 'פרח שוקולד',         catalogNumber: '—', sku: '4101/4102', flavor: 'לבן פרווה / 60% מריר', size: '19 מ"מ',        packageQty: '672 י"ח', isSpecialOrder: false, active: false },
  { id: 'd-010', category: 'שוקולד', name: 'טבלת שוקולד',        catalogNumber: '—', sku: '2670/2671', flavor: 'לבן פרווה / 60% מריר', size: '30×45 מ"מ',    packageQty: '256 י"ח', isSpecialOrder: false, active: false },
  { id: 'd-011', category: 'שוקולד', name: 'מקל ארוך',           catalogNumber: '—', sku: '2420/2421', flavor: 'לבן פרווה / 60% מריר', size: '112×6 מ"מ',    packageQty: '288 י"ח', isSpecialOrder: false, active: false },
  { id: 'd-012', category: 'שוקולד', name: 'לב קטן',             catalogNumber: '—', sku: '2930/2931', flavor: 'לבן פרווה / 60% מריר', size: '15×15 מ"מ',    packageQty: '672 י"ח', isSpecialOrder: false, active: false },
  { id: 'd-013', category: 'שוקולד', name: 'ריבוע עם חור',       catalogNumber: '—', sku: '2720/2721', flavor: 'לבן פרווה / 60% מריר', size: '40×40 מ"מ',    packageQty: '192 י"ח', isSpecialOrder: false, active: false },

  // ── מאפים (was בסיסי מאפה) ────────────────────────────────────────────
  { id: 'w-001', category: 'מאפים', name: 'רול איטלקי ארוך',       catalogNumber: '—', sku: '252',  flavor: 'מתוק',   size: '75×20 מ"מ',    packageQty: '100 י"ח', isSpecialOrder: false, imageUrl: '/products/w-001.jpg' },
  { id: 'w-002', category: 'מאפים', name: 'גליליות וופל (ג\'וני)', catalogNumber: '—', sku: '254',  flavor: 'מתוק',   size: '55×25 מ"מ',    packageQty: '290 י"ח', isSpecialOrder: false, imageUrl: '/products/w-002.jpg' },
  { id: 'w-003', category: 'מאפים', name: 'פחזניות למילוי',         catalogNumber: '—', sku: '31',   flavor: 'ניטרלי', size: 'קוטר 50 מ"מ',  packageQty: '120 י"ח', isSpecialOrder: false, storageTemp: '-18°', imageUrl: '/products/w-003.jpg' },
  { id: 'w-004', category: 'מאפים', name: 'וופל בלגי אישי',         catalogNumber: '—', sku: '1002', flavor: 'מתוק',   size: '90×25 מ"מ',    packageQty: '90 י"ח',  isSpecialOrder: false },
  { id: 'w-005', category: 'מאפים', name: 'מיני וופל בלגי',         catalogNumber: '—', sku: '1001', flavor: 'מתוק',   size: '60×20 מ"מ',    packageQty: '150 י"ח', isSpecialOrder: true, imageUrl: '/products/w-005.jpg' },

  // ── מקרונים למילוי (was בסיסי מקרון) ──────────────────────────────────
  { id: 'm-001', category: 'מקרונים למילוי', name: 'בסיס מקרון בינוני', catalogNumber: '—', sku: '—', flavor: 'ניטרלי (ללא צבע מאכל)', size: '45 מ"מ', packageQty: '240 י"ח', isSpecialOrder: false, imageUrl: '/products/m-001.jpg' },
  { id: 'm-002', category: 'מקרונים למילוי', name: 'בסיס מקרון קטן',    catalogNumber: '—', sku: '—', flavor: 'ניטרלי (ללא צבע מאכל)', size: '30 מ"מ', packageQty: '400 י"ח', isSpecialOrder: false, imageUrl: '/products/m-002.jpg' },

  // ── מקרונים מלאים (unchanged) ──────────────────────────────────────────
  { id: 'mc-001', category: 'מקרונים מלאים', name: 'מקרון וניל מדגסקר',        catalogNumber: '—', sku: '908',  flavor: 'וניל מדגסקר',          size: '45 מ"מ', packageQty: '144 י"ח', isSpecialOrder: false, storageTemp: '-18°' },
  { id: 'mc-002', category: 'מקרונים מלאים', name: 'מקרון פטל',                catalogNumber: '—', sku: '909',  flavor: 'פטל',                  size: '45 מ"מ', packageQty: '144 י"ח', isSpecialOrder: false, storageTemp: '-18°', imageUrl: '/products/mc-002.jpg' },
  { id: 'mc-003', category: 'מקרונים מלאים', name: 'מקרון פסיפלורה',            catalogNumber: '—', sku: '904',  flavor: 'פסיפלורה',              size: '45 מ"מ', packageQty: '144 י"ח', isSpecialOrder: false, storageTemp: '-18°', imageUrl: '/products/mc-003.jpg' },
  { id: 'mc-004', category: 'מקרונים מלאים', name: 'מקרון פיסטוק',              catalogNumber: '—', sku: '903',  flavor: 'פיסטוק',               size: '45 מ"מ', packageQty: '144 י"ח', isSpecialOrder: false, storageTemp: '-18°', imageUrl: '/products/mc-004.jpg' },
  { id: 'mc-005', category: 'מקרונים מלאים', name: 'מקרון וניל צרפתי ביסקוטינה', catalogNumber: '—', sku: '901',  flavor: 'וניל צרפתי ביסקוטינה', size: '45 מ"מ', packageQty: '144 י"ח', isSpecialOrder: false, storageTemp: '-18°' },
  { id: 'mc-006', category: 'מקרונים מלאים', name: 'מקרון פירות יער',            catalogNumber: '—', sku: '905',  flavor: 'פירות יער',            size: '45 מ"מ', packageQty: '144 י"ח', isSpecialOrder: false, storageTemp: '-18°', imageUrl: '/products/mc-006.jpg' },
  { id: 'mc-007', category: 'מקרונים מלאים', name: 'מקרון קרמל מלוח',           catalogNumber: '—', sku: '9006', flavor: 'קרמל מלוח',            size: '45 מ"מ', packageQty: '144 י"ח', isSpecialOrder: false, storageTemp: '-18°', imageUrl: '/products/mc-007.jpg' },
  { id: 'mc-008', category: 'מקרונים מלאים', name: 'מקרון תות',                  catalogNumber: '—', sku: '902',  flavor: 'תות',                  size: '45 מ"מ', packageQty: '144 י"ח', isSpecialOrder: false, storageTemp: '-18°', imageUrl: '/products/mc-008.jpg' },
  { id: 'mc-009', category: 'מקרונים מלאים', name: 'מקרון קפה',                  catalogNumber: '—', sku: '9077', flavor: 'קפה',                  size: '45 מ"מ', packageQty: '144 י"ח', isSpecialOrder: false, storageTemp: '-18°', imageUrl: '/products/mc-009.jpg' },

  // ── מרנגים (was מרנג) ──────────────────────────────────────────────────
  { id: 'mr-001', category: 'מרנגים', name: 'נשיקות מרנג',   catalogNumber: '—', sku: '—',    flavor: 'לבן', size: 'קוטר 20 מ"מ', packageQty: '16 י"ח',  isSpecialOrder: false, imageUrl: '/products/mr-001.jpg' },
  { id: 'mr-002', category: 'מרנגים', name: 'פבלובה עגולה',  catalogNumber: '—', sku: '8211', flavor: 'לבן', size: '45×15 מ"מ',   packageQty: '120 י"ח', isSpecialOrder: false },
  { id: 'mr-003', category: 'מרנגים', name: 'פבלובה לב',     catalogNumber: '—', sku: '831',  flavor: 'לבן', size: '35/50×15 מ"מ', packageQty: '120 י"ח', isSpecialOrder: false },

  // ── קינוחים מוכנים (was קינוחים מוגמרים) ────────────────────────────────
  { id: 'f-001', category: 'קינוחים מוכנים', name: 'פחזניות קרמבל חום',               catalogNumber: '—', sku: '0305ז', flavor: 'שוקולד',    size: '45×30 מ"מ', packageQty: '120 י"ח', isSpecialOrder: false, imageUrl: '/products/f-001.jpg' },
  { id: 'f-002', category: 'קינוחים מוכנים', name: 'פחזניות קרמבל סגול',              catalogNumber: '—', sku: '0309ז', flavor: 'קרם וניל',  size: '45×30 מ"מ', packageQty: '120 י"ח', isSpecialOrder: false, imageUrl: '/products/f-002.jpg' },
  { id: 'f-003', category: 'קינוחים מוכנים', name: 'פחזניות קרמבל אדום',              catalogNumber: '—', sku: '0305ז', flavor: 'קרם וניל',  size: '45×30 מ"מ', packageQty: '120 י"ח', isSpecialOrder: false, imageUrl: '/products/f-003.jpg' },
  { id: 'f-004', category: 'קינוחים מוכנים', name: 'פחזניות קרמבל לבן',               catalogNumber: '—', sku: '0305ז', flavor: 'קרם וניל',  size: '45×30 מ"מ', packageQty: '120 י"ח', isSpecialOrder: false, imageUrl: '/products/f-004.jpg' },
  { id: 'f-005', category: 'קינוחים מוכנים', name: 'טארט אישי ממולא תפוחים',         catalogNumber: '—', sku: '0331',  flavor: 'תפוחים',    size: '60×11 מ"מ', packageQty: '75 י"ח (15/מגש)', isSpecialOrder: false },
  { id: 'f-006', category: 'קינוחים מוכנים', name: 'טארט אישי ממולא פירות יער',      catalogNumber: '—', sku: '0335',  flavor: 'פירות יער', size: '60×11 מ"מ', packageQty: '75 י"ח (15/מגש)', isSpecialOrder: false },
  { id: 'f-007', category: 'קינוחים מוכנים', name: 'טארט אישי ממולא עוגת שוקולד',   catalogNumber: '—', sku: '0337',  flavor: 'שוקולד',    size: '60×11 מ"מ', packageQty: '75 י"ח (15/מגש)', isSpecialOrder: false },
  { id: 'f-008', category: 'קינוחים מוכנים', name: 'כדורי שוקולד בציפוי קוקוס',      catalogNumber: '—', sku: '6611',  flavor: 'קוקוס',     size: '—',         packageQty: '300 י"ח',         isSpecialOrder: false, imageUrl: '/products/f-008.jpg' },
  { id: 'f-009', category: 'קינוחים מוכנים', name: 'כדורי שוקולד בציפוי סוכריות',    catalogNumber: '—', sku: '6622',  flavor: 'סוכריות',   size: '—',         packageQty: '300 י"ח',         isSpecialOrder: false, imageUrl: '/products/f-009.jpg' },

  // ── קינוחים מוכנים (was כוסות קינוחים) ──────────────────────────────────
  { id: 'g-001', category: 'קינוחים מוכנים', name: 'קרמו שוקולד לבן – ציפוי תות',       catalogNumber: '—', sku: '1122', flavor: 'תות',       size: '9×9 יח\'/מגש', packageQty: '81 י"ח', isSpecialOrder: false, groupBaseName: 'קרמו שוקולד לבן' },
  { id: 'g-002', category: 'קינוחים מוכנים', name: 'קרמו שוקולד לבן – ציפוי פיסטוק',    catalogNumber: '—', sku: '1133', flavor: 'פיסטוק',    size: '9×9 יח\'/מגש', packageQty: '81 י"ח', isSpecialOrder: false, groupBaseName: 'קרמו שוקולד לבן' },
  { id: 'g-003', category: 'קינוחים מוכנים', name: 'קרמו שוקולד לבן – ציפוי קרמל',      catalogNumber: '—', sku: '1144', flavor: 'קרמל',      size: '9×9 יח\'/מגש', packageQty: '81 י"ח', isSpecialOrder: false, groupBaseName: 'קרמו שוקולד לבן' },
  { id: 'g-004', category: 'קינוחים מוכנים', name: 'קרמו שוקולד לבן – ציפוי פירות יער', catalogNumber: '—', sku: '1155', flavor: 'פירות יער', size: '9×9 יח\'/מגש', packageQty: '81 י"ח', isSpecialOrder: false, groupBaseName: 'קרמו שוקולד לבן' },
  { id: 'g-005', category: 'קינוחים מוכנים', name: 'קרמו שוקולד לבן – ציפוי שוקולד',    catalogNumber: '—', sku: '1177', flavor: 'שוקולד',    size: '9×9 יח\'/מגש', packageQty: '81 י"ח', isSpecialOrder: false, groupBaseName: 'קרמו שוקולד לבן' },
  { id: 'g-006', category: 'קינוחים מוכנים', name: 'קרמו שוקולד לבן – ציפוי פסיפלורה',  catalogNumber: '—', sku: '1188', flavor: 'פסיפלורה',  size: '9×9 יח\'/מגש', packageQty: '81 י"ח', isSpecialOrder: false, groupBaseName: 'קרמו שוקולד לבן' },
]

/** The live catalog the app shows — excludes paused product lines (currently: the chocolate department, see the header comment above). */
export const products: Product[] = ALL_PRODUCTS.filter(p => p.active !== false)
