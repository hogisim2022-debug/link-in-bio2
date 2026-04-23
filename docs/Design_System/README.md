# Starbucks Design System

A design system inspired by Starbucks — specifically the Starbucks Rewards and mobile ordering experience, with a Korean-market flavor in the reference material. This system captures the warm, confident retail aesthetic of Starbucks: the green apron pulled across every surface, cream café-material canvases, SoDoSans typography, and the signature floating "Frap" order button.

## Sources

- **Uploaded reference:** `uploads/star.png` — a screenshot of the Korean Starbucks mobile app showing the home feed ("Dream Away", Delivers CTA, recommended menu, bottom tab bar) and the Rewards page (Green Level membership, tier benefits, stars-to-Gold progress).
- **Extracted knowledge** of Starbucks' public web design system (rewards, gift cards, menu PDP, nutrition) is captured in-brief across this project.

No codebase or Figma file was attached — this system is synthesized from the uploaded reference + extracted token documentation.

## Missing sources / caveats

- **SoDoSans is proprietary** — we use Inter as a public substitute. Drop real `.woff2` files into `fonts/` and swap `@import` for `@font-face` if you have them.
- **Lander Tall is proprietary** — we use Lora as a substitute on Rewards serif moments.
- **Iconography** — Starbucks' sprite isn't public. We use Lucide (CDN) as the closest visual match; swap in real SVGs if provided.
- **Gift-card illustrations** — real Starbucks gift cards are illustrated photographs. Our kit uses color-block gradient placeholders.
- **Hero product photography** — the website kit uses a blob-shape gradient where a real product photograph would go.

## Products represented

1. **Starbucks Website** — marketing and ordering pages (homepage hero, gift cards, rewards, menu PDP, nutrition)
2. **Starbucks Mobile App** — home feed, rewards, order flow (matching the Korean reference image)

## Index / manifest

- `README.md` — this file (context, content & visual fundamentals, iconography)
- `colors_and_type.css` — CSS custom properties: all color tokens, type scale, spacing, radius, shadow tokens, plus semantic element defaults
- `fonts/` — web font stylesheet (Google Fonts Inter + Manrope substitutes; Lora for rewards serif; Kalam for careers script)
- `assets/` — logos, icons, reference imagery
- `preview/` — small HTML cards that populate the Design System tab (colors, type, components, etc.)
- `ui_kits/website/` — marketing/ordering website UI kit
- `ui_kits/app/` — mobile app UI kit
- `SKILL.md` — agent-skill manifest so this system can be downloaded and used in Claude Code

## CONTENT FUNDAMENTALS

Starbucks copy is **warm, concise, and invitational** — friendly but never over-casual, confident but never corporate. Language feels like a barista's welcome: direct, personable, and optimistic.

**Voice principles**
- **Second person, welcoming.** "Join now", "Start an order", "Give them a try", "Earn Stars, get Rewards". The reader is always addressed as *you*.
- **Verbs first for CTAs.** Almost every action starts with a verb: *Explore*, *Start*, *Join*, *See*, *Order*, *Find*. No "Click here" / "Learn more" filler unless it's paired with directional context.
- **Short, rhythmic headlines.** "Free coffee is just the beginning." / "Dream Away." / "Pay with change you'll love." — declarative, often 3–6 words, often with an em-dash or period giving it a confident beat.
- **Sentence case almost everywhere.** "Start an order", not "Start An Order". Uppercase is reserved for small category labels and some chalkboard-style moments on Rewards.
- **Numbers spelled as numerals** for reward counts: *9/30★*, *21★ until Gold Level*, *200★ item*. Stars use the `★` filled glyph.
- **Korean localization** (from reference): mixes Hangul with English terms like "Dream Away", "Delivers", "Green Level", "Gold Level" — brand-English remains in English, ambient copy localizes.

**Tone examples**
- Welcome: *"덥덥아이티님과 함께 Dream Away ✨"* — familiar, a little playful
- Progress: *"Gold Level까지 21잔의 별이 남았습니다."* — factual, motivating
- Rewards value: *"Free coffee is just the beginning."*
- Seasonal: *"Explore our afternoon menu"* / *"See the spring menu"*

**Do / Don't**
- ✅ Warm, direct, action-oriented, celebratory of small moments
- ✅ Use the customer's name where possible ("덥덥아이티님")
- ✅ Stars as `★` glyph, not spelled out
- ❌ No corporate hedging ("solutions", "leverage", "synergy")
- ❌ No emoji flood — a single sparkle `✨` on a nickname moment is the ceiling
- ❌ No sentence-long CTAs — if it doesn't fit on a pill button, it's too long

---

## VISUAL FOUNDATIONS

### Colors
Four-tier green system, each green mapped to a surface role (never a single "brand green"). Warm cream canvases (`#f2f0eb` / `#edebe9`) reference café materials — paper napkins, wood, the walls — and replace pure white. Gold (`#cba258`) is reserved for Rewards status ceremony only; it never appears as a general-purpose accent. Semantic red (`#c82014`) for errors, yellow (`#fbbc05`) for warnings. Body text sits at `rgba(0,0,0,0.87)` — never pure black — to match canvas warmth. See `colors_and_type.css` for the full token list.

### Type
SoDoSans is Starbucks' proprietary typeface; **we substitute with Inter (primary)** — a humanist geometric sans with similar proportions and wide weight range. Rewards page uses Lora as a stand-in for the proprietary Lander Tall serif. Careers-style "cup name" moments use Kalam (Google Fonts, used directly). Universal `-0.01em` / `-0.16px` tracking across the whole system — the slightly tight tracking is load-bearing and gives the type its confident presence. Hierarchy comes from *weight + color shifts*, not just size: H1 and H2 are both 24px/36px, separated only by weight (600 vs 400) and color (Starbucks Green vs Text Black).

### Spacing
Rem-based scale anchored at `1rem = 10px` via `font-size: 62.5%` on root. `--space-3: 1.6rem` (16px) is the universal rhythm constant — default card padding, outer gutter, body text. Scale steps: 4 / 8 / 16 / 24 / 32 / 40 / 48 / 56 / 64 px. Outer gutter scales with viewport: 16 → 24 → 40px.

### Backgrounds
Solid color-block surfaces — **no gradient system**. Page rhythm alternates: Cream hero → White content → Dark-green feature band → Cream utility → Dark-green footer. Imagery is photographic (product shots, app-in-hand, illustrated gift cards). Never full-bleed gradient hero; never patterned textures; never generated graphics. Gift cards are distinct illustrated photographs (painted, hand-drawn feel), not generated art.

### Animation
Measured and restrained. `transform: scale(0.95)` on active/press is the **signature micro-interaction** — universal across every button. Transitions at `0.2s ease` for buttons, `0.3s ease-in` for image fades, `300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` for expanders (accordions). Form option-icon uses a slightly springy `cubic-bezier(0.32, 2.32, 0.61, 0.27)`. Never bouncy for bouncy's sake — animation supports confidence, not playfulness.

### Hover states
Subtle — background shifts one step deeper (e.g. `#00754A` → `#1e3932` on CTAs), or a soft opacity lift on secondary links. No glow, no scale-up on hover. Hover is reserved for desktop; mobile gets the press state only.

### Press states
Universal `scale(0.95)` + `0.2s ease`. Some buttons dim the ambient shadow layer (Frap collapses its `0 8px 12px` ambient to zero alpha on press). That's it — no color inversion, no ripple.

### Borders
`1px solid` on outlined buttons (matching the fill color). Form inputs: `1px solid #d6dbde` default; focus shifts to Green Accent. Hairlines in nutrition tables: `1px solid #e7e7e7`. Radius is always either `12px` (cards/modals), `4px` (inputs), `50px` full-pill (buttons), or `50%` (circles).

### Shadows
**Whisper-soft, layered**. Two to three low-alpha shadows stacked with different offsets simulate ambient + direct light, instead of one heavy drop shadow.
- Card: `0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)`
- Global nav: three-layer soft lift
- Frap floating CTA: `0 0 6px rgba(0,0,0,0.24), 0 8px 12px rgba(0,0,0,0.14)` — the most elevated element anywhere

### Protection gradients vs capsules
No protection gradients. When text sits over imagery, Starbucks relies on a solid color-block band (cream or House Green) rather than a gradient fade.

### Layout rules
Fixed elements: global nav (top), Frap floating circular CTA (bottom-right), cookie consent (top initially). Asymmetric 40/60 hero split (image / content) at desktop, stacking below 768px. Content caps at `--columnWidthXLarge: 1440px`.

### Transparency & blur
Used sparingly. `rgba(0,0,0,0.87)` body text and `rgba(255,255,255,0.70)` secondary-on-dark are the workhorses. No backdrop-blur. No glassmorphism.

### Imagery color vibe
Warm — coral, sage, amber, cream backgrounds in product photography. Beverage shots in clear glass against colored backdrops. Never cold blue, never black-and-white, never grainy. App-in-hand photography is angled and personal.

### Corner radii
- `12px` — cards, modals, menu tiles
- `4px` — form inputs
- `50px` — all buttons (full pill)
- `50%` — Frap button, avatars, cup icons

### Cards
White background, 12px radius, whisper-soft dual shadow (`0 0 0.5px / 0.14` + `0 1px 1px / 0.24`). Contents padded 16–24px. No border — the shadow does the lifting. On cream canvas, cards read as gently floated tiles.

---

## ICONOGRAPHY

Starbucks does not publish an open icon font. The reference app uses a **small set of outlined, rounded-stroke icons** (2px stroke, rounded line-caps) for navigation, actions, and status — visually aligned with Lucide / Heroicons (outline variant).

**Approach**
- **Outline, rounded stroke, 24px default** — matches the app tab bar (Home, Pay, Order, Gift, Other) and the Rewards chevron/bell/coupon motifs
- **Filled variants** appear in two contexts only: the `★` Rewards star (filled gold) and the shopping-bag icon inside the filled Frap CTA (filled white)
- **SVGs, not emoji** — emoji appears sparingly in copy (a single `✨` sparkle on nickname moments) but never as a UI icon

**Icon source for this system**
- **Lucide** (via CDN) as the substitute icon set — same stroke weight and rounded-line aesthetic as Starbucks' app. See `assets/icons/` for a copy of the pack used locally and `ui_kits/*/index.html` for CDN reference.
- ⚠️ **Substitution flag:** Starbucks' internal icon sprite is proprietary. Lucide is the nearest visual match. If the user provides the real Starbucks icon SVGs, swap them in here.

**Logos**
- `assets/logos/starbucks-siren.svg` — the simplified siren (wordless) circular logo in Starbucks Green
- `assets/logos/starbucks-wordmark.svg` — the "Starbucks" wordmark in Starbucks Green (used in top-nav)

**Reference imagery**
- `assets/reference/starbucks-korea-app.png` — the original uploaded reference (Korean Starbucks app)

**Emoji / Unicode usage**
- `★` filled star (U+2605) — Rewards currency glyph, gold when on light surfaces
- `✨` sparkles — single instance allowed on welcome/nickname moments
- `→` arrows occasionally in link-styled CTAs
- Never: 🚀 💥 ❤️ 🔥 — no decorative emoji anywhere
