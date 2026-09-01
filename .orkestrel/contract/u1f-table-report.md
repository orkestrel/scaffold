# Unit U1f — report (implementer / Opus 5)

All acceptance criteria are green.

## Mechanism as landed

`readArrayEntries` asks one canonicality question — a `matched` prefix scan comparing each reported member against `INTRINSICS.text(position)`, then one `if` combining `matched === length` with the member-count and trailing-`length` checks — and takes the direct copy or the walk from that single decision, with no flag, no size gate, and no index-text table. `INDEX_TEXTS` and every reference to it are gone from `src/core/constants.ts` (restored to its baseline content), `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, and `guides/contract.md`, so no module-evaluation statement remains under `src/`.

## Touched files

- `src/core/constants.ts` — the added table, its section comment, TSDoc, fill loop, and freeze call are deleted; file is byte-identical to its baseline.
- `src/core/helpers.ts` — dropped the `INDEX_TEXTS` import, collapsed the flag and its two blocks into one predicate reading `INTRINSICS.text(position)`, and removed the `{@link INDEX_TEXTS}` clause from the TSDoc remark.
- `tests/src/core/helpers.test.ts` — deleted the table test and the restating parity test, removed the `INDEX_TEXTS` import, and replaced the disowning pin with a last-index pin and a first-index pin, each asserting the exact refusal message.
- `guides/contract.md` — deleted the `INDEX_TEXTS` row and tightened the `readArrayEntries` row.

## Scoped command and counts

`npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/helpers.test.ts`

| Run | Result |
| --- | --- |
| Before (U1 tree, unedited) | `Tests 222 passed (222)` |
| Mutation red (`!INTRINSICS.own(value, key)` removed from the direct copy only) | `Tests 4 failed | 217 passed (221)` |
| After (clause restored, edits landed) | `Tests 221 passed (221)` |

Failing-first test names under the mutation: `readArrayEntries > refuses a canonical population that disowns its last index`; `readArrayEntries > refuses a canonical population that disowns its first index`; `readArrayEntries > preserves exact reasons from reflected membership and value reads`; `matchesJSONDepth > refuses contradictory, impossible, and hostile array reads`.

## Gate evidence

- `npm run format:check` → exit 0 (62 files)
- `npm run lint:check` → exit 0
- `npm run check` → exit 0
- `npm run test:guides` → exit 0, `Tests 65 passed (65)`
- Observation: `npm test` → exit 0, `1308 passed`, `111 passed`, `46 passed`, `61 passed`, `65 passed`

## Status and diffstat

```
 M guides/contract.md
 M src/core/helpers.ts
 M tests/src/core/helpers.test.ts
```

```
 guides/contract.md             |  2 +-
 src/core/helpers.ts            | 34 +++++++++++++++----
 tests/src/core/helpers.test.ts | 76 ++++++++++++++++++++++++++++++++++++++++++
 3 files changed, 104 insertions(+), 8 deletions(-)
```

`git diff src/core/constants.ts` is empty. `grep -rn INDEX_TEXTS src tests guides` finds nothing. `grep -n -E '^(for|if|while) ' src/core/*.ts` prints nothing.

## Guide row as it now reads

The `readArrayEntries` row: "… Canonical reflected indices below `4294967295` must be below the captured length, arrive in ascending order, or are sorted numerically, corroborated with `Object.hasOwn`, and read once. … A reflected population that is exactly the canonical indices in ascending order followed by `length` is copied straight by index under the same `Object.hasOwn` corroboration, and answers with the same entries, the same `dense` fact, and the same refusals as the walk. …"

## Deviation state

No deviation. Three decisions taken under the "decide, record, and carry on" clause:

1. **Predicate shape.** The single decision is a `matched` prefix scan followed by one `if` that also carries the member-count and trailing-`length` checks. Consequence: U1 tested the member count first, so an array carrying a canonical index prefix plus an extra own key rejected at O(1); it now scans that prefix before taking the walk. That population walks either way, and the walk re-reads every member with a numeric conversion and a text build per key, so the added scan is a fraction of work that population already pays. No benchmark family reaches this path.
2. **Disowning pin split into two tests.** A single test looping over the two ends short-circuits at its first failing assertion; the pins landed as two tests and both go red independently under the mutation.
3. **Message narrowing.** `Result.error` is `unknown`, so each pin narrows with `if (!(refusal instanceof Error)) throw refusal` before asserting `refusal.message`. No assertion or non-null operator.

Sweep observation: the `below` hits in the changed guide row are numeric comparisons, a permitted sense. Pre-existing baseline lines outside this change still carry cross-reference `above`/`below` at `src/core/helpers.ts:1374`, `:1413`, `:1751` and `tests/src/core/helpers.test.ts:1228`, `:1230`, `:3022`, `:3440`, `:3444`.
