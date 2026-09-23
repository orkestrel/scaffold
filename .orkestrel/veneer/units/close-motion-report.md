# Unit CLOSE-MOTION (`cm`) report

## Status

Every acceptance criterion closes green. No deviation.

## `git diff --stat`

```text
 tests/setupStyles.test.ts                         |  5 ++++
 tests/setupStyles.ts                              | 29 +++++++++++++----------
 tests/src/styles/components/form-check.test.ts    |  7 +++---
 tests/src/styles/components/form-control.test.ts  | 16 ++++++++-----
 tests/src/styles/components/form-floating.test.ts | 19 +++++++--------
 tests/src/styles/components/form-range.test.ts    | 16 ++++++-------
 tests/src/styles/components/form-select.test.ts   |  6 ++---
 tests/src/styles/components/icon-link.test.ts     |  8 +++----
 tests/src/styles/components/pagination.test.ts    | 10 ++++----
 tests/src/styles/components/progress.test.ts      |  7 +++---
 tests/src/styles/components/spinner.test.ts       |  3 ++-
 11 files changed, 68 insertions(+), 58 deletions(-)
```

## `git status --short`

```text
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/styles/components/form-check.test.ts
 M tests/src/styles/components/form-control.test.ts
 M tests/src/styles/components/form-floating.test.ts
 M tests/src/styles/components/form-range.test.ts
 M tests/src/styles/components/form-select.test.ts
 M tests/src/styles/components/icon-link.test.ts
 M tests/src/styles/components/pagination.test.ts
 M tests/src/styles/components/progress.test.ts
 M tests/src/styles/components/spinner.test.ts
```

Every changed file sits in the brief's Owned scope. No shared or off-limits file moved.

## Before-and-after greps, each retained occurrence classified

### `grep -rn "prefers-reduced-motion" tests/ --include=*.ts` (before)

- `tests/setupStyles.test.ts` lines 493, 496, 538, 1870, 1876 — fixture: parser input strings the
  `collectGridVocabulary`, `parseMediaWidth`, and `readCascadeBlocks` proofs construct and feed to
  the reader under test. The brief classifies every parser or reader input in
  `tests/setupStyles.test.ts` as fixture, so these stay literal. Confirmed unchanged.
- `tests/setupServer.ts` lines 1401-1402 and `tests/setupServer.test.ts` lines 2044, 2046, 2083,
  2091, 2100 — fixture, off-limits per the brief. Confirmed unchanged.
- `tests/src/styles/components/form-check.test.ts:28`, `form-select.test.ts:27`,
  `form-floating.test.ts:25`, `form-range.test.ts:18`, `form-control.test.ts:30` — behavioural
  `const MOTION` declarations. Removed; each site now imports `REDUCED_MOTION` from
  `tests/setupStyles.js` and every `MOTION` use routes through it.
- `tests/src/styles/components/spinner.test.ts:271`, `progress.test.ts:192,215,252`,
  `icon-link.test.ts:157,163`, `pagination.test.ts:378,381` — behavioural inline literals (a
  `collectMediaConditions` expectation or a `matchMedia`/`conditionText` comparison). Each now
  reads `REDUCED_MOTION`.
- `tests/setupStyles.ts` line 58 (doc-block comment naming the literal) and lines 3702, 3727,
  5139, 5238, 5294 (`condition:` fields in the case tables) — behavioural per R3. The doc comment
  now names `{@link REDUCED_MOTION}` instead of the literal text, and the five `condition:` fields
  now read `` `@media ${REDUCED_MOTION}` ``.

### `grep -rn "prefers-reduced-motion: reduce" tests/src tests/setupStyles.ts` (after, criterion 2)

```text
tests/setupStyles.ts:1127:export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
```

Returns the declaration alone, as criterion 2 requires.

### `grep -rn "const MOTION" tests/src` (after, criterion 2)

No matches.

### `grep -rn "selectorText" tests/src | grep "split("` (before)

- `tests/src/styles/components/form-floating.test.ts` lines 69, 312, 505, 527 — behavioural, each
  a `rule.selectorText.split(',').map((part) => normalizeSelectorText(part))` membership check.
  Routed through `splitTopLevelList(rule.selectorText).map((part) => normalizeSelectorText(part))`.
- `tests/src/styles/components/pagination.test.ts` line 54 —
  `rule.selectorText.split(',').map((text) => text.trim())`. Routed through
  `splitTopLevelList(rule.selectorText)` (the helper's own trim replaces `.trim()`).
- `tests/src/styles/components/button-group.test.ts` line 311 —
  `rule.selectorText.replaceAll(' ', '').split(',')`. Off-limits: the brief scopes R9 to the
  floating and pagination proofs alone, and `button-group.test.ts` is not named in Owned or in the
  greps' five-site inventory, so it stays untouched.

### After (criterion 3)

`grep -rn "selectorText" tests/src | grep "split("` now returns only
`tests/src/styles/components/button-group.test.ts:311`, the one site the brief leaves off-limits.
No `selectorText.split(` remains in the floating or pagination proofs.

## Unknown resolved

The brief's Unknown asked whether a proof beyond the nine the terrain names holds the literal or
the idiom. Two further sites did: `tests/src/styles/components/spinner.test.ts` and
`tests/src/styles/components/icon-link.test.ts` each carry an inline `matchMedia`/
`collectMediaConditions`/`conditionText` literal beyond the five `const MOTION` proofs and
`progress.test.ts`/`pagination.test.ts`. All were named in the Owned file list, so no scope
violation; each is now routed through `REDUCED_MOTION`.

## Deviations

None. The doc-block wording at `tests/setupStyles.ts` around line 58 and the import-order
placement of `REDUCED_MOTION` (alphabetical, between `RATIO_CASES`/`REFERENCE_MARKUP` in the
export list and between `PROGRESS_VARIABLE_CASES`/`splitTopLevelList` or the nearest neighbours in
each proof's import block) were decided per the Deviation contract's carve-out and recorded here.

## Mutation run (criterion 5)

Command: set `tests/setupStyles.ts`'s `REDUCED_MOTION` to
`'(prefers-reduced-motion: no-preference)'`, then run:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup -t "pins the reduced-motion"
```

Failing (red), 1 failed:

```text
FAIL  |setup| tests/setupStyles.test.ts > styles setup > pins the reduced-motion query the `reduced-motion` mixin emits
AssertionError: expected '(prefers-reduced-motion: no-preferenc…' to be '(prefers-reduced-motion: reduce)'
```

And, after `npm run build:src:styles`:

```text
npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/form-range.test.ts tests/src/styles/components/form-floating.test.ts tests/src/styles/components/pagination.test.ts
```

Failing (red), 3 failed (`form-range.test.ts`, `form-floating.test.ts`, `pagination.test.ts`), each
on a routed condition equality reporting `(prefers-reduced-motion: no-preference)` against the
recorded `(prefers-reduced-motion: reduce)`.

Reverted `tests/setupStyles.ts` to its committed constant and re-ran both commands green:

```text
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup -t "pins the reduced-motion"
Test Files  1 passed | 3 skipped (4)
Tests  1 passed | 250 skipped (251)

npx vitest run --config configs/src/vite.styles.config.ts --no-cache tests/src/styles/components/form-range.test.ts tests/src/styles/components/form-floating.test.ts tests/src/styles/components/pagination.test.ts
Test Files  3 passed (3)
Tests  42 passed (42)
```

## Gate evidence (criterion 6 and 7)

```text
npx oxfmt --check <owned files>        → All matched files use the correct format.
npm run format:check                   → All matched files use the correct format. (291 files)
npm run lint:check                     → clean, exit 0
npm run check                          → tsc (root, src/core, src/browser, src/styles) and vue-tsc (app/browser) all clean, exit 0
npm run test:setup                     → Test Files 4 passed (4); Tests 251 passed (251)
npx vitest run --config configs/src/vite.styles.config.ts --no-cache
  tests/src/styles/components/{form-range,form-floating,form-select,form-control,form-check,pagination,progress,spinner,icon-link}.test.ts
                                        → Test Files 9 passed (9); Tests 155 passed (155)
```

## Observation (not a criterion)

`npm run test:src:styles` (the whole project) was not run; the brief marks it an observation, not
a criterion, and the scoped run above covers every owned proof file.
