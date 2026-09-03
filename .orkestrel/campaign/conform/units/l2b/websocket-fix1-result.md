24 entries, all within Owned scope for this fix round. All good.

## Fix round 1

1. **Claim 4.** `/home/user/scaffold/tmp/units/conform/conform-websocket-report.md:84` corrected from `4 failed | 10 passed` to `9 failed | 5 passed`, matching `/home/user/work/evidence/websocket-proofs/obj-7-control-integration.txt:367`. Every other count in the failing-first table was re-read against its named file: `obj-1-control.txt:73` (3 failed | 117 passed), `obj-11-control.txt:608` (28 failed | 92 passed), `obj-4-control.txt:30` (1 failed | 20 passed), `obj-8-control.txt:33` (1 failed | 20 passed), `obj-5-control.txt:22` (3 failed | 18 passed), `obj-7-control-setup.txt:46` (2 failed | 19 passed), `obj-6-control.txt:30` (1 failed | 21 passed), `obj-6-control-fences.txt:82` (3 failed | 19 passed). Every one already matched the table; none needed correction.
2. **F1.** `/home/user/fleet/websocket/tests/setup.ts:39` now reads `// ── Browser WebSocket helpers (the platform `WebSocket` plus `@orkestrel/test`'s `waitForEvent` — no `node:*` API) ──`; the header's `:42` line dropped `framework-free` in the same rewrite, since both stood in the enumeration that overreached. `/home/user/fleet/websocket/tests/integration.test.ts:3` now reads `browser helpers from `tests/setup.ts` (the platform `WebSocket` plus `@orkestrel/test`'s `waitForEvent` — no `node:*` API), and the injected` — the wrap moved the clause onto its own comment line.
3. **Checker F1.** `/home/user/fleet/websocket/tests/src/server/NodeWebSocket.test.ts:1457` now reads `and nothing after it can trigger a second close.` — ability sense, `can`.
4. **Checker F2.** `/home/user/fleet/websocket/src/server/NodeWebSocket.ts:274` now reads `// Decode every complete frame in the buffer, dispatching each and slicing`.
5. **Checker F3.** `/home/user/fleet/websocket/tests/src/server/parsers.test.ts:296` now reads `// Exactly the 4-byte length prefix (2 base + 2 extended) buffered: measure`; `:302` now reads `// The full wire: parse agrees with what measure already reported.`
6. **Checker F4.** `/home/user/fleet/websocket/tests/src/server/NodeWebSocket.test.ts:227` now reads `ws.destroy() // closed`; `:530` now reads `it('an additional data frame opened mid-message closes with 1002 (protocol error)', async () => {`.
7. **Sweep.** Pattern `\b(should|currently|now|new|framework-free)\b`, case-insensitive, over `src/**`, `tests/**` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, plus `guides/websocket.md`, `guides/README.md`, and `README.md`. Remaining hits, each ruled:
   - Every `new` hit in `src/**` and in the swept `tests/**` files is the constructor keyword — permitted.
   - `tests/src/server/NodeWebSocket.test.ts:1289` — `ws.send('should be dropped')` — a payload string value the case under test asserts against, not prose describing behavior — permitted.
   - No `currently`, `now`, or `framework-free` hit remains in the swept population.
   - `guides/websocket.md`, `guides/README.md`, and `README.md` returned no match.

## Gates (fix round 1)

| Command | Exit code |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 |

`npm test` readings: src:server 120, policy 111, config 46, setup 21, guides 22, integration 14 — all passed, unchanged from the unit's own baseline.

`npx scaffold audit --offline` printed: `0 of 37 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 9.`

No deviation. Files touched: `/home/user/fleet/websocket/tests/setup.ts`, `/home/user/fleet/websocket/tests/integration.test.ts`, `/home/user/fleet/websocket/tests/src/server/NodeWebSocket.test.ts`, `/home/user/fleet/websocket/src/server/NodeWebSocket.ts`, `/home/user/fleet/websocket/tests/src/server/parsers.test.ts`, `/home/user/scaffold/tmp/units/conform/conform-websocket-report.md`. Review evidence at `/home/user/work/evidence/conform-websocket.diff` and `conform-websocket.status`, both refreshed by `node /home/user/scaffold/tmp/work/evidence.mjs websocket`.
