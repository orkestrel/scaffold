## Question
For every conform-html row, compare the current tree, unit diff, report, and recorded proofs.

## Evidence

### Per-row

1. **html-subj-1**
   - **Site now:** `guides/html.md:92-94` — `### Helpers`; line 93 names `foldNode` as the exception; line 94 starts the table.
   - **Diff:** `/home/user/work/evidence/conform-html.diff:58-74`, `@@ -83,14 +83,14 @@`; the operative exception text is present at `guides/html.md:93`.
   - **Old form sweep:** Pattern `none of them throws|Pure, total leaves`; paths `src/`, `tests/`, `guides/html.md`, `guides/README.md`, `README.md`. Targeted old form is absent at line 93, but the same phrase remains in the separate renderer claim at `guides/html.md:5`.
   - **Report:** `applied` at `/home/user/scaffold/tmp/units/conform/conform-html-report.md:12`; it says the Helpers preamble names `foldNode` as the exception. The target site matches. The report's claim that old-form sweeps are empty does not match the raw phrase sweep because of `guides/html.md:5`.
   - **Proof:** Documentation row; no behavioral control required.

2. **html-subj-2**
   - **Site now:** `src/core/HTML.ts:253-255` reads “The pipeline runs in this order”; `guides/html.md:297-299` reads “The passes run in this order”.
   - **Diff:** `/home/user/work/evidence/conform-html.diff:214-218`, `@@ -251,7 +251,7 @@`; `/home/user/work/evidence/conform-html.diff:160-166`, `@@ -282,28 +282,28 @@`. Both repairs are present.
   - **Old form sweep:** Pattern `five stages|Four passes`; required paths. No hit.
   - **Report:** `applied` at report `:13`; its sentence matches both current sites.
   - **Proof:** Documentation row; sweep agrees.

3. **html-subj-3**
   - **Site now:** `guides/html.md:47-49`; line 48 says “the elements that cannot have children”, with the surrounding `HTML_WHITESPACE` and `RAW_ELEMENTS` rows.
   - **Diff:** `/home/user/work/evidence/conform-html.diff:5-54`, `@@ -40,29 +40,29 @@`; the replacement is present at diff line 37.
   - **Old form sweep:** Pattern `the 13 elements`; required paths. No hit.
   - **Report:** `applied` at report `:14`; matches the current row.
   - **Proof:** Documentation row; sweep agrees.

4. **html-subj-4**
   - **Site now:** `guides/html.md:240` names the AST fixpoint and canonical idempotence laws; `:304` names “the evidence the region and chrome prune reads”; `:306` says “what survives the sanitize pass”. `src/core/HTML.ts:264` says “The `hidden` pass runs BEFORE the sanitize pass”.
   - **Diff:** Guide hunk `@@ -237,7 +237,7 @@` at diff `:131`; guide hunk `@@ -282,28 +282,28 @@` at diff `:140`; HTML hunks `@@ -261,9 +261,9 @@` at diff `:223`; all operative replacements are present.
   - **Old form sweep:** Pattern `stage 1|stage 2|laws 1 and 2|hidden stage|sanitize stage|three rules above|Two honest details`; required paths. No hit.
   - **Report:** `applied` at report `:15`; its sentence matches the current guide and TSDoc. The additional `guides/html.md:655` repair is present.
   - **Proof:** Documentation row; sweep agrees.

5. **html-subj-5**
   - **Site now:** `guides/html.md:47`, `:177`, `:240`, `:285`, `:289`, `:291`, `:306`; `src/core/constants.ts:1`; `tests/src/core/constants.test.ts:34`; and `tests/guides.test.ts:2` contain the count-free wording. The permitted “two engines” and “two renderers” remain at `guides/html.md:5`, `:154`, and `:312`.
   - **Diff:** Guide hunks `@@ -40`, `@@ -139`, `@@ -174`, `@@ -237`, and `@@ -282`; constants `@@ -1,4`; constants test `@@ -26,64`; guides test `@@ -1,8`. The repairs are present.
   - **Old form sweep:** Pattern `the five code points|Five categories|Three laws|Two consequences|Three of its rules|each of the three rules|Two honest details|the five HTML ASCII|five constants`; required paths. No hit.
   - **Report:** `applied` at report `:16`; the listed count deletions match the tree.
   - **Proof:** Documentation/naming row; sweep agrees.

6. **html-subj-6**
   - **Site now:** `guides/html.md:88` says “produces no two adjacent text siblings”; `:179` says “HTMLInterface types it that way”; `:187` says “The parser also holds one invariant”; `:287` says “a property of what `renderHTML` re-emits”.
   - **Diff:** Guide hunks `@@ -83,14`, `@@ -174,9`, and `@@ -282,28`; all replacements are present.
   - **Old form sweep:** Pattern `guarantees no two adjacent|guarantees it|guarantees one invariant|a guarantee about`; required paths. No hit.
   - **Report:** `applied` at report `:17`; matches the current text.
   - **Proof:** Documentation row; sweep agrees.

7. **html-subj-7**
   - **Site now:** `guides/html.md:285` uses “after”; `:287` uses “because”; `:306` uses “because”; `src/core/constants.ts:436` uses “after”.
   - **Diff:** Guide `@@ -282,28 +282,28 @@`; constants `@@ -433,7 +433,7 @@`. The replacements are present.
   - **Old form sweep:** Pattern `\b(since|once)\b`; required paths. Causal `since` has no hit. Remaining `once` hits are permitted occurrence meanings at `guides/html.md:5,63,193,301`, `src/core/HTML.ts:309`, `src/core/constants.ts:588`, `src/core/helpers.ts:1528,1530`, `tests/src/core/HTML.test.ts:845-847,856,860-863,972-980,1162-1163`, `tests/src/core/validators.test.ts:128`, `tests/setup.test.ts:178`, and `tests/distribution.test.ts:491`.
   - **Report:** `applied` at report `:18`; target substitutions match. The permitted `once` readings agree with the report.
   - **Proof:** Documentation row; no banned causal or temporal use remains.

8. **html-subj-8**
   - **Site now:** Guide navigation uses `following` or `earlier` at `guides/html.md:55,154,158,289,291,338,435`. Test comments use the replacement vocabulary at `tests/guides.test.ts:85`, `tests/setup.test.ts:40`, `tests/src/core/helpers.test.ts:1384`, and `tests/src/core/parsers.test.ts:510`.
   - **Diff:** Guide hunks `@@ -151,11`, `@@ -282,28`, `@@ -432,7`, and `@@ -652,7`; test hunks touching the listed comments are present. The replacements are present.
   - **Old form sweep:** Pattern `\b(above|below)\b`; required paths. Remaining hits: `tests/setup.test.ts:394`, `tests/setupPolicy.ts:2098`, `tests/policy.test.ts:544`, `src/core/constants.ts:133`, `src/core/helpers.ts:136`, `tests/setup.ts:895`, `tests/src/core/helpers.test.ts:106`, and `guides/html.md:100`. These are structural stack/tree references or vendored files, not document navigation.
   - **Report:** `applied` at report `:19`; its target reading matches. Its narrower sweep excluded vendored files; the full required sweep records them above.
   - **Proof:** Documentation row; no document-navigation hit remains.

9. **html-subj-9**
   - **Site now:** `src/core/helpers.ts:649-652` documents `entities` as “If `true` …; if `false` … Default: `false`”; the parameter remains at `:658`.
   - **Diff:** `@@ -647,7 +647,8 @@` at diff `:258`; exact wording is present across lines 650-651.
   - **Old form sweep:** Pattern `@param \w+ - Whether`; required paths. No hit.
   - **Report:** `applied` at report `:20`; matches the current TSDoc.
   - **Proof:** Documentation row; sweep agrees.

10. **html-subj-10**
    - **Site now:** `src/core/helpers.ts:785-787` documents `schemes` with `Default: SAFE_URL_SCHEMES`; the default remains at `:791`.
    - **Diff:** `@@ -782,7 +783,7 @@` at diff `:268`; replacement is present.
    - **Old form sweep:** Pattern `@param schemes - The allowed absolute schemes`; required paths. No hit.
    - **Report:** `applied` at report `:21`; matches the current TSDoc.
    - **Proof:** Documentation row; sweep agrees.

11. **html-obj-1**
    - **Site now:** `src/core/validators.ts:11-20` imports `holds` and no longer imports `attempt`; `:98-100` returns `holds(() => {`; `:159-161` closes the callback without the old reduction.
    - **Diff:** Import hunk `@@ -10,7`; implementation hunk `@@ -96,7`; removal hunk `@@ -158,7`. The operative repair is present.
    - **Old form sweep:** Pattern `attempt` in `src/core/validators.ts`; no hit.
    - **Report:** `applied` at report `:22`; current code matches. The guide sentence at `guides/html.md:332` names `holds` for the recursive guard.
    - **Proof:** Reuse row; no behavioral proof was required by the report.

12. **html-obj-2**
    - **Site now:** Existing parity checks remain through `tests/guides.test.ts:54-220`. The executable block begins at `:227`, with fence cases through `:525`; presence guards run at `:527-638`.
    - **Diff:** `@@ -168,3 +218,420 @@` at diff `:537`; it adds the executable fence tests and README checks. The operative repair is present.
    - **Old form sweep:** No name, phrase, or path was removed; the old state was absence of executable tests, so no lexical old-form sweep applies.
    - **Report:** `applied` at report `:23`; its sentence matches the block and current assertions.
    - **Proof:** Control files exist under `/home/user/work/evidence/html-proofs/`:
      - `fix3-claims-control-red.txt`: `Tests 32 passed (32)`; mutated guide with the old claims list stayed green.
      - `fix3-claims-guard-red.txt`: `Tests 1 failed | 31 passed (32)`; the extended guard failed on the unmatched claim at `tests/guides.test.ts:623`.
      - `fix3-claims-restored-green.txt`: `Tests 32 passed (32)`.
      The report records a guard control, but not a failing-first command/count taken before the executable block was implemented.

13. **html-obj-3**
    - **Site now:** `tests/setup.ts:26-101` contains and exports `CollectionMutation`, `attemptCollectionMutation`, and `restoreCollectionMutation`; `tests/src/core/constants.test.ts:1` and `:30` import them. The added proof is `tests/setup.test.ts:93-123`.
    - **Diff:** `tests/setup.ts @@ -23,13 +23,90 @@` at diff `:1085`; constants test removal/import hunk `@@ -1,3` and `@@ -26,64`; setup proof hunk `@@ -87,18 +90,40`. The move is present.
    - **Old form sweep:** Pattern `^export (interface|function) (CollectionMutation|attemptCollectionMutation|restoreCollectionMutation)` in `tests/src/core/constants.test.ts`; no hit. The intended declarations occur at `tests/setup.ts:27,47,79`.
    - **Report:** `applied` at report `:24`; current imports, exports, and proof match.
    - **Proof:** `tests/setup.test.ts:94-123` exercises frozen and unfrozen collections. No failing-first command/count is recorded in the report.

14. **html-obj-4**
    - **Site now:** `tests/setup.ts:669` initializes `URL_SAFETY_GROUPS` with `Object.freeze([`; the matching close is `:677`.
    - **Diff:** `@@ -594,7 +666,7 @@` and `@@ -602,7 +674,7 @@` at diff `:1200` and `:1209`; the freeze repair is present.
    - **Old form sweep:** Pattern `URL_SAFETY_GROUPS: readonly string\[\] = \[`; required paths. No hit.
    - **Report:** `applied` at report `:25`; matches the current declaration.
    - **Proof:** Reported failing-first command: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup`. Before: `Tests 1 failed | 29 passed (30)`, failing on `Object.isFrozen(URL_SAFETY_GROUPS)`. After: `Tests 30 passed (30)`. The final setup project later reports `Tests 29 passed (29)` after the browser-path case was removed.

15. **html-obj-5**
    - **Site now:** `tests/distribution.test.ts:13` imports `createScratch` and `destroyScratch`; `:196-210` uses the guarded `runNpm`; `:569-575` creates and asynchronously destroys scratch; `:604-633` routes classifier writes through `SCRATCH`.
    - **Diff:** Distribution hunks `@@ -201,21`, `@@ -479,7`, `@@ -500,9`, `@@ -510,9`, `@@ -576,13`, `@@ -601,7`, and `@@ -639,8`. The operative scratch repair is present.
    - **Old form sweep:** Patterns `writeFile|mkdtempSync|writeFileSync|rmSync|tmpdir`; required paths. Targeted uses are absent from `tests/distribution.test.ts`. Off-limits residuals remain in `tests/setupPolicy.ts:4,7,8,10,71,86,89,1972` and `tests/config.test.ts:8,12,13,639,689,1092-1093,1097-1099,1130,1179,1182,1220`.
    - **Report:** `applied` at report `:26`; the code and scratch lifecycle match. Its supporting version evidence does not: report `:145` says `@orkestrel/test` is `0.0.11` and declared as `^0.0.11`, while the tree has `package.json:83` at `^0.0.12` and installed `node_modules/@orkestrel/test/package.json:2` at `0.0.12`.
    - **Proof:** Report records `npm run test:distribution` exit 0 with 9 tests. No pre-fix failing-first count is recorded.

16. **html-obj-6**
    - **Site now:** `tests/distribution.test.ts:23` reads `process.env.npm_execpath`; `:200-210` throws when absent and spawns `process.execPath` with the JavaScript entry and no `shell`.
    - **Diff:** `@@ -7,29 +7,20 @@` at diff `:311`; `@@ -201,21 +192,20 @@` at diff `:349`. The operative repair is present.
    - **Old form sweep:** Pattern `npm\.cmd|shell: SHELL|const NPM|const SHELL`; required paths. No hit in the owned distribution test.
    - **Report:** `applied` at report `:27`; current code matches. The report's template referral is consistent with the diff.
    - **Proof:** Report records `npm run test:distribution` exit 0. No pre-fix failing-first count is recorded.

17. **html-obj-7**
    - **Site now:** `tests/setup.ts:55-59` no longer contains `isBrowserVuePath`; `tests/setup.test.ts` has no corresponding import or describe block. The setup project is registered at `vite.config.ts:130`, but no browser application tree exists.
    - **Diff:** `tests/setup.ts @@ -52,12 +129,6 @@` at diff `:1177`; setup test `@@ -87,18 +90,40 @@` at diff `:999`. The deletion is present.
    - **Old form sweep:** Pattern `isBrowserVuePath`; required paths. No hit.
    - **Report:** `applied` at report `:28`; matches the current tree.
    - **Proof:** Placement/API row; sweep agrees.

18. **fleet-F1**
    - **Site now:** No `isBrowserVuePath` declaration, import, or describe block remains. No browser environment exists.
    - **Diff:** Folded into html-obj-7; no separate hunk. Report records `applied` through that row at report `:29`.
    - **Old form sweep:** Pattern `isBrowserVuePath`; required paths. No hit.
    - **Report:** Matches the tree.

19. **fleet-F2**
    - **Site now:** `src/HTML.ts` is the only class declaration at `src/core/HTML.ts:69`; its first fields are `readonly #document` and `readonly #spans`. No `readonly id` field exists.
    - **Diff:** No hunk; report records `noop` at report `:29`.
    - **Old form sweep:** Patterns `readonly id` and `^export class|^class` over `src/`; the first has no hit, the second has only `src/core/HTML.ts:69`.
    - **Report:** Matches the empty population.

### Across the unit

**Scope.** The current status at `/home/user/fleet/html` contains only owned paths: `guides/html.md`, `src/core/HTML.ts`, `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/validators.ts`, `tests/distribution.test.ts`, `tests/guides.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/src/core/HTML.test.ts`, `tests/src/core/constants.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/parsers.test.ts`, and `tests/src/core/shapers.test.ts`. No shared or off-limits path is listed.

Diff hunks whose file has no row `Where` coverage are:
- `guides/html.md @@ -123,7 +123,7 @@` — first added line is the `foldNode` table row at diff `:83`.
- `guides/html.md @@ -139,7 +139,7 @@` — first added line is the `doctypeShape` row at diff `:92`.
- `tests/src/core/HTML.test.ts @@ -381,7 +381,7 @@` — first added line changes “all five categories” at diff `:1228`.
- `tests/src/core/HTML.test.ts @@ -760,7 +760,7 @@` — first added line changes “law three” at diff `:1238`.
- `tests/src/core/helpers.test.ts @@ -186,7 +186,7 @@` — first added line changes the timeout comment at diff `:1324`.
- `tests/src/core/helpers.test.ts @@ -667,7 +667,7 @@` — first added line changes “three tests” at diff `:1334`.
- `tests/src/core/helpers.test.ts @@ -714,8 +714,9 @@` — first added line names the dangerous schemes at diff `:1342`.
- `tests/src/core/parsers.test.ts @@ -337,7 +337,7 @@` — first added line changes the sized-parse count at diff `:1367`.
- `tests/src/core/shapers.test.ts @@ -6,7 +6,7 @@` — first added line changes “These four” at diff `:1390`.

**Residue.**
- Added diff lines: no matches for `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`.
- Tree sweep over `src` and `tests`, excluding the vendored setup/policy/config/distribution files, found:
  - `tests/src/core/helpers.test.ts:189` — `Timeout basis`.
  - `tests/src/core/parsers.test.ts:340` — `Timeout basis`.
  - `tests/src/core/fixtures/entities.json:1416` and `src/core/constants.ts:1949` — `mapstodown`, a fixture/entity name containing the substring `todo`.
- These are false positives, not newly added residue.

**Parity.**

| Interface member | `src/core/types.ts` | Guide method/surface |
|---|---:|---:|
| `document` | `:394` | Surface prose `guides/html.md:154`; summary `:39` |
| `span` | `:400` | `guides/html.md:164` |
| `walk` | `:410` | `:165` |
| `find` | `:411-412` | `:166` |
| `filter` | `:414-415` | `:167` |
| `map` | `:424` | `:168` |
| `reduce` | `:425` | `:169` |
| `fold` | `:427` | `:170` |
| `stream` | `:435` | `:171` |
| `sanitize` | `:444` | `:172` |
| `distill` | `:454` | `:173` |

The only readonly data property is `document`, and the guide names it in Surface prose. The diff does not change `types.ts` or class fields. The class remains exported through `src/core/index.ts:8`; the interface and all helper, parser, constant, and shaper symbols are exported through `src/core/index.ts:1-7`. Added guide references to external `attempt`, `holds`, and `createContract` are dependency symbols, not package-barrel exports.

**Gates reported by the unit.** `/home/user/scaffold/tmp/units/conform/conform-html-report.md:162-177` records:
- `npm run format:check` — exit 0.
- `npm run lint:check` — exit 0.
- `npm run check` — exit 0.
- `npm run build` — exit 0.
- `npm test` — exit 0.
- `npm run test:distribution` — exit 0.

The independent landing run is `NOT-EVIDENCED` in this read-only lane.

**Breaking.** The report's § Breaking at `:214-220` says none. No published symbol was renamed or removed. `isBrowserVuePath` and the collection-mutation trio are test-only symbols. No old published-symbol sweep is applicable.

**Writing sweep.**
- Added prose pattern: `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`.
- Paths: added lines in `guides/**`, `README.md`, source comments, and test titles/comments.
- Hit: `tests/distribution.test.ts:572` — “just-stopped npm child”. The term is in a comment and remains in the added diff.
- Growable-count pattern over the same added prose paths: no hits.

## Distillate

- `html-subj-1`: site now `guides/html.md:93` | diff present yes | old form hits 1 unrelated renderer claim | report matches no
- `html-subj-2`: site now `src/core/HTML.ts:254`, `guides/html.md:297` | diff present yes | old form hits 0 | report matches yes
- `html-subj-3`: site now `guides/html.md:48` | diff present yes | old form hits 0 | report matches yes
- `html-subj-4`: site now `guides/html.md:240,304,306`, `src/core/HTML.ts:264` | diff present yes | old form hits 0 | report matches yes
- `html-subj-5`: sites now `guides/html.md:47,177,240,285,289,291,306`, `src/core/constants.ts:1`, tests `:2`, `:34` | diff present yes | old form hits 0 | report matches yes
- `html-subj-6`: site now `guides/html.md:88,179,187,287` | diff present yes | old form hits 0 | report matches yes
- `html-subj-7`: site now `guides/html.md:285,287,306`, `src/core/constants.ts:436` | diff present yes | banned-form hits 0; permitted `once` hits remain | report matches yes
- `html-subj-8`: sites now guide `:55,154,158,289,291,338,435` and test comments | diff present yes | targeted navigation hits 0; structural/off-limits hits 8 | report matches yes
- `html-subj-9`: site now `src/core/helpers.ts:650-651` | diff present yes | old form hits 0 | report matches yes
- `html-subj-10`: site now `src/core/helpers.ts:785` | diff present yes | old form hits 0 | report matches yes
- `html-obj-1`: site now `src/core/validators.ts:11-20,98-160` | diff present yes | old `attempt` hits 0 | report matches yes
- `html-obj-2`: site now `tests/guides.test.ts:227-638` | diff present yes | lexical old form not applicable | report matches yes, but failing-first evidence is absent
- `html-obj-3`: site now `tests/setup.ts:26-101`, `tests/setup.test.ts:93-123` | diff present yes | stale declaration hits 0 | report matches yes, but failing-first evidence is absent
- `html-obj-4`: site now `tests/setup.ts:669-677` | diff present yes | old bare initializer hits 0 | report matches yes
- `html-obj-5`: site now `tests/distribution.test.ts:13,196-210,569-633` | diff present yes | targeted old-helper hits 0 | report matches no: report version evidence conflicts with `package.json:83` and installed version `0.0.12`
- `html-obj-6`: site now `tests/distribution.test.ts:23,200-210` | diff present yes | old shim/shell hits 0 | report matches yes
- `html-obj-7`: site now helper absent; setup test absent | diff present yes | old name hits 0 | report matches yes
- `fleet-F1`: same deletion as html-obj-7 | diff present through html-obj-7 | old name hits 0 | report matches yes
- `fleet-F2`: `src/core/HTML.ts:69` only class, no `id` field | diff present no | old shape hits 0 | report matches yes

Scope tags: all status paths are `owned`; no shared or off-limits path is dirty.

Residue: added diff lines clean; tree hits are `tests/src/core/helpers.test.ts:189`, `tests/src/core/parsers.test.ts:340`, `tests/src/core/fixtures/entities.json:1416`, and `src/core/constants.ts:1949`.

Writing: `tests/distribution.test.ts:572` contains the added prose hit `just-stopped`; no added growable-count hit.

Parity: `HTMLInterface` members are `document`, `span`, `walk`, `find`, `filter`, `map`, `reduce`, `fold`, `stream`, `sanitize`, and `distill`, matching `src/core/types.ts:394-454` and `guides/html.md:164-173`; `document` is the sole readonly data property and is Surface-documented at `guides/html.md:154`.

## Unknowns

No row or requested field was unreachable. The independent authoritative gate rerun was not taken in this read-only lane.

## Journal

<!-- Driver-owned journal line. -->

## Deviation

No tree change was made by this audit. No file was unread. The report has two evidence deviations: the html-obj-1 sweep is not literally empty because `guides/html.md:5` retains a separate valid renderer sentence, and html-obj-5 cites stale `@orkestrel/test` version data; the current manifest and installed package both use version `0.0.12`.