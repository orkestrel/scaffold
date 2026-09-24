# Audit round 1 — BCF (`bcf`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the specimens, the driven scenarios, the frames, and the guide against the verify verdict's rows, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{tests,browser,styles,names,typescript,documentation,writing,architecture,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `bcf-audit-claims.md`; `bcf.diff`, `bcf-status.txt`, `bcf-shared.patch`, `b-collapse-bcf-report.md`, `bcf-instruments/` (`bcf-mutations.log.txt`, `bcf-mutate.py`, the `bcf-mutation-*.log.txt` and `bcf-mutate-*.out.txt` logs, the V2 probe logs and instruments, the `bcf-v14-*` readings, `bcf-red-sections.log.txt`, `bcf-green-sections.log.txt`, `bcf-gates.sh` and `bcf-gates.log.txt`, `bcf-capture.sh` and the `bcf-capture-*.log.txt` logs, and `bcf-guide-searches.txt`), and the frames under `/home/user/veneer-bcf/tmp/capture/states/` (the `navbar-scroll`, `navbar-inverted`, `navbar-inverted-class`, `nav-tabs`, `dropdown-*`, `accordion-last-expanded`, `navbar-with-open-menu`, `nav-underline-hover`, and `nav-underline-focus` frames at each variant); the verify verdict `/home/user/scaffold/.orkestrel/veneer/b-collapse-verify-verdict.md` (rows V2 to V6, V14, and V18) with the lens returns `bc-verify-lenses.json` and `bc-verify-lenses-2.json`, the brief `b-collapse-bcf-brief.md`, the page-frame note `pf-design-verdict.md`, and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-bcf` (the owned files over `dc92a09`; read them, never edit them; `git -C /home/user/veneer-bcf show dc92a09:<path>` reads any base file, including the base specimen tables in `app/browser/constants.ts`, the base registry in `tests/setup.ts`, and the `dropdown-menu-hover` and `dropdown-menu-focus` scenarios in `tests/app/browser/integration.test.ts`; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 2 to 5 and 8 (open every frame the report names and rule whether it shows the row it closes; the specimens' and labels' fit), and the guide sentences; rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
