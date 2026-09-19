# Unit roughnotes-integration-preparation — Correct comparison precedence

## Role and engine

builder on native Terra, successor to canonical tmp/units/roughnotes-integration-preparation-brief-2.md. Read it and the original brief; their complete authority, ownership, and acceptance contract stays binding.

## Objective

Correct the false status refusal and demonstrate the actual preflight without creating backup or staging.

## Context

**Evidence.** Root executed prepare-2.ps1, tool3af54b exit1: Original status paths differ from the measured allowlist. Root then printed expected file and actual porcelain status: they visibly match; Test-Path scratch/backup returned False. The comparison in Require-Paths is `if (($Actual | Sort-Object) -join "`n" -cne ($Expected | Sort-Object) -join "`n")`. It lacks parentheses around each complete joined operand. Report-2 claimed synthetic extra-row refusal, but did not establish equal-row acceptance.

**Law.** Same AGENTS/orchestration/portability/quality/writing/guide instructions as original. Skill:none.

**Installed primitives.** Existing Git/PowerShell only.

**Host.** Same Windows roots and unchanged baseline.

**Measurements.** Original source/index remain unchanged; no backup or real staging ran.

**Control identifiers.** Equal-array acceptance and extra-row refusal through actual Require-Paths; actual read-only preflight using -Check.

**Standing conditions.** Preserve prepare.ps1, prepare-2.ps1, reports, and control outputs unchanged. Canonical retention writer is active; write only this external scratch.

## Unknowns

None. If the parenthesized operands still differ, report exact differing rows and byte values; do not change expected truth to make it pass.

## Scope

**Owned.** prepare-3.ps1, report-3.md, evidence/successor-3/ only.

**Shared (report-only).** Earlier scripts, original/recovery trees and index, expected files.

**Off-limits.** Actual preparation/staging, source edits, canonical tree writes, all commit/merge/install/delete actions.

**What asserts the state this change ends.** The false-refusing status comparison stops a valid preparation.

**Tools and limits.** Scratch authorship and read-only controls; no delegates.

## Execution

Perform directly and spawn nothing. Copy predecessor to prepare-3.ps1. Parenthesize each complete joined operand in Require-Paths: compare (($Actual | Sort-Object) -join "`n") against (($Expected | Sort-Object) -join "`n"). Add -Check that runs every production preflight through the exclusive backup-destination guard, then returns without creating anything. Use a distinct successor scratch control destination. Run same-array acceptance before extra-row refusal through the actual comparator; run prepare-3.ps1 -Check and record its native exit. Do not run real preparation.

## Output

Return effective successor pair, actual diff and exact equal/extra/native-failure/real-preflight readings.

## Deviation contract

Use original protocol. Stop on real drift; no bypass of expected status.

## Acceptance criteria

- Equal complete status passes and additional row fails.
- Actual -Check passes without backup or source/index writes.
- Original preservation and bounded staging behavior remain unchanged.

**Observations, not criteria.** Root later performs the actual preparation.

## Review evidence

Retain root's false-refusal as predecessor evidence; provide code delta and actual controls.
