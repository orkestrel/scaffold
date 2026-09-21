# CL4b audit — claims

Subject: unit CL4b in the Veneer checkout (`C:/Users/mikes/WebstormProjects/veneer`) over the
base `bc580c1` (the CL4 landing), written by `builder` on native Sonnet under
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4b-brief.md`. Its report is
`units/cl4b-report.md`. The unit carries the two proof obligations CL4's audit found
(`cl4-audit-verdict.md`, round 2 finding 9 and round 1's note on claim 7) and nothing else.

Evidence: the rendered diff `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/cl4b-diff.patch.txt`
and the status `tmp/audit/cl4b-status.txt`, the live tree, and the built
`dist/src/styles/index.css`.

Audits cover implementation only: correctness, rule compliance, test sufficiency, scope honesty.
Rule on every claim with CONFIRMED, REFUTED, or UNDECIDABLE and the deciding evidence (`file:line`
or exact text); record a report-only claim as report-only; add an implementation-defect finding
only after the last claim, with a site and a one-line failure scenario, saying whether it forces
another round.

1. The horizontal rule's border reset is pinned. `tests/setupStyles.ts` adds
   `border-inline-start-width`, `border-inline-end-width`, and `border-block-end-width`, each
   `'0px'`, to the frozen `values` object of `TEXT_HR_CASES`, and changes no existing entry.
   `tests/src/styles/elements/hr.test.ts` is unedited because it derives its property list from
   `Object.keys(values)`, so the new entries are read for every mode the table carries.

2. That pin is falsifiable and isolated. Dropping the `border: 0` the `box-reset` mixin supplies
   to `src/styles/elements/_hr.scss` reddens exactly the three new entries while the margin, the
   block-start border width and style, the opacity, and the colour keep passing; restoring it
   passes (report-only red-then-green runs recorded in `units/cl4b-report.md`). The plant is
   gone: `src/styles/elements/_hr.scss` is absent from the status and matches `bc580c1`.

3. The content section proof has an independent control.
   `tests/app/browser/sections/ContentSection.test.ts` adds one assertion comparing
   `CONTENT_SPECIMENS.map((specimen) => specimen.name)` against a literal array of every specimen
   name in table order, transcribed from `app/browser/constants.ts`. No existing assertion is
   changed and no case is added. The transcription is exact, which the green suite establishes.

4. That control is falsifiable against a mutation the existing assertions cannot catch. Renaming
   one specimen in `app/browser/constants.ts` reddens the new assertion while the existing
   `data-specimen` comparison against that same table stays green; restoring the name passes
   (report-only red-then-green runs). The plant is gone: `app/browser/constants.ts` is absent
   from the status and matches `bc580c1`.

5. Neither change touches shipped output. `src/styles/**`, `app/browser/**`, `guides/veneer.md`,
   `tests/setupConformance.ts`, `tests/fixtures/**`, `package.json`, `configs/**`, and the
   vendored files are absent from the diff, so the published cascade, the public API, and the
   guide are untouched by this unit.

6. `[mechanical]` Scope, law, and gates. `tmp/audit/cl4b-status.txt` lists exactly
   `tests/setupStyles.ts` and `tests/app/browser/sections/ContentSection.test.ts`, both inside
   the brief's owned set, and nothing else outside `tmp/`. The added lines carry no `any`, no
   type assertion outside `as const`, no non-null assertion, no suppression comment, no
   `public`/`private`/`protected`, no parameter property, no default export, no skipped case, and
   no case named for a control. `tests/setupStyles.test.ts` is unedited, and its export-name list
   still holds because this change adds no export. Every step of the ordered chain exits 0, and
   the independent verifier's chain is green with the status identical before and after.
