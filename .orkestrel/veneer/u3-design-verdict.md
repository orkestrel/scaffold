# U3 design round — verdict

Round of 2026-09-20 on `units/u3-design-brief.md`. Subjective lane: `planner` on native Opus 5
(`units/u3-design-planner-report.md`, journal `native`). Objective lane: `analyst` on Astra
through `codex exec --sandbox read-only` (`units/u3-design-analyst-report.md`, journal
`units/u3-design-analyst.sh`, thread `01a0bdbf-34ce-7132-8c13-15e4d7f92b61`). Both lanes ran,
blind, on the same brief. No checker ran: the round produced proposals, not mechanical criteria.

## What both lanes found

- The calibration was narrower than U3's scope: no semantic hue beyond the primary, no canvas
  background, only the first font family, no `-rgb` triplets, no breakpoints or z-index ladder.
  The Orchestrator answered with calibration run 6 (variant buttons, the subtle and filled tiers,
  the page canvas), the `srgb-probe` and `paint-probe` instruments (the triplets, including the
  painted value of the out-of-gamut dark primary), and the full font stack from the readings.
- The design brief's "every value from the calibration" and the plan's alias obligation conflict
  for values Elements never defines. Ruling: the planner's value-source law stands. A token takes
  the calibration row that measures it; where none does, Bootstrap 5.3.8's own value from
  `inventory.json`, recorded as retained with its reason; where neither exists, the token is not
  declared in U3. The guide's reference map carries the source per token.

## Rulings

| Question | Ruling | Reason |
| --- | --- | --- |
| Registry shape | The planner's: `TOKEN_NAMES` in `src/core/constants.ts` is the sole literal home; `TokenMap = typeof TOKEN_NAMES`, `TokenName = TokenLeaf<TokenMap>` in `src/core/types.ts`; a path is its name (`color.primary.subtle` → `--vn-color-primary-subtle`) | one copy of every name; exhaustive by construction; the runtime parity proof is the cascade test |
| Semantic roles | Bootstrap's role names as the compatibility axis (`primary`, `secondary`, `success`, `info`, `warning`, `danger`, `light`, `dark`), each with `base`, `rgb`, `subtle`, `emphasis`, `border`; Elements' measured bases where run 6 read them (`primary`, `secondary`, `success`, `warning`, `danger`, and `information` as `info`), Bootstrap's for `light` and `dark`; Elements' `tertiary` added as a Veneer role with no `--bs-` alias and recorded as an addition | the roles are Bootstrap's wire vocabulary; the values are Elements' identity |
| Tiers | The planner's derivation law with Elements' percentages, not Bootstrap's: run 6 measured every role's subtle text, surface, and border in both modes as Elements' own oklab mixes (`calibration.md` § Semantic roles and canvas), so `subtle`, `emphasis`, and `border` are `color-mix(in oklab, …)` expressions over each role's fill whose percentages the unit reads from Elements' token source (`C:/Users/mikes/WebstormProjects/elements/src/styles/_tokens.scss`, read only) and proves against the measured strings; authored once in a `palette-each` mixin | Elements' identity is measured; a derivation over the fill carries Veneer's primary through its own tiers |
| Role fills | Elements' measured fills for `primary`, `secondary`, `success`, `warning`, `danger`, `info` (Elements' `information`) and the added `tertiary`; only the primary retunes by mode, per the readings | the readings |
| Canvas | `--vn-surface-body-base` light `rgb(255, 255, 255)`, dark `oklch(0.21 0.013 256)` (run 6 `canvas-body`), not the dialog surface's `rgb(18, 18, 18)` | the canvas reading exists now |
| `-rgb` triplets | Static literals in SCSS from the painted readings (`paint-probe`), never computed at build or run time; the dark primary is `0, 172, 236` | values live in SCSS; the engine paints the clipped colour |
| Theme layering | Both partials inside `@layer theme`; `:root` carries the light closure, `[data-bs-theme='light']` and `[data-bs-theme='dark']` re-declare the theme-dependent closure; `color-scheme` is declared in `_theme.scss` only; no `prefers-color-scheme` block | an unlayered `:root` would beat a layered island on the same element; `_body.scss` must not freeze the scheme |
| Factors | `--vn-factor-density`, `-radius`, `-elevation`, `-motion` registered with `@property` as `<number>`, `inherits: true`, `initial-value: 1`; no colour token is registered | registration gives deterministic fallback and keeps nested islands intact (`tokens.md:124`) |
| Naming | Full words for Veneer scales (`--vn-radius-small`, `-base`, `-large`, `-xlarge`, `-xxlarge`, `-pill`; `--vn-size-1` … `-8`; `--vn-space-1` … `-8`); Bootstrap's breakpoint names kept verbatim (`--vn-breakpoint-xs` … `-xxl`) because they are the documented wire vocabulary | `names.md` bans abbreviations in Orkestrel identifiers; breakpoint names are external values |
| Hover and active tints | Deferred to U7 Button with run 6's per-variant readings as its calibration | both lanes: the mix formula is not calibrated and its first consumer is Button |
| Component surfaces | Elements' popover, drawer, and hint surfaces are not body tiers; they land with their components | the analyst and the planner agree |
| Mixins | `transition`, `reduced-motion`, `forced-colors`, `palette-each` in U3; `focus-ring` and `breakpoint-down` deferred to their first consumers | the minimal-API creation gate |
| `_body.scss` | Font, size, line height, weight, canvas and text colours; no transition on the body (Elements reads `all 0s`); the mixin proof mounts a test fixture stylesheet (`tests/src/styles/fixtures/`) compiled by Vite rather than an uncalibrated body transition | no uncalibrated appearance from U3 |
| `_html.scss` | `interpolate-size: allow-keywords`, `text-size-adjust: 100%`; `scroll-padding` deferred to the first sticky consumer | unmeasured value |
| Core proof placement | No `tests/src/core/constants.test.ts` (`tests.md:43`); the freeze, path-law, listener-free, and DOM-free readings extend the seeded `tests/src/core/index.test.ts` | the rule bars a constants-only proof |
| RTL | The byte copy stands for U3, plus a proof in `index.test.ts` that no rule in the shipped cascade declares a physical inline-axis property (`margin-left`, `padding-right`, `left`, `right`, `border-left*`, `border-right*`, `text-align: left|right`) | logical-only authoring makes the copy correct by construction |
| Bootstrap-only retunes | `--bs-btn-close-filter`, `--bs-carousel-*`, and the dark-only data-URI variables keep Bootstrap's values in the alias scope; their canonical tokens land with their components | no consumer in U3 |
| Oracle list | The `--bs-*` root list for the parity test is an exported constant in `tests/setupStyles.ts` authored from `inventory.json`; U4b proves it against the installed `bootstrap.css` | no foreign specifier in `tests/**` |

## Dropped

- The analyst's proposal to hold U3 until every open reading exists: the readings now exist
  (run 6, the two probes), and what stays open (`scroll-padding`, the disabled host's opacity and
  cursor) is deferred by name.
- The planner's body colour transition: an uncalibrated appearance.

## Carried into the U3 brief

Every ruling above; the run 6 rows in `research/calibration.md`; the triplets in
`research/instruments.md`; the hosted-guide name check for `TokenMap`, `TokenName`, `TokenLeaf`,
`TOKEN_NAMES` (free on 2026-09-20 per the planner's read).
