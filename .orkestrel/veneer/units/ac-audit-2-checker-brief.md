# Audit round 2 — ACCORDION (`ac`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, in addition to the two lanes, never in place of one.

## Objective

Verdicts on claims 1, 7, and 8 of the claims file by reading alone: file lists and status, the patch's file set, index lines, and carried hunks against round 1's patch, the retained gate logs' result lines against the report, the count law, the banned-term rows, and the token nouns.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `ac-audit-2-claims.md`; `ac-2.diff`, `ac-2-status.txt`, `ac-shared-2.patch`, `b-collapse-ac-report-2.md`, `ac-brief-2.md`, round 1's `ac.diff`, `ac-status.txt`, `ac-shared.patch`, `b-collapse-ac-report.md`, `b-collapse-ac-brief.md`, and `ac-audit-verdict.md` (with `ac-audit-objective-verdict.md`, `ac-audit-subjective-verdict.md`, and `ac-audit-checker-verdict.md` beside it), `b-collapse-family.md`, and `ac-instruments/` and `ac-instruments-2/`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md`; the worktree `/home/user/veneer-ac` (the owned files over `a658879`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8, and `git -C /home/user/veneer-ac show a658879:<path>` reads any base file); Veneer `main` at `/home/user/veneer` has moved past `a658879`, so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 7, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
