# Audit round 2 — ALERT (`al`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict, the terrain, and the sibling sections. The objective lane runs blind beside you on GPT-6 Astra.

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only, under `/home/user/scaffold/.orkestrel/veneer/units/`: the claims file `al-audit-2-claims.md`; `al-2.diff`, `al-2-status.txt`, `al-shared-2.patch`, `b-modal-al-report-2.md`, `al-brief-2.md`, `al-audit-verdict.md` (round 1's reconciliation, with its lane verdicts `al-audit-objective-verdict.md`, `al-audit-subjective-verdict.md`, and `al-audit-checker-verdict.md` beside it), round 1's `b-modal-al-report.md` and `al-shared.patch`, and `al-instruments-2/`; the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`; the terrain `b-modal-terrain-report.md`; the worktree `/home/user/veneer-al` (the owned files over `c3ac297`; read them, never edit them; `node_modules/bootstrap/` there is Bootstrap 5.3.8, and `git -C /home/user/veneer-al show c3ac297:<path>` reads any landing-base file); Veneer `main` at `/home/user/veneer` has moved past `c3ac297`, so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under the last claim; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`. Focus: claims 4 (the physical-direction prose at every site against the tree's own direction vocabulary), 5 (the R17 sentences and the `CLOSE_COPY` shape), 6 (the nouns and the comment), and 8; rule every other claim too.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
