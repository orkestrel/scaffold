# Unit breaking-design — design the breaking-change phase of the fleet fix campaign

## Role and engine

LANE_PLACEHOLDER — a native Claude Opus 5 subagent with a clean context. The Sol bench is dark
(`codex` absent; recorded), so Opus holds every lane; each lane is told which perspective it holds.

## Objective

One reconciled plan for applying every deferred breaking repair across the fleet, in layer order,
with consumers proving against unpublished dependencies through built tarballs: units, dependencies,
ownership, serial and parallel order, acceptance criteria, risks, and the exit criterion.

## Context

**Evidence.** The deferred rows: `.orkestrel/campaign/fix/work-order.md` (grouped by publish
layer; row = package + finding id + writer's deferral note). The verified symbol ledger:
`.orkestrel/campaign/fix/breaking-ledger.json` (one record per row: exact exported symbols, action,
target name, owning member, file:line). The distillation's open naming questions, one report per layer chunk under `Unknowns`:
`.orkestrel/campaign/fix/breaking-ledger-*-report.md` (a ledger record with `to` omitted has its
alternatives there; the design rules on each). The consumer blast radius:
`.orkestrel/campaign/fix/breaking-radius.json` (per row, which fleet packages reference each symbol
in `src/`, `tests/`, `app/`, or `guides/` while importing from the owning package). Each row's finding
text and corrected repair: `.orkestrel/campaign/fix/<package>.md` § `## <id>`. Each writer's report:
`.orkestrel/campaign/fix/reports/<package>.md`. The layer order: the catalog table in
`.claude/agents/orkestrel.md` (`Layer` column), regenerated from the registry on 2026-08-28. The
audit round's misapplied findings for the landed units: `.orkestrel/campaign/fix/audit-1-verdict.md`
(when present; otherwise state that the round is open).

**Law.** `AGENTS.md`; `.claude/rules/architecture.md` (kind purity, wrapper test, barrels, stores),
`.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/patterns.md`,
`.claude/rules/tests.md`, `.claude/rules/documentation.md`, `.claude/rules/quality.md`,
`.claude/rules/workspace.md`; `.agents/orchestration.md` § Publishing the fleet (§ Fixing a
dependency before it publishes, § What a bump obliges) and § Writing concurrency; skills
`orkestrel-align-packages` (with `references/fleet.md` and `references/integration.md`) and
`orkestrel-harden-package` (with `references/centralization.md`); guides: each package's
`guides/<package>.md`.

**Host.** Linux, bash, 4 CPUs; fleet checkouts at `/home/user/fleet/<package>` and scaffold at
`/home/user/scaffold`, every repository on branch `claude/orkestrel-npm-audit-deps-14ibta`, committed
and pushed. Network reaches the registry through the session proxy. Publishing is held by the
user's ruling: no package publishes in this phase.

**Measurements.** Fleet: every published `@orkestrel/*` package in the catalog table except `supervisor`. Contract is at 0.0.15 on
the registry and every dependent except `worker` pins `^0.0.15`; `worker` stays at `^0.0.13`
because its `queue` dependency's pin nests a second contract copy and splits `Infer`
(`/home/user/work/logs/repin-worker.log`). Every fleet package builds to `dist/` with `npm run
build` and packs with `npm pack`; `npm install --no-save <tarball>` leaves `package.json` and the
lockfile untouched (verified on the process re-pin wave, 2026-08-28).

**Control identifiers.** none.

**Standing conditions.** The non-breaking fix round is landed in every package except the units
still running (`tool`, `emitter`, `abort`, `worker`); the fix-round audit lanes are still running;
a middleware fix-up unit (referral repairs) is running. No breaking unit dispatches into a
repository while another writer is live there. `probe`'s whole-suite test is red in this container
on pristine main (LSP initialize deadlines), recorded as pre-existing.

## Unknowns

- Whether some deferred rows conflict with each other inside one package (two renames of one
  symbol, a removal that another row's rename targets): report every such pair from the ledger.
- Whether a row's repair is better refused than applied under the rules (a rename the rule does
  not require, a removal that deletes a capability with a real consumer): name it as a tension for
  the Orchestrator to rule, with the rule text on each side.
- The exact cost of the tarball chain per layer: name what must be measured before dispatch.

## Scope

Read-only. Owned: nothing. Off-limits: every file. Tools: Read, Grep, Glob.

## Execution

A native subagent: perform the design directly and spawn nothing.

## Output

Return the `planner` shape — `Design`, `Alternatives`, `Units`, `Tensions`, `Risks` — where
`Units` is the plan: for each package with breaking rows, one unit naming its role and engine
(Opus `implementer` per package unit; `builder` only for a fully specified mechanical consumer
sweep), the rows it applies, the dependency tarballs it needs staged and from which packages,
the consumer units it unblocks, its owned and off-limits files, and independently checkable
acceptance criteria. State the layer-ordered dispatch schedule (which units run in parallel as
disjoint checkouts, which wait), the tarball mechanics each consumer unit runs (pack from the
dependency's committed tip, `npm install --no-save`, the register row, the restore before a
distribution proof), how each package's guide, tests, and `INTERNAL` parity list move with the
rename, and the exit criterion: the enumerated rows each ending applied, refused on a named rule,
or carried to a successor with its reason. Name the audit shape per unit (which lane, which
claims) per `orkestrel-falsify`.

## Deviation contract

Stop and report when the ledger and the work order disagree on a row's existence or package.
Decide, record, and carry on from the ordering of independent units inside one layer.

## Acceptance criteria

1. Every row in `work-order.md` appears in exactly one unit, or in a named refusal or carry.
2. Every unit names role, engine, owned files, off-limits files, and acceptance criteria that close
   on owned files.
3. The schedule respects layer order and one writer per checkout.
4. Every consumer unit names the dependency tarballs it stages and the register row it writes.

## Review evidence

The proposal itself; the canon it must satisfy (the Law row); the record of what motivated it (the
user's 2026-09-01 instruction to address the breaking changes with the tarball method, and the
work order's rows). Not a code change: no diff.
