# Orchestrator probe — the objective lane's named vectors for A1 claims 3, 4, 15 (2026-09-14, commit cef565d)

Instrument: `a1-probe-analyst-vectors.mjs.txt`, run against the built dist. Controls: case 4 (a
remote `ProviderAbortError` thrown by `read` must pass through with its own partial and still
cancel and clear) and the throwing-proxy and revoked-proxy `isMessage` cases (must be `false`).

```text
3b abort reason is a ProviderAbortError: ProviderAbortError partial={"content":"foreign"} ; expected partial content "answer"
3c stalled 503 body under deadline: STILL PENDING after 400ms no error after 404ms; log=[]
4 remote abort from read: ProviderAbortError partial={"content":"remote partial"} ; log=[source.cancel, parser.clear] signalAbortedAfter80ms=false
15 isMessage hostile images.every: true ; expected false
15 isMessage hostile calls.every: true ; expected false
15 isMessage throwing proxy: false ; expected false
15 isMessage revoked proxy: false ; expected false
```

Ruling input:

- Claim 3 BROKEN (with case B of `a1-probe-abort-identity.md`): the catch's identity test and its
  `instanceof` exclusion together mis-handle a foreign `AbortError` rejection and a caller whose
  abort reason is a `ProviderAbortError`. Bound of the fix: when the combined signal is aborted,
  the local cancel wins — throw `ProviderAbortError` with the locally accumulated partial whatever
  object was thrown; when it is not aborted, propagate the error unchanged (case 4 stays as is).
- Claim 3 and 5 BROKEN by case 3c: `#request` reads a non-OK body through `readText` with no bound
  to the combined signal, so an injected transport whose error body stalls outlives the deadline
  and the `finally` never runs. Bound of the fix: pipe the error body through the same
  signal-bound `TransformStream` the success path uses (or race the read against the signal), so
  the deadline rejects the call and cancels the body.
- Claim 15 BROKEN: `isMessage` calls the candidate array's own `every`, so an array with an
  own `every` property returning `true` passes non-string images and null calls. Bound of the
  fix: validate array elements through a total combinator that reads own indices
  (`@orkestrel/contract` `arrayOf`), never the candidate's methods; keep the throwing-proxy and
  revoked-proxy cases `false`.
