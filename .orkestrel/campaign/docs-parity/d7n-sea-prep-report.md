# Report — P.1 `d7n-sea-prep` (sea)

Checkout `/home/user/fleet/sea`, branch `claude/orkestrel-npm-audit-deps-14ibta`, baseline tip `2b15444` (clean at start). Every item closed. No deviation.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

```text
integration: integration drives features across environments, and this workspace declares fewer than two, so its seed composes nothing.
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

`package.json` took the `docs` script row; `tsconfig.json` took the own-specifier `paths` entry.

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

The hunk:

```diff
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

The `group.methods.length` assertion stays. The import walk's `findMissing(names, surface)` stays: both arguments are already strings.

Byte-for-byte reading against the pilot: `diff <(sed -n '108,165p' tests/guides.test.ts) <(sed -n '146,235p' /home/user/fleet/abort/tests/guides.test.ts)` returns only the pilot's `findDrift` case and its comment, which the converge unit owns. Every adapted site is identical to `/home/user/fleet/abort/tests/guides.test.ts`.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` before the item: total 47 diagnostics — `policy/no-malformed-summary` 22, `policy/no-banned-term` 25 — across `tests/setupServer.ts` (23), `src/server/helpers.ts` (11), `src/server/types.ts` (6), `src/server/injectors/Injector.ts` (5), `tests/setup.ts` (1), `tests/src/server/injectors/Injector.test.ts` (1). Every file it named is in scope; none is off-limits. Each edit is comment text only: `git diff -U0 src | grep -vE '^[+-]\s*(\*|//|/\*\*)'` returns nothing outside comment lines, and the same holds for the three test files.

### `tests/setup.ts` — `no-malformed-summary` at 8

```text
- * Encode `text` as UTF-8 into a freshly allocated `ArrayBuffer` — the asset-content shape
+ * Encodes `text` as UTF-8 into a freshly allocated `ArrayBuffer` — the asset-content shape
```

### `tests/setupServer.ts` — `no-malformed-summary` at 29, 60, 74, 167, 327, 338, 486, 512, 535, 606, 629, 637, 709, 728, 875, 883, 890, 904, 920, 935, 944; `no-banned-term` at 486 (`e.g.`) and 935 (`via`)

```text
- * Run `fn` with a fresh {@link ScratchInterface} pre-populated with `files`,
- * then destroy it unconditionally — the shared allocate/use/destroy wrapper
+ * Runs `fn` with a fresh {@link ScratchInterface} pre-populated with `files`,
+ * then destroys it unconditionally — the shared allocate/use/destroy wrapper

- * Build valid {@link SEAOptions} for a test — `name`, `entry`, and `output`
+ * Builds valid {@link SEAOptions} for a test — `name`, `entry`, and `output`

- * Build valid {@link InjectorOptions} for a test — `resource` defaults to the
+ * Builds valid {@link InjectorOptions} for a test — `resource` defaults to the

- * Build a minimal but structurally valid synthetic PE image for Injector
+ * Builds a minimal but structurally valid synthetic PE image for Injector

-/** One parsed PE resource leaf, returned by {@link parsePeResourceLeaves}. */
+/** Holds one parsed PE resource leaf, returned by {@link parsePeResourceLeaves}. */

-/** One PE section table entry, as {@link walkPeResourceDirectory} reads it. */
+/** Holds one PE section table entry, as {@link walkPeResourceDirectory} reads it. */

- * Re-parse a PE resource directory tree from a named section (e.g. the
- * Injector's `.rsrc2` output section) into a flat list of leaves, for
+ * Re-parses a PE resource directory tree from a named section (for example
+ * the Injector's `.rsrc2` output section) into a flat list of leaves, for

-/** One ELF64 program header entry, built and parsed by the ELF fixture helpers. */
+/** Holds one ELF64 program header entry, built and parsed by the ELF fixture helpers. */

- * Build a minimal but structurally valid synthetic ELF64 little-endian
+ * Builds a minimal but structurally valid synthetic ELF64 little-endian

-/** Parse all ELF64 program header entries out of a buffer. */
+/** Parses all ELF64 program header entries out of a buffer. */

-/** A parsed, active (non-PT_NULL) ELF note whose name matches a lookup prefix. */
+/** Holds a parsed, active (non-PT_NULL) ELF note whose name matches a lookup prefix. */

- * Find every active PT_NOTE program header whose note name starts with
+ * Finds every active PT_NOTE program header whose note name starts with

-/** The `__LINKEDIT` segment {@link buildMachoFixture} emits. */
+/** Configures the `__LINKEDIT` segment {@link buildMachoFixture} emits. */

- * Build a minimal but structurally valid synthetic thin Mach-O 64 (x86_64)
+ * Builds a minimal but structurally valid synthetic thin Mach-O 64 (x86_64)

-/** Build a fat/universal Mach-O header (magic 0xcafebabe) for format-rejection tests. */
+/** Builds a fat/universal Mach-O header (magic 0xcafebabe) for format-rejection tests. */

-/** One raw Mach-O load command header (cmd, size, byte offset). */
+/** Holds one raw Mach-O load command header (cmd, size, byte offset). */

-/** Parse every load command header out of a Mach-O 64 buffer. */
+/** Parses every load command header out of a Mach-O 64 buffer. */

-/** One parsed LC_SEGMENT_64 load command. */
+/** Holds one parsed LC_SEGMENT_64 load command. */

-/** Parse every LC_SEGMENT_64 command out of a Mach-O 64 buffer. */
+/** Parses every LC_SEGMENT_64 command out of a Mach-O 64 buffer. */

-/** One parsed Mach-O section-table entry, found via {@link findMachoSection}. */
+/** Holds one parsed Mach-O section-table entry, found through {@link findMachoSection}. */

-/** Find a named section within a named segment in a Mach-O 64 buffer. */
+/** Finds a named section within a named segment in a Mach-O 64 buffer. */
```

The noun-phrase openers took `Holds` for a data record and `Configures` for the options interface, matching the voice `src/server/types.ts` already carries. `then destroy it` became `then destroys it` so the second clause agrees with the rewritten opener; that wording is the ancillary decision this item records.

### `tests/src/server/injectors/Injector.test.ts` — `no-banned-term` at 436 (`sanity check`)

```text
-				// Confirm the fuse was actually flipped (sanity check the fixture).
+				// Confirm the fuse was actually flipped (a quick check of the fixture).
```

### `src/server/types.ts` — `no-banned-term` at 49 (`just`), 223 (`e.g.`), 269 (`e.g.`), 343 (`via`), 505 (`e.g.`), 530 (`via`)

```text
- * `path`    — absolute path to the file just compressed.
+ * `path`    — absolute path to the file compressed most recently.

- * `resource`   — resource identifier (e.g. `"NODE_SEA_BLOB"`).
+ * `resource`   — resource identifier (for example `"NODE_SEA_BLOB"`).

- * `key`        — the asset's lookup key (e.g. `"client.html.br"`).
+ * `key`        — the asset's lookup key (for example `"client.html.br"`).

- * `ABORT`    — operation aborted via `AbortSignal`.
+ * `ABORT`    — operation aborted through `AbortSignal`.

- * `platform`    — platform identifier (e.g. `"win32"`, `"darwin"`).
+ * `platform`    — platform identifier (for example `"win32"`, `"darwin"`).

- * injects the blob via the built-in Injector, and handles platform-specific signing.
+ * injects the blob through the built-in Injector, and handles platform-specific signing.
```

Each hit sits in a `@remarks` block. No description paragraph moved, so no `Summary` cell comparison changed.

### `src/server/injectors/Injector.ts` — `no-banned-term` at 976 (`via`), 1244 (`via`), 1256 (`just`), 1343 (`etc.`), 1523 (`just`)

```text
-	// Node.js SEA on Linux reads PT_NOTE segments via dl_iterate_phdr,
+	// Node.js SEA on Linux reads PT_NOTE segments through dl_iterate_phdr,

-	// blob. The segment defaults to "__POSTJECT" (or custom via options)
-	// and the section is "__" + resource.
+	// blob. The segment defaults to "__POSTJECT", or to a custom name the
+	// options carry, and the section is "__" + resource.

-			// --- Bounded header read: just enough to cover every header/LC parse
+			// --- Bounded header read: only enough to cover every header/LC parse

-			// arm64 (0x0100000c) requires 16K pages; every other architecture (x86_64
-			// etc.) uses 4K — 0x4000 is a safe superset alignment for either.
+			// arm64 (0x0100000c) requires 16K pages; every other architecture,
+			// including x86_64, uses 4K — 0x4000 is a safe superset alignment for either.

-			// consistent with what was just written.
+			// consistent with what was written.
```

The `etc.` row is bounded by naming x86_64 as the example inside the existing "every other architecture" claim, which is the fact the sentence already carried.

### `src/server/helpers.ts` — `no-banned-term` at 237 (`e.g.`), 564 (`simply`), 694 (`e.g.`), 706 (`e.g.`), 742 (`e.g.` twice), 788 (`e.g.`), 824 (`e.g.`), 864 (`e.g.`), 979 (`e.g.`), 1148 (`e.g.`)

```text
-	// on the write side so a planted symlink at `output` (e.g. `X.br -> /victim`)
+	// on the write side so a planted symlink at `output` (for example `X.br -> /victim`)

- * truncated security directory cannot throw unexpectedly — it is simply
- * skipped and only the directory entry is zeroed.
+ * truncated security directory cannot throw unexpectedly — it is skipped
+ * and only the directory entry is zeroed.

- * @returns Formatted string (e.g. `"1.23 MB"`, `"456 KB"`)
+ * @returns Formatted string (for example `"1.23 MB"`, `"456 KB"`)

- * Windows drive-relative specifier (e.g. `'C:foo'`), or any `/`-separated
+ * Windows drive-relative specifier (for example `'C:foo'`), or any `/`-separated

- * Dereferencing BOTH sides means a symlinked base itself (e.g. macOS `/tmp`
+ * Dereferencing BOTH sides means a symlinked base itself (for example macOS `/tmp`

- * failure (e.g. `ENOENT`) is wrapped as a coded `SEAError` rather than
+ * failure (for example `ENOENT`) is wrapped as a coded `SEAError` rather than

- * separator, an absolute path, or a Windows drive-relative specifier (e.g.
- * `'C:foo'`) — all of which could redirect the output executable outside
+ * separator, an absolute path, or a Windows drive-relative specifier (for
+ * example `'C:foo'`) — all of which could redirect the output executable outside

- * here" and swallowed; anything else (e.g. `ENOENT`, meaning the directory
+ * here" and swallowed; anything else (for example `ENOENT`, meaning the directory

-		// fsync" — benign and safe to ignore. Anything else (e.g. ENOENT, the
+		// fsync" — benign and safe to ignore. Anything else (for example ENOENT, the

- * @param resource - Note name (SEA resource identifier, e.g. `NODE_SEA_BLOB`)
+ * @param resource - Note name (SEA resource identifier, for example `NODE_SEA_BLOB`)

- * CLI flag, e.g. `'-e ...'`) fails to parse as an http(s) URL and is rejected
+ * CLI flag, for example `'-e ...'`) fails to parse as an http(s) URL and is rejected
```

Every hit sits in a `@remarks`, a `@param`, a `@returns`, or a line comment. No description paragraph moved.

### The prose sweep — `README.md`

`npm run test:policy` after the oxlint fixes reported the `prose` rule at `README.md` 76, 140, 151, each `via (through, by using)`, and nothing else. Each line took the substitution-table row at that line and nothing else in the file changed:

```text
-- **Windows** — signing is **optional**, via `windows.sign`. Provide exactly
+- **Windows** — signing is **optional**, through `windows.sign`. Provide exactly

-  sign it via `windows.sign` (see Code signing above) to avoid the warning.
+  sign it through `windows.sign` (see Code signing above) to avoid the warning.

-A SEA whose entry starts a local server, serves a bundled `client.html` via
+A SEA whose entry starts a local server, serves a bundled `client.html` through
```

`grep -n '\bvia\b' README.md` now returns nothing. No diagnostic named an off-limits file.

## Item 4 — the bump

```diff
-	"version": "0.0.14",
+	"version": "0.0.15",
```

`package-lock.json` untouched. The `@orkestrel/guide` range stays `^0.0.17` (`package.json:81`).

## Acceptance criteria

### 1. `git status --short`

```text
 M .oxlintrc.json
 M README.md
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M src/server/helpers.ts
 M src/server/injectors/Injector.ts
 M src/server/types.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/src/server/injectors/Injector.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

The P21 repair list, plus `tests/guides.test.ts` (item 2), plus the item-3 files `README.md`, `src/server/helpers.ts`, `src/server/injectors/Injector.ts`, `src/server/types.ts`, `tests/setup.ts`, `tests/setupServer.ts`, `tests/src/server/injectors/Injector.test.ts`. Nothing else. `package.json` carries the repair row and the bump.

Diffstat: 16 files changed, 1598 insertions(+), 239 deletions(-).

### 2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, `npm run check`

```text
$ npm run format:check
All matched files use the correct format.
Finished in 4285ms on 53 files using 4 threads.
FORMAT EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings .
(no output)
OXLINT EXIT 0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.server.json
CHECK EXIT 0
```

### 3. `npm run test:guides`, `npm run test:policy`, `npm run test:config`

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  34 passed (34)
EXIT 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
EXIT 0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
EXIT 0
```

P21's 13 `test:guides` failures were the record shapes alone: the adaptation closed every one.

### 4. `npm run docs`

`DOCS EXIT 1`, `rows read: 1, disagreements found: 129` — the converge unit's worklist. Every line it prints:

```text

> @orkestrel/sea@0.0.15 docs
> node --experimental-strip-types scripts/docs.ts

guides/sea.md class SEA: guide "Build orchestrator — `execute` runs compress → blob → assemble; `destroy` tears down the emitter." source "Runs a Node.js single executable application build to completion."
guides/sea.md class Injector: guide "Cross-platform binary resource injector (PE / ELF / Mach-O) — `inject` writes the resource." source "Writes a named resource into a PE, ELF, or Mach-O executable in place."
guides/sea.md class Asset: guide "A single named asset — `key` / `content` / `compressed`." source "Holds one named asset's key, bytes, and compression state."
guides/sea.md class AssetManager: guide "Collection of embedded or disk-loaded assets — `register` / `load` / `asset` / `assets` / `keys`." source "Collects named assets from a SEA blob or from disk and serves them by key."
guides/sea.md function createSEA: guide "Create a new SEA build orchestrator." source "Creates a new SEA build orchestrator."
guides/sea.md function createInjector: guide "Create a cross-platform binary resource injector." source "Creates a cross-platform binary resource injector. Detects the executable format (PE, ELF, Mach-O) from the file header and injects the blob using pure TypeScript file I/O — no WASM, no external tools."
guides/sea.md function createAsset: guide "Create a single named asset." source "Creates a single named asset."
guides/sea.md function createAssetManager: guide "Create an asset manager for SEA-embedded or disk-loaded assets." source "Creates an asset manager for SEA-embedded or disk-loaded assets."
guides/sea.md const SEA_SENTINEL_FUSE: guide "SEA sentinel fuse value embedded in the Node.js binary." source "Holds the SEA sentinel fuse value embedded in the Node.js binary"
guides/sea.md const SEA_BLOB_RESOURCE: guide "Resource name for the SEA blob in the executable." source "Names the SEA blob resource in the executable"
guides/sea.md const DEFAULT_SEA_COMPRESSION_QUALITY: guide "Default Brotli compression quality level (maximum)." source "Holds the default Brotli compression quality level (maximum)"
guides/sea.md const WINDOWS_SUBSYSTEM_GUI: guide "Windows PE subsystem value: GUI application (no terminal window)." source "Holds the Windows PE subsystem value for a GUI application (no terminal window)"
guides/sea.md const WINDOWS_SUBSYSTEM_CONSOLE: guide "Windows PE subsystem value: console application." source "Holds the Windows PE subsystem value for a console application"
guides/sea.md const BROTLI_EXTENSION: guide "File extension indicating Brotli compression." source "Names the file extension indicating Brotli compression"
guides/sea.md const SKIP_EXTENSIONS: guide "File extensions Brotli compression skips." source "Lists the file extensions Brotli compression skips"
guides/sea.md const PE_MAGIC: guide "DOS MZ header magic (first 2 bytes of a PE file)." source "Holds the DOS MZ header magic (first 2 bytes of a PE file)"
guides/sea.md const PE_SIGNATURE: guide "PE signature: \"PE\\0\\0\" as a 32-bit value." source "Holds the PE signature, \"PE\\0\\0\" as a 32-bit value"
guides/sea.md const PE32_MAGIC: guide "PE32 optional header magic." source "Holds the PE32 optional header magic"
guides/sea.md const PE32_PLUS_MAGIC: guide "PE32+ (64-bit) optional header magic." source "Holds the PE32+ (64-bit) optional header magic"
guides/sea.md const ELF_MAGIC: guide "ELF magic: 0x7F 'E' 'L' 'F' as a 32-bit big-endian value." source "Holds the ELF magic, 0x7F 'E' 'L' 'F' as a 32-bit big-endian value"
guides/sea.md const ELF_CLASS_64: guide "ELF 64-bit class identifier." source "Holds the ELF 64-bit class identifier"
guides/sea.md const ELF_DATA_LSB: guide "ELF little-endian data encoding." source "Holds the ELF little-endian data encoding"
guides/sea.md const ELF_PT_NOTE: guide "ELF program header type: note segment." source "Holds the ELF program header type for a note segment"
guides/sea.md const ELF_PT_LOAD: guide "ELF program header type: loadable segment." source "Holds the ELF program header type for a loadable segment"
guides/sea.md const ELF_PT_PHDR: guide "ELF program header type: the program header table itself." source "Holds the ELF program header type for the program header table itself"
guides/sea.md const ELF_PF_R: guide "ELF segment permission flag marking a segment readable." source "Holds the ELF segment permission flag marking a segment readable"
guides/sea.md const ELF_PAGE_SIZE: guide "Page size an injected ELF segment is aligned to." source "Holds the page size an injected ELF segment is aligned to"
guides/sea.md const MACHO_MAGIC_64: guide "Mach-O 64-bit magic (little-endian)." source "Holds the Mach-O 64-bit magic (little-endian)"
guides/sea.md const MACHO_LC_SEGMENT_64: guide "Mach-O LCSEGMENT64 load command." source "Holds the Mach-O LC_SEGMENT_64 load command"
guides/sea.md const PE_RT_RCDATA: guide "PE resource type: RT_RCDATA (raw data)." source "Holds the PE resource type RT_RCDATA (raw data)"
guides/sea.md const PE_RESOURCE_DIR_SIZE: guide "Size of IMAGERESOURCEDIRECTORY in bytes." source "Holds the size of IMAGE_RESOURCE_DIRECTORY in bytes"
guides/sea.md const PE_RESOURCE_ENTRY_SIZE: guide "Size of IMAGERESOURCEDIRECTORY_ENTRY in bytes." source "Holds the size of IMAGE_RESOURCE_DIRECTORY_ENTRY in bytes"
guides/sea.md const PE_RESOURCE_DATA_ENTRY_SIZE: guide "Size of IMAGERESOURCEDATA_ENTRY in bytes." source "Holds the size of IMAGE_RESOURCE_DATA_ENTRY in bytes"
guides/sea.md const PE_SECTION_HEADER_SIZE: guide "PE section header size in bytes." source "Holds the PE section header size in bytes"
guides/sea.md const PE_RESOURCE_SUBDIR_FLAG: guide "High bit mask for resource directory entry offset (indicates subdirectory)." source "Holds the high bit mask for a resource directory entry offset (indicates subdirectory)"
guides/sea.md const PE_RESOURCE_NAME_FLAG: guide "High bit mask for resource name entry (indicates named vs integer ID)." source "Holds the high bit mask for a resource name entry (indicates named vs integer ID)"
guides/sea.md const PE_SCN_INITIALIZED_DATA: guide "Section contains initialized data." source "Marks a section as containing initialized data"
guides/sea.md const PE_SCN_MEM_READ: guide "Section is readable." source "Marks a section as readable"
guides/sea.md const SEA_PLATFORMS: guide "Platform-specific SEA build configurations." source "Holds the platform-specific SEA build configurations"
guides/sea.md const SEA_COMPRESSION_MODE_VALUES: guide "Maps a `SEACompressionMode` to its numeric Brotli mode value." source "Maps a `SEACompressionMode` to its numeric Brotli mode value"
guides/sea.md const DEFAULT_ENTRY_FORMAT: guide "Default SEA entry point module format when none is specified." source "Names the default SEA entry point module format when none is specified"
guides/sea.md function isExecutableFormat: guide "Check if a value is a valid `ExecutableFormat`." source "Checks if a value is a valid `ExecutableFormat`."
guides/sea.md function resolvePlatform: guide "Resolve the effective platform configuration." source "Resolves the effective platform configuration."
guides/sea.md function isPlatformSupported: guide "Check if the current or specified platform is supported for SEA builds." source "Checks if the current or specified platform is supported for SEA builds."
guides/sea.md function ensureExists: guide "Assert that a path exists, throwing with a descriptive message if not." source "Asserts that a path exists, throwing a coded `SEAError` if not."
guides/sea.md function isCompressible: guide "Check whether a file's extension is outside `SKIP_EXTENSIONS`." source "Checks whether a file's extension is outside `SKIP_EXTENSIONS`, so Brotli compression applies to it."
guides/sea.md function walkDirectory: guide "Recursively walk a directory and return all file paths." source "Walks a directory recursively and returns all file paths."
guides/sea.md function executeShell: guide "Execute a command synchronously and return stdout; throws `ShellError`." source "Executes a command synchronously and returns stdout."
guides/sea.md function redactCommand: guide "Redact a shell command's arguments for safe inclusion in error messages." source "Redacts password arguments from a shell command."
guides/sea.md function computeSize: guide "Compute a size comparison between original and compressed byte counts." source "Computes a size comparison between original and compressed byte counts."
guides/sea.md function compressFile: guide "Brotli-compress a single file, writing the output alongside it." source "Brotli-compresses a single file, writing the output alongside it."
guides/sea.md function compressDirectory: guide "Compress all compressible files in a directory tree." source "Compresses all compressible files in a directory tree."
guides/sea.md function alignTo: guide "Round a value up to the next multiple of an alignment boundary." source "Rounds a value up to the next multiple of an alignment boundary."
guides/sea.md function readPEOffset: guide "Read the PE header offset from a Windows executable." source "Reads the PE header offset from a Windows executable."
guides/sea.md function readU16: guide "Read a 16-bit unsigned integer from a file descriptor." source "Reads a 16-bit unsigned integer from a file descriptor."
guides/sea.md function readU32: guide "Read a 32-bit unsigned little-endian integer from a file descriptor." source "Reads a 32-bit unsigned little-endian integer from a file descriptor."
guides/sea.md function readU64: guide "Read a 64-bit unsigned little-endian integer from a file descriptor." source "Reads a 64-bit unsigned little-endian integer from a file descriptor."
guides/sea.md function writeU16: guide "Write a 16-bit unsigned integer to a file descriptor." source "Writes a 16-bit unsigned integer to a file descriptor."
guides/sea.md function writeU32: guide "Write a 32-bit unsigned little-endian integer to a file descriptor." source "Writes a 32-bit unsigned little-endian integer to a file descriptor."
guides/sea.md function writeU64: guide "Write a 64-bit unsigned little-endian integer to a file descriptor." source "Writes a 64-bit unsigned little-endian integer to a file descriptor."
guides/sea.md function appendFile: guide "Append a source file to a target file, streaming in fixed-size chunks." source "Appends a source file to a target file, streaming in fixed-size chunks."
guides/sea.md function stripTrailingNulls: guide "Truncate a NUL-padded binary name field at its first NUL character." source "Truncates a string at its first NUL character."
guides/sea.md function isPEExecutable: guide "Check if a file is a Windows PE executable." source "Checks if a file is a Windows PE executable."
guides/sea.md function patchPESubsystem: guide "Patch the PE subsystem field in a Windows executable." source "Patches the PE subsystem field in a Windows executable."
guides/sea.md function stripPESignature: guide "Remove the Authenticode signature from a PE executable." source "Removes the Authenticode signature from a PE executable by zeroing the security directory entry in the optional header."
guides/sea.md function buildSignCommand: guide "Build the `signtool sign` argv for signing a Windows executable." source "Builds the `signtool sign` argv for signing a Windows executable."
guides/sea.md function formatSize: guide "Format a byte count as a human-readable string." source "Formats a byte count as a human-readable string."
guides/sea.md function ensureSafeKey: guide "Assert that an asset key is safe to use as a relative filesystem key." source "Asserts that an asset key is safe to use as a relative filesystem/archive key."
guides/sea.md function ensureContained: guide "Assert a path real-path-resolves inside a base root (blocks symlink escape)." source "Asserts that `path` (resolved against `base`) real-path-resolves to a location inside `base`, defeating a symlink escape."
guides/sea.md function ensureSafeName: guide "Assert that a name is a single safe path segment (output executable base name)." source "Asserts that `name` is a single safe path segment suitable as an output executable base name."
guides/sea.md function finalizeExecutable: guide "Durably flush and atomically move a built executable into place." source "Finalizes a built executable by durably flushing it to disk and atomically moving it into place."
guides/sea.md function syncDirectory: guide "Fsync a directory to durably persist a prior file rename/create within it." source "Fsyncs a directory to durably persist a prior file rename/create within it."
guides/sea.md function buildBlobConfig: guide "Build the `--experimental-sea-config` JSON object for a SEA blob." source "Builds the Node.js `--experimental-sea-config` JSON object for a SEA blob."
guides/sea.md function patchSentinelFuse: guide "Patch the sentinel fuse in a binary from `:0` to `:1`." source "Patches the sentinel fuse in a binary from `:0` to `:1`. Searches the file in 64 MB chunks with overlap to handle any file size. The fuse signals to the Node.js runtime that a SEA blob is present. This is normally handled by the Injector but is also available standalone when using native PE resource injection."
guides/sea.md function buildELFNoteHeader: guide "Build an ELF `PT_NOTE` entry's header bytes for the SEA blob note." source "Builds an ELF `PT_NOTE` entry's header bytes (namesz/descsz/type + padded name) for the SEA blob note, without the blob body itself."
guides/sea.md function alignELFNoteSize: guide "Round an ELF note payload size up to its four-byte alignment boundary." source "Aligns an ELF note component size to its four-byte boundary."
guides/sea.md function isPowerOfTwo: guide "Whether a positive integer is an exact power of two." source "Checks whether a number is a nonzero power of two."
guides/sea.md function copyRange: guide "Stream a byte range between two file descriptors in fixed-size chunks." source "Copies a byte range from one open file descriptor to another, streaming in fixed-size chunks instead of buffering the whole range in memory."
guides/sea.md function openBrowser: guide "Launch the system default browser at an http(s) URL." source "Launches the system default browser at an http(s) URL."
guides/sea.md class SEAError: guide "The coded base error for every failure raised by the SEA build." source "Represents the coded base error for every failure raised by the SEA build."
guides/sea.md function isSEAError: guide "Whether a value is a `SEAError`." source "Checks whether a value is a `SEAError`."
guides/sea.md class ShellError: guide "Error `executeShell` throws when a command exits non-zero." source "Represents an error thrown when a shell command executed through `executeShell` exits non-zero."
guides/sea.md function isShellError: guide "Whether a value is a `ShellError`." source "Checks whether a value is a `ShellError`."
guides/sea.md interface SEACompressionSize: guide "Size comparison between original and compressed data." source "Represents a size comparison between original and compressed data."
guides/sea.md type SEACompressionMode: guide "Brotli compression mode (`generic` / `text` / `font`)." source "Names a Brotli compression mode."
guides/sea.md interface SEACompressionResult: guide "Result of compressing a single file." source "Represents the result of compressing a single file."
guides/sea.md interface SEACompressionManifest: guide "Manifest summarizing all compressed assets." source "Summarizes all compressed assets."
guides/sea.md interface SEAProgress: guide "Progress reported while compressing a directory (`path`/`current`/`total`)." source "Represents the progress reported while compressing a directory."
guides/sea.md type SEACompressionHandler: guide "Callback `compressDirectory` invokes after each file it compresses." source "Describes the callback `compressDirectory` invokes after each file it compresses."
guides/sea.md interface SEABrotliOptions: guide "Options controlling how Brotli encodes one file (`mode` / `quality`)." source "Controls how Brotli encodes one file."
guides/sea.md interface SEACompressionOptions: guide "Options controlling Brotli compression of one or more directories." source "Controls Brotli compression of one or more directories."
guides/sea.md interface SEAPlatform: guide "Platform-specific SEA build configuration." source "Represents a platform-specific SEA build configuration."
guides/sea.md interface SEAShellOptions: guide "Options for executing a shell command." source "Configures the execution of a shell command."
guides/sea.md type ExecutableFormat: guide "Executable binary format detected from file header magic bytes." source "Names an executable binary format detected from file header magic bytes."
guides/sea.md interface ELFNoteHeader: guide "An ELF `PT_NOTE` entry's header bytes and the entry's on-disk size." source "Holds an ELF `PT_NOTE` entry's header bytes and the on-disk size of the whole entry."
guides/sea.md interface ELFProgramHeader: guide "One ELF64 program header entry, transliterating `Elf64_Phdr`." source "Holds one ELF64 program header entry."
guides/sea.md interface PEResourceLeaf: guide "One leaf of a PE resource directory tree, with its data entry." source "Holds one leaf of a PE resource directory tree."
guides/sea.md interface PEResourceEntry: guide "One language entry of a PE resource name directory." source "Holds one language entry of a PE resource name directory."
guides/sea.md interface PESection: guide "One PE section table entry, with the file offset it was read from." source "Holds one PE section table entry."
guides/sea.md interface InjectorOptions: guide "Options for injecting a resource into an executable." source "Configures the injection of a resource into an executable."
guides/sea.md interface InjectorMachOOptions: guide "Mach-O specific injector options." source "Configures Mach-O specific injector behavior."
guides/sea.md interface InjectorInterface: guide "Cross-platform binary resource injector contract." source "Represents a cross-platform binary resource injector."
guides/sea.md interface AssetInput: guide "Minimal data needed to create an `AssetInterface`." source "Holds the minimal data needed to create an `AssetInterface`."
guides/sea.md interface AssetInterface: guide "A single named asset wrapping its key, content buffer, and compression flag." source "Represents a single named asset wrapping its key, content buffer, and compression flag."
guides/sea.md type AssetManagerEventMap: guide "Events emitted by an `AssetManagerInterface`." source "Lists the events emitted by an `AssetManagerInterface`."
guides/sea.md interface AssetManagerOptions: guide "Options for creating an `AssetManagerInterface`." source "Configures the creation of an `AssetManagerInterface`."
guides/sea.md interface AssetManagerInterface: guide "Named asset collection with SEA and disk loading." source "Represents a named asset collection with SEA and disk loading."
guides/sea.md type SEAStatus: guide "Overall status of the SEA build." source "Names the overall status of the SEA build."
guides/sea.md type SEAErrorCode: guide "Machine-readable error code carried by every `SEAError`." source "Names the machine-readable error code carried by every `SEAError`."
guides/sea.md type SEAEntryFormat: guide "SEA entry point module format (`cjs` / `esm`)." source "Names the SEA entry point module format."
guides/sea.md interface SEAEntryOptions: guide "Options describing the SEA entry point (path and module format)." source "Describes the SEA entry point."
guides/sea.md interface SEABlobOptions: guide "Options controlling generated SEA blob behavior (cache, snapshot)." source "Controls generated SEA blob behavior."
guides/sea.md type SEAEventMap: guide "Events emitted by a `SEAInterface`." source "Lists the events emitted by a `SEAInterface`."
guides/sea.md interface SEAOptions: guide "Options for creating a SEA build, including a per-command timeout." source "Configures the creation of a SEA build."
guides/sea.md interface SEAWindowsOptions: guide "Windows-specific SEA build options." source "Configures Windows-specific SEA build behavior."
guides/sea.md interface SEAWindowsSignOptions: guide "Windows Authenticode signing options, passed through to `signtool`." source "Describes the Windows Authenticode signing options passed through to `signtool`."
guides/sea.md interface SEAResult: guide "Result of a successful SEA build (adds `signed`, `stripped`, `terminal`)." source "Represents the result of a successful SEA build."
guides/sea.md interface SEAInterface: guide "SEA build orchestrator contract." source "Represents a SEA build orchestrator."
guides/sea.md SEAInterface.execute: guide absent source absent
guides/sea.md SEAInterface.destroy: guide absent source absent
guides/sea.md InjectorInterface.inject: guide absent source "Injects the resource data into the executable."
guides/sea.md AssetManagerInterface.asset: guide absent source absent
guides/sea.md AssetManagerInterface.assets: guide absent source absent
guides/sea.md AssetManagerInterface.keys: guide absent source absent
guides/sea.md AssetManagerInterface.register: guide absent source absent
guides/sea.md AssetManagerInterface.load: guide absent source absent
guides/sea.md AssetManagerInterface.clear: guide absent source absent
guides/sea.md AssetManagerInterface.destroy: guide absent source absent
guides/sea.md pitch: readme absent tagline "Node.js SEA builder — compress, blob, assemble, sign, and embed assets into a standalone binary. Pure TypeScript, no WASM, no external tools. Source: `src/server`. Surfaced through the `@orkestrel/sea` barrel."
rows read: 1, disagreements found: 129
```

## Wall clock

First command 2026-09-07T16:43:37Z, last command 2026-09-07T16:53Z: about 10 minutes.

## Deviation state

None. `repair` wrote the P21 list exactly, every before-text was found verbatim and exactly once, no voice diagnostic named an off-limits file, `test:policy` reddened only on `README.md` lines this unit owns, and every gate other than `docs` reads green. `npm install` and `npm ci` were not run; `package-lock.json`, `node_modules`, and `guides/**` are untouched. Instruments are under `/home/user/fleet/sea/tmp/d7n-sea-prep/` (`voice.mjs`, `repair.log.txt`, `lint-before.log.txt`, `lint-after.log.txt`, `policy-before.log.txt`, `docs.log.txt`).

---

Orchestrator's annotation (2026-09-07, from `d7n-sea-audit-verdict.md`): this report states counts in prose; the P.2 report cites `terminal` for a header precedent that `terminal` does not carry, and the P.1 report quotes a `git diff -U0 | grep` pipeline whose literal output carries the file headers (the P.2 report's form with `grep -vE '^[+-]{3}'` is the correct one). The tree is authoritative; every other cited line matched it on the audit's re-read. The unit's instruments are retained under `instruments/d7/units/sea/`.
