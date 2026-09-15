<!-- checker on Claude Sonnet, native, read-only, clean context, on the worktree agent-audit at 611e24e with a2-fix-r2-diff.txt; returned 2026-09-14 after 114 s; retained verbatim from the returned message. Its terminal line writes "FAIL claims 1, 2, 9" for rows it ruled UNRESOLVED as the analyst's; the Orchestrator reads it as UNRESOLVED 1, 2, 9 and CONFIRMED on every assigned row. -->

Lane: mechanical (checker, Sonnet)

**Claim 1.** UNRESOLVED — analyst's row.
**Claim 2.** UNRESOLVED — analyst's row.

**Claim 3.** CONFIRMED. `src/core/RelayStream.ts:38` shows the sole pre-aborted guard `if (this.#signal.aborted) this.#abortProvider()`, placed before the listener is registered at line 45; the diff (`a2-fix-r2-diff.txt:81-83`) shows the duplicate guard that previously followed `addEventListener` deleted. The pre-aborted case still holds: `tests/src/core/RelayStream.test.ts:182` still runs `'links an already-aborted inbound signal before the upstream turn starts'`.

**Claim 4.** CONFIRMED. `RelayStream.ts:31` declares `readonly #listener: () => void` (the `#abort` field renamed); the class carries one term per concept: `#listener` (field, line 31), `#cancel` (method, line 85), `#abortProvider` (method, line 115), `#release` (method, line 119) — every member is a single word, private methods permitted two/three words under `.claude/rules/names.md` § Entity-scoped names. `grep -n "#abort\b"` on the file finds no `#abort` field, only `#abortProvider` occurrences (lines 38, 88, 115, 116).

**Claim 5.** CONFIRMED for the mechanical rows assigned. `createRelay`'s titled `@example Relaying a browser provider through your own server` in `src/core/factories.ts:80-108` is byte-identical in structure to the guide fence at `guides/agent.md:1089-1113` (both declare `connectRelay` with the explicit return-type annotation). `createRelayProvider`'s and `RelayProvider`'s fences are untitled (`factories.ts:149`, `RelayProvider.ts:27`) and each carries `{@link createRelay}` in its `@remarks` (`factories.ts:144`, `RelayProvider.ts:24-25`); only a titled `@example` binds guide parity, so the untitled short fences need no guide mirror. The retained gate log `a2-fix-r2-gates.log.txt:58-71` records `npm run test:guides` at exit 0 with `Tests 39 passed (39)`.

**Claim 6.** CONFIRMED. `tests/src/core/factories.test.ts:169` (diff `:289`) adds `expect(new TextEncoder().encode(body).byteLength).toBe(DEFAULT_RELAY_LIMIT)` inside the exact-limit relay-refusal test.

**Claim 7.** CONFIRMED. `tests/src/core/AgentProvider.test.ts:309` sets `timeout: 200` (raised from 80, diff line 277); the same test still asserts, at line 320, `expect(requireValue(transport.signals[0]).aborted).toBe(false)`, and at lines 311-316 the rejection is matched against `name: 'ProviderError', code: 'HTTP', status: 503`.

**Claim 8.** CONFIRMED. `src/core/shapers.ts:101` — `objectShape({ channel: literalShape(['error']), message: stringShape() }),` — sits on one line, matching its sibling arms (lines 98-100). `RelayStream.ts:12-14` states the remarks: "An inbound abort leaves the response body neither closed nor errored — a server runtime cancels that body when the client disconnects — so a consumer that aborts the inbound signal itself must cancel the body rather than keep reading it."

**Claim 9.** UNRESOLVED — analyst's row.

**Claim 10.** CONFIRMED. The diff touches exactly `guides/agent.md`, `src/core/RelayStream.ts`, `src/core/factories.ts`, `src/core/providers/RelayProvider.ts`, `src/core/shapers.ts`, `tests/src/core/AgentProvider.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/providers/RelayProvider.test.ts` — all inside the brief's Owned list, none of the Off-limits files. `src/core/factories.ts` changes are confined to the two `@example` doc blocks (diff lines 99-152); `src/core/shapers.ts` change is confined to the error arm's layout (diff lines 258-266). No `any`, `as`, non-null assertion, `@ts-` directive, `eslint-disable`, access modifier, parameter property, or nested named function declaration appears anywhere in the diff — the added logic in `RelayProvider.ts` (`body`) uses a `try/catch` with `let snapshot: unknown` and a following `if`, no assertions. New prose contains none of the banned terms and no stated count of a growable set. TSDoc additions read in third-person present.

**Claim 11.** CONFIRMED. `a2-fix-r2-gates.log.txt` records `npm run test:src:core` exit 0 with `Tests 753 passed (753)` (lines 30-42); `npm run test:setup` exit 0 with `Tests 54 passed (54)` (lines 44-56); `npm run test:guides` exit 0 with `Tests 39 passed (39)` (lines 58-71) — file counts match the brief's Measurements baseline, so every file collected. The diff's test-file changes are confined to `AgentProvider.test.ts` (R7-only), `factories.test.ts` (R6-only), and `providers/RelayProvider.test.ts` (R1/R2) — all inside the brief's ownership.

**Findings outside the claims:** none found within the mechanical rows assigned.

VERDICT: FAIL claims 1, 2, 9; outside the claims: none — these are analyst's rows (UNRESOLVED), not attacked/held by this lane.
