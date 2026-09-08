# Report — `d7n-lsp-prep`

Wall clock: 2026-09-07T21:01:06Z (first command, `repair --offline`) to 2026-09-07T21:04:40Z (last `git status --short`).

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line: `9 written, 33 unchanged, 0 removed in ..`

`git status --short` after: `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (all modified), `scripts/docs.ts` (untracked) — matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

Copied the accepted shape from `/home/user/fleet/abort/tests/guides.test.ts:145-227` byte for byte outside this package's identifiers.

Methods loop:

```diff
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 ...
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 ...
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 ...
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
```

Surface-function example case:

```diff
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
```

Per-interface examples loop (bound at loop scope, above the `describe`):

```diff
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

The two `findMissing` sites that already took strings (the import-walk `statement.names` against `face.surface().map((symbol) => symbol.name)`, and `names` against `surface`) were left unchanged. No other line in the suite moved.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 printed the P20 files, `tests/setupServer.ts` (8 sites) and `tests/src/server/fixtures/protocol.mjs` (1 site). All fixed; a second run is clean (no output, exit 0).

`tests/setupServer.ts`, each a `policy/no-malformed-summary` diagnostic (noun-phrase opener), fixed by prefixing `Names`:

- line 9: `The protocol-faithful child peer the server suite spawns.` → `Names the protocol-faithful child peer the server suite spawns.`
- line 14: `The child peer that hands its standard output to a pipe-holding grandchild.` → `Names the child peer that hands its standard output to a pipe-holding grandchild.`
- line 20: `The value this process carries in \`LSP_FIXTURE_AMBIENT\` so a child can report what it inherited.` → `Names the value this process carries in \`LSP_FIXTURE_AMBIENT\` so a child can report what it inherited.`
- line 33: `The exit a child reports on this host after a transport kills it.` → `Names the exit a child reports on this host after a transport kills it.`
- line 44: `The Oxlint entry the live receipt drives in its language-server mode.` → `Names the Oxlint entry the live receipt drives in its language-server mode.`
- line 47: `The document the Oxlint receipt opens, carrying exactly one rule violation.` → `Names the document the Oxlint receipt opens, carrying exactly one rule violation.`
- line 50: `The rule the Oxlint receipt pins, reported as this diagnostic code.` → `Names the rule the Oxlint receipt pins, reported as this diagnostic code.`
- line 53: `The workspace the Oxlint receipt lints, pinned to one rule so its diagnostics stay fixed.` → `Names the workspace the Oxlint receipt lints, pinned to one rule so its diagnostics stay fixed.`

`tests/src/server/fixtures/protocol.mjs`, one `policy/no-malformed-summary` diagnostic naming the symbol `frame` in its first sentence:

- line 13: `Frames a JSON-RPC message as one Content-Length base-protocol frame.` → `Encodes a JSON-RPC message as one Content-Length base-protocol payload.` (drops the literal word `frame`, keeps every fact the paragraph carried; the `@param`/`@returns` lines are unchanged).

`policy/no-banned-term` reported no hit in either file (P20's reading was `banned 0`), so no substitution-table edit was needed. `npm run test:policy` passed with no `prose` failure naming a line in `guides/**` or `README.md`, so no file in that scope needed an edit and none was made.

## Item 4 — the bump

`package.json`: `"version": "0.0.6"` → `"version": "0.0.7"`. `package-lock.json` untouched.

## Acceptance criteria

1. `git status --short`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/src/server/fixtures/protocol.mjs
 M tsconfig.json
?? scripts/docs.ts
```

Matches the P21 repair list plus `tests/guides.test.ts` plus the item-3 files (`tests/setupServer.ts`, `tests/src/server/fixtures/protocol.mjs`) plus `package.json`'s version bump. Nothing else.

2. Gates:

- `npm run format:check` — `All matched files use the correct format.` exit 0.
- `npx oxlint --config .oxlintrc.json --deny-warnings .` — no output, exit 0.
- `npm run check` — `tsc --noEmit --project tsconfig.json && npm run check:src` (core, server) — no diagnostics, exit 0.

3. Tests:

- `npm run test:guides` — `Test Files 1 passed (1)` / `Tests 27 passed (27)`, exit 0.
- `npm run test:policy` — `Test Files 1 passed (1)` / `Tests 90 passed | 1 skipped (91)`, exit 0.
- `npm run test:config` — `Test Files 1 passed (1)` / `Tests 172 passed | 1 skipped (173)`, exit 0.

4. `npm run docs` — exit 1 (expected). Worklist verbatim:

```
guides/lsp.md class StdioClientTransport: guide absent source "Streams Language Server Protocol bytes between a client and a child process over stdio."
guides/lsp.md function createStdioClientTransport: guide absent source "Creates a byte transport over a Language Server Protocol child process."
guides/lsp.md interface StdioClientTransportInterface: guide absent source "Defines the stdio transport's own surface beyond the byte transport it carries."
guides/lsp.md interface StdioClientTransportOptions: guide absent source "Configures a Language Server Protocol child process reached over its standard streams."
guides/lsp.md class LSPClient: guide absent source "Drives a Language Server Protocol peer through an injected byte transport."
guides/lsp.md function createLSPClient: guide absent source "Creates a transport-agnostic Language Server Protocol client."
guides/lsp.md interface LSPClientInterface: guide absent source "Defines the document-oriented behavior exposed by an LSP client."
guides/lsp.md interface LSPClientOptions: guide absent source "Configures an LSP client and its transport."
guides/lsp.md interface LSPOpenOptions: guide absent source "Configures a document inspection."
guides/lsp.md type LSPClientEventMap: guide absent source "Maps client event names to their listener arguments."
guides/lsp.md type LSPClientLifecycle: guide absent source "Describes the lifecycle state that gates client operations and transport generations."
guides/lsp.md interface LSPClientCapabilities: guide absent source "Describes the Language Server Protocol features this client advertises."
guides/lsp.md interface LSPTransportInterface: guide absent source "Defines the byte transport required by an LSP client."
guides/lsp.md type LSPTransportEventMap: guide absent source "Maps transport event names to their listener arguments."
guides/lsp.md interface LSPPending: guide absent source "Describes one settlement record a client holds for an operation awaiting its outcome."
guides/lsp.md function encodeLSPMessage: guide absent source "Encodes a JSON-RPC message as one byte-accurate LSP base-protocol frame."
guides/lsp.md function parseLSPMessages: guide absent source "Parses a byte chunk into complete LSP base-protocol messages and retained decode state."
guides/lsp.md type LSPDecodeState: guide absent source "Retains incremental base-protocol bytes and resolved framing metadata between decode calls."
guides/lsp.md function joinLSPSegments: guide absent source "Flattens the retained segments of a decode state into one owned buffer."
guides/lsp.md function takeLSPTail: guide absent source "Takes the last retained bytes of a decode state as an owned buffer."
guides/lsp.md function scanLSPBoundary: guide absent source "Finds the first base-protocol header boundary in a flat buffer."
guides/lsp.md function readLSPHeader: guide absent source "Reads one base-protocol header block and returns the content length it declares."
guides/lsp.md function readLSPBody: guide absent source "Reads one base-protocol content body as a validated JSON-RPC message."
guides/lsp.md function waitForDeadline: guide absent source "Waits for a deadline to elapse."
guides/lsp.md class LSPError: guide absent source "Reports a package failure with a stable machine-readable category."
guides/lsp.md function isLSPError: guide absent source "Checks whether an unknown value is a branded package error."
guides/lsp.md type LSPErrorCode: guide absent source "Identifies a stable package failure category, derived from `LSP_ERROR_CODES`."
guides/lsp.md interface LSPErrorContext: guide absent source "Describes structured details attached to an `LSPError`."
guides/lsp.md interface LSPErrorOptions: guide absent source "Configures an `LSPError` instance."
guides/lsp.md type JSONRPCId: guide absent source "Identifies a JSON-RPC request and its matching response."
guides/lsp.md interface JSONRPCRequest: guide absent source "Describes a JSON-RPC 2.0 method call that requires a response."
guides/lsp.md interface JSONRPCNotification: guide absent source "Describes a JSON-RPC 2.0 method call that permits no response."
guides/lsp.md interface JSONRPCError: guide absent source "Describes the error payload carried by a JSON-RPC error response."
guides/lsp.md interface JSONRPCResultResponse: guide absent source "Describes a successful JSON-RPC 2.0 response."
guides/lsp.md interface JSONRPCErrorResponse: guide absent source "Describes a failed JSON-RPC 2.0 response."
guides/lsp.md type JSONRPCResponse: guide absent source "Describes either outcome of a JSON-RPC 2.0 request."
guides/lsp.md type JSONRPCMessage: guide absent source "Describes one complete JSON-RPC 2.0 wire message."
guides/lsp.md interface LSPIdentity: guide absent source "Describes the name and optional version of an LSP peer."
guides/lsp.md interface LSPInitializeParams: guide absent source "Describes the initialization members sent by this client."
guides/lsp.md interface LSPInitializeResult: guide absent source "Describes the successful result of an initialize request."
guides/lsp.md interface LSPServerCapabilities: guide absent source "Describes the known and extension capabilities returned by a language server."
guides/lsp.md interface LSPExit: guide absent source "Describes how a transport process ended."
guides/lsp.md type LSPDocumentURI: guide absent source "Identifies a document by its Language Server Protocol URI."
guides/lsp.md interface LSPPosition: guide absent source "Describes a zero-based position inside a text document."
guides/lsp.md interface LSPRange: guide absent source "Describes a half-open span inside a text document."
guides/lsp.md interface LSPLocation: guide absent source "Describes a document URI and range pair."
guides/lsp.md interface LSPTextDocumentIdentifier: guide absent source "Identifies a text document in a Language Server Protocol message."
guides/lsp.md interface LSPTextDocumentItem: guide absent source "Describes the complete text and identity of a document being opened."
guides/lsp.md type LSPDiagnosticSeverity: guide absent source "Identifies the standard severity assigned to a diagnostic, derived from `LSP_DIAGNOSTIC_SEVERITIES`."
guides/lsp.md type LSPDiagnosticTag: guide absent source "Identifies a standard tag assigned to a diagnostic, derived from `LSP_DIAGNOSTIC_TAGS`."
guides/lsp.md interface LSPCodeDescription: guide absent source "Describes the external resource that explains a diagnostic code."
guides/lsp.md interface LSPDiagnosticRelated: guide absent source "Describes related diagnostic text at another source location."
guides/lsp.md interface LSPDiagnostic: guide absent source "Describes one Language Server Protocol diagnostic."
guides/lsp.md interface LSPPublishDiagnosticsParams: guide absent source "Describes diagnostics published for one document."
guides/lsp.md interface LSPDocumentDiagnosticParams: guide absent source "Describes a request for diagnostics from one document."
guides/lsp.md type LSPDocumentDiagnosticReport: guide absent source "Describes a complete or unchanged document diagnostic report."
guides/lsp.md type LSPPositionEncoding: guide absent source "Identifies a position encoding selected by a language server."
guides/lsp.md type LSPTextDocumentSyncKind: guide absent source "Identifies the text synchronization mode selected by a language server, derived from `LSP_SYNC_KINDS`."
guides/lsp.md interface LSPTextDocumentSyncOptions: guide absent source "Describes the text synchronization features selected by a language server."
guides/lsp.md type LSPTextDocumentSync: guide absent source "Describes either compact or expanded text synchronization capabilities."
guides/lsp.md interface LSPDiagnosticOptions: guide absent source "Describes the diagnostic provider features selected by a language server."
guides/lsp.md function isJSONRPCError: guide absent source "Checks whether an unknown value is a JSON-RPC error payload."
guides/lsp.md function isJSONRPCRequest: guide absent source "Checks whether an unknown value is a JSON-RPC request."
guides/lsp.md function isJSONRPCNotification: guide absent source "Checks whether an unknown value is a JSON-RPC notification."
guides/lsp.md function isJSONRPCResponse: guide absent source "Checks whether an unknown value is a JSON-RPC response."
guides/lsp.md function isLSPPosition: guide absent source "Checks whether an unknown value is an LSP position."
guides/lsp.md function isLSPRange: guide absent source "Checks whether an unknown value is an LSP range."
guides/lsp.md function isLSPLocation: guide absent source "Checks whether an unknown value is an LSP location."
guides/lsp.md function isLSPCodeDescription: guide absent source "Checks whether an unknown value is an LSP code description."
guides/lsp.md function isLSPDiagnosticRelated: guide absent source "Checks whether an unknown value is related diagnostic information."
guides/lsp.md function isLSPDiagnostic: guide absent source "Checks whether an unknown value is an LSP diagnostic."
guides/lsp.md function isLSPPublishDiagnosticsParams: guide absent source "Checks whether an unknown value is published diagnostic parameters."
guides/lsp.md function isLSPDocumentDiagnosticReport: guide absent source "Checks whether an unknown value is a document diagnostic report."
guides/lsp.md function isLSPIdentity: guide absent source "Checks whether an unknown value is an LSP identity."
guides/lsp.md const isLSPDiagnosticSeverity: guide absent source "Checks whether an unknown value is a diagnostic severity."
guides/lsp.md const isLSPDiagnosticTag: guide absent source "Checks whether an unknown value is a diagnostic tag."
guides/lsp.md const isLSPTextDocumentSyncKind: guide absent source "Checks whether an unknown value is a text synchronization mode."
guides/lsp.md function isLSPTextDocumentSyncOptions: guide absent source "Checks whether an unknown value is expanded text synchronization options."
guides/lsp.md function isLSPDiagnosticOptions: guide absent source "Checks whether an unknown value is diagnostic provider options."
guides/lsp.md function isLSPServerCapabilities: guide absent source "Checks whether an unknown value is server capabilities this client can consume."
guides/lsp.md function isLSPInitializeResult: guide absent source "Checks whether an unknown value is a successful initialize result."
guides/lsp.md const LSP_METHODS: guide absent source "Names the Language Server Protocol methods this client sends or consumes."
guides/lsp.md const LSP_ENCODINGS: guide absent source "Lists the position encodings named by Language Server Protocol 3.18."
guides/lsp.md const LSP_ERROR_CODES: guide absent source "Lists the machine-readable failure categories an `LSPError` carries, in declaration order."
guides/lsp.md const LSP_DIAGNOSTIC_SEVERITIES: guide absent source "Lists the diagnostic severities named by the Language Server Protocol, from error to hint."
guides/lsp.md const LSP_DIAGNOSTIC_TAGS: guide absent source "Lists the diagnostic tags named by the Language Server Protocol."
guides/lsp.md const LSP_SYNC_KINDS: guide absent source "Lists the text synchronization modes named by the Language Server Protocol."
guides/lsp.md const LSP_CAPABILITIES: guide absent source "Describes the capabilities this client advertises in its initialize request."
guides/lsp.md const LSP_TIMEOUT: guide absent source "Names the default request-settlement timeout in milliseconds."
guides/lsp.md const JSONRPC_PARSE_ERROR: guide absent source "Identifies a malformed JSON payload."
guides/lsp.md const JSONRPC_INVALID_REQUEST: guide absent source "Identifies a structurally invalid JSON-RPC request."
guides/lsp.md const JSONRPC_METHOD_NOT_FOUND: guide absent source "Identifies a JSON-RPC method that the receiver does not provide."
guides/lsp.md const JSONRPC_INVALID_PARAMS: guide absent source "Identifies invalid parameters supplied to a JSON-RPC method."
guides/lsp.md const JSONRPC_INTERNAL_ERROR: guide absent source "Identifies an internal JSON-RPC receiver failure."
guides/lsp.md const LSP_REQUEST_CANCELLED: guide absent source "Identifies a Language Server Protocol request cancelled by the client."
guides/lsp.md const LSP_CONTENT_MODIFIED: guide absent source "Identifies a request invalidated by modified document content."
guides/lsp.md const LSP_SERVER_CANCELLED: guide absent source "Identifies a Language Server Protocol request cancelled by the server."
guides/lsp.md const LSP_REQUEST_FAILED: guide absent source "Identifies a valid Language Server Protocol request that could not complete."
guides/lsp.md const LSP_CONTENT_LIMIT: guide absent source "Bounds an accepted base-protocol content body to 64 MiB."
guides/lsp.md const LSP_HEADER_LIMIT: guide absent source "Bounds an accepted base-protocol header to 64 KiB."
guides/lsp.md LSPClientInterface.start: guide absent source "Starts or restarts a transport generation and completes its initialize handshake."
guides/lsp.md LSPClientInterface.open: guide absent source "Opens a document and waits for diagnostics through the path selected from the server capabilities."
guides/lsp.md LSPClientInterface.close: guide absent source "Notifies the server that an owned document closed and releases the URI."
guides/lsp.md LSPClientInterface.destroy: guide absent source "Tears down the client within the configured timeout."
guides/lsp.md LSPTransportInterface.start: guide absent source absent
guides/lsp.md LSPTransportInterface.send: guide absent source absent
guides/lsp.md LSPTransportInterface.close: guide absent source absent
guides/lsp.md pitch: readme absent tagline "A typed Language Server Protocol client over an injected byte transport. The host-independent core owns the base-protocol framing codec, the JSON-RPC and protocol guards, and `LSPClient`, which completes the initialize handshake, owns opened document URIs, and selects pull or push diagnostics from the server's own capabilities. The server environment adds `StdioClientTransport`, the byte transport over a language server run as a child process. Source: `src/core`, `src/server`. Published through `@orkestrel/lsp` and `@orkestrel/lsp/server`."
rows read: 1, disagreements found: 108
```

## No deviation

No `repair` write outside the P21 list, every before-text was found verbatim, no voice diagnostic named an off-limits file, `test:policy` reported no red anywhere, and no gate other than `docs` read red after the items.

---

Orchestrator's annotation (2026-09-08, the audit): the audit ruled counts in this report's prose (sites, edits, summaries tallied rather than named); the per-site lists that follow each tally name every member, and the tree is authoritative.
The citation of the pilot's copied shape as `tests/guides.test.ts:145-227` is unbounded at both ends; the copied regions are `:146-171` and `:191-228` (objective claim 12).
