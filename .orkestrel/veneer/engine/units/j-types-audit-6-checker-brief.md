# J-TYPES audit round 6 — the checker's brief (the round-5 findings closed)

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-TYPES unit's rounds 6 and 7 in the worktree `C:/Users/mikes/WebstormProjects/veneer-types` on `unit/types` (tip `b9adebf`), one uncommitted edit set. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-7.diff` and the actual status `j-types-7-status.txt`; the briefs `j-types-brief-6.md` (E19 to E28, § Scope, § Acceptance criteria) and `j-types-brief-7.md`; the reports `j-types-report-6.md` and `j-types-report-7.md`; the worktree's `src/browser/types.ts` and `guides/veneer.md`; the Orchestrator's own run `j-types-gates-6.log.txt` and the probe `j-types-probe-6.ts`.

## Claims

Rule on claims 4 and 8 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-audit-claims-6.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the brief's owned files; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `null`, `public`, `protected`, `private`, or `import`; every added property line carries `readonly`; `grep -n "readonly selector?:\|ScrollLockClassMap\|the \`show\` class\|the \`active\` class\|the \`pointer-event\` class\|:not(.disabled)\|:not(.dropdown-toggle)\|.is-fixed, .sticky-top\|open token\|event to the verb" src/browser/types.ts` returns no hit; the guide's § Surface has exactly one row per `export` line of `src/browser/types.ts` and no row for `ScrollLockClassMap`; every changed Summary cell equals its description paragraph; every map key TSDoc carries a "Default:" sentence, `OffcanvasClassMap.fade` included; every added summary opens with a third-person `-s` verb and does not name its symbol; no term `writing.md` § Substitutions bans unconditionally appears in the added prose; no new or moved file; each of the report's rulings names a bounding rule; the round-7 `popper` ruling is recorded in `j-types-report-7.md`. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `documentation.md`, `writing.md`; E6 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 4 and 8 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
