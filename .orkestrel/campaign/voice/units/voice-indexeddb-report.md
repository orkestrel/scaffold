# Unit voice-indexeddb — report

Every TSDoc block under `src/` of `@orkestrel/indexeddb` opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0
at every step. The package has no `app/` directory, so the wave's `app/**` half is empty here.

## Counts by kind

| Kind                                        | Blocks |
| ------------------------------------------- | ------ |
| First sentence from the imperative           | 14     |
| First sentence given a verb                  | 28     |
| First sentence reworded to drop the symbol's name | 0 |
| Boolean `@returns` rewritten                 | 3      |

Blocks in the population: 42. Blocks rewritten: 42. Replacements applied: 45 (42 first sentences
plus 3 boolean `@returns` lines).

The imperative bucket: `Create` → `Creates` (`createIndexedDBDatabase`, `createIndex`), `Resolve`
→ `Resolves` (`promisifyRequest`, `promisifyTransaction`), `Run` → `Runs` (`guardSync`), `Read` →
`Reads` (`readRecord`, `readRecords`), `Build` → `Builds` (`rangeAboveKey`, `rangeFromKey`,
`rangeBelowKey`, `rangeToKey`, `rangePrefix`), `Map` → `Maps` (`wrapError`).

The verbless bucket took `Represents …` for a type, an interface, or the class that is that
entity; `Maps native …` for the `ERROR_CODES` mapping constant; and `Checks whether …` for the
three guards whose sentence opened `Whether …`. The scan's `Options for …` openers (
`IndexedDBDatabaseOptions`, `CursorOptions`) sat in the `third` bucket and are counted here as
verbless, which is what reading them shows.

No first sentence reproduced its own symbol's identifier, so nothing needed rewording on that
ground. Two sentences rewrapped to stay inside the 100-column `printWidth` the `.oxfmtrc.json`
file sets: the `IndexedDBStore` class block and the `IndexedDBStoreInterface` block.

## Files touched

- `/home/user/fleet/indexeddb/src/browser/IndexedDBCursor.ts` — class first sentence.
- `/home/user/fleet/indexeddb/src/browser/IndexedDBDatabase.ts` — class first sentence.
- `/home/user/fleet/indexeddb/src/browser/IndexedDBIndex.ts` — class first sentence.
- `/home/user/fleet/indexeddb/src/browser/IndexedDBStore.ts` — class first sentence, rewrapped.
- `/home/user/fleet/indexeddb/src/browser/IndexedDBTransaction.ts` — class first sentence.
- `/home/user/fleet/indexeddb/src/browser/IndexedDBTransactionStore.ts` — class first sentence.
- `/home/user/fleet/indexeddb/src/browser/constants.ts` — `ERROR_CODES` first sentence.
- `/home/user/fleet/indexeddb/src/browser/errors.ts` — two first sentences, one boolean `@returns`.
- `/home/user/fleet/indexeddb/src/browser/factories.ts` — `createIndexedDBDatabase` first sentence.
- `/home/user/fleet/indexeddb/src/browser/helpers.ts` — 14 first sentences, two boolean `@returns`.
- `/home/user/fleet/indexeddb/src/browser/types.ts` — 18 first sentences.

## Gates

| Command                 | Exit | Reading                                              |
| ----------------------- | ---- | ---------------------------------------------------- |
| `npm run format:check`  | 0    | All matched files use the correct format (52 files)  |
| `npm run lint:check`    | 0    | No output                                            |
| `npm run check`         | 0    | `tsc --noEmit` over the root and browser projects    |
| `npm run build`         | 0    | `dist/src/browser/index.js` 32.68 kB, built in 2.06s |
| `npm test`              | 0    | 8 + 1 + 1 + 2 + 1 test files passed                  |

No gate failed, so no failure excerpt exists. The mutating `npm run lint` and `npm run format`
never ran: `format:check` passed on the first attempt. `npm test` timing is an observation from
inside this unit's own exec; the Orchestrator's landing chain is the authoritative run.

## Verification

- Comment-only diff: every added and removed line in `git diff` starts with `*` or `/**` inside a
  comment. The count of changed lines that are not comment lines is 0.
- Voice: a re-run of the classifier over the tree reports every one of the 42 blocks third-person
  and no boolean `@returns` in another wording.
- `git status --short` lists only files under `src/browser/`. The rebuilt `dist/` is ignored.
- No guide or test pins a rewritten sentence. The `tests/guides.test.ts` file reads `@example`
  fences and barrel symbol names, both untouched; `guides/indexeddb.md` carries its own table
  descriptions, which no test compares against TSDoc text.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-indexeddb.diff`
- `/home/user/scaffold/tmp/units/voice/voice-indexeddb.status`

## Deviations

none
