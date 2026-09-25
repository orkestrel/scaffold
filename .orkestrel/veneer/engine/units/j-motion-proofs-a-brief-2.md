# Unit J-MOTION-PROOFS-A, round 2 — one shared duration reader

Successor of `j-motion-proofs-a-brief.md`, whose sections stand except where this brief replaces them.
- Round 1 is committed as `88036ca` on `unit/motion-proofs-a`.
- The Orchestrator integrated your guide patch as `8e3e222`.
- The worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/motion-proofs-a` is clean there.

## Why

Round 1 reads a declared transition duration inline at three sites:
- the Modal order case's `shipped` reading;
- the Offcanvas order case's `shipped` reading;
- the Alert factor case's `released` and `scaled` readings.

`AGENTS.md` requires repeated behaviour routed through one shared implementation. Your returned patch `tmp/j-motion-proofs-a/setupBrowser.ts.patch` adds that implementation, `readDuration`. `tests/setupBrowser.ts` was off-limits in round 1, so the sites could not switch.

## The obligation

- **D1.** Apply your `setupBrowser.ts.patch` and `setupBrowser.test.ts.patch`: the `readDuration` export and its proof. Those two patches are all you change in either file.
- **D2.** Switch the three sites to `readDuration`, and remove each inline reading. No other file keeps its own copy of the reading.
- **D3.** Re-run the four owned test files, `npm run test:setup:browser` (the project that runs `tests/setupBrowser.test.ts`), and your round-1 mutation instrument. Every row must still read as round 1 recorded it.

## Scope

**Owned:**
- round 1's owned files;
- `tests/setupBrowser.ts` and `tests/setupBrowser.test.ts`, for the `readDuration` hunk alone.

These two files are shared. The styles session's E-ID-MOTION-FADE adds `sampleTransition` to the same module (D50), and J-SAMEWAY-ENGINES-B adds door tables. Each landing merges by hunk. Touch nothing else in them.

## Output

Your final message holds:
- the files touched;
- the `readDuration` signature and its proof's red reading, from its control mutation;
- the three switched sites;
- the mutation readings;
- the acceptance output verbatim: `npm run check`, `npm run lint:check`, `npm run format:check`, the four owned files, and `npm run test:setup:browser`;
- `git status --short`;
- the deviation state.

Perform the assignment directly and spawn nothing. Commit nothing. Write each program to a file and run it. Use no heredoc, no `python -`, and no `node -e`.
