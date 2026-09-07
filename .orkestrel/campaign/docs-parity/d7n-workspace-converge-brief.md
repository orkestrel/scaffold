# Brief — P.2 `d7n-workspace-converge` (workspace under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/workspace` from the committed baseline `e308cae` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.8`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/workspace.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/workspace/guides/workspace.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-workspace-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/workspace.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/workspace.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/workspace.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/workspace.md type BinaryMIME: guide absent source "Names the MIME labels a binary `FileContent` arm supports."
guides/workspace.md type FileContent: guide absent source "Holds a file's immutable content: either text with a language tag or a base64 string with a MIME."
guides/workspace.md interface TextContent: guide absent source "Holds the text arm of a file's immutable content: a body and its language tag."
guides/workspace.md interface BinaryContent: guide absent source "Holds the binary arm of a file's immutable content: a base64 payload and its MIME."
guides/workspace.md type FileState: guide absent source "Names the edit state of an immutable file value."
guides/workspace.md interface FileInput: guide absent source "Carries the caller-supplied values used to create an immutable file."
guides/workspace.md interface FileInterface: guide absent source "Represents an immutable path-addressed file with derived byte and line counts."
guides/workspace.md interface Position: guide absent source "Locates a 1-based caret inside text."
guides/workspace.md interface Range: guide absent source "Represents a half-open text span whose start is inclusive and end is exclusive."
guides/workspace.md interface ReadResult: guide absent source "Carries the content and clamped span returned by a ranged read."
guides/workspace.md interface SearchOptions: guide absent source "Configures search and replacement behavior."
guides/workspace.md interface SearchMatch: guide absent source "Reports one 1-based search hit and the full line that contains it."
guides/workspace.md interface ReplaceResult: guide absent source "Carries the tallies produced by a replacement operation."
guides/workspace.md type WorkspaceEventMap: guide absent source "Names the events emitted after workspace mutations complete."
guides/workspace.md interface WorkspaceOptions: guide absent source "Configures a workspace at construction."
guides/workspace.md interface WorkspaceSnapshot: guide absent source "Represents a workspace's stored state in JSON-serializable form."
guides/workspace.md interface WorkspaceStoreInterface: guide absent source "Persists workspace snapshots through an asynchronous point-access contract."
guides/workspace.md interface WorkspaceSnapshotRow: guide absent source "Represents the database row used to persist one opaque workspace snapshot."
guides/workspace.md type WorkspaceErrorCode: guide absent source "Names the machine-readable failure codes raised by the workspace edit surface."
guides/workspace.md interface WorkspaceInterface: guide absent source "Represents a mutable path-keyed editing surface over immutable file values."
guides/workspace.md interface WorkspaceManagerOptions: guide absent source "Configures a workspace registry at construction."
guides/workspace.md interface WorkspaceManagerInterface: guide absent source "Represents an insertion-ordered workspace registry with an active selection and optional durability."
guides/workspace.md const EXTENSION_LANGUAGES: guide absent source "Maps file extensions to language tags for text content. Unknown extensions intentionally fall back to `text` in `inferLanguage`."
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
guides/workspace.md pitch: readme absent tagline "The virtual file workspace for the `@orkestrel` line. A workspace is a path-keyed map of immutable files with an editing surface over it. Every edit — `write`, `prepend`, `append`, `replace`, `move` — mints a new `FileInterface` value and puts it back under its path, so a file is a value a caller can hold and compare, never a handle that changes underneath it. `Workspace` is that map; `WorkspaceManager` keeps workspaces by id with one active selection; a `WorkspaceStoreInterface` persists snapshots. Source: `src/core`. Published through `@orkestrel/workspace`. A workspace is not a filesystem. There is no disk, no `node:fs`, no watcher, no synchronization lifecycle, and no dirty-state tracking. A path is a key, not a location: `src/main.ts` and `notes.md` sit in the same flat map with no directories between them, and nothing outside the process can change what the map holds. Durability is a separate seam — `snapshot()` produces a plain JSON-serializable value and a store persists it. A store that one day wrote those snapshots to disk would be one more implementation of that interface, not a change of identity here. Anyone can drive it. An agent loop, a tool handler, and plain application code are all callers."
rows read: 1, disagreements found: 78
exit 1
```

## Facts for workspace (taken 2026-09-07T21:28Z by facts.sh)

- Checkout `/home/user/fleet/workspace`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `e308cae`, status: clean
- `package.json`: version `0.0.8`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    19: > **Anyone can drive it.** An agent loop, a tool handler, and plain application code are all
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
    110:			const members = source.methods(group.interface).map((method) => method.name)
    118:					expect(findMissing(members, documented)).toEqual([])
    121:					expect(findMissing(documented, members)).toEqual([])
    127:							: findMissing(
    128:									source.methods(entity).map((method) => method.name),
    146:				findUnexampled(
    149:					source.examples().map((example) => example.name),
    154:		for (const group of guide.methods()) {
    159:					? source.examples(group.interface).map((example) => example.name)
    163:							.concat(source.examples(entity).map((example) => example.name))
    170:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    182:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 537:## Tests — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-workspace-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/workspace.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/workspace.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

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

`/home/user/scaffold/tmp/units/d7n-workspace-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
