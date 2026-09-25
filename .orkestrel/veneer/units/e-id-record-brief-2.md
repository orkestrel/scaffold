# Unit E-ID-RECORD round 2 — the audit's findings

Successor to `e-id-record-brief.md`, which stays in force for every section this brief does not restate. What changed:
the round-1 audit (`eir-audit-objective-verdict.md`, `eir-audit-subjective-verdict.md`, `eir-audit-checker-verdict.md`
beside this brief) held the hook, the toggle hiding, the records, and the scope, and found the items below.

## Role and engine

`builder` on Sonnet, a native Claude subagent, resumed in `/home/user/veneer-eir`, which holds round 1.

## Scope

As round 1, plus `tests/src/styles/components/button-group.test.ts` (the retune case only) and
`tests/src/styles/elements/tr.test.ts`.

## Execution

Perform the assignment directly and spawn nothing. Each item is specified; the unit is taste-free.

1. **Button group.** Apply the returned patch (the child's `border-left-width` reads `3`), and replace the comment
   above it with: "The children carry the Button family's own radius, so the retune leaves each child's corners where
   Button put them; their border width reads the retuned `--bs-border-width`, as the overlap does, so the pulled-back
   child still paints one shared line."
2. **Toggle.** In the keyboard toggle case in `button.test.ts`, after the input takes focus and before Space, assert
   `input.matches(':focus-visible')` and the label's focus ring, reading the same shadow the case reads after Space.
   Show the added assertion red under a mutation that removes `.btn-check:focus-visible + .btn` from its selector list
   in `_button.scss`, with a byte-identical restore.
3. **Table cells.** Add a `tr.test.ts` case: a scope setting `--bs-border-width: 3px` moves a table cell's bottom
   border to 3px; show it red under a mutation that restores `--vn-border-width` in `_tr.scss`.
4. **Guide.** At the `--bs-btn-border-width` row of the Button binding table, the value reads `var(--bs-border-width)`.
   The `--vn-state-stripe` token row's Source cell reads, verbatim: "`bootstrap` — retained `$table-striped-bg-factor`,
   kept below the table's 7.5% hover and 10% active overlays".
5. **Evidence.** Each mutation writes its log under `tmp/units/`, named `eir-2-mutation-<name>.log.txt`.
6. Run the owned files, then `npm run test:src:styles`, `npm run test:conformance`, `npm run test:guides`, and the
   three static gates, each logged as `tmp/units/eir-2-<gate>.log.txt`.

## Output

Write `tmp/units/eir-report-2.md` and return the same text: each change, the mutation table, the gate table with log
paths and the passing counts the logs show, `tmp/units/eir-2.diff` (`git diff ca83afb`), and
`tmp/units/eir-2-status.txt`. State no count in prose.

## Acceptance criteria

Every gate exits 0, with `test:src:styles` among them; each added assertion red under its named mutation.
