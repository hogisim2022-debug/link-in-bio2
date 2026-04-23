# Icons

This folder contains local icon assets used by the design system.

## Primary icon set: Lucide (CDN substitution)

Starbucks' internal icon set is proprietary. We substitute **Lucide** icons (outline, rounded stroke, 2px weight) — visually the closest public match.

**Usage in HTML:**
```html
<script src="https://unpkg.com/lucide@latest"></script>
<!-- then use <i data-lucide="home"></i> + lucide.createIcons() -->
```

Or reference individual SVGs from `https://cdn.jsdelivr.net/npm/lucide-static/icons/<name>.svg`.

**Icons referenced in this system:**
- `home` — app tab bar home
- `credit-card` — Pay tab
- `shopping-bag` — Order / Frap button (filled variant)
- `gift` — Gift tab
- `more-horizontal` — Other tab
- `bell` — notifications
- `ticket` — coupons
- `chevron-left` / `chevron-right` — navigation
- `chevron-down` — dropdowns
- `info` — nutrition info tooltips
- `search` — header search
- `user` — account
- `map-pin` — Find a store

## Local assets
- `star-filled.svg` — filled star glyph (Rewards gold star indicator)
