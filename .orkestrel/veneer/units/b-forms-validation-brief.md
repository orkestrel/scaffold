# Unit B-FORMS-VALIDATION — brief

## Role and engine

`opus` on Opus (the `opus` alias; the CLI serves Opus 5), sole writer in the Veneer worktree
`/home/user/veneer-bfv`, detached at the commit the launch prompt names, reached as a git worktree
of `/home/user/veneer` with its own `node_modules`. B-FORMS-RANGE and the five B-PASSIVE units run in
parallel in their own worktrees; write nothing outside yours. Perform the assignment directly and
spawn nothing.

## Objective

The keys `was-validated`, `is-valid`, and `is-invalid` ship as a Bootstrap 5.3.8 baseline under the
accounting gates; every forms SVG data URI lives in `src/styles/_tokens.scss`; the theme-scope
emission of `--bs-form-select-bg-img` and `--bs-form-switch-bg` is gone; and the attribution ladder
prefers the most specific shipped key.

## Context

- **Ruling.** `/home/user/scaffold/.orkestrel/veneer/b-forms-design-verdict.md` (rulings 1 to 11
  bind; ruling 2 and ruling 4 are yours). Read it first. The family record
  `/home/user/scaffold/.orkestrel/veneer/units/b-passive-family.md` (rulings 1 to 14) and the
  baseline addendum `/home/user/scaffold/.orkestrel/veneer/units/b-passive-baseline.md` bind where
  the verdict does not override them.
- **Terrain.** `/home/user/scaffold/.orkestrel/veneer/units/b-forms-terrain-report.md` § A (the
  oracle surface of every forms key, the SVG data URIs and the variable each comes from, the pseudos),
  § B (how a shipped key is wired, with symbols), § C (what already ships: the `--bs-form-valid-*`
  aliases the theme mixin emits, the dark caret and knob in `tokens.$dark`, the element rules the
  component must not restate), § D, § E. Where this brief and the terrain disagree, the terrain and
  the tree win; stop and report where the tree disagrees with the terrain.
- **Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{styles,tests,names,architecture,documentation,browser,application,writing}.md`.
  Guide: `guides/veneer.md`. Plan of record: `ROADMAP.md` (report-only).
- **Sites, located by symbol.** `src/styles/_tokens.scss`: the `$dark` map (its `select-indicator`
  and `switch-knob` entries, the toggler and accordion entries) and the `$assets` map;
  `src/styles/_theme.scss`: the dark-scope walk over `tokens.$assets` with its `@error`;
  `src/styles/_mixins.scss`: `theme-tokens` (declares `--vn-form-valid`, `--vn-form-invalid`, and the
  `--bs-form-valid-color`, `--bs-form-valid-border-color`, `--bs-form-invalid-*` aliases), `focus-ring`,
  `transition`; `src/styles/components/_button.scss` (the pattern: layer opening, `--bs-btn-*`
  declarations, the focus shadow bound to `--vn-focus-width` and `--vn-focus-color`); the release
  sources `node_modules/bootstrap/scss/forms/_validation.scss`, `mixins/_forms.scss`
  (`form-validation-state`, `form-validation-state-selector`), `_variables.scss`
  (`$form-validation-states`, `$form-feedback-icon-valid`, `$form-feedback-icon-invalid`), and the
  compiled `node_modules/bootstrap/dist/css/bootstrap.css`; the inventory keys `was-validated`,
  `is-valid`, `is-invalid`, `valid-feedback`, `invalid-feedback`, `valid-tooltip`, `invalid-tooltip`
  in `tests/fixtures/oracle/inventory.json`; `attributeSelector` and `indexRecordingKeys` in
  `tests/setupServer.ts`; the `listed` literal in `tests/conformance.test.ts`; the guide sentence in
  § Bootstrap variables Veneer retains that reads "Bootstrap also retunes `--bs-form-select-bg-img`,
  `--bs-form-switch-bg`, …"; `tests/src/styles/theme.test.ts` where it reads the dark scope's asset
  declarations; the `@error` override case in `tests/setupStyles.test.ts`.
- **Host.** npm 11.19.1 on `PATH`
  (`export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`),
  Chromium 141 at `/opt/pw-browsers` (`export PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`). Foreground
  commands are capped at 10 minutes; a journey timing failure under load is the Orchestrator's
  reading.
- **Standing conditions.** Six sibling units run beside you from the same baseline; none of their
  partials is in your worktree, and the ledger refresh at integration may re-attribute a row. A
  scoped conformance run that reddens on a sibling's absent file is an observation, never a repair.
  Shared files are append-only at the anchors family ruling 13 names; append the barrel's `@use`
  line after `@use 'components/vr'`, and the Orchestrator orders the family's lines in Bootstrap's
  import order at integration.

## Unknowns

- Whether any deferral row names a selector this partial emits (`.was-validated …`, `.is-valid`,
  `.is-invalid`, the feedback and tooltip names). Read § Deferred selectors; strike every row whose
  name you ship and list them in the report; where a row you must strike is outside your scope, stop.
- Whether `tests/src/styles/theme.test.ts` asserts the two asset declarations at the dark scope.
  Read it; if it does, the assertion moves to what the scope declares after your change, and the
  report names the case.

## Obligations

### Obligation 1 — the partial

`src/styles/components/_validation.scss` opens `@layer components` after `@use '../tokens'`
(family ruling 8) and emits every selector the inventory records under `was-validated`, `is-valid`,
and `is-invalid`, plus the `.valid-feedback`, `.invalid-feedback`, `.valid-tooltip`, and
`.invalid-tooltip` rules the release's `form-validation-state` mixin emits (their keys close with
GROUP, so you do not list them as shipped), with every declaration, custom property, and condition
Bootstrap's compiled CSS carries: the border and text colours through the `--bs-form-valid-*` and
`--bs-form-invalid-*` aliases already declared, the focus shadow `rgba(var(--bs-success-rgb), .25)`
and its danger twin byte for byte, the check label colours, the input-group `z-index` stacking, the
`.was-validated :valid` and `:invalid` native forms, the textarea and select icon geometry, and
the icon `background-image` declarations reading the `$icons` map (obligation 2). Where a compiled
value is a literal that an existing `--vn-*` token the shipped partials bind already carries (a
space, a size, a radius, a motion value), write the token and let the comparison record the
`tokenized` departure; where no existing token carries it, write the literal. Add no `--vn-*` token.

### Obligation 2 — the icons and the theme scope (verdict ruling 4)

`src/styles/_tokens.scss` gains a `$icons` map carrying the mode-independent glyphs as escaped data
URIs taken from the release: check, radio, indeterminate, switch off, switch focus, switch on, the
light caret, the valid mark, the invalid mark, each keyed by a `kebab-case` name and each with a
comment naming the release variable it came from. `$dark` keeps `select-indicator` and `switch-knob`
(SELECT and CHECK read them through `map.get(tokens.$dark, …)` in their own rules). `$assets` loses
those two entries and keeps the toggler and accordion entries, so `_theme.scss` needs no code change
and its `@error` proof keeps its subject; the dark scope stops declaring `--bs-form-select-bg-img`
and `--bs-form-switch-bg`. Correct the guide sentence in § Bootstrap variables Veneer retains so it
says the component rules that own each image declare its dark value (SELECT and CHECK land those
rules), and the theme proofs read what the scope declares after the change.

### Obligation 3 — the ladder tie-break (verdict ruling 2)

`attributeSelector` in `tests/setupServer.ts`: among the shipped keys that record a selector, prefer
the key whose name is the longest class token the selector carries (the tie-break the class-prefix
path already uses through `matchShippedKey`), falling back to the first shipped key in recording
order. Plant in `tests/setupServer.test.ts`: `attributes a selector two shipped keys record to the
more specific key`, recording one selector under a short key and a longer key whose name is a class
token of the selector, asserting the longer wins; record it red against the current reader and green
after, with `npm run test:setup` and its counts. Update the `@remarks` of `attributeSelector` and
any guide sentence that states the ladder.

### Obligation 4 — the proof

`tests/src/styles/components/validation.test.ts` (mirroring the partial), in the
`tests/src/styles/components/button.test.ts` idiom, reading through the installed browser exports
and `scene`: the border and text colour of `.is-valid` and `.is-invalid` controls in light and inside
a dark island against `readToken` of the aliases through `matchesColor`; the icon
`background-image` of a validated text control and select against the exact URI in a frozen
`FORM_ICON_CASES` table in `tests/setupStyles.ts`; the focus shadow's resolved value and
`readRing`; `.was-validated` over a required empty control (`:invalid` on arrival) and over a filled
one; the feedback element's `display` toggling with the sibling's state; the tooltip's position; the
check label colour; the input-group stacking `z-index`; the token, override, factor, and mode
readings family ruling 11 owes. Name in the report, per case, the mutation the assertion
distinguishes (a wrong URI, a swapped valid and invalid binding, a wrong shadow width, a feedback
that never shows).

### Obligation 5 — the showcase and the registry

`app/browser/sections/ValidationSection.ts` (the `TableSection.ts` shape), `VALIDATION_COPY` and
`VALIDATION_SPECIMENS` in `app/browser/constants.ts`, re-exported and constructed at `Validation`'s
alphabetical position, with its proof `tests/app/browser/sections/ValidationSection.test.ts` and
the region and export literals (family ruling 9). Specimens (verdict ruling 7; names open with the
key's noun): `Valid control`, `Invalid control`, `Valid select`, `Invalid select`, `Valid check`,
`Invalid check`, `Valid feedback`, `Invalid feedback`, `Valid tooltip`, `Invalid tooltip`, and
`Validated form` (a `.was-validated` form over a required empty control). Register each specimen's
rest scenario at the end of `CASCADE_KEYS` in `tests/setup.ts` and add the names to `CaptureSubject`;
`focus` scenarios for `Valid control` and `Invalid control` as page frames driven by the journey;
`CaptureState` gains nothing. `CAPTURE=1 npm run test:journey` writes the frames and artifacts.

### Obligation 6 — the accounting

Add the three keys to `listed`, their selector and variable rows to § Compatibility (family
ruling 7), run the loop `npm run build:src && npm run test:conformance` to green (family ruling 5
as the addendum restates it: the rows go to `guides/ledger/departures.md` under `#### \`<key>\``
and `guides/ledger/additions.md` with a `Condition` cell and a reason sentence), and strike every
deferral row you ship (unknown 1).

### Obligation 7 — the guide

Family ruling 12: one `### Validation classes` heading appended in barrel order, the § Files row
for the partial and its proof, the corrected retained-variables sentence (obligation 2), and the
coverage matrix (inventory selector and condition → proof case, subject, specimen, scenario,
evidence limit) in the report rather than the guide.

## Scope

- Owned: `src/styles/components/_validation.scss`, `src/styles/_tokens.scss`,
  `src/styles/_theme.scss`, `tests/src/styles/components/validation.test.ts`,
  `tests/src/styles/theme.test.ts`, `app/browser/sections/ValidationSection.ts`,
  `tests/app/browser/sections/ValidationSection.test.ts`, `tests/setupServer.ts` (the ladder and
  its remark only), `tests/setupServer.test.ts` (its plant only).
- Shared, append-only at named anchors (family ruling 13): `src/styles/index.scss`,
  `app/browser/constants.ts`, `app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/setup.ts`,
  `tests/setup.test.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`,
  `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`,
  `tests/app/browser/integration.test.ts`, `tests/conformance.test.ts` (`listed` only),
  `guides/veneer.md`, `guides/ledger/departures.md`, `guides/ledger/additions.md`.
- Off-limits: every other file, including every other component partial, `src/styles/_mixins.scss`,
  `tests/fixtures/oracle/inventory.json`, `tests/setupPolicy.ts`, `tests/policy.test.ts`,
  `vite.config.ts`, `configs/**`, `package.json`, and `ROADMAP.md` (return a patch). No git
  command that discards a working-tree change; no `npm install`.

## Execution

Perform the assignment directly and spawn nothing. Validate scoped and read-only beyond your own
files: `oxfmt` on owned files, then `npm run format:check`, `npm run lint:check`, `npm run check`,
`npm run build:src`, `npm run test:setup`, `npm run test:src:styles`, `npm run test:app`,
`npm run test:conformance`, `npm run test:guides`, `npm run test:policy`, `npm run test:journey`,
`CAPTURE=1 npm run test:journey`. `npm test` once as an observation.

## Output

Write `tmp/units/b-forms-validation-report.md` and return the same text: the coverage matrix; the
token reuse and literal rulings per value; the ledger rows added by member and category; the
deferral rows struck; the icons the map carries and the release variable each came from; the
registered scenarios and the written frames and artifacts; the ladder plant's red and green
readings; the commands you ran with exit codes; deviations per § Deviation protocol in
`/home/user/scaffold/.agents/orchestration.md`; the `ROADMAP.md` patch; and the claims you flag
unverified. No process diary.

## Deviation contract

§ Deviation protocol governs. Ancillary choices this unit settles itself: specimen wording, the
`$icons` key names, where a `FORM_*_CASES` table sits among the frozen tables (append at the end in
barrel order), the case titles, and the reason sentences. Stop and report when a deferral row you
must strike is outside your scope, when a value meets no existing token and no literal is
permitted, when the theme proofs cannot reach green inside your owned files, or when the ladder
change reddens a case outside your owned files.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check` exit 0.
2. `npm run build:src` exits 0 and `dist/src/styles/index.css` contains every recorded selector of
   the three keys and every feedback and tooltip selector the mixin emits (the report shows the
   grep), and declares neither `--bs-form-select-bg-img` nor `--bs-form-switch-bg` at
   `[data-bs-theme='dark']`.
3. `npm run test:setup` exits 0 with the ladder plant recorded red then green and the case tables
   in the inventory.
4. `npm run test:src:styles` exits 0 with the owned proofs present.
5. `npm run test:app` exits 0 with the section in the inventory and its proof present.
6. `npm run test:conformance` exits 0 with the three keys in `listed` and the ledger, deferral, and
   tag gates green (a sibling-caused red is an observation, named).
7. `npm run test:guides` and `npm run test:policy` exit 0.
8. `npm run test:journey` exits 0 and `CAPTURE=1 npm run test:journey` exits 0 writing the unit's
   scenarios under the grammar (the report lists them).
9. `git status --porcelain` lists owned and shared files only.

## Review evidence

The Orchestrator takes the actual diff, the actual status, and the capture listing after you
return; your report carries the readings above.
