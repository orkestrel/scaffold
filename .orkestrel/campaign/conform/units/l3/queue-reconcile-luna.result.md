## Question

Map every `CONFIRMED` refuter ruling against the reconciliation rules and sweep the fleet for consumers of each breaking row.

## Evidence

### `queue-obj-1`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-obj-2`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-obj-3`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-obj-4`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-obj-5`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-obj-6`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-1`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-2`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-3`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-4`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-5`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-6`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-7`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-8`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-9`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-10`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-11`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-12`

- `breaking: false`
- Fold candidate (rule 1): none; the overlapping `types.ts:275` edits remove a citation and replace a package term, so the operative changes differ.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

### `queue-subj-13`

- `breaking: true`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): `/home/user/fleet/worker/package.json:90`, `/home/user/fleet/workflow/package.json:99`, and `/home/user/fleet/agent/package.json:79` — “Then re-pin and update @orkestrel/worker, @orkestrel/workflow and @orkestrel/agent at the sites listed in the evidence.”
- Consumer-only repair (rule 3): none; the repair also edits queue source, guide, and test files.
- Breaking sweep identifiers: `QueueExecution` and `execution`.

`QueueExecution` hits:

- `/home/user/fleet/agent/src/core/helpers.ts:14,253`
- `/home/user/fleet/workflow/src/core/Runner.ts:4,356`
- `/home/user/fleet/worker/src/core/types.ts:3,44`
- `/home/user/fleet/worker/src/core/Worker.ts:2,153`
- `/home/user/fleet/worker/src/server/types.ts:2,101`
- `/home/user/fleet/worker/src/server/Dispatch.ts:1,22,38`
- `/home/user/fleet/worker/src/server/helpers.ts:1,73`
- `/home/user/fleet/worker/src/server/NodeWorker.ts:3,65`
- `/home/user/fleet/agent/guides/queue.md:74` — mirror
- `/home/user/fleet/probe/guides/queue.md:74` — mirror
- `/home/user/fleet/workflow/guides/queue.md:74` — mirror
- `/home/user/fleet/worker/guides/queue.md:74` — mirror

`execution` hits:

- `/home/user/fleet/brief/src/core/types.ts:225`
- `/home/user/fleet/brief/src/core/shapers.ts:162`
- `/home/user/fleet/brief/README.md:4`
- `/home/user/fleet/agent/src/core/helpers.ts:246,253,255`
- `/home/user/fleet/agent/src/core/factories.ts:551`
- `/home/user/fleet/browser/src/core/types.ts:383`
- `/home/user/fleet/browser/src/core/compilers.ts:85`
- `/home/user/fleet/browser/src/core/BrowserHandle.ts:7,86`
- `/home/user/fleet/browser/src/core/BrowserFrame.ts:29,266`
- `/home/user/fleet/mcp/src/core/types.ts:841,856,1626,1632,1658,1997,2088,2093,2103,2134,2157,2168,2176,2187,2252,2263,2277,2302`
- `/home/user/fleet/mcp/src/core/MCPServer.ts:807,852,898,921,924,935,949,951,1187,1537,1643`
- `/home/user/fleet/program/src/core/types.ts:158,240`
- `/home/user/fleet/program/src/core/helpers.ts:306,311,892`
- `/home/user/fleet/probe/src/server/ProbeServer.ts:189`
- `/home/user/fleet/sea/src/server/types.ts:108`
- `/home/user/fleet/tool/src/core/types.ts:137`
- `/home/user/fleet/tool/src/core/tools/ToolManager.ts:19`
- `/home/user/fleet/toolbox/src/core/factories.ts:127,141`
- `/home/user/fleet/worker/src/core/types.ts:44`
- `/home/user/fleet/worker/src/core/Worker.ts:25,153,154,156`
- `/home/user/fleet/worker/src/server/types.ts:89,90,92,101`
- `/home/user/fleet/worker/src/server/Dispatch.ts:22,38,44,71,75,79,128,178`
- `/home/user/fleet/worker/src/server/helpers.ts:45,58,66,73,76`
- `/home/user/fleet/worker/src/server/NodeWorker.ts:65`
- `/home/user/fleet/worker/src/server/handlers.ts:25,84,87,96`
- `/home/user/fleet/workflow/src/core/types.ts:434,935,1115,1137,1981,2029,2062,2465`
- `/home/user/fleet/workflow/src/core/Workflow.ts:77`
- `/home/user/fleet/workflow/src/core/helpers.ts:1159`
- `/home/user/fleet/workflow/src/core/factories.ts:107,189`
- `/home/user/fleet/workflow/src/core/phases/Phase.ts:65,302`
- `/home/user/fleet/workflow/src/core/WorkflowRunner.ts:96,178`
- `/home/user/fleet/workflow/src/core/Runner.ts:353,356,360,374`
- `/home/user/fleet/workflow/README.md:26`
- `/home/user/fleet/agent/tests/src/core/factories.test.ts:298`
- `/home/user/fleet/agent/tests/src/core/Agent.test.ts:1491,1492,1496,1596,1934`
- `/home/user/fleet/browser/tests/src/core/BrowserFrame.test.ts:219`
- `/home/user/fleet/browser/tests/src/core/BrowserScriptManager.test.ts:35`
- `/home/user/fleet/contract/tests/src/core/integration.test.ts:324`
- `/home/user/fleet/lsp/tests/mirrors/metaModel.json:7417,7425,7593,10416,10516,10995,11004,12898,13287`
- `/home/user/fleet/mcp/tests/setupConformance.ts:747,749,915,1559`
- `/home/user/fleet/mcp/tests/setupConformance.test.ts:516`
- `/home/user/fleet/mcp/tests/src/core/helpers.test.ts:295`
- `/home/user/fleet/mcp/tests/src/core/MCPProgressReporter.test.ts:484`
- `/home/user/fleet/mcp/tests/src/core/MCPLegacy.test.ts:179,236`
- `/home/user/fleet/mcp/tests/src/core/MCPServer.test.ts:1028,1029,1035,1098,1120,1128,1144,1148,1179,1207,1230,1270,1318,1391,1434,1457,1463,1484,1490,1522,1561,1583,1588,3156,3160,3187,3236,3247,3884,4083,4088,4670,5184,5352,5406,5754,5756`
- `/home/user/fleet/mcp/tests/src/server/factories.test.ts:728,733,965,975`
- `/home/user/fleet/probe/tests/src/core/validators.test.ts:268`
- `/home/user/fleet/probe/tests/src/server/ProbeServer.test.ts:48,64,363`
- `/home/user/fleet/probe/tests/src/server/stages/RuntimeStage.test.ts:359`
- `/home/user/fleet/process/tests/guides.test.ts:1125`
- `/home/user/fleet/process/tests/src/server/helpers.test.ts:1273`
- `/home/user/fleet/program/tests/setup.ts:842`
- `/home/user/fleet/tool/tests/src/core/tools/ToolManager.test.ts:123,481`
- `/home/user/fleet/toolbox/tests/src/core/factories.test.ts:942,1751,1757,1761`
- `/home/user/fleet/agent/guides/queue.md:51,75,147,148,152,191,213,262,292` — mirror
- `/home/user/fleet/probe/guides/queue.md:51,75,147,148,152,191,213,262,292` — mirror
- `/home/user/fleet/workflow/guides/queue.md:51,75,147,148,152,191,213,262,292` — mirror
- `/home/user/fleet/worker/guides/queue.md:51,75,147,148,152,191,213,262,292` — mirror
- `/home/user/fleet/agent/tests/setupPolicy.ts:193`
- `/home/user/fleet/abort/tests/setupPolicy.ts:193`
- `/home/user/fleet/brief/tests/setupPolicy.ts:193`
- `/home/user/fleet/budget/tests/setupPolicy.ts:193`
- `/home/user/fleet/browser/tests/setupPolicy.ts:193`
- `/home/user/fleet/csv/tests/setupPolicy.ts:193`
- `/home/user/fleet/codec/tests/setupPolicy.ts:193`
- `/home/user/fleet/console/tests/setupPolicy.ts:193`
- `/home/user/fleet/contract/tests/setupPolicy.ts:193`
- `/home/user/fleet/database/tests/setupPolicy.ts:193`
- `/home/user/fleet/emitter/tests/setupPolicy.ts:193`
- `/home/user/fleet/form/tests/setupPolicy.ts:193`
- `/home/user/fleet/guide/tests/setupPolicy.ts:193`
- `/home/user/fleet/html/tests/setupPolicy.ts:193`
- `/home/user/fleet/indexeddb/tests/setupPolicy.ts:193`
- `/home/user/fleet/interpret/tests/setupPolicy.ts:193`
- `/home/user/fleet/lsp/tests/setupPolicy.ts:193`
- `/home/user/fleet/markdown/tests/setupPolicy.ts:193`
- `/home/user/fleet/middleware/tests/setupPolicy.ts:193`
- `/home/user/fleet/msg/tests/setupPolicy.ts:193`
- `/home/user/fleet/ndjson/tests/setupPolicy.ts:193`
- `/home/user/fleet/ollama/tests/setupPolicy.ts:193`
- `/home/user/fleet/pool/tests/setupPolicy.ts:193`
- `/home/user/fleet/process/tests/setupPolicy.ts:193`
- `/home/user/fleet/probe/tests/setupPolicy.ts:193`
- `/home/user/fleet/program/tests/setupPolicy.ts:193`
- `/home/user/fleet/qualifier/tests/setupPolicy.ts:193`
- `/home/user/fleet/rater/tests/setupPolicy.ts:193`
- `/home/user/fleet/relation/tests/setupPolicy.ts:193`
- `/home/user/fleet/router/tests/setupPolicy.ts:193`
- `/home/user/fleet/sea/tests/setupPolicy.ts:193`
- `/home/user/fleet/server/tests/setupPolicy.ts:193`
- `/home/user/fleet/sse/tests/setupPolicy.ts:193`
- `/home/user/fleet/sqlite/tests/setupPolicy.ts:193`
- `/home/user/fleet/table/tests/setupPolicy.ts:193`
- `/home/user/fleet/template/tests/setupPolicy.ts:193`
- `/home/user/fleet/terminal/tests/setupPolicy.ts:193`
- `/home/user/fleet/test/tests/setupPolicy.ts:193`
- `/home/user/fleet/timeout/tests/setupPolicy.ts:193`
- `/home/user/fleet/tool/tests/setupPolicy.ts:193`
- `/home/user/fleet/toolbox/tests/setupPolicy.ts:193`
- `/home/user/fleet/websocket/tests/setupPolicy.ts:193`
- `/home/user/fleet/workflow/tests/setupPolicy.ts:193`
- `/home/user/scaffold/tests/setupPolicy.ts:193`

### `queue-subj-14`

- `breaking: false`
- Fold candidate (rule 1): none.
- Off-limits repair (rule 2): none.
- Consumer-only repair (rule 3): none.
- Breaking sweep: not applicable.

## Distillate

- CONFIRMED ids: `queue-obj-1`, `queue-obj-2`, `queue-obj-3`, `queue-obj-4`, `queue-obj-5`, `queue-obj-6`, `queue-subj-1`, `queue-subj-2`, `queue-subj-3`, `queue-subj-4`, `queue-subj-5`, `queue-subj-6`, `queue-subj-7`, `queue-subj-8`, `queue-subj-9`, `queue-subj-10`, `queue-subj-11`, `queue-subj-12`, `queue-subj-13`, `queue-subj-14`.
- Rule 1 flagged: none.
- Rule 2 flagged: `queue-subj-13`.
- Rule 3 flagged: none.
- Source consumer checkouts: `agent`, `workflow`, `worker`.
- Mirror hits: `agent`, `probe`, `workflow`, `worker` under `guides/queue.md`.
- Sweep paths unread: none among the existing wildcard matches.

## Unknowns

- `/home/user/fleet/queue/tests/src/core/stores/MemoryQueueStore.test.ts` after line 70.
- `/home/user/fleet/queue/tests/src/core/stores/DatabaseQueueStore.test.ts` after line 70.
- `/home/user/fleet/queue/tests/distribution.test.ts` classifier helper bodies.
- `/home/user/fleet/queue/package-lock.json`.
- `/home/user/fleet/queue/.claude/**`
- `/home/user/fleet/queue/.codex/**`
- `/home/user/fleet/queue/.cursor/**`
- `/home/user/fleet/queue/AGENTS.md`
- `/home/user/fleet/queue/CLAUDE.md`
- `/home/user/fleet/queue/.agents/**`
- `/home/user/fleet/queue/configs/**`
- `/home/user/fleet/queue/tests/setupPolicy.ts`
- `/home/user/fleet/queue/tests/policy.test.ts`
- `/home/user/fleet/queue/tests/config.test.ts`
- `/home/user/fleet/queue/.oxlintrc.json`
- `/home/user/fleet/queue/.oxfmtrc.json`
- `/home/user/fleet/queue/LICENSE`
- `/home/user/fleet/queue/guides/abort.md`
- `/home/user/fleet/queue/guides/contract.md`
- `/home/user/fleet/queue/guides/database.md`
- `/home/user/fleet/queue/guides/emitter.md`
- `/home/user/fleet/queue/guides/guide.md`
- `/home/user/fleet/queue/guides/probe.md`
- `/home/user/fleet/queue/guides/scaffold.md`
- `/home/user/fleet/queue/guides/test.md`
- `/home/user/fleet/queue/guides/timeout.md`

## Journal

Leave for the driver.

## Deviation

none