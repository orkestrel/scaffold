# Unit voice-contract — report

Every TSDoc block under `src/` of `/home/user/fleet/contract` opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0 at
every step. No deviations.

## Acceptance instrument

The Orchestrator's `voice-scan.mjs` file, run against the landed tree:

```text
contract    files= 21 blocks= 446 imperative=   0 verbless=   0 returnsBad=   0
```

Launch baseline for the same command: `imperative= 261 verbless= 152 returnsBad=  16`.

The scan's buckets under-report: an opener whose first word ends in `s` is read as third person, so
every `Options for …` opener passed the classifier while opening on a noun. Those blocks were
swept by reading and now open `Groups the options for …`.

## Blocks rewritten, by kind

- First sentence from the imperative, inflected to the `-s` form: 259.
- First sentence given a verb (verbless opener, noun phrase kept): 145.
- First sentence reworded to drop the symbol's name: 20 — the `ContractError` class, the
  `ShapeValidator` class, and the `Parser`, `ContractShape`, `Infer`, `FieldPath`, `LiteralValue`,
  `AnyConstructor`, `StringShape`, `NumberShape`, `BooleanShape`, `NullShape`, `LiteralShape`,
  `ArrayShape`, `ObjectShape`, `UnionShape`, `OptionalShape`, `NullableShape`, `JSONShape`, and
  `RawShape` types. Two of these came from the imperative bucket and the rest from the verbless one,
  so the three first-sentence counts partition the 424 blocks swept.
- Boolean `@returns` rewritten to `True if …; false otherwise`: 16.

## Files touched

All under `src/core/` of `/home/user/fleet/contract`: `ContractCompiler.ts`, `JSONCloner.ts`,
`SampleInferer.ts`, `SchemaCloner.ts`, `SchemaShaper.ts`, `ShapeCloner.ts`, `ShapeValidator.ts`,
`ValueInferer.ts`, `cloners.ts`, `combinators.ts`, `compilers.ts`, `constants.ts`, `errors.ts`,
`factories.ts`, `helpers.ts`, `inferers.ts`, `parsers.ts`, `shapers.ts`, `types.ts`,
`validators.ts`. Diffstat: 456 insertions, 456 deletions.

## Gates

| Command                | Exit |
| ---------------------- | ---- |
| `npm run format:check` | 0    |
| `npm run lint:check`   | 0    |
| `npm run check`        | 0    |
| `npm run build`        | 0    |
| `npm test`             | 0    |

`npm test` reported 1327 passing in `test:src`, 111 in `test:policy`, 46 in `test:config`, 61 in
`test:setup`, and 65 in `test:guides`, with no failures. Report the `npm test` timing as an
observation: the run happened inside this unit's own exec, so the Orchestrator's landing chain is
the authoritative reading.

## Scope evidence

- `git diff -U0` filtered to changed lines outside a comment marker returns nothing, so every hunk
  sits inside comment text.
- No changed line carries `@example`, `@param`, `@remarks`, `@throws`, `@typeParam`, or
  `@deprecated`; the only changed tag lines are the 16 `@returns` lines listed in the diff.
- `git status --short` lists only files under `src/core/`.
- Evidence files: `/home/user/scaffold/tmp/units/voice/voice-contract.diff` and
  `/home/user/scaffold/tmp/units/voice/voice-contract.status`.

## Judgment calls inside the rule

- The `INTRINSICS` table's members open `Captures \`Object.freeze\` — …`. The captured host
  operation is the value's own name, which the brief's lessons keep, so the backticked token stays
  and only the verb is added.
- A `ContractCompiler` getter and its `ContractCompilerInterface` member both open `Returns …`, so
  the class and the interface read the same way.
- A `*_LIMIT` constant opens `Caps …`; `INFER_BREADTH_LIMIT` and `INFER_ENUM_LIMIT` open
  `Caps by default …` because their bound is overridable per call.
- The guard family in `validators.ts` keeps its house form `Determines whether a value is …`. The
  `isDefined` guard's sentence therefore still spells its own name; rewriting that one alone would
  break the family, and rewriting the family is outside this wave.
- The `literalShape` builder keeps `Builds a literal shape from a fixed set of primitive values.`
  Its siblings each name the shape type they build, and dropping the noun would need a
  `{@link LiteralShape}` token the sentence did not carry.

## Deviations

None.
