# Last changes: msg

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `234386a`, merge base with `origin/main` `d525f39`, layer L0, declared version 0.0.8, registry version 0.0.8.

## Commits since origin/main

```text
2c308c3 2026-08-28 Update every dependency to the published latest
7bb66ef 2026-08-28 Adopt the catalog and guide mirrors for the wave
1131616 2026-09-01 Apply the verified src-audit fixes
e5d6e38 2026-09-01 Adopt the renamed guide helpers in the parity test
f58b968 2026-09-02 Apply the breaking rows in msg
b6cf00e 2026-09-02 Point the README at the guide the package ships
234386a 2026-09-02 Migrate the TSDoc voice to the third person
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md       |  17 ++---
 README.md                         |   2 +-
 package.json                      |   4 +-
 src/core/MSG.ts                   | 266 +++++++++++++++++++++++++++++++++++++++---------------------------------------
 src/core/constants.ts             | 141 +++++++++++++++++++++--------------------
 src/core/errors.ts                |  15 +++--
 src/core/factories.ts             |  10 +--
 src/core/helpers.ts               | 113 ++++++++++++++++-----------------
 src/core/parsers.ts               |   2 +-
 src/core/shapers.ts               |  39 ++++++------
 src/core/types.ts                 | 104 ++++++++++++++++++++-----------
 src/core/validators.ts            |  35 ++++++++---
 tests/guides.test.ts              |  22 +++----
 tests/src/core/MSG.test.ts        |  16 ++---
 tests/src/core/helpers.test.ts    |  39 ------------
 tests/src/core/parsers.test.ts    |   8 +--
 tests/src/core/shapers.test.ts    |  74 ++++++++++++----------
 tests/src/core/validators.test.ts |  46 ++++++++++++--
 18 files changed, 508 insertions(+), 445 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/core/constants.ts b/src/core/constants.ts
index fa430a7..28afe82 100644
--- a/src/core/constants.ts
+++ b/src/core/constants.ts
@@ -1,92 +1,94 @@
+import type { MSGFieldType } from './types.js'
+
 // === MSGReader
 
 /**
- * CFB magic header bytes (0xD0CF11E0A1B11AE1).
+ * Holds the CFB magic header bytes (0xD0CF11E0A1B11AE1).
  */
 export const MSG_FILE_HEADER = new Uint8Array([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])
 
 /**
- * Sentinel for unused blocks in the FAT.
+ * Names the sentinel for unused blocks in the FAT.
  */
 export const MSG_UNUSED_BLOCK = -1
 
 /**
- * Sentinel for end-of-chain in the FAT.
+ * Names the sentinel for end-of-chain in the FAT.
  */
 export const MSG_END_OF_CHAIN = -2
 
 /**
- * Small sector size (512 bytes).
+ * Holds the small sector size (512 bytes).
  */
 export const MSG_S_BIG_BLOCK_SIZE = 0x0200
 
 /**
- * Small sector size mark in the header (byte at offset 30).
+ * Holds the small sector size mark in the header (byte at offset 30).
  */
 export const MSG_S_BIG_BLOCK_MARK = 9
 
 /**
- * Large sector size (4096 bytes).
+ * Holds the large sector size (4096 bytes).
  */
 export const MSG_L_BIG_BLOCK_SIZE = 0x1000
 
 /**
- * Large sector size mark in the header (byte at offset 30).
+ * Holds the large sector size mark in the header (byte at offset 30).
  */
 export const MSG_L_BIG_BLOCK_MARK = 12
 
 /**
- * Mini-stream sector size (64 bytes).
+ * Holds the mini-stream sector size (64 bytes).
  */
 export const MSG_SMALL_BLOCK_SIZE = 0x0040
 
 /**
- * Threshold below which data is stored in the mini-stream.
+ * Sets the threshold below which data is stored in the mini-stream.
  */
 export const MSG_BIG_BLOCK_MIN_DOC_SIZE = 0x1000
 
 /**
- * Header offset: property (directory) start sector.
+ * Locates the property (directory) start sector in the header.
  */
 export const MSG_HEADER_PROPERTY_START_OFFSET = 0x30
 
 /**
- * Header offset: BAT sector array start.
+ * Locates the BAT sector array start in the header.
  */
 export const MSG_HEADER_BAT_START_OFFSET = 0x4c
 
 /**
- * Header offset: BAT sector count.
+ * Locates the BAT sector count in the header.
  */
 export const MSG_HEADER_BAT_COUNT_OFFSET = 0x2c
 
 /**
- * Header offset: SBAT start sector.
+ * Locates the SBAT start sector in the header.
  */
 export const MSG_HEADER_SBAT_START_OFFSET = 0x3c
 
 /**
- * Header offset: SBAT sector count.
+ * Locates the SBAT sector count in the header.
  */
 export const MSG_HEADER_SBAT_COUNT_OFFSET = 0x40
 
 /**
- * Header offset: XBAT (DIFAT) start sector.
+ * Locates the XBAT (DIFAT) start sector in the header.
  */
 export const MSG_HEADER_XBAT_START_OFFSET = 0x44
 
 /**
- * Header offset: XBAT (DIFAT) sector count.
+ * Locates the XBAT (DIFAT) sector count in the header.
  */
 export const MSG_HEADER_XBAT_COUNT_OFFSET = 0x48
 
 /**
- * No child/sibling index sentinel.
+ * Names the no-child/sibling index sentinel.
  */
 export const MSG_PROP_NO_INDEX = -1
 
 /**
- * Maximum recursion depth accepted by the directory hierarchy builder
+ * Caps the recursion depth accepted by the directory hierarchy builder
  * (`MSGReader#buildHierarchy`). Defense-in-depth against a pathological
  * or hostile directory tree — the sibling-chain and visited-set guards
  * already bound each level, this caps the recursion depth itself.
@@ -94,87 +96,88 @@ export const MSG_PROP_NO_INDEX = -1
 export const MSG_MAX_HIERARCHY_DEPTH = 64
 
 /**
- * Directory entry size in bytes.
+ * Holds the directory entry size in bytes.
  */
 export const MSG_PROPERTY_SIZE = 0x0080
 
 /**
- * Offset within a directory entry: name byte length.
+ * Locates the name byte length within a directory entry.
  */
 export const MSG_PROP_NAME_SIZE_OFFSET = 0x40
 
 /**
- * Offset within a directory entry: object type byte.
+ * Locates the object-category byte within a directory entry, mirroring the
+ * Compound File Binary object type field.
  */
-export const MSG_PROP_TYPE_OFFSET = 0x42
+export const MSG_PROP_CATEGORY_OFFSET = 0x42
 
 /**
- * Offset within a directory entry: left sibling index.
+ * Locates the left sibling index within a directory entry.
  */
 export const MSG_PROP_PREVIOUS_PROPERTY_OFFSET = 0x44
 
 /**
- * Offset within a directory entry: right sibling index.
+ * Locates the right sibling index within a directory entry.
  */
 export const MSG_PROP_NEXT_PROPERTY_OFFSET = 0x48
 
 /**
- * Offset within a directory entry: child index.
+ * Locates the child index within a directory entry.
  */
 export const MSG_PROP_CHILD_PROPERTY_OFFSET = 0x4c
 
 /**
- * Offset within a directory entry: start sector of stream data.
+ * Locates the start sector of stream data within a directory entry.
  */
 export const MSG_PROP_START_BLOCK_OFFSET = 0x74
 
 /**
- * Offset within a directory entry: stream byte length.
+ * Locates the stream byte length within a directory entry.
  */
 export const MSG_PROP_SIZE_OFFSET = 0x78
 
 /**
- * Directory entry type: unallocated.
+ * Names the unallocated directory entry category.
  */
-export const MSG_TYPE_UNALLOCATED = 0
+export const MSG_CATEGORY_UNALLOCATED = 0
 
 /**
- * Directory entry type: storage (folder).
+ * Names the storage (folder) directory entry category.
  */
-export const MSG_TYPE_DIRECTORY = 1
+export const MSG_CATEGORY_DIRECTORY = 1
 
 /**
- * Directory entry type: stream (document).
+ * Names the stream (document) directory entry category.
  */
-export const MSG_TYPE_DOCUMENT = 2
+export const MSG_CATEGORY_DOCUMENT = 2
 
 /**
- * Directory entry type: root storage.
+ * Names the root storage directory entry category.
  */
-export const MSG_TYPE_ROOT = 5
+export const MSG_CATEGORY_ROOT = 5
 
 /**
- * Name prefix for attachment storage entries.
+ * Holds the name prefix for attachment storage entries.
  */
 export const MSG_PREFIX_ATTACHMENT = '__attach_version1.0'
 
 /**
- * Name prefix for recipient storage entries.
+ * Holds the name prefix for recipient storage entries.
  */
 export const MSG_PREFIX_RECIPIENT = '__recip_version1.0'
 
 /**
- * Name prefix for document (substg) stream entries.
+ * Holds the name prefix for document (substg) stream entries.
  */
 export const MSG_PREFIX_DOCUMENT = '__substg1.'
 
 /**
- * Name prefix for named property mapping storage.
+ * Holds the name prefix for named property mapping storage.
  */
 export const MSG_PREFIX_NAMEID = '__nameid_version1.0'
 
 /**
- * MAPI property tag to field name mapping.
+ * Maps a MAPI property tag to a field name.
  */
 export const MSG_FIELD_NAME_MAPPING: Readonly<Record<string, string>> = Object.freeze({
 	// email specific
@@ -243,7 +246,7 @@ export const MSG_FIELD_NAME_MAPPING: Readonly<Record<string, string>> = Object.f
 })
 
 /**
- * Full 8-char property tag to field name mapping (for compound tags).
+ * Maps a full 8-char property tag to a field name (for compound tags).
  */
 export const MSG_FIELD_FULL_NAME_MAPPING: Readonly<Record<string, string>> = Object.freeze({
 	'1013001f': 'bodyHTML',
@@ -251,9 +254,9 @@ export const MSG_FIELD_FULL_NAME_MAPPING: Readonly<Record<string, string>> = Obj
 })
 
 /**
- * MAPI property type tag to decode type mapping.
+ * Maps a MAPI property type tag to a decode type.
  */
-export const MSG_FIELD_TYPE_MAPPING: Readonly<Record<string, string>> = Object.freeze({
+export const MSG_FIELD_TYPE_MAPPING: Readonly<Record<string, MSGFieldType>> = Object.freeze({
 	'001e': 'string',
 	'001f': 'unicode',
 	'0040': 'time',
@@ -263,32 +266,32 @@ export const MSG_FIELD_TYPE_MAPPING: Readonly<Record<string, string>> = Object.f
 })
 
 /**
- * Attachment data class identifier.
+ * Identifies the attachment data class.
  */
 export const MSG_FIELD_CLASS_ATTACHMENT_DATA = '3701'
 
 /**
- * Directory field type indicating an embedded MSG.
+ * Names the directory field type indicating an embedded MSG.
  */
 export const MSG_FIELD_DIR_TYPE_INNER_MSG = '000d'
 
 /**
- * MAPI recipient type: TO.
+ * Names the TO MAPI recipient type.
  */
 export const MSG_MAPI_RECIPIENT_TO = 1
 
 /**
- * MAPI recipient type: CC.
+ * Names the CC MAPI recipient type.
  */
 export const MSG_MAPI_RECIPIENT_CC = 2
 
 /**
- * MAPI recipient type: BCC.
+ * Names the BCC MAPI recipient type.
  */
 export const MSG_MAPI_RECIPIENT_BCC = 3
 
 /**
- * PidLid property set GUID to LID-to-field-name mapping.
+ * Holds the PidLid property set GUID to LID-to-field-name mapping.
  * Maps well-known MAPI named property sets to their property
  * long IDs and corresponding field names on MSGFieldData.
  */
@@ -348,54 +351,54 @@ export const MSG_PIDLID_MAPPING: Readonly<Record<string, Readonly<Record<number,
 // === MSGBurner
 
 /**
- * Standard CFB sector size in bytes (512).
+ * Holds the standard CFB sector size in bytes (512).
  */
 export const MSG_BURNER_SECTOR_SIZE = 512
 
 /**
- * CFB mini-stream sector size in bytes (64).
+ * Holds the CFB mini-stream sector size in bytes (64).
  */
 export const MSG_BURNER_MINI_SECTOR_SIZE = 64
 
 /**
- * Threshold below which streams are stored in the mini-stream (4096).
+ * Sets the threshold below which streams are stored in the mini-stream (4096).
  */
 export const MSG_BURNER_MINI_STREAM_CUTOFF = 4096
 
 /**
- * Number of 32-bit integers per standard sector (128).
+ * Holds the number of 32-bit integers per standard sector (128).
  */
 export const MSG_BURNER_INTS_PER_SECTOR = MSG_BURNER_SECTOR_SIZE / 4
 
 /**
- * Maximum DIFAT entries stored in the CFB header (109).
+ * Caps the DIFAT entries stored in the CFB header (109).
  */
 export const MSG_BURNER_DIFAT_HEADER_SLOTS = 109
 
 /**
- * CFB directory entry size in bytes (128).
+ * Holds the CFB directory entry size in bytes (128).
  */
 export const MSG_BURNER_DIR_ENTRY_SIZE = 128
 
 /**
- * FAT sector marker: this sector holds FAT data (-3).
+ * Marks a sector as holding FAT data (-3).
  */
 export const MSG_BURNER_FAT_SECTOR_MARKER = -3
 
 /**
- * DIFAT sector marker: this sector holds DIFAT data (-4).
+ * Marks a sector as holding DIFAT data (-4).
  */
 export const MSG_BURNER_DIFAT_SECTOR_MARKER = -4
 
 /**
- * Maximum UTF-16 code units allowed in a CFB directory entry name (31).
+ * Caps the UTF-16 code units allowed in a CFB directory entry name (31).
  * The fixed 64-byte name field holds 32 UTF-16 units including the
  * NUL terminator, so the name itself is capped at 31 units.
  */
 export const MSG_BURNER_NAME_MAX = 31
 
 /**
- * Root entry CLSID for MSG compound files.
+ * Holds the root entry CLSID for MSG compound files.
  */
 export const MSG_BURNER_ROOT_CLSID = new Uint8Array([
 	0x0b, 0x0d, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0xc0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x46,
@@ -404,37 +407,37 @@ export const MSG_BURNER_ROOT_CLSID = new Uint8Array([
 // === EmailParser
 
 /**
- * File extensions recognized as RFC 2822 / MIME email files.
+ * Lists the file extensions recognized as RFC 2822 / MIME email files.
  */
 export const EML_EXTENSIONS: readonly string[] = Object.freeze(['.eml'])
 
 /**
- * File extensions recognized as Outlook binary email files.
+ * Lists the file extensions recognized as Outlook binary email files.
  */
 export const MSG_EXTENSIONS: readonly string[] = Object.freeze(['.msg'])
 
 /**
- * MIME types recognized as RFC 2822 / MIME email files.
+ * Lists the MIME types recognized as RFC 2822 / MIME email files.
  */
 export const EML_MIME_TYPES: readonly string[] = Object.freeze(['message/rfc822'])
 
 /**
- * MIME types recognized as Outlook binary email files.
+ * Lists the MIME types recognized as Outlook binary email files.
  */
 export const MSG_MIME_TYPES: readonly string[] = Object.freeze(['application/vnd.ms-outlook'])
 
 /**
- * Default charset for decoding MIME part bodies.
+ * Names the default charset for decoding MIME part bodies.
  */
 export const FALLBACK_CHARSET = 'utf-8'
 
 /**
- * Default file name for attachments without an explicit name.
+ * Names the default file name for attachments without an explicit name.
  */
 export const FALLBACK_ATTACHMENT_NAME = 'attachment'
 
 /**
- * Common MIME types to file extensions mapping.
+ * Maps common MIME types to file extensions.
  * Used for inferring the correct extension during file extraction.
  */
 export const MIME_EXTENSIONS: ReadonlyMap<string, string> = new Map([
@@ -460,14 +463,14 @@ export const MIME_EXTENSIONS: ReadonlyMap<string, string> = new Map([
 ])
 
 /**
- * Maximum multipart nesting depth accepted by `parseMIMEPart`.
+ * Caps the multipart nesting depth accepted by `parseMIMEPart`.
  * Guards against pathological or hostile MIME trees causing
  * unbounded recursion.
  */
 export const MIME_MAX_DEPTH = 50
 
 /**
- * Minimum valid code point for each UTF-8 sequence length, keyed by the
+ * Holds the minimum valid code point for each UTF-8 sequence length, keyed by the
  * number of continuation bytes (1, 2, or 3). Enforces the WHATWG
  * requirement that a sequence encode the shortest possible form — an
  * overlong encoding (a code point below its sequence's minimum) is
@@ -480,7 +483,7 @@ export const UTF8_SEQUENCE_MINIMUM: Readonly<Record<number, number>> = Object.fr
 })
 
 /**
- * Windows-1252 high-byte (0x80-0x9F) to Unicode code point lookup.
+ * Holds the Windows-1252 high-byte (0x80-0x9F) to Unicode code point lookup.
  * Index `n` maps byte `0x80 + n` to its Unicode code point; entries
  * that Windows-1252 leaves undefined map to the byte's own value
  * (C1 control code passthrough) per the WHATWG encoding standard.
diff --git a/src/core/errors.ts b/src/core/errors.ts
index 0a79c65..faf9a7b 100644
--- a/src/core/errors.ts
+++ b/src/core/errors.ts
@@ -1,19 +1,26 @@
 import type { MSGErrorCode } from './types.js'
 
-// AGENTS §12: an MSG/EML parsing or burning failure `throw`s an `MSGError`
+// An MSG/EML parsing or burning failure `throw`s an `MSGError`
 // carrying a machine-readable `code`, so a `catch` branches on `error.code`
 // instead of parsing the message. `createMSG` instead surfaces the same
 // `MSGError` through a `Result<MSGInterface, MSGError>` so a malformed
 // file never throws across that boundary.
 
 /**
- * An error thrown or returned by the MSG/EML parsing and burning surfaces.
+ * Represents an error thrown or returned by the MSG/EML parsing and burning surfaces.
  *
  * @remarks
  * Carries a machine-readable {@link MSGErrorCode} so a `catch` (or a
  * `Failure.error` branch) can dispatch on `error.code` instead of parsing
  * the message text. `context` carries whatever structured detail the
  * throwing site has on hand (e.g. `{ offset, expected }`).
+ *
+ * @example
+ * ```ts
+ * import { MSGError } from '@src/core'
+ *
+ * throw new MSGError('RANGE', 'Attachment index 3 out of range', { index: 3 })
+ * ```
  */
 export class MSGError extends Error {
 	readonly code: MSGErrorCode
@@ -28,10 +35,10 @@ export class MSGError extends Error {
 }
 
 /**
- * Narrow an unknown caught (or `Failure.error`) value to an {@link MSGError}.
+ * Narrows an unknown caught (or `Failure.error`) value to an {@link MSGError}.
  *
  * @param value - The value to test (typically a `catch` binding or a `Result.error`)
- * @returns `true` when `value` is an {@link MSGError}
+ * @returns True if `value` is an {@link MSGError}; false otherwise
  *
  * @example
  * ```ts
diff --git a/src/core/types.ts b/src/core/types.ts
index 7b87e73..5506a0c 100644
--- a/src/core/types.ts
+++ b/src/core/types.ts
@@ -1,7 +1,7 @@
 // === Result Pattern
 
 /**
- * Successful operation result.
+ * Represents a successful operation result.
  */
 export interface Success<T> {
 	readonly success: true
@@ -9,7 +9,7 @@ export interface Success<T> {
 }
 
 /**
- * Failed operation result.
+ * Represents a failed operation result.
  */
 export interface Failure<E> {
 	readonly success: false
@@ -17,14 +17,14 @@ export interface Failure<E> {
 }
 
 /**
- * Discriminated union for operations that can succeed or fail safely.
+ * Represents a discriminated union for operations that can succeed or fail safely.
  */
 export type Result<T, E = Error> = Success<T> | Failure<E>
 
 // === Encoding
 
 /**
- * Supported text encoding for decoding non-Unicode MSG strings and
+ * Names a supported text encoding for decoding non-Unicode MSG strings and
  * MIME part bodies.
  */
 export type MSGEncoding = 'utf-8' | 'utf-16le' | 'windows-1252' | 'latin1'
@@ -32,7 +32,7 @@ export type MSGEncoding = 'utf-8' | 'utf-16le' | 'windows-1252' | 'latin1'
 // === MSGError
 
 /**
- * Machine-readable classification for an {@link MSGError}.
+ * Names a machine-readable classification for an {@link MSGError}.
  *
  * @remarks
  * - `UNSUPPORTED` — the input is not a recognized MSG/EML format
@@ -46,25 +46,26 @@ export type MSGErrorCode = 'UNSUPPORTED' | 'MALFORMED' | 'CYCLE' | 'RANGE' | 'BU
 // === MSGReader
 
 /**
- * Lifecycle type of a directory entry in a CFB compound file.
- */
-export type MSGDirectoryEntryType = 'root' | 'directory' | 'document' | 'unallocated'
-
-/**
- * MAPI property data type tag.
+ * Names a MAPI property data type tag.
  */
 export type MSGFieldType = 'string' | 'unicode' | 'binary' | 'time' | 'integer' | 'boolean'
 
 /**
- * Recipient role in a message.
+ * Names a recipient role in a message.
  */
 export type MSGRecipientRole = 'to' | 'cc' | 'bcc'
 
 /**
- * CFB directory entry describing a storage or stream in the compound file.
+ * Represents a CFB directory entry describing a storage or stream in the compound file.
+ *
+ * @remarks
+ * - `category` — the entry's object-category byte, mirroring the Compound File
+ *   Binary object type field at directory-entry offset `0x42`; compare it
+ *   against `MSG_CATEGORY_ROOT`, `MSG_CATEGORY_DIRECTORY`,
+ *   `MSG_CATEGORY_DOCUMENT`, and `MSG_CATEGORY_UNALLOCATED`
  */
 export interface MSGDirectoryEntry {
-	readonly type: number
+	readonly category: number
 	readonly name: string
 	readonly previousProperty: number
 	readonly nextProperty: number
@@ -75,12 +76,12 @@ export interface MSGDirectoryEntry {
 }
 
 /**
- * Internal mutable accumulator used during MSG field extraction.
+ * Represents an internal mutable accumulator used during MSG field extraction.
  * Properties are assigned dynamically via index signature and
  * narrowed to the readonly {@link MSGFieldData} at the public boundary.
  */
 export interface MSGMutableFieldData {
-	readonly kind: 'msg' | 'attachment' | 'recipient'
+	readonly category: 'msg' | 'attachment' | 'recipient'
 	readonly attachments?: readonly MSGMutableFieldData[]
 	readonly recipients?: readonly MSGMutableFieldData[]
 	readonly innerMSGContent?: true
@@ -92,7 +93,7 @@ export interface MSGMutableFieldData {
 }
 
 /**
- * Resolved named property entry from the __nameid_version1.0 storage.
+ * Represents a resolved named property entry from the __nameid_version1.0 storage.
  */
 export interface MSGNameIdEntry {
 	readonly useName: boolean
@@ -102,19 +103,24 @@ export interface MSGNameIdEntry {
 }
 
 /**
- * CFB entry descriptor for the MSG burner (CFB binary writer).
+ * Describes a CFB entry for the MSG burner (CFB binary writer).
  * Entries form a flat list starting with the root storage at index 0.
+ *
+ * @remarks
+ * - `category` — the entry's object-category byte, written to the Compound File
+ *   Binary object type field at directory-entry offset `0x42`; supply
+ *   `MSG_CATEGORY_ROOT`, `MSG_CATEGORY_DIRECTORY`, or `MSG_CATEGORY_DOCUMENT`
  */
 export interface MSGBurnerEntry {
 	readonly name: string
-	readonly type: number
+	readonly category: number
 	readonly length: number
 	readonly binaryProvider?: () => Uint8Array
 	readonly children?: readonly number[]
 }
 
 /**
- * Internal lite entry with tree metadata used during CFB burn.
+ * Represents an internal lite entry with tree metadata used during CFB burn.
  * Tracks red-black coloring and sector allocation alongside
  * the source MSGBurnerEntry.
  */
@@ -129,11 +135,11 @@ export interface MSGBurnerLiteEntry {
 }
 
 /**
- * Parsed field data extracted from an MSG file.
+ * Holds parsed field data extracted from an MSG file.
  * Represents the root message, an attachment, or a recipient.
  *
  * @remarks
- * - `kind` — discriminator: 'msg', 'attachment', or 'recipient'
+ * - `category` — discriminator: 'msg', 'attachment', or 'recipient'
  * - `subject` — message subject
  * - `senderName` — display name of the sender
  * - `senderEmail` — email address of the sender
@@ -152,7 +158,7 @@ export interface MSGBurnerLiteEntry {
  * - `recipientRole` — recipient type: 'to', 'cc', or 'bcc'
  */
 export interface MSGFieldData {
-	readonly kind: 'msg' | 'attachment' | 'recipient'
+	readonly category: 'msg' | 'attachment' | 'recipient'
 	// email properties
 	readonly subject?: string
 	readonly senderName?: string
@@ -264,7 +270,7 @@ export interface MSGFieldData {
 }
 
 /**
- * Extracted attachment content from an MSG file.
+ * Holds extracted attachment content from an MSG file.
  *
  * @remarks
  * - `fileName` — the attachment file name
@@ -275,15 +281,41 @@ export interface MSGAttachment {
 	readonly content: Uint8Array
 }
 
+/**
+ * Represents a parsed MSG source an email shaper reads from: the field tree plus
+ * indexed attachment access.
+ *
+ * @remarks
+ * `MSG` satisfies this contract through its own `#readFields` and
+ * `attachment` members, and `extractMessageFromMSG` accepts anything else
+ * that supplies the same two operations.
+ */
+export interface MSGSourceInterface {
+	/**
+	 * Reads the parsed MAPI field tree.
+	 *
+	 * @returns The root message's field data
+	 */
+	parse(): MSGFieldData
+
+	/**
+	 * Reads attachment binary content by index.
+	 *
+	 * @param index - Zero-based index into the parsed attachment list
+	 * @returns File name and raw binary content
+	 */
+	attachment(index: number): MSGAttachment
+}
+
 // === EmailParser
 
 /**
- * Supported email file format.
+ * Names a supported email file format.
  */
 export type EmailFormat = 'eml' | 'msg'
 
 /**
- * Parsed MIME header with value and parameter map.
+ * Represents a parsed MIME header with value and parameter map.
  *
  * @remarks
  * - `value` — primary header value (before first semicolon)
@@ -295,7 +327,7 @@ export interface MIMEHeader {
 }
 
 /**
- * Recursive MIME part tree node.
+ * Represents a recursive MIME part tree node.
  *
  * @remarks
  * - `headers` — parsed header map keyed by lowercase name
@@ -309,7 +341,7 @@ export interface MIMEPart {
 }
 
 /**
- * Extracted attachment from an email message.
+ * Represents an attachment extracted from an email message.
  *
  * @remarks
  * - `name` — attachment file name
@@ -325,7 +357,7 @@ export interface EmailAttachment {
 }
 
 /**
- * Structured email message extracted from a parsed file.
+ * Represents a structured email message extracted from a parsed file.
  *
  * @remarks
  * - `from` — sender address string
@@ -349,7 +381,7 @@ export interface EmailMessage {
 }
 
 /**
- * Parsed email chain from a single file.
+ * Represents a parsed email chain from a single file.
  *
  * @remarks
  * - `format` — detected file format ('eml' or 'msg')
@@ -361,7 +393,7 @@ export interface EmailChain {
 }
 
 /**
- * Raw email input handed to an EmailParser.
+ * Represents raw email input handed to an EmailParser.
  *
  * @remarks
  * - `bytes` — raw file content
@@ -377,13 +409,13 @@ export interface EmailInput {
 // === MSG
 
 /**
- * Raw input accepted by {@link createMSG}: binary MSG bytes or an
+ * Represents raw input accepted by {@link createMSG}: binary MSG bytes or an
  * {@link EmailInput} for EML/MSG email parsing.
  */
 export type MSGInput = Uint8Array | ArrayBuffer | EmailInput
 
 /**
- * Configuration for creating an {@link MSGInterface}.
+ * Configures the creation of an {@link MSGInterface}.
  *
  * @remarks
  * - `encoding` — encoding for non-Unicode strings and MIME part bodies (default `'windows-1252'`)
@@ -393,7 +425,7 @@ export interface MSGOptions {
 }
 
 /**
- * Public interface for a parsed MSG/EML file.
+ * Exposes the public surface of a parsed MSG/EML file.
  *
  * @remarks
  * - `options` — configuration used to parse this instance
@@ -408,7 +440,7 @@ export interface MSGInterface {
 	readonly fields: MSGFieldData | undefined
 
 	/**
-	 * Read attachment binary content by index.
+	 * Reads attachment binary content by index.
 	 *
 	 * @param index - Zero-based index into the parsed attachment list
 	 * @returns File name and raw binary content
@@ -417,7 +449,7 @@ export interface MSGInterface {
 	attachment(index: number): MSGAttachment
 
 	/**
-	 * Rebuild the parsed MSG as a standalone CFB/.msg binary.
+	 * Rebuilds the parsed MSG as a standalone CFB/.msg binary.
 	 *
 	 * @returns Complete CFB byte stream
 	 * @throws {@link MSGError} with code `BURN` when the parsed structure
```
