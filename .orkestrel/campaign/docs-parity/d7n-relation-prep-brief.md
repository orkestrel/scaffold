# Brief — P.1 `d7n-relation-prep` (relation's prep: the tip's repair, the drop-in's adaptation, the voice sites, the bump)

## Role and engine

`builder` on Sonnet: a fully specified unit. Sole writer in `/home/user/fleet/relation` (branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `a5ee7cf`, clean). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command (`checkout`, `restore`, `stash`, `reset`, `clean`); undo an edit by editing. Read `/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/writing.md` (the substitution table), and `/home/user/scaffold/.claude/rules/tests.md` before editing.

## Objective

relation's checkout carries scaffold's vendored delta and the seed from the extracted tip, its drop-in suite compiles and passes against the `0.0.18` readers, every site the vendored voice rule reports and every hit the vendored prose sweep reports are fixed, and `version` is bumped, so the converge unit starts from a green baseline with the seed's worklist recorded. This unit carries no judgment about the guide's prose: `guides/**`, `README.md`, and every doc block under `src/**` are the converge unit's.

## Standing conditions, taken before this dispatch

- The Orchestrator installed `@orkestrel/guide@0.0.18` (packed at the guide's tip after U4) into `node_modules` with `--no-save`; `package.json` still declares the `^0.0.17` range and stays so in this unit (the registry serves no `0.0.18` yet; the re-pin lands after the release). `npm ls` reports that one package `invalid` against its range, which is expected. Do not run `npm install` or `npm ci`. The install log:

```text
== relation 2026-09-07T16:42:47Z tarball sha256 7828c1635175ef73
== before
0.0.17
(status end)
== replaced range
79:		"@orkestrel/guide": "^0.0.17",
== install

removed 30 packages, and changed 2 packages in 825ms
EXIT 0
== after
0.0.18
9
(status end)
```

- Scaffold's tip is extracted at `/tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package`; its CLI is `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js`. P21 ran the same steps in a scratch clone of this checkout with the head start and read (the expected readings for every criterion below; `docs` prints the converge unit's worklist):

```text
### relation (a5ee7cf, version 0.0.11, guide range ^0.0.17, head start 0.0.18)
-- repair
9 written, 27 unchanged, 0 removed in ..
    M .oxlintrc.json
    M configs/helpers.ts
    M configs/policy.ts
    M package.json
    M tests/config.test.ts
    M tests/policy.test.ts
    M tests/setupPolicy.ts
    M tsconfig.json
   ?? scripts/docs.ts
-- lint
   tests/setup.ts(3)
-- docs
   guides/relation.md function createRelationManager: guide "Create a `RelationManagerInterface` over a database and its relation map." source "Creates a relation manager over a database and its relation definitions."
   guides/relation.md class RelationManager: guide "The relation registry — resolves relations once, vends a model per table." source "Resolves a `RelationsShape` once at construction and vends a typed `ModelInterface` per declared table."
   guides/relation.md class Model: guide "A typed table paired with relation-aware `load` / `find` and junction methods." source "Pairs a typed table with relation-aware loading."
   guides/relation.md function belongsTo: guide absent source "Builds a `belongs` relation — a foreign key on THIS table points at the related row."
   guides/relation.md function hasMany: guide absent source "Builds a `many` relation — a foreign key on the RELATED table points back here."
   guides/relation.md function hasOne: guide absent source "Builds a `one` relation — like `hasMany`, but a single related row."
   guides/relation.md function hasThrough: guide absent source "Builds a `through` relation — a junction table links the two sides (many-to-many)."
   guides/relation.md function hasMorph: guide absent source "Builds a `morph` relation — a polymorphic FK plus a discriminator on the RELATED table."
   guides/relation.md function resolveRelation: guide "Resolve one raw `Relation` into a flat `ResolvedRelation`." source "Resolves one raw `Relation` value into a flat `ResolvedRelation`."
   guides/relation.md function resolveRelationMap: guide "Resolve every entry of a `RelationMap`." source "Resolves every entry of a `RelationMap` into a name → `ResolvedRelation` map."
   guides/relation.md function isRelationDescriptor: guide "Narrow a value to the object form of a relation." source "Narrows a value to a `RelationDescriptor` (the object form of a relation)."
   guides/relation.md function readColumn: guide "Read one column off any record, whatever its declared type." source "Reads one column off any record."
   guides/relation.md function countAttached: guide "Count the related rows one relation attached across a record set." source "Counts the related rows one relation attached across a record set."
   guides/relation.md function indexRows: guide "Index rows by the string form of one column, for keyed lookups." source "Indexes rows by the string form of one column, for keyed lookups."
   guides/relation.md function groupRows: guide "Group rows by the string form of one column, for many lookups." source "Groups rows by the string form of one column, for one-to-many lookups."
   guides/relation.md class RelationError: guide "Carries a `RelationErrorCode` (`INVALID` / `UNKNOWN_RELATION` / `NOT_THROUGH`)." source "Represents an error thrown by the relations layer."
   guides/relation.md function isRelationError: guide "Narrow an unknown caught value to a `RelationError`." source "Narrows an unknown caught value to a `RelationError`."
   guides/relation.md type Relationship: guide absent source "Enumerates the relationships a relation can declare."
   guides/relation.md interface RelationDescriptor: guide absent source "Represents the object form of a relation."
   guides/relation.md type Relation: guide absent source "Represents a single relation definition."
   guides/relation.md type RelationMap: guide absent source "Holds a model's relations, keyed by relation name."
   guides/relation.md type RelationsShape: guide absent source "Holds per-table relation maps — the declarative input to `createRelationManager`."
   guides/relation.md type ResolvedRelation: guide absent source "Represents a relation resolved at define-time into a flat, ready-to-load form."
   guides/relation.md interface ResolvedBelongs: guide absent source "Represents a `belongs` relation resolved at define-time — the foreign key sits on THIS table."
   guides/relation.md interface ResolvedMany: guide absent source "Represents a `many` relation resolved at define-time — the foreign key sits on the RELATED table."
   guides/relation.md interface ResolvedOne: guide absent source "Represents a `one` relation resolved at define-time — `ResolvedMany`'s foreign key, one row."
   guides/relation.md interface ResolvedThrough: guide absent source "Represents a `through` relation resolved at define-time — a junction table links the two sides."
   guides/relation.md interface ResolvedMorph: guide absent source "Represents a `morph` relation resolved at define-time — a polymorphic foreign key and its discriminator."
   guides/relation.md type RelationErrorCode: guide absent source "Names a machine-readable `RelationError` code."
   guides/relation.md interface Include: guide absent source "Selects which relations to populate when loading — and, recursively, their own."
   guides/relation.md type Loaded: guide absent source "Represents a row with its loaded relation properties attached."
   guides/relation.md type LoadedMap: guide absent source "Holds the relation properties attached to a `Loaded` row — each relation name mapped to its loaded related row(s), or `undefined` when a `belongs` / `one` relation misses."
   guides/relation.md interface RelationContext: guide absent source "Holds a related model's resolved relations and primary-key column, for nested loading."
   guides/relation.md interface FindOptions: guide absent source "Configures pagination, ordering, and cancellation for `find`."
   guides/relation.md type ModelEventMap: guide absent source "Declares the push observation surface of a `ModelInterface` — the eager-load + junction-management moments a fire-and-forget observer (logging, metrics, a sync layer) subscribes to."
   guides/relation.md interface ModelInterface: guide absent source "Represents a typed table paired with relation-aware loading and junction management."
   guides/relation.md interface RelationManagerOptions: guide absent source "Configures `createRelationManager`."
   guides/relation.md interface RelationManagerInterface: guide absent source "Vends a typed `ModelInterface` per table."
   guides/relation.md ModelInterface.load: guide absent source absent
   guides/relation.md ModelInterface.find: guide absent source absent
   guides/relation.md ModelInterface.link: guide absent source absent
   guides/relation.md ModelInterface.unlink: guide absent source absent
   guides/relation.md ModelInterface.links: guide absent source absent
   guides/relation.md RelationManagerInterface.model: guide absent source absent
   guides/relation.md RelationManagerInterface.names: guide absent source absent
   guides/relation.md RelationManagerInterface.has: guide absent source absent
   guides/relation.md pitch: readme absent tagline "A small, declarative ORM layer over the database module: name a table's relations once, then `load` / `find` records with their related rows already attached. Loading is batched — a direct relation uses one query across the whole record set, while a `through` relation uses two (junction then target); either count stays constant as the parent count grows. The relationships (`belongs` / `many` / `one` / `through` / `morph`) cover the FK shapes; nested includes recurse through the registry; `link` / `unlink` / `links` manage a many-to-many junction without hand-writing join rows. It deliberately stays thin above the typed store. Resolution is define-time (each relation is precomputed once into a flat `ResolvedRelation` — nothing is inferred while loading), and the loaded relation properties are intentionally loose (`Row | readonly Row[] | undefined`) rather than typed to each exact target row: the typed half is the table reached through `model.table`; relation loading is the looser convenience on top. No write-cascades, no lazy proxies, no query builder of its own — batched eager loading and junction management. Source: `src/core`. Surfaced through the `@src/core` barrel."
   rows read: 1, disagreements found: 47
   exit 1
-- check
   tests/guides.test.ts(113,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(116,25): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(120,53): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(135,41): error TS2345: Argument of type 'readonly SourceExample[]' is not assignable to parameter of type 'readonly string[]'.
   tests/guides.test.ts(150,28): error TS2345: Argument of type 'readonly MethodEntry[]' is not assignable to parameter of type 'readonly string[]'.
   exit 2
-- test:guides
   ⎯⎯⎯⎯⎯⎯⎯ Failed Tests 9 ⎯⎯⎯⎯⎯⎯⎯
    Test Files  1 failed (1)
         Tests  9 failed | 20 passed (29)
   exit 1
-- test:policy
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
    Test Files  1 passed (1)
         Tests  90 passed | 1 skipped (91)
   exit 0
```

- The `0.0.18` readers return records: `guide.methods()` groups carry `methods: readonly MethodEntry[]` (each with `name`), `source.methods(name)` returns `readonly MethodEntry[]`, `source.examples()` and `source.examples(name)` return `readonly SourceExample[]` (each with `name`). `findMissing` and `findUnexampled` take names. The accepted adaptation of this same drop-in is at `/home/user/fleet/abort/tests/guides.test.ts:145-215` (a sibling package's suite: `members` and `documented` bound once per `describe`, the mapped `examples` bound once in the examples loop); copy its shape, not its constants.
- The vendored voice rule (`policy/no-malformed-summary`: a doc block's description paragraph opens with a third-person verb ending in `s` and does not name the symbol it documents in its first sentence; `policy/no-banned-term`: no unconditionally banned substitution-table term in comment prose outside code spans, fenced blocks, link tags, and URLs) reads every doc block and comment after `repair`. P20 read after `repair` in a scratch clone: total 3 | summary 3 | banned 0 | tests/setup.ts(3) .
- `npm run format` after editing; the acceptance gate is `format:check`. Run every script with `npm run`; `node` is v22.
- The prose sweep's hits in `guides/**` and `README.md` on this checkout after `repair`, each as line, message, path (taken by the Orchestrator in a scratch clone; the line numbers are those of the committed tree):

```text
(none captured beyond the P21 section; read the run)
```

- A banned term inside a string literal the rule does not read needs no edit. A Markdown fixture under `tests/` is swept by the prose sweep in `tests/setupPolicy.ts`, so its text and the assertion that reads it move together.

## Facts for relation (taken 2026-09-07T16:43Z by facts.sh)

- Checkout `/home/user/fleet/relation`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `a5ee7cf`, status: clean
- `package.json`: version `0.0.11`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
- Installed `@orkestrel/guide`: `0.0.18` (9 `findDrift` mentions in its index declaration)
- P20 voice sites after `repair`: total 3 | summary 3 | banned 0 | tests/setup.ts(3) 
- Manifest rows (`guides/README.md`, `grep -n '^| '`):
    7:| Concept  | Spec                         | Source                    | Tests                                 |
    8:| -------- | ---------------------------- | ------------------------- | ------------------------------------- |
    9:| Relation | [`relation.md`](relation.md) | [`src/core`](../src/core) | [`tests/src/core`](../tests/src/core) |
    13:| Directory  | Guide                        |
    14:| ---------- | ---------------------------- |
    15:| `src/core` | [`relation.md`](relation.md) |
- Guide `guides/relation.md`: 363 lines. Headings:
    1:# Relation
    7:## Surface
    35:### Factory & manager
    43:### Builders
    53:### Resolution
    61:### Row helpers
    70:### Errors
    77:### Types
    103:## Methods
    107:#### `ModelInterface`
    119:#### `RelationManagerInterface`
    129:## Contract
    144:## Patterns
    146:### Defining relations
    191:### Resolving relations directly
    235:### The registry surface
    245:### Loading
    269:### Typed table access
    282:### Through management
    308:### Observing
    341:### Practices
    350:## Tests
    359:## See also
- Table headers in `guides/relation.md` (a header row is the row before a `| ---` row):
    37: | API                     | Kind     | Summary                                                                        |
    45: | API          | Kind     | Builds a relation where…                                                   |
    55: | API                    | Kind     | Summary                                                    |
    63: | API             | Kind     | Summary                                                           |
    72: | API               | Kind     | Summary                                                                         |
    79: | Type                       | Kind      | Shape                                                                                                       |
    111: | Method   | Returns                                      | Behavior                                                  |
    123: | Method  | Returns                       | Behavior                                 |
    183: | Relationship | Builder      | FK location    | Returns               |
    333: | Entity  | Event map       | Events                                                                |
- Rows of any `### Entities` table (the Kind cell):
- H1 blockquote (`guides/relation.md`):
    3: > A small, declarative ORM layer over the [database](database.md) module: name a table's relations once, then `load` / `find` records with their related rows already attached. Loading is **batched** — a direct relation uses one query across the whole record set, while a `through` relation uses two (junction then target); either count stays constant as the parent count grows. The relationships (`belongs` / `many` / `one` / `through` / `morph`) cover the FK shapes; nested includes recurse through the registry; `link` / `unlink` / `links` manage a many-to-many junction without hand-writing join rows.
    4: >
    5: > It deliberately stays **thin above the typed store**. Resolution is define-time (each relation is precomputed once into a flat `ResolvedRelation` — nothing is inferred while loading), and the loaded relation properties are intentionally **loose** (`Row | readonly Row[] | undefined`) rather than typed to each exact target row: the typed half is the table reached through `model.table`; relation loading is the looser convenience on top. No write-cascades, no lazy proxies, no query builder of its own — batched eager loading and junction management. Source: [`src/core`](../src/core). Surfaced through the `@src/core` barrel.
- Opening prose after the blockquote (first two lines):
    7: ## Surface
    9: Create a manager over a database and its relation map, then reach a typed model and load with relations attached:
- README (`README.md`) first lines:
    # @orkestrel/relation
    
    A typed **relation manager** over [`@orkestrel/database`](https://github.com/orkestrel/database)
    tables — name a table's relations once, then `load` / `find` records with their
    related rows already attached. Loading is **batched** — a direct relation uses
    one query across the whole record set, while a `through` relation uses two
    (junction then target); either count stays constant as the parent count grows.
    The relationships
    (`belongs` / `many` / `one` / `through` / `morph`) cover the FK shapes; nested
    includes recurse through the registry; `link` / `unlink` / `links` manage a
    many-to-many junction without hand-writing join rows. Environment-agnostic —
    no I/O, no browser or server assumptions. Part of the `@orkestrel` line.
- `## Patterns` fences, each with its nearest preceding heading:
    11: fence under "## Surface"
    148: fence under "### Defining relations"
    175: fence under "### Defining relations"
    195: fence under "### Resolving relations directly"
    212: fence under "### Resolving relations directly"
    225: fence under "### Resolving relations directly"
    239: fence under "### The registry surface"
    249: fence under "### Loading"
    273: fence under "### Typed table access"
    286: fence under "### Through management"
    295: fence under "### Through management"
    312: fence under "### Observing"
    320: fence under "### Observing"
- Exported factories, every one (`grep -rn 'export function create\|export async function create' src --include=*.ts`):
    src/core/factories.ts:31:export function createRelationManager<T extends TableMap>(
- Exported classes (`grep -rn 'export class ' src --include=*.ts`):
    src/core/RelationManager.ts:41:export class RelationManager<T extends TableMap = TableMap> implements RelationManagerInterface<T> {
    src/core/errors.ts:17:export class RelationError extends Error {
    src/core/Model.ts:70:export class Model<T = Row> implements ModelInterface<T> {
- `@example` blocks per file and any already-titled block (`@example \S`):
    src/core/validators.ts:1
    src/core/factories.ts:1
    src/core/RelationManager.ts:1
    src/core/helpers.ts:7
    src/core/types.ts:1
    src/core/Model.ts:1
- Drop-in sites (`tests/guides.test.ts`):
    3:// `MODULES`, `INTERNAL`, and `ROOT_FILES` are this package's own, and are the only part
    20:} from '@orkestrel/guide'
    54:const ROOT_FILES = Object.freeze(['AGENTS.md'])
    60:for (const name of ROOT_FILES) files[name] = readFileSync(new URL(name, root), 'utf8')
    105:		for (const group of guide.methods()) {
    106:			const members = source.methods(group.interface)
    113:					expect(findMissing(members, group.methods)).toEqual([])
    116:					expect(findMissing(group.methods, members)).toEqual([])
    120:						entity === group.interface ? [] : findMissing(source.methods(entity), group.methods)
    135:			expect(findUnexampled(names, fences, source.examples())).toEqual([])
    138:		for (const group of guide.methods()) {
    148:							? source.examples(group.interface)
    149:							: source.examples(group.interface).concat(source.examples(entity))
    150:					expect(findUnexampled(group.methods, fences, examples)).toEqual([])
    162:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 350:## Tests — 0 lines naming a check or a code

## Items

1. **`repair --offline`.** Run `node /tmp/claude-0/-home-user-scaffold/6a1fadb4-aa90-52d9-9291-3bbb6ae817fe/scratchpad/docs/d7/pass/tip/package/dist/bin/main.js repair --offline` in the checkout; record its summary line and `git status --short` after (expected: the P21 list exactly — `.oxlintrc.json`, `configs/helpers.ts`, `configs/policy.ts`, `package.json` (the `docs` script row), `tests/config.test.ts`, `tests/policy.test.ts`, `tests/setupPolicy.ts`, `tsconfig.json` (the own-specifier `paths` entry), and `scripts/docs.ts` untracked).
2. **The drop-in's adaptation** (`tests/guides.test.ts`, the sites the facts block lists), each an exact edit to the reference shape:
   - in the methods loop: `const members = source.methods(group.interface)` → `const members = source.methods(group.interface).map((method) => method.name)`, and a new `const documented = group.methods.map((method) => method.name)` beside it; every `group.methods` passed to `findMissing` becomes `documented`; `findMissing(source.methods(entity), group.methods)` → `findMissing(source.methods(entity).map((method) => method.name), documented)`; the `group.methods.length` assertion stays.
   - in the examples case: `findUnexampled(names, fences, source.examples())` → `findUnexampled(names, fences, source.examples().map((example) => example.name))`.
   - in the examples loop: bind `const documented = group.methods.map((method) => method.name)` and the mapped `examples` at the loop's own scope, above the `describe` (the pilot's `:206-215`), mapping each record to its name (`source.examples(group.interface).map((example) => example.name)` and the concatenation the same way), and pass `documented` to `findUnexampled`. The shared drop-in must match the pilot's file byte for byte outside this package's constants, so the next drop-in update is a copy, not a merge.
   - a `findMissing` whose arguments are already strings (the import walk's `statement.names` against `face.surface().map((symbol) => symbol.name)`, a `names` against `surface`) stays.
   No other change to the suite.
3. **The voice sites.** After item 1, run `npx oxlint --config .oxlintrc.json --deny-warnings .` and fix every `policy/no-malformed-summary` and `policy/no-banned-term` diagnostic it prints, in the files it names (P20 read them in the files the standing conditions list). For a summary: rewrite the description paragraph's first sentence to open with a third-person verb ending in `s` that states what the declaration does (`Creates`, `Returns`, `Records`, `Checks whether`), without naming the symbol in that sentence, keeping every fact the paragraph carried; a noun-phrase opener such as `A recorder that …` becomes `Records …`. For a banned term: apply the row of the substitution table in `.claude/rules/writing.md` (`just`, `simply`, `easy` deleted or recast; `via` → `through`; `e.g.` → `for example`; `etc.` bounded; `utilize` → `use`; and so on). Move no code token, rename nothing, and change no assertion's value. Then run `npm run test:policy`: where its `prose` rule names a line in `guides/**` or `README.md` (P21's reading under `-- test:policy` shows whether it does), apply the substitution-table row at that line and change nothing else in that file; the converge unit owns every other sentence there. Where a diagnostic sits in a file the scope below names off-limits, stop and report it.
4. **The bump.** `package.json` `"version": "0.0.11"` → `"version": "0.0.12"`. The lockfile's root version lands with the Orchestrator's lockfile-only install after this unit; do not edit `package-lock.json`.


## Scope

Owned: the paths `repair --offline` writes, `tests/guides.test.ts` (the sites in item 2), every file `oxlint` names in item 3 under `tests/**` and, for a doc block or a comment only, under `src/**`, the lines the prose sweep names in `guides/**` and `README.md`, `package.json` (`version`). Off-limits: everything else, including `guides/**`, `README.md`, code under `src/**` outside a comment, `package-lock.json`, `node_modules`.

## Acceptance criteria, cheapest first

1. `git status --short` lists the P21 repair list plus `tests/guides.test.ts`, the files item 3 edited, and nothing else; the report names each file item 3 edited and the diagnostic that sent it there.
2. `npm run format:check`, `npx oxlint --config .oxlintrc.json --deny-warnings .`, and `npm run check` exit 0.
3. `npm run test:guides` exits 0 (record its `Tests` summary line; P21's failures were the record shapes alone); `npm run test:policy` and `npm run test:config` exit 0.
4. `npm run docs` reads a non-zero `rows read` and exits 1 (expected; the converge unit's worklist), reported verbatim with every line it prints.

## Output

`/home/user/scaffold/tmp/units/d7n-relation-prep-report.md`: per item the hunk (the voice sites as before/after pairs per diagnostic), per criterion the command and its last lines, the `docs` worklist verbatim, and the wall clock from your first command to your last. No count in prose. No process diary. Re-read every line and path you cite against the tree you leave.

## Deviation contract

Stop and report if `repair` writes a path outside the P21 list, if a before-text is not found verbatim, if a voice diagnostic names an off-limits file, if `test:policy` reds on a file outside your scope, or if a gate other than `docs` reads red after the items. Decide ancillary matters (the exact wording of a rewritten comment) and record them.
