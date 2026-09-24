# J-CAROUSEL audit round 3 — the checker's brief

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-CAROUSEL unit's round 3 in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel` (branch `unit/carousel`, cut from Veneer `main` at `e24e2c3`, the unit's edits uncommitted), briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-carousel-brief-3.md`. Review evidence, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: the diff `j-carousel-3.diff` (`git diff HEAD` with the new files intent-to-add) and the status `j-carousel-3-status.txt`, the report `j-carousel-report-3.md`, the Orchestrator's run `j-carousel-gates-3.log.txt`, the unit's mutation instrument and log as the report names them (retained beside it as `j-carousel-mutations-3.py` and `j-carousel-mutations-3.log.txt`), the W2 terrain record `j-w2-terrain-record.md` § Carousel; the worktree's files (`src/browser/Carousel.ts`, `Delegate.ts`, `constants.ts`, `validators.ts`, `parsers.ts`, `helpers.ts`, `types.ts`, `index.ts`, `tests/src/browser/*.ts`, `guides/veneer.md`); Bootstrap 5.3.8's sources under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/carousel/node_modules/bootstrap/js/src/`; the design verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` and its § Amendments; E6 to E14 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`.

## Claims

Rule on the mechanical clauses of every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-carousel-audit-claims-3.md` (the files present, the tables frozen, the export list exact, the case titles present, the rows and cells present, the greps as fixed) and on these items, one piece of evidence each (`file:line` or the grep): the status lists only the brief's owned files (name each) and no off-limits file; every case title the report names appears verbatim in the worktree's test files; every mutation row the report names appears in the instrument's log with the same failed count and named case, and the log ends with its digest receipt; no `.bs.` wire name is dispatched or listened for outside `constants.ts`' default attribute names and the guide's Bootstrap-side prose; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration outside an anonymous callback; every added interface property and public return collection is `readonly`; `Carousel.ts` holds one class plus imports; every immediately invoked element guard the unit added reads `isInstance(x, HTMLElement)`; the barrel exports exactly the names `tests/src/browser/index.test.ts` asserts; the guide's § Surface has one row per barrel export; every added Summary cell equals its description paragraph; every added summary opens with a third-person `-s` verb and does not name its symbol; the fence under § Examples imports from `@orkestrel/veneer/browser`; the `plugin` row reads `shipped` with Proof `tests/src/browser/Carousel.test.ts`; no term `writing.md` § Substitutions bans unconditionally appears in the added prose (name the pattern and the paths swept); every shared-file patch the report returns names only `types.ts`, `guides/veneer.md`, or `ROADMAP.md`; the report records that no `prove` call was made. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6 and E10 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on the claims' mechanical clauses (numbered as in the claims file), the checklist of items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
