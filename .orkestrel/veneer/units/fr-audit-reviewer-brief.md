# Audit round 1 — FORMS-FRAMES (`fr`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the specimens, the driven scenarios, the frames, and the guide against the portfolio verdict's P10 and P15 rows, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,architecture,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `fr-audit-claims.md`; `fr.diff`, `fr-status.txt`, `fr-shared.patch`, `b-forms-frames-report.md`, `fr-instruments/` (`fr-mutations.log.txt`, `fr-mutate.sh`, `fr-mutate-scratch.sh`, `fr-p10-readings.log.txt`, the `fr-p10-red` and `fr-p10-green` logs, the `fr-sections-red` and `fr-sections-green` logs, `fr-journey-red.log.txt`, the `fr-gate-*` logs, the `fr-capture-*-final` logs, `fr-conformance.log.txt`, and `fr-cases.ts.txt`), and the frames under `/home/user/veneer-fr/tmp/capture/states/` (`form-check-switch-focus`, `form-check-box-active`, `range-active`, `form-control-file-hover`, `form-floating-empty-textarea-focus`, `input-group-buttons-focus`, `valid-select-focus`, `invalid-select-focus`, `valid-check-focus`, `invalid-check-focus`, and the resting specimens the report names, each at `light-1280` and `dark-390`); the portfolio verdict `/home/user/scaffold/.orkestrel/veneer/b-portfolio-verify-verdict.md` (rows P10 and P15) with the lens returns `pv-forms-lenses.json`, the brief `b-forms-frames-brief.md`, the page-frame note `pf-design-verdict.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-fr` (the owned files over `e4a6d7c`; read them, never edit them; `git -C /home/user/veneer-fr show e4a6d7c:<path>` reads any base file, including the base forms specimen tables in `app/browser/constants.ts`, the base registry in `tests/setup.ts`, the `nav-underline-focus` case in `tests/app/browser/integration.test.ts` (the lift pattern), and the installed `driveHold` and `traverseAccessible` functions (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`); `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 3, 5, 6, and 8 (open every frame the report names and rule whether it shows the state it closes; the specimens' labels and fit), and the guide sentences; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
