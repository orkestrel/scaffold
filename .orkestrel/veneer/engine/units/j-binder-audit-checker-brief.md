# J-BINDER audit — the checker's brief (round 1)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-BINDER unit's uncommitted change in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` on `unit/binder` (base `1868007`). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder.diff` and the actual status `j-binder-status.txt`; the brief `j-binder-brief.md` (its § Scope, § Acceptance criteria, and § Installed primitives); the report `j-binder-report.md`; the worktree's files; the Orchestrator's own runs `j-binder-gates.log.txt`.

## Claims

Rule on claims 8, 9, and 10 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-binder-audit-claims.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the brief's owned files (the two ColorMode files only in the prose bounds it names); no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `null` (outside a DOM API's own return), `public`, `protected`, `private`, parameter property, or default export in the added source; every class holds one class plus imports (`Registry.ts`, `Snapshot.ts`, `Button.ts`, `Delegate.ts`); no nested function declaration outside an anonymous callback passed as an argument; every added doc block's first sentence opens with a third-person `-s` verb and never names the symbol; every added export has a § Surface row and every removed export's row is gone (`grep -n "^export " src/browser/*.ts` against the guide's table); the `RegistryInterface` and `SnapshotInterface` § Methods tables match `Registry` and `Snapshot`'s members; no Bootstrap class token, attribute name, selector, or wire name appears as an inline literal in `Button.ts`, `Delegate.ts`, `helpers.ts`, or `validators.ts` (grep for `data-bs`, `active`, `aria-`, `toggle.vn`, `href`); the installed-primitive probe: no helper, guard, wait, or recorder the diff adds whose job an `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/core/index.d.ts`, `dist/src/browser/index.d.ts`) or `@orkestrel/contract` (`node_modules/@orkestrel/contract/dist/src/core/index.d.ts`) export does, `isHost` over `isInstance` being the one E10 already rules on; no term `writing.md` § Substitutions bans unconditionally in the added prose (the guide's `## Engine` section included); no new file outside the brief's owned set and no moved file; the report's "Rulings taken" list names a bounding rule per ruling. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `names.md`, `tests.md`, `documentation.md`, `writing.md`; E6, E9, E10 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 8, 9, and 10 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
