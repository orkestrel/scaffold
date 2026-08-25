# Unit VISIT-websocket — report

## Advisory taken

`npx --no-install scaffold audit` reported, at dispatch:

```
scripts: The manifest at . declares a planned script with a differing value: test:guides.
  Keep the declared value unchanged or replace it with the planned value: "test:guides"
  declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned
  "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts,
  tests/setupGlobal.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupGlobal.test.ts,
  tests/setupServer.test.ts, each covering the module of the same name.
dependencies: typescript declares major 6, while the registry serves major 7.
```

The `dependencies` row is fleet-wide and out of scope per the brief. The manifest drift table
also named the retired `orkestrel-human-journey` foreign paths and `.claude/agents/codex.md` /
`.codex/agents/claude.toml`; left alone as instructed.

## Proof files

**`tests/setup.test.ts`** proves `tests/setup.ts`: `buildText` determinism, its zero-length
case, and its surrogate-range shift at the documented `0xd800` boundary; the integration
command vocabulary's distinctness and non-emptiness (the routing membership `setupGlobal.ts`
relies on); and `connect`/`nextMessage`/`nextClose` driven end to end against a real
`127.0.0.1` loopback server built with `createNodeWebSocket` (Node 22 ships `WebSocket` and
`MessageEvent` as real globals, so these browser-typed helpers run for real in Node), including
`connect`'s rejection on a refused connection.

**`tests/setupGlobal.test.ts`** proves `tests/setupGlobal.ts`. The module exports only
`setup(project)`, which acts entirely on the live `TestProject` the runner owns; constructing
one without a type assertion is not possible (`TestProject` is a large class from
`vitest/node`), so the header comment records that the runner-driven half is proven by the
`integration` project, which `vite.config.ts` names as this module's `globalSetup` — the mcp
visit's precedent. The one case proves the reachable contract instead: the module's export
surface is exactly the single callable `setup` name Vitest's `globalSetup` loader requires,
checked against a fixed expected-name list this file owns rather than the module's own keys.

**`tests/setupServer.test.ts`** proves `tests/setupServer.ts` with real `node:stream` Duplex
instances throughout: `duplexPair` cross-wiring in both directions; `flushSocket` resolving
only after two elapsed `setImmediate` ticks; `randomBuffer`'s length/integer/range invariants,
determinism, and the documented `0` and `255/256` boundary bytes; `frame` matching the real
`encodeWebSocketFrame` baseline when `fin` is omitted or `true`, and clearing only the FIN bit
when `fin: false`; and `readClientFrames` stripping the handshake response and collecting real
frames built with `encodeWebSocketFrame`.

## Mutation controls

One control per proof file, each broken, watched red, then restored:

- `tests/setup.test.ts:49` — `expect(point).toBe(0xd000)` mutated to `toBe(0xd800)`:
  `AssertionError: expected 53248 to be 55296`.
- `tests/setupGlobal.test.ts:26` — the expected-name assertion mutated to
  `toEqual(['setup', 'teardown'])`: `AssertionError: expected [ 'setup' ] to deeply equal
  [ 'setup', 'teardown' ]`.
- `tests/setupServer.test.ts:92` — `expect(unfinished.readUInt8(0) & 0x80).toBe(0)` mutated to
  `toBe(0x80)`: `AssertionError: expected +0 to be 128`.

All three restored; `npm run test:setup` passed 17/17 after restoration.

## `test:guides` and the `test` chain

Adopted `test:guides` to the planned value (added `--no-cache`) through `npm pkg set`.

`npx --no-install scaffold repair --groups manifest` blocked the `configs` group as expected
because the `test` chain did not invoke the `setup` project; it wrote `test:setup` (the same
`--no-cache --reporter=dot --project setup` form as its siblings) and re-pinned
`@orkestrel/scaffold` from `^0.0.51` to `^0.0.52`. Adopted the `test` chain through
`npm pkg set`, placing `test:setup` between `test:config` and `test:guides`:
`npm run test:src && npm run test:policy && npm run test:config && npm run test:setup &&
npm run test:guides && npm run test:integration`.

The full `npx --no-install scaffold repair` then ran clean: it wrote `vite.config.ts` (adding
the `setup` project — `include: ['tests/setup*.test.ts']`, `setupFiles: ['./tests/setup.ts']`,
Node environment, browser disabled — and inserting it into the `projects` array between
`config` and `guides`) plus the fleet-wide vendored orchestration files the re-pin carries.
`npm run format` converged the regenerated files and the newly written proof files; a re-run of
`format:check` was clean.

No retained differing script value beyond `test:guides` and the `test` chain was named or
adopted; the `repair` audit table named only the pre-existing foreign `orkestrel-human-journey`
paths (unchanged, per the brief).

## Gates, each read bare

```
$ npm run format:check
Checking formatting...
All matched files use the correct format.
Finished in 3210ms on 142 files using 4 threads.

$ npm run lint:check
(no output — clean)

$ npm run check
(tsc --noEmit --project tsconfig.json; tsc --noEmit -p configs/src/tsconfig.server.json — no output, clean)

$ npm run build
✓ built in 2.64s
Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts

$ npm test
test:src        — Test Files 3 passed (3); Tests 119 passed (119)
test:policy     — Test Files 1 passed (1); Tests 93 passed (93)
test:config     — Test Files 1 passed (1); Tests 46 passed (46)
test:setup      — Test Files 3 passed (3); Tests 17 passed (17)
test:guides     — Test Files 1 passed (1); Tests 18 passed (18)
test:integration — Test Files 1 passed (1); Tests 14 passed (14)
```

`npx --no-install scaffold audit` at exit reports no `setup:` and no `scripts:` advisory.

## Scope note

No commit was made. `package.json`, `package-lock.json`, and `vite.config.ts` carry the re-pin
plus the `repair`-regenerated content described above; the fleet-wide vendored orchestration
paths (`.agents/**`, `.claude/agents/**`, `.claude/rules/documentation.md`, `.codex/agents/**`,
`CLAUDE.md`, and the newly present `.agents/templates/`, `.agents/transports/`, and the
`orkestrel-prove-journey` / `orkestrel-publish` skill directories) were written by the same
`repair` run the visit order requires and are outside this unit's owned files, left for the
Orchestrator's review.
