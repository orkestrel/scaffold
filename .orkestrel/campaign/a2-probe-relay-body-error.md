# Orchestrator probe — A2 relay handler against a body that errors mid-read (2026-09-14, commit c50aee6)

Instrument: `a2-probe-relay-body-error.mjs.txt`, run against the built dist at `c50aee6` with a
scripted `ProviderInterface` and a line-per-record fixture parser (agent declares no NDJSON
dependency). Controls: B (a valid request through `createRelayProvider` in process returns the
scripted deltas and the full result), C (a wrong bearer surfaces as `ProviderError` `HTTP` 401),
D (a function-valued `arguments` is refused as `PROTOCOL` before any fetch).

```text
A body errors mid-read: HANDLER REJECTED client dropped
B in-process hop: deltas ["hel","lo"] result {"content":"hello","thinking":"why","tools":[{"id":"t1","name":"lookup","arguments":{"q":1}}],"usage":{"prompt":1,"completion":2,"total":3}}
C wrong bearer: ProviderError HTTP 401
D non-JSON arguments: ProviderError PROTOCOL ; fetched = 0
```

Ruling input: finding outside the claims, substantiated. `createRelay` awaits `readText` on the
request body without a boundary, so a body that errors mid-read (a dropped client, a proxy reset)
rejects the handler's promise instead of answering a response; on `@orkestrel/server` that is a
thrown handler, which the server reports as its own failure. Bound of the fix: a read failure on
the request body answers `400` (the body could not be read) with no provider call, proven with a
body that errors after a prefix; an abort of the inbound signal during the read still surfaces as
the request's own cancellation, not as `400`.
