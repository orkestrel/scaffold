# Question

For each conformance row, compare the current tree, its diff, old-form sweeps, report readings, and proof evidence.

# Evidence

Common sweep population: `src/**/*.ts`, `tests/**/*.ts`, `guides/guide.md`, `guides/README.md`, and `README.md`, excluding `node_modules`.

## Per-row evidence

1. **guide-obj-1**
   - **Site now:** `tests/guides.test.ts:201-208` contains `describe('flagship fences')` and executes the `createGuide` transcription. Lines `210-218` provide its presence guard. The remaining transcriptions and guards span `:220-360`.
   - **Diff:** `conform-guide.diff` hunk `@@ -142,3 +191,172 @@`; the `+` lines contain the flagship-fence block and all expected `keyword` results.
   - **Old-form sweep:** No removed name or path. No old-form hits.
   - **Report:** `conform-guide-report.md:7` says: “`describe('flagship fences', …)` transcribes each `## Patterns` fence with a presence guard beside it.” The current tree matches.
   - **Proof:** `guide-obj-1-red.txt` exists and records `Tests 2 failed | 40 passed (42)`. The green reading is in `gate-test.txt`: `Tests 42 passed (42)`.

2. **guide-obj-2**
   - **Site now:** `tests/guides.test.ts:155-172` counts resolved FI comparisons and asserts `compared > 0`; `:173-190` guards links and test links.
   - **Diff:** `@@ -114,18 +155,25 @@` and `@@ -134,6 +182,7 @@`; the `+` lines contain all three guards.
   - **Old-form sweep:** No removed name or path. No old-form hits.
   - **Report:** `conform-guide-report.md:8` records the FI, TE, and LI guards. The current tree matches.
   - **Proof:** `guide-obj-2-red.txt` records `Tests 4 failed | 38 passed (42)`, including the three vacuousness failures. `gate-test.txt` records `Tests 42 passed (42)`.

3. **guide-obj-3**
   - **Site now:** `tests/setup.ts:27-43` contains only `requireTable` and `requireText`; no `isBrowserVuePath` remains. `tests/setup.test.ts:1-8` imports the remaining helpers, and no browser-path case remains.
   - **Diff:** `tests/setup.ts` hunk `@@ -26,8 +27,18 @@`; `tests/setup.test.ts` hunks `@@ -1,9 +1,12 @@` and `@@ -48,14 +51,23 @@`. The deletion is present in `-` lines; no `+` line reintroduces the helper.
   - **Old-form sweep:** `\bisBrowserVuePath\b|\bbrowservuepath(s)?\b` over the common population: no hit.
   - **Report:** `conform-guide-report.md:9` says the helper and its test were deleted and fleet-F1 folds into this row. The current tree matches.
   - **Proof:** No dedicated control file exists; the report explicitly treats this deletion as covered by sweeps and the green suite.

4. **guide-obj-4**
   - **Site now:** `tests/setup.ts:30-43` owns `requireText`; `tests/setup.test.ts:54-72` owns its proof. `tests/setupServer.ts` and `tests/setupServer.test.ts` are deleted.
   - **Diff:** `@@ -1,28 +0,0 @@` for `tests/setupServer.test.ts` and `@@ -1,16 +0,0 @@` for `tests/setupServer.ts`; moved content appears in the `tests/setup.ts` and `tests/setup.test.ts` `+` lines.
   - **Old-form sweep:** `\bsetupServer\b|\bsetupservers\b` over the common population hits only the vendored `tests/config.test.ts`: `:88`, `:94`, `:112`, and `:292`. Those references are gated or negative-control data, as the report states.
   - **Report:** `conform-guide-report.md:10` says `requireText` moved, both server setup files were removed, and importers were repointed. The current tree matches, with the four expected vendored references.
   - **Proof:** `guide-obj-4-red.txt` records `Tests 1 failed | 6 passed (7)` with the planted message mismatch. `gate-test.txt` records `Tests 7 passed (7)` for setup.

5. **guide-obj-5**
   - **Site now:** `src/core/types.ts:237-243` documents file-or-directory lookup and prefix matching. `guides/guide.md:216-218` gives the same behavior. The LI and TE catalog rows at `guides/guide.md:388-393` name directory resolution.
   - **Diff:** `src/core/types.ts` hunk `@@ -234,20 +242,24 @@`; guide hunks `@@ -212,14 +213,14 @@` and `@@ -377,19 +378,22 @@`. The operative directory wording appears in `+` lines.
   - **Old-form sweep:** The old exact-key sentence is absent from the touched contract and guide rows. No removed API name remains.
   - **Report:** `conform-guide-report.md:11` says the contract, guide behavior cell, and LI/TE rows state the directory case. The current tree matches.
   - **Proof:** No dedicated control file; `tests/src/core/sources/Source.test.ts:960-963` retains the directory-prefix behavior proof, and the flagship transcription at `tests/guides.test.ts:261` asserts `source.exists('src/core')` is true.

6. **guide-obj-6**
   - **Site now:** `src/core/types.ts:383-390` declares `DeclarationKeyword`. `src/core/helpers.ts:1134-1138` and `src/core/sources/Source.ts:243-249`, `:266-270` use it. `guides/guide.md:49` documents it and `:86` uses it in the signature.
   - **Diff:** `src/core/types.ts` hunk `@@ -354,3 +381,10 @@`; helper hunk `@@ -1131,7 +1131,7 @@`; Source hunks `@@ -237,7 +243,7 @@` and `@@ -260,7 +266,7 @@`; guide hunk `@@ -29,37 +29,38 @@`. The type and all three uses appear in `+` lines.
   - **Old-form sweep:** The duplicated inline signature is absent from the three implementation sites. The canonical union remains once in `src/core/types.ts:390`.
   - **Report:** `conform-guide-report.md:12` says the type is declared, used at three sites, and documented. The current tree matches.
   - **Proof:** No dedicated control file; the report relies on typecheck, surface parity, and the guide suite.

7. **guide-obj-7**
   - **Site now:** `README.md:124-130` lists `fences()` rather than `patterns()` and removes the count from the same sentence.
   - **Diff:** `README.md` hunk `@@ -122,18 +122,18 @@`; the `+` lines contain `fences()`.
   - **Old-form sweep:** `\bpatterns\b|\bpatterns\(\)` over the common population: no hit.
   - **Report:** `conform-guide-report.md:13` says the phantom was changed to `fences()` with the count edit. The current tree matches.
   - **Proof:** Covered by `guide-obj-9-red.txt`: `Tests 1 failed | 41 passed (42)` when `fences()` was planted as `patterns()`, then `gate-test.txt`: `Tests 42 passed (42)`.

8. **guide-obj-8**
   - **Site now:** The old `successor runtime surface` block is absent from `tests/src/core/helpers.test.ts`; the current file ends with the phantom-import proof at `:1858-1870`. The namespace import is also absent.
   - **Diff:** `@@ -1,5 +1,4 @@` removes the namespace import; `@@ -1870,27 +1870,3 @@` removes the block. No `+` line contains the retired names.
   - **Old-form sweep:** `\bextractCodeLines\b|\bmoduleDirs\b|\bmoduleKeys\b|\bsuccessor runtime surface\b` over the common population: no hit.
   - **Report:** `conform-guide-report.md:14` says the block and unused namespace import were deleted. The current tree matches.
   - **Proof:** No dedicated control file; deletion is covered by the green suite and surface parity.

9. **guide-obj-9**
   - **Site now:** `tests/guides.test.ts:44-74` reads `README.md`, bounds extraction to `## API`, requires a non-empty token set, and compares tokens against public exports and documented methods.
   - **Diff:** `@@ -34,6 +42,39 @@`; the `+` lines contain the README API check.
   - **Old-form sweep:** No removed name or path. No old-form hits.
   - **Report:** `conform-guide-report.md:15` says a root README API parity case was added. The current tree matches.
   - **Proof:** `guide-obj-9-red.txt` records `Tests 1 failed | 41 passed (42)` for `patterns`; `gate-test.txt` records `Tests 42 passed (42)`.

10. **guide-subj-1**
    - **Site now:** Numbered `AGENTS` citations are replaced in `guides/guide.md`, `guides/README.md`, source TSDoc, and test comments. For example, `guides/guide.md:9`, `:195`, `:216`, `:345`, and `:544` now cite named rule files or headings.
    - **Diff:** Relevant headers include guide `@@ -2,15 +2,15 @@`, `@@ -212,14 +213,14 @@`, and `@@ -342,8 +361,9 @@`; guide-index headers `@@ -1,6 +1,7 @@` and `@@ -16,4 +17,4 @@`; source/test citation hunks are present in the corresponding files.
    - **Old-form sweep:** `AGENTS\s*(?:§|section)|§\s*[0-9]+|4\.6\.1` over the common population: no hit.
    - **Report:** `conform-guide-report.md:16` says every numbered citation was replaced with a named rule file and heading. The current tree matches.
    - **Proof:** Documentation sweep recorded in the report; no behavioral control applies.

11. **guide-subj-2**
    - **Site now:** Counts are removed from `src/core/Guide.ts:12`, `src/core/constants.ts:2`, `src/core/types.ts:5`, `:246`, `src/core/validators.ts:12`, `src/core/helpers.ts:1012`, `:1015`, `README.md:66`, `:125`, and the corresponding guide prose. The bijection sentence is “in every direction” at `guides/guide.md:383` and `:512`.
    - **Diff:** Relevant headers include Guide `@@ -9,22 +9,22 @@`, constants `@@ -1,15 +1,15 @@`, types `@@ -1,28 +1,22 @@` and `@@ -234,20 +242,24 @@`, README `@@ -122,18 +122,18 @@`, and guide `@@ -377,19 +378,22 @@`.
    - **Old-form sweep:** Number-word and numeral sweeps over the common population find no remaining count in the changed prose. Remaining `one` occurrences are determiners, fixed-arity descriptions, or examples.
    - **Report:** `conform-guide-report.md:17` says counts were deleted at every named and discovered site. The current tree matches.
    - **Proof:** Documentation sweep recorded in the report; no behavioral control applies.

12. **guide-subj-3**
    - **Site now:** `src/core/helpers.ts:803-809` uses “skips” and “leaves unresolved”; `guides/guide.md:96` and `:308` use the same imperative wording.
    - **Diff:** Helper hunk `@@ -800,12 +801,11 @@`; guide hunk `@@ -93,7 +94,7 @@` and projector hunk `@@ -232,29 +233,27 @@`. The repaired wording appears in `+` lines.
    - **Old-form sweep:** `\bshould\b` over the common population: no hit.
    - **Report:** `conform-guide-report.md:18` says `should` was removed from package prose. The current tree matches.
    - **Proof:** Documentation sweep recorded in the report.

13. **guide-subj-4**
    - **Site now:** `src/core/Guide.ts:17` uses “through”; guide prose uses “through” at `guides/guide.md:5`, `:12`, `:157`, `:251`, and `:316`; the test comment at `tests/src/core/shapers.test.ts:13` also uses “through”.
    - **Diff:** Guide `@@ -2,15 +2,15 @@`, Guide class `@@ -9,22 +9,22 @@`, and helper/projector hunks contain the replacements.
    - **Old-form sweep:** `\bvia\b` over the common population: no hit.
    - **Report:** `conform-guide-report.md:19` says every `via` occurrence was replaced. The current tree matches.
    - **Proof:** Documentation sweep recorded in the report.

14. **guide-subj-5**
    - **Site now:** `src/core/parsers.ts:21` and `src/core/helpers.ts:1208` use “for example”.
    - **Diff:** Parser hunk `@@ -18,7 +18,7 @@`; helper hunk `@@ -1205,7 +1205,7 @@`. The replacement appears in `+` lines.
    - **Old-form sweep:** `\be\.g\.\b|\bi\.e\.\b` over the common population: no hit.
    - **Report:** `conform-guide-report.md:20` says both `e.g.` occurrences were replaced. The current tree matches.
    - **Proof:** Documentation sweep recorded in the report.

15. **guide-subj-7**
    - **Site now:** `src/core/types.ts:121-148` documents returns for `links`, `tests`, and `fences`; `:243-293` documents returns for `hidden`, both `examples` forms, and the `name` parameter.
    - **Diff:** Types hunks `@@ -121,6 +115,8 @@`, `@@ -130,6 +126,8 @@`, `@@ -140,6 +138,8 @@`, `@@ -234,20 +242,24 @@`, `@@ -260,6 +264,8 @@`, and `@@ -280,6 +286,9 @@`. All required tags appear in `+` lines.
    - **Old-form sweep:** No removed name or path. No old-form hits.
    - **Report:** `conform-guide-report.md:21` says the missing tags were added. The current tree matches.
    - **Proof:** Documentation sweep recorded in the report.

16. **guide-subj-8**
    - **Site now:** `src/core/helpers.ts:762-766` says aliases resolve to exported name `x` because the barrel must hold that name.
    - **Diff:** `@@ -760,9 +761,9 @@`; the contradictory “local name,” ellipsis, and `since` are absent from `+` lines.
    - **Old-form sweep:** `\blocal name\b|\.\.\.|since` over the changed helper prose: no hit.
    - **Report:** `conform-guide-report.md:22` says the alias wording, causal term, ellipsis, and capitals were repaired. The current tree matches.
    - **Proof:** Documentation sweep recorded in the report.

17. **guide-subj-9**
    - **Site now:** `guides/guide.md:222` says “the most common error in a consumer's parity test.” `guides/guide.md:157` and `src/core/Guide.ts:18-19` say `Guide` reads only supplied markdown and records nothing about its origin.
    - **Diff:** Guide hunks `@@ -183,23 +184,23 @@` and `@@ -232,29 +233,27 @@`; Guide class hunk `@@ -9,22 +9,22 @@`. The checkable replacements appear in `+` lines.
    - **Old-form sweep:** `\bsingle mistake\b|\bhas no notion\b|\bsees most often\b` over the common population: no hit.
    - **Report:** `conform-guide-report.md:23` says the sight and knowledge clauses were replaced with checkable facts. The current tree matches.
    - **Proof:** Documentation sweep recorded in the report.

18. **guide-subj-10**
    - **Site now:** `guides/guide.md:238-241` contains no fleet measurement or conclusion. `guides/guide.md:185-188` describes the current unmapped-specifier behavior.
    - **Diff:** Guide hunks `@@ -183,23 +184,23 @@` and `@@ -232,29 +233,27 @@`; the obsolete measurement and conclusion are only in `-` lines.
    - **Old-form sweep:** `\bMeasured across\b|\bpublished packages\b|\bzero imports would newly fail\b|\bseparate list of self-specifiers\b` over the common population: no hit.
    - **Report:** `conform-guide-report.md:24` says the fleet measurement, conclusion, and superseded-design history were deleted. The current tree matches.
    - **Proof:** Documentation sweep recorded in the report.

19. **guide-subj-11**
    - **Site now:** The slogan is absent from `guides/guide.md`; changed capitals are lowercase or markdown emphasis. The current source/test prose uses ordinary case.
    - **Diff:** Guide hunk `@@ -2,15 +2,15 @@` and guide content hunks `@@ -212,14 +213,14 @@`, `@@ -398,20 +402,21 @@`, `@@ -420,7 +425,7 @@`, and `@@ -435,7 +440,7 @@`; helper/type/shaper/test hunks contain the lowercase replacements.
    - **Old-form sweep:** The listed shout terms have no hits in changed prose. Broad case-sensitive scanning also finds six permitted fixture tokens `VALUES` in vendored `tests/setupPolicy.ts:2057`, `:2164`, `:2175`, `:2187`, `:2199`, and `:2224`.
    - **Report:** `conform-guide-report.md:25` says the slogan was deleted and shouted prose was normalized. That is true for the owned prose; the vendored code fixture tokens are unrelated.
    - **Proof:** Documentation sweep recorded in the report.

20. **guide-subj-12**
    - **Site now:** `src/core/types.ts:10-19` defines `ExportKeyword` and `SurfaceSymbol.keyword`; `src/core/constants.ts:13` defines `EXPORT_KEYWORDS`; `src/core/validators.ts:23` defines `isExportKeyword`; `src/core/shapers.ts:23-26` uses `keyword`; helpers and Source use `keyword`; `guides/guide.md:35`, `:63`, `:78`, `:136`, and `README.md:130` document the new names.
    - **Diff:** Relevant headers include types `@@ -1,28 +1,22 @@`, constants `@@ -1,15 +1,15 @@`, helpers `@@ -650,19 +651,19 @@`, `@@ -991,29 +992,28 @@`, `@@ -1034,15 +1034,15 @@`, Source `@@ -53,8 +59,8 @@`, shapers `@@ -16,12 +16,12 @@`, validators `@@ -1,45 +1,45 @@`, guide `@@ -29,37 +29,38 @@`, and fixture/test rename hunks. The operative replacements appear in `+` lines.
    - **Old-form sweep:** `\bExportKind\b|\bEXPORT_KINDS\b|\bisExportKind\b` and its case-insensitive inflections over the common population: no hit. `symbol\.kind` also has no hit. A broader `\bkind\b|\.kind\b` finds:
      - `src/core/types.ts:104`, a stale TSDoc phrase: “identifier + kind”;
      - legitimate local fixture/test terms at `tests/src/core/helpers.test.ts:471`, `:478`, `:488`, and `tests/src/core/Guide.test.ts:131`;
      - AST/policy vocabulary in vendored `tests/setupPolicy.ts`.
    - **Report:** `conform-guide-report.md:26-29` says the public names and shape were renamed. The public rename is present, but the report's claim that the change covered “the type” is incomplete because `src/core/types.ts:104` still uses the old concept word.
    - **Proof:** No dedicated control file. Fleet consumers still require migration; see Breaking below.

21. **guide-subj-13**
    - **Site now:** `src/core/Guide.ts:12-20` consistently describes a pure cached view. `guides/guide.md:155-160` does the same.
    - **Diff:** Guide class hunk `@@ -9,22 +9,22 @@`; guide hunk `@@ -153,11 +154,11 @@`. The pure wording appears in `+` lines.
    - **Old-form sweep:** `\bstateful\b` over the common population: no hit.
    - **Report:** `conform-guide-report.md:30` says `Guide` is pure everywhere and `stateful` is gone. The current tree matches.
    - **Proof:** Documentation sweep recorded in the report.

22. **guide-subj-15**
    - **Site now:** `src/core/types.ts:345-352` declares `sources()`. `src/core/sources/SourceManager.ts:48-60` enumerates cached, deduplicated views. `guides/guide.md:245-246` documents the method, and `tests/src/core/sources/SourceManager.test.ts:67-90` tests it.
    - **Diff:** SourceManager hunk `@@ -41,4 +44,18 @@`; types hunk `@@ -326,8 +335,26 @@`; guide hunk `@@ -232,29 +233,27 @@`; test hunk `@@ -63,4 +63,27 @@`. The implementation, method row, example, and test appear in `+` lines.
    - **Old-form sweep:** No removed name or path. No old-form hits.
    - **Report:** `conform-guide-report.md:31` says `sources()` was added, implemented, documented, and tested. The current tree matches.
    - **Proof:** `guide-subj-15-red.txt` records `Tests 1 failed | 377 passed (378)` when deduplication was planted. `gate-test.txt` records `Tests 378 passed (378)` for `src:core`.

23. **fleet-F1**
    - **Site now:** `tests/setup.ts` has no `isBrowserVuePath`; `tests/setup.test.ts` has no corresponding case. `TEST_SEED`, `requireTable`, and `requireText` remain, so the sole-export variant does not apply.
    - **Diff:** Same setup hunks as guide-obj-3; no separate edit exists.
    - **Old-form sweep:** `\bisBrowserVuePath\b|\bbrowservuepath(s)?\b`: no hit.
    - **Report:** `conform-guide-report.md:31` records “applied by guide-obj-3” and explains why the export-free variant does not apply. The current tree matches.
    - **Proof:** No separate control; the helper-deletion evidence and suite cover it.

24. **fleet-F2**
    - **Site now:** The classes read from `src/core/Guide.ts`, `src/core/sources/Source.ts`, and `src/core/sources/SourceManager.ts` use `#` fields and have no public `readonly id` field.
    - **Diff:** No hunk applies.
    - **Old-form sweep:** `readonly id` in public class-field declarations over `src/**/*.ts`: no hit.
    - **Report:** `conform-guide-report.md:31` records `noop` after reading the three classes. The current tree matches.
    - **Proof:** Not applicable.

## Across the unit

### Scope

Every path in `conform-guide.status` is under the brief's Owned scope. No status entry is shared or off-limits.

Owned paths: `README.md`, `guides/README.md`, `guides/guide.md`, `src/core/Guide.ts`, `src/core/constants.ts`, `src/core/factories.ts`, `src/core/helpers.ts`, `src/core/parsers.ts`, `src/core/shapers.ts`, `src/core/sources/Source.ts`, `src/core/sources/SourceManager.ts`, `src/core/types.ts`, `src/core/validators.ts`, all six listed fixture files, `tests/guides.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`, deleted `tests/setupServer.test.ts`, deleted `tests/setupServer.ts`, and the eight listed core test files.

Every diff hunk belongs to a file named by at least one row's scope. No hunk has a file outside the row set. The `README.md:30` wording change is an extra hunk within a row-owned file.

### Residue

- Diff `+`-line sweep: `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` — no hits.
- Tree sweep over `src` and `tests`, excluding the four vendored files named in the brief:
  - `src/core/helpers.ts:382` — lexical handling of the `debugger` token.
  - `tests/src/core/helpers.test.ts:158`, `:164` — lexical fixture and test title.
  - `tests/src/core/sources/Source.test.ts:47` — lexical fixture.
- These are pre-existing lexical-test content, not diff residue. The report does not record this required tree sweep.

### Parity

| Entity | Interface members in `types.ts` | Guide method rows | Readonly data |
|---|---|---|---|
| `GuideInterface` | `sections` `:108`, `surface` `:114`, `methods` `:120`, `links` `:130`, `tests` `:138`, `fences` `:148` | `guides/guide.md:202-207` | none |
| `SourceInterface` | `exports` `:170`, `surface` `:210`, `methods` `:233`, `exists` `:242`, `hidden` `:261`, `examples` `:269`, `:293` | `guides/guide.md:213-218` | none |
| `SourceManagerInterface` | `source` `:345`, `sources` `:352` | `guides/guide.md:245-246` | none |
| `Guide` | `sections` `:52`, `surface` `:56`, `methods` `:60`, `links` `:64`, `tests` `:68`, `fences` `:72` | `guides/guide.md:202-207` | `#sections`, `#surface`, `#methods`, `#links`, `#tests`, `#fences` |
| `Source` | `exports` `:83`, `surface` `:90`, `methods` `:96`, `exists` `:104`, `hidden` `:112`, `examples` `:117` | `guides/guide.md:213-218` | `#files`, `#directories`, cached fields |
| `SourceManager` | `source` `:35`, `sources` `:48` | `guides/guide.md:245-246` | `#files`, `#modules`, `#sources` |

`SurfaceSymbol` declares `name` and `keyword` at `src/core/types.ts:18-19`; the guide Types row is `guides/guide.md:35`. `SourceOptions` declares `files` and `module` at `:308-313`; `SourceManagerOptions` declares `files` and `modules` at `:320-327`; their guide rows are `guides/guide.md:48-49`. `Declaration` retains `body` and `bases` at `src/core/types.ts:374-378`; its guide row is `guides/guide.md:48`.

The changed guide's backticked API identifiers resolve through `src/core/index.ts:1-10`: `ExportKeyword`, `SurfaceSymbol`, `DeclarationKeyword`, `EXPORT_KEYWORDS`, `isExportKeyword`, `surfaceSymbolShape`, `createGuide`, `createSource`, `createSourceManager`, `createSurfaceSymbolContract`, `parseManifest`, `computeSymbolKey`, `extractDeclaration`, `extractSurface`, `extractMethods`, `extractLinks`, `extractTests`, `extractFences`, `isExternalLink`, `resolveLink`, `resolvePath`, and the other documented helper/factory names. `Kind` remains only the markdown table-header data read by `findKindIndex`; method names such as `surface()` and `sources()` are members, not barrel exports.

### Gates

The report's § Gates records these commands and exits verbatim:

| Command | Exit |
|---|---:|
| `npm --prefix /home/user/fleet/guide run format:check` | 0 |
| `npm --prefix /home/user/fleet/guide run lint:check` | 0 |
| `npm --prefix /home/user/fleet/guide run check` | 0 |
| `npm --prefix /home/user/fleet/guide run build` | 0 |
| `npm --prefix /home/user/fleet/guide test` | 0 |
| `cd /home/user/fleet/guide && npx scaffold audit --offline` | 0 |

The corresponding files exist under `/home/user/work/evidence/guide-proofs/`. `gate-test.txt` records `src:core` 378 passed, policy 111 passed, config 46 passed, setup 7 passed, and guides 42 passed. No independent gate run was made in this read-only pass.

### Breaking

The old public names have no hits in `/home/user/fleet/guide` after excluding the guide repository itself. The scaffold source sweep also has no hits.

The old `symbol.kind` consumer form remains in these fleet tests:

- `/home/user/fleet/terminal/tests/guides.test.ts:124`
- `/home/user/fleet/rater/tests/guides.test.ts:144`
- `/home/user/fleet/interpret/tests/guides.test.ts:186`
- `/home/user/fleet/middleware/tests/guides.test.ts:126`
- `/home/user/fleet/markdown/tests/guides.test.ts:161`
- `/home/user/fleet/qualifier/tests/guides.test.ts:131`
- `/home/user/fleet/sea/tests/guides.test.ts:136`
- `/home/user/fleet/router/tests/guides.test.ts:139`
- `/home/user/fleet/form/tests/guides.test.ts:192`
- `/home/user/fleet/table/tests/guides.test.ts:181`
- `/home/user/fleet/database/tests/guides.test.ts:659`
- `/home/user/fleet/pool/tests/guides.test.ts:122`
- `/home/user/fleet/process/tests/guides.test.ts:418`
- `/home/user/fleet/console/tests/guides.test.ts:160`
- `/home/user/fleet/reason/tests/guides.test.ts:159`
- `/home/user/fleet/websocket/tests/guides.test.ts:131`
- `/home/user/fleet/html/tests/guides.test.ts:170`
- `/home/user/fleet/template/tests/guides.test.ts:140`
- `/home/user/fleet/tool/tests/guides.test.ts:121`
- `/home/user/fleet/sqlite/tests/guides.test.ts:124`
- `/home/user/fleet/timeout/tests/guides.test.ts:126`
- `/home/user/fleet/csv/tests/guides.test.ts:137`
- `/home/user/fleet/emitter/tests/guides.test.ts:123`
- `/home/user/fleet/msg/tests/guides.test.ts:166`
- `/home/user/fleet/indexeddb/tests/guides.test.ts:126`
- `/home/user/fleet/contract/tests/guides.test.ts:138`
- `/home/user/fleet/test/tests/guides.test.ts:243`
- `/home/user/fleet/budget/tests/guides.test.ts:122`
- `/home/user/fleet/abort/tests/guides.test.ts:121`
- `/home/user/fleet/ndjson/tests/guides.test.ts:124`
- `/home/user/fleet/sse/tests/guides.test.ts:127`
- `/home/user/fleet/workspace/tests/guides.test.ts:120`
- `/home/user/fleet/workflow/tests/guides.test.ts:131`
- `/home/user/fleet/worker/tests/guides.test.ts:139`
- `/home/user/fleet/toolbox/tests/guides.test.ts:125`
- `/home/user/fleet/server/tests/guides.test.ts:120`
- `/home/user/fleet/relation/tests/guides.test.ts:120`
- `/home/user/fleet/queue/tests/guides.test.ts:120`
- `/home/user/fleet/program/tests/guides.test.ts:120`
- `/home/user/fleet/ollama/tests/guides.test.ts:120`
- `/home/user/fleet/mcp/tests/guides.test.ts:641`
- `/home/user/fleet/lsp/tests/guides.test.ts:173`
- `/home/user/fleet/codec/tests/guides.test.ts:171`
- `/home/user/fleet/browser/tests/guides.test.ts:131`
- `/home/user/fleet/brief/tests/guides.test.ts:166`
- `/home/user/fleet/agent/tests/guides.test.ts:120`

The required consumer edit is:

`symbol.kind` → `symbol.keyword`.

### Writing sweep

- Added prose `+` lines in `guides/**`, `README.md`, source comments, and test comments:
  - banned-word pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`: no hits.
  - count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`: no hits.
- The report does not include these required writing-sweep results.

# Distillate

- `guide-obj-1: site now flagship transcriptions and guards exist | diff present yes | old form hits 0 | report matches yes`
- `guide-obj-2: site now FI, LI, and TE non-vacuousness guards exist | diff present yes | old form hits 0 | report matches yes`
- `guide-obj-3: site now isBrowserVuePath is absent and remaining setup helpers remain | diff present yes | old form hits 0 | report matches yes`
- `guide-obj-4: site now requireText moved and setupServer files deleted | diff present yes | old form hits 4 gated vendored references | report matches yes`
- `guide-obj-5: site now file-or-directory exists contract and guide wording | diff present yes | old form hits 0 | report matches yes`
- `guide-obj-6: site now DeclarationKeyword is centralized and used | diff present yes | old form hits 0 duplicate signatures | report matches yes`
- `guide-obj-7: site now README lists fences() | diff present yes | old form hits 0 | report matches yes`
- `guide-obj-8: site now retired runtime-surface test is absent | diff present yes | old form hits 0 | report matches yes`
- `guide-obj-9: site now README API parity case exists | diff present yes | old form hits 0 | report matches yes`
- `guide-subj-1: site now citations use named rules/headings | diff present yes | old form hits 0 | report matches yes`
- `guide-subj-2: site now named counts are removed | diff present yes | old form hits 0 | report matches yes`
- `guide-subj-3: site now imperative wording replaces should | diff present yes | old form hits 0 | report matches yes`
- `guide-subj-4: site now through replaces via | diff present yes | old form hits 0 | report matches yes`
- `guide-subj-5: site now for example replaces e.g. | diff present yes | old form hits 0 | report matches yes`
- `guide-subj-7: site now required TSDoc tags exist | diff present yes | old form hits 0 | report matches yes`
- `guide-subj-8: site now alias wording is consistent | diff present yes | old form hits 0 | report matches yes`
- `guide-subj-9: site now prose uses checkable facts | diff present yes | old form hits 0 | report matches yes`
- `guide-subj-10: site now measurement and obsolete history are absent | diff present yes | old form hits 0 | report matches yes`
- `guide-subj-11: site now slogan and changed shouted prose are repaired | diff present yes | old form hits 0 changed-prose hits | report matches yes`
- `guide-subj-12: site now public symbol axis is keyword | diff present yes | old public-name hits 0; stale generic kind hit 1 | report matches no, incomplete at src/core/types.ts:104`
- `guide-subj-13: site now Guide is described as pure | diff present yes | old form hits 0 | report matches yes`
- `guide-subj-15: site now sources() is declared, implemented, documented, and tested | diff present yes | old form hits 0 | report matches yes`
- `fleet-F1: site now helper absent while setup axis remains | diff present yes through guide-obj-3 | old form hits 0 | report matches yes`
- `fleet-F2: site now no public readonly id class field exists | diff present no, noop | old form hits 0 | report matches yes`

Scope tags: every status path is `owned`; no shared or off-limits path appears.

Residue hits: `src/core/helpers.ts:382`, `tests/src/core/helpers.test.ts:158`, `:164`, and `tests/src/core/sources/Source.test.ts:47`, all lexical-test content.

Writing hits: none in the required added-line sweeps.

Parity: `GuideInterface` has `sections`, `surface`, `methods`, `links`, `tests`, `fences`; `SourceInterface` has `exports`, `surface`, `methods`, `exists`, `hidden`, `examples`; `SourceManagerInterface` has `source`, `sources`. These match the guide tables at `guides/guide.md:202-218` and `:245-246`. `SurfaceSymbol` exposes `name` and `keyword`, documented at `guides/guide.md:35`. All intentional top-level identifiers resolve through `src/core/index.ts:1-10`.

# Unknowns

- The report's claim about an appended auto-mode block in the scaffold documentation rule cannot be verified: the full current `/home/user/scaffold/.claude/rules/documentation.md` read contains no such block.
- Independent current gate execution was not performed; the gate readings are the supplied evidence files.
- `ROADMAP.md` is absent from `/home/user/fleet/guide`; it was not an input to this unit.
- The diff exceeded the single-read output limit, but all diff hunk headers and relevant hunks were reached through bounded reads and searches.

# Journal

Driver journal.

# Deviation

No tree change was made or detected in the supplied status and diff evidence. The report omits the required residue and writing sweeps, and `src/core/types.ts:104` retains the stale generic `kind` wording.