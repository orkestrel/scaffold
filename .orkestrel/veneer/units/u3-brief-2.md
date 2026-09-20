# Unit U3 — successor brief 2: the audit round 1 fixes

## What changed and why

This brief supersedes `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief.md`
for the remainder of the unit; every section of that brief stands except where this one says
otherwise. The audit round on the tree you left (objective lane `analyst` on Astra, subjective
lane `reviewer` on Opus, `checker`) confirmed the registry, the cascade shape, the elements layer,
the carried obligations, and the guides' structure, and found the defects under § Execution. Each
item names the lane finding it carries. The verdict with the Orchestrator's rulings is
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-verdict.md`; the lane
reports are `u3-audit-analyst-report.md`, `u3-audit-reviewer-report.md`, and
`u3-audit-checker-report.md` beside it. Read the verdict's § Rulings before editing.

Since your run, the Orchestrator integrated your D3, D4, and D6 patches (`tests/distribution.test.ts`,
`guides/veneer.md` § Showcase, `configs/src/vite.styles.config.ts`), and re-vendored
`tests/setupPolicy.ts` and `tests/policy.test.ts` with a scaffold fix that admits a top-level guide
the workspace index links, so `test:policy` is green on `guides/tokens.md` (D1 closed).

## Role and engine

Unchanged: `opus` on native Opus 5. Perform the assignment directly and spawn nothing. You are
the sole writer in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`).

## Context

**The tree.** `HEAD` is `b661142`; the working tree carries the U3 edits and the integrations
named. Build on it; do not undo it. Your report is `u3-report.md`.

**Installed primitives to check before writing a helper.** `@orkestrel/test/browser` and
`@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/{browser,core,server}/index.d.ts`):
`splitTopLevelValues` is exported by `tests/setupStyles.ts` (yours); `parseCSSColor` and the
colour readers are in the browser entry; `postcss` is installed and already used by
`scanPhysicalDeclaration`. The installed Bootstrap stylesheet is
`node_modules/bootstrap/dist/css/bootstrap.css` (confirm the path; the digest your setup test pins
is over that file).

**Host.** Unchanged: Windows, Git Bash, `npm run <name>`, managed Chromium by default, Edge through
`PLAYWRIGHT_CHANNEL=msedge`; no install; no `scaffold repair`; no tree-wide `format` or lint
`--fix`; no `git` command that writes the index.

**Control identifiers.** `PLANT-REGISTER` (remove the `@property` registration of
`--vn-factor-density`; the invalid-factor case must redden), `PLANT-MEMBER` (swap one member of
`BOOTSTRAP_ROOT_VARIABLES` for a same-length fake name; the membership proof must redden),
`PLANT-ADDITION` (remove `--bs-primary` from the dark scope; the dark-partition proof must redden),
`PLANT-SCROLL` (add `scroll-margin-left: 1px` to `elements/_body.scss`; the direction sweep must
redden), `PLANT-COMBINATOR` (a `details + summary` rule in an elements partial; the pair rule must
redden). Name each test for what it proves, never for the control; remove every plant and prove
removal with `git diff --exit-code -- <file>` where the file is tracked, else by the absent text.

## Scope

**Owned.** Everything the original brief owns, plus `tests/setup.ts` for the exported registry
walk alone, and `guides/veneer.md` for its `## Surface` core rows only. **Off-limits.** Everything
else, including `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`,
`tests/distribution.test.ts`, `configs/**`, `src/browser/**`, `app/**`, `package.json`.

## Execution

Perform the assignment directly and spawn nothing. Cascade first, then setup modules, then
proofs, then the guide; run the narrowest project after each step.

1. **Value sources (reviewer 3, 26; analyst 3).** In `guides/tokens.md` § Reference map: source
   `--vn-space-1` as `derived` with the scale expression (the paddings the calibration measured
   trace rungs 2 to 8; rung 1 is the expression at N = 1); source each `--vn-stack-*` rung as
   `bootstrap` retained, naming the `$zindex-*` Sass variable it takes (the verdict's ruling);
   give `--vn-link-decoration` its retained reason; make every `derived` cell name the expression
   or the reading it targets (`--vn-focus-color`: the calibration's
   `oklab(0.48 -0.0266547 -0.253603 / 0.45)` or the `color-mix` that reproduces it;
   `--vn-link-base`: both modes).
2. **Cascade values (reviewer 17, 27).** Author the shadow tokens' colours as
   `rgba(var(--vn-palette-black-rgb), α)` over the existing alphas; author
   `--vn-focus-width: 0.1875rem`. Re-read the shadow and focus proofs against the calibration
   rows after the change (item 5 changes how they compare).
3. **Guide truth (reviewer 18, 19, 20, 21, 22, 23, 32; analyst 17, 18; checker H).** In
   `guides/tokens.md`: open with one sentence naming the published specifiers
   (`@orkestrel/veneer` for the registry, `@orkestrel/veneer/styles` for the cascade) and one
   stating where names and values live (`src/core/constants.ts` names; `src/styles/_tokens.scss`
   both value maps; `src/styles/_theme.scss` the scopes that apply them); add the member-shape
   rule (a member is a group exactly where the cascade declares more than one property for it,
   so `text.heading` is a leaf and `text.body.base` a leaf of a group); write the alpha example
   as `rgba(var(--vn-color-primary-rgb), 0.5)` (the triplet is comma-separated); in
   § Customization, declare `--vn-color-primary-rgb` beside `--vn-color-primary-base` in the
   fence, add the `[data-bs-theme='dark']` line that carries the brand into the dark island, and
   state that the tiers and the `--bs-*` aliases follow the base while the triplet is literal and
   is overridden alongside; move the two "recorded as agreement" rows out of the Departures table
   into a sentence after it; narrow the deferred row to the hint surface and the component-scoped
   tokens (the raised surface ships); delete the counts at `:10`, `:160`, `:167` and the one in
   `src/styles/_theme.scss:18`'s comment, naming the members instead. Keep `test:guides` green.
4. **Alias membership (analyst 5; reviewer 5).** In `tests/setupStyles.ts`, add an exported
   `readBootstrapVariables(scope)` that parses the installed `bootstrap.css` with `postcss` and
   returns, in source order, the custom property names declared in the `:root` (or
   `:root, [data-bs-theme=light]`) rule for `'root'` and in the `[data-bs-theme=dark]` rule for
   `'dark'`; in `tests/setupStyles.test.ts`, assert `BOOTSTRAP_ROOT_VARIABLES` and
   `BOOTSTRAP_DARK_VARIABLES` `toStrictEqual` those readings (keep the digest and version
   assertions); in `tests/src/styles/tokens.test.ts`, make the dark partition assertion equal to
   the dark list plus `THEME_DARK_ADDITIONS` with every member required. Run `PLANT-MEMBER` and
   `PLANT-ADDITION` red, then green.
5. **Proofs (analyst 7; reviewer 7).** Rewrite the invalid-factor case so the invalid value is set
   where the scale is declared (the document element) and the consuming property reads the
   registered initial value's result (`6px`), which an unregistered property cannot produce
   (`PLANT-REGISTER` red: removing the `@property` rule makes the declaration invalid at
   computed-value time). Compare the shadow assertion through parsed parts: split the
   `box-shadow` list with `splitTopLevelValues`, compare each colour through
   `matchesPaintedColor`, and each length as a number. Compare the forced-colors case's system
   colours through parsed colours.
6. **Shared infrastructure (analyst 14, 15; reviewer 24, 30).** Export the registry walk once:
   `collectTokenNodes` in `tests/setup.ts` (Node-safe, no cascade import), consumed by
   `tests/src/core/index.test.ts` and by `tests/setupStyles.ts` (`collectTokenNames` calls it or
   is replaced by it). Move `collectLayer`, `collectTripletGroups`, and every other local helper
   in `tests/src/styles/*.test.ts` and `tests/src/core/index.test.ts` into `tests/setupStyles.ts`
   as exports with a case each in `tests/setupStyles.test.ts` (DOM-free ones) or in the browser
   proof that uses them (DOM ones). Replace the three DOM builders (`buildSpecimen` twice,
   `buildBinding`) with one exported `mountSpecimen(markup)` in `tests/setupStyles.ts` that
   records what it mounts and one exported `resetSpecimens()` for `afterEach`. Add behavioural
   cases for `normalizeSelectorText` and the registry walk.
7. **Scanner reach (analyst 19, 20).** Add `scroll-margin-left`, `scroll-margin-right`,
   `scroll-padding-left`, `scroll-padding-right` to the physical longhands and `text-align-last`
   to the side-keyword properties, with cases; make `matchesLooseTagPair` count a pair only when
   two bare tags are joined by a descendant, child, or sibling combinator, treat a tag inside
   `:is()` or `:where()` as a tag, and treat `h1, p` as a list rather than a pair, with cases for
   `details + summary`, `:is(h1)+:is(p)`, and `h1, p`. Run `PLANT-SCROLL` and `PLANT-COMBINATOR`
   red, then green.
8. **Names (reviewer 8, 25, 29).** Rename the two `tests/setupStyles.test.ts` cases at `:119` and
   `:135` for the forms they cover; rename the `palette-each` mixin `role-each` with its callers
   and the guide.
9. **Transcription (reviewer 31).** If `@orkestrel/test/browser` exposes a helper that reads a
   workspace file through the runner (search the declaration entry for `readFile`), read the
   `css` fence out of `guides/tokens.md` in `tests/src/styles/integration.test.ts` and assert it
   equals `RECIPE`; otherwise delete the byte-for-byte claim from the TSDoc and the guide and say
   the proof executes the recipe the guide shows.
10. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:src`,
    `test:src:styles`, `test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`,
    `test:setup:browser`, `test:conformance`, `test:guides`; then
    `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` and `PLAYWRIGHT_CHANNEL=msedge npm run test:src`.
    Record each command's final lines.

## Output

Write `u3-report-2.md` and return its content: the diff summary per file; each control's
red assertion and green rerun; each gate command's final lines on both browsers; and every
deviation with expected, found, exact evidence, done or not done, and at most one hypothesis. Do
not restate the first report.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; a Bootstrap stylesheet whose dark rule is not a single `[data-bs-theme=dark]` block (report
its shape). Decide, record, and carry on from: helper placement within `tests/setupStyles.ts`,
case order, TSDoc and guide wording within the meaning fixed here.

## Acceptance criteria

1. `format:check`, `lint:check`, `check`, `build` exit 0.
2. Every test project exits 0 on managed Chromium; `test:src:styles` and `test:src` exit 0 on Edge.
3. Each of the five controls turned its named assertion red and every plant is removed.
4. `git status --porcelain` shows only owned files, the integrated patch sites, and the report.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the built
`dist/src/styles/index.css`.
