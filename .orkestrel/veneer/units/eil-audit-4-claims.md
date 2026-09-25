# E-ID-LAYOUT round 4 audit — claims

Subject: E-ID-LAYOUT round 4 in `/home/user/veneer-eil` (uncommitted over Veneer `ca83afb`), briefed by
`e-id-layout-brief-4.md` (carrying L1 to L3 of `eil-audit-3-verdict.md` under `../e-identity-design-verdict.md`
§ Addendum 3), written by `opus` on Opus 5.5, and reported in `e-id-layout-report-4.md`. The diff is `eil-4.diff` (the
whole change over `ca83afb`), the status `eil-4-status.txt`, and the round-4 instruments and logs `eil-instruments/r4/`.
All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The compiled cascade is
`/home/user/veneer-eil/dist/src/styles/index.css`; Bootstrap 5.3.8 is
`/home/user/veneer-eil/node_modules/bootstrap/dist/css/bootstrap.css`. A unit report's prose is not a claim subject.
Each claim is falsifiable; rule every one.

1. **Block figure.** `figure` writes no `display` or `flex-direction` and keeps `margin: 0`; `figcaption` keeps
   `margin-top: var(--vn-space-4)`; the guide carries no `figure { display }` or `figure { flex-direction }` row.
2. **Placement proof.** The added case reads, for each of the bare, `.text-center`, and `.text-end` holders, a figure box
   that ends at the footer edge and a following block 16px later; it reddens under a restored flex figure
   (`eil-4-mutation-restored-flex.log.txt`), its assertions distinguish that mutation, and its title states what it
   proves.
3. **Parity readings.** Under the fixed-geometry fixture, the attributed quotation's figure height and the following
   `p` read the same in both cascades at 390 and 1280 pixels, and the probe's flex control reads different
   (`eil-4-probe.log.txt`, `eil-4-probe-control.log.txt`); every probe cell the round-3 probe left out is read.
4. **Title and matrices.** The `.figure` case carries the title
   `shrinks the figure to its content and spaces the caption 8px under the image`; `FIGURE_QUOTATION_CASES` and
   `FIGURE_IMAGE_CASES` live in `tests/setupStyles.ts` with TSDoc and in the export inventory, and no case matrix remains
   inline in `figure.test.ts`.
5. **Scope and law.** The status lists only files the round-1 to round-4 briefs grant; no selector in the owned
   partials reads a tag's context or the presence of a class; the diff adds no `any`, `as`, non-null assertion,
   suppression, nested function declaration, or hidden helper.
