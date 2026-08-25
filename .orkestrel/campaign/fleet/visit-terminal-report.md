# Unit VISIT-terminal — report

Done. The setup proofs are written and green, `test:guides` and the `test` chain carry their
planned values, `scaffold repair` ran clean, and every gate closes green. Nothing is committed.

## The advisory as taken

`npx --no-install scaffold audit`, run at the start of the unit in
`/home/user/orkestrel/terminal`, opened with these advisory lines:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupServer.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

The table reported drift across the orchestration group plus the foreign paths the brief named. The
`dependencies` line is the fleet-wide advisory the brief placed out of scope.

## Touched files

| File                         | Summary                                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `tests/setup.test.ts`        | New proof of the host-independent setup module's exported behavior                  |
| `tests/setupServer.test.ts`  | New proof of the Node-only setup module's exported behavior                          |
| `package.json`               | `test:guides` planned value, `test:setup` written by repair, planned `test` chain    |
| `vite.config.ts`             | `setup` project added by repair and registered in the root project list              |
| `package-lock.json`          | Arrived dirty from the `^0.0.52` re-pin; untouched by this unit beyond that baseline |

Repair also rewrote the vendored orchestration group (`.agents/**`, `.claude/**`, `.codex/**`,
`CLAUDE.md`). Those are files repair regenerates, so they sit inside the unit's owned scope; no
vendored file was hand-edited.

Diffstat over the tracked files this unit changed:

```text
 package-lock.json | 336 +++++++++++++++++++++++++++---------------------------
 package.json      |   9 +-
 vite.config.ts    |  13 ++-
 3 files changed, 185 insertions(+), 173 deletions(-)
```

The proof files are untracked: `tests/setup.test.ts` at 328 lines, `tests/setupServer.test.ts` at
162 lines.

## What each proof asserts

Both files carry one case per behavioral contract the consuming suites rely on, derived from
reading those suites. No case is a census of exported names, and no case re-proves production
behavior the mirrored suites already own. Every expectation comes through a route the setup module
cannot share.

### `tests/setup.test.ts`

Consumers read: `tests/src/core/{Prompt,PromptClient,TerminalManager,factories,helpers,
MemoryTerminalStore,DatabaseTerminalStore}.test.ts`, `tests/src/server/Terminal.test.ts`,
`tests/integration.test.ts`.

- `createManualTimer` holds every armed callback until `flush`. The second route is the host clock:
  a real `waitForDelay(20)` past both arming delays must still leave the recorder empty. A second
  `flush` fires nothing, and `pending` returns to zero.
- `createManualTimer` drops a cancelled callback from `pending` and from the flush, and the cancel
  is idempotent. `Prompt.test.ts` asserts `timer.pending` is zero after a cancel, so this is
  load-bearing rather than incidental.
- `createSSEResponse` frames each event as the wire format the real `@orkestrel/sse` parser reads
  back: the parsed event names, the parsed JSON payloads, the `text/event-stream` content type read
  against the core `ACCEPT_EVENT_STREAM` constant, and an empty `flush` proving every event was
  terminated by its own blank line.
- `createJSONResponse` carries the value as a JSON body under the default status and an explicit
  one, decoded by the real `Response.json` reader.
- `feedReducer` returns an untouched active step for an empty key list. The reducer supplied throws,
  so a fold that ran at all would redden the case.
- `feedReducer` decodes each raw key before the reducer sees it and threads each step's state
  forward. A CSI arrow arrives as `up` and the control bytes arrive under their names, which is what
  routing through `parseKey` means at this boundary.
- `createRecordingTerminal` answers each form with the next scripted values and records a snapshot
  taken at the interface boundary. The recorded entry still reports the unanswered form after the
  live form has settled, which is the property `PromptClient.test.ts` reads its schema assertions
  from.
- A deferred recording terminal holds the form live: `active` is the form, its status stays
  `editing` across a real host delay, and `release` settles it with the scripted answer. A release
  against a settled form is inert.
- A refused scripted answer throws, and it throws where the answer is written rather than through
  the returned promise.
- `createTwelveControlSchema` covers every control in the form package's own `FIELD_CONTROLS`, each
  under its own name, and passes `auditSchema` clean.
- `createPendingForm` builds an envelope the real `isPendingForm` guard accepts, with its defaulted
  id, status, and time, with `from` and `to` absent unless supplied, and with a payload the real
  `parseForm` recovers as the fixture schema. This carries `createFormSchema` as the default
  payload.
- `createHostileText` wraps clean text in real ANSI: the console stripper removes exactly the ANSI
  and leaves the clean text plus the raw control bytes a display sanitizer still has to handle.
- `createHostilePattern` surrounds regex source with a real OSC sequence and stays compilable by the
  host `RegExp` constructor.
- `createHostileSchema` writes a control byte into every schema string a terminal can render. The
  walk is a `JSON.parse` reviver over the serialized fixture, so it reaches every string leaf rather
  than a named list of slots; `control` is the single exempt position because it is a discriminant
  rather than rendered text.
- `createHostileWireSchema` passes the form parse boundary the authored hostile schema is refused
  at: `auditSchema` reports problems and `parseForm(serializeForm(...))` returns `undefined` for the
  authored fixture, while the wire twin audits clean and survives the round trip whole.
- `TERMINAL_STORE_SCENARIOS` is frozen and its labels name each case exactly once, which is what the
  store suites' `it.each(...)('$label', ...)` registration needs.
- The table's cases together reach `get`, `set`, and `delete`. The drive target is an inert stub that
  answers nothing and records only which methods arrive; the values each case expects are the store
  contract, proven by the `MemoryTerminalStore` and `DatabaseTerminalStore` suites against the real
  backends.

### `tests/setupServer.test.ts`

Consumers read: `tests/src/server/{Terminal,factories}.test.ts`, `tests/integration.test.ts`.

- `createStreamTarget` records every write in order, returns `true` from `write`, reports a non-TTY
  sink by default, and presents an interactive one when asked.
- `createFakeTTY` delivers a pushed chunk through a real `EventEmitter` that `on` and `off` register
  against. The listener count is the emitter's own, so a listener the module failed to register
  cannot be reported as registered; after `off`, a push reaches nothing. Both a string and a
  `Uint8Array` chunk are driven.
- `createFakeTTY` counts raw-mode transitions rather than `setRawMode` calls: repeating the same mode
  does not move `enters` or `exits`.
- `createFakeTTY` splits the transcript. `text()` equals what the real console stripper returns over
  the concatenated writes, `rawOutput` keeps every byte, and the two differ on styled output.
- `createScriptedTTY` delivers one script per listener registration, in order, and off the host
  queue: nothing arrives inside the registration call, the next registration draws the next script
  rather than replaying the first, and a registration past the last script delivers nothing.
- `createScriptedTTY` carries the same recording TTY contract as the manually pushed one — the
  stripped and raw transcripts and the raw-mode transition counters.
- `createLineInput` ends a real `PassThrough` carrying the lines, with the trailing newline by
  default, without it when told, and empty when the script is empty. The drain is a real stream read,
  so a stream that never ended would hang rather than pass.

## Mutation controls

One control per proof file. Each broke one asserted expectation in place, was watched red under
`npm run test:setup`, and was restored.

- `tests/setup.test.ts` — the `feedReducer` decode expectation was changed from the decoded key name
  to the raw escape sequence. Failing line:

  ```text
  FAIL  |setup| tests/setup.test.ts > feedReducer > decodes each raw key and threads the state through the fold
  ```

  with `AssertionError: expected [ 'A', 'up', 'return', 'c' ] to deeply equal [ 'A', '\u001b[A', 'return', 'c' ]`
  at `tests/setup.test.ts:140:22`. The run reported `Tests  1 failed | 23 passed (24)`.

- `tests/setupServer.test.ts` — the scripted-TTY second-registration expectation was changed to the
  first script, the replay a broken implementation would produce. Failing line:

  ```text
  FAIL  |setup| tests/setupServer.test.ts > createScriptedTTY > delivers one script per listener registration, in order and off the host queue
  ```

  with `AssertionError: expected [ [ '\u0004' ] ] to deeply equal [ [ 'Ada' ], [ '\r' ] ]` at
  `tests/setupServer.test.ts:119:24`. The run reported `Tests  1 failed | 23 passed (24)`.

After both restorations `npm run test:setup` reported `Tests  24 passed (24)`.

## The visit

Order run: proofs written → `test:guides` adopted → `scaffold repair` blocked its `configs` group →
`scaffold repair --groups manifest` wrote `test:setup` → the planned `test` chain adopted → full
`scaffold repair` clean → `npm run lint` → `npm run format` → the gates.

The first full `repair` refused with:

```text
TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup. No chain from test or prepublishOnly invokes it. test:setup is already declared, so the gate is missing rather than the script: invoke it by name from the test or prepublishOnly chain. Exclude configs from --groups to write another group.
```

Note for the Orchestrator: that message states `test:setup is already declared` while the manifest
at that moment declared no such script. `npm pkg get scripts` before the `--groups manifest` run
listed `test`, `test:src`, `test:src:core`, `test:src:server`, `test:policy`, `test:config`,
`test:integration`, `test:guides`, `test:distribution`, `test:probe`, and `test:bench` — no
`test:setup`. The advisory's remedy still resolved the block, so this is a wording defect in
scaffold's blocked-group message rather than a blocker here.

The planned `test` chain was read from the installed compiler at
`node_modules/@orkestrel/scaffold/dist/src/core/index.js`, which composes the chain as `test:src`,
`test:policy`, `test:config`, `test:setup`, `test:guides`, `test:conformance`, `test:integration`.
Adopting it therefore also moved `test:integration` after `test:guides`, where the declared chain
had it before. Manifest changes made:

```text
-"test": "npm run test:src && npm run test:policy && npm run test:config && npm run test:integration && npm run test:guides",
+"test": "npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides && npm run test:integration",
-"test:guides": "vitest run --config vite.config.ts --reporter=dot --project guides",
+"test:guides": "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides",
+"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"
```

`repair` added the `setup` project to `vite.config.ts` and registered it in the root project list.

### Retained differing values

None. `test:guides` was the only differing script value the audit named, and it was adopted. The
closing `scaffold audit` reports no `scripts:` advisory and no `setup:` advisory.

## Gate evidence

Each command was run from `/home/user/orkestrel/terminal` and read bare.

| Gate                  | Closing line                                                             |
| --------------------- | -------------------------------------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` — `Finished in 7278ms on 165 files using 4 threads.` |
| `npm run lint:check`   | No diagnostics; exit code 0                                              |
| `npm run check`        | `tsc --noEmit` clean across the root, core, and server projects; exit code 0 |
| `npm run build`        | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts`; exit code 0 |
| `npm test`             | Exit code 0; every project green                                          |

`npm test` per project:

```text
test:src         Test Files  10 passed (10)   Tests  124 passed (124)
test:policy      Test Files   1 passed (1)    Tests   93 passed (93)
test:config      Test Files   1 passed (1)    Tests   46 passed (46)
test:setup       Test Files   2 passed (2)    Tests   24 passed (24)
test:guides      Test Files   1 passed (1)    Tests   48 passed (48)
test:integration Test Files   1 passed (1)    Tests    2 passed (2)
```

## Closing audit

`npx --no-install scaffold audit` at exit:

```text
dependencies: typescript declares major 6, while the registry serves major 7.
0 of 132 planned paths drifted from the plan. Audit compared bytes at 117, existence at 5, and nothing at 10. The plan does not own 7 further paths beneath its groups.
```

No `setup:` advisory and no `scripts:` advisory. The foreign paths remain and were left alone as the
brief directs: `.agents/skills/orkestrel-human-journey/**`, `.claude/skills/orkestrel-human-journey/SKILL.md`,
`.claude/agents/codex.md`, and `.codex/agents/claude.toml`. The `typescript` advisory is the
fleet-wide item the brief placed out of scope.

## Deviation state

No deviation. Both reported modules export behavior the fixed proof shape reaches, so neither the
export-free case nor the environment-split case arose. Every gate passed on its first run after the
formatter converged.

Working instruments used during the unit lived under `tmp/probe/` and were removed before the gates;
`tmp/probe` no longer exists. Nothing was committed and no git state was changed.
