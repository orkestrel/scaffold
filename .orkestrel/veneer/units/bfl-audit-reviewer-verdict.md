# bfl audit, subjective lane (`reviewer` on Opus 5.5) — verdict

Brief: `units/bfl-audit-reviewer-brief.md`. Claims: `units/bfl-audit-claims.md`.

**Lane held:** subjective. I ruled on shape, naming, comment and guide voice, design fit, and the claim 9 ruling. `reviewer` on Opus 5.5, clean context, read-only. I ran nothing, so every gate count below that only the writer's report evidences is `UNRESOLVED`.

## Numbered verdicts

1. **CONFIRMED.** The status file (`/home/user/scaffold/.orkestrel/veneer/units/bfl-status.txt`) lists exactly the ten files the claim names. The diff headers touch no other path, and no off-limits path appears. Attack that failed: I searched the diff's `diff --git` headers for `app/`, `tests/app/`, `tests/setup.ts`, `_mixins.scss`, and `README.md`, and none of them appear.

2. **CONFIRMED.**
   - `/home/user/veneer-bfl/src/styles/components/_form-label.scss:4-41` carries ruling D's bindings exactly. It has no `@use` line, and the `$sizes` list runs large then small. Its shape and comment voice mirror the precedent at `_input-group.scss:3-9`.
   - The barrel line sits at `src/styles/index.scss` directly before `components/form-control` (diff line 1155).
   - The built file `/home/user/veneer-bfl/dist/src/styles/index.css` carries `.vr{…}.form-label{margin-bottom:var(--vn-space-4)}.form-text{` contiguously. `.col-form-label-sm` reads `calc(var(--vn-space-2) + var(--bs-border-width))` and `var(--vn-size-2)`. So the five rules sit in the components run.
   - Attack that failed: I compared the partial against the release's `node_modules/bootstrap/scss/forms/_labels.scss:5-36` and found no extra or missing declaration. The design objection to `inherit` is recorded outside the claims.

3. **CONFIRMED.**
   - `matchSelectorKey` is exported (`tests/setupServer.ts` around line 1506). `attributeSelector` answers exact class, then `matchSelectorKey` over the recorders, then `members.at(0)`. The no-recorder fallback is `matchSelectorKey(classes, shipped)`.
   - The plant (`tests/setupServer.test.ts` around lines 2203-2257) pins all seven readings. The report records `1 failed | 95 skipped (96)` before the change and passed after (report lines 185-189).
   - Mutations:
     - **Drop the prefix tier:** `.form-control-sm` falls through to `members.at(0)` and returns `form`, not `form-control`. The assertions distinguish it.
     - **Put the prefix tier before the exact tier:** `.form-control-color.is-valid` yields `form-control` (12 characters) before `is-valid`. The assertions distinguish it.
     - **Drop the longest-first sort:** `.form-switch .form-check-input` returns `form` from its first class. Both the plant and the `matchSelectorKey` case distinguish it.
   - The TSDoc prose defects are ruled under claim 8 and in the `match-summary` finding.

4. **UNRESOLVED.** The structure holds:
   - `FormLabelCase`, the frozen `FORM_LABEL_CASES`, and `FORM_LABEL_MARKUP` are declared (`tests/setupStyles.ts` around lines 4909-4998).
   - `FormFloatingCase` has per-property `reads`, and `FORM_FLOATING_CASES` is retyped and frozen.
   - The label Node case and the markup case exist, and the floating Node case uses `collectDeclarationReads` and `renderRuleKey` with no `matchAll(/var\(` left.
   - The export list carries both new names.
   - The components-layer case in `form-floating.test.ts` (around lines 496-511) keeps the layer check and drops the joined-string half.

   Mutations:
   - **Mark `.col-form-label` as recorded by `form`:** `recording.get` returns `['col']`, which does not equal `['form']`. The Node case distinguishes it.
   - **Move `--bs-border-width` from `border` onto `padding` in the `.form-floating > label` row:** the per-property maps differ. The Node case distinguishes it.

   Open conjunct: the `npm run test:setup` result (`250 passed`) rests only on the writer's report. It settles when the `verifier` runs `npm run test:setup`.

5. **UNRESOLVED.** The structure holds:
   - `'form'` sits in sort position in `listed`.
   - `FORM_PARTIALS` is frozen, exported, and held frozen by the exports case.
   - The barrel-order case maps the release list, removes the repeat through a `Set`, and asserts equality with no `arrayContaining` guard.
   - The `readCompatibility` set gains `form`.
   - The `.row-gap-*` rows move to `#### row-gap` (guide around line 3119).
   - The three deferral rows are gone.

   Mutation: loading `form-label` after `form-control` gives a barrel subsequence of `[form-control, form-label, …]`, which does not equal the release list. The case distinguishes it.

   Open conjunct: the ledger totals (1069 departures, 161 additions) and `21 passed` rest only on the report. They settle when the `verifier` runs `npm run test:conformance`.

6. **UNRESOLVED.** The cases in `/home/user/veneer-bfl/tests/src/styles/components/form-label.test.ts` read every property the claim lists, and the titles name what each case proves. Mutations:
   - **`0.875rem`:** the help text reads 14 px, not 17.5 px, at line 35.
   - **`var(--vn-text-secondary)`:** the retuned wrapper keeps the light mode's color, not `rgb(12, 90, 60)`, at line 61.
   - **Literal `1.5` line height:** the ratio check fails under the `--vn-line-body: 2` retune at line 105.
   - **Dropped `margin-bottom: 0`:** the legend reads 8 px, not 0, at line 143.
   - **Swapped `$sizes` entries:** the large label reads 14 px, not 20 px, at line 126.

   Each mutation is distinguished by its case. Open conjunct: the scoped run's `27 passed` rests only on the report. It settles when the `verifier` runs the scoped styles command.

7. **UNRESOLVED.** The structure holds:
   - The § Files row sits at guide line 210, in the sibling shape ending "read by …".
   - `### Form label classes` sits at line 980.
   - The forms `###` order runs Form label, Form control, Form select, Form check, Form range, Form floating, Input group, Validation (lines 980-1477). That equals the release's `_forms.scss` order.
   - The deferral rows are gone.
   - § Compatibility carries the `form` selector, `form` variable, and `col` rows.
   - `#### col` sits at line 2556, between `btn` and `container`, and `#### row-gap` sits at line 3119.
   - The split tables sit at lines 3380-3554 in key order.
   - The style-proof link sits at line 4137.
   - The § Showcase paragraph sits at line 4017, after the Placeholder, Progress, and Spinner paragraph.

   Open conjuncts:
   - `test:guides` `18 passed` and the byte-identity of the moved blocks rest only on the report. They settle through the `verifier` and the checker's `git diff --color-moved=plain` run.
   - "§ Tests is unchanged" is false as written, because the style-proof paragraph sits under `## Tests` (line 4023). See the referral.

8. **BROKEN.** New prose leaves code tokens without a noun, uses a synonym for one concept, and names items by position. The first site repeats the exact pattern the brief carried for repair.
   - **`/home/user/veneer-bfl/tests/setupServer.ts:1504`**
     - Wrong: `as {@link collectSelectorClasses} reads them` is a bare token. It is the same form the unit repaired on the two `@param blocks` lines.
     - Why it matters: it puts back the defect this round repaired.
     - Right: `as the {@link collectSelectorClasses} helper reads them`.
   - **`tests/setupServer.ts:2019` and `:2023`**
     - Wrong: `through {@link matchSelectorKey}` is bare at both sites.
     - Right: `through the {@link matchSelectorKey} helper`.
   - **`tests/setupServer.ts:395`**
     - Wrong: `` `tests/conformance.test.ts` maps `` puts a path token as the subject with no noun.
     - Right: `` The `tests/conformance.test.ts` file maps ``.
   - **`tests/conformance.test.ts:322`**
     - Wrong: `` `FORM_PARTIALS` maps each `` is a bare token.
     - Right: `` the `FORM_PARTIALS` record maps each ``.
   - **`tests/setupStyles.ts:4928`**
     - Wrong: `` so `component` names the table `` is a bare token.
     - Right: `` so the `component` field names the table ``.
   - **`guides/veneer.md:990-991`**
     - Wrong: `` through `aria-describedby` `` is bare. "announces the hint" introduces a synonym for "help text", which the rest of the section uses.
     - Why it matters: `AGENTS.md` § Design laws allows one term per concept.
     - Right: `` through the `aria-describedby` attribute, so a screen reader announces the help text after the control's name ``.
   - **`guides/veneer.md:992` and `:996`, and `src/styles/components/_form-label.scss:24`**
     - Wrong: `` a `legend` that labels `` and `` On a `legend` it also clears `` are bare.
     - Right: `` a `legend` element ``.
   - **`tests/setupServer.test.ts:2208` and `tests/src/styles/components/form-label.test.ts:73`**
     - Wrong: "the last reading" names a reading by its position (`AGENTS.md` § Writing).
     - Right: at `:2208`, "the reading with `form` as the only shipped key withholds …". At `:73`, "so the reading after every retune holds the label under all of them at once".
   - **`tests/setupStyles.test.ts:2749`**
     - Wrong: "the stacked trio" is a count noun.
     - Right: "the stacked label, control, and help text".

   What is not broken: the CSS values, `var()`, and custom-property tokens are their own nouns. The § Files row, the Compatibility rows, and the section's link-as-subject form ("[The form label classes](…) reads") match the sibling sections.

9. **CONFIRMED.**
   - The report records:
     - the command and result line for each criterion (lines 137-174);
     - the failing-first run (lines 185-189);
     - the mutation table (lines 198-229);
     - both findings (lines 263-273).
   - The limit is stated at guide lines 994-996.
   - The select sentence stays byte-identical at guide lines 1114-1115. Its carrier row exists: `x-retention-carry-distillate.md:112` lists barrel-neighbour sentences under B-PASSIVE-CLOSE.

   **Ruling on the first finding: bind the unsized horizontal label to `--vn-size-3`. Do not keep `inherit`.**
   - The release does not treat the label as body type:
     - `_labels.scss:13-14` states the class exists "when you need the label (or legend) text to align with the form controls".
     - `:19` annotates `inherit` as `// Override the <legend> default`, so `inherit` is a legend reset.
     - `inherit` lands on the control's size only because the body size and `$input-font-size` both derive from `$font-size-base` (`_variables.scss:615`, `:792`, `:888`).
     - The relation the release designed is that the label reads its control's type. Every other declaration in `.col-form-label` reads the control's tokens, and both sized siblings read the control's type steps.
   - Under Veneer's 14 px body, `inherit` merges two sizes. The unsized label and the `-sm` label both render at 14 px: `form-label.test.ts:103-104` pins the unsized label to the row's size, and `:127` pins the small label to 14. The size ramp reads 20/14/14 instead of 20/16/14, so its middle size disappears. The unsized size is the default and most common one, and it is the one whose text is not level. The planner's draft asked for "its text sits level with the control's text" (planner proposal line 111). The shipped prose had to fall back to "line box opens level".
   - Cost of the fix:
     - one `#### col` departure row for `.col-form-label` `font-size` (`inherit` becomes `var(--vn-size-3)`), in whatever category the ledger vocabulary assigns (the objective lane rules which);
     - the guide's limit sentence (lines 994-996) and the closing paragraph's "`inherit` size" clause (lines 1011-1012) rewritten;
     - the ternary at `form-label.test.ts:103` reduced to `control`;
     - the legend case (line 144) reading the control step instead of the group's size.
   - Bound on the fix: leave the stacked `.form-label` inheriting. A stacked label has no alignment relation with its control, and a label one step smaller above its control is an ordinary treatment.
   - Ruling D is the design verdict's decision, not the unit's, so the change needs a successor brief from the Orchestrator.

## Findings outside the claims

- **`unsized-label-type`**
  - Wrong: `/home/user/veneer-bfl/src/styles/components/_form-label.scss:21` says "The horizontal label reads the tokens the control's own inset and type read". Line 30 writes `font-size: inherit`, which reads no control token. The guide headline at `guides/veneer.md:1003` ("The horizontal label reads the control's inset and type tokens") makes the same claim for every size.
  - Why it matters: the partial's comment states behaviour the rule under it does not have. The requested experience (a horizontal label "level with the control beside it at each size", the § Showcase copy at line 4020) is only approximated for the unsized size. That size's label also duplicates the `-sm` label's type (see the claim 9 ruling).
  - Right: write `font-size: var(--vn-size-3)` per the claim 9 ruling, which makes the comment and the headline true. If the Orchestrator keeps ruling D, reword the comment and the headline to say that the unsized label takes the surrounding text's size rather than the control's type step.
- **`match-summary`**
  - Wrong: `tests/setupServer.ts:1502` reads "Selects the key a selector's classes belong to by the key's own prefix." In the code the key is the prefix of the class; the key has no prefix of its own. The `@returns` line (around line 1505) states the true relation and contradicts the summary.
  - Why it matters: this helper is the tier ruling A exists to name, and its summary misstates what it matches.
  - Right: "Selects the longest key that one of a selector's classes equals or opens with."

## Attacked and held

- **Section placement:** the forms `###` sections are placed as one release-ordered block after Placeholder. The section's opening follows the Validation section's multi-key "keys'" form, which is correct for a partial that fills the `form` and `col` tables.
- **Table placement:** the split tables sit where the pooled table sat, which breaks the § Departures sort order. That is correct under ruling H: carrier B-PASSIVE-CLOSE-B owns the whole section's key order. `#### form-range` stays apart at line 3301 for the same reason.
- **Compatibility rows:** the `form` variable row repeats the `form-check` variable row's property names. That is correct, because the release records those properties under both keys and the presence check reads each key.
- **Help-text color cases:** the `it.each` mode case and the retune case overlap on mode-following, which is redundant but not wrong. The retune case adds the wrapper control that the `it.each` case lacks.
- **`matchSelectorKey`:** it adds composition (a match per class, the longest-first sort, two call sites), so it is not a superfluous wrapper.

## Referrals

- **To the objective lane and the `verifier`:** the gate results (`250`, `21`, `27`, and `18` passed), the ledger totals of 1069 departures and 161 additions, and the byte-identity of the moved blocks (`git diff --color-moved=plain -- guides/veneer.md`).
- **To the objective lane:** `form-label.test.ts:155-159` copies the floating file's `rule.selectorText.split(',')` idiom. `form-check.test.ts:46` uses `splitTopLevelList`, which does not split on a comma inside `:is()` or `:not()`. No label selector has such a comma today. Rule whether the idiom is a defect.
- **To the Orchestrator (claims file):** claim 7 says both "the style-proof paragraph links `form-label.test.ts`" and "§ Tests is unchanged". The paragraph sits under `## Tests` (guide lines 4023 and 4137), and brief criterion 8 carries the same pair. I read the second clause as "the stem table is unchanged", which holds. Correct the wording in the successor brief.
- **To the Orchestrator (showcase paragraph, `bfw`'s verbatim text):** guide lines 4009 and 4017 each say regions "follow the Table region". Pagination and Button group sit between them (`app/browser/Showcase.ts:97-103`) and are not named. B-PASSIVE-CLOSE's Showcase region paragraph row (`x-retention-carry-distillate.md:112`) carries this.
- **NOT-EVIDENCED on this tree:** guide lines 1021-1022 say "The capture journey writes a resting element frame of each specimen". This worktree registers no `FormLabelSection` (`app/browser/Showcase.ts:91-114`). The sentence settles on the integrated tree with `bfw`'s capture rows and the `CAPTURE=1` run.

VERDICT: FAIL 4, 5, 6, 7, 8; outside the claims: unsized-label-type, match-summary
