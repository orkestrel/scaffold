# D1 reconciliation — small-unit rulings

Both lanes ran on the same brief (`tmp/design/d1-small-units-brief.md`), blind: planner (Opus 5,
subjective) and analyst (GPT-5.6 Sol, journaled exec `tmp/codex/d1-analyst.jsonl`). Rulings by the
Orchestrator, 2026-08-24.

## Q1 Channel — agreed, adopted

`{ value: T }` cells; no public surface change; drain narrows through the cell in the loop
condition. Pin tests: pushed `undefined` delivered in order; parked consumer woken by a pushed
`undefined`. Unit U1 → Sol.

## Q2 html — agreed core, merged specifics

Clock-free value assertions stay in the suite; growth claims move to guarded
`import.meta.env.MODE === 'benchmark'` blocks; operation counters and generous ceilings rejected
by both lanes. Planner's additions adopted: `test:bench` materialized through the scaffold tooling
first (U2a, builder); the parser tests that today assert nothing gain structural assertions; the
`NAMED_ENTITIES` table-size assertion moves beside the entity audit test; explicit per-test
timeouts with a named sizing basis; expected literals taken from red runs, never derived. Analyst's
per-test retained assertions adopted as the checklist. Units U2a → builder, U2b → Opus
implementer, serial.

## Q3 router — agreed, per-site conditions delegated

Convert all three waits. Each site's condition names only facts that site's own later assertions
pin (shared floor: `source.pulls > 2` and the drain-listener delta reaching 1; `!settled` where
the site pins settled false). Line 442 waits on `settled || failure !== undefined` so a rejection
reports as the outcome. Every existing expectation retained. Unit U3 → Sol.

## Q4 process — split verdicts reconciled

Win32 branch: planner's split (retryUntil for the pid, waitForCondition for termination) for
diagnostic value, with the analyst's combined-deadline concern honored — budgets 1500 + 1500 under
an explicit test timeout; `markerValid`/`terminationValid` stay because both platform branches
assign them. Line 232: agreed — fixed `waitForDelay(1000)`, early exit dropped, one capture read
for cleanup. The non-win32 settling delay stays. Unit U4 → Sol.

## Q5 middleware — agreed, names + semantics merged

Planner's names (`countActiveFileRequests`, `isClosedHandle`) with analyst's semantics (an
unrelated error propagates). Defaults, no options object. Helpers exported from
`tests/setupServer.ts` as sole implementations. Unit U5 → Opus implementer.

## Q6 MultipartParser — conflict, ruled subjective

Planner: keep flat, strike the row — `parsers/` is forbidden by the kind-or-folder rule, no
correct domain folder exists, and the fleet keeps solitary internal classes flat everywhere
(mcp `MCPClient`, process `Process`, terminal `Terminal`, router `Dispatcher`, and siblings).
Analyst: move to `multiparts/`. Ruling: the planner's position stands. `multiparts` names the
payload, not an entity family; the move would make middleware the fleet's only outlier; the row's
premise is a literal reading of the under-specified implementations cell in the centralized-file
table. The row closes as refused-on-evidence, and the durable fix is U6: repair the
implementations row in scaffold's vendored `.claude/rules/architecture.md` so it reads
consistently with § Entity subfolders and § Extension categories. U6 → Opus implementer, queued in
scaffold's serial writer chain.

## Carried findings (each names its carrier)

- html `parsers.test.ts` rows with no functional assertion → U2b (gains assertions).
- `NAMED_ENTITIES` total-vs-membership weakness → U2b carries the relocation; the
  membership-strength question is recorded for html's next natural release in ROADMAP if U2b does
  not settle it.
- process `ProcessManager.test.ts` negative assertion weak by its own admission (a change that
  stopped spawning also passes) → ROADMAP row for process at its next release; not this unit.
- process expensive-proof placement (spawning test in shared `src:server` project) → ROADMAP row
  for process; not this unit.
- architecture.md implementations-cell ambiguity → U6.
