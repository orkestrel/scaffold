# U1 fix round 3 — successor to u1-brief-3.md

Round 2's nine items landed and hold; two of its OWN new tests fail in the Orchestrator's
environment (your sandbox denies listeners, so these are invisible to you). Both diagnoses are
Orchestrator-verified with the real output below. Test-infrastructure fixes only — no server or
browser source changes.

## Finding 1 — destroy-while-parked expectation races the socket teardown

```text
FAIL tests/app/server/ApplicationHandlers.test.ts:220
AssertionError: promise rejected "TypeError: terminated" instead of resolving
Caused by: SocketError: other side closed  (UND_ERR_SOCKET)
```

`server.destroy()` closes the TCP socket abruptly, racing the pump's graceful end — the client
read can surface either a clean `{done: true}` or a termination error, and either is acceptable
shutdown behaviour. The invariant is settlement plus server-side cleanup. Fix the assertion:
await the parked read's settlement accepting both outcomes (resolved done OR rejected with the
termination error), and keep `broker.roster.count === 0` and the abort-listener baseline as hard
assertions. Do not change server code and do not make destroy drain gracefully — abrupt close on
destroy is correct.

## Finding 2 — readSSEEvent cannot read consecutive frames in one chunk

```text
FAIL tests/app/server/ApplicationServer.test.ts:256 (the new one-run lifecycle proof)
SyntaxError: Unexpected non-whitespace character after JSON at position 351 (line 2 column 1)
  at readSSEMessage (tests/app/setup.ts:340)
```

The lifecycle publishes now put `pending` and `running` frames on the wire back-to-back (round
2's item 1 working as demanded). One socket chunk can carry both; `readSSEEvent` returns the
whole buffered text past the first blank-line boundary, so the joined `data:` lines contain two
JSON documents. Fix the shared helper in `tests/app/setup.ts`: make SSE reading stateful — split
at the first event boundary and carry the remainder for the next read (a small reader created
once per response body, replacing the raw `ReadableStreamDefaultReader` parameter), and move
every call site in the server tests to it. Behaviour, not shape, is the requirement: consecutive
frames in one chunk are delivered as separate messages, in order, none dropped.

## Gates

Static gates only in your sandbox (`format:check`, `lint:check`, `check`); the Orchestrator runs
`test:app:server`, `test:app:browser`, and the full chain as acceptance.

## Output

The two diffs; `git status --porcelain`; one line per finding on why the fix binds; deviations or
none. No process diary.
