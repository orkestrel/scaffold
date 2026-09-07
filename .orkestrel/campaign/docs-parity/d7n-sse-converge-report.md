# Report — `d7n-sse-converge`

Wall clock: 2026-09-07T14:59:34Z → 2026-09-07T15:08:42Z.

## Touched files

| File | Change |
| --- | --- |
| `guides/sse.md` | Tagline reduced to one noun phrase, opening prose added, `Summary` on every table, `### Entities` → `### Classes`, `Shape` literals and the convention sentence, every cell written from its doc block |
| `README.md` | The guide's blockquote as the pitch, the onboarding paragraph rewritten around it |
| `src/core/types.ts` | Description paragraphs of `SSEEvent`, `SSEErrorCode`, `SSEParserOptions`, `SSEParserInterface`, `parse`, `flush`, `clear`; reference material moved to `@remarks` |
| `src/core/constants.ts` | `NUL` and `BOM` descriptions split from their codepoint rationale, which moved to `@remarks` |
| `src/core/errors.ts` | `SSEError` description states the code and the `context` it carries |
| `src/core/factories.ts` | `createSSEParser` description states the contract it returns; its `@example` titled `Factories` and its body carried in by the seed |
| `src/core/SSEParser.ts` | Class description made distinct from the interface's |
| `tests/guides.test.ts` | The equality case, the title pin, the README case; `GUIDE_SPEC`; `README.md` in `ROOT_FILES`; `findDrift` imported |

Diffstat:

```text
 README.md             | 18 +++++------
 guides/sse.md         | 86 +++++++++++++++++++++++++--------------------------
 src/core/SSEParser.ts |  5 +--
 src/core/constants.ts | 14 ++++++---
 src/core/errors.ts    |  3 +-
 src/core/factories.ts | 16 ++++------
 src/core/types.ts     | 79 +++++++++++++++++++++++-----------------------
 tests/guides.test.ts  | 82 +++++++++++++++++++++++++++++++++++++++++++++---
 8 files changed, 188 insertions(+), 115 deletions(-)
```

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` → `Tests 3 failed | 36 passed (39)`, exit 1. The failing cases and their first lines, verbatim:

`pairs at least one example title across the guide and the source`

```text
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/sse.md pairs: guide [\"Surface\",\"Types\",\"Constants\",\"Errors\",\"Factories\",\"SSEParserInterface\",\"SSEParserInterface\",\"SSEParserInterface\",\"SSEParserInterface\"] source []",
```

`opens the README with the guide tagline`

```text
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:114:20
    114|  expect(pitch).not.toBeUndefined()
```

`SSE > keeps every compared summary and example equal to its source`

```text
AssertionError: expected [ …(13) ] to deeply equal []
+   "guides/sse.md interface SSEEvent: guide absent source \"Represents one dispatched Server-Sent Event - the value a blank line flushes from an `SSEParserInterface`.\"",
+   "guides/sse.md interface SSEParserInterface: guide absent source \"Represents a stateful Server-Sent-Events (SSE) stream parser: feed it string chunks, get back the complete events dispatched so far. A trailing partial line / in-progress event is buffered until the rest arrives.\"",
+   "guides/sse.md interface SSEParserOptions: guide absent source \"Configures `import('./factories.js').createSSEParser` / the `import('./SSEParser.js').SSEParser` constructor.\"",
+   "guides/sse.md type SSEErrorCode: guide absent source \"Names the machine-readable codes carried by an `import('./errors.js').SSEError`.\"",
+   "guides/sse.md const NUL: guide \"The NUL byte (`U+0000`) — an `id:` field containing it is voided per spec and never surfaced.\" source \"Names the null byte (`U+0000`). The SSE spec voids an `id:` field whose value contains it, so an `id` carrying a NUL is never surfaced. Spelled as a codepoint so the wire content is unambiguous in source.\"",
```

The pin's failure line records that every fence already carries its nearest preceding heading flattened, and that no `@example` was titled.

## Criterion 2 — the headers and the class rows

`grep -n '^| Type \|^| API \|^| Method \|^### Classes' guides/sse.md` on the tree left behind:

```text
39:| Type                 | Kind      | Shape                                | Summary  …
54:| API   | Kind  | Summary  …
68:| API          | Kind     | Summary  …
88:| API               | Kind     | Summary  …
101:### Classes
103:| API         | Kind  | Summary  …
116:| Method  | Returns               | Summary  …
```

`Builds…` (Factories) and `Behavior` (the `SSEParserInterface` method table) are renamed `Summary`; `grep` finds neither token in the file. The `### Types` table gained `Summary` as its last column. `### Entities` became `### Classes`: its only row's `Kind` is `class`. `### Errors` is mixed (`SSEError` class, `isSSEError` function) and keeps its heading. No class is documented under its own H3, so no row was added; `SSEParser` already carries one.

## Criterion 3 — the cells

Literals that stayed in `Shape`, with the clause after the em dash moved into the doc block verb-first: `SSEEvent` (`{ data, event?, id?, retry? }`), `SSEParserOptions` (`{ limit? }`), `SSEErrorCode` (`'OVERFLOW'`). `SSEParserInterface` carried prose rather than a literal, so its `Shape` cell became the member literal `{ parse, flush, clear, id, retry }` and its prose moved to `Summary`. The convention sentence under `### Types` is worded against exactly those rows: `A `Shape` cell holds an interface's members in braces, and a type alias's value.`

Blocks rewritten by hand before the write, each because its cell carried information the block lacked:

| Declaration | What the cell carried that the block did not |
| --- | --- |
| `SSEEvent` | The `data` join rule and the last-wins reading of `event` / `id` / `retry` |
| `SSEParserInterface` | The sticky `id` / `retry` getters |
| `SSEParserOptions` | What `limit` caps and what unset means |
| `SSEErrorCode` | That `'OVERFLOW'` is the sole code and when it is thrown |
| `NUL`, `BOM` | Nothing; the codepoint rationale moved to `@remarks` under Ruling 7 |
| `SSEError` | The `SSEErrorCode` and the optional `context` |
| `createSSEParser` | The contract it returns, stated as `a stateful SSEParserInterface handle, backed by SSEParser` |
| `SSEParser` | Rewritten to be distinct from the interface's paragraph, which it had duplicated |
| `SSEParserInterface.parse` | The `'OVERFLOW'` throw and the unchanged state |
| `SSEParserInterface.flush` | Nothing; the WHATWG-convenience sentence moved to `@remarks` |
| `SSEParserInterface.clear` | Nothing; `id` / `retry` gained code spans |

Remark sentences pruned as repeats of the new description: the `SSEEvent` `data` bullet's join restatement, the whole `SSEErrorCode` `@remarks` block (its one sentence is now the description), and the `SSEParserOptions` "Unset is the default" clause.

`isSSEError` needed no hand edit; the seed wrote its cell from the block as it stood.

```text
$ npm run docs -- --to guide
wrote guides/sse.md
rows read: 1, disagreements found: 14, written: 13, reported: 1
$ npx oxfmt --config .oxfmtrc.json --write guides/sse.md      → exit 0
$ npm run docs
rows read: 1, disagreements found: 1                          (the pitch alone)
```

## Criterion 4 — the titled pair

The pair is the `@example` block of `createSSEParser` in `src/core/factories.ts` — the primary factory, the only `create*` the package exports — titled `Factories`, paired with the first fence under the guide's `### Factories` heading.

Eligibility, read on the tree before titling:

```text
$ grep -n '^#\+ Factories' guides/sse.md
88:### Factories
$ sed -n '95,100p' guides/sse.md | grep -c '```\|\*/'
0
```

Two fences demonstrate `createSSEParser`: the one under `## Surface` and the one under `### Factories`. Ancillary decision recorded: `Factories` carries the title, because that heading is where the guide documents the factory whose block holds the example.

```text
$ (title added by hand: `@example` → `@example Factories`)
$ npm run docs
guides/sse.md Factories: guide "ts\nimport { createSSEParser } from '@orkestrel/sse'\n\nconst parser = createSSEParser({ limit: 1_000_000 })\nparser.parse('data: a\\ndata: b\\n\\n') // [{ data: 'a\\nb' }] - the two data lines joined\nparser.parse('event: ping\\ndata: 1') // [] - buffered until its blank line\nparser.parse('\\n\\n') // [{ data: '1', event: 'ping' }]" source "ts\nimport { createSSEParser, isSSEError } from '@src/core'\n\nconst parser = createSSEParser({ limit: 1_000_000 })\n…\ntry {\n\tparser.parse('x'.repeat(2_000_000))\n} catch (error) {\n\tif (isSSEError(error) && error.code === 'OVERFLOW') parser.clear()\n}"
rows read: 1, disagreements found: 2
$ npm run docs -- --to source
wrote src/core/factories.ts
rows read: 1, disagreements found: 2, written: 1, reported: 1                (the pitch)
```

Both fence bodies read before the write: the guide's body carries the published `@orkestrel/sse` specifier and stops at the third `parse` call; the block's prior body carried the `@src/core` specifier and a `try` / `catch` demonstration, and the guide's body replaced it. `grep -rn '@example' src/` on the tree left behind names one titled block (`src/core/factories.ts:26`) and three untitled ones (`src/core/SSEParser.ts:56`, `src/core/errors.ts:22`, `src/core/errors.ts:62`).

## Criterion 5 — the blockquote, the opening prose, the pitch

The tagline is one noun phrase in plain text and code spans, with no link and no bold, and the README carries it byte-identically with the same line breaks:

```text
> A stateful Server-Sent-Events (SSE) stream parser: a handle that turns string chunks into
> the complete events a blank line has dispatched, buffering a partial line or in-progress
> event until the rest arrives and persisting the sticky `id` / `retry` connection state.
```

Sentences displaced from the old blockquote into the guide's opening prose, which the guide previously lacked entirely (`## Surface` followed the blockquote directly): the wire format and the blank-line dispatch rule; the WHATWG last-event-id semantics with the getters and `clear()`; the `limit` bound with its typed throw and `flush()` at end-of-stream; the pure-functional-primitive sentence; the `Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.` pointer, whose link the tagline could no longer carry. Dropped as restating the new tagline: "A trailing partial line or in-progress event split across chunk boundaries is buffered until the rest arrives." `DISPATCHES` is written `dispatches` in the moved sentence.

The README's opening paragraph is new onboarding that restates none of the tagline's clauses: "Create a parser with the `createSSEParser` function, feed it the chunks your transport hands you, and read the dispatched events off each `parse(chunk)` return. Part of the `@orkestrel` line." The README's later `TextDecoder`, `limit`, and `flush` paragraphs, its `Usage` fence, and its `Guide` / `Package` / `License` sections are unchanged.

## Criterion 6 — the seed

```text
$ npm run docs                    rows read: 1, disagreements found: 0                          exit 0
$ npm run docs -- --to guide      rows read: 1, disagreements found: 0, written: 0, reported: 0  exit 0
$ npm run docs -- --to source     rows read: 1, disagreements found: 0, written: 0, reported: 0  exit 0
```

## Criterion 7 — the gates

```text
$ npx oxfmt --config .oxfmtrc.json --check guides/sse.md README.md src/core tests/guides.test.ts
All matched files use the correct format.  (9 files)                                    exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings guides README.md src/core tests/guides.test.ts
(no output)                                                                             exit 0
$ npm run check                   tsc --noEmit --project tsconfig.json; tsc -p configs/src/tsconfig.core.json, no diagnostics   exit 0
$ npm run test:guides             Test Files 1 passed (1) / Tests 39 passed (39)         exit 0
$ npm run test:policy             Test Files 1 passed (1) / Tests 90 passed | 1 skipped (91)  exit 0
```

The three cases named in criterion 1 are among the 39 that pass. Observation, not a criterion: `npm run test:src:core` → `Test Files 2 passed (2) / Tests 120 passed (120)`, exit 0.

## Criterion 8 — status

```text
$ git status --short
 M README.md
 M guides/sse.md
 M src/core/SSEParser.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

Owned files only. No untracked file, no vendored file, no `package.json`, no `package-lock.json`.

## Reader and seed defects met

None. Every cell the headers exposed was located by `replaceCell`, the `--to source` replacer accepted the titled body, and no residual disagreement survived a doc-block rewrite. The one row the seed reported it could not write is the pitch, with the reason the seed itself states — `the README pitch is authored by hand` — which is the seed's design rather than a defect, and hand-writing the blockquote closed it.

Two comparator behaviours the brief's P16 terms already name, recorded because they governed a rewrite: a `{@link}` tag renders as its target's declaration reference, so `{@link import('./errors.js').SSEError}` compared as the code span `` `import('./errors.js').SSEError` ``. Every cross-file `{@link}` in a description paragraph was therefore rewritten as a plain code span, and `{@link}` was kept only where the target resolves to a bare name in that file (`SSEParserInterface` in `types.ts` and `SSEParser.ts`, `SSEErrorCode` in `errors.ts`, `SSEParserInterface` and `SSEParser` in `factories.ts`). `@remarks` text is unread by the comparison, so a `{@link}` there was left alone.

## Ancillary decisions

- The `Shape` convention sentence sits under the `### Types` heading, above the table, matching the accepted pilot at `/home/user/fleet/abort/guides/abort.md:56-60`.
- `Factories` carries the `@example` title rather than `Surface`, as recorded under criterion 4.
- The pre-existing `CORE_GUIDE` constant in `tests/guides.test.ts` held the same spec path the pin and the README case need, so it was renamed `GUIDE_SPEC` and its doc comment restated to cover both roles, rather than adding a second constant with the same value. Its former use in the `flagship fences` block reads the renamed constant.
- The description paragraphs written by hand use spaced em dashes, matching the guide's prose and the pilot's cells; hyphens elsewhere in each block were left as the package already wrote them.
- The rewritten opening prose wraps near 95 columns, matching the pilot; the pre-existing `## Surface` intro paragraph wraps near 70 and was left untouched, because rewrapping it changes no fact.

## Not applicable

The guide carries no `## Tests` section — its headings are `Surface`, `Types`, `Constants`, `Errors`, `Factories`, `Classes`, `Methods`, and `#### \`SSEParserInterface\`` — so the brief's conditional § Tests item ("where the guide's § Tests lists the checks the suite wires") did not fire and no such section was added. Adding one is outside this unit's fixed scope; flagging it for the Orchestrator.

## Deviation state

No deviation. Nothing in the deviation contract fired: every cell was located after the headers changed, the block held the titled body, no test outside `tests/guides.test.ts` went red, no vendored file needed an edit, no reader returned an undescribed shape, and no residual disagreement survived. No lint control was planted.


---

## Orchestrator annotation (slice 1 audit, 2026-09-07)

The audit read counts in this report's prose against the writing ban, and where it names a citation as stale against the tree the unit left (msg: `357:### Factories` for `guides/msg.md:358`; sse: `88:### Factories` for `guides/sse.md:86`), the tree is authoritative. The report stands as the unit's evidence with this note.
