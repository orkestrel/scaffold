# Audit round 1 — FOCUS-FRAME (`ff`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the placements, the ring and crop readings, the capture-drive fixes, and the P2 ruling against the portfolio verdict's P1, P2, and P3 rows, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `ff-audit-claims.md`; `ff.diff`, `ff-status.txt`, `ff-shared.patch`, `b-focus-frame-report.md`, `ff-instruments/` (`ff-mutations.log.txt`, the `ff-baseline/` and `ff-final/` frames and manifests, the probes under `ff-probes/` with their `ff-out-*` readings, the `ff-capture-final4-*` logs, `ff-guides.log.txt`, and the gate logs), and the frames under `/home/user/veneer-ff/tmp/units/ff-final/` and `/home/user/veneer-ff/tmp/capture/states/` (every scenario in the report's P1 table, and `vertical-group` and `check-group-focus`, at `dark-1280` and `light-390`); the portfolio verdict `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md` (rows P1, P2, and P3) with the ring lens return `pv-focus-lenses.json`, the brief `b-focus-frame-brief.md`, the page-frame note `pf-design-verdict.md` (R7), the verify verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md` (V1), and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-ff` (the owned files over `e4a6d7c`; read them, never edit them; `git -C /home/user/veneer-ff show e4a6d7c:<path>` reads any base file, including the base focus placements in `tests/app/browser/integration.test.ts`, the `nav-underline-focus` case there (the lift pattern), the `FrameManager` class in `tests/setupBrowser.ts`, and the release stylesheet `node_modules/bootstrap/dist/css/bootstrap.css`; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 2, 6, and 7 (open every before and after frame the report names and rule whether each shows its ring whole; the P2 ruling), and the § Tests sentences; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
