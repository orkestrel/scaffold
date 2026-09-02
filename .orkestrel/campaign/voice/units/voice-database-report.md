# Unit voice-database — report

Every TSDoc block under `src/` of `/home/user/fleet/database` now opens with a third-person `-s`
verb sentence, and every boolean `@returns` reads `True if …; false otherwise`. The acceptance
instrument reports `files=33 blocks=191 imperative=0 verbless=0 returnsBad=0`, down from
`imperative=95 verbless=71 returnsBad=22` at launch. The package has no `app/` directory.

## Blocks rewritten by kind

| Kind                                            | Count |
| ----------------------------------------------- | ----- |
| First sentence from the imperative               | 95    |
| First sentence given a verb (verbless opener)    | 71    |
| First sentence reworded to drop the symbol's name | 7    |
| Boolean `@returns`                               | 22    |

The name-drop row is a subset of the verbless row, not an addition to it: `Cursor`,
`CursorInterface`, `Database`, `Table`, `TableInterface`, `Query`, and `QueryInterface` each
opened with a bare noun phrase that restated the symbol's own name, so the rewrite both supplied
the verb and dropped the name. The bucket split is the launch classifier's own, recomputed against
`HEAD` for exactly the blocks that changed, so it matches the launch population block for block.

## Files touched

Every file listed is under `src/`, and every changed line is a comment line.

- `src/browser/constants.ts` — `INDEXABLE_STORAGE` and `METADATA_STORE` open with `Lists` and `Names`.
- `src/browser/drivers/IndexedDBDriver.ts` — class summary reads `Implements the {@link DriverInterface} over IndexedDB`; `metadata`, `stamp`, `migrate` take the third person.
- `src/browser/factories.ts` — `Create` becomes `Creates`.
- `src/browser/helpers.ts` — `Plan`, `Map`, `Derive`, and `Project` openers take the third person.
- `src/browser/types.ts` — `QueryPlan` opens with `Represents`.
- `src/core/Cursor.ts` — `Walks a table's rows forward for bulk in-place mutation.`
- `src/core/Database.ts` — `Exposes a typed view over one shared internal lifecycle and storage context.`
- `src/core/DatabaseContext.ts` — `Owns the internal shared state behind every typed view of one database.`
- `src/core/DatabaseTransaction.ts` — `Binds a table-only database view to one driver transaction scope.`
- `src/core/DriverIterator.ts`, `src/core/ScopedIterator.ts`, `src/core/TransactionScope.ts` — each boundary summary opens with `Forms`.
- `src/core/Query.ts` — `Builds a fluent read bound to one table.`; `stream` reads `Evaluates … lazily`.
- `src/core/Table.ts` — class summary plus `count`, `aggregate`, `scan`.
- `src/core/cloners.ts` — `Clone` becomes `Clones` in each cloner.
- `src/core/constants.ts` — `DEFAULT_PRIMARY`, `MAX_PATTERN_LENGTH`, `CONFORMANCE_USERS_SCHEMA`, `CONFORMANCE_POSTS_SCHEMA`, and `CONFORMANCE_SCHEMA` open with `Supplies`, `Sets`, `Describes`, `Describes`, and `Holds`.
- `src/core/drivers/MemoryDriver.ts` — class summary plus `stream`, `snapshot`, `metadata`, `stamp`, `migrate`.
- `src/core/errors.ts` — `DatabaseError` opens with `Represents`; `isDatabaseError` gains the boolean `@returns` form.
- `src/core/factories.ts` — `Create` becomes `Creates` in both factories.
- `src/core/helpers.ts` — the wildcard, condition, row, schema, abort, and migration helpers, plus the boolean `@returns` lines of `equalsValue`, `matchesWildcardPattern`, `matchesCondition`, and `matchesQuery`.
- `src/core/types.ts` — every type, interface, member, and event-map summary, plus the boolean `@returns` lines of `TableInterface.update` and `TableInterface.remove`.
- `src/core/validators.ts` — `Test whether` becomes `Checks whether`; every boolean `@returns` line takes the required form.
- `src/server/compilers.ts` — every `Map`, `Compile`, and `Project` opener takes the third person.
- `src/server/constants.ts` — `EXACT_COLUMN_STORAGE` and `EXACT_RANGE_COLUMN_STORAGE` open with `Lists`, `METADATA_TABLE` with `Names`.
- `src/server/drivers/JSONDriver.ts` — class summary plus `stream`, `transaction`, `snapshot`, `stamp`, `migrate`.
- `src/server/drivers/SQLiteDriver.ts` — class summary plus `transaction`, `migrate`, `metadata`, `stamp`.
- `src/server/factories.ts` — `Create` becomes `Creates` in both factories.
- `src/server/helpers.ts` — the exactness, quoting, encode, decode, and index-name helpers, plus every boolean `@returns` line; `matchesAggregateExactly` takes the `Reports whether` opener its `matchesConditionExactly`, `matchesOrderExactly`, and `matchesQueryExactly` siblings already use.
- `src/server/types.ts` — `CompiledSQL` opens with `Represents`.

## Gate chain

| Command                | Exit | Note                                                              |
| ---------------------- | ---- | ----------------------------------------------------------------- |
| `npm run format:check` | 0    | no reformat needed, so the mutating `lint` and `format` pair never ran |
| `npm run lint:check`   | 0    | no output                                                          |
| `npm run check`        | 0    | root project plus the core, browser, and server source projects    |
| `npm run build`        | 0    | core, browser, server bundles emitted                              |
| `npm test`             | 0    | src, policy, config, setup, and guides projects all passed         |

No gate failed, so there is no failure excerpt. `npm test` timing is an observation: the guides
project alone ran 53.87s and the whole chain ran inside this unit's exec, so the Orchestrator's
landing run is the authoritative timing.

## Acceptance evidence

- `git diff` hunks: every changed line matches `^[+-]\s*(\*|/\*\*)`, and insertions balance deletions. A filter for changed lines that are not comment lines returns nothing.
- Changed lines carrying `@param`, `@remarks`, `@throws`, `@example`, `@typeParam`, or `@deprecated`: none. The changed `@returns` lines are exactly the boolean set the launch scan counted.
- `node .orkestrel/campaign/instruments/voice-scan.mjs` → `database files=33 blocks=191 imperative=0 verbless=0 returnsBad=0`.
- `git status --short` lists modified files under `src/` and nothing else.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-database.diff`
- `/home/user/scaffold/tmp/units/voice/voice-database.status`

## Deviations

none.

## Judgment calls inside the rule

These are wording decisions the deviation contract leaves to the unit, recorded so an auditor can
rule on them without re-deriving them.

- Each adverb-first rewrite moved the adverb behind the verb, because the scan's acceptance regex reads only the first word and an adverb opener would report as a residual imperative: `Structurally diff …` → `Diffs … structurally`, `Sequentially project …` → `Projects … sequentially`, `Lazily evaluate …` → `Evaluates … lazily`.
- `DatabaseInterface.migrate` carries one sentence whose verbs span several comment lines. The rewrite moved `Diff`, `apply`, and `return` to `Diffs`, `applies`, and `returns` together, because the trailing clauses belong to the first sentence and would otherwise disagree with its subject.
- The `IndexedDBDriver` and `SQLiteDriver` class summaries were re-wrapped across their opening comment lines so the longer opener keeps the file's wrap width. No later sentence moved.
- Domain nouns that are not the symbol's own name were kept: `database` in `DatabaseContext`, `migration` in `Migration`, `transaction` in `DatabaseTransaction`.
