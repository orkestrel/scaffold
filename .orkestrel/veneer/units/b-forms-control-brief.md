# Unit B-FORMS-CONTROL — brief

## Role and engine

`opus` on Opus (the `opus` alias; the CLI serves Opus 5), reached as a native Claude subagent, sole
writer in the Veneer worktree `/home/user/veneer-bfo`, detached at `2c10329` (Veneer `main` with
the whole B-PASSIVE family, B-FORMS-VALIDATION, and B-FORMS-RANGE landed), with its own
`node_modules`. B-FORMS-CHECK (landed on the session branch), B-FORMS-GROUP, B-FORMS-FLOATING, and
B-FORMS-SELECT run in their own worktrees and land before this unit; write nothing outside
`/home/user/veneer-bfo`. Use absolute paths under `/home/user/veneer-bfo` for every command and
file, and run every npm and npx command from there; your shell may start elsewhere. Perform the
assignment directly and spawn nothing. Do not commit, push, install, or run `git checkout`, `git
restore`, `git stash`, `git reset`, or `git clean`; undo a transient plant by the exact reverse edit.

## Objective

The key `form-control` ships as a Bootstrap 5.3.8 baseline under the accounting gates,
self-contained: the `_form-control.scss` partial (the text control, its file, date, and placeholder
parts, focus, disabled, the plaintext form, the small and large sizes, the textarea heights, the
colour control and its swatches), its proof, showcase section, capture scenarios, compatibility
rows, shipped-list entry, deferral strikes, and departure rows.

## Context

**Evidence.** `python3` over `tests/fixtures/oracle/inventory.json` (`components['form-control']`):
79 selectors; the key's own selectors are `.form-control` (and its reduced-motion twin),
`.form-control[type=file]`, `.form-control[type=file]:not(:disabled):not([readonly])`,
`.form-control:focus`, `.form-control::-webkit-date-and-time-value`,
`.form-control::-webkit-datetime-edit`, `.form-control::placeholder`, `.form-control:disabled`,
`.form-control::-webkit-file-upload-button` (and its reduced-motion twin),
`.form-control::file-selector-button` (and its twin), the two hover file-button rules
(`.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button` and
`::file-selector-button`), `.form-control-plaintext`, `.form-control-plaintext:focus`,
`.form-control-plaintext.form-control-sm`, `.form-control-plaintext.form-control-lg`,
`.form-control-sm` and its two file buttons, `.form-control-lg` and its two file buttons,
`textarea.form-control`, `textarea.form-control-sm`, `textarea.form-control-lg`,
`.form-control-color`, `.form-control-color:not(:disabled):not([readonly])`,
`.form-control-color::-moz-color-swatch`, `.form-control-color::-webkit-color-swatch`,
`.form-control-color.form-control-sm`, `.form-control-color.form-control-lg`; the remaining
recorded selectors open on `.form-floating >` (FLOATING's), `.input-group` (GROUP's), or carry
`.was-validated`, `.is-valid`, or `.is-invalid` (VALIDATION's). `grep -n "components/validation\|components/form-range" src/styles/index.scss`
→ lines 55 and 61. `grep -n '^### Validation classes\|^### Form range classes\|^### Deferred selectors' guides/veneer.md`
→ 483, 722, 958. `guides/veneer.md:961` states the `Excluded` owner ("a name no unit will ship and
that must remain absent from the cascade"). `src/styles/elements/_input.scss` lines 12 to 18 and
35 to 38 ship the bare `::-webkit-datetime-edit*`, `::-webkit-color-swatch-wrapper`, and
`::file-selector-button` Reboot rules. The release partial
`node_modules/bootstrap/scss/forms/_form-control.scss` is 214 lines. Host load at dispatch 15 with
a landing chain and three sibling units running.

**Law.** `/home/user/scaffold/AGENTS.md`;
`/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,browser,application,writing}.md`;
no skill; guide `guides/veneer.md`; plan of record `ROADMAP.md` (report-only). The design
`tmp/units/b-forms-design-verdict.md` (rulings 1, 2, 3, 5, 6, 7, 9, 10, 11 bind this unit; ruling 5
fixes the vendor pseudos: author every one the probe keeps, `::-webkit-file-upload-button` and its
twins are recorded under the existing `Excluded` row and are not emitted, `::-moz-color-swatch` and
`::-webkit-color-swatch` ship, and the elements layer keeps the bare-element rules the component
partial never restates; ruling 6 fixes the file button's logical properties byte for byte), the
family record `tmp/units/b-passive-family.md`, the baseline addendum `tmp/units/b-passive-baseline.md`
(D14: the ledger lives in `guides/veneer.md` § Tokens › § Departures as one `#### \`key\`` table per
key and § Additions), and `tmp/units/decisions-round-2.md` (D14 to D36; D30: a per-variant pair
takes one `@each`; D33: a multiple of a space token is written `calc(var(--vn-space-N) * k)`; D34:
a height that must scale with density takes the multiplied space token; D35: the barrel's forms
block follows the release's order with `validation` last, a case the FLOATING fix round adds; D36:
a generic type argument on a DOM query stands) bind where the verdict does not override them.
Terrain: `tmp/units/b-forms-terrain-report.md` (the `form` union key at `inventory.json:19239`
lists the text control rules from 19277 through 20066; the reduced-motion conditions at 19354,
19635, 19650; no `[readonly]` positive rule; `$input-*`, `$form-file-button-*`, `$form-color-width`
in `_variables.scss`). Where this brief and the terrain disagree, the terrain and the tree win.

**Installed primitives.** `@orkestrel/test` (`node_modules/@orkestrel/test/dist/src/core/index.d.ts`,
`browser/index.d.ts`, `server/index.d.ts`; guide `/home/user/scaffold/guides/test.md` § Surface),
`@orkestrel/contract`, and `@orkestrel/guide`: read the surface before declaring a helper in a
`tests/setup*.ts` module; a helper, guard, wait, recorder, or deferred whose job an installed export
does is a defect, and the audit's checker runs the export-name probe over the diff.

**Host.** bash; `/home/user/veneer-bfo`; npm 11.19.1 on `PATH`
(`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
Chromium at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`); foreground
commands are capped at 10 minutes; sibling units and a landing chain run beside you, so a journey
timing failure under load is the Orchestrator's reading; `prettier` must never run, `oxfmt` is the
formatter; no network is needed.

**Measurements.** Taken by the Orchestrator in this worktree on 2026-09-23 before dispatch: the
worktree is detached at `2c10329` (`git log --oneline -1`); its `node_modules` is a copy of the main
checkout's with the lockfile marker opening `bda57482`; `src/styles/index.scss` lists
`@use 'components/validation'` at line 55 and `@use 'components/form-range'` at line 61; the
guide's forms sections run `### Validation classes` (483) and `### Form range classes` (722); the
`listed` literal in `tests/conformance.test.ts` and the inventories in
`tests/app/browser/index.test.ts`, `tests/setupBrowser.test.ts`, `tests/setupStyles.test.ts`, and
`tests/setup.test.ts` are sorted; no `_form-control.scss`, `FormControlSection.ts`, or
`form-control.test.ts` exists; the `form-control` key's own selectors are the 34 listed under
Evidence and the other 45 belong to the sibling keys named there.

**Control identifiers.** none; name every test for what it proves rather than for the control that
specified it.

**Standing conditions.** No sibling writes this worktree. `src/styles/_tokens.scss`, `_theme.scss`,
`_mixins.scss`, `_validation.scss`, and the elements partials are off-limits. The validation rules
on `.form-control` are VALIDATION's and stay in `_validation.scss`; the floating rules on
`.form-floating > .form-control*` are FLOATING's; the input-group rules on `.input-group > .form-control*`
are GROUP's: emit none of them, and expect `npm run test:conformance`'s presence case to stay red
on those sibling-absent selectors in this worktree (an observation, never a repair; a one-run plant
of their release text, restored and `cmp`-confirmed, is the permitted reading). When `form-control`
ships, the ledger attribution (the longest shipped class token) moves the `.form-control.is-valid`,
`.form-control.is-invalid`, `textarea.form-control.is-*`, and `.form-control-color.is-*` rows from
the `is-valid` and `is-invalid` tables into the `#### \`form-control\`` table (the `.was-validated …`
rows stay under `was-validated`): apply what the ledger gate prints and name the moved rows in the
report, as SELECT's D4 did. `::-webkit-file-upload-button` and its three size and hover twins are
`Excluded` (guide line 394 and ruling 5): confirm the deferral table's `Excluded` rows name each of
them, add a row for any it does not, emit none, and confirm the conformance presence case skips an
`Excluded` name the way it skips `::-moz-focus-inner`. Shared files are append-only at their
anchors: the barrel line `@use 'components/form-control';` directly before
`@use 'components/form-range';` (the Orchestrator orders the forms block at integration per D35:
`form-control`, `form-select`, `form-check`, `form-range`, `form-floating`, `input-group`,
`validation`); the `### Form control classes` guide section directly before `### Form range
classes`; new `CASCADE_KEYS` rows at the end of the array and a driven-key list
`FORM_CONTROL_KEYS` after `CLOSE_KEYS` with its `CAPTURE_KEYS` spread member and the matching spread
in `tests/setup.test.ts`; the section's construction at the alphabetical position in
`app/browser/Showcase.ts` and the inventories kept sorted where they are sorted; the `listed`
literal kept sorted. Because siblings append to the same anchors in their own worktrees,
integration is serial and the Orchestrator orders the appended lines; append yours as if alone.
`tests/setupServer.test.ts` (the shipped-key Set literal) is the Orchestrator's integration edit:
name the key it must gain in the report. The `probe` MCP server is registered in `.mcp.json` but
unapproved in this session, so the `prove` tool is unavailable: take the runtime-probe fallback of
`.claude/rules/tests.md` § Probes (a probe under `tmp/probe/` in the `probe` project, or the
mutation-with-exact-revert reading) with its negative control, and report the control.

## Unknowns

- Whether a value meets no existing `--vn-*` token and no `--bs-*` global (the control's padding,
  font size, line height, border, radius, focus shadow, disabled surface, the file button's
  padding and margin, the colour control's width and height, the textarea minimum heights, the
  plaintext padding): rule per value under ruling 9, write a multiple of a space token per D33
  where the release derives the value from one, and stop where neither a token nor a literal is
  permitted.
- Which vendor pseudos Chromium exposes to a resolved reading (`::placeholder`, `::file-selector-button`,
  `::-webkit-datetime-edit`, `::-webkit-date-and-time-value`, `::-webkit-color-swatch`) and which
  take the ladder of ruling 5 (`::-moz-color-swatch`: the authored declaration through `findRule`
  and `readRules`, named as compiled-contract evidence): report the path each pseudo took.
- Whether `.form-control::file-selector-button`'s logical properties (`margin-inline-end`,
  `-webkit-margin-end`, `border-inline-end-width`) resolve in Chromium as the release's physical
  readings (ruling 6): report the readings.

## Obligations

1. **The partial.** `src/styles/components/_form-control.scss` opens `@layer components` after
   `@use '../mixins' as *` (and `@use '../tokens'` only if it reads the tokens module) and emits
   every selector listed under Evidence as the key's own, with every declaration and condition the
   compiled release carries: the `.form-control` block and its reduced-motion twin through the
   `transition` mixin, the file input's `overflow`, the focus state with the focus shadow bound the
   way `_button.scss` binds its own and the border tint the way `_form-select.scss` and
   `_form-check.scss` bind theirs (`color-mix(in srgb, var(--vn-palette-blue) 50%, var(--vn-palette-white-base))`),
   the date parts, the placeholder, the disabled surface, the file button (`::file-selector-button`
   only) with its hover and its size forms, the plaintext form and its sizes, the small and large
   sizes through one `@each` over the pair (D30), the textarea minimum heights, and the colour
   control with its swatches. Bind a role colour, space, size, radius, border width, or motion
   literal to the existing `--vn-*` token the shipped partials bind (`tokenized`); write a `--bs-*`
   global the tree declares byte for byte; write a literal where no existing token carries the
   value; add no token. Emit nothing `_validation.scss`, `_input.scss`, or a sibling unit already
   emits.
2. **The proof.** `tests/src/styles/components/form-control.test.ts` in the
   `tests/src/styles/components/form-select.test.ts` idiom, reading through the installed browser
   exports and `scene`: each recorded declaration on the element its selector matches through a
   frozen `FORM_CONTROL_CASES` table in `tests/setupStyles.ts`; the border, fill, and disabled
   surface in each mode through `readStates`, `readToken`, and `matchesColor`; the focus shadow's
   resolved value and `readRing` after keyboard focus through `traverseAccessible` held to
   `FOCUS_RING` in each mode and the tint within one channel step of `#86b7fe`; the placeholder
   colour; the file button's geometry, hover surface, and the transition at rest and under
   `stageMedia({ motion: false })`; the plaintext form; the small and large geometry; the textarea
   heights; the colour control's box and swatch; the token, override, factor, and mode readings
   family ruling 11 owes; each case named for the one thing it proves. Name, per case, the mutation
   it distinguishes (a wrong focus width, a lost `::placeholder` colour, a surviving reduced-motion
   transition, a literal size, a missing hover surface, a lost swatch radius). The vendor pseudos
   that take the ladder are read as ruling 5 prescribes and named as compiled-contract evidence.
3. **The showcase and the registry.** `app/browser/sections/FormControlSection.ts` (region `Form
   control`, the `FormSelectSection.ts` shape), `FORM_CONTROL_COPY` and `FORM_CONTROL_SPECIMENS`
   with specimens opening with `Form control` (a text control, a small and a large control, a
   textarea, a file control, a colour control, a plaintext control, a disabled control, a readonly
   control), the re-export, construction, proof, and inventory literals; resting scenarios in
   `CASCADE_KEYS` as element frames over the lifted specimen and a `focus` scenario on the plain
   control as a page frame by keyboard traversal (`FORM_CONTROL_KEYS`); `CaptureSubject` gains the
   names.
4. **The accounting.** `form-control` in `listed`; its selector row in § Compatibility; the loop
   `npm run build:src && npm run test:conformance` to green (the sibling-absent presence reading
   excepted) with the departure rows in `guides/veneer.md` § Tokens › § Departures (one
   `#### \`form-control\`` table appended after the last table, the re-attributed validation rows
   moved into it) and any addition under § Additions; every deferral row naming a shipped
   `form-control` selector struck in the same change; the `Excluded` rows for the
   `::-webkit-file-upload-button` family present.
5. **The guide.** `### Form control classes` directly before `### Form range classes` (the evidence
   it has and its limits, the vendor pseudos' ladder paths named, the excluded alias named), the
   § Files row, the § Tests link, and the coverage matrix in the report; every code token followed
   by a noun.

## Scope

**Owned.** `src/styles/components/_form-control.scss`, `tests/src/styles/components/form-control.test.ts`,
`app/browser/sections/FormControlSection.ts`, `tests/app/browser/sections/FormControlSection.test.ts`;
and, owned at their named anchors only (append there and edit nothing else in them):
`src/styles/index.scss`, `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`,
`tests/setup.ts`, `tests/setup.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
`tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
`tests/app/browser/integration.test.ts`, `tests/conformance.test.ts` (`listed` only),
`guides/veneer.md` (the section, the § Files row, the § Tests link, the § Compatibility row, the
§ Tokens tables the ledger gate names, the deferral rows).

**Shared (report-only).** `tests/setupServer.test.ts` (the shipped-key Set literal, the
Orchestrator's integration edit at landing); `ROADMAP.md` (return a patch); the sibling units'
partials, sections, and proofs (none present in this worktree).

**Off-limits.** every other file, `src/styles/_tokens.scss`, `_theme.scss`, and `_mixins.scss`
included, `src/styles/components/_validation.scss`, `src/styles/elements/**`,
`tests/fixtures/oracle/inventory.json`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, the
vendored files, `configs/**`, `package.json`, `ROADMAP.md` (return a patch). No git command that
discards a working-tree change; no `npm install`.

**What asserts the state this change ends.** `tests/setupServer.test.ts` (its shipped-key Set literal
goes false when `form-control` ships; report-only, the Orchestrator carries it);
`tests/conformance.test.ts` (`listed`, owned at its anchor; the presence case reads the sibling
keys' absence as an observation); the export and section inventories in
`tests/app/browser/index.test.ts`, `tests/app/browser/Showcase.test.ts`, `tests/setup.test.ts`, and
`tests/setupStyles.test.ts` (owned at their anchors); `guides/veneer.md` § Deferred selectors,
§ Files, § Tests, § Compatibility, and § Tokens › § Departures (owned at their anchors; the
`is-valid` and `is-invalid` tables lose the re-attributed rows); derived by running `npm run
test:setup`, `npm run test:app`, `npm run test:conformance`, and `npm run test:guides` after the
partial and the section land, and bounded by a word-boundary grep for `form-control` over `tests/`
and `guides/`.

**Tools and limits.** Read, Grep, Glob, Edit, Write, Bash. No tree-wide `format`, `lint --fix`, or
`build` beyond `npm run build:src`; no `git mv` (a rename uses the shell's `mv`); `git add -N` only
to render diff evidence; no `npm install`; no git command that discards a working-tree change.

## Execution

**A native subagent, or a bench engine reading this brief inside its own CLI:** perform the
assignment directly and spawn nothing.

## Output

Write `tmp/units/b-forms-control-report.md`: the touched files, the coverage matrix (inventory
selector and condition → proof case, subject, specimen, scenario, evidence limit), the token and
literal rulings per value, the ladder path per vendor pseudo, the departure rows and the
re-attributed rows, the deferral rows struck and the `Excluded` rows confirmed, the scenarios and
the frames the `CAPTURE=1` runs wrote, the key the Set literal must gain, the `ROADMAP.md` patch, the
plant table (each mutation, the cases it reddened, the exact revert with its digest), the gate table
with exit codes and counts, the deviations, and the claims you flag as unverified. Return as your
final message: the report path, the `git status --short` output, and the gate table. No process
diary.

## Deviation contract

Stop and report — expected, found, exact evidence, done or not done, and at most one short
hypothesis — on a value that meets neither a permitted token nor a permitted literal, on a selector
the release records that no rule of ruling 5 places, or on a change an off-limits file would need.
Decide, record, and carry on from the specimen names, the case order, the placement of a paragraph
inside the section, and the map's variable names.

## Acceptance criteria

1. `npx oxfmt --check` over the owned files and `npx oxlint` over the owned TypeScript files exit 0;
   `npm run check` exits 0.
2. `npm run build:src` exits 0 and a grep of `dist/src/styles/index.css` finds every unique owned
   selector and the reduced-motion twins.
3. `npm run test:setup` reports exactly one failure (the Set literal); `npm run test:app` exits 0.
4. `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/form-control.test.ts`
   exits 0, and under each named plant the same command reports the named case red and green again
   after the exact reverse edit (the plant table).
5. `npm run test:conformance` reports exactly one failure (the sibling-absent presence reading),
   with the ledger, deferral, and tag cases green; `npm run test:guides` exits 0.
6. `CAPTURE=1 npm run test:journey -- --project 'journey:<variant>*'` exits 0 for each of
   `light-1280`, `dark-1280`, `light-390`, `dark-390`, and `tmp/capture/states/` holds every
   registered `form-control*` frame.
7. `tmp/units/b-forms-control-report.md` exists with every section § Output names.

**Observations, not criteria.** `npm run test:src:styles` (the whole styles project), `npm run
test:journey`, `npm run test:policy`, and `npm test`: report each reading you take; the Orchestrator
takes the authoritative runs after you exit.

## Review evidence

A code change and a rendered surface: the actual diff against `2c10329` (`git add -N` on the new
files, then `git diff 2c10329`), the actual `git status --short`, the report, and the capture
portfolio under `tmp/capture/states/` as the primary evidence for every rendered claim with the
source as corroboration.
