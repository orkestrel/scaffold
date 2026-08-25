# Unit VISIT-server — report

The setup proofs are written, the planned `test:guides` and `test` chain values are adopted,
`scaffold repair` runs clean, and every gate closes green. No commit was made.

## The advisory as taken

`npx --no-install scaffold audit`, run at `/home/user/orkestrel/server` before any edit, on
2026-08-25:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setup.ts, tests/setupServer.ts. Add tests/setup.test.ts, tests/setupServer.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
48 of 127 planned paths drifted from the plan. Audit compared bytes at 101, existence at 19, and nothing at 7. The plan does not own 7 further paths beneath its groups.
```

The proof work list is therefore `tests/setup.ts` and `tests/setupServer.ts`.

## Touched files

| File                        | Change                                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| `tests/setup.test.ts`       | New. The export-free module's surface contract.                                          |
| `tests/setupServer.test.ts` | New. One case per exported behavioral contract, each against a real loopback peer.       |
| `package.json`              | Adopted `test:guides`, `test:setup` written by `repair`, adopted the planned `test` chain |
| `vite.config.ts`            | `repair` registered the `setup` project and added it to `projects`                       |
| `package-lock.json`         | Arrived dirty from the scaffold ^0.0.52 re-pin; untouched by this unit                   |
| Vendored orchestration set  | `repair` rewrote the `orchestration` and `docs` groups                                   |

Diffstat over tracked files: `37 files changed, 575 insertions(+), 673 deletions(-)`, plus the
untracked `tests/setup.test.ts` (15 lines), `tests/setupServer.test.ts` (237 lines), and the
orchestration paths `repair` created.

## What each proof asserts

### `tests/setup.test.ts`

`tests/setup.ts` declares no export. It registers Vitest's own per-test mock restoration hook and
is the first setup file every project loads, so the contract a consuming suite depends on is that
loading it contributes no name of its own — a suite reaches shared helpers through
`@orkestrel/test` or through an environment setup module instead. One case:

- **contributes no exported name to a consuming suite** — `Object.keys` over the imported namespace
  equals the empty list.

The restoration hook is the runner's behavior rather than this workspace's, and proving it would
need a framework spy, so the file states in a comment that it is deliberately not re-proven.

### `tests/setupServer.test.ts`

Every case drives the exported helper against a real peer bound to `127.0.0.1` on an ephemeral port
through `createLoopback` from `@orkestrel/test/server`, and reads the outcome from the peer's own
observation rather than from the helper that produced it.

| Case                                                                     | Contract asserted                                                                                                   |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| anchors the workspace root at this package manifest                      | `WORKSPACE_ROOT` is a filesystem path whose `package.json` names `@orkestrel/server`, read by a second route (`node:fs` plus `JSON.parse`) |
| puts bytes fetch refuses on the wire and returns the peer answer         | `rawRequest` delivers the malformed `Host` request byte for byte, as the peer recorded it, and returns the peer's answer text |
| parks the answer bytes until the reader resumes                          | `openPausedResponse` reaches the requested path, delivers no byte to userland while paused, and delivers after `resume` |
| tears down a paused response that was never resumed                      | `destroy` settles `closed` from the paused state with no byte delivered                                             |
| reports a drop when the peer cuts the connection inside the window       | `probeConnectionDrop` returns true against a peer that destroys on connect                                          |
| reports no drop when the peer holds the connection through the window    | `probeConnectionDrop` returns false against a peer that holds the socket past the window                            |
| agrees with a real bind on the family this host accepts                  | `probeLoopback('127.0.0.1')` agrees with a direct bind taken in the same case                                       |
| refuses an address this host cannot bind                                 | `probeLoopback` returns false for `192.0.2.1`, an address reserved for documentation                                |
| completes the handshake and holds the socket until the peer cuts it      | `holdUpgrade` sends a real handshake at the requested path, reports `done` false while held, and settles `closed` when the peer cuts it |
| closes the client end on release, which the peer observes                | `release` closes the client socket and the peer reads the end of the client stream                                  |
| reports a claim with the handshake status and merges the extra headers   | `upgradeRequest` returns `{ claimed: true, status: 101 }` and the caller's `Sec-WebSocket-Key` reached the peer      |
| reports no claim with the status when the peer answers as plain HTTP     | `upgradeRequest` returns `{ claimed: false, status: 426 }`                                                          |
| reports no claim without a status when the peer destroys the socket      | `upgradeRequest` returns `{ claimed: false, status: 0 }` — the seam the shipped `requestUpgrade` reads as a transport failure |

The exported interfaces `UpgradeOutcomeInterface`, `PausedResponseInterface`, and
`HeldUpgradeInterface` carry no runtime behavior; each case asserts the shape its helper returns,
so no case exists for a type alone.

One measurement shaped the upgrade fixture. A claimed upgrade socket that never reads stays paused,
so the client's departure sits unread and the peer reports nothing; an upgraded socket also keeps
its writable side after the client leaves, so `end` is the peer's departure signal and `close` never
arrives. The fixture peer therefore resumes its socket and the release case waits on `end`. The
finding is recorded as a comment in the fixture.

## Mutation controls

Each control broke one asserted contract, was run through `npm run test:setup`, and was restored.
The restored files were re-run green.

| Proof file                  | Mutation                                                          | Failing line                                                                                                        |
| --------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `tests/setup.test.ts`       | expectation `toEqual([])` → `toEqual(['restore'])`                | `AssertionError: expected [] to deeply equal [ 'restore' ]` (`setup — module surface > contributes no exported name to a consuming suite`) |
| `tests/setupServer.test.ts` | expectation `toBe(RAW_ANSWER)` → `toBe(MALFORMED_REQUEST)`        | `AssertionError: expected 'HTTP/1.1 400 Bad Request\r\nConnectio…' to be 'GET / HTTP/1.1\r\nHost: foo bar\r\n\r…' // Object.is equality` (`setupServer — raw requests > puts bytes fetch refuses on the wire and returns the peer answer`) |

Each control run reported `Tests 1 failed | 13 passed (14)` and exit code 1. After restoration,
`npm run test:setup` reported `Tests 14 passed (14)` at exit code 0.

## The visit

Order as run:

1. Proofs written and driven green through the `probe` project, whose files were then removed.
2. `npm pkg set 'scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot --project guides'`.
3. `npx --no-install scaffold repair` — blocked as the brief predicted:
   `TARGET: The configs group is blocked because the manifest at . does not reach a Vitest project the planned configuration registers: setup.`
   The same message says `test:setup is already declared`, which was false at that moment: the
   manifest carried no `test:setup` key. That wording is the one inaccuracy observed in the run,
   and it does not change the recovery the message prescribes.
4. `npx --no-install scaffold repair --groups manifest` — `1 written, 1 unchanged, 0 removed in ..`,
   writing `test:setup`.
5. `npm pkg set 'scripts.test=npm run test:src && npm run test:policy && npm run test:config && npm run test:setup && npm run test:guides'`, matching the installed scaffold's compiler, which places `test:setup` between `test:config` and `test:guides`.
6. `npx --no-install scaffold repair` — `49 written, 79 unchanged, 0 removed in ..`, registering the
   `setup` project in `vite.config.ts`. A second run reported `0 written, 128 unchanged, 0 removed in ..`.
7. `npm run format` — `Finished in 4555ms on 146 files using 4 threads.`

`repair` named no retained differing script value in any run. The only script values adopted are
`test:guides` and the `test` chain the blocked `configs` group forced.

## Gates

Each run bare at `/home/user/orkestrel/server`, in order, after the controls were restored.

| Gate                   | Exit | Closing line                                                                    |
| ---------------------- | ---- | --------------------------------------------------------------------------------- |
| `npm run format:check` | 0    | `Finished in 3425ms on 146 files using 4 threads.` after `All matched files use the correct format.` |
| `npm run lint:check`   | 0    | `oxlint --config .oxlintrc.json --deny-warnings .` with no diagnostic             |
| `npm run check`        | 0    | `tsc --noEmit -p configs/src/tsconfig.server.json` with no diagnostic             |
| `npm run build`        | 0    | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts`               |
| `npm test`             | 0    | `src:server` 237 passed, 1 skipped; `policy` 93 passed; `config` 46 passed; `setup` 14 passed; `guides` 28 passed |

## Acceptance

- **No `setup:` advisory at exit.** `npx --no-install scaffold audit` reports only
  `dependencies: typescript declares major 6, while the registry serves major 7.` plus the foreign
  paths under the retired `orkestrel-human-journey` name, `.claude/agents/codex.md`, and
  `.codex/agents/claude.toml`, which the brief leaves to the Orchestrator. Path drift reads
  `0 of 127 planned paths drifted from the plan.`
- **Every gate green, each read bare.** See the preceding table.
- **One control per proof file, all restored.** See the controls table; `git diff` over the two
  proof files after restoration shows the asserted values back in place.

## Deviation state

None. The export-free `tests/setup.ts` was proven under the surface contract the dispatch named for
that case rather than stopped on.
