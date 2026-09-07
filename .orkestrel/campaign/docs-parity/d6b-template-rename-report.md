# Unit D6b — template-rename: report

The distribution proof template's `Entry` booleans now read as assertions, and the emitted proof typechecks clean in both variants. Every acceptance criterion is green; the distribution observation is red on exactly the packed-install case, as the brief predicted.

## Rulings

Each boolean member ruled against `.claude/rules/names.md` § General vocabulary ("Booleans read as assertions") and § Value-level identifiers ("Boolean | camelCase adjective/past participle").

- `Entry.module` → `importable`. A noun naming a format, not an assertion. The fact is that an ESM `import` resolves a Node target of its own, so the capability adjective states it: `it.runIf(entry.importable)` reads "run if the entry can be imported", which is what the predicate decides.
- `Entry.required` → `requirable`. It takes the participle form, so it reads as an assertion, but it asserts the wrong proposition: "required" says something requires the entry, where the fact is that a `require` resolves a target of its own. `requirable` states that fact and pairs with `importable`.
- `Entry.commonjs` → `loadable`. A noun naming a format. The fact refines `requirable`: the target `require` resolved is one `require` loads (`resolvesCommonJS` reads the extension and the nearest package scope). `requirable` is resolution, `loadable` is loading, and the pair names the two facts the proof actually separates.
- `Entry.browser` → `bundled`. A noun naming a host. The fact is that a bundler resolves the subpath a browser target of its own, distinct from the Node import and require targets, and the drive it gates bundles that entry with Vite.
- `Entry.declaration.module` → `importable`, `Entry.declaration.commonjs` → `requirable`, `Entry.declaration.browser` → `bundled`. Same three nouns, same ruling. The group keeps the name `declaration`, because a record property is a noun; its members take the same three words as the top level, so one vocabulary answers both "which drives does this entry answer" and "which drives resolve a declaration". `entry.requirable` gates the require drive and `entry.declaration.requirable` is what that drive then demands.
- `Entry.subpath`, `Entry.specifier`, and `Entry.mapping` are not booleans and stay.

Ancillary decisions, recorded rather than escalated:

- The `buildStage` locals feeding the record's shorthand keys are renamed with their members (`browser` → `bundled`, `required` → `requirable`, `commonjs` → `loadable`). Leaving them would keep the ruled-against words in the same statement that writes the renamed members.
- The target locals beside them are renamed `importTarget` and `requireTarget` (from `imported` and `requiredTarget`), which makes them parallel with `browserTarget` and keeps the `requirable` line inside the emitted print width of 100 columns. The measured emitted width of that line is 99 columns; the previous spelling wrapped it at 101.
- The interface's leading comment gains the load distinction, because the renamed `requirable`/`loadable` pair names two facts the old comment collapsed.
- `resolvesBrowser` keeps its own locals (`module`, `imported`, `required` hold resolved target strings inside that helper). They are not `Entry` members and sit outside this unit's scope.

## Edits

`/home/user/scaffold/src/core/templates.ts` (the emitted proof template):

- `:1172-1176` — the `Entry` leading comment, restated over the renamed members and the load distinction.
- `:1182-1184` — `declaration.{importable, requirable, bundled}`.
- `:1186-1189` — `bundled`, `importable`, `loadable`, `requirable`.
- `:1462` — `selectEntries` reads `entry.loadable`.
- `:1481` — `selectUntypable` reads `entry.requirable`.
- `:1671-1676` — `buildStage` locals: `importTarget`, `requireTarget`, `bundled`, `requirable`, `loadable`.
- `:1682-1689` — the pushed record, written to the renamed members.
- `:1840` — the unreachable filter reads `!entry.importable && !entry.requirable && !entry.bundled`.
- `:1890`, `:1897` — the Node import drive gates on `entry.importable` and demands `entry.declaration.importable`.
- `:1910`, `:1914` — the Node require drive gates on `entry.requirable` and demands `entry.declaration.requirable`.
- `:2040`, `:2044` — the `drive` fragment's browser drive gates on `entry.bundled` and demands `entry.declaration.bundled`.
- `:2087` — the `guard` fragment filters on `entry.bundled`.

`/home/user/scaffold/tests/src/core/templates.test.ts` (the pinned template text):

- `:1479` — the `selectEntries` drive's inline entries carry `loadable`.
- `:1560-1653` — the staged-classification expectation, every entry's `declaration` record and top-level members renamed.
- `:1728`, `:1731` — the CommonJS-claim projection and its expectation carry `loadable` and `requirable`.
- `:1787`, `:1796` — the invalid-target projection and its expectation carry the same.

`/home/user/scaffold/tests/distribution.test.ts` is scaffold's own proof, not the template's output, and was not touched.

## Criteria

1. `grep -n "readonly module: boolean" src/core/templates.ts` — exit 1, no output.
2. `npm run format:check` — exit 0. Last lines: `All matched files use the correct format.` / `Finished in 9743ms on 223 files using 4 threads.`
   `npm run lint:check` — exit 0, no diagnostics printed.
   `npm run check` — exit 0. Last lines: `> tsc --noEmit -p configs/src/tsconfig.bin.json` with no diagnostics.
3. `npm run test:src:core` — exit 0. Last lines: `Test Files  9 passed (9)` / `Tests  402 passed (402)` / `Duration  21.64s`.
4. `npm run build` — exit 0. Last lines: `build-host: staged 122 file(s) into dist/host` / `build-inventory: staged 122 file(s) into host.json`. `host.json` is byte-identical across the build (`d05eed514c5b9e95870ae4a3954fb66cfa51d1ab47f9b23de050eb2eb3461228` before and after), so the off-limits inventory did not move; `dist/` is git-ignored and untracked.
5. Observation — `PATH=/opt/npm11/bin:$PATH npm run test:distribution` — exit 1, run once, `Duration 34.72s`. Reading: `Test Files  1 failed (1)` / `Tests  1 failed | 4 passed (5)`. The one red case is `installed package consumer > installs the packed scaffold and passes one generated core/server workspace through prepublish [requires a reachable npm registry]`, failing at `tests/distribution.test.ts:938` with `expected 2 to be +0` — the generated workspace's `prepublishOnly` chain exited 2. Every other case passed: the packed archive and its isolated install, the shipped relative targets, the declared types partition, and the refused unnamed subpath.

Extra evidence taken because the observation's red case runs the template this unit edits (read-only, in the session scratchpad, nothing written into the repository):

- The emitted core/server proof carries no line over the emitted print width of 100 columns, measured over its 926 lines.
- The emitted core/server proof typechecks clean: `tsc --noEmit` exit 0 under `module: NodeNext`, `strict`, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`, and `types: ["node", "vite/client"]`, against the repository's installed `typescript`.
- The emitted core/browser proof, which selects the `drive` fragment carrying `it.runIf(entry.bundled)`, typechecks clean the same way with its `configs/browsers.ts` sibling materialized beside it: `tsc --noEmit` exit 0.

## Tree

`git status --short`:

```text
 M .claude/rules/documentation.md
 M .claude/rules/tests.md
 M .claude/rules/workspace.md
 M README.md
 M guides/scaffold.md
 M host.json
 M package.json
 M src/core/Compiler.ts
 M src/core/compilers.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/templates.ts
 M src/core/types.ts
 M src/server/Materializer.ts
 M src/server/Upstream.ts
 M src/server/helpers.ts
 M tests/distribution.test.ts
 M tests/guides.test.ts
 M tests/setupServer.ts
 M tests/src/core/Compiler.test.ts
 M tests/src/core/compilers.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/templates.test.ts
 M tests/src/server/helpers.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

Everything outside the owned files is the D4 through D6 baseline this unit was dispatched over. `git diff --stat` over the owned files:

```text
 src/core/templates.ts            |  63 ++++++++++++-----------
 tests/src/core/templates.test.ts | 108 +++++++++++++++++++--------------------
 2 files changed, 86 insertions(+), 85 deletions(-)
```

## Flagged claims

- **The distribution observation's red case is the dependency-order failure the brief names, not this rename.** The evidence is indirect: the run captures no output from the generated workspace's gate chain, only its exit code 2, and the brief allows one run. What is direct is that both variants of the emitted proof typecheck clean and carry no over-width line, so the rename does not redden the generated workspace's `check` or `format:check` stages. Separating the cause needs the deciding run the brief reserves for the Orchestrator.
- **A stray emitted artifact briefly landed in the repository root and was removed.** The first emit probe misread its own argument list and wrote the generated proof to `/home/user/scaffold/x`. It was moved into the session scratchpad in the following command; the final `git status --short` carries no untracked `x`, and no tracked file was touched by it.
- **`bundled` names the browser fact by its mechanism rather than its host.** A reader meets `entry.bundled` at the browser drive and at the guard case that reports an undrivable browser face, so the drive supplies the host. The alternative spellings that name the host directly are either not assertions (`browser`) or not English a reader would predict (`bundlable`, `browsable`).

_Corrected by the Orchestrator after the closure round (`d6b-audit-checker.md` claim 5): counts of growable sets deleted._
