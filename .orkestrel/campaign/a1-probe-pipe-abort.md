# Orchestrator probe — the A1-fix deviation: `pipeThrough` cancellation under abort (2026-09-14, Node 24.20)

Instruments: `a1-probe-pipe-abort.mjs.txt` and `a1-probe-pipe-abort-2.mjs.txt`, run from the
scratchpad with no project code: a source whose `pull` never resolves after its chunks, piped
through `new TransformStream()` with a signal, consumed by a reader. Controls: F (reader cancel
with no abort) and D (a direct reader cancel during a pending source read) both reach the source's
`cancel`.

```text
A abort signal with unread chunk queued: source.cancel(AbortError)
B reader cancel, no abort: source.cancel(undefined)
C abort signal, nothing queued: source.cancel(AbortError), read rejected(AbortError), cancel rejected(AbortError)
D direct reader cancel during pending read: source.cancel(Error) ; pending settled done=true
E abort then reader.cancel, no read: after abort, before cancel: [], cancel resolved
F reader.cancel with a pending write, no abort: source.cancel(undefined)
G for-await consumer throws after abort: loop threw(consumer throws after abort)
```

Reading: when the signal aborts while the pipe's write is pending on the transform's backpressure
(the consumer has not pulled the next chunk), neither the abort nor a subsequent reader cancel
reaches the source (E, G). The engine's `stream` is exactly shape G — it throws out of the
`for await` after the abort — so an aborted call whose response body had a chunk in flight leaks
its HTTP body. The fix unit's failing interleaved test measured this; its hypothesis was correct.

Ruling for the successor fix: the engine stops relying on `pipeThrough` for cancellation. The
readers take the combined signal and cancel their own reader with the signal's reason on abort
(shape D), and the engine checks the signal after the read loop so `finish` never folds after a
cancel. The transform pipe is removed from both the success path and the error path.
