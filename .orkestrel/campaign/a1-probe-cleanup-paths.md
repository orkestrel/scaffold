# Orchestrator probe — A1 claims 5, 7, 9, 13: cleanup on adverse exits (2026-09-14, commit cef565d)

Instrument: `a1-probe-cleanup-paths.mjs.txt`, run against the built dist. The source stream logs
its `cancel` callback, the fixture parser logs `clear`, and the recorded combined signal is read
80 ms after the call to see whether the 30 ms deadline was left armed. Case I is the control
that the strict path reports through `ProviderError('PROTOCOL')` and still clears.

```text
F early result: deltas = ["first"] ; result = {"content":"AUTHORITATIVE","usage":{"prompt":1,"completion":2,"total":3}} ; log=[source.cancel(undefined), parser.clear] signalAbortedAfter80ms=false
G read throws: OTHER Error: hostile read ; log=[source.cancel(undefined), parser.clear] signalAbortedAfter80ms=false
H consumer return(): first = {"channel":"content","text":"first"} ; return done = true ; log=[source.cancel(undefined), parser.clear] signalAbortedAfter80ms=false
I strict without result: ProviderError code=PROTOCOL provider error: missing settled result ; log=[finish, parser.clear] signalAbortedAfter80ms=false
```

Held: an early `result` returns the authoritative object, cancels the remaining body, clears the
parser and the deadline (claim 9, 5); a throwing `read` propagates unchanged and still cancels and
clears (claim 7, 5); a consumer `return()` after the first delta cancels the source and clears
(claim 5, 13); `strict` without a result throws `PROTOCOL` after `finish` (claim 9).
