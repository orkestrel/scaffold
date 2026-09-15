# Orchestrator probe — the A2 objective lane's named vectors (2026-09-14, commit c50aee6)

Instrument: `a2-probe-vectors.mjs.txt`, run against the built dist with a scripted provider and a
line-per-record fixture parser. Controls: V2b (an exactly-limit body that closes reports
`complete: true` under the lookahead rule), V4b (a 503 whose body closes reports the bounded
excerpt promptly), V2c (limit + 1 reports incomplete).

```text
V1 hostile toJSON in parameters: OTHER TypeError: Do not know how to serialize a BigInt ; fetched = 0
V2 exact limit then empty chunk then close: {"text":"abc","complete":false}
V2b exact limit then close: {"text":"abc","complete":true}
V2c limit+1 in one chunk: {"text":"abc","complete":false}
V3 stream() throws synchronously: HANDLER REJECTED fixture-secret
V4 503 exactly 2048 bytes then stall: ProviderAbortError partial={"content":""} after 71ms; log=[cancel]
V4b 503 exactly 2048 bytes then close: ProviderError HTTP 503 provider error: 503 - xxxxxxxxxxxxxxx
V5 inbound abort with queued frame, no consumer action: iterator returned = false ; generator cleaned = false
```

Rulings:

- V1 BROKEN (claim 1): `RelayProvider.body` validates the projection with the compiled guard, then
  the base serializes the same retained objects, and a `get` trap can hand `JSON.stringify` a
  `toJSON` the guard never saw. Fix: own a JSON snapshot of the projection (`cloneJSONValue` from
  the installed contract, or serialize inside `body` under `attempt`) so the wire body is the
  validated value and any serialization failure is `ProviderError('PROTOCOL')` before fetch.
- V2 and V4 BROKEN (claims 3 and 11): the F9 lookahead reads one more chunk after an exact budget
  hit. It misreports an empty lookahead chunk (V2) and, on the base's non-OK path, turns a prompt
  `503` into a wait for the deadline when the error body stalls at exactly the bound (V4, against
  the `573ba71` baseline). Ruled: no lookahead. `complete` is `true` only when the read observed
  `done` within the budget; a body that fills the budget without a `done` observation is
  incomplete. The relay therefore refuses a body at or above the limit (the exactly-limit case
  becomes `413`; the documented rule is "smaller than the limit"), and the non-OK path returns as
  soon as the excerpt is read. Update the F9 tests to the rule.
- V3 BROKEN (claim 7) and the earlier body-error finding (`a2-probe-relay-body-error.md`): the
  handler rejects when the provider's `stream()` throws synchronously and when the request body
  errors mid-read. Fix: the handler answers `400` when the body cannot be read (an inbound abort
  still surfaces as the request's own cancellation) and `502` (a named constant) when the provider
  call cannot be constructed, with no listener left behind and no upstream text in either body.
- V5 BROKEN (claim 5): an inbound abort with a queued frame and no consumer action aborts the
  upstream controller but never returns the iterator, so the generator lingers until the body is
  cancelled. Fix: the inbound-abort listener aborts upstream and then returns the iterator (a
  queued `return()` settles after any pending `next()`), releasing the listener; the existing
  consumer-cancel path is unchanged.
