# Unit E-ID-FLOW round 2 — the density titles, the address run, and the nested-list record

Successor to `e-id-flow-brief.md`; that brief stays in force for every section this one does not restate. What changed:
the round-1 audit (`/home/user/scaffold/.orkestrel/veneer/units/flow-audit-verdict.md`).

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-flow`, which holds round 1. Read
`tmp/units/flow-report.md` first.

## Findings this round carries

- **F1.** Each density case's title (`p`, `address`, `ol`, `ul`, the headings, and the `$twin` class in
  `tests/src/styles/components/type.test.ts`) says the tag takes the release margins "at the default and a doubled
  density", while the case asserts the doubled margin at density 2. Retitle each to state both halves, in the form
  `takes the release block margins at the default density and scales the block-end margin with the density factor`,
  adding `on every level` for the heading case and `on the $twin class` for the type case.
- **F2.** Run the `_address.scss` mutation `var(--vn-space-8)` → `1rem` and retain its log with the restore check; the
  `address` density case must read red.
- **F3.** The guide's Excluded rows for `ol ol`, `ul ul`, `ol ul`, and `ul ol` state only "Nested list treatment infers
  styling from tag composition". Extend each Reason cell with this text, verbatim after the existing clause: ", so an
  inner list keeps the list's `1rem` bottom margin where the release writes `0`; the `.mb-0` class removes it." Add a
  case in `tests/src/styles/elements/ul.test.ts` that reads an inner `ul` inside an `li` of a `ul` at 16px and an inner
  `ul.mb-0` at 0px; show the first reading red under a mutation that adds `ul ul { margin-bottom: 0 }` inside the
  `elements` layer.

## Scope

As round 1.

## Execution

Perform the assignment directly and spawn nothing.

1. Apply the findings; record each mutation's restore check in its log.
2. Re-run the owned files, then `npm run test:src:styles`, `npm run test:conformance`, and `npm run test:guides`.
   Record each gate's exit code in its log (append `echo "exit=$?"`). A timing failure under load is an observation
   with its reading.

## Output

Write `tmp/units/flow-report-2.md` and return the same text: the changes, the mutation table, the gate table with log
paths, the shared-file hunks, `tmp/units/flow-2.diff` (`git diff 6882751`), and `tmp/units/flow-2-status.txt`. State
no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles the nested-list fixture
itself.

## Acceptance criteria

The common criteria; each density title states both halves; the `address` literal mutation reads red; the four Excluded
rows carry the verbatim clause; the nested-list case is red under its named mutation.
