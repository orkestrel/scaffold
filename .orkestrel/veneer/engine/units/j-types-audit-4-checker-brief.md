# J-TYPES audit round 4 — the checker's brief (the per-element entry)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-TYPES unit's round 4 in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (base `1868007`), uncommitted on top of round 3's tree. Review evidence: the actual diff against the base `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-4.diff` (rounds 3 and 4; `j-types-3.diff` is round 3 alone) and the actual status `j-types-4-status.txt`; the brief `j-types-brief-4.md` (edit E12, § Scope, § Acceptance criteria); the report `j-types-report-4.md`; the worktree's `src/browser/types.ts` and `guides/veneer.md`; the Orchestrator's own runs `j-types-gates-4.log.txt` and `j-types-probe-4.log.txt`.

## Claims

Rule on claims 3 and 4 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims-4.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the brief's owned files; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `null`, `public`, `protected`, `private`, or `import`; every added property line carries `readonly`; `grep -n "Sanitizer" src/browser/types.ts` returns no type or constructor reference to the global; `grep -n "WHATWG" src/browser/types.ts guides/veneer.md` returns nothing; the rollup rationale sentence ("the declaration rollup compiles with TypeScript 5.9.3 …") appears exactly once in `src/browser/types.ts`; the guide's § Surface has exactly one row per export of `src/browser/types.ts`, in source order around the new row; the `SanitizerElementNamespaceWithAttributes` and `SanitizerConfig` summaries open with a third-person `-s` verb and do not name their symbol; no term `writing.md` § Substitutions bans unconditionally appears in the added prose; no new or moved file; the report's rulings each name a bounding rule. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's logs named under Subject are independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `documentation.md`, `writing.md`; E6 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 3 and 4 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
