# Fix dossier: csv

Verified fix-producing findings for the `csv` package. DRIFT: the finding's own repair
stands. DRIFT-RESHAPE: the violation is real and the corrected repair under Verification
replaces the finding's repair line. Re-verify each finding against the current tree before
applying; the audit predates the dependency update commits and any later merges.

## s16-01 — DRIFT-RESHAPE

1. package=csv file=src/core/helpers.ts:1026,1103,1130,1155 rule=.claude/rules/architecture.md § Kind purity; .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
   wrong: `coerceInferred`, `coerceInteger`, `coerceReal`, and `coerceBoolean` are flat coercers returning `T | undefined` — the exact kind `parsers.ts` owns — and they sit in `helpers.ts` with an `@remarks` (lines 1090-1093, 1113-1117, 1139-1143) stating they were named `coerce*` to avoid confusion with `@orkestrel/contract`'s `parseInteger` / `parseBoolean`, which is the name choosing the file that § Kind purity forbids ("Never let the name choose").
   repair: move the four into `src/core/parsers.ts` and rename them `parseInferred` / `parseInteger` / `parseReal` / `parseBoolean`, update the three importers (`helpers.ts` internal calls, `parsers.ts`, the guide's Parsers table), and delete the naming `@remarks` — the barrel star-exports both files, so only the names move. Correct `coerceReal`'s remark while editing it: it says "same-named `parseReal`" and `@orkestrel/contract` exports no `parseReal` (its coercer is `parseNumber`).

### Verification

**Judge (DRIFT-RESHAPE/high):** The violation is real and the git history convicts rather than exonerates: at f1c603c the coercers sat in parsers.ts under coerce* names (right file, wrong name), and a40fe64 moved them out to satisfy the parsers.ts prefix gate at tests/setupPolicy.ts:568 while keeping the published names unchanged

**Lane DRIFT/high:** amend: keep the direction (move the coercers into `parsers.ts` under `parse*` names) but close three gaps the repair leaves open. First, `inferRows` (helpers.ts:1063) calls `coerceInferred`, so moving the coercers as written makes `helpers.ts` import `parsers.ts` while `parsers.ts:4` still imports `helpers.ts` — the cycle helpers.ts:41-43 explicitly forbids ("this file must NEVER import back from `parsers.ts`"). Decide that edge and rewrite both file-header comments in the same change. Second, `coerceInferred` returns `unknown`, not `T | undefined`, so `parseInferred` would not satisfy `.claude/rules/names.md` § Fixed derivation/construction forms ("`parse*`: coercion producing `T | undefined`"); rule on it as a dispatch before renaming it. Third, the `coerceReal` remark actually reads "same-named `parseReal`-adjacent coercers", which already hedges — the correction still stands (contract ships `parseNumber`) but the finding's quote is imprecise.

**Lane DRIFT-RESHAPE/high:** amend: move only the three flat coercers `coerceInteger`/`coerceReal`/`coerceBoolean` into `src/core/parsers.ts` as `parseInteger`/`parseReal`/`parseBoolean`; extract `coerceInferred`, `inferRows`, and `inferColumnType` into a new `src/core/inferers.ts` (the kind file the architecture table names for value inferers), which may import `parsers.ts` without a cycle; update `CSV.ts`/`parsers.ts` imports and the barrel row; delete the three naming `@remarks`; take the version bump. Also correct the guide's `### Parsers` section, whose table lists the whole `helpers.ts` tokenizer set as living in `parsers.ts` (guides/csv.md:131-158).

## s16-02 — DRIFT

2. package=csv file=src/core/helpers.ts:512 rule=.claude/rules/architecture.md § Centralized-file pattern (Shape values → `*/shapers.ts`); § Kind purity verdict=CONFIRMED
   wrong: `deriveShapes` produces `ContractShape` values (a `Columns` map) and lives in `helpers.ts`, which forces the leaf file to import `columnTypeShape` from `shapers.ts` at line 34 — an edge from the leaf pair up into a kind file § Kind purity says is never consumed by it.
   repair: move `deriveShapes` into `src/core/shapers.ts` beside `columnTypeShape`, and update `CSV.ts:12` to import it from `./shapers.js`. `helpers.ts` then imports nothing from `shapers.ts`.

## s16-03 — DRIFT

3. package=csv file=src/core/helpers.ts:489 rule=.claude/rules/architecture.md § Wrapper test verdict=CONFIRMED
   wrong: `renderTSV` is a one-line delegate that only overrides one data value (`delimiter: '\t'`), adding no boundary, invariant, or narrower contract; `guides/csv.md:232-234` states outright that `renderCSV` with `delimiter: '\t'` is the same operation, and `.claude/rules/names.md` § Split behavioral variants classifies a value selecting a datum for the same operation as data, not a separate function. It also silently discards a caller-supplied `delimiter`.
   repair: delete `renderTSV`, delete its guide row (line 128) and the "Rendering to TSV" pattern fence (lines 440-446), and replace the fence with `renderCSV(table, { delimiter: '\t' })`.

## s16-04 — DRIFT

4. package=csv file=src/core/validators.ts:52 rule=.claude/rules/patterns.md § Validation and contracts; .claude/rules/architecture.md § Kind purity verdict=CONFIRMED
   wrong: `isRowList` is typed `(source: CSVTable | readonly Row[]) => source is readonly Row[]`, so it is a union narrower rather than the total `(unknown) => value is T` guard `validators.ts` is defined to hold; a consumer cannot call it on an `unknown`, which the file's own header comment and `guides/csv.md:170-171` both promise of everything in it.
   repair: move `isRowList` to `src/core/helpers.ts` — the file § Kind purity assigns to a predicate that is not a `Guard<T>` — keeping the name, and update `helpers.ts:35` to a local reference and the guide's Validators table row (line 176) to a Helpers row.

## s16-05 — DRIFT

5. package=csv file=src/core/types.ts:204 rule=AGENTS.md § Design laws (Absence is `undefined`) verdict=CONFIRMED
   wrong: `comment?: string | false` uses the literal `false` as the "comment handling disabled" sentinel while `undefined` already carries that meaning; `constants.ts:18` defaults it to `false`, so `{ comment: undefined }` and `{ comment: false }` are the same state expressed two ways.
   repair: declare `comment?: string`, drop `comment` from `DEFAULT_PARSE_OPTIONS`, and replace `Required<ParseOptions>` with a `ResolvedParseOptions` alias shaped like the existing `ResolvedRenderOptions` (`types.ts:249`) that keeps `comment` optional; `scanComment` (`helpers.ts:617`) then tests `options.comment === undefined`.

## s16-06 — DRIFT

6. package=csv file=src/core/shapers.ts:62 rule=.claude/rules/documentation.md § Parity (falsify a prose claim); .claude/rules/patterns.md § Validation and contracts verdict=CONFIRMED
   wrong: the TSDoc calls `csvTableShape` "The `ContractShape` of a `CSVTable`", but `CSVTable.rows` is `readonly Row[]` where `Row = Record<string, unknown>` (`types.ts:11,21`) and the shape requires `recordShape(jsonShape())`, so the shape rejects values the declared type admits and disagrees with `isCSVTable` (`validators.ts:36`) on the same input. The divergence itself is deliberate and tested — `guides/csv.md:489-491` names the "leniency-lock cases against `csvTableShape`" — but the sentence claiming shape-of-`CSVTable` is not true of the shipped value.
   repair: reword the first sentence to state what the value is — the JSON-serializable projection of a `CSVTable`, narrower than the declared `CSVTable` type — and say in `@remarks` that `isCSVTable` is the guard for the declared type.

## s16-07 — DRIFT

7. package=csv file=src/core/helpers.ts:47,75,100,123,166,192,218,242,271,315,377,408,433,493,546,572,596,628,668,763,782,896,956,1014,1041,1083,1109,1135; src/core/validators.ts:13,42,57; src/core/factories.ts:7,35 rule=.claude/rules/typescript.md § Comments and API documentation verdict=CONFIRMED
   wrong: the TSDoc first sentence of nearly every public function is imperative ("Validate a delimiter…", "Merge `options`…", "Scan one quoted field…", "Create a working…"), not the required third person with an `-s` verb; `parseCSV` ("Parses", `parsers.ts:12`) and `readRecords` ("Splits", `helpers.ts:827`) show the intended form, so the file is internally inconsistent as well.
   repair: rewrite each first sentence in third person ("Validates…", "Merges…", "Scans…", "Creates…"), and mirror the change into the matching guide table cells, which already use the third person.

