# U7 Button — design verdict, 2026-09-20

Brief: `units/u7-design-brief.md`. Lanes, blind to each other:

| Lane | Role | Engine | Record |
| --- | --- | --- | --- |
| subjective | `planner` | native Opus 5 (the harness wrote no transcript; the answer is retained from the returned message) | `units/u7-design-planner-report.md` |
| objective | `analyst` | Astra, `codex exec` read-only over the fleet folder, thread `01a0c0be-0b6d-7581-bd7c-a7321697a382`, exit 0 | `units/u7-design-analyst.sh`, `units/u7-design-analyst-report.md` |

## Reconciliation

| Question | Planner | Analyst | Ruling |
| --- | --- | --- | --- |
| 1 engine | `pressed` from the `active` class; class then attribute then a non-cancelable bubbling `toggle` (`toggle.vn.button`); `toggle()` returns the state; `destroy()` restores the managed class and attribute exactly; host positional, options `{ on }`; helpers `emitEvent`, `bindEventMap` | the same derivation, order, event, restoration; `toggle()` returns nothing; host inside options; refuse double ownership of one host | as the planner shapes it, with the analyst's ownership rule: a second `Button` over a host already owned throws; `toggle()` returns the state (one shape with `ColorMode`) |
| 2 validation | `@orkestrel/contract` stays a devDependency; hand predicates in `validators.ts` | promote to `dependencies` for guards, never `createContract` | the planner's: no runtime dependency in U7 (Button declares no options a guard would earn; the first real consumer is `data-bs-config` merging); the plan's U7 text is transformed accordingly, not its exit criterion |
| 3 factory | none | none | none |
| 4 boundary | `src/browser/auto.ts` runtime entry constructing a `Delegate` (exported from `./browser`, listener-free on import); one native `click`, `closest`, `preventDefault`, per-instance `WeakMap`, `destroy()`; the Bootstrap method spellings recorded, not shipped; scaffold's runtime-entry clause extended to `src/<environment>/auto.ts` | `src/browser/auto/` folder with `ButtonAdapter` carrying the spellings; needs a rule change for the folder and the spellings | the planner's shape for the entry and `Delegate`; the spellings are put to the user (see § Open to the user) because dropping them changes what the plan's U7 delivers |
| 5 CSS | subset with a deferral table under § Styles and a `readDeferrals` reader; row-keyed presence (`selector` and `variable` rows); engine rows to component `engine`; Elements' mix with theme-closure mixer tokens; the binding table; tertiary ships | subset with an explicit partition; presence changed deliberately with negative controls; `color-mix` with a strong-text token; a binding table with `--vn-button-*` component defaults; tertiary if in scope | the planner's mechanism (rows, deferral table, engine component) with the analyst's requirement that the partition be exhaustive and reject unknown exclusions; tokens per the planner's table, the mixer end decided from the run-6 strings before the partial is written; tertiary ships with its departure row |
| 6 shell and journeys | `sections/` family with `ButtonSection` and `SectionInterface`; keep the mounting constructor; projection helper in `tests/setup.ts`; captures per state | grow `Showcase.ts`; add `mount()`; the same journeys; paint readers cannot read `oklch()` (Test prerequisite) | the planner's shell shape and the mounting constructor (reviewer bound 13 refused with reason); the analyst's prerequisite stands: `units/test-paint-brief.md` fixes the Test readers before U7c |
| 7 distribution and guide | one Veneer consumer case in the existing stage; guide sections enumerated | a fully offline consumer proof | the planner's case now (the stage already runs from the packed archive); a fully offline stage is a later Distribution unit if the row stays open |
| 8 decomposition | U7-rule, U7a CSS, U7b engine and entry, U7c shell and journeys, U7d conformance contract, U7e guide | prerequisites (rule, Test paint), implementation, shell and journeys, offline consumer | the chain below |

## The chain

Serial in Veneer, one writer at a time; Test-paint runs in the Test checkout on the bench queue.

| Unit | Role, engine | Owns | Closes |
| --- | --- | --- | --- |
| U7-rule | struck by the user's correction (§ below); its commit reverted | — | — |
| Test-paint | `sol`, Astra, in Test | the colour parsers and readers, their proof, `guides/test.md` | the paint readers' reach; packed into Veneer as a head start |
| U7d | `sol`, Astra | `tests/setupConformance.ts`, its proof, `tests/conformance.test.ts` | row-keyed shipped status, `readDeferrals`, planted controls; runs first so the presence check fires before CSS lands |
| U7a | `sol`, Astra | the two button partials, `index.scss`, the mixer tokens and `focus-ring` mixin, the styles proofs, the deferral table and shipped rows in the guide | Tokens, Semantics/classes, the CSS half of Paint |
| U7b | `sol`, Astra | `src/browser/*` (`Button`, `Delegate`, types, constants, helpers, validators, barrel) and the browser proofs; no new entry, wrapper, or manifest row | Lifecycle, the JavaScript half of Distribution through the existing `./browser` walk |
| U7c | `opus`, Opus 5 | `app/browser/**` (sections family), `tests/app/browser/**`, `tests/setup.ts` projection, `tests/distribution.test.ts` case | States/access, Paint, Motion, Coordinates, Artifacts, Distribution |
| U7e | `opus`, Opus 5 | `guides/veneer.md`, `guides/README.md` | parity, the carried prose bounds |

Each unit: one audit round with the lanes swapped by writer, `checker` where mechanical, `verifier` over the chain; a prose finding is a bound.

## The user's correction, 2026-09-20

The user refused the `./browser/auto` entry: "you're making up surfaces, follow our project
conventions". The entry, its build wrapper, its manifest rows, and the scaffold rule amendment
(`bff4ed94`, reverted as `48afc878`) came from the plan's U7 text the Orchestrator wrote, not
from scaffold's shape or the user's words. Ruling: no new subpath export, no side-effect entry,
no second build, no rule change. The data API is `Delegate`, a class exported from the existing
`./browser` barrel that a consumer's own entry constructs (the showcase's `main.ts` constructs
one in U7c); the Bootstrap method spellings are not shipped, and § Compatibility records each
spelling's mapping (`getOrCreateInstance` is the delegation's reuse, `dispose` is `destroy`,
`getInstance` unpublished). U7-rule is struck and reverted; U7b's scope shrinks to `src/browser/*`
and its proofs. The question that section had left open is closed by the same ruling.
