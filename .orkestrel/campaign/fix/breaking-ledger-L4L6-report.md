**Question**

For every breaking work-order row under L4, L5, and L6, name the exact published symbols the remaining repair moves, verified in current package source, so a script can compute each row’s consumer blast radius.

**Evidence**

Work order L4/L5/L6: `.orkestrel/campaign/fix/work-order.md`. Findings: `.orkestrel/campaign/fix/{brief,program,workflow,agent,ollama,toolbox}.md` under each `## <id>`. Writer notes: `.orkestrel/campaign/fix/reports/` for those packages. Agent referral `s18 ProviderDelta` has no dossier section and is absent from `referrals-middleware-report.md`; repair taken from `.orkestrel/campaign/fix/referrals.md` and the work-order row. Dossier lines are stale; symbols below are current `src/` hits under `/home/user/fleet/<package>/src/**`.

- **brief s13-28** — `BriefManagerInterface.size` `types.ts:507`; getter `BriefManager.ts:65`; factories example `factories.ts:49`. Guide `guides/brief.md:122,:600,:625`. Same tally name still on interpret / program / template managers (fleet wave, not this package).
- **brief s13-30** — `example(input, result, note?)` `helpers.ts:143`; `@param result` `:132`. Module helper `output` `:232` would be shadowed inside the body.
- **program s15-22** — `emptySums` `helpers.ts:844`, `emptyTallies` `:889`, `programDefinition` `:999`, `noticeDefinition` `:1034`, `aggregateDefinition` `:1056`; barrel `index.ts` star-exports `helpers.js`. Guide Surface / fences `guides/program.md` (`programDefinition`, `noticeDefinition`, `aggregateDefinition`, `emptySums`, `emptyTallies`; `NoticeInput` / `AggregateInput` rows).
- **program s15-23** — `copyJSONValue` `helpers.ts:69`; sole source caller inside `programDefinition`. Guide row `guides/program.md` `copyJSONValue`.
- **workflow s06-01** — `UnitOutcome` `types.ts:2388`. Guide Types row `guides/workflow.md` `UnitOutcome`.
- **workflow s06-03** — `createDeferred` `helpers.ts:1042`; `DeferredInterface` `types.ts:2542`. Guide Factories / Types rows and `Deterministic async waits with createDeferred`.
- **workflow s06-09** — barrel still exports `Phase` `index.ts:13`, `Task` `:16`, `TaskController` `:17`, `Controller` `:22`. Class exports `Phase.ts:93`, `Task.ts:69`, `TaskController.ts:36`, `Controller.ts:31`. `PhaseManager` / `TaskManager` stay barrelled `:20,:21`. Guide Surface rows `guides/workflow.md` `Phase`, `Task`, `Controller`, `TaskController`.
- **workflow s06-11** — `TaskInterface.description?: string` `types.ts:887`; `PhaseInterface.description?: string` `:1010`; `WorkflowInterface.description?: string` `:1208`. Class `declare` fields `Task.ts:70`, `Phase.ts:94`, `Workflow.ts:87`.
- **workflow s06-16** — `workflowSnapshotContext` `helpers.ts:909`. Guide Surface row and fence `guides/workflow.md`.
- **workflow s06-22** — `WorkflowFault.origin: 'persistence'` `types.ts:1788`; write site `WorkflowPersistence.ts:72`. Guide Types row `WorkflowFault`.
- **workflow s06-23** — `TaskDefinition.run` `types.ts:39`; `TaskSnapshot.run` `:480`; `TaskInterface.run` `:901`; class getter `Task.ts:218`; shape key `taskShape` `shapers.ts:40`. Guide Surface / Methods rows that name `run`.
- **workflow s06-24** — `IdleAPI` `browser/types.ts:11`; browser barrel star-exports `types.js`. Guide Type row `guides/workflow.md` `IdleAPI`.
- **agent referral s18 ProviderDelta** — `ProviderDelta.type` `types.ts:98-99` (`'content' | 'thinking'`). Ollama constructors `OllamaProvider.ts:230,:279,:286`. Same discriminant as s08-12.
- **agent s08-12** — `ProviderDelta.type` `types.ts:98-99`; `AgentChunk.type` `:791-794`. Reads `Agent.ts:731`; yield `{ type: 'token' }` `:733`; fence `factories.ts:393`. Comment half already applied. Guide Types rows `ProviderDelta`, `AgentChunk`.
- **agent s08-13** — `AgentEventMap.compactError` `types.ts:931`; emit `Agent.ts:638`. Guide `AgentEventMap` row and `emitter.on('compactError', …)`.
- **agent s08-14** — `AgentQueueOptions.allowPartial` `types.ts:1462`; `AgentRunnerOptions.allowPartial` `:1484`; factories `factories.ts:573,:622`. Guide `AgentQueueOptions` / `AgentRunnerOptions` rows.
- **agent s08-19** — `fencedFile` `helpers.ts:306`. `#fenced` already gone (s08-21). Guide Surface row `fencedFile`.
- **agent s08-22** — `CompactionState` `types.ts:865`. Guide Types row `CompactionState`. Replacement of the run holder is not shared across lanes.
- **agent s08-23** — `InstructionManagerInterface.description` `types.ts:367`, `.framing` `:376`, `.format` `:383`; class `InstructionManager.ts:76,:81,:106`. Same trio on `ContextSectionSourceInterface` `types.ts:446-450`. Private cascade already `resolveOpen` / `resolveItem` / `resolveClose`. Guide `InstructionManagerInterface` / `ContextSectionSourceInterface` rows and cascade prose.
- **agent s08-28** — `ScopeConfiguration` `types.ts:489`; `ScopeInput` extends it `:507`; `ScopeInterface.narrow(config: ScopeConfiguration)` `:533`; impl `scopes/Scope.ts:50`. Guide Types row `ScopeConfiguration`.
- **agent s08-29** — `ConversationSummarizer` `types.ts:1506`. Guide Types row `ConversationSummarizer`.
- **ollama s18-09** — `OllamaOptions.keepAlive` `types.ts:91`; `DEFAULT_KEEP_ALIVE` `constants.ts:10`; read `OllamaProvider.ts:99`; wire field `keep_alive` stays. Guide `OllamaOptions` / `DEFAULT_KEEP_ALIVE` rows `guides/ollama.md`.
- **toolbox s10-15** — `columnShape` `helpers.ts:292`, `kindShape` `:300`; caller `expandTables` `:279` (relocation companion, name unchanged). Guide Surface rows `columnShape` / `kindShape` / `expandTables`.
- **toolbox s10-21** — `workflowTag` `helpers.ts:52`, `agentTag` `:68`, `workflowToolSummary` `:121`, `terminalToolCode` `:259`. Guide Surface rows for those helpers. `databaseToolCode` `:316` and `relationToolCode` `:329` still stand (s10-18 rename remainder; not this work-order row).
- **toolbox s10-22** — `lineageOf` `helpers.ts:78`, `relationManagerOf` `:412`, `relationModelOf` `:446`, `queryOf` `:471`. Guide Surface rows for those helpers.
- **toolbox s10-25** — class `TerminalRoutes` `server/terminals/TerminalRoutes.ts:30`; `TerminalRoutesOptions` `server/types.ts:66`; factory `createTerminalRoutes` `server/factories.ts:27` kept. Server barrel `server/index.ts:4`. Guide Surface / Methods `TerminalRoutes`, `TerminalRoutesOptions`.
- **toolbox s10-26** — `Method` `server/types.ts:8`; used as `TerminalRoute.method` `:25`. Count in the description already fixed (s10-20). Guide type table `Method`.
- **toolbox s10-32** — `MAX_WORKFLOW_DEPTH` `constants.ts:69`. Guide constants table `MAX_WORKFLOW_DEPTH` (and the `AGENT_TOOL_DEPTH` sentence that names it).

Non-breaking halves already applied: agent s08-12 TSDoc clause; agent s08-21 cascade rename; toolbox s10-18 TSDoc; toolbox s10-20 Method-description count; toolbox s10-24 folder `routes/` → `terminals/`.

**Distillate**

```json
[
  {
    "package": "brief",
    "id": "s13-28",
    "kind": "rename",
    "edits": [
      { "symbol": "size", "action": "rename", "to": "count", "member": "BriefManagerInterface", "file": "src/core/types.ts:507" },
      { "symbol": "size", "action": "rename", "to": "count", "member": "BriefManager", "file": "src/core/BriefManager.ts:65" }
    ],
    "guide": "guides/brief.md BriefManagerInterface Surface row, factories fence, and BriefManager methods prose",
    "prerequisite": [],
    "summary": "Rename BriefManagerInterface.size to count on the interface and BriefManager, as one fleet tally rename with interpret, program, and template."
  },
  {
    "package": "brief",
    "id": "s13-30",
    "kind": "signature",
    "edits": [
      { "symbol": "example", "action": "change", "file": "src/core/helpers.ts:143" }
    ],
    "guide": "guides/brief.md example Surface row and fences",
    "prerequisite": [],
    "summary": "Change example to example(input, output, note?) and retag @param result to output, which also shadows the module-level output helper inside the body."
  },
  {
    "package": "program",
    "id": "s15-22",
    "kind": "rename",
    "edits": [
      { "symbol": "programDefinition", "action": "rename", "to": "buildProgramDefinition", "file": "src/core/helpers.ts:999" },
      { "symbol": "noticeDefinition", "action": "rename", "to": "buildNotice", "file": "src/core/helpers.ts:1034" },
      { "symbol": "aggregateDefinition", "action": "rename", "to": "buildAggregateDefinition", "file": "src/core/helpers.ts:1056" },
      { "symbol": "emptySums", "action": "rename", "to": "buildEmptySums", "file": "src/core/helpers.ts:844" },
      { "symbol": "emptyTallies", "action": "rename", "to": "buildEmptyTallies", "file": "src/core/helpers.ts:889" }
    ],
    "guide": "guides/program.md Surface rows and fences for programDefinition, noticeDefinition, aggregateDefinition, emptySums, emptyTallies, plus NoticeInput/AggregateInput doc text",
    "prerequisite": [],
    "summary": "Rename the helpers in place to buildProgramDefinition, buildNotice, buildAggregateDefinition, buildEmptySums, and buildEmptyTallies, scheduled with qualifier, rater, and brief."
  },
  {
    "package": "program",
    "id": "s15-23",
    "kind": "remove",
    "edits": [
      { "symbol": "copyJSONValue", "action": "remove", "file": "src/core/helpers.ts:69" }
    ],
    "guide": "guides/program.md copyJSONValue Surface row and fence",
    "prerequisite": [],
    "summary": "Delete copyJSONValue and call structuredClone at its programDefinition use; the cloners.ts keep-and-relocate alternative is not the standing DRIFT repair."
  },
  {
    "package": "workflow",
    "id": "s06-01",
    "kind": "remove",
    "edits": [
      { "symbol": "UnitOutcome", "action": "remove", "file": "src/core/types.ts:2388" }
    ],
    "guide": "guides/workflow.md UnitOutcome Types row",
    "prerequisite": [],
    "summary": "Delete UnitOutcome and type Runner.#settle from Result<TResult, unknown> using the package success/failure helpers."
  },
  {
    "package": "workflow",
    "id": "s06-03",
    "kind": "remove",
    "edits": [
      { "symbol": "createDeferred", "action": "remove", "file": "src/core/helpers.ts:1042" },
      { "symbol": "DeferredInterface", "action": "remove", "file": "src/core/types.ts:2542" }
    ],
    "guide": "guides/workflow.md createDeferred Factories row, DeferredInterface Types row, and Deterministic async waits with createDeferred",
    "prerequisite": [],
    "summary": "Delete createDeferred and DeferredInterface and use Promise.withResolvers / PromiseWithResolvers at the remaining call sites."
  },
  {
    "package": "workflow",
    "id": "s06-09",
    "kind": "remove",
    "edits": [
      { "symbol": "Phase", "action": "remove", "file": "src/core/phases/Phase.ts:93" },
      { "symbol": "Task", "action": "remove", "file": "src/core/tasks/Task.ts:69" },
      { "symbol": "TaskController", "action": "remove", "file": "src/core/tasks/TaskController.ts:36" },
      { "symbol": "Controller", "action": "remove", "file": "src/core/Controller.ts:31" }
    ],
    "guide": "guides/workflow.md Surface rows for Phase, Task, Controller, and TaskController (replace with the interfaces); INTERNAL in tests/guides.test.ts",
    "prerequisite": [],
    "summary": "Intern Phase, Task, Controller, and TaskController by dropping their core barrel rows; keep PhaseManager and TaskManager barrelled."
  },
  {
    "package": "workflow",
    "id": "s06-11",
    "kind": "mixed",
    "edits": [
      { "symbol": "description", "action": "change", "member": "TaskInterface", "file": "src/core/types.ts:887" },
      { "symbol": "description", "action": "change", "member": "PhaseInterface", "file": "src/core/types.ts:1010" },
      { "symbol": "description", "action": "change", "member": "WorkflowInterface", "file": "src/core/types.ts:1208" },
      { "symbol": "description", "action": "change", "member": "Task", "file": "src/core/tasks/Task.ts:70" },
      { "symbol": "description", "action": "change", "member": "Phase", "file": "src/core/phases/Phase.ts:94" },
      { "symbol": "description", "action": "change", "member": "Workflow", "file": "src/core/Workflow.ts:87" }
    ],
    "guide": "guides/workflow.md entity Surface/Methods rows that list description",
    "prerequisite": [],
    "summary": "Retype description to string | undefined on WorkflowInterface, PhaseInterface, and TaskInterface and implement it as a #description getter, which also changes what 'description' in entity reports when omitted."
  },
  {
    "package": "workflow",
    "id": "s06-16",
    "kind": "rename",
    "edits": [
      { "symbol": "workflowSnapshotContext", "action": "rename", "to": "locateSnapshotContext", "file": "src/core/helpers.ts:909" }
    ],
    "guide": "guides/workflow.md workflowSnapshotContext Surface row and fence",
    "prerequisite": [],
    "summary": "Rename workflowSnapshotContext to locateSnapshotContext."
  },
  {
    "package": "workflow",
    "id": "s06-22",
    "kind": "remove",
    "edits": [
      { "symbol": "origin", "action": "remove", "member": "WorkflowFault", "file": "src/core/types.ts:1788" }
    ],
    "guide": "guides/workflow.md WorkflowFault Types row",
    "prerequisite": [],
    "summary": "Drop WorkflowFault.origin; keep TaskFailure.origin."
  },
  {
    "package": "workflow",
    "id": "s06-23",
    "kind": "rename",
    "edits": [
      { "symbol": "run", "action": "rename", "to": "behavior", "member": "TaskDefinition", "file": "src/core/types.ts:39" },
      { "symbol": "run", "action": "rename", "to": "behavior", "member": "TaskSnapshot", "file": "src/core/types.ts:480" },
      { "symbol": "run", "action": "rename", "to": "behavior", "member": "TaskInterface", "file": "src/core/types.ts:901" },
      { "symbol": "run", "action": "rename", "to": "behavior", "member": "Task", "file": "src/core/tasks/Task.ts:218" },
      { "symbol": "run", "action": "rename", "to": "behavior", "member": "taskShape", "file": "src/core/shapers.ts:40" }
    ],
    "guide": "guides/workflow.md TaskDefinition/TaskSnapshot/TaskInterface rows and the run registry-key prose",
    "prerequisite": [],
    "summary": "Rename the persisted registry-key field run to behavior on TaskDefinition, TaskSnapshot, TaskInterface, Task, and taskShape, with the version bump the serialized JSON change earns."
  },
  {
    "package": "workflow",
    "id": "s06-24",
    "kind": "rename",
    "edits": [
      { "symbol": "IdleAPI", "action": "rename", "to": "IdleInterface", "file": "src/browser/types.ts:11" }
    ],
    "guide": "guides/workflow.md IdleAPI Type row",
    "prerequisite": [],
    "summary": "Rename IdleAPI to IdleInterface; the private #idleAPI verb is not a published symbol."
  },
  {
    "package": "agent",
    "id": "s18 ProviderDelta",
    "kind": "rename",
    "edits": [
      { "symbol": "type", "action": "rename", "to": "channel", "member": "ProviderDelta", "file": "src/core/types.ts:98" }
    ],
    "guide": "guides/agent.md ProviderDelta Types row",
    "prerequisite": ["s08-12"],
    "summary": "Rename ProviderDelta.type to channel; ollama constructs both union members and must move with the agent rename."
  },
  {
    "package": "agent",
    "id": "s08-12",
    "kind": "rename",
    "edits": [
      { "symbol": "type", "action": "rename", "to": "channel", "member": "ProviderDelta", "file": "src/core/types.ts:98" },
      { "symbol": "type", "action": "rename", "to": "category", "member": "AgentChunk", "file": "src/core/types.ts:791" }
    ],
    "guide": "guides/agent.md ProviderDelta and AgentChunk Types rows and every chunk.type / delta.type fence",
    "prerequisite": [],
    "summary": "Rename ProviderDelta.type to channel and AgentChunk.type to category; the false-compliance TSDoc clause is already gone."
  },
  {
    "package": "agent",
    "id": "s08-13",
    "kind": "event",
    "edits": [
      { "symbol": "compactError", "action": "rename", "member": "AgentEventMap", "file": "src/core/types.ts:931" }
    ],
    "guide": "guides/agent.md AgentEventMap row and compactError emitter fences",
    "prerequisite": [],
    "summary": "Rename the AgentEventMap compactError event; the replacement verb is not settled."
  },
  {
    "package": "agent",
    "id": "s08-14",
    "kind": "option-key",
    "edits": [
      { "symbol": "allowPartial", "action": "rename", "to": "partial", "member": "AgentQueueOptions", "file": "src/core/types.ts:1462" },
      { "symbol": "allowPartial", "action": "rename", "to": "partial", "member": "AgentRunnerOptions", "file": "src/core/types.ts:1484" }
    ],
    "guide": "guides/agent.md AgentQueueOptions and AgentRunnerOptions Types rows",
    "prerequisite": [],
    "summary": "Rename allowPartial to partial on AgentQueueOptions and AgentRunnerOptions."
  },
  {
    "package": "agent",
    "id": "s08-19",
    "kind": "rename",
    "edits": [
      { "symbol": "fencedFile", "action": "rename", "to": "renderFencedFile", "file": "src/core/helpers.ts:306" }
    ],
    "guide": "guides/agent.md fencedFile Surface row",
    "prerequisite": [],
    "summary": "Rename fencedFile to renderFencedFile; the AgentContext.#fenced call site is already gone."
  },
  {
    "package": "agent",
    "id": "s08-22",
    "kind": "remove",
    "edits": [
      { "symbol": "CompactionState", "action": "remove", "file": "src/core/types.ts:865" }
    ],
    "guide": "guides/agent.md CompactionState Types row",
    "prerequisite": [],
    "summary": "Delete CompactionState; the per-run holder that replaces its box is not shared across lanes."
  },
  {
    "package": "agent",
    "id": "s08-23",
    "kind": "rename",
    "edits": [
      { "symbol": "description", "action": "rename", "to": "open", "member": "InstructionManagerInterface", "file": "src/core/types.ts:367" },
      { "symbol": "format", "action": "rename", "to": "render", "member": "InstructionManagerInterface", "file": "src/core/types.ts:383" },
      { "symbol": "framing", "action": "rename", "member": "InstructionManagerInterface", "file": "src/core/types.ts:376" },
      { "symbol": "description", "action": "rename", "to": "open", "member": "InstructionManager", "file": "src/core/instructions/InstructionManager.ts:76" },
      { "symbol": "format", "action": "rename", "to": "render", "member": "InstructionManager", "file": "src/core/instructions/InstructionManager.ts:106" },
      { "symbol": "framing", "action": "rename", "member": "InstructionManager", "file": "src/core/instructions/InstructionManager.ts:81" },
      { "symbol": "description", "action": "rename", "to": "open", "member": "ContextSectionSourceInterface", "file": "src/core/types.ts:446" },
      { "symbol": "format", "action": "rename", "to": "render", "member": "ContextSectionSourceInterface", "file": "src/core/types.ts:450" },
      { "symbol": "framing", "action": "rename", "member": "ContextSectionSourceInterface", "file": "src/core/types.ts:448" }
    ],
    "guide": "guides/agent.md InstructionManagerInterface and ContextSectionSourceInterface rows and the build-cascade prose",
    "prerequisite": [],
    "summary": "Rename InstructionManagerInterface description to open and format to render, and rename framing; ContextSectionSourceInterface carries the same trio, and the replacement for framing is not settled."
  },
  {
    "package": "agent",
    "id": "s08-28",
    "kind": "rename",
    "edits": [
      { "symbol": "ScopeConfiguration", "action": "rename", "to": "ScopeFilter", "file": "src/core/types.ts:489" }
    ],
    "guide": "guides/agent.md ScopeConfiguration Types row (ScopeInput and ScopeInterface.narrow name it)",
    "prerequisite": [],
    "summary": "Rename ScopeConfiguration to ScopeFilter on the type and at ScopeInput, ScopeInterface.narrow, and Scope.narrow."
  },
  {
    "package": "agent",
    "id": "s08-29",
    "kind": "rename",
    "edits": [
      { "symbol": "ConversationSummarizer", "action": "rename", "to": "ConversationSummaryHandler", "file": "src/core/types.ts:1506" }
    ],
    "guide": "guides/agent.md ConversationSummarizer Types row",
    "prerequisite": [],
    "summary": "Rename ConversationSummarizer to ConversationSummaryHandler; the summarize option key stays."
  },
  {
    "package": "ollama",
    "id": "s18-09",
    "kind": "option-key",
    "edits": [
      { "symbol": "keepAlive", "action": "rename", "member": "OllamaOptions", "file": "src/server/types.ts:91" },
      { "symbol": "DEFAULT_KEEP_ALIVE", "action": "rename", "file": "src/server/constants.ts:10" }
    ],
    "guide": "guides/ollama.md OllamaOptions Surface row and DEFAULT_KEEP_ALIVE Constants row",
    "prerequisite": [],
    "summary": "Rename OllamaOptions.keepAlive and DEFAULT_KEEP_ALIVE; the replacement key is not settled, and WireChatRequest.keep_alive stays."
  },
  {
    "package": "toolbox",
    "id": "s10-15",
    "kind": "rename",
    "edits": [
      { "symbol": "columnShape", "action": "rename", "to": "compileColumn", "file": "src/core/helpers.ts:292" },
      { "symbol": "kindShape", "action": "rename", "to": "compileColumnKind", "file": "src/core/helpers.ts:300" }
    ],
    "guide": "guides/toolbox.md columnShape, kindShape, and expandTables Surface rows",
    "prerequisite": [],
    "summary": "Rename columnShape to compileColumn and kindShape to compileColumnKind and move them with expandTables into a new src/core/compilers.ts."
  },
  {
    "package": "toolbox",
    "id": "s10-21",
    "kind": "rename",
    "edits": [
      { "symbol": "workflowTag", "action": "rename", "to": "tagWorkflow", "file": "src/core/helpers.ts:52" },
      { "symbol": "agentTag", "action": "rename", "to": "tagAgent", "file": "src/core/helpers.ts:68" },
      { "symbol": "workflowToolSummary", "action": "rename", "to": "summarizeWorkflow", "file": "src/core/helpers.ts:121" },
      { "symbol": "terminalToolCode", "action": "rename", "to": "inferTerminalCode", "file": "src/core/helpers.ts:259" }
    ],
    "guide": "guides/toolbox.md Surface rows for workflowTag, agentTag, workflowToolSummary, and terminalToolCode",
    "prerequisite": [],
    "summary": "Rename workflowTag, agentTag, workflowToolSummary, and terminalToolCode to tagWorkflow, tagAgent, summarizeWorkflow, and inferTerminalCode."
  },
  {
    "package": "toolbox",
    "id": "s10-22",
    "kind": "rename",
    "edits": [
      { "symbol": "lineageOf", "action": "rename", "to": "normalizeLineage", "file": "src/core/helpers.ts:78" },
      { "symbol": "relationManagerOf", "action": "rename", "to": "resolveRelationManager", "file": "src/core/helpers.ts:412" },
      { "symbol": "relationModelOf", "action": "rename", "to": "resolveRelationModel", "file": "src/core/helpers.ts:446" },
      { "symbol": "queryOf", "action": "rename", "to": "normalizeQuery", "file": "src/core/helpers.ts:471" }
    ],
    "guide": "guides/toolbox.md Surface rows for lineageOf, relationManagerOf, relationModelOf, and queryOf",
    "prerequisite": [],
    "summary": "Rename lineageOf, relationManagerOf, relationModelOf, and queryOf to normalizeLineage, resolveRelationManager, resolveRelationModel, and normalizeQuery."
  },
  {
    "package": "toolbox",
    "id": "s10-25",
    "kind": "rename",
    "edits": [
      { "symbol": "TerminalRoutes", "action": "rename", "file": "src/server/terminals/TerminalRoutes.ts:30" },
      { "symbol": "TerminalRoutesOptions", "action": "rename", "file": "src/server/types.ts:66" }
    ],
    "guide": "guides/toolbox.md TerminalRoutes class row, TerminalRoutesOptions Types row, and createTerminalRoutes factory row",
    "prerequisite": [],
    "summary": "Rename TerminalRoutes and TerminalRoutesOptions; createTerminalRoutes stays, and the replacement pair is not settled."
  },
  {
    "package": "toolbox",
    "id": "s10-26",
    "kind": "rename",
    "edits": [
      { "symbol": "Method", "action": "rename", "to": "TerminalRouteMethod", "file": "src/server/types.ts:8" }
    ],
    "guide": "guides/toolbox.md Method type-table row",
    "prerequisite": [],
    "summary": "Rename Method to TerminalRouteMethod on the @orkestrel/toolbox/server type export."
  },
  {
    "package": "toolbox",
    "id": "s10-32",
    "kind": "rename",
    "edits": [
      { "symbol": "MAX_WORKFLOW_DEPTH", "action": "rename", "to": "WORKFLOW_CHAIN_DEPTH", "file": "src/core/constants.ts:69" }
    ],
    "guide": "guides/toolbox.md MAX_WORKFLOW_DEPTH Constants row and the AGENT_TOOL_DEPTH sentence that names it",
    "prerequisite": [],
    "summary": "Rename MAX_WORKFLOW_DEPTH to WORKFLOW_CHAIN_DEPTH."
  }
]
```

**Unknowns**

- **brief s13-30** — standing repair is `result` → `output`. Work order notes a positional parameter rename does not break a call site and that `output` shadows the module helper `output` `helpers.ts:232`.
- **program s15-23** — DRIFT deletes `copyJSONValue`. DRIFT-RESHAPE keeps one owned snapshot in a new `src/core/cloners.ts` over `structuredClone`. `"to"` omitted because the standing repair is deletion.
- **workflow s06-03** — DRIFT (heading and judge) deletes `createDeferred` / `DeferredInterface`. DRIFT-RESHAPE keeps them and routes the native `Promise.withResolvers` sites through them.
- **workflow s06-24** — type rename to `IdleInterface` is shared. Private `#idleAPI`: one lane renames it to a verb such as `#detectIdle`; the other leaves it or renames the whole noun-named private boundary family in one pass.
- **agent s18 ProviderDelta / s08-12** — same `ProviderDelta.type` → `channel` rename. Referral is the ollama-originated slice of s08-12; s08-12 also renames `AgentChunk.type`.
- **agent s08-13** — finding: `strain` or `degrade`. Work-order row uses `strain`. `"to"` omitted.
- **agent s08-22** — both lanes delete `CompactionState`. Replacement: hold run state in `#run` and change `#trim`, versus name holders in `types.ts` and keep `#trim`.
- **agent s08-23** — `description` → `open` and `format` → `render` are shared. `framing` → `format` (DRIFT) versus leave `framing` or rename to `override` (DRIFT-RESHAPE). `"to"` omitted on `framing`.
- **ollama s18-09** — finding `residency` / `DEFAULT_RESIDENCY` is rejected by the judge. One lane: fleet ruling on mirroring an external wire field (`keepAlive` as exception, or a one-word key that still names the wire concept). Other lane: drop. `"to"` omitted.
- **toolbox s10-21** — s10-18 still defers renaming `databaseToolCode` `helpers.ts:316` → `inferDatabaseCode` and `relationToolCode` `:329` → `inferRelationCode`. Those symbols are not this work-order row.
- **toolbox s10-25** — `TerminalBridge` + `TerminalBridgeOptions` versus `TerminalRouteBuilder` + `TerminalRouteOptions`. `"to"` omitted. `createTerminalRoutes` stays.
- **toolbox s10-32** — DRIFT-RESHAPE (heading) names `WORKFLOW_CHAIN_DEPTH`. DRIFT stands with the finding’s `WORKFLOW_TOOL_DEPTH`.

**Deviation**

The brief names `referrals-middleware-report.md` for every `referral …` row. L4–L6 has one referral, `agent referral s18 ProviderDelta`, which is not in that file; the repair was taken from `.orkestrel/campaign/fix/referrals.md` and the work-order row. Read-only; no edits. Scaffold `src/` is not the home of these packages; symbols were verified under `/home/user/fleet/<package>/src/**` as the brief names.
