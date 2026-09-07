# Report — P.1 `d7n-agent-prep` (agent)

Every item landed. Every acceptance criterion reads green except `docs`, which reads red by design and carries the converge unit's worklist.

Checkout `/home/user/fleet/agent`, branch `claude/orkestrel-npm-audit-deps-14ibta`, baseline tip `d1b3804`. Wall clock 2026-09-07T16:44:53Z → 2026-09-07T16:54:39Z.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`, exit 0.

```text
0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 27 unchanged, 0 removed in ..
```

`git status --short` directly after, the P21 list exactly:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/policy.test.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```

The three small hunks `repair` wrote:

```diff
--- a/.oxlintrc.json
+++ b/.oxlintrc.json
-		"policy/no-keyword-privacy": "error"
+		"policy/no-keyword-privacy": "error",
+		"policy/no-malformed-summary": "error",
+		"policy/no-banned-term": "error"
--- a/package.json
+++ b/package.json
-		"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup"
+		"test:setup": "vitest run --config vite.config.ts --no-cache --reporter=dot --project setup",
+		"docs": "node --experimental-strip-types scripts/docs.ts"
--- a/tsconfig.json
+++ b/tsconfig.json
-			"@src/core": ["./src/core/index.ts"]
+			"@src/core": ["./src/core/index.ts"],
+			"@orkestrel/agent": ["./src/core/index.ts"]
```

## Item 2 — the drop-in's adaptation (`tests/guides.test.ts`)

```diff
@@ -92,21 +92,27 @@ for (const entry of manifest) {
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/, '')
 			describe(`${group.interface}`, () => {
 				it('documents at least one method', () => {
 					expect(group.methods.length).toBeGreaterThan(0)
 				})
 				it('documents every interface method', () => {
-					expect(findMissing(members, group.methods)).toEqual([])
+					expect(findMissing(members, documented)).toEqual([])
 				})
 				it('documents no phantom method', () => {
-					expect(findMissing(group.methods, members)).toEqual([])
+					expect(findMissing(documented, members)).toEqual([])
 				})
 				it(`${entity} exposes no undocumented method`, () => {
 					const extra =
-						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
+						entity === group.interface
+							? []
+							: findMissing(
+									source.methods(entity).map((method) => method.name),
+									documented,
+								)
 					expect(extra).toEqual([])
 				})
 			})
@@ -121,22 +127,32 @@ for (const entry of manifest) {
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
 
 		for (const group of guide.methods()) {
 			const entity = group.interface.replace(/Interface$/, '')
+			const documented = group.methods.map((method) => method.name)
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

Each adapted construct matches the pilot `/home/user/fleet/abort/tests/guides.test.ts` file byte for byte: the methods loop (pilot `146-171`, agent `94-119`), the Surface-function examples case (pilot `191-207`, agent `121-137`), and the examples loop (pilot `209-228`, agent `139-158`). The pilot's `findDrift` equality case sits between the first two of those and is not adopted here, because item 2 fixes the edits and the `docs` disagreements it would assert on are the converge unit's. The `group.methods.length` assertion stays. The two `findMissing` calls whose arguments are already strings — `statement.names` against `face.surface().map((symbol) => symbol.name)` in the import walk, and `names` against `surface` — are untouched. No other change to the suite.

## Item 3 — the voice sites

Command: `npx oxlint --config .oxlintrc.json --deny-warnings .`, exit 1 before, exit 0 after. Total 57 diagnostics: `policy/no-malformed-summary` 31, `policy/no-banned-term` 26. Every one sat in an owned file under `tests/**`; no diagnostic named an off-limits file, and none named a file under `src/**`.

Files edited, with the diagnostic count each carried: `tests/setup.ts` (31 `no-malformed-summary`, 2 `no-banned-term`), `tests/src/core/Agent.test.ts` (9 `no-banned-term`), `tests/src/core/AgentContext.test.ts` (6 `no-banned-term`), `tests/src/core/conversations/Conversation.test.ts` (3 `no-banned-term`), `tests/src/core/factories.test.ts` (3 `no-banned-term`), `tests/src/core/AgentRegistry.test.ts` (1 `no-banned-term`), `tests/src/core/helpers.test.ts` (1 `no-banned-term`), `tests/src/core/integration.test.ts` (1 `no-banned-term`).

### `tests/setup.ts` — `no-malformed-summary`, each pair the description paragraph's first line

`35:1` — `ScriptedTurn`

- before: ` * One turn a {@link createScriptedProvider} replays — either a bare {@link ProviderResult}`
- after: ` * Replays one turn of a {@link createScriptedProvider} script — either a bare {@link ProviderResult}`

`50:1` — `ScriptedCall`

- before: ` * One recorded `generate` / `stream` call on a {@link createScriptedProvider} (when `record`).`
- after: ` * Describes one recorded `generate` / `stream` call on a {@link createScriptedProvider} (when `record`).`

`65:1` — `DeltasOf`

- before: `/** How a {@link createScriptedProvider} chunks a turn's content into stream deltas. */`
- after: `/** Chunks a turn's content into the stream deltas a {@link createScriptedProvider} emits. */`

`96:1` — `ScriptedProviderInterface`

- before: ` * A scripted {@link ProviderInterface} plus its live recorders — `maxInFlight` is the`
- after: ` * Extends a scripted {@link ProviderInterface} with its live recorders — `maxInFlight` is the`

`111:1` — `turnParts`

- before: ` * Normalize a {@link ScriptedTurn} to its `{ result, deltas, thoughts }` parts — a bare result`
- after: ` * Normalizes a {@link ScriptedTurn} to its `{ result, deltas, thoughts }` parts — a bare result`

`129:1` — `chunkWholeDelta`

- before: ` * Chunk a turn's whole content into ONE stream delta — the default {@link DeltasOf} a`
- after: ` * Chunks a turn's whole content into ONE stream delta — the default {@link DeltasOf} a`

`141:1` — `createScriptedProvider`

- before: ` * Create the shared scripted {@link ProviderInterface} for deterministic, Ollama-free agent`
- after: ` * Creates the shared scripted {@link ProviderInterface} for deterministic, Ollama-free agent`

`162:1` — `ScriptedProvider`

- before: ` * The scripted {@link ProviderInterface} {@link createScriptedProvider} builds — a REAL provider` / ` * that replays its turns, honours its signal between every delta, and records its calls.`
- after: ` * Replays the turns {@link createScriptedProvider} scripts — a REAL {@link ProviderInterface}` / ` * that honours its signal between every delta and records its calls.`

`299:1` — `createToolCall`

- before: ` * Build a {@link ToolCall} for an agent / loop test — the verbose `{ id, name, arguments }``
- after: ` * Builds a {@link ToolCall} for an agent / loop test — the verbose `{ id, name, arguments }``

`311:1` — `createTokenUsage`

- before: ` * Build a {@link TokenUsage} for an agent / budget test — the default `{ prompt: 5,`
- after: ` * Builds a {@link TokenUsage} for an agent / budget test — the default `{ prompt: 5,`

`322:1` — `addTool`

- before: ` * The canonical `add` tool — a REAL {@link ToolInterface} that returns a fixed `5`, the`
- after: ` * Builds the canonical `add` tool — a REAL {@link ToolInterface} that returns a fixed `5`, the`

`335:1` — `loopTool`

- before: ` * The canonical `loop` tool — a REAL {@link ToolInterface} that always returns `'again'`,`
- after: ` * Builds the canonical `loop` tool — a REAL {@link ToolInterface} that always returns `'again'`,`

`346:1` — `createAgentJob`

- before: ` * Build an {@link AgentJobInput} for an agent-job test — the default `{ provider: 'main',`
- after: ` * Builds an {@link AgentJobInput} for an agent-job test — the default `{ provider: 'main',`

`360:1` — `createStubSummarizer`

- before: ` * Create a deterministic stub {@link ConversationSummaryHandler} for the conversation-layer tests`
- after: ` * Creates a deterministic stub {@link ConversationSummaryHandler} for the conversation-layer tests`

`386:1` — `RecordingSchedulerInterface`

- before: `/** A {@link SchedulerInterface} that records how many turn boundaries its `yield` paced. */`
- after: `/** Records how many turn boundaries a {@link SchedulerInterface}'s `yield` paced. */`

`392:1` — `createRecordingScheduler`

- before: ` * Create a {@link RecordingSchedulerInterface} — a real `SchedulerInterface` whose`
- after: ` * Creates a {@link RecordingSchedulerInterface} — a real `SchedulerInterface` whose`

`426:1` — `buildConversationSnapshot`

- before: ` * Build a REAL {@link ConversationSnapshot} the way a conversation produces one — three turns`
- after: ` * Builds a REAL {@link ConversationSnapshot} the way a conversation produces one — three turns`

`464:1` — `ConversationStoreRoundTripExpectation`

- before: `/** The literal values a {@link conversationStoreRoundTrip} result must carry, shared by every twin. */`
- after: `/** Names the literal values a {@link conversationStoreRoundTrip} result must carry, shared by every twin. */`

`472:1` — `conversationStoreRoundTripExpectation`

- before: ` * The literal values `buildConversationSnapshot()`'s round trip must reproduce — the fold's section`
- after: ` * Holds the literal values `buildConversationSnapshot()`'s round trip must reproduce — the fold's section`

`484:1` — `conversationStoreRoundTrip`

- before: ` * Run the round-trip scenario of the shared `ConversationStoreInterface` contract: set a real`
- after: ` * Runs the round-trip scenario of the shared `ConversationStoreInterface` contract: set a real`

`508:1` — `conversationStoreUpsert`

- before: ` * Run the upsert scenario: `set` keys off the snapshot's OWN id (no separate id param), so`
- after: ` * Runs the upsert scenario: `set` keys off the snapshot's OWN id (no separate id param), so`

`536:1` — `conversationStoreDeleteThenAbsent`

- before: ` * Run the delete scenario: set a snapshot, read it back (proving it landed), delete it, then read`
- after: ` * Runs the delete scenario: set a snapshot, read it back (proving it landed), delete it, then read`

`560:1` — `conversationStoreDeleteAbsent`

- before: ` * Run the absent-delete scenario: deleting an id that was never stored — the caller asserts the`
- after: ` * Runs the absent-delete scenario: deleting an id that was never stored — the caller asserts the`

`571:1` — `conversationStoreGetAbsent`

- before: ` * Run the absent-get scenario: getting an id that was never stored — the caller asserts the result`
- after: ` * Runs the absent-get scenario: getting an id that was never stored — the caller asserts the result`

`584:1` — `conversationStoreTwoIds`

- before: ` * Run the two-ids-coexist scenario: a real durable store holds many conversations, so distinct ids`
- after: ` * Runs the two-ids-coexist scenario: a real durable store holds many conversations, so distinct ids`

`623:1` — `createSeededToolManager`

- before: ` * Build a {@link ToolManagerInterface} pre-seeded with working tools — the registry the agent`
- after: ` * Builds a {@link ToolManagerInterface} pre-seeded with working tools — the registry the agent`

`636:1` — `seedWorkspaceContext`

- before: ` * Build an {@link AgentContextInterface} whose ACTIVE workspace holds two TEXT files`
- after: ` * Builds an {@link AgentContextInterface} whose ACTIVE workspace holds two TEXT files`

`662:1` — `seedInstructionContext`

- before: ` * Build an {@link AgentContextInterface} carrying a system prompt, two named instructions`
- after: ` * Builds an {@link AgentContextInterface} carrying a system prompt, two named instructions`

`693:1` — `resolveSectionOpen`

- before: ` * Resolve the instructions section's `open` (its header) at whichever cascade levels the`
- after: ` * Resolves the instructions section's `open` (its header) at whichever cascade levels the`

`720:1` — `resolveSectionRender`

- before: ` * Resolve ONE instruction item's rendering at whichever cascade levels the arguments set — the`
- after: ` * Resolves ONE instruction item's rendering at whichever cascade levels the arguments set — the`

`757:1` — `seedConversation`

- before: ` * Register a conversation on a {@link ConversationManagerInterface} and compact it, so the`
- after: ` * Registers a conversation on a {@link ConversationManagerInterface} and compacts it, so the`

### `no-banned-term`, each pair the diagnostic's line

`tests/setup.ts:68` — `via`

- before: ` * - `delay` — ms paused at the start of each call (lets a test observe concurrency via`
- after: ` * - `delay` — ms paused at the start of each call (lets a test observe concurrency through`

`tests/setup.ts:96` — `e.g.`

- before: ` * agent jobs, e.g. `concurrency: 2` ⇒ `maxInFlight <= 2`), `started` counts calls, and`
- after: ` * agent jobs, for example `concurrency: 2` ⇒ `maxInFlight <= 2`), `started` counts calls, and`

`tests/src/core/Agent.test.ts:51` — `via`

- before: `// test opts the provider into `record: true` (to assert, via `provider.calls`, the`
- after: `// test opts the provider into `record: true` (to assert, through `provider.calls`, the`

`tests/src/core/Agent.test.ts:61` — `via`

- before: `// messages / tools each call saw (asserted via `provider.calls`) and treats over-running the`
- after: `// messages / tools each call saw (asserted through `provider.calls`) and treats over-running the`

`tests/src/core/Agent.test.ts:63` — `should`

- before: `// repeat — so a loop that should have stopped (a cap / budget / cancel) but didn't is caught.`
- after: `// repeat — so a loop that had to stop (a cap / budget / cancel) but didn't is caught.`

`tests/src/core/Agent.test.ts:212` — `via`

- before: `		// Tools reach the provider via definitions(), never serialized into messages.`
- after: `		// Tools reach the provider through definitions(), never serialized into messages.`

`tests/src/core/Agent.test.ts:1114` — `via`

- before: `		// Pull exactly ONE chunk via the iterator protocol, then `return()` the iterator —`
- after: `		// Pull exactly ONE chunk through the iterator protocol, then `return()` the iterator —`

`tests/src/core/Agent.test.ts:2298` — `via`

- before: `// error via the bound signal's `aborted` flag (see the loop's `#provide` catch), so the`
- after: `// error through the bound signal's `aborted` flag (see the loop's `#provide` catch), so the`

`tests/src/core/Agent.test.ts:2641` — `via`

- before: `		// Pass listeners via the reserved `on` option — they must fire without a later .on().`
- after: `		// Pass listeners through the reserved `on` option — they must fire without a later .on().`

`tests/src/core/Agent.test.ts:3138` — `via`

- before: `// Each "request" makes the thread `id` active (creating via `add({ id })` when absent, then`
- after: `// Each "request" makes the thread `id` active (creating through `add({ id })` when absent, then`

`tests/src/core/Agent.test.ts:3346` — `via`

- before: `		// path and exits via the `for` condition (never a `break`) -- the same shape as a genuine`
- after: `		// path and exits through the `for` condition (never a `break`) -- the same shape as a genuine`

`tests/src/core/AgentContext.test.ts:109` — `via`

- before: `		// description, or definition; tools reach the provider via definitions(), not here.`
- after: `		// description, or definition; tools reach the provider through definitions(), not here.`

`tests/src/core/AgentContext.test.ts:345` — `just`

- before: `		// Identical to the original lean behavior: just [system, user].`
- after: `		// Identical to the original lean behavior: [system, user] and nothing else.`

`tests/src/core/AgentContext.test.ts:525` — `via`

- before: `		// One active workspace holding BOTH a text file (added via write) and an image file (seeded,`
- after: `		// One active workspace holding BOTH a text file (added through write) and an image file (seeded,`

`tests/src/core/AgentContext.test.ts:958` — `via`, twice on one line

- before: `		// 'a' renders via its per-item override; 'b' via the built-in content — same section.`
- after: `		// 'a' renders through its per-item override; 'b' through the built-in content — same section.`

`tests/src/core/AgentContext.test.ts:1061` — `via`

- before: `// authoritative). A manager is supplied via AgentContextOptions.conversations; `manager.add()` mints`
- after: `// authoritative). A manager is supplied through AgentContextOptions.conversations; `manager.add()` mints`

`tests/src/core/AgentRegistry.test.ts:456` — `just`

- before: `		// a partial — proving the threaded signal is the agent's actual cancel, not just a`
- after: `		// a partial — proving the threaded signal is the agent's actual cancel, not a`

`tests/src/core/conversations/Conversation.test.ts:142` — `just`

- before: `		// view() is now just the single section's FRAMED recap message (the lean RECAP-label prefix`
- after: `		// view() is now the single section's FRAMED recap message (the lean RECAP-label prefix`

`tests/src/core/conversations/Conversation.test.ts:499` — `just`

- before: `		// The RAW baseline: what view() would estimate with UNFRAMED section summaries (just the` / `		// summary text), versus the ACTUAL framed view(). The delta is the framing's whole cost.`
- after: `		// The RAW baseline: what view() would estimate with UNFRAMED section summaries (the` / `		// summary text alone), versus the ACTUAL framed view(). The delta is the framing's whole cost.`

`tests/src/core/conversations/Conversation.test.ts:775` — `via`

- before: `		// its original message must still be found via search.`
- after: `		// its original message must still be found through search.`

`tests/src/core/factories.test.ts:202` — `via`

- before: `// off `AgentResult.partial` alone, not off the budget-via-loop-tool mechanism in`
- after: `// off `AgentResult.partial` alone, not off the loop-tool budget mechanism in`

`tests/src/core/factories.test.ts:496` — `via`

- before: `// Beyond the budget-via-loop-tool route already covered above: a SECOND independent`
- after: `// Beyond the loop-tool budget route already covered above: a SECOND independent`

`tests/src/core/factories.test.ts:855` — `via`

- before: `		// handler fans the child out via `void controller.spawn(...)` and RETURNS (never`
- after: `		// handler fans the child out through `void controller.spawn(...)` and RETURNS (never`

`tests/src/core/helpers.test.ts:405` — `via`

- before: `	// finish resolves with the run's result; a PARTIAL (forced via a pre-aborted signal,`
- after: `	// finish resolves with the run's result; a PARTIAL (forced through a pre-aborted signal,`

`tests/src/core/integration.test.ts:193` — `just`

- before: `		// The shared scripted provider (used across the agent-job tests) is ALSO just a`
- after: `		// The shared scripted provider (used across the agent-job tests) is ALSO a`

### Ancillary wordings decided here

- `via` inside the hyphenated compound `budget-via-loop-tool` reads wrong as `budget-through-loop-tool`, so both sites became `loop-tool budget` (the mechanism and the route). The fact each sentence carried is unchanged.
- `just the summary text` became `the summary text alone`, and `just [system, user]` became `[system, user] and nothing else`, because a bare deletion drops the restrictive sense the assertion beside it depends on.
- `a loop that should have stopped` became `a loop that had to stop`; the imperative does not fit a past-conditional clause.
- Each summary rewrite keeps every fact its paragraph carried, opens with a third-person verb ending in `s`, and names no symbol in its first sentence. No code token moved, nothing was renamed, and no assertion's value changed.

### The prose sweep in `guides/**` and `README.md`

`npm run test:policy` exits 0, and its real-workspace case routes `inspectPolicyProse(process.cwd())` over the authored Markdown population (`tests/setupPolicy.ts:1559-1568`, reached from `tests/policy.test.ts:471-473`). It reported nothing, so no line in `guides/**` or `README.md` needed an edit and neither file is touched.

## Item 4 — the bump

```diff
--- a/package.json
+++ b/package.json
-	"version": "0.0.20",
+	"version": "0.0.21",
```

`package-lock.json` is untouched. The `@orkestrel/guide` range stays `^0.0.17` at `package.json:87`.

## Acceptance criteria

**1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else.**

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/src/core/Agent.test.ts
 M tests/src/core/AgentContext.test.ts
 M tests/src/core/AgentRegistry.test.ts
 M tests/src/core/conversations/Conversation.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/integration.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

`package.json` carries the repair's `docs` script row and the bump, and nothing else.

**2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.**

`npm run format` ran first, exit 0 (`Finished in 11301ms on 78 files using 4 threads.`).

```text
$ npm run format:check   → EXIT 0
All matched files use the correct format.
Finished in 11915ms on 78 files using 4 threads.

$ npx oxlint --config .oxlintrc.json --deny-warnings .   → EXIT 0
(no output)

$ npm run check   → EXIT 0
> @orkestrel/agent@0.0.21 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json
```

**3. `npm run test:guides` exits 0; `npm run test:policy` and `npm run test:config` exit 0.**

```text
$ npm run test:guides   → EXIT 0
 Test Files  1 passed (1)
      Tests  91 passed (91)
   Duration  2.11s (transform 818ms, setup 921ms, import 412ms, tests 364ms, environment 0ms)

$ npm run test:policy   → EXIT 0
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.54s (transform 750ms, setup 758ms, import 147ms, tests 411ms, environment 0ms)

$ npm run test:config   → EXIT 0
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
   Duration  9.36s (transform 1.21s, setup 645ms, import 1.14s, tests 7.34s, environment 0ms)
```

P21 read `test:guides` red at `Tests 54 failed | 37 passed (91)` before the adaptation; the same command now reads `91 passed (91)`, and the case population is unchanged at 91.

The `test:policy` skip is `denylist currency > registers every substitution-table term as either matched or judged`, a conditional skip inside the vendored `tests/policy.test.ts` file, unchanged from the baseline. The `test:config` skip is likewise vendored and unchanged.

**4. `npm run docs` reads a non-zero `rows read` and exits 1.**

Exit 1, terminal line `rows read: 1, disagreements found: 190`. The worklist follows verbatim.

## The `docs` worklist, verbatim

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
```

## Deviation state

None. `repair` wrote exactly the P21 list, every before-text was found verbatim, no voice diagnostic named an off-limits file, `test:policy` reported nothing outside my scope, and every gate other than `docs` reads green.

## Notes for the Orchestrator

- No `npm install` or `npm ci` ran. `node_modules` and `package-lock.json` are untouched; the root version in the lockfile still reads `0.0.20` and lands with your lockfile-only install.
- Instruments and logs are under `/home/user/fleet/agent/tmp/d7n-agent-prep/` (`repair.log.txt`, `lint.log.txt` before, `lint3.log.txt` after, `format.log.txt`, `formatcheck.log.txt`, `check.log.txt`, `testguides.log.txt`, `testpolicy.log.txt`, `testconfig.log.txt`, `docs.log.txt`, and the two edit scripts `adapt.py` and `voice.py`). `tmp/` is git-ignored, so nothing there enters the commit.
