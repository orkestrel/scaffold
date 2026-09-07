# Brief — P.1 `d7n-workspace-prep` (workspace's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/workspace` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `2c18b15`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

workspace's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== workspace 2026-09-07T16:42:51Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
78:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 878ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### workspace (2c18b15, version 0.0.7, guide range ^0.0.17, head start 0.0.18)
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
   tests/setup.ts(3)
   tests/src/core/workspaces/Workspace.test.ts(1)
-- docs
   guides/workspace.md interface WorkspaceInterface: guide absent source "Represents a mutable path-keyed editing surface over immutable file values."
   guides/workspace.md interface WorkspaceManagerOptions: guide absent source "Configures a workspace registry at construction."
   guides/workspace.md interface WorkspaceManagerInterface: guide absent source "Represents an insertion-ordered workspace registry with an active selection and optional durability."
   guides/workspace.md const EXTENSION_LANGUAGES: guide absent source "Maps file extensions to language tags for text content. Unknown extensions intentionally fall back to `text` in `import('./helpers.js').inferLanguage`."
   guides/workspace.md class WorkspaceError: guide absent source "Reports an invalid workspace edit or search operation."
   guides/workspace.md function isWorkspaceError: guide absent source "Narrows a caught value to a `WorkspaceError`."
   guides/workspace.md function inferLanguage: guide absent source "Infers a language tag from the final file extension."
   guides/workspace.md function isText: guide absent source "Determines whether content is the text arm."
   guides/workspace.md function isBinary: guide absent source "Checks whether content is the binary arm."
   guides/workspace.md function computeSize: guide absent source "Computes the byte size of file content."
   guides/workspace.md function countLines: guide absent source "Counts the lines in file content."
   guides/workspace.md function computeDecodedSize: guide absent source "Computes the decoded byte length of a base64 string."
   guides/workspace.md function isValidRange: guide absent source "Determines whether a 1-based range is structurally valid."
   guides/workspace.md function clampPosition: guide absent source "Clamps a position to text bounds."
   guides/workspace.md function clampRange: guide absent source "Clamps both positions in a range to text bounds."
   guides/workspace.md function offsetAt: guide absent source "Converts a 1-based position to a zero-based string offset."
   guides/workspace.md function sliceRange: guide absent source "Slices a clamped half-open text range."
   guides/workspace.md function spliceRange: guide absent source "Replaces a clamped half-open text range."
   guides/workspace.md function rangeOf: guide absent source "Assembles a nested range from four 1-based coordinates."
   guides/workspace.md function escapeRegExp: guide absent source "Escapes regular-expression metacharacters for literal matching."
   guides/workspace.md function isFile: guide absent source "Narrows an unknown value to an immutable file record."
   guides/workspace.md function isWorkspaceSnapshot: guide absent source "Narrows an unknown value to a workspace snapshot."
   guides/workspace.md function createFile: guide absent source "Creates an immutable file with derived size and line counts."
   guides/workspace.md function createTextContent: guide absent source "Creates the text arm of `FileContent`."
   guides/workspace.md function createBinaryContent: guide absent source "Creates the binary arm of `FileContent`."
   guides/workspace.md function createWorkspace: guide absent source "Creates a workspace."
   guides/workspace.md function createMemoryWorkspaceStore: guide absent source "Creates an in-memory workspace snapshot store."
   guides/workspace.md function createDatabaseWorkspaceStore: guide absent source "Creates a database-backed workspace snapshot store."
   guides/workspace.md function createWorkspaceManager: guide absent source "Creates an empty workspace registry."
   guides/workspace.md class Workspace: guide absent source "Provides a mutable path-keyed editing surface over immutable files. Whole-file edits create text files, ranged edits operate only on existing text files, and binary files remain available through construction-time hydration. Mutations emit after the registry has changed."
   guides/workspace.md class WorkspaceManager: guide absent source "Provides an insertion-ordered workspace registry with an active selection. A supplied store adds lenient snapshot `open` and `save` operations. Event defaults flow into workspaces created through the registry, while observability remains owned by each workspace."
   guides/workspace.md class MemoryWorkspaceStore: guide absent source "Holds workspace snapshots in the current process."
   guides/workspace.md class DatabaseWorkspaceStore: guide absent source "Persists workspace snapshots in a database table. Snapshots occupy one opaque column and are narrowed when read back from the storage boundary."
   guides/workspace.md WorkspaceInterface.file: guide absent source "Finds the file value stored at one path."
   guides/workspace.md WorkspaceInterface.files: guide absent source "Lists every file in insertion order."
   guides/workspace.md WorkspaceInterface.read: guide absent source "Reads a text file whole."
   guides/workspace.md WorkspaceInterface.has: guide absent source "Checks whether one path is present."
   guides/workspace.md WorkspaceInterface.search: guide absent source "Scans text files for a query, skipping binary content."
   guides/workspace.md WorkspaceInterface.replace: guide absent source "Rewrites every match across the text files, skipping binary content."
   guides/workspace.md WorkspaceInterface.write: guide absent source "Writes whole text to a path, creating it when absent and retyping a binary path as text."
   guides/workspace.md WorkspaceInterface.prepend: guide absent source "Puts text before a path's existing content, treating an absent path as empty text."
   guides/workspace.md WorkspaceInterface.append: guide absent source "Puts text after a path's existing content, treating an absent path as empty text."
   guides/workspace.md WorkspaceInterface.move: guide absent source "Re-keys one file to a new path, keeping the source's insertion slot."
   guides/workspace.md WorkspaceInterface.remove: guide absent source "Drops one path, leaving an absent path untouched."
   guides/workspace.md WorkspaceInterface.clear: guide absent source "Empties the workspace and emits one `clear`, never a burst of per-path removals."
   guides/workspace.md WorkspaceInterface.snapshot: guide absent source "Projects the identity and a flat file list into a serializable value."
   guides/workspace.md WorkspaceInterface.destroy: guide absent source "Releases the owned emitter, leaving the editing surface functional and unobserved."
   guides/workspace.md WorkspaceManagerInterface.workspace: guide absent source "Finds one registered workspace by id."
   guides/workspace.md WorkspaceManagerInterface.workspaces: guide absent source "Lists registered workspaces in insertion order."
   guides/workspace.md WorkspaceManagerInterface.add: guide absent source "Creates and registers a workspace, activating it when no selection is active yet."
   guides/workspace.md WorkspaceManagerInterface.switch: guide absent source "Re-points the active selection at a registered workspace."
   guides/workspace.md WorkspaceManagerInterface.open: guide absent source "Activates a registered workspace, or hydrates one from a stored snapshot on a registry miss."
   guides/workspace.md WorkspaceManagerInterface.save: guide absent source "Persists a registered workspace's snapshot under its own id."
   guides/workspace.md WorkspaceManagerInterface.remove: guide absent source "Drops one registered workspace and destroys it."
   guides/workspace.md WorkspaceManagerInterface.clear: guide absent source "Empties the registry, destroying each workspace and clearing the selection."
   guides/workspace.md WorkspaceStoreInterface.get: guide absent source "Resolves a snapshot."
   guides/workspace.md WorkspaceStoreInterface.set: guide absent source "Inserts or replaces a snapshot under its own identifier."
   guides/workspace.md WorkspaceStoreInterface.delete: guide absent source "Deletes a snapshot when present."
   guides/workspace.md pitch: readme absent tagline "The virtual file workspace for the `@orkestrel` line. A workspace is a path-keyed map of immutable files with an editing surface over it. Every edit — `write`, `prepend`, `append`, `replace`, `move` — mints a new `FileInterface` value and puts it back under its path, so a file is a value a caller can hold and compare, never a handle that changes underneath it. `Workspace` is that map; `WorkspaceManager` keeps workspaces by id with one active selection; a `WorkspaceStoreInterface` persists snapshots. Source: `src/core`. Published through `@orkestrel/workspace`. A workspace is not a filesystem. There is no disk, no `node:fs`, no watcher, no synchronization lifecycle, and no dirty-state tracking. A path is a key, not a location: `src/main.ts` and `notes.md` sit in the same flat map with no directories between them, and nothing outside the process can change what the map holds. Durability is a separate seam — `snapshot()` produces a plain JSON-serializable value and a store persists it. A store that one day wrote those snapshots to disk would be one more implementation of that interface, not a change of identity here. Anyone can drive it. An agent loop, a tool handler, and plain application code are all just callers."
   rows read: 1, disagreements found: 78
   exit 1
-- check
   tests/guides.test.ts(117,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(120,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(124,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(139,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(154,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 12 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  12 failed | 25 passed (37)
   exit 1
-- test:policy
        × enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace 53ms
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(4) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
    FAIL  |policy| tests/policy.test.ts > repository policy > enforces the mirror, suppression, skill, bridge, and portability laws over the real workspace
   AssertionError: expected [ { rule: 'prose', …(3) }, …(4) ] to deeply equal []
   - Expected
   + Received
    Test Files  1 failed (1)
         Tests  1 failed | 89 passed | 1 skipped (91)
   exit 1
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 4 | summary 3 | banned 1 | tests/setup.ts(3) tests/src/core/workspaces/Workspace.test.ts(1) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
+16,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "README.md"
+19,	+     "message": "prose carries no banned term: just (delete)",	+     "path": "guides/workspace.md"
+33,	+     "message": "prose carries no banned term: simply (delete)",	+     "path": "guides/workspace.md"
+406,	+     "message": "prose carries no banned term: should (must, can, might, or the imperative)",	+     "path": "guides/workspace.md"
+475,	+     "message": "prose carries no banned term: simply (delete)",	+     "path": "guides/workspace.md"
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for workspace (taken 2026-09-07T16:43Z by facts.sh)

- Checkout `/home/user/fleet/workspace`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `2c18b15`, status: clean
- `package.json`: version `0.0.7`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 4 | summary 3 | banned 1 | tests/setup.ts(3) tests/src/core/workspaces/Workspace.test.ts(1) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    11:| Concept   | Spec                           | Source                    | Tests                                 |
    12:| --------- | ------------------------------ | ------------------------- | ------------------------------------- |
    13:| Workspace | [`workspace.md`](workspace.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    17:| Directory  | Guide                          |
    18:| ---------- | ------------------------------ |
    19:| `src/core` | [`workspace.md`](workspace.md) |
- Guide `guides/workspace.md`: 564 lines. Headings:
    1:# Workspace
    28:## Surface
    30:### Contracts
    60:### Constants
    66:### Errors
    76:### Helpers
    98:### Validators
    108:### Factories
    123:### `Workspace`
    134:### `WorkspaceManager`
    143:### `MemoryWorkspaceStore`
    150:### `DatabaseWorkspaceStore`
    159:## Methods
    163:#### `WorkspaceInterface`
    182:#### `WorkspaceManagerInterface`
    195:#### `WorkspaceStoreInterface`
    203:## Files and content
    249:## Editing
    289:## Reading and searching
    333:## Moving, removing, and snapshots
    371:## Events
    389:## Lifecycle
    403:## The registry
    441:## Durability
    495:## Failures
    524:## Callers
    537:## Tests
    555:## See also
- Table headers in `guides/workspace.md` (a header row is the row before a `| ---` row):
    35: | Name                        | Kind      | Shape / Purpose                                                                                                                                      |
    62: | Name                  | Kind  | Purpose                                                                                                        |
    71: | Name               | Kind     | Signature                                     | Behavior                                                                                 |
    81: | Name                 | Kind     | Signature                                                     | Behavior                                                                       |
    103: | Name                  | Kind     | Signature                                        | Behavior                                            |
    113: | Name                           | Kind     | Signature                                                          | Behavior                                                                                 |
    165: | Method     | Returns                         | Behavior                                                                                          |
    184: | Method       | Returns                                    | Behavior                                                                  |
    197: | Method   | Returns                                   | Behavior                                                    |
    377: | Event    | Payload            | Timing                                                         |
    500: | Code       | Raised by                                                            |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/workspace.md`):
    3: > **The virtual file workspace for the `@orkestrel` line.** A workspace is a path-keyed map of
    4: > immutable files with an editing surface over it. Every edit — `write`, `prepend`, `append`,
    5: > `replace`, `move` — mints a new `FileInterface` value and puts it back under its path, so a file
    6: > is a value a caller can hold and compare, never a handle that changes underneath it. `Workspace`
    7: > is that map; `WorkspaceManager` keeps workspaces by id with one active selection; a
    8: > `WorkspaceStoreInterface` persists snapshots. Source: [`src/core`](../src/core). Published
    9: > through `@orkestrel/workspace`.
    10: >
    11: > **A workspace is not a filesystem.** There is no disk, no `node:fs`, no watcher, no
    12: > synchronization lifecycle, and no dirty-state tracking. A path is a key, not a location:
    13: > `src/main.ts` and `notes.md` sit in the same flat map with no directories between them, and
    14: > nothing outside the process can change what the map holds. Durability is a separate seam —
    15: > `snapshot()` produces a plain JSON-serializable value and a store persists it. A store that one
    16: > day wrote those snapshots to disk would be one more implementation of that interface, not a
    17: > change of identity here.
    18: >
    19: > **Anyone can drive it.** An agent loop, a tool handler, and plain application code are all just
    20: > callers.
- Opening prose after the blockquote (first two lines):
    22: A `Workspace` is the live editing surface over one map of files. A `WorkspaceManager` is a registry
    23: of workspaces keyed by id, with an active selection and, when a store is supplied, lenient `open`
- README (`README.md`) first lines:
    # @orkestrel/workspace
    
    The virtual file workspace for the `@orkestrel` line.
    
    A workspace is a path-keyed map of immutable files with an editing surface over it: write, read,
    search, replace, move, remove. Every edit mints a new file value and puts it back under its path,
    so a file is a value a caller can hold and compare rather than a handle that changes underneath it.
    Around that map sit a registry of named workspaces with one active selection, and pluggable stores
    that persist plain snapshots.
    
    It is not a filesystem. There is no disk, no `node:fs`, no watcher, no synchronization lifecycle,
    and no dirty-state tracking — a path is a key, not a location. Durability is a separate seam: a
- `## Patterns` fences, each with its nearest preceding heading:
    213: fence under "## Files and content"
    258: fence under "## Editing"
    294: fence under "## Reading and searching"
    335: fence under "## Moving, removing, and snapshots"
    395: fence under "## Lifecycle"
    408: fence under "## The registry"
    446: fence under "## Durability"
    507: fence under "## Failures"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/factories.ts:36:export function createFile(input: FileInput): FileInterface {
    src/core/factories.ts:60:export function createTextContent(text: string, language: string): TextContent {
    src/core/factories.ts:78:export function createBinaryContent(base64: string, mime: BinaryMIME): BinaryContent {
    src/core/factories.ts:96:export function createWorkspace(options?: WorkspaceOptions): WorkspaceInterface {
    src/core/factories.ts:112:export function createMemoryWorkspaceStore(): WorkspaceStoreInterface {
    src/core/factories.ts:129:export function createDatabaseWorkspaceStore(
    src/core/factories.ts:152:export function createWorkspaceManager(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/core/workspaces/stores/MemoryWorkspaceStore.ts:13:export class MemoryWorkspaceStore implements WorkspaceStoreInterface {
    src/core/workspaces/stores/DatabaseWorkspaceStore.ts:27:export class DatabaseWorkspaceStore implements WorkspaceStoreInterface {
    src/core/workspaces/Workspace.ts:45:export class Workspace implements WorkspaceInterface {
    src/core/workspaces/WorkspaceManager.ts:28:export class WorkspaceManager implements WorkspaceManagerInterface {
    src/core/errors.ts:4:export class WorkspaceError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/workspaces/stores/MemoryWorkspaceStore.ts:1
    src/core/workspaces/stores/DatabaseWorkspaceStore.ts:1
    src/core/workspaces/Workspace.ts:1
    src/core/workspaces/WorkspaceManager.ts:1
    src/core/validators.ts:2
    src/core/factories.ts:7
    src/core/helpers.ts:14
    src/core/errors.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    36:} from '@orkestrel/guide'
    58:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    64:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    109:		for (const group of guide.methods()) {
    110:			const members = source.methods(group.interface)
    117:					expect(findMissing(members, group.methods)).toEqual([])
    120:					expect(findMissing(group.methods, members)).toEqual([])
    124:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    139:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    142:		for (const group of guide.methods()) {
    152:							? source.examples(group.interface)
    153:							: source.examples(group.interface).concat(source.examples(entity))
    154:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    166:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 537:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.7"` → `"version": "0.0.8"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-workspace-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
