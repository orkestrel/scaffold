# Report — `d7n-sse-prep`

Wall clock: 2026-09-07T14:53:01Z → 2026-09-07T14:55:50Z.

## Item 1 — `repair --offline`

Command: `node .../dist/bin/main.js repair --offline`

Summary line:
```
0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (404 lines added).
9 written, 27 unchanged, 0 removed in ..
```

`git status --short` after:
```
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
Matches the P21 list exactly.

## Item 2 — drop-in adaptation (`tests/guides.test.ts`)

```diff
diff --git a/tests/guides.test.ts b/tests/guides.test.ts
index 1593354..51db4a6 100644
--- a/tests/guides.test.ts
+++ b/tests/guides.test.ts
@@ -97,21 +97,27 @@ for (const entry of manifest) {
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
@@ -126,11 +132,18 @@ for (const entry of manifest) {
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
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
@@ -139,9 +152,12 @@ for (const entry of manifest) {
 						.map((fence) => fence.code)
 					const examples =
 						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+							? source.examples(group.interface).map((example) => example.name)
+							: source
+									.examples(group.interface)
+									.map((example) => example.name)
+									.concat(source.examples(entity).map((example) => example.name))
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

No other site in the file changed; the import-walk `findMissing` on `statement.names`/`face.surface()...` and the `names`/`surface` pair were already strings and stayed untouched.

## Item 3 — voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 named four diagnostics, all in `tests/setup.ts` (in scope under `tests/**`):

- `tests/setup.ts:26:1` `policy/no-malformed-summary` (open with a third-person verb ending in `s`) — `feedAll`'s doc block.
  Before: `Feed every chunk in \`chunks\` to \`parser.parse(...)\` in order and flatten the dispatched events into a single array.`
  After: `Feeds every chunk in \`chunks\` to \`parser.parse(...)\` in order and flattens the dispatched events into a single array.`

- `tests/setup.ts:49:1` `policy/no-malformed-summary`, two diagnostics on the same block (open with a third-person verb ending in `s`; state what the symbol does without naming `chunkings` in the first sentence) — `chunkings`'s doc block.
  Before: `Partition \`stream\` into a fixed set of chunkings for partition-invariance testing: one chunking per fixed size in \`sizes\` (default \`{1,2,3,5,7,13,len}\`) plus every two-way single-cut split (\`stream.slice(0, cut)\` / \`stream.slice(cut)\` for every \`cut\` from \`0\` to \`stream.length\`).`
  After: `Splits \`stream\` into a fixed set of partitions for partition-invariance testing: one partition per fixed size in \`sizes\` (default \`{1,2,3,5,7,13,len}\`) plus every two-way single-cut split (\`stream.slice(0, cut)\` / \`stream.slice(cut)\` for every \`cut\` from \`0\` to \`stream.length\`).`

- `tests/setup.ts:69:1` `policy/no-malformed-summary` (open with a third-person verb ending in `s`) — `partition`'s doc block.
  Before: `Split \`stream\` into a random sequence of non-empty chunks driven by \`rng\` ...`
  After: `Splits \`stream\` into a random sequence of non-empty chunks driven by \`rng\` ...`

- `tests/setup.ts:86:1` `policy/no-malformed-summary` (open with a third-person verb ending in `s`) — `expectSSEError`'s doc block.
  Before: `Narrow a caught value to an {@link SSEError}, throwing (not \`expect\`ing) when it is not one ...`
  After: `Narrows a caught value to an {@link SSEError}, throwing (not \`expect\`ing) when it is not one ...`

Re-run: `npx oxlint --config .oxlintrc.json --deny-warnings .` — no output, exit 0.

`npm run test:policy` after the fixes: 90 passed | 1 skipped (91), exit 0. Its `prose` rule named no line in `guides/**` or `README.md`, so no substitution-table edit was owed there.

## Item 4 — the bump

```diff
-	"version": "0.0.6",
+	"version": "0.0.7",
```
`package-lock.json` was not touched.

## Acceptance criteria

1. `git status --short`:
```
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M package.json
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tsconfig.json
?? scripts/docs.ts
```
This is the P21 repair list plus `tests/guides.test.ts` (item 2) and `tests/setup.ts` (item 3, the four diagnostics above). Nothing else.

2. Gates:
   - `npm run format:check` → `All matched files use the correct format.` exit 0.
   - `npx oxlint --config .oxlintrc.json --deny-warnings .` → no output, exit 0.
   - `npm run check` → `tsc --noEmit --project tsconfig.json && npm run check:src` then `check:src:core`, no diagnostics, exit 0.

3. Tests:
   - `npm run test:guides` → `Test Files 1 passed (1)` / `Tests 36 passed (36)`, exit 0. (P21's four `test:guides` failures were the record-shape mismatch alone; item 2 closed them.)
   - `npm run test:policy` → `Test Files 1 passed (1)` / `Tests 90 passed | 1 skipped (91)`, exit 0.
   - `npm run test:config` → `Test Files 1 passed (1)` / `Tests 172 passed | 1 skipped (173)`, exit 0.

4. `npm run docs`, verbatim (exit 1, expected — the converge unit's worklist):
```
guides/sse.md interface SSEEvent: guide absent source "Represents one dispatched Server-Sent Event - the value a blank line flushes from an `SSEParserInterface`."
guides/sse.md interface SSEParserInterface: guide absent source "Represents a stateful Server-Sent-Events (SSE) stream parser: feed it string chunks, get back the complete events dispatched so far. A trailing partial line / in-progress event is buffered until the rest arrives."
guides/sse.md interface SSEParserOptions: guide absent source "Configures `import('./factories.js').createSSEParser` / the `import('./SSEParser.js').SSEParser` constructor."
guides/sse.md type SSEErrorCode: guide absent source "Names the machine-readable codes carried by an `import('./errors.js').SSEError`."
guides/sse.md const NUL: guide "The NUL byte (`U+0000`) — an `id:` field containing it is voided per spec and never surfaced." source "Names the null byte (`U+0000`). The SSE spec voids an `id:` field whose value contains it, so an `id` carrying a NUL is never surfaced. Spelled as a codepoint so the wire content is unambiguous in source."
guides/sse.md const BOM: guide "The byte-order mark (`U+FEFF`) — stripped from the first non-empty chunk of a stream; ordinary content on later ones." source "Names the byte-order mark (`U+FEFF`), stripped from the first non-empty chunk of an SSE stream (a leading mark on later chunks is ordinary content). Spelled as a codepoint so the wire content is unambiguous in source."
guides/sse.md class SSEError: guide "Carries an `SSEErrorCode` + optional `context`." source "Represents an error thrown by the SSE parser."
guides/sse.md function isSSEError: guide "Narrow a caught value to an `SSEError`." source "Narrows an unknown caught value to an `SSEError`."
guides/sse.md function createSSEParser: guide absent source "Creates a Server-Sent-Events (SSE) stream parser - a stateful handle that turns string chunks into the complete events dispatched so far."
guides/sse.md class SSEParser: guide "The stateful SSE stream parser — implements `SSEParserInterface`, reassembles events across chunks." source "Represents a stateful Server-Sent-Events (SSE) stream parser - feed it string chunks, get back the complete events dispatched so far."
guides/sse.md SSEParserInterface.parse: guide absent source "Appends `chunk`, then returns every event a blank line has DISPATCHED (its `data:` fields concatenated with `\n`, plus the last `event:` / `id:` / `retry:`); an in-progress event and a trailing partial line are retained for the next call."
guides/sse.md SSEParserInterface.flush: guide absent source "Treats any remaining buffered partial line as if it had been terminated, then dispatches the in-progress event if its data buffer is non-empty. A convenience beyond the WHATWG algorithm, which discards an unterminated final event at EOF - without calling `flush()`, that spec-faithful discard is this parser's default behavior."
guides/sse.md SSEParserInterface.clear: guide absent source "Drops any buffered partial line, in-progress event, and persisted id/retry, leaving the parser ready for a fresh stream."
guides/sse.md pitch: readme absent tagline "A stateful Server-Sent-Events (SSE) stream parser: feed it string chunks, get back the complete events dispatched so far. SSE is a UTF-8 text stream of events separated by a blank line; within an event each `field: value` line accumulates onto an in-progress event — multiple `data:` lines concatenate with `\n`, `event:` / `id:` / `retry:` are last-wins — and a blank line DISPATCHES the accumulated event, but only when its data buffer is non-empty. A trailing partial line or in-progress event split across chunk boundaries is buffered until the rest arrives. The `id` / `retry` fields are also persisted as sticky connection state (WHATWG last-event-id semantics) — surfaced through the `id` / `retry` getters, dropped only by `clear()`. An optional `limit` bounds total buffered characters, throwing a typed `SSEError('OVERFLOW')` instead of growing unbounded; `flush()` forces out any trailing unterminated event at end-of-stream. A pure functional primitive — no Emitter, no server / HTTP / agent coupling; it never throws on malformed input, only `SSEError('OVERFLOW')` when a configured `limit` is exceeded. Source: `src/core`. Surfaced through the `@src/core` barrel."
rows read: 1, disagreements found: 14
```
exit 1.

## Deviations

None. Every path `repair` wrote matched the P21 list, every before-text was found verbatim, no voice diagnostic named an off-limits file, `test:policy` reported no failure outside scope, and every gate besides `docs` read exit 0.
