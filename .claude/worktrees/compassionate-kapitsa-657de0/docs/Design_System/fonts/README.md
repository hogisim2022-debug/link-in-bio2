# Fonts

Starbucks uses three proprietary / specialty typefaces. This folder documents what we substitute with.

| Original | Role | Substitute (Google Fonts) | Notes |
|---|---|---|---|
| **SoDoSans** | Primary UI / all surfaces | **Inter** (weights 400–700) | Closest humanist-geometric sans. Tight `-0.01em` tracking still reads well. |
| **Lander Tall** | Rewards editorial headlines | **Lora** (weights 400–600, italic) | Warm editorial serif. |
| **Kalam** | Careers "cup name" moments | **Kalam** (weights 400, 700) | Direct match — Kalam is available on Google Fonts. |

All three are loaded via `@import` at the top of `colors_and_type.css`.

⚠️ **Substitution flag:** SoDoSans and Lander Tall are proprietary and not publicly redistributable. If the user can provide the real font files (licensed .woff2), drop them here and swap the `@import` for `@font-face` declarations pointing to the local files.
