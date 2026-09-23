# bfl round 2, subjective lane (`reviewer` on Opus 5.5) — verdict

Brief: `units/bfl-2-audit-reviewer-brief.md`. Claims: `units/bfl-2-audit-claims.md`.

**Lane held:** subjective. I am `reviewer` on Opus 5.5, clean context, read-only, and I ran nothing. Opus wrote this unit, so I attacked it harder than usual. Any gate result that only the writer's report evidences is ruled `UNRESOLVED`.

## Numbered verdicts

1. **CONFIRMED.**
   - `bfl-2-delta.diff` touches exactly the files round 1 owned: `guides/veneer.md`, `_form-label.scss`, `form-label.test.ts`, `setupStyles.ts`, `setupStyles.test.ts`, `setupServer.ts`, `setupServer.test.ts`, and `conformance.test.ts`.
   - `/home/user/scaffold/.orkestrel/veneer/units/bfl-2-status.txt` lists round 1's files and no other file.
   - Every round-2 guide hunk sits inside `### Form label classes` (`/home/user/veneer-bfl/guides/veneer.md:989-1022`) or in the `#### col` row.
   - Attack that failed: I looked for a round-2 guide hunk outside those two places and found none.
   - Round 2 also edited three sites in the section that brief-2 did not name: the departure bullet's body (`:1004-1007`); the legend clause's result (`:997-998`); the style-proof paragraph (`:1021`). The report records each of these edits under "Decisions recorded". Each was required: the text it replaced became false under the binding. Whether these edits break the letter of "nothing else changes" is referred to the objective lane.

2. **CONFIRMED.**
   - `/home/user/veneer-bfl/src/styles/components/_form-label.scss:30` writes `font-size: var(--vn-size-3)`. This is the same token that the control's `input-text` mixin writes (`src/styles/_mixins.scss:49`).
   - The `$sizes` rules (`:4`, `:34-40`) and `.form-label` (`:11-13`) are unchanged in the delta.
   - `tests/setupStyles.ts:4957` binds `'font-size': ['--vn-size-3']`.
   - `form-label.test.ts:107` compares every label's font size with its control's, and no ternary remains.
   - The legend case reads the group's `.form-control` at `:141`, `:146`, and `:148`.
   - `dist/src/styles/index.css` carries `.col-form-label{…font-size:var(--vn-size-3);line-height:var(--vn-line-body);margin-bottom:0}`.
   - The report records the red run and then the green run (report lines 90-99). That run itself rests on the report.
   - Mutations, all distinguished by the assertions: **Revert to `inherit`** — the label inherits the body's 14 px against the control's 16 px; `:107` fails, `:148` fails, and the Node case at `setupStyles.test.ts:2736-2739` fails because the declared reads map lacks `font-size`. **Bind `--vn-size-2`** — the level case and the Node case fail. **Drop the declaration** — the level case fails, and the legend case fails on the elements layer's `calc(var(--vn-size-6) * 0.85 + 0.3vw)` (`_fieldset.scss:15`).

3. **UNRESOLVED.**
   - The row's reading holds: `guides/veneer.md` `#### col` carries `` | `col` | `.col-form-label` | `font-size` | — | `inherit` | `var(--vn-size-3)` | tokenized | ``, between the `padding-bottom` and `line-height` rows (the partial's declaration order, in the table's column widths). The classifier in `tests/setupServer.ts`, around lines 1337-1342, assigns `tokenized`. Deleting the row reddens the departures equality that the guide describes at `:2235-2237`.
   - The conjunct "`npm run test:conformance` is green with it" rests only on the writer's report. The verifier's run settles it.

4. **CONFIRMED.**
   - `guides/veneer.md:994-996` states that the unsized horizontal label reads `--vn-size-3`, the control's type step, so its text sits level with the control's text, and that the stacked label keeps inheriting the surrounding type. `:1013-1014` no longer names an `inherit` size. The headline at `:1004` stays, and it holds at every size: the unsized, `-lg`, and `-sm` labels read `--vn-space-3/4/2` and `--vn-size-3/5/2`, and they read `--vn-line-body` through the base class, matching `_form-control.scss:11-12` and `:29`.
   - Attack that failed: I looked for a horizontal size whose type or inset token differs from its control's, and found none.
   - The defects around this sentence are ruled under claim 6 and in `legend-antecedent`.

5. **CONFIRMED.**
   - `form-label.test.ts:7-12` imports `splitTopLevelList` from `../../../setupStyles.js`, the same source `form-check.test.ts:20-26` uses. `:160` calls it. A tests-wide grep for `split\(','` returns no hit in `form-label.test.ts`. This is a refactor, not a proof, so no mutation applies: no label selector carries an inner comma. The floating proof's copy of the same idiom belongs to B-PASSIVE-CLOSE under the round-1 reconciled verdict.

6. **BROKEN.**
   - Every quoted site carries the brief's text: `setupServer.ts:395`, `:1502`, `:1504`, `:1458-1460`, `:2020`, and `:2024`; `setupServer.test.ts:2208-2209`; `conformance.test.ts:321-322`; `setupStyles.ts:4928-4929`; `setupStyles.test.ts:2749`; `form-label.test.ts:78-79`; `guides/veneer.md:990-992` and `:997`; `_form-label.scss:24`.
   - The final conjunct fails: round 2 added a bare code token. **Wrong:** `/home/user/veneer-bfl/guides/veneer.md:996` reads "and the stacked `.form-label` keeps inheriting the surrounding type" — a selector token with no noun after it. **Right:** "and the stacked `.form-label` class keeps inheriting the surrounding type".

7. **CONFIRMED.**
   - The delta adds no `any`, type assertion, `!`, suppression, mock, or nested function. The only function literals are callbacks passed directly as arguments (`form-label.test.ts:157-163`). It adds no helper.
   - The report records the commands and their results (lines 120-131), the red run and then the green run (lines 90-99), the row that landed (lines 134-150), the prose that landed (lines 152-196), and the § Tests sentence verbatim (line 132). The report states no authored count. The lines for `npm run lint:check` and `npm run check` (123-124) carry only the shared "Each command exited 0"; that letter question is referred.

## Findings outside the claims

- **`legend-antecedent`.** `/home/user/veneer-bfl/guides/veneer.md:996-998`: the sentence after the stacked-label clause opens "On a `legend` element it also clears the element's own trailing margin and type size", and its "it" now attaches first to the nearest subject, the stacked `.form-label`; the intended referent is the horizontal label. **Right:** "On a `legend` element the horizontal label also clears the element's own trailing margin and type size, so the legend reads at its control's type step."

## Attacked and held

- **Category wording.** The `tokenized` category is correct under the classifier's own definition ("a value reading a Veneer token the release does not read") and at the release's base, where `inherit` resolves to `1rem`, which is `--vn-size-3`.
- **"the legend reset".** The Compatibility `col` row keeps "the legend reset", which holds as the margin reset the legend case proves.
- **Barrel-order comment.** "across its own partials that Veneer writes from one" is awkward but correct.
- **Short wrapped line.** The line at `guides/veneer.md:1007` renders unchanged; `format:check` owns wrapping.

## Referrals

- **To the objective lane:** claim 1's three unnamed site edits against criterion 3's letter (the subjective ruling: each was required); claim 7's "Each command exited 0" for `lint:check` and `check`; under `.claude/rules/tests.md`, no case title names the unsized label's type step and the guide's proof paragraph (`:1016-1022`) lists "the sized labels' type steps" but not the unsized label's.
- **To the Orchestrator:** the phrase "so its text sits level with the control's at each size" (`:995-996`) is vacuous for the unsized label, which has one size; bare tokens that predate the unit next to repaired sites need a carrier: `tests/setupServer.ts:2100` ("as `collectShippedComponents` selects them"), `:2219` ("as {@link collectKeyframeNames} reads them"), `tests/setupStyles.ts` around line 3616 (the `FormRangeCase` remarks' path token as subject), `guides/veneer.md:2044-2045` (`.container-sm` and `.container-fluid` as subjects).

VERDICT: FAIL 3, 6; outside the claims: legend-antecedent
