# J-BINDER audit round 3 — the checker's brief (the fix round on the round-2 findings)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-BINDER unit's round 3 in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (round 1 `402c7db`, `main` merged as `cea3359`), rounds 2 and 3 uncommitted. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-3.diff` and status `j-binder-3-status.txt`; the brief `j-binder-brief-3.md` (C1 to C7, § Scope, § Acceptance criteria); the report `j-binder-report-3.md`; the worktree's `src/browser/*.ts`, `tests/src/browser/*.ts`, `tests/setupBrowser.ts`, and `guides/veneer.md`; the Orchestrator's own run `j-binder-gates-3.log.txt`; the retained instruments `j-binder3-red.log.txt`, `j-binder3-mutations.json`, `j-binder3-mutations-2.json`, `j-binder3-mutation-results.json`, `j-binder3-mutation-results-2.json`, `j-binder3-probe-results.json`, `j-binder3-probe-results-2.json`; the patches `j-binder3-setuptest.diff`, `j-binder2-app.diff`, `j-binder2-roadmap.diff`, `j-binder-patch-buttonsection.diff`.

## Claims

Rule on claims 5 and 6 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims-3.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the brief's owned files (the round-2 set plus `src/browser/types.ts`, for the C5 sentences and the C6 declarations alone, and `tests/setupBrowser.ts`, for the recorder alone) and no off-limits file; every case title the report's red-first record names appears in `j-binder3-red.log.txt` as failed and in the worktree's test files; every row of the report's mutation table has a matching entry in a mutations or probe file and a result entry naming the reddened case; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration outside an anonymous callback; every added interface property and public return collection is `readonly`; `grep -rn "OPTION_PREFIX\|isHost\|from './Snapshot\|class Snapshot\|BUTTON_ACTIVE\|BUTTON_SELECTOR\b\|BUTTON_PRESSED\|COLOR_MODE_ATTRIBUTE\b\|CONFIG_ATTRIBUTE\|LINK_ATTRIBUTE\|generateId\|\.bs\.\|hidePrevented\|#release(true\|#release(false" src/browser tests/src/browser tests/setupBrowser.ts` returns no hit except a test fixture string; `src/browser/index.ts` exports exactly the names `tests/src/browser/index.test.ts` asserts; the guide's § Surface has one row per barrel export and none other, with rows for `AttributeNames` and `ButtonVocabulary` and none for `OPTION_PREFIX`; every changed Summary cell equals its description paragraph; the guide's `### Vocabulary` table equals the constants; every added summary opens with a third-person `-s` verb and does not name its symbol; no term `writing.md` § Substitutions bans unconditionally appears in the added prose; the two renames are the only new paths; the report's rulings each name a bounding rule; the Orchestrator's apply check of `j-binder3-setuptest.diff` is recorded in the report's reading. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6 and E10 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 5 and 6 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
