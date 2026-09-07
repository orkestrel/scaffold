# Unit report — D1 guide-readers, `@orkestrel/guide` at `/home/user/fleet/guide`

Done. Every acceptance criterion is green, on the owned files only. `implementer`, Opus 5, holding
the objective lane's unit with the substitution recorded.

## Types (`src/core/types.ts`)

- `SurfaceSymbol` gains `readonly summary?: string`, the compared description paragraph its side carries — `types.ts:16`.
- `MethodEntry { readonly name: string; readonly summary?: string }` is new — `types.ts:34`.
- `SourceExample { readonly name: string; readonly title?: string; readonly code: string; readonly language?: string }` is new — `types.ts:45`.
- `Drift { readonly key: string; readonly guide?: string; readonly source?: string }` is new — `types.ts:60`.
- `SourceComment { readonly text: string; readonly line: SourceLine }` is new: one eligible doc block's unwrapped body paired with the record it documents — `types.ts:100`.
- `MethodGroup.methods` becomes `readonly MethodEntry[]` — `types.ts:130`.
- `GuideFence` gains `readonly title?: string`, the flattened text of its nearest preceding heading — `types.ts:149`.
- `GuideInterface` gains `tagline(): string | undefined` — `types.ts:183`.
- `SourceInterface.methods(name)` returns `readonly MethodEntry[]` — `types.ts:317`.
- `SourceInterface.examples()` and `examples(name)` return `readonly SourceExample[]` — `types.ts:356`, `types.ts:380`.

## Functions and values

- `normalizeComment(comment)` unwraps one genuine JSDoc span — `helpers.ts:1462`.
- `normalizeSummary(text)` is the one compared form both sides pass through — `helpers.ts:1487`.
- `extractSourceComments(lines)` is the single doc-block walk; it generalizes the old `extractExampleLines` state machine — `helpers.ts:1514`.
- `extractExampleLines(lines)` is now that walk filtered to blocks carrying a block-position `@example` — `helpers.ts:1603`.
- `collectSummaries(lines)` maps each documented record to its description paragraph — `helpers.ts:1623`.
- `collectExamples(comment, name)` reads one block's `@example` entries with title, language, and body — `helpers.ts:1651`.
- `extractExamples(source)` and `extractExampleMethods(lines)` return `readonly SourceExample[]` — `helpers.ts:1693`, `helpers.ts:1728`.
- `extractMemberMethods(lines)` returns `readonly MethodEntry[]`, each with its member's paragraph — `helpers.ts:1234`.
- `extractExports(source)` and `extractHidden(source)` attach the declaration's paragraph — `helpers.ts:1022`, `helpers.ts:1068`.
- `extractCellText(cell)` flattens a table cell keeping code spans backticked — `helpers.ts:962`.
- `findColumnIndex(table, header)` replaces `findKindIndex`; it locates `Kind` and `Summary` with one implementation — `helpers.ts:988`.
- `extractSurface(document)` and `extractMethods(document)` read the `Summary` cell when the table has that column — `helpers.ts:1306`, `helpers.ts:1372`.
- `extractFences(document)` carries each fence's title from the same walk — `helpers.ts:1763`.
- `extractTagline(document)` reads the H1 blockquote — `helpers.ts:1797`.
- `computeDrift(key, guide, source)` is the per-pair comparison — `helpers.ts:1836`.
- `findDrift(guide, source)` returns every disagreement, Surface then Methods then examples — `helpers.ts:1871`.
- `collectTitled(guide, source)` keys the titled blocks the documented surface reaches — `helpers.ts:1923`.
- `KIND` and `SUMMARY` name the located header texts — `constants.ts:38`, `constants.ts:44`.
- `Guide` caches and returns the tagline — `Guide.ts:33`, `Guide.ts:47`, `Guide.ts:59`.
- `Source.methods(name)` returns entries and `Source.examples()` blocks; `#members` keeps the declaring member's own summary ahead of an inherited one — `Source.ts:97`, `Source.ts:117`.
- `surfaceSymbolShape` gains `summary`; `methodEntryShape`, `sourceExampleShape`, `driftShape` are new; `methodGroupShape` shapes entries — `shapers.ts:29`, `:48`, `:66`, `:86`, `:105`.
- `isSurfaceSymbol` gains the optional key; `isMethodEntry`, `isSourceExample`, `isDrift` are new; `isMethodGroup` reads entries — `validators.ts:48`, `:70`, `:91`, `:114`, `:136`.
- `createMethodEntryContract`, `createSourceExampleContract`, `createDriftContract` are new — `factories.ts:126`, `:145`, `:164`.

## The transform, as implemented

`normalizeSummary` (`helpers.ts:1487`) is the one compared form, and both sides end in it.

- Source side, before it: `normalizeComment` removes the `/**` opener, the closing marker, each line's continuation marker, and the block's leading indentation, and trims per-line trailing whitespace; a line's own indentation past the marker survives, so an `@example` fence body keeps its shape. `collectSummaries` then takes the text before the first block tag, where a block tag is a line whose first character is `@`.
- In `normalizeSummary`: `{@link X}` and `{@link A.b}` become `` `X` `` and `` `A.b` ``; `{@link X | text}` becomes `` `text` ``; every whitespace run, line break included, becomes one space; the ends trim.
- Guide side, before it: `extractCellText` walks the cell's inline nodes, emitting a code span as `` `value` `` and descending into emphasis, link, and image children, so `**emphasis**` and `_emphasis_` drop to their text and `[text](target)` drops to `text`. `\|` is already unescaped by the markdown parser, measured on the installed `@orkestrel/markdown` before the reader was written.
- Nothing else is transformed. An example's compared text is its language on the first line and its body beneath, which is how the fence language compares without a second key.

## The misses the text reader is allowed, against the control

The control (`tests/src/core/helpers.test.ts`, `describe('the doc-block reader against the parser')`)
reads the same source with `parseSync` from `vite`, attaches each block comment to the export it
precedes by range, and unwraps it with its own reading rather than the reader's. Over the four
shapes the brief names:

- **Overload set** — agree. Both attach the block to the first signature and let it answer for the name.
- **Doc block inside a template literal** — agree. The reader masks template payload; the parser sees a string token, not a comment. Neither reads the inner block, and both read the enclosing `export const`.
- **Re-export-only barrel** — agree. Neither reads a declaration from `export * from './x.js'`.
- **Doc block separated from its declaration by a blank line** — the one miss. The reader pairs a block with the next physical record, so the blank line takes it and the declaration gets nothing; the parser skips whitespace and attaches it. Asserted as a disagreement, in both directions, so the case fails if either side changes.

No other miss across those cases: the closing test compares the two readings key by key and asserts
the blank-line shape is the only source where they differ.

The control found a defect in itself on first run: an overload signature parses as
`TSDeclareFunction`, not `FunctionDeclaration`, so the control read nothing for the overload set
while the reader read the block correctly. The control was corrected to name that node type. Recorded
because it is the evidence that the comparison discriminates.

## How the tagline was read

From the document `Guide` already parses, with no second pass. `extractTagline` walks
`document.children` in order, arms on the level-1 heading, returns `undefined` at the next heading of
any level, and otherwise flattens the first blockquote's paragraphs through `extractCellText` and
`normalizeSummary`, so the tagline keeps its code spans. `Guide` computes it in the constructor
beside the other projections and caches it (`Guide.ts:47`).

## Criteria, in the brief's order

1. **Imports and declarations.** `grep -rn "from 'typescript'\|from 'vite'\|from \"vite\"" src` printed nothing (exit 1, no match). `grep -n "readonly summary?: string\|interface MethodEntry\|interface SourceExample\|interface Drift\|tagline(): string" src/core/types.ts` printed `27`, `34`, `38`, `45`, `60`, `183`. **Flagged:** the `readonly summary?: string` pattern matches twice — `SurfaceSymbol` (`:27`) and `MethodEntry` (`:38`) — because the brief's decision 5 gives that property to each. Every other pattern printed one line.
2. **Formatter, lint, typecheck.** `npx oxfmt --config .oxfmtrc.json --check src/core guides/guide.md tests/guides.test.ts tests/src/core` exit 0, `All matched files use the correct format.` (21 files). `npm run lint:check` exit 0, no diagnostic. `npm run check` exit 0 (root project and `configs/src/tsconfig.core.json`).
3. **`npm run test:src:core`** exit 0, `Test Files 8 passed (8)`, `Tests 463 passed (463)` — up from 378 at baseline. Present and green: `normalizeSummary` and `extractCellText` per transform clause; `normalizeComment`; `collectSummaries`; `collectExamples`; `extractSourceComments`; `describe('the Summary column')` with a reordered header and a table without the column; `describe('fence titles')`; `describe('extractTagline')`; `describe('findDrift')` with its controls; `describe('the doc-block reader against the parser')`.
4. **`npm run test:guides`** exit 0, `Test Files 1 passed (1)`, `Tests 46 passed (46)` — up from 42. The barrel-to-guide bijection runs in both directions, so every new name resolves in the guide's Types, Constants, Helpers, Shapers, Validators, Factories, and Methods tables, and no removed name survives.

## The instrument that had to fail

`findDrift`'s positive controls were run against a silenced `findDrift` (an early `return drifts`
planted in `src/core/helpers.ts`, the unit's own file, removed in the next command). Under that
mutation: `Tests 4 failed | 272 passed (276)`, the reds being `reports one drift per kind, naming
both sites`, `reports the guide side absent when the table carries no Summary column`, `reports the
source side absent when the declaration carries no doc block`, and `reports a fence whose language
the block does not share`. Restored, the same file reports `276 passed`.

The negative control is drawn from outside `findDrift`'s membership rule, which is "a pair both sides
carry": a guide row for `phantom` the barrel does not export, and a barrel export `strandWidget` the
guide does not document. The same test asserts `findMissingSymbols` reports both keys while
`findDrift` returns `[]`, so the run is not vacuous. A second case does the same for a member the
guide alone documents and for an example title the sides do not share.

Two more defects were caught by the existing suite before green, and are listed because they were
real: `@examples` and `@exampled` were read as an `@example` tag with a title (fixed with a lookahead
in `collectExamples`), and a minimal `/**/` span unwrapped to `/` (fixed in `normalizeComment`'s
wrapper pattern, with a case pinning it).

## Deviations, decisions, and flagged claims

- **Deviation state: none.** No decision under What is fixed needed a compiler or a parser in `src/**`, no criterion needed an off-limits file, and no gate failed.
- **Decision, mine to take under the deviation contract:** `findKindIndex` is replaced by `findColumnIndex(table, header)` rather than gaining a `findSummaryIndex` sibling. A copy of it with `'Summary'` substituted is the duplicate `.claude/rules/tests.md` and `.claude/rules/architecture.md` both refuse; one general locator serves `Kind` and `Summary`. `findKindIndex` has no TypeScript consumer anywhere in `/home/user/fleet` outside this checkout (`grep -rln 'findKindIndex' --include=*.ts` over the fleet returns only this package's `src`, `dist`, and its own test). Its guide row is renamed in the same change. Fleet packages carry the guide's guide as a vendored mirror, which refreshes from the published copy.
- **Decision:** `extractExampleLines` is kept and derived from `extractSourceComments` rather than removed. It has a distinct contract, a guide row, and consumers outside this package.
- **Decision:** an example's compared text is `` `${language}\n${code}` ``. The plan requires the language to compare, and a `Drift` carries one key with one text per side; a fenced rendering would collide with the `render*` family D2 owns.
- **Flagged claim:** the `parseSync` control's coverage is the four shapes the brief names, and nothing else. It says nothing about a doc block interrupted by a decorator, a block on a same-line export, or a namespace declaration.
- **Flagged claim:** `normalizeSummary`'s `{@link}` handling is regex-shaped. A nested brace inside a link label, and a `{@link}` split across a fence, are outside what it recognizes; no case in this package exercises either.
- **Not run, per the brief's permitted-command list:** `npm run test:policy`, `npm run test:config`, `npm run test:setup`, `npm run build`, and the full `npm test`. No source module was added or removed, so the mirror population is unchanged; the authoritative sweep belongs to `verifier`.

## Findings for the next change

1. **This checkout's own guide carries no `Summary` column, so SQ, MQ, and EQ cannot run here yet.** `guides/guide.md`'s Surface tables head their compared column `Shape` (`:32`), `Behavior` (`:60`), `Signature | Behavior` (`:78`, `:129`, `:167`), `Builds` (`:139`), and `Narrows to / Tests | Behavior` (`:153`); the Methods tables head theirs `Returns | Behavior` (`:225`, `:237`, `:269`). `findDrift` is therefore unit-tested against fixtures rather than wired into this package's `tests/guides.test.ts`: wiring it today would report every row of this guide as a guide-side absence. Renaming those columns to `Summary` and converting each cell to the declaration's description paragraph is a guide-convergence unit for this package, the same work D6 does for scaffold. It is out of this unit's enumerated scope, which fixes the readers and the comparison rather than this guide's column names.
2. **`README.md` (off-limits here) does not name the new projections.** Report-only patch, applied to the `## API` list:
   - replace `` cached view with the projections (`sections()`, `surface()`, `methods()`, `links()`, `tests()`, `fences()`). `` with `` cached view with the projections (`sections()`, `tagline()`, `surface()`, `methods()`, `links()`, `tests()`, `fences()`). ``
   - add after the `findMissingSymbols(symbols, source)` entry: `` - `findDrift(guide, source)` — every disagreement between a guide and the source it documents, naming both sites: Surface and Methods `Summary` cells against doc-block description paragraphs, and titled guide fences against `@example` blocks of the same title. ``
     The README currently states nothing false; both edits are additions.
3. **A test-infrastructure promotion, when a second suite needs it.** The parser control's two readers (`readParsedSummaries`, `readTextSummaries`) sit at module scope in `tests/src/core/helpers.test.ts` because `tests/setup.ts` is off-limits to this unit. `.claude/rules/tests.md` § Shared test infrastructure puts a reusable reader in a setup module; promote them when D2 or a fleet unit needs the same comparison.

## Tree state

`git status --short` (nothing outside the owned set; `tmp/` is ignored):

```text
 M guides/guide.md
 M src/core/Guide.ts
 M src/core/constants.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/shapers.ts
 M src/core/sources/Source.ts
 M src/core/types.ts
 M src/core/validators.ts
 M tests/guides.test.ts
 M tests/src/core/Guide.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/core/helpers.test.ts
 M tests/src/core/shapers.test.ts
 M tests/src/core/sources/Source.test.ts
 M tests/src/core/validators.test.ts
```

`git diff --stat`:

```text
 guides/guide.md                       | 175 ++++++--
 src/core/Guide.ts                     |   9 +-
 src/core/constants.ts                 |  11 +
 src/core/factories.ts                 |  71 ++-
 src/core/helpers.ts                   | 565 +++++++++++++++++++----
 src/core/shapers.ts                   |  71 ++-
 src/core/sources/Source.ts            |  88 ++--
 src/core/types.ts                     | 123 ++++-
 src/core/validators.ts                |  98 +++-
 tests/guides.test.ts                  |  76 +++-
 tests/src/core/Guide.test.ts          |  36 +-
 tests/src/core/factories.test.ts      |  50 ++-
 tests/src/core/helpers.test.ts        | 825 ++++++++++++++++++++++++++++++++--
 tests/src/core/shapers.test.ts        | 103 ++++-
 tests/src/core/sources/Source.test.ts |  96 ++--
 tests/src/core/validators.test.ts     |  77 +++-
 16 files changed, 2169 insertions(+), 305 deletions(-)
```

Nothing was committed, nothing was built, no dependency was installed, and no file outside the owned
set was written. D2's surface is untouched: no `render*`, no `replace*`, and no file I/O was added.
