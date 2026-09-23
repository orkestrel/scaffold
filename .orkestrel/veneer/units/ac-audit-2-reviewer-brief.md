# Audit round 2 — ACCORDION (`ac`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict, the family record, and the NAV precedent. The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `ac-audit-2-claims.md`; `ac-2.diff`, `ac-2-status.txt`, `ac-shared-2.patch`, `b-collapse-ac-report-2.md`, `ac-brief-2.md`, round 1's `ac.diff`, `ac-status.txt`, `ac-shared.patch`, `b-collapse-ac-report.md`, `b-collapse-ac-brief.md`, and `ac-audit-verdict.md` (with `ac-audit-objective-verdict.md`, `ac-audit-subjective-verdict.md`, and `ac-audit-checker-verdict.md` beside it), `b-collapse-family.md`, the NAV precedent `b-collapse-nv-report-2.md`, and `ac-instruments/` and `ac-instruments-2/`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-design-verdict.md` (R1 to R19, the ACCORDION row, R3); the worktree `/home/user/veneer-ac` (the owned files over `a658879`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8, and `git -C /home/user/veneer-ac show a658879:<path>` reads any base file); Veneer `main` at `/home/user/veneer` has moved past `a658879`, so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 3 (the header level's reason in the doc block), 4 (the `Accordion base` name across the record), 5 (every ruled guide sentence against the ruling's wording and the token-noun rule, the reworded rows), and 6 (the comments' wording); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
