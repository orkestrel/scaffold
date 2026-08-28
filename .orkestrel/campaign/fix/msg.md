# Fix dossier: msg

Verified fix-producing findings for the `msg` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s13-02 — DRIFT

2. package=msg file=`src/core/types.ts:155` (also `:83`) rule=`AGENTS.md` § Design laws — "Named discriminants" verdict=CONFIRMED
   wrong: `MSGFieldData.kind: 'msg' | 'attachment' | 'recipient'` names the discriminant `kind`, which the law forbids outright, and `MSGMutableFieldData` repeats it.
   repair: Rename the member to the axis it varies — `category` — on both interfaces, and update `MSG.ts:757`, `:925`, `:975`, `:981`, `:992` plus the guide's `guides/msg.md:272` fence.

## s13-03 — DRIFT-RESHAPE

3. package=msg file=`src/core/types.ts:67` (also `:110`) rule=`AGENTS.md` § Design laws — "Named discriminants" verdict=CONFIRMED
   wrong: `MSGDirectoryEntry.type: number` and `MSGBurnerEntry.type: number` name a public entity property `type`, which the same law rejects.
   repair: Rename both to `category` and update the readers at `MSG.ts:503`, `:531`, `:540`, `:603`, `:1265`, `:1297`, `:1317` and `shapers.ts:60`, `:185`, `:203`, `:217`, `:345`, `:356`, `:365`, `:377`.

### Verification

**Judge (DRIFT-RESHAPE/high):** The violation is real and unregistered: `type` names the CFB entry-lifecycle axis on two public interfaces, readers compare it against MSG_TYPE_* constants, and msg's guide has no Vocabulary register and its history no settling commit. The subjective lane wins the repair question: the public constan

**Lane DRIFT/high:** amend: keep the rename to `category`, and add `guides/msg.md:266` to the update list — that fence constructs `MSGBurnerEntry` with `type: 5` and would break silently otherwise.

**Lane DRIFT-RESHAPE/medium:** amend: rename the member to `category` on both interfaces AND rename the constant family with it — `MSG_CATEGORY_UNALLOCATED`, `MSG_CATEGORY_DIRECTORY`, `MSG_CATEGORY_DOCUMENT`, `MSG_CATEGORY_ROOT`, and `MSG_PROP_CATEGORY_OFFSET` — so one concept keeps one term. Keep the member typed `number`, because shapers.ts:345 writes it at CFB offset 0x42. Update the readers the finding lists plus guides/msg.md rows 48, 51, 54 and 101-104 and the fence at :266.

## s13-04 — DRIFT

4. package=msg file=`src/core/constants.ts:409`–`:434` rule=`.claude/rules/architecture.md` § System constraints — "Centralize any pattern repeated twice" verdict=CONFIRMED
   wrong: `EML_EXTENSIONS`, `MSG_EXTENSIONS`, `EML_MIME_TYPES`, `MSG_MIME_TYPES`, `FALLBACK_CHARSET`, and `FALLBACK_ATTACHMENT_NAME` have no reader anywhere in `src/`, while `helpers.ts:545`–`:549` hardcodes `'.eml'`/`'.msg'`/`'message/rfc822'`/`'application/vnd.ms-outlook'`, `helpers.ts:510` hardcodes `'utf-8'`, and `shapers.ts:552` hardcodes `'attachment'` — and `guides/msg.md:128`–`:133` states each constant governs exactly the code that ignores it.
   repair: Route `detectFormat`, `resolveEncoding`, and the `extractMessage` attachment fallback through the constants, so the guide's claims become true.

## s13-05 — DRIFT

5. package=msg file=`src/core/helpers.ts:198` rule=`.claude/rules/architecture.md` § Kind purity verdict=CONFIRMED
   wrong: `isMSGFile` declares its own inline `[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]` array, a second copy of the already-exported `MSG_FILE_HEADER` at `constants.ts:6` that `shapers.ts:307` uses.
   repair: Delete the local array and read `MSG_FILE_HEADER` from `constants.js`.

## s13-06 — DRIFT

6. package=msg file=`src/core/types.ts:51` (also `:56`) rule=`AGENTS.md` § Design laws — "Real domain states only"; `.claude/rules/architecture.md` § System constraints verdict=CONFIRMED
   wrong: `MSGDirectoryEntryType` and `MSGFieldType` are declared and barrelled but referenced nowhere in `src/`; `MSGDirectoryEntry.type` is `number` and `MSG_FIELD_TYPE_MAPPING` at `constants.ts:256` is `Readonly<Record<string, string>>` even though `guides/msg.md:111` says its values are `MSGFieldType` tags.
   repair: Type `MSG_FIELD_TYPE_MAPPING` as `Readonly<Record<string, MSGFieldType>>` so `MSG.ts:1090`'s `decodeAs` narrows on the real union, and give `MSGDirectoryEntryType` the same treatment or delete it.

### Verification

**Judge (DRIFT/medium):** The subjective lane is right. Both halves of the finding's repair direction are sound once the disjunction is read correctly. The `MSG_FIELD_TYPE_MAPPING` retyping is provably safe and makes the guide's existing claim true. For `MSGDirectoryEntryType`, 'the same treatment' is impossible (the member

**Lane DRIFT-RESHAPE/medium:** amend: retype `MSG_FIELD_TYPE_MAPPING` as `Readonly<Record<string, MSGFieldType>>` (safe, verified against all six values and all seven `decodeAs` comparisons). For `MSGDirectoryEntryType`, do not delete it: either give it a real consumer by adding a numeric-code-to-union parser beside the MSG_TYPE_* constants and typing `MSGDirectoryEntry.type` through it, or keep it as documented external vocabulary and correct `guides/msg.md:111` to stop claiming a union the constant does not carry.

**Lane DRIFT/medium:** amend: apply the `MSG_FIELD_TYPE_MAPPING` retyping to `Readonly<Record<string, MSGFieldType>>` exactly as stated. For `MSGDirectoryEntryType` take the deletion branch rather than 'the same treatment', and delete guides/msg.md:48 with it, because shapers.ts:345 writes that member as a raw byte at CFB offset 0x42 and it cannot carry a string union.

## s13-07 — DRIFT

7. package=msg file=`src/core/helpers.ts:63` (also `:521`) rule=`.claude/rules/architecture.md` § Centralized-file pattern; `.claude/rules/patterns.md` § Validation and contracts verdict=CONFIRMED
   wrong: `isRecord` and `isEmailFormat` are total `(unknown) => value is T` guards sitting in `helpers.ts` while `validators.ts` exists and holds the package's other guards.
   repair: Move both into `validators.ts` and drop `validators.ts:2`'s import of `isRecord` from `helpers.js`; `isMSGFile` and `isSuccess`/`isFailure` stay put, being a bare predicate and typed narrowers rather than total guards.

## s13-08 — DRIFT

8. package=msg file=`src/core/shapers.ts:433` rule=`.claude/rules/typescript.md` § Types verdict=CONFIRMED
   wrong: `extractMessageFromMSG` declares its `reader` contract as an inline structural type in the parameter position of a public export, so a consumer cannot name what the function accepts.
   repair: Declare it in `types.ts` as `MSGSourceInterface` with `parse(): MSGFieldData` and `attachment(index: number): MSGAttachment`, and reference it here and at the `MSG.ts:188` call site.

## s13-11 — DRIFT-RESHAPE

11. package=msg file=`src/core/MSG.ts:766` (also `:772`, `:778`, `:784`) rule=`.claude/rules/names.md` § Rejected naming — "Abbreviations" verdict=CONFIRMED
    wrong: `#str`, `#num`, `#bool`, and `#bin` are abbreviations, which the rule bans without exempting private members; private methods are allowed two or three words, not truncated ones.
    repair: Rename to `#readString`, `#readNumber`, `#readBoolean`, and `#readBinary`, matching the sibling `#role`.

### Verification

**Judge (DRIFT-RESHAPE/high):** Both lanes reach the same corrected names and the same facts; the subjective lane's verdict label is the one that fits the definitions. The violation is real: the abbreviation ban carries no private-member exemption, and the hard target grants private methods two or three words rather than truncatio

**Lane DRIFT/high:** amend: rename to `#string`, `#number`, `#boolean`, `#binary`, which actually match the sibling `#role` the finding invokes. The `#read*` forms are also permitted under 'Private methods: two or three words are acceptable', but then `#role` must become `#readRole` in the same change so the family stays one shape.

**Lane DRIFT-RESHAPE/high:** amend: rename to `#string`, `#number`, `#boolean`, and `#binary` rather than `#read*`. That matches the sibling `#role`, keeps the entity-scoped one-word form, and leaves the class's real `#read*` family — `#readBat`, `#readSbat`, `#readXbat`, `#readEntryName`, `#readFields` — meaning only what it means now.

## s13-12 — DRIFT

12. package=msg file=`src/core/errors.ts:18` rule=`.claude/rules/architecture.md` § Barrel exports — "A row obliges a documented, runnable example"; `.claude/rules/typescript.md` § Comments and API documentation verdict=CONFIRMED
    wrong: `MSGError` is barrelled and consumer-constructible but carries no `@example`, while `isMSGError`, `MSG`, and `createMSG` in the same package all carry one.
    repair: Add an `@example` constructing an `MSGError` with a code, message, and context.

## s13-13 — DRIFT

13. package=msg file=`src/core/errors.ts:3` rule=`.claude/rules/documentation.md` § Authority and workflow verdict=CONFIRMED
    wrong: The comment opens `AGENTS §12:`, citing a numbered section that `AGENTS.md` does not have, so it points a reader at nothing.
    repair: Delete the citation and keep the sentence that states the error contract.

## s13-14 — DRIFT

14. package=msg file=`src/core/factories.ts:17` rule=`.claude/rules/writing.md` § Claims and time; § Substitutions verdict=CONFIRMED
    wrong: "This is a deliberate NEW dual API" uses `new` as a time word, which the substitution table deletes, and shouts it in capitals.
    repair: Rewrite as "`createMSG` and `new MSG()` are two entry points, not one wrapping the other:".

