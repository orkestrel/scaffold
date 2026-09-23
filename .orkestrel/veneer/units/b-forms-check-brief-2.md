# Unit B-FORMS-CHECK — brief

Successor to `tmp/units/b-forms-check-brief.md` (the brief you opened at dispatch). What changed and why:
the brief now carries every row `.agents/templates/brief.md` fixes — **Installed primitives**,
**Measurements**, **Control identifiers**, the `probe` standing condition, the **Shared
(report-only)**, **What asserts the state this change ends**, and **Tools and limits** rows, the
Execution line in the template's form, and the **Observations, not criteria** row. The objective,
the obligations, the owned files, and the acceptance criteria are unchanged; the files the earlier
brief called shared and append-only are owned at their anchors, which is what you were already
doing. Keep going from where you are and finish under this brief; write the report to the same
path the earlier brief names.

## Role and engine

`opus` on Opus (the `opus` alias; the CLI serves Opus 5), sole writer in the Veneer worktree
`/home/user/veneer-bfc`, detached at `2c10329` (Veneer `main` with the whole B-PASSIVE family,
B-FORMS-VALIDATION, and B-FORMS-RANGE landed), with its own `node_modules`. B-FORMS-GROUP runs in
`/home/user/veneer-bfg` and F8c-B MOVE in `/home/user/veneer-f8b`; write nothing outside
`/home/user/veneer-bfc`. Use absolute paths under `/home/user/veneer-bfc` for every command and
file, and run every npm and npx command from there; your shell may start elsewhere. Perform the
assignment directly and spawn nothing. Do not commit, push, install, or run `git checkout`, `git
restore`, `git stash`, `git reset`, or `git clean`; undo a transient plant by the exact reverse edit.

## Objective

The key `form-check` ships as a Bootstrap 5.3.8 baseline under the accounting gates,
self-contained: the `_form-check.scss` partial (checks, radios, the indeterminate state, the switch,
the reverse and inline layouts, the `.btn-check` bridge rules the key records), its proof, showcase
section, capture scenarios with the family's `indeterminate` state, compatibility rows, shipped-list
entry, deferral strikes, and departure rows.

## Context

- **Ruling.** `/home/user/veneer-bfc/tmp/units/b-forms-design-verdict.md` (rulings 1, 2, 3, 4, 5,
  6, 7, 9, 10, 11 bind this unit; ruling 4 fixes the icons: the partial reads the `$icons` map
  entries `check`, `radio`, `indeterminate`, `switch-knob`, `switch-focus`, and `switch-checked`
  through `map.get` into the `--bs-form-check-bg-image` and `--bs-form-switch-bg` declarations
  Bootstrap writes, and lands Bootstrap's dark descendant rule
  `[data-bs-theme='dark'] .form-switch .form-check-input:not(:checked):not(:focus)` reading
  `map.get(tokens.$dark, 'switch-knob')`; ruling 7 makes `indeterminate` the family's one extension
  of `CaptureState`, driven by setting the property). The family record
  `/home/user/veneer-bfc/tmp/units/b-passive-family.md`, the baseline addendum
  `/home/user/veneer-bfc/tmp/units/b-passive-baseline.md` (D14: the ledger lives in
  `guides/veneer.md` § Tokens › § Departures as one `#### \`key\`` table per key and § Additions),
  and the decisions `decisions-round-2.md` (D14 to D24) bind where the verdict does not override
  them.
- **Terrain.** `/home/user/veneer-bfc/tmp/units/b-forms-terrain-report.md`: the `form-check` key
  (its `selectors` array opens around `inventory.json` line 30800; the check, reverse, inline, and
  switch rows; the reduced-motion condition on `.form-switch .form-check-input` around line 20750;
  the custom properties `--bs-form-check-bg`, `--bs-form-check-bg-image`, `--bs-form-switch-bg`; the
  icon table rows Check, Radio, Indeterminate, Switch off, Switch focus, Switch on, and Switch off
  dark with their release variables); the `theme` key holds the dark switch rule (around
  `inventory.json` line 2662). Where this brief and the terrain disagree, the terrain and the tree
  win.
- **Law.** `/home/user/scaffold/AGENTS.md`;
  `/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,browser,application,writing}.md`.
  Guide: `guides/veneer.md`. Plan of record: `ROADMAP.md` (report-only).
- **Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/core/index.d.ts`,
  `browser/index.d.ts`, `server/index.d.ts`; guide `/home/user/scaffold/guides/test.md` § Surface),
  `@orkestrel/contract`, and `@orkestrel/guide`: read the surface before declaring a helper in a
  `tests/setup*.ts` module; a helper, guard, wait, recorder, or deferred whose job an installed
  export does is a defect, and the audit's checker runs the export-name probe over the diff.
- **Sites, located by symbol.** The release `node_modules/bootstrap/scss/forms/_form-check.scss`
  and the compiled `node_modules/bootstrap/dist/css/bootstrap.css` (`.form-check` through the
  `.btn-check` rules and the dark switch rule); `src/styles/_tokens.scss` (the `$icons` map around
  line 123, the `$dark` map's `switch-knob` around line 105, both read-only here);
  `src/styles/components/_validation.scss` (the `.form-check-input` validation rules around its
  check block, which you do not duplicate); `src/styles/components/_button-group.scss` (the
  `.btn-check` rules the button family already emits: read them and emit under `form-check` only
  what the release's `_form-check.scss` emits for `.btn-check`, naming any overlap in the report);
  `src/styles/components/_form-range.scss` (the pattern); `tests/setup.ts` (`CaptureState` around
  line 165, `CaptureScenario`, `CASCADE_KEYS`, `BUTTON_GROUP_KEYS` and its `check-group-checked`
  precedent); `tests/app/browser/integration.test.ts` (the `Check group` cases around lines 799 to
  870: how a driven state is placed and read back after the shot); the inventory key `form-check`;
  the `listed` literal in `tests/conformance.test.ts`; the deferral table in `guides/veneer.md`
  § Deferred selectors; the § Compatibility table; § Files; § Tests; the barrel `src/styles/index.scss`
  (`@use 'components/form-range'` around line 61); the § Tokens › § Departures tables
  (`#### \`form-range\`` around line 2537 shows the shape).
- **Host.** npm 11.19.1 on `PATH`
  (`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
  Chromium at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`). Foreground
  commands are capped at 10 minutes; two sibling units run beside you, so a journey timing failure
  under load is the Orchestrator's reading; `prettier` must never run, `oxfmt` is the formatter.
- **Measurements.** Taken by the Orchestrator in this worktree before dispatch: the worktree is detached at `2c10329` (`git log --oneline -1`); its `node_modules` is a copy of the main checkout's with the lockfile marker `bda57482…d078`; `src/styles/index.scss` lists `@use 'components/validation'` at line 55 and `@use 'components/form-range'` at line 61; the guide's forms sections run `### Validation classes` (483) and `### Form range classes` (722); the `listed` literal in `tests/conformance.test.ts` and the inventories in `tests/app/browser/index.test.ts`, `tests/setupBrowser.test.ts`, `tests/setupStyles.test.ts`, and `tests/setup.test.ts` are sorted; host load at dispatch 1.6 with sibling units running; `grep -n` over `src/styles/_tokens.scss` finds the `$icons` entries `check`, `radio`, `indeterminate`, `switch-knob`, `switch-focus`, `switch-checked` (lines 123 to 140) and the `$dark` entry `switch-knob` (line 105); `export type CaptureState = 'active' | 'checked' | 'focus' | 'hover' | 'pressed' | 'rest'` at `tests/setup.ts:165`; `_button-group.scss` lines 18 to 25 emit `.btn-group > .btn-check:checked + .btn` and its focus and vertical twins; `_validation.scss` lines 94 to 110 emit the `.form-check-input` validation rules.
- **Control identifiers.** none; name every test for what it proves rather than for the control that
  specified it.
- **Standing conditions.** No sibling writes this worktree. `src/styles/_tokens.scss` and
  `_theme.scss` are off-limits: if the theme scope still declares `--bs-form-switch-bg`, report it
  as a deviation with the line, land the component-level dark rule anyway, and let the proof read
  what the element resolves. The validation rules on `.form-check-input` are VALIDATION's and stay
  in `_validation.scss`. Shared files are append-only at their anchors: the barrel line
  `@use 'components/form-check';` directly before `@use 'components/form-range';` (Bootstrap's
  order); the `### Form check classes` guide section directly before `### Form range classes`;
  new `CASCADE_KEYS` rows at the end of the array and a driven-key list `FORM_CHECK_KEYS` after
  `CLOSE_KEYS` with its `CAPTURE_KEYS` spread member and the matching spread in
  `tests/setup.test.ts`; `CaptureState` gains `'indeterminate'` in alphabetical position; the
  section's construction at the alphabetical position in `app/browser/Showcase.ts` and the
  inventories kept sorted where they are sorted; the `listed` literal kept sorted. Because GROUP
  appends to the same anchors in its own worktree, integration is serial and the Orchestrator
  orders the appended lines; append yours as if alone. `tests/setupServer.test.ts` (the shipped-key
  Set literal) is the Orchestrator's integration edit: name the key it must gain in the report. The `probe` MCP server is registered in
  `.mcp.json` but unapproved in this session, so the `prove` tool is unavailable: take the runtime-probe
  fallback of `.claude/rules/tests.md` § Probes (a probe under `tmp/probe/` in the `probe` project, or
  the mutation-with-exact-revert reading) with its negative control, and report the control.

## Unknowns

- Whether the `.btn-check` rules the `form-check` key records are already emitted by
  `_button-group.scss` or `_button.scss` in the same form: read both and settle per rule (emit here
  only what no shipped partial emits; a rule emitted elsewhere in a different form is a deviation
  report, not a change).
- Whether a value meets no existing `--vn-*` token and no `--bs-*` global (the check's border
  colour, the checked fill, the focus shadow, the switch geometry): rule per value under ruling 9
  and stop where neither a token nor a literal is permitted.

## Obligations

1. **The partial.** `src/styles/components/_form-check.scss` opens `@layer components` after
   `@use '../tokens'` and emits every selector the inventory records under `form-check` (the
   `.form-check` block and its `.form-check-input` with `--bs-form-check-bg`, the `[type=checkbox]`
   and `[type=radio]` radius and shape, `:active`, `:focus` with the focus shadow bound the way
   `_button.scss` binds its own, `:checked` with the checked fill and the `check` and `radio`
   images, `:indeterminate` with the `indeterminate` image, `:disabled` and the disabled label
   opacity, `.form-check-reverse` and `.form-check-inline`, the `.form-switch` block with
   `--bs-form-switch-bg` from `switch-knob`, its `:focus` image from `switch-focus`, its `:checked`
   image from `switch-checked` and position, the reduced-motion twin through the `transition`
   mixin, `.form-switch.form-check-reverse`, and the `.btn-check` rules per § Unknowns) with every
   declaration and condition the compiled release carries, and the dark descendant rule
   `[data-bs-theme='dark'] .form-switch .form-check-input:not(:checked):not(:focus)` reading
   `map.get(tokens.$dark, 'switch-knob')`. Bind a role colour, space, size, radius, border width, or
   motion literal to the existing `--vn-*` token the shipped partials bind (`tokenized`); write a
   `--bs-*` global the tree declares byte for byte; write a literal where no existing token carries
   the value; add no token. Emit nothing `_validation.scss` already emits.
2. **The proof.** `tests/src/styles/components/form-check.test.ts` in the
   `tests/src/styles/components/form-range.test.ts` idiom, reading through the installed browser
   exports and `scene`: the input's geometry and `appearance`; the checkbox and radio radii; the
   resting `background-color` against `--bs-form-check-bg`; the checked fill and border against the
   role token through `readToken` and `matchesColor`; the `background-image` of a checked checkbox,
   a checked radio, an indeterminate checkbox (the property set through the browser), a resting
   switch, a focused switch, and a checked switch against the exact URIs in a frozen
   `FORM_CHECK_ICON_CASES` (or one `FORM_CHECK_CASES`) table in `tests/setupStyles.ts`; the dark
   island's unchecked switch image against the `$dark` knob; the focus shadow's resolved value and
   `readRing` after keyboard focus through `traverseAccessible` and `readStates`; the disabled input
   and label opacity; the reverse and inline layouts; the switch transition at rest and under
   `stageMedia({ motion: false })`; the token, override, factor, and mode readings family ruling 11
   owes. Name, per case, the mutation it distinguishes (a wrong URI, a missing dark rule, a wrong
   shadow width, a swapped checked and indeterminate image, a surviving reduced-motion transition, a
   lost disabled opacity).
3. **The showcase and the registry.** `app/browser/sections/FormCheckSection.ts` (region `Form
   check`, the `FormRangeSection.ts` shape), `FORM_CHECK_COPY` and `FORM_CHECK_SPECIMENS` with
   specimens opening with `Form check` (a checkbox, a checked checkbox, a radio pair, a disabled
   check, a reverse check, inline checks, a switch, a checked switch, a disabled switch), the
   re-export, construction, proof, and inventory literals; resting scenarios in `CASCADE_KEYS` as
   element frames over the lifted specimen; driven scenarios in `FORM_CHECK_KEYS`: `focus` on the
   checkbox as a page frame by keyboard traversal and `indeterminate` on the checkbox as an element
   frame with the property set, read back after the shot the way the `Check group` cases read their
   state back; `CaptureState` gains `'indeterminate'`; `CaptureSubject` gains the names.
4. **The accounting.** `form-check` in `listed`; its selector and variable rows in § Compatibility;
   the loop `npm run build:src && npm run test:conformance` to green with the departure rows in
   `guides/veneer.md` § Tokens › § Departures (one `#### \`form-check\`` table appended after the
   last table) and any addition under § Additions; every deferral row naming a shipped
   `form-check` or `form-switch` selector struck in the same change.
5. **The guide.** `### Form check classes` directly before `### Form range classes` (the evidence it
   has and its limits, the dark rule and the icon map named), the § Files row, the § Tests link, and
   the coverage matrix in the report.

## Scope

**Owned.** `src/styles/components/_form-check.scss`, `tests/src/styles/components/form-check.test.ts`,
  `app/browser/sections/FormCheckSection.ts`, `tests/app/browser/sections/FormCheckSection.test.ts`.; and, owned at their named anchors only (append there and edit nothing else in
them): `src/styles/index.scss`, `app/browser/constants.ts`,
  `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/setup.ts`, `tests/setup.test.ts`,
  `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/Showcase.test.ts`,
  `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`,
  `tests/conformance.test.ts` (`listed` only), `guides/veneer.md`.

**Shared (report-only).** `tests/setupServer.test.ts` (the shipped-key Set literal, the
Orchestrator's integration edit at landing); `ROADMAP.md` (return a patch); the sibling units'
partials, sections, and proofs (none present in this worktree).

**Off-limits.** every other file, `src/styles/_tokens.scss`, `_theme.scss`, and `_mixins.scss`
  included, `src/styles/components/_validation.scss`, `_button.scss`, `_button-group.scss`,
  `tests/fixtures/oracle/inventory.json`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, the
  vendored files, `configs/**`, `package.json`, `ROADMAP.md` (return a patch). No git command that
  discards a working-tree change; no `npm install`.

**What asserts the state this change ends.** `tests/setupServer.test.ts` (its shipped-key Set literal
goes false when `form-check` ships; report-only, the Orchestrator carries it); `tests/conformance.test.ts`
(`listed`, owned at its anchor); the export and section inventories in
`tests/app/browser/index.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/setup.test.ts`, and
`tests/setupStyles.test.ts` (owned at their anchors); `guides/veneer.md` § Deferred selectors, § Files,
§ Tests, § Compatibility, and § Tokens › § Departures (owned at their anchors); derived by running
`npm run test:setup`, `npm run test:app`, `npm run test:conformance`, and `npm run test:guides` after
the partial and the section land, and bounded by a word-boundary grep for `form-check` over `tests/`
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
`dark-1280`, `light-390`, and `dark-390`, all from `/home/user/veneer-bfc`.

## Output

Write `/home/user/veneer-bfc/tmp/units/b-forms-check-report.md` and return the same text: the
coverage matrix; the token reuse and literal rulings per value; the `.btn-check` overlap ruling per
rule; the departure rows by category and the additions; the deferral rows struck; the scenarios and
the written frames and artifacts; the key the shipped-key Set literal must gain; the commands with
exit codes and counts; deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`; the `ROADMAP.md` patch; the claims you flag
unverified. No process diary.

## Deviation contract

§ Deviation protocol governs. Ancillary choices this unit settles itself: specimen wording and
count, case titles, the case table's name and placement in `tests/setupStyles.ts` (append at the
end), reason sentences. Stop and report when a value meets no existing token and no literal is
permitted, when a `.btn-check` rule is emitted elsewhere in a form you would have to change, when
the theme scope still declares a switch image, or when a deferral row you must strike is outside
your scope.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run build:src` exits 0 and `dist/src/styles/index.css` contains every recorded `form-check`
   selector and the dark switch rule (the report shows the grep).
3. `npm run test:setup` exits 0 with the case table in the inventory (the shipped-key Set literal's
   red on `form-check` is the Orchestrator's, named as an observation).
4. `npm run test:src:styles` exits 0 with the owned proof present.
5. `npm run test:app` exits 0 with the section in the inventory and its proof present.
6. `npm run test:conformance` exits 0 with `form-check` in `listed` and the ledger, deferral, and
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
