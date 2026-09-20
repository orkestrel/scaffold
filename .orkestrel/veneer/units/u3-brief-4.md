# Unit U3 — successor brief 4: one guide, and the audit round 1 fixes re-authored

## What changed and why

This brief supersedes `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief-3.md`,
which never ran. Brief 3 rested on a standing condition that no longer holds: it expected a
re-vendored prose policy that admits `guides/tokens.md` through a directory-index row. That policy
change is withdrawn (`units/u3-policy-withdrawal.md`). The user ruled on 2026-09-20 that a package
documents itself in one guide, `guides/<package>.md`, and never splits its documentation into
smaller guides; the vendored stray-guide rule that refused `guides/tokens.md` (your first report's
D1) was the convention doing its job, and the file was the drift. Every other item of brief 3
stands and is restated here so this brief reads alone. Every section of the original brief
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-brief.md`) stands except
where this brief says otherwise. The audit round's verdict is
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-verdict.md`; read its
§ Rulings before editing. The lane reports and the self-audit's surviving findings are beside it
(`units/u3-audit-analyst-report.md`, `units/u3-audit-reviewer-report.md`,
`units/u3-audit-checker-report.md`, `units/self-audit-findings.md`, all under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/`).

Where a test file's helpers move, re-author that file around the shared modules rather than
patching it: the user has asked for a foundation, not a patched one.

## Role and engine

`opus` on native Opus 5. Perform the assignment directly and spawn nothing. You are the sole
writer in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`).

## Law

Veneer's own `AGENTS.md` says its law resolves against the scaffold checkout beside it. Before
editing, read completely: `C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`;
`C:/Users/mikes/WebstormProjects/scaffold/.agents/orchestration.md` § Permission floor; every rule
under `C:/Users/mikes/WebstormProjects/scaffold/.claude/rules/` that the rule map names for the
files you touch — `names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `tests.md`,
`workspace.md`, `styles.md`, `portability.md`, `documentation.md`, `writing.md`, `quality.md`;
and Veneer's `guides/README.md` and `guides/veneer.md`. `styles.md` carries the clause the audit
asked for: the one file a literal color may appear in is `_tokens.scss`, where the token itself is
declared. `documentation.md` fixes the guide contract this brief enforces: one guide per package,
parity between the guide and the exports, and never a weakened gate.

## Context

**The tree.** `HEAD` is `b661142`; the working tree carries the U3 edits and the Orchestrator's
integration of the first report's D3, D4, and D6 patches (`tests/distribution.test.ts`,
`guides/veneer.md` § Showcase, `configs/src/vite.styles.config.ts`). Build on it; do not undo it.
Your first report is `u3-report.md`.

**Standing condition: the policy gate.** `npm run test:policy` is red when you start, on exactly
two cases, both naming `guides/tokens.md` as a stray guide (the Orchestrator's reading is
`units/veneer-policy-before.log.txt` beside the retained records). Do not diagnose it and do not
touch `tests/setupPolicy.ts` or `tests/policy.test.ts`: item 1 closes it by removing the file.
The Orchestrator installed the scaffold tip's tarball `--no-save` over the registry `^0.0.75` and
ran `repair --offline` before launching you, so the vendored files carry the tip's digests; if
`git status --porcelain` lists a vendored path you did not touch, report it and leave it.

**The Bootstrap oracle, measured on this host.** `node_modules/bootstrap/dist/css/bootstrap.css`
exists. Parsed with `postcss` and walking every rule with the selector whitespace collapsed: rules
whose selector matches `/^:root(,|$| )/` declare, in source order and deduplicated, exactly the
127 names of `BOOTSTRAP_ROOT_VARIABLES`; rules whose selector matches `/^\[data-bs-theme=dark\]/`
declare exactly the 61 names of `BOOTSTRAP_DARK_VARIABLES`. The dark predicate is anchored, so
`.navbar-dark, .navbar[data-bs-theme=dark]` and its `--bs-navbar-*` declarations are excluded. The
dark set comes from the theme block, two later `[data-bs-theme=dark]` blocks carrying the
close-button and carousel values (which have a light counterpart), and the nested component rules
whose image-valued variables have none.

**Setup modules and projects.** `tests/setup.ts` is Node-safe and loaded by every project
(`vite.config.ts:117,153,188,271,285,304`). `tests/setupBrowser.ts` imports
`@orkestrel/test/browser`, which imports `vitest/browser` at module scope, so it loads in browser
projects alone (`src:browser`, `app:browser`). `tests/setupStyles.ts` is loaded by the Node
`setup` project's proof and by the `src:styles` project; it imports `postcss` and the built
cascade. Whether `configs/src/vite.styles.config.ts` lists `tests/setupBrowser.ts` in its
`setupFiles` is an unknown below.

**Installed primitives.** `@orkestrel/test/browser` at `0.0.18` from the U6 tarball: `readRules`,
`findRule`, `readRootToken`, `readStyle` and `readPixels` (each with a `pseudo` argument),
`parseCSSColor`, `mount`, `build`, `extractStyles`, `waitForAnimations`, `hoverAccessible`,
`holdAccessible`, `releasePointer`, `stageMedia`, `releaseMedia`, `sendProtocol`, and no helper
that reads a workspace file (read `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
before writing a helper). `splitTopLevelValues` is exported by `tests/setupStyles.ts`.

**Host.** Windows, Git Bash, `npm run <name>`, managed Chromium by default, Edge through
`PLAYWRIGHT_CHANNEL=msedge`; no install; no `scaffold repair`; no tree-wide `format` or lint
`--fix`; no `git` command that writes the index or discards a change.

**Control identifiers.** `PLANT-REGISTER` (remove the `@property` registration of
`--vn-factor-density`; the invalid-factor case must redden), `PLANT-MEMBER` (swap one member of
`BOOTSTRAP_ROOT_VARIABLES` for a same-length fake; the membership proof must redden),
`PLANT-ADDITION` (remove `--bs-primary` from the dark scope; the dark-partition proof must
redden), `PLANT-VALUE` (change one `bootstrap`-sourced token's value; the oracle-value proof must
redden), `PLANT-SCROLL` (add `scroll-margin-left: 1px` to `elements/_body.scss`; the direction
sweep must redden), `PLANT-COMBINATOR` (a `details + summary` rule in an elements partial; the
pair rule must redden), `PLANT-TIER` (change one tier percentage in the mixin; the painted tier
proof must redden). Name each test for what it proves, never for the control. Prove each plant's
removal by the absent text, or by diffing the file against a copy you took before planting; every
tracked file already differs from `HEAD`, so `git diff --exit-code` proves nothing here.

## Unknowns

- Whether `configs/src/vite.styles.config.ts` lists `tests/setupBrowser.ts` among its
  `setupFiles`. Read it first; if not, add it (that file is granted for that line alone) and
  report the line.
- Whether `box-shadow` authored in `rem` at Elements' values resolves at the 16 px root to the
  calibration's px strings on both engines. Read it in the values proof and report the raw
  readings; if a row differs, report the row and do not adjust the token.
- Whether the tier mixin's `color-mix(in oklab, …)` results match `matchesPaintedColor` against
  the calibration tiers within its tolerance on Edge as well as Chromium. Report the readings.
- Whether `tests/guides.test.ts` (through `@orkestrel/guide`) constrains which H2 sections
  `guides/veneer.md` carries. Scaffold's own `guides/scaffold.md` carries many beyond `Surface`,
  `Methods`, `Examples`, and `Tests` and passes its gate, so the expectation is that it does not;
  read `tests/guides.test.ts` and the installed `@orkestrel/guide` declarations first, and report
  what constrains the section set.

## Scope

**Owned.** Everything the original brief owns except `guides/tokens.md` (which this brief
deletes), plus: `guides/veneer.md` in full; `guides/README.md` (the sentence at line 17 and the
`src/styles` row at line 31); `README.md` (the sentence at line 27); `tests/setup.ts` (the
registry walk alone); `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts` (the DOM specimen
builder, the painted colour helpers, and their cases); `configs/src/vite.styles.config.ts` (the
`setupFiles` line alone, per the unknown). **Shared (report-only).** `package.json`;
`tests/guides.test.ts` (return a patch if `MODULES` needs a change). **Off-limits.** Everything
else, including every path `scaffold repair` restores (`tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/setupConformance*.ts`, `.claude/**`, `scripts/**`, `AGENTS.md`,
`CLAUDE.md`), `tests/config.test.ts`, `tests/distribution.test.ts`, `src/browser/**`, `app/**`.

## Execution

Perform the assignment directly and spawn nothing. The guide fold first (it turns the policy gate
green and every later item edits the folded text), then the cascade, then the setup modules, then
the proofs (re-authored around the modules), then the guide's rows; run the narrowest project
after each step.

1. **One guide.** Move every section of `guides/tokens.md` into `guides/veneer.md` under one
   `## Tokens` heading — `### Reference map` with its group subsections, `### Bootstrap variables
   Veneer retains`, `### Customization`, `### Departures from Bootstrap`, `### Deferred names` —
   placed after `## Examples` and before `## Showcase`; fold the old file's `## Tests` links into
   the guide's existing `## Tests`; rewrite the old file's opening (the specifiers and where names
   and values live, per item 4) as the `## Tokens` lead paragraph. Delete `guides/tokens.md`.
   Point the map's `src/styles` row (`guides/README.md:31`) at `veneer.md` and rewrite the
   sentence at `guides/README.md:17` and the README sentence at `README.md:27` to name
   `guides/veneer.md` § Tokens. Every relative link the moved text carried must resolve from its
   new home. `npm run test:policy` and `npm run test:guides` exit 0 at the end of this item; record
   both readings.
2. **Value sources (reviewer 3, 26; analyst 3).** In § Reference map: source `--vn-space-1` as
   `derived` with the scale expression (the calibration's paddings trace the other rungs; rung 1 is
   the expression at N = 1); source each `--vn-stack-*` rung as `bootstrap` retained, naming the
   `$zindex-*` Sass variable it takes (the verdict's ruling); give `--vn-link-decoration` its
   retained reason; make every `derived` cell name the expression or the reading it targets
   (`--vn-focus-color`: the calibration's `oklab(0.48 -0.0266547 -0.253603 / 0.45)` or the
   `color-mix` that reproduces it; `--vn-link-base`: both modes).
3. **Cascade values (reviewer 17, 27; self-audit 5, 6, 13).** Author the shadow tokens' colours
   as `rgba(var(--vn-palette-black-rgb), α)` over the existing alphas, and their offsets, blurs,
   and spreads in `rem` at Elements' own values (`0.0625rem`, `0.125rem`, `0.1875rem`, `0.25rem`,
   `0.5rem`, `1rem`, `1.5rem`, `2.75rem`, `-0.25rem`, `-0.5rem`), keeping the
   `var(--vn-factor-elevation)` multiplier; author `--vn-focus-width: 0.1875rem`. Update every
   guide row that publishes those values (the elevation rows, the focus row, and the Departures
   row that quotes `inset 0 1px 2px rgba(0, 0, 0, 0.075)`) to the authored value; no gate reads a
   token row's value, so the acceptance criterion for this item is a named re-read of those rows
   against `_tokens.scss`. Add a Departures row for `--vn-font-sans` through
   `--bs-font-sans-serif`, giving Veneer's stack and Bootstrap 5.3.8's and naming the families
   Veneer drops.
4. **Guide truth (reviewer 18, 19, 20, 21, 22, 23, 32; analyst 17, 18; checker H; self-audit 2,
   19, 20, 27).** In § Tokens: open with one sentence naming the published specifiers
   (`@orkestrel/veneer` for the registry, `@orkestrel/veneer/styles` for the cascade) and one
   stating where names and values live (`src/core/constants.ts` names; `src/styles/_tokens.scss`
   both value maps; `src/styles/_theme.scss` the scopes that apply them); add the member-shape
   rule (a member is a group exactly where the cascade declares more than one property for it);
   write the alpha example as `rgba(var(--vn-color-primary-rgb), 0.5)`; in § Customization,
   declare `--vn-color-primary-rgb` beside `--vn-color-primary-base` in the fence, add the
   `[data-bs-theme='dark']` line that carries the brand into the dark island, state that the tiers
   and the `--bs-*` aliases follow the base while the triplet is literal and overridden alongside,
   and have `tests/src/styles/integration.test.ts` read the emphasis and border tiers and the
   dark-island reading so the sentence is proved (or narrow the sentence to what the proof reads);
   move the "recorded as agreement" rows out of the Departures table into a sentence after it;
   narrow the deferred row to the hint surface and the component-scoped tokens; delete every
   count phrase in the guide and in `src/styles/_theme.scss`'s comment (the sentences that open
   "Four root variables", "five image-valued variables", "Two Elements behaviors", and "one of
   three sources"), naming the members instead — the rule, not the line numbers, is the
   instruction; record as a bound that `interpolate-size: allow-keywords` is proved present and
   its interpolation is proved by the first animated consumer (the disclosure or drawer unit).
   Keep `test:guides` green.
5. **The Bootstrap oracle (analyst 5; reviewer 5 and referral; self-audit 7, 11, 29, 30).** In
   `tests/setupStyles.ts`, add an exported `readBootstrapVariables(scope)` that parses the
   installed `bootstrap.css` with `postcss`, walks every rule, and returns, in source order and
   deduplicated, each declaration's name and value from the rules whose collapsed selector
   matches `/^:root(,|$| )/` for `'root'` and `/^\[data-bs-theme=dark\]/` for `'dark'` (the
   measured predicates; keep the dark one anchored). In `tests/setupStyles.test.ts`, assert
   `BOOTSTRAP_ROOT_VARIABLES` and `BOOTSTRAP_DARK_VARIABLES` `toStrictEqual` the readings' names
   (keep the digest and version assertions); rewrite the two constants' TSDoc to describe what the
   reading shows (the root list is the union of every `:root`-prefixed rule, repeated on
   `[data-bs-theme=light]` except the `--bs-breakpoint-*` rung; the dark list is every rule whose
   selector begins `[data-bs-theme=dark]`, the navbar rule excluded by name). In
   `tests/src/styles/tokens.test.ts`, make the dark partition equal to the dark list plus
   `THEME_DARK_ADDITIONS` with every member required, and add a case asserting that every token
   § Reference map sources `bootstrap` resolves in the browser to the value the oracle carries
   for its alias (through the custom property read, comparing colours through parsed colours and
   lengths as numbers), so a Bootstrap bump or a drifted retained value reddens; drive the
   Departures rows' Bootstrap column from the same reading. Run `PLANT-MEMBER`, `PLANT-ADDITION`,
   and `PLANT-VALUE` red, then green.
6. **Proofs (analyst 7; reviewer 7; self-audit 8, 9).** Rewrite the invalid-factor case so the
   invalid value is set where the scale is declared (the document element) and the consuming
   property reads the registered initial value's result (`6px`), which an unregistered property
   cannot produce (`PLANT-REGISTER` red). Compare the shadow assertion through parsed parts
   (`splitTopLevelValues`, `matchesPaintedColor` for colours, numbers for lengths). Compare the
   forced-colors case's system colours through parsed colours. Add one case per remaining factor
   that sets it on the document element and reads the rescaled result through a consuming
   property (`border-top-left-radius` for radius, the parsed `box-shadow` lengths for elevation,
   `transition-duration` for motion), then restores it and reads the neutral result. Prove the
   tier mixin through paint: give the fixture a probe base colour and a known surface, mount a
   specimen, and assert each tier resolves through `matchesPaintedColor` to the colour the mix
   percentages produce, keeping the declaration-text assertion only as a presence guard
   (`PLANT-TIER` red). Where a proof drives hover, press, print, or reduced motion, use the
   installed `hoverAccessible`, `holdAccessible`, `releasePointer`, `stageMedia`, and
   `releaseMedia` rather than a local CDP call.
7. **Shared infrastructure, re-authored (analyst 14, 15; reviewer 24, 30; self-audit 12).** Put
   each helper in the module the rules name and re-author the proofs around them:
   `tests/setup.ts` gains the exported registry walk (`collectTokenNodes`), consumed by
   `tests/src/core/index.test.ts` and by `tests/setupStyles.ts`; `tests/setupBrowser.ts` gains
   the DOM specimen builder (`mountSpecimen(markup)` recording what it mounts, `resetSpecimens()`
   for `afterEach`) and the painted-colour helpers (`readPaintedColor`, `matchesPaintedColor`),
   each with a case in `tests/setupBrowser.test.ts`; `tests/setupStyles.ts` keeps the Node-safe
   cascade readers, the oracle, and the collectors (`collectLayer`, `collectTripletGroups`, and
   every other helper the style proofs declared locally), each with a case in
   `tests/setupStyles.test.ts`; delete `tests/src/styles/fixtures/colors.ts`. No proof file
   declares a module-scope helper. Add behavioural cases for `normalizeSelectorText` and the
   registry walk.
8. **Scanner reach (analyst 19, 20).** Add `scroll-margin-left`, `scroll-margin-right`,
   `scroll-padding-left`, `scroll-padding-right` to the physical longhands and `text-align-last`
   to the side-keyword properties, with cases; make `matchesLooseTagPair` count a pair only when
   two bare tags are joined by a descendant, child, or sibling combinator, treat a tag inside
   `:is()` or `:where()` as a tag, and treat `h1, p` as a list, with cases for `details + summary`,
   `:is(h1)+:is(p)`, and `h1, p`. Run `PLANT-SCROLL` and `PLANT-COMBINATOR` red, then green.
9. **Names (reviewer 8, 25, 29; self-audit 37).** Rename the two `tests/setupStyles.test.ts` cases
   that name "the objective lane edge forms" for the forms they cover; rename the `palette-each`
   mixin `role-each` at its measured sites (`src/styles/_mixins.scss` where it is declared and
   included, and `tests/src/styles/fixtures/mixins.scss`), sweeping `src/`, `tests/`, and
   `guides/` for the old name afterwards.
10. **Transcription (reviewer 31).** No installed primitive reads a workspace file from browser
    mode, so delete the byte-for-byte claim from the integration proof's TSDoc and the guide, and
    say the proof executes the recipe the guide shows.
11. **Gates.** `npm run format:check`, `lint:check`, `check`, `build`, then `test:src`,
    `test:src:styles`, `test:app`, `test:journey`, `test:policy`, `test:config`, `test:setup`,
    `test:setup:browser`, `test:conformance`, `test:guides`; then
    `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles` and `PLAYWRIGHT_CHANNEL=msedge npm run test:src`.
    Record each command's final lines. `test:distribution` needs the registry; the Orchestrator
    runs it.

## Output

Write `u3-report-2.md` and return its content: the diff summary per file; the guide
fold's readings (`test:policy` and `test:guides` after item 1); each control's red assertion and
green rerun with the removal proof; the unknowns' readings; the re-read of the guide rows item 3
names against `_tokens.scss`; each gate command's final lines on both browsers; and every
deviation with expected, found, exact evidence, done or not done, and at most one hypothesis. Do
not restate the first report.

## Deviation contract

Stop and report on: a gate red after your own fix inside owned files; a need to edit an off-limits
file; a Bootstrap reading that does not reproduce the retained lists with the predicates above
(report the selector set you found); a calibration row a `rem`-authored shadow no longer
reproduces on both engines; a guide gate that refuses the `## Tokens` section set (report what it
refuses; do not weaken the gate). Decide, record, and carry on from: the placement and headings of
the token sections within the meaning fixed here, helper placement within a granted module, case
order, TSDoc and guide wording, the fixture stylesheet's shape.

## Acceptance criteria

1. `guides/tokens.md` is absent; `guides/README.md` and `README.md` name no `tokens.md`;
   `npm run test:policy` exits 0.
2. `format:check`, `lint:check`, `check`, `build` exit 0.
3. Every test project exits 0 on managed Chromium; `test:src:styles` and `test:src` exit 0 on Edge.
4. Every control named in § Control identifiers turned its named assertion red and every plant is
   removed, each removal proved as this brief states.
5. Every guide row item 3 names carries the authored value (the re-read in the report).
6. No proof file declares a module-scope helper; `tests/src/styles/fixtures/colors.ts` is gone.
7. `git status --porcelain` shows only owned files, the granted files, the integrated patch sites,
   and the report.

## Review evidence

The actual `git diff` and `git status --porcelain` at return; the report; the built
`dist/src/styles/index.css`; `guides/veneer.md` as folded.
