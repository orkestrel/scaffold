# Unit VISIT-middleware — report

## The advisory as taken

`npx --no-install scaffold audit`, run at `/home/user/orkestrel/middleware` before any edit:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupServer.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
48 of 131 planned paths drifted from the plan. Audit compared bytes at 103, existence at 19, and nothing at 9. The plan does not own 7 further paths beneath its groups.
```

## Touched files

- `tests/setup.test.ts` — new. Proof of the host-independent harness.
- `tests/setupServer.test.ts` — new. Proof of the Node-only fixtures.
- `package.json` — `test:guides` adopted at the planned value, `test:setup` written by
  `scaffold repair --groups manifest`, the `test` chain adopted with `test:setup` between
  `test:config` and `test:guides`. The `@orkestrel/scaffold` re-pin to `^0.0.52` arrived dirty.
- `vite.config.ts` — `scaffold repair` added the `setup` project and registered it in `projects`.
- `package-lock.json` — arrived dirty from the re-pin; untouched by this unit.
- The `orchestration` group files `scaffold repair` rewrote or created, listed in the diff.

Diffstat over the files this unit changed:

```text
 package.json   |  9 +++++----
 vite.config.ts | 13 ++++++++++++-
 tests/setup.test.ts       | 207 +++++++++++++ (new)
 tests/setupServer.test.ts | 287 +++++++++++++ (new)
```

## What each proof asserts

The subject in each case is exported test-infrastructure behavior a consuming suite drives its
scenarios with. Consumption was read off the import blocks: `tests/src/core/middlewares.test.ts` and
`tests/src/server/middlewares.test.ts` import from `tests/setup.ts`;
`tests/src/server/helpers.test.ts` and `tests/src/server/middlewares.test.ts` import from
`tests/setupServer.ts`. Every expectation is derived by a route the module under proof cannot share.

### `tests/setup.test.ts`

- `buildRequest` joins a path and its query onto the fixed test origin and carries `method`,
  `headers`, and `body` through. Second route: the literal `http://test.local/users?limit=2`.
- `createTestContext` derives `url` and `method` from the request and threads the caller's state
  object in place, so a middleware writing to `context.state` writes the caller's object.
- `createTestContext` reads the request body once and answers every later call from the same
  promise. A `Request` body is readable once, so the repeat read is what proves the cache. Second
  route: the platform's `JSON.parse` over the same literal payload.
- `createTestContext` caps the body at `TEST_BODY_LIMIT`: a text body at the cap reads back at that
  length, and one byte past it rejects with `ContentTooLargeError`. This pins which limit the
  harness wires, not the peer's limit arithmetic.
- `createEchoTerminal` answers the marker body at the default status and at a requested one. Second
  route: the literal `echo`, asserted of both the response body and `ECHO_MARKER`.
- `createRecordingTerminal` records every request and context it is reached with, in order, by
  identity, and answers the marker at the requested status.
- `createRecordingNext` records each substituted request — including the absent one as `undefined` —
  and answers with the response it was given, defaulting to a fresh marker response.
- `runChain` runs the middleware outermost first around the terminal and returns the chain's
  response. Second route: a hand-written call order the middleware push into, plus the terminal's
  own status and body surviving the outer wrapper.
- `createManualClock` starts at its start value, accumulates each `advance`, and jumps to a `set`
  value.

### `tests/setupServer.test.ts`

- `PNG_MAGIC` and `JPEG_MAGIC` carry the real signature bytes. Second route: `latin1` and `hex`
  decodings compared against the signatures written as text.
- `createAssetSource` reads a mapped asset, answers an absent key with the fallback, answers with
  `undefined` when the fixture carries no fallback, and records each requested path in order.
- `createAssetSource` hands out a snapshot of the requested paths: a snapshot taken earlier does not
  grow when a later read lands.
- `buildStaticFixture` seeds a real tree on disk — the root index, the nested page, the dotfile, the
  binary file opening with the PNG signature, the 200_000-byte large file filled with `0x41`, the
  reserved-device name and its lookalike — and `scratch.destroy()` removes the tree. The
  reserved-device path is asserted present exactly where a POSIX host can hold it, because Windows
  reserves the `NUL` name.
- `buildSymlinkFixture` links one path inside root and one to a target outside it: `realpathSync`
  keeps the first under root and puts the second outside it, each link reads its target's contents,
  and `destroy()` removes both roots. Gated to POSIX, citing the privileged `CreateSymbolicLink`
  right the fixture's `link` calls cannot assume on Windows — the same gate the consuming suite uses.
- `buildDirectoryIndexFixture` points the subdirectory `index.html` at a file outside root: the
  entry is a symlink, its real path escapes root, it reads the outside secret, and `destroy()`
  removes both roots. Same POSIX gate.
- `countActiveFileRequests` rises above its baseline while a real `node:fs` read stream is mid-read
  and returns to the baseline after the stream is destroyed, waited for by condition rather than by
  delay. The driving stream is `createReadStream`, not the package's own `streamFile`.
- `detectClosedHandle` reports an open real `FileHandle` as live and the same handle as released
  after `close()`.
- `buildMultipartBody` encodes the parts as a real wire body carrying the given boundary, including
  a file part with a declared `Content-Type` and one without. Second route: the whole body compared
  against a hand-transcribed CRLF literal.
- `buildMultipartBody` gives each body a fresh `test-boundary-` prefixed boundary when the caller
  names none.
- `buildMultipartRequest` posts the encoded parts as a body the runtime's own `formData` parser
  reads back as the field value and as a `File` with the declared name, type, and bytes.
- `buildCancelTrackingMultipartRequest` feeds the body in chunks no larger than the requested chunk
  size and flips its `cancelled` flag when the reader cancels a still-open stream. The single
  500-byte field outsizes the chunk, so the stream is open at the cancel; cancelling a closed stream
  is a specified no-op and would prove nothing.

## Mutation controls

One per proof file, each mutating a copy of the expectation, run red, then restored. Command for
both: `npm run test:setup`.

- `tests/setup.test.ts` — the expected chain order entry `'inner:GET:/orders'` changed to
  `'inner:POST:/orders'`:

  ```text
   FAIL  |setup| tests/setup.test.ts > runChain > runs the middleware outermost first around the terminal and returns the chain response
  AssertionError: expected [ 'outer:enter:GET', …(4) ] to deeply equal [ 'outer:enter:GET', …(4) ]
   ❯ tests/setup.test.ts:183:17
        Tests  1 failed | 20 passed (21)
  ```

- `tests/setupServer.test.ts` — the transcribed wire literal's `Content-Type: image/png` changed to
  `Content-Type: image/jpeg`:

  ```text
   FAIL  |setup| tests/setupServer.test.ts > buildMultipartBody > encodes the parts as a real wire body carrying the given boundary
  AssertionError: expected '--fixed-boundary\r\nContent-Dispositi…' to be '--fixed-boundary\r\nContent-Dispositi…' // Object.is equality
   ❯ tests/setupServer.test.ts:200:48
        Tests  1 failed | 20 passed (21)
  ```

Both restored; `npm run test:setup` back to `Tests  21 passed (21)`.

## The visit

Order run: proofs written → `test:guides` adopted through `npm pkg set` → the first full
`npx --no-install scaffold repair` deferred as the brief describes →
`npx --no-install scaffold repair --groups manifest` wrote `test:setup` → the `test` chain adopted
through `npm pkg set`, with `test:setup` between `test:config` and `test:guides`, matching the
installed scaffold compiler's assembly at
`node_modules/@orkestrel/scaffold/dist/src/core/index.js:4290` → full `npx --no-install scaffold repair` → `npm run format` → gates.

`repair` named no retained differing script value. The full run closed
`49 written, 83 unchanged, 0 removed in ..`, and a second full run closed
`0 written, 132 unchanged, 0 removed in ..`, so it is idempotent here.

## Gates

Each read bare at `/home/user/orkestrel/middleware`, after the last edit.

- `npm run format:check` → `All matched files use the correct format.` / `Finished in 3147ms on 162 files using 4 threads.`
- `npm run lint:check` → no diagnostic printed, exit status `0`.
- `npm run check` → no diagnostic printed, exit status `0` (root project plus `check:src:core` and `check:src:server`).
- `npm run build` → `✓ built in 2.70s`, then `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts`.
- `npm test` → `test:src` `Tests  404 passed | 1 skipped | 1 todo (406)`; `test:policy` `Tests  93 passed (93)`; `test:config` `Tests  46 passed (46)`; `test:setup` `Tests  21 passed (21)`; `test:guides` `Tests  33 passed (33)`.

The skipped case and the todo case in `test:src` are pre-existing in `tests/src/server/helpers.test.ts`:
the win32-only `it.runIf` case at line 103 and the `it.todo` at line 1172. Neither file is owned by
this unit.

## Audit at exit

`npx --no-install scaffold audit` reports no `setup:` advisory and no `scripts:` advisory. What
remains:

```text
dependencies: typescript declares major 6, while the registry serves major 7.
0 of 131 planned paths drifted from the plan. Audit compared bytes at 117, existence at 5, and nothing at 9. The plan does not own 7 further paths beneath its groups.
```

The `foreign` rows are the retired `orkestrel-human-journey` paths plus `.claude/agents/codex.md`
and `.codex/agents/claude.toml`, left alone as the brief directs. The `typescript` advisory is the
fleet-wide one the brief excludes.

## Claims I flag

- `createRecordingNext`, `JPEG_MAGIC`, and `TEST_BODY_LIMIT` are exported by the setup modules but
  imported by no consuming suite. I proved each anyway, on the reading that an exported harness
  contract with no proof reads as working. If the Orchestrator holds the stricter reading — prove
  only what a suite imports — those cases are the ones to strike.
- The reserved-device assertion in `buildStaticFixture` uses `process.platform !== 'win32'`, the
  same expression the fixture uses to decide whether to seed the file. Detecting the host's reserved
  names by a genuinely separate route would need a write attempt against the device name, which is
  the behavior `tests/src/server/helpers.test.ts` already proves for `isReservedDeviceName`.
- The gate readings are this unit's own, taken inside its exec. The authoritative sweep belongs to
  an independent `verifier`.

## Deviation

None. Nothing outside the owned files was edited, no git state was changed, and no commit was made.
