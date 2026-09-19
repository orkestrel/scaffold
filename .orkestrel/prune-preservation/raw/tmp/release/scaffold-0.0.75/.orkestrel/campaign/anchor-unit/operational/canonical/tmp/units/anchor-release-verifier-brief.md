# Unit anchor-release-verifier — Verify the actual release run

## Role and engine

Act as native verifier on Terra. Read-only gate evidence role; do not fix source or spawn.

## Objective

Verify the exact completed release run and report exit-code truth plus rebuilt anchor behavior.

## Context

**Evidence.** Root invokes canonical ../../../../raw/canonical/tmp/release/launch-anchor-gates.ps1, wrapping the independently audited run-anchor-gates.mjs. Candidate root is C:/Users/mikes/WebstormProjects/scaffold/tmp/release/scaffold-0.0.75; base 2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb plus frozen source. Read canonical anchor-closing-verdict.md under .orkestrel/campaign and candidate anchor-repair-report-3.md under tmp/units.

**Law.** Read AGENTS.md, orchestration, quality/tests/portability/documentation/writing rules; orkestrel-publish skill and wave/window references; scaffold guide anchor/release contract. No assertions/any/suppressions/dependencies/mocks or source edits.

**Installed primitives.** Inspect package.json, lock's exact declared/resolved @orkestrel/test and contract, installed package manifests, and built server declaration. Read no credentials.

**Host.** Windows PowerShell 5.1, Node 24.20.0, npm 12.0.2, fixed candidate cwd. No installs, build, full-gate rerun, or mutating command.

**Measurements.** Actual run artifacts are candidate ../../../../raw/candidate/tmp/units/anchor-release-gates-node/summary.json, stdout.log.txt, stderr.log.txt; root wrapper outputs canonical ../../../../raw/canonical/tmp/units/anchor-gates-root.log.txt and .err.txt. Root only dispatches after completion. Child native and root host readings must agree; do not rely on a report alone.

**Control identifiers.** Exit-seven control is canonical tmp/units/anchor-gates-control-node-2. Built identity direct mismatches are in canonical ../../../../raw/canonical/tmp/probe/anchor-built-reading.mjs; unchanged expectation counterexample in anchor-expectation-reading.mjs.

**Standing conditions.** Earlier PowerShell wrappers failed controls and are historical. Full gate can include deliberate malformed-config diagnostic fixtures; rule errors by test result and actual child exit, not a stderr substring. Source is frozen; partial recipe directory remains preserved.

## Unknowns

Report exact first failing gate if the chain failed, absent/truncated logs, changed source bytes, or malformed/null exit. No repair.

## Scope

**Owned.** No files. Return final report text for root to retain.

**Shared (report-only).** Candidate, root launcher/instrument and complete gate outputs.

**Off-limits.** Source writes, installs, commits, push, publish, cleanup, credentials, original Roughnotes.

**What asserts the state this change ends.** Ordered full prepublishOnly must execute format:check, lint:check, check, build, test chain, and release distribution. Confirm final server declarations carry bigint and actual built helper reports exact native values. No archive claim before pack.

**Tools and limits.** Read logs/metadata/diffs. Run `node ../../../../raw/canonical/tmp/probe/anchor-built-reading.mjs` with candidate cwd; it only reads filesystem metadata and compares real built output. Inspect root cap wrapper mechanically, including actual recorded PID and limit; no timeout-tree claim without execution.

## Execution

Perform the assignment directly and spawn nothing. Do not rerun the whole chain. Read every gate's actual result and report anomalies rather than fixing them.

## Output

Return command/cwd/time/exit truth, gate results, discovered skip limits, full-log locations, actual built reading, declared/resolved/installed versions, source status and any deviation. Root saves the immutable return; no report file write by verifier.

## Deviation contract

Report expected/found/exact evidence on any missing result or mismatch. Classify an expected fixture diagnostic using its surrounding executed test result and continue.

## Acceptance criteria

- Actual summary, full stdout/stderr and wrapper result establish native exit and all ordered gate outcomes.
- Read the actual built helper through the provided nonmutating command and inspect bigint declaration, with altered identity controls.
- Name real limits; do not claim publication, packed archive or Linux verification.

**Observations, not criteria.** Root accepts the source/release; verifier reports evidence only.

## Review evidence

Read actual source/report/diff, audited runner and retained controls, then completed run. Return exact failures or measured results, not an endorsement.
