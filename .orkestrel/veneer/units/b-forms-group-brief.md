# Unit B-FORMS-GROUP — brief

## Role and engine

`opus` on Opus (the `opus` alias; the CLI serves Opus 5), sole writer in the Veneer worktree
`/home/user/veneer-bfg`, detached at `2c10329` (Veneer `main` with the whole B-PASSIVE family,
B-FORMS-VALIDATION, and B-FORMS-RANGE landed), with its own `node_modules`. F8c-B MOVE runs in
another worktree (`/home/user/veneer-f8b`) on the Tailwind service tree and the setup modules; write
nothing outside `/home/user/veneer-bfg`. Use absolute paths under `/home/user/veneer-bfg` for every
command and file, and run every npm and npx command from there; your shell may start elsewhere.
Perform the assignment directly and spawn nothing. Do not commit, push, install, or run `git
checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; undo a transient plant by the
exact reverse edit.

## Objective

The keys `input-group`, `valid-feedback`, `valid-tooltip`, `invalid-feedback`, and
`invalid-tooltip` ship as a Bootstrap 5.3.8 baseline under the accounting gates, self-contained:
the `_input-group.scss` partial, its proof, showcase section, capture scenarios, compatibility rows,
shipped-list entries, deferral strikes and additions, and departure rows.

## Context

- **Ruling.** `/home/user/veneer-bfg/tmp/units/b-forms-design-verdict.md` (rulings 1, 2, 3, 5, 6,
  7, 8, 9, 10, 11 bind this unit; ruling 8 names the deferral rows this unit retires, the two
  `Disclosure` rows it adds, and the sibling rule it ships). The family record
  `/home/user/veneer-bfg/tmp/units/b-passive-family.md`, the baseline addendum
  `/home/user/veneer-bfg/tmp/units/b-passive-baseline.md` (D14: the ledger lives in
  `guides/veneer.md` § Tokens › § Departures as one `#### \`key\`` table per key and § Additions;
  no `guides/ledger/` directory exists), and the decisions `decisions-round-2.md` (D14 to D24)
  bind where the verdict does not override them.
- **Terrain.** `/home/user/veneer-bfg/tmp/units/b-forms-terrain-report.md`: the `input-group` key
  opens at `inventory.json` around line 40254 (`.input-group`, `.input-group .btn`, `.input-group
  .btn:focus`, `.input-group-text`, the `-lg` and `-sm` text and button rules, the two
  `.dropdown-toggle:nth-last-child` rules, and the `:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback)`
  sibling rule); the input-group rules recorded inside `form` (`> .form-control`, `> .form-select`,
  `> .form-floating`, the focus trio, the `-lg` and `-sm` control and select rules, the end-radius
  and start-radius rules); the feedback and tooltip keys (`valid-tooltip` around line 45084,
  `valid-feedback` around 45285, and their invalid twins) whose own rules `.valid-feedback`,
  `.valid-tooltip`, `.was-validated :valid ~ …`, `.is-valid ~ …`, and the inline feedback margin
  VALIDATION already emits in `src/styles/components/_validation.scss`; no at-rule condition and
  no `rtl` entry on any of these keys. Where this brief and the terrain disagree, the terrain and
  the tree win.
- **Law.** `/home/user/scaffold/AGENTS.md`;
  `/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,browser,application,writing}.md`.
  Guide: `guides/veneer.md`. Plan of record: `ROADMAP.md` (report-only).
- **Sites, located by symbol.** The release `node_modules/bootstrap/scss/forms/_input-group.scss`
  and the compiled `node_modules/bootstrap/dist/css/bootstrap.css` (`.input-group` through the
  sibling rule); `src/styles/components/_validation.scss` (the input-group validation stacking
  rules it already emits around its `z-index` block, which you do not duplicate);
  `src/styles/components/_form-range.scss` and `_button-group.scss` (the pattern: layer opening,
  the token bindings, the `border-radius` corners the group zeroes); `src/styles/_mixins.scss`; the
  inventory keys `input-group`, `valid-feedback`, `valid-tooltip`, `invalid-feedback`,
  `invalid-tooltip`; the `listed` literal in `tests/conformance.test.ts`; the deferral table in
  `guides/veneer.md` § Deferred selectors (the five `Forms` rows naming `.input-group .btn`,
  `.input-group .btn:focus`, `.input-group-lg > .btn`, `.input-group-sm > .btn`, and
  `.btn-toolbar .input-group`, around line 979); the § Compatibility table; § Files; § Tests; the
  barrel `src/styles/index.scss` (`@use 'components/form-range'` around line 61); the § Tokens ›
  § Departures tables (`#### \`form-range\`` around line 2537 shows the shape; a new key's table
  is appended after the last table, and the additions table sits under § Additions).
- **Host.** npm 11.19.1 on `PATH`
  (`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
  Chromium at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`). Foreground
  commands are capped at 10 minutes; a journey timing failure under load is the Orchestrator's
  reading; `prettier` must never run, `oxfmt` is the formatter.
- **Standing conditions.** No sibling writes this worktree. The `input-group` key's `> .form-floating`
  rules ship here (the ladder attributes them to `input-group` until FLOATING lands); a reading that
  needs a rendered `.form-floating` takes the authored-declaration ladder of ruling 5 and is named
  as compiled-contract evidence. The dropdown-toggle rules are deferred (ruling 8): emit them
  nowhere, add their two `Disclosure` rows. The validation-in-group stacking rules are
  VALIDATION's and stay in `_validation.scss`. Shared files are append-only at their anchors: the
  barrel line `@use 'components/input-group';` directly after `@use 'components/form-range';`; the
  `### Input group classes` guide section directly after `### Form range classes`; new `CASCADE_KEYS`
  rows at the end of the array and a driven-key list `INPUT_GROUP_KEYS` after `CLOSE_KEYS` with its
  `CAPTURE_KEYS` spread member and the matching spread in `tests/setup.test.ts`; the section's
  construction at the alphabetical position in `app/browser/Showcase.ts` and the inventories in
  `tests/app/browser/index.test.ts` and `Showcase.test.ts` kept sorted where they are sorted; the
  `listed` literal kept sorted. `tests/setupServer.test.ts` (the shipped-key Set literal) is the
  Orchestrator's integration edit: name the keys it must gain in the report.

## Unknowns

- Whether every `input-group` selector the inventory records outside the deferred dropdown rules
  can be rendered on this host: read the key's `selectors` array and settle per selector, naming
  the ladder path in the coverage matrix.
- Whether a value meets no existing `--vn-*` token and no `--bs-*` global (the addon's background
  and border, the group's `z-index` steps): rule per value under ruling 9 and stop where neither a
  token nor a literal is permitted.

## Obligations

1. **The partial.** `src/styles/components/_input-group.scss` opens `@layer components` after
   `@use '../tokens'` and emits every selector the inventory records under `input-group` except the
   two dropdown-toggle rules, with every declaration and condition the compiled release carries:
   the group's flex layout and stretch, the child `flex` and `min-width` rules and the `:focus`
   `z-index` lift, the `:not(:first-child)` overlap margin (`margin-left`, physical per D11),
   `.input-group-text` (its padding, font, line height, colour, background, border, and radius), the
   `-lg` and `-sm` sizing of text, control, select, and button children, the end-radius and
   start-radius zeroing rules, the `:not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback)`
   sibling rule, the `.input-group .btn` and `.btn:focus` rules and `.btn-toolbar .input-group`.
   Bind a role colour, space, size, radius, border width, or motion literal to the existing
   `--vn-*` token the shipped partials bind (the comparison records `tokenized`); write a `--bs-*`
   global the tree declares byte for byte; write a literal where no existing token carries the
   value; add no token. Emit nothing `_validation.scss` already emits.
2. **The proof.** `tests/src/styles/components/input-group.test.ts` in the
   `tests/src/styles/components/form-range.test.ts` idiom, reading through the installed browser
   exports and `scene`: the group's `display`, `align-items`, and `flex-wrap`; a child's `flex` and
   `min-width`; the overlap margin on a second child and its absence on the first; the corner
   zeroing on inner edges and the kept outer corners; `.input-group-text`'s resolved geometry and
   paint against the tokens it binds through `readToken` and `matchesColor`; the `-lg` and `-sm`
   sizes on text, control, and button children; the `:focus` `z-index` lift after keyboard focus
   through `traverseAccessible` and `readStates`; the sibling rule's radius on a feedback element
   placed inside a `.has-validation` group; the `.btn` child's radius and focus; the token, override,
   factor, and mode readings family ruling 11 owes. Name, per case, the mutation it distinguishes
   (a wrong group corner, a dropped overlap margin, a lost focus lift, a wrong addon paint, a missing
   size rule, a sibling rule that reaches the feedback element).
3. **The showcase and the registry.** `app/browser/sections/InputGroupSection.ts` (region `Input
   group`, the `FormRangeSection.ts` shape), `INPUT_GROUP_COPY` and `INPUT_GROUP_SPECIMENS` with
   specimens opening with `Input group` (a text addon at each end, a button addon, the `-lg` and
   `-sm` sizes, a `.has-validation` group with feedback, a plain group over a `.form-control`), the
   re-export, construction, proof, and inventory literals; resting scenarios in `CASCADE_KEYS` as
   element frames over the lifted specimen and a `focus` scenario on the plain group's control as a
   page frame driven by keyboard traversal in the journey (`INPUT_GROUP_KEYS`); `CaptureSubject`
   gains the names.
4. **The accounting.** `input-group`, `invalid-feedback`, `invalid-tooltip`, `valid-feedback`, and
   `valid-tooltip` in `listed`; their selector and variable rows in § Compatibility; the loop
   `npm run build:src && npm run test:conformance` to green with the departure rows in
   `guides/veneer.md` § Tokens › § Departures (one `#### \`input-group\`` table appended after the
   last table, and a table per feedback and tooltip key where a row exists) and any addition under
   § Additions; the five deferral rows struck and the two `Disclosure` rows added in the same
   change.
5. **The guide.** `### Input group classes` directly after `### Form range classes` (the evidence it
   has and its limits, the deferred dropdown rules named), the § Files row, the § Tests link, and the
   coverage matrix in the report.

## Scope

- Owned: `src/styles/components/_input-group.scss`, `tests/src/styles/components/input-group.test.ts`,
  `app/browser/sections/InputGroupSection.ts`, `tests/app/browser/sections/InputGroupSection.test.ts`.
- Shared, append-only at the named anchors: `src/styles/index.scss`, `app/browser/constants.ts`,
  `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/setup.ts`, `tests/setup.test.ts`,
  `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/Showcase.test.ts`,
  `tests/app/browser/index.test.ts`, `tests/app/browser/integration.test.ts`,
  `tests/conformance.test.ts` (`listed` only), `guides/veneer.md`.
- Off-limits: every other file, `src/styles/_tokens.scss`, `_theme.scss`, and `_mixins.scss`
  included, `src/styles/components/_validation.scss`, `tests/fixtures/oracle/inventory.json`,
  `tests/setupServer.ts`, `tests/setupServer.test.ts`, the vendored files, `configs/**`,
  `package.json`, `ROADMAP.md` (return a patch). No git command that discards a working-tree
  change; no `npm install`.

## Execution

Perform the assignment directly and spawn nothing. Validate scoped and read-only beyond your own
files: `oxfmt` on owned files, then `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run build:src`, `npm run test:setup`, `npm run test:src:styles`, `npm run test:app`,
`npm run test:conformance`, `npm run test:guides`, `npm run test:policy`, `npm run test:journey`,
and `CAPTURE=1 npm run test:journey -- --project 'journey:<variant>*'` for each of `light-1280`,
`dark-1280`, `light-390`, and `dark-390`, all from `/home/user/veneer-bfg`.

## Output

Write `/home/user/veneer-bfg/tmp/units/b-forms-group-report.md` and return the same text: the
coverage matrix; the token reuse and literal rulings per value; the ladder path per selector that
took it; the departure rows by key and category and the additions; the deferral rows struck and
added; the scenarios and the written frames and artifacts; the keys the shipped-key Set literal must
gain; the commands with exit codes and counts; deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`; the `ROADMAP.md` patch; the claims you flag
unverified. No process diary.

## Deviation contract

§ Deviation protocol governs. Ancillary choices this unit settles itself: specimen wording and
count, case titles, the `INPUT_GROUP_CASES` table's placement in `tests/setupStyles.ts` (append at
the end), reason sentences. Stop and report when a value meets no existing token and no literal is
permitted, when a rule you must emit is already emitted by `_validation.scss` in a form you would
have to change, or when a deferral row you must strike is outside your scope.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run build:src` exits 0 and `dist/src/styles/index.css` contains every recorded `input-group`
   selector except the two dropdown-toggle rules (the report shows the grep).
3. `npm run test:setup` exits 0 with the case table in the inventory (the shipped-key Set literal's
   red on the new keys is the Orchestrator's, named as an observation).
4. `npm run test:src:styles` exits 0 with the owned proof present.
5. `npm run test:app` exits 0 with the section in the inventory and its proof present.
6. `npm run test:conformance` exits 0 with the five keys in `listed` and the ledger, deferral, and
   tag gates green.
7. `npm run test:guides` and `npm run test:policy` exit 0.
8. The four capture journeys exit 0 writing the unit's scenarios (the report lists them) and
   `npm run test:journey` exits 0.
9. `git status --porcelain` lists owned and shared files only.

## Review evidence

The Orchestrator takes the actual diff, the actual status, and the capture listing after you
return; your report carries the readings above.
