# J-MODAL audit round 4 — the checker's brief

## Role and lane

`checker` on Sonnet, reached as a native Claude subagent with `Read`, `Grep`, and `Glob`; mechanical conformance only. State that in your first line.

## Subject

The J-MODAL unit's round 4 in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal` (branch `unit/modal`: the unit's rounds committed as `9c56ad8`, Veneer `main` `2cc0887` merged and the merge left open with every file staged, `MERGE_HEAD` `2cc0887`), briefed by `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-modal-brief-4.md`. Review evidence, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`: the landing diff `j-modal-5.diff` (the staged tree against `9c56ad8` over `src/browser`, `tests/src/browser`, and `guides/veneer.md`, carrying the merge's landed engines beside the landing round's edits of rounds 4 and 5) and the status `j-modal-5-status.txt`, the reports `j-modal-report-4.md` and `j-modal-report-5.md`, the writer's chain logs `j-modal-gates-4.log.txt` and `j-modal-gates-5.log.txt` (the Orchestrator's own gates run after the replay, before the fast-forward), the unit's mutation instrument and log as the report names them (retained beside it as `j-modal-mutations-4.py` and `j-modal-mutations-4.log.txt`), the W2 terrain record `j-w2-terrain-record.md` § Modal; the worktree's files (`src/browser/Modal.ts`, `Delegate.ts`, `constants.ts`, `validators.ts`, `parsers.ts`, `helpers.ts`, `types.ts`, `index.ts`, `tests/src/browser/*.ts`, `guides/veneer.md`); Bootstrap 5.3.8's sources under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/modal/node_modules/bootstrap/js/src/`; the design verdict `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md` and its § Amendments; E6 to E14 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`.

## Claims

Rule on the mechanical clauses of every numbered claim in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-modal-audit-claims-4.md` (the files present, the tables frozen, the export list exact, the case titles present, the rows and cells present, the greps as fixed) and on these items, one piece of evidence each (`file:line` or the grep): the status lists only the brief's owned files (name each) and no off-limits file; every case title the report names appears verbatim in the worktree's test files; every mutation row the report names appears in the instrument's log with the same failed count and named case, and the log ends with its digest receipt; no `.bs.` wire name is dispatched or listened for outside `constants.ts`' default attribute names and the guide's Bootstrap-side prose; the added lines carry no `any`, `as `, non-null `!`, `@ts-`, `eslint-disable`, `public`, `protected`, `private`, a parameter property, a default export, or a nested function declaration outside an anonymous callback; every added interface property and public return collection is `readonly`; `Modal.ts` holds one class plus imports; every immediately invoked element guard the unit added reads `isInstance(x, HTMLElement)`; the barrel exports exactly the names `tests/src/browser/index.test.ts` asserts; the guide's § Surface has one row per barrel export; every added Summary cell equals its description paragraph; every added summary opens with a third-person `-s` verb and does not name its symbol; the fence under § Examples imports from `@orkestrel/veneer/browser`; the `plugin` row reads `shipped` with Proof `tests/src/browser/Modal.test.ts`; no term `writing.md` § Substitutions bans unconditionally appears in the added prose (name the pattern and the paths swept); every shared-file patch the report returns names only `types.ts`, `guides/veneer.md`, or `ROADMAP.md`; the report records that no `prove` call was made. A claim whose only evidence is the report's quoted command is `UNRESOLVED`; the Orchestrator's log named under Subject is independent evidence.

## Law

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`; `.claude/rules/typescript.md`, `names.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`; E6 and E10 in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md`; skill: `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

The `orkestrel-falsify` verdict shape as your final message and nothing else: verdicts on the claims' mechanical clauses (numbered as in the claims file), the checklist of items (met or not met with evidence), referrals for any judgment question, and exactly one terminal line naming the failed claims where there are any.
