# Unit anchor-gate-runner — Preserve native gate results

## Role and engine

Act as native sol on GPT-5.6 Sol, sole instrument writer in the canonical checkout. Terra's script unit has ended. The candidate source writer owns a disjoint checkout. Do not revert other edits or spawn.

## Objective

Produce and prove a Node gate runner that records full child output and propagates its native exit code.

## Context

**Evidence.** Root read tmp/units/anchor-release-gates-control-2/summary.json: native and exit were null despite stdout marker; shell exit was 0. stderr was empty. Predecessor quote transport also failed in control/stdout and stderr. Neither instrument is accepted. Preserve ../../../../raw/canonical/tmp/release/run-anchor-gates.ps1 and -2.ps1 plus all prior control directories. Do not rerun or delete them.

**Law.** Read AGENTS.md, .agents/orchestration.md, .claude/rules/{portability,writing,quality}.md, orkestrel-publish SKILL.md and references/wave.md and window.md, guides/scaffold.md release context. No any/assertions/suppressions/dependencies/mocks/compatibility wrappers. No credential reads, installs, commit/push/publish or destructive filesystem/Git commands.

**Installed primitives.** This is a standalone tmp Node host instrument. Use native node:child_process and filesystem APIs; no package install or project source dependency. Read package scripts, not auth/config files.

**Host.** Windows PowerShell 5.1, Node 24.20.0, npm 12.0.2. Canonical root C:/Users/mikes/WebstormProjects/scaffold. Candidate root is canonical tmp/release/scaffold-0.0.75. npm.cmd resolved C:/Users/mikes/scoop/apps/nodejs-lts/current/bin/npm.cmd; its package is bin/node_modules/npm/package.json. Confirm npm-cli.js exists beneath that npm root. Use process.execPath and npm's actual JS entry to avoid .cmd shell transport.

**Measurements.** Earlier real prepublishOnly duration 267.883 seconds; root owns the actual run with hard cap 900 seconds. Candidate HEAD read by root: 2f78b38a7c938d7e4f5b5c8f2030385bfcb5d6eb. Candidate source is in flight; do not run gates yet.

**Control identifiers.** Exit-seven, stderr-marker, stdout-marker, wrong-head, existing-output. Keep control labels in the instrument/report.

**Standing conditions.** Sol source unit is active only in candidate. Canonical .codex files are user-owned. Prior scripts were edited after their failed runs, so retain those reports as unsuccessful evidence, not exact certified executions.

## Unknowns

Confirm the npm JS entry from the resolved installation. Report any unresolved native process exit or redirection behavior without pretending success.

## Scope

**Owned.** Canonical ../../../../raw/canonical/tmp/release/run-anchor-gates.mjs, ../../../../raw/canonical/tmp/release/anchor-gate-control.mjs, ../../../../raw/canonical/tmp/units/anchor-gate-runner-report.md, and fresh tmp/units/anchor-gates-control-node output. Runtime actual output is candidate tmp/units/anchor-release-gates-node, created only by root execution.

**Shared (report-only).** Candidate source and package scripts; canonical campaign/brief records.

**Off-limits.** Historical scripts/evidence, source edits, original Roughnotes, user .codex, credentials, installs, publication, cleanup.

**What asserts the state this change ends.** The predecessor runner controls failed; they remain preserved. New controls must prove exact native exit 7, stdout and stderr, output refusal and expected-HEAD refusal. Do not alter package gate commands.

**Tools and limits.** Edit owned tmp files. Run isolated controls only. Do not launch prepublishOnly. Root owns full run. Use no dynamically built shell command. Terminate only an expired recorded Windows child tree by PID under the 900-second cap; process timeout is not a pass.

## Execution

Perform the assignment directly and spawn nothing. Use Node event-driven spawn with explicit argv and cwd. Redirect stdout/stderr to opened files at launch and wait for child close before writing summary. Reject a null/signal exit as failure. Set process.exitCode explicitly. Record start/end UTC, duration, cap, exact command/cwd/PID, actual exit or failure, git HEAD/status, Node/npm versions and log paths in summary.json. Validate expected HEAD and nonexistent output before mutation. Never overwrite evidence. Accept only a mandatory expected commit argument and optional control flag; all locations/commands otherwise fixed. Static control is a separate .mjs that emits named stdout/stderr and sets exitCode 7 through the same runner path. Avoid Start-Process and node -e quoting. Native process argv is the boundary.

## Output

Write the report with authored paths, exact control commands/exits/logs, failure handling and limits, actual diff/status, and next root invocation. No acceptance verdict.

## Deviation contract

Stop with expected/found/evidence/done if actual native exit or output cannot be preserved. Choose equivalent Node event/API details within this design and record the choice. Do not propose deleting prior evidence to rerun a control; use a new named successor if correction is needed.

## Acceptance criteria

- Reject wrong HEAD before output creation and refuse existing output without modifying it.
- Through the shared runner, the static control exits 7 and stdout/stderr markers appear in retained files; summary matches actual host exit.
- The actual mode invokes npm-cli.js run prepublishOnly in the candidate with full launch-time logs and an owned 900-second cap. This mode remains unrun until source freeze.

**Observations, not criteria.** Root and independent verifier own the full release reading. Control success does not prove package gates.

## Review evidence

Return exact script and control artifacts for independent audit. Root will run actual mode only after review and source freeze, and retain its log with source acceptance evidence.
