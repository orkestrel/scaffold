I'll read the brief and the repo's coding contracts first, then follow the brief exactly in read-only mode.The brief is a read-only absorption job. Next I’ll load the unit rows, audit claims, writer report, and evidence so each row can be mapped against the tree.Inputs are loaded. I’ll quote the cited law, then map each row’s current site, diff hunk, and old-form sweep against the report.## Question

For every row of unit conform-agent, what does the tree at `/home/user/fleet/agent` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

Law sentences cited (scaffold copies):

- agent-obj-1 — `.claude/rules/typescript.md` § Errors and outcomes: `| Programmer error or invalid argument | Throw an \`AppError\` |`; `Error classes expose a machine-readable \`code\` and optional \`context\`.`; `Every public error class ships with a guard such as \`isAppError\` for safe \`catch\` narrowing.`
- agent-obj-2 — `AGENTS.md` § Design laws: `**Derive state.** Compute facts from existing fields. Do not store a second flag or label that can drift.`
- agent-obj-3 — `.claude/rules/tests.md` § Cross-cutting proofs: `` `tests/guides.test.ts` | Every documented API exists, every public API is documented, and every executable fence returns what the guide says it returns ``; `Transcribe each flagship fence and assert the values its comments claim. Name resolution is not a behavioural proof, so a fence documenting a value the code contradicts passes every parity assertion. Change a fence, change the transcription beside it.`
- agent-obj-4 — `.claude/rules/tests.md` § Test contract: `Mirror module/application structure: \`tests/{src,app}/[environment]/[domain]/[module].test.ts\`.` ; `Do not create test files solely for \`constants.ts\`, barrels, error definitions, or \`types.ts\`.`
- agent-obj-5 — `AGENTS.md`: `**No nested functions.** Extract function declarations and assignments from bodies.`; `.claude/rules/architecture.md`: `This bans local \`function\`, \`function*\`, and \`const fn = () => ...\`, regardless of caller count.`
- agent-obj-6 — `.claude/rules/tests.md`: `Export every reusable helper, fixture type, factory, constant, and guard from setup files.`; `.claude/rules/architecture.md`: `Every declaration in a centralized file is exported. Fold away a trivial single-use declaration or export/test it; never leave it hidden.`
- agent-obj-7 — `.claude/rules/tests.md`: `Test files import shared infrastructure rather than declaring local fixture factories.`; `Any duplicate or near-duplicate helper is a defect; consolidate it into one general form.`
- agent-obj-8 — `.claude/rules/patterns.md`: `Reuse the originating package directly when semantics match.`; `Never reimplement or rename-wrap a declared package primitive.`; `Keep local behavior only when it adds a real domain invariant, composition, projection, translation, or intentionally different contract.`
- agent-obj-9 — `.claude/rules/typescript.md` § Types: `\`as const\` annotates a literal with its own type and never overrides the checker, so the assertion ban does not reach it. Use it to derive a literal union from a value and to fix a tuple's arity and element types. Do not write it on a value whose contract is already declared; annotate the declaration instead.`
- agent-obj-10 — `.claude/rules/architecture.md`: `Constructor: initialize context/options and instantiate child managers.`; `Delete one-line delegates, pass-through factories, rename-only helpers/getters, compatibility aliases…`
- agent-subj-1 — `.claude/rules/patterns.md`: `An id list applies to those items and returns true only when all succeed.`
- agent-subj-3 — `.claude/rules/writing.md`: `Claim only what the reader can check.`; `AGENTS.md`: `**NEVER state a count.** … Name the members, or write the sentence without the number.`
- agent-subj-4 — `.claude/rules/typescript.md`: `Do not document speculative future product behavior unless requested.`; `.claude/rules/writing.md`: `currently` → `Delete, or give the date`.
- agent-subj-5 — `.claude/rules/writing.md`: `Claim only what the reader can check.`; `.claude/rules/documentation.md`: `\`AGENTS.md\` and its linked rules are the sole convention source. Do not create competing instruction copies in guides.`
- agent-subj-6 — `AGENTS.md`: `**NEVER name a list item by its position.** Write the item's name, never its ordinal or its number.`
- agent-subj-7 — `.claude/rules/documentation.md`: `The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases.`
- agent-subj-12 — `.claude/rules/writing.md` substitutions: `e.g.` → `for example`; `i.e.` → `that is`; `via` → `through`, `by using`; `simply`, `just` → Delete; `and/or` → `and`, `or`, or `both`.
- agent-subj-13 — `AGENTS.md`: `Word every sentence so the reader understands it on the first read.`; `.claude/rules/typescript.md`: `Comments explain why, never restate what self-explanatory code does.`
- agent-subj-14 — `.claude/rules/names.md`: `Names are public API. A consumer can predict them without documentation.`; `AGENTS.md`: `One concept, one term. Do not alternate synonyms.`

### agent-obj-1

1. **Site now.** Brief `AgentRegistry.ts:136`. Current throw is `AgentRegistry.ts:137`: `if (value === undefined) throw new AgentError('REGISTRY', \`unknown ${category}: ${name}\`)`. Context: `136` `const value = pool.get(name)` / `138` `return value`. Import is `AgentRegistry.ts:18` `import { AgentError } from './errors.js'`, not `:130`. `errors.ts:182` `readonly code: 'CONCURRENCY' | 'REGISTRY'`; `errors.ts:184` `constructor(code: 'CONCURRENCY' | 'REGISTRY', message: string)`. `types.ts:1341` `THROW an {@link AgentError} carrying \`code: 'REGISTRY'\``.
2. **Diff at the site.** `@@ -15,6 +15,7 @@` (import); `@@ -27,11 +28,11 @@` (remarks); `@@ -129,11 +130,11 @@` (`#resolve`). Repair text present: `+		if (value === undefined) throw new AgentError('REGISTRY', \`unknown ${category}: ${name}\`)`. `errors.ts` `@@ -154,30 +154,34 @@` carries `+'CONCURRENCY' | 'REGISTRY'` and `'REGISTRY'` remarks.
3. **Old form sweep.** Patterns `\bnew Error\(\`unknown`, `a clear \`Error\``, `loud failure` over `src`, `tests`, `guides/agent.md`, `guides/README.md`, `README.md`, exclude `node_modules`: **no hit**. Inflections `Error`/`Errors`/`Errored`/`Erroring` still name the class `Error` and `AgentError` (not the removed bare throw).
4. **Report reading.** Table: `applied`. Sentence: `` `src/core/AgentRegistry.ts:130` imports `AgentError` from `'./errors.js'` and `#resolve` throws `new AgentError('REGISTRY', …)` ``. **Line `:130` now** is `#budget` (`AgentRegistry.ts:129-131`), not the import. Import is `:18`; throw is `:137`. Substance of the throw/code widening is in the tree. `guides/agent.md:777` still documents the registry; `guides/agent.md:795` names `'REGISTRY'`.
5. **Proof reading.** Command `npx vitest run … --project src:core tests/src/core/AgentRegistry.test.ts`. Report red `1 failed | 34 passed`, green `35 passed`. File `/home/user/work/evidence/agent-proofs/agent-obj-1-control.txt`: `Tests  1 failed | 34 passed (35)`. `agent-obj-1-green.txt`: `Tests  35 passed (35)`. Matches.

### agent-obj-2

1. **Site now.** Brief `Agent.ts:108` `#status`. Field moved: `Agent.ts:111` `#settled: AgentStatus = 'idle'` (context `109-110` comment / `118` `#runs`). Getter `Agent.ts:153-158` `return this.#runs.size > 0 ? 'running' : this.#settled`. `stream()` has no `'running'` write (`Agent.ts:205` `#runs.add` then emit). `Agent.ts:298` `this.#settled = 'done'`; `Agent.ts:314` `this.#settled = 'error'`.
2. **Diff at the site.** `@@ -95,26 +97,28 @@` (`+#settled`); `@@ -138,12 +142,19 @@` (getter); `@@ -192,9 +203,9 @@` (deleted `this.#status = 'running'`); `@@ -284,7 +295,7 @@` (`+#settled = 'done'`); `@@ -300,7 +311,7 @@` (`+#settled = 'error'`). Repair text present verbatim on those `+` lines.
3. **Old form sweep.** Pattern `#status` over named paths: **no hit**. `statuses`/`statused`/`statusing`: **no hit**. Bare `status` remains the public getter (`Agent.ts:153`, `types.ts:1165`).
4. **Report reading.** `applied`. Sentence describes derived getter, deleted `'running'` write, `finally` `#settled` writes, two regression cases. Tree matches. Report does not cite a single `file:line` for the getter.
5. **Proof reading.** `npx vitest run … --project src:core tests/src/core/Agent.test.ts`. Report `4 failed | 116 passed` / `120 passed`. Control file: `Tests  4 failed | 116 passed (120)`. Green: `Tests  120 passed (120)`. Test exists `Agent.test.ts:2245` `it('reports running while a SECOND overlapping run is still in flight'`. Matches.

### agent-obj-3

1. **Site now.** Brief `tests/guides.test.ts:1-171`. File continues; flagship block starts `guides.test.ts:180` `describe('flagship fences', () => {`. Context `177-179` comment / `181` `guideText`. Cases: `183-193` instructions values; `195-198` presence; `200-225` ToolResults; `236-237` `sanitizeToken(12.7)`; snapshot `244-253`.
2. **Diff at the site.** `@@ -17,6 +17,8 @@` (imports); `@@ -168,3 +170,92 @@` (appended block). First `+` of the append region is the flagship comment/block. Repair present: `+describe('flagship fences', () => {`, `+expect(instructions.open).toBe('## Instructions')`, `+expect(sanitizeToken(12.7)).toBe(12)`.
3. **Old form sweep.** No symbol renamed. Pattern `findUnlisted` still used in the name-parity half (`guides.test.ts` earlier describes). **N/A / no removed name.**
4. **Report reading.** `applied`. Sentence matches `guides.test.ts:180-253`.
5. **Proof reading.** `npm run test:guides`. Report `1 failed | 90 passed` / `91 passed`. Control: `Tests  1 failed | 90 passed (91)`. Green: `Tests  91 passed (91)`. Matches. Placement row also has executed fences (behavioural).

### agent-obj-4

1. **Site now.** Brief `validators.ts:35` still `export function isMessage`. `:65` `isSection`; `:102` `isConversationSnapshot`. Mirror exists `tests/src/core/validators.test.ts` (new). `MemoryConversationStore.test.ts` no longer names those guards (grep **no hit**).
2. **Diff at the site.** `validators.ts` `@@ -4,8 +4,8 @@` / `@@ -13,7 +13,7 @@` / `@@ -43,8 +43,8 @@` / `@@ -69,7 +69,7 @@` (wording). New file `@@ -0,0 +1,159 @@` first `+import { isConversationSnapshot, isMessage, isSection } from '@src/core'`.
3. **Old form sweep.** Describe title `§14 read-boundary`: **no hit** in owned `src`/`tests`/`guides/agent.md`/`guides/README.md`/`README.md`. `isConversationSnapshot` still used in production stores.
4. **Report reading.** `applied`. `validators.test.ts` exists and imports the three guards. `§14` struck from the moved title (`validators.test.ts:19` `isMessage — the per-message shape guard`). Matches.
5. **Proof reading.** `npx vitest run … tests/src/core/validators.test.ts`. Report `3 failed | 8 passed` / `11 passed`. Control: `Tests  3 failed | 8 passed (11)`. Green: `Tests  11 passed (11)`. Matches.

### agent-obj-5

1. **Site now.** Brief `setup.ts:140` nested `deltasOf`. Current `:137-138` `export function chunkWholeDelta`. Class `setup.ts:171` `export class ScriptedProvider implements ScriptedProviderInterface` with `#turns`…`#started` (`172-183`). Factory `setup.ts:155` `createScriptedProvider`. `createStubSummarizer` `setup.ts:379` `async summarize(messages) {` (method syntax).
2. **Diff at the site.** `@@ -117,6 +126,18 @@` (`chunkWholeDelta`); `@@ -135,43 +156,84 @@` (class conversion); `@@ -313,7 +376,7 @@` (`async summarize`). `+export class ScriptedProvider implements ScriptedProviderInterface` present. `+return new ScriptedProvider(turns, options)` present (`diff` ~3169).
3. **Old form sweep.** Nested `const next = (): ScriptedTurn` / in-body `async function* stream`: **no hit**. `deltasOf` remains a field/option name, not a nested `??` arrow at `:140`.
4. **Report reading.** `applied`. Field list and factory wrapper match `setup.ts:171-183`, `:155`.
5. **Proof reading.** `npm run test:setup`. Report `1 failed | 43 passed` / `44 passed`. Control: `Tests  1 failed | 43 passed (44)`. Green: `Tests  44 passed (44)`. Matches.

### agent-obj-6

1. **Site now.** Brief `setup.ts:110` unexported `turnParts`. Current `setup.ts:119` `export function turnParts(turn: ScriptedTurn): {` (context `118` `@returns` / `124` `'result' in turn`).
2. **Diff at the site.** `@@ -105,9 +108,15 @@` (export + TSDoc). `+export function turnParts` present (`diff` around the `function turnParts` hunk).
3. **Old form sweep.** Unexported `function turnParts` (no `export`): **no hit**. Name `turnParts` remains as export.
4. **Report reading.** `applied`. Cites `tests/setup.ts:110` for export — current export is `:119`. Substance matches. `setup.test.ts` has `describe('turnParts'` (import list `:34` area).
5. **Proof reading.** `npm run test:setup`. Report `7 failed | 37 passed` / `44 passed`. Control: `Tests  7 failed | 37 passed (44)`. Green: `Tests  44 passed (44)`. Matches.

### agent-obj-7

1. **Site now.** Brief `Agent.test.ts:715` local `makeTools`. Current `:715` region is generate/stream tests using `createSeededToolManager` (local `makeTools` **no hit** package-wide). Promoted: `setup.ts:630` `createSeededToolManager`; `:648` `seedWorkspaceContext`; `:669` `seedInstructionContext`; `:705` `resolveSectionOpen`; `:732` `resolveSectionRender`; `:765` `seedConversation`.
2. **Diff at the site.** `Agent.test.ts` `@@ -712,20 +714,15 @@` and sibling hunks deleting `makeTools`. `setup.ts` `@@ -548,3 +613,164 @@` first `+` of the promotion block. `+export function createSeededToolManager` present.
3. **Old form sweep.** `makeTools`, `function seedImages`, `function openFor`, `function renderFor`: **no hit**. `seedWorkspaceContext` / `seedConversation` are the new names.
4. **Report reading.** `applied`. Report names two shaping decisions (`seedInstructionContext`, dropped `{ images?: boolean }`). Tree has `seedInstructionContext` at `:669` and `seedWorkspaceContext()` with no options at `:648`. Matches the report's recorded deviation, not the refuter's single `seedWorkspaceContext(options?: { images?: boolean })` form.
5. **Proof reading.** `npm run test:setup`. Report `6 failed | 38 passed` / `44 passed`. Control: `Tests  6 failed | 38 passed (44)`. Green: `Tests  44 passed (44)`. Matches.

### agent-obj-8

1. **Site now.** Brief `Agent.ts:676`. Current `Agent.ts:688` `const reason = errorToMessage(error)` (context `684-687` comment / `689` `denyCall`). Value import `Agent.ts:27` `import { errorToMessage } from '@orkestrel/workflow'`.
2. **Diff at the site.** `@@ -24,6 +24,7 @@` (`+import { errorToMessage }`); `@@ -670,10 +681,11 @@`. Repair `+				const reason = errorToMessage(error)` present.
3. **Old form sweep.** `error instanceof Error ? error.message : String(error)` over named paths: **no hit**.
4. **Report reading.** `applied`, with deviation that `[object Object]` is not fixed by the primitive. Tree uses `errorToMessage` as instructed.
5. **Proof reading.** Same Agent.test command. Report `2 failed | 118 passed` / `120 passed`. Control: `Tests  2 failed | 118 passed (120)`. Green: `Tests  120 passed (120)`. Matches. Cases exist in `Agent.test.ts` authority block (diff `@@ -1955,6 +1942,87 @@`).

### agent-obj-9

1. **Site now.** Brief `errors.ts:21`. Current `errors.ts:21` `readonly code = 'ABORT' as const` (context `20` TSDoc / `22` `readonly partial`). `errors.ts:76` `readonly code = 'PARTIAL' as const`.
2. **Diff at the site.** No hunk replaces `:21`/`:76` with the annotated form. `errors.ts` hunks are comments/`AgentError` widening only. Repair text `readonly code: 'ABORT' = 'ABORT'` **absent** from `+` lines.
3. **Old form sweep.** `as const` on those fields: `errors.ts:21`, `errors.ts:76` (**2 hits**). Inflections N/A.
4. **Report reading.** `stopped`. Sentence: reverted to baseline `as const` so `lint:check` closes. **Line `:21`/`:76` now carry exactly that.** Matches.
5. **Proof reading.** Documentation/lint row; no control file named. No `agent-obj-9-*.txt` under `/home/user/work/evidence/agent-proofs/`.

### agent-obj-10

1. **Site now.** Brief `ScopeManager.ts:45` positional constructor. Current `ScopeManager.ts:46` `constructor(options?: ScopeManagerOptions)` (context `45` `#emitter` / `47-50` `new Emitter` from `options?.on` / `options?.error`). `factories.ts:322` `return new ScopeManager(options)`.
2. **Diff at the site.** `@@ -1,9 +1,10 @@`; `@@ -38,14 +39,14 @@` (`+constructor(options?: ScopeManagerOptions)`); factories `@@ -316,7 +319,7 @@` (`+	return new ScopeManager(options)`). Repair present.
3. **Old form sweep.** `constructor(on?: EmitterHooks`: **no hit**. `new ScopeManager(undefined`: **no hit**. `new ScopeManager(` remaining calls pass zero args or one options object (`ScopeManager.test.ts:159` `{ on: { create: create.handler } }`).
4. **Report reading.** `applied`. Cites `factories.ts:319` — current body is `:322`. Constructor form matches.
5. **Proof reading.** `npx vitest run … ScopeManager.test.ts factories.test.ts`. Report `3 failed | 58 passed` / `61 passed`. Control: `Tests  3 failed | 58 passed (61)`. Green: `Tests  61 passed (61)`. Matches.

### agent-subj-1

1. **Site now.** Brief `InstructionManager.ts:113-122`. Current `InstructionManager.ts:117` `let removed = true`; `:119` `if (!this.#delete(name)) removed = false`. Same shape: `ScopeManager.ts:84-86`; `Conversation.ts:162-164`; `ConversationManager.ts:155-157`.
2. **Diff at the site.** `@@ -112,9 +112,11 @@` (`+let removed = true` / `+if (!this.#delete(name)) removed = false`). Parallel hunks on the other three files (`Conversation.ts` `@@ -157,9 +157,11 @@`; `ConversationManager.ts` `@@ -142,16 +142,19 @@`; `ScopeManager.ts` `@@ -78,9 +79,11 @@`). Repair present.
3. **Old form sweep.** `let removed = false`: **no hit**. `whether any was removed`: **no hit** in owned paths. Guide method rows now `true` only when EVERY supplied id/name was removed (`guides/agent.md:612`, `:625`, `:653`, `:732`, `:753`).
4. **Report reading.** `applied`. Cites `InstructionManager.ts:117` — **that line is `let removed = true`.** Matches.
5. **Proof reading.** Four manager suites. Report `4 failed | 123 passed` / `127 passed`. Control: `Tests  4 failed | 123 passed (127)`. Green: `Tests  127 passed (127)`. Matches.

### agent-subj-3

1. **Site now.** Brief `factories.ts:270-280`. Current `factories.ts:272-273` `from its \`name\` and its per-category allow-lists`; `:281-282` `instructions` / `tools` / `files` (no `messages` list). Context `:271` blank / `:274` `@remarks`.
2. **Diff at the site.** `@@ -267,8 +269,8 @@`; `@@ -276,8 +278,8 @@`; `@@ -299,10 +301,11 @@`. `+per-category allow-lists` and `+instructions` / `tools` / `files` present.
3. **Old form sweep.** `four optional per-category`: **no hit**. Phantom `messages` in `createScope` `@param`: **no hit**. Count words still appear as operational quantities (`one section`, etc.) — report listed those as permitted.
4. **Report reading.** `applied`. Sentence matches `factories.ts:272-282`.
5. **Proof reading.** Documentation row. Report sweep of count words/numerals. This lane: `\bclause` empty; `§` empty on owned paths. Count-numeral pattern `\b[0-9]+ (elements|members|…)` over `src`+guides+README: not re-enumerated here as a second table (see Unknowns if needed). Report's empty numeral sweep is consistent with no `N members` tally sentences found in owned prose during targeted reads.

### agent-subj-4

1. **Site now.** Brief `types.ts:1277-1279`. Current `types.ts:1273-1276` `Ordered first-match-wins… \`evaluate\` is synchronous and returns the verdict directly. Event-free — no Emitter, no events.` `Authority.ts:29` `**Synchronous.** \`evaluate\` returns the verdict directly.` `factories.ts:479` `Synchronous — \`evaluate\` returns the verdict directly.` `types.ts:1213-1215` ends at `what is being called and with what.` `types.ts:1658-1660` / `Conversation.ts:46-47` `rehydrate` never reinserts. `types.ts:458` `(the \`instructions\` section)` — no `currently`. `Agent.ts:627` `NOT separately bound to this run's abort signal.`
2. **Diff at the site.** `types.ts` `@@ -1274,9 +1272,8 @@`; `Authority.ts` `@@ -26,8 +26,7 @@` (`+ * - **Synchronous.** \`evaluate\` returns the verdict directly.`); Conversation `@@ -43,10 +43,10 @@`. Repair present.
3. **Old form sweep.** `currently` over `src`+named guides+README: **no hit**. `deferred to a later chunk`: **no hit**. `v1 never auto-reinserts`: **no hit**. `a future tier can thread it`: **no hit**.
4. **Report reading.** `applied`. Cites `factories.ts:479` — **that line is the Synchronous sentence.** `Agent.ts:627` **is** the abort-signal cut. Matches.
5. **Proof reading.** Documentation row. Sweeps above agree (old speculative phrases gone on owned paths).

### agent-subj-5

1. **Site now.** Brief `guides/agent.md:1139`. Current `guides/agent.md:1140` `- [\`AGENTS.md\`](../AGENTS.md) — the repository's authority pointer; the coding rules it resolves to live in \`@orkestrel/scaffold\`.` `guides/README.md:3` `by concept, and by directory.` `guides/README.md:105` same AGENTS pointer. Fence `guides/agent.md:54` `// narrow the model-supplied unknown`. Practices `guides/agent.md:1103` `**Narrow tool \`args\`** — a \`ToolCall.arguments\` is model-supplied \`unknown\`; narrow it inside \`execute\` with a guard.`
2. **Diff at the site.** `guides/agent.md` `@@ -1128,13 +1129,13 @@`; `guides/README.md` `@@ -1,6 +1,6 @@` first `+A dual-axis index… by concept, and by directory.`
3. **Old form sweep.** Pattern `§` over `src`, `tests`, `guides/agent.md`, `guides/README.md`, `README.md`: **no hit**. (Vendored `guides/queue.md`, `guides/workflow.md`, etc. still contain `AGENTS §` — off-limits mirrors.)
4. **Report reading.** `applied`. Cites `:1139` — current matching sentence is `:1140`. README `:3` and `:105` match. Sweep empty: agrees.
5. **Proof reading.** Report `§` sweep empty (exit 1). This lane agrees on owned paths.

### agent-subj-6

1. **Site now.** Brief `Agent.ts:365` `clause 26`. Current `Agent.ts:376-378` `futile` is the futile-compaction guard (no `clause N`). `types.ts:684` `for CONCURRENT threads use separate agents.` Guide contract items keep numbering but body text uses named clauses (`guides/agent.md:766` `the conversation-layer clause`).
2. **Diff at the site.** `Agent.ts` `@@ -362,12 +373,12 @@`; `types.ts` `@@ -681,8 +681,7 @@`.
3. **Old form sweep.** `\bclause [0-9]+` over named paths: **no hit**.
4. **Report reading.** `applied`. Cites `Agent.ts:376` — **that region is the futile-compaction comment.** Matches.
5. **Proof reading.** Report `\bclause [0-9]+` empty. Agrees.

### agent-subj-7

1. **Site now.** Brief `guides/agent.md:375-394`. Factories table `:379-389` noun phrases (`A \`ConversationInterface\``, `An empty \`InstructionManagerInterface\``, …). Helpers `:433-456` noun phrases (`The projection of an \`unknown\``, `The scope allow-list filter…`). Errors `is*` rows `:507-513` `The narrowing guard for a caught…`. Validators `:489-491` still `Narrowing guard: whether…` (left as-is per refuter).
2. **Diff at the site.** `@@ -374,36 +374,36 @@`; `@@ -428,32 +428,32 @@`; `@@ -501,16 +501,16 @@`. `+A \`ConversationInterface\`` etc. present.
3. **Old form sweep.** Factories opening `Create a fresh`: **no hit** in `guides/agent.md` table. Helpers opening `Project an`: **no hit**.
4. **Report reading.** `applied`. Matches tables at those current lines.
5. **Proof reading.** Documentation row. No behavioural control. Sweep of imperative openers agrees they are gone from those tables.

### agent-subj-12

1. **Site now.** Brief `types.ts:137`. Current `types.ts:137` `(for example \`think\`)` (context `:136` `options` / `:138` `overriding`).
2. **Diff at the site.** `types.ts` `@@ -131,10 +131,10 @@` and many sibling substitution hunks (`Channel.ts` `via`→`through`, `constants.ts` `via`→`through`).
3. **Old form sweep.** Bound as row: `src/**`, `guides/agent.md`, `guides/README.md`, `README.md`. Pattern `e\.g\.|i\.e\.|\bvia\b|\betc\.|\bsimply\b|\bjust\b|in order to|and/or`: **one hit** `guides/agent.md:81` `content: 'Reply with just the number.'`. Field-3 extra paths `tests/**`: many `via`/`just`/`e.g.` hits (e.g. `tests/setup.ts:73`, `:99`; `tests/src/core/Agent.test.ts:51`, `:212`, `:1211`; `AgentContext.test.ts:58` `returns just the conversation` — positional/minimizing mix).
4. **Report reading.** `applied`. Report: one permitted fence hit at `guides/agent.md:81`; `tests/**` outside bound still carries hits. **Agrees** with this lane on the row bound; field-3 tests sweep finds the residue the report named.
5. **Proof reading.** Placement/naming. Sweeps agree on owned prose bound; disagree only if tests are in-scope for field 3 (they are, per the distill brief's field 3 path list).

### agent-subj-13

1. **Site now.** Brief `errors.ts:121` `§F2`. Current `errors.ts:121-124` `A \`sections\` cap … must be \`>= 1\`` with no `§F2`. `Agent.ts:100-101` `When true, a summarizer failure during AUTOMATIC compaction rethrows`; `:172` `Concurrency guard:`; `:187` `a per-run override wins`; `:365` `Limit-exhaustion tracking`; `:748` `(composed with, never replacing, the construction \`signal\`)`; `:611` `the single-level limit`; `:92` automatic-compaction comment without `§ auto-compact`.
2. **Diff at the site.** `errors.ts` `@@ -117,8 +117,8 @@`; `Agent.ts` many comment hunks (`@@ -87,7 +89,7 @@` `§ auto-compact` removed).
3. **Old form sweep.** `\bF[1-9]\b|Ch[0-9]|\bv1\b|ASI0[0-9]|§F`: owned src/guides/README **no F-control hits**. Tests: `InstructionManager.test.ts:67` and `:236` `content: 'v1'` (fictional data). Report named those two.
4. **Report reading.** `applied`. Cites `errors.ts` no control identifier — **`:121` has no `§F2`.** `Agent.ts:99` vs current `:100` — one-line drift. Matches substance. Report says sweep extended into tests — titles like `Agent - F1` were rewritten (diff `@@ -3267,10 +3379,10 @@` describe titles).
5. **Proof reading.** Report two permitted `v1` data hits. This lane agrees.

### agent-subj-14

1. **Site now.** Brief `types.ts:283`. Current `types.ts:283` `readonly override?: string` (context `:280-282` TSDoc / `:284` `}`). `InstructionInput` `:302` region `readonly override?: string`. `helpers.ts:570` `resolveItem<T extends { readonly override?: string }>`; `:576` `item.override ??`. `Instruction.ts:31` `readonly override?: string`; `:38` `input.override`.
2. **Diff at the site.** `types.ts` `@@ -280,7 +280,7 @@` `+	readonly override?: string`; `@@ -299,20 +299,20 @@`; `helpers.ts` `@@ -567,13 +567,13 @@`; `Instruction.ts` `@@ -26,15 +26,15 @@`. Verbatim `+	readonly override?: string` present.
3. **Old form sweep.** `item.format`, `itemFormat`, `I.format`, `instruction.format`, `InstructionInput.format`, `InstructionInterface.format` over owned `src`/`tests`/`guides/agent.md`/`guides/README.md`/`README.md`: **no hit**. Manager-level `format` (`ContextSectionFormat`) remains. Mirrors `/home/user/fleet/toolbox/guides/agent.md:341` and `ollama/guides/agent.md:341` still say `format?: string` on `InstructionInput` (shared, off-limits).
4. **Report reading.** `applied`. Cites `helpers.ts:570` — **that line is the `override` constraint.** Matches.
5. **Proof reading.** Helpers/AgentContext/InstructionManager vitest. Report `4 failed | 211 passed` / `215 passed`. Control: `Tests  4 failed | 211 passed (215)`. Green: `Tests  215 passed (215)`. Matches.

### fleet-F1

1. **Site now.** Where: `tests/setup.ts` `isBrowserVuePath`. **Symbol absent.** Workspace has `src/core` only (no `src/browser`, no `app/`, no `tests/setupBrowser.ts`).
2. **Diff at the site.** No hunk adds/deletes `isBrowserVuePath`.
3. **Old form sweep.** `isBrowserVuePath` over `/home/user/fleet/agent` excluding `node_modules`: **no hit**. Inflections: **no hit**.
4. **Report reading.** `noop`. Sentence: helper absent, no browser environment. Matches.
5. **Proof reading.** Report grep empty. Agrees.

### fleet-F2

1. **Site now.** `Agent.ts:83` `readonly #id: string` (first `#` field). Constructor `Agent.ts:121` `this.#id = crypto.randomUUID()`. First getter `Agent.ts:145-147` `get id(): string { return this.#id }`. `types.ts:1164` `readonly id: string` unchanged. `Instruction.ts:25` `readonly id: string` with **no** `#` fields (trigger does not fire). `Scope` likewise public `id` without `#` fields.
2. **Diff at the site.** `@@ -79,6 +80,7 @@` `+	readonly #id: string`; `@@ -138,12 +142,19 @@` `+	get id(): string {`. Present.
3. **Old form sweep.** Agent public field `readonly id: string = crypto.randomUUID()`: **no hit**. `JSON.stringify` of an Agent instance: not re-run as a full serialization audit here; report claimed no Agent stringify (see Breaking/Unknowns).
4. **Report reading.** `applied`. `#id` first, `get id` first getter. Matches `Agent.ts:83`, `:145`.
5. **Proof reading.** Placement. No dedicated control file.

### Across the unit

**Scope.** Status paths vs brief § Scope:

| Path | Tag |
| --- | --- |
| `guides/README.md`, `guides/agent.md` | owned |
| `src/core/*.ts` and `src/core/**/*.ts` listed in status | owned (`src/**`) |
| `tests/guides.test.ts`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/src/core/**` including `A tests/src/core/validators.test.ts` | owned (`tests/**` except vendored trio — none of those three appear) |
| `package-lock.json`, `node_modules`, `.claude/**`, `AGENTS.md`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts` | **absent** from status (untouched) |

Hunks whose **file** no row **Where** names (first `+` line):

- `guides/README.md` `@@ -1,6 +1,6 @@` `+A dual-axis index into this repository's guides — by concept, and by directory.`
- `src/core/AgentContext.ts` `@@ -50,7 +50,7 @@` `+ *   through compaction; scope filters only instructions / tools / workspace files). Because \`messages\``
- `src/core/Authority.ts` `@@ -26,8 +26,7 @@` `+ * - **Synchronous.** \`evaluate\` returns the verdict directly.`
- `src/core/Channel.ts` `@@ -3,7 +3,7 @@` `+ * live through the \`drain\` async-iterator. Decoupling write from read is what lets a`
- `src/core/ThinkSplitter.ts` `@@ -21,7 +21,7 @@` `+ *   \`<think>\` inside an open span is thinking text (no nesting is tracked — the`
- `src/core/constants.ts` `@@ -1,7 +1,7 @@` `+ * keeps requesting tools can never loop forever. Overridable per agent through`
- `src/core/conversations/Conversation.ts` `@@ -43,10 +43,10 @@` `+ *   messages (\`[]\` for an unknown id) and emits \`rehydrate\` — a pure read (the caller decides`
- `src/core/conversations/ConversationManager.ts` `@@ -12,7 +12,7 @@` `+ * — the id-keyed store over the conversation layer PLUS the \`active\` / \`switch\` seam the`
- `src/core/conversations/stores/DatabaseConversationStore.ts` `@@ -34,12 +34,12 @@` (narrowing/prose `+` on the total-guard wording)
- `src/core/conversations/stores/MemoryConversationStore.ts` `@@ -7,8 +7,8 @@` `+ * A plain \`Map<string, ConversationSnapshot>\` — the snapshot is already pure,`
- `src/core/helpers.ts` `@@ -11,7 +11,7 @@` `+import type { QueueContext } from '@orkestrel/queue'`
- `src/core/instructions/Instruction.ts` `@@ -9,7 +9,7 @@` `+ * per-item \`override\` ONLY when supplied (assigned when present, mirroring a`
- `src/core/scopes/Scope.ts` `@@ -2,14 +2,14 @@` `+ * Represents a named, immutable filter over a richer context's items — an optional`
- `tests/setup.test.ts` `@@ -7,11 +7,13 @@` `+import { ConversationManager, isProviderAbortError } from '@src/core'`
- `tests/src/core/AgentContext.test.ts` `@@ -1,10 +1,9 @@` `+import type { AgentContextInterface, MessageInput, Message } from '@src/core'`
- `tests/src/core/AgentRegistry.test.ts` `@@ -2,7 +2,12 @@` `+import {`
- `tests/src/core/conversations/Conversation.test.ts` `@@ -19,7 +19,7 @@` `+// a provider-agnostic summarizer seam — real behavior, a data-stub summarizer, NOT a`
- `tests/src/core/conversations/ConversationManager.test.ts` `@@ -5,14 +5,14 @@` `+import { createStubSummarizer, seedConversation } from '../../../setup.js'`
- `tests/src/core/conversations/stores/DatabaseConversationStore.test.ts` `@@ -21,13 +21,13 @@` `+// column back to a ConversationSnapshot on \`get\` (the total boundary guard). Exercised over a REAL`
- `tests/src/core/conversations/stores/MemoryConversationStore.test.ts` `@@ -1,4 +1,4 @@` `+import { createMemoryConversationStore } from '@src/core'`
- `tests/src/core/factories.test.ts` `@@ -34,7 +34,7 @@` `+// createAgent, all needing no daemon. \`createOllama\` (the live-Ollama`
- `tests/src/core/helpers.test.ts` `@@ -39,7 +39,7 @@` `+// scripted provider — no Ollama, real behavior).`
- `tests/src/core/instructions/Instruction.test.ts` `@@ -2,7 +2,7 @@` `+// descending priority — real behavior, no mocks. Covers id minting,`
- `tests/src/core/instructions/InstructionManager.test.ts` `@@ -8,15 +8,15 @@` `+// directives block from — real behavior, no mocks. Covers add (single +`
- `tests/src/core/integration.test.ts` `@@ -14,7 +14,7 @@` `+// The scripted provider is a REAL provider (a real async generator honouring`
- `tests/src/core/scopes/Scope.test.ts` `@@ -1,8 +1,8 @@` `+// Scope is the named, immutable allow-list filter over a context's items — real`
- `tests/src/core/scopes/ScopeManager.test.ts` `@@ -3,15 +3,15 @@` `+// ScopeManager is the id-keyed registry of reusable named scopes — real`
- `tests/src/core/validators.test.ts` `@@ -0,0 +1,159 @@` `+import { isConversationSnapshot, isMessage, isSection } from '@src/core'`

**Residue.** Diff `+` lines: `\.skip\(|\.only\(|\.todo\(|TODO|FIXME|console\.|debugger` — **no hit**. `retry` on `+`: `guides/agent.md` Tests row for `factories.test.ts` (diff ~605) names `retries` / retry budget in prose. Tree `src`+`tests` excluding vendored `setupPolicy`/`policy.test`/`config.test`/`distribution.test`: `\.skip\(|\.only\(|\.todo\(|TODO|FIXME|console\.|debugger` — **no hit**. `timeout`/`retry` hits are API identifiers (not debug residue), including `src/core/Agent.ts:23,25,61,87,132,191-193,203,218,264,293,752,759`; `src/core/types.ts:800,892,897,995,1044,1095,1121-1124,1148,1292,1320-1321,1430,1434-1435,1444,1455,1466`; `src/core/factories.ts:84,368,377,544,556,560,577,581,595,605,608,626,630`; `src/core/errors.ts:51,65`; `src/core/helpers.ts:213`; `src/core/AgentRegistry.ts:39,43,108`; `tests/setup.ts:55`; `tests/setup.test.ts:96-105,111-112,125,137,150,155,161,168,180,200,203,276,289,295,301-303`; `tests/src/core/Agent.test.ts:66,68,1020,1030,1078,1111,1609,3504,3551,3558`; `tests/src/core/factories.test.ts:186,289,498,500,529,554,557,562`; `tests/src/core/AgentRegistry.test.ts:23,381,382,389`.

**Parity.** Call-signature members (`src/core/types.ts`) vs `guides/agent.md` `## Methods`:

| Entity | types.ts members | guide table |
| --- | --- | --- |
| `ThinkSplitterInterface` | `split` `:229`, `flush` `:231` | `:600-601` |
| `MessageManagerInterface` | `add` `:250-251`, `message` `:252`, `messages` `:253`, `remove` `:254-255`, `clear` `:256` | `:609-613` |
| `InstructionManagerInterface` | `add` `:375-376`, `instruction` `:377`, `instructions` `:379`, `render` `:381`, `remove` `:382-383`, `clear` `:384` | `:621-626` |
| `ScopeInterface` | `narrow` `:531` | `:642` |
| `ScopeManagerInterface` | `create` `:579`, `scope` `:580`, `scopes` `:582`, `remove` `:583-584`, `clear` `:585` | `:650-654` |
| `AgentContextInterface` | `apply` `:705`, `build` `:760` | `:662-663` |
| `AgentInterface` | `generate` `:1183`, `stream` `:1198`, `abort` `:1205` | `:671-673` |
| `ChannelInterface` | `push` `:938`, `close` `:940`, `fail` `:946`, `drain` `:952` | `:681-684` |
| `AuthorityInterface` | `evaluate` `:1285` | `:709` |
| `AgentRegistryInterface` | `provider` `:1360`, `tool` `:1368`, `authority` `:1376`, `scheduler` `:1384`, `build` `:1394` | `:717-721` |
| `ConversationInterface` | `add` `:1696-1697`, `message` `:1704`, `messages` `:1710`, `remove` `:1717-1718`, `clear` `:1720`, `view` `:1727`, `compact` `:1750`, `rehydrate` `:1757`, `search` `:1765`, `reference` `:1786`, `snapshot` `:1804` | `:729-738` |
| `ConversationManagerInterface` | `conversation` `:2008`, `conversations` `:2009`, `add` `:2010`, `switch` `:2011`, `open` `:2027`, `save` `:2040`, `remove` `:2041-2042`, `clear` `:2043` | `:747-754` |
| `ConversationStoreInterface` | `get` `:1869`, `set` `:1876`, `delete` `:1882` | **no `## Methods` table** (Entities `:402-403` name `get`/`set`/`delete`) |
| `StreamInterface` | `abort` `:976` (`events`/`result` data) | named in Methods intro `:583`, no own table |

Readonly data (interfaces) vs Surface/Entities: `AgentInterface` `emitter`/`id`/`status`/`context` `types.ts:1163-1166` — Entities `Agent` `:409` names the loop, Types/Surface `id`/`status` live on the Agent types row (guide Types section). `InstructionInterface` `override?` `types.ts:283` — Types row `guides/agent.md:531`. `Instruction` class Entities `:404` lists `name`/`content`/`priority`/`id`, does not name `override`. `ScopeManagerInterface` `emitter`/`count` `:577-578` — Methods prose `:650` area; Entities `:407`.

Backticked identifiers in guide **sentences the diff added** (representative; barrel `src/core/index.ts:1-20` `export *` from types/constants/errors/factories/classes/helpers/validators): `AgentError`, `REGISTRY`, `override`, `InstructionInput`, `evaluate`, `AGENTS.md`, `@orkestrel/scaffold` — exported or external package names. Test-only `chunkWholeDelta` / `ScriptedProvider` / `createSeededToolManager` / `seedWorkspaceContext` appear in `tests/**` and `setup.ts`, **not** in `src/core/index.ts`. `errorToMessage` is `@orkestrel/workflow`, not the agent barrel. `QueueContext` is `@orkestrel/queue` (`helpers.ts` import).

**Gates.** Report § Gates quoted:

- `npm run format:check` | 0 | "All matched files use the correct format." over 77 files
- `npm run lint:check` | 0 | no output
- `npm run check` | 0 | `tsc --noEmit --project tsconfig.json` and `tsc --noEmit -p configs/src/tsconfig.core.json` both silent
- `npm run build` | 0 | 22 modules transformed; `dist/src/core/index.cjs` 138.41 kB; `index.d.ts` copied to `index.d.cts`
- `npm test` | 0 | `src:core` 18 files / 618 tests; `policy` 1 / 111; `config` 1 / 46; `setup` 1 / 44; `guides` 1 / 91

**Breaking.** Report entries: (1) `ScopeManager` constructor `(on?, error?)` → `(options?: ScopeManagerOptions)`; (2) `InstructionInterface.format` / `InstructionInput.format` → `override`; (3) batch `remove` any→all-succeed. Fleet consumers named none.

This lane, word-boundary old names across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/agent`, vendored `guides/agent.md` mirrors:

- `new ScopeManager(` positional two-arg: **no hit** outside agent (agent tests only zero-arg or options-object).
- `InstructionInput` / `createInstruction` in fleet `src`: **no hit** in `toolbox/src`, `ollama/src`. `ollama/tests` uses `createInstructionManager()` without per-item `format`.
- Published per-item `format` still in **mirrors** `toolbox/guides/agent.md:341` and `ollama/guides/agent.md:341` (`format?: string` on `InstructionInput`) — excluded as vendored mirrors per brief.
- `QueueExecution`: **no hit** in agent `src`.
- `symbol.kind`: **no hit** in agent `tests`.
- `scaffold/src` `format` hits are module-format / `format:check` (`scaffold/src/core/compilers.ts:272,284-285`, `templates.ts:166`, …), not `InstructionInterface.format`.

**Writing sweep** (diff `+` lines in `guides/**`, `README.md`, src doc comments, test titles/comments). Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`:

- `guides/agent.md` (now-tree, from `+` prose): `:452` `a new array`; `:779` `no new engine` / `ONLY new logic`; `:795` `the new run`; `:1117` `mints a new system`; `:1118` `a NEW scope`; `:81` `just the number` (fence data; may be unchanged context); `:56` tool name `'now'`; `:286` `now IS this thread`; `:934` `Now the model`; `:1020` `now build()`.
- `src/core/Agent.ts` comment `+` `now smaller` (diff ~953) — current `#trim` rebuild comment.
- `src/core/ThinkSplitter.ts` `+` deleted minimizing `just` (`is thinking text`).
- `src/core/Channel.ts` / `constants.ts` `+` `through` (replaced `via`).
- `guides/README.md` `+` `for example` (replaced `e.g.`).
- Code `+` `new AgentError` / `new ScopeManager` / `new ScriptedProvider` / `throw new Error` — constructor `new`, not prose.

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on `+` lines: diff `~507` (`guides/agent.md` contract item 27 long line) matched. Tree `guides/agent.md:793` `A sub-1 cap` / `THIRD summarizer` are other numeric prose; `types.ts` / guide still say `two observation surfaces` (`types.ts:1152`, `guides/agent.md:773`) with members named in-sentence.

## Distillate

- agent-obj-1: site now `AgentRegistry.ts:137` AgentError REGISTRY | diff present yes | old form hits 0 | report matches no (`:130` is `#budget`, import is `:18`)
- agent-obj-2: site now `Agent.ts:111` `#settled` + `:153-158` derived getter | diff present yes | old form hits 0 (`#status`) | report matches yes
- agent-obj-3: site now `guides.test.ts:180` flagship | diff present yes | old form hits 0 | report matches yes
- agent-obj-4: site now `validators.ts:35` + `tests/src/core/validators.test.ts` | diff present yes | old form hits 0 | report matches yes
- agent-obj-5: site now `setup.ts:171` class / `:137` `chunkWholeDelta` / `:379` method `summarize` | diff present yes | old form hits 0 | report matches yes
- agent-obj-6: site now `setup.ts:119` `export function turnParts` | diff present yes | old form hits 0 | report matches yes (line `:110`→`:119`)
- agent-obj-7: site now promoted factories `setup.ts:630-765`; no `makeTools` | diff present yes | old form hits 0 | report matches yes (shaping ≠ refuter single options form)
- agent-obj-8: site now `Agent.ts:688` `errorToMessage` | diff present yes | old form hits 0 | report matches yes
- agent-obj-9: site now `errors.ts:21` and `:76` `as const` | diff present no | old form hits 2 | report matches yes (`stopped`)
- agent-obj-10: site now `ScopeManager.ts:46` options constructor | diff present yes | old form hits 0 | report matches yes (`factories.ts:319`→`:322`)
- agent-subj-1: site now four `let removed = true` (`InstructionManager.ts:117` et al.) | diff present yes | old form hits 0 | report matches yes
- agent-subj-3: site now `factories.ts:272-282` named allow-lists | diff present yes | old form hits 0 | report matches yes
- agent-subj-4: site now `types.ts:1273-1276` present-only Authority prose | diff present yes | old form hits 0 | report matches yes
- agent-subj-5: site now `guides/agent.md:1140` / `guides/README.md:3,:105`; `§` empty owned | diff present yes | old form hits 0 owned | report matches yes (`:1139`→`:1140`)
- agent-subj-6: site now `Agent.ts:376` named guard; `clause N` empty | diff present yes | old form hits 0 | report matches yes
- agent-subj-7: site now Factories/Helpers/`is*` noun phrases `guides/agent.md:379+` | diff present yes | old form hits 0 | report matches yes
- agent-subj-12: site now `types.ts:137` `for example`; fence `just` `:81` | diff present yes | old form hits 1 owned prose + many `tests/**` | report matches yes on row bound
- agent-subj-13: site now `errors.ts:121` no `§F2`; Agent comments retitled | diff present yes | old form hits 2 (`v1` fixture) | report matches yes
- agent-subj-14: site now `types.ts:283` `override` | diff present yes | old form hits 0 owned; mirrors still `format` | report matches yes
- fleet-F1: site now absent `isBrowserVuePath` | diff present n/a | old form hits 0 | report matches yes (`noop`)
- fleet-F2: site now `Agent.ts:83` `#id` + `:145` getter | diff present yes | old form hits 0 on Agent public field | report matches yes

Scope tags: all 40 status paths **owned**; no off-limits path in status.

Residue: no `.skip`/`.only`/`.todo`/TODO/FIXME/`console.`/`debugger` in owned `src`+non-vendored tests; `timeout`/`retry` are option/API names (lines listed above).

Writing: `just`/`new`/`now` remain in `guides/agent.md` as listed; `via`/`e.g.` replaced in touched src/README `+` hunks; tests still carry `via`/`just`/`e.g.`.

Parity: method tables match listed interface call signatures; `ConversationStoreInterface` has no Methods table; `Instruction` Entities row omits `override`; `override` is on Types rows `:531-532`.

## Unknowns

- Full inflection sweeps (`-s`/`-ed`/`-ing`) for every removed English phrase were not run as separate regexes beyond the names listed; `status`/`Error`/`format` as common words would flood.
- Count-numeral sweep for agent-subj-3 was not exhaustively dumped line-by-line (report claimed empty).
- `JSON.stringify` of `Agent` instances: not re-grepped to completion for fleet-F2 pre-check.
- Independent gate commands were not re-run (read-only); only the report's § Gates text and proof-file `Tests` lines were read.
- First `+` line for a few hunks that open with context-only lines (DatabaseConversationStore, some AgentContext hunks after the first) may not be the first changed token.
- `tests/src/core/Channel.test.ts` `just before close` was outside the substitution row bound and the status file (unchanged).

## Journal

## Deviation

No tree change from this lane (read-only Grep/Read only). Every named input file opened. Evidence diff, status, report, briefs, proof files, and `/home/user/fleet/agent` sources were readable. Sweeps used the Grep tool (ripgrep) over the named paths, not a mutating shell. Vendored dependency guides still contain `§` and per-item `format`; they were excluded from owned-path sweeps as the unit brief's off-limits/shared mirrors.