# Audit round 2 — UTIL-PLACEMENT (`upl`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdicts, the family record, and the UTIL-SPACER precedent. The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `upl-audit-2-claims.md`; `upl-2.diff`, `upl-2-status.txt`, `upl-shared-2.patch`, `upl-unlisted-2.patch`, `b-utilities-upl-report-2.md`, `upl-brief-2.md`, round 1's `upl.diff`, `upl-status.txt`, `upl-shared.patch`, `upl-consumer.patch`, `b-utilities-upl-report.md`, `b-utilities-upl-brief.md`, and `upl-audit-verdict.md` (with `upl-audit-objective-verdict.md`, `upl-audit-subjective-verdict.md`, and `upl-audit-checker-verdict.md` beside it), `b-utilities-family.md`, the UTIL-SPACER precedent `b-utilities-us-report-3.md` and `us-shared-3.patch`, and `upl-instruments/` and `upl-instruments-2/`; the design verdicts `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md` and `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (M3, M4); the worktree `/home/user/veneer-upl` (the owned files over `e4e6a40`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8, and `git -C /home/user/veneer-upl show e4e6a40:<path>` reads any base file); Veneer `main` at `/home/user/veneer` has moved past `e4e6a40`, so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 4 (every ruled guide sentence against the ruling's wording and the token-noun rule), 5 (the constants' shapes, names, and TSDoc against `.claude/rules/tests.md` and the precedents; `PLACEMENT_CONTAINER` as one shape; the builder's name and signature), and 8 (the report's deviation records and bounded choices); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
