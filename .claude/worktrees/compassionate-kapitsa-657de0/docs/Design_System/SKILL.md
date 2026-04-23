---
name: starbucks-design
description: Use this skill to generate well-branded interfaces and assets for Starbucks, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map of this design system
- `README.md` — full context, content & visual fundamentals, iconography
- `colors_and_type.css` — CSS custom properties for every color, type, spacing, radius, shadow token + semantic defaults
- `fonts/` — font substitution docs (Inter → SoDoSans, Lora → Lander Tall, Kalam direct)
- `assets/logos/` `assets/icons/` `assets/reference/` — brand imagery
- `preview/` — small per-token specimen cards
- `ui_kits/app/` — mobile app UI kit (Home / Rewards / Order) with React components
- `ui_kits/website/` — website UI kit (nav, hero, feature band, Rewards tiers, gift grid, footer) with React components

## Non-negotiables when designing in this system
1. Warm cream canvas (`#f2f0eb`) — never pure white
2. Four-tier green, each mapped to a role — never a single "brand green"
3. Gold (`#cba258`) only for Rewards status — never a general accent
4. 50px full-pill on every button, always. `transform: scale(0.95)` on active.
5. Body text at `rgba(0,0,0,0.87)` — never pure black
6. Universal `-0.01em` letter-spacing on SoDoSans (Inter substitute)
7. No gradients — solid color-block surfaces
8. Frap floating circular CTA (56px, Green Accent, 2-layer shadow) is the signature elevation element
