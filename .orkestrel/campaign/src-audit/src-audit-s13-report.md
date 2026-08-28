## Coverage

**msg** (`/home/user/fleet/msg/src/core/`) — read every file: `types.ts`, `MSG.ts`, `helpers.ts`, `validators.ts`, `parsers.ts`, `shapers.ts`, `factories.ts`, `constants.ts`, `errors.ts`, `index.ts`. Read `guides/msg.md` (grep) and `package.json` as evidence. Skipped nothing.

**process** (`/home/user/fleet/process/src/`) — read `core/types.ts`, `core/constants.ts`, `core/errors.ts`, `core/index.ts`, `server/types.ts`, `server/helpers.ts`, `server/factories.ts`, `server/index.ts`, `server/Supervisor.ts`, `server/Process.ts`, `server/ProcessManager.ts`, `server/Retention.ts`, `server/execution/execute.ts`. Read only the export/getter surface of `server/Session.ts` and `server/execution/detach.ts`, and did not open `server/execution/executeSync.ts` — Session mirrors `Process` over the same `Supervisor` engine, and both execution modules follow `execute.ts`, so any finding there would restate one already listed. Read `guides/process.md` (grep) as evidence.

**brief** (`/home/user/fleet/brief/src/core/`) — read every file: `types.ts`, `helpers.ts`, `validators.ts`, `cloners.ts`, `parsers.ts`, `shapers.ts`, `factories.ts`, `constants.ts`, `errors.ts`, `BriefCompiler.ts`, `BriefManager.ts`, `index.ts`. Read `guides/brief.md` sections on Builders and Factories as exemption evidence.

Also read `/home/user/fleet/brief/tests/setupPolicy.ts` (kind-file registers only) to settle whether `shapers.ts` permits data or functions — it permits both, so I raised no finding on the divergent `shapers.ts` content between msg (functions) and brief (shape constants).

## Findings

1. package=all three file=(list following) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: The TSDoc first sentence is imperative rather than third-person with an `-s` verb, which the rule fixes as `Creates`, `Returns`, `Checks whether`.
   repair: Rewrite each listed first sentence into the third person, leaving the rest of the block untouched.
   msg — `errors.ts:31`; `types.ts:411`, `:420`; `parsers.ts:9`; `MSG.ts:127`, `:228`, `:282`; `helpers.ts:8`, `:23`, `:38`, `:48`, `:58`, `:70`, `:84`, `:111`, `:136`, `:151`, `:169`, `:192`, `:209`, `:220`, `:252`, `:289`, `:338`, `:436`, `:455`, `:483`, `:516`, `:526`, `:555`, `:604`, `:644`, `:662`, `:698`; `factories.ts:10`; `validators.ts:5`, `:21`, `:45` (noun phrase, no verb at all); `shapers.ts:38`, `:422`, `:492`.
   process — `core/errors.ts:19`; `core/types.ts:279`, `:297`, `:314`, `:492`, `:513`, `:534`, `:549`, `:757`, `:775`, `:782`, `:789`, `:795`; `server/types.ts:35`, `:42`, `:50`; `server/Process.ts:64`, `:180`; `server/Session.ts:44`; `server/Supervisor.ts:92`; `server/ProcessManager.ts:57`, `:100`, `:139`, `:146`, `:153`, `:165`.
   brief — `errors.ts:36`; `parsers.ts:6`; `helpers.ts:31`, `:50`, `:68`, `:90`, `:110`, `:129`, `:148`, `:171`, `:199`, `:218`, `:242`, `:260`, `:301`, `:401`, `:582`, `:734`, `:766`, `:789`, `:823`, `:860`, `:919`, `:984`, `:1126`, `:1156`, `:1200`, `:1225`, `:1278`, `:1313`; `factories.ts:15`, `:39`, `:58`.
   Note the inconsistency this creates inside one file: `process/src/server/Process.ts:180` is imperative while `:200` and `:215` are third person, and `msg/src/core/helpers.ts:714` (`Infers…`) is third person among thirty imperatives.

2. package=msg file=`src/core/types.ts:155` (also `:83`) rule=`AGENTS.md` § Design laws — "Named discriminants" verdict=CONFIRMED
   wrong: `MSGFieldData.kind: 'msg' | 'attachment' | 'recipient'` names the discriminant `kind`, which the law forbids outright, and `MSGMutableFieldData` repeats it.
   repair: Rename the member to the axis it varies — `category` — on both interfaces, and update `MSG.ts:757`, `:925`, `:975`, `:981`, `:992` plus the guide's `guides/msg.md:272` fence.

3. package=msg file=`src/core/types.ts:67` (also `:110`) rule=`AGENTS.md` § Design laws — "Named discriminants" verdict=CONFIRMED
   wrong: `MSGDirectoryEntry.type: number` and `MSGBurnerEntry.type: number` name a public entity property `type`, which the same law rejects.
   repair: Rename both to `category` and update the readers at `MSG.ts:503`, `:531`, `:540`, `:603`, `:1265`, `:1297`, `:1317` and `shapers.ts:60`, `:185`, `:203`, `:217`, `:345`, `:356`, `:365`, `:377`.

4. package=msg file=`src/core/constants.ts:409`–`:434` rule=`.claude/rules/architecture.md` § System constraints — "Centralize any pattern repeated twice" verdict=CONFIRMED
   wrong: `EML_EXTENSIONS`, `MSG_EXTENSIONS`, `EML_MIME_TYPES`, `MSG_MIME_TYPES`, `FALLBACK_CHARSET`, and `FALLBACK_ATTACHMENT_NAME` have no reader anywhere in `src/`, while `helpers.ts:545`–`:549` hardcodes `'.eml'`/`'.msg'`/`'message/rfc822'`/`'application/vnd.ms-outlook'`, `helpers.ts:510` hardcodes `'utf-8'`, and `shapers.ts:552` hardcodes `'attachment'` — and `guides/msg.md:128`–`:133` states each constant governs exactly the code that ignores it.
   repair: Route `detectFormat`, `resolveEncoding`, and the `extractMessage` attachment fallback through the constants, so the guide's claims become true.

5. package=msg file=`src/core/helpers.ts:198` rule=`.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
   wrong: `isMSGFile` declares its own inline `[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]` array, a second copy of the already-exported `MSG_FILE_HEADER` at `constants.ts:6` that `shapers.ts:307` uses.
   repair: Delete the local array and read `MSG_FILE_HEADER` from `constants.js`.

6. package=msg file=`src/core/types.ts:51` (also `:56`) rule=`AGENTS.md` § Design laws — "Real domain states only"; `.claude/rules/architecture.md` § System constraints verdict=CONFIRMED
   wrong: `MSGDirectoryEntryType` and `MSGFieldType` are declared and barrelled but referenced nowhere in `src/`; `MSGDirectoryEntry.type` is `number` and `MSG_FIELD_TYPE_MAPPING` at `constants.ts:256` is `Readonly<Record<string, string>>` even though `guides/msg.md:111` says its values are `MSGFieldType` tags.
   repair: Type `MSG_FIELD_TYPE_MAPPING` as `Readonly<Record<string, MSGFieldType>>` so `MSG.ts:1090`'s `decodeAs` narrows on the real union, and give `MSGDirectoryEntryType` the same treatment or delete it.

7. package=msg file=`src/core/helpers.ts:63` (also `:521`) rule=`.claude/rules/architecture.md` § Centralized-file pattern; `.claude/rules/patterns.md` § Validation and contracts verdict=CONFIRMED
   wrong: `isRecord` and `isEmailFormat` are total `(unknown) => value is T` guards sitting in `helpers.ts` while `validators.ts` exists and holds the package's other guards.
   repair: Move both into `validators.ts` and drop `validators.ts:2`'s import of `isRecord` from `helpers.js`; `isMSGFile` and `isSuccess`/`isFailure` stay put, being a bare predicate and typed narrowers rather than total guards.

8. package=msg file=`src/core/shapers.ts:433` rule=`.claude/rules/typescript.md` § Types verdict=CONFIRMED
   wrong: `extractMessageFromMSG` declares its `reader` contract as an inline structural type in the parameter position of a public export, so a consumer cannot name what the function accepts.
   repair: Declare it in `types.ts` as `MSGSourceInterface` with `parse(): MSGFieldData` and `attachment(index: number): MSGAttachment`, and reference it here and at the `MSG.ts:188` call site.

9. package=msg file=`src/core/shapers.ts:433` and `:498` rule=`AGENTS.md` § Design laws — "One concept, one term" verdict=CONFIRMED
   wrong: `extractMessageFromMSG` and `extractMessage` are peer algorithms over the same output, but only one names its source, so the bare name silently means "from MIME".
   repair: Rename the pair `extractMSGMessage` and `extractMIMEMessage`, and update `MSG.ts:81`, `:188`, `:196`.

10. package=msg file=`src/core/types.ts:82` rule=`.claude/rules/names.md` § General vocabulary — "Describe what a thing is, not its implementation" verdict=CONFIRMED
    wrong: `MSGMutableFieldData` names a mutability strategy rather than a domain thing, and every property it declares is `readonly`, so the name contradicts the contract it carries.
    repair: Rename it `MSGFieldAccumulator` and update `MSG.ts:21`, `:756`, `:766`–`:797`, `:932`, `:975`, `:981`, `:991`.

11. package=msg file=`src/core/MSG.ts:766` (also `:772`, `:778`, `:784`) rule=`.claude/rules/names.md` § Rejected naming — "Abbreviations" verdict=CONFIRMED
    wrong: `#str`, `#num`, `#bool`, and `#bin` are abbreviations, which the rule bans without exempting private members; private methods are allowed two or three words, not truncated ones.
    repair: Rename to `#readString`, `#readNumber`, `#readBoolean`, and `#readBinary`, matching the sibling `#role`.

12. package=msg file=`src/core/errors.ts:18` rule=`.claude/rules/architecture.md` § Barrel exports — "A row obliges a documented, runnable example"; `.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `MSGError` is barrelled and consumer-constructible but carries no `@example`, while `isMSGError`, `MSG`, and `createMSG` in the same package all carry one.
    repair: Add an `@example` constructing an `MSGError` with a code, message, and context.

13. package=msg file=`src/core/errors.ts:3` rule=`.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
    wrong: The comment opens `AGENTS §12:`, citing a numbered section that `AGENTS.md` does not have, so it points a reader at nothing.
    repair: Delete the citation and keep the sentence that states the error contract.

14. package=msg file=`src/core/factories.ts:17` rule=`.claude/rules/writing.md` § Claims and time; § Substitutions verdict=CONFIRMED
    wrong: "This is a deliberate NEW dual API" uses `new` as a time word, which the substitution table deletes, and shouts it in capitals.
    repair: Rewrite as "`createMSG` and `new MSG()` are two entry points, not one wrapping the other:".

15. package=process file=`src/server/types.ts:27` rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `ProcessChild` declares call-signature members (`kill`, `once`, `off`), so it is a behavioral interface and the table requires the `{Entity}Interface` form; `guides/process.md:208` and `:1398` describe it without stating an exception.
    repair: Rename to `ProcessChildInterface` and update `helpers.ts:8`, `:586`, `:611`, `:674`, `:700`, `:739` and the guide rows.

16. package=process file=`src/server/helpers.ts:100` rule=`.claude/rules/architecture.md` § Centralized-file pattern — "Owned snapshots | `*/cloners.ts`" verdict=CONFIRMED
    wrong: `snapshotCommand` takes one owned frozen snapshot of a caller's value — the cloners row verbatim — but sits in `helpers.ts`, which has no `cloners.ts` sibling to sit beside.
    repair: Add `src/server/cloners.ts`, move `snapshotCommand` there unchanged, add the barrel row to `src/server/index.ts`, and update the importers at `Supervisor.ts:17`, `Process.ts:9`, `Session.ts`, and `execution/execute.ts:18`; the star-export keeps the published surface identical.

17. package=process file=`src/server/Supervisor.ts:107` rule=`.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: The `face` callback bundle is declared as an inline structural type in the constructor signature, yet both `Process.ts:113` and `Session.ts` construct one, so it is a reusable type living outside `types.ts`.
    repair: Declare it in `src/server/types.ts` as `SupervisorFace` with the same six readonly members and reference it from the constructor.

18. package=process file=`src/core/errors.ts:11` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `ProcessError` is barrelled and consumer-constructible but carries no `@example`, while `isProcessError`, `createInvalidError`, `Retention`, `Process`, and `ProcessManager` in the same package all carry one.
    repair: Add an `@example` constructing a `ProcessError` with a code and context.

19. package=process file=`src/core/types.ts:588` (also `:614`, `:615`) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `ExecuteResult.signal` and `ExecuteInput.code`/`signal` are the only members of those interfaces with no documentation line, so a reader learns the `null` semantics for `code` and not for `signal`.
    repair: Add the one-line description each carries elsewhere — "The terminating signal name, or `null` when the process exited on its own."

20. package=brief file=`src/core/types.ts:9` rule=`AGENTS.md` § Writing — "NEVER state a count" verdict=CONFIRMED
    wrong: The prose states counts throughout, over exactly the member and stage sets the rule names as countable, and the rule's instruction is to delete a count rather than correct it.
    repair: Delete each number or name the members instead. Occurrences: `types.ts:9` ("none of these twelve"), `:43` ("The four fixed compilation phases"), `:50` ("the four `*_FAILED` codes"), `:55` ("Three codes"), `:104` ("The four disjoint file partitions"), `:165` ("Four working mechanisms"), `:169` ("three strings either way"), `:258` ("THREE classes of input, not two"), `:377` ("Two orthogonal axes, not five partitions"), `:386` ("Never union all five"), `:390` ("The four permission arrays"); `constants.ts:4`, `:20`, `:32`, `:41`, `:90`; `validators.ts:53`, `:56`, `:59`, `:62`, `:121`; `shapers.ts:44`, `:52`; `helpers.ts:71`, `:302`, `:305`, `:361`, `:366`, `:469`, `:512`, `:800`.

21. package=brief file=`src/core/types.ts:88` rule=`AGENTS.md` § Writing — "Do not write aphorisms, metaphors, or rhetorical flourish"; `.claude/rules/writing.md` § Voice and actor verdict=CONFIRMED
    wrong: TSDoc and comments shout single words in full capitals for emphasis — `ONE`, `FOREIGN`, `CONTAINED`, `DERIVED`, `OWNED AT ARRIVAL`, `BORROWED`, `ALWAYS`, `NEVER`, `SHALLOW`, `VERBATIM`, `MINTED`, `ALL-OR-NOTHING` — a rhetorical device neither msg nor process uses anywhere.
    repair: Lowercase every emphasis capital and carry the emphasis in sentence order instead; occurrences run through `types.ts`, `helpers.ts`, `cloners.ts`, `constants.ts`, `validators.ts`, `parsers.ts`, `factories.ts`, `BriefCompiler.ts`, and `BriefManager.ts`.

22. package=brief file=`src/core/types.ts:215` rule=`.claude/rules/writing.md` § Substitutions verdict=CONFIRMED
    wrong: "`command` should carry a clear exit signal" writes `should`, which the substitution table refuses outright.
    repair: Rewrite as "`command` must carry a clear exit signal — it becomes the `/goal` condition verbatim."

23. package=brief file=`src/core/types.ts:413` (also `:479`) rule=`AGENTS.md` § Non-negotiable rules — "ALWAYS make interface properties and public return collections readonly" verdict=CONFIRMED
    wrong: `BriefCompilerEventMap`'s `compile`, `block`, `error`, and `destroy` members and `BriefManagerEventMap`'s `add`, `remove`, and `destroy` members carry no `readonly`, unlike `process/src/core/types.ts:116` which marks every event-map member readonly.
    repair: Prefix each member with `readonly`.

24. package=brief file=`src/core/helpers.ts:6` rule=`.claude/rules/architecture.md` § Kind purity — "Keep the leaf pair class-free" verdict=CONFIRMED
    wrong: `helpers.ts` imports `snapshotBrief` from `cloners.js`, but the rule places `cloners.ts` above the leaf pair and states it "is never consumed by them"; `cloners.ts:105` acknowledges the edge as a cycle-avoidance measure rather than as a sanctioned exception.
    repair: Move the four snapshot-taking projections — `pinBrief` (`:883`), `briefToMarkdown` (`:1001`), `briefToGoal` (`:1144`), and `briefToDispatch` (`:1182`) — into a file that sits above the leaves, and delete the `cloners.js` import from `helpers.ts` so it imports only types, constants, errors, and validators.

25. package=brief file=`src/core/helpers.ts:45` rule=`.claude/rules/architecture.md` § Kind purity — "Every exported function in `factories.ts` is named `create*`" verdict=EXEMPT
    wrong: `task`, `reference`, `manifest`, `outcome`, `given`, `example`, `citation`, `gap`, `risk`, `output`, `proof`, `brief`, and `gateDefinition` (`:45`, `:63`, `:80`, `:105`, `:124`, `:143`, `:166`, `:187`, `:213`, `:232`, `:255`, `:278`, `:328`) each construct and return a fresh value, which is the value-factory row, yet they sit in `helpers.ts` under bare-noun names rather than in `factories.ts` under `create*`.
    repair: None taken here — `guides/brief.md:350`–`:362` documents them as a deliberate "Builders" category "following the reasons idiom", distinct from the guide's own "Factories" section at `:576`. Recording the conflict so an owner can rule on it: the exemption lives in one package's guide and the kind rule is fleet canon, and `.claude/rules/architecture.md` states placement follows what a function is rather than what it is called.

26. package=brief file=`src/core/helpers.ts:990` (also `:1132`, `:1167`) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `briefToMarkdown` (`:1001`), `briefToGoal` (`:1144`), and `briefToDispatch` (`:1182`) each declare a parameter named `input`, but each `@param` documents a parameter named `source` that does not exist.
    repair: Rename the three parameters to `source`, matching every sibling projection in the file and the `@param` already written.

27. package=brief file=`src/core/types.ts:469` (also `:501`) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `BriefCompilerInterface`'s `emitter`, `interpret`, `reason`, `compile`, `gate`, and `destroy` and `BriefManagerInterface`'s `emitter`, `size`, `has`, `brief`, `briefs`, `add`, `remove`, and `destroy` carry no TSDoc at all, and neither do the implementing members at `BriefCompiler.ts:95`–`:241` or `BriefManager.ts:39`–`:117`; `process/src/core/types.ts:207` documents every member of the equivalent contract.
    repair: Document each member with a description, `@param`, `@returns`, and `@throws` where applicable — `compile` and `gate` in particular, whose containment and throwing behavior is described only in `@remarks` blocks on other symbols.

28. package=brief file=`src/core/types.ts:503` rule=`.claude/rules/names.md` § Tallies verdict=CONFIRMED
    wrong: `BriefManagerInterface.size` is the interface's lone unambiguous tally, which the rule names `count`; `ProcessManagerInterface.count` at `process/src/core/types.ts:742` is the fleet's other manager tally.
    repair: Rename to `count` on the interface and at `BriefManager.ts:65`, and update `guides/brief.md:600` and the `factories.ts:50` example.

29. package=brief file=`src/core/types.ts:470` (also `:471`, `:460`, `:461`) rule=`.claude/rules/names.md` § General vocabulary — "Properties are nouns; methods are verbs" verdict=CONFIRMED
    wrong: `BriefCompilerInterface.interpret` and `BriefCompilerOptions.interpret` name a property with a bare verb, so `compiler.interpret` reads as a call rather than as the engine it returns.
    repair: Rename the property and the option to `interpreter` and update `BriefCompiler.ts:66`, `:81`, `:87`, `:89`, `:99`, `:289`, `:237`; `reason` stays, being a noun as well as a verb.

30. package=brief file=`src/core/helpers.ts:143` rule=`AGENTS.md` § Design laws — "One concept, one term" verdict=CONFIRMED
    wrong: `example(input, result, note)` names its second parameter `result` while the member it fills, the guard at `validators.ts:115`, and the shape at `shapers.ts:79` all call it `output`.
    repair: Rename the parameter to `output` and update the `@param` at `:132`.

## Clean

None. Every package returned at least one confirmed finding.

## Deviation

None.