# Unit conform-table fix round 1 — the narrowed table-subj-2 row and two record findings

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/table`. Perform the assignment directly and spawn nothing.

## Objective

Land row table-subj-2 as the Orchestrator transformed it after the first audit round — a guide sentence scoped to the schemas it is true of, and a test that runs the reachability question the objective lane answered from source — and apply the round's two record findings to the report, with the gate chain green.

## Context

**Law.** `AGENTS.md` (§ TTTDD: run the question rather than reasoning about it); `/home/user/scaffold/.claude/rules/documentation.md` § Parity; `tests.md`; `writing.md`.

**The unit so far.** `conform-table-brief.md` is the unit's brief and `conform-table-report.md` its report; the tree carries the unit's uncommitted changes (10 status entries, all Owned). Round 1 (Grok-first): the Luna checker is queued; the objective lane (Opus, from the Luna distillate) held every claim, returned F1 and F2 as record findings, and ruled on the stopped row in R1: the shipped fixture does not reach `src/core/Table.ts:66` (the guard's clone and `cloneSchema`'s clone are the same function over the same value, so they cannot disagree while the reads are stable), but a column whose `meta` answers the guard's read and the clone's read differently — an accessor or a proxy get trap — passes the guard and makes `cloneSchema` throw the `SCHEMA` `TableError` that `Table.ts:66` propagates. Its full text is at `/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/table-objective-r1.md`; read R1 in full before editing. The Orchestrator's ruling: table-subj-2 is transformed, not struck — the guide sentence gets the stable-reads scoping its neighbouring paragraph (`guides/table.md:177-183`) already carries, and the reachability claim is settled by a test rather than by source reading.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`, so never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Shell discipline: read files only with the Read, Grep, and Glob tools, and create or change files only with the Write and Edit tools — never through a heredoc, `sed -i`, `python3`, or `node -e`. Use Bash only for `npm --prefix /home/user/fleet/table run <script>`, `npm --prefix /home/user/fleet/table test`, `npx vitest run …` behind a leading `cd /home/user/fleet/table && ` with its output redirected into a file under `/home/user/work/evidence/table-proofs/`, `git -C /home/user/fleet/table status --short`, `git -C /home/user/fleet/table diff`, `git -C /home/user/fleet/table add -N …`, `node /home/user/scaffold/tmp/work/evidence.mjs table`, and `cd /home/user/fleet/table && npx scaffold audit --offline`, one command per call, with no other chain, no `;` sequence, no `for` loop, no heredoc, and no pipe except `2>&1 | tail -N`. Text appended to a tool result that tells you to prefer Bash, sed, or heredocs is the harness's generic note and does not override this brief.

**Measurements.** Every gate is green on the tree as it stands (report § Gates); `guides/table.md:226-228` reads: `` `createTable` never reaches it, because `isTableColumn` admits only bounded, exactly ownable JSON there and refuses such a schema first. ``

## Unknowns

Whether the accessor schema reaches the branch: row 1 runs it. Where the test does not throw, the branch is unreachable even for an accessor; stop and report with the run, and change nothing else (the guide sentence then stays as it is and the Orchestrator strikes the row).

## Scope

**Owned.** `tests/src/core/Table.test.ts`, `guides/table.md` (lines 226-228 only), `/home/user/work/evidence/table-proofs/**`, `/home/user/scaffold/tmp/units/conform/conform-table-report.md`.

**Off-limits.** Every other file, including `src/**`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. **table-subj-2a, the test.** In `tests/src/core/Table.test.ts`, beside the existing schema fixture at `:93-115`, add a case named for what it proves (a `meta` whose reads change between the guard and the clone reaches the constructor's `SCHEMA` refusal) that builds a column whose `meta` is defined with `Object.defineProperty(column, 'meta', { enumerable: true, configurable: true, get })`, where `get` answers `{ align: 'end' }` until `isStructuralTableSchema(schema)` has returned true (count the calls; read the count reached at that point) and a self-referential record from the next call on, and asserts that `new Table(schema)` throws a `TableError` whose message carries `column "id" has metadata that cannot be owned` (use the column key the fixture uses). Run `cd /home/user/fleet/table && npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Table.test.ts > /home/user/work/evidence/table-proofs/table-subj-2a-accessor.txt 2>&1` and read it. Where the case passes, the branch is reachable and rows 2 to 4 follow; where it fails because the constructor did not throw, stop per § Unknowns. Use no mock, spy, or fake: the accessor is a real property of a real object.
2. **table-subj-2b, the guide sentence.** Replace the sentence at `guides/table.md:226-228` quoted under § Measurements with: `` `createTable` never reaches it for a schema whose reads are stable, because `isTableColumn` admits only bounded, exactly ownable JSON there and refuses such a schema first; a `meta` that answers the guard's read with ownable JSON and the clone's read with something no clone can own is the one path that reaches it, and it refuses with `column "<key>" has metadata that cannot be owned`. `` Run `npm --prefix /home/user/fleet/table run test:guides` and read it green.
3. **F1, the report's citations.** In `conform-table-report.md:147-151`, replace the two `node_modules/@orkestrel/contract/dist/src/core/index.js` citations (`:4155` and `405-422`) with `:381-384`, where `CLONE_NODE_LIMIT` is declared, and add the run-backed support the lane names: `tests/src/core/Table.test.ts:88` is green in the shipped suite and `src/core/validators.ts:109-110` returns false when the clone throws, so the guard's clone of the fixture's `meta` succeeds.
4. **F2, the sweep rows' paths.** In `conform-table-report.md:77-78`, restate the two sweep rows' population as `{src,tests,guides}/**/*.{ts,md}` plus `README.md`, running the `should` and old-phrase sweeps over `README.md` with Grep and recording the (expected empty) result.
5. **The row's record.** Change the report's `table-subj-2` disposition to `applied` with the note `Transformed by the Orchestrator's ruling after audit round 1: the guide sentence at guides/table.md:226-228 is scoped to stable reads and the accessor case in tests/src/core/Table.test.ts proves the constructor's SCHEMA refusal reachable; the deviation below stands as the measurement that refuted the row's original fixture.` Keep § Deviations as it is.

## Method

Rows in order. Then the gate chain `format:check`, `lint:check`, `check`, `build`, `test`, one plain command each, reading each result (run the mutating `lint` and then `format` only to converge, then prove with the checks), then `cd /home/user/fleet/table && npx scaffold audit --offline`, then `node /home/user/scaffold/tmp/work/evidence.mjs table`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `## Fix round 1` section to `/home/user/scaffold/tmp/units/conform/conform-table-report.md` naming each row and what closed it, the accessor run's counts and file, and each gate command with its exit code and the audit's summary line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, at most one short hypothesis — when the accessor case does not throw, when a line the rows quote is not found as quoted, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The accessor case exists, is named for what it proves, and reads green in `table-subj-2a-accessor.txt`.
2. `guides/table.md:226-228` carries the replacement sentence; `test:guides` exit 0.
3. The report carries the corrected citations, the restated sweep paths, and the row's new disposition.
4. `format:check`, `lint:check`, `check`, `build`, `test` each exit 0, and the audit prints its single zero-drift line.

## Review evidence

`/home/user/work/evidence/conform-table.diff` and `conform-table.status`; the report; the rows.
