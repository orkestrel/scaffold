I'll read the brief and follow it exactly.The brief is a read-only token inventory. I'll confirm the read-list files exist, then collect cited counts for each question.# Question

Cited inventory of Bootstrap 5.3.8 design-token literals in the compiled sheet, Tailwind 4.3.3’s default theme, nearest counterparts, how the veneer Sass emits those literals, and prior writing. Facts only.

Grep patterns: hex `#<hex>([^0-9a-fA-F]|$)`; fixed strings via `grep -o -F`; theme bucket is `bootstrap.css` lines 7–182 and 6199–6210 (`:root` / `[data-bs-theme]` custom properties, including the carousel `#fff`/`#000` block). Component count = total − theme. The 424 hex hits from `#[0-9a-fA-F]{3,8}` equal the sum below.

Installed sheets: Bootstrap `5.3.8` (`/home/user/veneer/node_modules/bootstrap/package.json:3`, `bootstrap.css:3`); Tailwind `4.3.3` (`/home/user/veneer/node_modules/tailwindcss/package.json:3`).

# Evidence

## 1. Bootstrap color literals

Bases in `/home/user/veneer/node_modules/bootstrap/scss/_variables.scss:9-19` and `:39-48`. Theme assignment `:301-308`: `$primary: $blue`, `$secondary: $gray-600`, `$success: $green`, `$info: $cyan`, `$warning: $yellow`, `$danger: $red`, `$light: $gray-100`, `$dark: $gray-900`. Map `$theme-colors` `:312-321`.

`tint-color` is `mix(white, $color, $weight)`; `shade-color` is `mix(black, $color, $weight)`; `shift-color` shades when the weight is positive and tints when negative (`/home/user/veneer/node_modules/bootstrap/scss/_functions.scss:206-218`). Ramp steps `:79-87` (and the same weights for the other nine hues): 100/200/300/400 = tint 80/60/40/20%; 500 = the base; 600/700/800/900 = shade 20/40/60/80%. Integer mix `(channel * (100−w) + 255 or 0 * w + 50) / 100` reproduces the compiled hexes below.

Light emphasis/subtle/border (`_variables.scss:325-354`): text-emphasis = shade 60% (light/dark text-emphasis are `$gray-700`); bg-subtle = tint 80% (`$light-bg-subtle` is `mix($gray-100, $white)` → `#fcfcfd`; `$dark-bg-subtle` is `$gray-400`); border-subtle = tint 60% (`$light-border-subtle` is `$gray-200`; `$dark-border-subtle` is `$gray-500`).

Dark (`_variables-dark.scss:11-40`, `:43-54`): text-emphasis = tint 40%; bg-subtle = shade 80% (`$dark-bg-subtle-dark` is `mix($gray-800, $black)` → `#1a1d20`); border-subtle = shade 40%; `$body-tertiary-bg-dark` is `mix($gray-800, $gray-900, 50%)` → `#2b3035`; `$link-color-dark` is tint 40% of `$primary`; `$link-hover-color-dark` is `shift-color` of that by `−$link-shade-percentage` (`:53-54`, percentage `:455` of `_variables.scss`). `$link-hover-color` is shade 20% of `$link-color` (`_variables.scss:455-456`).

`_root.scss:8-35` writes `--bs-<color>`, `--bs-gray-*`, `--bs-<theme>`, `--bs-<theme>-rgb`, and the emphasis/subtle/border custom properties from those maps. `#` in SVG is escaped to `%23` (`_variables.scss:357-364`).

Counts in `/home/user/veneer/node_modules/bootstrap/dist/css/bootstrap.css`. Columns: total, theme-block, component (rest). Palette hues that are not theme colors occur only as `--bs-*` in the light block.

| Hex | Origin | Total | Theme | Component |
| --- | --- | --- | --- | --- |
| `#0d6efd` | `$blue` / `$primary` / `$blue-500` | 29 | 3 | 26 |
| `#6610f2` | `$indigo` | 1 | 1 | 0 |
| `#6f42c1` | `$purple` | 1 | 1 | 0 |
| `#d63384` | `$pink`; also `$code-color` (`_variables.scss:1742`) | 2 | 2 | 0 |
| `#dc3545` | `$red` / `$danger` | 16 | 4 | 12 |
| `#fd7e14` | `$orange` | 1 | 1 | 0 |
| `#ffc107` | `$yellow` / `$warning` | 14 | 2 | 12 |
| `#198754` | `$green` / `$success` | 16 | 4 | 12 |
| `#20c997` | `$teal` | 1 | 1 | 0 |
| `#0dcaf0` | `$cyan` / `$info` | 14 | 2 | 12 |
| `#000` | `$black` | 63 | 4 | 59 |
| `#fff` | `$white` | 61 | 5 | 56 |
| `#f8f9fa` | `$gray-100` / `$light` | 17 | 4 | 13 |
| `#e9ecef` | `$gray-200` | 3 | 3 | 0 |
| `#dee2e6` | `$gray-300` | 7 | 5 | 2 |
| `#ced4da` | `$gray-400` | 2 | 2 | 0 |
| `#adb5bd` | `$gray-500` | 4 | 2 | 2 |
| `#6c757d` | `$gray-600` / `$secondary` | 19 | 3 | 16 |
| `#495057` | `$gray-700` | 5 | 5 | 0 |
| `#343a40` | `$gray-800` | 6 | 5 | 1 |
| `#212529` | `$gray-900` / `$dark` | 18 | 5 | 13 |

Blue ramp and the roles that use it (other hues follow the same weights; their hexes are the theme-block values at `bootstrap.css:48-71` and `:144-167`):

| Hex | Origin | Total | Theme | Component |
| --- | --- | --- | --- | --- |
| `#cfe2ff` | tint 80% = `$blue-100` = `$primary-bg-subtle`; also `$table-variants.primary` via `shift-color($primary, -80%)` (`_variables.scss:767-772`) | 2 | 1 | 1 |
| `#9ec5fe` | tint 60% = `$blue-200` = `$primary-border-subtle` | 1 | 1 | 0 |
| `#86b7fe` | tint 50% of `$primary` = `$input-focus-border-color` (`_variables.scss:915`) | 3 | 0 | 3 |
| `#6ea8fe` | tint 40% = `$blue-300` = `$primary-text-emphasis-dark` and `$link-color-dark` | 2 | 2 | 0 |
| `#0a58ca` | shade 20% = `$blue-600` = `$link-hover-color` | 3 | 1 | 2 |
| `#052c65` | shade 60% = `$blue-800` = `$primary-text-emphasis` | 1 | 1 | 0 |
| `#031633` | shade 80% = `$blue-900` = `$primary-bg-subtle-dark` | 1 | 1 | 0 |
| `#084298` | shade 40% = `$blue-700` = `$primary-border-subtle-dark` | 1 | 1 | 0 |
| `#8bb9fe` | tint 20% of `#6ea8fe` = `$link-hover-color-dark` | 1 | 1 | 0 |
| `#b6d4fe` | tint 70% = `$form-range-thumb-active-bg` (`_variables.scss:1059`) | 2 | 0 | 2 |

Other light theme-block literals, one theme hit each unless noted: `#2b2f32`, `#0a3622`, `#055160`, `#58151c` (shade 60%); `#664d03` total 2 (warning text-emphasis and dark `--bs-highlight-bg`); `#e2e3e5`, `#d1e7dd`, `#cff4fc`, `#f8d7da` total 2 (bg-subtle plus `.table-*` bg); `#fff3cd` total 3; `#fcfcfd`, `#c4c8cb`, `#a3cfbb`, `#9eeaf9`, `#ffe69c`, `#f1aeb5` total 1. Dark theme-block, one each unless noted: `#a7acb1`, `#6edff6`, `#ffda6a`; `#75b798` and `#ea868f` total 3 (text-emphasis plus valid/invalid); `#161719`, `#051b11`, `#032830`, `#332701`, `#2c0b0e`, `#1a1d20`, `#41464b`, `#0f5132`, `#087990`, `#997404`, `#842029`, `#e685b5`, `#2b3035`.

Button state hexes are component-only. Amounts: hover bg shade/tint 15%, hover border shade 20% / tint 10%, active bg shade/tint 20%, active border shade 25% / tint 10% (`_variables.scss:855-862`). Compiled primary (`bootstrap.css:3034-3048`): hover bg `#0b5ed7` (shade 15%), hover border `#0a58ca` (shade 20%), active bg `#0a58ca`, active border `#0a53be` (shade 25%). Same pattern for secondary `#5c636a` / `#565e64` (2) / `#51585e`; success `#157347` / `#146c43` (2) / `#13653f`; info `#31d2f2` / `#25cff2` (2) / `#3dd5f3`; warning `#ffca2c` / `#ffc720` (2) / `#ffcd39`; danger `#bb2d3b` / `#b02a37` (2) / `#a52834`; light `#d3d4d5` / `#c6c7c8` (3) / `#babbbc`; dark `#424649` / `#4d5154` (2) / `#373b3e` (3). Each single number is total=component. Focus-shadow triplets are `mix(white, color, 15%)`: primary `49, 132, 253` (`bootstrap.css:3041`). The same 15% mix is written for links at `_variables.scss:846`.

`.table-*` (`bootstrap.css:1942-1954` for primary): bg is the tint-80% color; border/striped/active/hover match shade of that bg by `$table-border-factor: .2`, `$table-striped-bg-factor: .05`, `$table-active-bg-factor: .1`, `$table-hover-bg-factor: .075` (`_variables.scss:745-757`). Primary results `#a6b5cc`, `#c5d7f2`, `#bacbe6`, `#bfd1ec`, each once, component-only. The same four exist once each for secondary, success, info, warning, danger, light, and dark (`#b5b6b7` through `#323539` in the count set).

Named rules, literals versus `var()`:

- `.btn-primary` sets `--bs-btn-*` to hex and `49, 132, 253` (`bootstrap.css:3034-3048`).
- `.form-control:focus` and `.form-check-input:focus` use `#86b7fe` and `rgba(13, 110, 253, 0.25)` (`:2147-2152`, `:2422-2425`). Checked input uses `#0d6efd` (`:2427-2429`).
- `.table-primary` uses the hexes above, not `var(--bs-primary-bg-subtle)` (`:1942-1954`).
- `.nav-pills` sets active color `#fff` and bg `#0d6efd` (`:3872-3875`). `.dropdown-item.active` uses variables (`:3651-3654`); the literals are on `.dropdown-menu` at `:3424-3425`. `.page-link.active` uses variables (`:4770-4774`); `--bs-pagination-active-bg: #0d6efd` is at `:4731`. `.progress-bar` uses `--bs-progress-bar-bg` (`:4954-4962`), set to `#0d6efd` at `:4944`.
- `.form-range::-webkit-slider-thumb` bg `#0d6efd` (`:2526-2532`); `:active` bg `#b6d4fe` (`:2544-2545`).
- `.alert-primary` points at `var(--bs-primary-text-emphasis/bg-subtle/border-subtle)` (`:4875-4879`).
- `.btn-close` color `#000` and a data URI `fill='%23000'` (`:5336-5338`).

`%23` escapes, all outside the theme blocks (theme-block count 0), 23 hits: `%23fff` 8, `%23dc3545` 4, `%2386b7fe` 2, `%236ea8fe` 2, `%23198754` 2, `%23343a40` 1, `%23dee2e6` 1, `%23212529` 1, `%23052c65` 1, `%23000` 1.

Triplet `13, 110, 253` occurs 13 times, 10 of them inside `rgba(13, 110, 253, …)`. The exact `rgba(13, 110, 253, 0.25)` occurs 10 times (`--bs-focus-ring-color` at `bootstrap.css:121`, plus focus shadows). Other `--bs-*-rgb` bare triplets in the light/dark blocks: `108, 117, 125` (2), `25, 135, 84` (2), `13, 202, 240` (2), `255, 193, 7` (2), `220, 53, 69` (2), `248, 249, 250` (3), `33, 37, 41` (9 total, 2 inside `rgba`), `10, 88, 202` (4), `110, 168, 254` (1), `139, 185, 254` (1), `222, 226, 230` (5 total, 2 inside `rgba`), `52, 58, 64` (1), `43, 48, 53` (1), `255, 255, 255` (19 total, 13 inside `rgba`), `0, 0, 0` (31 total, 26 inside `rgba`).

## 2. Non-color literals in `bootstrap.css`

Fixed-string counts.

Radii, declared at `bootstrap.css:108-115` from the `$border-radius*` variables: `0.375rem` 29, `0.25rem` 189, `0.5rem` 208, `50rem` 1. `1rem` and `2rem` were not counted: `1rem` is a suffix of `0.1rem`.

Font stacks, one declaration each: `--bs-font-sans-serif` at `:74` (`system-ui` count 1, `Liberation Sans` count 1); `--bs-font-monospace` at `:75` (`SFMono-Regular` count 1); `--bs-body-font-family: var(--bs-font-sans-serif)` at `:77`. `ui-monospace` count 0.

Type. Headings share weight 500 and line-height 1.2 (`bootstrap.css:217-221`; `$headings-font-weight` / `$headings-line-height` at `_variables.scss:656-657`). Fluid sizes, then the `min-width: 1200px` cap: h1 `calc(1.375rem + 1.5vw)` / `2.5rem` (`bootstrap.css:225-231`); h2 `calc(1.325rem + 0.9vw)` / `2rem` (`:234-240`); h3 `calc(1.3rem + 0.6vw)` / `1.75rem` (`:243-249`); h4 `calc(1.275rem + 0.3vw)` / `1.5rem` (`:252-258`); h5 `1.25rem` (`:261-263`); h6 `1rem` (`:265-267`). `.lead` is `1.25rem` weight 300 (`:602-605`). `.small` is `0.875em` (`:325-327`). `.fs-1` through `.fs-6` repeat the h1–h6 sizes with `!important` (`:8366-8388`). `.display-1` through `.display-6` are weight 300, line-height 1.2, fluid `calc(1.625rem + 4.5vw)` down to `calc(1.375rem + 1.5vw)`, caps `5rem` `4.5rem` `4rem` `3.5rem` `3rem` `2.5rem` (`:607-668`; `$display-font-sizes` at `_variables.scss:662-669`). `calc(1.375rem + 1.5vw)` count 3. `font-weight: 300` 8, `400` 10, `500` 2, `700` 5. `line-height: 1.2` 9, `line-height: 1.5` 12. Body weight 400 and line-height 1.5 are `--bs-body-font-weight` / `--bs-body-line-height` (`bootstrap.css:79-80`).

Shadows and focus (`bootstrap.css:115-121`): `--bs-box-shadow` `0 0.5rem 1rem rgba(0, 0, 0, 0.15)`; `--bs-box-shadow-sm` `0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)`; `--bs-box-shadow-lg` `0 1rem 3rem rgba(0, 0, 0, 0.175)`; `--bs-box-shadow-inset` `inset 0 1px 2px rgba(0, 0, 0, 0.075)`; focus width `0.25rem`, opacity `0.25`, color `rgba(13, 110, 253, 0.25)`.

Breakpoints. `$grid-breakpoints` (`_variables.scss:484-491`): xs 0, sm `576px`, md `768px`, lg `992px`, xl `1200px`, xxl `1400px`. Also `--bs-breakpoint-*` at `bootstrap.css:782-788`. Fixed-string counts: `576px` 11, `768px` 9, `992px` 10, `1200px` 22, `1400px` 9. `$container-max-widths` (`_variables.scss:503-509`): `540px` 1, `720px` 1, `960px` 1, `1140px` 2, `1320px` 1. The two maps are separate.

Spacing. `$spacer: 1rem` (`_variables.scss:410`). Buttons and inputs: padding-y `.375rem`, padding-x `.75rem` (`:789-790`); `.btn` emits those (`bootstrap.css` via the veneer copy at `src/bootstrap/components/_buttons.scss:5-6`). Card spacer is `$spacer` on both axes (`_variables.scss:1342-1343`). Modal dialog margin `.5rem`, and `1.75rem` from the small breakpoint up (`:1505-1506`). `0.75rem` count 35, `1.25rem` count 19.

`0.15s ease-in-out` count 45 (`$btn-transition` at `_variables.scss:853`; also `$input-transition` at `:933`).

Z-index stack (`_variables.scss:1133-1142`). As custom properties: `--bs-dropdown-zindex: 1000` once, `--bs-modal-zindex: 1055`, `--bs-backdrop-zindex: 1050`, `--bs-offcanvas-zindex: 1045`, `--bs-popover-zindex: 1070`, `--bs-tooltip-zindex: 1080`, `--bs-toast-zindex: 1090` twice. Raw `z-index: 1020` 12, `1030` 2, `1040` 1. `$zindex-levels` is n1 −1, 0, 1, 2, 3 (`_variables.scss:1146-1152`). Raw `z-index: 1000` count 0.

## 3. Tailwind 4.3.3 `theme.css`

`/home/user/veneer/node_modules/tailwindcss/theme.css` opens `@theme default {` at `:1` and closes at `:500`. Every color step is named, including 500. Families and ranges: red `:10-20`, orange `:22-32`, amber `:34-44`, yellow `:46-56`, lime `:58-68`, green `:70-80`, emerald `:82-92`, teal `:94-104`, cyan `:106-116`, sky `:118-128`, blue `:130-140`, indigo `:142-152`, violet `:154-164`, purple `:166-176`, fuchsia `:178-188`, pink `:190-200`, rose `:202-212`, slate `:214-224`, gray `:226-236`, zinc `:238-248`, neutral `:250-260`, stone `:262-272`, mauve `:274-284`, olive `:286-296`, mist `:298-308`, taupe `:310-320`. Each is `oklch(L% C H)` for shades 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950. `--color-black: #000` and `--color-white: #fff` at `:322-323`. There is no unsuffixed `--color-blue` (or other family) in this file. `--color-blue-500` is `oklch(62.3% 0.214 259.815)` at `:135`; `--color-blue-600` is `oklch(54.6% 0.245 262.881)` at `:136`; `--color-gray-50` `oklch(98.5% 0.002 247.839)` `:226`; gray-100 `:227`; gray-200 `:228`; gray-300 `:229`; gray-400 `:230`; gray-500 `:231`; gray-800 `:234`; gray-900 `:235`; gray-950 `:236`.

`--font-sans` `:2-4`, `--font-mono` `:5-7`, `--font-serif` `:4`. `--spacing: 0.25rem` `:325`. Breakpoints `:327-331`: sm `40rem`, md `48rem`, lg `64rem`, xl `80rem`, 2xl `96rem` (640/768/1024/1280/1536 at 16px). Containers `:333-345`: 3xs `16rem` through 7xl `80rem` (3xs, 2xs, xs, sm `24rem`, md `28rem`, lg `32rem`, xl `36rem`, 2xl `42rem`, 3xl `48rem`, 4xl `56rem`, 5xl `64rem`, 6xl `72rem`, 7xl `80rem`). Text and line-height `:347-372` (`--text-xs` `0.75rem` through `--text-9xl` `8rem`, each with `--text-*--line-height`). Weights `:374-382` (100 through 900). Radii `:397-404`: xs `0.125rem`, sm `0.25rem`, md `0.375rem`, lg `0.5rem`, xl `0.75rem`, 2xl `1rem`, 3xl `1.5rem`, 4xl `2rem`. Shadows `:406-412`, plus inset `:414-416`, drop `:418-423`, text `:425-432`. `--default-transition-duration: 150ms` and `--default-transition-timing-function` `:492-493`. `--default-font-family` and mono counterparts `:494-499`.

Deprecated block `@theme default inline reference` `:503-510`: `--blur: 8px`, `--shadow` equal to `--shadow-sm`, `--shadow-inner`, `--drop-shadow`, `--radius: 0.25rem`, `--max-width-prose: 65ch`.

`index.css` of the same package repeats `@theme default` inside `@layer theme` (`/home/user/veneer/node_modules/tailwindcss/index.css:1-5`). `utilities.css` is only `@tailwind utilities;`.

Flag parser in `/home/user/veneer/node_modules/tailwindcss/dist/lib.js:32`: `reference` sets bit 2, `inline` bit 1, `default` bit 4, `static` bit 8. On the theme object (`lib.js:3`):

- `add` stores `{value, options, src}`. If the incoming options have bit 4 and an existing value does not, the add returns without replacing. Value `initial` deletes the key.
- `hasDefault` is true when `getOptions & 4` equals 4.
- `resolve(candidate, keys, inlineFlag)` looks up `` `${key}-${candidate}` `` (dots become underscores), then returns the raw value when `(inlineFlag | options) & 1`, otherwise `var(--prefixed-name)` with the raw value as a fallback only when options have bit 2.
- `markUsedVariable` sets bit 16.
- A keeper returns true when `getOptions & 24` (bits 8 or 16) or a dependency is kept. Emission walks `theme.entries()` and `continue`s when `options & 2`.

Color utilities pass theme keys ending in `--color` (`bg` tries `--background-color`, then `--color`). `bg-blue-500` therefore resolves `--color-blue-500`. With `@theme` and no `inline`, the utility value is `var(--color-blue-500)` and the variable is emitted only after it is marked used, unless `static` kept it. `reference` omits the custom property and puts the value in the `var()` fallback. `inline` makes `resolve` return the oklch literal. `default` means a later non-default `@theme` may replace the value. An unused theme variable is not emitted; that is also the measured result for `@theme { --color-primary: #0d6efd; }` (`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/measurements.md:14`).

## 4. Counterparts

OKLab L from sRGB with the standard linearization and Ottosson matrices, hand-rounded. Tailwind L and hue are the first and third oklch components above.

| Bootstrap | Computed L | Compared with | Nearer by L |
| --- | --- | --- | --- |
| `#0d6efd` | ≈57.8%, hue ≈260° | blue-500 L 62.3 h 259.815; blue-600 L 54.6 h 262.881 | blue-600 by Lab distance (about 0.038 versus 0.047); hue is closer to blue-500 |
| `#adb5bd` | ≈76.9% | gray-400 L 70.7; gray-500 L 55.1 | gray-400 |
| `#212529` | ≈26.2% | gray-800 L 27.8; gray-900 L 21.0; gray-950 L 13.0 | gray-800 |
| `#dee2e6` | ≈91% | gray-200 L 92.8; gray-300 L 87.2 | gray-200 |
| `#f8f9fa` | ≈98.2% | gray-50 L 98.5; gray-100 L 96.7 | gray-50 |

Role steps from the Sass weights, same hue family: light bg-subtle = tint 80% = ramp 100; light border-subtle = tint 60% = ramp 200; light text-emphasis = shade 60% = ramp 800; dark text-emphasis = tint 40% = ramp 300; dark border-subtle = shade 40% = ramp 700; dark bg-subtle = shade 80% = ramp 900. `#86b7fe` is tint 50%, between ramp 200 and 300. `#b6d4fe` is tint 70%. Button hover/active use 15/20/25%, which are not Tailwind steps.

Radii: `0.375rem` = `--radius-md`; `0.25rem` = `--radius-sm` and the deprecated `--radius`; `0.5rem` = `--radius-lg`; `1rem` = `--radius-2xl` (`--radius-xl` is `0.75rem`); `2rem` = `--radius-4xl`; `50rem` has no `--radius-*` equal.

Headings at the 1200px cap: h4 `1.5rem` = `--text-2xl`; h5 and `.lead` `1.25rem` = `--text-xl`; h6 and `.fs-6` `1rem` = `--text-base`. h1 `2.5rem`, h2 `2rem`, and h3 `1.75rem` sit between `--text-3xl` `1.875rem`, `--text-4xl` `2.25rem`, and `--text-5xl` `3rem`. `.small` is `0.875em`; `--text-sm` is `0.875rem`. Display caps `5rem` and `4.5rem`/`4rem`/`3.5rem`/`3rem`/`2.5rem` are not equal to a `--text-*` size (`--text-7xl` is `4.5rem`, `--text-8xl` is `6rem`).

`$grid-breakpoints` and `$container-max-widths` are independent (`_variables.scss:484-509`), so writing 640/768/1024/1280/1536 into the breakpoint map leaves container max-widths at 540/720/960/1140/1320. Only md is already 768 on both sides. Tailwind `--container-*` (`theme.css:333-345`) is a different scale from those five widths. Infixes: 31 `$utilities` keys set `responsive: true` in `/home/user/veneer/src/bootstrap/_utilities.scss` (float, object-fit, display, flex, flex-direction, flex-grow, flex-shrink, flex-wrap, justify-content, align-items, align-content, align-self, order, margin, margin-x, margin-y, margin-top, margin-end, margin-bottom, margin-start, padding, padding-x, padding-y, padding-top, padding-end, padding-bottom, padding-start, gap, row-gap, column-gap, text-align). Column and offset classes are written out in `components/_grid.scss` (`.col-sm` at `:194`), not in that map. Tailwind registers one media variant per `--breakpoint-*` key, `(width >= <value>)`, for utilities in general (`lib.js` breakpoint namespace loop).

Font stacks differ at the front: Bootstrap sans starts `system-ui` and includes `Liberation Sans` (`bootstrap.css:74`); Tailwind sans starts `-apple-system, BlinkMacSystemFont` and has no `Liberation Sans` (`theme.css:2-4`). Bootstrap mono starts `SFMono-Regular` (`bootstrap.css:75`); Tailwind mono starts `ui-monospace` (`theme.css:5-7`).

## 5. Veneer mechanism

`/home/user/veneer/src/bootstrap/_tokens.scss:32-66` (and the dark block from `:154`) writes the `:root, [data-bs-theme='light']` custom properties as quoted strings interpolated with `#{}`, for example `--bs-blue: #{'#0d6efd'}` at `:35` and `--bs-primary-rgb: #{'13, 110, 253'}` at `:66`. Those are CSS text, not Sass colors, and not calls to `tint-color`. `index.scss:1-5` forwards `$layered` and loads reset, elements, components, utilities. The utilities map references `var(--bs-*-rgb)` and `var(--bs-*-emphasis/bg-subtle)` (`_utilities.scss:763-787`, `:800-812`, `:867-888`, `:901-913`), plus two raw `rgba` literals at `:782-783`.

Component files use the same quoted literals. `.btn-primary` is `--bs-btn-bg: #{'#0d6efd'}` and neighbors at `components/_buttons.scss:98-112`. Data URIs are quoted strings that already contain `%23` (`components/_close.scss:6`). `%23` also occurs in `_form-check.scss` (5 lines), `_carousel.scss` (4), `_accordion.scss` (4), `_validation.scss` (4), `_form-select.scss` (2), `_close.scss` (1).

Compiled `/home/user/veneer/dist/src/bootstrap/index.css:8-11` emits `:root, [data-bs-theme=light]` and `--bs-blue: #0d6efd` inside `@layer bootstrap`. The values match `bootstrap.css:7-9`. The sheet is not byte-identical to `bootstrap.css`: it has the layer order (`dist/.../index.css:2`) and the layer wrapper (`:8`).

`/home/user/veneer/configs/src/vite.tailwindcss.config.ts:1-23` sets the Tailwind sheet build (`cssMinify: false`, entry `src/tailwindcss/sheet.ts`). It contains no color replacement. `/home/user/veneer/src/tailwindcss/_tokens.scss:261` is an `@source not inline(...)` class-name exclusion, not a palette rewrite.

A substitution of the characters `#0d6efd` hits the quoted Sass strings and the compiled CSS. It does not hit `%230d6efd` (not present) or the other `%23` forms, nor `13, 110, 253` / `rgba(13, 110, 253, 0.25)`.

## 6. Prior writing

`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/brief.md:86-90` is ruling R11 (2026-10-04): under the layer, Bootstrap tokens take Tailwind values where a counterpart exists (theme colors, grays, derived tints and shades, color-mode variants, body and border, radii, font stacks, type scale, shadows, focus ring, breakpoints and container widths where the scales can agree). The map is a build input; `./bootstrap` stays byte-identical. The design round named there is `tailwind-flip/tokens/`. That directory is not in the flip folder (listing: brief, design, design-verdict, measurements, probes, scout-distillate, units, writers).

`measurements.md:13-14` and `:20`: with the 1833-name exclusion, adding `@theme { --color-primary: #0d6efd; }` left the compile byte-identical because `bg-primary` and `text-primary` stay excluded and an unused theme variable is not emitted. `.rounded` compiled to `border-radius: 0.25rem`.

`design/proposal-consumer-proof.md:11` and `design/proposal-tuned-build.md:13` record that same byte-identity. `design-verdict.md:9` and `:12` record the exclusion and that `./bootstrap` stays byte-identical, with switches configured from `src/tailwindcss/_tokens.scss`. `design-verdict.md:153` adds `$scoped` to those switches. None of those verdict lines pairs a Bootstrap hex with an oklch shade.

`plan.md:13-15` records a `src/core` token registry keyed to the CSS that declares each token, and a later Tailwind inventory via the installed package. `scout-distillate.md:102` says an older token row carried fonts, type, space, radius, and shadow at Bootstrap-equal values.

Showcase hits on “substitut” (`showcase/browse/reading-design/browse-11-design.md:91` and neighbors) are about browse readings, not color tokens.

# Distillate

Bootstrap 5.3.8’s compiled sheet has 424 hex occurrences. Theme custom properties hold the bases, the gray scale, and the tint/shade roles; component rules repeat those hexes on `.btn-*`, `.table-*`, focus rings, checks, ranges, nav pills, pagination, and progress, and repeat some of them as `%23` inside SVG data URIs (23 hits, none in the theme blocks). `tint-color` / `shade-color` are `mix` with white or black. Veneer stores the compiled literals as quoted Sass strings in `_tokens.scss` and the component partials; utilities point at `var(--bs-*)`. The Tailwind Vite config does not rewrite them. Tailwind 4.3.3’s `@theme default` lists oklch families through mauve/olive/mist/taupe, with 500 as a named step and no bare `--color-<family>`. `@theme` bits: inline 1 (raw value in utilities), reference 2 (omit the custom property, fallback inside `var()`), default 4 (overridable), static 8 (keep if unused), used 16 (keep). `#0d6efd` is nearer blue-600 in OKLab and nearer blue-500 in hue. `#f8f9fa`, `#dee2e6`, `#adb5bd`, and `#212529` are nearer gray-50, gray-200, gray-400, and gray-800. Breakpoint and container maps are separate; 31 utility keys carry the responsive infix.

# Contradictions

None between the compiled hexes and the `mix` weights in `_variables.scss` / `_variables-dark.scss`. R11 names `warning` as amber or yellow and `info` as cyan or sky; this inventory does not choose between them. `#212529` is `$gray-900` in Bootstrap and nearer Tailwind gray-800 by the OKLab L computed here.

# Unknowns

- Nearest OKLab shade for `$indigo`, `$purple`, `$pink`, `$red`, `$orange`, `$yellow`, `$green`, `$teal`, `$cyan`, and for `$gray-200`/`$gray-400`/`$gray-600`/`$gray-700`/`$gray-800`, was not reduced. The five pairs in Question 4 were.
- The button-variant mixin that applies the 15/20/25% amounts is outside the read list. The amounts and the matching compiled hexes are in the files above.
- `1rem` and `2rem` occurrence counts were skipped because `1rem` is a suffix of `0.1rem`.