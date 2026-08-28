# Findings for group g05

Packages: all, msg, process. Each finding keeps its original id. The verdict= inside each finding text is the ORIGINAL auditor lane ruling (CONFIRMED or EXEMPT) - re-rule it yourself from primary evidence; never inherit it.

## s13-01

1. package=all three file=(list following) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
   wrong: The TSDoc first sentence is imperative rather than third-person with an `-s` verb, which the rule fixes as `Creates`, `Returns`, `Checks whether`.
   repair: Rewrite each listed first sentence into the third person, leaving the rest of the block untouched.
   msg — `errors.ts:31`; `types.ts:411`, `:420`; `parsers.ts:9`; `MSG.ts:127`, `:228`, `:282`; `helpers.ts:8`, `:23`, `:38`, `:48`, `:58`, `:70`, `:84`, `:111`, `:136`, `:151`, `:169`, `:192`, `:209`, `:220`, `:252`, `:289`, `:338`, `:436`, `:455`, `:483`, `:516`, `:526`, `:555`, `:604`, `:644`, `:662`, `:698`; `factories.ts:10`; `validators.ts:5`, `:21`, `:45` (noun phrase, no verb at all); `shapers.ts:38`, `:422`, `:492`.
   process — `core/errors.ts:19`; `core/types.ts:279`, `:297`, `:314`, `:492`, `:513`, `:534`, `:549`, `:757`, `:775`, `:782`, `:789`, `:795`; `server/types.ts:35`, `:42`, `:50`; `server/Process.ts:64`, `:180`; `server/Session.ts:44`; `server/Supervisor.ts:92`; `server/ProcessManager.ts:57`, `:100`, `:139`, `:146`, `:153`, `:165`.
   brief — `errors.ts:36`; `parsers.ts:6`; `helpers.ts:31`, `:50`, `:68`, `:90`, `:110`, `:129`, `:148`, `:171`, `:199`, `:218`, `:242`, `:260`, `:301`, `:401`, `:582`, `:734`, `:766`, `:789`, `:823`, `:860`, `:919`, `:984`, `:1126`, `:1156`, `:1200`, `:1225`, `:1278`, `:1313`; `factories.ts:15`, `:39`, `:58`.
   Note the inconsistency this creates inside one file: `process/src/server/Process.ts:180` is imperative while `:200` and `:215` are third person, and `msg/src/core/helpers.ts:714` (`Infers…`) is third person among thirty imperatives.

## s13-02

2. package=msg file=`src/core/types.ts:155` (also `:83`) rule=`AGENTS.md` § Design laws — "Named discriminants" verdict=CONFIRMED
   wrong: `MSGFieldData.kind: 'msg' | 'attachment' | 'recipient'` names the discriminant `kind`, which the law forbids outright, and `MSGMutableFieldData` repeats it.
   repair: Rename the member to the axis it varies — `category` — on both interfaces, and update `MSG.ts:757`, `:925`, `:975`, `:981`, `:992` plus the guide's `guides/msg.md:272` fence.

## s13-03

3. package=msg file=`src/core/types.ts:67` (also `:110`) rule=`AGENTS.md` § Design laws — "Named discriminants" verdict=CONFIRMED
   wrong: `MSGDirectoryEntry.type: number` and `MSGBurnerEntry.type: number` name a public entity property `type`, which the same law rejects.
   repair: Rename both to `category` and update the readers at `MSG.ts:503`, `:531`, `:540`, `:603`, `:1265`, `:1297`, `:1317` and `shapers.ts:60`, `:185`, `:203`, `:217`, `:345`, `:356`, `:365`, `:377`.

## s13-04

4. package=msg file=`src/core/constants.ts:409`–`:434` rule=`.claude/rules/architecture.md` § System constraints — "Centralize any pattern repeated twice" verdict=CONFIRMED
   wrong: `EML_EXTENSIONS`, `MSG_EXTENSIONS`, `EML_MIME_TYPES`, `MSG_MIME_TYPES`, `FALLBACK_CHARSET`, and `FALLBACK_ATTACHMENT_NAME` have no reader anywhere in `src/`, while `helpers.ts:545`–`:549` hardcodes `'.eml'`/`'.msg'`/`'message/rfc822'`/`'application/vnd.ms-outlook'`, `helpers.ts:510` hardcodes `'utf-8'`, and `shapers.ts:552` hardcodes `'attachment'` — and `guides/msg.md:128`–`:133` states each constant governs exactly the code that ignores it.
   repair: Route `detectFormat`, `resolveEncoding`, and the `extractMessage` attachment fallback through the constants, so the guide's claims become true.

## s13-05

5. package=msg file=`src/core/helpers.ts:198` rule=`.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
   wrong: `isMSGFile` declares its own inline `[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]` array, a second copy of the already-exported `MSG_FILE_HEADER` at `constants.ts:6` that `shapers.ts:307` uses.
   repair: Delete the local array and read `MSG_FILE_HEADER` from `constants.js`.

## s13-06

6. package=msg file=`src/core/types.ts:51` (also `:56`) rule=`AGENTS.md` § Design laws — "Real domain states only"; `.claude/rules/architecture.md` § System constraints verdict=CONFIRMED
   wrong: `MSGDirectoryEntryType` and `MSGFieldType` are declared and barrelled but referenced nowhere in `src/`; `MSGDirectoryEntry.type` is `number` and `MSG_FIELD_TYPE_MAPPING` at `constants.ts:256` is `Readonly<Record<string, string>>` even though `guides/msg.md:111` says its values are `MSGFieldType` tags.
   repair: Type `MSG_FIELD_TYPE_MAPPING` as `Readonly<Record<string, MSGFieldType>>` so `MSG.ts:1090`'s `decodeAs` narrows on the real union, and give `MSGDirectoryEntryType` the same treatment or delete it.

## s13-07

7. package=msg file=`src/core/helpers.ts:63` (also `:521`) rule=`.claude/rules/architecture.md` § Centralized-file pattern; `.claude/rules/patterns.md` § Validation and contracts verdict=CONFIRMED
   wrong: `isRecord` and `isEmailFormat` are total `(unknown) => value is T` guards sitting in `helpers.ts` while `validators.ts` exists and holds the package's other guards.
   repair: Move both into `validators.ts` and drop `validators.ts:2`'s import of `isRecord` from `helpers.js`; `isMSGFile` and `isSuccess`/`isFailure` stay put, being a bare predicate and typed narrowers rather than total guards.

## s13-08

8. package=msg file=`src/core/shapers.ts:433` rule=`.claude/rules/typescript.md` § Types verdict=CONFIRMED
   wrong: `extractMessageFromMSG` declares its `reader` contract as an inline structural type in the parameter position of a public export, so a consumer cannot name what the function accepts.
   repair: Declare it in `types.ts` as `MSGSourceInterface` with `parse(): MSGFieldData` and `attachment(index: number): MSGAttachment`, and reference it here and at the `MSG.ts:188` call site.

## s13-09

9. package=msg file=`src/core/shapers.ts:433` and `:498` rule=`AGENTS.md` § Design laws — "One concept, one term" verdict=CONFIRMED
   wrong: `extractMessageFromMSG` and `extractMessage` are peer algorithms over the same output, but only one names its source, so the bare name silently means "from MIME".
   repair: Rename the pair `extractMSGMessage` and `extractMIMEMessage`, and update `MSG.ts:81`, `:188`, `:196`.

## s13-10

10. package=msg file=`src/core/types.ts:82` rule=`.claude/rules/names.md` § General vocabulary — "Describe what a thing is, not its implementation" verdict=CONFIRMED
    wrong: `MSGMutableFieldData` names a mutability strategy rather than a domain thing, and every property it declares is `readonly`, so the name contradicts the contract it carries.
    repair: Rename it `MSGFieldAccumulator` and update `MSG.ts:21`, `:756`, `:766`–`:797`, `:932`, `:975`, `:981`, `:991`.

## s13-11

11. package=msg file=`src/core/MSG.ts:766` (also `:772`, `:778`, `:784`) rule=`.claude/rules/names.md` § Rejected naming — "Abbreviations" verdict=CONFIRMED
    wrong: `#str`, `#num`, `#bool`, and `#bin` are abbreviations, which the rule bans without exempting private members; private methods are allowed two or three words, not truncated ones.
    repair: Rename to `#readString`, `#readNumber`, `#readBoolean`, and `#readBinary`, matching the sibling `#role`.

## s13-12

12. package=msg file=`src/core/errors.ts:18` rule=`.claude/rules/architecture.md` § Barrel exports — "A row obliges a documented, runnable example"; `.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `MSGError` is barrelled and consumer-constructible but carries no `@example`, while `isMSGError`, `MSG`, and `createMSG` in the same package all carry one.
    repair: Add an `@example` constructing an `MSGError` with a code, message, and context.

## s13-13

13. package=msg file=`src/core/errors.ts:3` rule=`.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
    wrong: The comment opens `AGENTS §12:`, citing a numbered section that `AGENTS.md` does not have, so it points a reader at nothing.
    repair: Delete the citation and keep the sentence that states the error contract.

## s13-14

14. package=msg file=`src/core/factories.ts:17` rule=`.claude/rules/writing.md` § Claims and time; § Substitutions verdict=CONFIRMED
    wrong: "This is a deliberate NEW dual API" uses `new` as a time word, which the substitution table deletes, and shouts it in capitals.
    repair: Rewrite as "`createMSG` and `new MSG()` are two entry points, not one wrapping the other:".

## s13-15

15. package=process file=`src/server/types.ts:27` rule=`.claude/rules/names.md` § Type-level identifiers verdict=CONFIRMED
    wrong: `ProcessChild` declares call-signature members (`kill`, `once`, `off`), so it is a behavioral interface and the table requires the `{Entity}Interface` form; `guides/process.md:208` and `:1398` describe it without stating an exception.
    repair: Rename to `ProcessChildInterface` and update `helpers.ts:8`, `:586`, `:611`, `:674`, `:700`, `:739` and the guide rows.

## s13-16

16. package=process file=`src/server/helpers.ts:100` rule=`.claude/rules/architecture.md` § Centralized-file pattern — "Owned snapshots | `*/cloners.ts`" verdict=CONFIRMED
    wrong: `snapshotCommand` takes one owned frozen snapshot of a caller's value — the cloners row verbatim — but sits in `helpers.ts`, which has no `cloners.ts` sibling to sit beside.
    repair: Add `src/server/cloners.ts`, move `snapshotCommand` there unchanged, add the barrel row to `src/server/index.ts`, and update the importers at `Supervisor.ts:17`, `Process.ts:9`, `Session.ts`, and `execution/execute.ts:18`; the star-export keeps the published surface identical.

## s13-17

17. package=process file=`src/server/Supervisor.ts:107` rule=`.claude/rules/typescript.md` § Types verdict=CONFIRMED
    wrong: The `face` callback bundle is declared as an inline structural type in the constructor signature, yet both `Process.ts:113` and `Session.ts` construct one, so it is a reusable type living outside `types.ts`.
    repair: Declare it in `src/server/types.ts` as `SupervisorFace` with the same six readonly members and reference it from the constructor.

## s13-18

18. package=process file=`src/core/errors.ts:11` rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `ProcessError` is barrelled and consumer-constructible but carries no `@example`, while `isProcessError`, `createInvalidError`, `Retention`, `Process`, and `ProcessManager` in the same package all carry one.
    repair: Add an `@example` constructing a `ProcessError` with a code and context.

## s13-19

19. package=process file=`src/core/types.ts:588` (also `:614`, `:615`) rule=`.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `ExecuteResult.signal` and `ExecuteInput.code`/`signal` are the only members of those interfaces with no documentation line, so a reader learns the `null` semantics for `code` and not for `signal`.
    repair: Add the one-line description each carries elsewhere — "The terminating signal name, or `null` when the process exited on its own."