# Audit round 1 — PASSIVE-FRAMES (`fp`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the specimens, the driven scenarios, the frames, and the guide against the portfolio verdict's P14 row, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `fp-audit-claims.md`; `fp.diff`, `fp-status.txt`, `fp-shared.patch`, `b-passive-frames-report.md`, `fp-instruments/` (`fp-mutations.log.txt`, `fp-mutate.py`, the `fp-red-*` and `fp-green-*` logs, the gate logs, `fp-capture.sh`, and the `fp-capture-*` logs), and the frames under `/home/user/veneer-fp/tmp/capture/states/` (every frame the report lists, at `light-1280` and `dark-390`); the portfolio verdict `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md` (row P14) with the lens returns `pv-passive-lenses.json`, the brief `b-passive-frames-brief.md`, the verify verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md` (V7), the page-frame note `pf-design-verdict.md`, FOCUS-FRAME's `auto`-outline finding in `b-focus-frame-report.md` (P2), and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-fp` (the owned files over `cf5e447`; read them, never edit them; `git -C /home/user/veneer-fp show cf5e447:<path>` reads any base file, including the base passive specimen tables in `app/browser/constants.ts`, the base registry in `tests/setup.ts` and its laws in `tests/setup.test.ts`, the `nav-underline-focus` case in `tests/app/browser/integration.test.ts` (the lift pattern), and the Button, Spinner, List group, and Placeholder partials under `src/styles/components/`; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 3, 4, 5, 6, and 8 (open every frame the report names and rule whether it shows the state it closes; the specimens' labels and fit), and the guide sentences; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
