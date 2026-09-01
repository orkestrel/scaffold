# Unit U1 — report (implementer / Opus 5)

Unit U1 complete. All owned-file work landed, gates green in my scoped runs.

## Mechanism as landed

`readArrayEntries` now reads `length` and `Reflect.ownKeys` once, then tests whether the reflected population is exactly `members.length === length + 1`, `members[length] === 'length'`, and each position's key equal to that position's decimal text — taken from the frozen `INDEX_TEXTS` table below its length and from `INTRINSICS.text(position)` above it; a population passing that test is copied straight into one native array by index, each index still corroborated with `INTRINSICS.own` before its single read, and returned frozen with `dense: true`. Every other population runs the pre-existing `collected`/`keys` walk unchanged, including the order-aware sort decision and the corroborated fill.

`INDEX_TEXTS` in `/home/user/contract/src/core/constants.ts` is a frozen `readonly string[]` holding the decimal text of `0` through `1023`, appended in ascending order through `INTRINSICS.write` and `INTRINSICS.text` while the module evaluates, then frozen in place; no companion limit constant exists and no size gate selects an algorithm.

## Red/green proof

Command (identical for all three readings):

```
npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts
```

| Reading | Result |
| --- | --- |
| Baseline, before any edit | `Tests 217 passed (217)` |
| Mutation: `!INTRINSICS.own(value, key)` removed from the direct copy's guard, leaving `if (key === undefined)` | `Tests 3 failed | 219 passed (222)` |
| After restoring the clause | `Tests 222 passed (222)` |

The three tests the mutation reddened, by name:

- `readArrayEntries > refuses a canonical population that disowns one of its own indices` (the added pin);
- `readArrayEntries > preserves exact reasons from reflected membership and value reads`;
- `matchesJSONDepth > refuses contradictory, impossible, and hostile array reads`.

The last two are pre-existing pins that now flow through the direct copy, so the mutation is also the evidence that the fast path executes on ordinary input.

## Tests added

All in `describe('readArrayEntries')` of `/home/user/contract/tests/src/core/helpers.test.ts`, real values and `Proxy` only:

- `answers a canonical view and a reordered view of the same members identically`;
- `snapshots an array carrying an extra own string key like a plain array`;
- `snapshots an array carrying an own symbol key like a plain array`;
- `snapshots an array at the index-text table length and one past it alike` (also pins `INDEX_TEXTS` frozen, length `1024`, first and last entries);
- `refuses a canonical population that disowns one of its own indices`.

## Acceptance criteria readings

| Criterion | Command | Result |
| --- | --- | --- |
| Format | `npm run format:check` | exit 0 |
| Lint | `npm run lint:check` | exit 0 |
| Typecheck | `npm run check` | exit 0 |
| Scoped helpers suite | the command above | exit 0, `222 passed` |
| Guide parity | `npm run test:guides` | exit 0, `65 passed` |
| Tree state | `git status --porcelain` | only owned files |

`git status --porcelain`:

```
 M guides/contract.md
 M src/core/constants.ts
 M src/core/helpers.ts
 M tests/src/core/helpers.test.ts
```

Diffstat: `guides/contract.md 3 +-`, `src/core/constants.ts 38 ++`, `src/core/helpers.ts 42 ++--`, `tests/src/core/helpers.test.ts 98 ++`, 173 insertions, 8 deletions.

Observations, not criteria: `npm test` ran green whole-suite — `src:core 1309`, `policy 111`, `config 46`, `setup 61`, `guides 65`. `npm run build` was not run; it is the Orchestrator's.

## Guide changes

Added to the `readArrayEntries` row of `/home/user/contract/guides/contract.md`, between the density sentence and the descriptor-only sentence:

> A reflected population that is exactly the canonical indices in ascending order followed by `length` is copied straight by index under the same `Object.hasOwn` corroboration, and answers with the same entries, the same `dense` fact, and the same refusals as the walk; `INDEX_TEXTS` bounds what that decision costs and nothing about what it decides.

New row, immediately after `readArrayEntries` (padding elided):

> | `INDEX_TEXTS` | const | The decimal text of every array index from `0` through `1023`, frozen, built while `constants.ts` evaluates through the captured `String` coercion. `readArrayEntries` decides whether a reflected own-key population is exactly the canonical indices followed by `length`, which asks whether the key at each position is that position's decimal text; below this table's length that text is compared rather than rebuilt per call. The length is a COST bound and never an answer bound: a position past the end is compared against the same coercion this table was built from, so an array of any length reaches the same verdict, the same entries, and the same `dense` fact. No companion limit constant exists, and no size selects an algorithm. |

## Decisions recorded, carried on from

- **Guide row placement.** The brief named "the constants table beside `PRESENCE_MASK_LIMIT`". No such table exists: `PRESENCE_MASK_LIMIT` sits in the `### Compilers` surface table because it bounds compilation. I applied the same organizing principle and put `INDEX_TEXTS` in the `### Helper` table, next to `readArrayEntries` and the `INTRINSICS` const row that already establish the `const`-in-Helper-table precedent. Parity passes either way; this placement puts the table beside the mechanism it serves.
- **Table construction shape.** `constants.ts` permits only exported UPPER_SNAKE_CASE `const` declarations and no function syntax, so the table is declared `readonly string[]`, filled by a module-scope loop through the captured `INTRINSICS.write`, then frozen in place — that keeps the published type readonly rather than exporting a mutable `string[]`. I chose ascending append over `new INTRINSICS.list<string>(1024)` from a probe under `/home/user/contract/tmp/u1/` (removed): over the same packed-view comparison workload, medians were 37.39 ms for a `Reflect.set`-appended table, 37.20 ms for an indexed-assignment appended table, and 44.44 ms for a preallocated-length table; the negative control (a table of deliberately wrong text, drawn from outside the population the timing covers) reported 0 matches against 128000 for each real table, so the loop being timed did read the table.

## Deviation state

None. No off-limits file was touched, `src/core/types.ts` needed no change (`ArrayRead<T>` is unchanged), no listed pin went red, and every instrument under `/home/user/contract/tmp/` was removed (`tmp/` is empty).
