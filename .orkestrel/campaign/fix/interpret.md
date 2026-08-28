# Fix dossier: interpret

Verified fix-producing findings for the `interpret` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s12-21 — DRIFT

21. package=interpret file=src/core/types.ts:205,339,342,350,377,387,420,428,566,567,586,656 (and `Interpret.ts:64`, `errors.ts:3`, `constants.ts:3,108`, `helpers.ts:16,51,556,596,784`, `factories.ts:267`, `validators.ts:29,38`, `Narrator.ts:11`, `managers/TemplateManager.ts:20,102`, `managers/SubjectManager.ts:23,94`, `managers/DefinitionManager.ts:87`, `managers/InterpretContext.ts`, `stages/Clarifier.ts:95,175`, `stages/Normalizer.ts:16,56`) rule=`AGENTS.md` § Writing ("NEVER name a list item by its position"); `.claude/rules/writing.md` § Claims and time verdict=CONFIRMED
    wrong: Public TSDoc cites the coding contract by section number (`AGENTS §13`, `§9.1`, `§17.7`, `§4.6.1`). `AGENTS.md` has no numbered sections, so none of these citations resolves, and naming a section by ordinal is banned outright.
    repair: Replace each with the section's name (`AGENTS.md § Design laws`, `.claude/rules/patterns.md § Managers`, and so on), or delete the citation where the sentence already states the rule.

## s12-22 — DRIFT

22. package=interpret file=src/core/types.ts:99,120,181,271,305,323,346,565 (and `Interpret.ts:47,56`, `helpers.ts:655`, `constants.ts:7`, `managers/TemplateManager.ts:26`, `managers/SubjectManager.ts:20`, `managers/InterpretContext.ts:25`, `stages/Clarifier.ts:36`, `stages/Extractor.ts:15`, `stages/Formatter.ts:24`, `stages/Generator.ts:34`) rule=`AGENTS.md` § Authority and loading ("Never import assumptions, names, or logic from another repository"); `.claude/rules/writing.md` § Claims and time verdict=CONFIRMED
    wrong: Published TSDoc explains this package's behaviour by contrast with an unpublished predecessor project ("scsr's defect 2", "unlike scsr, which bumped on every add", "AGENTS-flagged scsr defect 4"). A consumer cannot check any of it, and the reference dates the prose to a codebase they cannot see.
    repair: State each behaviour positively (`an identical re-add keeps its version`) and delete every `scsr` mention from `src/`.

## s12-23 — DRIFT

23. package=interpret file=src/core/helpers.ts:45-71 rule=`.claude/rules/typescript.md` § Comments and API documentation ("Every public export has complete TSDoc") verdict=CONFIRMED
    wrong: The `setField` TSDoc block sits at lines 45-71, immediately followed by the `deriveAggregateField` block at 72-94 and by `deriveAggregateField` itself at line 95. The exported `setField` at line 103 therefore carries no TSDoc at all, and the detached block attaches to nothing.
    repair: Move the lines 45-71 block down so it sits directly above `export function setField` at line 103.

## s12-24 — DRIFT

24. package=interpret file=src/core/helpers.ts:831 rule=`.claude/rules/architecture.md` § Centralized-file pattern, § Kind purity ("wrong file, right name → move it") verdict=CONFIRMED
    wrong: `parseTemplate` is a coercer returning `Template | undefined`, which is the `parsers.ts` kind; it sits in `helpers.ts`, and the package has no `parsers.ts`.
    repair: Create `src/core/parsers.ts`, move `parseTemplate` there, and add `export * from './parsers.js'` to `src/core/index.ts`. The barrel star-export keeps the published surface identical.

## s12-25 — DRIFT

25. package=interpret file=src/core/types.ts:509 and src/core/factories.ts:170 rule=`AGENTS.md` § Design laws ("Minimal public API … do not speculate"); `.claude/rules/names.md` § Fixed derivation/construction forms (leading `_`) verdict=CONFIRMED
    wrong: `GeneratorOptions` is an empty interface documented as a seam for "a future knob", and `createGenerator(_options?: GeneratorOptions)` declares a parameter it discards. Nothing requires that signature, so the `_` binding has no conformance justification. `Generator.ts:35-37` documents the speculation, but the creation gate states no exception, so this is CONFIRMED rather than EXEMPT.
    repair: Delete `GeneratorOptions`, its `factories.ts:11` import, and the parameter, leaving `createGenerator(): GeneratorInterface`. Delete the "reserved extension seam" sentences at `types.ts:505-508` and `Generator.ts:35-37`, and the guide row.

## s12-26 — DRIFT

26. package=interpret file=src/core/factories.ts:288 rule=`.claude/rules/architecture.md` § Wrapper test ("Delete … pass-through factories"); `.claude/rules/names.md` § Rejected naming verdict=CONFIRMED
    wrong: `createTemplate(data: Template): Template` constructs nothing — it guards its argument and returns it unchanged — and its parameter is already typed `Template`, so the guard is unreachable for any type-checked caller. The parameter name `data` is on the rejected-generic list.
    repair: Move it to `helpers.ts` as `ensureTemplate(value: unknown): Template`, keeping the coded throw, so the guard has a reason to run; name the parameter `value`. Update `guides/interpret.md` and the `parseTemplate` pairing note at `factories.ts:267-269`.

### Verification

**Judge (DRIFT/high):** Both lanes concede the `data` hit; the dispute is placement. The subjective lane's decisive reason for keeping the symbol in `factories.ts` — that moving it 'would break the documented factory/coercer pairing with `parseTemplate`' — is factually false: `parseTemplate` is itself in `helpers.ts:831`.

**Lane DRIFT/medium:** amend: move to `helpers.ts` as `assertTemplate(value: unknown): Template` (not `ensureTemplate`), matching `brief/src/core/helpers.ts:852 assertBrief`; keep the coded throw and populate its `context` the way `assertBrief` does; update `guides/interpret.md:439,454,470` and the pairing note at `factories.ts:267-269`

**Lane DRIFT-RESHAPE/medium:** amend: keep `createTemplate` in `factories.ts` — it adds a real validation invariant and is the throwing half of the documented pair with `parseTemplate`. Change its signature to `createTemplate(value: unknown): Template`, which makes the coded throw reachable at its true boundary and lets `tests/src/core/factories.test.ts:244` drop `invokeUnchecked`. Do not move it to `helpers.ts` and do not rename it `ensureTemplate`.

## s12-27 — DRIFT

27. package=interpret file=src/core/managers/TemplateManager.ts:52-138, managers/SubjectManager.ts:39-129, managers/DefinitionManager.ts:37-124 rule=`AGENTS.md` § TTTDD step 3 (Consolidation); `.claude/rules/architecture.md` § System constraints ("Centralize any pattern repeated twice", "one shared engine") verdict=CONFIRMED
    wrong: `TemplateManager`, `SubjectManager`, and `DefinitionManager` are the same registry written out three times. The `remove` overload bodies (TemplateManager.ts:103-124, SubjectManager.ts:95-116, DefinitionManager.ts:88-109) are identical; so are `size`, `has`, the plural accessor, the hash-and-version rule inside `add`, `destroy`, and `#ensureAlive`.
    repair: Extract one `RecordManager<T>` engine in `managers/` owning the `Map`, the content-hash and version rule, the `remove` overloads, `destroy`, and `#ensureAlive`. Leave each concrete manager with its accessor noun pair, its id source (`template.id`, `definition.id`, the minted `subject-{n}`), and its event map.

## s12-28 — DRIFT

28. package=interpret file=src/core/managers/InterpretContext.ts rule=`.claude/rules/architecture.md` § Kind or folder, § Entity subfolders verdict=CONFIRMED
    wrong: `InterpretContext` is not a manager — it is the execution context that owns two managers — but it sits in the `managers/` folder, which every other member of names by role.
    repair: Move the file to `src/core/InterpretContext.ts`, beside `Interpret.ts` and `Narrator.ts`, and update `index.ts:17`, `Interpret.ts:33`, and `factories.ts:30`.

## s12-29 — DRIFT-RESHAPE

29. package=interpret file=src/core/types.ts:749-750, Interpret.ts:322,328,325 and types.ts:356,370 rule=`AGENTS.md` § Design laws ("One concept, one term. Do not alternate synonyms") verdict=CONFIRMED
    wrong: One act — putting a template into the registry — has two names in one package. `InterpretInterface` calls it `register`/`unregister` and fires a `register` event; the `TemplateManagerInterface` it delegates to calls it `add`/`remove` and fires an `add` event.
    repair: Rename `InterpretInterface.register`/`unregister` to `add`/`remove` and the `InterpretEventMap` row to `add`, matching the manager the calls forward to; update `Interpret.ts:322-331`, `types.ts:353-356`, the guide, and the examples.

### Verification

**Lane DRIFT-RESHAPE/medium:** amend: rename to `add`/`remove` and the event row to `add` as proposed, and carry the two obligations the finding omits — give `InterpretInterface.remove` the full `remove()` / `remove(id)` / `remove(ids)` overload set per patterns.md § Batch operations, and document in `types.ts` why `Interpret.add` returns `void` where `TemplateManager.add` returns the record

**Lane DRIFT-RESHAPE/medium:** amend: adopt `add` / `remove` on `InterpretInterface` and rename the `InterpretEventMap` row to `add` as proposed, and give `InterpretInterface.remove` the same three overloads its `TemplateManager` delegate carries (`remove(ids)` / `remove(id)` / `remove()`), so the shared verb does not promise a batch form the orchestrator lacks. Update `Interpret.ts:322-331`, `types.ts:353-356`, `types.ts:749-750`, the guide rows at `guides/interpret.md:97` and `:126`, and the examples.

## s12-30 — DRIFT-RESHAPE

30. package=interpret file=src/core/types.ts:152-156 and Interpret.ts:148,170 rule=`AGENTS.md` § Design laws ("Absence is `undefined`. Never invent sentinels such as … `''`") verdict=CONFIRMED
    wrong: An unclassified intent is published as `{ action: '', domain: '', confidence: 0 }` — an empty-string sentinel on a required public field, constructed inline at two call sites and taught in the `classifyIntent` example at `helpers.ts:432`.
    repair: Declare `readonly action?: string` and `readonly domain?: string` on `Intent`, return `undefined` for an unmatched axis in `classifyIntent`, and adjust `scoreTemplate` (helpers.ts:641-643) and `Formatter.format` (Formatter.ts:61) to read absence. The internal `-1` accumulators at `helpers.ts:305,354,677` are the same class and are best replaced with `undefined` in the same pass.

### Verification

**Judge (DRIFT-RESHAPE/high):** The `Intent` half is unambiguous: `''` stands for 'unclassified' on a required field of a published interface, is constructed at two call sites, and is taught in an `@example`. The design law names `''` explicitly and nothing in the guide, TSDoc, or history defends it. The repair's last sentence is

**Lane DRIFT/high:** amend: the `Intent` change stands (optional `action`/`domain`, `undefined` for an unmatched axis, adjust `scoreTemplate` at helpers.ts:641-643 and `Formatter.format` at Formatter.ts:61); record the `-1` accumulators at helpers.ts:305,354,677 as an observation rather than a criterion — they are private loop seeds, not represented absence

**Lane DRIFT-RESHAPE/high:** amend: take the `Intent` change only — declare `readonly action?: string` and `readonly domain?: string`, return `undefined` for an unmatched axis in `classifyIntent`, and guard the reads at `helpers.ts:641-643` (`scoreTemplate` lowercases both) and `Formatter.ts:61` (`this.#verbs[intent.action]`). Drop the `-1` clause: `helpers.ts:305,354,677` are block-local loop seeds, not absence on a contract.

## s12-31 — DRIFT

31. package=interpret file=src/core/Interpret.ts:413 rule=`.claude/rules/names.md` § Fixed lifecycle vocabulary verdict=CONFIRMED
    wrong: `#abort` cancels nothing and propagates no signal; it records a stage failure, emits `error`, and assembles a visible incomplete result. `abort` is fixed to "cancel with signal propagation".
    repair: Rename to `#fail`, updating the call sites at lines 145, 167, 228, 251, and 273.

## s12-33 — DRIFT-RESHAPE

33. package=interpret file=src/core/types.ts:560-562 and src/core/factories.ts:47-48 rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped") verdict=CONFIRMED
    wrong: Both blocks state that when a stage slot is omitted "the built-in stage is constructed from the matching per-stage options". `InterpretOptions` carries no `NormalizerOptions`, `ExtractorOptions`, `FormatterOptions`, or `GeneratorOptions` key, and `Interpret.ts:118-122` constructs `new Normalizer()`, `new Extractor()`, `new Formatter()`, and `new Generator()` with no arguments. Only `Clarifier` receives anything, and only the shared `floor`.
    repair: Either add the per-stage option keys to `InterpretOptions` and thread them, or correct both sentences to say the built-in stage is constructed with its own defaults and that a caller configuring a stage supplies the constructed instance.

### Verification

**Judge (DRIFT-RESHAPE/high):** The prose is false against the shipped code on both sides, verified line by line. The repair as written offers two branches and an executor may take either; branch one — adding per-stage option keys to `InterpretOptions` and threading them — expands the published API with no consumer, gives a caller

**Lane DRIFT/high:** amend: take the prose-correction branch only — state that an omitted stage slot is constructed with its own defaults and that a caller configuring a stage supplies the constructed instance. Do not add per-stage option keys to `InterpretOptions`; that would publish a second configuration path for one stage

**Lane DRIFT-RESHAPE/high:** amend: take only the second branch — correct both sentences to say the built-in stage is constructed with its own defaults, that `floor` is the one value threaded (into `Clarifier`), and that a caller configuring a stage supplies the constructed instance. Do not add per-stage option keys to `InterpretOptions`; that expands the public API with no consumer and contradicts s12-25.

## s12-34 — DRIFT

34. package=interpret file=src/core/types.ts:575,581 rule=`AGENTS.md` § Design laws ("One concept, one term"); `.claude/rules/patterns.md` § Options verdict=CONFIRMED
    wrong: `InterpretOptions` carries `formatter` (the `FormatterInterface` pipeline stage) and `formatters` (the `Narrator`'s value-formatter map) as sibling keys one letter apart, naming two unrelated concepts.
    repair: Group the narrator settings under the configured entity noun — `readonly narrator?: { readonly lexicon?: Lexicon; readonly formatters?: Readonly<Record<string, NarratorFormatter>> }` — and update `Interpret.ts:123-126`.

## s12-35 — DRIFT

35. package=interpret file=src/core/Interpret.ts:356 rule=`.claude/rules/typescript.md` § Immutability ("Never mutate caller-owned inputs") verdict=CONFIRMED
    wrong: `destroy()` calls `this.#context.destroy()` on a context the caller may have supplied through `options.context`, which `types.ts:557` documents as "a shared `InterpretContextInterface`". Destroying one orchestrator therefore tears down a context another orchestrator is still using.
    repair: Record whether the context was constructed here (`#ownsContext`), and destroy it in `destroy()` only when it was. Referral: whether any current consumer relies on the present behaviour is an objective-lane question.

## s12-36 — DRIFT

36. package=interpret file=src/core/stages/Clarifier.ts:226, src/core/stages/Formatter.ts:72,74,77, src/core/Interpret.ts:383-384 rule=`AGENTS.md` § Design laws ("Mechanism, not product policy") verdict=CONFIRMED
    wrong: The forward direction mints user-facing English from core literals — `` `What is your ${mapping.entity}?` ``, `' with '`, `' (defaults: …)'`, `' needed: '`, `'Which domain and action did you mean?'` — while `types.ts:428-430` states that "Every phrase, label, and template string a `Narrator` renders is DATA supplied here, never a core literal". The reverse direction has the seam; the forward direction bypasses it.
    repair: Add the ambiguity and prompt phrasings to `DEFAULT_LEXICON.templates` under `ambiguity.*` and `prompt.*` keys, pass the `NarratorInterface` into `Clarifier` and `Formatter`, and render each line through `narrator.line`.

### Verification

**Judge (DRIFT/medium):** The violation is real: the package declares wording to be caller data in three places, then mints user-facing English in the forward direction with no seam. The finding overstates its `types.ts:427-428` citation, which is scoped to what a `Narrator` renders, so the operative ban is the design law it

**Lane DRIFT-RESHAPE/medium:** amend: put the phrasing on each stage's own options, extending the seam `FormatterOptions.verbs` already establishes — add the connective phrasings to `FormatterOptions`, the question phrasing to `ClarifierOptions`, and the two gate phrasings to `InterpretOptions` — rather than threading `NarratorInterface` into forward stages a caller constructs

**Lane DRIFT/medium:** stands

## s12-37 — DRIFT

37. package=interpret file=src/core/stages/Generator.ts:104-124 rule=`AGENTS.md` § Design laws ("Mechanism, not product policy") verdict=CONFIRMED
    wrong: For a multi-element numeric array the `Generator` writes sibling fields named `Sum`, `Count`, `Average`, `Minimum`, and `Maximum` onto the subject, derived by string concatenation. The template author declared none of them, cannot suppress them, and a template that already declares `amountsSum` is silently overwritten.
    repair: Move the aggregate set behind a declared opt-in on the template (an `aggregates?: readonly string[]` member on `EntityMapping`, or a `ComputedField` the author writes), so the mechanism emits only fields the template asked for.

### Verification

**Judge (DRIFT/high):** The defect is confirmed on both halves: an undeclared, unsuppressible set of English-named fields lands on a caller's subject, and the author's own declared field is silently overwritten. The objective lane's reshape rests on reading `aggregates?: readonly string[]` as a behavior-selecting magic str

**Lane DRIFT-RESHAPE/medium:** amend: make the aggregates opt-in without a magic-string list — bind array-valued entities in `Clarifier#resolveComputations` (Clarifier.ts:145-151) so a template author expresses an aggregate through the existing `Template.computations` mechanism, and delete the unconditional emission at Generator.ts:109-124. Do not add `aggregates?: readonly string[]` to `EntityMapping`

**Lane DRIFT/high:** stands

## s12-38 — DRIFT

38. package=interpret file=src/core/constants.ts:89,92,95,98,101 rule=`AGENTS.md` § Design laws ("Minimal public API … do not speculate"); `.claude/rules/architecture.md` § Wrapper test verdict=CONFIRMED
    wrong: `DEFAULT_ABBREVIATIONS`, `DEFAULT_CORRECTIONS`, `DEFAULT_ACTIONS`, `DEFAULT_DOMAINS`, and `DEFAULT_VERBS` are exported frozen empty records; their only use is `{ ...DEFAULT_X, ...options?.x }`, which is identical to `{ ...options?.x }`. `guides/interpret.md:149-153,194-198` publishes each as an API returning `{}`.
    repair: Delete the empty constants and their spreads at `Normalizer.ts:38-40`, `Extractor.ts:35-36`, and `Formatter.ts:52`; keep the neutrality statement in each options type's TSDoc. `DEFAULT_CONTRACTIONS` carries real data and stays.

## s12-39 — DRIFT

39. package=interpret file=src/core/constants.ts:32 rule=`.claude/rules/documentation.md` § Parity; `AGENTS.md` § Design laws ("Minimal public API") verdict=CONFIRMED
    wrong: `INTERPRET_ID` is documented as the "Default `id` for an `Interpret` orchestrator" and published at `guides/interpret.md:135,183`, but `InterpretOptions` has no `id` key, `InterpretInterface` exposes no `id`, and no source or test reads the constant.
    repair: Delete `INTERPRET_ID` and its guide rows.

## s12-40 — DRIFT

40. package=interpret file=src/core/errors.ts:10-17 rule=`.claude/rules/documentation.md` § Parity ("Re-read the prose last, against what actually shipped") verdict=CONFIRMED
    wrong: The `InterpretError` remark states it is "Thrown for: an injected stage implementation throwing during its phase (`NORMALIZE_FAILED` / `EXTRACT_FAILED` / `CLARIFY_FAILED` / `FORMAT_FAILED` / `GENERATE_FAILED`)". No site constructs those codes — every `new InterpretError(…)` in `src/` carries `DESTROYED` or `INVALID_TEMPLATE`, and a stage throw surfaces on `StageFailure` while the raw value is re-emitted. The same remark says `context` "carries the offending stage / template id"; no call site supplies a context argument.
    repair: Restate the remark to name only the codes that throw, and either populate `context` at the `DESTROYED` and `INVALID_TEMPLATE` throws or drop that sentence. `types.ts:47-57` already carries the accurate description.

## s12-42 — DRIFT

42. package=interpret file=src/core/types.ts:666,683,697 rule=`.claude/rules/names.md` § Tallies verdict=EXEMPT
    wrong: `TemplateManagerInterface`, `SubjectManagerInterface`, and `DefinitionManagerInterface` each expose a lone tally named `size`, which the tallies rule fixes as `count` when a tally is alone and unambiguous.
    repair: The exception is stated at `types.ts:659` and `managers/TemplateManager.ts:20` ("`size` (never `count` — this is the sole tally in scope)"), citing a precedent in another package. Recorded as EXEMPT for the Orchestrator to rule on, because a TSDoc rationale does not carry an exception clause the rule itself does not state; `sea`'s `AssetManagerInterface.count` follows the rule.

### Verification

**Judge (DRIFT/medium):** The rule sentence is unqualified and its stated trigger — a lone unambiguous tally — is met three times. The EXEMPT rests on a TSDoc rationale plus sibling packages, and neither is an exemption source: the authority rule says the canon outranks existing code and forbids importing names from another

**Lane DRIFT/medium:** amend: rename `size` to `count` on `TemplateManagerInterface`, `SubjectManagerInterface`, and `DefinitionManagerInterface`, their three classes, the guide rows, and the tests. Record separately that `program/src/core/types.ts:284`, `brief`, `middleware`, `msg`, `pool`, and `template` carry the same drift — that is a fleet unit, not this package's

**Lane EXCEPTION/medium:** drop

## s12-43 — DRIFT-RESHAPE

43. package=interpret file=src/core/types.ts:541 rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `ManagerAddOptions` matches no required form — it embeds a method name in a type name and scopes to no entity.
    repair: Rename to `RecordOptions` (the record being added is the entity these options describe), updating the three manager signatures and their imports.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The naming defect is real on both counts and neither lane disputes it. The repair as written names only interpret's three manager signatures and their imports, and an executor following it ships a rename that leaves `@orkestrel/brief` importing a symbol that no longer exists at its next re-pin — fiv

**Lane DRIFT/medium:** stands

**Lane DRIFT-RESHAPE/medium:** amend: rename to `RecordOptions` as a coordinated change across `@orkestrel/interpret` and `@orkestrel/brief` in one wave — interpret's `types.ts:541,670,687,701` and the three manager imports, plus `brief/src/core/BriefManager.ts:3,84,128` and `brief/src/core/types.ts:2,497,507` — and bump and publish both. Do not ship the interpret rename alone.

## s12-45 — DRIFT-RESHAPE

45. package=interpret file=src/core/helpers.ts:574 rule=`AGENTS.md` § Design laws ("Minimal public API"); `.claude/rules/architecture.md` § System constraints ("Keep interfaces to the smallest primitives") verdict=CONFIRMED
    wrong: `canonicalize(value, visited = new Set())` publishes its recursion accumulator as a public parameter and then documents it as "(internal; omit at the call site)", so the published signature and the supported contract disagree.
    repair: Give the public export one parameter and carry the ancestor set on an exported `canonicalizeNode(value, ancestors)` leaf that `canonicalize` and `digestValue` call, or promote `visited` to a documented supported parameter named `ancestors`.

### Verification

**Judge (DRIFT-RESHAPE/medium):** The mismatch is real and neither offered branch closes it. The exported-leaf branch publishes a second export whose second parameter is the same accumulator, now required — one more public symbol, and the accumulator is still on the surface. Promoting `visited` to a supported parameter publishes a k

**Lane DRIFT/medium:** amend: take the exported-leaf branch only — give the public `canonicalize` one parameter and carry the ancestor set on an exported `canonicalizeNode(value, ancestors)` leaf that `canonicalize` and `digestValue` call. Do not promote `visited` to a supported parameter: a caller-seeded set makes `canonicalize({a:1})` return '"[cycle]"' and breaks the digest replay contract

**Lane DRIFT-RESHAPE/medium:** amend: take only the second alternative — rename `visited` to `ancestors` and document it as a supported parameter stating what an explicit seed does. Drop the `canonicalizeNode` alternative: it publishes a second export carrying the same accumulator as a required parameter and closes nothing.

## s12-47 — DRIFT

47. package=interpret file=src/core/factories.ts:60 rule=`AGENTS.md` § Non-negotiable rules ("NEVER use mocks, behavioral fakes"); `.claude/rules/documentation.md` § Guide examples verdict=CONFIRMED
    wrong: The flagship `createInterpret` example passes a hand-rolled stage stub, `extractor: { extract: () => ({ … }) }`, teaching a reader to fake the stage instead of using the package's own `createExtractor`. `Interpret.ts:74` demonstrates the real construction for the same scenario.
    repair: Replace the stub with `createExtractor({ actions: { calculate: 'calculate' }, domains: { arithmetic: ['arithmetic'] } })`, matching the class example.

### terminal

