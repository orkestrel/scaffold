# B-FORMS — design verdict

Reconciled 2026-09-22 by the Orchestrator from the blind design round on
`units/b-forms-design-brief.md`: `planner` on Opus (`units/b-forms-design-planner-proposal.md`) and
`analyst` on GPT-6 Astra (`units/b-forms-design-analyst-proposal.md`, thread
`01a0cabc-5794-7853-8cc1-2843dd22cb65`), the terrain `units/b-forms-terrain-report.md` (Grok 4.7),
and two readings the Orchestrator took after the lanes returned:

- **The attribution ladder's membership step returns the first shipped key in the inventory's
  recording order** (`attributeSelector` in the F5b tree: `keys.find((key) => shipped.includes(key))`
  over `indexRecordingKeys`, which appends keys in `Object.entries(inventory.components)` order).
  The `form` key opens before `form-control` in `tests/fixtures/oracle/inventory.json`, so once `form`
  ships every forms selector attributes to `form` and the per-key tables collapse. The planner's
  risk 1 is confirmed by reading.
- **The styles build's minifier keeps every vendor pseudo the family needs except
  `::-webkit-file-upload-button`** (`units/b-forms-pseudo-probe.mjs`, lightningcss with modern
  targets: `:-moz-focusring`, `::-moz-focus-outer`, `::-moz-range-thumb`, `::-moz-range-track`,
  `::-moz-color-swatch`, `::-webkit-slider-thumb`, `::-webkit-slider-runnable-track`,
  `::-webkit-color-swatch`, `::-webkit-date-and-time-value`, `::-webkit-datetime-edit`,
  `::placeholder`, and `:-webkit-autofill` all kept; the prefixed file-upload alias dropped, which is
  the existing `Excluded` row's cause). The planner's risk 2 is settled: the units author those
  rules.

## Rulings

1. **The split and its order follow key closure, not the release's files.** Eight units, each
   bounded by one partial, whose accounting act is the key: a key's compatibility row, its
   shipped-list entry, its deferral strikes, and its ledger rows belong to the last unit in the
   landing order whose partial the key's closure needs. Landing order: VALIDATION, then GROUP, RANGE,
   and CHECK, then FLOATING, then CONTROL and SELECT, then CLOSE. No unit writes a bridging deferral
   row; a rule an earlier unit emits into a not-yet-shipped key stays outside the ledger through the
   ladder's withheld-key stop until the closing unit ships the key. The analyst's validation-last
   order and its READY and INTEGRATE units are refused: READY is the Orchestrator's launch check
   (this verdict's readings and the baseline commit), and INTEGRATE is the Orchestrator's serial
   integration as B-PASSIVE runs it.
2. **The ladder prefers the most specific shipped key.** VALIDATION, the first unit, amends the
   membership step in `tests/setupServer.ts`: among the shipped keys recording a selector, prefer
   the one whose name is the longest class token the selector carries (the tie-break the class-prefix
   path already uses), falling back to the first shipped key; a plant in `tests/setupServer.test.ts`
   records a selector under two shipped keys and asserts the longer-named one wins. This keeps
   `form` (the union key, ruling 1's last act) from claiming every forms row.
3. **Naming.** Partials named for the class root they emit, under `src/styles/components/`:
   `_form-label.scss` (`.form-label`, `.form-text`, `.col-form-label*`), `_form-control.scss`,
   `_form-select.scss`, `_form-check.scss`, `_form-range.scss`, `_form-floating.scss`,
   `_input-group.scss`, `_validation.scss`; no `@use` alias (no namespace collides); barrel order
   is Bootstrap's `_forms.scss` import order; proofs mirror the partials under
   `tests/src/styles/components/`; sections `FormLabelSection` through `ValidationSection` with
   `<KEY>_COPY` and `<KEY>_SPECIMENS`; region names are the key in sentence case (`Form control`,
   `Input group`, `Validation`) so `buildStem` yields the key; specimen names open with the key's
   noun. The analyst's `_form.scss` is refused (a partial named for a key it emits no rule for).
4. **Icons.** Every forms SVG data URI lives in `src/styles/_tokens.scss`: a `$icons` Sass map for
   the mode-independent glyphs (check, radio, indeterminate, switch off, switch focus, switch on,
   the light caret, the valid mark, the invalid mark), read by the partial through `map.get` into the
   `--bs-form-check-bg-image`, `--bs-form-switch-bg`, `--bs-form-select-bg-img`, and
   `--bs-form-select-bg-icon` declarations Bootstrap writes; the mode-varying caret and unchecked
   knob stay in `$dark`. A Sass map entry is not a token, so the tokenizing ceiling is untouched.
   The theme-scope emission of `--bs-form-select-bg-img` and `--bs-form-switch-bg` from `$assets`
   is removed and Bootstrap's dark descendant rules land on the component selectors
   (`[data-bs-theme='dark'] .form-select`, `[data-bs-theme='dark'] .form-switch .form-check-input:not(:checked):not(:focus)`),
   because a declaration on the element beats an inherited theme-scope value; `$assets` keeps the
   toggler and accordion entries so the `@error` proof keeps its subject. VALIDATION owns that
   rewrite of `_tokens.scss` and `_theme.scss`, and both files are off-limits to every other unit.
   No escaped-SVG idiom, no encoder, no tinting mechanism, no `--set-*` import, no paired light and
   dark glyph beyond the two Bootstrap pairs (Elements' `currentColor` caret is refused as a defect).
5. **The elements layer.** The elements layer owns the rule keyed to a bare element or bare pseudo;
   the component partial owns the rule keyed to `.form-control` and its kin, authored beside the
   Reboot rules, never restating them (terrain § C's list). `[type=range]` gets no bare-tag rule.
   Vendor pseudos: author every one the probe keeps; record `::-webkit-file-upload-button` and its
   twins under the existing `Excluded` row; the exclusion rule is by cause (a vendor pseudo that
   suppresses a default is excluded; one that paints a part ships), so `::-moz-range-thumb`,
   `::-moz-range-track`, and `::-moz-color-swatch` ship. Proof of a vendor pseudo takes the ladder:
   the resolved reading first, then the authored declaration through `findRule` and `readRules`
   (compiled-contract evidence, named as such), corroborated by the frame; each unit's report names
   the path each pseudo took, and no source reading is called a rendered proof.
6. **D11 and the oracle's logical properties.** Where the release's compiled CSS carries a logical
   property (the file button's `margin-inline-end`, `-webkit-margin-end`, `border-inline-end-width`),
   the partial ships it byte for byte: D11 matches the release's own output, and shipping the
   release's property is that match. No right-to-left output follows from it.
7. **The showcase and the captures.** One section per partial. A state the markup declares
   (`[readonly]`, `:disabled`, `:checked`, `.is-valid`, `.is-invalid`, `.was-validated` over a
   required empty control) is a specimen rendered at rest; a state only a journey produces is a
   scenario: `focus` (already in `CaptureState`) and `indeterminate`, the family's one extension of
   `CaptureState`, driven by setting the property. A focus scenario is a page frame (the Button
   ruling); every other scenario an element frame over the lifted specimen. Each unit's report
   carries the coverage matrix (inventory selector and condition → proof case, subject, specimen,
   scenario, evidence limit). The analyst's wider state vocabulary is refused as scenarios and kept
   as specimens.
8. **Deferred rows.** GROUP retires `.input-group .btn`, `.input-group .btn:focus`,
   `.input-group-lg > .btn`, `.input-group-sm > .btn`, and `.btn-toolbar .input-group` (authored in
   `_input-group.scss`), adds the two `Disclosure` dropdown rows
   (`.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)` and
   `.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4)`), and ships the
   `:not(.dropdown-menu)` sibling rule. CLOSE retires the three `.col-form-label*` rows. A unit that
   ships a name the table still names deletes the row in the same change (family ruling 6).
9. **Departures and additions.** Every Elements and Mailbox candidate is refused as both lanes rule
   (element-level validation, `form[data-form-validated]`, `:user-valid`, the `currentColor` caret,
   the custom select and range widgets, the paired glyph families). The family's one departure
   class: where the release compiles a role colour, space, size, radius, border width, or motion
   value to a literal, the partial writes the existing `--vn-*` token the shipped partials bind
   (`_button.scss` and `_table.scss` are the pattern, the focus shadow included) and the comparison
   records a `tokenized` departure; where the release references a `--bs-*` global the tree
   declares, the partial writes it byte for byte; a unit meeting a value with no existing token
   stops and reports. The analyst's request to keep the literal check focus shadow is refused in
   favour of the button's binding; the proof reads the ring's ratio against `FOCUS_RING`.
10. **Proof shape.** Value-sensitive readings through the installed browser exports as the planner
    maps them (`readStyle` with a pseudo argument, `readToken`, `readRing`, `matchesColor`,
    `stageMedia`/`releaseMedia`, `typeAccessible`/`commitInput`, `traverseAccessible`,
    `readStates`), the token, override, factor, and mode readings family ruling 11 owes, and the
    analyst's wrong-value controls named per case in the report (wrong URI, missing dark rule, wrong
    shadow width, swapped validation binding, wrong group corner, a surviving reduced-motion
    transition). Case tables are frozen `FORM_*_CASES` in `tests/setupStyles.ts` with their freeze
    and inventory rows.
11. **Standing conditions every brief carries.** The baseline is the commit the launch prompt
    names; the B-PASSIVE family lands in parallel and its partials may be absent from a worktree; a
    scoped conformance run that reddens on a sibling's absent file is an observation, never a
    repair; the ledger's home and shapes are `units/b-passive-baseline.md`'s; shared files are
    append-only at named anchors and integration is serial.

## Units and routing

| Unit | Role and engine | Closes | Owned | Depends on |
| --- | --- | --- | --- | --- |
| B-FORMS-VALIDATION | `opus` on Opus (served Opus 5) | `was-validated`, `is-valid`, `is-invalid` | `_validation.scss`, `_tokens.scss`, `_theme.scss`, `validation.test.ts`, `ValidationSection.ts`, the ladder tie-break in `tests/setupServer.ts` and its plant | baseline |
| B-FORMS-RANGE | `opus` on Opus | `form-range` | `_form-range.scss`, `form-range.test.ts`, `FormRangeSection.ts` | baseline (integrates after VALIDATION for barrel order) |
| B-FORMS-GROUP | `opus` on Opus | `input-group`, the feedback and tooltip keys | `_input-group.scss`, `input-group.test.ts`, `InputGroupSection.ts` | VALIDATION |
| B-FORMS-CHECK | `opus` on Opus | `form-check` | `_form-check.scss`, `form-check.test.ts`, `FormCheckSection.ts`, `CaptureState` gains `indeterminate` | VALIDATION |
| B-FORMS-FLOATING | `opus` on Opus | `form-floating` | `_form-floating.scss`, `form-floating.test.ts`, `FormFloatingSection.ts` | GROUP |
| B-FORMS-CONTROL | `opus` on Opus | `form-control` | `_form-control.scss`, `form-control.test.ts`, `FormControlSection.ts` | FLOATING |
| B-FORMS-SELECT | `opus` on Opus | `form-select` | `_form-select.scss`, `form-select.test.ts`, `FormSelectSection.ts` | FLOATING |
| B-FORMS-CLOSE | `opus` on Opus | `form` | `_form-label.scss`, `form-label.test.ts`, `FormLabelSection.ts`, the family's guide sections | CONTROL, SELECT, CHECK, RANGE |

Shared, append-only for every unit: `src/styles/index.scss`, `app/browser/constants.ts`,
`app/browser/Showcase.ts`, `app/browser/index.ts`, `tests/setup.ts`, `tests/setupStyles.ts` and its
proof, the showcase and index proofs, the journey, the `listed` literal in
`tests/conformance.test.ts`, `guides/veneer.md`, and the ledger files. Audit per unit: `analyst` on
Astra and `reviewer` on Opus on one claims file, `checker` where a criterion is mechanical; one
`verifier` chain at the family's close; the capture portfolio ruled in one round.

## Exit criterion

Every B-FORMS key ships with every recorded selector in the built cascade, its compatibility and
ledger rows measured, its deferral rows retired, its specimens rendered and captured under the
grammar, the theme-scope caret and knob emission relocated to the component rules, the ladder
preferring the most specific shipped key, and the family's guide sections and coverage matrices
landed; `npm test` and `CAPTURE=1 npm run test:journey` green on the integrated tree.
