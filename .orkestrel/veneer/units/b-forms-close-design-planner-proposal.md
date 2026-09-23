# B-FORMS-CLOSE design — planner proposal (subjective lane, Opus 5.5 native, task a7deb092045c40d14)

Retained verbatim from the `planner` subagent's returned message; the brief is `b-forms-close-design-brief.md` beside this file.

---

## Units

I held the **subjective** lane: shape, naming, and how the proofs and the guide read. The tree is `/home/user/veneer` at `53628aa`, and I treated the B-FORMS-RENAME mixin names as current.

The plan has the following units. Owned files do not overlap between units. `ROADMAP.md` is report-only for every unit. Every unit is off-limits to `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `configs/**`, `package*.json`, `vite.config.ts`, and `tsconfig.json`, which are the paths `scaffold repair` restores.

### U4 LITERAL-PROBE: `builder` on Sonnet (native). Runs first, on the clean baseline.

- **Carries:** ROADMAP row "A literal declaration added to a shipped `.form-control` rule…" (the reading only).
- **Owned files:** none are committed. The unit writes a retained instrument script that plants one line in `src/styles/components/_form-control.scss` and removes it again.
- **Why it runs first:** the permission floor requires a plant in a file no other unit has touched yet. U3 owns that partial later.
- **Shared, report-only:** everything else.
- **Order:** before U2 and U3. Independent of U1.
- **Acceptance, cheap first:**
  1. The script records the partial's baseline hash.
  2. It plants an unrecorded literal on `.form-control`, for example `letter-spacing: 0.01em`. The property must not appear in the row's `values` or `reads`.
  3. It runs `npm run build:src`.
  4. It runs `npm run test:setup` and reads the text-control binding case: expected green.
  5. It runs the `form-control.test.ts` browser proof: expected green.
  6. It runs `npm run test:conformance` and reads `records every emitted name the official inventory lacks`: expected red, with the `describeAddition` line `form-control | .form-control { letter-spacing } | — | declaration`.
  7. It removes the plant and re-reads the hash: it must equal the baseline.
  8. The report quotes each command with its exit code and output line.
- **Mutation distinguished:** this unit is the mutation. Its reading shows which gate tells a planted literal apart from a clean tree, and which gates do not.
- **Risks:** the planted property is already an Additions row. Choose the property against the guide's § Additions table first.

### U1 CLOSE-SPECIMENS: `opus` on Opus 5.5 (native; the journey drives Chromium). Runs in its own worktree, in parallel with U4, U2, and U3.

- **Carries these ROADMAP rows:**
  - "Validation tooltip specimens…" (D6, D31).
  - "Cascade-key prose…".
  - The focus-comment clause of the round-6 row "The later paragraph of the `### Input group classes` section…".
- **Owned files:**
  - `app/browser/constants.ts`: `INPUT_GROUP_SPECIMENS`, its remark, `INPUT_GROUP_COPY`, and the tooltip clause of the `VALIDATION_SPECIMENS` remark.
  - `tests/setup.ts`: `CaptureSubject`, the `CASCADE_KEYS` rows, and its doc block.
  - `tests/app/browser/integration.test.ts`.
  - `tests/app/browser/sections/InputGroupSection.test.ts`.
- **Shared, report-only:**
  - `tests/setup.test.ts`: its uniqueness case must stay green. The unit stops if it reddens.
  - `guides/veneer.md`: U1 returns one sentence for § Input group classes, naming the tooltip frames. U3 carries that sentence.
- **Design:**
  - Name the specimens `Input group valid tooltip` and `Input group invalid tooltip`.
  - Each one is a `.input-group.has-validation` with the addon, a control carrying `.is-valid` or `.is-invalid` with a unique name and `aria-describedby` pointing at the tooltip, and the tooltip as the group's last child.
  - After it comes a second, button-led group: `.btn` then `.form-control`, with unique names. That second group is the room the tooltip hangs over.
  - The frame is the resting element frame over the specimen's own `[data-specimen]` container, which the existing lift already photographs.
  - Place the rows directly after `input-group-validation`, in the section's render order.
  - Add the subjects to the Input group run of `CaptureSubject` in alphabetical order.
  - Register selectors `.is-valid ~ .valid-tooltip` and `.is-invalid ~ .invalid-tooltip`, with property `display`.
- **Prose rewrites:**
  - `CASCADE_KEYS` doc block: describe the population by its rule. Every resting key a journey photographs, each with its specimen, the selector the frame's region is read on, and the property its own rule sets; families append rows. Name no member.
  - Keep the blank-frame measurement as the reason for the lift, bound to where it was measured. Stop presenting the capped container, the row, the table, and the link as "the rows".
  - Rename the rest case to `reads every resting cascade key the same on its lifted frame as in the showcase, in light and dark`.
  - Focus comment: "the button's leading border paints over the border the two share until the control is lifted past it".
- **Acceptance, cheap first:**
  1. Scoped `oxfmt`, `npm run format:check`, `npm run lint:check`, `npm run check`.
  2. `npm run test:setup`.
  3. `npm run test:app`. The section proof lists the new names, asserts the tooltip in each tooltip specimen's first group, and replaces the null-tooltip query and the one-group-per-specimen assertion with those facts.
  4. `npm run test:journey`, which gains new readings:
     - Each tooltip key reads `display: block` in light and dark.
     - On the lifted copy, the tooltip's bottom edge is at or above the frame element's bottom edge (the room).
     - `document.elementFromPoint` at a point inside both the tooltip and the following group's button returns the tooltip (the stacking).
  5. `CAPTURE=1 npm run test:journey`: the report lists `input-group-valid-tooltip--<variant>` and `input-group-invalid-tooltip--<variant>` frames for every registered variant. Treat this as the unit's own observation. The Orchestrator takes the authoritative run.
- **Mutations the proofs distinguish:**
  - Drop `.is-#{$state} ~ .#{$state}-tooltip` from the reveal rule: the tooltip reads `none`.
  - Remove the following group: the room reading fails.
  - Remove `z-index: 5` from the tooltip rule: the point reads the button, which rests at `z-index: 2`.
  - Drop a specimen: the section name list fails.
- **Risks:**
  - The tooltip frame shows overlap by design. A reviewer can read it as a defect. The specimen remark must say why.
  - New focusable controls sit at the end of the Input group section. A later journey traversal that crosses this section meets more stops. Settle it by running the journey.
  - The § Tests stem table lacks the new stems. B-PASSIVE-CLOSE owns that row ("The guide's § Tests stem table omits…"), so this unit only records it.

### U2 CLOSE-TABLES: `opus` on Opus 5.5 (native)

- **Routing deviation to record:** by work class this unit is objective and belongs on `sol`. The browser proof `input-group.test.ts` drives Chromium, which the bench sandbox denies (the precedent is the F8d routing note in ROADMAP).
- **Carries these ROADMAP rows:**
  - "`INPUT_GROUP_ROUNDING`…" (the fixture half).
  - The fixture doc-block and corner-comment clauses of the round-6 row.
  - "The `FORM_RANGE_CASES` table…".
  - The durable half of the literal-declaration row: a remark sentence naming the gate U4 measured.
- **Owned files:**
  - `tests/setupStyles.ts`
  - `tests/setupStyles.test.ts`
  - `tests/src/styles/components/input-group.test.ts`
- **Shared, report-only:** `guides/veneer.md`. U2 returns the rewritten closing paragraph of § Input group classes, from "The text control and select classes carry no radius…" through the floating-wrapper sentence, as an exact patch. U3 carries it.
- **Depends on:** U4 (the remark cites its reading).
- **Design:**
  - Delete `INPUT_GROUP_ROUNDING`, its import, and its `scene.load` calls.
  - Rewrite the corner-case comments: each kept corner reads the radius the same element carries outside a group, which `input-border` writes from `--bs-border-radius`.
  - Rename the freeze case to drop "and the rounding rule", and delete its `@layer elements` expectations. Remove the name from the exports-case list.
  - Declare a `FormRangeCase` interface with `selector`, `engine` (`'gecko' | 'webkit' | undefined`), and `reads` (`Readonly<Record<string, readonly string[]>>`). Its TSDoc follows the `InputGroupCase` and `FormControlCase` voice, and the range remark states the property-keyed claim in the same words.
  - Switch the range Node case to the per-property `Object.fromEntries` equality, keyed by selector and condition.
  - Bound the range case's written-key population to the conditions the release records for the key. The comment says a block under a condition the release never queries is Veneer's addition, and the additions ledger holds it. U3's forced-colours block then lands without reddening this case.
  - Add one sentence to the `FORM_CONTROL_CASES` remark: a declaration the row neither values nor reads falls outside both maps, and the conformance case `records every emitted name the official inventory lacks` reports it.
- **Acceptance, cheap first:**
  1. Format, lint, and `npm run check`.
  2. `npm run test:setup`.
  3. `npm run test:src:styles` scoped to `input-group.test.ts`.
  4. A search for `INPUT_GROUP_ROUNDING` over `tests/` and `guides/` finds nothing except the paragraph U3 rewrites.
- **Mutations the proofs distinguish:**
  - Move `--vn-space-2` from the thumb's `margin-top` to its `height`. The old joined-string search passes this; the per-property equality fails it.
  - Drop the thumb's reduced-motion twin: the keyed population fails.
  - Write `.form-range` height as a literal: the row fails.
  - Remove `border-radius` from `input-border`: the corner references read `0`. This is exactly what the fixture masked.
- **Risks:** the Node cases for the text control and the input group already inline a per-property extraction, and the range case would be a third copy (see R7). A condition filter written before its first exercising block is inert until U3 lands. U3's acceptance proves it.

### U3 CLOSE-FORCED: `opus` on Opus 5.5 (native; forced-colours emulation in Chromium)

- **Carries these ROADMAP rows:**
  - "The forms controls' focus indicator under forced colours…" (D37).
  - "The validated color control's width…".
  - Every guide sentence of the close: U2's paragraph patch, U1's frame sentence, the colour-width prose and ledger cells, and the D37 Additions rows and prose.
- **Owned files:**
  - `src/styles/_mixins.scss`
  - `src/styles/components/_form-control.scss`, `_form-select.scss`, `_form-check.scss`, `_form-range.scss`, `_validation.scss`
  - `tests/src/styles/components/form-control.test.ts`, `form-select.test.ts`, `form-check.test.ts`, `form-range.test.ts`, `validation.test.ts`
  - `guides/veneer.md`
- **Shared, report-only:** `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, and `tests/src/styles/mixins.test.ts` (unless R8 grants it).
- **Depends on:** U2 (the range population bound, and its paragraph patch). U4 must have run before this unit touches `_form-control.scss`.
- **Mixin design:**
  - Extract the forced branch of `focus-ring` into a `forced-ring($width: var(--vn-focus-width), $highlight: var(--vn-focus-highlight))` mixin.
  - It emits `@include forced-colors { outline: $width solid $highlight; @content; }`.
  - `focus-ring` includes it with `{ box-shadow: $reset; }` as content, so the button compiles byte-identical: one media block, same declarations.
- **Forms rules:**
  - `.form-control:focus`, `.form-select:focus`, and `.form-check-input:focus` keep the release's `outline: 0` and shadow, and add `@include forced-ring;`.
  - `.form-range:focus` adds the same; its shadow ring stays on the thumb.
  - `.form-control-plaintext:focus` stays as the release writes it (R3).
- **Colour width:** write `width: calc(var(--vn-space-24) + calc(1.5em + 0.75rem))`. Only the release's `$form-color-width` binds to a token; the icon room stays literal, as the § Validation classes bullet on icon geometry already rules.
- **Guide:**
  - Update the `#### is-valid`, `#### is-invalid`, and `.was-validated .form-control-color:*` ledger cells to the compiled Veneer value, with departure `tokenized`.
  - Rewrite the "color control's width is written as one sum" bullet and the § Form control classes sentence "The validated color control's width is the validation partial's own `3rem` literal…" to state that a density retune widens the resting and the validated control together.
  - Add an Additions row per forms `:focus` rule under `@media (forced-colors: active)`, in the Button rows' voice.
  - Add a forced-colours sentence to each forms key's section, and extend the `focus-ring` paragraph to name `forced-ring` and its forms callers.
- **Acceptance, cheap first:**
  1. Format, lint, and `npm run check`.
  2. `npm run build:src`. Diff the compiled `.btn*` blocks against the baseline: they are byte-identical.
  3. `npm run test:setup`: the range Node case stays green with the forced block present.
  4. `npm run test:src:styles` over the owned proofs. Each control proof gains a case, named for what it proves, for example `outlines the focused control in the system highlight under forced colours`. The case:
     - drives keyboard focus on the existing markup table's control;
     - reads `outline-style` `none`;
     - runs `await stageMedia({ forced: true })`;
     - reads `outline-style` `solid` and `outline-width` equal to the resolved `--vn-focus-width`;
     - runs `releaseMedia()` and reads `none` again.
  5. `validation.test.ts` gains the same reading on a focused `.form-control.is-invalid`. It also gains a density reading: validated width minus resting width is the same at `--vn-factor-density: 2` as at 1. The existing `81` expectations stay, and their comments name the token.
  6. `npm run test:conformance`: no unrecorded addition and no stale departure.
  7. `npm run test:guides`.
  8. `npm run test:policy`.
- **Mutations the proofs distinguish:**
  - Remove `@include forced-ring` from one rule: its forced reading is `none`.
  - Hoist the outline out of the media block: the resting reading is `solid`.
  - Write a `1px` width: the width reading fails.
  - Add `outline: 0` to a validated `:focus` rule: the validated reading fails.
  - Revert to the `3rem` literal: the difference at factor 2 is -15px, not the icon room.
  - Emit the button's reset in a second media block: the compile diff fails.
- **Risks:**
  - `findRule('.form-range:focus')` can return the forced twin, because it is a substring lookup. Run the range proof.
  - A colour reader cannot answer under forced colours (see the comment in the forced-colors case of `mixins.test.ts`), so the proofs read style and width, never colour.
  - The compiled Veneer cell for the flattened `calc` must be read from the build, not written by hand.

## Rulings needed

- **R1: tooltip frame form** (brief unknown 1).
  - **Option A, a frame over the group itself:** geometrically impossible. `top: 100%` plus the `0.1rem` margin puts the tooltip wholly outside the group's border box, so `readRegion` would report the tooltip below the frame.
  - **Option B, blank room:** needs an inline style, which every section proof's `[style]` check refuses, or a spacing utility. The only utility the tree ships is `_gap.scss` (search: `src/styles/utilities/*.scss`).
  - **Option C, in-flow content keeps the room:** the precedent is the ButtonGroupSection comment "carries enough groups to wrap … rather than a declared width".
  - **Cost of C:** the frame shows the tooltip overlapping the next group.
  - **Recommendation:** C, with a button-led following group. It satisfies D31's "keeps the tooltip's overflow room" as a measured claim (frame bottom at or below tooltip bottom), and it adds a reading of the tooltip's `z-index: 5` against the group's button. A plain following `.form-control` is the fallback if you rule the stacking reading out of scope.
- **R2: validated colour width** (brief unknown 2).
  - **Options:** bind the width to `--vn-space-24`, or keep the release's literal.
  - **Cost of binding:** the ledger cells move from `declared` to `tokenized`. The `81` pixel values hold at factor 1.
  - **Recommendation:** bind. The width is one concept, and the resting rule already routes it; the row names the drift as the defect.
- **R3: whole mixin or forced branch** (brief unknown 3).
  - **Whole `focus-ring`:** writes `outline: none` where the release writes `0`, which records a needless value departure per rule. It also puts a shadow on `.form-range:focus`, which the release keeps on the thumb.
  - **Recommendation:** use the forced branch alone, through the extracted `forced-ring` mixin. The outline goes on the control, and there is no explicit shadow reset on the forms rules, because forced colours already paint no `box-shadow`, which is D37's premise.
  - **Exclusion:** leave `.form-control-plaintext:focus` out. The release draws no indicator there in any mode, so forced colours remove nothing. The guide states that limit.
  - **What each proof reads:** covered in U3.
- **R4: literal-declaration reading** (brief unknown 4).
  - **Recommendation:** record, don't add a test. The conformance additions gate reports the plant, per U4's reading. The branch already has its planted proof: the `.caption-top { caption-side: top; color: teal }` case in `tests/setupServer.test.ts`. A second plant on `.form-control` would duplicate it. The durable record is U2's remark sentence plus U4's retained instrument.
  - **Cost:** the whole-pipeline path for `.form-control` stays proved by a retained probe rather than by a test.
- **R5: the `form` key.** The family verdict (`b-forms-design-verdict.md`, Units table) gives B-FORMS-CLOSE the `form` key: `_form-label.scss`, `form-label.test.ts`, `FormLabelSection.ts`, and retiring the `.col-form-label*` deferral rows, which are still in the guide's § Deferred selectors. The brief's obligations omit it, and the family exit criterion requires it. No `_form-label.scss` exists at `53628aa`.
  - **Recommendation:** keep it in the family exit. Dispatch it as a successor unit, B-FORMS-LABEL (`opus`), after U1 to U3 land, because it touches every file those units own.
- **R6: `FORM_FLOATING_CASES`.** This table keeps the same joined-string `reads` shape the range row retires. It is outside the enumerated rows.
  - **Recommendation:** record it with a named carrier (U2's successor, or B-PASSIVE-CLOSE-B) rather than widening U2.
- **R7: a third per-property extraction.** The text-control and input-group Node cases each inline the `var()`-per-property map, and U2 would add a third copy. `.claude/rules/tests.md` calls a near-duplicate helper a defect.
  - **Recommendation:** grant U2 `tests/setupServer.ts` and `tests/setupServer.test.ts` to extract one exported `collectDeclarationReads`, route all three cases through it, and test it. Otherwise record the duplicate for a named carrier.
- **R8: stale forced-colours sentences.** Two sentences are false at `53628aa`, because the installed `MediaOptions` declares `forced?`:
  - the comment in the forced-colors case of `mixins.test.ts` ("`MediaOptions` carries a print axis and a motion axis and no forced-colors axis");
  - the guide's § Compatibility sentence "Button's forced-colors browser reading remains open…", which ROADMAP's "Forced-colours axis" row records as closed.
  - **Recommendation:** grant `mixins.test.ts` to U3. Its case moves to `stageMedia({ forced: true })`, and U3 already owns the guide. Both sentences belong to the forced-colours capability D37 closes.
- **R9: routing U2.** The options are `opus` (recommended; judgment in the remarks and in R7), `builder` if the brief supplies the exact remark text, or `sol` with the Orchestrator taking every browser reading.
- **R10: passive `:focus` rules.** `.page-link:focus` and `.btn-close:focus` also write `outline: 0` with a shadow ring. D37 covers forms only.
  - **Recommendation:** record them for B-PASSIVE-CLOSE-B, and note that `forced-ring` is the mechanism.
- **Note on D31.** D31's body names B-FORMS-CONTROL as the carrier for retiring `INPUT_GROUP_ROUNDING`. ROADMAP names B-FORMS-CLOSE, and this plan follows ROADMAP.

## Files the result makes false

- **U4:** none are committed. The literal-declaration row's open cell closes on its reading, which the Orchestrator edits in ROADMAP.
- **U1:**
  - `app/browser/constants.ts`: the `INPUT_GROUP_SPECIMENS` remark "No specimen renders a validation tooltip…"; the reason clause in the `VALIDATION_SPECIMENS` remark; `INPUT_GROUP_COPY.paragraph`.
  - `tests/setup.ts`: the `CaptureSubject` union and the `CASCADE_KEYS` rows, which lack the new names; the doc block's four-key enumeration and its repeat in the measurement paragraph.
  - `tests/app/browser/integration.test.ts`: the rest case title; the focus comment "outer column of that border".
  - `InputGroupSection.test.ts`: the specimen name list, the null query for `.valid-tooltip, .invalid-tooltip`, and the one-group-per-specimen assertion.
- **U2:**
  - `tests/setupStyles.ts`: the `INPUT_GROUP_ROUNDING` export and its doc block; the `FORM_RANGE_CASES` string-list `reads` and its remark; the missing interface.
  - `tests/setupStyles.test.ts`: the `'INPUT_GROUP_ROUNDING'` entry in the exports list; the freeze case's `@layer elements` expectations and its title; the range Node case's `declarations.includes(\`var(${name})\`)` comparison and its empty-list branch.
  - `input-group.test.ts`: the import, the three `scene.load(INPUT_GROUP_ROUNDING)` calls, and the corner comment "reads the fixture's until the control family lands".
- **U3:**
  - `_mixins.scss`: the inline forced branch in `focus-ring`.
  - The `:focus` blocks of `_form-control.scss`, `_form-select.scss`, `_form-check.scss`, and `_form-range.scss`, which have no forced outline.
  - `_validation.scss`: the `3rem` literal.
  - `validation.test.ts`: the comments that say the width is the release's literal sum.
  - `guides/veneer.md`: the `declared` colour-width ledger cells; the "written as one sum" bullet; the sentence "keeps that width while the resting one widens"; the § Input group classes sentences on "no radius of their own" and "a plain box"; the `focus-ring` paragraph; the Additions table, which lacks the forced rows. Under R8, also the § Compatibility forced-colours sentence and the `mixins.test.ts` comment.

## Exit criterion

B-FORMS-CLOSE ends when each capability below is implemented, repaired, or excluded on evidence, and `npm test` and `CAPTURE=1 npm run test:journey` pass on the integrated tree in the Orchestrator's `verifier` run.

- **Tooltip specimens:** both render in the Input group section and are registered in `CaptureSubject` and `CASCADE_KEYS`. Their frames are written for every variant, and the journey's display, room, and stacking readings pass.
- **Rounding retired:** no `INPUT_GROUP_ROUNDING` remains in `tests/` or `guides/`. The corner proofs read the shipped radius, and every sentence the round-6 row names is rewritten to the shipped radius, border, and floating rules.
- **Cascade-key prose:** the `CASCADE_KEYS` doc block and the rest case title enumerate no member.
- **Validated colour width:** it reads `--vn-space-24`; its ledger cells are `tokenized`; the density reading passes.
- **`FORM_RANGE_CASES`:** it has a property-keyed `reads` map under `FormRangeCase`, and its Node case uses the per-property comparison.
- **Literal-declaration reading:** it is recorded, naming the conformance additions gate as the reporter, with the retained probe and the remark sentence.
- **D37:** every forms control that draws a shadow ring draws a system-highlight outline under forced colours, through `forced-ring`, with the button compile byte-identical. The proofs read it under `stageMedia({ forced: true })`, and the Additions rows and guide prose are landed. Plaintext is excluded on evidence.
- **R5:** the `form` key either lands through its named successor, or the Orchestrator records its exclusion from this unit.

Every finding under R6 to R10 names one carrier.
