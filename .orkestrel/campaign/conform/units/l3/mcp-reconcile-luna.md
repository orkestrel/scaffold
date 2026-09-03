The brief requires a read-only reconciliation and a bounded fleet sweep. I’m checking the ruling record and every named sweep root before applying its four rules.## Question

Map every `CONFIRMED` refuter ruling against the four reconciliation rules and sweep the specified fleet paths for breaking identifiers.

## Evidence

### `mcp-obj-1` — breaking: true

- Fold candidate: `mcp-obj-1`; `mcp-subj-3` states: “Carry mcp-obj-1 with this finder's fuller repair text folded in, and strike this id.”
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep — `MCP_WEBSOCKET_SUBPROTOCOL`: `/home/user/fleet/probe/guides/mcp.md:2809,3098,3147,3163` (mirror). No source consumer.

### `mcp-obj-2` — breaking: false

- Fold candidate: none.
- Off-limits repair: none; the repair changes the `prepublishOnly` script, not dependency or version fields.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `mcp-obj-3` — breaking: false

- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `mcp-obj-4` — breaking: false

- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `mcp-obj-5` — breaking: false

- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `mcp-subj-1` — breaking: true

- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep — `capacity`:
  - `/home/user/fleet/pool/src/core/Pool.ts:8,59`
  - `/home/user/fleet/pool/src/core/factories.ts:5`
  - `/home/user/fleet/pool/src/core/types.ts:62`
  - `/home/user/fleet/console/src/core/loggers/Logger.ts:148`
  - `/home/user/fleet/middleware/src/core/middlewares.ts:558,559,560,561,563,576,589,718`
  - `/home/user/fleet/middleware/src/core/types.ts:225,234,242,488,491,511,552,556,562`
  - `/home/user/fleet/middleware/src/core/stores/MemorySessionStore.ts:14,29,32,45,51,52,53,54,57,66,101,103,110`
  - `/home/user/fleet/msg/src/core/MSG.ts:377,378,500,695,698,699,701,704`
  - `/home/user/fleet/server/src/server/types.ts:357,383,396,399`
  - `/home/user/fleet/server/src/server/Stream.ts:22`
  - `/home/user/fleet/contract/src/core/JSONCloner.ts:58`
  - `/home/user/fleet/pool/tests/src/core/Pool.test.ts:260,495,744,761`
  - `/home/user/fleet/pool/tests/guides.test.ts:198`
  - `/home/user/fleet/middleware/tests/src/core/middlewares.test.ts:959,986,1018,1085,1086,1234,1236,1480,1485,1498`
  - `/home/user/fleet/middleware/tests/src/core/stores/MemorySessionStore.test.ts:119,130,131,140,145,152,154,162,172,173,174`
  - `/home/user/fleet/msg/tests/src/core/MSG.test.ts:193`
  - `/home/user/fleet/worker/tests/src/core/Worker.test.ts:1126`
  - `/home/user/fleet/ollama/tests/service/tools.test.ts:308`
  - `/home/user/fleet/probe/guides/mcp.md:1054,1061,1090,1818,2176,2434,2645,2647,2665,2719,3451,4498,4628,4804,5152,5171,5190,5191,5195` (mirror)
  - `/home/user/fleet/pool/README.md:3`

### `mcp-subj-2` — breaking: true

- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep — `now`:
  - `/home/user/fleet/console/src/core/types.ts:282,820`
  - `/home/user/fleet/console/src/server/types.ts:126`
  - `/home/user/fleet/console/src/server/ProcessCapture.ts:252`
  - `/home/user/fleet/console/src/core/Capture.ts:166`
  - `/home/user/fleet/console/src/core/loggers/Logger.ts:142`
  - `/home/user/fleet/database/src/core/Table.ts:575`
  - `/home/user/fleet/database/src/core/helpers.ts:272,356`
  - `/home/user/fleet/form/src/core/helpers.ts:498,500`
  - `/home/user/fleet/table/src/core/types.ts:335,338,628,702,794,819,840`
  - `/home/user/fleet/table/src/core/tables/KeyManager.ts:40`
  - `/home/user/fleet/table/src/core/tables/SelectionManager.ts:28`
  - `/home/user/fleet/table/src/core/tables/ExpansionManager.ts:28`
  - `/home/user/fleet/middleware/src/core/middlewares.ts:154,160,579,586,604,610,612,617,619,712,726,729`
  - `/home/user/fleet/middleware/src/core/helpers.ts:55,56,64,65,74,75,83,84,529,532,543,546,547`
  - `/home/user/fleet/middleware/src/core/types.ts:231,364,380,381,504`
  - `/home/user/fleet/middleware/src/core/stores/DatabaseSessionStore.ts:46,72,75,81,85,88,89`
  - `/home/user/fleet/reason/src/core/reasoners/SymbolicReasoner.ts:161`
  - `/home/user/fleet/contract/src/core/ContractCompiler.ts:2046,2048,2051`
  - `/home/user/fleet/contract/src/core/constants.ts:229`
  - `/home/user/fleet/test/src/core/helpers.ts:123,130,169,176,208`
  - `/home/user/fleet/test/src/browser/helpers.ts:884`
  - `/home/user/fleet/test/src/server/helpers.ts:104,303,420,431`
  - `/home/user/fleet/terminal/src/core/types.ts:262`
  - `/home/user/fleet/terminal/src/core/Prompt.ts:92`
  - `/home/user/fleet/server/src/server/types.ts:580,590,592`
  - `/home/user/fleet/server/src/server/Server.ts:282,307,326`
  - `/home/user/fleet/server/src/server/helpers.ts:404,428,522`
  - `/home/user/fleet/sea/src/server/seals/SEA.ts:91,107`
  - `/home/user/fleet/sea/src/server/injectors/Injector.ts:902`
  - `/home/user/fleet/router/src/browser/types.ts:108`
  - `/home/user/fleet/router/src/browser/Navigator.ts:54`
  - `/home/user/fleet/process/src/server/processes/ProcessManager.ts:122`
  - `/home/user/fleet/probe/src/server/stages/RuntimeStage.ts:152,163,180,248`
  - `/home/user/fleet/probe/src/server/stages/TypeStage.ts:134,189`
  - `/home/user/fleet/probe/src/server/Probe.ts:141,160`
  - `/home/user/fleet/probe/src/server/stages/LintStage.ts:115,124`
  - `/home/user/fleet/emitter/src/core/factories.ts:26`
  - `/home/user/fleet/browser/src/server/helpers.ts:363,365,367,386`
  - `/home/user/fleet/browser/src/core/parsers.ts:377`
  - `/home/user/fleet/browser/src/core/compilers.ts:27,36,449,460,483,494,517,533,556,572`
  - `/home/user/fleet/browser/src/core/BrowserClock.ts:35`
  - `/home/user/fleet/browser/src/core/BrowserHARManager.ts:101,157,179,228`
  - `/home/user/fleet/browser/src/core/BrowserNetworkManager.ts:183,253`
  - `/home/user/fleet/browser/src/server/Browser.ts:498,1062,1071`
  - `/home/user/fleet/brief/src/core/helpers.ts:778,797,868`
  - `/home/user/fleet/agent/src/core/types.ts:1214,1277`
  - `/home/user/fleet/agent/src/core/factories.ts:476`
  - `/home/user/fleet/agent/src/core/conversations/Conversation.ts:238`
  - `/home/user/fleet/agent/src/core/Authority.ts:29`
  - `/home/user/fleet/agent/src/core/Agent.ts:370,552,615,642`
  - `/home/user/fleet/console/tests/src/core/Capture.test.ts:69,74`
  - `/home/user/fleet/database/tests/src/browser/drivers/IndexedDBDriver.test.ts:1661`
  - `/home/user/fleet/database/tests/src/core/Table.test.ts:431`
  - `/home/user/fleet/database/tests/src/core/helpers.test.ts:219,345,347`
  - `/home/user/fleet/reason/tests/src/core/reasoners/QuantitativeReasoner.test.ts:963`
  - `/home/user/fleet/reason/tests/src/core/helpers.test.ts:191,1742`
  - `/home/user/fleet/reason/tests/src/core/reasoners/LogicalReasoner.test.ts:34`
  - `/home/user/fleet/reason/tests/src/core/reasoners/InferentialReasoner.test.ts:1649`
  - `/home/user/fleet/markdown/tests/src/core/parsers.test.ts:624,626`
  - `/home/user/fleet/process/tests/src/server/processes/Process.test.ts:567,569`
  - `/home/user/fleet/process/tests/src/server/helpers.test.ts:485,491,533,535,672,676`
  - `/home/user/fleet/middleware/tests/setup.ts:230,232,234,237`
  - `/home/user/fleet/middleware/tests/src/core/middlewares.test.ts:1267,1270,1286,1288,1316,1347,1466,1467,1469,1535`
  - `/home/user/fleet/middleware/tests/src/core/stores/DatabaseSessionStore.test.ts:16`
  - `/home/user/fleet/middleware/tests/src/core/stores/MemorySessionStore.test.ts:8,70,101`
  - `/home/user/fleet/template/tests/src/core/helpers.test.ts:198,200,234,236`
  - `/home/user/fleet/contract/tests/setup.ts:719,722,1167,1169,1194,1753`
  - `/home/user/fleet/contract/tests/src/core/ShapeCloner.test.ts:775,817,1152,1154`
  - `/home/user/fleet/contract/tests/src/core/integration.test.ts:739`
  - `/home/user/fleet/contract/tests/src/core/helpers.test.ts:2534,2536,2537,2539,2833,2835`
  - `/home/user/fleet/contract/tests/src/core/compilers.test.ts:194,297,388,428,487,1492,1495,1561`
  - `/home/user/fleet/contract/tests/src/core/validators.test.ts:475`
  - `/home/user/fleet/contract/tests/src/core/combinators.test.ts:1192`
  - `/home/user/fleet/contract/tests/src/core/inferers.test.ts:1022,1024,1039,1041,1309,1998,2003,2025,2027,2045,2073,2075,2079,2087`
  - `/home/user/fleet/contract/tests/src/core/SchemaCloner.test.ts:485,490,495`
  - `/home/user/fleet/contract/tests/src/core/JSONCloner.test.ts:569,571`
  - `/home/user/fleet/sse/tests/src/core/SSEParser.test.ts:223,411`
  - `/home/user/fleet/test/tests/src/browser/helpers.test.ts:209`
  - `/home/user/fleet/test/tests/src/core/helpers.test.ts:68,70`
  - `/home/user/fleet/test/tests/src/server/helpers.test.ts:1059,1065`
  - `/home/user/fleet/workspace/tests/src/core/workspaces/WorkspaceManager.test.ts:373`
  - `/home/user/fleet/workspace/tests/src/core/workspaces/Workspace.test.ts:589,591`
  - `/home/user/fleet/workflow/tests/src/server/factories.test.ts:17,20`
  - `/home/user/fleet/workflow/tests/src/server/NodeScheduler.test.ts:69,77,81`
  - `/home/user/fleet/workflow/tests/src/core/tasks/Task.test.ts:283,836`
  - `/home/user/fleet/workflow/tests/src/core/shapers.test.ts:200`
  - `/home/user/fleet/workflow/tests/src/core/phases/PhaseManager.test.ts:90,126,148,155,176`
  - `/home/user/fleet/workflow/tests/src/core/Runner.test.ts:187`
  - `/home/user/fleet/workflow/tests/src/core/helpers.test.ts:283,294,630,1517`
  - `/home/user/fleet/workflow/tests/src/core/Scheduler.test.ts:78,82`
  - `/home/user/fleet/workflow/tests/src/core/factories.test.ts:760,762`
  - `/home/user/fleet/workflow/tests/src/browser/FrameScheduler.test.ts:89,91`
  - `/home/user/fleet/workflow/tests/src/browser/IdleScheduler.test.ts:94,96`
  - `/home/user/fleet/workflow/tests/src/browser/factories.test.ts:19,21,56,58,93,95`
  - `/home/user/fleet/workflow/tests/src/browser/BrowserScheduler.test.ts:112,114`
  - `/home/user/fleet/workflow/tests/setup.test.ts:310,312`
  - `/home/user/fleet/worker/tests/src/server/helpers.test.ts:206,250`
  - `/home/user/fleet/worker/tests/src/server/fixtures/identify.ts:13,14`
  - `/home/user/fleet/worker/tests/src/server/fixtures/slow.ts:10,12`
  - `/home/user/fleet/worker/tests/src/core/Worker.test.ts:851`
  - `/home/user/fleet/toolbox/tests/src/server/factories.test.ts:326,860`
  - `/home/user/fleet/toolbox/tests/src/core/factories.test.ts:3944,3948`
  - `/home/user/fleet/tool/tests/src/core/helpers.test.ts:28,34`
  - `/home/user/fleet/browser/tests/src/server/helpers.test.ts:343,345,358,364`
  - `/home/user/fleet/browser/tests/src/server/Browser.test.ts:378,384,2067,2069`
  - `/home/user/fleet/browser/tests/src/core/BrowserPage.test.ts:193,197,276,280,305,314`
  - `/home/user/fleet/browser/tests/src/core/CDPClient.test.ts:162,166`
  - `/home/user/fleet/brief/tests/src/core/helpers.test.ts:942`
  - `/home/user/fleet/brief/tests/src/core/BriefCompiler.test.ts:581`
  - `/home/user/fleet/agent/tests/src/core/integration.test.ts:105`
  - `/home/user/fleet/agent/tests/src/core/helpers.test.ts:473`
  - `/home/user/fleet/agent/tests/src/core/factories.test.ts:58`
  - `/home/user/fleet/agent/tests/src/core/AgentRegistry.test.ts:84,87,94`
  - `/home/user/fleet/agent/tests/src/core/AgentContext.test.ts:955,1202,1296`
  - `/home/user/fleet/agent/tests/src/core/conversations/Conversation.test.ts:139,412`
  - `/home/user/fleet/agent/tests/src/core/Agent.test.ts:1048,1202,2780,3129`
  - `/home/user/fleet/markdown/tests/setup.ts:192`
  - `/home/user/fleet/abort/tests/guides.test.ts:227`
  - `/home/user/fleet/tool/tests/guides.test.ts:202,204,209,211,225`
  - `/home/user/fleet/README.md` matches: `/home/user/fleet/abort/README.md:34`, `/home/user/fleet/emitter/README.md:42`, `/home/user/fleet/workflow/README.md:37`
  - `/home/user/scaffold/src/server/Materializer.ts:455`
  - No `now` matches under `/home/user/scaffold/tests`.

### `mcp-subj-3` — breaking: true

- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: identical to `mcp-obj-1`; `MCP_WEBSOCKET_SUBPROTOCOL` occurs only in `/home/user/fleet/probe/guides/mcp.md:2809,3098,3147,3163` (mirror). No source consumer.

### `mcp-subj-4` — breaking: true

- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep:
  - `isFormElicitationSupported`: `/home/user/fleet/probe/guides/mcp.md:1353,1405,1406,2240` (mirror).
  - `isTaskSupported`: `/home/user/fleet/probe/guides/mcp.md:1630,1658,2257` (mirror).
  - No source consumer.

### `mcp-subj-5` — breaking: false

- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `mcp-subj-6` — breaking: false

- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

### `mcp-subj-7` — breaking: true

- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep — `MCPCompletionManagerInterface`: `/home/user/fleet/probe/guides/mcp.md:569,649,704,2381,3425,4852,5416,5429` (mirror). No source consumer.

### `mcp-subj-8` — breaking: true

- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep:
  - `defer`:
    - `/home/user/fleet/html/src/core/helpers.ts:724`
    - `/home/user/fleet/probe/src/core/validators.ts:47`
    - `/home/user/fleet/browser/src/server/Browser.ts:441`
    - `/home/user/fleet/html/tests/setup.ts:636`
    - `/home/user/fleet/html/tests/src/core/helpers.test.ts:706`
    - `/home/user/fleet/terminal/tests/src/core/PromptClient.test.ts:63,166,194,249`
    - `/home/user/fleet/terminal/tests/setup.test.ts:170`
    - `/home/user/fleet/terminal/tests/setup.ts:96,107,113,128`
    - `/home/user/fleet/lsp/tests/src/core/LSPClient.test.ts:32,49,57,86,1581,1614`
    - `/home/user/fleet/browser/tests/src/server/Browser.test.ts:1136,1160,1169,1183`
    - `/home/user/fleet/probe/guides/mcp.md:1598,1605,1651,1685,1728,1784,1785,2415,2418,3384` (mirror)
  - `listen`:
    - `/home/user/fleet/test/src/server/factories.ts:150`
    - `/home/user/fleet/server/src/server/types.ts:501,528,535,538,619`
    - `/home/user/fleet/server/src/server/Server.ts:212,381,397,399`
    - `/home/user/fleet/server/src/server/helpers.ts:1484,1505`
    - `/home/user/fleet/router/src/server/handlers.ts:87`
    - `/home/user/fleet/emitter/src/core/types.ts:50,58`
    - `/home/user/fleet/websocket/tests/setup.ts:71,91`
    - `/home/user/fleet/workflow/tests/distribution.test.ts:582`
    - `/home/user/fleet/test/tests/src/server/factories.test.ts:1091,1143,1148`
    - `/home/user/fleet/test/tests/distribution.test.ts:582`
    - `/home/user/fleet/server/tests/src/server/Server.test.ts:21`
    - `/home/user/fleet/server/tests/src/server/helpers.test.ts:1030`
    - `/home/user/fleet/server/tests/setupServer.ts:146,160`
    - `/home/user/fleet/router/tests/distribution.test.ts:582`
    - `/home/user/fleet/indexeddb/tests/distribution.test.ts:582`
    - `/home/user/fleet/database/tests/distribution.test.ts:582`
    - `/home/user/fleet/console/tests/distribution.test.ts:582`
    - `/home/user/fleet/browser/tests/src/server/Browser.test.ts:1576,1615,1810,1848,2051,2086`
    - `/home/user/fleet/browser/tests/setupServer.test.ts:58,71,156`
    - `/home/user/fleet/browser/tests/setupServer.ts:38,120,177,296,694`
    - `/home/user/fleet/sea/README.md:182`
    - `/home/user/fleet/probe/guides/mcp.md:15,531,605,891,936,937,938,949,955,959,965,1033,1064,1088,1789,1790,1861,1885,1941,2181,2239,2335,2430,2433,2438,2452,2464,3347,3439,3451,3532,4230,4350,4363,4381,4384,4394,4560,4564,4599,4605,4616,4765,4788,5375` (mirror)
    - `/home/user/scaffold/src/core/templates.ts:1933`
    - No `listen` matches under `/home/user/scaffold/tests`.

### `mcp-subj-9` — breaking: false

- Fold candidate: none.
- Off-limits repair: none.
- Consumer-only repair: none.
- Breaking sweep: not applicable.

## Distillate

- CONFIRMED ids: `mcp-obj-1`, `mcp-obj-2`, `mcp-obj-3`, `mcp-obj-4`, `mcp-obj-5`, `mcp-subj-1`, `mcp-subj-2`, `mcp-subj-3`, `mcp-subj-4`, `mcp-subj-5`, `mcp-subj-6`, `mcp-subj-7`, `mcp-subj-8`, `mcp-subj-9`.
- Rule 1 flags `mcp-subj-3` for folding into carrier `mcp-obj-1`.
- Rule 2 flags none.
- Rule 3 flags none.
- Source-consumer checkouts with textual breaking-identifier hits: `agent`, `abort`, `browser`, `brief`, `contract`, `console`, `database`, `emitter`, `form`, `html`, `indexeddb`, `lsp`, `markdown`, `middleware`, `msg`, `ollama`, `pool`, `process`, `probe`, `queue`, `reason`, `router`, `sea`, `server`, `sse`, `table`, `terminal`, `test`, `template`, `timeout`, `tool`, `toolbox`, `worker`, `workflow`, `workspace`, and `scaffold`.
- The `probe/guides/mcp.md` hits are vendored mirrors, not source consumers.
- No source hit names an MCP breaking API consumer outside the `mcp` checkout.

## Unknowns

None. All named ruling and sweep paths were readable.

## Journal

Leave for the driver.

## Deviation

none