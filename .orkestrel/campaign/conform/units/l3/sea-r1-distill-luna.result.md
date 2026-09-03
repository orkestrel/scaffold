## Question
For every `conform-sea` row, map the current tree, diff, sweeps, report readings, and available proof evidence.

## Evidence

### Per-row evidence

- **sea-obj-1**
  - **Site now:** The call is `Injector.ts:413`, with `// Fixup RVAs...` before and `appendFileSync(...)` after. The delegate is gone; `#fixupDataEntries` is at `Injector.ts:876-893`, with its layout comment at `870-874`. `depth` is absent from this method.
  - **Diff:** `Injector.ts @@ -398,7 +410,7 @@`; `@@ -914,32 +867,13 @@`; `@@ -955,7 +889,7 @@`. The operative call is present: `+ this.#fixupDataEntries(directoryBuffer, 0, newVa)`.
  - **Old-form sweep:** Pattern `\bfixupDirectoryRVAs\b|\bfixupDirectoryRVAs(?:s|ed|ing)\b`; paths `src`, `tests`, `guides/sea.md`, `guides/README.md`, `README.md`; no hit.
  - **Report:** `applied` — “`#fixupDirectoryRVAs` and its discarded-approach comment block deleted...” The current tree matches.
  - **Proof:** `sea-obj-1-control-red.txt`: `Tests 2 failed (184 passed)`. `sea-obj-1-green.txt`: `Tests 186 passed (186)`. Both controls exist and match the report.

- **sea-obj-2**
  - **Site now:** `readPeResourceString` is at `tests/setupServer.ts:356`, `walkPeResourceDirectory` at `:376`, and `alignELFNoteSize` is imported at `:12`; no nested `alignTo4` remains. `createRecorder` is at `tests/src/server/seas/SEA.test.ts:4`, used at `:17`.
  - **Diff:** `setupServer.ts @@ -343,6 +345,112 @@`; `@@ -354,76 +462,18 @@`; `@@ -558,11 +608,6 @@`. `SEA.test.ts @@ -1,50 +1,52 @@`. The extracted helpers and recorder lines are present.
  - **Old-form sweep:** Patterns `\breadString\b`, `\bwalk\b`, `\balignTo4\b`, `\bonError\b`; same package paths; no exact-name hits. `walkDirectory` is a distinct identifier at `guides/sea.md:105`.
  - **Report:** `applied` — “`readPeResourceString` and `walkPeResourceDirectory` extracted... `SEA.test.ts` uses `createRecorder`...” The tree matches. The new helper TSDoc starts with imperative “Read” and “Walk” at `tests/setupServer.ts:349` and `:361`, not the required third-person “Reads” and “Walks”.
  - **Proof:** `sea-obj-2-red.txt`: `Tests 3 failed (18 passed)`. `sea-obj-2-green.txt`: `Tests 21 passed (21)`. Both controls exist.

- **sea-obj-3**
  - **Site now:** `AssetManager.ts:1-7` contains the type imports; value imports begin at `:8`, with no blank line within either group.
  - **Diff:** `AssetManager.ts @@ -1,6 +1,3 @@` and `@@ -9,20 +6,45 @@`. The reordered imports are present.
  - **Old-form sweep:** Placement-only row; no removed identifier or path applies.
  - **Report:** `applied` — “`AssetManager.ts` leads with its two `import type` declarations...” The tree matches.
  - **Proof:** Placement row; the import-order sweep agrees.

- **sea-obj-4**
  - **Site now:** `ELFProgramHeader` is declared at `types.ts:153-163`; uses are at `Injector.ts:987`, `:1066`, `:1076`, `:1158`, and `:1178`. `PEResourceLeaf` is at `types.ts:175-184`, used at `Injector.ts:240`, `:294`, and `:461`. `PEResourceEntry` is at `types.ts:195-200`, used at `Injector.ts:574` and `:630`. `PESection` is at `types.ts:213-220`, used at `Injector.ts:240` and `:558`.
  - **Diff:** Relevant hunks are `Injector.ts @@ -208,15 +237,7 @@`, `@@ -270,16 +291,7 @@`, `@@ -446,16 +458,7 @@`, `@@ -552,15 +555,7 @@`, `@@ -573,44 +568,13 @@`, `@@ -663,18 +627,7 @@`, `@@ -1047,24 +981,10 @@`, `@@ -1229,26 +1155,8 @@`, and `@@ -1267,20 +1175,7 @@`. The named types, readonly members, `headers.map`, and `readonly PESection[]` are present.
  - **Old-form sweep:** Inline-shape removal has no identifier pattern; no old named type or duplicate declaration remains in `Injector.ts`.
  - **Report:** `applied` — “`ELFProgramHeader`, `PEResourceLeaf`, `PEResourceEntry`, `PESection` declared...” The current tree matches.
  - **Proof:** Placement/parity row; guide rows are at `guides/sea.md:159-162`.

- **sea-obj-5**
  - **Site now:** `tests/guides.test.ts:186-240` contains the fence transcription block. The changed guide lines are at `guides/sea.md:26`, `:32`, `:68`, `:77-80`, `:101`, `:124`, `:131`, `:153`, and `:159-162`.
  - **Diff:** `tests/guides.test.ts @@ -168,3 +184,57 @@`. The assertions include `alignTo(...).toBe(8192)` at `:198`.
  - **Old-form sweep:** Patterns `three-step|five constants`; package prose and guide paths; no hit.
  - **Report:** `applied` — “`describe('sea.md fences')` appended... executing every value the guide prints.” The current block executes the listed values.
  - **Proof:** `sea-obj-5-control-red.txt`: `Tests 1 failed (33 passed)`. `sea-obj-5-green.txt`: `Tests 34 passed (34)`. Both controls exist.

- **sea-obj-7**
  - **Site now:** `tests/integration.test.ts:1-6` correctly describes the integration project. The first skip is gone. The remaining applicability comment is at `:166-173`; the remaining conditional skip is at `:204`.
  - **Diff:** `integration.test.ts @@ -1,8 +1,8 @@`, `@@ -10,46 +10,38 @@`, and `@@ -167,23 +159,24 @@`. The `free program header entry` branch is deleted.
  - **Old-form sweep:** Patterns `free program header entry|kept OUT|opt-in`; `src`, `tests`, and package prose; no hit.
  - **Report:** `applied` — “The unreachable `free program header entry` skip... deleted...” The current tree matches.
  - **Proof:** No row-specific control file exists under `sea-proofs/`. `gate-test.txt` records `integration` as `Tests 4 passed (4)`, but it is not a failing-first control.

- **sea-obj-8**
  - **Site now:** `SEA.#validate` keeps `ensureSafeKey(key)` at `src/server/seas/SEA.ts:169` and calls `ensureContained(base, path)` at `:170`; compression paths use containment at `:176-179` without `ensureSafeKey(path)`.
  - **Diff:** `SEA.ts @@ -148,12 +167,10 @@`. Both `- ensureSafeKey(path)` lines are removed.
  - **Old-form sweep:** Pattern `ensureSafeKey\(path\)`; package source and tests; no hit.
  - **Report:** `applied` — “`ensureSafeKey(path)` deleted from both...” The current tree matches.
  - **Proof:** `sea-obj-8-red.txt`: `Tests 1 failed (182 passed)`. `sea-obj-8-green.txt`: `Tests 183 passed (183)`. Both controls exist.

- **sea-obj-9**
  - **Site now:** Short-read checks are present at `helpers.ts:336-342`, `:359-365`, `:486-492`, and `:503-509`. The test cases are at `helpers.test.ts:707-745` and `:1110-1149`.
  - **Diff:** `helpers.ts @@ -332,7 +336,10 @@`, `@@ -351,7 +359,10 @@`, `@@ -484,10 +499,14 @@`, and `@@ -? +?` for `readU16`. Each added block throws `SEAError('FORMAT', 'Short read', ...)`.
  - **Old-form sweep:** Pattern `returns 0 for a file too short`; package tests; no hit.
  - **Report:** `applied` — “`readU16`, `readU32`, `readU64`, and `readPEOffset` capture `readSync`'s return...” The current tree matches.
  - **Proof:** `sea-obj-9-red.txt`: `Tests 4 failed (178 passed)`. `sea-obj-9-green.txt`: `Tests 186 passed (186)`. Both controls exist.

- **sea-subj-1**
  - **Site now:** `types.ts:330` and `AssetManager.ts:75` use `AssetInput | readonly AssetInput[]`.
  - **Diff:** `AssetManager.ts @@ -50,7 +72,7 @@`; `types.ts @@ -234,7 +327,7 @@`. The readonly parameter is present.
  - **Old-form sweep:** Pattern `AssetInput\[\]`; package source and tests; no old mutable-only signature hit.
  - **Report:** `applied` — “`register(input: AssetInput | readonly AssetInput[]): void` in `types.ts` and `AssetManager.ts`.” The current tree matches.
  - **Proof:** Placement/type row; no behavioral control was required by the report.

- **sea-subj-2**
  - **Site now:** The implementation path is `src/server/seas/SEA.ts`; the barrel exports it at `src/server/index.ts:9`; the mirrored test path is `tests/src/server/seas/SEA.test.ts`. “seal” is absent from package prose and source. `package.json:9` contains no `"seal"`.
  - **Diff:** Rename hunks are present: `src/server/seals/SEA.ts → src/server/seas/SEA.ts` and `tests/src/server/seals/SEA.test.ts → tests/src/server/seas/SEA.test.ts`. `index.ts @@ -6,7 +6,7 @@` updates the barrel.
  - **Old-form sweep:** Pattern `(?i)\bseal(?:s|ed|ing)?\b`; `src`, `tests`, `guides/sea.md`, `guides/README.md`, `README.md`; no hit.
  - **Report:** `applied` — “`src/server/seals/` → `src/server/seas/`...” The row table matches the tree. The report’s separate claim that the package keyword deletion was not applied does not match `package.json:9` or the diff.
  - **Proof:** Naming/placement sweep agrees; no behavioral control applies.

- **sea-subj-3**
  - **Site now:** `buildSignCommand` is at `helpers.ts:639`; `buildBlobConfig` is at `:940`. Guide rows are `guides/sea.md:124` and `:131`; test calls use the new names.
  - **Diff:** `helpers.ts @@ -613,11 +632,11 @@` and `@@ -915,10 +934,10 @@`; guide and SEA call-site hunks contain the new names.
  - **Old-form sweep:** Pattern `\b(createSignCommand|createBlobConfig)(?:s|ed|ing)?\b`; package paths; no hit.
  - **Report:** `applied` — “`createSignCommand` → `buildSignCommand`, `createBlobConfig` → `buildBlobConfig`...” The current tree matches.
  - **Proof:** Naming sweep agrees.

- **sea-subj-4**
  - **Site now:** `resolvePlatform` is at `helpers.ts:54`; SEA call sites are at `SEA.ts:101`, `:284`, and `:387`; the guide row is `guides/sea.md:101`.
  - **Diff:** `helpers.ts @@ -46,12 +46,12 @@`; SEA and guide call-site hunks contain `resolvePlatform`.
  - **Old-form sweep:** Pattern `\bplatformConfig(?:s|ed|ing)?\b`; package paths; no hit.
  - **Report:** `applied` — “`platformConfig` → `resolvePlatform`, return type `SEAPlatform | undefined` kept...” The current tree matches.
  - **Proof:** Naming sweep agrees.

- **sea-subj-5**
  - **Site now:** `linkeditOffset`, `linkeditSize`, and `linkeditAddress` are declared at `Injector.ts:1338-1340` and used through the Mach-O writer.
  - **Diff:** `Injector.ts @@ -1439,9 +1334,9 @@` plus the subsequent Mach-O hunks through `@@ -1620,7 +1521,7 @@`. The replacement names are present in every listed use.
  - **Old-form sweep:** Pattern `\b(Loff|Lsize|Lvm)(?:s|ed|ing)?\b`; `Injector.ts`; no hit.
  - **Report:** `applied` — “`Loff`/`Lsize`/`Lvm` → `linkeditOffset`/`linkeditSize`/`linkeditAddress`...” The current tree matches.
  - **Proof:** Naming sweep agrees.

- **sea-subj-7**
  - **Site now:** `#destroyed` is absent. `execute()` reads `this.#emitter.destroyed` at `SEA.ts:94-96`; `destroy()` calls `this.#emitter.destroy()` at `:151`.
  - **Diff:** `SEA.ts @@ -70,14 +91,14 @@` and `@@ -128,8 +149,6 @@`. The private flag and guard are removed.
  - **Old-form sweep:** Pattern `#destroyed`; package source and tests; no hit.
  - **Report:** `applied` — “`#destroyed` deleted; `execute()` reads `this.#emitter.destroyed`; `destroy()` calls...” The current tree matches.
  - **Proof:** `sea-subj-7-green.txt`: `Tests 186 passed (186)`. No failing-first control exists; the report explicitly records “not run red”.

- **sea-subj-8**
  - **Site now:** `SEABrotliOptions` is at `types.ts:75-78`; `SEACompressionOptions` extends it at `:86-88`; helper parameters use it at `helpers.ts:223` and `:270`; the guide fence is `guides/sea.md:317`.
  - **Diff:** `types.ts @@ -66,19 +74,27 @@`; `helpers.ts @@ -211,13 +213,14 @@` and `@@ -258,13 +261,13 @@`. The repair is present.
  - **Old-form sweep:** Pattern `compressDirectory\('dist/app/browser', \{ paths:`; package guide; no hit.
  - **Report:** `applied` — “`SEABrotliOptions` declared... the guide fence reads `compressDirectory('dist/app/browser', { mode: 'text' })`.” The current tree matches.
  - **Proof:** No row-specific control file exists; this parameter-contract change has no failing-first reading in the report.

- **sea-subj-9**
  - **Site now:** `AssetManagerOptions.assets` is at `types.ts:314`; `AssetManager.load()` iterates `#paths` at `AssetManager.ts:88-110`. The client constants are absent from `constants.ts`; the guide Constants table has no client-key rows.
  - **Diff:** `AssetManager.ts @@ -62,43 +84,30 @@`; `constants.ts @@ -46,12 +? @@`; tests add disk-load cases at `AssetManager.test.ts:167-260`.
  - **Old-form sweep:** Patterns `CLIENT_ASSET_KEY_RAW|CLIENT_ASSET_KEY_BR`; package paths; no hit.
  - **Report:** `applied` — “`AssetManagerOptions.assets` added; `load()` iterates it...” The current tree matches.
  - **Proof:** `sea-subj-9-red.txt`: `Tests 2 failed (184 passed)`. `sea-subj-9-green.txt`: `Tests 186 passed (186)`. Both controls exist.

- **sea-subj-10**
  - **Site now:** Constants are at `constants.ts:75-86`; `Injector.ts` imports them at `:40-44`; no local `PT_LOAD`, `PT_PHDR`, `PF_R`, or `PAGE` declarations remain. `#verifyELFNoteMapping` uses `ELF_PT_LOAD` at `:1211`.
  - **Diff:** `constants.ts @@ -78,6 +72,18 @@`; `Injector.ts @@ -37,8 +38,? @@`, `@@ -1047,24 +981,10 @@`, and `@@ -1314,7 +1209,7 @@`. The named constants and replacement are present.
  - **Old-form sweep:** Patterns `\b(PT_LOAD|PT_PHDR|PF_R|PAGE)\b` limited to local declarations; no stale local declaration hit.
  - **Report:** `applied` — “`ELF_PT_LOAD`, `ELF_PT_PHDR`, `ELF_PF_R`, `ELF_PAGE_SIZE` added...” The current tree matches.
  - **Proof:** Placement sweep and guide Constants rows agree.

- **sea-subj-12**
  - **Site now:** Class TSDoc blocks precede `SEA.ts:73`, `Injector.ts:89`, `AssetManager.ts:38`, and `Asset.ts:22`. The old `// ===` separators are absent; Injector’s former floating block is attached to the class.
  - **Diff:** Class-file hunks add the blocks, including `Injector.ts @@ -58,8 +63,32 @@` and `SEA.ts @@ -26,9 +26,? @@`.
  - **Old-form sweep:** Pattern `// === (SEA|Injector|AssetManager)`; class files; no hit.
  - **Report:** `applied` — “TSDoc blocks on `SEA`, `Injector`, `AssetManager`, and `Asset`...” The current tree matches.
  - **Proof:** Documentation sweep agrees.

- **sea-subj-14**
  - **Site now:** `ensureExists` has `@throws` at `helpers.ts:77`; `compressFile` at `:220`; `patchSentinelFuse` at `:1088-1090`; short-read helpers also document `FORMAT`.
  - **Diff:** `helpers.ts @@ -73,6 +? @@`, `@@ -211,13 +213,14 @@`, and `@@ -1066,6 +1085,9 @@`. The required lines are present.
  - **Old-form sweep:** Pattern `@param.*(ensureExists|compressFile|patchSentinelFuse)` followed by no `@throws`; helper docs; no missing required throw description.
  - **Report:** `applied` — “`@throws` added to `ensureExists`, `compressFile`, and `patchSentinelFuse`...” The current tree matches.
  - **Proof:** Documentation sweep agrees.

- **sea-subj-15**
  - **Site now:** `constants.ts:21`, `helpers.ts:84`, `guides/sea.md:68` and `:104`, and `helpers.test.ts:839` use present-tense wording. The prior-release phrases are absent at `types.ts:463` and `guides/sea.md:32`.
  - **Diff:** `constants.ts @@ -18,7 +18,7 @@`; `helpers.ts @@ -81,? +82,? @@`; guide and test hunks contain the replacements.
  - **Old-form sweep:** Patterns `\bshould\b|prior behavior|unchanged default behavior|matching prior behavior`; package prose and tests; no hit.
  - **Report:** `applied` — “`should` struck from `constants.ts`, `helpers.ts`, `guides/sea.md`, and `helpers.test.ts`...” The current tree matches.
  - **Proof:** Writing sweep agrees.

- **sea-subj-16**
  - **Site now:** The cited `AGENTS §...` references are absent from `guides/sea.md`, `guides/README.md`, `tests/integration.test.ts`, `tests/src/server/seas/SEA.test.ts`, and `tests/setupServer.ts`.
  - **Diff:** Guide and test hunks remove the parentheticals, including `guides/README.md @@ -1,7 +1,7 @@` and `guides/sea.md @@ -196,17 +203,17 @@`.
  - **Old-form sweep:** Pattern `AGENTS\s*§|§9|§10|§16|§22`; named package paths; no hit.
  - **Report:** `applied` — “Every numbered `AGENTS` citation deleted...” The current tree matches.
  - **Proof:** Documentation sweep agrees.

- **sea-subj-17**
  - **Site now:** `guides/README.md:27` says the dependency is used by `SEA` and `AssetManager`.
  - **Diff:** `guides/README.md @@ -24,12 +24,19 @@`; the `+` line contains `SEA`.
  - **Old-form sweep:** Pattern `\bSeal\b`; guide index; no hit.
  - **Report:** `applied` — “`guides/README.md` names `SEA`, not `Seal`.” The current tree matches.
  - **Proof:** Naming sweep agrees.

- **sea-subj-18**
  - **Site now:** `guides/README.md:26` says “one of this package’s runtime dependencies”; `process.md` is named at `:35-41`; development mirrors are named at `:44-49`.
  - **Diff:** `guides/README.md @@ -24,12 +24,19 @@` and `@@ -37,6 +44,11 @@`. The dependency and mirror paragraphs are present.
  - **Old-form sweep:** Pattern `this package's other runtime dependency|guides/(process|test|probe|scaffold)\.md`; the guide index; the stale phrase is absent and all mirrors are named.
  - **Report:** `applied` — “`process.md` paragraph added... `test.md`, `probe.md`, and `scaffold.md` named...” The current tree matches.
  - **Proof:** Documentation sweep agrees.

- **sea-subj-20**
  - **Site now:** `guides/sea.md:26` says “runs the pipeline” without “three-step”.
  - **Diff:** `guides/sea.md @@ -23,13 +23,13 @@`; the added sentence removes the number.
  - **Old-form sweep:** Pattern `three-step`; guide; no hit.
  - **Report:** `applied` — “`guides/sea.md` Overview reads ‘runs the pipeline...’” The current tree matches.
  - **Proof:** Documentation sweep agrees.

- **fleet-F1**
  - **Site now:** `tests/setup.ts` has no `isBrowserVuePath`; `tests/setup.test.ts` retains its existing `encodeContent` proof. No browser source or setup module exists.
  - **Report:** `noop` — “`isBrowserVuePath` ... empty.” The current tree agrees.
  - **Sweep:** Pattern `isBrowserVuePath`; `src`, `tests`; no hit.

- **fleet-F2**
  - **Site now:** No implementation class has a public `readonly id: string`; `SEA`, `Injector`, `AssetManager`, and `Asset` are the relevant classes. `Asset` exposes `key`, `content`, and `compressed`, not `id`.
  - **Report:** `noop` — “No implementation class has the shape.” The current tree agrees.
  - **Sweep:** Pattern `readonly id:`; `src`; no hit.

### Across the unit

**Scope tags**

The status paths are under the owned source, test, and guide scopes, except for field-specific `package.json` drift:

- `README.md`, `guides/README.md`, `guides/sea.md`: owned.
- All listed `src/server/**` paths: owned.
- All listed `tests/**` paths: owned, excluding no vendored file.
- The two `seals/ → seas/` renames: owned.
- `package.json`: only named fields are owned. The keyword deletion is outside the owned field set and the `engines` change is also outside it. No off-limits path appears in status.

**Diff hunks with no matching row site**

- `README.md @@ -102,7 +103,7 @@ process.stdout.write(` — `+- **Node.js >= 24.8.0** ...`
- `package.json @@ -91,6 +90,6 @@` — `+"node": ">=24.8.0"`

All other hunks touch a row-named site or an in-package consumer of a row.

**Residue**

Diff `+`-line sweep pattern `^\+[^+].*(\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger)` over `conform-sea.diff`:

- `console.log('hello from sea')` at `tests/integration.test.ts:17,73,109,175`.
- The same string at `tests/src/server/seas/SEA.test.ts:60,91,113,138,178,210,268,312,395,427,465,500`.

No added `.skip`, `.only`, `.todo`, retry, timeout, TODO, FIXME, or debugger hit.

Tree sweep over `src` and `tests`, excluding the four vendored test files:

- `src/server/seas/SEA.ts:265,298` — `timeout`.
- `src/server/helpers.ts:149,153,176,183` — `timeout`.
- `src/server/errors.ts:23,51,73,99` — `console.` in examples.
- `src/server/types.ts:117,356,435,449` — `timeout`.
- `tests/src/server/helpers.test.ts:90,92` — `timeout`; `:193,1013` — `context.skip()`.
- `tests/src/server/seas/SEA.test.ts:60,91,113,138,178,210,268,312,395,427,465,500` — fixture `console.log`; `:88,97,110,119` — `timeout`; `:279` — `context.skip()`.
- `tests/integration.test.ts:17,73,109,175` — fixture `console.log`; `:204` — `context.skip()`.
- `tests/setupServer.test.ts:53,60` — fixture `console.log`.

**Parity**

| Entity | Interface members in `types.ts` | Guide Methods rows |
|---|---|---|
| `SEAInterface` | `execute`, `destroy` at `src/server/types.ts:537-538` | `guides/sea.md:193-194` |
| `InjectorInterface` | `inject` at `src/server/types.ts:264` | `guides/sea.md:202` |
| `AssetManagerInterface` | `asset`, `assets`, `keys`, `register`, `load`, `clear`, `destroy` at `src/server/types.ts:327-333` | `guides/sea.md:210-216` |
| `AssetInterface` | No methods | No Methods table |

Readonly data properties are `SEAInterface.emitter/status` at `types.ts:535-536`, `InjectorInterface.format` at `:262`, `AssetInterface.key/content/compressed` at `:288-290`, and `AssetManagerInterface.emitter/count` at `:325-326`. The guide names `SEA` members in `guides/sea.md:26`, `Injector.format` at `:233`, and all `Asset` data at `:46`; `AssetManager.emitter/count` are not named in its Surface row at `:47`.

Added guide identifiers resolve as follows:

- Local exports such as `buildSignCommand`, `buildBlobConfig`, `resolvePlatform`, `SEABrotliOptions`, `ELFProgramHeader`, `PEResourceLeaf`, `PEResourceEntry`, `PESection`, `ELF_PT_LOAD`, `ELF_PT_PHDR`, `ELF_PF_R`, and `ELF_PAGE_SIZE` are exported by `src/server/index.ts:1-12`.
- `SEA`, `AssetManager`, and their members resolve through the same barrel.
- `@orkestrel/process`, `@orkestrel/test`, `@orkestrel/probe`, `@orkestrel/scaffold`, and `@orkestrel/guide` are external dependency tokens, not exports of the SEA barrel.

**Gates quoted from the report**

- `npm run format:check` — exit `0`.
- `npm run lint:check` — exit `0`.
- `npm run check` — exit `0`.
- `npm run build` — exit `0`.
- `npm test` — exit `0`.
- `npx scaffold audit --offline` — exit `0`.
- `node /home/user/scaffold/tmp/work/evidence.mjs sea` — exit `0`.

**Breaking**

The report names no fleet consumer. The old-name sweep over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding `sea`, `node_modules`, and vendored guide mirrors, found no hit for:

- `platformConfig`
- `createSignCommand`
- `createBlobConfig`
- `CLIENT_ASSET_KEY_RAW`
- `CLIENT_ASSET_KEY_BR`

The report’s consumer edits are therefore limited to in-package replacements and the `AssetManagerOptions.assets` migration.

**Writing sweep**

Diff `+`-line prose sweep over `guides/**`, `README.md`, source doc comments, and test comments/titles:

- `guides/sea.md:185` — `e.g.` in the retained Surface explanation.
- Constructor syntax `new Asset`, `new AssetManager`, and `new Injector` appears in added TSDoc examples at `src/server/assets/Asset.ts:16`, `src/server/assets/AssetManager.ts:30`, and `src/server/injectors/Injector.ts:82`; these are code examples, not prose claims.
- No added prose hit for `should`, `simply`, `easy`, `easier`, `just`, `currently`, `now`, `latest`, `utilize`, `leverage`, `via`, `in order to`, `i.e.`, `etc.`, `please`, `sanity`, `dummy`, `ensure`, or `guarantee`.
- Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`: no added-line hit.

## Distillate

- `sea-obj-1: site now Injector.ts:413,876-893 | diff present yes | old form hits 0 | report matches yes`
- `sea-obj-2: site now setupServer.ts:356,376; SEA.test.ts:17 | diff present yes | old form hits 0 | report matches yes`
- `sea-obj-3: site now AssetManager.ts:1-15 | diff present yes | old form hits 0 | report matches yes`
- `sea-obj-4: site now types.ts:153-220; Injector.ts:240,294,461,558,574,630,987,1066,1076,1158,1178 | diff present yes | old form hits 0 | report matches yes`
- `sea-obj-5: site now guides.test.ts:186-240 | diff present yes | old form hits 0 | report matches yes`
- `sea-obj-7: site now integration.test.ts:1-6,166-173,204 | diff present yes | old form hits 0 | report matches yes`
- `sea-obj-8: site now SEA.ts:169-179 | diff present yes | old form hits 0 | report matches yes`
- `sea-obj-9: site now helpers.ts:336-342,359-365,486-492,503-509 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-1: site now types.ts:330; AssetManager.ts:75 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-2: site now seas/SEA.ts; index.ts:9; package.json:9 | diff present yes | old form hits 0 | report matches no for the shared-patch statement`
- `sea-subj-3: site now helpers.ts:639,940 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-4: site now helpers.ts:54 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-5: site now Injector.ts:1338-1340 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-7: site now SEA.ts:94-96,151 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-8: site now types.ts:75-88; helpers.ts:223,270 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-9: site now types.ts:314; AssetManager.ts:88-110 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-10: site now constants.ts:75-86; Injector.ts:1211 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-12: site now SEA.ts:73, Injector.ts:89, AssetManager.ts:38, Asset.ts:22 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-14: site now helpers.ts:77,220,1088-1090 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-15: site now constants.ts:21; helpers.ts:84; guide:68,104 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-16: site now guide and test citation sites | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-17: site now guides/README.md:27 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-18: site now guides/README.md:26,35-49 | diff present yes | old form hits 0 | report matches yes`
- `sea-subj-20: site now guides/sea.md:26 | diff present yes | old form hits 0 | report matches yes`
- `fleet-F1: site now no helper; setup test retained | diff present no | old form hits 0 | report matches yes`
- `fleet-F2: site now no matching class | diff present no | old form hits 0 | report matches yes`

Scope tags: all source, test, guide, and rename paths are owned; `package.json` contains edits outside the named owned fields. Residue contains no added skip/debug/TODO pattern, but the tree retains existing skips, timeouts, and fixture `console.log` matches. Writing has one added `e.g.` hit plus constructor syntax in TSDoc examples. Parity methods match the guide tables; `AssetManager.emitter/count` are not named in its Surface row.

## Unknowns

- `sea-obj-7` has no row-specific failing-first control; only the final integration gate reading exists.
- `sea-subj-7` has a green control but no failing-first control.
- `sea-subj-8` has no row-specific control file.
- The report does not state whether the imperative helper TSDoc at `tests/setupServer.ts:349` and `:361` was intentional; it conflicts with the required third-person TSDoc form.
- The report does not account for the unrelated `README.md` runtime-version hunk or `package.json` engine-version hunk.

## Journal

Leave this line for the driver.

## Deviation

The evidence tree contains unscoped changes at `README.md:103` and `package.json:90`; the latter also contradicts the report’s claim that the `"seal"` keyword deletion remains only a shared-file patch. No independent gate or containment command was run in this read-only audit; the gate readings above are the supplied report evidence.