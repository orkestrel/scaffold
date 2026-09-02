# Last changes: sea

Taken 2026-09-02. Branch `claude/orkestrel-npm-audit-deps-14ibta` at `c3c36c8`, merge base with `origin/main` `5ac1593`, layer L3, declared version 0.0.13, registry version 0.0.13.

## Commits since origin/main

```text
bf97258 2026-08-28 Update every dependency to the published latest
f6b167c 2026-08-28 Re-pin @orkestrel/process to ^0.0.9
8d13038 2026-08-28 Refresh the process guide mirror for the 0.0.9 release
1ed8ef4 2026-08-28 Adopt the catalog and guide mirrors for the wave
ffca74b 2026-08-28 Apply the verified src-audit fixes
be08e4a 2026-09-01 Re-pin @orkestrel/contract to the 0.0.15 release
fb8f014 2026-09-01 Adopt the renamed guide helpers in the parity test
62b6f40 2026-09-02 Name the SEA readers, shell executor, and compression handler
93fd98a 2026-09-02 Point the README at the guide the package ships
09fd247 2026-09-02 Migrate the TSDoc voice to the third person
c3c36c8 2026-09-02 Give the injector format list its first sentence
```

## Diffstat since origin/main

```text
 .claude/agents/orkestrel.md         |   2 +-
 README.md                           |   4 +-
 package.json                        |   4 +-
 src/server/assets/Asset.ts          |   7 --
 src/server/assets/AssetManager.ts   |  19 +----
 src/server/constants.ts             |  62 ++++++++--------
 src/server/errors.ts                |  16 ++--
 src/server/factories.ts             |   8 +-
 src/server/helpers.ts               | 283 +++++++++++++++++++++++++++++++++++++++++++++++++++++-----------------
 src/server/index.ts                 |   1 +
 src/server/injectors/Injector.ts    | 307 ++++++++++++++++++++++++++++++----------------------------------------------
 src/server/seals/SEA.ts             |  35 ++++-----
 src/server/types.ts                 |  78 ++++++++++++--------
 src/server/validators.ts            |  19 +++++
 tests/guides.test.ts                |  22 +++---
 tests/src/server/helpers.test.ts    | 160 +++++++++++++++++++++++++++++++++++-----
 tests/src/server/validators.test.ts |  23 ++++++
 17 files changed, 641 insertions(+), 409 deletions(-)
```

## Public-surface diff (types, index, constants, errors)

```diff
diff --git a/src/server/constants.ts b/src/server/constants.ts
index 69de7b3..13f5e21 100644
--- a/src/server/constants.ts
+++ b/src/server/constants.ts
@@ -1,25 +1,25 @@
 import type { SEACompressionMode, SEAEntryFormat, SEAPlatform } from './types.js'
 
-/** SEA sentinel fuse value embedded in the Node.js binary */
+/** Holds the SEA sentinel fuse value embedded in the Node.js binary */
 export const SEA_SENTINEL_FUSE = 'NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2'
 
-/** Resource name for the SEA blob in the executable */
+/** Names the SEA blob resource in the executable */
 export const SEA_BLOB_RESOURCE = 'NODE_SEA_BLOB'
 
-/** Default Brotli compression quality level (maximum) */
+/** Holds the default Brotli compression quality level (maximum) */
 export const DEFAULT_SEA_COMPRESSION_QUALITY = 11
 
-/** Windows PE subsystem value: GUI application (no terminal window) */
+/** Holds the Windows PE subsystem value for a GUI application (no terminal window) */
 export const WINDOWS_SUBSYSTEM_GUI = 2
 
-/** Windows PE subsystem value: console application */
+/** Holds the Windows PE subsystem value for a console application */
 export const WINDOWS_SUBSYSTEM_CONSOLE = 3
 
-/** File extension indicating Brotli compression */
+/** Names the file extension indicating Brotli compression */
 export const BROTLI_EXTENSION = '.br'
 
-/** File extensions that should NOT be Brotli-compressed */
-export const SKIP_EXTENSIONS = new Set([
+/** Lists the file extensions that should NOT be Brotli-compressed */
+export const SKIP_EXTENSIONS: ReadonlySet<string> = new Set([
 	'.br',
 	'.gz',
 	'.zst',
@@ -43,81 +43,81 @@ export const SKIP_EXTENSIONS = new Set([
 	'.tar',
 ])
 
-/** Default SEA entry point module format when none is specified */
+/** Names the default SEA entry point module format when none is specified */
 export const DEFAULT_ENTRY_FORMAT: SEAEntryFormat = 'cjs'
 
-/** Asset key for the raw (uncompressed) client HTML entry */
+/** Names the asset key for the raw (uncompressed) client HTML entry */
 export const CLIENT_ASSET_KEY_RAW = 'client.html'
 
-/** Asset key for the Brotli-compressed client HTML entry */
+/** Names the asset key for the Brotli-compressed client HTML entry */
 export const CLIENT_ASSET_KEY_BR = 'client.html.br'
 
 // === Binary Format Magic
 
-/** DOS MZ header magic (first 2 bytes of a PE file) */
+/** Holds the DOS MZ header magic (first 2 bytes of a PE file) */
 export const PE_MAGIC = 0x5a4d
 
-/** PE signature: "PE\0\0" as a 32-bit value */
+/** Holds the PE signature, "PE\0\0" as a 32-bit value */
 export const PE_SIGNATURE = 0x00004550
 
-/** PE32 optional header magic */
+/** Holds the PE32 optional header magic */
 export const PE32_MAGIC = 0x10b
 
-/** PE32+ (64-bit) optional header magic */
+/** Holds the PE32+ (64-bit) optional header magic */
 export const PE32_PLUS_MAGIC = 0x20b
 
-/** ELF magic: 0x7F 'E' 'L' 'F' as a 32-bit big-endian value */
+/** Holds the ELF magic, 0x7F 'E' 'L' 'F' as a 32-bit big-endian value */
 export const ELF_MAGIC = 0x7f454c46
 
-/** ELF 64-bit class identifier */
+/** Holds the ELF 64-bit class identifier */
 export const ELF_CLASS_64 = 2
 
-/** ELF little-endian data encoding */
+/** Holds the ELF little-endian data encoding */
 export const ELF_DATA_LSB = 1
 
-/** ELF program header type: note segment */
+/** Holds the ELF program header type for a note segment */
 export const ELF_PT_NOTE = 4
 
-/** Mach-O 64-bit magic (little-endian) */
+/** Holds the Mach-O 64-bit magic (little-endian) */
 export const MACHO_MAGIC_64 = 0xfeedfacf
 
-/** Mach-O LC_SEGMENT_64 load command */
+/** Holds the Mach-O LC_SEGMENT_64 load command */
 export const MACHO_LC_SEGMENT_64 = 0x19
 
 // === PE Resource Directory
 
-/** PE resource type: RT_RCDATA (raw data) */
+/** Holds the PE resource type RT_RCDATA (raw data) */
 export const PE_RT_RCDATA = 10
 
-/** Size of IMAGE_RESOURCE_DIRECTORY in bytes */
+/** Holds the size of IMAGE_RESOURCE_DIRECTORY in bytes */
 export const PE_RESOURCE_DIR_SIZE = 16
 
-/** Size of IMAGE_RESOURCE_DIRECTORY_ENTRY in bytes */
+/** Holds the size of IMAGE_RESOURCE_DIRECTORY_ENTRY in bytes */
 export const PE_RESOURCE_ENTRY_SIZE = 8
 
-/** Size of IMAGE_RESOURCE_DATA_ENTRY in bytes */
+/** Holds the size of IMAGE_RESOURCE_DATA_ENTRY in bytes */
 export const PE_RESOURCE_DATA_ENTRY_SIZE = 16
 
-/** PE section header size in bytes */
+/** Holds the PE section header size in bytes */
 export const PE_SECTION_HEADER_SIZE = 40
 
-/** High bit mask for resource directory entry offset (indicates subdirectory) */
+/** Holds the high bit mask for a resource directory entry offset (indicates subdirectory) */
 export const PE_RESOURCE_SUBDIR_FLAG = 0x80000000
 
-/** High bit mask for resource name entry (indicates named vs integer ID) */
+/** Holds the high bit mask for a resource name entry (indicates named vs integer ID) */
 export const PE_RESOURCE_NAME_FLAG = 0x80000000
 
 // === PE Section Characteristics
 
-/** Section contains initialized data */
+/** Marks a section as containing initialized data */
 export const PE_SCN_INITIALIZED_DATA = 0x00000040
 
-/** Section is readable */
+/** Marks a section as readable */
 export const PE_SCN_MEM_READ = 0x40000000
 
 // === Platform
 
-/** Platform-specific SEA build configurations */
+/** Holds the platform-specific SEA build configurations */
 export const SEA_PLATFORMS: Readonly<Record<string, SEAPlatform>> = Object.freeze({
 	win32: Object.freeze({
 		executable: 'node.exe',
diff --git a/src/server/errors.ts b/src/server/errors.ts
index 0ec38d1..bbc6500 100644
--- a/src/server/errors.ts
+++ b/src/server/errors.ts
@@ -3,12 +3,12 @@ import type { SEAErrorCode } from './types.js'
 // Error surface for the seal build. `SEAError` is the coded base every
 // domain failure throws through, so a caller can branch on `code` rather
 // than parsing a message string. `ShellError` specializes it for the shell
-// boundary — `runShell` maps a failed `execFileSync` invocation to a
+// boundary — `executeShell` maps a failed `executeSync` invocation to a
 // `ShellError` carrying the captured stdout/stderr, so a caller can inspect
 // the process output rather than parsing the thrown message.
 
 /**
- * The coded base error for every failure raised by the seal build.
+ * Represents the coded base error for every failure raised by the seal build.
  *
  * @remarks
  * Carries a machine-readable {@link SEAErrorCode} and optional `context`
@@ -40,10 +40,10 @@ export class SEAError extends Error {
 }
 
 /**
- * Whether a value is a {@link SEAError}.
+ * Checks whether a value is a {@link SEAError}.
  *
  * @param value - The value to test
- * @returns `true` when `value` is a `SEAError`
+ * @returns True if `value` is a `SEAError`; false otherwise
  *
  * @example
  * ```ts
@@ -57,7 +57,7 @@ export function isSEAError(value: unknown): value is SEAError {
 }
 
 /**
- * An error thrown when a shell command run via `runShell` exits non-zero.
+ * Represents an error thrown when a shell command executed through `executeShell` exits non-zero.
  *
  * @remarks
  * Carries the captured `stdout` and `stderr` buffers from the failed process.
@@ -67,7 +67,7 @@ export function isSEAError(value: unknown): value is SEAError {
  * @example
  * ```ts
  * try {
- *     runShell(['codesign', '--sign', '-', path])
+ *     executeShell(['codesign', '--sign', '-', path])
  * } catch (error) {
  *     if (isShellError(error)) {
  *         console.error(error.stderr.toString())
@@ -88,10 +88,10 @@ export class ShellError extends SEAError {
 }
 
 /**
- * Whether a value is a {@link ShellError}.
+ * Checks whether a value is a {@link ShellError}.
  *
  * @param value - The value to test
- * @returns `true` when `value` is a `ShellError`
+ * @returns True if `value` is a `ShellError`; false otherwise
  *
  * @example
  * ```ts
diff --git a/src/server/index.ts b/src/server/index.ts
index 7bd064e..1af4e00 100644
--- a/src/server/index.ts
+++ b/src/server/index.ts
@@ -2,6 +2,7 @@ export * from './types.js'
 
 export * from './constants.js'
 export * from './errors.js'
+export * from './validators.js'
 export * from './helpers.js'
 export * from './factories.js'
 
diff --git a/src/server/types.ts b/src/server/types.ts
index 5af51c1..fd8a856 100644
--- a/src/server/types.ts
+++ b/src/server/types.ts
@@ -3,7 +3,7 @@ import type { EmitterErrorHandler, EmitterHooks, EmitterInterface } from '@orkes
 // === Compression
 
 /**
- * Size comparison between original and compressed data.
+ * Represents a size comparison between original and compressed data.
  */
 export interface SEACompressionSize {
 	readonly original: number
@@ -12,7 +12,7 @@ export interface SEACompressionSize {
 }
 
 /**
- * Brotli compression mode.
+ * Names a Brotli compression mode.
  *
  * @remarks
  * `generic` — general-purpose data (Brotli mode 0).
@@ -22,7 +22,7 @@ export interface SEACompressionSize {
 export type SEACompressionMode = 'generic' | 'text' | 'font'
 
 /**
- * Result of compressing a single file.
+ * Represents the result of compressing a single file.
  *
  * @remarks
  * `input`  — absolute path to the original file.
@@ -36,7 +36,7 @@ export interface SEACompressionResult {
 }
 
 /**
- * Manifest summarizing all compressed assets.
+ * Summarizes all compressed assets.
  *
  * @remarks
  * Generated after a full directory compression pass.
@@ -47,7 +47,7 @@ export interface SEACompressionManifest {
 }
 
 /**
- * Progress reported while compressing a directory.
+ * Represents the progress reported while compressing a directory.
  *
  * @remarks
  * `path`    — absolute path to the file just compressed.
@@ -61,12 +61,12 @@ export interface SEAProgress {
 }
 
 /**
- * Callback invoked by the framework after each file is compressed.
+ * Describes the callback `compressDirectory` invokes after each file it compresses.
  */
-export type SEAProgressHandler = (result: SEACompressionResult) => void
+export type SEACompressionHandler = (result: SEACompressionResult) => void
 
 /**
- * Options controlling Brotli compression of one or more directories.
+ * Controls Brotli compression of one or more directories.
  *
  * @remarks
  * `paths`   — directories (relative to `SEAOptions.root`) to compress.
@@ -82,7 +82,7 @@ export interface SEACompressionOptions {
 // === Platform
 
 /**
- * Platform-specific SEA build configuration.
+ * Represents a platform-specific SEA build configuration.
  *
  * @remarks
  * Describes the native Node binary and code signing commands.
@@ -97,7 +97,7 @@ export interface SEAPlatform {
 // === Shell
 
 /**
- * Options for running a shell command.
+ * Configures the execution of a shell command.
  *
  * @remarks
  * `cwd` — working directory. Default: `process.cwd()`.
@@ -113,12 +113,26 @@ export interface SEAShellOptions {
 // === Injector
 
 /**
- * Executable binary format detected from file header magic bytes.
+ * Names an executable binary format detected from file header magic bytes.
  */
 export type ExecutableFormat = 'pe' | 'elf' | 'macho'
 
 /**
- * Options for injecting a resource into an executable.
+ * Holds an ELF `PT_NOTE` entry's header bytes and the on-disk size of the whole entry.
+ *
+ * @remarks
+ * `header` — the namesz/descsz/type words followed by the NUL-terminated,
+ * four-byte-padded note name.
+ * `total`  — bytes the complete entry occupies on disk: `header` plus the
+ * four-byte-padded blob written after it.
+ */
+export interface ELFNoteHeader {
+	readonly header: Buffer
+	readonly total: number
+}
+
+/**
+ * Configures the injection of a resource into an executable.
  *
  * @remarks
  * `executable` — absolute path to the target executable.
@@ -138,7 +152,7 @@ export interface InjectorOptions {
 }
 
 /**
- * Mach-O specific injector options.
+ * Configures Mach-O specific injector behavior.
  *
  * @remarks
  * `segment` — Mach-O segment name. Default: `"NODE_SEA"`.
@@ -148,23 +162,23 @@ export interface InjectorMachOOptions {
 }
 
 /**
- * Cross-platform binary resource injector.
+ * Represents a cross-platform binary resource injector.
  *
  * @remarks
  * Injects arbitrary data into PE (Windows), ELF (Linux), and Mach-O (macOS)
  * executables using streaming file I/O. No WASM or external tools required.
  */
 export interface InjectorInterface {
-	/** Detected executable format of the target binary. */
+	/** Holds the detected executable format of the target binary. */
 	readonly format: ExecutableFormat
-	/** Inject the resource data into the executable. */
+	/** Injects the resource data into the executable. */
 	inject(): void
 }
 
 // === Asset
 
 /**
- * Minimal data needed to create an {@link AssetInterface}.
+ * Holds the minimal data needed to create an {@link AssetInterface}.
  *
  * @remarks
  * `key`        — the asset's lookup key (e.g. `"client.html.br"`).
@@ -179,7 +193,7 @@ export interface AssetInput {
 }
 
 /**
- * A single named asset wrapping its key, content buffer, and compression flag.
+ * Represents a single named asset wrapping its key, content buffer, and compression flag.
  */
 export interface AssetInterface {
 	readonly key: string
@@ -187,7 +201,7 @@ export interface AssetInterface {
 	readonly compressed: boolean
 }
 
-/** Events emitted by an {@link AssetManagerInterface}. */
+/** Lists the events emitted by an {@link AssetManagerInterface}. */
 export type AssetManagerEventMap = {
 	readonly register: readonly [asset: AssetInterface]
 	readonly load: readonly [keys: readonly string[]]
@@ -196,7 +210,7 @@ export type AssetManagerEventMap = {
 }
 
 /**
- * Options for creating an {@link AssetManagerInterface}.
+ * Configures the creation of an {@link AssetManagerInterface}.
  *
  * @remarks
  * `root` — project root used to resolve on-disk client assets. Default: `process.cwd()`.
@@ -208,7 +222,7 @@ export interface AssetManagerOptions {
 }
 
 /**
- * Named asset collection with SEA and disk loading.
+ * Represents a named asset collection with SEA and disk loading.
  *
  * @remarks
  * In SEA mode, embedded assets are loaded automatically at construction.
@@ -229,12 +243,12 @@ export interface AssetManagerInterface {
 // === SEA
 
 /**
- * Overall status of the seal build.
+ * Names the overall status of the seal build.
  */
 export type SEAStatus = 'idle' | 'active' | 'done' | 'error'
 
 /**
- * Machine-readable error code carried by every {@link SEAError}.
+ * Names the machine-readable error code carried by every {@link SEAError}.
  *
  * @remarks
  * `PLATFORM` — unsupported or misdetected platform.
@@ -269,7 +283,7 @@ export type SEAErrorCode =
 	| 'BROWSER'
 
 /**
- * SEA entry point module format.
+ * Names the SEA entry point module format.
  *
  * @remarks
  * `cjs` — CommonJS entry (Node default).
@@ -278,7 +292,7 @@ export type SEAErrorCode =
 export type SEAEntryFormat = 'cjs' | 'esm'
 
 /**
- * Options describing the SEA entry point.
+ * Describes the SEA entry point.
  *
  * @remarks
  * `path`   — path to the entry point to embed.
@@ -290,7 +304,7 @@ export interface SEAEntryOptions {
 }
 
 /**
- * Options controlling generated SEA blob behavior.
+ * Controls generated SEA blob behavior.
  *
  * @remarks
  * `cache`    — maps to the SEA config `useCodeCache`. Default: `true`.
@@ -301,7 +315,7 @@ export interface SEABlobOptions {
 	readonly snapshot?: boolean
 }
 
-/** Events emitted by a {@link SEAInterface}. */
+/** Lists the events emitted by a {@link SEAInterface}. */
 export type SEAEventMap = {
 	readonly compress: readonly [compression: SEACompressionManifest | undefined]
 	readonly progress: readonly [progress: SEAProgress]
@@ -312,7 +326,7 @@ export type SEAEventMap = {
 }
 
 /**
- * Options for creating a SEA build.
+ * Configures the creation of a SEA build.
  *
  * @remarks
  * `name`        — output executable name (no extension).
@@ -344,7 +358,7 @@ export interface SEAOptions {
 }
 
 /**
- * Windows-specific SEA build options.
+ * Configures Windows-specific SEA build behavior.
  *
  * @remarks
  * `terminal` — whether the built executable keeps a console window (PE
@@ -367,7 +381,7 @@ export interface SEAWindowsOptions {
 }
 
 /**
- * Windows Authenticode signing options, passed through to `signtool`.
+ * Describes the Windows Authenticode signing options passed through to `signtool`.
  *
  * @remarks
  * `file`       — path to a `.pfx`/`.p12` certificate file (`signtool /f`).
@@ -393,7 +407,7 @@ export interface SEAWindowsSignOptions {
 }
 
 /**
- * Result of a successful seal build.
+ * Represents the result of a successful seal build.
  *
  * @remarks
  * `executable`  — absolute path to the output binary.
@@ -418,7 +432,7 @@ export interface SEAResult {
 }
 
 /**
- * SEA build orchestrator.
+ * Represents a SEA build orchestrator.
  *
  * @remarks
  * Compresses assets, generates the SEA blob, copies the Node binary,
```
