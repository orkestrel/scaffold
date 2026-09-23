# Audit round 2 — UTIL-DISPLAY (`ud`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict, the family record, and the UTIL-SPACER precedent. The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `ud-audit-2-claims.md`; `ud-2.diff`, `ud-2-status.txt`, `ud-shared-2.patch`, `b-utilities-ud-report-2.md`, `ud-brief-2.md`, round 1's `ud.diff`, `ud-status.txt`, `ud-shared.patch`, `b-utilities-ud-report.md`, `b-utilities-ud-brief.md`, and `ud-audit-verdict.md` (with `ud-audit-objective-verdict.md`, `ud-audit-subjective-verdict.md`, and `ud-audit-checker-verdict.md` beside it), `b-utilities-family.md`, the UTIL-SPACER precedent `b-utilities-us-report-3.md` and `us-shared-3.patch`, and `ud-instruments/` and `ud-instruments-2/` and `ud-instruments-2/`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-utilities-design-verdict.md`; the worktree `/home/user/veneer-ud` (the owned files over `e4e6a40`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8, and `git -C /home/user/veneer-ud show e4e6a40:<path>` reads any base file); Veneer `main` at `/home/user/veneer` has moved past `e4e6a40` (the disclosure and ALERT landings), so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 3 (the label convention and the doc comment's statement of it, the centering assertion's form), 5 (every ruled guide sentence against the ruling's exact wording and the token-noun rule), and 6 (the constants' shapes, names, and TSDoc against `.claude/rules/tests.md` and the `InputGroupCase` precedent, and the local `RESTING_DISPLAY` scalar ruling); rule every other claim too.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
