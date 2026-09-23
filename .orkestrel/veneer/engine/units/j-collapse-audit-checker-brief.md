# J-COLLAPSE audit round 1 — the checker's brief

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-COLLAPSE unit in the worktree `C:/Users/mikes/WebstormProjects/veneer-collapse` on `unit/collapse` (from Veneer `main` `1395361`), uncommitted. Review evidence: the actual diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-collapse.diff` and status `j-collapse-status.txt`; the brief `j-collapse-brief.md` (§ Scope, § Acceptance criteria, the carried obligations) and its terrain record `j-collapse-terrain-record.md`; the report `j-collapse-report.md`; the worktree's `src/browser/*.ts`, `tests/src/browser/*.ts`, `tests/setupBrowser.ts`, and `guides/veneer.md`; the Orchestrator's own run `j-collapse-gates.log.txt`; the retained instruments `j-collapse-mutations.py` and `j-collapse-mutations-final.log.txt`; the patches under `j-collapse-patches/`.

## Claims

Rule on claims 7 (its mechanical clauses: the exports present, the constants frozen, no `COLLAPSE_DEFAULTS`, the export list exact), 8 (its mechanical clauses: the rows present, the fence's import specifier, the `plugin` row's cells, every summary's form), and 9 of `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-collapse-audit-claims.md` and on these mechanical items, one piece of evidence each (`file:line` or the grep): the diff touches only the brief's owned files (the four new files, `constants.ts`, `validators.ts`, `Delegate.ts`, `index.ts`, the named test files, and the named guide sections) and no off-limits file (`HostSnapshot.ts`, `Button.ts`, `ColorMode.ts`, `helpers.ts`, `types.ts`, `tests/setupBrowser.ts`, `ROADMAP.md` untouched in the tree, their changes only inside `j-collapse-patches/`); every case title the report's proof matrix names appears in the worktree's test files; every mutation the report names appears in `j-collapse-mutations.py` or its log with an `exit=1 … 1 failed` line; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration outside an anonymous callback; every added interface property and public return collection is `readonly`; `Collapse.ts` holds one class plus imports and `parsers.ts` holds one exported function with TSDoc; the barrel `src/browser/index.ts` exports exactly the names `tests/src/browser/index.test.ts` asserts, `Collapse` and `parseElement` included; the guide's § Surface has one row per barrel export and none other; every added Summary and § Methods cell equals its description paragraph; every added summary opens with a third-person `-s` verb and does not name its symbol; the Collapse fence under § Examples imports from `@orkestrel/veneer/browser`; the `### Vocabulary` table carries the Collapse rows for `host`, `shown`, `transition`, `horizontal`, `collapsed`, `target`, `parent`, and `trigger` with the defaults `COLLAPSE_CLASSES`, `COLLAPSE_ATTRIBUTES`, and `COLLAPSE_SELECTORS` declare; the `plugin` row for Collapse reads `shipped` with Proof `—` and the proof file in its Obligation cell; `grep -rn "\.bs\." src/browser tests/src/browser` hits nothing but wire-name prose, and every `data-bs-` hit is a default in `constants.ts` or a test fixture; no term `writing.md` § Substitutions bans unconditionally appears in the added prose; every patch under `j-collapse-patches/` names only shared or off-limits files or the unit's own proof; the report names each patch, each ruling, and each departure. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6 and E10 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on claims 7, 8, and 9 (numbered as in the claims file), the checklist of mechanical items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
