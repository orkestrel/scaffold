# Unit flip-probe — Tailwind flip probes P1 to P9

## Role and engine

astra on GPT-6 Astra (effort high), reached as `codex exec` at `danger-full-access`. Executor: BENCH_ENGINE. You are the sole writer in `/home/user/veneer`.

## Objective

Run probes P1 to P9 of the Tailwind flip against `/home/user/veneer` (branch `ccr-d15a48b1-yyyll6` at `d0603b4`, clean, dependencies installed, `npm run build` done), each exiting 0 and each run twice with byte-identical output, and write `tmp/probes/flip2/report.md` with every expected reading beside its measured reading. Touch no tracked file except in P9, which restores its one edit. `git status --porcelain` must print nothing at the end.

## Context

- **Evidence.** Read in this order, all under `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/`: `design-verdict.md` (§ 8 item 1 and § 9 define this unit; read §§ 2 to 5 for the mechanism, the curation, and the showcase), `measurements.md` (M1 to M6), `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design/proposal-consumer-proof.md` § 5 (the `TAILWIND_READINGS` seed table, 21 rows), and the probe scripts in `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/probes/` (copy their methods; do not import them).
- **Methods to copy.**
  - Launch Chromium with `chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })`; the default launch fails on this host. Record `browser.version()`.
  - Read longhands by iterating the computed style's indexed names (`for i < cs.length: cs[i]`), never a fixed list. Read `::before`, `::after`, `::marker`, `::placeholder`, `::backdrop` as the showcase reads them: method of `readSurface` in `/home/user/veneer/tests/setupBrowser.ts`.
  - Flatten a sheet in CSSOM to rows `(context, selector, property, value, priority)`; context is the enclosing `@layer`, `@media`, `@supports` chain.
  - Compile real Tailwind with `compile` from `tailwindcss`, resolving `tailwindcss` from `/home/user/veneer/node_modules/tailwindcss/index.css`, as `compileRecipe` does in `/home/user/veneer/tests/setupServer.ts`. Candidates come from `/home/user/veneer/app/browser/recipe.json`; the recipe input is the order statement, `@import 'tailwindcss';`, `@import '@orkestrel/veneer/tailwindcss';`, with the Veneer import resolved to the scratch sheet.
  - Serve `/home/user/veneer/dist/app/browser` with a `node:http` loopback static server on port 0.
- **Law.** `AGENTS.md` non-negotiables that bind a probe: scripts are TypeScript run by `node path/file.ts` (type stripping; no bash, PowerShell, or Python); no `any`, no `as`, no non-null `!`, no `@ts-*` directives; add no npm package. Probes live under `tmp/` and may import `playwright`, `sass`, and `tailwindcss` from `/home/user/veneer/node_modules` (import by absolute path or resolve with `createRequire`); they import nothing from `src/` or `app/`. `.claude/rules/writing.md` for the report prose: plain, lead with the finding, numbers only with their run.
- **Installed primitives.** `playwright`, `sass`, `tailwindcss` in `/home/user/veneer/node_modules`. Nothing else.
- **Host.** Linux POSIX shell. Run from `/home/user/veneer`. Put `/home/user/.wave/npm11/node_modules/.bin` first on `PATH` (npm 11). Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Sandbox `danger-full-access` (Chromium and the loopback server need it); no network, installs, or commits. A nested `git` inside the sandbox may report "not a git repository": do not diagnose that; your own `git status --porcelain` is the authority. The record writers under `tmp/units/` are absent on this host: do not look for them.
- **Standing conditions.** Tree clean at start. `tmp/` is ignored. No known failing command except as P9 records.

## Unknowns

Every reading is a hypothesis with an expected value. When a reading differs from its expected value, record both in the report and continue; a difference is a result, not a failure of the probe (exit 0 still). A Sass or Tailwind error is a result: record the exact message. Report every semantics hazard met in P1.

## Scope

- **Owned.** `/home/user/veneer/tmp/probes/flip2/**` (create). In P9 only, `/home/user/veneer/src/tailwindcss/_tokens.scss`, edited and restored.
- **Shared (report-only).** none.
- **Off-limits.** Every other file, tracked or not. Never `git stash`, `git add`, `git commit`, `git reset`, or `git checkout` except `git checkout -- src/tailwindcss/_tokens.scss` in P9. No install, no push, no credential, no destructive command, no tree-wide mutating gate (`npm run lint`, `npm run format`).
- **Made false by this change.** none.
- **Tools and limits.** `node`, `npm run lint:check`, `npm run format:check`, `npm run test:policy`, `npm run build:src:tailwindcss` (P9 only), Chromium through Playwright, a loopback server.

## Execution

Perform the assignment yourself and spawn nothing. Layout: `tmp/probes/flip2/p1.ts` ... `p9.ts`, shared helpers in `tmp/probes/flip2/lib.ts`, outputs in `tmp/probes/flip2/out/pN.json` (stable key order, no timestamps, no durations inside the byte-compared output; put durations and the Chromium version in the report only), sheets in `tmp/probes/flip2/sheets/`, the Sass copy in `tmp/probes/flip2/sass/`. Run each probe twice and compare the two outputs byte for byte (`cmp`); a nondeterministic reading is itself reported.

### P1 the Sass hook, prototyped on a copy

1. Copy `/home/user/veneer/src/bootstrap/*.scss` and its folders to `tmp/probes/flip2/sass/bootstrap/`. Create the `_tokens.scss` under the sass copy tailwindcss folder and `index.scss` per verdict § 2: in the copied `_mixins.scss` add `!default` switches `$withhold: ()`, `$reset: false`, `$curated: ()`, `$restored: ()`; a `reboot` mixin (wraps `@content` in `@layer reset` when `$reset`, else through the existing `layer` mixin); a `curate` mixin emitting, after each reboot rule, a copy inside the `bootstrap` layer whose selector is `restrict(&, $curated)`; a `restrict` function on `selector.unify` that keeps every class compound (`.h1`) and restricts every element compound to `TAG:where(.CLASS, ...)` so a pseudo-element keeps its place (`*:where(.card-text)::before`) and returns nothing when no compound remains; a `restore` mixin emitting `$restored` (selector to longhands) as `revert` inside `bootstrap`; and the `utility` mixin skipping the exact `.NAME` rule (and its `local-vars` half) of each `$withhold` name. In the copied `_reset.scss`: `@include reboot` instead of `@include layer`, `@include curate` around each rule's declarations, `@if not $reset` around the `[hidden]` rule, `@include restore` at the end. In the copied `_tokens.scss`: configure the four switches as `$layered` is configured, and `@error` on `$reset: true` with `$layered: false`. `tailwindcss/_tokens.scss` declares `$shared` (the 192 shared utility names, sorted by code unit; derive them from `/home/user/veneer/tests/**/comparison.json` or the repository record that names the shared set, and report the path used), `$curation`, `$defaults`, then `@use '../bootstrap/tokens' with (...)`. `tailwindcss/index.scss` loads `tokens`, then the bootstrap `reset`, `elements`, `components`, `utilities`.
2. Digests: compile the copy with `$layered: false` and with defaults, and compile the tracked `/home/user/veneer/src/bootstrap/index.scss` the same two ways; compare SHA-256 of each pair (expected equal). Control: plant one declaration in the copy; the digest must change.
3. Compile the tuned configuration (`$withhold: $shared`, `$reset: true`, `$curated: (card-text, modal-title)`, `$restored: ('svg:where(.bi)': (display,))`) to `tmp/probes/flip2/sheets/tuned.css`. Read it in Chromium CSSOM and check:
   - the `reset` layer block holds the lifted reboot's rules minus `[hidden]` (expected 74 of 75), as a multiset and in order;
   - copy selectors equal the `restrict` table of verdict § 2: `h1:where(.card-text, .modal-title), .h1`; `*:where(.card-text, .modal-title)::before`; `ol ul:where(.card-text, .modal-title)`; a rule with no class and no curated element produces no copy;
   - each copy sits directly after its original in the whole-sheet sequence and before every component rule;
   - no `.mt-3` rule and none of the 199 withheld rules remain (192 unlayered important rules, 7 layered `--bs-*-opacity: 1` halves of `bg-black`, `bg-transparent`, `bg-white`, `border-black`, `border-white`, `text-black`, `text-white`);
   - the `[hidden]` important rule is absent and the datalist indicator important rule is unlayered.
4. Report every Sass hazard met with the exact error or output: module configuration order, `@use ... with` on an already loaded module, `selector.unify` with pseudo-elements and `:not()`, Sass moving a lifted media rule after its block.

### P2 the recipe over the scratch tuned sheet

Compile the three-line recipe with the Veneer import resolved to `tmp/probes/flip2/sheets/tuned.css` over the `recipe.json` candidates; write `recipe.css` under the sheets folder. Write the same input without the Veneer import to `unexcluded.css` under the sheets folder. Expected: `@layer properties;` first; no `.collapse`, `.container`, `.table`, `.col-1` rule inside `@layer utilities`; `.mt-3` present there; no `@source` in the output; the output flattened in CSSOM minus Tailwind's own `theme`, `base`, `utilities` blocks equals the flattened tuned sheet except the rewrites `measurements.md` § M6 names (the merged `.dropstart .dropdown-toggle::after` pair; empty layer blocks as statements). List every other difference.

### P3 the curation fixed point

Serve `/home/user/veneer/dist/app/browser` and load it at 1280x800 (and 390x844 for the navbar, offcanvas, collapse, modal, containers, and tables sections). Condition A is the page as served (Bootstrap face). Condition F replaces the page's `style#veneer-bootstrap` with a `style` holding `recipe.css` (layer face) after the page mounts. For every element under `main`, including the generated utility matrices, read every enumerable computed longhand and the five pseudo-elements, in light and dark (`data-bs-theme`), and with open states driven through the page's own controls for the tooltip, popover, dropdown, modal, offcanvas, and toast families (read `COMPONENT_TABLES` and the Live components section in `/home/user/veneer/tests/setupBrowser.ts` for triggers; wait for the shown events).

Classify every departure of F against A on an element carrying a `CLASS_NAMES.bootstrap.components` name (flatten `CLASS_NAMES.bootstrap` from `/home/user/veneer/dist/src/core/index.js`, string leaves only) by verdict R5, `attributeDeparture`: `utility` when a rule inside F's `utilities` layer matches the element (`Element.matches`, media and supports honored) and declares the longhand; `preflight` when a `base` rule does; `inherited` when the parent departs in the same longhand or in `font-size`; else `unattributed`. Exclusions: box and layout-resolved fields (`width`, `height`, insets, `perspective-origin`, `transform-origin`, and box readings), `tab-size`, `border-*-style` moving none to solid at 0px width, `list-style-*` off a list-item, the `text-decoration` shorthand.

For each `preflight` departure on a component-class element add a reboot row (the class joins `$curated`) when a reboot declaration for the tag declares the longhand, otherwise a restore row (`TAG:where(.CLASS) { L: revert }`). Recompile `tuned.css` and `recipe.css` and repeat until no breaking departure remains or 3 iterations pass; keep each iteration's sheets (`tuned.iN.css`, `recipe.iN.css`). Deliver `tmp/probes/flip2/curation.json` (rows: form, class or selector, longhands, witness element, reading A, reading F) and the residuals. Expected seed (verdict § 4): reboot rows `modal-title`, `card-title`, `card-text`, `accordion-header`, `pagination`, `placeholder-glow`, `stretched-link`, `visually-hidden-focusable`, and the link classes (`alert-link`, `card-link`, `icon-link`, the `link-*` family); restore rows `svg:where(.bi)` `display` and `vertical-align`, `img:where(.figure-img)` `display`, `color` on `form-check-input`, `btn-check`, `form-range`. Report every row outside the seed, and every seed row not reproduced. Not rows: `.h5`, `.h6`, `.mark` (class compounds repair them), `list-group` `disc`, every shared-utility move. A sized image's `height` is an admitted row.

### P4 the chrome replacement

Under condition A, rewrite the chrome classes in the DOM per verdict § 5: `h-100` on specimen cards becomes `d-flex` on the `.col` and `flex-fill` on the card; card-body `w-100` becomes `flex-fill`; `gap-3` becomes `row-gap-3 column-gap-3`; `rounded` becomes `rounded-2`; `border` becomes `border-top border-end border-bottom border-start`. Read every element's longhands and boxes before and after at 1280 and 390 and report the departures (expected none). Clone one Stylesheets header button to read the header layout with three face buttons at 390 (report the header's boxes and whether it wraps).

### P5 every `TAILWIND_READINGS` triple

Read every row of the table in `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/tailwind-flip/design/proposal-consumer-proof.md` § 5 (the 21 rows and the grafts: `border-1` width, `rounded`, the `h5`/`.h5` pair, the `card-text`/bare `p` pair, `svg.bi` display, and `text-center text-md-start` at 768) under three faces at 1280 and 390: `bootstrap` (A), `unexcluded` (the `unexcluded.css` compile inserted before the Bootstrap sheet), `tailwindcss` (`recipe.css` alone, replacing the Bootstrap sheet). Where a specimen is absent from the shipped page, build it in a scratch page and say so. Table: specimen, longhand, width, expected triple, read triple.

### P6 Tailwind emissions

Compile the recipe over the candidates `hidden`, `collapse!`, `container!`, `col-6!`, `md:collapse`, `print:table` (alone and then added to the full set) and report what Tailwind emits for each. Then read `<div hidden="until-found" class="d-flex">` under the three faces: `display` and `content-visibility`.

### P7 engine inline styles

Under F open a dropdown, a popover, a tooltip, and a modal through the page's controls and read the Placement inline `margin`, `inset`, `width`, `position` on the panel, and Modal's `padding-right` on the body. Compare the inline style attributes and the computed values with A.

### P8 dark mode

At `data-bs-theme="dark"` read `border-*-color`, `box-shadow`, `border-radius`, `background-color`, and `color` on the chrome and on the `border`, `shadow`, `rounded`, `bg-white`, `bg-transparent`, and `text-white` specimens under the three faces.

### P9 toolchain reaction

Add one line to `/home/user/veneer/src/tailwindcss/_tokens.scss` after its statement: `@use '../bootstrap/tokens' with ($layered: true);`. Run `npm run lint:check`, `npm run format:check`, `npm run test:policy`, and `npm run build:src:tailwindcss` each to completion (do not stop at the first failure); record each exit code and the first error lines. Restore with `git checkout -- src/tailwindcss/_tokens.scss` (never `git stash`), then confirm `git status --porcelain` prints nothing. Restore even if a command fails or hangs (use a 10-minute timeout per command).

## Output

Write `tmp/probes/flip2/report.md`: a table per probe with every expected value beside its reading and a pass or differs mark, the Chromium version, the durations, the Sass hazards of P1, the curation iterations and residuals of P3, the byte-identity result of each probe's two runs, and `git status --porcelain` at the end. Your final message is the report it specifies: the probe-by-probe verdict (matches or differs, with the differing readings), the paths of `report.md` and `curation.json`, and anything you could not run, with the exact error. No process diary.

## Deviation contract

Stop and report (expected, found, evidence, done or not done, one hypothesis) when: a sandbox write is rejected (never try another write mechanism); the tracked tree is dirty at any point other than the P9 edit; Chromium cannot launch from the pinned path. Settle ancillary choices yourself and record them in the report: file layout under `tmp/probes/flip2/`, how a missing specimen is scratch-built, the wait condition for an open state, how the shared 192 are sourced.

## Acceptance criteria

1. Each of `p1.ts` to `p9.ts` exits 0.
2. Each probe run twice yields byte-identical output (`cmp` on the per-probe JSON files in the out folder).
3. `git status --porcelain` prints nothing; `tmp/probes/flip2/report.md` and `curation.json` exist.

**Observations, not criteria.** Wall time per probe; every differing reading; the P9 exit codes. The Orchestrator re-runs nothing tree-wide.

## Review evidence

`tmp/probes/flip2/report.md`, `tmp/probes/flip2/curation.json`, `tmp/probes/flip2/out/*.json`, the built sheets under `tmp/probes/flip2/sheets/`, and `git status --porcelain` at the end.
