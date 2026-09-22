# Unit B-PASSIVE-B-2 — button group fix round — report

Every finding in the brief's § Findings is closed in the owned files. Two gate readings stay red,
each on a case outside this unit: `tests/setupServer.test.ts` (Blocker D1, off-limits) and
`tests/setupStyles.test.ts` (the shared-declaration sweep, whose repair D15 assigns to unit
B-SWEEP). Neither failing case is this unit's, and the brief named only the first of them; that
gap is Deviation 1.

Supersedes `tmp/units/b-passive-b-report.md`, written against `tmp/units/b-passive-b-brief.md`.
Effective brief: `tmp/units/b-passive-b-brief-2.md`.

## Per finding

### Finding 1 — three selectors had no treatment reading

**Change.** `tests/src/styles/components/button-group.test.ts` gains and widens these readings.

- `lifts the label of a focused grouped input of a %s while that input is unchecked`, new, over
  `['btn-group', 'btn-group-vertical']`. It mounts `BUTTON_GROUP_CHECK_MARKUP`, clears the markup's
  own checked input, reaches the leading input with `traverseAccessible('Left')`, and reads that
  input's label `z-index` against the resting sibling's. Clearing the checked state is what makes
  Tab reach an unchecked radio at all, and it is also what leaves one selector able to resolve the
  lift.
- `lifts the label of a checked grouped input of a %s over the border it shares`, widened from the
  horizontal direction alone to both, with the hit-test point taken on the axis each group runs.
- `leaves a dropdown toggle of a %s its trailing corners where a plain child loses them`, widened
  from the horizontal direction alone to both. The base radius is read off an ungrouped button
  rather than the group's box, because only the horizontal group declares a radius of its own. The
  trailing pair compared is each direction's own.
- `lifts the pressed child of a %s` gains the cascade binding. It asserts the pressed child also
  matches `:hover`, then reads every `z-index: 1` rule through `readRules` and requires each member
  of `BUTTON_GROUP_STACK_CASES` under both directions. The case states why: the installed pointer
  driver moves onto the target before pressing it, so the rendered reading cannot tell a cascade
  that lifts a pressed child from one that only lifts a hovered one.

**Mutations, red then green.** Command for every row:
`npm run test:src:styles -- tests/src/styles/components/button-group.test.ts`. Green before and
after each mutation: `Test Files 1 passed (1)`, `Tests 34 passed (34)`. Each mutation was reverted
by the exact reverse edit and the partial's SHA-256 digest
(`1e95eab6d5d734f3ca0a2341e462f63c1d5b63146bb81bcdaa898d91e8755139`) verified after every revert.

| Mutation in `src/styles/components/_button-group.scss`             | Red reading                                                       | Failing case                                                                                  |
| ------------------------------------------------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `.btn-group > .btn-check:focus + .btn` dropped from the lift list  | `Tests 1 failed \| 33 passed (34)`; `expected 'auto' to be '1'`   | `lifts the label of a focused grouped input of a btn-group while that input is unchecked`     |
| `.btn-group-vertical > .btn-check:focus + .btn` dropped            | `Tests 1 failed \| 33 passed (34)`; `expected 'auto' to be '1'`   | the same case at `btn-group-vertical`                                                          |
| `.btn-group-vertical > .btn-check:checked + .btn` dropped          | `Tests 1 failed \| 33 passed (34)`; `expected 'auto' to be '1'`   | `lifts the label of a checked grouped input of a btn-group-vertical over the border it shares` |
| `:not(.dropdown-toggle)` dropped from the vertical trailing radius | `Tests 1 failed \| 33 passed (34)`; `expected +0 to be 6`         | `leaves a dropdown toggle of a btn-group-vertical its trailing corners where a plain child loses them` |
| `.btn-group > .btn:active` dropped from the lift list              | `Tests 1 failed \| 33 passed (34)`; `expected […] to include '.btn-group>.btn:active'` | `lifts the pressed child of a btn-group`                          |

The last row is the one the audit called for. With `:active` dropped, the rendered assertion
`readStyle(middle, 'z-index')` still resolved `1` from the retained `:hover` member; the
`readRules` binding is the assertion that reddened.

### Finding 2 — the dropdown-toggle child

**Change.** The `Horizontal group` specimen in `app/browser/constants.ts` leads with
`<button type="button" class="btn btn-outline-secondary dropdown-toggle" aria-expanded="false">Row menu</button>`,
followed by the three action buttons the list already derived. The toggle is a non-last child with
plain children after it, carries no split-toggle class, no menu, and no `data-bs-toggle` attribute.
`tests/app/browser/sections/ButtonGroupSection.test.ts` gains the case
`renders the dropdown toggle the trailing-radius exclusion names, ahead of a plain child`, and the
selector census in `renders every grouped class the partial ships at least once` gains
`.btn-group > .btn.dropdown-toggle:not(:last-child)`.

**Mutation.** The toggle child removed from the specimen.
Command: `npm run test:app -- tests/app/browser/sections/ButtonGroupSection.test.ts`.
Red: `Tests 2 failed | 3 passed (5)` — `renders the dropdown toggle…` failed with
`Error: No grouped dropdown toggle`, and `renders every grouped class…` failed on the census entry.
Reverted by the exact reverse edit, digest of `app/browser/constants.ts` verified.
Green: `Tests 5 passed (5)`.

**Rendered evidence.** `tmp/capture/states/horizontal-group--light-1280.png` shows `Row menu` as a
fully rounded pill, `Row cut` and `Row copy` square on both sides, and `Row paste` keeping its
trailing corners. `horizontal-group--dark-390.png` shows the same relationship at the narrow dark
variant. The split-toggle rules stay deferred.

### Finding 3 — one toolbar specimen

**Change.** `Wide toolbar` is gone. `Crowded toolbar` is `Wrapping toolbar`, its groups announce
`Wrapping <action> actions`, and its buttons announce `Wrapping <action>` and
`Wrapping <action> all`, so the paragraph's "wrapping toolbar", the specimen label, and the group
names are one term. The `BUTTON_GROUP_SPECIMENS` doc block states the measured behaviour: the
toolbar holds its groups unwrapped at the 1280-wide variant and wraps them at the 390-wide one.
`tests/setup.ts` loses the `Wide toolbar` `CaptureSubject` member and the `wide-toolbar`
`CASCADE_KEYS` row; the surviving toolbar row is `wrapping-toolbar` / `Wrapping toolbar`, and it
carries `.btn-toolbar` / `flex-wrap` rather than the removed row's `.btn-toolbar > .btn-group` /
`display`, because `flex-wrap` is a property the key's own rule sets and the partial writes no
`.btn-toolbar > .btn-group` rule at all. Every `wide-toolbar--*` and `crowded-toolbar--*` frame and
accessibility artifact was removed from `tmp/capture/states/`.

**Rendered evidence, opened.** `wrapping-toolbar--light-390.png` shows the three groups on three
lines. `wrapping-toolbar--light-1280.png` shows all six buttons on one line. The doc block's claim
is what its own frames show.

### Finding 4 — the registry name

`GROUP_KEYS` is `BUTTON_GROUP_KEYS` at its declaration and its `CAPTURE_KEYS` spread in
`tests/setup.ts`, and at its import, its row in the export literal (moved to the sorted position
before `BUTTON_KEYS`), and its spread in `tests/setup.test.ts`. No `GROUP_KEYS` identifier remains
under `tests/`.

### Finding 5 — the registry remark

The `BUTTON_GROUP_KEYS` doc block states that the journey copies the specimen to the document's
start before placing the frame, the way `CASCADE_KEYS` states its own copy, and names the reason
and the rename: a radio's name is document-wide, so the journey renames the copy's `.btn-check`
inputs and each label's `for` attribute before the copy enters the page, because a copy carrying
the original's name would uncheck the specimen the frame is about.

### Finding 6 — the Showcase region name

`tests/app/browser/Showcase.test.ts` imports `BUTTON_COPY` from `@app/browser` and reads
``section[aria-label="${BUTTON_COPY.region}"] .${BUTTON_CLASS}``. The literal `'Buttons'` is gone
from that file.

### Finding 7 — the unused imports

`@use '../tokens'` and `@use '../mixins' as *` are dropped from
`src/styles/components/_button-group.scss`, which now opens on `@layer components {`. The compiled
cascade did not move: `npm run build:src` reported `dist/src/styles/index.css 90.86 kB` before and
after, the whole-file SHA-256 digest is
`ecf2e9ce61cf6facc1c6b58ba4b50d888c3c74edbe2c2f23d1b3273811875764` on both sides, and a diff of
every `.btn-group*` rule block extracted from the built file reports no difference.

### Finding 8 — the split-toggle bullet

Settled as the pointer, not the enumeration. The § Button group classes bullet reads: the
split-toggle selectors are absent, each belongs to the split toggle Disclosure owns, § Deferred
selectors carries a row for each, and that table is where they are enumerated. One home for the
deferred set, so the two tables cannot drift.

### Finding 9 — the § Files row

The `_button-group.scss` row names its proof: "The button group, its vertical twin, their joining
relationships, and the toolbar in the components layer, read by
`tests/src/styles/components/button-group.test.ts`." The role phrase was tightened from "their
overlap and radius relationships" to "their joining relationships" — the term the section body
already uses for the same thing — so the cell fits the table's existing 170-character Role column.
Measured: with the untightened wording the formatter reflowed every Role cell in the § Files table,
126 changed lines; with this wording the diff is the row itself. That reflow would have conflicted
with every sibling B-PASSIVE unit's appended § Files row at cherry-pick.

The § Button group classes proof sentence was extended in the same section to name the excluded
`.dropdown-toggle` reading in each direction, the unchecked focused label, and why the pressed
child's lift is read out of the cascade as well as rendered.

### Finding 10 — the portfolio

Regenerated with `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers CAPTURE=1 npm run test:journey --
--project 'journey:<variant>*'`, one variant at a time: `Tests 27 passed (27)`, exit 0, on each of
`light-390`, `light-1280`, `dark-390`, and `dark-1280`.

`tmp/capture/states/` holds 124 files. The button group frames, each written for `light-1280`,
`dark-1280`, `light-390`, and `dark-390`:

- element and page frames — `check-group-checked`, `check-group-focus`, `horizontal-group`,
  `vertical-group`, `nested-groups`, `small-group`, `large-group`, `wrapping-toolbar`, each as
  `<scenario>--<theme>-<viewport>.png`;
- accessibility artifacts — `check-group`, `horizontal-group`, `vertical-group`, `nested-groups`,
  `small-group`, `large-group`, `wrapping-toolbar`, each as
  `<subject>--<theme>-<viewport>-accessibility.txt`.

No `wide-toolbar` or `crowded-toolbar` name remains in the directory.

## Corrected coverage matrix

Every selector `BUTTON_GROUP_SELECTORS` records, with the case that reads its treatment. The proof
file is `tests/src/styles/components/button-group.test.ts` unless a row says otherwise. No recorded
rule of either key sits under an at-rule condition, so no row carries one.

| Inventory selector                                                  | Proof case that reads its treatment                                                          | Specimen         | Capture scenario      |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------- | --------------------- |
| `.btn-group`                                                        | lays a horizontal group out as an inline flex line whose children share the free space       | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn`                                                 | lays a horizontal group out as an inline flex line whose children share the free space       | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn:hover`                                           | lifts the hovered child of a btn-group                                                       | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn:focus`                                           | lifts the focused child of a btn-group                                                       | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn:active`                                          | lifts the pressed child of a btn-group — the `readRules` binding, not the rendered reading   | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn.active`                                          | lifts the written active child of a btn-group                                                | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn-check:checked + .btn`                            | lifts the label of a checked grouped input of a btn-group over the border it shares          | Check group      | `check-group-checked` |
| `.btn-group > .btn-check:focus + .btn`                              | lifts the label of a focused grouped input of a btn-group while that input is unchecked      | Check group      | `check-group-focus`   |
| `.btn-group > :not(.btn-check:first-child) + .btn`                  | rounds the first label of a check group and flattens the labels after it                     | Check group      | `check-group-checked` |
| `.btn-group > :not(.btn-check) + .btn`                              | keeps the $name child at position $index rounded on its outer corners alone                  | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn:nth-child(n+3)`                                  | keeps the $name child at position $index rounded on its outer corners alone                  | Horizontal group | `horizontal-group`    |
| `.btn-group > .btn:not(:last-child):not(.dropdown-toggle)`          | keeps the $name child at position $index rounded on its outer corners alone, and leaves a dropdown toggle of a btn-group its trailing corners where a plain child loses them | Horizontal group | `horizontal-group` |
| `.btn-group > .btn-group:not(:first-child)`                         | rounds a nested horizontal group at the outer ends and flattens the join between them        | Nested groups    | `nested-groups`       |
| `.btn-group > .btn-group:not(:first-child) > .btn`                  | rounds a nested horizontal group at the outer ends and flattens the join between them        | Nested groups    | `nested-groups`       |
| `.btn-group > .btn-group:not(:last-child) > .btn`                   | rounds a nested horizontal group at the outer ends and flattens the join between them        | Nested groups    | `nested-groups`       |
| `.btn-group-vertical`                                               | lays a vertical group out as a full-width column                                             | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn`                                        | lays a vertical group out as a full-width column                                             | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn:hover`                                  | lifts the hovered child of a btn-group-vertical                                              | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn:focus`                                  | lifts the focused child of a btn-group-vertical                                              | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn:active`                                 | lifts the pressed child of a btn-group-vertical — the `readRules` binding                    | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn.active`                                 | lifts the written active child of a btn-group-vertical                                       | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn-check:checked + .btn`                   | lifts the label of a checked grouped input of a btn-group-vertical over the border it shares | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn-check:focus + .btn`                     | lifts the label of a focused grouped input of a btn-group-vertical while that input is unchecked | Vertical group | `vertical-group`    |
| `.btn-group-vertical > :not(.btn-check) + .btn`                     | keeps the $name child at position $index rounded on its outer corners alone                  | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn:nth-child(n+3)`                         | keeps the $name child at position $index rounded on its outer corners alone                  | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn:not(:first-child)`                      | pulls each neighbour back by one border width on the axis its group runs                     | Vertical group   | `vertical-group`      |
| `.btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle)` | keeps the $name child at position $index rounded on its outer corners alone, and leaves a dropdown toggle of a btn-group-vertical its trailing corners where a plain child loses them | Vertical group | `vertical-group` |
| `.btn-group-vertical > .btn-group`                                  | stacks a vertical group of groups and flattens every join along the column                   | Nested groups    | `nested-groups`       |
| `.btn-group-vertical > .btn-group:not(:first-child)`                | stacks a vertical group of groups and flattens every join along the column                   | Nested groups    | `nested-groups`       |
| `.btn-group-vertical > .btn-group:not(:first-child) > .btn`         | stacks a vertical group of groups and flattens every join along the column                   | Nested groups    | `nested-groups`       |
| `.btn-group-vertical > .btn-group:not(:last-child) > .btn`          | stacks a vertical group of groups and flattens every join along the column                   | Nested groups    | `nested-groups`       |
| `.btn-group-sm > .btn`                                              | keeps the sized group families rounded at their own size radius                              | Small group      | `small-group`         |
| `.btn-group-lg > .btn`                                              | keeps the sized group families rounded at their own size radius                              | Large group      | `large-group`         |
| `.btn-toolbar`                                                      | wraps a toolbar onto a second line under pressure and keeps its groups leading               | Wrapping toolbar | `wrapping-toolbar`    |

Three readings the matrix qualifies rather than claims whole.

- The exclusion half of each `:not(.dropdown-toggle)` row is read on the proof's own paired markup.
  The showcase renders a `.dropdown-toggle` child under `.btn-group` (the `Horizontal group`
  specimen), and renders none under `.btn-group-vertical`, so the vertical exclusion has a proof and
  no specimen.
- `check-group-focus` shoots a label whose input is both checked and focused. The reading that
  isolates the focus selector is the styles proof's unchecked one; the frame is the nearest rendered
  view of the selector's host.
- Each `:active` row is read out of the cascade. The pointer driver's approach makes the rendered
  press indistinguishable from a hover, which the case states.

## Touched files

| File                                                     | Change                                                                                                    |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `src/styles/components/_button-group.scss`               | Dropped the two unused `@use` lines; the built cascade is byte-identical                                  |
| `tests/src/styles/components/button-group.test.ts`       | Added the unchecked-focus reading; widened the checked and exclusion cases to both directions; bound the stacking selector list through `readRules` |
| `app/browser/constants.ts`                               | Removed `Wide toolbar`; renamed the toolbar specimen and its labels; added the dropdown-toggle child; rewrote the specimens doc block |
| `tests/app/browser/sections/ButtonGroupSection.test.ts`  | Added the dropdown-toggle case; updated the specimen list and the selector census                          |
| `tests/setup.ts`                                         | Renamed `GROUP_KEYS`; restated its doc block; dropped the removed subject and row; renamed the toolbar scenario |
| `tests/setup.test.ts`                                    | Renamed the import, the export-literal row (sorted position), and the spread                              |
| `tests/app/browser/Showcase.test.ts`                     | Read the Button region name from `BUTTON_COPY.region`                                                      |
| `guides/veneer.md`                                       | § Files row names the proof; split-toggle bullet points at § Deferred selectors; § Button group classes proof sentence extended |
| `tmp/capture/states/**`                                  | Removed every `wide-toolbar` and `crowded-toolbar` artifact; regenerated every button group frame          |

Diffstat over the tracked files this round changed, against the round's start:
`src/styles/components/_button-group.scss` -3 lines; `tests/src/styles/components/button-group.test.ts`
grew to 511 lines; `tests/app/browser/sections/ButtonGroupSection.test.ts` grew to 189 lines. The
unit's whole working tree against `3a9202a`:

```text
 app/browser/Showcase.ts               |   2 +
 app/browser/constants.ts              |  90 ++++++
 app/browser/index.ts                  |   1 +
 guides/veneer.md                      | 541 ++++++++++++++++++----------------
 src/styles/index.scss                 |   1 +
 tests/app/browser/Showcase.test.ts    |  10 +-
 tests/app/browser/index.test.ts       |   6 +
 tests/app/browser/integration.test.ts | 115 +++++++-
 tests/conformance.test.ts             |   2 +
 tests/setup.test.ts                   |   9 +-
 tests/setup.ts                        |  76 ++++-
 tests/setupStyles.test.ts             |  77 +++++
 tests/setupStyles.ts                  | 139 +++++++++
 13 files changed, 803 insertions(+), 266 deletions(-)
```

Untracked, added by this unit's first round and carried forward:
`app/browser/sections/ButtonGroupSection.ts` (20 lines),
`src/styles/components/_button-group.scss` (94), 
`tests/app/browser/sections/ButtonGroupSection.test.ts` (189),
`tests/src/styles/components/button-group.test.ts` (511).

## Gate readings

Run from `/home/user/veneer-bb` after the last edit, cheap first.

| Command                    | Exit | Reading                                                                      |
| -------------------------- | ---- | ------------------------------------------------------------------------------ |
| `npm run format:check`     | 0    | All matched files use the correct format, 215 files                          |
| `npm run lint:check`       | 0    | No diagnostic                                                                |
| `npm run check`            | 0    | Root, src core, src browser, src styles, and app browser                     |
| `npm run build:src`        | 0    | `dist/src/styles/index.css` 90.86 kB, digest `ecf2e9ce…`                     |
| `npm run test:src:styles`  | 0    | `Test Files 59 passed (59)`, `Tests 450 passed (450)`                        |
| `npm run test:conformance` | 0    | `Tests 17 passed (17)`                                                       |
| `npm run test:guides`      | 0    | `Tests 18 passed (18)`                                                       |
| `npm run test:app`         | 1    | `Tests 1 failed \| 30 passed (31)` — the failure is Blocker 3                |
| `npm run test:setup`       | 1    | `Tests 2 failed \| 159 passed (161)` — Blocker D1 and the sweep case          |
| `npm run test:policy`      | 0    | `Tests 109 passed \| 1 skipped (110)` — an observation, not a criterion      |

Capture journeys, each its own run so no two Chromium variants contend: `Tests 27 passed (27)`,
exit 0, on `journey:light-390*`, `journey:light-1280*`, `journey:dark-390*`, and
`journey:dark-1280*`.

The failing case names, and why neither is this unit's:

- `tests/setupServer.test.ts > server setup > skips engine and CSS obligations whose Proof cell is a dash`
  — Blocker D1. The file is off-limits; the patch is the first round's, in
  `tmp/units/b-passive-b-report.md` § Blocker 1.
- `tests/setupStyles.test.ts > styles setup > carries no shared written declaration block across style partials`
  — reported pair: `components/_button-group.scss:33` (`.btn-toolbar`) against
  `components/_grid.scss:6` (`.row`), sharing `display: flex` and `flex-wrap: wrap`. D15 rules that
  pair a coincidence and keeps both copies inline, and assigns the gate's repair — the
  `findDuplication` leaf in `tests/setupServer.ts` and the rewritten gate case in
  `tests/setupStyles.test.ts` — to unit B-SWEEP. Both files are outside this unit's owned set, and
  no edit inside the owned set can clear the reading without contradicting D15. See Deviation 1.

`npm run test:journey` whole was not run; the four capture runs cover the same file per variant.

## `git status --porcelain`

```text
 M app/browser/Showcase.ts
 M app/browser/constants.ts
 M app/browser/index.ts
 M guides/veneer.md
 M src/styles/index.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/index.test.ts
 M tests/app/browser/integration.test.ts
 M tests/conformance.test.ts
 M tests/setup.test.ts
 M tests/setup.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
?? app/browser/sections/ButtonGroupSection.ts
?? src/styles/components/_button-group.scss
?? tests/app/browser/sections/ButtonGroupSection.test.ts
?? tests/src/styles/components/button-group.test.ts
```

Identical to the status this round started from: no path added, none removed. `tmp/` is ignored.

## Deviations

### Recorded, work carried on

1. **Acceptance criterion 3 names one red in `test:setup`; there are two.** Expected: Blocker D1 as
   the only red. Found: Blocker D1 plus
   `tests/setupStyles.test.ts > carries no shared written declaration block across style partials`,
   on the `.btn-toolbar` and `.row` pair. Evidence in § Gate readings. The brief's § Context closes
   the report's Blocker 2 by D15, and D15's own text assigns the gate mechanism to unit B-SWEEP, so
   the case stays red until B-SWEEP lands. Done: every owned finding. Hypothesis: the brief read
   D15's closure of the design question as closure of the gate reading.

2. **`tests/setupStyles.test.ts` is modified in the working tree and appears in neither the owned
   nor the off-limits list of this brief.** The first round wrote its case
   `binds the button group selectors, corner resets, and lift states to the inventory`. This round
   made no edit to that file. Named here so the omission is visible rather than inferred.

### Settled inside the owned scope

- **The `Horizontal group` specimen carries the dropdown toggle**, as its leading child. Leading
  position makes the toggle render as a fully rounded pill beside the joined run, so the exclusion
  reads as a deliberate demonstration rather than a rendering defect; any position shows the same
  mid-group seam, and the brief fixes the plain-child-after shape.
- **The toolbar's remaining `CASCADE_KEYS` row reads `.btn-toolbar` / `flex-wrap`.** The removed
  `crowded-toolbar` row read `.btn-toolbar > .btn-group` / `display`, and the partial writes no such
  rule; the registry's contract is a property the key's own rule sets.
- **The § Files row's role phrase is "their joining relationships".** The measured reason is in
  Finding 9.
- **Finding 8 settles on the pointer rather than the enumeration**, so the deferred set has one
  home.
- **Case titles, the guide's sentence forms, and the toolbar group labels** were settled here.

### Reported, not this unit's

- **`guides/veneer.md` § Showcase does not name the Button group region.** Its paragraph enumerates
  the Showcase, Buttons, Content, Type, Media, Links, Layout, and Table regions and stops. The
  region this unit adds is missing from it. That paragraph is outside this brief's guide scope
  (§ Button group classes, § Button toolbar classes, and the `_button-group.scss` § Files row), so
  it is untouched and named here for a carrier.
