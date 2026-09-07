# Brief — P.2 `d7n-lsp-converge` (lsp under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/lsp` from the committed baseline `9f1bb34` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.7`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/lsp.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/lsp/guides/lsp.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-lsp-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/lsp.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/lsp.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/lsp.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
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
exit 1
```

## Facts for lsp (taken 2026-09-07T21:06Z by facts.sh)

- Checkout `/home/user/fleet/lsp`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `9f1bb34`, status: clean
- `package.json`: version `0.0.7`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    146:			const members = source.methods(group.interface).map((method) => method.name)
    154:					expect(findMissing(members, documented)).toEqual([])
    157:					expect(findMissing(documented, members)).toEqual([])
    163:							: findMissing(
    164:									source.methods(entity).map((method) => method.name),
    182:				findUnexampled(
    185:					source.examples().map((example) => example.name),
    190:		for (const group of guide.methods()) {
    195:					? source.examples(group.interface).map((example) => example.name)
    199:							.concat(source.examples(entity).map((example) => example.name))
    206:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    218:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks:  — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-lsp-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/lsp.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/lsp.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-lsp-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
