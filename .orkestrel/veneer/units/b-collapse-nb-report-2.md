# Unit NAVBAR (`nb`) round 2 report

I worked as `opus` on Opus 5.5, a native subagent and the sole writer in `/home/user/veneer-nb` (branch `unit/nb`, uncommitted over `a658879`). The effective brief is `/home/user/veneer-nb/tmp/units/nb-brief-2.md`. I committed, pushed, and installed nothing, and I ran no `git checkout`, `restore`, `stash`, `reset`, or `clean`. I did not edit `tests/setupPolicy.ts` or `tests/policy.test.ts`.

**Report file (D8).** I did not write `tmp/units/nb-report-2.md`, and nothing is under `tmp/probe/`. My harness instructions forbid a subagent from writing a report `.md` file, so this handback is the report text. Write it to that path when you retain it.

## Outcome

Every round-1 finding is closed, in the owned files and in the revised patches:
- `/home/user/veneer-nb/tmp/units/nb-shared-2.patch`
- `/home/user/veneer-nb/tmp/units/nb-offlimits-2.patch`
- `/home/user/veneer-nb/tmp/units/nb-retirement-2.patch`

Each patch has an `index` line per file and supersedes its round-1 patch whole.

Every criterion reads green on the stage. The stage is the worktree with the shared and off-limits patches applied. Every proof still reddens under its mutation. The stage and the retirement copy are deleted.

The journey census stays red until ACCORDION lands (D7). The worktree's own `npm run check` exits 2 until the shared patch applies (D1).

**Needs your ruling or ordering before landing:**
- **D2:** the `nav-list` off-limits patch.
- **D6 and D7:** land ACCORDION first. Then apply the retirement patch, together with ACCORDION's retained-variables guide paragraph.

## Findings closed

### The retained readings (claims 2, 3, 5)

- **Before:** `nb-gates.log.txt` kept only summary lines. No log carried the built-output reading, the theme red and green runs, the retirement asset pair, the journeys, or the census probe.
- **After:** every log is under `/home/user/veneer-nb/tmp/units/nb-instruments-2/logs/`.

| Log | Reading |
| --- | --- |
| `built-cascade.log.txt` | `npm run build:src` exits 0. `grep -c navbar-light dist/src/styles/index.css` prints `0` (grep exits 1 when it counts no line). Each media block is listed: `@media (width>=576px){.navbar-expand-sm`, `(width>=768px){.navbar-expand-md`, `(width>=992px){.navbar-expand-lg`, `(width>=1200px){.navbar-expand-xl`, `(width>=1400px){.navbar-expand-xxl`. The unconditional rule is `}.navbar-expand{flex-wrap:nowrap;justify-content:flex-start}`. |
| `theme-red-green.log.txt` | The `a658879` case against the stage cascade: exit 1, `Tests 1 failed \| 5 passed (6)`, `AssertionError: expected '' to contain 'data:image/svg+xml'`. The rewritten case: exit 0, `Tests 6 passed (6)`. The file was restored and its digest checked. |
| `retirement-asset.log.txt` | With an accordion icon declared in the retirement copy's dark scope: exit 1, `Tests 1 failed \| 5 passed (6)`, `expected 'url("data:image/svg+xml,%3csvg xmlns=…' to be ''`. Without it: exit 0, `Tests 6 passed (6)`. `_theme.scss` was restored and its digest checked, and the copy was deleted. |
| `journey-light-390.log.txt`, `journey-dark-1280.log.txt` | Each: exit 1, `Tests 1 failed \| 40 passed (41)`. The only failure is `matrix > reads the mounted class and style populations with their published controls`, with `expected [ 'collapsed' ] to deeply equal []`. It stays red until ACCORDION lands (D7). |
| `census-probe.log.txt` | A stage-only probe partial wrote `.accordion-button:not(.collapsed)`: exit 0, `Tests 1 passed \| 40 skipped (41)`. `index.scss` has the same digest before and after, and the probe partial is deleted. |

### The class specimen's surface (claim 4)

- **Site:** `NAVBAR_SPECIMENS` in `app/browser/constants.ts` (shared patch), the `Navbar inverted class` entry.
  - **Before:** `<div class="card" data-bs-theme="dark"><nav class="navbar navbar-dark" aria-label="Dark class bar">`
  - **After:** `<div class="card" data-bs-theme="dark"><nav class="navbar navbar-dark" data-bs-theme="light" aria-label="Dark class bar">`
  - The `Navbar inverted` bar keeps its own dark attribute and its card.
- **Section proof:** `NavbarSection.test.ts` now asserts that the bar under `[data-specimen="Navbar inverted class"]` carries both `navbar-dark` and `data-bs-theme="light"`. A comment gives the reason.
- **Why, in the `NAVBAR_SPECIMENS` doc block:** "The card's dark scope alone paints a plain bar's brand white, so the class bar sets its own scheme to light, and the white it shows is the class's paint."
- **Why, in the guide's region sentence (`### Navbar classes`):** "The card's dark scope alone paints a plain bar's brand white, so the class bar sets its own scheme to light to show the class's paint."
- **Settling run (`class-surface.log.txt`).** The styles project loads the built `dist/src/styles/index.css` file, so the instrument rebuilds the cascade for each state.

| Partial state | Built `.navbar-dark` occurrences | Round-2 markup (light attribute) | Round-1 markup (no attribute) |
| --- | --- | --- | --- |
| `.navbar-dark,` selector line removed | `0` | brand `rgb(0, 0, 0)` | brand `rgb(255, 255, 255)` |
| as shipped | `1` | brand `rgb(255, 255, 255)` | brand `rgb(255, 255, 255)` |

The class bar reads black without the rule and white with it. The round-1 markup reads white either way, which reproduces the reviewer's finding.

### The copy (claim 4)

- **Site:** `NAVBAR_COPY.paragraph`.
  - **Before:** "…each state set as a class in markup."
  - **After:** "…each state set in markup."
- **Decision:** the section case title changed to match. It read "…every state class in markup…" and now reads "renders every navbar form and every state set in markup through the shared section contract".

### The guide nouns and sentences (claim 7)

All sites are in `guides/veneer.md` (shared patch).

In `### Navbar classes`:
- "answer to `--vn-factor-density`" → "answer to the `--vn-factor-density` factor".
- "read `--vn-size-5`" → "read the `--vn-size-5` token".
- "mixes over `--vn-palette-white-base`" → "mixes over the `--vn-palette-white-base` token".
- The literal-inset sentence becomes two sentences: "The brand's `0.3125rem` block inset keeps the release's literal, because no scale token resolves to it. The toggler's `0.25rem` focus width keeps the release's literal too, because the published focus width is a narrower ring."

In the retained-variables pair:
- "retunes `--bs-accordion-btn-icon` and `--bs-accordion-btn-active-icon` under" → "retunes the `--bs-accordion-btn-icon` and `--bs-accordion-btn-active-icon` properties under".
- "`--bs-form-select-bg-img`, `--bs-form-switch-bg`, and `--bs-navbar-toggler-icon-bg` are declared" → "The `--bs-form-select-bg-img`, `--bs-form-switch-bg`, and `--bs-navbar-toggler-icon-bg` properties are declared".

In § Dropdown classes:
- "the navigation menu names ship from the navbar partial" → "the tab and navbar menu names ship from the nav and navbar partials". The `.nav-tabs .dropdown-menu` rule is in `_nav.scss`, and no deferral row names it.

**Sweep:** I re-read every sentence the patch adds for a code token without its noun. The guide has no further hit.

### The comments (claim 8)

Sites the brief names:
- **`_navbar.scss`,** the comment above `.navbar-nav .nav-link.active` (around line 71):
  - Before: "A link carrying `show` is the toggle of an open menu, and it paints as the current link."
  - After: "A link carrying the `show` class paints as the current link."
- **`NAVBAR_SPECIMENS` doc block:**
  - "whose toggle and menu carry `show`" → "…carry the `show` class".
  - "Every state is a class written in the markup" → "Every state is written in the markup", because the attribute is not a class.
- **`NAVBAR_MARKUP` doc comment** in `tests/setupStyles.ts`: "the toggle and the menu carry `show`" → "…carry the `show` class".
- **`nav-list` mixin comment** (off-limits patch): "link colors, and direction" → "link colors, and flex flow".
- **`NAVBAR_SELECTORS` doc comment:**
  - Before: "…ships, once each." and "The release records `.navbar-toggler` twice, unconditionally and under the reduced-motion query, so the list carries the name once".
  - After: "…ships, with no name repeated." and "The release records `.navbar-toggler` unconditionally and again under the reduced-motion query. The list carries the name for the unconditional rule, and the reduced-motion rule, which selects the same name, adds no entry."

Decided within the patch's own lines, so the patch adds no tally and no bare token:
- **`NAV_SELECTORS` doc comment.** The patch already rewrites these lines, and they carried the same "once each", "twice", and "carries the name once". I rewrote them the same way.
- **`_tokens.scss` comments:**
  - "across both modes" → "across the light and dark modes".
  - "`$dark` entries" → "entries of the `$dark` map".
  - "`guides/veneer.md` under Tokens records" → "the `guides/veneer.md` guide records the limit under Tokens".
  - "a key `$dark` does not declare and read the `@error` `_theme.scss` raises" → "a key the `$dark` map does not declare and read the `@error` rule the `_theme.scss` partial raises".
- **`NAVBAR_LENGTH_CASES` doc comment:**
  - "`scope` is…" → "The `scope` field names…".
  - "`target` addresses the element whose `reads` property" → "the `target` field addresses the element whose property named by the `reads` field".
  - "one expanded and one collapsed bar" → "an expanded and a collapsed bar".
- **`NAVBAR_COLOR_CASES` doc comment:** "as `rgba(…)`," → "as the `rgba(…)` expression,".
- **`NAVBAR_DARK_CASES` doc comment:** "`value` is… holds against both recorded dark rules" → "The `value` field is… the `tests/setupStyles.test.ts` proof holds against each recorded dark rule".
- **Section-proof comments:** "carries `show`" → "carries the `show` class", and "through `aria-current`" → "through the `aria-current` attribute".

### The dark-spelling matrix (INLINE-CASE-TABLES)

- **Before:** `navbar.test.ts` declared the matrix inline (around line 399): `it.each([{ name: 'the dark class', markup: … }, { name: "the bar's own dark attribute", markup: … }])`.
- **After, in `tests/setupStyles.ts`:** `NAVBAR_DARK_SPELLING_CASES` holds `{ name, selector, markup }` rows. The array and every row are frozen, and the table is documented.
  - `selector` is `.navbar-dark` on the class row and `.navbar[data-bs-theme=dark]` on the attribute row.
  - The `selector` field is my addition. It lets the setup proof bind the row order to the inventory, and it lets the browser proof check that each bar matches its rule.
- **After, in `navbar.test.ts`:**
  - The case is `it.each(NAVBAR_DARK_SPELLING_CASES)`, and its title is unchanged: "retunes every color and toggler slot to the release value under $name".
  - It adds `expect([light.matches(selector), retuned.matches(selector)]).toEqual([false, true])`.
  - The inner loop variable is renamed to `target`, because `selector` would have shadowed the row field.
- **After, in `tests/setupStyles.test.ts`:**
  - The import list and the export-list case name the table.
  - The navbar case-tables case filters the inventory's navbar rules, other than `.navbar`, that declare a `--bs-navbar-*` slot. It holds the rows' selectors against those rules in recorded order.
  - It holds each such rule's declarations against `NAVBAR_DARK_CASES`, which replaces the literal selector list.
  - It checks that each row's markup ends with `${NAVBAR_MARKUP}</nav>`.
  - It adds the table to the table-freeze loop and the row-freeze loop.

### The report (claim 8, REPORT-COUNTS)

- This report states no count of a growable set and names no item by its position.
- It drops the "disjoint" claim. The expand rules come from `breakpoint-each`, so the no-infix rules come before the media blocks. The expand classes declare identical values, so the order changes no resolved value.
- The `build:src` row cites `built-cascade.log.txt` and `gate-build-src.log.txt`.
- Every deviation has its fields.
- The recorded choices are bounded in the following section.

## Recorded choices, bounded

- **The card under each inverted specimen.**
  - Choice: both inverted specimens sit on a `.card` carrying `data-bs-theme="dark"`, because the bar paints no surface of its own.
  - Cost: the card's dark scope sets the emphasis channels to white, so on its own it masks the class's retune (`class-surface.log.txt`).
  - Bound: the class bar sets `data-bs-theme="light"`. The attribute bar's own attribute sets the same dark scope, so for that bar the card adds only the surface.
- **The dropdown compatibility cell.** Dropping "and navigation" from "less the split-toggle and navigation names" is the correction that makes the cell true: the navbar menu names ship with this unit. It is not width housekeeping.

## Proof matrix

The round-1 selector matrix (`/home/user/scaffold/.orkestrel/veneer/units/b-collapse-nb-report.md` § Proof matrix) stands, with the following changes:
- The `.navbar-dark` and `.navbar[data-bs-theme=dark]` rows read through `NAVBAR_DARK_SPELLING_CASES`.
- The `Navbar inverted class` specimen carries the light attribute.
- The xxl-frame row stands. Your records correct R16 for the xl bar.

I re-ran every mutation in round 2 on the stage, each restored and its digest checked:
- Instrument: `/home/user/veneer-nb/tmp/units/nb-instruments-2/mutate.py`
- Log: `/home/user/veneer-nb/tmp/units/nb-instruments-2/logs/mutations.log.txt`

The navbar filters run `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/navbar.test.ts -t "<filter>"`.

| Mutation | Filter or command | Reading |
| --- | --- | --- |
| each expand class gated at its neighbouring boundary | `expands the` | exit 1, `6 failed \| 1 passed \| 33 skipped (40)` |
| the whole expand loop wrapped in the sm boundary, which gates the no-infix class (relabelled) | `carrying no infix` | exit 1, `1 failed \| 39 skipped (40)` |
| `.navbar-dark` dropped from the dark list, against the moved rows | `retunes every color` | exit 1, `1 failed \| 1 passed \| 38 skipped (40)`; the failure is `…under 'the dark class'` (same reading as round 1) |
| the toggler asset left at theme scope | `dark icon\|dark icons`, with the theme proof | exit 1, `2 failed \| 44 skipped (46)` |
| the `75vh` fallback missing | `clamps the scrolling list` | exit 1, `1 failed \| 39 skipped (40)` |
| the `--bs-nav-link-*` reassignment dropped | `paints every link inside the list` | exit 1, `1 failed \| 39 skipped (40)` |
| the current and open link rule dropped | same | exit 1, `1 failed \| 39 skipped (40)` |
| the expanded `.offcanvas` rule dropped | `offcanvas panel` | exit 1, `1 failed \| 39 skipped (40)` |
| the expanded `.offcanvas-header` rule dropped | `offcanvas panel` | exit 1, `1 failed \| 39 skipped (40)` |
| the toggler ring dropped | `rings the focused toggler` | exit 1, `1 failed \| 39 skipped (40)` |
| the `forced-ring` include omitted | `under forced colors` | exit 1, `1 failed \| 39 skipped (40)` |
| the toggler transition written bare | `collapses the toggler transition` | exit 1, `1 failed \| 39 skipped (40)` |
| the collapsed list's menu rule dropped | `opens a menu in the column flow\|expands the .sm. bar` | exit 1, `2 failed \| 38 skipped (40)` |
| the `.navbar-collapse` rule dropped | `…\|expands the .md. bar` | exit 1, `2 failed \| 38 skipped (40)` |
| a `.navbar-light` rule written | `writes no rule for the light class` | exit 1, `1 failed \| 39 skipped (40)` |
| the brand hover and focus rule dropped | `hover slots` | exit 1, `1 failed \| 39 skipped (40)` |
| the `.navbar-text a` rule dropped | `paints every link…\|hover slots` | exit 1, `2 failed \| 38 skipped (40)` |
| the text inset written as a literal | `density factor` | exit 1, `1 failed \| 39 skipped (40)` |
| the dark icon rule dropped | `dark icon` | exit 1, `1 failed \| 39 skipped (40)` |
| `--bs-navbar-padding-y` removed from `.navbar` (relabelled) | `navbar-padding-y. and moves` | exit 1, `1 failed \| 39 skipped (40)` |
| the `!important` flag dropped from the expanded content's `display` | `npm run test:conformance -- -t "carries the priority"` | exit 1, `1 failed \| 21 skipped (22)` |
| the collapsed specimen's toggler drops `collapsed` | section proof | exit 1, `1 failed \| 1 passed (2)` |
| the opened specimen's content drops `show` | section proof | exit 1, `1 failed \| 1 passed (2)` |
| the inverted-class specimen drops `navbar-dark` | section proof | exit 1, `1 failed \| 1 passed (2)` |
| the inverted-class specimen drops its light attribute | section proof | exit 1, `1 failed \| 1 passed (2)` |
| the dark-spelling table left unfrozen | setup project, `-t "binds the navbar selectors"` | exit 1, `1 failed \| 112 skipped (113)` |
| a dark-spelling row left unfrozen | same | exit 1, `1 failed \| 112 skipped (113)` |
| the dark-spelling rows reordered | same | exit 1, `1 failed \| 112 skipped (113)` |
| the dark-spelling rows reordered, read by the browser proof | `retunes every color` | exit 0, `2 passed \| 38 skipped (40)`. The browser proof reads each row on its own, so the setup proof is what binds the order. |
| controls, unmutated | navbar with theme; section; setup file | `46 passed (46)`; `2 passed (2)`; `113 passed (113)` |

## Gate exits

**Stage.**
- Script: `/home/user/veneer-nb/tmp/units/nb-instruments-2/gates.sh`
- Summary: `/home/user/veneer-nb/tmp/units/nb-instruments-2/logs/gates.log.txt`
- Each command's full output: `logs/gate-<name>.log.txt`

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | All matched files use the correct format. |
| `npm run lint:check` | 0 | no findings |
| `npm run check` | 0 | every project |
| `npm run build:src` | 0 | built; see `built-cascade.log.txt` |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/navbar.test.ts tests/src/styles/theme.test.ts tests/src/styles/components/container.test.ts` | 0 | `Tests 71 passed (71)`, with the round-1 case titles |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/NavbarSection.test.ts` | 0 | `Tests 2 passed (2)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | 0 | `Tests 113 passed (113)` |
| `npm run test:conformance` | 0 | `Tests 22 passed (22)` |
| `npm run test:guides` | 0 | `Tests 19 passed (19)` |
| `npm run test:policy` | 0 | `Tests 109 passed \| 1 skipped (110)` |
| `npm run test:app` | 0 | `Tests 78 passed (78)` |
| `npm run test:setup` (observation) | 0 | `Tests 254 passed (254)` |

**Retirement copy.**
- Script: `/home/user/veneer-nb/tmp/units/nb-instruments-2/retire.sh`, which uses `retire.py`.
- Log: `/home/user/veneer-nb/tmp/units/nb-instruments-2/logs/retire-gates.log.txt`

| Command | Exit | Reading |
| --- | --- | --- |
| scoped `oxfmt --check` over the retired files and `tests/setupStyles.ts` | 0 | All matched files use the correct format. |
| `npm run lint:check` | 0 | no findings |
| `npm run check` | 0 | every project |
| `npm run build:src` | 0 | built |
| setup-project `tests/setupStyles.test.ts` | 0 | `Tests 112 passed (112)`; the undeclared-key case is retired |
| styles over `navbar.test.ts`, `theme.test.ts`, `tokens.test.ts`, `container.test.ts` | 0 | `Tests 102 passed (102)` |
| `npm run test:conformance` | 0 | `Tests 22 passed (22)` |

**Worktree, owned files only.**
- `npm run format:check`: exit 0 (`logs/worktree-format-check.log.txt`).
- `npm run lint:check`: exit 0 (`logs/worktree-lint-check.log.txt`).
- `npm run check`: exit 2 (`logs/worktree-check.log.txt`, D1).

**Observation: processes were killed from outside on this host.** Other sessions' Vitest and Codex processes were live throughout. Three of my runs were stopped by something outside the unit:
- A class-surface probe run was terminated (exit 143). I re-ran it.
- The mutation run's Python process stopped at 18:28 UTC during the ring mutation, before its restore ran. I restored the stage partial from the worktree (`cmp` equal), recorded the stop in `mutations.log.txt`, made the instrument trap `SIGTERM`, and resumed from that mutation.
- The light-390 journey inside `journey.sh` was killed with `SIGKILL` (exit 137). It is kept as `journey-light-390-killed.log.txt`, and `journey-rerun.sh` re-ran it alone.

No final reading rests on a killed run.

## Patches

**`nb-shared-2.patch`**
- `git apply --check` passes in the worktree.
- Applied with the off-limits patch to `git archive a658879`, it reproduces every stage file (`cmp` equal).
- The `index` lines name the `a658879` blobs. For example, `index 605d1a5..4284a28` for `guides/veneer.md`, and `git rev-parse --short a658879:guides/veneer.md` prints `605d1a5`.
- Changes from round 1 are confined to these files: `app/browser/constants.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `guides/veneer.md`, and `src/styles/_tokens.scss`, as the findings describe.
- The ledger and addition rows, the `tests/setup.ts` registry rows, and the `integration.test.ts` hunks are identical to round 1.

**`nb-offlimits-2.patch`**
- `git apply --check` passes in the worktree. The index lines are `de17941..fabb089` for `_mixins.scss` and `93abb90..edd8b00` for `_nav.scss`.
- Its only change from round 1 is the mixin comment's "flex flow".

**`nb-retirement-2.patch`**
- Its base is the simulated post-ACCORDION state. That state is the stage after the shared and off-limits patches, followed by `retire.py … simulate`, which removes ACCORDION's `$assets` rows and adds its variables to `COMPONENT_DARK_ASSETS`.
- `git apply --check` passes against that state.
- Its only content change from round 1 is the reworded `$assets` comment that it deletes. The hunk contexts moved with the shared patch.
- Apply it with three-way resolution after ACCORDION.

**Instruments** are under `/home/user/veneer-nb/tmp/units/nb-instruments-2/`: `class-surface.sh`, `class-surface.test.ts` (copied into the stage only for each run), `readings.sh`, `mutate.py`, `patches.sh`, `gates.sh`, `journey.sh`, `journey-rerun.sh`, `retire.sh`, and `retire.py`.

## Deviations

**D1: the criteria read only with the shared patch applied.** Standing.
- Expected: owned-file gates green in the worktree.
- Found: the owned files import `NAVBAR_*` symbols that only the shared patch adds.
- Evidence: `npm run check` in the worktree exits 2. Every error is in `NavbarSection.ts`, `NavbarSection.test.ts`, or `navbar.test.ts`. Each is a missing shared export (TS2305, TS2724) or an implicit `any` that follows from one (`logs/worktree-check.log.txt`).
- Done: every gate ran on the stage.
- Not done: the worktree check stays red until you apply the shared patch.

**D2: the navbar list block crosses the duplication floor.** Standing.
- Expected: `.navbar-nav` written inline.
- Found: the round-1 reading. Inline, `-t "repeats no partial"` gives `1 failed | 112 skipped (113)`. Through the mixin it gives `1 passed | 112 skipped (113)`.
- Evidence: the round-1 retained log. In round 2, the stage with `nb-offlimits-2.patch` applied passes the setup file (`113 passed (113)`).
- Done: the `nav-list` repair is in `nb-offlimits-2.patch`.
- Not done: `_mixins.scss` and `_nav.scss` are untouched. They need your ruling.

**D3: R16 and the `navbar-expand-xl` frame.** Closed by your records.
- Expected: no xl frame.
- Found: the xl bar expands at 1280.
- Evidence: the case `expands the sm through xl bars at the wide journey width…` stays green, and it reddens under the neighbouring-boundary mutation.
- Done: the guide's limit sentence names only the xxl bar. The audit verdict records R16 as corrected.

**D4: the brief's styles-config command matches no test file.** Closed.
- Expected: round 1's criterion-5 command to find the setup proof.
- Found: that config includes only `tests/src/styles/**`.
- Done: this round's brief names the setup-project command, which exits 0 on the stage and on the retirement copy.

**D5: dark resting rows renamed.** Standing; the reviewer held it.
- Expected: `Navbar dark` and `Navbar dark class`.
- Found: `tests/setup.test.ts` refuses a mode token in a scenario name.
- Done: the rows ship as `Navbar inverted` and `Navbar inverted class`.

**D6: the `$assets` retirement waits for ACCORDION.**
- Expected: the map, its `_theme.scss` walk, and the undeclared-key case retired in this unit.
- Found: at `a658879`, the map still holds `accordion-icon` and `accordion-active-icon`.
- Evidence: `retire-gates.log.txt` and `retirement-asset.log.txt`.
- Done: the shared patch removes the navbar row. `nb-retirement-2.patch` retires the rest against the simulated state, and its gates are green.
- Not done: `_theme.scss` and the undeclared-key case are unedited in the worktree. The guide's accordion paragraph becomes false when the retirement applies, so ACCORDION's retained-variables paragraph must land with it.

**D7: the journey census waits on ACCORDION.**
- Expected: the journey green on light-390 and dark-1280.
- Found: `Tests 1 failed | 40 passed (41)` on each variant, where the census reads `collapsed` as undeclared. No shipped rule selects the `collapsed` class until ACCORDION's `.accordion-button:not(.collapsed)` rule ships.
- Evidence: `journey-light-390.log.txt`, `journey-dark-1280.log.txt`, and `census-probe.log.txt` (the probe turns it green: `1 passed | 40 skipped (41)`).
- Done: every other journey case passes on both variants, including the navbar driven case and the resting cascade case.
- Not done: the census stays red until ACCORDION lands.

**D8: no report file.**
- Expected: this report at `tmp/units/nb-report-2.md`, or under `tmp/probe/`.
- Found: my harness instructions forbid a subagent from writing a report `.md` file, whatever the path.
- Evidence: the harness notes in my system prompt.
- Done: this handback is the full text.
- Not done: the file. Write it when you retain the report.

## Observations for the Orchestrator

- **Inline case tables beyond this finding.** `navbar.test.ts` still declares small inline tables in these loops:
  - the `[target, property, slot]` consumer loop inside the dark-spelling case;
  - the `[viewport, expanded]` loop, around line 273;
  - the `[selector, moves]` loop, around line 607.

  INLINE-CASE-TABLES named the dark-spelling matrix only. These loops need a carrier.
- **Tallies older than this unit.** Doc comments in `tests/setupStyles.ts` that this patch does not touch still use "once each" and "twice". Examples are the pagination, progress, and check selector lists. They fall outside this unit.
- **The reviewer's capture referrals are yours at landing:**
  - `Navbar expanded` overflows horizontally at 390.
  - The `Navbar scroll` clamp shows in no frame.
  - The forced-colors outline and the xxl expanded state have no frame.
  - The Layout frames grow by the navbar host's block inset.

## What the unit could not close

- D2: the off-limits `nav-list` patch needs your ruling.
- D6 and D7: both wait on ACCORDION's landing. The retirement also needs ACCORDION's guide paragraph.
- D1: the worktree typecheck stays red until the shared patch applies.
- D8: the report file.
- Readings the proof does not take:
  - `.navbar-toggler:hover` is proved by layer presence only.
  - The offcanvas rules are read at the lg step and on the no-infix bar only.

## Review evidence

`git -C /home/user/veneer-nb status --porcelain` reads:

```text
 M tests/src/styles/theme.test.ts
?? app/browser/sections/NavbarSection.ts
?? src/styles/components/_navbar.scss
?? tests/app/browser/sections/NavbarSection.test.ts
?? tests/src/styles/components/navbar.test.ts
```

Round 2 changed these owned files:
- `src/styles/components/_navbar.scss`: the `show` comment.
- `tests/src/styles/components/navbar.test.ts`: the moved table and the selector check.
- `tests/app/browser/sections/NavbarSection.test.ts`: the light-attribute assertion, the case title, and the comment nouns.

`tests/src/styles/theme.test.ts` and `app/browser/sections/NavbarSection.ts` are unchanged from round 1. `tmp/units/` holds the round-2 patches and `nb-instruments-2/`.

I left out the diffstat line counts under REPORT-COUNTS. Your `nb-2.diff` capture carries them.
