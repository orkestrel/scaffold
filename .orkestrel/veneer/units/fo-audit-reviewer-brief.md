# Audit round 1 — OVERLAY-FRAMES (`fo`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the specimens, the driven scenarios, the frames, the carousel proof, and the guide against the portfolio verdict's P11, P12, and P16 rows, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `fo-audit-claims.md`; `fo.diff`, `fo-status.txt`, `fo-shared.patch`, `b-overlay-frames-report.md`, `fo-instruments/` (`fo-mutations.log.txt`, `fo-mutate.py`, `fo-plant-carousel.py`, `fo-chevrons.py` and its `fo-chevrons-*` logs, `fo-probe-readings.log.txt`, the probe copies `fo-strip-probe.test.ts.txt`, `fo-hover-probe.test.ts.txt`, and `fo-reach-probe.test.ts.txt`, and the gate and capture logs), and the frames under `/home/user/veneer-fo/tmp/capture/states/` (`captioned-carousel`, `fading-carousel`, `inverted-carousel`, `advancing-carousel`, `captioned-carousel-hover`, `fading-carousel-hover`, `fading-carousel-focus`, and `plain-alert`, each at `light-1280` and `dark-390`); the portfolio verdict `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md` (rows P11, P12, and P16) with the lens returns `pv-overlays-lenses.json`, the brief `b-overlay-frames-brief.md`, the verify verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md` (V7), the page-frame note `pf-design-verdict.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-fo` (the owned files over `cf5e447`; read them, never edit them; `git -C /home/user/veneer-fo show cf5e447:<path>` reads any base file, including the base overlay specimen tables in `app/browser/constants.ts`, the base registry in `tests/setup.ts`, the `nav-underline-focus` case in `tests/app/browser/integration.test.ts` (the lift pattern), the base `CarouselSection.test.ts`, and the release markup in `node_modules/bootstrap/`; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 2, 3, 5, 6, 7, and 8 (open every frame the report names and rule whether it shows the state it closes; the specimens' fit), and the guide sentences; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
