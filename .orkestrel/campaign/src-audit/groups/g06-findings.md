# Findings for group g06

Packages: brief. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s13-20

20. package=brief file=`src/core/types.ts:9` rule=`AGENTS.md` § Writing — "NEVER state a count" verdict=CONFIRMED
    wrong: The prose states counts throughout, over exactly the member and stage sets the rule names as countable, and the rule's instruction is to delete a count rather than correct it.
    repair: Delete each number or name the members instead. Occurrences: `types.ts:9` ("none of these twelve"), `:43` ("The four fixed compilation phases"), `:50` ("the four `*_FAILED` codes"), `:55` ("Three codes"), `:104` ("The four disjoint file partitions"), `:165` ("Four working mechanisms"), `:169` ("three strings either way"), `:258` ("THREE classes of input, not two"), `:377` ("Two orthogonal axes, not five partitions"), `:386` ("Never union all five"), `:390` ("The four permission arrays"); `constants.ts:4`, `:20`, `:32`, `:41`, `:90`; `validators.ts:53`, `:56`, `:59`, `:62`, `:121`; `shapers.ts:44`, `:52`; `helpers.ts:71`, `:302`, `:305`, `:361`, `:366`, `:469`, `:512`, `:800`.

## s13-21

21. package=brief file=`src/core/types.ts:88` rule=`AGENTS.md` § Writing — "Do not write aphorisms, metaphors, or rhetorical flourish"; `.claude/rules/writing.md` § Voice and actor verdict=CONFIRMED
    wrong: TSDoc and comments shout single words in full capitals for emphasis — `ONE`, `FOREIGN`, `CONTAINED`, `DERIVED`, `OWNED AT ARRIVAL`, `BORROWED`, `ALWAYS`, `NEVER`, `SHALLOW`, `VERBATIM`, `MINTED`, `ALL-OR-NOTHING` — a rhetorical device neither msg nor process uses anywhere.
    repair: Lowercase every emphasis capital and carry the emphasis in sentence order instead; occurrences run through `types.ts`, `helpers.ts`, `cloners.ts`, `constants.ts`, `validators.ts`, `parsers.ts`, `factories.ts`, `BriefCompiler.ts`, and `BriefManager.ts`.

## s13-22

22. package=brief file=`src/core/types.ts:215` rule=`.claude/rules/writing.md` § Substitutions verdict=CONFIRMED
    wrong: "`command` should carry a clear exit signal" writes `should`, which the substitution table refuses outright.
    repair: Rewrite as "`command` must carry a clear exit signal — it becomes the `/goal` condition verbatim."

## s13-23

23. package=brief file=`src/core/types.ts:413` (also `:479`) rule=`AGENTS.md` § Non-negotiable rules — "ALWAYS make interface properties and public return collections readonly" verdict=CONFIRMED
    wrong: `BriefCompilerEventMap`'s `compile`, `block`, `error`, and `destroy` members and `BriefManagerEventMap`'s `add`, `remove`, and `destroy` members carry no `readonly`, unlike `process/src/core/types.ts:116` which marks every event-map member readonly.
    repair: Prefix each member with `readonly`.

## s13-24

24. package=brief file=`src/core/helpers.ts:6` rule=`.claude/rules/architecture.md` § Kind purity — "Keep the leaf pair class-free" verdict=CONFIRMED
    wrong: `helpers.ts` imports `snapshotBrief` from `cloners.js`, but the rule places `cloners.ts` above the leaf pair and states it "is never consumed by them"; `cloners.ts:105` acknowledges the edge as a cycle-avoidance measure rather than as a sanctioned exception.
    repair: Move the four snapshot-taking projections — `pinBrief` (`:883`), `briefToMarkdown` (`:1001`), `briefToGoal` (`:1144`), and `briefToDispatch` (`:1182`) — into a file that sits above the leaves, and delete the `cloners.js` import from `helpers.ts` so it imports only types, constants, errors, and validators.

## s13-25

25. package=brief file=`src/core/helpers.ts:45` rule=`.claude/rules/architecture.md` § Kind purity — "Every exported function in `factories.ts` is named `create*`" verdict=EXEMPT
    wrong: `task`, `reference`, `manifest`, `outcome`, `given`, `example`, `citation`, `gap`, `risk`, `output`, `proof`, `brief`, and `gateDefinition` (`:45`, `:63`, `:80`, `:105`, `:124`, `:143`, `:166`, `:187`, `:213`, `:232`, `:255`, `:278`, `:328`) each construct and return a fresh value, which is the value-factory row, yet they sit in `helpers.ts` under bare-noun names rather than in `factories.ts` under `create*`.
    repair: None taken here — `guides/brief.md:350`–`:362` documents them as a deliberate "Builders" category "following the reasons idiom", distinct from the guide's own "Factories" section at `:576`. Recording the conflict so an owner can rule on it: the exemption lives in one package's guide and the kind rule is fleet canon, and `.claude/rules/architecture.md` states placement follows what a function is rather than what it is called.

## s13-26

26. package=brief file=`src/core/helpers.ts:990` (also `:1132`, `:1167`) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `briefToMarkdown` (`:1001`), `briefToGoal` (`:1144`), and `briefToDispatch` (`:1182`) each declare a parameter named `input`, but each `@param` documents a parameter named `source` that does not exist.
    repair: Rename the three parameters to `source`, matching every sibling projection in the file and the `@param` already written.

## s13-27

27. package=brief file=`src/core/types.ts:469` (also `:501`) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `BriefCompilerInterface`'s `emitter`, `interpret`, `reason`, `compile`, `gate`, and `destroy` and `BriefManagerInterface`'s `emitter`, `size`, `has`, `brief`, `briefs`, `add`, `remove`, and `destroy` carry no TSDoc at all, and neither do the implementing members at `BriefCompiler.ts:95`–`:241` or `BriefManager.ts:39`–`:117`; `process/src/core/types.ts:207` documents every member of the equivalent contract.
    repair: Document each member with a description, `@param`, `@returns`, and `@throws` where applicable — `compile` and `gate` in particular, whose containment and throwing behavior is described only in `@remarks` blocks on other symbols.

## s13-28

28. package=brief file=`src/core/types.ts:503` rule=`.claude/rules/names.md` § Tallies verdict=CONFIRMED
    wrong: `BriefManagerInterface.size` is the interface's lone unambiguous tally, which the rule names `count`; `ProcessManagerInterface.count` at `process/src/core/types.ts:742` is the fleet's other manager tally.
    repair: Rename to `count` on the interface and at `BriefManager.ts:65`, and update `guides/brief.md:600` and the `factories.ts:50` example.

## s13-29

29. package=brief file=`src/core/types.ts:470` (also `:471`, `:460`, `:461`) rule=`.claude/rules/names.md` § General vocabulary — "Properties are nouns; methods are verbs" verdict=CONFIRMED
    wrong: `BriefCompilerInterface.interpret` and `BriefCompilerOptions.interpret` name a property with a bare verb, so `compiler.interpret` reads as a call rather than as the engine it returns.
    repair: Rename the property and the option to `interpreter` and update `BriefCompiler.ts:66`, `:81`, `:87`, `:89`, `:99`, `:289`, `:237`; `reason` stays, being a noun as well as a verb.

## s13-30

30. package=brief file=`src/core/helpers.ts:143` rule=`AGENTS.md` § Design laws — "One concept, one term" verdict=CONFIRMED
    wrong: `example(input, result, note)` names its second parameter `result` while the member it fills, the guard at `validators.ts:115`, and the shape at `shapers.ts:79` all call it `output`.
    repair: Rename the parameter to `output` and update the `@param` at `:132`.