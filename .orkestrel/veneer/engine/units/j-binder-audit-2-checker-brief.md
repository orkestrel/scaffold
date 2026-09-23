# J-BINDER audit round 2 — the checker's brief (the mechanisms under the landed contracts)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-BINDER unit's round 2 in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (round 1 `402c7db`, `main` merged as `cea3359`), uncommitted. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-2.diff` and status `j-binder-2-status.txt`; the brief `j-binder-brief-2.md` (B1 to B8 with B7a, § Scope, § Acceptance criteria); the report `j-binder-report-2.md`; the worktree's `src/browser/*.ts`, `tests/src/browser/*.ts`, and `guides/veneer.md`; the Orchestrator's own run `j-binder-gates-2.log.txt`; the retained instruments `j-binder2-red.log.txt`, `j-binder2-mutations.json`, `j-binder2-mutations-2.json`, `j-binder2-mutation-results.json`, `j-binder2-mutation-results-2.json`; the patches `j-binder2-app.diff` and `j-binder2-roadmap.diff`.

## Claims

Rule on claims 6 and 8 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims-2.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the brief's owned files (the guide, the `src/browser` files with the two renames, the `tests/src/browser` files) and no off-limits file; every case title the report's red-first record names appears in `j-binder2-red.log.txt` as failed and in the worktree's test files; every row of the report's mutation table has a matching entry in a mutations file and a result entry naming the reddened case; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration outside an anonymous callback; every added interface property and public return collection is `readonly`; `grep -rn "isHost\|from './Snapshot\|class Snapshot\|BUTTON_ACTIVE\|BUTTON_SELECTOR\b\|BUTTON_PRESSED\|COLOR_MODE_ATTRIBUTE\b\|CONFIG_ATTRIBUTE\|LINK_ATTRIBUTE\|generateId\|\.bs\.\|hidePrevented" src/browser tests/src/browser` returns no hit except a test fixture string; `src/browser/index.ts` exports exactly the names `tests/src/browser/index.test.ts` asserts; the guide's § Surface has one row per barrel export and none other; every changed Summary cell equals its description paragraph; the guide's `### Vocabulary` table lists the Button and ColorMode defaults equal to the constants; every added summary opens with a third-person `-s` verb and does not name its symbol; no term `writing.md` § Substitutions bans unconditionally appears in the added prose; the two renames are the only new paths; the report's rulings each name a bounding rule; `j-binder2-app.diff` and `j-binder2-roadmap.diff` apply cleanly to the worktree's off-limits files (read them against the files; do not apply them). A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6 and E10 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 6 and 8 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
