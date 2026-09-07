# Report — `d7n-msg-prep`

Wall clock: 2026-09-07T14:53:05Z to 2026-09-07T14:56:35Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

Summary line: `9 written, 27 unchanged, 0 removed in ..`

`git status --short` after:

```
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

Matches the P21 list exactly.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

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

Examples case (`documents an example for every Surface function`):

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

Examples loop:

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

The import-walk `findMissing` sites (`statement.names` against `face.surface().map((symbol) => symbol.name)`, `names` against `surface`) were left unchanged. No other line of the suite changed.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 printed:

- `tests/setup.ts:12:1` `no-malformed-summary` (`asciiBytes`)
- `tests/setup.ts:24:1` `no-malformed-summary` (`patchBytes`)
- `tests/setup.ts:38:1` `no-malformed-summary` (`buildEml`) and `tests/setup.ts:38:1` `no-banned-term` (`via`, same doc block)
- `tests/setup.ts:52:1` `no-malformed-summary` (`buildNestedMultipart`)
- `src/core/helpers.ts:516:1` `no-banned-term` (`and/or`)
- `tests/src/core/helpers.test.ts:290:3` `no-banned-term` (`via`)

Fixes, one per diagnostic:

`tests/setup.ts` (`asciiBytes`, malformed summary):

```diff
-/**
- * Encode an ASCII/latin1 string to bytes, one byte per character
- * (`charCodeAt`) — used to build wire-format fixtures without `node:buffer`.
- */
+/**
+ * Encodes each character of a string to one byte (`charCodeAt`), for
+ * building ASCII/latin1 wire-format fixtures without `node:buffer`.
+ */
```

`tests/setup.ts` (`patchBytes`, malformed summary):

```diff
-/**
- * Return a COPY of `source` with each `[offset, value]` edit applied —
- * `source` itself is never mutated.
- */
+/**
+ * Returns a copy of `source` with each `[offset, value]` edit applied —
+ * `source` itself is never mutated.
+ */
```

`tests/setup.ts` (`buildEml`, malformed summary and banned term `via`):

```diff
-/**
- * Build a minimal RFC 2822 message from `headers` and `body` — each
- * `"Name: value"` line, a blank line, then the body, all CRLF-terminated —
- * returned as bytes via {@link asciiBytes}.
- */
+/**
+ * Builds a minimal RFC 2822 message from `headers` and `body` — each
+ * `"Name: value"` line, a blank line, then the body, all CRLF-terminated —
+ * returned as bytes through {@link asciiBytes}.
+ */
```

`tests/setup.ts` (`buildNestedMultipart`, malformed summary):

```diff
-/**
- * Build an eml whose body nests `multipart/mixed` parts `depth` levels
+/**
+ * Builds an eml whose body nests `multipart/mixed` parts `depth` levels
  * deep — a unique boundary per level (derived deterministically from the
  * level index, no randomness), CRLF line endings, innermost part is
  * `text/plain`. `depth` of `0` yields a plain (non-multipart) message.
  */
```

`src/core/helpers.ts` (banned term `and/or`):

```diff
 /**
- * Derives the EmailFormat from a file name and/or MIME type.
+ * Derives the EmailFormat from a file name, a MIME type, or both.
  * Returns undefined when the format cannot be determined.
```

`tests/src/core/helpers.test.ts` (banned term `via`):

```diff
-		// 2024-03-15T12:34:56.000Z, derived in-test via BigInt so it can never drift
+		// 2024-03-15T12:34:56.000Z, derived in-test through BigInt so it can never drift
```

`npx oxlint --config .oxlintrc.json --deny-warnings .` after these edits printed nothing (exit 0).

`npm run test:policy` then read one `prose` diagnostic in-scope: `guides/msg.md:180`, `and/or` banned term, in the `detectFormat` guide table row. Fix (substitution-table row applied, no other change to the row):

```diff
-| `detectFormat`        | function | `(name?: string, mime?: string) => EmailFormat \| undefined`        | Derives `EmailFormat` from a file name and/or MIME type; `undefined` when neither hints at a format.                              |
+| `detectFormat`        | function | `(name?: string, mime?: string) => EmailFormat \| undefined`        | Derives `EmailFormat` from a file name, a MIME type, or both; `undefined` when neither hints at a format.                         |
```

Re-run of `npm run test:policy` after this edit: `Test Files 1 passed (1)`, `Tests 90 passed | 1 skipped (91)`.

No diagnostic named a file outside scope.

## Item 4 — the bump

```diff
-	"version": "0.0.9",
+	"version": "0.0.10",
```

`package-lock.json` was not touched.

## Acceptance criteria

1. `git status --short`:

```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/msg.md
 M package.json
 M src/core/helpers.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/src/core/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

The P21 repair list, `tests/guides.test.ts`, and the item 3 files (`guides/msg.md`, `src/core/helpers.ts`, `tests/setup.ts`, `tests/src/core/helpers.test.ts`) plus `package.json` (`version`) — nothing else.

2. `npm run format:check`: `All matched files use the correct format.` exit 0.
   `npx oxlint --config .oxlintrc.json --deny-warnings .`: no output, exit 0.
   `npm run check`: `tsc --noEmit --project tsconfig.json && npm run check:src` then `check:src:core` — no diagnostics, exit 0.

3. `npm run test:guides`: `Test Files  1 passed (1)`, `Tests  33 passed (33)`, exit 0.
   `npm run test:policy`: `Test Files  1 passed (1)`, `Tests  90 passed | 1 skipped (91)`, exit 0.
   `npm run test:config`: `Test Files  1 passed (1)`, `Tests  172 passed | 1 skipped (173)`, exit 0.

4. `npm run docs`: exit 1 (expected). Worklist verbatim:

```
guides/msg.md interface Success: guide absent source "Represents a successful operation result."
guides/msg.md interface Failure: guide absent source "Represents a failed operation result."
guides/msg.md type Result: guide absent source "Represents a discriminated union for operations that can succeed or fail safely."
guides/msg.md type MSGEncoding: guide absent source "Names a supported text encoding for decoding non-Unicode MSG strings and MIME part bodies."
guides/msg.md type MSGErrorCode: guide absent source "Names a machine-readable classification for an `MSGError`."
guides/msg.md type MSGFieldType: guide absent source "Names a MAPI property data type tag."
guides/msg.md type MSGRecipientRole: guide absent source "Names a recipient role in a message."
guides/msg.md interface MSGDirectoryEntry: guide absent source "Represents a CFB directory entry describing a storage or stream in the compound file."
guides/msg.md interface MSGMutableFieldData: guide absent source "Represents an internal accumulator for MSG field extraction whose members are all readonly. The extraction path writes each resolved field through `Object.assign`, then narrows the accumulator to `MSGFieldData` at the public boundary."
guides/msg.md interface MSGNameIdEntry: guide absent source "Represents a resolved named property entry from the __nameid_version1.0 storage."
guides/msg.md interface MSGBurnerEntry: guide absent source "Describes a CFB entry for the MSG burner (CFB binary writer). Entries form a flat list starting with the root storage at index 0."
guides/msg.md interface MSGBurnerLiteEntry: guide absent source "Represents an internal lite entry with tree metadata used during CFB burn. Tracks red-black coloring and sector allocation alongside the source MSGBurnerEntry."
guides/msg.md interface MSGFieldData: guide absent source "Holds parsed field data extracted from an MSG file. Represents the root message, an attachment, or a recipient."
guides/msg.md interface MSGAttachment: guide absent source "Holds extracted attachment content from an MSG file."
guides/msg.md interface MSGSourceInterface: guide absent source "Represents a parsed MSG source an email shaper reads from: the field tree plus indexed attachment access."
guides/msg.md type EmailFormat: guide absent source "Names a supported email file format."
guides/msg.md interface MIMEHeader: guide absent source "Represents a parsed MIME header with value and parameter map."
guides/msg.md interface MIMEPart: guide absent source "Represents a recursive MIME part tree node."
guides/msg.md interface EmailAttachment: guide absent source "Represents an attachment extracted from an email message."
guides/msg.md interface EmailMessage: guide absent source "Represents a structured email message extracted from a parsed file."
guides/msg.md interface EmailChain: guide absent source "Represents a parsed email chain from a single file."
guides/msg.md interface EmailInput: guide absent source "Represents raw email input handed to an EmailParser."
guides/msg.md type MSGInput: guide absent source "Represents raw input accepted by `createMSG`: binary MSG bytes or an `EmailInput` for EML/MSG email parsing."
guides/msg.md interface MSGOptions: guide absent source "Configures the creation of an `MSGInterface`."
guides/msg.md interface MSGInterface: guide absent source "Exposes the public surface of a parsed MSG/EML file."
guides/msg.md const MSG_FILE_HEADER: guide absent source "Holds the CFB magic header bytes (0xD0CF11E0A1B11AE1)."
guides/msg.md const MSG_UNUSED_BLOCK: guide absent source "Names the sentinel for unused blocks in the FAT."
guides/msg.md const MSG_END_OF_CHAIN: guide absent source "Names the sentinel for end-of-chain in the FAT."
guides/msg.md const MSG_SECTOR_SIZE: guide absent source "Holds the standard CFB sector size in bytes (512), read when the header's sector shift is `MSG_S_BIG_BLOCK_MARK` and written by every burn."
guides/msg.md const MSG_S_BIG_BLOCK_MARK: guide absent source "Holds the header sector-shift value selecting `MSG_SECTOR_SIZE` (byte at offset 30)."
guides/msg.md const MSG_L_BIG_BLOCK_SIZE: guide absent source "Holds the large sector size (4096 bytes)."
guides/msg.md const MSG_L_BIG_BLOCK_MARK: guide absent source "Holds the large sector size mark in the header (byte at offset 30)."
guides/msg.md const MSG_MINI_SECTOR_SIZE: guide absent source "Holds the CFB mini-stream sector size in bytes (64)."
guides/msg.md const MSG_MINI_STREAM_CUTOFF: guide absent source "Sets the stream size below which a stream is stored in the mini-stream (4096)."
guides/msg.md const MSG_HEADER_PROPERTY_START_OFFSET: guide absent source "Locates the property (directory) start sector in the header."
guides/msg.md const MSG_HEADER_BAT_START_OFFSET: guide absent source "Locates the BAT sector array start in the header."
guides/msg.md const MSG_HEADER_BAT_COUNT_OFFSET: guide absent source "Locates the BAT sector count in the header."
guides/msg.md const MSG_HEADER_SBAT_START_OFFSET: guide absent source "Locates the SBAT start sector in the header."
guides/msg.md const MSG_HEADER_SBAT_COUNT_OFFSET: guide absent source "Locates the SBAT sector count in the header."
guides/msg.md const MSG_HEADER_XBAT_START_OFFSET: guide absent source "Locates the XBAT (DIFAT) start sector in the header."
guides/msg.md const MSG_HEADER_XBAT_COUNT_OFFSET: guide absent source "Locates the XBAT (DIFAT) sector count in the header."
guides/msg.md const MSG_PROP_NO_INDEX: guide absent source "Names the no-child/sibling index sentinel."
guides/msg.md const MSG_MAX_HIERARCHY_DEPTH: guide absent source "Caps the recursion depth accepted by the directory hierarchy builder (`MSGReader#buildHierarchy`). Defense-in-depth against a pathological or hostile directory tree — the sibling-chain and visited-set guards already bound each level, this caps the recursion depth itself."
guides/msg.md const MSG_DIRECTORY_ENTRY_SIZE: guide absent source "Holds the CFB directory entry size in bytes (128)."
guides/msg.md const MSG_PROP_NAME_SIZE_OFFSET: guide absent source "Locates the name byte length within a directory entry."
guides/msg.md const MSG_PROP_CATEGORY_OFFSET: guide absent source "Locates the object-category byte within a directory entry, mirroring the Compound File Binary object type field."
guides/msg.md const MSG_PROP_PREVIOUS_PROPERTY_OFFSET: guide absent source "Locates the left sibling index within a directory entry."
guides/msg.md const MSG_PROP_NEXT_PROPERTY_OFFSET: guide absent source "Locates the right sibling index within a directory entry."
guides/msg.md const MSG_PROP_CHILD_PROPERTY_OFFSET: guide absent source "Locates the child index within a directory entry."
guides/msg.md const MSG_PROP_START_BLOCK_OFFSET: guide absent source "Locates the start sector of stream data within a directory entry."
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
```

No deviation occurred: `repair` wrote exactly the P21 list, every before-text matched verbatim, no voice diagnostic named an off-limits file, `test:policy` reddened only on the in-scope `guides/msg.md` line, and every gate other than `docs` reads green.
