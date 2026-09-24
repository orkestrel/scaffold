# Unit FORMS-FRAMES (`fr`), brief 3 — round 3: the round-2 audit's findings

## Role and engine

`opus` on Opus 5.5, the native subagent that ran rounds 1 and 2, resumed in the worktree `/home/user/veneer-fr`
(branch `unit/fr` from `e4a6d7c`, rounds 1 and 2 uncommitted in place). `b-forms-frames-brief.md` and
`b-forms-frames-brief-2.md` stand for everything this brief does not change.

## What changed and why

Round 2's audit (`/home/user/scaffold/.orkestrel/veneer/units/fr-audit-2-verdict.md`, with the three lane verdicts
beside it) confirmed scope, the resting keys, the named mutations, and the frames' geometry, and ruled claims 4, 6,
and 7 broken and claim 5 unresolved. This round carries those claims and F1, R1, and R3. It adds no state and no
frame.

## The work, implementation first

1. **The section proof's mutations (claim 5).** Run `tests/app/browser/sections/InputGroupSection.test.ts` under each
   mutation its toolbar-and-corners case names, one at a time in a scratch copy, and retain each log: the grouped
   corner squaring removed; the `.input-group-lg` and `.input-group-sm` select end room removed; the
   `.btn-toolbar .input-group` width restored to 100%. Name the case each mutation reddens. Where one stays green,
   strengthen the assertion until it reddens, and retain that run.
2. **The validation table's type (R3).** Write the `VALIDATION_HOST_CASES` rows so the compiler checks each field
   against `ValidationHostCase`: object rows, or a tuple list typed with the row's field types, with no `String()`
   coercion. Its proof stays green.
3. **The sized plaintext names (claim 4).** Rename the sized plaintext specimens `Small reader email` and
   `Large reader email`, matching the base `Reader email`.
4. **The empty-plaintext focus (claim 6).** Keep the frame and the case's reading. In the guide patch and the
   `FORM_FLOATING_SPECIMENS` TSDoc, say that focus moves the empty control's content box to the floated inset and
   paints nothing that shows the move; describe no text moving.
5. **The toolbar prose (F1).** Say the group takes its content's width rather than the toolbar's, and shares the
   button group's row where the row has room, in the TSDoc, the case title, and the case comment.
6. **The remarks tag (R1).** Put the `@remarks` tag the unit reflowed back on its own line, as every other tag in
   `app/browser/constants.ts` sits.
7. **The report (claim 7).** Retain command-bearing evidence for the `light-1280` capture reading (re-run it filtered
   to this unit's cases with the command written at the log's head), and replace "one size list" with "the shared
   size list".

## Testing

Run scoped tests only: `InputGroupSection.test.ts`, `ValidationSection.test.ts`, `FormControlSection.test.ts`,
`tests/setupStyles.test.ts`, and the journey filtered with `-t` to this unit's cases. The unfiltered capture variants
are the Orchestrator's at landing.

## Report

A successor report, `/home/user/veneer-fr/tmp/units/fr-report-3.md`, and the same text as the final message, in brief
1's output shape over round 3: each finding with the change that closes it and its proof or reading; each gate's
command exactly as it ran with every argument, its exit, and its result line as the log prints it, every gate log
opening with its command; `fr-mutations-3.log.txt`; `fr-shared-3.patch` superseding `fr-shared-2.patch` whole;
`fr-3.diff` (all rounds against `e4a6d7c`) and `fr-3-status.txt`. It names every case each mutation reddens, and
states no tally of a growable set and no temporal word.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Deviation contract

Stop and report per `/home/user/scaffold/.agents/orchestration.md` § Deviation protocol when a fix needs an off-limits
file. Decide, record, and carry on for wording, where a sentence sits, and the row form of the validation table.

## Acceptance criteria

1. The formatter check over the owned files, `npm run lint:check`, and `npm run check` exit 0.
2. Each named section mutation has a retained red run, and the section proof exits 0 on the round-3 tree.
3. A misplaced column in a `VALIDATION_HOST_CASES` row fails `npm run check` (retain the planted run and remove the
   plant).
4. `npm run test:guides` exits 0 in a scratch copy with `fr-shared-3.patch` applied.
