All rows applied, gates green, audit zero-drift. Returning the report's `## Fix round 1` section as required output.

## Fix round 1

**Row `table-subj-2a`, the accessor test.** Added a case to `tests/src/core/Table.test.ts`, beside the existing schema fixture, named `reaches the constructor SCHEMA refusal when meta answers the guard and the clone differently`. Its column's `meta` is defined with `Object.defineProperty(column, 'meta', { enumerable: true, configurable: true, get })`, where `get` answers `{ align: 'end' }` for calls one through three (`isStructuralTableSchema` consumes call one; `isStructuralTableSchema(schema)` is asserted `true` with `calls` read back as `1` immediately after) and a self-referential record from call four on, the read `cloneSchema`'s `cloneJSONRecord` call issues. The case then asserts that `new Table(schema)` throws a `TableError` whose message carries `column "id" has metadata that cannot be owned`. Ran `cd /home/user/fleet/table && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Table.test.ts > table-subj-2a-accessor.txt`: 1 test file passed (1), 13 tests passed (13). File: `/home/user/work/evidence/table-proofs/table-subj-2a-accessor.txt`. The branch is reachable, so rows table-subj-2b through the record rows follow.

**Row `table-subj-2b`, the guide sentence.** `guides/table.md:226-230` now reads: `` `createTable` never reaches it for a schema whose reads are stable, because `isTableColumn` admits only bounded, exactly ownable JSON there and refuses such a schema first; a `meta` that answers the guard's read with ownable JSON and the clone's read with something no clone can own is the one path that reaches it, and it refuses with `column "<key>" has metadata that cannot be owned`. `` Ran `npm --prefix /home/user/fleet/table run test:guides` (redirected to `/home/user/work/evidence/table-proofs/table-subj-2b-guides.txt`): 1 test file passed (1), 82 tests passed (82).

**Row F1, the report's citations.** `conform-table-report.md`'s deviation section now cites `node_modules/@orkestrel/contract/dist/src/core/index.js:401-427`, where `CLONE_NODE_LIMIT` is declared (`var CLONE_NODE_LIMIT = 262144` at line 427, inside the doc block opening at line 401); `node_modules` was re-staged at 16:21 UTC after the audit round read the line numbers, which is why the line numbers moved from the round's `:4155` and `405-422` rather than only the citation being wrong. It also adds the run-backed support the objective lane named: `tests/src/core/Table.test.ts:88` (`expect(isStructuralTableSchema(schema)).toBe(true)`) is green in the shipped suite, and `src/core/validators.ts:109-110` (`const owned = attempt(() => cloneJSONRecord(meta)); if (!owned.success) return false`) returns `false` when the clone throws, so the guard's clone of the fixture's `meta` succeeds.

**Row F2, the sweep rows' paths.** `conform-table-report.md`'s two `should` and old-phrase sweep rows now state their population as `{src,tests,guides}/**/*.{ts,md}` plus `README.md`. Ran both patterns over `README.md` with Grep: 0 hits for `should(s|ed|ing)?\b` (case-insensitive) and 0 hits for the old-phrase alternation (case-insensitive), matching the row's expectation.

**The row's record.** `table-subj-2`'s disposition is `applied`, with the note the row prescribes. § Deviations is unchanged.

**Gates.**

| Command | Exit |
| --- | --- |
| `npm --prefix /home/user/fleet/table run format:check` | 0 |
| `npm --prefix /home/user/fleet/table run lint:check` | 0 |
| `npm --prefix /home/user/fleet/table run check` | 0 |
| `npm --prefix /home/user/fleet/table run build` | 0 |
| `npm --prefix /home/user/fleet/table test` | 0 |

`npm test` totals: `src:core` 104 passed, `policy` 111 passed, `config` 46 passed, `setup` 12 passed, `guides` 82 passed (the `src:core` count rose from 103 to 104 with the new accessor case).

`cd /home/user/fleet/table && npx scaffold audit --offline` exit 0, summary line: `0 of 34 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 6.`

`node /home/user/scaffold/tmp/work/evidence.mjs table`: `/home/user/work/evidence/conform-table.diff` 620 lines, `/home/user/work/evidence/conform-table.status` 10 entries (all Owned files: `README.md`, `guides/table.md`, `src/core/tables/PaginationManager.ts`, `src/core/tables/RowManager.ts`, `src/core/types.ts`, `src/core/validators.ts`, `tests/guides.test.ts`, `tests/src/core/Table.test.ts`, `tests/src/core/tables/PaginationManager.test.ts`, `tests/src/core/tables/RowManager.test.ts`).

Files touched this round: `/home/user/fleet/table/tests/src/core/Table.test.ts`, `/home/user/fleet/table/guides/table.md`, `/home/user/scaffold/tmp/units/conform/conform-table-report.md`. Evidence files: `/home/user/work/evidence/table-proofs/table-subj-2a-accessor.txt`, `/home/user/work/evidence/table-proofs/table-subj-2b-guides.txt`, `/home/user/work/evidence/table-proofs/gate-*.txt`, `/home/user/work/evidence/conform-table.diff`, `/home/user/work/evidence/conform-table.status`.
