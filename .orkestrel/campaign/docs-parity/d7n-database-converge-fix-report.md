# Report — `d7n-database-converge-fix`

Every item landed and every acceptance criterion is green. `npm run docs` reads
`rows read: 1, disagreements found: 0`, and the `--to guide` and `--to source` directions each
read `written: 0`. Wall clock
from the first command to the last: 2026-09-07T21:21:43Z to 2026-09-07T21:32:37Z, 11 minutes.

Deviation state: none. No stop condition fired.

## Touched files

| File | Change |
| --- | --- |
| `guides/database.md` | Emphasis lowered through the guide, the counts at the conformance and shipping paragraphs named, the `## Methods` intro narrowed, `guarantee` retired at the listener-isolation heading and the `Table` test row, and every propagated cell |
| `src/browser/constants.ts` | `METADATA_STORE` names `__metadata__` in its description and its `@remarks` |
| `src/browser/helpers.ts` | `mapMigrationError`: `INSIDE` → `inside` |
| `src/browser/types.ts` | `QueryPlan` names the `@orkestrel/database/browser` entry point |
| `src/core/constants.ts` | `CONFORMANCE_SCHEMA` names the `users` and `posts` tables |
| `src/core/helpers.ts` | `auditDriver`: `FULL` → `full` |
| `src/core/types.ts` | `TableEventMap`: `ALONGSIDE` → `alongside` |
| `src/server/compilers.ts` | `compileJSONTypeSQL`: `NESTED`, `PRESENT`, `ABSENT` lowered |
| `src/server/constants.ts` | `EXACT_COLUMN_STORAGE` and `EXACT_RANGE_COLUMN_STORAGE`: emphasis lowered, `BINARY` and `TEXT` kept |
| `src/server/helpers.ts` | `matchesOrderExactly`, `matchesConditionExactly`, `matchesDeclaredStorage`, `deriveSQLiteIndexName`: emphasis lowered |
| `src/server/types.ts` | `CompiledSQL` and `SQLiteDriverOptions` name the `@orkestrel/database/server` entry point |

```text
 guides/database.md       | 239 ++++++++++++++++++++++++-----------------------
 src/browser/constants.ts |  10 +--
 src/browser/helpers.ts   |   2 +-
 src/browser/types.ts     |   3 +-
 src/core/constants.ts    |   2 +-
 src/core/helpers.ts      |   2 +-
 src/core/types.ts        |   2 +-
 src/server/compilers.ts  |   4 +-
 src/server/constants.ts  |  16 ++--
 src/server/helpers.ts    |  20 ++---
 src/server/types.ts      |   6 +-
 11 files changed, 156 insertions(+), 150 deletions(-)
```

No code token moved:

```text
$ git diff -- src/ | grep -E '^[-+]' | grep -v '^[-+][-+]' | grep -vE '^[-+][[:space:]]*(\*|//|/\*\*)'
(no output, exit 1)
```

## Item 1 — the reserved store's literal (D1, Ruling 18)

`src/browser/constants.ts`, `METADATA_STORE`. The description names the literal so the cell carries
it through `--to guide`, and the `@remarks` takes `METADATA_TABLE`'s sentence form.

```diff
- * Names the reserved out-of-line store the {@link IndexedDBDriver} stamps its
- * {@link DriverMetadata} into.
+ * Names the reserved out-of-line store `__metadata__` the {@link IndexedDBDriver}
+ * stamps its {@link DriverMetadata} into.
  *
  * @remarks
- * Backs the driver's `metadata` / `stamp` hooks. A user table declared with this
- * exact name collides with the driver's own bookkeeping, so a caller must avoid
- * it; the collision is caught at `open`.
+ * Backs the driver's `metadata` / `stamp` hooks. A user table named `__metadata__`
+ * collides with the driver's own bookkeeping, so a caller must avoid it; the
+ * collision is caught at `open`.
```

The cell at `guides/database.md:148` after `--to guide`:

```text
| `METADATA_STORE` | const | Names the reserved out-of-line store `__metadata__` the `IndexedDBDriver` stamps its `DriverMetadata` into. |
```

## Item 2 — all-caps emphasis (D2)

### The owning blocks, then `--to guide`

```diff
src/server/constants.ts
- * Lists the declared {@link ColumnStorage}s whose SQL EQUALITY comparisons (`equals` /
+ * Lists the declared {@link ColumnStorage}s whose SQL equality comparisons (`equals` /
- * This set governs equality and prefix/suffix matching only. RANGE
+ * This set governs equality and prefix/suffix matching only. Range
- * are exact for `integer` / `real` / `boolean` but NOT for `text`: compiled
+ * are exact for `integer` / `real` / `boolean` but not for `text`: compiled
- * TEXT byte-for-byte as UTF-8 — equivalent to Unicode CODE-POINT order —
+ * TEXT byte-for-byte as UTF-8 — equivalent to Unicode code-point order —
- * compares UTF-16 CODE-UNIT order. The two orders diverge for supplementary-
+ * compares UTF-16 code-unit order. The two orders diverge for supplementary-
- * (`\uD800`–`\uDBFF`) sorts BELOW … while
- * its code point sorts ABOVE them. So `matchesConditionExactly`'s range family and
+ * (`\uD800`–`\uDBFF`) sorts below … while
+ * its code point sorts above them. So `matchesConditionExactly`'s range family and
- * Lists the declared {@link ColumnStorage}s whose SQL RANGE comparisons
+ * Lists the declared {@link ColumnStorage}s whose SQL range comparisons

src/server/compilers.ts
- * Compiles a NESTED {@link FieldPath} to the `json_type(<col>, <path>)` SQL
+ * Compiles a nested {@link FieldPath} to the `json_type(<col>, <path>)` SQL
- * PRESENT JSON `null` apart from an ABSENT path (both read back as SQL `NULL`
+ * present JSON `null` apart from an absent path (both read back as SQL `NULL`

src/browser/helpers.ts
- * for use INSIDE `migrate()` — the one context where `UPGRADE` means the
+ * for use inside `migrate()` — the one context where `UPGRADE` means the

src/core/helpers.ts
- * Runs the FULL driver-conformance battery and collects every violation — the
+ * Runs the full driver-conformance battery and collects every violation — the

src/core/types.ts
- * subscribes to, ALONGSIDE the database-level {@link DatabaseEventMap}.
+ * subscribes to, alongside the database-level {@link DatabaseEventMap}.
```

`npm run docs -- --to guide` then carried the corrected cells at `guides/database.md:102`, `:103`,
`:116`, `:148`, `:150`, `:210`, `:243`, `:267`, `:283`, `:284`, and `:285`:

```text
wrote guides/database.md
rows read: 1, disagreements found: 11, written: 11, reported: 0
```

### The converge round's own emphasis in `src/server/helpers.ts`

```diff
- * `boolean`). `text` is NOT exact here: SQLite's default BINARY collation
+ * `boolean`). `text` is not exact here: SQLite's default BINARY collation
- * a `text` order term REFINES through the core engine instead. The column must
- * also be REQUIRED and NON-NULL: an optional or nullable column refines, because
+ * a `text` order term refines through the core engine instead. The column must
+ * also be required and non-null: an optional or nullable column refines, because
```

The rest of that file's emphasis went with it, because acceptance criterion 4 sweeps the whole file:
`FINITE` at `:79`, `REFINE` / `CODE POINT` / `CODE UNIT` at `:113-115`, `NON-EMPTY` at `:118`,
`NEVER` at `:124`, `AMBIGUOUS` at `:507`. Recorded as an ancillary decision.

### The guide's § Contract and § Patterns prose

Every listed site, lowered with the contrast kept in the sentence. `MAY` became `can` per
`.claude/rules/writing.md` § Voice and actor; `DO` / `DOES` became `do` / `does`, which keeps the
contrast the sentence draws against the driver that does not implement the hook.

```diff
-candidate SUPERSET the core engine then refines to the exact result, never
+candidate superset the core engine then refines to the exact result, never
-1. **DOC ↔ PUBLIC ENTRY bijection.** Every `function` / `const` / `class` /
+1. **Doc ↔ public entry bijection.** Every `function` / `const` / `class` /
-3. **Thin driver, one engine, native overrides.** The REQUIRED
+3. **Thin driver, one engine, native overrides.** The required
-   is the default and the only REQUIRED path. A backend MAY implement the
+   is the default and the only required path. A backend can implement the
-   so every query runs the engine over key-ordered `scan`; both DO implement
+   so every query runs the engine over key-ordered `scan`; both do implement
-   always use the snapshot floor; `JSONDriver` DOES implement
+   always use the snapshot floor; `JSONDriver` does implement
-   `scan` refined through the SAME core engine every scan-only driver uses
+   `scan` refined through the same core engine every scan-only driver uses
-   every scalar condition over a column that is optional OR nullable,
-   `absent` / `present` only when the column is optional AND nullable, a `null`
+   every scalar condition over a column that is optional or nullable,
+   `absent` / `present` only when the column is optional and nullable, a `null`
-   `FieldPath` — AND a
-   RANGE operator (`above` / `below` / `from` / `to` / `between`) or an
+   `FieldPath` — and a
+   range operator (`above` / `below` / `from` / `to` / `between`) or an
-   orders `TEXT` by Unicode CODE POINT while the core engine's `compareValues`
-   orders JS strings by UTF-16 CODE UNIT, and the two diverge on
+   orders `TEXT` by Unicode code point while the core engine's `compareValues`
+   orders JS strings by UTF-16 code unit, and the two diverge on
-   though text EQUALITY (`equals`/`not`/`any`/`none`) and `starts`/`ends` stay
+   though text equality (`equals`/`not`/`any`/`none`) and `starts`/`ends` stay
-   case-SENSITIVELY (a `substr` comparison plus a
+   case-sensitively (a `substr` comparison plus a
-   `typeof` check) when they DO qualify as exact. `IndexedDBDriver` is **narrow-then-refine**:
+   `typeof` check) when they do qualify as exact. `IndexedDBDriver` is **narrow-then-refine**:
-   the primary key or a single-column secondary index — a candidate SUPERSET,
-   never lossy — then hands that superset to the SAME core engine
+   the primary key or a single-column secondary index — a candidate superset,
+   never lossy — then hands that superset to the same core engine
-   writing `metadata` in that SAME upgrade; a metadata-only input uses one ordinary
+   writing `metadata` in that same upgrade; a metadata-only input uses one ordinary
-   deliberately OMITS `transaction?`: an `IDBTransaction` can auto-commit when
+   deliberately omits `transaction?`: an `IDBTransaction` can auto-commit when
-   `equalsValue` — STRUCTURAL equality by SameValueZero leaves, so `equals` on
+   `equalsValue` — structural equality by SameValueZero leaves, so `equals` on
-   `write` / `remove` / `clear`, KEY only, no value payload to avoid heavy
+   `write` / `remove` / `clear`, key only, no value payload to avoid heavy
-8. **DOC ↔ SOURCE method bijection.** Every behavioral interface's
+8. **Doc ↔ source method bijection.** Every behavioral interface's
-   every REQUIRED method and adds none beyond the interface (optional members
+   every required method and adds none beyond the interface (optional members
-   BEFORE EACH YIELD (so an abort mid-iteration stops promptly) and IGNORE
+   before each yield (so an abort mid-iteration stops promptly) and ignore
-    an UNVERSIONED driver (one that implements neither `metadata` nor `stamp`),
-    which still owns knowing what is deployed. A driver that DOES
+    an unversioned driver (one that implements neither `metadata` nor `stamp`),
+    which still owns knowing what is deployed. A driver that does
-    DEPLOYED physical schema; it must not pre-create the target schema before
+    deployed physical schema; it must not pre-create the target schema before
-    `open()` unchanged — versioning is opt-in per driver AND per database.
+    `open()` unchanged — versioning is opt-in per driver and per database.
-    verifies the REQUIRED surface's invariants (copy-in/copy-out isolation,
+    isolated) and verifies the required surface's invariants (copy-in/copy-out
-    file/store created under an OLDER naming scheme leaves its old-named
+    file/store created under an older naming scheme leaves its old-named
-are honored as rows stream; `order` is IGNORED (sorted output is `records()`
+are honored as rows stream; `order` is ignored (sorted output is `records()`
-orchestration against the database's OWN declared `tables`, so the caller
+orchestration against the database's own declared `tables`, so the caller
-// Reopen the SAME store with a higher version and a changed declaration.
+// Reopen the same store with a higher version and a changed declaration.
-the per-row mutations (KEY only — no value payload, to keep fan-out lean; a
+the per-row mutations (key only — no value payload, to keep fan-out lean; a
-AFTER the relevant transition, so a listener can never change what a write
+after the relevant transition, so a listener can never change what a write
-SUCCEEDS; `rollback` only after a throwing scope's tables are all restored;
+succeeds; `rollback` only after a throwing scope's tables are all restored;
-every emit sits after its transition AND is isolated, a buggy observer
+every emit sits after its transition and is isolated, a buggy observer
-it directly (as `Table` does internally) shows the whole REQUIRED surface:
+it directly (as `Table` does internally) shows the whole required surface:
-`migrate({ plan, metadata })` build an isolated candidate and publish FILE FIRST:
+`migrate({ plan, metadata })` build an isolated candidate and publish file first:
-(`IndexedDBDriver`): the backend can only prove a candidate SUPERSET range-exact
-(a key-range pushdown), so it fetches that superset and hands it to the SAME
+(`IndexedDBDriver`): the backend can only prove a candidate superset range-exact
+(a key-range pushdown), so it fetches that superset and hands it to the same
-`DriverMetadata.schema`, and then creates or validates that DEPLOYED schema before
+`DriverMetadata.schema`, and then creates or validates that deployed schema before
-literally named `__metadata__`), but OMITS `transaction?` (the underlying
+literally named `__metadata__`), but omits `transaction?` (the underlying
-row transformations, and the metadata write in the SAME versionchange
+row transformations, and the metadata write in the same versionchange
```

## Item 3 — counts in the owned prose (D3)

`src/core/constants.ts`, `CONFORMANCE_SCHEMA`, with the cell at `guides/database.md:243` following
through `--to guide` in the same edit:

```diff
- * Holds the fixed two-table schema every driver-conformance phase opens.
+ * Holds the fixed `users` and `posts` schema every driver-conformance phase opens.
```

The guide's own sites:

```diff
-    README all call it the same way. It opens a fixed two-table schema per
-    phase (calling `factory()` fresh each time so failures stay isolated) and
+    README all call it the same way. It opens the fixed `users` and `posts`
+    schema per phase (calling `factory()` fresh each time so failures stay
+    isolated) and verifies …

-reference `MemoryDriver`, and three persistent backends. `JSONDriver` in
+reference `MemoryDriver`, and the persistent `JSONDriver`, `SQLiteDriver`, and
+`IndexedDBDriver` backends. `JSONDriver` in `src/server` is a decorator over
```

The conformance paragraph and the shipping paragraph each take the file's line width after the
substitution. `oxfmt` accepts either wrap, so the rewrap is a readability decision recorded under
§ Ancillary decisions.

## Item 4 — the moved type rows name their entry point (D4)

```diff
src/server/types.ts
- * Represents a parameterized SQL fragment or statement plus its bind values.
+ * Represents a parameterized SQL fragment or statement plus its bind values. The
+ * `@orkestrel/database/server` entry point exports this type.

- * Options for {@link import('./factories.js').createSQLiteDriver}.
+ * Configures {@link import('./factories.js').createSQLiteDriver}. The
+ * `@orkestrel/database/server` entry point exports this type.

src/browser/types.ts
- * primary-store full scan.
+ * primary-store full scan. The `@orkestrel/database/browser` entry point exports
+ * this type.
```

The rows after `--to guide`, at `guides/database.md:283`, `:284`, and `:285`:

```text
| `CompiledSQL` | interface | `{ sql, parameters }` | Represents a parameterized SQL fragment or statement plus its bind values. The `@orkestrel/database/server` entry point exports this type. |
| `SQLiteDriverOptions` | interface | `{ path?, readonly?, timeout?, references?, pragmas? }` | Configures `createSQLiteDriver`. The `@orkestrel/database/server` entry point exports this type. |
| `QueryPlan` | interface | `{ index?, range? }` | Represents a pushdown plan — … a primary-store full scan. The `@orkestrel/database/browser` entry point exports this type. |
```

## Item 5 — the `## Methods` intro (D5)

The sentence now names the classes it covers and names `DriverIterator` as the exception.

```diff
-typed push observation surface, see [Observing](#observing)). Each
-`### Classes` class implements its interface exactly, so this doubles as the
-per-instance method surface (see `.claude/rules/documentation.md` § Parity).
+typed push observation surface, see [Observing](#observing)). The database and
+driver classes in `### Classes` implement their interfaces exactly, so this
+doubles as the per-instance method surface; `DriverIterator` is the internal
+continuation boundary and implements none of these interfaces (see
+`.claude/rules/documentation.md` § Parity).
```

## Item 6 — `guarantee` (D6)

```diff
-**The listener-isolation safety guarantee.** A listener throw never escapes
+**Listener isolation.** A listener throw never escapes

-… sequential partial-batch abort semantics, and the emitter's post-commit/no-aborted-event guarantees.
+… sequential partial-batch abort semantics, and the emitter's post-commit and no-aborted-event behavior.
```

## Item 7 — propagation

```text
$ npx oxfmt --write guides/database.md
Finished in 784ms on 1 files using 4 threads.

$ npm run docs
rows read: 1, disagreements found: 0

$ npm run docs -- --to guide
rows read: 1, disagreements found: 0, written: 0, reported: 0

$ npm run docs -- --to source
rows read: 1, disagreements found: 0, written: 0, reported: 0
```

## Acceptance criteria

### 1. `git status --short` lists owned files only

```text
 M guides/database.md
 M src/browser/constants.ts
 M src/browser/helpers.ts
 M src/browser/types.ts
 M src/core/constants.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M src/server/compilers.ts
 M src/server/constants.ts
 M src/server/helpers.ts
 M src/server/types.ts
```

`tests/**`, `package.json`, `package-lock.json`, `guides/README.md`, `README.md`, and every
vendored file are untouched. The instruments live under `tmp/d7n-database-converge-fix/`, which git
ignores.

### 2. Format, lint, and typecheck

```text
$ npx oxfmt --check guides/database.md src/browser/constants.ts src/browser/helpers.ts \
    src/browser/types.ts src/core/constants.ts src/core/helpers.ts src/core/types.ts \
    src/server/compilers.ts src/server/constants.ts src/server/helpers.ts src/server/types.ts
All matched files use the correct format.
Finished in 818ms on 11 files using 4 threads.
exit 0

$ npx oxlint --config .oxlintrc.json --deny-warnings <the owned .ts paths>
exit 0

$ npm run check
> @orkestrel/database@0.0.14 check:src:server
> tsc --noEmit -p configs/src/tsconfig.server.json
exit 0
```

### 3. `npm run docs` at zero, `--to guide` and `--to source` at `written: 0`

Quoted under § Item 7.

### 4. The greps

Before the edits, then after, each command run in `/home/user/fleet/database`:

```text
$ grep -c '__metadata__' src/browser/constants.ts
before: 1
after:  3

$ grep -nE '\b(EQUALITY|RANGE|NESTED|PRESENT|ABSENT|SUPERSET|INSIDE|FULL|ALONGSIDE|REQUIRED|MAY|SAME|OMITS|OWN|AFTER|REFINES|NON-NULL|STRUCTURAL|UNVERSIONED|DEPLOYED|OLDER)\b' guides/database.md src/server/helpers.ts
before: printed guides/database.md:102, :103, :116, :140, :150, :210, :267, :482, :490, :557, :566,
        :572, :578, :579, :604, :615, :630, :689, :768, :773, :798, :843, :1589, :1653, :1848,
        :1995, :2195, :2196, :2294, :2346, :2350 and src/server/helpers.ts:187, :188
after:  (no output, exit 1)

$ grep -n 'three persistent\|two-table\|guarantee' guides/database.md
before: printed :243, :796, :850, :1887, :2468
after:  (no output, exit 1)

$ grep -n 'database/server\|database/browser' guides/database.md | grep 'SQLiteDriverOptions\|QueryPlan\|CompiledSQL'
before: (no output)
after:  283:| `CompiledSQL` …
        284:| `SQLiteDriverOptions` …
        285:| `QueryPlan` …
```

### 5. The suites

```text
$ npm run test:guides
 Test Files  1 passed (1)
      Tests  87 passed (87)
exit 0

$ npm run test:policy
 Test Files  1 passed (1)
      Tests  90 passed | 1 skipped (91)
exit 0
```

Observation, the narrowest unit script (no timing red; the host carried sibling units throughout):

```text
$ npm run test:src:core
 Test Files  14 passed (14)
      Tests  371 passed (371)
exit 0
```

## The closing sweep

Pattern: `\b[A-Z]{3,}\b`. Paths: `guides/database.md` and `src/**/*.ts` (globstar enabled, which
reaches `src/browser/`, `src/browser/drivers/`, `src/core/`, `src/core/drivers/`, `src/server/`, and
`src/server/drivers/`). Every hit ruled.

**`guides/database.md` — every surviving token is data.** `SQL`, `WHERE`, `ORDER`, `CREATE`,
`TABLE`, `SELECT`, `FROM`, `INDEX`, `EXISTS`, `LIMIT`, `OFFSET`, `BETWEEN`, `LIKE`, `GLOB`, `NULL`,
`NOT`, `TEXT`, `INTEGER`, `BEGIN`, `COMMIT`, `ROLLBACK`, `SUM`, `AVG`, `MIN`, `MAX`, and `DDL` are
SQL; `BINARY` is the SQLite collation name and `WAL` a `journal_mode` value. `CONFLICT`, `DRIVER`,
`ABORTED`, `VALIDATION`, `MIGRATION`, `CLOSED`, `CONFORMANCE`, `QUOTA`, and `BUSY` are
`DatabaseError` codes; `UPGRADE` is the wrapper's `IndexedDBError` name at `:150` and `:2431`;
`ENOENT` is the Node error code at `:2092`. `JSON`, `API`, `CRUD`, `IDB`, `ORM`, `DSL`, `UTF`, and
`UUID` are acronyms, and `README` and `AGENTS` are filenames.

**`src/server/helpers.ts` — every surviving token is data.** `ENOENT`, `ENOTDIR`, and `EACCES` are
Node error codes; `DRIVER` is a `DatabaseError` code; `SQL`, `NULL`, `TEXT`, `ORDER`, `LIMIT`,
`OFFSET`, `LIKE`, `GLOB`, `INTEGER`, `REAL`, `BLOB`, `NUMERIC`, `CHAR`, `CLOB`, `INT`, `FLOA`, and
`DOUB` are SQL keywords, type names, and the affinity substrings `matchesSQLiteAffinity` tests;
`BINARY` is the collation name; `JSON`, `API`, `UTF`, and `ASCII` are acronyms.

**The rest of `src/**/*.ts` — data, plus the carried emphasis finding.** Outside
`guides/database.md` and `src/server/helpers.ts`, the preceding data classes account for every hit
except the emphasis sites listed under § Carried findings, which this unit's items do not name.

## Carried findings

Recorded against the capability that owns them, for the next change. Neither is inside this unit's
enumerated items.

1. **All-caps emphasis in `src/**` doc blocks outside the blocks D2 names.** Same defect class as
   D2, different blocks. Sites: `src/browser/drivers/IndexedDBDriver.ts:84`, `:89`, `:93`, `:99`,
   `:131`, `:132`, `:413`, `:417`, `:463`, `:665`, `:708`, `:713`; `src/browser/helpers.ts:11`,
   `:26`, `:33`, `:87`, `:101`, `:105`, `:107`, `:109`, `:129`, `:153`, `:172`, `:260`, `:264`,
   `:267`; `src/core/Table.ts:49`, `:52`, `:66`, `:206`, `:324`, `:395`, `:438`, `:466`, `:478`;
   `src/core/constants.ts:20`; `src/core/drivers/MemoryDriver.ts:34`, `:122`;
   `src/core/helpers.ts:133`, `:220`, `:224`, `:225`, `:233`, `:235`, `:236`, `:242`, `:264`,
   `:352`, `:777`, `:1117`, `:1118`, `:1124`, `:1138`, `:1139`, `:1143`, `:1198`, `:1838`;
   `src/core/types.ts:84`, `:208`, `:210`, `:212`, `:249`, `:442`, `:599`, `:804`, `:821`, `:982`;
   `src/server/compilers.ts:108`, `:121`, `:123`, `:128`, `:129`, `:133`, `:134`, `:160`, `:161`,
   `:168`, `:214`, `:252`, `:315`, `:428`; `src/server/drivers/JSONDriver.ts:588`, `:780`;
   `src/server/drivers/SQLiteDriver.ts:246`, `:249`, `:314`. Each sits in an `@remarks` body or a
   `//` comment, so none reaches a compared `Summary` cell and none is a parity risk today.
2. **`guides/database.md:298` points with `above`.** "stay in the Surface rows above" — the
   `.claude/rules/writing.md` § Code tokens, references, and links rule bans `above` as a pointer
   and takes `preceding`. The sentence sits beside item 5's edit; no item names it.

## Ancillary decisions

- `MAY` became `can`, not `may`: `.claude/rules/writing.md` § Voice and actor fixes `can` for an
  ability. `DO` and `DOES` became `do` and `does`, keeping the contrast the sentence draws against
  the driver that omits the hook.
- `DOC ↔ PUBLIC ENTRY` and `DOC ↔ SOURCE` became sentence case (`Doc ↔ public entry`,
  `Doc ↔ source`) rather than losing the arrow, because the arrow is the bijection's notation.
- `SQLiteDriverOptions`'s description became verb-first (`Options for` → `Configures`) while it was
  being edited for the entry point, matching `.claude/rules/typescript.md`'s TSDoc first-sentence
  rule.
- The emphasis fix in `src/server/helpers.ts` covered the whole file, because acceptance criterion 4
  sweeps that path and the remaining sites were the same defect in the same file. It did not extend
  to any other `src/**` file; those are carried findings.
- The conformance paragraph and the shipping paragraph were rewrapped after their substitutions.
  `oxfmt` accepts either wrap; the rewrap keeps the paragraph at the file's line width.
- `guides/database.md:2431`'s `UPGRADE` inside a fence comment was ruled data: it names the
  wrapper's `IndexedDBError` name, the same fact the `mapMigrationError` cell states.

## Instruments

Under `tmp/d7n-database-converge-fix/` in this checkout: `lower-emphasis.sed` (the guide's
line-scoped substitutions), `sweep-tokens.txt` (the closing sweep's token census), `check.log.txt`,
`guides.log.txt`, `policy.log.txt`, `core.log.txt`, and `start.txt`.
