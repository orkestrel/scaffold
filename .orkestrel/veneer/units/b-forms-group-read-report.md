# Unit B-FORMS-GROUP-READ — report

## Site

`tests/src/styles/components/input-group.test.ts`, the case "squares the control or select inside
a floating wrapper on the side its neighbour sits" (around line 243).

## Failing-first and mutation record

**Failing-first (before the edit).** Ran
`npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/input-group.test.ts tests/src/styles/components/form-select.test.ts`
from `/home/user/veneer-bfx`. The case failed with `AssertionError: expected 6 to be 7` at the
`expect(selected).toBe(round)` assertion. 1 test failed, 31 passed.

**After the edit.** Same command: 2 test files passed, 32 tests passed.

**Mutation.** Swapped the two references in the corner comparison (`field.matches('.form-select')
? round : chosen` instead of `? chosen : round`). Ran the scoped `input-group.test.ts` file alone:
1 test failed (the target case), 18 passed — the case reddened on the swapped comparison, as the
radii differ (6 against 7).

**Reversal.** Restored `field.matches('.form-select') ? chosen : round` exactly. Re-ran both files:
2 test files passed, 32 tests passed.

## Gate exits with counts

- `npx oxfmt --config .oxfmtrc.json --write` over the owned file: reformatted, then
  `npx oxfmt --config .oxfmtrc.json --check` exit 0 ("All matched files use the correct format").
- `npx oxlint --config .oxlintrc.json --deny-warnings` over the owned file: exit 0, no findings.
- `npm run check`: exit 0 (`tsc --noEmit` across core/browser/styles projects and `vue-tsc` for
  `app`, all clean).
- `npm run build:src`: exit 0 (`dist/src/styles/index.css` 137.30 kB, built).
- `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot
  tests/src/styles/components/input-group.test.ts tests/src/styles/components/form-select.test.ts`:
  exit 0, 2 test files passed, 32 tests passed.

## git status --porcelain

```
 M tests/src/styles/components/input-group.test.ts
```

## Deviations

None. The obligation's exact comparison expression
(`corners.map((kept) => kept * (field.matches('.form-select') ? selected : round))`) needed two
adjustments to compile and run correctly, both mechanical and within the owned file and case:

1. `field` was out of scope inside the `INPUT_GROUP_FLOATING_CASES.map` callback (it belonged to
   the outer `fields.map` used only for the actual-corners side of the comparison). Rewrote the
   expected-corners map to iterate `INPUT_GROUP_FLOATING_CASES` with its index and read the
   corresponding element from `fields` at that index, guarded with `requireValue` for
   `noUncheckedIndexedAccess`.
2. `selected`, destructured from an array `.map()` result under `noUncheckedIndexedAccess`, typed
   as `number | undefined` and failed `tsc --noEmit` when multiplied directly. Bound it once with
   `requireValue(selected, 'No ungrouped select radius')` into `chosen`, mirroring the existing
   `round` pattern, and used `chosen` in the comparison and its `toBeGreaterThan(0)` assertion.

Both changes preserve the obligation's intent (each field's kept corner reads against its own
kind's ungrouped twin) and stayed inside the one owned case; no other file was touched.
