I'll read the brief and the repository's agent contracts first, then follow the brief exactly in read-only mode.The brief is a read-only distillate. Next I’ll load the unit brief, audit claims, report, and evidence, then map each row against the tree.I’ll load the writer’s report, status, and proofs next, then walk each row against the current tree.I’ll map each row’s current `file:line` sites and the matching diff hunks, then run the old-form and residue sweeps.I’ll read the current sites, rule sentences, and proof files next, then run the old-form and residue sweeps.I’ll keep reading the remaining row sites, proofs, and sweeps in parallel.I’ll pull remaining current sites, old-form hits, proofs, residue, and writing sweeps next.I’ll keep pulling current sites, diff hunks, old-form hits, proofs, and the across-unit sweeps.I’ll gather the remaining rule quotes, old-form hits, proofs, residue, parity, and writing sweeps.I’ll run the old-form, residue, writing, and breaking sweeps next, and pull proof summaries plus remaining current sites.I’ll keep collecting remaining site context, old-form hits, residue, writing, parity, and proof summaries.I’ll keep sweeping old names, residue, writing, parity, and the remaining current sites.I’ll pull remaining class-order context, extra-file hunks, old-form hits, and the writing/residue patterns that still need exact lines.Need two Surface rows and the subscription Types line, then I’ll write the named sections only.## Question

For every row of unit conform-mcp, what does the tree at `/home/user/fleet/mcp` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

Law sentences the rows cite (scaffold copies):

- architecture.md:201: `Shared cross-environment logic belongs in the central core/shared layer. Other environments import core; core imports neither browser nor server.`
- architecture.md:292: `Centralize any pattern repeated twice.`
- workspace.md:234: `` `prepublishOnly` | Publishing workspaces only: the gate chain, then isolated proofs ``
- AGENTS.md:107: `npm run format:check → npm run lint:check → npm run check → npm run build → npm test`
- architecture.md:183–186: `1. `#` private fields: context, options, state/result, child managers.` / `2. Constructor: initialize context/options and instantiate child managers.` / `3. Public interface: getters, then methods.` / `4. `#` private methods.`
- tests.md:13–14: `Mirror module/application structure: `tests/{src,app}/[environment]/[domain]/[module].test.ts`.`
- tests.md:83–84: `A test the mirror rule flags is a misplaced test until its placement is checked. Move it to the location its scope names.`
- patterns.md:25: `Group related settings beneath the configured entity noun; every leaf is one word.`
- patterns.md:26: `Never encode grouping through prefixes such as `serverPort` or `databasePath`.`
- documentation.md:47: `Each implementing class exposes exactly its interface methods—no missing or extra public behavior.`
- documentation.md:45: `The table's methods exactly match the interface's call-signature members.`
- names.md:105: `` `supports*` is a capability predicate and narrows no type. ``
- names.md:172: `` `is*`: total `Guard<T>`; never throws; returns false off-shape. ``
- documentation.md:37: `Falsify a prose claim the way you falsify a code claim.`
- typescript.md:75–76: `The first sentence states what the symbol does in the third person with an `-s` verb — `Creates`, `Returns`, `Checks whether` — and never repeats the symbol's name.`
- patterns.md:43: `Managers expose one item and all items through singular/plural domain nouns:`
- names.md:112: `Describe what a thing is, not its implementation.`
- names.md:114: `Properties are nouns; methods are verbs.`
- AGENTS.md:60: `One concept, one term. Do not alternate synonyms. Lifecycle verbs have fixed meanings.`
- writing.md:90: `` `should` | `must`, `can`, `might`, or the imperative ``

### mcp-obj-1

**Site now.** Brief `src/browser/constants.ts:32` / `src/server/constants.ts:41` no longer hold the declaration. `src/browser/constants.ts` ends at the identity defaults:

```15:16:src/browser/constants.ts
export const DEFAULT_MCP_SERVER_VERSION = '1.0.0'
```

`src/server/constants.ts:32–42` is now `DEFAULT_MCP_SESSION_CAPACITY`, not the subprotocol. Symbol is at `src/core/constants.ts:175` (brief's 32/41 → 175):

```174:176:src/core/constants.ts
 */
export const MCP_WEBSOCKET_SUBPROTOCOL = 'mcp'
```

Importers now: `src/browser/transports/WebSocketClientTransport.ts:8`, `src/server/transports/WebSocketClientTransport.ts:14`, `src/server/factories.ts:21–27` (`MCP_WEBSOCKET_SUBPROTOCOL` on the `@src/core` import; `./constants.js` is `DEFAULT_MCP_PATH` only at :30). Links: `src/browser/types.ts:30`, `src/server/types.ts:317` (brief 316 → 317). Tests: `tests/fixtures/browserServer.ts:13`, `tests/src/browser/factories.test.ts:20`. Guide core Constants: `guides/mcp.md:2189`. Server Constants table emptied to italic pointer `guides/mcp.md:2825–2827`. Browser Types still names the token `guides/mcp.md:3155`.

**Diff at the site.** `src/browser/constants.ts` `@@ -1,6 +1,6 @@` and `@@ -13,20 +13,3 @@` — `-export const MCP_WEBSOCKET_SUBPROTOCOL = 'mcp'`. `src/server/constants.ts` `@@ -1,9 +1,10 @@`, `@@ -27,19 +28,6 @@` — same `-export const MCP_WEBSOCKET_SUBPROTOCOL = 'mcp'`. `src/core/constants.ts` `@@ -1,8 +1,9 @@`, `@@ -152,6 +153,27 @@` — `+export const MCP_WEBSOCKET_SUBPROTOCOL = 'mcp'` present verbatim. Repair import text present: `+import { deliverMessage, MCP_WEBSOCKET_SUBPROTOCOL } from '@src/core'` in both WebSocket client transports; factories `+	MCP_WEBSOCKET_SUBPROTOCOL,` on the `@src/core` import. Link repair present: `+ *   {@link import('@orkestrel/mcp').MCP_WEBSOCKET_SUBPROTOCOL} (`'mcp'`)**, which`.

**Old form sweep.** Paths: `src`, `tests`, `guides/mcp.md`, `guides/README.md`, `README.md`. Pattern `peer environment faces share no import`: no hit. Pattern `import('./constants.js').MCP_WEBSOCKET_SUBPROTOCOL`: no hit. Word-boundary `MCP_WEBSOCKET_SUBPROTOCOL` (moved, not deleted): hits at `src/core/constants.ts:175`; `guides/mcp.md:2189,2825,3108,3155`; `src/server/types.ts:317`; `src/browser/types.ts:30`; `src/server/factories.ts:26,295,314`; `src/server/transports/WebSocketClientTransport.ts:14,170`; `src/browser/transports/WebSocketClientTransport.ts:8,80,87`; `tests/src/browser/factories.test.ts:20,65,86,97,148,513`; `tests/fixtures/browserServer.ts:13,173`. Inflections `-s/-ed/-ing` of that identifier: no extra hits. Face files `src/browser/constants.ts` and `src/server/constants.ts`: no `MCP_WEBSOCKET_SUBPROTOCOL`.

**Report reading.** Table: `applied`. Sentence: `` `MCP_WEBSOCKET_SUBPROTOCOL` moved to `src/core/constants.ts`; both face copies deleted; every importer, doc link, test, fixture, and guide row retargeted ``. Cited `src/core/constants.ts` now has the export at :175. Cited `src/browser/types.ts:30` now carries `{@link import('@orkestrel/mcp').MCP_WEBSOCKET_SUBPROTOCOL}`. Cited `src/server/types.ts:316` is now :317, same link text.

**Proof reading.** Behavioural (declaration move). Report: red `npm run check` exit 2, 2 errors `Module '"@src/core"' has no exported member 'MCP_WEBSOCKET_SUBPROTOCOL'` (`mcp-obj-1-control-red.txt`); green `npm run check` exit 0 (`mcp-obj-1-green-check.txt`); `test:guides` 159 passed; `test:src:browser` 60 passed; `test:src:server` 370 passed, 1 skipped. File `/home/user/work/evidence/mcp-proofs/mcp-obj-1-control-red.txt` exists: `tests/fixtures/browserServer.ts(13,2): error TS2305: Module '"@src/core"' has no exported member 'MCP_WEBSOCKET_SUBPROTOCOL'.` and `tests/src/browser/factories.test.ts(20,2):` same. `mcp-obj-1-green-check.txt` exists: tsc chain, no error lines. `mcp-obj-1-green-guides.txt`: `Tests  159 passed (159)`. `mcp-obj-1-green-browser.txt`: `Tests  60 passed (60)`. `mcp-obj-1-green-server.txt`: `Tests  370 passed | 1 skipped (371)`.

### mcp-obj-2

**Site now.** Brief `package.json:93` still :93:

```92:94:package.json
		"prepack": "npm run build",
		"prepublishOnly": "npm run format:check && npm run lint:check && npm run check && npm run build && npm test && npm run test:distribution -- --mode release",
		"test:bench": "vitest bench --config vite.config.ts --no-cache --project probe",
```

**Diff at the site.** `package.json` `@@ -90,7 +90,7 @@`. Repair text present verbatim: `+"prepublishOnly": "npm run format:check && npm run lint:check && npm run check && npm run build && npm test && npm run test:distribution -- --mode release",`

**Old form sweep.** Removed order `build && npm run check` inside `prepublishOnly`. Pattern `npm run build && npm run check` in `package.json`: no hit. Current value has `check && npm run build`.

**Report reading.** `applied`. `` `prepublishOnly` now runs `check` before `build` ``. Cited `package.json:93` now carries that order.

**Proof reading.** Report: manifest ordering, no behavioural redden; `tests/config.test.ts:494` reads `prepublishOnly` for the distribution script alone. Placement/documentation: the `package.json` one-line diff is the recorded evidence. Sweep of inverted order: no hit (agrees).

### mcp-obj-3

**Site now.** Brief `src/core/MCPServer.ts:231` (`#dispatch`) is now `async handle` at :225; `#dispatch` is at :261 (brief 231 → 261). Order now: fields :158–162, constructor :164, getters :186–200, `dispatch` :202–223, `handle` :225–253, `#dispatch` :261–304, `#register` :324.

```223:225:src/core/MCPServer.ts
	}

	async handle(
```

```259:261:src/core/MCPServer.ts
	// per producer.
	async #dispatch(
```

```322:324:src/core/MCPServer.ts
	// rather than an unused `_options` the seam does not require.
	#register(): void {
```

**Diff at the site.** `src/core/MCPServer.ts` `@@ -222,6 +222,36 @@` (`+async handle(`) and `@@ -273,36 +303,6 @@` (removes `#dispatch` from between `dispatch` and `handle`). Operative move text is the `handle` / `#dispatch` blocks relocated; no signature change in the `+` lines of those two hunks. Other hunks in this file are rename rows (`MCPCompletionInterface`, `supportsTask`).

**Old form sweep.** No name removed. Pattern of private `#dispatch` between public `dispatch` and `handle`: current file has `handle` then `#dispatch`.

**Report reading.** `applied`. `` `MCPServer.#dispatch` moved after `handle`, before `#register` ``. That order is what :225 / :261 / :324 now show.

**Proof reading.** Report: pure move; green `npm run check` (`mcp-obj-3-4-green-check.txt`); `test:src:core` 907 passed (`mcp-obj-3-4-green-core.txt`). Files exist: `mcp-obj-3-4-green-check.txt` is the tsc chain; `mcp-obj-3-4-green-core.txt`: `Tests  907 passed (907)`. No red control file named for this row.

### mcp-obj-4

**Site now.** Brief `src/core/transports/HTTPClientTransport.ts:156` (`#stamp`) is now `async close` at :157; `#stamp` at :169 (brief 156 → 169). Order: fields :90–111, constructor :113, getters :121–133, `start` :135, `send` :142, `close` :157, `#stamp` :169, `#exchange` :177, `#buildHeaders` :218, `#deliver` :244, `#capture` :269, `#select` :301.

```155:157:src/core/transports/HTTPClientTransport.ts
	// already ended releases nothing and emits nothing.
	async close(): Promise<void> {
```

```167:169:src/core/transports/HTTPClientTransport.ts
	// a cursorless listing starts the next lineage, and a continuation joins whichever one was
	#stamp(message: JSONRPCMessage): void {
```

**Diff at the site.** `@@ -150,6 +150,19 @@` (`+async close(): Promise<void> {`) and `@@ -195,19 +208,6 @@` (removes `close` from after `#exchange`). Repair move present as relocated `close` block.

**Old form sweep.** No name removed.

**Report reading.** `applied`. `` `HTTPClientTransport.#stamp` and `#exchange` moved after `close`, before `#buildHeaders` ``. Matches :157 / :169 / :177 / :218.

**Proof reading.** Same green pair as mcp-obj-3: `mcp-obj-3-4-green-check.txt`, `mcp-obj-3-4-green-core.txt` `Tests  907 passed (907)`. No red control named for this row.

### mcp-obj-5

**Site now.** Brief `src/browser/transports/MessagePortTransport.ts:68` still the class:

```67:69:src/browser/transports/MessagePortTransport.ts
 */
export class MessagePortTransport implements MCPTransportInterface {
```

Missing test now exists: `tests/src/browser/transports/MessagePortTransport.test.ts`. Factory round-trips remain `tests/src/browser/factories.test.ts:459` describe `createMessagePortTransport`. New file drives `new MessagePortTransport({ port: port1 })` at :17, :28, :38, :51, :63, :77, :90. Seven `it(` titles: non-string payload :15, string delivered :26, `close()` closes port :36, close detaches :49, fires closed once :61, listen/closed replace :75, `messageerror` :88.

**Diff at the site.** New file `@@ -0,0 +1,109 @@` first `+import { describe, expect, it, vi } from 'vitest'`. `tests/src/browser/factories.test.ts` `@@ -496,101 +491,6 @@` deletes the class-behaviour block. Repair `new MessagePortTransport({ port })` present: `+		const transport = new MessagePortTransport({ port: port1 })`. Import `+import { MessagePortTransport } from '@src/browser'`.

**Old form sweep.** No symbol renamed. Class cases under factories: `tests/src/browser/factories.test.ts` still uses `createMessagePortTransport` at :27, :459–543 (factory composition), not `new MessagePortTransport`.

**Report reading.** `applied`. `` `tests/src/browser/transports/MessagePortTransport.test.ts` created; the seven class-behaviour cases moved into it and driven through the class directly ``. File exists; seven `it(` blocks; `new MessagePortTransport({ port })` used.

**Proof reading.** Command `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/transports/MessagePortTransport.test.ts`. Red: exit 1, 4 failed / 3 passed of 7 (`mcp-obj-5-control-red.txt`). Green: 7 passed (`mcp-obj-5-green.txt`). Files exist: red `Tests  4 failed | 3 passed (7)` with FAIL lines for non-string payload, both `close` cases, fire-once. Green `Tests  7 passed (7)`.

### mcp-subj-1

**Site now.** Brief `src/server/types.ts:205–213` is now :206–210 (208 `capacity` → 209 `session`):

```206:210:src/server/types.ts
export interface MCPSessionMiddlewareOptions {
	readonly path?: string
	readonly ttl?: number
	readonly session?: MCPSessionOptions
	readonly clock?: () => number
```

Remarks `session` bullet :189–193. Sentence `construct an MCPSession directly to set it`: no hit. `src/server/middlewares.ts` brief :95 → :97 `const sessionOptions = options?.session ?? {}`. Brief :179–182 → :184–187 `new MCPSession(crypto.randomUUID(), { ...sessionOptions, clock: sessionOptions.clock ?? clock })`. `@param` :72–77 names `session`. Guide `guides/mcp.md:2734` `{ path?; ttl?; session?; clock?; origin?; keepalive? }`. `tests/src/server/middlewares.test.ts:113` forwards `session: options.session`; :631 `session: { capacity: 2 }`.

**Diff at the site.** `src/server/types.ts` `@@ -205,7 +206,7 @@` `+	readonly session?: MCPSessionOptions`. `@@ -183,13 +186,11 @@` replaces the `capacity` bullet with the `session` bullet; `- construct an {@link MCPSession} directly to set it.` `src/server/middlewares.ts` `@@ -92,7 +94,7 @@` `+	const sessionOptions = options?.session ?? {}`. `@@ -176,10 +178,13 @@` mint with spread and clock. Repair `const sessionOptions = options?.session ?? {}` present verbatim. `new MCPSession(crypto.randomUUID(), sessionOptions)` as written by the finder is not the `+` form; the `+` form is `{ ...sessionOptions, clock: sessionOptions.clock ?? clock }` (subj-2 forwarding).

**Old form sweep.** Phrase `construct an MCPSession directly`: no hit. Top-level middleware `readonly capacity?: number`: remaining `src/server/types.ts:172` (`MCPSessionOptions`) and `src/core/types.ts:1626` (`MCPListenOptions`). Inflections of `capacity`: still present as the session-log leaf and unrelated queue/domain uses (report's fix-round ruling lists those sites).

**Report reading.** `applied`. `` `MCPSessionMiddlewareOptions.capacity` replaced by `session?: MCPSessionOptions`; the middleware forwards the whole group ``. :209 and :97 / :184–187 carry that. Fix-round cites `tests/src/server/middlewares.test.ts:629–652` — current :629–631 is `forwards the session capacity to each session it mints` with `session: { capacity: 2 }`.

**Proof reading.** Report (fix round): command `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/middlewares.test.ts`; red exit 1, 1 failed / 34 passed of 35 (`mcp-subj-1-control-red.txt`); green 35 passed (`mcp-subj-1-green.txt`). Files exist: red `FAIL ... forwards the session capacity to each session it mints`; `Tests  1 failed | 34 passed (35)`. Green `Tests  35 passed (35)`. Also `mcp-subj-1-2-control-red.txt`: 15× `Expected 1 arguments, but got 2` on `tests/src/server/MCPSession.test.ts`.

### mcp-subj-2

**Site now.** Brief `src/server/MCPSession.ts:87` / `:96` (`now` params) now `push` :90 / `replay` :99 (87→90, 96→99):

```89:91:src/server/MCPSession.ts
	push(message: JSONRPCMessage): string {
		// Append to the log first (assigning the monotone event id), then fan the SAME id out to
```

```98:100:src/server/MCPSession.ts
	replay(afterId: string): readonly MCPSessionEvent[] {
		this.#evict(this.#clock())
```

`#clock` field :68, init :75 `options?.clock ?? Date.now`. `#append` :118 `const now = this.#clock()`. Interface `src/server/types.ts:241–242` `push(message: JSONRPCMessage): string` / `replay(afterId: string): readonly MCPSessionEvent[]` (brief 240–241 → 241–242). Options `readonly clock?: () => number` :174. Guide methods `guides/mcp.md:3679–3682` `attach`/`detach`/`push`/`replay`, no `now`. Class TSDoc :49–52 names `MCPSessionOptions.clock`. Host-clock case `tests/src/server/MCPSession.test.ts:215–224`.

**Diff at the site.** `src/server/MCPSession.ts` `@@ -64,12 +65,14 @@` (`+#clock`, `Date.now`), `@@ -84,17 +87,17 @@` (signatures without `now`), `@@ -109,7 +112,10 @@` (`this.#clock()`). `src/server/types.ts` `@@ -169,6 +171,7 @@` `+	readonly clock?: () => number`. Repair `push(message: JSONRPCMessage): string` and `replay(afterId: string): readonly MCPSessionEvent[]` present. `readonly clock?: () => number` present. Forwarding `clock: sessionOptions.clock ?? clock` present in middlewares `+` lines.

**Old form sweep.** `push(message: JSONRPCMessage, now` / `replay(afterId: string, now` / `now = Date.now()`: no hit. Phrase `construct an MCPSession directly`: no hit.

**Report reading.** `applied`. `` `MCPSessionOptions.clock` added; `push`/`replay` lost their `now` parameter; the middleware's clock reaches the minted session's log sweep ``. Matches :174 / :90 / :99 / :184–187. Cited `tests/src/server/MCPSession.test.ts:215–224` is the async host-clock case with `waitForDelay(5)`.

**Proof reading.** Same middlewares command. Red `mcp-subj-2-control-red.txt`: `FAIL ... forwards its own clock to the session it mints, so the replay log sweeps on that clock`; `Tests  1 failed | 33 passed (34)`. Green `mcp-subj-2-green.txt`: `Tests  35 passed (35)`. Files exist.

### mcp-subj-4

**Site now.** Brief `src/core/helpers.ts:101` / `:203` still those lines, new names:

```100:102:src/core/helpers.ts
 */
export function supportsFormElicitation(value: unknown): boolean {
```

```202:204:src/core/helpers.ts
 */
export function supportsTask(value: unknown): boolean {
```

Call :169 `supportsFormElicitation`; `{@link supportsFormElicitation}` :125. `src/core/MCPServer.ts:89,859,1478` `supportsTask`. Tests: `tests/src/core/helpers.test.ts:72–73,119–120,151–178,181–204`. Guide: `guides/mcp.md:1368,1406–1407,1632,1659,2248,2265`. `tests/src/core/validators.test.ts:800` comment uses the new spelling.

**Diff at the site.** `src/core/helpers.ts` `@@ -94,11 +94,11 @@`, `@@ -122,7 +122,7 @@`, `@@ -166,7 +166,7 @@`, `@@ -195,12 +195,12 @@`. `+export function supportsFormElicitation(value: unknown): boolean {` and `+export function supportsTask(value: unknown): boolean {` present verbatim.

**Old form sweep.** Word-boundary `isFormElicitationSupported|isTaskSupported`: no hit in `src`, `tests`, `guides/mcp.md`, `guides/README.md`, `README.md`. Case-insensitive inflections `isFormElicitationSupport(s|ed|ing)?` / `isTaskSupport(s|ed|ing)?` / `FormElicitationSupport` / `TaskSupport`: no hit. Combined pattern in report: empty in-tree.

**Report reading.** `applied`. `` `isFormElicitationSupported` → `supportsFormElicitation`, `isTaskSupported` → `supportsTask` ``. Main body still says renamed in `tests/src/core/validators.test.ts`; fix-round says `PUBLISHED_PREDICATES` at `tests/src/core/helpers.test.ts:118–121` and cases :149–204. Tree matches the fix-round lines, not the earlier validators placement.

**Proof reading.** Naming row; report also records `npm run test:src:core` red 1 failed / 906 passed (`covers every guard the barrel publishes`), green 909. `mcp-subj-4-control-red.txt`: `FAIL ... covers every guard the barrel publishes`; `Tests  1 failed | 906 passed (907)`. `mcp-subj-4-green-core.txt`: `Tests  909 passed (909)`. Field-3 sweep empty agrees with report's empty old-name sweep. Fix-round `fix1-helpers-green.txt`: `Tests  183 passed (183)`; `fix1-validators-green.txt`: `Tests  164 passed (164)`.

### mcp-subj-5

**Site now.** Brief `guides/mcp.md:1913–1914` still those lines:

```1912:1914:guides/mcp.md
await client.connect()
const outcome = await client.call('add', { x: 2, y: 5 })
// outcome → { resultType: 'complete', value: 7 }
```

`guides/mcp.md:3487` `const outcome = await client.call('add', { x: 2, y: 5 })`. `README.md:60` same binding. `src/core/factories.ts:106` `const outcome = await client.call('search', { query: 'mcp' })`. Transcription `tests/guides.test.ts:1485–1488` asserts `{ resultType: 'complete', value: 7 }`.

**Diff at the site.** `guides/mcp.md` `@@ -1910,8 +1910,8 @@` `+const outcome = await client.call('add', { x: 2, y: 5 })` and `+// outcome → { resultType: 'complete', value: 7 }` present verbatim. README `@@ -57,7 +57,7 @@` `+const outcome = await client.call('add', { x: 2, y: 5 })`. factories `@@ -103,7 +103,7 @@` `+ * const outcome = await client.call('search', { query: 'mcp' })`.

**Old form sweep.** `value → 7`: no hit. `const value = await client.call('add', { x: 2, y: 5 })`: no hit. Remaining `const value = await client.call('add', {})` at `tests/src/server/middlewares.test.ts:933`, `tests/src/browser/factories.test.ts:75,287,475`, `tests/src/server/factories.test.ts:582` (different argument object, no `// value → 7`).

**Report reading.** `applied`. `` The loopback fence binds `outcome` and states the real outcome shape; the fence is transcribed and executed in `tests/guides.test.ts` ``. :1913–1914 and :1487 carry that. Cited `README.md:60` is `const outcome = await client.call('add', { x: 2, y: 5 })`.

**Proof reading.** Report: `expect(await readGuideBoundCall()).toEqual(7)` red; `npm run test:guides` 1 failed / 159 of 160; green 160. `mcp-subj-5-control-red.txt`: `FAIL ... resolves the outcome the fence documents over the bound loopback pair`; `Tests  1 failed | 159 passed (160)`. `mcp-subj-5-green.txt`: `Tests  160 passed (160)`. Files exist.

### mcp-subj-6

**Site now.** Brief `src/core/types.ts:850` still :850:

```849:851:src/core/types.ts
/** Executes one canonical tool call or returns a fully formed complete MCP result. */
export type MCPExecutionHandler = (
```

`:1066` still the `start` first sentence:

```1065:1067:src/core/types.ts
	/**
	 * Creates — or returns the existing — durable task for one stable operation key.
	 *
```

Guide Behavior `guides/mcp.md:3397` still `Create — or return the existing —` (row said leave it).

**Diff at the site.** `@@ -847,7 +847,7 @@` `+/** Executes one canonical tool call or returns a fully formed complete MCP result. */` verbatim. `@@ -1063,7 +1063,7 @@` `+	 * Creates — or returns the existing — durable task for one stable operation key.` verbatim.

**Old form sweep.** `or return a fully formed`: no hit. `or return the existing`: hit `guides/mcp.md:3397` (imperative Behavior cell, left per row). Inflections of the bare `return` verb in those two first sentences: only the guide cell.

**Report reading.** `applied`. `` Both first sentences read in the third person throughout ``. :850 and :1066 carry `returns`. Guide :3397 left imperative, as the report says.

**Proof reading.** Documentation. Sweep of old bare-verb first sentences: empty in `src/core/types.ts`; remaining hit only the left-alone guide cell. Agrees with the row's "leave the guide Behavior cell".

### mcp-subj-7

**Site now.** Brief `src/core/types.ts:1462–1474` now `MCPCompletionInterface` at :1465 (1462→1465). Collision sentence :1462–1463. Member `complete` :1473. `MCPServerOptions.completion` :2089. Guide heading `guides/mcp.md:3433`; Types `guides/mcp.md:2394`; Methods `guides/mcp.md:3440` `complete`. Fixture `tests/src/core/MCPServer.test.ts:218` `class MemoryCompletion implements MCPCompletionInterface`. `src/core/factories.ts:24` `{@link import('./types.js').MCPCompletionInterface}`. `tests/setupConformance.ts:17,1533`.

**Diff at the site.** `@@ -1458,8 +1458,11 @@` `+export interface MCPCompletionInterface {` and the PORT sentence. `@@ -2083,7 +2086,7 @@` `+	readonly completion?: MCPCompletionInterface`. Repair name present verbatim.

**Old form sweep.** `MCPCompletionManagerInterface`: no hit in `src`, `tests`, `guides/mcp.md`, `guides/README.md`, `README.md`. `MemoryCompletionManager`: no hit. Inflections `MCPCompletionManagerInterface(s|ed|ing)?`: no hit.

**Report reading.** `applied`. `` `MCPCompletionManagerInterface` → `MCPCompletionInterface`, with the disambiguating TSDoc sentence the row required ``. :1462–1465 carry that. `` `MCPServerOptions`' prose at `src/core/types.ts:2057-2058` names no type, so it needed no edit `` — not re-read here as a changed site. Old-name sweep empty: agrees.

**Proof reading.** Naming. Combined red `mcp-subj-7-8-control-red.txt` (listen option errors plus `MCPServer.ts` `context` redeclare). Green `mcp-subj-7-8-green-check.txt` tsc chain; `mcp-subj-7-8-green-core.txt` `Tests  909 passed (909)`. Field-3 sweep empty agrees.

### mcp-subj-8

**Site now.** Brief `src/core/types.ts:1189` still `readonly deferral: MCPTaskHandler`. Brief `:1700` (`listen`) now `:1703` `readonly producer: MCPSubscriptionHandler`. Transport method `readonly listen` remains `src/core/types.ts:2347`. Guide Types `guides/mcp.md:2432` `{ tasks; deferral }`; `guides/mcp.md:2453` `{ notifications; producer }`. `src/core/MCPServer.ts:841` `configured.deferral(deferred, options)`.

**Diff at the site.** `@@ -1186,7 +1186,7 @@` `+	readonly deferral: MCPTaskHandler` verbatim. `@@ -1697,7 +1700,7 @@` `+	readonly producer: MCPSubscriptionHandler` verbatim.

**Old form sweep.** Option-key `defer?:` / `defer:`: no hit. Option-key `listen?:` / `listen:`: `src/core/types.ts:2347` `readonly listen: (handler: (message: string) => void) => void`; `tests/src/core/MCPServer.test.ts:3220` `const listen: JSONRPCRequest`. Report's inflection pattern `\bdefer\??:|\blisten\??:`: those two hits, no old option keys.

**Report reading.** `applied`. `` `MCPTaskOptions.defer` → `deferral`, `MCPSubscriptionOptions.listen` → `producer` ``. :1189 / :1703 carry that. Report remaining-listen reading names `src/core/types.ts:2347` and `tests/src/core/MCPServer.test.ts:3220` — both still those lines.

**Proof reading.** Naming. Same 7–8 proof files as subj-7. Red file lists 15 `'listen' does not exist in type 'MCPSubscriptionOptions'` sites. Sweep agrees with report's two remaining `listen:` hits.

### mcp-subj-9

**Site now.** Brief `tests/setupConformance.ts:746`:

```745:747:tests/setupConformance.ts
 * A plain `execute` return is an ordinary domain value, and the server normalizes one
 * into text plus `structuredContent` exactly as its contract states — so a fixture with no
 * `execution` port cannot answer an image, an audio clip, an embedded resource, or a
```

`src/core/helpers.ts:1619` `to know what the request must carry`. Fix-round sites now: `tests/setup.ts:1217` `must ask again`; `tests/src/core/MCPServer.test.ts:5239` `the paragraph must be deleted`.

**Diff at the site.** `tests/setupConformance.ts` `@@ -743,7 +743,7 @@` replacement `exactly as its contract states` present. `src/core/helpers.ts` `@@ -1616,7 +1616,7 @@` `+ * to know what the request must carry. Each parameter's value is read at its exact`.

**Old form sweep.** `exactly as it should`: no hit. `should have carried`: no hit. Case-insensitive `should` in `src`/`tests` (owned): RFC 2119 / payload hits remain (report table); banned-sense sites the first report named at `tests/setup.ts:1217` and `tests/src/core/MCPServer.test.ts:5239` now read `must`.

**Report reading.** `applied`. `` Both banned-sense `should` occurrences the row names are gone ``. :746 and helpers :1619 match. Fix-round says setup.ts:1217–1218 `must` / omits `simply`, and MCPServer.test.ts:5239 `must` — those lines now so read.

**Proof reading.** Documentation. Report's `should` table vs current tree: the two outside-row banned hits it listed are now `must` (fix round). Field-3 empty for the two replaced phrases. `fix1-MCPServer-green.txt`: `Tests  222 passed (222)`.

### fleet-F1

**Site now.** Pattern `isBrowserVuePath`: no hit in `/home/user/fleet/mcp`. `src/browser/` exists (9 files including `tests/src/browser/...` and `src/browser/index.ts`). `tests/setupBrowser.ts` exists. `tests/setup.ts:1–3` header names core/server/guides and `tests/setupServer.ts`, many exports (e.g. `probeOwnership` at the :795 hunk).

**Diff at the site.** `tests/setup.ts` hunks are `listen`→`producer` / `deferral`, not `isBrowserVuePath`. No `isBrowserVuePath` `+`/`-` lines.

**Old form sweep.** `isBrowserVuePath` and inflections: no hit. Paths `tests`, `vite.config.ts` as the report's grep: no hit.

**Report reading.** `noop`. `` `grep -rn "isBrowserVuePath" tests vite.config.ts` returns nothing, so the helper is absent; and the workspace has a browser environment ``. Tree: helper absent; `src/browser/` and `tests/setupBrowser.ts` present.

**Proof reading.** Placement/noop. Sweep agrees: no hit.

### fleet-F2

**Site now.** Implementation classes with `export class` in `src`: `MCPSession` (`src/server/MCPSession.ts:62`) already `readonly #id: string` first field :63 and `get id()` :78. Other classes listed in the report: `WebSocketServerTransport`, both `WebSocketClientTransport`s, `StdioClientTransport`, `StdioServerTransport`, `HTTPDisconnect`, `MessagePortTransport`, `MCPTaskClient`, `HTTPClientTransport`, `MCPProgressReporter`, `MCPMethodManager`, `MCPLegacyClientTransport`, `MCPClient`, `MCPLegacy`, `MCPTextStreamController`, `MCPStreamController`, `MCPServer`, `MCPError`. `readonly id: string` as a data field appears in `types.ts` only (`src/server/types.ts:238,276`, `src/core/types.ts:418`), not as a public field on those classes. `MCPError` (`src/core/errors.ts:24`) extends `Error`; no `readonly id: string` field in the opening of that file.

**Diff at the site.** No class-order `id`/`#id` hunks. `MCPSession.ts` diff adds `#clock`, not `#id`.

**Old form sweep.** Public `readonly id: string` data field ahead of `#` fields on implementation classes: no hit in `src/**/*.ts` class bodies (only interface members in `types.ts`).

**Report reading.** `noop`. `` None declares a public `readonly id: string` data field ahead of its `#` fields. `MCPSession` already holds `readonly #id` first and exposes `get id()`. `` Matches :63 / :78.

**Proof reading.** Placement/noop. Sweep of that shape: no hit. Agrees.

---

### Scope

Status paths (`/home/user/work/evidence/conform-mcp.status`) vs brief § Scope:

| Path | Tag |
| --- | --- |
| `README.md` | owned |
| `guides/mcp.md` | owned |
| `package.json` | owned (`scripts`) |
| `src/browser/constants.ts` | owned |
| `src/browser/transports/WebSocketClientTransport.ts` | owned |
| `src/browser/types.ts` | owned |
| `src/core/MCPServer.ts` | owned |
| `src/core/constants.ts` | owned |
| `src/core/factories.ts` | owned |
| `src/core/helpers.ts` | owned |
| `src/core/transports/HTTPClientTransport.ts` | owned |
| `src/core/types.ts` | owned |
| `src/server/MCPSession.ts` | owned |
| `src/server/constants.ts` | owned |
| `src/server/factories.ts` | owned |
| `src/server/middlewares.ts` | owned |
| `src/server/transports/WebSocketClientTransport.ts` | owned |
| `src/server/types.ts` | owned |
| `tests/fixtures/browserServer.ts` | owned |
| `tests/guides.test.ts` | owned |
| `tests/setup.ts` | owned |
| `tests/setupConformance.ts` | owned |
| `tests/src/browser/factories.test.ts` | owned |
| `tests/src/browser/transports/MessagePortTransport.test.ts` | owned |
| `tests/src/core/MCPLegacy.test.ts` | owned |
| `tests/src/core/MCPServer.test.ts` | owned |
| `tests/src/core/helpers.test.ts` | owned |
| `tests/src/core/validators.test.ts` | owned |
| `tests/src/server/MCPSession.test.ts` | owned |
| `tests/src/server/handlers.test.ts` | owned |
| `tests/src/server/middlewares.test.ts` | owned |

`guides/README.md`: not in status. Off-limits paths: none in status. Shared: none in status.

Hunks whose file no row **Where** names (Repair may name them), `file @@ hunk` + first `+` line:

- `src/browser/transports/WebSocketClientTransport.ts` `@@ -5,10 +5,9 @@` `+import { deliverMessage, MCP_WEBSOCKET_SUBPROTOCOL } from '@src/core'`
- `src/browser/types.ts` `@@ -27,7 +27,7 @@` `+ *   {@link import('@orkestrel/mcp').MCP_WEBSOCKET_SUBPROTOCOL} (`'mcp'`)**, which`
- `src/core/constants.ts` `@@ -1,8 +1,9 @@` `+// MCP protocol revisions, reserved modern `_meta` keys, protocol error codes, and the wire`
- `src/core/constants.ts` `@@ -152,6 +153,27 @@` `+// The WebSocket subprotocol token — one wire value both faces negotiate, so it lives here for`
- `src/server/factories.ts` `@@ -18,11 +18,17 @@` `+import {`
- `src/server/transports/WebSocketClientTransport.ts` `@@ -11,7 +11,7 @@` `+import { deliverMessage, MCP_WEBSOCKET_SUBPROTOCOL } from '@src/core'`
- `tests/fixtures/browserServer.ts` `@@ -10,12 +10,12 @@` `+	MCP_WEBSOCKET_SUBPROTOCOL,`
- `tests/guides.test.ts` `@@ -6,12 +6,17 @@` `+	MCPCallOutcome,`
- `tests/guides.test.ts` `@@ -638,7 +643,7 @@` (addendum `symbol.keyword`; first `+` is the filter line in that hunk)
- `tests/guides.test.ts` `@@ -1423,3 +1428,62 @@` `+/** The in-memory duplex channel the bind fence builds, plus the two members it wires a pair with. */`
- `tests/src/browser/factories.test.ts` `@@ -17,12 +17,12 @@` `+	MCP_WEBSOCKET_SUBPROTOCOL,`
- `tests/src/browser/factories.test.ts` `@@ -456,11 +456,6 @@` no `+` line (deletion)
- `tests/src/browser/factories.test.ts` `@@ -496,101 +491,6 @@` no `+` line (deletion)
- `tests/src/core/MCPLegacy.test.ts` `@@ -355,7 +355,7 @@` `+				task: { tasks, deferral: () => 'legacy-task' },`
- `tests/src/core/MCPServer.test.ts` `@@ -6,7 +6,7 @@` `+	MCPCompletionInterface,` (and further `deferral`/`producer`/`MemoryCompletion` hunks; first `+` of `@@ -215,7 +215,7 @@` is `class MemoryCompletion implements MCPCompletionInterface`)
- `tests/src/core/helpers.test.ts` `@@ -69,15 +69,20 @@` `+	supportsFormElicitation,`
- `tests/src/core/validators.test.ts` `@@ -41,7 +41,6 @@` no `+` line (`-	isFormElicitationSupported,`)
- `tests/src/server/MCPSession.test.ts` `@@ -2,8 +2,8 @@` `+import { createRecorder, waitForDelay } from '@orkestrel/test'`
- `tests/src/server/handlers.test.ts` `@@ -450,7 +450,7 @@` `+				producer: () => subscriptionEvents(),`
- `tests/src/server/middlewares.test.ts` `@@ -1,7 +1,7 @@` `+import type { MCPOriginOptions, MCPSessionOptions, MCPSessionState } from '@src/server'`

`tests/setup.ts` is named in fleet-F1 Where (helper site), even though its hunks are subj-8 keys.

### Residue

Diff `+` lines, pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: no hit.

Tree `src` and `tests`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

`.skip(` / `.only(` / `.todo(`: no hit in the remaining tree (`context.skip` only in excluded `tests/distribution.test.ts:786,910`).

`TODO` / `FIXME` / `debugger` / `console.`: no hit in remaining `src` or `tests` (`TODO`/`debugger` in excluded `tests/setupPolicy.ts`; `console.info` in excluded `tests/config.test.ts:687`).

`retry` / `timeout` (same sweep, remaining tree), `file:line`:

`src/core/constants.ts:317`; `src/core/MCPServer.ts:1003,1028,1084,1085,1087,1094,1153,1173,1193,1235,1252,1288,1337,1345`; `src/core/types.ts:692,703,728,746,1160,1760,2507,2509,2517,2529,2544,2581,2595,2597,2600,2620,2637,2639,2652,2717,2725,2868,2870,2871,2874,2876,2938`; `src/core/factories.ts:92`; `src/core/transports/HTTPClientTransport.ts:94,118,175,194,196`; `src/server/factories.ts:233,234`; `src/core/errors.ts:8`; `src/core/parsers.ts:150`; `src/core/MCPStreamController.ts:31`; `src/core/MCPLegacyClientTransport.ts:58,85,131,139,190,196,268,277`; `src/core/MCPTaskClient.ts:49,53,57,79,86`; `src/core/MCPClient.ts:105,108,110,135,165,242,245,296,297,330,394,428,438,521,541,576,577,578,591,828,836,839,840,982,983,992,1011,1012,1073,1074`; `src/browser/factories.ts:86`; `tests/src/core/validators.test.ts:2305,2311`; `tests/src/core/MCPServer.test.ts:871,1704,1711,1718,1910,1920,1922,1926,1932,1933,1934,1969,1979,4265,4296,4316,4328,4331,4489,4491,4493,4499,4550,4713,4715,4717,4730,4731,4732,4748`; `tests/setup.ts:80,87,92,382,824,853`; `tests/setupConformance.ts:1135,1140,1152,1159,1331,1338`; `tests/guides.test.ts:1089,1090`; `tests/src/server/integration.test.ts:41,183`; `tests/src/core/integration.test.ts:31`; `tests/src/core/MCPStreamController.test.ts:84`; `tests/src/core/MCPTaskClient.test.ts:210`; `tests/src/core/parsers.test.ts:495`; `tests/src/core/MCPLegacyClientTransport.test.ts:322,388,530`; `tests/src/core/MCPClient.test.ts:43,58,64,137,265,679,735,1041,1050,1070,1113,1117,1119,1123,1286,1290,1306,1342,1361,1371,1376,1498,1512,1586,1591,1601,1619,1785,1786,1787,2147,2180,2290,2319,2352,2357,2386,2418,2480,2496,3044,3104,3127,3206,3249,3290,3331,3793,3800`; `tests/src/browser/transports/WebSocketClientTransport.test.ts:139,144`; `tests/integration.test.ts:14`; `tests/setupConformance.test.ts:387,394`; `tests/conformance.test.ts:108,156,157`; `tests/conformanceClient.ts:211,212,229`.

### Parity

Entities the diff touches in `src/**/types.ts` or a class file:

| Entity | Interface call-signature members | Guide `## Methods` / Types / Surface |
| --- | --- | --- |
| `MCPServer` / `MCPServerInterface` | `dispatch` `src/core/types.ts:2258,2268,2283`; `handle` `:2308`; inherited `MCPDispatcherInterface.dispatch/handle` `:2163,:2193`; data `emitter` `:2153`, `limit` `:2155`, `identity` `:2228`, `methods` `:2230` | Methods `guides/mcp.md:3222–3223` `dispatch`, `handle`; Surface `guides/mcp.md:2465` `emitter` / `identity` / `methods` / `limit` |
| `HTTPClientTransport` / `MCPMessageTransportInterface` | `start` `:2438`; `send` `:2467`; `close` `:2488`; data `emitter` `:2405`, `session` `:2407`, `duplex` `:2425` | Methods `guides/mcp.md:3561–3563` `start`, `send`, `close`; Surface `guides/mcp.md:2469` `emitter` / `session` / `duplex`; class Surface `guides/mcp.md:2145` |
| `MCPSession` / `MCPSessionInterface` | `attach` `src/server/types.ts:239`; `detach` `:240`; `push` `:241`; `replay` `:242`; data `id` `:238` | Methods `guides/mcp.md:3679–3682` `attach`, `detach`, `push`, `replay`; Surface `guides/mcp.md:2735` `id` data member |
| `MCPCompletionInterface` | `complete` `src/core/types.ts:1473` | Methods `guides/mcp.md:3440` `complete`; Types `guides/mcp.md:2394` |
| `MCPTaskManagerInterface` | `start` `src/core/types.ts:1092`; `task` `:1107`; `update` `:1128`; `abort` `:1144` | Methods `guides/mcp.md:3397–3400` `start`, `task`, `update`, `abort` (doc-only `+s` on `start`) |
| `MCPTaskOptions` | no call signatures; data `tasks` `:1186`, `deferral` `:1189` | Types `guides/mcp.md:2432` `{ tasks; deferral }` |
| `MCPSubscriptionOptions` | no call signatures; data `notifications` `:1701`, `producer` `:1703` | Types `guides/mcp.md:2453` `{ notifications; producer }` |
| `MCPSessionOptions` | no call signatures; data `capacity` `:172`, `ttl` `:173`, `clock` `:174` | Types `guides/mcp.md:2733` `{ capacity?; ttl?; clock? }` |
| `MCPSessionMiddlewareOptions` | no call signatures; data `path` `:207`, `ttl` `:208`, `session` `:209`, `clock` `:210` | Types `guides/mcp.md:2734` `{ path?; ttl?; session?; clock?; origin?; keepalive? }` |
| `MCPExecutionHandler` | type alias, not call-signature members | Types first-sentence only (`src/core/types.ts:850`) |
| `WebSocketClientTransport` (browser/server class files) | implements `MCPMessageTransportInterface` (import-only diffs) | same Methods `guides/mcp.md:3561–3563` |
| `MessagePortTransport` (Where class; test file in diff) | class methods `send` `:81`, `listen` `:86`, `closed` `:90`, `close` `:94` matching `MCPTransportInterface` `:2344–2351` | Types `guides/mcp.md:2467` `{ send; listen; closed; close }`; class Surface `guides/mcp.md:3137`. No `#### \`MCPTransportInterface\`` Methods table. |

Backticked identifiers in guide `+` sentences (diff `guides/mcp.md`), barrel `src/core/index.ts` `export * from './types.js'` `:1`, `./constants.js` `:2`, `./helpers.js` `:7`:

- `MCPCompletionInterface` — exported via `types.js`
- `supportsFormElicitation`, `supportsTask` — exported via `helpers.js`
- `MCP_WEBSOCKET_SUBPROTOCOL` — exported via `constants.js`
- `MCPTaskOptions`, `MCPTaskContext`, `MCPPromptManagerInterface` — exported via `types.js`
- `deferral`, `producer`, `subscription.producer`, `completion/complete` — option/wire keys, not barrel exports
- `outcome` — local binding, not an export

`src/browser/index.ts:2` `export * from './constants.js'` no longer re-exports the moved constant. `src/server/index.ts:2` same.

### Gates

Report § Gates quoted:

| Gate | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | "All matched files use the correct format." over 126 files |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | no output |
| `npm run build` | 0 | no output |
| `npm test` | 0 | src 32 files / 1341 passed, 1 skipped; policy 111; config 46; setup 5 files / 86; guides 160; conformance 47; integration 4 |

Files: `/home/user/work/evidence/mcp-proofs/gate-1-format-check.txt` through `gate-5-test.txt`.

`gate-1-format-check.txt`: `All matched files use the correct format.` / `Finished in 3421ms on 126 files using 4 threads.` `gate-2-lint-check.txt`: script header then blank. `gate-5-test.txt` Tests lines: `1341 passed | 1 skipped (1342)`; `111 passed`; `46 passed`; `86 passed`; `160 passed`; `47 passed`; `4 passed`.

### Breaking

Report § Breaking: four rows move a published symbol; `@orkestrel/probe` imports none of them; consumer edit `none` for each of `MCP_WEBSOCKET_SUBPROTOCOL` barrel move, predicate renames, `MCPCompletionInterface`, and `defer`/`listen`/`capacity`/`now`.

Word-boundary old-name sweep across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/mcp`, vendored `guides/mcp.md` mirrors:

- `isFormElicitationSupported`: no hit
- `isTaskSupported`: no hit
- `MCPCompletionManagerInterface`: no hit

(`../probe/guides/mcp.md` still carries those three names; that path is a vendored mirror, excluded.)

`MCP_WEBSOCKET_SUBPROTOCOL` in those src/tests trees: no hit outside mcp. `deferral` in other src: `relation/src/core/types.ts:217` (prose "deferral", not the removed option key).

### Writing sweep

Diff `+` lines in `guides/**`, `README.md`, src doc comments, test titles/comments. Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` (case-insensitive). Word-boundary hits (code `new X(` / `const now =` excluded here; `Date.now` matches `\bnow\b`):

- `src/server/MCPSession.ts` (diff `+`): `defaulting to `Date.now``; `defaults to `Date.now``
- `src/server/middlewares.ts` (diff `+`): `defaults to `Date.now`)`
- `src/server/types.ts` (diff `+`): `` `Date.now`. ``
- `tests/src/browser/transports/MessagePortTransport.test.ts:6` comment: `native `new MessageChannel()` (no mocks)`
- `tests/src/server/MCPSession.test.ts` comment: `The default is `Date.now``
- `tests/src/server/middlewares.test.ts` comment (diff `+`): `the log on `Date.now``

Guides/README `+` lines: no word-boundary hit for that list (`newest` / `unknown` are substring-only).

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`:

- `tests/guides.test.ts:1432` `/** The in-memory duplex channel the bind fence builds, plus the two members it wires a pair with. */`

## Distillate

- mcp-obj-1: site now `src/core/constants.ts:175` (brief 32/41 gone) | diff present yes | old form hits 0 for removed comment/path, name kept | report matches yes (server link 316→317)
- mcp-obj-2: site now `package.json:93` | diff present yes | old form hits 0 | report matches yes
- mcp-obj-3: site now `#dispatch` `:261` after `handle` `:225` | diff present yes | old form hits 0 | report matches yes
- mcp-obj-4: site now `#stamp` `:169` after `close` `:157` | diff present yes | old form hits 0 | report matches yes
- mcp-obj-5: site now class `:68` + `MessagePortTransport.test.ts` | diff present yes | old form hits 0 | report matches yes
- mcp-subj-1: site now `session?:` `:209`, `sessionOptions` `:97` | diff present yes | old form hits 0 for removed sentence | report matches yes (line drift 95→97)
- mcp-subj-2: site now `push` `:90` / `replay` `:99`, `#clock` `:68` | diff present yes | old form hits 0 | report matches yes
- mcp-subj-4: site now `supportsFormElicitation` `:101` / `supportsTask` `:203` | diff present yes | old form hits 0 | report matches fix-round helpers.test.ts, not the first validators placement sentence
- mcp-subj-5: site now `guides/mcp.md:1913–1914` | diff present yes | old form hits 0 for the false comment | report matches yes
- mcp-subj-6: site now `:850` / `:1066` | diff present yes | old form hits 1 (`guides/mcp.md:3397`, left) | report matches yes
- mcp-subj-7: site now `MCPCompletionInterface` `:1465` | diff present yes | old form hits 0 | report matches yes
- mcp-subj-8: site now `deferral` `:1189` / `producer` `:1703` | diff present yes | old form hits 2 (`listen:` `:2347`, `:3220`) | report matches yes
- mcp-subj-9: site now `:746` / helpers `:1619` | diff present yes | old form hits 0 for replaced phrases | report matches yes (fix-round `must` at setup.ts:1217 and MCPServer.test.ts:5239)
- fleet-F1: site now helper absent, `src/browser/` present | diff present no (noop) | old form hits 0 | report matches yes
- fleet-F2: site now `#id`+`get id()` on `MCPSession`, no public `id` field on classes | diff present no (noop) | old form hits 0 | report matches yes

Scope tags: every status path owned; no shared; no off-limits; `guides/README.md` untouched.

Residue: diff `+` skip/only/todo/retry/timeout/TODO/FIXME/console/debugger no hit; tree `.skip/.only/.todo/TODO/FIXME/debugger/console` no hit outside excluded vendored files; `retry`/`timeout` hits listed above.

Writing: word-boundary `now`/`new` in `Date.now` / `new MessageChannel` comments; count hit `two members` `tests/guides.test.ts:1432`.

Parity: `MCPServerInterface` `dispatch`/`handle` ↔ guide :3222–3223; `MCPMessageTransportInterface` `start`/`send`/`close` ↔ :3561–3563; `MCPSessionInterface` `attach`/`detach`/`push`/`replay` ↔ :3679–3682; `MCPCompletionInterface` `complete` ↔ :3440; `MCPTaskManagerInterface` `start`/`task`/`update`/`abort` ↔ :3397–3400; option Types `deferral`/`producer`/`session`/`clock` as tabled; barrel exports `MCPCompletionInterface`, `supportsFormElicitation`, `supportsTask`, `MCP_WEBSOCKET_SUBPROTOCOL` via `src/core/index.ts`; `MessagePortTransport` methods match `MCPTransportInterface` Types :2467, no Methods heading for that interface.

## Unknowns

- Diff hunks in `tests/src/core/MCPServer.test.ts` after the first `@@` were not each quoted with a first `+` line (dozens of identical `deferral`/`producer` one-liners).
- `src/server/transports/WebSocketClientTransport.ts` second hunk `@@ -20,7 +20,6 @@` first `+` line not separately quoted (import drop of `./constants.js`).
- Fleet-wide `\bdefer\b` / `\blisten\b` as arbitrary English/method names outside mcp was not fully enumerated; only the named published symbols were swept in other packages' `src`/`tests`.
- Proof files do not print a numeric process exit; readings above are the `Tests` / tsc error lines those files contain.
- Whether `tests/guides.test.ts:641` `symbol.keyword` is in the unit diff's addendum hunk versus HEAD-at-start was not bisected beyond the report's consumer-edits table.

## Journal


## Deviation

No tree change from this lane (read-only; no writes, no mutating commands). Every named input file was readable. Evidence diff, status, report, and `/home/user/work/evidence/mcp-proofs/` files named above were readable. Conversation-start `git status --short` lists the same 30 modified paths plus `A tests/src/browser/transports/MessagePortTransport.test.ts` as the evidence status file.