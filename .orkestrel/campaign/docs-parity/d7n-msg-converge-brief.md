# Brief — P.2 `d7n-msg-converge` (msg under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/msg` from the committed baseline `1e83f24` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.10`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/msg.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the equality case, the population pin naming both title sets, and the README case, each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/msg/guides/msg.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-msg-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state one `Shape` idiom with its convention sentence under that table, worded against the rows that remain.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/msg.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Title the block first and record that run, then carry the body in with `npm run docs -- --to source` and record that run. Every other block stays untitled.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in scaffold's inline form (`fence.title !== undefined && titled.has(fence.title)`, no local predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: where the guide's § Tests lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled fence against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing.

## The first `docs` worklist on this baseline

```text
guides/msg.md const MSG_PROP_SIZE_OFFSET: guide absent source "Locates the stream byte length within a directory entry."
guides/msg.md const MSG_CATEGORY_UNALLOCATED: guide absent source "Names the unallocated directory entry category."
guides/msg.md const MSG_CATEGORY_DIRECTORY: guide absent source "Names the storage (folder) directory entry category."
guides/msg.md const MSG_CATEGORY_DOCUMENT: guide absent source "Names the stream (document) directory entry category."
guides/msg.md const MSG_CATEGORY_ROOT: guide absent source "Names the root storage directory entry category."
guides/msg.md const MSG_PREFIX_ATTACHMENT: guide absent source "Holds the name prefix for attachment storage entries."
guides/msg.md const MSG_PREFIX_RECIPIENT: guide absent source "Holds the name prefix for recipient storage entries."
guides/msg.md const MSG_PREFIX_DOCUMENT: guide absent source "Holds the name prefix for document (substg) stream entries."
guides/msg.md const MSG_PREFIX_NAMEID: guide absent source "Holds the name prefix for named property mapping storage."
guides/msg.md const MSG_FIELD_NAME_MAPPING: guide absent source "Maps a MAPI property tag to a field name."
guides/msg.md const MSG_FIELD_FULL_NAME_MAPPING: guide absent source "Maps a full 8-char property tag to a field name (for compound tags)."
guides/msg.md const MSG_FIELD_TYPE_MAPPING: guide absent source "Maps a MAPI property type tag to a decode type."
guides/msg.md const MSG_FIELD_CLASS_ATTACHMENT_DATA: guide absent source "Identifies the attachment data class."
guides/msg.md const MSG_FIELD_DIR_TYPE_INNER_MSG: guide absent source "Names the directory field type indicating an embedded MSG."
guides/msg.md const MSG_MAPI_RECIPIENT_TO: guide absent source "Names the TO MAPI recipient type."
guides/msg.md const MSG_MAPI_RECIPIENT_CC: guide absent source "Names the CC MAPI recipient type."
guides/msg.md const MSG_MAPI_RECIPIENT_BCC: guide absent source "Names the BCC MAPI recipient type."
guides/msg.md const MSG_PIDLID_MAPPING: guide absent source "Holds the PidLid property set GUID to LID-to-field-name mapping. Maps well-known MAPI named property sets to their property long IDs and corresponding field names on MSGFieldData."
guides/msg.md const MSG_BURNER_INTS_PER_SECTOR: guide absent source "Holds the number of 32-bit integers per standard sector (128)."
guides/msg.md const MSG_BURNER_DIFAT_HEADER_SLOTS: guide absent source "Caps the DIFAT entries stored in the CFB header (109)."
guides/msg.md const MSG_BURNER_FAT_SECTOR_MARKER: guide absent source "Marks a sector as holding FAT data (-3)."
guides/msg.md const MSG_BURNER_DIFAT_SECTOR_MARKER: guide absent source "Marks a sector as holding DIFAT data (-4)."
guides/msg.md const MSG_BURNER_NAME_MAX: guide absent source "Caps the UTF-16 code units allowed in a CFB directory entry name (31). The fixed 64-byte name field holds 32 UTF-16 units including the NUL terminator, so the name itself is capped at 31 units."
guides/msg.md const MSG_BURNER_ROOT_CLSID: guide absent source "Holds the root entry CLSID for MSG compound files."
guides/msg.md const EML_EXTENSIONS: guide absent source "Lists the file extensions recognized as RFC 2822 / MIME email files."
guides/msg.md const MSG_EXTENSIONS: guide absent source "Lists the file extensions recognized as Outlook binary email files."
guides/msg.md const EML_MIME_TYPES: guide absent source "Lists the MIME types recognized as RFC 2822 / MIME email files."
guides/msg.md const MSG_MIME_TYPES: guide absent source "Lists the MIME types recognized as Outlook binary email files."
guides/msg.md const FALLBACK_CHARSET: guide absent source "Names the default charset for decoding MIME part bodies."
guides/msg.md const FALLBACK_ATTACHMENT_NAME: guide absent source "Names the default file name for attachments without an explicit name."
guides/msg.md const MIME_EXTENSIONS: guide absent source "Maps common MIME types to file extensions. Used for inferring the correct extension during file extraction."
guides/msg.md const MIME_MAX_DEPTH: guide absent source "Caps the multipart nesting depth accepted by `parseMIMEPart`. Guards against pathological or hostile MIME trees causing unbounded recursion."
guides/msg.md const UTF8_SEQUENCE_MINIMUM: guide absent source "Holds the minimum valid code point for each UTF-8 sequence length, keyed by the number of continuation bytes (1, 2, or 3). Enforces the WHATWG requirement that a sequence encode the shortest possible form — an overlong encoding (a code point below its sequence's minimum) is rejected rather than accepted by `decodeUTF8`."
guides/msg.md const WINDOWS_1252_HIGH: guide absent source "Holds the Windows-1252 high-byte (0x80-0x9F) to Unicode code point lookup. Index `n` maps byte `0x80 + n` to its Unicode code point; entries that Windows-1252 leaves undefined map to the byte's own value (C1 control code passthrough) per the WHATWG encoding standard."
guides/msg.md class MSGError: guide absent source "Represents an error thrown or returned by the MSG/EML parsing and burning surfaces."
guides/msg.md function isMSGError: guide absent source "Narrows an unknown caught (or `Failure.error`) value to an `MSGError`."
guides/msg.md function success: guide absent source "Constructs a `Success` wrapping a value."
guides/msg.md function failure: guide absent source "Constructs a `Failure` wrapping an error."
guides/msg.md function isSuccess: guide absent source "Narrows a Result to Success."
guides/msg.md function isFailure: guide absent source "Narrows a Result to Failure."
guides/msg.md function truncateAtNull: guide absent source "Truncates a string at its first NUL character."
guides/msg.md function readUTF16String: guide absent source "Reads a UTF-16LE string from a DataView."
guides/msg.md function decodeText: guide absent source "Decodes bytes into a string using the named encoding. Default: `windows-1252`. Every branch runs a pure-ES decoder — no `TextDecoder` dependency, so this stays usable in the core's DOM/Node-free environment."
guides/msg.md function fileTimeToUTCString: guide absent source "Converts a Windows FILETIME (100-ns intervals since 1601-01-01) to a UTC date string. Combines the low/high 32-bit halves with `BigInt` so the 64-bit interval count never loses precision to float64 rounding."
guides/msg.md function toHexLower: guide absent source "Converts a number to a lowercase hex string with specified padding."
guides/msg.md function readMicrosoftUUID: guide absent source "Reads a mixed-endian Microsoft UUID from a byte array."
guides/msg.md function roundUpToMultiple: guide absent source "Rounds a value up to the nearest multiple of a boundary."
guides/msg.md function computeSectors: guide absent source "Computes how many sectors are needed to hold a given byte count."
guides/msg.md function compareCFBName: guide absent source "Orders two directory names as the compound file format requires. Compares by UTF-16 length first, then by uppercased code points."
guides/msg.md function isMSGFile: guide absent source "Validates that a DataView starts with the CFB magic header."
guides/msg.md function decodeBase64: guide absent source "Decodes a Base64 string into raw bytes without relying on `atob`. Ignores ASCII whitespace and tolerates missing padding."
guides/msg.md function encodeUTF8: guide absent source "Encodes a string into UTF-8 bytes, handling surrogate pairs. A lone (unpaired) surrogate encodes as U+FFFD."
guides/msg.md function decodeUTF8: guide absent source "Decodes UTF-8 bytes into a string, WHATWG-style: an invalid byte sequence decodes as U+FFFD rather than throwing. Rejects overlong encodings, surrogate code points (0xD800-0xDFFF), and code points beyond 0x10FFFF — each invalid sequence yields exactly one U+FFFD and decoding resumes at the next lead byte."
guides/msg.md function decodeLatin1: guide absent source "Decodes Latin-1 (ISO-8859-1) bytes into a string, byte-for-code-point."
guides/msg.md function decodeWindows1252: guide absent source "Decodes Windows-1252 bytes into a string. Identical to `decodeLatin1` except for the 0x80-0x9F range, which maps through `WINDOWS_1252_HIGH`."
guides/msg.md function resolveEncoding: guide absent source "Resolves a free-form charset label (as seen in a MIME `charset` parameter) to a supported `MSGEncoding`. Unknown or absent labels fall back to `FALLBACK_CHARSET`."
guides/msg.md function detectFormat: guide absent source "Derives the EmailFormat from a file name, a MIME type, or both. Returns undefined when the format cannot be determined."
guides/msg.md function parseMIMEHeaders: guide absent source "Parses headers from a raw RFC 2822 / MIME header text block."
guides/msg.md function decodeMIMEEncoding: guide absent source "Decodes a MIME-encoded body string into a raw byte array."
guides/msg.md function decodeMIMEText: guide absent source "Decodes a MIME-encoded body into a text string based on an arbitrary charset label, resolved through `resolveEncoding`."
guides/msg.md function decodeMIMEWords: guide absent source "Decodes RFC 2047 encoded words in header values. Handles both Base64 (B) and Quoted-Printable (Q) forms."
guides/msg.md function formatEmailAddress: guide absent source "Formats a name and email into a standard composite address."
guides/msg.md function inferExtension: guide absent source "Infers the file extension for an attachment based on its filename or MIME type. Returns the extension including the dot, for example '.jpg'."
guides/msg.md function burnCFB: guide absent source "Reconstitutes a valid CFB (Compound Binary File) from a flat list of `MSGBurnerEntry` descriptors — root storage at index 0, its children reachable through `children` indices."
guides/msg.md function extractMessageFromMSG: guide absent source "Extracts a single EmailMessage from a parsed MSG source. Reads field data and attachments from the given source. Each attachment is read independently: a corrupt attachment throws from `reader.attachment(i)` is caught and that attachment is skipped so the rest of the message still parses. This containment keeps one damaged attachment stream from failing the entire message extraction."
guides/msg.md function extractMessage: guide absent source "Extracts a single EmailMessage from a top-level MIMEPart. Walks the full MIME tree to collect text, HTML, and attachments."
guides/msg.md function parseMIMEPart: guide absent source "Parses a raw RFC 2822 / MIME text string into a MIMEPart tree. Line endings are normalised to \\n before processing. Recursion is capped at `MIME_MAX_DEPTH` to guard against a hostile or pathological multipart nesting cycle."
guides/msg.md function isRecord: guide absent source "Narrows an unknown value to a plain record."
guides/msg.md function isEmailFormat: guide absent source "Narrows an unknown value to a valid EmailFormat."
guides/msg.md function isEmailAttachment: guide absent source "Narrows an unknown value to `EmailAttachment`."
guides/msg.md function isEmailMessage: guide absent source "Narrows an unknown value to `EmailMessage`."
guides/msg.md function isEmailChain: guide absent source "Narrows an unknown value to `EmailChain`."
guides/msg.md class MSG: guide absent source "Parses raw .eml or .msg file bytes into a structured `EmailChain`, exposing (for .msg input) the raw MAPI field tree, attachment binary access, and CFB reconstitution. Every parsing step treats the input as untrusted: sector and property chains are cycle-guarded and length-capped, every raw byte range is bounds-checked before a view is constructed over it, and every failure surfaces as a typed `MSGError` rather than a raw `RangeError` or `TypeError`."
guides/msg.md function createMSG: guide absent source "Creates a new `MSGInterface` for the given .eml or .msg input."
guides/msg.md MSGInterface.attachment: guide absent source "Reads attachment binary content by index. Requires `'msg'` input. For `'eml'` input the MAPI field tree this index addresses is absent, so every index throws; read an `.eml` file's attachments from `chain.messages[0].attachments` instead."
guides/msg.md MSGInterface.burn: guide absent source "Rebuilds the parsed MSG as a standalone CFB/.msg binary."
guides/msg.md MSGSourceInterface.parse: guide absent source "Reads the parsed MAPI field tree."
guides/msg.md MSGSourceInterface.attachment: guide absent source "Reads attachment binary content by index."
guides/msg.md pitch: readme absent tagline "A zero-dependency parser for Outlook `.msg` (CFB/OLE2 compound binary) and `.eml` (RFC 2822 / MIME) email files. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 129
exit 1
```

## Facts for msg (taken 2026-09-07T14:58Z by facts.sh)

- Checkout `/home/user/fleet/msg`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `1e83f24`, status: clean
- `package.json`: version `0.0.10`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: no
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 7 | summary 4 | banned 3 | tests/setup.ts(5) tests/src/core/helpers.test.ts(1) src/core/helpers.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec               | Source                    | Tests                                 |
    8:| ------- | ------------------ | ------------------------- | ------------------------------------- |
    9:| MSG     | [`msg.md`](msg.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide              |
    14:| ---------- | ------------------ |
    15:| `src/core` | [`msg.md`](msg.md) |
- Guide `guides/msg.md`: 417 lines. Headings:
    1:# MSG
    7:## Surface
    37:### Types
    69:### Constants
    135:### Errors
    154:### Helpers
    242:### Shapers
    280:### Parsers
    294:### Validators
    331:### `MSG`
    345:### Factories
    362:## Methods
    366:#### `MSGInterface`
    373:#### `MSGSourceInterface`
    391:## Round-trip semantics
    395:## Embedded vs. top-level burn
    404:## Tests
    414:## See also
- Table headers in `guides/msg.md` (a header row is the row before a `| ---` row):
    41: | Type                  | Kind      | Shape                                                                                                                               |
    73: | Constant                            | Kind  | Behavior                                                                                                                                         |
    139: | Symbol       | Kind     | Signature                               | Behavior                                                                                                                   |
    158: | Helper                | Kind     | Signature                                                           | Behavior                                                                                                                          |
    246: | Shaper                  | Kind     | Signature                                            | Behavior                                                                                                                                                                               |
    284: | Parser          | Kind     | Signature                                   | Behavior                                                                                                      |
    298: | Guard               | Kind     | Narrows to                | Behavior                                                                                                                                                |
    349: | Factory     | Kind     | Signature                                                                   | Behavior                                                                                                                                                                                                                    |
    368: | Method       | Returns         | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
    375: | Method       | Returns         | Behavior                                                                                    |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/msg.md`):
    3: > A zero-dependency parser for Outlook `.msg` (CFB/OLE2 compound binary) and
    4: > `.eml` (RFC 2822 / MIME) email files. Source: [`src/core`](../src/core).
    5: > Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    7: ## Surface
    9: One `MSG` class parses either format. Construction is eager: the constructor
- README (`README.md`) first lines:
    # @orkestrel/msg
    
    A zero-dependency Outlook `.msg` (CFB/OLE2) and `.eml` (RFC 2822/MIME) email
    parser — extracts headers, bodies, recipients, and attachments into typed
    structures. Feed it raw file bytes plus an optional file name or MIME hint; the
    format is detected automatically and the file is parsed into a structured
    `EmailChain` — sender, recipients, subject, date, text/HTML bodies, and
    decoded attachments. `.msg` files are read through a from-scratch CFB (Compound
    File Binary / OLE2) parser that walks the directory tree and extracts MAPI
    properties directly; `.eml` files are read through a from-scratch RFC 2822/MIME
    parser that walks the header block and the (possibly nested) MIME part tree.
    `createMSG` surfaces every parse failure as a `Failure<MSGError>` inside a
- `## Patterns` fences, each with its nearest preceding heading:
    26: fence under "## Surface"
    144: fence under "### Errors"
    188: fence under "### Helpers"
    252: fence under "### Shapers"
    288: fence under "### Parsers"
    306: fence under "### Validators"
    335: fence under "### `MSG`"
    353: fence under "### Factories"
    380: fence under "#### `MSGSourceInterface`"
- Exported factories and classes (`grep -n 'export function create\|export class' src/**/*.ts`):
    src/core/factories.ts:37:export function createMSG(input: MSGInput, options?: MSGOptions): Result<MSGInterface, MSGError> {
    src/core/MSG.ts:102:export class MSG implements MSGInterface {
    src/core/errors.ts:25:export class MSGError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/factories.ts:1
    src/core/helpers.ts:11
    src/core/MSG.ts:1
    src/core/errors.ts:2
- Drop-in sites (`tests/guides.test.ts`):
    7:// `FENCE_LANGUAGES`, `EXAMPLE_LANGUAGE`, `MODULES`, `INTERNAL`, and `ROOT_FILES` below are
    24:} from '@orkestrel/guide'
    87:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    93:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    138:		for (const group of guide.methods()) {
    139:			const members = source.methods(group.interface).map((method) => method.name)
    147:					expect(findMissing(members, documented)).toEqual([])
    150:					expect(findMissing(documented, members)).toEqual([])
    156:							: findMissing(
    157:									source.methods(entity).map((method) => method.name),
    175:				findUnexampled(
    178:					source.examples().map((example) => example.name),
    183:		for (const group of guide.methods()) {
    188:					? source.examples(group.interface).map((example) => example.name)
    192:							.concat(source.examples(entity).map((example) => example.name))
    199:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    211:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 404:## Tests — 0 lines naming a check or a code

## Standing conditions

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/msg.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` as gates. `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/msg.md`, `README.md`, the doc blocks under `src/**` (description paragraphs, `@remarks`, and `@example` titles and bodies only — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the three cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the three cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-msg-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No count in prose. No process diary.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
