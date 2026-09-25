# E-ID-FLOW-2 audit — claims

Subject: E-ID-FLOW-2 rounds 1 and 2 in `/home/user/veneer-flow2` (branch `unit/flow2`, uncommitted over Veneer
`e07b3a6`). Round 1 was briefed by `e-id-flow-2-brief.md`, written by `opus` on Opus 5.5, and reported in
`e-id-flow-2-report.md`. Round 2 was briefed by `e-id-flow-2-brief-3.md` (the relaunch of `e-id-flow-2-brief-2.md`),
written by `builder` on Sonnet, and retires the `box-reset` mixin. Evidence: `flow2-2.diff` (the whole change over
`e07b3a6`), `flow2-2-status.txt`, round 1's `flow2.diff`, and the logs under `flow2-instruments/logs/` (round 1) and
`flow2-instruments/r2/` (round 2). All sit under `/home/user/scaffold/.orkestrel/veneer/units/`. The release's reboot is
`/home/user/veneer-flow2/node_modules/bootstrap/scss/_reboot.scss`; the compiled cascade is
`/home/user/veneer-flow2/dist/src/styles/index.css`. A unit report's prose is not a claim subject. A mutation counts as
a kill only when the failing case's message names an assertion failure (`AssertionError`, or the expect library's own
assertion message); read every other failure as no kill. Rule every claim.

1. **Release margins.** `_dl.scss` and `_pre.scss` write `margin-top: 0` and `margin-bottom: var(--vn-space-8)`;
   `_hr.scss` writes `margin: var(--vn-space-8) 0`, `color: inherit`, and `border: 0` inline; `_figure.scss` writes
   `margin: 0 0 var(--vn-space-8)`. At the default density each resolves to the value the release's reboot writes on
   the same tag, and no changed selector adds a tag context, `:not([class])`, or `:has()`.
2. **Density proofs.** The case titled `takes the release block margins at the default density and scales the
   block-end margin with the density factor` in `dl.test.ts`, `pre.test.ts`, and `figure.test.ts`, and the case titled
   `takes the release block margins at the default density and scales both block margins with the density factor` in
   `hr.test.ts`, each read the release margins at the default density and the doubled margins at density 2. Each tag's
   literal mutation (`1rem` for the token) and zero mutation kill its case, and each restore is byte-identical.
3. **Figure placement.** The case titled `ends the figure at its caption and starts the next block 16px after it`
   asserts a 108px figure box and a following paragraph 124px below the figure's top, which the probe log reads in the
   release's cascade at 390 and 1280 pixels; the zero-margin figure mutation kills it. The E-ID-LAYOUT quotation case
   keeps its assertions, and its reworded comment is true of the compiled cascade.
4. **Ledger rows.** In `guides/veneer.md`, the `reboot` rows for the `hr`, `dl`, `pre`, and `figure` margins read
   `tokenized` with the value the partial writes, or are struck where both sides write the same value; the additions
   rows `dl { margin }` and `pre { margin }` are struck; no other guide row changes.
5. **Calibration records.** The `TEXT_DL_CASES`, `TEXT_PRE_CASES`, and `TEXT_HR_CASES` margin readings in
   `tests/setupStyles.ts`, and the figure calibration in `figure.test.ts`, equal the compiled cascade's resolved values;
   the `FLOW_MARGIN` TSDoc is true of the release's `$paragraph-margin-bottom` and `$hr-margin-y` values and of the
   tags it names.
6. **Mixin retirement.** No `box-reset` remains under `src/`, `tests/`, `app/`, or `guides/`; `_fieldset.scss` writes
   `margin: 0` and `border: 0` where the include stood; the compiled `fieldset` rule's declarations equal the base's,
   in order; neither `_hr.scss` nor `_fieldset.scss` keeps a `@use` it no longer reads.
7. **Scope and law.** Every changed path is owned or shared in the round's brief; the diff adds no `any`, `as`,
   non-null assertion, suppression, nested function declaration, or hidden helper; every added case title states what
   the case proves.
