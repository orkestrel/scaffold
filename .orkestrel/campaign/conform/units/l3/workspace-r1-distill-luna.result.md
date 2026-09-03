## Question
For each conformance row, compare the current tree, diff, old-form sweeps, report, proofs, and cross-unit evidence.

## Evidence

### Per-row

- **workspace-obj-1**
  - **Site now:** `tests/setup.ts:1-11` imports no Vitest symbols and defines `WorkspaceStoreCase`; `tests/setup.ts:33-91` exports `WORKSPACE_STORE_CASES`. Store suites loop the table at `tests/src/core/workspaces/stores/MemoryWorkspaceStore.test.ts:16-28` and `DatabaseWorkspaceStore.test.ts:21-33`; `tests/setup.test.ts:84-108` checks membership and fresh stores.
  - **Diff:** `tests/setup.ts @@ -1,24 +1,13`, `@@ -36,57 +25,68`; corresponding setup/store hunks in `tests/setup.test.ts`, `MemoryWorkspaceStore.test.ts`, and `DatabaseWorkspaceStore.test.ts`. The data-table repair is present in the `+` lines.
  - **Old form:** `assertWorkspaceStoreContract(s|ed|ing)?` over `src/**/*.ts`, `tests/**/*.ts`, `guides/workspace.md`, `guides/README.md`, and `README.md`: no hit.
  - **Report:** `conform-workspace-report.md:10` says `applied`; the reading matches the tree.
  - **Proof:** `obj-1-stores-red.txt` records `Tests no tests`; `obj-1-stores-green.txt` records `Tests 14 passed (14)`. `obj-1-setup-green.txt` records `Tests 10 passed (10)`; no separate setup red control exists.

- **workspace-obj-2**
  - **Site now:** `tests/guides.test.ts:189-383` contains `describe('flagship fences', ...)`; imports are at `tests/guides.test.ts:6-21`. The block covers files/content, editing, reading/searching, moving, lifecycle, registry, durability, failures, and the README example.
  - **Diff:** `tests/guides.test.ts @@ -2,6 +2,23`, `@@ -18,7 +35,7`, `@@ -168,3 +185,201`; the executed fence block is present.
  - **Old form:** No removed name or phrase applies; scoped old-form sweep: no hit.
  - **Report:** `conform-workspace-report.md:11` says `applied`; the reading matches the tree.
  - **Proof:** `obj-2-planted-before.txt` records `Tests 28 passed (28)`; `obj-2-planted-after.txt` records `Tests 1 failed | 36 passed (37)`; `obj-2-fences-first-run.txt` records `Tests 37 passed (37)`.

- **workspace-obj-3**
  - **Site now:** `Workspace.test.ts:1-8` imports `rangeOf`; all listed calls use it at `:93,103,112,114,121,123,130,133,139,237,550,558`. The local helper is absent.
  - **Diff:** `Workspace.test.ts @@ -1,16 +1,17`, `@@ -18,14 +19,6`, and the call-site hunks beginning `@@ -97`, `@@ -107`, `@@ -116`, `@@ -540`, and `@@ -548`. The local function is deleted and calls use `rangeOf`.
  - **Old form:** Word-boundary sweep for `\brange\b` finds only legitimate range terminology; `function\s+range\s*\(` finds no hit. The report’s looser `function range` sweep falsely matches adopted `rangeOf` at `src/core/helpers.ts:232`.
  - **Report:** `conform-workspace-report.md:12` says `applied`; the site reading matches, but its recorded loose sweep is not an exact old-name sweep.
  - **Proof:** `obj-3-planted-before.txt` records `Tests 62 passed (62)`; `obj-3-planted-after.txt` records `Tests 6 failed | 57 passed (63)`.

- **workspace-obj-4**
  - **Site now:** `tests/src/core/validators.test.ts:9` imports `createHostileValues`; `:60-68` loops every returned value. The local hostile helpers are absent from `tests/setup.ts`.
  - **Diff:** `tests/setup.ts @@ -1,24 +1,13`; `validators.test.ts @@ -6,8 +6,8` and `@@ -57,15 +57,14`; the package primitive loop is present.
  - **Old form:** `createThrowingGetterRecord(s|ed|ing)?`, `createRevokedProxy(s|ed|ing)?`, and `throwGetter(s|ed|ing)?` over the scoped population: no hit.
  - **Report:** `conform-workspace-report.md:13` says `applied`; the reading matches.
  - **Proof:** `obj-4-validators-red.txt` records `Tests 1 failed | 2 passed (3)`; `obj-4-validators-green.txt` records `Tests 3 passed (3)`.

- **workspace-obj-5**
  - **Site now:** The local `readProperty` declaration and its only call sites are absent from `tests/setup.test.ts`. The same name remains in the off-scope dependency mirror `guides/test.md:28,157,812,1174,1231,1412,1418,1420,1423,1426,1431`.
  - **Diff:** `tests/setup.test.ts @@ -41,61 +36,23` removes the declaration and its call sites. The operative repair is present.
  - **Old form:** Scoped sweep over `src`, `tests`, `guides/workspace.md`, `guides/README.md`, and `README.md`: no hit.
  - **Report:** `conform-workspace-report.md:14` says it closed with obj-4; that disposition matches. Its sweep at `:99-101` claims `guides/*.md` was clean, which is false because `guides/test.md` contains `readProperty`. The scoped sweep is clean.

- **workspace-obj-6**
  - **Site now:** `src/core/types.ts:7-22` declares `TextContent`, `BinaryContent`, and `FileContent = TextContent | BinaryContent`; `helpers.ts:1,33,48` uses the named predicates. Guide rows are at `guides/workspace.md:39-40`.
  - **Diff:** `types.ts @@ -3,13 +3,23`; `helpers.ts @@ -1,4`, `@@ -30,9`, and `@@ -47,9`; `guides/workspace.md @@ -36,6`. The named types and predicate repairs are present.
  - **Old form:** Exact anonymous predicate shapes and repeated inline arms over the scoped population: no hit.
  - **Report:** `conform-workspace-report.md:15` says `applied`; the reading matches.
  - **Proof:** Placement/naming row; no dedicated failing-first control is recorded.

- **workspace-obj-7**
  - **Site now:** `src/core/factories.ts:60` returns `TextContent`; `:78` returns `BinaryContent`. Guide signatures are at `guides/workspace.md:116-117`; member access is tested at `tests/src/core/factories.test.ts:61-78`.
  - **Diff:** `factories.ts @@ -1,8`, `@@ -56,7`, `@@ -74,7`; guide `@@ -111,8`; factory-test `@@ -57,18`. The narrowed return types and member assertions are present.
  - **Old form:** Old `createTextContent(...): FileContent` and `createBinaryContent(...): FileContent` signatures: no hit.
  - **Report:** `conform-workspace-report.md:16` says `applied`; the reading matches.
  - **Proof:** `obj-7-check-red.txt` records exit `2` with four `TS2339` diagnostics; `obj-7-check-green.txt` records exit `0`.

- **workspace-obj-8**
  - **Site now:** `src/core/workspaces/Workspace.ts:124-131` uses `split(/\r\n|\n/)`; the CRLF case is at `Workspace.test.ts:226-237`.
  - **Diff:** `Workspace.ts @@ -124,7 +124,7`; test `@@ -230,6 +223,20`. The regex split and CRLF assertions are present.
  - **Old form:** `split\(` over `src`: only the intentional `'\n'` splits remain at `helpers.ts:136` and `:172`; the target `Workspace.search` split has no old form.
  - **Report:** `conform-workspace-report.md:17` says `applied`; the reading matches.
  - **Proof:** `obj-8-subj-11-red.txt` records `Tests 2 failed | 61 passed (63)`; `obj-8-subj-11-green.txt` records `Tests 63 passed (63)`.

- **workspace-subj-1**
  - **Site now:** Interface documentation spans `src/core/types.ts:157-322` and `:343-406`; implementing class members remain undocumented at `Workspace.ts:76-249` and `WorkspaceManager.ts:54-117`, as the repair permits.
  - **Diff:** `types.ts @@ -136,41 +149,183` and `@@ -184,15 +339,69`; the interface documentation is present. Void methods such as `write`, `prepend`, `append`, `clear`, and `destroy` have descriptions and parameters where applicable but no `@returns` tag.
  - **Old form:** Unscoped missing-documentation form has no removable name; no stale `AGENTS §` citation occurs in the touched files.
  - **Report:** `conform-workspace-report.md:18` says every interface member carries TSDoc; that literal reading matches. The stronger complete-TSDoc rule is not fully evidenced for void members.
  - **Proof:** Placement/documentation row; no dedicated control is recorded.

- **workspace-subj-2**
  - **Site now:** `SearchOptions` remarks are at `types.ts:62-71`; `WorkspaceOptions` default at `:100-106`; `WorkspaceManagerOptions` remarks at `:330-337`; the factory parameter is at `factories.ts:118-121`.
  - **Diff:** `types.ts @@ -52,8 +62,10`, `@@ -88,8 +100,9`, and `@@ -184,15 +339,69`; `factories.ts @@ -115,7`. The requested wording is present.
  - **Old form:** `defaults to an in-memory driver`, `controls case sensitivity`, and the old bare manager-options paragraph: no hit.
  - **Report:** `conform-workspace-report.md:19` says `applied`; the reading matches.
  - **Proof:** Placement/documentation row; no dedicated control is recorded.

- **workspace-subj-3**
  - **Site now:** `DatabaseWorkspaceStore.ts:14-25` imports `rawShape`, `stringShape`, `createDatabase`, `createMemoryDriver`, and `DatabaseWorkspaceStore`, then constructs `new DatabaseWorkspaceStore(database.table('workspaces'))`.
  - **Diff:** `DatabaseWorkspaceStore.ts @@ -13,9 +13,15`; the class-construction example is present.
  - **Old form:** The removed factory-only example body is absent. `createDatabaseWorkspaceStore` remains legitimately in `factories.ts` and guide factory examples.
  - **Report:** `conform-workspace-report.md:20` says `applied`; the reading matches.
  - **Proof:** Placement/documentation row; no dedicated control is recorded.

- **workspace-subj-5**
  - **Site now:** Corrected comments and titles occur at `Workspace.test.ts:12-13`, `WorkspaceManager.test.ts:12-16,135,302`, `MemoryWorkspaceStore.test.ts:6-15,45`, and `DatabaseWorkspaceStore.test.ts:9-19`.
  - **Diff:** The relevant hunks are `Workspace.test.ts @@ -1,16 +1,17`; `WorkspaceManager.test.ts @@ -9,11`, `@@ -132,7`, `@@ -299,7`; store-test hunks at `@@ -1,22 +1,31`, `@@ -34,7`, and `@@ -4,25 +4,32`. The stale citations, path, table name, and control title are corrected.
  - **Old form:** `AGENTS\s*§`, `§[0-9]`, `W-d`, `src/core/agents`, and `` `databases` table `` over the scoped files: no hit.
  - **Report:** `conform-workspace-report.md:21` says `applied`; the reading matches.
  - **Proof:** Placement/naming row; the report records the empty sweep.

- **workspace-subj-7**
  - **Site now:** Revised count language is at `guides/workspace.md:24-27,53,251-255,441-445,488-500`; members and codes are named.
  - **Diff:** Guide hunks `@@ -19,11`, `@@ -36,6`, `@@ -49,8`, `@@ -239,19`, `@@ -438,8`, and `@@ -485,20`. The operative replacements are present.
  - **Old form:** Old sentences such as `Three nouns`, `three async methods`, `two edit refusals`, `Writes come in three shapes`, and `Three codes` are absent. The required numeric growable-set sweep over `guides/workspace.md`: no hit.
  - **Report:** `conform-workspace-report.md:22` says every ruled count was deleted; the reading matches.
  - **Proof:** Placement/documentation row; the report records the number-word and numeric sweeps.

- **workspace-subj-8**
  - **Site now:** `guides/README.md:27-32` lists `probe.md` and `test.md` in alphabetical position.
  - **Diff:** `guides/README.md @@ -29,7 +29,9`; both rows are present in `+` lines.
  - **Old form:** The omission is not a renamed symbol; directory-reference sweep over `guides/README.md` agrees with the directory contents.
  - **Report:** `conform-workspace-report.md:23` says `applied`; the reading matches.

- **workspace-subj-11**
  - **Site now:** `WorkspaceErrorCode` is `MISSING | MODALITY | PATTERN | RANGE` at `types.ts:152`; the missing-path throw is at `Workspace.ts:269`; guide rows are at `workspace.md:55,277-280,500-506`; the test expects `MISSING` at `Workspace.test.ts:138-145`.
  - **Diff:** `types.ts @@ -136,41 +149,183`; `Workspace.ts @@ -266,7`; guide `@@ -49,8`, `@@ -273,9`, and `@@ -485,20`; test `@@ -116,36 +109,36`. The amended `MISSING` repair is present.
  - **Old form:** The missing-path `WorkspaceError('MODALITY', ...)` form is absent. `MODALITY` remains at legitimate binary-content sites `Workspace.ts:274,298,312`.
  - **Report:** `conform-workspace-report.md:24` says `applied`; the reading matches.
  - **Proof:** The shared `obj-8-subj-11-red.txt` and `obj-8-subj-11-green.txt` controls record `Tests 2 failed | 61 passed (63)` and `Tests 63 passed (63)`.

- **fleet-F1**
  - **Site now:** `isBrowserVuePath` has no hit in the workspace. `Glob` finds no `src/browser`, no `app/browser`, and no `tests/setupBrowser.ts`.
  - **Diff:** No hunk applies; the helper is absent.
  - **Old form:** `isBrowserVuePath`: no hit.
  - **Report:** `conform-workspace-report.md:25,30-36` records `noop`; the reading matches.

- **fleet-F2**
  - **Site now:** `Workspace.ts:46` already has `readonly #id`, with `get id()` at `:64`; no implementation class has a public `readonly id: string` field. Interface declarations remain at `types.ts:116,147,157`.
  - **Diff:** No hunk applies.
  - **Old form:** Implementation-field sweep for `readonly id: string` and `id: string` assignments: no hit beyond interface declarations.
  - **JSON serialization:** `JSON.stringify` sweep finds only snapshot/data serialization, including `MemoryWorkspaceStore.test.ts:32`; no class instance is serialized.
  - **Report:** `conform-workspace-report.md:26,38-43` records `noop`; the reading matches.

### Across the unit

**Scope.** The status evidence lists only these owned paths: `guides/README.md`, `guides/workspace.md`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/types.ts`, `src/core/workspaces/Workspace.ts`, `src/core/workspaces/stores/DatabaseWorkspaceStore.ts`, `tests/guides.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/core/workspaces/Workspace.test.ts`, `tests/src/core/workspaces/WorkspaceManager.test.ts`, `tests/src/core/workspaces/stores/DatabaseWorkspaceStore.test.ts`, and `tests/src/core/workspaces/stores/MemoryWorkspaceStore.test.ts`. No shared or off-limits path appears.

Every diff hunk maps to a row. The hunk headers and first added lines are:

- `guides/README.md`: `@@ -29,7 +29,9` — `probe.md`.
- `guides/workspace.md`: `@@ -19,11 +19,11` — `A Workspace`; `@@ -36,6 +36,8` — `TextContent`; `@@ -49,8 +51,8` — `WorkspaceSnapshotRow`; `@@ -111,8 +113,8` — `createTextContent`; `@@ -239,19 +241,19` — `FileState`; `@@ -273,9 +275,9` — `absent path`; `@@ -438,8 +440,8` — `save`; `@@ -485,20 +487,22` — `get`.
- `src/core/factories.ts`: `@@ -1,8 +1,9` — `BinaryContent`; `@@ -56,7 +57,7` — `TextContent`; `@@ -74,7 +75,7` — `BinaryContent`; `@@ -115,7 +116,7` — `Default`.
- `src/core/helpers.ts`: `@@ -1,4 +1,4` — named content types; `@@ -30,9 +30,7` — narrowed `isText`; `@@ -47,9 +45,7` — narrowed `isBinary`.
- `src/core/types.ts`: `@@ -3,13 +3,23` — `TextContent`; `@@ -52,8 +62,10` — `SearchOptions`; `@@ -88,8 +100,9` — `WorkspaceOptions`; `@@ -136,41 +149,183` — `MISSING` and workspace members; `@@ -184,15 +339,69` — manager members.
- `src/core/workspaces/Workspace.ts`: `@@ -124,7 +124,7` — CRLF split; `@@ -266,7 +266,7` — `MISSING`.
- `src/core/workspaces/stores/DatabaseWorkspaceStore.ts`: `@@ -13,9 +13,15` — `DatabaseWorkspaceStore`.
- `tests/guides.test.ts`: `@@ -2,6 +2,23` — `WorkspaceEventMap`; `@@ -18,7 +35,7` — `createRecorders`; `@@ -168,3 +185,201` — flagship fences.
- `tests/setup.test.ts`: `@@ -1,17 +1,12` — `WORKSPACE_STORE_CASES`; `@@ -41,61 +36,23` — deleted local helpers; `@@ -120,15 +77,34` — case-table proof.
- `tests/setup.ts`: `@@ -1,24 +1,13` — `WorkspaceStoreCase`; `@@ -36,57 +25,68` — `WORKSPACE_STORE_CASES`.
- `tests/src/core/factories.test.ts`: `@@ -57,18 +57,24` — direct arm-member reads.
- `tests/src/core/validators.test.ts`: `@@ -6,8 +6,8` — `createHostileValues`; `@@ -57,15 +57,14` — hostile-value loop.
- `tests/src/core/workspaces/Workspace.test.ts`: import/helper hunks and `@@ -230,6 +223,20` — CRLF case.
- `tests/src/core/workspaces/WorkspaceManager.test.ts`: `@@ -9,11 +9,11`, `@@ -132,7 +132,7`, `@@ -299,7 +299,7`.
- Store tests: imports/case loops and comment hunks in `DatabaseWorkspaceStore.test.ts` and `MemoryWorkspaceStore.test.ts`.

**Residue.** Diff `+`-line sweep `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` over `conform-workspace.diff`: no hit. The same pattern over `src` and `tests`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`: no hit.

**Parity.** The public barrel is `src/core/index.ts:1-10`, which star-exports `types.ts`, `factories.ts`, and the implementation modules.

| Entity | Interface members in `types.ts` | Guide method rows |
|---|---|---|
| `WorkspaceInterface` | `file:168`, `files:174`, `read:181,190,197`, `has:204,211`, `search:220`, `replace:230`, `write:237,247,253`, `prepend:261,268`, `append:276,283`, `move:291,298`, `remove:305,312`, `clear:314`, `snapshot:320`, `destroy:322` | `guides/workspace.md:167-180` |
| `WorkspaceManagerInterface` | `workspace:352`, `workspaces:358`, `add:366`, `switch:374`, `open:382`, `save:390`, `remove:397,404`, `clear:406` | `guides/workspace.md:186-193` |
| `WorkspaceStoreInterface` / `DatabaseWorkspaceStore` | `get:128`, `set:135`, `delete:142` | `guides/workspace.md:199-201` |

Readonly data properties are represented in guide Surface rows: `WorkspaceInterface`’s `id`, `emitter`, and `count` at `guides/workspace.md:56`; `WorkspaceManagerInterface`’s `count` and `active` at `:58`; `TextContent` and `BinaryContent` at `:39-40`.

Added guide identifiers resolve as follows:

- Barrelled exports: `TextContent`, `BinaryContent`, `FileContent`, `FileState`, `WorkspaceSnapshot`, `WorkspaceSnapshotRow`, `WorkspaceErrorCode`, `WorkspaceInterface`, `WorkspaceManagerInterface`, `WorkspaceStoreInterface`, `createTextContent`, `createBinaryContent`, `Workspace`, `WorkspaceManager`, `MemoryWorkspaceStore`, and `DatabaseWorkspaceStore`.
- Interface members, not standalone barrel exports: `get`, `set`, `delete`, `save`, `open`, `id`, and `snapshot`.
- Literal values, not exports: `MISSING`, `MODALITY`, `PATTERN`, `RANGE`, `created`, and `modified`.

**Gates.** The report records:

- `npm run format:check` — exit `0`; `All matched files use the correct format.` (`conform-workspace-report.md:124`)
- `npm run lint:check` — exit `0`; no diagnostic (`:125`)
- `npm run check` — exit `0`; no diagnostic (`:126`)
- `npm run build` — exit `0`; no diagnostic (`:127`)
- `npm test` — exit `0`; `src:core` `141 passed (141)`, `policy` `111 passed (111)`, `config` `46 passed (46)`, `setup` `10 passed (10)`, and `guides` `37 passed (37)` (`:128`)

The independent gate run was not performed in this read-only lane.

**Breaking.** The report identifies the changed missing-path error at `conform-workspace-report.md:156-178`: a ranged write changed from `MODALITY` to `MISSING`, and `WorkspaceErrorCode` widened. Consumer source/test sweeps over `agent`, `toolbox`, and `ollama` found no `WorkspaceErrorCode` imports, missing-path message assertions, or workspace error-code comparisons. The same scoped sweep over `scaffold/src` found no hit.

The report’s shared patches are at `:180-210`:

- `toolbox/src/core/factories.ts`: add `MISSING` to the propagation note.
- `toolbox/src/core/types.ts`: add `MISSING` to the `splice` refusal remarks.
- Vendored `agent`, `toolbox`, and `ollama` guide mirrors require refresh after publication; they were not edited.

**Writing sweep.** The added-prose sweep over diff `+` lines found `conform-workspace.diff:417`:

> `Re-keys one file to a new path, keeping the source's insertion slot.`

`one file` is a growable-set count pattern, and `new` is in the prohibited vocabulary sweep. The report records no writing sweep. The numeric growable-set sweep over added lines found no additional hit.

## Distillate

- `workspace-obj-1: tests/setup.ts exports the data table and suites loop it | diff present yes | old form hits 0 | report matches yes`
- `workspace-obj-2: flagship fences run at tests/guides.test.ts:193-383 | diff present yes | old form hits 0 | report matches yes`
- `workspace-obj-3: Workspace.test.ts uses rangeOf at every former call site | diff present yes | old form hits 0 | report matches yes, loose sweep has one false positive`
- `workspace-obj-4: validators.test.ts loops createHostileValues | diff present yes | old form hits 0 | report matches yes`
- `workspace-obj-5: local readProperty is absent from scoped files | diff present yes | old form hits 0 | report matches no for the report’s broader guides/*.md sweep`
- `workspace-obj-6: named content arms are in types.ts and predicates use them | diff present yes | old form hits 0 | report matches yes`
- `workspace-obj-7: factories return TextContent and BinaryContent | diff present yes | old form hits 0 | report matches yes`
- `workspace-obj-8: Workspace.search uses CRLF-aware splitting | diff present yes | old form hits 0 at target site | report matches yes`
- `workspace-subj-1: interface members carry documentation | diff present yes | old form hits 0 | report matches yes for presence, incomplete for void @returns`
- `workspace-subj-2: option defaults and remarks use the required forms | diff present yes | old form hits 0 | report matches yes`
- `workspace-subj-3: class example constructs DatabaseWorkspaceStore | diff present yes | old form hits 0 | report matches yes`
- `workspace-subj-5: stale citations, path, table, and title are corrected | diff present yes | old form hits 0 | report matches yes`
- `workspace-subj-7: ruled growable-set counts are removed | diff present yes | old form hits 0 | report matches yes`
- `workspace-subj-8: probe.md and test.md are listed | diff present yes | old form hits 0 | report matches yes`
- `workspace-subj-11: missing-path splice uses MISSING | diff present yes | old form hits 0 | report matches yes`
- `fleet-F1: browser helper is absent and no browser environment exists | diff present no | old form hits 0 | report matches yes`
- `fleet-F2: implementation classes already use private id storage where applicable | diff present no | old form hits 0 | report matches yes`

Scope tags: every status entry is `owned`; no shared or off-limits entry appears.

Residue: diff added-line residue sweep clean; tree residue sweep clean after excluding vendored policy/config/distribution files.

Writing hits: `conform-workspace.diff:417` — `one file`, `new path`.

Parity: `WorkspaceInterface` rows `guides/workspace.md:167-180`; `WorkspaceManagerInterface` rows `:186-193`; `WorkspaceStoreInterface` rows `:199-201`; readonly Surface rows `:39-40,56,58`; barrel `src/core/index.ts:1-10`.

## Unknowns

No row site or required scoped sweep was unreachable. The current `git status --short` command was not re-run in this read-only audit; the supplied status evidence was used. No standalone red setup control exists for `workspace-obj-1`, and no independent gate run exists in this lane.

## Journal

Driver fills this line.

## Deviation

The search tool rejected a literal pattern containing an escaped newline while checking `split('\n')`; the equivalent `split\(` sweep ran successfully and found the intentional helper splits at `src/core/helpers.ts:136,172`. The report’s broad `guides/*.md` sweep for `readProperty` is contradicted by `guides/test.md`, an off-scope vendored mirror.