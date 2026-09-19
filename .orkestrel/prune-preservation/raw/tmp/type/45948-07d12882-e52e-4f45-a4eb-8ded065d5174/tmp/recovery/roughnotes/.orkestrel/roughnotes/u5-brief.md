# Unit 5 — the shell and the page primitives

## Role and engine

`implementer` — Opus 5, native Claude subagent, this checkout, sole serial writer from the clean
committed baseline the Orchestrator names at launch.

## Objective

Declare and build the four page primitives every screen will compose from, and collapse the shell's
duplication into declared data. This unit edits no view other than the shell itself — units 6, 7,
and 8 adopt the primitives afterwards.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md` — the coding contract. § Design laws, § TTTDD, § Non-negotiable rules.
2. `tmp/authority/orchestration.md` — agent operation.
3. `tmp/authority/rules/names.md`, `rules/architecture.md`, `rules/patterns.md`, `rules/browser.md`,
   `rules/typescript.md`, `rules/tests.md`, `rules/writing.md`, `rules/quality.md`.
4. `tmp/authority/skill/SKILL.md` — the `enterprise-bootstrap` skill, and from
   `tmp/authority/skill/references/`: `components.md`, `responsive-layout.md`, `color-modes.md`,
   `utilities.md`, `bootstrap-reference.md` (§ Accessibility, § Enterprise patterns).
5. `guides/README.md` § The knowledge shell, § Hash navigation, § Color mode.
6. `.orkestrel/roughnotes/plan.md` § Page primitives — the settled shapes this unit declares.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## Context

`C:\Users\mikes\WebstormProjects\roughnotes`, a private Vue 3 + Bootstrap 5.3.8 application for an
insurance publisher serving independent property-and-casualty agents since 1878.

Today `App.vue` renders a skip link, a nested-dark utility bar, a sticky masthead navbar, an
offcanvas drawer, `main#main`, and a nested-dark footer. The shell carries these defects, each
measured:

- **C1** The class triple `link-body-emphasis link-underline-opacity-0 link-underline-opacity-100-hover`
  appears nineteen times in one file. Do **not** invent a CSS alias for three shipped utilities; the
  repetition disappears when C3 turns the markup into one loop.
- **C3** The header's destinations are the declared `NAV_ITEMS` constant; the footer's are literal
  markup across three columns. The footer is the largest navigation surface in the product and the
  only one with no declared source.
- **C4** The brand lockup markup is duplicated between the navbar and the footer.
- **S4** `Get started` is `btn-primary` in the masthead and `btn-warning` in the drawer. One control,
  two ranks.
- **S8** Two adjacent focus stops both have the accessible name `Get started`.
- The offcanvas `h2` titled `Menu` sits in the DOM **before** `main`, so it precedes every view's
  `h1`. Heading order is wrong on every screen.
- Footer column titles are `<p>` elements, so the footer's three groups have no headings.
- `.mark` is the authored class for the brand badge and **collides with Bootstrap's shipped `.mark`
  highlight utility**. Rename it.

Host facts your commands run under:

- Windows. Use the Bash tool with POSIX syntax; `npm` resolves as `npm.cmd`.
- Vitest browser mode drives real Chromium through Playwright.
- Each declared journey variant is its own Vitest project: `npm run test:journey`, or one with
  `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project 'journey:light-390'`.
- The Sass build emits repetitive deprecation warnings. A standing condition owned elsewhere.
- `tmp/` is swept at acceptance and is not committed.

## The primitives

Declare each contract in `app/browser/types.ts` **before** implementing it, with readonly properties
and single-word members. Each is a Vue SFC under `app/browser/components/`.

| Name     | Owns                                                                                                   | Refuses                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `Frame`  | Container, optional trail, one `h1`, bounded introduction, section rhythm, and the continuation region | A mandatory hero, an eyebrow repeating its title, a minimum height, an invented trail level |
| `Split`  | A primary region beside an independent supporting region; stacked below `lg`, top-aligned from 992 px  | Equal heights on unrelated regions, CSS order contradicting reading order                   |
| `Entry`  | One repeated collection item: title, supporting facts, one real destination                            | Catalog lookups, fabricated fields, nested interactive stretched links                      |
| `Notice` | Contextual empty, miss, partial, and refusal presentation, its announcement, and a real recovery       | Fetching, route ownership, fake progress, automatic success                                 |

`Entry` is deliberately not named `Record`: a component named `Record` shadows the TypeScript
`Record` utility type inside any `<script setup>` that imports it.

Equal height is correct for comparable items in a grid and wrong for unrelated paired regions. The
rule is comparability, not the utility — do not ban `h-100` globally.

`measure` stays a width role, not a wrapper component. Do not build a `Button`, `Card`, or `Alert`
wrapper over Bootstrap's own: a wrapper must add a boundary, invariant, composition, translation,
lifecycle, or materially narrower contract, and those add none.

## Unknowns

- Whether `Notice` should own the announcement politeness (`role="status"` versus `role="alert"`) or
  take it as a prop. Rule on it and say why; match announcement to urgency, not to visual styling.
- Whether the footer's three column groups are better as one declared structure or three. Rule on it.
- Whether `Frame`'s continuation region belongs to `Frame` or to a fifth primitive. The plan says
  `Frame` owns it; if implementing it proves otherwise, stop and report rather than adding one.

## Scope

**Owned files:**

- `app/browser/App.vue`
- `app/browser/constants.ts`
- `app/browser/types.ts`
- New: `app/browser/components/Frame.vue`, `Split.vue`, `Entry.vue`, `Notice.vue`, `Brand.vue`
- `app/browser/index.ts` — the barrel must export every new component
- `app/browser/styles/_signature.scss` — ONLY to rename the colliding `.mark` class
- `tests/app/browser/App.test.ts`
- New mirrored tests under `tests/app/browser/components/` for each new component

**Off-limits — do not edit, for any reason:**

- Every existing view component. Units 6, 7, and 8 adopt the primitives; you only build them.
- `app/browser/controllers/`, `app/browser/helpers.ts`, `app/browser/composables/`
- `app/core/`
- `app/browser/styles/` other than the `.mark` rename
- `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts` — unit 9 owns them
- `tests/setupPolicy.ts`, `tests/policy.test.ts` — restored by `scaffold repair`
- `guides/README.md` — unit 9 owns it
- `vite.config.ts`, `package.json`, `.orkestrel/`, `tmp/authority/`, `node_modules/`, `dist/`

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything. Do not run a tree-wide
`format` or lint `--fix`; validate read-only and scoped to your owned files.

## Execution

Perform this assignment directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. Every primitive's contract is declared in `app/browser/types.ts` before its implementation, with
   readonly interface properties and single-word members. No `any`, no `as`, no `!`, no suppression
   comment, no default export outside the SFC requirement.
5. The footer's destinations come from declared constants, and the class triple named in C1 appears
   at most twice in `App.vue`.
6. The brand lockup has exactly one definition, used by both the navbar and the footer.
7. No authored class collides with a shipped Bootstrap utility name.
8. Heading order is correct on every screen: no `h2` precedes the view's `h1` in DOM order, and the
   footer's groups carry real headings.
9. `Get started` carries one rank everywhere, and no two adjacent focus stops share an accessible
   name.
10. Each new component has a mirrored test proving what it owns and what it refuses.
11. `npm run test:app:browser` passes.
12. `npm run test:journey` is green for all four projects, with every accessible-name assertion in
    the integration suite unchanged. The shell's named controls — `Skip to content`, `Menu`,
    `Close menu`, `Get started`, `About`, `Publications`, `Products`, `Shop`, `Contact`,
    `Use dark theme`, `Use light theme` — keep their exact names.

**Observations, not criteria:** the `npm test` wall-clock duration.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not adopt a primitive into a view. Do not add a package. Do not widen
the public API beyond the four primitives and the brand.

Where a detail is ancillary — which prop name reads better among equals, where a helper sits — decide
it, record it, and carry on.

## Output

Write your report to `tmp/units/u5-report.md` in this checkout, and make your final message the same
content. Sections:

1. **Done / not done**, one line each, against the acceptance criteria by number.
2. **The contracts** — each primitive's declared shape, and why its members satisfy the single-word
   rule without a wrapper that translates nothing.
3. **The shell** — what C1, C3, C4, S4, S8, the heading order, the footer headings, and the `.mark`
   collision became.
4. **Rulings on the unknowns.**
5. **Observations.**
6. **What you did not close**, and why.

No process diary.
