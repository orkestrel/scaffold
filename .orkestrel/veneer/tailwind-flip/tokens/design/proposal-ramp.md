# Tokens proposal: ramp (blind planner, 2026-10-04)

Every color Bootstrap for Tailwind emits is a named Tailwind token, chosen by role from one ramp table that applies to every hue, and frozen as a literal-keyed table of 123 rows that maps all 616 color occurrences with zero role conflicts. Scales map by role name (sm to sm, xl to xl) where Tailwind has the name. The mechanism is two Sass switches, `$palette` (keyed by Bootstrap's literal) and `$scale` (keyed by role), configured from `src/tailwindcss/_tokens.scss` like the five structural switches. Their defaults return Bootstrap's own text, so `./bootstrap` stays byte-identical. The contrast rule holds all 112 shipped text pairings at or above the lower of Bootstrap's ratio and 4.5:1.

## Sources

The proposal cites its numbers with the following tags:

- [P]: the GPT-6 Astra probe (2026-10-04): `probe-report.md`, `inventory.json`, `nearest.json`, `scales.json`, and `tailwind-theme.json`, covering Bootstrap 5.3.8 and Tailwind 4.3.3.
- [S]: `scout-distillate.md` (Grok 4.7, 2026-10-04).
- [V]: `../design-verdict.md`, with § 12 superseding earlier text.
- [R]: the ramp planner's measurement (2026-10-04). It computes WCAG 2 relative luminance over Bootstrap's compiled literals and over the sRGB hexes `tailwind-theme.json` records. It takes OKLab distance by the conversion `tailwind-theme.json` records, measured to the clipped sRGB value the sheet emits; [P] measures to the unclipped oklch value, so the two can differ for gamut-clipped tokens. It covers 121 pairings (112 text, 9 UI) built from the brief's list. The measurement lane reproduces [R] into `tokens/measurements/` before the verdict.
- Code: veneer `600f8a1` on `ccr-d15a48b1-yyyll6`, and `node_modules/tailwindcss/theme.css` (SHA-256 `443d7af3…` [P]).

## 1. Rulings on the brief's questions

### Q1. The map's policy

**Ruling: role by ramp.** Each Bootstrap role maps to one Tailwind step in the Tailwind family that carries the Bootstrap hue's name, using the same step table in every hue (§ 3). Every derived literal then maps through its role, and the result freezes into a literal-keyed table.

Reason: Bootstrap's algebra over Tailwind bases emits 123 distinct colors, of which 21 are Tailwind tokens [R]. Nearest by ΔE across all families spreads the palette over 23 families, among them `mist`, `olive`, `mauve`, and `taupe` [R]. It also drops the `.dropdown-menu-dark` header from 5.55:1 to 4.49:1 [R]. The ramp emits 60 distinct values, and all 60 are Tailwind tokens: 58 named steps plus `--color-black` and `--color-white` [R]. A Tailwind user reads `.btn-primary` as `bg-blue-600 hover:bg-blue-700 active:bg-blue-800` and `.alert-primary` as `bg-blue-100 border-blue-200 text-blue-800`.

**Families.** Each hue takes the family with its own name: `$blue` to blue, `$indigo` to indigo, `$purple` to purple, `$pink` to pink, `$red` to red, `$orange` to orange, `$yellow` to yellow, `$green` to green, `$teal` to teal, `$cyan` to cyan, and the grays to `gray`.

The name decides over a nearer family. Nearer families exist for three hues: `#6610f2` sits nearer violet-700 (0.028 [P]), `#ffc107` nearer amber-400 (0.023 [P]), and `#0dcaf0` nearer sky only at 0.052 [P]. The name is what a reader matches: `--bs-yellow` reading `yellow-500` is legible, while reading `amber-400` is not.

**Base step.** Each base takes the step of its family nearest Bootstrap's base by OKLab ΔE, among the steps that keep every pairing Bootstrap ships for that color at the contrast rule. The rule yields blue-600, indigo-600, purple-800, pink-600, red-600, orange-400, yellow-500, green-700, teal-500, and cyan-500 (§ 3.1).

blue-500 fails the rule. White on blue-500 reads 3.76:1, against 4.50:1 for Bootstrap's `#0d6efd`; white on blue-600 reads 5.25:1 [R]. The same 3.76:1 hits `.text-primary` and the link on white [R].

yellow-400 and cyan-400 are nearer by ΔE, but each fails as text on white: `.text-warning` reads 1.57:1 against Bootstrap's 1.63:1, and `.text-info` 1.81:1 against 1.96:1 [R]. yellow-500 and cyan-500 read 1.91:1 and 2.37:1 [R], and black text on them reads 10.99:1 and 8.88:1 [R].

**Contrast rule.** The rule has one text clause and one UI clause:

- Text: every text pairing Bootstrap ships reads at or above the lower of its ratio under Bootstrap alone and 4.5:1.
- UI: every UI pairing reads at or above the lower of its Bootstrap ratio and 3:1. The two exceptions each have one end fixed by a text ruling: the `--bs-border-color` literal `#dee2e6` is also the dark body color, and the focus ring takes its color from primary. Both are recorded with both ratios.

The brief's second option, every pairing at 4.5:1 or 3:1, is refused. Bootstrap alone ships 14 of the 121 pairings below it [R], among them `.text-warning` at 1.63:1 and the focus ring at 1.41:1. Meeting it would mean redesigning Bootstrap's warning and info roles, not mapping them.

### Q2. Derived values

**Ruling: Tailwind ramp neighbors, counted by Bootstrap's amount, never Bootstrap's algebra.** Bootstrap's state amounts are mixes with black or white:

- An amount of 15% or less moves one step.
- 20% or 25% moves two steps.
- The direction follows Bootstrap's function: `shade-color` steps darker and `tint-color` steps lighter.

Bootstrap's mixes produce colors between Tailwind's steps (102 of 123 non-tokens [R]); the step count keeps every state a token and keeps hover and active apart: primary hover 700, active 800.

The same rule covers the remaining derived roles:

- Table variants: the background is the role's `bg-subtle` literal (100). Striped, hover, and active (factors 0.05, 0.075, and 0.1) move one step (200), and the border (0.2) two steps (300). `.table-dark` steps lighter from gray-950.
- Link hover: two steps darker (blue-800) in light mode, two steps lighter (blue-100) in dark mode.
- Focus border (`tint-color` 50%): blue-400, because blue-300 reads 1.81:1 against white where Bootstrap's `#86b7fe` reads 2.06:1 [R].
- Range thumb active (tint 70%): blue-300, because blue-200 reads 1.42:1 against Bootstrap's 1.52:1 [R].
- Alpha forms and `-rgb` triplets take the channels of the row's resolved sRGB value. `rgba(13, 110, 253, 0.25)` becomes `rgba(21, 93, 252, 0.25)`, and `13, 110, 253` becomes `21, 93, 252`.

The rule is realizable as a literal table. Of 163 literal spellings, 149 resolve to one token through their Sass origins and 14 are alpha or `transparent` spellings that derive from an opaque row. No literal serves two roles that map to different tokens: 0 conflicts in 123 opaque rows [R over the origins in `inventory.json`].

The shared literals land coherently. `#0a58ca` is primary hover border, active background, and link hover, all three blue-800. `#4d5154` is `.btn-dark` active background and `.table-dark` border, both gray-800. `#c6c7c8` is `.btn-light` hover border, `.btn-light` active background, and `.table-light` border, all gray-200.

### Q3. Which scales

**Ruling: map by role name where Tailwind has the name, and keep Bootstrap's value elsewhere** (§ 3.8). The ruling applies scale by scale:

- **Radii.** The roles map by name: `--bs-border-radius` to `--radius-md`, `-sm` to `--radius-sm`, and `-lg` to `--radius-lg`, all equal already [P]. `-xl` maps to `--radius-xl` (1rem becomes 0.75rem) and `-xxl` to `--radius-2xl` (2rem becomes 1rem). `-pill` keeps 50rem, because Tailwind's `rounded-full` is a static utility with no theme token [P `theme.css:397-404`].
- **Fonts.** `--bs-font-sans-serif` takes `--font-sans` and `--bs-font-monospace` takes `--font-mono`, both literal stacks [`theme.css:2-7`].
- **Type.** h4, h5, h6, and `.lead` equal `--text-2xl`, `--text-xl`, `--text-base`, and `--text-xl` [P]. The remaining heading caps take the next Tailwind rungs in rank: h3 `--text-3xl` (1.875rem), h2 `--text-4xl` (2.25rem), and h1 `--text-5xl` (3rem).
  - The fluid forms stay and are recomputed with Bootstrap's own RFS (responsive font size) formula at its unchanged 1200px breakpoint: `calc(1.3125rem + 0.75vw)`, `calc(1.35rem + 1.2vw)`, and `calc(1.425rem + 2.1vw)`.
  - The same rows apply to `.h1` to `.h3` and `.fs-1` to `.fs-3`.
  - Headings keep Bootstrap's unitless 1.2 line height.
  - The six `.display-*` sizes keep Bootstrap's values. Tailwind has 5 rungs from 2.25rem to 6rem for 6 display sizes, so no rank-preserving map exists. `.small` keeps 0.875em, because an em is relative to the parent.
- **Shadows.** The roles map by name and rank: `--bs-box-shadow-sm` to `--shadow-sm`, `--bs-box-shadow` to `--shadow-md`, `--bs-box-shadow-lg` to `--shadow-lg`, and `--bs-box-shadow-inset` to `--inset-shadow-xs` [`theme.css:406-416`].
- **Focus ring.** Bootstrap's geometry stays (0.25rem width, 0.25 opacity), with color from primary. `theme.css` declares no ring token [P].
- **Breakpoints.** They align by name in rem: sm 40rem, md 48rem, lg 64rem, xl 80rem, and xxl 96rem, so every Bootstrap infix and the Tailwind variant of the same name flip at one width. The `-down` forms become 39.99875rem to 95.99875rem. RFS keeps its 1200px breakpoint, because it is a type parameter, not a layout breakpoint.
- **Containers.** The max-width equals the breakpoint (40rem to 96rem), which is Tailwind's `container` convention. Bootstrap's widths (540, 720, 960, 1140, and 1320px) follow no formula: the gap to the breakpoint runs 36, 48, 32, 60, and 80px [S]. `--bs-modal-width` on `.modal-xl` keeps 1140px.
- **Spacing.** Bootstrap's values stay: every spacer equals a `--spacing` multiple [P, 6 of 6 rows], and every component padding (0.375, 0.75, 1.25, and 1.75rem) is a 0.25rem multiple.
- **Transitions and z-indices.** Both stay, as the brief says.

### Q4. The mechanism

**Ruling: Sass switches.** `$palette` (literal-keyed, colors) and `$scale` (role-keyed, scales) live in `src/bootstrap/_mixins.scss`, read by the functions `swatch($literal)` and `scale($role, $value)` at 715 call sites. They are configured only from `src/tailwindcss/_tokens.scss` (§ 4).

The law decides first. `AGENTS.md` § Project model lets `src/tailwindcss` configure the Bootstrap partials "through their `_tokens.scss` switches". `styles.md` puts the `!default` switch an emitter reads in `_mixins.scss`. A Vite text substitution is no switch.

The consumer's story decides second. `./tailwindcss/scss` resolves `src/tailwindcss/index.scss` [V § 3], so a substitution in `configs/src/vite.tailwindcss.config.ts` would ship two different Bootstrap-for-Tailwind sheets from one export. The hybrid inherits the same defect for the components and is refused.

Provability is equal across the three. The literal-keyed table is a pure function of the lifted sheet's values in every form, and the derivation proof applies it in TypeScript (§ 5).

The cost of the edit decides last:

- 616 color sites [P], plus 79 layout and 20 type, radius, shadow, and font sites, which is 715 call-site edits.
- The edit is a generated rewrite on a copy, accepted only when the default `./bootstrap` digest `7932f7a5…` [V] and the lifted compile are unchanged.

Colors are literal-keyed because the role table collapses to a value table with 0 conflicts [R]. Scales are role-keyed because their literals are ambiguous: `1200px` is both the xl breakpoint and the RFS cap, `calc(1.375rem + 1.5vw)` is both h1 and `.display-6`, and `1rem` is everywhere.

### Q5. Output form

**Ruling: resolved sRGB hex everywhere, clipped per channel as `tailwind-theme.json` records.** A literal-keyed row needs one value per row, and the triplets and alpha forms need sRGB channels. 22 of the 58 tokens used lie outside sRGB; the largest clipping distance is 0.027 (yellow-400), and the next are yellow-500 at 0.022 and cyan-400 at 0.017 [R]. `oklch()` literals are refused: a `.btn-danger` in oklch beside `.text-bg-danger`, which reads `RGBA(var(--bs-danger-rgb))`, would split one Bootstrap role across two values on a wide-gamut display. Breakpoints and containers keep Tailwind's rem unit, so they agree with Tailwind's variants under any browser default font size.

### Q6. The proofs

**Ruling: adopt every proof the brief lists, with three amendments.**

1. The token proof is literal-keyed two-way, and the theme proof resolves every row from `theme.css` under its digest.
2. The partition case maps its `bootstrap`-face reading through the token table, never through a fourth stylesheet state, which keeps the journey budget.
3. The paired engine states case does not change. It reads the engine's output, panel text, and visibility, and the map changes none of those.

The `unexcluded` face keeps `./bootstrap`, and with it Bootstrap's values. It shows a consumer's Tailwind composed beside Bootstrap without the layer, and the map belongs to the layer. Only the `tailwindcss` face shows the map. This corrects the brief's "the two Tailwind faces show the map". § 5 holds the cases.

### Q7. The 17 shared component names

**Ruling: they stay Bootstrap's (R2 [V]) and carry the map.** Under the layer, the names read as follows:

- `.container`: reads `width: 100%`, Bootstrap's 0.75rem gutter padding, and `max-width` equal to Tailwind's breakpoint at each of Tailwind's widths. The width matches what a Tailwind user's `container` reads; the gutter is what Bootstrap's `.row` needs.
- `.table`: reads gray-200 borders and the role steps of § 3.5.
- `.collapse` and `caption-top`: do not change.
- `col-*`: changes only its breakpoints.

### Q8. Dark mode

**Ruling: dark roles come from the ramp.** The dark steps are:

- Text emphasis 300, `bg-subtle` 950, and `border-subtle` 800.
- Body background gray-950 and body color gray-200.
- Secondary background gray-800, tertiary background gray-900, and border gray-600.
- Link blue-300, with hover blue-100.

Bootstrap's shade-80% literal is nearest step 950 in all 10 hues [R], so 900 is refused for `bg-subtle`. gray-950 for the body comes from the gray map (§ 3.2): every dark text pairing rises, body text from 11.85:1 to 16.26:1 and `.text-secondary` from 3.29:1 to 4.16:1 [R]. The weakest dark alert reads 8.15:1 (`.alert-primary`) [R].

### Q9. Order and landing

**Ruling: the token units join the structural flip after U7 and before U8**, so one gate pass and one falsify round cover the final claims (§ 6). The token units rewrite the baselines that U4 and U6 wrote; landing them after the flip would gate and attack the same cases twice.

The showcase's contrast cases pass under the map: every text pairing Bootstrap ships at 4.5:1 or more stays at 4.5:1 or more, and the lowest is `code` at 4.54:1 [R]. The journey budget does not widen, because the partition maps its existing reading (Q6) and adds no face pass.

## 2. Measurements behind the rulings

The candidate maps compare as follows over the 121 pairings, under the contrast rule of Q1 [R]:

| Candidate | Distinct colors | Tailwind tokens | Text pairings below the rule | UI pairings below 3:1 that Bootstrap holds |
| --- | --- | --- | --- | --- |
| Ramp (this proposal) | 60 | 60 | 0 | 0 |
| Bootstrap's algebra over the same bases | 123 | 21 | 0 | 0 |
| Nearest by ΔE across all families | 123 rows into 23 families | all | 1 (`.dropdown-menu-dark` header 5.55 to 4.49) | 0 |
| Ramp with grays by name (N to N) | 60 | 60 | 5 (`.alert-dark` 5.47 to 3.96; dropdown header 5.55 to 3.03; three dark-mode reads) | 0 |
| Ramp with blue-500 primary | 60 | 60 | 3 (`.btn-primary`, `.text-primary`, link: 4.50 to 3.76) | 0 |
| Ramp with cyan-400 and yellow-400 | 60 | 60 | 2 (`.text-info` 1.96 to 1.81, `.text-warning` 1.63 to 1.57) | 0 |

The selected pairings under Bootstrap alone and under the ramp read as follows [R]:

| Pairing | Bootstrap | Ramp |
| --- | --- | --- |
| `.btn-primary` text on base | 4.50 | 5.25 |
| `.btn-success` text on base | 4.53 | 4.95 |
| `.btn-danger` text on base | 4.53 | 4.77 |
| `.btn-secondary` text on base | 4.69 | 4.84 |
| `.btn-warning` text on base | 12.88 | 10.99 |
| `.text-info` on white | 1.96 | 2.37 |
| `.alert-dark`, light mode | 5.47 | 5.13 |
| `.dropdown-menu-dark` header | 5.55 | 5.64 |
| Body text, light and dark | 15.43, 11.85 | 20.13, 16.26 |
| `code`, light | 4.50 | 4.54 |
| Focus border against white (UI) | 2.06 | 2.64 |
| Focus ring over the dark body (UI, recorded) | 1.29 | 1.24 |
| `--bs-border-color` against white (UI, recorded) | 1.30 | 1.24 |

Across the 121 pairings, 106 rise and 15 fall; every fall stays inside the rule except the two recorded UI pairings [R].

The ramp's 123 rows sit at a mean OKLab distance of 0.068 from Bootstrap's values, with a median of 0.063, and 44 rows within 0.05. The farthest row is `#424649` to gray-900 at 0.184 [R]. The distance is the price of naming every state.

The breakpoint alignment changes no infix state at the journey widths. At 390px every infix is off either way. At 768px `sm` is on (576 or 640) and `lg` is off (992 or 1024). At 1280px `lg` and `xl` are on (1200 or 1280) and `xxl` is off (1400 or 1536). These follow from the boundaries in `_variables.scss:484-491` and `theme.css:327-331`. The container max-width moves from 720px to 768px at 768px and from 1140px to 1280px at 1280px.

## 3. The map

### 3.1 Palette hues

The ten bases map as follows, with the distance to the emitted sRGB value [R]:

| Bootstrap | Literal | Token | sRGB | ΔE |
| --- | --- | --- | --- | --- |
| `$blue`, `$primary` | `#0d6efd` | blue-600 | `#155dfc` | 0.038 |
| `$indigo` | `#6610f2` | indigo-600 | `#4f39f6` | 0.052 |
| `$purple` | `#6f42c1` | purple-800 | `#6e11b0` | 0.077 |
| `$pink`, `$code-color` | `#d63384` | pink-600 | `#e60076` | 0.040 |
| `$red`, `$danger` | `#dc3545` | red-600 | `#e7000b` | 0.047 |
| `$orange` | `#fd7e14` | orange-400 | `#ff8904` | 0.026 |
| `$yellow`, `$warning` | `#ffc107` | yellow-500 | `#f0b100` | 0.048 |
| `$green`, `$success` | `#198754` | green-700 | `#008236` | 0.039 |
| `$teal` | `#20c997` | teal-500 | `#00bba7` | 0.054 |
| `$cyan`, `$info` | `#0dcaf0` | cyan-500 | `#00b8db` | 0.053 |
| `$black`, `$white` | `#000`, `#fff` | black, white | `#000`, `#fff` | 0 |

### 3.2 Grays

The grays map one step lighter through gray-700, and take Tailwind's darker ends at 800 and 900. Bootstrap's grays read lighter than Tailwind's through the middle of the ramp: gray-(N−100) is the nearest Tailwind gray for 8 of the 9 Bootstrap grays, all but gray-200 [R]. Bootstrap's 800 and 900 carry the dark surfaces (the `.dropdown-menu-dark` background and the dark body), which need Tailwind's darker ends to keep the lighter text grays at the contrast rule.

Of the 55 strictly increasing gray maps, 5 pass the contrast rule, and this map has the least summed ΔE among them (0.355) [R]. Grays by name break 5 text pairings (§ 2).

| Bootstrap | Literal | Token | sRGB | Roles that ride on it |
| --- | --- | --- | --- | --- |
| `$gray-100`, `$light` | `#f8f9fa` | gray-50 | `#f9fafb` | tertiary background; dark `light-text-emphasis` |
| `$gray-200` | `#e9ecef` | gray-100 | `#f3f4f6` | secondary background; `light-border-subtle` |
| `$gray-300` | `#dee2e6` | gray-200 | `#e5e7eb` | border color; dark body color |
| `$gray-400` | `#ced4da` | gray-300 | `#d1d5dc` | `dark-bg-subtle` |
| `$gray-500` | `#adb5bd` | gray-400 | `#99a1af` | `dark-border-subtle`; dark dropdown header |
| `$gray-600`, `$secondary` | `#6c757d` | gray-500 | `#6a7282` | muted text |
| `$gray-700` | `#495057` | gray-600 | `#4a5565` | `light-` and `dark-text-emphasis`; dark border |
| `$gray-800` | `#343a40` | gray-800 | `#1e2939` | dark secondary background; dark dropdown |
| `$gray-900`, `$dark` | `#212529` | gray-950 | `#030712` | body color; dark body background |

### 3.3 Theme roles

Every chromatic theme color takes the same step per role; `light` and `dark` ride on the gray map. The light and dark roles map as follows:

| Role | Bootstrap origin | Light step | Dark origin | Dark step |
| --- | --- | --- | --- | --- |
| `bg-subtle` | tint 80% | 100 | shade 80% | 950 |
| `border-subtle` | tint 60% | 200 | shade 40% | 800 |
| `text-emphasis` | shade 60% | 800 | tint 40% | 300 |
| `light` roles | gray-100 mix, gray-200, gray-700 | gray-50, gray-100, gray-600 | gray-800, gray-700, gray-100 | gray-800, gray-600, gray-50 |
| `dark` roles | gray-400, gray-500, gray-700 | gray-300, gray-400, gray-600 | gray-800 and black mix, gray-800, gray-300 | gray-950, gray-800, gray-200 |
| `secondary` roles | tint 80%, tint 60%, shade 60% | gray-100, gray-200, gray-800 | shade 80%, shade 40%, tint 40% | gray-950, gray-800, gray-300 |

### 3.4 States and tables

The state and table roles follow the amount rule of Q2. The steps are:

| Theme color | Base | Hover bg | Hover border | Active bg | Active border | Focus `-rgb` | Table striped, hover, active | Table border |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| primary | blue-600 | blue-700 | blue-800 | blue-800 | blue-800 | blue-500 | blue-200 | blue-300 |
| secondary | gray-500 | gray-600 | gray-700 | gray-700 | gray-700 | gray-400 | gray-200 | gray-300 |
| success | green-700 | green-800 | green-900 | green-900 | green-900 | green-600 | green-200 | green-300 |
| info | cyan-500 | cyan-400 | cyan-400 | cyan-300 | cyan-400 | cyan-600 | cyan-200 | cyan-300 |
| warning | yellow-500 | yellow-400 | yellow-400 | yellow-300 | yellow-400 | yellow-600 | yellow-200 | yellow-300 |
| danger | red-600 | red-700 | red-800 | red-800 | red-800 | red-500 | red-200 | red-300 |
| light | gray-50 | gray-100 | gray-200 | gray-200 | gray-200 | gray-100 | gray-100 | gray-200 |
| dark | gray-950 | gray-900 | gray-900 | gray-800 | gray-900 | gray-900 | gray-900 | gray-800 |

Info and warning step lighter because Bootstrap tints them, which pairs them with dark text; every other color steps darker.

### 3.5 Body, link, form, and table roles

The global roles map as follows in each mode:

| Role | Light | Dark |
| --- | --- | --- |
| Body color, body background | gray-950, white | gray-200, gray-950 |
| Emphasis color | black | white |
| Secondary color, tertiary color | gray-950 at 0.75, at 0.5 | gray-200 at 0.75, at 0.5 |
| Secondary background, tertiary background | gray-100, gray-50 | gray-800, gray-900 |
| Border color, translucent border | gray-200, black at 0.175 | gray-600, white at 0.15 |
| Link, link hover | blue-600, blue-800 | blue-300, blue-100 |
| Code | pink-600 | pink-300 |
| Highlight color, highlight background | gray-950, yellow-100 | gray-200, yellow-800 |
| Valid, invalid | green-700, red-600 | green-300, red-300 |
| Focus ring | blue-600 at 0.25 | blue-600 at 0.25 |
| Focus border, range thumb, range thumb active | blue-400, blue-600, blue-300 | the same |
| `.table` background and border | white, gray-200 | gray-950, gray-600 |

### 3.6 Token legend

The 58 named steps the map emits resolve to the following sRGB values (`tailwind-theme.json`, clipped per channel):

| Family | Steps used and sRGB |
| --- | --- |
| blue | 100 `#dbeafe`, 200 `#bedbff`, 300 `#8ec5ff`, 400 `#51a2ff`, 500 `#2b7fff`, 600 `#155dfc`, 700 `#1447e6`, 800 `#193cb8`, 950 `#162456` |
| cyan | 100 `#cefafe`, 200 `#a2f4fd`, 300 `#53eafd`, 400 `#00d3f2`, 500 `#00b8db`, 600 `#0092b8`, 800 `#005f78`, 950 `#053345` |
| green | 100 `#dcfce7`, 200 `#b9f8cf`, 300 `#7bf1a8`, 600 `#00a63e`, 700 `#008236`, 800 `#016630`, 900 `#0d542b`, 950 `#032e15` |
| yellow | 100 `#fef9c2`, 200 `#fff085`, 300 `#ffdf20`, 400 `#fdc700`, 500 `#f0b100`, 600 `#d08700`, 800 `#894b00`, 950 `#432004` |
| red | 100 `#ffe2e2`, 200 `#ffc9c9`, 300 `#ffa2a2`, 500 `#fb2c36`, 600 `#e7000b`, 700 `#c10007`, 800 `#9f0712`, 950 `#460809` |
| gray | 50 `#f9fafb`, 100 `#f3f4f6`, 200 `#e5e7eb`, 300 `#d1d5dc`, 400 `#99a1af`, 500 `#6a7282`, 600 `#4a5565`, 700 `#364153`, 800 `#1e2939`, 900 `#101828`, 950 `#030712` |
| pink | 300 `#fda5d5`, 600 `#e60076` |
| indigo, purple, orange, teal | indigo-600 `#4f39f6`, purple-800 `#6e11b0`, orange-400 `#ff8904`, teal-500 `#00bba7` |

### 3.7 Scales

The scale rows that change, keyed by role, map as follows. Every row not listed keeps Bootstrap's value.

| Role | Bootstrap | Tailwind token | Value under the layer |
| --- | --- | --- | --- |
| `radius-xl` (`--bs-border-radius-xl`) | 1rem | `--radius-xl` | 0.75rem |
| `radius-xxl` (`--bs-border-radius-xxl`) | 2rem | `--radius-2xl` | 1rem |
| `shadow-sm` | `0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)` | `--shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `shadow` | `0 0.5rem 1rem rgba(0, 0, 0, 0.15)` | `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `shadow-lg` | `0 1rem 3rem rgba(0, 0, 0, 0.175)` | `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `shadow-inset` | `inset 0 1px 2px rgba(0, 0, 0, 0.075)` | `--inset-shadow-xs` | `inset 0 1px 1px rgb(0 0 0 / 0.05)` |
| `font-sans` | `system-ui, -apple-system, …` | `--font-sans` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', …` [`theme.css:2-4`] |
| `font-mono` | `SFMono-Regular, Menlo, …` | `--font-mono` | `ui-monospace, SFMono-Regular, …` [`theme.css:5-7`] |
| `h1`, `h1-cap` (with `.h1`, `.fs-1`) | `calc(1.375rem + 1.5vw)`, 2.5rem | `--text-5xl` | `calc(1.425rem + 2.1vw)`, 3rem |
| `h2`, `h2-cap` (with `.h2`, `.fs-2`) | `calc(1.325rem + 0.9vw)`, 2rem | `--text-4xl` | `calc(1.35rem + 1.2vw)`, 2.25rem |
| `h3`, `h3-cap` (with `.h3`, `.fs-3`) | `calc(1.3rem + 0.6vw)`, 1.75rem | `--text-3xl` | `calc(1.3125rem + 0.75vw)`, 1.875rem |
| `breakpoint-sm`, `-md`, `-lg`, `-xl`, `-xxl` | 576, 768, 992, 1200, 1400px | `--breakpoint-*` | 40, 48, 64, 80, 96rem |
| `breakpoint-*-max` | 575.98 to 1399.98px | the breakpoint minus 0.02px | 39.99875 to 95.99875rem |
| `container-sm` to `container-xxl` | 540, 720, 960, 1140, 1320px | `--breakpoint-*` | 40, 48, 64, 80, 96rem |

The following roles keep Bootstrap's values: radii base, sm, lg, and pill; h4 to h6; `.lead`; `.display-*`; `.small`; weights; line heights; the RFS 1200px caps; spacers and paddings; transitions; and z-indices.

## 4. Mechanism

The mechanism changes the following files, each in the shape given:

1. **`src/bootstrap/_mixins.scss`** gains two switches and two functions:
   - `$palette: () !default;` maps a Bootstrap sRGB key (`'#rrggbb'`) to a Tailwind sRGB value.
   - `$scale: () !default;` maps a role name to a value.
   - `@function swatch($literal)` reads any of the five lifted spellings (`'#rgb'`, `'#rrggbb'`, `'%23rrggbb'`, `'R, G, B'`, `'rgba(R, G, B, A)'`) and returns the same spelling of the mapped value. It returns `$literal` unchanged when `$palette` is empty or the row maps a value to itself, and it `@error`s when `$palette` is set and the key has no row.
   - `@function scale($role, $value)` returns `$value` when `$scale` is empty and the row's value otherwise, with the same `@error`.
   - Private `-key` and `-spell` helpers hold the hex-to-channel parse. The functions emit nothing.
2. **`src/bootstrap/_tokens.scss`** declares `$palette: () !default;` and `$scale: () !default;` beside the five switches and passes both through `@use 'mixins' with (...)`. Its 150 color literals become `#{mixins.swatch('#0d6efd')}` and `#{mixins.swatch('13, 110, 253')}`, and its 8 radius, shadow, and font sites become `#{mixins.scale('radius-xl', '1rem')}`. `src/bootstrap/index.scss` keeps `@forward 'tokens' show $layered`, because the map is a build input of the tuned face, not a consumer option of `./bootstrap/scss`.
3. **The component partials and `_reset.scss` and `_utilities.scss`** wrap every literal the inventory lists [P per-file counts], 616 in all:
   - `_buttons.scss` 229, `_tables.scss` 73, `_dropdown.scss` 22, `_navbar.scss` 17, `_form-check.scss` 13, and `_form-range.scss` 13; the rest by the inventory.
   - A data URI interpolates inside its string, for example `stroke='#{swatch('%23fff')}'`.
   - The unquoted `rgba(13, 110, 253, 0.25)` at `_form-check.scss:56` becomes `#{swatch('rgba(13, 110, 253, 0.25)')}`.
   - The 79 layout sites become `@media (min-width: #{scale('breakpoint-sm', 576px)})` and `max-width: scale('container-sm', 540px)`, with `$breakpoints` at `_utilities.scss:1035` wrapped per entry. They break down as 49 sites carrying the five breakpoint values, 25 sites carrying the five `-max` values, and 5 container widths, read from the partials at `600f8a1`; the 49 include the `--bs-breakpoint-*` custom properties and the `$breakpoints` entries.
   - The 12 type sites cover h1 to h3 in `_reset.scss:64-99` and `fs-1` to `fs-3` in `_utilities.scss:676-684`. The 12 RFS caps at 1200px stay unwrapped.
4. **`src/tailwindcss/_tokens.scss`** declares `$palette` (123 rows) and `$scale` (29 rows) and adds `$palette: $palette, $scale: $scale` to its `@use '../bootstrap/tokens' with (...)`. The Tailwind token name of each row lives in the guide's token table, which a Node case pins to these maps (§ 5). Sass forbids an `@each` before `@use`, so the maps hold resolved values, and `styles.md` permits literal colors in `_tokens.scss`.
5. **`src/tailwindcss/index.scss`, `configs/src/vite.tailwindcss.config.ts`, and `package.json`** do not change.

The edit is generated by a script over the inventory's line positions, on a copy, and accepted under four checks:

- The `./bootstrap` SHA-256 equals `7932f7a5…` [V].
- The lifted compile is unchanged.
- `format:check` passes.
- The tuned compile holds no Bootstrap color literal outside the identity rows.

## 5. Proofs

The Node cases, in `tests/src/tailwindcss/index.test.ts` and the `conformance` project, each carry a control:

- `'maps every lifted color literal through the palette and leaves no Bootstrap literal in the tuned sheet'`: scans the lifted and tuned texts with `collectColorLiterals` (the probe's scanner, ported to `tests/setup.ts`) in both directions. Controls: a planted `#123456` in a lifted copy (no row), one deleted palette row (an unmapped literal), and `#0d6efd` restored into a tuned copy.
- `'resolves every palette and scale row from the installed Tailwind theme under its digest'`: converts each named `--color-*` with `resolveThemeColor` (oklch to clipped sRGB, as `tailwind-theme.json` records) and pins `theme.css` at `443d7af3…`. Controls: a row naming blue-500 that carries blue-600's value, and a theme copy with one changed channel.
- `'pins the guide token table to the palette and scale maps'`: Controls: one planted guide row and one removed guide row.
- `'spells every swatch form and returns the Bootstrap literal under an empty palette'`: compiles a scratch entry with a one-row palette over the five spellings. Control: reversed channels.
- The existing `./bootstrap` digest pin stays and gains no exemption.

The Chromium cases in `src:tailwindcss` each carry a control:

- The derivation case is retitled `'derives the tuned sequences by substituting tokens, withholding, moving, copying, restoring, and nothing else'`. Before the structural steps, it applies `substituteTokens` from `tests/setupStyles.ts` to every lifted entry. The function substitutes by value for colors in the CSSOM spellings (`rgb()`, `rgba()`, hex, triplets, and `%23` in `url()`) and for the shadow and font rows at `:root`. It substitutes by context for breakpoint conditions; the 12 RFS cap rules are listed as kept contexts. It substitutes by selector and property for the type and radius rows. Controls: one swatch left at Bootstrap's value, one extra changed value (`--bs-gutter-x`), and one xl rule left at 1200px.
- `'reads every shipped text pairing at or above the lower of Bootstrap's ratio and 4.5:1 under the tuned sheet alone'`: declares `CONTRAST_PAIRINGS` (121) in `tests/setupStyles.ts` and reads each pairing through computed colors and custom properties, compositing alpha over the declared background. It also asserts the UI clause and the two recorded UI ratios. Controls: a tuned copy with `.btn-primary` at blue-500, which fails at 3.76, and the count pin.
- The witness case reads its baseline from the tuned sheet alone: `'pins every curation witness against the tuned sheet alone and rejects each removed repair'`. Its control gains the lifted sheet as baseline, which must fail on a token-bearing witness.

The Chromium cases in `integration` change as follows:

- The witness case's Bootstrap-alone clause reads the tuned sheet alone.
- `'reads Bootstrap for Tailwind as Bootstrap alone through the token map and nothing else'`: on the curated witnesses, every longhand under the tuned sheet alone equals the Bootstrap-alone reading mapped through the table. Control: an identity map fails on `.btn-primary`.

The journey cases change as follows:

- The partition case maps the `bootstrap`-face reading of a shared component name through the token table (colors by the palette, and `.container` max-width by the container rows) before comparing it under the layer face. Control: an identity map fails on `.table` `border-color` and on `.container` `max-width` at 1280px.
- `TAILWIND_READINGS` gains six rows, each giving the Bootstrap-only, unexcluded, and layer values:

  | Reading | Bootstrap only | Unexcluded | With the layer |
  | --- | --- | --- | --- |
  | `.btn-primary` `background-color` | `rgb(13, 110, 253)` | `rgb(13, 110, 253)` | `rgb(21, 93, 252)` |
  | `.alert-primary` background | `rgb(207, 226, 255)` | `rgb(207, 226, 255)` | `rgb(219, 234, 254)` |
  | body `color` | `rgb(33, 37, 41)` | `rgb(33, 37, 41)` | `rgb(3, 7, 18)` |
  | `.h1` at 1280px | 40px | 40px | 48px |
  | `.container` `max-width` at 1280px | 1140px | 1140px | 1280px |
  | `.rounded-4` radius | 16px | 16px | 12px |

- The paired engine states case does not change.
- `reads every header button at 4.5:1 or more` and the legible chip cases run under the map unchanged.

The following records regenerate: both `recipe.json` files, and `similar.json` when its writer reads the tuned sheet. `comparison.json`, `incompatible.json` (read against `./bootstrap`), and `preflight.json` keep their rows.

## 6. Units

The token units run in order on the flip branch, after U7 and before U8:

1. **T0 token-probe** (Astra, writes `tmp/probes/tokens2/` only). It runs six probes:
   - P1: the switches and the generated edit on a copy, checking digests, per-file site counts against the inventory, and the `@error` on a missing row.
   - P2: zero Bootstrap color literals in the tuned compile outside identity rows.
   - P3: the 121 pairings in Chromium, reproducing [R].
   - P4: infix states and container widths at 390, 768, and 1280px.
   - P5: the partition case with mapped expectations, timed against 53 s focused [V § 12].
   - P6: a pixel reading of `bg-red-600` beside `.btn-danger` under the recipe in Chromium.

   Acceptance: each probe exits 0 twice with byte-identical output, and `git status --porcelain` is empty.
2. **T1 token-sheet** (Astra) owns `src/bootstrap/_mixins.scss`, `_tokens.scss`, `_reset.scss`, `_utilities.scss`, the color-bearing and breakpoint-bearing `components/*.scss`, and `src/tailwindcss/_tokens.scss`. It also owns `tests/src/tailwindcss/index.test.ts`, `tests/setup.ts` and `.test.ts` (`collectColorLiterals`, `resolveThemeColor`, `readTokenTable`), `tests/setupStyles.ts` and `.test.ts` (`substituteTokens`, `CONTRAST_PAIRINGS`, `readContrast`), and the guide's token table. Acceptance, cheapest first: `build:src:bootstrap` with SHA-256 `7932f7a5…`, then `build:src:tailwindcss`, `check`, `lint:check`, `test:src:bootstrap` unchanged, `test:src:tailwindcss`, `test:setup`, and `test:setup:browser`.
3. **T2 token-records** (Astra) owns the writers, both `recipe.json` files, and `similar.json` if it changes. Acceptance: the writers are idempotent and the `conformance` project passes.
4. **T3 token-integration** (Astra) owns `tests/integration.test.ts`. Acceptance: `test:integration` with no failure in the Tailwind describes.
5. **T4 token-copy** (Opus, no tracked file) writes the reading labels and the captions in the form "Bootstrap only: … Without the layer: … With the layer: …" for the six readings.
6. **T5 token-journeys** (Astra) owns `tests/setupBrowser.ts` (`TAILWIND_READINGS`, the partition mapping), `tests/app/browser/integration.test.ts`, and the captions in `app/browser/sections/*.html`. Acceptance: `test:app:browser`, `test:setup:browser`, `build`, and `test:journey` on the cloud host, with the wall time recorded against 449 s and 487 s [V § 12].
7. **T6 token-guide** (Opus) owns `guides/veneer.md` § Tailwind compatibility sheet (the consumer table rows for the six readings and the token sentence) and `ROADMAP.md`. Acceptance: `test:guides`, `test:policy`, and every backticked case title resolves.

U8 and the falsify round then cover the flip and the tokens together.

## 7. Defaults applied for the user

The planner applies the following defaults, each for the user to confirm or reverse:

1. Primary is blue-600, not blue-500 (contrast, Q1).
2. Families follow Bootstrap's hue names: indigo over violet, yellow over amber, cyan over sky, and gray over slate, zinc, or neutral.
3. Warning and info sit at 500.
4. Grays map one step lighter, with gray-800 and gray-950 at the dark end, not name for name.
5. Dark `bg-subtle` is 950 and dark `border-subtle` is 800.
6. States move one step at 15% or less and two at 20% or more.
7. Breakpoints align to Tailwind's in rem, and container max-width equals the breakpoint.
8. h1 to h3 rise to `--text-5xl`, `--text-4xl`, and `--text-3xl`; the displays keep Bootstrap's sizes.
9. Radii xl and xxl, shadows, and fonts map by name.
10. Spacing, transitions, z-indices, weights, and line heights stay.
11. The `unexcluded` face keeps Bootstrap's values.
12. The token units join the flip before U8.

## 8. Risks and the measurement that exposes each

Each of the following risks names the measurement that exposes it:

1. **Wide-gamut drift.** Tailwind's own `bg-red-600` emits oklch, while `.btn-danger` emits the clipped `#e7000b`. T0 P6 reads both pixels in Chromium under the default and the `display-p3-d65` color profile.
2. **Gray naming.** `var(--bs-gray-500)` reads gray-400. The token table states it. The partition and contrast cases expose a reversal: grays by name fail 5 text pairings [R].
3. **Hover equals active on striped table rows.** Striped, hover, and active share step 200. T0 P4 reads the computed background of a hovered striped `.table-primary` row.
4. **Larger headings.** `.h1` reads 48px at 1280px, and 31.0px against Bootstrap's 27.9px at 390px by the RFS formulas of § 3.7. The six `TAILWIND_READINGS` rows and the 390px journey capture expose overflow.
5. **Container width at 1280px.** `.container` reaches the full viewport width. T0 P4 and the J4 header reading at 1280px expose it.
6. **Journey cost.** The mapped partition adds no pass. T0 P5 times it against 53 s.
7. **Compile time.** 715 function calls run in `build:src:tailwindcss`; T1 records the wall time before and after.
8. **Bootstrap upgrade.** A Bootstrap literal with no row stops the tuned build with `@error`, and the token case fails on the lifted scan. Both are deliberate.
9. **Contrast numbers outside Chromium.** [R] computes from the hexes; the Chromium contrast case reads the browser's own computed colors and is the pin.
