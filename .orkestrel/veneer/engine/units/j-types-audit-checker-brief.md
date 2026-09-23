# J-TYPES audit — the checker's brief (round 1)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-TYPES unit's uncommitted change in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (base `376d84a`). Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types.diff` and the actual status `j-types-status.txt`; the brief `j-types-brief.md` (its § Scope and § Acceptance criteria); the report `j-types-report.md`; the worktree's `src/browser/types.ts` and `guides/veneer.md`.

## Claims

Rule on claims 8, 11, 12, and 13 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the brief's owned files; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `null`, `public`, `protected`, `private`, or `import`; every added doc block's first sentence opens with a third-person `-s` verb and never names the symbol; every added interface method carries an `@example` fence; every property line in the added interfaces carries `readonly` (grep the added lines for a property declaration without it); the guide's § Surface has exactly one row per added export (list the exports from `grep -n "^export " src/browser/types.ts` against the rows) and § Methods exactly one `####` table per added behavioural interface (an interface with at least one call signature) with one row per call-signature member; no term `writing.md` § Substitutions bans unconditionally appears in the added prose (run the table over the added TSDoc and guide lines; rule a `once`, `new`, `since`, `above`, or `below` hit by its sense); no new file and no moved file; the report's "Rulings taken" list names a bounding rule per ruling. A claim whose only evidence is the report's quoted command is `UNRESOLVED`.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `architecture.md`, `names.md`, `documentation.md`, `writing.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 8, 11, 12, and 13 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line.
