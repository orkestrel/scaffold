# Brief — P.2 `d7n-sea-converge` (sea under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/sea` from the committed baseline `09f5e85` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.15`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/sea.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/sea/guides/sea.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-sea-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/sea.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/sea.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/sea.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
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
exit 1
```

## Facts for sea (taken 2026-09-07T17:02Z by facts.sh)

- Checkout `/home/user/fleet/sea`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `09f5e85`, status: clean
- `package.json`: version `0.0.15`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 47 | summary 22 | banned 25 | tests/setupServer.ts(23) src/server/helpers.ts(11) src/server/types.ts(6) src/server/injectors/Injector.ts(5) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    8:| Concept | Spec               | Source                        | Tests                                     |
    9:| ------- | ------------------ | ----------------------------- | ----------------------------------------- |
    10:| Sea     | [`sea.md`](sea.md) | [`src/server`](../src/server) | [`tests/src/server`](../tests/src/server) |
    14:| Directory    | Guide              |
    15:| ------------ | ------------------ |
    16:| `src/server` | [`sea.md`](sea.md) |
- Guide `guides/sea.md`: 353 lines. Headings:
    1:# SEA — Single Executable Application Builder
    5:## Overview
    40:## Surface
    42:### Entities
    51:### Factories
    60:### Constants
    98:### Helpers and errors
    145:### Types
    185:## Methods
    189:#### `SEAInterface`
    198:#### `InjectorInterface`
    206:#### `AssetManagerInterface`
    220:## Usage
    222:### Injecting a resource directly
    239:### Assets
    261:### Boundary and formatting helpers
    351:## See also
- Table headers in `guides/sea.md` (a header row is the row before a `| ---` row):
    44: | API            | Kind  | Summary                                                                                           |
    53: | API                  | Kind     | Summary                                                         |
    62: | API                               | Kind  | Summary                                                                     |
    100: | API                   | Kind     | Summary                                                                         |
    147: | API                      | Kind      | Summary                                                                      |
    193: | Method    | Returns              | Behavior                                                                |
    202: | Method   | Returns | Behavior                                             |
    210: | Method     | Returns                       | Behavior                                                      |
- Rows of any `### Entities` table (the Kind cell):
    46:  `SEA`          | class
    47:  `Injector`     | class
    48:  `Asset`        | class
    49:  `AssetManager` | class
- H1 blockquote (`guides/sea.md`):
    3: > Node.js SEA builder — compress, blob, assemble, sign, and embed assets into a standalone binary. Pure TypeScript, no WASM, no external tools. Source: [`src/server`](../src/server). Surfaced through the `@orkestrel/sea` barrel.
- Opening prose after the blockquote (first two lines):
    5: ## Overview
    7: ```ts
- README (`README.md`) first lines:
    # @orkestrel/sea
    
    A pure-TypeScript Node.js [Single Executable Application (SEA)](https://nodejs.org/api/single-executable-applications.html)
    builder for the `@orkestrel` line — compress assets, assemble the SEA blob,
    and inject it into a standalone binary, entirely in TypeScript with no
    external tools.
    
    ## Install
    
    ```sh
    npm install @orkestrel/sea
    ```
- `## Patterns` fences, each with its nearest preceding heading:
    7: fence under "## Overview"
    224: fence under "### Injecting a resource directly"
    241: fence under "### Assets"
    263: fence under "### Boundary and formatting helpers"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/server/factories.ts:34:export function createSEA(options: SEAOptions): SEAInterface {
    src/server/factories.ts:59:export function createInjector(options: InjectorOptions): InjectorInterface {
    src/server/factories.ts:74:export function createAsset(input: AssetInput): AssetInterface {
    src/server/factories.ts:90:export function createAssetManager(options?: AssetManagerOptions): AssetManagerInterface {
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/server/injectors/Injector.ts:92:export class Injector implements InjectorInterface {
    src/server/assets/Asset.ts:21:export class Asset implements AssetInterface {
    src/server/assets/AssetManager.ts:39:export class AssetManager implements AssetManagerInterface {
    src/server/seas/SEA.ts:72:export class SEA implements SEAInterface {
    src/server/errors.ts:28:export class SEAError extends Error {
    src/server/errors.ts:78:export class ShellError extends SEAError {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/server/injectors/Injector.ts:1
    src/server/assets/Asset.ts:1
    src/server/assets/AssetManager.ts:1
    src/server/validators.ts:1
    src/server/factories.ts:4
    src/server/seas/SEA.ts:1
    src/server/helpers.ts:17
    src/server/errors.ts:4
- Drop-in sites (`tests/guides.test.ts`):
    20:} from '@orkestrel/guide'
    57:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    63:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    108:		for (const group of guide.methods()) {
    109:			const members = source.methods(group.interface).map((method) => method.name)
    117:					expect(findMissing(members, documented)).toEqual([])
    120:					expect(findMissing(documented, members)).toEqual([])
    126:							: findMissing(
    127:									source.methods(entity).map((method) => method.name),
    145:				findUnexampled(
    148:					source.examples().map((example) => example.name),
    153:		for (const group of guide.methods()) {
    158:					? source.examples(group.interface).map((example) => example.name)
    162:							.concat(source.examples(entity).map((example) => example.name))
    169:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    181:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks:  — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-sea-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/sea.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/sea.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-sea-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
