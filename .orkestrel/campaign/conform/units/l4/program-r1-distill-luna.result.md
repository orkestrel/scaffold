## Question
For each conform-program row, map the current tree, its diff, old-form sweeps, report reading, and available proof evidence.

## Evidence

Population used for sweeps: `src`, `tests`, `guides/program.md`, `guides/README.md`, and `README.md`; vendored test files and `node_modules` excluded.

### Per-row evidence

1. **program-obj-1**
   - **Site now:** Brief site `tests/setup.ts:445` is now `RecordingReason` at `tests/setup.ts:92-119`; `createRecordingEngine` is `tests/setup.ts:609-610`. The nested function is gone. Context includes `#inner`, `#destroyCount`, overloads, `isArray<Subject>`, and forwarding.
   - **Diff:** `tests/setup.ts` hunk `@@ -78,8 +89,64 @@ class FixedReason`; factory hunk `@@ -435,53 +607,7 @@ export interface RecordingEngineInterface`. The operative class and `return new RecordingReason(options)` are present.
   - **Old form sweep:** `rg '\bfunction reason\b|reason,'` over the package-owned population: no nested declaration or old shorthand return remains.
   - **Report:** `applied`; report line 33 says, “The nested `function reason` is gone.” The report’s `:81` and `:481` pointers are stale; the current sites are `:92` and `:609`.
   - **Proof:** `npm run test:setup`; red `9 failed, 76 passed (85)` in `obj1-obj2-obj5-setup-red.txt`; green `85 passed (85)` in `obj1-obj2-obj5-setup-green.txt`.

2. **program-obj-2**
   - **Site now:** Brief site `tests/setup.ts:494` is now `recordEvents` at `tests/setup.ts:618-640`; each emitter callback pushes its event name directly.
   - **Diff:** `@@ -491,16 +617,27 @@ export function recordEvents`; the `const record` assignment is removed and inline callbacks are present.
   - **Old form sweep:** `rg 'const record\s*=|record\('` over the owned test population: no local recorder remains.
   - **Report:** `applied`; report line 34 states that the arrow is gone and pushes are inline. The cited `:508-528` range is stale; the current range is `:618-640`.
   - **Proof:** Same setup control: red `9 failed, 76 passed (85)`; green `85 passed (85)`.

3. **program-obj-3**
   - **Site now:** `tests/guides.test.ts:192-260` contains `describe('flagship fences')`, executable Surface and batch transcriptions, and presence guards. Context at `:229-250` asserts the documented status, rating, count, and tallies.
   - **Diff:** `@@ -168,3 +181,84 @@`; the executable block and both presence assertions are present.
   - **Old form sweep:** No removed name applies. The copied fence strings are present in `guides/program.md:89-107` and `:127-139`.
   - **Report:** `applied`; report line 35 correctly describes the executable block. Its `:206-260` pointer overlaps the block but omits its actual start at `:192`.
   - **Proof:** `npm run test:guides`; red `2 failed, 24 passed (26)` in `obj3-guides-red.txt`; green `26 passed (26)` in `obj3-guides-green.txt`.

4. **program-obj-4**
   - **Site now:** The listed capture sites in `ProgramManager.test.ts`, `factories.test.ts`, `helpers.test.ts`, and `Program.test.ts` use `captureError`; representative sites are `ProgramManager.test.ts:40-44`, `factories.test.ts:27-30`, `helpers.test.ts:84-92`, and `Program.test.ts:405-419`.
   - **Diff:** Relevant hunks include `@@ -40,27 +37,20 @@`, `@@ -12,28 +18,21 @@`, `@@ -182,23 +81,14 @@`, and `@@ -402,28 +402,21 @@`. `captureError` imports and replacements are present.
   - **Old form sweep:** `rg 'let error: unknown|expect\.unreachable'` over `tests/src`, `tests/setup.ts`, and `tests/setup.test.ts`: no hit.
   - **Report:** `applied`; report line 36 is semantically correct. Its `Program.test.ts:410` pointer is stale; the JSON parse is inside the thunk at `:415-417`.
   - **Proof:** `npm run test:src:core`; red `7 failed, 209 passed (216)` in `obj4-obj6-src-core-red.txt`; green `216 passed (216)` in `obj4-obj6-src-core-green.txt`.

5. **program-obj-5**
   - **Site now:** Moved declarations are `tests/setup.ts:400`, `:414`, `:434`, with factories at `:532`, `:536`, `:540`, `:544`, and `:690`. Consumers import them from setup.
   - **Diff:** `@@ -328,6 +397,81 @@ class ResultClass`, `@@ -385,6 +529,34 @@ export function createResultClass`, and deletion hunk `@@ -73,98 +63,7 @@ describe('helpers')`. All five factory forms are present.
   - **Old form sweep:** `rg '\bOffContractValidationResult\b|\bScriptedQualifier\b|\bScriptedReason\b|\bbuildQualification\b|\bbuildDefinition\b'`: only the new `OffContractValidationResult` declaration remains; the removed local names have no hits.
   - **Report:** `applied`; report line 37 is semantically correct, but all cited declaration positions are stale. Current positions are listed above.
   - **Proof:** Same setup control: red `9 failed, 76 passed (85)`; green `85 passed (85)`.

6. **program-obj-6**
   - **Site now:** `tests/src/core/factories.test.ts:98-108` builds an invalid definition, proves default validation throws `DEFINITION`, then proves `{ validate: false }` accepts it and destroys both managers.
   - **Diff:** `@@ -67,53 +62,50 @@ describe('factories')`; the new assertions are present.
   - **Old form sweep:** No removed name applies.
   - **Report:** `applied`; report line 38 matches the current test range and behavior.
   - **Proof:** Same source-core control: red `7 failed, 209 passed (216)`; green `216 passed (216)`.

7. **program-obj-8**
   - **Site now:** `isBrowserVuePath` is absent from `tests/setup.ts` and `tests/setup.test.ts`; `rg 'isBrowserVuePath'` over the checkout excluding `node_modules` returns no hit. No `app/` or `.vue` population exists.
   - **Diff:** `tests/setup.test.ts` hunk `@@ -898,16 +1002,3 @@`; the helper proof and import are deleted.
   - **Old form sweep:** `rg '\bisBrowserVuePath\b'`: no hit.
   - **Report:** `applied`; report line 39 matches the tree.

8. **program-obj-9**
   - **Site now:** The exempt implementation remains at `src/core/helpers.ts:618-619`: `return String(resolveField(subject, partition) ?? '')`. The documented limitation remains at `:599-605` and `guides/program.md:349-350`.
   - **Diff:** The surrounding rename hunk is `@@ -610,8 +605,8 @@`; the sentinel expression itself has no operative replacement.
   - **Old form sweep:** Sentinel sweep `rg "resolveField\(subject, partition\).*?? ''"`: one intentional hit at `src/core/helpers.ts:619`.
   - **Report:** `noop (EXEMPT)`; report line 40 matches the tree and the ruling.

9. **program-subj-1**
   - **Site now:** The package-owned `AGENTS §N` citations are absent. Current affected prose includes `guides/README.md:3,58`, `guides/program.md:29,93,153,401,423`, `src/core/types.ts:194,239,252,354`, `src/core/helpers.ts:127`, `src/core/programs/Program.ts:165`, and `ProgramManager.ts:21,225`.
   - **Diff:** Relevant citation-removal hunks include `guides/README.md: @@ -1,6 +1,6 @@`, `guides/program.md: @@ -26,7 +26,7 @@`, `src/core/types.ts: @@ -191,7 +191,7 @@`, and the source comment hunks. The `guides/README.md:58` replacement is present.
   - **Old form sweep:** `rg 'AGENTS §'` over the owned population: no hit.
   - **Report:** `applied`; report line 41’s sweep is correct. Several listed line numbers are one or two lines stale because later documentation expanded.

10. **program-subj-2**
    - **Site now:** `STATUS_PRECEDENCE` is absent from `src/core/constants.ts`; `STATUSES` remains at `:8-14`. `helpers.ts:849` and `validators.ts:266` use `STATUSES`; links at `helpers.ts:835` and `validators.ts:251` target `STATUSES`.
    - **Diff:** `src/core/constants.ts` hunk `@@ -13,15 +13,6 @@`; helper hunk `@@ -849,8 +846,7 @@`; validator hunk `@@ -263,7 +263,7 @@`. The deletion and replacements are present.
    - **Old form sweep:** `rg '\bSTATUS_PRECEDENCE\b'`: no hit.
    - **Report:** `applied (BREAKING)`; report line 42 matches the implementation. Its `Program.test.ts` test pointer is near the current `STATUSES` assertion at `:1035-1037`.

11. **program-subj-3**
    - **Site now:** `buildNoticeDeterminations` is declared at `src/core/helpers.ts:201`; `buildLimitDeterminations` at `:241`; calls are at `Program.ts:322,340,413`; tests and guide rows use the new names.
    - **Diff:** Helper hunks `@@ -184,8 +179,8 @@`, `@@ -198,12 +193,12 @@`, `@@ -238,12 +233,12 @@`, and Program hunk `@@ -207,7 +319,7 @@`. Both renamed declarations and all shown call-site replacements are present.
    - **Old form sweep:** `rg '\b(buildNotices|buildLimits)\b'` and case-insensitive inflection sweep: no hit.
    - **Report:** `applied (BREAKING)`; report line 43 is semantically correct, but its `Program.ts:281,299,409` pointers are stale; current call sites are above.

12. **program-subj-4**
    - **Site now:** `ProgramManagerInterface.count` is `src/core/types.ts:396`; the class getter is `src/core/programs/ProgramManager.ts:110-113`. Tests use `manager.count`.
    - **Diff:** Type hunk `@@ -281,16 +382,174 @@`; class hunk `@@ -74,30 +74,134 @@`. The `size` member is removed and `count` is present.
    - **Old form sweep:** API-specific sweep `rg 'manager\.size|readonly size'`: no hit. Generic `.size` hits remain only for `Set.prototype.size` at `src/core/helpers.ts:536` and `tests/setup.test.ts:477`.
    - **Report:** `applied (BREAKING)`; report line 44 is semantically correct, but its `types.ts:387` and `ProgramManager.ts:118` pointers are stale.

13. **program-subj-5**
    - **Site now:** `src/core/errors.ts:44` reads “Determines whether a caught value is a {@link ProgramError}.”
    - **Diff:** `@@ -41,7 +41,7 @@ export class ProgramError`; the replacement is verbatim.
    - **Old form sweep:** `rg 'Checks whether' src`: no hit.
    - **Report:** `applied`; report line 45 matches the tree.

14. **program-subj-6**
    - **Site now:** `ProgramInterface` is `src/core/types.ts:242-351`; `ProgramManagerInterface` is `:386-554`. Implementations carry mirrored blocks at `Program.ts:148,168,196,230,257` and `ProgramManager.ts:78,96,116,137,158,182,228,250,267,300`.
    - **Diff:** Interface hunk `@@ -236,21 +236,122 @@`; manager-interface hunk `@@ -281,16 +382,174 @@`; implementation hunks `@@ -141,12 +144,81 @@` and `@@ -119,9 +223,64 @@`. Complete blocks, `@throws`, and package examples are present.
    - **Old form sweep:** No removed name applies; citation sweep `rg 'AGENTS §'` is empty.
    - **Report:** `applied`; report line 46 matches the documented blocks and current ranges.

15. **program-subj-7**
    - **Site now:** `guides/program.md:151` reads `` `emitter` / `count` + `has` / `program` / `programs` / `add` / `remove` / `destroy`. ``
    - **Diff:** Guide hunk `@@ -148,10 +148,10 @@`; the replacement is present.
    - **Old form sweep:** `rg '\bsize\b' guides/program.md`: no hit.
    - **Report:** `applied`; report line 47 matches.

16. **program-subj-8**
    - **Site now:** `guides/program.md:316-317` imports `assertProgramDefinition` before `assertProgramSubject`; the call is at `:328`.
    - **Diff:** Guide hunk `@@ -316,6 +313,7 @@`; `+ assertProgramDefinition,` is present.
    - **Old form sweep:** Missing-import form `rg 'assertProgramDefinition'` confirms both import and call.
    - **Report:** `applied`; report line 48 matches.

17. **program-subj-9**
    - **Site now:** `README.md:24` reads `- Node.js >= 22.12.0`; `package.json:101-103` remains `>=22.12.0`.
    - **Diff:** `README.md` hunk `@@ -21,15 +21,15 @@`; the replacement is present.
    - **Old form sweep:** `rg 'Node\.js >= 24' README.md`: no hit.
    - **Report:** `applied`; report line 49 matches.

18. **program-subj-10**
    - **Site now:** The token rewrites are at `src/core/helpers.ts:182-186,216-223,982`, `ProgramManager.ts:21`, and `guides/program.md:138`.
    - **Diff:** Helper hunks `@@ -184,8 +179,8 @@`, `@@ -218,14 +213,14 @@`, and `@@ -985,7 +981,7 @@`; manager hunk `@@ -18,7 +18,7 @@`; guide hunk `@@ -132,10 +132,10 @@`. Each follows the token with a noun.
    - **Old form sweep:** `rg '\b(Notice|Determination|LogicalDefinition|ProgramInterface|FieldPath)(s|es|ed|ing)\b'` case-insensitive: no hit.
    - **Report:** `applied`; report line 50 matches.

19. **program-subj-11**
    - **Site now:** The five changed prose sites are `src/core/helpers.ts:810`, `src/core/validators.ts:338`, `guides/program.md:171,533,553`.
    - **Diff:** Helper hunk `@@ -813,7 +810,7 @@`; validator hunk `@@ -341,7 +341,7 @@`; guide hunks include `@@ -163,19 +163,16 @@` and `@@ -533,8 +530,8 @@`. The number words are removed.
    - **Old form sweep:** Numeric-pattern sweep over the owned population has no numeric count hits. Remaining number words are pre-existing articles or named comparison operators; the report lists them separately.
    - **Report:** `applied`; report line 51 matches. Its recorded unrelated hits at `tests/setup.test.ts:465,723,4`, `tests/guides.test.ts:48`, and `guides/program.md:932` are present.

20. **program-subj-12**
    - **Site now:** `README.md:25`, `guides/program.md:704`, `tests/src/core/helpers.test.ts:1046`, and `tests/setup.ts:1024` use `through`.
    - **Diff:** README hunk `@@ -21,15 +21,15 @@`; guide hunk `@@ -704,7 +698,7 @@`; helper and setup hunks contain the other two replacements.
    - **Old form sweep:** `rg -i '\bvia\b'` over the owned population: no hit.
    - **Report:** `applied`; report line 52 matches.

21. **program-subj-13**
    - **Site now:** `AggregateInput.partition` is `src/core/types.ts:52`; `AggregateDefinition.partition` is `:93`. Reads are at `helpers.ts:574,618,708,713,752,757,1023`, `validators.ts:114-115`, `Program.ts:369,375`, tests, and guide sites `:135,138,260,360,711,868`.
    - **Diff:** Type hunk `@@ -44,12 +44,12 @@`; helper hunks `@@ -576,7 +576,7 @@`, `@@ -620,8 +615,8 @@`, `@@ -710,12 +705,12 @@`, `@@ -754,10 +749,12 @@`; validator hunk `@@ -110,10 +110,10 @@`; Program hunk `@@ -248,15 +366,15 @@`. All operative replacements are present.
    - **Old form sweep:** API syntax sweep `rg '\.by\b|[{,][[:space:]]*by:|\bby\?:'` over the owned population: no hit. A broad `\bby\b` sweep still finds ordinary English “by” usages, not the removed property.
    - **Report:** `applied (BREAKING)`; report line 53 matches the tree and its derived sites.

22. **program-subj-14**
    - **Site now:** `src/core/types.ts:218-219` and `:369-370` use the fixed `Default: {@link DEFAULT_PROGRAM_VALIDATE}.` form.
    - **Diff:** Type hunks `@@ -216,7 +216,7 @@` and `@@ -265,10 +366,10 @@`; both replacements are present.
    - **Old form sweep:** `rg '\(default ' src`: no hit.
    - **Report:** `applied`; report line 54 matches.

23. **program-subj-16**
    - **Site now:** `tallySubject` is declared at `src/core/helpers.ts:869`; its example is at `:864-866`; the Program call is `Program.ts:377`; the test call is `helpers.test.ts:767`; guide row is `guides/program.md:305`.
    - **Diff:** Helper hunk `@@ -865,12 +861,12 @@`; Program import/call hunks include `@@ -36,14 +36,14 @@` and `@@ -248,15 +366,15 @@`; test hunk `@@ -853,11 +764,11 @@`; guide hunk `@@ -305,7 +302,7 @@`. The new name is present.
    - **Old form sweep:** `rg '\btallyProgram\b'` and inflection sweep: no hit.
    - **Report:** `applied (BREAKING)`; report line 55 is semantically correct, but its call-site pointers are stale.

24. **fleet-F1**
    - **Site now:** The helper and proof are absent; `tests/setup.ts` remains an exported setup module, `vite.config.ts` retains `setupFiles: ['./tests/setup.ts']`, and `package.json` retains `test:setup`.
    - **Diff:** Folded into `tests/setup.test.ts` hunk `@@ -898,16 +1002,3 @@`; no second edit exists.
    - **Old form sweep:** `rg 'isBrowserVuePath'`: no hit.
    - **Report:** `applied by program-obj-8`; report line 56 matches.

25. **fleet-F2**
    - **Site now:** `Program` fields are ordered with private fields at `src/core/programs/Program.ts:74-84`, then public `id`, `name`, and `definition` at `:87-91`. `ProgramManager` has only private fields at `:38-48`; `ProgramError` has no private fields or `id`.
    - **Diff:** No hunk adds or changes this shape.
    - **Old form sweep:** No matching public-`id`-before-private-fields class exists. No `JSON.stringify` of a `Program` or `ProgramManager` instance was found.
    - **Report:** `noop`; report line 57 matches.

### Across the unit

- **Scope:** Every status entry is `owned`: `README.md`, `guides/README.md`, `guides/program.md`, `src/core/constants.ts`, `src/core/errors.ts`, `src/core/helpers.ts`, `src/core/programs/Program.ts`, `src/core/programs/ProgramManager.ts`, `src/core/types.ts`, `src/core/validators.ts`, `tests/guides.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/src/core/factories.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/programs/Program.test.ts`, `tests/src/core/programs/ProgramManager.test.ts`, and `tests/src/core/validators.test.ts`. No shared or off-limits path appears.
- **Unmatched diff hunks:** None. The 18 diff file headers at `conform-program.diff:1,58,76,403,429,442,693,920,1161,1540,1595,1723,1921,2471,2629,3286,3594,3947` are all named by at least one row’s `Where`.
- **Residue:** `^\+[^+].*(\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger)` over diff additions: no hit. The same pattern over `src` and the non-vendored test population: no hit.
- **Parity:**  
  - `ProgramInterface` call signatures: `execute(subjects)` `src/core/types.ts:281`; `execute(subject)` `:309`; `validate` `:332`; `destroy` `:351`. Guide rows: `guides/program.md:407-409`. Class methods: `Program.ts:194,222,251,274`.
  - `ProgramManagerInterface` call signatures: `has` `src/core/types.ts:413`; `program` `:430`; `programs` `:450`; `add` `:475`; `remove` overloads `:498,515,534`; `destroy` `:554`. Guide rows: `guides/program.md:427-432`. Class methods: `ProgramManager.ts:131,152,176,205,248,265,284,318`.
  - Readonly data: `ProgramInterface.id/name/definition/emitter` at `src/core/types.ts:244,246,248,253`, named by the Surface row at `guides/program.md:148`; manager `emitter/count` at `:390,396`, named by the Surface row at `:151`.
  - Guide-added package identifiers exported through `src/core/index.ts`’s wildcard barrels (`src/core/index.ts:1-8`): `Program`, `AggregateInput`, `AggregateDefinition`, `ProgramManagerInterface`, `ELIGIBILITY_DECISIONS`, `STATUSES`, `Status`, `isStatus`, `isTallies`, `buildNoticeDeterminations`, `buildLimitDeterminations`, `tallySubject`, `isProgramDefinition`, `ProgramError`, and `ProgramValidationResult`: yes. `interpolateMessage`, `findRule`, and `ruleToPremises` are qualifier exports, not program-barrel exports. `Object.freeze`, `emitter`, `partition`, `fields`, `limit`, `decision`, `status`, `unrated`, and `src/core` are language, member, prose, or path tokens, not top-level program exports.

- **Gates quoted from the report:**  
  `npm run format:check` — exit `0`; `npm run lint:check` — exit `0`; `npm run check` — exit `0`; `npm run build` — exit `0`; `npm test` — exit `0`. Evidence files are `gate-1-format-check.txt` through `gate-5-test.txt`.
- **Breaking:** The report names no fleet consumers. The old published names are `STATUS_PRECEDENCE`, `ProgramManagerInterface.size`, `AggregateInput.by`, `AggregateDefinition.by`, `buildNotices`, `buildLimits`, and `tallyProgram`. Exact symbol/API sweeps across other fleet `src`/`tests` and scaffold `src` found no hits outside `program`. No compatibility alias or re-export was added.
- **Writing sweep:** The diff-addition prose pattern found two hits for `new`: `src/core/types.ts:457` and `src/core/programs/ProgramManager.ts:187`, both in the added phrase “event fires with the new program’s id after the append.” No other requested writing terms or numeric set-count patterns were found in diff-added prose.

## Distillate

- `program-obj-1: site now tests/setup.ts:92-119,609-610 | diff present yes | old form hits 0 | report matches no at stale pointers, yes semantically`
- `program-obj-2: site now tests/setup.ts:618-640 | diff present yes | old form hits 0 | report matches no at stale pointers, yes semantically`
- `program-obj-3: site now tests/guides.test.ts:192-260 | diff present yes | old form hits 0 | report matches yes`
- `program-obj-4: site now captureError assertions across four test files | diff present yes | old form hits 0 | report matches no at one stale pointer, yes semantically`
- `program-obj-5: site now tests/setup.ts:400-690 | diff present yes | old form hits 0 | report matches no at stale pointers, yes semantically`
- `program-obj-6: site now tests/src/core/factories.test.ts:98-108 | diff present yes | old form hits 0 | report matches yes`
- `program-obj-8: helper absent | diff present yes | old form hits 0 | report matches yes`
- `program-obj-9: documented sentinel retained at helpers.ts:619 | diff present no operative repair | old form hits 1 intentional | report matches yes`
- `program-subj-1: citations removed | diff present yes | old form hits 0 | report matches yes semantically`
- `program-subj-2: STATUSES is sole status list | diff present yes | old form hits 0 | report matches yes`
- `program-subj-3: renamed helpers and consumers | diff present yes | old form hits 0 | report matches no at stale call pointers, yes semantically`
- `program-subj-4: manager count at types.ts:396 and ProgramManager.ts:110 | diff present yes | old API hits 0 | report matches no at stale pointers, yes semantically`
- `program-subj-5: errors.ts:44 | diff present yes | old form hits 0 | report matches yes`
- `program-subj-6: complete interface/class TSDoc | diff present yes | old form hits 0 | report matches yes`
- `program-subj-7: guide Surface row at program.md:151 | diff present yes | old form hits 0 | report matches yes`
- `program-subj-8: imported at program.md:316 | diff present yes | old form hits 0 | report matches yes`
- `program-subj-9: README.md:24 | diff present yes | old form hits 0 | report matches yes`
- `program-subj-10: noun-following token prose | diff present yes | old form hits 0 | report matches yes`
- `program-subj-11: five count phrases removed | diff present yes | targeted count hits 0 | report matches yes`
- `program-subj-12: all owned `via` hits removed | diff present yes | old form hits 0 | report matches yes`
- `program-subj-13: partition API at types.ts:52,93 | diff present yes | old API syntax hits 0 | report matches yes`
- `program-subj-14: `Default:` prose at types.ts:218,369 | diff present yes | old form hits 0 | report matches yes`
- `program-subj-16: tallySubject at helpers.ts:869 | diff present yes | old form hits 0 | report matches no at stale call pointers, yes semantically`
- `fleet-F1: folded into program-obj-8 | diff present yes | old form hits 0 | report matches yes`
- `fleet-F2: no matching class shape | diff present no | old form hits 0 | report matches yes`

Scope tags: all status paths `owned`; no shared or off-limits path appears.

Residue: no requested residue hits in diff additions or the included tree sweep.

Writing hits: `src/core/types.ts:457` and `src/core/programs/ProgramManager.ts:187` contain the added word `new`.

Parity: interface/class call signatures and guide method rows match; readonly data members are named by the Surface rows; program-owned identifiers added to guide prose resolve through the barrel, while external, property, language, and path tokens are not barrel exports.

## Unknowns

- The report’s historical mutating `lint` and `format` runs cannot be independently reproduced in this read-only pass.
- No fresh landing gate run was performed; only the supplied gate evidence was read.
- The report’s exact line pointers are stale for several expanded files, although the current symbols and repairs were reachable.

## Journal

## Deviation

No tree change was observed. No required input file was unread. No required sweep was unavailable. The only evidence limitation is that independent gates were not rerun because the requested mode is read-only.