# Unit 7 — the catalog and editorial screens

## Role and engine

`implementer` — Opus 5, native Claude subagent, this checkout, sole serial writer from the clean
committed baseline the Orchestrator names at launch.

## Objective

Recompose `/products`, `/products/:slug`, `/magazine`, `/magazine/:slug`, `/marketplace`, `/shop`,
and `/shop/:slug` on the page primitives. Close the hollow detail pages: every detail screen ends in
a real next action. Every listing paints its count and its empty state in the record slot.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md` — the coding contract.
2. `tmp/authority/orchestration.md` — agent operation.
3. `tmp/authority/rules/browser.md`, `rules/names.md`, `rules/architecture.md`, `rules/patterns.md`,
   `rules/styles.md`, `rules/tests.md`, `rules/writing.md`, `rules/quality.md`.
4. `tmp/authority/skill/SKILL.md` — the `enterprise-bootstrap` skill, and from
   `tmp/authority/skill/references/`: `frontend-design.md`, `responsive-layout.md`, `components.md`,
   `inputs.md`, `color-modes.md`, `utilities.md`, `bootstrap-reference.md` (§ The data states).
5. `guides/README.md` — the application spec.
6. `.orkestrel/roughnotes/plan.md` § The system, § Page primitives, § Screen by screen.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## Context

`C:\Users\mikes\WebstormProjects\roughnotes`, a private Vue 3 + Bootstrap 5.3.8 application for The
Rough Notes Company, an insurance publisher serving independent property-and-casualty agents since
1878. Fixture data throughout; live orders and live logins stay external links.

Unit 5 declared and built `Frame`, `Split`, `Entry`, `Notice`, and `Brand`. Read
`tmp/units/u5-report.md` and their contracts in `app/browser/types.ts`. **You adopt them; you do not
change them.** If a primitive cannot express a screen, stop and report.

Unit 4 settled the system, including a generated `figures-tabular` utility for figures a reader
compares. Unit 6 recomposed home and the company screens — read `tmp/units/u6-report.md` so these
screens read as the same product.

### The defects these screens carry

- **F2 — the detail pages are hollow.** `/products/:slug` offers no action of any kind beyond its
  breadcrumb: `product-detail--light-1280.png`. Its content ends around y=460 in a 1080 px frame.
  The earlier claim that this leaves a large void was struck — the band above the footer is about
  70 px. The defect is the missing action, not the geometry.
  - `/products/:slug` closes with `Get started` as primary, `Ask about this product` to contact, and
    `All products`. **Do not invent related records.** `Product` carries no relation field and
    deriving one from catalog order is blank-space filling. The plan rules against it.
  - `/shop/:slug` closes with `Live catalog` as the real external commit, `Pay a bill` as the in-app
    action — today `ItemView` names it in prose without linking it — and `All shop items`.
  - `/magazine/:slug` closes with the next article in the issue and a return to the issue.
- **F9 — the eyebrow repeats the heading.** `magazine-empty--light-1280.png` paints `MAGAZINE` over
  `Magazine`; `marketplace-miss--light-1280.png` paints `INSURANCE MARKETPLACE` over
  `Insurance Marketplace`. An eyebrow that repeats its title carries nothing.
- **S5 — page-head alignment is inconsistent.** `/magazine` centres its head and its filter row while
  every other screen starts theirs. Settle on one.
- **S6 — external destinations wear the internal affordance.** `Live catalog` carries the same arrow
  glyph every in-app action uses. Derive the cue from the destination; do not store a second field.
- **The marketplace field runs 927 px.** A coverage or industry name is a few words. Bound it.
- **Listings owe a count and an empty state in the record slot.** `/magazine`'s Program business
  filter is the shipped filtered-empty case; `/marketplace` has a query miss; `/shop` has an empty
  department. Each keeps its filters and its clear path, and distinguishes an empty collection from
  a filtered miss.
- **Detail screens owe a miss state** for an absent slug, painted inside the page frame rather than
  as a bare heading.
- **`/shop/:slug` owes a partial state**: a SKU with no `isbn` omits the line rather than painting an
  empty label.
- **Figures owe `figures-tabular`**: prices, catalog codes, ISBNs, and issue dates.

`loading` and a data-fetch `error` are **not applicable** on these screens and you do not paint
them. `Catalog` is synchronous and total — it returns a record or `undefined` and cannot wait or
fail. Painting either would be inventing progress. Unit 9 records that in the guide.

Host facts:

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- Each journey variant is its own Vitest project: `npm run test:journey`.
- Write capture frames with `VITE_CAPTURE=true npm run test:journey`; they land in
  `tmp/capture/states/`. The registry names `shop-listing` and `shop-detail` separately.
- Bootstrap emits 329 Sass deprecation warnings from its own imports. Standing condition.

## Rulings the Orchestrator has already made for you

**`Entry` and the featured product's marker.** Unit 6 adopted `Entry` on home and reported that it
carries no member for a rank marker or a glyph, so home's `Most requested` badge and icon tiles did
not survive there. You meet the same wall on `/products`.

Take the structural answer first: try rendering the featured product as the first `Entry` with its
rank expressed as a fact, or as a distinct region above the grid. Judge it from the rendered frame,
not from the source.

If the structural answer is worse, you may widen `Entry` by **at most one** single-word member.
Declare it in `app/browser/types.ts` before implementing it, justify it in your report against
`AGENTS.md` § Minimal public API — the consumer must be real and present, not speculative — and keep
`Entry`'s one-link invariant: the title stays the card's only interactive element. Widening it makes
`app/browser/types.ts` and `app/browser/components/Entry.vue` owned files for that change only. Do
not add a second member, and do not change any other primitive.

**`readHost` and `shellHref` belong in `helpers.ts`.** Unit 6 left `readHost` module-scope in
`MediaView.vue` and unit 5 left `shellHref` module-scope in `App.vue`, both because
`app/browser/helpers.ts` was outside their scope. It is inside yours. Promote both, with TSDoc and
an `@example`, and update `MediaView.vue` and `App.vue` to import them — that promotion is the only
reason those two files are yours to touch. `.claude/rules/architecture.md` wants a derivation like
this centralized rather than hidden in a module.

**Home stays outside `Frame`.** Unit 6 ruled it and the Orchestrator accepted it. Home is a
marketing page with a hero; the other screens are framed. Do not try to reconcile them.

## Unknowns

- Whether the magazine category tone bands survive. They are the only imagery the product has and
  they encode the category honestly through their badge; the plan keeps them. At 390 a decorative
  band occupying a third of the viewport before the headline is a cost — rule on its narrow height.
- Whether `/magazine` and `/shop` filters read as a group without their pill radius, which unit 4
  removed. Look at the rendered frames and rule.
- What the next article in the issue is, given `Article` carries no ordering field beyond `issued`.
  Derive it; if the derivation is arbitrary, say so and pick the honest one.

## Scope

**Owned files:**

- `app/browser/components/ProductsView.vue`, `ProductView.vue`, `MagazineView.vue`,
  `ArticleView.vue`, `MarketplaceView.vue`, `ShopView.vue`, `ItemView.vue`
- Their mirrored tests under `tests/app/browser/components/`
- `app/browser/constants.ts` — only to add copy or a declared choice these screens need
- `app/core/helpers.ts` and its test — ONLY if a listing needs a pure derivation that belongs in
  core rather than in a view, and only additively. Stop and report before changing an existing
  signature.
- `app/browser/helpers.ts` and its test — ONLY for the `readHost` and `shellHref` promotion.
- `app/browser/components/MediaView.vue` and `app/browser/App.vue` — ONLY to import the promoted
  helpers and delete their local copies. Change nothing else in either.
- `app/browser/types.ts` and `app/browser/components/Entry.vue` — ONLY if you rule that `Entry` must
  widen, under the ruling above.

**Off-limits — do not edit, for any reason:**

- `Frame.vue`, `Split.vue`, `Notice.vue`, and `Brand.vue`. Adopt, never change. `Entry.vue` only
  under the ruling above.
- `HomeView.vue`, `AboutView.vue`, `PublicationsView.vue` — unit 6 owns them. `MediaView.vue` only
  for the helper import named above.
- Every form component and its view — unit 8 owns them
- `app/core/types.ts`, `constants.ts`, `Catalog.ts`, `parsers.ts`, `validators.ts`
- `app/browser/controllers/`, `composables/`
- `app/browser/styles/` — unit 4 settled it. If a screen needs a rule that does not exist, stop and
  report; do not author CSS.
- `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts` — unit 9 owns them
- `tests/setupPolicy.ts`, `tests/policy.test.ts` — restored by `scaffold repair`
- `guides/README.md` — unit 9 owns it
- `vite.config.ts`, `package.json`, `.orkestrel/`, `tmp/authority/`, `node_modules/`, `dist/`

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. No `style` attribute, no SFC `<style>` block, no authored CSS, no new npm package, no `any`,
   `as`, `!`, or suppression comment.
5. Every one of the seven screens composes from the primitives. Each detail screen ends in a
   continuation with one primary action; no continuation carries an invented related record.
6. Every listing paints its count and paints its empty state in the record slot, preserving its
   filters and its clear path, and distinguishing an empty collection from a filtered miss.
7. Every detail screen paints its miss state inside the page frame. `/shop/:slug` paints its partial
   state for an absent `isbn`.
8. No eyebrow repeats its heading. Page heads align consistently across all seven.
9. Every figure a reader compares carries `figures-tabular`.
10. Every external destination is distinguishable from an in-app one by something a reader can see.
11. `npm run test:app:browser` passes.
12. `npm run test:journey` is green for all four projects, with every accessible-name assertion in
    the integration suite unchanged. The journeys resolve `Products`, `RoughNotes-Pro`,
    `Program business`, `Show all articles`, `Search markets`, `Clear search`, `Coverage or industry`,
    `Live catalog`, `Coverages Applicable`, `Shop`, and `Shop catalog` by exact name — keep them. If
    a rename is unavoidable, stop and report it; do not edit the journey file.
13. `VITE_CAPTURE=true npm run test:journey` writes the frames, and you have read
    `product-detail--light-1280.png`, `shop-detail--light-1280.png`, `shop-listing--light-1280.png`,
    `magazine-empty--light-1280.png`, `magazine-empty--light-390.png`, and
    `marketplace-miss--light-1280.png`, and confirmed the defects above are gone. Name what you saw
    in each. A source-only claim about a rendered result is not acceptable.

**Observations, not criteria:** the `npm test` wall-clock duration, and any journey result you
cannot attribute to your own change.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not change a primitive. Do not author CSS. Do not invent a catalog
field, a related-record relation, a price, or a ranking claim. Do not rename a control the journeys
resolve by accessible name.

Where a detail is ancillary — which of two orderings reads better, how a sentence of body copy is
worded — decide it, record it, and carry on.

## Output

Write your report to `tmp/units/u7-report.md` in this checkout, and make your final message the same
content. Sections:

1. **Done / not done**, one line each, against the acceptance criteria by number.
2. **Screen by screen** — what each of the seven became: regions, continuation, states painted,
   narrow composition, expansion threshold.
3. **The rendered evidence** — per frame you read, what you saw, naming the defect it closed.
4. **Rulings on the unknowns.**
5. **Observations.**
6. **What you did not close**, and why.

No process diary.
