<!-- U13b — implementer (Opus 5, native), the real-model page proof in ollama. Retained verbatim from the completion notification, 2026-09-15 (1922 s, 148 tool uses). -->

Unit complete. Report follows.

## Touched files

| File | Summary |
| --- | --- |
| `tests/setup.ts` | Adds `PAGE_TOOL`, the `ToolDefinition` the page script, the model, and the wire assertions all read. |
| `tests/setupServer.ts` | Adds the page fixture's Node half — `WORKSPACE_ROOT`, `MODULES_PATH`/`DIST_PATH`/`CONTROL_PATH`, `buildImportMap`, `readModuleEntry`, `PAGE_DOCUMENT`, `serveFile`, `createPageFixture`, `reservePort`, `createPageSession`, `readPage`, and the page-outcome guards; consolidates the three copies of the request-record literal into `readRequest` and the relay route into `buildRelayRoute`, which `createRelayServer` and `createPageFixture` both mount. |
| `tests/setupService.ts` | Adds `PAGE_BROWSER_ARGS`, `requirePageBrowser`, `requireBuild`, `requireDaemonOrigin`, each resolved on call and none at module load. |
| `tests/setupServer.test.ts` | Proves the Node half: the shared recorder, the relay route, the derived map and its omission control, the document, the contained file route, the fixture's routes with and without a provider, the port reservation, `PAGE_TOOL`, and every guard. |
| `tests/setupService.test.ts` | Extends the fixture daemon with an `OPTIONS /api/chat` preflight route and `origins`/`preflights`, and proves each gate's refusal and reading. |
| `tests/service/page.test.ts` | New. The live page proof: the five cases the brief names. |
| `guides/ollama.md` | Contract 13 states the gated reading in place of the manual Chrome 148 one; `### Running in the browser` names the preflight and `OLLAMA_ORIGINS`; `### Relaying through your own server` points at the fixture; `## Tests` names the file, its cases, and its gates. |

## Diffstat

```
 guides/ollama.md           |  13 +-
 tests/setup.ts             |  26 ++
 tests/setupServer.test.ts  | 316 +++++++++++++++++++++
 tests/setupServer.ts       | 649 ++++++++++++++++++++++++++++++++++++++++++---
 tests/setupService.test.ts |  94 +++++++
 tests/setupService.ts      | 109 +++++++-
 6 files changed, 1162 insertions(+), 45 deletions(-)
```

`git status --porcelain`: ` M guides/ollama.md`, ` M tests/setup.ts`, ` M tests/setupServer.test.ts`, ` M tests/setupServer.ts`, ` M tests/setupService.test.ts`, ` M tests/setupService.ts`, `?? tests/service/page.test.ts`.

## Baseline readings

Taken at `295fecb`, on the clean tree, before editing.

| Command | Reading |
| --- | --- |
| `npm run check` | exit 0 |
| `npm run test:setup` | exit 0, 3 files, 96 tests, 724 ms |
| `npm run test:service` | **exit 1** — `Ollama service tests require qwen3.5:2b-q4_K_M at http://localhost:11434`; 12 files failed, no tests ran, 3.10 s |

**Standing condition corrected, not a deviation.** The brief states the daemon answers on `http://localhost:11434`. It did not: `curl` reported `connect to 127.0.0.1 port 11434 failed: Connection refused`. Ollama was installed at `C:\Users\mikes\AppData\Local\Programs\Ollama\ollama.exe` and not running, so I started `ollama serve` detached and confirmed `/api/tags` lists `qwen3.5:2b-q4_K_M`. **The daemon is still running; the Orchestrator's authoritative run needs no further setup.** Re-baseline after starting it: `npm run test:service` exit 0, 12 files, 61 tests, **105.53 s** (that run paid the cold model load).

## Unknowns

| Unknown | Reading |
| --- | --- |
| 1 — an import-map ES-module page on `127.0.0.1`, one `request` event, one `evaluate` result | **Settled: yes.** Probe served a two-module import map; Chromium resolved it, the log carried `GET /`, three module fetches, and a later `GET /control`, and `evaluate` returned. A second probe served the derived map over every installed `@orkestrel` package and imported `@orkestrel/agent`: the whole closure (`agent`, `ndjson`, `tool`, `contract`, `database`, `queue`, `workflow`, `abort`, `timeout`, `emitter`, `workspace`, `budget`) loaded with `ERRORS []` and `CONSOLES []`. Planner risk 1 is clean — no closure defect exists to route. |
| 2 — `evaluate` resolving a promise parked on `globalThis` by an inline module | **Settled: yes.** `page.evaluate('globalThis.run()')` returned the awaited JSON string. |
| 3 — the daemon's preflight for an ephemeral `http://127.0.0.1:<port>` origin | **Settled: permitted.** `OPTIONS /api/chat` returned `204` with `access-control-allow-origin: http://127.0.0.1:54321`; the same for a `localhost` origin; `http://example.com` returned `403` with no allow header. No `OLLAMA_ORIGINS` change was needed, and the foreign origin is the control proving the check can refuse. |

Two further readings the design needed: a `<link rel="icon" href="data:,">` in the document removes the `GET /favicon.ico` the first probe recorded, which is why the operation window can assert equality rather than filtering; and `ToolInterface.execute` returns the handler's value directly rather than a `ToolResult`, so the page tool returns its receipt.

All probes were deleted. `tmp/` is absent.

## Tests, red readings, and the receipt

Command for every reading: `npx vitest run --config vite.config.ts --no-cache --reporter=verbose --project service tests/service/page.test.ts`.

**`evaluates the published agent closure in a real page from an import map`** — 635 ms. Red first: the whole file, **5 failed / 0 passed**, `Condition "the page driver to park its operations" did not hold within 30000ms`, because `buildImportMap` derived only the installed tree and this workspace is not installed in itself, so `@orkestrel/ollama` did not resolve. Green after `buildImportMap` also maps the root package's own entry under `/dist`.

**`executes a page tool through an agent over a live Ollama relay and feeds its result into the next model turn`** — 1655 ms, one attempt. Three controls, each reverted:

| Control | Planted | Reading |
| --- | --- | --- |
| A — a stray page request in the window | `void fetch('', { cache: 'no-store' })` in the tool handler | **1 failed**: `expected [ 'POST /inference', 'GET /', 'POST /inference' ] to deeply equal [ 'POST /inference', 'POST /inference' ]` |
| B — the tool's value diverging from the DOM | `return receipt + '-diverged'` | **1 failed**: `expected value "receipt-…-diverged" ` against the DOM's `"receipt-…"` at the `toMatchObject` line |
| C — a receipt drawn from outside the population | searched the wire for `receipt-00000000-0000-4000-8000-000000000000` | **1 failed**: `expected 0 to be greater than or equal to 1` |

**`records a deliberate page request outside the agent operation`** — 595 ms. This case is itself the positive control for A's empty-window assertion.

**`rejects a page relay credential before contacting Ollama`** — 605 ms. Control D: sending `OBFUSCATED` instead of `${OBFUSCATED}-wrong` gives **1 failed**, `expected undefined to be defined` on `outcome.failure`.

**`drives the daemon directly from the page behind its origin gate`** — 1007 ms.

Setup control E: making `buildImportMap` admit a package with no ESM root entry gives **1 failed**, `+ "@orkestrel/beta": "/modules/beta/index.js"`.

### Receipt

Captured by a throwaway probe driving the same scenario, since deleted.

- **Browser**: `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`, engine `edge`, product version **153.0.4234.32**.
- **Model and host**: `qwen3.5:2b-q4_K_M` at `http://localhost:11434`. Page origin `http://127.0.0.1:62912`.
- **Installed artifact identities**: `node_modules/@orkestrel/agent/dist/src/core/index.js` sha256 `6cb92c48fd98e7553ab3937817e01261c50e5f9ef3cb6603aa6cb1f242b1288d` (172351 bytes) is **byte-identical** to `package/dist/src/core/index.js` inside `scaffold/tmp/tarballs/orkestrel-agent-0.0.22.tgz`; `@orkestrel/tool` sha256 `3677f6fe818e67d5721afd3b3ba2599cd8560bc14ec0b2aaf9541b7cc3fc3dc6` (11617 bytes) is byte-identical to `orkestrel-tool-0.0.14.tgz`. The lockfile still names the registry `resolved`/`integrity` for each, which is what a `--no-save` install leaves. `@orkestrel/browser` 0.0.16, `@orkestrel/test` 0.0.14, `@orkestrel/contract` 0.0.17.
- **Turns**: `[0, 1]`.
- **Model's recorded call**: `{ id: 'call_hofokh77', name: 'record', arguments: { note: 'kyoto' } }`.
- **Agent's `tool` result**: `{ id: 'call_hofokh77', name: 'record', success: true, value: 'receipt-e3117c1f-a6df-4ca5-a148-4fa77fb30a25' }`.
- **DOM receipt** read through `evaluate`: `[{ note: 'kyoto', receipt: 'receipt-e3117c1f-a6df-4ca5-a148-4fa77fb30a25' }]`.
- **Page requests in the window**: `["POST /inference","POST /inference"]`.
- **Relay requests**: 14 `GET` loads, then two `POST /inference`, each carrying `authorization: Bearer obfuscated-7f3a-token`. The second carries `{"id":"…","role":"tool","content":"\"receipt-e3117c1f-…\""}`.
- **Daemon requests**: two `POST /api/chat`, both advertising `{"type":"function","function":{"name":"record",…}}`. The second carries `{"role":"tool","content":"\"receipt-e3117c1f-…\""}`.
- **Feedback message / completion**: `content: 'The tool returned the following value: "receipt-e3117c1f-a6df-4ca5-a148-4fa77fb30a25"'`, `partial: false`, `usage { prompt: 751, completion: 68, total: 819 }`.
- **Positive control**: `{ status: 200, text: 'control' }`; the browser log slice is exactly `['/control']`, the Resource Timing drain names it, and the fixture recorded it.
- **Direct case**: `PREFLIGHT permitted`; `{ name: 'ollama', content: 'It seems like your message might be incomplete' }`; requests `["POST http://127.0.0.1:64832/inference","POST http://127.0.0.1:64832/inference","POST http://localhost:11434/api/chat","OPTIONS http://localhost:11434/api/chat"]`. **The preflight is its own recorded request and arrives after the `POST`**, which is exactly why the case filters on method, origin, and path and never on a total.

## Per-helper reuse rulings

| Declared | Ruling |
| --- | --- |
| `createPageFixture`, `PAGE_DOCUMENT`, `buildImportMap`, `readModuleEntry`, `serveFile` | No installed export serves a derived import map or an `@orkestrel` module tree. Declared. |
| `createPageSession` | Composes `createBrowser` with the fixture and the readiness wait; no installed export does. Declared. |
| `readRequest`, `buildRelayRoute` | **Consolidations, not additions.** The record literal existed in three copies and the relay route in one that the fixture would have duplicated. Both now have one home; `createRecordingTransport`, `createRecordingProxy`, `createRelayServer`, and the fixture all route through them. |
| `reservePort` | `guides/test.md` § Limits **refuses** a reserve-then-release picker in `@orkestrel/test` and directs a caller to `createLoopback`, which binds a server the test owns. A launched browser binds the CDP port itself and must be handed the number, so `createLoopback` cannot serve. Declared, with the race and `cdp.discover: false` named in its `@remarks`. |
| Browser profile | **Not declared.** `createBrowser` allocates its own temporary profile through `createBrowserProfile` and removes it on `destroy()`; a scratch directory here would duplicate an installed export. |
| Waits | `waitForCondition` for page readiness, `retryUntil` for the model's choice — both installed. No polling loop or deadline read written. |
| Guards | `isToolCall` from `@orkestrel/tool`; `isRecord`/`isString`/`isNumber`/`isBoolean`/`arrayOf`/`parseJSONAs` from `@orkestrel/contract`. `isToolOutcome`, `isAgentOutcome`, `isPageOutcome`, `isPageReceipts`, `isPageControl`, `isPageGeneration` narrow this fixture's own JSON report; no installed export covers that shape. |
| `requireValue`, `flattenHeaders`, `resolveContained`, `resolveRoot`, `createScratch` | Installed, reused. |
| `PAGE_BROWSER_ARGS` | `browser/tests/setupService.ts` declares the same table but does not publish it. Declared here with its container rationale. |

## Acceptance criteria

| Criterion | Reading |
| --- | --- |
| 1 — `lint:check`, `format:check`, `check` | exit 0, exit 0, exit 0 |
| 2 — `test:setup` with the new exports proven and no new load-time throw | exit 0, 3 files, **113 tests** (baseline 96) |
| 3 — `test:guides` with contract 13 gated and `## Tests` naming the file and its cases | exit 0, 34 tests |
| 4 — `build` | exit 0 |
| 5 — `tmp/probe/` holds no file | `tmp/` is absent |
| 6 — only owned files changed | `git status --porcelain` lists the six owned modifications and the one owned addition, and nothing else |

`npm test` also exits 0 (`src:core`, `setup`, `policy`, `config`, `guides`, `conformance`).

## Observations, not criteria

`npm run test:service` — **exit 0, 13 files, 66 tests, 58.05 s** (baseline 12 files, 61 tests, 105.53 s with a cold model load). Per-case timings for the new file: closure 635 ms, receipt 1655 ms, control 595 ms, refusal 605 ms, direct 1007 ms. The Orchestrator takes the authoritative run.

`npm run test:distribution` was not run: it is outside the criteria, and nothing under `src/` or in the manifest moved.

## Deviation state

**No deviation.** The one standing-condition failure — the daemon down — I recovered in place by starting the installed `ollama serve`, which the brief's Host section had asserted as already true. Nothing in `src/**`, `package.json`, `package-lock.json`, `dist/**`, the `scaffold repair` set, or the mirrored guides was touched. Decisions I made and carried on from, as the deviation contract allows: the page markup and its `globalThis.page` operation names; the fixture route names `/modules`, `/dist`, `/control`; the `receipt-<uuid>` receipt form; and stating the zero-request tool-execution window as an equality over the whole operation window rather than as a wall-clock slice, which is strictly stronger and needs no clock correlation between the page and CDP.
