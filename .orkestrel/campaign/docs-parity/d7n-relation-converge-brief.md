# Brief — P.2 `d7n-relation-converge` (relation under the equality gate)

## Role and engine

`implementer` on Claude Opus 5 — the subjective work class: table shape, documentation voice, the pitch, the titled pair, and the gate cases. Sole writer in `/home/user/fleet/relation` from the committed baseline `bcf2e7d` (clean; `@orkestrel/guide@0.0.18` installed `--no-save` while `package.json` declares `^0.0.17`; the tip's vendored delta and the seed landed; the drop-in adapted to the record shapes; the voice sites fixed; version `0.0.12`). Perform the assignment directly and spawn nothing. Do not commit, install, or run a discard-class git command; undo an edit by editing.

## Objective

`guides/relation.md` passes the equality gate: every `## Surface` and `## Methods` table heads `Summary` and every cell equals its doc block's description paragraph; the H1 blockquote is one noun phrase and the README's pitch is the same text; one `@example` is titled with a fence's heading and equals its body; `tests/guides.test.ts` carries the gate cases (the equality case, the population pin naming both title sets, and the README case), each read red on this tree before its convergence; `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`. Report every reader or seed defect you meet with the exact seed line that produced it: the guide's release waits on the fleet's reports.

## Read first, in this order

1. `/home/user/scaffold/AGENTS.md`; `.claude/rules/documentation.md` § Parity; `.claude/rules/writing.md`; `.claude/rules/tests.md`.
2. `/home/user/fleet/relation/guides/relation.md`, `README.md`, `tests/guides.test.ts`, every `src/**` file the manifest's Source column names, whole.
3. The accepted pilot, a sibling package converged under the same gate: `/home/user/fleet/abort/guides/abort.md:1-16` (the tagline as one noun phrase, the opening paragraph carrying the displaced sentences), `:52-60` (the `### Classes` table), `:154-160` (§ Tests naming the checks descriptively); `/home/user/fleet/abort/README.md:1-10` (the pitch as the same blockquote, the onboarding paragraph); `/home/user/fleet/abort/tests/guides.test.ts:31` and `:45` (`GUIDE_SPEC`, `ROOT_FILES` with `README.md`), `:62-110` (the manifest assertion, the pin in the inline form, the README case with its guards), `:172-190` (the equality case inside the manifest loop). The guide's own converged shapes at `/home/user/fleet/guide/guides/guide.md:1-24` and `:202-213`.
4. `/home/user/scaffold/.orkestrel/campaign/docs-parity/d7-fleet-plan.md` rulings 2 to 7 and 10, and § Template corrections; `rulings.md` § Ruling 6 and § Ruling 7; `orchestrator-measurements.md` § P16 and § P19.
5. The prep unit's report, `/home/user/scaffold/tmp/units/d7n-relation-prep-report.md`, for what P.1 changed and the first `docs` worklist.

## What is fixed

- **The tables** (the facts block lists every header row with its line): every `## Surface` and `## Methods` table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, or `Returns`. A `Behavior`, `Purpose`, `Describes`, or `Builds` column is renamed `Summary`; a table carrying `Shape` and no compared column gains `Summary` as its last column, the type literal staying in `Shape` and the clause after an em dash moving into the doc block verb-first. The first column's header text (`API`, `Name`, `Type`, `Method`, `Export`) is the guide's and stays; the readers locate the compared column by the `Summary` header alone. Where a table carries `Shape`, state the fleet's one `Shape` idiom (Ruling 12: an interface's data members as bare names in braces, `?` marking an optional member, call-signature members after `plus`, a type alias's own type literal with a union's arms as `\|`, a member's type never spelled in the cell) with its convention sentence ABOVE that table (the pilot's `/home/user/fleet/abort/guides/abort.md:60` sits above the table at `:62`), and rewrite every row that spells a member's type, a prose description, or a call signature with its return type to that idiom; a constant's declared type heads `Shape` in every Constants table, never `Signature`.
- **The class rows** (ruling 5): a `### Entities` table whose every row's `Kind` is `class` becomes `### Classes`; a mixed table keeps its heading; every class documented under its own H3 carries a row in a `### Classes` table, added before the H3 sections where none exists (the guide's `:202-213` is the shape).
- **The seed**: `npm run docs` on this baseline reads the worklist below (no build is needed — the seed resolves the installed readers); `npm run docs -- --to guide` writes every located `Summary` cell from its block; `npm run docs -- --to source` writes a titled fence body into its block. The direction is Ruling 6's: rewrite the doc block first where the cell carries information the block lacks, then propagate. Every `docs` criterion reads a non-zero `rows read`. Read the P16 comparator's terms before judging a residual disagreement: a `{@link}` tag compares as its target's code token, whitespace collapses, a code span's boundary whitespace trims.
- **Rebuilding a table row by hand**: split on a pipe not preceded by a backslash, never on a bare `|`; a `Shape` or `Signature` cell carries `\|` inside a union literal, and nothing reads those cells, so a cut row passes every gate. After any hand rebuild, compare every non-`Summary` cell of every row against the baseline (`git show HEAD:guides/relation.md`) and record the comparison; a non-`Summary` cell changes only where this brief names the header.
- **Prose truth**: a description paragraph the gate now locks into a cell is read against the code before it is propagated; a sentence the code falsifies (a return that carries both values where the sentence says either) is rewritten to the truth, never carried across. A source block's clause breaks use the spaced em dash the writing rules fix, never a spaced hyphen, so the propagated cells read in the guide's own voice. The  constant is used at every site that reads the guide's path.
- **Voice sweeps over prose you own**: a count in prose (`the two laws`, `three places`) and an all-caps emphasis (`NOT`) are corrected wherever you meet them in `guides/relation.md`, `README.md`, and every doc block you rewrite, and you introduce neither; a comment line you extend is rewrapped to its block's width, because the formatter does not reflow comment prose; a rewritten sentence never borrows a sibling export's name as its product noun.
- **Ruling 7**: a description paragraph is the summary a cell carries; reference material moves to `@remarks`, every sentence kept; a fact a cell carried about a readonly data member, an overload set, or a family (which no compared block can hold) may land in the guide's prose directly beside its table, and the report names each such landing; a remark sentence the description now repeats is pruned. Write distinct description paragraphs where several rows would otherwise carry one sentence, and state a factory's preference as the contract it returns.
- **The tagline** (ruling 4): the H1 blockquote becomes one noun phrase in plain text and code spans with no link and no bold; the displaced sentences fold into the guide's opening prose after the blockquote without restating the tagline's clauses; the README gains the same blockquote under its H1 with the same line breaks, and its opening paragraph keeps the onboarding it alone carries, also without restating the tagline's clauses.

- **The titled pair** (ruling 3): title exactly one `@example` — the primary factory's block where one exists (the first `create*` the facts block lists), otherwise the block of the exported function the first `## Patterns` fence demonstrates — with the flattened text of the heading whose first fence demonstrates it. Name the block by its content, never by a line number. Where that fence sits under a structural heading (`### Factories`, `### Helpers`, `## Surface`), add a heading one level deeper directly above the fence, worded as the demonstration it shows (`#### Create a parser`), and title the block with that text (Ruling 9); the structural heading stays and no fence moves. Confirm the heading text occurs once in the document, heading-scoped (`grep -n '^#\+ <title>' guides/relation.md`), and read the fence body for a three-backtick run or the doc-comment terminator first; either disqualifies the fence, so take the next. Where the block's example already demonstrates more than the fence (or the fence more than the block), extend the shorter side and delete nothing (Ruling 14). Title the block first and record that run. Run `--to source` LAST, only after `npm run docs` reads the summaries at zero disagreements: on an unconverged tree `--to source` writes every disagreeing cell into its block as well, which flattens a `{@link}` into a code span and repeats a remark inside the description (csv's converge unit measured `written: 51` and undid every one). When the summaries agree it writes the titled example alone (`written: 1`); record that run. Every other block stays untitled.
- **The drop-in's canonical text (Ruling 13)**: outside this package's constants block the file matches the pilot's byte for byte, with the pilot's two corrections (the `INTERNAL` doc block reads "the assertion that follows it", and the equality case sits directly after the methods loop and before the examples case); the examples case is named `documents an example for every Surface function`.
- **The gate cases** in `tests/guides.test.ts`, in this file's own header and helpers (the readers come from `@orkestrel/guide`; import `findDrift` beside the existing readers): the equality case inside the manifest loop's `describe(entry.concept)` block collecting `${entry.spec} ${drift.key}: guide ${left} source ${right}` lines with `absent` for an undefined side; the pin at file scope in the pilot's form (the guard-and-continue loop at `/home/user/fleet/abort/tests/guides.test.ts:72-95`, no local type predicate) with the both-sides failure line `${GUIDE_SPEC} pairs: guide [...] source [...]`; the README case with two `not.toBeUndefined()` guards before `toBe`; `README.md` added to `ROOT_FILES`; a `GUIDE_SPEC` constant for the spec path used by the pin and the README case. Name each test for what it proves.

- **§ Tests**: every guide carries a `## Tests` section naming the suites that prove it; add one where the guide has none. Where it lists the checks the suite wires, it gains the equality gate named descriptively (every `Summary` cell against its declaration's description paragraph, the titled `<title>` fence — named by its title, as the pilot's `:156` names `Create and abort` — against the `@example` of that title, the README pitch against the tagline), with no SQ/MQ/EQ/RQ identifier until the mirror refresh lands.
- **Template corrections** (the pilot's audit): re-read every citation in your report against the tree you leave; the Orchestrator takes the lint control reading after you exit, so plant nothing for it; your own red-first control on a file you own is yours to plant and reverse, and the report records the reversal.

## The first `docs` worklist on this baseline

```text
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
```

## Facts for relation (taken 2026-09-07T21:18Z by facts.sh)

- Checkout `/home/user/fleet/relation`, branch `claude/orkestrel-npm-audit-deps-14ibta`, tip `bcf2e7d`, status: clean
- `package.json`: version `0.0.12`; `@orkestrel/guide` range `^0.0.17`; `@orkestrel/contract` declared: ^0.0.16
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
    106:			const members = source.methods(group.interface).map((method) => method.name)
    114:					expect(findMissing(members, documented)).toEqual([])
    117:					expect(findMissing(documented, members)).toEqual([])
    123:							: findMissing(
    124:									source.methods(entity).map((method) => method.name),
    142:				findUnexampled(
    145:					source.examples().map((example) => example.name),
    150:		for (const group of guide.methods()) {
    155:					? source.examples(group.interface).map((example) => example.name)
    159:							.concat(source.examples(entity).map((example) => example.name))
    166:					expect(findUnexampled(documented, fences, examples)).toEqual([])
    178:					expect(findMissing(names, surface)).toEqual([])
- `## Tests` paragraph naming checks: 350:## Tests — 0 lines naming a check or a code

## Standing conditions

- Put every instrument you write under `tmp/d7n-relation-converge/` inside this checkout (git ignores `tmp/`), never under the session scratchpad: a sibling unit writes there concurrently and a file read back can hold another package's guide.

- The vendored voice rule reads every doc block you rewrite (third-person verb opener, the symbol unnamed in the first sentence) and the prose sweep in `tests/setupPolicy.ts` reads `guides/relation.md` and `README.md` against the substitution table.
- Format and lint scoped to your owned paths: `npx oxfmt --write <paths>` after edits and after each seed write; `npx oxfmt --check <paths>` and `npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>` as gates (oxlint reads no Markdown and exits 1 on a Markdown-only path list; the prose sweep in `test:policy` gates the guide and the README). `npm run test:guides` after the README edit, because a suite reading the README is the objective lane's M9.
- `package.json` keeps `^0.0.17` (the registry serves no `0.0.18` yet); do not touch it or the lockfile.

## Scope

Owned: `guides/relation.md`, `README.md`, the doc blocks under `src/**` whole (the description paragraph, `@remarks`, `@example`, and every other tag — no code token moves), `tests/guides.test.ts`. Off-limits: everything else, including every vendored file, `tests/setup*.ts`, `tests/src/**`, `package.json`, `package-lock.json`, `guides/README.md`, `src/**` code outside doc blocks, and every other guide under `guides/` unless the manifest's `## By concept` table names it.

## Acceptance criteria, cheapest first

1. **Red-first, recorded on the unconverged tree:** add the gate cases; run `npm run test:guides` and record each failing case's first lines (the equality worklist, the pin's both-sides line, the README case's `undefined`).
2. Every table heads `Summary` beside only `Kind`, `Shape`, `Signature`, `Value`, `Returns`; `### Classes` names every all-class table and every H3-documented class carries a row.
3. The doc blocks of every row whose cell carried information the block lacked are rewritten verb-first first; then `npm run docs -- --to guide` and the scoped format; the report names each row whose literal stayed in `Shape` and each block rewritten by hand.
4. The titled pair lands through `--to source`; the report names the pair and the fence bodies read.
5. The blockquote and the pitch are one text; the guide's opening prose carries the displaced sentences; the README's onboarding stays.
6. `npm run docs` exits 0 at a non-zero `rows read` and `disagreements found: 0`; `npm run docs -- --to guide` and `-- --to source` each read `written: 0`.
7. `npx oxfmt --check` and the scoped `oxlint` over the owned paths, `npm run check`, `npm run test:guides` (the gate cases now green), `npm run test:policy` exit 0; `npm run test:src:core` (or the package's narrowest unit script) as an observation.
8. `git status --short` lists owned files only.

## Output

`/home/user/scaffold/tmp/units/d7n-relation-converge-report.md`: per criterion the command and its reading (the red-first lines verbatim), the rows moved and the blocks rewritten, the pair, the README and opening-prose sentences changed, every reader or seed defect met with the seed's line, and the wall clock from your first command to your last. No process diary. No count in prose: name the members or recast the sentence; a number stays only as a duration, a size, a limit, a version, a date, an exit code, or a measurement quoted with the run that produced it.

## Deviation contract

Stop on: a cell the seed cannot locate after the headers change (other than the pitch); a titled body the block cannot hold; a test outside `tests/guides.test.ts` going red; a vendored file needing an edit; a reader returning a shape the brief does not describe; a residual disagreement no doc-block rewrite can close under the P16 comparator. Decide ancillary matters (where a folded sentence sits, which of two eligible fences carries the title) and record them.
