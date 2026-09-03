# Unit conform-websocket — report

Every numbered row and both fleet rows are closed. The gate chain is green in
`/home/user/fleet/websocket`. `git status --short` lists only files under Owned.

## Rows

| Row               | Disposition | Note                                                                                                            |
| ----------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| websocket-obj-1   | applied     | The three predicates moved into `src/server/helpers.ts`; `validators.ts` and its test relocated by `git mv`.     |
| websocket-obj-3   | applied     | `tests/setupGlobal.ts` reordered; `tests/setup.test.ts` lost both `import type` rows to websocket-obj-7.         |
| websocket-obj-4   | applied     | `requireValue` replaces the hand-rolled narrowing at `tests/setupServer.test.ts`.                                |
| websocket-obj-5   | applied     | `nextMessage` and `nextClose` rebuilt over `waitForEvent` with a measured budget; `connect` untouched.           |
| websocket-obj-6   | applied     | A `flagship fences` block executes the Surface, Patterns, encoder, and accept-token fences.                      |
| websocket-obj-7   | applied     | `createEchoServer` / `EchoServerInterface` extracted into `tests/setupServer.ts`; both callers rewired.          |
| websocket-obj-8   | applied     | `buildCorpus(rng)` moved into `tests/setupServer.ts` with the generator parameter and its own proofs.            |
| websocket-obj-9   | applied     | The false gate-placement clause replaced; the false `setupServer.ts` browser clause corrected with it.           |
| websocket-obj-10  | applied     | `README.md` Requirements now reads `Node.js >= 22.12.0`, matching `engines.node`.                                |
| websocket-obj-11  | applied     | `parseWebSocketCanonical` moved to `helpers.ts` and renamed `matchesWebSocketCanonical`. BREAKING.               |
| websocket-subj-1  | applied     | Every `AGENTS §N` citation removed from package-owned files; every `RFC 6455 §` citation kept.                   |
| websocket-subj-2  | applied     | Guide, README, and the `createNodeWebSocket` `@example` narrow the header before the call.                       |
| websocket-subj-3  | applied     | The `NodeWebSocketInterface` Surface Summary carries its data members; the Methods preamble points at that row.  |
| websocket-subj-4  | applied     | `NodeWebSocket` gained an `@example`; its constructor gained a TSDoc block with `@param` and `@throws`.          |
| websocket-subj-6  | applied     | `via`, `e.g.`, temporal `once`, and `simply` replaced; permitted senses recorded under § Sweeps.                 |
| websocket-subj-7  | applied     | Positional pointers replaced; the count and the ordinal in `tests/guides.test.ts` removed.                       |
| websocket-subj-8  | applied     | Five named Summary cells rewritten as noun phrases, plus the `matchesWebSocketCanonical` row and `parseUTF8`.    |
| websocket-subj-10 | applied     | `send(message: string)` and `ping(payload?: string)` in the interface, the class, and the guide.                 |
| websocket-subj-11 | applied     | `WEBSOCKET_CONTROL_MAX_LENGTH`, `WEBSOCKET_CLOSE_REASON_MAX_LENGTH`, `WEBSOCKET_CLOSE_TOO_BIG`. BREAKING.        |
| fleet-F1          | noop        | `isBrowserVuePath` is absent and the workspace declares no browser environment.                                  |
| fleet-F2          | noop        | No implementation class declares a public `readonly id: string` field.                                           |

### Dispositions that need their evidence stated

- **websocket-obj-3.** `tests/setupGlobal.ts` now opens with `import type { TestProject } from 'vitest/node'` followed by the single value import, so the interleaving is gone. In `tests/setup.test.ts` the row's two `import type` declarations (`Socket` from `node:net`, `NodeWebSocketInterface` from `@src/server`) had only one consumer each: the local `startEchoServer` that websocket-obj-7 deletes. Removing that fixture removed both declarations, so the file now carries value imports alone and the ordering rule has nothing left to order. That is the row's end state reached through the other row's edit, not a skipped row.
- **fleet-F1.** `rg 'isBrowserVuePath'` over the checkout excluding `node_modules` returns nothing. `tests/setup.ts` exports `buildText`, the four `INTEGRATION_*` constants, `connect`, `nextMessage`, and `nextClose`. The workspace has no `src/browser`, no `app/browser`, and no `tests/setupBrowser.ts`; `vite.config.ts` declares no browser project. The `setup` axis is untouched.
- **fleet-F2.** The package's implementation classes are `NodeWebSocket` (`src/server/NodeWebSocket.ts`) and `WebSocketError` (`src/server/errors.ts`); the test fixtures add `DuplexEnd` and the new `EchoServer` in `tests/setupServer.ts`. None declares a public `readonly id: string`. `WebSocketError` declares `readonly code` and `readonly context`, which the row does not name.

## Files touched

| File                                    | Summary                                                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `src/server/helpers.ts`                 | Absorbs the three predicates and the renamed `matchesWebSocketCanonical`; header, `@example`, and prose updated. |
| `src/server/validators.ts`              | Removed; its content merged into `helpers.ts` by `git mv`.                                                      |
| `src/server/parsers.ts`                 | Loses `parseWebSocketCanonical`; header points at `helpers.ts`; the `parseUTF8` remark drops its citation.     |
| `src/server/index.ts`                   | Drops the `./validators.js` barrel row.                                                                        |
| `src/server/NodeWebSocket.ts`           | Import block rebuilt, constants renamed, `send`/`ping` parameters renamed, class `@example` and constructor TSDoc added, comment citations and pointers replaced. |
| `src/server/constants.ts`               | Three constants renamed; `e.g.` and the section citation removed.                                              |
| `src/server/types.ts`                   | `send(message)` / `ping(payload)`, renamed constant references, citations removed.                             |
| `src/server/factories.ts`               | `@example` narrows `sec-websocket-key`; citation removed.                                                      |
| `src/server/errors.ts`                  | Citation removed from the header.                                                                              |
| `tests/setupServer.ts`                  | Adds `EchoServerInterface`, `EchoServer`, `createEchoServer`, and `buildCorpus`; false browser clause fixed.    |
| `tests/setupServer.test.ts`             | `requireValue` replaces the hand-rolled narrowing; adds `buildCorpus` and `createEchoServer` proofs.            |
| `tests/setupGlobal.ts`                  | Rewritten over `createEchoServer`; import order fixed; citation removed.                                       |
| `tests/setup.ts`                        | `nextMessage` and `nextClose` rebuilt over `waitForEvent` with a budget; citations removed.                     |
| `tests/setup.test.ts`                   | `startEchoServer` deleted; every case drives `createEchoServer`.                                                |
| `tests/guides.test.ts`                  | Adds the `flagship fences` block; count and ordinal removed from the header and the `INTERNAL` doc block.       |
| `tests/integration.test.ts`             | Header states the true gate placement; `via`, `below`, and `just` replaced.                                    |
| `tests/src/server/helpers.test.ts`      | Absorbs the guard cases and the `matchesWebSocketCanonical` block; header rewritten.                            |
| `tests/src/server/validators.test.ts`   | Removed; its cases merged into `helpers.test.ts` by `git mv`.                                                   |
| `tests/src/server/parsers.test.ts`      | Loses the canonical block and the local `buildCorpus`; imports the shared corpus; header and citations updated.  |
| `tests/src/server/NodeWebSocket.test.ts`| Renamed constants and suite name; comment citations and pointers replaced; one `via` in a case name replaced.    |
| `tests/src/server/factories.test.ts`    | Citation removed from the header.                                                                              |
| `guides/websocket.md`                   | Narrowed fences, noun-phrase Summaries, renamed symbols, citations removed, Tests and See-also rewritten.       |
| `guides/README.md`                      | Two citations removed.                                                                                         |
| `README.md`                             | Node floor corrected; the usage fence narrows the header.                                                      |

Diffstat, from `git -C /home/user/fleet/websocket diff HEAD --stat` after `git add -N`: 24 files
changed, 869 insertions, 623 deletions.

## Failing-first proofs

Each control plants a wrong body in the subject the row moved, extracted, or added, runs the
named script, and is then restored. Every control file sits in
`/home/user/work/evidence/websocket-proofs/`.

| Row              | Command                    | Control plant                                              | Red                     | Control file                    | Green after restore |
| ---------------- | -------------------------- | ---------------------------------------------------------- | ----------------------- | ------------------------------- | ------------------- |
| websocket-obj-1  | `npm run test:src`         | `isCloseCode` accepts `1005`                               | 3 failed \| 117 passed  | `obj-1-control.txt`             | 120 passed          |
| websocket-obj-11 | `npm run test:src`         | `matchesWebSocketCanonical` answers `false` below 126      | 28 failed \| 92 passed  | `obj-11-control.txt`            | 120 passed          |
| websocket-obj-4  | `npm run test:setup`       | `readClientFrames` collects a planted payload              | 1 failed \| 20 passed   | `obj-4-control.txt`             | 21 passed           |
| websocket-obj-8  | `npm run test:setup`       | `buildCorpus` drops the 65 536 length form                 | 1 failed \| 20 passed   | `obj-8-control.txt`             | 21 passed           |
| websocket-obj-5  | `npm run test:setup`       | `nextMessage` subscribes to `close`                        | 3 failed \| 18 passed   | `obj-5-control.txt`             | 21 passed           |
| websocket-obj-7  | `npm run test:setup`       | `createEchoServer` replies `reply:` instead of `echo:`     | 2 failed \| 19 passed   | `obj-7-control-setup.txt`       | 21 passed           |
| websocket-obj-7  | `npm run test:integration` | the same plant                                             | 9 failed \| 5 passed    | `obj-7-control-integration.txt` | 14 passed           |
| websocket-obj-6  | `npm run test:guides`      | `computeWebSocketAccept` hashes with `sha256`              | 1 failed \| 21 passed   | `obj-6-control.txt`             | 22 passed           |
| websocket-obj-6  | `npm run test:guides`      | `encodeWebSocketFrame` clears the FIN bit                  | 3 failed \| 19 passed   | `obj-6-control-fences.txt`      | 22 passed           |

Two readings are worth naming.

- The `websocket-obj-5` control reproduced the row's own defect statement. Its output carries
  `Error: Event "the next WebSocket message event" was not delivered within 4000ms`, which is the
  described, budgeted failure the raw `new Promise` could not produce; the old form hung to the
  runner's own timeout with no statement of what was awaited.
- The `websocket-obj-6` controls redden all four transcriptions between them — the accept token under
  the `sha256` plant, and the Surface, Patterns, and encoder fences under the FIN plant. Neither
  plant reddens any parity assertion, which is the row's point: name resolution never saw them.

The remaining rows are placement, naming, or documentation rows. Their proof is the sweep that the
old form is gone plus the gate that proves the new one, recorded under § Sweeps and § Gates.

### Budget measurement behind websocket-obj-5

`NEXT_EVENT_BUDGET_MS` is 4000. The `integration` project's slowest case, the 2 MB round trip, took
802 ms end to end on 2026-09-03 under `npx vitest run --reporter=verbose --project integration`; the
25-cycle open/echo/close case took 42 ms. The budget sits about 5x above that reading and below the
project's 5000 ms Vitest case timeout, so the named-event failure reaches the reader instead of the
runner's anonymous one. The number and its derivation are in the constant's own comment in
`tests/setup.ts`.

## Sweeps

Each pattern ran over the package-owned population: `src/**`, `tests/**` excluding the vendored
`setupPolicy.ts`, `policy.test.ts`, and `config.test.ts`, plus `guides/websocket.md`,
`guides/README.md`, and `README.md`. The vendored dependency mirrors `guides/{emitter,guide,contract,probe,scaffold,test}.md`
are excluded and were not edited.

| Pattern                                                                                 | Result                                                             |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `MAXLEN\|TOOBIG` and the case-insensitive `maxlen\|maxlens\|toobig`                       | no match                                                           |
| `parseWebSocketCanonical` and its `-s` / `-ed` / `-ing` inflections, case-insensitive     | no match                                                           |
| `startEchoServer` and its inflections, case-insensitive                                   | no match                                                           |
| `isBrowserVuePath`, case-insensitive                                                      | no match                                                           |
| `AGENTS §`, `(§<digit>`, `— §<digit>`, `§13\|§14\|§16\|§21\|§22`                          | no match outside RFC 6455 citations                                |
| `send\(data\|ping\(data`                                                                  | no match                                                           |
| `\bvia\b`, `e\.g\.`, `i\.e\.`, `\bsimply\b`, case-insensitive                             | no match                                                           |
| `rows above\|rows below\|the second assertion` in `guides/websocket.md`                   | no match                                                           |

Hits ruled permitted rather than rewritten, each named:

- `{ once: true }` in `src/server/NodeWebSocket.ts` and `tests/setup.ts` — a code identifier, exempt.
- `once` as a variable name in `tests/src/server/parsers.test.ts` — a code identifier, exempt.
- "runs ONCE in Node" (`tests/setupGlobal.ts`), "emits an active socket error once" and "fire #fail exactly once" (`tests/src/server/NodeWebSocket.test.ts`), "once per entry" (`tests/distribution.test.ts`), "retyping this line once already replaced it" (`tests/integration.test.ts`) — all the "one time" sense, not the temporal `after` sense.
- "just under 1" (`tests/setupServer.test.ts`) — `just` meaning barely, the sense the refuter already ruled permitted.
- "nothing above it" (`src/server/types.ts`), "the layer that sits over this one" (`guides/websocket.md`) — layering, not a pointer to other material.
- "below 126", "below `1000`" (`src/server/helpers.ts`) — numeric comparison, not a pointer.
- `and/or` in `LICENSE` — third-party license text, off-limits.

## Gates

Run from `/home/user/fleet/websocket` in the order `AGENTS.md` fixes. Each captured file sits in
`/home/user/work/evidence/websocket-proofs/`.

| Gate                   | Exit code | Reading                                                                        | File                    |
| ---------------------- | --------- | ------------------------------------------------------------------------------ | ----------------------- |
| `npm run format:check` | 0         | All matched files use the correct format (47 files)                            | `gate-format-check.txt` |
| `npm run lint:check`   | 0         | no output                                                                      | `gate-lint-check.txt`   |
| `npm run check`        | 0         | root `tsc` then `check:src:server`, no diagnostics                             | `gate-check.txt`        |
| `npm run build`        | 0         | built, declarations emitted and copied to `index.d.cts`                        | `gate-build.txt`        |
| `npm test`             | 0         | src:server 120, policy 111, config 46, setup 21, guides 22, integration 14      | `gate-test.txt`         |

Baseline readings at the committed HEAD, taken before any edit: src:server 120, policy 111,
config 46, setup 17, guides 18, integration 14; `format:check`, `lint:check`, and `check` green.
The suite grew by the `setup` project's four new fixture cases and the `guides` project's four
fence transcriptions.

**Observation, not a criterion.** The `npm test` reading was taken inside this unit's own exec with
its host resident. No case in it is timing-sensitive at the margin — the slowest project reports
1.3 s against a 5 s case timeout — but the deciding run belongs to the Orchestrator after this unit
exits.

## Breaking

The published surface moves, so `@orkestrel/websocket` bumps and republishes. No consumer source
edit is needed.

| Removed symbol                  | Replacement                         |
| ------------------------------- | ----------------------------------- |
| `parseWebSocketCanonical`       | `matchesWebSocketCanonical`         |
| `WEBSOCKET_CONTROL_MAXLEN`      | `WEBSOCKET_CONTROL_MAX_LENGTH`      |
| `WEBSOCKET_CLOSE_REASON_MAXLEN` | `WEBSOCKET_CLOSE_REASON_MAX_LENGTH` |
| `WEBSOCKET_CLOSE_TOOBIG`        | `WEBSOCKET_CLOSE_TOO_BIG`           |

`@orkestrel/mcp` imports `createNodeWebSocket`, `WEBSOCKET_READY_OPEN`, `WEBSOCKET_VERSION`, and
`NodeWebSocketInterface`. `@orkestrel/browser` imports `createNodeWebSocket`,
`WEBSOCKET_READY_CLOSED`, `WEBSOCKET_READY_OPEN`, `WEBSOCKET_VERSION`, and
`NodeWebSocketInterface`. Neither imports a removed name, so neither needs a source edit.

`send` and `ping` renamed their parameters. TypeScript has no named arguments, so no call site
changes; the `.d.ts` text moves and the bump above already covers it.

## Shared-file patches

None. No edit outside `/home/user/fleet/websocket` is required to keep this package's gates green.

Two propagation items belong to the Orchestrator rather than to this unit, because
`.claude/rules/documentation.md` § Parity forbids rewriting a vendored mirror:

- `/home/user/fleet/mcp/guides/websocket.md` and `/home/user/fleet/browser/guides/websocket.md` are
  byte mirrors of this package's guide. They carry the old constant names, the old
  `parseWebSocketCanonical` row, and the un-narrowed `sec-websocket-key` fences. Re-vendor both
  after `@orkestrel/websocket` publishes.

## Deviations

No deviation stopped the unit. Three decisions need recording.

1. **The file removals used `git mv`.** The dispatch grants `git mv` as the one tool that relocates
   a file and grants no removal command, while websocket-obj-1 requires `src/server/validators.ts`
   and `tests/src/server/validators.test.ts` to stop existing. The merged destination content was
   written into each source file first, then `git mv -f <source> <destination>` relocated it onto
   `helpers.ts` and `helpers.test.ts`. No `rm`, no `git rm`, and no discarding git command ran. The
   staged `D` rows in `git status --short` are that relocation.
2. **Two Summary cells beyond the five websocket-subj-8 names were rewritten.** The
   `matchesWebSocketCanonical` row, which the row's own amendment assigns to websocket-obj-11's
   writer, and the `parseUTF8` row, whose cell read "Decode bytes as strict UTF-8" — the last
   surviving imperative in a table the row exists to give one voice. Both now read as noun phrases.
3. **`NEXT_EVENT_BUDGET_MS` is module-private in `tests/setup.ts`.** It is an implementation detail
   of two sibling helpers in one module, the same shape `DuplexEnd` already has for `duplexPair` in
   `tests/setupServer.ts`. Exporting a tuning constant no test consumes would add surface against
   the minimal-API creation gate.

## Findings outside current scope

Recorded against the capability that owns them, for the next change, rather than reopening this one.

- `tests/src/server/NodeWebSocket.test.ts` carries `should` in a comment ("nothing after it should
  trigger a second close"). `.claude/rules/writing.md` § Substitutions bans it. No row in this brief
  names `should`; websocket-subj-6 enumerates `via`, `e.g.`, `i.e.`, temporal `once`, and `simply`
  only.
- `src/server/NodeWebSocket.ts` carries `currently` in a `#drain` comment ("every complete frame
  currently in the buffer"). Same row, same reason.
- `tests/guides.test.ts` and its "the second assertion below" and "The five constants below" lines
  are fleet-shared drop-in prose. This copy is fixed; the sibling packages carrying the same two
  lines are not, and the template the fleet regenerates the drop-in from is where the fix belongs.

## Fix round 1

### Fix round 2

1. **F1.** `tests/setup.ts:3` dropped `pure`; the clause now reads `and the browser WebSocket
   helpers.`
2. **F2.** The `Fix round 1` F1 entry now cites `tests/integration.test.ts:3-4` for the wrapped
   clause; the sweep entry's `new` row no longer carries the `setupPolicy.ts`'s excluded scope
   aside parenthetical, since the row's opening sentence already excludes `tests/setupPolicy.ts`.

1. **Claim 4.** `conform-websocket-report.md:84` corrected from `4 failed | 10 passed` to `9 failed
   | 5 passed`, matching `/home/user/work/evidence/websocket-proofs/obj-7-control-integration.txt:367`.
   Every other count in the failing-first table was re-read against its named file:
   `obj-1-control.txt:73` (3 failed | 117 passed), `obj-11-control.txt:608` (28 failed | 92 passed),
   `obj-4-control.txt:30` (1 failed | 20 passed), `obj-8-control.txt:33` (1 failed | 20 passed),
   `obj-5-control.txt:22` (3 failed | 18 passed), `obj-7-control-setup.txt:46` (2 failed | 19 passed),
   `obj-6-control.txt:30` (1 failed | 21 passed), `obj-6-control-fences.txt:82` (3 failed | 19
   passed). Every one already matched the table; none needed correction.
2. **F1.** `tests/setup.ts:39` now reads `// ── Browser WebSocket helpers (the platform \`WebSocket\`
   plus \`@orkestrel/test\`'s \`waitForEvent\` — no \`node:*\` API) ──`; the header's `:42` line
   dropped `framework-free` in the same rewrite, since both stood in the enumeration that
   overreached. `tests/integration.test.ts:3-4` now reads `browser helpers from \`tests/setup.ts\`
   (the platform \`WebSocket\` plus \`@orkestrel/test\`'s \`waitForEvent\` — no \`node:*\` API), and
   the injected` — the wrap moved the clause onto its own comment line.
3. **Checker F1.** `tests/src/server/NodeWebSocket.test.ts:1457` now reads `and nothing after it can
   trigger a second close.` — ability sense, `can`.
4. **Checker F2.** `src/server/NodeWebSocket.ts:274` now reads `// Decode every complete frame in the
   buffer, dispatching each and slicing`.
5. **Checker F3.** `tests/src/server/parsers.test.ts:296` now reads `// Exactly the 4-byte length
   prefix (2 base + 2 extended) buffered: measure`; `:302` now reads `// The full wire: parse agrees
   with what measure already reported.`
6. **Checker F4.** `tests/src/server/NodeWebSocket.test.ts:227` now reads `ws.destroy() // closed`;
   `:530` now reads `it('an additional data frame opened mid-message closes with 1002 (protocol
   error)', async () => {`.
7. **Sweep.** Pattern `\b(should|currently|now|new|framework-free)\b`, case-insensitive, over
   `src/**`, `tests/**` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`,
   `tests/config.test.ts`, and `tests/distribution.test.ts`, plus `guides/websocket.md`,
   `guides/README.md`, and `README.md`. Remaining hits, each ruled:
   - Every `new` hit in `src/**` and in the swept `tests/**` files (`guides.test.ts`,
     `integration.test.ts`, `setup.test.ts`, `setup.ts`, `setupServer.ts`, `setupServer.test.ts`,
     `NodeWebSocket.test.ts`) is the constructor keyword — permitted.
   - `tests/src/server/NodeWebSocket.test.ts:1289` — `ws.send('should be dropped')` — a payload
     string value the case under test asserts against, not prose describing behavior — permitted.
   - No `currently`, `now`, or `framework-free` hit remains in the swept population.
   - `guides/websocket.md`, `guides/README.md`, and `README.md` returned no match.

## Gates (fix round 1)

| Command                                          | Exit code |
| ------------------------------------------------- | --------- |
| `npm run format:check`                             | 0         |
| `npm run lint:check`                               | 0         |
| `npm run check`                                    | 0         |
| `npm run build`                                    | 0         |
| `npm test`                                         | 0         |

`npm test` readings: src:server 120, policy 111, config 46, setup 21, guides 22, integration 14 —
all passed, unchanged from the unit's own baseline.

`npx scaffold audit --offline` printed: `0 of 37 planned paths drifted from the plan. Audit compared
bytes at 23, existence at 5, and nothing at 9.`
