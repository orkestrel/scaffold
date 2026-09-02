# Unit voice-websocket — report

Every TSDoc block under `src/` of `/home/user/fleet/websocket` opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0 at
every step. No deviations.

## Blocks rewritten by kind

| Kind                                          | Count |
| --------------------------------------------- | ----- |
| First sentence from the imperative             | 4     |
| First sentence given a verb                    | 36    |
| First sentence reworded to drop the symbol's name | 0  |
| Boolean `@returns`                             | 4     |

The 4 boolean `@returns` lines sit inside blocks the verbless row already counts, so the tree carries
40 rewritten blocks out of the 44 the launch scan measured. The 4 left untouched already conformed:
`createNodeWebSocket` in `src/server/factories.ts`, the `WebSocketError` constructor in
`src/server/errors.ts`, `encodeWebSocketFrame` in `src/server/helpers.ts`, and
`parseWebSocketCanonical` in `src/server/parsers.ts`.

The launch scan bucketed `src/server/constants.ts` lines 22 through 64 as imperative. Reading them
shows bare noun phrases (`Text frame opcode — …`, `Ready state for …`, `Normal-closure status
code …`), so they are counted as verbless and took the `Names …` opener the wave prescribes for a
constant. The scan likewise bucketed the `Options for …` and `Whether …` openers as third-person;
reading rules them verbless, and they took `Represents the options for …` and `Checks whether …`.

## Files touched

- `/home/user/fleet/websocket/src/server/NodeWebSocket.ts` — the class block takes `Represents …`.
- `/home/user/fleet/websocket/src/server/constants.ts` — every constant block takes `Names …`.
- `/home/user/fleet/websocket/src/server/errors.ts` — `Represents …` on the error class, `Checks whether …` and the boolean `@returns` on `isWebSocketError`.
- `/home/user/fleet/websocket/src/server/helpers.ts` — `Compute` → `Computes`, `Read` → `Reads`.
- `/home/user/fleet/websocket/src/server/parsers.ts` — `Decode` → `Decodes`, `signal` → `signals`.
- `/home/user/fleet/websocket/src/server/types.ts` — `Represents …` on the type and interface blocks, `Holds …` on the `error` option property.
- `/home/user/fleet/websocket/src/server/validators.ts` — `Checks whether …` and the boolean `@returns` on each of the three guards.

`parseWebSocketCanonical` returns `boolean | undefined`, so its `@returns` keeps the tri-state
wording (`Its canonicality, or `undefined` while the length prefix is incomplete`) rather than the
two-valued form. The wave's scan does not flag it.

## Gates

| Command             | Exit | Result                                                   |
| ------------------- | ---- | -------------------------------------------------------- |
| `npm run format:check` | 0 | All matched files use the correct format (49 files)       |
| `npm run lint:check`   | 0 | No output                                                 |
| `npm run check`        | 0 | Root and `configs/src/tsconfig.server.json` both clean     |
| `npm run build`        | 0 | `dist/src/server/index.js` 29.87 kB, `index.cjs` 31.09 kB  |
| `npm test`             | 0 | src, policy, config, setup, guides, and integration all passed |

`npm test` timing is an observation; the Orchestrator's landing chain is the authoritative run. No
mutating `lint` or `format` was needed — `format:check` passed on the first run.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-websocket.diff` (317 lines, 44 insertions and 44 deletions)
- `/home/user/scaffold/tmp/units/voice/voice-websocket.status` (7 modified files, all under `src/server/`)

Post-landing scan: `websocket files= 9 blocks= 44 imperative= 0 verbless= 0 returnsBad= 0`.

## Deviations

none
