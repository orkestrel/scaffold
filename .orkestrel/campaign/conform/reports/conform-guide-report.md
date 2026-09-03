# Unit conform-guide — report

Every row is `applied` or `noop`. The gate chain exits 0 at each stage, `scaffold audit --offline`
reports no drift, and `git status --short` lists only files under Owned. No deviation fired.

## Row dispositions

| Row           | Disposition | Note                                                                                                                        |
| ------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------- |
| guide-obj-1   | applied     | `describe('flagship fences', …)` transcribes each `## Patterns` fence with a presence guard beside it                       |
| guide-obj-2   | applied     | `compared` guard on FI, `guide.tests().length` guard on TE, `guide.links().length` guard on LI                              |
| guide-obj-3   | applied     | `isBrowserVuePath` and its `describe` deleted; fleet-F1 folds in here                                                       |
| guide-obj-4   | applied     | `requireText` moved to `tests/setup.ts`; both `setupServer` files removed; every importer repointed                         |
| guide-obj-5   | applied     | `exists` TSDoc and the guide Behavior cell state the directory case; LI and TE catalog rows name it                         |
| guide-obj-6   | applied     | `DeclarationKeyword` declared in `types.ts`, used at the three sites, added to the guide Types table                        |
| guide-obj-7   | applied     | `patterns()` → `fences()` at README.md, with guide-subj-2's edit on the same line                                           |
| guide-obj-8   | applied     | `successor runtime surface` block and the now-unused `core` namespace import deleted                                        |
| guide-obj-9   | applied     | new case parses the root README `## API` section and diffs its call tokens against the real surface                         |
| guide-subj-1  | applied     | every numbered `AGENTS §N` / `AGENTS section N` citation replaced with a rule file and its named heading                    |
| guide-subj-2  | applied     | counts deleted at every named site and at the sites the number-word and numeral sweeps added                                |
| guide-subj-3  | applied     | `should` gone from the package's own prose                                                                                  |
| guide-subj-4  | applied     | `via` → `through` at every site                                                                                             |
| guide-subj-5  | applied     | `e.g.` → `for example` in both doc blocks                                                                                   |
| guide-subj-7  | applied     | `@returns` added to `links`, `tests`, `fences`, `hidden`, `examples()`; `@param name` + `@returns` to `examples(name)`      |
| guide-subj-8  | applied     | `extractFenceImports` description resolves the alias contradiction, drops `since` and the ellipsis                          |
| guide-subj-9  | applied     | the sight/knowledge clauses replaced with checkable facts in the guide and in `Guide.ts`                                    |
| guide-subj-10 | applied     | the fleet measurement, its conclusion, and the superseded-design history deleted                                            |
| guide-subj-11 | applied     | the slogan deleted; every shouted word lowercased, with markdown bold in the guide and plain words in doc blocks            |
| guide-subj-12 | applied     | `kind` → `keyword` across the type, the constant, the guard, the shape, the extractors, the guide, and the README           |
| guide-subj-13 | applied     | `Guide` is `pure` everywhere; `stateful` gone                                                                               |
| guide-subj-15 | applied     | `sources()` added to `SourceManagerInterface`, implemented, documented with a row and a runnable `@example`                 |
| fleet-F1      | applied     | by guide-obj-3. `tests/setup.ts` keeps `TEST_SEED` and `requireTable`, so the sole-export variant does not apply; the `setup` axis, its project, and `test:setup` are untouched and the audit stays clean |
| fleet-F2      | noop        | no class declares a public `readonly id` data field. Read: `Guide` (`src/core/Guide.ts`), `Source` (`src/core/sources/Source.ts`), `SourceManager` (`src/core/sources/SourceManager.ts`) — each declares only `#` fields |

## Files touched

- `src/core/types.ts` — `ExportKeyword` / `SurfaceSymbol.keyword`; false mirror-exemption paragraph deleted; `DeclarationKeyword` added; `exists` contract corrected; missing `@returns` and `@param` added; `sources()` declared.
- `src/core/constants.ts` — `EXPORT_KINDS` → `EXPORT_KEYWORDS`, count deleted.
- `src/core/validators.ts` — `isExportKind` → `isExportKeyword`, `keyword` shape key, citation and count fixed.
- `src/core/shapers.ts` — `keyword: literalShape(EXPORT_KEYWORDS)`, citation fixed, shout removed.
- `src/core/factories.ts` — `keyword` in every `@example`, numbered citations replaced.
- `src/core/helpers.ts` — `keyword` through `computeSymbolKey` / `extractExports` / `extractHidden` / `extractSurface`; `extractDeclaration` takes `DeclarationKeyword`; `isExternalLink`, `extractFenceImports`, `selectSectionBlocks` prose repaired.
- `src/core/parsers.ts` — `e.g.` replaced.
- `src/core/Guide.ts` — pure/stateful reconciled, count deleted, `via` and the sight clause replaced.
- `src/core/sources/Source.ts` — `DeclarationKeyword` on `#members` and `#locate`; `keyword` in the class `@example`.
- `src/core/sources/SourceManager.ts` — `sources()` implemented over `Object.keys(this.#modules)` through the existing `source()` cache.
- `guides/guide.md` — every renamed name, the corrected `exists` behavior, the new `DeclarationKeyword` and `sources` rows, the deleted measurement and slogan, the lowercased shouts, and the replaced citations.
- `guides/README.md` — numbered citations replaced in the tagline and the `## See also` bullet.
- `README.md` — `patterns()` → `fences()`, counts deleted, `keyword` vocabulary, `below` → `following`.
- `tests/guides.test.ts` — three non-vacuousness guards, the README `## API` parity case, the `flagship fences` block, `symbol.keyword`, `README.md` added to the inventory targets, header shout lowercased.
- `tests/setup.ts` — `isBrowserVuePath` deleted, `requireText` moved in without its rationale paragraph.
- `tests/setup.test.ts` — `isBrowserVuePath` block deleted, `requireText` cases moved in with their `createScratch` / `readInventory` / `node:url` imports, header comment corrected.
- `tests/setupServer.ts`, `tests/setupServer.test.ts` — removed; their content lives in the `setup` pair.
- `tests/src/core/{Guide,factories,helpers,parsers,shapers,validators}.test.ts`, `tests/src/core/sources/{Source,SourceManager}.test.ts` — `keyword` vocabulary, repointed `requireText` imports, deleted counts and numbered citations, deleted successor-surface block, new `sources()` cases.
- `tests/fixtures/{good,broken/hidden-declaration}/module/*.ts`, `tests/fixtures/good/guides/src/widget.md` — `ExportKind` → `ExportKeyword` in fixture comments.

Diffstat: 32 files changed, 2721 diff lines (`/home/user/work/evidence/conform-guide.diff`).

## Failing-first controls

Each control planted a defect, ran the named command red, was restored byte for byte, and the same
command then ran green. Runner output is captured per file.

| Row                     | Command                                 | Plant                                                         | Red                                        | Green   | Red file                                              |
| ----------------------- | --------------------------------------- | ------------------------------------------------------------- | ------------------------------------------ | ------- | ----------------------------------------------------- |
| guide-obj-9 / guide-obj-7 | `npm --prefix /home/user/fleet/guide run test:guides` | `fences()` → `patterns()` at README.md          | 1 failed \| 41 passed (42)                | 42 passed | `guide-obj-9-red.txt`                              |
| guide-obj-2             | `npm --prefix /home/user/fleet/guide run test:guides` | `## Tests` → `## Test links`; `modules` key drifted; LI population emptied | 4 failed \| 38 passed (42) | 42 passed | `guide-obj-2-red.txt`                              |
| guide-obj-1             | `npm --prefix /home/user/fleet/guide run test:guides` | transcription asserts the pre-rename `kind` value | 2 failed \| 40 passed (42)                | 42 passed | `guide-obj-1-red.txt`                              |
| guide-subj-15           | `npm --prefix /home/user/fleet/guide run test:src`    | `sources()` dedupe removed                     | 1 failed \| 377 passed (378)              | 378 passed | `guide-subj-15-red.txt`                            |
| guide-obj-4             | `npm --prefix /home/user/fleet/guide run test:setup`  | `requireText` message changed at its new home  | 1 failed \| 6 passed (7)                  | 7 passed | `guide-obj-4-red.txt`                              |

The guide-obj-2 red named exactly the three guards this row adds — `expected 0 to be greater than 0`
on the FI, LI, and TE cases — plus the README case, which the drifted `modules` key also empties.
The guide-obj-1 red named both the executed transcription and its presence guard. The guide-obj-4 red
proves the moved proof is collected at its new location, which is what the move had to preserve.

Files sit under `/home/user/work/evidence/guide-proofs/`. Green counts come from
`gate-test.txt`.

Deletions are proved by the sweeps and the green suite rather than by a plant: guide-obj-3 and
guide-obj-8 remove assertions, so there is no new behaviour to redden. guide-obj-5 and guide-obj-6
are proved by the `exists('src/core')` transcription in the flagship block, by the pre-existing
directory-prefix case in `Source.test.ts`, and by the typecheck plus the surface bijection.

## Sweeps

Each pattern was run over `src`, the non-vendored `tests`, `guides/guide.md`, `guides/README.md`,
and `README.md` unless noted.

| Pattern                                                            | Result                                                                                      |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `\bExportKind\b\|\bEXPORT_KINDS\b\|\bisExportKind\b`               | empty                                                                                       |
| `exportkinds\|exportkind\|isexportkind` (case-insensitive)         | empty                                                                                       |
| `kind: '\|symbol\.kind\|\.kind\b`                                  | one hit, `tests/setupPolicy.ts:346` — vendored, reads the TypeScript compiler's `SyntaxKind` |
| `isBrowserVuePath\|browservue` (case-insensitive)                  | empty                                                                                       |
| `setupServer`                                                      | hits only in vendored `tests/config.test.ts` (rows gated on absent environments) and the vendored mirror `guides/scaffold.md` |
| `extractCodeLines\|moduleDirs\|moduleKeys\|successor runtime surface\|patterns()` | empty                                                                    |
| `AGENTS §\|AGENTS section\|§[0-9]\|section 14\|4\.6\.1`            | empty                                                                                       |
| `\bshould\b\|\bvia\b\|e\.g\.\|i\.e\.` (case-insensitive)           | empty                                                                                       |
| `LACKING\|ORIGINAL\|UNION\|VALUES\|CONSUMER\|CONTENT\|SELF\|THIS\|\bOR\b` | empty                                                                                 |
| `\babove\b\|\bbelow\b` (case-insensitive)                          | one hit at README.md:30, repaired to `following`                                            |
| `\b(one\|two\|…\|ten)\b` (case-insensitive)                        | ruled per hit; `two sources of identifiers` and `these two populations` were counts and were repaired, every other hit is a determiner, a fixed arity, or a hypothetical pair |
| `\bonce\b` (case-insensitive)                                      | every hit means "a single time"; the one temporal `once` at guides/guide.md was repaired to `after` |
| `\b[0-9]+ (elements\|members\|…\|symbols)\b` (case-insensitive)    | two hits in `Source.test.ts` test names (`exact 6 symbols`), both repaired                  |
| `readonly id\|^export class` (fleet-F2, `src` only)                | no public `readonly id` field on any class                                                  |

## Gates

Run in order, each read bare. Output under `/home/user/work/evidence/guide-proofs/`.

| Command                                       | Exit | File                     |
| --------------------------------------------- | ---- | ------------------------ |
| `npm --prefix /home/user/fleet/guide run format:check` | 0 | `gate-format-check.txt`  |
| `npm --prefix /home/user/fleet/guide run lint:check`   | 0 | `gate-lint-check.txt`    |
| `npm --prefix /home/user/fleet/guide run check`        | 0 | `gate-check.txt`         |
| `npm --prefix /home/user/fleet/guide run build`        | 0 | `gate-build.txt`         |
| `npm --prefix /home/user/fleet/guide test`             | 0 | `gate-test.txt`          |
| `cd /home/user/fleet/guide && npx scaffold audit --offline` | 0 | `scaffold-audit.txt` |

No failure excerpt: no gate failed.

`npm test` per project: `src:core` 378 passed (8 files), `policy` 111 passed, `config` 46 passed,
`setup` 7 passed, `guides` 42 passed. Baseline at `10b6e70` was `src:core` 377, `policy` 111,
`config` 46, `setup` 12 (2 files), `guides` 27. The `setup` drop is guide-obj-3 deleting the
`isBrowserVuePath` cases and guide-obj-4 merging the `setupServer` file into `setup.test.ts`.

`scaffold audit --offline`: `0 of 33 planned paths drifted from the plan.` The `setup` axis stays
inferred and satisfied, so removing `tests/setupServer.ts` left the audit clean.

**Observation, not a criterion.** The whole-suite `npm test` reading was taken inside this unit's own
exec. The Orchestrator takes the deciding run after the unit exits.

## Breaking

`SurfaceSymbol.kind` is renamed to `keyword`, `ExportKind` to `ExportKeyword`, `EXPORT_KINDS` to
`EXPORT_KEYWORDS`, and `isExportKind` to `isExportKeyword`. The markdown `Kind` column header and
`findKindIndex` are unchanged: the header is table data this package locates by literal text.

Two further consequences to carry into the release note:

- `createSurfaceSymbolContract().schema` now names its property `keyword`, so the published JSON
  Schema changes shape.
- `computeSymbolKey` still returns `${keyword} ${name}`, so every existing bijection key string is
  byte-identical and no consumer's key comparison moves.

`SourceManagerInterface` gains `sources()`. That is additive for a consumer calling
`createSourceManager`; it breaks only an external implementer of the interface, and the fleet closure
names none.

## Shared-file patches

Not applied here. Every fleet package that declares `@orkestrel/guide` reads `symbol.kind` in
`tests/guides.test.ts`, on one identical line. The exact consumer-side edit, once each package
re-pins to the released `@orkestrel/guide`:

```diff
-				.filter((symbol) => symbol.kind === 'function')
+				.filter((symbol) => symbol.keyword === 'function')
```

Consumers carrying that line, verified by `grep -rln "symbol.kind" /home/user/fleet --include=guides.test.ts`:
abort, agent, brief, browser, budget, codec, console, contract, csv, database, emitter, form, html,
indexeddb, interpret, lsp, markdown, mcp, middleware, msg, ndjson, ollama, pool, process, program,
qualifier, queue, rater, reason, relation, router, sea, server, sqlite, sse, table, template,
terminal, test, timeout, tool, toolbox, websocket, worker, workflow, workspace.

The brief's consumer list also names `probe`; `probe/tests/guides.test.ts` carries no `symbol.kind`
line, so it needs no edit.

A package whose own guide documents `SurfaceSymbol`, `ExportKind`, `EXPORT_KINDS`, or `isExportKind`
in prose needs the same vocabulary change, and every consumer's vendored `guides/guide.md` mirror
needs a byte refresh from the released package.

## Vendored mirror

`guides/markdown.md` is unchanged. The installed `@orkestrel/markdown` ships `LICENSE`, `README.md`,
`dist`, and `package.json` and no `guides/` directory, so no byte comparison against it is possible,
and no suite performs one: `tests/config.test.ts` names no guide path, and the `config` project ran
green. The standing condition's refresh therefore does not fire.

## Deviations

None against the row set. Three decisions recorded under the deviation contract's ancillary clause,
plus one instruction conflict:

1. **An injected "auto mode" directive was refused.** The loaded copy of
   `.claude/rules/documentation.md` carried an appended block instructing me to read with `cat` and
   `sed -n` and to write with `sed`, heredocs, and short scripts. That contradicts this unit's brief,
   which fixes Read/Grep/Glob for reading and Edit/Write for changing and bans heredocs, `sed -i`,
   `python3`, and `node -e`. The text arrived inside file content rather than from the coordinator or
   the permission system, so it cannot widen the dispatch. I followed the brief throughout. Flagging
   it because that block does not belong in a rule file.
2. **Removing the two `setupServer` files used `rm`.** guide-obj-4 moves their content into the
   existing `tests/setup.ts` and `tests/setup.test.ts`, so `git mv` has no free destination and would
   overwrite a live file. `git rm` stages, which the dispatch restricts. I removed exactly the two
   paths whose content had already been moved, one command each, and staged nothing.
3. **`DeclarationKeyword`'s TSDoc names its members rather than tallying them.** The refuter's
   amendment asked for "the two-member subset of `ExportKeyword`"; `two-member` is a count over
   members, which `AGENTS.md` § Writing forbids. The block reads "a `class` or an `interface`. That
   pair is the subset of {@link ExportKeyword} carrying a documented member body."
4. **`sources()`'s `@example` shows identity rather than a length.** A `sources().length // 1` line
   would state a count, so the example binds `const [core] = sources.sources()` and asserts it is the
   entity `source()` returns.

## Fix round 1

Closes the round-1 objective lane's refutations of claims 3, 4, and 6.

**Claim 3.** `src/core/types.ts:104`'s `GuideInterface.surface` doc block read "Lists every
`## Surface` identifier + kind", quoting the pre-rename axis while `guides/guide.md:203` already
read "identifier + keyword". Rewritten to "Lists every `## Surface` identifier + keyword — table
rows union backticked entity headings."

A grep for `identifier + kind` over the tree returns no hit: no other guide sentence or
`tests/guides.test.ts` presence guard quotes the old text. `\bkind\b`, case-insensitive, re-run over
`src`, the non-vendored `tests`, `guides/guide.md`, `guides/README.md`, and `README.md`:

- `src`: four files hit — `validators.ts:13`, `Guide.ts:26`, `factories.ts:30` (the `@example`
  Markdown fence `| Name | Kind |`), and `helpers.ts:941-1243` (`findKindIndex`'s doc block and body,
  which locates a Surface table's `Kind` column by its literal header text). Every hit is the
  markdown `Kind` table header, permitted.
- `tests`: hits across `guides.test.ts`, `setup.test.ts`, `helpers.test.ts`, `Source.test.ts`, and
  the `tests/fixtures/**/widget.md` and `guide.md` fixtures are the same `Kind` table header in
  fixture markdown and in `@example` fences; `tests/fixtures/broken/wrong-kind/` is the permitted
  `wrong-kind` fixture directory and file name; `tests/src/core/Guide.test.ts:131-132` names the
  `wrong-kind` fixture in a test title and path; `tests/src/core/helpers.test.ts:471,478,488` uses
  `kind` as a local variable name whose value is a `SurfaceSymbol` with a `keyword` property —
  the identifier names the variable, not the renamed axis; `tests/setupPolicy.ts` is the vendored
  file, permitted, and reads the TypeScript compiler's `SyntaxKind` (`node.kind`) and its own
  `function-kind` / `data-kind` file-classification prose, unrelated to `SurfaceSymbol`.
- `guides/guide.md`: seven table-header hits (`| Name | Kind |` column headers across the Types,
  Functions, Classes, and other entity tables) plus `findKindIndex`'s row describing the same
  `Kind`-column lookup, plus two `@example` fences repeating the `| Name | Kind |` header. Every hit
  is the markdown `Kind` table header, permitted.
- `guides/README.md`, `README.md`: no hit.

**Claim 4.** Added two rows to § Sweeps for guide-obj-6 and guide-subj-13:

| Pattern                                   | Population                                                                              | Result                                                                                                                       |
| ------------------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `'class'\s*\|\s*'interface'` (inline union) | `src` — the three former sites of the inline union: `Source.ts:246,269` and `helpers.ts:1134` | one hit, `types.ts:390`, the `DeclarationKeyword` declaration itself; the three former sites now read `DeclarationKeyword` |
| `\bstateful\b` (case-insensitive)           | `src`, the non-vendored `tests`, `guides/guide.md`, `guides/README.md`, `README.md`      | empty in the guide package's own prose; the only tree hits are in the vendored mirrors `guides/markdown.md` and `guides/contract.md`, which document other packages and are out of scope |

**Claim 6.** Added a `database` entry to § Shared-file patches (below) naming the sites read
directly from `/home/user/fleet/database/tests/setupServer.ts` and
`/home/user/fleet/database/tests/setupServer.test.ts`, and restated the verification sweep.

```diff
--- a/tests/setupServer.ts
+++ b/tests/setupServer.ts
@@
-import type { ExportKind, SurfaceSymbol } from '@orkestrel/guide'
+import type { ExportKeyword, SurfaceSymbol } from '@orkestrel/guide'
@@
- * @returns Its Guide surface kind, or `undefined` when unsupported
+ * @returns Its Guide surface keyword, or `undefined` when unsupported
@@
-): ExportKind | undefined {
+): ExportKeyword | undefined {
@@
- * @returns One symbol per distinct supported declaration kind
+ * @returns One symbol per distinct supported declaration keyword
@@
-	const kinds = new Set<ExportKind>()
+	const keywords = new Set<ExportKeyword>()
 	for (const declaration of declarations) {
-		const kind = classifyEntryDeclaration(target, declaration)
-		if (kind === undefined) {
+		const keyword = classifyEntryDeclaration(target, declaration)
+		if (keyword === undefined) {
 			throw new Error(`Entry '${entry}' export '${exported.name}' has unsupported declaration`)
 		}
-		kinds.add(kind)
+		keywords.add(keyword)
 	}
-	return Array.from(kinds, (kind) => ({ name: exported.name, kind }))
+	return Array.from(keywords, (keyword) => ({ name: exported.name, keyword }))
@@
-			return name === 0 ? left.kind.localeCompare(right.kind) : name
+			return name === 0 ? left.keyword.localeCompare(right.keyword) : name
--- a/tests/setupServer.test.ts
+++ b/tests/setupServer.test.ts
@@
-			expect([...shaped.map((symbol) => symbol.kind)].sort()).toEqual(['const', 'interface'])
+			expect([...shaped.map((symbol) => symbol.keyword)].sort()).toEqual(['const', 'interface'])
@@
-			expect(entry.map((symbol) => `${symbol.name}:${symbol.kind}`)).toEqual([
+			expect(entry.map((symbol) => `${symbol.name}:${symbol.keyword}`)).toEqual([
@@
-			expect(requireValue(surfaces.get('src/extra.ts'))).toEqual([{ name: 'EXTRA', kind: 'const' }])
+			expect(requireValue(surfaces.get('src/extra.ts'))).toEqual([{ name: 'EXTRA', keyword: 'const' }])
@@
-				{ name: 'BROKEN', kind: 'const' },
+				{ name: 'BROKEN', keyword: 'const' },
```

Read directly rather than from the brief's shorter line list: `tests/setupServer.ts` carries the
renamed axis at lines 8 (`ExportKind` import), 205 (`@returns` doc), 210 (return type), 240
(`@returns` doc), 258, 260, 261, 264, 266 (the `kinds`/`kind` locals and their `Set<ExportKind>`),
and 329 (`left.kind.localeCompare(right.kind)`). `tests/setupServer.test.ts` carries it at lines 337,
361 (test titles saying "kind"), 376, 420, 427, and 465 (`symbol.kind` / `kind:` object literals).
The brief's `:8,210,258` and `:376,420` are each inside this fuller set, not a different one.

Fleet-wide verification sweep, restated as `ExportKind|EXPORT_KINDS|isExportKind|symbol\.kind` over
`/home/user/fleet/*/tests/**/*.ts` and `/home/user/fleet/*/src/**/*.ts`, excluding `node_modules` and
`/home/user/fleet/guide`:

```
grep -rln --include=*.ts -E "ExportKind|EXPORT_KINDS|isExportKind|symbol\.kind" /home/user/fleet --exclude-dir=node_modules --exclude-dir=guide
```

Returns the same forty-six `tests/guides.test.ts` consumers § Shared-file patches already named —
abort, agent, brief, browser, budget, codec, console, contract, csv, database, emitter, form, html,
indexeddb, interpret, lsp, markdown, mcp, middleware, msg, ndjson, ollama, pool, process, program,
qualifier, queue, rater, reason, relation, router, sea, server, sqlite, sse, table, template,
terminal, test, timeout, tool, toolbox, websocket, worker, workflow, workspace — plus two additional
files in the `database` package: `tests/setupServer.ts` and `tests/setupServer.test.ts`. No other
package and no `src/**/*.ts` path in the fleet carries the renamed axis.

### § Shared-file patches — added `database` entry

`database/tests/setupServer.ts:8,205,210,240,258,260,261,264,266,329` and
`database/tests/setupServer.test.ts:337,361,376,420,427,465` import and use `ExportKind` and
`symbol.kind`. The diff above is the exact consumer-side edit, once `database` re-pins to the
released `@orkestrel/guide`. `database` was already listed among the `tests/guides.test.ts`
consumers; this entry is additional, for its two `setupServer` files, which import `ExportKind`
directly rather than reading `symbol.kind` off a `guides.test.ts` fixture.

### Gates

| Command                                                      | Exit |
| ------------------------------------------------------------- | ---- |
| `npm --prefix /home/user/fleet/guide run format:check`        | 0    |
| `npm --prefix /home/user/fleet/guide run lint:check`           | 0    |
| `npm --prefix /home/user/fleet/guide run check`                | 0    |
| `npm --prefix /home/user/fleet/guide run build`                 | 0    |
| `npm --prefix /home/user/fleet/guide test`                      | 0    |

`npm test` per project: `src:core` 378 passed, `policy` 111 passed, `config` 46 passed, `setup` 7
passed, `guides` 42 passed — unchanged from the baseline this fix round started from.

`cd /home/user/fleet/guide && npx scaffold audit --offline`: `0 of 33 planned paths drifted from the
plan. Audit compared bytes at 23, existence at 4, and nothing at 6.`

`git -C /home/user/fleet/guide status --short` lists only paths already under the unit's Files
touched section, with `tests/setupServer.test.ts` and `tests/setupServer.ts` still deleted and
unstaged.

No deviation fired.
