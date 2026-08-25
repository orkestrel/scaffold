# Unit VISIT-ollama — report

Done. The two reported setup modules carry proofs, `test:guides` and the vendored file set are on
the planned 0.0.52 values, the `setup:` advisory is gone, and every gate closes green. Nothing was
committed.

## The advisory as taken

`npx --no-install scaffold audit`, run first, at `/home/user/orkestrel/ollama`:

```text
scripts: The manifest at . declares a planned script with a differing value: test:guides. Keep the declared value unchanged or replace it with the planned value: "test:guides" declares "vitest run --config vite.config.ts --reporter=dot --project guides"; planned "vitest run --config vite.config.ts --no-cache --reporter=dot --project guides".
setup: The target at . carries test setup modules that no proof covers: tests/setupServer.ts, tests/setupService.ts. Add tests/setupServer.test.ts, tests/setupService.test.ts, each covering the module of the same name. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
dependencies: typescript declares major 6, while the registry serves major 7.
```

`48 of 128 planned paths drifted from the plan.` The work list is `tests/setupServer.ts` and
`tests/setupService.ts`. The `dependencies` advisory is the fleet-wide one the brief excludes.

## Touched files

| File                                    | Summary                                                                                              |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `tests/setupServer.test.ts`             | New. Proves the module's Node-resource contracts: the recording proxy, the capture wait, `drive`, the wire tables |
| `tests/setupService.test.ts`            | New. Proves the module's hermetic contracts against a protocol-faithful loopback daemon fixture      |
| `package.json`                          | `test:guides` set to the planned value; the 0.0.52 re-pin arrived dirty                              |
| `package-lock.json`                     | The 0.0.52 re-pin, arrived dirty                                                                     |
| The vendored orchestration file set     | Written by `scaffold repair`, then formatted                                                         |

Diffstat, tracked files: `36 files changed, 545 insertions(+), 598 deletions(-)`. Untracked: the two
proof files (249 and 380 lines) plus the vendored paths `repair` added —
`.agents/skills/orkestrel-debrief/references/retention.md`,
`.agents/skills/orkestrel-prove-journey/`, `.agents/skills/orkestrel-publish/`,
`.agents/templates/`, `.agents/transports/`, `.claude/skills/orkestrel-prove-journey/`, and
`.claude/skills/orkestrel-publish/`.

## What each proof asserts

### `tests/setupServer.test.ts`

`tests/setup.test.ts` already asserts this module's narrowing guards, tool fixtures, and environment
readers. This proof takes the half that file leaves open — the Node-resource behavior — and states
that split in its header rather than re-asserting anything. Every case runs against real sockets on
127.0.0.1 ephemeral ports; the reachable upstream a pass-through case forwards to is a fixture
server this file starts with `createDispatcher` and `createServer`.

- `createRecordingProxy` captures a call's method, path, headers, and parsed body before forwarding.
  The expectation is the literal object and header the case sent, not a value the module produced.
- `createRecordingProxy` forwards the body to a reachable upstream and returns that upstream's status
  and body verbatim; the fixture upstream's own recording is the second route on the forwarding.
- `createRecordingProxy` answers 499 when `stop` cancels a call still parked on the upstream. The
  upstream parks on `waitForAbort` rather than a delay, so the case has no timing race.
- `createRecordingProxy` releases its port on `stop`: a later fetch to the same URL rejects.
- `waitForRequest` resolves after the proxy captures the requested count.
- `waitForRequest` rejects with a message naming the count it waited for when the budget expires.
- `drive` separates content deltas from thinking deltas and hands back the generator's settled result
  by identity; the empty-stream case pins the boundary.
- `WEATHER_TOOL` is frozen and declares `city` as its only required parameter — the membership the
  wire-shape suites read off it.
- `insatiableResult` names its own chunk, the shared `INSATIABLE_TOOL_CHUNKS` total, and the next
  chunk on every line, which is the invariant the sustained-pressure loop relies on.

### `tests/setupService.test.ts`

`tests/setupService.ts` runs its readiness gate at import: it throws unless a daemon answers
`/api/tags` with the configured model installed, then warms that model. No live Ollama server is
available to the `setup` project, so the proof drives the module against a protocol-faithful Ollama
daemon fixture on a loopback ephemeral port — a foreign service the workspace does not own, which
`AGENTS.md` admits as a fixture server. The fixture must be listening before the module is
evaluated, which is why the import is deferred until the environment points at it. The proof's
header states that the live half — that a real daemon generates usable content, that the warmed
model answers within these prediction caps, that a live retry fits `RETRY_BUDGET` — is proven by the
`service` project driving a real daemon.

- The module load gate lists the daemon and then warms the selected model, in that order, posting a
  one-token non-streaming turn with `keep_alive: '30m'` and `think: false`.
- `OLLAMA_CONFIG` normalizes a scheme-less `OLLAMA_HOST` to an absolute HTTP URL, takes the model
  from `OLLAMA_MODEL`, and is frozen. The environment is deliberately set scheme-less so the
  normalization is load-bearing.
- `isOllamaReady` reports ready when the listing names the model under either wire field, `model` or
  `name`.
- `isOllamaReady` reports not ready when the listing omits the model.
- `isOllamaReady` reports not ready when the listing answers a non-OK status.
- `warmOllama` posts the one-token non-streaming turn that pins the model resident.
- `warmOllama` throws naming the status, the model, and the host when the daemon rejects the warmup.
- `createLiveOllama` targets the selected daemon and model, capping prediction at 32 tokens with
  temperature 0; the expectation is read off the fixture's recording of the wire.
- `createLiveOllama` carries a requested `predict` and `temperature` to the wire.
- `createLiveOllama` exposes a requested framing default on `format` and leaves it undefined when
  omitted.
- `createLiveSummarizer` appends the fixed instruction after the conversation as a final user turn —
  the module's own documented reason for not ending on an assistant turn.
- `createLiveSummarizer` caps the digest at 64 tokens by default and at the requested cap when given.
- `createLiveSummarizer` bounds the generation by the deadline it was built with; the fixture parks
  the route so the deadline is what ends the call.
- The sampling tables freeze a positive prediction cap at temperature 0, and only `SEED_OPTIONS`
  fixes a seed.
- `RETRY_BUDGET` matches the `service` project's declared `testTimeout`, read from `vite.config.ts`
  — the cross-artifact invariant that module's own `@remarks` states.
- Last, because it takes the fixture down: `warmOllama` throws naming the host and the model when
  the daemon cannot be reached.

## Mutation controls

One per proof file, applied to a copy of the assertion's input, run, then restored. Both restored
files compare byte-identical to their pre-mutation copies.

| Proof file                   | Control                                                        | Failing line                                                              |
| ---------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `tests/setupServer.test.ts`  | Sent header `x-trace: capture-case` changed to `mutated-trace` | `AssertionError: expected 'mutated-trace' to be 'capture-case' // Object.is equality` |
| `tests/setupService.test.ts` | `SUMMARY_INSTRUCTION` changed to `… in two sentences.`         | `AssertionError: expected { role: 'user', …(1) } to deeply equal { role: 'user', …(1) }` |

Command for each: `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project setup <file>`.
The `setupServer` control took that file from `10 passed (10)` to `1 failed | 9 passed (10)`; the
`setupService` control took its file from `16 passed (16)` to `1 failed | 15 passed (16)`. Both files
return to all-passing after restore.

## The visit

Order run: proofs written → `test:guides` adopted through
`npm pkg set 'scripts.test:guides=vitest run --config vite.config.ts --no-cache --reporter=dot --project guides'`
→ `npx --no-install scaffold repair` → `npm run format` → the gates.

The full `repair` ran clean on the first attempt. The `configs` group was not blocked, because the
declared `test` chain already invokes the `setup` project
(`npm run test:src && npm run test:setup && npm run test:policy && npm run test:config && npm run test:guides && npm run test:conformance`),
so the `--groups manifest` detour the brief describes was not needed and the `test` chain is
unchanged. `repair` closed with `48 written, 81 unchanged, 0 removed in ..`.

`repair` named no retained differing script value. The only script adopted is `test:guides`.

The foreign paths stand untouched, as the brief directs: the four
`.agents/skills/orkestrel-human-journey/` paths, `.claude/agents/codex.md`,
`.claude/skills/orkestrel-human-journey/SKILL.md`, and `.codex/agents/claude.toml`.

## Acceptance criteria

**1. No `setup:` advisory at exit.** `npx --no-install scaffold audit` reports only:

```text
dependencies: typescript declares major 6, while the registry serves major 7.
```

plus the seven foreign paths, and `0 of 128 planned paths drifted from the plan.` The `setup:` and
`scripts:` advisories are both gone.

**2. Every gate green.** Each read bare, in order:

| Gate                   | Closing line                                                                   |
| ---------------------- | -------------------------------------------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 4162ms on 161 files using 4 threads.` |
| `npm run lint:check`   | No diagnostics; the command produced no output beyond its npm banner            |
| `npm run check`        | No diagnostics from either `tsc --noEmit` project                               |
| `npm run build`        | `Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts`              |
| `npm test`             | Exit `0`. `test:src` 55 passed; `test:setup` 83 passed; `test:policy` 93 passed; `test:config` 46 passed; `test:guides` 18 passed; `test:conformance` 17 passed |

**3. One mutation-control failing line per proof file, all restored.** Recorded earlier; both files
verified byte-identical to their pre-mutation copies.

## Deviation state

None. One judgment the deviation contract left to me, recorded rather than escalated: proving
`tests/setupService.ts` at all required a daemon, because the module gates its own import on one.
The brief's primary objective — prove the hermetic contracts in the `setup` project and name the
live half as proven by the `service` project — is met by driving a protocol-faithful loopback
fixture rather than a live Ollama server, and the proof's header states the split. No live daemon
took part, and no project-owned behavior is simulated anywhere in either file.

Two consequences of the off-limits list, for the Orchestrator to route or discard rather than for me
to act on:

- `tests/setup.test.ts` opens with a comment claiming it proves both `tests/setup.ts` and
  `tests/setupServer.ts`. `tests/setupServer.test.ts` now owns part of that subject. The claim in
  that header is stale, and that file is off-limits to this unit.
- `tests/setupService.test.ts` declares its daemon fixture locally, because
  `.claude/rules/tests.md` § Shared test infrastructure would otherwise place it in a `tests/setup*.ts`
  module, and those modules are off-limits to this unit. It serves one proof file today.

## Header correction

The Orchestrator adopted the first recorded consequence as an in-scope correction and granted
`tests/setup.test.ts` for its header comment only. The stale claim that the file proves both
`tests/setup.ts` and `tests/setupServer.ts` is replaced with what the file actually asserts, read
off its own `describe` blocks and imports.

That file proves, from `tests/setup.ts`, the conversation padding (`buildTurns`), the throwing
summarizer (`createThrowingSummarizer` and `THROWING_SUMMARIZER_MESSAGE`), and the workspace seeder
(`fillWorkspace`). From `tests/setupServer.ts` it proves the host-independent half: the
request-narrowing guards (`parseRequestBody`, `forwardHeaders`, `isAbortError`, `wireMessages`,
`wireTools`, `wireText`, `systemText`), the refusing transport, the tool fixtures
(`createLookupTool`, `createThrowingTool`, `createInsatiableTool`), the agent-stream driver
(`driveAgent` over `createScriptedAgentStream`), and the environment readers (`env`, `withScheme`).
The new header points at `tests/setupServer.test.ts` for the Node-resource half of that module and
at `tests/setupService.test.ts` for the hermetic half of `tests/setupService.ts`, naming the
`service` project as the proof of its live half.

`git diff --stat tests/setup.test.ts` reports `1 file changed, 15 insertions(+), 5 deletions(-)`,
in the single hunk `@@ -1,5 +1,15 @@`. No code, import, or assertion moved.

Both gates re-run bare after the edit:

| Gate                   | Closing line                                                                    |
| ---------------------- | --------------------------------------------------------------------------------- |
| `npm run format:check` | `All matched files use the correct format.` / `Finished in 3131ms on 161 files using 4 threads.` |
| `npm run test:setup`   | `Test Files  3 passed (3)` / `Tests  83 passed (83)`                              |

The local daemon-fixture placement in `tests/setupService.test.ts` stays as-is, accepted with its
single consumer. Nothing committed.
