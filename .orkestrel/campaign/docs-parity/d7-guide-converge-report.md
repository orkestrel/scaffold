# Report — U2 `d7-guide-converge`

**One item is not done and it stops on the brief's deviation contract:** `findDrift`'s § Patterns
fence cannot be a titled `@example` block, because its body carries a literal `*/`. Decision 5's
other rows landed. Everything else in the brief is done and every gate in criterion 8 exits 0.

## Deviation — "Compare a guide against the source it documents" cannot pair

**Expected.** Decision 5 titles `findDrift`'s doc block "Compare a guide against the source it
documents", and `npm run docs -- --to source` carries the § Patterns fence body into that block.

**Found.** The fence documents `findDrift` against a source file whose text *is* a doc comment:

```text
 * 	'src/core/helpers.ts': '/**\n * Walks a tree.\n */\nexport function walk(): void {}\n',
```

A `/** … */` block cannot enclose `*/`. `replaceExample` guards only backtick runs
(`src/core/helpers.ts`, `if (example.code.includes('```')) return undefined`) and has no guard for
`*/`, so it accepted the write and emitted a `src/core/helpers.ts` that does not parse.

**Exact evidence.** After `npm run docs -- --to source` reported `written: 6, reported: 1`:

```text
$ npm run build
src/core/helpers.ts(2670,39): error TS1443: Module declaration names may only use ' or " quoted strings.
src/core/helpers.ts(2670,90): error TS1443: Module declaration names may only use ' or " quoted strings.
src/core/helpers.ts(2681,5):  error TS1443: Module declaration names may only use ' or " quoted strings.
src/core/helpers.ts(2684,2):  error TS1109: Expression expected.
src/core/helpers.ts(2710,57): error TS1005: ';' expected.
```

The written block's own text, at `src/core/helpers.ts:2328` before the restore:

```text
 * 		'src/core/helpers.ts': '/**\n * Walks a tree.\n */\nexport function walk(): void {}\n',
```

**Done vs not done.** I restored that block to its committed `@example` body and removed its title
by editing (no discard-class git command). The tree parses, `check` and `build` exit 0, and
"Compare a guide against the source it documents" is now in the unpaired list. Every other part of
the brief is complete.

**Hypothesis.** This fence's subject is a doc comment, so its body carries `*/` by necessity rather
than by style — no rewrite of the example keeps both its meaning and its enclosability. It belongs
with "List the fence languages a package allows" as a body a doc block cannot hold, and
`replaceExample`'s missing `*/` guard is a defect in U1's surface, not in this unit's.

## Criterion 1 — red-first on the unconverged tree

Baseline before the cases: `npm run test:guides` → `Tests 51 passed (51)`, exit 0.

After adding the equality case, the pin, and the README case, before any convergence:
`npm run test:guides` → `Tests 3 failed | 51 passed (54)`, exit 1.

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/guide.md pairs: guide [\"Construct a Guide from markdown text\",\"List the fence languages a package allows\",\"Construct a Source from an inline files record\",\"Resolve a fence's import specifier to the right Source\",\"The bijection assertion shape\",\"Compare a guide against the source it documents\",\"Carry a summary across into the guide\",\"Read a guide's tagline\",\"Project source into physical code lines\",\"Resolve directory and file targets\"] source []",

 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:124:20  expect(pitch).not.toBeUndefined()

 FAIL  |guides| tests/guides.test.ts > Guide > keeps every compared summary and example equal to its source
AssertionError: expected [ …(138) ] to deeply equal []
```

The equality case's 138 and the seed's `disagreements found: 139` agree: the seed adds the pitch
pair, which `findDrift` does not carry.

## Criterion 2 — headers and the `### Classes` rows

`grep -n '^| Name \|^| Method ' guides/guide.md`:

```text
30:| Name | Kind | Shape | Summary |          (Types)
58:| Name | Kind | Value | Summary |          (Constants)
77:| Name | Kind | Signature | Summary |      (Helpers)
152:| Name | Kind | Signature | Summary |     (Parsers)
162:| Name | Kind | Shape | Summary |         (Shapers)
176:| Name | Kind | Summary |                 (Validators)
190:| Name | Kind | Signature | Summary |     (Factories)
209:| Name | Kind | Summary |                 (Classes)
261:| Method | Returns | Summary |            (GuideInterface)
274:| Method | Returns | Summary |            (SourceInterface)
306:| Method | Returns | Summary |            (SourceManagerInterface)
```

No column outside `Kind`, `Shape`, `Signature`, `Value`, `Returns`, `Summary` survives; `Behavior`,
`Builds`, and `Narrows to / Tests` are gone from every table and no prose names them as a column.
The `### Classes` table sits at `:202`, its rows at `:211`–`:213`, ahead of `### \`Guide\`` `:215`,
`### \`Source\`` `:224`, and `### \`SourceManager\`` `:240`, so `extractSurface` meets each row
before its H3 and the H3 narratives stay.

## Criterion 3 — the literals that moved sideways, and the blocks rewritten by hand

Every `Shape` and `Value` cell listed here was split off the old `Behavior` / `Shape` / `Builds`
cell at its em dash and moved into its own data column; the clause after the dash was left as the
cell's starting text and then overwritten by `npm run docs -- --to guide`.

Types — the type literal stayed in `Shape`:

| Row | `Shape` now holds |
| --- | --- |
| `ExportKeyword` | `'type' \| 'interface' \| 'const' \| 'function' \| 'class'` |
| `SurfaceSymbol` | `{ name, keyword, summary? }` |
| `GuideModule` | `string \| readonly string[]` |
| `SourceLine` | `{ source, code, jsdoc }` |
| `SourceComment` | `{ text, line }` |
| `MethodEntry` | `{ name, summary? }` |
| `SourceExample` | `{ name, title?, code, language? }` |
| `Drift` | `{ key, guide?, source? }` |
| `ManifestEntry` | `{ concept, spec, source, tests }` |
| `MethodGroup` | `{ interface, methods }` |
| `FenceImport` | `{ specifier, names }` |
| `GuideFence` | `{ language, code, title? }` |
| `GuideInterface` | `{ sections, tagline, surface, methods, unnamed, links, tests, fences }` |
| `SourceInterface` | `{ exports, surface, methods, exists, hidden, examples }` |
| `SourceManagerInterface` | `{ source, sources }` |
| `SourceOptions` | `{ files, module }` |
| `SourceManagerOptions` | `{ files, modules }` |
| `DeclarationHead` | `{ text, end }` |
| `Declaration` | `{ body, bases }` |
| `DeclarationKeyword` | `'class' \| 'interface'` |

Constants — the quoted literal moved to `Value`:

| Row | `Value` now holds |
| --- | --- |
| `EXPORT_KEYWORDS` | `['type', 'interface', 'const', 'function', 'class']` |
| `SURFACE` | `'Surface'` |
| `METHODS` | `'Methods'` |
| `TESTS` | `'Tests'` |
| `MANIFEST` | `'By concept'` |
| `KIND` | `'Kind'` |
| `SUMMARY` | `'Summary'` |
| `EXTERNAL_SCHEMES` | `['http:', 'https:', 'mailto:', 'tel:']` |
| `WRAP_WIDTH` | `100` |

`EXTERNAL_SCHEMES` is the one row whose old cell led with a type (`readonly string[]`) rather than
the value. I put the value in `Value`, as the column's ruling names, and the type stays readable
from the `Kind` column and the barrel.

Shapers — the structural literal moved from `Builds` into `Shape`:

| Row | `Shape` now holds |
| --- | --- |
| `surfaceSymbolShape` | `{ name: string, keyword: ExportKeyword, summary?: string }` |
| `methodGroupShape` | `{ interface: string, methods: readonly MethodEntry[] }` |
| `methodEntryShape` | `{ name: string, summary?: string }` |
| `sourceExampleShape` | `{ name: string, title?: string, code: string, language?: string }` |
| `driftShape` | `{ key: string, guide?: string, source?: string }` |
| `manifestEntryShape` | `{ concept: string, spec: string, source: GuideModule, tests: string }` |

`manifestEntryShape` is the one row whose old `Builds` cell carried no structural literal, so I
wrote the literal from `src/core/shapers.ts`'s own `objectShape` fields. **Flagged claim.**

Validators — every `Narrows to / Tests` cell read `value: unknown`, so the column went and nothing
moved sideways.

Blocks rewritten by hand, each because the guide cell carried a fact the description paragraph
lacked (the fact usually sat in `@remarks` or `@returns`, both outside the comparison). Each opens
verb-first, third person:

| Block | The fact the cell carried and the block lacked |
| --- | --- |
| `GuideFence` (`types.ts`) | `language` absent when untagged; `title` is the nearest preceding heading |
| `SourceExample` (`types.ts`) | the block's fence language |
| `Drift` (`types.ts`) | the side carrying no text is omitted |
| `SourceManagerInterface` (`types.ts`) | it enumerates the views as well as resolving one |
| `GuideInterface.tagline` | `undefined` when a heading intervenes first |
| `GuideInterface.methods` | each row carries its `Summary` cell |
| `GuideInterface.fences` | each fence carries its nearest preceding heading as `title` |
| `SourceInterface.methods` | the `extends` walk is bounded to the module scope; each member carries its own description paragraph; the first file declaring the name answers |
| `SourceManagerInterface.source` | `undefined` for an unmapped specifier — a foreign import |
| `SourceManagerInterface.sources` | first-seen specifier order |
| `EXPORT_KEYWORDS` (`constants.ts`) | the frozen population the type, the guard, and the shape all derive from |
| `computeSymbolKey` (`helpers.ts`) | the key's form, `${keyword} ${name}` |
| `collectKeys` (`helpers.ts`) | the owner closes at a column-zero `}` or at a column-zero `export` of another keyword |
| `extractBodyLines` (`helpers.ts`) | the supplied head's own record opens the projection |
| `extractFenceImports` (`helpers.ts`) | brace bindings only — default, namespace, side-effect, and mixed forms are not surfaced |
| `extractCellLinks` (`helpers.ts`) | walk order |
| `extractDeclaration` (`helpers.ts`) | `undefined` when the file declares no such head |
| `replaceCell` (`helpers.ts`) | `undefined` for a key reaching no cell; the guide byte for byte when the row already carries it |
| `replaceFence` (`helpers.ts`) | the same miss and identity pair |
| `replaceSummary` (`helpers.ts`) | the identity case, plus `undefined` for a text that is no doc block and a summary carrying no word |
| `replaceExample` (`helpers.ts`) | `undefined` for a text that is no doc block, a title no tag carries, and code a three-backtick fence cannot enclose |
| `locateComment` (`helpers.ts`) | the region covers the block's own indentation; `undefined` when no block carries the key |

One further block was rewritten for a reason the criteria do not name, and I flag it: **`Source`
(`src/core/sources/Source.ts`)**. Its description paragraph was the class's whole reference section,
so the propagated cell measured 1778 characters against 817 for the next longest in the file. I
moved every sentence after "…passes it in as `files`." into a new `@remarks` on the same block,
verbatim — nothing left the block, and the guide's `### \`Source\`` H3 narrative already carries
the same material for a guide reader. The cell now reads 455 characters. **Flagged claim.**

The write itself:

```text
$ npm run build && npm run docs -- --to guide
wrote guides/guide.md
rows read: 1, disagreements found: 139, written: 138, reported: 1
next: npm run format
```

The single reported line was the pitch, which the seed states is authored by hand. `npm run format`
followed, and oxfmt restored the column alignment on every rewritten table.

## Criterion 4 — the pairs and the unpaired fences

I read every candidate body for a run the emitted three-backtick fence cannot enclose before
titling. `replaceExample` refuses `example.code.includes('```')`, so the scan was for that
substring anywhere, not only at line start.

Paired, each `@example` titled with its fence heading's **flattened** text — a heading's code spans
drop in `extractFences`, so a tag written with backticks would not pair:

| Block | Title | `--to source` carried |
| --- | --- | --- |
| `createGuide` (`factories.ts`) | Construct a Guide from markdown text | the `guide.sections()` line the block lacked |
| `createSource` (`factories.ts`) | Construct a Source from an inline files record | the full inventory, `surface`, `methods`, and both `exists` lines |
| `createSourceManager` (`factories.ts`) | Resolve a fence's import specifier to the right Source | the two-specifier policy, the foreign-import line, the identity line, `sources()` |
| `GuideInterface.tagline` (`types.ts`) | Read a guide's tagline | the `# Widget` construction and the returned value |
| `extractSourceLines` (`helpers.ts`) | Project source into physical code lines | the import line and the per-record comment |

Unpaired, with the reason each stays outside EQ:

| Fence | Reason |
| --- | --- |
| The bijection assertion shape | composes `createGuide`, `createSource`, and `findMissingSymbols` — no single block owns it |
| Carry a summary across into the guide | composes `replaceCell` and `replaceSummary` |
| Resolve directory and file targets | composes `resolvePath` and `resolveLink` |
| List the fence languages a package allows | a four-backtick body carrying `` ``` ``; `replaceExample` refuses it |
| Compare a guide against the source it documents | **the deviation** — the body carries `*/`, which no doc block can enclose |
| the `Guide` / `Source` / `SourceManager` class blocks | each documents the constructor door beside the factory door |

Verified by driving `collectTitles` over the committed readers: five PAIRED, five unpaired, matching
this table.

## Criterion 5 — the blockquote, the pitch, and the folded sentences

The guide's H1 blockquote and the README's are now one text, written with the same line breaks and
carrying no link:

```text
> A pure, I/O-free guides-parity toolkit: the `Guide` and `Source` readers, the `findDrift`
> comparison, and the renderers and replacers that carry a change across.
```

Sentences changed in the guide's opening paragraph:

- **Added**, folding in the old blockquote's tail: "This package is published through
  `@orkestrel/guide` and its source is [`src/core`](../src/core)." It sits directly after "A guide
  is a contract, not prose.", so the source link stays in the first line a reader meets and the
  `links()` guard keeps a link in the opening.
- **Extended**, because the pitch now names `findDrift` and the paragraph did not: the bijection
  sentence gained "…, and `findDrift` reports where a `Summary` cell, a documented method, or a
  titled fence disagrees with the source it documents."

Sentences changed in `README.md`:

- **Dropped** from the opening paragraph, because the pitch carries the claim: "A guides-parity
  **test helper** for `@orkestrel` packages." and "…to be in **bijection** with the code it
  documents: every documented export exists in source and vice versa, every documented method
  matches the class, and every relative link resolves."
- **Kept**, as the onboarding the pitch does not carry: the devDependency, `tests/guides.test.ts`,
  the vitest `guides` project, the no-CLI statement, the `@orkestrel/markdown` line.
- **Added** to `## Checks`, because § Tests now states the suite wires SQ, MQ, and EQ and this list
  omitted them: a "Summary and example equality" bullet naming the three comparisons and
  `findDrift`. **Flagged claim** — the brief scopes `README.md` but names only the pitch, the
  opening paragraph, and `## API`.

`## API` is kept unchanged. `tests/guides.test.ts:55-86` (R2 correction: the unit's own insert moved the case; the brief cited `:50-81`) reads it and its case passes.

## Criterion 6 — § Tests

The paragraph now states the suite wires RN, SB, MB, LI, TE, NV, FL, EX, FI, SQ, MQ, and EQ, that
every `## Surface` and `## Methods` table heads its compared column `Summary`, and that `Kind`,
`Shape`, `Signature`, `Value`, and `Returns` are the data columns beside it and stay unread. It
adds which fences EQ compares and why the rest stay outside it, and names the pin beside the
equality case. No sentence anywhere still says the guide lacks the column or that the suite skips
the three checks (`grep` for `later change`, `until then`, `does not wire`, `would report every row`
returns nothing).

## Criterion 7 — `npm run build && npm run docs`

```text
$ npm run build && npm run docs
> @orkestrel/guide@0.0.18 docs
> node --experimental-strip-types scripts/docs.ts

rows read: 1, disagreements found: 0
EXIT 0
```

Three lines total: the two npm banner lines and the closing summary. No drift line and no pitch
line, which is the reading D6 recorded for scaffold at the same point.

Both directions are fixed points on a converged tree:

```text
$ npm run docs -- --to guide    rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source   rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 8 — gates

```text
npm run format:check    EXIT 0    All matched files use the correct format. (81 files)
npm run lint:check      EXIT 0
npm run check           EXIT 0
npm run build           EXIT 0
npm run test:src:core   EXIT 0    Test Files 8 passed (8);  Tests 598 passed (598)
npm run test:guides     EXIT 0    Test Files 1 passed (1);  Tests 54 passed (54)
```

The three red-first cases are the three that turned green: 51 → 54 passing in the `guides` project,
`3 failed | 51 passed` → `54 passed`.

No test outside `tests/guides.test.ts` went red. Run as observations, because the vendored prose
sweep reads every authored Markdown file I edited:

```text
npm run test:policy     EXIT 0    Tests 90 passed | 1 skipped (91)
npm run test:setup      EXIT 0    Tests 7 passed (7)
npm run test:config     EXIT 0    Tests 172 passed | 1 skipped (173)
```

## Criterion 9 — status

```text
$ git status --short
 M README.md
 M guides/guide.md
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/sources/Source.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

Owned files only. Nothing off-limits was touched; no commit, no install, no discard-class git
command.

```text
$ git diff --stat
 README.md                  |  19 ++-
 guides/guide.md            | 354 +++++++++++++++++++++++----------------------
 src/core/constants.ts      |   8 +-
 src/core/factories.ts      |  32 +++-
 src/core/helpers.ts        |  55 ++++---
 src/core/sources/Source.ts |   5 +-
 src/core/types.ts          |  45 ++++--
 tests/guides.test.ts       |  64 ++++++++
 8 files changed, 354 insertions(+), 228 deletions(-)
```

## The gate cases, in this file's house form

- **Equality**, inside the manifest loop's `describe(entry.concept)` block: collects a `string[]`,
  one line per drift as `${entry.spec} ${drift.key}: guide ${left} source ${right}` with `absent`
  for an undefined side, and asserts `toEqual([])`.
- **The pin**, at file scope on `GUIDE_SPEC`: collects a `string[]` carrying
  `${GUIDE_SPEC} pairs: guide [...] source [...]` when no title pairs, and asserts `toEqual([])`.
  It reads the manifest row for `GUIDE_SPEC` through one added file-scope `own` binding rather than
  hard-coding the module.
- **The README**, at file scope: the two `not.toBeUndefined()` guards before `toBe`.

Each is named for what it proves, and each carries the comment stating why it exists.

## Claims I flag

1. **The `Source` class block was split into description and `@remarks`.** No criterion asked for
   it; I did it because the propagated cell was 1778 characters against 817 for the next longest.
   Every sentence survives in the block. Reversible by moving the `@remarks` body back and re-running
   the seed.
2. **The remaining long cells were left as the ruled direction produces them.** The widest are
   `extractExports` 817, `SourceInterface.exports` 743, `extractHidden` 719,
   `extractSourceComments` 684; 23 of 138 cells exceed 400 characters. `guides/guide.md` grew from
   97,073 to 151,166 bytes and its widest table row from 463 to 817 characters. I read every written
   cell and none is wrong — they are reference paragraphs sitting in a table. If the fleet wants a
   shorter compared unit, that is a change to what the description paragraph is, across every
   package, not a repair to this guide.
3. **`manifestEntryShape`'s `Shape` cell is authored, not moved.** Its old `Builds` cell carried no
   structural literal, so I wrote `{ concept: string, spec: string, source: GuideModule, tests: string }`
   from `src/core/shapers.ts`'s own `objectShape` fields. Every other Shapers row's literal moved
   sideways unchanged.
4. **The README's `## Checks` list gained a row.** Outside the sentences the brief names, and added
   because § Tests now claims the suite wires SQ, MQ, and EQ while that list named neither.
5. **The `@example` titles are the headings' flattened text, not their verbatim source.** The brief
   says "verbatim"; `extractFences` flattens a heading's code spans, so a tag carrying backticks
   would not pair. The titles read `Construct a Guide from markdown text`, not
   ``Construct a `Guide` from markdown text``.
6. **`replaceExample` needs a `*/` guard.** It refuses a body carrying `` ``` `` and accepts one
   carrying `*/`, and the second produces a source file that does not parse. Outside this unit's
   owned files; it belongs to the readers-and-replacers surface U1 owns.
7. **The `SourceInterface.examples` cell is the first overload's paragraph**, as ruled. The second
   overload's "follows no `extends` clause" fact therefore does not reach the cell; it survives in
   § The extraction model, which states the asymmetry.
8. **Three cells lost an orientation clause the block does not carry**, and I judged each not worth
   putting into a doc block: `escapeRegExp`'s two call sites, `SourceInterface.exists`'s "which is
   what lets a guide link to a directory resolve", and `SourceInterface`'s list of its six
   projections. The first two are caller facts that drift when a caller changes; the third is the
   `## Methods` table sitting directly beneath the row.

## R2 corrections (the Orchestrator)

The lanes read counts in this report's prose — the paired and unpaired tallies, the line tallies in the `docs` reading, the red-first tally, the cell-width tally, and the projection tally. Each is struck, not corrected: the members are named in the tables and readings beside them, and a size (a character width, a byte count) is a value and stays.
