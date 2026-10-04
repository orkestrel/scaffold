# Sheets unit: variants, manifest, and M5

Every Bootstrap variant builds, the order statement is the first CSSOM rule in each one, and the two Tailwind compiles under the flipped input drop exactly the 17 shared components. The one hazard: the CSSOM-serialized `minus-shared` files lose `.spinner-border`'s `border` shorthand (16 longhands). Use the `.text.css` alternates when you need an exact reading.

Environment: Chromium 141.0.7390.37 (`browser.version()`; the default launch looked for headless shell 1243 and found none, so the probes launch `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`), tailwindcss 4.3.3, dart-sass 1.105.1, Node 22.22.2. Repository 4929856, working tree clean before and after the run (`git status --porcelain` printed nothing).

Probes:
- P1 `/home/user/veneer/tmp/probes/flip/sheets/probe.ts`: builds every file, deletes rules through CSSOM, takes M5, and writes `manifest.json` and `measurements.json`.
- P2 `/home/user/veneer/tmp/probes/flip/sheets/probe-checks.ts`: checks that serialization round-trips, maps the top-level regions, and lists the in-layer duplicates. Writes `checks.json`.
- P3 `/home/user/veneer/tmp/probes/flip/sheets/probe-mismatch.ts`: finds the one rule the serialization changes. Writes `mismatch.json`.
- P4 `/home/user/veneer/tmp/probes/flip/sheets/probe-textdelete.ts`: builds the text-deletion alternates and checks them against the original parse. Writes `textdelete.json` and adds entries to `manifest.json`.

## Class sets

The class sets come from P1 and are stored in `measurements.json`, as the following table shows.

| Set | Size |
| --- | --- |
| components | 608 |
| composables | 8 |
| modifiers | 144 |
| utilities | 1265 |
| all unique `CLASS_NAMES.bootstrap` leaves | 2025 |
| `comparison.json .shared` | 209 |
| shared ∩ utilities | 192 (expected 192) |
| shared ∩ components | 17 (expected 17): caption-top, col-1..col-12, col-auto, collapse, container, table |
| shared outside both categories | 0 |
| `@source not inline` names (all minus 192 shared utilities) | 1833 (expected 1833) |
| shared utilities whose `CSS.escape` differs from the name | 0 |

## Manifest

The manifest is at `/home/user/veneer/tmp/probes/flip/sheets/manifest.json`; P1 wrote it and P4 added the `.text.css` entries. The following table lists each file. Counts are CSSOM top-level rules and CSSStyleRule totals before any reserialization.

| File | Bytes | sha256 | Top rules | Style rules | `!important` | Construction |
| --- | --- | --- | --- | --- | --- | --- |
| bootstrap-lifted.css | 332388 | 7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f | 1880 | 2614 | 1716 | copy of dist/src/bootstrap/index.css |
| bootstrap-without-reboot.css | 325790 | 0e1f846f92d8535c5d2126f0a9fd80a7e719616dc7e35ef6d127dfb298b5ae6c | 1875 | 2539 | 1714 | Sass entry without `@use 'reset'` |
| reboot-in-reset.css | 5862 | fcc7668d4621f16bf535ed9368627e9a3ed03dc2b591263018ad9dbc25163df1 | 1 | 75 | 2 | `@layer reset {` + reboot compile ($layered false) + `}` |
| bootstrap-reboot-reset.css | 331653 | 7414eee9cf4947183ee932dd0d19c85cfdaac056497f2870cd9cc3e1b7c022f2 | 1876 | 2614 | 1716 | without-reboot with reboot-in-reset inserted after line 2 (the order statement) |
| bootstrap-lifted-minus-shared.css | 286042 | f9b7081c683a17be1fb1724ac294b0a9ab74c9e3b8d13580ac931a231916cb86 | 1688 | 2415 | 1397 | CSSOM delete, then top-level cssText joined by `\n` |
| bootstrap-reboot-reset-minus-shared.css | 286000 | 9eecdf7524d2dd8fc51211f5148292fd4d2c7e7cb41926976dfa2facc495afcb | 1684 | 2415 | 1397 | same, over bootstrap-reboot-reset.css |
| bootstrap-lifted-minus-shared.text.css (alternate) | 322412 | 2777f05b21694afeb670289289a6a52ad08dc17c109264bddc62f3ea4294f433 | n/a | 2415 | 1498 | text deletion of `.NAME {` blocks, no reserialization |
| bootstrap-reboot-reset-minus-shared.text.css (alternate) | 321677 | ce9c1463c4a9e735f133d578ca64fec0fc4e2c234bffb4df5601f10262ae3709 | n/a | 2415 | 1498 | same, over bootstrap-reboot-reset.css |
| bootstrap-lifted-cssom.css (control) | 295588 | 3360d57727d63a488ef98ddc2cbcfde4b369ad718f72b2f52b41db0b83e4c7d7 | 1880 | 2614 | 1615 | CSSOM parse and serialize, zero deletions |
| bootstrap-reboot-reset-cssom.css (control) | 295546 | b0199e76f4fd0b333ad58fd3929351884da27043f5f2184821f50e8f73192785 | 1876 | 2614 | 1615 | same, over bootstrap-reboot-reset.css |
| tailwind-unexcluded.css | 19266 | 0e753765bbaa391eba3b4a7c2e7edba5bbea69862c823ae0fa91521286754b20 | n/a | 251 | 1 | recipe.json `.unexcluded`, verbatim |
| tailwind-flipped.css | 19736 | 845ee32e11b680ef6499402722a4fdb45d622e02f064b9321df8264a11786b39 | n/a | 244 (206 with a class) | 1 | order statement + `@import 'tailwindcss';` + `@source not inline` of 1833 names; 2039 app candidates |
| tailwind-flipped-theme.css | 19736 | 845ee32e11b680ef6499402722a4fdb45d622e02f064b9321df8264a11786b39 | n/a | 244 (206 with a class) | 1 | flipped input + `@theme { --color-primary: #0d6efd; }`; 2039 candidates |

The `!important` counts are textual counts. The CSSOM files are lower because Chromium folds longhands into shorthands when it serializes them.

`tailwind-flipped-theme.css` is byte-identical to `tailwind-flipped.css`. There are 2 reasons:
- The 3 extra candidates are already among the 2039 app candidates, so the candidate set does not change.
- `bg-primary` and `text-primary` are in the exclusion list, so no rule uses `--color-primary` and Tailwind emits no `--color-primary` variable in either file.

The input text of `tailwind-flipped.css` is saved at `/home/user/veneer/tmp/probes/flip/sheets/tailwind-flipped.input.css` (3 lines).

## Method checks

P1 ran the following method checks and stored them in `measurements.json`.

| Check | Result |
| --- | --- |
| The P1 reproduction of `compileRecipe(LAYER_STATEMENT + "@import 'tailwindcss';", tests recipe candidates)` equals `recipe.json .unexcluded` | true |
| `bootstrap-lifted.css` equals a fresh full `index.scss` compile | false. The only differing line is the last one, line 13903: lifted reads `}/*$vite$:1*/`, the compile reads `}` (P2, `checks.json`) |

## CSSOM deletion (item 5)

P1 deleted the rules and stored the results in `measurements.json .deletion`. P2 identified the in-layer rules and stored them in `checks.json .inLayerDuplicates`. The following table shows the counts for each file.

| File | Rules deleted | Names with 0 deletions | Names with >1 deletion | Inside @media | Inside a layer block |
| --- | --- | --- | --- | --- | --- |
| bootstrap-lifted-minus-shared.css | 199 | none | bg-black 2, bg-transparent 2, bg-white 2, border-black 2, border-white 2, text-black 2, text-white 2 | false | true: 7, all `@layer bootstrap` |
| bootstrap-reboot-reset-minus-shared.css | 199 | none | same 7 names, 2 each | false | true: 7, all `@layer bootstrap` |

The 7 in-layer deletions are the opacity-variable halves of those utilities. For example, `.bg-white { --bs-bg-opacity: 1; }` sits inside `@layer bootstrap`, and its `!important` color half (`background-color: rgba(var(--bs-white-rgb), var(--bs-bg-opacity)) !important`) sits unlayered. The other 192 deletions are top-level, unlayered rules.

### Serialization fidelity

P2 and P4 checked how well each file survives serialization; the results are in `checks.json`, `mismatch.json`, and `textdelete.json`, as the following table shows.

| File | Longhands parsed | Longhands after reparse of the serialization | Changed rules | Serialization idempotent |
| --- | --- | --- | --- | --- |
| bootstrap-lifted.css | 8088 | 8072 | 1 | false |
| bootstrap-without-reboot.css | 7799 | 7783 | 1 | false |
| bootstrap-reboot-reset.css | 8088 | 8072 | 1 | false |
| the `*-minus-shared.css` and `*-cssom.css` files | stable | stable | 0 | true |

The changed rule is `.spinner-border`. It parses with 23 longhands, and its `border` shorthand (var-valued, overridden by `border-right-color: transparent`) serializes as empty values, so the reparse keeps 7 longhands. Every CSSOM-serialized file (`*-minus-shared.css`, `*-cssom.css`) has therefore lost `.spinner-border`'s border. The `.text.css` alternates equal the original parse minus the deleted rules, row for row (2422 = 2422 leaf rows, `same: true`).

## Order statement and reboot regions

P1 and P2 recorded the order-statement positions, stored in `measurements.json .textOrder` and `checks.json`. The following table shows them for each file.

| File | Text line 1 | Order statement line(s) | CSSOM rule 0 | Order statement count |
| --- | --- | --- | --- | --- |
| bootstrap-lifted.css | `@charset "UTF-8";` | 2 | CSSLayerStatementRule (order) | 1 |
| bootstrap-without-reboot.css | `@charset "UTF-8";` | 2 | CSSLayerStatementRule (order) | 1 |
| bootstrap-reboot-reset.css | `@charset "UTF-8";` | 2 | CSSLayerStatementRule (order) | 1 |
| bootstrap-*-minus-shared.css | order statement (CSSOM drops @charset) | 1 | CSSLayerStatementRule | 1 |
| reboot-in-reset.css | `@layer reset {` | none | CSSLayerBlockRule reset | 0 |

The following table shows the reboot region in each file.

| File | Reboot region (top-level index) | Rules | First selector | Last selector |
| --- | --- | --- | --- | --- |
| bootstrap-lifted.css | 2–6: @layer bootstrap (54), unlayered `[list]…::-webkit-calendar-picker-indicator { display: none !important }`, @layer bootstrap (11), @layer bootstrap (8), unlayered `[hidden] { display: none !important }` | 75 | `*, ::before, ::after` | `[hidden]` |
| bootstrap-without-reboot.css | absent; index 1 is the :root tokens, index 2 is `.lead` | 0 | n/a | n/a |
| reboot compile (unwrapped) | 75 top-level rules, 75 style rules, 2 `!important`, no @charset | 75 | `*, ::before, ::after` | `[hidden]` |
| bootstrap-reboot-reset.css | 1: @layer reset (75), then index 2 is the :root tokens | 75 | `*, ::before, ::after` | `[hidden]` |

The top-level rule counts compare as follows:
- Lifted: 1880.
- Without-reboot plus the reboot compile: 1875 + 75 = 1950.
- Without-reboot plus the wrapped reboot: 1875 + 1 = 1876, which is the reboot-reset count.

Lifted is 1875 + 5 because its reboot splits into 3 layer blocks and 2 unlayered `!important` rules. The style rules agree: 2539 + 75 = 2614 in both lifted and reboot-reset.

## `@source`

P1 counted `@source` occurrences in every produced file (`measurements.json .sourceCheck`):
- Every produced file contains 0 occurrences.
- Both Tailwind compiles consume the `@source not inline` statement, so neither output carries `@source`.

## M5

P1 took the M5 readings over `tailwind-flipped.css` and `tailwind-flipped-theme.css` and stored them in `measurements.json .m5`. The first table shows which names each file emits; the control columns compile the same input without the `@source not inline` line.

| Name | tailwind-flipped.css | tailwind-flipped-theme.css | control: no exclusion | control: theme, no exclusion |
| --- | --- | --- | --- | --- |
| mt-3 | emitted | emitted | emitted | emitted |
| border-1 | emitted | emitted | emitted | emitted |
| rounded | emitted | emitted | emitted | emitted |
| shadow | emitted | emitted | emitted | emitted |
| px-8 | emitted | emitted | emitted | emitted |
| md:flex | emitted | emitted | emitted | emitted |
| mt-[1rem] | emitted | emitted | emitted | emitted |
| collapse | absent | absent | emitted | emitted |
| container | absent | absent | emitted | emitted |
| table | absent | absent | emitted | emitted |
| col-1 | absent | absent | emitted | emitted |
| caption-top | absent | absent | emitted | emitted |
| btn | absent | absent | absent | absent |
| bg-primary | absent | absent | absent | emitted |
| text-primary | absent | absent | absent | emitted |
| bg-sky-500 | emitted | emitted | emitted | emitted |

Every name in this table is an app candidate (`measurements.json .candidateMembership`).

Each file emits the following totals:
- `tailwind-flipped.css`: 244 style rules, 206 with a class, 206 distinct class tokens.
- control without exclusion: 261 style rules and 223 classes.

The exclusion removes exactly the 17 shared components: caption-top, col-1..col-12, col-auto, collapse, container, and table. In the theme control it also removes bg-primary, border-primary, and text-primary. The flipped compile adds no class that the control lacks.

The following table gives the rule text in `tailwind-flipped.css` (P1, `measurements.json .ruleTexts`). Every rule is an exact `.NAME` selector inside `@layer utilities`.

| Selector | Rule body |
| --- | --- |
| .collapse | absent |
| .mt-3 | `margin-top: calc(var(--spacing) * 3);` |
| .border-1 | `border-style: var(--tw-border-style); border-width: 1px;` |
| .rounded | `border-radius: 0.25rem;` |
| .shadow | `--tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)); box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);` |
| .w-25 | `width: calc(var(--spacing) * 25);` |
| .h-100 | `height: calc(var(--spacing) * 100);` |
| .top-50 | `top: calc(var(--spacing) * 50);` |
| .z-1 | `z-index: 1;` |
| .order-1 | `order: 1;` |
| .text-start | `text-align: start;` |
| .float-start | `float: inline-start;` |
