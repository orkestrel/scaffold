# CL4 audit — claims (round 1)

Subject: unit CL4 (the remaining Reboot tags and the `reboot` key), written by `sol` on Astra in
the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the base `d822d59` (the CL3b
landing), under six briefs:
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4-brief.md` with
`cl4-brief-2.md` (the scope read's corrections and the scan's mechanics), and the Orchestrator's
three rulings on the unit's four deviation stops: `cl4-brief-3.md` (the selector
canonicalization), `cl4-brief-4.md` (the prefixed file-button exclusion), `cl4-brief-5.md` and
`cl4-brief-6.md` (the ledger-population cases in the conformance proof). The reports are
`units/cl4-report.md` to `units/cl4-report-5.md`; the last is the completion report and the four
before it are stop reports. The scope read is `units/cl4-scope-read-report.md`. Evidence: the
rendered diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4-diff.patch.txt` and status
`tmp/audit/cl4-status.txt`, the live tree, the built `dist/src/styles/index.css`, the pinned
`tests/fixtures/oracle/inventory.json`, the calibration record
`.orkestrel/veneer/research/calibration-content.md`, and the terrain map
`units/cl4-scout-report.md`. Audits cover implementation only: correctness, rule compliance, test
sufficiency, scope honesty. Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the
deciding evidence; a report-only claim (a red-then-green run, a measurement the unit took) is
recorded as report-only; add an implementation-defect finding only after the last claim, with a
site and a one-line failure scenario, saying whether it forces another round.

1. The `reboot` key ships and the presence scan proves it. `guides/veneer.md` § Compatibility
   carries the `reboot` row with kind `selector`, a dash Proof cell, and Status `shipped`;
   `tests/conformance.test.ts` reads `listed` as `['btn', 'reboot']`; `collectShippedComponents`
   over the live ledger returns that same pair, which is why the assertion comparing them holds;
   and `npm run test:conformance` exits 0 (verifier). Every one of the pinned `reboot`
   component's 117 projected selectors is either present in the built cascade by the scan's exact
   normalized rule or carries an `Excluded` row.

2. The partials ship the selectors, one bare tag per file. `src/styles/elements/` gains `_b`,
   `_figure`, `_img`, `_svg`, `_table`, `_tr`, `_label`, `_input`, `_select`, `_optgroup`,
   `_textarea`, `_fieldset`, `_output`, `_iframe`, `_details`, and `_progress`, and
   `_button.scss` grows the reboot selectors it lacked (`button:focus:not(:focus-visible)`,
   `[role=button]`, `[type=button]`, `[type=reset]`, `[type=submit]`, and their `:not(:disabled)`
   twins); each partial selects one bare tag plus that tag's pseudo-class, attribute, and
   mandated-pair selectors, and the attribute-only and vendor pseudo-element selectors sit in
   their family's file; every new partial loads from `src/styles/index.scss`; the layer order
   line in `_tokens.scss` is unchanged and the built cascade declares that order; the
   elements-layer and physical-axis guards in `tests/src/styles/index.test.ts` pass, and that
   file is absent from the diff because no selector this unit ships is refused.

3. The values are bound to the record where Elements carries a specimen and to Bootstrap where
   it does not, each named. The report's per-partial table gives each partial's selectors and
   marks each value calibrated or retained: the figure, image, table, and cell geometry read the
   calibration record through the `--vn-space-*`, border, and muted-text tokens; the form
   controls, `svg`, `label`, `output`, `iframe`, `summary`, and `progress` retain Bootstrap's own
   values. `legend` uses logical inline-start float and inline size rather than a physical
   property, so the physical-axis guard holds.

4. The exclusion set is ten rows and every name is absent from the cascade. The guide's
   `### Deferred selectors` table carries Owner `Excluded` rows for `ol ol`, `ul ul`, `ol ul`,
   `ul ol`, `pre code`, `a > code`, `kbd kbd`, `legend + *`, `::-moz-focus-inner`, and
   `::-webkit-file-upload-button`, each with a reason; each name is a whole selector the pinned
   inventory carries; and none appears in the built cascade, nested rules included. The prefixed
   upload rule was removed from `_input.scss` so the absence holds from the source rather than
   from the minifier's decision, and the standard `::file-selector-button` ships.

5. The canonicalization is inside its grant and cannot mask an absence.
   `normalizeComplexSelector` in `tests/setupStyles.ts` folds the four legacy single-colon
   pseudo-elements (`:before`, `:after`, `:first-line`, `:first-letter`) to their double-colon
   forms and drops a universal only where it precedes a pseudo-element; `tests/setupStyles.test.ts`
   cases cover the four names, a pseudo-class that must not fold, the three equivalent `before`
   spellings collapsing to one, the universals the rule must not touch (`* + *`, `.a *`,
   `a *::before`), and a genuinely absent selector staying unchanged and absent. Measured: the
   comparison misses 64 selectors before the partials and 12 after, and the canonicalization
   recovers exactly `*::before` and `*::after` in both readings, so the final ten misses are
   exactly the exclusion set (report-only counts; the instrument is retained as
   `units/cl4-selector-gap.mjs` beside the unit's own).

6. Every mirrored proof exists and reads its partial. `tests/src/styles/elements/` gains one
   proof per new partial, each reading its resolved values on the managed Chromium receipt
   through the case tables in `tests/setupStyles.ts`, and the unit reports a red-then-green pair
   per partial (report-only).

7. `ContentSection` renders the new families. `app/browser/constants.ts` grows
   `CONTENT_SPECIMENS` with one specimen per new family typed by `ContentSpecimen`, frozen as
   its siblings are; `tests/app/browser/sections/ContentSection.test.ts`'s count and sequence
   assertions grow with them; `app/browser/index.ts` needs no edit because it re-exports with a
   wildcard.

8. The conformance proof no longer assumes a single-component ledger, and no case weakened.
   `tests/setupConformance.test.ts`'s ledger-derived cases scope their manipulation to the
   component each is about: the two category cases filter to `btn` before their loops and still
   assert that removing or accepting a category's rows withholds it; the partition case keeps
   brief 5's `btn` filter so its synthetic inventory matches its population, with no `reboot`
   entry added to that fixture; the dash-proof case asserts the component set
   `{btn, reboot, engine}` with its loop unchanged. The unit reports sweeping every
   `readCompatibility` call in the file and finding no further case that needed scoping. No
   production conformance code changed: `tests/setupConformance.ts` is absent from the diff.

9. `[mechanical]` Scope, law, and gates. `tmp/audit/cl4-status.txt` lists only the files the six
   briefs own, and the granted setup files appear exactly for their granted purposes
   (`tests/setupStyles.ts` for `normalizeComplexSelector`, `tests/setupStyles.test.ts` for its
   cases, `tests/setupConformance.test.ts` for the ledger-population scoping,
   `tests/conformance.test.ts` for `listed`); `tests/setupConformance.ts`, `src/styles/_reset.scss`,
   `src/styles/_tokens.scss`, `_mixins.scss`, `tests/fixtures/**`, `package.json`, `configs/**`,
   and the vendored files are absent from the diff. The added lines carry no `any`, no type
   assertion outside `as const`, no non-null assertion, no suppression comment, no
   `public`/`private`/`protected`, no parameter property, no default export, no skipped case, and
   no case named for a control; no plant residue remains. Every gate in brief 1's item 6 exits 0
   on managed Chromium and Edge, and the independent verifier's chain (including `npm test`, the
   journeys, and `scaffold audit`) is green with the status identical before and after.
