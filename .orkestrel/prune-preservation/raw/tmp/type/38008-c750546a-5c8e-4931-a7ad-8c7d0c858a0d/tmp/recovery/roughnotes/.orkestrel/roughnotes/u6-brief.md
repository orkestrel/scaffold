# Unit 6 — home and the company screens

## Role and engine

`implementer` — Opus 5, native Claude subagent, this checkout, sole serial writer from the clean
committed baseline the Orchestrator names at launch.

## Objective

Recompose `/`, `/about`, `/publications`, and `/media` on the page primitives, so each reads as the
same kind of page, bounds its prose, sizes each region to its own content, and ends in a real next
action.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md` — the coding contract.
2. `tmp/authority/orchestration.md` — agent operation.
3. `tmp/authority/rules/browser.md`, `rules/names.md`, `rules/architecture.md`, `rules/patterns.md`,
   `rules/styles.md`, `rules/tests.md`, `rules/writing.md`, `rules/quality.md`.
4. `tmp/authority/skill/SKILL.md` — the `enterprise-bootstrap` skill, and from
   `tmp/authority/skill/references/`: `frontend-design.md`, `responsive-layout.md`, `components.md`,
   `color-modes.md`, `utilities.md`, `bootstrap-reference.md`.
5. `guides/README.md` — the application spec.
6. `.orkestrel/roughnotes/plan.md` § The system, § Page primitives, § Screen by screen.
7. `.orkestrel/roughnotes/redesign-planner-report.md` § 5, for `/`, `/about`, `/publications`,
   `/media` only — its screen-by-screen prose is the subjective lane's argument, reconciled by the
   plan. Where the two differ, the plan wins.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## Context

`C:\Users\mikes\WebstormProjects\roughnotes`, a private Vue 3 + Bootstrap 5.3.8 application for The
Rough Notes Company, an insurance publisher serving independent property-and-casualty agents since
1878. Audience: agents, agency principals, and advertising buyers. Fixture data throughout; live
commerce and live logins stay external links.

Unit 5 declared and built four primitives under `app/browser/components/` — `Frame`, `Split`,
`Entry`, `Notice` — plus `Brand`. Read `tmp/units/u5-report.md` and their contracts in
`app/browser/types.ts` before composing. **You adopt them; you do not change them.** If a primitive
cannot express a screen, stop and report rather than widening it or working around it.

Unit 4 settled the system. A `figures-tabular` utility is generated for figures a reader compares.
Radius is one family. Elevation is assigned by layer. The focus ring reaches native focus stops.

### The defects these four screens carry, each measured

- **F1** Home is a composed page; the others are a bare `container-xl` slab with no page frame.
  Captures: `about--light-1280.png`, `media--light-1280.png` against `home--light-1280.png` in
  `tmp/capture/states/`.
- **F3** Prose runs the full container width. `about--light-1280.png` runs timeline body copy across
  1176 px. `media--light-1280.png` renders nine full-width rows whose text occupies the left third —
  compare `media--light-390.png`, where the same markup reads correctly. The wide layout is the
  narrow layout un-adapted.
- **F4** `h-100` stretches unrelated paired panels. On `/about` the credo card runs to the mission
  card's height; measured at 992 px the credo carries 124 px of empty fill and the mission 48 px.
  Equal height stays correct for comparable items in a grid — the rule is comparability, not the
  utility.
- **F5** Card titles are links carrying the prose underline. The accessible tree records
  `heading "RoughNotes-Pro" > link "RoughNotes-Pro"`. Keep the heading-with-link structure; change
  its visual treatment. Removing the link would cost the card its hit area and add a focus stop per
  record.
- **F7** The home trust band wraps `Coverages Applicable` onto a second line, centred, under a
  centred lead-in, so the wrap has no alignment to fall back to.
- **F8** `/about` ends with three near-equal buttons. Rank them: one primary, at most one secondary.
  `Back to home` goes — the masthead brand is that.
- **S6** External destinations wear the internal affordance. `Live catalog` and the media PDFs carry
  the same arrow glyph every in-app action uses, so a reader cannot tell which controls leave.
  Derive the external cue from the destination, do not store a second field.
- **Media rows** should be a `list-group`, not nine cards each wasting two thirds of its width. Each
  row carries the document name at the start and its destination cue at the end.
- **Publications** paints three near-identical one-line cards. Each destination gains the fact a
  reader needs in order to choose it, drawn from the catalog rather than invented.

Host facts:

- Windows. POSIX syntax in the Bash tool; `npm` resolves as `npm.cmd`.
- Each journey variant is its own Vitest project: `npm run test:journey`, or one with
  `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project 'journey:light-390'`.
- Write capture frames with `VITE_CAPTURE=true npm run test:journey`; they land in
  `tmp/capture/states/`.
- Bootstrap emits 329 Sass deprecation warnings from its own imports. Standing condition. Ignore it.

## Unknowns

- Whether `/publications` should keep listing `/newsletter` and `/subscribe` as peer desks. They are
  the same job in different copy. The plan rules that `/newsletter` keeps its route and its distinct
  content, and that magazine delivery moves into `/subscribe`'s own continuation rather than
  standing as a peer desk. Implement that and report how it reads.
- What fact each publications destination should carry. Draw it from the catalog; if the catalog has
  no such fact, say so rather than inventing one.

## Scope

**Owned files:**

- `app/browser/components/HomeView.vue`, `AboutView.vue`, `PublicationsView.vue`, `MediaView.vue`
- Their mirrored tests under `tests/app/browser/components/`
- `app/browser/constants.ts` — only to add copy or a declared choice these screens need

**Off-limits — do not edit, for any reason:**

- The four primitives and `Brand.vue`. Adopt, never change.
- Every other view component. Units 7 and 8 own them.
- `app/core/`, `app/browser/types.ts`, `controllers/`, `helpers.ts`, `composables/`, `App.vue`
- `app/browser/styles/` — unit 4 settled it. If a screen needs a rule that does not exist, stop and
  report; do not author CSS.
- `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts` — unit 9 owns them
- `tests/setupPolicy.ts`, `tests/policy.test.ts` — restored by `scaffold repair`
- `guides/README.md` — unit 9 owns it
- `vite.config.ts`, `package.json`, `.orkestrel/`, `tmp/authority/`, `node_modules/`, `dist/`

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything. Do not run a tree-wide
`format` or lint `--fix`.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. No `style` attribute, no SFC `<style>` block, no authored CSS, no new npm package, no `any`,
   `as`, `!`, or suppression comment.
5. Each of the four screens composes from the primitives and ends in a continuation carrying one
   primary action and at most one secondary.
6. No prose region takes the container width. No unrelated paired panels are equal-height.
7. No card title paints the prose underline, and every card title keeps its heading-with-link
   structure.
8. Every external destination is distinguishable from an in-app one by something a reader can see,
   derived rather than stored.
9. Media assets render as a list rather than as full-width cards.
10. `npm run test:app:browser` passes.
11. `npm run test:journey` is green for all four projects, with every accessible-name assertion in
    the integration suite unchanged. If a rename is unavoidable, stop and report it as a deviation —
    do not edit the journey file.
12. `VITE_CAPTURE=true npm run test:journey` writes the frames, and you have read
    `home--light-1280.png`, `home--dark-1280.png`, `about--light-1280.png`, `about--light-390.png`,
    `media--light-1280.png`, and `media--light-390.png` and confirmed the defects above are gone.
    Name what you saw in each. A source-only claim about a rendered result is not acceptable.

**Observations, not criteria:** the `npm test` wall-clock duration, and any journey result you
cannot attribute to your own change.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not change a primitive. Do not author CSS. Do not rename a control
the journeys resolve by accessible name.

Where a detail is ancillary — which of two orderings reads better, how a sentence of body copy is
worded — decide it, record it, and carry on.

## Output

Write your report to `tmp/units/u6-report.md` in this checkout, and make your final message the same
content. Sections:

1. **Done / not done**, one line each, against the acceptance criteria by number.
2. **Screen by screen** — what each of the four became: its regions, its continuation, its narrow
   composition, its expansion threshold.
3. **The rendered evidence** — per frame you read, what you saw, naming the defect it closed.
4. **Rulings on the unknowns.**
5. **Observations.**
6. **What you did not close**, and why.

No process diary.
