<!-- Grok 4.7 High, 2026-10-06, session 5ffd96d4 (resumed), journal scaffold tmp/cursor/api-patterns-2.jsonl, 270 s -->

# Slice 2 — surface hygiene

Counts are data rows in each `## Surface` table. A header or rule row is not counted. A row's `Kind` cell is what the guide prints.

## Agent

`guides/agent.md`: Factories 18 (`:453-470`). Classes 17 (`:476-492`). Constants 18 (`:500-517`). Shapes and contracts 9 consts — 5 `*Shape` and 4 `*Contract` (`:525-533`); there is no Parsers heading. Helpers 27 (`:560-586`). Validators 3 (`:619-621`); the note says an error guard stays in Errors (`:615`). Errors 5 classes and 5 `is*` functions (`:636-645`). Types 73 (`:653-725`).

Helpers are pure leaves the loop also calls: `estimateTokens` / `estimateMessages` (`:562-563`), `sanitizeToken` / `sanitizeUsage` (`:564-565`), `assembleResult` (`:572`), `denyCall` (`:573`), `renderSection` / `resolveOpen` / `resolveClose` / `resolveItem` (`:574-577`), `renderFencedFile` (`:569`), `filterAllowList` / `intersectKeys` (`:561`, `:586`). `agentResultToJSON` returns `undefined` off-shape (`:560`). `settleAgentJob`, `handleAgentQueueJob`, and `handleAgentRunnerJob` are the job step the queue and runner factories bind (`:566-568`, `:600-610`). Those three, plus `assembleResult` and `denyCall`, are work `Agent` and `Authority` already perform (`:572-573`, `:848`).

Errors are separate classes, each with an `is*` guard (`:636-645`). `ProviderAbortError` carries code `'ABORT'` and a `partial` (`:636-637`). `ProviderError` codes are `'HTTP' | 'PROTOCOL' | 'PROVIDER'` (`:666`); `ProviderErrorOptions` is `{ status?, cause? }` (`:667`). `AgentJobError` is `'PARTIAL'` and carries the partial result (`:640`). `ConversationError` is `'SUMMARIZER' | 'SECTIONS'` (`:642`). `AgentError` is `'CONCURRENCY' | 'REGISTRY'` (`:644`). The Errors table does not list a `context` field. `generate` and `stream` take an `AbortSignal` (`:735`). `AgentOptions` carries `timeout`, `signal`, and `budget` (`:700`). `abort` cancels the turn (`:854`). `DEFAULT_PROVIDER_TIMEOUT` is `120_000` (`:509`). The bound is `AbortSignal.any` of abort, timeout, and budget (`:1028-1046`). A cancel resolves `{ partial: true }` (`:143`).

Extension points, supplied by the caller: `ProviderInterface` is the first argument of `createAgent` (`:109`, `:659`). `ConversationStoreInterface` is `ConversationManagerOptions.store` (`:721-724`). `ConversationSummaryHandler` is `ConversationOptions.summarize` (`:713`, `:716`). `createDatabaseConversationStore` takes a `DriverInterface` (`:456`). `AgentOptions.authority` and `.scheduler` take those interfaces (`:700`). No Factory row is a `create*Plugin`.

`## Surface` is the export inventory (`:19`). `## Methods` lists call signatures only; data members stay in Surface (`:729-731`). `## Contract` is numbered invariants, including the doc↔source bijection (`:975-979`). `## Patterns` is worked call sequences (`:1026`).

## Database

Factories 5 (`guides/database.md:78-82`). Classes 6 (`:88-93`). No Validators or Parsers heading. Errors 1 class and 1 guard (`:160-161`). Constants heading 5 (`:245-249`). Types 41 (`:257-297`). Other function tables: Query engine 16 (`:170-185`), Abort 1 (`:194`), Migrations 4 (`:205-208`), Conformance 3 (`:214-216`), Helpers & guards 14 of which 8 are `is*` (`:224-237`). Server adds 3 consts and 6 functions (`:99-107`). SQL compilation adds 21 functions (`:117-137`). Browser adds 2 consts and 6 functions (`:147-154`).

Query-engine functions are pure and total, and "the driver never re-implements" them (`:165-166`). The pattern calls them "the pure functions behind `TableInterface` and `QueryInterface`" (`:2047`). `applyQuery`, `matchesQuery`, `sortRows`, and `computeAggregate` are the work `records`, `count`, and `aggregate` do (`:170-176`, `:2047`). `checkAbort` is the shared abort gate (`:194`). `conformDriver` throws; it is a battery, not a leaf (`:214`).

`DatabaseError` plus `isDatabaseError` (`:160-161`). `DatabaseErrorCode` is `'CLOSED' | 'NOT_FOUND' | 'CONFLICT' | 'VALIDATION' | 'ABORTED' | 'MIGRATION' | 'CONFORMANCE' | 'DRIVER'` (`:270`). The Abort pattern reads `error.code` and `error.context` (`:1101`) and shows `DatabaseError('ABORTED', …)` (`:1116`). The Errors table itself does not print the constructor. Operations take `OperationOptions`, whose only key is `signal` (`:267`, `:1076-1078`). `AbortSignal.timeout` is the time box (`:1099`). `SQLiteDriverOptions` has its own `timeout` (`:290`). `DatabaseOptions` has no timeout key (`:288`).

`DriverInterface` is `DatabaseOptions.driver` (`:45-46`, `:287`). Optional driver hooks are `records`, `aggregate`, `stream`, `migrate`, `metadata`, `stamp`, and `transaction` (`:330-335`, `:369`). Shipped drivers are the other four factories (`:79-82`). No plugin row.

`## Surface` inventories exports (`:32`). `## Methods` is one table per interface; data members stay in Surface (`:299-306`). `## Contract` is numbered invariants (`:466`). `## Patterns` is worked use (`:900`).

## Relation

`### Factory & manager`: 1 factory, 2 classes (`guides/relation.md:42-44`). Builders 5 (`:50-54`). Resolution 2 functions and 1 guard (`:60-62`). Row helpers 4 (`:68-71`). Errors 1 class and 1 guard (`:77-78`). No Constants or Parsers heading. Types 21 (`:86-106`).

Builders return a `Relation` value (`:50-54`). `resolveRelation` flattens one at define time (`:60`, `:141`). Row helpers `readColumn`, `countAttached`, `indexRows`, and `groupRows` are pure lookups (`:68-71`); `Model` has no such methods (`:116-122`). `isRelationDescriptor` is a total guard (`:62`).

`RelationError` carries a `RelationErrorCode` (`:77`). The union is `'INVALID' | 'UNKNOWN_RELATION' | 'NOT_THROUGH'` (`:97`). Construction throws `RelationError('INVALID', …)` (`:139`). The Errors row does not mention `context`. Every model method takes the database `OperationOptions` signal (`:114`). An abort surfaces as the database `ABORTED` error (`:144`). No timeout key appears in `RelationManagerOptions` (`:105`) or `FindOptions` (`:102`).

The extension point is the `DatabaseInterface` passed as `database` (`:18`, `:105`). No store, driver, provider, or plugin row of its own.

`## Surface` (`:10`), `## Methods` (`:108-110`), `## Contract` (`:134`), `## Patterns` (`:149`).

## Table

The guide does not use a Factories or Classes heading. Under `### The table`: 1 class (`Table`), 1 factory (`createTable`), 1 error class, 1 error guard, and 10 type rows (`guides/table.md:114-127`). `### Rows, cells, and columns` 12 types (`:74-85`). `### The lens` 10 types (`:95-104`). Constants 7 (`:152-158`). Guards 7 (`:169-175`). Helpers 15 (`:209-223`). Cloners 2 (`:233-234`). Parsers 2 (`:253-254`). Manager classes are not Surface rows (`:24-28`, `:137-139`).

Helpers are "the pure leaves the table composes" (`:200`). `mergeTerms` is "the `set` write" and `removeTerms` is the drop `sort.remove` and `filter.remove` share (`:212-213`). `filterRows` and `sortRows` are the lens (`:219-220`). `extractKey` is the identity read (`:210`). Parsers return `undefined` on refusal (`:248-249`). `serializeTable` raises `SCHEMA` (`:222`). Guards return `false` off-shape and never throw (`:162-163`).

`TableError` is `new (code, message, context?: JSONRecord)` (`:125`). `isTableError` narrows it (`:127`). `TableErrorCode` is `'SCHEMA' | 'COLUMN' | 'KEY' | 'CELL' | 'DESTROYED'` (`:126`, `:1317-1321`). `TableOptions` is `{ on?, error?, rows?, comparators?, matchers?, limit? }` (`:117`). No `signal`, `timeout`, or `abort` appears on `TableInterface` (`:115`, `:1253-1256`).

Extension is per-column `comparators` and `matchers` (`:104-105`, `:117`). No store, driver, provider, or plugin.

`## Surface` lists exports (`:22`). `## Methods` lists call signatures; data members stay in the Shape cells (`:1233-1237`). `### Errors` under Methods is the code table (`:1310-1321`). `## Contract` is numbered invariants (`:1370`). There is no `## Patterns` heading. Worked API use sits in Lifecycle (`:888`), Events (`:936`), and Wire safety (`:1001`). `## Concept inventory` follows Contract (`tmp/units/api-guides-map.txt:190-192`).

## Workspace

`### Contracts` 22 types (`guides/workspace.md:40-61`). Constants 1 (`:69`). Errors 1 class and 1 guard (`:78-79`). Helpers 14, including the guards `isText` and `isBinary` (`:88-90`). Validators 2 (`:112-113`). Factories 7 (`:122-128`). Classes 4 (`:140-143`). No Parsers heading.

Factories "return the interface, not the class" (`:118`). Helpers are pure leaves "the classes compose" (`:83-84`). The editing section says the range functions are "exported and usable on their own" (`:307-309`): `isValidRange`, `clampPosition`, `clampRange`, `offsetAt`, `sliceRange`, `spliceRange`. `inferLanguage` is what a write uses (`:88`, `:265`).

`WorkspaceError` is `new (code, message, context?)` (`:78`). `isWorkspaceError` narrows it (`:79`). `WorkspaceErrorCode` is `'MISSING' | 'MODALITY' | 'PATTERN' | 'RANGE'` (`:58`). No `AbortSignal`, `timeout`, or `abort` appears on `WorkspaceInterface` or `WorkspaceOptions` (`:54`, `:59`, `:190-205`).

`WorkspaceStoreInterface` is `WorkspaceManagerOptions.store` (`:60`, `:468`). `createDatabaseWorkspaceStore` takes an optional `DriverInterface` (`:127`). No provider or plugin row.

`## Surface` (`:25`) and `## Methods` (`:180-182`). There is no `## Contract` and no `## Patterns` (`tmp/units/api-guides-map.txt:204-219`). Files, Editing, Reading, Events, Lifecycle, The registry, and Durability carry the worked API (`workspace.md:228-466`).

## Workflow

`### Factories` 11 (`guides/workflow.md:75-85`), plus 4 scheduler factories under Environment (`:174-177`). Class rows: entity tree 4 (`:97-100`), substrate 4 (`:130-133`), `Scheduler` 1 (`:151`), environment backends 4 (`:167-170`), stores 2 (`:201-202`), `WorkflowManager` 1 (`:210`). `Phase` and `Task` classes are absent: "a consumer never builds one" (`:91`). Controller classes are internal (`:127`). Errors 1 class and 1 guard (`:216-217`). Helpers & guards 44 in one table (`:234-277`), of which 14 are named `is*` (`:235-239`, `:243`, `:250-251`, `:270-271`, `:273-276`). Shapes 5 consts (`:356-360`). Constants 8 (`:368-375`), plus `POST_TASK_PRIORITY` (`:191`). Types 65 (`:383-447`), plus `IdleInterface` outside that table (`:185`). No Parsers heading. `createWorkflowContract` compiles a guard and a parser (`:75`, `:350`).

The helper prose says status derivations "are pure and encode the lifecycle truth tables" (`:225`). `derivePhaseStatus` and `deriveWorkflowStatus` are that derivation (`:244-245`). `insertEntry` and `moveEntry` are "the pure splice" behind `add` and `move` (`:267-268`). `definitionToSnapshot` is the construction path (`:261`). `scheduleHost` is "intentionally effectful" (`:225`, `:253`). `success` and `failure` box a `Result` (`:254-255`). Guards are total (`:279-281`).

`WorkflowError` carries a `WorkflowErrorCode` and an optional `context` (`:216`). The union is `'TRANSITION' | 'RESTORE' | 'MUTATION' | 'SCHEDULE' | 'INVARIANT'` (`:400`). `isWorkflowError` narrows it (`:217`). A caller-supplied function, store, or `AbortSignal.reason` is not wrapped (`:219`). `createRunner` can surface `QueueError`; the database store can surface `DatabaseError` (`:221`). `WorkflowRunOptions` is `signal`, `timeout`, `budget`, `store` (`:433`). Run bounds fold through `AbortSignal.any` (`:683`). A task `timeout` is a per-attempt deadline (`:667`); `TaskFailureOrigin` includes `'timeout'` (`:403`). `SchedulerInterface` yield and delay reject with `signal.reason` (`:440`). A signal that is not a native `AbortSignal` rejects with `WorkflowError` code `SCHEDULE` (`:155`). There is no `workflow.abort` (`:1076`). `RunnerInterface.abort` cancels units (`:623`).

`WorkflowStoreInterface` is `WorkflowManagerOptions.store` and `WorkflowRunOptions.store` (`:436`, `:433`). `createDatabaseWorkflowStore` takes a `DriverInterface` (`:81`). `WorkflowRunnerOptions.scheduler` takes a `SchedulerInterface` (`:434`). `WorkflowOptions.functions` is the `WorkflowRegistry` (`:416`, `:425`). `RunnerOptions.handler` is the unit function (`:443`). No plugin row.

`## Surface` (`:23`), `## Methods` (`:449-451`), `## Contract` (`:657`), `## Patterns` (`:719`).

## Form

No Factories or Classes heading. Schema and fields 18 types (`guides/form.md:59-76`). Answers and rules 7 types (`:88-94`). `### The form`: 1 class, 1 factory, 6 types, 1 error class, 1 error guard (`:108-117`). Constants 22 (`:138-159`). Guards 10 (`:172-181`). Helpers 16 (`:191-206`). Cloners 4 (`:216-219`). Parsers 3 (`:228-230`). "Nothing is internal" (`:22-24`).

Helpers are "the pure leaves the form composes" (`:185`). `evaluateForm`, `computeDefaults`, `auditSchema`, and `extractGroups` answer without a form (`:1522-1524`). `formatMessage` resolves rule copy (`:202`). `serializeForm` drops `custom` validators (`:204`). Parsers return `undefined` on refusal (`:223-224`). Guards never throw (`:163-164`). `createFieldError` builds one failure record; it is not `FormError` (`:202`, `:93`).

`FormError` is `new (code, message, context?: JSONRecord)` (`:115`). `isFormError` narrows it (`:117`). `FormErrorCode` is `'SCHEMA' | 'FIELD' | 'CONTROL' | 'SETTLED' | 'ABANDONED'` (`:116`). A custom validator's throw escapes unchanged (`:17-18`). `FormOptions` is `{ on?, error?, values?, messages? }` (`:111`). No `signal`, `timeout`, or `abort` appears on `FormInterface` (`:109`, `:1572-1582`).

The extension seam is `FieldRule.custom`, a `FieldValidator` (`:90`, `:92`). No store, driver, provider, or plugin.

`## Surface` (`:20`). Controls, Rules, Lifecycle, Events, and Wire safety carry worked behavior before Methods (`tmp/units/api-guides-map.txt:296-329`). `## Methods` is `FormInterface` only (`:1557-1570`). `## Errors` is the code table (`:1584-1596`). `## Contract` (`:1636`). No `## Patterns` heading. `## Concept inventory` follows (`:1714`).

## Tool

Types 14 (`guides/tool.md:50-63`). Validators 1 (`:79`). Helpers 1 (`:87`). Factories 2 (`:96-97`). Classes 3, including `ToolError` (`:107-109`). `isToolError` sits under `### ToolError`, not Validators (`:142`). No Constants or Parsers heading.

`toolToDefinition` projects the advertised definition (`:87`); `definitions()` is the registry method that lists those projections (`:161`). `isToolCall` guards the call envelope only (`:79`, `:280-281`). `Tool.execute` does not catch (`:120-121`).

`ToolError` takes `code`, `message`, and optional `context` (`:134`). `isToolError` narrows it (`:142`). `ToolErrorCode` is `'SCHEMA' | 'ARGUMENTS'` (`:62`). `ToolErrorContext` is `{ faults? }` (`:63`). `error.code` and `error.context` are read in the validation section (`:384-386`, `:398`). The manager contains the same refusal as a `ToolFailure` message, not the error instance (`:396-397`). `ToolContext` carries `signal` (`:60`). The signal is forwarded to the handler (`:284-286`). No timeout key is on `ToolOptions` or `ToolManagerOptions` (`:54`, `:58`). No `abort` method is on `ToolManagerInterface` (`:156-165`).

The extension point is `ToolOptions.execute` (`:54`). A `contract` is optional and comes from the contract package (`:345-348`). No store, driver, provider, or plugin row.

`## Surface` (`:38`) and `## Methods` (`:144`). Anatomy, The registry, Calls, and Execution context carry worked use (`:172-310`). Contract validation is prose, not a `## Contract` invariant list (`:344`). `## Patterns` is one subsection, Observe registry changes (`:428-430`).

## What stays internal, and what a consumer imports

Summing the Surface rows above: 61 class rows and 50 factory rows, against 246 function rows that are not factories. Database (72), workflow (44 in Helpers & guards), agent (27 helpers), and form (16 helpers + 10 guards + 4 cloners + 3 parsers) are where the free functions sit. Table publishes the leaves and keeps the manager classes and the key-set shell out of the barrel (`table.md:24-29`). Form publishes every declaration (`form.md:22-24`). Workflow publishes `PhaseInterface` and `TaskInterface` and keeps the `Phase` and `Task` classes, and the controller classes, internal (`workflow.md:91`, `:127`). Agent does not re-export tool or workspace (`agent.md:21`, `:727`). Workflow does not re-export contract's JSON cloners (`workflow.md:227-229`). `DriverIterator` is a Surface class and is described as an internal continuation boundary (`database.md:89`, `:307-308`).

The call-site import the guides show is the factory plus the interface: `createTable` rather than `new Table` when only `TableInterface` is needed (`table.md:1355-1357`), factories that return the interface (`workspace.md:118`, `tool.md:96-97`). Pure helpers are the import when there is no entity: query functions for a driver author (`database.md:2047-2068`), evaluation helpers when "a caller that has no form" (`form.md:1522-1524`). No Factory table in these eight guides lists a plugin factory. `.claude/rules/names.md:177` still reserves `create*Plugin` as a form.

## Unknowns

The agent Errors table names `code` and, for two classes, a carried result, and it does not name `context` (`agent.md:632-645`). `RelationError`'s Surface row names a code and no `context` parameter (`relation.md:77`). The database Errors table does not print a constructor; `code` and `context` appear in the Abort pattern (`database.md:159-161`, `:1101`). Table, form, and workspace show no abort or timeout on the entity. These guides do not say whether `emitter` subscription is removable.