I'll read the brief and the repository contracts first, then follow the brief exactly in read-only mode.I'll load the unit brief, audit brief, report, and evidence files next so I can map each row against the tree.I'll gather current sites, the evidence diff, and the named sweeps next, working through the rows in the brief's order.I'll sweep old names, residue, writing, and the remaining diff hunks, then read the cited law sentences.## Question

For every row of unit conform-server, what the tree at `/home/user/fleet/server` carries now, what the unit's diff changed there, and whether the report's readings match the tree.

## Evidence

### server-obj-1

Law (architecture.md): `| Guards | \`*/validators.ts\` |`; "`createWriteDirectory` creates a directory rather than an entity and `isVacant` is a predicate rather than a `Guard<T>`, so both stay in `helpers.ts`. Placement follows what the function is; the name form follows placement."; "The kind table is mandatory whether or not a test can see the violation." Barrel order: `export * from './validators.js'` before `./helpers.js` (`architecture.md:280-281`).

1. **Site now.** Brief `helpers.ts:1466` is no longer the guard. Current `helpers.ts:1464-1468` is `probePort` remarks (`which a numeric \`port\` cannot request`). Symbol is `src/server/validators.ts:28` (`export function isAddressInfo(value: unknown): value is AddressInfo`). Context: `validators.ts:21-29` example + export. Barrel `src/server/index.ts:3-5` `errors.js` then `validators.js` then `helpers.js`. `Server.ts:26-27` splits `compose, readBody` / `isAddressInfo`. `helpers.ts:25` imports from `./validators.js`. Tests: `tests/src/server/validators.test.ts:2,7-16`.
2. **Diff at the site.** `@@ -1439,39 +1450,25 @@` (deletes the helpers declaration); `src/server/validators.ts @@ -0,0 +1,30 @@`; `src/server/index.ts @@ -1,6 +1,7 @@`; `Server.ts @@ -23,7 +23,8 @@`; `helpers.ts @@ -14,15 +13,16 @@`; `helpers.test.ts @@ -999,19 +1006,6 @@`; `validators.test.ts @@ -0,0 +1,18 @@`. Operative repair present. Verbatim `+export * from './validators.js'` (after errors). Verbatim `+export function isAddressInfo(value: unknown): value is AddressInfo`.
3. **Old form sweep.** Name not removed. Pattern `isAddressInfo` over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md`: `src/server/validators.ts:22,24,25,28`; `guides/server.md:124,681`; `src/server/Server.ts:27,174,408`; `src/server/helpers.ts:25,1487`; `tests/src/server/validators.test.ts:2,7,9,13-16`. Inflections `isAddressInfos|isAddressInfoed|isAddressInfoing`: no hit. `export function isAddressInfo` in `helpers.ts`: no hit.
4. **Report reading.** Table: `applied`. Sentence: "`isAddressInfo` moved to `src/server/validators.ts`, barrelled before `helpers.js`, mirrored by `tests/src/server/validators.test.ts`." Those three facts hold at `index.ts:4-5`, `validators.ts:28`, `validators.test.ts:1-16`.
5. **Proof reading.** Behavioural. Report: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/validators.test.ts`; red `1 failed, 1 passed` (`obj-1-planted-red.txt`); green `2 passed` (`obj-1-green.txt`). Files exist. `obj-1-planted-red.txt`: `Tests  1 failed | 1 passed (2)`. `obj-1-green.txt`: `Tests  2 passed (2)`.

### server-obj-2

Law (typescript.md): `| Programmer error or invalid argument | Throw an \`AppError\` |`; "Error classes expose a machine-readable `code` and optional `context`."; "Every public error class ships with a guard such as `isAppError` for safe `catch` narrowing."

1. **Site now.** Brief `helpers.ts:106` is now `if (called)` / reject. `helpers.ts:105-109`: `return Promise.reject(new ServerError('NEXT', 'next() was already called by this middleware'))`. `types.ts:495-499` `'STATUS' | 'NEXT'` with NEXT doc `types.ts:498`. `errors.ts:139-151` summary "when a caller programmed a call the entity refuses"; remarks name `'NEXT'` and "generic 500". Guide `guides/server.md:134,161`. Test `helpers.test.ts:107-126` `isServerError` + `code === 'NEXT'`.
2. **Diff.** `helpers.ts @@ -103,7 +103,10 @@`; `types.ts @@ -480,15 +486,17 @@`; `errors.ts @@ -17,11 +17,14 @@` and `@@ -133,16 +137,18 @@`; `guides/server.md @@ -131,7 +131,7 @@` and `@@ -158,7 +158,7 @@`; `helpers.test.ts @@ -122,9 +114,16 @@`. Verbatim `+new ServerError('NEXT', 'next() was already called by this middleware'),`. Verbatim `+/** Identifies a middleware that called its \`next\` a second time within one invocation. */`.
3. **Old form.** `new Error('next() was already called by this middleware')`: no hit. Pattern over named paths: no hit.
4. **Report.** `applied`. "`The double-\`next\` guard rejects with \`new ServerError('NEXT', …)\`; \`ServerErrorCode\` gained \`'NEXT'\`.` Matches `helpers.ts:108`, `types.ts:499`.
5. **Proof.** `npm --prefix /home/user/fleet/server run test:src:server`; red `1 failed, 257 passed, 1 skipped` (`obj-2-red.txt`: `Tests  1 failed | 257 passed | 1 skipped (259)`); green recorded as `obj-10-green.txt` `259 passed, 1 skipped` (file: `Tests  259 passed | 1 skipped (260)`). File exists.

### server-obj-3

Law (patterns.md): "Never reimplement or rename-wrap a declared package primitive."; "Reuse the originating package directly when semantics match." AGENTS.md: "ALWAYS inspect the exact declared and installed `@orkestrel/*` capabilities before implementing overlapping logic. Reuse a primitive when its semantics match."

1. **Site now.** Brief `helpers.ts:846-848` moved. Current `helpers.ts:16` `import { decodeBase64URL, encodeBase64URL, encodeHex } from '@orkestrel/codec'`. `helpers.ts:851-854` `const hex = encodeHex(new Uint8Array(digest))`.
2. **Diff.** `helpers.ts @@ -14,15 +13,16 @@`; `@@ -843,9 +850,7 @@`. Verbatim `+const hex = encodeHex(new Uint8Array(digest))`. Verbatim `encodeHex` on the codec import `+` line.
3. **Old form.** `Array.from(new Uint8Array`: no hit in `src`/`tests`.
4. **Report.** `applied`. "`computeBodyETag` uses `encodeHex` from `@orkestrel/codec`; the hand-rolled `Array.from(...).join('')` is gone." Matches `helpers.ts:16,853`.
5. **Proof.** Command with `-t "ETag"`; red `1 failed, 6 passed, 123 skipped` (`obj-3-planted-red.txt`: `Tests  1 failed | 6 passed | 123 skipped (130)`); green `7 passed, 123 skipped` (`obj-3-green.txt`: `Tests  7 passed | 123 skipped (130)`).

### server-obj-4

Law (tests.md): `| \`tests/guides.test.ts\` | Every documented API exists, every public API is documented, and every executable fence returns what the guide says it returns |`; "Transcribe each flagship fence and assert the values its comments claim." documentation.md: "That proof has a home: `tests/guides.test.ts` executes the flagship fences."

1. **Site now.** Brief `tests/guides.test.ts:1-171` is still the parity loop (file continues). `describe('guide fences')` at `tests/guides.test.ts:190-254`. Guide fence gzip at `guides/server.md:638-644` uses `CompressionStream('gzip')` and comment `'hi'`. Values at `guides/server.md:619-621,633,636`. Quickstart `guides/server.md:448-450` `start`/`stop`.
2. **Diff.** `tests/guides.test.ts @@ -168,3 +179,77 @@`; `guides/server.md @@ -628,8 +635,13 @@`. Repair present: `+describe('guide fences', () => {`; `+new CompressionStream('gzip')`; assertions `'text/html'`, `'gzip'`, `'en'`, `undefined`, `'client'`, `server.status` `'listening'`/`'stopped'`.
3. **Old form.** No renamed symbol. Placement row's missing-execution form is gone: `describe('guide fences')` exists at `:190`.
4. **Report.** `applied`. "`tests/guides.test.ts` executes the flagship fences; the broken gzip fence in the guide is repaired." Matches `:190` and `guides/server.md:638-644`.
5. **Proof.** `npm --prefix /home/user/fleet/server run test:guides`; red `1 failed, 32 passed` (`obj-4-red.txt`: `Tests  1 failed | 32 passed (33)`); green `33 passed` (`obj-4-green.txt`: `Tests  33 passed (33)`). Report sweep n/a (behavioural). Field-3 has no old-name hits to compare.

### server-obj-5

Law (tests.md): "Any duplicate or near-duplicate helper is a defect; consolidate it into one general form."; "Test files import shared infrastructure rather than declaring local fixture factories."; "Export every reusable helper, fixture type, factory, constant, and guard from setup files."

1. **Site now.** Brief local copies at `helpers.test.ts:49-56` and `Negotiator.test.ts:9-16` are gone. `tests/setup.ts:36-42` `export function buildContext`. Imports: `helpers.test.ts:48`, `Negotiator.test.ts:4`, `guides.test.ts:16` from setup. `tests/setup.test.ts:10-18` proves `url.href`, `method`, `state`, `body()`.
2. **Diff.** `tests/setup.ts @@ -13,3 +14,30 @@`; `helpers.test.ts @@ -45,15 +45,7 @@`; `Negotiator.test.ts @@ -1,20 +1,12 @@`; `setup.test.ts @@ -1,15 +1,19 @@`. Verbatim `+export function buildContext<TState>(state: TState): MiddlewareContext<TState> {`. Destination is `setup.ts` (refuter), not `setupServer.ts` (finder).
3. **Old form.** `function buildContext` over named paths: only `tests/setup.ts:36`. `helpers.test.ts` / `Negotiator.test.ts` local declarations: no hit.
4. **Report.** `applied`. "`buildContext` exported from `tests/setup.ts`; the copies in `helpers.test.ts` and `Negotiator.test.ts` deleted; `tests/setup.test.ts` proves the moved fixture." Matches.
5. **Proof.** `npm --prefix /home/user/fleet/server run test:setup`; red `1 failed, 13 passed` (`obj-5-planted-red.txt`: `Tests  1 failed | 13 passed (14)`); green `14 passed` (`obj-5-green.txt`: `Tests  14 passed (14)`). Sweep agreement: local copies gone; one remaining declaration is the new export.

### server-obj-6

Law (workspace.md): "Node build targets derive from the package's declared supported runtime. Keep `engines`, bundler targets, scoped configs, tests, and documentation aligned; never hard-code one Node version line-wide."

1. **Site now.** Brief `README.md:19`. Current `README.md:18-20`: `- Node.js >= 22.12.0, matching the \`engines\` field in \`package.json\``.
2. **Diff.** `README.md @@ -16,8 +16,8 @@`. Verbatim `+- Node.js >= 22.12.0, matching the \`engines\` field in \`package.json\``.
3. **Old form.** `Node.js >= 24` over named paths: no hit. Inflections n/a.
4. **Report.** `applied`. "`README.md` names the `engines` floor." Matches `:19`. Combined sweep row claims `Node.js >= 24|ESM-only` Empty.
5. **Proof.** Documentation. Report sweep Empty. This lane: `Node.js >= 24` Empty (agrees for this row's removed phrase). Combined `ESM-only` is server-obj-7.

### server-obj-7

Law (writing.md): "Claim only what the reader can check."; workspace.md: `| \`dist/src/server\` | Server library + declarations | ES and CJS |`

1. **Site now.** `README.md:20` `- ESM and CommonJS builds` (refuter text; finder extra "published from one entry point" absent).
2. **Diff.** Same hunk. Verbatim `+- ESM and CommonJS builds`.
3. **Old form.** `ESM-only` over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md`: `tests/distribution.test.ts:60` `an ESM-only one \`.d.mts\``. Inflections n/a.
4. **Report.** `applied`. "`README.md` names the ES and CommonJS builds the package actually ships." Line `:20` matches. Sweep "Empty" does not match this lane's `tests/distribution.test.ts:60` hit.
5. **Proof.** Documentation. Report Empty vs this lane 1 hit (`distribution.test.ts:60`). Disagreement.

### server-obj-8

Law (writing.md structure / AGENTS.md Writing): "Shape the response so the reader can act on it without asking a follow-up question."

1. **Site now.** Brief `guides/server.md:250-254` is now item 1–2. Item 3 is `guides/server.md:255-265`, continuation lines start with three spaces (`   \`idle → starting…\`` at `:256`).
2. **Diff.** `guides/server.md @@ -247,16 +252,16 @@`. Whitespace rewrap present. First `+` of item 3: `+   \`idle → starting → listening → stopping → stopped\`; \`start()\` from`.
3. **Old form.** No name removed.
4. **Report.** `applied`. "The contract item "Status machine + bound address + restart-fresh-abort" rewrapped at the three-space continuation indent. Whitespace only; no word changed." Item title still at `:255`.
5. **Proof.** Documentation / whitespace. No old-name sweep in report for this id. Field 3 empty.

### server-obj-9

Law (writing.md): "Never write `should`, and never soften a recommendation into `We recommend`."; `| \`should\` | \`must\`, \`can\`, \`might\`, or the imperative |`

1. **Site now.** Brief `:404` / `:277` moved. Drain: `guides/server.md:411-413` `A \`false\` result tells a cooperative producer to await \`drain()\`…`. Graceful stop: `:281-282` `a graceful stop lets finish rather than cuts mid-frame.`
2. **Diff.** `@@ -401,7 +408,7 @@`; `@@ -274,7 +279,7 @@`. Verbatim `+    accepting the event. A \`false\` result tells a cooperative producer to await`. Verbatim `+   graceful stop lets finish rather than cuts mid-frame. \`drain\` carries`.
3. **Old form.** `\bshould\b` case-insensitive over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md`: no hit. `shoulds|shoulded|shoulding`: no hit.
4. **Report.** `applied`. "The `drain()` sentence and the graceful-stop sentence rewritten; the file sweeps clean." Matches tree. Report sweep Empty; this lane Empty (agree).
5. **Proof.** Documentation. Sweeps agree: 0 hits.

### server-obj-10

Law (AGENTS.md): "Absence is `undefined`. Never invent sentinels such as `'none'`, `'unset'`, `'unknown'`, `''`, or `-1`."

1. **Site now.** Brief `helpers.ts:1487` is now the TypeError branch `helpers.ts:1487-1490`. Brief `Server.ts:375-378` `#resolvePort` is gone; `#listen` starts at `Server.ts:378`. `let port: number` at `:391`; `server.address()` + TypeError at `:407-411`; after finally `:437` `this.#port = port`. `discoverPort` remarks `helpers.ts:1505-1509`. `start` remarks `types.ts:764-767`.
2. **Diff.** `Server.ts @@ -369,15 +375,6 @@` (deletes `#resolvePort`); `@@ -388,6 +385,10 @@`; `@@ -403,6 +404,11 @@`; `@@ -428,7 +434,6 @@`; `helpers.ts @@ -1484,11 +1481,13 @@`. Verbatim `+throw new TypeError('server bound a listener with no resolvable AddressInfo')` (both sites). Repair's `const address` after `finally` is not how it landed: `+let port: number` then assign inside `try` (report deviation 1).
3. **Old form.** `resolvePort` over named paths: no hit. `#resolvePort`: no hit.
4. **Report.** `applied`. "`probePort` and `Server.#listen` each reject with a `TypeError`; `Server.#resolvePort` deleted." Matches. Sweep Empty; this lane Empty (agree).
5. **Proof.** `test:src:server`; planted red `55 failed, 204 passed, 1 skipped` (`obj-10-planted-red.txt`: `Tests  55 failed | 204 passed | 1 skipped (260)`); green `259 passed, 1 skipped` (`obj-10-green.txt`: `Tests  259 passed | 1 skipped (260)`). Report states no natural red. Sweep agreement: `resolvePort` empty.

### server-obj-11

Law (typescript.md): "State a prerequisite and the failure behavior wherever the symbol has either."; `| I/O/network/external operation | Return \`Result<T, E>\` or throw consistently |`

1. **Site now.** Brief `:1412` `@returns` is now `helpers.ts:1422-1423`. Brief `:1436` `scrubPrototype(parseJSON(text))` is `helpers.ts:1447`. Remarks `helpers.ts:1415-1418`. Guide `guides/server.md:121`.
2. **Diff.** `helpers.ts @@ -1407,9 +1412,15 @@`. Verbatim `+ * @returns The parsed JSON value, the raw text, or \`undefined\` — for an empty`. Guide helpers-table `+` includes the two `undefined` outcomes on `readBody`.
3. **Old form.** Old `@returns` "for an empty body" only: replaced. No symbol rename.
4. **Report.** `applied`. "`readBody`'s `@returns` and `@remarks` name the empty body and the malformed `application/json` body as the `undefined` outcomes; the guide row mirrors it. Behaviour unchanged." Matches `helpers.ts:1415-1423`, `guides/server.md:121`. `readBody` body still `helpers.ts:1447` `parseJSON` without throw.
5. **Proof.** Documentation. No old-name sweep. Behaviour pin `helpers.test.ts` still names malformed JSON (report cites it; not re-read as a command).

### server-obj-12

Law (typescript.md): "Error classes expose a machine-readable `code` and optional `context`."

1. **Site now.** Brief `errors.ts:55-69` class still starts `errors.ts:59`. Remarks at `errors.ts:45-46` "The machine-readable discriminator is `status`; there is no separate `code`." No `code` member on the class (`:59-73`).
2. **Diff.** `errors.ts @@ -39,7 +42,8 @@`. Verbatim `+ * {@link isHTTPError}. The machine-readable discriminator is \`status\`; there is` / `+ * no separate \`code\`.`
3. **Old form.** None removed.
4. **Report.** `applied`. "One `@remarks` sentence on `HTTPError`. No code change." Matches `:45-46`. Class still has `status`/`context`/brand only.
5. **Proof.** Documentation. No sweep.

### server-subj-1

Law (documentation.md): "`AGENTS.md` and its linked rules are the sole convention source. Do not create competing instruction copies in guides."

1. **Site now.** Brief `:4` is `guides/README.md:3-4` "by concept, and by directory." Brief `:63` See-also is now `:81` `- [\`AGENTS.md\`](../AGENTS.md) — the rules, including the documentation contract this index satisfies.`
2. **Diff.** `guides/README.md @@ -1,7 +1,7 @@`; `@@ -51,13 +66,16 @@` See-also line. Verbatim `+directory.` Verbatim `+- [\`AGENTS.md\`](../AGENTS.md) — the rules, including the documentation contract this index satisfies.`
3. **Old form.** `AGENTS §` over named paths: no hit. `§22` in those paths: no hit. (Vendored `guides/timeout.md` etc. still carry `AGENTS §`; those files are outside the named sweep paths.)
4. **Report.** `applied`. "The `AGENTS §22` citations in the opening sentence and in the See-also row removed from `guides/README.md`." Matches `:4` and `:81`. Sweep Empty; this lane Empty on named paths (agree).
5. **Proof.** Documentation. Sweeps agree.

### server-subj-2

Law (AGENTS.md Writing): "NEVER state a count. A number answering \"how many\" about a set anyone can add to is a count"; "NEVER name a list item by its position. Write the item's name, never its ordinal or its number."; documentation.md: "`guides/README.md` is the map".

1. **Site now.** Brief `:18-59` grew. Runtime mirrors use "one of this package's runtime dependencies" at `guides/README.md:21,27,34,41,48,55`. `codec.md` paragraph `:54-60`. Development mirrors `:69-77` (`probe.md`, `scaffold.md`, `test.md`).
2. **Diff.** `@@ -24,26 +24,41 @@`; `@@ -51,13 +66,16 @@`. Verbatim `+one of this package's runtime dependencies` (several). `+[\`codec.md\`](codec.md)` present. Probe/scaffold/test present.
3. **Old form.** `\b(third|fourth|fifth|other runtime dependency)\b` in `guides/README.md`: no hit. Number-words `one of this package's runtime dependencies` remain at the lines above.
4. **Report.** `applied`. "Every ordinal and tally struck; `codec.md` and the development mirrors described." Matches. Report: surviving hits are all `one of this package's runtime dependencies`. This lane agrees.
5. **Proof.** Documentation. Sweeps agree on ordinals gone.

### server-subj-4

Law (names.md): Helper — "camelCase `{verb}{Noun}`"; "Module helpers have no owning entity at the call site, so default to `{verb}{Noun}`… A one-word helper is valid only when its meaning and arguments are unmistakable."; "`parse*`: coercion producing `T | undefined`; cross-type conversion never belongs in a guard."

1. **Site now.** Brief `helpers.ts:1320` is `helpers.ts:1325` `export function parseEncoding`. Call `helpers.ts:1436`. Test `helpers.test.ts:32,644-662`. Guide `guides/server.md:119`.
2. **Diff.** `helpers.ts @@ -1313,11 +1318,11 @@`; `@@ -1422,7 +1433,7 @@`; helpers table `requestEncoding` → `parseEncoding`; `helpers.test.ts @@ -642,25 +641,25 @@`. Verbatim `+export function parseEncoding(header: string | null): Exclude<Encoding, 'identity'> | undefined {`. Verbatim `+ * Parses a raw \`Content-Encoding\` header value into a decompressible`.
3. **Old form.** `\brequestEncoding\b` over named paths: no hit. Inflections `requestEncodings|requestEncoded|requestEncodinging`: no hit.
4. **Report.** `applied`. "`requestEncoding` → `parseEncoding` across source, test, and guide. BREAKING; see § Breaking." Matches. Sweep Empty; this lane Empty on named paths (agree).
5. **Proof.** `helpers.test.ts` vitest command; red `5 failed, 125 passed` (`subj-4-red.txt`: `Tests  5 failed | 125 passed (130)`); green `130 passed` (`subj-4-green.txt`: `Tests  130 passed (130)`). Sweep agreement: old name gone in named paths.

### server-subj-6

Law (names.md): "Generic words: `data`, `info`, `item`, `thing`, `obj`."

1. **Site now.** Brief `helpers.ts:1236` is `helpers.ts:1241` `for (const member of value) scrubPrototype(member)`.
2. **Diff.** `helpers.ts @@ -1233,7 +1238,7 @@`. Verbatim `+		for (const member of value) scrubPrototype(member)`.
3. **Old form.** `\bitem\b` in `src`: no hit. Report also swept `items|info|thing|obj|cfg|msg|doc` over `src`: this lane `\b(item|items|info|thing|obj|cfg|msg|doc)\b` over `src/**/*.ts`: no hit.
4. **Report.** `applied`. "`for (const member of value)` in `scrubPrototype`." Matches `:1241`. Sweep Empty; agree.
5. **Proof.** Naming. Sweeps agree: 0.

### server-subj-8

Law (typescript.md): "Every public export has complete TSDoc: description, `@param`, `@returns`, and `@example` where applicable."

1. **Site now.** Brief `types.ts:713-719` moved. `types.ts:721-735`: docs on `id`, `status`, `port`, `dispatcher`, `emitter`; `use` `:736-746`; `upgrade` `:747-752`. Port text: "Holds the bound listener's TCP port — the `port` of `{@link address}` — or `undefined` while no listener is active." (`:726-728`), not the repair's "derived from `address`".
2. **Diff.** `types.ts @@ -710,15 +718,37 @@`. Verbatim id/status/dispatcher/emitter finder sentences. Port `+` is the `{@link address}` wording, not "derived from `address`". `use`/`upgrade` blocks present.
3. **Old form.** None renamed.
4. **Report.** `applied`. "`id`, `status`, `port`, `dispatcher`, `emitter`, `use`, and `upgrade` carry doc blocks." Matches those members have docs. Does not quote the port sentence; tree port wording ≠ refuter's exact string.
5. **Proof.** TSDoc. No old-name sweep.

### server-subj-9

Law (typescript.md): "State a prerequisite and the failure behavior wherever the symbol has either."; writing.md: "Claim only what the reader can check."

1. **Site now.** Brief `types.ts:269-277` is `types.ts:269-286`. Summary "the coding axis of the same q-value parser"; `@remarks` `:278-284`. Guide `guides/server.md:192-195`. Test `Negotiator.test.ts:89-92` `encoding('', ['gzip', 'deflate'])` is `undefined`.
2. **Diff.** `types.ts @@ -268,11 +268,20 @@`; `guides/server.md @@ -189,6 +189,11 @@`; `Negotiator.test.ts @@ -94,6 +86,12 @@`. Verbatim `+	 * — the coding axis of the same q-value parser (a bare \`*\` wildcard ⇒ the`. Verbatim remarks. Verbatim test title/assert.
3. **Old form.** `negotiate scoped to codings`: no hit.
4. **Report.** `applied`. "`encoding`'s summary and `@remarks` state the divergence; guide and test pin it." Matches `types.ts:271-284`, `guides/server.md:192-195`, `Negotiator.test.ts:89-92`.
5. **Proof.** `Negotiator.test.ts` vitest; red `2 failed, 25 passed` (`subj-9-planted-red.txt`: `Tests  2 failed | 25 passed (27)`); green `27 passed` (`subj-9-green.txt`: `Tests  27 passed (27)`). Old phrasing gone (agree with absence).

### server-subj-10

Law (typescript.md): "Describe a boolean parameter as \"If `true`, …; if `false`, …\", and a boolean return as \"True if …; false otherwise\"."

1. **Site now.** Brief `helpers.ts:290` is `helpers.ts:293-296` encrypted tag with both branches. `weak` at `helpers.ts:842-843`.
2. **Diff.** `helpers.ts @@ -287,7 +290,10 @@`; `@@ -833,7 +839,8 @@`. Verbatim refuter encrypted text (wrapped). Verbatim `+ * @param weak - If \`true\` (the default), returns a weak \`W/"…"\` validator; if`.
3. **Old form.** `@param encrypted - The connection's TLS flag` without branches: replaced. Old weak form: replaced.
4. **Report.** `applied`. "`resolveSecure`'s `encrypted` tag and `computeBodyETag`'s `weak` tag use the fixed "If `true`, …; if `false`, …" form." Matches `:293-296` and `:842-843`.
5. **Proof.** Documentation. No name sweep.

### server-subj-11

Law (AGENTS.md): "Mechanism, not product policy. Framework code supplies reusable mechanisms and stops before application decisions."; documentation.md: "Re-read the prose last, against what actually shipped. Where a change chose to document a limit rather than close it, the sentence was often drafted for the option that lost, or written more confidently than the code earns."

1. **Site now.** Brief `Stream.ts:66` is now comment + merge at `Stream.ts:66-71` `new Headers(SSE_HEADERS)` then `headers.set`. Caveat gone from `types.ts:343-345`, `constants.ts:61-63`, `Stream.ts:12-13`, `guides/server.md:73`. Test `Stream.test.ts:30-34` both casings `'text/plain'`.
2. **Diff.** `Stream.ts @@ -63,7 +63,12 @@`; `@@ -10,8 +10,8 @@`; `types.ts @@ -332,11 +341,8 @@`; `constants.ts @@ -60,7 +60,7 @@`; `guides/server.md @@ -70,7 +70,7 @@`; `Stream.test.ts @@ -27,13 +27,11 @@`. Verbatim `+		const headers = new Headers(SSE_HEADERS)` / `+		for (const [name, value] of Object.entries(options?.headers ?? {})) headers.set(name, value)`. Verbatim test title `REPLACE it in any casing`.
3. **Old form.** `new Headers({ ...SSE_HEADERS, ...options?.headers })`: no hit. `these exact keys`: no hit. `comma-joined`: `src/server/Stream.ts:69` (comment explaining the old hazard); `src/server/helpers.ts:1313` (unrelated multi-coding). `spell a key exactly`: no hit.
4. **Report.** `applied`. "`Stream` merges caller headers with `Headers.set`; the casing caveat is gone from every artifact that carried it." Matches merge. Report sweep: only corrected sentences, implementation comment, test name, unrelated parseEncoding remark. This lane: `Stream.ts:69` and `helpers.ts:1313` for `comma-joined` — agrees with report's "implementation comment" + "unrelated `parseEncoding` remark".
5. **Proof.** `Stream.test.ts` vitest; red `1 failed, 10 passed` (`subj-11-red.txt`: `Tests  1 failed | 10 passed (11)`); green `11 passed` (`subj-11-green.txt`: `Tests  11 passed (11)`). Sweep agreement as above.

### fleet-F1

1. **Site now.** `tests/setup.ts` has no `isBrowserVuePath`. It exports `buildContext` (`:36`) (server-obj-5). `setup.test.ts` proves `buildContext`, not export-free `Object.keys(setup)`.
2. **Diff.** No hunk adds/removes `isBrowserVuePath`. `setup.ts`/`setup.test.ts` hunks are server-obj-5.
3. **Old form.** `isBrowserVuePath` over `tests`, and this lane over `src`/`tests`: no hit.
4. **Report.** `noop`. "`grep -rn "isBrowserVuePath" tests vite.config.ts` returns nothing. The helper is absent from `tests/setup.ts` and from `tests/setup.test.ts`, so this row makes no edit." Helper absent: matches. `setup.test.ts` is not export-free (obj-5 already changed it). Report does not claim the export-free rewrite.
5. **Proof.** Placement. Sweep Empty; this lane Empty (agree). Folding note: helper was already absent; obj-5 used `setup.ts` for `buildContext`.

### fleet-F2

Law (architecture.md Class order): "`#` private fields" first; "Public interface: getters, then methods."

1. **Site now.** `Server.ts:84` `readonly #id: string` is the first `#` field. Constructor `this.#id = crypto.randomUUID()` at `:142`. `get id()` at `:160-162` is the first getter, before `status` `:164`. Interface `types.ts:722` still `readonly id: string`.
2. **Diff.** `Server.ts @@ -80,7 +81,7 @@`; `@@ -138,6 +139,7 @@`; `@@ -155,6 +157,10 @@`. Verbatim `+	readonly #id: string`; `+	get id(): string {`.
3. **Old form.** `readonly id = crypto.randomUUID()`: no hit. Interface `readonly id: string` remains `types.ts:722`.
4. **Report.** `applied`. "`Server`'s public `readonly id` became `readonly #id` (first `#` field) plus `get id()` (first getter). Precondition checked: … No `Server` instance is serialized." `#id` first and `get id()` first: matches `:84`, `:160`. `JSON.stringify` hits: `helpers.ts:267,270,435`; `helpers.test.ts:502`; `Server.test.ts:548`; plus `tests/distribution.test.ts:49,52,479,617` (report's population omitted `distribution.test.ts`). None stringify a `Server` instance in the report's paths.
5. **Proof.** Implementation. Precondition sweep: cookie/token/body sites, no Server instance.

### Across the unit — Scope

Status paths (`conform-server.status`) vs brief § Scope:

| Path | Tag |
| --- | --- |
| `README.md` | owned |
| `guides/README.md` | owned |
| `guides/server.md` | owned |
| `src/server/Server.ts` | owned |
| `src/server/Stream.ts` | owned |
| `src/server/constants.ts` | owned |
| `src/server/errors.ts` | owned |
| `src/server/helpers.ts` | owned |
| `src/server/index.ts` | owned |
| `src/server/types.ts` | owned |
| `src/server/validators.ts` | owned |
| `tests/guides.test.ts` | owned |
| `tests/setup.test.ts` | owned |
| `tests/setup.ts` | owned |
| `tests/src/server/Negotiator.test.ts` | owned |
| `tests/src/server/Stream.test.ts` | owned |
| `tests/src/server/helpers.test.ts` | owned |
| `tests/src/server/validators.test.ts` | owned |

No status path is shared or off-limits. No `package.json` / `node_modules` / `.claude` entry.

Hunks whose **file** no numbered/fleet **Where** names:

- `src/server/constants.ts @@ -60,7 +60,7 @@` first `+`: ` * repeating one of these keys replaces its value.`
- `src/server/index.ts @@ -1,6 +1,7 @@` first `+`: `export * from './validators.js'`
- `src/server/validators.ts @@ -0,0 +1,30 @@` first `+`: `import type { AddressInfo } from 'node:net'`
- `tests/src/server/validators.test.ts @@ -0,0 +1,18 @@` first `+`: `import { describe, expect, it } from 'vitest'`
- `tests/src/server/Stream.test.ts @@ -27,13 +27,11 @@` first `+`: `	it('lets a caller repeating a seam-owned key REPLACE it in any casing', () => {`

(`tests/setup.ts` / `tests/setup.test.ts` are named in fleet-F1 Where.)

### Across the unit — Residue

Diff `+` lines, pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`:

- `conform-server.diff` `+[\`timeout.md\`](timeout.md) is a byte-identical mirror of the guide for`
- `+ \`@orkestrel/timeout\` — one of this package's runtime dependencies. It documents`
- `+**that package's** surface (the \`Timeout\` class, \`TimeoutInterface\`, and the`

(No `.skip(`, `.only(`, `.todo(`, `TODO`, `FIXME`, `console.`, `debugger` on `+` lines.)

Tree `src` and `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

`.skip(` / `.only(` / `.todo(`: `tests/src/server/Server.test.ts:300` `it.skipIf(!BINDS_IPV6)` (`.skipIf`, not `.skip(`).
`TODO` / `FIXME` / `debugger`: no hit in that population.
`console.`: `src/server/errors.ts:92,127,197` (`console.log` in TSDoc examples).
`retry`: `src/server/types.ts:325,326,334`; `src/server/helpers.ts:1164,1183`; `tests/src/server/helpers.test.ts:850-851`; `tests/src/server/Server.test.ts:208-212` (`retryController` / `retryReason` / `'cancel retry'`).
`timeout`: `src/server/types.ts:651,655,680,707`; `src/server/Server.ts:5,22,43,97,125-135,152,208-210,380`; `tests/src/server/Server.test.ts:125,147,152,166,171,220,1127`; `tests/src/server/factories.test.ts:82,88`; `tests/setupServer.ts:127` `AbortSignal.timeout(ms)`.

### Across the unit — Parity

**NegotiatorInterface** (diff-touched in `types.ts`)

| Member | `types.ts` | `guides/server.md` Methods |
| --- | --- | --- |
| `negotiate` | `:268` | `:199` |
| `encoding` | `:286` | `:200` |
| `language` | `:296` | `:201` |
| `format` | `:308` | `:202` |

Readonly data: none on the interface. Guide Types row `guides/server.md:154`.

**StreamInterface** / class `Stream.ts`

| Member | `types.ts` | Methods table |
| --- | --- | --- |
| `write` | `:394` | `:220` |
| `comment` | `:400` | `:221` |
| `drain` | `:409` | `:222` |
| `end` | `:411` | `:223` |

Readonly: `response` `types.ts:382`, `closed` `:384`. Guide Types `guides/server.md:157`; Surface sentence `:170-175`.

**ServerInterface** / class `Server.ts`

| Member | `types.ts` | Methods table |
| --- | --- | --- |
| `use` | `:745` | `:237` |
| `upgrade` | `:752` | `:238` |
| `start` | `:769` | `:239` |
| `stop` | `:784` | `:240` |
| `destroy` | `:790` | `:241` |

Readonly: `id` `types.ts:722`, `status` `:724`, `port` `:729`, `address` `:731`, `dispatcher` `:733`, `emitter` `:735`. Guide Types `guides/server.md:168`; Surface sentence `:171-172`.

**HTTPError** (`errors.ts:59`): `status` `:60`, `context` `:61`. Guide Entities `:132`. No Methods table row.
**ServerError** (`errors.ts:163`): `code` `:164`, `context` `:165`. Guide Entities `:134`. Types `ServerErrorCode` `:495` / guide `:161`.

Backticked identifiers in guide **sentences** the evidence diff added (paragraphs, not the Helpers-table rewrap), and barrel `src/server/index.ts` star-exports:

- `encoding`, `undefined`, `Accept-Encoding`, `negotiate`, `language` (`guides/server.md:192-195`): `encoding`/`negotiate`/`language` are interface methods, not barrel value bindings; types star-exported via `index.ts:1`.
- `drain()` (`:411-413`): method on `StreamInterface`, class exported `index.ts:9`.
- `ServerError`, `'NEXT'`, `next` (`:354-359`): `ServerError` from `errors.js` via `index.ts:3`.
- `isAddressInfo`, `server.address()` (`:681`): `isAddressInfo` from `validators.js` via `index.ts:4`.
- `parseEncoding` (Helpers row `:119`): helpers via `index.ts:5`.
- `readBody` extra clause (`:121`): helpers via `index.ts:5`.
- `SSE_HEADERS` (`:73`): constants via `index.ts:2`.
- `CompressionStream` / `'hi'` in fence (`:638-644`): Web API, not a barrel export.

### Across the unit — Gates

Report § Gates, quoted:

| Gate | Command | Exit | Reading | Log |
| --- | --- | --- | --- | --- |
| `npm run format:check` | `npm --prefix /home/user/fleet/server run format:check` | 0 | 53 files checked | `final-1-format-check.txt` |
| `npm run lint:check` | `npm --prefix /home/user/fleet/server run lint:check` | 0 | no diagnostics | `final-2-lint-check.txt` |
| `npm run check` | `npm --prefix /home/user/fleet/server run check` | 0 | root project and `configs/src/tsconfig.server.json` both clean | `final-3-check.txt` |
| `npm run build` | `npm --prefix /home/user/fleet/server run build` | 0 | ES and CJS emitted, `index.d.cts` copied | `final-4-build.txt` |
| `npm test` | `npm --prefix /home/user/fleet/server test` | 0 | `src:server` 260 passed / 1 skipped; `policy` 111 passed; `config` 46 passed; `setup` 14 passed; `guides` 33 passed | `final-5-test.txt` |

Log files exist. They do not print an exit code. `final-1-format-check.txt`: "All matched files use the correct format." / "53 files". `final-5-test.txt` Tests lines: `260 passed | 1 skipped (261)`; `111 passed`; `46 passed`; `14 passed`; `33 passed`.

### Across the unit — Breaking

Report § Breaking: `requestEncoding` → `parseEncoding`; SSE re-cased merge result; double-`next` class change.

Word-boundary `requestEncoding` across `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/server`, and vendored `guides/server.md` mirrors: **no hit**.

Vendored mirrors (excluded by the brief's exclusion): `mcp/guides/server.md:121`, `middleware/guides/server.md:121`, `ollama/guides/server.md:121`, `toolbox/guides/server.md:121`.

`#resolvePort` / `isAddressInfo` were not published-name removals. `isBrowserVuePath` was absent.

### Across the unit — Writing sweep

Pattern over evidence-diff `+` lines in `guides/**`, `README.md`, src doc comments, test titles/comments:

Banned-word hits (`should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e.g.|i.e.|etc.|please|sanity|dummy|ensure|guarantee`):

- evidence `+` Helpers table (lands in `guides/server.md`): `Clear a cookie via an immediately-expiring` — **tree now** `guides/server.md:93` `by setting` (not `via`)
- evidence `+`: `Compute a content \`ETag\` … via WebCrypto` — **tree now** `guides/server.md:105` `by using`
- evidence `+`: `… across package copies via a structural brand fallback` — **tree now** `guides/server.md:122` `through`

Code `+` lines matching `\bnew\b` (`new TypeError`, `new Headers`, `new Uint8Array`, `new Stream`, `new Negotiator`, `new Request`, `new Error`, `new URL`, `new TextEncoder`, `new Blob`, `new Response`, `new CompressionStream`, `new ServerError`) are not prose.

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on those `+` lines: **no hit**.

`guides/README.md` `+` "one of this package's runtime dependencies" does not match that count pattern (`one of`, not `one <set-noun>`).

## Distillate

- `server-obj-1`: site now `validators.ts:28` (brief `helpers.ts:1466` moved) | diff present yes | old form hits 8 paths still use the name, 0 in helpers declaration | report matches yes
- `server-obj-2`: site now `helpers.ts:106-108` | diff present yes | old form hits 0 | report matches yes
- `server-obj-3`: site now `helpers.ts:16,853` | diff present yes | old form hits 0 | report matches yes
- `server-obj-4`: site now `guides.test.ts:190` (brief `:1-171` still parity) | diff present yes | old form hits 0 | report matches yes
- `server-obj-5`: site now `tests/setup.ts:36` (brief local copies gone) | diff present yes | old form hits 1 (new home only) | report matches yes
- `server-obj-6`: site now `README.md:19` | diff present yes | old form hits 0 | report matches yes
- `server-obj-7`: site now `README.md:20` | diff present yes | old form hits 1 (`tests/distribution.test.ts:60`) | report matches no (sweep Empty vs that hit)
- `server-obj-8`: site now `guides/server.md:255-265` (brief `:250-254` moved) | diff present yes | old form hits 0 | report matches yes
- `server-obj-9`: site now `guides/server.md:411-413` and `:281-282` | diff present yes | old form hits 0 | report matches yes
- `server-obj-10`: site now `helpers.ts:1487-1490`, `Server.ts:378+` (`#resolvePort` gone) | diff present yes (`let port`, not post-`finally` `const address`) | old form hits 0 | report matches yes
- `server-obj-11`: site now `helpers.ts:1415-1423,1447` | diff present yes | old form hits 0 | report matches yes
- `server-obj-12`: site now `errors.ts:45-46` (class `:59`) | diff present yes | old form hits 0 | report matches yes
- `server-subj-1`: site now `guides/README.md:4,81` | diff present yes | old form hits 0 | report matches yes
- `server-subj-2`: site now `guides/README.md:18-77` | diff present yes | old form hits 0 (ordinals) | report matches yes
- `server-subj-4`: site now `helpers.ts:1325` | diff present yes | old form hits 0 | report matches yes
- `server-subj-6`: site now `helpers.ts:1241` | diff present yes | old form hits 0 | report matches yes
- `server-subj-8`: site now `types.ts:721-752` | diff present yes (port not verbatim "derived from `address`") | old form hits 0 | report matches yes on "carry doc blocks"
- `server-subj-9`: site now `types.ts:269-286` | diff present yes | old form hits 0 | report matches yes
- `server-subj-10`: site now `helpers.ts:293-296,842-843` | diff present yes | old form hits 0 | report matches yes
- `server-subj-11`: site now `Stream.ts:70-71` | diff present yes | old form hits 2 (`comma-joined` at `Stream.ts:69`, `helpers.ts:1313`) | report matches yes
- `fleet-F1`: site now helper absent | diff present no (noop) | old form hits 0 | report matches yes
- `fleet-F2`: site now `Server.ts:84,160` | diff present yes | old form hits 0 (public field initializer) | report matches yes

Scope tags: all 18 status paths `owned`; 0 shared; 0 off-limits.

Residue: diff `+` `timeout.md` / `@orkestrel/timeout` / `Timeout` (3); tree (non-vendored) `it.skipIf` `Server.test.ts:300`; `console.log` `errors.ts:92,127,197`; `retry`/`timeout` as API names listed above.

Writing: evidence `+` three `via` helper-row cells; tree those rows are `guides/server.md:93,105,122` without `via`. Count pattern on `+` prose: 0.

Parity: Negotiator `negotiate/encoding/language/format` `types.ts:268,286,296,308` ↔ `guides/server.md:199-202`; Stream `write/comment/drain/end` `:394,400,409,411` ↔ `:220-223`, data `response/closed` `:382,384` ↔ Types `:157`; Server `use/upgrade/start/stop/destroy` `:745,752,769,784,790` ↔ `:237-241`, data `id/status/port/address/dispatcher/emitter` `:722-735` ↔ Types `:168`.

## Unknowns

- Gate log files under `/home/user/work/evidence/server-proofs/final-*.txt` contain no numeric exit code; report § Gates states 0.
- This lane did not re-run npm gates or vitest (read-only).
- `obj-2` green is the later `obj-10-green.txt` capture, not a same-command file named `obj-2-green.txt`.
- Fleet `requestEncoding` sweep used per-package `src`/`tests` searches plus `scaffold/src`; a glob over `/home/user/fleet/*/src` from this workspace root is not independently confirmed beyond those packages.

## Journal


## Deviation

This lane created, edited, and deleted no file. Named inputs were all readable. Sweeps ran.

`/home/user/work/evidence/conform-server.diff` is not identical to the tree at two fix-round-1 sites the report names: evidence `+` Helpers rows still say `via`; tree `guides/server.md:93,105,122` say `by setting` / `by using` / `through`. Evidence `validators.ts` `+` comment says the file "imports types, constants, errors, and that file"; tree `src/server/validators.ts:7-9` says it "imports the `node:net` address type and the `@orkestrel/contract` guards".