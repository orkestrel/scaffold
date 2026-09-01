# Fix report: msg

## Dispositions

- **s13-02** deferred_breaking: Re-verified: src/core/types.ts still declares `kind: 'msg' | 'attachment' | 'recipient'` on both MSGFieldData and MSGMutableFieldData, and both interfaces are barrelled through src/core/index.ts. Renaming the member to `category` removes `kind` from the published surface and breaks every consumer reading `fields.kind`, so nothing was applied. Carry to the work order.
- **s13-03** deferred_breaking: Re-verified: MSGDirectoryEntry.type and MSGBurnerEntry.type are still `number` on two barrelled interfaces. Renaming them to `category` is a public member rename; the DRIFT-RESHAPE lane's amendment also renames the exported MSG_TYPE_UNALLOCATED/DIRECTORY/DOCUMENT/ROOT and MSG_PROP_TYPE_OFFSET constants, which is a second published rename. The guide fence at guides/msg.md constructs MSGBurnerEntry with `type: 5`, so the repair cannot be split into a non-breaking half. Nothing applied.
- **s13-04** applied (src/core/helpers.ts, src/core/shapers.ts, guides/msg.md): detectFormat now sniffs through EML_EXTENSIONS/MSG_EXTENSIONS (endsWith) and EML_MIME_TYPES/MSG_MIME_TYPES (includes), keeping the existing extension-before-MIME order; resolveEncoding returns FALLBACK_CHARSET and its TSDoc links it; extractMessage's attachment-part name falls back to FALLBACK_ATTACHMENT_NAME. Every constant holds exactly the literal it replaced, so behavior is unchanged. The guide row for FALLBACK_ATTACHMENT_NAME named `inferExtension`'s callers, which have no src reader at all; corrected it to name `extractMessage`, the reader the repair created.
- **s13-05** applied (src/core/helpers.ts): isMSGFile reads MSG_FILE_HEADER from constants.js instead of its own inline byte array; the loop bound and the comparison now both come from the shared constant.
- **s13-06** applied (src/core/constants.ts, guides/msg.md): Applied the non-breaking half both lanes agreed on: MSG_FIELD_TYPE_MAPPING is typed Readonly<Record<string, MSGFieldType>> (all six values are union members; MSG.ts's decodeAs comparisons now narrow on the real union), constants.ts gained the type-only import, and the guide's Kind cell was corrected to match, which makes the guide's existing MSGFieldType claim true. The MSGDirectoryEntryType half is deferred: deleting a barrelled exported type is breaking, and the alternative branch (a numeric-to-union parser plus retyping MSGDirectoryEntry.type) is a published member retype that shapers.ts writes as a raw byte at CFB offset 0x42. See deviations.
- **s13-07** applied (src/core/helpers.ts, src/core/validators.ts, tests/src/core/helpers.test.ts, tests/src/core/validators.test.ts, guides/msg.md): isRecord and isEmailFormat moved verbatim from helpers.ts into validators.ts, ahead of the shape guards; validators.ts no longer imports from helpers.js and takes EmailFormat from its type import. Both stay reachable under the same names through the src/core/index.ts star exports. Their guide rows moved from the Helpers table to the Validators table (with a Narrows-to column value and the section prose widened), their example lines moved to the validators fence, and their describe blocks moved from helpers.test.ts to validators.test.ts so the tests keep mirroring the source file.
- **s13-08** applied (src/core/types.ts, src/core/shapers.ts, src/core/MSG.ts, guides/msg.md): Added the additive export MSGSourceInterface to types.ts with `parse(): MSGFieldData` and `attachment(index: number): MSGAttachment`, both TSDoc'd; extractMessageFromMSG takes it in place of the inline structural type, and the MSG constructor annotates its `source` object literal with it. Documented it as a Types row and updated the shaper's signature cell. Kept it out of the guide's ## Methods section: that section documents MSGInterface, the behavioral interface, and MSGSourceInterface is a parameter contract whose members are already spelled out in its Types row.
- **s13-11** applied (src/core/MSG.ts): Renamed the private narrowers to #string, #number, #boolean, and #binary — the names both lanes converged on — across all 97 declaration and call sites. #role and the #read* family (#readBat, #readSbat, #readXbat, #readEntryName, #readFields) are untouched, so the class keeps one shape per family.
- **s13-12** applied (src/core/errors.ts): Added an @example to the MSGError class TSDoc constructing an error with a code, a message, and a context object, matching the '@src/core' import form the sibling isMSGError, MSG, and createMSG examples use.
- **s13-13** applied (src/core/errors.ts): Deleted the `AGENTS §12:` citation from the errors.ts header comment and kept the sentence stating the error contract.
- **s13-14** applied (src/core/factories.ts): Rewrote the createMSG remark as '`createMSG` and `new MSG()` are two entry points, not one wrapping the other:', exactly as the repair specified.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 1445ms on 44 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . (no output, exit 0)
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json (no diagnostics, exit 0)
- npm run build: pass — [unplugin:dts] Declaration files built in 1863ms. / dist/src/core/index.cjs 92.12 kB | gzip: 24.07 kB / built in 2.38s / Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src: Test Files 6 passed (6), Tests 178 passed (178) | policy: 111 passed | config: 46 passed | setup: 13 passed | guides: 18 passed

## Diffstat

```text
 guides/msg.md                     |  47 +++++----
 src/core/MSG.ts                   | 200 +++++++++++++++++++-------------------
 src/core/constants.ts             |   4 +-
 src/core/errors.ts                |   9 +-
 src/core/factories.ts             |   8 +-
 src/core/helpers.ts               |  55 +++++------
 src/core/shapers.ts               |  13 ++-
 src/core/types.ts                 |  26 +++++
 src/core/validators.ts            |  23 ++++-
 tests/src/core/helpers.test.ts    |  39 --------
 tests/src/core/validators.test.ts |  46 ++++++++-
 11 files changed, 261 insertions(+), 209 deletions(-)
```

- dist moves: true

## Deviations

s13-06 lane conflict, resolved by the brief rather than by picking a lane. The DRIFT lane directs deleting MSGDirectoryEntryType (and the guide row with it); the DRIFT-RESHAPE lane directs explicitly not deleting it, offering instead a numeric-code-to-union parser typing MSGDirectoryEntry.type through it, or correcting the guide claim. The lanes share only the MSG_FIELD_TYPE_MAPPING retyping, which I applied. Every branch for MSGDirectoryEntryType itself is breaking under the brief's test: deletion removes a barrelled export, and the parser branch retypes a published member that shapers.ts writes as a raw byte at CFB offset 0x42. I therefore applied neither and carry the MSGDirectoryEntryType half to the work order alongside s13-03, which owns the same member. The lane alternative "correct guides/msg.md:111 to stop claiming a union the constant does not carry" was overtaken: the retyping makes that claim true, so the row's Kind cell was corrected to `Readonly<Record<string, MSGFieldType>>` instead.

Two ancillary decisions taken and recorded rather than escalated: the FALLBACK_ATTACHMENT_NAME guide row was corrected to name `extractMessage` because the reader it claimed (`inferExtension`'s callers) has no src caller at all and the repair's stated purpose is making the guide's claims true; and the isRecord/isEmailFormat describe blocks were moved from helpers.test.ts to validators.test.ts so the test files keep mirroring the source files the repair moved those guards between.

No off-limits file was touched: `git status --short` lists only guides/msg.md, seven src/core files, and two tests/src/core files. The tree is uncommitted.
