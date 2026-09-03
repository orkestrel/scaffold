I’m treating the brief as a read-only evidence audit. I will report only its named sections and will not alter the checkout or evidence files.## Question

For every conform-lsp row, map the current tree, its diff, old-form sweeps, report readings, and proof evidence.

## Evidence

### Per-row

- **lsp-obj-2**
  - **Site now:** `tests/setupConformance.test.ts:15-17` imports `createScratch`, `destroyScratch`, and `readFileSync`; `:72-85` creates the scratch, writes `metaModel.json`, and awaits cleanup in `finally`.
  - **Diff:** `@@ -12,8 +12,8 @@`; `@@ -69,21 +69,19 @@`. The operative repair is present: `+import { createScratch, destroyScratch } from '@orkestrel/test/server'` and `+await destroyScratch(scratch)`.
  - **Old form sweep:** Pattern `\b(mkdirSync|mkdtempSync|rmSync|writeFileSync)\b`, paths `src/**`, `tests/**`, `guides/lsp.md`, `guides/README.md`, `README.md`: 36 hits, all retained in `tests/setupPolicy.ts`, `tests/config.test.ts`, or `tests/distribution.test.ts`; no hit in `tests/setupConformance.test.ts`. Pattern `node:path|join|resolve` over that file: no hit.
  - **Report:** “`createScratch` / `destroyScratch` adopted; `node:path` import deleted whole.” Matches the tree.
  - **Proof:** `lsp-obj-2-red.txt`: `Tests 1 failed | 12 skipped (13)`; `lsp-obj-2-green.txt`: `Tests 13 passed (13)`. Both controls exist.

- **lsp-obj-3**
  - **Site now:** `tests/src/core/validators.test.ts:30-36` declares `LookalikeError`; `:161-177` includes brand and code-membership vectors.
  - **Diff:** `@@ -27,6 +27,14 @@`; `@@ -156,10 +164,17 @@`. The repair is present at `:172` and `:175-177`.
  - **Old form sweep:** No removed or renamed symbol; no old-form hits.
  - **Report:** “`LookalikeError` and the redefined-`code` vector added; each pins a distinct guard line.” Matches the tree.
  - **Proof:** `lsp-obj-3-red-brand.txt` and `lsp-obj-3-red-codes.txt`: each `Tests 1 failed | 138 skipped (139)`; `lsp-obj-3-green.txt`: `Tests 1 passed | 138 skipped (139)`. All controls exist.

- **lsp-obj-5**
  - **Site now:** `protocol.mjs:18-20`, `:29-30`, `:40-56`, and `:65-68` own `frame`, `reply`, `drain`, and `listen`. `peer.mjs:9-11`, `:57-67`, and `holder.mjs:18-20`, `:74-78` retain local behavior and call `listen(handle)`.
  - **Diff:** `protocol.mjs` uses `@@ -0,0 +1,69 @@`; peer uses `@@ -6,18 +6,9 @@` and `@@ -63,28 +54,7 @@`; holder uses `@@ -15,6 +16,7 @@`, `@@ -24,17 +25,6 @@`, and `@@ -81,28 +71,7 @@`. The shared imports and calls are present.
  - **Old form sweep:** Pattern `function (frame|reply|drain)\(` over `tests/src/server/fixtures`: only `protocol.mjs:18`, `:29`, and `:40`; no duplicate definitions remain in peer or holder. Pattern `process.stdin.on('data', ...)`: only `protocol.mjs:66`.
  - **Report:** “`protocol.mjs` added; `peer.mjs` and `holder.mjs` import `frame`, `reply`, `listen`.” Matches the tree.
  - **Proof:** `lsp-obj-5-red.txt`: `Tests 12 failed | 9 passed (21)`; `lsp-obj-5-green.txt`: `Tests 21 passed (21)`. Both controls exist.

- **lsp-obj-6**
  - **Site now:** `holder.mjs:38` emits `performance.now()` and `:40` uses it for the elapsed deadline.
  - **Diff:** `@@ -45,9 +35,9 @@ function hold()`. Both replacement lines are present.
  - **Old form sweep:** Pattern `Date\.now\(\)` over the required paths: no hit.
  - **Report:** “The generated grandchild program measures elapsed time with `performance.now()`.” Matches the tree.
  - **Proof:** Binding control `lsp-obj-6-red-sole-deadline.txt`: `Tests 2 failed | 1 passed (3)`; green control: `Tests 3 passed | 18 skipped (21)`. The earlier `lsp-obj-6-red.txt` records `Tests 3 passed (3)` and is correctly described by the report as non-binding.

- **lsp-obj-7**
  - **Site now:** `tests/integration.test.ts:1-2` imports the core and server APIs; `:11` imports `./setupServer.js`; `:16` names the cross-environment composition.
  - **Diff:** Rename hunk `@@ -8,12 +8,12 @@`; the destination and import rewrite are present.
  - **Old form sweep:** Pattern `tests/src/server/integration\.test\.ts` over the required paths: no hit. Pattern `\.\./\.\./setupServer\.js`: two unrelated hits remain in `tests/src/server/factories.test.ts:10` and `tests/src/server/transports/StdioClientTransport.test.ts:17`; none is the moved file.
  - **Report:** “Proof moved to `tests/integration.test.ts`; project and script registered.” Matches the tree.
  - **Proof:** `lsp-obj-7-red.txt`: `Tests 2 failed | 44 passed (46)`; `lsp-obj-7-green-config.txt`: `Tests 46 passed (46)`; integration control: `Tests 1 passed (1)`. All controls exist.

- **lsp-subj-1**
  - **Site now:** `src/server/types.ts:33-41` declares `on`, `error`, `server`, and `grace`; `StdioClientTransport.ts:44-50` declares the emitter field; `:58-70` initializes it with both options. `factories.ts:6-12` documents the hooks.
  - **Diff:** Types `@@ -1,9 +1,15 @@` and `@@ -25,6 +31,8 @@`; implementation `@@ -42,7 +42,7 @@` and `@@ -55,9 +55,14 @@`. The constructor spread is present.
  - **Old form sweep:** No renamed or removed name; no old-form hits.
  - **Report:** “`on` and `error` declared and threaded; guide, factory, and Surface row updated.” Matches the tree.
  - **Proof:** `lsp-subj-1-red.txt`: `Tests 1 failed | 20 skipped (21)`; green: `Tests 1 passed | 20 skipped (21)`. Both controls exist.

- **lsp-subj-2**
  - **Site now:** `src/core/types.ts:360-373` documents `start`; `:392-402` documents `close`. Guide rows are `guides/lsp.md:311-314`.
  - **Diff:** Types `@@ -320,6 +357,19 @@` and `@@ -338,6 +388,17 @@`; guide `@@ -297,12 +306,12 @@`. The write-path `closed` clause is present.
  - **Old form sweep:** No renamed or removed name; no old-form hits.
  - **Report:** “`start` and `close` doc blocks added; guide Behavior cells extended.” Matches the tree.

- **lsp-subj-3**
  - **Site now:** `src/core/errors.ts:5-18` retains the description and adds the `@example` fence.
  - **Diff:** `@@ -2,7 +2,19 @@`. The example constructs `LSPError` and checks `code` and `isLSPError`.
  - **Old form sweep:** No renamed or removed name; no old-form hits.
  - **Report:** “`@example` added to the `LSPError` class doc.” Matches the tree.

- **lsp-subj-4**
  - **Site now:** `guides/lsp.md:3-9` is the requested blockquote tagline with `src/core` and `src/server` links.
  - **Diff:** `@@ -1,7 +1,12 @@`. The operative blockquote text is present.
  - **Old form sweep:** Patterns `The core package provides` and the former opening sentence over the required paths: no hit.
  - **Report:** “Blockquote noun-phrase tagline with the `src/core` and `src/server` source pointer.” Matches the tree.

- **lsp-subj-5**
  - **Site now:** `README.md:3-17` contains the tagline and install section; `:24-40` contains the usage fence. The fence calls `start()` and `destroy()` but does not open a document or use an `AbortSignal`.
  - **Diff:** `@@ -1,10 +1,60 @@`. The added fence is `+await client.start()` followed directly by `+await client.destroy()`, so the operative usage repair is incomplete.
  - **Old form sweep:** Patterns `The @orkestrel/lsp package`, `^## Development$`, `^npm install$`, and `^npm test$`: no hit.
  - **Report:** “README rewritten on the `process` form; `## Development` deleted.” This matches the broad rewrite, but does not account for the missing `open()` and `AbortSignal` steps.

- **lsp-subj-6**
  - **Site now:** `package.json:4-11` has the descriptive sentence and the seven requested keywords.
  - **Diff:** `@@ -1,8 +1,16 @@`. Description and keyword values are present.
  - **Old form sweep:** Former description and empty-keyword form: no hit.
  - **Report:** “`description` and `keywords` set.” Matches the tree.

- **lsp-subj-7**
  - **Site now:** `src/core/types.ts:143-158` documents `LSPDocumentDiagnosticReport` and explains the protocol `kind` field.
  - **Diff:** `@@ -125,14 +129,24 @@`. The operative `@remarks` text is present.
  - **Old form sweep:** No renamed or removed name; no old-form hits.
  - **Report:** “`LSPDocumentDiagnosticReport` names the format it transliterates.” Matches the tree.

- **lsp-subj-8**
  - **Site now:** Remarks appear on `LSPTextDocumentItem` at `src/core/types.ts:83-90`, `LSPDocumentDiagnosticParams` at `:132-140`, `LSPInitializeParams` at `:204-215`, `LSPInitializeResult` at `:231-239`, plus the three extended types at `:163-176`, `:179-188`, and `:217-230`.
  - **Diff:** Type hunks `@@ -80,7 +80,11 @@`, `@@ -125,14 +129,24 @@`, `@@ -147,7 +161,12 @@`, `@@ -156,7 +175,11 @@`, `@@ -179,7 +202,12 @@`, `@@ -187,7 +215,12 @@`, and `@@ -195,7 +228,11 @@`. All operative remarks are present.
  - **Old form sweep:** No renamed or removed name; no old-form hits.
  - **Report:** “Four ruled types plus the three the refuter extended to.” Matches the tree.

- **fleet-F1**
  - **Site now:** `tests/setup.ts:1-4` exports only `WORKSPACE_ROOT`; `isBrowserVuePath` is absent. Browser paths `src/browser/**`, `app/browser/**`, and `tests/setupBrowser.ts` do not exist.
  - **Diff:** No hunk changes `tests/setup.ts`; `tests/setup.test.ts` is added with `@@ -0,0 +1,31 @@`.
  - **Old form sweep:** `isBrowserVuePath` over the checkout excluding `node_modules`: no hit.
  - **Report:** “`isBrowserVuePath` is absent from the checkout” is correct. The later statement “no `tests/setup.test.ts` exists in the tree” is false; the file exists at `tests/setup.test.ts:1-31`. The noop disposition remains supported because the helper is absent.

- **fleet-F2**
  - **Site now:** The implementation classes are `LSPError` at `src/core/errors.ts:18`, `LSPClient` at `src/core/LSPClient.ts:78`, and `StdioClientTransport` at `src/server/transports/StdioClientTransport.ts:44`. None has a public `readonly id: string` field.
  - **Diff:** No relevant diff hunk.
  - **Old form sweep:** Pattern `readonly id: string|#id: string|get id\(\)` over `src/**`: no hit.
  - **Report:** “No class declares a public `readonly id: string` data field.” Matches the tree. No relevant class serialization fence was found.

### Across the unit

- **Scope:** The supplied status lists only Owned paths: `README.md`, `guides/lsp.md`, `package.json`, the changed `src` files, the integration-test rename, `tests/setup.test.ts`, the changed conformance and validator tests, the three fixtures, the transport test, and `vite.config.ts`. No shared or off-limits path appears.
- **Diff hunks without a literal Where path:** `tests/src/server/fixtures/protocol.mjs @@ -0,0 +1,69 @@` and `tests/src/server/transports/StdioClientTransport.test.ts @@ -23,12 +23,53 @@`; both are explicitly named by the corresponding repair/evidence.
- **Residue in added diff lines:** Pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` hits only `conform-lsp.diff:112` and `:318`, both documented `timeout` clauses. No added skip, only, todo, retry, TODO, FIXME, console, or debugger residue.
- **Residue in `src` and `tests`, excluding the four vendored files:** `timeout` remains at `src/core/constants.ts:28,37,68`, `src/core/factories.ts:7`, `src/core/helpers.ts:320,324,335,336`, `src/core/LSPClient.ts:63,82,108,362,365,543-548,661,672,677`, `src/core/types.ts:335,369,387,404,408`, `src/server/transports/StdioClientTransport.ts:134,180,246`, `tests/integration.test.ts:26,49`, and `tests/src/core/LSPClient.test.ts:251,253,261,505,532,550-553,576,613,660,695,714-715,722,1111,1145,1291,1414,1471,1485,1493`. Fixture `debugger` data remains at `tests/setupServer.ts:48,51,55`. These are existing functional terms, not added residue.
- **Parity:** `guides/README.md:16-20` still maps `src/core` and `src/server` to `guides/lsp.md` and their tests. No `AGENTS §` citation occurs in touched files.

- **Gates quoted from the report:**  
  - “`npm run format:check` | 0 | All matched files use the correct format”
  - “`npm run lint:check` | 0 | No diagnostic”
  - “`npm run check` | 0 | Root, `check:src:core`, and `check:src:server` all clean”
  - “`npm run build` | 0 | Core and server faces built, declarations copied”
  - “`npm test` | 0 | src 159 passed; policy 111; setup 13; config 46; guides 27; conformance 243; integration 1”
  - The report’s later fix-round table instead claims `npm test` passed with setup at 15 tests and `npx scaffold audit --offline` exited 0. The available `gate-test.txt` records setup at 13 tests, and `scaffold-audit.txt` records exit 1 with `vite.config.ts` stale and `tests/setup.ts` uncovered.

- **Breaking:** The report says, “None. `StdioClientTransportOptions` gained two optional members, so every existing construction still typechecks. No published symbol was renamed or removed.” No renamed or removed published symbol exists, so no fleet-wide breaking-name sweep applies.

- **Writing sweep:** Over added prose lines in `guides/**`, `README.md`, source doc comments, and test comments/titles:
  - Required banned-word pattern: no prose hits.
  - Growable-count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`: no hits.
  - Raw matches for `new` occur only in added code or code fences, including `conform-lsp.diff:182,379,453,461,548,551,790,804`; they are not prose uses.

## Distillate

- `lsp-obj-2`: site now `tests/setupConformance.test.ts:15,72-85` | diff present yes | old form hits 36 retained vendored hits, 0 target hits | report matches yes
- `lsp-obj-3`: site now `tests/src/core/validators.test.ts:33-36,161-177` | diff present yes | old form hits 0 | report matches yes
- `lsp-obj-5`: site now shared helpers in `protocol.mjs:18,29,40,65` | diff present yes | old duplicate-definition hits 0 | report matches yes
- `lsp-obj-6`: site now `holder.mjs:38,40` | diff present yes | old form hits 0 | report matches yes
- `lsp-obj-7`: site now `tests/integration.test.ts:1-16` | diff present yes | old target-path hits 0 | report matches yes
- `lsp-subj-1`: site now `src/server/types.ts:33-41`, transport `:44,58-70` | diff present yes | old form hits 0 | report matches yes
- `lsp-subj-2`: site now `src/core/types.ts:360-373,392-402` | diff present yes | old form hits 0 | report matches yes
- `lsp-subj-3`: site now `src/core/errors.ts:5-18` | diff present yes | old form hits 0 | report matches yes
- `lsp-subj-4`: site now `guides/lsp.md:3-9` | diff present yes | old form hits 0 | report matches yes
- `lsp-subj-5`: site now `README.md:3-40` | diff present yes | old form hits 0 | report matches no
- `lsp-subj-6`: site now `package.json:4-11` | diff present yes | old form hits 0 | report matches yes
- `lsp-subj-7`: site now `src/core/types.ts:143-158` | diff present yes | old form hits 0 | report matches yes
- `lsp-subj-8`: site now `src/core/types.ts:83-90,132-140,163-188,204-239` | diff present yes | old form hits 0 | report matches yes
- `fleet-F1`: site now helper absent; `tests/setup.test.ts` exists | diff present yes | old form hits 0 | report matches no
- `fleet-F2`: no matching class shape | diff present no | old form hits 0 | report matches yes

Scope: all supplied status paths are Owned; no Shared or Off-limits path appears.

Residue: no added forbidden residue except legitimate `timeout` documentation at `conform-lsp.diff:112,318`; existing functional `timeout` and fixture `debugger` terms remain at the listed source/test locations.

Writing: no required prose hits and no growable-count hits.

Parity:

| Entity | Type members | Guide methods/surface |
|---|---|---|
| `LSPClientInterface` | `start`, `open`, `close`, `destroy` at `src/core/types.ts:373,390,402,411`; `emitter`, `capabilities`, `encoding` at `:357-359` | Methods `guides/lsp.md:311-314`; surface `:343` |
| `LSPTransportInterface` | `start`, `send`, `close` at `src/core/types.ts:279-281` | Methods `guides/lsp.md:319-322` |
| `StdioClientTransportInterface` | inherited transport methods; `pid` at `src/server/types.ts:54-56` | Surface `guides/lsp.md:334` |
| `StdioClientTransportOptions` | `on`, `error`, `server`, `grace` at `src/server/types.ts:33-41` | Surface `guides/lsp.md:335`; it names hooks, command, and window but does not spell out directory/environment |
| Wire-body types | `LSPTextDocumentItem`, `LSPDocumentDiagnosticParams`, `LSPDocumentDiagnosticReport`, `LSPTextDocumentSyncOptions`, `LSPDiagnosticOptions`, `LSPInitializeParams`, `LSPServerCapabilities`, `LSPInitializeResult` at `src/core/types.ts:88,137,150,170,183,211,224,236` | Entities `guides/lsp.md:385-412` |
| `LSPError` | class at `src/core/errors.ts:18`; no call-signature interface | Surface `guides/lsp.md:366` |

Added guide identifiers resolve through the barrels: `LSPClient` at `src/core/index.ts:8`; `StdioClientTransport` at `src/server/index.ts:3`; `createStdioClientTransport` and `StdioClientTransportOptions` through `src/server/index.ts:1-2`; core types and `LSPTransportEventMap` through `src/core/index.ts:1`. `on`, `error`, `emitter`, `start`, `open`, `close`, and `destroy` are interface members rather than standalone barrel exports.

## Unknowns

None of the row sites, supplied diffs, reports, control files, or parity paths were unreachable.

## Journal

Leave this line for the driver.

## Deviation

The read-only `git status --short` containment command was rejected by the shell tool. Containment therefore relies on the supplied `/home/user/work/evidence/conform-lsp.status`, which lists only Owned paths.