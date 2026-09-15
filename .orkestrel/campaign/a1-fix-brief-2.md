# Unit A1-fix (successor) — repair the findings of audit round A1-R1

This brief supersedes `tmp/units/a1-fix-brief.md` after its first run stopped on a deviation.
Apply every section of that file exactly as written, except the sections restated here, which
replace their originals. Read that file, its report `tmp/units/a1-fix-report.md`, and this one, in
that order, and build on the tree as it stands — F1, F2, F3, F4, F6b, F6d, and F6e are landed and
green; do not redo them.

## What changed and why

The first run's F5 test `isolates distinct interleaved bodies while one splitter holds a cancelled
prefix` failed on `expect(left.cancelled).toBe(true)`, and the writer stopped correctly. The
Orchestrator reproduced the cause in isolation
(`../scaffold/.orkestrel/campaign/a1-probe-pipe-abort.md`, read it): in Node 24, once a
`pipeThrough(new TransformStream(), { signal })` pipe has a write pending on the transform's
backpressure — the consumer has not pulled the next chunk — and the signal aborts, neither the
abort nor the consumer's later `reader.cancel()` reaches the source's `cancel`. The engine's
`stream` throws out of its `for await` exactly there, so an aborted call whose body had a chunk in
flight leaks its HTTP body. A direct reader cancel during a pending source read does reach the
source (probe case D). The Orchestrator rules:

**F7 — cancellation is owned by the readers, not by a pipe.** Give `readChunks` and `readText` an
optional trailing `signal?: AbortSignal`. When present, an `abort` listener (registered with
`{ once: true }` and removed in `finally`) calls `reader.cancel(signal.reason)`, so a pending
`reader.read()` resolves `done` and the source's `cancel` runs; an already-aborted signal cancels
before the first read. Remove the `pipeThrough(new TransformStream(...), { signal })` from both
the success path and the non-OK path in `AgentProvider.ts`, pass the combined signal to both
readers instead, and add `combined.throwIfAborted()` immediately after the `for await` loop so
`finish` never folds after a cancel, and `signal.throwIfAborted()` after the non-OK `readText` so
a cancelled error read surfaces as the abort, not as an HTTP error with a truncated excerpt. Every
existing pin must keep holding: the mid-body cancel, the early `return()`, the stalled 503, the
deadline clearing, and probe cases A–I in the three Orchestrator probe records.
Tests, failing first: the interleaved test above; `readChunks(body, signal)` cancels the source when
the signal aborts during a pending read and yields nothing further; `readText(body, limit, signal)`
does the same and returns the prefix decoded so far; both remove their listener on every exit.
(Owned for this item: `src/core/helpers.ts` and `tests/src/core/helpers.test.ts`, added to the
first brief's Owned list.)

**F8 — no patched globals in the fixtures.** The first run added a `RecordedSignals` fixture that
replaces `AbortSignal.any` on the global. `../scaffold/.claude/rules/tests.md` forbids module
replacement and framework spies for integrated behaviour, and a patched platform global reaches
every test in the worker. Delete `RecordedSignals`. Observe the combined signal through the
transport that receives it (`RecordedTransport` already sees `init.signal`, which is the combined
signal), and assert listener absence there. If some case cannot be observed that way, stop and
report it rather than restoring the patch.

**F6a and F6c — finish them.** The first run left `ProviderError`'s `@remarks` and member docs
(F6a) and the `AgentProvider` subclass `@example` (F6c) unwritten. Write them as the first brief
specifies.

## Output (replaces the original path)

Write the report to `tmp/units/a1-fix-report-2.md` and return the same text as your final message;
leave `tmp/units/a1-fix-report.md` untouched. Its `Red then green` section carries F7 and F8's
records beside the first run's, and its `Scoped validation` ends with `npm.cmd run test:src:core`
and `npm.cmd run test:setup` fully green.

## Acceptance criteria (added to the original list)

10. F7: `grep -n "pipeThrough" src/core/AgentProvider.ts` returns nothing; the interleaved test and
    the two reader tests were red before and are green after; `npm.cmd run test:src:core` exits 0.
11. F8: `grep -rn "RecordedSignals\|AbortSignal.any =" tests` returns nothing.
12. F6a and F6c: `ProviderError` carries `@remarks` and documented `code` and `status` members;
    the `AgentProvider` `@example` declares a subclass.
