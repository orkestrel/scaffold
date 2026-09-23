# J-TYPES audit round 2 — the checker's brief (the fix round)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-TYPES unit's fix round (round 2) in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (base `376d84a`), uncommitted on top of round 1's tree. Review evidence: the actual diff against the base `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-2.diff` (both rounds), the round-2 delta of the types file `j-types-2-types-delta.diff`, the actual status `j-types-2-status.txt`; the brief `j-types-brief-2.md` (its edits E1 to E10, § Scope, and § Acceptance criteria); the report `j-types-report-2.md`; the worktree's `src/browser/types.ts` and `guides/veneer.md`. The Orchestrator's own runs are `j-types-gates-2.log.txt` (the scoped checks, `test:guides`, `test:policy`) and `j-types-probe-2.log.txt` (the probe).

## Claims

Rule on claims 6, 7, 8, and 9 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims-2.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): every edit E1 to E10 of the brief has a matching hunk in the delta or the guide diff, and no hunk in the delta falls outside E1 to E10; the round's added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `null`, `public`, `protected`, `private`, or `import`; every added property line carries `readonly`; the two `fill` examples await the call; the guide's § Surface has one row per export of `src/browser/types.ts` and the `ButtonHooks` row reads `type`; the § Methods tables for `TooltipInterface`, `PopoverInterface`, `CollapseInterface`, `CarouselInterface`, and `BackdropInterface` list the same members as their interfaces; the guide's whitespace-insensitive change beyond round 1 is the four rows claim 9 names; `readonly active` appears only on `TabInterface`; `hint` appears only inside the `'manual' | 'hint'` union and its TSDoc; the report's "Rulings taken" list names a bounding rule per ruling. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's logs named under Subject are independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `documentation.md`, `writing.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 6, 7, 8, and 9 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
