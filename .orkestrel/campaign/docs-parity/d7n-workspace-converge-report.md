# Report — `d7n-workspace-converge`

Wall clock: 2026-09-07T21:29:32Z to 2026-09-07T21:45:40Z.

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` after the three gate cases landed and before any guide edit:
`Test Files 1 failed (1)` / `Tests 3 failed | 37 passed (40)`.

The pin's both-sides line, verbatim:

```
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/workspace.md pairs: guide [\"Files and content\",\"Editing\",\"Reading and searching\",\"Moving, removing, and snapshots\",\"Lifecycle\",\"The registry\",\"Durability\",\"Failures\"] source []",
```

The README case, verbatim:

```
 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:123:20
    123|  expect(pitch).not.toBeUndefined()
```

The equality case, its first lines verbatim:

```
 FAIL  |guides| tests/guides.test.ts > Workspace > keeps every compared summary and example equal to its source
AssertionError: expected [ …(77) ] to deeply equal []
+   "guides/workspace.md type BinaryMIME: guide absent source \"Names the MIME labels a binary `FileContent` arm supports.\"",
+   "guides/workspace.md type FileContent: guide absent source \"Holds a file's immutable content: either text with a language tag or a base64 string with a MIME.\"",
+   "guides/workspace.md interface TextContent: guide absent source \"Holds the text arm of a file's immutable content: a body and its language tag.\"",
```

The same command after convergence: `Test Files 1 passed (1)` / `Tests 40 passed (40)`.

## Criterion 2 — headers and class rows

Every `## Surface` and `## Methods` table now heads `Summary` beside only `Kind`, `Shape`,
`Signature`, or `Returns`. No `Value` column exists here.

| Section | Baseline header | Header now |
| --- | --- | --- |
| `### Contracts` | `Name \| Kind \| Shape / Purpose` | `Name \| Kind \| Shape \| Summary` |
| `### Constants` | `Name \| Kind \| Purpose` | `Name \| Kind \| Shape \| Summary` |
| `### Errors` | `Name \| Kind \| Signature \| Behavior` | `Name \| Kind \| Signature \| Summary` |
| `### Helpers` | `Name \| Kind \| Signature \| Behavior` | `Name \| Kind \| Signature \| Summary` |
| `### Validators` | `Name \| Kind \| Signature \| Behavior` | `Name \| Kind \| Shape \| Summary` |
| `### Factories` | `Name \| Kind \| Signature \| Behavior` | `Name \| Kind \| Signature \| Summary` |
| `### Classes` | absent | `Name \| Kind \| Summary` (added) |
| `#### WorkspaceInterface` | `Method \| Returns \| Behavior` | `Method \| Returns \| Summary` |
| `#### WorkspaceManagerInterface` | `Method \| Returns \| Behavior` | `Method \| Returns \| Summary` |
| `#### WorkspaceStoreInterface` | `Method \| Returns \| Behavior` | `Method \| Returns \| Summary` |

The guide carried no `### Entities` table, so Ruling 5's rename trigger did not fire. Every class
documented under its own H3 — `Workspace`, `WorkspaceManager`, `MemoryWorkspaceStore`,
`DatabaseWorkspaceStore` — now carries a row in a `### Classes` table placed between `### Factories`
and the H3 sections, so the table's summarized rows are the ones `extractSurface` keeps.
`WorkspaceError` has no H3 section and stays in `### Errors`.

Convention sentences, each between its table's own heading and the table:

- `### Contracts` and `### Validators` carry Ruling 15's interface sentence verbatim; `### Validators`
  adds the guard sentence after it, on the same line, in interpret's and brief's form.
- `### Constants` carries the constants sentence alone.

Hand rebuild check, `git show HEAD:guides/workspace.md` against the tree left:
`rows before: 81, rows after: 85, non-Summary cells compared: 189, changed: 0, rows missing after: 0`
(`tmp/d7n-workspace-converge/cells.py`, splitting on a pipe not preceded by a backslash). The four
added rows are the `### Classes` rows.

## Criterion 3 — the blocks rewritten first, then the propagation

Rewritten by hand before any propagation, because the guide cell carried information the block
lacked or the block's sentence was false:

| Declaration | What the block gained |
| --- | --- |
| `FileContent` (`types.ts`) | the union carries no discriminant field, so a caller narrows it with a guard |
| `FileState` (`types.ts`) | `created` for the first write to a path, `modified` for every later edit |
| `FileInput` (`types.ts`) | the byte size and the line count are derived rather than supplied |
| `ReplaceResult` (`types.ts`) | the tallies named: the occurrences replaced and the files changed |
| `WorkspaceStoreInterface.get` (`types.ts`) | "by workspace id", so the row is distinct from `set` and `delete` |
| `EXTENSION_LANGUAGES` (`constants.ts`) | the table is frozen; `intentionally` dropped as an effort word |
| `WorkspaceError` (`errors.ts`) | it carries a `WorkspaceErrorCode` and, when the operation had one, the context |
| `isWorkspaceError` (`errors.ts`) | a new `@remarks`: the `instanceof` test stays total and throws on no input |
| `isBinary` (`helpers.ts`) | `Checks whether` → `Determines whether`, so the arm pair uses one term |
| `computeDecodedSize` (`helpers.ts`) | arithmetically rather than by decoding it |
| `createTextContent` (`factories.ts`) | returned as `TextContent` rather than as the whole union |
| `createBinaryContent` (`factories.ts`) | returned as `BinaryContent` rather than as the whole union |
| `createWorkspace` (`factories.ts`) | the same identity, emitter, and seed options the constructor takes |
| `createDatabaseWorkspaceStore` (`factories.ts`) | over an in-memory driver when the caller supplies none |
| `Workspace` (`Workspace.ts`) | "Mutations emit after the **registry** has changed" → "after the **file map** has changed"; the sentence borrowed `WorkspaceManager`'s product noun and was false of this class |

Rows whose literal stayed in `Shape` rather than entering a description: every `### Contracts` row
(`BinaryMIME`, `FileContent`, `TextContent`, `BinaryContent`, `FileState`, `FileInput`,
`FileInterface`, `Position`, `Range`, `ReadResult`, `SearchOptions`, `SearchMatch`, `ReplaceResult`,
`WorkspaceEventMap`, `WorkspaceOptions`, `WorkspaceSnapshot`, `WorkspaceStoreInterface`,
`WorkspaceSnapshotRow`, `WorkspaceErrorCode`, `WorkspaceInterface`, `WorkspaceManagerOptions`,
`WorkspaceManagerInterface`), the `### Constants` row `EXTENSION_LANGUAGES`
(`Readonly<Record<string, string>>`), and the `### Validators` rows `isFile` (`FileInterface`) and
`isWorkspaceSnapshot` (`WorkspaceSnapshot`).

Ruling 7 landings — facts a compared block cannot hold, moved into guide prose beside their table,
each named here:

- The readonly data members: `id`, `emitter`, and `count` on `WorkspaceInterface`, `count` and
  `active` on `WorkspaceManagerInterface`, none on `WorkspaceStoreInterface` — into the
  `### Contracts` intro paragraph, which also carries the `## Methods` pointer the three cells lost.
- The overload sets: `read`, `has`, `write`, `prepend`, `append`, `move`, and `remove` on
  `WorkspaceInterface`, and `remove` on `WorkspaceManagerInterface` — into the `## Methods` intro,
  which states that a `Summary` cell carries its member's first overload while the `Returns` cell
  spans the whole set.
- `WorkspaceEventMap`'s payload tuples: already carried by the `## Events` table; Ruling 19 puts the
  bare member names in `Shape`.
- `SearchOptions`' and `WorkspaceOptions`' defaults stayed in their existing `@remarks`; no remark
  sentence was pruned, because none repeated a description the rewrite produced.
- `TextContent`'s baseline clause "the language tag its path resolved to" was not carried across:
  `createTextContent(text, language)` takes any tag, so the clause is false of every construction.
  The `## Files and content` prose already states that a workspace write infers the tag from the path.

Propagation: `npm run docs -- --to guide` → `rows read: 1, disagreements found: 78, written: 77,
reported: 1` (the pitch, authored by hand). `npx oxfmt --config .oxfmtrc.json --write
guides/workspace.md` after it. A later one-cell correction to `createWorkspace`'s wording re-ran the
same command at `written: 1`.

## Criterion 4 — the titled pair

The pair is `createFile`'s doc block in `src/core/factories.ts` (the primary factory, the first
`create*` the facts block lists) and the `## Files and content` fence, the only fence that
constructs a file.

- Heading uniqueness, heading-scoped: `grep -n '^#\+ Files and content' guides/workspace.md` →
  one hit.
- Fence body read before titling: no three-backtick run, no doc-comment terminator. No new heading
  was needed, because the fence sits under a topic heading rather than a structural one, so Ruling 9
  did not fire and no fence moved.
- Ruling 14: the fence demonstrates `computeSize`, `countLines`, `createBinaryContent`, `createFile`,
  `createTextContent`, `inferLanguage`, `isBinary`, and `isText`; the block demonstrated `createFile`
  with `createTextContent` alone. The fence is the fuller side and already contains the block's
  demonstration, so the block was extended to it and the fence lost nothing.
- The block was titled `@example Files and content` by hand first. `npm run docs` then read
  `rows read: 1, disagreements found: 1` — the example pair alone. `npm run docs -- --to source` →
  `rows read: 1, disagreements found: 1, written: 1, reported: 0`.

Fence bodies read, and one edit inside one of them: the `## Files and content` fence's three result
comments read `via computeSize`, `via countLines`, and `via computeDecodedSize`. `via` is a banned
term and `policy/no-banned-term` reads every comment, so once the body landed inside a doc block the
lint gate would have taken it. Each was changed to `through` before `--to source` ran. No flagship
transcription in `tests/guides.test.ts` binds those comment texts; the transcription binds the values
(`note.size` 12, `note.lines` 2, `icon.size` 3) and still passes.

## Criterion 5 — the tagline, the opening prose, and the pitch

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold:

```
> The virtual file workspace for the `@orkestrel` line: a path-keyed map of immutable files with
> an editing surface over it, a registry that holds those maps by id under one active selection,
> and a snapshot store seam that persists them.
```

`README.md` carries that blockquote under its H1 with the same line breaks. `npm run docs` reads the
pair equal.

The guide's opening prose after the blockquote carries the displaced sentences and restates no
tagline clause. Sentences changed there:

- The paragraph now opens with "Every edit — `write`, `prepend`, `append`, `replace`, `move` — mints
  a new `FileInterface` value…", the sentence the blockquote gave up.
- "`Workspace` is that map; `WorkspaceManager` keeps workspaces by id with one active selection" was
  replaced by "`Workspace` is the class behind the editing surface and `WorkspaceManager` the class
  behind the registry, which gains lenient `open` and `save` whenever a store is supplied", so the
  registry's identity stays in the tagline and its leniency in the prose.
- "Source: [`src/core`](../src/core). Published through `@orkestrel/workspace`." moved out of the
  blockquote into that paragraph, taking its link with it.
- The not-a-filesystem paragraph and the anyone-can-drive-it sentence kept every sentence and lost
  their bold leads.

The README's onboarding paragraph changed to keep only what it alone carries:

- "A workspace is a path-keyed map of immutable files with an editing surface over it: write, read,
  search, replace, move, remove." → "Reach a file by its path — `write`, `read`, `search`,
  `replace`, `move`, `remove` — and every edit mints a new file value and puts it back, so a file is
  a value you can hold and compare rather than a handle that changes underneath you."
- "Around that map sit a registry of named workspaces with one active selection, and pluggable stores
  that persist plain snapshots." was dropped: the tagline states it.
- "It is not a filesystem…", "Durability is a separate seam…", and "Nothing here is model-specific.
  An agent loop, a tool handler, and plain application code are all callers." stayed as written.

`npm run test:guides` after the README edit: `Tests 40 passed (40)`.

## Criterion 6 — the seed

```
$ npm run docs                        exit 0: rows read: 1, disagreements found: 0
$ npm run docs -- --to guide          exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source         exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — gates

Owned paths are `guides/workspace.md`, `README.md`, `tests/guides.test.ts`, `src/core/types.ts`,
`src/core/constants.ts`, `src/core/errors.ts`, `src/core/helpers.ts`, `src/core/factories.ts`, and
`src/core/workspaces/Workspace.ts`.

```
$ npx oxfmt --config .oxfmtrc.json --check <the nine owned paths>                       exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings <the seven owned .ts paths>        exit 0
$ npm run check                                                                         exit 0
$ npm run test:guides       exit 0: Test Files 1 passed (1) / Tests 40 passed (40)
$ npm run test:policy       exit 0: Test Files 1 passed (1) / Tests 90 passed | 1 skipped (91)
```

Observation, not a criterion: `npm run test:src:core` exit 0,
`Test Files 7 passed (7) / Tests 141 passed (141)`, run under sibling-unit load.

## Criterion 8 — status

```
 M README.md
 M guides/workspace.md
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/core/workspaces/Workspace.ts
 M tests/guides.test.ts
```

Owned files only. `git diff --stat`: 9 files changed, 293 insertions(+), 154 deletions(-).
Instruments sit in `tmp/d7n-workspace-converge/` inside this checkout, which git ignores.

## The gate cases

`tests/guides.test.ts` outside its constants block matches the pilot byte for byte from
`const root = new URL('../', import.meta.url)` through the manifest loop's closing brace, with the
package name substituted; checked by string comparison against
`/home/user/fleet/abort/tests/guides.test.ts` after formatting, result IDENTICAL. `findDrift` is
imported beside the existing readers. `GUIDE_SPEC` is `'guides/workspace.md'` and both the pin and
the README case use it. `ROOT_FILES` is `Object.freeze(['AGENTS.md', 'README.md'])` under the pilot's
comment. The header line reads "The constants that follow are this package's own" (Ruling 13 as
amended) and the `INTERNAL` block reads "the assertion that follows it". The package's own
`describe('flagship fences')` section is unchanged and stayed appended after the loop.

## Reader and seed defects met

None. The seed and the `0.0.18` readers behaved as the brief describes at every step:

- `replaceCell` wrote 77 cells across four-column and three-column tables carrying escaped pipes in
  `Shape` and `Returns` cells, and disturbed no cell outside the written column — the hand-rebuild
  comparison reports `non-Summary cells compared: 189, changed: 0`.
- `--to source` on a tree whose summaries already agreed wrote the titled example alone
  (`written: 1`), as the brief predicted.
- The P16 comparator's terms held: `{@link import('./helpers.js').inferLanguage}` compares as
  `` `inferLanguage` ``, and no residual disagreement survived a doc-block rewrite.

## Ancillary decisions

1. **`### Validators` drops its `Signature` column when it gains `Shape`.** Ruling 20 gives a
   dedicated guard table the `Shape` column with the type each guard narrows to; the fleet's
   converged guard tables (`/home/user/fleet/brief/guides/brief.md:235`,
   `/home/user/fleet/contract/guides/contract.md:32`, `/home/user/fleet/browser/guides/browser.md:104`)
   are `key | Kind | Shape | Summary`. Keeping `Signature` beside `Shape` would spell
   `(value: unknown) => value is FileInterface` next to `FileInterface`. The two dropped cells were
   `(value: unknown) => value is FileInterface` and `(value: unknown) => value is WorkspaceSnapshot`,
   each recoverable from `Kind` and `Shape`. This is the one column the brief did not name.
2. **`WorkspaceStoreInterface`'s `Shape` cell is `get, set, delete` with no braces and no `plus`,**
   because the interface declares no data member; precedent is interpret's `GeneratorInterface` row
   (`/home/user/fleet/interpret/guides/interpret.md:129`) and its `NarratorInterface` row (`:130`).
3. **`WorkspaceEventMap` takes `{ write, remove, move, clear }`** under Ruling 19, the payload tuples
   staying in the declaration and in the `## Events` table.
4. **The `### Classes` table sits between `### Factories` and the H3 sections,** so `extractSurface`
   reaches the summarized rows before the bare H3 headings.
5. **Two voice corrections in prose I own beyond the propagated cells**: "Prepend and append are the
   two ends of the same map" → "the opposite ends of the same map" (a count), and "the moved value
   carries the new path, since a file's `path` is part of its value" → "because" (a causal `since`).
6. **Ruled permitted rather than changed**: `new` at every site means a freshly minted value rather
   than a date; `once` means one time rather than `after`; `now` in the durability fence comment
   ("the snapshot is now in the store") marks sequence position rather than calendar time. Pattern
   swept case-insensitively over `guides/workspace.md` and `README.md`; no `NOT`-style all-caps
   emphasis exists in either file.

## Deviation state

No deviation. Every acceptance criterion is closed on this tree.
