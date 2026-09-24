# Unit J-DEMO audit — the checker lane over the Engine region

## Role and engine

`checker` on Sonnet, a native Claude subagent (Read, Grep, Glob), read-only. Perform the assignment directly and spawn nothing.

## Objective

Rule per numbered claim, with evidence, on the J-DEMO unit in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/demo` (branch `unit/demo` from Veneer `main` `c692c3e`, the unit's edits uncommitted), against its brief and its report.

## Context

- The brief: `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-demo-brief.md`. The report: `j-demo-report.md` (with the Orchestrator's integration note at its end). The review evidence: `j-demo.diff` (`git diff HEAD`, new files intent-to-add), `j-demo-status.txt`, and `j-demo-gates.log.txt` (the Orchestrator's run: `check`, `lint:check`, `format:check`, `test:app`, `test:guides`, `test:policy`, `build:app`).
- Law: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` § Non-negotiable rules, § Design laws, § Writing; `.claude/rules/application.md`, `architecture.md`, `tests.md`, `documentation.md`, `writing.md`.
- You cannot run git or tests; the diff and the logs are the evidence, and the worktree files are the tree.

## Claims

1. **Scope.** The status lists `app/browser/Showcase.ts`, `app/browser/constants.ts`, `app/browser/index.ts`, `app/browser/sections/EngineSection.ts` (new), `guides/veneer.md`, `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, `tests/app/browser/sections/EngineSection.test.ts` (new), and `tests/app/browser/integration.test.ts` (the Orchestrator's applied patch: one `scrollIntoView` line in the covered-host case), and nothing under `src/`.
2. **The section.** `EngineSection` extends `SpecimenSection`, constructs after mounting one `Tooltip` over the region with `descendants: ENGINE_TOOLTIP_TRIGGER` and one `Toast` per `.toast`, binds each button whose `aria-controls` names the toast to `toast.show()`, and its `destroy()` removes the listeners, destroys the engines in construction order, then removes the nodes; `Showcase.#mount` lists it first; `index.ts` exports it; `constants.ts` declares `ENGINE_COPY`, `ENGINE_TOOLTIP_TRIGGER`, and `ENGINE_SPECIMENS` frozen, in the section's file placement (`app/browser/sections/`, `constants.ts`) per `architecture.md`.
3. **The specimens.** `ENGINE_SPECIMENS` holds, in order: the live collapse (`data-bs-toggle="collapse"`, `data-bs-target="#engine-…"`), the accordion (`data-bs-parent`), the dropdown (`data-bs-toggle="dropdown"`), the tabs (`data-bs-toggle="tab"`), the dismissible alert (`data-bs-dismiss="alert"`), the modal (`data-bs-toggle="modal"`, `data-bs-dismiss="modal"`), the offcanvas (`data-bs-toggle="offcanvas"`, `data-bs-dismiss="offcanvas"`), the toast (`data-bs-dismiss="toast"`, a show button naming it through `aria-controls`), three tooltip triggers (`data-bs-toggle="tooltip"`, `data-bs-title`, `data-bs-placement`), the carousel (`data-bs-slide`, `data-bs-slide-to`, no `data-bs-ride`, and no `slide` class per the report's departure), and the scrollspy panel; every id begins with `engine-`; the TSDoc lists the departures the report names.
4. **The proofs.** `EngineSection.test.ts` carries the fifteen cases the report titles, each driving the specimen through real input (`userEvent`, `pressKeys`, the journey helpers) with no mock, spy, or module replacement; `Showcase.test.ts` lists `Engine` as the first region and `ENGINE_SPECIMENS` first; `index.test.ts` lists the four new exports in the barrel's order.
5. **The guide.** § Showcase carries the Engine paragraph naming what the region renders, the `Delegate`, the section-constructed engines, and the proof link; § Tests carries the `[engine specimens]` link after the display specimens line; no substitution-table term in the added prose (sweep case-insensitively and across inflections, ruling each hit by its sense).
6. **The gates and the syntax.** `j-demo-gates.log.txt` reads every step at exit 0; the added lines carry no `any`, `as` assertion (an `as const` is permitted), non-null `!`, `@ts-` directive, `eslint-disable`, access modifier, default export, or nested function declaration outside an anonymous callback; every added interface property is readonly; `EngineSection.ts` holds one class plus imports; the report records no `prove` call.

## Execution, output, deviation contract, acceptance criteria

Perform the assignment directly and spawn nothing. The final message: a per-claim table (claim, CONFIRMED or FAIL, evidence with file and approximate line), referrals, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>`. Stop only when a file named here does not resolve. Every claim has a ruling with evidence.
