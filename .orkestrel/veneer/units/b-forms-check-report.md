# Unit B-FORMS-CHECK — report

The `form-check` key ships as a Bootstrap 5.3.8 baseline in `/home/user/veneer-bfc` (detached at
`2c10329`, uncommitted). Every recorded `form-check` selector, the switch row's `.form-switch`
inset, and the dark knob rule are in the built cascade. The ledger, deferral, compatibility, and tag
gates are green. Every scoped gate exits 0 except `npm run test:setup`, whose single red is the
shipped-key Set literal in `tests/setupServer.test.ts`. That literal is the Orchestrator's
integration edit, and it must gain `form-check`. Finished under the successor brief
`tmp/units/b-forms-check-brief-2.md`. Executed natively on Opus 5.5, so no bench journal applies.

## Touched files

Diffstat (`git diff --stat`, the untracked files entered with `git add -N` for the evidence only):
17 files changed, 1389 insertions(+), 2 deletions(-). The two deletions are the old
`CaptureState` line and its closing doc line in `tests/setup.ts`, which the authorized union edit
replaces.

| File | Change |
| --- | --- |
| `src/styles/components/_form-check.scss` (new, owned) | The check partial: every non-validation `form-check` rule, the `.form-switch` inset, the reduced-motion twin through the `transition` mixin, and the dark knob rule reading `map.get(tokens.$dark, 'switch-knob')`. Glyphs come from `map.get(tokens.$icons, …)`. |
| `tests/src/styles/components/form-check.test.ts` (new, owned) | The browser proof. The verbose run lists 23 tests, the `it.each` glyph rows included. |
| `app/browser/sections/FormCheckSection.ts` (new, owned) | The `Form check` region, in the `FormRangeSection` shape. |
| `tests/app/browser/sections/FormCheckSection.test.ts` (new, owned) | The section proof: render order, markup, names, roles, states, the radio group in its own form, freezing, and destruction. |
| `src/styles/index.scss` (anchor) | `@use 'components/form-check';` directly before `@use 'components/form-range';`. |
| `app/browser/constants.ts` (anchor) | `FORM_CHECK_COPY` and `FORM_CHECK_SPECIMENS`, inserted before the Form range block. |
| `app/browser/Showcase.ts` (anchor) | The import, and `new FormCheckSection(this.#main)` directly before `FormRangeSection`. |
| `app/browser/index.ts` (anchor) | The re-export, before `FormRangeSection`. |
| `tests/setup.ts` (anchor) | `CaptureSubject` gains the specimen names. `CaptureState` gains `'indeterminate'`. `CASCADE_KEYS` gains rows at its end. `FORM_CHECK_KEYS` follows `CLOSE_KEYS`, and `CAPTURE_KEYS` gains the spread. |
| `tests/setup.test.ts` (anchor) | The import, the export literal, the spread, and one case holding `FORM_CHECK_KEYS` to the resting registry and the stem law. |
| `tests/setupStyles.ts` (anchor, end of file) | `FORM_CHECK_SELECTORS`, `FORM_CHECK_ICON_CASES`, and `FORM_CHECK_MARKUP`. |
| `tests/setupStyles.test.ts` (anchor) | The imports, the export-literal rows, and a `check case tables` describe block that binds the tables to the inventory and to the compiled `$dark` knob. |
| `tests/app/browser/Showcase.test.ts` (anchor) | `'Form check'` in the region list, and `FORM_CHECK_SPECIMENS` in the specimen list. |
| `tests/app/browser/index.test.ts` (anchor) | The export rows `FORM_CHECK_COPY`, `FORM_CHECK_SPECIMENS`, and `FormCheckSection`. |
| `tests/app/browser/integration.test.ts` (anchor) | The specimen import, the declared-subject list, the `FORM_CHECK_ICON_CASES` import, and the focus and mixed-state journey cases appended at the end of `journey`. |
| `tests/conformance.test.ts` (`listed` only) | `'form-check'`, in sorted position. |
| `guides/veneer.md` (anchors) | `### Form check classes` before `### Form range classes`, the § Files row, the § Tests link, the § Compatibility selector and variable rows before `form-range`, and the `#### \`form-check\`` ledger table after `#### \`btn-close\``. |

## Coverage matrix

The following table maps each inventory selector and condition to its proof case, specimen,
scenario, and evidence limit. Proof cases are named by their titles in `form-check.test.ts`. The
`emits every recorded check selector…` case holds every row that follows in the components layer.

| Inventory selector (key) | Condition | Proof case | Specimen | Scenario | Evidence limit |
| --- | --- | --- | --- | --- | --- |
| `.form-check` (form-check) | — | lays the row out around a floated box… | Form check box | `form-check-box` | — |
| `.form-check .form-check-input` | — | lays the row out… | Form check box | `form-check-box` | — |
| `.form-check-reverse` | — | mirrors the reverse row and the reverse switch | Form check reverse | `form-check-reverse` | — |
| `.form-check-reverse .form-check-input` | — | mirrors the reverse row… | Form check reverse | `form-check-reverse` | — |
| `.form-check-input` | — | strips the native box…; paints the resting box… | every specimen | `form-check-box` | `print-color-adjust` is read as a resolved value only, because no proof prints |
| `.form-check-input[type=checkbox]` | — | rounds the checkbox, circles the radio… | Form check box | `form-check-box` | — |
| `.form-check-input[type=radio]` | — | rounds the checkbox… | Form check radios | `form-check-radios` | — |
| `.form-check-input:active` | — | darkens a box while the pointer holds it | none (pointer state) | none | no frame: the brief registers focus and indeterminate as the only drives |
| `.form-check-input:focus` | — | rings a keyboard-focused box… (light, and dark) | Form check box | `form-check-box-focus` (page frame) | — |
| `.form-check-input:checked` | — | fills a checked box, a checked radio, and a mixed box… | Form check checked, radios, switch checked | `form-check-checked` | — |
| `.form-check-input:checked[type=checkbox]` | — | glyph row `checked checkbox`; shows the mixed glyph over the checked one… | Form check checked | `form-check-checked` | — |
| `.form-check-input:checked[type=radio]` | — | glyph row `checked radio` | Form check radios | `form-check-radios` | — |
| `.form-check-input[type=checkbox]:indeterminate` | — | glyph row `indeterminate checkbox`; fills…; shows the mixed glyph… | Form check box (driven) | `form-check-box-indeterminate` (element frame) | — |
| `.form-check-input:disabled` | — | dims a disabled box and its label… | Form check disabled, Form check switch disabled | `form-check-disabled`, `form-check-switch-disabled` | — |
| `.form-check-input[disabled] ~ .form-check-label` | — | dims a disabled box… (attribute host) | Form check disabled | `form-check-disabled` | — |
| `.form-check-input:disabled ~ .form-check-label` | — | dims a disabled box… (disabled-fieldset host matches the state and not the attribute) | Form check disabled (matches both rules) | `form-check-disabled` | The fieldset-only host is proof-only and has no specimen |
| `.form-switch` (recorded under `form`) | — | lays the switch out as a track… | Form check switch | `form-check-switch` | Outside the ledger, because the `form` key is withheld |
| `.form-switch .form-check-input` | — | glyph row `resting switch`; lays the switch out…; rounds… | Form check switch | `form-check-switch` | — |
| `.form-switch .form-check-input` | `@media (prefers-reduced-motion: reduce)` | slides the knob on the motion tokens and holds it still under reduced motion | Form check switch | none | Frames show no motion |
| `.form-switch .form-check-input:focus` | — | glyph row `focused switch`; keeps the checked and focused knobs on a dark switch… | none (focus of a switch) | none | No switch-focus frame, because only the checkbox focus scenario is briefed |
| `.form-switch .form-check-input:checked` | — | glyph row `checked switch`; lays the switch out… (knob at `100% 50%`) | Form check switch checked | `form-check-switch-checked` | — |
| `.form-switch.form-check-reverse` | — | mirrors the reverse row and the reverse switch | Form check switch reverse | `form-check-switch-reverse` | — |
| `.form-switch.form-check-reverse .form-check-input` | — | mirrors the reverse row… | Form check switch reverse | `form-check-switch-reverse` | — |
| `.form-check-inline` | — | sets inline rows side by side… | Form check inline | `form-check-inline` | — |
| `[data-bs-theme=dark] .form-switch .form-check-input:not(:checked):not(:focus)` (recorded under `theme`) | — | glyph row `dark resting switch`; keeps the checked and focused knobs… | Form check switch (dark variants) | `form-check-switch` at `dark-*` | — |
| The validation selectors the key records (`.was-validated …`, `.is-valid`, `.is-invalid`, `-feedback`) | — | Owned by VALIDATION (`validation.test.ts`) | Valid check, Invalid check | `valid-check`, `invalid-check` | Not emitted here. `tests/setupStyles.test.ts` proves the partition |

## Token reuse and literal rulings

The following table gives the ruling for each recorded value. The `Departure` column is what the
comparison reports.

| Site and property | Release | Written | Ruling |
| --- | --- | --- | --- |
| `.form-check` `min-height` | `1.5rem` | `var(--vn-space-12)` | tokenized. This is `.form-range`'s own binding of `1.5rem`. |
| `.form-check` `margin-bottom` | `0.125rem` | `var(--vn-space-1)` | tokenized (space) |
| `.form-check-inline` `margin-right` | `1rem` | `var(--vn-space-8)` | tokenized (space, the card and breadcrumb binding) |
| `.form-check-input:focus` `box-shadow` | `0 0 0 0.25rem rgba(13, 110, 253, 0.25)` | `0 0 0 var(--vn-focus-width) var(--vn-focus-color)` | tokenized, the `_button.scss` focus binding (ruling 9) |
| `.form-check-input:focus` `border-color` | `#86b7fe` | `color-mix(in srgb, var(--vn-palette-blue) 50%, var(--vn-palette-white-base))` | tokenized. A literal colour is barred by the styles rule, and `color-mix()` over tokens is permitted. The mix is the release's own derivation (`tint-color($primary, 50%)`). It reads half a channel step under `#86b7fe` (`color(srgb 0.52549 0.715686 0.996078)`, measured). |
| `:checked` and `[type=checkbox]:indeterminate` `background-color` and `border-color` | `#0d6efd` | `var(--vn-palette-blue)` | tokenized. This departs from the brief's "role token" wording. See Deviations. |
| `.form-switch .form-check-input` `transition` | `background-position 0.15s ease-in-out` | `background-position var(--vn-motion-feedback) var(--vn-ease-standard)` through the `transition` mixin | tokenized (the `.btn` and `.form-range` binding) |
| `--bs-form-check-bg` | `var(--bs-body-bg)` | the same | byte for byte, no row |
| `border` | `var(--bs-border-width) solid var(--bs-border-color)` | the same | byte for byte, no row |
| The `em` lengths: row inset `1.5em`, box `1em`, `margin-top: 0.25em`, checkbox radius `0.25em`, switch width and radius `2em`, switch inset `2.5em` | release | literal | No token is relative to the element's font size. The radius scale is `rem`, so `0.25em` stays literal. |
| radio radius `50%`, `filter: brightness(90%)`, disabled `opacity: 0.5`, positions (`center`, `left center`, `right center`) | release | literal | No token carries these values. `--vn-button-opacity` is `0.65`. |
| The glyphs (`check`, `radio`, `indeterminate`, `switch-knob`, `switch-focus`, `switch-checked`, and the dark `switch-knob`) | the baked URIs | `map.get(tokens.$icons, …)` and `map.get(tokens.$dark, 'switch-knob')` | byte for byte (ruling 4). No row. |
| `-webkit-appearance`, `-moz-appearance`, `-webkit-print-color-adjust`, `color-adjust` | `none` / `exact` | — | dropped. The build restores `-webkit-print-color-adjust` in `dist` on its own (measured in `dist/src/styles/index.css`). |

No value met a missing token where a literal was barred. No token was added.

## `.btn-check` overlap

The release's check partial writes the `.btn-check` rules in the following table. The inventory
records each of them under the `btn` key, not under `form-check`. Every one is already emitted by
`src/styles/components/_button.scss`, in a different form. This partial emits none of them. Per the
brief this is a deviation report, not a change.

| Release rule (key `btn`) | Release declarations | Shipped in `_button.scss` | Ruling |
| --- | --- | --- | --- |
| `.btn-check` | `position: absolute; clip: rect(0, 0, 0, 0); pointer-events: none` | `position: absolute; width: 1px; height: 1px; clip-path: inset(50%); overflow: hidden; white-space: nowrap; pointer-events: none` | Different form. Not emitted here. Reported. |
| `.btn-check[disabled] + .btn` | `pointer-events: none; filter: none; opacity: 0.65` | grouped into the `.btn:disabled…` rule: disabled colour and fill, `box-shadow`, `opacity: var(--bs-btn-disabled-opacity)`, `pointer-events: none`, and no `filter: none` | Different form. Not emitted here. Reported. |
| `.btn-check:disabled + .btn` | the same | the same grouped rule | Different form. Not emitted here. Reported. |

The `_button-group.scss` rules at lines 18 to 25 (`.btn-group > .btn-check:checked + .btn` and
its twins) belong to `btn-group` and do not overlap anything the check partial writes.

## Departures and additions

The `#### \`form-check\`` table under § Tokens › § Departures carries the rows the first ledger
loop printed, grouped here by category:

- **tokenized:** `.form-check` `min-height` and `margin-bottom`; `.form-check-input:focus`
  `border-color` and `box-shadow`; `.form-check-input:checked` `background-color` and
  `border-color`; `.form-check-input[type=checkbox]:indeterminate` `background-color` and
  `border-color`; `.form-switch .form-check-input` `transition`; `.form-check-inline`
  `margin-right`.
- **dropped:** `.form-check-input` `-webkit-appearance`, `-moz-appearance`,
  `-webkit-print-color-adjust`, and `color-adjust`.

**Additions:** none. The comparison reports no addition. The `.form-switch` rule and the dark knob
rule are recorded under the withheld `form` and `theme` keys, so they fall outside the ledger by
the ladder.

## Deferral rows struck

None. No row in § Deferred selectors names a `form-check` or `form-switch` selector (checked by
reading the whole table; its Forms rows are the `.input-group` and `.col-form-label` names). The
deferral gate is green.

## Scenarios, frames, and artifacts

- **`CASCADE_KEYS` rows (element frames over the lifted specimen):** `form-check-box`,
  `form-check-checked`, `form-check-radios`, `form-check-disabled`, `form-check-reverse`,
  `form-check-inline`, `form-check-switch`, `form-check-switch-checked`,
  `form-check-switch-disabled`, `form-check-switch-reverse`.
- **`FORM_CHECK_KEYS`:**
  - `form-check-box-focus` is a page frame. The keyboard traversal starts from the trailing
    `Wrapping toolbar` button, and the declared region is the specimen's row. The ring ratio is
    pinned to `FOCUS_RING[mode]`, and focus and the ratio are read again after the shot.
  - `form-check-box-indeterminate` is an element frame over a lifted copy with renamed ids. The
    journey sets the property on the copy, checks the glyph against `FORM_CHECK_ICON_CASES`, and
    reads the state and the glyph again after the shot. It also asserts that the showcase's own
    box stays at rest.
- **Written by the four `CAPTURE=1` runs** under `tmp/capture/states/`; `ls` counted 88 `form-check*` files.
  - The frames (48 in the listing): every scenario at `light-1280`, `dark-1280`, `light-390`, and `dark-390`.
  - The accessibility artifacts (40 in the listing): one per subject and variant, for the subjects `form-check-box`,
    `-checked`, `-disabled`, `-inline`, `-radios`, `-reverse`, `-switch`, `-switch-checked`,
    `-switch-disabled`, and `-switch-reverse`.
  - Frames viewed: `form-check-radios--dark-1280` shows `Collect in store` still checked on the
    second (dark) pass of the rest loop, `form-check-box-indeterminate--light-390` shows the mixed
    glyph, `form-check-switch--dark-390` shows the dark knob, and
    `form-check-switch-reverse--light-1280` shows the trailing switch.
- **Radio pair placement:** the pair sits in its own `<form>` with a named `radiogroup`. The rest
  loop clones specimens without renaming, and a same-name checked radio in the clone would uncheck
  the showcase pair. The existing `Vertical group` specimen carries that hazard. It is recorded as
  an observation for its owner and was not changed here.

## Shipped-key Set literal

`tests/setupServer.test.ts` › `skips engine and CSS obligations whose Proof cell is a dash` must
gain `'form-check'`, sorted between `'figure'` and `'form-range'`. This is the one red in
`npm run test:setup`.

## Commands, exit codes, and counts

All commands ran from `/home/user/veneer-bfc` with npm 11 on `PATH` and
`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. The final gate chain ran on 2026-09-23 after the last
edit.

| Command | Exit | Reading |
| --- | --- | --- |
| `npx oxfmt --config .oxfmtrc.json --write` on the owned files; `--check` on every touched file | 0 | clean |
| `npm run format:check` | 0 | All matched files use the correct format |
| `npm run lint:check` | 0 | no diagnostics |
| `npm run check` | 0 | — |
| `npm run build:src` | 0 | The `dist` grep script reports 40 recorded `form-check` selectors plus the dark rule, and none is missing from `dist/src/styles/index.css`. The reduced-motion twin is present, and `.btn-check` appears once (Button's form). |
| `npm run test:setup` | 1 | 185 passed, 1 failed (the shipped-key Set literal, an observation for the Orchestrator); 186 tests, 3 files |
| `npm run test:src:styles` | 0 | 657 passed, 71 files. The owned proof alone passes 23 of 23. |
| `npm run test:app` | 0 | 55 passed, 23 files |
| `npm run test:conformance` | 0 | 17 passed |
| `npm run test:guides` | 0 | 18 passed |
| `npm run test:policy` | 0 | 109 passed, 1 skipped |
| `CAPTURE=1 npm run test:journey -- --project 'journey:light-1280*'` | 0 | 34 passed, 130 s |
| `… 'journey:dark-1280*'` | 0 | 34 passed, 102 s |
| `… 'journey:light-390*'` | 0 | 34 passed, 89 s |
| `… 'journey:dark-390*'` | 0 | 34 passed, 91 s |
| `npm run test:journey` | 0 | 136 passed, 4 files, 97 s |
| `npm test` (observation) | 1 | `test:src` 77, `test:src:styles` 657, `test:src:tailwind` 8, `test:app` 55, `test:journey` 136, `test:policy` 109 plus 1 skipped, and `test:config` 173 plus 1 skipped, all passed. It stops at `test:setup` on the same Set literal red. 267 s. |
| `npm run build:src && npm run test:conformance` (ledger loop, first pass before the table) | 1 | The unrecorded departure rows it printed became the table. Green after. |

**Mutation plants** (the `prove` tool was unavailable, so the runtime fallback was used: exact
reverse edit, then a rebuild, then a check that the restored file compares equal). The scratchpad
script `plants.mjs` ran the proof alone after each plant:

| Plant in `_form-check.scss` | Proof reading | Red cases |
| --- | --- | --- |
| wrong URI (`radio` → `check`) | 1 failed, 22 passed | glyph `checked radio` |
| missing dark rule | 3 failed, 20 passed | selector presence; glyph `dark resting switch`; the dark-switch knobs case |
| wrong shadow width (`0.25rem`) | 1 failed, 22 passed | rings a keyboard-focused box… |
| swapped checked and indeterminate image | 2 failed, 21 passed | glyph `indeterminate checkbox`; shows the mixed glyph over the checked one… |
| surviving reduced-motion transition (bare `transition`) | 1 failed, 22 passed | slides the knob… |
| lost disabled opacity | 1 failed, 22 passed | dims a disabled box… |
| role token fill (`--vn-color-primary-base`) | 1 failed, 22 passed | fills a checked box… |
| literal row floor (`1.5rem`) | 1 failed, 22 passed | lays the row out… |

**Negative controls** (`plants2.mjs`):

- A comment-only edit to the partial reads 23 passed.
- A one-character drift in the pinned radio glyph in `tests/setupStyles.ts` reads 1 failed and 85
  passed on `tests/setupStyles.test.ts` (`binds each check glyph…`).
- A trailing space outside the pinned rows reads 86 passed.

Every plant was restored, and the script confirmed the restored file compares equal.

Tests that ran red before their fix during development:

- `rings a keyboard-focused box…` read `color(srgb 0.52549 0.715686 0.996078)`, which is half a
  step off `#86b7fe`. It was fixed by holding the reading to the release's own mix, with a palette
  retune added.
- `lays the switch out…` read the knob mid-transition. It was fixed with `waitForAnimations`.
- The journey portfolio cases failed with "2 rendered subjects answer to the name `Form check`"
  (the region and the specimen). The fix renamed the specimen to `Form check box`.

## Deviations (§ Deviation protocol)

1. **The theme scope still declares `--bs-form-switch-bg`.**
   - Expected: VALIDATION removed it (verdict ruling 4), or this unit removes it (`ROADMAP.md`
     carrier row "Theme-scope select caret and switch knob": "B-FORMS-CHECK removes `switch-knob`
     from `$assets`").
   - Found: `src/styles/_tokens.scss` line 163 `'switch-knob': '--bs-form-switch-bg',` inside
     `$assets`, which `_theme.scss` lines 21 to 26 emit on `[data-bs-theme='dark']`.
   - Done: under the brief's standing condition, the component dark rule landed anyway, and the
     proof reads what the element resolves. The `dark resting switch` row passes, and the
     missing-dark-rule plant reddens it, so the theme-scope value does not reach the control.
   - Not done: the removal. Both files are off-limits under this brief. The brief also carries a
     conflict: its standing condition says "report … land … anyway", and its deviation contract says
     "stop and report". The more specific standing condition was followed.
   - Exact patch for the carrier:

     ```diff
     --- a/src/styles/_tokens.scss
     +++ b/src/styles/_tokens.scss
     @@ $assets: (
      	'select-indicator': '--bs-form-select-bg-img',
     -	'switch-knob': '--bs-form-switch-bg',
      	'toggler-icon': '--bs-navbar-toggler-icon-bg',
     ```

   - Unmeasured consequences (not run): `tests/src/styles/tokens.test.ts` › `re-declares every
     theme-dependent name inside each mode scope` compares the dark scope's `--bs-*` names with
     `BOOTSTRAP_DARK_VARIABLES`, which contains `--bs-form-switch-bg`. The guide's § Tokens
     paragraph "Bootstrap also retunes `--bs-form-select-bg-img`, `--bs-form-switch-bg`, …" and the
     `$assets` doc comment would also go false.
   - Hypothesis: the carrier is a unit that owns `_tokens.scss`, `tokens.test.ts`,
     `theme.test.ts`, and that guide paragraph.
2. **The checked and mixed fill reads `--vn-palette-blue`, not the role token the brief names.**
   - Evidence: `_list-group.scss` and `_form-range.scss` bind the same release variable
     (`$component-active-bg`, `#0d6efd`) to `--vn-palette-blue`, and every glyph on the fill bakes
     white. The dark `--vn-color-primary-base` is `oklch(0.7 0.15 233)`, a light fill under that
     white glyph.
   - The `role token fill` plant shows the proof separates the two bindings.
   - If the Orchestrator rules for the role token, it is a one-line change in the checked rule and in the
     mixed rule, plus the proof's fill case and the ledger rows.
   - Observation for B-PASSIVE-CLOSE's § Customization carrier: the check fill joins the
     palette-entry readers (see the `ROADMAP.md` patch).
3. **The resting specimen is named `Form check box`, not `Form check`.** The region is named
   `Form check` (ruling 3), and `readSubject` refuses a name that more than one rendered subject answers to. The
   driven scenarios are `form-check-box-focus` and `form-check-box-indeterminate`.
4. **A `Form check switch reverse` specimen and its row were added.** Family ruling 9 requires
   every recorded selector to be rendered once, and `.form-switch.form-check-reverse` had no
   specimen. The brief makes specimen count an ancillary choice.
5. **The `.btn-check` rules are emitted by `_button.scss` in a different form.** See the overlap
   table. Nothing was changed.
6. **The index gained intent-to-add entries.** `git add -N` was run on the new owned files so
   that `git diff` renders them. The brief allows this for evidence only.

## `ROADMAP.md` patch (report-only)

Apply the following replacements, then run `oxfmt --write ROADMAP.md` to realign the two
tables.

- **Line 278 (B-FORMS row):** replace ``RANGE's fix rounds by `analyst`); GROUP is next`` with
  ``RANGE's fix rounds by `analyst`); CHECK returned for audit from `/home/user/veneer-bfc`
  (report `units/b-forms-check-report.md`), and GROUP is next``.
- **Line 375 (carrier row "Theme-scope select caret and switch knob"):** replace ``B-FORMS-SELECT
  removes `select-indicator` and B-FORMS-CHECK removes `switch-knob` from `$assets` `` with
  ``B-FORMS-SELECT removes `select-indicator` from `$assets`; the `switch-knob` removal was scoped
  out of B-FORMS-CHECK (its brief held `_tokens.scss` off-limits), so the unit the Orchestrator
  names for it removes `switch-knob` ``. Name the unit when it is chosen.
- **Line 379 (carrier row "§ Customization's claim…"):** replace ``(the pagination and list-group
  active fills and the range thumb read the palette entry)`` with ``(the pagination and list-group
  active fills, the range thumb, and the check fill read the palette entry)``.

## Claims flagged unverified

- The consequences of removing `switch-knob` from `$assets` (deviation 1) are read from source and
  were not run.
- The journeys ran while sibling units loaded the host (load average 12.1 at one reading), and all
  passed. Timing under load stays the Orchestrator's reading.
- Comment-only edits to `tests/setup.ts`, `tests/setup.test.ts`, and `tests/setupStyles.ts` landed
  while the `light-1280` capture run was in flight. `check`, `test:app`, and the plain `npm run test:journey`
  ran after them and read green, and `test:setup` read only the Set literal red.
- The focus page frames were not opened. They are full-page shots, and the journey's pixel guard
  read each one inside its declared region.
