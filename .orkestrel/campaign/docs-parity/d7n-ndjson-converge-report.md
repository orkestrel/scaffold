# Report — `d7n-ndjson-converge`

Wall clock: 2026-09-07T15:27Z (first command) to 2026-09-07T15:37Z (last command). No deviation.

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` after the three cases landed and before any convergence:
`Test Files 1 failed (1)` / `Tests 3 failed | 28 passed (31)`.

`pairs at least one example title across the guide and the source`:

```
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/ndjson.md pairs: guide [\"Surface\",\"Types\",\"Factories\",\"NDJSONParserInterface\"] source []",
```

`opens the README with the guide tagline`:

```
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:110:20
    110|  expect(pitch).not.toBeUndefined()
```

`NDJSON > keeps every compared summary and example equal to its source`:

```
AssertionError: expected [ …(5) ] to deeply equal []
+   "guides/ndjson.md interface NDJSONParserInterface: guide absent source \"Represents a stateful NDJSON (newline-delimited JSON) stream parser: feed it string chunks, get back the complete records decoded so far. A trailing partial line is buffered until the rest arrives.\"",
+   "guides/ndjson.md function createNDJSONParser: guide absent source \"Creates an NDJSON (newline-delimited JSON) stream parser - a stateful handle that turns string chunks into the complete records decoded so far.\"",
+   "guides/ndjson.md class NDJSONParser: guide \"The stateful NDJSON stream parser — implements `NDJSONParserInterface`, reassembles records split across chunks.\" source \"Decodes an NDJSON (newline-delimited JSON) stream statefully — feed the handle string chunks, get back the complete records decoded so far.\"",
+   "guides/ndjson.md NDJSONParserInterface.parse: guide absent source \"Appends `chunk`, then returns every COMPLETE `\\\\n`-terminated line parsed to a record (malformed / non-record lines are skipped); a trailing partial line is retained for the next call.\"",
+   "guides/ndjson.md NDJSONParserInterface.clear: guide absent source \"Drops any buffered partial line, leaving the handle ready for a fresh stream.\"",
```

The three cases, as landed: `keeps every compared summary and example equal to its source` inside
the manifest loop's `describe(entry.concept)`; `pairs at least one example title across the guide
and the source` and `opens the README with the guide tagline` at file scope; `findDrift` imported
beside the existing readers; `GUIDE_SPEC = 'guides/ndjson.md'` and `own` (the manifest row) at file
scope; `README.md` added to `ROOT_FILES`.

## Criterion 2 — the headers and the class rows

| Site | Before | After |
| --- | --- | --- |
| `### Types` table | `Type \| Kind \| Shape` | `Type \| Kind \| Shape \| Summary` |
| `### Factories` table | `API \| Kind \| Builds…` | `API \| Kind \| Summary` |
| `### Entities` heading | `### Entities` | `### Classes` |
| `#### NDJSONParserInterface` table | `Method \| Returns \| Behavior` | `Method \| Returns \| Summary` |

`### Entities` carried one row and its `Kind` is `class`, so the heading moved under ruling 5. The
class is not documented under its own H3, so the existing row is its row and no table was added.

The `Shape` cell keeps the type literal, restated as the pilot's idiom — `NDJSONParserInterface`
now reads `{ parse, clear }` — under the convention sentence "A `Shape` cell holds the interface's
members in braces.", worded against the one row that remains. The clause the old `Shape` cell
carried before its em dash ("The stateful stream-parser contract") folded into the interface's doc
block verb-first. A navigation sentence follows the table: "Its `parse` and `clear` members are
call-signature methods, documented under [Methods](#methods)."

`npm run docs` after the headers changed, before any doc-block rewrite: every row reports text on
both sides rather than `guide absent`, so the readers locate every cell — `rows read: 1,
disagreements found: 6`.

## Criterion 3 — the doc blocks, then `--to guide`

Rewritten by hand, each verb-first with the symbol unnamed in its first sentence:

- `src/core/types.ts`, `NDJSONParserInterface` — the guide's `Shape` cell carried the contract
  framing the block lacked. Now: "Represents the stateful NDJSON (newline-delimited JSON)
  stream-parser contract a consumer holds — a `parse` that turns each string chunk into the
  complete records decoded so far, and a `clear` that drops the buffered partial line." Distinct
  from the class's paragraph, which states the implementation.
- `src/core/types.ts`, `parse` — the guide's `Behavior` cell carried the unbounded-upstream caveat
  the block lacked. Under ruling 7 the caveat moved into a new `@remarks` on the same block, every
  sentence kept: "A line the stream never terminates stays in the buffer until its newline arrives,
  and the buffer has no size limit, so a caller fronting an untrusted or unbounded upstream must
  enforce its own byte cap before feeding chunks in." The description states the reassembly the old
  cell implied and drops the shouted `COMPLETE`.
- `src/core/factories.ts`, `createNDJSONParser` — the guide's `Builds…` cell carried the returned
  contract the block lacked, so the factory's preference is stated as that contract: "Creates an
  NDJSON (newline-delimited JSON) stream parser and returns it as an `NDJSONParserInterface` — a
  fresh `NDJSONParser` holding the buffer, so a caller holds the published contract rather than the
  class."
- `src/core/NDJSONParser.ts`, `NDJSONParser` — the guide's cell carried both the interface it
  implements and the reassembly, neither in the block. Now: "Decodes an NDJSON (newline-delimited
  JSON) stream statefully, implementing `NDJSONParserInterface` over a private buffer the instance
  owns — each `parse` call returns the records completed so far and reassembles a record split
  across chunk boundaries." Its `@remarks` kept every sentence; the partial-line bullet's closing
  clause "and is retained for the next call" was pruned as the sentence the description now
  repeats, and `BEFORE` and "(never throws)" were reworded into plain prose.

`clear`'s block was not rewritten: the guide cell carried the same sentence in the imperative, so
`--to guide` alone converged it to the third-person form.

Rows whose literal stayed in `Shape`: `NDJSONParserInterface`, as `{ parse, clear }`.

```
$ npm run docs -- --to guide
wrote guides/ndjson.md
rows read: 1, disagreements found: 6, written: 5, reported: 1
$ npx oxfmt --write guides/ndjson.md          exit 0
$ npm run docs                                exit 1: rows read: 1, disagreements found: 1
```

The one report and the one residual are the pitch, which the seed leaves to hand.

## Criterion 4 — the titled pair

The pair is the `@example` on `createNDJSONParser` in `src/core/factories.ts` — the primary factory
— titled `Factories`, against the first fence under the guide's `### Factories` heading.

Eligibility read before titling. Heading-scoped uniqueness:

```
$ grep -n '^#\+ Factories' guides/ndjson.md      57:### Factories
$ grep -n '^#\+ Surface' guides/ndjson.md        23:## Surface
```

Fence bodies read: the `### Factories` body is the import of `createNDJSONParser`, the handle, and
one `parse` call over a two-line chunk; it carries no three-backtick run and no doc-comment
terminator. The `## Surface` body demonstrates the same factory and is equally eligible.

```
$ npm run docs                                   (after `@example` -> `@example Factories`)
guides/ndjson.md Factories: guide "ts\nimport { createNDJSONParser } from '@orkestrel/ndjson'\n\nconst parser = createNDJSONParser()\nparser.parse('{\"a\":1}\\n{\"b\":2}\\n') // [{ a: 1 }, { b: 2 }]" source "ts\nimport { createNDJSONParser } from '@orkestrel/ndjson'\n\nconst parser = createNDJSONParser()\nparser.parse('{\"a\":1}\\n{\"b\":2}\\n') // [{ a: 1 }, { b: 2 }]\nparser.parse('{\"c\":3}') // [] - buffered until its trailing newline arrives\nparser.parse('\\n') // [{ c: 3 }]"
rows read: 1, disagreements found: 2
$ npm run docs -- --to source
wrote src/core/factories.ts
rows read: 1, disagreements found: 2, written: 1, reported: 1
$ npx oxfmt --write src/core/factories.ts        exit 0
```

The block dropped the two trailing lines the guide fence does not carry. Every other `@example`
stays untitled: `src/core/NDJSONParser.ts` carries the only other one.

## Criterion 5 — the blockquote and the pitch

The tagline, one noun phrase in plain text with no link and no bold, identical bytes and line
breaks in `guides/ndjson.md:3-5` and `README.md:3-5`:

```
> A stateful newline-delimited-JSON (NDJSON) stream parser: a self-contained handle
> that turns string chunks into the complete records decoded so far, and never throws
> on a malformed, blank, or non-record line.
```

`diff <(sed -n '3,5p' guides/ndjson.md) <(sed -n '3,5p' README.md)` reports no difference.

The guide gained an opening paragraph after the blockquote carrying every displaced sentence, none
restating a tagline clause: the `parse(chunk)` buffer-and-split mechanism with the reassembly; the
per-line filter (blank or whitespace-only including a CRLF's trailing `\r`, malformed JSON, a
non-record value) and the never-emitted unterminated line; `clear()`; "Nothing else is wired in: no
Emitter, no server, HTTP, or agent coupling."; the streaming `TextDecoder` pairing; the absent size
limit and the caller's byte cap; and "Source: [`src/core`](../src/core). Surfaced through the
`@src/core` barrel."

The README's opening paragraph became the onboarding it alone carries — "Create a parser with the
`createNDJSONParser` function, feed it each chunk as it arrives, and read the records that call
returns; call `clear()` to reuse the same handle for a fresh stream. Part of the `@orkestrel`
line." Its `## Install`, `## Requirements`, `## Usage`, `## Guide`, `## Package`, and `## License`
sections are unchanged, so the usage fence the suite transcribes is untouched.

## Criterion 6 — the seed

```
$ npm run docs                    exit 0: rows read: 1, disagreements found: 0
$ npm run docs -- --to guide      exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source     exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — the gates

Scoped to the owned paths `README.md guides/ndjson.md src/core/NDJSONParser.ts src/core/factories.ts
src/core/types.ts tests/guides.test.ts`:

- `npx oxfmt --check <paths>` → `All matched files use the correct format.` — exit 0.
- `npx oxlint --config .oxlintrc.json --deny-warnings <paths>` → no output — exit 0.
- `npm run check` → `tsc --noEmit --project tsconfig.json`, then `check:src:core` — no diagnostics,
  exit 0.
- `npm run test:guides` → `Test Files 1 passed (1)` / `Tests 31 passed (31)` — exit 0. The three
  cases are green.
- `npm run test:policy` → `Test Files 1 passed (1)` / `Tests 90 passed | 1 skipped (91)` — exit 0.

Observation, the narrowest unit script: `npm run test:src:core` → `Test Files 2 passed (2)` /
`Tests 70 passed (70)`, duration 1.32s — exit 0.

## Criterion 8 — the tree

```
$ git status --short
 M README.md
 M guides/ndjson.md
 M src/core/NDJSONParser.ts
 M src/core/factories.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

Owned files only. `git diff --stat`: `6 files changed, 143 insertions(+), 66 deletions(-)`.

## Reader and seed defects met

None. Every worklist line the brief predicted appeared, every cell was located after the header
change, `replaceCell` disturbed no cell outside the `Summary` column, `replaceExample` accepted the
titled body, and both write directions are idempotent. No line of the brief's predicted worklist
went unexplained.

## Ancillary decisions

- **The titled fence is `### Factories`, not `## Surface`.** Both headings occur once and both
  fences demonstrate `createNDJSONParser`. `Factories` is the heading whose subject is the factory
  and whose fence demonstrates that declaration alone; `Surface` names the whole documented surface
  and its fence also exercises `clear`.
- **The pin's inline form.** Written as the accepted pilot landed it — `if (fence.title ===
  undefined) continue` followed by the inline `titled.has(fence.title)` test — with no local
  predicate. The brief's `fence.title !== undefined && titled.has(fence.title)` cannot also collect
  the guide-side headings the required both-sides failure line names, and the pilot is the
  precedent that reconciles the two.
- **The Types section's navigation sentence sits between the table and the fence**, so a reader
  meets it with the row rather than after the demonstration.
- **§ Tests was not added.** The brief's § Tests item fires where the guide's § Tests lists the
  checks the suite wires; `guides/ndjson.md` carries no `## Tests` section, and adding one is
  outside this unit's criteria. The guide's headings are `# NDJSON`, `## Surface`, `### Types`,
  `### Factories`, `### Classes`, `## Methods`, `#### NDJSONParserInterface`.
- **`parse`'s caveat became a `@remarks` on the interface member**, not on the class, because the
  member's description is the cell the `## Methods` table compares.
- **No lint control was planted**, per the template correction; the Orchestrator takes that reading.
