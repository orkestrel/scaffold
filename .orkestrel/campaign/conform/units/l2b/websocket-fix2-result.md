This matches prior fix-round state plus the `tests/setup.ts` edit from this round, consistent with the owned scope.

## Fix round 2

1. **F1.** `tests/setup.ts:3` dropped `pure`; the clause now reads `and the browser WebSocket helpers.`
2. **F2.** The `Fix round 1` F1 entry now cites `tests/integration.test.ts:3-4` for the wrapped clause; the sweep entry's `new` row no longer carries the `setupPolicy.ts`'s excluded scope aside parenthetical, since the row's opening sentence already excludes `tests/setupPolicy.ts`.

## Gates

| Command | Exit code |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 (src:server 120, policy 111, config 46, setup 21, guides 22, integration 14 — all passed) |

`npx scaffold audit --offline` printed: `0 of 37 planned paths drifted from the plan. Audit compared bytes at 23, existence at 5, and nothing at 9.`

Evidence regenerated: `/home/user/work/evidence/conform-websocket.diff` (2434 lines), `/home/user/work/evidence/conform-websocket.status` (24 entries).

Files touched: `/home/user/fleet/websocket/tests/setup.ts` (line 3 only), `/home/user/scaffold/tmp/units/conform/conform-websocket-report.md` (Fix round 2 lead, F1 citation, sweep entry).

No deviation.
