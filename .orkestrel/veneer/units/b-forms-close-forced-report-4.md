# Unit B-FORMS-CLOSE-FORCED (`bff`), round 4 — report

## Diff against round 3 (`ccb10a7`)

```text
$ git diff --stat ccb10a7
 guides/veneer.md                                 | 403 +++++++++++++----------
 src/styles/_mixins.scss                          |  14 +-
 src/styles/components/_form-check.scss           |   4 +-
 src/styles/components/_form-control.scss         |   4 +-
 src/styles/components/_form-range.scss           |   3 +
 src/styles/components/_form-select.scss          |   4 +-
 src/styles/components/_validation.scss           |   5 +-
 tests/conformance.test.ts                        |  36 ++
 tests/src/styles/components/form-check.test.ts   |  19 ++
 tests/src/styles/components/form-control.test.ts |  31 ++
 tests/src/styles/components/form-range.test.ts   |  20 ++
 tests/src/styles/components/form-select.test.ts  |  19 ++
 tests/src/styles/components/validation.test.ts   | 125 ++++++-
 tests/src/styles/mixins.test.ts                  |  10 +-
 14 files changed, 497 insertions(+), 200 deletions(-)
```

The `src/styles/*`, `tests/src/styles/mixins.test.ts` rows are rounds 1 to 3 (unchanged this round).
This round's own diff, scoped to its owned files, against round 3:

```text
$ git diff --stat ccb10a7 -- guides/veneer.md tests/setupStyles.test.ts tests/conformance.test.ts \
  tests/src/styles/components/{form-check,form-control,form-range,form-select,validation}.test.ts
 guides/veneer.md                                 | 403 +++++++++++++----------
 tests/conformance.test.ts                        |  36 ++
 tests/src/styles/components/form-check.test.ts   |  19 ++
 tests/src/styles/components/form-control.test.ts |  31 ++
 tests/src/styles/components/form-range.test.ts   |  20 ++
 tests/src/styles/components/form-select.test.ts  |  19 ++
 tests/src/styles/components/validation.test.ts   | 125 ++++++-
 7 files changed, 467 insertions(+), 186 deletions(-)
```

`tests/setupStyles.test.ts` shows no diff against round 3 because this round both removes the
single-block Node case and its `normalizeMediaCondition` import — matching the file's state
before rounds 2 to 3 added them — so the net change against `ccb10a7` is zero. The case now lives
in `tests/conformance.test.ts`.

```text
$ git status --short
 M guides/veneer.md
 M src/styles/_mixins.scss
 M src/styles/components/_form-check.scss
 M src/styles/components/_form-control.scss
 M src/styles/components/_form-range.scss
 M src/styles/components/_form-select.scss
 M src/styles/components/_validation.scss
 M tests/conformance.test.ts
 M tests/src/styles/components/form-check.test.ts
 M tests/src/styles/components/form-control.test.ts
 M tests/src/styles/components/form-range.test.ts
 M tests/src/styles/components/form-select.test.ts
 M tests/src/styles/components/validation.test.ts
 M tests/src/styles/mixins.test.ts
```

## Changes this round

- `guides/veneer.md`: rewrote the box, select, and control forced-colors sentences (each
  "the focused X also draws an outline" to "the focused X's rule also writes an outline ...
  color", "forced colors do not paint the shadow ring" to "forced colors paint no shadow ring");
  the range sentence likewise, plus "thumb's shadow ring" to "thumb shadow ring"; the reason
  sentence (HIGHLIGHT-REASON quoted text) to name the installed color reader resolving each side
  through a probe whose color forced colors also replace, rather than the removed
  "forced colors replace every color a rule writes" claim; the `focus-ring` paragraph
  (RANGE-RING) to say the range's `.form-range:focus` rule includes the mixin on the host because
  its ring sits on the thumb, rather than grouping it with the other three controls' shared
  shadow ring.
- `tests/src/styles/components/{form-check,form-control,form-range,form-select}.test.ts`: replaced
  each "Forced colors replace every color a rule writes[...]" comment clause with the same
  installed-color-reader sentence, rewrapped, keeping each case's own "the outline is read by its
  style and width" tail.
- `tests/src/styles/components/validation.test.ts`: replaced the same comment clause; rebuilt the
  density case (DENSITY-NAMES) to query each swatch by its accessible name
  (`[aria-label="Resting shade"]`, `[aria-label="Stated shade"]`,
  `[aria-label="Scoped resting shade"]`, `[aria-label="Scoped stated shade"]`) into a `pair` object
  (class swatches) and a `scope` object (scoped swatches), removed every `first`/`second`/`third`/
  `fourth`/`settled`/`scoped` binding, and built `pairs` from `{ form: 'class', ...pair }` and
  `{ form: 'scope', ...scope }`. The readings and their labels are unchanged; the "keeps the
  resting width" comment already refers to `scope.resting`, the disabled swatch.
- `tests/setupStyles.test.ts`: removed the single-block Node case ("emits one forced-colors block
  per selector...") and its now-unused `normalizeMediaCondition` import.
- `tests/conformance.test.ts`: added the same case verbatim inside the `declaration priority`
  describe (referral C — the case's subject is `compileExpandedCascade()`, the same compiled-CSS
  subject that describe's existing D39a case reads), and added the imports it needs:
  `requireValue` from `@orkestrel/test` (not previously imported here) and `readCascadeBlocks`,
  `renderRuleKey`, `normalizeMediaCondition` from `./setupServer.js` (`compileExpandedCascade` was
  already imported there).

## Acceptance criteria

1. `guides/veneer.md` carries the rewrapped sentences. **Met.** Verified by reading each site
   (around lines 1072, 1144, 1214, 1250, 1293, 2071) after editing; all lines sit at or under 100
   columns.
2. Each of the five proof comments carries the new clause, rewrapped. **Met.** Verified by reading
   each edited comment in `form-check.test.ts`, `form-control.test.ts`, `form-range.test.ts`,
   `form-select.test.ts`, `validation.test.ts`.
3. The density case queries by accessible name and role; no `first`/`second`/`third`/`fourth`/
   `settled`/`scoped` binding remains; `pairs` reads `{ form: 'class', ...pair }` and
   `{ form: 'scope', ...scope }`. **Met.** Verified by reading the rewritten block; confirmed no
   occurrence of the retired identifiers remains in the file.
4. The single-block Node case moved verbatim to `tests/conformance.test.ts` with its imports added
   there and removed (with the now-unused import) from `tests/setupStyles.test.ts`. **Met.**

5.
```text
$ npx oxfmt --check guides/veneer.md tests/setupStyles.test.ts tests/conformance.test.ts \
  tests/src/styles/components/{form-check,form-control,form-range,form-select,validation}.test.ts
Checking formatting...
All matched files use the correct format.
Finished in 4837ms on 8 files using 4 threads.

$ npm run format:check
> oxfmt --config .oxfmtrc.json --check .
Checking formatting...
All matched files use the correct format.
Finished in 5801ms on 287 files using 4 threads.

$ npm run lint:check
> oxlint --config .oxlintrc.json --deny-warnings .
(exit 0, no output)

$ npm run check
(tsc --noEmit across tsconfig.json, configs/src/tsconfig.{core,browser,styles}.json,
 configs/app/tsconfig.browser.json via vue-tsc — all completed with no errors, exit 0)
```
All exit 0. **Met.**

6.
```text
$ npm run test:setup
 Test Files  4 passed (4)
      Tests  247 passed (247)

$ npm run test:conformance
 Test Files  1 passed (1)
      Tests  21 passed (21)

$ npm run test:guides
 Test Files  1 passed (1)
      Tests  18 passed (18)

$ npm run build:src:styles && npx vitest run --config configs/src/vite.styles.config.ts \
  --no-cache --reporter=dot validation.test.ts
 Test Files  1 passed (1)
      Tests  21 passed (21)
```
All exit 0. **Met.**

## Observations, not criteria

The scoped five-file styles run (`form-check`, `form-control`, `form-range`, `form-select`,
`validation`) was not run as a separate criterion; the `validation.test.ts`-scoped run above
(criterion 6's fourth command) is the criterion the brief names, and it passed with all 21 tests
in that file green. `npm run test:src:styles` was not run as the full unscoped styles project;
the individually scoped invocation above targets only `validation.test.ts` per criterion 6's exact
wording ("the scoped styles run over `validation.test.ts`").

## Deviations

None. The quoted sites were all found at their stated approximate locations. The Node case's home
(referral C) settled inside the existing `declaration priority` describe rather than a new
`describe` of its own, because that describe's own D39a case already reads
`compileExpandedCascade()`/`readBuiltCascade()` against the same compiled-CSS subject, and no
other describe in `tests/conformance.test.ts` shares that subject as directly. The aria-label
query used `container.querySelector` (not `querySelectorAll`) since each label is unique in the
fixture.
