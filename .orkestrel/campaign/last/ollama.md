# Last changes: ollama

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `6a6342d`, merge base with `origin/main` `7f42b7a`, layer L6, declared version 0.0.13, registry version 0.0.13.

## Commits since origin/main

```text
5cf70c5 2026-08-28 Update every dependency to the published latest
849e4b4 2026-08-28 Adopt the catalog and guide mirrors for the wave
a638acc 2026-08-28 Apply the verified src-audit fixes
c9c1319 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
2553c79 2026-09-01 Adopt the renamed guide helpers in the parity test
6a92c05 2026-09-02 Declare the Ollama error options and adopt the agent, ndjson, and budget renames
795782d 2026-09-02 Rename OllamaErrorOptions to OllamaHTTPErrorOptions
3d681fa 2026-09-02 Point the README at the guide the package ships
6a6342d 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md             |  17 ++--
 README.md                               |   4 +-
 package.json                            |   8 +-
 src/server/OllamaProvider.ts            | 321 +++++++++++++++++++++---------------------------------------------------
 src/server/constants.ts                 |  12 ++-
 src/server/errors.ts                    |  10 ++-
 src/server/factories.ts                 |  10 +--
 src/server/helpers.ts                   | 229 +++++++++++++++++++++++++++++++++++++++++++++++++++
 src/server/index.ts                     |   2 +
 src/server/parsers.ts                   |  32 ++++++++
 src/server/types.ts                     |  59 +++++++++-----
 tests/guides.test.ts                    |  24 +++---
 tests/service/OllamaProvider.test.ts    |   2 +-
 tests/service/compaction.test.ts        |   8 +-
 tests/service/conversation.test.ts      |  12 +--
 tests/service/lifecycle.test.ts         |   8 +-
 tests/service/transport.test.ts         |   2 +-
 tests/setup.test.ts                     |  38 +++++++--
 tests/setup.ts                          |  22 ++---
 tests/setupServer.test.ts               |   6 +-
 tests/setupServer.ts                    |  33 +++++++-
 tests/setupService.test.ts              |   4 +-
 tests/setupService.ts                   |   6 +-
 tests/src/server/OllamaProvider.test.ts | 112 +++++++++++++++++++++++--
 tests/src/server/errors.test.ts         |  32 ++++++++
 tests/src/server/helpers.test.ts        | 218 +++++++++++++++++++++++++++++++++++++++++++++++++
 tests/src/server/integration.test.ts    |   4 +-
 tests/src/server/parsers.test.ts        |  24 ++++++
 28 files changed, 917 insertions(+), 342 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/server/constants.ts b/src/server/constants.ts
index 810cb8f..54bcab6 100644
--- a/src/server/constants.ts
+++ b/src/server/constants.ts
@@ -1,22 +1,26 @@
 // Ollama constants — the provider's defaults (AGENTS §5).
 
-/** The local Ollama daemon base URL assumed when `OllamaOptions.url` is omitted. */
+/** Names the local Ollama daemon base URL assumed when `OllamaOptions.url` is omitted. */
 export const DEFAULT_OLLAMA_URL = 'http://localhost:11434'
 
 /**
- * How long the model stays resident after a call when `OllamaOptions.keepAlive` is
+ * Names how long the model stays resident after a call when `OllamaOptions.keepAlive` is
  * omitted — Ollama's own `keep_alive` default, expressed as a duration string.
+ *
+ * @remarks
+ * The name mirrors the Ollama `/api/chat` `keep_alive` field this value is sent as, so
+ * the constant, the `OllamaOptions.keepAlive` key, and the wire member read as one term.
  */
 export const DEFAULT_KEEP_ALIVE = '5m'
 
 /**
- * The per-call deadline in milliseconds when `OllamaOptions.timeout` is omitted —
+ * Names the per-call deadline in milliseconds when `OllamaOptions.timeout` is omitted —
  * generous enough that a cold model load does not trip it.
  */
 export const DEFAULT_PROVIDER_TIMEOUT = 120_000
 
 /**
- * The cap, in characters, on how much of a non-OK response body is
+ * Names the cap, in characters, on how much of a non-OK response body is
  * incorporated into a thrown {@link OllamaHTTPError}'s message.
  *
  * @remarks
diff --git a/src/server/errors.ts b/src/server/errors.ts
index 4c602dd..d2eefe2 100644
--- a/src/server/errors.ts
+++ b/src/server/errors.ts
@@ -3,8 +3,10 @@
 // response body both throw it — so a `catch` can branch on `error.status`
 // rather than parsing a message (AGENTS §12).
 
+import type { OllamaHTTPErrorOptions } from './types.js'
+
 /**
- * An error thrown when the Ollama `/api/chat` HTTP transport fails.
+ * Represents an error thrown when the Ollama `/api/chat` HTTP transport fails.
  *
  * @remarks
  * Carries the response `status` (0 when no HTTP response was received at all,
@@ -27,7 +29,7 @@
 export class OllamaHTTPError extends Error {
 	readonly status: number
 
-	constructor(message: string, status: number, options?: { readonly cause?: unknown }) {
+	constructor(message: string, status: number, options?: OllamaHTTPErrorOptions) {
 		super(message, options)
 		this.name = 'OllamaHTTPError'
 		this.status = status
@@ -35,10 +37,10 @@ export class OllamaHTTPError extends Error {
 }
 
 /**
- * Whether a value is an {@link OllamaHTTPError}.
+ * Checks whether a value is an {@link OllamaHTTPError}.
  *
  * @param value - The value to test
- * @returns `true` when `value` is an `OllamaHTTPError`
+ * @returns True if `value` is an `OllamaHTTPError`; false otherwise
  */
 export function isOllamaHTTPError(value: unknown): value is OllamaHTTPError {
 	return value instanceof OllamaHTTPError
diff --git a/src/server/index.ts b/src/server/index.ts
index 3f9204a..232bdab 100644
--- a/src/server/index.ts
+++ b/src/server/index.ts
@@ -1,5 +1,7 @@
 export * from './types.js'
 export * from './constants.js'
 export * from './errors.js'
+export * from './helpers.js'
+export * from './parsers.js'
 export * from './factories.js'
 export * from './OllamaProvider.js'
diff --git a/src/server/types.ts b/src/server/types.ts
index a926000..8da64af 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -1,11 +1,11 @@
 // The Ollama surface's public types. Imports from Orkestrel packages — agent for the
 // provider contract, timeout for the per-call deadline interface.
 
-import type { ContextFormatInterface } from '@orkestrel/agent'
+import type { ContextFormat } from '@orkestrel/agent'
 import type { TimeoutInterface } from '@orkestrel/timeout'
 
 /**
- * A live `fetch` to `/api/chat` with the deadline + combined signal that bound it —
+ * Represents a live `fetch` to `/api/chat` with the deadline + combined signal that bound it —
  * the internal wire-shape `OllamaProvider.#fetch` hands back to a consuming call.
  *
  * @remarks
@@ -22,13 +22,13 @@ export interface OllamaResponse {
 }
 
 /**
- * The exact `POST /api/chat` request body `OllamaProvider` sends — the internal typed
+ * Represents the exact `POST /api/chat` request body `OllamaProvider` sends — the internal typed
  * wire contract.
  *
  * @remarks
  * This is the typed wire shape asserted against the official `ollama` client's
  * `ChatRequest` by the compile-time parity test; `src/` never imports `ollama` itself.
- * `messages` mirrors the minimal turn shape `#plain` builds (`role` / `content`, plus
+ * `messages` mirrors the minimal turn shape `mapMessages` builds (`role` / `content`, plus
  * `tool_calls` only on a turn that replays them and `images` only on a multimodal
  * turn); `options` and `tools` are only present when configured.
  */
@@ -58,7 +58,7 @@ export interface WireChatRequest {
 		}
 	}>
 	/**
-	 * The `/api/chat` structured-output constraint — a JSON-Schema object forwarded
+	 * Holds the `/api/chat` structured-output constraint — a JSON-Schema object forwarded
 	 * verbatim from the per-call `ProviderStreamOptions.schema`. This is NOT
 	 * `OllamaOptions.format` (the unrelated prompt-context framing); only present
 	 * when a call supplies a `schema`.
@@ -67,7 +67,7 @@ export interface WireChatRequest {
 }
 
 /**
- * Options for `createOllama` — the local Ollama backend's configuration.
+ * Represents the configuration `createOllama` accepts for the local Ollama backend.
  *
  * @remarks
  * Only `model` is required. `url` defaults to the local daemon, `keepAlive` controls
@@ -85,33 +85,37 @@ export interface WireChatRequest {
  */
 export interface OllamaOptions {
 	readonly model: string
-	/** The daemon base URL; defaults to `'http://localhost:11434'`. */
+	/** Sets the daemon base URL; defaults to `'http://localhost:11434'`. */
 	readonly url?: string
-	/** How long the model stays resident after a call; defaults to `'5m'`. */
+	/**
+	 * Sets how long the model stays resident after a call; defaults to `'5m'`. Mirrors the
+	 * Ollama `/api/chat` `keep_alive` field, whose value this key carries verbatim onto
+	 * {@link WireChatRequest.keep_alive}.
+	 */
 	readonly keepAlive?: string | number
-	/** The per-call deadline in milliseconds; defaults to `120_000`. */
+	/** Sets the per-call deadline in milliseconds; defaults to `120_000`. */
 	readonly timeout?: number
-	/** Passthrough sampling options (`temperature` / `seed` / `num_predict` / …). */
+	/** Carries passthrough sampling options (`temperature` / `seed` / `num_predict` / …). */
 	readonly options?: Readonly<Record<string, unknown>>
 	/**
-	 * The `/api/chat` `think` wire flag; defaults to `false`. When `true`, a thinking-capable
+	 * Sets the `/api/chat` `think` wire flag; defaults to `false`. When `true`, a thinking-capable
 	 * model (e.g. `qwen3`) separates its reasoning NATIVELY at the wire — the daemon returns it
 	 * on the distinct `message.thinking` channel (surfaced on `ProviderResult.thinking`) rather
-	 * than inline in `message.content`. The default stays `false` so a general-purpose provider
-	 * is backward-compatible and immediate for non-thinking models; the per-call ThinkSplitter
+	 * than inline in `message.content`. The default is `false`, so a non-thinking model needs no
+	 * configuration and answers immediately; the per-call ThinkSplitter
 	 * remains the defensive fallback for daemons/models that still inline `<think>` tags either
 	 * way. Set it `true` for a thinking model whose reasoning you intend to DISPLAY separately.
 	 */
 	readonly think?: boolean
 	/**
-	 * A custom `fetch` implementation for every request; defaults to
+	 * Sets a custom `fetch` implementation for every request; defaults to
 	 * `globalThis.fetch`. Lets a runtime inject its own transport (a browser fetch
 	 * pointed at the developer's server, an instrumented wrapper, …) without changing
 	 * the wire protocol. Omitted ⇒ the global `fetch`.
 	 */
 	readonly fetch?: typeof globalThis.fetch
 	/**
-	 * A dynamic, possibly-async header injector called once per request; its returned
+	 * Sets a dynamic, possibly-async header injector called once per request; its returned
 	 * headers are merged into the request on top of the base `Content-Type`. Use it to
 	 * attach an authorization header — e.g. an obfuscated/generated bearer token the
 	 * developer's server validates before relaying to the real LLM — so a browser
@@ -119,17 +123,32 @@ export interface OllamaOptions {
 	 * token can be refreshed/fetched per call. A returned `Content-Type` overrides the
 	 * default; other headers add to it. Omitted ⇒ only `Content-Type: application/json`.
 	 */
-	readonly headers?: () => Record<string, string> | Promise<Record<string, string>>
+	readonly headers?: () =>
+		| Readonly<Record<string, string>>
+		| Promise<Readonly<Record<string, string>>>
 	/**
-	 * The provider's OPTIONAL context-framing default — the PROVIDER-DEFAULT level of
+	 * Sets the provider's OPTIONAL context-framing default — the PROVIDER-DEFAULT level of
 	 * `AgentContext`'s format cascade (beaten by a manager-options or per-item override,
 	 * beating the managers' built-in framing). Declares how this provider's models prefer
 	 * context sections framed (e.g. XML group wrappers vs. Markdown headers). Omitted ⇒
 	 * the provider is framing-agnostic and core's built-in defaults apply unchanged. NOTE:
 	 * this is the prompt-CONTEXT framing consumed by `AgentContext.build()` — it is NOT
 	 * Ollama's `/api/chat` `format` wire parameter (structured-output / JSON schema),
-	 * which this provider does not currently send; the two are unrelated despite the
-	 * shared word.
+	 * which this provider sends only when a call supplies a `schema`; the two are unrelated
+	 * despite the shared word.
 	 */
-	readonly format?: ContextFormatInterface
+	readonly format?: ContextFormat
+}
+
+/**
+ * Represents the options a thrown {@link OllamaHTTPError} accepts beside its message and status —
+ * the standard error `cause` link, named so a consumer can reference the shape.
+ *
+ * @remarks
+ * `cause` is the underlying value that produced the HTTP failure: the transport or
+ * body-read rejection the provider caught before rethrowing. It is `unknown` because a
+ * thrown value is unconstrained. Omitted ⇒ the error carries no cause.
+ */
+export interface OllamaHTTPErrorOptions {
+	readonly cause?: unknown
 }
```
