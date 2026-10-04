# Tokens: the consumer proposal (R11, 2026-10-04)

Planner `consumer`, blind to the other proposals. The angle: a Tailwind project imports the layer, and Bootstrap's components read as native to its Tailwind theme. Every ruling follows from what that consumer can name and check: a class they write (`bg-blue-100`, `border-gray-300`, `md:`), a theme variable they set (`--font-sans`, `--radius-md`), or a contrast they can measure.

The proposal in three sentences. Bootstrap's colors take the Tailwind step a consumer would name for the same role (`primary` is `blue-600`, `--bs-gray-300` is `gray-300`, `.alert-primary` is `blue-100` under `blue-800`), every value Bootstrap derives by an amount is recomputed with Bootstrap's own algebra over those inputs, and a WCAG floor overrides a step where the name alone would read worse. Colors ship as resolved sRGB hex pinned to the installed Tailwind 4.3.3 palette, while font stacks, radii, and shadows ship as `var(--TOKEN, FALLBACK)` references that follow the consumer's `@theme`. Breakpoints and container widths align to Tailwind's, so `md:` and `-md-` agree and `container mx-auto px-4` reads as Tailwind's container.

Sources, cited by tag:

- [P]: `probe-report.md`, `inventory.json`, `nearest.json`, `scales.json`, `tailwind-theme.json` (GPT-6 Astra, 2026-10-04).
- [S]: `scout-distillate.md` (Grok 4.7, 2026-10-04).
- [V]: `../design-verdict.md`, § 12 corrections applied.
- [C]: this planner's contrast run, 2026-10-04: WCAG 2 relative luminance over the `tailwind-theme.json` clipped hexes, Bootstrap's integer `mix` (round half up per channel), 93 pairings; scripts in the planner scratchpad (`contrast.cjs`, `map.cjs`, `table.cjs`), to be re-run by T1 as a durable probe.
- [T]: this planner's compile run, 2026-10-04: Tailwind 4.3.3 `compile` from `node_modules/tailwindcss/dist/lib.mjs` over `@import 'tailwindcss'` plus a `@layer bootstrap { :root { … } }` block, `build([])`.

## Findings that correct the brief's facts

1. A `var()` reference to a Tailwind theme variable in a plain declaration marks it used, so Tailwind emits it [T]. `--bs-primary: var(--color-blue-600)` emits `--color-blue-600: oklch(54.6% 0.245 262.881)`; with `@theme { --color-blue-600: #7c3aed; }` it emits `#7c3aed`; with no reference nothing is emitted. The fallback form `var(--radius-md, 0.375rem)` behaves the same, and a consumer `--font-sans` and `--radius-md` flow through [T]. The optimizer calls `trackUsedVariables` on every non-theme declaration that contains `var(` (`lib.js`). A `reference` variable (`--shadow`, `@theme default inline reference`, `theme.css:503-510`) is never emitted [T], so the map never references one. The scout's sentence "the tuned sheet cannot reference Tailwind's custom properties" holds only for the unreferenced case.
2. The `unexcluded` face ("Tailwind without the layer") loads the unexcluded compile before the `./bootstrap` sheet [V § 5], so it shows Bootstrap's values. Only the `tailwindcss` face shows the map; Q6's "the two Tailwind faces show the map" does not hold.
3. No responsive rule changes state at 390, 768, or 1280 px when the grid breakpoints align (arithmetic over the 76 px media conditions in `src/bootstrap`, `grep` 2026-10-04): 390 is under both 576 and 640; at 768 `sm` and `md` hold under both maps and `lg` under neither (992, 1024); at 1280 `xl` holds under both (1200, 1280) and `xxl` under neither (1400, 1536). Only container max-widths move: 720 to 768 px at 768, 1140 to 1280 px at 1280.
4. Bootstrap's fluid type cap at `min-width: 1200px` is RFS's own breakpoint, not the grid's: `calc(1.375rem + 1.5vw)` reaches `2.5rem` exactly at 1200 px (22 + 18 = 40 px). Moving it to 1280 px makes `.h1` read 41.2 px at 1279 px and 40 px at 1280 px. Of the 20 `(min-width: 1200px)` source lines, 12 are RFS (6 in `_type.scss`, 5 in `_reset.scss`, 1 in `_utilities.scss`) and stay; 8 are grid-tied and move.
5. 95 of the 288 Tailwind colors lie outside sRGB [P `tailwind-theme.json`, `gamut: true`]. Of the 50 steps this map uses, 17 lie outside sRGB; the largest clip distance among them is OKLab 0.0225 for `yellow-500`, then 0.0165 for `cyan-500` and 0.0128 for `teal-400` [C].

## 1. Rulings

**Q1. Policy: name by role, base by nearest step, floor by contrast.** Ruling: every Bootstrap color takes a step from the Tailwind family that carries Bootstrap's hue name (`$blue` to `blue`, `$indigo` to `indigo`, `$purple` to `purple`, `$pink` to `pink`, `$red` to `red`, `$orange` to `orange`, `$yellow` to `yellow`, `$green` to `green`, `$teal` to `teal`, `$cyan` to `cyan`; the grays to `gray`). A token Bootstrap names by step takes the same-named Tailwind step (`--bs-gray-300` is `gray-300`); a role Bootstrap defines as a ramp step takes that step (light text-emphasis `$<hue>-800`, bg-subtle `100`, border-subtle `200`; dark text-emphasis `300`, border-subtle `700`), except the dark bg-subtle, which takes Tailwind's deepest step `950` because it lies nearest Bootstrap's shade 80 in every hue (OKLab 0.084 against 0.194 for blue, 0.072 against 0.202 for green) [C]. A hue base, which Bootstrap names without a step, takes the step of its family nearest Bootstrap's base by OKLab that holds the floor on every pairing: `blue-600` (0.038), `red-600` (0.051), `green-700` (0.043), `pink-600` (0.045), `orange-400` (0.027), `teal-400` (0.052), `indigo-600` (0.052), `purple-800` (0.077) [C]. `cyan` and `yellow` move one step from their nearest (`400`) to `500`, because `.text-info` and `.text-warning` on white read 1.81 and 1.57 at `400` against Bootstrap's 1.96 and 1.63 [C]; at `500` they read 2.37 and 1.91.

The contrast rule: every pairing Bootstrap ships reads at least the lesser of 4.5:1 and Bootstrap's own ratio for that pairing. Of the 93 pairings measured, the name rule fails one: `.alert-dark` reads `gray-700` on `gray-400` at 3.96 against Bootstrap's 5.47 [C], so `--bs-dark-bg-subtle` moves one step lighter to `gray-300` (7.00). `--bs-gray-400` stays `gray-400`. Reason: the consumer can read every row of the table as a class they already write. The alternatives fail on the consumer's terms: base `500` reads white text at 3.76 (`blue-500`), 3.81 (`red-500`), and 2.22 (`green-500`) [C]; nearest by ΔE puts the first candidate of 65 of the 163 spellings in `mist`, `olive`, `mauve`, `neutral`, `zinc`, or `slate` (planner grouping of `nearest.json`), so one Bootstrap gray ramp lands on six Tailwind families; Bootstrap's algebra over Tailwind bases yields colors no class names (tint 80 of `blue-600` is `#d0dffe`, `blue-100` is `#dbeafe`) [C].

The following excerpt of the 93 pairings [C] shows each candidate's weakest rows; T1's P3 re-measures the full matrix from the probe's conversions.

| Pairing | Bootstrap alone | This map | Base `500` |
| --- | --- | --- | --- |
| White on `.btn-primary` | 4.50 | 5.25 | 3.76 |
| White on `.btn-success` | 4.53 | 4.95 | 2.22 |
| White on `.btn-danger` | 4.53 | 4.77 | 3.81 |
| Black on `.btn-info`, `.btn-warning` | 10.72, 12.88 | 8.88, 10.99 | 8.88, 10.99 |
| `.alert-primary` light, dark | 10.28, 7.45 | 7.23, 8.15 | the same as this map |
| `.alert-dark` light | 5.47 | 7.00 after the move (3.96 by name) | the same as this map |
| Link on body, light and dark | 4.50, 6.39 | 5.25, 9.79 | 3.76 light |
| Body text, light and dark | 15.43, 11.85 | 17.75, 12.05 | the same as this map |
| `mark` text, dark | 6.14 | 4.65 | the same as this map |
| `.text-info`, `.text-warning` on white | 1.96, 1.63 | 2.37, 1.91 | 2.37, 1.91 |

**Q2. Derived values: Bootstrap's algebra over the mapped inputs.** Ruling: every value Bootstrap derives by an amount is recomputed with Bootstrap's integer `mix`: button hover and active (shade or tint 15, 20, 25, and 10 for borders, `.btn-light` by shade and `.btn-dark` by tint as Bootstrap writes them), focus shadow RGB (`mix(text, base, 15%)`), `$input-focus-border-color` (tint 50 of primary), `$form-range-thumb-active-bg` (tint 70), link hover (shade 20 light, tint 20 dark), table variants (background from the bg-subtle role, then border, striped, active, hover as `mix` of the variant's text color at 20, 5, 10, 7.5), `$light-bg-subtle` (`mix(gray-100, white)`, which lands on `gray-50` `#f9fafb` exactly), `$dark-bg-subtle-dark`, and `$body-tertiary-bg-dark` [C]. Alpha forms and `-rgb` triplets follow from the resolved sRGB of their input (`rgba(21, 93, 252, 0.25)` for the focus ring). Reason: no Tailwind class names a hover state, so the consumer has nothing to match, while Bootstrap's 15 < 20 < 25 order keeps the state hierarchy; the ramp-neighbor rule has no counterpart for tint 50, tint 70, or the table factors, and its `blue-600` to `blue-700` hover jumps from `#155dfc` to `#1447e6`.

**Q3. Scales.** Rulings, one per row:

- Radii follow by value, by reference: `--bs-border-radius-sm`, `--bs-border-radius`, `--bs-border-radius-lg`, `--bs-border-radius-xl`, `--bs-border-radius-xxl` read `var(--radius-sm, 0.25rem)`, `var(--radius-md, 0.375rem)`, `var(--radius-lg, 0.5rem)`, `var(--radius-2xl, 1rem)`, `var(--radius-4xl, 2rem)`; the pill keeps `50rem` (no equal token [S]). The default theme reads every radius unchanged (five equal rows [P]); a consumer `--radius-md` reaches every `.btn`, `.form-control`, `.card`, and `.alert` [T].
- Font stacks follow by reference: `--bs-font-sans-serif` reads `var(--font-sans, STACK)` and `--bs-font-monospace` reads `var(--font-mono, STACK)`, where `STACK` is Tailwind's literal default (`theme.css:2-7`). The reboot's body font then equals preflight's `html` font under any consumer `--font-sans` [T].
- Shadows follow by name, by reference: `--bs-box-shadow-sm` to `--shadow-sm`, `--bs-box-shadow` to `--shadow-md`, `--bs-box-shadow-lg` to `--shadow-lg`, `--bs-box-shadow-inset` to `--inset-shadow-xs`, each with Tailwind's literal as the fallback. `.shadow`, `.shadow-sm`, and `.shadow-lg` are shared names Tailwind owns already [V R1]; the tokens reach `.toast` and the components that read them.
- Type scale keeps Bootstrap's values: body size, weight, and line height equal Tailwind's (`1rem`, `400`, `1.5` [P]); headings, `.display-*`, `.lead`, `.fs-*`, and `.small` keep their sizes, the unitless `1.2`, and the fluid `calc()` forms. Reason: under the layer a bare heading is Tailwind's [V R4], so only Bootstrap-only names (`.h1`, `.fs-1`, `.modal-title`) carry this scale, and Tailwind has no heading scale to match; the equal rows already agree (h4, h5, h6, `.lead` [S]).
- Breakpoints align: `sm`, `md`, `lg`, `xl`, `xxl` read `40rem`, `48rem`, `64rem`, `80rem`, `96rem` in every grid-tied media condition, the `$breakpoints` map of `_utilities.scss`, and `--bs-breakpoint-*`; the down forms read `39.99875rem`, `47.99875rem`, `63.99875rem`, `79.99875rem`, `95.99875rem` (Bootstrap's 0.02 px gap in rem). Rem matches Tailwind's `(width >= 40rem)` at every browser font size, so a reader who enlarges the default font sees `md:` and `-md-` switch together. The RFS cap stays `1200px` (finding 4).
- Containers take `max-width = breakpoint`: 40, 48, 64, 80, 96rem for 540, 720, 960, 1140, 1320 px. Bootstrap's gutter padding stays.
- Spacing inside components, transitions (`0.15s ease-in-out`, 45 occurrences [S]), z-indices, modal widths, and the focus ring's shape (`0.25rem`, opacity `0.25`) keep Bootstrap's values. The spacer entries equal Tailwind multiples already [P]; a consumer `--spacing` retunes Tailwind's own rules [V R3] and never Bootstrap's components.

**Q4. Mechanism: two Sass switches and a generated edit.** Ruling: `$palette` and `$scale` join the five switches in `src/bootstrap/_mixins.scss`, each `()` by default; every color literal and every grid-tied breakpoint, container, radius, font, and shadow literal in the 56 Sass files becomes a call that returns its own literal text when its switch is empty, and the mapped value otherwise; `src/tailwindcss/_tokens.scss` configures both. Reason: the law routes the derived build through switches the guide records (AGENTS.md § Project model; `styles.md` § Prohibitions); only Sass serves a Sass consumer who brings their own palette (§ 6 item 6); and a text substitution over compiled CSS cannot separate occurrences that share a value but not a role: `#ced4da` is `--bs-gray-400` and `--bs-dark-bg-subtle`, `1200px` is the RFS cap and the `xl` grid, `1140px` is the `xl` container and `--bs-modal-width` for `.modal-xl`. The hybrid is refused: two mechanisms need two derivation proofs for one map.

**Q5. Output form: resolved sRGB hex for colors, references for scales.** Ruling: every mapped color emits six-digit lower-case sRGB hex, `rgba()` with the literal's own alpha, a bare triplet, or `%23` plus hex, matching the spelling of the literal it replaces; a computed color equal to the literal's color keeps the literal's spelling (`#fff`). An oklch step converts by the probe's rule (clip each encoded channel to 0..1, round to 8 bits [P `conversion`]). `oklch()` output is refused: Bootstrap reads the same color through `--bs-primary` and through `rgba(var(--bs-primary-rgb), …)`, so an oklch `.btn-primary` beside a clipped `.bg-primary` would disagree on a wide-gamut display. The guide states the residual: `bg-yellow-500` renders the unclipped color there and `.btn-warning` the clipped one, OKLab 0.0225 apart [C].

**Q6. Proofs: the tuned sheet alone is the component baseline, reached without a fourth face.** Ruling: sheet-level cases read their baseline from `dist/src/tailwindcss/index.css` adopted alone (its references resolve to their fallbacks, which equal the default theme [T]); the journey partition maps each Bootstrap-face reading through the token table instead of reading a fourth stylesheet, so the journey budget does not grow. The paired engine states case needs no change: it asserts the engine's output, panel text, and visibility [V § 12], none of which a token moves. § 4 lists the cases.

**Q7. The 17 shared component names.** Ruling: `.container` keeps Bootstrap's rule (centered, gutter padding, R2) at Tailwind's widths, so `container mx-auto px-4` reads Tailwind's container exactly: `mx-auto` and `px-4` are shared names whose Tailwind rules beat the `bootstrap` layer [V R1], and the max-width at each breakpoint equals Tailwind's. `.table` follows the map through `--bs-emphasis-color`, `--bs-body-bg`, and `--bs-border-color` (`gray-300`). `.collapse` carries no token, `caption-top` reads `--bs-secondary-color`, and the `col-*` names follow the aligned breakpoints.

**Q8. Dark mode: Tailwind's ramp for the roles, Bootstrap's attribute for the switch.** Ruling: the dark roles take `300` (text-emphasis), `950` (bg-subtle), `700` (border-subtle); body color `gray-300`, body background `gray-900`, secondary background `gray-800`, border `gray-700`, each by Bootstrap's own step name (`$body-bg-dark` is `$gray-900`, `$body-color-dark` is `$gray-300`). `[data-bs-theme=dark]` stays the switch: it is selector structure, not a token. The guide adds one recipe line that drives Tailwind's `dark:` from the same attribute: `@custom-variant dark (&:where([data-bs-theme=dark], [data-bs-theme=dark] *));`, and states that a page relying on `prefers-color-scheme` alone darkens Tailwind's utilities and leaves Bootstrap's components light.

**Q9. Order: follow the flip's landing, hold the release.** Ruling: the token units open on a branch from veneer `main` after the structural flip lands there (TF3), and no veneer release ships between the flip and the tokens. Reason: the flip's falsify round and its U8 gates read the structural claims alone, and the token proofs re-baseline cases the flip settled; one release keeps the consumer's visual change to one. The showcase's contrast cases must pass unchanged: the header's active `btn-outline-secondary` reads white on `gray-600` at 7.56 and its inactive labels black on `gray-100` at 19.08 and white on `#172131` at 16.17 [C].

## 2. The map

Bases and grays. Every `:root` declaration of these tokens reads the tuned hex; Bootstrap declares no dark override for them.

| Bootstrap token | Bootstrap 5.3.8 | Tailwind token | Tuned sRGB |
| --- | --- | --- | --- |
| `--bs-blue` | `#0d6efd` | `blue-600` | `#155dfc` |
| `--bs-indigo` | `#6610f2` | `indigo-600` | `#4f39f6` |
| `--bs-purple` | `#6f42c1` | `purple-800` | `#6e11b0` |
| `--bs-pink` | `#d63384` | `pink-600` | `#e60076` |
| `--bs-red` | `#dc3545` | `red-600` | `#e7000b` |
| `--bs-orange` | `#fd7e14` | `orange-400` | `#ff8904` |
| `--bs-yellow` | `#ffc107` | `yellow-500` | `#f0b100` |
| `--bs-green` | `#198754` | `green-700` | `#008236` |
| `--bs-teal` | `#20c997` | `teal-400` | `#00d5be` |
| `--bs-cyan` | `#0dcaf0` | `cyan-500` | `#00b8db` |
| `--bs-gray-100` | `#f8f9fa` | `gray-100` | `#f3f4f6` |
| `--bs-gray-200` | `#e9ecef` | `gray-200` | `#e5e7eb` |
| `--bs-gray-300` | `#dee2e6` | `gray-300` | `#d1d5dc` |
| `--bs-gray-400` | `#ced4da` | `gray-400` | `#99a1af` |
| `--bs-gray-500` | `#adb5bd` | `gray-500` | `#6a7282` |
| `--bs-gray-600`, `--bs-gray` | `#6c757d` | `gray-600` | `#4a5565` |
| `--bs-gray-700` | `#495057` | `gray-700` | `#364153` |
| `--bs-gray-800`, `--bs-gray-dark` | `#343a40` | `gray-800` | `#1e2939` |
| `--bs-gray-900` | `#212529` | `gray-900` | `#101828` |
| `--bs-black`, `--bs-white` | `#000`, `#fff` | `black`, `white` | `#000`, `#fff` (kept) |

Theme roles, light and dark. Each cell reads Tailwind token, tuned hex, then Bootstrap's hex in parentheses. `--bs-<theme>-rgb` is the base's triplet (`21, 93, 252` for primary).

| Theme | Base | Text-emphasis light / dark | Bg-subtle light / dark | Border-subtle light / dark |
| --- | --- | --- | --- | --- |
| primary | `blue-600` `#155dfc` (`#0d6efd`) | `blue-800` `#193cb8` (`#052c65`) / `blue-300` `#8ec5ff` (`#6ea8fe`) | `blue-100` `#dbeafe` (`#cfe2ff`) / `blue-950` `#162456` (`#031633`) | `blue-200` `#bedbff` (`#9ec5fe`) / `blue-700` `#1447e6` (`#084298`) |
| secondary | `gray-600` `#4a5565` (`#6c757d`) | `gray-800` `#1e2939` (`#2b2f32`) / `gray-300` `#d1d5dc` (`#a7acb1`) | `gray-100` `#f3f4f6` (`#e2e3e5`) / `gray-950` `#030712` (`#161719`) | `gray-200` `#e5e7eb` (`#c4c8cb`) / `gray-700` `#364153` (`#41464b`) |
| success | `green-700` `#008236` (`#198754`) | `green-800` `#016630` (`#0a3622`) / `green-300` `#7bf1a8` (`#75b798`) | `green-100` `#dcfce7` (`#d1e7dd`) / `green-950` `#032e15` (`#051b11`) | `green-200` `#b9f8cf` (`#a3cfbb`) / `green-700` `#008236` (`#0f5132`) |
| info | `cyan-500` `#00b8db` (`#0dcaf0`) | `cyan-800` `#005f78` (`#055160`) / `cyan-300` `#53eafd` (`#6edff6`) | `cyan-100` `#cefafe` (`#cff4fc`) / `cyan-950` `#053345` (`#032830`) | `cyan-200` `#a2f4fd` (`#9eeaf9`) / `cyan-700` `#007595` (`#087990`) |
| warning | `yellow-500` `#f0b100` (`#ffc107`) | `yellow-800` `#894b00` (`#664d03`) / `yellow-300` `#ffdf20` (`#ffda6a`) | `yellow-100` `#fef9c2` (`#fff3cd`) / `yellow-950` `#432004` (`#332701`) | `yellow-200` `#fff085` (`#ffe69c`) / `yellow-700` `#a65f00` (`#997404`) |
| danger | `red-600` `#e7000b` (`#dc3545`) | `red-800` `#9f0712` (`#58151c`) / `red-300` `#ffa2a2` (`#ea868f`) | `red-100` `#ffe2e2` (`#f8d7da`) / `red-950` `#460809` (`#2c0b0e`) | `red-200` `#ffc9c9` (`#f1aeb5`) / `red-700` `#c10007` (`#842029`) |
| light | `gray-100` `#f3f4f6` (`#f8f9fa`) | `gray-700` `#364153` (`#495057`) / `gray-100` `#f3f4f6` (`#f8f9fa`) | `mix(gray-100, white)` `#f9fafb` (`#fcfcfd`) / `gray-800` `#1e2939` (`#343a40`) | `gray-200` `#e5e7eb` (`#e9ecef`) / `gray-700` `#364153` (`#495057`) |
| dark | `gray-900` `#101828` (`#212529`) | `gray-700` `#364153` (`#495057`) / `gray-300` `#d1d5dc` (`#dee2e6`) | `gray-300` (floor) `#d1d5dc` (`#ced4da`) / `mix(gray-800, black)` `#0f151d` (`#1a1d20`) | `gray-500` `#6a7282` (`#adb5bd`) / `gray-800` `#1e2939` (`#343a40`) |

Body roles, light / dark, with Bootstrap's value in parentheses:

| Token | Light | Dark |
| --- | --- | --- |
| `--bs-body-color` | `gray-900` `#101828` (`#212529`) | `gray-300` `#d1d5dc` (`#dee2e6`) |
| `--bs-body-bg` | `white` `#fff` (kept) | `gray-900` `#101828` (`#212529`) |
| `--bs-emphasis-color` | `#000` (kept) | `#fff` (kept) |
| `--bs-secondary-color`, `--bs-tertiary-color` | `rgba(16, 24, 40, 0.75)`, `0.5` | `rgba(209, 213, 220, 0.75)`, `0.5` |
| `--bs-secondary-bg` | `gray-200` `#e5e7eb` (`#e9ecef`) | `gray-800` `#1e2939` (`#343a40`) |
| `--bs-tertiary-bg` | `gray-100` `#f3f4f6` (`#f8f9fa`) | `mix(gray-800, gray-900)` `#172131` (`#2b3035`) |
| `--bs-border-color` | `gray-300` `#d1d5dc` (`#dee2e6`) | `gray-700` `#364153` (`#495057`) |
| `--bs-border-color-translucent` | `rgba(0, 0, 0, 0.175)` (kept) | `rgba(255, 255, 255, 0.15)` (kept) |
| `--bs-link-color` | `blue-600` `#155dfc` (`#0d6efd`) | `blue-300` `#8ec5ff` (`#6ea8fe`) |
| `--bs-link-hover-color` | shade 20 `#114aca` (`#0a58ca`) | tint 20 `#a5d1ff` (`#8bb9fe`) |
| `--bs-code-color` | `pink-600` `#e60076` (`#d63384`) | `pink-300` `#fda5d5` (`#e685b5`) |
| `--bs-highlight-color`, `--bs-highlight-bg` | `gray-900`, `yellow-100` `#fef9c2` (`#fff3cd`) | `gray-300`, `yellow-800` `#894b00` (`#664d03`) |
| `--bs-form-valid-color`, `--bs-form-invalid-color` | `green-700` `#008236`, `red-600` `#e7000b` | `green-300` `#7bf1a8`, `red-300` `#ffa2a2` |
| `--bs-focus-ring-color` | `rgba(21, 93, 252, 0.25)` (`rgba(13, 110, 253, 0.25)`) | same |
| Focus border (tint 50), range thumb active (tint 70) | `#8aaefe` (`#86b7fe`), `#b9cefe` (`#b6d4fe`) | same |

SVG data URIs take the same values escaped: `%23343a40` to `%231e2939`, `%23dee2e6` to `%23d1d5dc`, `%23212529` to `%23101828`, `%23052c65` to `%23193cb8`, `%236ea8fe` to `%238ec5ff`, `%2386b7fe` to `%238aaefe`, `%23dc3545` to `%23e7000b`, `%23198754` to `%23008236`; `%23fff` and `%23000` stay.

Derived states by Bootstrap's algebra (§ 1 Q2), one row per theme color; `tokens.json` (§ 3) carries every occurrence.

| Theme | Text | Hover bg / border | Active bg / border | Focus RGB | Table bg, border, striped, active, hover |
| --- | --- | --- | --- | --- | --- |
| primary | `#fff` | `#124fd6` / `#114aca` | `#114aca` / `#1046bd` | `56, 117, 252` | `#dbeafe`, `#afbbcb`, `#d0def1`, `#c5d3e5`, `#cbd8eb` |
| secondary | `#fff` | `#3f4856` / `#3b4451` | `#3b4451` / `#38404c` | `101, 111, 124` | `#f3f4f6`, `#c2c3c5`, `#e7e8ea`, `#dbdcdd`, `#e1e2e4` |
| success | `#fff` | `#006f2e` / `#00682b` | `#00682b` / `#006229` | `38, 149, 84` | `#dcfce7`, `#b0cab9`, `#d1efdb`, `#c6e3d0`, `#cce9d6` |
| info | `#000` | `#26c3e0` / `#1abfdf` | `#33c6e2` / `#1abfdf` | `0, 156, 186` | `#cefafe`, `#a5c8cb`, `#c4eef1`, `#b9e1e5`, `#bfe7eb` |
| warning | `#000` | `#f2bd26` / `#f2b91a` | `#f3c133` / `#f2b91a` | `204, 150, 0` | `#fef9c2`, `#cbc79b`, `#f1edb8`, `#e5e0af`, `#ebe6b3` |
| danger | `#fff` | `#c40009` / `#b90009` | `#b90009` / `#ad0008` | `235, 38, 48` | `#ffe2e2`, `#ccb5b5`, `#f2d7d7`, `#e6cbcb`, `#ecd1d1` |
| light | `#000` | `#cfcfd1` / `#c2c3c5` | `#c2c3c5` / `#b6b7b9` | `207, 207, 209` | `#f3f4f6`, `#c2c3c5`, `#e7e8ea`, `#dbdcdd`, `#e1e2e4` |
| dark | `#fff` | `#343b48` / `#282f3e` | `#404653` / `#282f3e` | `52, 59, 72` | `#101828`, `#404653`, `#1c2433`, `#282f3e`, `#222938` |

Scale rows. "Follows" means the tuned sheet emits a reference whose fallback is Tailwind 4.3.3's default and whose value follows a consumer `@theme`.

| Row | Bootstrap 5.3.8 | Tuned | Form |
| --- | --- | --- | --- |
| `--bs-font-sans-serif` | `system-ui, -apple-system, …` | `var(--font-sans, -apple-system, BlinkMacSystemFont, …)` | follows |
| `--bs-font-monospace` | `SFMono-Regular, Menlo, …` | `var(--font-mono, ui-monospace, SFMono-Regular, …)` | follows |
| `--bs-border-radius-sm`, base, `-lg` | `0.25rem`, `0.375rem`, `0.5rem` | `--radius-sm`, `--radius-md`, `--radius-lg` | follows, equal |
| `--bs-border-radius-xl`, `-xxl` | `1rem`, `2rem` | `--radius-2xl`, `--radius-4xl` | follows, equal |
| `--bs-border-radius-pill` | `50rem` | `50rem` | kept |
| `--bs-box-shadow-sm`, base, `-lg`, `-inset` | `0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)`, … | `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--inset-shadow-xs` | follows |
| Body size, weight, line height | `1rem`, `400`, `1.5` | same | kept, equal [P] |
| Headings, `.display-*`, `.lead`, `.fs-*`, `.small` | fluid `calc()`, `1.2` | same | kept |
| Grid breakpoints `sm` to `xxl` | 576, 768, 992, 1200, 1400 px | 40, 48, 64, 80, 96rem | aligned |
| Down forms | 575.98 to 1399.98 px | 39.99875 to 95.99875rem | aligned |
| Container max-widths | 540, 720, 960, 1140, 1320 px | 40, 48, 64, 80, 96rem | aligned |
| RFS cap, modal widths | `1200px`; 300, 500, 800, 1140 px | same | kept |
| Spacers, component paddings | `0` to `3rem`; `.btn` `0.375rem 0.75rem` | same | kept, equal multiples [P] |
| Transitions, z-indices, focus ring shape | `0.15s ease-in-out`; 1000 to 1090; `0.25rem`, `0.25` | same | kept |

## What a consumer reads

The following table states the consumer's experience under the three faces at 1280 px in the light color mode unless a row names another state. The values come from § 2 and [C]; T1's P5 and the § 4 cases read them in Chromium.

| Case | `./bootstrap` alone | Tailwind without the layer | Tailwind with the layer |
| --- | --- | --- | --- |
| `.btn-primary` background | `rgb(13, 110, 253)` | `rgb(13, 110, 253)` | `rgb(21, 93, 252)`, the same as `bg-blue-600` |
| `.btn-primary:hover` background | `rgb(11, 94, 215)` | `rgb(11, 94, 215)` | `rgb(18, 79, 214)` |
| `.alert-primary` background, text | `#cfe2ff`, `#052c65` | the same | `#dbeafe`, `#193cb8`: `bg-blue-100 text-blue-800` |
| `.form-control` border color | `#dee2e6` | the same | `#d1d5dc`: `border-gray-300` |
| Body text on body background | `#212529` on `#fff` | the same | `#101828` on `#fff`: `text-gray-900` |
| Body under `data-bs-theme="dark"` | `#dee2e6` on `#212529` | the same | `#d1d5dc` on `#101828`: `text-gray-300 bg-gray-900` |
| `.col-lg-6` at 1000 px | half width (`992px`) | half width | full width; `lg:w-1/2` agrees (`64rem`) |
| `.container` max-width | `1140px` | `1280px` (Tailwind's rule wins) | `1280px` (Bootstrap's rule, aligned width) |
| `container mx-auto px-4` padding, max-width | `24px`, `1140px` | `24px`, `1280px` | `16px`, `1280px`: Tailwind's container |
| Consumer `@theme { --font-sans: 'Inter', sans-serif; }`, body font | Bootstrap's stack | Bootstrap's stack | `Inter, sans-serif` |
| Consumer `@theme { --radius-md: 0.5rem; }`, `.btn` radius | `6px` | `6px` | `8px` |
| Consumer `@theme { --color-blue-600: #7c3aed; }`, `.btn-primary` | `#0d6efd` | `#0d6efd` | `#155dfc` (pinned; the Sass `$palette` carries a custom palette) |
| `.h1` font size | `40px` | `40px` | `40px` (RFS cap kept) |

## 3. Mechanism

`src/bootstrap/_mixins.scss` (functions and switches, as `styles.md` assigns them):

- `$palette: () !default;` and `$scale: () !default;` beside the five switches; `_tokens.scss` forwards both through its `@use 'mixins' with (...)`, as it forwards `$withhold`.
- `@function tone($literal, $expression...)` returns `string.unquote($literal)` when `$palette` is empty. Otherwise it evaluates `$expression` and formats the result in the literal's own spelling: hex, `%23` plus hex, `rgba(R, G, B, A)` with the literal's alpha, or a bare `R, G, B` triplet. The rest arguments are one role key (`primary`, `primary-bg-subtle`, `primary-bg-subtle-dark`, `gray-300`, `body-color-dark`, `black`, `white`), or an operation followed by its operands: `tint, KEY, W`, `shade, KEY, W`, or `mix, KEY, KEY, W`, where a `KEY` operand is a role key or a parenthesized inner operation (the table variants mix black into `(primary-bg-subtle)`). A role key resolves through `map.get($palette, roles, KEY)` to a Tailwind token name, then through `map.get($palette, colors, TOKEN)` to a color.
- `@function -mix($a, $b, $weight)` mixes per channel with `math.round` on each result (Bootstrap's integer mix, which reproduces every compiled hex [P "Checks"]), so the output does not depend on Dart Sass's float color channels.
- `@function measure($literal, $key)` returns `string.unquote($literal)` when `$scale` is empty and `map.get($scale, $key)` otherwise. Keys: `sm` to `xxl` for min-width conditions, `sm-down` to `xxl-down` for max-width, `container-sm` to `container-xxl`, `radius`, `radius-sm`, `radius-lg`, `radius-xl`, `radius-xxl`, `font-sans`, `font-mono`, `shadow`, `shadow-sm`, `shadow-lg`, `shadow-inset`.

`src/bootstrap/_tokens.scss` and the component partials (the generated edit):

- `--bs-blue: #{'#0d6efd'}` becomes `--bs-blue: #{tone('#0d6efd', blue)}`; `--bs-btn-hover-bg: #{'#0b5ed7'}` in `.btn-primary` becomes `#{tone('#0b5ed7', shade, primary, 15)}`; `border-color: #86b7fe;` becomes `border-color: tone('#86b7fe', tint, primary, 50);`; the data URI `fill='%2386b7fe'` becomes `fill='#{tone('%2386b7fe', tint, primary, 50)}'` inside the same quoted string.
- `@media (min-width: 576px)` becomes `@media (min-width: #{measure('576px', sm)})`; `max-width: 540px` becomes `max-width: measure('540px', container-sm)`; `--bs-border-radius: #{'0.375rem'}` becomes `#{measure('0.375rem', radius)}`. The 12 RFS conditions and the modal widths keep their literals.
- Size, from [P] and the 2026-10-04 `grep`: 616 color occurrences in 30 files (229 in `_buttons.scss`, 150 in `_tokens.scss`, 73 in `_tables.scss`, 22 in `_dropdown.scss`, 17 in `_navbar.scss`, 13 each in `_form-check.scss` and `_form-range.scss`, 25 inside data URIs); 64 grid-tied media conditions; 10 breakpoint values (`_grid.scss` 5, `_utilities.scss` 5); 5 container widths; 11 scale tokens in `_tokens.scss`. The writer assigns each expression from the occurrence's selector and property, never from its value; occurrences that share a value and an expression (`#0a58ca` as link hover and as `.btn-primary` active background, both `shade, primary, 20`) need no special case.

`src/tailwindcss/_tokens.scss` (the one file where the map's literal colors may sit, `styles.md` § Prohibitions):

- `$colors`: the 50 Tailwind steps the roles use, each as sRGB hex, written by the palette writer from `node_modules/tailwindcss/theme.css`.
- `$roles`: Bootstrap role key to Tailwind token name (`primary: 'blue-600'`, `primary-bg-subtle: 'blue-100'`, `dark-bg-subtle: 'gray-300'`, …), the § 2 tables in Sass.
- `$scales`: the scale keys to their tuned text (`sm: 40rem`, `sm-down: 39.99875rem`, `radius: 'var(--radius-md, 0.375rem)'`, …).
- `$palette: (colors: $colors, roles: $roles) !default;` and `$scale: $scales !default;`, then `@use '../bootstrap/tokens' with (..., $palette: $palette, $scale: $scale)`.

`src/tailwindcss/index.scss` gains `@forward 'tokens' show $palette, $scale`, so a Sass consumer writes `@use '@orkestrel/veneer/tailwindcss/scss' with ($palette: (colors: map.merge(…), roles: …))` to bring a custom palette, and the algebra recomputes every derived value from it. `configs/src/vite.tailwindcss.config.ts` does not change.

`tests/setupStyles.ts` gains `deriveToken` (the TypeScript twin of `tone` and `-mix`), `substituteTokens` (applies `tokens.json` rows to a flattened sheet by context), and `mapReading` (maps a computed value's colors through the value table, with the context-keyed rows for the one split value and the container max-widths). `tests/fixtures/tailwindcss/tokens.json` holds one row per occurrence: file, selector, conditions, property, literal, expression, Bootstrap value, tuned value; a `splits` list (one entry: `#ced4da`); and the 50 palette entries with their oklch source. Its writer follows the record-writer convention [V § 6].

`./bootstrap` stays byte-identical: every call returns its own literal under empty switches, and the case in § 4 pins SHA-256 `7932f7a5…`.

## 4. Proofs

Cases by file, in the repository's title style, each with its control. Node cases run in `conformance`; `src:tailwindcss` and `integration` run in Chromium; the journeys run in `test:journey`.

`tests/src/tailwindcss/index.test.ts`:

- `derives the tuned sequences by substituting tokens, withholding, moving, copying, restoring, and nothing else` (replaces the case at line 111): the lifted sequences pass through `substituteTokens` first, including media condition text, then the existing steps; the fourth clause (every tuned entry is explained) covers substituted entries. Controls: a planted unsubstituted `#0d6efd` in a copy of the tuned sheet fails; a row applied to a kept literal (`#fff` read as `#fffffe`) fails.
- `maps every lifted color literal through the token table or keeps it, both ways`: each of the 616 lifted occurrences matches one `tokens.json` row, every row matches one occurrence, and every kept row (`#fff`, `#000`, `transparent`, the black and white `rgba()` forms) is equal on both sides. Controls: a planted lifted literal (`.btn-primary --bs-btn-color: #0d6efe`) reads unmapped; a deleted row reads orphaned.
- `derives every Bootstrap literal from Bootstrap's own bases through the palette functions`: the Sass compile of `src/bootstrap/index.scss` with `$palette` set to Bootstrap's own colors and roles (from `_variables.scss`) and `$scale` set to Bootstrap's own values equals the default compile byte for byte. Control: one planted mis-tag (`.btn-primary` hover background as `shade, primary, 20`) changes the digest.
- `separates every palette expression under a palette where no two expressions agree`: a generated palette with pairwise distinct inputs (no step equals a mix of another) compiles, and every occurrence equals `deriveToken` of its row. Control: two swapped expressions with equal Bootstrap values (`--bs-gray-400` and `--bs-dark-bg-subtle`) fail.
- `pins the Tailwind palette to the installed theme`: each `$colors` entry equals the clipped conversion of its `theme.css` oklch. Control: a planted one-unit hex change fails.
- `keeps the RFS cap at 1200px and aligns every grid condition to Tailwind's breakpoints`: the 12 RFS conditions read `1200px`; every other width condition reads one of the 10 rem values. Control: a planted RFS substitution reads `.h1` at 41.2 px at 1279 px in a Chromium frame.
- `pins every curation witness against the tuned sheet alone and rejects each removed repair` (rename of the case at line 371): the baseline frame adopts the tuned sheet alone. Control: the existing removed repairs.

`tests/integration.test.ts`:

- `keeps preflight declarations by value class and reboot declarations that preflight never writes`: its Bootstrap-alone clause reads the tuned sheet alone, so body color is `rgb(16, 24, 40)`. Control: the existing deleted `base` block.
- `differs from Bootstrap alone by the token table and nothing else`: the curated witnesses and the component matrices under `./bootstrap` alone and the tuned sheet alone, both at 1280 px; every departing longhand pair is `mapReading` of the Bootstrap value or a container row, and every table row with a rendered context departs. Controls: a tuned copy with `.card` padding changed fails; a palette equal to Bootstrap's own reads no departure.
- `reads every shipped text pairing at 4.5:1 or at Bootstrap's own ratio under the tuned sheet`: the 93 pairings of [C] rendered as specimens in both color modes under Bootstrap alone and the tuned sheet alone, read with `readContrast`. Control: the same specimens under a palette with `primary: 'blue-500'` read `.btn-primary` at 3.76 and fail.
- `follows a consumer theme font, radius, and shadow and keeps the default palette under a consumer theme color`: the recipe compiled with `@theme { --font-sans: 'Inter', sans-serif; --radius-md: 0.5rem; --color-blue-600: #7c3aed; }` reads `.btn` radius 8px, body font `Inter, sans-serif`, `.btn-primary` background `rgb(21, 93, 252)`. Control: a tuned copy with the literal `0.375rem` in place of the reference reads 6px.
- `emits exactly the referenced theme variables and no color variable`: the recipe's Tailwind `theme` block holds the font, radius, and shadow variables the scale rows reference and no `--color-*`. Control: a planted `var(--color-blue-600)` in a tuned copy emits it.
- `drives Bootstrap's dark tokens and Tailwind's dark utilities from one data-bs-theme attribute with the documented custom variant`: `bg-white dark:bg-gray-900` beside `.card` reads `rgb(16, 24, 40)` for both under `data-bs-theme="dark"`. Control: without the custom variant line, the Tailwind element reads white.
- `pins the recipe CSSOM declaration sequence to the tuned sheet with the measured merge`: unchanged in shape; the tuned sheet it reads carries the map.

Journeys (`tests/app/browser/integration.test.ts`, `tests/setupBrowser.ts`):

- `reads the resolved values under its declared variant and partitions every departure of the tailwindcss face`: a Bootstrap winner compares against `mapReading` of the same element under the `bootstrap` face. Control: a reading passed through unmapped fails on `.btn-primary` `background-color`.
- `J4 compares the three faces through the Stylesheets buttons`: `TAILWIND_READINGS` gains `.btn-primary` `background-color` (`rgb(13, 110, 253)`, `rgb(13, 110, 253)`, `rgb(21, 93, 252)`), `.alert-primary` `background-color` (`rgb(207, 226, 255)`, same, `rgb(219, 234, 254)`), and `.container` `max-width` at 1280 (`1140px`, `1280px`, `1280px`).
- `reads a Bootstrap primary button and a Tailwind blue-600 fill as one color under the layer`: the specimen "Bootstrap's primary beside Tailwind's blue-600" reads both at `rgb(21, 93, 252)` under `tailwindcss` (`blue-600` lies inside sRGB, clip 0.0007 [C]). Control: the `unexcluded` face reads them apart.
- `compares paired open engine states under bootstrap, unexcluded, and tailwindcss, …`: unchanged; acceptance only.
- `reads every header button at 4.5:1 or more, pressed or not, in both color modes`: unchanged; acceptance only.

Records: `tokens.json` (added); both `recipe.json` files, `preflight.json`, and `comparison.json` regenerate where the map moves their values; `incompatible.json` keeps its rows, read under `[built, unexcluded]`, which the map does not touch.

## 5. Units

T0 and T5 run on Opus or the Orchestrator; T1 to T4 on GPT-6 Astra through `codex exec`; T6 by the verifier. One writer at a time, on one branch from veneer `main` after the flip lands.

0. **T0 tokens-law** (Orchestrator, scaffold): `.claude/rules/styles.md` § Prohibitions, after the derived-build sentence: "A derived build may also take the utility library's design token values under a switch the guide records, with every literal color of the map in its own `_tokens.scss`." `ROADMAP.md` § Scaffold propagation names it. Acceptance: `test:policy` in scaffold.
1. **T1 tokens-probe** (`tmp/probes/tokens2/` only): P1 the `tone`, `-mix`, and `measure` functions on a copy, default digest unchanged and Bootstrap-bases digest equal; P2 the generated edit on a copy (occurrences per file equal [P]); P3 the [C] contrast matrix from the probe's own conversions, with base `500`, nearest-ΔE, and pure-algebra columns; P4 the breakpoint alignment readings at 390, 768, and 1280 and the journey's responsive row; P5 the consumer theme compile of § 4 and a `prefix(tw)` compile; P6 `mapReading` over the showcase partition with its control and the journey wall time. Acceptance: each probe exits 0 twice with byte-identical output; `git status --porcelain` empty.
2. **T2 tokens-sheet**: `src/bootstrap/_mixins.scss`, `_tokens.scss`, the generated edit across `src/bootstrap/**/*.scss`, `src/tailwindcss/_tokens.scss`, `src/tailwindcss/index.scss`, `tests/setupStyles.ts` and `.test.ts`, `tests/src/tailwindcss/index.test.ts`, `tests/fixtures/tailwindcss/tokens.json` and its writer. Acceptance, cheapest first: `build:src:bootstrap` SHA-256 `7932f7a5…`; `build:src:tailwindcss`; `check:src:bootstrap`, `check:src:tailwindcss`; `lint:check`; `test:src:bootstrap` unchanged; `test:src:tailwindcss`; `test:setup`.
3. **T3 tokens-records**: the record writers, `tests/integration.test.ts`, `tests/setup.ts` where a baseline reader changes. Acceptance: writers idempotent; `conformance`; `test:integration` with no failure outside the host-bound set.
4. **T4 tokens-showcase**: `tests/setupBrowser.ts` (`TAILWIND_READINGS`, `mapReading` in the partition), `app/browser/sections/*.html` (the specimen), `app/browser/constants.ts`, captions in the form "Bootstrap only: … Without the layer: … With the layer: …" from T5's copy. Acceptance: `check`; `test:app:browser`; `test:setup:browser`; `build`; `test:journey` with its wall time recorded against the 449 s and 487 s readings [V § 12].
5. **T5 tokens-guide** (Opus): § Tailwind compatibility sheet replaces "The sheet keeps Bootstrap's own design token values" with the map's rule and a token table (Bootstrap token, Tailwind token, tuned value, follows or pinned); the consumer table gains the theme-color, theme-font, `container mx-auto px-4`, and dark-variant rows; § Load real Tailwind gains the custom variant line and the custom-palette Sass recipe; `ROADMAP.md` tenet. The caption copy for T4 lands first as a copy document. Acceptance: `test:guides`; `test:policy`; every backticked case title resolves.
6. **T6 gates and falsify**: the U8 gate list bare [V § 8], `build:showcase` and the whole-file commit of `showcase/browser.html`, then one falsify round with two lanes over the claims of § 1 and its fix unit.

## 6. Defaults applied for the user

1. The family is Bootstrap's hue name; the grays are `gray`.
2. Bases: `blue-600`, `green-700`, `red-600`, `cyan-500`, `yellow-500`, `gray-600` for secondary, `gray-100` and `gray-900` for light and dark.
3. The contrast floor is the lesser of 4.5:1 and Bootstrap's own ratio per pairing; one move (`--bs-dark-bg-subtle` to `gray-300`).
4. Dark bg-subtle takes `950`; body background in dark mode is `gray-900`.
5. Colors are pinned to the installed Tailwind default palette as sRGB hex; fonts, radii, and shadows follow the consumer's `@theme` by reference.
6. A custom palette reaches colors through the Sass entry's `$palette`, not through the CSS export.
7. Breakpoints and containers align to Tailwind's, in rem; the RFS cap stays at 1200 px.
8. The type scale, component spacing, transitions, z-indices, and focus ring shape stay Bootstrap's.
9. The `bootstrap` and `unexcluded` faces show Bootstrap's values; the `tailwindcss` face shows the map.
10. The token units follow the flip's landing on veneer `main`, and no release ships between them.
11. The guide recommends the `@custom-variant dark` line and keeps `data-bs-theme` as Bootstrap's switch.

## 7. Risks and the measurement that exposes each

1. Dart Sass color math: `color.mix` keeps float channels, so a nested mix (table variants) drifts by one unit from Bootstrap's compiled hexes. Exposed by the Bootstrap-bases digest case (§ 4) and P1; `-mix` rounds per channel to remove it.
2. A mis-tagged occurrence that agrees under Bootstrap's bases and disagrees under Tailwind's. Exposed by the distinct-palette case; the writer's rules table is reviewed against `inventory.json`'s candidate lists (every literal with two or more candidates).
3. Wide-gamut mismatch between a Tailwind utility and a Bootstrap component of the same step. Measured as OKLab clip distance per used step (largest 0.0225 for `yellow-500` [C]); the guide states it, and the witness specimen uses an in-gamut step.
4. Journey budget: `mapReading` adds work per signature. Exposed by T4's wall time against 449 s and 487 s [V § 12]; the partition reads 1665 signatures [V § 12].
5. A consumer theme that renames or hides variables (`prefix(tw)`, `theme(reference)`): references fall back to Tailwind's defaults. Exposed by P5's compiles.
6. The journey viewport sits on the `xl` boundary (1280 px = `80rem`). Exposed by P4 reading `.col-xl-*` at 1279 and 1280 px; at 1280 the rule holds under both maps (finding 3).
7. A Tailwind upgrade moves a palette value. Exposed by `pins the Tailwind palette to the installed theme`; the writer regenerates `$colors` and `tokens.json`.
8. Lighter alert contrast: the six hue alerts in light mode read 6.37 to 7.23 against Bootstrap's 7.21 to 10.35 [C]. All hold the floor; the contrast case reports every ratio so a judge can rule on taste.
9. The dark `mark` reads 4.65 against Bootstrap's 6.14 [C], 0.15 over the floor. Exposed by the contrast case; the fallback is `yellow-900` for the dark `--bs-highlight-bg`, which reads 5.89 [C].
10. The `splits` list grows past `#ced4da` when a later ruling moves another role off its name. Exposed by the token case, which fails on any split the list does not name.
