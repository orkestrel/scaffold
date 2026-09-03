Unit complete. All rows closed, gate chain green, evidence written.

## Rows

| Row | Disposition |
| --- | --- |
| websocket-obj-1, -3, -4, -5, -6, -7, -8, -9, -10, -11 | applied |
| websocket-subj-1, -2, -3, -4, -6, -7, -8, -10, -11 | applied |
| fleet-F1 | noop — `isBrowserVuePath` absent, no browser environment declared |
| fleet-F2 | noop — no implementation class declares a public `readonly id: string` |

## Files touched

Full one-line summaries are in `/home/user/scaffold/tmp/units/conform/conform-websocket-report.md` § Files touched. Diffstat after `git add -N`: **24 files changed, 869 insertions, 623 deletions**. `git status --short` lists only files under Owned.

Removed by relocation: `/home/user/fleet/websocket/src/server/validators.ts` and `/home/user/fleet/websocket/tests/src/server/validators.test.ts`.

## Failing-first evidence

Each control planted a wrong body in the moved/extracted/added subject, ran the named script, and was restored. Files in `/home/user/work/evidence/websocket-proofs/`.

| Row | Command | Red | Green |
| --- | --- | --- | --- |
| obj-1 | `npm run test:src` | 3 failed / 117 passed | 120 passed |
| obj-11 | `npm run test:src` | 28 failed / 92 passed | 120 passed |
| obj-4 | `npm run test:setup` | 1 failed / 20 passed | 21 passed |
| obj-8 | `npm run test:setup` | 1 failed / 20 passed | 21 passed |
| obj-5 | `npm run test:setup` | 3 failed / 18 passed | 21 passed |
| obj-7 | `npm run test:setup` / `test:integration` | 2 failed / 19 passed; 4 failed / 10 passed | 21; 14 passed |
| obj-6 | `npm run test:guides` (two plants) | 1 failed / 21 passed; 3 failed / 19 passed | 22 passed |

The obj-5 control reproduced the row's own defect statement verbatim: `Error: Event "the next WebSocket message event" was not delivered within 4000ms` — the budgeted, named failure the raw `new Promise` could not produce. The obj-6 plants redden all four fence transcriptions while leaving every parity assertion green, which is the row's point.

## Gates

`format:check` 0, `lint:check` 0, `check` 0, `build` 0, `npm test` 0 (src:server 120, policy 111, config 46, setup 21, guides 22, integration 14). Baseline was setup 17 and guides 18; the growth is the four new fixture proofs and the four fence transcriptions. Captured in `/home/user/work/evidence/websocket-proofs/gate-*.txt`.

## Breaking

Published surface moves; the package bumps. No consumer source edit needed — neither `@orkestrel/mcp` nor `@orkestrel/browser` imports a removed name.

`parseWebSocketCanonical` → `matchesWebSocketCanonical`; `WEBSOCKET_CONTROL_MAXLEN` → `WEBSOCKET_CONTROL_MAX_LENGTH`; `WEBSOCKET_CLOSE_REASON_MAXLEN` → `WEBSOCKET_CLOSE_REASON_MAX_LENGTH`; `WEBSOCKET_CLOSE_TOOBIG` → `WEBSOCKET_CLOSE_TOO_BIG`.

## Shared-file patches

None. Two propagation items are yours, not mine: `/home/user/fleet/mcp/guides/websocket.md` and `/home/user/fleet/browser/guides/websocket.md` are byte mirrors carrying the old constant names, the old `parseWebSocketCanonical` row, and the un-narrowed `sec-websocket-key` fences. Re-vendor both after this package publishes.

## Deviations

No deviation stopped the unit. Three decisions you should read:

1. **The two file removals ran through `git mv`.** The dispatch grants `git mv` as the only file-relocation tool and grants no removal command, while websocket-obj-1 requires both `validators` files to stop existing. I wrote each merged destination's content into the source file, then ran `git mv -f src/server/validators.ts src/server/helpers.ts` and the same for the test. No `rm`, no `git rm`, no discarding git command. The staged `D` rows are that relocation.
2. **Two Summary cells beyond websocket-subj-8's five were rewritten** — the `matchesWebSocketCanonical` row (which subj-8's own amendment assigns to obj-11's writer) and the `parseUTF8` row, the last surviving imperative in the table the row exists to give one voice.
3. **`NEXT_EVENT_BUDGET_MS` (4000) is module-private in `tests/setup.ts`**, matching how `DuplexEnd` is private to `duplexPair`. Sized from a contended `npm run test:integration` run on 2026-09-03 whose slowest case took 802 ms, and kept below the project's 5000 ms case timeout; the derivation is in the constant's own comment.

## Findings outside current scope

Recorded against the capability that owns them, for the next change:

- `tests/src/server/NodeWebSocket.test.ts` carries `should` in a comment; `src/server/NodeWebSocket.ts` carries `currently` in a `#drain` comment. `.claude/rules/writing.md` § Substitutions bans both, and websocket-subj-6 enumerates only `via`, `e.g.`, `i.e.`, temporal `once`, and `simply`.
- `tests/guides.test.ts`'s "the second assertion below" and "The five constants below" are fleet-shared drop-in prose. This copy is fixed; the sibling packages and the template the fleet regenerates the drop-in from are not.

Report: `/home/user/scaffold/tmp/units/conform/conform-websocket-report.md`. Evidence: `/home/user/work/evidence/conform-websocket.diff` (2380 lines), `/home/user/work/evidence/conform-websocket.status` (24 entries).
