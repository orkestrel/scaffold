# Report — P.1 `d7n-terminal-prep` (terminal's prep)

Every item lands and every acceptance criterion reads green: `format:check`, `oxlint`, and `check` exit 0, `test:guides`, `test:policy`, and `test:config` exit 0, and `docs` exits 1 with the converge unit's worklist. No deviation.

**Report-file note:** the harness refused the write to `/home/user/scaffold/tmp/units/d7n-terminal-prep-report.md` (`Subagents should return findings as text, not write report files`), so this text is the report. Copy it to that path at retention. The `docs` worklist is too large to inline here; it sits verbatim at `/home/user/fleet/terminal/tmp/d7n-terminal-prep/docs-after.log.txt` and is reproduced by `npm run docs` in that checkout.

## The resumed run's partial hunks

The terminated run left the tree carrying every item. Each hunk was ruled against the brief before anything else ran.

| Hunk | Ruling |
| ---- | ------ |
| `repair --offline` output — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (`docs` row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, untracked `scripts/docs.ts` | Kept. The written set is the P21 list exactly, and `tmp/d7n-terminal-prep/repair.log.txt` records `9 written, 33 unchanged, 0 removed in ..`. `repair` was not run a second time. |
| `tests/guides.test.ts` — the drop-in's adaptation | Kept. The adapted region is byte-identical to the pilot at `/home/user/fleet/abort/tests/guides.test.ts`. |
| `tests/setup.ts`, `tests/setupServer.ts`, `src/core/types.ts` — the `policy/no-malformed-summary` rewrites | Kept. |
| `src/core/TerminalManager.ts`, `src/core/PromptClient.ts`, `src/core/types.ts`, `src/server/Terminal.ts`, `src/server/helpers.ts` — the `policy/no-banned-term` rewrites | Kept, with the wrapping of the `PromptClient` and `Terminal` bullets corrected. |
| `guides/terminal.md` line 548 — the prose sweep's `currently` | Kept. |
| `package.json` `"version"` `0.0.14` → `0.0.15` | Kept. |

Corrected: the two banned-term rewrites that deleted a word mid-paragraph left a stranded short line. This run refilled each bullet to the file's `printWidth` of 100, moving no token:

```diff
--- src/core/PromptClient.ts
- *   the refused attempt submitted, applies every {@link FieldError} through `invalidate`, and asks
- *   again. No retry
- *   counter truncates the loop; acceptance, expiry, and the broker's own teardown are its bounds.
+ *   the refused attempt submitted, applies every {@link FieldError} through `invalidate`, and asks
+ *   again. No retry counter truncates the loop; acceptance, expiry, and the broker's own teardown
+ *   are its bounds.
--- src/server/Terminal.ts
- * - **Visibility is honored.** A `hidden` field and a field in `form.disabled` are
- *   skipped; a `locked` field renders read-only; entering a new group writes its label as a section
- *   header.
+ * - **Visibility is honored.** A `hidden` field and a field in `form.disabled` are skipped; a
+ *   `locked` field renders read-only; entering a new group writes its label as a section header.
```

Discarded: nothing.

## Item 1 — `repair --offline`

Summary, from `tmp/d7n-terminal-prep/repair.log.txt`:

```text
0 of 41 planned paths drifted from the plan. Audit compared bytes at 26, existence at 5, and nothing at 10.
tsconfig.json replaced (2 lines added).
configs/helpers.ts replaced (9 lines added).
configs/policy.ts replaced (372 lines added).
.oxlintrc.json replaced (2 lines added).
tests/setupPolicy.ts replaced (412 lines added).
tests/policy.test.ts replaced (126 lines added).
tests/config.test.ts replaced (419 lines added).
9 written, 33 unchanged, 0 removed in ..
```

The written set matches the P21 list. `package.json` carries only the `docs` script row from `repair`, and `tsconfig.json` only the own-specifier `paths` entry.

## Item 2 — the drop-in's adaptation

`tests/guides.test.ts`, the hunk:

```diff
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
 		}
@@
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
+			const examples =
+				entity === group.interface
+					? source.examples(group.interface).map((example) => example.name)
+					: source
+							.examples(group.interface)
+							.map((example) => example.name)
+							.concat(source.examples(entity).map((example) => example.name))
 			describe(`${group.interface} examples`, () => {
 				it('documents an example for every method', () => {
 					const fences = guide
 						.fences()
 						.filter((fence) => fence.language === EXAMPLE_LANGUAGE)
 						.map((fence) => fence.code)
-					const examples =
-						entity === group.interface
-							? source.examples(group.interface)
-							: source.examples(group.interface).concat(source.examples(entity))
-					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
+					expect(findUnexampled(documented, fences, examples)).toEqual([])
 				})
 			})
 		}
```

The `group.methods.length` assertion stays, and the `findMissing` calls whose arguments are already strings — the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, and `names` against `surface` — are untouched. No other change to the suite.

Byte-identity with the pilot verified by extracting each file from its first `for (const group of guide.methods()) {` and diffing:

```text
$ diff <(awk '/for \(const group of guide.methods\(\)\) \{/,0' /home/user/fleet/abort/tests/guides.test.ts) \
       <(awk '/for \(const group of guide.methods\(\)\) \{/,0' tests/guides.test.ts)
```

The files diverge only where package content diverges: the pilot carries an `it('keeps every compared summary and example equal to its source')` case over `findDrift` that this package's drop-in neither imports nor declares, and each file's flagship-fence section is its own package's. Neither is a site item 2 names, so neither was touched — see § Ancillary decisions.

## Item 3 — the voice sites

`npx oxlint --config .oxlintrc.json --deny-warnings .` named these sites, recorded in `tmp/d7n-terminal-prep/oxlint-before.log.txt`.

### `tests/setup.ts` — `policy/no-malformed-summary`, at 17, 24, 46, 66, 74, 85, 99, 149, 154, 163, 200, 215, 220, 225, 312, 338, 345

```diff
-/** A manually driven timer used at broker and reconnect boundaries. */
+/** Describes a manually driven timer used at broker and reconnect boundaries. */
-/** Create an injected timer that fires only when the test calls `flush`. */
+/** Creates an injected timer that fires only when the test calls `flush`. */
-/** Build a finite protocol-faithful SSE response from inert event data. */
+/** Builds a finite protocol-faithful SSE response from inert event data. */
-/** Build one JSON response from inert test data. */
+/** Builds one JSON response from inert test data. */
-/** Fold raw key strings through a real reducer. */
+/** Folds raw key strings through a real reducer. */
-/** The immutable observation captured when a recording terminal receives a live form. */
+/** Holds the immutable observation captured when a recording terminal receives a live form. */
- * A real TerminalInterface implementation for tests. It accepts scripted answers as inert data,
+ * Implements a real TerminalInterface for tests. It accepts scripted answers as inert data,
-/** Build a recording TerminalInterface and expose its observations and release control. */
+/** Builds a recording TerminalInterface and exposes its observations and release control. */
-/** A compact valid schema used by broker and client fixtures. */
+/** Builds a compact valid schema used by broker and client fixtures. */
-/** Build one form covering every supported field control. */
+/** Builds one form covering every supported field control. */
-/** Build one valid pending-form envelope around a supplied schema. */
+/** Builds one valid pending-form envelope around a supplied schema. */
-/** Add ANSI, C0, whitespace controls, and DEL around one clean string. */
+/** Adds ANSI, C0, whitespace controls, and DEL around one clean string. */
-/** Add a valid OSC ANSI sequence and C0 bytes around regex source without making it uncompilable. */
+/** Adds a valid OSC ANSI sequence and C0 bytes around regex source without making it uncompilable. */
- * A valid schema with hostile bytes in every schema string position terminal can render or use to
- * relate rendered records. It covers every field control and every control-specific string slot.
+ * Builds a valid schema with hostile bytes in every schema string position terminal can render or
+ * use to relate rendered records. It covers every field control and every control-specific string
+ * slot.
- * The wire-valid hostile schema used end to end. Form intentionally refuses control bytes inside
- * format-constrained date, time, datetime, and color defaults, so those invalid authored values
- * remain in the direct sanitizer fixture above and are omitted at the parse boundary here.
+ * Builds the wire-valid hostile schema used end to end. Form intentionally refuses control bytes
+ * inside format-constrained date, time, datetime, and color defaults, so those invalid authored
+ * values remain in the direct sanitizer fixture earlier in this module and are omitted at the parse
+ * boundary here.
-/** One shared store-contract case used by both store implementations. */
+/** Names one shared store-contract case every store implementation must satisfy. */
-/** Shared point-store cases. */
+/** Lists the shared point-store cases. */
```

Two carried a second correction the writing rules require: `above` became `earlier in this module` (a positional reference `.claude/rules/writing.md` § Code tokens, references, and links refuses), and `used by both store implementations` became `every store implementation must satisfy` (`both` tallying a set the sentence does not name is a count).

### `tests/setupServer.ts` — `policy/no-malformed-summary`, at 11, 17, 30, 109, 117

```diff
-/** A recording output stream. */
+/** Holds a recording output stream. */
-/** Create an injected output stream that records every written byte. */
+/** Creates an injected output stream that records every written byte. */
-/** A recording TTY backed by a real EventEmitter. */
+/** Describes a recording TTY backed by a real EventEmitter. */
-/** Create an ended readable stream containing scripted lines. */
+/** Creates an ended readable stream containing scripted lines. */
-/** Concatenate all raw output bytes. */
+/** Concatenates all raw output bytes. */
```

### `src/core/types.ts` — `policy/no-malformed-summary` at 713, `policy/no-banned-term` at 572 (`currently`)

```diff
- * - **`connected`** reflects whether the stream is currently open.
+ * - **`connected`** reflects whether the stream is open.
- * Represents one opaque persisted row — the shape a `TableInterface<TerminalSnapshotRow>`-backed store reads
- * and writes. `snapshot` is narrowed with {@link import('./validators.js').isTerminalSnapshot} on
- * read.
+ * Represents one opaque persisted row — the shape a table-backed store reads and writes. The store
+ * is a `TableInterface<TerminalSnapshotRow>`, and `snapshot` is narrowed with
+ * {@link import('./validators.js').isTerminalSnapshot} on read.
```

The `713` diagnostic reads `State what the symbol does without naming TerminalSnapshotRow in the first sentence`, so the type reference moved to the paragraph's second sentence and every fact stayed.

### `src/core/TerminalManager.ts` — `policy/no-banned-term` at 21 (`via`)

```diff
- * - **`ask`.** The target must already be mounted via {@link add} — `ask` never auto-adds it;
+ * - **`ask`.** The target must already be mounted through {@link add} — `ask` never auto-adds it;
```

### `src/core/PromptClient.ts` — `policy/no-banned-term` at 33 (`just`)

```diff
- *   just submitted, applies every {@link FieldError} through `invalidate`, and asks again. No retry
- *   counter truncates the loop; acceptance, expiry, and the broker's own teardown are its bounds.
+ *   the refused attempt submitted, applies every {@link FieldError} through `invalidate`, and asks
+ *   again. No retry counter truncates the loop; acceptance, expiry, and the broker's own teardown
+ *   are its bounds.
```

`just submitted` names the attempt whose values seed the retry, so deleting the word alone would drop the fact.

### `src/server/Terminal.ts` — `policy/no-banned-term` at 76 (`currently`)

```diff
- * - **Visibility is honored.** A `hidden` field and a field currently in `form.disabled` are
- *   skipped; a `locked` field renders read-only; entering a new group writes its label as a section
- *   header.
+ * - **Visibility is honored.** A `hidden` field and a field in `form.disabled` are skipped; a
+ *   `locked` field renders read-only; entering a new group writes its label as a section header.
```

### `src/server/helpers.ts` — `policy/no-banned-term` at 25 (`just`), 87 (`just`), 118 (`just`, `currently`)

```diff
- * — a piped, non-TTY stream is still a valid input, just one the driver reads through the readline
+ * — a piped, non-TTY stream is still a valid input, one the driver reads through the readline
- * re-render: the driver records the line count of the view it just wrote so the next redraw knows how
+ * re-render: the driver records the line count of the view it wrote so the next redraw knows how
- * the prefix is just a carriage return + clear-down — the prompt draws from the current line. For a
+ * the prefix is a carriage return + clear-down — the prompt draws from the current line. For a
- * @param previousLines - The line count of the view currently on screen (from {@link lineCount})
+ * @param previousLines - The line count of the view on screen (from {@link lineCount})
```

### `guides/terminal.md` line 548 — the prose sweep's `currently`

```diff
-    field and a field currently in `form.disabled` are skipped; a `locked` field renders read-only
+    field and a field in `form.disabled` are skipped; a `locked` field renders read-only
```

Only that line changed; the converge unit owns every other sentence in the file. No diagnostic named an off-limits file, and no assertion's value moved.

## Item 4 — the bump

```diff
 	"name": "@orkestrel/terminal",
-	"version": "0.0.14",
+	"version": "0.0.15",
```

`package-lock.json` is untouched.

## Acceptance criteria

### 1 — `git status --short` lists the P21 repair list plus the item files, and nothing else

```text
$ git status --short
 M .oxlintrc.json
 M configs/helpers.ts
 M configs/policy.ts
 M guides/terminal.md
 M package.json
 M src/core/PromptClient.ts
 M src/core/TerminalManager.ts
 M src/core/types.ts
 M src/server/Terminal.ts
 M src/server/helpers.ts
 M tests/config.test.ts
 M tests/guides.test.ts
 M tests/policy.test.ts
 M tests/setup.ts
 M tests/setupPolicy.ts
 M tests/setupServer.ts
 M tsconfig.json
?? scripts/docs.ts

$ git diff --stat | tail -1
 17 files changed, 1586 insertions(+), 225 deletions(-)
```

The repair list is `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json`, `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json`, and the untracked `scripts/docs.ts`. Item 2 adds `tests/guides.test.ts`; item 3 adds `tests/setup.ts`, `tests/setupServer.ts`, `src/core/PromptClient.ts`, `src/core/TerminalManager.ts`, `src/core/types.ts`, `src/server/Terminal.ts`, `src/server/helpers.ts`, and `guides/terminal.md`; item 4 adds the `package.json` `version` row. Nothing else is listed. The unit's instruments sit under the git-ignored `tmp/d7n-terminal-prep/`.

### 2 — `format:check`, `oxlint`, and `check` exit 0

```text
$ npm run format:check
Checking formatting...

All matched files use the correct format.
Finished in 4266ms on 69 files using 4 threads.
EXIT 0

$ npx oxlint --config .oxlintrc.json --deny-warnings .
EXIT 0

$ npm run check
> tsc --noEmit --project tsconfig.json && npm run check:src
> npm run check:src:core && npm run check:src:server
> tsc --noEmit -p configs/src/tsconfig.core.json
> tsc --noEmit -p configs/src/tsconfig.server.json
EXIT 0
```

`npm run format` was not run: `format:check` was already clean over the tree, so the read-only check settled it and no tree-wide mutating command ran beside the sibling units. `oxlint` prints nothing under this configuration when it finds no diagnostic; compare `tmp/d7n-terminal-prep/oxlint-before.log.txt`, the run before the item 3 edits.

### 3 — `test:guides`, `test:policy`, and `test:config` exit 0

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  60 passed (60)
   Duration  708ms (transform 256ms, setup 224ms, import 224ms, tests 128ms, environment 0ms)
EXIT 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
   Duration  670ms (transform 301ms, setup 225ms, import 128ms, tests 205ms, environment 0ms)
EXIT 0

$ npm run test:config
 Test Files  1 passed (1)
      Tests  172 passed | 1 skipped (173)
   Duration  4.09s (transform 482ms, setup 245ms, import 769ms, tests 2.95s, environment 0ms)
EXIT 0
```

`test:config` prints an API Extractor notice on stdout during its declaration roll-up (`Analysis will use the bundled TypeScript version 5.9.3` and the newer-compiler warning beside it). It is not a failure and the project passes.

### 4 — `npm run docs` reads a non-zero `rows read` and exits 1

```text
$ npm run docs
EXIT 1
```

Its terminal line is `rows read: 1, disagreements found: 176`, matching P21's reading.

## The `docs` worklist

The full verbatim output (181 lines, 56320 bytes, the npm header plus every disagreement row plus the terminal line) is at `/home/user/fleet/terminal/tmp/d7n-terminal-prep/docs-after.log.txt`. Its head and tail:

```text
> @orkestrel/terminal@0.0.15 docs
> node --experimental-strip-types scripts/docs.ts

guides/terminal.md interface TerminalOptions: guide "..." source "..."
[…]
guides/terminal.md InputStreamInterface.pause: guide absent source absent
guides/terminal.md pitch: readme absent tagline "The terminal side of a form. […]"
rows read: 1, disagreements found: 176
```

The rows are P21's, with the item 3 source-side rewrites reflected on the `source` side of the `interface TerminalSnapshotRow`, `function isInputStream`, `function lineCount`, and `function redrawPrefix` rows.

## Ancillary decisions

- **The pilot's `findDrift` case is not added here.** The byte-for-byte requirement is read against the sites item 2 names. This package's drop-in neither imports nor declares `findDrift`, P21's expected `check` errors name only the record-shape lines this unit fixed, and criterion 3 requires `test:guides` to exit 0 while `docs` reports `disagreements found: 176`. Adding the case would red `test:guides` on the converge unit's worklist. Recorded here for the next drop-in update rather than closed inside this unit.
- **The comment refills** in `src/core/PromptClient.ts` and `src/server/Terminal.ts`. Whitespace only; `findDrift` collapses whitespace, so neither side of a `Summary` comparison moves.
- **`above` → `earlier in this module`** and **`used by both store implementations` → `every store implementation must satisfy`** in `tests/setup.ts`.
- **`just submitted` → `the refused attempt submitted`** rather than a deletion, to keep the fact the word carried.
- **`guides/terminal.md` was not refilled** after its word deletion. The scope grants that file only the line the prose sweep names, and refilling would rewrite the line following it. The formatter is `oxfmt`, which reads no Markdown, so `format:check` is unaffected.

## Deviation state

None on the work. `repair` wrote no path outside the P21 list, every before-text was found verbatim, no voice diagnostic named an off-limits file, `test:policy` reds on no file outside scope, and every gate but `docs` reads green. `docs` exits 1 by design. The one blocked action is the report-file write named at the top of this report.

## Wall clock

This resumed run: 2026-09-07T20:25:30Z to 2026-09-07T20:30:16Z. The terminated run that produced the partial tree ran earlier the same day, bounded by its retained instruments' timestamps — `tmp/d7n-terminal-prep/repair.log.txt` at 16:57:52Z and `tmp/d7n-terminal-prep/docs.log.txt` at 17:04:34Z.
