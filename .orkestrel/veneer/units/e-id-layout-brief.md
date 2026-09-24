# Unit E-ID-LAYOUT — description lists, quotations, and figures follow the house rule

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-eil` (branch `unit/eil`, cut from Veneer `main`
`ca83afb`). Read `/home/user/scaffold/.orkestrel/veneer/units/e-id-common.md` first; it binds.

## Objective

Bootstrap's class-built description lists and quotations lay out as Bootstrap lays them out, and bare `dl` and
`blockquote` keep Veneer's look, per the verdict's `dl` and `blockquote` rows.

## Unknowns

The selector that keeps the `figure` column layout off Bootstrap's attributed quotation in a bare `figure`: settle it
with the probe and record the reading. The test viewport's width: read `innerWidth` first and report it.

## Scope

**Owned.** `src/styles/elements/_dl.scss`, `_blockquote.scss`, `_figure.scss`; `tests/src/styles/elements/dl.test.ts`,
`blockquote.test.ts`, `figure.test.ts`; `tests/src/styles/components/quote.test.ts`; new files under `tmp/units/`.
**Shared** per the common terms, including the Horizontal description list and quotation specimens in
`app/browser/constants.ts`.

## Execution

Perform the assignment directly and spawn nothing.

1. `dl`: scope the grid to `dl:not([class])`, pair `dt` and `dd` to their columns with `grid-column`, drop `row-gap`,
   restore the `dd` bottom margin through the space scale and its zero left margin. Proof: Bootstrap's
   `<div class="container"><dl class="row">` with `.col-sm-3` and `.col-sm-9` pairs at a width of at least 576
   pixels, reading each `dd` top equal to its `dt` top, each `dd` left at its `dt` right within 1px, and the term
   step equal to the `dd` height plus the margin; red under the unscoped grid and gap, and under a zero `dd` margin.
   Add the multi-term bare list (`<dl><dt>A</dt><dt>B</dt><dd>Shared</dd><dt>C</dt><dd>One</dd><dd>Two</dd></dl>`):
   every `dt` in the term column and every `dd` in the description column.
2. `blockquote`: scope the bar, inset, and italics to `blockquote:not([class])`; `quote.test.ts` asserts `.blockquote`
   reads a 0px left border, a 0px left padding, and normal style.
3. `figure`: keep its column layout off `<figure><blockquote class="blockquote">…</blockquote><figcaption
   class="blockquote-footer">…</figcaption></figure>`, bare and with `.text-center` or `.text-end`; the proof reads
   the footer's top equal to the quotation's bottom, as Bootstrap's does.
4. Re-run `/home/user/scaffold/.orkestrel/veneer/units/e-identity-instruments/dl-row-probe.mjs` and the quotation
   fixtures of `breakage-probe.mjs` against the rebuilt cascade (copy them to `tmp/units/` and point them at this
   worktree), and report each reading beside Bootstrap's.
5. Record `dl:not([class])`, `blockquote:not([class])`, and the `figure` selector as selector additions, and update
   the `dl`, `dd`, `blockquote`, and `figure` rows in `guides/veneer.md`.

## Deviation contract

Common terms. You settle the `figure` selector and the specimens' wording yourself.

## Acceptance criteria

The common criteria, and: the horizontal description list, the multi-term list, and the attributed quotation read as
Bootstrap's; the bare `dl` and bare `blockquote` pins hold except where the ruling moves a value.

## Review evidence

The Orchestrator supplies the diff, the status, the report, the probe logs, and the mutation logs to the audit.
