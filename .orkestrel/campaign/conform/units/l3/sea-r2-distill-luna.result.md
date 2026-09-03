## Question

For every `unit conform-sea` row, compare the current tree, diff, sweeps, proofs, and report.

## Evidence

### Per-row entries

1. **sea-obj-1**
   - **Site now:** `Injector.ts:413` calls `this.#fixupDataEntries(directoryBuffer, 0, newVa)`. `Injector.ts:876-892` contains the retained recursive method with `depth` removed. The surrounding comment states the serialized layout and DataRVA behavior.
   - **Diff:** `conform-sea.diff:875` — `@@ -398,7 +410,7 @@`; `conform-sea.diff:996` — `@@ -914,32 +867,13 @@`. The operative call and comment are present.
   - **Old form sweep:** Pattern `\bfixupDirectoryRVAs\b|\bdepth\b` over `src`, `tests`, `guides/sea.md`, `guides/README.md`, and `README.md`; the removed delegate and fixup-only `depth` form have no hits. Other unrelated `depth` uses remain in `Injector.ts:462`, as expected.
   - **Report reading:** `applied` — “`#fixupDirectoryRVAs` and its discarded-approach comment block deleted; the call at the `#injectPE` fixup site now reaches `#fixupDataEntries(directoryBuffer, 0, newVa)`.” The current lines match.
   - **Proof reading:** `/home/user/work/evidence/sea-proofs/sea-obj-1-control-red.txt` records `2 failed, 184 passed (186)` with the call planted incorrectly. `/home/user/work/evidence/sea-proofs/sea-obj-1-green.txt` records `186 passed (186)`.

2. **sea-obj-2**
   - **Site now:** `tests/setupServer.ts:356` exports `readPeResourceString`; `:376` exports `walkPeResourceDirectory`; `:620` reuses `alignELFNoteSize`. The moved SEA test at `tests/src/server/seas/SEA.test.ts:18` uses `createRecorder`.
   - **Diff:** `conform-sea.diff:2113` — `@@ -343,76 +345,112 @@`; `:2226` — `@@ -354,76 +462,18 @@`; `:2315` — `@@ -558,11 +608,6 @@`; `:1988` — `@@ -212,6 +215,59 @@`; `:2745` — `@@ -1,50 +1,66 @@`. The extracted functions and recorder are present.
   - **Old form sweep:** Patterns `\breadString\b|\bwalk\b|\balignTo4\b|\bonError\b` and the case-insensitive inflection sweep over the named source, test, and guide paths; no hits.
   - **Report reading:** `applied` — “`readPeResourceString` and `walkPeResourceDirectory` extracted to exported module scope with TSDoc; `alignTo4` replaced by the imported `alignELFNoteSize`; `SEA.test.ts` uses `createRecorder<[unknown]>()`.” The current tree matches.
   - **Proof reading:** `sea-obj-2-red.txt` records `3 failed, 18 passed (21)`; `sea-obj-2-green.txt` records `21 passed (21)`.

3. **sea-obj-3**
   - **Site now:** `src/server/assets/AssetManager.ts:1-8` places the two `import type` declarations before value imports, with no blank line inside either group. `:9` begins the value imports.
   - **Diff:** `conform-sea.diff:346` — `@@ -9,20 +6,45 @@`. The required import order is present.
   - **Old form sweep:** Pattern for the former value-first header over `AssetManager.ts`; no old ordering form remains.
   - **Report reading:** `applied` — “`AssetManager.ts` leads with its two `import type` declarations, then the value imports.” The current lines match.
   - **Proof reading:** Placement row; no behavioral control is required.

4. **sea-obj-4**
   - **Site now:** The interfaces are centralized in `src/server/types.ts:146-168` (`ELFProgramHeader`), `:175-187` (`PEResourceLeaf`), `:195-203` (`PEResourceEntry`), and `:215-223` (`PESection`). `Injector.ts` uses them at `:240`, `:294`, `:461`, `:558`, `:571`, `:577`, `:630`, `:987`, `:1015`, `:1066`, `:1076`, `:1158`, `:1178`, and `:1211`. The stale-note rewrite uses `headers.map` at `:1035`.
   - **Diff:** `conform-sea.diff:1506` — `@@ -131,6 +139,87 @@`; Injector hunks include `@@ -208,15 +237,7 @@`, `@@ -552,15 +555,7 @@`, `@@ -573,44 +568,13 @@`, `@@ -914,32 +867,13 @@`, `@@ -1047,24 +981,10 @@`, and `@@ -1107,8 +1028,13 @@`. The four interfaces, readonly members, mapped neutralization, and readonly section parameter are present.
   - **Old form sweep:** Structural sweep for the four repeated inline object signatures over `Injector.ts`; no repeated inline declarations remain.
   - **Report reading:** `applied` — “`ELFProgramHeader`, `PEResourceLeaf`, `PEResourceEntry`, `PESection` declared in `src/server/types.ts` with readonly members; every inline copy replaced.” The current tree matches.
   - **Proof reading:** Placement and parity row; no standalone behavioral control is required.

5. **sea-obj-5**
   - **Site now:** `tests/guides.test.ts:187-240` executes the guide’s concrete fence values. The corresponding guide values remain at `guides/sea.md:305-340`.
   - **Diff:** `conform-sea.diff:1661` — `@@ -1,6 +1,7 @@`; `:1693` — `@@ -168,3 +184,57 @@`. The fence transcription block is present.
   - **Old form sweep:** Patterns `\bthree-step\b|\bfive constants\b` and the former non-executing guide-test shape over the named paths; no hits.
   - **Report reading:** `applied` — “`describe('sea.md fences')` appended to `tests/guides.test.ts`, executing every value the guide prints.” The current test block matches.
   - **Proof reading:** `sea-obj-5-control-red.txt` records `1 failed, 33 passed (34)` with `8193` planted. `sea-obj-5-green.txt` records `34 passed (34)`.

6. **sea-obj-7**
   - **Site now:** `tests/integration.test.ts:1-7` correctly describes the integration project and its inclusion in `npm test`. The unreachable `free program header entry` skip is gone. The remaining skip at `:204` is limited to `INJECT`.
   - **Diff:** `conform-sea.diff:1755` — `@@ -1,8 +1,8 @@`; `:1769` — `@@ -10,46 +10,38 @@`; `:1827` — `@@ -70,7 +62,7 @@`. The stale skip and header wording are removed.
   - **Old form sweep:** Patterns `free program header entry|kept OUT|default \`test\` run` over the named paths; no hits for the removed forms.
   - **Report reading:** `applied` — “The unreachable `free program header entry` skip and its `context` parameter deleted; the stale applicability comment deleted; the header comment states the suite's real placement.” The current lines match.
   - **Proof reading:** No failing-first control file exists. The report records the integration gate as `4 passed (4)`.

7. **sea-obj-8**
   - **Site now:** `src/server/seas/SEA.ts:167-179` validates asset keys with `ensureSafeKey(key)` and validates paths only with `ensureContained`. The compression-path loop has no `ensureSafeKey(path)`.
   - **Diff:** `conform-sea.diff:1413` — `@@ -148,12 +167,10 @@`. Both path guards are removed and the key guard remains.
   - **Old form sweep:** Pattern `ensureSafeKey\(path\)` over the named paths; no hits.
   - **Report reading:** `applied` — “`ensureSafeKey(path)` deleted from both the asset-path loop and the compression-path loop in `SEA.#validate`; `ensureSafeKey(key)` kept.” The current lines match.
   - **Proof reading:** `sea-obj-8-red.txt` records `1 failed, 182 passed (183)`; `sea-obj-8-green.txt` records `183 passed (183)`.

8. **sea-obj-9**
   - **Site now:** `src/server/helpers.ts:337-342`, `:360-365`, `:487-493`, and `:504-509` capture `readSync` results and throw `SEAError('FORMAT', 'Short read', ...)`. Tests at `helpers.test.ts:707-718`, `:723-735`, `:1109-1120`, and `:1138-1150` assert the failures.
   - **Diff:** `conform-sea.diff:655` — `@@ -332,7 +336,10 @@`; `:675` — `@@ -351,7 +359,10 @@`; `:703` — `@@ -484,10 +499,14 @@`; `:719` — `@@ -613,11 +632,11 @@`; test hunks at `:2654` and `:2718`. The short-read throws are present.
   - **Old form sweep:** Pattern for the removed sentinel test title and unchecked-read form over the named paths; no removed form remains.
   - **Report reading:** `applied` — “`readU16`, `readU32`, `readU64`, and `readPEOffset` capture `readSync`'s return and throw `SEAError('FORMAT', 'Short read', ...)`.” The current lines match.
   - **Proof reading:** `sea-obj-9-red.txt` records `4 failed, 178 passed (182)`; `sea-obj-9-green.txt` records `182 passed (182)`.

9. **sea-subj-1**
   - **Site now:** `src/server/types.ts:330` and `AssetManager.ts:74` use `AssetInput | readonly AssetInput[]`.
   - **Diff:** The interface and implementation parameter hunks contain the readonly union. The operative text is present.
   - **Old form sweep:** Pattern `register\(input: AssetInput \| AssetInput\[\]\)` over the named paths; no hits.
   - **Report reading:** `applied` — “`register(input: AssetInput | readonly AssetInput[]): void` in `types.ts` and `AssetManager.ts`.” The current lines match.
   - **Proof reading:** Type-shape row; no behavioral control is required.

10. **sea-subj-2**
   - **Site now:** The implementation is at `src/server/seas/SEA.ts`; the barrel points to it at `src/server/index.ts:9`, and the test is at `tests/src/server/seas/SEA.test.ts`. The current prose uses `SEA`; `package.json:6-12` has no `"seal"` keyword.
   - **Diff:** Rename hunk `conform-sea.diff:1329` — `rename from src/server/seals/SEA.ts` / `rename to src/server/seas/SEA.ts`; barrel and prose hunks include `@@ -1,11 +1,12 @@`, `@@ -8,18 +8,39 @@`, and the test rename hunk at `:2740`.
   - **Old form sweep:** Case-insensitive inflection pattern `\bseal(?:s|ed|ing)?\b` over `src`, `tests`, `guides/sea.md`, `guides/README.md`, and `README.md`; no hits.
   - **Report reading:** `applied` — “`src/server/seals/` → `src/server/seas/` ... the `package.json` keyword sits under § Shared-file patches.” The rename and prose match, but the keyword is already deleted in the tree, so the shared-patch statement is stale.
   - **Proof reading:** Naming and placement row; sweep agrees.

11. **sea-subj-3**
   - **Site now:** `resolvePlatform` is at `helpers.ts:54`; `buildSignCommand` at `:639`; `buildBlobConfig` at `:940`. Consumers use the new names in `SEA.ts`, tests, and guides.
   - **Diff:** Helper hunks include `@@ -73,6 +74,7 @@`, `@@ -613,11 +632,11 @@`, and `@@ -915,10 +934,10 @@`; SEA and guide hunks replace all call sites. The operative names are present.
   - **Old form sweep:** Pattern `\bcreateSignCommand(?:s|ed|ing)?\b|\bcreateBlobConfig(?:s|ed|ing)?\b` over the named paths; no hits.
   - **Report reading:** `applied` — “`createSignCommand` → `buildSignCommand`, `createBlobConfig` → `buildBlobConfig` ... guide fences, and test call sites.” The current tree matches.
   - **Proof reading:** Naming row; sweep agrees.

12. **sea-subj-4**
   - **Site now:** `helpers.ts:54` exports `resolvePlatform`; `SEA.ts:101`, `:284`, and `:387` use it. The guide and tests use the new name.
   - **Diff:** `conform-sea.diff:596` — `@@ -73,6 +74,7 @@`; SEA and guide call-site hunks replace `platformConfig`. The operative name is present.
   - **Old form sweep:** Pattern `\bplatformConfig(?:s|ed|ing)?\b`; no hits.
   - **Report reading:** `applied` — “`platformConfig` → `resolvePlatform`, return type `SEAPlatform | undefined` kept.” The current tree matches.
   - **Proof reading:** Naming row; sweep agrees.

13. **sea-subj-5**
   - **Site now:** `Injector.ts:1337-1339` declares `linkeditOffset`, `linkeditSize`, and `linkeditAddress`; all uses through `:1524` use those names.
   - **Diff:** `conform-sea.diff:1216` — `@@ -1439,9 +1334,9 @@`; all renamed-use hunks contain the new identifiers.
   - **Old form sweep:** Pattern `\bLoff\b|\bLsize\b|\bLvm\b` over the named paths; no hits.
   - **Report reading:** `applied` — “`Loff`/`Lsize`/`Lvm` → `linkeditOffset`/`linkeditSize`/`linkeditAddress` through `#injectMachO`.” The current tree matches.
   - **Proof reading:** Naming row; sweep agrees.

14. **sea-subj-7**
   - **Site now:** `SEA.ts:91-98` reads `this.#emitter.destroyed`; `:149-151` calls `this.#emitter.destroy()` unconditionally. No `#destroyed` field remains.
   - **Diff:** `conform-sea.diff:1387` — `@@ -70,14 +91,14 @@`; `:1404` — `@@ -128,8 +149,6 @@`. The derived-state implementation is present.
   - **Old form sweep:** Pattern `#destroyed|\bSEA is destroyed\b` for the removed field and old guard form; no `#destroyed` hit remains.
   - **Report reading:** `applied` — “`#destroyed` deleted; `execute()` reads `this.#emitter.destroyed`; `destroy()` calls `this.#emitter.destroy()` unconditionally.” The current tree matches.
   - **Proof reading:** `sea-subj-7-red.txt` records `2 failed, 17 passed (19)` in the fix round; `sea-subj-7-green.txt` records `19 passed (19)`.

15. **sea-subj-8**
   - **Site now:** `types.ts:75-78` declares `SEABrotliOptions`; `:86-88` extends it with `paths`. `helpers.ts:223` and `:270` accept `SEABrotliOptions`. The guide fence at `sea.md:317` passes `{ mode: 'text' }`.
   - **Diff:** `conform-sea.diff:1474` — `@@ -66,19 +74,27 @@`; helper signature hunks contain `SEABrotliOptions`. The operative shape is present.
   - **Old form sweep:** Pattern for `compress(?:File|Directory)` signatures accepting `SEACompressionOptions`; no direct-helper hits remain.
   - **Report reading:** `applied` — “`SEABrotliOptions` declared; `SEACompressionOptions extends SEABrotliOptions` ... `compressFile` and `compressDirectory` take `SEABrotliOptions`.” The current tree matches.
   - **Proof reading:** API-shape and documentation row; no standalone control is required.

16. **sea-subj-9**
   - **Site now:** `types.ts:314` declares `AssetManagerOptions.assets`; `AssetManager.ts:42` stores it and `:88-109` loads configured paths. `constants.ts` has no client-asset constants. Tests at `AssetManager.test.ts:173-257` cover configured, missing, and empty configurations.
   - **Diff:** `conform-sea.diff:404` — `@@ -62,43 +84,30 @@`; `:474` — `@@ -46,12 +46,6 @@`; `:1594` — `@@ -213,12 +302,16 @@`; test hunk `:2349` — `@@ -165,6 +167,95 @@`. The operative behavior is present.
   - **Old form sweep:** Pattern `CLIENT_ASSET_KEY_(RAW|BR)|Client assets not found|hard-coded client path`; no hits.
   - **Report reading:** `applied` — “`AssetManagerOptions.assets` added; `load()` iterates it ... emits `error` per configured missing path.” The current tree matches.
   - **Proof reading:** `sea-subj-9-red.txt` records `2 failed, 184 passed (186)`; `sea-subj-9-green.txt` records `186 passed (186)`.

17. **sea-subj-10**
   - **Site now:** `constants.ts:76-85` exports `ELF_PT_LOAD`, `ELF_PT_PHDR`, `ELF_PF_R`, and `ELF_PAGE_SIZE`. `Injector.ts` imports them at `:41-44`; the former local declarations are gone, and `:1213` uses `ELF_PT_LOAD`.
   - **Diff:** `conform-sea.diff:487` — `@@ -78,6 +72,18 @@`; Injector import and use hunks contain the new constants. The operative constants are present.
   - **Old form sweep:** Patterns `const PT_LOAD|const PT_PHDR|const PF_R|const PAGE|h.type === 1`; no hits.
   - **Report reading:** `applied` — “`ELF_PT_LOAD`, `ELF_PT_PHDR`, `ELF_PF_R`, `ELF_PAGE_SIZE` added to `constants.ts` ... bare `1` ... replaced.” The current tree matches.
   - **Proof reading:** Placement and documentation row; no standalone control is required.

18. **sea-subj-12**
   - **Site now:** TSDoc blocks precede `SEA` at `seas/SEA.ts:48`, `Injector` at `Injector.ts:65`, `AssetManager` at `AssetManager.ts:17`, and `Asset` at `Asset.ts:4`. The former separator comments are gone.
   - **Diff:** Class-documentation hunks include `conform-sea.diff:309` — `@@ -1,8 +1,23 @@`; `:811` — `@@ -?`; `:1360` — class block addition; and `:360` — AssetManager block addition. The TSDoc blocks are present.
   - **Old form sweep:** Pattern `^// === (SEA|Injector|AssetManager|Asset)$` and the unattached Injector block shape; no hits.
   - **Report reading:** `applied` — “TSDoc blocks on `SEA`, `Injector`, `AssetManager`, and `Asset` ... The floating block at the head of `Injector.ts` folded into the class block.” The current tree matches.
   - **Proof reading:** Documentation row; no standalone control is required.

19. **sea-subj-14**
   - **Site now:** `helpers.ts:76` documents `ensureExists`; `:216` documents the `compressFile` output failure; `:1088-1090` documents all `patchSentinelFuse` failure cases. The short-read helpers also have `FORMAT` throws.
   - **Diff:** `conform-sea.diff:604` — `@@ -81,6 +82,7 @@`; `:619` — `@@ -211,13 +213,14 @@`; `:746` — `@@ -1066,6 +1085,9 @@`; the reader hunks add their `@throws` lines.
   - **Old form sweep:** Pattern for the missing `@throws` documentation beside `ensureExists`, `compressFile`, and `patchSentinelFuse`; no missing-form hits remain.
   - **Report reading:** `applied` — “`@throws` added to `ensureExists`, `compressFile`, and `patchSentinelFuse` ... plus one per short-read reader.” The current lines match.
   - **Proof reading:** Documentation row; no standalone control is required.

20. **sea-subj-15**
   - **Site now:** `constants.ts:8` and `helpers.ts:74-89` use present-tense wording. The guide and helper-test wording no longer contains the banned `should` or prior-release comparisons.
   - **Diff:** `conform-sea.diff:465` — `@@ -18,7 +18,7 @@`; `:604` — `@@ -81,6 +82,7 @@`; guide and test hunks replace the banned prose.
   - **Old form sweep:** Case-insensitive patterns `\bshould\b|prior behavior|unchanged default|matching prior`; no hits.
   - **Report reading:** `applied` — “`should` struck from `constants.ts`, `helpers.ts`, `guides/sea.md`, and `helpers.test.ts`; ... prior-release comparison ... deleted.” The current tree matches.
   - **Proof reading:** Documentation row; no standalone control is required.

21. **sea-subj-16**
   - **Site now:** The numbered citations are absent from the named guide and test files. `guides/README.md:4` and `:54` use unnumbered rule references.
   - **Diff:** Guide and comment hunks include `conform-sea.diff:28` — `@@ -1,7 +1,7 @@`; `:177`; `:1755`; and `:2052`. The citations are removed.
   - **Old form sweep:** Pattern `AGENTS\s*§|§9|§10|§16|§22`; no hits in the named paths.
   - **Report reading:** `applied` — “Every numbered `AGENTS` citation deleted from `guides/sea.md`, `guides/README.md`, `tests/integration.test.ts`, `tests/src/server/seas/SEA.test.ts`, and `tests/setupServer.ts`.” The current tree matches.
   - **Proof reading:** Documentation row; sweep agrees.

22. **sea-subj-17**
   - **Site now:** `guides/README.md:27` names `` `SEA` `` instead of `` `Seal` ``.
   - **Diff:** `conform-sea.diff:37` — `@@ -24,12 +24,19 @@`; the added line contains `` `SEA` ``.
   - **Old form sweep:** Pattern `\bSeal\b` case-insensitively; no hits.
   - **Report reading:** `applied` — “`guides/README.md` names `SEA`, not `Seal`.” The current line matches.
   - **Proof reading:** Documentation row; sweep agrees.

23. **sea-subj-18**
   - **Site now:** `guides/README.md:26` says “one of this package's runtime dependencies”; `:40-50` documents `process.md` and the development-dependency mirrors.
   - **Diff:** `conform-sea.diff:37` — `@@ -24,12 +24,19 @@`; `:58` — `@@ -37,6 +44,11 @@`. The new dependency-reference text is present.
   - **Old form sweep:** Patterns `this package's other runtime dependency|process\.md|test\.md|probe\.md|scaffold\.md`; the obsolete phrase has no hit and all required guide names are present.
   - **Report reading:** `applied` — “`this package's other runtime dependency` → `one of this package's runtime dependencies`; a `process.md` paragraph added ... development dependencies' mirrors.” The current guide matches.
   - **Proof reading:** Documentation row; sweep agrees.

24. **sea-subj-20**
   - **Site now:** `guides/sea.md:26` says “runs the pipeline” and retains the named pipeline stages without the number.
   - **Diff:** `conform-sea.diff:75` — `@@ -23,13 +23,13 @@`; the added line removes `three-step`.
   - **Old form sweep:** Pattern `\bthree-step\b`; no hits.
   - **Report reading:** `applied` — “`guides/sea.md` Overview reads ‘runs the pipeline — compress assets, generate the blob, assemble and sign the executable’.” The current line matches.
   - **Proof reading:** Documentation row; sweep agrees.

25. **fleet-F1**
   - **Site now:** `tests/setup.ts` has no `isBrowserVuePath`; the workspace has no browser source, app, or setup file.
   - **Diff:** No F1 edit hunk. The helper is absent.
   - **Old form sweep:** Pattern `\bisBrowserVuePath\b` over `src` and `tests`; no hits.
   - **Report reading:** `noop` — “`tests/setup.ts` declares `encodeContent` and nothing else ... The workspace has no browser environment.” The current tree matches.
   - **Proof reading:** Placement/no-op row; sweep agrees.

26. **fleet-F2**
   - **Site now:** No implementation class has a public `readonly id: string` field. The classes read are `SEA`, `Injector`, `AssetManager`, and `Asset`.
   - **Diff:** No F2 edit hunk.
   - **Old form sweep:** Pattern `readonly id:` over `src`; no hits.
   - **Report reading:** `noop` — “The implementation classes read are `SEA`, `Injector`, `AssetManager`, and `Asset`; none ... declares a public `readonly id: string`.” The current tree matches.
   - **Proof reading:** Placement/no-op row; sweep agrees.

### Across the unit

#### Scope

The status paths at `conform-sea.status:1-21` are source, test, guide, and README paths covered by the brief’s Owned scope, except `package.json`, which requires hunk-level tagging.

- **Owned:** `README.md`, `guides/README.md`, `guides/sea.md`, all listed `src/**` paths, all listed `tests/**` paths, and both rename destinations.
- **Shared/report-only:** `package.json` keyword hunk at `conform-sea.diff:294-299`; the brief explicitly excludes `keywords` from Owned, and the report records it as a shared patch.
- **Unscoped:** `package.json` engine hunk at `conform-sea.diff:300-304`, `@@ -91,6 +90,6 @@`, first added line `+"node": ">=24.8.0"`. No row names `package.json.engines`.
- **Off-limits:** No status path is under the explicitly off-limits directories or files.

#### Residue

The added-line sweep over `conform-sea.diff` found no `.skip(`, `.only(`, `.todo(`, `retry`, `timeout`, `TODO`, `FIXME`, or `debugger` hits. It found these `console.` additions, all as test fixture strings:

- `conform-sea.diff:1784,1841,1872,1917,2834,2870,2897,2927,2965,2997,3055,3091,3164,3196,3229,3262` — `console.log('hello from sea')`.

The tree sweep over `src` and `tests`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, found:

- `.skip(`: `tests/src/server/seas/SEA.test.ts:293`; `tests/src/server/helpers.test.ts:193,1013`; `tests/integration.test.ts:204`.
- `retry`: no hits.
- `TODO|FIXME`: no hits.
- `debugger`: no hits.
- `console.`: `src/server/errors.ts:23,51,73,99`; fixture strings at `tests/src/server/seas/SEA.test.ts:74,105,127,152,192,224,282,326,409,441,479,514`, `tests/integration.test.ts:17,73,109,175`, and `tests/setupServer.test.ts:53,60`.
- `timeout`: `src/server/seas/SEA.ts:265,298`; `src/server/types.ts:117,356,435,449`; `src/server/helpers.ts:149,153,176,183`; `tests/src/server/seas/SEA.test.ts:102,111,124,133`; `tests/src/server/helpers.test.ts:90,92`.

The residue hits are existing controls, documentation examples, or fixture strings, not newly added debug residue.

#### Gates

The report’s § Gates states:

- `npm run format:check` — exit `0`; “All matched files use the correct format.”
- `npm run lint:check` — exit `0`; “no diagnostic”.
- `npm run check` — exit `0`; “root `tsc` and `check:src:server` both silent”.
- `npm run build` — exit `0`; “`dist/src/server/index.cjs 98.46 kB`, declarations copied to `index.d.cts`”.
- `npm test` — exit `0`; “`src:server` 186 passed (186); `policy` 111 passed (111); `config` 46 passed (46); `setup` 21 passed (21); `guides` 34 passed (34); `integration` 4 passed (4).”
- `npx scaffold audit --offline` — exit `0`; “`0 of 36 planned paths drifted from the plan.`”
- `node /home/user/scaffold/tmp/work/evidence.mjs sea` — exit `0`; “`conform-sea.diff` 3237 lines, `conform-sea.status` 21 entries”.

The audit brief requires the independent landing gate reading to remain `NOT-EVIDENCED`; the report’s writer-run gates do not satisfy that independent reading.

#### Breaking

The report’s § Breaking lists:

- `platformConfig` → `resolvePlatform`; same signature and return type.
- `createSignCommand` → `buildSignCommand`; same signature.
- `createBlobConfig` → `buildBlobConfig`; same signature.
- `CLIENT_ASSET_KEY_RAW` and `CLIENT_ASSET_KEY_BR` removed; consumers must configure their own asset keys.
- `AssetManager.load()` now reads configured paths; consumers relying on the former paths must pass an `assets` record.
- The four binary readers now throw `SEAError('FORMAT', 'Short read', ...)` instead of returning `0`.
- SEA asset and compression paths no longer receive the asset-key guard; containment remains enforced.

A word-boundary sweep for the old published names over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding `sea` and guide mirrors, found no hits.

#### Writing sweep

The added-line prose sweep over `guides/**`, `README.md`, source doc comments, and test titles/comments found no hits for the banned vocabulary pattern:

`\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`

The growable-count sweep found no hits for:

`\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`

#### Parity

| Entity | Interface members in `src/server/types.ts` | Guide method rows | Readonly properties and guide coverage |
|---|---|---|---|
| `SEA` | `execute` `types.ts:535`; `destroy` `:536` | `guides/sea.md:194-195` | `emitter` and `status` at `types.ts:533-534`; `emitter` is mentioned generically at `guides/sea.md:183`, but `status` has no explicit Surface/Entities property name. |
| `Injector` | `inject` `types.ts:263` | `guides/sea.md:202` | `format` at `types.ts:261`; the entity row at `guides/sea.md:45` names the injector and `inject`, while the usage fence names `format` at `:227`. |
| `Asset` | No call-signature members | No Methods table | `key`, `content`, and `compressed` at `types.ts:287-289`; all are named in the entity row at `guides/sea.md:46`. |
| `AssetManager` | `asset`, `assets`, `keys`, `register`, `load`, `clear`, `destroy` at `types.ts:329-335` | `guides/sea.md:215-221` | `emitter` and `count` at `types.ts:327-328`; `emitter` is mentioned at `guides/sea.md:183`, but `count` has no explicit Surface/Entities property name. |

Added or changed guide backticked local identifiers include `SEA`, `AssetManager`, `buildSignCommand`, `buildBlobConfig`, `resolvePlatform`, `SEABrotliOptions`, `ELFProgramHeader`, `PEResourceLeaf`, `PEResourceEntry`, and `PESection`; the server barrel exports these through `src/server/index.ts:1-12`. External identifiers such as `executeSync`, `detach`, `@orkestrel/test`, `@orkestrel/probe`, and `@orkestrel/scaffold` are intentionally not exports of the SEA barrel.

## Distillate

- `sea-obj-1`: site now `Injector.ts:413,876` | diff present yes | old form hits 0 | report matches yes
- `sea-obj-2`: site now `setupServer.ts:356,376,620`, moved SEA test `:18` | diff present yes | old form hits 0 | report matches yes
- `sea-obj-3`: site now `AssetManager.ts:1-9` | diff present yes | old form hits 0 | report matches yes
- `sea-obj-4`: site now `types.ts:146-223`, named uses throughout `Injector.ts` | diff present yes | old form hits 0 | report matches yes
- `sea-obj-5`: site now `guides.test.ts:187-240` | diff present yes | old form hits 0 | report matches yes
- `sea-obj-7`: site now `integration.test.ts:1-7,204` | diff present yes | old form hits 0 | report matches yes
- `sea-obj-8`: site now `SEA.ts:167-179` | diff present yes | old form hits 0 | report matches yes
- `sea-obj-9`: site now `helpers.ts:337-509` and tests | diff present yes | old form hits 0 | report matches yes
- `sea-subj-1`: site now `types.ts:330`, `AssetManager.ts:74` | diff present yes | old form hits 0 | report matches yes
- `sea-subj-2`: site now `seas/SEA.ts`, barrel `index.ts:9` | diff present yes | old form hits 0 | report matches no
- `sea-subj-3`: site now `helpers.ts:54,639,940` | diff present yes | old form hits 0 | report matches yes
- `sea-subj-4`: site now `helpers.ts:54` | diff present yes | old form hits 0 | report matches yes
- `sea-subj-5`: site now `Injector.ts:1337-1524` | diff present yes | old form hits 0 | report matches yes
- `sea-subj-7`: site now `SEA.ts:91-151` | diff present yes | old form hits 0 | report matches yes
- `sea-subj-8`: site now `types.ts:75-88`, helper signatures `:223,270` | diff present yes | old form hits 0 | report matches yes
- `sea-subj-9`: site now `types.ts:314`, `AssetManager.ts:42,88-109` | diff present yes | old form hits 0 | report matches yes
- `sea-subj-10`: site now `constants.ts:76-85`, `Injector.ts:41-44,1213` | diff present yes | old form hits 0 | report matches yes
- `sea-subj-12`: site now class TSDoc blocks at four class files | diff present yes | old form hits 0 | report matches yes
- `sea-subj-14`: site now `helpers.ts:76,216,1088-1090` | diff present yes | old form hits 0 | report matches yes
- `sea-subj-15`: site now `constants.ts:8`, `helpers.ts:74-89`, guide and tests | diff present yes | old form hits 0 | report matches yes
- `sea-subj-16`: site now unnumbered rule prose | diff present yes | old form hits 0 | report matches yes
- `sea-subj-17`: site now `guides/README.md:27` | diff present yes | old form hits 0 | report matches yes
- `sea-subj-18`: site now `guides/README.md:26-50` | diff present yes | old form hits 0 | report matches yes
- `sea-subj-20`: site now `guides/sea.md:26` | diff present yes | old form hits 0 | report matches yes
- `fleet-F1`: noop; old form hits 0 | diff present no | report matches yes
- `fleet-F2`: noop; old form hits 0 | diff present no | report matches yes

Scope tags: all listed source, test, guide, and README paths are `owned`; the `package.json` keyword hunk is `shared/report-only`; the `package.json` engine hunk is unscoped; no status path is off-limits.

Residue: added lines have only fixture `console.log` strings; no added skip, only, todo, retry, timeout, TODO, FIXME, or debugger pattern.

Writing hits: none in the scoped added prose.

## Unknowns

No row site, diff hunk, report section, proof file, or requested sweep was unreachable. The independent landing gate remains unevidenced because this read-only pass did not establish the Orchestrator’s deciding run.

## Journal

## Deviation

The report omits the unscoped `package.json` engine change at `conform-sea.diff:300-304` and inaccurately states that the keyword deletion remained only a shared patch, although `package.json:6-12` already lacks `"seal"`.