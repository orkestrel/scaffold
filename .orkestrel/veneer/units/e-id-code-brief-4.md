# Unit E-ID-CODE round 4 — `var` wears the chip corner, and the records say who wears it

Successor to `e-id-code-brief-3.md`; the earlier briefs stay in force for every section this brief does not restate.
What changed: the round-3 audit (`/home/user/scaffold/.orkestrel/veneer/units/eic-audit-3-verdict.md`) found the
`samp` corner reason and the `code-surface` comment overstate which tags wear the chip, and referred `var`, which
Veneer paints on the raised surface with square corners while Elements, the visual reference, gives it the chip corner
(`/home/user/elements/src/styles/elements/_var.scss`, `--set-var-border-radius: 0.25em`).

## Role and engine

`opus` on Opus 5.5, a native Claude subagent, in `/home/user/veneer-eic`, which holds rounds 1 to 3. Read
`tmp/units/eic-report-3.md` first.

## Findings this round carries

- **`var` wears the chip.** `src/styles/elements/_var.scss` paints `var` on `--vn-surface-raised` as inline code, with
  no corner. It takes the chip the `code`, `kbd`, and `samp` elements wear, through the `code-surface` mixin in
  `src/styles/_mixins.scss` where the mixin fits, with the radius `TEXT_SAMP_CASES` pins. Add the radius to
  `TEXT_VAR_CASES` in `tests/setupStyles.ts`, red before the change.
- **Claim 6, the subjective lane.** After `var` wears the chip, make each sentence true of the shipped cascade:
  - the `samp { border-radius }` addition row's Reason in `guides/veneer.md`, and a `var { border-radius }` row if the
    ledger needs one;
  - the `code-surface` comment in `src/styles/_mixins.scss`, which names the elements that wear the chip.
- **Claim 8, the objective lane.** The `code-surface` comment says "the one corner the family shares", which states a
  count. Rewrite it with the chip sentence the preceding item asks for, naming the elements that wear it.
- **Claim 7, the objective lane.** `ContentSection.test.ts` pins the `Linked code`, `Code block`, and `Key combination`
  specimens by name and markup, but no case reads their rendered treatment. Add a case that reads, in the rendered
  Content section, each specimen's own treatment: the linked code's color differs from the anchor's, the code in the
  block keeps the code surface and chip padding, and the inner keys keep the keycap border. Show it red under a
  mutation that re-adds one contextual rule (for example `a > code { color: inherit }`).
- **F1, the subjective lane.** Give the tenet citation one home. Restore the `pre code`, `a > code`, and `kbd kbd`
  Excluded rows' Reason cells in § Deferred selectors to their `ca83afb` text, and add one sentence to that section's
  lead that names the tenet by its `ROADMAP.md` title, "Give semantic tags useful defaults without inferring
  components", and covers every row that refuses a name for tag composition or adjacency.

## Scope

As rounds 1 to 3, plus `src/styles/elements/_var.scss` and `tests/src/styles/elements/var.test.ts` (owned), and
`TEXT_VAR_CASES` in `tests/setupStyles.ts` (shared). `tests/app/browser/sections/ContentSection.test.ts` stays owned.

## Execution

Perform the assignment directly and spawn nothing.

1. Apply the findings. Show the `var` corner case red before the change and red under a mutation that drops the
   corner; record each mutation's restore check in its log.
2. Re-run the owned files, then `npm run test:src:styles`, `npm run test:conformance`, and `npm run test:guides`, and
   the `ContentSection` command from round 3 (`npx vitest run --config vite.config.ts --no-cache --project app:browser
   tests/app/browser/sections/ContentSection.test.ts tests/app/browser/integration.test.ts`). Record each gate's exit code in its log (append `echo "exit=$?"`). A
   timing failure under load is an observation with its reading.

## Output

Write `tmp/units/eic-report-4.md` and return the same text: the changes, the failing-first and mutation tables, the
gate table with log paths, the shared-file hunks, `tmp/units/eic-4.diff` (`git diff ca83afb`), and
`tmp/units/eic-4-status.txt`. State no count.

## Deviation contract

§ Deviation protocol of `/home/user/scaffold/.agents/orchestration.md`. This unit settles the lead sentence's wording,
the row placement, and whether `var` includes the mixin or writes the radius itself. Stop and report if the mixin would
change `var`'s padding, font, or color.

## Acceptance criteria

The common criteria; `var` resolves the chip radius in both modes; every guide and comment sentence about the chip
names the elements that wear it; the tenet is cited once, in the § Deferred selectors lead, by its `ROADMAP.md` title; the Content specimen case is red
under its named mutation.
