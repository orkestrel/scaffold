# Unit 4 — the Bootstrap system

## Role and engine

`sol` — GPT-6 Astra (`gpt-6-astra`), `codex exec`, sandbox `workspace-write`, this checkout, sole
serial writer from the clean committed baseline the Orchestrator names at launch.

## Objective

Settle the design system in the stylesheet so every later view composes from one radius family, one
elevation scale assigned by layer, one readable-figure role, and a focus ring that reaches every
focusable control. Remove the decoration that covers information. Modernize the Sass entry without
losing the configured identity. Settle, by measurement, whether the masthead repaints on a live
color-mode toggle.

## Authority — read before acting, in this order

1. `tmp/authority/AGENTS.md` — the coding contract.
2. `tmp/authority/orchestration.md` — agent operation.
3. `tmp/authority/rules/styles.md`, `rules/browser.md`, `rules/names.md`, `rules/typescript.md`,
   `rules/architecture.md`, `rules/tests.md`, `rules/quality.md`, `rules/writing.md`.
4. `tmp/authority/skill/SKILL.md` — the `enterprise-bootstrap` skill, and from
   `tmp/authority/skill/references/`: `color-modes.md` (mode inheritance and surface ownership),
   `bootstrap-reference.md` (§ Define the working scales, § Utilities API, § Elevation and depth,
   § Reduced motion, § Accessibility), `utilities.md` (the shipped class index),
   `frontend-design.md` (§ Depth and finishing details), `inspection.md` (§ Style escapes,
   § When an authored rule is already earned).
5. `guides/README.md` § Color mode, § The focus ring, § The knowledge shell.
6. `.orkestrel/roughnotes/plan.md` § The system — the settled decisions this unit implements.
7. `.orkestrel/roughnotes/finding-theme-repaint.md` — an UNCONFIRMED report you must settle.

Do not read `node_modules/@orkestrel/scaffold/dist/host/`; it is a superseded vendored copy.

## Context

`C:\Users\mikes\WebstormProjects\roughnotes`, a private Vue 3 + Bootstrap 5.3.8 application for an
insurance publisher. Navy `#0a2540`, gold `#c8952b`, Georgia-first display, system sans body, no
webfont request. That identity is fixed and you do not change it — you change how it is applied.

The stylesheet layer is `app/browser/styles/`: `index.scss` (the entry), `_tokens.scss` (Bootstrap
`$` overrides plus `--rn-*` custom properties), `_theme.scss` (mode scopes, button variables, the
focus ring, reduced motion), `_signature.scss` (51 authored selectors), `_mixins.scss`.

Host facts your commands run under:

- Windows, Git Bash. `npm` resolves as `npm.cmd` from this shell.
- Vitest browser mode drives real Chromium through Playwright. Style proofs live in
  `tests/app/browser/styles/`.
- Each declared journey variant is its own Vitest project: `npm run test:journey`, or one with
  `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project 'journey:dark-1280'`.
  The variant reaches the suite through Vitest `provide`/`inject`. Never introduce a Vite `define`
  channel for it: these projects share one module graph and a transform-time substitution leaks the
  last project's value into every project.
- The build currently emits 313 repetitive Sass deprecation warnings from `index.scss`.
- `tmp/` is swept at acceptance and is not committed.

## The work

**W1 — One radius family.** `rounded-pill` on the magazine and shop filter rows sits beside a
0.75rem card and button family. Filters are commands and must read as the same object as the cards
beneath them. Remove the pill from the filter rows. The hero badge may keep it — rule on that and
say why.

**W2 — Elevation by layer, not by box.** Assign the three declared shadow tokens by z-position:
resting cards and the masthead, the hover lift and the drawer, and the two elements that actually
float. Remove `shadow-lg` from the home marketplace preview panel, which is an inset surface inside
a navy band and argues with itself.

**W3 — Remove the chips.** `.chip`, `.chip-south`, and `.chip-north` position `aria-hidden`
ornaments over the home issue card, where the upper one covers that card's `Rough Notes magazine`
label. They also vanish below `lg`, so nothing is lost at narrow width. Remove the rules. The markup
that uses them belongs to unit 6, so return an exact patch for it rather than editing the view.

**W4 — The focus ring reaches every focusable control.** `_theme.scss` restores a ring on `btn`,
`btn-close`, `form-control`, `form-select`, `nav-link`, and `navbar-toggler`. Most focus stops on
this surface are plain links, which fall back to the user agent ring. Extend the selector to reach
them. Hold the 3:1 bar against the actual surface behind the ring in every declared mode.

**W5 — A readable-figure role.** Prices, catalog codes, ISBNs, phone numbers, invoice amounts, and
issue dates are painted as ordinary body text today, so figures a reader compares do not align.
Generate one utility through Bootstrap's Utilities API setting `font-variant-numeric: tabular-nums`.
Generate it; do not hand-author a class that duplicates a shipped utility. Applying it to views is
unit 6 and 7 work — return the class name in your report.

**W6 — The Sass entry.** `index.scss` reaches Bootstrap through `@import`, which Sass deprecates.
Migrate the entry and the partials to `@use`. **A mechanical replacement loses the configured navy**
— the current file relies on `@import` ordering to seed Bootstrap's `!default` variables, so the
configuration must travel through `@use ... with (...)` or an equivalent that preserves it. Prove
the identity survived by comparing generated CSS before and after for the configured colors, not by
reading the source. Bootstrap's own internal imports remain and are not yours to fix, so do not
promise a warning-free build — report the remaining count honestly.

**W7 — Settle the theme-repaint question.** `finding-theme-repaint.md` reports that toggling the
mode may leave the masthead painted for the previous mode, and records that the instrument used
could not be trusted. Settle it in real Chromium: mount the shipped surface, read the computed
`color` of a masthead `.nav-link`, call `app.theme(...)` to flip the mode live, and read it again.

- If the painted color tracks the mode, the finding is an instrument artifact. Say so with the
  readings, and add the proof anyway — no declared family drives a live mode change today.
- If it does not track the mode, that is a real defect at 1.35:1 against navy. Repair it and prove
  the repair by toggling, never by reloading. Three fix directions were tried on the discredited
  instrument and establish nothing either way: declaring `--bs-navbar-color` per mode, declaring
  `color` directly per mode, and disabling `backdrop-filter` on `.masthead`. Re-measure rather than
  trusting any of them.

## Unknowns

- Whether W6's configuration can travel through `@use ... with (...)` given the `--rn-*` custom
  properties in `_tokens.scss` also depend on the Sass variables. Establish it and report the shape.
- Whether W4's widened ring selector collides with any component that owns its own focus treatment.
  Measure rather than assume.
- W7's outcome. The Orchestrator has not settled it and will not pre-judge it.

## Scope

**Owned files:**

- `app/browser/styles/index.scss`, `_tokens.scss`, `_theme.scss`, `_signature.scss`, `_mixins.scss`
- `tests/app/browser/styles/*.test.ts`
- One new proof file under `tests/app/browser/styles/` if W7 needs its own

**Shared, report-only — return an exact patch, do not edit:**

- `app/browser/components/HomeView.vue` — the chip markup W3 orphans, and the preview panel's
  `shadow-lg` in W2
- `app/browser/components/MagazineView.vue`, `ShopView.vue` — the `rounded-pill` classes in W1

**Off-limits — do not edit, for any reason:**

- Every `.vue` file. You return patches; units 6, 7, and 8 apply them.
- `app/core/`, `app/browser/types.ts`, `ApplicationController.ts`, `App.vue`, `constants.ts`,
  `helpers.ts`
- `tests/app/browser/integration.test.ts`, `tests/app/browser/setup.ts` — unit 9 owns them
- `tests/setupPolicy.ts`, `tests/policy.test.ts` — restored by `scaffold repair`
- `vite.config.ts`, `package.json`, `.orkestrel/`, `tmp/authority/`, `node_modules/`, `dist/`

You are the sole writer in this checkout. Run no `git checkout`, `git restore`, `git stash`,
`git reset`, or `git clean`. Do not commit, push, or install anything. Do not run a tree-wide
`format` or lint `--fix`; validate read-only and scoped to your owned files.

## Execution

You are the bench engine reading this brief inside your own CLI session. Perform this assignment
directly. Spawn nothing.

## Acceptance criteria

Ordered cheap-first.

1. `npx oxfmt --config .oxfmtrc.json --check <your owned files>` reports correct format.
2. `npx oxlint --config .oxlintrc.json --deny-warnings <your owned files>` is clean.
3. `npm run check` passes.
4. No `style` attribute is introduced anywhere, no SFC `<style>` block is opened, and no authored
   rule duplicates a shipped utility. Every rule you keep at the authored rung is named in your
   report with the gap it fills.
5. W5's utility is generated through the Utilities API and its emitted rule is verified present in
   the built CSS.
6. W6: the built CSS still carries the configured navy, gold, and every configured emphasis, subtle,
   and border value, proven by comparing generated output before and after. The remaining
   deprecation-warning count is reported as a number.
7. W7 is settled with readings from a live toggle, and either repaired or recorded as an instrument
   artifact, with a proof that drives a live mode change either way.
8. `npm run test:app:browser` passes.
9. `npm run build` succeeds.
10. `npm run test:journey` is no worse than at your baseline. Report the per-project result; the
    Orchestrator owns the authoritative reading.

**Observations, not criteria:** the `npm test` wall-clock duration, and any journey result you
cannot attribute to your own change.

## Deviation contract

A conflict with the objective stops you: report expected, found, exact evidence, done or not done,
and at most one hypothesis. Do not edit a `.vue` file. Do not widen the identity. Do not add a
package.

Where a detail is ancillary — which partial a rule lives in, how a comment reads — decide it, record
it, and carry on.

## Output

Write your report to `tmp/units/u4-report.md` in this checkout, and make your final message the same
content. Sections:

1. **Done / not done**, one line each, against the acceptance criteria by number.
2. **W1 to W7**, each with what you changed, the rung you used, and the evidence.
3. **W7's verdict** — the readings, and whether the defect is real.
4. **Patches for files you do not own** — exact, per file, or none.
5. **The authored rung** — every authored rule that survives, with the gap it fills.
6. **Observations.**
7. **What you did not close**, and why.

No process diary.
