# Findings for group g02

Packages: sea. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s12-01

1. package=sea,interpret,terminal file=fleet-wide rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: Every public export's TSDoc opens in the imperative (`Create`, `Check`, `Decode`, `Narrow`, `Determine whether`, `Sanitize`) instead of the required third-person `-s` form.
   repair: Rewrite each first sentence to third person (`Creates`, `Checks whether`, `Decodes`, `Narrows`, `Sanitizes`). Representative sites: `sea/src/server/helpers.ts:46,58,80,93,104,136,153,206,219,267,305,315,327,339,353,374,391,439,521,533,569,615,651,707,743,796,807,847,909,976`; `sea/src/server/factories.ts:17,39,64,79`; `sea/src/server/errors.ts:43,91` (noun clause, also non-conforming); `interpret/src/core/helpers.ts:25,46,73,118,150,169,198,231,406,480,521,549,592,623,651,691,728,776,812`; `interpret/src/core/factories.ts:41,84,102,123,141,158,175,199,221,244,264,296`; `interpret/src/core/validators.ts:42,69,93,116,161,185,203,225,255,278,308,330`; `interpret/src/core/errors.ts:36`; `terminal/src/core/helpers.ts:42,112,142,158,294,349,379,416,439,475,499,535,573,619,666,715,723,760,801,824,835,841,850`; `terminal/src/core/validators.ts:12,20,44,54`; `terminal/src/core/factories.ts:21,48,75,95,112`; `terminal/src/server/helpers.ts:25,51,69,91,105,122,136,157,187,203,215,227,232,253,263,273`; `terminal/src/server/factories.ts:6`.

### sea

## s12-02

2. package=sea file=src/server/helpers.ts:51 rule=`.claude/rules/architecture.md` § Centralized-file pattern, § Kind purity verdict=CONFIRMED
   wrong: `isExecutableFormat` is a total `Guard<ExecutableFormat>` (`(unknown) => value is T`) living in `helpers.ts`; guards belong in `validators.ts`, which this package does not have.
   repair: Create `src/server/validators.ts`, move `isExecutableFormat` there, add `export * from './validators.js'` to `src/server/index.ts`. Leave `isPlatformSupported`, `isCompressible`, `isPowerOfTwo`, and `isPEExecutable` in `helpers.ts` — they are predicates, not guards.

## s12-03

3. package=sea file=src/server/helpers.ts:320 rule=`.claude/rules/names.md` § Fixed derivation/construction forms verdict=CONFIRMED
   wrong: `parsePEOffset` carries the `parse*` form, which is fixed to a coercion producing `T | undefined`; this function reads four bytes from a file descriptor and always returns a number.
   repair: Rename to `readPEOffset`, matching its siblings `readU16` and `writeU16`, and update `Injector.ts` and the guide row.

## s12-04

4. package=sea file=src/server/helpers.ts:465,766 rule=`AGENTS.md` § Design laws ("One concept, one term"); `.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
   wrong: `createSignCommand` and `createBlobConfig` build plain data values, while the sibling `buildELFNoteHeader` (helpers.ts:829) builds a plain data value under a different verb; `create*` is the form reserved for the entity factories in `factories.ts`.
   repair: Rename to `buildSignCommand` and `buildBlobConfig`, leaving `create*` to `factories.ts`, and update `SEA.ts:38,39,243,379` and the guide rows.

## s12-05

5. package=sea file=src/server/helpers.ts:163 rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
   wrong: `runShell` uses `run` for running work to completion, which the table fixes as `execute` and explicitly bans synonyms for; the same file imports `executeSync` from `@orkestrel/process` at line 33, so both words for one act sit in one module.
   repair: Rename to `executeShell` and update `SEA.ts:50,254,306,328,338,381,390`, `errors.ts:60,67`, and the guide row.

## s12-06

6. package=sea file=src/server/helpers.ts:465,163 and src/server/types.ts:223 rule=`AGENTS.md` § Non-negotiable rules ("public return collections readonly"); `.claude/rules/typescript.md` § Immutability verdict=CONFIRMED
   wrong: `createSignCommand` returns a mutable `string[]`, `runShell` accepts a mutable `string[]` while its sibling `redactCommand` (helpers.ts:141) already accepts `readonly string[]`, and `AssetManagerInterface.register` accepts `AssetInput | AssetInput[]`.
   repair: Return and accept `readonly string[]` in both helpers, and declare `register(input: AssetInput | readonly AssetInput[]): void` in `types.ts` and `AssetManager.ts:62`.

## s12-07

7. package=sea file=src/server/helpers.ts:829-832 rule=`AGENTS.md` § Non-negotiable rules ("define reusable and public types in `*/types.ts`"); `.claude/rules/names.md` § Entity-scoped names verdict=CONFIRMED
   wrong: `buildELFNoteHeader` declares its public return shape inline as `{ readonly header: Buffer; readonly entryTotal: number }`, and `entryTotal` is a compound member of that record.
   repair: Declare `ELFNoteHeader { readonly header: Buffer; readonly total: number }` in `src/server/types.ts`, annotate the return type with it, and rename the member to `total` at helpers.ts:843 and its consumer in `Injector.ts`.

## s12-08

8. package=sea file=src/server/constants.ts:22 rule=`AGENTS.md` § Non-negotiable rules ("public return collections readonly"); `.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
   wrong: `SKIP_EXTENSIONS` is an exported `Set<string>` with no readonly annotation, so any consumer can `add` or `delete` on this package's compression policy; every sibling collection in the file is `Object.freeze`d and `Readonly<…>`-typed.
   repair: Annotate `export const SKIP_EXTENSIONS: ReadonlySet<string> = new Set([…])`.

## s12-09

9. package=sea file=src/server/constants.ts:47 rule=`AGENTS.md` § Design laws ("Minimal public API"); `.claude/rules/documentation.md` § Parity verdict=CONFIRMED
   wrong: `DEFAULT_ENTRY_FORMAT` is exported and documented in `guides/sea.md:92`, but no source or test reads it; `createBlobConfig` hardcodes the same literal at helpers.ts:772 (`entry.format ?? 'cjs'`), so the declared default and the applied default are separate facts that can drift.
   repair: Import `DEFAULT_ENTRY_FORMAT` in `helpers.ts` and use it at line 772 as the fallback.

## s12-10

10. package=sea file=src/server/assets/AssetManager.ts:30,58-60,113-117,126-131 rule=`AGENTS.md` § Design laws ("Derive state"); `.claude/rules/typescript.md` § Immutability verdict=CONFIRMED
    wrong: `#keys: string[]` stores a second copy of the key list that `#assets` (an insertion-ordered `Map`) already holds, maintained by hand in `#add` and reset separately in `clear`.
    repair: Delete `#keys`; make `keys()` return `[...this.#assets.keys()]`, reduce `#add` to `this.#assets.set(asset.key, asset)`, and drop the `this.#keys = []` line from `clear`.

## s12-11

11. package=sea file=src/server/seals/SEA.ts:89-90 rule=`AGENTS.md` § Design laws ("Derive state"); `.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
    wrong: `platform === undefined || !isPlatformSupported()` tests one fact twice — `platformConfig(p)` returns `undefined` exactly when `p in SEA_PLATFORMS` is false — so the second operand can never change the branch.
    repair: Reduce the condition to `if (platform === undefined)`.

## s12-12

12. package=sea file=src/server/seals/SEA.ts:234,426 rule=`.claude/rules/names.md` § General vocabulary ("methods are verbs") verdict=CONFIRMED
    wrong: The private methods `#blob` and `#assets` are nouns that perform work (generating the SEA blob, resolving the embedded-asset map), while their siblings `#check`, `#validate`, `#compress`, and `#assemble` are verbs.
    repair: Rename to `#buildBlob` and `#resolveAssets`, updating the call sites at lines 111 and 249.

## s12-13

13. package=sea file=src/server/injectors/Injector.ts:1744,1750,1756,1762,1768,1774,1780,1807,1827 rule=`.claude/rules/architecture.md` § Functions and orchestration (leaf test), § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: `#readU16` and `#writeU16` are byte-identical re-implementations of the exported helpers `readU16` (helpers.ts:333) and `writeU16` (helpers.ts:346); `#align(value, alignment)` is the general form of the exported `alignELFNoteSize` (helpers.ts:801), which is `#align(value, 4)`. `#readU32`, `#readU64`, `#writeU32`, `#writeU64`, `#appendFile`, and `#stripTrailingNulls` are equally pure leaves that touch no `#` state.
    repair: Delete `#readU16` and `#writeU16` and call the exported helpers; move the remaining leaves into `helpers.ts` as exported functions with unit tests; replace `alignELFNoteSize` with the general `alignTo(value, alignment)` and call it with `4` at helpers.ts:842.

## s12-14

14. package=sea file=src/server/injectors/Injector.ts:75,78,81,158,1040,1350 and src/server/assets/AssetManager.ts:39,133 rule=`.claude/rules/names.md` § Acronyms verdict=CONFIRMED
    wrong: `#injectPe`, `#injectElf`, `#injectMacho`, and `#loadSea` title-fold canonical acronyms and proper names that this same package keeps in canonical case elsewhere — `isPEExecutable`, `stripPESignature`, `alignELFNoteSize`, `InjectorMachOOptions`, `SEAError`. The same folding runs through the PE identifiers `dataRva`, `sectionVa`, `existingResourceRva`, and `#fixupDirectoryRvas` (Injector.ts:198-200,275,442,451,504,516,529,578,913,957).
    repair: Rename to `#injectPE`, `#injectELF`, `#injectMachO`, `#loadSEA`, `#readELFProgramHeaders`, `#writeELFProgramHeaderEntry`, `#readELFNoteName`, `#verifyELFNoteMapping`, `#shiftMachOLinkeditOffsets`, `#verifyMachOSection`, `dataRVA`, `sectionVA`, and `#fixupDirectoryRVAs`. Leading-acronym camelCase such as `rvaToFileOffset` already conforms and stays.

## s12-15

15. package=sea file=src/server/errors.ts:6 rule=`.claude/rules/typescript.md` § Comments and API documentation; `.claude/rules/documentation.md` § Parity verdict=CONFIRMED
    wrong: The header comment states that `runShell` "maps a failed `execFileSync` invocation to a `ShellError`", but `runShell` calls `executeSync` from `@orkestrel/process` (helpers.ts:175); `execFileSync` appears nowhere in the package.
    repair: Replace `execFileSync` with `executeSync` in that sentence.

## s12-16

16. package=sea file=src/server/assets/AssetManager.ts:1-7 rule=`.claude/rules/typescript.md` § Comments and API documentation; `.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
    wrong: The file-header comment restates the `AssetManagerInterface` TSDoc from `types.ts:210-216` and has already drifted from it — the header says "In development, `load()` reads client assets from disk", the interface says "Outside SEA". The same duplication sits at `assets/Asset.ts:1-6`, `seals/SEA.ts:1-7`, and `injectors/Injector.ts:1-10`.
    repair: Delete the restated prose from each header, keeping only what the interface TSDoc does not carry (the PE/ELF/Mach-O strategy note in `Injector.ts:7-9`).

## s12-17

17. package=sea file=src/server/types.ts:66 rule=`AGENTS.md` § Design laws ("One concept, one term"); `.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `SEAProgressHandler` is named for `SEAProgress` but its parameter is `SEACompressionResult`; a caller reading the name expects the `{ path, current, total }` record the `progress` event carries (`types.ts:305-312`).
    repair: Rename to `SEACompressionHandler`, and update `helpers.ts:11,277` and the guide row.

## s12-18

18. package=sea file=src/server/types.ts:118 rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `ExecutableFormat` is the only unqualified type name in a barrel where every sibling is entity-scoped (`SEA*`, `Injector*`, `Asset*`); it is the format axis of `InjectorInterface`, so a consumer cannot predict its owner.
    repair: Rename to `InjectorFormat` and update `helpers.ts:2,51`, `Injector.ts:12,60,67,99`, `types.ts:159`, and the guide.

## s12-19

19. package=sea file=src/server/seals/SEA.ts:179 rule=`.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
    wrong: `#validate` calls `createSignCommand(sign, 'placeholder')` and discards the result, using an argv builder as a validator; the builder therefore owns two jobs and a caller of the builder cannot tell which throws are validation.
    repair: Extract the certificate-source, timestamp, and digest checks into `ensureSignOptions(sign)` in `helpers.ts`, call it from both `createSignCommand` and `#validate`, and delete the placeholder call.

## s12-20

20. package=sea file=src/server/seals/SEA.ts:205 rule=`AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: The accumulator is typed `Array<SEACompressionManifest['assets'][number]>` when the named element type `SEACompressionResult` is declared at `types.ts:32`.
    repair: Import `SEACompressionResult` and write `const assets: SEACompressionResult[] = []`.

### interpret