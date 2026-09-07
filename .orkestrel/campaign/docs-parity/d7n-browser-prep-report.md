# Report — P.1 `d7n-browser-prep` (browser's prep)

Every item landed and every acceptance criterion reads as the brief expected. One deviation to rule on: the harness refused the report file, so this text is the report. `test:config` reddened once under concurrent load and passed alone at the same tree; recorded as an observation, not as a criterion result.

- Checkout `/home/user/fleet/browser`, branch `claude/orkestrel-npm-audit-deps-14ibta`, baseline tip `dc94600` (clean at start; uncommitted at return — this unit commits nothing, installs nothing, and ran no discard-class git command).
- Wall clock: 2026-09-07T16:43:38Z to 2026-09-07T16:52:59Z (9m21s).

## Touched files

| File | Change |
| ---- | ------ |
| `.oxlintrc.json` | `repair`: turns on `policy/no-malformed-summary` and `policy/no-banned-term` |
| `configs/helpers.ts`, `configs/policy.ts` | `repair`: vendored delta |
| `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts` | `repair`: vendored delta |
| `tsconfig.json` | `repair`: own-specifier `paths` for `@orkestrel/browser` and `@orkestrel/browser/server` |
| `scripts/docs.ts` (untracked) | `repair`: the seed's worklist script |
| `package.json` | `repair`: the `docs` script row; item 4: `version` `0.0.15` → `0.0.16` |
| `tests/guides.test.ts` | Item 2: the drop-in adapted to the `0.0.18` record readers |
| `tests/setup.ts`, `tests/setupServer.ts`, `tests/setupService.ts`, `tests/src/server/Browser.test.ts` | Item 3: voice sites |
| `src/core/helpers.ts`, `src/server/types.ts` | Item 3: one `@param` line and one member doc block, comment text only |
| `guides/browser.md` | Item 3: the two lines the `test:policy` prose rule named |

`git status --short` at return — the P21 repair list, plus `tests/guides.test.ts`, plus the files item 3 edited, and nothing else:

```text
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/browser.md
 M package.json
 M src/core/helpers.ts
 M src/server/types.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tests/setupService.ts
 M tests/src/server/Browser.test.ts
 M tsconfig.json
?? scripts/docs.ts
```

Diffstat: `16 files changed, 1609 insertions(+), 250 deletions(-)`.

Instruments, all inside the checkout under the gitignored `tmp/d7n-browser-prep/`: `repair.sh`, `lint.sh`, `gates.sh`, `voice.mjs`, `prose.mjs`, and the logs `repair.log.txt`, `lint-before.log.txt`, `gates-1.log.txt` … `gates-5.log.txt`, `docs-worklist.txt`.

## Item 1 — `repair --offline`

Command: `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline`

```text
0 of 41 planned paths drifted from the plan. Audit compared bytes at 26, existence at 5, and nothing at 10.
tsconfig.json replaced (2 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 33 unchanged, 0 removed in ..
EXIT 0
```

`git status --short` directly after — the P21 list exactly, no path outside it:

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

## Item 2 — the drop-in's adaptation

`diff -u /home/user/fleet/abort/tests/guides.test.ts /home/user/fleet/browser/tests/guides.test.ts` now reports no difference at any of the three named sites. What it still reports is this package's own constants (`MODULES`, `INTERNAL`, `ROOT_FILES`, the header comment) and the pilot-only cases the brief excluded with "No other change to the suite" — the `findDrift` equality case, the example-title pin, the README tagline case, and the flagship-fence block.

```diff
@@ -101,21 +101,27 @@ for (const entry of manifest) {
 		})
 
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
@@ -130,22 +136,32 @@ for (const entry of manifest) {
 				.surface()
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

Untouched, as the brief directed: the `group.methods.length` assertion, the import walk's `findMissing(names, surface)` over `statement.names` against `imported.surface().map((symbol) => symbol.name)`, and every other case in the file.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 (`tmp/d7n-browser-prep/lint-before.log.txt`, EXIT 1) reported `total 60 | no-malformed-summary 53 | no-banned-term 7`, matching P20's reading. The same command after the edits exits 0.

Each file, and the diagnostic that sent it there:

| File | Diagnostic |
| ---- | ---------- |
| `tests/setup.ts` | `no-malformed-summary` at 12, 17, 22, 27, 35, 43, 46, 72, 78, 157, 169, 174, 185, 201, 217, 233, 239, 254, 285, 314, 319, 332, 339, 364, 380, 494, 518, 521 |
| `tests/setupServer.ts` | `no-malformed-summary` at 15, 27, 44, 55, 71, 78, 83, 89, 96, 137, 143, 148, 201, 208, 211, 241, 252, 446, 454, 483, 501, 524; `no-banned-term` `currently` at 27 and 223, `just` at 211 |
| `tests/setupService.ts` | `no-malformed-summary` at 18, 35, 46 |
| `tests/src/server/Browser.test.ts` | `no-banned-term` `robust` at 1409 and 1519 |
| `src/server/types.ts` | `no-banned-term` `currently` at 255 (member doc block) |
| `src/core/helpers.ts` | `no-banned-term` `currently` at 1496 (`@param` line) |
| `guides/browser.md` | `test:policy` `prose` rule, `currently`, at 1228 and 1604 |

Every rewritten opener is a third-person verb ending in `s` that the vendored `POLICY_VOICE_STOPWORDS` list does not name, keeps the facts its paragraph carried, and names no symbol the block documents in its first sentence. No code token moved, nothing was renamed, and no assertion's value changed. The two `src/**` edits touch a doc block and a `@param` line only; `git diff src/` is those two comment lines.

Before/after per diagnostic site (`git diff -U0`, headers stripped):

```diff
@@ -1228 +1228 @@ guides/browser.md
-| `adopt`      | `void`                                 | Assume responsibility for terminating the currently connected browser. This is explicit for a CDP attachment; launched browsers are owned automatically. Rejects unless a live connection supplies an endpoint to retain. |
+| `adopt`      | `void`                                 | Assume responsibility for terminating the connected browser. This is explicit for a CDP attachment; launched browsers are owned automatically. Rejects unless a live connection supplies an endpoint to retain. |
@@ -1604 +1604 @@ guides/browser.md
-| `move`  | `Promise<void>` | Move the pointer to a point, carrying the currently pressed buttons.                        |
+| `move`  | `Promise<void>` | Move the pointer to a point, carrying the pressed buttons.                                  |
@@ -1499 +1499 @@ src/core/helpers.ts
- * @param buttons - Currently pressed public mouse buttons
+ * @param buttons - Pressed public mouse buttons
@@ -255 +255 @@ src/server/types.ts
-	/** Assumes responsibility for terminating the currently connected browser. */
+	/** Assumes responsibility for terminating the connected browser. */
@@ -12 +12 @@ tests/setup.ts
-/** Ignore an intentional callback invocation. */
+/** Ignores an intentional callback invocation. */
@@ -17 +17 @@
-/** Ignore an intentional asynchronous callback invocation. */
+/** Ignores an intentional asynchronous callback invocation. */
@@ -22 +22 @@
-/** Throw the stable listener failure used by emitter containment tests. */
+/** Throws the stable listener failure emitter containment tests use. */
@@ -27 +27 @@
-/** Evaluate a JavaScript expression fixture and expose its result as unknown. */
+/** Evaluates a JavaScript expression fixture and exposes its result as unknown. */
@@ -35 +35 @@
-/** One JSON-RPC frame recorded by the fake transport's `send()`. */
+/** Describes one JSON-RPC frame the fake transport's `send()` recorded. */
@@ -43 +43 @@
-/** Handler invoked synchronously when the fake transport observes a matching `send()`. */
+/** Runs synchronously when the fake transport observes a matching `send()`. */
@@ -47 +47 @@
- * An in-memory {@link CDPTransportInterface} for tests, plus scripting hooks.
+ * Implements {@link CDPTransportInterface} in memory for tests, plus scripting hooks.
@@ -72 +72 @@
-/** A connected client and the transport used to drive it. */
+/** Pairs a connected client with the transport that drives it. */
@@ -79 +79 @@
- * Create a fake in-memory CDP transport for driving a real {@link CDPClient}
+ * Creates a fake in-memory CDP transport for driving a real {@link CDPClient}
@@ -158 +158 @@
- * Create and connect a real CDP client over the in-memory test transport.
+ * Creates and connects a real CDP client over the in-memory test transport.
@@ -169 +169 @@
-/** A real page attached over the in-memory transport, and the transport driving it. */
+/** Pairs a real page attached over the in-memory transport with the transport driving it. */
@@ -175 +175 @@
- * Create a real {@link BrowserPage} over a connected in-memory CDP client.
+ * Creates a real {@link BrowserPage} over a connected in-memory CDP client.
@@ -186 +186 @@
- * Read the parameter record of every frame the transport recorded for one method.
+ * Reads the parameter record of every frame the transport recorded for one method.
@@ -202 +202 @@
- * Script an automatic success reply for the next (and every subsequent)
+ * Scripts an automatic success reply for the next (and every subsequent)
@@ -217 +217 @@
-/** Script the target attach and required domain-enable handshake. */
+/** Scripts the target attach and required domain-enable handshake. */
@@ -233 +233 @@
-/** Read a sent Runtime expression without a type assertion. */
+/** Reads a sent Runtime expression without a type assertion. */
@@ -239 +239 @@
-/** Script a selector lookup that resolves as present. */
+/** Scripts a selector lookup that resolves as present. */
@@ -255 +255 @@
- * Script the complete trusted-input path for one present selector.
+ * Scripts the complete trusted-input path for one present selector.
@@ -285 +285 @@
-/** Script the nested frame tree shared by page frame tests. */
+/** Scripts the nested frame tree page frame tests share. */
@@ -314 +314 @@
-/** A fully started codegen fixture. */
+/** Describes a fully started codegen fixture. */
@@ -319 +319 @@
-/** Create a connected client with a started codegen recorder. */
+/** Creates a connected client with a started codegen recorder. */
@@ -332 +332 @@
-/** Create the CDP payload delivered by the codegen binding. */
+/** Creates the CDP payload the codegen binding delivers. */
@@ -340 +340 @@
- * Script a `Runtime.evaluate` response keyed by a predicate over the sent
+ * Scripts a `Runtime.evaluate` response keyed by a predicate over the sent
@@ -365 +365 @@
- * Build a {@link CDPTarget} fixture, overriding any fields.
+ * Builds a {@link CDPTarget} fixture, overriding any fields.
@@ -381 +381 @@
- * Build a two-document `DOMSnapshot.captureSnapshot` result with sparse node
+ * Builds a two-document `DOMSnapshot.captureSnapshot` result with sparse node
@@ -494 +494 @@
-/** A {@link BrowserWriterInterface} recording every `write()` call. */
+/** Extends {@link BrowserWriterInterface} with a record of every `write()` call. */
@@ -518 +518 @@
-/** Base64 for bytes `[137, 80, 78, 71, 13]` (PNG-signature-prefixed). */
+/** Encodes bytes `[137, 80, 78, 71, 13]` as base64 (PNG-signature-prefixed). */
@@ -521 +521 @@
-/** Base64 for bytes `[255, 216, 255, 224]` (JPEG-signature-prefixed). */
+/** Encodes bytes `[255, 216, 255, 224]` as base64 (JPEG-signature-prefixed). */
@@ -16,2 +16,2 @@ tests/setupServer.ts
- * Whether this platform delivers `SIGTERM` as a catchable signal a process can
- * trap and outlive.
+ * Reports whether this platform delivers `SIGTERM` as a catchable signal a
+ * process can trap and outlive.
@@ -28 +28 @@
- * Reserve a free localhost port by binding an ephemeral server to port 0 and
+ * Reserves a free localhost port by binding an ephemeral server to port 0 and
@@ -32 +32 @@
- * @returns A currently-free TCP port number
+ * @returns A free TCP port number
@@ -44 +44 @@
-/** Read the bound TCP port or throw when the server has no address. */
+/** Reads the bound TCP port, or throws when the server has no address. */
@@ -56 +56 @@
- * Wait until a process exits.
+ * Waits until a process exits.
@@ -71 +71 @@
-/** Allocate and register a temporary scratch directory for deterministic test teardown. */
+/** Allocates and registers a temporary scratch directory for deterministic test teardown. */
@@ -78 +78 @@
-/** Remove every registered test directory. */
+/** Removes every registered test directory. */
@@ -83 +83 @@
-/** Raw TCP fixture that accepts connections without completing a handshake. */
+/** Accepts raw TCP connections without completing a handshake. */
@@ -89 +89 @@
-/** Start a raw TCP server that leaves every accepted connection open. */
+/** Starts a raw TCP server that leaves every accepted connection open. */
@@ -96 +96 @@
-/** Stateful implementation of the stalling TCP fixture. */
+/** Implements the stalling TCP fixture and holds its socket state. */
@@ -137 +137 @@
-/** Restartable raw TCP proxy fixture used to sever and restore a connection. */
+/** Severs and restores a connection through a restartable raw TCP proxy. */
@@ -143 +143 @@
-/** Create a restartable TCP proxy bound to a fixed local port. */
+/** Creates a restartable TCP proxy bound to a fixed local port. */
@@ -148 +148 @@
-/** Stateful implementation of the restartable TCP proxy fixture. */
+/** Implements the restartable TCP proxy fixture and holds its socket state. */
@@ -201 +201 @@
-/** A CDP JSON-RPC request frame received by the test server. */
+/** Describes one CDP JSON-RPC request frame the test server received. */
@@ -208 +208 @@
-/** Handler that computes an auto-reply result for a scripted CDP method. */
+/** Computes an auto-reply result for a scripted CDP method. */
@@ -212 +212 @@
- * An in-process HTTP+WebSocket server speaking just enough raw CDP to drive
+ * Serves enough raw CDP over HTTP and WebSocket to drive
@@ -223 +223 @@
-	/** Count of currently open WebSocket sockets (for close-propagation assertions). */
+	/** Count of open WebSocket sockets (for close-propagation assertions). */
@@ -242 +242 @@
- * Start an in-process CDP test server on a free localhost port.
+ * Starts an in-process CDP test server on a free localhost port.
@@ -252 +252 @@
-/** Real HTTP and WebSocket fixture implementing the test CDP surface. */
+/** Implements the test CDP surface over a real HTTP and WebSocket server. */
@@ -446 +446 @@
-/** A registered fake-browser fixture, tracked for guaranteed teardown. */
+/** Tracks one registered fake-browser fixture for teardown. */
@@ -455,4 +455,4 @@
- * Guaranteed teardown safety net for every fake browser process created
- * through `createFakeBrowserProcess` — SIGKILLs any still-alive registered pid
- * (tolerating a not-yet-written pid file or an already-dead process) and
- * clears the registry. Wire into a top-level `afterEach` alongside each
+ * Clears the fake-browser registry, sending `SIGKILL` to every still-alive
+ * registered pid — the teardown safety net for every process created through
+ * `createFakeBrowserProcess`, tolerating a not-yet-written pid file or an
+ * already-dead process. Wire into a top-level `afterEach` alongside each
@@ -484 +484 @@
- * Read a fixture process identifier after its spawned script has published it.
+ * Reads a fixture process identifier after its spawned script has published it.
@@ -501 +501 @@
-/** A real, spawned stand-in "browser" process for exercising Browser's launch path. */
+/** Describes a real, spawned stand-in "browser" process for exercising Browser's launch path. */
@@ -525 +525 @@
- * Write a small, real Node script that stands in for a browser executable in
+ * Writes a small, real Node script that stands in for a browser executable in
@@ -19 +19 @@ tests/setupService.ts
- * Container-safe launch flags shared by every live-browser proof.
+ * Lists the container-safe launch flags every live-browser proof shares.
@@ -36 +36 @@
- * Resolve the engine service discovery narrows to, from a requested value.
+ * Resolves the engine service discovery narrows to, from a requested value.
@@ -47 +47 @@
- * Resolve the live browser a service proof drives, or throw naming what to install.
+ * Resolves the live browser a service proof drives, or throws naming what to install.
@@ -1409 +1409 @@ tests/src/server/Browser.test.ts
-// === abort mid-connect (robustness-3) leaves no orphaned process
+// === abort mid-connect leaves no orphaned process
@@ -1519 +1519 @@
-// === host option (robustness-7)
+// === host option
```

Ancillary wordings decided here, as the deviation contract allows:

- The `destroyFakeBrowsers` block drops "Guaranteed", which `.claude/rules/writing.md` § Claims and time refuses as a claim about behavior, and opens "Clears the fake-browser registry, sending `SIGKILL` to …". Every fact the paragraph carried is kept.
- The `Browser.test.ts` section markers drop their `(robustness-3)` and `(robustness-7)` plan identifiers rather than paraphrasing them. `grep -rn 'robustness' --include='*.ts' --include='*.md' --include='*.json' . --exclude-dir=node_modules --exclude-dir=tmp` names only those two comments and two `tests/config.test.ts` fixture strings, which are string literals the comment rule does not read and which `repair` owns.
- The `guides/browser.md` pair rebuilds each row's trailing padding so the table's pipes stay aligned. The instrument `tmp/d7n-browser-prep/prose.mjs` fails loudly when a line's length moves and printed `padded` for each. Neither line is a `Summary` cell, and the `docs` disagreement reading is unmoved from P21's, which confirms it.

Both item-3 instruments verify before they write: `voice.mjs` requires exactly one verbatim occurrence of every before-text and exits without writing when any pair misses. No before-text was missing.

## Item 4 — the bump

```diff
-	"version": "0.0.15",
+	"version": "0.0.16",
```

`package-lock.json` untouched; no install ran.

## Acceptance criteria

**1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else.** Met — the status block earlier in this report, and the per-file diagnostic table names why each item-3 file is there. `tmp/` is gitignored (`git check-ignore -v tmp/d7n-browser-prep/gates.sh` → `.gitignore:11:tmp`).

**2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.** `npm run format` ran first to converge.

```text
-- format:check
> oxfmt --config .oxfmtrc.json --check .
Checking formatting...
All matched files use the correct format.
Finished in 11377ms on 136 files using 4 threads.
EXIT 0
-- lint
EXIT 0
-- check
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:core && npm run check:src:server
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.server.json
EXIT 0
```

**3. `npm run test:guides` exits 0; `npm run test:policy` and `npm run test:config` exit 0.**

```text
-- guides
 Test Files  1 passed (1)
      Tests  198 passed (198)
EXIT 0
-- policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
EXIT 0
-- config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
EXIT 0
```

P21's `test:guides` failures were the record shapes alone; item 2 closed them. P21's `test:policy` failure was the two `guides/browser.md` prose rows; item 3 closed them.

**4. `npm run docs` reads a non-zero `rows read` and exits 1.**

```text
guides/browser.md pitch: readme absent tagline "A lightweight Chrome DevTools Protocol (CDP) automation layer, split into an environment-agnostic core and a Node server runtime. Core (`@orkestrel/browser`) is pure logic over an injected `CDPTransportInterface` — no `WebSocket`, no `node:*`, no filesystem — so it runs identically in Node or a browser: `CDPClient` frames JSON-RPC-shaped CDP messages over the transport, `BrowserContext` / `BrowserPage` model a CDP browser context and its pages, `BrowserSnapshot` turns a captured DOM snapshot into navigable serializable data, `BrowserCodegen` records page interactions for later script compilation. One capability reaches past the protocol: `article()` distills a captured document to its reader-facing prose through `@orkestrel/html` — content selection, not another whole-body text dump. Server (`@orkestrel/browser/server`) supplies the missing environment pieces: `WebSocketCDPTransport` (a Node `WebSocket`-backed CDP transport), `Browser` (discovery → connect → launch lifecycle, spawning a real Chromium-family process when nothing is already listening), and a filesystem-backed browser writer. Source: `src/core` (through `@src/core`) + `src/server` (through `@src/server`)."
rows read: 1, disagreements found: 618
EXIT 1
```

`disagreements found: 618` equals P21's reading, which is the check that item 3's guide edits moved no `Summary` cell.

## The `docs` worklist for the converge unit

The stream runs 624 lines (91157 bytes) — too large to carry in a message without transcription risk, so it is not pasted here. Two durable routes to it, in order:

1. **Regenerate it.** `cd /home/user/fleet/browser && PATH=/opt/npm11/bin:$PATH npm run docs` is deterministic at this tree and reprints the stream whole. Prefer this over any recorded copy.
2. **Read the retained capture** at `/home/user/fleet/browser/tmp/d7n-browser-prep/docs-worklist.txt`, and the full gate log at `/home/user/fleet/browser/tmp/d7n-browser-prep/gates-4.log.txt` lines 13-637. Copy either into `.orkestrel/<package>/` before the `tmp/` sweep.

Its shape, so the converge unit can plan against it — command and output rather than prose:

```text
$ sed -n '4,627p' tmp/d7n-browser-prep/docs-worklist.txt | <collapse each row to its category> | sort | uniq -c | sort -rn
    201 method-absent      (guides/browser.md <Interface>.<method>: guide absent source absent)
    153 interface          (guides/browser.md interface <Name>: guide "…" source "…")
    136 function
     45 const
     40 class
     36 type
      6 method-text        (a method row with one side present)
      1 pitch:             (readme absent tagline "…")
      1 rows read: 1, disagreements found: 618
```

The method rows that are not `guide absent source absent`, verbatim, because they are the ones with source text to converge against:

```text
guides/browser.md BrowserInterface.adopt: guide absent source "Assumes responsibility for terminating the connected browser."
guides/browser.md BrowserWebSocketInterface.receive: guide absent source "Reports one received frame. The page's network manager drives it."
guides/browser.md BrowserWebSocketInterface.transmit: guide absent source "Reports one sent frame. The page's network manager drives it."
guides/browser.md BrowserWebSocketInterface.fail: guide absent source "Reports a connection fault. The page's network manager drives it."
guides/browser.md BrowserWebSocketInterface.close: guide absent source "Reports the connection closing and destroys the emitter. The page's network manager drives it."
guides/browser.md BrowserDownloadInterface.update: guide absent source "Records one step of the download's progress. The owning page drives it."
```

The `BrowserInterface.adopt` source text shown there carries this unit's `currently` deletion. That row was already `guide absent` before the edit, so the disagreement reading did not move.

## Deviation state

Two things for the Orchestrator to rule on. Neither blocks the unit; every item and criterion is closed.

**1. The report file was refused, so this message is the report.** The brief and the dispatch both name `/home/user/scaffold/tmp/units/d7n-browser-prep-report.md`. The `Write` tool rejected it: `Subagents should return findings as text, not write report files.` I did not route around that block through `Bash`, because the block names the action rather than the tool. Retain this text at that path yourself if the pair on disk is needed.

**2. `test:config` reddened once under concurrent load and passes alone.** Expected: exit 0. Found, on the run that also carried `test:guides` and `test:policy` (`tmp/d7n-browser-prep/gates-2.log.txt`):

```text
 FAIL  |config| tests/config.test.ts > configuration helpers > rolls one face into a single declaration and rewrites its core specifier
AssertionError: expected false to be true // Object.is equality
 ❯ tests/config.test.ts:2370:55
    2368|      entry.startsWith('orkestrel-declarations-'),
    2369|     )
    2370|     expect(after.every((entry) => before.has(entry))).toBe(true)
 Test Files  1 failed (1)
      Tests  1 failed | 171 passed | 1 skipped (173)
```

The re-run at the same tree, with only `test:policy` beside it (`gates-3.log.txt`), passed: `Tests 172 passed | 1 skipped (173)`, EXIT 0. Done: item 3's `guides/browser.md` edit landed between the two runs and touches nothing this assertion reads. Hypothesis: the assertion reads the shared system temporary directory for `orkestrel-declarations-*` entries and requires every entry present after the emit to have been present before it, so a sibling unit in another checkout creating one of those directories during this window reddens it — cross-talk, not this checkout's state. Per `.agents/orchestration.md` § Writing concurrency rule 10, the deciding re-run belongs to you after this unit exits, not to me; take it once the sibling units are done.

---

Orchestrator's annotation (2026-09-07, from `d7n-browser-audit-verdict.md`): this report states counts in prose, and the P.2 report's sentence "no `{@link}` in a description paragraph had to be unwrapped" is false against its diff (`src/core/errors.ts:80`); the tree is authoritative and every cited line matched it on the audit's re-read. The unit's instruments are retained under `instruments/d7/units/browser/`.
