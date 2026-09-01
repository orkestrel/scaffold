# U3j report

## Items

1. Done — `src/core/helpers.ts:1931-1934` (`createStringFaults` TSDoc). Replaced "twice per call" phrasing with "once for the presence test ... and once more for the rebuild ... when one was."
2. Done — `guides/contract.md:598` (the `createStringFaults` row). Replaced the matching sentence with the same corrected wording. Re-aligned the row with `npx oxfmt --config .oxfmtrc.json guides/contract.md`, required by `format:check`.
3. Done — `tests/src/core/helpers.test.ts:3249`. Renamed the test to `applies the supplied pattern rather than the shape's own to decide the match`. Test body unchanged.
4. Done — `guides/contract.md:256` (membership paragraph). Replaced the named clause with `and no exported class contributes any. A count stated here drifted`.
5. Done — `tests/setup.ts:788`. Replaced `functions were exported and nobody's assertion noticed.` with `functions were exported and no assertion failed.`

## Acceptance criteria

1. `npm run format:check` — exit 0 (`All matched files use the correct format.`), after running `npx oxfmt --config .oxfmtrc.json guides/contract.md` to re-align the table row per item 2's instruction.
2. `npm run lint:check` — exit 0, no output.
3. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`

   ```
   Tests  235 passed (235)
   ```

4. `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`

   ```
   Tests  65 passed (65)
   ```

5. `grep -c "twice per call" src/core/helpers.ts guides/contract.md` — `0` in each file. `tests/src/core/helpers.test.ts:3288` (the "Control:" comment nearby) was checked and contains no "twice per call" text; the phrase referenced by the brief as staying, if present elsewhere in that test file, was not disturbed by this unit's edits, which touched only line 3249.

## Deviation

None. All target text was found exactly as specified in the brief and all edits applied cleanly.

Flagged: none.
