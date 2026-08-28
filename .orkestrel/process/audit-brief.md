# Audit round: the execution consolidation

## What landed

`src/server/execution/` and `src/server/Retention.ts` are gone. `execute`, `executeSync`, `detach`,
and a new `captureChunk` live in `src/server/helpers.ts`. `RetentionInterface` is gone from
`src/server/types.ts`. The three execution test suites and `Retention.test.ts` fold into
`tests/src/server/helpers.test.ts`. `guides/process.md` and `tests/guides.test.ts` follow.

The change also repairs a defect: `execute`'s bounded capture could end mid-UTF-8-sequence, because
`buildExecuteResult`'s `trimHead` returns early whenever the captured bytes total no more than
`limit`, so its code-point retreat never ran. The capture now reads one byte past `limit` to give
that trim its lookahead byte.

## Your job

Attempt to REFUTE each numbered claim. A claim you cannot break is CONFIRMED, with the evidence
that convinced you. A claim you break is BROKEN, with the exact input, state, or interleaving that
breaks it and the smallest correct fix. Do not confirm a claim you did not attack.

An all-confirmed round is a legitimate result. Do not manufacture a finding.

## The claims

1. **The capture is byte-equivalent to the class it replaced, except at the code-point boundary.**
   For every chunk sequence and every limit, the bytes `execute` captures are the same bytes
   `Retention` would have retained, except that the new form may drop a trailing partial
   code point the old form kept. Attack the boundaries: a limit of 0, a limit of 1, a chunk
   larger than the limit, a chunk arriving after the capture saturates, an empty chunk.
2. **`truncated` is unchanged for every input.** The old form reported `delivered > limit`. The new
   form reports `retained > limit` where retention saturates at `limit + 1`. Attack the claim that
   these agree — in particular at exactly `limit` bytes and exactly `limit + 1` bytes delivered.
3. **The captured text is still bounded by `limit`.** The capture reads `limit + 1` bytes. Show
   that no consumer can observe more than `limit` bytes in `ExecuteResult.stdout` or `stderr`.
4. **No behaviour of `executeSync` or `detach` changed.** They moved files and nothing else.
5. **`helpers.ts` imports no implementation class**, and the `src/server` import graph is acyclic.
6. **Nothing that was proven before is unproven now.** Every `it` that existed in
   `tests/src/server/execution/*.test.ts` and `tests/src/server/Retention.test.ts` still exists, or
   its subject is proven by a named replacement. Reconcile the counts against the recorded
   pre-change baseline: `test:src` was 9 files, 172 passed, 8 skipped.
7. **The new tests would fail for the defects they name.** In particular, the code-point-boundary
   test fails if the capture bound returns to `limit`.
8. **The published surface changed in exactly two ways**: `Retention` and `RetentionInterface` are
   gone, and `captureChunk` is added. Nothing else was added, removed, or re-shaped.
9. **The guide is true.** Every backticked API in `guides/process.md` resolves, every public export
   is documented, every fence's claimed values are what the code returns, and the Tests section
   names exactly the test files that exist.
10. **The change is complete.** No stub, no TODO, no skipped test added, no deferred work, and no
    file left naming a path that no longer exists.

## Evidence supplied

The Orchestrator supplies the full diff and `git status --porcelain` output with this brief. Read
the diff; do not reconstruct it. Read the real files for anything the diff does not show.

## Scope

Read-only. You own nothing and edit nothing. Perform this assignment directly and spawn nothing.

## Output

A verdict per claim, numbered to match, each CONFIRMED or BROKEN with its evidence. Then any
finding outside the numbered claims. Then one terminal line: `VERDICT: PASS` if every claim is
CONFIRMED and you found nothing outside them, otherwise `VERDICT: FAIL`.
