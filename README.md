# LEYNI — Boutique Iceland

Storefront for **Leyni**, a mulberry-silk scarf label designed in Iceland.

Editorial print-magazine minimalism: black / crisp white / raw linen, large Cormorant serif headlines over small tracked Gill Sans labels, asymmetric editorial grids (no standard product grid), sharp corners, underline links, subtle scroll reveals. Campaign line: "Think silk, think north."

## Pages

| File | Purpose |
|---|---|
| `index.html` | Editorial home — hero, story, featured scarves, craft, men's teaser, newsletter |
| `shop.html` | Full collection grid (9 designs) with quick-add |
| `product.html?s=<slug>` | Scarf detail — gallery, per-scarf story, size, quantity, add to bag |
| `styles.css` | Shared design system |
| `app.js` | Collection data, EN/IS i18n, cart, cart drawer, scroll reveals |

## Features

- **Bilingual** EN / IS toggle (top-right), persists across pages and auto-detects Icelandic browsers.
- **Cart** with slide-out drawer, quantities, subtotal — stored in `localStorage`.
- Fully responsive; slow scroll-reveal motion (respects `prefers-reduced-motion`).

## Run locally

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Shopify-ready

The design is structured to move onto Shopify: `SCARVES` data in `app.js` maps to products/variants, the cart drawer maps to Shopify's cart, and the `Checkout` button is where Shopify checkout connects. Until then it runs as a static prototype (no real payments).

## Notes

- Price is `14.900 kr` — set per scarf in the admin Stock page; `PRICE` in `app.js` and the JSON-LD in `shop.html`/`product.html` are the static fallback. Contact email is `hello@leyni.com`.
- Signature colours are sampled from the artwork and defined per scarf in `app.js`.
- Nine women's designs (88×88 cm). Men's "rivers" set (55×55 cm) shown as *coming soon*.
- Designs by Icelandic artist Margrét Júlíana Sigurðardóttir · 100% mulberry silk · OEKO-TEX® certified.
