# Unit DROPDOWN (`dd`) report

`opus` on Opus 5, native subagent, worktree `/home/user/veneer-dd` (branch `unit/dd` at `87ff1d0`).
Brief: `tmp/units/dd-brief-2.md` over `tmp/units/dd-brief.md`. The worktree was clean at start
(`git status --short` empty), so the unit ran from `87ff1d0` unchanged.

## Outcome

The `dropdown` key ships: the partial, its component proof, the section, and its section proof are
written in the worktree, and every shared-file change is returned as an exact patch in
§ Shared-file patches. With those patches applied, the whole scoped gate chain is green on two
replicas: one at the brief's base `87ff1d0`, and one at main's `b5038db`, which is where the unit
integrates. The worktree alone cannot pass `npm run check`: the owned section imports constants
that only the shared `app/browser/constants.ts` patch declares (deviation D1).

The following deviations are carried rather than stopped on. Each one names its evidence, and
none of them needed an edit to a file this unit does not own. The Orchestrator rules on each one.

## Deviations

- **D1: report-only shared files against the worktree gates.** Expected: criteria 1, 2, 3, and 5
  pass in the worktree. Found: the partial reaches the cascade only through the `src/styles/index.scss`
  `@use` line, and the section only compiles against `DROPDOWN_COPY` and `DROPDOWN_SPECIMENS` in
  `app/browser/constants.ts`. Both files are report-only. Evidence: `npm run check` in the worktree
  exits 2 with `TS2305: Module '"../constants.js"' has no exported member 'DROPDOWN_COPY'` and the
  errors that follow from it. The worktree's own `npm run format:check` and `npm run lint:check`
  exit 0. Choice taken: nothing outside Owned was written. The gates ran in scratch replicas outside
  the worktree, built from the owned files plus the returned patches (§ Validation). Done.
- **D2: the base predates the prerequisites the family verdict names.** The verdict dispatches wave 1
  from "the commit on which CLOSE-GUIDE and B-PASSIVE-ORDER have landed". `87ff1d0` precedes both:
  B-PASSIVE-ORDER is `f898502` and CLOSE-GUIDE is `756d214` on main. Main is at `b5038db`.
  Consequences: at `87ff1d0` the conformance "order case" the brief names does not exist, and the
  barrel's passive block is in landing order. Choice taken: the patches are given against `87ff1d0`,
  as the brief requires. The `src/styles/index.scss` and `tests/conformance.test.ts` patches are also
  given against `f898502`, with the order case's expected-list extension. The `87ff1d0` guide patch
  applies to main's guide with `patch -p1 -F3`, and every hunk applies. The main-based replica
  `replica2` is green with the `f898502` variants and the fuzzed guide patch (§ Validation). The
  guide section's proof sentence follows CLOSE-GUIDE's form: "The `…dropdown.test.ts` proof reads".
  Done.
- **D3: `Dropdown menu dark` is registered as `Dropdown menu inverted`.** The brief's resting row is
  named `Dropdown menu dark`. The tree's registry proof refuses a mode token in a scenario: `tests/setup.test.ts`
  "carries no mode token in a scenario, because the variant names the mode" failed on
  `dropdown-menu-dark` (`npm run test:setup`, 1 failure before the rename, green after). Choice
  taken: the specimen, subject, and scenario are `Dropdown menu inverted` / `dropdown-menu-inverted`,
  after the `Close inverted` precedent. The class under test is still `.dropdown-menu-dark`. Done.
  Hypothesis: the brief's name was written before that registry law was read.
- **D4: `.nav-tabs .dropdown-menu` is deferred to owner `Nav`.** The brief names owners `Navbar`
  and `Disclosure` only. The inventory records this selector under `dropdown` and under `nav`, the
  release writes it in `_nav.scss`, and no `Navigation` owner exists in the table. Choice taken:
  one § Deferred selectors row with owner `Nav`. Integration note: NAV ships that selector in wave 1,
  so whichever of NAV and DROPDOWN lands second reconciles this row. If NAV lands first, drop the row
  from this patch. If DROPDOWN lands first, NAV deletes the row. Done.

Decisions the brief left to this unit:

- **Room for a shown menu (ruling 10).** An inline style is refused on this surface, so each shown
  specimen is a `.container-fluid` > `.row.row-gap-5` grid. Each empty `.col-12` column adds one
  `--vn-gap-5` step (3rem) of in-flow room, after the toggle's column for menus that open downward
  or sideways and before it for upward menus. The start menu's toggle sits in `.col-6.offset-6`.
  `.gy-5` was measured first and refused: the row's negative top margin collapses through the
  specimen and shifts the specimen box 48px up into its neighbour. Measured at 390 and 1280, each
  menu keeps at least 12px of room past the edge it opens toward, and a sideways menu starts level
  with its specimen's top edge. The section proof holds the containment.
- **Registered selectors.** Each resting row names the wrapper, never the menu, with `position` as
  its property. That keeps each row off the journey's hanging-key branch (Unknown 1).
  Rows that share a wrapper class take a `:has()` qualifier:
  `.dropdown:has(> .dropdown-menu.show)`, `.dropdown:has(> .dropdown-menu-end)`,
  `.dropdown:has(> .dropdown-menu-dark)`, and `.dropdown:has(> .dropdown-menu-{bp}-end)`.
- **The `:empty` caret rules.** The `Dropdown closed` specimen adds a caret-only toolbar with one
  empty toggle per direction, each named through its `aria-label` attribute, so every `:empty`
  selector the key records has a rendered host.
- **Spelling.** `grep -o behaviour guides/veneer.md` returns nothing at `87ff1d0`, and `behavior` is
  the guide's spelling, so the guide additions use `behavior`. The ruling texts spell it
  `behaviour`.
- **Row widths.** The Files row is 240 characters and the plugin obligation 443, which is under each
  table's widest cell. The formatter therefore re-pads no existing row, and the guide patch is pure
  addition.

## Touched files (owned)

The following files are new and untracked in the worktree.

| File | Lines | Summary |
| --- | --- | --- |
| `src/styles/components/_dropdown.scss` | 300 | The wrappers, the caret loop over one direction list, the menu and its slots, the placements, the `breakpoint-each` ramp with `--bs-position`, the items, the header, divider, and item text, and the dark class. |
| `tests/src/styles/components/dropdown.test.ts` | 583 | The component proof: layer presence, box, placement per direction with the spacer, caret sides, the empty toggle, alignment and ramp through `visitBreakpoint`, item states, layout, tokens, factor, stack tier, override, dark slots, and the dark island. |
| `app/browser/sections/DropdownSection.ts` | 20 | The `SpecimenSection` subclass fed by `DROPDOWN_COPY` and `DROPDOWN_SPECIMENS`. |
| `tests/app/browser/sections/DropdownSection.test.ts` | 208 | The section proof: specimen contract, states set in markup, toggle announcements, rendered names, unique control names, and every shown menu inside its specimen's box. |

`git -C /home/user/veneer-dd status --porcelain`, taken 2026-09-23, lists exactly those four files
as untracked. `tmp/probe/keys.mjs` in the worktree predates this run (12:58); this unit did not
create it and left it alone.

## Validation

Command form: `export PATH=".../npm11/node_modules/.bin:$PATH"`, run from the named root.
`scratchpad/dd` is
`/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/dd`, which holds both
replicas, the scripts, the logs, `shared.diff`, and `main-variant.diff`.

**Worktree** (`/home/user/veneer-dd`, owned files only):

- `npm run format:check`: exit 0. `npm run lint:check`: exit 0.
- Scoped `npx oxfmt --check` and `npx oxlint --deny-warnings` on the owned files: exit 0.
- `npm run check`: exit 2. Every error is a missing shared export (D1).
- `npm run test:policy`: 109 passed and 1 skipped. That matches the replicas, so the skip is standing.

**Baseline** (worktree at `87ff1d0`, before any write): `npm run test:conformance` 21 passed, exit 0;
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/button-group.test.ts`
34 passed, exit 0.

**Replica 1** (`scratchpad/dd/replica`: the worktree at `87ff1d0` plus the owned files plus the
`87ff1d0` patches). Script `scratchpad/dd/gates.sh`, then re-runs after the last guide edit:

- `npm run format:check`: exit 0.
- `npm run lint:check`: exit 0.
- `npm run check`: exit 0.
- `npm run build:src`: exit 0.
- `npm run test:setup`: 252 passed. In the chain run, 1 test failed and 12 were skipped. Re-run alone,
  252 passed, exit 0. The same `tests/setupServer.test.ts` Button-recording case timed out at 10 s
  once earlier under load. The chain log that named the failure was overwritten by a log-name
  collision in the script, so it is recorded here as a timing observation.
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/dropdown.test.ts tests/src/styles/components/button-group.test.ts`:
  81 passed (47 dropdown, 34 button group), exit 0. The button-group reading is unchanged from the
  baseline.
- `npm run test:app`: 29 files and 69 tests passed, exit 0.
- `npm run test:conformance`: 21 passed, exit 0.
- `npm run test:guides`: 18 passed, exit 0.
- `npm run test:policy`: 109 passed and 1 skipped, exit 0.
- Journey, as an observation: `npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=verbose --project 'journey:light-1280'`
  39 passed, exit 0. That covers the lifted resting frames, the hung-key set, the driven
  `drives one menu item to hover and to focus and photographs each state` case (697 ms), the census,
  and the portfolio subjects. The other variants and `CAPTURE=1` were not run.

**Replica 2** (`scratchpad/dd/replica2`: main `b5038db` from `git archive`, plus the owned files,
the `87ff1d0` patches for every file but the barrel and conformance (the guide patch at `-F3`), and
the `f898502` variants for those two). Script `scratchpad/dd/gates2.sh`:

- `npm run format:check`, `lint:check`, `check`, and `build:src`: exit 0 each.
- `npm run test:setup`: 252 passed.
- The scoped styles proofs: 81 passed.
- `npm run test:app`: 69 passed.
- `npm run test:conformance`: 22 passed, the order case with `dropdown` included.
- `npm run test:guides`: passed.
- `npm run test:policy`: 109 passed and 1 skipped.
- Every command exited 0.

**Patch application:** `git -C /home/user/veneer-dd apply --check` of the `87ff1d0` patch is clean.
`git -C /home/user/veneer apply --check` of the `f898502` variant is clean. The `87ff1d0` guide
hunks apply to main's guide with offsets, and the section hunk needs fuzz 2.

## Failing first and mutations

The mutation script is `scratchpad/dd/mutate.py`. It applies one mutation in replica 1, rebuilds
the styles, runs the named proof, and restores. Its log is `scratchpad/dd/mutations.log.txt`.

- **The partial not loaded** (the `@use` line removed): the dropdown proof reports 46 failed out
  of 47. The one pass is the light-mode island case, which compares a surface with itself.

Each criterion-4 mutation reddens its named case:

| Mutation | Command | Failing cases (named case first) |
| --- | --- | --- |
| the `.show` rule missing | dropdown proof | `hides the menu at rest, shows it through the class, …` plus the cases that read a shown menu (15 in all) |
| the dropup copies `top: 100%` | dropdown proof | `opens the 'dropup' menu on the 'top' side of its toggle, one spacer away` (1) |
| the spacer dropped | dropdown proof | each `opens the … menu … one spacer away` case and the density case (5) |
| two carets on dropstart (the `::after` hide removed) | dropdown proof | `draws the 'dropstart' caret on '::before' alone` (1) |
| the `:empty` rule dropped | dropdown proof | each `drops the caret margin on an empty … toggle` case and the layer case (5) |
| a condition on the wrong boundary (sm written at 768px in the built sheet) | dropdown proof | `switches the 'sm' alignment and the published side at its boundary` (1) |
| `--bs-position` omitted | dropdown proof | the alignment case, each ramp case, and the layer case (7) |
| a literal hover background | dropdown proof | `paints a hovered and a focused item from the hover slots the menu declares` (1) |
| the dark block on `.dropdown-menu` | dropdown proof | every `retunes … on the dark menu alone` case whose slot moves, the island case, the box case, and the layer case (11) |
| a literal `1000` z-index | dropdown proof | `rescales the menu with the density factor and stacks it from the dropdown tier` (1) |
| the room columns dropped | section proof | `keeps each shown menu inside the specimen that holds it` (1) |
| a specimen drops `show` | section proof | `sets every state in markup …` and `keeps each shown menu inside …` (2) |

In the dark-block mutation, the slots whose dark value equals the plain value stay green: the
border color, the divider color, and the active pair. The table's `moves` flag records that, and
the moving slots are what distinguish the mutation.

## Proof matrix

Each group in the following table lists every recorded selector in it, and capture scenarios are
the registered rows.
The mutations in § Failing first and mutations ran; the other mutations this table names are the
ones each case's assertions distinguish, and they did not run.

| Recorded selectors and conditions | Proof case (`dropdown.test.ts` unless named) | Distinguishing mutation | Specimen | Capture scenario |
| --- | --- | --- | --- | --- |
| `.dropup`, `.dropend`, `.dropdown`, `.dropstart`, `.dropup-center`, `.dropdown-center` | `positions every wrapper and lays the menu box out from its own slots` | a wrapper dropped from the list reads `static` | Dropdown closed, Dropup, Dropend, Dropstart, Dropdown center, Dropup center | `dropdown-closed`, `dropup`, `dropend`, `dropstart`, `dropdown-center`, `dropup-center` |
| `.dropdown-toggle` | the same case (`white-space: nowrap`) | nowrap dropped | every specimen | every dropdown row |
| `.dropdown-toggle::after`, `.dropup .dropdown-toggle::after`, `.dropend .dropdown-toggle::after` (both rules), `.dropstart .dropdown-toggle::after` (both rules), `.dropstart .dropdown-toggle::before` (both rules) | `draws the $wrapper caret on $pseudo alone`, per direction | two carets on dropstart; a swapped side; `vertical-align: 0` dropped | Dropdown closed (caret toolbar), Dropup, Dropend, Dropstart | `dropdown-closed`, `dropup`, `dropend`, `dropstart` |
| `.dropdown-toggle:empty::after`, `.dropup …:empty::after`, `.dropend …:empty::after`, `.dropstart …:empty::after` | `drops the caret margin on an empty $wrapper toggle`, per direction | the `:empty` rule dropped | Dropdown closed (caret toolbar) | `dropdown-closed` |
| `.dropdown-menu` with its slots | the box case, `reads $property from its own token`, the density and stack case, the override case | literal `1000`; a slot on a literal | every shown specimen | every shown row |
| `.dropdown-menu[data-bs-popper]` | `opens the 'dropdown' menu on the 'bottom' side …` | spacer dropped | Dropdown menu | `dropdown-menu` |
| `.dropdown-menu-start`, `.dropdown-menu-start[data-bs-popper]`, `.dropdown-menu-end`, `.dropdown-menu-end[data-bs-popper]` (no condition) | `aligns the end menu to its wrapper end, the start and centered menus to its start, and publishes each side` | `--bs-position` omitted; `-end` written as start | Dropdown menu end, every ramp step | `dropdown-menu-end`, `dropdown-align-*` |
| `.dropdown-menu-{sm,md,lg,xl,xxl}-{start,end}` and their `[data-bs-popper]` twins, under `@media (min-width: 576px / 768px / 992px / 1200px / 1400px)` | `switches the $name alignment and the published side at its boundary`, per step, read at boundary − 1, boundary, and boundary + 1 | a condition on the wrong boundary | Dropdown align sm through xxl | `dropdown-align-sm` through `dropdown-align-xxl` |
| `.dropup .dropdown-menu[data-bs-popper]`, `.dropend .dropdown-menu[data-bs-popper]`, `.dropstart .dropdown-menu[data-bs-popper]` | `opens the $wrapper menu on the $opens side of its toggle, one spacer away`, per direction | the dropup copies `top: 100%`; spacer dropped | Dropup, Dropup center, Dropend, Dropstart | `dropup`, `dropup-center`, `dropend`, `dropstart` |
| `.dropdown-divider`, `.dropdown-item`, `.dropdown-header`, `.dropdown-item-text` | `lays out the items, the header, the divider, and the item text from the menu slots` | a slot on a literal; the zero radius fallback dropped | Dropdown menu, Dropdown menu inverted | `dropdown-menu`, `dropdown-menu-inverted` |
| `.dropdown-item:hover`, `.dropdown-item:focus` | `paints a hovered and a focused item from the hover slots the menu declares`; journey `drives one menu item to hover and to focus …` | a literal hover background | Dropdown menu | `dropdown-menu-hover`, `dropdown-menu-focus` |
| `.dropdown-item.active`, `.dropdown-item:active`, `.dropdown-item.disabled`, `.dropdown-item:disabled` | `paints the selected and the pressed item from the active slots and refuses each disabled host` | the active or disabled rule dropped | Dropdown menu, Dropdown menu inverted | `dropdown-menu`, `dropdown-menu-inverted` |
| `.dropdown-menu.show` | `hides the menu at rest, shows it through the class, …`; section `sets every state in markup …` | the `.show` rule missing; a specimen drops `show` | every shown specimen | every shown row |
| `.dropdown-menu-dark` | `retunes $property on the dark menu alone`, per slot, `paints the dark menu from its retuned slots`, `repaints the plain menu in %s mode and holds the dark menu`, per mode | the block on `.dropdown-menu` | Dropdown menu inverted | `dropdown-menu-inverted` |
| every selector in the preceding rows, as layer presence | `hides the menu … and reaches the components layer with every recorded selector` (checked against `DROPDOWN_SELECTORS`) | any selector dropped | — | — |
| `.input-group:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating)`, `.input-group.has-validation > :nth-last-child(n+3):not(.dropdown-toggle):not(.dropdown-menu):not(.form-floating)`, `.input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback)` | shipped by `_input-group.scss`; `input-group.test.ts`; the conformance presence gate | — | the Input group region | the Input group rows |
| `.btn-group > .btn:not(:last-child):not(.dropdown-toggle)`, `.btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle)` | shipped by `_button-group.scss`; `button-group.test.ts`, green and unchanged | — | Horizontal group, Vertical group | `horizontal-group`, `vertical-group` (the frames gain the `Row menu` caret) |
| `.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)`, `.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)`, `.btn-group > .btn.dropdown-toggle-split:first-child`, `.btn-sm + .dropdown-toggle-split`, `.btn-group-sm > .btn + .dropdown-toggle-split`, `.btn-lg + .dropdown-toggle-split`, `.btn-group-lg > .btn + .dropdown-toggle-split` | deferred (existing Disclosure rows); the conformance deferral gates | shipping one while its row stands | — | — |
| `.dropdown-toggle-split`, `.dropdown-toggle-split::after`, `.dropup .dropdown-toggle-split::after`, `.dropend .dropdown-toggle-split::after`, `.dropstart .dropdown-toggle-split::before` | deferred, new Disclosure rows (TOGGLES, R5) | shipping one while its row stands | — | — |
| `.nav-tabs .dropdown-menu` | deferred, new `Nav` row (D4) | shipping it while its row stands | — | — |
| `.navbar-nav .dropdown-menu` and its `.navbar-expand`, `.navbar-expand-sm`, `.navbar-expand-md`, `.navbar-expand-lg`, `.navbar-expand-xl`, and `.navbar-expand-xxl` forms | deferred, new `Navbar` rows | shipping one while its row stands | — | — |
| every `--bs-dropdown-*` property and `--bs-position` | the token, override, dark, and alignment cases; the conformance presence gate | a property omitted | — | — |

The `setupStyles.test.ts` case `partitions the recorded dropdown selectors among this partial, the
partials sharing them, and the deferrals` holds this partition against the inventory mechanically.
The case `derives each caret side, the dark slots, the space slots, and the ramp from the recorded
rules` holds each case table to the recorded declarations and conditions.

## Ledger rows

Each `#### dropdown` departure row is the category the comparison printed from
`npm run build:src && npm run test:conformance` in replica 1. The rows follow.

| Selector | Property | Bootstrap 5.3.8 | Veneer | Departure |
| --- | --- | --- | --- | --- |
| `.dropdown-menu` | `--bs-dropdown-zindex` | `1000` | `var(--vn-stack-dropdown)` | tokenized |
| `.dropdown-menu` | `--bs-dropdown-padding-y` | `0.5rem` | `var(--vn-space-4)` | tokenized |
| `.dropdown-menu` | `--bs-dropdown-spacer` | `0.125rem` | `var(--vn-space-1)` | tokenized |
| `.dropdown-menu` | `--bs-dropdown-font-size` | `1rem` | `var(--vn-size-3)` | tokenized |
| `.dropdown-menu` | `--bs-dropdown-divider-margin-y` | `0.5rem` | `var(--vn-space-4)` | tokenized |
| `.dropdown-menu` | `--bs-dropdown-link-active-color` | `#fff` | `var(--vn-palette-white-base)` | tokenized |
| `.dropdown-menu` | `--bs-dropdown-link-active-bg` | `#0d6efd` | `var(--vn-palette-blue)` | tokenized |
| `.dropdown-menu` | `--bs-dropdown-item-padding-x` | `1rem` | `var(--vn-space-8)` | tokenized |
| `.dropdown-menu` | `--bs-dropdown-item-padding-y` | `0.25rem` | `var(--vn-space-2)` | tokenized |
| `.dropdown-menu` | `--bs-dropdown-header-color` | `#6c757d` | `var(--vn-gray-600)` | tokenized |
| `.dropdown-menu` | `--bs-dropdown-header-padding-x` | `1rem` | `var(--vn-space-8)` | tokenized |
| `.dropdown-menu` | `--bs-dropdown-header-padding-y` | `0.5rem` | `var(--vn-space-4)` | tokenized |
| `.dropend .dropdown-toggle::after` | `vertical-align` | `0.255em` | `0` | declared |
| `.dropstart .dropdown-toggle::after` | `display` | `inline-block` | `none` | declared |
| `.dropstart .dropdown-toggle::before` | `vertical-align` | `0.255em` | `0` | declared |
| `.dropdown-item` | `font-weight` | `400` | `var(--vn-weight-body)` | tokenized |
| `.dropdown-header` | `font-size` | `0.875rem` | `var(--vn-size-2)` | tokenized |
| `.dropdown-menu-dark` | `--bs-dropdown-color` | `#dee2e6` | `var(--vn-gray-300)` | tokenized |
| `.dropdown-menu-dark` | `--bs-dropdown-bg` | `#343a40` | `var(--vn-gray-800)` | tokenized |
| `.dropdown-menu-dark` | `--bs-dropdown-link-color` | `#dee2e6` | `var(--vn-gray-300)` | tokenized |
| `.dropdown-menu-dark` | `--bs-dropdown-link-hover-color` | `#fff` | `var(--vn-palette-white-base)` | tokenized |
| `.dropdown-menu-dark` | `--bs-dropdown-link-hover-bg` | `rgba(255, 255, 255, 0.15)` | `color-mix(in srgb, var(--vn-palette-white-base) 15%, transparent)` | tokenized |
| `.dropdown-menu-dark` | `--bs-dropdown-link-active-color` | `#fff` | `var(--vn-palette-white-base)` | tokenized |
| `.dropdown-menu-dark` | `--bs-dropdown-link-active-bg` | `#0d6efd` | `var(--vn-palette-blue)` | tokenized |
| `.dropdown-menu-dark` | `--bs-dropdown-link-disabled-color` | `#adb5bd` | `var(--vn-gray-500)` | tokenized |
| `.dropdown-menu-dark` | `--bs-dropdown-header-color` | `#adb5bd` | `var(--vn-gray-500)` | tokenized |

Every row's Condition cell is `—`. The `declared` rows are the release's own duplicate caret
selectors: the second rule's value is what the comparison reads for the first rule's site. The
guide section records that. `### Additions`: none. The additions gate printed nothing for
`dropdown`, and the key needs no forced-colors outline, because it paints no shadow focus ring.

## Registry and guide rows

The following rows are written in the patches.

- **Resting rows** in the `CASCADE_KEYS` registry, each with property `position`:
  - `dropdown-closed`
  - `dropdown-menu`
  - `dropdown-menu-end`
  - `dropup`
  - `dropend`
  - `dropstart`
  - `dropdown-center`
  - `dropup-center`
  - `dropdown-menu-inverted` (D3)
  - `dropdown-align-sm`
  - `dropdown-align-md`
  - `dropdown-align-lg`
  - `dropdown-align-xl`
  - `dropdown-align-xxl`

  The rows are appended at the end, and each subject is added to the `CaptureSubject` union.
- **Driven rows** in the `DRIVEN_KEYS` registry: `dropdown-menu-hover` and `dropdown-menu-focus` on
  subject `Dropdown menu`.
- **The `### Dropdown classes` section.** It sits before `### Button group classes`, which is the
  barrel position. It carries the markup-only statement and the pointer to § Compatibility, the R7
  sentence verbatim, and the R9 centering limit.
- **Compatibility rows.** The `dropdown` `selector` and `variable` rows are `shipped`. The `engine`
  `plugin` Dropdown row has Proof `—`, status `accepted`, and ends "J-ENGINE owns it.". The R8
  sentence follows the table. Integration note: if COLLAPSE or NAV lands the same R8 sentence
  first, keep one copy.
- **§ Deferred selectors rows.** The split-toggle caret names take owner `Disclosure`, and
  `.nav-tabs .dropdown-menu` takes owner `Nav`. The navbar menu names take owner `Navbar`.
- **The § Files row** for `_dropdown.scss`.
- **The `listed` literal** and the `setupServer.test.ts` set each gain `dropdown`.
- **`ROADMAP.md`:** no patch. The roadmap fold is the Orchestrator's own landing commit.

## Unknowns answered

- **The hanging-key branch.** It fires when the key element's top sits at or below its parent's
  bottom. Every dropdown row names a wrapper that sits at the top of its column, so the branch does
  not fire. Evidence: the light-1280 journey's `expect([...hung.keys()])` still lists only the
  tooltip keys, and the case passed.
- **The `dropdown` names the release writes outside `_dropdown.scss`:**
  - In `_button-group.scss`: the `.btn-group` and `.btn-group-vertical` `:not(.dropdown-toggle)`
    pair is shipped. The sized and first-child split rules are existing Disclosure rows. The
    `.dropdown-toggle-split` caret names are new Disclosure rows.
  - In `forms/_input-group.scss`: the `:not(.dropdown-*)` rules are shipped. The
    `nth-last-child` toggle rules are existing Disclosure rows.
  - In `_nav.scss`: `.nav-tabs .dropdown-menu` is a new `Nav` row (D4).
  - In `_navbar.scss`: the `.navbar-nav .dropdown-menu` forms are new `Navbar` rows.

## Could not close

- **The worktree-alone gates.** Criteria 2, 3, 4, and 5 cannot pass in the worktree until the
  shared patches are applied (D1): the barrel line, the constants, and the case tables live in
  report-only files. With the patches applied they pass on both replicas.
- **The journey.** The dark-1280, light-390, and dark-390 variants and `CAPTURE=1` are the
  Orchestrator's observations, and the frames were not written. The light-1280 journey passed
  without capture.
- **Base drift.** Main has moved beyond `87ff1d0` (D2). The guide patch needs fuzz on main, and
  CLOSE-GUIDE's own rules may ask for more once they are read in full. This unit read only the
  anchors and the proof-sentence form.

## Shared-file patches

The unified diff against `87ff1d0` follows. It is every shared-file change, and every hunk is an
addition. It passes `git apply --check` in the worktree.

```diff
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -61,6 +61,7 @@
 @use 'components/input-group';
 @use 'components/validation';
 @use 'components/pagination';
+@use 'components/dropdown';
 @use 'components/button-group';
 @use 'components/progress' as progress-component;
 @use 'components/spinner';
--- a/tests/conformance.test.ts
+++ b/tests/conformance.test.ts
@@ -107,6 +107,7 @@
 			'col',
 			'container',
 			'display',
+			'dropdown',
 			'figure',
 			'form',
 			'form-check',
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@ -1347,6 +1347,7 @@
 				'col',
 				'container',
 				'display',
+				'dropdown',
 				'engine',
 				'figure',
 				'form',
--- a/tests/setup.ts
+++ b/tests/setup.ts
@@ -105,6 +105,20 @@
 	| 'Invalid feedback'
 	| 'Invalid select'
 	| 'Disabled page'
+	| 'Dropdown align lg'
+	| 'Dropdown align md'
+	| 'Dropdown align sm'
+	| 'Dropdown align xl'
+	| 'Dropdown align xxl'
+	| 'Dropdown center'
+	| 'Dropdown closed'
+	| 'Dropdown menu'
+	| 'Dropdown menu end'
+	| 'Dropdown menu inverted'
+	| 'Dropend'
+	| 'Dropstart'
+	| 'Dropup'
+	| 'Dropup center'
 	| 'Form check box'
 	| 'Form check checked'
 	| 'Form check disabled'
@@ -361,6 +375,10 @@
  * hanging key's bottom edge inside the frame's. A hanging key lies over that content, which is the
  * release's own overlap. The journey reads which element paints on top where the two meet.
  *
+ * A shown dropdown menu is also positioned out of flow, and its row names the wrapper holding it
+ * rather than the menu. The menu's specimen keeps the room the menu opens into in flow, so the frame
+ * shot on the specimen carries the whole menu and no dropdown key hangs outside its host.
+ *
  * A hover or focus frame is registered for none of these keys. The showcase renders each key at
  * rest and the journey reads each key at rest, so a pointer state would be a claim about a paint no
  * journey here drives. That is what separates these from the rows of the {@link DRIVEN_KEYS} table,
@@ -1063,6 +1081,90 @@
 		selector: 'legend.col-form-label',
 		property: 'margin-bottom',
 	}),
+	Object.freeze({
+		scenario: 'dropdown-closed',
+		subject: 'Dropdown closed',
+		selector: '.dropdown',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropdown-menu',
+		subject: 'Dropdown menu',
+		selector: '.dropdown:has(> .dropdown-menu.show)',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropdown-menu-end',
+		subject: 'Dropdown menu end',
+		selector: '.dropdown:has(> .dropdown-menu-end)',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropup',
+		subject: 'Dropup',
+		selector: '.dropup',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropend',
+		subject: 'Dropend',
+		selector: '.dropend',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropstart',
+		subject: 'Dropstart',
+		selector: '.dropstart',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropdown-center',
+		subject: 'Dropdown center',
+		selector: '.dropdown-center',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropup-center',
+		subject: 'Dropup center',
+		selector: '.dropup-center',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropdown-menu-inverted',
+		subject: 'Dropdown menu inverted',
+		selector: '.dropdown:has(> .dropdown-menu-dark)',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropdown-align-sm',
+		subject: 'Dropdown align sm',
+		selector: '.dropdown:has(> .dropdown-menu-sm-end)',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropdown-align-md',
+		subject: 'Dropdown align md',
+		selector: '.dropdown:has(> .dropdown-menu-md-end)',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropdown-align-lg',
+		subject: 'Dropdown align lg',
+		selector: '.dropdown:has(> .dropdown-menu-lg-end)',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropdown-align-xl',
+		subject: 'Dropdown align xl',
+		selector: '.dropdown:has(> .dropdown-menu-xl-end)',
+		property: 'position',
+	}),
+	Object.freeze({
+		scenario: 'dropdown-align-xxl',
+		subject: 'Dropdown align xxl',
+		selector: '.dropdown:has(> .dropdown-menu-xxl-end)',
+		property: 'position',
+	}),
 ])
 
 /**
@@ -1107,6 +1209,8 @@
 	Object.freeze({ scenario: 'form-floating-empty-focus', subject: 'Form floating empty' }),
 	Object.freeze({ scenario: 'form-select-base-focus', subject: 'Form select base' }),
 	Object.freeze({ scenario: 'form-control-text-focus', subject: 'Form control text' }),
+	Object.freeze({ scenario: 'dropdown-menu-hover', subject: 'Dropdown menu' }),
+	Object.freeze({ scenario: 'dropdown-menu-focus', subject: 'Dropdown menu' }),
 ])
 
 /**
--- a/tests/setupStyles.ts
+++ b/tests/setupStyles.ts
@@ -5622,3 +5622,211 @@
 		}),
 	}),
 ])
+
+/**
+ * Lists every official `dropdown` selector the dropdown partial writes.
+ *
+ * @remarks
+ * The inventory records more selectors under the key than this partial writes: the input-group and
+ * button-group relationships another partial writes under its own key, and the split-toggle and
+ * navigation menus § Deferred selectors withholds. `tests/setupStyles.test.ts` holds this table and
+ * those two populations against the record together.
+ */
+export const DROPDOWN_SELECTORS = Object.freeze([
+	'.dropup',
+	'.dropend',
+	'.dropdown',
+	'.dropstart',
+	'.dropup-center',
+	'.dropdown-center',
+	'.dropdown-toggle',
+	'.dropdown-toggle::after',
+	'.dropdown-toggle:empty::after',
+	'.dropdown-menu',
+	'.dropdown-menu[data-bs-popper]',
+	...['', '-sm', '-md', '-lg', '-xl', '-xxl'].flatMap((infix) =>
+		['start', 'end'].flatMap((edge) => [
+			`.dropdown-menu${infix}-${edge}`,
+			`.dropdown-menu${infix}-${edge}[data-bs-popper]`,
+		]),
+	),
+	'.dropup .dropdown-menu[data-bs-popper]',
+	'.dropup .dropdown-toggle::after',
+	'.dropup .dropdown-toggle:empty::after',
+	'.dropend .dropdown-menu[data-bs-popper]',
+	'.dropend .dropdown-toggle::after',
+	'.dropend .dropdown-toggle:empty::after',
+	'.dropstart .dropdown-menu[data-bs-popper]',
+	'.dropstart .dropdown-toggle::after',
+	'.dropstart .dropdown-toggle::before',
+	'.dropstart .dropdown-toggle:empty::after',
+	'.dropdown-divider',
+	'.dropdown-item',
+	'.dropdown-item:hover',
+	'.dropdown-item:focus',
+	'.dropdown-item.active',
+	'.dropdown-item:active',
+	'.dropdown-item.disabled',
+	'.dropdown-item:disabled',
+	'.dropdown-menu.show',
+	'.dropdown-header',
+	'.dropdown-item-text',
+	'.dropdown-menu-dark',
+])
+
+/**
+ * Supplies the menu entries the resolved dropdown readings share: a header, a resting item, a
+ * selected item, an item disabled through its class and one through the native attribute, a
+ * divider, and item text.
+ */
+export const DROPDOWN_MARKUP =
+	'<li><h6 class="dropdown-header">Shipment</h6></li><li><a class="dropdown-item" href="#track">Track</a></li><li><a class="dropdown-item active" href="#edit" aria-current="true">Edit</a></li><li><a class="dropdown-item disabled" aria-disabled="true">Archive</a></li><li><button type="button" class="dropdown-item" disabled>Cancel</button></li><li><hr class="dropdown-divider"></li><li><span class="dropdown-item-text">Updated</span></li>'
+
+/**
+ * Pins each direction wrapper to the side of its toggle the menu opens on and to the caret the
+ * toggle paints there.
+ *
+ * @remarks
+ * A caret side reads `paint` where the border draws the arrow in the toggle's own color, `clear`
+ * where a transparent border shapes it, and `none` where no border is drawn. `raised` is true where
+ * the caret sits above the baseline, and false where the release centers it on the text.
+ */
+export const DROPDOWN_DIRECTION_CASES = Object.freeze(
+	[
+		{
+			wrapper: 'dropdown',
+			opens: 'bottom',
+			pseudo: '::after',
+			sides: { top: 'paint', right: 'clear', bottom: 'none', left: 'clear' },
+			raised: true,
+		},
+		{
+			wrapper: 'dropup',
+			opens: 'top',
+			pseudo: '::after',
+			sides: { top: 'none', right: 'clear', bottom: 'paint', left: 'clear' },
+			raised: true,
+		},
+		{
+			wrapper: 'dropend',
+			opens: 'right',
+			pseudo: '::after',
+			sides: { top: 'clear', right: 'none', bottom: 'clear', left: 'paint' },
+			raised: false,
+		},
+		{
+			wrapper: 'dropstart',
+			opens: 'left',
+			pseudo: '::before',
+			sides: { top: 'clear', right: 'paint', bottom: 'clear', left: 'none' },
+			raised: false,
+		},
+	].map(({ sides, ...entry }) => Object.freeze({ ...entry, sides: Object.freeze(sides) })),
+)
+
+/**
+ * Lists every breakpoint alignment step with the viewports read around its boundary, each
+ * derived from {@link GRID_BREAKPOINT_CASES}.
+ *
+ * @remarks
+ * The zero-boundary pair carries no infix and no condition, so it is read on its own rather than
+ * as a step of this ramp.
+ */
+export const DROPDOWN_ALIGNMENT_CASES = Object.freeze(
+	GRID_BREAKPOINT_CASES.filter(({ boundary }) => boundary !== 0).map(
+		({ name, boundary, readings }) => Object.freeze({ name, boundary, readings }),
+	),
+)
+
+/**
+ * Pins each dropdown length slot to the space token it reads and the pixels it resolves to.
+ */
+export const DROPDOWN_SPACE_CASES = Object.freeze([
+	Object.freeze({ property: '--bs-dropdown-padding-y', token: TOKEN_NAMES.space[4], pixels: 8 }),
+	Object.freeze({ property: '--bs-dropdown-spacer', token: TOKEN_NAMES.space[1], pixels: 2 }),
+	Object.freeze({
+		property: '--bs-dropdown-divider-margin-y',
+		token: TOKEN_NAMES.space[4],
+		pixels: 8,
+	}),
+	Object.freeze({
+		property: '--bs-dropdown-item-padding-x',
+		token: TOKEN_NAMES.space[8],
+		pixels: 16,
+	}),
+	Object.freeze({
+		property: '--bs-dropdown-item-padding-y',
+		token: TOKEN_NAMES.space[2],
+		pixels: 4,
+	}),
+	Object.freeze({
+		property: '--bs-dropdown-header-padding-x',
+		token: TOKEN_NAMES.space[8],
+		pixels: 16,
+	}),
+	Object.freeze({
+		property: '--bs-dropdown-header-padding-y',
+		token: TOKEN_NAMES.space[4],
+		pixels: 8,
+	}),
+])
+
+/**
+ * Pins every slot the legacy dark menu retunes to the property it resolves from, and records
+ * whether the retune moves it off the value the plain menu holds.
+ *
+ * @remarks
+ * `source` is the token or compatibility variable the dark slot reads, or undefined for the shadow
+ * slot the release empties. A slot whose dark value is the plain menu's own, such as the translucent
+ * border, is retuned all the same, because the class restates the release's whole block.
+ */
+export const DROPDOWN_DARK_CASES = Object.freeze([
+	Object.freeze({ property: '--bs-dropdown-color', source: TOKEN_NAMES.gray[300], moves: true }),
+	Object.freeze({ property: '--bs-dropdown-bg', source: TOKEN_NAMES.gray[800], moves: true }),
+	Object.freeze({
+		property: '--bs-dropdown-border-color',
+		source: '--bs-border-color-translucent',
+		moves: false,
+	}),
+	Object.freeze({ property: '--bs-dropdown-box-shadow', source: undefined, moves: true }),
+	Object.freeze({
+		property: '--bs-dropdown-link-color',
+		source: TOKEN_NAMES.gray[300],
+		moves: true,
+	}),
+	Object.freeze({
+		property: '--bs-dropdown-link-hover-color',
+		source: TOKEN_NAMES.palette.white.base,
+		moves: true,
+	}),
+	Object.freeze({
+		property: '--bs-dropdown-divider-bg',
+		source: '--bs-border-color-translucent',
+		moves: false,
+	}),
+	Object.freeze({
+		property: '--bs-dropdown-link-hover-bg',
+		source: undefined,
+		moves: true,
+	}),
+	Object.freeze({
+		property: '--bs-dropdown-link-active-color',
+		source: TOKEN_NAMES.palette.white.base,
+		moves: false,
+	}),
+	Object.freeze({
+		property: '--bs-dropdown-link-active-bg',
+		source: TOKEN_NAMES.palette.blue,
+		moves: false,
+	}),
+	Object.freeze({
+		property: '--bs-dropdown-link-disabled-color',
+		source: TOKEN_NAMES.gray[500],
+		moves: true,
+	}),
+	Object.freeze({
+		property: '--bs-dropdown-header-color',
+		source: TOKEN_NAMES.gray[500],
+		moves: true,
+	}),
+])
--- a/tests/setupStyles.test.ts
+++ b/tests/setupStyles.test.ts
@@ -58,6 +58,12 @@
 	CONTAINER_CLASS_CASES,
 	CONTAINER_WIDTH_CASES,
 	CUSTOMIZATION_RECIPE,
+	DROPDOWN_ALIGNMENT_CASES,
+	DROPDOWN_DARK_CASES,
+	DROPDOWN_DIRECTION_CASES,
+	DROPDOWN_MARKUP,
+	DROPDOWN_SELECTORS,
+	DROPDOWN_SPACE_CASES,
 	ELEMENT_TAGS,
 	FILL_ONLY_RECIPE,
 	FORM_CHECK_ICON_CASES,
@@ -230,6 +236,12 @@
 				'CONTAINER_CLASS_CASES',
 				'CONTAINER_WIDTH_CASES',
 				'CUSTOMIZATION_RECIPE',
+				'DROPDOWN_ALIGNMENT_CASES',
+				'DROPDOWN_DARK_CASES',
+				'DROPDOWN_DIRECTION_CASES',
+				'DROPDOWN_MARKUP',
+				'DROPDOWN_SELECTORS',
+				'DROPDOWN_SPACE_CASES',
 				'ELEMENT_TAGS',
 				'FILL_ONLY_RECIPE',
 				'FORM_CHECK_ICON_CASES',
@@ -2955,3 +2967,107 @@
 		expect(Object.isFrozen(FORM_SELECT_FOCUS)).toBe(true)
 	})
 })
+
+describe('dropdown case tables', () => {
+	it('partitions the recorded dropdown selectors among this partial, the partials sharing them, and the deferrals', () => {
+		const recorded = new Set(oracle.components.dropdown.selectors.map(({ selector }) => selector))
+		const deferred = new Set(readDeferrals().map((row) => row.name))
+		// A recorded selector this partial does not write is either written by another partial
+		// whose own key records it too, or withheld under § Deferred selectors; nothing is left over
+		// and nothing this partial writes is withheld.
+		const shared = [...recorded].filter(
+			(selector) =>
+				!DROPDOWN_SELECTORS.includes(selector) &&
+				!deferred.has(selector) &&
+				Object.entries(oracle.components).some(
+					([key, vocabulary]) =>
+						key !== 'dropdown' && vocabulary.selectors.some((entry) => entry.selector === selector),
+				),
+		)
+		expect(DROPDOWN_SELECTORS.filter((selector) => !recorded.has(selector))).toEqual([])
+		expect(DROPDOWN_SELECTORS.filter((selector) => deferred.has(selector))).toEqual([])
+		expect(
+			[...recorded].filter(
+				(selector) =>
+					!DROPDOWN_SELECTORS.includes(selector) &&
+					!deferred.has(selector) &&
+					!shared.includes(selector),
+			),
+		).toEqual([])
+		expect(
+			shared.every(
+				(selector) => selector.startsWith('.input-group') || selector.startsWith('.btn-group'),
+			),
+		).toBe(true)
+		expect(new Set(DROPDOWN_SELECTORS).size).toBe(DROPDOWN_SELECTORS.length)
+	})
+	it('derives each caret side, the dark slots, the space slots, and the ramp from the recorded rules', () => {
+		const rules = oracle.components.dropdown.selectors
+		for (const { wrapper, pseudo, sides } of DROPDOWN_DIRECTION_CASES) {
+			const selector = `${wrapper === 'dropdown' ? '' : `.${wrapper} `}.dropdown-toggle${pseudo}`
+			const declared = new Map(
+				rules
+					.filter((rule) => rule.selector === selector)
+					.flatMap((rule) => rule.declarations.map(({ property, value }) => [property, value])),
+			)
+			// A painted side is a bare solid border in the toggle's color, a cleared side a solid
+			// transparent one, and an undrawn side is zero or not declared at all.
+			for (const [side, reading] of Object.entries(sides)) {
+				const value = declared.get(`border-${side}`)
+				expect(
+					value === undefined || value === '0'
+						? 'none'
+						: value.endsWith('transparent')
+							? 'clear'
+							: 'paint',
+				).toBe(reading)
+			}
+		}
+		const plain = new Map(
+			requireValue(
+				rules.find(({ selector }) => selector === '.dropdown-menu'),
+				'The inventory records no `.dropdown-menu` rule',
+			).declarations.map(({ property, value }) => [property, value]),
+		)
+		const dark = requireValue(
+			rules.find(({ selector }) => selector === '.dropdown-menu-dark'),
+			'The inventory records no `.dropdown-menu-dark` rule',
+		).declarations
+		expect(DROPDOWN_DARK_CASES.map(({ property }) => property)).toEqual(
+			dark.map(({ property }) => property),
+		)
+		for (const { property, moves } of DROPDOWN_DARK_CASES)
+			expect(dark.find((entry) => entry.property === property)?.value !== plain.get(property)).toBe(
+				moves,
+			)
+		for (const { property, pixels } of DROPDOWN_SPACE_CASES)
+			expect(plain.get(property)).toBe(`${String(pixels / 16)}rem`)
+		for (const { name, boundary, readings } of DROPDOWN_ALIGNMENT_CASES) {
+			for (const edge of ['start', 'end']) {
+				const rule = rules.find(({ selector }) => selector === `.dropdown-menu-${name}-${edge}`)
+				const condition = rule && 'condition' in rule ? parseMediaWidth(rule.condition) : undefined
+				expect(condition).toBe(boundary)
+			}
+			expect(readings).toEqual(expect.arrayContaining([boundary - 1, boundary]))
+		}
+		expect(DROPDOWN_MARKUP).toContain('class="dropdown-item active"')
+		expect(DROPDOWN_MARKUP).toContain('class="dropdown-item disabled"')
+		expect(DROPDOWN_MARKUP).toContain('<button type="button" class="dropdown-item" disabled>')
+		for (const cases of [
+			DROPDOWN_SELECTORS,
+			DROPDOWN_DIRECTION_CASES,
+			DROPDOWN_ALIGNMENT_CASES,
+			DROPDOWN_SPACE_CASES,
+			DROPDOWN_DARK_CASES,
+		])
+			expect(Object.isFrozen(cases)).toBe(true)
+		for (const cases of [
+			DROPDOWN_DIRECTION_CASES,
+			DROPDOWN_ALIGNMENT_CASES,
+			DROPDOWN_SPACE_CASES,
+			DROPDOWN_DARK_CASES,
+		])
+			for (const entry of cases) expect(Object.isFrozen(entry)).toBe(true)
+		for (const { sides } of DROPDOWN_DIRECTION_CASES) expect(Object.isFrozen(sides)).toBe(true)
+	})
+})
--- a/tests/app/browser/integration.test.ts
+++ b/tests/app/browser/integration.test.ts
@@ -46,6 +46,7 @@
 	CARD_SPECIMENS,
 	CLOSE_SPECIMENS,
 	CONTENT_SPECIMENS,
+	DROPDOWN_SPECIMENS,
 	FORM_CHECK_SPECIMENS,
 	FORM_CONTROL_SPECIMENS,
 	FORM_FLOATING_SPECIMENS,
@@ -1267,6 +1268,69 @@
 		JOURNAL.record('hold', 'Dispatch lane', String(driven.get('active')))
 	})
 
+	it('drives one menu item to hover and to focus and photographs each state', async () => {
+		await applyTheme(VARIANT)
+		await waitForAnimations(document.body)
+		const specimen = readSpecimen(mounted.host, 'Dropdown menu')
+		const item = requireValue(
+			specimen.querySelector<HTMLElement>('a.dropdown-item:not(.active):not(.disabled)'),
+			'The "Dropdown menu" specimen renders no resting item',
+		)
+		const selected = requireValue(
+			specimen.querySelector('.dropdown-item.active'),
+			'The "Dropdown menu" specimen renders no selected item',
+		)
+		const rest = readStyle(item, 'background-color')
+		const held = readStyle(selected, 'background-color')
+		const driven = new Map<string, string>()
+		// The specimen itself is moved to the document's start and put back afterwards, the placement
+		// the list-group action case uses and for its reasons: the menu sits at the foot of the
+		// document, a pointer placed there does not survive the staging a shot takes, and a copy
+		// would answer to the item's accessible name beside the original.
+		const parent = requireValue(specimen.parentElement, 'The specimen is not mounted')
+		const following = specimen.nextSibling
+		const lifted = build('div')
+		document.body.prepend(lifted)
+		lifted.append(specimen)
+		try {
+			await stagePane(window.innerWidth, window.innerHeight)
+			await hoverAccessible('link', 'Track shipment')
+			await waitForAnimations(item)
+			expect(item.matches(':hover')).toBe(true)
+			driven.set('hover', readStyle(item, 'background-color'))
+			await FRAMES.place('dropdown-menu-hover', item, specimen)
+			await stagePane(window.innerWidth, window.innerHeight)
+			expect(item.matches(':hover')).toBe(true)
+			expect(readStyle(item, 'background-color')).toBe(driven.get('hover'))
+			await releasePane()
+			await page.elementLocator(item).unhover()
+			expect(item.matches(':hover')).toBe(false)
+			// Focus paints through the same pair of slots the hover rule reads, and it is driven with
+			// no pointer at all, so this frame shows the keyboard path to that paint.
+			item.focus()
+			await waitForAnimations(item)
+			expect(item.matches(':focus')).toBe(true)
+			driven.set('focus', readStyle(item, 'background-color'))
+			await FRAMES.place('dropdown-menu-focus', item, specimen)
+			expect(item.matches(':focus')).toBe(true)
+			item.blur()
+		} finally {
+			parent.insertBefore(specimen, following)
+			lifted.remove()
+		}
+		// Both driven states leave the resting fill and paint the same one, and the selected item
+		// nothing was driven on keeps its own fill throughout.
+		expect([...driven.values()].filter((value) => value === rest)).toStrictEqual([])
+		expect(driven.get('focus')).toBe(driven.get('hover'))
+		expect(readStyle(selected, 'background-color')).toBe(held)
+		expect(readStyle(item, 'background-color')).toBe(rest)
+		expect(specimen.parentElement).toBe(parent)
+		ARTIFACT.push(
+			JSON.stringify({ reading: 'dropdown item paint', rest, held, driven: [...driven] }),
+		)
+		JOURNAL.record('hover', 'Track shipment', String(driven.get('hover')))
+	})
+
 	it('matches the official recording step for step on the same markup', async () => {
 		// The recording excludes no step, so every step it carries is compared. A recording that
 		// gains an exclusion reddens here, and the unit that regenerated it rules on the exclusion
@@ -1679,6 +1743,7 @@
 				CARD_SPECIMENS,
 				CLOSE_SPECIMENS,
 				CONTENT_SPECIMENS,
+				DROPDOWN_SPECIMENS,
 				FORM_CHECK_SPECIMENS,
 				FORM_CONTROL_SPECIMENS,
 				FORM_FLOATING_SPECIMENS,
--- a/tests/app/browser/Showcase.test.ts
+++ b/tests/app/browser/Showcase.test.ts
@@ -6,6 +6,7 @@
 	BUTTON_SPECIMENS,
 	CLOSE_SPECIMENS,
 	CONTENT_SPECIMENS,
+	DROPDOWN_SPECIMENS,
 	FORM_CHECK_SPECIMENS,
 	FORM_CONTROL_SPECIMENS,
 	FORM_FLOATING_SPECIMENS,
@@ -111,6 +112,7 @@
 				'Breadcrumb',
 				'Close',
 				'Input group',
+				'Dropdown',
 			])
 			expect(
 				[...host.querySelectorAll('[data-specimen]')].map((element) =>
@@ -142,6 +144,7 @@
 					...BREADCRUMB_SPECIMENS,
 					...CLOSE_SPECIMENS,
 					...INPUT_GROUP_SPECIMENS,
+					...DROPDOWN_SPECIMENS,
 				].map((specimen) => specimen.name),
 			)
 			expect(readPerception('Showcase')).toBe('Explore the color mode with the Dark mode control.')
--- a/tests/app/browser/index.test.ts
+++ b/tests/app/browser/index.test.ts
@@ -32,6 +32,9 @@
 			'CardSection',
 			'CloseSection',
 			'ContentSection',
+			'DROPDOWN_COPY',
+			'DROPDOWN_SPECIMENS',
+			'DropdownSection',
 			'FORM_CHECK_COPY',
 			'FORM_CHECK_SPECIMENS',
 			'FORM_CONTROL_COPY',
--- a/app/browser/constants.ts
+++ b/app/browser/constants.ts
@@ -1690,3 +1690,164 @@
 			'<div class="container-fluid"><fieldset class="row"><legend class="col-5 col-form-label">Pickup</legend><div class="col-7"><input class="form-control" type="date" aria-label="Pickup date" value="2026-09-23"></div></fieldset></div>',
 	}),
 ])
+
+/** Holds the Dropdown section's visible copy and accessible name. */
+export const DROPDOWN_COPY = Object.freeze({
+	region: 'Dropdown',
+	paragraph:
+		'Compare a closed toggle and its caret in each direction, a menu shown below, above, beside, and centered on its toggle, the header, items, states, divider, and text a menu holds, the end alignment and its breakpoint ramp, and the legacy dark menu. Each menu is shown through its class in markup, and its specimen keeps the room the menu opens into.',
+})
+
+/**
+ * Lists every dropdown specimen the section renders, in render order.
+ *
+ * @remarks
+ * Every toggle and every item announces a name of its own, because the journey reaches a control by
+ * that name and a name repeated across specimens would resolve to whichever came first. A shown menu
+ * carries the `show` class and the `data-bs-popper` attribute a placement engine writes when it
+ * leaves the menu to the stylesheet, so each direction is the cascade's own placement; no script
+ * opens or places anything here.
+ *
+ * The closed specimen leads with a labelled toggle and follows it with a caret-only toggle in each
+ * direction, each announcing its name through `aria-label`, because an empty toggle is what the
+ * release's `:empty` caret rules reach. The ramp specimens each render two menus side by side: one
+ * aligned to the end until its boundary and to the start from there, and one aligned to the start
+ * until its boundary and to the end from there, so a frame at either registered width shows which
+ * side of the boundary it was shot on. Their entries are item text, which no keyboard stops on.
+ *
+ * A shown menu is positioned out of flow, so it adds nothing to the height of the specimen holding
+ * it, and a frame shot on that specimen would crop it. Each shown specimen is therefore a grid row
+ * with the release's largest row gap, and each empty full-width column in it adds one gap of in-flow
+ * room: a menu opening downward or to one side keeps its room in the columns after its
+ * toggle's own, and a menu opening upward keeps it in the columns before. The room is built from
+ * shipped layout classes rather than a declared height, because an inline style is refused on this
+ * surface. The start menu opens to the left of its toggle, so that toggle sits in the second half of
+ * its row.
+ */
+export const DROPDOWN_SPECIMENS: readonly MarkupSpecimen[] = Object.freeze([
+	Object.freeze({
+		name: 'Dropdown closed',
+		markup: `<div class="dropdown"><button type="button" class="btn btn-secondary dropdown-toggle" aria-expanded="false">Carrier options</button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#choose-carrier">Choose carrier</a></li></ul></div><div class="btn-toolbar" role="toolbar" aria-label="Caret directions">${[
+			{ wrapper: 'btn-group', place: 'below' },
+			{ wrapper: 'btn-group dropup', place: 'above' },
+			{ wrapper: 'btn-group dropend', place: 'after' },
+			{ wrapper: 'btn-group dropstart', place: 'before' },
+		]
+			.map(
+				({ wrapper, place }) =>
+					`<div class="${wrapper}"><button type="button" class="btn btn-secondary dropdown-toggle" aria-expanded="false" aria-label="Carrier options ${place}"></button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#carrier-${place}">Carrier ${place}</a></li></ul></div>`,
+			)
+			.join('')}</div>`,
+	}),
+	...[
+		{
+			name: 'Dropdown menu',
+			wrapper: 'dropdown',
+			column: 'col-12',
+			label: 'Shipment actions',
+			classes: '',
+			entries: `<li><h6 class="dropdown-header">Shipment</h6></li><li><a class="dropdown-item" href="#track-shipment">Track shipment</a></li><li><a class="dropdown-item active" href="#edit-shipment" aria-current="true">Edit shipment</a></li><li><a class="dropdown-item disabled" aria-disabled="true">Archive shipment</a></li><li><button type="button" class="dropdown-item" disabled="">Cancel shipment</button></li><li><hr class="dropdown-divider"></li><li><span class="dropdown-item-text">Updated today</span></li>`,
+			above: 0,
+			below: 5,
+		},
+		{
+			name: 'Dropdown menu end',
+			wrapper: 'dropdown',
+			column: 'col-12',
+			label: 'Invoice actions',
+			classes: ' dropdown-menu-end',
+			entries:
+				'<li><a class="dropdown-item" href="#download-invoice">Download invoice</a></li><li><a class="dropdown-item" href="#email-invoice">Email invoice</a></li>',
+			above: 0,
+			below: 2,
+		},
+		{
+			name: 'Dropup',
+			wrapper: 'btn-group dropup',
+			column: 'col-12',
+			label: 'Route actions',
+			classes: '',
+			entries:
+				'<li><a class="dropdown-item" href="#reroute">Reroute</a></li><li><a class="dropdown-item" href="#hold-route">Hold route</a></li>',
+			above: 2,
+			below: 0,
+		},
+		{
+			name: 'Dropend',
+			wrapper: 'btn-group dropend',
+			column: 'col-12',
+			label: 'Crate actions',
+			classes: '',
+			entries:
+				'<li><a class="dropdown-item" href="#open-crate">Open crate</a></li><li><a class="dropdown-item" href="#seal-crate">Seal crate</a></li>',
+			above: 0,
+			below: 2,
+		},
+		{
+			name: 'Dropstart',
+			wrapper: 'btn-group dropstart',
+			column: 'col-6 offset-6',
+			label: 'Pallet actions',
+			classes: '',
+			entries:
+				'<li><a class="dropdown-item" href="#stack-pallet">Stack pallet</a></li><li><a class="dropdown-item" href="#wrap-pallet">Wrap pallet</a></li>',
+			above: 0,
+			below: 2,
+		},
+		{
+			name: 'Dropdown center',
+			wrapper: 'dropdown-center',
+			column: 'col-12',
+			label: 'Dock actions',
+			classes: '',
+			entries:
+				'<li><a class="dropdown-item" href="#assign-dock">Assign dock</a></li><li><a class="dropdown-item" href="#release-dock">Release dock</a></li>',
+			above: 0,
+			below: 2,
+		},
+		{
+			name: 'Dropup center',
+			wrapper: 'dropup-center dropup',
+			column: 'col-12',
+			label: 'Bay actions',
+			classes: '',
+			entries:
+				'<li><a class="dropdown-item" href="#load-bay">Load bay</a></li><li><a class="dropdown-item" href="#clear-bay">Clear bay</a></li>',
+			above: 2,
+			below: 0,
+		},
+		{
+			name: 'Dropdown menu inverted',
+			wrapper: 'dropdown',
+			column: 'col-12',
+			label: 'Manifest actions',
+			classes: ' dropdown-menu-dark',
+			entries: `<li><h6 class="dropdown-header">Manifest</h6></li><li><a class="dropdown-item" href="#print-manifest">Print manifest</a></li><li><a class="dropdown-item active" href="#sign-manifest" aria-current="true">Sign manifest</a></li><li><a class="dropdown-item disabled" aria-disabled="true">Void manifest</a></li><li><button type="button" class="dropdown-item" disabled="">Reissue manifest</button></li><li><hr class="dropdown-divider"></li><li><span class="dropdown-item-text">Signed today</span></li>`,
+			above: 0,
+			below: 5,
+		},
+	].map(({ name, wrapper, column, label, classes, entries, above, below }) =>
+		Object.freeze({
+			name,
+			markup: `<div class="container-fluid"><div class="row row-gap-5">${'<div class="col-12"></div>'.repeat(above)}<div class="${column}"><div class="${wrapper}"><button type="button" class="btn btn-secondary dropdown-toggle" aria-expanded="true">${label}</button><ul class="dropdown-menu show${classes}" data-bs-popper="static">${entries}</ul></div></div>${'<div class="col-12"></div>'.repeat(below)}</div></div>`,
+		}),
+	),
+	...['sm', 'md', 'lg', 'xl', 'xxl'].map((step) =>
+		Object.freeze({
+			name: `Dropdown align ${step}`,
+			markup: `<div class="container-fluid"><div class="row row-gap-5">${[
+				{
+					edge: 'start',
+					classes: `dropdown-menu-end dropdown-menu-${step}-start`,
+					tasks: ['Weigh', 'Scan'],
+				},
+				{ edge: 'end', classes: `dropdown-menu-${step}-end`, tasks: ['Tag', 'Ship'] },
+			]
+				.map(
+					({ edge, classes, tasks }) =>
+						`<div class="col-6"><div class="dropdown"><button type="button" class="btn btn-secondary dropdown-toggle" aria-expanded="true">To the ${edge} from ${step}</button><ul class="dropdown-menu show ${classes}" data-bs-popper="static">${tasks.map((task) => `<li><span class="dropdown-item-text">${task} at ${step}</span></li>`).join('')}</ul></div></div>`,
+				)
+				.join('')}${'<div class="col-12"></div>'.repeat(2)}</div></div>`,
+		}),
+	),
+])
--- a/app/browser/Showcase.ts
+++ b/app/browser/Showcase.ts
@@ -9,6 +9,7 @@
 import { CardSection } from './sections/CardSection.js'
 import { CloseSection } from './sections/CloseSection.js'
 import { ContentSection } from './sections/ContentSection.js'
+import { DropdownSection } from './sections/DropdownSection.js'
 import { FormCheckSection } from './sections/FormCheckSection.js'
 import { FormControlSection } from './sections/FormControlSection.js'
 import { FormFloatingSection } from './sections/FormFloatingSection.js'
@@ -114,6 +115,7 @@
 			new BreadcrumbSection(this.#main),
 			new CloseSection(this.#main),
 			new InputGroupSection(this.#main),
+			new DropdownSection(this.#main),
 		]
 	}
 
--- a/app/browser/index.ts
+++ b/app/browser/index.ts
@@ -27,3 +27,4 @@
 export * from './sections/BreadcrumbSection.js'
 export * from './sections/CloseSection.js'
 export * from './sections/InputGroupSection.js'
+export * from './sections/DropdownSection.js'
--- a/guides/veneer.md
+++ b/guides/veneer.md
@@ -202,6 +202,7 @@
 | `src/styles/components/_progress.scss`      | The progress track, its stacked form, and the bar families in the components layer.                                                                                                                                                                |
 | `src/styles/components/_spinner.scss`       | The border and grow spinners, their small twins, and their keyframes in the components layer.                                                                                                                                                      |
 | `src/styles/components/_placeholder.scss`   | The placeholder, its height floors, its button box, and the glow and wave animations in the components layer.                                                                                                                                      |
+| `src/styles/components/_dropdown.scss`      | The dropdown wrappers, the caret in each direction, the menu with its placements and alignment ramp, the item states, header, divider, item text, and dark menu in the components layer, read by `tests/src/styles/components/dropdown.test.ts`.   |
 | `src/styles/components/_button-group.scss`  | The button group, its vertical twin, their joining relationships, and the toolbar in the components layer, read by `tests/src/styles/components/button-group.test.ts`.                                                                             |
 | `src/styles/components/_ratio.scss`         | The aspect-ratio box, its pseudo-element, and the named aspects in the components layer.                                                                                                                                                           |
 | `src/styles/components/_vr.scss`            | The vertical rule in the components layer.                                                                                                                                                                                                         |
@@ -825,6 +826,59 @@
 refused pointer, the density and radius factors, a consumer's own override, and the transition
 collapse under the staged preference.
 
+### Dropdown classes
+
+The dropdown key ships in its own partial in the components layer: the direction and centered
+wrappers, the toggle and its caret in each direction, the menu and its placement in each direction,
+the start and end alignments with their breakpoint ramp, the items and their states, the header, the
+divider, the item text, and the legacy dark menu. The input-group and button-group relationships the
+key records ship from the partials that write them, and the split-toggle and navigation menu names
+are withheld under § Deferred selectors.
+
+Every class is set in markup. A menu shows while it carries the `.show` class, and it takes the
+placement its wrapper names while it carries the `data-bs-popper` attribute, which is what a
+placement engine writes when it leaves a menu to the stylesheet. No rule opens, closes, or places a
+menu on its own. The Dropdown `plugin` row in § Compatibility records the behavior the engine owns.
+
+Every value the partial paints is Bootstrap 5.3.8's own. A length reads the Veneer scale token that
+already resolves to it, so the menu padding, the item and header insets, the divider margin, and the
+spacer between the toggle and the menu answer to the `--vn-factor-density` factor. The stacking
+level reads the `--vn-stack-dropdown` tier, so a retune of that tier moves every menu. A color reads
+the compatibility variable Bootstrap names, or the palette or gray token that carries Bootstrap's
+literal: the selected item holds the `--vn-palette-blue` fill behind the `--vn-palette-white-base`
+text in both color modes, and the header reads the `--vn-gray-600` token. Each slot is declared on
+the `.dropdown-menu` class, so a consumer's override lands when it is set on the menu, and the same
+override on an ancestor is shadowed.
+
+The caret is drawn from borders on an empty inline box, in one direction per wrapper: down on a
+plain toggle, up under the `.dropup` wrapper, towards the end under the `.dropend` wrapper, and
+towards the start under the `.dropstart` wrapper, where it moves to the `::before` pseudo-element
+and the `::after` caret is hidden, so a toggle paints one caret. Its margin and the sides that draw
+it are physical, because this cascade carries no right-to-left twin, and a toggle with no content
+drops the margin. The ledger's `declared` rows on the end and start caret sites are the release's
+own pairs: Bootstrap writes each of those selectors twice, and the comparison reads the value the
+second rule leaves.
+
+The menu opens one `--bs-dropdown-spacer` gap away from its toggle: under it by default, over it
+under the `.dropup` wrapper, and beside it under the `.dropend` and `.dropstart` wrappers. The
+`.dropdown-menu-end` class aligns the menu to its wrapper's end and the `.dropdown-menu-start` class
+to its start, and each breakpoint name switches that alignment at its boundary. No Veneer rule reads
+`--bs-position`; a dropdown engine reads it to choose the menu's placement, as Bootstrap's script
+does. The `.dropdown-center` and `.dropup-center` wrappers paint the menu at their start, as the
+cascade places it, because centering the menu on its toggle is placement a dropdown engine performs.
+
+The `.dropdown-menu-dark` class is the release's legacy dark menu. It retunes the menu's own slots
+on the class rather than under the theme attribute, so a dark menu holds one paint in both color
+modes, and it empties the shadow slot the way the release does.
+
+The `tests/src/styles/components/dropdown.test.ts` proof reads each resolved treatment in the
+browser: the resting and the shown menu, the placement in each direction against the toggle's box
+with the spacer gap, the caret sides on each pseudo-element, the empty toggle, the end alignment and
+every step of the ramp at its boundary and one pixel below it, the published side, the hover, focus,
+selected, pressed, and disabled item paints, the density factor, the stacking tier, a consumer's
+override, the dark menu's slots, and the plain menu retuning in a dark island while the dark menu
+holds.
+
 ### Button group classes
 
 The button group key ships whole, in its own partial after the vertical rule in the components
@@ -1737,6 +1791,19 @@
 | `.toast-header .btn-close`                                                       | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
 | `.modal-header .btn-close`                                                       | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
 | `.offcanvas-header .btn-close`                                                   | Overlays   | The owning component supplies this relationship.                                                                                                                                                                |
+| `.dropdown-toggle-split`                                                         | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
+| `.dropdown-toggle-split::after`                                                  | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
+| `.dropup .dropdown-toggle-split::after`                                          | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
+| `.dropend .dropdown-toggle-split::after`                                         | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
+| `.dropstart .dropdown-toggle-split::before`                                      | Disclosure | The owning component supplies this relationship.                                                                                                                                                                |
+| `.nav-tabs .dropdown-menu`                                                       | Nav        | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-nav .dropdown-menu`                                                     | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-expand-sm .navbar-nav .dropdown-menu`                                   | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-expand-md .navbar-nav .dropdown-menu`                                   | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-expand-lg .navbar-nav .dropdown-menu`                                   | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-expand-xl .navbar-nav .dropdown-menu`                                   | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-expand-xxl .navbar-nav .dropdown-menu`                                  | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
+| `.navbar-expand .navbar-nav .dropdown-menu`                                      | Navbar     | The owning component supplies this relationship.                                                                                                                                                                |
 
 ### Departures from the workspace rows
 
@@ -3566,6 +3633,37 @@
 | `valid-tooltip` | `.valid-tooltip` | `font-size` | —         | `0.875rem`       | `var(--vn-size-2)`                    | tokenized |
 | `valid-tooltip` | `.valid-tooltip` | `color`     | —         | `#fff`           | `var(--vn-palette-white-base)`        | tokenized |
 
+#### `dropdown`
+
+| Component  | Selector                              | Property                            | Condition | Bootstrap 5.3.8             | Veneer                                                              | Departure |
+| ---------- | ------------------------------------- | ----------------------------------- | --------- | --------------------------- | ------------------------------------------------------------------- | --------- |
+| `dropdown` | `.dropdown-menu`                      | `--bs-dropdown-zindex`              | —         | `1000`                      | `var(--vn-stack-dropdown)`                                          | tokenized |
+| `dropdown` | `.dropdown-menu`                      | `--bs-dropdown-padding-y`           | —         | `0.5rem`                    | `var(--vn-space-4)`                                                 | tokenized |
+| `dropdown` | `.dropdown-menu`                      | `--bs-dropdown-spacer`              | —         | `0.125rem`                  | `var(--vn-space-1)`                                                 | tokenized |
+| `dropdown` | `.dropdown-menu`                      | `--bs-dropdown-font-size`           | —         | `1rem`                      | `var(--vn-size-3)`                                                  | tokenized |
+| `dropdown` | `.dropdown-menu`                      | `--bs-dropdown-divider-margin-y`    | —         | `0.5rem`                    | `var(--vn-space-4)`                                                 | tokenized |
+| `dropdown` | `.dropdown-menu`                      | `--bs-dropdown-link-active-color`   | —         | `#fff`                      | `var(--vn-palette-white-base)`                                      | tokenized |
+| `dropdown` | `.dropdown-menu`                      | `--bs-dropdown-link-active-bg`      | —         | `#0d6efd`                   | `var(--vn-palette-blue)`                                            | tokenized |
+| `dropdown` | `.dropdown-menu`                      | `--bs-dropdown-item-padding-x`      | —         | `1rem`                      | `var(--vn-space-8)`                                                 | tokenized |
+| `dropdown` | `.dropdown-menu`                      | `--bs-dropdown-item-padding-y`      | —         | `0.25rem`                   | `var(--vn-space-2)`                                                 | tokenized |
+| `dropdown` | `.dropdown-menu`                      | `--bs-dropdown-header-color`        | —         | `#6c757d`                   | `var(--vn-gray-600)`                                                | tokenized |
+| `dropdown` | `.dropdown-menu`                      | `--bs-dropdown-header-padding-x`    | —         | `1rem`                      | `var(--vn-space-8)`                                                 | tokenized |
+| `dropdown` | `.dropdown-menu`                      | `--bs-dropdown-header-padding-y`    | —         | `0.5rem`                    | `var(--vn-space-4)`                                                 | tokenized |
+| `dropdown` | `.dropend .dropdown-toggle::after`    | `vertical-align`                    | —         | `0.255em`                   | `0`                                                                 | declared  |
+| `dropdown` | `.dropstart .dropdown-toggle::after`  | `display`                           | —         | `inline-block`              | `none`                                                              | declared  |
+| `dropdown` | `.dropstart .dropdown-toggle::before` | `vertical-align`                    | —         | `0.255em`                   | `0`                                                                 | declared  |
+| `dropdown` | `.dropdown-item`                      | `font-weight`                       | —         | `400`                       | `var(--vn-weight-body)`                                             | tokenized |
+| `dropdown` | `.dropdown-header`                    | `font-size`                         | —         | `0.875rem`                  | `var(--vn-size-2)`                                                  | tokenized |
+| `dropdown` | `.dropdown-menu-dark`                 | `--bs-dropdown-color`               | —         | `#dee2e6`                   | `var(--vn-gray-300)`                                                | tokenized |
+| `dropdown` | `.dropdown-menu-dark`                 | `--bs-dropdown-bg`                  | —         | `#343a40`                   | `var(--vn-gray-800)`                                                | tokenized |
+| `dropdown` | `.dropdown-menu-dark`                 | `--bs-dropdown-link-color`          | —         | `#dee2e6`                   | `var(--vn-gray-300)`                                                | tokenized |
+| `dropdown` | `.dropdown-menu-dark`                 | `--bs-dropdown-link-hover-color`    | —         | `#fff`                      | `var(--vn-palette-white-base)`                                      | tokenized |
+| `dropdown` | `.dropdown-menu-dark`                 | `--bs-dropdown-link-hover-bg`       | —         | `rgba(255, 255, 255, 0.15)` | `color-mix(in srgb, var(--vn-palette-white-base) 15%, transparent)` | tokenized |
+| `dropdown` | `.dropdown-menu-dark`                 | `--bs-dropdown-link-active-color`   | —         | `#fff`                      | `var(--vn-palette-white-base)`                                      | tokenized |
+| `dropdown` | `.dropdown-menu-dark`                 | `--bs-dropdown-link-active-bg`      | —         | `#0d6efd`                   | `var(--vn-palette-blue)`                                            | tokenized |
+| `dropdown` | `.dropdown-menu-dark`                 | `--bs-dropdown-link-disabled-color` | —         | `#adb5bd`                   | `var(--vn-gray-500)`                                                | tokenized |
+| `dropdown` | `.dropdown-menu-dark`                 | `--bs-dropdown-header-color`        | —         | `#adb5bd`                   | `var(--vn-gray-500)`                                                | tokenized |
+
 ### Additions
 
 Each row names one name this cascade emits that the official inventory lacks, attributed to the
@@ -3935,6 +4033,8 @@
 | is-invalid       | variable       | The `--bs-form-select-bg-icon` property carries the invalid mark on a single-value select; its value and the icon map behind it are proved in `tests/src/styles/components/validation.test.ts`.                                                                                                                                                                                                                                                                  | —                     | shipped  |
 | pagination       | selector       | Every official `.pagination`, `.page-link`, and `.page-item` selector ships in the components layer; resolved geometry, states, and stacking are proved in `tests/src/styles/components/pagination.test.ts`.                                                                                                                                                                                                                                                     | —                     | shipped  |
 | pagination       | variable       | Every official `--bs-pagination-*` property is declared, and each size class redeclares its padding, font, and radius; overrides are proved in `tests/src/styles/components/pagination.test.ts`.                                                                                                                                                                                                                                                                 | —                     | shipped  |
+| dropdown         | selector       | Every official `.dropdown-menu`, `.dropdown-item`, `.dropdown-toggle`, and direction wrapper selector ships in the components layer, the caret in each direction, the placement of each direction, the alignment ramp, the item states, and the legacy dark menu included, less the split-toggle and navigation names recorded under § Styles; resolved placement, caret, alignment, and paint are proved in `tests/src/styles/components/dropdown.test.ts`.     | —                     | shipped  |
+| dropdown         | variable       | Every official `--bs-dropdown-*` custom property is declared on `.dropdown-menu` and retuned by `.dropdown-menu-dark`, and every alignment class declares `--bs-position`; each slot is read beside the property it drives in `tests/src/styles/components/dropdown.test.ts`.                                                                                                                                                                                    | —                     | shipped  |
 | engine           | identity       | Cross-cutting engine: `VERSION` `'5.3.8'`; `DATA_KEY` `bs.${NAME}`; `EVENT_KEY` `.${DATA_KEY}`; `eventName(name)` returns `${name}${EVENT_KEY}`                                                                                                                                                                                                                                                                                                                  | —                     | accepted |
 | engine           | option         | Cross-cutting engine: `Default`/`DefaultType` inherited empty from `Config` unless a component overrides                                                                                                                                                                                                                                                                                                                                                         | —                     | accepted |
 | engine           | attribute      | Cross-cutting engine: `data-bs-config` JSON merges with `data-bs-*` attributes read by `Manipulator`; config object wins last                                                                                                                                                                                                                                                                                                                                    | —                     | accepted |
@@ -3956,6 +4056,10 @@
 | engine           | option         | util/config.js: Base `Config` class; `Default: {}`, `DefaultType: {}`; `NAME` getter throws; extended by `BaseComponent`, `Backdrop`, `FocusTrap`, `Swipe`, `TemplateFactory`                                                                                                                                                                                                                                                                                    | —                     | accepted |
 | engine           | method         | util/index.js: `getUID`, `getElement`, `isElement`, `isVisible`, `isDisabled`, `isRTL`, `toType`, `noop`, `parseSelector`, `reflow`, `execute`, `findShadowRoot`, `getNextActiveElement` exported as shared utilities                                                                                                                                                                                                                                            | —                     | accepted |
 | engine           | initialization | util/index.js: `getjQuery` skipped when `document.body` carries `data-bs-no-jquery`; `defineJQueryPlugin` registers `$.fn[NAME]` after `onDOMContentLoaded`                                                                                                                                                                                                                                                                                                      | —                     | accepted |
+| engine           | plugin         | Dropdown: the `[data-bs-toggle="dropdown"]` data API; the `autoClose`, `boundary`, `display`, `offset`, `popperConfig`, and `reference` options; the `toggle`, `show`, `hide`, `dispose`, and `update` methods; the paired `.bs.dropdown` events, the `show` and `hide` events cancelable; the `aria-expanded` attribute; arrow and `Escape` key focus; placement from the `--bs-position` property and the wrappers, centering included. J-ENGINE owns it.      | —                     | accepted |
+
+A `plugin` row records behavior the engine owns, while the classes it sets ship and render in
+markup.
 
 An accepted row records scope; a named Proof step obliges the official recording to agree with the
 row. A shipped selector or variable row requires its official vocabulary less the deferrals under
```

The `src/styles/index.scss` and `tests/conformance.test.ts` variants against `f898502` follow. They
cover B-PASSIVE-ORDER's barrel and its order case, and `replica2` passed with them.

```diff
--- a/src/styles/index.scss
+++ b/src/styles/index.scss
@@ -57,6 +57,7 @@
 @use 'components/form-floating';
 @use 'components/input-group';
 @use 'components/validation';
+@use 'components/dropdown';
 @use 'components/button-group';
 @use 'components/card';
 @use 'components/breadcrumb';
--- a/tests/conformance.test.ts
+++ b/tests/conformance.test.ts
@@ -107,6 +107,7 @@
 			'col',
 			'container',
 			'display',
+			'dropdown',
 			'figure',
 			'form',
 			'form-check',
@@ -360,6 +361,7 @@
 			placeholders: 'placeholder',
 		})
 		const passiveNames = new Set([
+			'dropdown',
 			'button-group',
 			'card',
 			'breadcrumb',
@@ -379,6 +381,7 @@
 			.flatMap(([, name]) => (name === undefined || !passiveNames.has(name) ? [] : [name]))
 			.map((name) => stems[name] ?? name)
 		expect(passive).toEqual([
+			'dropdown',
 			'button-group',
 			'card',
 			'breadcrumb',
```
