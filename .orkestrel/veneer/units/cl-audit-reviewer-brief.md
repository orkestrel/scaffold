# Audit round 1 — LEDGER (`cl`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, reader and row-type ergonomics, guide voice, and design fit against the design verdict, the family record, and the base readers they extend. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,architecture,patterns,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `cl-audit-claims.md`; `cl.diff`, `cl-status.txt`, `cl-shared.patch`, `b-cross-cl-report.md`, `b-cross-cl-brief.md`, `cl-instruments/` (`cl-mutations.log.txt`, `cl-mutate.py`, `cl-mutate-2.py`, `cl-mutate-swap.py`, the `cl-mutations-*.json` inputs and outputs, `cl-setup-red.log.txt`, `cl-setup-green.log.txt`, `cl-setup-baseline.log.txt`, `cl-scratch.sh`, `cl-gates.sh`, and the `cl-gate-first-*` and `cl-gate-final-*` logs); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` (rulings X1, X6, and X7 and § Family record), `oc-audit-verdict.md` claim 4 and `dr-audit-verdict.md` claim 3 (the findings this unit carries), and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-cl` (the owned files over `42fd88e`; read them, never edit them; `git -C /home/user/veneer-cl show 42fd88e:<path>` reads any base file, including the base `tests/setupServer.ts` with its `readCompatibility` and `readOracleInventory` functions and the `SheetReader` class, and the base `tests/conformance.test.ts` priority case; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 3 (the withheld-key ruling beside X1), 6 (every added guide sentence against what ships, and the writing rule), and 7 (the readers' and row types' names and shape beside the existing readers); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
