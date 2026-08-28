## Coverage

**sea** (`/home/user/fleet/sea/src/server/`) — read in full: `types.ts`, `index.ts`, `constants.ts`, `errors.ts`, `helpers.ts`, `factories.ts`, `assets/Asset.ts`, `assets/AssetManager.ts`, `seals/SEA.ts`. `injectors/Injector.ts` read at lines 1-180 and 1740-1831, with its full member list, constant use, and acronym-cased identifiers enumerated by grep; its PE/ELF/Mach-O byte-layout bodies were not read line by line.

**interpret** (`/home/user/fleet/interpret/src/core/`) — read in full: `types.ts`, `index.ts`, `constants.ts`, `errors.ts`, `validators.ts`, `helpers.ts`, `factories.ts`, `Interpret.ts`, `Narrator.ts`, `managers/TemplateManager.ts`, `managers/SubjectManager.ts`, `managers/InterpretContext.ts`, `stages/Clarifier.ts`, `stages/Extractor.ts`, `stages/Formatter.ts`, `stages/Generator.ts`. `managers/DefinitionManager.ts` read from line 30; `stages/Normalizer.ts` read from line 40. Installed `@orkestrel/*` declarations searched for overlap with `escapeRegExp`, `canonicalize`, `digestValue`, `tokenize`, and similarity primitives — no match, so no ecosystem-reuse finding is raised.

**terminal** (`/home/user/fleet/terminal/src/`) — read in full: `core/types.ts`, `core/index.ts`, `core/errors.ts`, `core/validators.ts`, `core/factories.ts`, `core/helpers.ts`, `core/Prompt.ts`, `core/TerminalManager.ts`, `core/MemoryTerminalStore.ts`, `server/types.ts`, `server/helpers.ts`, `server/constants.ts`, `server/factories.ts`, `server/index.ts`. `core/constants.ts` read from line 180; `core/PromptClient.ts`, `core/DatabaseTerminalStore.ts`, and `server/Terminal.ts` read at their declaration surfaces (fields, methods, signatures) rather than line by line — their bodies are not covered.

Rules read: `AGENTS.md`, `.claude/rules/names.md`, `typescript.md`, `architecture.md`, `patterns.md`, `documentation.md`, `writing.md`. Guides consulted as evidence: `sea/guides/sea.md`, `interpret/guides/interpret.md`.

## Findings

1. package=sea,interpret,terminal file=fleet-wide rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: Every public export's TSDoc opens in the imperative (`Create`, `Check`, `Decode`, `Narrow`, `Determine whether`, `Sanitize`) instead of the required third-person `-s` form.
   repair: Rewrite each first sentence to third person (`Creates`, `Checks whether`, `Decodes`, `Narrows`, `Sanitizes`). Representative sites: `sea/src/server/helpers.ts:46,58,80,93,104,136,153,206,219,267,305,315,327,339,353,374,391,439,521,533,569,615,651,707,743,796,807,847,909,976`; `sea/src/server/factories.ts:17,39,64,79`; `sea/src/server/errors.ts:43,91` (noun clause, also non-conforming); `interpret/src/core/helpers.ts:25,46,73,118,150,169,198,231,406,480,521,549,592,623,651,691,728,776,812`; `interpret/src/core/factories.ts:41,84,102,123,141,158,175,199,221,244,264,296`; `interpret/src/core/validators.ts:42,69,93,116,161,185,203,225,255,278,308,330`; `interpret/src/core/errors.ts:36`; `terminal/src/core/helpers.ts:42,112,142,158,294,349,379,416,439,475,499,535,573,619,666,715,723,760,801,824,835,841,850`; `terminal/src/core/validators.ts:12,20,44,54`; `terminal/src/core/factories.ts:21,48,75,95,112`; `terminal/src/server/helpers.ts:25,51,69,91,105,122,136,157,187,203,215,227,232,253,263,273`; `terminal/src/server/factories.ts:6`.

### sea

2. package=sea file=src/server/helpers.ts:51 rule=`.claude/rules/architecture.md` § Centralized-file pattern, § Kind purity verdict=CONFIRMED
   wrong: `isExecutableFormat` is a total `Guard<ExecutableFormat>` (`(unknown) => value is T`) living in `helpers.ts`; guards belong in `validators.ts`, which this package does not have.
   repair: Create `src/server/validators.ts`, move `isExecutableFormat` there, add `export * from './validators.js'` to `src/server/index.ts`. Leave `isPlatformSupported`, `isCompressible`, `isPowerOfTwo`, and `isPEExecutable` in `helpers.ts` — they are predicates, not guards.

3. package=sea file=src/server/helpers.ts:320 rule=`.claude/rules/names.md` § Fixed derivation/construction forms verdict=CONFIRMED
   wrong: `parsePEOffset` carries the `parse*` form, which is fixed to a coercion producing `T | undefined`; this function reads four bytes from a file descriptor and always returns a number.
   repair: Rename to `readPEOffset`, matching its siblings `readU16` and `writeU16`, and update `Injector.ts` and the guide row.

4. package=sea file=src/server/helpers.ts:465,766 rule=`AGENTS.md` § Design laws ("One concept, one term"); `.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
   wrong: `createSignCommand` and `createBlobConfig` build plain data values, while the sibling `buildELFNoteHeader` (helpers.ts:829) builds a plain data value under a different verb; `create*` is the form reserved for the entity factories in `factories.ts`.
   repair: Rename to `buildSignCommand` and `buildBlobConfig`, leaving `create*` to `factories.ts`, and update `SEA.ts:38,39,243,379` and the guide rows.

5. package=sea file=src/server/helpers.ts:163 rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
   wrong: `runShell` uses `run` for running work to completion, which the table fixes as `execute` and explicitly bans synonyms for; the same file imports `executeSync` from `@orkestrel/process` at line 33, so both words for one act sit in one module.
   repair: Rename to `executeShell` and update `SEA.ts:50,254,306,328,338,381,390`, `errors.ts:60,67`, and the guide row.

6. package=sea file=src/server/helpers.ts:465,163 and src/server/types.ts:223 rule=`AGENTS.md` § Non-negotiable rules ("public return collections readonly"); `.claude/rules/typescript.md` § Immutability verdict=CONFIRMED
   wrong: `createSignCommand` returns a mutable `string[]`, `runShell` accepts a mutable `string[]` while its sibling `redactCommand` (helpers.ts:141) already accepts `readonly string[]`, and `AssetManagerInterface.register` accepts `AssetInput | AssetInput[]`.
   repair: Return and accept `readonly string[]` in both helpers, and declare `register(input: AssetInput | readonly AssetInput[]): void` in `types.ts` and `AssetManager.ts:62`.

7. package=sea file=src/server/helpers.ts:829-832 rule=`AGENTS.md` § Non-negotiable rules ("define reusable and public types in `*/types.ts`"); `.claude/rules/names.md` § Entity-scoped names verdict=CONFIRMED
   wrong: `buildELFNoteHeader` declares its public return shape inline as `{ readonly header: Buffer; readonly entryTotal: number }`, and `entryTotal` is a compound member of that record.
   repair: Declare `ELFNoteHeader { readonly header: Buffer; readonly total: number }` in `src/server/types.ts`, annotate the return type with it, and rename the member to `total` at helpers.ts:843 and its consumer in `Injector.ts`.

8. package=sea file=src/server/constants.ts:22 rule=`AGENTS.md` § Non-negotiable rules ("public return collections readonly"); `.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
   wrong: `SKIP_EXTENSIONS` is an exported `Set<string>` with no readonly annotation, so any consumer can `add` or `delete` on this package's compression policy; every sibling collection in the file is `Object.freeze`d and `Readonly<…>`-typed.
   repair: Annotate `export const SKIP_EXTENSIONS: ReadonlySet<string> = new Set([…])`.

9. package=sea file=src/server/constants.ts:47 rule=`AGENTS.md` § Design laws ("Minimal public API"); `.claude/rules/documentation.md` § Parity verdict=CONFIRMED
   wrong: `DEFAULT_ENTRY_FORMAT` is exported and documented in `guides/sea.md:92`, but no source or test reads it; `createBlobConfig` hardcodes the same literal at helpers.ts:772 (`entry.format ?? 'cjs'`), so the declared default and the applied default are separate facts that can drift.
   repair: Import `DEFAULT_ENTRY_FORMAT` in `helpers.ts` and use it at line 772 as the fallback.

10. package=sea file=src/server/assets/AssetManager.ts:30,58-60,113-117,126-131 rule=`AGENTS.md` § Design laws ("Derive state"); `.claude/rules/typescript.md` § Immutability verdict=CONFIRMED
    wrong: `#keys: string[]` stores a second copy of the key list that `#assets` (an insertion-ordered `Map`) already holds, maintained by hand in `#add` and reset separately in `clear`.
    repair: Delete `#keys`; make `keys()` return `[...this.#assets.keys()]`, reduce `#add` to `this.#assets.set(asset.key, asset)`, and drop the `this.#keys = []` line from `clear`.

11. package=sea file=src/server/seals/SEA.ts:89-90 rule=`AGENTS.md` § Design laws ("Derive state"); `.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
    wrong: `platform === undefined || !isPlatformSupported()` tests one fact twice — `platformConfig(p)` returns `undefined` exactly when `p in SEA_PLATFORMS` is false — so the second operand can never change the branch.
    repair: Reduce the condition to `if (platform === undefined)`.

12. package=sea file=src/server/seals/SEA.ts:234,426 rule=`.claude/rules/names.md` § General vocabulary ("methods are verbs") verdict=CONFIRMED
    wrong: The private methods `#blob` and `#assets` are nouns that perform work (generating the SEA blob, resolving the embedded-asset map), while their siblings `#check`, `#validate`, `#compress`, and `#assemble` are verbs.
    repair: Rename to `#buildBlob` and `#resolveAssets`, updating the call sites at lines 111 and 249.

13. package=sea file=src/server/injectors/Injector.ts:1744,1750,1756,1762,1768,1774,1780,1807,1827 rule=`.claude/rules/architecture.md` § Functions and orchestration (leaf test), § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: `#readU16` and `#writeU16` are byte-identical re-implementations of the exported helpers `readU16` (helpers.ts:333) and `writeU16` (helpers.ts:346); `#align(value, alignment)` is the general form of the exported `alignELFNoteSize` (helpers.ts:801), which is `#align(value, 4)`. `#readU32`, `#readU64`, `#writeU32`, `#writeU64`, `#appendFile`, and `#stripTrailingNulls` are equally pure leaves that touch no `#` state.
    repair: Delete `#readU16` and `#writeU16` and call the exported helpers; move the remaining leaves into `helpers.ts` as exported functions with unit tests; replace `alignELFNoteSize` with the general `alignTo(value, alignment)` and call it with `4` at helpers.ts:842.

14. package=sea file=src/server/injectors/Injector.ts:75,78,81,158,1040,1350 and src/server/assets/AssetManager.ts:39,133 rule=`.claude/rules/names.md` § Acronyms verdict=CONFIRMED
    wrong: `#injectPe`, `#injectElf`, `#injectMacho`, and `#loadSea` title-fold canonical acronyms and proper names that this same package keeps in canonical case elsewhere — `isPEExecutable`, `stripPESignature`, `alignELFNoteSize`, `InjectorMachOOptions`, `SEAError`. The same folding runs through the PE identifiers `dataRva`, `sectionVa`, `existingResourceRva`, and `#fixupDirectoryRvas` (Injector.ts:198-200,275,442,451,504,516,529,578,913,957).
    repair: Rename to `#injectPE`, `#injectELF`, `#injectMachO`, `#loadSEA`, `#readELFProgramHeaders`, `#writeELFProgramHeaderEntry`, `#readELFNoteName`, `#verifyELFNoteMapping`, `#shiftMachOLinkeditOffsets`, `#verifyMachOSection`, `dataRVA`, `sectionVA`, and `#fixupDirectoryRVAs`. Leading-acronym camelCase such as `rvaToFileOffset` already conforms and stays.

15. package=sea file=src/server/errors.ts:6 rule=`.claude/rules/typescript.md` § Comments and API documentation; `.claude/rules/documentation.md` § Parity verdict=CONFIRMED
    wrong: The header comment states that `runShell` "maps a failed `execFileSync` invocation to a `ShellError`", but `runShell` calls `executeSync` from `@orkestrel/process` (helpers.ts:175); `execFileSync` appears nowhere in the package.
    repair: Replace `execFileSync` with `executeSync` in that sentence.

16. package=sea file=src/server/assets/AssetManager.ts:1-7 rule=`.claude/rules/typescript.md` § Comments and API documentation; `.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
    wrong: The file-header comment restates the `AssetManagerInterface` TSDoc from `types.ts:210-216` and has already drifted from it — the header says "In development, `load()` reads client assets from disk", the interface says "Outside SEA". The same duplication sits at `assets/Asset.ts:1-6`, `seals/SEA.ts:1-7`, and `injectors/Injector.ts:1-10`.
    repair: Delete the restated prose from each header, keeping only what the interface TSDoc does not carry (the PE/ELF/Mach-O strategy note in `Injector.ts:7-9`).

17. package=sea file=src/server/types.ts:66 rule=`AGENTS.md` § Design laws ("One concept, one term"); `.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `SEAProgressHandler` is named for `SEAProgress` but its parameter is `SEACompressionResult`; a caller reading the name expects the `{ path, current, total }` record the `progress` event carries (`types.ts:305-312`).
    repair: Rename to `SEACompressionHandler`, and update `helpers.ts:11,277` and the guide row.

18. package=sea file=src/server/types.ts:118 rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `ExecutableFormat` is the only unqualified type name in a barrel where every sibling is entity-scoped (`SEA*`, `Injector*`, `Asset*`); it is the format axis of `InjectorInterface`, so a consumer cannot predict its owner.
    repair: Rename to `InjectorFormat` and update `helpers.ts:2,51`, `Injector.ts:12,60,67,99`, `types.ts:159`, and the guide.

19. package=sea file=src/server/seals/SEA.ts:179 rule=`.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
    wrong: `#validate` calls `createSignCommand(sign, 'placeholder')` and discards the result, using an argv builder as a validator; the builder therefore owns two jobs and a caller of the builder cannot tell which throws are validation.
    repair: Extract the certificate-source, timestamp, and digest checks into `ensureSignOptions(sign)` in `helpers.ts`, call it from both `createSignCommand` and `#validate`, and delete the placeholder call.

20. package=sea file=src/server/seals/SEA.ts:205 rule=`AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: The accumulator is typed `Array<SEACompressionManifest['assets'][number]>` when the named element type `SEACompressionResult` is declared at `types.ts:32`.
    repair: Import `SEACompressionResult` and write `const assets: SEACompressionResult[] = []`.

### interpret

21. package=interpret file=src/core/types.ts:205,339,342,350,377,387,420,428,566,567,586,656 (and `Interpret.ts:64`, `errors.ts:3`, `constants.ts:3,108`, `helpers.ts:16,51,556,596,784`, `factories.ts:267`, `validators.ts:29,38`, `Narrator.ts:11`, `managers/TemplateManager.ts:20,102`, `managers/SubjectManager.ts:23,94`, `managers/DefinitionManager.ts:87`, `managers/InterpretContext.ts`, `stages/Clarifier.ts:95,175`, `stages/Normalizer.ts:16,56`) rule=`AGENTS.md` § Writing ("NEVER name a list item by its position"); `.claude/rules/writing.md` § Claims and time verdict=CONFIRMED
    wrong: Public TSDoc cites the coding contract by section number (`AGENTS §13`, `§9.1`, `§17.7`, `§4.6.1`). `AGENTS.md` has no numbered sections, so none of these citations resolves, and naming a section by ordinal is banned outright.
    repair: Replace each with the section's name (`AGENTS.md § Design laws`, `.claude/rules/patterns.md § Managers`, and so on), or delete the citation where the sentence already states the rule.

22. package=interpret file=src/core/types.ts:99,120,181,271,305,323,346,565 (and `Interpret.ts:47,56`, `helpers.ts:655`, `constants.ts:7`, `managers/TemplateManager.ts:26`, `managers/SubjectManager.ts:20`, `managers/InterpretContext.ts:25`, `stages/Clarifier.ts:36`, `stages/Extractor.ts:15`, `stages/Formatter.ts:24`, `stages/Generator.ts:34`) rule=`AGENTS.md` § Authority and loading ("Never import assumptions, names, or logic from another repository"); `.claude/rules/writing.md` § Claims and time verdict=CONFIRMED
    wrong: Published TSDoc explains this package's behaviour by contrast with an unpublished predecessor project ("scsr's defect 2", "unlike scsr, which bumped on every add", "AGENTS-flagged scsr defect 4"). A consumer cannot check any of it, and the reference dates the prose to a codebase they cannot see.
    repair: State each behaviour positively (`an identical re-add keeps its version`) and delete every `scsr` mention from `src/`.

23. package=interpret file=src/core/helpers.ts:45-71 rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc") verdict=CONFIRMED
    wrong: The `setField` TSDoc block sits at lines 45-71, immediately followed by the `deriveAggregateField` block at 72-94 and by `deriveAggregateField` itself at line 95. The exported `setField` at line 103 therefore carries no TSDoc at all, and the detached block attaches to nothing.
    repair: Move the lines 45-71 block down so it sits directly above `export function setField` at line 103.

24. package=interpret file=src/core/helpers.ts:831 rule=`.claude/rules/architecture.md` § Centralized-file pattern, § Kind purity ("wrong file, right name → move it") verdict=CONFIRMED
    wrong: `parseTemplate` is a coercer returning `Template | undefined`, which is the `parsers.ts` kind; it sits in `helpers.ts`, and the package has no `parsers.ts`.
    repair: Create `src/core/parsers.ts`, move `parseTemplate` there, and add `export * from './parsers.js'` to `src/core/index.ts`. The barrel star-export keeps the published surface identical.

25. package=interpret file=src/core/types.ts:509 and src/core/factories.ts:170 rule=`AGENTS.md` § Design laws ("Minimal public API … do not speculate"); `.claude/rules/names.md` § Fixed derivation/construction forms (leading `_`) verdict=CONFIRMED
    wrong: `GeneratorOptions` is an empty interface documented as a seam for "a future knob", and `createGenerator(_options?: GeneratorOptions)` declares a parameter it discards. Nothing requires that signature, so the `_` binding has no conformance justification. `Generator.ts:35-37` documents the speculation, but the creation gate states no exception, so this is CONFIRMED rather than EXEMPT.
    repair: Delete `GeneratorOptions`, its `factories.ts:11` import, and the parameter, leaving `createGenerator(): GeneratorInterface`. Delete the "reserved extension seam" sentences at `types.ts:505-508` and `Generator.ts:35-37`, and the guide row.

26. package=interpret file=src/core/factories.ts:288 rule=`.claude/rules/architecture.md` § Wrapper test ("Delete … pass-through factories"); `.claude/rules/names.md` § Rejected naming verdict=CONFIRMED
    wrong: `createTemplate(data: Template): Template` constructs nothing — it guards its argument and returns it unchanged — and its parameter is already typed `Template`, so the guard is unreachable for any type-checked caller. The parameter name `data` is on the rejected-generic list.
    repair: Move it to `helpers.ts` as `ensureTemplate(value: unknown): Template`, keeping the coded throw, so the guard has a reason to run; name the parameter `value`. Update `guides/interpret.md` and the `parseTemplate` pairing note at `factories.ts:267-269`.

27. package=interpret file=src/core/managers/TemplateManager.ts:52-138, managers/SubjectManager.ts:39-129, managers/DefinitionManager.ts:37-124 rule=`AGENTS.md` § TTTDD step 3 (Consolidation); `.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice", "one shared engine") verdict=CONFIRMED
    wrong: `TemplateManager`, `SubjectManager`, and `DefinitionManager` are the same registry written out three times. The `remove` overload bodies (TemplateManager.ts:103-124, SubjectManager.ts:95-116, DefinitionManager.ts:88-109) are identical; so are `size`, `has`, the plural accessor, the hash-and-version rule inside `add`, `destroy`, and `#ensureAlive`.
    repair: Extract one `RecordManager<T>` engine in `managers/` owning the `Map`, the content-hash and version rule, the `remove` overloads, `destroy`, and `#ensureAlive`. Leave each concrete manager with its accessor noun pair, its id source (`template.id`, `definition.id`, the minted `subject-{n}`), and its event map.

28. package=interpret file=src/core/managers/InterpretContext.ts rule=`.claude/rules/architecture.md` § Kind or folder, § Entity subfolders verdict=CONFIRMED
    wrong: `InterpretContext` is not a manager — it is the execution context that owns two managers — but it sits in the `managers/` folder, which every other member of names by role.
    repair: Move the file to `src/core/InterpretContext.ts`, beside `Interpret.ts` and `Narrator.ts`, and update `index.ts:17`, `Interpret.ts:33`, and `factories.ts:30`.

29. package=interpret file=src/core/types.ts:749-750, Interpret.ts:322,328,325 and types.ts:356,370 rule=`AGENTS.md` § Design laws ("One concept, one term. Do not alternate synonyms") verdict=CONFIRMED
    wrong: One act — putting a template into the registry — has two names in one package. `InterpretInterface` calls it `register`/`unregister` and fires a `register` event; the `TemplateManagerInterface` it delegates to calls it `add`/`remove` and fires an `add` event.
    repair: Rename `InterpretInterface.register`/`unregister` to `add`/`remove` and the `InterpretEventMap` row to `add`, matching the manager the calls forward to; update `Interpret.ts:322-331`, `types.ts:353-356`, the guide, and the examples.

30. package=interpret file=src/core/types.ts:152-156 and Interpret.ts:148,170 rule=`AGENTS.md` § Design laws ("Absence is `undefined`. Never invent sentinels such as … `''`") verdict=CONFIRMED
    wrong: An unclassified intent is published as `{ action: '', domain: '', confidence: 0 }` — an empty-string sentinel on a required public field, constructed inline at two call sites and taught in the `classifyIntent` example at `helpers.ts:432`.
    repair: Declare `readonly action?: string` and `readonly domain?: string` on `Intent`, return `undefined` for an unmatched axis in `classifyIntent`, and adjust `scoreTemplate` (helpers.ts:641-643) and `Formatter.format` (Formatter.ts:61) to read absence. The internal `-1` accumulators at `helpers.ts:305,354,677` are the same class and are best replaced with `undefined` in the same pass.

31. package=interpret file=src/core/Interpret.ts:413 rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
    wrong: `#abort` cancels nothing and propagates no signal; it records a stage failure, emits `error`, and assembles a visible incomplete result. `abort` is fixed to "cancel with signal propagation".
    repair: Rename to `#fail`, updating the call sites at lines 145, 167, 228, 251, and 273.

32. package=interpret file=src/core/Interpret.ts:413-427,449-460,366-375 rule=`.claude/rules/names.md` § Split instead of compounding; `.claude/rules/patterns.md` § Options verdict=CONFIRMED
    wrong: `#abort` threads thirteen positional parameters, `#assemble` ten, and `#gate` eight, so call sites read as runs of `[], [], stages, …, undefined, undefined` (lines 145-159, 167-181) in which a transposed argument is invisible.
    repair: Build one per-call record inside `interpret()` (`text`, `normalized`, `intent`, `entities`, `ambiguities`, `stages`, `templateId`, `templateVersion`) declared in `types.ts`, and give each private method that record plus its own distinct arguments.

33. package=interpret file=src/core/types.ts:560-562 and src/core/factories.ts:47-48 rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped") verdict=CONFIRMED
    wrong: Both blocks state that when a stage slot is omitted "the built-in stage is constructed from the matching per-stage options". `InterpretOptions` carries no `NormalizerOptions`, `ExtractorOptions`, `FormatterOptions`, or `GeneratorOptions` key, and `Interpret.ts:118-122` constructs `new Normalizer()`, `new Extractor()`, `new Formatter()`, and `new Generator()` with no arguments. Only `Clarifier` receives anything, and only the shared `floor`.
    repair: Either add the per-stage option keys to `InterpretOptions` and thread them, or correct both sentences to say the built-in stage is constructed with its own defaults and that a caller configuring a stage supplies the constructed instance.

34. package=interpret file=src/core/types.ts:575,581 rule=`AGENTS.md` § Design laws ("One concept, one term"); `.claude/rules/patterns.md` § Options verdict=CONFIRMED
    wrong: `InterpretOptions` carries `formatter` (the `FormatterInterface` pipeline stage) and `formatters` (the `Narrator`'s value-formatter map) as sibling keys one letter apart, naming two unrelated concepts.
    repair: Group the narrator settings under the configured entity noun — `readonly narrator?: { readonly lexicon?: Lexicon; readonly formatters?: Readonly<Record<string, NarratorFormatter>> }` — and update `Interpret.ts:123-126`.

35. package=interpret file=src/core/Interpret.ts:356 rule=`.claude/rules/typescript.md` § Immutability ("Never mutate caller-owned inputs") verdict=CONFIRMED
    wrong: `destroy()` calls `this.#context.destroy()` on a context the caller may have supplied through `options.context`, which `types.ts:557` documents as "a shared `InterpretContextInterface`". Destroying one orchestrator therefore tears down a context another orchestrator is still using.
    repair: Record whether the context was constructed here (`#ownsContext`), and destroy it in `destroy()` only when it was. Referral: whether any current consumer relies on the present behaviour is an objective-lane question.

36. package=interpret file=src/core/stages/Clarifier.ts:226, src/core/stages/Formatter.ts:72,74,77, src/core/Interpret.ts:383-384 rule=`AGENTS.md` § Design laws ("Mechanism, not product policy") verdict=CONFIRMED
    wrong: The forward direction mints user-facing English from core literals — `` `What is your ${mapping.entity}?` ``, `' with '`, `' (defaults: …)'`, `' needed: '`, `'Which domain and action did you mean?'` — while `types.ts:428-430` states that "Every phrase, label, and template string a `Narrator` renders is DATA supplied here, never a core literal". The reverse direction has the seam; the forward direction bypasses it.
    repair: Add the ambiguity and prompt phrasings to `DEFAULT_LEXICON.templates` under `ambiguity.*` and `prompt.*` keys, pass the `NarratorInterface` into `Clarifier` and `Formatter`, and render each line through `narrator.line`.

37. package=interpret file=src/core/stages/Generator.ts:104-124 rule=`AGENTS.md` § Design laws ("Mechanism, not product policy") verdict=CONFIRMED
    wrong: For a multi-element numeric array the `Generator` writes sibling fields named `Sum`, `Count`, `Average`, `Minimum`, and `Maximum` onto the subject, derived by string concatenation. The template author declared none of them, cannot suppress them, and a template that already declares `amountsSum` is silently overwritten.
    repair: Move the aggregate set behind a declared opt-in on the template (an `aggregates?: readonly string[]` member on `EntityMapping`, or a `ComputedField` the author writes), so the mechanism emits only fields the template asked for.

38. package=interpret file=src/core/constants.ts:89,92,95,98,101 rule=`AGENTS.md` § Design laws ("Minimal public API … do not speculate"); `.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
    wrong: `DEFAULT_ABBREVIATIONS`, `DEFAULT_CORRECTIONS`, `DEFAULT_ACTIONS`, `DEFAULT_DOMAINS`, and `DEFAULT_VERBS` are exported frozen empty records; their only use is `{ ...DEFAULT_X, ...options?.x }`, which is identical to `{ ...options?.x }`. `guides/interpret.md:149-153,194-198` publishes each as an API returning `{}`.
    repair: Delete the empty constants and their spreads at `Normalizer.ts:38-40`, `Extractor.ts:35-36`, and `Formatter.ts:52`; keep the neutrality statement in each options type's TSDoc. `DEFAULT_CONTRACTIONS` carries real data and stays.

39. package=interpret file=src/core/constants.ts:32 rule=`.claude/rules/documentation.md` § Parity; `AGENTS.md` § Design laws ("Minimal public API") verdict=CONFIRMED
    wrong: `INTERPRET_ID` is documented as the "Default `id` for an `Interpret` orchestrator" and published at `guides/interpret.md:135,183`, but `InterpretOptions` has no `id` key, `InterpretInterface` exposes no `id`, and no source or test reads the constant.
    repair: Delete `INTERPRET_ID` and its guide rows.

40. package=interpret file=src/core/errors.ts:10-17 rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped") verdict=CONFIRMED
    wrong: The `InterpretError` remark states it is "Thrown for: an injected stage implementation throwing during its phase (`NORMALIZE_FAILED` / `EXTRACT_FAILED` / `CLARIFY_FAILED` / `FORMAT_FAILED` / `GENERATE_FAILED`)". No site constructs those codes — every `new InterpretError(…)` in `src/` carries `DESTROYED` or `INVALID_TEMPLATE`, and a stage throw surfaces on `StageFailure` while the raw value is re-emitted. The same remark says `context` "carries the offending stage / template id"; no call site supplies a context argument.
    repair: Restate the remark to name only the codes that throw, and either populate `context` at the `DESTROYED` and `INVALID_TEMPLATE` throws or drop that sentence. `types.ts:47-57` already carries the accurate description.

41. package=interpret file=src/core/types.ts:604-609,614-619 rule=`.claude/rules/names.md` § Split instead of compounding; `.claude/rules/patterns.md` § Options verdict=CONFIRMED
    wrong: `ClarifierInterface.clarify(entities, template, context, intent)` and `FormatterInterface.format(intent, template, entities, ambiguities)` are public methods taking four positional arguments of which two are the same kinds in different orders; the published example at `Clarifier.ts:58` has to pass a bare `undefined` for a middle slot.
    repair: Declare `ClarifyInput` and `FormatInput` in `types.ts` (the `{Entity}Input` form) and give each method one grouped argument.

42. package=interpret file=src/core/types.ts:666,683,697 rule=`.claude/rules/names.md` § Tallies verdict=EXEMPT
    wrong: `TemplateManagerInterface`, `SubjectManagerInterface`, and `DefinitionManagerInterface` each expose a lone tally named `size`, which the tallies rule fixes as `count` when a tally is alone and unambiguous.
    repair: The exception is stated at `types.ts:659` and `managers/TemplateManager.ts:20` ("`size` (never `count` — this is the sole tally in scope)"), citing a precedent in another package. Recorded as EXEMPT for the Orchestrator to rule on, because a TSDoc rationale does not carry an exception clause the rule itself does not state; `sea`'s `AssetManagerInterface.count` follows the rule.

43. package=interpret file=src/core/types.ts:541 rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `ManagerAddOptions` matches no required form — it embeds a method name in a type name and scopes to no entity.
    repair: Rename to `RecordOptions` (the record being added is the entity these options describe), updating the three manager signatures and their imports.

44. package=interpret file=src/core/types.ts:82 rule=`AGENTS.md` § Design laws ("One concept, one term"); `.claude/rules/names.md` § General vocabulary ("Describe what a thing is") verdict=CONFIRMED
    wrong: `EntityMapping.entity` holds an entity's NAME, not an entity, and sits beside `Entity.name` (types.ts:160), which holds the same string. Every consumer reads it as a name (`helpers.ts:278,308,370,391`, `Clarifier.ts:80,108,133`, `Generator.ts:72`).
    repair: Rename the member to `name`, matching `Entity.name`, and update the mapping literals in the examples and the guide.

45. package=interpret file=src/core/helpers.ts:574 rule=`AGENTS.md` § Design laws ("Minimal public API"); `.claude/rules/architecture.md` § System constraints ("Keep interfaces to the smallest primitives") verdict=CONFIRMED
    wrong: `canonicalize(value, visited = new Set())` publishes its recursion accumulator as a public parameter and then documents it as "(internal; omit at the call site)", so the published signature and the supported contract disagree.
    repair: Give the public export one parameter and carry the ancestor set on an exported `canonicalizeNode(value, ancestors)` leaf that `canonicalize` and `digestValue` call, or promote `visited` to a documented supported parameter named `ancestors`.

46. package=interpret file=src/core/Narrator.ts:70,72 rule=`AGENTS.md` § Design laws ("Absence is `undefined`") verdict=EXEMPT
    wrong: `line(id, values)` returns `''` for an absent template id, while its siblings `phrase` and `label` fall back to the lookup key; the empty string is the named sentinel form.
    repair: The behaviour is documented at `types.ts:640` ("falling back to an empty string when the id is absent"). Recorded as EXEMPT; if the Orchestrator rules against it, return the id itself, matching `phrase` and `label`.

47. package=interpret file=src/core/factories.ts:60 rule=`AGENTS.md` § Non-negotiable rules ("NEVER use mocks, behavioral fakes"); `.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
    wrong: The flagship `createInterpret` example passes a hand-rolled stage stub, `extractor: { extract: () => ({ … }) }`, teaching a reader to fake the stage instead of using the package's own `createExtractor`. `Interpret.ts:74` demonstrates the real construction for the same scenario.
    repair: Replace the stub with `createExtractor({ actions: { calculate: 'calculate' }, domains: { arithmetic: ['arithmetic'] } })`, matching the class example.

### terminal

48. package=terminal file=src/core/types.ts:27 and src/core/helpers.ts:97 rule=`AGENTS.md` § Design laws ("Absence is `undefined`. Never invent sentinels such as … `''`") verdict=CONFIRMED
    wrong: `parseKey` returns `name: ''` for an unrecognized sequence, and `KeyEvent.name` is a required `string`, so every consumer tests the sentinel rather than absence. `editLine` (helpers.ts:815) then has to defend against it by counting code points.
    repair: Declare `readonly name?: string` on `KeyEvent`, return the record without `name` at helpers.ts:97, and read absence at the reducer branches.

49. package=terminal file=src/core/helpers.ts:356,416,475,535,619,730 rule=`AGENTS.md` § Non-negotiable rules ("ALWAYS define reusable and public types in `*/types.ts`", "ALWAYS make interface properties and public return collections readonly"); `.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: The six `create*State` factories declare no return type, so their state shape exists only by inference and every consumer must write `ReturnType<typeof createInputState>` — the form used at helpers.ts:371,383,386,431,445,447,491,505,507,552,580,582,640,673,675,749,767,769. The inferred members are all mutable, and `choices` is a mutable array (helpers.ts:540,624), so a public return type leaks mutable collections.
    repair: Declare `InputState`, `PasswordState`, `ConfirmState`, `SelectState`, `CheckboxState`, and `EditorState` in `src/core/types.ts` with `readonly` members and `readonly FieldChoice[]` collections, annotate each factory's return type, and replace every `ReturnType<typeof …>` with the named type.

50. package=terminal file=src/core/MemoryTerminalStore.ts, src/core/DatabaseTerminalStore.ts rule=`.claude/rules/architecture.md` § Stores, § Extension categories verdict=CONFIRMED
    wrong: "Concrete stores live in `stores/`" — both concrete `TerminalStoreInterface` implementations sit flat in `src/core/`, though the store is exactly the designed pluggable seam the category-folder rule names.
    repair: Move both files to `src/core/stores/`, update `index.ts:10-11` and `factories.ts:15-16`. `TerminalStoreInterface` stays in `types.ts` and the `create*Store` factories stay in `factories.ts`, both already correct.

51. package=terminal file=src/core/TerminalManager.ts:233-239 and src/core/types.ts:546-548 rule=`.claude/rules/patterns.md` § Batch operations ("returns true only when all succeed") verdict=CONFIRMED
    wrong: `remove(names)` returns true when ANY listed endpoint was removed (`let removed = false; … if (this.#removeOne(name)) removed = true`), and `types.ts:547` documents that behaviour. `Prompt.stop(ids)` in the same package (Prompt.ts:123-129) correctly reports all-succeeded, so one package answers the same question two ways.
    repair: Start `removed` at `true` and clear it when `#removeOne` returns false, so every listed name is still attempted and the result reports all-succeeded; correct the `types.ts` remark to match.

52. package=terminal file=src/core/types.ts:555 and src/core/TerminalManager.ts:103 rule=`.claude/rules/patterns.md` § Managers ("Accessors") verdict=CONFIRMED
    wrong: `terminal(name)` returns `PromptInterface | undefined` but `terminals()` returns `readonly string[]`, so the plural accessor does not return what the singular returns; a caller wanting every broker must map the names back through `terminal`.
    repair: Declare `terminals(): readonly PromptInterface[]` returning `[...this.#terminals.values()]`, and expose the names as a separate `names(): readonly string[]` accessor for the `TARGET` message at TerminalManager.ts:143. `sea`'s `AssetManagerInterface` already uses that split.

53. package=terminal file=src/core/types.ts:539-540 rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped") verdict=CONFIRMED
    wrong: `TerminalManagerInterface`'s remark says `ask` "parks `form` from `from` to `to`, adding `to` if it is absent". The implementation rejects an unmounted target with a `TARGET` error (TerminalManager.ts:141-151), and the class TSDoc at TerminalManager.ts:32 states the opposite of `types.ts`. `types.ts` is authoritative for the contract, so the published contract and the shipped code disagree.
    repair: Correct `types.ts:539-540` to state that `ask` rejects with a `TerminalError` coded `TARGET` when `to` is not mounted, and that the caller must `add` it first.

54. package=terminal file=src/core/helpers.ts:312,326,337,342,371,431,491,552,640,749 and src/server/helpers.ts:100,210,222,227,242,253,263,282 rule=`.claude/rules/names.md` § Standalone helpers ("default to `{verb}{Noun}`") verdict=CONFIRMED
    wrong: A family of module helpers carries bare noun-phrase names for functions that render or compute — `promptHeader`, `hintedHeader`, `submitHeader`, `errorLine`, `inputView`, `passwordView`, `confirmView`, `selectView`, `checkboxView`, `editorView`, `groupHeader`, `lockedLine`, `suggestionLine`, `unavailableLine`, `numberedList`, `enabledChoices`, `disabledChoices` — while their file-mates `sanitizeSchema`, `serializePending`, `toggleIndex`, `editLine`, `fieldToText`, and `moveUp` follow the rule. `rawCapable` (server/helpers.ts:100) is a predicate named as an adjective, sitting directly beneath `isInputStream`, `isOutputStream`, and `isReadable`.
    repair: Rename to the `{verb}{Noun}` form — `renderPromptHeader`, `renderHintedHeader`, `renderSubmitHeader`, `renderErrorLine`, `renderInputView` (and siblings), `renderGroupHeader`, `renderLockedLine`, `renderSuggestionLine`, `renderUnavailableLine`, `renderNumberedList`, `filterEnabled`, `filterDisabled` — and `rawCapable` to `isRawCapable`.

55. package=terminal file=src/core/helpers.ts:894, src/core/constants.ts:214 rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary ("Never introduce synonyms") verdict=CONFIRMED
    wrong: `serializeShutdown` and the `SSE_EVENTS.shutdown` wire name use `shutdown` for "the broker is going away", which the table fixes as `destroy`. The vocabulary is this package's own, not an external spec's.
    repair: Rename the helper to `serializeDestroy` and the wire event value to `'destroy'`, updating the `PromptClient` dispatch and the constants remark.

56. package=terminal file=src/core/helpers.ts:204-232 rule=`.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice") verdict=CONFIRMED
    wrong: In `sanitizeSchema`'s switch, the `number` branch (lines 223-232) is character-identical to the `text`/`editor` branch (204-214), the `confirm` branch (243-246) to the `date`/`time`/`datetime`/`color` branch (233-242), and the `checkbox` branch (260-272) to the `select` branch (247-259).
    repair: Merge each identical pair into one case list — `case 'text': case 'editor': case 'number':`, `case 'date': … case 'confirm':`, `case 'select': case 'checkbox':`.

57. package=terminal file=src/core/types.ts:343,527 rule=`AGENTS.md` § Design laws ("Never invent sentinels such as … `'unknown'`"); `.claude/rules/names.md` § General vocabulary ("Name the axis a discriminant varies") verdict=CONFIRMED
    wrong: `AnswerError`'s `reason: 'unknown'` uses a banned label for a condition that is precisely known — no form is parked under that id — and `TerminalAnswerError`'s `reason: 'terminal'` names an entity rather than the condition (no endpoint is mounted under that name).
    repair: Rename the literals to `'unparked'` and `'unmounted'`, updating `Prompt.ts:144`, `TerminalManager.ts:192`, the remarks, and the guide.

58. package=terminal file=src/core/types.ts:262 rule=`.claude/rules/names.md` § Type-level identifiers ("Function type → `{Entity}Handler` or `{Entity}Function`") verdict=CONFIRMED
    wrong: `TimerCancel` is a function type matching neither required form, beside the correctly formed `TimerHandler` and `FetchHandler`.
    repair: Rename to `TimerCancelFunction`, updating `types.ts:259,261`, `helpers.ts:10,830`, `Prompt.ts` and `PromptClient.ts` field types.

59. package=terminal file=src/core/types.ts:274 rule=`.claude/rules/names.md` § Type-level identifiers ("Plain non-behavioral data → `{Entity}`") verdict=CONFIRMED
    wrong: `Parked` is an adjective, not an entity noun, for the broker's per-form runtime record, and it sits beside `PendingForm`, the wire record it contains.
    repair: Rename to `ParkedForm`, updating `Prompt.ts:3,44,162,209`.

60. package=terminal file=src/core/helpers.ts:821, src/core/constants.ts:194 rule=`.agents/orchestration.md` § Check the brief before you send it ("Keep the brief's control identifiers inside the brief") verdict=CONFIRMED
    wrong: Both section comments end with the campaign control identifier `(T-b)`, which names a work unit no reader of this package can resolve.
    repair: Delete `(T-b)` from both comments.

61. package=terminal file=src/core/errors.ts:3, src/core/TerminalManager.ts:40,97,174,223, src/core/factories.ts:60, src/core/MemoryTerminalStore.ts:10,21, src/core/DatabaseTerminalStore.ts:28,33,65, src/core/helpers.ts:34, src/server/helpers.ts:26,52,69 rule=`AGENTS.md` § Writing ("NEVER name a list item by its position") verdict=CONFIRMED
    wrong: Comments and public TSDoc cite the coding contract by section number (`AGENTS §12`, `§9.1`, `§9.2`, `§14`, `§21`, `§22`), which resolves to nothing — `AGENTS.md` has named sections only.
    repair: Replace each with the section's name (`.claude/rules/patterns.md § Managers`, `.claude/rules/typescript.md § Errors and outcomes`, and so on), or delete it where the sentence already states the rule.

62. package=terminal file=src/server/Terminal.ts:182,190,226,252,259,283,352,359,366,546,596 rule=`.claude/rules/names.md` § General vocabulary ("methods are verbs") verdict=CONFIRMED
    wrong: A run of private methods are nouns or adjectives that perform work: `#group`, `#locked`, `#editable`, `#text`, `#password`, `#editor`, `#unavailable`, `#list`, `#hint`, `#reader`, `#readline`. Their file-mates `#read`, `#bind`, `#report`, `#render`, `#accept`, `#finish`, `#close` are verbs.
    repair: Rename to verb forms — `#writeGroup`, `#writeLocked`, `#editableFields` → `#collectEditable`, `#askText`, `#askPassword`, `#askEditor`, `#writeUnavailable`, `#writeList`, `#formatHint`, `#startReader`, `#openReadline`.

63. package=terminal file=src/server/constants.ts:50,53,56,59,68,78,81,84,87,95 rule=`AGENTS.md` § Design laws ("Mechanism, not product policy") verdict=CONFIRMED
    wrong: `PromptTheme` is published as the presentation seam ("the theme decides what that meaning looks like, so a consumer re-maps styled output by naming roles", `types.ts:66-69`), but it covers only glyphs and styles. Every word the driver shows — `FALLBACK_SELECT_HINT`, `FALLBACK_CHECKBOX_HINT`, `FALLBACK_EDITOR_HINT`, `FALLBACK_CONFIRM_HINT`, `CONTROL_HINTS`, `FILE_HINT`, `SUGGESTION_LEAD`, `UNAVAILABLE_LEAD`, `LOCKED_MARK`, `REFUSAL_MESSAGE` — is a fixed English literal a consumer cannot re-map.
    repair: Add a `copy` axis to `PromptTheme` and `PromptThemeOptions` covering those slots, merged leaf by leaf like `icons` and `roles`; or state plainly in the `PromptTheme` TSDoc that copy is fixed and is not a consumer seam.

64. package=terminal file=src/core/PromptClient.ts:63 rule=`AGENTS.md` § Design laws ("One concept, one term") verdict=CONFIRMED
    wrong: The field is typed `PromptClientOptions['terminal']` when the named type `TerminalInterface` is declared at `types.ts:209` and already imported by this module's own options type.
    repair: Type the field `TerminalInterface`.

## Referrals

These are specifically evidenced questions outside the design-fit lane, addressed to the Orchestrator:

- `terminal/src/core/TerminalManager.ts:214-218` — `save(name)` reads `this.#config.get(name)?.timeout`, which holds only the per-call options. An endpoint added with no options under a manager-level `timeout` (constructor option, applied at line 113) persists a snapshot with no `timeout`, so `open` restores a broker with the default rather than the configured value. Whether that is intended is a correctness question.
- `terminal/src/core/Prompt.ts:103-111` — `answer` wraps `#answer` in a second `attempt`, though `#answer` already wraps every call that can throw. A fault in the broker itself therefore returns `{ reason: 'rejected', errors: [{ field: 'form', message: 'The form rejected the answer' }] }`, attributing a broker defect to the caller's form.
- `interpret/src/core/Interpret.ts:356` — see finding 35; whether any consumer currently shares one context across orchestrators decides how the ownership fix must land.

## Clean

None. Each package returned findings.

## Deviation

None.