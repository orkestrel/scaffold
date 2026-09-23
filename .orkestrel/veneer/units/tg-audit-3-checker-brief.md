# Audit round 3 — TOGGLES (`tg`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra; no subjective lane runs on this mechanical round.

## Objective

Verdicts on claims 1, 2, 4, and 8 of the claims file by reading alone: file lists and status, the patch's file set, index lines, and round-to-round deltas against round 2's patch and diff, the guide and constants sentences against the brief, the TSDoc and comment texts against the brief, the count law, the banned-term rows, and the token nouns. Where a clause needs a command you cannot run (a hash, an apply check), rule the sub-clause UNRESOLVED and name the command; the Orchestrator takes that reading.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `tg-audit-3-claims.md`; `tg-3.diff`, `tg-3-status.txt`, `tg-shared-3.patch`, `b-collapse-tg-report-3.md`, `tg-brief-3.md`, `tg-audit-2-verdict.md`, the round-2 record `tg-2.diff`, `tg-2-status.txt`, `tg-shared-2.patch`, and `b-collapse-tg-report-2.md`, and `tg-instruments-3/`; the worktree `/home/user/veneer-tg` (the owned files over `a658879`; read them, never edit them); Veneer `main` at `/home/user/veneer` has moved past `a658879`, so do not read the base there. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 2, 4, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
