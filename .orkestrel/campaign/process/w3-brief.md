# Unit W3 — process refusal spawn evidence and placement ruling

## Role and engine

`implementer` on Claude Opus 5, native subagent.

## Objective

Strengthen the mid-construction refusal case in
`/home/user/orkestrel/process/tests/src/server/ProcessManager.test.ts` to assert the spawn
happened, and land the spawning-proof placement ruling in `guides/process.md`.

## Context

**Evidence.** The weak branch: `tests/src/server/ProcessManager.test.ts:200-206` inside
`refuses a launch whose own options destroyed the registry mid-construction` (`:150-154`) — its
own comment admits a change that stopped spawning also passes. A stronger recorder-based proof
of the same race family already sits at `:261` in the same file. The manager refusal path:
`src/server/ProcessManager.ts:116-124` constructs the child, discovers destruction, tears the
child down, throws the `protocol` error. `ProcessOptions.on` accepts lifecycle hooks including
`exit`.

**Law.** `AGENTS.md`; `.claude/rules/tests.md` (the regression-proof and recorder rules, and
§ Expensive proofs), `typescript.md`, `writing.md`, `documentation.md`. Skill:
`orkestrel-harden-package` (test phases). Guide: `guides/process.md`.

**The ruling to implement (fixed).**

1. The refused launch supplies `on: { exit: <recorder handler> }` through its options. After the
   refusal and the destroy barrier, the recorder proves a child EXISTED and terminated: the
   terminal exit event fired. The registered-child control runs beside it with the same fixture
   and barrier. Assert: the thrown error is `protocol`; the manager is empty; the recorder's
   terminal event arrived. Keep an eventual-terminal assertion so a failed immediate snapshot
   diagnoses barrier timing rather than a child that never terminated.
2. The marker-absence branch, its scratch-directory plumbing, and the `win32` fork leave the
   case entirely.
3. Record the regression proof: run the case red first by REVERTING the strengthened assertion
   against a spawn-suppressed manager? No — the honest binding is the mutation control: with the
   spawn prevented (a one-line local mutation you make and revert, never commit), the recorder
   assertion must fail. Record the failing line in your report and revert the mutation.
4. Placement ruling in `guides/process.md`: one passage stating that the spawning proofs live in
   the `src:server` project because the package's server subject is spawning, that the fixed
   isolated projects (`distribution`, `service`) have different subjects, and that every
   spawn-suite budget is sized from a full contended run. Take that contended reading: run
   `npm run test:src` once, note the suite duration from the reporter, and set any budget the
   passage cites from it.

**Host.** POSIX bash at `/home/user/orkestrel/process`; full local access; children spawn
normally on this host.

**Measurements.** `npm run test:src` green at HEAD.

**Control identifiers.** The spawn-suppression mutation. A test is named for what it proves,
never for the control.

**Standing conditions.** none.

## Unknowns

The exact recorder helper the repo's tests already use for exit events — read the proof at
`:261` and reuse its exact mechanism; report which helper carried it.

## Scope

**Owned.** `tests/src/server/ProcessManager.test.ts`, `guides/process.md`.

**Shared (report-only).** none.

**Off-limits.** `src/**`, `package.json`, `vite.config.ts`, every other test file.

**What asserts the state this change ends.** The strengthened case itself; `tests/guides.test.ts`
if the guide passage names an export (it must not — cite behavior, not new names). Owned.

**Tools and limits.** Read, Grep, Glob, Edit, Bash scoped: `npx vitest run --config
vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/ProcessManager.test.ts`,
`npm run test:src` once for the contended reading, `npm run test:guides`. No git state changes,
no commit.

## Execution

A native subagent: perform the assignment directly and spawn nothing beyond what the tests
themselves spawn.

## Output

Write `/home/user/orkestrel/process/tmp/units/w3-report.md`: the strengthened case's shape, the
mutation control's failing line (and its reversion), the contended-run reading, the guide
passage, validation results. Return the same content as your final message.

## Deviation contract

Stop and report if the refusal path cannot deliver the exit event to a caller-supplied hook
(the seam the design assumes is absent). Wording and case naming are yours.

## Acceptance criteria

1. The scoped `ProcessManager.test.ts` run is green.
2. The mutation control's failing line is reported and the mutation reverted.
3. The `win32` fork, marker file, and scratch plumbing are gone from the case.
4. `npm run test:guides` green after the guide passage.

**Observations, not criteria.** The whole-suite `npm test` and the full contended `test:src`
duration are the Orchestrator's authoritative reads after you exit (your own `test:src` run is
the passage's cited reading, reported with its duration).

## Review evidence

The Orchestrator captures the diff and status after your exit; your report plus that diff is the
audit's subject.
