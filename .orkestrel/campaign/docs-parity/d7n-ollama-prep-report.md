# Report — P.1 `d7n-ollama-prep`

`implementer` on Claude Opus 5, checkout `/home/user/fleet/ollama`, branch `claude/orkestrel-npm-audit-deps-14ibta`, baseline tip `e42feea`. Wall clock 2026-09-07T20:50:19Z to 2026-09-07T20:56:18Z.

Every item landed. No deviation: `repair` wrote the P21 list exactly, every before-text was found verbatim, every voice diagnostic named an owned file under `tests/**`, `test:policy` is green, and `docs` is the only red gate.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

```text
0 of 37 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 8.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 29 unchanged, 0 removed in ..
EXIT 0
```

`git status --short` directly after, the P21 list exactly:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

`package.json` carries the `docs` script row `"docs": "node --experimental-strip-types scripts/docs.ts"`; `tsconfig.json` carries the own-specifier `paths` entry.

## Item 2 — the drop-in's adaptation

`tests/guides.test.ts`, the enumerated sites only. A `findMissing` already taking strings — the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)` at the `imports only real exports` case — is unchanged, and the `group.methods.length` assertion is unchanged.

```diff
diff --git a/tests/guides.test.ts b/tests/guides.test.ts
index 27381d9..4aa74a2 100644
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -93,21 +93,27 @@ for (const entry of manifest) {
 		})
 
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@ -122,22 +128,32 @@ for (const entry of manifest) {
 				.surface()
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
 
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

Observation, recorded and carried on from: this package's drop-in carries neither the pilot's `findDrift` equality case nor its tagline case nor its example-title pairing case, so the file is not yet the pilot's byte for byte outside its constants. Item 2 enumerates no such addition, and the equality case would red `test:guides` against the disagreements `docs` prints, which are the converge unit's worklist. Adding those cases belongs to whichever unit closes that worklist.

## Item 3 — the voice sites

Every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic the run named sat under `tests/**`; none named an off-limits file. No code token moved, nothing was renamed, and no assertion's value changed. Each edited line kept its line number, so a diagnostic's line reads the same before and after.

Before the edits, `npx oxlint --config .oxlintrc.json --deny-warnings .` named `policy/no-malformed-summary` in `tests/setup.ts`, `tests/setupServer.ts`, and `tests/setupService.ts`, and `policy/no-banned-term` in `tests/conformance.test.ts`, `tests/service/OllamaProvider.test.ts`, `tests/service/budget.test.ts`, `tests/service/compaction.test.ts`, `tests/service/factories.test.ts`, `tests/service/tools.test.ts`, `tests/src/server/OllamaProvider.test.ts`, and `tests/src/server/integration.test.ts`. Its per-rule and per-file tallies matched the P20 reading in the standing conditions, rule for rule and file for file; the run is retained at `tmp/d7n-ollama-prep/oxlint-before.log.txt` in the checkout. After the edits the same command prints nothing and exits 0. The heading of each following block names that file's rule and the lines it fired at.

Ancillary decisions, recorded:

- `tests/service/OllamaProvider.test.ts:148` quotes the prompt the test sends verbatim at line 171, `'What is 2+2? Reply with just the number.'`. Rewriting the comment's prose would make it disagree with the string literal, so the quotation is marked as a code span instead, which the rule reads past. The comment still matches the literal.
- A term whose row carries a permitted sense and which the rule therefore left unflagged — the causal `since` at `tests/service/budget.test.ts:176`, the `above` in the same block — is left as it was, so the edit set equals the diagnostic set.
- `just` deleted outright would invert `not just the last message` and `not just the eventual final answer`; each becomes `not … alone`, which keeps the meaning the assertion is written against.

The prose sweep in `tests/setupPolicy.ts` names no line in `guides/**` or `README.md` on this tree: `npm run test:policy` exits 0. Nothing there was edited.

### Before and after, per diagnostic

#### `tests/setup.ts`

`policy/no-malformed-summary` at 63, 82, 111, 123

```text
63
- /** The message every {@link createThrowingSummarizer} invocation rejects with, by default. */
+ /** Names the message every {@link createThrowingSummarizer} invocation rejects with, by default. */
82
- /** The digest every {@link createRecordingSummarizer} invocation resolves with, by default. */
+ /** Names the digest every {@link createRecordingSummarizer} invocation resolves with, by default. */
111
- /** Tuning for {@link fillWorkspace} — all optional. */
+ /** Represents the tuning {@link fillWorkspace} accepts — all optional. */
123
- /** The fixed sentence {@link fillWorkspace} repeats to fill each generated document. */
+ /** Names the fixed sentence {@link fillWorkspace} repeats to fill each generated document. */
```

#### `tests/setupServer.ts`

`policy/no-malformed-summary` at 17, 28, 36, 43, 48, 55, 61, 67, 74, 81, 86, 92, 98, 106, 111, 114, 240, 253, 269, 275, 289, 295, 317, 331, 334, 353, 356, 371, 374, 379

```text
17
- /** Weather function definition shared by provider wire and live tool-call tests. */
+ /** Defines the weather function shared by provider wire and live tool-call tests. */
28
- /** One request captured by a recording proxy. */
+ /** Represents one request captured by a recording proxy. */
36
- /** A running recording proxy. */
+ /** Represents a running recording proxy. */
43
- /** Parse a JSON request body when it is a record. */
+ /** Parses a JSON request body when it is a record. */
48
- /** Minimal message shape recorded from the provider wire. */
+ /** Represents the minimal message shape recorded from the provider wire. */
55
- /** Narrow an unknown value to a recorded wire message. */
+ /** Narrows an unknown value to a recorded wire message. */
61
- /** Narrow a captured request's messages, returning an empty collection when malformed. */
+ /** Narrows a captured request's messages, returning an empty collection when malformed. */
67
- /** Join every captured message's content. */
+ /** Joins every captured message's content. */
74
- /** Minimal function tool shape recorded from the provider wire. */
+ /** Represents the minimal function tool shape recorded from the provider wire. */
81
- /** Narrow an unknown value to a recorded function tool. */
+ /** Narrows an unknown value to a recorded function tool. */
86
- /** Return the function names advertised on a captured provider request. */
+ /** Returns the function names advertised on a captured provider request. */
92
- /** Return the leading system message, when present. */
+ /** Returns the leading system message, when present. */
98
- /** Clone forwarding headers while removing connection-specific values. */
+ /** Clones forwarding headers while removing connection-specific values. */
106
- /** Narrow a fetch rejection to an abort error. */
+ /** Narrows a fetch rejection to an abort error. */
111
- /** The rejection message a refusing transport reports in place of a network failure. */
+ /** Names the rejection message a refusing transport reports in place of a network failure. */
114
- /** A transport that refuses every request after recording the signal it rode. */
+ /** Represents a transport that refuses every request after recording the signal it rode. */
240
- /** Wait until a recording proxy has captured the requested number of calls. */
+ /** Waits until a recording proxy has captured the requested number of calls. */
253
- /** Drive a provider stream to completion and capture deltas plus its returned result. */
+ /** Drives a provider stream to completion and captures deltas plus its returned result. */
269
- /** Read a non-empty environment variable, or return its fallback. */
+ /** Reads a non-empty environment variable, or returns its fallback. */
276
-  * Normalize an Ollama-style host value to an absolute HTTP URL.
+  * Normalizes an Ollama-style host value to an absolute HTTP URL.
289
- /** A driven tool-call chunk paired with its execution result. */
+ /** Represents a driven tool-call chunk paired with its execution result. */
295
- /** Drain an agent stream and bucket every observable chunk. */
+ /** Drains an agent stream and buckets every observable chunk. */
317
- /** Build an in-process agent stream over deterministic chunks. */
+ /** Builds an in-process agent stream over deterministic chunks. */
331
- /** Distinctive datum returned by the lookup tool fixture. */
+ /** Names the distinctive datum the lookup tool fixture returns. */
334
- /** Build the deterministic lookup tool shared by service and wire-shape tests. */
+ /** Builds the deterministic lookup tool shared by service and wire-shape tests. */
353
- /** Error message thrown by the failing tool fixture. */
+ /** Names the error message the failing tool fixture throws. */
356
- /** Build a tool that records its call and then fails. */
+ /** Builds a tool that records its call and then fails. */
371
- /** Number of chunks exposed by the sustained-pressure tool fixture. */
+ /** Names how many chunks the sustained-pressure tool fixture exposes. */
374
- /** Build the progress text returned by a sustained-pressure tool call. */
+ /** Builds the progress text a sustained-pressure tool call returns. */
379
- /** Build a stateful tool that keeps requesting another tool turn. */
+ /** Builds a stateful tool that keeps requesting another tool turn. */
```

#### `tests/setupService.ts`

`policy/no-malformed-summary` at 6, 12, 22, 37, 73, 96, 120, 156, 159, 162, 165, 168, 171, 174, 184

```text
6
- /** The live daemon and model selected for the service axis. */
+ /** Names the live daemon and model selected for the service axis. */
12
- /** Tuning for a live Ollama test provider. */
+ /** Represents the tuning a live Ollama test provider accepts. */
23
-  * Build a concrete provider against the selected live daemon and warmed model.
+  * Builds a concrete provider against the selected live daemon and warmed model.
38
-  * Build a live summarizer for conversation-compaction scenarios.
+  * Builds a live summarizer for conversation-compaction scenarios.
74
-  * Seed a conversation with the fixed trip-planning exchange compaction round-trips fold.
+  * Seeds a conversation with the fixed trip-planning exchange compaction round-trips fold.
97
-  * Check that the daemon answers and reports the selected model as installed.
+  * Checks whether the daemon answers and reports the selected model as installed.
121
-  * Warm the selected model with a one-token chat request.
+  * Warms the selected model with a one-token chat request.
156
- /** Content and usage round-trips. */
+ /** Names the request options for content and usage round-trips. */
159
- /** Multi-delta streaming round-trips. */
+ /** Names the request options for multi-delta streaming round-trips. */
162
- /** Tool-call round-trips. */
+ /** Names the request options for tool-call round-trips. */
165
- /** Mid-stream abort and deadline round-trips. */
+ /** Names the request options for mid-stream abort and deadline round-trips. */
168
- /** Seeded deterministic round-trips. */
+ /** Names the request options for seeded deterministic round-trips. */
171
- /** Native-thinking round-trips. */
+ /** Names the request options for native-thinking round-trips. */
175
-  * The elapsed-time bound every live retry gives the `retryUntil` helper, in milliseconds.
+  * Names the elapsed-time bound every live retry gives the `retryUntil` helper, in milliseconds.
184
- /** Two-turn tool-loop request recipe. */
+ /** Names the request options for the two-turn tool-loop recipe. */
```

#### `tests/conformance.test.ts`

`policy/no-banned-term` at 83, 85, 124

```text
83
- 	// Every field our provider READS via @orkestrel/contract guards on `unknown`,
+ 	// Every field our provider READS through @orkestrel/contract guards on `unknown`,
85
- 	// official ChatResponse/Message/ToolCall shapes as currently installed.
+ 	// official ChatResponse/Message/ToolCall shapes as installed.
124
- 	// The provider reads `arguments` as `unknown` and narrows it via
+ 	// The provider reads `arguments` as `unknown` and narrows it through
```

#### `tests/src/server/integration.test.ts`

`policy/no-banned-term` at 209, 272, 706

```text
209
- 	// its attribution reach the wire via the active workspace framing (no dependency on whether the
+ 	// its attribution reach the wire through the active workspace framing (no dependency on whether the
272
- 	// it via B.search('endpoint') → reference({ messages }) → write into A's active workspace.
+ 	// it through B.search('endpoint') → reference({ messages }) → write into A's active workspace.
706
- 			// Recipe: FAST_OPTIONS. One text file + one image file (seated via the workspace
+ 			// Recipe: FAST_OPTIONS. One text file + one image file (seated through the workspace
```

#### `tests/src/server/OllamaProvider.test.ts`

`policy/no-banned-term` at 407

```text
407
- 	// behavior — the FULL ordered conversation rides the wire (not just the last
408
- 	// message) — a provider-behavior replacement for the model-obedience "system →
+ 	// behavior — the FULL ordered conversation rides the wire (not the last
+ 	// message alone) — a provider-behavior replacement for the model-obedience "system →
```

#### `tests/service/OllamaProvider.test.ts`

`policy/no-banned-term` at 148

```text
148
- 	// Recipe: 'What is 2+2? Reply with just the number.' / inline
+ 	// Recipe: `'What is 2+2? Reply with just the number.'` / inline
```

#### `tests/service/budget.test.ts`

`policy/no-banned-term` at 176

```text
176
- 			// calls" — verify the SUM matches, not just a monotonic bound, since the source
+ 			// calls" — verify the SUM matches, not a monotonic bound alone, since the source
```

#### `tests/service/compaction.test.ts`

`policy/no-banned-term` at 204

```text
204
- 			// the tool-chunk payload the agent stream emits, not just the eventual final answer.
+ 			// the tool-chunk payload the agent stream emits, not the eventual final answer alone.
```

#### `tests/service/factories.test.ts`

`policy/no-banned-term` at 68

```text
68
- 		// Ollama simply ignores must still produce a normal generation against the live daemon —
+ 		// Ollama ignores must still produce a normal generation against the live daemon —
```

#### `tests/service/tools.test.ts`

`policy/no-banned-term` at 439

```text
439
- 					// dispatched multiple tool calls together (structurally observable via the
+ 					// dispatched multiple tool calls together (structurally observable through the
```

## Item 4 — the bump

```diff
-	"version": "0.0.14",
+	"version": "0.0.15",
```

`package-lock.json` is untouched.

## Criteria

### 1. `git status --short`

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/conformance.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/service/OllamaProvider.test.ts
 M tests/service/budget.test.ts
 M tests/service/compaction.test.ts
 M tests/service/factories.test.ts
 M tests/service/tools.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/setupService.ts
 M tests/src/server/OllamaProvider.test.ts
 M tests/src/server/integration.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

The P21 repair list, plus `tests/guides.test.ts` from item 2, plus the files item 3 edited — `tests/setup.ts`, `tests/setupServer.ts`, `tests/setupService.ts`, `tests/conformance.test.ts`, `tests/src/server/integration.test.ts`, `tests/src/server/OllamaProvider.test.ts`, `tests/service/OllamaProvider.test.ts`, `tests/service/budget.test.ts`, `tests/service/compaction.test.ts`, `tests/service/factories.test.ts`, `tests/service/tools.test.ts` — and nothing else. `tmp/` is ignored at `.gitignore:11`.

### 2. `format:check`, `oxlint`, `check`

`npm run format` ran before the check.

```text
$ npm run format:check
All matched files use the correct format.
Finished in 2458ms on 69 files using 4 threads.
EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings .
(no output)
EXIT 0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.server.json
EXIT 0
```

### 3. `test:guides`, `test:policy`, `test:config`

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  20 passed (20)
   Duration  538ms
EXIT 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  531ms
EXIT 0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
   Duration  3.63s
EXIT 0
```

P21's `test:guides` failures were the record shapes alone, and item 2 closed them.

### 4. `npm run docs`

Exit 1, `rows read: 1, disagreements found: 24` — the expected reading, and the converge unit's worklist. Verbatim, every line it printed:

```text
> @orkestrel/ollama@0.0.15 docs
> node --experimental-strip-types scripts/docs.ts

guides/ollama.md function createOllama: guide "A `ProviderInterface` over a local Ollama daemon — non-streaming `generate` plus streaming `stream`." source "Creates a local Ollama inference provider — a `ProviderInterface` over the daemon's `POST /api/chat`, supporting non-streaming `generate` and streaming `stream`."
guides/ollama.md class OllamaProvider: guide "The local Ollama `ProviderInterface` over `POST /api/chat` — non-stream body + NDJSON stream, guard-narrowed." source "Implements the local Ollama inference boundary — a `ProviderInterface` over Ollama's `POST /api/chat`, both non-streaming (`generate`) and streaming NDJSON (`stream`)."
guides/ollama.md interface OllamaResponse: guide "The `/api/chat` response shape the provider hands to a consuming call: `{ response: Response; timeout: TimeoutInterface; combined: AbortSignal }` — the open response plus the armed deadline and the `AbortSignal.any` it was issued under." source "Represents an open `POST /api/chat` response together with the deadline and the combined signal that bound the request."
guides/ollama.md interface OllamaOptions: guide "`{ model; url?; keepAlive?: string | number; timeout?: number; options?: Readonly<Record<string, unknown>>; think?: boolean; fetch?: typeof fetch; headers?: () => Readonly<Record<string, string>> | Promise<Readonly<Record<string, string>>>; format?: ContextFormat }` — `createOllama` configuration (incl. the wire `think` flag, the transport seam + the context-framing default)." source "Represents the configuration `createOllama` accepts for the local Ollama backend."
guides/ollama.md const DEFAULT_OLLAMA_URL: guide "The local daemon base URL assumed when `OllamaOptions.url` is omitted (`'http://localhost:11434'`)." source "Names the local Ollama daemon base URL assumed when `OllamaOptions.url` is omitted."
guides/ollama.md const DEFAULT_KEEP_ALIVE: guide "How long the model stays resident after a call by default (`'5m'`) — named for the Ollama `keep_alive` wire field it is sent as." source "Names how long the model stays resident after a call when `OllamaOptions.keepAlive` is omitted — Ollama's own `keep_alive` default, expressed as a duration string."
guides/ollama.md const DEFAULT_PROVIDER_TIMEOUT: guide "The per-call deadline in milliseconds when `OllamaOptions.timeout` is omitted (`120_000`)." source "Names the per-call deadline in milliseconds when `OllamaOptions.timeout` is omitted — generous enough that a cold model load does not trip it."
guides/ollama.md interface WireChatRequest: guide "The typed `/api/chat` request body the provider sends (`{ model; messages; stream; keep_alive; think; options?; tools?; format? }`) — asserted against the official Ollama client's `ChatRequest` by the compile-time parity test. `format` is the `/api/chat` structured-output constraint, forwarded verbatim from the per-call `ProviderStreamOptions.schema` and absent when no schema is supplied." source "Represents the exact `POST /api/chat` request body `OllamaProvider` sends — the internal typed wire contract."
guides/ollama.md class OllamaHTTPError: guide "The error thrown at the `/api/chat` HTTP boundary — a non-OK status or a `null` response body — carrying the machine-readable `code` `'HTTP'`, the response `status` (`0` for the null-body case), and a message bounded to a 2048-character body excerpt. Narrow a caught value with `isOllamaHTTPError`." source "Represents an error thrown when the Ollama `/api/chat` HTTP transport fails."
guides/ollama.md function isOllamaHTTPError: guide "Type guard narrowing an `unknown` caught value to `OllamaHTTPError` (an `instanceof` check)." source "Checks whether a value is an `OllamaHTTPError`."
guides/ollama.md interface OllamaHTTPErrorOptions: guide "`{ cause?: unknown }` — the options a thrown `OllamaHTTPError` accepts beside its message and status, carrying the underlying transport or body-read rejection." source "Represents the options a thrown `OllamaHTTPError` accepts beside its message and status — the standard error `cause` link, named so a consumer can reference the shape."
guides/ollama.md const MAX_ERROR_BODY_LENGTH: guide "The cap, in characters, on how much of a non-OK response body is incorporated into a thrown `OllamaHTTPError`'s message (`2048`)." source "Names the cap, in characters, on how much of a non-OK response body is incorporated into a thrown `OllamaHTTPError`'s message."
guides/ollama.md function mapMessages: guide "The projection of conversation turns onto the wire's minimal `{ role, content }` message shape — `tool_calls` only on a turn that replays them, `images` only on a multimodal turn." source "Maps conversation turns onto the `/api/chat` wire's minimal message shape."
guides/ollama.md function buildResult: guide "The assembly of a `ProviderResult` from a turn's content, reasoning, tool calls, and usage, setting only the populated optionals." source "Builds a provider result from a turn's content, reasoning, tool calls, and usage."
guides/ollama.md function parseBody: guide "The coercion of a non-stream `/api/chat` response body into a wire record — an empty or malformed body yields `undefined` rather than throwing." source "Parses a non-stream `/api/chat` response body into a wire record."
guides/ollama.md function extractContent: guide "One wire record's `message.content` when it is a string, else `''`." source "Extracts the assistant text of one wire record."
guides/ollama.md function extractThinking: guide "One wire record's daemon-side `message.thinking` when it is a string, else `''`." source "Extracts the daemon-side reasoning of one wire record."
guides/ollama.md function joinThinking: guide "The join of a call's two reasoning carriers — the splitter's separated in-content spans and the accumulated wire-side `message.thinking` — blank-line separated when both exist." source "Joins a call's two reasoning carriers into the result's `thinking`."
guides/ollama.md function extractUsage: guide "One wire record's `TokenUsage`, present only when both `prompt_eval_count` and `eval_count` are numbers." source "Extracts the token usage of one wire record."
guides/ollama.md function extractTools: guide "One wire record's `message.tool_calls` as `ToolCall` values, dropping a malformed entry and minting an id when the wire omits one." source "Extracts the tool calls of one wire record's `message.tool_calls`."
guides/ollama.md function extractArguments: guide "A wire `function.arguments` value as a record — an object as-is, a JSON string parsed, otherwise `{}`." source "Extracts a wire `arguments` value as a record."
guides/ollama.md OllamaProvider.generate: guide absent source absent
guides/ollama.md OllamaProvider.stream: guide absent source absent
guides/ollama.md pitch: readme absent tagline "The concrete local-LLM backend. `OllamaProvider` implements the abstract `ProviderInterface` over a local Ollama daemon's `POST /api/chat`, in both shapes: non-streaming `generate` (one JSON body in, one assembled `ProviderResult` out) and streaming `stream` (NDJSON in — one JSON object per `\\n`-terminated line — channel-tagged `ProviderDelta`s out). It exists so an Agent can run against a real model on `localhost` with zero cloud dependency, one tiny model, and no API key. The design is deliberately spare. It is one external boundary, kept honest: every `unknown` wire value is narrowed through the `@orkestrel/contract` guards (`isRecord` / `isString` / `isNumber`) — never `as` — and a missing or malformed field degrades to a sensible default (empty content, no usage, `{}` arguments), never a throw. Every call is bounded by the caller's `AbortSignal` (cancel / deadline / budget, folded through `AbortSignal.any`) AND the provider's own armed `Timeout`; a `stream` cancelled mid-flight throws a `ProviderAbortError` (from @orkestrel/agent) carrying the partial. It publishes no events: each call is a pure function of its arguments. The wire `think` flag is configurable through `OllamaOptions.think` (default `false`) and overrideable per call through `ProviderStreamOptions.think`, then backstopped with a per-call `ThinkSplitter` (the daemon may ignore the flag for a thinking model): with `think: true` the daemon returns reasoning on the separate `message.thinking` channel, streamed live as `thinking` deltas, and either way every content delta is split, only CLEAN content is yielded / assembled, and the separated reasoning — plus any daemon-side `message.thinking` deltas — surfaces as `ProviderResult.thinking`, never in the conversation. A per-call `ProviderStreamOptions.schema` (a JSON schema object, from `@orkestrel/agent`) forwards verbatim as the wire's structured-output `format` field, omitted from the request entirely when `schema` is undefined. Token usage reuses the `TokenUsage` shape rather than minting its own. The dependency is strictly one-way: this surface imports the abstract provider contract and its error from `@orkestrel/agent`, tool-call shapes from `@orkestrel/tool`, the `NDJSONParser`, the `Timeout`, and guards from `@orkestrel/contract` — those packages never import from here. It is tested LIVE against `qwen3.5:2b-q4_K_M` in a dedicated `service` test project that REQUIRES the daemon and WARMS the model first (no `skipIf`), while the `src:server` project stays hermetic — recording-proxy wire-shape assertions that pass with the daemon down. Source: `src/server`. Surfaced through the `@orkestrel/ollama` barrel (aliased `@src/server` inside this repo)."
rows read: 1, disagreements found: 24
EXIT 1
```

## Diffstat

```text
 .oxlintrc.json                          |   4 +-
 configs/helpers.ts                      |  15 +-
 configs/policy.ts                       | 534 ++++++++++++++++++++++++-----
 package.json                            |   5 +-
 tests/config.test.ts                    | 431 +++++++++++++++++++++++-
 tests/conformance.test.ts               |   6 +-
 tests/guides.test.ts                    |  36 +-
 tests/policy.test.ts                    | 128 ++++++-
 tests/service/OllamaProvider.test.ts    |   2 +-
 tests/service/budget.test.ts            |   2 +-
 tests/service/compaction.test.ts        |   2 +-
 tests/service/factories.test.ts         |   2 +-
 tests/service/tools.test.ts             |   2 +-
 tests/setup.ts                          |   8 +-
 tests/setupPolicy.ts                    | 572 +++++++++++++++++++++++++++-----
 tests/setupServer.ts                    |  60 ++--
 tests/setupService.ts                   |  30 +-
 tests/src/server/OllamaProvider.test.ts |   4 +-
 tests/src/server/integration.test.ts    |   6 +-
 tsconfig.json                           |   3 +-
 20 files changed, 1605 insertions(+), 247 deletions(-)
```
