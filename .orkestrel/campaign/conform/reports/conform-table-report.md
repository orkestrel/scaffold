# Unit conform-table — report

## Outcome

Every row landed. `table-subj-2` landed as fix round 1 transformed it (see § Fix round 1): the guide
sentence is scoped to stable reads and a new test case proves the constructor's `SCHEMA` refusal
reachable through an accessor whose reads disagree. The gate chain is green on the final tree, and
`git status --short` lists only files under Owned.

## Rows

| Id             | Disposition | Note                                                                                                                                     |
| -------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `table-obj-2`  | applied     | Deleted the text-search `it` block and the `readFileSync` import from `tests/src/core/Table.test.ts`. No replacement added.               |
| `table-obj-3`  | applied     | `RowManager.move` now clamps a non-finite index. Red first, then green.                                                                   |
| `table-obj-4`  | applied     | `PaginationManager.move` now clamps a non-finite page. Red first, then green. `#normalize` unchanged and still serves `resize`.           |
| `table-subj-1` | applied     | Contract invariant 1's second sentence now states the internal list that ships.                                                           |
| `table-subj-2` | applied    | Transformed by the Orchestrator's ruling after audit round 1: the guide sentence at guides/table.md:226-228 is scoped to stable reads and the accessor case in tests/src/core/Table.test.ts proves the constructor's SCHEMA refusal reachable; the deviation below stands as the measurement that refuted the row's original fixture. |
| `table-subj-3` | applied     | Deleted every member tally in `guides/table.md`, then ruled every remaining numeral by sense.                                             |
| `table-subj-4` | applied     | Deleted the member tallies at `README.md` lines 3, 8, 73, and 75.                                                                         |
| `table-subj-5` | applied     | `types.ts` manager tally, `validators.ts` cell tally, and the `guides.test.ts` test title.                                                |
| `table-subj-6` | applied     | Deleted the `@param options` tag from the `TableOptions` doc block. The block runs description, `@remarks`, `@example`.                   |
| `table-subj-7` | applied     | Contract invariant 20 now reads "The wording of its strings is not. Never parse them."                                                    |
| `fleet-F1`     | noop        | `tests/setup.ts` declares no `isBrowserVuePath`. A tree-wide search for the name returned nothing outside `node_modules`.                 |
| `fleet-F2`     | noop        | No implementation class declares a public `readonly id: string` data field.                                                               |

## Files touched

- `/home/user/fleet/table/src/core/types.ts` — dropped the phantom `@param options` on `TableOptions`, dropped the manager tally on `TableInterface`, and stated the `NaN` failure behaviour on `rows.move` and `pagination.move`.
- `/home/user/fleet/table/src/core/tables/RowManager.ts` — `move` clamps a non-finite index instead of mapping it to the front.
- `/home/user/fleet/table/src/core/tables/PaginationManager.ts` — `move` clamps a non-finite page instead of collapsing it to page 1.
- `/home/user/fleet/table/src/core/validators.ts` — `isColumnCell`'s `@returns` no longer tallies the cell union.
- `/home/user/fleet/table/tests/src/core/Table.test.ts` — deleted the text-search block and its `node:fs` import; fix round 1 added the accessor case proving the constructor's `SCHEMA` refusal reachable.
- `/home/user/fleet/table/tests/src/core/tables/RowManager.test.ts` — `move` now covers positive infinity, `NaN`, and negative infinity.
- `/home/user/fleet/table/tests/src/core/tables/PaginationManager.test.ts` — `move` now covers positive infinity and `NaN`; a new case covers `resize(0)` and a non-finite page size.
- `/home/user/fleet/table/tests/guides.test.ts` — renamed the README fence test so its title states no count.
- `/home/user/fleet/table/guides/table.md` — deleted every member tally, corrected Contract invariant 1's internal-list sentence, and replaced the `should` in invariant 20.
- `/home/user/fleet/table/README.md` — deleted the column-cell, budget, and event tallies.

Diffstat:

```text
 README.md                                       |  12 +--
 guides/table.md                                 | 117 ++++++++++++------------
 src/core/tables/PaginationManager.ts            |   5 +-
 src/core/tables/RowManager.ts                   |   2 +-
 src/core/types.ts                               |  13 +--
 src/core/validators.ts                          |   2 +-
 tests/guides.test.ts                            |   2 +-
 tests/src/core/Table.test.ts                    |  25 -----
 tests/src/core/tables/PaginationManager.test.ts |  19 +++-
 tests/src/core/tables/RowManager.test.ts        |   8 +-
 10 files changed, 103 insertions(+), 102 deletions(-)
```

## Failing-first proofs

Command for every row below: `npm --prefix /home/user/fleet/table run test:src`.

| Row           | Red                                                                | Green                                            |
| ------------- | ------------------------------------------------------------------ | ------------------------------------------------ |
| `table-obj-3` | 1 failed, 102 passed (`table-obj-3-red.txt`)                       | 103 passed (`table-obj-3-green.txt`)             |
| `table-obj-4` | 1 failed, 103 passed (`table-obj-4-red.txt`)                       | 104 passed (`table-obj-4-green.txt`)             |
| `table-obj-2` | not applicable — the row deletes a test and repairs no source     | 103 passed (`table-obj-2-green.txt`)             |

Files sit in `/home/user/work/evidence/table-proofs/`.

- `table-obj-3` red line: `AssertionError: expected [ '2', '3', '4', '1' ] to strictly equal [ '3', '4', '1', '2' ]` at `tests/src/core/tables/RowManager.test.ts:114`, the assertion after `move('2', Number.POSITIVE_INFINITY)`.
- `table-obj-4` red line: `AssertionError: expected 1 to be 2` at `tests/src/core/tables/PaginationManager.test.ts:30`, `expect(table.pagination.page).toBe(table.pagination.count)` after `move(Number.POSITIVE_INFINITY)`.
- The new `resize` case in `PaginationManager.test.ts` passed at both ends. It closes a coverage gap the row names and proves no defect, and it is reported as coverage rather than as a regression proof.

## Sweeps

| Pattern                                                                                                             | Paths searched                              | Result                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `readFileSync\(\s*new URL\('\.\./\.\./\.\./src`                                                                     | `tests/**`                                  | 0 hits                                                                                                       |
| `\breadFileSync\b`                                                                                                  | `tests/**`                                  | 0 hits under `tests/src/**`; remaining hits are `guides.test.ts` reading root files and off-limits vendored files |
| `should(s\|ed\|ing)?\b`, case-insensitive                                                                            | `{src,tests,guides}/**/*.{ts,md}` plus `README.md` | 0 hits in this package's own prose; 0 hits in `README.md`; 4 hits in the vendored mirrors `guides/contract.md`, `guides/guide.md`, `guides/test.md` |
| `Nothing in this module is internal\|one of the four\|four column cells\|(S\|s)ix managers\|four-member\|three-member\|Eight events\|Seven interfaces\|seven behavioral\|exactly two things\|Six budgets\|two doors\|three overloads\|three verbs\|its three value claims`, case-insensitive | `{src,tests,guides}/**/*.{ts,md}` plus `README.md` | 0 hits outside the vendored `guides/contract.md`; 0 hits in `README.md`                                     |
| `\b(two\|three\|four\|five\|six\|seven\|eight\|nine\|ten)\b`, case-insensitive                                        | `README.md`                                 | 0 hits                                                                                                       |
| `\b(two\|three\|…\|twelve\|dozen)\b`, case-insensitive                                                               | `guides/table.md`                           | 21 hits, each ruled a permitted value or arity — listed below                                                |
| `@param options`                                                                                                    | `src/**`                                    | 2 hits, both on a function that receives the object: `Table.ts:59` and `factories.ts:8`                       |
| `^\s*readonly id\b`                                                                                                  | `src/**`                                    | 0 hits (fleet-F2)                                                                                            |
| `isBrowserVuePath`                                                                                                   | the whole checkout outside `node_modules`   | 0 hits (fleet-F1)                                                                                            |

Numerals kept in `guides/table.md`, with the sense that permits each:

- Fence comment values a reader needs: lines 52 and 771 (a page count and a page size the fence computes), line 1326 (`'twelve'` is a code literal).
- Arity of an operation's operands: lines 96, 201, 203, 247, 296, 1008, 1015, 1429, 1472, and 840.
- A sentence that names its members: line 88 (a sort term and a filter), 371 (the two spellings just given), 787 (the two sides just named), 981 (`serializeTable` and `parseTable`), 1156 (1048576 and 16384).
- An example magnitude: lines 935, 1161, 1162, 1411.

## Ancillary decisions

Recorded and carried on from, per the deviation contract:

1. **`PaginationManager.move` shape.** The row prescribes "the equivalent of" a nested ternary. I wrote `this.#readLimit() === undefined || Number.isNaN(page) ? 1 : Math.min(this.count, Math.max(1, Math.trunc(page)))`, which is the same function of the same inputs without the nested ternary.
2. **`pagination.move`'s `NaN` doc.** The row obliges the `NaN` failure behaviour on `rows.move`'s `@param index` only. `.claude/rules/typescript.md` § Comments and API documentation states the same obligation for `pagination.move`, whose `@param page` was equally silent, so I stated it there too.
3. **Row `table-obj-3` coverage.** The row names positive infinity and `NaN`. I added negative infinity beside them, which `.claude/rules/tests.md` § Test contract names in the same clause and which the fix's `Math.max(0, …)` floor is the door for.
4. **Line rewrapping.** Several guide and README paragraphs re-wrapped after a numeral was deleted. Only wrapping moved; no other word changed.
5. **Contract invariant 5's heading.** The sweep in row `table-subj-3` reached "it refuses one of two ways", which tallies a set of refusal modes. It now reads "it refuses by raising or by returning `false`", naming the members the invariant's own body lists.

## Deviation — row `table-subj-2` stopped

**Expected.** The row rules that `src/core/Table.ts:66` is a live branch propagating `cloneSchema`'s
`SCHEMA` refusal to a `createTable` caller; that `tests/src/core/Table.test.ts:93-115` ships a schema
proving it; and that the guide must therefore say a schema whose reads and stored values disagree
"does reach it", name `column "<key>" has metadata that cannot be owned` among the messages the
constructor can raise, and carry a tightened test asserting that message.

**Found.** The shipped schema does not reach that branch, and the prescribed test tightening fails.
The constructor refuses it with a different message.

**Exact evidence.**

- `/home/user/work/evidence/table-proofs/table-subj-2-deep-vector.txt`, the prescribed tightening
  applied to the shipped fixture:

  ```text
  FAIL  |src:core| tests/src/core/Table.test.ts > Table construction and derived state > refuses a
  schema whose owned copy fails the guard the caller-supplied one passed
  AssertionError: expected [Function] to throw error including 'column "id" has metadata that cannot …'
  but got 'The table schema is unusable: The sch…'

  Expected: "column "id" has metadata that cannot be owned"
  Received: "The table schema is unusable: The schema is not a table schema"

  Test Files  1 failed | 15 passed (16)
       Tests  1 failed | 102 passed (103)
  ```

- `src/core/validators.ts:107-111` is why. `isTableColumn` already clones the metadata inside the
  guard:

  ```ts
  if (hasMeta) {
  	if (!isBoundedJSONRecord(meta)) return false
  	const owned = attempt(() => cloneJSONRecord(meta))
  	if (!owned.success) return false
  }
  ```

  So every schema `isStructuralTableSchema` admits has already had each column's `meta` cloned once
  successfully. `cloneSchema` reads `column.meta` through the same `[[Get]]` and clones it again, so
  its refusal cannot fire on a schema the guard admitted unless the column's own reads differ between
  the guard's read and the cloner's read.

- The refuter's reachability evidence rests on `cloneJSONRecord` throwing for the 600-deep proxy
  fixture. It does not throw: the installed cap is `CLONE_NODE_LIMIT` 262144 nodes
  (`node_modules/@orkestrel/contract/dist/src/core/index.js:401-427`, where `CLONE_NODE_LIMIT` is
  declared), and the fixture produces about 1200. The clone succeeds, the owned copy then holds the
  deep record, and `Table.ts:73`'s re-guard is what refuses it — producing the message the run above
  received. `tests/src/core/Table.test.ts:88` is green in the shipped suite and
  `src/core/validators.ts:109-110` returns false when the clone throws, so the guard's clone of the
  fixture's `meta` succeeds.

- A second vector I tried, a `meta` proxy whose descriptor holds `Number.POSITIVE_INFINITY` while its
  get trap answers `'end'`, is refused by `isStructuralTableSchema` itself
  (`/home/user/work/evidence/table-proofs/table-subj-2-branch.txt`: `expected false to be true` at the
  `isStructuralTableSchema(schema)` assertion), for the same reason — the guard clones the metadata.

**Done or not done.** Not done, and nothing from this row is in the tree. `guides/table.md` lines
227-229, 173-176, and 1298 are unchanged, `src/core/Table.ts` is unchanged, and the temporary
assertion used to take the measurement was removed; `git diff --stat -- tests/src/core/Table.test.ts`
reports 25 deletions and 0 insertions, which is row `table-obj-2` alone.

**Hypothesis.** `Table.ts:66` is reachable only through a column object whose `meta` read is not
stable across the guard's read and the cloner's read, which `.claude/rules/patterns.md` § Foreign
contracts names as a read-count dependency the package must not have — so the ruling this row needs
is the one the finder offered and the refuter struck: either delete `Table.ts:66` and leave the
Guards paragraph naming the messages it already names, or make the constructor read the column once
and document the obligation on the interface that publishes it. Both are code rulings outside this
row's "no code changes" instruction, so neither is mine to take.

## Breaking

None. No published symbol was renamed or removed. `src/core/index.ts` is unchanged and the barrel's
surface is identical.

## Shared-file patches

None. No row required an edit outside Owned.

The `should` sweep found hits in `guides/contract.md`, `guides/guide.md`, and `guides/test.md`. Those
are vendored dependency guide mirrors, which `.claude/rules/documentation.md` § Parity places outside
this package's prose law and the brief lists as shared and report-only. They carry no patch: a mirror
is refreshed from upstream, never rewritten here.

## Gates

Run in order on the final tree, each read bare.

| Command                                             | Exit |
| --------------------------------------------------- | ---- |
| `npm --prefix /home/user/fleet/table run format:check` | 0    |
| `npm --prefix /home/user/fleet/table run lint:check`   | 0    |
| `npm --prefix /home/user/fleet/table run check`        | 0    |
| `npm --prefix /home/user/fleet/table run build`        | 0    |
| `npm --prefix /home/user/fleet/table test`             | 0    |

`npm test` totals, captured in `/home/user/work/evidence/table-proofs/gate-test.txt`: `src:core` 104
passed, `policy` 111 passed, `config` 46 passed, `setup` 12 passed, `guides` 82 passed.

Observation, not a criterion: that `npm test` reading was taken inside this unit's own exec. The
deciding whole-suite run belongs to the Orchestrator after the unit exits.

`git status --short` lists ten modified files, all under Owned, and no untracked file.

## Fix round 1

**Row `table-subj-2a`, the accessor test.** Added a case to `tests/src/core/Table.test.ts`, beside
the existing schema fixture, named `reaches the constructor SCHEMA refusal when meta answers the
guard and the clone differently`. Its column's `meta` is defined with
`Object.defineProperty(column, 'meta', { enumerable: true, configurable: true, get })`, where `get`
answers `{ align: 'end' }` for calls one through three (`isStructuralTableSchema` consumes call one;
`isStructuralTableSchema(schema)` is asserted `true` with `calls` read back as `1` immediately after)
and a self-referential record from call four on, the read `cloneSchema`'s `cloneJSONRecord` call
issues. The case then asserts that `new Table(schema)` throws a `TableError` whose message carries
`column "id" has metadata that cannot be owned`. Ran
`cd /home/user/fleet/table && npx vitest run --config vite.config.ts --no-cache --reporter=dot
--project src:core tests/src/core/Table.test.ts > table-subj-2a-accessor.txt`: 1 test file passed
(1), 13 tests passed (13). File: `/home/user/work/evidence/table-proofs/table-subj-2a-accessor.txt`.
The branch is reachable, so rows table-subj-2b through the record rows follow.

**Row `table-subj-2b`, the guide sentence.** `guides/table.md:226-230` now reads: `` `createTable`
never reaches it for a schema whose reads are stable, because `isTableColumn` admits only bounded,
exactly ownable JSON there and refuses such a schema first; a `meta` that answers the guard's read
with ownable JSON and the clone's read with something no clone can own is the one path that reaches
it, and it refuses with `column "<key>" has metadata that cannot be owned`. `` Ran
`npm --prefix /home/user/fleet/table run test:guides` (redirected to
`/home/user/work/evidence/table-proofs/table-subj-2b-guides.txt`): 1 test file passed (1), 82 tests
passed (82).

**Row F1, the report's citations.** `conform-table-report.md`'s deviation section now cites
`node_modules/@orkestrel/contract/dist/src/core/index.js:401-427`, where `CLONE_NODE_LIMIT` is
declared (`var CLONE_NODE_LIMIT = 262144` at line 427, inside the doc block opening at line 401);
node_modules was re-staged at 16:21 UTC after the audit round read the line numbers, which is why the
line numbers moved from the round's `:4155` and `405-422` rather than only the citation being wrong.
It also adds the run-backed support the objective lane named: `tests/src/core/Table.test.ts:88`
(`expect(isStructuralTableSchema(schema)).toBe(true)`) is green in the shipped suite, and
`src/core/validators.ts:109-110` (`const owned = attempt(() => cloneJSONRecord(meta)); if
(!owned.success) return false`) returns `false` when the clone throws, so the guard's clone of the
fixture's `meta` succeeds.

**Row F2, the sweep rows' paths.** `conform-table-report.md`'s two `should` and old-phrase sweep rows
now state their population as `{src,tests,guides}/**/*.{ts,md}` plus `README.md`. Ran both patterns
over `README.md` with Grep: 0 hits for `should(s|ed|ing)?\b` (case-insensitive) and 0 hits for the
old-phrase alternation (case-insensitive), matching the row's expectation.

**The row's record.** `table-subj-2`'s disposition is `applied`, with the note the row prescribes.
§ Deviations is unchanged.

**Gates.**

| Command                                                | Exit |
| ------------------------------------------------------- | ---- |
| `npm --prefix /home/user/fleet/table run format:check`  | 0    |
| `npm --prefix /home/user/fleet/table run lint:check`    | 0    |
| `npm --prefix /home/user/fleet/table run check`         | 0    |
| `npm --prefix /home/user/fleet/table run build`         | 0    |
| `npm --prefix /home/user/fleet/table test`               | 0    |

`npm test` totals: `src:core` 104 passed, `policy` 111 passed, `config` 46 passed, `setup` 12
passed, `guides` 82 passed (the `src:core` count rose from 103 to 104 with the new accessor case).

`cd /home/user/fleet/table && npx scaffold audit --offline` exit 0, summary line: `0 of 34 planned
paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

`node /home/user/scaffold/tmp/work/evidence.mjs table`: `/home/user/work/evidence/conform-table.diff`
620 lines, `/home/user/work/evidence/conform-table.status` 10 entries (all Owned files: `README.md`,
`guides/table.md`, `src/core/tables/PaginationManager.ts`, `src/core/tables/RowManager.ts`,
`src/core/types.ts`, `src/core/validators.ts`, `tests/guides.test.ts`,
`tests/src/core/Table.test.ts`, `tests/src/core/tables/PaginationManager.test.ts`,
`tests/src/core/tables/RowManager.test.ts`).
