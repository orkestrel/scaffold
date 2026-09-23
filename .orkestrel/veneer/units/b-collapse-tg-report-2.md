# Unit TOGGLES (`tg`) report, round 2

`opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-tg` (branch `unit/tg`, the
round-2 writes uncommitted over `a658879`). Brief: `/home/user/scaffold/.orkestrel/veneer/units/tg-brief-2.md`.

## Outcome

Every item of the brief's § Findings to close is closed in the owned files or in the revised shared
patch. The patch is `/home/user/scaffold/.orkestrel/veneer/units/tg-shared-2.patch`, retained path
`/home/user/scaffold/.orkestrel/veneer/units/tg-shared-2.patch`, and it supersedes
`tmp/units/tg-shared.patch` whole. No stop condition fired. Every gate the brief names exited 0 on
the validation copy (`a658879` plus the owned files plus the patch). Every round-1 mutation still
reddens its case, and every table control reddens its freeze or binding case. One reading moved:
the `group-size-on-buttons` mutation reddens the same section case on a different assertion,
because finding 10 replaced the size list that assertion read (see § Deviations and choices).

## Touched files (owned)

| File | Change in this round |
| --- | --- |
| `src/styles/components/_button-group.scss` | The size loop comment names the forms it writes. |
| `src/styles/components/_input-group.scss` | No change in this round. |
| `tests/src/styles/components/button-group.test.ts` | The padding, density, and caret cases read `BUTTON_GROUP_SPLIT_CASES` and `BUTTON_GROUP_CARET_CASES`. The leading-split case indexes its groups before guarding them. The exclusion comment and the caret comment are corrected. |
| `tests/src/styles/components/input-group.test.ts` | The toggle-corner case mounts and reads `INPUT_GROUP_TOGGLE_CASES`. |
| `tests/app/browser/sections/ButtonGroupSection.test.ts` | The split-form case reads `BUTTON_GROUP_SPLIT_FORMS`. A disjointness assertion replaces the size list. |
| `tests/app/browser/sections/InputGroupSection.test.ts` | The toggle case filters `CASCADE_KEYS` by the subjects of the specimens that render a toggle. |

Diffstat against `a658879` (`git diff --stat a658879`):

```text
 src/styles/components/_button-group.scss           |  42 +++++-
 src/styles/components/_input-group.scss            |   7 +-
 .../browser/sections/ButtonGroupSection.test.ts    |  82 +++++++++++-
 .../app/browser/sections/InputGroupSection.test.ts |  57 +++++++++
 tests/src/styles/components/button-group.test.ts   | 142 ++++++++++++++++++++-
 tests/src/styles/components/input-group.test.ts    |  31 +++++
 6 files changed, 347 insertions(+), 14 deletions(-)
```

`git status --porcelain` lists only those files, each as `M`.

## Findings closed

Each item names its site by symbol or heading; line numbers are approximate.

**Guide, § Button group classes, the corners paragraph.**

- Before: "A child carrying the `.dropdown-toggle` class keeps its trailing corners, because its hidden
  menu follows it and the toggle is the group's visible end."
- After: "A child carrying the `.dropdown-toggle` class keeps its trailing corners, because the
  release expects its hidden menu to follow it, which often leaves the toggle as the group's visible
  end while it is not the last child." The split-toggle exception sentence stays.

**Guide, § Input group classes, the withheld paragraph.**

- Before: "so the toggle is the row's visible end while it is not the last child".
- After: "so the toggle can be the row's visible end while it is not the last child".

**Guide, § Button group classes, the split-toggle paragraph.**

- Before: "`calc(var(--vn-space-6) * 0.75)` at rest, `calc(var(--vn-space-4) * 0.75)` after a small
  button or inside a small group, and `calc(var(--vn-space-8) * 0.75)` after a large button or inside
  a large group."
- After: "the `calc(var(--vn-space-6) * 0.75)` value at rest, the `calc(var(--vn-space-4) * 0.75)`
  value after a small button or inside a small group, and the `calc(var(--vn-space-8) * 0.75)` value
  after a large button or inside a large group."

**Guide, § Input group classes, the proof sentence.**

- Before: "with and without that class".
- After: "with and without the `has-validation` class". The paragraph is re-wrapped at 100 columns
  from that sentence to its end.

**Guide, § Dropdown classes, the opening paragraph.**

- Before: "… ship from the partials that write them, which § Input group classes and § Button group
  classes describe, and the navigation menu names are withheld under § Deferred selectors."
- After: "… ship from the partials that write them. § Input group classes and § Button group classes
  describe those partials. The navigation menu names are withheld under § Deferred selectors."

**Guide, § Button group classes, the opening list.**

- Before: "… the relationships that join their children, and the sized group families."
- After: "… the relationships that join their children, the sized group families, and the split
  toggle."

**Constants doc blocks** (`app/browser/constants.ts`, the `BUTTON_GROUP_SPECIMENS` and
`INPUT_GROUP_SPECIMENS` blocks).

- Before, the button-group block: "Every class is set in markup and announces
  `aria-expanded="false"`: no script opens a menu here, …"
- After: "Every class is set in markup, and each toggle announces `aria-expanded="false"`: no script
  opens a menu in this region, …"
- Before, the input-group block: "Every class is set in markup and each toggle announces
  `aria-expanded="false"`: no script opens a menu here."
- After: "Every class is set in markup, and each toggle announces `aria-expanded="false"`: no script
  opens a menu in this region."

**Partial comment** (`_button-group.scss`, the comment on the `@each $size, $step in $sizes` loop).

- Before: "A sized split follows a button carrying the size class or sits in a group carrying it, so
  each size writes both forms, as the release's own extend of the group twin does."
- After: "Each size writes the form after a button carrying the size class and the form inside a
  group carrying it, because a sized split can sit in either position, as the release's own extend of
  the group twin does."

**The dropstart caret limit** (`button-group.test.ts`, the comment on the caret `it.each`).

- Before: "Each toggle here carries text, because the release's `:empty` rule already drops the
  margin of a toggle with no content, and a reading on an empty toggle could not tell the split rule
  from that one."
- After: "Each toggle in this case carries text, because the release's `:empty` rule already drops
  the `margin-left` of an empty toggle's `::after` caret, and a reading on an empty toggle under the
  plain, `.dropup`, or `.dropend` wrapper could not tell the split rule from that one. The
  `.dropstart` caret is a `::before` whose `margin-right` the `:empty` rule leaves, so the split rule
  alone clears it on an empty toggle too."
- A runtime probe confirmed the limit the comment states. It mounted an empty plain toggle
  and an empty split toggle under each wrapper in the validation copy
  (`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
  tests/src/styles/components/tg-probe.test.ts`). The caret margin read `0` on every empty toggle
  under the plain, `.dropup`, and `.dropend` wrappers, split or not. Under `.dropstart` it read
  `3.57` on the empty plain toggle and `0` on the empty split toggle. The probe was deleted after the
  run. § Not closed states the same limit.

**The case tables** (moved to `tests/setupStyles.ts`, each frozen at every level, documented,
exported, added to the export-list case, and added to a freeze case in `tests/setupStyles.test.ts`).

- `BUTTON_GROUP_SPLIT_CASES` (`{ label, group, button, pixels }`, rows `Base`, `Small`,
  `Small group`, `Large`, and `Large group`), after `BUTTON_GROUP_CHECK_MARKUP`.
  - Before: the inline table with its `''` sentinel and leading-space concatenation, the
    `toHaveLength(5)` count, the `?? ''` label, the parallel `[9, 6, 6, 12, 12]` literal, and the
    `slice(1)` base filter; the density case restated its markup and `9`.
  - After: the padding case mounts the table and reads each row by index through `requireValue`, then
    compares `{ label, pixels }` readings with the table's own. The density case reads the `Base` row
    through `find` and mounts it from the row's classes.
- `BUTTON_GROUP_CARET_CASES` (`{ group, pseudo, side }`), derived from `DROPDOWN_DIRECTION_CASES`
  and placed after it.
  - Before: the literal `it.each` rows.
  - After: `it.each(BUTTON_GROUP_CARET_CASES)`, the case titles unchanged.
- `INPUT_GROUP_TOGGLE_CASES` (`{ group, markup, corners }`, where `corners` holds one corner row per
  toggle), after `INPUT_GROUP_FLOATING_CASES`. Its rows are the plain group, the `has-validation`
  group, and the unvalidated group with feedback.
  - Before: the `lead` and `tail` fragments and the literal expected array.
  - After: the case mounts the table and compares its readings with `corners` scaled by the
    ungrouped radius.
- `BUTTON_GROUP_SPLIT_FORMS` (`{ name, selectors }`), after `BUTTON_GROUP_SPLIT_CASES`.
  - Before: the section proof's inline `[name, selectors]` matrix and the `['sm', 'lg']` list.
  - After: the section case iterates the table. The size list is replaced by an assertion that each
    selector of a form reaches a toggle no other selector of that form reaches.
- The input group section case.
  - Before: the inline `[name, squared]` pairs restating the capture rows.
  - After: it collects the subjects of the specimens that render a `.dropdown-toggle`, filters
    `CASCADE_KEYS` by those subjects, holds the filtered subjects equal to the collected ones, and
    reads each row's selector on its specimen's toggles.
- `tests/setupStyles.test.ts` adds these cases and extends these existing ones:
  - `styles setup > binds the button group selectors, corner resets, and lift states to the
    inventory` freezes `BUTTON_GROUP_SPLIT_CASES`, `BUTTON_GROUP_CARET_CASES`, and
    `BUTTON_GROUP_SPLIT_FORMS` with their rows and selector lists.
  - `styles setup > binds the split toggle padding forms, caret sides, and specimen forms to the
    inventory and the capture registry` is added. The padding rows must carry the classes the
    inventory's `dropdown` rules name beyond the resting row and must pad at the recorded rem value,
    in the release's order. The caret rows must name each recorded split caret rule and its cleared
    margin, in the release's order. The form names must equal the `CASCADE_KEYS` subjects whose
    selector carries `.dropdown-toggle-split`, in registry order, and the forms must carry every
    recorded sized split selector, in the release's order.
  - `input group case tables > freezes the input-group tables and carries the grouped children the
    proofs mount` freezes `INPUT_GROUP_TOGGLE_CASES` and its corner rows.
  - `input group case tables > derives each dropdown toggle corner row from the count the inventory
    squares the toggle at` is added. It reads the `nth-last-child` counts from the recorded
    `input-group` toggle rules, derives every row's corners from its markup's children, and pins the
    order to the plain, validated, and unvalidated-with-feedback groups.

**The guard** (`button-group.test.ts`, the case `squares the trailing corners of a split toggle that
opens its group, …`).

- Before: `const [leading, trailing] = [...host.querySelectorAll('.btn-group')].map((group) =>
  requireValue(group, 'No group'))` followed by an `undefined` throw.
- After: `const groups = [...host.querySelectorAll('.btn-group')]`, then
  `requireValue(groups[0], 'No leading group')` and `requireValue(groups[1], 'No trailing group')`.

**The stale exclusion comment** (`button-group.test.ts`, the comment on the
`leaves a dropdown toggle of a %s …` case).

- Before: "The exclusion is why a split toggle keeps its trailing corners where every other non-last
  child loses them, …"
- After: "The exclusion is why a split toggle further in keeps its trailing corners where every other
  non-last child loses them, …"

**The trailing menu's alignment** (`app/browser/constants.ts`, `Input group dropdown` and
`Input group dropdown validated`).

- Before: the trailing toggle's menu `<ul class="dropdown-menu">`.
- After: `<ul class="dropdown-menu dropdown-menu-end">`. The input-group doc block adds: "The trailing
  menu carries the `dropdown-menu-end` class, as the release's own markup writes the menu of a
  trailing toggle."

**The report.** This report states no tally of a growable set, names no list item by its position,
records each gate's command and result line, and names the retained patch path.

## Proof matrix

Every row's assertion is unchanged from round 1 except where the Round-2 reading column says it
moved. The mutations ran in the validation copy through
`/home/user/scaffold/.orkestrel/veneer/units/tg-instruments-2/mutate.py`, which rebuilds the styles after a
partial mutation and restores the file's bytes after the run. Each log is
`/home/user/scaffold/.orkestrel/veneer/units/tg-instruments-2/logs/mutation-<name>.log.txt`, and each styles or section run was
filtered with `-t` to the named case, as in round 1.

| Recorded selector | Proof case | Mutation | Round-2 reading |
| --- | --- | --- | --- |
| `.btn-group > .btn.dropdown-toggle-split:first-child` | styles: `squares the trailing corners of a split toggle that opens its group, …` | `first-child-selector-dropped` | `expected [ 6, 6, 6, 6 ] to deeply equal [ 6, +0, +0, 6 ]`, unchanged |
| the same | section: `renders each split toggle form in the specimen that names it, …` | `dropstart-toggle-after-action` | `expected { name: 'Split dropstart', …(2) } to deeply equal …` (the presence assertion), unchanged |
| the same | the same section case | `dropstart-action-removed` | `expected undefined to be true`, unchanged |
| `.dropdown-toggle-split` (padding) | styles: `pads each split toggle at three quarters of the inline padding its button size reads` | `base-padding-omitted` | `Base leading: expected 12 to be close to 9`; round 1 read the same numbers labelled `Base options leading` |
| the same | styles: `rescales the split toggle padding with the density factor` | `padding-literal` | `expected 9 to be close to 18`, unchanged |
| `.btn-sm + .dropdown-toggle-split` | the padding case | `small-button-form-omitted` | `Small leading: expected 9 to be close to 6` |
| `.btn-group-sm > .btn + .dropdown-toggle-split` | the padding case | `small-group-form-omitted` | `Small group leading: expected 9 to be close to 6` |
| the same | the section split-form case | `group-size-on-buttons` | moved: `"shared": 0` expected, `"shared": 1` received for `Split button small`; round 1 failed the removed `toBeNull` size-list assertion |
| `.btn-lg + .dropdown-toggle-split` | the padding case | `large-button-form-omitted`, `large-step-reads-base` | `Large leading: expected 9 to be close to 12` |
| `.btn-group-lg > .btn + .dropdown-toggle-split` | the padding case | `large-group-form-omitted` | `Large group leading: expected 9 to be close to 12` |
| `.dropdown-toggle-split::after` | styles: `drops the caret 'margin-left' on the '::after' of a split toggle in a 'btn-group' wrapper` | `plain-caret-rule-omitted` | `expected 3.57 to be +0`, unchanged |
| `.dropup .dropdown-toggle-split::after` | the `'btn-group dropup'` caret case | `dropup-caret-rule-omitted` | `expected 3.57 to be +0`, unchanged |
| `.dropend .dropdown-toggle-split::after` | the `'btn-group dropend'` caret case | `dropend-caret-rule-omitted` | `expected 3.57 to be +0`, unchanged |
| `.dropstart .dropdown-toggle-split::before` | the `'btn-group dropstart'` caret case | `dropstart-caret-rule-omitted` | `expected 3.57 to be +0`, unchanged |
| `.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)` | styles: `squares the trailing corners of a dropdown toggle that is not the visible end, with and without validation` | `plain-toggle-count-left-out` | `expected [ [ [ 6, 6, 6, 6 ], …(1) ], …(2) ] to deeply equal [ [ [ 6, +0, +0, 6 ], …(1) ], …(2) ]`, unchanged |
| the same | section: `renders a squared and a kept dropdown toggle in each dropdown specimen, …` | `trailing-toggle-kept-count-broken` (anchor updated for the `dropdown-menu-end` class) | `expected [ true, true ] to deeply equal [ true, false ]`, unchanged |
| `.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)` | the styles toggle-corner case | `validated-toggle-count-left-out` | the validated group's leading toggle reads `[ 6, 6, 6, 6 ]` against `[ 6, 0, 0, 6 ]`, unchanged |

Every run above read `Tests  1 failed` with the rest of its file skipped (`mutate-run.log.txt`).

Table controls, each a transform over `tests/setupStyles.ts` that runs the whole
`tests/setupStyles.test.ts` file, so its log shows every case the control reddens:

| Control | Case that reddens | Reading |
| --- | --- | --- |
| `split-cases-reordered` (`Small` and `Small group` swapped) | `binds the split toggle padding forms, caret sides, and specimen forms …` | `Tests  1 failed \| 113 passed (114)`, the `classes` lists out of order |
| `split-cases-unfrozen` (the table's `Object.freeze` removed) | `binds the button group selectors, corner resets, and lift states to the inventory` | `Tests  1 failed \| 113 passed (114)`, `expected false to be true` |
| `caret-cases-reordered` (derived from the reversed source) | `binds the split toggle padding forms, …` | `Tests  1 failed \| 113 passed (114)` |
| `caret-cases-unfrozen` (the row's `Object.freeze` removed) | `binds the button group selectors, …` | `Tests  1 failed \| 113 passed (114)` |
| `toggle-cases-reordered` (the validated row and the unvalidated-with-feedback row swapped) | `derives each dropdown toggle corner row from the count …` | `Tests  1 failed \| 113 passed (114)` |
| `toggle-cases-unfrozen` (the table's `Object.freeze` removed) | `freezes the input-group tables and carries the grouped children the proofs mount` | `Tests  1 failed \| 113 passed (114)` |
| `forms-reordered` (`Split button small` and `Split button large` swapped) | `binds the split toggle padding forms, …` | `Tests  1 failed \| 113 passed (114)`, the names out of registry order |
| `forms-unfrozen` (the `Split dropstart` selector list unfrozen) | `binds the button group selectors, …` | `Tests  1 failed \| 113 passed (114)` |

The unmutated controls are the final gate runs in the same copy: `gate-styles.log.txt`,
`gate-sections.log.txt`, and `gate-setup.log.txt`. After the mutation run, the owned test file and
`tests/setupStyles.ts` changed in comments and TSDoc only, and the guide changed in prose only; no
assertion and no table row moved. The gates were then re-run on the final bytes.

## Gates

Validation copy: `a658879` extracted with `git archive` into `tmp/probe/base`, `node_modules`
hard-linked, `git init` with no commit, the round-1 shared patch applied, the owned files synced by
`/home/user/scaffold/.orkestrel/veneer/units/tg-instruments-2/sync.sh`, and the round-2 shared edits written in place. The gates ran through
`/home/user/scaffold/.orkestrel/veneer/units/tg-instruments-2/gates.sh` after the last edit, one log each at
`/home/user/scaffold/.orkestrel/veneer/units/tg-instruments-2/logs/gate-<name>.log.txt`:

| Command | Result |
| --- | --- |
| `npm run format:check` | `All matched files use the correct format.`, exit 0 |
| `npm run lint:check` | no findings, exit 0 |
| `npm run check` | exit 0 |
| `npm run build:src` | exit 0 |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | `Tests  114 passed (114)`, exit 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/button-group.test.ts tests/src/styles/components/input-group.test.ts` | `Tests  61 passed (61)`, exit 0; the case titles match round 1 (`vitest list`) |
| `npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts` | `Tests  9 passed (9)`, exit 0; Vite printed its `externalized` warnings for the `tests/setupStyles.ts` import, which fail nothing |
| `npm run test:conformance` | `Tests  22 passed (22)`, exit 0 |
| `npm run test:guides` | `Tests  19 passed (19)`, exit 0 |
| `npm run test:policy` | `Tests  109 passed \| 1 skipped (110)`, exit 0 |

Sibling units' runs shared the host during this unit's runs. No timing failure appeared.

## Shared-file patch

The exact patch is `/home/user/scaffold/.orkestrel/veneer/units/tg-shared-2.patch` (1575 lines, SHA-256
`d0ddeffd1b3bd3c1905e3514169dd315355ab2928ca1541dbbbbf397f8424715`). Retain it at
`/home/user/scaffold/.orkestrel/veneer/units/tg-shared-2.patch`. It is one unified diff against
`a658879`, written by `/home/user/scaffold/.orkestrel/veneer/units/tg-instruments-2/patch.sh` with `git diff --no-index --full-index`, and it
supersedes `tmp/units/tg-shared.patch` whole.

```text
$ git apply --stat tmp/units/tg-shared-2.patch
 app/browser/constants.ts  |   59 +++
 guides/veneer.md          |  772 +++++++++++++++++++++++----------------------
 tests/setup.ts            |   42 ++
 tests/setupStyles.test.ts |  192 +++++++++--
 tests/setupStyles.ts      |  156 +++++++++
 5 files changed, 801 insertions(+), 420 deletions(-)
```

- Each file header carries an `index` line whose base hash equals `git rev-parse a658879:<path>`:
  `18b0a6da` for `app/browser/constants.ts`, `605d1a55` for `guides/veneer.md`, `8ec9f251` for
  `tests/setup.ts`, `daef14f5` for `tests/setupStyles.test.ts`, and `bbe11e6e` for
  `tests/setupStyles.ts`.
- `git -C /home/user/veneer-tg apply --check --verbose tmp/units/tg-shared-2.patch` checked each
  file and exited 0.
- The patch was applied to fresh `a658879` copies of those files, and `cmp` found each result
  byte-identical to the validated copy.
- The round-1 content carries over unchanged except where § Findings closed names a change: the
  specimens, the capture subjects and resting rows in `tests/setup.ts`, the table rows, the
  `INPUT_GROUP_DEFERRED` retirement, the deferral-row deletions, the ledger rows, and the
  compatibility cells. The round-1 guidance on applying the re-padded guide tables still holds.
- The shared files that need no patch are unchanged from round 1.

## Deviations and choices

No stop condition fired. The unit settled these choices and recorded them:

- **The `group-size-on-buttons` reading moved.** Finding 10 names the size list in the split-form
  section case as a restatement to replace. The list fed the assertion this mutation used to fail
  (`region.querySelector('.btn-group-lg .btn-lg')` to be null). Its replacement holds each form's
  selectors to disjoint toggles in their specimen, and the mutation reddens the same case on that
  assertion (`shared: 1` for `Split button small`). The rows' move did not change the reading; the
  replaced assertion did, as the finding directed. A size class written on a sized group's toggle
  alone, with the action button unsized, passes the replacement where the removed assertion failed.
  That toggle still answers to the group form alone, because the button form matches a toggle that
  follows a sized button.
- **The caret table is derived.** `BUTTON_GROUP_CARET_CASES` maps `DROPDOWN_DIRECTION_CASES`, so the
  pseudo-element a direction paints on has one home. A derived constant must follow its source in
  module order, so it sits after `DROPDOWN_DIRECTION_CASES`, away from the other `BUTTON_GROUP_*`
  tables; its TSDoc links the source.
- **The form table's rows are objects.** `BUTTON_GROUP_SPLIT_FORMS` rows are `{ name, selectors }`
  rather than tuples, which matches every other row shape in `tests/setupStyles.ts`.
- **The toggle table's corner rows.** `INPUT_GROUP_TOGGLE_CASES` keeps one row per group and lists
  one corner row per toggle inside `corners`, so the case reads its groups in document order as
  round 1 did.
- **The padding case's base filter is gone.** The round-1 `slice(1)` filter asserted that no sized
  toggle read the base value. The comparison with the table's `pixels` covers that, because every
  sized row's value differs from the `Base` row's. Every padding mutation still reddens on the
  per-row `toBeCloseTo` assertion.
- **The density case's mount template.** It reads the `Base` row's classes, label, and pixels, and
  restates the element template the padding case uses. A shared builder would be a new setup export
  the brief does not name.
- **Doc-block wording beyond finding 7.** The same blocks tallied specimens: "the sized pair", "one
  size list", "the one position", and "The dropdown pair". They became "The small and large split
  specimens", "a shared size list", "the only position in which", and "The dropdown specimens".
- **Locator wording in the owned proof.** "Each toggle here" and "a number written here" in
  `button-group.test.ts` became "in this case" and "in this test", matching the finding 7 reading of
  "here".
- **The `has-validation` wording in the input-group proof comment.** "The same markup without the
  class" became "The same children in a group without the `has-validation` class".

## Not closed

- **The caret-margin frames.** The split caret rules under the plain, `.dropup`, and `.dropend`
  wrappers do not change the `Split button` frame. Its toggles are empty, and the release's `:empty`
  rule already clears the `::after` caret's `margin-left`. The `.dropstart` rule is not limited this
  way: the `Split dropstart` frame shows it, because the `:empty` rule leaves the `::before` caret's
  `margin-right`. A visible reading of the other wrappers' rules needs a shipped visually hidden
  label class, which no unit in this family owns.
- **The authoritative runs.** The journey at every variant, `CAPTURE=1`, and the tree-wide gates
  after landing are the Orchestrator's runs.
- **The retained copies.** The report names the retained patch path. The Orchestrator copies the
  patch, this report, and the instruments there; the unit writes nothing outside the worktree.

## Instruments and evidence

Everything is under `/home/user/scaffold/.orkestrel/veneer/units/tg-instruments-2/`:

- `sync.sh`, `gates.sh`, and `mutate.py`, each headed with what changed from its round-1
  counterpart, and `patch.sh`, which writes the shared patch.
- `logs/`, holding every gate log, every mutation and control log, `mutate-run.log.txt`, and
  `mutation-rebuild.log.txt`.

The validation copy `tmp/probe/base`, the pristine extract `tmp/probe/orig`, the apply check copy
`tmp/probe/check`, and the caret probe were deleted before this report. To rebuild the copy, run
these steps from `/home/user/veneer-tg`:

1. Run `git archive a658879 | tar -x -C tmp/probe/base`, and the same into `tmp/probe/orig`.
2. Run `cp -al node_modules tmp/probe/base/node_modules`.
3. Run `git -C tmp/probe/base init -q`.
4. Run `/home/user/scaffold/.orkestrel/veneer/units/tg-instruments-2/sync.sh`.
5. Run `git -C tmp/probe/base apply ../../units/tg-shared-2.patch`.
