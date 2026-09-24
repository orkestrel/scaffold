# J-GUARDS design round — the event-guard family, and what `resolveOptions` reads

One brief for both lanes of the adversarial pass, blind to each other: `planner` on Opus 5.5 (the subjective lane) and `analyst` on GPT-6 Astra (the objective lane). Perform the assignment directly, spawn nothing, and edit nothing. This round proposes; the Orchestrator rules.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md` (Design laws: one concept one term, no superfluous wrappers, minimal public API, export and test reusable logic, centralize by kind); `.claude/rules/names.md`, `architecture.md`, `patterns.md` (guards), and `typescript.md` in that repository.

## The terrain (Veneer `main` `b1d314d`, `C:/Users/mikes/WebstormProjects/veneer`)

- `src/browser/validators.ts`: `isButtonEvent`, `isCollapseEvent`, `isAlertEvent`, `isTabEvent`, `isScrollSpyEvent`, `isDropdownEvent`, `isCarouselEvent`, `isModalEvent`, `isToastEvent`, `isOffcanvasEvent`, `isTooltipEvent`, `isPopoverEvent`, each narrowing a DOM event to its entity's event-map member, and their rows in `tests/src/browser/validators.test.ts`. Consumers: every engine passes its guard to `bindEventMap` (`src/browser/helpers.ts`), and `TooltipProfile.guard` carries one.
- The carried finding (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/plan.md` § Carried findings, the rows beginning "The `is*Event` guard family repeats one body" and "`isOffcanvasEvent` repeats `isModalEvent`"): several guards repeat one body per detail shape (`isModalEvent`, `isOffcanvasEvent`, `isTabEvent` share a related-target shape; `isCollapseEvent`, `isAlertEvent`, `isToastEvent` a null detail). The offcanvas round-1 objective lane proposed one shared guard per detail shape (`isRelatedEvent`), and its subjective lane kept the family.
- The second carried finding (the row beginning "`resolveOptions` in `helpers.ts` copies every enumerable key"): `resolveOptions` copies the options object with `for…in`, so an inherited enumerable key is copied and a getter runs even for a key the entity does not read.
- The public surface: every guard is a barrel export with a guide § Surface row.

## The questions

1. Rule the guard family: keep one guard per entity, fold the guards into one guard per detail shape, or another shape. For your recommendation, give the names (names.md), what a consumer reads at a call site, the type each guard narrows to (a shared guard must still narrow `bindEventMap`'s hooks to the entity's event map), the barrel and guide consequence, and every consumer that changes. Rule on greenfield: no alias of a removed guard remains.
2. Rule `resolveOptions`'s read: own enumerable keys only, only the keys the entity's parser table names, or unchanged. Give the observable difference for each option, with a case that tells them apart, and every engine whose behaviour changes.
3. The proofs: which cases pin the ruling, and the mutation each distinguishes.
4. The unit: owned files, the order against J-INTEGRATION (which owns `Modal.ts`, `Offcanvas.ts`, `Backdrop.ts`, and their tests until it lands), and the acceptance criteria.

## Output

A numbered proposal answering each question, with `file:line` evidence for every claim about the code, each claim marked read or inferred. End with one line: `PROPOSAL: <one-sentence recommendation>`.
