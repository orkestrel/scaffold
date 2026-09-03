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
| `table-subj-2` | applied    | Transformed by the Orchestrator's ruling after audit round 1: the guide sentence at guides/table.md:229-233 is scoped to stable reads, and fix round 2 added the two sites at guides/table.md:175-178 and guides/table.md:1301; the accessor case in tests/src/core/Table.test.ts proves the constructor's SCHEMA refusal reachable; the deviation below stands as the measurement that refuted the row's original fixture. |
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
- `/home/user/fleet/table/tests/src/core/Table.test.ts` — deleted the text-search block and its `node:fs` import; fix round 1 added the accessor case proving the constructor's `SCHEMA` refusal reachable; fix round 2 renamed the title at `tests/src/core/Table.test.ts:29` to `exposes each interface member set exactly`.
- `/home/user/fleet/table/tests/src/core/tables/RowManager.test.ts` — `move` now covers positive infinity, `NaN`, and negative infinity.
- `/home/user/fleet/table/tests/src/core/tables/PaginationManager.test.ts` — `move` now covers positive infinity and `NaN`; a new case covers `resize(0)` and a non-finite page size.
- `/home/user/fleet/table/tests/guides.test.ts` — renamed the README fence test so its title states no count.
- `/home/user/fleet/table/guides/table.md` — deleted every member tally, corrected Contract invariant 1's internal-list sentence, and replaced the `should` in invariant 20; fix round 2 scoped the Guards paragraph's `cloneSchema` sentence to name `column "<key>" has metadata that cannot be owned` and stated the constructor rethrows it unchanged, and scoped the `SCHEMA` errors-table row to end "which the guard and the audit refuse first for every schema whose reads are stable".
- `/home/user/fleet/table/README.md` — deleted the column-cell, budget, and event tallies.

Diffstat:

```text
 README.md                                       |  12 +-
 guides/table.md                                 | 144 ++++++++++++------------
 src/core/tables/PaginationManager.ts            |   5 +-
 src/core/tables/RowManager.ts                   |   2 +-
 src/core/types.ts                               |  13 ++-
 src/core/validators.ts                          |   2 +-
 tests/guides.test.ts                            |   2 +-
 tests/src/core/Table.test.ts                    |  54 ++++-----
 tests/src/core/tables/PaginationManager.test.ts |  19 +++-
 tests/src/core/tables/RowManager.test.ts        |   8 +-
 10 files changed, 146 insertions(+), 115 deletions(-)
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
| `is the one path that`                                                                                              | `{src,tests,guides}/**/*.{ts,md}` plus `README.md` | 0 hits                                                                                                       |
| `refuse first\.`                                                                                                    | `{src,tests,guides}/**/*.{ts,md}` plus `README.md` | 0 hits                                                                                                       |
| `createTable never reaches it\|which the guard and the audit refuse first`                                          | `{src,tests,guides}/**/*.{ts,md}` plus `README.md` | 1 hit, `guides/table.md:1301`, ruled the row-2 result                                                        |
| `\b(two\|three\|four\|five\|six\|seven\|eight\|nine\|ten\|eleven\|twelve)\b`, case-insensitive, excluding `one`      | `src/**/*.ts` and `tests/**/*.ts` outside `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts` | 8 hits, each an arity or an example magnitude: `src/core/types.ts:277` ("Compares two cells"), `src/core/types.ts:393` ("separates two"), `src/core/types.ts:855` ("ten thousand rows"), `src/core/helpers.ts:128` ("two lens lists"), `src/core/helpers.ts:132` ("two terms"), `src/core/helpers.ts:173` ("Compares two cells"), `tests/guides.test.ts:708` (`'twelve'` as a data literal), `tests/src/core/helpers.test.ts:243` ("two lens lists") |

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

## Deviation — row `table-subj-2` as first attempted

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

**Done or not done.** The row's original fixture and its prescribed tightened assertion are
refuted, per the evidence recorded earlier in this section, and `src/core/Table.ts` is unchanged:
no code ruling was taken.
The row landed instead as § Fix round 1's accessor case and guide scoping, carried forward by this
round's § Fix round 2, which closes the two guide sites the fix-round-1 brief scoped out and strikes
the uniqueness claim § Fix round 1 introduced.

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

## Fix round 2

Closes audit round 2's refutations of claims 2, 4, and 9 and findings F1 and F2, per the
Orchestrator's ruling R1 (the Guards paragraph and the `SCHEMA` row were dropped, not struck, by
the fix-round-1 brief's Owned scope — this round carries the two sites it left out) and R2
(routed to `ledgers/followons.md`, not this unit's).

**Row 1, the Guards paragraph.** `guides/table.md:172` now reads: `` The `Table` constructor asks
in a different order. It guards the value it was handed, owns a copy of it, then guards and audits
that copy and keeps that same object. Its `SCHEMA` message carries the audit diagnostics when the
owned copy reaches the audit, and names `The schema is not a table schema` when the copy fails the
guard the handed value passed. It also names `column "<key>" has metadata that cannot be owned`
when the column's `meta` answers the guard's read and the clone's read differently, the message
`cloneSchema` raises and the constructor rethrows unchanged. ``

**Row 2, the `SCHEMA` row.** `guides/table.md`'s `SCHEMA` row in the `### Errors` table now ends
`` which the guard and the audit refuse first for every schema whose reads are stable. ``

**Row 3, F2.** `guides/table.md`'s `cloneSchema` paragraph now reads: `` a `meta` that answers the
guard's read with ownable JSON and the clone's read with something no clone can own reaches it, and
it refuses with `column "<key>" has metadata that cannot be owned`. `` The struck clause `is the one
path that` carried the uniqueness claim F2 named; the sentence now claims only that this `meta`
shape reaches the refusal, not that it is the sole shape that does.

**Row 4, F1.** `tests/src/core/Table.test.ts:29`'s title is now `exposes each interface member set
exactly`, carrying no tally over the growable interface-member set. The case-insensitive sweep
`\b(one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b` ran over `src/**/*.ts` and
`tests/**/*.ts` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
and `tests/distribution.test.ts`. Every hit is `one` used as an article ("one row", "one column",
"one table"), a pronoun ("the caller-supplied one"), or an arity/example phrase ("one or many",
"zero, one, or many", "'age': 'twelve'" as a data literal); none tallies a growable set. No
occurrence is a defect.

**Row 5, the sweep row.** The pattern `createTable never reaches it|which the guard and the audit
refuse first` over `{src,tests,guides}/**/*.{ts,md}` plus `README.md` does not read empty: it
matches only `guides/table.md`'s `SCHEMA` errors row at `guides/table.md:1301`
(`` … which the guard and the audit refuse first for every schema whose reads are stable. ``, the
row 2 result, whose new text carries the searched phrase as its own prefix). The phrase
`createTable never reaches it` exists on no single line of the checkout: `guides/table.md:229-230`
wraps `` `createTable` never reaches `` across a line break, so the literal alternation branch
never matches it. § Sweeps carries this row and its result as re-run. No further edit follows from
this reading.

**Row 6, presence guards.** Grep of `tests/guides.test.ts` for `The schema is not a table schema`,
`which the guard and the audit refuse first`, `is the one path that reaches it`, and `metadata that
cannot be owned` returned no match; `tests/guides.test.ts` carries no presence guard quoting any of
the three changed lines. `tests/src/core/Table.test.ts:114` asserts the runtime message `column
"id" has metadata that cannot be owned`, unchanged text, and sits outside this row's `Owned` scope
(`tests/guides.test.ts` only). Ran `npm --prefix /home/user/fleet/table run test:guides` (captured
in `/home/user/work/evidence/table-proofs/table-subj-2c-guides.txt`): exit 0.

**Row 7, the record.** This section and § Deviation carry the round's outcome, per this row.

**Gates.**

| Command                                                | Exit |
| ------------------------------------------------------- | ---- |
| `npm --prefix /home/user/fleet/table run format:check`  | 0    |
| `npm --prefix /home/user/fleet/table run lint:check`    | 0    |
| `npm --prefix /home/user/fleet/table run check`         | 0    |
| `npm --prefix /home/user/fleet/table run build`         | 0    |
| `npm --prefix /home/user/fleet/table test`               | 0    |

Converged with `npm --prefix /home/user/fleet/table run format` once, on `guides/table.md` alone,
after `format:check` reddened there (`oxfmt` reflowed the table alignment and prose wrap the three
new sentences shifted); `format:check` read green after.

`cd /home/user/fleet/table && npx scaffold audit --offline` exit 0, summary line: `0 of 34 planned
paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

`node /home/user/scaffold/tmp/work/evidence.mjs table`: `/home/user/work/evidence/conform-table.diff`
662 lines, `/home/user/work/evidence/conform-table.status` 10 entries (the same Owned files as
§ Fix round 1).

## Fix round 3

Closes audit round 3's refutation of claim 4 (the § Fix round 2 sweep record stated a hit that does
not exist and sat outside § Sweeps), F3 (the guide's "rethrows unchanged" claim was pinned only by a
substring assertion), and F4 (stale citations in this report). Round 3 held every other claim.

**Row 1, the sweep record.** § Fix round 2's row 5 stated that the alternation matches
`guides/table.md:226` and quoted `createTable never reaches it`; that phrase exists on no single
line of the checkout — `guides/table.md:229-230` wraps `` `createTable` never reaches `` across a
line break. Deleted that false quotation from § Fix round 2's row 5 and restated it to name the
alternation's actual single hit, `guides/table.md:1301`. Added a § Sweeps row after the original
`isBrowserVuePath` row, carrying every pattern re-run with the Grep tool over
`{src,tests,guides}/**/*.{ts,md}` plus `README.md`, excluding `node_modules`:

- `is the one path that` — 0 hits.
- `refuse first\.` — 0 hits.
- `createTable never reaches it|which the guard and the audit refuse first` — 1 hit,
  `guides/table.md:1301`, ruled the row-2 result.
- The number-word sweep `\b(two|three|four|five|six|seven|eight|nine|ten|eleven|twelve)\b`,
  case-insensitive, over `src/**/*.ts` and `tests/**/*.ts` outside `tests/setupPolicy.ts`,
  `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`: 8 hits other
  than `one`, each ruled an arity or an example magnitude as read — `src/core/types.ts:277`
  ("Compares two cells"), `src/core/types.ts:393` ("separates two"), `src/core/types.ts:855` ("ten
  thousand rows"), `src/core/helpers.ts:128` ("two lens lists"), `src/core/helpers.ts:132` ("two
  terms"), `src/core/helpers.ts:173` ("Compares two cells"), `tests/guides.test.ts:708` (`'twelve'`
  as a data literal), and `tests/src/core/helpers.test.ts:243` ("two lens lists").

**Row 2, the anchored assertion.** `tests/src/core/Table.test.ts:114` now reads
`expect(() => new Table(schema)).toThrow(/^column "id" has metadata that cannot be owned$/)`, an
anchored pattern that a wrapping prefix such as the one at `src/core/Table.ts:68` would fail. Ran
`npm --prefix /home/user/fleet/table run test:src > /home/user/work/evidence/table-proofs/table-fix3-test-src.txt 2>&1`:
16 test files passed (16), 104 tests passed (104).

**Row 3, the citations.** At report line 18, `table-subj-2`'s note now cites
`guides/table.md:229-233` for the scoped sentence and names the two sites fix round 2 added
(`guides/table.md:175-178`, `guides/table.md:1301`). At report line 162, "per the evidence below"
now reads "per the evidence recorded earlier in this section". At report line 33, the
`tests/src/core/Table.test.ts` note now names the title rename at `tests/src/core/Table.test.ts:29`.
At report line 37, the `guides/table.md` note now names the Guards-paragraph sentence and the
scoped `SCHEMA` row fix round 2 added.

**Gates.**

| Command                                                 | Exit |
| -------------------------------------------------------- | ---- |
| `npm --prefix /home/user/fleet/table run format:check`   | 0    |
| `npm --prefix /home/user/fleet/table run lint:check`     | 0    |
| `npm --prefix /home/user/fleet/table run check`          | 0    |
| `npm --prefix /home/user/fleet/table run build`          | 0    |
| `npm --prefix /home/user/fleet/table test`                | 0    |

`npm test` totals: `src:core` 104 passed, `policy` 111 passed, `config` 46 passed, `setup` 12
passed, `guides` 82 passed (the `src:core` count is unchanged at 104; the anchored assertion
tightened an existing case rather than adding one).

`cd /home/user/fleet/table && npx scaffold audit --offline` exit 0, summary line: `0 of 34 planned
paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

`node /home/user/scaffold/tmp/work/evidence.mjs table`: `/home/user/work/evidence/conform-table.diff`
662 lines, `/home/user/work/evidence/conform-table.status` 10 entries (the same Owned files as
§ Fix round 1). `git -C /home/user/fleet/table status --short` lists the same ten modified files
under Owned, and no untracked file.

## Fix round 4

Closes audit round 4's F5: the tally-deletion rewrite's `below` at `guides/table.md:1172-1173` and
the rewrapped `above` at `guides/table.md:1218` both read as a `.claude/rules/writing.md` § Code
tokens, references, and links fix, one vocabulary in one file.

**Row 1.** `guides/table.md:1173` now reads: `` `auditTable` is the semantic pass beyond structural
validation. It reports the domain faults listed following and every budget breach stated earlier.
The shape alone cannot see them, except an unownable `meta`, ``.

**Row 2.** `guides/table.md:1218` now reads: `` nothing to. Every readonly data member stays in the
`## Surface` rows stated earlier and is not repeated ``.

**Row 3, presence guards.** Grep of `tests/guides.test.ts` for the two old sentences ("listed
below", "breach above", "rows above") returned no match; the file carries no presence guard quoting
either line. Ran `npm --prefix /home/user/fleet/table run test:guides >
/home/user/work/evidence/table-proofs/table-fix4-guides.txt 2>&1`: 1 test file passed (1), 82 tests
passed (82).

**Row 4, the sweep.** Ran `\b(above|below)\b`, case-insensitive, over `guides/table.md`, `README.md`,
`src/**`, and `tests/**`, excluding `node_modules` and the vendored `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`.

| Site | Text | Sense | Ruling |
| --- | --- | --- | --- |
| `guides/table.md:56` | "Everything below is exported" | document reference | outside Owned — finding, unfixed |
| `guides/table.md:106` | "the readonly state below" | document reference | outside Owned — finding, unfixed |
| `guides/table.md:195` | "hostile-reflection boundary below" | document reference (points at the `### Cloners` section's own note) | outside Owned — finding, unfixed |
| `guides/table.md:227` | "subject to the core's hostile-reflection boundary below" | document reference | outside Owned — finding, unfixed |
| `guides/table.md:488` | "the line every refusal below is measured against" | document reference | outside Owned — finding, unfixed |
| `guides/table.md:1495` | "the worked examples above executed" | document reference | outside Owned — finding, unfixed |
| `README.md:77` | "the layer above" | architectural sense (a higher layer in the host stack, not a document pointer) | stays |
| `tests/src/core/tables/PaginationManager.test.ts:39` | "floors a page size below one" | magnitude sense | stays |
| `tests/guides.test.ts:233` | "Each test below transcribes" | document reference, in a source comment rather than shipped guide prose | outside Owned — finding, unfixed |

No hit in `src/**`. The six document-reference hits outside the two Owned lines are findings this
unit records rather than fixes, per the row's scope: "a document reference is a defect to fix under
this row where it sits in an Owned line, and a finding to record where it sits outside Owned."

**Gates.**

| Command | Exit |
| --- | --- |
| `npm --prefix /home/user/fleet/table run format:check` | 0 |
| `npm --prefix /home/user/fleet/table run lint:check` | 0 |
| `npm --prefix /home/user/fleet/table run check` | 0 |
| `npm --prefix /home/user/fleet/table run build` | 0 |
| `npm --prefix /home/user/fleet/table test` | 0 |

Converged with `npx oxfmt --config .oxfmtrc.json guides/table.md` once before the gate chain;
`format:check` read green after, with no further reformatting needed for the two edited lines.

`cd /home/user/fleet/table && npx scaffold audit --offline` exit 0, summary line: `0 of 34 planned
paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

`node /home/user/scaffold/tmp/work/evidence.mjs table`: `/home/user/work/evidence/conform-table.diff`
662 lines, `/home/user/work/evidence/conform-table.status` 10 entries (the same Owned files as
§ Fix round 1).
