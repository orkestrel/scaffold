# Independent verification of the high-severity sweep findings

Each finding was handed to a verifier told to reproduce it with an executed measurement or refute
it, and told that `UNPROVEN` is a real answer and a correction is worth as much as a confirmation.

## [REPRODUCED] severity high — Vitest worker stdout is piped into the same process.stdout that frames JSON-RPC, so a claim whose test writes to file descriptor 1 corrupts the MCP response stream of /tmp/probe-audit3/dist/bin/main.js.

**Evidence.** MECHANISM (source, both in the checked-out tree and in the built artifact that actually ran):
- /tmp/probe-audit3/src/server/stages/RuntimeStage.ts:102 and its build at /tmp/probe-audit3/dist/src/server/index.js:499 call `createVitest("test", { ... })` with two arguments.
- Installed declaration /tmp/probe-audit3/node_modules/vitest/dist/node.d.ts:125: `declare function createVitest(mode: VitestRunMode, options: CliOptions, viteOverrides?: UserConfig$1, vitestOptions?: VitestOptions)`. `VitestOptions` (node_modules/vitest/dist/chunks/reporters.d.DtoKVV2s.d.ts:1216-1221) is `{ packageInstaller?; stdin?; stdout?: NodeJS.WriteStream | Writable; stderr?: ... }`. It is unset.
- Unset means the default: node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:1883 `constructor(ctx, outputStream = process.stdout, errorStream = process.stderr)`.
- node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js:1871-1237ff `ThreadsPoolWorker`: `this.stdout = options.project.vitest.logger.outputStream`, then `start()` builds `new Worker(entrypoint, { ..., stdout: true, stderr: true })` and `this._thread.stdout.pipe(this.stdout)`. A worker's raw fd-1 bytes therefore land on the host's process.stdout — the stream `createStdioServer` frames newline-delimited JSON-RPC on.

EXECUTED RUN 1 — command: `cd /tmp/probe-audit3 && node <driver>.mjs`, driver spawns `node /tmp/probe-audit3/dist/bin/main.js` with cwd /tmp/probe-audit3, stdio pipe, sends `initialize`, `notifications/initialized`, then `tools/call` of `prove` with project `tsconfig.json`, case `{files:[], test:{path:'tmp/probe/v-stdout-case.test.ts', text: "import { expect, test } from 'vitest'\ntest('writes to stdout', () => {\n\tprocess.stdout.write('XCORRUPTX')\n\texpect(1).toBe(1)\n})\n"}}`, control the same shape failing at `runtime`.
Raw child stdout, verbatim (JSON.stringify of the captured buffer, truncated at the response body):
"{\"id\":1,\"jsonrpc\":\"2.0\",\"result\":{\"capabilities\":{\"tools\":{}},\"protocolVersion\":\"2025-11-25\",\"serverInfo\":{\"name\":\"probe\",\"version\":\"0.0.1\"}}}\nXCORRUPTX{\"id\":2,\"jsonrpc\":\"2.0\",\"result\":{\"content\":[{\"text\":\"probe 39a3e852-... (616 ms)\\n...receipt probe:39a3e852-...:runtime:typescript@6.0.3:oxlint@1.79.0:vitest@4.1.11\",\"type\":\"text\"}]}}\n"
Per-line parse:
  line 0: VALID-JSON | len=142
  line 1: NOT-JSON (Unexpected token 'X', "XCORRUPTX{"... is not valid JSON) | len=583 | containsMark=true
The corrupted line is the answer to the client's own `tools/call` id 2, and the verdict inside it is fully green and carries a receipt. The corruption rides a successful response, not an error path.

EXECUTED RUN 2 (blast-radius characterization) — same driver, case test body changed to `console.log('CONSOLEMARK')` + `process.stderr.write('STDERRMARK')` + `process.stdout.write('XCORRUPTX-A\nSPURIOUSLINE\n')`. Wall time 9.3 s.
Raw stdout per-line parse:
  line 0: VALID-JSON | len=142   (initialize response)
  line 1: NOT-JSON (Unexpected token 'X', "XCORRUPTX-A" is not valid JSON) | len=11
  line 2: NOT-JSON (Unexpected token 'S', "SPURIOUSLINE" is not valid JSON) | len=12
  line 3: VALID-JSON | len=575   (tools/call response, intact)
Child stderr captured: `STDERRMARK`. `CONSOLEMARK` appeared on neither stream.

Both runs left the worktree clean (`git status --porcelain` shows only the pre-existing untracked ROUND3.diff and u4a-last.md; tmp/probe/ holds only another verifier's file), and `ps` shows no leaked oxlint, vitest, or main.js process.

**Correction to the claim.** The defect is real and at least as large as claimed, with three refinements the claim did not state.

1. Two distinct failure modes, selected by whether the test's write ends in a newline. A write with no trailing newline PREFIXES the next protocol line and makes that line unparseable — run 1 destroyed the client's own `tools/call` response. A write ending in a newline instead INJECTS whole spurious non-JSON lines between responses — run 2 left the response intact but fed the client two garbage lines. Both break a newline-delimited JSON-RPC client; only the first loses a response.

2. The escape is raw fd-1 writes, not test logging in general. `console.log` from the worker was swallowed: Vitest intercepts `console` in the worker and RPCs it to `onUserConsoleLog`, which the stage's custom reporter (RuntimeStage.ts:108-113, only `onInit` and `onTestRunEnd`) does not implement. So the common form of test output is already contained, and the exposure is `process.stdout.write`, `process.stdout.fd` writes, and any child process a test spawns with inherited stdio. That narrows how often this fires accidentally, and does not narrow the hostile case at all.

3. Severity is higher than "corrupts a response". Because the client parses per line, a claim's test can emit arbitrary well-formed JSON-RPC lines onto the server-to-client stream — a fabricated result for an id the client is waiting on, or a fabricated notification. A claim is untrusted input to this service, so this is response forgery over the transport, not only noise. Run 2 proves injected lines survive the transport intact and are delimited exactly as real ones are.

Not affected: the lint stage. `src/server/stages/LintStage.ts:101-103` spawns oxlint with `stdio: 'pipe'`, so it cannot reach the host's stdout. The type stage is in-process and writes nothing.

Also observed but outside the framing defect: worker stderr reaches the host's stderr verbatim (`STDERRMARK`). Harmless to JSON-RPC framing, still a leak into the host's diagnostics.

**Repair direction.** Pass the fourth `createVitest` argument at src/server/stages/RuntimeStage.ts:102 and bind both streams away from the transport: `createVitest('test', { ... }, undefined, { stdout, stderr })`, where `stdout` is a `node:stream` `Writable` the transport never uses. Discarding is acceptable because the stage's reporter already ignores console output; forwarding to `process.stderr` preserves the operator's view of a noisy test without touching fd 1. Do not fix this by patching `process.stdout.write` in the host — the worker's bytes arrive through `worker.stdout.pipe(logger.outputStream)`, so the only seam that closes it is the stream Vitest's `Logger` is constructed with.

Guard it with a proof that would have failed before the change: drive the built `dist/bin/main.js` as a child process over newline-delimited JSON-RPC, send a `prove` whose case test executes `process.stdout.write('XCORRUPTX')`, and assert that every non-empty line of the child's stdout parses as JSON and that no line contains the marker. Cover both variants — a write with a trailing newline and one without — because they fail differently and a test covering only one passes against a half fix. `tests/src/bin/main.test.ts` currently only reads the entry's source and states that driving the running entry belongs to a proof that can own a spawned child; this is that proof.

## [REPRODUCED] severity medium — RuntimeStage's per-run eviction removes nothing from the resident Vitest's retained state. `src/server/stages/RuntimeStage.ts:142-149` calls `vitest.state.clearFiles(project, [file])`, `vitest.clearSpecificationsCache(file)`, and `vitest.invalidateFile(file)` in its `finally`. Only `clearSpecificationsCache` deletes a key. Because every inspection writes a fresh revision file named with `randomUUID()`, each inspection permanently adds one key to `state.filesMap`, one node to each project environment's Vite module graph, and one entry per task to `state.idMap`. Growth is exactly linear in the number of inspections, with no flattening and no release.

**Evidence.** INSTRUMENT. Scripts under /tmp/probe-audit3/tmp/probe/v-evict-*.mjs (deleted after the runs), each importing `RuntimeStage` from /tmp/probe-audit3/dist/src/server/index.js against workspace /tmp/probe-audit3 with `test.path` under `tmp/probe/`, which `inferTestProject` routes to the `probe` Vitest project. The stage's Vitest instance is private (`#vitest`), so the script created one throwaway Vitest with `createVitest`, closed it, took `Object.getPrototypeOf(throwaway)`, and patched `runTestSpecifications` on that shared prototype to capture `this` — the real stage's own instance. Every run destroyed the stage in a `finally`.

MEASUREMENT A — growth curve, 30 inspections, real stage, distinct test text each time, one declared path (`tmp/probe/v-evict-long.test.ts`), one test per file, `globalThis.gc()` before each heap reading. Command: `node --expose-gc tmp/probe/v-evict-long.mjs`. First and last rows, with the intermediate 28 rows exactly on the same line:
  {"i":1,"idMap":2,"filesMap":1,"graph":3,"heapMB":26.99}
  {"i":10,"idMap":20,"filesMap":10,"graph":12,"heapMB":27.92}
  {"i":20,"idMap":40,"filesMap":20,"graph":22,"heapMB":28.03}
  {"i":30,"idMap":60,"filesMap":30,"graph":32,"heapMB":28.09}
Per inspection: idMap +2, filesMap +1, module graph +1, heap +0.038 MB. Linear across all 30 points.

MEASUREMENT B — per-call attribution, 6 inspections, wrapping `StateManager.prototype.clearFiles`, `Vitest.prototype.clearSpecificationsCache`, and `Vitest.prototype.invalidateFile` to snapshot sizes before and after each call, filtered to the revision path. Command: `node tmp/probe/v-evict-mechanism.mjs`. Every inspection produced the identical three rows:
  {"call":"state.clearFiles","delta":{"idMap":0,"filesMap":0,"specCache":0,"graphIds":0}}
  {"call":"clearSpecificationsCache","delta":{"idMap":0,"filesMap":0,"specCache":-1,"graphIds":0}}
  {"call":"invalidateFile","delta":{"idMap":0,"filesMap":0,"specCache":0,"graphIds":0},"nodesBefore":[1],"nodesAfter":[1]}
`clearFiles` nets zero. `invalidateFile` leaves the module node in place — `getModulesByFile` returns one node before and one after. `clearSpecificationsCache` is the only call that deletes anything.

MEASUREMENT C — scaling with task count, 5 inspections of a file with 2 describes and 6 tests. Command: `node tmp/probe/v-evict-shape.mjs`.
  {"i":2,"idMap":18,"filesMap":2,"idMapDelta":9,"filesMapDelta":1}
  {"i":5,"idMap":45,"filesMap":5,"idMapDelta":9,"filesMapDelta":1}
idMap grows by 1 + suites + tests per inspection (9 = 1 file + 2 suites + 6 tests), not by one entry.

MEASUREMENT D — repair proof, 12 inspections with an explicit key sweep applied after each. Command: `node tmp/probe/v-evict-fix.mjs`. Identical row every iteration:
  {"i":12,"findings":0,"before":{"idMap":2,"filesMap":1,"graph":3},"after":{"idMap":0,"filesMap":0,"graph":2}}
The curve is flat, and all 12 inspections still returned 0 findings, so the extra eviction does not break the runs.

SOURCE CORROBORATION (Vitest 4.1.11, /tmp/probe-audit3/node_modules/vitest/dist/chunks/cli-api.CnMVyzaz.js):
  L12085 `clearFiles(project, paths)` builds `createFileTask$1(path, ...)`, calls `this.idMap.set(fileTask.id, fileTask)` and `this.filesMap.set(path, [fileTask])`. It deletes nothing, and it does not touch the child suite and test ids that `collectFiles` -> `updateId` put in `idMap`.
  L13597 `clearSpecificationsCache(moduleId)` -> L11535 `this._cachedSpecs.delete(moduleId)`.
  L13966 `invalidateFile(filepath)` calls `moduleGraph.invalidateModule(module)`; Vite 8.2.1 `invalidateModule` (node_modules/vite/dist/node/chunks/node.js:34757) clears `transformResult`, `ssrModule`, and the etag entry, and removes nothing from `idToModuleMap`, `urlToModuleMap`, or `fileToModulesMap`.

BLAST RADIUS. `src/server/Probe.ts:70` builds one `RuntimeStage` at construction, and `#recycle` (L230-249) replaces it only from the `catch` in `#inspectRuntime` when the deadline expired. There is no periodic recycling, so the stage and its Vitest live for the process. Each `prove` runs the case and the control through the runtime stage, so a resident service accumulates two inspections' worth of state per proof.

**Correction to the claim.** The claim is right about the mechanism and understates the magnitude in one dimension. `filesMap` and the Vite module graph grow by exactly one entry per inspection, as claimed. `state.idMap` grows by 1 + suites + tests per inspection, not by one: measured +2 for a single-test file, +4 for one describe with two tests, +9 for two describes with six tests. Two further precisions. First, `clearFiles` is not merely inert — it re-registers a placeholder file task under the same key, so the map key survives even though the collected result is dropped; the child suite and test ids from the run are never touched at all. Second, the stage's own fields are clean: `#revisions` is deleted per run and `#modules` is bounded by the workspace file count, so the entire leak lives inside the retained Vitest instance. On absolute size, the per-inspection cost is small — 0.038 MB of post-GC heap for a one-test file, roughly 26,000 inspections per gigabyte — so this is unbounded growth in a resident service rather than a near-term crash. That is why the severity is medium and not high. The stage's own TSDoc at RuntimeStage.ts:22-24 states each inspection "evicts its result", which the measurement shows it does not.

**Repair direction.** Evict by the revision path directly instead of relying on `clearFiles` and `invalidateFile`. Keep `vitest.clearSpecificationsCache(file)` — it is the one call that works — and replace the other two with explicit deletion: `vitest.state.filesMap.delete(file)`; delete every `vitest.state.idMap` entry whose task resolves to `file` (`task.file?.filepath ?? task.filepath`); and for each `project.vite.environments` entry delete the module from `moduleGraph.idToModuleMap`, `moduleGraph.urlToModuleMap`, and `moduleGraph.fileToModulesMap`. Measurement D ran exactly that sweep across 12 inspections and held every counter flat with findings still correct.

Two warnings for whoever implements it. Vite 8.2.1's `EnvironmentModuleGraph.onFileDelete(file)` looks like the supported answer and is not: node_modules/vite/dist/node/chunks/node.js:34749-34756 only detaches importer back-references and deletes no map entry. And the sweep above reaches into Vite internals, which `AGENTS.md` would flag; if that is unacceptable, the alternative repair is to bound the stage's lifetime instead — reuse a stable revision path per declared test so each inspection overwrites one key rather than minting a new one, or extend `Probe.#recycle` to replace the stage after a fixed inspection count rather than only on a deadline expiry. Whichever route is taken, the acceptance criterion is the flat curve: run 30 inspections and show `state.idMap.size`, `state.filesMap.size`, and the summed `moduleGraph.idToModuleMap.size` returning to the same value after each one.

## [REPRODUCED] severity high — TypeStage applies candidate-source overlays before the try whose finally clears them, so a case whose `files` contain a good path followed by a workspace-escaping path pins an attacker-chosen in-memory copy of a real workspace file on the resident stage.

**Evidence.** Code, /tmp/probe-audit3/src/server/stages/TypeStage.ts lines 148-170: `this.#overlay(subject.test)` and `for (const source of subject.files) this.#overlay(source)` run BEFORE `try {`; the `finally` that deletes those overlay keys is attached only to the block that follows. `#overlay` (line 172) calls `resolveWorkspaceFile`, which throws `Path escapes the workspace: <target>` (/tmp/probe-audit3/src/server/helpers.ts lines 15-23). A throw from the second overlay therefore leaves the first overlay installed with no clearing path.

Executed measurement. Script (since deleted) at /tmp/probe-audit3/tmp/probe/v-overlay-check.mjs imported `TypeStage` from /tmp/probe-audit3/dist/src/server/index.js against workspace /tmp/probe-audit3, using the real file `src/core/constants.ts` and a virtual reader `src/core/vOverlayReader.ts` whose text is `import { PROBE_STAGES } from './constants.js'` / `export const VOVERLAY_COUNT: number = PROBE_STAGES.length`.

Command: `cd /tmp/probe-audit3 && timeout 110 node tmp/probe/v-overlay-check.mjs`
Output (verbatim):
A baseline (clean stage, reader imports REAL from disk): []
B poison case (REAL overlaid, then a bad path) threw: "Path escapes the workspace: ../v-overlay-escape.ts"
C after poison (reader alone; REAL not in files): ["src/core/vOverlayReader.ts:1 Module '\"./constants.js\"' has no exported member 'PROBE_STAGES'."]
D again (same case, second later inspection): ["src/core/vOverlayReader.ts:1 Module '\"./constants.js\"' has no exported member 'PROBE_STAGES'."]
DISK still real: "import type { Stage } from './types.js'"
E control (REAL overlaid, no bad path): []
F after control (reader alone): []
EXIT=0

Reading: step B's case was `files: [{ path: 'src/core/constants.ts', text: 'export const VOVERLAY_POISON = 1\n' }, { path: '../v-overlay-escape.ts', text: '' }]`. The first overlay landed, the second threw, and no finally ran. Steps C and D are ordinary later inspections that do not name `src/core/constants.ts` at all, yet the type stage now reads the poison text for that real file — the disk file is untouched (`DISK still real`). Step E is the control: the identical poison overlay with the bad path removed reaches the finally, and F confirms the stage is clean again, so the leak is caused by the overlay sitting outside the try and nothing else.

Reachability (read, not executed): `isSource`/`SOURCE_SHAPE` constrain `path` only to a non-empty string (/tmp/probe-audit3/src/core/validators.ts line 52, /tmp/probe-audit3/src/core/shapers.ts line 18) — no containment check exists before the stage. `Probe.prove` (/tmp/probe-audit3/src/server/Probe.ts lines 86-109) emits and rethrows the error and does not destroy the probe, so the poisoned resident TypeStage survives the failed claim and serves every later claim in that process.

**Correction to the claim.** Two refinements to the claim, neither of which weakens it.

1. The pin is not merely "stale": the overlay text is supplied by the caller, so the type stage serves an attacker-chosen body for a real workspace file. A later claim can be made to pass or fail against text that is not on disk, which defeats the receipt's premise.

2. "For the life of the process" holds with one escape hatch the claim does not mention: the entry is also removed when a later case includes that exact path and completes normally, because that case's finally deletes it (steps E and F above). Absent such a case, or a `destroy`, it persists indefinitely.

Trigger precision: the bad path must follow at least one good overlay. A case whose only bad path is `test` pins nothing, because `test` is overlaid first. Any path `resolveWorkspaceFile` rejects works — `../x.ts` or an absolute path.

**Repair direction.** Move both overlay applications inside the try, and make the finally clear exactly what was applied rather than re-deriving keys from `subject`.

The straightforward move alone is not sufficient: the current finally re-calls `resolveWorkspaceFile(this.#workspace, source.path)` for every source (lines 165-168), so a bad path in the middle of `files` would throw inside the finally and leave every later source pinned. Collect the resolved paths as they are applied — for example `const applied: string[] = []` outside the try, `applied.push(path)` from `#overlay`'s resolution, and `for (const path of applied) this.#overlays.delete(path)` plus the matching `#versions.delete(path)` in the finally — so clearing cannot itself throw.

Note that `#versions` is never cleared by the current finally either; the entry survives every inspection until `destroy`. That is presently harmless because `#version` consults `#overlays.has(file)` first, but it grows unbounded per distinct path and should be deleted alongside the overlay.

Separately, reject a path that escapes the workspace at admission (`isSource` / `SOURCE_SHAPE`) so a malformed claim is refused at the wire rather than part-way through a stage.
