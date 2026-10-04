# Tokens: the consumer judge (R11, 2026-10-04)

The consumer judge ranks `consumer` first, `ramp` second, and `algebra` third. None of the three maps ships as written:

- `consumer`'s gray map, which follows Bootstrap's step names, breaks 2 pairings that pass 4.5:1 under Bootstrap alone.
- `algebra` breaks 1 such pairing, and its `yellow-400` and `cyan-400` bases lower 2 pairings that already fail under Bootstrap alone.
- `ramp` holds the contrast floor, but its table variants read the same color striped, hovered, and active, and it renames radii and the heading scale with no name a consumer writes.

The synthesis map takes `consumer`'s policy: role tokens take named Tailwind steps, Bootstrap's amounts derive the states, and font, radius, and shadow tokens are references that follow the consumer's `@theme`. It takes `ramp`'s gray and dark-mode steps with one change: `$gray-200` and `$gray-300` take `gray-200` and `gray-300`, and `$gray-400` joins `gray-300`. Over 141 shipped pairings it reads 0 crossings of 4.5:1. It has 2 recorded UI exceptions, the dark-mode focus halo and the invisible `.btn-outline-light` label, and both read under 1.3:1 under Bootstrap alone.

This judgment scores the map and the consumer's experience only. The mechanism, the proofs, and the units belong to the mechanism judge and the critic.

## Sources

The judgment cites these inputs:

- The three proposals under `tokens/design/`: `proposal-algebra.md`, `proposal-consumer.md`, and `proposal-ramp.md`, all dated 2026-10-04 and written blind.
- `tokens/measurements/contrast.md` and `contrast.json` (the measurement lane, 2026-10-04, Bootstrap 5.3.8, Tailwind 4.3.3, Node v22.22.2), and `tokens/measurements/mechanism.md`.
- The probe (`probe-report.md`, `tailwind-theme.json`, `nearest.json`, `scales.json`) and the scout (`scout-distillate.md`).
- `../design-verdict.md` with every § 12 correction, and veneer `600f8a1` read at `473edd6`, whose `src`, `configs`, and `tests` trees equal `600f8a1` (`mechanism.md`).
- [J]: the judge's contrast run, 2026-10-04. It is a Node 22 script in the session scratchpad (`judge.cjs`) over the `tailwind-theme.json` clipped hexes. It uses the lane's method: WCAG 2 luminance, Bootstrap's integer `mix` rounding half up, and an alpha foreground composited over its background. On every row the lane also measures, the script reproduces the lane's Bootstrap-alone ratios (4.5008 for `.btn-primary`, 3.4275 for the outline primary label on the dark body, 5.472 for `.alert-dark`, 4.326 for the dark warning list-group hover). The T0 probe must reproduce [J] durably.
- [T]: the judge's Tailwind compile, 2026-10-04. It calls `compile` from `node_modules/tailwindcss/dist/lib.mjs` in veneer, over `theme.css` and a `@layer bootstrap` block, in the scratchpad (`tw.mjs`).

## Measure every proposal's exact map

The lane's candidates do not match any proposal. Its `Base 600` takes `green-600` and names the grays step for step, and its `Ramp roles` steps the info and warning states darker. [J] therefore rebuilds each proposal from its own tables: bases, gray map, role steps, state rule, table rule, and body roles.

[J] reads 141 pairings. They are the lane's distinct pairings, with the list-group emphasis rows folded into the alert rows they repeat. Added to them are the form-control border, the secondary and tertiary text colors, `code`, `mark` in both modes, the `.dropdown-menu-dark` header and item, the 4 showcase header readings, and `.text-secondary` on the dark body.

The rule applied is the one the brief's consumer reading names. A text pairing must read at least the lesser of its Bootstrap-alone ratio and 4.5:1. A UI pairing must read at least the lesser of its Bootstrap-alone ratio and 3:1. The following table counts each map's result:

| Map | Pairings lower than Bootstrap alone | Floor misses | Crossings of 4.5:1 | Lowest text pairing that passes under Bootstrap alone |
| --- | ---: | ---: | ---: | --- |
| `algebra` | 68 | 13 | 1 | `.dropdown-menu-dark` header, 3.96 |
| `consumer` | 38 | 6 | 2 | `.dropdown-menu-dark` header, 3.03 |
| `ramp` | 23 | 3 | 0 | `code`, 4.54 |
| Synthesis | 26 | 2 | 0 | `code`, 4.54 |

The floor misses per map follow, each as the Bootstrap-alone ratio, then the map's ratio [J]:

- `algebra` (13): the outline primary, secondary, success, and danger labels on the dark body (3.43 to 2.80, 3.29 to 3.03, 3.40 to 2.97, 3.41 to 3.08), with 2 of them dropping under 3:1; `.text-secondary` on the dark body (3.29 to 3.03); `.btn-outline-warning` (1.63 to 1.57); `.btn-outline-info` (1.96 to 1.81); `.btn-outline-light` (1.054 to 1.045); the dark warning list-group hover (4.33 to 4.22); tertiary text (3.12 to 3.05); the dark focus halo (1.29 to 1.25); the form-control border (1.30 to 1.24); and the `.dropdown-menu-dark` header (5.55 to 3.96), which crosses 4.5:1. `proposal-algebra.md` § 3 reports 0 crossings in 121 pairings because its set omits the dark dropdown.
- `consumer` (6): the `.list-group-item-dark` action hover (10.12 to 4.34, a crossing: black on `gray-500`); the `.dropdown-menu-dark` header (5.55 to 3.03, a crossing: `gray-500` on `gray-800`); the outline secondary label and `.text-secondary` on the dark body (3.29 to 2.35, under 3:1: `gray-600` on `gray-900`); the outline primary label on the dark body (3.43 to 3.38); and the dark focus halo (1.29 to 1.27). `proposal-consumer.md` § 1 reports one failure (`.alert-dark`) in 93 pairings, and its set omits all five.
- `ramp` (3): `.btn-outline-light` (1.054 to 1.045), the dark focus halo (1.29 to 1.24), and the form-control border (1.30 to 1.24). `proposal-ramp.md` § 1 records the last two.
- Synthesis (2): `.btn-outline-light` (1.054 to 1.045) and the dark focus halo (1.29 to 1.24). Both read under 1.3:1 in both sheets. The halo's color is fixed by the primary base: every map with `blue-600` reads 1.24 to 1.27 over a dark body, and `blue-500` raises it to 1.39 but drops white on `.btn-primary` to 3.76.

## Score the proposals

Each cell scores 1 (fails the consumer) to 5 (serves the consumer). The paragraphs after the table hold the evidence.

| Criterion | `algebra` | `consumer` | `ramp` |
| --- | ---: | ---: | ---: |
| Family and base shade per hue | 3 | 5 | 5 |
| Contrast rule and measured result | 2 | 2 | 5 |
| Derived states | 4 | 4 | 2 |
| Dark mode | 2 | 3 | 4 |
| Grays | 2 | 2 | 4 |
| Body and border colors | 3 | 4 | 3 |
| Radii | 4 | 5 | 2 |
| Fonts | 3 | 5 | 3 |
| Type scale | 4 | 4 | 2 |
| Shadows | 3 | 5 | 4 |
| Focus ring | 4 | 4 | 4 |
| Breakpoints and containers | 5 | 5 | 4 |
| Component spacing | 5 | 5 | 5 |
| Showcase faces' story | 3 | 5 | 3 |
| Total | 47 | 58 | 50 |

`consumer` ranks first, because its defects sit in one replaceable table, the gray map. `ramp` ranks second, because its defects are policy: the step rule for states, and renaming by name where the values differ. `algebra` ranks third, because its contrast rule permits the drops its map makes.

### Family and base shade per hue

All three proposals take the family named for the hue (`$blue` to `blue` through `$cyan` to `cyan`, the grays to `gray`). All three refuse `violet`, `amber`, `sky`, `emerald`, `slate`, `zinc`, and `neutral`, although `violet-700` (OKLab 0.028), `amber-400` (0.023), and `emerald-400` (0.037) sit nearer than the same-name steps (`nearest.json`; [J]). The consumer reads `--bs-yellow` as a class they write, so the name wins.

All three take `blue-600`, `indigo-600`, `purple-800`, `pink-600`, `red-600`, `orange-400`, and `green-700`. White on `blue-600` reads 5.25 against Bootstrap's 4.50. On `blue-500` it reads 3.76, and Bootstrap's `color-contrast` would turn `.btn-primary`'s label black. On `green-600` it reads 3.21 (`contrast.md`, Base 600).

The proposals split on 3 hues:

- `algebra` takes `yellow-400` and `cyan-400`, the nearest steps. They drop `.btn-outline-warning` from 1.63 to 1.57 and `.btn-outline-info` from 1.96 to 1.81. `consumer` and `ramp` take `500`, which reads 1.91 and 2.37, with black labels at 10.99 and 8.88 [J].
- `ramp` takes `teal-500` (0.054 to its clipped sRGB) over `teal-400` (0.052 to the oklch value, 0.055 after the clip). Only `--bs-teal` reads it (1 occurrence, no pairing), so the split costs nothing.

### Contrast rule and measured result

`consumer` and `ramp` state the rule the brief's consumer reading names: no shipped pairing reads worse than the lesser of Bootstrap's ratio and the threshold. `algebra` states a threshold-crossing rule and refuses the floor in so many words: "57 of the 121 pairings read lower" (`proposal-algebra.md` § 1). Under its rule, 4 outline labels on the dark body fall from 3:1 or more to 2.80 through 3.08, and the two sub-threshold outline labels fall further. The measured result is in the preceding section: `ramp` alone holds the floor, apart from 3 UI pairings under 1.31:1.

### Derived states

`algebra` and `consumer` recompute hover, active, focus border, range thumb, link hover, and the table variants with Bootstrap's integer `mix` at Bootstrap's amounts. Their state values agree exactly: `.btn-primary` hover reads `#124fd6`, and the active background and hover border read `#114aca`. The order 15 < 20 < 25 holds in every family.

`ramp` maps each amount to Tailwind steps: up to 15% moves one step, and 20% or 25% move two. The buttons gain names (`hover:bg-blue-700 active:bg-blue-800`) and hold contrast. Two consumer losses follow:

- Every table variant reads `200` striped, hovered, and active (`proposal-ramp.md` § 3.4; its risk 3). A hovered striped `.table-primary` row shows no change, and an active row reads as a striped one.
- `.btn-light` hovers from `gray-50` `#f9fafb` to `gray-100` `#f3f4f6`, against Bootstrap's 15% shade to `#d3d4d5`. `.btn-dark` hovers from `gray-950` to `gray-900`. Both hovers are nearly invisible.

### Dark mode

The three dark body backgrounds are `gray-800` (`algebra`), `gray-900` (`consumer`), and `gray-950` (`ramp`). Bootstrap ships its outline labels on the dark body at 3.29 to 3.43. Only `gray-950` lifts all of them: primary 3.84, secondary 4.16, success 4.07, and danger 4.22 [J]. `gray-800` drops primary to 2.80, and `gray-900` drops secondary to 2.35.

For the dark roles, `consumer` and `ramp` take `300` for text emphasis and `950` for the subtle background. `950` is nearest Bootstrap's 80% shade in every hue (`blue-950` 0.084 against `blue-900` 0.194, [J]). For the subtle border, `ramp` takes `800` and `consumer` takes `700`. Bootstrap's 40% shade sits nearest `900`, then `800` (`#084298`: `blue-900` 0.028, `blue-800` 0.055, `blue-700` 0.126, [J]), so `800` is the nearer of the two.

`consumer` alone binds Tailwind's `dark:` to Bootstrap's switch: `@custom-variant dark (&:where([data-bs-theme=dark], [data-bs-theme=dark] *));`. Without that line, a page that sets `data-bs-theme="dark"` darkens Bootstrap's components and leaves `dark:bg-gray-900` light. No other proposal offers the consumer a dark-mode gain of that size.

### Grays

The proposals map the grays in 3 ways:

- `algebra` shifts every gray one step lighter: 100 to `50` through 900 to `800`, nearest by OKLab. The dark dropdown header then reads `gray-400` on `gray-700` at 3.96.
- `consumer` maps by name (`--bs-gray-300` is `gray-300`). That keeps the names legible, but Tailwind's middle grays sit about one step darker than Bootstrap's: `#ced4da` (`$gray-400`) sits 0.005 from `gray-300`, and `#6c757d` (`$gray-600`) sits 0.014 from `gray-500` [J]. `.alert-dark` falls to 3.96, which `consumer` repairs by moving `--bs-dark-bg-subtle` to `gray-300`. The list-group hover (4.34) and the dark dropdown header (3.03) stay broken, and `$secondary` becomes `gray-600`, which reads 2.35 on the dark body.
- `ramp` shifts 100 through 700 one step lighter, then sends 800 to `gray-800` and 900 to `gray-950`. Of the 55 strictly increasing gray maps, 5 pass the contrast rule, and this one has the least ΔE sum, 0.355 (`proposal-ramp.md` § 3.2). [J] confirms that it passes every gray pairing except the form-control border (1.30 to 1.24).

### Body and border colors

The light body text is `gray-800` under `algebra` (14.67), `gray-900` under `consumer` (17.75), and `gray-950` under `ramp` (20.13). All three exceed Bootstrap's 15.43 except `algebra`, which stays over 4.5:1.

The border color is `gray-200` under `algebra` and `ramp` (1.24 on white against 1.30) and `gray-300` under `consumer` (1.47). `consumer`'s `.form-control` reads `border-gray-300`, a class the consumer writes, and it is the only choice of the three that raises the form-control border.

### Radii

All radius rows but the pill already equal a Tailwind value (`scales.json`: `0.25rem` is `--radius-sm`, `0.375rem` is `--radius-md`, `0.5rem` is `--radius-lg`, `1rem` is `--radius-2xl`, `2rem` is `--radius-4xl`). The proposals treat them in 3 ways:

- `algebra` keeps the literals. Nothing changes, and nothing follows the consumer's theme.
- `consumer` writes `var(--radius-md, 0.375rem)` and the like, matched by value. [T] confirms that a `var()` reference in a plain declaration makes Tailwind emit `--radius-md: 0.375rem`, that `@theme { --radius-md: 0.5rem; }` makes it emit `0.5rem`, and that a literal declaration emits nothing. The default theme reads every radius unchanged, and a consumer's `--radius-md` reaches `.btn`, `.form-control`, `.card`, and `.alert`.
- `ramp` maps by name: `--bs-border-radius-xl` becomes `0.75rem` and `-xxl` becomes `1rem`. `.rounded-4` then reads 12px against 16px. The consumer writes neither `xl` nor `xxl` against those tokens, so the change is visible with nothing to name it by.

### Fonts

All three take `--font-sans` and `--font-mono`. Under the layer, preflight sets the font on `html`, and the reboot's `body` rule declares `var(--bs-body-font-family)` (verdict R4). A literal stack (`algebra`, `ramp`) therefore overrides a consumer's `@theme { --font-sans: 'Inter', sans-serif; }` on every element inside `body`. `consumer`'s `var(--font-sans, STACK)` is the only form under which the consumer's font reaches body text ([T]; `proposal-consumer.md` finding 1). The monospace token matters less: preflight's `code`, `kbd`, `samp`, and `pre` rule wins over the reboot's under the layer (verdict R4).

### Type scale

`algebra` and `consumer` keep Bootstrap's heading sizes, the fluid `calc()` forms, and the unitless `1.2`. `ramp` raises h1 to h3 to `--text-5xl`, `--text-4xl`, and `--text-3xl`. `.h1` then reads 48px against 40px at 1280px and 31.0px against 27.9px at 390px (`proposal-ramp.md` risk 4).

The rank map has no nearest-value basis. h1's 2.5rem sits nearer `--text-4xl` (2.25rem) than `--text-5xl` (3rem), and the nearest step sends h2 and h3 both to `--text-3xl`. Tailwind's `text-5xl` also carries line height 1, not 1.2. Under the layer a bare heading is Tailwind's (verdict R4), so the scale reaches only `.h1` to `.h6`, `.fs-*`, and the curated titles (`.modal-title`, `.card-title`, `.offcanvas-title`), where the consumer expects Bootstrap's documented sizes.

### Shadows

`consumer` and `ramp` map by name and rank: sm to `--shadow-sm`, base to `--shadow-md`, lg to `--shadow-lg`, inset to `--inset-shadow-xs`. `algebra` maps by nearest geometry: base to `--shadow-lg`, lg to `--shadow-2xl`.

Under the layer, `.shadow-sm` and `.shadow-lg` are shared names that Tailwind owns (verdict R1). The name map makes `--bs-box-shadow-sm` and `-lg` equal what those classes paint. With `$enable-shadows` off, the base token is visible only on `.toast` (`components/_toasts.scss:28`). `consumer` writes each as a reference with Tailwind's literal as the fallback, so it follows the consumer's theme.

### Focus ring

All three keep Bootstrap's ring: `0.25rem` wide at opacity `0.25`, colored by the primary base, `rgba(21, 93, 252, 0.25)`. All three use tint 50 for the focus border (`#8aaefe`, 2.20 on white against 2.06), except `ramp`, which uses `blue-400` (2.64). Tailwind's theme declares no ring default (`probe-report.md`, open inputs). Every proposal inherits the dark halo's 1.29 to 1.24 through 1.27 [J].

### Breakpoints and containers

All three align the breakpoints to `40rem`, `48rem`, `64rem`, `80rem`, and `96rem`. All three set the down forms to `39.99875rem` through `95.99875rem`, set container max-widths equal to the breakpoint, and keep the RFS cap at `1200px`.

The consumer gains the following:

- Every infix agrees with its Tailwind variant (`d-lg-none` with `lg:hidden`, `col-md-6` with `md:w-1/2`).
- The rem conditions move together when the reader enlarges the browser's default font.
- `.container` reads Tailwind's widths, so `container mx-auto px-4` reads Tailwind's container under the layer (16px padding, 1280px at 1280px).
- The middle face stops disagreeing with the layer on `.container`: under `unexcluded`, Tailwind's rule already reads 1280px (verdict § 12).

The consumer loses the following:

- Bootstrap's documented layouts shift in the bands from 576 to 639px, 992 to 1023px, 1200 to 1279px, and 1400 to 1535px. `.col-lg-6` reads full width at 1000px, and `.navbar-expand-lg` stays collapsed under 1024px.
- `xxl` starts at 1536px, so a 1440px laptop reads `xl` and caps `.container` at 1280px against Bootstrap's 1320px.
- At each breakpoint, `.container` fills the viewport minus Bootstrap's 0.75rem gutters. Bootstrap's gap of 32px to 80px between each breakpoint and its container width (`_variables.scss:484-509`) is gone.

The showcase widths read as follows, by the conditions in `_variables.scss:484-491` and `theme.css:327-331`. At 390px no infix is on under either set. At 768px `sm` and `md` are on and `lg` is off under both. At 1280px `lg` and `xl` are on and `xxl` is off under both, with `xl` on at exactly `80rem`. Every down form agrees at the three widths. No `-sm`, `-lg`, `-xl`, or `-xxl` rule changes state. Only `.container`'s max-width moves: from 720px to 768px at 768px, and from 1140px to 1280px at 1280px.

`ramp`'s readings table puts `.container` under `unexcluded` at 1140px, which contradicts the verdict's § 12 reading of 1280px. Its score loses one point for that.

### Component spacing

All three keep the `.btn`, `.card`, `.form-control`, and `.modal` paddings, the transitions, and the z-indices. Every spacer already equals a `--spacing` multiple (`scales.json`, 6 of 6). `consumer` adds the consumer-facing limit: a consumer's `--spacing` retunes Tailwind's own rules and never Bootstrap's components.

### Showcase faces' story

All three correct the brief's Question 6. Only the `tailwindcss` face shows the map, because the `unexcluded` face loads the unexcluded compile before `./bootstrap` (verdict R7).

`consumer` scores 5 on the story for the following reasons:

- A consumer table at 1280px reads 13 cases across the three faces, among them a consumer `@theme` font, radius, and color.
- The specimen "Bootstrap's primary beside Tailwind's blue-600" reads one color under the layer and two without it.
- The proposal maps the partition's Bootstrap-face reading through the token table, so the journey budget does not grow.

`algebra` adds 2 readings and a fourth `tuned` reading state that costs one baseline read per signature (its risk 6). `ramp` adds 6 readings. Two of them (`.h1` at 48px and `.rounded-4` at 12px) follow choices this judgment refuses, and one (`.container` under `unexcluded`) is wrong.

## Read the faces under the synthesis

The following readings hold under the synthesis map at 1280px in the light color mode unless a row names another state. They come from [J] and the map, and the T0 probe must read them in Chromium:

| Case | Bootstrap only | Tailwind without the layer | Tailwind with the layer |
| --- | --- | --- | --- |
| `.btn-primary` background | `rgb(13, 110, 253)` | `rgb(13, 110, 253)` | `rgb(21, 93, 252)`, equal to `bg-blue-600` |
| `.alert-primary` background, text | `#cfe2ff`, `#052c65` | the same | `#dbeafe`, `#193cb8`: `bg-blue-100 text-blue-800` |
| Body text, light | `#212529` | the same | `#030712`: `text-gray-950` |
| Body under `data-bs-theme="dark"` | `#dee2e6` on `#212529` | the same | `#d1d5dc` on `#030712`: `text-gray-300 bg-gray-950` |
| `.form-control` border color | `#dee2e6` | the same | `#d1d5dc`: `border-gray-300` |
| `.container` max-width at 768px, at 1280px | 720px, 1140px | 768px, 1280px | 768px, 1280px |
| Consumer `@theme { --font-sans: 'Inter', sans-serif; }`, body font | Bootstrap's stack | Bootstrap's stack | `Inter, sans-serif` |
| Consumer `@theme { --radius-md: 0.5rem; }`, `.btn` radius | 6px | 6px | 8px |
| `.h1` font size | 40px | 40px | 40px |
| Header button pressed (`btn-outline-secondary active`) | 4.69:1 | the same | 4.84:1 |
| Header button unpressed, light and dark | 19.92:1, 13.32:1 | the same | 20.10:1, 17.76:1 |

The showcase case `reads every header button at 4.5:1 or more, pressed or not, in both color modes` therefore holds by arithmetic under the synthesis [J]. A caption takes the form "Bootstrap only: … Without the layer: … With the layer: …" and collapses the first two faces where they agree.

## Synthesis map

The map follows one policy:

- A Bootstrap token that names a role, or a step of a hue, takes a named Tailwind step.
- A value Bootstrap derives by an amount (hover, active, focus, table states, link hover, and the 3 gray mixes) is Bootstrap's integer `mix` at Bootstrap's amount over the mapped inputs.
- Each `-rgb` triplet and `rgba()` form takes the channels of its resolved hex.
- Colors are sRGB hex from `tailwind-theme.json`, clipped per channel.
- Fonts, radii, and shadows are `var(--TOKEN, LITERAL)`, where `LITERAL` is Tailwind 4.3.3's default.

A dark cell reads "same" where Bootstrap declares no dark override. The map is a function of the lifted literal: every Bootstrap literal that serves several roles takes one tuned value. `#c6c7c8` is `.btn-light`'s active background and `.table-light`'s border, and both become `#c7c8c9`. `#4d5154` is `.btn-dark`'s active background and `.table-dark`'s border, and both become `#353941`. `#ced4da` is `--bs-gray-400` and `--bs-dark-bg-subtle`, and both become `gray-300`.

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
| `--bs-gray-900`, `--bs-dark`, `--bs-body-color` (light), `--bs-body-bg` (dark) | body text, dark page | `gray-950` | `#030712` | `#030712` (page) | Lifts every dark outline label over Bootstrap's (3.84 to 4.22); body text 20.13 and dark text 13.67 |
| `--bs-body-bg` (light), `--bs-emphasis-color` | page, emphasis | `white`; `black`, `white` | `#fff`; `#000` | `#030712`; `#fff` | Kept, except the dark page |
| `--bs-secondary-color`, `--bs-tertiary-color` | muted text | body color at 0.75 and 0.5 | `rgba(3, 7, 18, 0.75)`, `rgba(3, 7, 18, 0.5)` | `rgba(209, 213, 220, 0.75)`, `rgba(209, 213, 220, 0.5)` | Follows the body color; tertiary 3.79 against 3.12 |
| `--bs-tertiary-bg` (dark) | dark muted surface | `mix(gray-800, gray-950)` | same as light row | `#111826` | Bootstrap's 50% mix; header label 17.76 |
| `--bs-light-bg-subtle`, `--bs-dark-bg-subtle` (dark) | gray mixes | `mix(gray-50, white)`; `mix(gray-800, black)` | `#fcfdfd` | `#0f151d` | Bootstrap's 50% mixes; dark `.alert-dark` 12.45 |
| `--bs-light-text-emphasis`, `-bg-subtle`, `-border-subtle` (dark) | light roles in dark mode | `gray-50`, `gray-800`, `gray-600` | see light rows | `#f9fafb`, `#1e2939`, `#4a5565` | Follows the gray map |
| `--bs-dark-text-emphasis`, `-border-subtle` (dark) | dark roles in dark mode | `gray-300`, `gray-800` | see light rows | `#d1d5dc`, `#1e2939` | Follows the gray map |
| `--bs-primary-text-emphasis` | alert and list text | `blue-800`; dark `blue-300` | `#193cb8` | `#8ec5ff` | Role step by Bootstrap's name; light 7.23, dark 8.15 |
| `--bs-primary-bg-subtle` | alert fill, `.table-primary` | `blue-100`; dark `blue-950` | `#dbeafe` | `#162456` | `950` is nearest the 80% shade (0.084 against 0.194) |
| `--bs-primary-border-subtle` | alert border, list hover | `blue-200`; dark `blue-800` | `#bedbff` | `#193cb8` | Dark `800` is nearer the 40% shade than `700` (0.055 against 0.126) |
| `--bs-secondary-text-emphasis`, `-bg-subtle`, `-border-subtle` | secondary roles | `gray-800`, `gray-100`, `gray-200`; dark `gray-300`, `gray-950`, `gray-800` | `#1e2939`, `#f3f4f6`, `#e5e7eb` | `#d1d5dc`, `#030712`, `#1e2939` | Same steps as every hue; the dark fill equals the dark page, and the border carries the edge |
| `--bs-success-text-emphasis`, `-bg-subtle`, `-border-subtle` | success roles | `green-800`, `green-100`, `green-200`; dark `green-300`, `green-950`, `green-800` | `#016630`, `#dcfce7`, `#b9f8cf` | `#7bf1a8`, `#032e15`, `#016630` | Light alert 6.49, dark alert 10.67 |
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
| `.table-primary` to `.table-danger` and `.table-secondary` | table variants | the bg-subtle step, then Bootstrap's factors 0.2, 0.05, 0.1, 0.075 of the text color | primary `#dbeafe`, `#afbbcb`, `#d0def1`, `#c5d3e5`, `#cbd8eb`; success `#dcfce7`, `#b0cab9`, `#d1efdb`, `#c6e3d0`, `#cce9d6`; info `#cefafe`, `#a5c8cb`, `#c4eef1`, `#b9e1e5`, `#bfe7eb`; warning `#fef9c2`, `#cbc79b`, `#f1edb8`, `#e5e0af`, `#ebe6b3`; danger `#ffe2e2`, `#ccb5b5`, `#f2d7d7`, `#e6cbcb`, `#ecd1d1`; secondary `#f3f4f6`, `#c2c3c5`, `#e7e8ea`, `#dbdcdd`, `#e1e2e4` | same | Striped, active, and hover stay distinct; lowest text 13.82 |
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

## Contradictions and rulings

The proposals and the measurements disagree at the following points. Each item names the contradiction, then rules on it.

1. **Policy.** `algebra` derives every value from swapped bases, `ramp` names every value by step, and `consumer` names roles and derives amounts. Ruling: `consumer`. The role steps are classes the consumer writes, the amounts keep Bootstrap's state hierarchy, and the step rule collapses three table states into one.
2. **Contrast rule.** `algebra` gates threshold crossings only, while `consumer` and `ramp` gate the lesser of Bootstrap's ratio and the threshold. Ruling: the floor. The 2 exceptions are recorded with both ratios: the dark focus halo, whose color the primary base fixes, and `.btn-outline-light`, which reads under 1.06:1 in both sheets.
3. **Measured pairings.** `algebra` reports 0 crossings in 121 pairings and `consumer` 1 in 93, while [J] reads 1 and 2 crossings respectively. Ruling: [J], because both sets omit `.dropdown-menu-dark`, and `consumer`'s omits the dark list-group hover and the outline labels on the dark body. The verdict's contrast case must carry the 141 pairings of [J] at least.
4. **Warning and info bases.** `algebra` takes `400`; `consumer` and `ramp` take `500`. Ruling: `500`, because `400` lowers 2 pairings that already fail.
5. **Teal base.** `algebra` and `consumer` take `teal-400`; `ramp` takes `teal-500`. Ruling: `teal-400`, by the probe's metric over the oklch value. The two differ by 0.001 after the clip, and no pairing reads either.
6. **Gray map.** `algebra` shifts every gray one step lighter, `consumer` maps by name, and `ramp` shifts through 700 and maps 800 and 900 to `gray-800` and `gray-950`. Ruling: `ramp`'s map with `$gray-200` to `gray-200` and `$gray-300` to `gray-300`, and `$gray-400` joining `gray-300`. This departs from all three proposals. It is forced by the floor on the form-control border (`ramp`'s `gray-200` reads 1.24 against 1.30), and it lets `--bs-gray-200` and `--bs-gray-300` read their own names. The cost is a non-strict map: `--bs-gray-400` equals `--bs-gray-300`. `ramp` considered strictly increasing maps only, so the critic must attack this row.
7. **Dark body.** The proposals take `gray-800` (`algebra`), `gray-900` (`consumer`), and `gray-950` (`ramp`). Ruling: `gray-950`, the only one under which every outline label Bootstrap ships on the dark body holds Bootstrap's ratio.
8. **Dark subtle border.** `consumer` takes `700` and `ramp` takes `800`. Ruling: `800`, nearer Bootstrap's 40% shade in every measured hue.
9. **Derived states.** `algebra` and `consumer` use Bootstrap's amounts, and `ramp` uses step counts. Ruling: amounts, because the step rule makes table states identical and light and dark hovers nearly invisible.
10. **Light body text.** The proposals take `gray-800`, `gray-900`, and `gray-950`. Ruling: `gray-950`, which follows from item 6, because `$gray-900` is one literal (`#212529`) for the light body text, the dark page, `.btn-dark`, and `.table-dark`.
11. **Border color.** `algebra` and `ramp` take `gray-200`; `consumer` takes `gray-300`. Ruling: `gray-300`, per item 6.
12. **Radii.** `algebra` keeps the literals, `consumer` references equal values, and `ramp` renames by name. Ruling: `consumer`'s references. The default theme reads unchanged, and the consumer's theme follows.
13. **Fonts.** `algebra` and `ramp` write literals, and `consumer` writes references. Ruling: references, because a literal stack hides a consumer `--font-sans` from all body text.
14. **Shadows.** `algebra` maps by geometry (base to `--shadow-lg`), and `consumer` and `ramp` by name (base to `--shadow-md`). Ruling: by name, through references, so the tokens equal what the shared `.shadow-sm` and `.shadow-lg` classes paint.
15. **Type scale.** `algebra` and `consumer` keep Bootstrap's, and `ramp` raises h1 to h3. Ruling: keep, because no nearest map preserves the heading order and Tailwind's line heights differ.
16. **Output form.** `algebra` and `ramp` emit hex everywhere, and `consumer` emits hex for colors and references for scales. Ruling: `consumer`. Colors stay hex, because mixes, triplets, and `%23` escapes need sRGB channels, and an `oklch()` value breaks the escape (`mechanism.md`).
17. **The brief's Question 6.** The brief says "the two Tailwind faces show the map"; all three proposals say only `tailwindcss` shows it. Ruling: only `tailwindcss`, per verdict R7.
18. **`.container` under `unexcluded`.** `ramp` reads 1140px; `consumer` and verdict § 12 read 1280px. Ruling: 1280px.
19. **Partition baseline.** `algebra` adds a `tuned` reading state, and `consumer` and `ramp` map the Bootstrap-face reading through the token table. Ruling: map, because the consumer's showcase journey keeps its recorded 449 s and 487 s without a fourth read per signature.
20. **Custom palette.** `consumer` forwards `$palette` from `src/tailwindcss/index.scss` for Sass consumers, and `algebra` refuses it in this round. Ruling: refuse in this round, and record it for the roadmap. Its key shape depends on the mechanism verdict, because a literal-keyed map is no interface a consumer can write against. The guide states that colors pin to Tailwind 4.3.3's default palette, while fonts, radii, and shadows follow the consumer's theme.
21. **Dark-mode variant.** Only `consumer` writes the `@custom-variant dark` line for the guide. Ruling: adopt it. Add the sentence that a page relying on `prefers-color-scheme` alone darkens Tailwind's utilities and leaves Bootstrap's components light.
22. **Occurrence counts.** All three proposals count 616 occurrences from the probe; `mechanism.md` reads 571 (616 − 69 `transparent` + 24 uppercase `RGBA` link hovers). Ruling: `mechanism.md`. The map carries the 8 `.link-*:hover` triplets, and the token proof counts them.
23. **Landing order.** `algebra` and `ramp` join the flip before its falsify round, and `consumer` follows the flip's landing and holds the release. Ruling for the consumer only: no veneer release may ship between the flip and the tokens, so the consumer meets one visual change. The order itself is the verdict's.

## Carry these into the verdict

The following measurements remain open, and each one exposes a ruling of this judgment:

- The T0 probe must reproduce [J] in Chromium over the synthesis map, including the dark `mark` at 4.65, 0.15 over 4.5:1.
- The T0 probe must reproduce [T] inside the full recipe compile, and also with `prefix(tw)`, where every reference falls back to Tailwind's default.
- A pixel reading of `bg-yellow-500` beside `.btn-warning` on a wide-gamut profile measures the clip. Clipping moves `yellow-500` by OKLab 0.0225 [J], ahead of `cyan-500` (0.0165) and `teal-400` (0.0128) among the synthesis steps; `consumer` reports the same three figures.
- The showcase readings at 390, 768, and 1280px, with `.container` at 1279 and 1280px, confirm that `xl` holds at exactly `80rem`.
