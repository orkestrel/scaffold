# Audit round 1 — ALERT (`al`): checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, in addition to the two lanes, never in place of one.

## Objective

Verdicts on claims 1, 5, 6, and 8 of the claims file by reading alone: file lists and status, the patch's file set and its removed lines, the registry rows, the table exports and the moved close entry, the ledger rows against the report's gate reading, the report's commands and result lines, the count law, the banned-term rows, and the token nouns.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,browser,writing,documentation,typescript,names,quality}.md`; the falsification law in `/home/user/scaffold/.claude/rules/quality.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references (the verdict shape). Evidence, all read-only: the claims file `/home/user/scaffold/.orkestrel/veneer/units/al-audit-claims.md`; beside it `al.diff`, `al-status.txt`, `al-shared.patch`, `b-modal-al-report.md`, `b-modal-al-brief.md`, `al-instruments/` (with `logs/` and `mutations/`), `b-modal-terrain-report.md`, and `dd-audit-verdict.md` (the R8 sentence ruling); the design verdict `/home/user/scaffold/.orkestrel/veneer/b-modal-design-verdict.md`; the worktree `/home/user/veneer-al` (the owned files over `c3ac297`; read them, never edit them; its `node_modules/bootstrap/` is Bootstrap 5.3.8, and `git -C /home/user/veneer-al show c3ac297:<path>` reads any base file); Veneer `main` at `/home/user/veneer` has moved past `c3ac297` (the UTIL-SPACER and CONDITIONS landings), so read the base through `git show`, not the working tree. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths. Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts (CONFIRMED, BROKEN, UNRESOLVED, or NOT-EVIDENCED) each with `file:line` evidence and, for a claim about a proof, the mutation named and whether the assertions distinguish it; findings outside the claims to the BROKEN standard; the counts the report states, listed under claim 8; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.

## Scope

Read-only. No file is owned.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

As stated under Context, for claims 1, 5, 6, and 8 only.

## Acceptance criteria

Each of the four claims carries a verdict with evidence; the counts the report states are listed; the terminal line is present.
