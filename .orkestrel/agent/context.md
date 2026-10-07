# Refactor the agent, and stage the living context by consumer

Recommendation record for `@orkestrel/agent`, written 2026-10-07 against the agent checkout at commit `65c706a` (version 0.0.26, one unreleased commit past the 0.0.26 release) and the scaffold checkout at `e5f0403`. It answers one question the user put after a design conversation with ChatGPT (GPT-6 Pro): does the agent package need a redesign or refactor, or would a `@orkestrel/context` package be the better move, given that `tool` and `workspace` left the package because they have uses outside it, and given that size and complexity are the felt problem.

Two kinds of sentence appear, as in the other records in this folder: a measured fact names the file, line, command, or run it came from; a design conclusion is a ruling for this codebase. Where a lane or a bench produced the reading, the record names it.

## Ruling

Refactor `@orkestrel/agent` in place. Do not create a `@orkestrel/context` package in this round. Adopt the living-context capability as a goal and build it by consumer, each step inside an existing package, and let a package boundary appear when a consumer outside the loop imports the record and selection layer. The provider engine and relay are the better-justified split by the user's own criterion, and that split stays gated on three conditions named later in this record.

Three readings decide the ruling:

- **Size is prose.** Of the 7,807 lines under `src/core`, 2,915 are code and 4,537 are comments. A package split moves this prose and deletes none of it.
- **The context capability has no first consumer.** Nothing in the fleet consumes source-linked assertions, dependency tracking, applicability classes, or a prepared frame, and the desk is held for later by the user's instruction. The first-consumer gate in `AGENTS.md` § Design laws refuses a package created ahead of its consumer, and the relevance classes the proposal names are product policy, which the mechanism law keeps out of framework code.
- **The structure is already separable without a split.** The record, assembly, scope, and instruction concerns import nothing from the loop, the provider engine, or the jobs layer. A module split inside the package makes the concerns visible in the tree, shrinks the 2,295-line `types.ts` into module-level contracts, and leaves every later extraction a mechanical move along a proven graph.

## How the question was worked

- The ChatGPT transcript was decoded from the share page and read in full; its final recommendation is reproduced as claims in `tmp/units/context-design-evidence.md` § The research recommendation under review (a working file, deleted at acceptance; the rulings on each proposal are in § Research record later in this record).
- Three Grok 4.7 Extra High lanes on the Cursor bench absorbed the agent source (311 citations, all resolving), every fleet guide's boundary and name claims (360 citations), and the agent tests and guide patterns (489 citations). The Orchestrator read the agent contract, the loop, the context, the conversation layer, the stores, the registry, the provider engine, and the guide's contract clauses first-hand.
- Two Opus planner lanes ran the same design brief blind to each other, one subjective and one objective; the Codex bench was dark this session, so Opus held both. Both ruled for the in-place refactor and against the context package. The Orchestrator's pre-lane notes had leaned toward a staged split; the lanes' readings on prose and on the first-consumer gate override that lean.
- A falsification round of nineteen independent refuters attacked the fifteen numbered claims the ruling rests on; § Falsification records the outcome.

## Measurements

The line classifier is `tmp/probes/measure.ts`, a Node TypeScript probe with a negative control (a fixture of 6 code, 5 comment, and 2 blank lines) that passed before the readings were taken. An earlier Python reading of the same figures was discarded because `AGENTS.md` § Non-negotiable rules bars a Python probe.

| File | Lines | Code | Comment | Comment share |
| --- | ---: | ---: | ---: | ---: |
| `src/core/types.ts` | 2295 | 476 | 1745 | 76% |
| `src/core/helpers.ts` | 934 | 350 | 552 | 59% |
| `src/core/Agent.ts` | 784 | 447 | 319 | 41% |
| `src/core/factories.ts` | 772 | 173 | 580 | 75% |
| `src/core/conversations/Conversation.ts` | 321 | 190 | 110 | 34% |
| `src/core/AgentProvider.ts` | 318 | 224 | 82 | 26% |
| `src/core/AgentContext.ts` | 264 | 116 | 133 | 50% |
| `src/core/errors.ts` | 262 | 66 | 176 | 67% |
| `src/core/constants.ts` | 154 | 18 | 118 | 77% |
| whole `src/core` (26 files) | 7807 | 2915 | 4537 | 58% |
| `tests/src/core` (23 files) | 13406 | 10834 | 1342 | 10% |

Other readings:

- `guides/agent.md` is 1,568 lines and 306,169 bytes with 37 contract clauses; the next largest fleet guides are `mcp.md` at 6,106 lines and `supervisor.md` at 4,890, while `tool.md` is 507 and `workspace.md` 595 (`map.ts --tree`).
- `tests/src/core/Agent.test.ts` is 4,177 lines with 128 `it` cases in 35 `describe` groups.
- Fixed-string counts over `src/core`: `byte-for-byte` 11, `prior behavior` 5, `as before` 4, `ensure` 10. `.claude/rules/writing.md` § Code comments bars history narration, and § Substitutions bars `ensure` as a claim.
- Declaration lines by concern, summed from the cited ranges in the Grok source map: record 957, loop 709, assembly 695, provider engine 519, jobs 437, shared 290, scopes 201, relay 190, instructions 189, authority 116.

## What the source says

The source passes the mechanical rule sweep. The Grok source map, read against `AGENTS.md`, `.claude/rules/names.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`, and `.claude/rules/typescript.md`, found no nested function outside an admitted position, no module-scope declaration beside one class in an implementation file, no non-exported declaration in a kind file, no public member of two or more words, no public method forwarding 1:1 to a helper, no helper duplicating an installed `@orkestrel/*` export, no `any`, non-null assertion, or `as` beyond two `as const`, no store departing from the Stores rule, no binary switch encoded as a literal union, and no stored flag a sibling field determines.

The defects are of three kinds.

- **Duplicated fragments**, six of them: the usage charge at `src/core/Agent.ts:494-499` and `:525-530`; the partial-result assembly at `src/core/AgentProvider.ts:202-206` and `:211-216`; the rollup regeneration at `src/core/conversations/Conversation.ts:236-237` and `:243-244`; the reader release in `readText` and `readChunks` (`src/core/helpers.ts:833-876`, `:895-932`); the batch `remove` loop in `Conversation`, `ConversationManager`, `InstructionManager`, and `ScopeManager`; and the role literal list in `src/core/validators.ts:27-28` and `src/core/shapers.ts:38`.
- **The comment load**, measured earlier in this record, which narrates history and alternatives the writing rule bars and repeats the guide.
- **Two seams.** `ProviderInterface.format?: ContextFormat` (`src/core/types.ts:142-204`) is the only edge from the provider engine into the assembly concern; `AgentProvider` stores and exposes it, `Agent.#run` passes it into `context.build`, and `OllamaOptions.format` exists only to be read by the agent and is never sent on the wire (`guides/ollama.md:122`, `:289`). `ContextFormat` has one key, `instructions`, and the manager-level `InstructionManagerOptions.format` and the per-item `InstructionInput.override` frame the same section. A `tool` message carries no call id: `Message` keys a tool turn to its call "by the conversation order" (`src/core/types.ts:19-46`), and the loop appends one tool message per call in call order (`src/core/Agent.ts:557-565`), so a wire keyed by call id cannot map two parallel calls to one tool.

The context concerns are already decoupled. The record, assembly, scopes, and instructions concerns import nothing from the loop, the provider engine, or the jobs concern. The reverse edges are `src/core/Agent.ts:3`, `:28`, `:35` (`AgentContextInterface`, `AgentContext`, `estimateTokens`), `src/core/AgentProvider.ts:6` (`ContextFormat`), and `src/core/AgentRegistry.ts:8`, `:17` (`ConversationStoreInterface`, `ConversationManager`).

## What the fleet says

- Consumers of `@orkestrel/agent`: `ollama` extends `AgentProvider` and never touches the loop (`guides/ollama.md:4-12`, `:89`); `browser` fences `createAgent` and the relay (`guides/browser.md:36-39`); `supervisor` imports `ProviderInterface` (`guides/supervisor.md:1942`); `toolbox` imports the registry, the store interface, and `AgentContextInterface` to run agents (`guides/toolbox.md:22`, `:332-334`). The type import of `ProviderInterface` appears 18 times in guides outside `agent.md`. The conversation, context, scope, and instruction symbols appear outside `agent.md` only in `toolbox.md`.
- No fleet guide claims ranked or full-text search. The database offers `like`, `glob`, `starts`, `ends`, `any`, `none`, secondary indexes, cursors, and per-driver transactions (`guides/database.md:260`, `:278`, `:295`), and refuses a raw-SQL escape hatch (`guides/database.md:18`). Content digests exist in `brief`, `mcp`, and `scaffold`. Token estimation exists only in agent.
- Names a context layer would collide with: `Evidence` is rater's; `SearchOptions` and `SearchMatch` are workspace's; `SelectionManagerInterface` is table's; `*Record` is a suffix across brief, interpret, console, scaffold, and browser; `Frame` names wire records in supervisor, browser, test, workflow, and agent's own `RelayFrame`; `{Entity}Context` is the fixed execution-context form across interpret, mcp, browser, supervisor, guide, contract, and lsp; `Memory*` is the fleet's in-memory store prefix. Bare `Context`, `Frame`, `Memory`, `Assertion`, `Episode`, `Selection`, and `Retrieval` are unclaimed.
- The collision record. `host.json` records seven agent names with a second owner: `ProviderInterface`, `ProviderOptions`, and `RelayOptions` (supervisor); `ScopeInterface` (mcp); `StreamInterface` (server); `createChannel` and `readText` (test). The scaffold release build reads every guide's `## Surface` claims and refuses a staged owner set that the record does not contain (`src/server/helpers.ts:1729-1747`), and `.claude/rules/names.md` § Fleet name ownership lets the record shrink by closing a collision and never widen. A split that moves `ProviderInterface` into another guide is therefore refused until supervisor renames its own `ProviderInterface`, `ProviderOptions`, and `RelayOptions`, and test renames `readText`.

## Alternatives ruled on

**(a) Refactor inside the package: adopted.** It cuts the prose where it stands, closes the duplication, cuts the one coupling, repairs the record, and makes the concerns visible as modules. Cost: one agent release (0.0.27), then `ollama` (its framing option goes) and `toolbox` (a re-pin), then the scaffold mirrors. No test file leaves the package.

**(b) Split along a boundary other packages already use: gated, not refused.** Two candidates exist. The provider engine and relay pass the user's criterion: `ollama`, `browser`, and `supervisor` consume them without the loop, as `mcp` consumes `tool` without the loop. The split would move 58 exports (13 provider-engine, 5 relay, and 4 shared types; 11 constants; 4 errors and guards; 5 shapes, 4 contracts, 1 validator; 4 helpers, 3 factories, 4 classes), 6 whole test files and parts of 3, and contract clauses 2-6 and 34-37, across three publish rounds (provider, agent, then ollama and toolbox), and it needs four collisions closed first. Its benefit, a lighter install for `ollama`, which pulls agent's 10 runtime dependencies today, is unmeasured. The conversation-and-assembly candidate is clean on dependencies but fails the criterion: no package imports it without running the loop. Gates for the provider split: the `framing` unit landed; the four collisions closed at their sources; `ollama`'s install closure measured smaller with the provider package than with agent.

**(c) A `@orkestrel/context` package: refused in this round.** No consumer; policy content; the proposal read guides and rules, not code, and checked no name against the fleet. The name is also qualified: `AgentContext` and the `{Entity}Context` form give the word two senses, and `memory` reads as the in-memory store tier.

**(d) An ordered combination: adopted as gates, not as this round's plan.** The admissible order is (a), then the measurements, then the provider split when its gates open, then the context package when a consumer outside the loop imports the record and selection layer.

## Research record

Each proposal from the ChatGPT conversation, ruled on.

| Proposal | Ruling | Reason |
| --- | --- | --- |
| A `@orkestrel/context` package owning assertions, dependencies, applicability, reconciliation, and frames | Refuse in this round; adopt the goal | No consumer; the classes are policy; the principle that applicability is derived and never stored is already the derive-state law |
| Awaitable `Conversation.add` for an acknowledged write before inference | Refuse in this round | `add` is the synchronous registration verb on every manager; `await conversations.save(id)` before `generate` is the acknowledged write; each append carries a minted id |
| `prepare(...)` then `build(frame)` | Refuse the names; adopt the seam | No asynchronous source exists yet; `frame` is qualified by `RelayFrame`; the seam becomes the `select` step later in this record |
| Database records instead of snapshot blobs | Defer to a consumer | The fleet persists one snapshot row per entity across workspace, workflow, terminal, and agent; `toolbox` persists through the store interface; message-level records are buildable on the portable database surface when a consumer queries messages across conversations |
| Measure the whole provider request | Adapt | Correct contract clause 24 in the `guide` unit; widen the estimator's input when a measured overflow shows the gap |
| An explicit preparation failure on over-budget | Refuse | An over-window prompt already reaches the provider explicitly after the futile-compaction guard; nothing is dropped silently |
| Incremental, bounded repair | Refuse as written | No derived state exists to repair; the principle survives in `select` and `records` |
| Brief stays the pinned task contract | Adopt | `guides/brief.md` states the boundary |
| A vertical slice as the first deliverable | Refuse as written; keep the matrix | The slice needs the deferred desk; the capability-matrix procedure is `.claude/rules/quality.md` § Evidence before change |
| The decision client as a sibling of the provider | Adopt the boundary; defer the build | The 2026-10-05 record rules it (`provider.md`, `agent.md` in this folder); build it with the desk as consumer, placed in the `providers/` module so it travels with a later provider package |

## The plan

Units run in this order. Units in one checkout run one after another; units in different checkouts run side by side.

| Order | Unit | Package | Role, engine | Owns | Accepts when |
| --- | --- | --- | --- | --- | --- |
| 1 | `hygiene` | agent | `builder` (Sonnet), then `reviewer` (Opus, subjective) | every comment under `src/core/**/*.ts`; no code token; no export description paragraph or `@example` | the barred phrases count 0; `npm run test:guides` passes with no rewrite; the diff touches comment lines only; the comment-line count before and after is reported from the controlled classifier |
| 2 | `framing` | agent | `opus` (Opus), one review pass | `src/core/types.ts`, `AgentContext.ts`, `Agent.ts`, `AgentProvider.ts`, `providers/RelayProvider.ts`, `helpers.ts`, `factories.ts`, `instructions/InstructionManager.ts`, their tests, `guides/agent.md`, `README.md` | no hit for `ContextFormat`, `provider.format`, `resolveOpen`, `resolveClose`, `resolveItem`, or `ContextSectionSourceInterface` in `src`, `tests`, or the guide; one test proves the manager option frames open, item, and close and the item override outranks it; `test:guides` and `test:src:core` pass |
| 3 | `correlate` | agent | `opus` (Opus), one review pass | `Message` in `src/core/types.ts`, `Agent.ts`, `validators.ts`, `shapers.ts`, `guides/agent.md`, tests | a tool-role message names the call it answers; a scripted provider returning two calls to one tool round-trips each result to its call; the wire shape and guard admit the member |
| 4 | `carve` | agent | `builder` (Sonnet), after a branch probe of `test:guides` and the policy sweep on the layout | moves under `src/core/**` and `tests/src/core/**`; the indexes in `guides/README.md` | `providers/` and `conversations/` import no other module; `contexts/` imports only `conversations/` and the root; every root declaration has importers in two or more modules; the `it` count is unchanged; `test:guides` passes with no edit to `agent.md` |
| 5 | `consolidate` | agent | `builder` (Sonnet) | the six duplicated fragments; a role constant; exported helpers for the batch remove and the reader release, named by the Orchestrator | each fragment has one home; each added export carries a Surface row, TSDoc, and a test; `test:src:core` and `test:guides` pass |
| 6 | `guide` | agent | `opus` (Opus) | `guides/agent.md`: clause 24; the twelve documented behaviors without a pin and the eight pinned behaviors without a sentence; the Surface tables grouped by module; the Contract prose cut to the contract | every documented behavior has an executed assertion or leaves the guide; every pinned behavior is documented; `test:guides` passes |
| 7 | release 0.0.27 | agent | `verifier`, then the Orchestrator | the manifest version | tree-wide gates green; `npm run test:distribution -- --mode release` passes |
| 8 | `ollama` | ollama | `builder` (Sonnet) | the framing option, its tests, `guides/ollama.md` lines 87, 91, 122, and 287-307 | no ollama file names `ContextFormat`; every remaining `format` names the wire field; parity and tests pass against agent 0.0.27 |
| 9 | `toolbox` | toolbox | `builder` (Sonnet) | the agent pin | tests and parity pass |
| 10 | `mirrors` | scaffold | `builder` (Sonnet) | `guides/agent.md`, `guides/ollama.md` | byte-identical to the published guides |

The module layout `carve` produces, with each module's imports:

| Module | Owns | Imports |
| --- | --- | --- |
| root `src/core/*.ts` | `MessageRole`, `Message`, `MessageInput`, the message shape and contract, `isMessage`, `filterAllowList`, `joinThinking` | `contract`, `tool` |
| `providers/` | `ProviderInterface` and its result, delta, and option types, `AgentProvider`, `ThinkSplitter`, the request and result shapes and contracts, the provider errors, `readText`, `readChunks`, `buildProviderResult`, the relay (`createRelay`, `RelayStream`, `RelayProvider`, the relay frame shape and constants) | root, `timeout`, `tool`, `contract` |
| `conversations/` | `MessageManagerInterface`, `Conversation`, `ConversationManager`, `Section`, compaction, snapshots, `ConversationError`, the `stores/` folder, the recap helpers and constants | root, `emitter`, `contract`, `database` |
| `contexts/` | `AgentContext`, `ContextSectionFormat`, the `instructions/` and `scopes/` folders, the workspace render helpers, `intersectKeys`, `WORKSPACE_SECTION_HEADER` | root, `conversations/`, `workspace`, `tool`, `emitter` |
| `agents/` | `Agent`, `Channel`, `Authority`, `AgentRegistry`, the job handlers and factories, `estimateTokens`, `estimateMessages`, the usage and result helpers, `AgentError`, `AgentJobError` | every module, `abort`, `budget`, `timeout`, `queue`, `workflow` |

The `providers/` and `conversations/` folders exist today as entity folders holding class files; `carve` turns each into a module with its own kind files and keeps `stores/`, `instructions/`, and `scopes/` as class-only entity folders inside their modules, per `.claude/rules/architecture.md` § Entity subfolders. The one guide stays, under the layer allowance in `.claude/rules/documentation.md` § Parity; `guides/README.md` already maps two directories to it.

## The living context, staged by consumer

The user's goal stands: a context that stays fresh, brings in what the next action needs, keeps a record to look back on, and marks what is stale, superseded, or wrong. The route to it runs through consumers, each step small enough to prove.

| Step | Where | First consumer | What it adds |
| --- | --- | --- | --- |
| `recall` | `toolbox` | the model | A conversation tool shaped like `createWorkspaceTool` over `ConversationManagerInterface`: `search`, `rehydrate`, `sections`, `summary`, and `reference` already exist on `ConversationInterface` (`src/core/types.ts:1753-1911`), so the model gains on-demand recall of earlier turns with no change to agent |
| `select` | agent, `contexts/` | the loop | A selection the application supplies in place of the fixed `view()` inclusion, defaulting to `view()`. The loop reads the built input at two sites, run entry (`src/core/Agent.ts:362`) and the post-compaction rebuild (`:665`), and already awaits before the first request when auto-compaction is on (`:395-403`), so an asynchronous selection adds an await only when configured. Eager retrieval, applicability rules, and a receipt of what was selected plug in at this seam. Its design round names the seam; `prepare` and `frame` are not the names |
| `records` | agent, `conversations/` | a consumer that queries messages across conversations | Message-level records over `@orkestrel/database` beside the snapshot store, with the call id from `correlate` as a column; search through portable conditions, ranked search as a native sqlite override if a measurement shows the need |
| decision client | `providers/` | the desk | The sibling client the 2026-10-05 record rules; its typed decisions with probabilities are the natural first assertions with provenance |
| package | fleet | a consumer outside the loop | When the desk or another consumer imports `conversations/` and `contexts/` without `agents/`, lift them; decide the name then against the fleet record |

What this stages differently from the ChatGPT design: the capability grows outward from the record the agent already owns, each step with a consumer; the message-agnostic assertion engine, the awaitable append, and the frame vocabulary are not built ahead of the consumer that would prove them.

## Two guide readings to correct

- The scaffold mirror `guides/agent.md` lags the agent checkout by one line: clause 10 at line 988 still says a successful tool result's content is `JSON.stringify(result.value)`, while the checkout's clause and `src/core/Agent.ts:557-565` carry a string unchanged (commit `65c706a`, unreleased). The `mirrors` unit refreshes it from the published bytes at release.
- Clause 24 (`guides/agent.md:1002`) says the loop measures the current full prompt, while `#trim` consumes the working message array alone (`src/core/Agent.ts:644-645`); tool definitions and a per-run schema reach the provider unmeasured. The `guide` unit corrects the sentence.

## Falsification

Nineteen refuters attacked the fifteen claims the ruling rests on, through a source lens on every claim, a law lens added on the four judgment claims (the framing deletion, the context-package refusal, the module split, and the deferrals), and a cost lens on the three fleet-cost claims.

The round was in flight when this record was first committed; its verdicts and the amendments they forced are recorded in the commit that follows.

## Risks

- `hygiene` deletes a comment that carries an ordering or timing reason the code does not show, such as the pump timing notes at `src/core/Agent.ts:382-394`. The reviewer pass is the control.
- `carve` fails an instrument on a layout the fleet has never run. The branch probe before acceptance is the control.
- Deleting the provider-default framing level loses a configuration a consumer outside the guides relies on. Probe: a fleet-wide search for a framing `format` passed to `createOllama`, `createRelayProvider`, or an `AgentProvider` subclass, and the desk when it returns to scope.
- Two copies of agent load in one application while `ollama` and `toolbox` pin `^0.0.25` and the checkout is 0.0.26. Probe: `npm ls @orkestrel/agent` in a consuming application.
- The supervisor guide imports a `MessageInterface` that agent does not declare (`guides/supervisor.md:1941`); its owner settles it.

## Files to read with this record

- `provider.md` and `agent.md` in this folder, which rule the decision client's boundary
- `/home/user/agent/src/core/types.ts`, `Agent.ts`, `AgentContext.ts`, `conversations/Conversation.ts`
- `/home/user/scaffold/guides/agent.md` § Contract, `guides/ollama.md` § Context framing, `guides/toolbox.md`
- `/home/user/scaffold/host.json` `surface`, `src/server/helpers.ts:1729-1747`
