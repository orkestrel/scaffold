# Unit probe-baseline — isolated pattern reproduction and contract heap baseline

## Role and engine

Orchestrator-owned probe unit, run by the Orchestrator itself as tracked host commands. Audited
later like any unit; its auditor is a lane the Orchestrator reconciles, recorded in the round's
verdict file.

## Objective

Settle by measurement: what the prototype-getter memoization pattern buys per instance in
isolation, and what one `createContract` call costs today against reading one compiled artifact.

## Context

**Evidence.** `/home/user/contract/dist/src/core/index.js` exists (built 2026-09-01, exit 0).
`ContractCompiler` construction observes nothing; getters build one family each; the `contract`
getter builds every family (`src/core/ContractCompiler.ts:1986-2007`).

**Law.** `AGENTS.md`, `.claude/rules/quality.md` § Instruments, `.claude/rules/tests.md` § Probes.
Skill: none. Guide or spec: none.

**Host.** Linux, Node from the session path, instruments under the session scratchpad — never
under a repository `tmp/` while units are live. Runs use `node --expose-gc`.

**Measurements.** Taken by this unit; that is its purpose.

**Control identifiers.** CONTROL_BUFFER names the negative-control class that allocates one
`Float64Array(128)` (1024 bytes) per instance; CONTROL_ARRAY names the known-allocation control
for the contract instrument. A later test is named for what it proves, never for these labels.

**Standing conditions.** Absorption lanes are live and read-only; no repository file is written by
this unit. Both benches dark; recorded.

## Unknowns

- Per-instance bytes for instance-assigned closures, prototype-getter lazy binding (before and
  after access), and plain prototype methods. The instrument reports them.
- Per-call heap and time for `createContract` against `new ContractCompiler` plus one `guard`
  read, on small, medium, and deep shapes. The instrument reports them.

## Scope

**Owned.** Scratchpad files only: `probe/zod-pattern.mjs`, `probe/contract-baseline.mjs`, and
their captured outputs.

**Shared (report-only).** none. **Off-limits.** every repository file.

**What asserts the state this change ends.** none — no change ships from this unit.

**Tools and limits.** Bash (node runs), Write into the scratchpad.

## Execution

The Orchestrator performs the assignment directly.

## Output

`probe/zod-pattern.out` and `probe/contract-baseline.out` in the scratchpad, plus a distilled
report at `tmp/units/probe-baseline-report.md` written in the same action that commits campaign
artifacts. Bytes-per-instance and per-call medians, each beside its control's reading.

## Deviation contract

Stop and report when a control fails to fail — an instrument whose control reports no difference
has measured nothing and its readings are not used.

## Acceptance criteria

1. CONTROL_BUFFER reports near 1024 bytes per instance more than its baseline; a reading under
   half or over double that stops the unit.
2. CONTROL_ARRAY reports within a factor of two of its computed expectation.
3. Every reported number carries the run that produced it.

## Review evidence

The exact instrument scripts and their captured outputs, retained under
`.orkestrel/contract/` at acceptance.
