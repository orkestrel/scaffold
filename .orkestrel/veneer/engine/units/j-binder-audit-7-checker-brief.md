# J-BINDER audit round 7 — the checker's brief (the fix round on the round-6 findings)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-BINDER unit's round 7 in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (round 1 `402c7db`, `main` merged as `cea3359`), rounds 2 to 7 uncommitted. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-7.diff` and status `j-binder-7-status.txt`; the brief `j-binder-brief-7.md` (G1 to G5, § Scope as in brief 4, § Acceptance criteria); the report `j-binder-report-7.md`; the worktree's `src/browser/*.ts`, `tests/src/browser/*.ts`, `tests/setupBrowser.ts`, and `guides/veneer.md`; the Orchestrator's own run `j-binder-gates-7.log.txt`; the retained instruments `j-binder7-red.log.txt`, `j-binder7-mutations.json`, `j-binder7-mutation-results.json`, and the round-6 results `j-binder6-mutation-results.json` and `j-binder6-mutation-results-2.json`; the patches `j-binder4-setuptest.diff`, `j-binder2-app.diff`, `j-binder2-roadmap.diff`, `j-binder-patch-buttonsection.diff`.

## Claims

Rule on claims 1 (its mechanical clauses: the red reading against the red log, the case title present, the three `this.pressed` reads in `toggle` with no local across a step), 2 (its mechanical clauses: the case present with the assertions the claim names; the three G2 rows present with results naming that case), 4, and 5 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims-7.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the brief's owned files (the round-4 set) and no off-limits file; the red log's failed count is one and its title matches the G1 proof; every row of the report's mutation table has a matching entry in `j-binder7-mutations.json` (each name appearing once; there is no second list) and a result entry naming the reddened cases; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration outside an anonymous callback; every added interface property and public return collection is `readonly`; `grep -n "each restoration owns\|the snapshot that owns\|snapshot owns" src/browser/HostSnapshot.ts src/browser/types.ts guides/veneer.md` returns the class remark, the interface remark, the guide sentence, and the `#pending` comment and nothing else; `grep -n "await" guides/veneer.md` hits the rule paragraph; `grep -n "invocation" src/browser/HostSnapshot.ts src/browser/types.ts guides/veneer.md` returns no hit; `grep -rn "#held\|#restore\b\|AttributeNames\|CallRecording\b\|OPTION_PREFIX\|isHost\|from './Snapshot\|class Snapshot\|BUTTON_ACTIVE\|BUTTON_SELECTOR\b\|BUTTON_PRESSED\|COLOR_MODE_ATTRIBUTE\b\|CONFIG_ATTRIBUTE\|LINK_ATTRIBUTE\|generateId\|hidePrevented" src/browser tests/src/browser tests/setupBrowser.ts` returns no hit; `src/browser/index.ts` exports exactly the names `tests/src/browser/index.test.ts` asserts; the guide's § Surface has one row per barrel export and none other; every changed Summary and § Methods cell equals its description paragraph; no term `writing.md` § Substitutions bans unconditionally appears in the added prose; the report records the G2 proof's missing red-first reading as a departure; the report names the scratchpad instruments the Orchestrator retained as `j-binder7-<name>`. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6 and E10 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 1, 2, 4, and 5 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
