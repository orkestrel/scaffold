I'll read the brief first, then follow its instructions exactly in read-only mode.I'll load the unit brief, audit brief, report, and evidence files next so I can map each row against the tree.I'll pull the cited law sentences, current tree sites, and the evidence diff in parallel so each row can be mapped with `file:line` pointers.# Question

For every row of unit conform-agent, what does the tree at `/home/user/fleet/agent` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

# Evidence

Law sentences cited (scaffold copies): typescript.md:45 `| Programmer error or invalid argument | Throw an `AppError` |`; typescript.md:68–69 `Error classes expose a machine-readable `code` and optional `context`.` / `Every public error class ships with a guard such as `isAppError` for safe `catch` narrowing.`; AGENTS.md:61 `**Derive state.** Compute facts from existing fields. Do not store a second flag or label that can drift.`; tests.md:55 ``tests/guides.test.ts` | Every documented API exists…`; tests.md:70–72 `Transcribe each flagship fence and assert the values its comments claim.`; tests.md:13–14 `Mirror module/application structure: `tests/{src,app}/[environment]/[domain]/[module].test.ts`.` ; tests.md:43 `Do not create test files solely for `constants.ts`, barrels, error definitions, or `types.ts`.`; AGENTS.md:68 `**No nested functions.**`; architecture.md:162 `This bans local `function`, `function*`, and `const fn = () => ...`, regardless of caller count.`; tests.md:182 `Export every reusable helper…`; architecture.md:50 `Every declaration in a centralized file is exported.`; tests.md:185 `Test files import shared infrastructure rather than declaring local fixture factories.`; tests.md:181 `Any duplicate or near-duplicate helper is a defect;`; patterns.md:16 `Reuse the originating package directly when semantics match.`; patterns.md:20 `Never reimplement or rename-wrap a declared package primitive.`; typescript.md:28–32 ``as const` annotates a literal… Do not write it on a value whose contract is already declared; annotate the declaration instead.`; architecture.md:184 `2. Constructor: initialize context/options and instantiate child managers.`; architecture.md:153 `Delete one-line delegates, pass-through factories, rename-only helpers/getters, compatibility aliases…`; patterns.md:64 `An id list applies to those items and returns true only when all succeed.`; writing.md:38 `Claim only what the reader can check.`; AGENTS.md:172 `**NEVER state a count.**`; typescript.md:84 `Do not document speculative future product behavior unless requested.`; writing.md:92 ``currently`, `now` | Delete, or give the date`; documentation.md:23 ``AGENTS.md` and its linked rules are the sole convention source. Do not create competing instruction copies in guides.`; AGENTS.md:174 `**NEVER name a list item by its position.**`; documentation.md:35 `The TSDoc voice rule governs a doc block; a guide tagline and a Surface-row description are noun phrases.`; writing.md:97 ``e.g.`, `i.e.` | `for example`, `that is``; AGENTS.md:156 `Word every sentence so the reader understands it on the first read.`; typescript.md:73 `Comments explain why, never restate what self-explanatory code does.`; names.md:8 `Names are public API. A consumer can predict them without documentation.`; AGENTS.md:60 `One concept, one term. Do not alternate synonyms.`

## agent-obj-1

1. **Site now.** Brief `AgentRegistry.ts:136`. Current throw is `AgentRegistry.ts:137` (`136` is `const value = pool.get(name)`). Context: `135` `#resolve<T>(…): T {` / `137` `if (value === undefined) throw new AgentError('REGISTRY', \`unknown ${category}: ${name}\`)` / `138` `return value`. Import is `AgentRegistry.ts:18` `import { AgentError } from './errors.js'` (not `:130`). `errors.ts:182` `readonly code: 'CONCURRENCY' | 'REGISTRY'`; `errors.ts:184` constructor parameter the same union; `@remarks` at `errors.ts:176–178` names `'REGISTRY'`. `types.ts:1341` `THROW an {@link AgentError} carrying `code: 'REGISTRY'``. `guides/agent.md:777` `An unknown name throws an `AgentError` carrying `code: 'REGISTRY'``. Methods table `guides/agent.md:717–720` still writes `THROWS `unknown provider: <name>`` with no `AgentError`.
2. **Diff at the site.** `AgentRegistry.ts` `@@ -15,6 +15,7 @@` first `+` `import { AgentError } from './errors.js'`; `@@ -129,11 +130,11 @@` `+		if (value === undefined) throw new AgentError('REGISTRY', \`unknown ${category}: ${name}\`)`. `errors.ts` `@@ -154,30 +154,34 @@` `+	readonly code: 'CONCURRENCY' | 'REGISTRY'` and `+	constructor(code: 'CONCURRENCY' | 'REGISTRY', message: string) {`. Operative repair text present verbatim on those `+` lines. Finder's `'../errors.js'` is not in the `+` lines; refuter's `'./errors.js'` is.
3. **Old form sweep.** Pattern `new Error(\`unknown` over `src`, `tests`, `guides/agent.md`, `guides/README.md`, `README.md`: no hit. Pattern `THROW a clear \`Error\`` / `a clear \`Error\``: no hit. Pattern `THROW a clear error`: `tests/src/core/AgentRegistry.test.ts:21`. Inflections `-s/-ed/-ing` of `Error` not swept as a rename (the throw type changed; `Error` remains the superclass).
4. **Report reading.** Table: `applied`. Sentence: "`src/core/errors.ts` widens `AgentError.code` to `'CONCURRENCY' | 'REGISTRY'` … `src/core.AgentRegistry.ts:130` imports `AgentError` from `'./errors.js'` and `#resolve` throws `new AgentError('REGISTRY', …)`". `errors.ts` widening matches `errors.ts:182,184`. Cited `:130` does **not** carry the import (`:130` is `#budget`; import is `:18`; throw is `:137`).
5. **Proof reading.** Report: `npx vitest run … --project src:core tests/src/core/AgentRegistry.test.ts`; red `1 failed | 34 passed` `agent-obj-1-control.txt`; green `35 passed` `agent-obj-1-green.txt`. Files exist. Control: `Tests  1 failed | 34 passed (35)`. Green: `Tests  35 passed (35)`.

## agent-obj-2

1. **Site now.** Brief `Agent.ts:108`. Field is `Agent.ts:111` `#settled: AgentStatus = 'idle'` (`108` is a comment). Getter `Agent.ts:153–157` `return this.#runs.size > 0 ? 'running' : this.#settled`. `stream()` has no `#status`/`#settled = 'running'` write (`Agent.ts:205` `#runs.add` then emit). `Agent.ts:298` `this.#settled = 'done'`; `Agent.ts:314` `this.#settled = 'error'`. Overlap tests `Agent.test.ts:2245`, `:2265`.
2. **Diff at the site.** `Agent.ts` `@@ -95,26 +97,28 @@` `+#settled: AgentStatus = 'idle'`; `@@ -138,12 +142,19 @@` `+		return this.#runs.size > 0 ? 'running' : this.#settled`; `@@ -192,9 +203,9 @@` deletes `this.#status = 'running'`; `@@ -284,7 +295,7 @@` `+				this.#settled = 'done'`; `@@ -300,7 +311,7 @@` `+				this.#settled = 'error'`. Operative getter/field/write text present in `+` lines.
3. **Old form sweep.** `\b#status\b` / `this.#status`: no hit. Inflections `statusing`/`statused`: no hit in that form.
4. **Report reading.** `applied`. Sentence: "`get status()` reads `this.#runs.size > 0 ? 'running' : this.#settled`; the `'running'` write at `stream()` deleted; the `finally` branches set `#settled`." Matches `Agent.ts:157,205,298,314`.
5. **Proof reading.** Report: `npx vitest run … --project src:core tests/src/core/Agent.test.ts`; red `4 failed | 116 passed` `agent-obj-2-control.txt`; green `120 passed`. Control: `Tests  4 failed | 116 passed (120)`. Green: `Tests  120 passed (120)`.

## agent-obj-3

1. **Site now.** Brief `tests/guides.test.ts:1-171`. File still starts `tests/guides.test.ts:1` `// The consumer-side guides-parity drop-in`. Flagship block appended at `tests/guides.test.ts:180` `describe('flagship fences', () => {` with `guideText` at `:181`, `instructions.open` `:191`, `render(safety)` `:192`, `toContain` `:196–197`.
2. **Diff at the site.** `tests/guides.test.ts` `@@ -17,6 +17,8 @@` `+import { createTool, createToolManager } from '@orkestrel/tool'`; later hunks append the flagship `describe`. Operative `describe('flagship fences'` present in `+` lines (diff file around the append after the per-manifest loop).
3. **Old form sweep.** Row adds execution; no renamed symbol. Pattern `findUnlisted` still present in the name-resolution half (`tests/guides.test.ts` still imports it). No name removed.
4. **Report reading.** `applied`. Sentence names instructions / tool-dispatch / helper / snapshot fences with `toContain`. Tree has those cases from `tests/guides.test.ts:183` onward.
5. **Proof reading.** Report: `npm run test:guides`; red `1 failed | 90 passed` `agent-obj-3-control.txt`; green `91 passed`. Control: `Tests  1 failed | 90 passed (91)`. Green: `Tests  91 passed (91)`.

## agent-obj-4

1. **Site now.** Brief `validators.ts:35`. Still `validators.ts:35` `export function isMessage(value: unknown): value is Message {`. Mirror exists `tests/src/core/validators.test.ts:1` (new). `MemoryConversationStore.test.ts` no longer holds the `isConversationSnapshot` describe (moved).
2. **Diff at the site.** `validators.ts` `@@ -4,8 +4,8 @@` (TSDoc, not the export line). New file `tests/src/core/validators.test.ts` `@@ -0,0 +1,159 @@` first `+` `import { isConversationSnapshot, isMessage, isSection } from '@src/core'`. Repair's new file text present.
3. **Old form sweep.** Describe title `§14 read-boundary`: no hit under `src`/`tests`/`guides/agent.md`/`guides/README.md`/`README.md` (`§` empty on those paths).
4. **Report reading.** `applied`. "`tests/src/core/validators.test.ts` created… `§14` struck from its title". File exists; title `tests/src/core/validators.test.ts:19` `isMessage — the per-message shape guard (total + defensive)` has no `§14`.
5. **Proof reading.** Report: `npx vitest run … --project src:core tests/src/core/validators.test.ts`; red `3 failed | 8 passed`; green `11 passed`. Control: `Tests  3 failed | 8 passed (11)`. Green: `Tests  11 passed (11)`.

## agent-obj-5

1. **Site now.** Brief `tests/setup.ts:140` (`const deltasOf` / nested `next` / nested `stream`). `:140` is now a blank line after `chunkWholeDelta`. Symbols: `tests/setup.ts:137` `export function chunkWholeDelta`; `:171` `export class ScriptedProvider`; `:155–159` factory returns `new ScriptedProvider`; `:379` `async summarize(messages) {` method syntax on `createStubSummarizer`.
2. **Diff at the site.** `tests/setup.ts` `@@ -1,6 +1,8 @@` and large replacement hunks; `+export class ScriptedProvider implements ScriptedProviderInterface`; `+	return new ScriptedProvider(turns, options)`. Operative class conversion present.
3. **Old form sweep.** `const deltasOf`: no hit. `const next = (): ScriptedTurn`: no hit. Nested `async function* stream` in `setup.ts`: no hit (`stream` is a method). `summarize: async (messages)`: `tests/setup.ts:442` (argument to `createConversation`, not `createStubSummarizer`); `tests/src/core/Agent.test.ts:3046`, `:3726`.
4. **Report reading.** `applied`. Class/fields/getters/`chunkWholeDelta`/method-syntax `summarize` match `tests/setup.ts:137,171,379`.
5. **Proof reading.** Report: `npm run test:setup`; red `1 failed | 43 passed`; green `44 passed`. Control: `Tests  1 failed | 43 passed (44)`. Green: `Tests  44 passed (44)`.

## agent-obj-6

1. **Site now.** Brief `tests/setup.ts:110`. `turnParts` is `tests/setup.ts:119` `export function turnParts(turn: ScriptedTurn)`. Discriminator `tests/setup.ts:124` `'result' in turn`.
2. **Diff at the site.** `tests/setup.ts` hunk covering the helper adds `export` and TSDoc. `+export function turnParts` present.
3. **Old form sweep.** Unexported `function turnParts`: no hit (`export function turnParts` at `tests/setup.ts:119`). Inflections `turnPart`/`turnParting`: no hit.
4. **Report reading.** `applied`. "`export` added to `turnParts` at `tests/setup.ts:110`" — current line is `:119`, not `:110`. Export is present.
5. **Proof reading.** Report: `npm run test:setup`; red `7 failed | 37 passed`; green `44 passed`. Control: `Tests  7 failed | 37 passed (44)`. Green: `Tests  44 passed (44)`.

## agent-obj-7

1. **Site now.** Brief `Agent.test.ts:715`. Current `Agent.test.ts:718` `tools: createSeededToolManager(),` (no local `makeTools`). Factories: `tests/setup.ts:628` `createSeededToolManager`; `:646` `seedWorkspaceContext`; `:667` `seedInstructionContext`; plus `resolveSectionOpen` / `resolveSectionRender` / `seedConversation` in the same file.
2. **Diff at the site.** `Agent.test.ts` `@@ -32,6 +33,7 @@` import of `createSeededToolManager`; call sites replaced. Operative `createSeededToolManager` present (refuter name, not finder's `createAddToolManager`).
3. **Old form sweep.** `\bmakeTools\b`: no hit. `function seedImages` / `function openFor` / `function renderFor` / `function seed()`: no hit. Inflections `makeTooling`: no hit.
4. **Report reading.** `applied`. Names `createSeededToolManager` / `seedWorkspaceContext` / `seedInstructionContext` match `tests/setup.ts:628,646,667`. Report's cited `Agent.test.ts:715` is now `:718`.
5. **Proof reading.** Report: `npm run test:setup`; red `6 failed | 38 passed`; green `44 passed`. Control: `Tests  6 failed | 38 passed (44)`. Green: `Tests  44 passed (44)`.

## agent-obj-8

1. **Site now.** Brief `Agent.ts:676`. Current `Agent.ts:688` `const reason = errorToMessage(error)`. Import `Agent.ts:27` `import { errorToMessage } from '@orkestrel/workflow'`.
2. **Diff at the site.** `Agent.ts` `@@ -24,6 +24,7 @@` `+import { errorToMessage } from '@orkestrel/workflow'`; `@@ -670,10 +681,11 @@` `+				const reason = errorToMessage(error)`. Verbatim repair present.
3. **Old form sweep.** `error instanceof Error ? error.message : String(error)`: no hit.
4. **Report reading.** `applied`. Matches `Agent.ts:27,688`. Report also records the `[object Object]` claim as false of the primitive.
5. **Proof reading.** Report: `npx vitest run … Agent.test.ts`; red `2 failed | 118 passed`; green `120 passed`. Control: `Tests  2 failed | 118 passed (120)`. Green: `Tests  120 passed (120)`.

## agent-obj-9

1. **Site now.** Brief `errors.ts:21`. Still `errors.ts:21` `readonly code = 'ABORT' as const` (context `20` TSDoc / `22` `readonly partial`). `errors.ts:76` `readonly code = 'PARTIAL' as const`. Ruled form `readonly code: 'ABORT' = 'ABORT'` is **absent**.
2. **Diff at the site.** `errors.ts` hunks `@@ -1,6 +1,6 @@`, `@@ -47,7 +47,7 @@`, `@@ -103,7 +103,7 @@`, `@@ -117,8 +117,8 @@`, `@@ -154,30 +154,34 @@` — comments and `AgentError` union only. No `+	readonly code: 'ABORT' = 'ABORT'`. Repair text **not** present in `+` lines.
3. **Old form sweep.** `as const` on those fields: `src/core/errors.ts:21`, `src/core/errors.ts:76`. Other `as const` (tuples/lists): `guides/agent.md:25`; `tests/src/core/Agent.test.ts:2378`; `helpers.test.ts:284,315`; `factories.test.ts:190`; `InstructionManager.test.ts:24`; `ScopeManager.test.ts:19`; `AgentRegistry.test.ts:503–504`.
4. **Report reading.** `stopped`. Sentence: reverted to baseline `as const` so `lint:check` closes. Matches `errors.ts:21,76`.
5. **Proof reading.** Documentation/syntax row; report records lint refusal, not a vitest control file. No `agent-obj-9-*.txt` under `/home/user/work/evidence/agent-proofs/`.

## agent-obj-10

1. **Site now.** Brief `ScopeManager.ts:45`. Current `ScopeManager.ts:46` `constructor(options?: ScopeManagerOptions)` (context `45` `#emitter` / `47` `this.#emitter = new Emitter…`). `factories.ts:322` `return new ScopeManager(options)`. Tests `ScopeManager.test.ts:159` `new ScopeManager({ on: { create: create.handler } })`; `:168` `{ error: … }`.
2. **Diff at the site.** `ScopeManager.ts` `@@ -38,14 +39,14 @@` `+	constructor(options?: ScopeManagerOptions) {`; `factories.ts` `@@ -316,7 +319,7 @@` `+	return new ScopeManager(options)`. Verbatim present.
3. **Old form sweep.** `constructor(on?:`: no hit. `new ScopeManager\(.*,`: no two-arg form in `src`/`tests`. Inflections n/a.
4. **Report reading.** `applied`. Matches `ScopeManager.ts:46` and `factories.ts:322`. Report's `:319` is the factory function start; body is `:322`.
5. **Proof reading.** Report: vitest `ScopeManager.test.ts` + `factories.test.ts`; red `3 failed | 58 passed`; green `61 passed`. Control: `Tests  3 failed | 58 passed (61)`. Green: `Tests  61 passed (61)`.

## agent-subj-1

1. **Site now.** Brief `InstructionManager.ts:113-122`. Current `InstructionManager.ts:117` `let removed = true`; `:119` `if (!this.#delete(name)) removed = false`. Same seed/clear: `ScopeManager.ts:84`; `Conversation.ts:162`; `ConversationManager.ts:155`. Guide method rows `guides/agent.md:612,625,653,732,753` `true` only when EVERY supplied id/name was removed.
2. **Diff at the site.** `InstructionManager.ts` `@@ -112,9 +112,11 @@` `+			let removed = true` / `+				if (!this.#delete(name)) removed = false`. Same pattern in the other three class hunks. Present.
3. **Old form sweep.** `let removed = false`: no hit. `whether any was removed`: `tests/src/core/conversations/ConversationManager.test.ts:113`; `guides/workflow.md:530` (vendored mirror, outside the named paths). Inflections `removing` as any-semantics: not additionally hit on owned paths except that test title.
4. **Report reading.** `applied`. Array branches match. Cited test updates: mixed batches expect `false`. Title at `ConversationManager.test.ts:113` still reads `reports whether any was removed` (single-id case, still `true`/`false` for presence).
5. **Proof reading.** Report: four manager suites; red `4 failed | 123 passed`; green `127 passed`. Control: `Tests  4 failed | 123 passed (127)`. Green: `Tests  127 passed (127)`.

## agent-subj-3

1. **Site now.** Brief `factories.ts:270-280`. Current `factories.ts:272–273` `from its \`name\` and its per-category allow-lists`; `:281–282` ``name` (required) and the optional `instructions` / `tools` / `files` allow-lists`. No `messages` allow-list in that `@param`.
2. **Diff at the site.** `factories.ts` `@@ -267,8 +269,8 @@` and `@@ -276,8 +278,8 @@`. Repair text present.
3. **Old form sweep.** `four optional per-category`: no hit. `the three per-category`: no hit. `messages` / `files` allow-list phantom: `guides/agent.md:103` states `Conversation messages are NOT scoped` / `no \`messages\` allow-list`.
4. **Report reading.** `applied`. Matches `factories.ts:272–282`.
5. **Proof reading.** Documentation row. Report sweep table: count-words 18 permitted; numerals empty. This lane: `\b(one|two|…|ten) (allow-list|…)` not re-run with the report's exact long pattern; `four optional` / `three per-category` empty as above.

## agent-subj-4

1. **Site now.** Brief `types.ts:1277-1279`. Current `types.ts:1274–1276` `Ordered first-match-wins… \`evaluate\` is synchronous and returns the verdict directly. Event-free — no Emitter, no events.` `Authority.ts:29` `**Synchronous.** \`evaluate\` returns the verdict directly.` `Agent.ts:627` `NOT separately bound to this run's abort signal.`
2. **Diff at the site.** `types.ts` hunk covering `AuthorityInterface` remarks; `Authority.ts` `@@ -26,8 +26,7 @@` `+ * - **Synchronous.** \`evaluate\` returns the verdict directly.` Present. Handshake/`currently`/`v1 never` deleted in those hunks.
3. **Old form sweep.** `deferred to a later chunk` / `human-approval handshake` / `v1 never auto-reinserts` / `currently \`instructions\`` / `a future tier can thread`: no hit in `src`. `guides/agent.md`: no hit for those phrases.
4. **Report reading.** `applied`. Named cuts match. Report `:479` factories / `:29` Authority: Authority matches `:29`.
5. **Proof reading.** Documentation row. Sweep of those phrases: empty on `src` + `guides/agent.md`.

## agent-subj-5

1. **Site now.** Brief `guides/agent.md:1139`. Current `guides/agent.md:1139` `- [\`AGENTS.md\`](../AGENTS.md) — the repository's authority pointer; the coding rules it resolves to live in \`@orkestrel/scaffold\`.` `guides/README.md:3` `A dual-axis index into this repository's guides — by concept, and by directory.`; `:105` same AGENTS pointer.
2. **Diff at the site.** `guides/agent.md` last hunk `@@ -1128,13 +1128,13 @@`; `guides/README.md` `@@ -1,6 +1,6 @@` and `@@ -102,4 +102,4 @@`. Repair text present.
3. **Old form sweep.** Pattern `§` over `src`, `tests`, `guides/agent.md`, `guides/README.md`, `README.md`: no hit. (Hits remain in vendored `guides/queue.md`, `guides/workflow.md`, `guides/timeout.md`, etc.)
4. **Report reading.** `applied`. "Every `§` token is gone from the package's own files" matches the owned-path sweep. Cited `:1139` / README `:3` / `:105` match.
5. **Proof reading.** Report sweep `§` empty (exit 1). This lane agrees on owned paths.

## agent-subj-6

1. **Site now.** Brief `Agent.ts:365`. Current `Agent.ts:376–377` ``futile` is the futile-compaction guard:` (no `clause 26`). `types.ts` concurrent-threads sentence ends without `clause 23` (interface `AgentContextInterface` remarks). Guide Contract items keep numbering; references use named clauses (`guides/agent.md:773` `the automatic-compaction clause`, etc.).
2. **Diff at the site.** `Agent.ts` hunks around the `futile` comment and `:553` analogue. `+` lines use `futile-compaction guard` without `clause N`.
3. **Old form sweep.** `\bclause [0-9]+`: no hit on `src`, `tests`, `guides/agent.md`, `guides/README.md`, `README.md`.
4. **Report reading.** `applied`. Matches empty `clause N` sweep. Report `:376` / `:564` — current futile comment is `:376`; second site is `:564` area (`Agent.ts:564` `an \`undefined\` fold here is genuinely futile`).
5. **Proof reading.** Report sweep empty. This lane agrees.

## agent-subj-7

1. **Site now.** Brief `guides/agent.md:375-394`. Factories table `guides/agent.md:379–394` noun phrases (`A \`ConversationInterface\``, `A fresh \`ThinkSplitterInterface\``, `An empty \`ChannelInterface\``). Helpers `guides/agent.md:433–456` noun phrases. Errors `is*` `guides/agent.md:507,509,511,513` `The narrowing guard for a caught…`.
2. **Diff at the site.** `guides/agent.md` `@@ -374,36 +374,36 @@` rewrites Factories; `@@ -428,32 +428,32 @@` Helpers; Errors hunk. Operative noun-phrase rows present. Imperative `Create a fresh` **not** in `+` lines.
3. **Old form sweep.** `Create a fresh` / `Create an empty` / `Narrow a caught`: no hit in `guides/agent.md`.
4. **Report reading.** `applied`. Matches Factories/Helpers/`is*` rows. Validators left as noun phrases (`guides/agent.md:483+`).
5. **Proof reading.** Documentation row; report: `test:guides` stays green (names, not descriptions).

## agent-subj-12

1. **Site now.** Brief `types.ts:137`. Current `types.ts:137` `(for example \`think\`)` (no `e.g.`).
2. **Diff at the site.** `types.ts` `@@ -131,10 +131,10 @@` and many substitution hunks; `guides/README.md` `+(for example \`@orkestrel/toolbox\`'s \`createWorkspaceTool\`)`.
3. **Old form sweep** (row bound: `src/**`, `guides/agent.md`, `guides/README.md`, `README.md`). `e.g.` / `i.e.` / `\bvia\b` / `etc.` / `simply` / `in order to` / `and/or` / `currently` in `src`: no hit. `guides/agent.md`: `guides/agent.md:81` `{ role: 'user', content: 'Reply with just the number.' }`. `guides/README.md` / `README.md`: no hit. `tests/**` (outside bound): many `via`/`just` hits (e.g. `tests/setup.ts:99` `e.g.`; `Agent.test.ts:51,61,212,…`).
4. **Report reading.** `applied`. "one hit, permitted: `guides/agent.md:81`" matches this lane's bound sweep.
5. **Proof reading.** Report sweep agrees with field 3 on the named bound. Field 3 vs report: agree.

## agent-subj-13

1. **Site now.** Brief `errors.ts:121`. Current `errors.ts:121–123` `A \`sections\` cap (on {@link …ConversationOptions} /` — no `§F2`. `Agent.ts:100` `When true, a summarizer failure during AUTOMATIC compaction rethrows`; `:172` `Concurrency guard: a run already in flight PLUS`; `:365` `Limit-exhaustion tracking`; `:438` `Bounded mid-stream budget enforcement`; `:627` area single-level; `:659` `byte-identical to the no-authority path` (report `:659`).
2. **Diff at the site.** `errors.ts` `@@ -117,8 +117,8 @@` deletes `§F2`. `Agent.ts` hunks delete `F5 —`, `F4 —`, `§F3`, `F1`, `F2`, `F6`, `v1`, `Ch5`, `§ auto-compact`. Present.
3. **Old form sweep.** `\bF[1-9]\b|\bCh[0-9]\b|\bv1\b|§` over owned paths: `tests/src/core/instructions/InstructionManager.test.ts:67` `content: 'v1'`; `:236` `content: 'v1'`. No `F1`–`F6` / `Ch5` / `§F2` in `src` or `guides/agent.md`.
4. **Report reading.** `applied`. Named Agent/errors sites match. Report's two `v1` hits match field 3.
5. **Proof reading.** Report sweep agrees.

## agent-subj-14

1. **Site now.** Brief `types.ts:283`. Current `types.ts:283` `readonly override?: string` (`282` `*/` / `284` `}`). `types.ts:302` same on `InstructionInput`. `helpers.ts:570` `resolveItem<T extends { readonly override?: string }>`; `:576` `item.override ??`. `Instruction.ts:31` `readonly override?: string`. **Leftover:** `InstructionManager.ts:31` `{@link InstructionInput.format}`.
2. **Diff at the site.** `types.ts` `@@ -280,7 +280,7 @@` `+	readonly override?: string`; `helpers.ts` `@@ -567,13 +567,13 @@`; `Instruction.ts` `@@ -26,15 +26,15 @@`. `+	readonly override?: string` present. `InstructionInput.format` still in tree at `InstructionManager.ts:31` (that remark hunk did not replace `.format` with `.override`).
3. **Old form sweep.** `item.format` / `itemFormat` / `I.format` / `instruction.format` / `readonly format?: string`: no hit on owned paths. `InstructionInput.format`: `src/core/instructions/InstructionManager.ts:31`. Inflections `formats`/`formatted`/`formatting` as the per-item member: not additionally found as `InstructionInput.formats`. Case-insensitive `instructioninput.format`: same one hit.
4. **Report reading.** `applied`. "Sweep … empty (exit 1)". Cited `types.ts` / `helpers.ts:570` / Instruction field match. Report's empty old-name sweep **does not match** `InstructionManager.ts:31`.
5. **Proof reading.** Report: vitest helpers/AgentContext/InstructionManager; red `4 failed | 211 passed`; green `215 passed`. Control: `Tests  4 failed | 211 passed (215)`. Green: `Tests  215 passed (215)`. Report's old-name sweep disagrees with field 3.

## fleet-F1

1. **Site now.** Brief `tests/setup.ts` `isBrowserVuePath`. Helper absent. Workspace `src/` is `core` only.
2. **Diff at the site.** No hunk adding/deleting `isBrowserVuePath`.
3. **Old form sweep.** `isBrowserVuePath`: no hit. Inflections `isBrowserVuePaths`: no hit.
4. **Report reading.** `noop`. "`grep … isBrowserVuePath` returns no match" — agrees.
5. **Proof reading.** Placement/absence; report records grep, not a control file. Field 3 agrees.

## fleet-F2

1. **Site now.** `Agent.ts:83` `readonly #id: string` (first `#` field). `Agent.ts:121` `this.#id = crypto.randomUUID()`. `Agent.ts:145–147` `get id(): string { return this.#id }` as first getter. `types.ts:1164` `readonly id: string` unchanged. `Scope.ts:35` `readonly id: string = crypto.randomUUID()` with no `#` fields. `Instruction.ts:25` public `readonly id: string` with no `#` fields.
2. **Diff at the site.** `Agent.ts` `@@ -95,26 +97,28 @@` removes `readonly id: string = crypto.randomUUID()`; `@@ -138,12 +142,19 @@` adds `get id()`. Present.
3. **Old form sweep.** Agent public field initializer `readonly id: string = crypto.randomUUID()`: no hit on `Agent.ts`. `JSON.stringify` of an `Agent` instance: no `JSON.stringify(agent)` in `tests`/`guides/agent.md` (other `JSON.stringify` of messages/tools exist, e.g. `Agent.test.ts:388`).
4. **Report reading.** `applied`. Matches `#id` + first getter. "Only `Agent` had the shape" — `Scope.ts:35` / `Instruction.ts:25` have public `id` without `#` fields, consistent with the trigger.
5. **Proof reading.** Report: `JSON.stringify` grep, no Agent serialization. This lane agrees.

## Across the unit

### Scope

Status paths (`conform-agent.status`), tagged against § Scope:

- `guides/README.md` — owned (`guides/README.md`)
- `guides/agent.md` — owned
- `src/core/Agent.ts` — owned (`src/**`)
- `src/core/AgentContext.ts` — owned
- `src/core/AgentRegistry.ts` — owned
- `src/core/Authority.ts` — owned
- `src/core/Channel.ts` — owned
- `src/core/ThinkSplitter.ts` — owned
- `src/core/constants.ts` — owned
- `src/core/conversations/Conversation.ts` — owned
- `src/core/conversations/ConversationManager.ts` — owned
- `src/core/conversations/stores/DatabaseConversationStore.ts` — owned
- `src/core/conversations/stores/MemoryConversationStore.ts` — owned
- `src/core/errors.ts` — owned
- `src/core/factories.ts` — owned
- `src/core/helpers.ts` — owned
- `src/core/instructions/Instruction.ts` — owned
- `src/core/instructions/InstructionManager.ts` — owned
- `src/core/scopes/Scope.ts` — owned
- `src/core/scopes/ScopeManager.ts` — owned
- `src/core/types.ts` — owned
- `src/core/validators.ts` — owned
- `tests/guides.test.ts` — owned (`tests/**` except vendored three)
- `tests/setup.test.ts` — owned
- `tests/setup.ts` — owned
- `tests/src/core/Agent.test.ts` — owned
- `tests/src/core/AgentContext.test.ts` — owned
- `tests/src/core/AgentRegistry.test.ts` — owned
- `tests/src/core/conversations/Conversation.test.ts` — owned
- `tests/src/core/conversations/ConversationManager.test.ts` — owned
- `tests/src/core/conversations/stores/DatabaseConversationStore.test.ts` — owned
- `tests/src/core/conversations/stores/MemoryConversationStore.test.ts` — owned
- `tests/src/core/factories.test.ts` — owned
- `tests/src/core/helpers.test.ts` — owned
- `tests/src/core/instructions/Instruction.test.ts` — owned
- `tests/src/core/instructions/InstructionManager.test.ts` — owned
- `tests/src/core/integration.test.ts` — owned
- `tests/src/core/scopes/Scope.test.ts` — owned
- `tests/src/core/scopes/ScopeManager.test.ts` — owned
- `A tests/src/core/validators.test.ts` — owned

No status path is shared or off-limits. `README.md`, `package.json`, vendored `tests/setupPolicy.ts` / `policy.test.ts` / `config.test.ts` are absent from status.

Row `Where` files: `AgentRegistry.ts`, `Agent.ts`, `tests/guides.test.ts`, `validators.ts`, `tests/setup.ts`, `Agent.test.ts`, `errors.ts`, `ScopeManager.ts`, `InstructionManager.ts`, `factories.ts`, `types.ts`, `guides/agent.md`.

Diff hunks whose **file** no row `Where` names (file `@@` first `+`):

- `guides/README.md` `@@ -1,6 +1,6 @@` `+A dual-axis index into this repository's guides — by concept, and by directory.`
- `guides/README.md` `@@ -32,7 +32,7 @@` `+(for example \`@orkestrel/toolbox\`'s \`createWorkspaceTool\`) compile their contracts`
- `guides/README.md` `@@ -102,4 +102,4 @@` `+- [\`AGENTS.md\`](../AGENTS.md) — the repository's authority pointer; the coding rules it resolves to live in \`@orkestrel/scaffold\`.`
- `src/core/AgentContext.ts` `@@ -50,7 +50,7 @@` `+ *   through compaction; scope filters only instructions / tools / workspace files). Because \`messages\``
- `src/core/Authority.ts` `@@ -26,8 +26,7 @@` `+ * - **Synchronous.** \`evaluate\` returns the verdict directly.`
- `src/core/Channel.ts` `@@ -3,7 +3,7 @@` `+ * live through the \`drain\` async-iterator. Decoupling write from read is what lets a`
- `src/core/ThinkSplitter.ts` `@@ -21,7 +21,7 @@` `+ *   \`<think>\` inside an open span is thinking text (no nesting is tracked — the`
- `src/core/constants.ts` `@@ -1,7 +1,7 @@` `+ * keeps requesting tools can never loop forever. Overridable per agent through`
- `src/core/conversations/Conversation.ts` `@@ -43,10 +43,10 @@` (first `+` is the `rehydrate` wording / substitutions in that hunk)
- `src/core/conversations/ConversationManager.ts` `@@ -12,7 +12,7 @@`
- `src/core/conversations/stores/DatabaseConversationStore.ts` `@@ -34,12 +34,12 @@`
- `src/core/conversations/stores/MemoryConversationStore.ts` `@@ -7,8 +7,8 @@`
- `src/core/helpers.ts` `@@ -11,7 +11,7 @@` (`QueueContext` import)
- `src/core/instructions/Instruction.ts` `@@ -9,7 +9,7 @@` `+ * per-item \`override\` ONLY when supplied (assigned when present, mirroring a`
- `src/core/scopes/Scope.ts` `@@ -2,14 +2,14 @@`
- `tests/setup.test.ts` `@@ -7,11 +7,13 @@` `+import { ConversationManager, isProviderAbortError } from '@src/core'`
- `tests/src/core/AgentContext.test.ts` (file start hunk `@@` import/promotion)
- `tests/src/core/AgentRegistry.test.ts`
- `tests/src/core/conversations/Conversation.test.ts`
- `tests/src/core/conversations/ConversationManager.test.ts`
- `tests/src/core/conversations/stores/DatabaseConversationStore.test.ts`
- `tests/src/core/conversations/stores/MemoryConversationStore.test.ts`
- `tests/src/core/factories.test.ts`
- `tests/src/core/helpers.test.ts`
- `tests/src/core/instructions/Instruction.test.ts`
- `tests/src/core/instructions/InstructionManager.test.ts`
- `tests/src/core/integration.test.ts`
- `tests/src/core/scopes/Scope.test.ts`
- `tests/src/core/scopes/ScopeManager.test.ts` `@@` first `+` `+		const manager = new ScopeManager({ on: { create: create.handler } })` (hunk around `:154`)
- `tests/src/core/validators.test.ts` `@@ -0,0 +1,159 @@` `+import { isConversationSnapshot, isMessage, isSection } from '@src/core'`

(`Conversation.ts` / `ConversationManager.ts` are named in subj-1 **Repair**, not in any row **Where**.)

### Residue

Diff `+` lines, pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`:

- `\.skip(` / `\.only(` / `\.todo(` / `TODO` / `FIXME` / `console.` / `debugger`: no `+` hit in `conform-agent.diff`.
- `timeout` `+` hits (prose/API, not Vitest timeouts): `conform-agent.diff` lines 55, 326, 469, 482, 489, 496, 497, 507, 525, 604, 613, 1627, 2414, 3886 (quoted in the grep pass; domain `timeout` / `AbortSignal` / `AgentJobInput`).
- `retry` `+` hits: `conform-agent.diff:496` `bounded \`concurrency\`, \`retries\`, the per-attempt \`timeout\``; `:604` factories test bullet.

Tree `src` + `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

- `\.skip(` / `\.only(` / `\.todo(`: no hit under `tests/src` or `src`. (`tests/distribution.test.ts:684` `context.skip` is excluded.)
- `TODO` / `FIXME` / `debugger` / `console.`: no hit in `src`. `tests/src`: no `TODO`/`FIXME`/`debugger`/`console.`.
- `retry`: `src/core/types.ts:1435`; `src/core/AgentRegistry.ts:43`; `tests/src/core/factories.test.ts:186,289,498,529`.
- `timeout`: `src` — `errors.ts:51,65`; `factories.ts:84,368,377,544,556,560,577,581,595,605,608,626,630`; `types.ts:800,892,897,995,1044,1095,1121,1122,1124,1148,1292,1320,1321,1430,1434,1444,1455,1466`; `helpers.ts:213`; `Agent.ts:23,25,61,132,191,192,193,203,218,264,293,752,759`; `AgentRegistry.ts:39,108`. `tests/setup.ts:55`. `tests/src/core/Agent.test.ts:66,68,1020,1030,1078,1111,1609,3504,3551,3558`. `tests/src/core/factories.test.ts:500,554,557,562`. `tests/src/core/AgentRegistry.test.ts:23,381,382,389`.

### Parity

Entities the diff touches (class files + `types.ts`). Call-signature members (`types.ts`) beside `guides/agent.md` `## Methods` rows:

| Entity | types.ts members | guides/agent.md Methods |
| --- | --- | --- |
| ProviderInterface | `generate` `:160`; `stream` `:182` | `:591` `generate`; `:592` `stream` |
| ThinkSplitterInterface | `split` `:229`; `flush` `:231` | `:600` `split`; `:601` `flush` |
| MessageManagerInterface | `add` `:250–251`; `message` `:252`; `messages` `:253`; `remove` `:254–255`; `clear` `:256` | `:609–613` |
| InstructionManagerInterface | `add` `:375–376`; `instruction` `:377`; `instructions` `:379`; `render` `:381`; `remove` `:382–383`; `clear` `:384` | `:621–626` |
| ContextSectionSourceInterface | `render` `:448` | `:634` `render` |
| ScopeInterface | `narrow` `:531` | `:642` `narrow` |
| ScopeManagerInterface | `create` `:579`; `scope` `:580`; `scopes` `:582`; `remove` `:583–584`; `clear` `:585` | `:650–654` |
| AgentContextInterface | `apply` `:705`; `build` `:760` | `:662` `apply`; `:663` `build` |
| AgentInterface | `generate` `:1183`; `stream` `:1198`; `abort` `:1205` | `:671–673` |
| ChannelInterface | `push` `:938`; `close` `:940`; `fail` `:946`; `drain` `:952` | `:681–684` |
| AuthorityInterface | `evaluate` `:1285` | `:709` `evaluate` |
| AgentRegistryInterface | `provider` `:1360`; `tool` `:1368`; `authority` `:1376`; `scheduler` `:1384`; `build` `:1394` | `:717–721` |
| ConversationInterface | `add` `:1696–1697`; `message` `:1704`; `messages` `:1710`; `remove` `:1717–1718`; `clear` `:1720`; `view` `:1727`; `compact` `:1750`; `rehydrate` `:1757`; `search` `:1765`; `reference` `:1786`; `snapshot` `:1804` | `:729–739` |
| ConversationManagerInterface | `conversation` `:2008`; `conversations` `:2009`; `add` `:2010`; `switch` `:2011`; `open` `:2027`; `save` `:2040`; `remove` `:2041–2042`; `clear` `:2043` | `:747–754` |
| ConversationStoreInterface | `get` `:1869`; `set` `:1876`; `delete` `:1882` | (no dedicated Methods table; Entities `MemoryConversationStore` `:402` / `DatabaseConversationStore` `:403` name `get` / `set` / `delete`) |

Readonly data vs Surface/Entities:

- `AgentInterface`: `emitter` `types.ts:1163`; `id` `:1164`; `status` `:1165`; `context` `:1166` — Methods intro `guides/agent.md:667` "The `emitter` / `id` / `status` / `context` data members stay Surface rows"; Entities `Agent` `:409`.
- `InstructionInterface`: `id` `:271`; `name` `:272`; `content` `:273`; `priority` `:275`; `override?` `:283` — Types `guides/agent.md:531` `{ id; name; content; priority; override? }`. Entities `Instruction` `:404` names `name` / `content` / `priority` / `id`, not `override`.
- `ScopeManagerInterface`: `emitter` `:577`; `count` `:578` — Methods `:646`; Entities `:407`.
- `AuthorityInterface`: no data members — Methods `:705` "it has no data members".

Barrel: `src/core/index.ts:1–20` is `export *` from types/constants/errors/factories/classes. Guide `+` backticked published names (`createAgent`, `AgentError`, `override`, `InstructionInput`, `ScopeManager`, `createScopeManager`, `errorToMessage` is **not** an agent export — it is `@orkestrel/workflow`). `ScriptedProvider` / `chunkWholeDelta` / `turnParts` / `createSeededToolManager` live in `tests/setup.ts` and are **not** in `src/core/index.ts`.

### Gates

Report § Gates, quoted:

- `npm run format:check` | 0 | "All matched files use the correct format." over 77 files
- `npm run lint:check` | 0 | no output
- `npm run check` | 0 | `tsc --noEmit --project tsconfig.json` and `tsc --noEmit -p configs/src/tsconfig.core.json` both silent
- `npm run build` | 0 | 22 modules transformed; `dist/src/core/index.cjs` 138.41 kB; `index.d.ts` copied to `index.d.cts`
- `npm test` | 0 | `src:core` 18 files / 618 tests; `policy` 1 / 111; `config` 1 / 46; `setup` 1 / 44; `guides` 1 / 91

### Breaking

Report entries: agent-obj-10 constructor `(on?, error?)` → `(options?: ScopeManagerOptions)`; agent-subj-14 `InstructionInterface.format` / `InstructionInput.format` → `override`; agent-subj-1 batch `remove` return change.

Word-boundary old-name sweep across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/agent`, vendored `guides/agent.md` mirrors:

- `InstructionInput.format`: no hit in toolbox/src, ollama/src, scaffold/src (the one hit is inside excluded agent: `InstructionManager.ts:31`).
- `QueueExecution` (report addendum, not a numbered row): agent `src`/`tests` empty; hits only vendored `guides/queue.md` mirrors (workflow/worker/probe/agent guides).
- `new ScopeManager(` two-arg / `constructor(on?:`: no hit outside agent; inside agent only options-object / no-arg forms (`factories.ts:322`, `ScopeManager.ts:34`, `ScopeManager.test.ts`).

### Writing sweep

Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` on diff `+` lines in `guides/**`, `README.md`, src doc comments, test titles/comments:

- `just`: no `+` hit (`guides/agent.md` replaced "just the conversation" with "only the conversation"; ThinkSplitter deleted "is just thinking").
- `currently` / `should` / `simply` / `easy` / `easier` / `latest` / `utilize` / `leverage` / `via` / `in order to` / `e.g.` / `i.e.` / `etc.` / `please` / `sanity` / `dummy` / `ensure` / `guarantee`: no `+` hit (substitutions used `for example` / `through`).
- `now`: `conform-agent.diff:500` (guide clause 24 long `+` line; grep matched `\bnow\b` inside that line); `conform-agent.diff:950` `+		// REBUILD the working array from the (now smaller) compacted view through the SAME projection the` (`Agent.ts`).
- `new`: `conform-agent.diff:245` `a new array`; `:496` `no new engine` / `the ONLY new logic`; `:599` `mints a new system \`id\``; constructor `+` lines `new AgentError` (`:1130`), `new ScopeManager` (`:1604`, `:4943`, `:4952`, `:4963`), `new ScriptedProvider` (`:3144`), `new ConversationManager` (`:3033`), `new Error` (`:3280`, `:3654`, `:4343`, `:4966`), `new ToolManager` (`:3350`), `new AgentContext` (`:3368`, `:3389`, `:3433`, `:3460`), `new InstructionManager` (`:3431–3432`, `:3458–3459`).

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on those `+` lines: no hit.

# Distillate

- agent-obj-1: site now `AgentRegistry.ts:137` throw + `errors.ts:182` union | diff present yes | old form hits 1 (`AgentRegistry.test.ts:21`) | report matches no (`:130` is not the import)
- agent-obj-2: site now `Agent.ts:111/#settled` + `:157` getter | diff present yes | old form hits 0 | report matches yes
- agent-obj-3: site now `guides.test.ts:180` flagship | diff present yes | old form hits 0 (no rename) | report matches yes
- agent-obj-4: site now `validators.ts:35` + `validators.test.ts` exists | diff present yes | old form hits 0 (`§14` title gone) | report matches yes
- agent-obj-5: site now `setup.ts:171` class / `:137` `chunkWholeDelta` | diff present yes | old form hits 0 at the four named nested sites | report matches yes
- agent-obj-6: site now `setup.ts:119` `export function turnParts` | diff present yes | old form hits 0 | report matches no (cited `:110`, now `:119`)
- agent-obj-7: site now `Agent.test.ts:718` `createSeededToolManager` | diff present yes | old form hits 0 | report matches yes (line numbers drifted)
- agent-obj-8: site now `Agent.ts:688` `errorToMessage` | diff present yes | old form hits 0 | report matches yes
- agent-obj-9: site now `errors.ts:21,76` still `as const` | diff present no (repair text absent) | old form hits 2 (those fields) | report matches yes (`stopped`)
- agent-obj-10: site now `ScopeManager.ts:46` options constructor | diff present yes | old form hits 0 | report matches yes
- agent-subj-1: site now four `let removed = true` branches | diff present yes | old form hits 1 (`ConversationManager.test.ts:113`) | report matches no (title still "any was removed")
- agent-subj-3: site now `factories.ts:272–282` no `messages` / no four | diff present yes | old form hits 0 | report matches yes
- agent-subj-4: site now `types.ts:1274–1276` present-only | diff present yes | old form hits 0 on named phrases | report matches yes
- agent-subj-5: site now `guides/agent.md:1139` + README `:3,:105` | diff present yes | old form hits 0 (`§` owned paths) | report matches yes
- agent-subj-6: site now `Agent.ts:376` named guard | diff present yes | old form hits 0 | report matches yes
- agent-subj-7: site now Factories/Helpers/`is*` noun phrases | diff present yes | old form hits 0 | report matches yes
- agent-subj-12: site now `types.ts:137` `for example` | diff present yes | old form hits 1 in bound (`guides/agent.md:81`) | report matches yes
- agent-subj-13: site now `errors.ts:121` no `§F2` | diff present yes | old form hits 2 (`v1` fixture strings) | report matches yes
- agent-subj-14: site now `types.ts:283` `override` | diff present yes (types/helpers/Instruction) | old form hits 1 (`InstructionManager.ts:31` `InstructionInput.format`) | report matches no (sweep claimed empty)
- fleet-F1: site now helper absent | diff present n/a | old form hits 0 | report matches yes (`noop`)
- fleet-F2: site now `Agent.ts:83,#id` + `:145` getter | diff present yes | old form hits 0 on Agent public field | report matches yes

Scope tags: every status path `owned`; none `shared`/`off-limits`.

Residue: no `+` `.skip`/`.only`/`.todo`/`TODO`/`FIXME`/`console.`/`debugger`; `timeout`/`retry` hits are domain API (listed under Evidence). Tree `tests/src` has no skip/only/todo.

Writing: `+` `now` at diff `:500`, `:950`; `+` `new` on `new Class(` / "new array" / "new engine" / "new logic" / "new system id"; count-over-growable-set pattern no `+` hit.

Parity: Methods tables match listed call-signature names; `Instruction` Entities row omits `override` (Types row has it); `AgentRegistry` Methods `:717–720` still "THROWS `unknown …`" without `AgentError`; barrel is `export *` (`src/core/index.ts:1–20`).

# Unknowns

- First `+` line of every Conversation/helpers/Scope/test hunk not fully quoted (files listed; several first `+` lines unread).
- Inflection sweeps (`-s/-ed/-ing`) for every English phrase a repair deletes, beyond the distinctive tokens named above.
- Full `\bnow\b` / `\bnew\b` inventory inside truncated long `+` guide lines (`conform-agent.diff:500`, `:599`).
- Independent gate processes were not run (read-only); Gates block is the report's table only.
- `InstructionInput.format` in vendored `toolbox/guides/agent.md` / `ollama/guides/agent.md` (excluded as mirrors).
- Exact `types.ts` line of the "for CONCURRENT threads use separate agents." cut (present in `guides/agent.md:782`; types hunk was not re-read to a line).

# Journal

# Deviation

No tree change from this lane (read-only; no write, no mutating command). Every named input file opened. Sweeps used Grep over `/home/user/fleet/agent/src`, `tests`, `guides/agent.md`, `guides/README.md`, `README.md`, the evidence diff/status, and `/home/user/work/evidence/agent-proofs/`. `tests/distribution.test.ts:684` `context.skip` excluded per brief. Long `+` lines in `conform-agent.diff` were truncated by the grep tool, so writing/residue quotes for those lines are incomplete.