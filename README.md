# LEYNI — Silk of Iceland

Storefront for **Leyni**, a mulberry-silk scarf label designed in Iceland.

Cold-white photographic minimalism modelled on the Squarespace **Manor** template, typeset in **Gill Sans** (matching the Kynning 2026 deck; Hanken Grotesk fallback). Colour appears only as small per-scarf swatch chips sampled from the artwork.

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

- Prices (`26.900 kr`) and contact email (`hello@leyni.is`) are placeholders — edit `PRICE` in `app.js` and links in the footers.
- Signature colours are sampled from the artwork and defined per scarf in `app.js`.
- Nine women's designs (88×88 cm). Men's "rivers" set (55×55 cm) shown as *coming soon*.
- Designs by Icelandic artist Margrét Júlíana Sigurðardóttir · 100% mulberry silk · OEKO-TEX® certified.
