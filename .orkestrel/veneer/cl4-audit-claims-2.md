# CL4 audit — claims (round 2, the fix round under brief 7)

Subject: the whole CL4 change in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`)
over the base `d822d59` (the CL3b landing), after the fix round `sol` on Astra ran under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4-brief-7.md` (over briefs 6
to 1, in force beneath it). Round 1's verdict is `.orkestrel/veneer/cl4-audit-verdict.md`; the
fix report is `units/cl4-report-6.md`. Evidence: the rendered diff
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4-diff-2.patch.txt` and status
`tmp/audit/cl4-status-2.txt`, round 1's `units/cl4-diff.patch.txt` for comparison, the live
tree, and the built `dist/src/styles/index.css`. Audits cover implementation only. Rule on every
claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence; a report-only claim is
recorded as report-only; add an implementation-defect finding only after the last claim, with a
site and a one-line failure scenario, saying whether it forces another round.

Round 1's rulings carry unchanged and are not reopened: every claim it confirmed stands, its
correction to claim 7's wording is recorded there, and the `::-moz-focus-inner` exclusion's
product cost is an open question for the user rather than an audit item.

1. The boundary is no longer a literal (reviewer 10 closed). `src/styles/elements/_fieldset.scss`
   loads the mixins and reads `breakpoint-up(xl)` for the legend's size step; no file under
   `src/styles/` writes a breakpoint width as a literal except the ramp in `_mixins.scss`, which
   is its single Sass source. The legend's resolved size is unchanged at every width the unit
   measured: 23.4px at 1000, 23.997px at 1199, 24px at 1200 and 1201 (report-only readings, taken
   before and after with a rebuild between and asserted against a saved baseline).

2. The shared blocks are mixins, and the sweep found more than the brief named (analyst 10 and
   reviewer 11 closed). `src/styles/_mixins.scss` gains `control-text` (the control reset, used by
   `input`, `select`, `optgroup`, `textarea`), `border-reset` (used by the group rule in
   `_table.scss` and the row and cell rule in `_tr.scss`), and three the folder sweep found:
   `box-reset` (used by `button`, `fieldset`, `hr`), `caption-text` (used by `figcaption` and
   `caption`), and `cell-space` (used by `caption` and the cells). Each consumer keeps its own
   selector and its distinct declarations; `box-reset`, `caption-text`, and `cell-space` take
   caller content so each consumer's original declaration order is preserved. `_mixins.scss`
   still emits no top-level CSS.

3. The sweep is recorded and complete. Its population is every partial under
   `src/styles/elements/` — 39 files, listed in the report — and its pairs are all 741 unordered
   pairs, enumerated in the retained red and green records. The instrument compiles each partial
   with Sass source maps and uses them to distinguish a declaration the partial authors from one
   a mixin supplies. After extraction no pair retains a shared block of two or more identical
   declarations, and the pre-extraction run detects the five patterns it then reports removed
   (report-only runs). Three of the five reach into partials CL3 landed, which is why the sweep
   was folder-wide rather than limited to this unit's files.

4. Every resolved reading is unchanged by the extraction. The unit reports the styles suite green
   with no expectation edited, and its cascade comparison shows the emitted declarations equal
   before and after for every consumer (report-only). The built cascade's layer order is
   unchanged.

5. The non-visible focus rule is proven (reviewer 12 closed).
   `tests/src/styles/elements/button.test.ts` gains cases that put a button in a focused,
   not-focus-visible state through a pointer interaction and read its outline in both modes, so
   changing the shipped `outline: 0` reddens; the rule itself is unchanged.

6. The two departures are recorded (reviewer 13 closed). `guides/veneer.md` carries a row for
   `colgroup` joining the border-reset group, which Bootstrap's own group does not carry, and one
   for `th` keeping `text-align: inherit` without Bootstrap's `-webkit-match-parent` fallback,
   each beside the existing cell row. Both are inert on the managed receipts, and the report no
   longer calls those two values retained without qualification.

7. `[mechanical]` Scope, law, and gates. `tmp/audit/cl4-status-2.txt` lists the same paths as
   round 1 plus nothing new; the round-2 diff differs from round 1's only in
   `guides/veneer.md`, `src/styles/_mixins.scss`, `tests/src/styles/elements/button.test.ts`, and
   the partials the fixes and the sweep touched (`_button`, `_fieldset`, `_figure`, `_hr`,
   `_input`, `_optgroup`, `_select`, `_table`, `_textarea`, `_tr`), every one inside brief 7's
   grant; `_hr.scss` and `_figure.scss` are CL3's files, which brief 7 grants for the sweep
   alone. `tests/setupConformance.ts`, `src/styles/_reset.scss`, `_tokens.scss`,
   `tests/fixtures/**`, `package.json`, `configs/**`, and the vendored files are absent from the
   diff. The added lines carry no `any`, no type assertion outside `as const`, no non-null
   assertion, no suppression comment, no `public`/`private`/`protected`, no parameter property,
   no default export, no skipped case, and no case named for a control; no plant residue remains.
   Every gate in brief 1's item 6 exits 0 on managed Chromium and Edge, and the independent
   verifier's chain (including `npm test`, the journeys, and `scaffold audit`) is green with the
   status identical before and after.
