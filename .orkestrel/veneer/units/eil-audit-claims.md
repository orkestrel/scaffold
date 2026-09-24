# E-ID-LAYOUT audit — claims

Subject: E-ID-LAYOUT rounds 1 and 2 in `/home/user/veneer-eil` (branch `unit/eil`, uncommitted over Veneer `ca83afb`),
briefed by `e-id-layout-brief.md` and `e-id-layout-brief-2.md` under `e-id-common.md` and
`../e-identity-design-verdict.md` (with its addendum), written by `opus` on Opus 5.5, and reported in
`e-id-layout-report.md` and `e-id-layout-report-2.md`. The diff is `eil-2.diff`, the status `eil-2-status.txt`, and
the instruments and logs `eil-instruments/`. All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The
Bootstrap 5.3.8 cascade is `/home/user/veneer-eil/node_modules/bootstrap/dist/css/bootstrap.css`. A unit report's
prose is not a claim subject. Each claim is falsifiable; rule every one.

1. **Scope.** The status lists only the owned and shared files the briefs and the addendum grant, and the diff
   changes nothing outside the `dl`, `blockquote`, and `figure` rules, their proofs, their fixture values, their guide
   rows, and the Type specimen with its section test.
2. **Horizontal description list.** Bootstrap's `dl.row` with `.col-sm-*` children lays out with each `dd` beside its
   `dt` from the `sm` breakpoint and stacks below it, as Bootstrap's does; the proof in `dl.test.ts` reads that, and
   the `unscoped-grid` and `zero-dd-margin` mutations each redden it (`eil-instruments/`).
3. **Bare lists.** A bare `dl` keeps the two-column grid, every `dt` in the term column and every `dd` in the
   description column with repeated terms and repeated descriptions; the `no-dt-column` and `no-dd-column` mutations
   each redden that proof.
4. **Quotations and figures.** `.blockquote` reads no bar, inset, or italics while a bare `blockquote` keeps them; the
   attributed quotation's footer starts at the quotation edge in a bare, a `.text-center`, and a `.text-end` figure;
   the `unscoped-blockquote`, `unscoped-figure`, and `classless-figure` mutations each redden their proof, so a
   content test on the figure, not a class test, is required.
5. **Records.** The guide's departure and addition rows match the shipped cascade, and the conformance ledger passes.
6. **Specimen.** The Type section's horizontal description list sits inside `.container-fluid`, stays inside the
   region at 390 and 1280 pixels, and `TypeSection.test.ts` pins it.
7. **Law.** The diff adds no `any`, `as`, non-null assertion, suppression, nested function declaration, or hidden
   helper, and every added or retitled test is named for what it proves.
