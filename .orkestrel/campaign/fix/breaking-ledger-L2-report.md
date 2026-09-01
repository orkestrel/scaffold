## Question

For every L2 breaking work-order row, name the exact published symbols the remaining repair moves, verified against current package source, so a script can compute each row’s consumer blast radius.

## Evidence

Work-order rows: `.orkestrel/campaign/fix/work-order.md` under `## L2`. Dossier sections `## <id>` in `.orkestrel/campaign/fix/<package>.md`. Writer notes: `.orkestrel/campaign/fix/reports/<package>.md`. Referral repairs: `.orkestrel/campaign/fix/referrals-middleware-report.md` (`s11 Q2`, `s11b Q1a`). Dossier line numbers are often stale; pointers below are the current `/home/user/fleet/<package>/src/` declarations.

**console.** `withCapture` `src/core/helpers.ts:729` (impl `:777`, `new Capture` `:781`, class import `:34`). Pass-through factories `src/core/factories.ts`: `createANSIRenderer:49`, `createLogger:202`, `createLoggerManager:231`, `createReporter:268`, `createCapture:304`, `createSpinner:335`, `createProgress:366`. Classes remain barrelled `src/core/index.ts:5-12`. `DEFAULT_CAPTURE_LEVELS` alias `src/core/constants.ts:407` of `CAPTURE_LEVELS:394`; server alias `src/server/constants.ts:19` of `STREAM_LEVELS:12`. `DEFAULT_CAPTURE_LIMIT` core `:416` and server `:27`. `LEVELS` `src/core/constants.ts:239`. `columnsOf` `src/server/helpers.ts:23`. `SpinnerInterface.success/failure` `src/core/types.ts:1077-1079`, class `src/core/Spinner.ts:114,118`. `ProgressInterface.failure:1216`, `complete:1214`, `completed:1206`; `ProgressEventMap.complete:1145`; class `failure` `src/core/Progress.ts:112`. Guide: `guides/console.md` `withCapture` row, factory rows, `DEFAULT_CAPTURE_*` / `LEVELS` / `columnsOf` rows, spinner/progress fences.

**database.** `matchesFuzzy` `src/core/helpers.ts:235`. `driverFindings` `src/core/helpers.ts:1192`. `INDEXABLE_STORAGE` `src/browser/constants.ts:13` (`ReadonlySet`; `.has` `src/browser/helpers.ts:173`). `compileWhere:347`, `compileOrder:388`, `compilePage:415` in `src/server/compilers.ts`. Guide: `guides/database.md` `matchesFuzzy`, `driverFindings`, `INDEXABLE_STORAGE`, `compileWhere`/`compileOrder`/`compilePage` rows.

**markdown.** `isWhitespace` moved under s10-03; now `src/core/helpers.ts:334` (not `validators.ts`). Sibling `isFenceWhitespace:428` stays. Guide: `guides/markdown.md` `isWhitespace` Surface row.

**middleware referrals.** `SessionStoreInterface.set` `src/core/types.ts:371` (`SessionStoreInterface<S>:369` unconstrained). `MemorySessionStore.set` `src/core/stores/MemorySessionStore.ts:90` (class `:36`; example `:33` stores a non-session payload). `DatabaseSessionStore.set` `src/core/stores/DatabaseSessionStore.ts:72`. `createMemorySessionStore` `src/core/factories.ts:107`. `SessionOptions<S, TState>` `src/core/types.ts:486` unconstrained. Fence `guides/middleware.md` store `set(id, session, now)`. `AssetOptions` `src/server/types.ts:46` has only `source`; finiteness TSDoc already on `:39-44` and `AssetSourceInterface:20-23`; guide Assets block `guides/middleware.md:724`. No `capacity` member. Caches `identities`/`brotlis`/`tags` `src/server/middlewares.ts:88-90`.

**middleware.** `restoreSession` `src/core/helpers.ts:585` (`import { Session }` `:16`). `resolveDefaultDirectory` `src/server/helpers.ts:426`; `parseMultipartRequest:507` (`import { MultipartParser }` `:28`; `parse*` can keep its name in `parsers.ts`). `MultipartError.reason` `src/server/errors.ts:27`; `MultipartReason` `src/server/types.ts:131`; `MULTIPART_REASON_STATUS` `src/server/constants.ts:5`. `SessionInterface.data` `src/core/types.ts:309` (`Map`); class `src/core/Session.ts:20`. `SessionTransport` `src/core/types.ts:451`. `SessionCursors.lastSeen/createdAt:400-401` (inherited by `SessionRow:409` and `SessionEntry:420`). `ClientInfo:289`. `MultipartLimits` `src/server/types.ts:100-105`; `resolveMultipartLimits` `src/server/helpers.ts:401`. `UploadedFileInterface` `src/server/types.ts:163`; `PartHeaders.contentType:179`; `parsePartHeaders:445`. `MultipartFile.mime` `src/core/types.ts:593` (reshape target). `only` `src/core/middlewares.ts:881`; `except:906`. `SessionOptions.require:495`, `ends:496`; DELETE short-circuit `:735` (work-order `:743` is stale). `StaticOptions.fallback:82` (`boolean | { exclude? }`); guide `fallback: true` fence. `DatabaseSessionStore` constructor `src/core/stores/DatabaseSessionStore.ts:52` assigns `ttl`/`lifetime` with no `TypeError`; `MemorySessionStore` constructor throws `src/core/stores/MemorySessionStore.ts:44-56`; `createDatabaseSessionStore` `src/core/factories.ts:134` has no `@throws {TypeError}`.

**process.** `ProcessChild` `src/server/types.ts:27` (call signatures `kill`/`once`/`off`). Guide: `guides/process.md` Server contracts table.

**reason.** `isSubject` `src/core/validators.ts:259` (`= isRecord`). Bare-noun constructors `src/core/helpers.ts`: `check:85`, `atom:104`, `compound:123`, `rule:147`, `transform:178`, `bounds:201`, `variable:223`, `constant:240`, `operation:265`, `equation:296`, `fact:329`, `inference:358`, `staticSource:382`, `fieldSource:399`, `lookupSource:417`, `rangeSource:440`, `staticFactor:466`, `fieldFactor:489`, `lookupFactor:513`, `rangeFactor:538`, `factorGroup:567`, `quantitativeDefinition:598`, `logicalDefinition:629`, `symbolicDefinition:660`, `inferentialDefinition:692`. `set collection` on `GroupManagerInterface:905`, `RuleManagerInterface:1006`, `EquationManagerInterface:1053`, `FactManagerInterface:1096`, `InferenceManagerInterface:1143`, `VariableManagerInterface:1187`; class setters `GroupManager.ts:39`, `RuleManager.ts:38`, `EquationManager.ts:38`, `FactManager.ts:38`, `InferenceManager.ts:38`, `VariableManager.ts:39`. `FactorManager` has no `collection` setter.

**table.** Barrel `src/core/index.ts:10-15`. Classes: `RowManager.ts:15`, `SortManager.ts:7`, `FilterManager.ts:7`, `SelectionManager.ts:6`, `ExpansionManager.ts:6`, `PaginationManager.ts:5`. Guide Surface class rows `guides/table.md` (interfaces stay).

**template.** `TemplateManagerInterface.size` `src/core/types.ts:229`; getter `src/core/TemplateManager.ts:72`. `template(id): TemplateInterface` types `:234`, impl `:114` (throws via `#throwNotFound`). `remove(): void` types `:240`, impl `:174`. Guide: `TemplateManagerInterface` Surface row and Methods preamble.

**websocket.** `WebSocketCloseCode` `src/server/types.ts:31`, `WebSocketMessage:75`, `WebSocketClose:86`; `{@link WebSocketClose}` in `NodeWebSocketEventMap` TSDoc `:99`. `isWebSocketFrameCanonical` `src/server/helpers.ts:192`; call `src/server/NodeWebSocket.ts:14,233`. `RangeError` sites: `NodeWebSocket` constructor `:89,93,96,99,102`, `ping:181`, `close:196,201`; `encodeWebSocketFrame` `src/server/helpers.ts:287,290,293`. Interface `ping`/`close` `src/server/types.ts:171-172`. No `src/server/errors.ts`. Guide: Surface rows for the three types and `isWebSocketFrameCanonical`; Methods `ping`/`close` name `RangeError`.

Documentation-only half already applied: `s11b-Q1a` finiteness remarks. `s05-21` TSDoc half is `s05-20` (applied); remaining is the `Set` → frozen array type.

## Distillate

```json
[
  {
    "package": "console",
    "id": "s09-07",
    "kind": "mixed",
    "edits": [
      { "symbol": "withCapture", "action": "rename", "file": "src/core/helpers.ts:729" }
    ],
    "guide": "guides/console.md withCapture Surface row, CaptureResult row, and withCapture fences",
    "prerequisite": [],
    "summary": "Move withCapture out of the class-free leaf: either rename it to createCaptureResult in factories.ts, or keep the name and change its published parameters to take a CaptureInterface."
  },
  {
    "package": "console",
    "id": "s09-09",
    "kind": "remove",
    "edits": [
      { "symbol": "createANSIRenderer", "action": "remove", "file": "src/core/factories.ts:49" },
      { "symbol": "createLogger", "action": "remove", "file": "src/core/factories.ts:202" },
      { "symbol": "createLoggerManager", "action": "remove", "file": "src/core/factories.ts:231" },
      { "symbol": "createReporter", "action": "remove", "file": "src/core/factories.ts:268" },
      { "symbol": "createCapture", "action": "remove", "file": "src/core/factories.ts:304" },
      { "symbol": "createSpinner", "action": "remove", "file": "src/core/factories.ts:335" },
      { "symbol": "createProgress", "action": "remove", "file": "src/core/factories.ts:366" }
    ],
    "guide": "guides/console.md factory Surface rows and fences for createANSIRenderer, createLogger, createLoggerManager, createReporter, createCapture, createSpinner, and createProgress; keep createStyler, createTheme, and createConsoleSink",
    "prerequisite": [],
    "summary": "Delete the seven pass-through factories and their guide rows; keep the seven classes barrelled."
  },
  {
    "package": "console",
    "id": "s09-10",
    "kind": "remove",
    "edits": [
      { "symbol": "DEFAULT_CAPTURE_LEVELS", "action": "remove", "file": "src/core/constants.ts:407" },
      { "symbol": "DEFAULT_CAPTURE_LEVELS", "action": "remove", "file": "src/server/constants.ts:19" }
    ],
    "guide": "guides/console.md DEFAULT_CAPTURE_LEVELS Constants rows in core and server",
    "prerequisite": [],
    "summary": "Delete the DEFAULT_CAPTURE_LEVELS aliases; callers read CAPTURE_LEVELS in core and STREAM_LEVELS on the server."
  },
  {
    "package": "console",
    "id": "s09-11",
    "kind": "rename",
    "edits": [
      { "symbol": "DEFAULT_CAPTURE_LEVELS", "action": "rename", "to": "DEFAULT_STREAM_LEVELS", "file": "src/server/constants.ts:19" },
      { "symbol": "DEFAULT_CAPTURE_LIMIT", "action": "rename", "to": "DEFAULT_STREAM_LIMIT", "file": "src/server/constants.ts:27" }
    ],
    "guide": "guides/console.md server DEFAULT_CAPTURE_LEVELS and DEFAULT_CAPTURE_LIMIT Constants rows",
    "prerequisite": ["s09-10"],
    "summary": "Rename the server DEFAULT_CAPTURE_LEVELS and DEFAULT_CAPTURE_LIMIT pair to DEFAULT_STREAM_LEVELS and DEFAULT_STREAM_LIMIT so they no longer collide with the core names."
  },
  {
    "package": "console",
    "id": "s09-12",
    "kind": "rename",
    "edits": [
      { "symbol": "LEVELS", "action": "rename", "to": "LOG_LEVELS", "file": "src/core/constants.ts:239" }
    ],
    "guide": "guides/console.md LEVELS Constants row",
    "prerequisite": [],
    "summary": "Rename the unqualified LEVELS constant to LOG_LEVELS beside STATUS_LEVELS, CAPTURE_LEVELS, and STREAM_LEVELS."
  },
  {
    "package": "console",
    "id": "s09-14",
    "kind": "rename",
    "edits": [
      { "symbol": "columnsOf", "action": "rename", "to": "inferColumns", "file": "src/server/helpers.ts:23" }
    ],
    "guide": "guides/console.md columnsOf Surface row, runnable fence, and test inventory",
    "prerequisite": [],
    "summary": "Rename columnsOf to inferColumns."
  },
  {
    "package": "console",
    "id": "s09-21",
    "kind": "rename",
    "edits": [
      { "symbol": "success", "action": "rename", "member": "SpinnerInterface", "file": "src/core/types.ts:1077" },
      { "symbol": "failure", "action": "rename", "to": "fail", "member": "SpinnerInterface", "file": "src/core/types.ts:1079" },
      { "symbol": "success", "action": "rename", "member": "Spinner", "file": "src/core/Spinner.ts:114" },
      { "symbol": "failure", "action": "rename", "to": "fail", "member": "Spinner", "file": "src/core/Spinner.ts:118" },
      { "symbol": "failure", "action": "rename", "to": "fail", "member": "ProgressInterface", "file": "src/core/types.ts:1216" },
      { "symbol": "failure", "action": "rename", "to": "fail", "member": "Progress", "file": "src/core/Progress.ts:112" }
    ],
    "guide": "guides/console.md SpinnerInterface and ProgressInterface Methods rows and spinner/progress fences",
    "prerequisite": [],
    "summary": "Rename SpinnerInterface.success/failure and ProgressInterface.failure (and the class methods) so the unsuccessful terminal is fail; the successful-terminal verb is not settled."
  },
  {
    "package": "database",
    "id": "s05-06",
    "kind": "remove",
    "edits": [
      { "symbol": "matchesFuzzy", "action": "remove", "file": "src/core/helpers.ts:235" }
    ],
    "guide": "guides/database.md matchesFuzzy Surface row, fence, and tests inventory",
    "prerequisite": [],
    "summary": "Delete matchesFuzzy with its guide rows and test block; do not add a fuzzy member to ConditionOperator."
  },
  {
    "package": "database",
    "id": "s05-12",
    "kind": "rename",
    "edits": [
      { "symbol": "driverFindings", "action": "rename", "to": "scanDriver", "file": "src/core/helpers.ts:1192" }
    ],
    "guide": "guides/database.md driverFindings Surface row, ConformanceFinding row, and driverFindings fence",
    "prerequisite": [],
    "summary": "Rename driverFindings to scanDriver and update conformDriver, auditDriver, guide rows, and tests."
  },
  {
    "package": "database",
    "id": "s05-21",
    "kind": "type",
    "edits": [
      { "symbol": "INDEXABLE_STORAGE", "action": "change", "file": "src/browser/constants.ts:13" }
    ],
    "guide": "guides/database.md INDEXABLE_STORAGE Constants row",
    "prerequisite": [],
    "summary": "Retype INDEXABLE_STORAGE from ReadonlySet<ColumnStorage> to a frozen readonly ColumnStorage[] and replace INDEXABLE_STORAGE.has with .some."
  },
  {
    "package": "database",
    "id": "s05-23",
    "kind": "rename",
    "edits": [
      { "symbol": "compileWhere", "action": "rename", "to": "compileWhereSQL", "file": "src/server/compilers.ts:347" },
      { "symbol": "compileOrder", "action": "rename", "to": "compileOrderSQL", "file": "src/server/compilers.ts:388" },
      { "symbol": "compilePage", "action": "rename", "to": "compilePageSQL", "file": "src/server/compilers.ts:415" }
    ],
    "guide": "guides/database.md compileWhere, compileOrder, and compilePage export-table rows",
    "prerequisite": [],
    "summary": "Rename compileWhere, compileOrder, and compilePage to compileWhereSQL, compileOrderSQL, and compilePageSQL; leave schemaToTable, schemaToIndexes, and stepToSQL."
  },
  {
    "package": "markdown",
    "id": "s10-08",
    "kind": "rename",
    "edits": [
      { "symbol": "isWhitespace", "action": "rename", "to": "isFlankingWhitespace", "file": "src/core/helpers.ts:334" }
    ],
    "guide": "guides/markdown.md isWhitespace Surface row",
    "prerequisite": [],
    "summary": "Rename isWhitespace to isFlankingWhitespace and leave isFenceWhitespace as it stands."
  },
  {
    "package": "middleware",
    "id": "s11-Q2",
    "kind": "signature",
    "edits": [
      { "symbol": "set", "action": "change", "member": "SessionStoreInterface", "file": "src/core/types.ts:371" },
      { "symbol": "SessionStoreInterface", "action": "change", "file": "src/core/types.ts:369" },
      { "symbol": "SessionOptions", "action": "change", "file": "src/core/types.ts:486" },
      { "symbol": "set", "action": "change", "member": "MemorySessionStore", "file": "src/core/stores/MemorySessionStore.ts:90" },
      { "symbol": "MemorySessionStore", "action": "change", "file": "src/core/stores/MemorySessionStore.ts:36" },
      { "symbol": "set", "action": "change", "member": "DatabaseSessionStore", "file": "src/core/stores/DatabaseSessionStore.ts:72" },
      { "symbol": "createMemorySessionStore", "action": "change", "file": "src/core/factories.ts:107" }
    ],
    "guide": "guides/middleware.md SessionStoreInterface Methods, createMemorySessionStore factory row, and store set(id, session, now) fences",
    "prerequisite": [],
    "summary": "Change set to set(session, now), constrain S extends SessionInterface on SessionStoreInterface, SessionOptions, MemorySessionStore, DatabaseSessionStore, and createMemorySessionStore, and derive id from session.id, which removes MemorySessionStore as a general expiring LRU over non-session payloads."
  },
  {
    "package": "middleware",
    "id": "s11b-Q1a",
    "kind": "option-key",
    "edits": [
      { "symbol": "AssetOptions", "action": "change", "file": "src/server/types.ts:46" }
    ],
    "guide": "guides/middleware.md Assets section (finiteness requirement already stated)",
    "prerequisite": [],
    "summary": "Add a capacity member to AssetOptions with LRU eviction across identities, brotlis, and tags; the documentation-only finiteness requirement is already applied."
  },
  {
    "package": "middleware",
    "id": "s11-01",
    "kind": "mixed",
    "edits": [
      { "symbol": "restoreSession", "action": "rename", "to": "createRestoredSession", "file": "src/core/helpers.ts:585" },
      { "symbol": "resolveDefaultDirectory", "action": "remove", "file": "src/server/helpers.ts:426" }
    ],
    "guide": "guides/middleware.md restoreSession and resolveDefaultDirectory Surface rows",
    "prerequisite": [],
    "summary": "Remove the Session and MultipartParser class imports from the leaf pair; restoreSession cannot leave helpers.ts under its current name, and resolveDefaultDirectory has no legal home outside the leaf except deletion (parseMultipartRequest can keep the parse* name in parsers.ts)."
  },
  {
    "package": "middleware",
    "id": "s11-02",
    "kind": "rename",
    "edits": [
      { "symbol": "restoreSession", "action": "rename", "to": "createRestoredSession", "file": "src/core/helpers.ts:585" }
    ],
    "guide": "guides/middleware.md restoreSession Surface row and fences",
    "prerequisite": [],
    "summary": "Move restoreSession to factories.ts as createRestoredSession(value): Session | undefined."
  },
  {
    "package": "middleware",
    "id": "s11-04",
    "kind": "remove",
    "edits": [
      { "symbol": "resolveDefaultDirectory", "action": "remove", "file": "src/server/helpers.ts:426" }
    ],
    "guide": "guides/middleware.md resolveDefaultDirectory Surface row",
    "prerequisite": [],
    "summary": "Delete resolveDefaultDirectory; parseMultipartRequest should call MultipartParser.directory() after that function leaves the leaf."
  },
  {
    "package": "middleware",
    "id": "s11-06",
    "kind": "mixed",
    "edits": [
      { "symbol": "reason", "action": "rename", "to": "code", "member": "MultipartError", "file": "src/server/errors.ts:27" },
      { "symbol": "MultipartReason", "action": "rename", "file": "src/server/types.ts:131" },
      { "symbol": "MULTIPART_REASON_STATUS", "action": "rename", "file": "src/server/constants.ts:5" }
    ],
    "guide": "guides/middleware.md MultipartReason Types row, MULTIPART_REASON_STATUS Constants row, and MultipartError Methods/error rows",
    "prerequisite": [],
    "summary": "Rename MultipartError.reason to code and rename MultipartReason and MULTIPART_REASON_STATUS with it; the replacement type/constant names are not settled."
  },
  {
    "package": "middleware",
    "id": "s11-12",
    "kind": "mixed",
    "edits": [
      { "symbol": "data", "action": "change", "member": "SessionInterface", "file": "src/core/types.ts:309" },
      { "symbol": "data", "action": "change", "member": "Session", "file": "src/core/Session.ts:20" }
    ],
    "guide": "guides/middleware.md SessionInterface data remarks and session fences that write session.data directly",
    "prerequisite": [],
    "summary": "Retype SessionInterface.data to ReadonlyMap and add required one-word set/delete/clear mutators on the interface (and Session), routing transferSessionData and restoreSession through them."
  },
  {
    "package": "middleware",
    "id": "s11-14",
    "kind": "rename",
    "edits": [
      { "symbol": "SessionTransport", "action": "rename", "to": "SessionTransportInterface", "file": "src/core/types.ts:451" }
    ],
    "guide": "guides/middleware.md SessionTransport Types row, Methods group key, createCookieTransport/createHeaderTransport rows, and fences",
    "prerequisite": [],
    "summary": "Rename SessionTransport to SessionTransportInterface."
  },
  {
    "package": "middleware",
    "id": "s11-15",
    "kind": "mixed",
    "edits": [
      { "symbol": "lastSeen", "action": "rename", "to": "seen", "member": "SessionCursors", "file": "src/core/types.ts:400" },
      { "symbol": "createdAt", "action": "rename", "to": "created", "member": "SessionCursors", "file": "src/core/types.ts:401" },
      { "symbol": "ClientInfo", "action": "rename", "to": "Client", "file": "src/core/types.ts:289" },
      { "symbol": "data", "action": "rename", "member": "SessionInterface", "file": "src/core/types.ts:309" }
    ],
    "guide": "guides/middleware.md ClientInfo, SessionInterface.data, SessionRow/SessionCursors rows, and session snapshot fences",
    "prerequisite": [],
    "summary": "Rename SessionCursors.lastSeen/createdAt (inherited by SessionRow and SessionEntry) to seen/created, rename ClientInfo to Client, and rename SessionInterface.data; the replacement noun for data is not settled."
  },
  {
    "package": "middleware",
    "id": "s11-17",
    "kind": "mixed",
    "edits": [
      { "symbol": "file", "action": "change", "member": "MultipartLimits", "file": "src/server/types.ts:101" },
      { "symbol": "files", "action": "remove", "member": "MultipartLimits", "file": "src/server/types.ts:102" },
      { "symbol": "field", "action": "change", "member": "MultipartLimits", "file": "src/server/types.ts:103" },
      { "symbol": "fields", "action": "remove", "member": "MultipartLimits", "file": "src/server/types.ts:104" },
      { "symbol": "resolveMultipartLimits", "action": "change", "file": "src/server/helpers.ts:401" }
    ],
    "guide": "guides/middleware.md MultipartLimits Types row and createMultipart limits remarks",
    "prerequisite": [],
    "summary": "Regroup MultipartLimits to { file: { size, count }, field: { size, count }, total } and change resolveMultipartLimits's published return type to match."
  },
  {
    "package": "middleware",
    "id": "s11-18",
    "kind": "mixed",
    "edits": [
      { "symbol": "UploadedFileInterface", "action": "rename", "to": "UploadedFile", "file": "src/server/types.ts:163" },
      { "symbol": "contentType", "action": "rename", "member": "PartHeaders", "file": "src/server/types.ts:179" }
    ],
    "guide": "guides/middleware.md UploadedFileInterface Types row and parsePartHeaders/createUploadedFile rows",
    "prerequisite": [],
    "summary": "Rename UploadedFileInterface to UploadedFile and rename PartHeaders.contentType (and parsePartHeaders's return shape); the replacement for contentType is not settled."
  },
  {
    "package": "middleware",
    "id": "s11-23",
    "kind": "rename",
    "edits": [
      { "symbol": "only", "action": "rename", "to": "createOnly", "file": "src/core/middlewares.ts:881" },
      { "symbol": "except", "action": "rename", "to": "createExcept", "file": "src/core/middlewares.ts:906" }
    ],
    "guide": "guides/middleware.md only and except Surface rows, contract item on only/except, and fences",
    "prerequisite": [],
    "summary": "Rename only and except to createOnly and createExcept; reject createScoped."
  },
  {
    "package": "middleware",
    "id": "s11-24",
    "kind": "mixed",
    "edits": [
      { "symbol": "require", "action": "rename", "to": "required", "member": "SessionOptions", "file": "src/core/types.ts:495" },
      { "symbol": "ends", "action": "remove", "member": "SessionOptions", "file": "src/core/types.ts:496" }
    ],
    "guide": "guides/middleware.md SessionOptions Types row (require/ends) and session DELETE contract/fences",
    "prerequisite": [],
    "summary": "Rename SessionOptions.require to required and delete ends together with the unscoped DELETE short-circuit in createSession."
  },
  {
    "package": "middleware",
    "id": "s11-25",
    "kind": "union-member",
    "edits": [
      { "symbol": "fallback", "action": "change", "member": "StaticOptions", "file": "src/server/types.ts:82" }
    ],
    "guide": "guides/middleware.md StaticOptions Types row and Static SPA-fallback fence that uses fallback: true",
    "prerequisite": [],
    "summary": "Drop the boolean arm of StaticOptions.fallback so the key is only { exclude? }, with absence meaning off and {} meaning on."
  },
  {
    "package": "middleware",
    "id": "s11-27",
    "kind": "behavior",
    "edits": [
      { "symbol": "DatabaseSessionStore", "action": "change", "file": "src/core/stores/DatabaseSessionStore.ts:52" },
      { "symbol": "createDatabaseSessionStore", "action": "change", "file": "src/core/factories.ts:134" }
    ],
    "guide": "guides/middleware.md createDatabaseSessionStore factory row (no @throws today) versus createMemorySessionStore",
    "prerequisite": [],
    "summary": "Make DatabaseSessionStore throw TypeError on a malformed ttl/lifetime the way MemorySessionStore already does, via one shared validator called from both constructors."
  },
  {
    "package": "process",
    "id": "s13-15",
    "kind": "rename",
    "edits": [
      { "symbol": "ProcessChild", "action": "rename", "to": "ProcessChildInterface", "file": "src/server/types.ts:27" }
    ],
    "guide": "guides/process.md ProcessChild Server contracts table and REFUSALS/parity mentions",
    "prerequisite": [],
    "summary": "Rename ProcessChild to ProcessChildInterface."
  },
  {
    "package": "reason",
    "id": "s07-04",
    "kind": "remove",
    "edits": [
      { "symbol": "isSubject", "action": "remove", "file": "src/core/validators.ts:259" }
    ],
    "guide": "guides/reason.md isSubject Surface row and Practices mention",
    "prerequisite": [],
    "summary": "Delete isSubject; consumers import isRecord from @orkestrel/contract."
  },
  {
    "package": "reason",
    "id": "s07-06",
    "kind": "rename",
    "edits": [
      { "symbol": "check", "action": "rename", "to": "createCheck", "file": "src/core/helpers.ts:85" },
      { "symbol": "atom", "action": "rename", "to": "createAtom", "file": "src/core/helpers.ts:104" },
      { "symbol": "compound", "action": "rename", "to": "createCompound", "file": "src/core/helpers.ts:123" },
      { "symbol": "rule", "action": "rename", "to": "createRule", "file": "src/core/helpers.ts:147" },
      { "symbol": "transform", "action": "rename", "to": "createTransform", "file": "src/core/helpers.ts:178" },
      { "symbol": "bounds", "action": "rename", "to": "createBounds", "file": "src/core/helpers.ts:201" },
      { "symbol": "variable", "action": "rename", "to": "createVariable", "file": "src/core/helpers.ts:223" },
      { "symbol": "constant", "action": "rename", "to": "createConstant", "file": "src/core/helpers.ts:240" },
      { "symbol": "operation", "action": "rename", "to": "createOperation", "file": "src/core/helpers.ts:265" },
      { "symbol": "equation", "action": "rename", "to": "createEquation", "file": "src/core/helpers.ts:296" },
      { "symbol": "fact", "action": "rename", "to": "createFact", "file": "src/core/helpers.ts:329" },
      { "symbol": "inference", "action": "rename", "to": "createInference", "file": "src/core/helpers.ts:358" },
      { "symbol": "staticSource", "action": "rename", "to": "createStaticSource", "file": "src/core/helpers.ts:382" },
      { "symbol": "fieldSource", "action": "rename", "to": "createFieldSource", "file": "src/core/helpers.ts:399" },
      { "symbol": "lookupSource", "action": "rename", "to": "createLookupSource", "file": "src/core/helpers.ts:417" },
      { "symbol": "rangeSource", "action": "rename", "to": "createRangeSource", "file": "src/core/helpers.ts:440" },
      { "symbol": "staticFactor", "action": "rename", "to": "createStaticFactor", "file": "src/core/helpers.ts:466" },
      { "symbol": "fieldFactor", "action": "rename", "to": "createFieldFactor", "file": "src/core/helpers.ts:489" },
      { "symbol": "lookupFactor", "action": "rename", "to": "createLookupFactor", "file": "src/core/helpers.ts:513" },
      { "symbol": "rangeFactor", "action": "rename", "to": "createRangeFactor", "file": "src/core/helpers.ts:538" },
      { "symbol": "factorGroup", "action": "rename", "to": "createFactorGroup", "file": "src/core/helpers.ts:567" },
      { "symbol": "quantitativeDefinition", "action": "rename", "to": "createQuantitativeDefinition", "file": "src/core/helpers.ts:598" },
      { "symbol": "logicalDefinition", "action": "rename", "to": "createLogicalDefinition", "file": "src/core/helpers.ts:629" },
      { "symbol": "symbolicDefinition", "action": "rename", "to": "createSymbolicDefinition", "file": "src/core/helpers.ts:660" },
      { "symbol": "inferentialDefinition", "action": "rename", "to": "createInferentialDefinition", "file": "src/core/helpers.ts:692" }
    ],
    "guide": "guides/reason.md Surface rows and examples for the bare-noun value constructors",
    "prerequisite": [],
    "summary": "Move the twenty-five bare-noun value constructors to factories.ts and rename each to create{Entity}."
  },
  {
    "package": "reason",
    "id": "s07-17",
    "kind": "mixed",
    "edits": [
      { "symbol": "collection", "action": "rename", "to": "seat", "member": "GroupManagerInterface", "file": "src/core/types.ts:905" },
      { "symbol": "collection", "action": "rename", "to": "seat", "member": "RuleManagerInterface", "file": "src/core/types.ts:1006" },
      { "symbol": "collection", "action": "rename", "to": "seat", "member": "EquationManagerInterface", "file": "src/core/types.ts:1053" },
      { "symbol": "collection", "action": "rename", "to": "seat", "member": "FactManagerInterface", "file": "src/core/types.ts:1096" },
      { "symbol": "collection", "action": "rename", "to": "seat", "member": "InferenceManagerInterface", "file": "src/core/types.ts:1143" },
      { "symbol": "collection", "action": "rename", "to": "seat", "member": "VariableManagerInterface", "file": "src/core/types.ts:1187" },
      { "symbol": "collection", "action": "rename", "to": "seat", "member": "GroupManager", "file": "src/core/builders/managers/GroupManager.ts:39" },
      { "symbol": "collection", "action": "rename", "to": "seat", "member": "RuleManager", "file": "src/core/builders/managers/RuleManager.ts:38" },
      { "symbol": "collection", "action": "rename", "to": "seat", "member": "EquationManager", "file": "src/core/builders/managers/EquationManager.ts:38" },
      { "symbol": "collection", "action": "rename", "to": "seat", "member": "FactManager", "file": "src/core/builders/managers/FactManager.ts:38" },
      { "symbol": "collection", "action": "rename", "to": "seat", "member": "InferenceManager", "file": "src/core/builders/managers/InferenceManager.ts:38" },
      { "symbol": "collection", "action": "rename", "to": "seat", "member": "VariableManager", "file": "src/core/builders/managers/VariableManager.ts:39" }
    ],
    "guide": "guides/reason.md Methods preamble note on the write-only collection setter and each manager Methods table",
    "prerequisite": [],
    "summary": "Replace set collection(value) with a seat(items) method on the six manager interfaces and classes."
  },
  {
    "package": "table",
    "id": "s14-23",
    "kind": "remove",
    "edits": [
      { "symbol": "RowManager", "action": "remove", "file": "src/core/tables/RowManager.ts:15" },
      { "symbol": "SortManager", "action": "remove", "file": "src/core/tables/SortManager.ts:7" },
      { "symbol": "FilterManager", "action": "remove", "file": "src/core/tables/FilterManager.ts:7" },
      { "symbol": "SelectionManager", "action": "remove", "file": "src/core/tables/SelectionManager.ts:6" },
      { "symbol": "ExpansionManager", "action": "remove", "file": "src/core/tables/ExpansionManager.ts:6" },
      { "symbol": "PaginationManager", "action": "remove", "file": "src/core/tables/PaginationManager.ts:5" }
    ],
    "guide": "guides/table.md Surface class rows for the six managers (keep the interface rows); INTERNAL list in tests/guides.test.ts",
    "prerequisite": [],
    "summary": "Drop the six manager classes from the published barrel and from the guide Surface table, and name them in INTERNAL; keep the six interfaces."
  },
  {
    "package": "template",
    "id": "s17-16",
    "kind": "rename",
    "edits": [
      { "symbol": "size", "action": "rename", "to": "count", "member": "TemplateManagerInterface", "file": "src/core/types.ts:229" },
      { "symbol": "size", "action": "rename", "to": "count", "member": "TemplateManager", "file": "src/core/TemplateManager.ts:72" }
    ],
    "guide": "guides/template.md TemplateManagerInterface Surface row and Methods preamble",
    "prerequisite": [],
    "summary": "Rename TemplateManagerInterface.size and TemplateManager.size to count."
  },
  {
    "package": "template",
    "id": "s17-17",
    "kind": "signature",
    "edits": [
      { "symbol": "template", "action": "change", "member": "TemplateManagerInterface", "file": "src/core/types.ts:234" },
      { "symbol": "template", "action": "change", "member": "TemplateManager", "file": "src/core/TemplateManager.ts:114" }
    ],
    "guide": "guides/template.md template accessor row, NOTFOUND preamble, and TemplateManager tests that pin the throw",
    "prerequisite": [],
    "summary": "Change template(id) to return TemplateInterface | undefined and keep the NOTFOUND throw on fill/validate/parameters."
  },
  {
    "package": "template",
    "id": "s17-18",
    "kind": "signature",
    "edits": [
      { "symbol": "remove", "action": "change", "member": "TemplateManagerInterface", "file": "src/core/types.ts:240" },
      { "symbol": "remove", "action": "change", "member": "TemplateManager", "file": "src/core/TemplateManager.ts:174" }
    ],
    "guide": "guides/template.md TemplateManagerInterface remove/clear Methods rows",
    "prerequisite": [],
    "summary": "Drop the no-argument remove() overload from the interface and implementation; leave clear()'s single clear emission unchanged."
  },
  {
    "package": "websocket",
    "id": "s17-26",
    "kind": "remove",
    "edits": [
      { "symbol": "WebSocketCloseCode", "action": "remove", "file": "src/server/types.ts:31" },
      { "symbol": "WebSocketMessage", "action": "remove", "file": "src/server/types.ts:75" },
      { "symbol": "WebSocketClose", "action": "remove", "file": "src/server/types.ts:86" }
    ],
    "guide": "guides/websocket.md WebSocketCloseCode, WebSocketMessage, and WebSocketClose Surface rows",
    "prerequisite": [],
    "summary": "Delete WebSocketCloseCode, WebSocketMessage, and WebSocketClose and their three guide Surface rows; keep the labeled [code, reason] close tuple and drop the dangling {@link WebSocketClose} once the type is gone."
  },
  {
    "package": "websocket",
    "id": "s17-27",
    "kind": "rename",
    "edits": [
      { "symbol": "isWebSocketFrameCanonical", "action": "rename", "file": "src/server/helpers.ts:192" }
    ],
    "guide": "guides/websocket.md isWebSocketFrameCanonical Surface row",
    "prerequisite": [],
    "summary": "Rename isWebSocketFrameCanonical; the replacement is not settled between readWebSocketCanonical and checkWebSocketCanonical."
  },
  {
    "package": "websocket",
    "id": "s17-28",
    "kind": "mixed",
    "edits": [
      { "symbol": "NodeWebSocket", "action": "change", "file": "src/server/NodeWebSocket.ts:86" },
      { "symbol": "ping", "action": "change", "member": "NodeWebSocketInterface", "file": "src/server/types.ts:171" },
      { "symbol": "close", "action": "change", "member": "NodeWebSocketInterface", "file": "src/server/types.ts:172" },
      { "symbol": "ping", "action": "change", "member": "NodeWebSocket", "file": "src/server/NodeWebSocket.ts:178" },
      { "symbol": "close", "action": "change", "member": "NodeWebSocket", "file": "src/server/NodeWebSocket.ts:189" },
      { "symbol": "encodeWebSocketFrame", "action": "change", "file": "src/server/helpers.ts:281" }
    ],
    "guide": "guides/websocket.md ping and close Methods rows (currently pin RangeError) and a new Errors section",
    "prerequisite": [],
    "summary": "Add WebSocketError, isWebSocketError, and WebSocketErrorCode and throw WebSocketError from the eleven RangeError sites on NodeWebSocket construction/ping/close and encodeWebSocketFrame."
  }
]
```

## Unknowns

- **console s09-07.** Target is `createCaptureResult` (move to `factories.ts`) versus keeping `withCapture` and changing its parameters to `CaptureInterface`. `"to"` omitted.
- **console s09-11.** Finding names `DEFAULT_STREAM_LEVELS` / `DEFAULT_STREAM_LIMIT`, or after s09-10 `STREAM_LEVELS` / `DEFAULT_STREAM_LIMIT`. s09-10 deletes the server `DEFAULT_CAPTURE_LEVELS` alias, so that rename is only live if s09-10 does not land first.
- **console s09-21.** Unsuccessful terminal is `fail` on every lane. Successful-terminal verb is `complete()` (leave `ProgressEventMap.complete` and `ProgressInterface.completed`) versus `succeed()` (then `complete` / `completed` ride along). `"to"` omitted on `success`.
- **database s05-12.** Work order and lanes name `scanDriver`; the finding’s parenthetical alternative is `inspectDriver`.
- **middleware s11-04.** Standing DRIFT repair is delete. DRIFT-RESHAPE keep-the-name move into `factories.ts`/`parsers.ts` has no legal export form without a `create*` rename.
- **middleware s11-06.** `reason` → `code` is agreed. Type/constant names split: `MultipartErrorCode` versus `MultipartCode`; `MULTIPART_REASON_STATUS` follows. `"to"` omitted on those two.
- **middleware s11-12 and s11-15.** Both touch `SessionInterface.data` (readonly+mutators versus rename). No work-order sequencing.
- **middleware s11-15.** `SessionInterface.data` replacement is `values` versus `store`. Judge resolved SessionRow leaves to `seen`/`created`. `"to"` omitted on `data`.
- **middleware s11-18.** `PartHeaders.contentType` replacement is `type` versus `mime`. `"to"` omitted.
- **websocket s17-27.** Replacement is `readWebSocketCanonical` versus `checkWebSocketCanonical`. `"to"` omitted.

## Deviation

None. Read-only; no edits; no unavailable CLI/model/auth.
GROK-L2-EXIT=0
