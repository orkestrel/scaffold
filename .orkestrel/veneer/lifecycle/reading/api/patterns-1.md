<!-- Grok 4.7 High, 2026-10-06, session 5ffd96d4, journal scaffold tmp/cursor/api-patterns.jsonl, 609 s -->

# Slice 1 — entities, managers, and vocabulary

Naming law (`.claude/rules/names.md`): a factory is `create{Entity}` (`:176`); a behavioral interface is `{Entity}Interface` and a manager is `{Entity}ManagerInterface` (`:155`, `:164`); options are `{Entity}Options` (`:156`). Properties are nouns and methods are verbs (`:114`). Accessors are bare nouns, never `get*` or `set*` (`:116`). Ungrouped option keys are one word; a grouped key is the entity noun and every leaf stays one word (`:27-30`). Events are one present-tense verb or noun (`:31`). Fixed lifecycle verbs are `start`, `stop`, `pause`, `resume`, `skip`, `abort`, `clear`, `destroy`, `execute` (`:222-232`). `clear` resets state without destroying the entity (`:230`). A lone tally is `count` (`:206`).

## Agent

`createAgent(provider, options)` builds an `AgentInterface` (`guides/agent.md:109`, `:462`, `:702`). `AgentOptions` is a flat one-word bag: `on`, `error`, `system`, `tools`, `instructions`, `workspaces`, `scope`, `limit`, `timeout`, `budget`, `scheduler`, `signal`, `authority`, `conversations`, `window`, `strict` (`:700`). Data members are `emitter`, `id`, `status`, `context` (`:702`). Methods are `generate` (`Promise<AgentResult>`), `stream` (`AgentStreamInterface`), and `abort` (`void`) (`:850-854`). `status` moves `idle` → `running` → `done` / `error` (`:143`). A cancel resolves `{ partial: true }` and does not reject; only a provider or tool error rejects (`:143`, `:992`).

`createAgentContext(options)` builds `AgentContextInterface` (`:461`, `:691`). `AgentContextOptions` keys are `system`, `tools`, `instructions`, `workspaces`, `scope`, `conversations` (`:690`). Data members are `system`, `instructions`, `workspaces`, `messages`, `conversations`, `tools`, `scope` (`:691`). Methods are sync `apply` and `build` (`:843-844`).

Sub-entities on the context:

| Property | Interface | Methods | Events |
| --- | --- | --- | --- |
| `instructions` | `InstructionManagerInterface` (`:683`) | `add`, `instruction`, `instructions`, `render`, `remove`, `clear` (`:800-807`) | `add`, `remove`, `clear` (`:681`) |
| `messages` | active conversation as `MessageManagerInterface` (`:678`) | `add`, `message`, `messages`, `remove`, `clear` (`:788-794`) | none on the flat store (`:786`) |
| `conversations` | `ConversationManagerInterface` (`:932`) | `conversation`, `conversations`, `add`, `switch`, `open`, `save`, `remove`, `clear` (`:934-943`) | event-free (`:481`) |
| `workspaces` | borrowed `WorkspaceManagerInterface` (`:487`) | see Workspace | event-free manager (`:1004`) |
| `tools` | borrowed `ToolManagerInterface` (`:487`) | see Tool | agent contract calls it event-free (`:992`) |
| `scope` | active `ScopeInterface`, changed by `apply` (`:819-823`, `:843`) | `narrow` only (`:823`) | none |

`ScopeManagerInterface` is a separate registry, not a context property: `create`, `scope`, `scopes`, `remove`, `clear`, events `create` / `remove` / `clear` (`:687`, `:829-835`). `create` always mints; it does not overwrite (`:831`).

`createConversation` (`:453`) owns the message verbs plus sync `view`, `rehydrate`, `search`, `reference`, `snapshot` and async `compact` (`:916-928`). `ConversationEventMap` is `compact`, `summary`, `rehydrate`, `collapse` (`:715`). `ConversationManager` data are `count` and `active` (`:932`). The first `add` auto-activates; a later `add` does not; `switch` of an unknown id returns `undefined` (`:932-939`). `open` and `save` are `Promise`; other registry methods are sync (`:940-943`). `ConversationStoreInterface` is async `get`, `set`, `delete` (`:949-953`).

Push observation is `AgentEventMap`: `start`, `turn`, `tool`, `usage`, `deny`, `finish`, `error`, `abort`, `exhaust`, `fault`, wired by `AgentOptions.on` or `agent.emitter.on(name, listener)` (`:694`, `:1271-1280`). Pull observation is `stream().events` (`:1263`). A listener throw is isolated and handed to `error` as `(error, event)` (`:1283`).

## Database

`createDatabase(options)` builds `DatabaseInterface` (`guides/database.md:45`, `:78`, `:294`). `DatabaseOptions` is one flat bag: `on`, `error`, `driver`, `tables`, `primary`, `indexes`, `name`, `generator`, `version` (`:288`). `tables` is a name → column-shape map; `primary` is a per-table column map (`:45-51`, `:277`). Data members are `emitter`, `name`, `status` (`:294`). `status` is `'idle' | 'open' | 'closed'` (`:268`). Methods are `table`, `import`, `export`, `open`, `close`, `transaction`, `migrate` (`:376-384`). `open`, `close`, `transaction`, and `migrate` return `Promise`; `table`, `import`, and `export` do not (`:376-384`). `transaction` and `migrate` take `OperationOptions`, whose only key is `signal` (`:267`, `:373-374`).

There is no manager property. `table(name)` returns a `TableInterface` with data `emitter`, `name`, `primary`, `contract` (`:294-295`, `:54`). Its methods are all async except `query`: `get`, `resolve`, `has`, `keys`, `records`, `count`, `aggregate`, `scan`, `set`, `add`, `update`, `remove`, `clear`, `query`, `cursor` (`:418-434`). Keyed methods batch by overload: one in, one out; an array in, an array out (`:406-407`). `query()` returns `QueryInterface` (`condition`, `order`, `filter`, `limit`, `offset`, then async `collect`, `find`, `count`, `stream`, `aggregate`) (`:436-455`). `cursor()` returns `CursorInterface` (`next`, `update`, `remove` async; `close` sync) (`:457-464`).

`DatabaseEventMap` is `open`, `close`, `transaction`, `commit`, `rollback`, `migrate` (`:272`, `:1889-1890`). `TableEventMap` is `write`, `remove`, `clear` (`:273`, `:1891`). Subscribe with `entity.emitter.on` or `on` (`:1865-1883`). Listener throws go to `error` as `(error, event)` (`:1906-1908`). Reads are not emitted (`:1901-1902`). Each `db.table(name)` is a fresh handle with its own emitter (`:1903-1904`).

Driver lifecycle is `open` / `close`, not `start` / `stop` (`:351-353`). Storage verbs are `read`, `write`, `insert`, `delete`, `keys`, `scan`, `clear` (`:321-329`).

## Relation

`createRelationManager(options)` builds `RelationManagerInterface` (`guides/relation.md:17`, `:42`, `:106`). `RelationManagerOptions` keys are `database`, `relations`, `model` (`:105`). `relations` groups a per-table map; `model` groups `{ on, error }` for every vended handle (`:17-27`, `:331-337`). Data member is `count` (`:106`). Methods are sync `model`, `names`, `has` (`:130-132`). The manager is event-free (`:143`, `:320`).

`model(name)` returns `ModelInterface`: data `emitter`, `name`, `table`, `relations` (`:104`). Methods are async `load`, `find`, `link`, `unlink`, `links` (`:116-122`). `model.table` is the typed `TableInterface` (`:36`, `:139`). `model(name)` returns a fresh handle each call (`:329`). `ModelEventMap` is `load`, `link`, `unlink` (`:103`, `:344-345`). Subscribe with `model.emitter.on` or the manager's `model.on` (`:320`, `:331-336`). `FindOptions` extends `OperationOptions` with `limit`, `offset`, `sort`, `direction` (`:102`). An aborted signal surfaces as the database `ABORTED` error (`:144`).

## Table

`createTable(schema, options)` builds `TableInterface` (`guides/table.md:38`, `:116`). The schema is a separate argument: `TableSchema` is `{ name?, label?, help?, key, columns }` (`:85`). `TableOptions` keys are `on`, `error`, `rows`, `comparators`, `matchers`, `limit` (`:117`). Data members are `emitter`, `schema`, `rows`, `sort`, `filter`, `selection`, `expansion`, `pagination`, `view`, `count`, `destroyed` (`:115`). Methods on the table itself are sync `clear` and `destroy` (`:1253-1256`). `view` and `count` are derived on read (`:13-15`, `:134`). `table.count` is admitted rows; `pagination.count` is pages (`:133-135`). All manager methods in the methods tables are synchronous (`:1258-1308`).

| Property | Interface | Methods |
| --- | --- | --- |
| `rows` | `RowManagerInterface` (`:119`) | `row`, `rows`, `add`, `update`, `move`, `remove` (`:1260-1266`) |
| `sort` | `SortManagerInterface` (`:120`) | `order`, `orders`, `set`, `remove` (`:1271-1276`) |
| `filter` | `FilterManagerInterface` (`:121`) | `filter`, `filters`, `set`, `remove` (`:1281-1285`) |
| `selection` | `SelectionManagerInterface` (`:122`) | `select`, `clear`, `toggle`; data `keys` (`:122`, `:1289-1293`) |
| `expansion` | `ExpansionManagerInterface` (`:123`) | `expand`, `clear`, `toggle`; data `keys` (`:123`, `:1297-1301`) |
| `pagination` | `PaginationManagerInterface` (`:124`) | `move`, `resize`; data `page`, `limit`, `offset`, `count` (`:124`, `:1305-1308`) |

`clear` resets rows and every lens axis and leaves the table open (`:896-898`, `:1255`). `destroy` is idempotent; later writes raise `DESTROYED`; getters still answer (`:899-901`, `:1256`). `TableEventMap` is `write`, `remove`, `sort`, `filter`, `select`, `expand`, `paginate`, `clear` (`:118`, `:942-950`). Subscribe with `TableOptions.on` or `table.emitter.on` (`:964-991`). A no-op emits nothing; seeding emits nothing (`:939`, `:961`). Listener throws go to `error` (`:965-966`).

## Workspace

`createWorkspace(options?)` builds `WorkspaceInterface` (`guides/workspace.md:125`, `:59`). `WorkspaceOptions` keys are `id`, `on`, `error`, `seed` (`:54`). Data members are `id`, `emitter`, `count` (`:33`, `:59`). Methods are sync `file`, `files`, `read`, `has`, `search`, `replace`, `write`, `prepend`, `append`, `move`, `remove`, `clear`, `snapshot`, `destroy` (`:190-205`). There is no child manager. `file` / `files` are the lookup pair (`:190-191`). A batch `has`, `move`, or `remove` returns `true` only when every entry succeeded (`:385-388`). `clear` empties files and leaves observation live (`:416`). `destroy` releases the emitter, is idempotent, and leaves edits functional but silent (`:416-418`).

`createWorkspaceManager(options?)` builds `WorkspaceManagerInterface` (`:128`, `:61`). `WorkspaceManagerOptions` keys are `on`, `error`, `store` (`:60`). Data members are `count` and `active` (`:61`). Methods are `workspace`, `workspaces`, `add`, `switch`, `open`, `save`, `remove`, `clear` (`:210-218`). `open` and `save` are `Promise`; the rest are sync (`:215-216`). The first `add` activates; a later `add` does not; `switch` of an unknown id returns `undefined` (`:439-448`, `:455`). The manager owns no emitter (`:141`, `:160`). `remove` and `clear` destroy each workspace (`:463`). `WorkspaceStoreInterface` is async `get`, `set`, `delete` (`:56`, `:222-226`).

`WorkspaceEventMap` is `write`, `remove`, `move`, `clear` (`:53`, `:402-407`). Subscribe with `on` or `emitter` (`:398-399`). A listener throw is isolated and the edit still lands (`:409-410`). No-ops and seeding emit nothing (`:410-412`). This guide has no `## Contract` heading (`tmp/units/api-guides-map.txt:204-219`).

## Workflow

`createWorkflow(definition, options)` builds `WorkflowInterface` from a JSON `WorkflowDefinition` (`guides/workflow.md:76`, `:1031`, `:385`). `WorkflowDefinition` keys are `id`, `name`, `description`, `phases`, `bail` (`:385`). `WorkflowOptions` keys are `on`, `bail`, `error`, `phases`, `functions`, `silence` (`:416`). `phases` and `tasks` listener bags are keyed by id (`:1026`). Data members are `emitter`, `id`, `name`, `description`, `context`, `bail`, `status`, `phases`, `paused`, `destroyed`, `signal` (`:417`). Methods are `phase`, `results`, `skip`, `stop`, `complete`, `pause`, `resume`, `destroy`, `wait`, `add`, `remove`, `move`, `update`, `snapshot` (`:457-472`). `wait` is `Promise<void>`; structural mutations return `Result<PhaseInterface, WorkflowError>` (`:467-471`). There is no `abort` on the workflow (`:1076`).

`phases` is `PhaseManagerInterface`: `append`, `add`, `remove`, `move`, `update`, `phase`, `phases`, plus `count` (`:98`, `:421`, `:517-525`). `PhaseInterface` data include `tasks` (`:418`). `tasks` is `TaskManagerInterface` with the same verbs under `task` / `tasks` (`:99`, `:420`, `:531-539`). Entity `add` / `remove` / `move` / `update` delegate to those managers (`:468`, `:482`). `append` is the build path and throws; `add` is the graceful `Result` (`:104`, `:519-520`). `CollectionInterface` is the shared store: `append`, `add`, `remove`, `move`, `update`, `entry`, `entries` (`:100`, `:545-553`).

`TaskInterface` methods are `start`, `complete`, `fail`, `skip`, `stop`, `report`, `pulse`, `pause`, `resume`, `wait`, `patch`, `snapshot` (`:498-511`). `start` begins an attempt (`:500`). `LifecycleStatus` is `pending`, `running`, `completed`, `failed`, `skipped`, `stopped` (`:369`).

`createWorkflowRunner()` exposes `execute`, which returns `Promise<WorkflowResult>` (`:55-57`, `:557-559`). `createWorkflowManager` exposes `workflow`, `workflows`, `add`, `open`, `save`, `remove`, `clear`, plus `count`, and has no `active` or `switch` (`:206`, `:437`, `:585-593`). `open` and `save` are `Promise` (`:590-591`). The manager is event-free (`:210`). `WorkflowStoreInterface` is async `get`, `set`, `delete` (`:649-655`).

Events (`:1041-1045`): workflow and phase share `start`, `complete`, `fail`, `pause`, `resume`, `skip`, `stop`, `add`, `remove`, `move`, `update` (`:411-412`). A task uses `start`, `complete`, `fail`, `pause`, `resume`, `skip`, `stop`, `report`, `pulse`, `silence` (`:413`). Subscribe with `entity.emitter.on` or `on` (`:1026-1036`). Idempotent repeats emit nothing (`:1047`). `RunnerInterface` also has `execute`, `spawn`, `abort`, `pause`, `resume`, `stop`, `destroy` (`:615-627`).

## Form

`createForm(schema, options?)` builds `FormInterface` (`guides/form.md:33`, `:110`). The schema is a separate argument: `FormSchema` is `{ name?, label?, help?, groups?, fields }` (`:59`). `FormOptions` keys are `on`, `error`, `values`, `messages` (`:111`). Data members are `emitter`, `schema`, `values`, `baseline`, `errors`, `touched`, `disabled`, `status`, `valid`, `dirty`, `answer` (`:109`). There is no child manager. `field(name)` is the lookup (`:1574`). Methods are sync `field`, `fill`, `touch`, `invalidate`, `disable`, `enable`, `submit`, `clear`, `destroy` (`:1572-1582`). `answer` is a `Promise` property, not a method (`:43`, `:109`). `submit` returns `FormResult` synchronously (`:42`, `:1580`). `status` is `'editing' | 'settled' | 'abandoned'` (`:112`, `:946`). `valid` and `dirty` are derived (`:962-964`). `clear` restores the opening answers (`:1581`). `destroy` abandons an unsettled form (`:946`, `:1582`). `FormEventMap` is `fill`, `validate`, `disable`, `enable`, `submit`, `clear`, `abandon` (`:114`, `:1372-1379`). Subscribe with `FormOptions.on` or `form.emitter.on` (`:1381-1402`). Listener throws go to `error` (`:1382-1383`).

## Tool

`createTool(options)` builds an inert `ToolInterface`; `createToolManager(options?)` is the live registry (`guides/tool.md:13-16`, `:96-97`). `ToolOptions` keys are `name`, `title`, `description`, `summary`, `parameters`, `contract`, `annotations`, `execute` (`:54`). `ToolManagerOptions` keys are `on`, `error` (`:58`). `ToolInterface` adds `execute`, which returns `Promise<unknown> | unknown` (`:55`, `:150-152`). `ToolManagerInterface` data are `count` and `emitter` (`:56`). Methods are `add`, `tool`, `tools`, `definitions`, `execute`, `remove`, `clear`, `destroy` (`:56`, `:156-165`). `add`, `execute`, and `remove` take one value or a batch; a batch `remove` is `true` only when every name was present (`:167-170`). Manager `execute` returns `Promise<ToolResult | readonly ToolResult[]>` and contains failure as a result (`:20`, `:162`, `:288`). `ToolManagerEventMap` is `add`, `remove`, `clear` (`:57`). Subscribe with `on` or `tools.emitter.on` (`:430-457`). `destroy` releases listeners (`:165`, `:463-464`). A tool has no lifecycle (`:13-14`).

## Shared vocabulary

The same verb, used the same way, in more than one guide:

| Verb | Shared use | Where |
| --- | --- | --- |
| `create{Entity}` | Factory returns the interface | `names.md:176`; `agent.md:449-470`; `database.md:76-82`; `relation.md:42`; `table.md:116`; `workspace.md:122-128`; `workflow.md:73-85`; `form.md:110`; `tool.md:96-97` |
| `add` | Register or append one or a batch | `agent.md:790`, `:802`, `:937`; `workspace.md:212`; `workflow.md:589`; `tool.md:158` |
| `remove` | Drop one or a batch; `true` only when every id was present | `agent.md:793`, `:942`; `workspace.md:385-386`; `tool.md:169-170` |
| `clear` | Empty the collection and leave the entity | `names.md:230`; `agent.md:794`, `:943`; `workspace.md:203`, `:416`; `tool.md:164`; `workflow.md:593` |
| noun / nouns | Lookup by key returns `undefined`; list is insertion order | `agent.md:791-792`, `:935-936`; `workspace.md:190-191`, `:210-211`; `workflow.md:586-588`; `tool.md:159-160`; `relation.md:130` |
| `count` | The lone tally, a property | `names.md:206`; `agent.md:683`, `:932`; `workspace.md:59`; `workflow.md:437`; `tool.md:66`; `relation.md:106`; `table.md:134` |
| `has` | Predicate, `true` only when every batched key is present | `database.md:422`; `workspace.md:332-334`; `relation.md:132` |
| `on` + `emitter.on` | Construction listeners, or subscribe later with `(event, listener)` | `agent.md:1271-1280`; `database.md:1865-1881`; `relation.md:320`; `table.md:964-991`; `workspace.md:398-399`; `workflow.md:1026`; `form.md:1381`; `tool.md:430-457` |
| `error` | Listener throws arrive as `(error, event)` and do not escape the operation | `agent.md:1283`; `database.md:1906-1908`; `relation.md:349`; `table.md:965-966`; `workspace.md:409-410`; `form.md:1382-1383`; `tool.md:467-469` |
| `snapshot` | Plain JSON of the live entity | `agent.md:928`; `workspace.md:204`; `workflow.md:472` |
| `get` / `set` / `delete` | Async store; absent `get` is `undefined`; absent `delete` does not throw | `agent.md:949-953`; `workspace.md:222-226`; `workflow.md:649-655` |
| `open` / `save` | Lenient registry hydrate and persist over that store | `agent.md:940-941`; `workspace.md:215-216`, `:468-469`; `workflow.md:590-591` |
| `active` / `switch` | First `add` activates; later `add` does not; unknown `switch` returns `undefined` | `agent.md:932-939`; `workspace.md:439-448` |
| `destroy` | Idempotent teardown | `names.md:231`; `workspace.md:416-418`; `table.md:899-901`; `form.md:1582`; `workflow.md:466`; `tool.md:165` |
| `abort` | Cancel through a signal | `names.md:229`; `agent.md:854`, `:862`; `workflow.md:623`, `:645` |

## Deviations

`add` is a registry insert in agent, workspace, workflow, and tool (`agent.md:790`, `tool.md:158`), and an insert that throws `CONFLICT` on a duplicate key in the database (`database.md:429`). Sort and filter use `set` / `remove`, not `add` (`table.md:1275-1276`, `:1284-1285`). Scope registration is `create`, because a scope never overwrites (`agent.md:687`, `:831`).

Database accessors are `get` and `set` (`database.md:420`, `:428`). The naming law forbids `get*` and `set*` (`names.md:116`). Storage uses `read`, `write`, `insert`, `delete` (`database.md:323-326`). Stores use `delete` (`workspace.md:226`); entities use `remove`.

Database and driver lifecycle is `open` / `close`, with status `idle` / `open` / `closed` (`database.md:268`, `:351-353`, `:381-382`). Form status is `editing` / `settled` / `abandoned` (`form.md:112`). Agent status is `idle` / `running` / `done` / `error` (`agent.md:143`). Workflow status is `pending` / `running` / `completed` / `failed` / `skipped` / `stopped` (`workflow.md:369`). Table exposes `destroyed`, not a status union (`table.md:115`, `:903`).

`clear` empties a registry in agent, workspace, tool, and the workflow manager (`agent.md:794`, `tool.md:164`, `workflow.md:593`). On a table document it also resets sort, filter, selection, expansion, and page (`table.md:896-898`). On a form it restores the opening answers (`form.md:1581`).

`execute` runs a tool handler or a workflow (`tool.md:152`, `workflow.md:559`). An agent turn is `generate` / `stream` (`agent.md:852-853`). A task leaf is `start` / `complete` / `fail` (`workflow.md:500-502`). Database work has no `execute`.

`createAgent` takes a provider plus options (`agent.md:109`). `createTable` and `createForm` take a schema plus options (`table.md:116`, `form.md:110`). `createWorkflow` takes a definition plus options (`workflow.md:1031`). `createDatabase`, `createRelationManager`, `createWorkspace`, and `createTool` take one options argument (`database.md:45`, `relation.md:17`, `workspace.md:125`, `tool.md:96`).

Database keyed methods return one result or an array (`database.md:406-407`). Registry `remove` returns one boolean for the whole batch (`agent.md:793`, `tool.md:169-170`). Workflow tree mutations return `Result` (`workflow.md:467-471`). Workflow `append` throws; `add` does not (`workflow.md:104`).

`WorkflowManager` has no `active` or `switch` (`workflow.md:206`). Conversation and workspace managers do (`agent.md:932`, `workspace.md:61`).

The agent contract says the tool registry is event-free (`agent.md:992`). The tool guide gives `ToolManagerInterface` an `emitter` and `add` / `remove` / `clear` events (`tool.md:56-57`, `:430`).

Async split: database and relation I/O return `Promise` even on the memory driver (`database.md:419`, `relation.md:116-122`). Workspace edits, table methods, and form methods are synchronous (`workspace.md:190-205`, `table.md:1253-1308`, `form.md:1572-1582`). Their durability seams are the async part (`workspace.md:215-216`). Agent message edits are sync; `generate`, `compact`, `open`, and `save` are async (`agent.md:790`, `:852`, `:924`, `:940`). Form `answer` is a promise property beside sync `submit` (`form.md:42-43`).

## Unknowns

None of these eight guides shows an unsubscribe, `emitter.off`, or a subscription handle. They show only `emitter.on` and the construction `on` map (`agent.md:1280`, `database.md:1881`, `tool.md:430`).

`guides/workspace.md` has no `## Contract` section (`tmp/units/api-guides-map.txt:204-219`).

`AgentContextInterface` does not expose a scope manager; `scope` is the active filter (`agent.md:691`). How a caller is expected to retain `createScopeManager` beside the context is not stated as a property.

`DatabaseInterface` exposes `table(name)`, not a `tables` collection property (`database.md:294`, `:378`).

Whether `workflow.phases` and `phase.tasks` are typed as the manager interfaces in the shape braces is implied by the manager rows and the delegation text (`workflow.md:417-421`, `:468`, `:482`), not spelled as `phases: PhaseManagerInterface` in the shape cell.