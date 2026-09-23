# Unit NAV (`nv`) report — successor run 2

`opus` on Opus 5.5, native subagent, worktree `/home/user/veneer-nv` (branch `unit/nv` over
`87ff1d0`). This run continued from the first run's `_nav.scss` and its staging copy; nothing was
discarded.

## Outcome

The `nav` key is written, proved, registered, and documented. The owned files are in the worktree.
Every shared-file change is in the patch at the end of this report, which is also saved at
`nv-shared.patch`. Every gate is green in the stage, where the
patch is applied over main (`72fdde4`). In the worktree, `npm run check` fails because the owned
files import symbols that only the patch adds (deviation D1). The journey's census case stays red
until DROPDOWN lands (deviation D3).

## Deviations (for the Orchestrator's ruling)

- **D1: the acceptance criteria can only be read with the shared patch applied.** Expected: criteria
  2 to 5 go green in the worktree while every shared file stays untouched. Found: `NavSection.ts`
  needs `NAV_COPY` and `NAV_SPECIMENS` from `app/browser/constants.ts`, `nav.test.ts` needs the
  `NAV_*` tables from `tests/setupStyles.ts`, and the built cascade carries nav only after the
  `src/styles/index.scss` line exists. All three files are shared. Evidence: `npm run check` in the
  worktree exits 2, and every error is a missing shared export
  (`app/browser/sections/NavSection.ts(1,10): error TS2305: Module '"../constants.js"' has no
  exported member 'NAV_COPY'`, and the matching `NAV_*` and `NavSection` errors in the two test
  files). Done: I ran every gate in a scratch stage with the patch applied. The stage is
  `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/nv-stage`, a copy of the
  tree with its own `node_modules`, made by the first run, which chose the same approach. The
  worktree's shared files were never edited. Hypothesis: the family's report-only rule needs a
  staged-validation clause, or wave units need their shared rows landed first.
- **D2: the patch base is main, not `87ff1d0`.** B-PASSIVE-ORDER landed on main (`f898502`, then
  `72fdde4`) after this worktree was cut. It changed `src/styles/index.scss` and
  `tests/conformance.test.ts`, and the ruling 8 order case exists only there. The patch is a
  unified diff against `72fdde4`. `patch -p1 --dry-run` applies every hunk to a `72fdde4` copy.
  `git -C /home/user/veneer-nv apply --check --exclude=src/styles/index.scss
  --exclude=tests/conformance.test.ts` passes at `87ff1d0`. The other shared files are byte-identical
  at both commits.
- **D3: the journey's census case waits on DROPDOWN.** The `Nav tabs` specimen carries the release's
  open-menu markup (`nav-item dropdown show`, `dropdown-toggle`, `dropdown-menu show`,
  `dropdown-item`). The journey case `matrix > reads the mounted class and style populations with
  their published controls` reports `expected [ 'dropdown', 'dropdown-item' ] to deeply equal []`
  because no shipped rule declares those classes yet (journey `light-390` and `dark-1280`:
  `1 failed | 38 passed (39)`). A stage-only probe partial declaring `.dropdown` and `.dropdown-item`
  turned `light-1280` fully green (`39 passed (39)`), and I deleted the probe afterwards. So the only
  blocker is the missing DROPDOWN partial. Land DROPDOWN before NAV, or NAV's journey reads red on
  that one case. I kept the release markup, because removing the classes would leave a follow-up
  edit to the specimen that no unit owns.
- **Recorded choices, as the contract allows:** the specimens' copy; the `### Nav classes` section
  between `### Button toolbar classes` and `### Progress classes` (barrel position); the `#### nav`
  table before `#### card`; new compatibility rows after the `pagination` rows; the plugin rows after
  the last `engine` row; the new deferral, addition, `CaptureSubject`, `CASCADE_KEYS`, and
  `DRIVEN_KEYS` rows at the end of their tables. The `Nav tabs` markup is unchanged from the first
  run. How the open menu looks before DROPDOWN lands is left to the Orchestrator's frames, as the
  brief's Unknown states.

## Touched files

Owned, in the worktree:

- `src/styles/components/_nav.scss` (new, 180 lines): the nav partial, with `forced-ring` on the
  link ring and the transitions through the `transition` mixin.
- `tests/src/styles/components/nav.test.ts` (new, 497 lines): the mirrored browser proof.
- `app/browser/sections/NavSection.ts` (new, 20 lines): the `Nav` region, a `SpecimenSection`
  subclass.
- `tests/app/browser/sections/NavSection.test.ts` (new, 110 lines): the section proof.
- `tests/app/browser/sections/CardSection.test.ts` (+18 −1): asserts the card header specimens use
  the release markup (R12).

Diffstat: `git diff --stat 87ff1d0` shows `CardSection.test.ts | 19 ++++++++++++++++++-`. The other
four files are untracked. `git status --porcelain` lists exactly those five paths.

Shared, patch only (`git apply --stat`): `app/browser/Showcase.ts` +2, `app/browser/constants.ts`
+63 −2 (the `NAV_*` constants and the card header release markup), `app/browser/index.ts` +1,
`guides/veneer.md` +105 −5, `src/styles/index.scss` +1, `tests/app/browser/Showcase.test.ts` +3,
`tests/app/browser/index.test.ts` +3, `tests/app/browser/integration.test.ts` +98,
`tests/conformance.test.ts` +5 −1, `tests/setup.ts` +52, `tests/setupServer.test.ts` +1,
`tests/setupStyles.test.ts` +101, `tests/setupStyles.ts` +227. These need no change:
`tests/setup.test.ts` (`npm run test:setup` stays green with the new rows, and no export was added),
`ROADMAP.md` (no row closes on this unit alone; the landing fold is the Orchestrator's).

## Baseline at `87ff1d0` (worktree, before any gate)

- `npm run test:conformance`: exit 0, `Tests 21 passed (21)`.
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
  tests/src/styles/components/card.test.ts tests/src/styles/components/pagination.test.ts`: exit 0,
  `Tests 41 passed (41)`.

## Gate exits

Stage (main `72fdde4`, plus the owned files, plus the patch). Log:
`nv-instruments/gates.log.txt`.

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | all files formatted |
| `npm run lint:check` | 0 | no findings |
| `npm run check` | 0 | every project |
| `npm run build:src` | 0 | cascade built with `nav` |
| `npm run test:setup` | 0 | `251 passed (251)` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/nav.test.ts tests/src/styles/components/card.test.ts` | 0 | `59 passed (59)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/CardSection.test.ts` | 0 | `4 passed (4)` |
| `npm run test:app` | 0 | `67 passed (67)` |
| `npm run test:conformance` | 0 | `22 passed (22)` |
| `npm run test:guides` | 0 | `18 passed (18)` |
| `npm run test:policy` | 1 in the chain, then 0 alone | chain run: `enforces the workspace policy laws including surface ownership` timed out at 5000 ms right after the heavy steps; alone: `109 passed \| 1 skipped (110)`. This is a timing observation; the deciding re-run is yours. |
| `npm run test:src:styles` (observation) | 0 | `77 files, 794 passed (794)` |

Worktree (owned files only, no shared change): `npm run format:check` exit 0; `npm run lint:check`
exit 0; `npm run test:policy` exit 0 (`109 passed | 1 skipped (110)`); `npm run check` exit 2 (D1).

Journey observations in the stage, without `CAPTURE=1`, each run as
`npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project
journey:<variant>`: `light-390` and `dark-1280` gave `1 failed | 38 passed (39)`, with the census
case as the only failure (D3). The new nav case and the resting cascade case with the nav rows both
passed. `light-1280` with the DROPDOWN census probe gave `39 passed (39)`.

## Failing-first evidence (mutations)

This is a feature unit, so each case's failing reading is its distinguishing mutation. Instrument:
`nv-instruments/mutate.py`. For each mutation it edits the stage partial or barrel, runs
`npm run build:src:styles`, runs the criterion 4 command, and restores the file. The unmutated run
is `59 passed (59)`. Every mutation reddened its named case and left `card.test.ts` green. Logs:
`nv-instruments/mutate-final-1.log.txt` and `nv-instruments/mutate-final-2.log.txt`.

| Mutation | Failed of 59 | Named case that reddened |
| --- | --- | --- |
| ring written on `:focus` rather than `:focus-visible` | 2 | rings a keyboard-focused link and leaves a pointer-held link to the hover color alone (plus the layer case) |
| `forced-ring` omitted | 1 | outlines the keyboard-focused link at the focus width under forced colors… |
| the tab's negative `margin-bottom` dropped | 1 | hangs each tab one border width over the strip, so the active tab covers the strip line where they meet |
| `.nav-tabs .nav-item.show .nav-link` left out of the list | 2 | paints the link whose item carries show as the active link in tabs, pills, and underline |
| `.nav-tabs .dropdown-menu` dropped | 2 | pulls a menu hanging from a tab up by the border width and squares only its top corners |
| justified written as fill (`flex: 1 1 auto`) | 1 | grows every 'nav-justified' item across the row, sharing it equally only when justified |
| `.tab-content > .tab-pane` dropped | 2 | shows the pane carrying active and hides every other pane inside the tab content |
| `.tab-content > .active` dropped | 2 | same case |
| nav loads after card (barrel) | 1 | drops the strip line of tabs in a card header, because the card partial loads after the nav partial |
| link color reads `--bs-link-color` past its slot | 1 | paints 'color' from '--bs-nav-link-color'… (the wrapper-override case) |
| `--bs-nav-link-color` fixed to `--vn-palette-blue` | 4 | the dark-island cases: repaints … in dark; reads one link and tab paint in light and another in dark |
| `.nav` layout dropped | 4 | lays each nav out as an unstyled wrapping row… |
| link padding written literally | 3 | the padding length cases and the density case |
| transition written without the mixin | 12 | collapses the link transition under the staged preference… (plus the cases that stage reduced motion) |
| `.nav-link:hover` dropped | 2 | repaints a hovered link, tab, and underline link from their hover slots |
| `:focus` left out of the hover pair | 2 | rings a keyboard-focused link… (the pointer-held link loses the hover color) |
| disabled pointer refusal dropped | 1 | refuses the pointer on a disabled link under either spelling… |
| `.nav-link:disabled` left out | 2 | same case |
| tab hover dropped | 2 | repaints a hovered link, tab, and underline link… |
| tab focus dropped | 2 | lifts a keyboard-focused tab into its own stacking context with the hover border |
| pill `show` twin left out | 2 | paints the link whose item carries show… |
| underline `show` twin left out | 2 | same case |
| underline hover dropped | 2 | repaints a hovered link, tab, and underline link… |
| underline focus dropped | 2 | lifts a keyboard-focused tab… |
| `.nav-fill > .nav-link` left out | 2 | grows every 'nav-fill' item… |
| item link `width: 100%` dropped | 3 | both row cases (the button item stops spanning its cell) |
| underline gap written literally | 2 | the gap length case and the density case |
| underline stroke read through `--vn-space-1` | 1 | drives the link padding and the underline gap from the density factor and leaves the underline stroke fixed |
| tab active background dropped | 5 | the active-bg color case, the seam case, and the mode cases |

## Proof matrix (ruling 15)

The resting scenarios are the `CASCADE_KEYS` rows `nav-base`, `nav-tabs`, `nav-pills`,
`nav-underline`, `nav-fill`, `nav-justified`, and `tab-panes`. The driven scenarios are
`nav-base-hover`, `nav-base-focus`, and `nav-tabs-hover`. The layer case in `nav.test.ts` holds
every shipped selector against the components layer.

| Recorded selector or condition | Proof case in `nav.test.ts` | Distinguishing mutation | Specimen | Capture scenario |
| --- | --- | --- | --- | --- |
| `.nav` | lays each nav out as an unstyled wrapping row…; the link length and color cases | `.nav` layout dropped | every specimen | `nav-base` and every resting nav row |
| `.nav-link` | the layout case; the padding length cases; the type size and weight case | link padding written literally | Nav base | `nav-base` |
| `.nav-link` under `@media (prefers-reduced-motion: reduce)` | collapses the link transition under the staged preference… | transition written without the mixin | Nav base | `nav-base-hover` (shot with reduced motion staged) |
| `.nav-link:hover` | repaints a hovered link, tab, and underline link… | `.nav-link:hover` dropped | Nav base | `nav-base-hover` |
| `.nav-link:focus` | rings a keyboard-focused link and leaves a pointer-held link to the hover color alone | `:focus` left out of the hover pair | Nav base | `nav-base-focus` |
| `.nav-link:focus-visible` | the ring case; the forced-colors case | ring on `:focus`; `forced-ring` omitted | Nav base | `nav-base-focus` |
| `.nav-link.disabled` | refuses the pointer…; the disabled color case | disabled pointer refusal dropped | Nav base | `nav-base` (reads its `color`) |
| `.nav-link:disabled` | refuses the pointer… | `.nav-link:disabled` left out | Nav base | `nav-base` |
| `.nav-tabs` | the border-width length case; the border-color color case; the seam case | nav loads after card; tab margin dropped | Nav tabs | `nav-tabs` |
| `.nav-tabs .nav-link` | hangs each tab one border width over the strip…; the tab radius length case | tab margin dropped | Nav tabs | `nav-tabs` |
| `.nav-tabs .nav-link:hover` | repaints a hovered link, tab, and underline link… | tab hover dropped | Nav tabs | `nav-tabs-hover` |
| `.nav-tabs .nav-link:focus` | lifts a keyboard-focused tab into its own stacking context… | tab focus dropped | Nav tabs | no frame: same paint as `nav-tabs-hover` |
| `.nav-tabs .nav-link.active` | the seam case; the tab active color, background, and border color cases; the mode cases | tab active background dropped | Nav tabs | `nav-tabs` |
| `.nav-tabs .nav-item.show .nav-link` | paints the link whose item carries show as the active link… | show item left out of the list | Nav tabs | `nav-tabs` |
| `.nav-tabs .dropdown-menu` | pulls a menu hanging from a tab up by the border width… | the menu rule dropped | Nav tabs | `nav-tabs` (menu look waits on DROPDOWN) |
| `.nav-pills` | the pill color cases; the mode cases | pill slots (read by the color cases) | Nav pills | `nav-pills` |
| `.nav-pills .nav-link` | the pill radius length case | the radius read by the length case | Nav pills | `nav-pills` |
| `.nav-pills .nav-link.active` | the pill color cases | the palette read by the color cases | Nav pills | `nav-pills` |
| `.nav-pills .show > .nav-link` | paints the link whose item carries show… | pill show twin left out | Nav pills | `nav-pills` |
| `.nav-underline` | the gap length case; the density case | underline gap written literally | Nav underline | `nav-underline` |
| `.nav-underline .nav-link` | the stroke length case; the density case | stroke read through a space token | Nav underline | `nav-underline` |
| `.nav-underline .nav-link:hover` | repaints a hovered link, tab, and underline link… | underline hover dropped | Nav underline | no frame |
| `.nav-underline .nav-link:focus` | lifts a keyboard-focused tab… | underline focus dropped | Nav underline | no frame |
| `.nav-underline .nav-link.active` | the show case; the underline color case | underline show twin left out | Nav underline | `nav-underline` |
| `.nav-underline .show > .nav-link` | the show case | underline show twin left out | Nav underline | `nav-underline` |
| `.nav-fill > .nav-link` | grows every 'nav-fill' item… | bare fill link left out | Nav fill | `nav-fill` |
| `.nav-fill .nav-item` | same case | `.nav` layout dropped; justified written as fill (control side) | Nav fill | `nav-fill` |
| `.nav-justified > .nav-link` | grows every 'nav-justified' item… | justified written as fill | Nav justified | `nav-justified` |
| `.nav-justified .nav-item` | same case | justified written as fill | Nav justified | `nav-justified` |
| `.nav-fill .nav-item .nav-link` | both row cases (button item) | item link width dropped | Nav fill | `nav-fill` |
| `.nav-justified .nav-item .nav-link` | both row cases (button item) | item link width dropped | Nav justified | `nav-justified` |
| `.tab-content > .tab-pane` | shows the pane carrying active… | pane display dropped | Tab panes; Nav tabs | `tab-panes` |
| `.tab-content > .active` | same case | active pane display dropped | Tab panes; Nav tabs | `tab-panes` |
| `.card-header-tabs .nav-link.active` (card partial, nav key) | drops the strip line of tabs in a card header…; `card.test.ts` > paints an already active header tab into the cap… | nav loads after card | Card tabs | `card-tabs` |
| `@media (forced-colors: active)` on `.nav-link:focus-visible` (addition) | outlines the keyboard-focused link at the focus width under forced colors… | `forced-ring` omitted | Nav base | no frame (the journey does not stage forced colors) |
| `.navbar-nav .nav-link.active`, `.navbar-nav .nav-link.show`, and each `.navbar-expand` padding rule (`-sm`, `-md`, `-lg`, `-xl`, `-xxl`, bare) | not shipped; `tests/setupStyles.test.ts` > nav case tables partitions `NAV_SELECTORS` and the `Navbar` deferral rows against the inventory | a deferral row deleted, or a navbar name added to `NAV_SELECTORS` | none | none (owner `Navbar`) |

The case tables are `NAV_SELECTORS`, `NAV_MARKUP`, `NAV_LENGTH_CASES`, `NAV_COLOR_CASES`, and
`NAV_ROW_CASES` in `tests/setupStyles.ts`. They are bound to the inventory in
`tests/setupStyles.test.ts` > `nav case tables`. That binding also closes the published property
set: the table rows plus `--bs-nav-link-font-weight` (the type case) and `--bs-nav-link-hover-color`
and `--bs-nav-tabs-link-hover-border-color` (the hover case) equal the inventory's `nav` property
keys.

## Ledger rows written (in the patch)

`#### nav` under `### Departures`, each as `npm run test:conformance` measured it, category
`tokenized`:

- `.nav` `--bs-nav-link-padding-x`: `1rem` → `var(--vn-space-8)`.
- `.nav` `--bs-nav-link-padding-y`: `0.5rem` → `var(--vn-space-4)`.
- `.nav-link:focus-visible` `box-shadow`: `0 0 0 0.25rem rgba(13, 110, 253, 0.25)` →
  `0 0 0 0.25rem color-mix(in srgb, var(--vn-palette-blue) 25%, transparent)`.
- `.nav-pills` `--bs-nav-pills-link-active-color`: `#fff` → `var(--vn-palette-white-base)`.
- `.nav-pills` `--bs-nav-pills-link-active-bg`: `#0d6efd` → `var(--vn-palette-blue)`.
- `.nav-underline` `--bs-nav-underline-gap`: `1rem` → `var(--vn-space-8)`.

`### Additions`: `nav` | `.nav-link:focus-visible { outline }` | `@media (forced-colors: active)` |
`declaration`.

The empty `--bs-nav-link-font-weight` slot (`#{''}`) matched the release, so it has no row.

## Other rows in the patch

- Compatibility: `nav` `selector` and `nav` `variable` rows (`shipped`, proof `—`), and the Tab and
  ScrollSpy rows (component `engine`, kind `plugin`, proof `—`, `accepted`, each ending
  `Owner: J-ENGINE.`), plus one sentence after the table: "A `plugin` row records a behavior
  J-ENGINE owns, while the classes that behavior sets ship in the cascade and render in markup."
  COLLAPSE and DROPDOWN might return the same sentence; keep one copy.
- `### Deferred selectors`: the navbar-bearing `nav` names, each with owner `Navbar`.
- `### Files`: the `_nav.scss` row after the `_button-group.scss` row.
- `### Nav classes`: between `### Button toolbar classes` and `### Progress classes`. It states
  that the classes are set in markup and points at § Compatibility for Tab and ScrollSpy.
- The `### Card classes` sentence about `.card-header-tabs .nav-link.active` is rewritten for the
  shipped nav key and the release header markup.
- `## Showcase`: one sentence for the Nav region.
- `CaptureSubject` gets `Nav base`, `Nav tabs`, `Nav pills`, `Nav underline`, `Nav fill`,
  `Nav justified`, and `Tab panes`. The resting `CASCADE_KEYS` rows (scenario / selector /
  property) are:
  - `nav-base` / `.nav-link.disabled` / `color`
  - `nav-tabs` / `.nav-tabs` / `border-bottom-color`
  - `nav-pills` / `.nav-pills .nav-link.active` / `background-color`
  - `nav-underline` / `.nav-underline .nav-link.active` / `border-bottom-color`
  - `nav-fill` / `.nav-fill .nav-item` / `flex-grow`
  - `nav-justified` / `.nav-justified .nav-item` / `flex-basis`
  - `tab-panes` / `.tab-content > .active` / `display`
- The driven `DRIVEN_KEYS` rows are `nav-base-hover`, `nav-base-focus` (both on `Nav base`), and
  `nav-tabs-hover` (on `Nav tabs`). The journey case `drives a plain nav link to hover and to focus
  and a resting tab to hover, and photographs each state` places them: the hover frames through
  `FRAMES.place` on the lifted specimen, and the focus frame through `FRAMES.page`.
- Card specimens, release markup (R12): `Card tabs` becomes
  `<ul class="nav nav-tabs card-header-tabs"><li class="nav-item"><a class="nav-link active"
  aria-current="true" …>` and `Card pills` becomes `<ul class="nav nav-pills card-header-pills">…`.
  Registered card rows unchanged: `card-tabs` still reads `.card-header-tabs` `margin-bottom` −8,
  and `card-pills` still reads `.card-header-pills` `margin-left` −8. The card frames change. No
  journey case reads the card header markup (`grep -n "card-header"
  tests/app/browser/integration.test.ts` returns nothing).
- The conformance order case (main's `loads the passive block and the helpers in the release
  order…`) gains `nav` between `button-group` and `card` in its name set and its expected list,
  plus one comment clause. `listed` and the `tests/setupServer.test.ts` component set gain `nav`.

## Could not close

- The journey census case needs `.dropdown` and `.dropdown-item` declared, which DROPDOWN ships
  (D3). NAV's journey is green only after DROPDOWN lands.
- Worktree-only readings of criteria 2 to 5 are impossible while the shared files stay untouched
  (D1). The stage readings stand in, and the authoritative run belongs to your verifier after
  integration.
- `CAPTURE=1` frames were not taken (they are the Orchestrator's observation). The `Nav tabs` frame
  shows the menu unstyled until DROPDOWN lands.
- `test:policy` timed out once under load inside the gate chain and passed alone; the deciding
  re-run is yours.

## Instruments and scratch

Under `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/`:

- `nv-stage/`: the validation stage.
- `nv-base/`: shared files at `72fdde4`, written by `nv-unit-base.sh`.
- `nv-sync.sh`: copies the owned files into the stage.
- `nv-instruments/`: the edit scripts `edit1.py` to `edit4.py`, `patch.sh`, `gates.sh`, `journey.sh`,
  `mutate.py`, and every log named in this report.

No probe was left in the worktree, and none was ever written there. The census probe partial lived
only in the stage and was deleted.

## Shared-file patch (unified diff against `72fdde4`)

```diff
--- a/app/browser/Showcase.ts
+++ b/app/browser/Showcase.ts
@@ -20,6 +20,7 @@
 import { LinkSection } from './sections/LinkSection.js'
 import { ListGroupSection } from './sections/ListGroupSection.js'
 import { MediaSection } from './sections/MediaSection.js'
+import { NavSection } from './sections/NavSection.js'
 import { PaginationSection } from './sections/PaginationSection.js'
 import { PlaceholderSection } from './sections/PlaceholderSection.js'
 import { ProgressSection } from './sections/ProgressSection.js'
@@ -114,6 +115,7 @@
 			new BreadcrumbSection(this.#main),
 			new CloseSection(this.#main),
 			new InputGroupSection(this.#main),
+			new NavSection(this.#main),
 		]
 	}
 
--- a/app/browser/constants.ts
+++ b/app/browser/constants.ts
@@ -1306,12 +1306,12 @@
 	Object.freeze({
 		name: 'Card tabs',
 		markup:
-			'<div class="card"><div class="card-header"><ul class="card-header-tabs"><li><a class="nav-link active" href="#main">Open</a></li><li><a class="nav-link" href="#main">Closed</a></li></ul></div><div class="card-body"><p class="card-text">The active tab meets the cap.</p></div></div>',
+			'<div class="card"><div class="card-header"><ul class="nav nav-tabs card-header-tabs"><li class="nav-item"><a class="nav-link active" aria-current="true" href="#main">Open</a></li><li class="nav-item"><a class="nav-link" href="#main">Closed</a></li></ul></div><div class="card-body"><p class="card-text">The active tab meets the cap.</p></div></div>',
 	}),
 	Object.freeze({
 		name: 'Card pills',
 		markup:
-			'<div class="card"><div class="card-header"><ul class="card-header-pills"><li><a class="nav-link active" href="#main">Inbound</a></li><li><a class="nav-link" href="#main">Outbound</a></li></ul></div><div class="card-body"><p class="card-text">The pills pull sideways alone.</p></div></div>',
+			'<div class="card"><div class="card-header"><ul class="nav nav-pills card-header-pills"><li class="nav-item"><a class="nav-link active" aria-current="true" href="#main">Inbound</a></li><li class="nav-item"><a class="nav-link" href="#main">Outbound</a></li></ul></div><div class="card-body"><p class="card-text">The pills pull sideways alone.</p></div></div>',
 	}),
 	Object.freeze({
 		name: 'Card group',
@@ -1690,3 +1690,64 @@
 			'<div class="container-fluid"><fieldset class="row"><legend class="col-5 col-form-label">Pickup</legend><div class="col-7"><input class="form-control" type="date" aria-label="Pickup date" value="2026-09-23"></div></fieldset></div>',
 	}),
 ])
+
+/** Holds the Nav section's visible copy and accessible name. */
+export const NAV_COPY = Object.freeze({
+	region: 'Nav',
+	paragraph:
+		'Compare the plain links, the tabs over their strip with a tab whose menu is open, the pills, the underline, the filled and justified rows, and the tab panes, each state set in markup.',
+})
+
+/**
+ * Lists the nav specimens the section renders, in render order.
+ *
+ * @remarks
+ * Every state class the key ships a rule for is set in markup here, because no script moves it:
+ * the active link, the disabled link and the disabled button, the item carrying `show`, and the
+ * active pane beside a hidden one. Each link announces a name of its own, qualified by its
+ * specimen's word, because the journey reaches a link by that name and a label repeated across
+ * specimens would resolve to whichever came first.
+ *
+ * The tab whose menu is open hangs that menu below the strip. The pane after the strip is the room
+ * the menu hangs over: the room is in-flow content rather than a declared height, because an inline
+ * style is refused on this surface, and a menu lying over the pane under its tab is the release's
+ * own arrangement. The filled and justified rows each render their items twice, once as list items
+ * and once as bare links, because the key writes a rule for each spelling.
+ */
+export const NAV_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
+	Object.freeze({
+		name: 'Nav base',
+		markup:
+			'<nav class="nav" aria-label="Base links"><a class="nav-link" href="#main">Base overview</a><a class="nav-link" href="#main">Base reports</a><a class="nav-link disabled" aria-disabled="true" tabindex="-1" href="#main">Base archive</a><button class="nav-link" type="button" disabled="">Base export</button></nav>',
+	}),
+	Object.freeze({
+		name: 'Nav tabs',
+		markup:
+			'<ul class="nav nav-tabs"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#main">Tabs summary</a></li><li class="nav-item dropdown show"><a class="nav-link dropdown-toggle" href="#main" role="button" aria-expanded="true">Tabs filters</a><ul class="dropdown-menu show" data-bs-popper="static"><li><a class="dropdown-item" href="#main">Tabs by date</a></li><li><a class="dropdown-item" href="#main">Tabs by owner</a></li></ul></li><li class="nav-item"><a class="nav-link" href="#main">Tabs history</a></li><li class="nav-item"><a class="nav-link disabled" aria-disabled="true" tabindex="-1" href="#main">Tabs audit</a></li></ul><div class="tab-content"><div class="tab-pane active"><p>The summary pane sits under the active tab.</p><p>The open menu lies over this pane.</p><p>The strip line stops where the active tab opens onto it.</p></div></div>',
+	}),
+	Object.freeze({
+		name: 'Nav pills',
+		markup:
+			'<ul class="nav nav-pills"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#main">Pills today</a></li><li class="nav-item show"><a class="nav-link" href="#main">Pills week</a></li><li class="nav-item"><a class="nav-link" href="#main">Pills month</a></li></ul>',
+	}),
+	Object.freeze({
+		name: 'Nav underline',
+		markup:
+			'<ul class="nav nav-underline"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#main">Underline inbox</a></li><li class="nav-item show"><a class="nav-link" href="#main">Underline sent</a></li><li class="nav-item"><a class="nav-link" href="#main">Underline drafts</a></li></ul>',
+	}),
+	Object.freeze({
+		name: 'Nav fill',
+		markup:
+			'<ul class="nav nav-pills nav-fill"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#main">Fill item</a></li><li class="nav-item"><a class="nav-link" href="#main">Fill item with a longer label</a></li></ul><nav class="nav nav-pills nav-fill" aria-label="Filled links"><a class="nav-link" href="#main">Fill link</a><a class="nav-link" href="#main">Fill link with a longer label</a></nav>',
+	}),
+	Object.freeze({
+		name: 'Nav justified',
+		markup:
+			'<ul class="nav nav-pills nav-justified"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#main">Justified item</a></li><li class="nav-item"><a class="nav-link" href="#main">Justified item with a longer label</a></li></ul><nav class="nav nav-pills nav-justified" aria-label="Justified links"><a class="nav-link" href="#main">Justified link</a><a class="nav-link" href="#main">Justified link with a longer label</a></nav>',
+	}),
+	Object.freeze({
+		name: 'Tab panes',
+		markup:
+			'<div class="tab-content"><div class="tab-pane active"><p>The active pane is the one shown.</p></div><div class="tab-pane"><p>The hidden pane waits for the active class.</p></div></div>',
+	}),
+])
--- a/app/browser/index.ts
+++ b/app/browser/index.ts
@@ -27,3 +27,4 @@
 export * from './sections/BreadcrumbSection.js'
 export * from './sections/CloseSection.js'
 export * from './sections/InputGroupSection.js'
+export * from './sections/NavSection.js'
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -203,6 +203,7 @@
 | `src/styles/components/_spinner.scss`       | The border and grow spinners, their small twins, and their keyframes in the components layer.                                                                                                                                                      |
 | `src/styles/components/_placeholder.scss`   | The placeholder, its height floors, its button box, and the glow and wave animations in the components layer.                                                                                                                                      |
 | `src/styles/components/_button-group.scss`  | The button group, its vertical twin, their joining relationships, and the toolbar in the components layer, read by `tests/src/styles/components/button-group.test.ts`.                                                                             |
+| `src/styles/components/_nav.scss`           | The nav row, its links and their states, the tabs, pills, and underline forms, the filled and justified rows, and the tab panes in the components layer.                                                                                           |
 | `src/styles/components/_ratio.scss`         | The aspect-ratio box, its pseudo-element, and the named aspects in the components layer.                                                                                                                                                           |
 | `src/styles/components/_vr.scss`            | The vertical rule in the components layer.                                                                                                                                                                                                         |
 | `src/styles/components/_card.scss`          | The card box, its caps and body, the image and overlay placements, the header navigations, and the card group in the components layer.                                                                                                             |
@@ -882,6 +883,73 @@
 The `.btn-toolbar .input-group` combinator ships with the input group it sizes, from
 `src/styles/components/_input-group.scss`; § Input group classes describes it.
 
+### Nav classes
+
+The nav key ships whole, less the navbar combinators it records: the nav row and its links, the
+hover, focus, and disabled states, the tabs, pills, and underline forms with their active and shown
+links, the menu a tab hangs, the filled and justified rows, and the tab panes. The component partial
+loads between the button group partial and the card partial in the components layer, at the
+barrel's Bootstrap order.
+
+Every value the family paints is Bootstrap 5.3.8's own, apart from the forced-colors focus outline
+§ Additions records. A length reads the Veneer scale token that already resolves to it, so the link
+padding and the underline gap answer to `--vn-factor-density`. The underline stroke keeps the
+release's `0.125rem` literal, because the token resolving to that length is a space token and a
+stroke read through it would thicken and thin with the density factor. A color reads the
+compatibility variable Bootstrap itself names. The active pill is the exception: Bootstrap paints it
+with literals, so the pill slots read `--vn-palette-blue` and `--vn-palette-white-base`, which carry
+that exact pair, and the active pill holds one fill in the light and dark modes while the links and
+tabs around it retune.
+
+Each published property is declared on the class that owns it: the link slots on the `.nav` class,
+the tab slots on the `.nav-tabs` class, the pill slots on the `.nav-pills` class, and the underline
+slots on the `.nav-underline` class. A declaration on an ancestor is outranked there, so the class
+itself is where a consumer retunes one. `--bs-nav-link-font-size` is read and declared nowhere, and
+`--bs-nav-link-font-weight` is declared empty, as the release leaves them, so a link takes its
+parent's size and weight until a consumer sets either property.
+
+The link's focus ring is the recorded quarter-rem shadow at a quarter of the palette blue, written as
+a mix over that token because a partial declares no literal color. The ring answers to the
+`:focus-visible` pseudo-class, so a link the keyboard reaches carries the ring and a link a pointer
+presses takes the hover color alone. Under forced colors the same rule also writes an outline in the
+system highlight color through the `forced-ring` mixin, because forced colors paint no shadow ring.
+
+Each tab hangs one border width below the strip's own bottom edge, so the active tab's bottom border,
+painted in the body surface, covers the strip line where the two meet and the tab opens onto the
+pane below. A hovered or focused tab takes the hover border and the `isolate` value of `isolation`,
+which the release writes so an active neighbour does not overlap the tab's focus outline. A menu
+hanging from a tab is pulled up by the same border width and loses its top corners; the menu's own
+box ships with the dropdown key.
+
+An item carrying the `show` class paints its link as the active one in the tabs, pills, and underline
+forms, which is how the tab whose menu is open reads. A filled row grows each item from its own
+content, so the items keep their differing widths, and a justified row grows every item from a zero
+basis, so the items share the row equally. A tab pane stays hidden until it carries the `active`
+class.
+
+The state classes are set in markup. The `active` class, the `show` class, and the `disabled` class
+render wherever a template puts them, and no rule here sets or clears one. The Tab and ScrollSpy
+behaviors that move those classes from a click or from the scroll position are engine obligations
+§ Compatibility records under the J-ENGINE owner.
+
+The link transition carries Bootstrap's own `0.15s ease-in-out` rather than the motion tokens the
+Button family reads, because this family ships the release's recorded surface. It is written through
+the `transition` mixin, so the reduced-motion rule the release records beside it is emitted with it.
+
+These are the key's recorded departures.
+
+- **The navbar combinators are absent.** The `.navbar-nav .nav-link.active` selector, the
+  `.navbar-nav .nav-link.show` selector, and the expanded-navbar padding rules belong to the navbar,
+  and § Deferred selectors carries a row for each with the `Navbar` owner.
+
+The `tests/src/styles/components/nav.test.ts` proof reads each resolved treatment in the browser: the
+row layout, the inherited type size and weight, each published property beside the property it
+drives and retuned from its own class, the ring under keyboard focus against a pointer press, the
+forced-colors outline, the refused pointer on each disabled spelling, the hover slots under a real
+pointer, the tab seam as painted geometry, the shown link against the active one, the menu's squared
+corners, the filled and justified widths, the panes, the tabs inside a card header, the density
+factor, the light and dark modes, and the transition collapse under the staged preference.
+
 ### Progress classes
 
 The progress key ships whole: the track, the stacked track, the bar, the striped bar, and the
@@ -1543,11 +1611,13 @@
 which is where the release authors them. The official inventory records them under the card key and
 under the list-group key alike, and one emission answers for both readings.
 
-`.card-header-tabs .nav-link.active` names `.nav-link`, which is Navigation's class. This partial
-declares no rule for that class and no rule selects it alone, so the combinator matches nothing
-until a consumer brings the tab markup. It is the ruling the container's navigation combinators and
-the icon link's `.bi` combinator already carry: the declarations are self-contained on the element
-Veneer owns.
+The `.card-header-tabs .nav-link.active` combinator names the `.nav-link` class, which the nav key
+ships, and this partial writes the combinator because the release writes it in its own card partial.
+The card specimens carry the release's header markup: a nav list carrying the `.nav-tabs` class or
+the `.nav-pills` class beside the card's own header class, with each link inside its item. The
+card's header rules tie with the nav rules on specificity, and the barrel loads the card partial
+after the nav partial, as the release does, so a tabs strip inside a header drops the strip line and
+its active tab paints in the card's own surface.
 
 `.card-group` lays its cards out as one row at and above the `sm` boundary, through the tree's
 upward breakpoint mixin. The joined row squares the facing corners of each card and of the caps and
@@ -1737,6 +1807,14 @@
 | `.toast-header .btn-close`                                                       | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
 | `.modal-header .btn-close`                                                       | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
 | `.offcanvas-header .btn-close`                                                   | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-nav .nav-link.active`                                                   | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-nav .nav-link.show`                                                     | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-expand-sm .navbar-nav .nav-link`                                        | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-expand-md .navbar-nav .nav-link`                                        | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-expand-lg .navbar-nav .nav-link`                                        | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-expand-xl .navbar-nav .nav-link`                                        | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-expand-xxl .navbar-nav .nav-link`                                       | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-expand .navbar-nav .nav-link`                                           | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
 
 ### Departures from the workspace rows
 
@@ -3338,6 +3416,17 @@
 | `form-range` | `.form-range::-moz-range-track`              | `height`             | —                                         | `0.5rem`                                                                                           | `var(--vn-space-4)`                                                                                                                                                                                | tokenized |
 | `form-range` | `.form-range::-moz-range-track`              | `border-radius`      | —                                         | `1rem`                                                                                             | `var(--vn-radius-xlarge)`                                                                                                                                                                          | tokenized |
 
+#### `nav`
+
+| Component | Selector                  | Property                           | Condition | Bootstrap 5.3.8                          | Veneer                                                                      | Departure |
+| --------- | ------------------------- | ---------------------------------- | --------- | ---------------------------------------- | --------------------------------------------------------------------------- | --------- |
+| `nav`     | `.nav`                    | `--bs-nav-link-padding-x`          | —         | `1rem`                                   | `var(--vn-space-8)`                                                         | tokenized |
+| `nav`     | `.nav`                    | `--bs-nav-link-padding-y`          | —         | `0.5rem`                                 | `var(--vn-space-4)`                                                         | tokenized |
+| `nav`     | `.nav-link:focus-visible` | `box-shadow`                       | —         | `0 0 0 0.25rem rgba(13, 110, 253, 0.25)` | `0 0 0 0.25rem color-mix(in srgb, var(--vn-palette-blue) 25%, transparent)` | tokenized |
+| `nav`     | `.nav-pills`              | `--bs-nav-pills-link-active-color` | —         | `#fff`                                   | `var(--vn-palette-white-base)`                                              | tokenized |
+| `nav`     | `.nav-pills`              | `--bs-nav-pills-link-active-bg`    | —         | `#0d6efd`                                | `var(--vn-palette-blue)`                                                    | tokenized |
+| `nav`     | `.nav-underline`          | `--bs-nav-underline-gap`           | —         | `1rem`                                   | `var(--vn-space-8)`                                                         | tokenized |
+
 #### `card`
 
 | Component | Selector | Property                        | Condition | Bootstrap 5.3.8 | Veneer              | Departure |
@@ -3744,6 +3833,7 @@
 | `form-range`   | `.form-range:focus { outline }`                               | `@media (forced-colors: active)`                 | declaration | Under forced colors the ring is drawn as a system-color outline on the host, because the shadow the thumb wears elsewhere is not painted there.                            |
 | `pagination`   | `.page-link:focus { outline }`                                | `@media (forced-colors: active)`                 | declaration | Under forced colors the ring is drawn as a system-color outline, because the shadow it is drawn with elsewhere is not painted there.                                       |
 | `btn-close`    | `.btn-close:focus { outline }`                                | `@media (forced-colors: active)`                 | declaration | Under forced colors the ring is drawn as a system-color outline, because the shadow it is drawn with elsewhere is not painted there.                                       |
+| `nav`          | `.nav-link:focus-visible { outline }`                         | `@media (forced-colors: active)`                 | declaration | Under forced colors the ring is drawn as a system-color outline, because the shadow it is drawn with elsewhere is not painted there.                                       |
 
 ### Outside the ledger
 
@@ -3935,6 +4025,8 @@
 | is-invalid       | variable       | The `--bs-form-select-bg-icon` property carries the invalid mark on a single-value select; its value and the icon map behind it are proved in `tests/src/styles/components/validation.test.ts`.                                                                                                                                                                                                                                                                  | —                     | shipped  |
 | pagination       | selector       | Every official `.pagination`, `.page-link`, and `.page-item` selector ships in the components layer; resolved geometry, states, and stacking are proved in `tests/src/styles/components/pagination.test.ts`.                                                                                                                                                                                                                                                     | —                     | shipped  |
 | pagination       | variable       | Every official `--bs-pagination-*` property is declared, and each size class redeclares its padding, font, and radius; overrides are proved in `tests/src/styles/components/pagination.test.ts`.                                                                                                                                                                                                                                                                 | —                     | shipped  |
+| nav              | selector       | Every official `.nav` selector ships in the components layer, the tabs, pills, underline, fill, justified, and tab-pane rules included, less the `.navbar` combinators recorded under § Styles; resolved behavior is proved in `tests/src/styles/components/nav.test.ts`.                                                                                                                                                                                        | —                     | shipped  |
+| nav              | variable       | Every `--bs-nav-link-*`, `--bs-nav-tabs-*`, `--bs-nav-pills-*`, and `--bs-nav-underline-*` property the release declares is declared on its own class; each one is read beside the property it drives in `tests/src/styles/components/nav.test.ts`.                                                                                                                                                                                                              | —                     | shipped  |
 | engine           | identity       | Cross-cutting engine: `VERSION` `'5.3.8'`; `DATA_KEY` `bs.${NAME}`; `EVENT_KEY` `.${DATA_KEY}`; `eventName(name)` returns `${name}${EVENT_KEY}`                                                                                                                                                                                                                                                                                                                  | —                     | accepted |
 | engine           | option         | Cross-cutting engine: `Default`/`DefaultType` inherited empty from `Config` unless a component overrides                                                                                                                                                                                                                                                                                                                                                         | —                     | accepted |
 | engine           | attribute      | Cross-cutting engine: `data-bs-config` JSON merges with `data-bs-*` attributes read by `Manipulator`; config object wins last                                                                                                                                                                                                                                                                                                                                    | —                     | accepted |
@@ -3956,6 +4048,11 @@
 | engine           | option         | util/config.js: Base `Config` class; `Default: {}`, `DefaultType: {}`; `NAME` getter throws; extended by `BaseComponent`, `Backdrop`, `FocusTrap`, `Swipe`, `TemplateFactory`                                                                                                                                                                                                                                                                                    | —                     | accepted |
 | engine           | method         | util/index.js: `getUID`, `getElement`, `isElement`, `isVisible`, `isDisabled`, `isRTL`, `toType`, `noop`, `parseSelector`, `reflow`, `execute`, `findShadowRoot`, `getNextActiveElement` exported as shared utilities                                                                                                                                                                                                                                            | —                     | accepted |
 | engine           | initialization | util/index.js: `getjQuery` skipped when `document.body` carries `data-bs-no-jquery`; `defineJQueryPlugin` registers `$.fn[NAME]` after `onDOMContentLoaded`                                                                                                                                                                                                                                                                                                      | —                     | accepted |
+| engine           | plugin         | Tab: `[data-bs-toggle="tab\|pill\|list"]` shows the pane its trigger names through `show()`; fires `hide.bs.tab`, `hidden.bs.tab`, `show.bs.tab`, and `shown.bs.tab` with `relatedTarget`, `show` and `hide` cancelable; arrow keys, `Home`, and `End` move focus; writes `role`, `aria-selected`, `tabindex`, and `active`. Owner: J-ENGINE.                                                                                                                    | —                     | accepted |
+| engine           | plugin         | ScrollSpy: `[data-bs-spy="scroll"]` observes the sections its `target` links name through `IntersectionObserver` (`rootMargin`, `threshold`, `offset`, `smoothScroll`); `refresh()`, `dispose()`; fires `activate.bs.scrollspy` with `relatedTarget` and no cancelable event; moves `active`. Owner: J-ENGINE.                                                                                                                                                   | —                     | accepted |
+
+A `plugin` row records a behavior J-ENGINE owns, while the classes that behavior sets ship in the
+cascade and render in markup.
 
 An accepted row records scope; a named Proof step obliges the official recording to agree with the
 row. A shipped selector or variable row requires its official vocabulary less the deferrals under
@@ -4028,6 +4125,9 @@
 follows the Close region, each carrying that key's own specimens. The Form label region carries a
 label above its control with the help text the control names as its description, and a horizontal
 label level with the control beside it at each size and as the legend of a group.
+A Nav region follows the Input group region, carrying the plain links, the tabs over a pane with one
+tab's menu open, the pills, the underline, the filled and justified rows, and the tab panes, each
+state class set in markup.
 
 ## Tests
 
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -58,6 +58,7 @@
 @use 'components/input-group';
 @use 'components/validation';
 @use 'components/button-group';
+@use 'components/nav';
 @use 'components/card';
 @use 'components/breadcrumb';
 @use 'components/pagination';
--- a/tests/app/browser/Showcase.test.ts
+++ b/tests/app/browser/Showcase.test.ts
@@ -18,6 +18,7 @@
 	LIST_GROUP_SPECIMENS,
 	LAYOUT_SPECIMENS,
 	MEDIA_SPECIMENS,
+	NAV_SPECIMENS,
 	PAGINATION_SPECIMENS,
 	PLACEHOLDER_SPECIMENS,
 	PROGRESS_SPECIMENS,
@@ -111,6 +112,7 @@
 				'Breadcrumb',
 				'Close',
 				'Input group',
+				'Nav',
 			])
 			expect(
 				[...host.querySelectorAll('[data-specimen]')].map((element) =>
@@ -142,6 +144,7 @@
 					...BREADCRUMB_SPECIMENS,
 					...CLOSE_SPECIMENS,
 					...INPUT_GROUP_SPECIMENS,
+					...NAV_SPECIMENS,
 				].map((specimen) => specimen.name),
 			)
 			expect(readPerception('Showcase')).toBe('Explore the color mode with the Dark mode control.')
--- a/tests/app/browser/index.test.ts
+++ b/tests/app/browser/index.test.ts
@@ -65,6 +65,9 @@
 			'MEDIA_COPY',
 			'MEDIA_SPECIMENS',
 			'MediaSection',
+			'NAV_COPY',
+			'NAV_SPECIMENS',
+			'NavSection',
 			'PAGINATION_COPY',
 			'PAGINATION_SPECIMENS',
 			'PLACEHOLDER_COPY',
--- a/tests/app/browser/integration.test.ts
+++ b/tests/app/browser/integration.test.ts
@@ -57,6 +57,7 @@
 	LINK_SPECIMENS,
 	LIST_GROUP_SPECIMENS,
 	MEDIA_SPECIMENS,
+	NAV_SPECIMENS,
 	PAGINATION_SPECIMENS,
 	PLACEHOLDER_SPECIMENS,
 	PROGRESS_SPECIMENS,
@@ -1566,6 +1567,102 @@
 		)
 		JOURNAL.record('focus', readName(control), lifted)
 	})
+
+	it('drives a plain nav link to hover and to focus and a resting tab to hover, and photographs each state', async () => {
+		await applyTheme(VARIANT)
+		const base = readSpecimen(mounted.host, 'Nav base')
+		const strip = readSpecimen(mounted.host, 'Nav tabs')
+		const link = requireValue(
+			base.querySelector<HTMLElement>('a.nav-link:not(.disabled)'),
+			'The "Nav base" specimen renders no resting link',
+		)
+		const tab = requireValue(
+			[...strip.querySelectorAll<HTMLElement>('.nav-tabs > .nav-item > .nav-link')].find(
+				(element) => !element.matches('.active, .disabled, .dropdown-toggle'),
+			),
+			'The "Nav tabs" specimen renders no resting tab',
+		)
+		const rest = new Map([
+			['nav-base-hover', readStyle(link, 'color')],
+			['nav-tabs-hover', readStyle(tab, 'border-top-color')],
+		])
+		const hovered = new Map<string, string>()
+		const framed: Array<readonly [string, boolean]> = []
+		// Each hover frame is shot on the whole specimen lifted to the document's start, the placement
+		// the resting cascade scenarios use, because the section renders near the foot of the document
+		// and a pointer placed there does not survive the staging a shot takes. The specimen itself is
+		// lifted rather than a copy, because the pointer finds the link by its accessible name and a
+		// copy would answer to the same one; the marker holds its place in the section. The pane is
+		// staged before the pointer is placed, the Button hover ordering, so the shot finds the link
+		// under the pointer.
+		for (const [scenario, specimen, element, property] of [
+			['nav-base-hover', base, link, 'color'],
+			['nav-tabs-hover', strip, tab, 'border-top-color'],
+		] as const) {
+			const marker = document.createComment(scenario)
+			specimen.before(marker)
+			const lifted = build('div')
+			lifted.append(specimen)
+			document.body.prepend(lifted)
+			try {
+				await stagePane(window.innerWidth, window.innerHeight)
+				await hoverAccessible('link', readName(element))
+				expect(element.matches(':hover')).toBe(true)
+				await waitForAnimations(element)
+				hovered.set(scenario, readStyle(element, property))
+				// The staging a shot takes can re-trigger the link's paint transition, so reduced motion
+				// is staged around the shot and the frame cannot land inside it.
+				await stageMedia({ motion: false })
+				await FRAMES.place(scenario, element, specimen)
+				// The readings that decide the frame are taken in the layout the shot was taken in:
+				// staging the pane again at the shot's geometry puts the link back under the pointer
+				// the capture left where it was.
+				await stagePane(window.innerWidth, window.innerHeight)
+				framed.push([scenario, element.matches(':hover')])
+				expect(readStyle(element, property)).toBe(hovered.get(scenario))
+				await releasePane()
+				await releaseMedia()
+				await releasePointer()
+			} finally {
+				marker.replaceWith(specimen)
+				lifted.remove()
+			}
+		}
+		// The focus frame is a page frame: the ring paints outside the link's border box, and an
+		// element frame crops away the state the scenario claims. Focus is reached with the keyboard,
+		// so the ring read here is the one the keyboard rule paints, and it survives the staging a
+		// pointer does not.
+		link.focus()
+		await pressKeys('{ArrowRight}')
+		expect(link.matches(':focus-visible')).toBe(true)
+		await waitForAnimations(link)
+		const focused = readStyle(link, 'color')
+		const ring = readStyle(link, 'box-shadow')
+		await FRAMES.page('nav-base-focus', link)
+		await stagePane(window.innerWidth, window.innerHeight)
+		framed.push(['nav-base-focus', link.matches(':focus-visible')])
+		expect(readStyle(link, 'box-shadow')).toBe(ring)
+		await releasePane()
+		link.blur()
+		await waitForAnimations(link)
+		// Every frame was taken while its own state still held, each driven state left its resting
+		// paint, and focus paints the hover color with the ring beside it: a frame taken after the
+		// state fell away, or a state rule that stopped repainting, reports here rather than being
+		// written under a name claiming otherwise.
+		expect(framed.filter(([, held]) => !held)).toStrictEqual([])
+		expect([...hovered].filter(([scenario, value]) => value === rest.get(scenario))).toStrictEqual(
+			[],
+		)
+		expect(focused).toBe(hovered.get('nav-base-hover'))
+		expect(ring).not.toBe('none')
+		expect(readStyle(link, 'outline-style')).toBe('none')
+		expect(readStyle(link, 'box-shadow')).toBe('none')
+		expect(readStyle(link, 'color')).toBe(rest.get('nav-base-hover'))
+		ARTIFACT.push(
+			JSON.stringify({ reading: 'nav states', rest: [...rest], hovered: [...hovered], focused }),
+		)
+		JOURNAL.record('hover', readName(tab), String(hovered.get('nav-tabs-hover')))
+	})
 })
 
 describe('refusal', () => {
@@ -1690,6 +1787,7 @@
 				LINK_SPECIMENS,
 				LIST_GROUP_SPECIMENS,
 				MEDIA_SPECIMENS,
+				NAV_SPECIMENS,
 				PAGINATION_SPECIMENS,
 				BUTTON_GROUP_SPECIMENS,
 				PLACEHOLDER_SPECIMENS,
--- a/tests/conformance.test.ts
+++ b/tests/conformance.test.ts
@@ -137,6 +137,7 @@
 			'list-inline',
 			'list-unstyled',
 			'mark',
+			'nav',
 			'offset',
 			'pagination',
 			'placeholder',
@@ -353,7 +354,8 @@
 	// token, plural forms Veneer writes from the singular `spinner` stem and the `placeholder`
 	// stem, so this case maps them the way the forms case maps its own renamed partials. The
 	// passive block and the helpers both load after every forms partial, in the release's own
-	// sequence.
+	// sequence, and each disclosure and navigation partial joins the block at the release's own
+	// position inside it.
 	it('loads the passive block and the helpers in the release order, after every forms partial', () => {
 		const stems: Readonly<Record<string, string>> = Object.freeze({
 			spinners: 'spinner',
@@ -361,6 +363,7 @@
 		})
 		const passiveNames = new Set([
 			'button-group',
+			'nav',
 			'card',
 			'breadcrumb',
 			'pagination',
@@ -380,6 +383,7 @@
 			.map((name) => stems[name] ?? name)
 		expect(passive).toEqual([
 			'button-group',
+			'nav',
 			'card',
 			'breadcrumb',
 			'pagination',
--- a/tests/setup.ts
+++ b/tests/setup.ts
@@ -197,6 +197,13 @@
 	| 'Vertical group'
 	| 'Wrapping toolbar'
 	| 'Waving placeholder'
+	| 'Nav base'
+	| 'Nav tabs'
+	| 'Nav pills'
+	| 'Nav underline'
+	| 'Nav fill'
+	| 'Nav justified'
+	| 'Tab panes'
 
 /**
  * Names one state a journey drives its subject to, or reads that subject in.
@@ -1063,6 +1070,48 @@
 		selector: 'legend.col-form-label',
 		property: 'margin-bottom',
 	}),
+	Object.freeze({
+		scenario: 'nav-base',
+		subject: 'Nav base',
+		selector: '.nav-link.disabled',
+		property: 'color',
+	}),
+	Object.freeze({
+		scenario: 'nav-tabs',
+		subject: 'Nav tabs',
+		selector: '.nav-tabs',
+		property: 'border-bottom-color',
+	}),
+	Object.freeze({
+		scenario: 'nav-pills',
+		subject: 'Nav pills',
+		selector: '.nav-pills .nav-link.active',
+		property: 'background-color',
+	}),
+	Object.freeze({
+		scenario: 'nav-underline',
+		subject: 'Nav underline',
+		selector: '.nav-underline .nav-link.active',
+		property: 'border-bottom-color',
+	}),
+	Object.freeze({
+		scenario: 'nav-fill',
+		subject: 'Nav fill',
+		selector: '.nav-fill .nav-item',
+		property: 'flex-grow',
+	}),
+	Object.freeze({
+		scenario: 'nav-justified',
+		subject: 'Nav justified',
+		selector: '.nav-justified .nav-item',
+		property: 'flex-basis',
+	}),
+	Object.freeze({
+		scenario: 'tab-panes',
+		subject: 'Tab panes',
+		selector: '.tab-content > .active',
+		property: 'display',
+	}),
 ])
 
 /**
@@ -1107,6 +1156,9 @@
 	Object.freeze({ scenario: 'form-floating-empty-focus', subject: 'Form floating empty' }),
 	Object.freeze({ scenario: 'form-select-base-focus', subject: 'Form select base' }),
 	Object.freeze({ scenario: 'form-control-text-focus', subject: 'Form control text' }),
+	Object.freeze({ scenario: 'nav-base-hover', subject: 'Nav base' }),
+	Object.freeze({ scenario: 'nav-base-focus', subject: 'Nav base' }),
+	Object.freeze({ scenario: 'nav-tabs-hover', subject: 'Nav tabs' }),
 ])
 
 /**
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@ -1378,6 +1378,7 @@
 				'list-inline',
 				'list-unstyled',
 				'mark',
+				'nav',
 				'offset',
 				'pagination',
 				'placeholder',
--- a/tests/setupStyles.test.ts
+++ b/tests/setupStyles.test.ts
@@ -103,6 +103,11 @@
 	LIST_GROUP_SELECTORS,
 	LIST_GROUP_SPACE_CASES,
 	MANDATED_TAG_PAIRS,
+	NAV_COLOR_CASES,
+	NAV_LENGTH_CASES,
+	NAV_MARKUP,
+	NAV_ROW_CASES,
+	NAV_SELECTORS,
 	PAGINATION_MARKUP,
 	PAGINATION_PARENT_CASES,
 	PAGINATION_SELECTORS,
@@ -276,6 +281,11 @@
 				'LIST_GROUP_SELECTORS',
 				'LIST_GROUP_SPACE_CASES',
 				'MANDATED_TAG_PAIRS',
+				'NAV_COLOR_CASES',
+				'NAV_LENGTH_CASES',
+				'NAV_MARKUP',
+				'NAV_ROW_CASES',
+				'NAV_SELECTORS',
 				'NEUTRAL_MARKUP',
 				'PAGINATION_MARKUP',
 				'PAGINATION_PARENT_CASES',
@@ -2955,3 +2965,94 @@
 		expect(Object.isFrozen(FORM_SELECT_FOCUS)).toBe(true)
 	})
 })
+
+describe('nav case tables', () => {
+	it('binds the nav selectors, published properties, rows, and markup to the inventory', () => {
+		const recorded = oracle.components.nav.selectors
+		const withheld = new Set(
+			readDeferrals()
+				.filter((row) => row.owner === 'Navbar')
+				.map((row) => row.name),
+		)
+		// The shipped list and the guide's own navbar-bearing rows partition the key's official
+		// vocabulary, so a selector the partial stops emitting has to appear in the deferral table to
+		// stay green, and one the inventory stops recording reddens on the other side.
+		expect(new Set([...NAV_SELECTORS, ...withheld])).toEqual(
+			new Set(recorded.map(({ selector }) => selector)),
+		)
+		expect(NAV_SELECTORS.filter((selector) => withheld.has(selector))).toEqual([])
+		expect([...withheld].filter((name) => !name.includes('.navbar'))).toEqual([])
+		expect(new Set(NAV_SELECTORS).size).toBe(NAV_SELECTORS.length)
+		// Each row names the class the release declares its property on and the value the release
+		// gives it: a length row carries the release's own length, and a color row names the
+		// variable the release reads or the palette token carrying the literal it writes.
+		const declared = new Map(Object.entries(oracle.components.nav.properties))
+		const lengths = NAV_LENGTH_CASES.map((entry) => ({
+			...entry,
+			site: declared.get(entry.property)?.[0],
+		}))
+		const colors = NAV_COLOR_CASES.map((entry) => ({
+			...entry,
+			site: declared.get(entry.property)?.[0],
+		}))
+		for (const { property, scope, site } of [...lengths, ...colors])
+			expect({ property, scope: site?.selector }).toEqual({ property, scope })
+		// A length the release writes in rem is held to the row's pixels at the root size; a length
+		// the release reads from a compatibility variable is resolved by the browser case instead.
+		const measured = lengths.filter(({ site }) => site?.value.endsWith('rem'))
+		expect(measured).not.toStrictEqual([])
+		expect(measured.map(({ site }) => Number.parseFloat(site?.value ?? '') * 16)).toEqual(
+			measured.map(({ pixels }) => pixels),
+		)
+		expect(
+			lengths
+				.filter(({ site }) => !site?.value.endsWith('rem'))
+				.filter(({ site }) => !/^var\(--bs-border-(?:width|radius)\)$/u.test(site?.value ?? '')),
+		).toStrictEqual([])
+		// A border color the release writes as a list of sides leads with the top side, which is the
+		// side the row reads. The palette rows stand for a literal the release writes.
+		const palette = colors.filter(({ source }) => source.startsWith('--vn-palette-'))
+		expect(palette).not.toStrictEqual([])
+		expect(palette.filter(({ site }) => !/^#[\da-f]+$/u.test(site?.value ?? ''))).toStrictEqual([])
+		const named = colors.filter(({ source }) => !source.startsWith('--vn-palette-'))
+		expect(named.map(({ site }) => site?.value.split(' ')[0])).toEqual(
+			named.map(({ source }) => `var(${source})`),
+		)
+		// The published properties are closed over the tables and the readings named beside them:
+		// the weight slot is read by the type case, and the two hover slots by the hover case, because
+		// no resting element paints them. A property the release adds and no reading covers reddens.
+		expect(
+			[
+				...NAV_LENGTH_CASES.map(({ property }) => property),
+				...NAV_COLOR_CASES.map(({ property }) => property),
+				'--bs-nav-link-font-weight',
+				'--bs-nav-link-hover-color',
+				'--bs-nav-tabs-link-hover-border-color',
+			].sort(),
+		).toEqual([...declared.keys()].sort())
+		for (const { name, markup } of NAV_ROW_CASES) {
+			expect(NAV_SELECTORS).toContain(`.${name} .nav-item`)
+			expect(NAV_SELECTORS).toContain(`.${name} > .nav-link`)
+			expect(markup.match(new RegExp(`class="nav ${name}"`, 'gu'))).toHaveLength(2)
+		}
+		expect(NAV_ROW_CASES.map(({ equal }) => equal)).toEqual([false, true])
+		// The shared markup carries every state class the resolved readings address, and every link
+		// in it reaches a destination of its own.
+		for (const fragment of [
+			'class="nav-link disabled"',
+			'type="button" disabled',
+			'class="nav-item show"',
+			'class="dropdown-menu"',
+			'class="nav nav-tabs"',
+			'class="nav nav-pills"',
+			'class="nav nav-underline"',
+		])
+			expect(NAV_MARKUP).toContain(fragment)
+		const targets = [...NAV_MARKUP.matchAll(/href="([^"]+)"/gu)].map((match) => match[1])
+		expect(new Set(targets).size).toBe(targets.length)
+		for (const cases of [NAV_SELECTORS, NAV_LENGTH_CASES, NAV_COLOR_CASES, NAV_ROW_CASES])
+			expect(Object.isFrozen(cases)).toBe(true)
+		for (const cases of [NAV_LENGTH_CASES, NAV_COLOR_CASES, NAV_ROW_CASES])
+			for (const entry of cases) expect(Object.isFrozen(entry)).toBe(true)
+	})
+})
--- a/tests/setupStyles.ts
+++ b/tests/setupStyles.ts
@@ -5622,3 +5622,230 @@
 		}),
 	}),
 ])
+
+/**
+ * Lists every official nav selector the cascade ships, once each.
+ *
+ * @remarks
+ * The release records `.nav-link` twice, unconditionally and under the reduced-motion query, so
+ * the list carries the name once. It is the shipped half of the key's official vocabulary:
+ * `tests/setupStyles.test.ts` adds the navbar-bearing names back from the guide's own deferral table
+ * and holds the union against the inventory, so a selector the partial stops emitting reddens there
+ * rather than passing as one more withheld name. `.card-header-tabs .nav-link.active` is recorded
+ * under this key and written by the card partial, and it is listed here because the key's
+ * accounting is the inventory's rather than the file's.
+ */
+export const NAV_SELECTORS: readonly string[] = Object.freeze([
+	'.nav',
+	'.nav-link',
+	'.nav-link:hover',
+	'.nav-link:focus',
+	'.nav-link:focus-visible',
+	'.nav-link.disabled',
+	'.nav-link:disabled',
+	'.nav-tabs',
+	'.nav-tabs .nav-link',
+	'.nav-tabs .nav-link:hover',
+	'.nav-tabs .nav-link:focus',
+	'.nav-tabs .nav-link.active',
+	'.nav-tabs .nav-item.show .nav-link',
+	'.nav-tabs .dropdown-menu',
+	'.nav-pills',
+	'.nav-pills .nav-link',
+	'.nav-pills .nav-link.active',
+	'.nav-pills .show > .nav-link',
+	'.nav-underline',
+	'.nav-underline .nav-link',
+	'.nav-underline .nav-link:hover',
+	'.nav-underline .nav-link:focus',
+	'.nav-underline .nav-link.active',
+	'.nav-underline .show > .nav-link',
+	'.nav-fill > .nav-link',
+	'.nav-fill .nav-item',
+	'.nav-justified > .nav-link',
+	'.nav-justified .nav-item',
+	'.nav-fill .nav-item .nav-link',
+	'.nav-justified .nav-item .nav-link',
+	'.tab-content > .tab-pane',
+	'.tab-content > .active',
+	'.card-header-tabs .nav-link.active',
+])
+
+/**
+ * Supplies the nav markup the resolved readings share: a row of plain links, a tabs strip, a pills
+ * row, and an underline row.
+ *
+ * @remarks
+ * The plain row carries a resting link, a disabled anchor, and a disabled button, so each spelling
+ * of the disabled state has a subject. Each of the other rows carries an active link, a link whose
+ * item carries `show`, and a resting link, so the active paint and its `show` twin are read against
+ * a link neither reaches. The item carrying `show` in the tabs strip also carries the menu that
+ * hangs from it. Every link announces a name of its own, because a pointer reaches a link by that
+ * name.
+ */
+export const NAV_MARKUP =
+	'<nav class="nav" aria-label="Plain links"><a class="nav-link" href="#one">One</a><a class="nav-link disabled" aria-disabled="true" tabindex="-1" href="#two">Two</a><button class="nav-link" type="button" disabled>Three</button></nav><ul class="nav nav-tabs"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#four">Four</a></li><li class="nav-item show"><a class="nav-link" href="#five">Five</a><ul class="dropdown-menu"><li><a href="#six">Six</a></li></ul></li><li class="nav-item"><a class="nav-link" href="#seven">Seven</a></li></ul><ul class="nav nav-pills"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#eight">Eight</a></li><li class="nav-item show"><a class="nav-link" href="#nine">Nine</a></li><li class="nav-item"><a class="nav-link" href="#ten">Ten</a></li></ul><ul class="nav nav-underline"><li class="nav-item"><a class="nav-link active" aria-current="page" href="#eleven">Eleven</a></li><li class="nav-item show"><a class="nav-link" href="#twelve">Twelve</a></li><li class="nav-item"><a class="nav-link" href="#thirteen">Thirteen</a></li></ul>'
+
+/**
+ * Pins each published nav length against the element that consumes it, the property it drives
+ * there, and the length it resolves to at the published factors.
+ *
+ * @remarks
+ * `scope` is the class the release declares the property on, and `target` addresses the element in
+ * `NAV_MARKUP` whose `reads` property consumes it. The pixels are the release's own lengths, so a
+ * row whose property stopped driving its target reports the resting length it fell back to.
+ */
+export const NAV_LENGTH_CASES = Object.freeze([
+	Object.freeze({
+		property: '--bs-nav-link-padding-x',
+		scope: '.nav',
+		target: 'nav.nav > .nav-link',
+		reads: 'padding-left',
+		pixels: 16,
+	}),
+	Object.freeze({
+		property: '--bs-nav-link-padding-y',
+		scope: '.nav',
+		target: 'nav.nav > .nav-link',
+		reads: 'padding-top',
+		pixels: 8,
+	}),
+	Object.freeze({
+		property: '--bs-nav-tabs-border-width',
+		scope: '.nav-tabs',
+		target: '.nav-tabs',
+		reads: 'border-bottom-width',
+		pixels: 1,
+	}),
+	Object.freeze({
+		property: '--bs-nav-tabs-border-radius',
+		scope: '.nav-tabs',
+		target: '.nav-tabs .nav-link',
+		reads: 'border-top-left-radius',
+		pixels: 6,
+	}),
+	Object.freeze({
+		property: '--bs-nav-pills-border-radius',
+		scope: '.nav-pills',
+		target: '.nav-pills .nav-link',
+		reads: 'border-top-left-radius',
+		pixels: 6,
+	}),
+	Object.freeze({
+		property: '--bs-nav-underline-gap',
+		scope: '.nav-underline',
+		target: '.nav-underline',
+		reads: 'column-gap',
+		pixels: 16,
+	}),
+	Object.freeze({
+		property: '--bs-nav-underline-border-width',
+		scope: '.nav-underline',
+		target: '.nav-underline .nav-link',
+		reads: 'border-bottom-width',
+		pixels: 2,
+	}),
+])
+
+/**
+ * Pins each published nav color against the element that paints it, the property it paints, and
+ * the token whose value the release gives it.
+ *
+ * @remarks
+ * `source` is the compatibility variable the release names, or the palette token carrying the
+ * literal the release writes, so a resting reading is compared with a second declaration that could
+ * disagree with it rather than with the property itself. The hover slots are read under a real
+ * pointer by their own case, because no resting element paints them.
+ */
+export const NAV_COLOR_CASES = Object.freeze([
+	Object.freeze({
+		property: '--bs-nav-link-color',
+		scope: '.nav',
+		target: 'nav.nav > .nav-link:not(.disabled)',
+		reads: 'color',
+		source: '--bs-link-color',
+	}),
+	Object.freeze({
+		property: '--bs-nav-link-disabled-color',
+		scope: '.nav',
+		target: 'nav.nav > .nav-link.disabled',
+		reads: 'color',
+		source: '--bs-secondary-color',
+	}),
+	Object.freeze({
+		property: '--bs-nav-tabs-border-color',
+		scope: '.nav-tabs',
+		target: '.nav-tabs',
+		reads: 'border-bottom-color',
+		source: '--bs-border-color',
+	}),
+	Object.freeze({
+		property: '--bs-nav-tabs-link-active-color',
+		scope: '.nav-tabs',
+		target: '.nav-tabs .nav-link.active',
+		reads: 'color',
+		source: '--bs-emphasis-color',
+	}),
+	Object.freeze({
+		property: '--bs-nav-tabs-link-active-bg',
+		scope: '.nav-tabs',
+		target: '.nav-tabs .nav-link.active',
+		reads: 'background-color',
+		source: '--bs-body-bg',
+	}),
+	Object.freeze({
+		property: '--bs-nav-tabs-link-active-border-color',
+		scope: '.nav-tabs',
+		target: '.nav-tabs .nav-link.active',
+		reads: 'border-top-color',
+		source: '--bs-border-color',
+	}),
+	Object.freeze({
+		property: '--bs-nav-pills-link-active-color',
+		scope: '.nav-pills',
+		target: '.nav-pills .nav-link.active',
+		reads: 'color',
+		source: '--vn-palette-white-base',
+	}),
+	Object.freeze({
+		property: '--bs-nav-pills-link-active-bg',
+		scope: '.nav-pills',
+		target: '.nav-pills .nav-link.active',
+		reads: 'background-color',
+		source: '--vn-palette-blue',
+	}),
+	Object.freeze({
+		property: '--bs-nav-underline-link-active-color',
+		scope: '.nav-underline',
+		target: '.nav-underline .nav-link.active',
+		reads: 'color',
+		source: '--bs-emphasis-color',
+	}),
+])
+
+/**
+ * Pairs each nav row class with the markup it lays out and whether its items share the row equally.
+ *
+ * @remarks
+ * Each markup carries a list whose items hold links and a bare row of links, because the release
+ * writes a rule for each spelling, and each spelling pairs a short label with a long one. The
+ * labels differ so the row class is what decides the widths: a filled row grows each item from its
+ * own content and keeps the difference, and a justified row grows every item from a zero basis and
+ * removes it. One item holds a button rather than an anchor, because a button sizes to its own
+ * content even as a block, so the rule stretching a link across its item is read on the one
+ * element it moves.
+ */
+export const NAV_ROW_CASES = Object.freeze([
+	Object.freeze({
+		name: 'nav-fill',
+		equal: false,
+		markup:
+			'<ul class="nav nav-fill"><li class="nav-item"><a class="nav-link" href="#short">Short</a></li><li class="nav-item"><button class="nav-link" type="button">A button several words long</button></li></ul><nav class="nav nav-fill" aria-label="Filled row"><a class="nav-link" href="#brief">Brief</a><a class="nav-link" href="#lengthy">A link several words long</a></nav>',
+	}),
+	Object.freeze({
+		name: 'nav-justified',
+		equal: true,
+		markup:
+			'<ul class="nav nav-justified"><li class="nav-item"><a class="nav-link" href="#short">Short</a></li><li class="nav-item"><button class="nav-link" type="button">A button several words long</button></li></ul><nav class="nav nav-justified" aria-label="Justified row"><a class="nav-link" href="#brief">Brief</a><a class="nav-link" href="#lengthy">A link several words long</a></nav>',
+	}),
+])
```
