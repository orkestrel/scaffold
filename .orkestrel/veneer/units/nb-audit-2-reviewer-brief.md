# Audit round 2 — NAVBAR (`nb`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict, the family record, and the NAV precedent. The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `nb-audit-2-claims.md`; `nb-2.diff`, `nb-2-status.txt`, `nb-shared-2.patch`, `nb-offlimits-2.patch`, `nb-retirement-2.patch`, `b-collapse-nb-report-2.md`, `nb-brief-2.md`, the round-1 record `nb.diff`, `nb-shared.patch`, `b-collapse-nb-report.md`, `nb-audit-verdict.md`, `nb-audit-objective-verdict.md`, `nb-audit-subjective-verdict.md`, `nb-audit-checker-verdict.md`, `b-collapse-family.md`, and `nb-instruments-2/`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md` (R1 to R19, the NAVBAR row, R2, R3, R10, R16); the worktree `/home/user/veneer-nb` (the owned files over `a658879`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8, and `git -C /home/user/veneer-nb show a658879:<path>` reads any base file); Veneer `main` at `/home/user/veneer` has moved past `a658879`, so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 3 (the class specimen's surface and its reason sentences), 4, 5 (every rewrite and the token-noun sweep), and 8 (the law, the report, and the ruling on the three inline loops under `.claude/rules/tests.md`); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so. The unit was written by `opus` on Opus 5.5 in both rounds; attack the wording your own lane prescribed in round 1 as hard as the rest.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
