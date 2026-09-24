# Audit round 1 — THEME (`ct`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the dark roles, the role tiers, the link hover, the theme key and its ledger, the registry rule, and the Color modes section against the briefs and the release, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `ct-audit-claims.md`; `ct.diff`, `ct-status.txt`, `ct-shared.patch`, `ct-unscoped.patch`, `b-cross-ct-report.md`, and `ct-instruments/` (`ct-mutations.log.txt`, `ct-mutations-round-1.log.txt`, the `ct-mutation-*` logs and instruments, the `ct-red-*`, `ct-v13-red-theme.log.txt`, and `ct-fix-*` logs, `ct-gates.sh` and the `ct-gate-*` logs, the ledger print and dump, the X12 instruments and readings, the V11 and V13 probes and their logs, `ct-color.mjs.txt`, and `ct-rebuild.py`); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-cross-design-verdict.md` (X1, X2, X3, X11, X12), the verify verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md` (V10 to V12), the portfolio verdict `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md` (P4), the briefs `b-cross-ct-brief.md` and `b-cross-ct-brief-2.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-ct` (the owned files over `2bf1142`; read them, never edit them; `git -C /home/user/veneer-ct show 2bf1142:<path>` reads any base file, including the base `src/styles/_tokens.scss` and `_theme.scss`, the base `collectAdditions` function in `tests/setupServer.ts`, the release stylesheet `node_modules/bootstrap/dist/css/bootstrap.css`, and the base section classes under `app/browser/sections/`; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 4 (the literals and their comments), 7 (the section, its specimens, and its frame), and 8 (the prose, the repeated walk, and the V11 ruling); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
