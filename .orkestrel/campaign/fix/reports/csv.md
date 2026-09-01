# Fix report: csv

## Dispositions

- **s16-01** applied (src/core/inferers.ts,src/core/helpers.ts,src/core/shapers.ts,src/core/parsers.ts,src/core/index.ts,guides/csv.md,tests/src/core/inferers.test.ts,tests/src/core/helpers.test.ts,tests/src/core/parsers.test.ts): Applied the non-breaking half of the DRIFT-RESHAPE repair and deferred the rename half. Applied: extracted `inferColumnType`, `coerceInferred`, and `inferRows` into a new `src/core/inferers.ts` (the kind file the architecture table names for value inferers), added its barrel row, retargeted the `parsers.ts` and `shapers.ts` imports, rewrote both file-header comments so the dependency direction reads helpers -> inferers -> parsers/shapers, moved the mirrored tests into a new `tests/src/core/inferers.test.ts`, corrected the guide's `### Parsers` section (its table listed the whole `helpers.ts` tokenizer and coercer set as living in `parsers.ts`) and added an `### Inferers` section, and corrected `coerceReal`'s remark — `@orkestrel/contract` exports `parseNumber` and no `parseReal`, confirmed by reading its declaration files. Deferred: renaming `coerceInteger`/`coerceReal`/`coerceBoolean` to `parseInteger`/`parseReal`/`parseBoolean` in `parsers.ts` renames exported symbols, which the breaking test defers whole; the three naming `@remarks` therefore stay, because they justify names that stay.
- **s16-02** applied (src/core/helpers.ts,src/core/shapers.ts,src/core/CSV.ts,guides/csv.md,tests/src/core/helpers.test.ts,tests/src/core/shapers.test.ts): Moved `deriveShapes` into `src/core/shapers.ts` beside `columnTypeShape` and repointed `CSV.ts` to `./shapers.js`. `helpers.ts` now imports nothing from `shapers.ts` (and nothing from `validators.ts` either, after s16-04), so the leaf file no longer reaches up into a kind file. Moved its guide row into the Shapers table and its describe block into `shapers.test.ts`. The barrel star-exports both files, so the published name is unchanged.
- **s16-03** deferred_breaking: Re-verified against the current tree: `renderTSV` is still the one-line delegate at `src/core/helpers.ts:446`, it still discards a caller-supplied `delimiter`, and `guides/csv.md:244-246` still states that tab-separated output is a `renderCSV` dialect rather than a separate operation. Deleting it removes an exported symbol, so nothing was applied — the guide row, the prose, and the `### Rendering to TSV` fence all stay while the symbol ships.
- **s16-04** applied (src/core/validators.ts,src/core/helpers.ts,guides/csv.md,tests/src/core/validators.test.ts,tests/src/core/helpers.test.ts): Moved `isRowList` from `validators.ts` to `helpers.ts` under the same name, placed beside its only caller `renderCSV`, and dropped the now-unused `Row` type import from `validators.ts`. Moved its guide row from the Validators table to the Helpers table (widening the row to the full signature the Helpers table's columns carry) and its describe block into `helpers.test.ts`. `validators.ts` now holds only total `Guard<T>` values.
- **s16-05** deferred_breaking: Re-verified: `types.ts:204` still declares `readonly comment?: string | false` and `constants.ts:18` still defaults it to `false`, so the sentinel is real. Dropping `false` removes a published union member from an option key, and replacing `Required<ParseOptions>` with a `ResolvedParseOptions` alias is a non-additive change to `resolveParseOptions`'s published return type and to the parameter type of every `scan*` leaf. Nothing was applied.
- **s16-06** applied (src/core/shapers.ts,guides/csv.md): Reworded the first sentence to name what the value is — the `ContractShape` of a `CSVTable`'s JSON-serializable projection — and added an `@remarks` stating that the shape is narrower than the declared `CSVTable` type and that `isCSVTable` is the guard for that declared type. Mirrored the correction into the guide's Shapers table row, which carried the same false claim. I falsified the original sentence by running it before editing: for `{ columns: ['a'], rows: [{ a: () => 1 }] }` and `{ columns: ['a'], rows: [{ a: undefined }] }` the compiled shape returns `false` where `isCSVTable` returns `true`. New prose is third person per the fleet TSDoc ruling.
- **s16-07** deferred_wave: Re-verified that the imperative first sentences are still there — `helpers.ts` alone still carries 15 ("Validate a delimiter…", "Merge `options`…", "Scan one quoted field…") and `factories.ts` two ("Create a working…"). The finding's only repair is first-sentence voice, and the guide table cells it names already use the third person, so the fleet ruling defers it to the dedicated wave. Its line numbers are now stale: `helpers.ts` lost 154 lines to the s16-01/s16-02 moves, `isRowList` moved from `validators.ts` into `helpers.ts`, and `inferColumnType`/`coerceInferred`/`inferRows` moved into the new `src/core/inferers.ts`. The wave must re-derive the population rather than use the recorded offsets. Every sentence I moved was moved verbatim, so none of them changed voice here.

## Gates

- npm run format:check: pass — All matched files use the correct format. Finished in 2537ms on 47 files using 4 threads.
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — exit 0, no output
- npm run check: pass — tsc --noEmit --project tsconfig.json && tsc --noEmit -p configs/src/tsconfig.core.json — exit 0, no diagnostics
- npm run build: pass — 12 modules transformed; dist/src/core/index.js 55.54 kB; dist/src/core/index.cjs 57.37 kB; Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts
- npm test: pass — src:core 7 files / 229 tests passed; policy 111 passed; config 46 passed; setup 15 passed; guides 18 passed
- npm run test:distribution (extra, outside the required chain): pass — Test Files 1 passed (1); Tests 9 passed (9); Duration 6.51s

## Diffstat

```text
 guides/csv.md                     | 144 ++++++++++++++++-------------
 src/core/CSV.ts                   |   2 +-
 src/core/helpers.ts               | 184 +++++---------------------------------
 src/core/index.ts                 |   1 +
 src/core/parsers.ts               |   3 +-
 src/core/shapers.ts               |  65 ++++++++++++--
 src/core/validators.ts            |  17 +---
 tests/src/core/helpers.test.ts    |  68 +++-----------
 tests/src/core/parsers.test.ts    |  34 -------
 tests/src/core/shapers.test.ts    |  31 ++++++-
 tests/src/core/validators.test.ts |  20 +----
 11 files changed, 207 insertions(+), 362 deletions(-)

Untracked (not counted by `git diff --stat`): src/core/inferers.ts (122 lines), tests/src/core/inferers.test.ts (69 lines).
```

- dist moves: true

## Deviations

Three items the work order must carry, none of which blocked the unit.

1. s16-01 is the only split disposition. Its deferred half is a work-order item in its own right: move `coerceInteger`, `coerceReal`, and `coerceBoolean` out of `src/core/helpers.ts` into `src/core/parsers.ts` under the names `parseInteger`, `parseReal`, and `parseBoolean`, delete the three naming `@remarks` that justify the `coerce*` form (including the `parseNumber` correction I made to `coerceReal`, which exists only to keep those names honest while they ship), and update the guide's Helpers table rows. That rename moves the published surface and earns the version bump the audit lane named. Because the disposition reads `applied`, this item is easy to lose — it is stated here so it cannot be.

2. The two lane corrections under s16-01 did not conflict; the DRIFT-RESHAPE lane's `inferers.ts` extraction is the concrete resolution to the three gaps the DRIFT lane left open (the `helpers.ts` <-> `parsers.ts` cycle, `coerceInferred` returning `unknown` rather than `T | undefined`, and the imprecise `coerceReal` quote). I applied what they share. I confirmed `inferers.ts` is a recognized kind file in the vendored policy sweep (`CENTRAL_SOURCE_FILES` and `FUNCTION_SOURCE_FILES` in `tests/setupPolicy.ts`) and that it carries no name-prefix gate, so `coerceInferred` sits there legally under its existing name.

3. Two test files were created or restructured beyond a strict reading of "do not create tests": `tests/src/core/inferers.test.ts` is new, and describe blocks moved between `helpers.test.ts`, `parsers.test.ts`, `shapers.test.ts`, and `validators.test.ts` to follow the code. No test was deleted and no assertion changed — the src:core project ran 229 tests before and after. I judged this required by the repair, because `.claude/rules/tests.md` mirrors tests to modules and s16-01 creates a module. One pre-existing placement drift stays, tied to the deferred rename: the `coerceInteger`/`coerceReal`/`coerceBoolean` describes remain in `parsers.test.ts` while the code remains in `helpers.ts`. Moving them now would be undone by the rename, so the work-order item in (1) should carry them.

Two ancillary decisions I made and recorded rather than stopping on: the guide's `### Parsers` intro and `## Tests` entries were rewritten to match where the code now lives (the repair changed what those sentences describe), and the `csvTableShape` correction under s16-06 was mirrored into the guide's Shapers table row, which carried the same untrue claim as the TSDoc.

No off-limits file appears in `git status`. The tree is uncommitted and HEAD is unchanged at d93a676.
