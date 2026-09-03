I’m checking the canon rules and the current evidence artifacts before mapping each row. I will keep the result to the brief’s named sections.# Question
For each conformance row, map the current tree, its diff, old-form sweeps, and the report’s reading.

# Evidence

## Per-row entries

1. **database-subj-1**
   - **Site now:** `src/core/Table.ts:206` reads `Unlike {@link count}, \`aggregate\` operates...`; context: `:205` is `@remarks`, `:207` begins the contract-guard explanation.
   - **Diff:** `conform-database.diff:898` — `@@ -203,7 +203,7 @@`; `+ * Unlike {@link count}, \`aggregate\` operates...` is present.
   - **Old-form sweep:** `Like \{@link count\}` over `src`, `tests`, `guides/database.md`, `guides/README.md`, `README.md`: no hit.
   - **Rule:** “Falsify a prose claim the way you falsify a code claim.”
   - **Report:** `applied`; “`src/core/Table.ts` aggregate `@remarks` now opens `Unlike {@link count}`, matching `src/core/types.ts` and the guarded `count` body.” (`conform-database-report.md:6`)
   - **Proof:** No row-specific control file or failing-first command is recorded.

2. **database-subj-2**
   - **Site now:** `guides/database.md:1871-1874` states that a `Table` receives `DatabaseOptions.error`; context: `:1870` ends the emit-safety paragraph, `:1875` begins importing/exporting schemas.
   - **Diff:** `conform-database.diff:566` — `@@ -1831,15 +1861,17 @@`; the added parenthetical is present at diff lines `578-582`.
   - **Old-form sweep:** `does not thread an \`error\` handler` over the required paths: no hit.
   - **Rule:** “Falsify a prose claim the way you falsify a code claim.”
   - **Report:** `applied`; “`guides/database.md` Observing parenthetical rewritten to the refuter's form. The corrected claim is already executed by `tests/src/core/Table.test.ts`.” (`conform-database-report.md:7`)
   - **Proof:** No named control file or failing-first command is recorded; the cited existing test is not a failing-first receipt.

3. **database-subj-3**
   - **Site now:** `guides/database.md:363-370` contains `#### \`AdmissionInterface\`` and the `track` row; context: `:362` is the `DatabaseStorageInterface` table, `:371` begins `TableInterface`. `src/core/types.ts:154-161` contains the interface example; context: `:153` ends the remarks, `:162` ends the fence.
   - **Diff:** `conform-database.diff:319` — `@@ -363,6 +360,15 @@`; the added heading, lead, table, and `track` row are present. `conform-database.diff:1089` — `@@ -148,6 +148,17 @@`; the `track` example is present.
   - **Old-form sweep:** Missing `AdmissionInterface` method-table form over the required paths: no remaining omission; `AdmissionInterface` and `track` are present.
   - **Rule:** “The table's methods exactly match the interface's call-signature members.”
   - **Report:** `applied`; “`#### \`AdmissionInterface\`` table added at `guides/database.md:363-370`; `track` example fence added beside the admission-ledger paragraph; `@example` added to the interface.” (`conform-database-report.md:8`)
   - **Proof:** `subj-3-subj-10-guides-before.txt:57-58` records `2 failed | 66 passed (68)` for `npm ... run test:guides`; `subj-3-subj-10-obj-6-guides-after.txt:12-13` records `81 passed (81)`. The control files exist and match the report.

4. **database-subj-4**
   - **Site now:** `README.md:26-29` reads `Pre-release: ...`; context: `:25` is `## Status`, `:30` begins the package section.
   - **Diff:** `conform-database.diff:5` — `@@ -23,7 +23,7 @@`; the `0.0.7` parenthetical is absent.
   - **Old-form sweep:** `Pre-release \(\`0\.0\.\d+\`\)` over the required paths: no hit.
   - **Rule:** “Claim only what the reader can check.”
   - **Report:** `applied`; “`README.md:26` reads `Pre-release: the core engine…`; the `0.0.7` parenthetical is gone and no version was substituted.” (`conform-database-report.md:9`)
   - **Proof:** Placement/documentation sweep agrees.

5. **database-subj-5**
   - **Site now:** `guides/database.md:293` reads `per-instance method surface (see \`.claude/rules/documentation.md\` § Parity)`; context: `:292` ends the preceding sentence, `:295` begins `StorageInterface`. `guides/README.md:4` and `:58` use named sections.
   - **Diff:** Relevant citation hunks include `guides/README.md` `@@ -1,7 +1,7 @@` and `@@ -55,4 +55,4 @@`; `guides/database.md` `@@ -286,11 +286,11 @@`, `@@ -428,7 +434,8 @@`, `@@ -455,13 +462,14 @@`, `@@ -482,8 +490,8 @@`, `@@ -508,7 +516,8 @@`, `@@ -583,8 +592,9 @@`, `@@ -617,12 +627,13 @@`, `@@ -658,10 +669,10 @@`, `@@ -756,15 +768,15 @@`, `@@ -843,7 +855,7 @@`, `@@ -1072,8 +1084,9 @@`, `@@ -1437,13 +1450,29 @@`, `@@ -1491,7 +1520,7 @@`, `@@ -1778,12 +1807,13 @@`, `@@ -2122,8 +2154,9 @@`, `@@ -2397,8 +2430,8 @@`, and `@@ -2420,5 +2457,5 @@`; named replacements are present.
   - **Old-form sweep:** `AGENTS §|§[0-9]+` over `src`, `tests`, `guides/database.md`, `guides/README.md`, `README.md`: no hit.
   - **Rule:** “NEVER name a list item by its position.”
   - **Report:** `applied`; “Every in-subject `AGENTS §N` / bare `§N` citation replaced with its named rule section or deleted. Sweep clean.” (`conform-database-report.md:10`)
   - **Proof:** Placement/documentation sweep agrees.

6. **database-subj-6**
   - **Site now:** `src/core/helpers.ts:710`, `:713`, `:717-718` use `requireColumns`; context: `:709` opens the example fence, `:719` reads `const columns = tables[name]`. `Database.ts:23,71,86,155`, `DatabaseTransaction.ts:14,56`, the guide, and its test use the new name.
   - **Diff:** `helpers.ts` `@@ -707,15 +707,15 @@`; `Database.ts` `@@ -17,13 +17,13 @@`, `@@ -68,7 +7,7 @@`, `@@ -83,7 +83,7 @@`, `@@ -152,7 +152,7 @@`; `DatabaseTransaction.ts` `@@ -9,10 +9,10 @@`, `@@ -53,7 +53,7 @@`. The declaration, overloads, calls, guide row, and test use `requireColumns`.
   - **Old-form sweep:** `\bresolveColumns?\b|\bresolvecolumn(s|ed|ing)\b` over the required paths: no hit.
   - **Rule:** “`resolve*` picks the effective value from options and defaults.”
   - **Report:** `applied`; “`resolveColumns` renamed `requireColumns` at its declaration, overloads, TSDoc, `@example`, both call sites, its test, and both guide sites. BREAKING — see § Breaking.” (`conform-database-report.md:11`)
   - **Proof:** Placement/naming sweep agrees. No fleet source hit exists outside this package.

7. **database-subj-7**
   - **Site now:** `src/core/helpers.ts:1835-1836` reads `Consumes only the first value \{@link scanDriver\} yields`; context: `:1834` is the remarks opener, `:1837` continues the lazy-generator explanation.
   - **Diff:** `conform-database.diff:1062` — `@@ -1832,9 +1832,9 @@`; the operative replacement is present.
   - **Old-form sweep:** `A thin driver over \{@link scanDriver\}` over the required paths: no hit.
   - **Rule:** “One concept, one term.”
   - **Report:** `applied`; “`src/core/helpers.ts` `conformDriver` `@remarks` opens `Consumes only the first value \{@link scanDriver\} yields`.” (`conform-database-report.md:12`)
   - **Proof:** Placement/documentation sweep agrees.

8. **database-subj-8**
   - **Site now:** The former `via`/`simply`/`just`/`e.g.` sites in `src/**/*.ts` and `guides/database.md` use `through`, `for example`, deletion, or sense-specific replacements. The former `via` site in `src/core/types.ts:197` is now `:208`: `Subscribe through \`database.emitter.on(...)\``; context: `:207` describes the rollback event, `:209` begins the type-alias note.
   - **Diff:** Source substitution hunks include `IndexedDBDriver.ts` `@@ -69,7 +69,7 @@`, `@@ -83,7 +83,7 @@`; `browser/helpers.ts` `@@ -28,7 +28,7 @@`, `@@ -153,7 +153,7 @@`; `Cursor.ts` `@@ -6,7 +6,7 @@`; `errors.ts` `@@ -2,7 +2,7 @@`, `@@ -17,7 +17,7 @@`; `factories.ts` `@@ -10,8 +10,8 @@`; `helpers.ts` `@@ -130,7 +130,7 @@`, `@@ -262,7 +262,7 @@`, `@@ -356,7 +356,7 @@`, `@@ -1124,7 +1124,7 @@`, `@@ -1194,7 +1194,7 @@`, `@@ -1564,7 +1564,7 @@`; `MemoryDriver.ts` `@@ -31,7 +31,7 @@`, `@@ -115,7 +115,7 @@`; `compilers.ts` `@@ -417,7 +417,7 @@`; `constants.ts` `@@ -17,7 +17,7 @@`; `server/types.ts` `@@ -30,7 +30,7 @@`; `SQLiteDriver.ts` `@@ -77,7 +77,7 @@`, `@@ -85,11 +85,11 @@`, `@@ -284,7 +284,7 @@`; and the guide substitution hunks. Added lines contain no residue-pattern hit.
   - **Old-form sweep:** `\b(via|simply|just|easy|easier|leverage|utilize)\b|e\.g\.|i\.e\.|etc\.` over all required paths has 15 occurrences, all in tests outside the repair scope: `tests/src/browser/drivers/IndexedDBDriver.test.ts:393,1002,1024,2033`; `tests/src/core/helpers.test.ts:219`; `tests/src/server/drivers/SQLiteDriver.test.ts:736,2684`; `tests/src/core/Query.test.ts:240`; `tests/src/core/Table.test.ts:459,571`; `tests/src/core/Database.test.ts:907,909` (`:909` has `via` and `e.g.`); `tests/src/server/compilers.test.ts:207,486`.
   - **Rule:** The substitution table maps `via` to `through`, `simply`/`just`/`easy` to deletion, and `e.g.`/`i.e.` to expanded wording.
   - **Report:** `applied`; “Substitution sweep over `src/**` and the guides rewritten by table row and by sense. Sweep clean over the declared paths.” (`conform-database-report.md:13`)
   - **Proof:** Report and repair-scope sweep agree; the broader required sweep retains the recorded test-only residue.

9. **database-subj-9**
   - **Site now:** `guides/database.md:2393-2394` puts `import type { IndexedDBError ... }` before the value import; context: `:2392` opens the fence, `:2395` declares `fault`.
   - **Diff:** `conform-database.diff:615` — `@@ -2357,8 +2390,8 @@`; the type import is the first import.
   - **Old-form sweep:** `^import \{[^\n]*\n(import [^\n]*\n)*import type ` over `src`, `guides/database.md`: no hit.
   - **Rule:** “Place `import type` declarations before value imports.”
   - **Report:** `applied`; “`guides/database.md` IndexedDB error-mapping fence puts `import type { IndexedDBError }` first.” (`conform-database-report.md:14`)
   - **Proof:** Placement sweep agrees.

10. **database-subj-10**
    - **Site now:** `guides/database.md:317-343` includes the `DriverInterface` table and `:343` contains `transaction`; context: `:316` is the table lead, `:344` begins `DatabaseInterface`. The former exception paragraph is gone.
    - **Diff:** `conform-database.diff:250` — `@@ -322,40 +322,37 @@`; the `transaction` row is present and the exception is removed.
    - **Old-form sweep:** Former exception text `installed guide parser does not classify an optional generic signature` over the required paths: no hit.
    - **Rule:** “The table's methods exactly match the interface's call-signature members.”
    - **Report:** `applied`; “Applied as the § Successor note's carrier... the re-staged `@orkestrel/guide` does extract `transaction?<R>`, so the parity gate demanded it.” (`conform-database-report.md:15`)
    - **Proof:** `subj-3-subj-10-guides-before.txt:57-58` records `2 failed | 66 passed (68)`; `subj-3-subj-10-obj-6-guides-after.txt:12-13` records `81 passed (81)`. The control files exist and match.

11. **database-subj-11**
    - **Site now:** `src/core/types.ts:687` still declares `count`; `:699` still declares `aggregate`; context: `:686` ends `records`, `:700` opens aggregate documentation. The divergence remains documented at `:702-706`.
    - **Diff:** No diff hunk; the row directs no edit.
    - **Old-form sweep:** No removed or renamed form; no sweep applicable.
    - **Rule:** “When several distinct tallies coexist, name each fact.”
    - **Report:** `noop`; “No edit, as the row directs. `count` and `aggregate` keep their names and the divergence stays documented at `src/core/types.ts`.” (`conform-database-report.md:17`)
    - **Proof:** No control file is required for the directed no-op.

12. **database-obj-1**
    - **Site now:** `src/server/helpers.ts:28` begins filesystem classification; the removed symbol and heading no longer exist. Context: `:27` is the import block, `:29` opens the next TSDoc block. Direct `findColumn` use remains at `:233`. The guide and test no longer contain `findColumnStorage`.
    - **Diff:** `conform-database.diff:1389` — `@@ -25,29 +25,6 @@`; the declaration and TSDoc are deleted. `tests/src/server/helpers.test.ts` uses `@@ -469,25 +468,3 @@`; its test block is deleted. The guide deletion is in `@@ -108,7 +109,6 @@`.
    - **Old-form sweep:** `\bfindColumnStorage\b` over the required paths: no hit.
    - **Rule:** “Delete one-line delegates... and wrappers around semantically identical ... primitives.”
    - **Report:** `applied`; “`findColumnStorage` and its TSDoc deleted with the `// === Schema lookups` heading; test import, `describe` block, and guide Surface row deleted. BREAKING — see § Breaking.” (`conform-database-report.md:20`)
    - **Proof:** Naming sweep agrees. Sibling vendored guides retain the old row, as scoped.

13. **database-obj-2**
    - **Site now:** `src/core/index.ts:9` exports `DriverIterator`; context: `:8` exports `Database`, `:10` exports `MemoryDriver`. `guides/database.md:83` documents the class. `JSONDriver.ts` and `SQLiteDriver.ts` import it through `@src/core`. The `INTERNAL` list at `tests/guides.test.ts:86-94` omits it.
    - **Diff:** `src/core/index.ts` `@@ -6,4 +6,5 @@`; `JSONDriver.ts` `@@ -13,6 +14,7 @@` plus the core import and `@@ -29,7 +30,6 @@` deletes the deep import; `SQLiteDriver.ts` has the analogous import hunks; `DriverIterator.ts` `@@ -7,6 +7,27 @@` adds the example; guide entity table `@@ -77,13 +77,14 @@`; tests internal list `@@ -51,7 +51,6 @@`.
    - **Old-form sweep:** `../../core/DriverIterator.js` and `'class DriverIterator'` over the required paths: no hit.
    - **Rule:** “Barrel that class when a consumer can construct it from values they already hold.”
    - **Report:** `applied`; “`DriverIterator` barrelled; both deep relative imports folded into each file's `@src/core` value import; INTERNAL entry and comment name removed; Surface row and `@example` added.” (`conform-database-report.md:21`)
    - **Proof:** Placement/export sweep agrees. The report’s build inspection says the server bundle no longer contains a second class copy (`conform-database-report.md:160-163`).

14. **database-obj-4**
    - **Site now:** `Database.ts:20`, `Table.ts:17`, `DatabaseTransaction.ts:12`, and `IndexedDBDriver.ts:1-19` place type imports before value imports. Context at each site is the next value-import line: `Database.ts:21`, `Table.ts:18`, `DatabaseTransaction.ts:13`, `IndexedDBDriver.ts:20`.
    - **Diff:** `Database.ts` `@@ -17,13 +17,13 @@`; `Table.ts` `@@ -14,6 +14,7 @@` and `@@ -30,7 +31,6 @@`; `DatabaseTransaction.ts` `@@ -9,10 +9,10 @@`; `IndexedDBDriver.ts` `@@ -9,6 +9,14 @@` and `@@ -28,15 +36,7 @@`. The moved declarations are present in the type blocks.
    - **Old-form sweep:** Multiline import-order pattern over `src`: no hit.
    - **Rule:** “Place `import type` declarations before value imports.”
    - **Report:** `applied`; “Every `import type` in the four named files moved above the first value import.” (`conform-database-report.md:22`)
    - **Proof:** Placement sweep agrees.

15. **database-obj-5**
    - **Site now:** `tests/src/core/DatabaseContext.test.ts`, `DatabaseTransaction.test.ts`, `TransactionScope.test.ts`, and `tests/src/server/factories.test.ts` exist. Their guide rows are present at `guides/database.md:2442-2445`. Context: `:2441` is the preceding factory row, `:2446` begins the next test row.
    - **Diff:** New-file hunks are `@@ -0,0 +1,354 @@`, `@@ -0,0 +1,134 @@`, `@@ -0,0 +1,152 @@`, and `@@ -0,0 +1,88 @@`; guide hunk `@@ -2397,8 +2430,8 @@` adds the rows.
    - **Old-form sweep:** No removed or renamed form; no hit.
    - **Rule:** “Mirror module/application structure.”
    - **Report:** `applied`; “Four mirrored test files added and collected by the existing globs; one guide `## Tests` row each.” (`conform-database-report.md:23`)
    - **Proof:** No failing-first command or row-specific control file is recorded. The later whole-suite receipt is green but does not provide the required red-before-green proof for these additions.

16. **database-obj-6**
    - **Site now:** `tests/guides.test.ts:350-545` contains flagship-fence transcriptions; context: `:349` ends the executable-fence block, `:546` continues the existing guide tests. The assertions cite guide lines and use real core/server implementations.
    - **Diff:** `conform-database.diff:1505` — `@@ -312,6 +347,195 @@`; the flagship blocks and imports are present.
    - **Old-form sweep:** No removed or renamed form; no hit.
    - **Rule:** “Transcribe each flagship fence and assert the values its comments claim.”
    - **Report:** `applied`; “`describe('flagship fences: …')` blocks added to `tests/guides.test.ts`, transcribing every fence that states a value. Mutation control run.” (`conform-database-report.md:24`)
    - **Proof:** `obj-6-flagship-control-red.txt:55-56` records `2 failed | 79 passed (81)`; `subj-3-subj-10-obj-6-guides-after.txt:12-13` records `81 passed (81)`. The red control and green result exist and match.

17. **database-obj-7**
    - **Site now:** `tests/setupBrowser.ts:44` defaults to `database-idb`; `tests/setupBrowser.test.ts:37-38` tests that prefix; browser tests use `database-idb...`. Context: `setupBrowser.ts:43` is the parameter documentation, `:45` increments the counter.
    - **Diff:** `setupBrowser.ts` `@@ -38,10 +38,10 @@`; setup test `@@ -28,14 +28,14 @@`; browser driver hunks `@@ -27,7 +27,7 @@`, `@@ -35,7 +35,7 @@`, `@@ -74,7 +74,7 @@`, `@@ -370,7 +370,7 @@`, `@@ -422,7 +422,7 @@`, `@@ -520,7 +520,7 @@`, `@@ -637,7 +637,7 @@`, `@@ -698,7 +698,7 @@`, `@@ -745,7 +745,7 @@`, `@@ -877,7 +877,7 @@`, `@@ -952,7 +952,7 @@`, `@@ -1448,7 +1448,7 @@`, `@@ -1538,7 +1538,7 @@`, `@@ -1611,7 +1611,7 @@`, `@@ -1938,7 +1938,7 @@`, and `@@ -1974,7 +1974,7 @@`; browser factory and integration hunks also replace the prefixes.
    - **Old-form sweep:** `\b(taverna|tavernas|tavernaed|tavernaing)\b` over the required paths: no hit.
    - **Rule:** “Never import assumptions, names, or logic from another repository.”
    - **Report:** `applied`; “`taverna` replaced with `database` at every site; `npm run test:src:browser` green inside `test:src`. Sweep clean.” (`conform-database-report.md:28`)
    - **Proof:** Naming sweep agrees. No control file for `test:src:browser` is present.

18. **fleet-F1**
    - **Site now:** The database has `src/browser/` and `tests/setupBrowser.ts`; `isBrowserVuePath` is absent from `src` and `tests`.
    - **Diff:** No hunk.
    - **Old-form sweep:** `\bisBrowserVuePath\b` over `src` and `tests`: no hit.
    - **Rule:** “Keep everything generic/reusable and free of unrelated-project logic.”
    - **Report:** `noop`; “The addendum's ruling: database **has** a browser environment... `isBrowserVuePath` is absent from the tree entirely.” (`conform-database-report.md:29`)
    - **Proof:** The tree reading agrees.

19. **fleet-F2**
    - **Site now:** The listed implementation classes have private `#` fields; none declares a public `readonly id: string` data field. The only public error fields are `code` and `context`.
    - **Diff:** No hunk.
    - **Old-form sweep:** `readonly id: string` in implementation classes over `src`: no matching class field.
    - **Rule:** “Class order puts `#` fields first and the public interface as getters then methods.”
    - **Report:** `noop`; “No implementation class declares a public `readonly id: string` data field.” (`conform-database-report.md:30`)
    - **Proof:** The class-shape reading agrees.

## Across the unit

### Scope

Status paths tagged against the brief:

- **Owned:** `README.md`; `guides/README.md`; `guides/database.md`; `src/browser/drivers/IndexedDBDriver.ts`; `src/browser/helpers.ts`; `src/core/Cursor.ts`; `src/core/Database.ts`; `src/core/DatabaseTransaction.ts`; `src/core/DriverIterator.ts`; `src/core/Table.ts`; `src/core/drivers/MemoryDriver.ts`; `src/core/errors.ts`; `src/core/factories.ts`; `src/core/helpers.ts`; `src/core/index.ts`; `src/core/types.ts`; `src/server/compilers.ts`; `src/server/constants.ts`; `src/server/drivers/JSONDriver.ts`; `src/server/drivers/SQLiteDriver.ts`; `src/server/helpers.ts`; `src/server/types.ts`; `tests/guides.test.ts`; `tests/setup.ts`; `tests/setupBrowser.test.ts`; `tests/setupBrowser.ts`; `tests/setupServer.ts`; `tests/src/browser/drivers/IndexedDBDriver.test.ts`; `tests/src/browser/factories.test.ts`; `tests/src/browser/integration.test.ts`; `tests/src/core/Database.test.ts`; `tests/src/core/DatabaseContext.test.ts`; `tests/src/core/DatabaseTransaction.test.ts`; `tests/src/core/Query.test.ts`; `tests/src/core/Table.test.ts`; `tests/src/core/TransactionScope.test.ts`; `tests/src/core/helpers.test.ts`; `tests/src/server/drivers/JSONDriver.test.ts`; `tests/src/server/drivers/SQLiteDriver.test.ts`; `tests/src/server/factories.test.ts`; `tests/src/server/helpers.test.ts`.
- **Shared:** none in the status file.
- **Off-limits:** `configs/browsers.ts`.

The only diff file without a row-named site or repair scope is `configs/browsers.ts`. Its hunks and first added lines are:

- `@@ -8,8 +8,8 @@` — `* Chromium executable layouts inside...`
- `@@ -27,17 +27,17 @@` — `/** The \`chromium-<revision>\` entry name...`
- `@@ -49,7 +49,7 @@` — `/** Stable Playwright Chromium channels...`
- `@@ -70,10 +70,10 @@` — `* Determine whether a path identifies...`
- `@@ -91,7 +91,7 @@` — `* Order two Chromium paths...`
- `@@ -114,7 +114,7 @@` — `* Read the executable path...`
- `@@ -137,7 +137,7 @@` — `* Resolve a launchable Playwright-managed...`
- `@@ -184,7 +184,7 @@` — `* Resolve the Chromium a managed Linux container...`
- `@@ -213,7 +213,7 @@` — `* Resolve the first installed stable system Chromium channel.`
- `@@ -257,7 +257,7 @@` — `* Resolve Playwright provider options...`

### Residue

The residue sweep over diff `+` lines with `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` returned no hits.

The same sweep over current `src` and `tests`, excluding the vendored policy/config/distribution files named by the brief, found:

- `src/server/drivers/SQLiteDriver.ts:101` — `timeout`; `:143` — `timeout`; `:1055` — `timeout`; `:1056` — `retryable`; `:1077` — `retryable`.
- `src/server/types.ts:30,43` — `timeout`.
- `src/core/types.ts:650` — `retry`.
- `src/core/helpers.ts:280` — `retry`; `:736` — `timeout`; `:1155,1880` — `console.`
- `src/browser/helpers.ts:51` — `IDBKeyRange.only(`.
- `src/server/factories.ts:55` — `timeout`.
- `tests/guides.test.ts:133` — `timeout`.
- `tests/setupBrowser.ts:19` — `retry`.
- `tests/src/browser/drivers/IndexedDBDriver.test.ts:1813` — `retry`.
- `tests/src/server/drivers/SQLiteDriver.test.ts:1317` — `retry`; `:1319` — `timeout`; `:1344` — `retryable`.
- `tests/src/server/drivers/JSONDriver.test.ts:458,568` — `retry`.
- `tests/src/core/Table.test.ts:252` — `retry`.
- `tests/src/core/Database.test.ts:986` — `retry`.
- `tests/src/core/drivers/MemoryDriver.test.ts:642` — `retry`.

### Writing sweep

The writing sweep over added prose, doc comments, test titles, and test comments found:

- `guides/database.md:650` — “returns a new view...”
- `tests/setup.ts:121` — “a new array...”
- `tests/src/core/DatabaseContext.test.ts:137` — “refuses new root work...”

The growable-set count pattern over those added prose lines returned no hits.

### Parity

| Entity/interface | Interface call-signature members | Guide method rows |
|---|---|---|
| `StorageInterface` | `read`, `write`, `insert`, `delete`, `keys`, `scan`, `clear`, `records?`, `aggregate?`, `stream?`, `migrate?`, `metadata?`, `stamp?` (`src/core/types.ts:373-390`) | `guides/database.md:303-315` |
| `DriverInterface` | inherited `StorageInterface` members plus `open`, `close`, `snapshot`, `transaction?` (`src/core/types.ts:416-437`) | `guides/database.md:327-343` |
| `DatabaseInterface` | `table`, `import`, `export`, `open`, `close`, `transaction`, `migrate` (`src/core/types.ts:617-650`) | `guides/database.md:349-355` |
| `DatabaseStorageInterface` | `table` (`src/core/types.ts:597-598`) | `guides/database.md:361` |
| `AdmissionInterface` | `track` (`src/core/types.ts:163-165`) | `guides/database.md:370` |
| `TableInterface` | `get`, `resolve`, `has`, `keys`, `records`, `count`, `aggregate`, `scan`, `set`, `add`, `update`, `remove`, `clear`, `query`, `cursor` (`src/core/types.ts:676-820`) | `guides/database.md:385-399` |
| `QueryInterface` | `condition`, `order`, `filter`, `limit`, `offset`, `collect`, `find`, `count`, `stream`, `aggregate` (`src/core/types.ts:835-853`) | `guides/database.md:409-418` |
| `CursorInterface` | `next`, `update`, `remove`, `close` (`src/core/types.ts:872-879`) | `guides/database.md:424-427` |

Readonly data properties remain in the Surface rows: `AdmissionInterface.accepting` at `guides/database.md:257`; `DatabaseInterface` data at `:280`; `TableInterface` data at `:281`; and `CursorInterface` data at `:283`.

Class implementations touched by the diff map to those interfaces as follows: `Database` → `DatabaseInterface`; `DatabaseTransaction` → `DatabaseStorageInterface`; `Table` → `TableInterface`; `Cursor` → `CursorInterface`; `MemoryDriver`, `JSONDriver`, `SQLiteDriver`, and `IndexedDBDriver` → `DriverInterface`. `DriverIterator` implements the platform `AsyncIterableIterator` contract and has no project `types.ts` interface or `## Methods` table; it has a class Surface row at `guides/database.md:83` and a runnable example.

Guide-added backticked API identifiers were checked against the barrels. Core identifiers, including `Database`, `DriverIterator`, `MemoryDriver`, `createDatabase`, `createMemoryDriver`, `requireColumns`, `computeAggregate`, `matchesWildcardPattern`, `matchesLikePattern`, `matchesGlobPattern`, `cloneDriverMetadata`, `compareValues`, `equalsValue`, `extractKey`, `filterRows`, `matchesCondition`, `matchesQuery`, `migrateRows`, `shapeToColumnStorage`, the core interfaces, types, and errors, resolve through `src/core/index.ts`. Server identifiers resolve through `src/server/index.ts`; browser identifiers resolve through `src/browser/index.ts`. `parseNumber`, `ContractShape`, `IDBKeyRange`, `IndexedDBError`, and SQLite substrate names are dependency or platform identifiers, not database-barrel exports. Rule paths, test paths, SQL literals, error-code literals, and interface member names are references or members rather than standalone barrel exports.

### Gates

The report records:

- `npm --prefix /home/user/fleet/database run format:check` — exit `0`; “All matched files use the correct format.”
- `npm --prefix /home/user/fleet/database run lint:check` — exit `0`; “no output.”
- `npm --prefix /home/user/fleet/database run check` — exit `0`; “root plus the three scoped isolation passes.”
- `npm --prefix /home/user/fleet/database run build` — exit `0`; “core, browser, server built; declarations emitted.”
- `npm --prefix /home/user/fleet/database test` — exit `0`; “`src` 969/969, `policy` 111/111, `config` 46/46, `setup` 63/63, `guides` 81/81.” (`conform-database-report.md:130-142`)

### Breaking

The report records:

- `resolveColumns` → `requireColumns`, surface `@orkestrel/database`: no fleet consumer source hit. (`conform-database-report.md:171-175`)
- `findColumnStorage` removed, surface `@orkestrel/database/server`: no fleet source consumer hit; nine sibling vendored guide mirrors retain the old text. (`conform-database-report.md:174-176`)
- `DriverIterator` added to the core barrel: additive, no consumer edit. (`conform-database-report.md:176-177`)

The required cross-fleet sweeps found no `resolveColumns` or `findColumnStorage` hit under fleet `src`/`tests` outside the database checkout, and no hit under `/home/user/scaffold/src`.

The report’s consumer-edit table also records producer-carried edits for `contract-subj-1`, `indexeddb-subj-1`, `sqlite-subj-1`, and `sqlite-subj-14` at `conform-database-report.md:32-39`.

### Shared-file patches

The report states: “None. Every edit landed inside Owned. No file outside `/home/user/fleet/database` was written, and no sibling checkout was touched.” (`conform-database-report.md:187-189`)

# Distillate

database-subj-1: `src/core/Table.ts:206` | diff present yes | old form hits 0 | report matches yes  
database-subj-2: `guides/database.md:1871-1874` | diff present yes | old form hits 0 | report matches yes  
database-subj-3: `guides/database.md:363-370`, `src/core/types.ts:154-161` | diff present yes | old form hits 0 | report matches yes  
database-subj-4: `README.md:26` | diff present yes | old form hits 0 | report matches yes  
database-subj-5: `guides/database.md:293`, `guides/README.md:4,58` | diff present yes | old form hits 0 | report matches yes  
database-subj-6: `src/core/helpers.ts:710,713,717-718` | diff present yes | old form hits 0 | report matches yes  
database-subj-7: `src/core/helpers.ts:1835-1836` | diff present yes | old form hits 0 | report matches yes  
database-subj-8: `src/core/types.ts:208`; repair scope clean, broader required sweep retains test hits | diff present yes | old form hits 15 | report matches yes  
database-subj-9: `guides/database.md:2393-2394` | diff present yes | old form hits 0 | report matches yes  
database-subj-10: `guides/database.md:317-343` | diff present yes | old form hits 0 | report matches yes  
database-subj-11: unchanged `src/core/types.ts:687,699` | diff present no | old form hits 0 | report matches yes  
database-obj-1: symbol deleted; next helper begins at `src/server/helpers.ts:28` | diff present yes | old form hits 0 | report matches yes  
database-obj-2: `src/core/index.ts:9`, `guides/database.md:83` | diff present yes | old form hits 0 | report matches yes  
database-obj-4: type-import blocks in four named files | diff present yes | old form hits 0 | report matches yes  
database-obj-5: four mirrored test files exist | diff present yes | old form hits 0 | report matches yes  
database-obj-6: flagship assertions in `tests/guides.test.ts:350-545` | diff present yes | old form hits 0 | report matches yes  
database-obj-7: `database-idb` prefixes in browser setup/tests | diff present yes | old form hits 0 | report matches yes  
fleet-F1: `isBrowserVuePath` absent; browser environment exists | diff present no | old form hits 0 | report matches yes  
fleet-F2: no public `readonly id` implementation field | diff present no | old form hits 0 | report matches yes  

Scope: all status paths are Owned except `configs/browsers.ts`, which is off-limits; no Shared status path appears.  
Residue: diff additions clean; current tree has the listed timeout/retry/console/only hits.  
Writing: added prose has `new` at `guides/database.md:650`, `tests/setup.ts:121`, and `tests/src/core/DatabaseContext.test.ts:137`; no growable-set count hits.  
Parity: method and Surface mappings are listed above.

# Unknowns

- No row-specific failing-first control is recorded for `database-subj-1`, `database-subj-2`, or `database-obj-5`.
- No independent evidence file records `format:check`, `lint:check`, `check`, or `build`; those readings come only from the writer’s report.
- No control file is present for the reported `test:src:browser` run for `database-obj-7`.
- The provenance of the `configs/browsers.ts` change is not established by the supplied evidence; the report calls it pre-existing, while the status and diff files list it as modified.

# Journal

# Journal — leave this line for the driver.

# Deviation

`configs/browsers.ts` is an off-limits modified path: `conform-database.status:2` lists `M configs/browsers.ts`, and `conform-database.diff:14-126` contains its hunks. This conflicts with the report’s statement that `git status --short -- configs/browsers.ts` is empty (`conform-database-report.md:152-155`). No file was unreadable, and no requested sweep was unreachable.