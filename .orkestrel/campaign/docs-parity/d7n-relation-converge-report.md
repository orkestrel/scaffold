# Report — `d7n-relation-converge`

Wall clock: 2026-09-07T21:18:58Z to 2026-09-07T21:34:22Z (15 minutes 24 seconds), first command to last.

Baseline `bcf2e7d`, checkout `/home/user/fleet/relation`. No reader or seed defect met; every `docs` and `findDrift` reading matched what the brief described.

## Criterion 1 — red-first on the unconverged tree

Command: `npm run test:guides`. Reading: `Test Files 1 failed (1)`, `Tests 3 failed | 29 passed (32)`, exit 1. The three added cases were the three failures. First lines verbatim:

`pairs at least one example title across the guide and the source`:

```
AssertionError: expected [ Array(1) ] to deeply equal []
+   "guides/relation.md pairs: guide [\"Surface\",\"Defining relations\",\"Defining relations\",\"Resolving relations directly\",\"Resolving relations directly\",\"Resolving relations directly\",\"The registry surface\",\"Loading\",\"Typed table access\",\"Through management\",\"Through management\",\"Observing\",\"Observing\"] source []",
```

`opens the README with the guide tagline`:

```
AssertionError: expected undefined not to be undefined
 ❯ tests/guides.test.ts:118:20
    118|  expect(pitch).not.toBeUndefined()
```

`Relation > keeps every compared summary and example equal to its source`:

```
AssertionError: expected [ …(46) ] to deeply equal []
+   "guides/relation.md function createRelationManager: guide \"Create a `RelationManagerInterface` over a database and its relation map.\" source \"Creates a relation manager over a database and its relation definitions.\"",
+   "guides/relation.md class RelationManager: guide \"The relation registry — resolves relations once, vends a model per table.\" source \"Resolves a `RelationsShape` once at construction and vends a typed `ModelInterface` per declared table.\"",
+   "guides/relation.md class Model: guide \"A typed table paired with relation-aware `load` / `find` and junction methods.\" source \"Pairs a typed table with relation-aware loading.\"",
+   "guides/relation.md function belongsTo: guide absent source \"Builds a `belongs` relation — a foreign key on THIS table points at the related row.\"",
```

The equality case collects 46 lines where `npm run docs` prints 47: the seed adds the `pitch` row, which the README case owns in the suite.

## Criterion 2 — headers and class rows

Every `## Surface` and `## Methods` header row, read after the convergence (`guides/relation.md` lines 40, 48, 58, 66, 75, 84, 116, 128):

```
| API | Kind | Summary |
| API | Kind | Summary |
| API | Kind | Summary |
| API | Kind | Summary |
| API | Kind | Summary |
| Type | Kind | Shape | Summary |
| Method | Returns | Summary |
| Method | Returns | Summary |
```

Renames applied: `### Builders`'s `Builds a relation where…` → `Summary`; `#### ModelInterface`'s and `#### RelationManagerInterface`'s `Behavior` → `Summary`; `### Types` gained `Summary` as its last column with `Shape` kept between `Kind` and `Summary`. The first column's header text (`API`, `Type`, `Method`) is untouched, per Ruling 10.

`### Classes`: none owed. `grep -n '^### Entities\|^### `' guides/relation.md` returns nothing, so this guide carries no `### Entities` table and documents no class under its own H3. `RelationManager` and `Model` carry rows in `### Factory & manager` beside a `function` row, and `RelationError` in `### Errors` beside a `function` row — both mixed tables, which Ruling 5 and Ruling 16 leave at their headings.

The `Shape` convention sentence sits above the `### Types` table in Ruling 15's fleet-wide wording:

```
A `Shape` cell holds an interface's data members as bare names in braces, `?` marking an optional member and `plus` introducing its call-signature members, and a type alias's own type literal with a union's arms escaped as `\|`.
```

## Criterion 3 — doc blocks rewritten, then propagated

Order run: doc blocks first, then `npm run docs -- --to guide` (`rows read: 1, disagreements found: 47, written: 46, reported: 1`), then `npx oxfmt --write guides/relation.md`, then `npm run docs` (`rows read: 1, disagreements found: 1` — the titled example alone).

Blocks rewritten by hand, each because the guide's cell carried information the block lacked or because the block's prose carried an all-caps emphasis that would have landed in a cell:

- `src/core/factories.ts` `createRelationManager` — now names the contract it returns: `Creates a {@link RelationManagerInterface} over a database and its relation map.`
- `src/core/Model.ts` `Model` — gained the junction half the cell carried: `Pairs a typed table with relation-aware `load` / `find` and junction management.` Its second `@remarks` bullet lost the `AFTER` emphasis and was rewrapped to the block's width.
- `src/core/helpers.ts` `readColumn` — gained `whatever its declared type`.
- `src/core/helpers.ts` `belongsTo`, `hasMany`, `hasMorph` — gained the `(single)` / `(array)` fact the cells carried, replaced `FK` with `foreign key` for one term throughout, and replaced `THIS` / `RELATED` with `the owning table` / `the related table`. Each grew a line, so each was rewrapped.
- `src/core/errors.ts` `RelationError` — gained the code the cell carried: `Represents an error thrown by the relations layer, carrying a machine-readable {@link RelationErrorCode}.`
- `src/core/types.ts` `ResolvedBelongs`, `ResolvedMany` — `THIS` / `RELATED` replaced, and rewrapped.
- `src/core/types.ts` — `ModelInterface.load` / `find` / `link` / `unlink` / `links` and `RelationManagerInterface.model` / `names` / `has` gained doc blocks. Both sides of every `## Methods` row read `absent` on the baseline; the interface members carried no block at all. `load`'s block sits on the first overload, which is the one `extractMemberMethods` keys, and its description states both forms because the pair is one member to the reader. `unlink`'s description was corrected against the code before propagation: the cell read `Remove matching junction rows atomically`, and the block now states the mechanism the code uses — `Removes every matching junction row for a `through` relation inside one transaction.`

Rows whose literal stayed in `Shape`, rewritten to the Ruling 12 idiom rather than moved: `Relationship`, `Relation`, `RelationMap`, `RelationsShape`, `ResolvedRelation`, `ResolvedBelongs`, `ResolvedMany`, `ResolvedOne`, `ResolvedThrough`, `ResolvedMorph`, `RelationErrorCode`, `Loaded`, `LoadedMap`, `RelationContext`, `FindOptions`, `RelationManagerOptions`, `RelationDescriptor`, `Include`, `ModelEventMap`, `ModelInterface`, `RelationManagerInterface`.

Baseline cell comparison (`tmp/d7n-relation-converge/compare-cells.py` against `git show HEAD:guides/relation.md`):

```
baseline rows: 62 new rows: 62
rows lost: []
rows gained: []
non-summary changes: 26
```

All 26 are accounted for: 21 are the `### Types` `Shape` cells the brief names, and 5 are the `## Patterns` foreign-key-location table's `FK location` cells, where the all-caps sweep replaced `THIS table` / `RELATED table` / `junction table` with `the owning table` / `the related table` / `the junction table`. No `Kind`, `Returns`, `Builder`, `Event map`, or first-column cell moved.

Facts that left a `Shape` cell each already had a home in the guide, so nothing landed as new prose beside a table: `ModelEventMap`'s payload signatures are the `### Observing` event-vocabulary table; `ResolvedRelation`'s discrimination and its arms' required members are `## Contract` item 4 and the `### Resolving relations directly` prose; `RelationError`'s code enumeration is `RelationErrorCode`'s own `Shape` cell; `Loaded`'s spelled record is `LoadedMap`'s own `Shape` cell.

## Criterion 4 — the titled pair

Pair: the `@example` block of `createRelationManager` in `src/core/factories.ts`, titled `Defining relations`, against the first fence under `### Defining relations` in `guides/relation.md`.

The block is named by its content — the block whose example constructs a manager from builder descriptors, on the package's only exported factory (`grep -rn 'export function create' src` returns `src/core/factories.ts` alone).

Heading uniqueness, heading-scoped: `grep -n '^#\+ Defining relations' guides/relation.md` → `151:### Defining relations`, one hit. Fence body read before titling: no three-backtick run inside it and no `*/`.

Ruling 14 extension: the fence demonstrated the five builders the block lacked, and the block demonstrated the `model(...).load(...)` line the fence lacked, so the fence gained that line and nothing was deleted from either side. `--to source` then carried the whole fence body into the block: `rows read: 1, disagreements found: 1, written: 1, reported: 0`.

Both `--to guide` and `--to source` re-run at `written: 0` afterwards.

## Criterion 5 — the tagline, the opening prose, and the pitch

The H1 blockquote is one noun phrase in plain text and code spans, with no link and no bold, and `README.md` carries the same four lines with the same breaks:

```
> A small, declarative ORM layer over the `@orkestrel/database` tables: a table's
> relations named once, then `load` / `find` records with their related rows already
> attached, batched so a direct relation costs one query across the whole record set and
> a `through` relation two.
```

The guide gained an opening paragraph after the blockquote, carrying every displaced sentence and restating none of the tagline's clauses: the relationship list and the foreign-key shapes, the nested includes, `link` / `unlink` / `links`, the thin-above-the-typed-store stance, define-time resolution, the deliberately loose relation properties and the typed half reached through `model.table`, the excluded write-cascades and lazy proxies and query builder, and the `src/core` source and `@src/core` barrel lines.

The README's opening paragraph keeps the onboarding it alone carries and drops the clauses the blockquote now states: it names the `belongsTo`, `hasMany`, `hasOne`, `hasThrough`, and `hasMorph` builders, `model(name)`, and `model.table`, then keeps `Environment-agnostic — no I/O, no browser or server assumptions. Part of the `@orkestrel` line.` The `[`@orkestrel/database`](https://github.com/orkestrel/database)` link that opened the old paragraph is gone from the pitch, which the tagline rule forbids a link in; `guides/database.md` is still reached from `## See also`.

## Criterion 6 — the seed

```
$ npm run docs                        exit 0: rows read: 1, disagreements found: 0
$ npm run docs -- --to guide          exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
$ npm run docs -- --to source         exit 0: rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Criterion 7 — gates, scoped to the owned paths

```
$ npx oxfmt --check guides/relation.md README.md src/core/{types,factories,helpers,errors,Model}.ts tests/guides.test.ts
  All matched files use the correct format.   exit 0
$ npx oxlint --config .oxlintrc.json --deny-warnings src/core/{types,factories,helpers,errors,Model}.ts tests/guides.test.ts
  no output                                   exit 0
$ npm run check                               exit 0 (tsc --noEmit on the core project)
$ npm run test:guides                         Test Files 1 passed (1), Tests 32 passed (32), exit 0
$ npm run test:policy                         Test Files 1 passed (1), Tests 90 passed | 1 skipped (91), exit 0
```

Observation, the package's narrowest unit script: `npm run test:src:core` — `Test Files 5 passed (5)`, `Tests 65 passed (65)`, exit 0, duration 573 ms under the sibling load.

## Criterion 8 — status

```
$ git status --short
 M README.md
 M guides/relation.md
 M src/core/Model.ts
 M src/core/errors.ts
 M src/core/factories.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/guides.test.ts
```

Owned files only. Diffstat: `8 files changed, 287 insertions(+), 113 deletions(-)`. The instruments sit in `tmp/d7n-relation-converge/`, which `.gitignore` covers.

## The gate cases and the drop-in's canonical text

`diff` of the pilot's `tests/guides.test.ts` lines 26 to 323 against this file's lines 37 to 334 reports two hunks, `GUIDE_SPEC` and `MODULES`, both inside the constants block. The header line reads Ruling 13's amendment, `The constants that follow are this package's own`, where the pilot still reads `below`; the `INTERNAL` block reads `the assertion that follows it`; the equality case sits directly after the methods loop and before the examples case, which is named `documents an example for every Surface function`. `findDrift` is imported beside the existing readers, `README.md` was added to `ROOT_FILES`, and `GUIDE_SPEC` is the spec path at every site that reads it — the pin and the README case. The pin is the guard-and-continue loop with no local type predicate and the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case guards each side with `not.toBeUndefined()` before `toBe`.

The `executable guide fences` block at the file's end is this package's own executed half, the counterpart of the pilot's `flagship fences` block, and stays outside the shared text unchanged.

## Ancillary decisions recorded

- **Which fence carries the title.** `### Defining relations` over the `## Surface` quick-start fence. `### Defining relations` is already worded as a demonstration, so no Ruling 9 heading is inserted and no fence moves; the Surface route would have put a new `###` heading between the intro sentence and the fence it introduces.
- **`Include`'s `Shape` cell.** `{ [relation] }` — the index parameter's name as the bare member name. Ruling 12 bans spelling the member's type, and an index signature has no other name to give.
- **`FindOptions`'s `Shape` cell keeps `signal?`.** `FindOptions extends OperationOptions`, and database's converged guide lists an inherited member the same way (`DriverInterface` spells `StorageInterface`'s members).
- **`load`'s doc block sits on the first overload only.** `extractMemberMethods` keys the first occurrence per member name, and one description covering both forms is what the guide's row must carry.
- **The all-caps sweep is bounded to prose this unit owns.** Every all-caps emphasis in `guides/relation.md` and `README.md` was corrected (`DOC ↔ SOURCE`, `OWN`, `NOT`, `AFTER`, `ONCE`, `COUNT`, `NEVER`, `AND`, `STILL`, `THIS`, `RELATED`), and so was every one in a doc block this unit rewrote. A doc block left otherwise untouched keeps its own `@remarks` prose, so `ModelEventMap`'s remarks still carry `NAME`, `COUNT`, and `AFTER`; those sentences are not compared and rewriting them would have added diff the audit must re-read for no gate.
- **No red-first control was planted for lint.** The Orchestrator takes that reading after this unit exits. The only red-first plant was the gate cases themselves, which stay.

## Deviation state

None. No stop condition fired: every cell the seed had to locate was located, the titled body fits the block, no test outside `tests/guides.test.ts` moved, no vendored file needed an edit, every reader returned the shape the brief described, and no residual disagreement remained under the P16 comparator.
