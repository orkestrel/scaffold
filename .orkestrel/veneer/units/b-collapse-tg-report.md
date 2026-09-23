# Unit TOGGLES (`tg`) report

`opus` on Opus 5.5, native subagent, sole writer in `/home/user/veneer-tg` (branch `unit/tg` from
`a658879`). Brief: `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-tg-brief.md` (identical to the retained
`/home/user/scaffold/.orkestrel/veneer/units/b-collapse-tg-brief.md`, `diff` printed nothing).

## Outcome

Every name the `Disclosure` rows of `### Deferred selectors` carried now ships: the split toggle
from `src/styles/components/_button-group.scss`, and the dropdown toggle's corner counts from
`src/styles/components/_input-group.scss`. The shared-file patch deletes every `Disclosure` row and
adds the specimens, registry rows, ledger rows, case-table rows, and guide prose. No stop condition
fired. Every acceptance criterion reads green: criteria 1 to 4 in the worktree, and criteria 3, 5,
and 6 in the validation copy (`a658879` plus the owned files plus the shared patch). One timing case
failed under host load and passed on its own; see § Gates.

## Touched files (owned)

| File | Change |
| --- | --- |
| `src/styles/components/_button-group.scss` | Adds `.btn-group > .btn.dropdown-toggle-split:first-child` to the trailing-corner reset. Adds the split toggle's padding, which is three quarters of the button's inline step: `calc(var(--vn-space-6) * 0.75)` at rest, and a `$sizes` loop writing both sized forms per size. Adds the caret-margin resets under the plain, `.dropup`, `.dropend`, and `.dropstart` wrappers. Rewrites the Disclosure comment. |
| `src/styles/components/_input-group.scss` | Adds `.dropdown-toggle:nth-last-child(n + 3)` and `.dropdown-toggle:nth-last-child(n + 4)` to the corner-squaring lists. Rewrites the "stay deferred" comment. |
| `tests/src/styles/components/button-group.test.ts` | Adds the `button group split toggle` describe block (padding for each size form, density, caret margin per direction, leading-split corners). |
| `tests/src/styles/components/input-group.test.ts` | Adds the toggle-corner case under `input group corners`. |
| `tests/app/browser/sections/ButtonGroupSection.test.ts` | Adds the split specimens to the name list and the split selectors to the rendered-selector list. Scopes the exclusion case to the `Horizontal group` specimen. Adds the split-form case. |
| `tests/app/browser/sections/InputGroupSection.test.ts` | Adds the dropdown specimens to the name and group-count lists. Adds the squared-and-kept toggle case. |

Diffstat (`git diff --stat`):

```text
 src/styles/components/_button-group.scss           |  41 +++++-
 src/styles/components/_input-group.scss            |   7 +-
 .../browser/sections/ButtonGroupSection.test.ts    |  95 +++++++++++++-
 .../app/browser/sections/InputGroupSection.test.ts |  54 ++++++++
 tests/src/styles/components/button-group.test.ts   | 140 +++++++++++++++++++++
 tests/src/styles/components/input-group.test.ts    |  48 +++++++
 6 files changed, 375 insertions(+), 10 deletions(-)
```

`git status --porcelain` lists only those files, each as `M`.

The rewritten partial comments, verbatim:

- `_button-group.scss`, the list header: "Names each button size the split toggle follows, with the
  inline step that size's buttons pad by. A split toggle pads at three quarters of that step, the
  multiple the release writes, so each size reads the same Veneer space token its buttons read and
  follows the density factor. The release writes the small size before the large one, and the list
  keeps that order."
- `_button-group.scss`, the trailing reset: "The radius is reset on the physical side each child
  sits on, so a group keeps one rounded outline whatever the document's writing direction. A
  dropdown toggle is excluded because its hidden menu follows it, so it is often the visible end of
  the group while not its last child; a split toggle leading its group is squared, because the
  button it splits from follows it."
- `_button-group.scss`, the split block: "A split toggle carries the caret alone, so it pads at
  three quarters of its button's inline step and drops the caret's margin in every direction the
  release turns it. The dropdown partial writes each wrapper's caret under the wrapper class, which
  outweighs the plain split rule, so each wrapper takes a split rule of its own." The size loop: "A
  sized split follows a button carrying the size class or sits in a group carrying it, so each size
  writes both forms, as the release's own extend of the group twin does."
- `_input-group.scss`: "… so the squaring counts one child further from the end. A dropdown toggle
  is followed by its hidden menu, so it is squared only while at least one more child follows that
  menu, and it keeps its trailing corners where it is the row's visible end."

## Shared-file patch

Here is the exact patch, a unified diff against `a658879` over every shared file this unit
changes:
`/home/user/veneer-tg//home/user/scaffold/.orkestrel/veneer/units/tg-shared.patch`.

```text
$ git apply --stat /home/user/scaffold/.orkestrel/veneer/units/tg-shared.patch
 app/browser/constants.ts  |   58 +++-
 guides/veneer.md          |  731 +++++++++++++++++++++++----------------------
 tests/setup.ts            |   42 +++
 tests/setupStyles.test.ts |   56 ++-
 tests/setupStyles.ts      |   21 +
 5 files changed, 506 insertions(+), 402 deletions(-)
```

- `git -C /home/user/veneer-tg apply --check --verbose /home/user/scaffold/.orkestrel/veneer/units/tg-shared.patch` checked each of
  those files and exited 0.
- The patch was applied with `git apply` to fresh `a658879` copies of those files in a scratch
  directory. Each result was byte-identical (`cmp`) to the validated copy.
- No patch is needed for these shared files: `src/styles/index.scss`, `tests/setup.test.ts`,
  `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`,
  `tests/app/browser/index.test.ts`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`,
  `app/browser/Showcase.ts`, `app/browser/index.ts`, and `ROADMAP.md`. This unit adds no key, no
  region, no section, and no barrel line. The journey places resting rows from the `CASCADE_KEYS`
  constant, and it already imports both specimen tables.

**Applying the guide hunks.** Most of the `guides/veneer.md` line count comes from the formatter
re-padding the following tables:

- **`### Deferred selectors`**: the Owner column narrows because no `Disclosure` owner remains.
- **`#### btn`**: the Selector column widens to fit `.btn-group-sm > .btn + .dropdown-toggle-split`.

If a sibling landing conflicts on either table, delete the `Disclosure` rows, insert the ledger
rows listed later in this report, and then run `npx oxfmt --config .oxfmtrc.json guides/veneer.md`.
The `### Compatibility` table is not re-padded, because every edited cell fits the existing width.

### `app/browser/constants.ts` (the constants doc-block patch and the specimens)

```diff
@@ -843,7 +843,7 @@
 export const BUTTON_GROUP_COPY = Object.freeze({
 	region: 'Button group',
 	paragraph:
-		'Compare grouped direction, overlapped borders, joined corners, sizing, and a wrapping toolbar.',
+		'Compare grouped direction, overlapped borders, joined corners, sizing, a wrapping toolbar, and the split toggle at each size and in each direction its caret turns.',
 })
@@ -893,8 +893,17 @@
  * The horizontal group leads with a `.dropdown-toggle` child, which is the exclusion the
  * trailing-radius rule carries: that child keeps its trailing corners where the plain children after
- * it lose theirs. It announces `aria-expanded="false"` and opens nothing, because Disclosure owns
- * the split toggle and the behavior behind it.
+ * it lose theirs. It carries no menu, so the specimen shows the exclusion alone.
+ *
+ * The split specimens render the split toggle the partial ships, each closed toggle followed by its
+ * closed menu as the release's markup writes it. Every class is set in markup and announces
+ * `aria-expanded="false"`: no script opens a menu here, and the Dropdown `plugin` row in the guide's
+ * § Compatibility records the behavior J-ENGINE owns. A split toggle carries the caret alone, so it
+ * announces its name through its `aria-label` attribute. The plain split specimen renders the toggle
+ * under the plain, `.dropup`, and `.dropend` wrappers; the sized pair renders each size once on
+ * buttons carrying the size class and once in a group carrying it, derived from one size list; and
+ * the dropstart specimen leads its group with the toggle, which is the one position the partial
+ * squares a split toggle's trailing corners in.
  */
@@ -926,6 +935,30 @@  (after the 'Wrapping toolbar' entry of BUTTON_GROUP_SPECIMENS)
+		{
+			name: 'Split button',
+			body: `<div class="btn-toolbar gap-2" role="toolbar" aria-label="Split directions">${[
+				{ wrapper: 'btn-group', action: 'save', place: 'below' },
+				{ wrapper: 'btn-group dropup', action: 'upload', place: 'above' },
+				{ wrapper: 'btn-group dropend', action: 'share', place: 'after' },
+			]
+				.map(
+					({ wrapper, action, place }) =>
+						`<div class="${wrapper}" role="group" aria-label="Split ${action} opening ${place}"><button type="button" class="btn btn-outline-secondary">Split ${action}</button><button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" aria-expanded="false" aria-label="More ${action} options"></button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#${action}-choice">Choose ${action}</a></li></ul></div>`,
+				)
+				.join('')}</div>`,
+		},
+		...[
+			{ name: 'Split button small', size: 'sm', word: 'Compact' },
+			{ name: 'Split button large', size: 'lg', word: 'Roomy' },
+		].map(({ name, size, word }) => ({
+			name,
+			body: `<div class="btn-toolbar gap-2" role="toolbar" aria-label="${word} split actions"><div class="btn-group" role="group" aria-label="${word} split by button size"><button type="button" class="btn btn-outline-secondary btn-${size}">${word} archive</button><button type="button" class="btn btn-outline-secondary btn-${size} dropdown-toggle dropdown-toggle-split" aria-expanded="false" aria-label="More ${word.toLowerCase()} archive options"></button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#${word.toLowerCase()}-archive-choice">Choose ${word.toLowerCase()} archive</a></li></ul></div><div class="btn-group btn-group-${size}" role="group" aria-label="${word} split by group size"><button type="button" class="btn btn-outline-secondary">${word} export</button><button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" aria-expanded="false" aria-label="More ${word.toLowerCase()} export options"></button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#${word.toLowerCase()}-export-choice">Choose ${word.toLowerCase()} export</a></li></ul></div></div>`,
+		})),
+		{
+			name: 'Split dropstart',
+			body: '<div class="btn-group dropstart" role="group" aria-label="Split print opening before"><button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" aria-expanded="false" aria-label="More print options"></button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#print-choice">Choose print</a></li></ul><button type="button" class="btn btn-outline-secondary">Split print</button></div>',
+		},
@@ -1519,7 +1552,7 @@
-		'Compare a control joined to its addons and buttons: the shared borders, ...
+		'Compare a control joined to its addons, buttons, and dropdown toggles: the shared borders, the squared inner corners, each size, the feedback a failing group reports under its row, and the tooltip a passing or a failing group hangs over the row after it.',
@@ -1542,6 +1575,13 @@  (end of the INPUT_GROUP_SPECIMENS remarks)
+ *
+ * The dropdown pair renders a toggle on each side of a control, each toggle followed by its closed
+ * menu as the release's markup writes it: the leading toggle meets the control and is squared on
+ * the side they share, and the trailing toggle is the row's visible end and keeps its trailing
+ * corners. The validated twin ends with its feedback, which is the child the release's count steps
+ * over, and describes its control with that feedback. Every class is set in markup and each toggle
+ * announces `aria-expanded="false"`: no script opens a menu here.
@@ -1600,6 +1640,16 @@  (after the tooltip pair of INPUT_GROUP_SPECIMENS)
+	Object.freeze({
+		name: 'Input group dropdown',
+		markup:
+			'<div class="input-group"><button type="button" class="btn btn-outline-secondary dropdown-toggle" aria-expanded="false">Search in</button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#search-orders">Order numbers</a></li></ul><input class="form-control" type="text" aria-label="Order search"><button type="button" class="btn btn-outline-secondary dropdown-toggle" aria-expanded="false">Order status</button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#status-open">Open orders</a></li></ul></div>',
+	}),
+	Object.freeze({
+		name: 'Input group dropdown validated',
+		markup:
+			'<div class="input-group has-validation"><button type="button" class="btn btn-outline-secondary dropdown-toggle" aria-expanded="false">Weigh by</button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#weigh-scale">Scale reading</a></li></ul><input class="form-control is-invalid" type="text" id="parcel-weight" aria-label="Parcel weight" aria-describedby="parcel-weight-feedback"><button type="button" class="btn btn-outline-secondary dropdown-toggle" aria-expanded="false">Weight unit</button><ul class="dropdown-menu"><li><a class="dropdown-item" href="#unit-kilograms">Kilograms</a></li></ul><div class="invalid-feedback" id="parcel-weight-feedback">Enter the parcel weight.</div></div>',
+	}),
```

### `tests/setup.ts` (the `CaptureSubject` members and the resting rows, appended at the end)

The members follow `| 'Horizontal collapse hidden'`. The rows follow the
`horizontal-collapse-hidden` row, the last row of `CASCADE_KEYS`. `DRIVEN_KEYS` gains no row,
because no specimen here has a hover or focus reading that changes its paint.

```diff
 	| 'Horizontal collapse hidden'
+	| 'Split button'
+	| 'Split button small'
+	| 'Split button large'
+	| 'Split dropstart'
+	| 'Input group dropdown'
+	| 'Input group dropdown validated'
```

```ts
	Object.freeze({ scenario: 'split-button', subject: 'Split button', selector: '.dropdown-toggle-split', property: 'padding-left' }),
	Object.freeze({ scenario: 'split-button-small', subject: 'Split button small', selector: '.btn-sm + .dropdown-toggle-split', property: 'padding-left' }),
	Object.freeze({ scenario: 'split-button-large', subject: 'Split button large', selector: '.btn-lg + .dropdown-toggle-split', property: 'padding-left' }),
	Object.freeze({ scenario: 'split-dropstart', subject: 'Split dropstart', selector: '.btn-group > .btn.dropdown-toggle-split:first-child', property: 'border-top-right-radius' }),
	Object.freeze({ scenario: 'input-group-dropdown', subject: 'Input group dropdown', selector: '.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)', property: 'border-top-right-radius' }),
	Object.freeze({ scenario: 'input-group-dropdown-validated', subject: 'Input group dropdown validated', selector: '.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)', property: 'border-top-right-radius' }),
```

The patch file writes each row in the formatter's multi-line form.

### `tests/setupStyles.ts` and `tests/setupStyles.test.ts` (the case tables)

- **`BUTTON_GROUP_SELECTORS`**: adds `.btn-group > .btn.dropdown-toggle-split:first-child` after
  `.btn-group > .btn:not(:last-child):not(.dropdown-toggle)`. It adds
  `.btn-group-sm > .btn + .dropdown-toggle-split` and `.btn-group-lg > .btn + .dropdown-toggle-split`
  after `.btn-group > .btn-group:not(:first-child) > .btn`, in the inventory's order.
- **`INPUT_GROUP_CASES`**: adds both toggle selectors with empty `reads` maps, after the squaring
  selector each one joins. The remark drops the Disclosure sentence and the link to the deleted
  constant.
- **`INPUT_GROUP_DEFERRED`**: deleted. Its population is empty, and a list of the names the toggle
  still owes no longer exists as a capability. Its import, its entry in the export-list case, its
  freeze assertion, and its uses are removed.
- **`input group case tables`, the partition case**: retitled `partitions the recorded input-group
  selectors into the partial and the validation stacking`. It asserts that no deferral row names a
  selector the key records.
- **`input group case tables`, the as-often case**: counts every recorded rule as written.
- **`dropdown case tables`, the partition case**: derives the split population from the inventory,
  as every recorded name carrying `.dropdown-toggle-split`. It asserts that none of those names is in
  `DROPDOWN_SELECTORS` or deferred, and excludes them from the shared and leftover sets. The
  `startsWith` guard is unchanged.

The exact hunks are in the patch file, under the `tests/setupStyles.ts` and
`tests/setupStyles.test.ts` headers.

### `guides/veneer.md`

These are the sentence rewrites, each an exact before and after:

- **`### Input group classes`, the opening sentence.**
  - Before: "The input group key ships every selector the release records for it except the
    `.dropdown-toggle` corner rules: … the squared inner corners, the overlap margin, …"
  - After: "The input group key ships every selector the release records for it: the group row, the
    text control, select, and floating wrapper that take its free space, the focus and button lifts,
    the text addon, the large and small sizes, the squared inner corners with the dropdown toggle's
    own count, the overlap margin, and the width a group takes inside a toolbar."
- **`### Input group classes`, the withheld paragraph.**
  - Before: "The `.dropdown-toggle` corner rules stay withheld, because the dropdown toggle Disclosure
    owns is the element they shape; § Deferred selectors carries their rows. The `.form-control`, …"
  - After: "A dropdown toggle is left out of the rule that squares every child but the last, because
    its menu follows it as a hidden sibling, so the toggle is the row's visible end while it is not
    the last child. The toggle is squared on a count of its own instead: while at least two children
    follow it, and while at least three follow it in a group carrying the `has-validation` class,
    whose feedback is the extra child. Every class is set in markup, and the Dropdown `plugin` row in
    § Compatibility records the behavior J-ENGINE owns. The `.form-control`, `.form-select`, and
    `.form-floating` rules ship, so a grouped control carries its own `--bs-border-width` border and
    focus ring under the group's rules."
- **`### Input group classes`, the proof sentence.** It gains "the leading dropdown toggle squared
  and the trailing one kept with and without that class," after "the count a group reporting
  validation moves,".
- **`### Dropdown classes`, the opening paragraph.**
  - Before: "… and the split-toggle and navigation menu names are withheld under § Deferred
    selectors."
  - After: "The input-group and button-group relationships the key records, the split toggle
    included, ship from the partials that write them, which § Input group classes and § Button group
    classes describe, and the navigation menu names are withheld under § Deferred selectors."
- **`### Button group classes`, the corners paragraph.**
  - Before: "… which is what leaves room for the split toggle Disclosure ships."
  - After: "A child carrying the `.dropdown-toggle` class keeps its trailing corners, because its
    hidden menu follows it and the toggle is the group's visible end. A split toggle that leads its
    group is the exception: the button it splits from follows it, so its trailing corners are
    squared."
- **`### Button group classes`, a paragraph added after the corners paragraph.** "The split toggle
  carries the caret alone. It pads each inline side at three quarters of its button's inline step,
  which is the multiple the release writes: `calc(var(--vn-space-6) * 0.75)` at rest,
  `calc(var(--vn-space-4) * 0.75)` after a small button or inside a small group, and
  `calc(var(--vn-space-8) * 0.75)` after a large button or inside a large group. Each value resolves
  to the release's own at the resting density and follows the `--vn-factor-density` factor. The
  toggle drops the caret's margin under the plain, `.dropup`, `.dropend`, and `.dropstart` wrappers,
  because it carries no text for the caret to stand apart from. Every class is set in markup, and the
  Dropdown `plugin` row in § Compatibility records the behavior J-ENGINE owns."
- **`### Button group classes`, the proof sentence.** It gains "each split toggle's padding at every
  size form and its density scaling, the caret margin the split toggle drops in each direction, the
  trailing corners a leading split toggle loses," before "each lift driven or written".
- **`### Button group classes`, the departure bullets.** The bullet "**The split-toggle selectors
  are absent.** …" is deleted. In its place: "**The split toggle's padding reads the scale tokens.**
  Each padding the release writes as a literal reads three quarters of the `--vn-space-6`,
  `--vn-space-4`, or `--vn-space-8` token, so the toggle rescales with the density factor. The ledger
  lists each row under the key the comparison attributes it to: the plain split and the split after
  a sized button under the `dropdown` key, and the split inside a sized group under the `btn` key."
  The shown-group shadow bullet stays.
- **The `### Deferred selectors` rows deleted.** Every row whose Owner cell is `Disclosure`:
  - `.btn-group > .btn.dropdown-toggle-split:first-child`
  - `.btn-sm + .dropdown-toggle-split`
  - `.btn-group-sm > .btn + .dropdown-toggle-split`
  - `.btn-lg + .dropdown-toggle-split`
  - `.btn-group-lg > .btn + .dropdown-toggle-split`
  - `.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)`
  - `.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)`
  - `.dropdown-toggle-split`
  - `.dropdown-toggle-split::after`
  - `.dropup .dropdown-toggle-split::after`
  - `.dropend .dropdown-toggle-split::after`
  - `.dropstart .dropdown-toggle-split::before`

  In the patched guide, `grep -c "Disclosure" guides/veneer.md` prints `0`.
- **The `§ Compatibility` `selector` rows.**
  - input-group: "…, less the dropdown-toggle names recorded under § Styles;" becomes "…, the
    squared inner corners, the dropdown toggle's corners, the overlap margin, the button lift, and
    the toolbar width included;".
  - btn-group: "…, less the split-toggle names recorded under § Styles;" becomes "…, the split
    toggle included;".
  - dropdown: "less the split-toggle and navigation names" becomes "less the navigation names".
  - btn: unchanged. Its "deferred selectors" clause stays true, because the `Overlays` rows
    (`.alert-dismissible .btn-close` and its siblings) are recorded under `btn`.

## Ledger rows written

The comparison's own output assigned each row to its key and its category. Measured in the
validation copy by `/home/user/scaffold/.orkestrel/veneer/units/tg-instruments/ledger.test.ts` before the rows existed, the
comparison reported these rows under `departures.unrecorded`, every one `tokenized`. After the rows
were written, the same probe read empty `unrecorded` and `stale` lists for both departures and
additions (`logs/ledger-drift.log.txt`). The `test:conformance` ledger cases then passed.

`#### btn`: the `.btn-group-lg` pair follows the `.btn-group-lg > .btn` `--bs-btn-border-radius`
row, and the `.btn-group-sm` pair follows the `.btn-group-sm > .btn` `--bs-btn-border-radius` row.

```text
| `btn` | `.btn-group-lg > .btn + .dropdown-toggle-split` | `padding-right` | — | `0.75rem` | `calc(var(--vn-space-8) * 0.75)` | tokenized |
| `btn` | `.btn-group-lg > .btn + .dropdown-toggle-split` | `padding-left` | — | `0.75rem` | `calc(var(--vn-space-8) * 0.75)` | tokenized |
| `btn` | `.btn-group-sm > .btn + .dropdown-toggle-split` | `padding-right` | — | `0.375rem` | `calc(var(--vn-space-4) * 0.75)` | tokenized |
| `btn` | `.btn-group-sm > .btn + .dropdown-toggle-split` | `padding-left` | — | `0.375rem` | `calc(var(--vn-space-4) * 0.75)` | tokenized |
```

`#### dropdown`: these rows follow the `.dropstart .dropdown-toggle::before` `vertical-align` row.

```text
| `dropdown` | `.dropdown-toggle-split` | `padding-right` | — | `0.5625rem` | `calc(var(--vn-space-6) * 0.75)` | tokenized |
| `dropdown` | `.dropdown-toggle-split` | `padding-left` | — | `0.5625rem` | `calc(var(--vn-space-6) * 0.75)` | tokenized |
| `dropdown` | `.btn-sm + .dropdown-toggle-split` | `padding-right` | — | `0.375rem` | `calc(var(--vn-space-4) * 0.75)` | tokenized |
| `dropdown` | `.btn-sm + .dropdown-toggle-split` | `padding-left` | — | `0.375rem` | `calc(var(--vn-space-4) * 0.75)` | tokenized |
| `dropdown` | `.btn-lg + .dropdown-toggle-split` | `padding-right` | — | `0.75rem` | `calc(var(--vn-space-8) * 0.75)` | tokenized |
| `dropdown` | `.btn-lg + .dropdown-toggle-split` | `padding-left` | — | `0.75rem` | `calc(var(--vn-space-8) * 0.75)` | tokenized |
```

`### Additions`: no row. The comparison reported no unrecorded addition.

## Failing first

Styles proofs, in the worktree against the cascade built at `a658879`, before the partial edits:

```text
npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/button-group.test.ts tests/src/styles/components/input-group.test.ts
before: exit 1, Tests  8 failed | 53 passed (61)   (logs/wt-red-styles.log.txt)
after:  exit 0, Tests  61 passed (61)             (logs/wt-styles.log.txt)
```

These cases ran red. The caret cases were first titled with the wrapper suffix alone and were then
retitled to name the whole group class. Each case also ran red under its own mutation with its
final title (§ Proof matrix).

- `button group split toggle > pads each split toggle at three quarters of the inline padding its button size reads`
- `button group split toggle > rescales the split toggle padding with the density factor`
- `button group split toggle > drops the caret $side on the $pseudo of a split toggle in a $group wrapper`, one run per row: `btn-group`, `btn-group dropup`, `btn-group dropend`, and `btn-group dropstart`
- `button group split toggle > squares the trailing corners of a split toggle that opens its group, where a split toggle further in keeps them`
- `input group corners > squares the trailing corners of a dropdown toggle that is not the visible end, with and without validation`

Section proofs, in the worktree with the shared constants unpatched, compared with the validation
copy:

```text
npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts
worktree (constants at a658879): exit 1, Tests  5 failed | 4 passed (9)   (logs/wt-sections.log.txt)
validation copy (patch applied):  exit 0, Tests  9 passed (9)            (logs/gate-sections.log.txt)
```

The red section cases are the extended name-list cases, the extended selector-list case, and the
added split-form and toggle cases. Each one reads a specimen that only the shared constants patch
supplies.

## Proof matrix

Every name below is recorded with no condition; the Condition cell of each is `—`. The mutations
ran in the validation copy through `/home/user/scaffold/.orkestrel/veneer/units/tg-instruments/mutate.py`. Each one rebuilt the
styles where it edited a partial, and ran only the named case, filtered with `-t`. Every mutation
build exited 0. Each log is `logs/mutation-<name>.log.txt`. Each run read `1 failed` with every
other case skipped, and the assertion line in its log is the named reading.

| Recorded selector | Proof case | Distinguishing mutation → reading | Specimen | Capture scenario |
| --- | --- | --- | --- | --- |
| `.btn-group > .btn.dropdown-toggle-split:first-child` | styles: `squares the trailing corners of a split toggle that opens its group, …`; section: `renders each split toggle form …` | `first-child-selector-dropped` → `expected [ 6, 6, 6, 6 ] to deeply equal [ 6, +0, +0, 6 ]`; section: `dropstart-toggle-after-action` and `dropstart-action-removed` redden the split-form case | `Split dropstart` | `split-dropstart` (`border-top-right-radius`) |
| `.dropdown-toggle-split` (padding) | styles: `pads each split toggle …`; `rescales the split toggle padding with the density factor` | `base-padding-omitted` → `Base options leading: expected 12 to be close to 9`; `padding-literal` (the `0.5625rem` literal) → `expected 9 to be close to 18` | `Split button` | `split-button` (`padding-left`) |
| `.btn-sm + .dropdown-toggle-split` | styles: `pads each split toggle …` | `small-button-form-omitted` → `Small options leading: expected 9 to be close to 6` | `Split button small` | `split-button-small` (`padding-left`) |
| `.btn-group-sm > .btn + .dropdown-toggle-split` | styles: `pads each split toggle …`; section: `renders each split toggle form …` | `small-group-form-omitted` → `Small group options leading: expected 9 to be close to 6`; section: `group-size-on-buttons` reddens the split-form case | `Split button small` | `split-button-small` (the frame shows both forms) |
| `.btn-lg + .dropdown-toggle-split` | styles: `pads each split toggle …` | `large-button-form-omitted` → `Large options leading: expected 9 to be close to 12`; `large-step-reads-base` → the same reading | `Split button large` | `split-button-large` (`padding-left`) |
| `.btn-group-lg > .btn + .dropdown-toggle-split` | styles: `pads each split toggle …` | `large-group-form-omitted` → `Large group options leading: expected 9 to be close to 12` | `Split button large` | `split-button-large` (the frame shows both forms) |
| `.dropdown-toggle-split::after` | styles: `drops the caret … in a 'btn-group' wrapper` | `plain-caret-rule-omitted` → `expected 3.57 to be +0` | `Split button` (plain group) | `split-button` |
| `.dropup .dropdown-toggle-split::after` | styles: `… in a 'btn-group dropup' wrapper` | `dropup-caret-rule-omitted` → `expected 3.57 to be +0` | `Split button` (`.dropup` group) | `split-button` |
| `.dropend .dropdown-toggle-split::after` | styles: `… in a 'btn-group dropend' wrapper` | `dropend-caret-rule-omitted` → `expected 3.57 to be +0` | `Split button` (`.dropend` group) | `split-button` |
| `.dropstart .dropdown-toggle-split::before` | styles: `… in a 'btn-group dropstart' wrapper` | `dropstart-caret-rule-omitted` → `expected 3.57 to be +0` | `Split dropstart` | `split-dropstart` |
| `.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)` | styles: `squares the trailing corners of a dropdown toggle that is not the visible end, …`; section: `renders a squared and a kept dropdown toggle …` | `plain-toggle-count-left-out` → `expected [ [ [ 6, 6, 6, 6 ], …` against `[ [ [ 6, +0, +0, 6 ], …`; section: `trailing-toggle-kept-count-broken` → `expected [ true, true ] to deeply equal [ true, false ]` | `Input group dropdown` | `input-group-dropdown` (`border-top-right-radius`) |
| `.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)` | the same styles case, second group; section: the same case | `validated-toggle-count-left-out` → the second group's leading toggle keeps its trailing corners | `Input group dropdown validated` | `input-group-dropdown-validated` (`border-top-right-radius`) |

Controls: the unmutated styles proof reads `Tests  61 passed (61)` and the unmutated section proofs
read `Tests  9 passed (9)`. The excluded-toggle case `leaves a dropdown toggle of a %s its trailing
corners where a plain child loses them` passed both before and after the change.

## Gates

Worktree (owned files only), taken after the last edit:

| Command | Result |
| --- | --- |
| `npm run format:check` | `All matched files use the correct format.`, exit 0 |
| `npm run lint:check` | no findings, exit 0 |
| `npm run check` | exit 0 |
| `npm run build:src` | exit 0 |
| `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/button-group.test.ts tests/src/styles/components/input-group.test.ts` | `Tests  61 passed (61)`, exit 0 |
| `npm run test:conformance` (observation) | `Tests  5 failed \| 17 passed (22)`, exit 1: the deferral, presence, and ledger cases wait on the guide patch, as expected (`logs/wt-conformance-owned-only.log.txt`) |

Baseline at `a658879`, taken before any edit: `npm run test:conformance` read
`Tests  22 passed (22)`, exit 0. The scoped styles run over the button-group, input-group, and
dropdown proofs read `Tests  99 passed (99)`, exit 0. The section proofs read `Tests  7 passed (7)`,
exit 0.

The validation copy was `a658879` extracted with `git archive` into `tmp/probe/base`, with
`node_modules` hard-linked, the owned files synced by `sync.sh`, and the shared edits written in
place. `git init` was run there with no commit, so that `oxfmt` and `oxlint` stop at the copy's own
root instead of reading the worktree's `tmp` ignore entry. The gates ran through `gates.sh`, one log
each at `logs/gate-<name>.log.txt`:

| Command | Result |
| --- | --- |
| `npm run format:check` | exit 0 |
| `npm run lint:check` | exit 0 |
| `npm run check` | exit 0 |
| `npm run build:src` | exit 0 |
| `npm run test:setup` | first run in the chain: `Tests  1 failed \| 252 passed (253)`. The failing case was `tests/setupServer.test.ts > server setup > records and reads official control state and rejects contradicted or absent obligation steps`, with `Test timed out in 10100ms` while sibling units' Chromium processes ran. The case alone read `1 passed \| 96 skipped (97)`. The whole project re-run read `Tests  253 passed (253)`, exit 0 (`logs/gate-setup-rerun.log.txt`). |
| styles scoped (as in the worktree) | `Tests  61 passed (61)`, exit 0 |
| `npx vitest run --config configs/app/vite.browser.config.ts --no-cache --reporter=dot tests/app/browser/sections/ButtonGroupSection.test.ts tests/app/browser/sections/InputGroupSection.test.ts` | `Tests  9 passed (9)`, exit 0 |
| `npm run test:conformance` | `Tests  22 passed (22)`, exit 0 |
| `npm run test:guides` | `Tests  19 passed (19)`, exit 0 |
| `npm run test:policy` | `Tests  109 passed \| 1 skipped (110)`, exit 0 |
| `npm run test:app` | `Tests  78 passed (78)`, exit 0 |

Criterion 3, the built cascade: `/home/user/scaffold/.orkestrel/veneer/units/tg-instruments/rows.test.ts` read every recorded
declaration under every key that records each former Disclosure name. The output is
`logs/built-rows.log.txt`, and no declaration read `ABSENT`. Every `0` value is emitted as recorded.
Every padding reads its `calc(var(--vn-space-*) * .75)` value, and each such value is a `tokenized`
ledger row.

Journey observations, taken in the validation copy without `CAPTURE`, through `journey.sh`:
`journey:light-390` read `Tests  40 passed (40)` and `journey:dark-1280` read `Tests  40 passed (40)`.
The authoritative journey and the `CAPTURE=1` run are yours.

## Unknowns answered

- **Does the excluded-toggle geometry case move?** No. It passed at the baseline and after the
  change. The first-child rule selects `.dropdown-toggle-split`, and that case's toggle carries
  `.dropdown-toggle` alone.
- **Does `.btn-group.show .dropdown-toggle` ship?** No. The pinned inventory records no such selector
  under any key: a search of every key for `btn-group.show` matched nothing. The release's shadow
  mixin emits nothing while shadows are off. The partial ships nothing for it, and the guide's
  existing "shown-group shadow is absent" bullet stays.

## Deviations and ancillary choices

No stop condition fired. These were settled inside the unit and recorded here:

- **Brief wording on the leading split.** The brief names "the first-child split keeping its
  trailing corners". The inventory records `border-top-right-radius: 0` and
  `border-bottom-right-radius: 0` on `.btn-group > .btn.dropdown-toggle-split:first-child`, so the
  rule squares those corners. The case asserts them squared, and the brief's named mutation (the
  selector dropped) makes them kept and reddens the case. Ruling 1 makes the inventory the
  authority, so this was read as wording, not as a disagreement.
- **Inline case rows in the owned styles proofs.** The caret case's `it.each` rows and the padding
  case's markup map sit inline in the test file rather than in `tests/setupStyles.ts`. Criteria 1
  and 2 run in the worktree, where the shared module is unpatched, and a new setup export imported
  there fails `npm run check`. `.claude/rules/tests.md` places case matrices in a setup file, so this
  tension is left to your ruling. Moving the rows is a follow-on patch to `tests/setupStyles.ts` plus
  an import change in the owned proof.
- **Empty split toggles.** Each specimen's split toggle is empty and named by its `aria-label`
  attribute, as the Dropdown specimens' caret-only toggles are, because Veneer ships no
  `.visually-hidden` class. On an empty toggle, `.dropdown-toggle:empty::after` already zeroes the
  caret margin. So the split caret-margin rules match the specimens but do not change their frames.
  The styles proof reads those rules on toggles that carry text.
- **Specimen layout.** The split specimens use a `btn-toolbar gap-2` wrapper, so adjacent split
  groups do not merge into one strip. The specimens are appended after each region's existing
  specimens, and the rows after each registry's last row.
- **Ledger placement.** No `#### btn-group` table is created. The rows sit in `#### btn` and
  `#### dropdown`, where the comparison attributes them.
- **Compatibility cells.** Each edited cell is kept within the table's existing column width, so
  the formatter does not re-pad the compatibility table.
- **`ROADMAP.md`.** No patch. The family row records each landing by commit id, which exists only at
  landing.

## Not closed

- **The inline case rows.** They wait on your ruling; see § Deviations and ancillary choices.
- **The caret-margin frames.** The frames cannot show the split caret-margin rules, because the
  specimens' toggles are empty. A visible reading needs a shipped visually hidden label class. No
  unit in this family owns one.
- **The authoritative runs.** The journey at every variant, `CAPTURE=1`, and the tree-wide gates
  after landing are the Orchestrator's runs.

## Instruments and evidence

Everything is under `/home/user/scaffold/.orkestrel/veneer/units/tg-instruments/`:

- `sync.sh`, `gates.sh`, `mutate.py`, `journey.sh`, and the probes `rows.test.ts` and
  `ledger.test.ts`.
- `logs/`, holding every gate, mutation, journey, and worktree log named in this report.

The validation copy `tmp/probe/base`, the pristine extract `tmp/probe/orig`, and every runtime probe
under `tmp/probe/` were deleted before this report. To rebuild the copy:

1. Run `git archive a658879 | tar -x -C tmp/probe/base`.
2. Run `cp -al node_modules tmp/probe/base/node_modules`.
3. Run `git -C tmp/probe/base init -q`.
4. Run `sync.sh`.
5. Run `git -C tmp/probe/base apply ../../units/tg-shared.patch`.
