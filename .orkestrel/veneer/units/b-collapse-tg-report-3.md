# Unit TOGGLES (`tg`) report, round 3

`builder` on Sonnet, native subagent, sole writer in `/home/user/veneer-tg` (branch `unit/tg`, the
round-3 writes uncommitted over `a658879`). Brief: `/home/user/veneer-tg/tmp/units/tg-brief-3.md`.

## Outcome

Every finding of round 2 (`tg-audit-2-verdict.md` § Reconciliation) is closed, in the owned files or
in the revised shared patch. The patch is `/home/user/veneer-tg/tmp/units/tg-shared-3.patch`,
retained path `/home/user/scaffold/.orkestrel/veneer/units/tg-shared-3.patch`, and it supersedes
`tmp/units/tg-shared-2.patch` whole (retained path
`/home/user/scaffold/.orkestrel/veneer/units/tg-shared-2.patch`). No stop condition fired. Every
gate the brief names exited 0 on the validation copy (`a658879` plus the owned files plus the
patch), on the final bytes. Every round-2 mutation still reddens its case, on the assertion round 2
recorded, and the added `dropstart-caret-rule-omitted-empty` mutation reddens the added empty-pair
case. Every table control still reddens its freeze or binding case.

## Findings closed

Each item names its site by symbol or heading; line numbers are approximate.

**Guide, § Button group classes, the corners paragraph** (`guides/veneer.md`).

- Before: "because the release expects its hidden menu to follow it, which often leaves the toggle
  as the group's visible end while it is not the last child."
- After: "because the release's markup puts its hidden menu after it, which often leaves the toggle
  as the group's visible end while it is not the last child."

**Guide, § Button group classes, the opening paragraph** (`guides/veneer.md`).

- Before: the third line of the paragraph ran to 124 columns (`declares no custom property of its
  own. Its radius reads \`--bs-border-radius\` and its overlap reads \`--bs-border-width\`, and`).
- After: the paragraph is re-wrapped at 100 columns, no word changed. Every line now reads at or
  under 100 columns.

**Constants doc blocks** (`app/browser/constants.ts`).

- `BUTTON_GROUP_SPECIMENS` block: before, "Every class is set in markup, and each toggle announces
  \`aria-expanded="false"\`: no script opens a menu in this region, …"; after, "… each toggle
  announces the \`aria-expanded="false"\` state: no script opens a menu in this region, …". The
  block is re-wrapped at 100 columns.
- `INPUT_GROUP_SPECIMENS` block: before, "Every class is set in markup, and each toggle announces
  \`aria-expanded="false"\`: no script opens a menu in this region."; after, "… each toggle
  announces the \`aria-expanded="false"\` state: no script opens a menu in this region." The block
  is re-wrapped at 100 columns.

**Partial comment** (`src/styles/components/_button-group.scss`, the size loop comment).

- Before: "Each size writes the form after a button carrying the size class and the form inside a
  group carrying it, because a sized split can sit in either position, as the release's own extend
  of the group twin does."
- After: "Each size writes the form after a button carrying the size class and the form inside a
  group carrying it, as the release's own extend of the group twin does, because a sized split can
  sit in either position." Wrapped at 100 columns with the `//` prefix.

**The `side` field becomes `margin`.**

- `tests/setupStyles.ts`, `BUTTON_GROUP_CARET_CASES`: the row field `side` is renamed `margin`
  (`margin: pseudo === '::before' ? 'margin-right' : 'margin-left'`). Its TSDoc `@remarks` now reads
  "Each row is derived from the {@link DROPDOWN_DIRECTION_CASES} constant, so the pseudo-element a
  direction paints its caret on has one home. The `group` field is the wrapper's class list: the
  plain direction's `dropdown` wrapper is the `btn-group` class alone, and every other direction
  adds its wrapper class to that one. The `margin` field names the property that stands the caret
  apart from the toggle's text: the `margin-right` property on a `::before` caret and the
  `margin-left` property on an `::after` caret."
- `tests/setupStyles.test.ts`, the binding case: title becomes `binds the split toggle padding
  forms, caret margins, and specimen forms to the inventory and the capture registry`; the
  destructuring becomes `({ group, pseudo, margin })` and the declaration
  `{ property: margin, value: '0' }`.
- `tests/src/styles/components/button-group.test.ts`, the caret case: title becomes `'drops the
  caret $margin on the $pseudo of a split toggle in a $group wrapper'`, the parameter
  `({ group, pseudo, margin })`, and both `readPixels` calls take `margin` in place of `side`.
- Confirmed with `grep -n "side" tests/src/styles/components/button-group.test.ts
  tmp/probe/base/tests/setupStyles.test.ts` (the validation copy, before it was deleted): every hit
  is an unrelated English use of "side" or "sides" (layout, border, or prose), none reading the
  renamed field.

**Field nouns in the four new TSDoc blocks** (`tests/setupStyles.ts`), summary sentences kept.

- `BUTTON_GROUP_SPLIT_CASES`: `@remarks` now reads "The `group` field is the wrapper's class list,
  and the `button` field the class list the action button and its split toggle each carry, so a
  sized form reads its size either from its buttons or from its group. A sized group leaves its
  buttons unsized, which leaves the group's own selector the only rule that can resize its toggle.
  The `pixels` field is the release's own padding for the form, three quarters of the action
  button's inline step: that step reads 12 pixels at rest, 8 in a small form, and 16 in a large
  form."
- `BUTTON_GROUP_SPLIT_FORMS`: `@remarks` now reads "The `name` field is the specimen's name and the
  `selectors` field the forms its frame shows. Each selector reaches a toggle no other selector of
  the same specimen reaches, so the frame shows every form on a toggle of its own. The plain split
  names its wrappers by what they lack, because the plain wrapper carries the `btn-group` class
  alone and every direction wrapper carries that class too."
- `INPUT_GROUP_TOGGLE_CASES`: `@remarks` now reads "The `group` field is the group's class list and
  the `markup` field its children: a toggle and its hidden menu before a text control, and a second
  toggle and menu after it. The `corners` field holds one row per toggle in document order, each
  listing the toggle's corners clockwise from the top left, where `1` is the radius an ungrouped
  button carries and `0` a squared corner. A toggle is squared while at least two children follow
  it, and while at least three follow it in a group carrying the `has-validation` class, whose
  feedback is the extra child. The unvalidated row with feedback carries the validated row's
  children in a group without that class, so its trailing toggle, three from the end, is squared,
  and the class is what keeps the validated row's trailing corners."
- `BUTTON_GROUP_CARET_CASES`: the same `@remarks` text as the preceding "side field becomes margin"
  item.
- Each block is re-wrapped at 100 columns.

**The caret comment** (`tests/src/styles/components/button-group.test.ts`, before the
`it.each(BUTTON_GROUP_CARET_CASES)` case).

- Before: "Each toggle here carries text, because the release's `:empty` rule already drops the
  margin of a toggle with no content, and a reading on an empty toggle could not tell the split
  rule from that one …" (round-2 text).
- After: "Each toggle in this case carries text, because the release's `:empty` rule already drops
  the `margin-left` value of an empty toggle's `::after` caret, and a reading on an empty toggle
  under the plain, `.dropup`, or `.dropend` wrapper could not tell the split rule from that one. The
  `.dropstart` caret is a `::before` pseudo-element whose `margin-right` value the `:empty` rule
  leaves, so the split rule alone clears it on an empty toggle too, which the following case reads
  on an empty pair. The plain toggle beside each split one is the reading the split rule moves."
  Wrapped at 100 columns with the `//` prefix.

**The adopted probe.** Added directly after the `it.each(BUTTON_GROUP_CARET_CASES)` case:
`it('clears the caret margin of an empty split toggle in a dropstart wrapper, where the
empty-toggle rule leaves it', …)`, mounting an empty plain toggle and an empty split toggle each
under a `.dropstart` wrapper, and asserting the plain toggle's `::before` `margin-right` reads the
release's caret gap while the split toggle's reads `0`. `tmp/units/tg-instruments-3/mutate.py`
gained the entry `'dropstart-caret-rule-omitted-empty'`, the same edit as
`'dropstart-caret-rule-omitted'`, proved against `STYLES + [BGT, '-t', 'empty split toggle in a
dropstart wrapper']`. The mutation reddens the added case (log
`tmp/units/tg-instruments-3/logs/mutation-dropstart-caret-rule-omitted-empty.log.txt`); the
unmutated control is the final `gate-styles.log.txt` run, where the added case passes.

**The case list.** `npx vitest list --config configs/src/vite.styles.config.ts
tests/src/styles/components/button-group.test.ts tests/src/styles/components/input-group.test.ts`
ran in the validation copy; its output is retained at
`tmp/units/tg-instruments-3/logs/list-styles.log.txt`. The case titles equal round 2's set (61
titles) plus one addition and two retitles: the added case is `button group split toggle > clears
the caret margin of an empty split toggle in a dropstart wrapper, where the empty-toggle rule
leaves it`; the two retitled caret cases are `button group split toggle > drops the caret
'margin-left' on the '::after' of a split toggle in a 'btn-group' wrapper` (was `'btn-group'
wrapper`'s `$side` reading, now `$margin`, same margin-left/margin-right values per wrapper as round
2) and its `dropup`, `dropend`, and `dropstart` wrapper siblings, each now reading `$margin` in
place of `$side` in the rendered title (`drops the caret 'margin-left' …` for `dropup`/`dropend`,
`drops the caret 'margin-right' …` for `dropstart`). No other case title moved.

## Proof matrix

Every round-2 mutation and control ran unchanged against this round's bytes, through the round-3
`mutate.py`, plus the added `dropstart-caret-rule-omitted-empty` mutation. One log per run under
`tmp/units/tg-instruments-3/logs/mutation-<name>.log.txt` and `mutation-<control>.log.txt`. The
unmutated controls are the final gate runs in the same copy (`gate-styles.log.txt`,
`gate-sections.log.txt`, `gate-setup.log.txt`).

| Mutation or control | Case | Reading |
| --- | --- | --- |
| `base-padding-omitted` | styles padding case | `Tests 1 failed` |
| `small-button-form-omitted` | styles padding case | `Tests 1 failed` |
| `small-group-form-omitted` | styles padding case | `Tests 1 failed` |
| `large-button-form-omitted` | styles padding case | `Tests 1 failed` |
| `large-group-form-omitted` | styles padding case | `Tests 1 failed` |
| `large-step-reads-base` | styles padding case | `Tests 1 failed` |
| `padding-literal` | styles density case | `Tests 1 failed` |
| `plain-caret-rule-omitted` | styles `'btn-group'` caret case | `Tests 1 failed` |
| `dropup-caret-rule-omitted` | styles `'btn-group dropup'` caret case | `Tests 1 failed` |
| `dropend-caret-rule-omitted` | styles `'btn-group dropend'` caret case | `Tests 1 failed` |
| `dropstart-caret-rule-omitted` | styles `'btn-group dropstart'` caret case | `Tests 1 failed` |
| `dropstart-caret-rule-omitted-empty` (added) | styles empty-pair case | `Tests 1 failed`, on the added case (confirmed in its log) |
| `first-child-selector-dropped` | styles trailing-corners case | `Tests 1 failed` |
| `plain-toggle-count-left-out` | styles toggle-corner case | `Tests 1 failed` |
| `validated-toggle-count-left-out` | styles toggle-corner case | `Tests 1 failed` |
| `dropstart-toggle-after-action` | section split-form case | `Tests 1 failed` |
| `dropstart-action-removed` | section split-form case | `Tests 1 failed` |
| `group-size-on-buttons` | section split-form case | `Tests 1 failed`, on the disjoint-selector assertion the round-2 replacement introduced |
| `trailing-toggle-kept-count-broken` | section toggle-kept case | `Tests 1 failed` |
| `split-cases-reordered` | setup binding case | `Tests 1 failed \| 113 passed (114)` |
| `split-cases-unfrozen` | setup selector-freeze case | `Tests 1 failed \| 113 passed (114)` |
| `caret-cases-reordered` | setup binding case | `Tests 1 failed \| 113 passed (114)` |
| `caret-cases-unfrozen` | setup selector-freeze case | `Tests 1 failed \| 113 passed (114)` |
| `toggle-cases-reordered` | setup toggle-corner-derivation case | `Tests 1 failed \| 113 passed (114)` |
| `toggle-cases-unfrozen` | setup toggle-freeze case | `Tests 1 failed \| 113 passed (114)` |
| `forms-reordered` | setup binding case | `Tests 1 failed \| 113 passed (114)` |
| `forms-unfrozen` | setup selector-freeze case | `Tests 1 failed \| 113 passed (114)` |

No reading moved from round 2 except the addition of `dropstart-caret-rule-omitted-empty`, which is
new in this round.

## Gates

Validation copy: `a658879` extracted with `git archive` into `tmp/probe/base`, `node_modules`
hard-linked, `git init` with no commit, the round-2 shared patch applied, the owned files synced by
`tg-instruments-3/sync.sh`, and the round-3 shared edits written in place. The gates ran through
`tg-instruments-3/gates.sh` after the last edit, one log each at
`tmp/units/tg-instruments-3/logs/gate-<name>.log.txt`:

| Command | Result |
| --- | --- |
| `npm run format:check` | `All matched files use the correct format.`, exit 0 |
| `npm run lint:check` | no findings, exit 0 |
| `npm run check` | exit 0 |
| `npm run build:src` | exit 0 |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupStyles.test.ts` | `Tests  114 passed (114)`, exit 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/button-group.test.ts tests/src/styles/components/input-group.test.ts` | `Tests  62 passed (62)`, exit 0 (61 round-2 cases plus the added empty-pair case) |
| `npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts` | `Tests  9 passed (9)`, exit 0 |
| `npm run test:conformance` | `Tests  22 passed (22)`, exit 0 |
| `npm run test:guides` | `Tests  19 passed (19)`, exit 0 |
| `npm run test:policy` | `Tests  109 passed \| 1 skipped (110)`, exit 0 |

One intermediate `format:check` run, before the added case's two long assertion lines were wrapped
to the formatter's own line length, reddened on `tests/src/styles/components/button-group.test.ts`
(`Format issues found in above 1 files`, exit 1). The two `toBeCloseTo` calls the added case and the
retitled caret case introduced were wrapped to the formatter's own reading (`readPixels(plain,
margin, pseudo)).toBeCloseTo(...)` and `readPixels(plain, 'margin-right', '::before')).toBeCloseTo(
...)` each split across three lines), synced, and the gates re-ran clean. The mutation matrix above
is the run against the final, formatted bytes.

## Shared-file patch

The exact patch is `/home/user/veneer-tg/tmp/units/tg-shared-3.patch` (1583 lines, SHA-256
`9f36fb84a292e0cab52ff7671a275ea5e7f8c5eecc9a87b35c30b382df9df583`). Retain it at
`/home/user/scaffold/.orkestrel/veneer/units/tg-shared-3.patch`. It is one unified diff against
`a658879`, written by `tg-instruments-3/patch.sh` with `git diff --no-index --full-index`, and it
supersedes `tmp/units/tg-shared-2.patch` whole (retained at
`/home/user/scaffold/.orkestrel/veneer/units/tg-shared-2.patch`).

```text
$ git apply --check --verbose tmp/units/tg-shared-3.patch
Checking patch app/browser/constants.ts...
Checking patch guides/veneer.md...
Checking patch tests/setup.ts...
Checking patch tests/setupStyles.test.ts...
Checking patch tests/setupStyles.ts...
$ echo exit=$?
exit=0

$ git apply --stat tmp/units/tg-shared-3.patch
 app/browser/constants.ts  |   61 +++-
 guides/veneer.md          |  776 +++++++++++++++++++++++----------------------
 tests/setup.ts            |   42 ++
 tests/setupStyles.test.ts |  192 +++++++++--
 tests/setupStyles.ts      |  158 +++++++++
 5 files changed, 807 insertions(+), 422 deletions(-)
```

Each file's content carries over round 2 except where § Findings closed names a change: the two
`app/browser/constants.ts` doc blocks, the guide's corners sentence and opening paragraph, and the
`BUTTON_GROUP_CARET_CASES` field rename with its TSDoc and the setup test's binding case in
`tests/setupStyles.ts` and `tests/setupStyles.test.ts`. `tests/setup.ts` carries no change this
round.

## Deviations and choices

No stop condition fired. One ancillary choice, scoped to line wrapping alone per the brief's
Deviation contract: the two `toBeCloseTo` assertions the added case and the retitled caret case
introduced were wrapped across three lines each to satisfy `oxfmt`'s own line-length reading, after
an initial `format:check` run reddened on the single-line form; no word or value in either
assertion changed.

## Not closed

- **The authoritative runs.** The journey at every variant, `CAPTURE=1`, and the tree-wide gates
  after landing are the Orchestrator's runs.
- **The retained copies.** The report names the retained patch path. The Orchestrator copies the
  patch, this report, and the instruments there; the unit writes nothing outside the worktree.

## Instruments and evidence

Everything is under `/home/user/veneer-tg/tmp/units/tg-instruments-3/`:

- `sync.sh`, `gates.sh`, and `mutate.py`, each headed with what changed from its round-2
  counterpart, and `patch.sh`, which writes the shared patch.
- `logs/`, holding every gate log, every mutation and control log, `mutate-run.log.txt`, and
  `list-styles.log.txt`.

The validation copy `tmp/probe/base` and the pristine extract `tmp/probe/orig` were deleted before
this report. To rebuild the copy, run these steps from `/home/user/veneer-tg`:

1. Run `mkdir -p tmp/probe/base tmp/probe/orig`.
2. Run `git archive a658879 | tar -x -C tmp/probe/base`, and the same into `tmp/probe/orig`.
3. Run `cp -al node_modules tmp/probe/base/node_modules`.
4. Run `git -C tmp/probe/base init -q`.
5. Run `git -C tmp/probe/base apply /home/user/scaffold/.orkestrel/veneer/units/tg-shared-2.patch`.
6. Run `tmp/units/tg-instruments-3/sync.sh`.
