**Question**

For every breaking work-order row under L0 and L1, name the exact published symbols the remaining repair moves, verified in current package source, so a script can compute each row’s consumer blast radius.

**Evidence**

Work order L0/L1: `.orkestrel/campaign/fix/work-order.md`. Findings: `.orkestrel/campaign/fix/{contract,msg,test,csv,html,indexeddb,sqlite}.md` under each `## <id>`. Writer notes: `.orkestrel/campaign/fix/reports/` for those packages. Dossier lines are stale; symbols below are current `src/` hits.

- **contract s03-01** — spines still exported with traversal state: `schemaNodeToShape` `/home/user/fleet/contract/src/core/shapers.ts:1087`, `buildShapeFromNode` `:912`, `buildObjectShape` `:783`, `inferValue` `inferers.ts:380`, `inferArray` `:459`, `inferObject` `:576`, `inferSamples` `:768`, `inferRecordSamples` `:895`, `canonicalizeValue` `helpers.ts:1728` (moved here by applied s03-08; still carries `ancestors`). Doors kept without state params: `schemaToShape` `shapers.ts:1189`, `valueToSchema` `inferers.ts:702`. Lane struck `matchesJSONValue`.
- **contract s03-06** — `ValueToSchemaOptions.maxDepth` / `maxProperties` `types.ts:475-476`.
- **contract s03-10** — `validateShapeDepth` `compilers.ts:74`.
- **contract s03-13** — `ShapeValidatorInterface.expansion: number` `types.ts:1034`; `ShapeValidator.expansion` `ShapeValidator.ts:131`; `#expansion = 0` `:99`; `refuseExpansion` still takes `number` `helpers.ts:2560`.
- **contract s03-22** — `INTRINSICS` `constants.ts:83`; keys `describe` `:99`, `define` `:101`, `prototype` `:103`, `reveal` `:117`, `declare` `:119`, `parent` `:121`.
- **contract s03-23** — `createStringFaults` `helpers.ts:2259`, `createNumberFaults` `:2328`, `createArrayFaults` `:2397`.
- **msg s13-02** — `MSGMutableFieldData.kind` `types.ts:83`, `MSGFieldData.kind` `:155`.
- **msg s13-03** — `MSGDirectoryEntry.type` `types.ts:67`, `MSGBurnerEntry.type` `:110`; `MSG_PROP_TYPE_OFFSET` `constants.ts:111`; `MSG_TYPE_UNALLOCATED` `:141`, `MSG_TYPE_DIRECTORY` `:146`, `MSG_TYPE_DOCUMENT` `:151`, `MSG_TYPE_ROOT` `:156`. Guide fence still `type: 5` `guides/msg.md:261`.
- **test s11-36** — `PortfolioInterface.states` `types.ts:81`; `PortfolioOptions.states` stays `:62`; factory getter `factories.ts:119`.
- **test s11-37** — `rgba` `helpers.ts:1092`, `contrast` `:1307`, `style` `:1593`, `token` `:1621`, `rootToken` `:1642`, `pixels` `:1669`.
- **test s11-38** — `colorEqual` `helpers.ts:1128`.
- **csv s16-03** — `renderTSV` `helpers.ts:458`; guide row `guides/csv.md:129`, `### Rendering to TSV` `:452`.
- **csv s16-05** — `ParseOptions.comment?: string | false` `types.ts:204`; `DEFAULT_PARSE_OPTIONS.comment: false` `constants.ts:18`; `resolveParseOptions(): Required<ParseOptions>` `helpers.ts:86`; `scanComment` `:539`, `scanUnquoted` `:575`, `scanQuoted` `:620`, `scanField` `:699`, `scanRecord` `:725` all take `Required<ParseOptions>`.
- **html s08-01** — `HTMLHandlers` `types.ts:258`; `HTML.fold` `HTML.ts:173`; `foldNode` `helpers.ts:1278`.
- **html s08-04** — `createAttributeContract` `factories.ts:57`, `createTextContract` `:76`, `createCommentContract` `:95`, `createDoctypeContract` `:114`.
- **html s08-09** — `SanitizeOptions` `types.ts:318`, `DistillOptions` `:349`.
- **indexeddb s16-10** — `CursorOptions.query` `types.ts:210`; `records`/`keys`/`count` on `IndexedDBIndexInterface` `:263-268`, `IndexedDBStoreInterface` `:297-301`, `IndexedDBTransactionStoreInterface` `:330-334`; `IndexedDBStoreInterface.path: KeyPath | null` `:290`; `IndexedDBStore.path` `IndexedDBStore.ts:48`; `readRecords` `helpers.ts:130`.
- **indexeddb s16-12** — `rangeExactKey` `helpers.ts:187`, `rangeBetweenKeys` `:240`.
- **indexeddb s16-15** — mask `{}` `IndexedDBCursor.ts:30`; `IndexedDBCursorInterface.value: Row` `types.ts:232`; getter `:50`.
- **indexeddb s16-17** — `IndexedDBUpgradeContext` `types.ts:124`; `stores` `:128`, `create` `:129`, `drop` `:130`, `store` `:131`, `index` `:150`, `deindex` `:165`.
- **sqlite s18-10** — `SQLiteDatabaseOptions.foreignKeys` `types.ts:85`; reads `SQLiteDatabase.ts:34`, `:42`, `:63`.
- **sqlite s18-11** — `SQLiteDatabaseInterface.exec` `types.ts:138`; `SQLiteDatabase.exec` `:79`.
- **sqlite s18-12** — `SQLiteDatabaseInterface.transaction` `types.ts:140`; `SQLiteDatabase.transaction` `:100`.

**Distillate**

```json
[
  {
    "package": "contract",
    "id": "s03-01",
    "kind": "mixed",
    "edits": [
      { "symbol": "schemaNodeToShape", "action": "remove", "file": "src/core/shapers.ts:1087" },
      { "symbol": "buildShapeFromNode", "action": "remove", "file": "src/core/shapers.ts:912" },
      { "symbol": "buildObjectShape", "action": "remove", "file": "src/core/shapers.ts:783" },
      { "symbol": "inferValue", "action": "remove", "file": "src/core/inferers.ts:380" },
      { "symbol": "inferArray", "action": "remove", "file": "src/core/inferers.ts:459" },
      { "symbol": "inferObject", "action": "remove", "file": "src/core/inferers.ts:576" },
      { "symbol": "inferSamples", "action": "remove", "file": "src/core/inferers.ts:768" },
      { "symbol": "inferRecordSamples", "action": "remove", "file": "src/core/inferers.ts:895" },
      { "symbol": "canonicalizeValue", "action": "remove", "file": "src/core/helpers.ts:1728" }
    ],
    "guide": "guides/contract.md Shapers/Inferers surface rows for the spines; cited export-law justification at the schemaNodeToShape family",
    "prerequisite": [],
    "summary": "Intern the nine exported traversal spines as class # methods and drop their visited/memo/ancestors/depth parameters from the published surface, leaving schemaToShape, valueToSchema, samplesToSchema, canonicalStringify, and isJSONValue as the doors."
  },
  {
    "package": "contract",
    "id": "s03-06",
    "kind": "option-key",
    "edits": [
      { "symbol": "maxDepth", "action": "rename", "to": "depth", "member": "ValueToSchemaOptions", "file": "src/core/types.ts:475" },
      { "symbol": "maxProperties", "action": "rename", "to": "breadth", "member": "ValueToSchemaOptions", "file": "src/core/types.ts:476" }
    ],
    "guide": "guides/contract.md ValueToSchemaOptions row and maxDepth/maxProperties Inferers rows",
    "prerequisite": [],
    "summary": "Rename ValueToSchemaOptions.maxDepth and maxProperties to depth and breadth."
  },
  {
    "package": "contract",
    "id": "s03-10",
    "kind": "rename",
    "edits": [
      { "symbol": "validateShapeDepth", "action": "rename", "to": "validateShape", "file": "src/core/compilers.ts:74" }
    ],
    "guide": "guides/contract.md validateShapeDepth compiler rows and the refuseExpansion remark that keeps that name",
    "prerequisite": [],
    "summary": "Rename the exported validateShapeDepth door to validateShape."
  },
  {
    "package": "contract",
    "id": "s03-13",
    "kind": "mixed",
    "edits": [
      { "symbol": "expansion", "action": "change", "member": "ShapeValidatorInterface", "file": "src/core/types.ts:1034" },
      { "symbol": "expansion", "action": "change", "member": "ShapeValidator", "file": "src/core/ShapeValidator.ts:131" }
    ],
    "prerequisite": [],
    "summary": "Retype ShapeValidatorInterface.expansion from number to number | undefined and return undefined before the first successful validate() and after a failed one, instead of the documented 0 sentinel."
  },
  {
    "package": "contract",
    "id": "s03-22",
    "kind": "rename",
    "edits": [
      { "symbol": "describe", "action": "rename", "member": "INTRINSICS", "file": "src/core/constants.ts:99" },
      { "symbol": "define", "action": "rename", "member": "INTRINSICS", "file": "src/core/constants.ts:101" },
      { "symbol": "prototype", "action": "rename", "member": "INTRINSICS", "file": "src/core/constants.ts:103" },
      { "symbol": "reveal", "action": "rename", "member": "INTRINSICS", "file": "src/core/constants.ts:117" },
      { "symbol": "declare", "action": "rename", "member": "INTRINSICS", "file": "src/core/constants.ts:119" },
      { "symbol": "parent", "action": "rename", "member": "INTRINSICS", "file": "src/core/constants.ts:121" }
    ],
    "prerequisite": [],
    "summary": "Rename the published INTRINSICS keys describe/reveal, define/declare, and prototype/parent while keeping the table flat; replacement words are not settled."
  },
  {
    "package": "contract",
    "id": "s03-23",
    "kind": "rename",
    "edits": [
      { "symbol": "createStringFaults", "action": "rename", "to": "buildStringFaults", "file": "src/core/helpers.ts:2259" },
      { "symbol": "createNumberFaults", "action": "rename", "to": "buildNumberFaults", "file": "src/core/helpers.ts:2328" },
      { "symbol": "createArrayFaults", "action": "rename", "to": "buildArrayFaults", "file": "src/core/helpers.ts:2397" }
    ],
    "guide": "guides/contract.md createStringFaults / createNumberFaults / createArrayFaults compiler rows",
    "prerequisite": [],
    "summary": "Rename createStringFaults, createNumberFaults, and createArrayFaults to the build* forms."
  },
  {
    "package": "msg",
    "id": "s13-02",
    "kind": "rename",
    "edits": [
      { "symbol": "kind", "action": "rename", "to": "category", "member": "MSGMutableFieldData", "file": "src/core/types.ts:83" },
      { "symbol": "kind", "action": "rename", "to": "category", "member": "MSGFieldData", "file": "src/core/types.ts:155" }
    ],
    "guide": "guides/msg.md MSGFieldData fence that constructs kind: 'msg'",
    "prerequisite": [],
    "summary": "Rename the kind discriminant to category on MSGFieldData and MSGMutableFieldData."
  },
  {
    "package": "msg",
    "id": "s13-03",
    "kind": "mixed",
    "edits": [
      { "symbol": "type", "action": "rename", "to": "category", "member": "MSGDirectoryEntry", "file": "src/core/types.ts:67" },
      { "symbol": "type", "action": "rename", "to": "category", "member": "MSGBurnerEntry", "file": "src/core/types.ts:110" },
      { "symbol": "MSG_PROP_TYPE_OFFSET", "action": "rename", "to": "MSG_PROP_CATEGORY_OFFSET", "file": "src/core/constants.ts:111" },
      { "symbol": "MSG_TYPE_UNALLOCATED", "action": "rename", "to": "MSG_CATEGORY_UNALLOCATED", "file": "src/core/constants.ts:141" },
      { "symbol": "MSG_TYPE_DIRECTORY", "action": "rename", "to": "MSG_CATEGORY_DIRECTORY", "file": "src/core/constants.ts:146" },
      { "symbol": "MSG_TYPE_DOCUMENT", "action": "rename", "to": "MSG_CATEGORY_DOCUMENT", "file": "src/core/constants.ts:151" },
      { "symbol": "MSG_TYPE_ROOT", "action": "rename", "to": "MSG_CATEGORY_ROOT", "file": "src/core/constants.ts:156" }
    ],
    "guide": "guides/msg.md MSG_TYPE_* constant rows and the MSGBurnerEntry fence that constructs type: 5",
    "prerequisite": [],
    "summary": "Rename MSGDirectoryEntry.type and MSGBurnerEntry.type to category, and rename the MSG_TYPE_* / MSG_PROP_TYPE_OFFSET family to MSG_CATEGORY_* / MSG_PROP_CATEGORY_OFFSET."
  },
  {
    "package": "test",
    "id": "s11-36",
    "kind": "rename",
    "edits": [
      { "symbol": "states", "action": "rename", "to": "placements", "member": "PortfolioInterface", "file": "src/browser/types.ts:81" }
    ],
    "guide": "guides/test.md PortfolioInterface surface row and portfolio fences",
    "prerequisite": [],
    "summary": "Rename PortfolioInterface.states to placements and leave PortfolioOptions.states as the declared registry."
  },
  {
    "package": "test",
    "id": "s11-37",
    "kind": "rename",
    "edits": [
      { "symbol": "rgba", "action": "rename", "to": "resolveColor", "file": "src/browser/helpers.ts:1092" },
      { "symbol": "contrast", "action": "rename", "to": "readContrast", "file": "src/browser/helpers.ts:1307" },
      { "symbol": "style", "action": "rename", "to": "readStyle", "file": "src/browser/helpers.ts:1593" },
      { "symbol": "token", "action": "rename", "to": "readToken", "file": "src/browser/helpers.ts:1621" },
      { "symbol": "rootToken", "action": "rename", "to": "readRootToken", "file": "src/browser/helpers.ts:1642" },
      { "symbol": "pixels", "action": "rename", "to": "readPixels", "file": "src/browser/helpers.ts:1669" }
    ],
    "guide": "guides/test.md Helpers surface rows for style, token, rootToken, pixels, contrast, and rgba, plus every fence that imports them",
    "prerequisite": [],
    "summary": "Rename the six bare-noun browser readers to readStyle, readToken, readRootToken, readPixels, readContrast, and resolveColor."
  },
  {
    "package": "test",
    "id": "s11-38",
    "kind": "rename",
    "edits": [
      { "symbol": "colorEqual", "action": "rename", "to": "matchesColor", "file": "src/browser/helpers.ts:1128" }
    ],
    "guide": "guides/test.md colorEqual Helpers row and fences",
    "prerequisite": [],
    "summary": "Rename the exported colorEqual predicate to matchesColor."
  },
  {
    "package": "csv",
    "id": "s16-03",
    "kind": "remove",
    "edits": [
      { "symbol": "renderTSV", "action": "remove", "file": "src/core/helpers.ts:458" }
    ],
    "guide": "guides/csv.md renderTSV Surface row, Rendering to TSV fence, and renderCSV-with-tab prose",
    "prerequisite": [],
    "summary": "Delete the exported renderTSV delegate; tab-separated output stays a renderCSV dialect."
  },
  {
    "package": "csv",
    "id": "s16-05",
    "kind": "mixed",
    "edits": [
      { "symbol": "comment", "action": "change", "member": "ParseOptions", "file": "src/core/types.ts:204" },
      { "symbol": "DEFAULT_PARSE_OPTIONS", "action": "change", "file": "src/core/constants.ts:13" },
      { "symbol": "resolveParseOptions", "action": "change", "file": "src/core/helpers.ts:86" },
      { "symbol": "scanComment", "action": "change", "file": "src/core/helpers.ts:539" },
      { "symbol": "scanUnquoted", "action": "change", "file": "src/core/helpers.ts:575" },
      { "symbol": "scanQuoted", "action": "change", "file": "src/core/helpers.ts:620" },
      { "symbol": "scanField", "action": "change", "file": "src/core/helpers.ts:699" },
      { "symbol": "scanRecord", "action": "change", "file": "src/core/helpers.ts:725" }
    ],
    "prerequisite": [],
    "summary": "Drop the false union member from ParseOptions.comment, drop comment from DEFAULT_PARSE_OPTIONS, and replace Required<ParseOptions> with a ResolvedParseOptions alias on resolveParseOptions and every scan* leaf."
  },
  {
    "package": "html",
    "id": "s08-01",
    "kind": "rename",
    "edits": [
      { "symbol": "HTMLHandlers", "action": "rename", "to": "HTMLHandlerMap", "file": "src/core/types.ts:258" }
    ],
    "guide": "guides/html.md Types row for HTMLHandlers",
    "prerequisite": [],
    "summary": "Rename the exported HTMLHandlers type to HTMLHandlerMap."
  },
  {
    "package": "html",
    "id": "s08-04",
    "kind": "remove",
    "edits": [
      { "symbol": "createAttributeContract", "action": "remove", "file": "src/core/factories.ts:57" },
      { "symbol": "createTextContract", "action": "remove", "file": "src/core/factories.ts:76" },
      { "symbol": "createCommentContract", "action": "remove", "file": "src/core/factories.ts:95" },
      { "symbol": "createDoctypeContract", "action": "remove", "file": "src/core/factories.ts:114" }
    ],
    "guide": "guides/html.md Factories rows for the four create*Contract doors and the createAttributeContract fence",
    "prerequisite": [],
    "summary": "Delete createAttributeContract, createTextContract, createCommentContract, and createDoctypeContract; consumers call createContract on the package shapes."
  },
  {
    "package": "html",
    "id": "s08-09",
    "kind": "rename",
    "edits": [
      { "symbol": "SanitizeOptions", "action": "rename", "to": "HTMLSanitizeOptions", "file": "src/core/types.ts:318" },
      { "symbol": "DistillOptions", "action": "rename", "to": "HTMLDistillOptions", "file": "src/core/types.ts:349" }
    ],
    "guide": "guides/html.md Types rows for SanitizeOptions and DistillOptions",
    "prerequisite": [],
    "summary": "Rename SanitizeOptions and DistillOptions to HTMLSanitizeOptions and HTMLDistillOptions."
  },
  {
    "package": "indexeddb",
    "id": "s16-10",
    "kind": "mixed",
    "edits": [
      { "symbol": "query", "action": "change", "member": "CursorOptions", "file": "src/browser/types.ts:210" },
      { "symbol": "records", "action": "change", "member": "IndexedDBIndexInterface", "file": "src/browser/types.ts:263" },
      { "symbol": "keys", "action": "change", "member": "IndexedDBIndexInterface", "file": "src/browser/types.ts:264" },
      { "symbol": "count", "action": "change", "member": "IndexedDBIndexInterface", "file": "src/browser/types.ts:268" },
      { "symbol": "path", "action": "change", "member": "IndexedDBStoreInterface", "file": "src/browser/types.ts:290" },
      { "symbol": "records", "action": "change", "member": "IndexedDBStoreInterface", "file": "src/browser/types.ts:297" },
      { "symbol": "keys", "action": "change", "member": "IndexedDBStoreInterface", "file": "src/browser/types.ts:298" },
      { "symbol": "count", "action": "change", "member": "IndexedDBStoreInterface", "file": "src/browser/types.ts:301" },
      { "symbol": "records", "action": "change", "member": "IndexedDBTransactionStoreInterface", "file": "src/browser/types.ts:330" },
      { "symbol": "keys", "action": "change", "member": "IndexedDBTransactionStoreInterface", "file": "src/browser/types.ts:331" },
      { "symbol": "count", "action": "change", "member": "IndexedDBTransactionStoreInterface", "file": "src/browser/types.ts:334" },
      { "symbol": "path", "action": "change", "member": "IndexedDBStore", "file": "src/browser/IndexedDBStore.ts:48" },
      { "symbol": "readRecords", "action": "change", "file": "src/browser/helpers.ts:130" }
    ],
    "prerequisite": [],
    "summary": "Drop | null from every published query parameter (CursorOptions.query, records/keys/count, readRecords) and retype IndexedDBStoreInterface.path / IndexedDBStore.path from KeyPath | null to KeyPath | undefined, returning the omitted definition path instead of null."
  },
  {
    "package": "indexeddb",
    "id": "s16-12",
    "kind": "remove",
    "edits": [
      { "symbol": "rangeExactKey", "action": "remove", "file": "src/browser/helpers.ts:187" },
      { "symbol": "rangeBetweenKeys", "action": "remove", "file": "src/browser/helpers.ts:240" }
    ],
    "guide": "guides/indexeddb.md rangeExactKey and rangeBetweenKeys helper rows, the IDBKeyRange fences, and the batching note that names rangeExactKey",
    "prerequisite": [],
    "summary": "Delete the exported rangeExactKey and rangeBetweenKeys wrappers; callers use IDBKeyRange.only and IDBKeyRange.bound."
  },
  {
    "package": "indexeddb",
    "id": "s16-15",
    "kind": "mixed",
    "edits": [
      { "symbol": "value", "action": "change", "member": "IndexedDBCursorInterface", "file": "src/browser/types.ts:232" },
      { "symbol": "value", "action": "change", "member": "IndexedDBCursor", "file": "src/browser/IndexedDBCursor.ts:50" }
    ],
    "guide": "guides/indexeddb.md contract item that a cursor value cannot be undefined and masks a non-record to {}",
    "prerequisite": [],
    "summary": "Widen IndexedDBCursorInterface.value to Row | undefined and store undefined for a non-record cursor value instead of masking to {}."
  },
  {
    "package": "indexeddb",
    "id": "s16-17",
    "kind": "mixed",
    "edits": [
      { "symbol": "stores", "action": "change", "member": "IndexedDBUpgradeContext", "file": "src/browser/types.ts:128" },
      { "symbol": "create", "action": "remove", "member": "IndexedDBUpgradeContext", "file": "src/browser/types.ts:129" },
      { "symbol": "drop", "action": "remove", "member": "IndexedDBUpgradeContext", "file": "src/browser/types.ts:130" },
      { "symbol": "store", "action": "remove", "member": "IndexedDBUpgradeContext", "file": "src/browser/types.ts:131" },
      { "symbol": "index", "action": "remove", "member": "IndexedDBUpgradeContext", "file": "src/browser/types.ts:150" },
      { "symbol": "deindex", "action": "remove", "member": "IndexedDBUpgradeContext", "file": "src/browser/types.ts:165" }
    ],
    "guide": "guides/indexeddb.md IndexedDBUpgradeContext Surface row, Methods rows for create/drop/store/index/deindex, auto-commit paragraph naming those members, and the context.create('meta', …) fence",
    "prerequisite": [],
    "summary": "Remove IndexedDBUpgradeContext.create, drop, store, index, and deindex and extract stores.create/stores.drop plus indexes.create/indexes.drop, after resolving the collision with the existing stores name list."
  },
  {
    "package": "sqlite",
    "id": "s18-10",
    "kind": "option-key",
    "edits": [
      { "symbol": "foreignKeys", "action": "rename", "member": "SQLiteDatabaseOptions", "file": "src/server/types.ts:85" }
    ],
    "guide": "guides/sqlite.md production-options prose, SQLiteDatabaseOptions Surface row, foreignKeys example, and the FK-enforcement test bullet",
    "prerequisite": [],
    "summary": "Rename the published SQLiteDatabaseOptions.foreignKeys option key; the replacement word is not settled."
  },
  {
    "package": "sqlite",
    "id": "s18-11",
    "kind": "rename",
    "edits": [
      { "symbol": "exec", "action": "rename", "to": "execute", "member": "SQLiteDatabaseInterface", "file": "src/server/types.ts:138" },
      { "symbol": "exec", "action": "rename", "to": "execute", "member": "SQLiteDatabase", "file": "src/server/SQLiteDatabase.ts:79" }
    ],
    "guide": "guides/sqlite.md SQLiteDatabase Surface row, exec Methods row, and exec fences",
    "prerequisite": [],
    "summary": "Rename SQLiteDatabaseInterface.exec(sql) / SQLiteDatabase.exec(sql) to execute(sql)."
  },
  {
    "package": "sqlite",
    "id": "s18-12",
    "kind": "rename",
    "edits": [
      { "symbol": "transaction", "action": "rename", "member": "SQLiteDatabaseInterface", "file": "src/server/types.ts:140" },
      { "symbol": "transaction", "action": "rename", "member": "SQLiteDatabase", "file": "src/server/SQLiteDatabase.ts:100" }
    ],
    "guide": "guides/sqlite.md SQLiteDatabase Surface row, transaction Methods row, transacting contract items, and transaction(scope) fences",
    "prerequisite": [],
    "summary": "Rename SQLiteDatabaseInterface.transaction / SQLiteDatabase.transaction; whether the replacement is transact, a fleet-wide rename from database, or keeping transaction as the shared domain term is not settled."
  }
]
```

**Unknowns**

- **contract s03-22** — replacement key names. Finding: nest as `INTRINSICS.object.describe` / `INTRINSICS.reflect.describe` (and the same for define and prototype). Both lane amendments: keep the table flat and rename each leaf for distinguishing behaviour; they give no replacement words for `describe`/`reveal`, `define`/`declare`, or `prototype`/`parent`.
- **indexeddb s16-17** — collision with existing `stores: readonly string[]`. Alternatives: move the name list to `stores.names` beside `stores.create`/`stores.drop`, or give the manager a distinct entity noun and leave `stores` as the list.
- **sqlite s18-10** — replacement option key. DRIFT-RESHAPE/high: `foreign`. DRIFT/medium: `references`. Both reject the finding’s `constraints`.
- **sqlite s18-12** — target name. Finding: `transact`. DRIFT-RESHAPE/high: either rename fleet-wide starting at `@orkestrel/database`, or keep `transaction(scope)` as the shared database-domain term.

**Deviation**

None. Read-only; no edits. Scaffold `src/` was not the home of these packages; symbols were verified under `/home/user/fleet/<package>/src/**` as the brief names.
