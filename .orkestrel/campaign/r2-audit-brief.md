# Unit R2-AUDIT — objective audit of the ROADMAP reconciliation

## Role and engine

GPT-5.6 Sol, inside the journaled codex CLI, read-only. Perform the audit directly and spawn
nothing.

## Objective

Attempt to refute the following numbered claims about the uncommitted rewrite of
`/home/user/scaffold/ROADMAP.md` (diff: `git -C /home/user/scaffold diff -- ROADMAP.md`).
Per-claim verdicts with evidence, one terminal line.

## Context

- The writer's brief: `tmp/units/r2-brief.md` — its row rulings are the specification.
- The writer's report: `tmp/units/r2-report.md` — a claim under audit, not evidence.
- The evidence base: `.orkestrel/campaign/fleet-findings-matrix.md`, the reports under
  `.orkestrel/campaign/fleet/`, the audit records under `.orkestrel/campaign/test/`,
  `.orkestrel/campaign/probe/`, and the per-package unit records under `.orkestrel/campaign/`.
- Law: `AGENTS.md` § Writing, `.claude/rules/writing.md`.

## Claims

1. Every row the brief's close list names is absent from the rewritten file, and no other § 1
   row from the previous revision (`git show HEAD:ROADMAP.md`) was dropped.
2. The three `supervisor` rows and the `probe` mintty row are byte-identical to the previous
   revision, and § 2 is unchanged.
3. Every added row the brief names is present, and each one's factual content agrees with the
   evidence base — no added row states something its underlying report or verdict does not
   record, and none contradicts one.
4. The header's factual claims are true against the record: the campaign date, the published
   versions (scaffold 0.0.52, mcp 0.0.23, brief 0.0.6, probe 0.0.5), and the closed-row
   enumeration.
5. The rewritten prose carries no banned substitution-table term in a banned sense and no count
   of a growable set (a version, a date, a duration, or a measurement reported with its run is
   not a count).

## Scope

Read-only. No edits, no git state changes, no writes outside `tmp/codex/`.

## Output

Per-claim: `CONFIRMED` with evidence, or `BROKEN` with the exact line and the smallest correct
fix. Then exactly one terminal line: `AUDIT: PASS` or `AUDIT: FAIL`.
