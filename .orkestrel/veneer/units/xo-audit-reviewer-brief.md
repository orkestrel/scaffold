# Audit round 1 — CLOSE-OUT (`xo`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, the retired deferral, the heading function, the derived and frozen case populations, the ledger assertion, the region order, and the prose against the brief, guide voice, and design fit. The objective lane runs blind beside you on GPT-6 Astra, and the checker on Sonnet.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,names,typescript,architecture,patterns,documentation,writing,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `xo-audit-claims.md`; `xo.diff`, `xo-status.txt`, `xo-shared.patch`, `xo-unscoped.patch`, `b-close-out-report.md`, and `xo-instruments/` (`xo-mutations.log.txt` and every `xo-mutation-*` log, the `xo-red-*` and `xo-green-*` logs, `xo-byte-equality.log.txt` and `xo-dist-base.sha256.txt`, `xo-ledger-obligation-key.log.txt`, the `xo-gate-*` and `xo-scratch-*` logs, `xo-field-scan.py` with its readings, and the instruments beside them); the brief `b-close-out-brief.md`, the Veneer `ROADMAP.md` § Carriers rows naming CLOSE-OUT (read at `ec98064`), the B-MODAL design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md` (its CLOSE-OUT row), and `w2-w3-note-1.md` and `w2-w3-note-2.md`; the worktree `/home/user/veneer-xo` (the owned files over `ec98064`; read them, never edit them; `git -C /home/user/veneer-xo show ec98064:<path>` reads any base file, including the base `tests/setupStyles.ts`, `src/styles/_mixins.scss` and its `breakpoint` functions, the base `CarouselSection.test.ts` and `ToastSection.test.ts`, and the base `tests/guides.test.ts`; `node_modules/bootstrap/` there is Bootstrap 5.3.8). Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 3 (the function's name and placement), 6 (the premise ruling), 7 (the order rule and the regions it moves), and 8 (the prose); rule every other claim too, and rule the Orchestrator's given rulings wrong where the evidence says so.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
