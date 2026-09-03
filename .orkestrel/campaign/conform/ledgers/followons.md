# Fleet-wide follow-ons surfaced by the conformance refuters (carried to a fleet sweep after the per-package units land)

- Unused `@vitest/browser-playwright` devDependency in non-browser packages (msg-obj-5; refuter: "most of the fleet carries the same unused row"): Orchestrator dependency unit with lockfile regeneration, one pass over every affected checkout.
- `isBrowserVuePath` residue in `tests/setup.ts` (msg-obj-4, budget-obj-7): sweep every fleet `tests/setup.ts` for the helper and its test block; delete where the package has no browser environment.
- `id` stored as a `#` field behind a getter (budget-obj-8): sweep for the same shape fleet-wide after the budget repair lands, and carry the repair to each package whose rulings did not already name it.

## Per-package observations the implementers recorded outside their rows (close in the audit's fix round or a follow-on unit)

- budget: `tests/guides.test.ts:2` ("The four constants below": a count and `below`) and `:37` ("the second assertion below"); `src/core/types.ts:6` BudgetOptions `@remarks` still states the id default as "Omitted `id` values generate a random UUID" after the getter repair. Consequence of budget-obj-8 to rule fleet-wide: `JSON.stringify(budget)` yields `{}` because `id` is a prototype getter; no test or fence serializes a Budget today.
