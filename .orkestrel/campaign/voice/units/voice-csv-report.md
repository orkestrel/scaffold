# Unit voice-csv — report

Every TSDoc block under `src/` of `/home/user/fleet/csv` opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0 at
every step. The package has no `app/` directory.

## Counts by kind

| Kind                                              | Blocks |
| ------------------------------------------------- | ------ |
| First sentence from the imperative                 | 28     |
| First sentence given a verb (was verbless)         | 75     |
| First sentence reworded to drop the symbol's name  | 1      |
| Boolean `@returns` rewritten                       | 7      |

Distinct blocks rewritten: 104 of 126. The `name` row overlaps the `verbless` row (the `CSV` class
summary opened `A parsed, queryable CSV document -`, which both lacked a verb and named the class),
and six of the seven `@returns` rewrites sit in blocks whose first sentence also changed
(`isCSVError`, `needsQuote`, `isRowList`, `isBreakChar`, `isCSVTable`, `isColumnType`). Only
`parseBoolean` changed its `@returns` alone.

The launch scan reported `imperative=28 verbless=65`. The `verbless` count here is 75 because the
classifier scored ten bare noun phrases as third person — their first word ends in `s` or sits in
the classifier's excluded set: `Malformations found …` (`types.ts` `FieldScan.errors`,
`RecordScan.errors`), `Errors collected …` (`types.ts` `HeaderResult.errors`,
`RecordsResult.errors`, `CSVParseResult.errors`, `CSVInterface.errors`, and the `CSV.ts` `errors`
getter), and `Options for …` (`types.ts` `ParseOptions`, `RenderOptions`, `ExportOptions`). Each was
rewritten to a form the classifier still scores third person, so the acceptance instrument stays at
zero.

## Files touched

- `/home/user/fleet/csv/src/core/types.ts` — 53 first sentences: `Represents …` for every interface,
  type alias, and result shape; `Holds …` for a stored data property; `Lists …` for a collection
  property; `Names …` for a literal union; `Reports whether …` for the boolean `RawField.quoted`;
  `Returns …` for the `stream` method.
- `/home/user/fleet/csv/src/core/helpers.ts` — 26 first sentences moved to the third person
  (`Validates`, `Merges`, `Disambiguates`, `Guards`, `Serializes`, `Derives`, `Wraps`, `Renders`,
  `Selects`, `Narrows`, `Advances`, `Consumes`, `Scans`, `Resolves`, `Builds`, `Implements`,
  `Checks`), plus the `needsQuote`, `isRowList`, and `isBreakChar` boolean `@returns`.
- `/home/user/fleet/csv/src/core/constants.ts` — 10 first sentences to `Names …`, `Holds …`,
  `Lists …`, and `Sets …`.
- `/home/user/fleet/csv/src/core/CSV.ts` — class summary to `Wraps a typed {@link CSVTable} …`;
  the three getters and `stream` to `Returns …`.
- `/home/user/fleet/csv/src/core/validators.ts` — `Determine` to `Determines` twice, and both
  boolean `@returns`.
- `/home/user/fleet/csv/src/core/shapers.ts` — `columnTypeShape` to `Returns …`, `csvTableShape` to
  `Represents …`, `Derive` to `Derives`.
- `/home/user/fleet/csv/src/core/errors.ts` — `CSVError` summary to `Represents …`, `Narrow` to
  `Narrows`, and the `isCSVError` boolean `@returns`.
- `/home/user/fleet/csv/src/core/factories.ts` — `Create` to `Creates`, `Compile` to `Compiles`.
- `/home/user/fleet/csv/src/core/parsers.ts` — the `parseBoolean` `@returns` only.

Diffstat: 9 files changed, 159 insertions(+), 145 deletions(-).

## Gates

| Command                | Exit | Note                                                            |
| ---------------------- | ---- | --------------------------------------------------------------- |
| `npm run format:check` | 0    | 47 files, correct format                                         |
| `npm run lint:check`   | 0    | no output                                                        |
| `npm run check`        | 0    | root, then `configs/src/tsconfig.core.json`                      |
| `npm run build`        | 0    | esm + cjs + declarations emitted                                 |
| `npm test`             | 0    | src 231, policy 111, config 46, setup 15, guides 18 — all passed |

No mutating `lint` or `format` run was needed; `format:check` passed on the first attempt.

Acceptance instrument after landing: `voice-scan.mjs` reports
`csv files= 11 blocks= 126 imperative= 0 verbless= 0 returnsBad= 0`.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-csv.diff`
- `/home/user/scaffold/tmp/units/voice/voice-csv.status`

`git status --short` lists only the nine `src/core/*.ts` files. Every diff hunk line begins with
` * ` or `/** `, checked by filtering the diff for a changed line that is not a comment line, which
returned nothing. Every `@param`, `@remarks`, `@throws`, and `@example` line is byte-identical to
the launch tree: the only changed tag lines are the seven boolean `@returns` lines.

## Decisions taken inside the rule

- Verb choice by symbol kind: `Represents …` for an interface, type alias, class summary, and shape
  value; `Names …` for a literal union and a single-token constant; `Holds …` for a stored data
  property and a frozen options table; `Lists …` for a collection property; `Returns …` for a class
  getter and a method; the concrete action verb (`Parses`, `Scans`, `Renders`) for a function.
- Class getters read `Returns …` while the matching `CSVInterface` properties read `Holds …` /
  `Lists …`. A getter returns a value on call; an interface data property holds one. The two files
  carried the same sentence before, so this is a deliberate divergence, not drift.
- `parseBoolean` returns `boolean | undefined`, so the `True if …; false otherwise` form cannot state
  its third outcome. Its `@returns` became
  `The matching boolean for {@link BOOLEAN_TRUE} or {@link BOOLEAN_FALSE}; \`undefined\` otherwise`,
  which keeps every outcome and both links, and the acceptance instrument no longer counts it.
- `needsQuote` opened with the bare noun phrase `The correctness floor every {@link QuoteStyle}
  policy respects`. The rewrite keeps that noun phrase and its trailing clause intact and puts the
  predicate's action first: `Checks \`field\` against the correctness floor …`.
- `uniqueColumns` opened `Deterministically disambiguate …`. Leading with an adverb leaves the verb
  off the first word, so the sentence became `Disambiguates a header's column names
  deterministically - …`, which keeps the adverb and every later clause.
- `renderRecord`'s first sentence carried three parallel imperatives (`Render … - serialize …,
  sanitize …, then apply …`). All four moved to the third person together; leaving the trailing three
  imperative would break agreement with the new subject inside one sentence.
- `MAX_ERRORS` reads `Sets the maximum number of …` rather than `Caps …` so that the later clause's
  `once reached` keeps `the maximum number` as its referent.
- The `HeaderResult.errors` sentence needed 101 columns as a single-line block, over the 100-column
  `printWidth`, so it became a multi-line block. Its words are otherwise unchanged.
- Prose that resembles a symbol name was kept where it is the domain term or the value's own name:
  `@orkestrel/database`'s `ColumnType` in the `ColumnType` alias (it names the other package's type,
  which is the point of that sentence), `the boolean \`true\`` in `BOOLEAN_TRUE`, `the separator` in
  `SUFFIX_SEPARATOR`, and `CSV layer` in `CSVError`.
- `isColumnType`'s `@returns` keeps `one of the six {@link ColumnType} literals`. The wave's rule is
  to keep the condition's substance, so the wording moved and the substance did not.

## Observations

- `guides/csv.md` echoes two of the old first sentences in its surface table: the `needsQuote` row
  ("The correctness floor every quoting policy respects — `true` when `field` contains …") and the
  `isBreakChar` row ("Whether `char` starts a record separator (CR or LF)."). The guide is off-limits
  to this unit and no test compares those strings — `tests/guides.test.ts` checks symbol, method,
  fence, and link parity only, and it passes. Route the guide to a later unit if the wave wants that
  voice there too.
- `npm test` timing is reported as an observation; the authoritative run is the Orchestrator's
  landing chain.

## Deviations

none
