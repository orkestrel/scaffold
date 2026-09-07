# Brief — P.1 `d7n-agent-prep` (agent's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`implementer` on Claude Opus 5: a fully specified unit. Sole writer in `/home/user/fleet/agent` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `d1b3804`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

agent's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== agent 2026-09-07T16:43:52Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
86:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 822ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### agent (d1b3804, version 0.0.20, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 27 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setup.ts(33)
   tests/src/core/Agent.test.ts(9)
   tests/src/core/AgentContext.test.ts(6)
   tests/src/core/factories.test.ts(3)
   tests/src/core/conversations/Conversation.test.ts(3)
   tests/src/core/integration.test.ts(1)
   tests/src/core/helpers.test.ts(1)
   tests/src/core/AgentRegistry.test.ts(1)
-- docs
   guides/agent.md interface ConversationStoreInterface: guide absent source "Persists a `ConversationSnapshot` durably — three async primitives (`get` / `set` / `delete`) keyed by a conversation id, the exact analogue of `import('@orkestrel/workspace').WorkspaceStoreInterface`."
   guides/agent.md interface ConversationSnapshotRow: guide absent source "Represents one row of the table a `import('./conversations/stores/DatabaseConversationStore.js').DatabaseConversationStore` persists — a conversation `id` plus its `ConversationSnapshot` held as ONE OPAQUE JSON column. The exact analogue of `import('@orkestrel/workspace').WorkspaceSnapshotRow`."
   guides/agent.md ProviderInterface.generate: guide absent source "Generates one complete turn — resolves the assembled `ProviderResult`."
   guides/agent.md ProviderInterface.stream: guide absent source "Streams one turn — yields `ProviderDelta`s (channel-tagged `content` / `thinking` chunks) as they arrive and RETURNS the assembled `ProviderResult` (the concatenated content + any separated reasoning + any tool calls + any usage) when the stream completes."
   guides/agent.md ThinkSplitterInterface.split: guide absent source "Feeds one raw delta; returns the clean (non-think) content to surface for it."
   guides/agent.md ThinkSplitterInterface.flush: guide absent source "Settles the stream end — returns any held clean tail; an unclosed think span lands on `thinking`."
   guides/agent.md MessageManagerInterface.add: guide absent source absent
   guides/agent.md MessageManagerInterface.message: guide absent source absent
   guides/agent.md MessageManagerInterface.messages: guide absent source absent
   guides/agent.md MessageManagerInterface.remove: guide absent source absent
   guides/agent.md MessageManagerInterface.clear: guide absent source absent
   guides/agent.md InstructionManagerInterface.add: guide absent source absent
   guides/agent.md InstructionManagerInterface.instruction: guide absent source absent
   guides/agent.md InstructionManagerInterface.instructions: guide absent source "Lists every instruction, sorted by descending `priority` (stable for equal priorities)."
   guides/agent.md InstructionManagerInterface.render: guide absent source "Renders one instruction for the prompt — its `content`."
   guides/agent.md InstructionManagerInterface.remove: guide absent source absent
   guides/agent.md InstructionManagerInterface.clear: guide absent source absent
   guides/agent.md ContextSectionSourceInterface.render: guide absent source "Renders one item (already resolved against the manager-options override)."
   guides/agent.md ScopeInterface.narrow: guide absent source "Composes a tighter child scope — its per-category set is the intersection of this scope's list and `config`'s (an `undefined` side imposing no constraint)."
   guides/agent.md ScopeManagerInterface.create: guide absent source absent
   guides/agent.md ScopeManagerInterface.scope: guide absent source absent
   guides/agent.md ScopeManagerInterface.scopes: guide absent source "Lists every scope, in insertion order."
   guides/agent.md ScopeManagerInterface.remove: guide absent source absent
   guides/agent.md ScopeManagerInterface.clear: guide absent source absent
   guides/agent.md AgentContextInterface.apply: guide absent source "Applies the active per-turn scope filter. Passing `undefined` removes filtering."
   guides/agent.md AgentContextInterface.build: guide absent source "Builds the provider input for the next turn: a leading `system` message folding the prompt + the scoped instructions + the ACTIVE workspace's scoped-in TEXT files (rendered as fenced reference blocks), then the ACTIVE conversation's `view()` (with the active workspace's scoped-in IMAGE files' `base64` payload attached to the last user message). Tools are advertised structurally, not in the prompt. Built fresh on each call."
   guides/agent.md AgentInterface.generate: guide absent source "Runs the turn to completion, discarding the live chunks — drains the shared stream and resolves the settled outcome."
   guides/agent.md AgentInterface.stream: guide absent source "Runs the turn as a live stream — iterate `events` for `AgentChunk`s and `await result` for the settled outcome."
   guides/agent.md AgentInterface.abort: guide absent source "Cancels the in-flight turn — fires the turn's signal; the `result` settles `partial: true` with whatever content accumulated."
   guides/agent.md ChannelInterface.push: guide absent source "Writes one value — buffered, then handed to a parked consumer."
   guides/agent.md ChannelInterface.close: guide absent source "Ends the channel normally — a draining consumer returns once the buffer is empty."
   guides/agent.md ChannelInterface.fail: guide absent source "Ends the channel with a failure — a draining consumer throws it once the buffer is empty."
   guides/agent.md ChannelInterface.drain: guide absent source "Reads the values back live, in write order."
   guides/agent.md AuthorityInterface.evaluate: guide absent source "Evaluates one tool call against the ordered rules."
   guides/agent.md AgentRegistryInterface.provider: guide absent source "Resolves a registered `ProviderInterface` by name."
   guides/agent.md AgentRegistryInterface.tool: guide absent source "Resolves a registered `ToolInterface` by name."
   guides/agent.md AgentRegistryInterface.authority: guide absent source "Resolves a registered `AuthorityInterface` by name."
   guides/agent.md AgentRegistryInterface.scheduler: guide absent source "Resolves a registered `SchedulerInterface` by name."
   guides/agent.md AgentRegistryInterface.build: guide absent source "Rehydrates a live, seeded `AgentInterface` from a serializable job — resolving its names, rebuilding its budget, seeding its conversation, and wiring `signal`."
   guides/agent.md ConversationInterface.add: guide absent source "Appends one message to the live tail (or a batch) — MINTS each message's `id` (a random UUID) and returns the created message(s); a stored message is immutable."
   guides/agent.md ConversationInterface.message: guide absent source "Looks up one LIVE message by id."
   guides/agent.md ConversationInterface.messages: guide absent source "Lists every LIVE (uncompacted) message in the tail, in insertion order."
   guides/agent.md ConversationInterface.remove: guide absent source "Removes one LIVE message by id (or a batch) from the tail."
   guides/agent.md ConversationInterface.clear: guide absent source "Empties the live tail (the compacted `sections` are untouched)."
   guides/agent.md ConversationInterface.view: guide absent source "Builds the model input for the next turn — each section as ONE synthetic summary message, then the live messages verbatim (the rollup `summary` is NOT injected)."
   guides/agent.md ConversationInterface.compact: guide absent source "Folds the older live messages into a summarized `Section`, regenerates the rollup, and emits `summary` then `compact`."
   guides/agent.md ConversationInterface.rehydrate: guide absent source "Returns a section's full original messages — a pure READ that emits `rehydrate`."
   guides/agent.md ConversationInterface.search: guide absent source "Searches `content` for a case-insensitive substring across ALL messages — every section's retained originals plus the live tail."
   guides/agent.md ConversationInterface.reference: guide absent source "Renders THIS conversation as a self-labeled, fenced PROVENANCE block to pull INTO another conversation — a pure string (NO model call), framed so a small model reads it as FOREIGN material, not as part of the live thread."
   guides/agent.md ConversationInterface.snapshot: guide absent source "Serializes this conversation to a plain, JSON-serializable `ConversationSnapshot` — its `id`, the rollup `summary`, the compacted `sections`, and the live tail (its `messages()`)."
   guides/agent.md ConversationManagerInterface.conversation: guide absent source absent
   guides/agent.md ConversationManagerInterface.conversations: guide absent source absent
   guides/agent.md ConversationManagerInterface.add: guide absent source absent
   guides/agent.md ConversationManagerInterface.switch: guide absent source absent
   guides/agent.md ConversationManagerInterface.open: guide absent source "Resolves a conversation by id, ACTIVATING it — from the registry if present, else HYDRATED from the optional `ConversationStoreInterface` (`store`)."
   guides/agent.md ConversationManagerInterface.save: guide absent source "Persists a REGISTERED conversation's `ConversationInterface.snapshot` to the optional `ConversationStoreInterface` (`store`)."
   guides/agent.md ConversationManagerInterface.remove: guide absent source absent
   guides/agent.md ConversationManagerInterface.clear: guide absent source absent
   guides/agent.md pitch: readme absent tagline "The conversation runtime for the `@orkestrel` line. An agent is a conversation with a model and the loop that carries it forward. `ProviderInterface` is the single pluggable inference boundary: hand it a conversation and get back one assembled `ProviderResult` (`generate`), or a live stream of channel-tagged `ProviderDelta`s that returns that same assembled result when it ends (`stream`). Around that boundary this package owns everything a conversation is made of — messages, conversations and their compaction, instructions, scopes, prompt assembly, reasoning separation, the authority gate, durable jobs, and the bounded context → provider → tools → repeat loop. Source: `src/core`. Published through `@orkestrel/agent`. The model is the one thing this package does not supply. `ProviderInterface` is a contract, not an implementation: any backend that satisfies it drops in unchanged, and the host application decides which one. Nor is there hidden global state, a plugin lifecycle, a prompt-template DSL, or an implicit memory store. This is a kit of composable primitives: the loop is the convenient way to use them, not the only one, and a caller that would rather bound and drive a provider by hand can skip it entirely. Tools and files are borrowed, not owned. Callable tools come from `@orkestrel/tool`: the loop advertises their definitions to the model, dispatches the calls that come back, and feeds each `ToolResult` in as a tool message. A tool is loop machinery — it is never rendered into the prompt. Documents come from `@orkestrel/workspace`: the context renders the active workspace into every turn, split by carrier — text as fenced reference blocks in the system message, images attached to the last user turn. That split is this package's own product policy, decided here because only the prompt-assembly layer knows what a turn looks like. A turn is bounded and always terminates. One `AbortSignal` — a cancel, a timeout, and a budget folded together through `AbortSignal.any` — bounds the whole run, and tool iteration is capped at `limit`. A cancel is not an error: it commits a partial `AgentResult` that resolves, so only a genuine provider or tool failure rejects. `generate` and `stream` share one private run, so the one-shot result can never diverge from the live stream, and a buggy observer cannot corrupt either, because the emitter isolates a listener's throw."
   rows read: 1, disagreements found: 190
   exit 1
-- check
   tests/guides.test.ts(102,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(105,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(109,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(124,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(139,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯ Failed Tests 54 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  54 failed | 37 passed (91)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 57 | summary 31 | banned 26 | tests/setup.ts(33) tests/src/core/Agent.test.ts(9) tests/src/core/AgentContext.test.ts(6) tests/src/core/factories.test.ts(3) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for agent (taken 2026-09-07T16:44Z by facts.sh)

- Checkout `/home/user/fleet/agent`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `d1b3804`, status: clean
- `package.json`: version `0.0.20`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 57 | summary 31 | banned 26 | tests/setup.ts(33) tests/src/core/Agent.test.ts(9) tests/src/core/AgentContext.test.ts(6) tests/src/core/factories.test.ts(3) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept | Spec                   | Source                    | Tests                                 |
    8:| ------- | ---------------------- | ------------------------- | ------------------------------------- |
    9:| Agent   | [`agent.md`](agent.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                  |
    14:| ---------- | ---------------------- |
    15:| `src/core` | [`agent.md`](agent.md) |
- Guide `guides/agent.md`: 1141 lines. Headings:
    1:# Agent
    13:## Surface
    210:#### Conversations & compaction
    269:##### One agent, many conversations (switching the active conversation)
    298:##### Production behaviors of automatic compaction
    312:#### Scoping a turn
    337:#### Customizing the format (the cascade)
    375:### Factories
    396:### Entities
    415:### Constants
    429:### Helpers
    483:### Validators
    502:### Errors
    515:### Types
    581:## Methods
    585:#### `ProviderInterface`
    594:#### `ThinkSplitterInterface`
    603:#### `MessageManagerInterface`
    615:#### `InstructionManagerInterface`
    628:#### `ContextSectionSourceInterface`
    636:#### `ScopeInterface`
    644:#### `ScopeManagerInterface`
    656:#### `AgentContextInterface`
    665:#### `AgentInterface`
    675:#### `ChannelInterface`
    703:#### `AuthorityInterface`
    711:#### `AgentRegistryInterface`
    723:#### `ConversationInterface`
    741:#### `ConversationManagerInterface`
    756:## Contract
    799:## Patterns
    801:### Bounding any provider call
    823:### Dispatching the model's tool calls
    842:### Running the loop (instead of driving the provider by hand)
    861:### Bounding cost mid-stream (the token `budget`)
    880:### Observing an agent (push vs. pull)
    906:### Pulling context from ANOTHER conversation (with provenance)
    941:### Running many durable agents as jobs
    980:### Giving the model documents to read
    1000:### Switching which workspace the model sees
    1027:### Removing / clearing entries, and the less-common accessors
    1097:### Practices
    1113:## Tests
    1129:## See also
- Table headers in `guides/agent.md` (a header row is the row before a `| ---` row):
    377: | API                               | Kind     | Summary                                                                                                                                                                                                                     |
    398: | API                         | Kind  | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
    417: | API                         | Kind  | Summary                                                                                                                                                                                    |
    431: | API                    | Kind     | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
    487: | API                      | Kind     | Summary                                                                                                                                                                                                                                 |
    504: | API                    | Kind     | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
    517: | Type                            | Kind      | Shape                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
    589: | Method     | Returns                                         | Behavior                                                                                                                                                  |
    598: | Method  | Returns  | Behavior                                                                                                                                                                                       |
    607: | Method     | Returns                          | Behavior                                                                                                                         |
    619: | Method         | Returns                                                    | Behavior                                                                                                               |
    632: | Method   | Returns  | Behavior                                                                                                      |
    640: | Method   | Returns          | Behavior                                                                                                                                                                                             |
    648: | Method   | Returns                       | Behavior                                                                                              |
    660: | Method  | Returns              | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
    669: | Method     | Returns                | Behavior                                                                                                                                                            |
    679: | Method  | Returns                   | Behavior                                                                                                                               |
    707: | Method     | Returns             | Behavior                                                                                                                                                       |
    715: | Method      | Returns              | Behavior                                                                                                                                                                |
    727: | Method      | Returns                          | Behavior                                                                                                                                                                                                                                                                                                                                                                                                                                                |
    745: | Method          | Returns                                       | Behavior                                                                                                                                                                                                           |
- Rows of any `### Entities` table (the Kind cell):
    400:  `Conversation`              | class
    401:  `ConversationManager`       | class
    402:  `MemoryConversationStore`   | class
    403:  `DatabaseConversationStore` | class
    404:  `Instruction`               | class
    405:  `InstructionManager`        | class
    406:  `Scope`                     | class
    407:  `ScopeManager`              | class
    408:  `AgentContext`              | class
    409:  `Agent`                     | class
    410:  `Authority`                 | class
    411:  `AgentRegistry`             | class
    412:  `Channel`                   | class
    413:  `ThinkSplitter`             | class
- H1 blockquote (`guides/agent.md`):
    3: > **The conversation runtime for the `@orkestrel` line.** An agent is a conversation with a model and the loop that carries it forward. `ProviderInterface` is the single pluggable inference boundary: hand it a conversation and get back one assembled `ProviderResult` (`generate`), or a live stream of channel-tagged `ProviderDelta`s that returns that same assembled result when it ends (`stream`). Around that boundary this package owns everything a conversation is made of — messages, conversations and their compaction, instructions, scopes, prompt assembly, reasoning separation, the authority gate, durable jobs, and the bounded context → provider → tools → repeat loop. Source: [`src/core`](../src/core). Published through `@orkestrel/agent`.
    4: >
    5: > **The model is the one thing this package does not supply.** `ProviderInterface` is a contract, not an implementation: any backend that satisfies it drops in unchanged, and the host application decides which one. Nor is there hidden global state, a plugin lifecycle, a prompt-template DSL, or an implicit memory store. This is a kit of composable primitives: the loop is the convenient way to use them, not the only one, and a caller that would rather bound and drive a provider by hand can skip it entirely.
    6: >
    7: > **Tools and files are borrowed, not owned.** Callable tools come from [`@orkestrel/tool`](tool.md): the loop advertises their definitions to the model, dispatches the calls that come back, and feeds each `ToolResult` in as a tool message. A tool is loop machinery — it is never rendered into the prompt. Documents come from [`@orkestrel/workspace`](workspace.md): the context renders the active workspace into every turn, split by carrier — text as fenced reference blocks in the system message, images attached to the last user turn. That split is this package's own product policy, decided here because only the prompt-assembly layer knows what a turn looks like.
    8: >
    9: > **A turn is bounded and always terminates.** One `AbortSignal` — a cancel, a [timeout](timeout.md), and a [budget](budget.md) folded together through `AbortSignal.any` — bounds the whole run, and tool iteration is capped at `limit`. A cancel is not an error: it commits a partial `AgentResult` that resolves, so only a genuine provider or tool failure rejects. `generate` and `stream` share one private run, so the one-shot result can never diverge from the live stream, and a buggy observer cannot corrupt either, because the emitter isolates a listener's throw.
- Opening prose after the blockquote (first two lines):
    11: Three nouns carry a run. A `Conversation` holds the history — a live tail of immutable messages plus the sections older turns were compacted into. An `AgentContext` assembles that history into the next prompt, folding in the instructions and the active workspace and applying the active scope. An `Agent` drives that prompt through a provider, dispatches whatever tools the model asks for, feeds the results back, and repeats until the model stops. Everything else in this module either configures those three or observes them.
    13: ## Surface
- README (`README.md`) first lines:
    # @orkestrel/agent
    
    A typed **conversation runtime** for the `@orkestrel` line. An agent is a
    conversation with a model and the loop that carries it forward: messages,
    conversations and their compaction, instructions, scopes, prompt assembly, the
    authority gate, durable jobs, and a bounded context → provider → tools → repeat
    turn you can run as a one-shot `generate` or a live `stream`. The model itself
    is the one piece this package does not supply — any backend implementing
    `ProviderInterface` drops in. Callable tools come from `@orkestrel/tool` and
    documents from `@orkestrel/workspace`; the agent advertises the first to the
    model and renders the second into the prompt. Part of the `@orkestrel` line.
    
- `## Patterns` fences, each with its nearest preceding heading:
    19: fence under "## Surface"
    45: fence under "## Surface"
    70: fence under "## Surface"
    93: fence under "## Surface"
    123: fence under "## Surface"
    141: fence under "## Surface"
    169: fence under "## Surface"
    184: fence under "## Surface"
    196: fence under "## Surface"
    214: fence under "#### Conversations & compaction"
    252: fence under "#### Conversations & compaction"
    273: fence under "##### One agent, many conversations (switching the active conversation)"
    306: fence under "##### Production behaviors of automatic compaction"
    316: fence under "#### Scoping a turn"
    348: fence under "#### Customizing the format (the cascade)"
    460: fence under "### Helpers"
    472: fence under "### Helpers"
    495: fence under "### Validators"
    688: fence under "#### `ChannelInterface`"
    805: fence under "### Bounding any provider call"
    827: fence under "### Dispatching the model's tool calls"
    846: fence under "### Running the loop (instead of driving the provider by hand)"
    867: fence under "### Bounding cost mid-stream (the token `budget`)"
    884: fence under "### Observing an agent (push vs. pull)"
    912: fence under "### Pulling context from ANOTHER conversation (with provenance)"
    945: fence under "### Running many durable agents as jobs"
    968: fence under "### Running many durable agents as jobs"
    984: fence under "### Giving the model documents to read"
    1004: fence under "### Switching which workspace the model sees"
    1031: fence under "### Removing / clearing entries, and the less-common accessors"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/factories.ts:90:export function createConversation(options?: ConversationOptions): ConversationInterface {
    src/core/factories.ts:125:export function createConversationManager(
    src/core/factories.ts:163:export function createMemoryConversationStore(): ConversationStoreInterface {
    src/core/factories.ts:201:export function createDatabaseConversationStore(
    src/core/factories.ts:233:export function createInstruction(input: InstructionInput): InstructionInterface {
    src/core/factories.ts:265:export function createInstructionManager(
    src/core/factories.ts:293:export function createScope(input: ScopeInput): ScopeInterface {
    src/core/factories.ts:321:export function createScopeManager(options?: ScopeManagerOptions): ScopeManagerInterface {
    src/core/factories.ts:355:export function createAgentContext(options?: AgentContextOptions): AgentContextInterface {
    src/core/factories.ts:401:export function createAgent(provider: ProviderInterface, options?: AgentOptions): AgentInterface {
    src/core/factories.ts:432:export function createThinkSplitter(): ThinkSplitterInterface {
    src/core/factories.ts:462:export function createChannel<T>(): ChannelInterface<T> {
    src/core/factories.ts:495:export function createAuthority(options?: AuthorityOptions): AuthorityInterface {
    src/core/factories.ts:532:export function createAgentRegistry(options: AgentRegistryOptions): AgentRegistryInterface {
    src/core/factories.ts:574:export function createAgentQueue(
    src/core/factories.ts:623:export function createAgentRunner(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/core/Agent.ts:82:export class Agent implements AgentInterface {
    src/core/Channel.ts:27:export class Channel<T> implements ChannelInterface<T> {
    src/core/Authority.ts:42:export class Authority implements AuthorityInterface {
    src/core/conversations/stores/DatabaseConversationStore.ts:59:export class DatabaseConversationStore implements ConversationStoreInterface {
    src/core/conversations/stores/MemoryConversationStore.ts:41:export class MemoryConversationStore implements ConversationStoreInterface {
    src/core/conversations/ConversationManager.ts:47:export class ConversationManager implements ConversationManagerInterface {
    src/core/conversations/Conversation.ts:66:export class Conversation implements ConversationInterface {
    src/core/instructions/Instruction.ts:24:export class Instruction implements InstructionInterface {
    src/core/instructions/InstructionManager.ts:50:export class InstructionManager implements InstructionManagerInterface {
    src/core/AgentContext.ts:97:export class AgentContext implements AgentContextInterface {
    src/core/ThinkSplitter.ts:41:export class ThinkSplitter implements ThinkSplitterInterface {
    src/core/scopes/Scope.ts:34:export class Scope implements ScopeInterface {
    src/core/scopes/ScopeManager.ts:40:export class ScopeManager implements ScopeManagerInterface {
    src/core/AgentRegistry.ts:54:export class AgentRegistry implements AgentRegistryInterface {
    src/core/errors.ts:19:export class ProviderAbortError extends Error {
    src/core/errors.ts:74:export class AgentJobError extends Error {
    src/core/errors.ts:127:export class ConversationError extends Error {
    src/core/errors.ts:180:export class AgentError extends Error {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/Agent.ts:1
    src/core/Channel.ts:1
    src/core/Authority.ts:1
    src/core/conversations/stores/DatabaseConversationStore.ts:1
    src/core/conversations/stores/MemoryConversationStore.ts:1
    src/core/conversations/ConversationManager.ts:1
    src/core/conversations/Conversation.ts:1
    src/core/instructions/Instruction.ts:1
    src/core/instructions/InstructionManager.ts:1
    src/core/AgentContext.ts:1
    src/core/validators.ts:3
    src/core/factories.ts:16
    src/core/helpers.ts:21
    src/core/ThinkSplitter.ts:1
    src/core/scopes/Scope.ts:1
    src/core/scopes/ScopeManager.ts:1
    src/core/AgentRegistry.ts:1
    src/core/types.ts:1
    src/core/errors.ts:4
- Drop-in sites (`tests/guides.test.ts`):
    19:} from '@orkestrel/guide'
    43:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    49:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    94:		for (const group of guide.methods()) {
    95:			const members = source.methods(group.interface)
    102:					expect(findMissing(members, group.methods)).toEqual([])
    105:					expect(findMissing(group.methods, members)).toEqual([])
    109:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    124:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    127:		for (const group of guide.methods()) {
    137:							? source.examples(group.interface)
    138:							: source.examples(group.interface).concat(source.examples(entity))
    139:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    151:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 1113:## Tests — 1 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.20"` → `"version": "0.0.21"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-agent-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
