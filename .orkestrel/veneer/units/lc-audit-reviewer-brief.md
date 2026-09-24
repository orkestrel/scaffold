# Audit round 1 — LABEL (`lc`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the contrast functions and their names, the label and direction per role, the root color scheme, the proofs' shape, and the guide prose, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `lc-audit-claims.md`; `lc.diff`, `lc-status.txt`, `lc-shared.patch`, `b-label-lc-report.md`, and `lc-instruments/` (`lc-mutations.log.txt`, `lc-mutate.py`, the `lc-mutation-M*.log.txt` logs, `lc-red.sh` and the `lc-red-*.log.txt` logs, the `lc-green-*.log.txt` logs, the `lc-probe-*.log.txt` readings, `lc-compare.mjs` and the `lc-compare-*.log.txt` logs, `lc-base-index.css`, `lc-gates.sh`, `lc-gates.log.txt` and the `lc-gate-*.log.txt` logs, `lc-styles-final.log.txt`, `lc-theme-owned.patch` and `lc-theme-owned-check.log.txt`, `lc-journey-link.patch`, and `lc-ledger.py`); the design verdict `/home/user/scaffold/.orkestrel/veneer/label-contrast-design-verdict.md` (L1 to L9) and the two design proposals beside it (`label-contrast-design-planner-proposal.md`, `label-contrast-design-analyst-proposal.md`), THEME's verdicts `ct-audit-verdict.md` and `ct-audit-subjective-verdict.md` (F1 and F2), the brief `b-label-lc-brief.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-lc` (the owned files over `ac74459`; read them, never edit them; `git -C /home/user/veneer-lc show ac74459:<path>` reads any base file, including the base `src/styles/_tokens.scss`, `_theme.scss`, `_mixins.scss`, and `components/_button.scss`, the release functions `node_modules/bootstrap/scss/_functions.scss` (`color-contrast`) and `helpers/_colored-links.scss`, the release stylesheet `node_modules/bootstrap/dist/css/bootstrap.css`, and the build configuration `vite.config.ts` (its `cssMinify` setting); `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 3 (the direction and the named exceptions), 6 (the root scheme against its alternative, and the set of files the change makes false), and 7 (the function names, the comments, the guide prose against what ships, and the writing rule); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
