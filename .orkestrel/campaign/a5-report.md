# Unit A5 report — the relay route and server start-up execute in the agent guide's transcription

## 1. Per owned file

### `tests/guides.test.ts`

- **Imports.** The `Message` type joins the existing top-level `import type … from '@src/core'` list.
  Inside the `GuideCommand.execute` callback: `waitForCondition` joins `requireValue` from
  `@orkestrel/test`; `const { createDispatcher } = await import('@orkestrel/router')` and
  `const { createServer } = await import('@orkestrel/server')` are added with a comment naming why
  those development dependencies exist; `ProviderAbortError` joins the barrel destructure;
  `RecordedProvider` joins the `./setup.js` destructure. The file imports no `node:` module.
- **Renamed and rewritten case** (line 451) — `round trips both relay fence halves and carries the
  route the server half declares` became `round trips both relay fence halves over a started
  listener and refuses what the route declines`. It builds the fence's `createRelay` handler, mounts
  it on `createDispatcher({ routes: [{ method: 'POST', path: '/relay', handler }] })`, starts
  `createServer({ dispatcher, state: () => undefined, host: '127.0.0.1' })`, and then, on that
  listener, in order: a `GET` to `/relay` with the valid bearer answers `405` with `allow: POST`; a
  `POST` to `/other` with the valid bearer and a valid relay body answers `404`; `upstream.started`
  is `0`; a `createRelayProvider` with no `fetch` option and `Bearer wrong` rejects with
  `ProviderError` carrying `code: 'HTTP'`, `status: 401`, and `message: 'provider error: 401'`, with
  `upstream.started` still `0`; the fence's browser half at `http://127.0.0.1:${port}/relay` returns
  `{ content: 'relayed answer' }`, deep-equal to the same script driven directly through a second
  `createScriptedProvider`, with `browser.name` of `'relay'` and `upstream.started` of `1`. The
  `finally` block runs `await server.stop()`, then asserts `server.status` is `'stopped'` and
  `server.address` is `undefined`.
- **Added case** (line 523) — `cancels the upstream turn when the relay reader goes away mid-stream`.
  A `RecordedProvider([{ content: 'relayed answer' }], gate.promise)` upstream on its own listener;
  `browser.stream(messages, abort.signal)`; the first `next()` held pending; `waitForCondition` until
  `upstream.steps === 1`; `abort.abort()`; the pending `next()` rejects with `ProviderAbortError`
  carrying `code: 'ABORT'`; `waitForCondition` until `upstream.returns === 1`; `upstream.cancelled`
  is `true`. The `finally` block resolves the gate, measures `await server.stop()` with
  `performance.now()`, asserts that drain is under 1000 ms, and asserts `server.status` is
  `'stopped'`.
- **Deleted case** — `refuses the relay fence's hop when the bearer does not match`. Every assertion
  it made (`ProviderError`, `code: 'HTTP'`, `status: 401`, that exact message, and
  `upstream.started` of `0`) is carried by the rewritten flagship case, over the socket instead of a
  direct handler call. The brief's item 4 permits either; folding it is my decision, recorded here.
- **Unchanged cases** — `decodes a scripted relay body through the fence's browser half alone` and
  `refuses a relay body at its byte limit and admits one below it` stay direct calls.
- **Substring guards** — `carries the relay fence lines the transcription copies` keeps every string
  it asserted before and adds `const dispatcher = createDispatcher({`,
  `const server = createServer({ dispatcher, state: () => undefined })`, `await server.start()`, and
  the corrected `process.on('SIGTERM', () => server.stop())` line with its stop comment.

### `guides/agent.md`

- **Line 1126** (the fence's stop comment; 1124 before the prose edit shifted it):
  `// stop draining new requests on shutdown` became `// refuse new connections, drain, then close`.
  The rest of the line is unchanged.
- **Line 1097** replaced by two paragraphs. The first states that the package declares no *runtime*
  dependency on a newline-delimited JSON parser, on a router, or on a server adapter; that the
  browser application supplies the parser and the server application supplies the router and the
  adapter; that the `@orkestrel/router` and `@orkestrel/server` development dependencies serve the
  executed transcription; and what the loopback hop proves — the round trip, the `405` with its
  `Allow: POST` header, the `404`, the `401` with the upstream unentered, and the upstream turn a
  disconnected reader cancels. The second paragraph states each substitution with its reason.
- **Line 1475** (the `## Tests` bullet for `tests/guides.test.ts`; 1473 before the shift). Its last
  sentence gained the executed hop: the relay halves driven over a started `@orkestrel/server`
  listener on loopback — the declared route's own `405` and `404`, the `401` a wrong bearer answers,
  the round trip, and the upstream turn a disconnected reader cancels.
- **Line 1018** (clause 36) is byte-identical to its state at `0102259`, verified by comparing
  `git show 0102259:guides/agent.md` line by line against the working copy: the first differing
  baseline line is 1097.

### `src/core/factories.ts`

- **Line 104** only, inside the `@example Mounting the relay on your server` block: the same comment
  correction, so the titled twin still equals the guide fence. `git diff src/core/factories.ts`
  shows one changed line.

### Every substitution the transcription makes

- The parser: `createParser` from `tests/setup.ts` in place of the fence's `createNDJSONParser`. It
  throws `ProviderError('PROTOCOL', …)` on a malformed line where the published parser skips it.
- `host: '127.0.0.1'` added to the `createServer` call. The fence omits `host` because a deployed
  server binds every interface; a test listener binds loopback.
- The browser half's `url` is `http://127.0.0.1:${port}/relay`, where `port` is what
  `await server.start()` resolved, in place of the fence's fixed `https://app.example/relay`.
- `await server.stop()` in each case's `finally`, in place of
  `process.on('SIGTERM', () => server.stop())`, which a test process outlives.
- The fence's static `import` lines become dynamic `await import(…)` calls inside the
  `GuideCommand.execute` callback, as the file already does for `@src/core` and `./setup.js`,
  because that callback runs in the Vitest worker.
- `messages` is declared `readonly Message[]` rather than copied with the fence's `as const`.
- The byte-limit refusal stays a direct handler call: `limit` caps the body `createRelay` reads
  itself, while the server's own `limit` caps the `body()` a middleware context reads, and this
  composition calls neither.

## 2. Commands, exit codes, and counts

| Command | Exit | Reading |
| --- | --- | --- |
| `npm run test:guides` (before any edit, at `0102259`) | 0 | 43 passed (43), 1.17 s |
| `npm run lint` | 0 | no diagnostics, no rewrite |
| `npm run format` | 0 | 87 files scanned, no rewrite of my files |
| `npm run format:check` | 0 | all matched files use the correct format |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | `tsc --noEmit` on the root project and `configs/src/tsconfig.core.json` |
| `npm run test:guides` (after) | 0 | 43 passed (43), no skipped, no todo |
| `npm test` (observation) | 0 | src 753 passed over 23 files; policy 90 passed with 1 skipped; config 172 passed with 1 skipped; setup 54 passed; guides 43 passed |

The `guides` project reads 43 before and 43 after: one case renamed and rewritten, one case added,
one case folded into the rewritten one.

`npm run test:guides` rejects a reporter argument (`usage: npm run test:guides [-- --to guide|--to
source]`), so the per-case list surfaces only on a failure. Both relay cases are named in the
runner's failure list under the controls in section 5, which is what proves they are collected and
executed; the passing run reports 43 of 43 green.

## 3. Observations

- **The `stop()` duration in the cancel case: 0.348 ms.** Read from a forced-failure run of the
  drain assertion — `AssertionError: expected 0.34750000000008185 to be less than 0` — and 0.388 ms
  on a second run. The committed bound is 1000 ms, which is the brief's own deviation threshold.
  Nothing in this unit approached that stop condition.
- **The whole `npm test` chain exits 0.** The one skipped case in the `policy` project and the one
  in the `config` project predate this unit; the `guides` project has none.
- The guide's line numbers for the fence comment and the `## Tests` bullet each moved by two (1124 →
  1126, 1473 → 1475) because the prose at 1097 became two paragraphs. The fence lines are otherwise
  unchanged and the titled-example equality still holds.
- `guides/agent.md:1499` — "`@orkestrel/ndjson` … This package declares no dependency on it" — stays
  true and is untouched: `package.json` declares `@orkestrel/ndjson` in neither `dependencies` nor
  `devDependencies`.

## 4. Tree state

`git status --porcelain`:

```text
 M guides/agent.md
 M src/core/factories.ts
 M tests/guides.test.ts
```

`git diff --stat`:

```text
 guides/agent.md       |   8 ++-
 src/core/factories.ts |   2 +-
 tests/guides.test.ts  | 184 +++++++++++++++++++++++++++++++++++---------------
 3 files changed, 136 insertions(+), 58 deletions(-)
```

## 5. Controls run on the new assertions

Each control was applied by editing, read, and reverted by editing. No git command touched the tree.

- **The drain bound.** Changing `expect(drained).toBeLessThan(1000)` to `toBeLessThan(0)` reddened
  exactly the cancel case (1 failed, 42 passed) and printed the measured 0.348 ms. The assertion is
  live.
- **The declared route.** Changing `path: '/relay'` to `path: '/relayed'` in both dispatcher route
  tables, and nowhere else, reddened both new cases and nothing else (2 failed, 41 passed), the
  flagship case on `expected 404 to be 405`. That is what proves the calls traverse the dispatcher's
  route table over the socket rather than reaching the handler directly: a direct handler call
  cannot see a route path at all. The substring guard stayed green under that control, correctly,
  because it reads the guide's text rather than the transcription's.

## 6. Claims I flag

- **The drain bound on a contended host is the one reading I cannot take from inside my own exec.**
  The measurement here is 0.348 ms; the failure mode the bound guards — a reused keep-alive socket
  shared between a completed call and a cancel — costs the full `DEFAULT_DRAIN_MS` of 10 000 ms, so
  the bound sits between the two rather than near either. The Orchestrator's authoritative run after
  I exit is what settles it.
- **Everything else is measured, not inferred.** The loopback listeners bound unattended on every
  run in this unit, with no firewall prompt. Nothing in this unit is deferred.
