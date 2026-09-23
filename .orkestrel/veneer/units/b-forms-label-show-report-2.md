# B-FORMS-LABEL-SHOW (`bfw`) round 2 report

**Deviation state: none.** The registry case accepts `legend.col-form-label` and still refuses a
bare `legend`. Criteria 1, 2, and 3 are green. Criterion 4 holds: `npm run test:journey` fails only
on the matrix census case, in every variant, and every other case passes.

## Diff against round 1

Round 2 changed one file, `tests/setup.test.ts`. Round 1's writes are unchanged. The full tracked
diffstat against `dd855e9` is `8 files changed, 131 insertions(+), 16 deletions(-)`. The untracked
files are `app/browser/sections/FormLabelSection.ts` and
`tests/app/browser/sections/FormLabelSection.test.ts`.

```diff
--- a/tests/setup.test.ts
+++ b/tests/setup.test.ts
@@ -146,10 +146,13 @@ describe('shared setup', () => {
 	it('describes each photographed cascade key by its specimen, its element, and its property', () => {
 		expect(CASCADE_KEYS).not.toStrictEqual([])
+		// A selector leads with the class whose rule the key reads, alone or qualified by the element
+		// that carries it, as `legend.col-form-label` is. A bare element selector such as `legend`
+		// names no class, so the check refuses it.
 		expect(
 			CASCADE_KEYS.filter(
 				(key) =>
-					key.subject.length === 0 || !key.selector.startsWith('.') || key.property.length === 0,
+					key.subject.length === 0 || !/^[a-z]*\./u.test(key.selector) || key.property.length === 0,
 			),
 		).toStrictEqual([])
```

The `form-label-legend` row in `tests/setup.ts` keeps `selector: 'legend.col-form-label'`.

Comment wording, decided under the deviation contract: the draft rationale said a bare element
selector "names every element of that kind on the page". The journey queries the selector inside
the specimen (`specimen.querySelector(key.selector)` in `tests/app/browser/integration.test.ts`), so
that reason was false. The comment gives the reason the code supports instead: a bare element
selector names no class.

## Failing-first evidence

- Before the edit: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setup.test.ts`
  → `Tests  1 failed | 20 passed (21)`. The failing case was "describes each photographed cascade
  key by its specimen, its element, and its property", and the failing row was the legend row.
- After the edit, the same command → `Tests  21 passed (21)`.
- Mutation: with the legend row's selector set to `legend` in `tests/setup.ts`, the same command
  → `Tests  1 failed | 20 passed (21)`. The same case failed, and the diff listed the one row
  `{ scenario: 'form-label-legend', selector: 'legend', subject: 'Form label legend' }`. The file
  was restored from a scratchpad copy, and `cmp` confirmed it matched byte for byte.

## Criteria

1. Check and comment: met, as the preceding diff shows. The legend row keeps `legend.col-form-label`.
2. Format, lint, and type gates:
   - `npx oxfmt --config .oxfmtrc.json --check` over the owned source and test files → "All matched files use the correct format.", exit 0.
   - `npm run format:check` → exit 0, "All matched files use the correct format." (289 files).
   - `npm run lint:check` → exit 0.
   - `npm run check` → exit 0.
   - All four were re-run after the final comment edit.
3. Suites:
   - `npm run test:setup` → exit 0, `Test Files  4 passed (4)`, `Tests  247 passed (247)`. Re-run after the final comment edit.
   - `npm run test:app` → exit 0, `Test Files  28 passed (28)`, `Tests  65 passed (65)`.
   - The `dist/` failures from round 1 are gone.
4. `npm run test:journey` → exit 1, `Tests  4 failed | 148 passed (152)`.
   - The 4 failures are the one case "matrix > reads the mounted class and style populations with
     their published controls", once in each of `journey:light-1280`, `journey:dark-1280`,
     `journey:light-390`, and `journey:dark-390`.
   - Each failure is `expect(census.undeclared).toEqual([])`, and `census.undeclared` lists
     `col-form-label`, `col-form-label-lg`, `col-form-label-sm`, `form-label`, and `form-text`.
     Those are the classes `bfl`'s partial declares, as the standing conditions state.
   - Every other journey case passed.
   - The journey ran before the final comment-only edit to `tests/setup.test.ts`. That file is not
     in the journey project.

## Observation

The matrix census case reads as the standing conditions predict. The Orchestrator's integrated run,
with `_form-label.scss` present, settles it.

## Claims flagged as weakest

- The regex `^[a-z]*\.` allows only lowercase letters in the element qualifier. It would refuse a
  class qualified by an element whose name contains a digit, such as `h2.display-6`. No `CASCADE_KEYS` row uses
  one. Widening the pattern to `^[a-z][a-z\d]*\.|^\.` would admit that case, but it is outside
  this brief's fixed check.
- The regex does not check what follows the dot, so it admits `legend.` or `.` followed by
  anything. The replaced `startsWith('.')` check had the same limit.
- Round 1's flagged claims still apply unchanged: the range case's two Tab presses assume
  Chromium's en-US date fields; the column split and the matrix attribution were measured against
  an injected stylesheet rather than `bfl`'s partial; the legend's group name is proved only by
  structure; and the `.container-fluid` wrapper is an ancillary choice.

## Artifacts

- Logs: `tmp/probe/format2.log.txt`, `lint2.log.txt`, `check2.log.txt`, `setup2.log.txt`, `app2.log.txt`, `journey2.log.txt`.
- Round 1's report: `tmp/units/bfw-report.md`.

No commit, push, install, build, or destructive git command was run.
