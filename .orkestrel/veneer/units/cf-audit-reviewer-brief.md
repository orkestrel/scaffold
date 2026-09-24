# Audit round 1 — FADE (`cf`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict, the family record, and the base collapse partial and region it sits beside. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `cf-audit-claims.md`; `cf.diff`, `cf-status.txt`, `cf-shared.patch`, `b-cross-cf-report.md`, `b-cross-cf-brief.md`, `cf-instruments/` (`cf-offlimits.patch`, `cf-mutations.log.txt`, `cf-mutations.sh`, `cf-mutations-2.sh`, the `cf-red-*`, `cf-nopartial-*`, `cf-base-*`, and `cf-green-*` logs, `cf-gates.sh` and the `cf-gate-*` logs, `cf-setup-offlimits.log.txt`, `cf-ladder.test.ts.txt` and `cf-ladder.log.txt`, and the `cf-guide*.py` scripts); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` (rulings X1 and X5 and § Family record), the Orchestrator's page-frame note `pf-design-verdict.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-cf` (the owned files over `42fd88e`; read them, never edit them; `git -C /home/user/veneer-cf show 42fd88e:<path>` reads any base file, including the base `src/styles/components/_collapse.scss` and its proof, the `transition` mixin in `src/styles/_mixins.scss`, and the Collapse region and its section proof; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 4 (the region, its specimens, and the hidden body's treatment), 6 (every added and rewritten guide sentence against what ships, and the writing rule), and 7 (the tables' names and shape); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
