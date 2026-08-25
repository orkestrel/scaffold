# Unit W3-FIX — adopt the W3 audit prescriptions

## Role and engine

`implementer` on Claude Opus 5, native subagent.

## Objective

Adopt every prescription of the W3 audit verdict in
`/home/user/orkestrel/process/tmp/codex/w3-audit-last.md`, verbatim, in one merged case.

## Context

**Evidence.** The verdict (read it first). The subject file:
`tests/src/server/ProcessManager.test.ts` — the strengthened case at `:154-215` and the sibling
case at `:263-321`. The audit's prescriptions:
1. Assert the recorded terminal pair represents a spawned child: non-negative `code` or non-null
   `signal`; a negative spawn-fault code and a `{ code: null, signal: null }` pair must fail.
2. Assert `registered.count` immediately after the control's `covered.destroy()`, before any wait
   on the refused recorder, so a broken hook and an absent child fail at different lines.
3. (Covered by 1.)
5. Merge the two cases into one carrying: the `protocol` refusal, the empty registry, the
   spawn-evidence terminal pair, the barrier-order assertion the sibling owns, and the
   registered-child control. Delete the sibling's now-redundant case and its marker cleanup.
6. Give the merged case an explicit timeout larger than its condition budget (the landed pairing:
   budget 5000, timeout 15000).

**Law.** The vendored `.claude/rules/tests.md` and `writing.md`.

**Host.** POSIX bash at `/home/user/orkestrel/process`; children spawn normally.

**Measurements.** Scoped `ProcessManager.test.ts` run green at HEAD (14 passed).

**Control identifiers.** The spawn-suppression mutation from the W3 report (its exact mutation is
described in `tmp/units/w3-report.md` § The mutation control). A second control for claim 1: a
mutation making the child's terminal pair read as a spawn fault must also fail — derive it as the
audit describes and report its failing line.

**Standing conditions.** none.

## Unknowns

Whether the sibling's barrier-order assertion needs the recorder snapshot before or after the
merge's wait — settle from the sibling's own comment and record it.

## Scope

**Owned.** `tests/src/server/ProcessManager.test.ts` only.

**Off-limits.** Everything else, `src/**` included (mutations run and revert, never commit).

**Tools and limits.** Read, Grep, Glob, Edit, Bash scoped to the single-file vitest run. No git
state changes, no commit.

## Execution

A native subagent: perform the assignment directly and spawn nothing beyond what the tests spawn.

## Output

Write `/home/user/orkestrel/process/tmp/units/w3-fix-report.md`: the merged case's shape, both
mutation controls' failing lines with reversion evidence, validation. Return the same content as
your final message.

## Deviation contract

Stop and report if the merge loses an asserted property the audit's claim 5 says survives.

## Acceptance criteria

1. Scoped `ProcessManager.test.ts` run green.
2. Both mutation controls reported red at named lines and reverted.
3. One case where two overlapping cases stood; explicit timeout paired with the budget.

**Observations, not criteria.** The whole `test:src` is the Orchestrator's run after you exit.

## Review evidence

The Orchestrator captures the diff; adoption is verbatim, so the round closes on the mutation
controls per the quality rule.
