# Audit round 1 — ALERT (`al`): subjective lane

## Role and engine

`reviewer` on Opus 5.5, holding the **subjective** lane: shape, naming, specimen and section ergonomics, guide voice, and design fit against the design verdict, the terrain, and the sibling sections (the Badge, Close, and Link sections are the nearest precedents).

## Objective

Per-claim verdicts on every claim in the claims file from the subjective lane's perspective, with the mutation named before any claim about a proof is confirmed.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only: the claims file `/home/user/scaffold/.orkestrel/veneer/units/al-audit-claims.md`; beside it `al.diff`, `al-status.txt`, `al-shared.patch`, `b-modal-al-report.md`, `b-modal-al-brief.md`, `al-instruments/` (with `logs/` and `mutations/`), `b-modal-terrain-report.md`, and `dd-audit-verdict.md` (the R8 sentence ruling); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`; the worktree `/home/user/veneer-al` (the owned files over `c3ac297`; read them, never edit them; its `node_modules/bootstrap/` is Bootstrap 5.3.8, and `git -C /home/user/veneer-al show c3ac297:<path>` reads any base file); Veneer `main` at `/home/user/veneer` has moved past `c3ac297` (the UTIL-SPACER and CONDITIONS landings), so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under claim 8; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

As stated under Context. Focus: claims 4 (the specimens' shape, the `role="alert"` choice on a ramp of live regions, the copy, the names), 7 (the guide section's voice and placement, the R17 test on every sentence, the plugin row), and 8 (nouns, counts, terms); rule 1, 2, 3, 5, and 6 too.

## Acceptance criteria

Every claim carries a verdict with evidence; every confirmed proof claim names its mutation; the terminal line is present.
