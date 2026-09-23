# Unit NAVBAR (`nb`) report

`opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-nb` (branch `unit/nb`, uncommitted over `a658879`). Effective brief: `tmp/units/nb-brief.md`, byte-identical to `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-nb-brief.md`. I committed, pushed, and installed nothing.

**Report file (D8).** I did not write `tmp/units/nb-report.md`. The harness refuses report files written by a subagent, so this handback is the report. Write it to that path when you retain it. The patches, logs, and instruments it cites are real files under `/home/user/veneer-nb/tmp/units/`.

## Outcome

The `navbar` key is written, proved, registered, and documented.

- **Owned files:** in the worktree.
- **Shared files:** every change is in `/home/user/scaffold/.orkestrel/veneer/units/nb-shared.patch`, a unified diff against `a658879`. `git apply --check tmp/units/nb-shared.patch` passes in the worktree. That file holds the exact bytes, and § Shared-file patches summarizes its hunks.
- **Outside the owned and shared rows:** two changes are returned as patches for your ruling. The declaration-block repair is `/home/user/scaffold/.orkestrel/veneer/units/nb-offlimits.patch` (D2). The `$assets` retirement is the serial patch `/home/user/scaffold/.orkestrel/veneer/units/nb-retirement.patch` (D6).

Every acceptance criterion reads green in the validation stage, with one exception. The stage is the worktree with the shared and off-limits patches applied: `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb/stage`. The exception is criterion 5's styles-config command as written, which matches no test file (D4).

In the worktree itself, `npm run format:check` and `npm run lint:check` exit 0. `npm run check` exits 2, because the owned files import symbols that only the shared patch adds (D1).

**Needs your ruling before landing:**
- **D2:** the `.navbar-nav` block repeats the `.nav` block past the duplication gate's floor. The repair touches `_mixins.scss` and `_nav.scss`, which are off-limits to this unit.
- **D3:** R16 and family ruling 9 say the `navbar-expand-xl` expanded state has no frame. The tree expands it at the 1280 variant.
- **D5:** the brief's `Navbar dark` and `Navbar dark class` rows fail the registry grammar. They ship as `Navbar inverted` and `Navbar inverted class`.
- **D6 and D7:** ACCORDION has not landed. So the `$assets` retirement is a serial patch, and the journey census reads `collapsed` as undeclared until ACCORDION's `.accordion-button:not(.collapsed)` rule ships. Land ACCORDION before NAVBAR, then apply the retirement patch.

## Deviations

**D1: the criteria read only with the shared patch applied.**
- Expected: criteria 2 to 5 green in the worktree, with the shared files untouched.
- Found: the owned files need exports that only the shared patch adds.
  - `NavbarSection.ts` needs `NAVBAR_COPY` and `NAVBAR_SPECIMENS` from `app/browser/constants.ts`.
  - The proofs need the `NAVBAR_*` tables from `tests/setupStyles.ts`.
  - The cascade carries the partial only after the `src/styles/index.scss` line exists.
- Evidence: `npm run check` in the worktree exits 2. Every error is a missing shared export or follows from one, for example `app/browser/sections/NavbarSection.ts(1,10): error TS2724: '"../constants.js"' has no exported member named 'NAVBAR_COPY'`.
- Done: every gate ran in the stage, and I edited none of the worktree's shared files. NAV and COLLAPSE reported the same D1.

**D2: the navbar list block crosses the duplication floor.**
- Expected: `_navbar.scss` writes the `.navbar-nav` rule inline, as a coincidence of recorded values.
- Found: written inline, the rule repeats these declarations from the `.nav` rule: `--bs-nav-link-padding-y: var(--vn-space-4)`, `--bs-nav-link-font-weight: #{''}`, `display: flex`, `padding-left: 0`, `margin-bottom: 0`, `list-style: none`. `findDuplication` in `tests/setupServer.ts` refuses an overlap that wide.
- Evidence, from `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts -t "repeats no partial"` in the stage:
  - rule inlined: `Tests 1 failed | 112 skipped (113)`;
  - rule through the mixin: `Tests 1 passed | 112 skipped (113)`.
- Done: the repair the gate's own doc comment names is a `nav-list` mixin in `src/styles/_mixins.scss`. `.nav` in `_nav.scss` and `.navbar-nav` in `_navbar.scss` both include it. The owned partial already includes it, and the off-limits files' changes are § Off-limits patches. The emitted `.nav` values are unchanged: the nav proof and the ledger stay green in the stage.
- Not done: `_mixins.scss` and `_nav.scss` are untouched in the worktree.
- Hypothesis: both lists share the tokenized block inset and the empty weight slot, so they are one decision and the mixin is the rule's own repair.

**D3: R16's limit disagrees with the tree for `navbar-expand-xl`.**
- Expected (R16, family ruling 9): the `navbar-expand-xl` and `-xxl` expanded states have no frame under the 390 and 1280 variants.
- Found: the xl boundary is 1200 px, so the xl bar expands at 1280.
- Evidence: the proof case `expands the sm through xl bars at the wide journey width and none at the narrow one, which leaves the xxl bar collapsed at both` reads `['sm', 'md', 'lg', 'xl']` expanded at 1280 and none at 390. It is green in the `styles-owned` run, and it reddens under the neighbouring-boundary mutation.
- Done: the `### Navbar classes` limit sentence names only the xxl bar: "The journey renders at 390 and 1280 pixels wide, so the `.navbar-expand-xxl` bar has no expanded frame: its boundary is wider than either width, and the proof reads its expanded state at the boundary instead."
- Not done: the text of R16 and ruling 9. If they stand, only that sentence changes.

**D4: criterion 5's styles-config command matches no file.**
- Expected: `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/setupStyles.test.ts` exits 0.
- Found: that config includes only `tests/src/styles/**/*.test.ts`, so the command exits 1 with `No test files found ... include: tests/src/styles/**/*.test.ts`.
- Done: I ran the file in its own project with `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts`. It exits 0 with `Tests 113 passed (113)` in the stage, and with `Tests 112 passed (112)` in the retirement copy, where the undeclared-key case is retired.

**D5: the dark resting rows are renamed.**
- Expected: rows `Navbar dark` and `Navbar dark class`.
- Found: the `tests/setup.test.ts` case `carries no mode token in a scenario, because the variant names the mode` refuses them with `expected [ 'navbar-dark', 'navbar-dark-class' ] to strictly equal []`.
- Done: the specimens, subjects, and scenarios are `Navbar inverted` (`navbar-inverted`, the bar's own dark attribute) and `Navbar inverted class` (`navbar-inverted-class`, the `.navbar-dark` class). This follows the `Dropdown menu inverted` and `Close inverted` rows.

**D6: the `$assets` retirement waits for ACCORDION.** The brief's unknown covered this case.
- Found at `a658879`: after this unit's row leaves, `$assets` still holds `accordion-icon` and `accordion-active-icon`.
- Done now, in the shared and owned files:
  - The shared `_tokens.scss` patch deletes the `toggler-icon` row and adds the light icon to `$icons`.
  - `COMPONENT_DARK_ASSETS` gains `--bs-navbar-toggler-icon-bg`.
  - The owned theme proof reads the interim state: the accordion icons are still in the dark scope, and the navbar icon is gone from it.
- Done as a serial patch: `/home/user/scaffold/.orkestrel/veneer/units/nb-retirement.patch` retires the rest.
  - It removes the map and its comment, the `_theme.scss` walk with its `@error` and its now-unread `sass:map` load, and the undeclared-key case.
  - It replaces the theme proof's asset case with the final one.
  - It is written against the state after ACCORDION's `$assets` rows leave. `patch -p1 --dry-run` applies it cleanly to that simulated state.
  - I validated it in a copy that simulates the removal: `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nb/retire`.
  - ACCORDION's `$icons` rows may move the context of the `_tokens.scss` hunk, so apply it with three-way resolution.
- Not done here: `_theme.scss` and the undeclared-key case are owned but unedited. Retiring them before ACCORDION lands would drop the accordion icons from the dark scope.
- Pairing: the guide paragraph "Bootstrap also retunes `--bs-accordion-btn-icon` … Veneer declares each in its dark scope" becomes false when the retirement applies. ACCORDION's retained-variables paragraph patch must land with it.

**D7: the journey census waits on ACCORDION.**
- Found: `journey:light-390` and `journey:dark-1280` each gave `Tests 1 failed | 40 passed (41)`. The failure is `matrix > reads the mounted class and style populations with their published controls`, with `expected [ 'collapsed' ] to deeply equal []`.
- Cause: the collapsed toggler carries the `collapsed` class R1 names, and no shipped rule selects that class.
- Evidence: a stage-only probe partial that wrote `.accordion-button:not(.collapsed)` turned the case green (`Tests 1 passed | 40 skipped (41)`). I deleted the probe and restored `index.scss` byte for byte.
- The new navbar journey case and the resting cascade case with the navbar rows passed on both variants.
- Hypothesis: land ACCORDION first, as NAV's D3 did with DROPDOWN.

**D8: no report file.** The harness refused writing `tmp/units/nb-report.md`, as the head of this report states. This handback is the report text.

**Recorded choices**, as the deviation contract allows:
- The specimens' copy, an `aria-label` on each bar, and a `container-fluid` inside each bar. That is the release's markup, and its combinator ships from the container partial.
- The inverted specimens sit on a `.card` carrying `data-bs-theme="dark"`. The bar paints no surface of its own, and the showcase ships no background utility.
- Row and section positions:
  - `### Navbar classes` sits between `### Nav classes` and `### Card classes`.
  - `#### navbar` sits between `#### nav` and `#### card`.
  - The compatibility rows follow the `nav` rows, and the Files row follows the `_nav.scss` row.
  - The addition row follows the nav addition, and the § Tests link sits in alphabetical position.
  - The registry rows sit at the end of each table.
  - The section follows `NavSection` in `Showcase.ts` and in the barrel.
- The expand rules are emitted through `breakpoint-each`, so the no-infix rules precede the media blocks instead of following them as in the release. The classes are disjoint and their declarations identical, so no element resolves differently, and no gate reads that order.
- The `.navbar-text` block inset reads `var(--vn-space-4)`, which adds two `tokenized` rows, so the text keeps the list's density-scaled inset.
- The ROADMAP patch updates the "Container and navigation combinators" carrier row (R2) and adds a carrier row for the navbar offcanvas panel specimen (R10).
- I shortened the dropdown compatibility row's "less the split-toggle and navigation names" to "less the split-toggle names", so the table keeps its column width and the patch stays one hunk.

## Touched files

Owned, in the worktree:

| File | Summary |
| --- | --- |
| `src/styles/components/_navbar.scss` (new, 235 lines) | The partial: the bar and its slots, brand, the list retuning the nav link slots through `nav-list`, text, collapsible content, the toggler with the `transition` and `forced-ring` mixins, the icon, the scrolling list, the expand ramp through `breakpoint-each` with the offcanvas rules, the dark class and attribute, and the dark icon rule reading `tokens.$dark`. |
| `tests/src/styles/components/navbar.test.ts` (new, 621 lines) | The mirrored browser proof: layer presence, lengths, light colors, list links against a loose nav link, hover, each ramp step, the no-infix bar, the journey widths, opened content, the offcanvas panel, the scroll clamp, both dark spellings, the dark icon's scope, the toggler ring, forced colors, motion, density, and modes. |
| `app/browser/sections/NavbarSection.ts` (new, 20 lines) | The `Navbar` region, a `SpecimenSection` subclass. |
| `tests/app/browser/sections/NavbarSection.test.ts` (new, 151 lines) | The section proof: specimen order and markup, every rendered selector, no inline style, unique names, toggler and menu state agreement, dark surfaces, frozen constants, and destruction. |
| `tests/src/styles/theme.test.ts` (+7 −3) | The asset case reads the interim state. |

Owned but unchanged:
- `tests/src/styles/components/container.test.ts`: its reading did not change.
- `src/styles/_theme.scss` and the undeclared-key case: see D6.

`git -C /home/user/veneer-nb diff --stat a658879` prints `tests/src/styles/theme.test.ts | 10 +++++++---`. `git status --porcelain` lists that file and the new files. `tmp/units/` holds the patches, logs, and instruments, and no `tmp/probe/` remains.

Shared, patch only (`/home/user/scaffold/.orkestrel/veneer/units/nb-shared.patch`): `src/styles/index.scss`, `src/styles/_tokens.scss`, `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/setup.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `guides/veneer.md`, and `ROADMAP.md`. `tests/setup.test.ts` needs no change.

Off-limits, patch only (`/home/user/scaffold/.orkestrel/veneer/units/nb-offlimits.patch`, D2): `src/styles/_mixins.scss`, `src/styles/components/_nav.scss`.

## Unknowns, answered

- **The Layout hosts.** `container.test.ts` ran first and stays green.
  - The Layout specimens' `<div class="navbar">` hosts now take the navbar rule: `position: relative`, a wrapping flex row centred on the cross axis with `space-between`, and the `8px 0` inset from `--bs-navbar-padding-y`.
  - `LayoutSection.test.ts` stays green (`npm run test:app` exit 0).
  - Observation for the capture run: the Layout frames grow by that block inset.
- **ACCORDION's `$assets` patch.** It has not integrated at `a658879`. The map holds `accordion-icon` and `accordion-active-icon` (D6).

## Baseline at `a658879` (worktree, before any change)

- `npm run test:conformance`: exit 0, `Tests 22 passed (22)`, logged in `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-baseline-conformance.log.txt`.
- The scoped styles run over the sibling proofs (`nav`, `dropdown`, `collapse`, `container`, `theme`) exits 0 with `Tests 121 passed (121)`, logged in `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-baseline-styles.log.txt`.

## Gate exits

**Stage.** Script `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-gates.sh`, log `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-gates.log.txt`, final run after the last edit:

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format. |
| `npm run lint:check` | 0 | no findings |
| `npm run check` | 0 | every project |
| `npm run build:src` | 0 | built; `navbar-light` absent from `dist/src/styles/index.css`; each `@media (width>=Npx){.navbar-expand-*` block present |
| `npm run test:setup` | 0 | `Tests 254 passed (254)` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/navbar.test.ts tests/src/styles/theme.test.ts tests/src/styles/components/container.test.ts` | 0 | `Tests 71 passed (71)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/NavbarSection.test.ts` | 0 | `Tests 2 passed (2)` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/setupStyles.test.ts` | 1 | no test files found (D4) |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | 0 | `Tests 113 passed (113)` |
| `npm run test:app` | 0 | `Tests 78 passed (78)` |
| `npm run test:conformance` | 0 | `Tests 22 passed (22)`: listed literal, ledger, additions, deferral, priority, and order gates |
| `npm run test:guides` | 0 | `Tests 19 passed (19)` |
| `npm run test:policy` | 0 | `Tests 109 passed \| 1 skipped (110)` |
| `npm run test:src:styles` (observation) | 0 | `Tests 896 passed (896)` |

One earlier `npm run test:setup` run in the stage timed out once in `tests/setupServer.test.ts > records and reads official control state` (`Test timed out in 10100ms`). It passed on every later run, the final one included. The deciding re-run is yours.

**Retirement copy.** The copy is the stage with ACCORDION's `$assets` and `COMPONENT_DARK_ASSETS` rows simulated, then `nb-retirement.patch` applied. Script `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-retire-gates.sh`, log `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-retire-gates.log.txt`:
- scoped `oxfmt --check` on the retired files: exit 0;
- `npm run lint:check`: exit 0;
- `npm run check`: exit 0;
- `npm run build:src`: exit 0;
- the setup-project `tests/setupStyles.test.ts` run: exit 0, `Tests 112 passed (112)`;
- styles run over `navbar.test.ts`, `theme.test.ts`, `tokens.test.ts`, and `container.test.ts`: exit 0, `Tests 102 passed (102)`;
- `npm run test:conformance`: exit 0, `Tests 22 passed (22)`.

**Worktree, owned files only.**
- `npm run format:check`: exit 0.
- `npm run lint:check`: exit 0.
- `npm run check`: exit 2 (D1).

**Journey observations, stage, without `CAPTURE=1`.** The `journey:light-390` and `journey:dark-1280` projects of `configs/app/vite.journey.config.ts` each gave `Tests 1 failed | 40 passed (41)`. The census case is the only failure (D7).

## Failing-first evidence

This is a feature unit, so each case's failing reading is its distinguishing mutation. The script applied each mutation to the stage, rebuilt, ran, and restored the file byte for byte.
- Instruments: `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-mutate.py`, `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-mutate2.py`, `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-mutate3.py`.
- Logs: `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-mutations.log.txt`, `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-mutations-2.log.txt`, `/home/user/scaffold/.orkestrel/veneer/units/nb-instruments/nb-mutations-3.log.txt`.
- Command: `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/navbar.test.ts -t "<filter>"`, unless the row names another.
- Controls after each batch: navbar plus theme `Tests 46 passed (46)`, section `Tests 2 passed (2)`.

| Mutation | Filter | Reading |
| --- | --- | --- |
| each expand class gated at its neighbouring boundary | `expands the` | exit 1, `6 failed \| 1 passed \| 33 skipped (40)` |
| the no-infix class gated at sm (treated as a breakpoint variant) | `carrying no infix` | exit 1, `1 failed \| 39 skipped (40)` |
| `.navbar-dark` dropped from the dark list | `retunes every color` | exit 1, `1 failed \| 1 passed \| 38 skipped (40)` |
| the toggler asset left at theme scope (the `$assets` row restored) | `dark icon\|dark icons`, with the theme proof | exit 1, `2 failed` |
| the `75vh` fallback missing | `clamps the scrolling list` | exit 1, `1 failed \| 39 skipped (40)` |
| the `--bs-nav-link-*` reassignment dropped | `paints every link inside the list` | exit 1, `1 failed \| 39 skipped (40)` |
| the current and open link rule dropped | `paints every link inside the list` | exit 1, `1 failed \| 39 skipped (40)` |
| the expanded `.offcanvas` rule dropped | `offcanvas panel` | exit 1, `1 failed \| 39 skipped (40)` |
| the expanded `.offcanvas-header` rule dropped | `offcanvas panel` | exit 1, `1 failed \| 39 skipped (40)` |
| the toggler ring dropped | `rings the focused toggler` | exit 1, `1 failed \| 39 skipped (40)` |
| the toggler `forced-ring` omitted | `under forced colors` | exit 1, `1 failed \| 39 skipped (40)` |
| the toggler transition written bare | `collapses the toggler transition` | exit 1, `1 failed \| 39 skipped (40)` |
| the collapsed list's menu rule dropped | `opens a menu in the column flow\|expands the .sm. bar` | exit 1, `2 failed \| 38 skipped (40)` |
| the `.navbar-collapse` rule dropped | `opens a menu in the column flow\|expands the .md. bar` | exit 1, `2 failed \| 38 skipped (40)` |
| a `.navbar-light` rule written | `writes no rule for the light class` | exit 1, `1 failed \| 39 skipped (40)` |
| the brand hover and focus rule dropped | `hover slots` | exit 1, `1 failed \| 39 skipped (40)` |
| the `.navbar-text a` rule dropped | `paints every link inside the list\|hover slots` | exit 1, `2 failed \| 38 skipped (40)` |
| the text inset written as a literal | `density factor` | exit 1, `1 failed \| 39 skipped (40)` |
| the dark icon rule dropped | `dark icon` | exit 1, `1 failed \| 39 skipped (40)` |
| `--bs-navbar-padding-y` removed from `.navbar` | `navbar-padding-y. and moves` | exit 1, `1 failed \| 39 skipped (40)` |
| the `!important` flag dropped from the expanded content's `display` | `npm run test:conformance -- -t "carries the priority"` | exit 1, `1 failed \| 21 skipped (22)` |
| the collapsed specimen's toggler drops `collapsed` | section proof | exit 1, `1 failed` |
| the opened specimen's content drops `show` | section proof | exit 1, `1 failed` |
| the inverted-class specimen drops `navbar-dark` | section proof | exit 1, `1 failed` |

The theme proof's rewrite also ran red first. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/theme.test.ts` gave:
- the `a658879` case against the stage cascade: `Tests 1 failed | 5 passed (6)`;
- the rewritten case: `Tests 6 passed (6)`.

The retirement's final asset case reddened when the retirement copy's dark scope declared an accordion icon (`Tests 1 failed | 5 passed (6)`). It was green without that declaration (`Tests 6 passed (6)`).

## Proof matrix

Cases are in `navbar.test.ts` unless marked. "Layer" is the case `lays the bar out as a wrapping row, writes no rule for the light class, and every shipped selector reaches the components layer`. It holds `NAVBAR_SELECTORS` against the built components layer.

| Selector and condition | Proof case | Distinguishing mutation | Specimen | Capture scenario |
| --- | --- | --- | --- | --- |
| `.navbar` | Layer; length and color rows; `density factor` | `--bs-navbar-padding-y` removed | every specimen | `navbar-collapsed` |
| `.navbar > .container`, `-fluid`, `-sm` to `-xxl` (container key and partial, R2) | `container.test.ts` | unchanged partial, not re-run | every bar's `container-fluid` | every navbar frame |
| `.navbar-brand`, `:hover`, `:focus` | length rows; color row; `hover slots` | brand hover rule dropped | every specimen | `navbar-expanded`, `navbar-collapsed` |
| `.navbar-nav` | `paints every link inside the list`; length rows | reassignment dropped | every specimen | every frame |
| `.navbar-nav .nav-link.active`, `.navbar-nav .nav-link.show` | `paints every link inside the list` | current and open link rule dropped | `Navbar opened` has both; the other specimens have the active link | `navbar-opened` |
| `.navbar-nav .dropdown-menu` | ramp cases below the boundary; `opens a menu in the column flow` | menu rule dropped | `Navbar opened` | `navbar-opened` |
| `.navbar-text`, `a`, `a:hover`, `a:focus` | `paints every link inside the list`; `hover slots`; `density factor` | text link rule dropped; inset written as a literal | `Navbar opened`, both inverted specimens | `navbar-opened` |
| `.navbar-collapse` | ramp cases; `opens a menu in the column flow` | collapse rule dropped | every specimen | `navbar-opened` |
| `.navbar-toggler`, and `@media (prefers-reduced-motion: reduce) .navbar-toggler` | length rows; color row; `collapses the toggler transition` | transition written bare | every specimen | `navbar-collapsed` |
| `.navbar-toggler:hover` | Layer only: a button paints no underline, so no resolved reading separates this rule | none | every specimen | none |
| `.navbar-toggler:focus` | `rings the focused toggler` | ring dropped | `Navbar collapsed` | `navbar-collapsed-focus` (driven) |
| `@media (forced-colors: active) .navbar-toggler:focus { outline }` (addition) | `under forced colors` | `forced-ring` omitted | `Navbar collapsed` | none: the journey stages no forced colors |
| `.navbar-toggler-icon` | Layer; `dark icon` | dark icon rule dropped | every specimen | `navbar-collapsed` |
| `.navbar-nav-scroll` | `clamps the scrolling list`; ramp cases (`overflow-y`) | fallback missing | `Navbar scroll`, the expanded bar, the breakpoint bars | `navbar-scroll` |
| `@media (width >= 576px)` through `(width >= 1400px)`: each `.navbar-expand-{sm..xxl}` rule and its list, menu, link, scroll, collapse, and toggler rules | `expands the $name bar at its boundary and collapses it one pixel below` (boundary −1, boundary, +1); `expands the sm through xl bars at the wide journey width …` | neighbouring boundary | `Navbar expand sm` to `xxl` | `navbar-expand-sm` to `navbar-expand-xxl` (the xxl bar is collapsed at both widths, D3) |
| `.navbar-expand` and its rules, no condition | `carrying no infix` (375 and 1401) | gated at sm | `Navbar expanded` | `navbar-expanded`, `navbar-expanded-hover` (driven) |
| `.navbar-expand{,-sm..-xxl} .offcanvas`, `.offcanvas .offcanvas-header`, `.offcanvas .offcanvas-body` | `offcanvas panel`: the lg step at 991 and 992, and the no-infix bar, with each `!important` read against an inline hidden state | panel rule dropped; header rule dropped | none (R10, family ruling 9) | none |
| `.navbar-dark` | `retunes every color` (the class row); modes case | `.navbar-dark` dropped | `Navbar inverted class` | `navbar-inverted-class` |
| `.navbar[data-bs-theme=dark]` | `retunes every color` (the attribute row, which stays green when `.navbar-dark` is dropped) | same table | `Navbar inverted` | `navbar-inverted` |
| `[data-bs-theme=dark] .navbar-toggler-icon` (theme key) | `dark icon`; the theme proof's asset case | asset left at theme scope; rule dropped | both inverted specimens; every icon in the dark variants | `navbar-inverted`, the dark-variant frames |
| `.navbar-light` (emits nothing) | Layer | light rule written | none | none |

Not every ramp step's offcanvas rules have their own reading: only the lg step and the no-infix bar do. The other steps come from the same loop body.

## Ledger rows

`#### navbar` under `### Departures`. The comparison categorized every row `tokenized`:

| Component | Selector | Property | Condition | Bootstrap 5.3.8 | Veneer | Departure |
| --- | --- | --- | --- | --- | --- | --- |
| `navbar` | `.navbar` | `--bs-navbar-padding-y` | — | `0.5rem` | `var(--vn-space-4)` | tokenized |
| `navbar` | `.navbar` | `--bs-navbar-brand-margin-end` | — | `1rem` | `var(--vn-space-8)` | tokenized |
| `navbar` | `.navbar` | `--bs-navbar-brand-font-size` | — | `1.25rem` | `var(--vn-size-5)` | tokenized |
| `navbar` | `.navbar` | `--bs-navbar-nav-link-padding-x` | — | `0.5rem` | `var(--vn-space-4)` | tokenized |
| `navbar` | `.navbar` | `--bs-navbar-toggler-padding-y` | — | `0.25rem` | `var(--vn-space-2)` | tokenized |
| `navbar` | `.navbar` | `--bs-navbar-toggler-padding-x` | — | `0.75rem` | `var(--vn-space-6)` | tokenized |
| `navbar` | `.navbar` | `--bs-navbar-toggler-font-size` | — | `1.25rem` | `var(--vn-size-5)` | tokenized |
| `navbar` | `.navbar-nav` | `--bs-nav-link-padding-y` | — | `0.5rem` | `var(--vn-space-4)` | tokenized |
| `navbar` | `.navbar-text` | `padding-top` | — | `0.5rem` | `var(--vn-space-4)` | tokenized |
| `navbar` | `.navbar-text` | `padding-bottom` | — | `0.5rem` | `var(--vn-space-4)` | tokenized |
| `navbar` | `.navbar-dark` | `--bs-navbar-color` | — | `rgba(255, 255, 255, 0.55)` | `color-mix(in srgb, var(--vn-palette-white-base) 55%, transparent)` | tokenized |
| `navbar` | `.navbar-dark` | `--bs-navbar-hover-color` | — | `rgba(255, 255, 255, 0.75)` | `color-mix(in srgb, var(--vn-palette-white-base) 75%, transparent)` | tokenized |
| `navbar` | `.navbar-dark` | `--bs-navbar-disabled-color` | — | `rgba(255, 255, 255, 0.25)` | `color-mix(in srgb, var(--vn-palette-white-base) 25%, transparent)` | tokenized |
| `navbar` | `.navbar-dark` | `--bs-navbar-active-color` | — | `#fff` | `var(--vn-palette-white-base)` | tokenized |
| `navbar` | `.navbar-dark` | `--bs-navbar-brand-color` | — | `#fff` | `var(--vn-palette-white-base)` | tokenized |
| `navbar` | `.navbar-dark` | `--bs-navbar-brand-hover-color` | — | `#fff` | `var(--vn-palette-white-base)` | tokenized |
| `navbar` | `.navbar-dark` | `--bs-navbar-toggler-border-color` | — | `rgba(255, 255, 255, 0.1)` | `color-mix( in srgb, var(--vn-palette-white-base) 10%, transparent )` | tokenized |
| `navbar` | `.navbar[data-bs-theme=dark]` | `--bs-navbar-color` | — | `rgba(255, 255, 255, 0.55)` | `color-mix(in srgb, var(--vn-palette-white-base) 55%, transparent)` | tokenized |
| `navbar` | `.navbar[data-bs-theme=dark]` | `--bs-navbar-hover-color` | — | `rgba(255, 255, 255, 0.75)` | `color-mix(in srgb, var(--vn-palette-white-base) 75%, transparent)` | tokenized |
| `navbar` | `.navbar[data-bs-theme=dark]` | `--bs-navbar-disabled-color` | — | `rgba(255, 255, 255, 0.25)` | `color-mix(in srgb, var(--vn-palette-white-base) 25%, transparent)` | tokenized |
| `navbar` | `.navbar[data-bs-theme=dark]` | `--bs-navbar-active-color` | — | `#fff` | `var(--vn-palette-white-base)` | tokenized |
| `navbar` | `.navbar[data-bs-theme=dark]` | `--bs-navbar-brand-color` | — | `#fff` | `var(--vn-palette-white-base)` | tokenized |
| `navbar` | `.navbar[data-bs-theme=dark]` | `--bs-navbar-brand-hover-color` | — | `#fff` | `var(--vn-palette-white-base)` | tokenized |
| `navbar` | `.navbar[data-bs-theme=dark]` | `--bs-navbar-toggler-border-color` | — | `rgba(255, 255, 255, 0.1)` | `color-mix( in srgb, var(--vn-palette-white-base) 10%, transparent )` | tokenized |

- The toggler border mix keeps the formatter's wrapped spacing in its Veneer cell, as the `btn` rows do.
- Every dark row's Condition cell is `—`, because the attribute is part of the selector (R3).
- `[data-bs-theme=dark] .navbar-toggler-icon` is recorded under the theme key, which the ledger does not attribute to a shipped component, so it takes no row.

`### Additions` gains one row, category `declaration`:

``| `navbar` | `.navbar-toggler:focus { outline }` | `@media (forced-colors: active)` | declaration | Under forced colors the ring is drawn as a system-color outline, because the shadow it is drawn with elsewhere is not painted there. |``

The patch deletes every `Navbar` deferral row, so none is left:
- `.navbar-nav .dropdown-menu`;
- `.navbar-expand-sm .navbar-nav .dropdown-menu` through `-xxl`, and `.navbar-expand .navbar-nav .dropdown-menu`;
- `.navbar-nav .nav-link.active` and `.navbar-nav .nav-link.show`;
- `.navbar-expand-sm .navbar-nav .nav-link` through `-xxl`, and `.navbar-expand .navbar-nav .nav-link`.

## Registry rows

Resting rows appended to `CASCADE_KEYS`, each with its subject added to `CaptureSubject`:

| Scenario | Subject | Selector | Property |
| --- | --- | --- | --- |
| `navbar-expanded` | `Navbar expanded` | `.navbar-expand` | `flex-wrap` |
| `navbar-collapsed` | `Navbar collapsed` | `.navbar` | `flex-wrap` |
| `navbar-opened` | `Navbar opened` | `.navbar-collapse.show` | `flex-basis` |
| `navbar-scroll` | `Navbar scroll` | `.navbar-nav-scroll` | `overflow-y` |
| `navbar-inverted` | `Navbar inverted` | `.navbar[data-bs-theme="dark"] .navbar-brand` | `color` |
| `navbar-inverted-class` | `Navbar inverted class` | `.navbar-dark .navbar-brand` | `color` |
| `navbar-expand-sm` to `navbar-expand-xxl` | `Navbar expand sm` to `Navbar expand xxl` | the expand class | `flex-wrap` |

Driven rows appended to `DRIVEN_KEYS`: `navbar-collapsed-focus` (`Navbar collapsed`) and `navbar-expanded-hover` (`Navbar expanded`). The journey case `drives an expanded bar link to hover and rings a collapsed bar toggler under focus, and photographs each state` places both. It passed on light-390 and dark-1280.

## Shared-file patches

The exact bytes are `/home/user/scaffold/.orkestrel/veneer/units/nb-shared.patch`, a unified diff against `a658879`. `git apply --check` passes in the worktree. Its hunks, per file:

- **`src/styles/index.scss`:** `@use 'components/navbar';` after `@use 'components/nav';` (ruling 8).
- **`src/styles/_tokens.scss`:**
  - The `$icons` comment names the toggler icon.
  - `$icons` gains a `'toggler-icon'` entry (`// $navbar-light-toggler-icon-bg`) holding the release's light URI, with stroke `rgba%2833, 37, 41, 0.75%29`.
  - The `$assets` comment names the navbar partial.
  - The `'toggler-icon': '--bs-navbar-toggler-icon-bg',` row is deleted.
- **`app/browser/constants.ts`:** `NAVBAR_COPY` and `NAVBAR_SPECIMENS` appended after `COLLAPSE_SPECIMENS`. The specimens are `Navbar expanded`, `Navbar collapsed`, `Navbar opened`, `Navbar scroll`, `Navbar inverted`, and `Navbar inverted class`, plus the breakpoint bars mapped from `['sm', 'md', 'lg', 'xl', 'xxl']`.
- **`app/browser/Showcase.ts`:** imports `NavbarSection` and constructs it after `NavSection`.
- **`app/browser/index.ts`:** `export * from './sections/NavbarSection.js'` after the `NavSection` export.
- **`tests/setup.ts`:** the `CaptureSubject` members, the `CASCADE_KEYS` rows, and the `DRIVEN_KEYS` rows listed in § Registry rows, each appended at the table's end.
- **`tests/setupStyles.ts`:**
  - `COMPONENT_DARK_ASSETS` gains `'--bs-navbar-toggler-icon-bg'`.
  - The `DROPDOWN_SELECTORS` and `NAV_SELECTORS` doc comments are corrected, because their deferral wording is false once the rows leave.
  - `NAVBAR_SELECTORS`, `NAVBAR_MARKUP`, `NAVBAR_EXPAND_CASES`, `NAVBAR_LENGTH_CASES`, `NAVBAR_COLOR_CASES`, and `NAVBAR_DARK_CASES` are appended at the end.
- **`tests/setupStyles.test.ts`:**
  - The `NAVBAR_*` names join the import list and the export-list case.
  - The form-mark case expects `'toggler-icon': ['--bs-navbar-toggler-icon-bg at .navbar']`.
  - The dropdown partition case admits `NAVBAR_SELECTORS` into the shared population.
  - The nav case table replaces its withheld `Navbar` deferral rows with the rules the navbar partial writes.
  - A `navbar case tables` describe is appended. It binds the selectors, including the container combinators and the theme-key icon rule, the ramp widths, the length, light-color, and dark rows, the closed property set, and the markup to the inventory.
- **`tests/app/browser/integration.test.ts`:** `NAVBAR_SPECIMENS` joins the import and the declared-specimen list, and the driven navbar case is appended at the end of `journey`.
- **`tests/app/browser/Showcase.test.ts`:** `NAVBAR_SPECIMENS` import, the `'Navbar'` region, and the specimen spread.
- **`tests/app/browser/index.test.ts`:** `'NAVBAR_COPY'`, `'NAVBAR_SPECIMENS'`, and `'NavbarSection'` in sorted position.
- **`tests/conformance.test.ts`:** `'navbar'` in the `listed` literal, in `passiveNames`, and in the order case's expected list, and the order-case comment names the navbar partial.
- **`tests/setupServer.test.ts`:** `'navbar'` in the compatibility component set.
- **`guides/veneer.md`:**
  - the `### Files` row for `_navbar.scss`;
  - the Dropdown section sentence ("the navigation menu names ship from the navbar partial, and the split-toggle names are withheld");
  - the Nav section's opening paragraph, and removal of its "navbar combinators are absent" departure bullet;
  - the full `### Navbar classes` section, whose limit sentence follows D3;
  - the `Navbar` deferral rows deleted;
  - the retained-variables paragraph rewritten, dropping the toggler from the theme-scope list and naming it among the component rules;
  - the `#### navbar` table;
  - the `### Additions` row;
  - the compatibility rows: the `dropdown` and `nav` selector rows reworded, and the `navbar` selector and variable rows added;
  - the § Tests link to the navbar section proof.
- **`ROADMAP.md`:** the "Container and navigation combinators" carrier cell now reads "the cascade half closed: NAVBAR shipped the navbar partial and the container partial ships the combinators (R2); …". A new carrier row, "Navbar offcanvas panel rendered without a specimen", reads "the Offcanvas unit of B-MODAL … B-CAROUSEL renders a panel inside an expanded bar; NAVBAR shipped the expanded-panel rules and proves them on its own elements (R10)".

## Off-limits patches (D2, for your ruling)

Exact file: `/home/user/scaffold/.orkestrel/veneer/units/nb-offlimits.patch`. `git apply --check` passes.

```diff
--- a/src/styles/_mixins.scss
+++ b/src/styles/_mixins.scss
@@ -102,6 +102,20 @@
 	padding-left: calc(var(--vn-space-8) * 2);
 }
 
+// Emits the list the nav and navbar partials both write: an unstyled flex list whose links take the
+// release's block inset and its empty weight slot. Each caller declares its own inline inset, link
+// colors, and direction beside it, because those are what separate a nav row from a navbar list.
+@mixin nav-list {
+	--bs-nav-link-padding-y: var(--vn-space-4);
+	// The release declares the weight slot with no value. The interpolation compiles to that same
+	// empty declaration, and it states that the emptiness is the release's own.
+	--bs-nav-link-font-weight: #{''};
+	display: flex;
+	padding-left: 0;
+	margin-bottom: 0;
+	list-style: none;
+}
+
 // Returns the layout boundaries, as the one Sass source of every width the ramp carries.
 //
 // `_tokens.scss` loads this file, so it emits `--vn-breakpoint-*` by walking this map, and the
--- a/src/styles/components/_nav.scss
+++ b/src/styles/components/_nav.scss
@@ -8,19 +8,12 @@
 	// color of its own. The link rule reads the font size slot and no rule declares it, as the release
 	// leaves it, so a link takes its parent's size until a consumer sets the property.
 	.nav {
+		@include nav-list;
 		--bs-nav-link-padding-x: var(--vn-space-8);
-		--bs-nav-link-padding-y: var(--vn-space-4);
-		// The release declares the weight slot with no value. The interpolation compiles to that same
-		// empty declaration, and it states that the emptiness is the release's own.
-		--bs-nav-link-font-weight: #{''};
 		--bs-nav-link-color: var(--bs-link-color);
 		--bs-nav-link-hover-color: var(--bs-link-hover-color);
 		--bs-nav-link-disabled-color: var(--bs-secondary-color);
-		display: flex;
 		flex-wrap: wrap;
-		padding-left: 0;
-		margin-bottom: 0;
-		list-style: none;
 	}
 
 	.nav-link {
```

## Retirement serial patch (D6; apply after ACCORDION's `$assets` rows leave)

Exact file: `/home/user/scaffold/.orkestrel/veneer/units/nb-retirement.patch`.

```diff
--- a/src/styles/_tokens.scss
+++ b/src/styles/_tokens.scss
@@ -153,19 +153,6 @@
 		url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"),
 );
 
-// The Bootstrap variable each image-valued dark entry is declared as, for the components that have
-// not yet landed their own dark rule. Bootstrap 5.3.8 gives each of these no light counterpart at
-// theme scope, so the dark scope in `_theme.scss` walks this map and the light scope declares none
-// of them; a light island nested inside a dark one inherits the dark asset. Each keeps Bootstrap's
-// own value until the component that paints it lands its canonical token on its own dark rule, as
-// the check, select, and navbar partials do for the switch knob, the select caret, and the toggler
-// icon, and `guides/veneer.md` under Tokens records the limit. A data URI cannot read a custom
-// property, which is why the value is an asset rather than a token expression. The map is
-// configurable so `tests/setupStyles.test.ts` can compile the shipped partials with a key `$dark`
-// does not declare and read the `@error` `_theme.scss` raises for it.
-$assets: (
-) !default;
-
 @property --vn-factor-density {
 	syntax: '<number>';
 	inherits: true;
--- a/src/styles/_theme.scss
+++ b/src/styles/_theme.scss
@@ -1,4 +1,3 @@
-@use 'sass:map';
 @use 'tokens';
 @use 'mixins' as *;
 
@@ -15,14 +14,5 @@
 	[data-bs-theme='dark'] {
 		color-scheme: dark;
 		@include theme-tokens(tokens.$roles, tokens.$aliased, tokens.$dark);
-		// Bootstrap declares each of these image-valued variables on its own component rules in dark
-		// alone, so the light scope declares none of them and `tokens.$assets` names where each dark
-		// value lands.
-		@each $key, $name in tokens.$assets {
-			@if not map.has-key(tokens.$dark, $key) {
-				@error 'tokens.$assets names #{$key}, which tokens.$dark does not declare.';
-			}
-			#{$name}: #{map.get(tokens.$dark, $key)};
-		}
 	}
 }
--- a/tests/setupStyles.test.ts
+++ b/tests/setupStyles.test.ts
@@ -599,15 +599,6 @@
 		expect(emitted).not.toContain('@media')
 		expect(emitted).not.toContain('.probe-down')
 	})
-	it('refuses an asset key the dark map does not declare, and declares the alias for one it does', () => {
-		const absent = "@use 'tokens' with ($assets: ('probe-absent': '--vn-probe'));\n@use 'theme';\n"
-		const present =
-			"@use 'tokens' with ($assets: ('select-indicator': '--vn-probe'));\n@use 'theme';\n"
-		expect(() => compileString(absent, { loadPaths: ['src/styles'] })).toThrow(/probe-absent/u)
-		expect(compileString(present, { loadPaths: ['src/styles'] }).css).toContain(
-			'--vn-probe: url("data:image/svg+xml,',
-		)
-	})
 	it('splits a shorthand value into its top-level values, treating calc() as one value', () => {
 		expect(splitTopLevelValues('0 calc(1px + var(--gap)) 0 2px')).toEqual([
 			'0',
--- a/tests/src/styles/theme.test.ts
+++ b/tests/src/styles/theme.test.ts
@@ -132,15 +132,19 @@
 			})
 		}
 	})
-	it(`carries the unlanded accordion's dark icons in the dark scope alone and leaves the landed components' to their own rules`, () => {
+	it("declares no component's image in the dark scope and leaves each one to its component's own dark rule", () => {
 		const specimen = requireValue(scene.mount('<div></div>').firstElementChild, 'No asset specimen')
-		const unlanded = ['--bs-accordion-btn-icon', '--bs-accordion-btn-active-icon']
-		for (const name of unlanded) expect(readStyle(specimen, name)).toBe('')
+		// Every component whose image Bootstrap retunes in dark alone has landed its own dark rule, so
+		// a plain element reads none of those images in either mode.
+		expect(COMPONENT_DARK_ASSETS).toEqual(
+			expect.arrayContaining([
+				'--bs-navbar-toggler-icon-bg',
+				'--bs-accordion-btn-icon',
+				'--bs-accordion-btn-active-icon',
+			]),
+		)
+		for (const name of COMPONENT_DARK_ASSETS) expect(readStyle(specimen, name)).toBe('')
 		document.documentElement.setAttribute('data-bs-theme', 'dark')
-		for (const name of unlanded) expect(readStyle(specimen, name)).toContain('data:image/svg+xml')
-		// The navbar ships its toggler icon on the icon's own dark rule, so a plain element in the dark
-		// scope reads none of the landed components' images.
-		expect(COMPONENT_DARK_ASSETS).toContain('--bs-navbar-toggler-icon-bg')
 		for (const name of COMPONENT_DARK_ASSETS) expect(readStyle(specimen, name)).toBe('')
 	})
 })
```

## What the unit could not close

- **D2:** the `nav-list` repair needs your ruling and the off-limits patch applied. Without it, the duplication gate reddens.
- **D3:** R16 and family ruling 9 still name the xl frame as missing. The guide sentence follows the tree.
- **D6:** the `$assets` retirement waits for ACCORDION. The accordion retained-variables guide paragraph belongs to ACCORDION's patch and must land with the retirement.
- **D7:** the journey census stays red until ACCORDION's `:not(.collapsed)` rule ships.
- **Capture runs:** the journey and `CAPTURE=1` runs are yours.
  - The forced-colors outline has no frame, because the journey stages no forced colors.
  - The `.navbar-expand-xxl` expanded state has no frame (D3).
  - The Layout frames change by the host's block inset.
- **Readings the proof does not take:**
  - `.navbar-toggler:hover` has no resolved reading, only layer presence.
  - The offcanvas rules are read at the lg step and the no-infix bar only.
- **D4:** criterion 5's styles-config command cannot pass as written. The same file is green in the setup project.
- **D8:** the report file was not written. This handback is the report.
