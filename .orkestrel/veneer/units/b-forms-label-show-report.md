# B-FORMS-LABEL-SHOW (`bfw`) report

**Deviation state: STOPPED.** The `CASCADE_KEYS` row that criterion 4 fixes for the legend
(`legend.col-form-label`) reddens the shared `tests/setup.test.ts` registry law, which admits only a
selector that starts with `.`. The brief's deviation contract names that as a stop. The row stays
in the tree exactly as criterion 4 states it. Every other owned change is complete. Two criteria
also cannot go green in this worktree for reasons outside the unit, and the brief did not name
either reason: criterion 6 needs a built `dist/`, and criterion 7 needs `bfl`'s partial. See
§ Criteria, items 6 and 7.

## Stop report

- **Expected:** `tests/setup.test.ts` stays green with the five `form-label-*` rows appended.
- **Found:** the case "describes each photographed cascade key by its specimen, its element, and its
  property" refuses `{ scenario: 'form-label-legend', selector: 'legend.col-form-label' }` because of
  its `!key.selector.startsWith('.')` clause (around line 152).
- **Evidence:** `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`
  gives `Tests  1 failed | 20 passed (21)`, and the only row in the failure diff is the legend row.
- **Done:** every owned change; the legend row is present as the ruling writes it.
- **Not done:** criterion 4's green state against the shared law, and therefore criterion 6.
- **Hypothesis:** the law means "a class-led selector", and an element-qualified class selector is
  inside that intent.

Resolution options for the Orchestrator:

1. **Shared patch (recommended).** It keeps ruling E's selector. Proved on a probe copy of the file
   (`tmp/probe/setuplaw.test.ts`, deleted after the run): `Tests  21 passed (21)` through
   `--project probe`; `oxfmt --check` clean. The regex still refuses a bare element selector such as
   `legend`.

   ```diff
   --- a/tests/setup.test.ts
   +++ b/tests/setup.test.ts
   @@ describes each photographed cascade key by its specimen, its element, and its property
    			CASCADE_KEYS.filter(
    				(key) =>
   -					key.subject.length === 0 || !key.selector.startsWith('.') || key.property.length === 0,
   +					key.subject.length === 0 || !/^[a-z]*\./u.test(key.selector) || key.property.length === 0,
    			),
   ```

2. **Owned-only alternative.** Change the legend row's selector to `.row > .col-form-label`. It is
   class-led, unique in `CASCADE_KEYS`, and resolves to the legend inside the `Form label legend`
   specimen. It departs from ruling E and criterion 4, so it needs the Orchestrator's ruling.

## Diff summary

The following files carry the change (diffstat of tracked files: `7 files changed, 127 insertions(+), 15 deletions(-)`; new files: `FormLabelSection.ts` 20 lines, `FormLabelSection.test.ts` 157 lines).

- `app/browser/sections/FormLabelSection.ts` (new): `extends SpecimenSection`, fed by `FORM_LABEL_COPY` and `FORM_LABEL_SPECIMENS`, doc block in the siblings' voice.
- `app/browser/constants.ts`: appends `FORM_LABEL_COPY` (region `Form label`, the brief's paragraph verbatim) and `FORM_LABEL_SPECIMENS` with its doc block; the large and small rows derive from one size list through `.map`.
- `app/browser/Showcase.ts`: imports and constructs in alphabetical order: `FormControlSection`, `FormFloatingSection`, `FormLabelSection`, then `FormRangeSection` (D35).
- `app/browser/index.ts`: re-exports `./sections/FormLabelSection.js`.
- `tests/app/browser/sections/FormLabelSection.test.ts` (new): the section proof and the teardown case.
- `tests/app/browser/Showcase.test.ts`: regions literal and specimen concatenation take `Form control`, `Form floating`, `Form label` in that order.
- `tests/app/browser/index.test.ts`: adds `FORM_LABEL_COPY`, `FORM_LABEL_SPECIMENS`, `FormLabelSection`.
- `tests/app/browser/integration.test.ts`: the declared-specimen list carries `FORM_LABEL_SPECIMENS`; the range and floating traversals start past the date controls the reorder and the legend specimen put in their path (see § Journey traversal).
- `tests/setup.ts`: `CaptureSubject` gains the five names in alphabetical order after `Form control textarea`; `CASCADE_KEYS` gains the five resting rows at its end, with the selectors and properties criterion 4 names. No driven scenario.

### Specimens as written

- `Form label stacked`: `.form-label` "Dispatch email" `for="form-label-email"`; `input.form-control[type=email]#form-label-email` with `value="notices@example.com"` and `aria-describedby="form-label-email-help"`; `.form-text#form-label-email-help` "Northworks sends every shipping notice to this address."
- `Form label horizontal`: `.container-fluid > .row > label.col-5.col-form-label[for=form-label-depot]` "Depot" + `.col-7 > input.form-control#form-label-depot`.
- `Form label horizontal large` and `small`: the same row with `col-form-label-lg` or `col-form-label-sm` on the label, `form-control-lg` or `form-control-sm` on the control, ids `form-label-depot-lg` and `form-label-depot-sm`, labels "Large depot" and "Small depot".
- `Form label legend`: `.container-fluid > fieldset.row > legend.col-5.col-form-label` "Pickup" + `.col-7 > input.form-control[type=date][aria-label="Pickup date"][value="2026-09-23"]`.

Ancillary choices recorded: the horizontal and legend rows sit in a `.container-fluid`, the Layout specimens' pattern. Without it, the row's negative gutter runs 12px past each edge of the 390-wide page. Measured: the row spans `0..390` inside the container. The date control carries a fixed value, as `Form control date` does.

## Column-split reading

Measured in Chromium at the 390-wide viewport, with the showcase mounted and ruling D's declarations injected as a probe stylesheet, because this worktree has no partial. Each reading gives the label box, its font size, the number of distinct line tops of its text, and the control box.

- `col-4`/`col-8`: "Large depot" wraps to 2 lines (text 114.1px in a 130px column with 12px padding each side). "Large sender", "Large origin", "Large courier", and "Large recipient" also wrap.
- **`col-5`/`col-7` (chosen):** every label reads on one line. The final specimens measured:
  - stacked: label 104.6x21.0, 14px, 1 line; control 390.0x38.0
  - horizontal: label 162.5x38.0, 14px, 1 line; control 203.5x38.0, same top
  - large: label 162.5x48.0, 20px, 1 line; control 203.5x48.0, same top
  - small: label 162.5x31.0, 14px, 1 line; control 203.5x31.0, same top
  - legend: label 162.5x38.0, 14px, 1 line; control 203.5x38.0, same top
- Slack on the tightest label: "Large depot" text 120.4px inside a 138.5px content box.
- At 1280 wide, `col-5` gives the label 533.3px and every label reads on one line.

## Criteria

1. Format, lint, and type gates: `npx oxfmt --config .oxfmtrc.json --check <owned files>` → "All matched files use the correct format." exit 0; `npm run format:check` exit 0; `npm run lint:check` exit 0; `npm run check` exit 0 (re-run after the last edit).
2. The section, copy, and specimens: met as § Specimens as written states. The section proof asserts the order, the markup, no `[style]`, the breakpoint-free column classes, the size classes, and the `form-label-` ids.
3. Registration: `Showcase.ts` order is `FormControlSection`, `FormFloatingSection`, `FormLabelSection`, then `FormRangeSection`. `index.ts` re-exports the module. `Showcase.test.ts`, `index.test.ts`, and `integration.test.ts` carry the region, the export, and the table.
4. `CaptureSubject` and the `CASCADE_KEYS` rows are written as specified. **Red against the shared law** (§ Stop report).
5. Section proof: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/FormLabelSection.test.ts` → `Tests  2 passed (2)`.
6. `npm run test:app` → `Test Files  28 passed (28)`, `Tests  65 passed (65)`, exit 0. `npm run test:setup` → exit 1, `Tests  8 failed | 215 passed (223)`: the registry law (§ Stop report) plus failures that read `dist/src/styles/index.css` or `dist/src/core/index.js` (`ENOENT`), in `setupServer.test.ts`, `setupStyles.test.ts`, and `setupService.test.ts`. This worktree has no `dist/`, and the permission floor bars a concurrent executor from `build`.
7. `npm run test:journey` → exit 1, `Tests  4 failed | 148 passed (152)`. The only failure, in every variant, is "matrix > reads the mounted class and style populations with their published controls". Its `census.undeclared` lists `col-form-label`, `col-form-label-lg`, `col-form-label-sm`, `form-label`, and `form-text`, which are the classes `bfl`'s partial declares. In a probe that injected ruling D's rules, `readCensus(host).undeclared` went from those five classes to `[]`.

## Failing-first evidence

- Section proof before registration: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/sections/FormLabelSection.test.ts` → `Test Files  1 failed (1)`, "does not provide an export named 'FormLabelSection'". After registration: `Tests  2 passed (2)`.
- Barrel and region order before the source edit: the same command over `tests/app/browser/index.test.ts tests/app/browser/Showcase.test.ts` → `Tests  2 failed | 3 passed (5)`. The failures were "exports the showcase surface, the specimen table, and the sections family" and "mounts its sections after the region and destroys them before removing the nodes". After the edit, both pass (`npm run test:app` 65 passed).
- Mutations, each run with `tmp/probe/mutate.py` against the section proof and reverted byte for byte. Each run: `Tests  1 failed | 1 passed (2)`. Each mutation failed on the named assertion:
  - `for` dropped from the horizontal label: `expected [ 'Dispatch email', '', …] to deeply equal [ 'Dispatch email', 'Depot', …]` (an empty name).
  - Stacked control id mismatched (`form-label-mail`): `expected [ '', 'Depot', …]` (an empty name).
  - `aria-describedby` naming a missing id: `expected null to be <div class="form-text" …>`. `readStates` alone would still report `described`, because it reads only that the attribute is present.
  - Stacked and horizontal specimens swapped: `expected [ 'Form label horizontal', …] to deeply equal [ 'Form label stacked', …]`.
- Journey before the traversal fix: `npm run test:journey` → `Failed Tests 20`. The failures were the range traversal ("Interactive target "Range value" is not reachable…", the walk ending on the legend date control), the floating traversal (the walk ending on `Form control date`, which D35 moved ahead of it), the matrix census, and the portfolio cases missing `range-focus` and `form-floating-empty-focus`. After the fix: `Tests  4 failed | 148 passed (152)`, with the matrix census as the only failure.

## Journey traversal

The installed `driveTraversal` walk stops at the first element it reaches twice, and a date control keeps focus while Tab steps through its fields.

- **Floating case.** D35 puts `Form control date` before the floating field, so the case starts from the `Form control readonly` specimen's control. That control is the last one before the region.
- **Range case.** The legend date control sits right before the range. The case focuses that control, presses Tab twice (day, then year), asserts that focus is still on the control, then traverses.
- **Refused alternatives, measured in a probe:**
  - `focus()` then `blur()` on the date control: the walk still ends on the date.
  - Clicking the Form range paragraph to set the navigation start point reaches the range, but it leaves the pointer resting on the page.

## Capture observation (not a criterion)

`CAPTURE=1 npx vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --project journey:light-390`: exit 1 on the matrix census alone (`Tests  1 failed | 37 passed (38)`). The run wrote the following frames:

- `tmp/capture/states/form-label-stacked--light-390.png`
- `tmp/capture/states/form-label-horizontal--light-390.png`
- `tmp/capture/states/form-label-horizontal-large--light-390.png`
- `tmp/capture/states/form-label-horizontal-small--light-390.png`
- `tmp/capture/states/form-label-legend--light-390.png`

The run also wrote each subject's accessibility artifacts, for the variants the matrix names, beside those frames. The frames render the labels unstyled because the partial is absent. For example, the legend shows at the elements layer's legend size, and the help text wraps.

## Text for `bfl`'s guide integration

§ Showcase sentence. It follows the rendered order, which D35 makes alphabetical, so `Form control` precedes `Form floating`. The brief's list put `Form floating` first.

> A Validation region follows the Table region; a Form check, a Form control, a Form floating, a
> Form label, a Form range, and a Form select region follow the Spinner region; and an Input group
> region follows the Close region, each carrying that key's own specimens. The Form label region
> carries a label above its control with the help text the control names as its description, and a
> horizontal label level with the control beside it at each size and as the legend of a group.

§ Tests stem rows, in the stem table's shape:

```markdown
| `form-label-stacked`          | the `Form label stacked` specimen's own label          |
| `form-label-horizontal`       | the `Form label horizontal` specimen's own label       |
| `form-label-horizontal-large` | the `Form label horizontal large` specimen's own label |
| `form-label-horizontal-small` | the `Form label horizontal small` specimen's own label |
| `form-label-legend`           | the `Form label legend` specimen's own legend          |
```

The § Tests proof-link list can take `[form label specimens](../tests/app/browser/sections/FormLabelSection.test.ts)` if `bfl` links section proofs there. The existing list links only some sections.

## Claims flagged as weakest

- The range case's two Tab presses assume Chromium's en-US date control with month, day, and year fields. A locale with other fields reddens the case at its `activeElement` assertion or at the traversal.
- The column split was measured against ruling D's declarations injected by a probe, not against `bfl`'s partial. The tightest slack is 18px at 390 wide.
- The attribution of the journey matrix red to the absent partial rests on that same injected stylesheet.
- The group name the legend gives the fieldset is proved by structure: the legend is the fieldset's first child and the date control has no label. The installed `readName` function computes no fieldset name from a legend, so the proof never reads that name directly.
- The `.container-fluid` wrapper is an ancillary choice beyond ruling E's wording.

## Artifacts

- Logs: `tmp/probe/app.log.txt`, `setup.log.txt`, `journey.log.txt`, `capture.log.txt`, `check.log.txt`, `label.log.txt`.
- Mutation instrument: `tmp/probe/mutate.py`. The probe test files and the probe config were deleted after their runs.
- Frames: `tmp/capture/states/`.

No commit, push, install, build, or destructive git command was run.
