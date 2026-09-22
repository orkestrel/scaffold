# Unit B-SWEEP-3 report

## Lines changed

### `tests/setupServer.ts` — `scanStyleBlocks` `@example` (reviewer F1, second clause)

Before:
```
 * @example
 * ```ts
 * scanStyleBlocks().shared // [] after shared blocks move into mixins
 * ```
```
After:
```
 * @example
 * ```ts
 * // A reading keeps every intersection, the accidental ones included: these two partials
 * // record the same external value rather than sharing one decision.
 * scanStyleBlocks().shared[0]?.declarations // ['width: 1rem', 'height: 1rem']
 * ```
```
The call now uses `scanStyleBlocks()` on its default rather than a free `styles` identifier.

### `tests/setupServer.ts` — `findDuplication` `@remarks` and `@example` (reviewer F1 first clause, F3)

Before:
```
 * 2026-09-22. `scanStyleBlocks` keeps reporting every intersection, so an auditor reads the refused
 * ones in its result.
 * @example
 * ```ts
 * findDuplication(scanStyleBlocks().shared) // [] after shared blocks move into mixins
 * ```
```
After:
```
 * 2026-09-22. `scanStyleBlocks` keeps reporting every intersection, so an auditor reads the refused
 * ones in its result. Two partials that each record the same external value agree by coincidence
 * rather than sharing one decision, so both copies stay inline; a reported intersection is a
 * repeated block, and the repair moves it into `_mixins.scss`.
 * @example
 * ```ts
 * // [] when every intersection the sweep reported is a coincidence, and after a repeated block moves into _mixins.scss
 * findDuplication(scanStyleBlocks().shared)
 * ```
```

### `tests/setupStyles.test.ts` — gate case title (reviewer F2)

Before: `repeats no partial's written declaration block in another partial`
After: `repeats no partial's written declaration block in another partial beyond the coincidence floor`

### `tests/setupServer.test.ts` — two case titles carrying temporal `once` (reviewer F4)

Before: `refuses a three-declaration overlap between two six-declaration blocks, and reports it once a fourth is shared`
After: `refuses a three-declaration overlap between two six-declaration blocks, and reports it after a fourth is shared`

Before: `refuses a four-declaration overlap tied at half of an eight-declaration block, and reports it once that block narrows to seven`
After: `refuses a four-declaration overlap tied at half of an eight-declaration block, and reports it after that block narrows to seven`

## Sweep result

Pattern: `\b(once|above|below|should|simply|just|easy|easier)\b`, case-insensitive, over the three
owned files.

`tests/setupServer.ts` (line 1489, 1607, 1901): three `once` hits, all outside the two edited doc
blocks. Each uses `once` as a one-time quantifier ("built once here", "states the difference
once", "names ... at once"), not the temporal-conditional sense the substitution table bans.
Ruled permitted; no edit, because these sit outside the owned doc blocks in any case.

`tests/setupServer.test.ts` (line 599): one `below` hit outside the two edited titles — a comment
reading "the row below names a category...". Cross-reference sense the table bans, but outside the
owned titles and off-limits for this unit. Reported, not edited.

`tests/setupStyles.test.ts` (lines 400, 650, 1017, 1177): `below`/`above` name viewport and table
boundary positions (domain terms, not cross-references), and `once` names a one-time quantifier
twice. All permitted senses; none sit in the owned gate title.

No hit fell inside an owned edit site beyond what the obligations already rewrote.

## Gate exits

- `npx oxfmt --config .oxfmtrc.json --write` over the three owned files: exit 0, "Finished in 89ms
  on 3 files".
- `npm run format:check`: exit 0, "All matched files use the correct format", 214 files.
- `npm run lint:check`: exit 0, no warnings.
- `npm run check`: exit 0 (`tsc` core/browser/styles, `vue-tsc` app/browser all clean).
- `npm run test:setup`: exit 0, 3 test files, 166 tests passed.
- `npm run test:policy`: exit 0, 1 test file, 109 passed, 1 skipped (110).

## `git status --porcelain`

```
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
```

Only the three owned files carry uncommitted changes, matching acceptance criterion 3. The
`git diff` over these files includes this round's edits plus the prior round's already-uncommitted
`findDuplication` addition (worktree carries both; this report's "Lines changed" section is scoped
to this round's obligations).

## Deviations

None. No file outside § Scope required a change.
