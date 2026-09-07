# Report — P.2 `d7n-contract-converge`

`guides/contract.md` passes the equality gate. `npm run docs` exits 0 at `rows read: 1, disagreements found: 0`, both write directions are fixed points, and `npm run test:guides` reports `Tests 68 passed (68)`. Wall clock from first command to last: 15:25:02Z to 15:56:29Z on 2026-09-07 (31 min 27 s).

Both mid-campaign corrections applied. `--to source` ran only after the summaries reached zero disagreements, and it wrote the titled example alone (`written: 1`). Every hand rebuild of a table row split on `(?<!\\)\|`, and every non-`Summary` cell was compared against `git show HEAD:guides/contract.md` after each rebuild.

## Criterion 1 — red-first, recorded on the unconverged tree

`npm run test:guides` on `b8f5839` with the three cases added and nothing else changed:

```text
 FAIL  |guides| tests/guides.test.ts > pairs at least one example title across the guide and the source
AssertionError: expected [ Array(1) ] to deeply equal []
 FAIL  |guides| tests/guides.test.ts > opens the README with the guide tagline
AssertionError: expected undefined not to be undefined
 FAIL  |guides| tests/guides.test.ts > Contract > keeps every compared summary and example equal to its source
AssertionError: expected [ …(321) ] to deeply equal []
 Test Files  1 failed (1)
      Tests  3 failed | 65 passed (68)
```

The pin's both-sides line, verbatim:

```text
guides/contract.md pairs: guide ["Surface","ContractError","Cloners","Cloners","Shape builders","Compilers","Compilers","Inferers","Domains","Domains","ShapeClonerInterface","Capturing synchronous outcomes losslessly","Narrowing unknown","Composing with recordOf / arrayOf / unionOf","Accepting foreign interface implementations with objectOf","Recursive guards with lazyOf","Guards narrow, parsers coerce","Parsing JSON safely","Checking structural JSON safely","Declaring a shape","Validating a live shape source","Compiling a contract","Compiling a contract","Compiling a contract","Compiling a contract","From an existing API/DB to an MCP tool","From an existing API/DB to an MCP tool"] source []
```

The equality worklist's opening lines, verbatim (the same lines `npm run docs` printed on that tree):

```text
guides/contract.md function isNull: guide absent source "Determines whether a value is `null`."
guides/contract.md function isUndefined: guide absent source "Determines whether a value is `undefined`."
```

The README case reported `expected undefined not to be undefined`: `README.md` carried no blockquote under its H1 at all, so `tagline()` returned `undefined` for the pitch side.

After convergence, the same command: `Test Files 1 passed (1)`, `Tests 68 passed (68)`.

## Criterion 2 — headers and class rows

Every `## Surface` and `## Methods` table now heads `Summary` beside only `Kind`, `Shape`, `Value`, or `Returns`:

| Old header                              | New header                        | Sections                                                                                                       |
| --------------------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Guard \| Kind \| Narrows to \| Behavior` | `Guard \| Kind \| Shape \| Summary` | Primitive & null-ish, Structural & collection, Array & typed-array, Emptiness, Function & constructor guards |
| `Combinator \| Kind \| Builds a guard that…` | `Combinator \| Kind \| Summary` | Combinators                                                                                                    |
| `Bound \| Kind \| Value`                  | `Bound \| Kind \| Value \| Summary` | The combinators' one bound                                                                                     |
| `Parser \| Kind \| Returns`               | `Parser \| Kind \| Summary`        | Parsers                                                                                                        |
| `Constant \| Kind \| Behavior`            | `Constant \| Kind \| Summary`      | Helper                                                                                                         |
| `Helper \| Kind \| Behavior`              | `Helper \| Kind \| Summary`        | Helper                                                                                                         |
| `Type \| Kind \| Shape`                   | `Type \| Kind \| Shape \| Summary`  | Types, Shape types                                                                                             |
| `API \| Kind \| Behavior`                 | `API \| Kind \| Summary`           | `ContractError`, Cloners (each table)                                                                          |
| `Builder \| Kind \| Builds`               | `Builder \| Kind \| Summary`       | Shape builders                                                                                                 |
| `Method \| Returns \| Behavior`           | `Method \| Returns \| Summary`     | Every `## Methods` table                                                                                       |

`Narrows to` became `Shape` because the cell holds the type the guard narrows to, and `Shape` is the fleet's column name for a type literal. `Returns` on the Parsers table became `Summary` because that column was the description column under another name; `Returns` on the Methods tables holds a return type and stays.

`### Classes` is new, placed before `### \`ContractError\`` the way `guides/guide.md:202-213` places its own. `ContractError` is the only class documented under its own H3, and it now carries a row there; it had no `Summary` cell of any kind before, so its drift (`class ContractError: guide absent`) could not have closed without one. The Cloners and Compilers tables are mixed class-and-interface tables and keep their headings.

## Criterion 3 — `Shape` and `Value` cells, and the blocks rewritten by hand

The literal stayed in `Shape` and the clause after the em dash moved to the doc block for: `Failure`, `EntryCollectorFunction`, `FieldPath`, `Guard`, `GuardsShape`, `Parser`, `LiteralValue`, `Result`, `Success`, `AnyConstructor`, `AnyFunction`, `AnyAsyncFunction`, `ZeroArgFunction`, `ZeroArgAsyncFunction`, `StringShape`, `NumberShape`, `BooleanShape`, `NullShape`, `LiteralShape`, `ArrayShape`, `UnionShape`, `OptionalShape`, `NullableShape`, `JSONShape`, `RawShape`. The `Value` cell of `GUARD_DEPTH_LIMIT` kept `` `512` `` on the same terms.

The cell carried no literal, so one was written from the declaration in `src/core/types.ts` (interface members in braces, a type alias's value): `ArrayRead`, `GuardShapeRead`, `BoundsRead`, `StringGuardOptions`, `ReadValueOptions`, `ContainOptions`, `ShapeProperty`, `GuardType`, `FromGuards`, `OptionalFromGuards`, `TupleFromGuards`, `UnionToIntersection`, `IntersectionFromGuards`, `ContractShape`, `ObjectShape`, `InferMutable`, `InferUnion`, `StringShapeOptions`, `NumberShapeOptions`, `BooleanShapeOptions`, `NullShapeOptions`, `JSONShapeOptions`, `LiteralShapeOptions`, `ArrayShapeOptions`, `ObjectShapeOptions`, `RecordShapeOptions`.

`Infer`, `InferObject`, `InferIndex`, and `InferOpenIndex` carry an empty `Shape` cell: each resolves through a multi-branch conditional with no compact literal, and inventing an abbreviated one would have been a claim the source does not make. The convention sentence under `### Shape types` states that rule, so the empty cell reads as the convention rather than as an omission.

Convention sentences added, one per idiom, worded against the rows that remain: "In a guard table a `Shape` cell holds the type the guard narrows to." before the guard tables; "A `Shape` cell holds an interface's members in braces, and a type alias's value." before `### Types`; the same plus the resolver clause before `### Shape types`; and "its `Value` cell holds the constant's own literal" on the sentence introducing the bound table.

Blocks whose description paragraph was rewritten by hand, because the cell carried the constant's value and the description did not:

- `src/core/constants.ts` — `FAULT_LIMIT`, `PREVIEW_LIMIT`, `COMPILE_DEPTH_LIMIT`, `COMPILE_NODE_LIMIT`, `PRESENCE_MASK_LIMIT`, `CLONE_NODE_LIMIT`, `GENERATION_ATTEMPT_LIMIT`, `INFER_DEPTH_LIMIT`, `INFER_BREADTH_LIMIT`, `INFER_ENUM_LIMIT`, `FORMAT_MAX_LENGTH`. Each reads "Caps … at `N`, frozen." so the guide keeps the value the cell used to carry. `GUARD_DEPTH_LIMIT` needed no rewrite: its table has a `Value` column.
- `src/core/errors.ts` — `ContractError`'s description was a four-sentence paragraph; the summary sentence stayed and the `cause` own-property sentences moved to `@remarks`, per ruling 7.

Blocks that gained or extended `@remarks` because the cell carried information the block lacked:

- `src/core/validators.ts` — `isRegExp` (the internal-slot brand, cross-realm acceptance, forgery refusal), `isArray` (no element is inspected).
- `src/core/combinators.ts` — `instanceOf` (a callable instance passes), `enumOf`, `pickOf`, `omitOf` (argument-named read refusals), `orOf`, `notOf`, `complementOf`, `unionOf`, `intersectionOf` (per-member containment, and the zero-guard identity of each).
- `src/core/parsers.ts` — `parseRecord` (the own-enumerable probe and its coded refusal).
- `src/core/shapers.ts` — `numberShape` (the finite-bound rule and why), `jsonShape` (inference never produces it).
- `src/core/helpers.ts` — `holds`, `drawRandom`, `matchesMember`, `admitMember`, `admitVisited`, `omitVisited`, `readPatternFlags`.
- `src/core/types.ts` — `ContractCode` (the category vocabulary and each gloss), `ContractErrorContext`, `ContractErrorOptions`, `RandomFunction`, `ExtraFault`, `FaultKind`, `FaultConstraint`, `LiteralValue`, `ArrayRead`, `GuardShapeRead`, `BoundsRead`, `EntryCollectorFunction`, `FieldPath`, `ObjectShape`, `ShapeValidatorInterface`, `ContractCompilerInterface`, and the `clone` members of `JSONClonerInterface`, `SchemaClonerInterface`, and `ShapeClonerInterface`, and `ShapeValidatorInterface.validate`.

Blocks created where none existed: `ContractInterface.parse` and `ContractInterface.generate` in `src/core/types.ts`. Both reported `guide "…" source absent` — the interface's other call-signature members carry doc blocks and these two did not.

Two facts had no doc-block home that the guide could reach, because they describe readonly data properties rather than call-signature members, so they went into `@remarks` **and** into guide prose beside their table: `ShapeValidatorInterface.expansion` (under `#### \`ShapeValidatorInterface\``) and `ContractCompilerInterface`'s seven readonly properties with the `contract.is` IS `compiler.guard` identity (under `### Compilers`). Without the prose, converging the Surface cell would have deleted both from the guide.

`npm run docs -- --to guide` then wrote every located cell: `rows read: 1, disagreements found: 321, written: 321, reported: 0`, followed by `npx oxfmt --write guides/contract.md README.md`.

## Criterion 4 — the titled pair

The pair is `createContract`'s `@example` block in `src/core/factories.ts` and the first fence under `### Compiling a contract`. `createContract` is the first `create*` the facts block lists and the only exported factory, and that heading's first fence is the one that demonstrates it.

Checks run before titling, in order:

```text
$ grep -n '^#\+ Compiling a contract' guides/contract.md
973:### Compiling a contract
```

The fence body was read for a three-backtick run and for the doc-comment terminator `*/`; it carries neither, so it was not disqualified and no next fence was needed. Titling the block first produced the pair's only disagreement:

```text
guides/contract.md Compiling a contract: guide "ts\nimport {\n\tcreateContract,\n…
rows read: 1, disagreements found: 1
```

`npm run docs -- --to source` then carried the body in: `rows read: 1, disagreements found: 1, written: 1, reported: 0`. Every other `@example` stays untitled.

## Criterion 5 — the tagline, the pitch, and the displaced sentences

The H1 blockquote is now one noun phrase in plain text and code spans, with no link and no bold, and `README.md` carries the same text with the same line breaks under its own H1:

```text
> The zero-dependency contract toolkit — runtime type guards, guard combinators,
> coerce-and-extract parsers, and a shape DSL that compiles one declaration into a JSON
> Schema, a guard, a parser, a strict audit, a parse report, and a generator, every one of
> them derived from a single owned snapshot of that declaration.
```

The old tagline's displaced sentences — `Source: [\`src/core\`](../src/core). Surfaced through the \`@src/core\` barrel.` — fold into the last sentence of the guide's opening paragraph as "Its source is [`src/core`](../src/core), surfaced through the `@src/core` barrel." The link moved out of the blockquote and still resolves, so the `resolves every relative link` case stays green.

The README's opening paragraph is now onboarding it alone carries and restates none of the tagline's clauses: declare a shape with the builders, compile with `createContract`, take the member each call site needs (`is`, `parse`, `audit`, `explain`, `schema`, `generate`), take a bare guard or parser where a whole declaration is more than the job needs, and the `@orkestrel`-line sentence.

## § Tests

`## Tests` gained a `tests/guides.test.ts` row naming the checks descriptively, with no SQ/MQ/EQ/RQ identifier: the `## Surface` ↔ `src/core` bijection, the `## Methods` ↔ implementing-class bijection read from the real prototypes, and the equality gate — every `Summary` cell against its declaration's description paragraph, the titled `Compiling a contract` fence against the `@example` block of that title, and the README pitch against the guide's tagline — plus the flagship fences it executes.

## Criterion 6 — the seed

```text
$ npm run docs
rows read: 1, disagreements found: 0                                    (exit 0)
$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — gates

```text
$ npx oxfmt --config .oxfmtrc.json --check <owned paths>
All matched files use the correct format.                               (exit 0)
$ npx oxlint --config .oxlintrc.json --deny-warnings <owned source and test paths>
                                                                        (exit 0)
$ npm run check                                                          (exit 0)
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  68 passed (68)
$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
$ npm run test:src:core            (observation)
 Test Files  19 passed (19)
      Tests  1350 passed (1350)
```

## Criterion 8 — scope

`git status --short` lists owned files only:

```text
 M README.md
 M guides/contract.md
 M src/core/combinators.ts
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

Every `src/**` edit is inside a doc block. No code token moved; `npm run check` and the 1350-test core suite are the evidence.

## Diffstat

```text
 README.md               |  14 +-
 guides/contract.md      | 791 +++++++++++++++++++++++++-----------------------
 src/core/combinators.ts |  39 +++
 src/core/constants.ts   |  27 +-
 src/core/errors.ts      |  13 +-
 src/core/factories.ts   |  22 +-
 src/core/helpers.ts     |  37 +++
 src/core/parsers.ts     |   6 +
 src/core/shapers.ts     |   8 +
 src/core/types.ts       | 163 +++++++++-
 src/core/validators.ts  |   9 +
 tests/guides.test.ts    |  80 ++++-
 12 files changed, 793 insertions(+), 416 deletions(-)
```

## The non-`Summary` cell comparison the correction requires

`/home/user/fleet/contract/tmp/cellcmp.py` parses both `git show HEAD:guides/contract.md` and the working copy, splits every row on `(?<!\\)\|`, keys each table by its first-column row names, and reports every non-`Summary` cell that moved. Its final reading names exactly the `Shape` and `Value` cells listed under criterion 3 and nothing else, plus the one table the baseline does not have:

```text
tables in new not in baseline: [(['API', 'Kind', 'Summary'], ['`ContractError`'])]
non-Summary cell differences: 58
```

Two of those 58 rows are the comparator's own artifact rather than a change: the three single-row `clone` Methods tables share one row-name key, so the map keeps only the last and reports the other two `Returns` cells as moved. Read directly, all three are unchanged from the baseline:

```text
$ grep -n '^| `clone` ' guides/contract.md          |  $ git show HEAD:guides/contract.md | grep -n '^| `clone` '
706:| `clone` | `JSONValue` | …                       |  674:| `clone` | `JSONValue` | …
712:| `clone` | `JSONSchema` | …                      |  680:| `clone` | `JSONSchema` | …
718:| `clone` | `ContractShape` | …                   |  686:| `clone` | `ContractShape` | …
```

## Reader and seed findings

**`findDrift` costs 5.6 s on this guide, which exceeds Vitest's default per-case budget.** The equality case timed out at `Test timed out in 5000ms` with the tree already fully converged — a green subject reported as a red gate. Measured on an idle host with `tmp/timing.mjs`, outside Vitest:

```text
createGuide 65 ms
createSource 0 ms
findDrift 5622 ms 0
```

`createGuide` and `createSource` are cheap; the cost is `findDrift`'s one source lookup per compared row over every line the package declares. `vite.config.ts` is off-limits to this unit and the `guides` project sets no `testTimeout`, so the budget went on the case itself as `it(name, fn, 30_000)` with a comment naming the measurement and stating the cost is the reader's. **This is the fleet's finding, not this package's**: any package whose guide reaches this size meets the same wall, and the seed pays the same 5.6 s on every `npm run docs`.

**`replaceCell` does not need a row padded to the header width, checked rather than assumed.** Adding a `Summary` column to the `### Types` and `### Shape types` headers left every row one cell short, and `buildTable` maps over the row's existing cells, which reads as though a short row would splice back unchanged and `writeGuide` would count nothing and report nothing — a silent non-convergence. `tmp/probe-cell.mjs` put the smallest real input through the installed reader:

```text
row missing the Summary cell -> "| `walk` | function | Walks the tree. |"
row carrying an empty Summary cell -> "| `walk` | function | Walks the tree. |"
```

The parser pads the row before `replaceCell` sees it, so both forms write correctly and there is no defect. Recording it because the hypothesis was wrong and the next unit reading `buildTable` will form the same one. This unit added the empty cell per row anyway, which is what the formatter renders regardless.

No other reader or seed defect was met. Every `--to guide` and `--to source` line the seed printed was `wrote <file>`; neither direction reported a single unplaced key.

## Ancillary decisions recorded

- **`CORE_GUIDE` folded into `GUIDE_SPEC`.** `tests/guides.test.ts` already held `CORE_GUIDE = 'guides/contract.md'` for the runtime-parity and flagship-fence blocks. The brief names `GUIDE_SPEC` for the pin and the README case, and two constants for one path is a duplicate that drifts, so `GUIDE_SPEC` is declared once at the head beside the other per-package constants and the later uses read it.
- **The pin's inline form.** `fence.title !== undefined && titled.has(fence.title)` sits inline in a `filter` with no local predicate, as the brief fixes, and the failure line is the both-sides `${GUIDE_SPEC} pairs: guide [...] source [...]` the siblings use.
- **Guide-navigation pointers dropped with their cells.** Three cells ended in a pointer to prose that follows the same table — `isRecord`'s "See \"Recognizing a plain record\" after this table", `compileAuditor`'s and `compileReporter`'s "See \"How a union is audited and reported\" after this table", `buildStringFaults`'s "See \"Supplying a rebuilt pattern\" after this table", and `objectShape`'s "(see Domains, below)". Each names a heading that sits immediately after the table it pointed from, so the pointer restated the layout rather than carrying information, and none moved into a doc block.
- **`recordOf`'s "There is no `iterableOf`" sentence moved to guide prose,** not to a doc block: it is a statement about the combinator family rather than about `recordOf`, so it introduces the `### Combinators` table instead.
- **The `### Classes` table carries `ContractError` alone.** The other published classes — `JSONCloner`, `SchemaCloner`, `ShapeCloner`, `ShapeValidator`, `ContractCompiler` — already carry rows in mixed class-and-interface tables, which ruling 5 leaves where they are, and duplicating them would give `replaceCell` two rows per key.

## Deviation state

No deviation. Nothing in the deviation contract fired: every cell the seed had to locate was located, the titled body fits its block, no test outside `tests/guides.test.ts` went red, no vendored file needed an edit, every reader returned the shape the brief describes, and no residual disagreement survived a doc-block rewrite.

---

**Orchestrator annotation (audit, 2026-09-07):** the audit read counts in this report's prose (lines 5, 9, 73, 86, 178, 207) and a line (77) attributing the "no element is inspected" remark to `isArray` where the tree carries it on `isArrayBuffer` (`src/core/validators.ts:505-509`); the fix round moves it. The tree is authoritative; the report stands annotated.
