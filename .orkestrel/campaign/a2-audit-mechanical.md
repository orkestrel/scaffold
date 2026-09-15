<!-- checker on Sonnet, native, read-only, on the isolated worktree agent-audit at c50aee6; returned 2026-09-14 ~21:55Z; immutable blind verdict, condensed from the returned text with every ruling kept -->

Lane: mechanical (checker, Sonnet)

1. CONFIRMED. `RelayProvider.body()` projects only the declared fields (`RelayProvider.ts:58-97`); `providerRequestContract.is(projected)` gates before fetch and throws `ProviderError('PROTOCOL', 'relay request is not JSON')` (`:93-95`); `toolCallShape` is `{ id, name, arguments }` with no `caller` (`shapers.ts:23-27`); the TSDoc says `caller` never crosses (`:15`); `relayFrameContract.is()` gates in `RelayStream.#write` (`RelayStream.ts:97`) and in `RelayProvider.read()` (`:108`). No second looser path found.
2. CONFIRMED as written. `createRelay` (`factories.ts:78-95`): authorize first, `false` and a throw both `401` before any body read; null body `400`; incomplete read `413` before any provider call; contract rejection `400`; only then `RelayStream` starts `provider.stream` (`RelayStream.ts:32-37`). Statuses are named constants (`constants.ts:112-118`).
3. UNRESOLVED — needs execution of `readText` at the boundaries.
4. UNRESOLVED for the concurrency half; structurally `#pull` awaits one `next()`, writes one frame, `#settled` guards re-entry at `:53`, `:56`, `:60`; the fixed `error` frame uses `RELAY_PROVIDER_MESSAGE`.
5. UNRESOLVED — needs real signal interleavings.
6. UNRESOLVED for the behavioural half; letter-of-law: `split: false, strict: true` (`RelayProvider.ts:31-34`), `name = 'relay'` (`:44`), `frame()` returns `this.#parser()` (`:47-49`).
7. CONFIRMED. No header-copy or global-fetch patch; the handler reads no request header into provider configuration; `headers` is threaded only from the caller's option into `super()`; the fixed message is the only text on the `error` frame.
8. CONFIRMED for headers and encoding (`RelayStream.ts:43`, `constants.ts:106`, one `TextEncoder` per stream, `JSON.stringify(frame) + '\n'`); UNRESOLVED for the consumer-supplied parser's chunk reassembly (a fixture at `a2-diff.txt:1384` splits a frame across chunks; execution decides).
9. CONFIRMED on shape: the integration test wires `fetch: (input, init) => handler(new Request(input, init))` with real `Request`/`Response`; no `vi.mock`, `vi.spyOn`, or `globalThis.fetch =` anywhere in the diff; whether the assertions pass is an execution question.
10. CONFIRMED. Placement (`providers/RelayProvider.ts`, root `RelayStream.ts`, factories, constants), every export barrelled (`index.ts:2, 6, 11, 17`), single-word members, third-person TSDoc, no forbidden syntax, no nested declarations, no patched global or spy in the tests.
11. UNRESOLVED — re-running the earlier claims' proofs is execution; the only base-file change is `AgentProvider.ts`'s `.text` read and doc text.
12. Referral to the subjective lane.

Attacked and held: claims 1, 2, 7, 8 (headers and encoding), 9 (shape), 10.

VERDICT: UNRESOLVED 3, 4, 5, 6 (partial), 8 (partial), 9 (partial), 11; outside the claims: none
