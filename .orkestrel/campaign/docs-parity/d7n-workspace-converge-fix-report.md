# Report — `d7n-workspace-converge-fix`

Every item landed and every criterion is green. Wall clock 2026-09-08T02:23:30Z to
2026-09-08T02:25:19Z, in `/home/user/fleet/workspace` from `98fc334`. Working tree left dirty and
uncommitted; the diff is retained at `/home/user/fleet/workspace/tmp/d7n-workspace-converge-fix/fix.diff.txt`
and the edit instrument at `.../edits.py` in the same directory.

Diffstat:

```text
 guides/workspace.md                         | 22 +++++++++++-----------
 src/core/workspaces/Workspace.ts            |  3 ++-
 src/core/workspaces/WorkspaceManager.ts     |  3 ++-
 tests/guides.test.ts                        |  2 +-
 tests/src/core/workspaces/Workspace.test.ts |  2 +-
 5 files changed, 17 insertions(+), 15 deletions(-)
```

## Item 1 — the class blocks' openers (W1)

`src/core/workspaces/Workspace.ts` takes the brief's sentence verbatim:

```diff
 /**
- * Provides a mutable path-keyed editing surface over immutable files.
+ * Implements `WorkspaceInterface` over one insertion-ordered path map the instance owns,
+ * projecting fresh arrays on every read.
  *
  * Whole-file edits create text files, ranged edits operate only on existing text files, and
```

`src/core/workspaces/WorkspaceManager.ts` takes the wording I decided (recorded under Ancillary
decisions), built from the guide's H3 prose at `guides/workspace.md:157-162`:

```diff
 /**
- * Provides an insertion-ordered workspace registry with an active selection.
+ * Implements `WorkspaceManagerInterface` over an insertion-ordered id map and one active id
+ * the instance owns, resolving `active` through that map on every read and holding no emitter.
  *
  * A supplied store adds lenient snapshot `open` and `save` operations. Event defaults flow into
```

Neither rewrapped line ends in a hyphenated compound, per Ruling 22.

`npm run docs -- --to guide` then carried the `### Classes` rows:

```text
wrote guides/workspace.md
rows read: 1, disagreements found: 2, written: 2, reported: 0
```

The carried rows now read:

```diff
-| `Workspace`              | class | Provides a mutable path-keyed editing surface over immutable files. Whole-file edits create text files, …
-| `WorkspaceManager`       | class | Provides an insertion-ordered workspace registry with an active selection. A supplied store adds …
+| `Workspace`              | class | Implements `WorkspaceInterface` over one insertion-ordered path map the instance owns, projecting fresh arrays on every read. Whole-file edits create text files, …
+| `WorkspaceManager`       | class | Implements `WorkspaceManagerInterface` over an insertion-ordered id map and one active id the instance owns, resolving `active` through that map on every read and holding no emitter. A supplied store adds …
```

The `### Classes` column widths were re-padded by the writer and the formatter; the surrounding
`MemoryWorkspaceStore` and `DatabaseWorkspaceStore` rows changed in padding alone.

## Item 2 — the guard table's sentence (W2, Ruling 27)

```diff
 value arriving from outside the process without throwing on a hostile property access.
 
-A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`. In a guard table a `Shape` cell holds the type the guard narrows to.
+In a guard table a `Shape` cell holds the type the guard narrows to.
 
 | Name                  | Kind     | Shape               | Summary                                               |
```

The interface sentence at `guides/workspace.md:36` is untouched.

## Item 3 — `must` (W3)

```diff
 A `WorkspaceManager` is a working set with one selection, not a global. Build one per caller, add
-the workspaces that caller must reach, and let `active` say which one is current:
+the workspaces that caller needs to reach, and let `active` say which one is current:
```

## Item 4 — the no-data-member row (W4, Ruling 27)

```diff
-| `WorkspaceStoreInterface`   | interface | `get, set, delete`         | Persists workspace snapshots through an asynchronous point-access contract. |
+| `WorkspaceStoreInterface`   | interface | `{} plus get, set, delete` | Persists workspace snapshots through an asynchronous point-access contract. |
```

## Item 5 — the doubled preposition (W5)

```diff
 // A workspace seeded with one real binary (image) File at `icon.png` (base64 'AAAA' → 3 decoded
-// bytes). Built through the public createFile / createBinaryContent, placed through the
+// bytes). Built by using the public `createFile` / `createBinaryContent`, placed through the
 // construction-time seed (the only way to seat a non-text file — the edit surface mints
```

The pair keeps `/` rather than `or`: `imageWorkspace` at
`tests/src/core/workspaces/Workspace.test.ts:26-29` calls `createFile` over
`createBinaryContent`'s result, so the sentence names a pair used together, not an alternative.

## Item 6 — the drop-in's header (W6, Ruling 21)

```diff
 // The consumer-side guides-parity drop-in: runs `@orkestrel/guide`'s checks against
 // this repo's own `guides/README.md` manifest. The constants that follow are this
-// package's own, and are the only part a sibling package changes.
+// package's own, as is the executed section that closes the file.
```

The region from `const root = ` through the manifest loop's closing brace already equalled the
pilot's, confirmed without an edit:

```text
$ diff <(sed -n '63,275p' tests/guides.test.ts) <(sed -n '47,259p' /home/user/fleet/abort/tests/guides.test.ts)
region diff exit=0
```

`tests/guides.test.ts:63` is `const root = new URL('../', import.meta.url)` and `:275` is the
manifest loop's closing brace; the pilot's counterparts are `:47` and `:259`. The first line past
that brace is each package's own executed-section comment, which Ruling 20 leaves to the package.

## Item 7 — the arm guards' signatures (W7, Ruling 27)

```diff
-| `isText`             | function | `(content: FileContent) => boolean`                  | Determines whether content is the text arm.   |
-| `isBinary`           | function | `(content: FileContent) => boolean`                  | Determines whether content is the binary arm. |
+| `isText`             | function | `(content: FileContent) => content is TextContent`   | Determines whether content is the text arm.   |
+| `isBinary`           | function | `(content: FileContent) => content is BinaryContent` | Determines whether content is the binary arm. |
```

Each matches its declaration at `src/core/helpers.ts:33` and `:48`.

## Item 8 — propagation

```text
$ npx oxfmt --config .oxfmtrc.json --write guides/workspace.md README.md tests/guides.test.ts src/core/workspaces/Workspace.ts src/core/workspaces/WorkspaceManager.ts tests/src/core/workspaces/Workspace.test.ts
Finished in 809ms on 6 files using 4 threads.

$ PATH=/opt/npm11/bin:$PATH npm run docs
rows read: 1, disagreements found: 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ PATH=/opt/npm11/bin:$PATH npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

`git status --short` after both write directions is unchanged from before them.

## Criteria

**1. PASS.**

```text
$ git status --short
 M guides/workspace.md
 M src/core/workspaces/Workspace.ts
 M src/core/workspaces/WorkspaceManager.ts
 M tests/guides.test.ts
 M tests/src/core/workspaces/Workspace.test.ts

$ git diff -U0 -- src tests/src | grep -E '^[-+]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[-+]\s*(\*|//|/\*\*)'
sweep exit=1
```

The sweep printed nothing (`grep` exit 1 is no match). Every listed path is owned; no off-limits
path appears.

**2. PASS.**

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/workspace.md README.md tests/guides.test.ts src tests/src/core/workspaces/Workspace.test.ts
All matched files use the correct format.
Finished in 726ms on 15 files using 4 threads.
oxfmt exit=0

$ npx oxlint --config .oxlintrc.json --deny-warnings tests src
oxlint exit=0

$ PATH=/opt/npm11/bin:$PATH npm run check
> @orkestrel/workspace@0.0.8 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
check exit=0
```

**3. PASS.** The `docs` readings are quoted under Item 8: `rows read: 1, disagreements found: 0`,
and `written: 0` on `--to guide` and on `--to source`.

**4. PASS.**

```text
$ grep -c '^| `Workspace` *| class *| Implements' guides/workspace.md          → 1
$ grep -c '^| `WorkspaceManager` *| class *| Implements' guides/workspace.md   → 1
$ grep -c 'In a guard table' guides/workspace.md                               → 1
$ grep -n 'In a guard table' guides/workspace.md
108:In a guard table a `Shape` cell holds the type the guard narrows to.
$ sed -n '107p' guides/workspace.md | cat -A
$
$ grep -c 'caller must reach' guides/workspace.md                              → 0
$ grep -c '{} plus get, set, delete' guides/workspace.md                       → 1
$ grep -c 'Built through the public' tests/src/core/workspaces/Workspace.test.ts → 0
$ diff <(sed -n 1,3p /home/user/fleet/abort/tests/guides.test.ts) <(sed -n 1,3p tests/guides.test.ts)
G exit=0
$ grep -c 'content is TextContent' guides/workspace.md                         → 1
```

Line 107, the line before the guard sentence, is blank.

**5. PASS.**

```text
$ PATH=/opt/npm11/bin:$PATH npm run test:guides
 Test Files  1 passed (1)
      Tests  40 passed (40)
   Duration  544ms (transform 156ms, setup 182ms, import 138ms, tests 80ms, environment 0ms)
test:guides exit=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  752ms (transform 325ms, setup 209ms, import 177ms, tests 229ms, environment 0ms)
test:policy exit=0
```

Observation — `npm run test:src:core`:

```text
 Test Files  7 passed (7)
      Tests  141 passed (141)
   Duration  881ms (transform 746ms, setup 768ms, import 352ms, tests 160ms, environment 1ms)
test:src:core exit=0
```

## Ancillary decisions

- **`WorkspaceManager`'s opener.** The brief fixed `Workspace`'s sentence and left this one to me.
  I wrote "Implements `WorkspaceManagerInterface` over an insertion-ordered id map and one active id
  the instance owns, resolving `active` through that map on every read and holding no emitter." It
  takes the pilot's shape — the interface, then the state the instance owns, then what the instance
  does with that state — and carries the three facts the audit's F1 named as sitting only in the H3
  prose: the id map plus one active id, the resolution of `active` on every read, and the absent
  emitter.
- **Backticks in the test comment.** The brief's quoted replacement backticks `createFile` and
  `createBinaryContent`; the line's neighbours at `:18` do not. I took the brief's text literally,
  which also satisfies `.claude/rules/writing.md` § Code tokens. The earlier comment at `:18` is
  outside this item and untouched.
- **`/` kept over `or`.** Reasoning recorded under Item 5.
- **The `### Workspace` and `### WorkspaceManager` H3 prose is untouched.** Item 1 scopes the class
  blocks' openers; the H3 paragraphs the facts were taken from are unchanged, so the guide states
  each fact in the row and in the prose beneath it.

## Deviation state

None. No gate outside the owned files went red, and `--to guide` cleared every disagreement it read.
