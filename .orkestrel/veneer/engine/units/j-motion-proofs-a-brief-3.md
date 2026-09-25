# Unit J-MOTION-PROOFS-A, round 3 — settle the live dialog, and read every moved element at each completion

Successor of `j-motion-proofs-a-brief-2.md`, whose sections, and round 1's, stand except where this brief replaces them.
- Round 2 is committed as `beb7cd8` on `unit/motion-proofs-a`.
- The worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-a` is clean there.

## Why

The audit ruled `VERDICT: FAIL 2, 3` (`units/j-motion-proofs-a-audit-verdict.md`). Read it, and the objective lane's verdict it names.

## The obligations

- **M1: the live dialog.** `Modal`'s `#settle` reads the dialog at each settle, through the modal's dialog selector, not the reference taken at construction. Add a red-first case: construct the modal over a host that has no dialog, insert a `.modal-dialog`, then show and hide. `shown` and `hidden` must follow the inserted dialog's transition. Record the red reading on `beb7cd8`'s `Modal.ts`.
- **M2: the backdrop at hide.** The Modal hide proof and the order proof keep a reading of the backdrop's hide animation, and read it finished at `hidden`. Add a mutation row that stops awaiting the backdrop's hide, and record its red reading.
- **M3: Alert at `closed`.** The Alert fade and factor proofs read the moved element's animations at `closed`, and read none running.
- **M4: the Backdrop replacement-token case** loads a transition for the replacing classes, with a comment naming it the consumer's own rule. It still reads each call's wait. Add a mutation row that waits only when the literal `fade` class is present, and record its red reading.
- **M5: the plant.** Re-run your plant (`plant.sh` with `plant.py`) against the round-3 tip, and record the four files' readings.
- Re-run the whole instrument, with the new rows added. Every row must kill by an assertion.

## Scope

As round 2. `src/browser/Modal.ts` is owned for M1.

## Output

Your final message holds:
- the files touched;
- the M1 change, with its red and green readings;
- the new mutation rows' readings;
- the plant run's readings;
- the acceptance output verbatim: `npm run check`, `npm run lint:check`, `npm run format:check`, and the four owned files;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
