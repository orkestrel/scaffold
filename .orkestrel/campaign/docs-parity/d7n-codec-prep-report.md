# Report — P.1 `d7n-codec-prep`

All items landed. Every acceptance criterion reads as the brief expected, including `docs` red with the converge unit's worklist. No deviation.

Wall clock: 2026-09-07T14:52:51Z to 2026-09-07T14:58:57Z (6m 6s).

## Item 1 — `repair --offline`

Command, in `/home/user/fleet/codec`:

```text
node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline
```

Its last lines:

```text
setup: The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it. The proof's subject is behavior only this workspace can assert, so scaffold does not write it.
0 of 35 planned paths drifted from the plan. Audit compared bytes at 24, existence at 5, and nothing at 6.
tsconfig.json replaced (1 line added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (404 lines added).
9 written, 27 unchanged, 0 removed in ..
EXIT 0
```

`git status --short` directly after, the P21 list exactly:

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

`package.json` took the `docs` script row and `tsconfig.json` the own-specifier `paths` entry, as the brief expected.

## Item 2 — the drop-in's adaptation

`tests/guides.test.ts`, the hunk:

```diff
@@ -141,21 +141,27 @@ for (const entry of manifest) {
 		})
 
 		for (const group of guide.methods()) {
-			const members = source.methods(group.interface)
+			const members = source.methods(group.interface).map((method) => method.name)
+			const documented = group.methods.map((method) => method.name)
 			const entity = group.interface.replace(/Interface$/u, '')
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
@@ -171,7 +177,13 @@ for (const entry of manifest) {
 				.filter((symbol) => symbol.keyword === 'function')
 				.map((symbol) => symbol.name)
 			expect(names.length).toBeGreaterThan(0)
-			expect(findUnexampled(names, fences, source.examples())).toEqual([])
+			expect(
+				findUnexampled(
+					names,
+					fences,
+					source.examples().map((example) => example.name),
+				),
+			).toEqual([])
 		})
```

The `group.methods.length` assertion stays, `entity`'s `/Interface$/u` regex stays (codec's own constant, not the reference's), and the import walk's `findMissing(statement.names, face.surface().map((symbol) => symbol.name))` stays untouched because both arguments are already strings. No other change to the suite.

The brief's third bullet — the examples loop over `guide.methods()` — has no site in this suite. `grep -n 'examples' tests/guides.test.ts` returns the fence-language doc comment at line 52 and the `findUnexampled` call alone, and `grep -n 'guide.methods'` returns one loop. codec's surface is functions with no documented interface, so no per-interface examples loop exists to adapt. Recorded as an ancillary matter; this matches P21's `check` reading, which named the record-shape errors at lines 151, 154, 158, and 174 and no other.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` after item 1 named `tests/setup.ts` and no other file. Every diagnostic was `policy(no-malformed-summary)` with the message `Open this description with a third-person verb ending in s, such as Creates, Returns, or Checks whether.`; `policy(no-banned-term)` named nothing. That reading matches P20's `total 26 | summary 26 | banned 0 | tests/setup.ts(26)`. No diagnostic named an off-limits file.

Every site is an exported data table in `tests/setup.ts` whose description paragraph opened on a noun phrase. Each before/after pair, keyed by the line the diagnostic named and the symbol the block documents:

| Diagnostic | Symbol | Before | After |
| ---------- | ------ | ------ | ----- |
| `tests/setup.ts:3` | `RFC_STANDARD` | `The RFC 4648 §4 alphabet, transcribed from the specification.` | `Transcribes the RFC 4648 §4 alphabet from the specification.` |
| `tests/setup.ts:5` | `RFC_URL` | `The RFC 4648 §5 url alphabet, transcribed from the specification.` | `Transcribes the RFC 4648 §5 url alphabet from the specification.` |
| `tests/setup.ts:7` | `OCTETS` | `Every octet value, in one buffer.` | `Carries every octet value in one buffer.` |
| `tests/setup.ts:9` | `SEXTETS` | `The sextet population, so an alphabet sweep reads one index per character.` | `Carries the sextet population, so an alphabet sweep reads one index per character.` |
| `tests/setup.ts:12` | `HEX_OCTETS` | `Every octet's hex spelling, in octet order.` | `Carries every octet's hex spelling, in octet order.` |
| `tests/setup.ts:23` | `VECTORS` | `Named canonical vectors: one value, its §4 spelling, and its §5 spelling.` | `Names canonical vectors: one value, its §4 spelling, and its §5 spelling.` |
| `tests/setup.ts:42` | `MEMBERSHIP` | `Mixed admitted and refused texts, each row stating what both faces owe it.` | `Mixes admitted and refused texts, each row stating what both faces owe it.` |
| `tests/setup.ts:84` | `HEX_MEMBERSHIP` | `Mixed admitted and refused hex texts, each row stating the bytes the §8 face owes it.` | `Mixes admitted and refused hex texts, each row stating the bytes the §8 face owes it.` |
| `tests/setup.ts:139` | `HEX_SWEEP` | `The hex sweep population, deduplicated.` | `Deduplicates the hex sweep population.` |
| `tests/setup.ts:142` | `MEASURES` | `Named measure vectors: one text and the decoded byte length each Base64 face owes it.` | `Names measure vectors: one text and the decoded byte length each Base64 face owes it.` |
| `tests/setup.ts:170` | `HEX_MEASURES` | ``Named hex measure vectors: one §8 text and the decoded byte length it owes, or `undefined`.`` | ``Names hex measure vectors: one §8 text and the decoded byte length it owes, or `undefined`.`` |
| `tests/setup.ts:234` | `SWEEP` | `The sweep population, deduplicated.` | `Deduplicates the sweep population.` |
| `tests/setup.ts:290` | `MEASURE_MUTANTS` | `The deterministic mutant population: canonical encodings of octet prefixes, each also carried under one substitution, insertion, or truncation.` | `Carries the deterministic mutant population: canonical encodings of octet prefixes, each also present under one substitution, insertion, or truncation.` |
| `tests/setup.ts:300` | `MEASURE_TEXTS` | `Every text the Base64 measure law sweeps: the sweep population, both tables, and the mutants.` | `Collects every text the Base64 measure law sweeps: the sweep population, both tables, and the mutants.` |
| `tests/setup.ts:308` | `HEX_MEASURE_TEXTS` | `Every text the hex measure law sweeps: the hex sweep population, both tables, and the mutants.` | `Collects every text the hex measure law sweeps: the hex sweep population, both tables, and the mutants.` |
| `tests/setup.ts:376` | `LATIN1_OCTETS` | `Every octet's ISO-8859-1 character, in octet order, read from the coding's own identity.` | `Carries every octet's ISO-8859-1 character, in octet order, read from the coding's own identity.` |
| `tests/setup.ts:381` | `WINDOWS_1252_OCTETS` | `Every octet's Windows-1252 character according to the WHATWG index, in octet order.` | `Carries every octet's Windows-1252 character according to the WHATWG index, in octet order.` |
| `tests/setup.ts:391` | `WINDOWS_1252_UNDEFINED` | `The Windows-1252 slots that name no character, written out rather than derived.` | `Lists the Windows-1252 slots that name no character, written out rather than derived.` |
| `tests/setup.ts:401` | `WINDOWS_1252_INDEX` | `The published Windows-1252 high band, hand-transcribed here from the code page's own table.` | `Transcribes the published Windows-1252 high band here, by hand, from the code page's own table.` |
| `tests/setup.ts:492` | `TEXTS` | `The well-formed text population, deduplicated.` | `Deduplicates the well-formed text population.` |
| `tests/setup.ts:495` | `ILL_FORMED` | `Ill-formed texts, each carrying a surrogate no coding over code points can spell.` | `Carries ill-formed texts, each with a surrogate no coding over code points can spell.` |
| `tests/setup.ts:505` | `UTF8_BOUNDARIES` | `The UTF-8 width thresholds and the surrogate-range outer boundaries, each with the byte length its code point encodes to.` | `Carries the UTF-8 width thresholds and the surrogate-range outer boundaries, each with the byte length its code point encodes to.` |
| `tests/setup.ts:532` | `UTF8_MEASURES` | ``Named UTF-8 measure vectors: one text and the wire byte length it encodes to, or `undefined`.`` | ``Names UTF-8 measure vectors: one text and the wire byte length it encodes to, or `undefined`.`` |
| `tests/setup.ts:552` | `UTF8_MEASURE_TEXTS` | `Every text the UTF-8 measure law sweeps: the well-formed population, the ill-formed rows, and one text per boundary code point.` | `Collects every text the UTF-8 measure law sweeps: the well-formed population, the ill-formed rows, and one text per boundary code point.` |
| `tests/setup.ts:567` | `UTF8_REFUSALS` | `Byte sequences strict UTF-8 refuses, each pinned with the rule that refuses it.` | `Lists byte sequences strict UTF-8 refuses, each pinned with the rule that refuses it.` |
| `tests/setup.ts:590` | `UTF16_REFUSALS` | `Byte sequences well-formed UTF-16LE refuses, each pinned with the rule that refuses it.` | `Lists byte sequences well-formed UTF-16LE refuses, each pinned with the rule that refuses it.` |

Every rewritten first sentence keeps its paragraph's facts, names no symbol, moves no code token, renames nothing, and changes no assertion's value. Each new opener matches the rule's `POLICY_VOICE_PATTERN` (`/^[A-Z][a-z]*s$/u`) and appears in no entry of `POLICY_VOICE_STOPWORDS`; I read both from the repaired `configs/policy.ts`.

`npm run test:policy`'s prose sweep named no line in `guides/**` or `README.md`, so nothing was edited there. The suite exits 0, matching P21's `-- test:policy` reading.

Ancillary matters decided and recorded:

- Three blocks needed a wrap to stay inside 100 columns after the verb opener. `MEASURE_TEXTS`, `HEX_MEASURE_TEXTS`, and `LATIN1_OCTETS` moved from a one-line `/** … */` block to a multi-line one; the sentence is unchanged otherwise.
- `MEASURE_MUTANTS` reads `each also present under one substitution` where it read `each also carried under one substitution`, because `Carries` now opens the sentence and the repetition read badly. The fact is unchanged.
- I left `both tables` standing in the `MEASURE_TEXTS` and `HEX_MEASURE_TEXTS` sentences. The diagnostic is about the opener, and naming the two tables would introduce code tokens the brief bars me from moving.
- The three lines still past 100 columns in `tests/setup.ts` (240, 248, 392) are all pre-existing: `git show HEAD:tests/setup.ts` carries the same text at lines 240, 248, and 384. None sits in a block I edited.

## Item 4 — the bump

```diff
-	"version": "0.0.2",
+	"version": "0.0.3",
```

`package-lock.json` is untouched: `git status --short package-lock.json` returns nothing.

## Acceptance criteria

### 1. `git status --short` lists the P21 repair list plus the files this unit edited, and nothing else

```text
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

The P21 list, plus `tests/guides.test.ts` (item 2), plus `tests/setup.ts` (item 3, the sole file `oxlint` named). `package.json` carries the repair's `docs` row and item 4's version. Nothing else.

Diffstat:

```text
 .oxlintrc.json       |   4 +-
 configs/helpers.ts   |  15 +-
 configs/policy.ts    | 534 +++++++++++++++++++++++++++++++++++++++--------
 package.json         |   5 +-
 tests/config.test.ts | 404 ++++++++++++++++++++++++++++++++++++
 tests/guides.test.ts |  22 +-
 tests/policy.test.ts | 128 +++++++++++-
 tests/setup.ts       |  66 +++---
 tests/setupPolicy.ts | 572 ++++++++++++++++++++++++++++++++++++++++++++-------
 tsconfig.json        |   3 +-
 10 files changed, 1550 insertions(+), 203 deletions(-)
```

### 2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0

`npm run format` ran after the edits. Then:

```text
=== format:check ===
> oxfmt --config .oxfmtrc.json --check .

Checking formatting...

All matched files use the correct format.
Finished in 3384ms on 33 files using 4 threads.
EXIT 0
=== oxlint ===
EXIT 0
=== check ===
> @orkestrel/codec@0.0.3 check:src:core
> tsc --noEmit -p configs/src/tsconfig.core.json

EXIT 0
```

`oxlint` prints nothing on a clean run; its exit code is the reading.

### 3. `npm run test:guides` exits 0; `npm run test:policy` and `npm run test:config` exit 0

```text
=== test:guides ===
 Test Files  1 passed (1)
      Tests  25 passed (25)
   Duration  925ms (transform 334ms, setup 394ms, import 203ms, tests 95ms, environment 0ms)
EXIT 0
```

P21's failure under `test:guides` was `1 failed | 24 passed (25)`; the failing case was the Surface-function examples case, red on the record shapes alone, and item 2 closed it.

```text
=== test:policy ===
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
EXIT 0
```

```text
=== test:config ===
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
EXIT 0
```

### 4. `npm run docs` reads a non-zero `rows read` and exits 1

Verbatim, every line it prints:

```text
> @orkestrel/codec@0.0.3 docs
> node --experimental-strip-types scripts/docs.ts

guides/codec.md function encodeBase64: guide absent source "Encodes a byte sequence as standard padded Base64."
guides/codec.md function decodeBase64: guide absent source "Decodes canonical standard Base64 text into its bytes."
guides/codec.md function isBase64: guide absent source "Checks whether a value is canonical standard Base64 text."
guides/codec.md function encodeBase64URL: guide absent source "Encodes a byte sequence as unpadded base64url."
guides/codec.md function decodeBase64URL: guide absent source "Decodes canonical base64url text into its bytes."
guides/codec.md function isBase64URL: guide absent source "Checks whether a value is canonical base64url text."
guides/codec.md function encodeHex: guide absent source "Encodes a byte sequence as lowercase hex."
guides/codec.md function decodeHex: guide absent source "Decodes canonical lowercase hex text into its bytes."
guides/codec.md function isHex: guide absent source "Checks whether a value is canonical lowercase hex text."
guides/codec.md function measureBase64: guide absent source "Measures the byte length canonical standard Base64 text decodes to."
guides/codec.md function measureBase64URL: guide absent source "Measures the byte length canonical base64url text decodes to."
guides/codec.md function measureHex: guide absent source "Measures the byte length canonical lowercase hex text decodes to."
guides/codec.md function measureUTF8: guide absent source "Measures the UTF-8 byte length text encodes to."
guides/codec.md function encodeUTF8: guide absent source "Encodes text as UTF-8 bytes."
guides/codec.md function decodeUTF8: guide absent source "Decodes UTF-8 bytes into their text."
guides/codec.md function isUTF8: guide absent source "Checks whether a value is bytes that decode as strict UTF-8."
guides/codec.md function encodeLatin1: guide absent source "Encodes text as ISO/IEC 8859-1 bytes."
guides/codec.md function decodeLatin1: guide absent source "Decodes ISO/IEC 8859-1 bytes into their text."
guides/codec.md function isLatin1: guide absent source "Checks whether a value is text ISO/IEC 8859-1 can encode."
guides/codec.md function encodeWindows1252: guide absent source "Encodes text as Windows-1252 bytes."
guides/codec.md function decodeWindows1252: guide absent source "Decodes Windows-1252 bytes into their text."
guides/codec.md function isWindows1252: guide absent source "Checks whether a value is bytes that decode as Windows-1252."
guides/codec.md function encodeUTF16LE: guide absent source "Encodes text as little-endian UTF-16 bytes."
guides/codec.md function decodeUTF16LE: guide absent source "Decodes little-endian UTF-16 bytes into their text."
guides/codec.md function isUTF16LE: guide absent source "Checks whether a value is bytes that decode as UTF-16LE."
rows read: 1, disagreements found: 25
EXIT 1
```

The worklist is byte-identical to P21's `-- docs` reading. It is the converge unit's, and this unit changed nothing under `guides/**`, `README.md`, or any `src/**` doc block.

## Deviation state

None. No path outside the P21 list was written by `repair`, every before-text was found verbatim exactly once, no voice diagnostic named an off-limits file, `test:policy` named no file outside scope, and every gate other than `docs` reads green.

## Notes for the Orchestrator

- The `@orkestrel/guide` range in `package.json` still reads `^0.0.17`, untouched, as the brief directs. `node_modules` carries the `0.0.18` head start.
- The lockfile's root version still reads `0.0.2`; the Orchestrator's lockfile-only install lands it.
- `scripts/docs.ts` is untracked and needs staging with the rest of the repair.
