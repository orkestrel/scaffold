## Question

Audit the `unit conform-mcp` changes against the brief, evidence files, diff, report, and repository tree, read-only, with current `file:line` evidence, old-form sweeps, proof results, parity checks, gates, breaking changes, residue, unknowns, and deviations.

## Evidence

### mcp-obj-1

- Site now:
  - `src/browser/constants.ts:32`: no `MCP_WEBSOCKET_SUBPROTOCOL`; the file ends with browser defaults.
  - `src/server/constants.ts:41`: no declaration; the server constants now document that the wire token lives in core.
  - `src/core/constants.ts:175`: `export const MCP_WEBSOCKET_SUBPROTOCOL = 'mcp'`, immediately following its TSDoc block.
  - `src/core/index.ts:1-2`: core exports `types` and `constants`.
- Diff:
  - `conform-mcp.diff:512` — browser declaration removed.
  - `conform-mcp.diff:734` — core declaration and merged documentation added; operative `+export const MCP_WEBSOCKET_SUBPROTOCOL = 'mcp'` is present.
  - `conform-mcp.diff:1039` — server declaration removed.
  - Import retargeting appears at `conform-mcp.diff:537,566,575,788,1134,1143`.
- Old-form sweep:
  - No stale declaration in `src/browser/constants.ts` or `src/server/constants.ts`.
  - No old subpath import remains in the named source/test locations.
  - Current intentional symbol references are core-owned and documented.
- Report: `conform-mcp-report.md:22` — “`applied` … moved to `src/core/constants.ts`; both face copies deleted; every importer, doc link, test, fixture, and guide row retargeted.”
- Proof:
  - Failing first: `mcp-obj-1-control-red.txt` — `tsc` reports two missing exports from `@src/core`.
  - Passing: `mcp-obj-1-green-check.txt` — `check:src:core`, `check:src:browser`, and `check:src:server` all complete without errors.

### mcp-obj-2

- Site now: `package.json:93` reads:
  - `"prepublishOnly": "npm run format:check && npm run lint:check && npm run check && npm run build && npm test && npm run test:distribution -- --mode release"`
- Context: `package.json:91` is `build:src:server`; `package.json:92` is `prepack`; `package.json:94` is `test:bench`.
- Diff: `conform-mcp.diff:490` — the `prepublishOnly` hunk; operative `+... npm run check && npm run build ...` is present.
- Old-form sweep: no stale script form; no old name applies.
- Report: `conform-mcp-report.md:23` — “`applied` … `prepublishOnly` now runs `check` before `build`.”
- No dedicated behavioral proof was required; the report’s gate table supplies the corresponding command result.

### mcp-obj-3

- Site now: `src/core/MCPServer.ts:225` is public `handle`; `src/core/MCPServer.ts:261` is private `#dispatch`; `src/core/MCPServer.ts:324` is `#register`.
- Smallest ordering excerpt: `handle` precedes `#dispatch`, and `#dispatch` precedes `#register`.
- Diff: `conform-mcp.diff:587` adds the `handle`-before-`#dispatch` placement; `conform-mcp.diff:624` removes the former private-method placement. The operative placement is present.
- Old-form sweep: no stale placement/name hit.
- Report: `conform-mcp-report.md:24` — “`applied` … `MCPServer.#dispatch` moved after `handle`, before `#register`.”
- This is a structural inspection; no separate behavioral proof file was named.

### mcp-obj-4

- Site now: `src/core/transports/HTTPClientTransport.ts:156` closes the transport; `:169` defines `#stamp`; `:177` defines `#exchange`; `:218` defines `#buildHeaders`.
- Diff: `conform-mcp.diff:851` adds the methods after `close`; `conform-mcp.diff:871` removes their former location. The operative order is present.
- Old-form sweep: no stale placement/name hit.
- Report: `conform-mcp-report.md:25` — “`applied` … `HTTPClientTransport.#stamp` and `#exchange` moved after `close`, before `#buildHeaders`.”
- This is a structural inspection; no separate behavioral proof file was named.

### mcp-obj-5

- Site now:
  - `src/browser/transports/MessagePortTransport.ts:64-70`: class declaration and private message handler.
  - `:80-100`: `send`, `listen`, `closed`, and idempotent `close`.
  - `:108-111`: non-string inbound data is dropped; strings reach the registered handler.
  - `tests/src/browser/transports/MessagePortTransport.test.ts:1`: dedicated direct class-behavior test file exists.
- Diff:
  - `conform-mcp.diff:1455` removes the seven class cases from `tests/src/browser/factories.test.ts`.
  - `conform-mcp.diff:1562` adds the new 109-line test file.
  - The operative direct-class tests are present.
- Old-form sweep: no stale test-file placement remains.
- Report: `conform-mcp-report.md:26` — “`applied` … the seven class-behaviour cases moved into it and driven through the class directly.”
- Proof:
  - Failing first: `mcp-obj-5-control-red.txt` — browser test summary: “`Tests 4 failed | 3 passed (7)`.”
  - Passing: `mcp-obj-5-green-browser.txt` — “`Test Files 3 passed (3)`” and “`Tests 60 passed (60)`.”

### mcp-subj-1

- Site now:
  - `src/server/types.ts:209`: `readonly session?: MCPSessionOptions`.
  - `src/server/middlewares.ts:96`: `const sessionOptions = options?.session ?? {}`.
  - `src/server/middlewares.ts:183-186`: the minted session receives `...sessionOptions`.
- Diff: `conform-mcp.diff:1103,1112,1172`; operative `session?: MCPSessionOptions` and whole-group forwarding are present.
- Old-form sweep:
  - No production `MCPSessionMiddlewareOptions.capacity`.
  - Two compatibility mentions remain in `tests/src/server/middlewares.test.ts:95,114`, where the test helper accepts legacy-shaped input and maps it under `session`.
- Report: `conform-mcp-report.md:27` — “`applied` … `capacity` replaced by `session?: MCPSessionOptions`; the middleware forwards the whole group.”
- Proof:
  - Failing first: `mcp-subj-1-2-control-red.txt` — server test summary: “`Tests 1 failed | 33 passed (34)`.”
  - Passing: `mcp-subj-1-2-green-server.txt` — “`Test Files 12 passed (12)`” and “`Tests 372 passed | 1 skipped (373)`.”

### mcp-subj-2

- Site now:
  - `src/server/types.ts:171`: `MCPSessionOptions`.
  - `src/server/types.ts:209-210`: middleware `session` and `clock`.
  - `src/server/MCPSession.ts:68`: `readonly #clock: () => number`.
  - `:75`: `this.#clock = options?.clock ?? Date.now`.
  - `:90`: `push(message: JSONRPCMessage)`.
  - `:99`: `replay(afterId: string)`.
  - `src/server/middlewares.ts:183-186`: middleware clock reaches the session.
- Old-form sweep:
  - No `push(message, now)` or `replay(afterId, now)` signature remains.
  - Generic `now` occurrences are unrelated clock properties, `Date.now`, and test timing.
- Diff: `conform-mcp.diff:957,971,986,1008,1103,1112,1172,1191`; operative clock injection and one-argument methods are present.
- Report: `conform-mcp-report.md:28` — “`applied` … `MCPSessionOptions.clock` added; `push`/`replay` lost their `now` parameter; the middleware's clock reaches the minted session's log sweep.”
- Proof: same failing-first and passing server results as mcp-subj-1.

### mcp-subj-4

- Site now:
  - `src/core/helpers.ts:101`: `supportsFormElicitation`.
  - `src/core/helpers.ts:203`: `supportsTask`.
  - `src/core/MCPServer.ts:89`: imports `supportsTask`.
  - `src/core/MCPServer.ts:859`: calls `supportsTask(...)`.
- Guide references:
  - `guides/mcp.md:1368,1406-1407`: `supportsFormElicitation`.
  - `guides/mcp.md:1632,1659`: `supportsTask`.
  - `guides/mcp.md:2248,2265`: helper table rows.
- Old-form sweep: no `isFormElicitationSupported` or `isTaskSupported` hits in the named source, test, or guide locations.
- Diff: `conform-mcp.diff:803,812,90,98,126,136`; operative renamed imports, declarations, and examples are present.
- Report: `conform-mcp-report.md:29` — “`applied` — `isFormElicitationSupported` → `supportsFormElicitation`, `isTaskSupported` → `supportsTask`.”
- Proof:
  - Failing first: `mcp-subj-4-control-red.txt` — `check` reports duplicate `context`, invalid `capabilities`, and stale `listen`.
  - Passing: `mcp-subj-4-green-core.txt` — “`Test Files 17 passed (17)`” and “`Tests 909 passed (909)`.”

### mcp-subj-5

- Site now:
  - `guides/mcp.md:1913-1914`: `const outcome = await client.call(...)` and `outcome → { resultType: 'complete', value: 7 }`.
  - `README.md:60`: uses `outcome`.
  - `tests/guides.test.ts:1477`: executes the same call; `:1487` expects `{ resultType: 'complete', value: 7 }`.
- Diff: `conform-mcp.diff:198` changes the guide fence; `conform-mcp.diff:1258` adds the executable guide test. Operative text and test are present.
- Old-form sweep: no stale `const value = await client.call` in the named guide/readme locations.
- Report: `conform-mcp-report.md:30` — “`applied` — The loopback fence binds `outcome` and states the real outcome shape; the fence is transcribed and executed in `tests/guides.test.ts`.”
- Proof:
  - Failing first: `mcp-subj-5-control-red.txt` — “`Tests 1 failed | 159 passed (160)`.”
  - Passing: `mcp-subj-5-green.txt` — “`Test Files 1 passed (1)`” and “`Tests 160 passed (160)`.”

### mcp-subj-6

- Site now:
  - `src/core/types.ts:850`: “Executes one canonical tool call or returns a fully formed complete MCP result.”
  - `src/core/types.ts:1066`: “Creates — or returns the existing — durable task…”
- Diff: `conform-mcp.diff:895,904`; both first sentences use third-person verb agreement.
- Old-form sweep: no stale `return`/`create` first-person form remains at the named sites.
- Report: `conform-mcp-report.md:31` — “`applied` — Both first sentences read in the third person throughout.”
- This is a prose inspection; no separate behavior proof was required.

### mcp-subj-7

- Site now:
  - `src/core/types.ts:1465`: `export interface MCPCompletionInterface`.
  - `:1468-1470`: `complete(...)` and its TSDoc.
  - `guides/mcp.md:2394`: completion interface table row.
  - `guides/mcp.md:3433`: completion methods heading.
- Old-form sweep: no `MCPCompletionManagerInterface` hit in source, tests, or guide.
- Diff: `conform-mcp.diff:922`; the renamed interface and disambiguating TSDoc are in `+` lines.
- Report: `conform-mcp-report.md:32` — “`applied` — `MCPCompletionManagerInterface` → `MCPCompletionInterface`, with the disambiguating TSDoc sentence the row required.”
- Proof:
  - Failing first: `mcp-subj-7-8-control-red.txt` — `check` reports duplicate `context`, missing `capabilities`, and stale `listen`.
  - Passing: `mcp-subj-7-8-green-check.txt` — `check:src:core`, `check:src:browser`, and `check:src:server` complete without errors.

### mcp-subj-8

- Site now:
  - `src/core/types.ts:1185-1189`: `MCPTaskOptions` contains `readonly deferral`.
  - `src/core/types.ts:1699-1704`: `MCPSubscriptionOptions` contains `readonly producer`.
  - `src/core/MCPServer.ts:841`: calls `configured.deferral`.
  - `src/core/MCPServer.ts:1419`: calls `configured.producer`.
- Guide rows:
  - `guides/mcp.md:2432`: `{ tasks; deferral }`.
  - `guides/mcp.md:2453`: `{ notifications; producer }`.
- Old-form sweep:
  - No `MCPTaskOptions.defer` or `MCPSubscriptionOptions.listen`.
  - Generic unrelated hits remain: `src/core/types.ts:2347` is the transport `listen` method; `tests/src/core/MCPServer.test.ts:3220` is a JSON-RPC request named `listen`.
  - `defer` appears five times in unrelated implementation/test prose or identifiers: `src/core/MCPServer.ts:802,833`, `src/core/types.ts:1170`, and `tests/src/core/MCPServer.test.ts:4969,5043`.
- Diff: `conform-mcp.diff:913,935,136,140,153,162,171`; operative key renames are present.
- Report: `conform-mcp-report.md:33` — “`applied` — `MCPTaskOptions.defer` → `deferral`, `MCPSubscriptionOptions.listen` → `producer`.”
- Proof: same failing-first and passing `check` results as mcp-subj-7.

### mcp-subj-9

- Site now:
  - `src/core/helpers.ts:1619`: “what the request must carry.”
  - `guides/mcp.md`: no case-insensitive `should` hit.
  - Named changed prose sites contain no banned-sense `should`.
- Diff: `conform-mcp.diff:838`; operative `+...must carry...` is present.
- Old-form sweep:
  - No `should` in `guides/mcp.md`.
  - Remaining package hits are unrelated or permitted:
    - `tests/src/core/MCPServer.test.ts:5239`: “the paragraph should be deleted.”
    - `tests/setup.ts:1217`: “a client should ask again.”
    - `tests/setupConformance.ts:1317`: user-facing prompt text.
    - vendored schema text under `tests/mirrors/...`.
- Report: `conform-mcp-report.md:34` — “`applied` — Both banned-sense `should` occurrences the row names are gone.”
- This is a prose inspection; no separate behavior proof was required.

### Across-unit: Scope

Status paths are all tagged `owned`:

`README.md`, `guides/mcp.md`, `package.json`, all listed `src/browser/*`, `src/core/*`, `src/server/*`, `tests/fixtures/browserServer.ts`, `tests/guides.test.ts`, `tests/setup.ts`, `tests/setupConformance.ts`, `tests/src/browser/factories.test.ts`, `tests/src/browser/transports/MessagePortTransport.test.ts`, `tests/src/core/MCPLegacy.test.ts`, `tests/src/core/MCPServer.test.ts`, `tests/src/core/helpers.test.ts`, `tests/src/core/validators.test.ts`, `tests/src/server/MCPSession.test.ts`, `tests/src/server/handlers.test.ts`, and `tests/src/server/middlewares.test.ts`.

- `shared`: none.
- `off-limits`: none.
- No diff hunk was found whose file fell outside the row-owned paths or their explicitly named consumer/test repairs. Shared-file report: `conform-mcp-report.md:256` — “None. No file outside Owned needed an edit…”

### Across-unit: Residue

- Added diff lines: no hits for `TODO`, `FIXME`, `console.`, `.skip()`, `.only()`, `@ts-ignore`, `@ts-expect-error`, `eslint-disable`, or `prettier-ignore`.
- Current `src/**/*.ts`: no hits for those patterns.
- Current `tests/**/*.ts` hits are pre-existing policy/distribution fixtures:
  - `tests/distribution.test.ts:786,910` — `context.skip(...)`.
  - `tests/setupPolicy.ts:1236,1238,1251,1277,1279,1285,1354,1399,1573,2349,2351,2353,2357,2363,2365,2368,2374,2379,2381,2383,2389,2611,2613,2618,2661,2663,2664,2671,2677,2678,2680,2687` — documented/template `TODO` policy fixtures.
  - `tests/config.test.ts:687` — `console.info(...)`.
- None of these appears as a new residue line in `conform-mcp.diff`.

### Across-unit: Parity

- Core barrel exports types, constants, and helpers at `src/core/index.ts:1-7`.
- `MCPCompletionInterface.complete`:
  - Source: `src/core/types.ts:1465-1479`.
  - Guide: `guides/mcp.md:2394`, methods heading `:3433`.
- `MCPTaskManagerInterface`:
  - Source: `src/core/types.ts:1064`.
  - Guide: `guides/mcp.md:2430`, methods heading `:3381`.
- `MCPTaskContext` and `MCPTaskOptions`:
  - Source: `src/core/types.ts:1039,1185`.
  - Guide: `guides/mcp.md:2429,2432`.
- `MCPSubscriptionOptions`:
  - Source: `src/core/types.ts:1699-1704`.
  - Guide: `guides/mcp.md:2453`.
- `MCPSessionOptions` and `MCPSessionMiddlewareOptions`:
  - Source: `src/server/types.ts:171,206`.
  - Guide: `guides/mcp.md:2733-2734`.
- The parity test enforces the relevant relationships:
  - `tests/guides.test.ts:597-609` checks direct exports, documented surfaces, and exact guide/source symbol parity.
  - `tests/guides.test.ts:610` checks that the guide documents only barrel exports.
- No stranded or phantom identifier was found in the inspected changed surfaces.
- Added guide identifiers are exported from the appropriate barrel: core identifiers through `src/core/index.ts:1-7`; server session identifiers through `src/server/index.ts:1-10`.

### Across-unit: Gates

Quoted from `conform-mcp-report.md:224-229`:

| Gate | Exit | Reading |
| --- | --- | --- |
| `npm run format:check` | 0 | “All matched files use the correct format.” over 126 files |
| `npm run lint:check` | 0 | no output |
| `npm run check` | 0 | no output |
| `npm run build` | 0 | no output |
| `npm test` | 0 | src 32 files / 1341 passed, 1 skipped; policy 111; config 46; setup 5 files / 86; guides 160; conformance 47; integration 4 |

### Across-unit: Breaking

Independent old-symbol sweeps found no hits in:

- `/home/user/fleet/probe/src`
- `/home/user/fleet/probe/tests`
- `/home/user/scaffold/src`

The report identifies `@orkestrel/probe` as the only fleet dependent and says its imports are unaffected: `conform-mcp-report.md:241`.

Report table at `conform-mcp-report.md:245-248` records no consumer edits required for:

- `MCP_WEBSOCKET_SUBPROTOCOL` moving to core.
- Both helper renames.
- `MCPCompletionManagerInterface` → `MCPCompletionInterface`.
- `defer` → `deferral`, `listen` → `producer`, `capacity` → `session`, and removal of `now` parameters.

The report still records follow-up operational work at `conform-mcp-report.md:250`: probe needs a re-pin and gate rerun, and its vendored guide mirror refreshes at the wave.

### Across-unit: Writing sweep

In added prose outside code fences:

- `should`: 0.
- `new`: 0.
- Number words: 13 hits, all quoted below.

`conform-mcp.diff:187` — “two different calls”  
`conform-mcp.diff:188` — “two principals” and “one reading”  
`conform-mcp.diff:190` — “one does”  
`conform-mcp.diff:266` — “the one spelling”  
`conform-mcp.diff:269` — “one parameter”  
`conform-mcp.diff:270` — “one modern”  
`conform-mcp.diff:272` — “names which one”  
`conform-mcp.diff:276` — “The one frozen”  
`conform-mcp.diff:372` — “one session”  
`conform-mcp.diff:374` — “one logged”  
`conform-mcp.diff:387` — “one wire value”  
`conform-mcp.diff:463` — “one injected clock”

Additional raw matches occur inside code blocks or code comments, such as `conform-mcp.diff:617` — `new MCPTextStreamController(answer)` and `:1263` — “the two members”; these are code/comment text rather than prose assertions.

## Distillate

- All 13 named `unit conform-mcp` rows are reported as `applied`, and the current tree contains the corresponding repairs at the cited locations.
- The named stale symbols and forms are absent from their intended replacement sites.
- Generic `defer`, `listen`, `now`, and `should` hits remain only in unrelated APIs, tests, vendored protocol text, or permitted prose.
- The new MessagePort test file contains the moved direct-class behavior cases; its failing-first and passing proof counts are `4 failed | 3 passed` and `60 passed`.
- Session API changes have server proof counts of `1 failed | 33 passed` first, then `372 passed | 1 skipped`.
- Guide loopback behavior has `1 failed | 159 passed` first, then `160 passed`.
- The report records all five gates at exit 0.
- No shared-file patch was reported or observed.
- Breaking-symbol sweeps outside `mcp` found no stale renamed symbols.

## Unknowns

- The full `conform-mcp.diff` exceeded the single-file read limit; targeted hunk and `+`-line searches were completed instead.
- The report’s gate results were not rerun by this audit because the requested mode was read-only.
- A live `git status --short` containment check could not be completed because the shell invocation was rejected; containment is based on the supplied status and `/home/user/work/evidence/conform-mcp.status`.

## Journal

Journal — leave this line for the driver.

## Deviation

- No files were created, edited, or deleted.
- No tree-changing command was run.
- The current status evidence reports 30 modified files plus one added file; the report’s prose says “30 modified files and one untracked file” at `conform-mcp-report.md:235`. This is a reporting terminology/count inconsistency: the supplied status records the added test as `A`.
- The audit could not independently rerun the report’s gates or obtain a live status snapshot because of the read-only Ask-mode constraint and rejected shell check.