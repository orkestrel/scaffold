# Unit voice-interpret — report

Every TSDoc block under `src/` of `/home/user/fleet/interpret` opens with a third-person `-s` verb
and never repeats its symbol's name; every boolean `@returns` reads `True if …; false otherwise`.
The tree carries no non-comment change and the gate chain exits 0 at every step.

The package has no `app/` directory, so the sweep covered `src/**` only.

## Counts by kind

Blocks in the population: 141 (`grep -c '/\*\*'` over `src/**/*.ts`). Blocks whose first sentence
changed: 140. The one untouched block is `RecordFunction` in `src/core/types.ts`, whose first
sentence already read `Builds one concrete record …`.

| Kind                                             | Blocks |
| ------------------------------------------------ | ------ |
| First sentence from the imperative                | 41     |
| First sentence given a verb (bare noun phrase)    | 93     |
| First sentence reworded to drop the symbol's name | 6      |
| Boolean `@returns` rewritten                      | 13     |

The three first-sentence rows are disjoint and sum to 140. The `@returns` row is independent of
them: 12 of its lines sit in `src/core/validators.ts` and one in `src/core/errors.ts`.

The six name-drop rewordings:

- the five stage classes, where `The \`Clarifier\` stage: …` named the class itself. Each now names
  the pipeline stage literal from `INTERPRET_STAGES` instead: `Implements the clarify stage: …`,
  and likewise `extract`, `format`, `generate`, `normalize`.
- `scoreSimilarity` in `src/core/helpers.ts`, where `Bigram (Dice coefficient) string similarity,
  case-insensitive.` would have become `Scores … similarity` and restated the identifier. It reads
  `Measures bigram (Dice coefficient) string similarity, case-insensitive.`

## Verb vocabulary

Openers across the 141 blocks, matching the forms the earlier packages in this wave landed:
`Represents` 54, `Names` 13, `Implements` 12, `Determines` 12, `Creates` 11, `Fires` 10, `Lists` 4,
`Renders` 3, `Holds` 3, and one each of `Assigns`, `Builds`, `Classifies`, `Collapses`, `Collects`,
`Computes`, `Describes`, `Escapes`, `Evaluates`, `Finds`, `Measures`, `Mines`, `Narrows`, `Parses`,
`Replaces`, `Returns`, `Scores`, `Splits`, `Writes`.

## Files touched

All under `/home/user/fleet/interpret/`:

- `src/core/Interpret.ts`
- `src/core/InterpretContext.ts`
- `src/core/Narrator.ts`
- `src/core/constants.ts`
- `src/core/errors.ts`
- `src/core/factories.ts`
- `src/core/helpers.ts`
- `src/core/managers/DefinitionManager.ts`
- `src/core/managers/RecordManager.ts`
- `src/core/managers/SubjectManager.ts`
- `src/core/managers/TemplateManager.ts`
- `src/core/parsers.ts`
- `src/core/stages/Clarifier.ts`
- `src/core/stages/Extractor.ts`
- `src/core/stages/Formatter.ts`
- `src/core/stages/Generator.ts`
- `src/core/stages/Normalizer.ts`
- `src/core/types.ts`
- `src/core/validators.ts`

`git diff --stat`: 19 files changed, 157 insertions(+), 157 deletions(-).

## Gates

Run from `/home/user/fleet/interpret`, in order. No step failed, so no excerpt is recorded.

| Command                | Exit | Reading                                             |
| ---------------------- | ---- | --------------------------------------------------- |
| `npm run format:check` | 0    | All matched files use the correct format (69 files) |
| `npm run lint:check`   | 0    | No diagnostic                                       |
| `npm run check`        | 0    | No diagnostic                                       |
| `npm run build`        | 0    | Built in 2.90s, `index.d.cts` copied                |
| `npm test`             | 0    | 281 + 111 + 46 + 30 + 73 tests passed, 21 files     |

`npm run lint` and `npm run format` were not needed: `format:check` passed on the first run.

`npm test` is an observation, per the brief — the Orchestrator's landing chain is the authoritative
run. The scoped gates (`format:check`, `lint:check`, `check`, `build`) cover the owned files.

## Acceptance evidence

1. Comment-only diff: `git diff -U0 | grep -E '^[+-]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[+-]\s*(\*|/\*\*|\*/)'` returns nothing.
2. Voice scan after the sweep: `node .orkestrel/campaign/instruments/voice-scan.mjs` reports
   `interpret files=20 blocks=141 imperative=0 verbless=0 returnsBad=0`, against the launch reading
   `imperative=54 verbless=73 returnsBad=13`. A first-word tally over all 141 blocks confirms every
   opener is a third-person `-s` verb, which the scan's own classifier cannot show: its `THIRD`
   pattern accepts `Options` and `Cross` as verbs, so 13 blocks it passed at launch were bare noun
   phrases and were rewritten by reading.
3. Tag lines: the only `@`-tag lines in the diff are the 13 `@returns` lines. No `@param`,
   `@remarks`, `@throws`, or `@example` line changed.
4. Gate chain exits 0 at every step, as recorded earlier.
5. `git status --short` lists 19 paths, all under `src/`.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-interpret.diff`
- `/home/user/scaffold/tmp/units/voice/voice-interpret.status`

## Deviations

None.

## Judgment calls, recorded

These are wording choices the deviation contract leaves to the unit. They are recorded, not raised.

- An interface doc keeps a backticked name that belongs to a different symbol. `NormalizerInterface`
  keeps `Represents the \`Normalizer\` stage contract: …` because `Normalizer` is the class, not the
  documented symbol; the class's own block drops it. `NarratorInterface` keeps
  `Represents the \`Narrator\` contract — …` for the same reason.
- An `*Options` interface reads `Represents the options for …`, the form the earlier packages in
  this wave used, rather than `Configures …`. It preserves the noun phrase the emitter fixup ruled
  for.
- A colon expansion after the opening verb stays byte-identical, including where it is imperative
  (`Represents a declaratively computed field: evaluate \`expression\` …`). The wave changes the
  opening verb and the boolean `@returns` line only.
- Four blocks in `src/core/constants.ts` show two changed lines each. The added verb pushed one word
  onto the following line of the same first sentence; no word was dropped and no later sentence
  moved.
