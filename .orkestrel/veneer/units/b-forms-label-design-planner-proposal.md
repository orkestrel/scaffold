# B-FORMS-LABEL design — planner proposal (subjective lane, Opus 5.5 native, task a720a8917bb041407)

Retained verbatim from the `planner` subagent's returned message; the brief is `b-forms-label-design-brief.md` beside this file.

---

# B-FORMS-LABEL — planner proposal (subjective lane, Opus 5.5)

I held the **subjective** lane. The objective lane's sections belong to the analyst.

I read the tree at Veneer `e0c901a` and designed for the tree after `bfs`, `bft`, and `bff` land, as the brief directs. At `e0c901a` the `collectDeclarationReads` helper is absent from `tests/setupServer.ts`, and I treat it as present.

**Brief and tree disagree on one point.** The brief names per-key `#### form-control` and `#### form-select` departure tables. The tree has none. Under § Departures the only forms heading is `#### form-check` (around line 3278 of `guides/veneer.md`), and that one table holds the rows for `form-check`, `form-control`, `form-select`, `form-floating`, `input-group`, and the feedback and tooltip keys. The terrain agrees with the tree. I ruled on the tree: the 43 moved rows keep their Component cells, and the table they sit in is the pooled one.

## Units

### U0 `bfl-probe` — measure the attribution ladder before any brief is written

- **Route.** `builder` on Sonnet writes the probe. `verifier` on Sonnet runs it and reports. The probe runs before U1 and U2 launch, so it may live in Veneer's `tmp/probe/`.
- **Owned files.** `tmp/probe/bfl-ladder.test.ts`, which runs in the `probe` project. It is never committed.
- **Shared, report-only files.** None.
- **Off-limits files.** Every tracked file.
- **What it measures.** It takes today's `collectLedger` departure and addition rows, with `form` appended to the shipped list. For every row, it computes the owner under two ladders:
  - today's `attributeSelector` ladder;
  - the tiered ladder that Ruling A recommends, re-implemented locally from the exported `indexRecordingKeys`, `collectSelectorClasses`, and `matchShippedKey` functions.
- **Report.** Every row whose owner differs between the two ladders, with its selector, property, and both owners. Every row whose tiered owner differs from the Component cell today's guide carries. The totals.
- **Acceptance criteria**, cheap first:
  1. The probe is collected by the `probe` project alone.
  2. It reproduces the brief's measurement under today's ladder: 1058 departures and 157 additions, with 43 departure rows moving to `form`. This is the probe's control, so it proves the instrument can report a move.
  3. It lists every row the tiered ladder moves. I expect those 43 rows to return to `form-control`, `form-check`, and `form-select`, the `.row-gap-*` rows to move from `row` to `row-gap`, and nothing else. The run decides.
- **Risk.** If the tiered ladder moves a family beyond `.row-gap-*`, the Orchestrator rules on each moved family before writing U1's brief.

### U1 `bfl-cascade` — the partial, the ladder, the tables, the lists, and the guide

- **Route.** `opus` on Opus 5.5, native, in its own worktree.
- **Routing deviation to record.** The ladder, the lists, and the ledger are objective work. The unit also owns browser style proofs that drive Chromium, and the Codex sandbox denies Chromium (`listen` fails `EPERM`). This is the same deviation `bft` and `bff` recorded.
- **Owned files:**
  - `src/styles/components/_form-label.scss` (created)
  - `src/styles/index.scss`
  - `tests/src/styles/components/form-label.test.ts` (created)
  - `tests/src/styles/components/form-floating.test.ts`
  - `tests/setupStyles.ts` and `tests/setupStyles.test.ts`
  - `tests/setupServer.ts` and `tests/setupServer.test.ts`
  - `tests/conformance.test.ts`
  - `guides/veneer.md`
- **Shared, report-only files.** `ROADMAP.md`. The Orchestrator strikes the `form` key carrier row and the R6 carrier row at landing.
- **Off-limits files:**
  - `src/styles/_tokens.scss`, `src/styles/_theme.scss`, and `src/styles/_mixins.scss`
  - every other partial
  - `src/styles/elements/**`
  - `app/**` and `tests/app/**`
  - `tests/setup.ts` and `tests/setup.test.ts`
  - `tests/fixtures/**`
  - the paths `scaffold repair` restores (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`)
- **Order.** After U0. Runs in parallel with U2, from the commit `bff` lands on.

**What it builds:**

- **The ladder.** Among the shipped recorders, `attributeSelector` answers in this order:
  1. the key whose name equals a class the selector carries, longest first (unchanged);
  2. the key whose name a class opens with, longest first;
  3. the first recorder in inventory order.

  The second step and the class-prefix fallback are the same computation. Extract it once as an exported `matchSelectorKey(classes, keys)` helper that returns the longest key any class equals or opens with. Route both uses through it and test it. Rewrite the TSDoc paragraph of `attributeSelector` to state the tiered order.
- **The partial.** `_form-label.scss` loads `../mixins` only if it includes a mixin; the tokens it needs are CSS variables, so it probably needs no `@use` at all. It opens `@layer components` and writes, in the release's order:
  - `.form-label { margin-bottom: var(--vn-space-4) }`
  - `.form-text { margin-top: var(--vn-space-2); font-size: 0.875em; color: var(--bs-secondary-color) }`
  - `.col-form-label`: padding-top and padding-bottom each `calc(var(--vn-space-3) + var(--bs-border-width))`, then `margin-bottom: 0`, `font-size: inherit`, and `line-height: var(--vn-line-body)`
  - one `@each` over a local `$sizes` list in the release's order (large, then small), as D30 rules. Large pairs `--vn-space-4` with `--vn-size-5`, and small pairs `--vn-space-2` with `--vn-size-2`. Each writes padding-top and padding-bottom as `calc(<space> + var(--bs-border-width))`, then `font-size`.

  A comment names the reason: the horizontal label reads the tokens the control's own inset and type read.
- **The barrel.** Add `@use 'components/form-label';` directly before `@use 'components/form-control';`.
- **The case table.** In `tests/setupStyles.ts`, add a `FormLabelCase` interface (`selector`; `component`, the inventory key recording the selector; and `reads`, a per-property map shaped like `FormControlCase` reads), a frozen `FORM_LABEL_CASES` table, and `FORM_LABEL_MARKUP`. The markup holds:
  - the stacked label, control, and help text, with the help text in a parent set to `font-size: 20px`;
  - the horizontal label at each size beside the matching control;
  - a `<fieldset class="row">` whose `<legend class="col-… col-form-label">` labels a text control.
- **R6.** Add a `FormFloatingCase` interface (`selector`, `rendered`, and a per-property `reads` map) and retype `FORM_FLOATING_CASES` to it.
- **Node cases in `tests/setupStyles.test.ts`:**
  - Label table: its selectors equal the inventory selectors whose classes open with `form-label`, `form-text`, or `col-form-label`. Each row's selector is recorded under its own `component` key and under no other key. Each row's `reads` equals the `collectDeclarationReads` entry for that selector.
  - Floating table: the Node case moves to the same per-property equality.
  - Both tables are frozen.
  - The sorted export list gains `FORM_LABEL_CASES` and `FORM_LABEL_MARKUP`.
- **The browser half of R6.** In `form-floating.test.ts`, the case "authors every case selector in the components layer with the custom properties it reads" keeps its layer reading and drops its joined-string `reads` half, because the Node case owns that comparison, as it does for `form-control`. Retitle the case "authors every case selector in the components layer".
- **The plant.** In `tests/setupServer.test.ts`, the case "attributes a selector two shipped keys record to the more specific key" gains these rows through an inline inventory:
  - `.form-control-sm`, recorded under `form` and `form-control`, answers `form-control`;
  - `.form-switch .form-check-input`, recorded under `form` and `form-check`, answers `form-check`;
  - `.form-control-color.is-valid`, recorded under `form`, `form-control`, and `is-valid`, answers `is-valid`;
  - `.row-gap-0`, recorded under `row` and `row-gap`, answers `row-gap` (if Ruling A stands);
  - `textarea:focus` keeps answering `form`.

  Update its comment. `matchSelectorKey` gets its own case. The `readCompatibility` expectation gains `form`.
- **The conformance proof:**
  - `listed` gains `'form'` in sort position.
  - The barrel-order case reads its renames from a frozen `FORM_PARTIALS` record in `tests/setupServer.ts`: `labels` and `form-text` map to `form-label`, and `floating-labels` maps to `form-floating`. It de-duplicates the mapped release list.
  - Because the family is closed, the case asserts that the barrel's forms subsequence **equals** that list, and drops the `arrayContaining` guard and the release filter.
  - Retitle it "loads every forms partial in the release order, validation last".
- **The guide:**
  - Add a § Files row for `_form-label.scss` before the `_form-control.scss` row.
  - Add a `### Form label classes` section. Its content follows this list.
  - Delete the three `.col-form-label*` rows from § Deferred selectors.
  - Add § Compatibility rows: a `form` selector row, a `form` variable row naming the five `--bs-form-*` variables and the check and select rules that declare them, and a `col` selector row for the `.col-form-label` family shipped from the label partial.
  - Under § Departures, add a `#### form` table with the `.form-label` `margin-bottom` row and the `.form-text` `margin-top` row, both `tokenized`.
  - Add a `#### col` table between `#### btn` and `#### container` with the `.col-form-label*` padding, `line-height`, and size `font-size` rows, all `tokenized`.
  - If Ruling A stands, add a `#### row-gap` table after `#### row` holding the moved `.row-gap-*` rows.
  - Split the pooled `#### form-check` table into one `#### <key>` table per forms key, in key sort order, at its position.
  - Move the forms `###` sections into the release's order (Ruling H).
  - Add the form-label proof link to the style-proof paragraph.
  - Add one § Showcase sentence naming the forms regions: Validation, Form check, Form floating, Form control, Form label, Form range, Form select, and Input group. These are the names this plan fixes.
- **Draft for `### Form label classes`**, in the voice of the sibling sections:
  - **Opening paragraph.** The label partial ships the form label, the help text, and the horizontal label at each size. The release records the form label and the help text under the umbrella `form` key and the horizontal labels under the `col` key, so the ledger files them there. With this partial the `form` key ships. Every other rule the umbrella key records ships from the partial of the key its classes name, and the switch row's inset ships from the check partial. The partial loads first among the forms partials, which is the release's order.
  - **Behaviour paragraph.** A label sits above its control. Help text sits under its control at `0.875em` of the type around it, in the secondary text color. Describe the control with the help text through `aria-describedby`, so a screen reader announces the hint after the control's name. A horizontal label, or a `legend` that labels a horizontal group, takes the control's own inset plus its border width, and the control's line height, so its text sits level with the control's text at each size. On a `legend` it also clears the element's own trailing margin and type size.
  - **Departure bullets.** The margins read the space scale. The horizontal label's inset reads `--vn-space-3`, `--vn-space-4`, or `--vn-space-2` over `--bs-border-width`, and its type reads `--vn-line-body`, `--vn-size-5`, and `--vn-size-2`, so the label and its control move together under `--vn-factor-density` and under a border-width retune.
  - **Closing paragraph.** `0.875em` stays the release's value, because no published scale is relative to the element's own font size. The color reads `--bs-secondary-color` byte for byte.
- **Proofs and the mutation each distinguishes**, in `tests/src/styles/components/form-label.test.ts`. Density is set at the root, the way the card and floating proofs set it.
  - "spaces a label above its control from the space scale". Reads `margin-bottom` of 8px at factor 1 and 16px at factor 2. Distinguishes a literal `0.5rem` (reads 8px at factor 2) and a wrong space step.
  - "sets help text under its control at the small size in the secondary color, in each mode". Reads `margin-top` at 4px, then 8px at factor 2. Reads `font-size` of 17.5px under a 20px parent. Reads the color against the resolved `--bs-secondary-color` in light and in dark, and after an override of `--bs-secondary-color` on a wrapper. Distinguishes `0.875rem` (reads 14px), `var(--vn-text-secondary)` or `var(--vn-text-muted)` written directly (fails the override), and a literal space.
  - "levels a horizontal label's text with its control's text at each size, at a doubled density, and under a border-width retune". For each size, it compares the label's content-box top with the control's (the control's top plus `border-top-width` plus `padding-top`) within 0.5px. It also compares line height and font size. It repeats at factor 2 and with `--bs-border-width: 4px` on the row. Distinguishes:
    - a literal `calc(0.375rem + var(--bs-border-width))` (6px off at factor 2);
    - a dropped border term (1px off at rest);
    - a literal `1px` border (3px off under the retune);
    - a literal `1.5` line height (fails a `--vn-line-body` override);
    - the large and small entries swapped in `$sizes`.
  - "clears a legend's own margin and type when it labels a horizontal group". On the fieldset `legend`, reads `margin-bottom` of 0 and a font size equal to the parent's. Distinguishes a dropped `margin-bottom: 0` or `font-size: inherit` (the elements layer's legend values show through). The ledger also pins both declarations: a dropped declaration records a `dropped` row.
  - "authors every label case selector in the components layer". Distinguishes a rule written outside `@layer components`.
  - Node label case. Distinguishes a missing row, a row claiming `form` for `.col-form-label`, and a token moved from `padding-top` onto `line-height`.
  - Node floating case (R6). Distinguishes a `var()` moved between declarations of one floating rule, which the flat array cannot see.
  - The plant. Removing the prefix step makes `.form-control-sm` answer `form`. Putting the prefix step before the exact step makes `.form-control-color.is-valid` answer `form-control`. Dropping the longest-first sort makes `.form-switch .form-check-input` answer `form`.
  - The barrel-order case. Distinguishes `form-label` loaded after `form-control`, and a missing forms partial.
- **Acceptance criteria**, cheap first:
  1. Scoped `oxfmt` on the owned files, then `npm run format:check`, `npm run lint:check`, and `npm run check`.
  2. `npm run build:src`. The built cascade carries `.form-label`, `.form-text`, `.col-form-label`, `.col-form-label-lg`, and `.col-form-label-sm` in the components layer.
  3. `npm run test:setup` is green, including the plant, the `matchSelectorKey` case, the label and floating Node cases, and the export list.
  4. `npm run test:src:styles` is green over `form-label.test.ts` and `form-floating.test.ts`.
  5. `npm run test:conformance` is green: the ledger gates with the `form`, `col`, and `row-gap` tables, the deferral gate with the rows retired, compatibility presence, the `listed` equality, and the barrel order.
  6. `npm run test:guides` and `npm run test:policy` are green.
  7. Before the unit edits any test file, a `git diff` over the owned files shows each claim flipped from its red count to green.

  The whole `npm test` run is an observation, not a criterion.
- **Risks:**
  - The `bft` shape of `collectDeclarationReads` differs from what the case needs. The unit stops and reports rather than adding a second extraction.
  - A floating selector reads a variable only under an at-rule condition. `FormFloatingCase` then takes a `condition` field, as `FormControlCase` does, and the unit reports which selector forced it.
  - The guide reorder produces a large moved-block diff. The checker proves the moved blocks byte-identical with `git diff --color-moved=plain`.

### U2 `bfl-show` — section, copy, specimens, capture rows, and their proofs

- **Route.** `opus` on Opus 5.5, native. The work is subjective, and the journey drives Chromium.
- **Owned files:**
  - `app/browser/sections/FormLabelSection.ts` (created)
  - `app/browser/constants.ts`, `app/browser/Showcase.ts`, and `app/browser/index.ts`
  - `tests/app/browser/sections/FormLabelSection.test.ts` (created)
  - `tests/app/browser/Showcase.test.ts`, `tests/app/browser/index.test.ts`, and `tests/app/browser/integration.test.ts`
  - `tests/setup.ts`
- **Shared, report-only files.** None. The guide sentence is U1's, because the region names are fixed here.
- **Off-limits files.** Every file U1 owns, plus `tests/setup.test.ts`. If `tests/setup.test.ts` goes red, the unit stops and reports.
- **Order.** In parallel with U1, from the same baseline.

**What it builds:**

- **The section.** `FormLabelSection extends SpecimenSection`, fed by `FORM_LABEL_COPY` (region `Form label`) and `FORM_LABEL_SPECIMENS`.
- **The copy paragraph.** "Compare a label and its help text around a control, and a horizontal label level with the control beside it at each size and over a group."
- **The specimens**, in this order:
  - `Form label stacked`: a `.form-label` for an email control, the control, and a `.form-text` that the control names through `aria-describedby`. Label text "Dispatch email"; help text "Northworks sends every shipping notice to this address."
  - `Form label horizontal`: a `.row` holding a `col-* col-form-label` label and a `.col-*` control.
  - `Form label horizontal large` and `Form label horizontal small`: derived from one size list with `.map`, as `INPUT_GROUP_SPECIMENS` derives its sizes.
  - `Form label legend`: a `fieldset.row` with a `legend.col-* col-form-label` labelling a date control that carries its own `aria-label`.

  Use breakpoint-free columns, so every captured variant shows the label beside its control. Give every id a `form-label-` prefix and give every control a name of its own.
- **Registration.**
  - `Showcase.ts` constructs `FormLabelSection` after `FormControlSection` and before `FormRangeSection`, the alphabetical position D35 names.
  - Ruling E: move `FormControlSection` ahead of `FormFloatingSection`.
  - `index.ts` re-exports the section module.
  - `Showcase.test.ts` updates the regions literal and the specimen concatenation.
  - `index.test.ts` updates the export literal.
  - `integration.test.ts` adds the import and `FORM_LABEL_SPECIMENS` in the declared-specimen list.
- **Capture.**
  - `CaptureSubject` gains the specimen names.
  - `CASCADE_KEYS` gains these resting rows at the registry's end, and no driven scenario:
    - `form-label-stacked` (`.form-label`, `margin-bottom`)
    - `form-label-horizontal` (`.col-form-label`, `padding-top`)
    - `form-label-horizontal-large` (`.col-form-label-lg`, `font-size`)
    - `form-label-horizontal-small` (`.col-form-label-sm`, `font-size`)
    - `form-label-legend` (`legend.col-form-label`, `margin-bottom`)
  - Each read is rem-based, or equal on the showcase and on the lifted copy.
- **The section proof and the mutations it distinguishes.** In `FormLabelSection.test.ts`, the case "renders every label specimen through the shared section contract, each control named by its visible label" does the following:
  - reads the region name, the paragraph, the specimen order, and the markup equality;
  - reads each control's `readName` against its label text;
  - reads the legend-labelled control's own name;
  - checks that `readStates(control)` includes `described` on the stacked control, and that the id in its `aria-describedby` resolves to the `.form-text` element with the visible hint;
  - checks that the constants are frozen.

  It distinguishes:
  - a dropped `for` attribute or a mismatched id (the name is empty);
  - an `aria-describedby` naming a missing id (the element resolves to nothing);
  - specimens reordered, or a mutated copy.

  A second case, "releases the region and preserves adjacent content on repeated destruction", copies the sibling sections' teardown case.
- **Acceptance criteria**, cheap first:
  1. Scoped `oxfmt` on the owned files, then `npm run format:check`, `npm run lint:check`, and `npm run check`.
  2. `npm run test:app` is green over the section proof, the showcase proof, and the index proof.
  3. `npm run test:setup` is green, including the registry law over the scenarios it adds.
  4. `npm run test:journey` is green.
  5. `CAPTURE=1 npm run test:journey` writes a `form-label-*--<theme>-<viewport>.png` frame for each scenario it registers. The report lists the written names. This is an observation, because the partial is absent from this worktree. The authoritative frames come from the Orchestrator's integrated run.
- **Risks:**
  - A horizontal label wraps at the 390-wide variant. The unit picks the column split and short label text so that each label reads one line at 390, and reports the reading. That choice is the unit's to settle.
  - The journey's declared-property comparison passes vacuously in the worktree, because the partial is absent. The integrated run is the one that counts.

### After U1 and U2

The Orchestrator integrates U1 and U2 serially. It then runs the tracked chain: `format:check`, `lint:check`, `check`, `build`, `test`, `test:service`, and the `CAPTURE=1` journey on the integrated tree.

The audit round then runs blind on one claims file:

- `analyst` on Astra, objective lane (the engine that did not write the work);
- `reviewer` on Opus, subjective lane;
- `checker` on Sonnet, for the mechanical criteria: the shipped lists, the deferral rows retired, the compatibility rows, the ledger tables per key, the moved blocks byte-identical, and the Showcase sentence against `Showcase.test.ts`.

The capture portfolio of the `form-label-*` frames is the review input for the rendered claims.

## Rulings needed

- **A. Attribution.**
  - **Option 1:** a tiered ladder. First the exact class match, longest first. Then a class the key's name opens, longest first, through `matchSelectorKey`. Then recording order. **Cost:** it moves `.row-gap-*` from `row` to `row-gap`, which is D22's own rule applied, and needs a `#### row-gap` table.
  - **Option 2:** a key yields when its name opens another recorder's name. **Cost:** the same moves, with a rule that is less general.
  - **Option 3:** name `form` as a union key that yields in membership. **Cost:** no collateral moves, but it writes a product list into the mechanism.
  - **Recommendation:** Option 1, contingent on U0.
  - **What the guide tables become:**
    - the 43 rows keep their `form-control`, `form-check`, and `form-select` Component cells;
    - `.form-switch .form-check-input` `transition` stays under `form-check`;
    - `.form-switch` attributes to `form` and writes no row, because `2.5em` equals the recorded value;
    - `form` gains only the `.form-label` and `.form-text` rows.
  - **The plant** is the one U1 names.
- **B. The shipped-key lists.** The sites are:
  - `listed` in `tests/conformance.test.ts`;
  - the `readCompatibility` expectation in `tests/setupServer.test.ts`;
  - a `form` selector row and a `form` variable row in § Compatibility (`collectShippedComponents` requires the variable row, because `form.properties` is not empty);
  - the § Files row.

  **Recommendation:** all of them, in U1.
- **C. The `col` label rows.**
  - **Option:** ship them from `_form-label.scss`, per family ruling 3. The ledger then files them under `col`, their only recorder, in a `#### col` table at its sort position. Retire the three deferral rows. Add a `col` compatibility row so a reader finds the family's home.
  - **Cost:** one row, and a forms partial emitting a Layout key's selectors.
  - **Recommendation:** as stated.
- **D. Tokens.** The bindings are as U1 writes them. `--vn-space-4`, `--vn-space-2`, `--vn-space-3`, `--vn-space-4`, and `--vn-space-2` each sit over `--bs-border-width`. `--vn-line-body` supplies the line height alone, not the `input-text` mixin, whose font size and color the label must not take. `--vn-size-5` and `--vn-size-2` supply the sized type. `--bs-secondary-color` is written byte for byte.

  Literals stay where no token resolves the release's value relative to the element:
  - `0.875em`, as the feedback rule and `.figure-caption` keep it;
  - `0`;
  - `inherit`.

  **Recommendation:** as stated.
- **E. The section.** The specimens are the ones U2 names.
  - **Naming:** `FormLabelSection`, `FORM_LABEL_*`, region `Form label`. This follows the partial, as the `Validation` and `Input group` regions do. Family ruling 3's literal `<KEY>_COPY` pattern would give `FORM_COPY` with a region `Form`, which reads as a whole form.
  - **The inversion:** Veneer constructs `FormFloatingSection` before `FormControlSection`, against D35's alphabetical convention. **Option:** fix it in U2 by moving lines in `Showcase.ts` and `Showcase.test.ts`. **Cost:** a small diff. **Recommendation:** fix it.
- **F. `FORM_FLOATING_CASES` (R6).**
  - **Option 1:** give floating its own `FormFloatingCase` with a per-property `reads` map.
  - **Option 2:** generalize `FormRangeCase`. **Cost:** it carries `engine`, a range-only field.
  - **Recommendation:** Option 1, with the browser half dropping its duplicate `reads` comparison. The files it makes false are the floating Node case in `tests/setupStyles.test.ts` and the components-layer case in `form-floating.test.ts`.
- **G. Decomposition.**
  - **Option 1:** two parallel native units, U1 and U2. Their files are disjoint, and they follow the `bfs`/`bft` precedent.
  - **Option 2:** one unit. **Cost:** one serial round, with the subjective showcase and the objective ladder audited together.
  - An objective `sol` ladder unit is refused. `tests/setupServer.test.ts` must also gain the `form` expectation, which only lands with the guide's compatibility rows, so the ladder cannot own its file disjointly.
  - **Recommendation:** Option 1.
- **H. Guide order.** D35 rules that the guide's sections follow the release, and the forms sections at `e0c901a` do not.
  - **Option 1:** U1 moves the forms `###` sections, Validation included, into the release's order, with `### Form label classes` first. It also splits the pooled ledger table per key.
  - **Option 2:** insert `### Form label classes` before `### Form check classes`, and carry the reorder as a finding.
  - **Cost of Option 1:** a large moved-block diff that the checker proves byte-identical.
  - **Recommendation:** Option 1.
  - **Out of this family:** the whole § Departures section is not in key order, despite its own sentence saying it is. Carrier: not yet known; the Orchestrator assigns it at the next dispatch.
- **I. The barrel-order case.**
  - **Option:** a frozen `FORM_PARTIALS` record in `tests/setupServer.ts`, with the case asserting the exact full sequence.
  - **Cost:** one setup export.
  - **Recommendation:** as stated.
- **J. One partial or two.**
  - **Option 1:** one `_form-label.scss`, per family ruling 3.
  - **Option 2:** `_form-label.scss` plus `_form-text.scss`, mirroring the release's files. **Cost:** a second partial, a second proof, and a help text shown with no label.
  - **Recommendation:** Option 1.

## Files the result makes false

**U0.** None.

**U1:**

- `tests/conformance.test.ts`:
  - the `listed` literal omits `form`;
  - the barrel-order case filters out `labels` and `form-text` and guards with `arrayContaining`.
- `tests/setupServer.test.ts`:
  - the `readCompatibility` expectation omits `form`;
  - the plant's recording-order comment;
  - any export inventory, which gains `matchSelectorKey` and `FORM_PARTIALS`.
- `tests/setupServer.ts`: the `attributeSelector` TSDoc.
- `tests/setupStyles.test.ts`:
  - the sorted export list;
  - the floating Node case's spread comparison.
- `tests/src/styles/components/form-floating.test.ts`: the `reads` half of the components-layer case.
- `src/styles/index.scss`: it has no `form-label` line.
- `guides/veneer.md`:
  - the `.col-form-label*` deferral rows;
  - § Compatibility, which has no `form` rows;
  - § Departures: the Component cell of the `.row-gap-*` rows under Ruling A, the pooled `#### form-check` table, and the missing `#### form` and `#### col` tables;
  - § Files, which has no label row;
  - the style-proof paragraph;
  - § Showcase, which names no forms region;
  - the forms sections' order under Ruling H.
- `ROADMAP.md` § Carriers: the `form` key row and the R6 row. These are report-only for the unit; the Orchestrator strikes them.

**U2:**

- `tests/app/browser/Showcase.test.ts`: the regions literal and the specimen concatenation.
- `tests/app/browser/index.test.ts`: the export literal.
- `tests/app/browser/integration.test.ts`: the declared-specimen table list.
- `tests/setup.ts`:
  - the `CaptureSubject` union;
  - `CASCADE_KEYS`, whose derived `CAPTURE_SCENARIOS` also changes;
  - any doc block that enumerates members.
- `ROADMAP.md`, where it lists scenario stems. This is report-only.

**Search bound.** I found this set by grepping `/home/user/veneer`, excluding `node_modules`, for the existing members `Form floating empty`, `FORM_FLOATING_SPECIMENS`, `FormFloatingSection`, `form-floating-empty`, `'form-range'`, and `FORM_FLOATING_CASES`. Each unit re-derives it by running its scoped suites before editing.

## Exit criterion

B-FORMS-LABEL ends, and with it the forms family, when each of these capabilities is implemented, repaired, or excluded on evidence, and the Orchestrator's tracked chain is green on the integrated tree:

- **Ladder.** `attributeSelector` prefers the exact class, then the longest class prefix, then recording order. `matchSelectorKey` is exported and tested. The plant pins each step.
- **Partial and barrel.** `_form-label.scss` emits `.form-label`, `.form-text`, and `.col-form-label*` in the components layer with the Ruling D bindings. The barrel loads it first among the forms partials, and the case asserts the full forms sequence.
- **Tables.** `FORM_LABEL_CASES` pins every label selector's key and its per-property reads. `FORM_FLOATING_CASES` carries the per-property map (R6).
- **Proofs.** `form-label.test.ts` reads spacing, help text, alignment, the legend reset, and the layer, each with its mutation named. The Node cases are green.
- **Showcase.** `FormLabelSection` is registered and exported, with frozen copy and specimens. The section proof, the showcase proof, and the index proof are green. The Floating and Control order is fixed if Ruling E is adopted.
- **Capture.** The `form-label-*` resting scenarios are registered, and their frames exist in every variant of the integrated `CAPTURE=1` run.
- **Guide.** The guide has the § Files row, `### Form label classes`, the Showcase sentence, and the proof link. The `form`, `col`, and (under Ruling A) `row-gap` ledger tables are measured. The pooled table is split per key, and the forms sections follow the release's order (Ruling H).
- **Shipped-key lists.** `form` sits in `listed`, in the `readCompatibility` expectation, and in the § Compatibility selector and variable rows.
- **Deferrals.** The three `.col-form-label*` rows are retired, and `scanShippedDeferrals` returns nothing.
- **Carriers.** The `ROADMAP.md` rows for the `form` key and R6 are struck by the Orchestrator.

Key paths:

- `/home/user/veneer/tests/setupServer.ts` (`attributeSelector`, `matchShippedKey`, `collectShippedComponents`)
- `/home/user/veneer/tests/setupServer.test.ts` (the plant case)
- `/home/user/veneer/tests/conformance.test.ts` (`listed` and the barrel-order case)
- `/home/user/veneer/tests/setupStyles.ts` (`FORM_FLOATING_CASES`, `FormControlCase`)
- `/home/user/veneer/src/styles/components/_input-group.scss` (the precedent for the `$sizes` tokens)
- `/home/user/veneer/src/styles/elements/_fieldset.scss` (the `legend` values that `.col-form-label` overrides)
- `/home/user/veneer/guides/veneer.md` (the pooled `#### form-check` table and the deferral rows)
