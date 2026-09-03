## Question

For each conform-router row, map the current tree, diff, sweeps, report readings, and available proof artifacts.

## Evidence

### Per-row entries

#### router-obj-1

- **Site now:** `Router.ts:117-118` throws `ContractError` with code `literal`; `Router.ts:122-123` throws code `pattern`. `Dispatcher.ts:152-153` and `:161-162` throw code `literal`. `helpers.ts:141-143` throws code `placement`. `Navigator.ts:75-76`, `:84-85`, and `:93-94` throw code `literal`.
- **Diff:** `conform-router.diff:873` (`@@ -110,13 +110,23 @@`), `:781` (`@@ -146,13 +149,23 @@`), `:977` (`@@ -135,9 +138,14 @@`), and `:506` (`@@ -73,15 +72,32 @@`). The operative `ContractError`, code, and `received: preview(...)` text appear in the `+` lines.
- **Old-form sweep:** `\bTypeError\b` plus `TypeErrors|TypeErrored|TypeErroring` over `src`, `tests`, `guides/router.md`, `guides/README.md`, and `README.md`: no hits.
- **Report:** `conform-router-report.md:9` says: “`ContractError` at every registration and construction boundary, coded `literal` / `pattern` / `placement`, each with `path`, `limit`, and `received: preview(value)`.” The cited current sites match.
- **Proof:** Controls exist. `router-obj-1-core-red.txt` records `Tests 1 failed | 164 passed (165)`; `router-obj-1-core-green.txt` records `Tests 165 passed (165)`. Browser controls record `Tests 1 failed | 72 passed (73)` and `Tests 73 passed (73)`.

#### router-obj-2

- **Site now:** `tests/guides.test.ts:193-311` contains the core flagship transcriptions. `tests/src/browser/Navigator.test.ts:791-868` contains browser transcriptions.
- **Diff:** `conform-router.diff:1270` (`@@ -177,3 +187,128 @@`) and `:1514` (`@@ -734,3 +785,92 @@`). `describe('flagship fences', ...)` appears in both additions.
- **Old-form sweep:** No removed symbol, phrase, or path; no old-form hits.
- **Report:** `conform-router-report.md:10` says: “`describe('flagship fences', …)` in `tests/guides.test.ts` for the core fences; the `@orkestrel/router/browser` fences transcribed in `tests/src/browser/Navigator.test.ts`.” The tree matches.
- **Proof:** `router-obj-2-guides-red.txt` records `Tests 1 failed | 44 passed (45)`; its green control records `Tests 45 passed (45)`. Browser controls record `Tests 7 failed | 66 passed (73)` and `Tests 73 passed (73)`.

#### router-obj-3

- **Site now:** `tests/guides.test.ts:41-48` maps `@orkestrel/router/browser` and `@orkestrel/router/server`; the `@src/*` mappings remain.
- **Diff:** `conform-router.diff:1261` (`@@ -32,6 +40,8 @@`). The two published subpath mappings appear in the `+` lines.
- **Old-form sweep:** No removed name, phrase, or path; no hits.
- **Report:** `conform-router-report.md:11` says: “`MODULES` now maps `@orkestrel/router/browser` and `@orkestrel/router/server`; the `@src/*` rows stay.” The tree matches.
- **Proof:** `router-obj-3-red.txt` records `Tests 1 failed | 44 passed (45)` and reports `createNavigatorTypo`; `router-obj-3-green.txt` records `Tests 45 passed (45)`.

#### router-obj-4

- **Site now:** `tests/src/server/helpers.test.ts:159-181` creates `entered` and `aborted`, resolves them from real events, awaits both, then closes the server.
- **Diff:** `conform-router.diff:1831` (`@@ -157,23 +157,28 @@`). The `+` lines contain `entered.promise`, `socket.destroy()`, and `aborted.promise`; no `setTimeout` appears.
- **Old-form sweep:** `setTimeout|setTimeouts|setTimeouted|setTimeouting|inline timeout|fixed delay` over the requested source and test paths: no hits.
- **Report:** `conform-router-report.md:12` says: “The disconnect case parks on `entered.promise` then `aborted.promise`. No `setTimeout` remains anywhere in the package's own tests.” The named test file matches.
- **Proof:** `router-obj-4-red.txt` records `Tests 1 failed | 26 passed (27)`; `router-obj-4-green.txt` records `Tests 27 passed (27)`.

#### router-obj-5

- **Site now:** `README.md:19` reads `- Node.js >= 22.12.0`; the surrounding lines are `## Requirements` at `:18` and the module-format requirement at `:20`.
- **Diff:** `conform-router.diff:22` (`@@ -13,8 +16,8 @@`). The exact replacement appears in the `+` line.
- **Old-form sweep:** `Node.js >= 24` and its case-insensitive inflections over the requested paths: no hits.
- **Report:** `conform-router-report.md:13` says: “`README.md` reads `- Node.js >= 22.12.0`, the floor `package.json` declares.” The tree matches.

#### router-obj-6

- **Site now:** `README.md:20` reads `- ESM and CommonJS for the core and \`./server\` entries; the \`./browser\` entry is ESM only.`
- **Diff:** `conform-router.diff:22` (`@@ -13,8 +16,8 @@`). The exact replacement appears in the `+` line.
- **Old-form sweep:** `ESM-only (no CommonJS build)` and its case-insensitive inflections: no hits.
- **Report:** `conform-router-report.md:14` quotes the same sentence. The tree matches.

#### router-obj-7

- **Site now:** `guides/README.md:50-51` ends with the `## See also` heading and `AGENTS.md` bullet; line 52 no longer exists.
- **Diff:** `conform-router.diff:81` (`@@ -49,4 +49,3 @@`). The deleted `</content>` line is absent.
- **Old-form sweep:** `</content>` over `src`, `tests`, `guides`, and both README files: no hits.
- **Report:** `conform-router-report.md:15` says: “The stray `</content>` line is deleted; `guides/README.md` ends on the `## See also` bullet.” The tree matches.

#### router-obj-8

- **Site now:** `src/core/helpers.ts:421-423` retains `export function defineRoute...`, `input`, and `return input`.
- **Diff:** No diff hunk deletes or changes the identity body; the rename appears at `conform-router.diff:1091` (`@@ -409,7 +418,7 @@`) under `router-subj-2`.
- **Old-form sweep:** No obj-8 removal; `defineRoute` retains the identity body.
- **Report:** `conform-router-report.md:16` says: “No edit under claim O2, per the refuter's operative form.” The tree matches.

#### router-obj-9

- **Site now:** `Dispatcher.ts:84-86` returns `#router` typed `RouterInterface<RouteRecord<TState>>`; `Navigator.ts:120-122` returns `#router` typed `RouterInterface<Meta>`.
- **Diff:** No obj-9 edit. The Navigator type change is in `conform-router.diff:725` (`@@ -116,7 +116,7 @@`) under `router-subj-1`.
- **Old-form sweep:** No obj-9 removal or rename; no hits.
- **Report:** `conform-router-report.md:17` says: “No edit under claim O5.” The tree matches.

#### router-subj-1

- **Site now:** `Navigator.ts:58-59` declares `RouterInterface<Meta>`; `:110-113` passes `entries: options.routes`; `:120-122` returns that router; `:168-170` forwards `this.#router.match(path)`. `browser/types.ts:119-121` declares `readonly router: RouterInterface<Meta>`. `browser/helpers.ts:26-28` reads `entry.path`.
- **Diff:** `conform-router.diff:546` (`@@ -91,22 +107,17 @@`), `:597` (`@@ -155,14 +166,7 @@`), `:648` (`@@ -11,20 +11,21 @@`), and `:725` (`@@ -116,7 +116,7 @@`). The operative direct registration, type, and forwarding text is present.
- **Old-form sweep:** `Router<RouteEntry<Meta>>|RouterInterface<RouteEntry<Meta>>|meta\.meta|entry\.meta\.path` over the requested paths: no hits.
- **Report:** `conform-router-report.md:18` says: “`Navigator` registers `options.routes` directly; `#router`, the getter, and `NavigatorInterface.router` are `RouterInterface<Meta>`; `match` forwards to `this.#router.match(path)`; `computeNavigationKey` takes `RouteEntry<unknown>` and reads `entry.path`.” The tree matches.
- **Proof:** `router-subj-1-red.txt` records `Tests 1 failed | 72 passed (73)`; `router-browser-green.txt` records `Tests 73 passed (73)`.

#### router-subj-2

- **Site now:** `src/core/helpers.ts:421-423` exports `defineRoute`, returns `input`, and keeps the generic signature. `guides/router.md:83`, `:466-490`, `:690`, `README.md:47`, and `tests/src/core/helpers.test.ts:302-323` use `defineRoute`.
- **Diff:** `conform-router.diff:1091` (`@@ -409,7 +418,7 @@`) and related guide/test hunks. The exact `export function defineRoute` line appears at `:1098`.
- **Old-form sweep:** `\broute\(|\{ *route *\}|, route,|\broute\b *from` and `\broute(s|d|ing)?\(` over `src`, `tests`, `guides/router.md`, `guides/README.md`, and `README.md`: no old-export hits.
- **Report:** `conform-router-report.md:19` says: “`route` → `defineRoute` in `src/core/helpers.ts`, the guide, `README.md`, and `tests/src/core/helpers.test.ts`. Sweep for the old export: no hits.” The tree matches.
- **Proof:** `router-subj-2-red.txt` records `Tests 2 failed | 163 passed (165)`; `router-subj-2-green.txt` records `Tests 165 passed (165)`.

#### router-subj-4

- **Site now:** `src/core/types.ts:511` declares `status` in the miss tuple; `guides/router.md:304` and `:457` use `status`; test titles are at `tests/src/core/Dispatcher.test.ts:92`, `:101`, and `:375`.
- **Diff:** `conform-router.diff:1196` (`@@ -507,11 +508,11 @@`) and test hunks at `:1638`, `:1647`, and `:1707`. The `status` label appears in the `+` lines.
- **Old-form sweep:** `reason: 'unmatched'|'unmethoded'` and event-payload title forms over the requested paths: no hits. Broader `reason` hits are permitted `AbortSignal.reason` and ordinary English at `src/core/helpers.ts:178`, `tests/src/server/helpers.test.ts:185-188`, and `:229-232`.
- **Report:** `conform-router-report.md:20` says: “The miss tuple's label is `status`; the prose, guide Contract row, guide fence parameter, and test titles follow.” The tree matches.

#### router-subj-5

- **Site now:** `Dispatcher.ts:133-136` matches the pathname before auto-OPTIONS response; `:236-239` emits `match` with `pattern`. `types.ts:497-501`, `guides/router.md:297-304`, and `tests/src/core/Dispatcher.test.ts:299-309` describe and test the behavior.
- **Diff:** `conform-router.diff:769` (`@@ -130,7 +130,10 @@`), `:811` (`@@ -217,9 +217,11 @@`), `:1177` (`@@ -490,13 +490,14 @@`), and `:1656` (`@@ -298,10 +299,20 @@`). The operative `hit.path`, `pattern`, and test expectation appear in the `+` lines.
- **Old-form sweep:** `emit('match', 'OPTIONS', pathname)` over the requested paths: no hits.
- **Report:** `conform-router-report.md:21` says: “A derived `OPTIONS` answer emits `match` under the winning registered pattern; `types.ts`, the guide Contract row, and a new `Dispatcher.test.ts` case follow.” The tree matches.
- **Proof:** `router-subj-5-red.txt` records `Tests 1 failed | 164 passed (165)`; `router-subj-5-green.txt` records `Tests 165 passed (165)`.

#### router-subj-6

- **Site now:** `Navigator.ts:243-251` still routes a guard throw to `handler(error, 'navigate')`; the exemption prose remains at `browser/types.ts:71-73` and `guides/router.md:301-304`.
- **Diff:** No hunk changes the operative `handler(error, 'navigate')` line.
- **Old-form sweep:** No removed or renamed form; no hits.
- **Report:** `conform-router-report.md:22` says: “No edit, per the refuter's operative form.” The tree matches.

#### router-subj-7

- **Site now:** `Navigator.ts:67` declares `#listener`; `:116` assigns it once; `:136`, `:138`, `:148`, and `:150` use it. `#popListener` and `#hashListener` are absent.
- **Diff:** `conform-router.diff:496` (`@@ -64,8 +64,7 @@`) and `:573`, `:585` update registration sites. The `+` lines contain `#listener`.
- **Old-form sweep:** `#popListener|#hashListener` and inflections over the requested paths: no hits.
- **Report:** `conform-router-report.md:23` says: “`#popListener` deleted; `#hashListener` renamed `#listener`; all four registration sites use it.” The tree matches.

#### router-subj-9

- **Site now:** `src/core/helpers.ts:113-114` uses the fixed boolean form and `Default: \`true\``; `:255-256` documents `isFinal`; `src/browser/helpers.ts:75-76` documents `history`.
- **Diff:** `conform-router.diff:961` (`@@ -108,10 +109,12 @@`), `:1013` (`@@ -244,8 +252,9 @@`), and `:687` (`@@ -67,12 +68,12 @@`). The prescribed forms appear in the `+` lines.
- **Old-form sweep:** The former `Case-sensitive matching (default \`true\`)`, `Whether \`segment\`...`, and navigation-substrate wording: no hits.
- **Report:** `conform-router-report.md:24` says: “The three boolean parameters use the fixed forms, and `sensitive` carries `Default: \`true\``.” The named sites match.

#### router-subj-10

- **Site now:** The named source and documentation sites no longer contain `seven` or the removed growable-set numerals. `tests/src/core/parsers.test.ts:11` still says “the seven registrable methods”; `tests/guides.test.ts:38` still says “three faces”; `tests/src/core/Router.test.ts:462` still says “three files”.
- **Diff:** Source/documentation hunks include `conform-router.diff:107`, `:137`, `:1127`, `:1136`, `:1104`, and guide edits through `:439`. The requested deletions appear in `+` lines.
- **Old-form sweep:** Number-word pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten)\b` over `src`, `tests`, `guides/router.md`, `guides/README.md`, and `README.md` finds the three test residues above. The growable-count numeral pattern finds no hits in the named source/documentation scope.
- **Report:** `conform-router-report.md:25` says: “Every tally over a growable set is gone from `src`, `guides/router.md`, `guides/README.md`, and `README.md`.” That stated scope matches; it does not cover the three test-comment/title residues.
- **Proof:** Placement/documentation sweep only; no behavioral control is named.

#### router-subj-11

- **Site now:** The banned terms are absent from `src` and the named guide/README files. Tests retain `via` at `tests/src/core/Dispatcher.test.ts:36`, `:145`, `tests/src/browser/Navigator.test.ts:776`, `tests/src/core/Router.test.ts:9`, `:239`, `tests/setupBrowser.ts:45`, `:114`, and `tests/setupServer.ts:41`; tests retain `e.g.` at `tests/src/core/Dispatcher.test.ts:347` and `tests/setupBrowser.ts:37`, `:62`.
- **Diff:** Source hunks are at `conform-router.diff:952`, `:1025`, `:1046`, `:1057`, `:613`, `:622`, and `:1223`. The requested replacements appear in the `+` lines.
- **Old-form sweep:** `\bvia\b|\be\.g\.` and inflections over `src`, `tests`, `guides/router.md`, `guides/README.md`, and `README.md`: source/docs have no hits; the test hits listed above remain.
- **Report:** `conform-router-report.md:26` says: “`via` → `through`, `e.g.` → `for example`, `simply` deleted.” This matches the report's stated source/documentation sweep, but not the broader required test sweep.
- **Proof:** Placement/documentation sweep only; no behavioral control is named.

#### router-subj-12

- **Site now:** `src/core/constants.ts:8-9` and `:37-38` link `DispatcherInterface`; `src/core/types.ts:573` exports that interface.
- **Diff:** `conform-router.diff:906` (`@@ -5,13 +5,13 @@`) and `:923` (`@@ -34,13 +34,14 @@`). Both corrected links appear in `+` lines.
- **Old-form sweep:** `{@link import('./types.js').Dispatcher}` over the requested paths: no hits.
- **Report:** `conform-router-report.md:27` says: “Both `constants.ts` links resolve to `{@link import('./types.js').DispatcherInterface}`.” The tree matches.

#### router-subj-14

- **Site now:** `guides/router.md:274-279` names `computeDispatchKey` and `canonicalizePath(entry.path)`.
- **Diff:** `conform-router.diff:244` (`@@ -223,19 +246,22 @@`). The corrected Contract row appears in the `+` lines.
- **Old-form sweep:** The old `key: (entry) => \`${entry.meta.method} ${entry.path}\`` wording: no hits.
- **Report:** `conform-router-report.md:28` says: “Contract row 7 names `computeDispatchKey` and its `canonicalizePath` pairing.” The tree matches.

#### router-subj-15

- **Site now:** `guides/router.md:219-239` contains `GroupInterface` and `DispatchGroupInterface` method tables. The interface members are `types.ts:368-370` and `:601-603`.
- **Diff:** `conform-router.diff:215` (`@@ -213,6 +214,28 @@`) adds both tables; `:146` updates the Surface/Methods prose.
- **Old-form sweep:** The old “three interfaces” method-table wording: no hits.
- **Report:** `conform-router-report.md:29` says: “`GroupInterface` and `DispatchGroupInterface` method tables added; the Surface-rows paragraph, the Methods intro, and Contract row 2 name every interface.” The tree matches.

#### router-subj-16

- **Site now:** `guides/router.md:258-263` presents Contract row 4 in normal paragraph flow; no line in the site begins with `>`.
- **Diff:** `conform-router.diff:244` (`@@ -223,19 +246,22 @@`). The replacement text contains no line-initial blockquote marker.
- **Old-form sweep:** `^\s*>` scoped to Contract row 4: no hits. The guide's unrelated opening blockquote remains at `:3-17`.
- **Report:** `conform-router-report.md:30` says: “Contract row 4 is spelled in words with no line-initial `>`; the formatter left it in the main flow.” The tree matches.

#### router-subj-17

- **Site now:** `guides/README.md:23`, `:29`, and `:36` each say “a runtime dependency”. The map still does not add paragraphs for `probe.md`, `scaffold.md`, or `test.md`.
- **Diff:** `conform-router.diff:57` (`@@ -20,20 +20,20 @@`). The three replacements appear in `+` lines.
- **Old-form sweep:** `one of this package's runtime dependencies|this package's other runtime dependency|this package's third runtime dependency`: no hits.
- **Report:** `conform-router-report.md:31` says: “The narrowed repair: each dependency paragraph reads ‘a runtime dependency’. No paragraph added for `probe.md`, `scaffold.md`, or `test.md`.” The tree matches.

#### router-subj-18

- **Site now:** `README.md:3-11` contains the present-tense shipped-surface description.
- **Diff:** `conform-router.diff:5` (`@@ -1,9 +1,12 @@`). The replacement paragraph appears in `+` lines.
- **Old-form sweep:** `first @orkestrel|as it takes shape|first package to ship`: no hits.
- **Report:** `conform-router-report.md:32` says: “`README.md:3-6` replaced with the present-tense description of the shipped surface.” The current paragraph carries that description, now at `:3-11`.

#### router-subj-19

- **Site now:** `guides/router.md:159`, `:267`, and `:335` use `preceding` or prose references; `via` is replaced by `through` at the named sites. The comparison `ranks below it` remains at `:262`.
- **Diff:** `conform-router.diff:146`, `:244`, `:324`, `:354`, `:411`, and `:430` contain the changes.
- **Old-form sweep:** `\bvia\b|\babove\b|\bbelow\b` over `guides/router.md`, `guides/README.md`, and `README.md`: no `via` or `above`; `guides/router.md:262` is the permitted specificity comparison.
- **Report:** `conform-router-report.md:33` says: “`via` → `through` at every guide and README site; `above` rewritten in words at `:159`, `:267`, `:335`. `ranks below it` left alone.” The tree matches.

#### fleet-F1

- **Site now:** `tests/setup.ts:20-42` exports `TestBodyInterface` and `createTestBody`; no `isBrowserVuePath` exists. `src/browser/`, `tests/setupBrowser.ts`, and the `src:browser` project exist.
- **Diff:** No F1 hunk.
- **Old-form sweep:** `isBrowserVuePath` over the tree: no hits.
- **Report:** `conform-router-report.md:34` records `noop` because the helper is absent and the workspace has a browser environment. The tree matches.

#### fleet-F2

- **Site now:** `Router`, `Group`, `Dispatcher`, `DispatchGroup`, and `Navigator` are the implementation classes. `readonly id: string` has no class-field hit; the only `readonly id` hit is the TSDoc example at `src/core/types.ts:200`.
- **Diff:** No F2 hunk.
- **Old-form sweep:** `readonly id\s*:\s*string` over `src`: no implementation-class hit.
- **Report:** `conform-router-report.md:35` records `noop` and names the five classes read. The tree matches.

### Across the unit

- **Scope:** `conform-router.status:1-23` lists only owned paths: `README.md`, `guides/README.md`, `guides/router.md`, all listed `src/**` files, `tests/guides.test.ts`, and the listed mirrored tests. No shared or off-limits path appears. The live `git status --short` matches the evidence status exactly.
- **Unscoped diff hunks:** Every diff file is named by at least one row's `Where`; no diff hunk has a file outside the rows' named files.
- **Residue:** `conform-router.diff:350` adds `console.log(...)` in a guide fence. The required tree sweep, excluding vendored `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`, finds only `src/server/helpers.ts:51` and `src/browser/helpers.ts:121`, both existing documentation examples. No `.skip`, `.only`, `.todo`, retry, timeout, TODO, FIXME, or debugger hit appears in the non-vendored `src`/`tests` sweep.
- **Writing sweep over diff `+` prose lines:** `conform-router.diff:272` contains `below`, permitted as a specificity comparison. `:878` contains `new` in a source comment. `:1277` and `:1521` contain `below` in test comments used as document pointers. No other requested writing-term or growable-count pattern hits occur in added prose lines.
- **Report § Gates:** The report records verbatim:
  - `| \`npm run format:check\`  | 0         | \`All matched files use the correct format.\` on 73 files`
  - `| \`npm run lint:check\`    | 0         | no output`
  - `| \`npm run check\`         | 0         | root project plus the three scoped isolation checks`
  - `| \`npm run build\`         | 0         | core, browser, and server built; both \`.d.cts\` copies written`
  - `| \`npm test\`              | 0         | \`src\` 265/265, \`policy\` 111/111, \`config\` 46/46, \`setup\` 9/9, \`guides\` 45/45`
  - These are writer readings. No independent gate run was performed.
- **Breaking:** The report entries at `conform-router-report.md:164-166` are:
  1. “The registration and construction boundary throws `ContractError`, not `TypeError`.”
  2. “`route` is renamed `defineRoute`.”
  3. “`NavigatorInterface.router` is `RouterInterface<Meta>`, not `RouterInterface<RouteEntry<Meta>>`.”
  The report names consumers and replacement edits for each. The old published helper name `route` has no import/call-form hits in the router package.
- **Fleet breaking sweep:** The required word-boundary `route` sweep over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, excluding router and guide mirrors, returns these non-router hits: `middleware/tests/src/core/middlewares.test.ts:1320`; `middleware/tests/src/server/middlewares.test.ts:758`; `browser/src/core/types.ts:1059,1093,1095,1237`; `browser/src/core/helpers.ts:445`; `browser/tests/service/browser.test.ts:114,115,118,122`; `console/src/core/types.ts:309,325`; `console/src/core/loggers/Logger.ts:131`; `console/tests/src/core/loggers/Logger.test.ts:313`; `console/tests/src/server/factories.test.ts:423`; `database/src/core/types.ts:519`; `process/src/server/types.ts:27,739,744`; `process/tests/src/server/helpers.test.ts:603,672,674,706,916,919,925`; `websocket/src/server/NodeWebSocket.ts:177`; `template/src/core/helpers.ts:19`; `contract/src/core/ShapeValidator.ts:1408`; `contract/tests/src/core/ShapeValidator.test.ts:1070,1071,1102`; `contract/tests/src/core/compilers.test.ts:5049`; `contract/tests/src/core/ContractCompiler.test.ts:443`; `test/src/browser/helpers.ts:964`; `test/tests/guides.test.ts:562`; `toolbox/src/server/types.ts:3,11,19`; `toolbox/src/server/terminals/TerminalBridge.ts:21,46,65,67`; `toolbox/src/server/factories.ts:9,11,15`; `toolbox/tests/src/server/factories.test.ts:19,20,21,37,41,42,103`; `server/src/server/types.ts:22,33,222,296,354,375`; `server/src/server/Stream.ts:47`; `server/src/server/factories.ts:61,76`; `server/tests/src/server/Server.test.ts:80,1295,1346`; `server/tests/src/server/helpers.test.ts:211`; `probe/tests/src/server/stages/LintStage.test.ts:1392`; `ollama/src/server/types.ts:81`; `ollama/src/server/OllamaProvider.ts:69`; `mcp/tests/src/server/middlewares.test.ts:374,379,514`; and `/home/user/scaffold/src/core/shapers.ts:21`. These are ordinary words or other packages' APIs, not imports of `route` from `@orkestrel/router`.
- **Parity:** See the table below.

| Entity | Interface members in `types.ts` | Guide method rows |
|---|---|---|
| `Router` | `types.ts:342` `count`; `:343-344` `add`; `:345` `match`; `:346-347` `entries`; `:348` `group`; `:349` `clear` | `guides/router.md:182-186` |
| `Group` | `types.ts:368` `prefix`; `:369-370` `add`; `:371` `group` | `guides/router.md:225-226` |
| `Dispatcher` | `types.ts:574` `router`; `:575` `emitter`; `:576-577` `add`; `:578` `group`; `:579` `match`; `:580` `handle`; `:581` `destroy` | `guides/router.md:197-201` |
| `DispatchGroup` | `types.ts:601` `prefix`; `:602-603` `add`; `:604` `group` | `guides/router.md:236-237` |
| `Navigator` | `browser/types.ts:119` `router`; `:120` `emitter`; `:121` `active`; `:122` `start`; `:123` `stop`; `:124` `navigate`; `:125` `match`; `:126` `destroy` | `guides/router.md:211-215` |

Readonly data properties are named in the guide type rows at `guides/router.md:139-150` and the entity rows at `:114-118`.

- **Guide backtick/export sweep:** Added guide prose names core-barrel exports `Router`, `Group`, `Dispatcher`, `DispatchGroup`, `RouterInterface`, `GroupInterface`, `DispatcherInterface`, `DispatchGroupInterface`, `PathParams`, `RouteEntry`, `RouterMatch`, `AnswerHandler`, `RouterOptions`, `Method`, `RouteContext`, `RouteHandler`, `RouteInput`, `RouteRecord`, `DispatchResult`, `DispatcherEventMap`, `DispatcherOptions`, `NavigatorEventMap`, `NavigatorOptions`, `RequestOptions`, `ListenerFunction`, `StateFunction`, `METHOD_LIST`, `METHODS`, `TIER_LITERAL`, `TIER_PARAM`, `TIER_WILDCARD`, `defineRoute`, `computeDispatchKey`, and `canonicalizePath`; the core and browser barrels export the applicable names. `Navigator`, `NavigatorInterface`, `computeNavigationKey`, `extractHashPath`, `resolveLocationPath`, and `findAnchor` are exported by `src/browser/index.ts`. `buildRequest`, `sendResponse`, `createListener`, and `handleListenerRequest` are exported by `src/server/index.ts`. External/platform tokens such as `@orkestrel/contract`, `@orkestrel/emitter`, `@orkestrel/abort`, `node:http`, `Request`, `ReadableStream`, `Headers.getSetCookie`, `location.hash`, `hashchange`, `pushState`, `popstate`, `package.json`, `exports`, `./browser`, and `./server` are not router-barrel exports.
- **Audit-claim reachability:** `audit-brief` claim 5's “no `AGENTS §` citation survives in touched files” does not match the tree. Hits include `guides/router.md:3,12,144,148,170,247,253,304,638,641`; `guides/README.md:4`; `src/browser/Navigator.ts:15,243`; `src/browser/factories.ts:16`; `src/browser/helpers.ts:1,5`; `src/browser/types.ts:8,13,24,41,70,71,96,103,116`; `src/core/constants.ts:4`; `src/core/Group.ts:6`; `src/core/helpers.ts:5,180`; `src/core/parsers.ts:4`; `src/core/types.ts:12,27,282,493,516,529,530,554,569`; `src/server/helpers.ts:4`; `src/server/handlers.ts:5`; `tests/setup.ts:3`; `tests/setupBrowser.ts:4`; and `tests/setupServer.ts:7`.

## Distillate

- `router-obj-1`: site now ContractError guards | diff present yes | old form hits 0 | report matches yes
- `router-obj-2`: flagship transcriptions present | diff present yes | old form hits 0 | report matches yes
- `router-obj-3`: published subpath mappings present | diff present yes | old form hits 0 | report matches yes
- `router-obj-4`: event-parked disconnect test present | diff present yes | old form hits 0 | report matches yes
- `router-obj-5`: README Node floor is 22.12.0 | diff present yes | old form hits 0 | report matches yes
- `router-obj-6`: README documents ES/CJS split | diff present yes | old form hits 0 | report matches yes
- `router-obj-7`: `</content>` absent | diff present yes | old form hits 0 | report matches yes
- `router-obj-8`: identity helper retained under rename | diff present no | old form hits 0 | report matches yes
- `router-obj-9`: mutable router exposure retained | diff present no | old form hits 0 | report matches yes
- `router-subj-1`: Navigator uses `RouterInterface<Meta>` | diff present yes | old form hits 0 | report matches yes
- `router-subj-2`: `defineRoute` replaces old export form | diff present yes | old form hits 0 | report matches yes
- `router-subj-4`: miss tuple uses `status` | diff present yes | old form hits 0 | report matches yes
- `router-subj-5`: derived OPTIONS emits its winning pattern | diff present yes | old form hits 0 | report matches yes
- `router-subj-6`: `navigate` error label retained | diff present no | old form hits 0 | report matches yes
- `router-subj-7`: one `#listener` field remains | diff present yes | old form hits 0 | report matches yes
- `router-subj-9`: boolean TSDoc forms present | diff present yes | old form hits 0 | report matches yes
- `router-subj-10`: named source/docs counts removed | diff present yes | old form hits 3 in tests | report matches named scope
- `router-subj-11`: named source/docs substitutions removed | diff present yes | old form hits 11 in tests | report matches named scope
- `router-subj-12`: dead links point to `DispatcherInterface` | diff present yes | old form hits 0 | report matches yes
- `router-subj-14`: guide names `computeDispatchKey` | diff present yes | old form hits 0 | report matches yes
- `router-subj-15`: all interface method tables present | diff present yes | old form hits 0 | report matches yes
- `router-subj-16`: Contract row 4 is not blockquoted | diff present yes | old form hits 0 | report matches yes
- `router-subj-17`: ordinal dependency phrases removed | diff present yes | old form hits 0 | report matches yes
- `router-subj-18`: README is present-tense | diff present yes | old form hits 0 | report matches yes
- `router-subj-19`: guide pointer/substitution forms corrected | diff present yes | old form hits 0 banned-form hits | report matches yes
- `fleet-F1`: helper absent; browser workspace makes noop correct | diff present no | old form hits 0 | report matches yes
- `fleet-F2`: no public `id` data field shape | diff present no | old form hits 0 | report matches yes

Scope tags: all 23 status paths are `owned`; no `shared` or `off-limits` status path appears.

Residue hits: `conform-router.diff:350`; tree hits `src/server/helpers.ts:51`, `src/browser/helpers.ts:121`.

Writing hits: `conform-router.diff:272` permitted comparison; `:878`, `:1277`, and `:1521` remain hits under the requested prose sweep.

| Entity | Interface members | Guide rows |
|---|---|---|
| `Router` | `count`, `add`, `match`, `entries`, `group`, `clear` | `guides/router.md:182-186` |
| `Group` | `prefix`, `add`, `group` | `guides/router.md:225-226` |
| `Dispatcher` | `router`, `emitter`, `add`, `group`, `match`, `handle`, `destroy` | `guides/router.md:197-201` |
| `DispatchGroup` | `prefix`, `add`, `group` | `guides/router.md:236-237` |
| `Navigator` | `router`, `emitter`, `active`, `start`, `stop`, `navigate`, `match`, `destroy` | `guides/router.md:211-215` |

## Unknowns

- The five gates were not independently run; the report and `gate-test.txt` contain writer-side readings only.
- No separate `prove` receipt was available for the controls.
- The report's source/documentation sweeps were not equivalent to the broader required sweeps over all tests; the residual test hits are listed above.

## Journal

## Deviation

No tree change was caused by this read-only pass. The current `git status --short` matches `conform-router.status` exactly. No requested input file was unreadable.