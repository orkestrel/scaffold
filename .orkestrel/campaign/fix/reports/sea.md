# Fix report: sea

## Dispositions

- **s12-01** deferred_wave: TSDoc first-sentence voice across the fleet. The brief defers first-sentence voice to the dedicated later wave, so nothing was rewritten. The moved `isExecutableFormat` block carries its original imperative sentence verbatim into `src/server/validators.ts` so the wave's sweep still finds it; every TSDoc sentence newly authored here (`alignTo`, `readU32`, `readU64`, `writeU32`, `writeU64`, `appendFile`, `stripTrailingNulls`) uses the third-person form.
- **s12-02** applied (src/server/validators.ts, src/server/helpers.ts, src/server/index.ts, tests/src/server/validators.test.ts): Created `src/server/validators.ts` holding `isExecutableFormat`, removed it from `helpers.ts` with its now-unused `ExecutableFormat` type import, and added `export * from './validators.js'` to `src/server/index.ts`. The barrel keeps the export reachable under its existing name, so the published surface is unchanged. `isPlatformSupported`, `isCompressible`, `isPowerOfTwo`, and `isPEExecutable` stay in `helpers.ts`. Added `tests/src/server/validators.test.ts` — the guard had no test before the move.
- **s12-03** deferred_breaking: `parsePEOffset` re-verified present at `src/server/helpers.ts` and exported through the barrel with a `guides/sea.md` Surface row. Renaming it to `readPEOffset` renames a published exported symbol, which the brief's breaking test defers whole. No part of this repair stands on its own.
- **s12-05** deferred_breaking: `runShell` re-verified present and exported; `executeSync` is still imported from `@orkestrel/process/server` in the same module, so the finding stands. Renaming to `executeShell` renames a published exported symbol, deferred whole.
- **s12-06** applied (src/server/helpers.ts): Applied what the two lane corrections share: `createSignCommand` now returns `readonly string[]` (readonly tightening on a public return collection) and `runShell` accepts `readonly string[]` as the required compile consequence. The `AssetManagerInterface.register` sub-claim is where the lanes genuinely conflict — the DRIFT lane drops it as unreached by either quoted rule, the DRIFT-RESHAPE lane widens it and annotates the narrowing — so it is unapplied and reported as a deviation rather than resolved.
- **s12-07** deferred_breaking: The compound member `entryTotal` is re-verified present in `buildELFNoteHeader`'s inline return type. Both lane corrections agree the member must be renamed to `total`, but `buildELFNoteHeader` is a barrel export with a `guides/sea.md` Surface row, so renaming a property of its returned record moves the published surface and breaks `const { entryTotal } = buildELFNoteHeader(...)` in any consumer. The brief's breaking test defers a property rename whole; the lanes' remaining disagreement (declare `ELFNoteHeader` in `types.ts` versus keep the shape inline) rides with it to the work order.
- **s12-08** applied (src/server/constants.ts): Annotated `export const SKIP_EXTENSIONS: ReadonlySet<string>` in `src/server/constants.ts`. Type-level readonly tightening on a published collection; no runtime change.
- **s12-09** applied (src/server/helpers.ts): `helpers.ts` now imports `DEFAULT_ENTRY_FORMAT` from `./constants.js` and uses it as the fallback in `createBlobConfig`, replacing the hardcoded `'cjs'`. The constant's declared value is `'cjs'`, so the applied default is byte-identical and the declared and applied defaults are now one fact.
- **s12-10** applied (src/server/assets/AssetManager.ts): Deleted `#keys` from `AssetManager`. `keys()` now returns `[...this.#assets.keys()]`, `#add` reduces to the single `set`, and `clear` drops the separate reset. The `Map` is insertion-ordered and `#add` already overwrote a duplicate key in place, so key order and de-duplication are unchanged. The AssetManager suite (46 tests) passes.
- **s12-11** applied (src/server/seals/SEA.ts, tests/src/server/helpers.test.ts): Reduced the guard in `SEA.execute` to `if (platform === undefined)` and removed the now-unused `isPlatformSupported` import from `SEA.ts`. Re-verified the equivalence: both calls were argument-less, so both read `process.platform` against the same `SEA_PLATFORMS` record. `isPlatformSupported` stays exported and documented (removing it would be breaking), but the change left it with no source consumer and no test, so I added a `helpers.test.ts` block pinning it against `platformConfig` across supported and unsupported identifiers.
- **s12-12** applied (src/server/seals/SEA.ts): Renamed `#blob` to `#buildBlob` and `#assets` to `#resolveAssets`, updating both call sites in `execute` and `#buildBlob`. Private members only.
- **s12-13** applied (src/server/injectors/Injector.ts, src/server/helpers.ts, guides/sea.md, tests/src/server/helpers.test.ts): Applied the non-breaking whole of the repair. Deleted `#readU16`, `#writeU16`, `#readU32`, `#readU64`, `#writeU32`, `#writeU64`, `#align`, `#appendFile`, and `#stripTrailingNulls` from `Injector`; `#readU16`/`#writeU16` now call the existing exported helpers, and the rest moved into `helpers.ts` under a new `// === Binary Helpers` section as exported `readU32`, `readU64`, `writeU32`, `writeU64`, `appendFile`, `stripTrailingNulls`, and the general `alignTo(value, alignment)`, each with TSDoc, an `@example`, a `guides/sea.md` Surface row, and unit tests. `alignELFNoteSize` is retained and reimplemented as `alignTo(value, 4)` — deleting it would remove a published export, so that half of the repair is deferred while the centralization it exists for is done. A stale `#appendFile` mention in the `#patchChecksum` comment now names `appendFile`. Injector suite (111 tests) passes.
- **s12-14** applied (src/server/injectors/Injector.ts, src/server/assets/AssetManager.ts): Renamed every identifier the repair names: `#injectPE`, `#injectELF`, `#injectMachO`, `#loadSEA` (AssetManager), `#readELFProgramHeaders`, `#writeELFProgramHeaderEntry`, `#readELFNoteName`, `#verifyELFNoteMapping`, `#shiftMachOLinkeditOffsets`, `#verifyMachOSection`, `#fixupDirectoryRVAs`, `dataRVA`, `sectionVA`, plus `existingResourceRVA`, which the finding's `wrong` clause names though its `repair` list omits it. All are `#` privates or method-local identifiers. `rvaToFileOffset` stays as leading-acronym camelCase.
- **s12-15** applied (src/server/errors.ts): Replaced `execFileSync` with `executeSync` in the `errors.ts` header comment. Re-verified against `helpers.ts`, where `runShell` calls `executeSync` from `@orkestrel/process/server`; `execFileSync` appears nowhere in the package.
- **s12-16** applied (src/server/assets/AssetManager.ts, src/server/assets/Asset.ts, src/server/seals/SEA.ts, src/server/injectors/Injector.ts): Deleted the restated file-header blocks from `assets/AssetManager.ts`, `assets/Asset.ts`, and `seals/SEA.ts` entirely — each only repeated its interface TSDoc in `types.ts`, and the AssetManager header carried the drifted 'In development' wording the interface states as 'Outside SEA'. In `injectors/Injector.ts` the restated opening is gone and the PE/ELF/Mach-O strategy note is kept verbatim, as the repair directs.
- **s12-17** deferred_breaking: `SEAProgressHandler` re-verified at `src/server/types.ts` with a `SEACompressionResult` parameter, so the naming mismatch stands. Renaming it to `SEACompressionHandler` renames a published exported type carrying a `guides/sea.md` Types row, deferred whole.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2495ms on 52 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no diagnostics, exit 0)
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.server.json (no diagnostics)
- npm run build: pass — 12 modules transformed. dist/src/server/index.cjs 93.97 kB | gzip: 25.06 kB. built in 3.69s. Copied: dist/src/server/index.d.ts to dist/src/server/index.d.cts
- npm test: pass — src:server 7 files / 179 tests passed; injector project 111 passed; assets project 46 passed; setup 2 files / 18 passed; guides 28 passed; integration 4 passed. No failures.

## Diffstat

```text
 guides/sea.md                     |  20 +++
 src/server/assets/Asset.ts        |   7 -
 src/server/assets/AssetManager.ts |  19 +--
 src/server/constants.ts           |   2 +-
 src/server/errors.ts              |   2 +-
 src/server/helpers.ts             | 189 +++++++++++++++++++++---
 src/server/index.ts               |   1 +
 src/server/injectors/Injector.ts  | 295 +++++++++++++++-----------------------
 src/server/seals/SEA.ts           |  19 +--
 tests/src/server/helpers.test.ts  | 122 ++++++++++++++++
 10 files changed, 438 insertions(+), 238 deletions(-)

Untracked (not counted by `git diff --stat`): src/server/validators.ts (19 lines), tests/src/server/validators.test.ts (23 lines).
```

- dist moves: true

## Deviations

1. s12-06 lane conflict, unresolved by design. The two corrections genuinely conflict on the `AssetManagerInterface.register` sub-claim: the DRIFT/medium lane says to drop it entirely because no quoted rule reaches a method parameter, and the DRIFT-RESHAPE/high lane says to widen `register(input: AssetInput | readonly AssetInput[]): void` in `types.ts:223` and `AssetManager.ts:62` and to annotate `const items: readonly AssetInput[]` at `AssetManager.ts:63`. Per the brief I applied only what they share (the `createSignCommand` return type and the `runShell` parameter) and left `register` untouched for the work order to rule on. Note for that ruling: I confirmed the DRIFT-RESHAPE lane's annotation warning is real — widening the union without annotating `items` lets it infer `any[]`, which `AGENTS.md` bans outright, so the widening cannot ship without the annotation.

2. s12-14 named set only. `Injector.ts` carries the same acronym fold in identifiers the finding names in neither its `wrong` nor its `repair` clause: `newVa`, `sectionRva`, `resourceDirRvaOffset`, `currentRva`, `highestVaEnd`. They are method-local and the fix is mechanical, but they sit outside the finding's enumerated scope, so I left them and record them here for the next change against the same rule. `regionVaddr`, `maxVaddrEnd`, `relVaddr`, and `expectedVaddr` are not in that set — `p_vaddr` is the ELF header field's own lowercase name, not a folded acronym.

3. s12-13 partial by the breaking test, recorded so the work order sees the remainder. `alignELFNoteSize` is retained rather than replaced, because deleting a barrel export with a guide Surface row is breaking. It now delegates to `alignTo(value, 4)`, so there is one implementation and no drift, and a test pins the two against each other across aligned and unaligned values. The work order still owns removing `alignELFNoteSize` in favour of `alignTo` at the next breaking window.

4. Two tests added beyond a repair's literal text. s12-13's repair calls for unit tests on the moved leaves, which I wrote. I also added an `isPlatformSupported` block to `helpers.test.ts` because applying s12-11 removed that helper's only source consumer and it had no test; without it the change would leave a public export with neither a caller nor a guard. Both additions are additive and no existing test was renamed or deleted.

5. Ancillary choices recorded rather than escalated: the new exported leaves sit in a new `// === Binary Helpers` section of `helpers.ts` placed before `// === PE Helpers`, `readU16`/`writeU16` stay where they were, and the new helper names are `readU32`, `readU64`, `writeU32`, `writeU64`, `appendFile`, `stripTrailingNulls`, `alignTo`. `stripTrailingNulls` uses `'\0'` where the private used `String.fromCharCode(0)` — same character, and the change is covered by the new table test.
