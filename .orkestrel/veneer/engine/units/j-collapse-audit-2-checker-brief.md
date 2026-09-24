# J-COLLAPSE audit round 2 — the checker's brief

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-COLLAPSE unit's round 2 in the worktree `C:/Users/mikes/WebstormProjects/veneer-collapse` (branch `unit/collapse`; round 1 committed as `0ad71cd`, Veneer `main` `468a118` merged as `eab447e`, the round-2 edits uncommitted on top). Review evidence, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: the round-2 diff `j-collapse-2.diff` and status `j-collapse-2-status.txt`; the brief `j-collapse-brief-2.md` (§ The edits, § Acceptance criteria) and the round-1 brief `j-collapse-brief.md` (§ Scope, criteria 1 to 6); the report `j-collapse-report-2.md`; the Orchestrator's run `j-collapse-gates-2.log.txt`; the instrument `j-collapse-mutations-2.py` with its log `j-collapse-mutations-round-2.log.txt`; the patches under `j-collapse-patches-2/`; the worktree's `src/browser/*.ts`, `tests/src/browser/*.ts`, and `guides/veneer.md`.

## Claims

Rule on claims 5, 6, and 10 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-collapse-audit-claims-2.md`, on the mechanical clauses of claim 4 (the tables present with the defaults `COLLAPSE_CLASSES`, `COLLAPSE_ATTRIBUTES`, and `COLLAPSE_SELECTORS` declare; the `### Vocabulary` rows; the `plugin` row's three cells; the departures present) and of claim 9 (the applied summary equals its § Surface row; each patch's guide hunk equals its `types.ts` sentence in the form `findDrift` compares, a `{@link}` written as its code token and whitespace collapsed), and on these mechanical items, one piece of evidence each (`file:line` or the grep): the status lists exactly the eight files claim 10 names, all `M`; no off-limits file changed in the tree (`types.ts`, `index.ts`, `HostSnapshot.ts`, `helpers.ts`, `Button.ts`, `constants.ts`, `tests/setupBrowser.ts`, `ROADMAP.md`); every case title the report names under C1 to C9 and in its red-reading table appears in the worktree's test files verbatim; every mutation row in the report's table has a row in the log with the same failed count and the same named case, and the `GREEN?` rows read 0 failed with the totals 31, 32, 10, 3, 3; the log ends with the receipt `restored byte for byte`; `grep -n "#open\|#close\|#moving\|#taken" src/browser/Collapse.ts` hits nothing and `#siblings`, `#hideSiblings`, `#owned`, `#transitioning`, `#holds`, `#prune` are each declared once; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration outside an anonymous callback; `Collapse.ts` holds one class plus imports; the `Delegate` class remark's over-long line (132 columns, beginning "leaves every panel the click has not reached to the delegates still live.") is the only added comment or prose line over 100 columns in the four sources (rule with `awk 'length > 100'` reasoning over the diff's added lines, naming any other); the Compatibility table's Proof column is one width in every row after the re-padding; the § Examples fence imports from `@orkestrel/veneer/browser`; no term `writing.md` § Substitutions bans unconditionally appears in the added prose (name the pattern and the paths you swept); the report records the refused `prove` calls and the C9 deviation; each patch under `j-collapse-patches-2/` names only `types.ts`, `guides/veneer.md`, or `ROADMAP.md`. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence. The Orchestrator's replay `j-collapse-mutations-2-orchestrator.log.txt` runs after you return; record its clause `UNRESOLVED` without ruling the claim `BROKEN` on that absence alone.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 4, 5, 6, 9, and 10 (numbered as in the claims file, the mechanical clauses only for 4 and 9), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
