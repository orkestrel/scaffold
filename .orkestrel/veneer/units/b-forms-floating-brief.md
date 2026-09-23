# Unit B-FORMS-FLOATING — brief

## Role and engine

`opus` on Opus (the `opus` alias; the CLI serves Opus 5), sole writer in the Veneer worktree
`/home/user/veneer-bff`, detached at `2c10329` (Veneer `main` with the whole B-PASSIVE family,
B-FORMS-VALIDATION, and B-FORMS-RANGE landed), with its own `node_modules`. B-FORMS-GROUP,
B-FORMS-CHECK, and B-FORMS-SELECT run in their own worktrees and F8c-B MOVE in
`/home/user/veneer-f8b`; write nothing outside `/home/user/veneer-bff`. Use absolute paths under
`/home/user/veneer-bff` for every command and file, and run every npm and npx command from there;
your shell may start elsewhere. Perform the assignment directly and spawn nothing. Do not commit,
push, install, or run `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo a
transient plant by the exact reverse edit.

## Objective

The key `form-floating` ships as a Bootstrap 5.3.8 baseline under the accounting gates,
self-contained: the `_form-floating.scss` partial (the floating container, its control, plaintext,
and select children, the label and its transforms under focus, filled, and autofill, the textarea
label backdrop, the disabled and plaintext label forms, the reduced-motion twin), its proof,
showcase section, capture scenarios, compatibility rows, shipped-list entry, deferral strikes, and
departure rows.

## Context

- **Ruling.** `/home/user/veneer-bff/tmp/units/b-forms-design-verdict.md` (rulings 1, 2, 3, 5, 6,
  7, 9, 10, 11 bind this unit). The family record
  `/home/user/veneer-bff/tmp/units/b-passive-family.md`, the baseline addendum
  `/home/user/veneer-bff/tmp/units/b-passive-baseline.md` (D14: the ledger lives in
  `guides/veneer.md` § Tokens › § Departures as one `#### \`key\`` table per key and § Additions),
  and the decisions `decisions-round-2.md` (D14 to D24) bind where the verdict does not override
  them.
- **Terrain.** `/home/user/veneer-bff/tmp/units/b-forms-terrain-report.md`: the `form-floating`
  key (its `selectors` array opens around `inventory.json` line 38928; the rules inside `form`
  around lines 21218 to 21761: `.form-floating`, `> .form-control`, `> .form-control-plaintext`,
  `> .form-select`, `> label` with its reduced-motion twin around line 21379, the placeholder
  rules, `:focus` and `:not(:placeholder-shown)`, `:-webkit-autofill`, the select padding, the
  `~ label` transforms, `textarea ~ label::after`, the disabled `::after`, the plaintext label
  border, `:disabled ~ label` and `.form-control:disabled ~ label`; the `transform-origin` and
  `transform` rows recorded under `form` and `form-control`). The `.input-group > .form-floating`
  rules are GROUP's. Where this brief and the terrain disagree, the terrain and the tree win.
- **Law.** `/home/user/scaffold/AGENTS.md`;
  `/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,browser,application,writing}.md`.
  Guide: `guides/veneer.md`. Plan of record: `ROADMAP.md` (report-only).
- **Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/core/index.d.ts`,
  `browser/index.d.ts`, `server/index.d.ts`; guide `/home/user/scaffold/guides/test.md` § Surface),
  `@orkestrel/contract`, and `@orkestrel/guide`: read the surface before declaring a helper in a
  `tests/setup*.ts` module; a helper, guard, wait, recorder, or deferred whose job an installed
  export does is a defect, and the audit's checker runs the export-name probe over the diff.
- **Sites, located by symbol.** The release `node_modules/bootstrap/scss/forms/_floating-labels.scss`
  and the compiled `node_modules/bootstrap/dist/css/bootstrap.css` (`.form-floating` through the
  disabled label rules); `src/styles/components/_validation.scss` (the `.form-floating` validation
  rules it already emits, which you do not duplicate); `src/styles/components/_form-range.scss`
  (the pattern); `tests/setup.ts` (`CASCADE_KEYS`, `CLOSE_KEYS`, the driven-key lists);
  `tests/app/browser/integration.test.ts` (the `Valid control` focus case around line 692 shows a
  page-frame focus scenario); the inventory key `form-floating`; the `listed` literal in
  `tests/conformance.test.ts`; the deferral table in `guides/veneer.md` § Deferred selectors; the
  § Compatibility table; § Files; § Tests; the barrel `src/styles/index.scss` (`@use
  'components/form-range'` around line 61); the § Tokens › § Departures tables (`#### \`form-range\``
  around line 2537 shows the shape).
- **Host.** npm 11.19.1 on `PATH`
  (`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
  Chromium at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`). Foreground
  commands are capped at 10 minutes; sibling units run beside you, so a journey timing failure under
  load is the Orchestrator's reading; `prettier` must never run, `oxfmt` is the formatter.
- **Measurements.** Taken by the Orchestrator in this worktree before dispatch: the worktree is detached at `2c10329` (`git log --oneline -1`); its `node_modules` is a copy of the main checkout's with the lockfile marker `bda57482…d078`; `src/styles/index.scss` lists `@use 'components/validation'` at line 55 and `@use 'components/form-range'` at line 61; the guide's forms sections run `### Validation classes` (483) and `### Form range classes` (722); the `listed` literal in `tests/conformance.test.ts` and the inventories in `tests/app/browser/index.test.ts`, `tests/setupBrowser.test.ts`, `tests/setupStyles.test.ts`, and `tests/setup.test.ts` are sorted; host load at dispatch 1.6 with sibling units running; the `form-floating` rules are recorded inside the `form` key (`inventory.json` lines 21218 to 21761 per the terrain) and the key opens around line 38928; no `_form-floating.scss`, `FormFloatingSection.ts`, or `form-floating.test.ts` exists (`ls src/styles/components app/browser/sections tests/src/styles/components`).
- **Control identifiers.** none; name every test for what it proves rather than for the control that
  specified it.
- **Standing conditions.** No sibling writes this worktree. `.form-control` and `.form-select`
  have no partial of their own in this tree yet (CONTROL and SELECT land later): a floating
  reading that depends on the control's own rules (its padding or border) is compiled-contract
  evidence through the ladder of ruling 5, named as such, while the floating rules' own
  declarations (the container's `position`, the child's `height` and padding, the label's
  position, opacity, and transform) are rendered readings. The validation rules on
  `.form-floating` are VALIDATION's and stay in `_validation.scss`; the input-group rules on
  `.input-group > .form-floating` are GROUP's: emit none of them. Shared files are append-only at
  their anchors: the barrel line `@use 'components/form-floating';` directly after `@use
  'components/form-range';` (Bootstrap's order: range, floating, input-group); the `### Form
  floating classes` guide section directly after `### Form range classes`; new `CASCADE_KEYS` rows
  at the end of the array and a driven-key list `FORM_FLOATING_KEYS` after `CLOSE_KEYS` with its
  `CAPTURE_KEYS` spread member and the matching spread in `tests/setup.test.ts`; the section's
  construction at the alphabetical position in `app/browser/Showcase.ts` and the inventories kept
  sorted where they are sorted; the `listed` literal kept sorted. Because siblings append to the
  same anchors in their own worktrees, integration is serial and the Orchestrator orders the
  appended lines; append yours as if alone. `tests/setupServer.test.ts` (the shipped-key Set
  literal) is the Orchestrator's integration edit: name the key it must gain in the report. The `probe` MCP server is registered in
  `.mcp.json` but unapproved in this session, so the `prove` tool is unavailable: take the runtime-probe
  fallback of `.claude/rules/tests.md` § Probes (a probe under `tmp/probe/` in the `probe` project, or
  the mutation-with-exact-revert reading) with its negative control, and report the control.

## Unknowns

- Whether `:-webkit-autofill` can be driven on this host: if not, the ladder of ruling 5 applies
  and the report names it.
- Whether a value meets no existing `--vn-*` token and no `--bs-*` global (the floating height,
  the label padding and transform scale, the textarea backdrop's radius): rule per value under
  ruling 9 and stop where neither a token nor a literal is permitted.

## Obligations

1. **The partial.** `src/styles/components/_form-floating.scss` opens `@layer components` after
   `@use '../tokens'` and emits every selector the inventory records under `form-floating` (the
   container, `> .form-control`, `> .form-control-plaintext`, `> .form-select`, `> label` with its
   reduced-motion twin through the `transition` mixin, the placeholder rules, the `:focus` and
   `:not(:placeholder-shown)` padding, `:-webkit-autofill`, the select padding, the `~ label`
   transforms, `textarea ~ label::after`, the disabled `::after`, the plaintext label border, and
   the disabled label rules) with every declaration and condition the compiled release carries,
   including `transform-origin` and `transform` byte for byte (D11 ruling 6). Bind a role colour,
   space, size, radius, border width, or motion literal to the existing `--vn-*` token the shipped
   partials bind (`tokenized`); write a `--bs-*` global the tree declares byte for byte; write a
   literal where no existing token carries the value; add no token. Emit nothing `_validation.scss`
   already emits.
2. **The proof.** `tests/src/styles/components/form-floating.test.ts` in the
   `tests/src/styles/components/form-range.test.ts` idiom, reading through the installed browser
   exports and `scene`: the container's `position`; the child's `height` and padding at rest, under
   focus (through `traverseAccessible` and `readStates`), and filled (through `typeAccessible` and
   `commitInput`); the label's position, `opacity`, `transform`, and `transform-origin` at rest and
   in each driven state; the textarea label backdrop `::after` geometry and its disabled surface;
   the plaintext label border; the disabled label colour; the transition at rest and under
   `stageMedia({ motion: false })`; the token, override, factor, and mode readings family ruling 11
   owes; a frozen `FORM_FLOATING_CASES` table in `tests/setupStyles.ts`. Name, per case, the
   mutation it distinguishes (a wrong transform, a label that never fades, a lost focus padding, a
   surviving reduced-motion transition, a wrong backdrop radius).
3. **The showcase and the registry.** `app/browser/sections/FormFloatingSection.ts` (region `Form
   floating`, the `FormRangeSection.ts` shape), `FORM_FLOATING_COPY` and `FORM_FLOATING_SPECIMENS`
   with specimens opening with `Form floating` (an empty floating input, a filled one, a floating
   textarea, a floating select, a disabled one, a plaintext one), the re-export, construction,
   proof, and inventory literals; resting scenarios in `CASCADE_KEYS` as element frames over the
   lifted specimen and a `focus` scenario on the empty input as a page frame by keyboard traversal
   (`FORM_FLOATING_KEYS`); `CaptureSubject` gains the names.
4. **The accounting.** `form-floating` in `listed`; its selector and variable rows in
   § Compatibility; the loop `npm run build:src && npm run test:conformance` to green with the
   departure rows in `guides/veneer.md` § Tokens › § Departures (one `#### \`form-floating\`` table
   appended after the last table) and any addition under § Additions; every deferral row naming a
   shipped `form-floating` selector struck in the same change.
5. **The guide.** `### Form floating classes` directly after `### Form range classes` (the evidence
   it has and its limits, the readings that wait on CONTROL and SELECT named), the § Files row, the
   § Tests link, and the coverage matrix in the report.

## Scope

**Owned.** `src/styles/components/_form-floating.scss`,
  `tests/src/styles/components/form-floating.test.ts`, `app/browser/sections/FormFloatingSection.ts`,
  `tests/app/browser/sections/FormFloatingSection.test.ts`.; and, owned at their named anchors only (append there and edit nothing else in
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
goes false when `form-floating` ships; report-only, the Orchestrator carries it); `tests/conformance.test.ts`
(`listed`, owned at its anchor); the export and section inventories in
`tests/app/browser/index.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/setup.test.ts`, and
`tests/setupStyles.test.ts` (owned at their anchors); `guides/veneer.md` § Deferred selectors, § Files,
§ Tests, § Compatibility, and § Tokens › § Departures (owned at their anchors); derived by running
`npm run test:setup`, `npm run test:app`, `npm run test:conformance`, and `npm run test:guides` after
the partial and the section land, and bounded by a word-boundary grep for `form-floating` over `tests/`
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
`dark-1280`, `light-390`, and `dark-390`, all from `/home/user/veneer-bff`.

## Output

Write `/home/user/veneer-bff/tmp/units/b-forms-floating-report.md` and return the same text: the
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
permitted, or when a deferral row you must strike is outside your scope.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run build:src` exits 0 and `dist/src/styles/index.css` contains every recorded
   `form-floating` selector (the report shows the grep).
3. `npm run test:setup` exits 0 with the case table in the inventory (the shipped-key Set literal's
   red on `form-floating` is the Orchestrator's, named as an observation).
4. `npm run test:src:styles` exits 0 with the owned proof present.
5. `npm run test:app` exits 0 with the section in the inventory and its proof present.
6. `npm run test:conformance` exits 0 with `form-floating` in `listed` and the ledger, deferral,
   and tag gates green.
7. `npm run test:guides` and `npm run test:policy` exit 0.
8. The four capture journeys exit 0 writing the unit's scenarios (the report lists them) and
   `npm run test:journey` exits 0.
9. `git status --porcelain` lists owned files only.

**Observations, not criteria.** The journey's timing under sibling load; `npm test` once as an
observation; the shipped-key Set literal's red in `npm run test:setup`.

## Review evidence

The Orchestrator takes the actual diff, the actual status, and the capture listing after you
return; your report carries the readings above.
