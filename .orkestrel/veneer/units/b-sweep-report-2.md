# Unit B-SWEEP-2 report

## Before-and-after scoped readings

Before editing: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup
tests/setupServer.test.ts` — 1 file passed, 78 tests passed (Duration 9.81s), confirming the first
round's cases held under the floor-2 predicate they were written for.

After both obligations: same command — 1 file passed, 78 tests passed (Duration 10.90s, run again
after the mutation table restored the file).

## The predicate and TSDoc (obligation 1)

`tests/setupServer.ts` line 685: `return (count >= 4 && count * 2 > smallest) || count >= 6`. The
`@remarks` above `findDuplication` now states the relative arm's floor of 4, the two/three-
declaration coincidence boundary, and the absolute arm of 6 against the measured 3-declaration
accidental maximum, unchanged in substance from the amendment text, `@param`/`@returns`/`@example`
untouched.

## The plant (obligation 2)

`describe('findDuplication')` in `tests/setupServer.test.ts` now holds six cases, each building a
real scratch tree through `createScratch`, destroying it in `finally`, and calling the real
`scanStyleBlocks(scratch.path)`:

1. `(4, 4, 4)` reported — a four-declaration block in `_origin.scss` copied whole into
   `components/_echo.scss`, asserted with an exact `toEqual` naming both paths, both lines, and all
   four declarations on each side and in the intersection.
2. `(3, 6, 6)` refused, then `(4, 6, 6)` reported — two six-declaration blocks sharing three read
   `[]`; rewritten in the same case to share four, the intersection reports those four declarations.
3. `(2, 2, 2)` and `(3, 3, 3)` in one tree, both refused — a two-declaration block copied whole
   (`_duo.scss` / `components/_duoecho.scss`) and a three-declaration block copied whole
   (`_trio.scss` / `components/_trioecho.scss`) read `[]` from `findDuplication`, while
   `scanStyleBlocks(scratch.path).shared` lists both intersections with their declarations. The two
   blocks use disjoint property sets so neither pair cross-contaminates the other's overlap.
4. `(4, 8, 8)` refused, then `(4, 7, 8)` reported — the tie at the floor (`4 * 2 = 8`, not greater
   than `smallest = 8`) reads `[]`; one block narrowed to seven declarations in the same case, the
   same four declarations report (pins `>` against `>=`).
5. `(6, 12, 14)` reported, then `(5, 12, 14)` refused — the first round's absolute-arm case, kept
   unchanged.
6. The sweep-unmoved case — the first round's case with `(2, 5, 6)` and `(3, 6, 6)` in one tree,
   unchanged, asserting `sweep.shared` lists each intersection and `findDuplication(sweep.shared)`
   is `[]`.

`tests/setupStyles.test.ts` needed no change; its gate case already asserts
`findDuplication(sweep.shared)` equal to `[]` and passed unmoved.

## The mutation table (obligation 3)

Each mutation applied transiently to `tests/setupServer.ts`, measured with the § Measurement
command, then reverted by the exact reverse edit; `diff` against the pre-mutation copy confirmed an
identical file after each revert.

| Mutation | Reading | Case(s) that redden |
| --- | --- | --- |
| floor `4` to `3` | 1 failed / 77 passed | "refuses a whole two-declaration copy and a whole three-declaration copy, while the sweep still reports both" (case 3: the three-declaration copy now qualifies under the relative arm) |
| floor `4` to `5` | 3 failed / 75 passed | case 1 (`4,4,4`), case 2's `(4,6,6)` report, case 4's `(4,7,8)` report — every case whose reported side rests on exactly four shared declarations |
| `>` to `>=` | 1 failed / 77 passed | case 4 (the eight-declaration tie now qualifies, since `4 * 2 = 8 >= 8`) |
| absolute `6` to `5` | 1 failed / 77 passed | case 5 (the `(5, 12, 14)` refusal now reports, since `5 >= 5`) |
| absolute arm dropped | 1 failed / 77 passed | case 5 (the `(6, 12, 14)` report depends only on the absolute arm, because `6 * 2 = 12` is not greater than `smallest = 12`) |
| predicate returning `[]` (`return false`) | 4 failed / 74 passed | every case whose expectation is non-empty: case 1, case 2's `(4,6,6)` report, case 4's `(4,7,8)` report, and the large/overlapping absolute-arm report |
| predicate returning every intersection | 5 failed / 73 passed | every case whose expectation is `[]`: case 2's `(3,6,6)` refusal, case 3, case 4's `(4,8,8)` refusal, the large/overlapping narrower-twin refusal, and the sweep-unmoved case |

No mutation went unreddened by the plant.

## Touched files

- `tests/setupServer.ts` — the predicate line and its `@remarks` (obligation 1 only).
- `tests/setupServer.test.ts` — the `describe('findDuplication')` block (obligation 2 only).
- `tests/setupStyles.test.ts` — unchanged in this round; carried from the first round's uncommitted
  writes.

## Gate exits

- `npx oxfmt --config .oxfmtrc.json --write` over the owned files: ran, 1 file reformatted
  (`tests/setupServer.test.ts`), exit 0.
- `npm run format:check` — exit 0 (214 files, "All matched files use the correct format.").
- `npm run lint:check` — exit 0, no output.
- `npm run check` — exit 0 (`tsc` core/browser/styles and `vue-tsc` app/browser all clean).
- `npm run test:setup` — exit 0, 3 files passed, 166 tests passed.
- `npm run test:policy` — exit 0, 1 file passed, 109 passed / 1 skipped (110).

## `git status --porcelain`

```
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/setupStyles.test.ts
```

## `git diff aca0423 --stat`

```
 tests/setupServer.test.ts | 180 ++++++++++++++++++++++++++++++++++++++++++++++
 tests/setupServer.ts      |  31 +++++++-
 tests/setupStyles.test.ts |   5 +-
 3 files changed, 213 insertions(+), 3 deletions(-)
```

## Deviations

None. The measurement, obligations, scope, and acceptance criteria were followed as written.
