# Unit FORMS-FRAMES (`fr`), brief 2 — round 2: the audit's findings and the remaining critic states

## Role and engine

`opus` on Opus 5.5, the native subagent that ran round 1, resumed in the worktree `/home/user/veneer-fr`
(branch `unit/fr` from `e4a6d7c`, round 1's changes uncommitted in place). `b-forms-frames-brief.md` stands for
everything this brief does not change: the host, the law, the tools and limits, the standing conditions, and
the capture pattern.

## What changed and why

Round 1's audit (`/home/user/scaffold/.orkestrel/veneer/units/fr-audit-verdict.md`, with the three lane verdicts
beside it) confirmed P10, the driven and pressed states, the recorded limits, and the frames, and ruled claims 5,
7, and 9 broken. This round carries every finding the verdict gives FORMS-FRAMES, and the critic's remaining form
states, because the brief's objective is every developer-written form state and the critic's `unframed` list in
`pv-forms-lenses.json` is that population.

## The work, implementation first

1. **The resting keys (claim 5).** Key the `form-control-plaintext-small` and `-large` rows on a property the
   sized plaintext writes and the base does not (`min-height`, per `_form-control.scss`). Give the
   `ValidationSection.test.ts` proof a keyed expectation for every rendered specimen (name, tag, and class, the way
   `FormControlSection.test.ts` keys its specimens), with the expectation data in a setup file, and retain a
   negative control: an added validation row without its expectation reddens the proof.
2. **The specimens.** Render the validated check hosts inside a `.form-check` wrapper, as the release's
   validation markup and this unit's own inline rows do, so the ring clears the label. Keep the grouped floating
   specimen resting and correct the three texts that call its label floated (the patch, the table TSDoc, and the
   section comment).
3. **The remaining critic states.** Give each a specimen row or a driven case with its frames, by the round-1
   pattern: the grouped `.form-floating` `:focus-within` lift and its squared end corners; the pressed radio;
   `.form-control-plaintext:focus`; `.form-floating > .form-control-plaintext:focus`; a focused disabled range; the
   grouped select's focus lift; the sized group's select end padding; `.btn-toolbar .input-group`; and a validated
   `[multiple]` select. Record any state the installed drivers cannot reach, with its reading.
4. **The proofs (claims 7 and 9).** Move the validation class matrix out of `ValidationSection.test.ts` and the
   gauge selector population out of `form-range.test.ts` into setup constants, or derive them from a table that
   owns them. Retain a hairline-only P10 mutation run, and run the journey without a name filter under the
   validated-select mutation and under the pressed-check mutation, retaining each log and naming every case that
   reddens.
5. **The prose (F3).** Write "lifted specimen" where the patch says "lifted copy", "reads the button part's
   computed surface" where it says the frame is read, and drop "resting" from the pressed case's title and the
   patch sentence that sets it against "held".

## Report

A successor report, `/home/user/veneer-fr/tmp/units/fr-report-2.md`, and the same text as the final message, in
brief 1's output shape: each finding with the change that closes it and its proof or reading; each added state
with its specimen or scenario, frames, and proof; each gate's command exactly as it ran with every argument, its
exit, and its result line as the log prints it; `fr-mutations-2.log.txt`; `fr-shared-2.patch` superseding
`fr-shared.patch` whole; `fr-2.diff` (round 1 and round 2 together, against `e4a6d7c`) and `fr-2-status.txt`. The
report states which mutation reddens which cases, names every case that reddens, and states no tally of a growable
set and no temporal word.

## Scope

As brief 1, with `tests/setupStyles.ts` owned for the forms case tables (the verdict's scope ruling). The
`declared` lines in FOCUS-FRAME's validation-ring and floating-focus cases may be narrowed again where an added
specimen would enter those loops; keep each such edit to the filter line and its comment.

## Execution

A native subagent: perform the assignment directly and spawn nothing.

## Acceptance criteria

Brief 1's criteria over the round-2 tree, plus: the validation proof reddens on its added-row negative control;
the plaintext keys distinguish each size from its base; the unfiltered journey runs under the two named
mutations are retained.
