# Report — `d7n-workspace-prep`

Wall clock: 2026-09-07T21:16:11Z to 2026-09-07T21:19:46Z.

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

## Item 2 — drop-in adaptation (`tests/guides.test.ts`)

Methods loop hunk:

```diff
- const members = source.methods(group.interface)
+ const members = source.methods(group.interface).map((method) => method.name)
+ const documented = group.methods.map((method) => method.name)
  const entity = group.interface.replace(/Interface$/, '')
  ...
- expect(findMissing(members, group.methods)).toEqual([])
+ expect(findMissing(members, documented)).toEqual([])
  ...
- expect(findMissing(group.methods, members)).toEqual([])
+ expect(findMissing(documented, members)).toEqual([])
  ...
- entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+ entity === group.interface
+   ? []
+   : findMissing(
+       source.methods(entity).map((method) => method.name),
+       documented,
+     )
```

Examples-case hunk:

```diff
- expect(findUnexampled(names, fences, source.examples())).toEqual([])
+ expect(
+   findUnexampled(
+     names,
+     fences,
+     source.examples().map((example) => example.name),
+   ),
+ ).toEqual([])
```

Examples-loop hunk:

```diff
  for (const group of guide.methods()) {
    const entity = group.interface.replace(/Interface$/, '')
+   const documented = group.methods.map((method) => method.name)
+   const examples =
+     entity === group.interface
+       ? source.examples(group.interface).map((example) => example.name)
+       : source
+           .examples(group.interface)
+           .map((example) => example.name)
+           .concat(source.examples(entity).map((example) => example.name))
    describe(`${group.interface} examples`, () => {
      it('documents an example for every method', () => {
        const fences = guide
          .fences()
          .filter((fence) => fence.language === EXAMPLE_LANGUAGE)
          .map((fence) => fence.code)
-       const examples =
-         entity === group.interface
-           ? source.examples(group.interface)
-           : source.examples(group.interface).concat(source.examples(entity))
-       expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+       expect(findUnexampled(documented, fences, examples)).toEqual([])
      })
    })
  }
```

The resulting shape was checked against `/home/user/fleet/abort/tests/guides.test.ts:145-215` and matches byte for byte outside this package's constants. No other line in the suite changed.

## Item 3 — voice sites

`policy/no-malformed-summary` diagnostics (from `npx oxlint --config .oxlintrc.json --deny-warnings .` before the fix):

- `tests/setup.ts:4:1` — before: `/** One observable scenario every workspace store implementation must satisfy. */` — after: `/** Represents one observable scenario every workspace store implementation must satisfy. */`
- `tests/setup.ts:13:1` — before: ` * Build a real workspace snapshot containing text and binary files.` — after: ` * Builds a real workspace snapshot containing text and binary files.`
- `tests/setup.ts:27:1` — before: ` * The shared observable contract every workspace store satisfies, carried as data.` — after: ` * Carries the shared observable contract every workspace store satisfies, as data.`

`policy/no-banned-term` diagnostic:

- `tests/src/core/workspaces/Workspace.test.ts:23:1` — before: `// bytes). Built via the public createFile / createBinaryContent, placed through the` — after: `// bytes). Built through the public createFile / createBinaryContent, placed through the`

`npx oxlint --config .oxlintrc.json --deny-warnings .` after these four edits: exit 0.

`npm run test:policy` `prose` rule then named the sites the standing conditions predicted, each fixed by the named substitution-table row and nothing else in that file:

- `README.md:16` — before: `Nothing here is model-specific. An agent loop, a tool handler, and plain application code are all\njust callers.` — after: `...are all\ncallers.` (deleted `just`).
- `guides/workspace.md:19` — before: `> **Anyone can drive it.** An agent loop, a tool handler, and plain application code are all just\n> callers.` — after: `...are all\n> callers.` (deleted `just`).
- `guides/workspace.md:33` — before: `absent optional field is simply absent.` — after: `absent optional field is absent.` (deleted `simply`).
- `guides/workspace.md:406` — before: `the workspaces that caller should reach, and let \`active\` say which one is current:` — after: `...that caller must reach...` (`should` → `must`).
- `guides/workspace.md:475` — before: `\`open\` consults the registry first: a registered id is simply activated and returned, without` — after: `...is activated and returned, without` (deleted `simply`).

No diagnostic named a file outside scope.

## Item 4 — the bump

`package.json`: `"version": "0.0.7"` → `"version": "0.0.8"`. `package-lock.json` untouched.

## Acceptance criteria

1. `git status --short` (final):

```
 M .oxlintrc.json
 M README.md
 M configs/helpers.ts
 M configs/policy.ts
 M guides/workspace.md
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/src/core/workspaces/Workspace.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

This is the P21 repair list plus `tests/guides.test.ts` plus the item 3 files (`README.md`, `guides/workspace.md`, `tests/setup.ts`, `tests/src/core/workspaces/Workspace.test.ts`) and nothing else. `npm run format` ran once after editing and rewrote no file outside this set.

2. `npm run format:check`: exit 0 (`All matched files use the correct format.`). `npx oxlint --config .oxlintrc.json --deny-warnings .`: exit 0 (no output). `npm run check`: exit 0 (`tsc --noEmit --project tsconfig.json && npm run check:src` completed with no diagnostics).

3. `npm run test:guides`: exit 0 — `Test Files 1 passed (1)` / `Tests 37 passed (37)`. `npm run test:policy`: exit 0 — `Test Files 1 passed (1)` / `Tests 90 passed | 1 skipped (91)`. `npm run test:config`: exit 0 — `Test Files 1 passed (1)` / `Tests 172 passed | 1 skipped (173)`.

4. `npm run docs`: exit 1 (expected), `rows read: 1, disagreements found: 78`. Full worklist verbatim:

```
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
```

This is the converge unit's worklist. No other gate read red.

## Ancillary decisions

- Voice-rewrite wording for the three summaries and the `should` → `must` substitution were chosen to preserve every fact the sentence carried, per item 3's instruction; recorded above.
- The instruments this unit produced (`repair.log`, `oxlint1.log`, `oxlint2.log`, `oxlint3.log`, `policy1.log`, `format.log`, `formatcheck.log`, `check.log`, `testguides.log`, `testpolicy2.log`, `testconfig.log`, `docs.log`) sit under `tmp/d7n-workspace-prep/` inside `/home/user/fleet/workspace` and were not committed.

---

Orchestrator's annotation (2026-09-08, the audit): the audit ruled counts in this report's prose (sites, edits, summaries tallied rather than named); the per-site lists that follow each tally name every member, and the tree is authoritative.
