# Audit round 2 — UTIL-DISPLAY (`ud`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, in addition to the two lanes, never in place of one.

## Objective

Verdicts on claims 1, 4, 7, and 8 of the claims file by reading alone: file lists and status, the patch's file set, index lines, and removals against round 1's patch, the retained logs' digests and result lines against the report, the `CaptureStem` hunk against round 1, the count law, the banned-term rows, and the token nouns.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `ud-audit-2-claims.md`; `ud-2.diff`, `ud-2-status.txt`, `ud-shared-2.patch`, `b-utilities-ud-report-2.md`, `ud-brief-2.md`, round 1's `ud.diff`, `ud-status.txt`, `ud-shared.patch`, `b-utilities-ud-report.md`, `b-utilities-ud-brief.md`, and `ud-audit-verdict.md` (with `ud-audit-objective-verdict.md`, `ud-audit-subjective-verdict.md`, and `ud-audit-checker-verdict.md` beside it), `b-utilities-family.md`, the UTIL-SPACER precedent `b-utilities-us-report-3.md` and `us-shared-3.patch`, and `ud-instruments/` and `ud-instruments-2/` and `ud-instruments-2/`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`; the worktree `/home/user/veneer-ud` (the owned files over `e4e6a40`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8, and `git -C /home/user/veneer-ud show e4e6a40:<path>` reads any base file); Veneer `main` at `/home/user/veneer` has moved past `e4e6a40` (the disclosure and ALERT landings), so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 4, 7, and 8 only — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; the counts the report states, listed; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Acceptance criteria

Each named claim carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
