# Unit breaking-msg — report (2026-09-02)

Writer: `implementer` on Opus 5 (native; Sol dark, substitution recorded). Returned report:

## Rows

- **s13-02** — applied: Renamed the field-data discriminant kind → category on MSGMutableFieldData (src/core/types.ts:83 before edit) and MSGFieldData (:155), plus the @remarks bullet that names it. Updated every in-package reader: src/core/MSG.ts:759 (#extractFields root accumulator), :927 (#toFieldData narrowing, both the key and mutable.category), :977 (attachment accumulator), :983 (recipient accumulator), :994 (embedded-MSG accumulator). Updated the guide fence at guides/msg.md that constructs MSGFieldData, and the tests that name the member: tests/src/core/parsers.test.ts (4 literals) and tests/src/core/MSG.test.ts (8 assertions). Word-boundary sweep for kind over src, tests, guides afterwards: no hit in src, tests/src, tests/config.test.ts, tests/distribution.test.ts, tests/setup.test.ts, guides/msg.md, guides/README.md. Remaining hits all classified foreign: tests/setupPolicy.ts (off-limits; TypeScript SyntaxKind and the architecture kind-table vocabulary), tests/guides.test.ts:120 (@orkestrel/guide's SurfaceSymbol.kind), guides/guide.md and guides/test.md (vendored dependency mirrors; ExportKind/SurfaceSymbol.kind and ordinary English).
- **s13-03** — applied: Renamed MSGDirectoryEntry.type → category and MSGBurnerEntry.type → category, both kept typed number because src/core/shapers.ts writes the value as a raw byte at CFB offset 0x42. Renamed the constant family with it so one concept keeps one term: MSG_PROP_TYPE_OFFSET → MSG_PROP_CATEGORY_OFFSET, MSG_TYPE_UNALLOCATED/DIRECTORY/DOCUMENT/ROOT → MSG_CATEGORY_UNALLOCATED/DIRECTORY/DOCUMENT/ROOT. Updated every reader: src/core/MSG.ts (imports, #readDirectoryEntry, #readProperties, #buildHierarchy, #processDirectory, #processSubDirectory, #parseNameIdDirectory, #burnFolder, #registerBurnerFolder) and src/core/shapers.ts (burnCFB mini classification, directory descent, FAT and mini-FAT allocation, the 0x42 write, first-sector selection, and both stream-data writes). Re-sorted the alphabetised constant import blocks in shapers.ts and tests/src/core/shapers.test.ts. Updated tests/src/core/shapers.test.ts (29 MSGBurnerEntry literals). Guide: the MSGDirectoryEntry and MSGBurnerEntry shape rows, the MSG_PROP_CATEGORY_OFFSET and four MSG_CATEGORY_* constant rows with their prose, and the shapers fence that constructs { name: 'Root Entry', category: 5, length: 0 }. Constants TSDoc rewritten to say category, with MSG_PROP_CATEGORY_OFFSET naming the CFB object type field it mirrors. Word-boundary sweep for the five old constant names over src, tests, guides returns no hit.
- **s13-06-second-half** — applied: Deleted the exported type alias MSGDirectoryEntryType ('root' | 'directory' | 'document' | 'unallocated') from src/core/types.ts with its TSDoc, and deleted its guide row. Deletion is the branch the disjunction actually admits: the alias had no reference anywhere in src, and it is a decorative string relabelling of a fact MSG_CATEGORY_UNALLOCATED/DIRECTORY/DOCUMENT/ROOT already carry, which AGENTS.md § Design laws forbids under Real domain states only and Derive state; giving it a consumer would mean adding a numeric-to-union parser with no caller, which Minimal public API forbids. The barrel is star-export only, so no barrel row changed; guides parity (npm run test:guides, inside npm test) proves the guide and the barrel agree in both directions. MSGFieldType is untouched and retained: it has a real consumer through MSG_FIELD_TYPE_MAPPING, which s13-06's first half already retyped.

## Symbols moved

- MSGFieldData.kind → MSGFieldData.category
- MSGMutableFieldData.kind → MSGMutableFieldData.category
- MSGDirectoryEntry.type → MSGDirectoryEntry.category
- MSGBurnerEntry.type → MSGBurnerEntry.category
- MSG_PROP_TYPE_OFFSET → MSG_PROP_CATEGORY_OFFSET
- MSG_TYPE_UNALLOCATED → MSG_CATEGORY_UNALLOCATED
- MSG_TYPE_DIRECTORY → MSG_CATEGORY_DIRECTORY
- MSG_TYPE_DOCUMENT → MSG_CATEGORY_DOCUMENT
- MSG_TYPE_ROOT → MSG_CATEGORY_ROOT
- MSGDirectoryEntryType — removed
- MSG.ts local entryType → entryCategory (private local, not a published symbol)

## Files touched

- /home/user/fleet/msg/src/core/types.ts
- /home/user/fleet/msg/src/core/constants.ts
- /home/user/fleet/msg/src/core/MSG.ts
- /home/user/fleet/msg/src/core/shapers.ts
- /home/user/fleet/msg/tests/src/core/MSG.test.ts
- /home/user/fleet/msg/tests/src/core/parsers.test.ts
- /home/user/fleet/msg/tests/src/core/shapers.test.ts
- /home/user/fleet/msg/guides/msg.md

## Tests changed

- /home/user/fleet/msg/tests/src/core/MSG.test.ts — 8 assertions moved from fields?.kind to fields?.category (root parse, zero/non-zero DataView offset pair, embedded-MSG inner fields, embedded-MSG re-parse, encoding cases)
- /home/user/fleet/msg/tests/src/core/parsers.test.ts — 4 MSGFieldData/recipient/attachment literals moved from kind to category
- /home/user/fleet/msg/tests/src/core/shapers.test.ts — import block re-sorted onto MSG_CATEGORY_*, and 29 MSGBurnerEntry literals moved from type to category across the burn round-trip, ordering, name-cap, cycle, and large-stream cases
- No test was added or deleted: every row is a rename, and the capability MSGDirectoryEntryType named had no test because it had no consumer

## Gates

- `npm run format:check` → exit 0 — All matched files use the correct format.
Finished in 1621ms on 44 files using 4 threads.
- `npm run lint:check` → exit 0 — > oxlint --config .oxlintrc.json --deny-warnings .
(no diagnostics)
- `npm run check` → exit 0 — > tsc --noEmit --project tsconfig.json && npm run check:src
> tsc --noEmit -p configs/src/tsconfig.core.json
(no diagnostics)
- `npm run build` → exit 0 — dist/src/core/index.js  89.27 kB | gzip: 23.69 kB
dist/src/core/index.cjs 92.38 kB | gzip: 24.12 kB
Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- `npm test` → exit 0 — src:core  Test Files 6 passed (6)  Tests 178 passed (178)  Duration 959ms
policy    Test Files 1 passed (1)  Tests 111 passed (111) Duration 1.28s
config    Test Files 1 passed (1)  Tests 46 passed (46)   Duration 1.80s
setup     Test Files 1 passed (1)  Tests 13 passed (13)   Duration 209ms
guides    Test Files 1 passed (1)  Tests 18 passed (18)   Duration 461ms

## Diff stat

```text
guides/msg.md 69 +++++++++++++++++++--------------------
src/core/MSG.ts 52 ++++++++++++++---------------
src/core/constants.ts 21 ++++++------
src/core/shapers.ts 20 ++++++------
src/core/types.ts 26 +++++++++------
tests/src/core/MSG.test.ts 16 ++++-----
tests/src/core/parsers.test.ts 8 ++---
tests/src/core/shapers.test.ts 74 ++++++++++++++++++++++++------------------
8 files changed, 151 insertions(+), 135 deletions(-)
```

Status at return (writer's reading): `M guides/msg.md |  M src/core/MSG.ts |  M src/core/constants.ts |  M src/core/shapers.ts |  M src/core/types.ts |  M tests/src/core/MSG.test.ts |  M tests/src/core/parsers.test.ts |  M tests/src/core/shapers.test.ts`
Built `dist/` moves: true

## Observations

- dist moves, measured rather than assumed: after npm run build, grep over dist/src/core/index.d.ts and dist/src/core/index.js counts 0 hits for MSGDirectoryEntryType and MSG_TYPE_, and index.d.ts declares MSG_CATEGORY_DIRECTORY, MSG_CATEGORY_DOCUMENT, MSG_CATEGORY_ROOT, MSG_CATEGORY_UNALLOCATED plus `readonly category` at four declaration sites. Every downstream consumer in breaking-radius.json re-pins against the new names.
- Whole-suite timing on this host: no timing-suspect failure. 366 tests across 10 files, longest project 1.80s (config), whole chain uneventful. Nothing carried to the Orchestrator's authoritative re-run.
- oxfmt formats Markdown as well as TypeScript, and it re-pads Markdown table columns. Deleting the MSGDirectoryEntryType row removed the widest first-column entry in the guide's Types table, so npm run format narrowed that column from 23 to 21 and rewrote 25 rows whitespace-only. Read guides/msg.md with `git diff -w` to see the three substantive row changes (MSGDirectoryEntry shape, MSGBurnerEntry shape, deleted MSGDirectoryEntryType row).
- npm run test:distribution was not run: it is outside npm test, it runs from prepublishOnly, and dependency tarballs are staged, per the brief.
- MSG_CATEGORY_UNALLOCATED still has no reader in src — it is a documented constant only. That is unchanged by this unit (MSG_TYPE_UNALLOCATED had no reader either) and belongs to the package's naming/minimal-API capability for a later change, not to these rows.
- Prose sweep classification, retained hits for the word `type` over src, tests, guides/msg.md: src/core/constants.ts:110 and src/core/types.ts (two @remarks blocks) and guides/msg.md's MSG_PROP_CATEGORY_OFFSET row name the Compound File Binary object type field the category member mirrors, which the vocabulary rule requires; src/core/constants.ts MSG_FIELD_DIR_TYPE_INNER_MSG and the three MSG_MAPI_RECIPIENT_* blocks, plus src/core/types.ts MSGFieldType and the recipientRole remark, are MAPI property-type and recipient-type vocabulary on a different axis; src/core/helpers.ts encoding-type @param prose is ordinary English about MIME transfer encoding; tests/config.test.ts uses the `with { type: 'json' }` import attribute and TypeScript's own `type export` vocabulary; tests/distribution.test.ts reads package.json's `type` manifest field; guides/msg.md's `| type |` cells are @orkestrel/guide's ExportKind column. No hit names the CFB directory-entry axis.
- Centralization sweep over the touched files: no declaration added or moved, so kind purity is unchanged — types.ts holds types only (one alias removed), constants.ts holds only UPPER_SNAKE_CASE consts, MSG.ts holds one class, shapers.ts holds exported shaper functions. No nested function, no compatibility alias, no re-export, no wrapper introduced. Text integrity: git diff --check clean; the only U+FFFD characters in the tree are the intentional replacement-character assertions in src/core/helpers.ts and the helpers/parsers tests, all in lines this unit did not touch.

## Deviations

- s13-06's first branch is inapplicable as written and I took the second, without stopping. The brief offers 'type MSGDirectoryEntryType as Readonly<Record<string, MSGDirectoryEntryTypeMember>> like MSG_FIELD_TYPE_MAPPING, or delete it with its guide row'. MSGDirectoryEntryType is a type alias (src/core/types.ts:51, a string-literal union), not a value declaration, so it cannot be annotated with a Record type; and MSGDirectoryEntryTypeMember does not exist anywhere in the tree (grep over src, tests, guides returns no hit). The deletion branch is the one the disjunction admits and the one the law supports, so I applied it rather than stopping on an inapplicable half.
- TSDoc wording ruling, which the deviation contract assigns to me: the touched blocks keep the noun-phrase first sentence the rest of each file uses, rather than being rewritten into the third-person -s verb form. `.claude/rules/typescript.md` fixes that form for what a symbol does, and every block this unit touched is data — a constant, a type alias, or an interface — not a function. Rewriting five constants and two interfaces into verb form would leave them inconsistent with their untouched siblings in the same files.
- Added a @remarks bullet to MSGDirectoryEntry and MSGBurnerEntry naming what `category` mirrors: the Compound File Binary object type field at directory-entry offset 0x42, with the MSG_CATEGORY_* constants to compare or supply. The brief's vocabulary requires a mirrored member's TSDoc to name its source, and the rename deliberately drops the external wording, so the source is named in prose instead. This is an addition to two blocks the rows already move, not a new capability.
- Renamed the private local `entryType` to `entryCategory` in MSG.ts #readProperties. It reads the same byte the renamed member carries, and leaving it would alternate synonyms for one concept against AGENTS.md § Design laws. It is a function-local binding, so no published surface moves with it.
- Guide table padding: I hand-padded the rewritten guide rows before discovering oxfmt re-pads Markdown tables, then restored the MSGDirectoryEntry shape sentence to its original 'a CFB storage/stream entry.' wording, which I had shortened only to fit the old column width. The formatter settled the final alignment; format:check exits 0.

Actual diff and status rendered by the Orchestrator: `tmp/units/breaking/msg.diff`,
`tmp/units/breaking/msg.status`.
