# Report — unit O3-fix (`@orkestrel/ollama`, worktree `ollama-audit`, branch `o3-fix` from `dcb64fe`)

## Touched files

`git diff --stat`:

```
 tests/service/OllamaProvider.test.ts | 16 +++++-----
 tests/service/relay.test.ts          | 14 ++++++++-
 tests/setupServer.test.ts            | 61 ++++++++++++++++++------------------
 tests/setupServer.ts                 | 40 +++++++----------------
 tests/src/core/factories.test.ts     | 12 +++----
 tests/src/core/integration.test.ts   | 27 +++++++++-------
 6 files changed, 84 insertions(+), 86 deletions(-)
```

## Per item

**1. Claim 9 — header comment.** Rewrote `tests/setupServer.test.ts:1-11` to name the relay
server and the transport fixtures beside the proxy, and to scope the socket sentence: the proxy
and relay-server cases run against real sockets on `127.0.0.1` ephemeral ports, the transport
fixtures drive in-memory responses, and no Ollama daemon takes part in any of them.
Proving command: `npm run test:setup` — 3 files, 96 tests passed.

**2. F1 — the live suite observes the daemon hop.** In `tests/service/relay.test.ts`, each of the
three cases now wraps the server-side provider's transport in `createRecordingTransport()` and
asserts `daemon.requests[0]?.path` is `/api/chat` and `daemon.requests[0]?.body.messages` is
non-empty, alongside every existing assertion. Not run under this unit's tool allowlist (the
`service` project needs the daemon and is the Orchestrator's to run); `npm run check` and
`npm run lint:check` both exit 0 against the file.

**3. F3 — one recording transport.** Deleted `createCapturedTransport` and
`CapturedTransportInterface`. `createRecordingTransport` now takes the newer helper's shape
(`transport` parameter only, returning `requests`/`chunks`/`fetch`) under the interface
`RecordingTransportInterface`. Updated every call site:
- `tests/setupServer.test.ts` — merged the `createCapturedTransport` describe block into
  `createRecordingTransport`, folded a third case covering the default-global-fetch delegation
  the deleted two-arg describe block proved, and deleted that now-impossible two-arg block.
- `tests/src/core/integration.test.ts` — 7 call sites renamed (pure rename; same first
  parameter).
- `tests/service/OllamaProvider.test.ts` — 2 call sites converted from
  `createRecordingTransport(calls)` + `calls.count`/`calls.calls[0]?.[0]` to
  `createRecordingTransport()` + `transport.requests.length`/`transport.requests[0]?.path`
  (the equivalent recorded field; the newer shape records `path`, not the full URL).
- `tests/src/core/factories.test.ts` — 2 call sites converted the same way.
Proving command run after this item: `npm run test:src:core` (4 files, 99 tests passed),
`npm run test:setup` (3 files, 96 tests passed), `npm run lint:check` and `npm run check` (both
exit 0).

**4. F2 — the relay server's type.** Renamed `RecordingProxyInterface` to
`RecordingServerInterface` (the shared return shape of `createRecordingProxy` and
`createRelayServer`), and `waitForRequest`'s parameter from `proxy` to `server`, with the doc
sentences following. Grepped `tests/` for `RecordingProxyInterface`: no remaining site outside
the two files the brief names.

**5. F4 — `cancelled` names its source.** Added to `OpenTransportInterface.cancelled`'s TSDoc in
`tests/setupServer.ts` that the member mirrors the `ReadableStream` `cancel` callback.

**6. F5 — the negative credential assertion reads the whole header text.** In
`tests/src/core/integration.test.ts`, the two negative credential assertions now read
`expect(JSON.stringify(request.headers)).not.toContain(...)` instead of
`Object.values(request.headers)`.

**7. F7 — the `caller` drop is proven in the composition.** In the tool round-trip case in
`tests/src/core/integration.test.ts`, the replayed `ToolCall` now carries
`caller: { session: 'fixture-session' }` (the shape `ToolCall.caller` declares in the installed
`@orkestrel/agent`'s `node_modules/@orkestrel/agent/dist/src/core/index.d.ts`, which types
`caller` as optional `unknown` forwarded context). The assertion against
`server.requests[1]?.body.messages` now expects the call **without** `caller` (the original
`call`, pre-replay), so it fails if the key ever crosses the browser→server hop. Ran
`npm run test:src:core`: the case passed as shipped — the installed `@orkestrel/agent` already
strips `caller` at that projection, so the reading is green without any implementation change
here; no red-first stage was reachable because the stripping is `@orkestrel/agent`'s own already-
published behavior, not something this unit's owned files implement.

## Deviation

None. Every item's cited site matched the finding's description after re-location at `dcb64fe`,
and every change stayed inside the owned files.

## Status

`git status --porcelain` in the worktree:

```
 M tests/service/OllamaProvider.test.ts
 M tests/service/relay.test.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/integration.test.ts
```

## Gate readings

- `npm run lint:check` — exit 0.
- `npm run check` — exit 0 (`tsc --noEmit` root + `check:src:core`).
- `npm run test:src:core` — 4 files, 99 tests passed.
- `npm run test:setup` — 3 files, 96 tests passed.
- `npm run test:conformance` — 1 file, 17 tests passed.
- `grep -rn "createCapturedTransport\|CapturedTransportInterface\|RecordingProxyInterface" tests`
  — no matches.
