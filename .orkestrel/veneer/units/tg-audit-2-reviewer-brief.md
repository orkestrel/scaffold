# Audit round 2 — TOGGLES (`tg`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict, the family record, and the DROPDOWN precedent. The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `tg-audit-2-claims.md`; `tg-2.diff`, `tg-2-status.txt`, `tg-shared-2.patch`, `b-collapse-tg-report-2.md`, `tg-brief-2.md`, round 1's `tg.diff`, `tg-status.txt`, `tg-shared.patch`, `b-collapse-tg-report.md`, `b-collapse-tg-brief.md`, and `tg-audit-verdict.md` (with `tg-audit-objective-verdict.md`, `tg-audit-subjective-verdict.md`, and `tg-audit-checker-verdict.md` beside it), `b-collapse-family.md`, the DROPDOWN precedent `b-collapse-dd-report-2.md` where present, and `tg-instruments/` and `tg-instruments-2/` (each with `logs/`); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md` (R1 to R19, the TOGGLES row); the worktree `/home/user/veneer-tg` (the owned files over `a658879`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8, and `git -C /home/user/veneer-tg show a658879:<path>` reads any base file); Veneer `main` at `/home/user/veneer` has moved past `a658879`, so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 2 (every ruled guide sentence against the ruling's wording and the token-noun rule), 3 (the doc blocks and comments, the narrowed caret limit, the `dropdown-menu-end` sentence), and 4 (the constants' shapes, names, placement, and TSDoc against `.claude/rules/tests.md` and the precedents; the derived caret table's home); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
