# Findings for group g01

Packages: interpret. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s12-21

21. package=interpret file=src/core/types.ts:205,339,342,350,377,387,420,428,566,567,586,656 (and `Interpret.ts:64`, `errors.ts:3`, `constants.ts:3,108`, `helpers.ts:16,51,556,596,784`, `factories.ts:267`, `validators.ts:29,38`, `Narrator.ts:11`, `managers/TemplateManager.ts:20,102`, `managers/SubjectManager.ts:23,94`, `managers/DefinitionManager.ts:87`, `managers/InterpretContext.ts`, `stages/Clarifier.ts:95,175`, `stages/Normalizer.ts:16,56`) rule=`AGENTS.md` § Writing ("NEVER name a list item by its position"); `.claude/rules/writing.md` § Claims and time verdict=CONFIRMED
    wrong: Public TSDoc cites the coding contract by section number (`AGENTS §13`, `§9.1`, `§17.7`, `§4.6.1`). `AGENTS.md` has no numbered sections, so none of these citations resolves, and naming a section by ordinal is banned outright.
    repair: Replace each with the section's name (`AGENTS.md § Design laws`, `.claude/rules/patterns.md § Managers`, and so on), or delete the citation where the sentence already states the rule.

## s12-22

22. package=interpret file=src/core/types.ts:99,120,181,271,305,323,346,565 (and `Interpret.ts:47,56`, `helpers.ts:655`, `constants.ts:7`, `managers/TemplateManager.ts:26`, `managers/SubjectManager.ts:20`, `managers/InterpretContext.ts:25`, `stages/Clarifier.ts:36`, `stages/Extractor.ts:15`, `stages/Formatter.ts:24`, `stages/Generator.ts:34`) rule=`AGENTS.md` § Authority and loading ("Never import assumptions, names, or logic from another repository"); `.claude/rules/writing.md` § Claims and time verdict=CONFIRMED
    wrong: Published TSDoc explains this package's behaviour by contrast with an unpublished predecessor project ("scsr's defect 2", "unlike scsr, which bumped on every add", "AGENTS-flagged scsr defect 4"). A consumer cannot check any of it, and the reference dates the prose to a codebase they cannot see.
    repair: State each behaviour positively (`an identical re-add keeps its version`) and delete every `scsr` mention from `src/`.

## s12-23

23. package=interpret file=src/core/helpers.ts:45-71 rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc") verdict=CONFIRMED
    wrong: The `setField` TSDoc block sits at lines 45-71, immediately followed by the `deriveAggregateField` block at 72-94 and by `deriveAggregateField` itself at line 95. The exported `setField` at line 103 therefore carries no TSDoc at all, and the detached block attaches to nothing.
    repair: Move the lines 45-71 block down so it sits directly above `export function setField` at line 103.

## s12-24

24. package=interpret file=src/core/helpers.ts:831 rule=`.claude/rules/architecture.md` § Centralized-file pattern, § Kind purity ("wrong file, right name → move it") verdict=CONFIRMED
    wrong: `parseTemplate` is a coercer returning `Template | undefined`, which is the `parsers.ts` kind; it sits in `helpers.ts`, and the package has no `parsers.ts`.
    repair: Create `src/core/parsers.ts`, move `parseTemplate` there, and add `export * from './parsers.js'` to `src/core/index.ts`. The barrel star-export keeps the published surface identical.

## s12-25

25. package=interpret file=src/core/types.ts:509 and src/core/factories.ts:170 rule=`AGENTS.md` § Design laws ("Minimal public API … do not speculate"); `.claude/rules/names.md` § Fixed derivation/construction forms (leading `_`) verdict=CONFIRMED
    wrong: `GeneratorOptions` is an empty interface documented as a seam for "a future knob", and `createGenerator(_options?: GeneratorOptions)` declares a parameter it discards. Nothing requires that signature, so the `_` binding has no conformance justification. `Generator.ts:35-37` documents the speculation, but the creation gate states no exception, so this is CONFIRMED rather than EXEMPT.
    repair: Delete `GeneratorOptions`, its `factories.ts:11` import, and the parameter, leaving `createGenerator(): GeneratorInterface`. Delete the "reserved extension seam" sentences at `types.ts:505-508` and `Generator.ts:35-37`, and the guide row.

## s12-26

26. package=interpret file=src/core/factories.ts:288 rule=`.claude/rules/architecture.md` § Wrapper test ("Delete … pass-through factories"); `.claude/rules/names.md` § Rejected naming verdict=CONFIRMED
    wrong: `createTemplate(data: Template): Template` constructs nothing — it guards its argument and returns it unchanged — and its parameter is already typed `Template`, so the guard is unreachable for any type-checked caller. The parameter name `data` is on the rejected-generic list.
    repair: Move it to `helpers.ts` as `ensureTemplate(value: unknown): Template`, keeping the coded throw, so the guard has a reason to run; name the parameter `value`. Update `guides/interpret.md` and the `parseTemplate` pairing note at `factories.ts:267-269`.

## s12-27

27. package=interpret file=src/core/managers/TemplateManager.ts:52-138, managers/SubjectManager.ts:39-129, managers/DefinitionManager.ts:37-124 rule=`AGENTS.md` § TTTDD step 3 (Consolidation); `.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice", "one shared engine") verdict=CONFIRMED
    wrong: `TemplateManager`, `SubjectManager`, and `DefinitionManager` are the same registry written out three times. The `remove` overload bodies (TemplateManager.ts:103-124, SubjectManager.ts:95-116, DefinitionManager.ts:88-109) are identical; so are `size`, `has`, the plural accessor, the hash-and-version rule inside `add`, `destroy`, and `#ensureAlive`.
    repair: Extract one `RecordManager<T>` engine in `managers/` owning the `Map`, the content-hash and version rule, the `remove` overloads, `destroy`, and `#ensureAlive`. Leave each concrete manager with its accessor noun pair, its id source (`template.id`, `definition.id`, the minted `subject-{n}`), and its event map.

## s12-28

28. package=interpret file=src/core/managers/InterpretContext.ts rule=`.claude/rules/architecture.md` § Kind or folder, § Entity subfolders verdict=CONFIRMED
    wrong: `InterpretContext` is not a manager — it is the execution context that owns two managers — but it sits in the `managers/` folder, which every other member of names by role.
    repair: Move the file to `src/core/InterpretContext.ts`, beside `Interpret.ts` and `Narrator.ts`, and update `index.ts:17`, `Interpret.ts:33`, and `factories.ts:30`.

## s12-29

29. package=interpret file=src/core/types.ts:749-750, Interpret.ts:322,328,325 and types.ts:356,370 rule=`AGENTS.md` § Design laws ("One concept, one term. Do not alternate synonyms") verdict=CONFIRMED
    wrong: One act — putting a template into the registry — has two names in one package. `InterpretInterface` calls it `register`/`unregister` and fires a `register` event; the `TemplateManagerInterface` it delegates to calls it `add`/`remove` and fires an `add` event.
    repair: Rename `InterpretInterface.register`/`unregister` to `add`/`remove` and the `InterpretEventMap` row to `add`, matching the manager the calls forward to; update `Interpret.ts:322-331`, `types.ts:353-356`, the guide, and the examples.

## s12-30

30. package=interpret file=src/core/types.ts:152-156 and Interpret.ts:148,170 rule=`AGENTS.md` § Design laws ("Absence is `undefined`. Never invent sentinels such as … `''`") verdict=CONFIRMED
    wrong: An unclassified intent is published as `{ action: '', domain: '', confidence: 0 }` — an empty-string sentinel on a required public field, constructed inline at two call sites and taught in the `classifyIntent` example at `helpers.ts:432`.
    repair: Declare `readonly action?: string` and `readonly domain?: string` on `Intent`, return `undefined` for an unmatched axis in `classifyIntent`, and adjust `scoreTemplate` (helpers.ts:641-643) and `Formatter.format` (Formatter.ts:61) to read absence. The internal `-1` accumulators at `helpers.ts:305,354,677` are the same class and are best replaced with `undefined` in the same pass.

## s12-31

31. package=interpret file=src/core/Interpret.ts:413 rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
    wrong: `#abort` cancels nothing and propagates no signal; it records a stage failure, emits `error`, and assembles a visible incomplete result. `abort` is fixed to "cancel with signal propagation".
    repair: Rename to `#fail`, updating the call sites at lines 145, 167, 228, 251, and 273.

## s12-32

32. package=interpret file=src/core/Interpret.ts:413-427,449-460,366-375 rule=`.claude/rules/names.md` § Split instead of compounding; `.claude/rules/patterns.md` § Options verdict=CONFIRMED
    wrong: `#abort` threads thirteen positional parameters, `#assemble` ten, and `#gate` eight, so call sites read as runs of `[], [], stages, …, undefined, undefined` (lines 145-159, 167-181) in which a transposed argument is invisible.
    repair: Build one per-call record inside `interpret()` (`text`, `normalized`, `intent`, `entities`, `ambiguities`, `stages`, `templateId`, `templateVersion`) declared in `types.ts`, and give each private method that record plus its own distinct arguments.

## s12-33

33. package=interpret file=src/core/types.ts:560-562 and src/core/factories.ts:47-48 rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped") verdict=CONFIRMED
    wrong: Both blocks state that when a stage slot is omitted "the built-in stage is constructed from the matching per-stage options". `InterpretOptions` carries no `NormalizerOptions`, `ExtractorOptions`, `FormatterOptions`, or `GeneratorOptions` key, and `Interpret.ts:118-122` constructs `new Normalizer()`, `new Extractor()`, `new Formatter()`, and `new Generator()` with no arguments. Only `Clarifier` receives anything, and only the shared `floor`.
    repair: Either add the per-stage option keys to `InterpretOptions` and thread them, or correct both sentences to say the built-in stage is constructed with its own defaults and that a caller configuring a stage supplies the constructed instance.

## s12-34

34. package=interpret file=src/core/types.ts:575,581 rule=`AGENTS.md` § Design laws ("One concept, one term"); `.claude/rules/patterns.md` § Options verdict=CONFIRMED
    wrong: `InterpretOptions` carries `formatter` (the `FormatterInterface` pipeline stage) and `formatters` (the `Narrator`'s value-formatter map) as sibling keys one letter apart, naming two unrelated concepts.
    repair: Group the narrator settings under the configured entity noun — `readonly narrator?: { readonly lexicon?: Lexicon; readonly formatters?: Readonly<Record<string, NarratorFormatter>> }` — and update `Interpret.ts:123-126`.

## s12-35

35. package=interpret file=src/core/Interpret.ts:356 rule=`.claude/rules/typescript.md` § Immutability ("Never mutate caller-owned inputs") verdict=CONFIRMED
    wrong: `destroy()` calls `this.#context.destroy()` on a context the caller may have supplied through `options.context`, which `types.ts:557` documents as "a shared `InterpretContextInterface`". Destroying one orchestrator therefore tears down a context another orchestrator is still using.
    repair: Record whether the context was constructed here (`#ownsContext`), and destroy it in `destroy()` only when it was. Referral: whether any current consumer relies on the present behaviour is an objective-lane question.

## s12-36

36. package=interpret file=src/core/stages/Clarifier.ts:226, src/core/stages/Formatter.ts:72,74,77, src/core/Interpret.ts:383-384 rule=`AGENTS.md` § Design laws ("Mechanism, not product policy") verdict=CONFIRMED
    wrong: The forward direction mints user-facing English from core literals — `` `What is your ${mapping.entity}?` ``, `' with '`, `' (defaults: …)'`, `' needed: '`, `'Which domain and action did you mean?'` — while `types.ts:428-430` states that "Every phrase, label, and template string a `Narrator` renders is DATA supplied here, never a core literal". The reverse direction has the seam; the forward direction bypasses it.
    repair: Add the ambiguity and prompt phrasings to `DEFAULT_LEXICON.templates` under `ambiguity.*` and `prompt.*` keys, pass the `NarratorInterface` into `Clarifier` and `Formatter`, and render each line through `narrator.line`.

## s12-37

37. package=interpret file=src/core/stages/Generator.ts:104-124 rule=`AGENTS.md` § Design laws ("Mechanism, not product policy") verdict=CONFIRMED
    wrong: For a multi-element numeric array the `Generator` writes sibling fields named `Sum`, `Count`, `Average`, `Minimum`, and `Maximum` onto the subject, derived by string concatenation. The template author declared none of them, cannot suppress them, and a template that already declares `amountsSum` is silently overwritten.
    repair: Move the aggregate set behind a declared opt-in on the template (an `aggregates?: readonly string[]` member on `EntityMapping`, or a `ComputedField` the author writes), so the mechanism emits only fields the template asked for.

## s12-38

38. package=interpret file=src/core/constants.ts:89,92,95,98,101 rule=`AGENTS.md` § Design laws ("Minimal public API … do not speculate"); `.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
    wrong: `DEFAULT_ABBREVIATIONS`, `DEFAULT_CORRECTIONS`, `DEFAULT_ACTIONS`, `DEFAULT_DOMAINS`, and `DEFAULT_VERBS` are exported frozen empty records; their only use is `{ ...DEFAULT_X, ...options?.x }`, which is identical to `{ ...options?.x }`. `guides/interpret.md:149-153,194-198` publishes each as an API returning `{}`.
    repair: Delete the empty constants and their spreads at `Normalizer.ts:38-40`, `Extractor.ts:35-36`, and `Formatter.ts:52`; keep the neutrality statement in each options type's TSDoc. `DEFAULT_CONTRACTIONS` carries real data and stays.

## s12-39

39. package=interpret file=src/core/constants.ts:32 rule=`.claude/rules/documentation.md` § Parity; `AGENTS.md` § Design laws ("Minimal public API") verdict=CONFIRMED
    wrong: `INTERPRET_ID` is documented as the "Default `id` for an `Interpret` orchestrator" and published at `guides/interpret.md:135,183`, but `InterpretOptions` has no `id` key, `InterpretInterface` exposes no `id`, and no source or test reads the constant.
    repair: Delete `INTERPRET_ID` and its guide rows.

## s12-40

40. package=interpret file=src/core/errors.ts:10-17 rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped") verdict=CONFIRMED
    wrong: The `InterpretError` remark states it is "Thrown for: an injected stage implementation throwing during its phase (`NORMALIZE_FAILED` / `EXTRACT_FAILED` / `CLARIFY_FAILED` / `FORMAT_FAILED` / `GENERATE_FAILED`)". No site constructs those codes — every `new InterpretError(…)` in `src/` carries `DESTROYED` or `INVALID_TEMPLATE`, and a stage throw surfaces on `StageFailure` while the raw value is re-emitted. The same remark says `context` "carries the offending stage / template id"; no call site supplies a context argument.
    repair: Restate the remark to name only the codes that throw, and either populate `context` at the `DESTROYED` and `INVALID_TEMPLATE` throws or drop that sentence. `types.ts:47-57` already carries the accurate description.

## s12-41

41. package=interpret file=src/core/types.ts:604-609,614-619 rule=`.claude/rules/names.md` § Split instead of compounding; `.claude/rules/patterns.md` § Options verdict=CONFIRMED
    wrong: `ClarifierInterface.clarify(entities, template, context, intent)` and `FormatterInterface.format(intent, template, entities, ambiguities)` are public methods taking four positional arguments of which two are the same kinds in different orders; the published example at `Clarifier.ts:58` has to pass a bare `undefined` for a middle slot.
    repair: Declare `ClarifyInput` and `FormatInput` in `types.ts` (the `{Entity}Input` form) and give each method one grouped argument.

## s12-42

42. package=interpret file=src/core/types.ts:666,683,697 rule=`.claude/rules/names.md` § Tallies verdict=EXEMPT
    wrong: `TemplateManagerInterface`, `SubjectManagerInterface`, and `DefinitionManagerInterface` each expose a lone tally named `size`, which the tallies rule fixes as `count` when a tally is alone and unambiguous.
    repair: The exception is stated at `types.ts:659` and `managers/TemplateManager.ts:20` ("`size` (never `count` — this is the sole tally in scope)"), citing a precedent in another package. Recorded as EXEMPT for the Orchestrator to rule on, because a TSDoc rationale does not carry an exception clause the rule itself does not state; `sea`'s `AssetManagerInterface.count` follows the rule.

## s12-43

43. package=interpret file=src/core/types.ts:541 rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `ManagerAddOptions` matches no required form — it embeds a method name in a type name and scopes to no entity.
    repair: Rename to `RecordOptions` (the record being added is the entity these options describe), updating the three manager signatures and their imports.

## s12-44

44. package=interpret file=src/core/types.ts:82 rule=`AGENTS.md` § Design laws ("One concept, one term"); `.claude/rules/names.md` § General vocabulary ("Describe what a thing is") verdict=CONFIRMED
    wrong: `EntityMapping.entity` holds an entity's NAME, not an entity, and sits beside `Entity.name` (types.ts:160), which holds the same string. Every consumer reads it as a name (`helpers.ts:278,308,370,391`, `Clarifier.ts:80,108,133`, `Generator.ts:72`).
    repair: Rename the member to `name`, matching `Entity.name`, and update the mapping literals in the examples and the guide.

## s12-45

45. package=interpret file=src/core/helpers.ts:574 rule=`AGENTS.md` § Design laws ("Minimal public API"); `.claude/rules/architecture.md` § System constraints ("Keep interfaces to the smallest primitives") verdict=CONFIRMED
    wrong: `canonicalize(value, visited = new Set())` publishes its recursion accumulator as a public parameter and then documents it as "(internal; omit at the call site)", so the published signature and the supported contract disagree.
    repair: Give the public export one parameter and carry the ancestor set on an exported `canonicalizeNode(value, ancestors)` leaf that `canonicalize` and `digestValue` call, or promote `visited` to a documented supported parameter named `ancestors`.

## s12-46

46. package=interpret file=src/core/Narrator.ts:70,72 rule=`AGENTS.md` § Design laws ("Absence is `undefined`") verdict=EXEMPT
    wrong: `line(id, values)` returns `''` for an absent template id, while its siblings `phrase` and `label` fall back to the lookup key; the empty string is the named sentinel form.
    repair: The behaviour is documented at `types.ts:640` ("falling back to an empty string when the id is absent"). Recorded as EXEMPT; if the Orchestrator rules against it, return the id itself, matching `phrase` and `label`.

## s12-47

47. package=interpret file=src/core/factories.ts:60 rule=`AGENTS.md` § Non-negotiable rules ("NEVER use mocks, behavioral fakes"); `.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
    wrong: The flagship `createInterpret` example passes a hand-rolled stage stub, `extractor: { extract: () => ({ … }) }`, teaching a reader to fake the stage instead of using the package's own `createExtractor`. `Interpret.ts:74` demonstrates the real construction for the same scenario.
    repair: Replace the stub with `createExtractor({ actions: { calculate: 'calculate' }, domains: { arithmetic: ['arithmetic'] } })`, matching the class example.

### terminal