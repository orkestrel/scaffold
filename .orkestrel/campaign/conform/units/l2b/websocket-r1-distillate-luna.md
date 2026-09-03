## Question
For each conform-websocket row, map the current tree, its diff, old-form sweeps, and report readings.

## Evidence

### websocket-obj-1
- **Site now.** `src/server/validators.ts` and `tests/src/server/validators.test.ts` no longer exist. The predicates are in `src/server/helpers.ts:193`, `:214`, and `:239`, with surrounding TSDoc and the following declarations at `:200`, `:221`, and `:247`. `NodeWebSocket.ts:10-18` imports them from `helpers.js`; `src/server/index.ts:4-7` has no validator barrel row. Tests are at `tests/src/server/helpers.test.ts:186-239`.
- **Diff at the site.** Hunk headers include `@@ -3,14 +3,16 @@` in `src/server/helpers.ts`, `@@ -3,6 +3,5 @@` in `src/server/index.ts`, `@@ -7,19 +7,26 @@` in `NodeWebSocket.ts`, `@@ -2,21 +2,25 @@` and `@@ -132,3 +136,99 @@` in `helpers.test.ts`, plus deletion hunks for both validator files. The `+` lines contain all three function declarations and their TSDoc.
- **Old form sweep.** `rg -n -i '\b(isWebSocketKey|isWebSocketProtocol|isCloseCode)(s|ed|ing)?\b|validators\.ts'` over `src/**`, `tests/**`, `guides/websocket.md`, `guides/README.md`, and `README.md`, excluding `node_modules`: no hits for the old placement or declarations.
- **Report reading.** `applied` — “The three predicates moved into `src/server/helpers.ts`; `validators.ts` and its test relocated by `git mv`.” Current `helpers.ts:193`, `:214`, `:239`, and the absent validator files match that reading.
- **Proof reading.** `npm run test:src`; control file `/home/user/work/evidence/websocket-proofs/obj-1-control.txt` records `Tests  3 failed | 117 passed (120)` at line 73. The report records `120 passed` after restoration.

### websocket-obj-3
- **Site now.** `tests/setupGlobal.ts:11-12` has the remaining type import before the value import; `tests/setup.test.ts:9-20` contains value imports only because the deleted local fixture no longer needed the type imports. The following declarations begin at `:22`.
- **Diff at the site.** `tests/setupGlobal.ts` uses `@@ -1,25 +1,15 @@`; `tests/setup.test.ts` uses `@@ -1,17 +1,12 @@` and `@@ -22,6 +17,7 @@`. The `+` lines place `import type` before value imports where type imports remain.
- **Old form sweep.** `rg -n 'import \{[\s\S]*\nimport type|import type[\s\S]*\nimport \{'` over the two files: no interleaving remains.
- **Report reading.** `applied` — “`tests/setupGlobal.ts` reordered; `tests/setup.test.ts` lost both `import type` rows to websocket-obj-7.” The current imports match this combined disposition.
- **Proof reading.** Placement row; the current import blocks are the proof. No behavioural control file is required.

### websocket-obj-4
- **Site now.** `tests/setupServer.test.ts:134-138` reads `const received = requireValue(collector.frames[0], 'readClientFrames collected no frame')`, followed by the unchanged opcode and payload assertions at `:136-138`.
- **Diff at the site.** `@@ -114,10 +132,63 @@`; the operative `+` line is `const received = requireValue(collector.frames[0], 'readClientFrames collected no frame')`.
- **Old form sweep.** `rg -n -i 'const \[received\]|length checked above|received\.toBeDefined'` over the package-owned paths: no hits.
- **Report reading.** `applied` — “`requireValue` replaces the hand-rolled narrowing at `tests/setupServer.test.ts`.” Current line `:135` carries that replacement.
- **Proof reading.** `npm run test:setup`; `/home/user/work/evidence/websocket-proofs/obj-4-control.txt` records `Tests  1 failed | 20 passed (21)` at line 30. The report records `21 passed` after restoration.

### websocket-obj-5
- **Site now.** `tests/setup.ts:77-87` implements `nextMessage` with `waitForEvent` and an explicit `budget: NEXT_EVENT_BUDGET_MS`; `:98-108` does the same for `nextClose`. `connect` remains the two-event `Promise` at `:61-66`.
- **Diff at the site.** `@@ -37,15 +38,24 @@`, `@@ -60,11 +70,19 @@`, and `@@ -72,9 +90,18 @@` in `tests/setup.ts`. The `+` lines contain `waitForEvent`, cleanup callbacks, descriptions, and `{ budget: NEXT_EVENT_BUDGET_MS }`.
- **Old form sweep.** `rg -n -i 'next(Message|Close)[\s\S]*new Promise|addEventListener.*next'` over `tests/setup.ts`, `tests/setup.test.ts`, and `tests/integration.test.ts`: no raw Promise implementation remains for either helper.
- **Report reading.** `applied` — “`nextMessage` and `nextClose` rebuilt over `waitForEvent` with a measured budget; `connect` untouched.” Current `:61-66`, `:77-87`, and `:98-108` match.
- **Proof reading.** `npm run test:setup`; `/home/user/work/evidence/websocket-proofs/obj-5-control.txt` records `Tests  3 failed | 18 passed (21)` at line 22. The report records `21 passed` after restoration. The TSDoc records the measured `4000` ms budget at `tests/setup.ts:48-55`.

### websocket-obj-6
- **Site now.** `tests/guides.test.ts:183-260` contains the `flagship fences` block. It executes the Surface fence over `duplexPair`, the Patterns fence, the encoder assertions, and the accept-token assertion.
- **Diff at the site.** `@@ -1,6 +1,8 @@`, `@@ -20,6 +22,14 @@`, `@@ -32,8 +42,9 @@`, and `@@ -168,3 +179,85 @@`. The `+` lines import `computeWebSocketAccept`, `createNodeWebSocket`, `encodeWebSocketFrame`, the opcodes, and the shared socket helpers, then add all four executed tests.
- **Old form sweep.** `rg -n -i 'flagship fences|computeWebSocketAccept.*toBe|encodeWebSocketFrame.*toEqual'` over `tests/guides.test.ts`: the new transcription exists; no prior missing-fence form remains.
- **Report reading.** `applied` — “A `flagship fences` block executes the Surface, Patterns, encoder, and accept-token fences.” Current `:195-260` matches.
- **Proof reading.** `npm run test:guides`; `obj-6-control.txt` records `Tests  1 failed | 21 passed (22)` at line 30, and `obj-6-control-fences.txt` records `Tests  3 failed | 19 passed (22)` at line 82. The report records `22 passed` after restoration.

### websocket-obj-7
- **Site now.** `tests/setupServer.ts:67-73` declares `EchoServerInterface`; `:143-166` implements `EchoServer`; `:183-222` implements `createEchoServer`. `tests/setupGlobal.ts:20-26` uses it, and `tests/setup.test.ts:65-110` uses it in every case. No local `startEchoServer` remains.
- **Diff at the site.** Hunk headers include `tests/setupServer.ts @@ -1,9 +1,21 @@`, `@@ -54,6 +66,13 @@`, `@@ -100,3 +138,86 @@`; `tests/setupGlobal.ts @@ -28,54 +18,9 @@`; and `tests/setup.test.ts @@ -64,60 +60,9 @@`, `@@ -126,26 +71,21 @@`, `@@ -153,12 +93,12 @@`. The `+` lines contain the shared interface, entity, factory, count branch, teardown, and rewired callers.
- **Old form sweep.** `rg -n -i '\b(startEchoServer|startEchoServers|startEchoServered|startEchoServering)\b|stop:\s*async'` over the package-owned paths: no hits.
- **Report reading.** `applied` — “`createEchoServer` / `EchoServerInterface` extracted into `tests/setupServer.ts`; both callers rewired.” Current `:67-73`, `:183-222`, and the callers match.
- **Proof reading.** `npm run test:setup`; `obj-7-control-setup.txt` records `Tests  2 failed | 19 passed (21)` at line 46. `npm run test:integration`; `obj-7-control-integration.txt` records `Tests  9 failed | 5 passed (14)` at line 367. The report records `21 passed` and `14 passed` after restoration.

### websocket-obj-8
- **Site now.** `tests/setupServer.ts:82-100` exports `buildCorpus(rng)`; `tests/src/server/parsers.test.ts:16` imports it and `:192` calls `buildCorpus(seededRandom(1))`. The local module-scope builder is absent.
- **Diff at the site.** `tests/setupServer.ts @@ -61,6 +80,25 @@` adds the function; `parsers.test.ts @@ -185,26 +185,11 @@` removes the local builder and changes the call. The `+` line `export function buildCorpus(rng: () => number): readonly Buffer[]` is present.
- **Old form sweep.** `rg -n -i 'function buildCorpus|buildCorpus\(\)'` over `tests/**`: no local zero-argument builder remains.
- **Report reading.** `applied` — “`buildCorpus(rng)` moved into `tests/setupServer.ts` with the generator parameter and its own proofs.” Current `setupServer.ts:91` and `parsers.test.ts:192`## Question

For each conform-websocket row, map the current tree, diff, old-form sweep, report reading, and proof evidence.

## Evidence

### websocket-obj-1

- **Site now.** `src/server/validators.ts` no longer exists. The predicates are in `src/server/helpers.ts:193-239`; surrounding helpers end at `:170` and begin with the moved TSDoc at `:180`. `src/server/index.ts:4-8` exports `helpers.ts` and no validators barrel. `NodeWebSocket.ts:10-18` imports all three from `helpers.js`. Tests are in `tests/src/server/helpers.test.ts:180-232`, after the codec tests.
- **Diff at the site.** `conform-websocket.diff` has `@@ -3,14 +3,16 @@`, `@@ -76,45 +13,3 @@`, `@@ -3,6 +3,5 @@`, and `@@ -132,3 +136,99 @@`. The `+` lines contain the moved predicates and their TSDoc; the deleted validator file and test are shown at `@@ -1,74 +0,0 @@` and `@@ -1,58 +0,0 @@`.
- **Old form sweep.** `rg -n -i '\b(isWebSocketKey|isWebSocketProtocol|isCloseCode)(s|ed|ing)?\b'` and the validator-path sweep over `src`, `tests`, `guides/websocket.md`, `guides/README.md`, and `README.md`: no stale validator declaration or path hit.
- **Report reading.** The report marks it `applied`: “The three predicates moved into `src/server/helpers.ts`; `validators.ts` and its test relocated by `git mv`.” Current `helpers.ts:193`, `:214`, and `:239` match that reading.
- **Proof reading.** `npm run test:src`; `obj-1-control.txt` exists and records `Tests  3 failed | 117 passed (120)` at `:73`. The report records `120 passed` after restoration.

### websocket-obj-3

- **Site now.** `tests/setupGlobal.ts:11-12` places `import type { TestProject }` before `import { createEchoServer }`; the following line is the module declaration. `tests/setup.test.ts:9-20` contains value imports only because the deleted local fixture was its sole type-import consumer.
- **Diff at the site.** `@@ -1,25 +1,15 @@` and `@@ -1,17 +1,12 @@` touch the import blocks. The `+` lines place the remaining type import first and remove the obsolete interleaved imports.
- **Old form sweep.** Import-order inspection over both files: no value import precedes a later type import.
- **Report reading.** The report marks it `applied`: “`tests/setupGlobal.ts` reordered; `tests/setup.test.ts` lost both `import type` rows to websocket-obj-7.” Current imports match this indirect closure.
- **Proof reading.** Placement-only; no behavioral control file is required.

### websocket-obj-4

- **Site now.** `tests/setupServer.test.ts:134-137` reads `const received = requireValue(collector.frames[0], 'readClientFrames collected no frame')`, followed by the opcode and payload assertions at `:136-137`.
- **Diff at the site.** `@@ -114,10 +132,63 @@` contains `+ const received = requireValue(...)`; the exact replacement text is present verbatim.
- **Old form sweep.** `rg -n 'const \[received\]|length checked above|received\)\.toBeDefined'` over the owned source and tests: no hit.
- **Report reading.** The report marks it `applied`: “`requireValue` replaces the hand-rolled narrowing at `tests/setupServer.test.ts`.” Current `:135` matches.
- **Proof reading.** `npm run test:setup`; `obj-4-control.txt` exists with `Tests  1 failed | 20 passed (21)` at `:30`. The report records `21 passed` after restoration.

### websocket-obj-5

- **Site now.** `tests/setup.ts:77-86` implements `nextMessage` with `waitForEvent` and an explicit `4000` ms budget. `:98-107` does the same for `nextClose`. `connect` remains the two-event promise at `:61-66`.
- **Diff at the site.** `@@ -37,15 +38,24 @@`, `@@ -60,11 +70,19 @@`, and `@@ -72,9 +90,18 @@` add the import, budget, descriptions, cleanup callbacks, and `waitForEvent` calls. `connect` is unchanged in the operative body.
- **Old form sweep.** `rg -n -i 'new Promise.*(nextMessage|nextClose)|next(Message|Close).*addEventListener'` over the owned tree: no raw promise implementation remains for either helper.
- **Report reading.** The report marks it `applied`: “`nextMessage` and `nextClose` rebuilt over `waitForEvent` with a measured budget; `connect` untouched.” Current `setup.ts:77-107` matches.
- **Proof reading.** `npm run test:setup`; `obj-5-control.txt` exists with `Tests  3 failed | 18 passed (21)` at `:22`. Its failure names `the next WebSocket message event` and the report records `21 passed` after restoration. The report’s measurement is `NEXT_EVENT_BUDGET_MS = 4000`; the 2 MB case measured `802 ms`.

### websocket-obj-6

- **Site now.** `tests/guides.test.ts:183-263` contains the `flagship fences` block. The Surface and Patterns fences use `duplexPair` and `flushSocket` at `:22` and `:32`; encoder assertions are at `:246-255`; the accept-token assertion is at `:260-261`.
- **Diff at the site.** `@@ -168,3 +179,85 @@` adds the block. The `+` lines contain assertions for the Surface echo, Patterns echo, encoder bytes/mask bit, and accept token.
- **Old form sweep.** No removed symbol; fence coverage sweep over `tests/guides.test.ts` finds the new `flagship fences` block and no missing transcription.
- **Report reading.** The report marks it `applied`: “A `flagship fences` block executes the Surface, Patterns, encoder, and accept-token fences.” Current `tests/guides.test.ts:195-263` matches.
- **Proof reading.** `npm run test:guides`; `obj-6-control.txt` exists with `Tests  1 failed | 21 passed (22)` at `:30`. `obj-6-control-fences.txt` exists with `Tests  3 failed | 19 passed (22)` at `:82`. The report records `22 passed` after restoration.

### websocket-obj-7

- **Site now.** `tests/setupServer.ts:67-73` declares `EchoServerInterface`; `:143-165` implements `EchoServer`; `:183-222` implements `createEchoServer`. `tests/setupGlobal.ts:20-26` uses its URL and destroy method. `tests/setup.test.ts:65-110` uses the shared fixture. No `startEchoServer` remains.
- **Diff at the site.** `@@ -1,9 +1,21 @@`, `@@ -54,6 +66,13 @@`, `@@ -100,3 +138,86 @@`, `@@ -1,25 +1,15 @@`, and `@@ -64,60 +60,9 @@` add the shared entity and remove both duplicated fixtures. The `+` lines contain `export async function createEchoServer(): Promise<EchoServerInterface>`.
- **Old form sweep.** `rg -n -i '\b(startEchoServer|startEchoServers|startEchoServered|startEchoServering)\b'` over the owned paths: no hit.
- **Report reading.** The report marks it `applied`: “`createEchoServer` / `EchoServerInterface` extracted into `tests/setupServer.ts`; both callers rewired.” Current `setupServer.ts:183-222` matches.
- **Proof reading.** `npm run test:setup`; `obj-7-control-setup.txt` exists with `Tests  2 failed | 19 passed (21)` at `:46`. `npm run test:integration`; `obj-7-control-integration.txt` exists with `Tests  9 failed | 5 passed (14)` at `:367`. The report records `21` setup tests and `14` integration tests passed after restoration.

### websocket-obj-8

- **Site now.** `tests/setupServer.ts:83-100` exports `buildCorpus(rng)`. `tests/src/server/parsers.test.ts:16` imports it and `:192` calls `buildCorpus(seededRandom(1))`. The local builder is absent.
- **Diff at the site.** `@@ -61,6 +80,25 @@` adds the shared builder; `@@ -185,26 +11,11 @@` removes the local builder and changes the call to `buildCorpus(seededRandom(1))`. The generator-parameter form is present verbatim.
- **Old form sweep.** `rg -n -i 'function buildCorpus|buildCorpus\(\)'` over `src`, `tests`, and the package guides: no local or zero-argument form.
- **Report reading.** The report marks it `applied`: “`buildCorpus(rng)` moved into `tests/setupServer.ts` with the generator parameter and its own proofs.” Current `setupServer.ts:91` and parser test `:192` match.
- **Proof reading.** `npm run test:setup`; `obj-8-control.txt` exists with `Tests  1 failed | 20 passed (21)` at `:33`. The report records `21 passed` after restoration.

### websocket-obj-9

- **Site now.** `tests/integration.test.ts:1-10` says the integration project runs from `test` and that `npm run test:integration` is its scoped command. `tests/setupServer.ts:1-4` correctly identifies the integration test file as using `setup.ts`, not a browser project.
- **Diff at the site.** `@@ -1,11 +1,13 @@` replaces the false header. The `+` lines contain “the `integration` project runs from `test`” and remove the false opt-in claim.
- **Old form sweep.** `rg -n -i 'kept out|opt-in|dedicated.*instead|run via'` over `tests/integration.test.ts`: no stale placement statement.
- **Report reading.** The report marks it `applied`: “The false gate-placement clause replaced; the false `setupServer.ts` browser clause corrected with it.” Current headers match.
- **Proof reading.** Documentation-only; the integration gate itself is recorded under `conform-websocket-report.md:149`.

### websocket-obj-10

- **Site now.** `README.md:16` reads `- Node.js >= 22.12.0`; `README.md:17` remains the dual-build requirement. This matches `package.json:92` and `vite.config.ts:46`.
- **Diff at the site.** `@@ -13,7 +13,7 @@` contains the exact `+ - Node.js >= 22.12.0` replacement.
- **Old form sweep.** `rg -n -i 'Node\.js >= 24|Node\.js >= 2[0-9]'` over the package README and guide files: no `Node.js >= 24` hit; the current README has `22.12.0`.
- **Report reading.** The report marks it `applied`: “`README.md` Requirements now reads `Node.js >= 22.12.0`, matching `engines.node`.” Current `README.md:16` matches.
- **Proof reading.** Documentation-only; no behavioral control is required.

### websocket-obj-11

- **Site now.** `src/server/helpers.ts:91` exports `matchesWebSocketCanonical`; its TSDoc starts at `:70` and follows `measureWebSocketFrame` at `:53`. `NodeWebSocket.ts:13-18` imports it from helpers and `:278` calls it. `parsers.ts:3-8` now identifies it as a helper. The guide row is `guides/websocket.md:65`; the tests are `tests/src/server/helpers.test.ts:140-180`.
- **Diff at the site.** `@@ -3,14 +70,40 @@` adds the renamed helper to `helpers.ts`; `@@ -76,45 +78,13 @@` removes the parser declaration; Node imports/call use `@@ -7,19 +7,26 @@` and `@@ -241,14 +275,14 @@`; guide/test hunks replace the public name. The `+` lines contain `matchesWebSocketCanonical` and the noun-phrase summary.
- **Old form sweep.** `rg -n -i '\b(parseWebSocketCanonical|parseWebSocketCanonicals|parseWebSocketCanonicaled|parseWebSocketCanonicaling)\b'` over `src`, `tests`, `guides/websocket.md`, `guides/README.md`, and `README.md`: no hit.
- **Report reading.** The report marks it `applied`: “`parseWebSocketCanonical` moved to `helpers.ts` and renamed `matchesWebSocketCanonical`. BREAKING.” Current `helpers.ts:91` and guide `:65` match.
- **Proof reading.** `npm run test:src`; `obj-11-control.txt` exists with `Tests  28 failed | 92 passed (120)` at `:608`. The report records `120 passed` after restoration.

### websocket-subj-1

- **Site now.** The package-owned citations now name the subject directly: `src/server/types.ts:12`, `:122`, and `:160`; `src/server/NodeWebSocket.ts:58-62`; `src/server/constants.ts:3`; `src/server/parsers.ts:5-8`; `tests/setupGlobal.ts:1-8`; `tests/src/server/NodeWebSocket.test.ts:358`; and `guides/websocket.md:109`, `:113`, `:263`. The `See also` links remain at `guides/websocket.md:263` and `guides/README.md:36`.
- **Diff at the site.** The evidence contains the relevant source/test/guide hunks, including `@@ -1,6 +1,6 @@`, `@@ -8,12 +8,12 @@`, `@@ -48,11 +55,25 @@`, `@@ -1,17 +1,12 @@`, and `@@ -228,21 +245,20 @@`. The `+` lines remove `AGENTS §N` citations while retaining RFC citations.
- **Old form sweep.** `rg -n -i 'AGENTS §|(?:AGENTS[^.\n]*)§[0-9]+'` over `src`, `tests` excluding vendored policy files, `guides/websocket.md`, `guides/README.md`, and `README.md`: no hit. RFC 6455 section citations remain.
- **Report reading.** The report marks it `applied`: “Every `AGENTS §N` citation removed from package-owned files; every `RFC 6455 §` citation kept.” Current searches match.
- **Proof reading.** Placement/documentation row; the empty citation sweep is the proof.

### websocket-subj-2

- **Site now.** `guides/websocket.md:16-25`, `:153-162`, and `:181-190`; `README.md:29-40`; and `src/server/factories.ts:26-39` all assign `const key`, reject non-string keys, and pass `key`. The explanatory sentence is at `guides/websocket.md:33`.
- **Diff at the site.** README uses `@@ -27,9 +27,14 @@`; the guide uses `@@ -14,11 +14,16 @@`, `@@ -146,8 +153,13 @@`, and `@@ -167,9 +179,14 @@`; the factory uses `@@ -24,9 +24,14 @@`. Each `+` block contains the exact `typeof key !== 'string'` guard.
- **Old form sweep.** `rg -n -i 'key:\s*request\.headers\[.sec-websocket-key.\]'` over the owned prose and source: no hit.
- **Report reading.** The report marks it `applied`: “Guide, README, and the `createNodeWebSocket` `@example` narrow the header before the call.” Current sites match.
- **Proof reading.** Documentation/example row; the guard sweep agrees. The report separately records mirror propagation for `/home/user/fleet/mcp/guides/websocket.md` and `/home/user/fleet/browser/guides/websocket.md`.

### websocket-subj-3

- **Site now.** `guides/websocket.md:107` reads “The wrapper contract — the `emitter` and `readyState` data members plus `send` / `ping` / `close` / `destroy`.” `:113` says they stay in “the preceding Surface row.”
- **Diff at the site.** `@@ -97,46 +104,46 @@` contains the Summary replacement and preamble correction. The `+` lines carry both data-member names.
- **Old form sweep.** `rg -n -i 'Surface rows above|Surface rows below'` over the package guide: no hit.
- **Report reading.** The report marks it `applied`: “The `NodeWebSocketInterface` Surface Summary carries its data members; the Methods preamble points at that row.” Current `:107` and `:113` match.
- **Proof reading.** Documentation row; the sweep agrees.

### websocket-subj-4

- **Site now.** `NodeWebSocket.ts:63-76` contains a direct-construction `@example` with header narrowing and `new NodeWebSocket({ socket, key, head })`. The constructor TSDoc is at `:100-110`, with `@param options` and the `OPTION`-coded `@throws`.
- **Diff at the site.** `@@ -48,11 +55,25 @@` adds the class example; `@@ -76,6 +97,17 @@` adds constructor documentation. The `+` lines contain both required blocks.
- **Old form sweep.** `rg -n -i 'class NodeWebSocket|@example|constructor\(options'` over `src/server/NodeWebSocket.ts`: the class and constructor each have the required documentation; no missing-example state remains.
- **Report reading.** The report marks it `applied`: “`NodeWebSocket` gained an `@example`; its constructor gained a TSDoc block with `@param` and `@throws`.” Current `:63-110` matches.
- **Proof reading.** Documentation row; the class and constructor documentation are present in the diff.

### websocket-subj-6

- **Site now.** Current replacements include `guides/websocket.md:3` (`After`), `:128` (`through`), `:249` (`for example`), `src/server/helpers.ts:115-117`, `src/server/NodeWebSocket.ts:177`, `:188`, `:264`, `:392`, `:491`, `tests/setup.ts:45`, `tests/setupGlobal.ts:8`, and `tests/integration.test.ts:111`.
- **Diff at the site.** Relevant hunks include `@@ -1,6 +1,6 @@`, `@@ -228,21 +245,20 @@`, `@@ -3,14 +3,16 @@`, `@@ -151,9 +183,9 @@`, `@@ -486,7 +520,7 @@`, and the setup/test header hunks. Added `+` prose uses `through`, `for example`, or `after`.
- **Old form sweep.** Case-insensitive `rg -n '\bvia\b|e\.g\.|i\.e\.|^\s*Once\b|\bonce\b|\bsimply\b'` over the owned population, excluding vendored mirrors and policy files: no forbidden temporal/prose hit. Permitted hits are `{ once: true }` code at `NodeWebSocket.ts:195` and `tests/setup.ts:63,64,79,100`; one-time senses at `tests/setupGlobal.ts:1`, `tests/src/server/NodeWebSocket.test.ts:898,1456`, and `tests/integration.test.ts:111`; and `just under 1` at `tests/setupServer.test.ts:85`.
- **Report reading.** The report marks it `applied`: “`via`, `e.g.`, temporal `once`, and `simply` replaced; permitted senses recorded under § Sweeps.” Current sweep matches.
- **Proof reading.** Documentation/comment row; the sweep agrees.

### websocket-subj-7

- **Site now.** `guides/websocket.md:113` uses “preceding Surface row”; `NodeWebSocket.ts:187` uses “preceding head replay” and `:264` identifies the timer after `#fail`; `tests/integration.test.ts:105` says “following echo assertion”; `tests/guides.test.ts:2-4` says “The constants that follow”; `tests/guides.test.ts:45-48` names the assertion.
- **Diff at the site.** Relevant hunks are `@@ -97,46 +104,46 @@`, Node `@@ -151,9 +183,9 @@` and `@@ -374,9 +408,9 @@`, integration `@@ -102,7 +104,7 @@`, and guides-test `@@ -1,6 +1,8 @@` / `@@ -32,8 +42,9 @@`. The obsolete `length checked above` line disappears in the obj-4 hunk.
- **Old form sweep.** `rg -n -i 'rows above|rows below|assertion below|length checked above|the second assertion below|the five constants below'` over the owned population: no hit. Layering/numeric words such as `nothing above it` and `below 126` remain non-positional.
- **Report reading.** The report marks it `applied`: “Positional pointers replaced; the count and the ordinal in `tests/guides.test.ts` removed.” Current sites match.
- **Proof reading.** Documentation/comment row; the sweep agrees.

### websocket-subj-8

- **Site now.** Noun-phrase summaries are at `guides/websocket.md:41` (`createNodeWebSocket`), `:60` (`computeWebSocketAccept`), `:63` (`parseWebSocketFrame`), `:64` (`measureWebSocketFrame`), `:65` (`matchesWebSocketCanonical`), `:66` (`parseUTF8`), and `:68` (`encodeWebSocketFrame`).
- **Diff at the site.** `@@ -48,44 +55,44 @@` replaces the table. The `+` lines contain the five specified summaries plus the amended canonical and UTF-8 summaries.
- **Old form sweep.** `rg -n -i '^\| `[^`]+`.*\|\s*(Create|Derive|Decode|Read|Encode)\b'` over `guides/websocket.md`: no imperative Summary hit.
- **Report reading.** The report marks it `applied`: “Five named Summary cells rewritten as noun phrases, plus the `matchesWebSocketCanonical` row and `parseUTF8`.” Current table matches.
- **Proof reading.** Documentation row; the Summary sweep agrees.

### websocket-subj-10

- **Site now.** `src/server/types.ts:170-171` declares `send(message: string)` and `ping(payload?: string)`; `NodeWebSocket.ts:208-214` implements the same names. `guides/websocket.md:119-120` documents `message` and `payload`.
- **Diff at the site.** `@@ -157,18 +157,18 @@` changes the interface; Node has `@@ -173,23 +205,24 @@`; the guide has `@@ -97,46 +104,46 @@`. The `+` lines contain `send(message)` and `ping(payload)`.
- **Old form sweep.** `rg -n -i '\bsend\(data|\bping\(data'` over the owned source, tests, and guides: no hit.
- **Report reading.** The report marks it `applied`: “`send(message: string)` and `ping(payload?: string)` in the interface, the class, and the guide.” Current sites match.
- **Proof reading.** Naming/documentation row; the sweep agrees.

### websocket-subj-11

- **Site now.** `src/server/constants.ts:65`, `:77`, and `:80` now export `WEBSOCKET_CLOSE_TOO_BIG`, `WEBSOCKET_CONTROL_MAX_LENGTH`, and `WEBSOCKET_CLOSE_REASON_MAX_LENGTH`. References are updated in `NodeWebSocket.ts:25-29`, `:216-244`, `types.ts:78-80`, `helpers.ts:48`, the guide constants/methods/errors rows, and `NodeWebSocket.test.ts`.
- **Diff at the site.** Constants use `@@ -55,14 +55,14 @@` and `@@ -74,7 +74,7 @@`; Node uses the import, method, dispatch, and test hunks; guide changes are in `@@ -48,44 +55,44 @@`, `@@ -97,46 +104,46 @@`, and `@@ -146,8 +153,13 @@`. The exact `+` names are present.
- **Old form sweep.** `rg -n -i '\b(MAXLEN|MAXLENS|MAXLENED|MAXLENING|TOOBIG|TOOBIGS|TOOBIGED|TOOBIGING)\b'` over the package-owned population: no hit.
- **Report reading.** The report marks it `applied`: “`WEBSOCKET_CONTROL_MAX_LENGTH`, `WEBSOCKET_CLOSE_REASON_MAX_LENGTH`, `WEBSOCKET_CLOSE_TOO_BIG`. BREAKING.” Current declarations match.
- **Proof reading.** Naming row; the old-name sweep agrees. Mirror propagation remains required for the MCP and browser guide mirrors.

### fleet-F1

- **Site now.** `isBrowserVuePath` is absent from the owned tree. `Glob` finds no `src/browser/**`, `app/browser/**`, or `tests/setupBrowser.ts`. `tests/setup.ts` retains its other exports, and the `setup` project wiring is untouched.
- **Diff at the site.** No direct fleet-F1 hunk; the helper is already absent, so there is no operative `+` repair.
- **Old form sweep.** `rg -n -i '\bisBrowserVuePath\b'` over the package: no hit.
- **Report reading.** The report marks it `noop`: “`isBrowserVuePath` is absent and the workspace declares no browser environment.” Current paths and sweep match.
- **Proof reading.** No behavioral control is required for a noop.

### fleet-F2

- **Site now.** `src` declares only `WebSocketError` at `src/server/errors.ts:36` and `NodeWebSocket` at `src/server/NodeWebSocket.ts:78`. Neither has a public `readonly id: string` field. No `JSON.stringify` of either implementation instance appears in the owned tests.
- **Diff at the site.** No fleet-F2 hunk; no matching class shape exists.
- **Old form sweep.** `rg -n 'readonly id\s*:\s*string|JSON\.stringify'` over implementation classes and their tests finds no class `id` field or instance serialization.
- **Report reading.** The report marks it `noop`: “No implementation class declares a public `readonly id: string` field.” Current class declarations match.
- **Proof reading.** No behavioral control is required for a noop.

### Across-unit evidence

- **Scope.** Every path in `conform-websocket.status:1-22` is under Owned: `README.md`; `guides/README.md`; `guides/websocket.md`; `src/server/{NodeWebSocket.ts,constants.ts,errors.ts,factories.ts,helpers.ts,index.ts,parsers.ts,types.ts,validators.ts}`; `tests/{guides.test.ts,integration.test.ts,setup.test.ts,setup.ts,setupGlobal.ts,setupServer.test.ts,setupServer.ts}`; and `tests/src/server/{NodeWebSocket.test.ts,factories.test.ts,helpers.test.ts,parsers.test.ts,validators.test.ts}`. No shared or off-limits path appears in the status file.
- **Unmapped diff hunks.** No diff hunk belongs to a file absent from the rows’ Where population. The deleted validator files are covered by websocket-obj-1; the extra setup-server header is covered by websocket-obj-7 and websocket-obj-9.
- **Residue in added diff lines.** `rg -n -i '^\+.*(\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger)'` over the diff hits only legitimate timeout identifiers/prose: `conform-websocket.diff:179,182,231,232,246,395,536,1420,2035`. No skip, only, todo, retry, FIXME, console, or debugger addition appears. The broader requested token sweep also finds code constructs `new NodeWebSocket` at `:376`, `new WebSocketError` at `:443`, `new Error` at `:1127`, `new Set` at `:1635` and `:1803`, and `new EchoServer` at `:1841`.
- **Residue in the tree.** Excluding the vendored policy, config, distribution, and setup-policy tests, the requested sweep reports legitimate existing tokens at `src/server/helpers.ts:133,136,141`; `src/server/factories.ts:42`; `src/server/NodeWebSocket.ts:74,114,120,125,130,135,140,217,237,241,274`; `src/server/parsers.ts:100`; `tests/setupServer.ts:52,53,54,59,184,222`; `tests/integration.test.ts:126,147,197,209`; `tests/setup.ts:61,62`; `tests/setupServer.test.ts:85,144`; `tests/src/server/parsers.test.ts:296,302`; `tests/guides.test.ts:54,58,204`; `tests/src/server/NodeWebSocket.test.ts:227,369,530,803,823,839,861,880,909,946,969,995,1013,1289,1311,1457`; and `tests/setup.test.ts:59`. These are constructors, promises, expected timeout values, numeric comparisons, or test vocabulary, not added debug residue.
- **Parity.** `NodeWebSocketInterface` declares readonly `emitter` at `src/server/types.ts:168` and `readyState` at `:169`; methods are `send` `:170`, `ping` `:171`, `close` `:172`, and `destroy` `:173`. The guide names the properties at `guides/websocket.md:107` and the method rows at `:119-122`. `WebSocketFrame` properties are `types.ts:49-54`, named by the guide’s type row at `:102`; `WebSocketEncodeOptions` properties are `types.ts:65-66`, named at `:103`; `NodeWebSocketOptions` properties are `types.ts:135-145`, named at `:106`. No Methods table is owed for those option/data interfaces. Every added public guide identifier—`createNodeWebSocket`, `NodeWebSocket`, `computeWebSocketAccept`, `isWebSocketKey`, `isWebSocketProtocol`, `parseWebSocketFrame`, `measureWebSocketFrame`, `matchesWebSocketCanonical`, `parseUTF8`, `isCloseCode`, `encodeWebSocketFrame`, all `WEBSOCKET_*` constants, `WebSocketError`, and `NodeWebSocketInterface`—is exported by `src/server/index.ts:1-7`. Non-exports such as `node:stream`, `node:crypto`, `emitter`, `key`, `payload`, and `readyState` are descriptive platform/member terms.
- **Breaking.** The report’s `§ Breaking` entries at `conform-websocket-report.md:163-177` are:
  - `parseWebSocketCanonical` → `matchesWebSocketCanonical`
  - `WEBSOCKET_CONTROL_MAXLEN` → `WEBSOCKET_CONTROL_MAX_LENGTH`
  - `WEBSOCKET_CLOSE_REASON_MAXLEN` → `WEBSOCKET_CLOSE_REASON_MAX_LENGTH`
  - `WEBSOCKET_CLOSE_TOOBIG` → `WEBSOCKET_CLOSE_TOO_BIG`
  
  The report names `@orkestrel/mcp` and `@orkestrel/browser` and says neither imports a removed name, so no consumer source patch is required. Word-boundary sweeps over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding this package and guide mirrors, returned no old-name hits. The MCP and browser guide mirrors still contain the old names at `../mcp/guides/websocket.md:76,79,80` and `../browser/guides/websocket.md:76,79,80`; those are explicitly propagation work, not consumer source imports.
- **Writing sweep.** The added-line prose sweep over `guides/**`, `README.md`, source doc comments, and test titles/comments finds no requested substitution token and no count-pattern hit. The only added diff matches are code lines containing `new`; they are not prose.
- **Gates.** The report records:
  - “`npm run format:check` | `0`” at `conform-websocket-report.md:143`, with `All matched files use the correct format.`
  - “`npm run lint:check` | `0`” at `:144`, with no output.
  - “`npm run check` | `0`” at `:145`, with no diagnostics.
  - “`npm run build` | `0`” at `:146`, with declarations emitted and copied.
  - “`npm test` | `0`” at `:147-149`, with the recorded project test summaries.
  
  The captured `gate-test.txt` confirms `Tests 120 passed`, `111 passed`, `46 passed`, `21 passed`, `22 passed`, and `14 passed` at lines `15`, `29`, `43`, `57`, `71`, and `85`.

## Distillate

- `websocket-obj-1: site now helpers.ts:193/214/239; diff present yes; old form hits 0; report matches yes`
- `websocket-obj-3: site now type imports precede values or were removed with their sole consumer; diff present yes; old form hits 0; report matches yes`
- `websocket-obj-4: site now setupServer.test.ts:135 uses requireValue; diff present yes; old form hits 0; report matches yes`
- `websocket-obj-5: site now setup.ts:77-107 uses waitForEvent with 4000 ms budget; diff present yes; old form hits 0; report matches yes`
- `websocket-obj-6: site now guides.test.ts:195-263 executes flagship fences; diff present yes; old form hits 0; report matches yes`
- `websocket-obj-7: site now setupServer.ts:183-222 owns createEchoServer; diff present yes; old form hits 0; report matches yes`
- `websocket-obj-8: site now setupServer.ts:91 exports buildCorpus(rng); diff present yes; old form hits 0; report matches yes`
- `websocket-obj-9: site now integration.test.ts:1-10 states true gate placement; diff present yes; old form hits 0; report matches yes`
- `websocket-obj-10: site now README.md:16 declares Node.js >= 22.12.0; diff present yes; old form hits 0; report matches yes`
- `websocket-obj-11: site now helpers.ts:91 exports matchesWebSocketCanonical; diff present yes; old form hits 0; report matches yes`
- `websocket-subj-1: site now package-owned AGENTS citations are removed; diff present yes; old form hits 0; report matches yes`
- `websocket-subj-2: site now all documented server examples narrow key; diff present yes; old form hits 0; report matches yes`
- `websocket-subj-3: site now guide Surface row 107 names emitter and readyState; diff present yes; old form hits 0; report matches yes`
- `websocket-subj-4: site now NodeWebSocket class and constructor are documented; diff present yes; old form hits 0; report matches yes`
- `websocket-subj-6: site now banned prose terms are removed while permitted senses remain; diff present yes; old form hits 0; report matches yes`
- `websocket-subj-7: site now positional references are replaced; diff present yes; old form hits 0; report matches yes`
- `websocket-subj-8: site now guide summaries are noun phrases; diff present yes; old form hits 0; report matches yes`
- `websocket-subj-10: site now send(message) and ping(payload); diff present yes; old form hits 0; report matches yes`
- `websocket-subj-11: site now constants use full names; diff present yes; old form hits 0; report matches yes`
- `fleet-F1: site now helper and browser environment are absent; diff present no; old form hits 0; report matches yes`
- `fleet-F2: site now no class has public readonly id: string; diff present no; old form hits 0; report matches yes`
- **Scope:** all status paths are `owned`; no shared or off-limits status path appears.
- **Residue:** no added skip/only/todo/retry/FIXME/console/debugger; timeout hits are legitimate identifiers or documented limits.
- **Writing:** no requested writing-sweep hits in added prose.
- **Parity:** `NodeWebSocketInterface` properties `emitter`/`readyState` and methods `send`/`ping`/`close`/`destroy` match the guide; all added public identifiers are barrelled.

## Unknowns

None. All rows, evidence files, status paths, cited tree sites, sweeps, proof controls, parity surfaces, and gate records were reachable read-only.

## Journal

## Deviation

No tree change was made during this read-only pass. The evidence status remains the unit’s pre-existing dirty state, including the two deleted validator paths and the modified owned files.