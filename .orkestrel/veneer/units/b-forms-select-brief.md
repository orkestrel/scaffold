# Unit B-FORMS-SELECT — brief

## Role and engine

`opus` on Opus (the `opus` alias; the CLI serves Opus 5), sole writer in the Veneer worktree
`/home/user/veneer-bfs`, detached at `2c10329` (Veneer `main` with the whole B-PASSIVE family,
B-FORMS-VALIDATION, and B-FORMS-RANGE landed), with its own `node_modules`. B-FORMS-GROUP,
B-FORMS-CHECK, and B-FORMS-FLOATING run in their own worktrees and F8c-B MOVE in
`/home/user/veneer-f8b`; write nothing outside `/home/user/veneer-bfs`. Use absolute paths under
`/home/user/veneer-bfs` for every command and file, and run every npm and npx command from there;
your shell may start elsewhere. Perform the assignment directly and spawn nothing. Do not commit,
push, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo a
transient plant by the exact reverse edit.

## Objective

The key `form-select` ships as a Bootstrap 5.3.8 baseline under the accounting gates,
self-contained: the `_form-select.scss` partial (the select, its caret images in both modes, the
focus and disabled states, the multiple and sized forms, the `-sm` and `-lg` sizes, the Gecko focus
ring reset, the reduced-motion twin), its proof, showcase section, capture scenarios, compatibility
rows, shipped-list entry, deferral strikes, and departure rows.

## Context

- **Ruling.** `/home/user/veneer-bfs/tmp/units/b-forms-design-verdict.md` (rulings 1, 2, 3, 4, 5,
  6, 7, 9, 10, 11 bind this unit; ruling 4 fixes the icons: the partial reads the `$icons` map
  entry `select-indicator` through `map.get` into the `--bs-form-select-bg-img` declaration
  Bootstrap writes, and lands Bootstrap's dark descendant rule `[data-bs-theme='dark'] .form-select`
  reading `map.get(tokens.$dark, 'select-indicator')`; the validation icon `--bs-form-select-bg-icon`
  is VALIDATION's and already declared by `_validation.scss`). The family record
  `/home/user/veneer-bfs/tmp/units/b-passive-family.md`, the baseline addendum
  `/home/user/veneer-bfs/tmp/units/b-passive-baseline.md` (D14: the ledger lives in
  `guides/veneer.md` § Tokens › § Departures as one `#### \`key\`` table per key and § Additions),
  and the decisions `decisions-round-2.md` (D14 to D24) bind where the verdict does not override
  them.
- **Terrain.** `/home/user/veneer-bfs/tmp/units/b-forms-terrain-report.md`: the `form-select` key
  (its `selectors` array opens around `inventory.json` line 30315; its custom properties
  `--bs-form-select-bg-img` and `--bs-form-select-bg-icon`; the reduced-motion condition on
  `.form-select` around line 20173; the padding, `background-position`, floating `transform`, and
  validation `background-position` rows recorded under other keys); the `theme` key holds the dark
  select rule `[data-bs-theme=dark] .form-select` around line 2648; the icon table rows Select caret
  and Select caret dark with their release variables. Where this brief and the terrain disagree, the
  terrain and the tree win.
- **Law.** `/home/user/scaffold/AGENTS.md`;
  `/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,browser,application,writing}.md`.
  Guide: `guides/veneer.md`. Plan of record: `ROADMAP.md` (report-only).
- **Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/core/index.d.ts`,
  `browser/index.d.ts`, `server/index.d.ts`; guide `/home/user/scaffold/guides/test.md` § Surface),
  `@orkestrel/contract`, and `@orkestrel/guide`: read the surface before declaring a helper in a
  `tests/setup*.ts` module; a helper, guard, wait, recorder, or deferred whose job an installed
  export does is a defect, and the audit's checker runs the export-name probe over the diff.
- **Sites, located by symbol.** The release `node_modules/bootstrap/scss/forms/_form-select.scss`
  and the compiled `node_modules/bootstrap/dist/css/bootstrap.css` (`.form-select` through the
  dark rule); `src/styles/_tokens.scss` (the `$icons` map's `select-indicator` around line 143, the
  `$dark` map's `select-indicator` around line 103, both read-only here);
  `src/styles/components/_validation.scss` (the `.form-select` validation rules and the
  `--bs-form-select-bg-icon` declarations, which you do not duplicate);
  `src/styles/components/_form-range.scss` (the pattern); `tests/setup.ts` (`CASCADE_KEYS`,
  `CLOSE_KEYS`, the driven-key lists); `tests/app/browser/integration.test.ts` (the `Valid control`
  focus case around line 692 shows a page-frame focus scenario); the inventory key `form-select`;
  the `listed` literal in `tests/conformance.test.ts`; the deferral table in `guides/veneer.md`
  § Deferred selectors; the § Compatibility table; § Files; § Tests; the barrel
  `src/styles/index.scss` (`@use 'components/form-range'` around line 61); the § Tokens ›
  § Departures tables (`#### \`form-range\`` around line 2537 shows the shape); the guide's
  § Bootstrap variables Veneer retains sentence naming `--bs-form-select-bg-img` (around line 1441).
- **Host.** npm 11.19.1 on `PATH`
  (`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
  Chromium at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`). Foreground
  commands are capped at 10 minutes; sibling units run beside you, so a journey timing failure under
  load is the Orchestrator's reading; `prettier` must never run, `oxfmt` is the formatter.
- **Measurements.** Taken by the Orchestrator in this worktree before dispatch: the worktree is detached at `2c10329` (`git log --oneline -1`); its `node_modules` is a copy of the main checkout's with the lockfile marker `bda57482…d078`; `src/styles/index.scss` lists `@use 'components/validation'` at line 55 and `@use 'components/form-range'` at line 61; the guide's forms sections run `### Validation classes` (483) and `### Form range classes` (722); the `listed` literal in `tests/conformance.test.ts` and the inventories in `tests/app/browser/index.test.ts`, `tests/setupBrowser.test.ts`, `tests/setupStyles.test.ts`, and `tests/setup.test.ts` are sorted; host load at dispatch 1.6 with sibling units running; `grep -n "select-indicator" src/styles/_tokens.scss` returns lines 103 (`$dark`) and 143 (`$icons`, commented `// $form-select-indicator`); `guides/veneer.md:1441` still says Bootstrap retunes `--bs-form-select-bg-img` in the theme scope; no `_form-select.scss`, `FormSelectSection.ts`, or `form-select.test.ts` exists.
- **Control identifiers.** none; name every test for what it proves rather than for the control that
  specified it.
- **Standing conditions.** No sibling writes this worktree. `src/styles/_tokens.scss` and
  `_theme.scss` are off-limits: if the theme scope still declares `--bs-form-select-bg-img`, report
  it as a deviation with the line, land the component-level dark rule anyway, and let the proof
  read what the element resolves. The validation rules on `.form-select` are VALIDATION's and stay
  in `_validation.scss`; the floating rules on `.form-floating > .form-select` are FLOATING's; the
  input-group rules on `.input-group > .form-select` are GROUP's: emit none of them. Shared files
  are append-only at their anchors: the barrel line `@use 'components/form-select';` directly
  before `@use 'components/form-range';` (Bootstrap's order: select, check, range); the
  `### Form select classes` guide section directly before `### Form range classes`; new
  `CASCADE_KEYS` rows at the end of the array and a driven-key list `FORM_SELECT_KEYS` after
  `CLOSE_KEYS` with its `CAPTURE_KEYS` spread member and the matching spread in
  `tests/setup.test.ts`; the section's construction at the alphabetical position in
  `app/browser/Showcase.ts` and the inventories kept sorted where they are sorted; the `listed`
  literal kept sorted. Because siblings append to the same anchors in their own worktrees,
  integration is serial and the Orchestrator orders the appended lines; append yours as if alone.
  `tests/setupServer.test.ts` (the shipped-key Set literal) is the Orchestrator's integration edit:
  name the key it must gain in the report. The `probe` MCP server is registered in
  `.mcp.json` but unapproved in this session, so the `prove` tool is unavailable: take the runtime-probe
  fallback of `.claude/rules/tests.md` § Probes (a probe under `tmp/probe/` in the `probe` project, or
  the mutation-with-exact-revert reading) with its negative control, and report the control.

## Unknowns

- Whether a value meets no existing `--vn-*` token and no `--bs-*` global (the select's padding,
  background position and size, border, radius, focus shadow, disabled surface): rule per value
  under ruling 9 and stop where neither a token nor a literal is permitted.
- Whether Chromium exposes the `:-moz-focusring` rule at all: the ladder of ruling 5 applies (the
  authored declaration through `findRule` and `readRules`, named as compiled-contract evidence).

## Obligations

1. **The partial.** `src/styles/components/_form-select.scss` opens `@layer components` after
   `@use '../tokens'` and emits every selector the inventory records under `form-select` (the
   `.form-select` block with `--bs-form-select-bg-img` from `select-indicator` and its
   `background-image` reading both variables the way the release writes it, `:focus` with the
   focus shadow bound the way `_button.scss` binds its own, `[multiple]` and
   `[size]:not([size="1"])`, `:disabled`, `:-moz-focusring`, `.form-select-sm` and `-lg`, the
   reduced-motion twin through the `transition` mixin) with every declaration and condition the
   compiled release carries, and the dark descendant rule `[data-bs-theme='dark'] .form-select`
   reading `map.get(tokens.$dark, 'select-indicator')`. Bind a role colour, space, size, radius,
   border width, or motion literal to the existing `--vn-*` token the shipped partials bind
   (`tokenized`); write a `--bs-*` global the tree declares byte for byte; write a literal where no
   existing token carries the value; add no token. Emit nothing `_validation.scss` already emits.
2. **The proof.** `tests/src/styles/components/form-select.test.ts` in the
   `tests/src/styles/components/form-range.test.ts` idiom, reading through the installed browser
   exports and `scene`: the select's `appearance`, padding, `background-position` and `-size`, the
   resting `background-image` against the exact light caret URI and, inside a dark island, the dark
   caret URI, in a frozen `FORM_SELECT_CASES` table in `tests/setupStyles.ts`; the border and
   background against the tokens they bind through `readToken` and `matchesColor`; the focus
   shadow's resolved value and `readRing` after keyboard focus through `traverseAccessible` and
   `readStates`; the multiple and sized forms' padding and `background-image: none`; the disabled
   surface; the `-sm` and `-lg` geometry; the transition at rest and under `stageMedia({ motion:
   false })`; the token, override, factor, and mode readings family ruling 11 owes. Name, per case,
   the mutation it distinguishes (a wrong URI, a missing dark rule, a wrong shadow width, a lost
   `background-image: none` on the multiple form, a surviving reduced-motion transition).
3. **The showcase and the registry.** `app/browser/sections/FormSelectSection.ts` (region `Form
   select`, the `FormRangeSection.ts` shape), `FORM_SELECT_COPY` and `FORM_SELECT_SPECIMENS` with
   specimens opening with `Form select` (a select, a small and a large select, a multiple select, a
   sized select, a disabled select), the re-export, construction, proof, and inventory literals;
   resting scenarios in `CASCADE_KEYS` as element frames over the lifted specimen and a `focus`
   scenario on the plain select as a page frame by keyboard traversal (`FORM_SELECT_KEYS`);
   `CaptureSubject` gains the names.
4. **The accounting.** `form-select` in `listed`; its selector and variable rows in
   § Compatibility; the loop `npm run build:src && npm run test:conformance` to green with the
   departure rows in `guides/veneer.md` § Tokens › § Departures (one `#### \`form-select\`` table
   appended after the last table) and any addition under § Additions; every deferral row naming a
   shipped `form-select` selector struck in the same change; the § Bootstrap variables Veneer
   retains sentence corrected if it still says the theme scope declares the select image.
5. **The guide.** `### Form select classes` directly before `### Form range classes` (the evidence
   it has and its limits, the dark rule and the icon map named), the § Files row, the § Tests link,
   and the coverage matrix in the report.

## Scope

**Owned.** `src/styles/components/_form-select.scss`, `tests/src/styles/components/form-select.test.ts`,
  `app/browser/sections/FormSelectSection.ts`, `tests/app/browser/sections/FormSelectSection.test.ts`.; and, owned at their named anchors only (append there and edit nothing else in
them): `src/styles/index.scss`, `app/browser/constants.ts`,
  `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/setup.ts`, `tests/setup.test.ts`,
  `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/Showcase.test.ts`,
  `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`,
  `tests/conformance.test.ts` (`listed` only), `guides/veneer.md`.

**Shared (report-only).** `tests/setupServer.test.ts` (the shipped-key Set literal, the
Orchestrator's integration edit at landing); `ROADMAP.md` (return a patch); the sibling units'
partials, sections, and proofs (none present in this worktree).

**Off-limits.** every other file, `src/styles/_tokens.scss`, `_theme.scss`, and `_mixins.scss`
  included, `src/styles/components/_validation.scss`, `tests/fixtures/oracle/inventory.json`,
  `tests/setupServer.ts`, `tests/setupServer.test.ts`, the vendored files, `configs/**`,
  `package.json`, `ROADMAP.md` (return a patch). No git command that discards a working-tree
  change; no `npm install`.

**What asserts the state this change ends.** `tests/setupServer.test.ts` (its shipped-key Set literal
goes false when `form-select` ships; report-only, the Orchestrator carries it); `tests/conformance.test.ts`
(`listed`, owned at its anchor); the export and section inventories in
`tests/app/browser/index.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/setup.test.ts`, and
`tests/setupStyles.test.ts` (owned at their anchors); `guides/veneer.md` § Deferred selectors, § Files,
§ Tests, § Compatibility, and § Tokens › § Departures (owned at their anchors); derived by running
`npm run test:setup`, `npm run test:app`, `npm run test:conformance`, and `npm run test:guides` after
the partial and the section land, and bounded by a word-boundary grep for `form-select` over `tests/`
and `guides/`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `git mv` (a rename uses the shell's `mv`); `git add -N` only
to render diff evidence; no `npm install`; no git command that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

Validate scoped and read-only beyond your own
files: `oxfmt` on owned files, then `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run build:src`, `npm run test:setup`, `npm run test:src:styles`, `npm run test:app`,
`npm run test:conformance`, `npm run test:guides`, `npm run test:policy`, `npm run test:journey`,
and `CAPTURE=1 npm run test:journey -- --project 'journey:<variant>*'` for each of `light-1280`,
`dark-1280`, `light-390`, and `dark-390`, all from `/home/user/veneer-bfs`.

## Output

Write `/home/user/veneer-bfs/tmp/units/b-forms-select-report.md` and return the same text: the
coverage matrix; the token reuse and literal rulings per value; the ladder path per selector that
took it; the departure rows by category and the additions; the deferral rows struck; the scenarios
and the written frames and artifacts; the key the shipped-key Set literal must gain; the commands
with exit codes and counts; deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`; the `ROADMAP.md` patch; the claims you flag
unverified. No process diary.

## Deviation contract

§ Deviation protocol governs. Ancillary choices this unit settles itself: specimen wording and
count, case titles, the case table's placement in `tests/setupStyles.ts` (append at the end),
reason sentences. Stop and report when a value meets no existing token and no literal is
permitted, when the theme scope still declares the select image, or when a deferral row you must
strike is outside your scope.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run build:src` exits 0 and `dist/src/styles/index.css` contains every recorded `form-select`
   selector and the dark select rule (the report shows the grep).
3. `npm run test:setup` exits 0 with the case table in the inventory (the shipped-key Set literal's
   red on `form-select` is the Orchestrator's, named as an observation).
4. `npm run test:src:styles` exits 0 with the owned proof present.
5. `npm run test:app` exits 0 with the section in the inventory and its proof present.
6. `npm run test:conformance` exits 0 with `form-select` in `listed` and the ledger, deferral, and
   tag gates green.
7. `npm run test:guides` and `npm run test:policy` exit 0.
8. The four capture journeys exit 0 writing the unit's scenarios (the report lists them) and
   `npm run test:journey` exits 0.
9. `git status --porcelain` lists owned files only.

**Observations, not criteria.** The journey's timing under sibling load; `npm test` once as an
observation; the shipped-key Set literal's red in `npm run test:setup`.

## Review evidence

The Orchestrator takes the actual diff, the actual status, and the capture listing after you
return; your report carries the readings above.
