# Brief — P.1 `d7n-sea-prep` (sea's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`implementer` on Claude Opus 5: a fully specified unit. Sole writer in `/home/user/fleet/sea` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `2b15444`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

sea's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== sea 2026-09-07T16:42:48Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
80:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 964ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### sea (2b15444, version 0.0.14, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 29 unchanged, 0 removed in ..
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
   tests/setupServer.ts(23)
   src/server/helpers.ts(11)
   src/server/types.ts(6)
   src/server/injectors/Injector.ts(5)
   tests/src/server/injectors/Injector.test.ts(1)
   tests/setup.ts(1)
-- docs
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
-- check
   tests/guides.test.ts(116,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(119,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(123,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(138,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(153,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 13 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  13 failed | 21 passed (34)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 56ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(2) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(2) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 47 | summary 22 | banned 25 | tests/setupServer.ts(23) src/server/helpers.ts(11) src/server/types.ts(6) src/server/injectors/Injector.ts(5) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+76,	+     "message": "prose carries no banned term: via (through, by using)",	+     "path": "README.md"
+140,	+     "message": "prose carries no banned term: via (through, by using)",	+     "path": "README.md"
+151,	+     "message": "prose carries no banned term: via (through, by using)",	+     "path": "README.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for sea (taken 2026-09-07T16:43Z by facts.sh)

- Checkout `/home/user/fleet/sea`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `2b15444`, status: clean
- `package.json`: version `0.0.14`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    109:			const members = source.methods(group.interface)
    116:					expect(findMissing(members, group.methods)).toEqual([])
    119:					expect(findMissing(group.methods, members)).toEqual([])
    123:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    138:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    141:		for (const group of guide.methods()) {
    151:							? source.examples(group.interface)
    152:							: source.examples(group.interface).concat(source.examples(entity))
    153:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    165:					expect(findMissing(names, surface)).toEqual([])
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
4. **The bump.** `package.json` `"version": "0.0.14"` → `"version": "0.0.15"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-sea-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
