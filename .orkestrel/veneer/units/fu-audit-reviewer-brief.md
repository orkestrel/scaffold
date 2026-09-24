# Audit round 1 — UTIL-FRAMES (`fu`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the specimens, the driven scenarios, the frames, and § Showcase against the portfolio verdict's P17 and P18 rows, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `fu-audit-claims.md`; `fu.diff`, `fu-status.txt`, `fu-shared.patch`, `b-util-frames-report.md`, `fu-instruments/` (`fu-mutations.log.txt`, `fu-mutate.sh`, `fu-mutate.py`, `fu-hover-reach.log.txt`, the `fu-red-*`, `fu-gate-*`, `fu-capture-*`, and `fu-scratch-*` logs, and the dropped P9 logs under `fu-p9-dropped/`), and the frames under `/home/user/veneer-fu/tmp/capture/states/` (every scenario the report lists under Frames, at `light-1280` and `dark-390`); the portfolio verdict `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md` (rows P17 and P18; P9 dropped from this unit) with the lens returns `pv-utilities-lenses.json`, the brief `b-util-frames-brief.md`, the page-frame note `pf-design-verdict.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-fu` (the owned files over `cf5e447`; read them, never edit them; `git -C /home/user/veneer-fu show cf5e447:<path>` reads any base file, including the base utility specimen tables in `app/browser/constants.ts`, the base registry in `tests/setup.ts` and its mode-word refusal in `tests/setup.test.ts`, the `nav-underline-focus` case in `tests/app/browser/integration.test.ts` (the lift pattern), and `app/browser/Showcase.ts` (the mount order); `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 2, 3, 4, 6, and 7 (open every frame the report names and rule whether it shows the state it closes; the specimens' fit; the § Showcase prose against the mount order); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
