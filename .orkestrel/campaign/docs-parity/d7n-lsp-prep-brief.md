# Brief — P.1 `d7n-lsp-prep` (lsp's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/lsp` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `257a0ad`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

lsp's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== lsp 2026-09-07T16:42:41Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
93:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 994ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### lsp (257a0ad, version 0.0.6, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 33 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setupServer.ts(8)
   tests/src/server/fixtures/protocol.mjs(1)
-- docs
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
   exit 1
-- check
   tests/guides.test.ts(153,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(156,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(160,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(175,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(190,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 8 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  8 failed | 19 passed (27)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 9 | summary 9 | banned 0 | tests/setupServer.ts(8) tests/src/server/fixtures/protocol.mjs(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for lsp (taken 2026-09-07T16:43Z by facts.sh)

- Checkout `/home/user/fleet/lsp`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `257a0ad`, status: clean
- `package.json`: version `0.0.6`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 9 | summary 9 | banned 0 | tests/setupServer.ts(8) tests/src/server/fixtures/protocol.mjs(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept | Spec               | Source                                                   | Tests                       |
    9:| ------- | ------------------ | -------------------------------------------------------- | --------------------------- |
    10:| Package | [`lsp.md`](lsp.md) | [`src/core`](../src/core), [`src/server`](../src/server) | [`tests/src`](../tests/src) |
- Guide `guides/lsp.md`: 461 lines. Headings:
    1:# Language Server Protocol client
    11:## Client lifecycle
    74:## Transport seam
    109:## Stdio client transport
    177:## Framing state
    223:## Validation
    293:## Conformance
    303:## Methods
    305:#### `LSPClientInterface`
    316:#### `LSPTransportInterface`
    326:## Surface
- Table headers in `guides/lsp.md` (a header row is the row before a `| ---` row):
    309: | Method    | Signature                                                                                         | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
    320: | Method  | Signature                                   | Behavior                                                     |
    330: | Export                          | Kind      | Purpose                                                                       |
    339: | Export                  | Kind      | Purpose                                                                                           |
    355: | Export             | Kind      | Purpose                                                                  |
    374: | Export                  | Kind      | Purpose                                       |
    392: | Export                        | Kind      | Purpose                                          |
    416: | Export                          | Kind     | Purpose                                  |
    441: | Export                      | Kind  | Purpose                                                       |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/lsp.md`):
    3: > A typed Language Server Protocol client over an injected byte transport. The host-independent
    4: > core owns the base-protocol framing codec, the JSON-RPC and protocol guards, and `LSPClient`,
    5: > which completes the initialize handshake, owns opened document URIs, and selects pull or push
    6: > diagnostics from the server's own capabilities. The server environment adds
    7: > `StdioClientTransport`, the byte transport over a language server run as a child process. Source:
    8: > [`src/core`](../src/core), [`src/server`](../src/server). Published through `@orkestrel/lsp` and
    9: > `@orkestrel/lsp/server`.
- Opening prose after the blockquote (first two lines):
    11: ## Client lifecycle
    13: Create an `LSPClient` with an `LSPTransportInterface`, call `start()` before document operations,
- README (`README.md`) first lines:
    # @orkestrel/lsp
    
    A typed Language Server Protocol client over an injected byte transport. The
    host-independent core owns the base-protocol framing codec, the JSON-RPC and
    protocol guards, and `LSPClient`, which completes the initialize handshake, owns
    opened document URIs, and selects pull or push diagnostics from the server's own
    capabilities. The server environment adds `StdioClientTransport`, the byte
    transport over a language server run as a child process, with a bounded
    termination window that ends the child's whole tree. The client reaches its peer
    only through that seam, so any implementation of it drives the same client. Part
    of the `@orkestrel` line.
    
- `## Patterns` fences, each with its nearest preceding heading:
    46: fence under "## Client lifecycle"
    88: fence under "## Transport seam"
    127: fence under "## Stdio client transport"
    192: fence under "## Framing state"
    209: fence under "## Framing state"
    228: fence under "## Validation"
    247: fence under "## Validation"
    274: fence under "## Validation"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/factories.ts:23:export function createStdioClientTransport(
    src/core/factories.ts:23:export function createLSPClient(options: LSPClientOptions): LSPClientInterface {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/transports/StdioClientTransport.ts:44:export class StdioClientTransport implements StdioClientTransportInterface {
    src/core/LSPClient.ts:78:export class LSPClient implements LSPClientInterface {
    src/core/errors.ts:18:export class LSPError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/transports/StdioClientTransport.ts:1
    src/server/factories.ts:1
    src/core/LSPClient.ts:1
    src/core/validators.ts:20
    src/core/factories.ts:1
    src/core/helpers.ts:7
    src/core/constants.ts:1
    src/core/parsers.ts:1
    src/core/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    27:} from '@orkestrel/guide'
    54:const ROOT_FILES = Object.freeze([])
    60:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    145:		for (const group of guide.methods()) {
    146:			const members = source.methods(group.interface)
    153:					expect(findMissing(members, group.methods)).toEqual([])
    156:					expect(findMissing(group.methods, members)).toEqual([])
    160:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    175:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    178:		for (const group of guide.methods()) {
    188:							? source.examples(group.interface)
    189:							: source.examples(group.interface).concat(source.examples(entity))
    190:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    202:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks:  — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.6"` → `"version": "0.0.7"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-lsp-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
