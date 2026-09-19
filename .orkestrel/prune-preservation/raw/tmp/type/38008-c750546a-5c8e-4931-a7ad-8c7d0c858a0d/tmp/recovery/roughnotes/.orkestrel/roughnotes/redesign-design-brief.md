# Design brief: the Rough Notes redesign

## Objective

Return a design argument for redesigning the whole Rough Notes application, from your assigned lane.
You propose; you do not implement, and you do not accept.

## Authority — read before arguing

The current authority is staged inside the subject checkout at
`C:\Users\mikes\WebstormProjects\roughnotes\tmp\authority\`. Read the staged copies, not
`node_modules/@orkestrel/scaffold/dist/host/`, which is a superseded vendored copy.

1. `tmp/authority/AGENTS.md` — the coding contract.
2. `tmp/authority/orchestration.md` — agent operation.
3. `tmp/authority/rules/names.md`, `rules/typescript.md`, `rules/architecture.md`,
   `rules/patterns.md`, `rules/browser.md`, `rules/styles.md`, `rules/tests.md`,
   `rules/documentation.md`, `rules/writing.md`, `rules/quality.md`.
4. `tmp/authority/skill/SKILL.md` and the references under `tmp/authority/skill/references/` —
   this is the dispatch-named `enterprise-bootstrap` skill. `frontend-design.md` owns the visual
   decisions; `responsive-layout.md` owns the layout contract; `color-modes.md` owns mode
   behaviour; `components.md` and `inputs.md` own component and affordance selection;
   `utilities.md` owns the class index; `bootstrap-reference.md` owns theming, forms, enterprise
   patterns, and the accessibility detail.
5. The application spec: `guides/README.md` in the subject checkout.

## Subject

`C:\Users\mikes\WebstormProjects\roughnotes` — a private Vue 3 + Bootstrap 5.3 application for
The Rough Notes Company, an insurance publisher serving independent property-and-casualty agents
since 1878.

- Audience: independent P&C insurance agents, agency principals, and their advertising buyers.
- Job: find, judge, and commit to Rough Notes knowledge products — the producer toolkit, the
  agency-wide content licence, the specialty-market directory, the magazine, and the book catalog.
- Primary action: `Get started`, which opens subscribe.
- Fixture data throughout. No account, no cart, no payment capture. Live commerce and live logins
  stay external links.
- 15 hash routes: `/`, `/about`, `/publications`, `/newsletter`, `/products`, `/products/:slug`,
  `/magazine`, `/magazine/:slug`, `/marketplace`, `/subscribe`, `/media`, `/contact`, `/shop`,
  `/shop/:slug`, `/payment`.

## Constraints that bind any proposal

- Bootstrap 5.3.8 compiled from Sass. The styling ladder in `enterprise-bootstrap` binds every
  paint decision. No new npm package may be proposed.
- The identity is navy `#0a2540`, gold `#c8952b`, a Georgia-first serif display face, and a system
  sans body face, with no webfont request. This identity fits the subject; a proposal that replaces
  it is manufacturing novelty inside an established product and will be rejected. Propose changes to
  how the identity is applied, not to what it is.
- The core in `app/core` is host-independent. `app/browser` may import it. Neither imports the other
  way round.
- `app/core/types.ts` and `app/browser/types.ts` are authoritative for public contracts.
- Every entity API member is a single descriptive word.
- Every declared data state must ship: ideal, empty, loading, partial, error.

## Evidence: what actually renders today

Captured at 1280x800 from the shipped build into
`C:\Users\mikes\WebstormProjects\roughnotes\tmp\capture\states\*.png`. Read the frames; do not
infer the render from source. The accessible tree, focus order, and resolved-style matrix for
light-1280 are in `tmp/journeys/light-1280.txt`.

Findings the Orchestrator measured, each with the frame that shows it:

- **F1 — One designed page, fourteen under-composed ones.** `home--light-1280.png` is a composed
  marketing page with a hero, a trust band, a product grid, a marketplace split, an issue grid, and
  a subscribe invite. Every other screen is a short slab of content on bare white with no page
  frame. Compare `product-detail--light-1280.png`, `shop--light-1280.png`,
  `magazine-empty--light-1280.png`.
- **F2 — Hollow detail pages.** `product-detail--light-1280.png` and `shop--light-1280.png` end
  around y=560 in a 1280x1080 frame, leaving a large empty band above the footer. Neither offers a
  next action, a related record, or a continuation.
- **F3 — Unbounded measure.** `about--light-1280.png` runs timeline body copy the full container
  width. `media--light-1280.png` runs nine full-width rows whose text occupies the left third.
- **F4 — Unequal paired cards.** `contact-refused--light-1280.png` stretches the navy office card
  to its taller form sibling, producing roughly 700px of empty navy. `about--light-1280.png` does
  the same to the credo card.
- **F5 — Link-underlined headings.** Every card title on home is a link inside a heading and paints
  underlined: `home--light-1280.png`, and the accessible tree in `tmp/journeys/light-1280.txt`
  showing `heading "RoughNotes-Pro" > link "RoughNotes-Pro"`.
- **F6 — Hero stage overflow.** At 1280 the magazine issue card clips at the container edge and the
  `Coverage insights, monthly` chip overhangs it: `home--light-1280.png`.
- **F7 — Trust band break.** The band wraps `Coverages Applicable` onto a second line, centred
  against a left-aligned lead-in: `home--light-1280.png`.
- **F8 — Action rank.** `about--light-1280.png` ends with three near-equal buttons. The contact and
  payment forms commit with a gold `btn-warning`, which the application's own spec reserves for
  thesis calls to action on navy, not for a submit on a paper card.
- **F9 — Eyebrow repeats the heading.** `magazine-empty--light-1280.png` paints the eyebrow
  `MAGAZINE` above the heading `Magazine`.
- **F10 — Thin contrast matrix.** The resolved-style matrix in `tmp/journeys/light-1280.txt` records
  three readings for the whole surface: contrast on `Shop catalog`, contrast and focus ring on
  `Subscribe free`.
- **F11 — A red variant no gate runs.** `VITE_VARIANT=dark-1280` fails 3 of 18 integration tests;
  `npm test` only ever runs the default `light-1280`, so the red is invisible to the gate chain.
  The home journey's dark run cannot resolve the theme control by its dark-mode accessible name.

Code-level evidence the Orchestrator measured:

- **C1** `app/browser/App.vue` repeats the class triple
  `link-body-emphasis link-underline-opacity-0 link-underline-opacity-100-hover` on every footer and
  utility-bar link — more than twenty occurrences in one file.
- **C2** `app/browser/App.vue` selects the view with a fifteen-branch `v-if`/`v-else-if` chain in
  its `main` landmark.
- **C3** The footer's destinations are literal markup in `App.vue`, while the header's are the
  declared `NAV_ITEMS` constant in `app/browser/constants.ts`.
- **C4** The brand lockup markup is duplicated between the navbar and the footer in `App.vue`.
- **C5** `app/browser/styles/index.scss` uses `@import`, which emits 313 Sass deprecation warnings
  per build.
- **C6** `npm run format:check` fails on the committed file
  `tests/app/browser/styles/mixins.test.ts`.

Baseline gate readings taken 2026-09-16 on a clean tree: `lint:check` clean, `check` clean,
`format:check` red on C6, `test:app` 102 passed and 1 skipped, `test:policy` 111 passed,
`test:config` 46 passed.

## Your lane

**`planner` holds the SUBJECTIVE lane.** Argue shape, taste, naming, ergonomics, information
architecture, copy register, and the feel this application must present to an insurance
professional deciding whether to trust a 147-year-old publisher. Say what the redesign is — its
thesis in one sentence — and what each screen becomes.

**`analyst` holds the OBJECTIVE lane.** Argue correctness, constraints, and what the code, the
contracts, the rules, and Bootstrap 5.3 actually permit. Say which of the findings are real, which
proposed change would break a declared contract, where the rules forbid a tempting shortcut, what
the contrast and reflow bars require, and what the test and guide-parity obligations cost.

Argue your own lane fully. You are not writing a balanced review.

## Unknowns the Orchestrator has not settled

- Whether the fifteen routes are the right information architecture, or whether the redesign must
  merge, split, or add screens. Rule on it.
- Whether `docs/redesign.html` — a standalone marketing mockup already partly realized in
  `HomeView.vue` — still has anything to give. Read it and rule.
- What the smallest set of shared page primitives is that would close F1 through F4 without
  inventing a component library. Name them.
- Which findings are not worth fixing. Say so explicitly; a proposal that fixes everything at equal
  priority is not a plan.

## Scope

Read-only. You write no file in the subject repository. You edit nothing. You spawn nothing and
perform this assignment directly.

## Output

A design argument, at most 700 lines, in this order:

1. **Thesis** — one sentence naming what the redesign is.
2. **Verdict on each finding F1 to F11 and C1 to C6** — real, not real, or not worth fixing, one
   line each with your reason. Where you disagree with the Orchestrator's reading, say so and give
   the evidence.
3. **The system** — the color families and surface ownership, type roles and scale, spacing and
   width roles, radius and elevation, and the signature, as the redesign settles them. State what
   is reused unchanged and what changes. Name each against its Bootstrap source.
4. **Page primitives** — the smallest set of shared shapes every screen composes from, each named
   in one word, with what it owns and what it refuses.
5. **Screen by screen** — for each of the fifteen routes, the settled layout in prose: regions,
   reading order, the narrow composition at 320 and 390 CSS px, the expansion threshold, the
   primary action, and every data state it must paint.
6. **Units** — the work decomposed into bounded units with acceptance criteria, ordered by
   dependency, each naming its owned files. Mark which are objective (constraint-heavy, mechanical)
   and which are subjective (shape, naming, voice).
7. **What you would refuse** — the changes a reader might expect that you argue against, with the
   reason.
8. **Open risks** — what your lane cannot settle.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Where a captured frame contradicts a claim in this brief, the frame
wins and you say so.

## Acceptance criteria

- Every section present, in order, with a ruling on every one of F1 to F11 and C1 to C6.
- Every visual claim cites a capture file; every code claim cites `file:line`.
- Fifteen routes ruled on in section 5, with no route omitted.
- No implementation, no diff, no edit, no acceptance of your own argument.
