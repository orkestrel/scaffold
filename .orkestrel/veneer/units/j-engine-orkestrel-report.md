## Installed packages (Veneer's `node_modules/@orkestrel/*`)

Declared in `/home/user/veneer/package.json`: `@orkestrel/contract` (`^0.0.17`, `dependencies`); `@orkestrel/guide`, `@orkestrel/html`, `@orkestrel/markdown`, `@orkestrel/probe`, `@orkestrel/scaffold`, `@orkestrel/test` (`devDependencies`). Every other installed package (`abort`, `codec`, `console`, `database`, `emitter`, `indexeddb`, `lsp`, `mcp`, `process`, `queue`, `router`, `server`, `sqlite`, `sse`, `template`, `timeout`, `tool`, `websocket`) is a transitive install, not a declared Veneer dependency, so Ruling D41 (no runtime dependency outside `@orkestrel/*`, each candidate ruled on before it enters) applies to each before the engine imports it.

### `@orkestrel/contract` (`dependencies`, declaration: `node_modules/@orkestrel/contract/dist/src/core/index.d.cts`)

**Guard.** `isInstance` (line 2874, structural instance check) and `literalOf` (line 3828, literal-value guard factory) are already imported by `src/browser/validators.ts:2-3`. Beside those, the same file exports a full guard vocabulary the engine can draw on directly: `isFunction` (2834, callable check), `isObject` (3227, plain-object narrowing), `isRecord` (3291, string-keyed record narrowing), `isDefined` (2680, `null`/`undefined` exclusion), `isNonEmptyString` (3097), `isBoolean`/`isNumber`/`isString` (primitive narrowing), `andOf`/`orOf`/`notOf`/`complementOf` (2170/4492/4157/1000, guard combinators), `arrayOf`/`objectOf`/`mapOf` (122/4282/3887, structural guard builders), `enumOf`/`keyOf`/`matchOf` (1680/3753/4136, literal-set and pattern guards), and `Guard<T>` (1837, the guard type alias every one of the preceding returns).
**No emitter, lifecycle, abort, deferred/wait, recorder, or DOM/focus export.** `contract` is a schema/guard/validation library; it carries no event, cancellation, timing, or DOM primitive.

### `@orkestrel/guide` (`devDependencies`, declaration: `node_modules/@orkestrel/guide/dist/src/core/index.cjs`, no `.d.cts` sibling read — CommonJS build only under `dist/src/core/`)
Doc-parity tooling (`GuideCommand`, per `.claude/rules/documentation.md`). No guard, emitter, lifecycle, abort, deferred/wait, recorder, or DOM/focus export; it generates and checks guide Markdown, not runtime behavior.

### `@orkestrel/html` (`devDependencies`, declaration: `node_modules/@orkestrel/html/dist/src/core/index.d.cts`)
A pure-source, host-independent HTML AST parser/sanitizer/distiller (`createHTML`, `HTML` class, `parseDocument`, `sanitizeURL`-adjacent guards `isElementNode`/`isHTMLDocument`/`isHTMLNode`, `renderHTML`). It operates on the typed `HTMLNode` AST, never on the live DOM (`document`, `Element`, focus, or event targets), so it offers no DOM-or-focus primitive for a browser engine despite the package name. No emitter, lifecycle, abort, deferred/wait, or recorder export either.

### `@orkestrel/markdown` (`devDependencies`, declaration: `node_modules/@orkestrel/markdown/dist/src/core/index.d.cts`, not read in full — Markdown parse/render tooling analogous to `html`)
Documentation tooling. No engine-relevant export inferred from its role (guide/README generation) and its runtime dependency on `@orkestrel/html`; not read line-by-line, so treat this reading as bounded rather than exhaustive.

### `@orkestrel/probe` (`devDependencies`, declaration under `node_modules/@orkestrel/probe/dist/src/core/index.d.cts`, not read)
The `prove` MCP instrument (`.claude/rules/quality.md` § Instruments). Test-time proof tooling, not an engine primitive.

### `@orkestrel/scaffold` (`devDependencies`, declaration under `node_modules/@orkestrel/scaffold/dist/src/core/index.cjs`, not read)
Repository scaffolding CLI (`scaffold catalog`, `scaffold repair`). Not an engine primitive.

### `@orkestrel/test` (`devDependencies`, declaration under `node_modules/@orkestrel/test/dist/src/core/index.d.cts`, not read)
Test harness helpers for Vitest. Not an engine primitive.

## Transitively installed, not declared (candidates D41 has not yet ruled on)

### `@orkestrel/emitter` (declaration: `node_modules/@orkestrel/emitter/dist/src/core/index.d.cts`)
**Emitter.** `createEmitter`/`Emitter` class/`EmitterInterface` (lines 30/67/109): a typed synchronous event emitter — `on`/`once`/`off`/`emit`/`count`/`clear`/`destroy`, listener-isolated (a throwing listener never stops siblings; routed to an optional `error` handler), destroyed-then-no-op semantics. Matches "emitter" and "lifecycle" (`destroy`) concerns directly.
**Guard.** `extractKeys` (203, type-safe `Object.keys`) is a small structural helper, not a validation guard.

### `@orkestrel/abort` (declaration: `node_modules/@orkestrel/abort/dist/src/core/index.d.cts`)
**Abort.** `createAbort`/`Abort` class/`AbortInterface` (lines 120/28/53): a traceable cancellation handle wrapping `AbortController`, with `abort(reason)` (idempotent, keeps a defined falsy reason verbatim) and parent-signal linking through `AbortSignal.any`. `isAbortSignal` (142) and `linkSignal` (169) are guard/composition helpers for the same concern.

### `@orkestrel/timeout` (declaration: `node_modules/@orkestrel/timeout/dist/src/core/index.d.cts`)
**Deferred or wait / abort.** `createTimeout`/`Timeout` class/`TimeoutInterface` (lines 36/108/129): a controllable `setTimeout` wrapper exposing an `AbortSignal` that aborts on expiry, with `start()`/`clear()` re-arming and a parent-signal clear-without-abort distinction. `isTimeoutDuration`/`isTimeoutSignal` (51/70) are its guards.

### `@orkestrel/queue` (declaration: `node_modules/@orkestrel/queue/dist/src/core/index.d.cts`)
**Deferred or wait.** `createQueue`/`Queue` class/`QueueInterface` (lines 115/310/557): concurrency-, retry-, and timeout-bounded async task scheduling with a `QueueEventMap` (an emitter-shaped event surface) and store abstraction (`MemoryQueueStore`/`DatabaseQueueStore`). This is server/database-oriented work scheduling, not a UI wait primitive; runtime `dependencies` include `@orkestrel/database`, which pulls in `@orkestrel/sqlite` and `@orkestrel/indexeddb` — heavier than an interaction engine's likely need for a simple debounce or wait helper.

### `@orkestrel/tool` (declaration: `node_modules/@orkestrel/tool/dist/src/core/index.d.cts`)
Agent tool-calling contracts (`ToolInterface`, `ToolManager`). No guard, emitter, lifecycle, abort, deferred/wait, recorder, or DOM/focus concern for a UI engine.

### `@orkestrel/websocket`, `@orkestrel/sse`, `@orkestrel/router`, `@orkestrel/server`, `@orkestrel/process`, `@orkestrel/lsp`, `@orkestrel/mcp`, `@orkestrel/console`, `@orkestrel/database`, `@orkestrel/sqlite`, `@orkestrel/indexeddb`, `@orkestrel/codec`, `@orkestrel/template`
Server/protocol/process/storage/agent-transport packages (confirmed for `websocket` by declaration read: `NodeWebSocket`, frame encode/decode, close codes — Node-only, `dist/src/server/` only, no browser build). None carries a guard, emitter, lifecycle, abort, deferred/wait, recorder, or DOM/focus concern relevant to a browser interaction engine; not read individually beyond `websocket` given the objective's scope, but each package's catalog `Layer` and dependency row (server-side `Runtime dependencies` in the catalog table) corroborates the same reading.

## Catalogued-only packages (not installed in Veneer at all)

Per the catalog table in `/home/user/scaffold/.claude/agents/orkestrel.md`, none currently installed transitively or directly in Veneer names a recorder or DOM/focus primitive either. The closest catalogued candidates by name — `@orkestrel/workspace` (`0.0.9`, L3, host state/workspace) and `@orkestrel/workflow` (`0.0.19`, L4, task orchestration) — are not installed in Veneer and were not read for their declarations in this unit; report their fitness as unknown rather than available. No catalogued package names a "recorder" or "focus/DOM" concern in its catalog row; both concerns are covered by neither the installed set nor the wider catalog.

## Concerns no package covers

- **Recorder.** No installed or catalogued `@orkestrel/*` package exports a recorder primitive (an action-log, undo/redo, or replay recorder) by name or by declaration read here.
- **DOM or focus.** No installed or catalogued package exposes a live-DOM or focus-management primitive. `@orkestrel/html` parses and sanitizes a detached `HTMLNode` AST; it never touches `document`, `Element`, or focus state, so it does not answer this concern despite its name.

## Bounds on this reading

`@orkestrel/markdown`, `@orkestrel/guide`, `@orkestrel/probe`, `@orkestrel/scaffold`, `@orkestrel/test`, `@orkestrel/mcp`, `@orkestrel/router`, `@orkestrel/server`, `@orkestrel/process`, `@orkestrel/lsp`, `@orkestrel/console`, `@orkestrel/database`, `@orkestrel/sqlite`, `@orkestrel/indexeddb`, `@orkestrel/codec`, `@orkestrel/template`, `@orkestrel/sse` were reasoned about from their catalog role, dependency edges, or package name rather than a line-by-line declaration read; treat any claim about their exports as bounded, not exhaustive, and re-read the specific `.d.cts` file named above before ruling a candidate in or out.
