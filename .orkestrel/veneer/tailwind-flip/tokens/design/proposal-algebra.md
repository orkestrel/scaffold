# Tokens proposal: Bootstrap's algebra over Tailwind bases

Planner `algebra`, blind, 2026-10-04, over `../brief.md` and its facts. The proposal swaps 19 Bootstrap
bases (the ten hues and the nine grays) for Tailwind colors and recomputes every tint, shade, mix,
alpha form, `-rgb` triplet, and `color-contrast` choice with Bootstrap's own functions. The base of
each hue is the Tailwind step nearest Bootstrap's base for which Bootstrap's `color-contrast` picks
the foreground Bootstrap picks. Under that rule, none of 121 shipped text and control pairings drops
under the WCAG threshold it meets in Bootstrap alone (the algebra run, § 3). Base 500 drops 3
pairings and flips the text of 3 buttons to black. The mechanism is a `$palette` switch and a
`$scale` switch in the Bootstrap partials. Every base-dependent literal sits behind a function whose
default returns Bootstrap's spelling, so `./bootstrap` stays byte-identical.

Sources: the GPT-6 Astra probe (`probe-report.md` and its JSON files, Bootstrap 5.3.8, Tailwind
4.3.3), the scout (`scout-distillate.md`), and two scratchpad runs on 2026-10-04 that touch no
checkout. The algebra run is Node 22.22.2 over `tailwind-theme.json` (the probe's clipped sRGB and
OKLab) and Bootstrap's `$_luminance-list`. It implements `tint-color`, `shade-color`, `shift-color`,
and `mix` as integer sRGB mixing that rounds half up, and `color-contrast` with `$min-contrast-ratio: 4.5`.
It reproduces 13 compiled Bootstrap hexes (`#0b5ed7`, `#0a53be`, `#a6b5cc`, `#bfd1ec`, `#fcfcfd`,
`#1a1d20`, `#2b3035`, `#8bb9fe`, `#424649`, `#31d2f2`, `#d3d4d5`, `#2c3034`, and `#e5e6e7`), and its
WCAG ratios use the exact sRGB transfer. The Sass run compiles a scratch module with the installed
Sass 1.105.1 and reproduces `#cfe2ff`, `#052c65`, `#0b5ed7`, `13, 110, 253`,
`rgba(13, 110, 253, 0.25)`, and a `%23` data-URI color through the functions of § 4. In the same
compile, `color.mix(white, #0d6efd, 80%)` emits `rgb(81.0196078431%, 88.6274509804%, 99.8431372549%)`.

## 1. Rulings

1. **The map's policy: Bootstrap's algebra over Tailwind bases.** Swap the 19 bases. Derive
   everything else with Bootstrap's functions at Bootstrap's weights: the ramps, roles, button
   states, table variants, focus forms, triplets, and contrast choices. Reason: the 368
   base-dependent occurrences of the lifted sheet are 19 bases and functions of them, so
   recomputing keeps every relation Bootstrap draws (hover 15% darker, subtle 80% toward white, a
   table border 20% toward its text). Nearest-by-ΔE breaks those relations, and 42 of the 143
   literals with a hue family have no same-family Tailwind color within ΔE 0.05 (`probe-report.md`:
   101 of 143). Role-by-ramp has no step for 15/20/25% states or 50/70% tints (scout § 4).
   - **Families.** Each hue takes its same-name family: `$blue` blue, `$indigo` indigo, `$purple`
     purple, `$pink` pink, `$red` red, `$orange` orange, `$yellow` yellow, `$green` green, `$teal`
     teal, `$cyan` cyan. The grays take `gray`. Reason: the user's words name the family ("the
     tailwindcss blue"), and a Tailwind user reads `$yellow` as yellow. Rule on the near
     alternatives: amber-400 sits nearer `#ffc107` than yellow-400 (ΔE 0.023 against 0.036,
     `nearest.json`), and emerald-400 sits nearer `#20c997` than teal-400 (0.037 against 0.052).
     Both lose to the name, which costs ΔE 0.013 and 0.016. Bootstrap's grays sit
     at hue 248° with chroma up to 0.017 (the algebra run). `gray` sits at 247.8° to 264.7° with
     chroma up to 0.033 (`theme.css:226-236`), `zinc` at 286° with Bootstrap's chroma, and
     `neutral` at chroma 0. `gray` wins by name and hue over zinc's lower ΔE sum (0.183 against
     0.216, the algebra run), and reads bluer at the dark end (risk 7).
   - **Base shade (the contrast rule).** For each hue, compute Bootstrap's `color-contrast` of
     Bootstrap's base, which is white for blue, indigo, purple, pink, red, and green, and black for
     orange, yellow, teal, and cyan. Keep the steps of the family for which `color-contrast` returns
     the same foreground. Take the step nearest Bootstrap's base by OKLab ΔE. Result: blue-600,
     indigo-600, purple-800, pink-600, red-600, orange-400, yellow-400, green-700, teal-400, and
     cyan-400. Blue-500 is refused: white on it reads 3.76:1, so `color-contrast` returns black, and
     `.btn-primary` would ship black text. Blue-600 reads 5.25:1 with white. Bootstrap's own
     `#0d6efd` reads 4.50078:1 (the algebra run). The grays map in order, onto the strictly
     increasing gray steps with the least ΔE sum (a dynamic program in the algebra run): 100 to 50,
     200 to 100, and so on up to 900 to 800. Nearest per step alone sends 200 and 300 both to
     gray-200, which would merge `--bs-secondary-bg` and `--bs-border-color`.
   - **The contrast rule.** No pairing Bootstrap ships that reads 4.5:1 for text, or 3:1 for a
     control, under Bootstrap alone reads under that threshold under the tuned sheet alone. A
     pairing that Bootstrap alone ships under its threshold, such as an outline-warning label or a
     focus halo, is Bootstrap's design. The proof records it and does not gate it. Measured: 0
     crossings in 121 pairings (§ 3). The strict alternative, that no pairing reads worse than in
     Bootstrap alone, is refused: 57 of the 121 pairings read lower, each still at or over the
     threshold it met, and the largest drop is 6.10:1 to 4.79:1 for invalid text on the dark body.
2. **Derived values: recomputed with Bootstrap's algebra from the swapped bases.** Hover and active
   use 15/20/25 and 10/20 for tinted variants, focus borders tint 50, range thumbs tint 70, table
   variants shift −80 with the factors .2/.05/.1/.075, link hover shade 20, and the dark-mode roles
   tint 40, shade 80, and shade 40. Reason: a ramp neighbor is a different interval per family,
   while the algebra keeps each state's distance from its base equal to Bootstrap's. Alpha forms
   and `-rgb` triplets follow from the resolved sRGB of the swapped base (`13, 110, 253` becomes
   `21, 93, 252`).
3. **Which scales.**
   - **Radii: kept.** 6 of 7 rows already equal a Tailwind value (`scales.json`); pill `50rem` has
     no counterpart. `--bs-border-radius-xl` to `--radius-xl` changes 1rem to 0.75rem for a name.
   - **Font stacks: mapped** to `--font-sans` and `--font-mono` (`theme.css:2-7`). Reason: the
     reboot's `body` rule declares `font-family: var(--bs-body-font-family)` and preflight declares
     none on `body` (verdict § 2), so body text reads Bootstrap's stack until the stack moves.
   - **Type scale: kept,** fluid `calc()` forms and unitless 1.2 line heights included. The base
     already equals `--text-base`, and RFS is Bootstrap's algebra over it. h1 to h3 and four display
     caps (5rem, 4rem, 3.5rem, 2.5rem) equal no Tailwind step (`scales.json`), so a role map rounds.
   - **Shadows: mapped by nearest offset and blur:** sm to `--shadow-sm`, base to `--shadow-lg`, lg
     to `--shadow-2xl`, inset to `--inset-shadow-xs` (`theme.css:408-415`). Toasts, popovers,
     modals, and dropdowns read these tokens; the `.shadow*` utilities are shared names already.
   - **Focus ring: the algebra,** `rgba(21, 93, 252, 0.25)` at 0.25rem. Tailwind's theme declares
     no ring default (`probe-report.md`, open inputs).
   - **Breakpoints and containers: aligned** to `40rem`, `48rem`, `64rem`, `80rem`, and `96rem`,
     with the `-down` forms at Bootstrap's 0.02px offset as `0.00125rem` (`39.99875rem`) and
     container max-widths at `max-width = breakpoint`, Tailwind's convention. Reason: every infix
     agrees with its Tailwind variant (`d-lg-none` and `lg:hidden` switch at one width), also at a
     browser font size other than 16px, where a rem media query moves and a px one does not. The
     RFS cap `1200px` is Bootstrap's separate `$rfs-breakpoint` and stays.
   - **Spacing, transitions, and z-indices: kept.** All six spacers and the component paddings are
     exact `--spacing` multiples (`scales.json`: `.375rem` is 1.5, `.75rem` is 3).
4. **The mechanism: a `$palette` switch and a `$scale` switch in the Bootstrap partials, with every
   base-dependent literal behind a function that returns Bootstrap's spelling by default.** The
   switches are configured from `src/tailwindcss/_tokens.scss` like the five switches, and
   `./bootstrap` is byte-identical. Text substitution in `configs/src/vite.tailwindcss.config.ts` is
   refused. The law has the derived build configure the partials through `_tokens.scss` switches
   the guide records (`AGENTS.md` § Project model, styles § Prohibitions). The source names each
   origin (`shade-color(primary, 15%)` for `#0b5ed7`), which the record of § 5 checks. A hex table
   cannot recompute a flipped `color-contrast` choice. The Sass entry and the built sheet come from
   one compile. The hybrid is refused: it keeps two mechanisms for one map.
5. **Output form: resolved sRGB hex everywhere,** in Bootstrap's spellings: `#rrggbb`, `r, g, b`,
   `rgba(r, g, b, a)`, and `%23rrggbb`. Reason: Bootstrap's mix, the `-rgb` triplets, and
   `color-contrast` work in gamma-encoded sRGB, and one form keeps the record a byte map. Gamut:
   the probe's conversion clips each encoded channel. 7 of the 10 hue bases are out of sRGB as
   oklch (§ 2), so the clip is a stated input and risk 3 measures it.
6. **The proofs: the brief's set, made concrete in § 5.** The token record carries an origin per
   row, and the algebra proof evaluates each origin on both base sets. The component baseline of
   the witness, partition, and paired engine states cases becomes the tuned sheet alone, and one
   case pins the tuned sheet against Bootstrap alone through the map.
7. **The 17 shared component names: unchanged ownership.** `.container` takes the aligned
   max-widths, `.table` takes the recomputed colors, and `.collapse` is unchanged. A Tailwind user
   expects `container` to cap at the breakpoint width. Under the map, Bootstrap's `.container`
   reads `max-width: 80rem` (1280px) at 1280px, the value Tailwind's own rule reads under the
   `unexcluded` face (verdict § 12), plus Bootstrap's 0.75rem gutters and auto margins.
8. **Dark mode: Bootstrap's algebra over the swapped bases,** with text emphasis tint 40, bg subtle
   shade 80, and border subtle shade 40, not Tailwind's 300, 900, and 700 steps. Reason: the dark
   roles are Bootstrap's derivations, and recomputing them keeps every dark alert at 6.14:1 or
   more (§ 3). Body colors follow the gray swap. Body bg `$gray-900` becomes gray-800 `#1e2939`,
   not gray-900 or gray-950, because L 0.278 sits nearest Bootstrap's 0.262 (the algebra run) and
   a darker body would shift every dark surface role off Bootstrap's spacing. Body color
   `$gray-300` becomes gray-200 `#e5e7eb`.
9. **Order and landing: join the flip.** The token units land on `ccr-d15a48b1-yyyll6` after the
   flip's U8 gates and before TF3's falsify round, so one falsify round attacks the final claims.
   Reason: the map changes the component baseline that the flip's preservation proofs read. A
   falsify round over the untuned baseline would be repeated. T1 changes no output byte, so it can
   land at any point. The showcase's contrast cases must pass under the map (§ 3 measures 4.84:1
   for the pressed header button). The journey budget holds at the recorded 449 s and 487 s
   (verdict § 12), and T4's acceptance rejects any widening.

## 2. The map

Bases, from `tailwind-theme.json` (hex is the probe's clipped sRGB; ΔE from the algebra run, equal
to `nearest.json` where both list the pair). `$black` and `$white` map to `--color-black` `#000` and
`--color-white` `#fff` (`theme.css:322-323`), unchanged bytes.

| Bootstrap base | Bootstrap hex | Tailwind token | Resolved hex | OKLab ΔE | Out of sRGB |
| --- | --- | --- | --- | --- | --- |
| `$blue` | `#0d6efd` | `--color-blue-600` | `#155dfc` | 0.038 | no |
| `$indigo` | `#6610f2` | `--color-indigo-600` | `#4f39f6` | 0.052 | no |
| `$purple` | `#6f42c1` | `--color-purple-800` | `#6e11b0` | 0.077 | no |
| `$pink` | `#d63384` | `--color-pink-600` | `#e60076` | 0.045 | yes, clipped |
| `$red` | `#dc3545` | `--color-red-600` | `#e7000b` | 0.051 | yes, clipped |
| `$orange` | `#fd7e14` | `--color-orange-400` | `#ff8904` | 0.027 | yes, clipped |
| `$yellow` | `#ffc107` | `--color-yellow-400` | `#fdc700` | 0.036 | yes, clipped |
| `$green` | `#198754` | `--color-green-700` | `#008236` | 0.043 | yes, clipped |
| `$teal` | `#20c997` | `--color-teal-400` | `#00d5be` | 0.052 | yes, clipped |
| `$cyan` | `#0dcaf0` | `--color-cyan-400` | `#00d3f2` | 0.027 | yes, clipped |
| `$gray-100` | `#f8f9fa` | `--color-gray-50` | `#f9fafb` | 0.003 | no |
| `$gray-200` | `#e9ecef` | `--color-gray-100` | `#f3f4f6` | 0.025 | no |
| `$gray-300` | `#dee2e6` | `--color-gray-200` | `#e5e7eb` | 0.017 | no |
| `$gray-400` | `#ced4da` | `--color-gray-300` | `#d1d5dc` | 0.005 | no |
| `$gray-500` | `#adb5bd` | `--color-gray-400` | `#99a1af` | 0.063 | no |
| `$gray-600` | `#6c757d` | `--color-gray-500` | `#6a7282` | 0.014 | no |
| `$gray-700` | `#495057` | `--color-gray-600` | `#4a5565` | 0.024 | no |
| `$gray-800` | `#343a40` | `--color-gray-700` | `#364153` | 0.035 | no |
| `$gray-900` | `#212529` | `--color-gray-800` | `#1e2939` | 0.029 | no |

The following theme roles are derived. Each cell reads Bootstrap's value, then the tuned value; the
theme aliases are Bootstrap's (`primary` = `$blue`, `secondary` = `$gray-600`, `success` = `$green`,
`info` = `$cyan`, `warning` = `$yellow`, `danger` = `$red`, `light` = `$gray-100`, `dark` =
`$gray-900`), and `light` and `dark` take Bootstrap's fixed gray roles (`_variables.scss:325-354`,
`_variables-dark.scss:11-40`).

| Theme color | Base | Text emphasis | Bg subtle | Border subtle | Dark text emphasis | Dark bg subtle | Dark border subtle |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `primary` | `#0d6efd` → `#155dfc` | `#052c65` → `#082565` | `#cfe2ff` → `#d0dffe` | `#9ec5fe` → `#a1befe` | `#6ea8fe` → `#739efd` | `#031633` → `#041332` | `#084298` → `#0d3897` |
| `secondary` | `#6c757d` → `#6a7282` | `#2b2f32` → `#2a2e34` | `#e2e3e5` → `#e1e3e6` | `#c4c8cb` → `#c3c7cd` | `#a7acb1` → `#a6aab4` | `#161719` → `#15171a` | `#41464b` → `#40444e` |
| `success` | `#198754` → `#008236` | `#0a3622` → `#003416` | `#d1e7dd` → `#cce6d7` | `#a3cfbb` → `#99cdaf` | `#75b798` → `#66b486` | `#051b11` → `#001a0b` | `#0f5132` → `#004e20` |
| `info` | `#0dcaf0` → `#00d3f2` | `#055160` → `#005461` | `#cff4fc` → `#ccf6fc` | `#9eeaf9` → `#99edfa` | `#6edff6` → `#66e5f7` | `#032830` → `#002a30` | `#087990` → `#007f91` |
| `warning` | `#ffc107` → `#fdc700` | `#664d03` → `#655000` | `#fff3cd` → `#fff4cc` | `#ffe69c` → `#fee999` | `#ffda6a` → `#fedd66` | `#332701` → `#332800` | `#997404` → `#987700` |
| `danger` | `#dc3545` → `#e7000b` | `#58151c` → `#5c0004` | `#f8d7da` → `#faccce` | `#f1aeb5` → `#f5999d` | `#ea868f` → `#f1666d` | `#2c0b0e` → `#2e0002` | `#842029` → `#8b0007` |
| `light` | `#f8f9fa` → `#f9fafb` | `#495057` → `#4a5565` | `#fcfcfd` → `#fcfdfd` | `#e9ecef` → `#f3f4f6` | `#f8f9fa` → `#f9fafb` | `#343a40` → `#364153` | `#495057` → `#4a5565` |
| `dark` | `#212529` → `#1e2939` | `#495057` → `#4a5565` | `#ced4da` → `#d1d5dc` | `#adb5bd` → `#99a1af` | `#dee2e6` → `#e5e7eb` | `#1a1d20` → `#1b212a` | `#343a40` → `#364153` |

Button states (`mixins/_buttons.scss`, `_buttons.scss:131-155` of Bootstrap). Every text color stays
Bootstrap's because `color-contrast` returns the same foreground at every state: `#fff` on primary,
secondary, success, danger, and dark; `#000` on info, warning, and light.

| Button | Hover bg | Hover border | Active bg | Active border | Focus `-rgb` |
| --- | --- | --- | --- | --- | --- |
| `.btn-primary` | `#0b5ed7` → `#124fd6` | `#0a58ca` → `#114aca` | `#0a58ca` → `#114aca` | `#0a53be` → `#1046bd` | `49, 132, 253` → `56, 117, 252` |
| `.btn-secondary` | `#5c636a` → `#5a616f` | `#565e64` → `#555b68` | `#565e64` → `#555b68` | `#51585e` → `#505662` | `130, 138, 145` → `128, 135, 149` |
| `.btn-success` | `#157347` → `#006f2e` | `#146c43` → `#00682b` | `#146c43` → `#00682b` | `#13653f` → `#006229` | `60, 153, 110` → `38, 149, 84` |
| `.btn-info` | `#31d2f2` → `#26daf4` | `#25cff2` → `#1ad7f3` | `#3dd5f3` → `#33dcf5` | `#25cff2` → `#1ad7f3` | `11, 172, 204` → `0, 179, 206` |
| `.btn-warning` | `#ffca2c` → `#fdcf26` | `#ffc720` → `#fdcd1a` | `#ffcd39` → `#fdd233` | `#ffc720` → `#fdcd1a` | `217, 164, 6` → `215, 169, 0` |
| `.btn-danger` | `#bb2d3b` → `#c40009` | `#b02a37` → `#b90009` | `#b02a37` → `#b90009` | `#a52834` → `#ad0008` | `225, 83, 97` → `235, 38, 48` |
| `.btn-light` | `#d3d4d5` → `#d4d5d5` | `#c6c7c8` → `#c7c8c9` | `#c6c7c8` → `#c7c8c9` | `#babbbc` → `#bbbcbc` | `211, 212, 213` → `212, 213, 213` |
| `.btn-dark` | `#424649` → `#404957` | `#373b3e` → `#353e4d` | `#4d5154` → `#4b5461` | `#373b3e` → `#353e4d` | `66, 70, 73` → `64, 73, 87` |

Table variants (`mixins/_table-variants.scss`; text `#000` on every variant but `.table-dark`,
which keeps `#fff`):

| Table variant | Bg | Border | Striped | Active | Hover |
| --- | --- | --- | --- | --- | --- |
| `.table-primary` | `#cfe2ff` → `#d0dffe` | `#a6b5cc` → `#a6b2cb` | `#c5d7f2` → `#c6d4f1` | `#bacbe6` → `#bbc9e5` | `#bfd1ec` → `#c0ceeb` |
| `.table-secondary` | `#e2e3e5` → `#e1e3e6` | `#b5b6b7` → `#b4b6b8` | `#d7d8da` → `#d6d8db` | `#cbccce` → `#cbcccf` | `#d1d2d4` → `#d0d2d5` |
| `.table-success` | `#d1e7dd` → `#cce6d7` | `#a7b9b1` → `#a3b8ac` | `#c7dbd2` → `#c2dbcc` | `#bcd0c7` → `#b8cfc2` | `#c1d6cc` → `#bdd5c7` |
| `.table-info` | `#cff4fc` → `#ccf6fc` | `#a6c3ca` → `#a3c5ca` | `#c5e8ef` → `#c2eaef` | `#badce3` → `#b8dde3` | `#bfe2e9` → `#bde4e9` |
| `.table-warning` | `#fff3cd` → `#fff4cc` | `#ccc2a4` → `#ccc3a3` | `#f2e7c3` → `#f2e8c2` | `#e6dbb9` → `#e6dcb8` | `#ece1be` → `#ece2bd` |
| `.table-danger` | `#f8d7da` → `#faccce` | `#c6acae` → `#c8a3a5` | `#eccccf` → `#eec2c4` | `#dfc2c4` → `#e1b8b9` | `#e5c7ca` → `#e7bdbf` |
| `.table-light` | `#f8f9fa` → `#f9fafb` | `#c6c7c8` → `#c7c8c9` | `#ecedee` → `#edeeee` | `#dfe0e1` → `#e0e1e2` | `#e5e6e7` → `#e6e7e8` |
| `.table-dark` | `#212529` → `#1e2939` | `#4d5154` → `#4b5461` | `#2c3034` → `#293443` | `#373b3e` → `#353e4d` | `#323539` → `#2f3948` |

Body and component roles:

| Role and origin | Bootstrap | Tuned |
| --- | --- | --- |
| `--bs-body-color` light, `$gray-900` | `#212529` | `#1e2939` |
| `--bs-body-bg` light, `$white` | `#fff` | `#fff` |
| `--bs-secondary-bg` light, `$gray-200` | `#e9ecef` | `#f3f4f6` |
| `--bs-tertiary-bg` light, `$gray-100` | `#f8f9fa` | `#f9fafb` |
| `--bs-border-color` light, `$gray-300` | `#dee2e6` | `#e5e7eb` |
| `--bs-body-color` dark, `$gray-300` | `#dee2e6` | `#e5e7eb` |
| `--bs-body-bg` dark, `$gray-900` | `#212529` | `#1e2939` |
| `--bs-secondary-bg` dark, `$gray-800` | `#343a40` | `#364153` |
| `--bs-tertiary-bg` dark, `mix($gray-800, $gray-900)` | `#2b3035` | `#2a3546` |
| `--bs-border-color` dark, `$gray-700` | `#495057` | `#4a5565` |
| `--bs-link-color` light and hover, shade 20 | `#0d6efd`, `#0a58ca` | `#155dfc`, `#114aca` |
| `--bs-link-color` dark, tint 40, and hover, tint 20 of it | `#6ea8fe`, `#8bb9fe` | `#739efd`, `#8fb1fd` |
| `--bs-focus-ring-color`, `rgba($primary, .25)` | `rgba(13, 110, 253, 0.25)` | `rgba(21, 93, 252, 0.25)` |
| `$input-focus-border-color`, tint 50 | `#86b7fe` | `#8aaefe` |
| `$form-range-thumb-active-bg`, tint 70 | `#b6d4fe` | `#b9cefe` |
| `--bs-code-color` light and dark, tint 40 | `#d63384`, `#e685b5` | `#e60076`, `#f066ad` |
| `--bs-highlight-bg` light (`$yellow-100`) and dark (`$yellow-800`) | `#fff3cd`, `#664d03` | `#fff4cc`, `#655000` |
| `--bs-primary-rgb` | `13, 110, 253` | `21, 93, 252` |

The following table gives the scale rows (`scales.json` categories, `theme.css` lines). Kept rows
keep Bootstrap's value. Equal rows already hold Tailwind's value.

| Category | Bootstrap | Tuned | Tailwind source |
| --- | --- | --- | --- |
| Breakpoints sm, md, lg, xl, xxl | 576, 768, 992, 1200, 1400px | `40rem`, `48rem`, `64rem`, `80rem`, `96rem` | `--breakpoint-*`, `:327-331` |
| `-down` breakpoints | 575.98 to 1399.98px | `39.99875rem` to `95.99875rem` | Bootstrap's 0.02px offset in rem |
| `--bs-breakpoint-*` | `576px` and the rest | `40rem` and the rest | `:327-331` |
| Container max-widths sm to xxl | 540, 720, 960, 1140, 1320px | `40rem`, `48rem`, `64rem`, `80rem`, `96rem` | Tailwind's `container` rule |
| RFS cap | `1200px` | kept | none |
| `--bs-font-sans-serif` | `system-ui, -apple-system, …` | `-apple-system, BlinkMacSystemFont, …` | `--font-sans`, `:2-4` |
| `--bs-font-monospace` | `SFMono-Regular, Menlo, …` | `ui-monospace, SFMono-Regular, …` | `--font-mono`, `:5-7` |
| `--bs-box-shadow-sm` | `0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)` | `--shadow-sm` literal | `:408` |
| `--bs-box-shadow` | `0 0.5rem 1rem rgba(0, 0, 0, 0.15)` | `--shadow-lg` literal | `:410` |
| `--bs-box-shadow-lg` | `0 1rem 3rem rgba(0, 0, 0, 0.175)` | `--shadow-2xl` literal | `:412` |
| `--bs-box-shadow-inset` | `inset 0 1px 2px rgba(0, 0, 0, 0.075)` | `--inset-shadow-xs` literal | `:415` |
| Focus ring width and opacity | `0.25rem`, `0.25` | kept | no ring default |
| Radii (7 rows) | `0.375rem` to `50rem` | kept; 6 equal | `--radius-*`, `:397-404` |
| Type (35 rows), weights (21), line heights (17) | Bootstrap's | kept; 10, 19, 17 equal | `--text-*`, `--font-weight-*`, `--leading-*` |
| Spacers (6), paddings (12) | Bootstrap's | kept; 6 and 2 equal | `--spacing`, `:325` |
| Transitions (3), z-indices (15) | Bootstrap's | kept; 1 and 0 equal | none |

Kept literals, which the token proof lists by value: `#000`, `#fff`, every `rgba(0, 0, 0, a)` and
`rgba(255, 255, 255, a)`, and `transparent`. That is 160 of the 616 occurrences: 91 black and white
roles and 69 `transparent` (the algebra run's classification of `inventory.json`). The other 456
occurrences go behind a call: 368 depend on a base and 88 are `color-contrast` results, which keep
their value under this map.

## 3. Measurements behind the rulings

The algebra run reads 121 pairings under Bootstrap alone and under the map: button text on base,
hover, and active, outline text on white, alert emphasis on bg subtle in both modes, table text on
its four backgrounds, body, secondary, and tertiary text, links and hovers, validation text, code,
mark, and `.text-*-emphasis` in both modes, the focus ring, focus border, input border, check, and
range thumb as controls at 3:1, and the showcase header buttons. The results follow:

- **Under the chosen map:** 0 crossings and 0 `color-contrast` flips. The same 9 pairings sit under
  threshold in both sheets: outline-info, outline-warning, and outline-light text on white (1.96,
  1.63, and 1.05 against 1.81, 1.57, and 1.05), tertiary text (3.12 against 3.05), the focus ring
  on white and on dark, the focus border, the input border, and the active range thumb. 57 read
  lower than in Bootstrap; the largest drops are invalid text and `.text-danger-emphasis` on the
  dark body (6.10 to 4.79), dark code (6.16 to 5.04), and the dark danger alert (7.15 to 6.14).
- **Base 500 under the algebra**, over the 35 pairings of the five chromatic theme colors: 3
  crossings, for primary, success, and danger text on white (4.50 to 3.76, 4.53 to 2.22, and 4.53
  to 3.81), and `color-contrast` flips `.btn-primary`, `.btn-success`, and `.btn-danger` to black.
- **Role-by-ramp at 500:** the same 3 crossings. **At 600:** 1 crossing, for success text on white
  (4.53 to 3.22), and green-600 flips `.btn-success` to black.
- **Showcase header:** the pressed button (`btn-outline-secondary active`) reads 4.84:1 against
  Bootstrap's 4.69. Unpressed, it reads 21:1 in light and 14.67:1 in dark against 15.43.
  `reads every header button at 4.5:1 or more, pressed or not, in both color modes` holds by
  arithmetic, and T4 reads it live.
- **The function check:** 83 lifted literals carry more than one candidate origin
  (`inventory.json`), and all evaluate to one tuned value under this map (0 conflicts, the algebra
  run). The old-to-tuned relation is therefore a function on the lifted sheet's 143 normalized
  values, and the record of § 5 is a byte map.
- **Breakpoints at the showcase widths:** at 390px no infix is active under either set. At 768px sm
  and md are active and lg is inactive under both. At 1280px sm, md, lg, and xl are active and xxl
  is inactive under both (576 ≤ 640 ≤ 768 < 992 ≤ 1024 ≤ 1200 ≤ 1280 < 1400 ≤ 1536). No `-sm`,
  `-lg`, `-xl`, or `-xxl` rule changes state at those three widths. What changes is `.container`'s
  max-width (720px to 768px at 768, and 1140px to 1280px at 1280) and every width between the two
  sets' thresholds. T0's P5 reads the same claim live.

## 4. Mechanism

`src/bootstrap/_mixins.scss`, which holds the functions and the switches (`.claude/rules/styles.md`
§ Centralized files):

- `$palette: () !default;` and `$scale: () !default;` join the five switches.
- Private maps hold the defaults: `$-bases` maps the 21 base names to Bootstrap's spellings
  (`blue: '#0d6efd'` through `white: '#fff'`), `$-themes` maps the eight theme names to bases
  (`primary: blue`), and `$-scales` maps `sm` to `xxl`, `container-sm` to `container-xxl`, the two
  font stacks, and the four `box-shadow` names to Bootstrap's text. The pinned recreation may carry
  literal colors (styles § Prohibitions).
- `$_luminance-list` is copied verbatim from Bootstrap's `_functions.scss`. `color-contrast` must
  use Bootstrap's table, because `#0d6efd` on white reads 4.50078:1 exactly and a recomputed
  luminance can flip a borderline choice.
- Functions keep Bootstrap's names. Each takes a base name, a theme name, or a hex string and
  returns an unquoted string: `tone(NAME)` (the spelling: `$palette`'s value where set,
  Bootstrap's otherwise), `tint-color(COLOR, WEIGHT)`, `shade-color`, `shift-color`,
  `mix-color(COLOR, COLOR, WEIGHT)` (Sass reserves the global `mix`), `color-contrast(COLOR)`,
  `to-rgb(COLOR)` (`'13, 110, 253'`), `fade-color(COLOR, ALPHA)` (`'rgba(13, 110, 253, 0.25)'`),
  and `escape-color(COLOR)` (`'%230d6efd'`) for data URIs. `breakpoint(NAME)`,
  `breakpoint-max(NAME)`, `container-width(NAME)`, and `scale(NAME)` read `$scale`. Here `COLOR`
  is a name or hex string, `WEIGHT` a percentage, `ALPHA` a number, and `NAME` a map key.
- Colors move as integer channel lists: a private `-channels` parses a hex string and a private
  `-hex` writes lowercase `#rrggbb`. Each mix computes `floor((a·w + b·(100 − w)) / 100 + 0.5)`
  per channel. No Sass color value reaches the output, because the Sass run shows `color.mix`
  emitting percentages under Sass 1.105.1. A base reference returns its stored spelling, so `#fff`
  stays three digits.

`src/bootstrap/_tokens.scss`: declares `$palette: () !default;` and `$scale: () !default;`, passes
both through `@use 'mixins' with (...)`, and writes its 150 literals as calls:
`--bs-blue: #{mixins.tone(blue)};`, `--bs-primary-text-emphasis: #{mixins.shade-color(primary, 60%)};`,
`--bs-primary-rgb: #{mixins.to-rgb(primary)};`, `--bs-font-sans-serif: #{mixins.scale(font-sans-serif)};`.
Kept black, white, and alpha forms of them stay quoted literals.

The component partials already load `@use '../mixins' as *`, so each literal becomes an unprefixed
call inside the existing string interpolation. Examples:
`--bs-btn-hover-bg: #{shade-color(primary, 15%)};`,
`--bs-table-border-color: #{mix-color(color-contrast(tint-color(primary, 80%)), tint-color(primary, 80%), 20%)};`,
and in a data URI, `stroke='#{escape-color(tint-color(primary, 50%))}'`. The Sass run shows nested
interpolation in a quoted data URI emitting byte-identical text. Media conditions read
`@media (min-width: #{breakpoint(sm)})` and `(max-width: #{breakpoint-max(sm)})`, and container
rules read `max-width: container-width(sm)`. Color calls go into `_tokens.scss` (132 base-dependent
literals) and the 17 component partials that carry one (`inventory.json` source counts, classified
by the algebra run): `_buttons.scss` 146, `_tables.scss` 40, `_dropdown.scss` 8, `_form-check.scss`
7, `_form-range.scss` 6, `_validation.scss` 6, `_accordion.scss` 5, `_form-select.scss` 4,
`_pagination.scss` 3, `_form-control.scss`, `_list-group.scss`, and `_nav.scss` 2 each, and
`_close.scss`, `_floating-labels.scss`, `_navbar.scss`, `_progress.scss`, and `_type.scss` 1 each.
The `color-contrast` calls add `_color-bg.scss` (8). Breakpoint calls go into `_grid.scss`,
`_containers.scss`, `_card.scss`, `_dropdown.scss`, `_list-group.scss`, `_modal.scss`,
`_navbar.scss`, `_offcanvas.scss`, and `_position.scss`, the 25 `.98px` sites of `_modal.scss`,
`_offcanvas.scss`, and `_tables.scss`, and the map of `_utilities.scss` (`:1036-1040`). The 12
`min-width: 1200px` RFS sites stay literal: 5 in `_reset.scss`, 6 in `_type.scss`, and 1 in
`_utilities.scss`. A script under veneer's ignored `tmp/` generates the edit from the inventory's
origins and is never committed. Every block keeps its declarations and order.

`src/tailwindcss/_tokens.scss`: declares `$palette` with 19 rows, each a pair such as
`blue: (token: 'blue-600', value: '#155dfc')`, so the Node pin can check every value against its
token. It declares `$scale` with Tailwind's text for each key, such as `sm: '40rem'` and
`box-shadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'`. The existing
`@use '../bootstrap/tokens' with (...)` passes both. `tone` reads the pair's `value`.
`src/tailwindcss/index.scss`, `src/bootstrap/index.scss`, `configs/src/vite.tailwindcss.config.ts`,
and `package.json` do not change. Forwarding `$palette` to Sass consumers of `./tailwindcss/scss` is
refused in this round: it adds published surface that R11 does not ask for.

## 5. Proofs

The record: `tests/fixtures/tailwindcss/tokens.json` holds the 19 base rows, then one row per lifted
literal value that changes, as `{ value, origin, tuned }` (`origin` is the Sass expression, such as
`shade-color(primary, 15%)`), then the scale rows with their context (`media`, a property, or a
custom property), then the kept list. A Vitest writer under `tmp/units/` writes it from the two
compiles, and a durable copy lands under `tailwind-flip/writers/`. `tests/setupStyles.ts` gains the
TypeScript twin of the algebra (`tintColor`, `shadeColor`, `mixColor`, `contrastColor`, `toRGB`)
beside `restrictSelector`, proved in `tests/setupStyles.test.ts` against the 13 compiled hexes of
the self-check, with a reversed-weight control.

The cases follow by project. `src:tailwindcss` (Node, `tests/src/tailwindcss/index.test.ts`):

- `derives the tuned sequences by substituting tokens, withholding, moving, copying, restoring, and nothing else`.
  This renames the derivation case. Every lifted entry first passes through `tokens.json`, then
  through the existing steps. Controls: a planted `#0d6efe` declaration in a tuned copy reads
  unexplained, a record row removed leaves a changed value unexplained, and the unwithheld
  `.mt-3` control stays.
- `maps every lifted color literal through the token record or keeps it, in both directions`.
  Every occurrence, in all four spellings (hex, `%23`, triplet, and `rgba`), is a record row or on
  the kept list, and every record row occurs. Controls: a planted `#123456` in a lifted copy, a
  kept `#fff` mapped to `#fafafa`, and a record row with no occurrence.
- `evaluates every token record row as Bootstrap's algebra over both base sets`. Each `origin`
  evaluates to `value` on Bootstrap's bases and to `tuned` on the map's. Controls: a `tuned` off by
  one channel, and an origin of `shade-color(primary, 16%)`.
- `resolves every palette row from the installed Tailwind theme by the contrast rule`. Each row's
  `value` equals the oklch-to-sRGB clip of its `token` in `node_modules/tailwindcss/theme.css`. The
  step is the nearest same-family step whose `color-contrast` matches Bootstrap's base. Controls: a
  `blue-500` row fails the rule, and a hex edited by one digit fails the conversion.

`conformance` (Node, `tests/setup.test.ts`): `compiles every Bootstrap partial byte for byte under the default palette and scale`.
`dist/src/bootstrap/index.css` keeps SHA-256 `7932f7a5…`, and the drop-in compile is unchanged.
Control: a one-row `$palette` changes the digest. The existing round-trip case
`recreates the tuned built sheet from its Sass barrel after one round trip` stands.

`src:tailwindcss` (Chromium):

- `keeps every Bootstrap pairing that reads 4.5:1, or 3:1 for a control, at or over it under the tuned sheet alone`.
  The case reads computed foreground and background on rendered witnesses for the 121 pairings in
  both color modes, under `./bootstrap` alone and under the tuned sheet adopted alone, and lists
  the 9 sub-threshold pairings as Bootstrap's own. Control: a planted
  `.btn-outline-primary { --bs-btn-color: #2b7fff }` reads 3.76:1 and fails.
- `pins every curation witness against the tuned sheet alone and rejects each removed repair`.
  This is the witness case with its baseline swapped, and its controls stay.

`integration` (Chromium):

- `reads the tuned sheet alone equal to Bootstrap alone through the token map on every curated witness`.
  The case pins that Bootstrap for Tailwind differs from Bootstrap by the map. Every computed color
  longhand maps through `tokens.json`, and every other longhand is equal. Control: a planted rule
  with an unrecorded color fails.
- `agrees every Bootstrap infix with its Tailwind variant at each aligned breakpoint`. At 639 and
  640, 1023 and 1024, 1279 and 1280, and 1535 and 1536 pixels, `d-sm-none` and `sm:hidden` share a
  state, and so do the other three pairs, under the recipe. Control: the same pairs under
  `./bootstrap` beside the unexcluded compile disagree at 600px.

Journeys (`tests/app/browser/integration.test.ts`, `tests/setupBrowser.ts`): the partition case and
the paired engine states case compare a Bootstrap winner under `tailwindcss` against the same
element in a `tuned` reading state, which swaps the text of the Bootstrap face's `style` element
for the built tuned sheet, reads, and restores. Under `unexcluded` the baseline stays `bootstrap`.
Control: comparing `tailwindcss` against `bootstrap` fails on `.btn-primary`'s `background-color`.

`TAILWIND_READINGS`: the `.container` max-width row reads `1280px` under `tailwindcss`. Two rows
join: `.btn-primary` `background-color` reads `rgb(13, 110, 253)`, `rgb(13, 110, 253)`, and
`rgb(21, 93, 252)`, and body `font-family` reads Bootstrap's, Bootstrap's, and Tailwind's stack.
Both `recipe.json` files regenerate. `oracle.min.json`, `comparison.json`, `similar.json`,
`incompatible.json`, and `preflight.json` keep their rows, because none reads the tuned palette.

## 6. Units

Every unit commits with the trailers. The Orchestrator pushes after each acceptance.

0. **T0 token-probe** (Astra; writes veneer's `tmp/probes/tokens2/` only). P1 runs the generated
   edit on a copy: both default digests equal, and 456 calls (368 base, 88 contrast). P2 compiles
   the tuned sheet: 0 conflicts, and every changed position explained by an origin. P3 reads the
   121 pairings in Chromium. P4 is the clip check of risk 3. P5 reads every infix state at 390,
   768, and 1280 under both breakpoint sets. P6 times the focused partition with the `tuned` state.
   Acceptance: each probe exits 0 twice with byte-identical output; `git status --porcelain` empty.
1. **T1 token-switch** (Astra): `src/bootstrap/_mixins.scss`, `_tokens.scss`, and the component
   partials and `_utilities.scss` § 4 lists, with no output change. Acceptance:
   `build:src:bootstrap` with SHA-256 `7932f7a5…`; `build:src:tailwindcss` byte-identical to the
   pre-edit build; `format:check`, `lint:check`, and `check`; `test:src:bootstrap` and
   `test:src:tailwindcss` unchanged.
2. **T2 token-map** (Astra): `src/tailwindcss/_tokens.scss`; `tests/fixtures/tailwindcss/tokens.json`
   and its writer; `tests/setupStyles.ts` and `.test.ts`; `tests/src/tailwindcss/index.test.ts`
   (the four Node cases); `tests/setup.test.ts`. Acceptance: writer idempotent;
   `build:src:tailwindcss`; `test:setup`; the Node cases by `-t`; `check`.
3. **T3 token-browser** (Astra): the Chromium cases of `tests/src/tailwindcss/index.test.ts` and
   `tests/integration.test.ts`. Acceptance: `test:src:tailwindcss`; `test:integration` with no
   failure in the Tailwind describes.
4. **T4 token-journeys** (Astra): `tests/setupBrowser.ts` (the `tuned` state and
   `TAILWIND_READINGS`), the showcase describe blocks of `tests/setupBrowser.test.ts`,
   `tests/app/browser/integration.test.ts`, and both `recipe.json` files. Acceptance:
   `test:setup:browser`; `build`; `test:journey` green, with wall time at or under the recorded
   487 s; `test:app:browser` with the header contrast case green.
5. **T5 token-showcase** (Opus copy, then Astra apply): captions where a token reading differs, in
   the form "Bootstrap only: … Without the layer: … With the layer: …"; `app/browser/sections/*.html`
   and the section tests. Acceptance: `check`; `test:app:browser`.
6. **T6 token-guide** (Opus): `guides/veneer.md` § Tailwind compatibility sheet. The switch
   sentence names `$palette` and `$scale`. The paragraph that keeps Bootstrap's token values gives
   way to the token rule, the token table of § 2, and the consumer rows (`.btn-primary`
   background, `.container` at 1280px, breakpoints in rem). `ROADMAP.md` gains the token tenet.
   Acceptance: `test:guides`; `test:policy`; every backticked case title resolves.
7. **T7 gates** (verifier): the flip's U8 list, read bare, then the joint falsify round of TF3.

## 7. Defaults applied for the user

The following defaults apply until the user confirms or reverses each:

- The algebra policy, the same-name families, and `gray` for the grays.
- The base by the contrast rule (blue-600, indigo-600, purple-800, pink-600, red-600, orange-400,
  yellow-400, green-700, teal-400, and cyan-400), and the gray ramp in order (100 to 900 onto 50
  to 800).
- Dark mode by the algebra, with the dark body on gray-800 `#1e2939`.
- The threshold-crossing contrast rule, with the 9 sub-threshold pairings recorded as Bootstrap's.
- Breakpoints and containers aligned in rem, with the RFS cap at 1200px; font stacks and shadows
  mapped; radii, type, spacing, transitions, and z-indices kept; the focus ring by the algebra.
- Hex output with the probe's per-channel clip; `./bootstrap` byte-identical; the `Bootstrap only`
  face unchanged; no `$palette` forwarding to Sass consumers.
- The token units join the flip before TF3's falsify round.

## 8. Risks and the measurement that exposes each

1. **Byte drift in the default build.** A call that serializes differently from its literal
   (`#FFF`, a six-digit white, or a spaced triplet) changes `./bootstrap`. Exposed by P1's two
   digests and T1's acceptance.
2. **A `color-contrast` flip at a state the 121 pairings miss.** A disabled button or an
   outline-hover state might pick another foreground. Exposed by P2: every `color-contrast`
   call's result under the map equals its result under Bootstrap's bases (88 expected equal).
3. **The clip differs from Chromium's paint.** 7 of 10 hue bases are out of sRGB as oklch; if
   Chromium gamut-maps where the probe clips, `bg-red-600` and `.btn-danger` paint different reds
   on one page. Exposed by P4: a canvas read of `oklch(57.7% 0.245 27.325)` beside `#e7000b` on an
   sRGB profile, equal pixels required.
4. **Breakpoint drift outside the three widths.** Pages between 576 and 640, or 992 and 1024,
   change layout. Exposed by P5 and the infix agreement case; the guide states the move.
5. **The `-down` rem offset** might leave a gap or overlap with `40rem` at fractional zoom. Exposed
   by P5 at 639.98px and 640px under 125% and 150% device scale.
6. **Journey cost of the `tuned` state:** one more baseline read per signature (1665, verdict § 12).
   Exposed by P6 and T4's wall-time acceptance; the fallback reads the `tuned` state only for
   signatures with a Bootstrap winner under `tailwindcss`.
7. **Purple-800 and gray read darker or bluer than Bootstrap's.** Purple-800 sits at L 0.438
   against 0.502 and serves 1 occurrence (`--bs-purple`, `inventory.json`); gray-800 carries chroma
   0.033 against 0.0095. Exposed by the showcase swatches under the Tailwind faces.
8. **An engine reader of `--bs-breakpoint-*` expects px.** `src/core/constants.ts:291-297`
   declares the names and no `src/` reader parses them (grep, 2026-10-04). Exposed by
   `test:src:browser` in T7.
