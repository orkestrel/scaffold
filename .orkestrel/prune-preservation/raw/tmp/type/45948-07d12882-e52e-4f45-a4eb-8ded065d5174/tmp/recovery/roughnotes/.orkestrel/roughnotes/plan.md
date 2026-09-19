# The Rough Notes redesign — reconciled plan

Reconciled by the Orchestrator from the subjective lane (`planner`, Opus 5) and the objective lane
(`analyst`, GPT-6 Astra), which argued the same brief in clean contexts, blind to each other. Their
reports are `redesign-planner-report.md` and `redesign-analyst-report.md` beside this file.

## Thesis

Every Rough Notes route becomes the same kind of page — a framed reading column that names its
subject, bounds its prose, sizes each region to its own content, and ends in a real next action —
so the composition home already has stops being one page's private achievement and becomes the
application's shape.

## Exit criterion

The campaign ends when each of the capabilities below is implemented, repaired, retained, or
excluded on recorded evidence, and the gates are green:

1. Every one of the fifteen routes composes from the settled primitives and ends in a real action.
2. Every reachable data state ships in the shipped renderer, and every unreachable one is recorded
   as not applicable with its reason.
3. Form validation no longer commits.
4. Whether the masthead repaints on a live theme toggle is settled in real Chromium through
   Playwright, and a proof drives that transition. `finding-theme-repaint.md` records why the
   in-app browser pane could not settle it. If the defect is real it is repaired; if it is an
   instrument artifact it is recorded as excluded on that evidence. Either outcome closes this
   capability; an unmeasured one does not.
5. All four declared capture variants run under `npm test` and are green.
6. The resolved-style matrix reads every surface role, not two controls.
7. `guides/README.md` matches the built surface, and a parity proof executes that match.
8. The gate chain is green end to end.

## Rulings where the lanes disagreed

The Orchestrator decides; neither lane accepts its own argument.

**F2 — restated.** Both lanes read the frames against my claim and both rejected the geometry: the
band above the footer on `product-detail--light-1280.png` is about 70 px, not large, and
`shop--light-1280.png` does carry a real `Live catalog` action. **My "large empty void" claim is
struck.** What survives is narrower and still real: `/products/:slug` offers no action of any kind
beyond its breadcrumb. That is the defect the plan carries.

**F6 — restated.** Both lanes measured the issue card inside the container. **My clipping claim is
struck.** The defect is occlusion: the `Coverage insights, monthly` chip covers the card's
`Rough Notes magazine` label. Decoration over information.

**C2 — struck.** The subjective lane called the fifteen-branch view chain real; the objective lane
refused "a dynamic component registry solely to remove the dispatch chain" and named no failure it
causes. The objective lane wins. `AGENTS.md` § No superfluous wrappers requires a wrapper to add a
boundary, invariant, or translation; a component map adds indirection and none of those. The chain
stays.

**C1 — kept, with the objective lane's constraint binding.** The repeated utility triple is real,
but the objective lane is right that inventing a CSS alias for three shipped utilities is not the
fix. The triple collapses as a consequence of C3: once the footer's destinations are declared data
rendered through one `v-for`, the markup that repeats the triple exists once. No authored class.

**Equal heights — the objective lane wins.** The subjective lane would have `Panel` refuse `h-100`
everywhere. Equal height is correct for comparable items in a grid and wrong for unrelated paired
regions. The rule is comparability, not the utility: product cards keep it; the Contact office
panel and the About credo lose it.

**Related records — the objective lane wins.** The subjective lane proposed deriving related
products from catalog order. The objective lane refuses invented relations as blank-space filling.
`/products/:slug` closes with `Get started`, `Ask about this product` to contact, and `All
products` — real destinations, no manufactured relation. This also retires the subjective lane's
open risk about adding a relation field: no field, no derivation, no question.

**`/newsletter` — no new record type.** The subjective lane proposed a `Newsletter` core record
type with fixtures and `Catalog` members; the objective lane said reuse the form and invent no
entitlement. The objective lane wins, and it matches my own reading: the view already carries
distinct content in its four benefit lines. What is duplicated is the composition, not the
substance. The fix is compositional and costs no core change.

**Data states — neither lane's position, taken whole.** The subjective lane declared `loading`
absent. The objective lane wanted a new typed presentation-state input on `ApplicationOptions` so
all five states ship. Both are half right.

- `CatalogOptions` already lets a caller supply an empty or reduced collection
  (`app/core/types.ts`), and tests are its real consumer today. **Empty and partial ship in the
  renderers and are proven through that existing seam.** No new options member — adding one whose
  only consumer is a test is the speculation `AGENTS.md` § Minimal public API forbids.
- `Catalog` is synchronous and total: it returns a record or `undefined` and cannot fail or wait.
  **`loading` and a data-fetch `error` are recorded as not applicable, with the reason in the
  guide.** Painting either would be inventing progress.
- **Miss and refusal are separate states and both ship**, as they already do.

**Sass migration — the objective lane wins on evidence.** It probed the replacement and found that
mechanical `@use` loses the navy configuration, and it refuses a zero-warning promise because
Bootstrap's own internal imports remain. The unit keeps the migration and takes its acceptance from
the generated CSS, not from the warning count.

## What both lanes refused, and the plan refuses too

A replacement identity. A webfont. Any new npm package. A component library wrapping Bootstrap's
own components. Deleting or adding a route. A fabricated backend, account, cart, or payment
capture. An asynchronous core catalog. Removing heading semantics to remove an underline. A
disabled invalid submit. A decorative retry. Filling blank space with invented related records or
minimum heights. Treating `docs/redesign.html` as product authority — its section sequence is
reference material; its webfonts, fake search, and visual-only filtering do not enter the
application.

## The system

Reused unchanged: navy `#0a2540`, gold `#c8952b`, the Georgia-first display face, the system sans
body face, no webfont request, the declared emphasis/subtle/border triads with their dark twins, the
spacer map through steps 6 and 7, the radius family, the three shadow tokens, and the 40 rem
`measure`. The identity is correct for a 147-year-old technical publisher and changing it would be
manufacturing novelty inside an established product.

What changes is application, not paint:

- **Navy becomes a surface a screen may hold once.** The chrome keeps it permanently — utility bar,
  drawer, footer. Elsewhere a quiet `bg-body-tertiary` panel replaces navy wherever navy was being
  used as a container rather than as a thesis.
- **Gold narrows to the commit on navy.** Paper submits and searches take `btn-primary`. Gold on
  navy measures 5.763 in the shipped matrix and stays where it passes.
- **Width takes three roles and one rule.** `measure` for prose, a bounded form width, the container
  for repeating records — and body prose never takes the container width.
- **Radius takes one family.** `rounded-pill` leaves the filter rows; filters are commands and read
  as the same object as the cards beneath them.
- **Elevation is assigned by z-position**, not by box: resting cards and masthead, hover and drawer,
  the two elements that actually float.
- **One type role is added** through the Utilities API: tabular figures for prices, catalog codes,
  ISBNs, and invoice amounts, so an insurance publisher's numbers align.
- **The signature is the gold hairline and the growing gold underline.** The two floating chips go —
  they occlude informational text and vanish below `lg` anyway.

## Page primitives

Four shapes, each one word, each naming what it varies. They compose domain content; none becomes a
configurable component library.

| Name     | Owns                                                                                                  | Refuses                                                                       |
| -------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `Frame`  | Container, optional trail, one `h1`, bounded introduction, section rhythm, and the continuation region | A mandatory hero, an eyebrow repeating its title, a minimum height, an invented trail level |
| `Split`  | A primary region beside an independent supporting region; stacked below `lg`, top-aligned from 992 px  | Equal heights on unrelated regions, CSS order contradicting reading order       |
| `Entry`  | One repeated collection item: title, supporting facts, one real destination                            | Catalog lookups, fabricated fields, nested interactive stretched links          |
| `Notice` | Contextual empty, miss, partial, and refusal presentation, its announcement, and a real recovery       | Fetching, route ownership, fake progress, automatic success                     |

`Entry` rather than `Record`: a component named `Record` shadows the TypeScript `Record` utility
type inside any `<script setup>` that imports it.

`measure` stays a width role, not a wrapper. `Brand` is a shell composition, not a page primitive.

## Units

One writer per checkout, dispatched serially from a clean committed baseline. Each names its role
and engine. Every Codex lane runs `gpt-6-astra` per the routing ledger.

| # | Unit | Role / engine | Owns | Carries |
|---|------|---------------|------|---------|
| 1 | **Baseline** | `builder` / Sonnet | `tests/app/browser/styles/mixins.test.ts` | C6 |
| 2 | **Variant gate** | `sol` / Astra | `package.json`, `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts` | F11, V1–V3, V5, capture naming |
| 3 | **Request contracts** | `sol` / Astra | `app/browser/types.ts`, `ApplicationController.ts`, the three forms' validation path, browser barrel and mirrored tests | validation-commits defect, V4, multiword members |
| 4 | **Bootstrap system** | `sol` / Astra | `app/browser/styles/*` and mirrored style tests | F6, radius, elevation, focus ring, tabular figures, C5 |
| 5 | **Shell and primitives** | `implementer` / Opus 5 | `App.vue`, `constants.ts`, new `Frame.vue`, `Split.vue`, `Entry.vue`, `Notice.vue`, `Brand.vue`, mirrored tests | C1, C3, C4 |
| 6 | **Home and company** | `implementer` / Opus 5 | `HomeView.vue`, `AboutView.vue`, `PublicationsView.vue`, `MediaView.vue`, mirrored tests | F3, F4, F5, F7 |
| 7 | **Catalog and editorial** | `implementer` / Opus 5 | `ProductsView.vue`, `ProductView.vue`, `MagazineView.vue`, `ArticleView.vue`, `MarketplaceView.vue`, `ShopView.vue`, `ItemView.vue`, mirrored tests | F2, F9, empty and miss states |
| 8 | **Request surfaces** | `sol` / Astra | the three forms and their four views, mirrored tests | F8, accepted-state dead end |
| 9 | **Proof and parity** | `implementer` / Opus 5 | `guides/README.md`, `tests/app/browser/integration.test.ts`, new `tests/guides.test.ts` | F10, documentation contract |
| 10 | **Gate evidence** | `verifier` / Sonnet | nothing | the authoritative sweep |

Unit 2 blocks every visual unit: a redesign that cannot read its own dark and narrow renders is a
redesign done blind. Units 3 and 4 precede the view units because they move contracts and tokens the
views consume. Unit 9 runs after the views settle.

Unit 2 wires the gate and diagnoses every red variant, but it owns only the harness. Where a
variant's cause lives in application code it reports and leaves the failure red — V4's cause is the
committing revalidation, which unit 3 owns. **All four variants go green at the end of unit 3, not
unit 2.** The resolved-style matrix widens in unit 9 rather than unit 2, because the roles it must
read do not exist until the views settle.

`@orkestrel/guide` is already a declared devDependency and nothing imports it; `guides/guide.md` is
its vendored mirror. Unit 9 uses it. No dependency is added.

## Audit and acceptance

Every nontrivial unit is audited by the objective lane and the subjective lane, at least one on an
engine that did not write it, per the execution loop. Mechanical acceptance criteria additionally
draw a `checker`. The `orkestrel-prove-journey` skill runs after the units land, as the user asked,
and its capture portfolio is the review input for the visual claims. Final acceptance is the
Orchestrator's, after independent audit and gate evidence.

## Carried findings

Every finding named in the design brief or raised by a lane has exactly one carrier above:
F1 → units 5–8; F2 → unit 7; F3, F4 → unit 6; F5 → unit 6; F6 → unit 4; F7 → unit 6; F8 → unit 8;
F9 → unit 7; F11 → unit 2; F10 → unit 9; C1, C3, C4 → unit 5; C5 → unit 4; C6 → unit 1; C2 struck;
the validation-commits defect, V4, and the multiword members → unit 3; the accepted-state dead end →
unit 8; S3, S5, S6, S7, S10 → units 4, 6, 7, 8 by file ownership; S9 → unit 8; S1, S2 → unit 8;
S4 → unit 5; S8 → unit 5.

The theme-repaint question carries no unit yet, deliberately. It is unconfirmed, and the next step
is a measurement rather than a fix: the Orchestrator takes it in real Chromium once the checkout is
free of a live writer. A unit is briefed only if that measurement establishes the defect.
