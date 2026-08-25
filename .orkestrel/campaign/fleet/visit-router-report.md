# Unit VISIT-router — report

## Advisory taken

`npx --no-install scaffold audit` reported, before any edit:

```
scripts: The manifest at . declares a planned script with a differing value: test:guides.
  Keep the declared value unchanged or replace it with the planned value: "test:guides" declares
  "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run
  --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts,
  tests/setupBrowser.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupBrowser.test.ts,
  tests/setupServer.test.ts, each covering the module of the same name.
dependencies: typescript declares major 6, while the registry serves major 7.
```

Plus a stale/foreign path table for `docs` and `orchestration` groups. The `dependencies` advisory
is fleet-wide and out of scope per the brief. The path table's `foreign` rows (the retired
`orkestrel-human-journey` paths, `.claude/agents/codex.md`, `.codex/agents/claude.toml`) were left
untouched for the Orchestrator to remove at commit.

## Proof files

- `tests/setup.test.ts` — proves `createTestBody`: the stream closes after exactly the requested
  chunk count, each pull delivers the passed chunk, and `pulls` is a live count that grows as the
  stream is consumed rather than only after full drain.
- `tests/setupServer.test.ts` — proves `WORKSPACE_ROOT` (anchors to the real workspace root, not an
  arbitrary ancestor, checked against `package.json` and `vite.config.ts` on disk), `startServer`
  (binds a real `127.0.0.1` socket, serves the passed listener over a real `fetch`, and `close()`
  refuses a later request), `startPausedResponse` (returns a response paused before body delivery,
  driven through a real server), and `countResponseListeners` (reads real listener totals on a live
  `ServerResponse`, rising and falling as listeners attach and detach). All against real Node
  sockets on ephemeral `127.0.0.1` ports.
- `tests/setupBrowser.test.ts` — proves `drainNavigators`, the one export with no `window`/`document`
  dependency: it destroys every tracked navigator in `pop()` order and empties the array in place,
  and leaves an already-empty array untouched. The file's leading comment names `settleHash`,
  `setHash`, `settleHistory`, `createAnchor`, `click`, and `safeClick` as proven by the consuming
  `src:browser` suites (for example `tests/src/browser/Navigator.test.ts`), which run in a real
  browser instance the `setup` project's Node/no-browser environment cannot reach. The stub
  navigator is a real `NavigatorInterface<unknown>` built from the real `createRouter` (`@src/core`)
  and `createEmitter` (`@orkestrel/emitter`) factories, not a cast.

## Mutation controls (one per proof file, restored)

- `tests/setup.test.ts`: forced the pull-count expectation from `toBe(3)` to `toBe(4)` —
  `AssertionError: expected 3 to be 4` at `tests/setup.test.ts:17:25`. Restored.
- `tests/setupServer.test.ts`: forced the fetched body expectation from `'router-fixture'` to
  `'wrong-body'` — `AssertionError: expected 'router-fixture' to be 'wrong-body'` at
  `tests/setupServer.test.ts:25:17`. Restored.
- `tests/setupBrowser.test.ts`: forced the destroy-order expectation from `['c', 'b', 'a']` to
  `['a', 'b', 'c']` — `AssertionError: expected [ 'c', 'b', 'a' ] to deeply equal [ 'a', 'b', 'c' ]`
  at `tests/setupBrowser.test.ts:40:44`. Restored.

Each mutation was applied to a copy of the file, watched to fail alone under
`vitest run --config vite.config.ts --no-cache --reporter=dot --project setup <file>`, then the
original file was restored from a pre-mutation copy.

## Visit order performed

1. Adopted `test:guides` to the planned value through `npm pkg set`:
   `vitest run --config vite.config.ts --no-cache --reporter=dot --project guides`.
2. Ran `npx --no-install scaffold repair --groups manifest`, which wrote `test:setup`:
   `vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`.
3. Adopted the `test` chain through `npm pkg set`, placing `test:setup` between `test:config` and
   `test:guides`:
   `npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides`.
4. Ran the full `npx --no-install scaffold repair`, which regenerated `vite.config.ts` (added the
   `setup` project) and wrote 49 vendored orchestration/agent files; the audit it ran first showed
   `0 of 137 planned paths drifted` beyond the pre-known `foreign` rows. No retained differing
   script value was named beyond the `test:guides`/`test` adoption already performed.
5. Ran `npm run format`.

**Retained differing values.** None named by `repair` beyond the `test:guides` value and the `test`
chain the blocked `configs` group forced (both adopted per the brief).

## Gate results (bare)

- `npm run format:check` — `All matched files use the correct format.`
- `npm run lint:check` — closes with no diagnostics.
- `npm run check` — `check`, `check:src:core`, `check:src:browser`, `check:src:server` all close
  with no diagnostics.
- `npm run build` — `build:src:core`, `build:src:browser`, `build:src:server` all close; declaration
  bundling reports the fleet-wide "TypeScript 6.0.3 newer than the bundled API Extractor engine"
  advisory only (out of scope per the brief).
- `npm test` — `test:src` (10 files, 257 tests passed), `test:policy` (1 file, 93 tests passed),
  `test:config` (1 file, 46 tests passed), `test:setup` (3 files, 9 tests passed), `test:guides`
  (1 file, 28 tests passed). All green.

## Acceptance

1. `npx --no-install scaffold audit` reports no `setup:` advisory at exit (confirmed above).
2. Every gate closed green, each read bare (confirmed above).
3. One mutation-control failing line reported per proof file, all restored (confirmed above).

No commit made. `package.json` and `package-lock.json` carry the re-pin plus the `test:guides` and
`test` script adoptions; `vite.config.ts` carries the regenerated `setup` project; the vendored
orchestration/agent files carry `repair`'s regeneration. The `foreign`-marked paths under
`orkestrel-human-journey`, `.claude/agents/codex.md`, and `.codex/agents/claude.toml` remain
untouched for the Orchestrator.
