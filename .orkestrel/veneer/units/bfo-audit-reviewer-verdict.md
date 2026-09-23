# B-FORMS-CONTROL, round 1 — `reviewer` on Opus 5.5, subjective lane

Native subagent, clean context, read on the tree of `/home/user/veneer-bfo` on 2026-09-23. The verdict text is the lane's handback verbatim.

**Lane: subjective, held by `reviewer` on Opus 5.5.** I read and edited nothing beyond the evidence, and I ran nothing. Where a claim needs a run, the verdict names the command that settles it.

## Numbered verdicts

1. **CONFIRMED.** The partial `/home/user/veneer-bfo/src/styles/components/_form-control.scss` writes every one of the key's own selectors listed in `bootstrap.css:2119-2306`, with these checks:
   - The file button uses `::file-selector-button` only (lines 94-117 and 157-162). No `-webkit-file-upload-button` selector appears.
   - The sizes are one `@each` over the `$sizes` tuple list (lines 10-13 and 144-171), in the D30 form. The swatches are one `@each` over `$swatches` (lines 18 and 185-190).
   - The reduced-motion twins come from the `transition` mixin (lines 38 and 105; `_mixins.scss:155-160`). The file button's border reset comes from the `border-reset` mixin (line 102; `_mixins.scss:40-44`).
   - Both `-webkit-margin-end` and `margin-inline-end` are written (lines 97-98 and 160-161).
   - Order at equal specificity follows the release: resting `textarea.form-control` (line 137) comes before the sized heights, and the sized padding comes before `.form-control-color` (line 175).
   - The compile itself rests on the Orchestrator's reading that conformance is red only on `.form-floating > .form-control`.
   - Attack that failed: a sized color control that loses the release's padding. It does not happen, because `.form-control-sm` precedes `.form-control-color`, as it does at `bootstrap.css:2237` and `:2285`.
   - One declaration departs without a record: the swatch's `!important`. See F1.

2. **CONFIRMED.** Checked against the ledger rows (`guides/veneer.md:2697-2736`) and the partial:
   - Padding, type, weight, and line height are tokenized.
   - Every `--bs-*` value is byte for byte.
   - The focus pair is `var(--vn-focus-width) var(--vn-focus-color)`, the binding the range section documents as `.btn`'s (`guides/veneer.md:822-826`).
   - Motion reads the motion tokens. Negative margins are `calc(var(--vn-space-N) * -1)`. Heights multiply the padding token, per D33 and D34.
   - The width `var(--vn-space-24)` stands. D33 governs values the release derives from padding (`decisions-round-2.md:315-322`). `$form-color-width` is its own variable, and the range precedent binds thumb lengths to space tokens (`guides/veneer.md:2623-2624`).
   - The status touches no token file, and no literal colour is written.
   - Attack that failed: "one concept, one term" against `_validation.scss:91` (`calc(3rem + …)`). That drift is recorded honestly at `guides/veneer.md:771-773`, and the returned ROADMAP row carries it to B-FORMS-CLOSE.

3. **CONFIRMED** on the assertions, not on the writer's red counts (which are the writer's own reading):
   - **Focus width → F.** Line 193 compares ring lengths to the gauge (3px), and a `0.25rem` ring reads 4px. Distinguishes.
   - **Placeholder colour → M.** Lines 258-263 match the colour against `--bs-secondary-color`, and the UA placeholder colour differs. Distinguishes.
   - **Surviving reduced-motion transition → G.** Line 329 expects `none`. Distinguishes.
   - **Literal size → T.** Line 141 expects 12px at density 2, and a literal holds 6px. Distinguishes.
   - **Hover surface → H.** Lines 351-356. Distinguishes.
   - **Swatch radius → L.** Line 99: `getPropertyValue('border-radius')` returns `''` against `var(--bs-border-radius)`. Distinguishes.
   - **R rows.** Dropping the `.form-control-plaintext.form-control-sm` padding reset reads 8px against 0. Distinguishes.
   - **R hover row.** Its `values` is `{}` (`setupStyles.ts:4008`), so it proves only the drive, and H carries the value.
   - **J.** A ring-colour change moves `readRing` off `FOCUS_RING`; a width-only change does not, and F covers width.
   - **C.** Removing `:not(:disabled)` from the colour rule reddens `Disabled color choice`. Removing `:not([readonly])` from the colour rule is **not** distinguished, because the markup has no readonly colour control (`setupStyles.ts:3746-3749` in the diff; `form-control.test.ts:369-396`). See R2.

4. **CONFIRMED.**
   - L's precondition (`form-control.test.ts:86`) holds that the part reads equal the host's. So a Chromium that starts resolving those parts reddens it; it cannot pass silently.
   - L reads the CSSOM declarations (lines 89-99). It proves the Gecko rules are absent from the CSSOM (line 111) and that the prefixed alias is absent (lines 114-119).
   - N reads `-moz` from the compile (`setupStyles.test.ts:1502-1508`). The rung is taken from the selector, not trusted (lines 1460-1468).
   - The guide's ladder bullets (`guides/veneer.md:779-791`) name the same rungs.

5. **BROKEN.**
   - **Shape.** `FORM_CONTROL_CASES` binds tokens per selector. `setupStyles.test.ts:1496` checks each `reads` name against the whole rule's joined declarations.
   - **Precedent.** The family ruled this shape a defect for GROUP: `/home/user/scaffold/.orkestrel/veneer/units/bfg-audit-verdict.md:13-16`, carried by `b-forms-group-brief-3.md:101-105`.
   - **Failing state.** Plant `padding: 0; --audit-unused: var(--vn-space-3) var(--vn-space-6)` on `.form-control` (`_form-control.scss:28`). N stays green. Only R and the ledger catch it, which is exactly the GROUP reading.
   - **Why it matters.** After integration, `tests/setupStyles.ts` holds one binding concept in two shapes: per property for `INPUT_GROUP_CASES`, per selector here.
   - **Fix.** Give each row per-property references in `INPUT_GROUP_CASES`'s landed shape, and make N read each property's declaration against its own references.
   - **Scope note.** `FORM_RANGE_CASES` carries the same per-selector `reads` shape (46 `reads:` rows in the file, 34 of them this key's). The Orchestrator rules whether RANGE is carried too.
   - The field list, the export-name rows (`setupStyles.test.ts` diff lines 1419-1430), the freeze rows (lines 1509-1514), and the markup case (lines 1516-1525) are present.

6. **CONFIRMED.**
   - The table is at `guides/veneer.md:2693-2736`. Every row is `tokenized` except the two `dropped` appearance rows (2701-2702).
   - The two `:focus` rows moved in (2735-2736) and are gone from `is-invalid` and `is-valid` (2549-2563).
   - The four `Excluded` rows sit beside the bare row (1053-1057). The § Files row is at 203, the § Tests link at diff line 821, and the § Compatibility row at 3069.
   - The ledger, deferral, and tag cases are green on the Orchestrator's conformance reading.
   - The writer is right that the `.form-control-color.is-*` rows stay under the validation keys. `attributeSelector` (`tests/setupServer.ts:1536-1543`) keeps only keys among the selector's own classes. Those classes are `form-control-color` and `is-valid`, so the answer is `is-valid`. Moving the rows would redden the ledger.

7. **NOT-EVIDENCED.** Specimens, section proof, journey case, and keys:
   - The specimens are at `constants.ts` (diff 29-90) and the section proof at `FormControlSection.test.ts`.
   - The journey case is at `integration.test.ts` (diff 1094-1125).
   - `CASCADE_KEYS`, `FORM_CONTROL_KEYS`, and the `CAPTURE_KEYS` spread are at `setup.ts` (diff 1323-1407).
   - All 10 scenarios exist in all 4 variants.

   What the frames show against the release:
   - `form-control-text--light-1280.png`: white fill, hairline border, rounded corners, grey placeholder. Matches `.form-control` and `::placeholder`.
   - `form-control-file--dark-1280.png`: a tertiary-surface "Choose File" button flush against the left border, with a divider on its right edge. Matches `::file-selector-button`.
   - `form-control-color--light-390.png`: a 48px box with a rounded, borderless swatch. It is black because the specimen carries no value.
   - `form-control-disabled--light-1280.png`: the secondary grey surface. Matches `:disabled`.
   - `form-control-readonly--dark-390.png`: the resting dark fill, as the release gives readonly no surface of its own.
   - `form-control-text-focus--light-1280.png` (**not shown**): a 1280×14553 whole-page frame. At the resolution the portfolio delivers, the text control and its ring cannot be seen, and no region crop exists (Glob `tmp/capture/**/*form-control-text-focus*` returns only the four page PNGs). The writer did not inspect it either (report § Claims flagged as unverified). **Missing capture:** a crop of the page frame at the control's bounding box plus the ring's outset, or an element frame with margin, in each variant.

8. **UNRESOLVED.**
   - **Mechanism holds.** `calc(0.375em + 0.1875rem)` is 9px at 16px type against 8.25px at 14px. The `81px` readings (`validation.test.ts:88-89` and `:329-330`) rightly stay, because those swatches carry `form-control-color` without `form-control` (lines 62 and 289) and keep the 14px body type.
   - **Stage line.** Staging the motion preference reads the end state of the release's own 0.15s border transition, the same practice F uses. It hides no defect in the partial.
   - **Unverified.** The assertions after each first failing line rest on the writer's report alone. Settle with: apply the patch, then `npx vitest run --config configs/src/vite.styles.config.ts --no-cache --reporter=dot tests/src/styles/components/validation.test.ts`.

9. **BROKEN.**
   - **Unsupported cause.** `guides/veneer.md:735-736` says the alias is withheld "because the build drops that alias". The partial says the alias "is not written" (`_form-control.scss:91-93`). The deferral rows say "omitting its authored rule preserves that absence" (1053-1057). The guide states a build mechanism nothing in the diff shows. Fix: "because the partial does not write that alias and the standard part paints the same button."
   - **Code tokens with no noun.** Two tokens break writing.md's noun rule: "`0.15s ease-in-out`;" (759) and "`0.15s ease`," (761). Fix: "the `0.15s ease-in-out` value" and "the `0.15s ease` value". The range section at 827-829 carries the same pattern.
   - **List that doesn't match its lead-in.** Line 777 introduces the list as "Each part takes one rung". Its last item (789-791) is the host's `overflow` declaration, which is not a part. Fix: "Each part, and the file control's `overflow` declaration, takes one rung".
   - **False comment.** `tests/src/styles/components/form-control.test.ts:182` says "the release's quarter-second fade". The release's fade is 0.15s (`bootstrap.css:2134`). Fix: "the release's `0.15s` fade".
   - **Held.** No term from the substitution table appears in lines 723-795. Each ROADMAP row names one carrier. See R3 on the carrier's name.

10. **UNRESOLVED.**
    - The `npm run check` exit code rests on the writer's reading alone (report § Gate table). Settle with `npm run check` in `/home/user/veneer-bfo`.
    - **Held by reading:**
      - The added lines hold no `any`, no `as` other than `as const` (`form-control.test.ts:58`), no `!`, and no suppression.
      - `drive` is an object, not a nested function.
      - Every table is frozen.
      - `requireValue`, `readStyle`, and the other helpers come from `@orkestrel/test`.
      - `bfo-status.txt` lists exactly the owned set, with the four new files as `A`.
      - `tmp/probe/` is absent (Glob returns nothing).
      - `validation.test.ts` and the off-limits files do not appear in the status.

## Findings outside the claims

- **F1, swatch-priority.**
  - **Failing state.** The release writes `border: 0 !important` on both swatch parts (`bootstrap.css:2294` and `:2298`). The partial writes `border: 0` (`_form-control.scss:187`).
  - **Effect.** An unlayered consumer rule `.form-control-color::-webkit-color-swatch { border: 1px solid red }` beats Veneer's layered rule. It loses to the release's rule.
  - **Why nothing records it.** The ledger does not see priority: `readCascadeBlocks` stores postcss `declaration.value`, which excludes `!important` (`tests/setupServer.ts:1422-1423`). So neither the `#### form-control` table nor § Form control classes records the drop. `FORM_CONTROL_CASES` also misstates the release's value as `border: '0'` (`setupStyles.ts:4241`).
  - **Convention broken.** The guide's convention (`guides/veneer.md:152-155`) is that Veneer carries Bootstrap's own `!important`.
  - **Fix.** Write `border: 0 !important;` in the swatch `@each`. Name the swatch rule in the non-utility sentence at `guides/veneer.md:153-155`. Correct the table's `values` to the release's text.

## Referrals

- **R1, to the objective lane.** The ledger and cascade comparison drop declaration priority (`tests/setupServer.ts:1422-1423`), so any partial can lose a Bootstrap `!important` and no gate reports it. Rule whether the reader must carry `declaration.important`.
- **R2, to the objective lane.** C cannot distinguish removing `:not([readonly])` from `.form-control-color:not(:disabled):not([readonly])` (`_form-control.scss:181`), because `FORM_CONTROL_MARKUP` has no readonly colour control. Separately, the R hover row asserts no value (`setupStyles.ts:4008`).
- **R3, to the Orchestrator.** The returned ROADMAP row names "B-FORMS-CONTROL at integration, after GROUP lands" as D31's carrier (report line 282). The claims file records D31 as re-carried to B-FORMS-CLOSE. The row must name B-FORMS-CLOSE before it lands.

## Attacked and held

- **Specimen name.** `Form control text` keeps the specimen set's noun-first order, and `readSubject` refuses the bare region name.
- **Construction order.** Building `FormControlSection` directly before `FormRangeSection` (`Showcase.ts:100`) matches the brief's local alphabetical anchor. The barrel and guide order follow D35.
- **Four `Excluded` rows.** They are required by the presence case's exact-match skip (report § Deferral rows). Each names a recorded inventory selector.
- **The colour specimen's black swatch.** The value is absent by design, and the frame still shows the swatch's radius and borderless edge.

VERDICT: FAIL 5, 7, 8, 9, 10; outside the claims: F1
