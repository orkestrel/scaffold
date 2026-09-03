I'll read the brief and the scaffold contracts first, then follow the brief exactly in read-only mode.The brief is a per-row evidence map. I’ll load the unit brief, audit brief, report, and evidence next.I'll gather current sites, diff hunks, old-form sweeps, and proof files in parallel.Next I’ll pin current line numbers at each row site and run the old-form and residue sweeps.I’ll pull test sites, proof summaries, and the remaining sweeps next.## Question

For every row of unit conform-server, what does the tree at `/home/user/fleet/server` carry now, what did the unit's diff change there, and do the report's readings match the tree — so that the objective auditor reads a map instead of the whole tree?

## Evidence

### Per-row

#### server-obj-1

1. **Site now.** Brief `helpers.ts:1466` (`export function isAddressInfo`) is gone from helpers. Current declaration `src/server/validators.ts:28` (`export function isAddressInfo(value: unknown): value is AddressInfo {`), context `27` blank / `29` `return isRecord(value) && isNumber(value.port)`. Import now `helpers.ts:25` `import { isAddressInfo } from './validators.js'` and `Server.ts:27` same specifier. Barrel `src/server/index.ts:4` `export * from './validators.js'` after `./errors.js` (`:3`) before `./helpers.js` (`:5`). Tests `tests/src/server/validators.test.ts:2,7`; `tests/src/server/helpers.test.ts` has no `isAddressInfo`.
2. **Diff at the site.** `helpers.ts @@ -1439,39 +1448,25 @@` (declaration deleted); `validators.ts @@ -0,0 +1,30 @@`; `index.ts @@ -1,6 +1,7 @@`; `Server.ts @@ -23,7 +23,8 @@`; `helpers.ts @@ -14,15 +13,16 @@`; `helpers.test.ts @@ -16,11 +16,11 @@` and `@@ -999,19 +1006,6 @@`; `validators.test.ts @@ -0,0 +1,18 @@`. Operative repair present in `+` lines: `+export function isAddressInfo(value: unknown): value is AddressInfo {` (`conform-server.diff` at the new file); `+export * from './validators.js'`; `+import { isAddressInfo } from './validators.js'` (helpers and Server). Finder’s “after the `./helpers.js` row” is not in the `+` lines; refuter’s after-`errors.js` placement is.
3. **Old form sweep.** Removed form: `export function isAddressInfo` in `helpers.ts`. Pattern `export function isAddressInfo` over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md`: `src/server/validators.ts:28` only. Inflections `isAddressInfos|isAddressInfoed|isAddressInfoing`: no hit. Name `isAddressInfo` still at `src/server/validators.ts:22,24,25,28`, `src/server/helpers.ts:25,1486`, `src/server/Server.ts:27,174,409`, `tests/src/server/validators.test.ts:2,7,9,13-16`, `guides/server.md:124,681`. `tests/src/server/helpers.test.ts`: no hit.
4. **Report reading.** Table: `applied` — “`isAddressInfo` moved to `src/server/validators.ts`, barrelled before `helpers.js`, mirrored by `tests/src/server/validators.test.ts`.” Tree carries that. Report `tests/guides.test.ts:131` `symbol.keyword === 'function'` is true at `tests/guides.test.ts:131`.
5. **Proof reading.** Report: planted-red `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/validators.test.ts` → 1 failed, 1 passed (`obj-1-planted-red.txt`); green 2 passed (`obj-1-green.txt`). Files exist. `obj-1-planted-red.txt`: `Tests  1 failed | 1 passed (2)`. `obj-1-green.txt`: `Tests  2 passed (2)`. Placement sweep in report (declared only in validators.ts, imported from `./validators.js`) agrees with field 3.

#### server-obj-2

1. **Site now.** Brief `helpers.ts:106` → `helpers.ts:106-109`:
   `105` `(nextRequest?: Request): Promise<Response> => {` / `106` `if (called)` / `107-109` `return Promise.reject(new ServerError('NEXT', 'next() was already called by this middleware'),)` / `110` `called = true`. `ServerError` on the helpers import `helpers.ts:24`. `ServerErrorCode` `types.ts:495-499` `'STATUS' | 'NEXT'`. `errors.ts:140-141` summary “when a caller programmed a call the entity refuses”; `errors.ts:146-149` `'NEXT'` reaches the request boundary as a generic 500. Guide `guides/server.md:134` and `:161` name both codes. Test `helpers.test.ts:107-126` `isServerError` + `caught.code === 'NEXT'` + message.
2. **Diff at the site.** `helpers.ts @@ -103,7 +103,10 @@`; `@@ -14,15 +13,16 @@`; `errors.ts @@ -17,11 +17,14 @@` and `@@ -133,16 +137,18 @@`; `types.ts @@ -480,15 +486,17 @@`; `guides/server.md @@ -131,7 +131,7 @@` and `@@ -158,7 +158,7 @@`; `helpers.test.ts @@ -112,7 +104,7 @@` and `@@ -122,9 +114,16 @@`. `+` contains verbatim `new ServerError('NEXT', 'next() was already called by this middleware')` and `+	| 'NEXT'`.
3. **Old form sweep.** Removed phrase `new Error('next() was already called by this middleware')`. Pattern that string over the named paths: no hit. Remaining message text (kept): `helpers.ts:108`, `helpers.test.ts:126,144`. `new Error(` in `src/server/helpers.ts`: no hit.
4. **Report reading.** `applied` — “The double-`next` guard rejects with `new ServerError('NEXT', …)`; `ServerErrorCode` gained `'NEXT'`.” Tree matches.
5. **Proof reading.** Report red: `npm --prefix /home/user/fleet/server run test:src:server` → 1 failed, 257 passed, 1 skipped (`obj-2-red.txt`). `obj-2-red.txt`: `Tests  1 failed | 257 passed | 1 skipped (259)`. Green named as `obj-10-green.txt` (259 passed, 1 skipped). `obj-2-green.txt` does not exist. `obj-10-green.txt`: `Tests  259 passed | 1 skipped (260)`.

#### server-obj-3

1. **Site now.** Brief `helpers.ts:846-848` → `helpers.ts:851` `const hex = encodeHex(new Uint8Array(digest))`, context `850` digest line / `852` return. Import `helpers.ts:16` `import { decodeBase64URL, encodeBase64URL, encodeHex } from '@orkestrel/codec'`.
2. **Diff at the site.** `helpers.ts @@ -14,15 +13,16 @@`; `@@ -843,9 +848,7 @@`. `+` contains verbatim `const hex = encodeHex(new Uint8Array(digest))` and the `encodeHex` import.
3. **Old form sweep.** Removed `Array.from(new Uint8Array(digest)` and `padStart(2, '0')`. Both patterns over the named paths: no hit.
4. **Report reading.** `applied` — “`computeBodyETag` uses `encodeHex` from `@orkestrel/codec`; the hand-rolled `Array.from(...).join('')` is gone.” Tree matches. Extra known-digest test at `helpers.test.ts:695-700` is beyond the row’s “tests stay green unchanged”; present in the diff (`@@ -693,6 +692,14 @@`).
5. **Proof reading.** Planted-red command as reported; `obj-3-planted-red.txt`: `Tests  1 failed | 6 passed | 123 skipped (130)`. `obj-3-green.txt`: `Tests  7 passed | 123 skipped (130)`. Sweep agrees (hand-roll gone).

#### server-obj-4

1. **Site now.** Brief `tests/guides.test.ts:1-171` still holds name-resolution/parity cases (e.g. `:123-133`). Fence block added at `tests/guides.test.ts:182-253` `describe('guide fences')`. Guide gzip fence now `guides/server.md:638-644` with `CompressionStream('gzip')` and comment `'hi' — capped decompression, the zip-bomb defense`. Value fences `guides/server.md:620-636`.
2. **Diff at the site.** `tests/guides.test.ts @@ -3,6 +3,16 @@`, `@@ -168,3 +178,76 @@`; `guides/server.md @@ -628,15 +635,20 @@`. `+` contains `describe('guide fences')`, `toBe('text/html')` / `'gzip'` / `'en'`, `verifyToken('bad.token'`, `decodeTokenPayload`, Quickstart `server.status` `'listening'`/`'stopped'`, and `CompressionStream('gzip')`. Operative comment text used an em dash after “decompression”; `+` line is `// 'hi' — capped decompression, the zip-bomb defense` (comma after decompression). `buildContext` import `+import { buildContext } from './setup.js'`.
3. **Old form sweep.** Row adds execution; removes the plain-bytes gzip fence `new Response('hi').arrayBuffer()` as the gzip input. Pattern `new Response('hi').arrayBuffer()` over the named paths: no hit.
4. **Report reading.** `applied` — “`tests/guides.test.ts` executes the flagship fences; the broken gzip fence in the guide is repaired.” Tree matches.
5. **Proof reading.** `obj-4-red.txt`: `Tests  1 failed | 32 passed (33)` (gzip fence case). `obj-4-green.txt`: `Tests  33 passed (33)`. Behavioural; control files exist and match the reported counts.

#### server-obj-5

1. **Site now.** Brief local factories `helpers.test.ts:49-56` and `Negotiator.test.ts:9-16` are gone. `tests/setup.ts:36` `export function buildContext<TState>(state: TState): MiddlewareContext<TState> {`, context `:35` blank / `:37` `return {`. Imports `helpers.test.ts:48` and `Negotiator.test.ts:4` from `'../../setup.js'`. `tests/setup.test.ts:10-18` proves `url.href`, `method`, `state`, `body()`. Local `function buildContext` in `tests/` besides `setup.ts:36`: no hit.
2. **Diff at the site.** `helpers.test.ts @@ -45,15 +45,7 @@`; `Negotiator.test.ts @@ -1,20 +1,12 @@`; `setup.ts @@ -13,3 +14,30 @@`; `setup.test.ts @@ -1,15 +1,19 @@`. `+` contains `export function buildContext<TState>(state: TState): MiddlewareContext<TState> {` and the setup.test assertions. Finder’s `setupServer.ts` is not in the `+` lines; refuter’s `tests/setup.ts` is.
3. **Old form sweep.** Removed local `function buildContext` copies and the export-free case title `contributes no exported name to a consuming suite`. Pattern `contributes no exported name` over the named paths: no hit. Pattern `function buildContext`: only `tests/setup.ts:36`.
4. **Report reading.** `applied` — export from `tests/setup.ts`; copies deleted; `tests/setup.test.ts` proves the fixture. Tree matches.
5. **Proof reading.** `obj-5-planted-red.txt`: `Tests  1 failed | 13 passed (14)`. `obj-5-green.txt`: `Tests  14 passed (14)`. Matches. Sweep agrees.

#### server-obj-6

1. **Site now.** Brief `README.md:19` → `README.md:19` `- Node.js >= 22.12.0, matching the `engines` field in `package.json``, context `:18` blank / `:20` ESM line.
2. **Diff at the site.** `README.md @@ -16,8 +16,8 @@`. `+` contains verbatim `- Node.js >= 22.12.0, matching the `engines` field in `package.json``.
3. **Old form sweep.** Pattern `Node.js >= 24` over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md`: no hit. Inflections of that phrase: no hit.
4. **Report reading.** `applied` — “`README.md` names the `engines` floor.” Line 19 carries that.
5. **Proof reading.** Documentation row. Report sweep `Node\.js >= 24|ESM-only` records `tests/distribution.test.ts:60`. This sweep: `ESM-only` hit `tests/distribution.test.ts:60` only; `Node.js >= 24` no hit. Agrees on the ESM-only residue; 24-floor is gone.

#### server-obj-7

1. **Site now.** Brief `README.md:20` → `README.md:20` `- ESM and CommonJS builds`, context `:19` Node line / `:21` blank.
2. **Diff at the site.** Same hunk `README.md @@ -16,8 +16,8 @@`. `+` contains verbatim `- ESM and CommonJS builds` (finder’s extra “, published from one entry point” is absent).
3. **Old form sweep.** Pattern `ESM-only` over the named paths: `tests/distribution.test.ts:60` (`ESM-only` in a declaration-file comment). Pattern `no CommonJS build`: no hit.
4. **Report reading.** `applied` — “`README.md` names the ES and CommonJS builds the package actually ships.” Line 20 carries that.
5. **Proof reading.** Same sweep as obj-6; agrees (`tests/distribution.test.ts:60` remains).

#### server-obj-8

1. **Site now.** Brief `guides/server.md:250-254` → item 3 at `guides/server.md:255-265`, every continuation indented three spaces. Context `:254` “both directions” / `:266` item 4.
2. **Diff at the site.** `guides/server.md @@ -247,16 +252,16 @@`. `+` rewraps the same words; no word substitution in that hunk.
3. **Old form sweep.** Whitespace-only; no name removed. Column-0 continuation `stopping → stopped` as a line start: no hit in `guides/server.md`.
4. **Report reading.** `applied` — “rewrapped at the three-space continuation indent. Whitespace only; no word changed.” The hunk is a wrap of the same tokens.
5. **Proof reading.** Documentation; report records no dedicated sweep for this id. Field 3 has no old-name hits.

#### server-obj-9

1. **Site now.** Brief `:404` → `guides/server.md:411-413` `A `false` result tells a cooperative producer to await` / ``drain()`; that promise parks…`. Brief `:277` → `guides/server.md:281-282` `graceful stop lets finish rather than cuts mid-frame.`
2. **Diff at the site.** `guides/server.md @@ -401,7 +408,7 @@`; `@@ -274,7 +279,7 @@`. `+` contains verbatim `A `false` result tells a cooperative producer to await` and `graceful stop lets finish rather than cuts mid-frame.`
3. **Old form sweep.** Pattern `\bshould\b` (and `-s/-ed/-ing`) over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md`: no hit in those paths. (Vendored `guides/test.md`, `guides/contract.md`, `guides/guide.md` still contain `should`; they are outside the named paths if the sweep is package-owned prose; a whole-tree `guides/*.md` grep hits those mirrors.)
4. **Report reading.** `applied` — drain sentence and graceful-stop sentence rewritten; file sweeps clean. Owned-path `\bshould\b` is empty, matching the report’s owned sweep (report also included `tests/setupServer.ts`; empty there too).
5. **Proof reading.** Report sweep empty; this sweep empty on the named paths. Agrees.

#### server-obj-10

1. **Site now.** Brief `helpers.ts:1487` (`? address.port : 0`) → `helpers.ts:1486-1489` `if (!isAddressInfo(address)) { throw new TypeError('server bound a listener with no resolvable AddressInfo') }` then `return address.port`. Close happens first (`:1482-1484`). Brief `Server.ts:375-378` `#resolvePort` is gone. `#listen` is `Server.ts:378`; address narrow `Server.ts:407-412`; `let port: number` at `Server.ts:391` before the `try`. `#resolvePort` symbol: no hit in the tree.
2. **Diff at the site.** `Server.ts @@ -369,15 +375,6 @@` (method deleted); `@@ -388,6 +385,10 @@`; `@@ -403,6 +404,12 @@`; `@@ -428,7 +435,6 @@`; `helpers.ts @@ -1484,11 +1479,14 @@`; `@@ -1503,11 +1501,16 @@`; `types.ts @@ -731,7 +761,10 @@`. `+` contains the TypeError string and `#resolvePort` deletion. Operative “use `address.port` after the `finally`” is not literal: `+		let port: number` and `+			port = address.port` inside the `try`.
3. **Old form sweep.** Patterns `resolvePort`, `#resolvePort`, `unresolvable address yields`: no hit over the named paths. Inflections `resolvePorts|resolvePorted|resolvePorting`: no hit. Sentinel ternary `: 0` at probePort: no hit.
4. **Report reading.** `applied` — probePort and `#listen` reject with `TypeError`; `#resolvePort` deleted. Tree matches. Report § Deviations records the `let port` placement; that is in the tree at `Server.ts:391,412,438`.
5. **Proof reading.** `obj-10-planted-red.txt`: `Tests  55 failed | 204 passed | 1 skipped (260)`. `obj-10-green.txt`: `Tests  259 passed | 1 skipped (260)`. Matches. Sweep agrees (`resolvePort` empty).

#### server-obj-11

1. **Site now.** Brief `helpers.ts:1412` `@returns` → `helpers.ts:1420-1421` `@returns The parsed JSON value, the raw text, or `undefined` — for an empty` / `body, and for an `application/json` body whose text is not valid JSON`. Brief `helpers.ts:1436` return → `helpers.ts:1445` `if (bareType === 'application/json') return scrubPrototype(parseJSON(text))` (behaviour unchanged). Remarks `helpers.ts:1413-1416`. Guide `guides/server.md:121` names both `undefined` outcomes.
2. **Diff at the site.** `helpers.ts @@ -1407,9 +1410,15 @@`; `guides/server.md` helpers-table hunk `@@ -78,52 +78,52 @@`. `+` contains the `@returns` split lines and the malformed-JSON `@remarks` sentence (plus an extra sentence “That makes `undefined` the answer for two distinct inputs…”).
3. **Old form sweep.** Removed `@returns` phrase “or `undefined` for an empty body” as the sole meaning. Pattern `undefined` for an empty body` without the malformed clause, as a complete `@returns`: no hit. Guide row no longer ends at `context.body()`.
4. **Report reading.** `applied` — docs name both `undefined` outcomes; behaviour unchanged. `helpers.ts:1445` still `scrubPrototype(parseJSON(text))`. Matches.
5. **Proof reading.** Documentation; report lists it among rows with no behavioural control. Field 3 has no surviving old `@returns`.

#### server-obj-12

1. **Site now.** Brief `errors.ts:55-69` class body → `errors.ts:59-73` (`status`, `context`, brand; no `code`). The remarks sentence is `errors.ts:45-46` `The machine-readable discriminator is `status`; there is no separate `code`.`
2. **Diff at the site.** `errors.ts @@ -39,7 +42,8 @@`. `+` contains verbatim `The machine-readable discriminator is `status`; there is no separate `code`.`
3. **Old form sweep.** No symbol removed. Pattern `readonly code` on `HTTPError`: no hit (`ServerError` still has `errors.ts:164` `readonly code: ServerErrorCode`).
4. **Report reading.** `applied` — one `@remarks` sentence; no code change. Tree matches (class members unchanged aside from the remarks addition).
5. **Proof reading.** Documentation; no behavioural control. Agrees.

#### server-subj-1

1. **Site now.** Brief `guides/README.md:4` → `guides/README.md:3-4` “by concept, and by directory.” Brief `:63` → `guides/README.md:81` `- [`AGENTS.md`](../AGENTS.md) — the rules, including the documentation contract this index satisfies.`
2. **Diff at the site.** `guides/README.md @@ -1,7 +1,7 @@`; the See-also change is in `@@ -51,13 +66,16 @@` ending with the AGENTS line. `+` contains `directory.` and the rewritten See-also line verbatim.
3. **Old form sweep.** Patterns `AGENTS §22`, `§22 documentation-as-contracts`, `AGENTS §` over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md`: no hit. (Vendored dependency guides still contain `AGENTS §N`.)
4. **Report reading.** `applied` — citations removed from the opening sentence and See-also row. Lines 4 and 81 carry the new text.
5. **Proof reading.** Report sweep empty on owned paths; this sweep empty on the named paths. Agrees.

#### server-subj-2

1. **Site now.** Brief `guides/README.md:18-59` → `guides/README.md:18-77`. Ordinals gone; each runtime mirror uses “one of this package's runtime dependencies” (`:21,27,34,41,48,55`). `codec.md` paragraph `:54-60`. Development mirrors `:69-77`.
2. **Diff at the site.** `guides/README.md @@ -24,26 +24,41 @@`; `@@ -51,13 +66,16 @@`. `+` contains `one of this package's runtime dependencies`, the codec surface sentence (Base64, base64url, hex, UTF-8, ISO-8859-1, Windows-1252, UTF-16LE, `encode*`/`decode*`/`is*`/`measure*`), and probe/scaffold/test sentences.
3. **Old form sweep.** Patterns `third runtime dependency`, `fourth runtime dependency`, `fifth runtime dependency`, `other runtime dependency` over the named paths: no hit. Number-word hits remaining in `guides/README.md`: `one of this package's runtime dependencies` at `:21,27,34,41,48,55`. Numeral-count pattern over the named paths: no hit in this file.
4. **Report reading.** `applied` — ordinals/tallies struck; codec and development mirrors described. Tree matches (paragraph order: runtime mirrors including timeout then codec, then guide, then remaining toolchain).
5. **Proof reading.** Report: surviving hits are all `one of this package's runtime dependencies`; no ordinal remains. This sweep agrees.

#### server-subj-4

1. **Site now.** Brief `helpers.ts:1320` `requestEncoding` → `helpers.ts:1323` `export function parseEncoding(...)`. TSDoc first sentence `helpers.ts:1303-1304`. Example `:1319-1320`. Call `helpers.ts:1434`. Tests `helpers.test.ts:32,644-662`. Guide `guides/server.md:119`.
2. **Diff at the site.** `helpers.ts @@ -1297,8 +1300,8 @@`, `@@ -1313,11 +1316,11 @@`, `@@ -1422,7 +1431,7 @@`; `helpers.test.ts` import/describe hunks; `guides/server.md` helpers-table hunk. `+` contains verbatim `export function parseEncoding` and `Parses a raw `Content-Encoding` header value into a decompressible`.
3. **Old form sweep.** Word-boundary `requestEncoding` and inflections `requestEncodings|requestEncoded|requestEncodinging` over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md`: no hit.
4. **Report reading.** `applied` — rename across source, test, and guide. BREAKING. Tree matches. Report § Breaking cites consumer mirrors at `ollama/middleware/toolbox/mcp` `guides/server.md:121` still `requestEncoding` — those files still have that row.
5. **Proof reading.** `subj-4-red.txt`: `Tests  5 failed | 125 passed (130)`. `subj-4-green.txt`: `Tests  130 passed (130)`. Matches. Old-name sweep empty; agrees.

#### server-subj-6

1. **Site now.** Brief `helpers.ts:1236` → `helpers.ts:1239` `for (const member of value) scrubPrototype(member)`, context `:1238` array check / `:1240` `return value`.
2. **Diff at the site.** `helpers.ts @@ -1233,7 +1236,7 @@`. `+` contains verbatim `for (const member of value) scrubPrototype(member)`.
3. **Old form sweep.** Pattern `\bitem(s|ed|ing)?\b` over `src`: no hit. Over `tests`: `tests/src/server/helpers.test.ts:747` `parseRange('items=0-1', 1000)`; `tests/config.test.ts:2` “Required items” (off-limits to the unit, inside the distill sweep’s `tests`). Over `guides/server.md`: `:327` “item 5's drain”. `guides/README.md`, `README.md`: no hit. `src` empty matches the report’s `src`-only sweep; the distill population is wider.
4. **Report reading.** `applied` — `for (const member of value)` in `scrubPrototype`. `helpers.ts:1239` carries that.
5. **Proof reading.** Report: `item|items|info|thing|obj|cfg|msg|doc` over `src` empty. This `src` `\bitem\b` sweep: no hit. Agrees on `src`. Extra hits outside `src` listed in field 3.

#### server-subj-8

1. **Site now.** Brief `types.ts:713-719` → `types.ts:721-752`: `id` `:722`, `status` `:724`, `port` `:726-729`, `dispatcher` `:733`, `emitter` `:735`, `use` `:736-745`, `upgrade` `:747-752`. Port wording: “Holds the bound listener's TCP port — the `port` of {@link address} — or `undefined` while no listener is active.”
2. **Diff at the site.** `types.ts @@ -710,15 +718,37 @@`. `+` contains the finder wordings for `id`, `status`, `dispatcher`, `emitter`. Port `+` text is `Holds the bound listener's TCP port — the `port` of {@link address} — or` / ``undefined` while no listener is active.` — not the refuter’s “derived from `address`” sentence verbatim. `use`/`upgrade` blocks are present (not a single third-person sentence only; they include `@param` / `@remarks`).
3. **Old form sweep.** No name removed.
4. **Report reading.** `applied` — those members “carry doc blocks.” Each named member now has a `/**` block immediately above it. Matches that claim; does not record the port-wording delta.
5. **Proof reading.** TSDoc row; no behavioural control. Report lists it among documentation rows.

#### server-subj-9

1. **Site now.** Brief `types.ts:269-277` → `types.ts:269-285`: summary “the coding axis of the same q-value parser…” (`:271-272`); `@remarks` `:278-284`. Guide paragraph `guides/server.md:192-195`. Test `Negotiator.test.ts:89-92` `negotiator.encoding('', ['gzip', 'deflate'])` is `undefined`.
2. **Diff at the site.** `types.ts @@ -268,11 +268,20 @@`; `guides/server.md @@ -189,6 +189,11 @@`; `Negotiator.test.ts @@ -94,6 +86,12 @@`. `+` contains the summary replacement and the remarks (split across `{@link}` lines, same sentences). Test `+` contains `encoding('', ['gzip', 'deflate'])`.
3. **Old form sweep.** Pattern `negotiate scoped to codings` over the named paths: no hit.
4. **Report reading.** `applied` — summary and `@remarks` state the divergence; guide and test pin it. Tree matches.
5. **Proof reading.** `subj-9-planted-red.txt`: `Tests  2 failed | 25 passed (27)`. `subj-9-green.txt`: `Tests  27 passed (27)`. Matches.

#### server-subj-10

1. **Site now.** Brief `helpers.ts:290` → `helpers.ts:293-296` `@param encrypted - The connection's TLS flag` / `({@link …encrypted}). If `true`, an omitted` / ``secure` resolves to `Secure`; if `false`, an omitted `secure` resolves to` / `no `Secure` attribute.` Brief `:836` → `helpers.ts:840-841` `If `true` (the default), returns a weak `W/"…"` validator; if` / ``false`, returns a strong `"…"` one.`
2. **Diff at the site.** `helpers.ts @@ -287,7 +290,10 @@`; `@@ -833,7 +837,8 @@`. `+` contains the refuter `encrypted` clauses (with an added `{@link}` wrap) and the `weak` tag verbatim as wrapped.
3. **Old form sweep.** Pattern `The connection's TLS flag` without `If \`true\`` as a complete tag: the old form is gone. Pattern ``true` for a weak`: no hit.
4. **Report reading.** `applied` — both tags use “If `true`, …; if `false`, …”. Tree matches (encrypted tag also has the `{@link}` clause).
5. **Proof reading.** Documentation; no behavioural control.

#### server-subj-11

1. **Site now.** Brief `Stream.ts:66` → `Stream.ts:70-71` `const headers = new Headers(SSE_HEADERS)` / `for (const [name, value] of Object.entries(options?.headers ?? {})) headers.set(name, value)`. Caveat gone from `types.ts:343-345`, `constants.ts:61-63`, `Stream.ts:12-13`, `guides/server.md:73`. Test `Stream.test.ts:30-34`.
2. **Diff at the site.** `Stream.ts @@ -63,7 +63,12 @@` and `@@ -10,8 +10,8 @@`; `types.ts @@ -332,11 +341,8 @@`; `constants.ts @@ -60,7 +60,7 @@`; `guides/server.md @@ -70,7 +70,7 @@`; `Stream.test.ts @@ -27,13 +27,11 @@`. `+` contains verbatim `const headers = new Headers(SSE_HEADERS)` and the `headers.set` loop, and the test title `lets a caller repeating a seam-owned key REPLACE it in any casing`.
3. **Old form sweep.** Pattern `new Headers({ ...SSE_HEADERS` : no hit. `comma-joined` in `src`/`guides/server.md`/`tests/src`: `Stream.ts:69` comment “comma-joined value”; `helpers.ts:1311` “comma-joined multi-coding”; test title no longer APPEND. `exact keys`: no hit. `spell a key exactly`: no hit.
4. **Report reading.** `applied` — merge through `Headers.set`; casing caveat gone from every artifact that carried it. Implementation comment at `Stream.ts:66-69` still names the old spread hazard. Test and types/constants/guide summaries match the report.
5. **Proof reading.** `subj-11-red.txt`: `Tests  1 failed | 10 passed (11)`. `subj-11-green.txt`: `Tests  11 passed (11)`. Matches. Sweep mostly agrees; `comma-joined` remains in an implementation comment and an unrelated `parseEncoding` remark, as the report’s caveat sweep also noted.

#### fleet-F1

1. **Site now.** Brief Where `tests/setup.ts` `isBrowserVuePath`: helper absent. `tests/setup.ts:1-43` is the header plus `buildContext` (server-obj-5). `tests/setup.test.ts` describes `buildContext`, not an export-free `adds no export` case.
2. **Diff at the site.** No `isBrowserVuePath` lines in the diff. `setup.ts` / `setup.test.ts` hunks are the `buildContext` move (server-obj-5).
3. **Old form sweep.** `isBrowserVuePath` and inflections over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md`: no hit. Also no hit in `vite.config.ts`.
4. **Report reading.** `noop` — grep returns nothing; helper absent. Tree matches. Report does not record a fold into server-obj-5; obj-5 populated `setup.ts` with an export, so the export-free proof is not the current `setup.test.ts`.
5. **Proof reading.** Report sweep empty; this sweep empty. Agrees on absence. The “where a numbered row already deletes the helper, fold” branch does not apply (helper was already absent). The “sole export / rewrite as export-free proof” branch was not taken; server-obj-5 added an export instead.

#### fleet-F2

1. **Site now.** `Server.ts:84` `readonly #id: string` is the first `#` field; `Server.ts:142` `this.#id = crypto.randomUUID()`; `Server.ts:160-162` `get id(): string { return this.#id }` is the first getter. Interface `types.ts:722` `readonly id: string` unchanged as a data member (now with a doc block from subj-8).
2. **Diff at the site.** `Server.ts @@ -80,7 +81,7 @@`; `@@ -138,6 +139,7 @@`; `@@ -155,6 +157,10 @@`. `+` contains `readonly #id: string`, `this.#id = crypto.randomUUID()`, and `get id(): string`.
3. **Old form sweep.** Pattern `readonly id = crypto.randomUUID()`: no hit. Public field form gone.
4. **Report reading.** `applied` — public `readonly id` became `#id` plus `get id()`. Tree matches. Report JSON.stringify precondition: cookie/token/body sites only — not re-derived here beyond noting the report’s claim.
5. **Proof reading.** Report records the JSON.stringify grep as precondition, not an old-name sweep. Field 3: old field initializer gone.

### Across the unit

#### Scope

Status (`conform-server.status`) vs brief § Scope:

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

No status path is shared or off-limits. No `package.json`, `package-lock.json`, `node_modules/**`, `.claude/**`, `configs/**`, or vendored `tests/setupPolicy.ts` / `policy.test.ts` / `config.test.ts`.

Diff hunks whose **file** no row **Where** names (row Where files: `helpers.ts`, `guides.test.ts`, `helpers.test.ts`, `Negotiator.test.ts`, `README.md`, `guides/server.md`, `Server.ts`, `errors.ts`, `guides/README.md`, `types.ts`, `Stream.ts`, `setup.ts`):

- `src/server/constants.ts @@ -1,8 +1,8 @@` first `+` `// inside THIS package: a capability arrives with its first real consumer,`
- `src/server/constants.ts @@ -60,7 +60,7 @@` first `+` ` * repeating one of these keys replaces its value.`
- `src/server/index.ts @@ -1,6 +1,7 @@` first `+` `export * from './validators.js'`
- `src/server/validators.ts @@ -0,0 +1,30 @@` first `+` `import type { AddressInfo } from 'node:net'`
- `tests/setup.test.ts @@ -1,15 +1,19 @@` first `+` `import { buildContext } from './setup.js'`
- `tests/src/server/Stream.test.ts @@ -27,13 +27,11 @@` first `+` `	it('lets a caller repeating a seam-owned key REPLACE it in any casing', () => {`
- `tests/src/server/validators.test.ts @@ -0,0 +1,18 @@` first `+` `import { describe, expect, it } from 'vitest'`

#### Residue

Diff `+` lines, pattern `\.skip\(|\.only\(|\.todo\(|retry|timeout|TODO|FIXME|console\.|debugger`:

- `conform-server.diff` `+[`timeout.md`](timeout.md) is a byte-identical mirror of the guide for`
- `conform-server.diff` `+`@orkestrel/timeout` — one of this package's runtime dependencies. It documents`

No `+` hit for `.skip(`, `.only(`, `.todo(`, `TODO`, `FIXME`, `console.`, `debugger`, `retry`.

Tree `src` and `tests` excluding `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`:

`.skip(` / `.only(` / `.todo(`: `tests/src/server/Server.test.ts:300` `it.skipIf(!BINDS_IPV6)(...)`.

`retry`: `src/server/helpers.ts:1162,1181`; `src/server/types.ts:325,326,334`; `tests/src/server/helpers.test.ts:850,851`; `tests/src/server/Server.test.ts:208,209,210,211,212`.

`timeout`: `src/server/Server.ts:5,22,43,97,125,126,128,131,132,133,135,152,208,209,210,380`; `src/server/types.ts:651,655,680,707`; `tests/src/server/Server.test.ts:125,147,152,166,171,220,1127`; `tests/src/server/factories.test.ts:82,88`; `tests/setupServer.ts:127`.

`console.`: `src/server/errors.ts:92,127,197`.

`TODO` / `FIXME` / `debugger` in that population: no hit.

#### Parity

Call-signature members vs `guides/server.md` Methods (entities the diff touches in `src/**/types.ts` or a class file):

| Entity | Member | `types.ts` | `guides/server.md` |
| --- | --- | --- | --- |
| NegotiatorInterface | `negotiate` | `:268` | `:199` |
| NegotiatorInterface | `encoding` | `:286` | `:200` |
| NegotiatorInterface | `language` | `:296` | `:201` |
| NegotiatorInterface | `format` | `:308-312` | `:202` |
| StreamInterface | `write` | `:394` | `:220` |
| StreamInterface | `comment` | `:400` | `:221` |
| StreamInterface | `drain` | `:409` | `:222` |
| StreamInterface | `end` | `:411` | `:223` |
| ServerInterface | `use` | `:745-746` | `:237` |
| ServerInterface | `upgrade` | `:752` | `:238` |
| ServerInterface | `start` | `:769` | `:239` |
| ServerInterface | `stop` | `:784` | `:240` |
| ServerInterface | `destroy` | `:790` | `:241` |

Readonly data vs guide Surface/Types/Entities:

| Entity | Property | `types.ts` | Guide |
| --- | --- | --- | --- |
| StreamInterface | `response`, `closed` | `:382`, `:384` | Types row `:157` |
| ServerInterface | `id`, `status`, `port`, `address`, `dispatcher`, `emitter` | `:722`, `:724`, `:729`, `:731`, `:733`, `:735` | Types row `:168`; prose `:171-172` |
| HTTPError | `status`, `context` | `errors.ts:60-61` | Entities `:132` |
| ServerError | `code` | `errors.ts:164` | Entities `:134`; Types `ServerErrorCode` `:161` |
| StreamOptions | `status?`, `headers?` | `:348-349` | Types `:156` |
| SSEMessage | `retry?` | `:334` | Types `:155` |

Barrel `src/server/index.ts:1-9` is `export *` from types, constants, errors, validators, helpers, factories, Negotiator, Server, Stream.

Backticked identifiers in **added** guide sentences (diff `+` prose in `guides/server.md`, `guides/README.md`, `README.md`) and whether that barrel re-exports the identifier:

- README `:19` `engines`, `package.json` — not barrel exports
- `guides/README.md` `:47-50` `timeout.md`, `@orkestrel/timeout`, `Timeout`, `TimeoutInterface` — not this barrel
- `:54-58` `codec.md`, `@orkestrel/codec`, `encode*` / `decode*` / `is*` / `measure*` — not this barrel
- `:72-77` `probe.md`, `scaffold.md`, `test.md`, `@orkestrel/probe`, `@orkestrel/scaffold`, `@orkestrel/test` — not this barrel
- `:81` `AGENTS.md` — not a barrel export
- `guides/server.md:192-195` `encoding` (method, not a top-level export), `undefined` (not an export), `Accept-Encoding` (not), `negotiate` (method), `language` (method)
- `:255-265` rewrap: `ServerError` yes (errors), `'STATUS'` / `'NEXT'` (type literals on `ServerErrorCode`, exported via types), `isServerError` yes, `address` (property), `discoverPort` yes
- `:281-282` `drain` (method)
- `:296-300` `next`, `ServerError`, `'NEXT'` — `next` not a top-level export; `ServerError` yes
- `:411-413` `false`, `drain()` — not top-level exports
- `:638-644` fence: `CompressionStream` (platform), `decompressRequestBody` yes (helpers)
- `:119` `parseEncoding`, `Content-Encoding`, `Encoding` — `parseEncoding` and `Encoding` yes via helpers/types
- `:73` `SSE_HEADERS`, `Stream` — yes (constants, Stream)
- `:134` `ServerError`, `'STATUS'`, `'NEXT'` — class yes
- `:650-651` `DispatcherInterface` — `@orkestrel/router`, not this barrel
- `:677-681` `ETag` (not an export), `isAddressInfo` yes

#### Gates

Report § Gates, command and exit, verbatim from the table:

| Gate | Command | Exit |
| --- | --- | --- |
| `npm run format:check` | `npm --prefix /home/user/fleet/server run format:check` | 0 |
| `npm run lint:check` | `npm --prefix /home/user/fleet/server run lint:check` | 0 |
| `npm run check` | `npm --prefix /home/user/fleet/server run check` | 0 |
| `npm run build` | `npm --prefix /home/user/fleet/server run build` | 0 |
| `npm test` | `npm --prefix /home/user/fleet/server test` | 0 |

Logs exist under `/home/user/work/evidence/server-proofs/final-1-format-check.txt` … `final-5-test.txt`. Those files contain no `exit` token; `final-1` ends “All matched files use the correct format.”; `final-5-test.txt` shows per-project `Tests` lines including `260 passed | 1 skipped`, `111 passed`, `46 passed`, `14 passed`, `33 passed`.

#### Breaking

Report § Breaking names:

- **server-subj-4** `requestEncoding` → `parseEncoding` (published export moved).
- **server-subj-11** observable SSE merge for a re-cased key (not a signature change).
- **server-obj-2** double-`next` rejection class `Error` → `ServerError` (message unchanged).

Renamed/removed published symbol for the fleet sweep: `requestEncoding`.

Word-boundary `requestEncoding` over `/home/user/fleet/*/src`, `/home/user/fleet/*/tests`, `/home/user/scaffold/src`, excluding `node_modules`, `/home/user/fleet/server`, and vendored `guides/server.md` mirrors: no hit in `mcp|middleware|toolbox|ollama` `src` or `tests`; no hit in `/home/user/scaffold/src`. Remaining hits only in excluded mirrors: `/home/user/fleet/ollama/guides/server.md:121`, `/home/user/fleet/middleware/guides/server.md:121`, `/home/user/fleet/toolbox/guides/server.md:121`, `/home/user/fleet/mcp/guides/server.md:121`.

#### Writing sweep

Diff `+` lines in `guides/**`, `README.md`, src doc comments, test titles/comments. Pattern `\b(should|simply|easy|easier|just|currently|now|new|latest|utilize|leverage|via|in order to|e\.g\.|i\.e\.|etc\.|please|sanity|dummy|ensure|guarantee)\b`:

- `guides/server.md:638` `const gzipped = new Uint8Array(`
- `guides/server.md:639` `await new Response(`
- `guides/server.md:640` `new Blob(['hi']).stream().pipeThrough(new CompressionStream('gzip')),`
- `guides/server.md:644` `new TextDecoder().decode(body) // 'hi' — capped decompression, the zip-bomb defense`
- `src/server/helpers.ts:1504` ``preferred` port (e.g. a permission fault). A listener whose address is not`

Count pattern `\b(one|two|three|four|five|six|seven|eight|nine|ten|\d+) (rules|rows|members|exports|files|options|steps|cases|stages|findings|tests|helpers|methods|entities|tables|sections)\b` on those `+` lines: no hit.

`via` / `should` / `just` / `now` / `currently` / `ensure` on those `+` lines: no hit.

## Distillate

- server-obj-1: validators.ts:28 (helpers.ts:1466 gone) | diff present yes | old form hits 0 (name kept) | report matches yes
- server-obj-2: helpers.ts:108 | diff present yes | old form hits 0 (`new Error(...)` gone) | report matches yes
- server-obj-3: helpers.ts:851 | diff present yes | old form hits 0 | report matches yes
- server-obj-4: guides.test.ts:189 + server.md:638-644 | diff present yes (gzip comment comma not em dash) | old form hits 0 | report matches yes
- server-obj-5: setup.ts:36 | diff present yes | old form hits 0 (local copies gone) | report matches yes
- server-obj-6: README.md:19 | diff present yes | old form hits 0 | report matches yes
- server-obj-7: README.md:20 | diff present yes | old form hits 1 (`tests/distribution.test.ts:60` ESM-only) | report matches yes
- server-obj-8: server.md:255-265 | diff present yes | old form hits 0 | report matches yes
- server-obj-9: server.md:411-413 and :282 | diff present yes | old form hits 0 | report matches yes
- server-obj-10: helpers.ts:1486-1489; Server.ts:391,407-412; `#resolvePort` gone | diff present yes (`let port` extra vs Where) | old form hits 0 | report matches yes
- server-obj-11: helpers.ts:1420-1421,1445 | diff present yes | old form hits 0 | report matches yes
- server-obj-12: errors.ts:45-46,59-73 | diff present yes | old form hits 0 | report matches yes
- server-subj-1: guides/README.md:4,81 | diff present yes | old form hits 0 | report matches yes
- server-subj-2: guides/README.md:18-77 | diff present yes | old form hits 0 (ordinals); 6× “one of…” | report matches yes
- server-subj-4: helpers.ts:1323 | diff present yes | old form hits 0 | report matches yes
- server-subj-6: helpers.ts:1239 | diff present yes | old form hits 3 outside `src` (`helpers.test.ts:747`, `config.test.ts:2`, `server.md:327`) | report matches yes on `src`
- server-subj-8: types.ts:721-752 | diff present yes (port wording not refuter-verbatim) | old form hits 0 | report matches yes (doc blocks present)
- server-subj-9: types.ts:269-285; server.md:192-195; Negotiator.test.ts:89-92 | diff present yes | old form hits 0 | report matches yes
- server-subj-10: helpers.ts:293-296,840-841 | diff present yes | old form hits 0 | report matches yes
- server-subj-11: Stream.ts:70-71 | diff present yes | old form hits 2 (`Stream.ts:69` comma-joined comment; `helpers.ts:1311`) | report matches yes
- fleet-F1: isBrowserVuePath absent | diff present no (noop) | old form hits 0 | report matches yes on absence; setup.ts now exports `buildContext`
- fleet-F2: Server.ts:84,160-162 | diff present yes | old form hits 0 | report matches yes

Scope tags: 18 status paths owned; 0 shared; 0 off-limits.

Residue: diff `+` timeout.md / `@orkestrel/timeout` only; tree timeout/retry/console./skipIf as listed above; no TODO/FIXME/debugger in the included tree.

Writing: `new` at `guides/server.md:638,639,640,644`; `e.g.` at `helpers.ts:1504`; count-pattern no hit.

Parity: Methods tables listed above sit beside the same member names in `types.ts`; readonly data named in Types rows `:157` and `:168`; barrel is star-export of nine modules including `./validators.js`.

## Unknowns

- Gate logs do not record an exit code; report § Gates states 0; this lane did not re-run the chain.
- `obj-2-green.txt` is absent; green for server-obj-2 is filed as `obj-10-green.txt`.
- fleet-F2 JSON.stringify precondition was not re-run; only the report’s reading is on file.
- `requestEncoding` inflection sweep over a glob `/home/user/fleet/*/src` failed as a single path; consumers were grepped per checkout instead.
- Writing-sweep `new` hits in `guides/server.md` are fence code inside a prose file; test-body `new` on `+` lines was excluded as not titles/comments.

## Journal

## Deviation

No tree change from this lane (read-only; no create/edit/delete; no mutating command). Every named input file was readable. Sweeps over `src`, `tests`, `guides/server.md`, `guides/README.md`, `README.md` ran. The `Grep` path `/home/user/fleet/*/src` is not a real directory; consumer `src`/`tests` were searched per package instead.