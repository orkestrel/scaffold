<!-- checker on Sonnet, native, read-only, on the isolated worktree agent-audit at 573ba71; returned 2026-09-14 ~21:27Z; immutable blind verdict, copied from the returned text -->

Lane: mechanical (checker, Sonnet)

1. UNRESOLVED. Letter-of-law: `AgentProvider.ts:199-211` — `if (combined.aborted)` wraps into `ProviderAbortError` with the locally accumulated result and the sole other path (`:211`) rethrows; no third branch. The "nothing widened" half over the five prior pins is behavioural; settled by re-running them.
2. UNRESOLVED (partial). `pipeThrough` absent from `AgentProvider.ts`; `readChunks(response.body, combined)`; `combined.throwIfAborted()` after the read loop; `signal.throwIfAborted()` after the non-OK read; the reader listener registration matches the claim textually. The mutation log is Orchestrator-supplied evidence, not run by this lane.
3. CONFIRMED. `ProviderOptions.headers` takes `(signal: AbortSignal)` (matches `plan.md:51` and the reconciliation amendment); `RecordedSignals` and `AbortSignal.any` assignments absent from `tests/setup.ts`; no `node:` import there; the fixture hook `RecordedHeaders` records the signal and the three hook-exit assertions read it through `node:events` `getEventListeners`.
4. CONFIRMED (with caveat). `validators.ts` imports `arrayOf` and uses it for `calls` and `images`; the hostile-array, throwing-proxy, and revoked-proxy tests exist for both members; gate results are Orchestrator-verified.
5. CONFIRMED. `Agent.ts` changed by one line: the abort-partial fold now requires non-empty thinking, mirroring the sibling fold.
6. CONFIRMED. `ProviderErrorCode` is `'HTTP' | 'PROTOCOL' | 'PROVIDER'` with each arm documented; `ProviderError` carries `@remarks` and documented members; `'LIMIT'` absent under `src` and `tests` as a code (only unrelated identifiers); `RelayOptions.limit` TSDoc names the 413.
7. CONFIRMED. `RelayFrame` and the `frame()` method remain; `RelayProviderOptions.parser` replaces the option; no `frame:` member in `types.ts`.
8. CONFIRMED. The `@example` declares `class TextProvider extends AgentProvider<string>` with `name`, `super({ url, path: '/generate' })`, `frame`, `body`, `read`, `finish`; the `@remarks` names the five members and the `split` and `strict` switches.
9. CONFIRMED. `MAX_ERROR_BODY_LENGTH = 2048` pinned; the single-8192-byte-chunk test asserts the bounded excerpt, `bytes` 8192, `count` 1, cancelled, unlocked, and is named for the documented overshoot.
10. CONFIRMED. One `joinThinking` block; the three round-1 blocks renamed to subject form (`buildProviderResult — …`, `readText — …`, `readChunks — …`, `AgentProvider — cancellation and partial results`, `AgentProvider — call completion and isolation`); no `.skip`, `.todo`, concurrent, or retry added.
11. Split: syntax half CONFIRMED (no `any`, assertion, `!`, suppression, access modifier, parameter property, or module-scope declaration beside a class in `src`); contract-parity half CONFIRMED (types match `plan.md` as amended); "every A1-R1 CONFIRMED claim still holds" UNRESOLVED — not re-executed by this lane.
12. UNRESOLVED — reserved for the deciding subjective lane.

Findings outside the claims: none. Attacked and held: the forbidden-syntax sweep, the `'LIMIT'` and `frame:` searches, the block searches, the pin and overshoot assertions, the example/remarks match.

VERDICT: FAIL none confirmed-broken; UNRESOLVED 1, 2 (partial), 4 (partial), 11 (partial), 12; outside the claims: none
