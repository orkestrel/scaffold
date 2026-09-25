# Unit E-ID-LAYOUT round 4 — the figure in block flow, and one title

Successor to `e-id-layout-brief-3.md`; the earlier briefs stay in force for every section this brief does not restate.
What changed: `/home/user/scaffold/.orkestrel/veneer/e-identity-design-verdict.md` § Addendum 3 returns `figure` to
block flow, on the round-3 audit (`/home/user/scaffold/.orkestrel/veneer/units/eil-audit-3-verdict.md`).

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-eil`, which holds rounds 1 to 3. Read
`tmp/units/eil-report-3.md` first.

## Findings this round carries

- **Claim 3, the subjective lane.** Under Bootstrap's attributed quotation
  (`<figure><blockquote class="blockquote"><p>…</p></blockquote><figcaption class="blockquote-footer">…</figcaption></figure>`),
  the flex `figure` encloses the footer's 1rem end margin: the figure box reads 63.14px against Bootstrap's 51px at 390
  and 1280 pixels (`tmp/units/eil-3-probe.log.txt`). Addendum 3 rules the fix: `figure` drops `display: flex` and
  `flex-direction: column`; `figcaption` keeps `margin-top: var(--vn-space-4)`.
- **Claim 7, the subjective lane.** `tests/src/styles/components/image.test.ts`, the case titled "lays the figure class
  pattern out as the release does", names its reference rather than what it proves. Retitle it verbatim:
  `shrinks the figure to its content and spaces the caption 8px under the image`.
- **CASE-MATRICES, the objective lane.** `tests/src/styles/elements/figure.test.ts` declares its case matrices inline
  (the attributed quotation holders and the captioned image holders). Move the case data into `tests/setupStyles.ts` as
  exported constants with TSDoc, list them in the `tests/setupStyles.test.ts` export inventory, and keep registration
  and assertions in the test file (`.claude/rules/tests.md`: data tables belong in a setup file).
- **The `.figure` width.** The `.figure` pattern reads 148.44px wide against Bootstrap's 169.64px because the inline-block
  shrinks to Veneer's smaller caption type. That is a typography departure the caption treatment records; state it in
  the report's probe table, and change nothing for it.
- **Probe cells the round-3 probe left out:** `dl.row` at 390, and the `.text-center` and `.text-end` attributed
  quotations at 1280.

## Unknowns

Which proofs assume the flex figure (the calibrated `figure` case, the attributed quotation cases, the bare captioned
image, `TEXT_*` rows, the Type section). Derive the set by running the suites after the change, and report each red with
its fix.

## Scope

As rounds 1 to 3, plus `tests/setupStyles.test.ts` (shared, the export inventory). The guide's `figure { display }` and `figure { flex-direction }` addition rows go if the release
writes neither.

## Execution

Perform the assignment directly and spawn nothing.

1. Apply the figure ruling and the retitle.
2. Add a proof that the attributed quotation's figure box and the following `p` sit where Bootstrap's cascade places
   them (the figure's height and the `p` top, read from a fixed-geometry fixture); show it red under a restored
   `display: flex` on `figure`. Keep the bare captioned image's 8px caption space green.
3. Re-run the probe over every fixture at 390 and 1280 pixels, including the cells the round-3 probe left out.
4. Re-run the owned files, then `npm run test:src:styles`, `npm run test:conformance`, `npm run test:guides`, and the
   Type section command from round 2 without `tests/app/browser/integration.test.ts`, which the `app:browser` project
   excludes; the landing chain runs it through the journey projects. Record each gate's exit code in its log (append `echo "exit=$?"`), and record
   each mutation's restore check in its log. A timing failure under load is an observation with its reading.

## Output

Write `tmp/units/eil-report-4.md` and return the same text: the changes, the failing-first and mutation tables, the
probe readings against Bootstrap's for every cell, the gate table with log paths, the shared-file hunks,
`tmp/units/eil-4.diff` (`git diff ca83afb`), and `tmp/units/eil-4-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles the proof fixture and the
guide wording itself. Stop and report if block flow moves the bare captioned image's caption space off 8px.

## Acceptance criteria

The common criteria; no selector in the owned partials reads a tag's context or the presence of a class; the
attributed quotation's figure box and following content match Bootstrap's at 390 and 1280 pixels; the added proof is
red under a restored flex figure; the retitled case carries the verbatim title.
