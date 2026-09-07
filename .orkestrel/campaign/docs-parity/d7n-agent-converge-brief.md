# Brief — P.2 `d7n-agent-converge` (agent under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/agent` from the committed baseline `5c2a8f0` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.21`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/agent.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/agent/guides/agent.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-agent-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/agent.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/agent.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/agent.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
guides/agent.md function createConversation: guide "A `ConversationInterface` — messages above the flat store with compaction into summarized sections + a rollup, driven by a `ConversationSummaryHandler`." source "Creates a conversation — a `ConversationInterface` grouping messages above a flat message store it OWNS DIRECTLY, with compaction into summarized sections, a regenerated rollup `summary`, on-demand `rehydrate`, and substring `search`, driven by a provider-agnostic `ConversationSummaryHandler` seam."
guides/agent.md function createConversationManager: guide "A `ConversationManagerInterface` — the id-keyed registry of conversations WITH an active pointer (`add` auto-activates the first; `switch` re-points it); its default `summarize` / `keep` flow into created conversations." source "Creates a conversation registry — a `ConversationManagerInterface` holding `ConversationInterface`s keyed by their `id` (in insertion order) WITH an active pointer: the id-keyed store over the conversation layer plus the `active` / `switch` seam the context renders."
guides/agent.md function createMemoryConversationStore: guide "The in-memory `ConversationStoreInterface` — a process-lifetime `Map` of `ConversationSnapshot`s (the default `open` / `save` backing)." source "Creates the in-memory conversation store — a `ConversationStoreInterface` backed by a process-lifetime `Map` of `ConversationSnapshot`s keyed by conversation id, the DEFAULT backing for the durable `ConversationManagerInterface.open` / `ConversationManagerInterface.save` seam. The exact twin of `createMemoryWorkspaceStore`."
guides/agent.md function createDatabaseConversationStore: guide "A `ConversationStoreInterface` over a `DriverInterface` (default `createMemoryDriver()`) — the snapshot as one opaque JSON column (durable twin)." source "Creates a `DatabaseConversationStore` over any `DriverInterface` — the durable, driver-pluggable backing for the conversation persistence seam, the opt-in twin of `createMemoryConversationStore`. The exact twin of `createDatabaseWorkspaceStore`."
guides/agent.md function createInstruction: guide "An immutable `InstructionInterface` — a named directive (`name` / `content` / optional `priority`)." source "Creates an instruction — an immutable `InstructionInterface` (a named directive) from its `name` / `content` and optional `priority`, the `id` minted at construction."
guides/agent.md function createInstructionManager: guide "An empty `InstructionManagerInterface` — the name-keyed instruction registry (listed by descending `priority`)." source "Creates an instruction registry — an `InstructionManagerInterface` holding immutable instructions keyed by `name`, listed by descending `priority`."
guides/agent.md function createScope: guide "An immutable `ScopeInterface` — a named allow-list filter (`narrow` composes by intersection)." source "Creates a named scope — an immutable `ScopeInterface` from its `name` and its per-category allow-lists, the `id` minted at construction."
guides/agent.md function createScopeManager: guide "An empty `ScopeManagerInterface` — the id-keyed registry of reusable named scopes." source "Creates a scope registry — a `ScopeManagerInterface` holding immutable scopes keyed by their minted `id`, in insertion order."
guides/agent.md function createAgentContext: guide "An `AgentContextInterface` — the richer `system` + managers + `messages` + `tools` + `scope` context; `build()` the input." source "Creates a richer turn context — an `AgentContextInterface` assembling a provider request from the optional system prompt, the instruction registry, the workspace registry, the conversation store, the tool registry, and the active scope."
guides/agent.md function createAgent: guide "An `AgentInterface` — the bounded loop over a `ProviderInterface`; `generate` (one-shot) / `stream` (live)." source "Creates an agent loop — an `AgentInterface` composing a `ProviderInterface`, its `AgentContextInterface`, and a tool registry into a bounded context → provider → tools → repeat turn, exposed as a one-shot `generate` and a live `stream`."
guides/agent.md function createAuthority: guide "An `AuthorityInterface` — the synchronous policy gate (ordered first-match-wins rules + a configurable fallback)." source "Creates a policy gate — an `AuthorityInterface` the agent loop consults before each tool call runs, evaluating the ordered rules first-match-wins and falling back to the configured default when none match."
guides/agent.md function createThinkSplitter: guide "A fresh `ThinkSplitterInterface` — the stream-stateful `<think>…</think>` separator a provider routes content deltas through (one splitter per stream)." source "Creates a stream-stateful `<think>` separator — a `ThinkSplitterInterface` that splits a thinking model's in-content `<think>…</think>` reasoning spans away from the answer, delta by delta, so a provider yields ONLY clean content and surfaces the accumulated reasoning as `ProviderResult.thinking`."
guides/agent.md function createChannel: guide "An empty `ChannelInterface` — the unbounded async channel a producer `push`es into and `close` / `fail`s while a consumer `drain`s it live." source "Creates an empty unbounded async channel — a `ChannelInterface` a producer writes values into (`push`) and ends (`close` / `fail`) regardless of consumption, while a consumer reads them back live through `drain`."
guides/agent.md function createAgentRegistry: guide "An `AgentRegistryInterface` — the named pools that resolve a job's names + `build` a seeded, signal-wired agent." source "Creates an agent registry — an `AgentRegistryInterface` holding the named pools of live, non-serializable pieces (providers, tools, authorities, schedulers) that a serializable `AgentJobInput`'s names resolve against, and `build`ing a seeded, signal-wired `AgentInterface` from a job."
guides/agent.md function createAgentQueue: guide "A durable, bounded-concurrency `QueueInterface` of `AgentJobInput` → `AgentResult` (composes `createQueue`)." source "Creates a durable, bounded-concurrency agent-job queue — a `QueueInterface` over serializable `AgentJobInput`s that COMPOSES `createQueue`: each job is rehydrated through the `registry` into a live `AgentInterface`, run to its `AgentResult`, and subjected to the partial-as-configurable-failure policy."
guides/agent.md function createAgentRunner: guide "A one-shot, fail-fast `RunnerInterface` of `AgentJobInput` → `AgentResult` with sub-agent fan-out (`createRunner`)." source "Creates an agent-job runner — a `RunnerInterface` over serializable `AgentJobInput`s that COMPOSES `createRunner` (one-shot, ordered, fail-fast), each unit rehydrated through the `registry` and subjected to the partial policy. The runner enables **sub-agent fan-out**: a parent job's handler can `controller.spawn(childJob)`."
guides/agent.md class Conversation: guide "A conversation that OWNS its live message tail DIRECTLY (the flat store verbs `add` / `message` / `messages` / `remove` / `clear` / `count` folded in, like a `Workspace` owns its files) — the live tail + compacted summarized `sections` + a regenerated rollup `summary` + the `summarizable` flag; `compact` folds older live → a section through the `ConversationSummaryHandler` seam, `rehydrate` / `search` read the retained originals; observable `emitter` (`ConversationEventMap`)." source "Represents a conversation — a live uncompacted tail of messages it OWNS DIRECTLY ABOVE a flat message store, plus compacted, summarized `Section`s and a regenerated rollup `summary`, with on-demand `rehydrate` and substring `search`, driven by a provider-agnostic `ConversationSummaryHandler` seam (so `core` never imports a provider)."
guides/agent.md class ConversationManager: guide "The id-keyed registry of `Conversation`s WITH an active pointer — `add` (auto-activates the first, flows the manager's default `summarize` / `keep` in, a per-`add` override wins), `switch` re-points `active`, `open` / `save` (the durable `store` seam), `conversation` / `conversations` / `remove` (clears `active` if removed) / `clear` / `count`; event-free (each conversation owns its `emitter`)." source "Registers `Conversation`s keyed by `id`, in insertion order, WITH an active pointer — the id-keyed store over the conversation layer PLUS the `active` / `switch` seam the `AgentContext` renders. Event-free (a registry, like `WorkspaceManager`); the observability lives on each `Conversation`."
guides/agent.md class MemoryConversationStore: guide "The in-memory `ConversationStoreInterface` — a process-lifetime `Map` of `ConversationSnapshot`s keyed by id (`get` / `set` / `delete`, async; no TTL); the default `open` / `save` backing." source "Implements the `ConversationStoreInterface` in memory — a process-lifetime `Map` of `ConversationSnapshot`s keyed by conversation id, the DEFAULT store `createMemoryConversationStore` builds. The EXACT twin of `MemoryWorkspaceStore`."
guides/agent.md class DatabaseConversationStore: guide "A `ConversationStoreInterface` over one `databases` table — the snapshot as ONE opaque JSON column, narrowed back on `get` by `isConversationSnapshot` (the total boundary guard); the driver-pluggable twin of `MemoryConversationStore`." source "Backs a `ConversationStoreInterface` with one table of the `databases` layer — a conversation's durable state IS a row, so persistence reduces to keyed point-access (`get` / `set` / `delete`) over a `TableInterface`, the driver-pluggable twin of the plain-`Map` `MemoryConversationStore`. The EXACT twin of `DatabaseWorkspaceStore`."
guides/agent.md class Instruction: guide "An immutable named directive — `name` / `content` / `priority` (default `0`), the `id` minted at construction." source "Represents an immutable named directive — a `InstructionInterface` assembled once from its input (`name` / `content`, an optional `priority` defaulting to `0`), the `id` minted at construction."
guides/agent.md class InstructionManager: guide "The instruction registry — immutable instructions keyed by `name` (last write wins), listed by descending `priority`; `open` / `render` build contract; observable `emitter` (`InstructionManagerEventMap`)." source "Registers the immutable `Instruction`s a richer context assembles a directives block from — keyed by `name`, listed by descending `priority`."
guides/agent.md class Scope: guide "A named, immutable allow-list filter — one list per category (`undefined` ⇒ all, `[]` ⇒ none, else only-listed); `narrow` composes a tighter child by set-intersection." source "Represents a named, immutable filter over a richer context's items — an optional allow-list per category (`instructions` / `tools` / `files`), each keyed by that category's identity (an instruction's `name`, a tool's `name`, a workspace file's `path`)."
guides/agent.md class ScopeManager: guide "The id-keyed registry of reusable named scopes — `create` mints + stores (always adds), `scope` / `scopes` / `remove` / `clear`; observable `emitter` (`ScopeManagerEventMap`)." source "Registers the named filters a richer context reuses — immutable `Scope`s keyed by their minted `id`, in insertion order."
guides/agent.md class AgentContext: guide "The turn context — `system` + the instruction manager + the workspace registry (the only document channel) + `messages` + the loop's `tools` registry + a readonly `scope` changed through `apply`; `build()` folds the scoped managers and the active workspace into one system block, then the conversation, and never reads `tools`." source "Assembles a provider request from the richer turn context — the optional system prompt, the observable context managers (instructions / workspaces), the `ConversationManagerInterface` message source (whose active conversation IS `messages`), the `ToolManagerInterface` registry, and an active `ScopeInterface` changed through `AgentContextInterface.apply`."
guides/agent.md class Agent: guide "The agent loop — one `#run` shared by `generate` / `stream`, bounded by `AbortSignal.any([signal, timeout, budget])`, paced by `scheduler`, tool iteration capped at `limit`." source "Composes a `ProviderInterface`, an `AgentContext`, and a `ToolManagerInterface` into a bounded context → provider → tools → repeat turn, exposed as both a one-shot `generate` and a live `stream`."
guides/agent.md class Authority: guide "The synchronous policy gate — `evaluate` walks ordered rules first-match-wins, falling back to a configurable default (allow-unmatched by default; deny-by-default when its `fallback` denies)." source "Gates the agent loop's tool calls — the synchronous policy consulted before each call runs, turning one `AuthorityContext` into an `AuthorityDecision`."
guides/agent.md class AgentRegistry: guide "The job-rehydration bridge — resolves a serializable `AgentJobInput`'s names (`provider` / `tool` / `authority` / `scheduler`, throwing on a miss) and `build`s a seeded, signal-wired `Agent` from it." source "Makes a durable, JSON-serializable `AgentJobInput` runnable — holds the named pools of live, non-serializable pieces (providers, tools, authorities, schedulers) and rehydrates a seeded, signal-wired `Agent` from a job's names + data."
guides/agent.md class Channel: guide "The `ChannelInterface` implementation — an unbounded async channel a producer `push`es chunks into and `close` / `fail`s, a consumer `drain`s live through the resolver-swap park. The `Agent`'s eager pump writes to one so `result` settles regardless of whether `events` is drained." source "Buffers chunks in a minimal unbounded async channel — the eager pump WRITES them in (`push`) and ends it (`close` / `fail`) regardless of consumption; a consumer READS them back live through the `drain` async-iterator. Decoupling write from read is what lets a producer make progress without a consumer pulling."
guides/agent.md class ThinkSplitter: guide "The stream-stateful `<think>` separator — `split(delta)` returns the CLEAN content of each raw wire delta (reasoning spans accumulate on `thinking`), holding a tag split ACROSS deltas until disambiguated; a bare leading `</think>` (the qwen3-template IMPLICIT open) RECLASSIFIES the surfaced prefix into `thinking` (the `content` accumulation is authoritative); `flush()` settles the stream end (an unclosed span lands on `thinking`, a never-completed partial tag returns as content). One per stream — a provider's think-tag guarantee." source "Feeds raw content deltas through a tiny stream-stateful state machine that routes everything inside a `<think>…</think>` span to `thinking` and returns everything outside it as clean content, so a provider yields ONLY the answer and surfaces the reasoning as `ProviderResult.thinking`."
guides/agent.md const CONVERSATION_RECAP_PREFIX: guide "The lean framing label `Conversation.view()` prefixes onto each compacted section summary so a small model reads it as a RECAP, not a literal turn — a fixed handful of tokens (no-bloat)." source "Names the framing label a `ConversationInterface`'s `view()` prefixes onto each compacted section's summary so a small model reads it as a CONDENSED RECAP of earlier turns — not a literal assistant turn to echo or treat as the live answer."
guides/agent.md const DEFAULT_AGENT_LIMIT: guide "The default cap on an agent turn's tool iterations — `10`; overridable through `AgentOptions.limit`." source "Caps an `AgentInterface` turn's tool iterations by default — the maximum number of context → provider → tools cycles before the loop stops, so a model that keeps requesting tools can never loop forever. Overridable per agent through `AgentOptions.limit`."
guides/agent.md const DEFAULT_AUTHORITY_ZONE: guide "The zone an `Authority`'s default allow fallback carries — `'default'` (an unmatched call is allowed under this zone)." source "Names the zone an `AuthorityInterface`'s default fallback `AuthorityDecision` carries — the classification for a tool call that matched no rule. Paired with the default `allowed: true` fallback, an unmatched call is allowed under this zone, so a rules list of denials acts as a denylist; a caller wanting deny-by-default supplies an `allowed: false` `fallback` of their own (see `AuthorityOptions`)."
guides/agent.md const DEFAULT_CONVERSATION_KEEP: guide "The default recent live messages a `Conversation.compact()` retains — `0` (fold ALL); a `keep` retains a tail." source "Sets the default number of recent live messages a `ConversationInterface`'s `compact()` RETAINS verbatim — `0`, so a manual `compact()` folds ALL of the current live messages into one summarized section (no tail kept). A caller retains a recent tail by passing `keep` (on `ConversationOptions`, `ConversationManagerOptions`, or per-fold through `CompactOptions`), folding only the older `count - keep` messages and leaving the most recent `keep` live for the next turn. Overridable everywhere `keep` is accepted."
guides/agent.md const THINK_OPEN: guide "The opening tag a `ThinkSplitter` recognizes as the start of an in-content reasoning span — `'<think>'` (the de-facto thinking-model wire convention)." source "Names the opening tag a `ThinkSplitter` recognizes as the start of an in-content reasoning span — the de-facto wire convention thinking models (qwen3, DeepSeek-R1 family) emit their chain-of-thought under when a daemon renders it inline instead of on a separate wire field. Paired with `THINK_CLOSE`."
guides/agent.md const THINK_CLOSE: guide "The closing tag that ends a `THINK_OPEN` reasoning span — `'</think>'`; an unclosed span is treated as thinking to the stream's end (`flush`)." source "Names the closing tag that ends a `THINK_OPEN` reasoning span. A span the stream never closes (the model was cut off mid-reasoning) is treated as thinking to its end — `ThinkSplitterInterface.flush` settles it."
guides/agent.md const WORKSPACE_SECTION_HEADER: guide "The `## Workspace` system-block header `AgentContext.build()` renders the ACTIVE workspace's text files under — the header is agent's, like the rest of the prompt projection." source "Names the section header `AgentContext`'s `build()` renders the ACTIVE workspace's TEXT files under — the leading line of the dedicated workspace block in the system message, the carrier-split counterpart to the documents / images section headers."
guides/agent.md const MESSAGE_TOKEN_OVERHEAD: guide "The estimated per-message role/framing overhead `estimateMessages` adds on top of a message's content estimate — `4`." source "Estimates the per-message role/framing overhead `estimateMessages` adds on top of a message's content estimate — accounts for the fixed wire framing every conversation turn carries (its role tag, delimiters) that `estimateTokens`'s content-only heuristic does not otherwise capture."
guides/agent.md const IMAGE_TOKEN_ESTIMATE: guide "The coarse, deliberately-approximate per-image token cost `estimateMessages` charges for each attached image — `512` (a base64 length is NOT a reliable token proxy)." source "Names the coarse, deliberately-approximate per-image token cost `estimateMessages` charges for each attached image."
guides/agent.md function agentResultToJSON: guide "The projection of an `unknown` onto a fresh exact `JSONValue` imported from Contract. Captures each structural field once through a total boundary, accepts conforming accessors/inherited properties, preserves finite negative/fractional usage counts, rejects malformed fields, non-finite usage, throwing getters, and hostile/revoked proxies by returning `undefined`; drops extras and deep-gates the rebuilt object through Contract's `parseJSONValue`." source "Projects an unknown value onto the canonical JSON representation of an `AgentResult`."
guides/agent.md function filterAllowList: guide "The scope allow-list filter over items — `undefined` ⇒ all, `[]` ⇒ none, else only-listed (order-preserving, total)." source "Filters a list of items by a `ScopeInterface` allow-list of keys — the pure, total set-membership primitive the context's build step and the agent loop's tool-advertise step apply a scope through."
guides/agent.md function estimateTokens: guide "A string's estimated context-token footprint — the deterministic `ceil(length / 4)` char heuristic `estimateMessages` sums over." source "Estimates the context-token footprint of a string — the deterministic char-based heuristic `estimateMessages` sums over a conversation's messages (the default context-budget estimator)."
guides/agent.md function estimateMessages: guide "A message batch's estimated footprint — content + `MESSAGE_TOKEN_OVERHEAD` per message + a tool-call JSON estimate + `IMAGE_TOKEN_ESTIMATE` per image; the default `consumer` for an agent's context `window` budget. Total — never throws, including on a circular `ToolCall.arguments` (falls back to a fixed contribution instead of the unreachable JSON length). The constants (`MESSAGE_TOKEN_OVERHEAD`, `IMAGE_TOKEN_ESTIMATE`, the `ceil(length / 4)` char heuristic) are deliberate, provider-agnostic APPROXIMATIONS, not an exact tokenizer count — actual window-sizing accuracy depends on the target model's own tokenization, so a caller wanting a sharper count supplies its own `consumer` to `createBudget`." source "Estimates the context-token footprint of a batch of messages — the default `consumer` estimator for an agent's context `BudgetInterface` (a budgets surface's tracking contract) (the `AgentOptions` `window`)."
guides/agent.md function sanitizeToken: guide "One reported token count, normalized — non-finite / non-positive values become `0`; positive fractional values floor down." source "Sanitizes one reported token count into a safe non-negative integer."
guides/agent.md function sanitizeUsage: guide "A provider-reported `TokenUsage`, normalized — non-finite / negative fields floor to `0`, fractional fields floor down; applied automatically to BOTH a normal turn's `result.usage` and an abort's partial usage before either is charged/folded, so a buggy provider's dirty usage can never poison budget accounting." source "Sanitizes a `TokenUsage` into safe, non-negative integers — the guard an agent's abort-usage path applies to a provider's partial usage before it is charged against a budget or folded into the run total."
guides/agent.md function settleAgentJob: guide "The settled result of a rehydrated agent under the partial policy (shared by `createAgentQueue` / `createAgentRunner`): a partial throws `AgentJobError` unless the `partial` policy is on; a natural finish resolves." source "Runs one rehydrated agent and applies the partial-as-configurable-failure policy — the shared job-handler step BOTH `createAgentQueue` and `createAgentRunner` settle each job through, so the policy can never diverge between them."
guides/agent.md function handleAgentQueueJob: guide "The queue handler — one queued job rehydrated with its attempt signal and settled through the shared partial policy; the named handler composed by `createAgentQueue`." source "Handles one queued agent job by rehydrating it through a registry with the queue attempt's signal, then applying the shared partial-result policy."
guides/agent.md function handleAgentRunnerJob: guide "The runner handler — a job's declared children fanned out without inline-awaiting them, then its parent rehydrated and settled through the shared partial policy; the named handler composed by `createAgentRunner`." source "Handles one runner agent job by fanning out its declared children, rehydrating the parent through a registry with the controller signal, and applying the shared partial-result policy."
guides/agent.md function renderFencedFile: guide "A path-addressed text body as a fenced reference block (`File: <path>\\n` ````` `<language> …`) — the framing `AgentContext`'s active-workspace text render emits." source "Renders a path-addressed text body as a fenced reference block — the framing an `AgentContext`'s ACTIVE-workspace text-file render emits (the active workspace is the SOLE document/image context)."
guides/agent.md function joinThinking: guide "The joined reasoning a run's provider calls separated from the answer — the first seeds the accumulation, a later one appends blank-line separated." source "Joins the reasoning a run's provider calls separated from the answer — the first call seeds the accumulation, a later call appends blank-line separated so each turn's reasoning stays readable."
guides/agent.md function sumUsage: guide "Two `TokenUsage` values added field by field — the running total across a turn's provider calls (the first seeds it)." source "Adds two `TokenUsage` values field by field — the running total an agent run keeps across its provider calls."
guides/agent.md function assembleResult: guide "The settled `AgentResult` assembled from a run's `RunOutcome` — `thinking` / `usage` carried only when present, the loop-internal `exhausted` flag left out." source "Assembles the settled `AgentResult` from a run's `RunOutcome` — `thinking` and `usage` are carried only when the run surfaced them."
guides/agent.md function denyCall: guide "The denial `ToolResult` an authority-blocked call is fed back with — `denied: <reason>`, or the generic denial when no reason was given." source "Synthesizes the denial `ToolResult` an authority-blocked call is fed back with — the call's `id` / `name` keyed back, carrying a denial `error` instead of a value."
guides/agent.md function renderSection: guide "One context section rendered — the resolved `open`, each item's rendering, then the resolved `close`, blank-line joined; `undefined` when the section has no items." source "Renders one context section — the resolved `open`, each item's rendering, and the resolved `close` when one exists, blank-line joined."
guides/agent.md function resolveOpen: guide "One section's leading text, resolved through the format cascade — manager-options override > provider default > built-in header." source "Resolves one section's OPEN text through the format cascade — manager-options override > provider default > built-in header."
guides/agent.md function resolveClose: guide "One section's trailing text, resolved — manager-options override > provider default; `undefined` when neither sets one (there is no built-in close)." source "Resolves one section's CLOSE text through the format cascade — manager-options override > provider default."
guides/agent.md function resolveItem: guide "One item's rendering, resolved — item override > manager-options override > provider default > the manager's built-in rendering." source "Resolves ONE item's rendering through the format cascade — item override > manager-options override > provider default > built-in rendering."
guides/agent.md function attachImages: guide "A copy of a message with image data merged onto `images` (its own first, then the attached), carrying `calls` only when present and never mutating the original." source "Copies a message with image data merged onto its `images` — the message's own images first, then the attached data."
guides/agent.md function attachUserImages: guide "A conversation with image data attached to its LAST user message — a new array with that one message replaced by its carrying copy; unchanged for no data or no user turn." source "Attaches image data to a conversation's LAST user message — the turn a vision provider reads images off."
guides/agent.md function collectImageData: guide "The `base64` payload of the IMAGE files in a workspace file list — the payload `AgentContext.build()` attaches to the last user message." source "Collects the `base64` payload of the IMAGE files in a workspace file list — the data an agent context attaches to the last user message."
guides/agent.md function buildSummaryMessage: guide "The RAW synthetic summary message for one compacted section — its `summary` verbatim, keyed by the section `id` (what the rollup digests)." source "Builds the RAW synthetic summary message for one compacted section — role `'assistant'`, the section's stable `id`, its `summary` VERBATIM as content."
guides/agent.md function buildRecapMessage: guide "The FRAMED recap message for one compacted section — the same message prefixed with `CONVERSATION_RECAP_PREFIX`, so a small model reads it as a recap." source "Builds the FRAMED recap message for one compacted section — the same role and stable `id` as `buildSummaryMessage`, with the content prefixed by `CONVERSATION_RECAP_PREFIX`."
guides/agent.md function intersectKeys: guide "The intersection of two scope allow-lists under the \"`undefined` is the universal set\" rule — a fresh copy, and narrowing can only tighten." source "Intersects two scope category lists under the \"`undefined` is the universal set\" rule — the primitive a scope narrows through."
guides/agent.md function isMessage: guide "Narrowing guard: whether an `unknown` is structurally a `Message` record (the per-message step of `isConversationSnapshot` / `isSection`); a present `calls` must be an array of valid `ToolCall`s (`isToolCall`); total, never throws." source "Checks whether an `unknown` is structurally a `Message` record — the per-message step of the `isConversationSnapshot` read-boundary narrow (a total guard over an untrusted storage read, never an assertion). The conversation analogue of `isFile`."
guides/agent.md function isSection: guide "Narrowing guard: whether an `unknown` is structurally a `Section` record (`string` `id` / `summary` + a `messages` array of valid `Message`s); the per-section step of `isConversationSnapshot`." source "Checks whether an `unknown` is structurally a `Section` record — the per-section step of the `isConversationSnapshot` read-boundary narrow (a total guard over an untrusted storage read, never an assertion)."
guides/agent.md function isConversationSnapshot: guide "The total read-boundary guard: whether an `unknown` is a `ConversationSnapshot` (`string` `id` + optional `string` `summary` + valid `sections` / `messages` arrays); total, never throws." source "Narrows an `unknown` to a `ConversationSnapshot` — the total boundary guard for an UNTRUSTED snapshot read (a storage row a `DatabaseConversationStore` reads back from its opaque JSON column, a snapshot loaded from disk). The EXACT analogue of `isWorkspaceSnapshot`."
guides/agent.md class ProviderAbortError: guide "Thrown by `stream` when its bound signal aborts mid-flight — carries the `partial` result streamed so far and a machine `code` (`'ABORT'`)." source "Reports a provider stream cancelled mid-flight by its bound signal — thrown by a `ProviderInterface`'s `stream`, carrying the `ProviderResult` assembled from whatever streamed before the cancel."
guides/agent.md function isProviderAbortError: guide "The narrowing guard for a caught `ProviderAbortError` (`instanceof`), to recover its `partial`." source "Narrows an unknown caught value to a `ProviderAbortError`."
guides/agent.md class AgentJobError: guide "Thrown by an agent-job handler when a job ended partial and the `partial` policy is `false` — carries the partial `AgentResult` and a machine `code` (`'PARTIAL'`)." source "Reports an `AgentInterface` run that ended `AgentResult.partial` under a `partial` policy of `false` (the default) — thrown by an agent-job handler (a `createAgentQueue` / `createAgentRunner` job), carrying the partial `AgentResult` so the failure stays inspectable."
guides/agent.md function isAgentJobError: guide "The narrowing guard for a caught `AgentJobError` (`instanceof`), to recover its `partial`." source "Narrows an unknown caught value to an `AgentJobError`."
guides/agent.md class ConversationError: guide "Thrown by `Conversation.compact()` / construction when no `ConversationSummaryHandler` was supplied, or a `sections` cap is sub-1 — carries a machine `code` (`'SUMMARIZER' | 'SECTIONS'`)." source "Reports a conversation with no `ConversationSummaryHandler` to fold its messages with, or with a structurally invalid `sections` cap — thrown by a `ConversationInterface`'s `compact()`, carrying a machine-readable `code`."
guides/agent.md function isConversationError: guide "The narrowing guard for a caught `ConversationError` (`instanceof`), to branch on its `code`." source "Narrows an unknown caught value to a `ConversationError`."
guides/agent.md class AgentError: guide "Thrown SYNCHRONOUSLY by `Agent.stream()` (and, because `generate()` calls `stream()` directly with zero loop logic of its own, `Agent.generate()` too) when a concurrent run would corrupt SHARED per-agent accounting, and by an `AgentRegistry` accessor when a rehydration name is absent from its pool — carries a machine `code` (`'CONCURRENCY' | 'REGISTRY'`). Synchronous means a fire-and-forget `agent.generate().catch(...)` will NOT catch it (the throw happens on the call itself, before any `Promise` exists to attach `.catch` to) — `await` the call inside `try`/`catch`, or wrap the call expression in `try`/`catch`." source "Reports a concurrent run that would corrupt SHARED per-agent accounting, or a rehydration name absent from its registry pool — thrown synchronously by an `AgentInterface`'s `stream()` and by an `AgentRegistryInterface`'s accessors, carrying a machine-readable `code`."
guides/agent.md function isAgentError: guide "The narrowing guard for a caught `AgentError` (`instanceof`), to branch on its `code`." source "Narrows an unknown caught value to an `AgentError`."
guides/agent.md type MessageRole: guide absent source "Names the role a `Message` plays in a conversation turn."
guides/agent.md interface Message: guide absent source "Represents one conversation turn fed to a `ProviderInterface` — a stored, identified message."
guides/agent.md interface MessageInput: guide absent source "Carries the minimal data needed to author a `Message` — the `id` is assigned by the layer that stores it, so a caller supplies only role / content (and, for a replayed assistant turn, its `calls`)."
guides/agent.md interface ProviderResult: guide absent source "Holds a single inference turn's structured outcome — the assembled assistant content, any reasoning the provider separated from it, any tool calls the model requested, and the token usage it reported."
guides/agent.md type ProviderDelta: guide absent source "Represents one streamed delta a `ProviderInterface`'s `stream` yields — a TAGGED unit discriminated by the channel it belongs to, so the agent loop can re-surface the two channels separately (answer content vs. live reasoning) as it pumps."
guides/agent.md interface ProviderStreamOptions: guide absent source "Carries the per-call options threaded into a `ProviderInterface`'s `generate` / `stream` — the bag a caller passes to influence ONE inference call without reconfiguring the provider instance."
guides/agent.md interface ProviderInterface: guide absent source "Defines the pluggable LLM inference boundary — the one contract every agent chunk depends on. A provider turns a conversation (plus optional tools) into either a single assembled `ProviderResult` (`generate`) or a stream of `ProviderDelta`s that RETURNS the assembled result (`stream`)."
guides/agent.md interface ThinkSplitterInterface: guide absent source "Splits a thinking model's in-content `<think>…</think>` reasoning spans away from the answer, delta by delta with per-stream state, so a provider yields ONLY clean content and surfaces the reasoning as `ProviderResult.thinking`."
guides/agent.md interface ContextSectionFormat: guide absent source "Overrides one context section's format — an `open` / `render` / `close` trio that frames a section in the `AgentContext` build cascade: a top line rendered once before the items, a per-item rendering, and a bottom line rendered once after the items."
guides/agent.md interface ContextFormat: guide absent source "Holds a provider's OPTIONAL context-framing default, keyed by section kind — the framing a model prefers (for example XML tags against Markdown headers), declared by a `ProviderInterface` that opts in."
guides/agent.md interface ContextSectionSourceInterface: guide absent source "Exposes the manager surface one context section's format cascade reads — its built-in `open` / `render`, plus the raw options override the cascade layers a provider default beneath."
guides/agent.md interface MessageManagerInterface: guide absent source "Stores immutable `Message`s in insertion order; `add` mints the `id`."
guides/agent.md interface InstructionInterface: guide absent source "Represents an immutable instruction — a named directive a richer context places between the system prompt and the conversation, ordered by descending `priority`."
guides/agent.md interface InstructionInput: guide absent source "Carries the minimal data to author an `InstructionInterface` — the `id` is minted by the `InstructionManagerInterface` that stores it, so a caller supplies only `name` / `content` (and an optional `priority`, defaulting to `0`)."
guides/agent.md type InstructionManagerEventMap: guide absent source "Maps the push observation surface of an `InstructionManagerInterface` — the mutation moments a fire-and-forget observer subscribes to through `manager.emitter.on`."
guides/agent.md interface InstructionManagerOptions: guide absent source "Configures `createInstructionManager` — the reserved `on` hooks plus an optional per-section format override."
guides/agent.md interface InstructionManagerInterface: guide absent source "Registers `InstructionInterface`s keyed by `name` — `add` (one or a batch) mints each `id` and OVERWRITES a same-name instruction (last write wins); `instructions()` lists them SORTED by descending `priority` (stable for ties)."
guides/agent.md interface ScopeFilter: guide absent source "Lists the per-category allow-lists a `ScopeInterface` carries — an optional `readonly string[]` for `instructions`, for `tools`, and for `files`, each keyed by that category's identity (an instruction's `name`, a tool's `name`, a workspace file's `path`)."
guides/agent.md interface ScopeInput: guide absent source "Carries the data to author a `ScopeInterface` — a `ScopeFilter` plus the required `name` (a human label; the `id` is minted by the layer that stores it)."
guides/agent.md interface ScopeInterface: guide absent source "Represents a named, immutable filter over a richer context's items — the per-category allow-lists (`ScopeFilter`) plus an `id` / `name`, and a `narrow` that composes a tighter child by set-INTERSECTION."
guides/agent.md type ScopeManagerEventMap: guide absent source "Maps the push observation surface of a `ScopeManagerInterface` — analogous to `InstructionManagerEventMap`, but keyed by the minted `id` and carrying `create` (a scope always mints, never overwrites) rather than `add`."
guides/agent.md interface ScopeManagerOptions: guide absent source "Configures `createScopeManager` — the reserved `on` hooks: initial listeners for the manager's `ScopeManagerEventMap`, wired at construction."
guides/agent.md interface ScopeManagerInterface: guide absent source "Registers reusable `ScopeInterface`s keyed by their minted `id` — `create` mints + stores one (never overwrites), `scopes()` lists them in insertion order."
guides/agent.md interface AgentContextOptions: guide absent source "Configures `createAgentContext` — the richer context's configuration."
guides/agent.md interface AgentContextInterface: guide absent source "Assembles a turn's provider input from the system prompt + the context managers + the conversation, applying the active scope per category."
guides/agent.md type AgentStatus: guide absent source "Names the lifecycle state of an `AgentInterface` turn — `idle` before a run, `running` while the loop is in flight, then the settled `done` (a normal finish or a cancel) or `error` (a genuine provider / tool failure)."
guides/agent.md type AgentChunk: guide absent source "Represents a streamed step of an agent turn — the union the loop yields as it runs, discriminated by the `category` of step it carries."
guides/agent.md type AgentEventMap: guide absent source "Maps the push observation surface of an `AgentInterface` — the lifecycle + usage/tool moments a fire-and-forget observer (logging, metrics, tracing) subscribes to, ALONGSIDE the pull `AgentChunk` stream."
guides/agent.md interface AgentResult: guide absent source "Holds the settled outcome of an agent turn — the assembled assistant `content`, the `usage` summed across the turn's provider calls, and whether it was committed `partial`."
guides/agent.md interface RunOutcome: guide absent source "Holds the immutable per-run outcome an `AgentInterface`'s loop settles on — the value its run RETURNS, assembled from there into the `AgentResult` its `stream`'s `result` promise resolves."
guides/agent.md interface ChannelInterface: guide absent source "Buffers values in an unbounded async channel — a producer WRITES them in (`push`) and ends it (`close` / `fail`) regardless of consumption, while a consumer READS them back live through `drain`."
guides/agent.md interface StreamInterface: guide absent source "Pairs a live event stream with the eventual settled result and a cancel — the generic pull/streaming handle a long-running operation hands back."
guides/agent.md type AgentStreamInterface: guide absent source "Names the agent turn's live handle — a `StreamInterface` of `AgentChunk`s resolving an `AgentResult`."
guides/agent.md interface AgentOptions: guide absent source "Configures `createAgent` — bounds and pacing for the agent loop."
guides/agent.md interface AgentRunOptions: guide absent source "Carries the per-run override bag an `AgentInterface`'s `generate` / `stream` accepts — each member overrides the matching `AgentOptions` value for ONE run."
guides/agent.md interface AgentInterface: guide absent source "Composes a `ProviderInterface`, an `AgentContextInterface`, and a `ToolManagerInterface` into a bounded context → provider → tools → repeat turn."
guides/agent.md interface AuthorityContext: guide absent source "Carries what an `AuthorityInterface` evaluates for one tool call — the call under consideration."
guides/agent.md interface AuthorityDecision: guide absent source "Holds an `AuthorityInterface`'s verdict on one tool call."
guides/agent.md interface AuthorityRule: guide absent source "Represents one ordered policy rule an `AuthorityInterface` evaluates."
guides/agent.md interface AuthorityOptions: guide absent source "Configures `createAuthority` — the ordered rules and the no-match fallback."
guides/agent.md interface AuthorityInterface: guide absent source "Gates each tool call before it runs — the synchronous policy that turns one `AuthorityContext` into an `AuthorityDecision`."
guides/agent.md interface AgentJobInput: guide absent source "Represents a JSON-serializable agent job — the descriptor a durable queue / runner runs. Its non-serializable pieces (the provider, tools, authority, scheduler) are referenced by NAME and resolved to live objects through an `AgentRegistryInterface` at handler time; its data fields (the seed `messages`, `system`, `limit`, `timeout`, and a token `budget` ceiling) carry directly."
guides/agent.md interface AgentRegistryInterface: guide absent source "Resolves an `AgentJobInput`'s names to the live, non-serializable pieces and rehydrates a seeded, signal-wired `AgentInterface` — the bridge that makes a durable, serializable job runnable."
guides/agent.md interface AgentRegistryOptions: guide absent source "Configures `createAgentRegistry` — the named pools of live, non-serializable pieces a `AgentJobInput`'s names resolve against."
guides/agent.md interface AgentQueueOptions: guide absent source "Configures `createAgentQueue` — the registry that rehydrates jobs, the partial-result policy, and the substrate knobs threaded into the backing `createQueue`."
guides/agent.md interface AgentRunnerOptions: guide absent source "Configures `createAgentRunner` — the registry that rehydrates jobs, the partial-result policy, and the substrate knobs threaded into the backing `createRunner`."
guides/agent.md type ConversationSummaryHandler: guide absent source "Summarizes a conversation, provider-agnostically — the seam the agent RUNTIME supplies so core never imports a provider. Given the folded messages, it resolves their digest (the model-written summary), used both to summarize a compacted `Section` and to regenerate a `ConversationInterface`'s rollup `summary`."
guides/agent.md interface Section: guide absent source "Holds a slice of folded messages digested into a summary — the unit of compaction a `ConversationInterface` produces when it `compact`s its live tail."
guides/agent.md type ConversationEventMap: guide absent source "Maps the push observation surface of a `ConversationInterface` — the compaction moments a fire-and-forget observer subscribes to through `conversation.emitter.on`."
guides/agent.md interface ConversationOptions: guide absent source "Configures `createConversation` — the optional `id`, the reserved `on` hooks, the provider-agnostic `summarize` seam, and the retained-tail size."
guides/agent.md interface CompactOptions: guide absent source "Configures one `ConversationInterface.compact` call — overrides for ONE fold."
guides/agent.md interface ConversationReferenceOptions: guide absent source "Configures `ConversationInterface.reference` — how to render ONE conversation as a self-labeled, fenced PROVENANCE block to pull INTO another conversation (by writing it to the active context's active workspace)."
guides/agent.md interface ConversationInterface: guide absent source "Groups messages ABOVE the flat `MessageManagerInterface` — a live uncompacted tail plus compacted, summarized `Section`s and a conversation rollup `summary`, with on-demand `rehydrate` and substring `search`, driven by a provider-agnostic `ConversationSummaryHandler` seam."
guides/agent.md interface ConversationInput: guide absent source "Carries the data to author a `ConversationInterface` through a `ConversationManagerInterface` — the optional `id`, a `summarize` override, a `keep` override, and the reserved `on` hooks."
guides/agent.md interface ConversationManagerOptions: guide absent source "Configures `createConversationManager` — the default `ConversationSummaryHandler` and retained-tail size the conversations it creates inherit."
guides/agent.md interface ConversationManagerInterface: guide absent source "Registers `ConversationInterface`s keyed by their `id`, in insertion order, WITH an active pointer — the id-keyed store over the conversation layer PLUS the `active` / `switch` seam the `AgentContextInterface` renders. Event-free (a registry, like `WorkspaceManagerInterface`); the observability lives on each `ConversationInterface`."
guides/agent.md interface ConversationSnapshot: guide absent source "Holds a JSON-serializable snapshot of a conversation's state — its `id`, the rollup `summary`, the compacted `sections`, and the live tail `messages` — the durable payload the `ConversationStoreInterface` persists. The exact analogue of `WorkspaceSnapshot`."
guides/agent.md interface ConversationStoreInterface: guide absent source "Persists a `ConversationSnapshot` durably — three async primitives (`get` / `set` / `delete`) keyed by a conversation id, the exact analogue of `WorkspaceStoreInterface`."
guides/agent.md interface ConversationSnapshotRow: guide absent source "Represents one row of the table a `DatabaseConversationStore` persists — a conversation `id` plus its `ConversationSnapshot` held as ONE OPAQUE JSON column. The exact analogue of `WorkspaceSnapshotRow`."
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
```

## Facts for agent (taken 2026-09-07T17:02Z by facts.sh)

- Checkout `/home/user/fleet/agent`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `5c2a8f0`, status: clean
- `package.json`: version `0.0.21`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    95:			const members = source.methods(group.interface).map((method) => method.name)
    103:					expect(findMissing(members, documented)).toEqual([])
    106:					expect(findMissing(documented, members)).toEqual([])
    112:							: findMissing(
    113:									source.methods(entity).map((method) => method.name),
    131:				findUnexampled(
    134:					source.examples().map((example) => example.name),
    139:		for (const group of guide.methods()) {
    144:					? source.examples(group.interface).map((example) => example.name)
    148:							.concat(source.examples(entity).map((example) => example.name))
    155:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    167:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 1113:## Tests — 1 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-agent-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/agent.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/agent.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-agent-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
