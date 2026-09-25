# Unit E-ID-LAYOUT round 3 — tag-only defaults, with the classes carrying Bootstrap's layout

Successor to `e-id-layout-brief-2.md`; the earlier briefs stay in force for every section this brief does not restate.
What changed: `/home/user/scaffold/.orkestrel/veneer/e-identity-design-verdict.md` § Addendum 2 realigns the design on
the tenets. `dl:not([class])`, `blockquote:not([class])`, and `figure:not(:has(> .blockquote))` go: a default stays on
the tag whatever class it carries, and Bootstrap's classes write the layout Bootstrap's pattern needs.

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-eil`, which holds rounds 1 and 2. Read
`tmp/units/eil-report.md` and `tmp/units/eil-report-2.md` first.

## Objective

Bootstrap's horizontal description list, class-built quotation, attributed quotation, and `.figure` pattern lay out as
Bootstrap's, while a bare or utility-classed `dl`, `blockquote`, and `figure` keep Veneer's look.

## Unknowns

Whether `.figure-caption` or `.figure-img` needs a declaration once `figcaption` carries a top margin; settle it with
Bootstrap's `.figure` markup in both cascades and report the reading.

## Scope

As rounds 1 and 2, plus `src/styles/components/_quote.scss` and the `.figure` component partial if one exists (search
`src/styles/components/` for `.figure`), with their tests.

## Execution

Perform the assignment directly and spawn nothing.

1. `dl`: the grid moves back to `dl`, with no `gap`; `dt` carries the column spacing as `padding-right`; keep the
   `grid-column` pairing, the `dd` margins, the term weight, and the muted color. Add a proof that `<dl class="mb-0">`
   keeps the grid; show it red under a `dl:not([class])` mutation. Re-show the horizontal description list proof red
   under a restored `gap`.
2. `blockquote`: the bar, the inset, and the italics move back to `blockquote`; `.blockquote` writes `padding-left: 0`,
   `border-left: 0`, and `font-style: normal`, recorded as additions. Add a proof that `<blockquote class="mb-0">`
   keeps the bar; keep the `.blockquote` proof, red when its resets are removed.
3. `figure`: drop `gap` and the `:has()` selector; `figcaption` takes `margin-top: var(--vn-space-4)`. The attributed
   quotation proofs (bare, `.text-center`, `.text-end`) stay green; add a captioned-image proof reading the 8px space
   between the image and its caption, and a proof that Bootstrap's `.figure` markup lays out as Bootstrap's.
4. Update the guide's addition and departure rows to the shipped cascade; the conformance ledger passes.
5. Re-run the owned files, then `npm run test:src:styles`, `npm run test:conformance`, `npm run test:guides`, and the
   Type section command from round 2. A timing failure under load is an observation with its reading.

## Output

Write `tmp/units/eil-report-3.md` and return the same text: the changes, the failing-first and mutation tables, the
probe readings against Bootstrap's, the gate table with log paths, the shared-file hunks, `tmp/units/eil-3.diff`
(`git diff ca83afb`), and `tmp/units/eil-3-status.txt`. State no count.

## Acceptance criteria

The common criteria; no selector in the owned partials reads a tag's context or the presence of a class; each added
proof red under its named mutation.
