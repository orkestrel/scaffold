# Report — `d7n-sse-converge-fix`

Every item is done. Every acceptance criterion passes. No deviation.

## Touched files

| File | Change |
| --- | --- |
| `/home/user/fleet/sse/guides/sse.md` | Added `#### Create a bounded parser and feed it chunks` over the Factories fence, lowered `does NOT clear`, appended `## Tests` |
| `/home/user/fleet/sse/src/core/types.ts` | Restored the cross-file `{@link import('./x.js').Y}` tags the converge round flattened |
| `/home/user/fleet/sse/src/core/factories.ts` | Retitled `@example Factories` to the heading's text |
| `/home/user/fleet/sse/tests/setup.ts` | Reworded the `chunkings` block off `partition`'s noun |
| `/home/user/fleet/sse/tests/guides.test.ts` | Hoisted the mapped `examples` binding to the loop's own scope |

Diffstat (`git diff --stat`):

```text
 guides/sse.md         | 12 +++++++++++-
 src/core/factories.ts |  2 +-
 src/core/types.ts     | 14 ++++++++------
 tests/guides.test.ts  | 14 +++++++-------
 tests/setup.ts        |  4 ++--
 5 files changed, 29 insertions(+), 17 deletions(-)
```

`README.md` is unchanged: item 6's sweep found nothing in it to correct.

## Item 1 — the cross-file links (subjective F3)

Every site the converge diff flattened sits in `src/core/types.ts`; the diff's other source files kept their tags. Restored to the diff's `-` line text, rewrapped:

```diff
 /**
- * Names the machine-readable code an `SSEError` carries — `'OVERFLOW'` alone, thrown when a
- * `parse(chunk)` call would push the buffered total over a configured `limit`.
+ * Names the machine-readable code an {@link import('./errors.js').SSEError} carries —
+ * `'OVERFLOW'` alone, thrown when a `parse(chunk)` call would push the buffered total over a
+ * configured `limit`.
  */
 export type SSEErrorCode = 'OVERFLOW'

 /**
- * Configures the parser `createSSEParser` builds and the `SSEParser` constructor accepts —
- * `limit` caps the total buffered characters held at once, and leaving it unset keeps the
- * buffering unbounded.
+ * Configures the parser {@link import('./factories.js').createSSEParser} builds and the
+ * {@link import('./SSEParser.js').SSEParser} constructor accepts — `limit` caps the total
+ * buffered characters held at once, and leaving it unset keeps the buffering unbounded.
  *
  * @remarks
  * The bounded total is the un-consumed line buffer plus the in-progress event's accumulated
  * field lengths (data segments + event type + pending id). With no `limit` the parser never
  * throws. When set, a `parse(chunk)` call that would push the buffered total over `limit`
- * throws an `SSEError` with code `'OVERFLOW'` instead of appending the chunk.
+ * throws an {@link import('./errors.js').SSEError} with code `'OVERFLOW'` instead of
+ * appending the chunk.
  */
```

The third site sits in `@remarks`, which `findDrift` does not compare; Ruling 11 gives the unit the doc block whole, and it was flattened by the same pass.

Run immediately after the edit:

```text
$ npm run docs
rows read: 1, disagreements found: 0
```

The compared form drops the module part, so `{@link import('./errors.js').SSEError}` reaches the guide cell as `` `SSEError` ``, which is the text already standing there. `/home/user/fleet/sse/node_modules/@orkestrel/guide/dist/src/core/index.js:1730` is the `normalizeSummary` function that does it; the installed version is `0.0.18`.

## Item 2 — `## Tests` (claim 35, subjective F2)

Appended after the last `## Methods` fence, in the pilot's bullet shape, each entry linking the file it names. `guides/README.md` is untouched. Text: see the diff hunk at `guides/sse.md:176-183`. Each clause was written from the file it describes — the `SSEParser.test.ts` clause from its `describe` blocks (`SSEParser.test.ts:26-960`, the spec-conformance, cross-chunk, unicode, adversarial, limits, API-contract, and property groups), the `factories.test.ts` clause from its cases (`factories.test.ts:10-73`), the `policy.test.ts` clause from its `describe` blocks (`policy.test.ts:54-530`), and the `config.test.ts` clause from its three (`config.test.ts:75`, `:771`, `:1906`).

`tests/guides.test.ts` asserts `guide.tests()` links resolve; the run under criterion 3 covers it.

## Item 3 — the titled example's heading (Ruling 9, subjective F1)

```diff
 | `createSSEParser` | function | Creates a Server-Sent-Events (SSE) stream parser — … |

+#### Create a bounded parser and feed it chunks
+
 ```ts
 import { createSSEParser } from '@orkestrel/sse'
```

```diff
- * @example Factories
+ * @example Create a bounded parser and feed it chunks
```

`### Factories` stays. The heading is worded against the fence, which builds a parser with `{ limit: 1_000_000 }` and feeds it three chunks.

```text
$ grep -c "^#### Create a bounded parser and feed it chunks$" guides/sse.md
1
$ grep -n "^####\|^###" guides/sse.md
35:### Types
52:### Constants
66:### Errors
86:### Factories
92:#### Create a bounded parser and feed it chunks
103:### Classes
116:#### `SSEParserInterface`
$ npm run docs
rows read: 1, disagreements found: 0
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Item 4 — `chunkings` (subjective F4, objective F3)

```diff
 /**
- * Splits `stream` into a fixed set of partitions for partition-invariance
- * testing: one partition per fixed size in `sizes` (default `{1,2,3,5,7,13,len}`)
+ * Splits `stream` into a fixed set of chunk sequences for partition-invariance
+ * testing: one sequence per fixed size in `sizes` (default `{1,2,3,5,7,13,len}`)
  * plus every two-way single-cut split (`stream.slice(0, cut)` /
  * `stream.slice(cut)` for every `cut` from `0` to `stream.length`).
  */
```

The product noun is the helper's own; `partition` at `tests/setup.ts:74` keeps "partition" as its product noun. "partition-invariance testing" names the property under test and is the pre-rewrite wording (`d7n-sse-prep.diff.txt:2338`), which the brief's suggested text also keeps.

```text
$ npx oxlint --config .oxlintrc.json --deny-warnings tests/setup.ts
exit=0
```

## Item 5 — the examples binding (subjective F5, objective F1)

The mapped `examples` binding moved from inside the `it` callback to the loop's own scope, directly under `documented`. See the `tests/guides.test.ts` hunk in the diff.

Byte-for-byte check against the pilot, comparing the whole `for (const group of guide.methods())` block that carries `examples` in each file:

```text
$ python3 -c "<extract both blocks by regex, compare>"
pilot == sse examples loop: True
```

The block carries no package constant, so the match is exact rather than "outside this package's constants".

## Item 6 — `does NOT clear` (objective F5)

```diff
 `id` / `retry` are sticky connection state (WHATWG last-event-id semantics):
-each valid `id:` / `retry:` field updates them, dispatch does NOT clear them,
+each valid `id:` / `retry:` field updates them, dispatch does not clear them,
 and only `clear()` does — useful for reconnection (`Last-Event-ID` header):
```

Sweep of the guide and the README, every site ruled:

```text
$ grep -n -E '\b[A-Z]{2,}\b' guides/sse.md README.md
```

Hits and rulings: `SSE`, `UTF-8`, `WHATWG`, `HTTP`, `NUL`, `BOM`, `API`, `ESM`, `CJS`, `MIT`, `LICENSE`, `OVERFLOW`, `SSEError`, `SSEParser`, `SSEEvent`, `SSEParserInterface`, `SSEParserOptions`, `SSEErrorCode`, `createSSEParser`, `isSSEError`, `Last-Event-ID`, `AGENTS.md`, `U+0000`, `U+FEFF`, `Kind`, `Summary`, `Type` — each an acronym, an initialism, a code identifier, a header cell, or a heading token. The one emphasis was `NOT` at `guides/sse.md:146`, corrected. No other emphasis site exists in either file.

Sweep for counts in prose, every site ruled:

```text
$ grep -n -i -E '\b(one|two|three|four|five|six|seven|eight|nine|ten|both|several)\b' guides/sse.md README.md
$ python3 -c "<print every line outside a fence carrying a digit>"
guides/sse.md 7   UTF-8
guides/sse.md 56  U+0000
README.md 19      Node.js >= 22.12.0
README.md 47      UTF-8
```

Rulings: `guides/sse.md:29`, `:96`, `:126` and `README.md:29` carry "the two data lines joined" inside a fence comment, where it names the two literal `data:` lines of that sample rather than tallying an extensible set; the flagship-fence cases transcribe those lines verbatim. `guides/sse.md:41` "Represents one dispatched Server-Sent Event" and `:105` "over one internal line buffer" use `one` as a singular determiner, not as an answer to "how many". `UTF-8` is a format name, `U+0000` and `U+FEFF` are code points, `22.12.0` is a version. No count needed correcting, and no numeral in prose needed changing.

## Acceptance criteria

**1. Format, lint, typecheck — all exit 0.**

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/sse.md README.md src/core/types.ts src/core/factories.ts tests/setup.ts tests/guides.test.ts
Checking formatting...
All matched files use the correct format.
Finished in 702ms on 6 files using 4 threads.
oxfmt exit=0

$ npx oxlint --config .oxlintrc.json --deny-warnings guides/sse.md README.md src/core/types.ts src/core/factories.ts tests/setup.ts tests/guides.test.ts
oxlint exit=0

$ npm run check
> tsc --noEmit -p configs/src/tsconfig.core.json
check exit=0
```

**2. Docs at zero in every direction; the links restored.**

```text
$ npm run docs
rows read: 1, disagreements found: 0
$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
$ grep -c "import('./" src/core/*.ts
src/core/SSEParser.ts:0
src/core/constants.ts:0
src/core/errors.ts:2
src/core/factories.ts:1
src/core/index.ts:0
src/core/types.ts:5
```

`src/core/types.ts` read 1 before this unit (the `@throws` tag at `:66`); the restored description and `@remarks` tags bring it to 5. Neither write direction moved a byte, so both sides already agree.

**3. Suites — all exit 0.**

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  39 passed (39)
   Duration  914ms (transform 311ms, setup 222ms, import 341ms, tests 127ms, environment 0ms)
exit=0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  1.43s (transform 677ms, setup 146ms, import 600ms, tests 435ms, environment 0ms)
exit=0

$ npm run test:src:core
 Test Files  2 passed (2)
      Tests  120 passed (120)
   Duration  750ms (transform 517ms, setup 367ms, import 283ms, tests 173ms, environment 0ms)
exit=0
```

**4. Owned files only.**

```text
$ git status --short
 M guides/sse.md
 M src/core/factories.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/setup.ts
```

## Observations, outside this unit's scope

An all-caps emphasis of the same class as item 6's survives in source doc blocks and comments, which item 6 scoped to the guide and the README:

```text
$ grep -n "\bNOT\b\|\bONLY\b" src/core/*.ts
src/core/SSEParser.ts:21: *   {@link SSEEvent} is emitted ONLY when the data buffer is non-empty (a dispatch with
src/core/SSEParser.ts:234:	// Dispatch the accumulated event on a blank line (or on `flush()`): emit ONLY when
src/core/types.ts:86:	 * field and NOT cleared when an event dispatches; `undefined` until the first
```

None sits in a compared description paragraph, so none affects `npm run docs`. `tests/src/core/SSEParser.test.ts` carries the same shape in case titles (`ONE`, `NOT`, `BETWEEN`), and that file is off-limits here.

## Deviation state

None. No restored link failed to converge, the retitled pair converges in both write directions, and no correction needed a file outside the owned set.
