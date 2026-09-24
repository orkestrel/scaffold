# J-TOOLTIP audit round 6 — the checker's brief

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-TOOLTIP unit's landing round 6 in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/tooltip` (branch `unit/tooltip`: the unit's rounds committed as `0807a4f`, Veneer `main` `2d95b37` merged and the merge left open with every file staged; `MERGE_HEAD` is `2d95b37`), briefed by `j-tooltip-brief-6.md`. The review evidence sits under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: the writer's report `j-tooltip-report-6.md`, the landing diff `j-tooltip-6.diff` (the staged tree against `MERGE_HEAD` over `src/browser`, `tests/src/browser`, and `guides/veneer.md`: what the landing adds to `main`), the fold diff `j-tooltip-6-fold.diff` (the staged tree against `0807a4f`), the status `j-tooltip-6-status.txt`, the writer's chain `j-tooltip-acceptance-6.sh`, the instrument `j-tooltip-mutations-6.py` with its log `j-tooltip-mutations-6.log.txt`, and the claims file. The landed `main` is readable in the worktree as `git show main:src/browser/Delegate.ts`. Read the worktree's files as they stand; the Orchestrator's replay runs only after every lane has returned.

## Claims

Rule on the mechanical clauses of every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-tooltip-audit-claims-6.md` (the files present, the tables frozen, the export list exact, the case titles present, the rows and cells present, the greps as fixed) and on these items, one piece of evidence each (`file:line` or the grep): the status lists only the brief's owned files (name each) and no off-limits file; every case title the report names appears verbatim in the worktree's test files; every mutation row the report names appears in the instrument's log with the same failed count and named case, and the log ends with its digest receipt; no `.bs.` wire name is dispatched or listened for outside `constants.ts`' default attribute names and the guide's Bootstrap-side prose; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration outside an anonymous callback; every added interface property and public return collection is `readonly`; `Tooltip.ts` holds one class plus imports; every immediately invoked element guard the unit added reads `isInstance(x, HTMLElement)`; the barrel exports exactly the names `tests/src/browser/index.test.ts` asserts; the guide's § Surface has one row per barrel export; every added Summary cell equals its description paragraph; every added summary opens with a third-person `-s` verb and does not name its symbol; the fence under § Examples imports from `@orkestrel/veneer/browser`; the `plugin` row reads `shipped` with Proof `tests/src/browser/Tooltip.test.ts`; no term `writing.md` § Substitutions bans unconditionally appears in the added prose (name the pattern and the paths swept); every shared-file patch the report returns names only `types.ts`, `guides/veneer.md`, or `ROADMAP.md`; the report records that no `prove` call was made. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6 and E10 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on the claims' mechanical clauses (numbered as in the claims file), the checklist of items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
