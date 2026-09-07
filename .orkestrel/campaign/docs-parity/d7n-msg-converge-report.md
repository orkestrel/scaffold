# Report — `d7n-msg-converge`

Wall clock: 2026-09-07T14:59:27Z to 2026-09-07T15:15:29Z.

Touched: `guides/msg.md` (tables, tagline, opening prose, `## Tests`), `README.md` (pitch and
opening paragraph), `src/core/{types,constants,errors,factories,helpers,parsers,shapers,validators,MSG}.ts`
(doc blocks only), `tests/guides.test.ts` (the three gate cases).

```
 README.md              |  20 ++-
 guides/msg.md          | 326 ++++++++++++++++++++++++++-----------------------
 src/core/MSG.ts        |  15 +--
 src/core/constants.ts  | 167 ++++++++++++++-----------
 src/core/errors.ts     |   3 +-
 src/core/factories.ts  |  19 ++-
 src/core/helpers.ts    |  96 ++++++++-------
 src/core/parsers.ts    |  10 +-
 src/core/shapers.ts    |  29 +++--
 src/core/types.ts      |  47 +++----
 src/core/validators.ts |  15 ++-
 tests/guides.test.ts   |  75 +++++++++++-
 12 files changed, 474 insertions(+), 348 deletions(-)
```

## Criterion 1 — red-first on the unconverged tree

`npm run test:guides` after the three cases landed and before any convergence:
`Test Files 1 failed (1)`, `Tests 3 failed | 33 passed (36)`.

```
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/msg.md pairs: guide [\"Surface\",\"Errors\",\"Helpers\",\"Shapers\",\"Parsers\",\"Validators\",\"MSG\",\"Factories\",\"MSGSourceInterface\"] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:152:20
    152|  expect(pitch).not.toBeUndefined()

 FAIL  |guides| tests/guides.test.ts > MSG > keeps every compared summary and example equal to its source
AssertionError: expected [ …(128) ] to deeply equal []
+   "guides/msg.md interface Success: guide absent source \"Represents a successful operation result.\"",
+   "guides/msg.md interface Failure: guide absent source \"Represents a failed operation result.\"",
    (…the same worklist `npm run docs` printed, minus the pitch row `docs` reports separately)
```

The cases are named for what they prove: `keeps every compared summary and example equal to its
source`, `pairs at least one example title across the guide and the source`, `opens the README
with the guide tagline`. `findDrift` imported beside the existing readers; `GUIDE_SPEC =
'guides/msg.md'` at file scope; `README.md` added to `ROOT_FILES`; the pin written in scaffold's
inline form (`fence.title !== undefined && titled.has(fence.title)`), no local predicate.

## Criterion 2 — headers and class rows

Every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`,
`Value`, or `Returns`:

```
 44: | Type      | Kind      | Shape     | Summary |
 76: | Constant  | Kind      | Value     | Summary |
142: | Symbol    | Kind      | Signature | Summary |
161: | Helper    | Kind      | Signature | Summary |
249: | Shaper    | Kind      | Signature | Summary |
287: | Parser    | Kind      | Signature | Summary |
301: | Guard     | Kind      | Signature | Summary |
340: | Class     | Kind      | Summary   |
362: | Factory   | Kind      | Signature | Summary |
381: | Method    | Returns   | Summary   |   (`MSGInterface`)
388: | Method    | Returns   | Summary   |   (`MSGSourceInterface`)
```

- `Behavior` renamed to `Summary` in the Errors, Helpers, Shapers, Parsers, Factories, and both
  Methods tables.
- The Types table carried `Shape` and no compared column, so it gained `Summary` as its last
  column. The convention sentence sits in the section's intro, the shape the abort pilot took
  (`guides/abort.md:56-60`): "A `Shape` cell holds a type alias's value, and an interface's members
  in braces; it stays empty where an interface carries more members than a cell can list."
- The Constants table's `Behavior` cell carried a literal and a clause, so the literal took a
  `Value` column — the column the guide package's own Constants table uses
  (`/home/user/fleet/guide/guides/guide.md:58`) — and the clause moved into the doc block.
- The Validators table headed `Narrows to`, which is outside the permitted set. **Ancillary
  decision:** that column became `Signature`, each cell written as the guard's full predicate
  (`(value: unknown) => value is EmailChain`), matching the Helpers, Shapers, Parsers, and
  Factories tables in the same guide. The narrowed type survives inside the predicate, so nothing
  was dropped.
- Ruling 5: `MSG` is the one class documented under its own H3 and carried no row. A `### Classes`
  table was added immediately before `### \`MSG\``, inside `## Surface`, so `extractSurface` reads
  the row before the H3 heading and the row's summary wins the dedupe. No `### Entities` table
  exists in this guide. `MSGError` stays in the mixed `### Errors` table, which keeps its heading.

## Criterion 3 — the rows moved and the blocks rewritten

Direction was Ruling 6's: the doc block was rewritten first wherever the cell carried information
the block lacked, then `npm run docs -- --to guide` propagated.

**Literals that stayed in a data column.** Every Types row kept its literal in `Shape` except
`MSGFieldData`, whose `Shape` cell is empty because the interface carries more members than a cell
can list — the case the convention sentence names. `MSGMutableFieldData` had prose rather than a
literal and gained its member list. Every Constants row kept its literal or declared type in
`Value`. Every Errors, Helpers, Shapers, Parsers, Validators, and Factories row kept its signature
in `Signature`; every Methods row kept its return type in `Returns`.

**Blocks rewritten by hand**, per file:

- `types.ts`: `Success`, `Failure`, `MSGNameIdEntry`, `MSGBurnerEntry`, `MSGFieldData`,
  `MSGSourceInterface` and its `parse` and `attachment` members, `MIMEHeader`, `EmailInput`,
  `MSGInput`, `MSGInterface.attachment`, `MSGInterface.burn`.
- `constants.ts`: every declaration except `MSG_SECTOR_SIZE`, `MSG_S_BIG_BLOCK_MARK`,
  `MSG_PROP_CATEGORY_OFFSET`, and `MSG_PROP_SIZE_OFFSET`, whose blocks already carried the cell's
  information.
- `helpers.ts`: every declaration except `success`, `failure`, and `decodeLatin1`.
- `shapers.ts`: `burnCFB`, `extractMessageFromMSG`, `extractMessage`.
- `parsers.ts`: `parseMIMEPart`. `validators.ts`: `isRecord`, `isEmailFormat`, `isEmailAttachment`,
  `isEmailMessage`, `isEmailChain`. `errors.ts`: `MSGError`. `factories.ts`: `createMSG`.
  `MSG.ts`: `MSG`.

**Ruling 7 applied.** Reference material moved to `@remarks`, every sentence kept, on
`MSG_MAX_HIERARCHY_DEPTH`, `MSG_PIDLID_MAPPING`, `MSG_BURNER_NAME_MAX`, `MSG_BURNER_ROOT_CLSID`,
`MIME_MAX_DEPTH`, `UTF8_SEQUENCE_MINIMUM`, `WINDOWS_1252_HIGH`, `decodeText`,
`fileTimeToUTCString`, `decodeUTF8`, `extractMessageFromMSG`, `parseMIMEPart`,
`MSGInterface.attachment`, `createMSG`, and `MSG`. `createMSG`'s preference is stated as the
contract it returns ("returns it inside a `Result`: every parse failure surfaces as a `Failure`
carrying the `MSGError` instead of throwing"), and the remark it repeated — that `createMSG`
surfaces failures rather than throwing — was pruned from `@remarks`, which now carries only the
two-entry-point ruling. Distinct description paragraphs were written where rows would otherwise
have carried one sentence: each `MSG_HEADER_*` offset names what it locates, each `MSG_CATEGORY_*`
names its slot, each `MSG_MAPI_RECIPIENT_*` names the `MSGRecipientRole` it maps to, and each
validator names the members its guard walks.

**Displaced information that survived the column split**, spot-checked against the tree left
behind: the CFB magic bytes at `src/core/constants.ts:6`, the root CLSID bytes at
`src/core/constants.ts:399`, and the `MSGInterface` pointer to `## Methods` at `guides/msg.md:42`.

**Write safety.** Re-deriving the pre-write data columns from `HEAD:guides/msg.md` and comparing
against the converged file: `expected rows 127, current rows 127, non-Summary cells mismatched: 0`.

Runs, in order:

```
$ npm run docs -- --to source     rows read: 1, disagreements found: 130, written: 1, reported: 129
$ npx oxfmt --write src/core/factories.ts
$ npm run docs -- --to guide      rows read: 1, disagreements found: 129, written: 128, reported: 1
$ npx oxfmt --write guides/msg.md
$ npm run docs                    rows read: 1, disagreements found: 1   (the pitch alone)
```

## Criterion 4 — the titled pair

`createMSG` is the primary factory (`src/core/factories.ts:37`), so its `@example` block took the
title. The title is `Factories`, the flattened text of the heading whose first fence demonstrates
that block — the `### Factories` fence, whose body is exactly `createMSG` narrowed through
`isSuccess`. **Ancillary decision:** `## Surface` and `#### MSGSourceInterface` also carry fences
that call `createMSG`; `Factories` was taken because it heads the section that documents the
factory and its fence demonstrates the factory alone, while the `## Surface` fence is the guide's
opening narrative and the `MSGSourceInterface` fence demonstrates the methods.

Eligibility checks read on this tree:

```
$ grep -n '^#\+ Factories' guides/msg.md
357:### Factories
```

The fence body read for a three-backtick run and for the doc-comment terminator: it carries
neither. The pair now reads `@example Factories` at `src/core/factories.ts:24`, its body the
guide's fence carried in by `--to source` (that run is recorded in criterion 3, `written: 1`).
Every other `@example` block in `src/core` stays untitled.

## Criterion 5 — the tagline, the opening prose, and the pitch

The H1 blockquote is one noun phrase in plain text and code spans, no link and no bold, and the
README's pitch is the same text with the same line breaks:

```
> A zero-dependency parser for Outlook `.msg` (CFB/OLE2 compound binary) and `.eml`
> (RFC 2822 / MIME) email files, projecting either format into one structured `EmailChain`.
```

The blockquote's displaced sentences — `Source: [`src/core`](../src/core).` and `Surfaced through
the `@src/core` barrel.` — fold into a new opening paragraph after the blockquote, which also took
the two sentences the `## Surface` paragraph had carried about the pure-ES encoding layer and the
DOM- and Node-free environment, so nothing is restated in two places:

> A pure-ES encoding layer (Base64, UTF-8, Latin-1, Windows-1252, quoted-printable, RFC 2047
> encoded words) and the CFB sector and directory machinery in `parsers.ts`, `helpers.ts`, and
> `shapers.ts` back either format without a `TextDecoder` dependency, so the whole surface stays
> usable in the core's DOM/Node-free environment. Source: [`src/core`](../src/core). Surfaced
> through the `@src/core` barrel.

The `## Surface` paragraph keeps its first four sentences and ends at "`burn` access."; "back both
formats" became "back either format" when it moved, because the sentence no longer names the
members it tallied.

The README's opening paragraph keeps the onboarding it alone carries and restates no tagline
clause:

> Hand `createMSG` the raw file bytes plus an optional file name or MIME hint. It detects the
> format, and the chain it returns carries the sender, recipients, subject, date, text and HTML
> bodies, and decoded attachments. Each reader is written from scratch: the CFB side walks the
> directory tree and extracts MAPI properties directly, and the MIME side walks the header block
> and the nested MIME part tree. Part of the `@orkestrel` line.

The `Result` contract stayed with the paragraph after the usage fence, which already owned it,
rather than being restated in the opening paragraph.

`guides/msg.md` § Tests gained the gate row, named descriptively with no SQ/MQ/EQ/RQ identifier:
the `## Surface` ↔ `src/core` bijection, the `MSGInterface` ↔ `MSG` method bijection, and the
equality gate — every `Summary` cell against its declaration's description paragraph, the titled
`Factories` fence against the `@example` block of that title, and the README pitch against the
tagline.

## Criterion 6 — the seed

```
$ npm run docs                  rows read: 1, disagreements found: 0            exit 0
$ npm run docs -- --to guide    rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source   rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — gates

```
$ npx oxfmt --check guides/msg.md README.md src/core tests/guides.test.ts   All matched files use the correct format.  exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings guides/msg.md README.md src/core tests/guides.test.ts   no output, exit 0
$ npm run check                 exit 0 (tsc --noEmit on the root project, then check:src:core)
$ npm run test:guides           Test Files 1 passed (1);  Tests 36 passed (36)
$ npm run test:policy           Test Files 1 passed (1);  Tests 90 passed | 1 skipped (91)
```

Observation, the package's narrowest unit script:

```
$ npm run test:src:core         Test Files 6 passed (6);  Tests 180 passed (180)
```

No lint control was planted; the Orchestrator takes that reading.

## Criterion 8 — status

```
$ git status --short
 M README.md
 M guides/msg.md
 M src/core/MSG.ts
 M src/core/constants.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/parsers.ts
 M src/core/shapers.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
```

Owned files only. `package.json` and `package-lock.json` untouched; no vendored file, no
`tests/setup*.ts`, no `tests/src/**`, no `guides/README.md`, no `src/**` code outside doc blocks.

## Reader and seed defects met

None. Three readings that could be mistaken for defects, each explained by the readers' own terms:

- `extractRowSummary` reads an empty `Summary` cell as `undefined` rather than as an empty string,
  so a table given the column with blank cells reports every row as `guide absent` and
  `replaceCell` then fills each one. That is what made the "add the column empty, let `--to guide`
  write it" route work, and it needed no hand-authored cell anywhere.
- `disagreements found` rose from 129 to 130 between the report run and the `--to source` run.
  Titling the source `@example` created the `Factories` pair, which `findDrift` then compared and
  reported; the tally is 128 summaries, that one example, and the pitch.
- `--to source` reported every summary row as `the guide side carries no text` and wrote only the
  example, so the hand-written doc blocks were never overwritten by the empty cells.

## Corrections to stale source text found while rewriting

Reported rather than acted on beyond the doc block itself, because each sits inside an owned
description:

- `types.ts` `EmailInput` documented "raw email input handed to an EmailParser". No `EmailParser`
  symbol exists in this package; the block now names `createMSG` and `new MSG()`, which is what the
  guide's cell already said.
- `constants.ts` `MSG_MAX_HIERARCHY_DEPTH` documented the cap as belonging to
  `MSGReader#buildHierarchy`. No `MSGReader` class exists; the block now names the directory-tree
  traversal.

## Deviation state

No deviation. Every cell the seed had to locate was located after the headers changed, the titled
body fitted its block, no test outside `tests/guides.test.ts` went red, no vendored file needed an
edit, no reader returned a shape the brief did not describe, and no residual disagreement stands
under the P16 comparator. The two ancillary matters decided and recorded are the Validators
column's replacement (`Narrows to` → `Signature`) and the titled fence chosen among the eligible
ones (`Factories`).


---

## Orchestrator annotation (slice 1 audit, 2026-09-07)

The audit read counts in this report's prose against the writing ban, and where it names a citation as stale against the tree the unit left (msg: `357:### Factories` for `guides/msg.md:358`; sse: `88:### Factories` for `guides/sse.md:86`), the tree is authoritative. The report stands as the unit's evidence with this note.
