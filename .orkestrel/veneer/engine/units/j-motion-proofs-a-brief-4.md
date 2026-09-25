# Unit J-MOTION-PROOFS-A, round 4 — plant the ruling on responsive Offcanvas panels

Successor of `j-motion-proofs-a-brief-3.md`. Round 3 is committed as `5b98071`, with the guide integration `180d513`. The worktree is clean there.

## Why

Round 3's audit ruled `VERDICT: FAIL 5` (`units/j-motion-proofs-a-audit-3-verdict.md`; the objective verdict `units/j-motion-proofs-a-audit-3-objective-verdict.md`, claim 5).
- Your plant writes the ruled values for `.fade`, Modal, the backdrops, and a bare `.offcanvas`, but for no responsive panel.
- The responsive fixture in `tests/src/browser/Offcanvas.test.ts` (the case around line 1026) uses `.offcanvas-sm` without `.offcanvas`, so it keeps the shipped transition under the plant.
- The ruling's Offcanvas row covers the responsive range (`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md` § The ruling).
- The value probe the report names is not among the retained files.

## The obligation

- **P1.** `plant.py` also plants the ruled Offcanvas values on each responsive panel class the shipped `_offcanvas.scss` declares (`.offcanvas-sm` through `.offcanvas-xxl`), inside their breakpoint ranges.
- **P2.** The value probe becomes a file under `tmp/j-motion-proofs-a/`, run by `plant.sh`. It reads the planted duration, easing, and transform on a bare panel and on a responsive panel. Name the file.
- **P3.** Re-run `plant.sh` against the round-3 tip, and record the four files' readings and the probe's.

You change no source and no test file.

## Output

Your final message holds:
- the plant and probe changes;
- the readings, verbatim;
- `git status --short`, which must be clean of tracked changes;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
