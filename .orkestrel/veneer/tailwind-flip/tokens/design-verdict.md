# Tokens: the design verdict (R11, 2026-10-04)

Written 2026-10-04 after the T0 probe (`units/tokens-probe-2`, Chromium 141.0.7390.37, Node 22.22.2, Sass 1.105.1, every output byte-identical over two runs); § 10 carries each measurement's reading and the ruling it produced. Every ruling here is the Orchestrator's and is reversible at the user's word.

## 1. Ruling

R11 (`../brief.md` § R11, the user's words in `brief.md` § Ruling): under the layer, Bootstrap's design tokens take Tailwind's values where Tailwind has a counterpart, and the mapping goes "where it counts" (colors, scales), not only where a name already matches. The map is a build input of the tuned face. `./bootstrap` stays byte-identical. The proofs' component baseline becomes the tuned sheet adopted alone. A derivation proof pins the tuned sheet against the lifted sheet as token substitution plus the structural steps the flip already proves (withholding, moving, copying, restoring, scoping) and nothing else.

## 2. Policy

The map follows one policy, the consumer judge's synthesis (`design/judge-consumer.md` § Synthesis map) amended by `rulings.md`:

- A Bootstrap token that names a role, or a step of a hue, takes a named Tailwind step. The base step per hue is the step that keeps every pairing Bootstrap ships at or over Bootstrap's own ratio where Bootstrap passes 4.5:1, and the nearest step by OKLab distance otherwise; the step name beats a cross-family neighbor.
- A value Bootstrap derives by an amount (hover and active 15/20/25, focus border tint 50, range thumb tint 70, link hover shade 20, table states by Bootstrap's factors, the three gray mixes) is Bootstrap's integer `mix` at Bootstrap's amount over the mapped inputs. The derived states keep their order (15 < 20 < 25).
- Each `-rgb` triplet, `rgba()` form, `RGBA(` link-hover form, `%23` escape, and data-URI attribute takes the channels of its resolved hex.
- Colors are resolved sRGB hex from the installed `node_modules/tailwindcss/theme.css`, clipped per channel; a consumer `--color-*` does not reach the tuned sheet through the CSS export (`rulings.md` question 2). A Sass `$palette` for Sass consumers stays a roadmap item.
- Fonts, radii, and shadows are `var(--TOKEN, LITERAL)`, `LITERAL` being Tailwind 4.3.3's default (`rulings.md` question 1), subject to M2: if the references break pin 4 or the `prefix(tw)` form, the fallback literal is emitted instead and the guide states the limit.
- Breakpoints align to Tailwind's `40/48/64/80/96rem`; container widths take Tailwind's `max-width = breakpoint` (`rulings.md` question 3). The down forms keep Bootstrap's `0.02px` gap, in rem. The RFS cap stays `1200px`, and `.modal-xl` stays `1140px`.
- Type sizes, spacers, component paddings, transitions, and z-indices keep Bootstrap's values: h4 to h6, `.lead`, and the body already equal `--text-*`; h1 to h3 have no injective nearest step; spacers equal `--spacing` multiples.
- The map is a function of the lifted literal: one Bootstrap value takes one tuned value, except the context split of § 3 if M1 requires it.

## 3. The map

The following table is the adopted map; the hex columns are the writer's expected output and M1, M8, and M9 read them. Three rows carry a ruling that amends the synthesis, marked in § 3.1.
The following table holds the map:

| Bootstrap token | Role | Tailwind token | Resolved hex, light | Resolved hex, dark | Reason |
| --- | --- | --- | --- | --- | --- |
| `--bs-blue`, `--bs-primary`, `--bs-link-color` (light) | primary base, link | `blue-600` | `#155dfc` | same (base) | Nearest blue step (0.038); white text 5.25 against 4.50; `blue-500` reads 3.76 |
| `--bs-primary-rgb`, `--bs-focus-ring-color` | triplet, focus halo | `blue-600` channels | `21, 93, 252`; `rgba(21, 93, 252, 0.25)` | same | Follows the base; halo geometry kept |
| `--bs-indigo` | palette | `indigo-600` | `#4f39f6` | same | Nearest same-name step (0.052); the name beats `violet-700` |
| `--bs-purple` | palette | `purple-800` | `#6e11b0` | same | Nearest same-name step (0.077); no pairing |
| `--bs-pink`, `--bs-code-color` | palette, `code` | `pink-600`; dark `pink-300` | `#e60076` | `#fda5d5` | `code` 4.54 against 4.50; dark 11.04 against 6.16 |
| `--bs-red`, `--bs-danger`, `--bs-form-invalid-color` | danger base, invalid | `red-600`; dark invalid `red-300` | `#e7000b` | `#ffa2a2` | White text 4.77 against 4.53; dark invalid 10.49 |
| `--bs-orange` | palette | `orange-400` | `#ff8904` | same | Nearest same-name step (0.027) |
| `--bs-yellow`, `--bs-warning` | warning base | `yellow-500` | `#f0b100` | same | `yellow-400` drops the outline label from 1.63 to 1.57; `500` reads 1.91; black text 10.99 |
| `--bs-green`, `--bs-success`, `--bs-form-valid-color` | success base, valid | `green-700`; dark valid `green-300` | `#008236` | `#7bf1a8` | White text 4.95 against 4.53; `green-600` reads 3.21 |
| `--bs-teal` | palette | `teal-400` | `#00d5be` | same | Nearest by the probe's metric (0.052); no pairing |
| `--bs-cyan`, `--bs-info` | info base | `cyan-500` | `#00b8db` | same | `cyan-400` drops the outline label from 1.96 to 1.81; `500` reads 2.37; black text 8.88 |
| `--bs-black`, `--bs-white` | fixed | `black`, `white` | `#000`, `#fff` | same | Kept bytes |
| `--bs-gray-100`, `--bs-light`, `--bs-tertiary-bg` (light) | light surface | `gray-50` | `#f9fafb` | same | Nearest (0.003) |
| `--bs-gray-200`, `--bs-secondary-bg` (light), `--bs-light-border-subtle` (light) | raised surface | `gray-200` | `#e5e7eb` | same | Nearest (0.014); the name agrees |
| `--bs-gray-300`, `--bs-border-color` (light), `--bs-body-color` (dark) | border, dark body text | `gray-300` | `#d1d5dc` | `#d1d5dc` (body text) | Form-control border 1.47 against 1.30 (`gray-200` reads 1.24); the consumer reads `border-gray-300` |
| `--bs-gray-400`, `--bs-dark-bg-subtle` (light) | dark alert fill | `gray-300` | `#d1d5dc` | same | `gray-400` drops `.alert-dark` from 5.47 to 3.96; joins `gray-300` |
| `--bs-gray-500`, `--bs-dark-border-subtle` (light), dark dropdown header | muted border, header | `gray-400` | `#99a1af` | same | Dark dropdown header 5.64 against 5.55 (`gray-500` reads 3.03); `.list-group-item-dark` hover 8.07 against 10.12 |
| `--bs-gray-600`, `--bs-gray`, `--bs-secondary` | secondary base | `gray-500` | `#6a7282` | same | Nearest (0.014); white text 4.84; outline label on the dark body 4.16 against 3.29 (`gray-600` reads 2.35) |
| `--bs-gray-700`, `--bs-light-text-emphasis`, `--bs-dark-text-emphasis` (light), `--bs-border-color` (dark) | emphasis gray, dark border | `gray-600` | `#4a5565` | `#4a5565` (border) | Nearest (0.024) |
| `--bs-gray-800`, `--bs-gray-dark`, `--bs-secondary-bg` (dark), `.dropdown-menu-dark` background | dark raised surface | `gray-800` | `#1e2939` | `#1e2939` | Holds the dark dropdown at 5.64 and 9.96; `gray-700` drops its header to 3.96 |
| `--bs-gray-900`, `--bs-dark`, `--bs-body-color` (light), `--bs-body-bg` (dark) | body text, dark page | `gray-950` | `#030712` | `#030712` (page) | Lifts every dark outline label over Bootstrap's (3.84 to 4.22); body text 20.13 and dark text 16.26 under the context split of § 3.1 (13.67 unsplit) |
| `--bs-body-bg` (light), `--bs-emphasis-color` | page, emphasis | `white`; `black`, `white` | `#fff`; `#000` | `#030712`; `#fff` | Kept, except the dark page |
| `--bs-secondary-color`, `--bs-tertiary-color` | muted text | body color at 0.75 and 0.5 | `rgba(3, 7, 18, 0.75)`, `rgba(3, 7, 18, 0.5)` | `rgba(209, 213, 220, 0.75)`, `rgba(209, 213, 220, 0.5)` | Follows the body color; tertiary 3.79 against 3.12 |
| `--bs-tertiary-bg` (dark) | dark muted surface | `mix(gray-800, gray-950)` | same as light row | `#111826` | Bootstrap's 50% mix; header label 17.76 |
| `--bs-light-bg-subtle`, `--bs-dark-bg-subtle` (dark) | gray mixes | `mix(gray-50, white)`; `mix(gray-800, black)` | `#fcfdfd` | `#0f151d` | Bootstrap's 50% mixes; dark `.alert-dark` 12.45 |
| `--bs-light-text-emphasis`, `-bg-subtle`, `-border-subtle` (dark) | light roles in dark mode | `gray-50`, `gray-800`, `gray-600` | see light rows | `#f9fafb`, `#1e2939`, `#4a5565` | Follows the gray map |
| `--bs-dark-text-emphasis`, `-border-subtle` (dark) | dark roles in dark mode | `gray-300`, `gray-800` | see light rows | `#d1d5dc`, `#1e2939` | Follows the gray map |
| `--bs-primary-text-emphasis` | alert and list text | `blue-800`; dark `blue-300` | `#193cb8` | `#8ec5ff` | Role step by Bootstrap's name; light 7.23, dark 8.08 under `#162556` by the WCAG formula (T2 measures it) |
| `--bs-primary-bg-subtle` | alert fill, `.table-primary` | `blue-100`; dark `blue-950` | `#dbeafe` | `#162556` | `950` is nearest the 80% shade (0.084 against 0.194) |
| `--bs-primary-border-subtle` | alert border, list hover | `blue-200`; dark `blue-800` | `#bedbff` | `#193cb8` | Dark `800` is nearer the 40% shade than `700` (0.055 against 0.126) |
| `--bs-secondary-text-emphasis`, `-bg-subtle`, `-border-subtle` | secondary roles | `gray-800`, `gray-100`, `gray-200`; dark `gray-300`, `gray-950`, `gray-800` | `#1e2939`, `#f3f4f6`, `#e5e7eb` | `#d1d5dc`, `#030712`, `#1e2939` | Same steps as every hue; the dark fill equals the dark page, and the border carries the edge |
| `--bs-success-text-emphasis`, `-bg-subtle`, `-border-subtle` | success roles | `green-800`, `green-100`, `green-200`; dark `green-300`, `green-950`, `green-800` | `#016630`, `#dbfce7`, `#b9f8cf` | `#7bf1a8`, `#032e15`, `#016630` | Light alert 6.48 under `#dbfce7` by the WCAG formula (T2 measures it), dark alert 10.67 |
| `--bs-info-text-emphasis`, `-bg-subtle`, `-border-subtle` | info roles | `cyan-800`, `cyan-100`, `cyan-200`; dark `cyan-300`, `cyan-950`, `cyan-800` | `#005f78`, `#cefafe`, `#a2f4fd` | `#53eafd`, `#053345`, `#005f78` | Light alert 6.44, dark alert 9.30 |
| `--bs-warning-text-emphasis`, `-bg-subtle`, `-border-subtle`; `--bs-highlight-bg` | warning roles, `mark` | `yellow-800`, `yellow-100`, `yellow-200`; dark `yellow-300`, `yellow-950`, `yellow-800`; `mark` `yellow-100`, dark `yellow-800` | `#894b00`, `#fef9c2`, `#fff085` | `#ffdf20`, `#432004`, `#894b00` | Light alert 6.37; dark `mark` 4.65 against 6.14 (0.15 over 4.5:1) |
| `--bs-danger-text-emphasis`, `-bg-subtle`, `-border-subtle` | danger roles | `red-800`, `red-100`, `red-200`; dark `red-300`, `red-950`, `red-800` | `#9f0712`, `#ffe2e2`, `#ffc9c9` | `#ffa2a2`, `#460809`, `#9f0712` | Light alert 6.85, dark alert 8.42 |
| `--bs-link-hover-color` | link hover | `blue-600` shade 20; dark `blue-300` tint 20 | `#114aca` | `#a5d1ff` | Bootstrap's amount; 7.35 and 12.62 |
| `.link-*:hover` (`RGBA(R, G, B, …)`, 24 occurrences) | colored link hover | shade or tint 20 of each base | primary `17, 74, 202`; secondary `85, 91, 104`; success `0, 104, 43`; info `51, 198, 226`; warning `243, 193, 51`; danger `185, 0, 9`; light `250, 251, 252`; dark `2, 6, 14` | same | Bootstrap's amount; the probe missed these occurrences (`mechanism.md`) |
| `$input-focus-border-color`, `$form-range-thumb-active-bg` | focus border, thumb | tint 50 and tint 70 of `blue-600` | `#8aaefe`, `#b9cefe` | same | Bootstrap's amounts; focus border 2.20 against 2.06 |
| `.btn-primary` hover, hover border, active, active border; focus `-rgb` | button states | shade 15, 20, 20, 25 | `#124fd6`, `#114aca`, `#114aca`, `#1046bd`; `56, 117, 252` | same | Bootstrap's amounts keep 15 < 20 < 25; 6.74 and 7.35 |
| `.btn-secondary` states | button states | shade 15, 20, 20, 25 of `gray-500` | `#5a616f`, `#555b68`, `#555b68`, `#505662`; `128, 135, 149` | same | 6.22, 6.81 |
| `.btn-success` states | button states | shade 15, 20, 20, 25 of `green-700` | `#006f2e`, `#00682b`, `#00682b`, `#006229`; `38, 149, 84` | same | 6.34, 6.97 |
| `.btn-info` states | button states | tint 15, 10, 20, 10 of `cyan-500` | `#26c3e0`, `#1abfdf`, `#33c6e2`, `#1abfdf`; `0, 156, 186` | same | Black label 9.96, 10.32 |
| `.btn-warning` states | button states | tint 15, 10, 20, 10 of `yellow-500` | `#f2bd26`, `#f2b91a`, `#f3c133`, `#f2b91a`; `204, 150, 0` | same | Black label 12.08, 12.49 |
| `.btn-danger` states | button states | shade 15, 20, 20, 25 of `red-600` | `#c40009`, `#b90009`, `#b90009`, `#ad0008`; `235, 38, 48` | same | 6.27, 6.85 |
| `.btn-light` states | button states | shade 15, 20, 20, 25 of `gray-50` | `#d4d5d5`, `#c7c8c9`, `#c7c8c9`, `#bbbcbc`; `212, 213, 213` | same | A visible hover; 14.28, 12.53 |
| `.btn-dark` states | button states | tint 15, 10, 20, 10 of `gray-950` | `#292c36`, `#1c202a`, `#353941`, `#1c202a`; `41, 44, 54` | same | A visible hover; 13.93, 11.58 |
| `.table-primary` to `.table-danger` and `.table-secondary` | table variants | the bg-subtle step, then Bootstrap's factors 0.2, 0.05, 0.1, 0.075 of the text color | primary `#dbeafe`, `#afbbcb`, `#d0def1`, `#c5d3e5`, `#cbd8eb`; success `#dbfce7`, `#b0cab9`, `#d1efdb`, `#c6e3d0`, `#cce9d6`; info `#cefafe`, `#a5c8cb`, `#c4eef1`, `#b9e1e5`, `#bfe7eb`; warning `#fef9c2`, `#cbc79b`, `#f1edb8`, `#e5e0af`, `#ebe6b3`; danger `#ffe2e2`, `#ccb5b5`, `#f2d7d7`, `#e6cbcb`, `#ecd1d1`; secondary `#f3f4f6`, `#c2c3c5`, `#e7e8ea`, `#dbdcdd`, `#e1e2e4` | same | Striped, active, and hover stay distinct; lowest text 13.77 (`table-danger-active`) |
| `.table-light`, `.table-dark` | table variants | `gray-50` and `gray-950`, then the factors | light `#f9fafb`, `#c7c8c9`, `#edeeee`, `#e0e1e2`, `#e6e7e8`; dark `#030712`, `#353941`, `#10131e`, `#1c202a`, `#161a24` | same | Distinct states; dark text 16.29 or more |
| `.dropdown-menu-dark` color and link, header and disabled | dark menu | `gray-300`, `gray-400` | `#d1d5dc`, `#99a1af` | same | 9.96 and 5.64 on `gray-800` |
| `--bs-border-color-translucent`, black and white `rgba()` forms, `transparent` | fixed | none | kept | kept | No hue to map |
| `--bs-font-sans-serif` | body font | `var(--font-sans, …)` | Tailwind's default stack | same | A consumer `--font-sans` reaches body text ([T]) |
| `--bs-font-monospace` | code font | `var(--font-mono, …)` | Tailwind's default stack | same | Follows the consumer's theme |
| `--bs-border-radius-sm`, base, `-lg`, `-xl`, `-xxl` | radii | `var(--radius-sm, 0.25rem)`, `var(--radius-md, 0.375rem)`, `var(--radius-lg, 0.5rem)`, `var(--radius-2xl, 1rem)`, `var(--radius-4xl, 2rem)` | 4px, 6px, 8px, 16px, 32px | same | Equal values matched by value; follows the consumer's theme |
| `--bs-border-radius-pill` | pill | none | `50rem` | same | No `--radius-*` equal |
| `--bs-box-shadow-sm`, base, `-lg`, `-inset` | elevation | `var(--shadow-sm, …)`, `var(--shadow-md, …)`, `var(--shadow-lg, …)`, `var(--inset-shadow-xs, …)` | Tailwind's literals (`theme.css:406-416`) | same | The shared `.shadow-sm` and `.shadow-lg` classes paint Tailwind's values under the layer; never the `reference` alias `--shadow` |
| Headings, `.display-*`, `.lead`, `.fs-*`, `.small` | type | none | Bootstrap's sizes, fluid `calc()`, `1.2` | same | h4 to h6, `.lead`, and the body already equal `--text-*`; h1 to h3 have no injective nearest step |
| `$grid-breakpoints` `sm` to `xxl`, `--bs-breakpoint-*` | breakpoints | `--breakpoint-sm` to `--breakpoint-2xl` | `40rem`, `48rem`, `64rem`, `80rem`, `96rem` | same | Infix and variant switch at one width, in rem |
| Down forms | breakpoints | the breakpoint minus 0.02px | `39.99875rem` to `95.99875rem` | same | Bootstrap's gap in rem |
| `$container-max-widths` | containers | `max-width = breakpoint` | `40rem` to `96rem` | same | Equals Tailwind's `container` widths |
| RFS cap, `.modal-xl` width | fluid type, modal | none | `1200px`, `1140px` | same | RFS is a type parameter; `.h1` reads 40px at 1280px |
| Spacers, component paddings, transitions, z-indices | spacing, motion, stack | none | Bootstrap's | same | Spacers equal `--spacing` multiples; no counterpart for the rest |

### 3.1 Amendments to the synthesis

- **The dark secondary fill** (`rulings.md` finding 4): `--bs-secondary-bg-subtle` in dark mode is `gray-900` `#101828`, not `gray-950`, so the fill is distinct from the dark page; the contrast case's separation clause takes this row as its control.
- **The `#dee2e6` collision** (finding 2, settled by M1): the light `--bs-border-color` and the dark `--bs-body-color` share one lifted literal, and one value cannot hold both floors: under `gray-300` the dark tertiary text reads 3.94 against its 4.07 floor. The mechanism gains a context key for this one literal: the light `--bs-border-color` maps to `gray-300` `#d1d5dc` and the dark `--bs-body-color` to `gray-200` `#e5e7eb`, which reads the dark tertiary text at 4.49. The `swatch` function reads the context from the declaring block's selector (`[data-bs-theme=dark]`), and the function-of-the-lifted-value case names this row as its one admitted exception.
- **Two palette hexes** (settled by M9): `blue-950` is `#162556` and `green-100` is `#dbfce7`, Chromium's own serialization, which `palette.json` records as the palette's source (§ 10 M9); the synthesis carried the probe's earlier rounding, and M1 and M8 measured the earlier hexes, so the two pairings they move read 8.08 (the dark primary text emphasis on its fill) and 6.48 (the light success alert) by the WCAG formula until T2's contrast case measures them.
- **The scale function's name** (settled by M3): the Sass function is `measure($role, $value)`, not `scale`, because an unqualified CSS `scale(0.85)` call in `components/_floating-labels.scss` binds a Sass function of that name and the compile refuses it with `Missing argument $value`.
- **The separation floor** (settled by M1): an adjacent-surface pair (each bg-subtle and border-subtle against its page, each button hover against its base, each table state against its table) must stay distinct at a ratio of 1.05 or more, and the record carries Bootstrap's own ratio beside the tuned one; the floor is not Bootstrap's ratio, because Tailwind's 100 and 200 steps are lighter than Bootstrap's 80 % and 60 % tints and the adopted ramp lowers all 34 measured separations by 0.0002 to 0.63, and 33 of them stay at 1.07 or more. Three pairings are inherited and listed, not floored: the light `--bs-light-bg-subtle` on the light page (1.019 against Bootstrap's 1.025), the focus ring halo on the dark page (1.23 against 1.29, alpha 0.25), and the `.btn-outline-light` label on the light page (1.045 against 1.054); each reads under 1.5:1 in both sheets.
- **Scale keys** (finding 5): a scale row is keyed by selector role and longhand, and `.modal-xl` reads `1140px` under both faces at 1280 px as the control.

## 4. The mechanism

The mechanism is the mechanism judge's synthesis (`design/judge-mechanism.md` § 4.1), two switches beside the five of the flip:

- `src/bootstrap/_mixins.scss` declares `$palette: () !default` and `$scale: () !default`. `swatch($literal)` reads the 7 spellings (hex, short hex, `rgb`/`rgba`/`RGBA(`, `-rgb` triplets, `%23` escapes, `rgba%28`, data-URI attributes) and returns the mapped value in the literal's spelling, keeping `#fff` short where the value is equal; it returns the literal unchanged when `$palette` is empty and stops the compile with `@error` when `$palette` is set and the normalized key has no row. `measure($role, $value)` returns `$value` when `$scale` is empty and refuses a missing role the same way. The file emits nothing and declares no literal color.
- `src/bootstrap/_tokens.scss` declares both switches beside the five and passes them through its `@use 'mixins' with (...)`; its 150 literals become `#{mixins.swatch('…')}` inside the existing interpolation, and its radius, shadow, and font sites become `mixins.measure(…)` calls, which emit the `var(--TOKEN, LITERAL)` reference under the tuned configuration and the literal under the default. `src/bootstrap/index.scss` keeps `@forward 'tokens' show $layered`.
- The partials take `swatch` at the 571 color sites and `measure` at the grid-tied breakpoint, down-form, container, and type sites (51 `min-width` px conditions and 25 `.98px` `max-width` conditions); the 12 RFS conditions and the modal widths stay literal; identity rows (`#000`, `#fff`, and their alpha forms) go through `swatch` so the two-way case counts every site; `transparent` and `currentcolor` stay as written.
- `src/tailwindcss/_tokens.scss` declares `$palette` (resolved sRGB hex, one row per lifted value, plus the context row of § 3.1 if M1 requires it) and `$scale`, both written by the writer, and passes them through its existing `@use '../bootstrap/tokens' with (...)`. `src/tailwindcss/index.scss`, `configs/src/vite.tailwindcss.config.ts`, and `package.json` do not change.
- The generator is a TypeScript script under veneer's ignored `tmp/` that ports the lexer of the flip's `rewrite.ts`; it is never committed, and it is accepted when `./bootstrap` keeps SHA-256 `7932f7a5…`, the tuned compile is byte-identical under an empty map, a tracer map reaches all 571 sites with no original literal left, and `format:check` passes.
- The writer is a Vitest file under `tmp/units/`, in the flip's record-writer convention: it computes each row from `theme.css` under § 2 and writes the Sass rows and `tests/fixtures/tailwindcss/tokens.json`.
- Refused, as the mechanism judge refused them: text substitution in the Vite config and the hybrid (3 of 4 substitution variants wrote a wrong sheet with no error in `measurements/mechanism.md`); computed defaults in the shipped build; Sass `color-contrast`; a `tuned` reading state; a digest gate on `theme.css`.
- The law gains one clause (`rulings.md` question 5): `.claude/rules/styles.md` § Prohibitions names token substitution in a derived build under a switch the guide records, beside the reset placement; it lands in scaffold `main` with the prose unit T4.

## 5. The proofs

Every case carries the control named beside it (`tests.md`); the baseline of every component style case is the tuned sheet adopted alone (`rulings.md` finding 3); the paired engine states case reads engine output and keeps the showcase's `bootstrap` face (the Journeys list, amended 2026-10-04).

Node cases:

- `conformance`: `./bootstrap` keeps SHA-256 `7932f7a5…` under the default switches; control: a one-row `$palette` changes the digest. The round-trip case stands.
- `maps every lifted color literal through the token record or keeps it, in both directions`: every one of the 571 occurrences in the 7 spellings is a record row, every row occurs, every kept literal is equal on both sides; controls: a planted lifted `#123456`, a planted `RGBA(18, 52, 86, var(--bs-link-opacity, 1))`, a kept `#fff` read as `#fafafa`, an orphan row.
- `reads the token record as a function of the lifted value`; control: a planted second row for `#ced4da`. The context row of § 3.1, if adopted, is the one admitted exception and the case names it.
- `evaluates every token record row's origin over Bootstrap's bases and over the map's bases`; controls: a tuned value off by one channel, an origin of `shade-color(primary, 16%)`.
- `agrees every tuned row with Bootstrap's own Sass compiled from the map's bases within one channel unit`; control: a row shifted by 2 units. M8 proves the key join first and lists every unjoined row.
- `resolves every palette row from the installed Tailwind theme`, with the base rule computed through the `contrastColor` twin; controls: a row naming `blue-500` that carries `blue-600`'s value, a hex changed by one digit. M9 pins the conversion against Chromium's own.
- `spells every swatch form and returns the Bootstrap literal under an empty palette`; controls: reversed channels, a set palette with a missing key that stops the compile.
- `pins the guide token table to the token record`; controls: a planted guide row, a removed guide row.

Chromium cases:

- `derives the tuned sequences by substituting tokens, withholding, moving, copying, restoring, and nothing else`: `substituteTokens` applies the record in one pass per occurrence in the CSSOM spellings before the structural steps; controls: a planted `#0d6efe`, a removed record row, a kept literal read as `#fffffe`, an unwithheld `.mt-3`, a chaining control (`#f8f9fa` to `#f9fafb` and `#f9fafb` elsewhere, each changed exactly once).
- `keeps the RFS cap at 1200px and aligns every grid condition to Tailwind's breakpoints`; control: a planted RFS substitution reads `.h1` at 41.2 px at 1279 px.
- The contrast and separation case over M1's union population (the 142 pairings of `contrast.ts`, the judge's additions, the dark tertiary text, the adjacent surfaces), under the tuned sheet alone and Bootstrap alone: no pairing reads under Bootstrap's where Bootstrap passes 4.5:1, each listed pairing reads its floor, and each adjacent surface pair separates; controls: a `blue-500` copy fails at 3.76, the dark secondary fill at `gray-950` fails the separation clause, the count pin.
- `pins every curation witness against the tuned sheet alone and rejects each removed repair`; control: the lifted sheet as the baseline fails on a token-bearing witness.
- `differs from Bootstrap alone by the token table and nothing else` at `RELATION_WIDTHS`: every departing (name, width, longhand) is a map row or a band state; controls: `.card` padding changed in a tuned copy, an identity map that fails on `.btn-primary`.
- `agrees every Bootstrap infix with its Tailwind variant at each aligned breakpoint`; control: `./bootstrap` beside the unexcluded compile disagrees at 600 px.

Journeys:

- The partition case compares a Bootstrap winner against `mapReading` of the same element under the `bootstrap` face, keyed by selector role and longhand; control: an unmapped run of the partition reports clause-2 violations on the `container` signatures' `max-width` at 1280 px (expected `1140px`, read `1280px`) while the mapped run reports none, because `.btn-primary` lies outside the shared population (amended 2026-10-05 after the T3 review); the `mapReading` demonstration on `.btn-primary` stays beside it. M6 records the cost against the flip's 449 to 487 s and the focused 53 s.
- The witness case reads the tuned sheet alone as its baseline. The paired engine states case keeps the showcase's `bootstrap` face as its baseline and is otherwise unchanged (amended 2026-10-04 after T3's fourth pass): its claim is engine-output equality across the three faces a person can select, and the tuned sheet alone is not a renderable face, because `$withhold` drops the shared utility names Tailwind supplies and the scrollspy container loses `overflow-y: auto`; under that baseline the case times out after four families in T3's fourth pass and in an isolated rerun on 2026-10-04.
- The four showcase contrast subjects read under the `tailwindcss` face in both color modes, and the header buttons under each face in light mode (`rulings.md` finding 8).
- `TAILWIND_READINGS` gains token rows whose `unexcluded` column keeps Bootstrap's value, because that face loads `./bootstrap`.

## 6. Records

- `tests/fixtures/tailwindcss/tokens.json`: the token record, one row per lifted value with its spellings, the Tailwind token, the resolved hex per color mode, and the origin; written by the writer.
- `app/browser/recipe.json` and `tests/fixtures/tailwindcss/recipe.json`: regenerated through the flip's writers (`../writers/flip-records/`), because the tuned compile changes.
- `tests/fixtures/tailwindcss/preflight.json` (version-gated, `chromium: 141`): regenerated where the reboot's token-bearing rows move.
- The curation table (46 rows) keeps its rows; its witnesses read the tuned sheet alone.
- `tests/fixtures/tailwindcss/incompatible.json` and `comparison.json`: unchanged unless the writer's re-derivation differs, which the units record.

## 7. Showcase and guide

- Captions take the face form of `units/flip-copy/copy.md` § 3.0 where a token changes: the `Bootstrap` face keeps Bootstrap's values; the two Tailwind faces show the map (`Bootstrap only: … Both Tailwind faces: …` where both load the tuned sheet; `Bootstrap only and without the layer: … With the layer: …` where the `unexcluded` face loads `./bootstrap`).
- `guides/veneer.md` gains a token table pinned to the record (the guide case of § 5), the consumer story (a consumer `--font-sans`, `--radius-md`, and `--shadow-md` reach Bootstrap's components through the references; a consumer `--color-blue-600` does not reach `.btn-primary`; the optional `@custom-variant dark` sentence beside the Color mode limit; the breakpoint bands 576 to 639, 992 to 1023, 1200 to 1279, and 1400 to 1535 px where Bootstrap's documented layouts move; the gray collapse, where `--bs-gray-400` joins `gray-300`; the wide-gamut residual, where 7 of 10 hue bases are out of sRGB as oklch and the clip moves `yellow-500` by OKLab 0.0225).
- `ROADMAP.md` names the Sass `$palette` for Sass consumers and the `oklch()` output form as later items.
- **The chrome under the layer** (ruled 2026-10-04 at T3's first stop): the showcase header is built from Bootstrap's classes and ships no sheet of its own, so under the `tailwindcss` face it reads the map (the body color, the border color, the font stack). R12's face-neutral chrome is re-read under R11 as "the chrome departs between faces only by the token rows": the neutrality case and the P4 probe attribute every chrome departure to a palette row, a scale row, or a text-metric geometry change on an element whose `font-family` departs by a scale row, and refuse anything else; the R12 invariants (five buttons one line box tall, the three face buttons on one row at 390 px, the header at or under 30 % of the viewport height at 390 px, one row from 768 px) are asserted under every face; the header buttons read 4.5:1 or more under each face in light mode.

## 8. Units

Each unit lands on `ccr-d15a48b1-yyyll6` after the structural flip lands on `main` (§ 11), in this order, each accepted by the showcase session with its gates read on this host:

1. **T1 mechanism**: the switches `$palette` and `$scale`, the functions `swatch` and `measure`, the generated edit over the partials, the writer, `tokens.json`, `src/tailwindcss/_tokens.scss` configured. Acceptance: `./bootstrap` digest `7932f7a5…`; the tuned compile byte-identical under an empty map; the tracer reaches 571 sites; the Node cases of § 5 pass; `format:check`, `lint:check`, `check`.
2. **T2 proofs and records**: the Chromium cases of § 5, the regenerated records of § 6, the tuned-sheet-alone baselines. Acceptance: `test:src:browser` (minus the host-bound set), `test:setup:browser`, `test:integration`, `test:conformance`.
3. **T3 showcase and journeys**: captions, `TAILWIND_READINGS` token rows, the contrast subjects under the `tailwindcss` face, `mapReading` in the partition, the rebuilt `showcase/browser.html`. Acceptance: `test:app:browser`, `test:journey` against the host-bound set with the budget re-read (M6's figure), P4 neutrality unchanged.
4. **T4 guide, law, roadmap**: the token table, the consumer story, the `styles.md` clause in scaffold `main`, the roadmap items. Acceptance: `test:guides`, `test:policy`, the prose sweep.

An Astra objective check (`analyst` route, `units/tokens-verdict-check/`, 2026-10-04) read this verdict against the probe outputs, the installed packages, and the source: 13 of 17 claims hold, and the 4 refuted claims corrected the figures and names in § 3, § 3.1, § 4, and § 8 as this version carries them; it also found that M1 and M8 measured the two earlier hexes, which § 3.1 records.

## 9. Defaults applied for the user

The six defaults of `rulings.md` stand as rulings: references for fonts, radii, and shadows (subject to M2); colors pinned to the default palette; containers equal to the breakpoint; `@custom-variant dark` as a guide sentence; one `styles.md` clause; no veneer release between the flip's landing and the token units' landing.

## 10. Measurements (T0)

| Measurement | Settles | Reading | Ruling |
| --- | --- | --- | --- |
| M1 durable contrast and separation over the adopted map | findings 2, 4, 9 | 223 union pairings; Node and Chromium agree on every one at 0.001; 37 read under the lesser of Bootstrap's ratio and 4.5: 34 adjacent-surface separations, the dark tertiary text (3.94 against 4.07; 4.49 under the context split), and 2 Bootstrap-inherited pairings under 1.5:1; the ruled dark secondary fill separates at 1.13 (Bootstrap 1.16, the synthesis 1.00) | Every text pairing other than the 2 inherited ones holds its floor under the context split, which § 3.1 adopts; the separation floor is distinctness at 1.05 (§ 3.1); the 3 inherited pairings are listed in the record and the guide |
| M2 references in the full recipe | finding 1 | The three recipe forms (alone, consumer `@theme`, `prefix(tw)`) keep the flattened declaration sequence; the static theme emits 409 variables unchanged; a consumer `--font-sans` reaches the body and the button, a consumer `--radius-md` moves `.btn` from 6 to 12 px, `--color-blue-600` leaves `.btn-primary` at `rgb(21, 93, 252)`; the prefixed form falls back to the defaults | References stand (§ 2); the guide states that colors do not follow a consumer theme |
| M3 the scale edit on a copy | finding 6 | The source census reaches 64 conditions, 10 breakpoint values, 5 container widths, and 11 token sites with the 12 RFS conditions kept; Sass refuses a function named `scale` at `components/_floating-labels.scss:68` (`Missing argument $value`), so the digests, tracer reach, and line counts were not read | The function is `measure` (§ 3.1); T1 reads the digests, the tracer reach, and the line counts as its acceptance; the whole-shadow row owns the four shadow color sites and `swatch` traces them |
| M4 the synthesized `swatch` on a copy | finding 6 | Both empty-map compiles keep `ef7b5845…` and `4142d6d4…`; 571 sites give 571 tracer hits with 0 missing keys and unchanged line counts; the 7 spellings include `%23fff`, `RGBA(`, and `rgba%28`; the missing-key control refuses the compile | The `swatch` mechanism stands (§ 4) |
| M5 breakpoint readings in Chromium | findings 3, 10, 16 | 54 face and width readings over 18 widths; 0 of 50 fractional readings at 125 % and 150 % scale miss a gap; `.modal-xl` holds 1140 px while the tuned `.container` reads 1280 px at 1280; the 17 shared names depart from Bootstrap alone in 5661 (name, width, longhand) rows at the 19 `RELATION_WIDTHS`, all listed | The alignment stands (§ 2); the 5661 rows are the input the `differs from Bootstrap alone by the token table and nothing else` case classifies as map rows or band states in T2 |
| M6 `mapReading` over the partition | findings 5, 8 | 1666 signatures at both widths (the header unit `ca2c90e` added one to the flip's 1665); 5346 scale-bearing Bootstrap-winner longhands, 0 colliding value groups, 0 unexplained mappings; the 1140 px control maps the container to 1280 px and keeps `.modal-xl`; the copied focused partition runs in 33.2 and 34.8 s against the 53 s reference; the full journey was not run in the probe | The role-and-longhand key stands (§ 3.1); T3 reads the full journey's wall time against 449 to 487 s |
| M7 pixel reads | findings 11, 15 | All 6 utility and component pairs read a per-channel difference of 0 on an sRGB canvas under `--force-color-profile=srgb`; teal reads through a `var(--bs-teal)` swatch | Chromium clips as the writer clips in sRGB; the wide-gamut residual stays a guide sentence (§ 7) |
| M8 the oracle join for the amount rows | finding 7 | 97 of 105 amount rows join Bootstrap's own configured Sass within 1 channel unit, 0 exceed it; the 8 unjoined rows are the `.link-*:hover` `-webkit-text-decoration-color` `RGBA(` forms | The oracle case joins by selector and the unprefixed property, so the 8 rows join through `text-decoration-color`; where a row still does not join, the case lists it and the origin case pins its `shift-color` amount |
| M9 Chromium's own conversion | finding 7 | 10 of 288 palette rows differ by one channel between the probe's conversion and Chromium's `color-mix(in srgb, VALUE 100%, transparent)` serialization; two are in the map (`blue-950`, `green-100`) | Chromium's recorded serialization is the palette's source: `palette.json` (Chromium 141) carries the 288 rows as Chromium serialized them, the writer takes every hex from it and refuses a row whose `raw` differs from the installed theme or whose own conversion differs from the recorded hex by more than one channel unit, and the `resolves every palette row` case pins those three facts; T1's second run read the Node conversion equal on 278 rows and one unit off on 10 at a rounding threshold, so the conversion is a check, never the value; the two map hexes follow (§ 3.1) |

## 11. Order and open risks

The token units follow the structural flip's landing on `main` (the F1 wave, U8, and the landing rule of `../../lanes.md` § Rules), and no release ships between. The open risks are the mechanism judge's three (`design/judge-mechanism.md` § 5): the oracle's key alignment (M8), a split the value key cannot express (M1 and § 3.1), and the clip against Chromium's paint (M7).
