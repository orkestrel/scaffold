# Unit FADE (`cf`), round 2 — the tab pane and the modal, the registry remark, and the names

## Role and engine

`opus` on Opus 5.5, the same native subagent that wrote round 1, in the worktree `/home/user/veneer-cf`
(branch `unit/cf`, round 1's edits over `42fd88e`).

## What changed and why

Round 1's audit (`/home/user/scaffold/.orkestrel/veneer/units/cf-audit-verdict.md`) confirmed the rules,
their order, the mutations, and the ledger row. It found the component fade coverage short of the tab
pane and the modal, a `CASCADE_KEYS` remark the registry breaks, and one concept under two names. This
brief carries F-a to F-d; round 1's brief (`b-cross-cf-brief.md`) and the page-frame note stand for
everything this one does not change.

## Objective

- **F-a — every component the release fades.** Add a `nav` row (a tab pane carrying `fade` and `active`,
  and one carrying `fade`, `active`, and `show`) and a `modal` row (`modal fade` and `modal fade show`) to
  the `FADE_COMPONENT_CASES` table, read each through the case that fades each component, and bind each
  row's classes to its key's vocabulary as the table's other rows are bound. Add the clause to the § Nav
  sentence on tab panes: a pane carrying the `fade` class stays transparent until the `show` class joins
  it. Keep the Tests sentence, the case title, and the table's TSDoc true against the table.
- **F-b — the registry remark.** Scope the paragraph the unit adds to the `CASCADE_KEYS` TSDoc to the fade
  key's hidden state: its rule writes opacity alone and keeps its box, so its row names the card through
  a `:has()` selector and reads the card's `height` property. Name what separates it from the transparent
  moments the same block declines.
- **F-c — one term.** Rename `TRANSITION_COPY` and `TRANSITION_SPECIMENS` to `FADE_COPY` and
  `FADE_SPECIMENS` in every file that names them, and keep `transition` for the inventory key and its
  ledger rows.
- **F-d — the failing-first runs.** Re-run the fade proof and the section proof against the tree without
  the partial, with the shipped test files, and retain both logs.

## Context

Law, host, and tools as round 1's brief states. The evidence: the three lane verdicts beside the
reconciled verdict. F-a's added rows run red first against the tree without the partial, and each red run
is retained in `tmp/units/cf-mutations-2.log.txt`.

## Scope

As round 1: owned the four files round 1 owns; shared (report-only) the files `cf-shared.patch`
touches, and `guides/veneer.md` § Nav; the off-limits one-line patch `cf-offlimits.patch` stands
unchanged. Return one `cf-shared-2.patch` against `42fd88e` that supersedes `cf-shared.patch` whole.
Off-limits as round 1.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Output

The report `/home/user/veneer-cf/tmp/units/cf-report-2.md` and the same text as the final message: each
item's change, with before and after for every rewritten sentence and the rows added; the red runs;
each gate's command exactly as it ran, its exit, and its result line; `cf-2.diff`, `cf-2-status.txt`, and
`cf-shared-2.patch` under `tmp/units/`. The report states no tally of a growable set and no temporal
word, and follows every code token with a noun, list labels and path tokens included.

## Deviation contract

As round 1. Stop if a modal or tab-pane row needs a cascade change. Decide, record, and carry on for the
exact wording of each rewritten sentence.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, and `npm run check` exit 0 in a scratch copy under
   `tmp/probe/` with `cf-shared-2.patch` and `cf-offlimits.patch` applied.
2. The fade proof exits 0 and reddens without the partial, with the `nav` and `modal` rows among the
   failing readings; `npm run test:setup` exits 0 in the scratch copy.
3. `npm run test:conformance`, `npm run test:guides`, and the section, showcase, and index proofs exit 0
   in the scratch copy.

## Review evidence

`cf-2.diff`, `cf-2-status.txt`, `cf-shared-2.patch`, `cf-report-2.md`, and `cf-mutations-2.log.txt`.
