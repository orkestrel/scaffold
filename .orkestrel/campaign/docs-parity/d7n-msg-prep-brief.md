# Brief — P.1 `d7n-msg-prep` (msg's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/msg` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `42ace90`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

msg's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's `c86f7fd`) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== msg 2026-09-07T14:51:46Z tarball sha256 85031b9260758fe3
== before
0.0.17
(status end)
== replaced range
78:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 823ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### msg (42ace90, version 0.0.9, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 27 unchanged, 0 removed in ..
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
   tests/setup.ts(5)
   tests/src/core/helpers.test.ts(1)
   src/core/helpers.ts(1)
-- docs
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
   guides/msg.md function detectFormat: guide absent source "Derives the EmailFormat from a file name and/or MIME type. Returns undefined when the format cannot be determined."
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
-- check
   tests/guides.test.ts(146,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(149,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(153,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(168,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(183,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 8 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  8 failed | 25 passed (33)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 48ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) } ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) } ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 7 | summary 4 | banned 3 | tests/setup.ts(5) tests/src/core/helpers.test.ts(1) src/core/helpers.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for msg (taken 2026-09-07T14:52Z by facts.sh)

- Checkout `/home/user/fleet/msg`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `42ace90`, status: clean
- `package.json`: version `0.0.9`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: no
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
    139:			const members = source.methods(group.interface)
    146:					expect(findMissing(members, group.methods)).toEqual([])
    149:					expect(findMissing(group.methods, members)).toEqual([])
    153:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    168:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    171:		for (const group of guide.methods()) {
    181:							? source.examples(group.interface)
    182:							: source.examples(group.interface).concat(source.examples(entity))
    183:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    195:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 404:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` once, map the `examples` binding's records to names (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.9"` → `"version": "0.0.10"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-msg-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
