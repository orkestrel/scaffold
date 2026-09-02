# Unit voice-program — report

Every TSDoc block under `src/` of `/home/user/fleet/program` opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0 at
every step. The package has no `app/` directory.

## Counts by kind

Applied edits: 86 (71 first sentences, 15 boolean `@returns`). The first-sentence buckets partition
the 71.

| Kind                                                | Count |
| --------------------------------------------------- | ----- |
| First sentence from the imperative                   | 38    |
| First sentence given a verb                          | 31    |
| First sentence reworded to drop the symbol's name    | 2     |
| Boolean `@returns` rewritten                         | 15    |

The launch scan (`instruments/voice-scan.mjs`) reported blocks=78, imperative=43, verbless=25,
returnsBad=15. The buckets moved as the brief warned: 5 blocks the scan bucketed imperative were
noun phrases (`src/core/types.ts` lines 32, 43, 56, 90, 184), and 3 verbless blocks sat in the
conforming bucket because their first word ended in `-s` (`src/core/constants.ts:16`
"Status tally precedence order", `src/core/types.ts:209` and `:258` "Options for …"). The two
name-dropping rewrites are the `Program` and `ProgramManager` class blocks, which were also
verbless; they are counted once, in the name bucket.

After the sweep the same instrument reports: `files=9 blocks=78 imperative=0 verbless=0
returnsBad=0`.

## Voice chosen

The package now follows the voice the migrated `@orkestrel/lsp` tree already carries: `Identifies`
for a literal-union type alias, `Describes` for a data-shape interface, `Defines` for a behavioral
interface, `Names` and `Lists` and `Maps` for a constant, `Reports` for the error class, and an
action verb for a class. Imperative summaries took the mechanical `-s` transform the shared brief
prescribes (`Determine whether` → `Determines whether`, `Build` → `Builds`).

## Files touched

- `/home/user/fleet/program/src/core/constants.ts` — 6 constant summaries gained a verb.
- `/home/user/fleet/program/src/core/errors.ts` — the `ProgramError` class summary gained a verb.
- `/home/user/fleet/program/src/core/factories.ts` — 2 imperative summaries.
- `/home/user/fleet/program/src/core/helpers.ts` — 22 imperative summaries, 1 boolean `@returns`.
- `/home/user/fleet/program/src/core/programs/Program.ts` — class summary reworded to drop `program`.
- `/home/user/fleet/program/src/core/programs/ProgramManager.ts` — class summary reworded to drop `manager`.
- `/home/user/fleet/program/src/core/types.ts` — 23 summaries reworded and 1 summary sentence
  added to a block that carried none.
- `/home/user/fleet/program/src/core/validators.ts` — 14 imperative summaries, 14 boolean `@returns`.

## Gates

Run from `/home/user/fleet/program`, in order.

| Command                | Exit | Excerpt                                                     |
| ---------------------- | ---- | ----------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` (48 files)      |
| `npm run lint:check`   | 0    | no output                                                    |
| `npm run check`        | 0    | `tsc --noEmit` for the root and core projects, no output    |
| `npm run build`        | 0    | `✓ built in 2.53s`, `dist/src/core/index.js 57.85 kB`       |
| `npm test`             | 0    | src 216, policy 111, config 46, setup 78, guides 23 passed  |

No failures, so no failure excerpt. `npm test` is reported as an observation: the unit ran it inside
its own exec, and the Orchestrator's landing chain is the authoritative run.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-program.diff` — 746 lines. Every changed line begins
  with `*` or `/**`; a filter over `git diff -U0` for a changed line that is neither returns nothing,
  and no `@param`, `@remarks`, `@example`, or `@throws` line appears in the diff.
- `/home/user/scaffold/tmp/units/voice/voice-program.status` — 8 lines, all `M src/core/…`. `dist` is
  git-ignored, so the build left the status clean.

## Decisions recorded, no stop

1. `src/core/types.ts` `ProgramResult.decision` carried a doc block whose whole body was `@remarks`,
   with no summary sentence. A rewrite could not reach it, so the block gained the summary sentence
   `Holds the final authority outcome.` followed by a blank comment line. The `@remarks` text is
   byte-identical. Without it the acceptance instrument reports `verbless=1` for this package. This
   is the only place the sweep added text rather than rewording it, and it accounts for the diff's
   90 insertions against 88 deletions.
2. Three blocks the launch scan counted as conforming were verbless noun phrases
   (`src/core/constants.ts:16`, `src/core/types.ts:209`, `src/core/types.ts:258`). The brief rules
   by reading rather than by bucket, so they were swept.

## Deviations

None. No rewrite changed meaning, no test pins a rewritten sentence, and no gate failed.
