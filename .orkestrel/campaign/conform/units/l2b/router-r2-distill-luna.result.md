## Question
For every row of unit conform-router, what does the tree at `/home/user/fleet/router` carry now, what did the unit's diff change there, and do the report's readings match the tree?

## Evidence

### Per-row entries

- **router-obj-1**
  - **Site now:** `src/core/Router.ts:116-123` splits non-string and missing-slash paths into `ContractError` codes `literal` and `pattern`; `src/core/Dispatcher.ts:151-168` uses `ContractError` code `literal` with `preview`; `src/core/helpers.ts:140-148` uses code `placement`; `src/browser/Navigator.ts:74-99` uses code `literal`. Neighboring lines retain the surrounding registration logic.
  - **Diff:** `Router.ts @@ -109,14 +109,24`, `Dispatcher.ts @@ -142,17 +145,27`, `helpers.ts @@ -133,12 +136,17`, `Navigator.ts @@ -73,15 +71,32`; the operative `ContractError`, codes, and `received: preview(...)` text are present verbatim.
  - **Old form sweep:** `TypeError` over `src`, `tests`, `guides/router.md`, `guides/README.md`, and `README.md`: no hit.
  - **Report reading:** “`ContractError` at every registration and construction boundary, coded `literal` / `pattern` / `placement`, each with `path`, `limit`, and `received: preview(value)`.” The current lines match.
  - **Proof reading:** `npm run test:src:core`: `1 failed | 164 passed (165)` at `router-obj-1-core-red.txt`; `165 passed (165)` at `router-obj-1-core-green.txt`. `npm run test:src:browser`: `1 failed | 72 passed (73)` at `router-obj-1-browser-red.txt`; `73 passed (73)` at `router-browser-green.txt`.

- **router-obj-2**
  - **Site now:** `tests/guides.test.ts:190-310` contains the core flagship transcriptions; `tests/src/browser/Navigator.test.ts:789-875` contains the browser transcriptions and states the Node/browser split.
  - **Diff:** `tests/guides.test.ts @@ -177,3 +187,128`; `Navigator.test.ts @@ -734,3 +785,92`; the transcription block is present.
  - **Old form sweep:** No removable name or phrase applies; no stale fence-transcription form found in the named paths.
  - **Report reading:** “`describe('flagship fences', …)` in `tests/guides.test.ts` for the core fences; the `@orkestrel/router/browser` fences transcribed in `tests/src/browser/Navigator.test.ts`.” The tree matches.
  - **Proof reading:** `npm run test:guides`: `1 failed | 44 passed (45)` at `router-obj-2-guides-red.txt`; `45 passed (45)` at `router-obj-2-guides-green.txt`. Browser control: `7 failed | 66 passed (73)` at `router-obj-2-browser-red.txt`; `73 passed (73)` at `router-browser-green.txt`.

- **router-obj-3**
  - **Site now:** `tests/guides.test.ts:41-47` maps `@orkestrel/router/browser` and `@orkestrel/router/server`; `tests/guides.test.ts:165-166` still skips only genuinely unmapped specifiers.
  - **Diff:** `@@ -32,6 +40,8`; the two published subpath mappings are present.
  - **Old form sweep:** The former unmapped-subpath condition is structural, not textual; no stale mapping omission is present.
  - **Report reading:** “`MODULES` now maps `@orkestrel/router/browser` and `@orkestrel/router/server`; the `@src/*` rows stay.” The tree matches.
  - **Proof reading:** `npm run test:guides`: `1 failed | 44 passed (45)` with `createNavigatorTypo` at `router-obj-3-red.txt`; `45 passed (45)` at `router-obj-3-green.txt`.

- **router-obj-4**
  - **Site now:** `tests/src/server/helpers.test.ts:159-181` uses `entered.promise`, `socket.destroy()`, and `aborted.promise`; no fixed timer remains.
  - **Diff:** `@@ -157,23 +157,28`; the event-parked repair is present.
  - **Old form sweep:** `setTimeout\(` over `tests`: no hit.
  - **Report reading:** “The disconnect case parks on `entered.promise` then `aborted.promise`. No `setTimeout` remains anywhere in the package's own tests.” The tree matches.
  - **Proof reading:** `npm run test:src:server`: `1 failed | 26 passed (27)` at `router-obj-4-red.txt`; `27 passed (27)` at `router-obj-4-green.txt`.

- **router-obj-5**
  - **Site now:** `README.md:19` reads `Node.js >= 22.12.0`, with the surrounding requirements unchanged.
  - **Diff:** `README.md @@ -13,8 +16,8`; the exact replacement is present.
  - **Old form sweep:** `Node\.js >= 24` over the named paths: no hit.
  - **Report reading:** “`README.md` reads `- Node.js >= 22.12.0`, the floor `package.json` declares.” The tree matches.
  - **Proof reading:** Documentation sweep recorded; it agrees with the current README and `package.json`.

- **router-obj-6**
  - **Site now:** `README.md:20` states CommonJS support for core and server and ESM-only browser output.
  - **Diff:** `README.md @@ -13,8 +16,8`; the exact replacement is present.
  - **Old form sweep:** `ESM-only \(no CommonJS build\)` over the named paths: no hit.
  - **Report reading:** “`README.md` reads `- ESM and CommonJS for the core and \`./server\` entries; the \`./browser\` entry is ESM only.`” The tree matches.
  - **Proof reading:** Documentation sweep recorded; it agrees with the package manifest and current README.

- **router-obj-7**
  - **Site now:** `guides/README.md:50-51` ends with the `## See also` bullet; `</content>` is absent.
  - **Diff:** `@@ -48,5 +48,4`; the stray line is deleted.
  - **Old form sweep:** `</content>` over `src`, `tests`, `guides`, and `README.md`: no hit.
  - **Report reading:** “The stray `</content>` line is deleted; `guides/README.md` ends on the `## See also` bullet.” The tree matches.
  - **Proof reading:** The recorded authoring-debris sweep agrees.

- **router-obj-8**
  - **Site now:** `src/core/helpers.ts:388-421` retains the identity helper, its narrowing remarks, example, and body; the export is `defineRoute`.
  - **Diff:** `@@ -382,26 +391,26` changes the name only as required by `router-subj-2`; no deletion or body change is present.
  - **Old form sweep:** No wrapper deletion applies; the identity helper remains.
  - **Report reading:** “No edit under claim O2, per the refuter's operative form. `defineRoute` keeps its body, doc block, and tests; only the name moved, under router-subj-2.” The tree matches.
  - **Proof reading:** No separate behavioural control is required for this noop.

- **router-obj-9**
  - **Site now:** `src/core/Dispatcher.ts:84-86` returns `RouterInterface<RouteRecord<TState>>`; `src/browser/Navigator.ts:119-121` returns `RouterInterface<Meta>`.
  - **Diff:** No repair hunk for this claim. Navigator’s type change belongs to `router-subj-1`.
  - **Old form sweep:** No removable name or path applies.
  - **Report reading:** “No edit under claim O5. `Dispatcher.ts` still returns `#router` typed `RouterInterface<RouteRecord<TState>>`; `Navigator`'s getter was retyped to `RouterInterface<Meta>` by router-subj-1.” The tree matches.
  - **Proof reading:** No separate control is required for this noop.

- **router-subj-1**
  - **Site now:** `src/browser/Navigator.ts:57-68` types the child router as `RouterInterface<Meta>` and stores one `#listener`; `:106-120` registers `options.routes` directly and exposes the typed router; `:165-169` forwards `match`. `src/browser/types.ts:90-121` documents `Router<Meta>` and declares `readonly router: RouterInterface<Meta>`. `src/browser/helpers.ts:27-28` reads `entry.path`.
  - **Diff:** `Navigator.ts @@ -91,22 +106,17`, `@@ -155,14 +165,7`; `types.ts @@ -113,10 +114,10`; `helpers.ts @@ -11,20 +12,21` and `@@ -32,13 +33,13`. The operative direct-registration and forwarding text is present.
  - **Old form sweep:** `Router<RouteEntry<Meta>>|RouterInterface<RouteEntry<Meta>>|meta\.meta|entry\.meta\.path` over the named paths: no hit.
  - **Report reading:** “`Navigator` registers `options.routes` directly; `#router`, the getter, and `NavigatorInterface.router` are `RouterInterface<Meta>`; `match` forwards to `this.#router.match(path)`; `computeNavigationKey` takes `RouteEntry<unknown>` and reads `entry.path`.” The tree matches.
  - **Proof reading:** `npm run test:src:browser`: `1 failed | 72 passed (73)` at `router-subj-1-red.txt`; `73 passed (73)` at `router-browser-green.txt`.

- **router-subj-2**
  - **Site now:** `src/core/helpers.ts:421` exports `defineRoute`; `guides/router.md:83,466-489`, `README.md:47`, and `tests/src/core/helpers.test.ts:302-317` use the new name.
  - **Diff:** `helpers.ts @@ -382,26 +391,26` and `@@ -409,7 +418,7`; guide, README, and test hunks contain `defineRoute` verbatim.
  - **Old form sweep:** `\broute\(|\{ *route *\}|, route,|\broute\b *from` and case-insensitive `\broute(s|d|ing)?\(` over `src`, `tests`, `guides/router.md`, `guides/README.md`, and `README.md`: no hit.
  - **Report reading:** “`route` → `defineRoute` in `src/core/helpers.ts`, the guide, `README.md`, and `tests/src/core/helpers.test.ts`. Sweep for the old export: no hits.” The tree matches.
  - **Proof reading:** `npm run test:src:core`: `2 failed | 163 passed (165)` at `router-subj-2-red.txt`; `165 passed (165)` at `router-subj-2-green.txt`.

- **router-subj-4**
  - **Site now:** `src/core/types.ts:511` labels the miss tuple element `status`; `guides/router.md:394,446-457`; `tests/src/core/Dispatcher.test.ts:92,101,375` use `status`.
  - **Diff:** `types.ts @@ -507,27 +508,28`; guide `@@ -423,7 +454,7` and related contract hunks; dispatcher test hunks at `@@ -88,7 +89,7`, `@@ -97,7 +98,7`, and `@@ -355,7 +372,7`. The replacement is present.
  - **Old form sweep:** Event-payload `\breason\b` over the named paths: no payload-label hit. Permitted ordinary-language hits remain at `src/core/helpers.ts:178` and `tests/src/server/helpers.test.ts:165,185-188,229-232`; vendored `tests/distribution.test.ts:783,845` also uses ordinary prose.
  - **Report reading:** “The miss tuple's label is `status`; the prose, guide Contract row, guide fence parameter, and test titles follow.” The tree matches.
  - **Proof reading:** Placement/naming sweep agrees; no separate behavioural control is required.

- **router-subj-5**
  - **Site now:** `src/core/Dispatcher.ts:133-137` resolves a matching registered pattern before auto-OPTIONS; `:232-239` emits that pattern. `src/core/types.ts:497-503` and `guides/router.md:300-305` document it. `tests/src/core/Dispatcher.test.ts:302-309` asserts `[['OPTIONS', '/users/:id']]`.
  - **Diff:** `Dispatcher.ts @@ -130,7 +130,10` and `@@ -217,9 +230,11`; types `@@ -490,13 +490,14`; test `@@ -298,10 +299,20`; operative text is present.
  - **Old form sweep:** The old pathname payload is behavioural rather than a removable identifier; no stale `emit('match', 'OPTIONS', pathname)` remains.
  - **Report reading:** “A derived `OPTIONS` answer emits `match` under the winning registered pattern; `types.ts`, the guide Contract row, and a new `Dispatcher.test.ts` case follow.” The tree matches.
  - **Proof reading:** `npm run test:src:core`: `1 failed | 164 passed (165)` at `router-subj-5-red.txt`; `165 passed (165)` at `router-subj-5-green.txt`.

- **router-subj-6**
  - **Site now:** `src/browser/Navigator.ts:242-250` still calls the error handler with `'navigate'`; `src/browser/types.ts:71-73` and `guides/router.md:333` retain the exemption.
  - **Diff:** No hunk changes this site.
  - **Old form sweep:** No renamed or removed form applies.
  - **Report reading:** “No edit, per the refuter's operative form. The exemption at `src/browser/types.ts:71-73` and `guides/router.md` stands unchanged.” The tree matches.
  - **Proof reading:** No separate control is required for this noop.

- **router-subj-7**
  - **Site now:** `src/browser/Navigator.ts:67-68` has only `#listener`; `:111` assigns it once; `:137,140,147,150` use it for registration and removal.
  - **Diff:** `@@ -64,8 +63,7`, `@@ -91,22 +106,17`, `@@ -122,9 +132,9`, and `@@ -134,9 +144,9`; `#popListener` is deleted and `#hashListener` is renamed.
  - **Old form sweep:** `#(pop|hash)Listener` over the named paths: no hit.
  - **Report reading:** “`#popListener` deleted; `#hashListener` renamed `#listener`; all four registration sites use it.” The tree matches.
  - **Proof reading:** Placement/naming sweep agrees.

- **router-subj-9**
  - **Site now:** `src/core/helpers.ts:112-114` uses the fixed `sensitive` form and `Default: \`true\``; `:246-248` uses the fixed `isFinal` form; `src/browser/helpers.ts:74-76` uses the fixed `history` form.
  - **Diff:** `helpers.ts @@ -108,10 +109,12` and `@@ -241,11 +249,12`; browser helper `@@ -67,12 +68,12`; exact replacement text is present.
  - **Old form sweep:** The former free-prose boolean parameter forms over the named paths: no hit.
  - **Report reading:** “The three boolean parameters use the fixed forms, and `sensitive` carries `Default: \`true\``.” The tree matches.
  - **Proof reading:** TSDoc sweep agrees.

- **router-subj-10**
  - **Site now:** `src/core/types.ts:375,474,493,514`; `src/core/constants.ts:14,44`; `src/core/parsers.ts:15-24`; `guides/router.md:3,63-64,138,229,604`; and `README.md:60` no longer tally growable sets.
  - **Diff:** Relevant hunks include `constants.ts @@ -1,17 +1,17`, `@@ -34,13 +34,14`; `parsers.ts @@ -13,15 +13,15`; `types.ts @@ -372,7 +373,7`, `@@ -471,7 +471,7`, `@@ -490,13 +490,14`, `@@ -507,27 +508,28`; guide and README hunks carry the same deletions.
  - **Old form sweep:** Number words over `src`, `guides/router.md`, `guides/README.md`, and `README.md`: no `three` or `seven`; remaining `one` and `two` hits are permitted determiners, values, or comparator facts. Numeral-plus-set-unit sweep: no hit.
  - **Report reading:** “Every tally over a growable set is gone ... including the sites the refuter added.” The tree agrees.

- **router-subj-11**
  - **Site now:** `via` is replaced by `through` at the listed source sites; `e.g.` is replaced by `for example`; `src/browser/helpers.ts:70` no longer contains `simply`; `src/browser/types.ts:104` retains `currently-resolved`.
  - **Diff:** Relevant source hunks include `types.ts @@ -129,9 +130,9`, `helpers.ts @@ -203,7 +211,7`, `@@ -271,9 +280,9`, `@@ -345,14 +354,14`, `Navigator.ts @@ -217,7 +220,7`; all operative replacements are present.
  - **Old form sweep:** `\bvia\b|e\.g\.|\bsimply\b` over `src`: no hit; `currently-resolved` remains as the permitted runtime-state term.
  - **Report reading:** “`via` → `through`, `e.g.` → `for example`, `simply` deleted. `currently-resolved` at `src/browser/types.ts:104` left alone.” The tree matches.

- **router-subj-12**
  - **Site now:** `src/core/constants.ts:8` and `:37` link to `DispatcherInterface`; `src/core/types.ts:574` exports that interface.
  - **Diff:** `constants.ts @@ -1,17 +1,17` and `@@ -34,13 +34,14`; both links are present verbatim.
  - **Old form sweep:** `types.js').Dispatcher}` over the named paths: no hit.
  - **Report reading:** “Both `constants.ts` links resolve to `{@link import('./types.js').DispatcherInterface}`.” The tree matches.

- **router-subj-14**
  - **Site now:** `guides/router.md:328-335` names `computeDispatchKey` and its `canonicalizePath(entry.path)` pairing.
  - **Diff:** `@@ -243,10 +269,13`; the corrected contract row is present.
  - **Old form sweep:** `key: \(entry\) => .*entry\.path` over the named guide region: no stale guide claim.
  - **Report reading:** “Contract row 7 names `computeDispatchKey` and its `canonicalizePath` pairing.” The tree matches.

- **router-subj-15**
  - **Site now:** `guides/router.md:218-238` contains `GroupInterface` and `DispatchGroupInterface` tables; `:156-161` and `:165-170` name all interfaces.
  - **Diff:** `@@ -156,54 +156,56` and `@@ -213,6 +215,28`; both method tables and the corrected scope prose are present.
  - **Old form sweep:** Missing-table and “three interfaces” wording over `guides/router.md`: no hit.
  - **Report reading:** “`#### \`GroupInterface\`` and `#### \`DispatchGroupInterface\`` method tables added; the Surface-rows paragraph, the Methods intro, and Contract row 2 name every interface.” The tree matches.
  - **Proof reading:** Documentation sweep agrees.

- **router-subj-16**
  - **Site now:** `guides/router.md:253-263` keeps Contract row 4 in normal paragraph flow; no line begins with `>`.
  - **Diff:** `@@ -221,21 +245,23`; the replacement is present.
  - **Old form sweep:** Line-initial blockquote marker sweep over the contract row: no hit.
  - **Report reading:** “Contract row 4 is spelled in words with no line-initial `>`; the formatter left it in the main flow.” The textual tree matches; rendering itself is not independently captured.

- **router-subj-17**
  - **Site now:** `guides/README.md:22,28,35` uses “a runtime dependency”; no paragraphs for `probe.md`, `scaffold.md`, or `test.md` were added.
  - **Diff:** `@@ -20,20 +20,20`; the three ordinal phrases are removed.
  - **Old form sweep:** `one of this package's runtime dependencies|this package's other runtime dependency|this package's third runtime dependency` over `guides/README.md`: no hit.
  - **Report reading:** “The narrowed repair: each dependency paragraph reads ‘a runtime dependency’. No paragraph added for `probe.md`, `scaffold.md`, or `test.md`.” The tree matches.

- **router-subj-18**
  - **Site now:** `README.md:3-10` gives a present-tense description of the router, dispatcher, navigator, adapter, and dependencies.
  - **Diff:** `README.md @@ -1,9 +1,12`; the replacement paragraph is present.
  - **Old form sweep:** `first @orkestrel|takes shape` over `README.md`: no hit.
  - **Report reading:** “`README.md:3-6` replaced with the present-tense description of the shipped surface.” The tree matches.

- **router-subj-19**
  - **Site now:** `guides/router.md:159` says `preceding`; `:296`, `:366` say `stated earlier`/`as stated earlier`; listed `via` sites use `through`; `guides/router.md:262` retains `ranks below it` as a comparison. `README.md:47` uses `through`.
  - **Diff:** guide hunks `@@ -156,54 +156,56`, `@@ -243,10 +269,13`, `@@ -264,13 +293,15`, `@@ -633,7 +665,7`; README `@@ -41,8 +44,8`; replacements are present.
  - **Old form sweep:** `\bvia\b|\babove\b` over `guides/router.md`, `guides/README.md`, and `README.md`: no hit. `\bbelow\b` has the permitted comparison at `guides/router.md:262`.
  - **Report reading:** “`via` → `through` at every guide and README site; `above` rewritten in words at `:159`, `:267`, `:335`. `ranks below it` left alone.” The tree matches.

- **fleet-F1**
  - **Site now:** `tests/setup.ts:1-40` contains `createTestBody`, not `isBrowserVuePath`; the browser environment exists through `src/browser/`, `tests/setupBrowser.ts`, and the `src:browser` project.
  - **Diff:** `tests/setup.ts @@ -1,6 +1,6` changes only its header comment.
  - **Old form sweep:** `isBrowserVuePath` over `src`, `tests`, `guides`, and `README.md`: no hit.
  - **Report reading:** “`tests/setup.ts` declares no `isBrowserVuePath` ... and the workspace has a browser environment ... Sweep for `isBrowserVuePath` ... no hits.” The tree matches.
  - **Proof reading:** Structural sweep agrees.

- **fleet-F2**
  - **Site now:** `src/core/types.ts:201` is the only `readonly id: string` hit and is a TSDoc example. Classes `Router`, `Group`, `Dispatcher`, `DispatchGroup`, and `Navigator` have no public `readonly id: string` field.
  - **Diff:** No class-order repair hunk applies.
  - **Old form sweep:** `readonly id\s*:\s*string` over `src`: only the TSDoc example at `src/core/types.ts:201`.
  - **Report reading:** “No class declares a public `readonly id: string` data field. Classes read: `Router`, `Group`, `Dispatcher`, `DispatchGroup`, `Navigator`.” The tree matches.
  - **Proof reading:** The `JSON.stringify` sweep finds no serialization of these class instances in guide or non-vendored test code.

### Across the unit

**Scope.** Every path in `conform-router.status` is under Owned:

`README.md`; `guides/README.md`; `guides/router.md`; `src/browser/Navigator.ts`; `src/browser/factories.ts`; `src/browser/helpers.ts`; `src/browser/types.ts`; `src/core/DispatchGroup.ts`; `src/core/Dispatcher.ts`; `src/core/Group.ts`; `src/core/Router.ts`; `src/core/constants.ts`; `src/core/factories.ts`; `src/core/helpers.ts`; `src/core/parsers.ts`; `src/core/types.ts`; `src/server/handlers.ts`; `src/server/helpers.ts`; `src/server/types.ts`; `src/server/validators.ts`; `tests/guides.test.ts`; `tests/setup.ts`; `tests/setupBrowser.ts`; `tests/setupServer.ts`; `tests/src/browser/Navigator.test.ts`; `tests/src/browser/factories.test.ts`; `tests/src/browser/helpers.test.ts`; `tests/src/core/DispatchGroup.test.ts`; `tests/src/core/Dispatcher.test.ts`; `tests/src/core/Group.test.ts`; `tests/src/core/Router.test.ts`; `tests/src/core/factories.test.ts`; `tests/src/core/helpers.test.ts`; `tests/src/core/parsers.test.ts`; `tests/src/server/handlers.test.ts`; `tests/src/server/helpers.test.ts`; `tests/src/server/validators.test.ts`. No Shared or Off-limits path appears.

Diff hunks whose files are not named by any row’s `Where`:

- `src/core/factories.ts @@ -45,8 +45,8` — `+ *   the unmatched...`
- `src/server/handlers.ts @@ -1,8 +1,8` — `+//  Server request handlers...`; `@@ -56,19 +56,19` — `+ * the whole server...`
- `src/server/types.ts @@ -1,7 +1,7` — `+//  fetch vocabulary...`
- `src/server/validators.ts @@ -1,14 +1,14` — `+//  Server guards...`
- `tests/setupBrowser.ts @@ -1,12 +1,12` — `+// ── Browser-test setup...`; `@@ -34,7 +34,7` — `+ * @param value...`; `@@ -42,7 +42,7` — `+ * Reset...`; `@@ -59,7 +59,7` — `+ * @param href...`; `@@ -111,7 +111,7` — `+ * Dispatch...`
- `tests/setupServer.ts @@ -4,10 +4,10` — `+// ── Server-only setup...`; `@@ -38,7 +38,7` — `+ * Binds...`
- `tests/src/browser/factories.test.ts @@ -1,7 +1,7` — `+// The test mirror...`
- `tests/src/core/DispatchGroup.test.ts @@ -2,9 +2,9` — `+// The test mirror...`
- `tests/src/core/Group.test.ts @@ -3,8 +3,8` — `+// The test mirror...`; `@@ -31,7 +31,7` — `+	it('registers...`
- `tests/src/core/factories.test.ts @@ -5,7 +5,7` — `+// The test mirror...`
- `tests/src/core/parsers.test.ts @@ -2,7 +2,7` — `+// The test mirror...`
- `tests/src/server/handlers.test.ts @@ -1,7 +1,7` — `+// The test mirror...`
- `tests/src/server/validators.test.ts @@ -1,7 +1,7` — `+// The test mirror...`

The report’s retained diff metadata is stale: `conform-router.diff` continues through `tests/src/server/validators.test.ts:2880`, while the report states a shorter diff and status listing. The status file itself lists the paths through `conform-router.status:37`.

**Residue.** Diff `+`-line sweep with `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`: one hit, `conform-router.diff:394`, the guide fence’s `console.log`. Tree sweep over `src` and non-vendored `tests`: `src/browser/helpers.ts:121` and `src/server/helpers.ts:51` contain documented `console.log` examples. No `.skip`, `.only`, `.todo`, retry, timeout, TODO, FIXME, or debugger hit appears in the requested population.

**Parity.** The changed contracts and matching guide tables are:

| Entity | Interface members in `types.ts` | Guide methods | Readonly data and Surface |
|---|---|---|---|
| `RouterInterface` | `src/core/types.ts:345-350`: `add`, `match`, `entries`, `group`, `clear` | `guides/router.md:180-186` | `count` at `types.ts:345`; Surface row `guides/router.md:136` |
| `GroupInterface` | `src/core/types.ts:369-371`: `add`, `group` | `guides/router.md:225-227` | `prefix` at `types.ts:369`; Surface row `guides/router.md:137` |
| `DispatcherInterface` | `src/core/types.ts:577-582`: `add`, `group`, `match`, `handle`, `destroy` | `guides/router.md:197-201` | `router`, `emitter` at `types.ts:575-576`; Surface row `guides/router.md:146` |
| `DispatchGroupInterface` | `src/core/types.ts:603-605`: `add`, `group` | `guides/router.md:236-238` | `prefix` at `types.ts:603`; Surface row `guides/router.md:147` |
| `NavigatorInterface` | `src/browser/types.ts:122-126`: `start`, `stop`, `navigate`, `match`, `destroy` | `guides/router.md:210-216` | `router`, `emitter`, `active` at `browser/types.ts:120-122`; Surface row `guides/router.md:150` |

The changed helper `defineRoute` is exported through `src/core/index.ts:3`. Changed browser helpers are exported through `src/browser/index.ts:2`; changed server helpers are exported through `src/server/index.ts:3`.

Backticked identifiers added in guide prose resolve through the relevant barrel: `defineRoute`, `PathParams`, `computeDispatchKey`, `canonicalizePath`, `RouterInterface`, `GroupInterface`, `DispatcherInterface`, `DispatchGroupInterface`, `NavigatorInterface`, `RouteInput`, `DispatchResult`, `DispatcherEventMap`, `NavigatorEventMap`, `RouterMatch`, `Router`, `Group`, `Dispatcher`, `DispatchGroup`, `Navigator`, `METHOD_LIST`, `METHODS`, `TIER_LITERAL`, `TIER_PARAM`, and `TIER_WILDCARD`. `ContractError`, `Emitter`, and `@orkestrel/contract` are dependency symbols and are intentionally not router-barrel exports.

**Gates.** The report records:

| Gate | Exit code | Reading |
|---|---:|---|
| `npm run format:check` | `0` | `All matched files use the correct format.` on 73 files |
| `npm run lint:check` | `0` | no output |
| `npm run check` | `0` | root project plus the three scoped isolation checks |
| `npm run build` | `0` | core, browser, and server built; both `.d.cts` copies written |
| `npm test` | `0` | `src` 265/265, `policy` 111/111, `config` 46/46, `setup` 9/9, `guides` 45/45 |

The independent gate run is not available to this read-only lane.

**Breaking.** The report names these changes:

- Registration and construction errors change from `TypeError` to dependency `ContractError`; consumers replace `TypeError` narrowing with `isContractError`.
- `route` changes to `defineRoute`; consumers update imports and calls.
- `NavigatorInterface.router` changes from `RouterInterface<RouteEntry<Meta>>` to `RouterInterface<Meta>`; consumers remove the extra `.meta` layer.
- `computeNavigationKey` now accepts `RouteEntry<unknown>` and reads `entry.path`.

Consumer sweep over `/home/user/fleet/{server,ollama,middleware,mcp}/{src,app,tests}` finds no `route` import and no browser-entry consumer. The only `route` hits outside the excluded router guides are unrelated browser network APIs, such as `../browser/tests/service/browser.test.ts:114`. The scaffold source has no `route` import or call.

**Writing sweep.** Case-insensitive banned-term sweep over diff `+` lines in prose files finds no requested writing-term hit. The growable-set count pattern also finds no hit. The `new` matches visible in changed TypeScript are code constructions, not prose hits.

## Distillate

- `router-obj-1`: site now `Router.ts:116-123`, `Dispatcher.ts:151-168`, `helpers.ts:140-148`, `Navigator.ts:74-99` | diff present yes | old form hits 0 | report matches yes
- `router-obj-2`: site now `tests/guides.test.ts:190-310`, `Navigator.test.ts:789-875` | diff present yes | old form hits 0 | report matches yes
- `router-obj-3`: site now `tests/guides.test.ts:41-47` | diff present yes | old form hits 0 | report matches yes
- `router-obj-4`: site now `tests/src/server/helpers.test.ts:159-181` | diff present yes | old form hits 0 | report matches yes
- `router-obj-5`: site now `README.md:19` | diff present yes | old form hits 0 | report matches yes
- `router-obj-6`: site now `README.md:20` | diff present yes | old form hits 0 | report matches yes
- `router-obj-7`: site now `guides/README.md:50-51` | diff present yes | old form hits 0 | report matches yes
- `router-obj-8`: site now `src/core/helpers.ts:388-421` | diff present no | old form hits 0 | report matches yes
- `router-obj-9`: site now `Dispatcher.ts:84-86`, `Navigator.ts:119-121` | diff present no for this claim | old form hits 0 | report matches yes
- `router-subj-1`: site now `Navigator.ts:57-68,106-120,165-169`, `browser/types.ts:90-121`, `browser/helpers.ts:27-28` | diff present yes | old form hits 0 | report matches yes
- `router-subj-2`: site now `helpers.ts:421`, guide, README, helper tests | diff present yes | old form hits 0 | report matches yes
- `router-subj-4`: site now `types.ts:511`, guide, dispatcher tests | diff present yes | old form hits 0 payload labels | report matches yes
- `router-subj-5`: site now `Dispatcher.ts:133-137,232-239`, `types.ts:497-503`, guide, test | diff present yes | old form hits 0 | report matches yes
- `router-subj-6`: site now `Navigator.ts:242-250`, exemption retained | diff present no | old form hits 0 | report matches yes
- `router-subj-7`: site now `Navigator.ts:67-68,111,137,140,147,150` | diff present yes | old form hits 0 | report matches yes
- `router-subj-9`: site now `helpers.ts:112-114,246-248`, browser helper `:74-76` | diff present yes | old form hits 0 | report matches yes
- `router-subj-10`: site now listed source, guide, and README prose | diff present yes | old form hits 0 banned tallies | report matches yes
- `router-subj-11`: site now listed source prose | diff present yes | old form hits 0 | report matches yes
- `router-subj-12`: site now `constants.ts:8,37` | diff present yes | old form hits 0 | report matches yes
- `router-subj-14`: site now `guides/router.md:328-335` | diff present yes | old form hits 0 | report matches yes
- `router-subj-15`: site now `guides/router.md:218-238` | diff present yes | old form hits 0 | report matches yes
- `router-subj-16`: site now `guides/router.md:253-263` | diff present yes | old form hits 0 | report matches yes
- `router-subj-17`: site now `guides/README.md:22,28,35` | diff present yes | old form hits 0 | report matches yes
- `router-subj-18`: site now `README.md:3-10` | diff present yes | old form hits 0 | report matches yes
- `router-subj-19`: site now `guides/router.md:159,262,296,366`, `README.md:47` | diff present yes | old form hits 0 banned pointers; permitted `below` 1 | report matches yes
- `fleet-F1`: site now `tests/setup.ts:1-40`, browser axis retained | diff present no for the helper | old form hits 0 | report matches yes
- `fleet-F2`: site now no public `readonly id` field; only TSDoc example at `src/core/types.ts:201` | diff present no | old form hits 0 | report matches yes

Scope tags: every path in `conform-router.status:1-37` is Owned; no Shared or Off-limits path appears.

Residue: diff `+`-line `console.` hit at `conform-router.diff:394`; tree source hits at `src/browser/helpers.ts:121` and `src/server/helpers.ts:51`.

Writing hits: none for the requested banned-term or growable-set patterns.

Parity: `RouterInterface`, `GroupInterface`, `DispatcherInterface`, `DispatchGroupInterface`, and `NavigatorInterface` method tables match the current call-signature members; changed router helpers are barrel-exported; dependency `ContractError` remains dependency-owned.

## Unknowns

None. The requested files, controls, diff, status, rules, and sweeps were reachable. The independent gate result remains the writer’s recorded evidence because this lane is read-only.

## Journal

driver: [left blank]

## Deviation

No tree change was made by this read-only audit. No requested file was unreadable. No requested sweep was unavailable.