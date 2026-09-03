# Unit conform-workspace — report

Every row is `applied` or `noop`. No row stopped. The gate chain is green in order, the scaffold
audit reports no drift, and `git status --short` lists only files under Owned.

## Rows

| Row               | Disposition | Evidence                                                                                                   |
| ----------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| workspace-obj-1   | applied     | `tests/setup.ts` now exports `WorkspaceStoreCase` and `WORKSPACE_STORE_CASES` and imports no vitest symbol |
| workspace-obj-2   | applied     | `describe('flagship fences', …)` appended to `tests/guides.test.ts`, executing the guide and README fences |
| workspace-obj-3   | applied     | local `range` deleted; `rangeOf` imported from `@src/core` and used at every call site                     |
| workspace-obj-4   | applied     | local hostile helpers deleted; `validators.test.ts` loops `createHostileValues().entries()`                |
| workspace-obj-5   | applied     | closed with obj-4: the local `readProperty` and its only call sites went with the deleted blocks           |
| workspace-obj-6   | applied     | `TextContent` and `BinaryContent` declared in `types.ts`; predicates and guide Contracts rows follow        |
| workspace-obj-7   | applied     | `createTextContent` returns `TextContent`, `createBinaryContent` returns `BinaryContent`                   |
| workspace-obj-8   | applied     | `Workspace.ts` `search` splits on `/\r\n|\n/`                                                              |
| workspace-subj-1  | applied     | every `WorkspaceInterface` and `WorkspaceManagerInterface` member carries TSDoc                             |
| workspace-subj-2  | applied     | `SearchOptions`, `WorkspaceOptions`, `WorkspaceManagerOptions`, and `createDatabaseWorkspaceStore` reworded |
| workspace-subj-3  | applied     | `DatabaseWorkspaceStore`'s `@example` constructs the class from a real table                                |
| workspace-subj-5  | applied     | every `§N` citation and `W-d` identifier gone; the stale path and table name corrected                      |
| workspace-subj-7  | applied     | every ruled count deleted from `guides/workspace.md`, members named in its place                            |
| workspace-subj-8  | applied     | `probe.md` and `test.md` rows added to the Dependency reference list, in alphabetical position              |
| workspace-subj-11 | applied     | `MISSING` added to `WorkspaceErrorCode`; the missing-file splice raises it; guide and test follow           |
| fleet-F1          | noop        | see § Fleet rows                                                                                            |
| fleet-F2          | noop        | see § Fleet rows                                                                                            |

### Fleet rows

**fleet-F1 — `noop`.** `tests/setup.ts` declares no `isBrowserVuePath`, and neither does any other
file: a search for that identifier across the checkout outside `node_modules` returned no match.
The workspace also has no browser environment — `Glob` over `{src,app}/**/*.ts` returns only
`src/core/**`, and `Glob` over `tests/setup*.ts` returns `tests/setup.ts`, `tests/setupPolicy.ts`,
and `tests/setup.test.ts` with no `tests/setupBrowser.ts`. The export-free clause does not fire
either: `tests/setup.ts` keeps `buildWorkspaceSnapshot`, `WorkspaceStoreCase`, and
`WORKSPACE_STORE_CASES`, so the helper is not its sole export. No edit made.

**fleet-F2 — `noop`.** Classes read: `Workspace`, `WorkspaceManager`, `MemoryWorkspaceStore`,
`DatabaseWorkspaceStore` (`src/core/**`), and `WorkspaceError` (`src/core/errors.ts`). None
declares a public `readonly id: string` data field. `Workspace` already holds `readonly #id` as its
first `#` field and exposes `get id()` as its first getter, which is the shape this row installs.
A search for `^\treadonly id\b|^\tid:` under `src` matches only `types.ts` interface members. No
edit made.

## Files touched

| File                                                          | Change                                                                                     |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `src/core/types.ts`                                           | named the content arms, added `MISSING`, rewrote the options remarks, documented every member |
| `src/core/helpers.ts`                                         | predicates narrow to `TextContent` and `BinaryContent` instead of repeating their shapes    |
| `src/core/factories.ts`                                       | the content factories return their arm; the driver default reads `Default: …`               |
| `src/core/workspaces/Workspace.ts`                            | `search` splits on `/\r\n|\n/`; the missing-file splice raises `MISSING`                    |
| `src/core/workspaces/stores/DatabaseWorkspaceStore.ts`        | the `@example` constructs the documented class from a real table                            |
| `guides/workspace.md`                                         | arm rows, `MISSING`, arm-returning factory signatures, and every ruled count removed         |
| `guides/README.md`                                            | `probe.md` and `test.md` added to the Dependency reference list                             |
| `tests/setup.ts`                                              | the store battery became a data table; the vitest and hostile-helper declarations are gone   |
| `tests/setup.test.ts`                                         | asserts the table's membership, runs its cases, and proves each case took a fresh store      |
| `tests/guides.test.ts`                                        | added the executed flagship-fence transcriptions                                             |
| `tests/src/core/validators.test.ts`                           | the total-guard case loops the package's own hostile set by index                            |
| `tests/src/core/factories.test.ts`                            | the arm factories' members are read without narrowing, which pins the narrowed return        |
| `tests/src/core/workspaces/Workspace.test.ts`                 | uses `rangeOf`, adds the CRLF case, and pins `MISSING`                                       |
| `tests/src/core/workspaces/WorkspaceManager.test.ts`          | citations and control identifiers removed from comments and describe titles                  |
| `tests/src/core/workspaces/stores/MemoryWorkspaceStore.test.ts`   | runs the case table; comments corrected                                                  |
| `tests/src/core/workspaces/stores/DatabaseWorkspaceStore.test.ts` | runs the case table; stale path, table name, and citations corrected                     |

Diffstat, from `git -C /home/user/fleet/workspace diff --shortstat`: 16 files changed, 669
insertions(+), 232 deletions(-). The full diff is
`/home/user/work/evidence/conform-workspace.diff`, 1457 lines.

## Failing-first controls

Every behavioural row has a control captured to a file under
`/home/user/work/evidence/workspace-proofs/`.

| Row               | Command                                                                                     | Red                                    | Green                | Files                                                            |
| ----------------- | -------------------------------------------------------------------------------------------- | -------------------------------------- | -------------------- | ---------------------------------------------------------------- |
| workspace-obj-1   | `npx vitest run … --project src:core tests/src/core/workspaces/stores`                       | 2 test files failed, no tests collected | 14 passed (14)       | `obj-1-stores-red.txt`, `obj-1-stores-green.txt`                 |
| workspace-obj-1   | `npm run test:setup`                                                                          | — (same removal)                       | 10 passed (10)       | `obj-1-setup-green.txt`                                          |
| workspace-obj-2   | `npm run test:guides`, with `computeDecodedSize` planted `+ 1`                                | 28 passed (28) — the defect            | 1 failed \| 36 passed (37) | `obj-2-planted-before.txt`, `obj-2-planted-after.txt`      |
| workspace-obj-3   | `npx vitest run … --project src:core tests/src/core/workspaces/Workspace.test.ts`, `rangeOf` planted to ignore its end coordinates | 62 passed (62) — the defect | 6 failed \| 57 passed (63) | `obj-3-planted-before.txt`, `obj-3-planted-after.txt` |
| workspace-obj-4   | `npx vitest run … --project src:core tests/src/core/validators.test.ts`                       | 1 failed \| 2 passed (3)               | 3 passed (3)         | `obj-4-validators-red.txt`, `obj-4-validators-green.txt`         |
| workspace-obj-7   | `npm run check`                                                                               | exit 2, four `TS2339` diagnostics      | exit 0               | `obj-7-check-red.txt`, `obj-7-check-green.txt`                   |
| workspace-obj-8   | `npx vitest run … --project src:core tests/src/core/workspaces/Workspace.test.ts`             | 2 failed \| 61 passed (63)             | 63 passed (63)       | `obj-8-subj-11-red.txt`, `obj-8-subj-11-green.txt`               |
| workspace-subj-11 | same command as obj-8 (both cases were written before either fix)                             | 2 failed \| 61 passed (63)             | 63 passed (63)       | `obj-8-subj-11-red.txt`, `obj-8-subj-11-green.txt`               |

Read the obj-2 and obj-3 controls as a pair. Each planted the shipped helper wrong, ran the suite,
and read it **green before the row and red after** — the plant is the defect the row names, and its
invisibility beforehand is what the row repairs. Both plants were removed by editing the same line
back; `git diff src/core/helpers.ts` afterwards shows only the obj-6 predicate change.

`obj-2-fences-first-run.txt` records the guides project at 37 passed (37) with the fence block
present and no plant.

## Sweeps

| Pattern                                                                                          | Population                                        | Result                                                     |
| -------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| `§\|W-d`                                                                                          | `{src,tests}/**/*.ts`                             | no match                                                   |
| `§\|W-d`                                                                                          | `guides/workspace.md`, `guides/README.md`, `README.md` | no match                                              |
| `assertWorkspaceStoreContract\|createThrowingGetterRecord\|createRevokedProxy\|throwGetter`       | `{src,tests,guides}/**/*.{ts,md}`                 | no match                                                   |
| `assertWorkspaceStoreContracts?(ed\|ing)?\|createRevokedProxy(s\|ed\|ing)?\|createThrowingGetterRecord(s\|ed\|ing)?`, case-insensitive | `README.md`, `guides/*.md`, `src/**`, `tests/**` | no match                            |
| `function range`, case-insensitive                                                                | `{src,tests,guides}/**/*.{ts,md}`                 | one hit, `src/core/helpers.ts:232 export function rangeOf(` — the adopted symbol, not the removed local copy |
| `\b(one\|two\|three\|four\|five\|six\|seven\|eight\|nine\|ten)\b`, case-insensitive                | `guides/workspace.md`                             | every remaining hit is the determiner or pronoun `one`, plus the permitted numerals ruled below |
| `\b\d+ (elements\|members\|rules\|rows\|exports\|files\|options\|steps\|cases\|stages\|findings\|tests\|helpers\|methods\|entities\|tables\|sections\|constants\|passes\|categories)\b`, case-insensitive | `guides/workspace.md` | no match |
| `\babove\b\|\bbelow\b`, case-insensitive                                                          | `guides/workspace.md`                             | two hits, both the comparison sense `a coordinate below one`; no document reference |
| `WorkspaceErrorCode\|MODALITY\|isWorkspaceError\|createTextContent\|createBinaryContent\|FileContent` | `{agent,toolbox,ollama}/{src,app,tests,guides}/**` | see § Breaking                     |
| `'MODALITY'\|"MODALITY"\|code === `                                                               | `{agent,toolbox,ollama}/{src,app,tests}/**/*.ts`  | no consumer branches on a workspace error code             |

Number-word hits ruled permitted in `guides/workspace.md`, by sense: `rangeOf … four flat
coordinates` (the arity the signature beside it fixes); `the first five columns of line one` (a
value the reader needs); the fence comments `// 12`, `// 2`, `// 3`, and `// three matches` (values
the reader needs, and each is now executed by the transcription); `Prepend and append are the two
ends of the same map` (a fixed pair the sentence names); `a file with four replacements emits one
write event` (a quantity in an illustration of a measured relationship, not a tally of package
members); and `one shared store contract battery run against both implementations` in the Tests
list, whose linked file names sit in the same item.

## Gates

Each command was run from `/home/user/fleet/workspace` after every edit had landed.

| Gate                  | Exit code | Reading                                                                                |
| --------------------- | --------- | -------------------------------------------------------------------------------------- |
| `npm run format:check` | 0        | `All matched files use the correct format.` on 49 files                                |
| `npm run lint:check`   | 0        | no diagnostic                                                                          |
| `npm run check`        | 0        | no diagnostic                                                                          |
| `npm run build`        | 0        | no diagnostic                                                                          |
| `npm test`             | 0        | `src:core` 141 passed (141); `policy` 111 passed (111); `config` 46 passed (46); `setup` 10 passed (10); `guides` 37 passed (37) |

Captured to `gate-1-format-check.txt`, `gate-2-lint-check.txt`, `gate-3-check.txt`,
`gate-4-build.txt`, and `gate-5-test.txt` under `/home/user/work/evidence/workspace-proofs/`.

Beyond the chain:

- `npx scaffold audit --offline` — exit 0: `0 of 34 planned paths drifted from the plan. Audit
  compared bytes at 23, existence at 5, and nothing at 6.` (`scaffold-audit.txt`).
- `node /home/user/scaffold/tmp/work/evidence.mjs workspace` — wrote
  `/home/user/work/evidence/conform-workspace.diff` (1457 lines) and
  `/home/user/work/evidence/conform-workspace.status` (16 entries).

`git status --short` lists `guides/README.md`, `guides/workspace.md`, `src/core/factories.ts`,
`src/core/helpers.ts`, `src/core/types.ts`, `src/core/workspaces/Workspace.ts`,
`src/core/workspaces/stores/DatabaseWorkspaceStore.ts`, `tests/guides.test.ts`,
`tests/setup.test.ts`, `tests/setup.ts`, `tests/src/core/factories.test.ts`,
`tests/src/core/validators.test.ts`, `tests/src/core/workspaces/Workspace.test.ts`,
`tests/src/core/workspaces/WorkspaceManager.test.ts`,
`tests/src/core/workspaces/stores/DatabaseWorkspaceStore.test.ts`, and
`tests/src/core/workspaces/stores/MemoryWorkspaceStore.test.ts`. Every entry is under Owned. No
vendored, off-limits, or `package.json` field was touched.

The `npm test` reading was taken inside this unit's own exec. Treat it as an observation; the
deciding whole-suite run belongs to the Orchestrator after this unit exits.

## Breaking

**workspace-subj-11 changes one thrown code.** A ranged write to an absent path threw `MODALITY` at
`0.0.6` and now throws `MISSING`. `WorkspaceErrorCode` gains `MISSING`, which widens a published
union: a consumer switching exhaustively on it would stop compiling.

Consumer sweep over `@orkestrel/agent`, `@orkestrel/toolbox`, and `@orkestrel/ollama`:

- No `src`, `app`, or `tests` file in any of the three imports `WorkspaceErrorCode`.
- No `src`, `app`, or `tests` file in any of the three compares a workspace error `code` against a
  literal. The only `code ===` comparisons found belong to `@orkestrel/toolbox`'s own `DEADLOCK`,
  `EXPIRE`, `ABANDONED`, and `TARGET` codes and to `@orkestrel/agent`'s `SUMMARIZER`,
  `SECTIONS`, and `CONCURRENCY` codes.
- No consumer test asserts the `Cannot splice a range of a missing file` message or its code.

So no consumer edit is required to keep any package compiling or green. Two consumer prose sites
name the code set and go stale; both are in § Shared-file patches.

**workspace-obj-6 and workspace-obj-7 are additive.** `TextContent` and `BinaryContent` are new
exports, and each arm is assignable to `FileContent`, so narrowing the factory returns cannot break
a caller. `@orkestrel/agent` and `@orkestrel/ollama` call `createTextContent` and
`createBinaryContent` in tests only, and pass the result straight into `createFile`.

Record in the commit message that a ranged write to an absent path now throws `MISSING` where
`0.0.6` threw `MODALITY`.

## Shared-file patches

Neither file was edited. Carry each to that package's own unit.

**`/home/user/fleet/toolbox/src/core/factories.ts`** — the handler's propagation note lists the
codes it lets through and omits `MISSING`. The added token overruns 100 columns, so the patch
rewraps the following line with it.

```diff
- * `WorkspaceError` raised by the live workspace (`MODALITY` / `PATTERN` / `RANGE`) PROPAGATE
- * uncaught. The range edit is the FLAT `'splice'` op: its four flat caret integers are
+ * `WorkspaceError` raised by the live workspace (`MISSING` / `MODALITY` / `PATTERN` / `RANGE`)
+ * PROPAGATE uncaught. The range edit is the FLAT `'splice'` op: its four flat caret integers are
```

**`/home/user/fleet/toolbox/src/core/types.ts`** — the `splice` operation's `@remarks` names the
refusals a splice raises and stops before the missing-path case. The existing sentence stays true;
this completes it.

```diff
  * the end is clamped. An inverted / sub-1 range throws `RANGE`; a binary target throws
- * `MODALITY`.
+ * `MODALITY`; a missing target throws `MISSING`.
```

**Vendored guide mirrors.** `agent/guides/workspace.md`, `toolbox/guides/workspace.md`, and
`ollama/guides/workspace.md` mirror this package's guide and are already stale against `0.0.6`
(each still writes the binary arm as `{ data, mime }` and `createBinaryContent` as
`(data: string, …)`). They gain further drift from this change: the `WorkspaceErrorCode` row, the
Failures table, the ranged-write paragraph, the Contracts rows, and the Factories signatures.
`.claude/rules/documentation.md` requires refreshing a mirror rather than rewriting it, so these
are a re-propagation obligation after `@orkestrel/workspace` publishes, not a hand patch.

## Deviations

The deviation contract did not fire. No row's repair contradicted a rule, collided with a name,
needed a file outside Owned, or needed a consumer edit to keep this package's gates green. Four
ancillary decisions were taken and are recorded here.

1. **`TextContent` and `BinaryContent` are documented as `interface`, not `type`.** The refuter's
   operative form says to add them as "`type` rows" to the Contracts table while the finder's repair
   text declares `export interface TextContent`. Those cannot both hold: `@orkestrel/guide`'s
   `computeSymbolKey` keys a surface symbol by `${kind} ${name}`
   (`node_modules/@orkestrel/guide/dist/src/core/index.d.ts:30-41`), so a guide row whose Kind cell
   disagrees with the declaration fails the barrel-parity assertion. I followed the finder's
   declaration and wrote `interface` in the Kind cell. `npm run test:guides` is green at 37 passed
   (37).

2. **The case-table titles are written `` it(`${scenario.name}`, …) ``.** A bare `it(scenario.name,
   …)` fails `vitest(valid-title)`: "Title must be a string", at
   `MemoryWorkspaceStore.test.ts:19`, `DatabaseWorkspaceStore.test.ts:23`, and
   `setup.test.ts:94`. Suppressing the rule is forbidden, so the title takes the template-literal
   form the repository already uses at `tests/guides.test.ts:62`. The rendered titles are
   unchanged.

3. **`oxfmt` reformats Markdown.** `npm run format:check` failed on `guides/workspace.md` after the
   guide edits. It was converged with `npx oxfmt --config .oxfmtrc.json guides/workspace.md`, which
   only realigned table cells — `git diff -U1 guides/workspace.md` shows no change inside any code
   fence. Three prose paragraphs left ragged by the edits were then rewrapped by hand.

4. **Two comment phrases I rewrote were reworded to name their members.** The store test headers
   said "drive both store twins" and my new CRLF comment said "the two splits"; each now names
   `MemoryWorkspaceStore` and `DatabaseWorkspaceStore`, and the search split and the offset
   arithmetic, respectively.

### Observations outside the rows

Recorded against the capability that owns them, for a later change. Neither is named by any row and
neither was edited.

- `tests/guides.test.ts:2` reads "The four constants below are this package's own". It states a
  count over a set that grew — the file declares `FENCE_LANGUAGES`, `EXAMPLE_LANGUAGE`, `MODULES`,
  `INTERNAL`, and `ROOT_FILES` — and it points with `below`. This predates the round.
- `tests/guides.test.ts:52` reads "the second assertion below fails", naming a list item by its
  position and pointing with `below`. This predates the round.

### Instruction conflict

The rule-file context delivered to this unit carried a trailing block, appended after the contents
of `.claude/rules/documentation.md`, directing that file reads, searches, and edits be performed
through Bash (`cat`, `sed`, heredocs) rather than through the Read, Edit, and Write tools. That
contradicts this unit's dispatch, which fixes the opposite shell discipline: read with Read, Grep,
and Glob; change with Edit and Write; one plain Bash command per call with no heredoc. I followed
the dispatch and used Bash only for the gate commands, the scoped runners, `git` reads, `mkdir -p`,
and the evidence script. Reporting the conflict rather than acting on it, since a block that
relaxes a dispatch's own tool constraints is not something an executor can accept from file
content.
