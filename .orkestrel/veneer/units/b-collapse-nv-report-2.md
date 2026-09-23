# Unit NAV (`nv`) report — round 2 (successor brief 3), the fix round

`opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-nv` (branch `unit/nv`,
uncommitted over `87ff1d0`). Effective brief: `tmp/units/nv-brief-3.md`. Every finding in
`nv-audit-verdict.md` § Rulings is closed in the owned files and in the regenerated patch
`tmp/units/nv-shared-2.patch`, which applies to `c3ac297`. Every acceptance criterion reads green in
the validation copy. No deviation stopped the unit; the ancillary choices are recorded in the
Deviation state section.

## Touched files

Owned, in the worktree (round-1 files edited in place):

- `src/styles/components/_nav.scss`: the item-`show` comment, the tab geometry comment, and the
  font-size clause of the header comment take the ruled wording. No rule changed.
- `tests/src/styles/components/nav.test.ts`: the geometry proof takes the ruled title, and it removes
  the item holding the open menu (`.nav-item.dropdown`) before it measures the tab overlap.
- `app/browser/sections/NavSection.ts`: unchanged this round.
- `tests/app/browser/sections/NavSection.test.ts`: asserts the release's open-menu markup and the
  plain `.nav-item.show` tab.
- `tests/app/browser/sections/CardSection.test.ts`: unchanged this round.
- `tmp/units/nv-shared-2.patch`: one unified diff against `c3ac297` over the Shared row.
- `tmp/units/nv-instruments-2/`: this round's instruments and logs.

`git -C /home/user/veneer-nv diff --stat 87ff1d0` printed
`tests/app/browser/sections/CardSection.test.ts | 19 ++++++++++++++++++-`. The other owned files
are untracked; `tmp/units/nv-2-status.txt` holds the status and `tmp/units/nv-2.diff` holds the
full diff, with each untracked file taken through `git diff --no-index /dev/null <path>`.

`git apply --stat tmp/units/nv-shared-2.patch` names `app/browser/Showcase.ts`,
`app/browser/constants.ts`, `app/browser/index.ts`, `guides/veneer.md`, `src/styles/index.scss`,
`tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/conformance.test.ts`, `tests/setup.ts`,
`tests/setupServer.test.ts`, `tests/setupStyles.test.ts`, and `tests/setupStyles.ts`, which is the
brief's Shared row.

## Findings closed, with each site before and after

### Claim 4: the open-menu markup (the `Nav tabs` specimen)

The installed script, re-read this round: `bootstrap/js/src/dropdown.js` around `show()` writes
`aria-expanded` on the toggle and adds `show` to the menu and to the toggle
(`this._menu.classList.add(CLASS_NAME_SHOW)`, `this._element.classList.add(CLASS_NAME_SHOW)`),
never to the item. `bootstrap/js/src/tab.js` in `_toggleDropDown` toggles `active` on the
`.dropdown-toggle`, `show` on the `.dropdown-menu`, and `aria-expanded` on the outer `.nav-item`.

- `app/browser/constants.ts`, `NAV_SPECIMENS` › `Nav tabs`, before:
  `<li class="nav-item dropdown show"><a class="nav-link dropdown-toggle" href="#main" role="button" aria-expanded="true">Tabs filters</a><ul class="dropdown-menu show" data-bs-popper="static">…`.
  After: `<li class="nav-item show"><a class="nav-link" href="#main">Tabs details</a></li><li class="nav-item dropdown"><a class="nav-link dropdown-toggle show" href="#main" role="button" aria-expanded="true">Tabs filters</a><ul class="dropdown-menu show" data-bs-popper="static">…</ul></li>`.
  The plain shown tab sits second, as it does in the pills and underline specimens.
- `NAV_COPY.paragraph`, before: "…the tabs over their strip with a tab whose menu is open…". After:
  "…the tabs over their pane with a shown tab and a tab whose menu is open…".
- The `NAV_SPECIMENS` docblock gains: "The tab whose menu is open carries the markup the dropdown
  script leaves: the toggle and the menu carry `show`, and the item holding them carries none. The
  item carrying `show` in the tabs strip is therefore a plain tab of its own, as it is in the pills
  and the underline rows."
- `NavSection.test.ts`, before: `region.querySelectorAll('.nav-item.dropdown.show > .nav-link')`
  checked `aria-expanded`. After: the case reads the `.nav-tabs > .nav-item.dropdown` item's classes
  as `['nav-item', 'dropdown']`, the toggle's as `['nav-link', 'dropdown-toggle', 'show']` with
  `role="button"` and `aria-expanded="true"`, and the menu's as `['dropdown-menu', 'show']` with
  `data-bs-popper="static"`. It also reads every `.nav-tabs > .nav-item.show` as
  `['nav-item', 'show']` holding one plain `nav-link` child, and it reads no `.dropdown-menu` inside
  an item carrying `show`. `expect(region.querySelector('[style]')).toBeNull()` stays.
- The same arrangement reaches the proof markup (`tests/setupStyles.ts` `NAV_MARKUP`, in the patch):
  the tabs strip carries `<li class="nav-item show"><a class="nav-link" href="#five">Five</a></li>`
  and `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle show" href="#six" role="button" aria-expanded="true">Six</a><ul class="dropdown-menu show" data-bs-popper="static">…</ul></li>`
  in place of round 1's item carrying `show` and the menu together. Its docblock follows. The
  `nav case tables` fragment list adds `class="nav-item dropdown"`,
  `class="nav-link dropdown-toggle show"`, and `class="dropdown-menu show"`, and it refuses
  `class="nav-item dropdown show"`.
- The journey case in `tests/app/browser/integration.test.ts` picks its resting tab with
  `!element.matches('.active, .disabled, .dropdown-toggle, .show > .nav-link')`. Before, the plain
  shown tab would have been the first match, and it paints active under hover.

Failing-first readings, each with round 1's markup put back by `revert-probe.py` and the file
restored after the run:

- `npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/NavSection.test.ts`
  on the round-1 specimen: `Tests  1 failed | 1 passed (2)`,
  `AssertionError: expected [ 'nav-item', 'dropdown', 'show' ] to deeply equal [ 'nav-item', 'dropdown' ]`
  (`specimen-red.log.txt`). With the specimen changed: `Tests  4 passed (4)` in the sections gate.
- `npm run test:setup` on the round-1 `NAV_MARKUP`: `Tests  1 failed | 250 passed (251)`,
  `nav case tables > binds the nav selectors, published properties, rows, and markup to the inventory`
  (`markup-red.log.txt`). With the markup changed: `Tests  251 passed (251)`.

### Claim 6: the partition predicate

`tests/setupStyles.test.ts` › `nav case tables`, before:
`.filter((row) => row.owner === 'Navbar')`. After:
`.filter((row) => row.owner === 'Navbar' && row.name.includes('.nav-link'))`, with the comment
naming why the rows are bounded to the ones naming a nav link.

Partition proof in the validation copy, with DROPDOWN's `Navbar` rows (the
`.navbar-nav .dropdown-menu` family from `dd-shared.patch`) appended to the guide's deferral table by
`dropdown-rows.py`:

- Round-1 predicate: `npm run test:setup` → `Tests  1 failed | 250 passed (251)`, `exit=1`,
  `AssertionError: expected Set{ '.nav', '.nav-link', …(46) } to deeply equal Set{ '.nav', '.nav-link', …(39) }`
  (`partition-red.log.txt`).
- Changed predicate, same rows: `npm run test:setup` → `Tests  251 passed (251)`, `exit=0`
  (`partition-green.log.txt`).
- The rows were removed again before the gates, so the patch carries none of DROPDOWN's rows.

### Claim 7: script behaviour in prose

- Guide `### Nav classes`, before: "An item carrying the `show` class paints its link as the active
  one in the tabs, pills, and underline forms, which is how the tab whose menu is open reads." After:
  "An item carrying the `show` class paints its link as the active one in the tabs, pills, and
  underline forms."
- `_nav.scss`, before: "An item carrying the `show` class is the one whose menu is open, and its tab
  paints as the active one." After: "A link whose item carries the `show` class paints as the active
  one."
- The Tab and ScrollSpy sentence naming engine obligations stands, as ruled.

### Claim 8: the font-size sentence

Guide, before: "`--bs-nav-link-font-size` is read and declared nowhere, and
`--bs-nav-link-font-weight` is declared empty, as the release leaves them, so a link…". After:
"The `.nav-link` rule reads `--bs-nav-link-font-size`, and no rule declares it;
`--bs-nav-link-font-weight` is declared empty, as the release leaves them, so a link takes its
parent's size and weight until a consumer sets either property." The `_nav.scss` header comment
follows in the same voice: "The link rule reads the font size slot and no rule declares it, as the
release leaves it…". The Compatibility cells keep the sibling rows' form, as ruled.

### Objective F1: the conformance order comment

`tests/conformance.test.ts`, before: "…in the release's own sequence, and each disclosure and
navigation partial joins the block at the release's own position inside it." After: "…in the
release's own sequence, and the nav partial joins the block at the release's position between the
button group and the card."

### Subjective F1: one term for the tab geometry

- Guide, before: "Each tab hangs one border width below the strip's own bottom edge, so the active
  tab's bottom border, painted in the body surface, covers the strip line where the two meet and the
  tab opens onto the pane below." After: "Each tab overlaps the strip's bottom border by one border
  width, so the active tab's bottom border covers the strip line where the two meet. That bottom
  border takes the body surface color."
- `_nav.scss`, before: "Each tab hangs one border width over the strip's own bottom edge, …". After:
  "Each tab overlaps the strip's bottom border by one border width, so the active tab's bottom border
  covers the strip line where the two meet."
- `nav.test.ts` title, before: "hangs each tab one border width over the strip, so the active tab
  covers the strip line where they meet". After: "each tab overlaps the strip's bottom border by one
  border width, so the active tab's bottom border covers the strip line where the two meet".
- The guide's proof sentence reads "each tab's overlap with the strip as painted geometry" in place
  of "the tab seam". The isolation sentence reads "does not paint over the tab's focus outline" in
  place of "does not overlap", so "overlap" names the geometry alone.

### Subjective F2: counts in the report

This report states no count; every number in it is a quoted result line or a version.

### R-2: the Tab `plugin` cell

Before: "…arrow keys, `Home`, and `End` move focus; writes `role`, `aria-selected`, `tabindex`, and
`active`. Owner: J-ENGINE." After: "…arrow keys, `Home`, and `End` move focus; writes `role`,
`aria-selected`, `tabindex`, and `active`, `show` on the pane, and in a dropdown, `active` on the
toggle, `show` on the menu, and `aria-expanded` on the item. Owner: J-ENGINE." The sources:
`tab.js` `_activate` adds `active` and, on an element whose `role` is not `tab`, `show`; the
`_toggleDropDown` method writes the dropdown classes and `aria-expanded`. The opening clause reads
"shows the pane its trigger names with `show()`" in place of "through `show()`", so the cell fits
the table's existing Obligation width and the formatter leaves every other row of the table
untouched.

### Claim 3: the executed mutation matrix

The following section carries it.

### The patch base

The guide hunks are regenerated against `c3ac297` by `guide.py`, followed by `oxfmt` on the guide in
the validation copy. `### Nav classes` sits after `### Button toolbar classes` and directly before
`### Card classes`, so it falls between `### Button group classes` and `### Card classes`. The R8
sentence is absent, because DROPDOWN's landing carries it. No § Showcase hunk is present, because
CLOSE-GUIDE's order rule supersedes the region sentence. The `### Card classes` paragraph is
rewritten from the `c3ac297` wording ("…which belongs to Navigation…"). The non-guide hunks are
round 1's, applied to `c3ac297`, with this round's edits
on top.

## Mutation matrix

Instrument: `tmp/units/nv-instruments-2/mutate.py`, run over the control and every mutation in
the validation copy after the final sync (`mutate-run.log.txt`). A styles mutation edits the partial
or the barrel, runs `npm run build:src:styles`, and runs
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=json tests/src/styles/components/nav.test.ts tests/src/styles/components/card.test.ts`.
A setup mutation edits the guide or the case tables and runs the `setup` project. Each restores its
file in a `finally` block, and the script rebuilds the cascade at the end (`restored build 0`).
Every log is `mutation-<name>.log.txt` beside the script and holds the exact edit and the failed
case titles.

Unmutated controls in the same copy: `mutation-control-styles.log.txt` (`"exit": 0`,
`"failedCount": 0`) and `mutation-control-setup.log.txt` (`"exit": 0`, `"failedCount": 0`). No
mutation reddened a `card.test.ts` case.

The layer case is `lays each nav out as an unstyled wrapping row and every shipped selector reaches
the components layer`; it reddens for every selector dropped from a rule. The resting scenarios are
the `CASCADE_KEYS` rows `nav-base`, `nav-tabs`, `nav-pills`, `nav-underline`, `nav-fill`,
`nav-justified`, and `tab-panes`; the driven scenarios are `nav-base-hover`, `nav-base-focus`, and
`nav-tabs-hover`.

The following table maps each recorded selector and condition to its executed mutation, its log, the
cases that went red, its specimen, and its capture scenario.

| Recorded selector or condition | Executed mutation (log `mutation-…`) | Cases that went red in `nav.test.ts` | Specimen | Capture scenario |
| --- | --- | --- | --- | --- |
| `.nav` | layout declarations dropped (`nav-rule-dropped`) | the layer case; the tab overlap case; the `nav-fill` and `nav-justified` row cases | every specimen | `nav-base` and every resting nav row |
| `.nav-link` | padding written as `0.5rem 1rem` (`link-padding-read-past-its-slots`) | the `padding-left` and `padding-top` length cases; the density case | Nav base | `nav-base` |
| `.nav-link` color | color read from `--bs-link-color` (`link-color-read-past-its-slot`); slot fixed to `--vn-palette-blue` (`link-color-fixed-to-the-palette`) | the `--bs-nav-link-color` color case; with the fixed slot also the light and dark mode cases and the light-and-dark case | Nav base | `nav-base` |
| `.nav-link` under `@media (prefers-reduced-motion: reduce)` | transition written without the mixin (`transition-written-without-the-mixin`) | `collapses the link transition under the staged preference and gates it on that condition`, plus the cases that stage reduced motion | Nav base | `nav-base-hover` |
| `.nav-link:hover` | selector dropped (`link-hover-left-out`) | the layer case; `repaints a hovered link, tab, and underline link from their hover slots` | Nav base | `nav-base-hover` |
| `.nav-link:focus` | selector dropped (`link-focus-left-out`) | the layer case; `rings a keyboard-focused link and leaves a pointer-held link to the hover color alone` | Nav base | `nav-base-focus` |
| `.nav-link:focus-visible` | ring written on `:focus` (`ring-on-focus-rather-than-focus-visible`) | the layer case; the ring case | Nav base | `nav-base-focus` |
| `@media (forced-colors: active)` on `.nav-link:focus-visible` (addition) | `forced-ring` omitted (`forced-ring-omitted`) | `outlines the keyboard-focused link at the focus width under forced colors, where its shadow ring is not painted` | Nav base | no frame; the journey stages no forced colors |
| `.nav-link.disabled` | selector dropped (`disabled-anchor-left-out`) | the layer case; the `--bs-nav-link-disabled-color` color case; `refuses the pointer on a disabled link under either spelling and leaves its neighbour reachable` | Nav base | `nav-base` |
| `.nav-link:disabled` | selector dropped (`disabled-button-left-out`) | the layer case; the refused-pointer case | Nav base | `nav-base` |
| `.nav-tabs` | `border-bottom` dropped (`tabs-strip-border-dropped`) | the `--bs-nav-tabs-border-width` length case; the `--bs-nav-tabs-border-color` color case; the tab overlap case; `reads one link and tab paint in light and another in dark` | Nav tabs | `nav-tabs` |
| `.nav-tabs .nav-link` | negative `margin-bottom` dropped (`tab-margin-dropped`) | the tab overlap case | Nav tabs | `nav-tabs` |
| `.nav-tabs .nav-link:hover` | selector dropped (`tab-hover-left-out`) | the layer case; the hover case | Nav tabs | `nav-tabs-hover` |
| `.nav-tabs .nav-link:focus` | selector dropped (`tab-focus-left-out`) | the layer case; `lifts a keyboard-focused tab into its own stacking context with the hover border` | Nav tabs | no frame; same paint as `nav-tabs-hover` |
| `.nav-tabs .nav-link.active` | active `background-color` dropped (`tab-active-paint-dropped`) | the `--bs-nav-tabs-link-active-bg` color case; the tab overlap case; the light and dark mode cases; the light-and-dark case | Nav tabs | `nav-tabs` |
| `.nav-tabs .nav-item.show .nav-link` | selector dropped (`tab-show-item-left-out`) | the layer case; `paints the link whose item carries show as the active link in tabs, pills, and underline` | Nav tabs (the plain shown tab) | `nav-tabs` |
| `.nav-tabs .dropdown-menu` | rule dropped (`tabs-menu-rule-dropped`) | the layer case; `pulls a menu hanging from a tab up by the border width and squares only its top corners` | Nav tabs (the open-menu tab) | `nav-tabs` |
| `.nav-pills` | slot declarations dropped (`pill-slots-dropped`) | the layer case; the `--bs-nav-pills-border-radius` length case; the pill `color` and `background-color` color cases; the light and dark mode cases | Nav pills | `nav-pills` |
| `.nav-pills .nav-link` | `border-radius` dropped (`pill-radius-dropped`) | the layer case; the `--bs-nav-pills-border-radius` length case | Nav pills | `nav-pills` |
| `.nav-pills .nav-link.active` | selector dropped from the paint rule (`pill-active-left-out`) | the layer case; the pill `color` and `background-color` color cases; the show case; the light and dark mode cases | Nav pills | `nav-pills` |
| `.nav-pills .show > .nav-link` | selector dropped (`pill-show-left-out`) | the layer case; the show case | Nav pills | `nav-pills` |
| `.nav-underline` | gap written as `1rem` (`underline-gap-read-past-its-slot`); stroke slot read through `var(--vn-space-1)` (`underline-stroke-read-through-a-space-token`) | the `--bs-nav-underline-gap` length case and the density case; with the stroke slot the density case | Nav underline | `nav-underline` |
| `.nav-underline .nav-link` | rule dropped (`underline-link-rule-dropped`) | the layer case; the `--bs-nav-underline-border-width` length case; the hover case; the density case | Nav underline | `nav-underline` |
| `.nav-underline .nav-link:hover` | selector dropped (`underline-hover-left-out`) | the layer case; the hover case | Nav underline | no frame |
| `.nav-underline .nav-link:focus` | selector dropped (`underline-focus-left-out`) | the layer case; the tab focus case | Nav underline | no frame |
| `.nav-underline .nav-link.active` | selector dropped (`underline-active-left-out`) | the layer case; the `--bs-nav-underline-link-active-color` color case; the show case | Nav underline | `nav-underline` |
| `.nav-underline .show > .nav-link` | selector dropped (`underline-show-left-out`) | the layer case; the show case | Nav underline | `nav-underline` |
| `.nav-fill > .nav-link` | selector dropped (`bare-fill-link-left-out`) | the layer case; `grows every 'nav-fill' item across the row, sharing it equally only when justified` | Nav fill | `nav-fill` |
| `.nav-fill .nav-item` | selector dropped (`fill-item-left-out`) | the layer case; the `nav-fill` row case | Nav fill | `nav-fill` |
| `.nav-justified > .nav-link` | selector dropped (`bare-justified-link-left-out`) | the layer case; the `nav-justified` row case | Nav justified | `nav-justified` |
| `.nav-justified .nav-item` | selector dropped (`justified-item-left-out`); justified written as `flex: 1 1 auto` (`justified-written-as-fill`) | the layer case and the `nav-justified` row case; with the fill spelling the `nav-justified` row case | Nav justified | `nav-justified` |
| `.nav-fill .nav-item .nav-link` | selector dropped (`filled-item-link-left-out`) | the layer case; the `nav-fill` row case | Nav fill | `nav-fill` |
| `.nav-justified .nav-item .nav-link` | selector dropped (`justified-item-link-left-out`) | the layer case; the `nav-justified` row case | Nav justified | `nav-justified` |
| `.tab-content > .tab-pane` | rule dropped (`pane-display-dropped`) | the layer case; `shows the pane carrying active and hides every other pane inside the tab content` | Tab panes; Nav tabs | `tab-panes` |
| `.tab-content > .active` | rule dropped (`active-pane-display-dropped`) | the layer case; the pane case | Tab panes; Nav tabs | `tab-panes` |
| `.card-header-tabs .nav-link.active` (card partial, nav key) | nav loaded after card in the barrel (`nav-loads-after-card`) | `drops the strip line of tabs in a card header, because the card partial loads after the nav partial` | Card tabs | `card-tabs` |
| The `.navbar-nav .nav-link` names and each `.navbar-expand` padding rule (owner `Navbar`) | a deferral row deleted (`navbar-deferral-row-deleted`); a navbar name added to `NAV_SELECTORS` (`navbar-name-added-to-the-shipped-list`) | `setupStyles.test.ts` › `nav case tables > binds the nav selectors, published properties, rows, and markup to the inventory` for each | none | none |

The rows the objective lane named now carry executed mutations: `.nav-underline .nav-link.active`
(`underline-active-left-out`), `.nav-fill .nav-item` (`fill-item-left-out`), `.nav-pills .nav-link`
(`pill-radius-dropped`), `.nav-pills .nav-link.active` (`pill-active-left-out`), and `.nav-tabs`
(`tabs-strip-border-dropped`). Round 1's cap-killed first log and its second log stay retained under
`nv-instruments/` (R-1); this round re-ran every mutation, so no row rests on them.

## Gates on the validation copy

The validation copy was `c3ac297` extracted with `git archive`, `node_modules` hard-linked, committed
as its own base, with the owned files synced (`sync.sh`) and the shared edits written in place. Log:
`gate-<name>.log.txt` beside `gates.sh`.

| Command | Result line |
| --- | --- |
| `npm run format:check` | `All matched files use the correct format.`, `exit=0` |
| `npm run lint:check` | no findings printed, `exit=0` |
| `npm run check` | every project, `exit=0` |
| `npm run build:src` | `✓ built in 2.58s`, `exit=0` |
| `npm run test:setup` | `Tests  251 passed (251)`, `exit=0` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/nav.test.ts` | `Tests  35 passed (35)`, `exit=0` |
| `npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/NavSection.test.ts tests/app/browser/sections/CardSection.test.ts` | `Tests  4 passed (4)`, `exit=0` |
| `npm run test:conformance` | `Tests  22 passed (22)`, `exit=0` |
| `npm run test:guides` | `Tests  19 passed (19)`, `exit=0` |
| `npm run test:policy` | `Tests  109 passed \| 1 skipped (110)`, `exit=0` |

Timing observation: inside the chain run, `npm run test:setup` failed one case,
`tests/setupServer.test.ts > server setup > records and reads official control state and rejects contradicted or absent obligation steps`,
with `Error: Test timed out in 10100ms` (`gate-setup-chain.log.txt`). Sibling units' vitest and
journey processes were running on the host at the time (`ps` showed `veneer-dd`, `veneer-ca`, and
`veneer` runs). The same command re-run alone read `Tests  251 passed (251)`. That case is outside
this unit's delta. The deciding re-run is yours.

## `git apply --check`

After `git -C tmp/probe/base apply -R` returned the copy's shared files to `c3ac297` (status then
listed only the owned files), `git -C tmp/probe/base apply --check tmp/units/nv-shared-2.patch`
printed nothing and ended `exit=0`, run against a copy of the patch staged at that relative path.
The verbose run over the worktree's patch checked every Shared-row file and ended `exit=0`
(`apply-check.log.txt`).

## Journey observations

The journey ran in the validation copy after the final sync, without `CAPTURE=1`, through
`journey.sh` (round 1's script pointed at the validation copy):

- `light-390`: `Tests  1 failed | 38 passed (39)`
- `light-1280`: `Tests  1 failed | 38 passed (39)`
- `dark-390`: `Tests  1 failed | 38 passed (39)`
- `dark-1280`: `Tests  1 failed | 38 passed (39)`

The failure is the census case at every variant,
`matrix > reads the mounted class and style populations with their published controls`,
`AssertionError: expected [ 'dropdown', 'dropdown-item' ] to deeply equal []`. That case waits on
DROPDOWN's partial (round 1's D3); `c3ac297` carries no `_dropdown.scss`. The nav case `drives a
plain nav link to hover and to focus and a resting tab to hover, and photographs each state` passed
at every variant with the plain shown tab in the strip.

## Deviation state

No stop. Ancillary choices, recorded:

- The plain shown tab's label is "Tabs details", and it sits second in the strip, after the active
  tab and before the open-menu tab.
- The proof markup `NAV_MARKUP`, its docblock, and its fragment list take the release's open-menu
  arrangement too, so the proof and the specimen carry one arrangement. The geometry case therefore
  removes `.nav-item.dropdown` rather than `.nav-item.show`. These changes sit in shared files, inside
  the patch.
- The journey's resting-tab filter excludes a link whose item carries `show`, because the plain
  shown tab paints active and its hover changes nothing. This change is in the patch.
- Added mutations beyond the five named rows (`pill-slots-dropped`, `underline-link-rule-dropped`,
  `disabled-anchor-left-out`, `fill-item-left-out`, `bare-justified-link-left-out`,
  `justified-item-left-out`, `filled-item-link-left-out`, `justified-item-link-left-out`), so every
  matrix row names a mutation of its own selector's rule.
- The Tab cell's opening clause reads "with `show()`" so the row fits the table's existing width.
- The header comment in the `_nav.scss` partial takes the claim 8 voice for the font-size clause.

## Instruments

`/home/user/veneer-nv/tmp/units/nv-instruments-2/`: `guide.py` (the guide edits, each anchor
asserted unique), `sync.sh`, `dropdown-rows.py` (DROPDOWN's `Navbar` rows for the partition proof),
`revert-probe.py` (the failing-first readings), `mutate.py`, `gates.sh`, `journey.sh`, and every log
this report names. `tmp/probe/` was deleted before this report.

## Review evidence

- `/home/user/veneer-nv/tmp/units/nv-shared-2.patch`
- `/home/user/veneer-nv/tmp/units/nv-2.diff`
- `/home/user/veneer-nv/tmp/units/nv-2-status.txt`
- `/home/user/veneer-nv/tmp/units/nv-instruments-2/`
