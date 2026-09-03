# Question

For each conform-server row, compare the current tree, its diff, and the writer’s report.

# Evidence

Sweep population `P`: `src`, `tests`, `guides/server.md`, `guides/README.md`, and `README.md`, excluding `node_modules/**`.

1. **server-obj-1**
   - **Site now:** The former `helpers.ts:1466` site no longer exists. The guard is in `src/server/validators.ts:15-16`: `isAddressInfo` declaration, with surrounding TSDoc. `helpers.ts:18` imports it; `Server.ts:26` imports it; `index.ts:4` exports `validators.js`; `tests/src/server/validators.test.ts:2` imports it.
   - **Law:** “Guards | `*/validators.ts`.”
   - **Diff:** Relevant hunks are `helpers.ts @@ -1439,39 +1450,25`, `Server.ts @@ -23,7 +23,8`, `index.ts @@ -1,6 +1,7`, `validators.ts @@ -0,0 +1,30`, and the test move hunks at `tests/src/server/helpers.test.ts @@ -16,11 +16,11` and `@@ -999,19 +1006,6`. The operative `isAddressInfo` body is present verbatim in `validators.ts:28-30`.
   - **Old-form sweep:** `\bexport function isAddressInfo\b` over `P`: no hit in `helpers.ts`; the remaining symbol hits are the validator declaration/imports/tests and guide references. Case-insensitive `isaddressinfos|isaddressinfoed|isaddressinfoing` over `P`: no hit.
   - **Report:** `server-obj-1 | applied | isAddressInfo moved to src/server/validators.ts, barrelled before helpers.js, mirrored by tests/src/server/validators.test.ts.` (`conform-server-report.md:20-21`). Matches the tree.
   - **Proof:** `obj-1-planted-red.txt` records `1 failed | 1 passed (2)`; `obj-1-green.txt` records `Tests 2 passed (2)`. Both files exist and match the report.

2. **server-obj-2**
   - **Site now:** `helpers.ts:106-109` rejects with `new ServerError('NEXT', ...)`; `types.ts:494-499` defines `'NEXT'`; `errors.ts:141-150` documents the expanded error; `helpers.test.ts:121-124` checks `isServerError`, `code`, and the unchanged message. The guide rows are at `guides/server.md:134` and `:161`.
   - **Law:** “Programmer error or invalid argument | Throw an `AppError`.”
   - **Diff:** `helpers.ts @@ -103,7 +103,10`, `types.ts @@ -480,15 +486,17`, `errors.ts @@ -17,11 +17,14` and `@@ -133,16 +137,18`, guide hunks `@@ -131,7 +131,7` and `@@ -158,7 +158,7`, and test hunk `@@ -112,7 +104,7` plus `@@ -122,9 +114,16`. The exact operative text appears in `conform-server.diff:564`: `new ServerError('NEXT', 'next() was already called by this middleware')`.
   - **Old-form sweep:** `new Error\(['"]next\(\) was already called` over `P`: no hit. Case-insensitive `nextalreadycalled|nextalreadycalleds|nextalreadycalleded|nextalreadycalling` over `P`: no hit.
   - **Report:** `server-obj-2 | applied | The double-next guard rejects with new ServerError('NEXT', …); ServerErrorCode gained 'NEXT'.` (`conform-server-report.md:21-22`). Matches the tree.
   - **Proof:** `obj-2-red.txt` records `1 failed | 257 passed | 1 skipped (259)`; `obj-10-green.txt` records `259 passed | 1 skipped (260)`. The named green control exists and uses the same `test:src:server` command.

3. **server-obj-3**
   - **Site now:** `helpers.ts:15` imports `encodeHex`; `helpers.ts:850-853` computes `const hex = encodeHex(new Uint8Array(digest))`. The known digest assertion is at `helpers.test.ts:699-700`.
   - **Law:** “Never reimplement or rename-wrap a declared package primitive.”
   - **Diff:** `helpers.ts @@ -14,15 +13,16` and `@@ -843,9 +850,7`; `conform-server.diff:598` contains the exact replacement line.
   - **Old-form sweep:** `Array.from(new Uint8Array(digest)` and `padStart(2, '0')` over `P`: no hit. Case-insensitive `arrayfrom|arrayfroms|arrayfromed|arrayfroming` over `P`: no hit.
   - **Report:** `server-obj-3 | applied | computeBodyETag uses encodeHex from @orkestrel/codec; the hand-rolled Array.from(...).join('') is gone.` (`conform-server-report.md:22`). Matches the tree.
   - **Proof:** `obj-3-planted-red.txt` records `1 failed | 6 passed | 123 skipped (130)`; `obj-3-green.txt` records `7 passed | 123 skipped (130)`. Both controls exist.

4. **server-obj-4**
   - **Site now:** `tests/guides.test.ts:190-250` executes the negotiation, token, decompression, format, and Quickstart fences. The gzip fence in `guides/server.md:638-645` creates real compressed bytes and asserts decoded `'hi'`.
   - **Law:** “Transcribe each flagship fence and assert the values its comments claim.”
   - **Diff:** `tests/guides.test.ts @@ -168,3 +179,77`; guide fence `@@ -628,8 +635,13`. The added gzip construction and assertion appear at `conform-server.diff:980-986`.
   - **Old-form sweep:** `new Response('hi').arrayBuffer()` over `P`: no hit. Case-insensitive `malformedgzip|malformedgzips|malformedgziped|malformedgziping` over `P`: no hit.
   - **Report:** `server-obj-4 | applied | tests/guides.test.ts executes the flagship fences; the broken gzip fence in the guide is repaired.` (`conform-server-report.md:23`). Matches the tree.
   - **Proof:** `obj-4-red.txt` records `1 failed | 32 passed (33)`; `obj-4-green.txt` records `33 passed (33)`. Both files exist.

5. **server-obj-5**
   - **Site now:** `tests/setup.ts:18-40` owns the sole `buildContext` implementation. `helpers.test.ts:42` and `Negotiator.test.ts:4` import it. `setup.test.ts:10-17` tests its URL, method, state, and body.
   - **Law:** “Any duplicate or near-duplicate helper is a defect; consolidate it into one general form.”
   - **Diff:** `tests/setup.ts @@ -1,3 +1,4` and `@@ -13,3 +14,30`; local-copy deletion in `helpers.test.ts @@ -45,15 +45,7` and `Negotiator.test.ts @@ -1,20 +1,12`; setup proof `@@ -1,15 +1,19`. The shared implementation is present at `conform-server.diff:1083`.
   - **Old-form sweep:** `^function buildContext` over `tests/src/server/helpers.test.ts` and `tests/src/server/Negotiator.test.ts`: no hit. Case-insensitive `buildcontexts|buildcontexted|buildcontexting` over `P`: no hit.
   - **Report:** `server-obj-5 | applied | buildContext exported from tests/setup.ts; the copies in helpers.test.ts and Negotiator.test.ts deleted; tests/setup.test.ts proves the moved fixture.` (`conform-server-report.md:24`). Matches the tree.
   - **Proof:** `obj-5-planted-red.txt` records `1 failed | 13 passed (14)`; `obj-5-green.txt` records `14 passed (14)`. Both files exist.

6. **server-obj-6**
   - **Site now:** `README.md:19` reads `Node.js >= 22.12.0, matching the \`engines\` field in \`package.json\``. `package.json:96` and `vite.config.ts:46` remain aligned.
   - **Law:** “Node build targets derive from the package's declared supported runtime.”
   - **Diff:** `README.md @@ -16,8 +16,8`; the exact replacement is at `conform-server.diff:11`.
   - **Old-form sweep:** `Node\.js >= 24` over `P`: no hit. Case-insensitive `nodejs >= 24|nodejs >= 24s|nodejs >= 24ed|nodejs >= 24ing`: no hit.
   - **Report:** `server-obj-6 | applied | README.md names the engines floor. Carries server-subj-3; not applied twice.` (`conform-server-report.md:25`). Matches the tree.
   - **Proof:** Documentation row; the report records the requested sweep and the final gates.

7. **server-obj-7**
   - **Site now:** `README.md:20` reads `ESM and CommonJS builds`; `package.json:26,35-38,64` and `vite.config.ts:42-46` retain the corresponding build surface.
   - **Law:** “Claim only what the reader can check.”
   - **Diff:** `README.md @@ -16,8 +16,8`; the exact replacement is at `conform-server.diff:12`.
   - **Old-form sweep:** `ESM-only|no CommonJS build` over `P`: no hit. Case-insensitive inflection sweep for `esm-only|commonjs build`: no stale claim.
   - **Report:** `server-obj-7 | applied | README.md names the ES and CommonJS builds the package actually ships.` (`conform-server-report.md:26`). Matches the tree.
   - **Proof:** Documentation row; the recorded old-claim sweep is empty.

8. **server-obj-8**
   - **Site now:** `guides/server.md:255-263` keeps item 3’s continuation lines at the sibling three-space indentation; the surrounding item 2 ends at `:254` and item 4 begins at `:264`.
   - **Law:** “Shape the response so the reader can act on it without asking a follow-up question.”
   - **Diff:** `guides/server.md @@ -247,16 +252,16`; only whitespace changes the item-3 block.
   - **Old-form sweep:** Lazy-continuation pattern `^[^ ]` on the item-3 continuation lines over the cited guide region: no hit. Case-insensitive wording sweep for changed text: no changed wording.
   - **Report:** `server-obj-8 | applied | The contract item "Status machine + bound address + restart-fresh-abort" rewrapped at the three-space continuation indent. Whitespace only; no word changed.` (`conform-server-report.md:27`). Matches the tree.
   - **Proof:** Documentation row; the report’s whitespace result agrees with the current guide.

9. **server-obj-9**
   - **Site now:** `guides/server.md:282` reads `graceful stop lets finish rather than cuts mid-frame`; `:411-413` reads `A \`false\` result tells a cooperative producer to await \`drain()\``.
   - **Law:** “Never write `should`, and never soften a recommendation into `We recommend`.”
   - **Diff:** Guide hunks `@@ -274,7 +279,7` and `@@ -401,7 +408,7`.
   - **Old-form sweep:** `\bshould\b` and case-insensitive `should|shoulds|shoulded|shoulding` over `P`: no hit.
   - **Report:** `server-obj-9 | applied | The drain() sentence and the graceful-stop sentence rewritten; the file sweeps clean.` (`conform-server-report.md:27-28`). Matches the tree.
   - **Proof:** Documentation row; the sweep agrees.

10. **server-obj-10**
    - **Site now:** `helpers.ts:1484-1490` closes the probe, rejects non-`AddressInfo` with `TypeError`, and returns `address.port`. `Server.ts:407-414` performs the same narrowing inside `#listen`; `#resolvePort` is absent.
    - **Law:** “Absence is `undefined`. Never invent sentinels such as `'none'`, `'unset'`, `'unknown'`, `''`, or `-1`.”
    - **Diff:** `Server.ts @@ -369,15 +375,9`, `@@ -388,6 +385,10`, `@@ -403,6 +404,11`, and `@@ -428,7 +434,6`; helper hunks `@@ -1484,11 +1481,13` and `@@ -1503,11 +1502,16`. The exact `TypeError` text appears at `conform-server.diff:412` and `:721`.
    - **Old-form sweep:** `#resolvePort|resolvePort` over `P`: no hit. Case-insensitive `unresolvable address yields 0|unresolvable address yields 0s|...ed|...ing`: no hit.
    - **Report:** `server-obj-10 | applied | probePort and Server.#listen each reject with a TypeError; Server.#resolvePort deleted.` (`conform-server-report.md:29`). Matches the tree.
    - **Proof:** `obj-10-planted-red.txt` records `55 failed | 204 passed | 1 skipped (260)`; `obj-10-green.txt` records `259 passed | 1 skipped (260)`. Both files exist. The report correctly notes that the non-`AddressInfo` branch itself is unreachable through the published numeric-port API; the control inverts the live guard and proves the changed path is active.

11. **server-obj-11**
    - **Site now:** `helpers.ts:1414-1419` states malformed JSON returns `undefined`; `:1422-1424` states both empty-body and malformed-JSON outcomes. `guides/server.md:121` mirrors the result.
    - **Law:** “State a prerequisite and the failure behavior wherever the symbol has either.”
    - **Diff:** `helpers.ts @@ -1407,9 +1412,15`; guide helper-table hunk `@@ -78,52 +78,52`.
    - **Old-form sweep:** Exact old return sentence `The parsed JSON value, the raw text, or \`undefined\` for an empty body` over `P`: no hit. Case-insensitive `malformedjson|malformedjsons|malformedjsoned|malformedjsoning` was checked as the added failure description and has only the intentional current documentation hits.
    - **Report:** `server-obj-11 | applied | readBody's @returns and @remarks name the empty body and the malformed application/json body as the undefined outcomes; the guide row mirrors it. Behaviour unchanged.` (`conform-server-report.md:30`). Matches the tree.
    - **Proof:** Documentation-only row; the existing behavioral test remains at `helpers.test.ts:925-931`.

12. **server-obj-12**
    - **Site now:** `errors.ts:34-43` adds `The machine-readable discriminator is status; there is no separate code.` to the `HTTPError` documentation. `HTTPError` still exposes `status`, `context`, and its brand at `:60-64`, with no `code`.
    - **Law:** “Error classes expose a machine-readable `code` and optional `context`.”
    - **Diff:** `errors.ts @@ -39,7 +42,8`; the exact exception sentence is at `conform-server.diff:497-499`.
    - **Old-form sweep:** No symbol is removed or renamed. Sweep for `readonly code` on `HTTPError` over `src/server/errors.ts`: no hit.
    - **Report:** `server-obj-12 | applied | One @remarks sentence on HTTPError. No code change.` (`conform-server-report.md:30-31`). Matches the tree.
    - **Proof:** Documentation-only row; `isHTTPError` remains at `errors.ts:139-140`.

13. **server-subj-1**
    - **Site now:** `guides/README.md:4` ends `by concept, and by directory.`; `:80` replaces the invalid numbered citation with the documentation-contract wording.
    - **Law:** “`AGENTS.md` and its linked rules are the sole convention source. Do not create competing instruction copies in guides.”
    - **Diff:** `guides/README.md @@ -1,7 +1,7` and `@@ -51,13 +66,16`.
    - **Old-form sweep:** `AGENTS\s*§|§2[0-9]` over `P`: no hit.
    - **Report:** `server-subj-1 | applied | The AGENTS §22 citations in the opening sentence and in the See-also row removed from guides/README.md.` (`conform-server-report.md:32`). Matches the tree.
    - **Proof:** Documentation row; sweep agrees.

14. **server-subj-2**
    - **Site now:** `guides/README.md:27,34,41,55` uses `one of this package's runtime dependencies`; `:63-76` documents `codec.md`; `:69-76` covers `probe.md`, `scaffold.md`, and `test.md`.
    - **Law:** “NEVER state a count.”
    - **Diff:** `guides/README.md @@ -24,26 +29,41` and `@@ -51,13 +66,16`.
    - **Old-form sweep:** `\b(one|two|three|four|five|first|second|third|fourth|fifth)\b` over `guides/README.md`: remaining `one` hits are membership phrases, not tallies; no ordinal remains. Numeral-count pattern `\b[0-9]+ (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` over `P`: no hit.
    - **Report:** `server-subj-2 | applied | Every ordinal and tally struck; codec.md and the development mirrors described.` (`conform-server-report.md:33`). Matches the tree.
    - **Proof:** Documentation row; the report’s sense ruling agrees with the sweep.

15. **server-subj-4**
    - **Site now:** `helpers.ts:1303-1326` declares `parseEncoding`; `helpers.ts:1436` calls it; `helpers.test.ts:644-662` tests it; `guides/server.md:119` documents it. No `requestEncoding` remains in package-owned source, tests, or prose.
    - **Law:** “`parse*`: coercion producing `T | undefined`; cross-type conversion never belongs in a guard.”
    - **Diff:** `helpers.ts @@ -1297,8 +1302,8`, `@@ -1313,11 +1318,11`, and `@@ -1422,7 +1433,7`; test rename hunks at `@@ -16,11 +16,11`, `@@ -29,10 +29,10`, and `@@ -642,25 +641,25`; guide helper-table hunk `@@ -78,52 +78,52`.
    - **Old-form sweep:** Word-boundary `\brequestEncoding\b` and case-insensitive `requestencoding|requestencodings|requestencoded|requestencodinging` over `P`: no hit.
    - **Report:** `server-subj-4 | applied | requestEncoding → parseEncoding across source, test, and guide. BREAKING; see § Breaking.` (`conform-server-report.md:34`). The package-owned tree matches; the report also records the four excluded mirror-guide hits.
    - **Proof:** `subj-4-red.txt` records `5 failed | 125 passed (130)`. The report names `obj-10-green.txt` as green, which exists but records the broader `src:server` run (`259 passed | 1 skipped`), not the same single-file command. The exact same-command green control is therefore not present.

16. **server-subj-6**
    - **Site now:** `helpers.ts:1240-1242` binds the array element as `member`; `scrubPrototype(member)` follows.
    - **Law:** “Generic words: `data`, `info`, `item`, `thing`, `obj`.”
    - **Diff:** `helpers.ts @@ -1233,7 +1238,7`; exact replacement at `conform-server.diff:608`.
    - **Old-form sweep:** `\b(item|items|info|thing|obj|cfg|msg|doc)\b` over `src`: no hit.
    - **Report:** `server-subj-6 | applied | for (const member of value) in scrubPrototype.` (`conform-server-report.md:35`). Matches the tree.
    - **Proof:** Naming row; sweep agrees.

17. **server-subj-8**
    - **Site now:** `types.ts:721-735` documents `id`, `status`, `port`, `address`, `dispatcher`, and `emitter`; `:736-756` documents `use` and `upgrade`. The guide’s `ServerInterface` Surface row remains at `guides/server.md:168`.
    - **Law:** “Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable.”
    - **Diff:** `types.ts @@ -710,15 +718,37`; the exact added member docs appear in `conform-server.diff:820-857`.
    - **Old-form sweep:** Missing-doc form `readonly (id|status|port|dispatcher|emitter)` immediately preceded by another member with no doc block: no hit. No symbol is renamed or removed.
    - **Report:** `server-subj-8 | applied | id, status, port, dispatcher, emitter, use, and upgrade carry doc blocks.` (`conform-server-report.md:35-36`). Matches the tree.
    - **Proof:** Documentation row; the interface and guide Surface row agree.

18. **server-subj-9**
    - **Site now:** `types.ts:270-283` describes the coding axis and its `undefined` fallback; `guides/server.md:192-196` mirrors the divergence; `Negotiator.test.ts:89-93` asserts `encoding('')` is `undefined` while `negotiate('')` returns `'gzip'`.
    - **Law:** “State a prerequisite and the failure behavior wherever the symbol has either.”
    - **Diff:** `types.ts @@ -268,11 +268,20`, guide `@@ -189,6 +189,11`, and test `@@ -94,6 +86,12`.
    - **Old-form sweep:** Exact old phrase ``negotiate` scoped to codings` over `P`: no hit. Case-insensitive `negotiate scoped to coding|...s|...ed|...ing`: no hit.
    - **Report:** `server-subj-9 | applied | encoding's summary and @remarks state the divergence; guide and test pin it.` (`conform-server-report.md:36`). Matches the tree.
    - **Proof:** `subj-9-planted-red.txt` records `2 failed | 25 passed (27)`; `subj-9-green.txt` records `27 passed (27)`. Both files exist.

19. **server-subj-10**
    - **Site now:** `helpers.ts:292-296` documents both `encrypted` branches; `:841-844` documents both `weak` branches.
    - **Law:** “Describe a boolean parameter as ‘If `true`, …; if `false`, …’.”
    - **Diff:** `helpers.ts @@ -287,7 +290,10` and `@@ -833,7 +839,8`; exact fixed-form additions are at `conform-server.diff:574-578` and `:588-590`.
    - **Old-form sweep:** The old complete tags `@param encrypted - The connection's TLS flag ({@link ...})` and `@param weak - \`true\` for a weak` over `P`: no hit.
    - **Report:** `server-subj-10 | applied | resolveSecure's encrypted tag and computeBodyETag's weak tag use the fixed "If true, …; if false, …" form.` (`conform-server-report.md:37`). Matches the tree.
    - **Proof:** Documentation row; sweep agrees.

20. **server-subj-11**
    - **Site now:** `Stream.ts:66-70` constructs `Headers(SSE_HEADERS)` and applies caller entries with `headers.set`. `types.ts:343-346`, `constants.ts:61-63`, and `guides/server.md:73` state caller replacement in any casing. `Stream.test.ts:30-35` expects replacement for both spellings.
    - **Law:** “Mechanism, not product policy. Framework code supplies reusable mechanisms and stops before application decisions.”
    - **Diff:** `Stream.ts @@ -63,7 +63,12`; documentation hunks in `Stream.ts @@ -10,8 +10,8`, `types.ts @@ -332,11 +341,8`, `constants.ts @@ -60,7 +60,7`, guide `@@ -70,7 +70,7`, and test `@@ -27,13 +27,11`. The operative loop is present at `conform-server.diff:450`.
    - **Old-form sweep:** `different casing appends|comma-joined value|spell a key exactly` over `P`: no hit. The permitted current phrase `in any casing` remains.
    - **Report:** `server-subj-11 | applied | Stream merges caller headers with Headers.set; the casing caveat is gone from every artifact that carried it.` (`conform-server-report.md:38`). Matches the tree.
    - **Proof:** `subj-11-red.txt` records `1 failed | 10 passed (11)`; `subj-11-green.txt` records `11 passed (11)`. Both files exist.

21. **fleet-F1**
    - **Site now:** `src/browser/**`, `app/browser/**`, and `tests/setupBrowser.ts` are absent. `isBrowserVuePath` is absent from `tests/setup.ts` and `tests/setup.test.ts`.
    - **Law:** The ruling applies only where the browser helper exists or a browser environment is present.
    - **Diff:** No hunk applies. The brief permits `noop` when the helper is absent.
    - **Old-form sweep:** `isBrowserVuePath` over `tests` and `vite.config.ts`: no hit.
    - **Report:** `fleet-F1 | noop | grep -rn "isBrowserVuePath" tests vite.config.ts returns nothing. The helper is absent from this workspace.` (`conform-server-report.md:40`). Matches the tree.
    - **Proof:** No behavioral control is required for this noop.

22. **fleet-F2**
    - **Site now:** `Server.ts:84` declares `readonly #id`, `:143` assigns it, and `:160-162` exposes the first getter. No public `readonly id` field remains in the class; `types.ts:722` keeps `readonly id: string`.
    - **Law:** “`#` private fields: context, options, state/result, child managers.”
    - **Diff:** `Server.ts @@ -80,7 +81,7`, `@@ -138,6 +139,7`, and `@@ -155,6 +157,10`.
    - **Old-form sweep:** `readonly id = crypto.randomUUID()` over `src`: no hit. `JSON.stringify` sweep over `src`, `tests/src`, `tests/guides.test.ts`, `guides/server.md`, and `README.md` finds no serialized `Server` instance.
    - **Report:** `fleet-F2 | applied | Server's public readonly id became readonly #id (first # field) plus get id() (first getter).` (`conform-server-report.md:40-41`). Matches the tree.
    - **Proof:** Placement row; the serialization precondition agrees with the sweep.

### Across the unit

**Scope.** Every status entry is `owned` under the brief’s Scope row:

`README.md`, `guides/README.md`, `guides/server.md`, `src/server/Server.ts`, `src/server/Stream.ts`, `src/server/constants.ts`, `src/server/errors.ts`, `src/server/helpers.ts`, `src/server/index.ts`, `src/server/types.ts`, `src/server/validators.ts`, `tests/guides.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/src/server/Negotiator.test.ts`, `tests/src/server/Stream.test.ts`, `tests/src/server/helpers.test.ts`, and `tests/src/server/validators.test.ts`.

No `shared` or `off-limits` path appears in `conform-server.status`.

Diff hunks whose files have no row `Where` path:

- `src/server/constants.ts @@ -60,7 +60,7` — `+ * repeating one of these keys replaces its value.`
- `src/server/index.ts @@ -1,6 +1,7` — `+export * from './validators.js'`
- `src/server/validators.ts @@ -0,0 +1,30` — `+import type { AddressInfo } from 'node:net'`
- `tests/setup.test.ts @@ -1,15 +1,19` — `+import { buildContext } from './setup.js'`
- `tests/setup.ts @@ -1,3 +1,4` — `+import type { MiddlewareContext } from '@src/server'`
- `tests/setup.ts @@ -13,3 +14,30` — `+/**`
- `tests/src/server/validators.test.ts @@ -0,0 +1,18` — `+import { describe, expect, it } from 'vitest'`

**Diff residue sweep.** Pattern: `^\+.*(\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger)` over `conform-server.diff`.

- `conform-server.diff:56` — `+` `timeout.md` paragraph contains `timeout` as a dependency-guide name.
- No `.skip(`, `.only(`, `.todo(`, `TODO`, `FIXME`, `console.`, or `debugger` hits.

Pattern: `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger` over `src` and `tests`, excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, and `tests/distribution.test.ts`.

- `src/server/types.ts:325-326,651,655,680,707`
- `src/server/Server.ts:5,22,43,97,125-135,152,208-210,380`
- `src/server/helpers.ts:1164,1183`
- `src/server/errors.ts:92,127,197`
- `tests/src/server/helpers.test.ts:850-851`
- `tests/src/server/Server.test.ts:125,147,152,166,171,208-212,220,1127`
- `tests/src/server/factories.test.ts:82,88`
- `tests/setupServer.ts:127`

These are existing retry/timeout terms or test data, not added residue.

**Parity.**

| Entity | `types.ts` call-signature members | Guide `## Methods` rows |
|---|---|---|
| `NegotiatorInterface` | `negotiate` `types.ts:268`; `encoding` `:283`; `language` `:297`; `format` `:308-312` | `negotiate` `guides/server.md:199`; `encoding` `:200`; `language` `:201`; `format` `:202` |
| `StreamInterface` | `write` `types.ts:393`; `comment` `:402`; `drain` `:411`; `end` `:413` | `write` `guides/server.md:220`; `comment` `:221`; `drain` `:222`; `end` `:223` |
| `ServerInterface` | `use` overloads `types.ts:747-748`; `upgrade` `:757`; `start` `:770`; `stop` `:789`; `destroy` `:804` | `use` `guides/server.md:238`; `upgrade` `:239`; `start` `:240`; `stop` `:241`; `destroy` `:242` |

Readonly data properties and guide Surface rows:

- `StreamInterface`: `response` and `closed` at `types.ts:382-385`; guide Surface row `guides/server.md:158` names both.
- `ServerInterface`: `id`, `status`, `port`, `address`, `dispatcher`, and `emitter` at `types.ts:722-735`; guide Surface row `guides/server.md:168` names all six, and `:170-174` identifies them as readonly.
- `StreamOptions`: `status` and `headers` at `types.ts:346-347`; guide Surface row `guides/server.md:158` names the options shape.

Guide-added backticked identifiers:

- `guides/README.md:56-76,80`: `timeout.md`, `@orkestrel/timeout`, `Timeout`, `TimeoutInterface`, `codec.md`, `@orkestrel/codec`, `encode*`, `decode*`, `is*`, `measure*`, `probe.md`, `@orkestrel/probe`, `scaffold.md`, `@orkestrel/scaffold`, `test.md`, `@orkestrel/test`.
- `guides/README.md:80`: `AGENTS.md`.
- `guides/server.md:73`: `SSE_HEADERS`, `Stream`, `headers`.
- `guides/server.md:134`: `ServerError`, `'STATUS'`, `'NEXT'`.
- `guides/server.md:161`: `ServerErrorCode`, `ServerError`, `next`.
- `guides/server.md:192-196`: `negotiate`, `encoding`, `language`, `undefined`, `Accept-Encoding`.
- `guides/server.md:255-263`: `start`, `ServerError`, `'STATUS'`, `isServerError`, `address`, `AddressInfo`, `stop`, `destroy`, `EADDRINUSE`, `discoverPort`.
- `guides/server.md:282-284`: `drain`, `stop`, `destroy`.
- `guides/server.md:351-359`: `next`, `ServerError`, `'NEXT'`, `status`.
- `guides/server.md:638-645`: `decompressRequestBody`, `gzip`.
- `guides/server.md:678-686`: `isAddressInfo`, `node:net`, `server.address()`.
- All server-owned identifiers in this list resolve through `src/server/index.ts`; dependency-guide identifiers resolve to their dependency mirrors and are not server-barrel exports.

**Writing sweep.** Pattern: `^\+.*\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b` over added prose lines in `guides/**`, `README.md`, source doc comments, and test titles/comments.

Hits:

- `conform-server.diff:173` — `Clear a cookie via an immediately-expiring Set-Cookie.`
- `conform-server.diff:185` — `Compute a content ETag ... via WebCrypto.`
- `conform-server.diff:202` — `Narrow an unknown ... via a structural brand fallback.`

The three `via` hits are in added guide table prose and remain contrary to the writing substitution table. No other prohibited writing hit was found.

Count pattern: `^\+.*\b(one|two|three|four|five|six|seven|eight|nine|ten|[0-9]+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b`: no hit.

**Gates.** The report’s gate table (`conform-server-report.md:124-133`) states:

- `npm --prefix /home/user/fleet/server run format:check` — exit `0`.
- `npm --prefix /home/user/fleet/server run lint:check` — exit `0`.
- `npm --prefix /home/user/fleet/server run check` — exit `0`.
- `npm --prefix /home/user/fleet/server run build` — exit `0`.
- `npm --prefix /home/user/fleet/server test` — exit `0`.

The named logs exist. Their summaries are:

- `final-1-format-check.txt`: `All matched files use the correct format.`
- `final-2-lint-check.txt`: no diagnostics.
- `final-3-check.txt`: scoped server `tsc` completed without diagnostics.
- `final-4-build.txt`: ES and CJS outputs emitted; `index.d.cts` copied.
- `final-5-test.txt`: `src:server` `260 passed | 1 skipped`; policy `111 passed`; config `46 passed`; setup `14 passed`; guides `33 passed`.

**Breaking.** The report names:

- `server-subj-4`: `requestEncoding` renamed to `parseEncoding`; no fleet source/test importer remains. The sweep over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, and `/home/user/scaffold/src`, excluding the server package and guide mirrors, returns no hits. The four remaining hits are excluded mirrors:
  - `/home/user/fleet/toolbox/guides/server.md:121`
  - `/home/user/fleet/ollama/guides/server.md:121`
  - `/home/user/fleet/middleware/guides/server.md:121`
  - `/home/user/fleet/mcp/guides/server.md:121`
- `server-subj-11`: recased SSE headers now replace rather than append; no consumer depends on the invalid append result.
- `server-obj-2`: the rejection class changes from `Error` to `ServerError`; the message remains unchanged.

No consumer-side patch is required by the recorded fleet sweep.

# Distillate

- `server-obj-1`: site moved to `validators.ts` | diff present yes | old form hits 0 | report matches yes
- `server-obj-2`: `ServerError('NEXT')` | diff present yes | old form hits 0 | report matches yes
- `server-obj-3`: `encodeHex` | diff present yes | old form hits 0 | report matches yes
- `server-obj-4`: executable guide fences | diff present yes | old form hits 0 | report matches yes
- `server-obj-5`: shared `tests/setup.ts` fixture | diff present yes | old form hits 0 | report matches yes
- `server-obj-6`: README runtime floor | diff present yes | old form hits 0 | report matches yes
- `server-obj-7`: README build formats | diff present yes | old form hits 0 | report matches yes
- `server-obj-8`: rewrapped contract item | diff present yes | old form hits 0 | report matches yes
- `server-obj-9`: no `should` remains | diff present yes | old form hits 0 | report matches yes
- `server-obj-10`: no `0` sentinel path | diff present yes | old form hits 0 | report matches yes
- `server-obj-11`: `readBody` documentation | diff present yes | old form hits 0 | report matches yes
- `server-obj-12`: `HTTPError` exception documented | diff present yes | old form hits 0 | report matches yes
- `server-subj-1`: no `AGENTS §22` citation | diff present yes | old form hits 0 | report matches yes
- `server-subj-2`: named guide mirrors | diff present yes | old form hits 0 | report matches yes
- `server-subj-4`: `parseEncoding` | diff present yes | old form hits 0 | report matches yes
- `server-subj-6`: `member` binding | diff present yes | old form hits 0 | report matches yes
- `server-subj-8`: member TSDoc | diff present yes | old form hits 0 | report matches yes
- `server-subj-9`: encoding fallback divergence | diff present yes | old form hits 0 | report matches yes
- `server-subj-10`: boolean parameter forms | diff present yes | old form hits 0 | report matches yes
- `server-subj-11`: case-insensitive header replacement | diff present yes | old form hits 0 | report matches yes
- `fleet-F1`: helper absent; permitted noop | diff present no | old form hits 0 | report matches yes
- `fleet-F2`: private `#id` plus getter | diff present yes | old form hits 0 | report matches yes

Scope tags: every status path is `owned`; no `shared` or `off-limits` status path appears.

Residue: one added `timeout` hit at `conform-server.diff:56`; no added skip, only, todo, retry, TODO, FIXME, console, or debugger residue.

Writing hits: `via` at `conform-server.diff:173,185,202`; no count-pattern hits.

Parity: `NegotiatorInterface`, `StreamInterface`, and `ServerInterface` method tables match their call-signature members; readonly Surface properties match the guide’s `ServerInterface` and `StreamInterface` rows.

# Unknowns

- The registry `@orkestrel/codec@0.0.1` tarball was not independently inspected; the tree only proves the staged installed declaration exports `encodeHex`.
- The non-`AddressInfo` listener branch in `server-obj-10` has no direct reachable behavioral driver because the published API supplies numeric ports only.
- `server-subj-4` lacks a same-command green control file: the report cites the broader `obj-10-green.txt` run instead.

# Journal

# Deviation

No tree change, unread input file, or unreachable sweep was found.