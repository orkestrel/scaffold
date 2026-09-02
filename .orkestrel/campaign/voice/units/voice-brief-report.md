# Unit voice-brief — report

Every TSDoc block under `src/` of `/home/user/fleet/brief` now opens with a third-person `-s` verb
sentence, and the one boolean `@returns` reads `True if …; false otherwise`. The tree has no `app/`
directory. The gate chain exits 0 at every step.

## Blocks rewritten, by kind

- First sentence from the imperative: 33
- First sentence given a verb: 88
- First sentence reworded to drop the symbol's name: 0
- Boolean `@returns`: 1

Population at launch: 12 files, 123 blocks. Two blocks (`captureValue` in `src/core/cloners.ts` and
`deriveTask` in `src/core/helpers.ts`) already satisfied the rule and were left byte-identical. A
scripted pre-check over every block's declaration name found no first sentence containing its own
symbol's identifier, so the rewording bucket is empty rather than unswept.

The verb chosen per kind: `Lists` and `Holds` and `Matches` for constants, `Names` for closed
literal unions, `Represents` for record interfaces and unions, `Records` for phase snapshots,
`Declares` for contracts and event maps, `Describes` for shapes, `Checks whether` for guards,
`Implements` for the two classes, and the `-s` form of the existing verb for every imperative.

## Files touched

- `/home/user/fleet/brief/src/core/BriefCompiler.ts`
- `/home/user/fleet/brief/src/core/BriefManager.ts`
- `/home/user/fleet/brief/src/core/cloners.ts`
- `/home/user/fleet/brief/src/core/constants.ts`
- `/home/user/fleet/brief/src/core/errors.ts`
- `/home/user/fleet/brief/src/core/factories.ts`
- `/home/user/fleet/brief/src/core/helpers.ts`
- `/home/user/fleet/brief/src/core/parsers.ts`
- `/home/user/fleet/brief/src/core/shapers.ts`
- `/home/user/fleet/brief/src/core/types.ts`
- `/home/user/fleet/brief/src/core/validators.ts`

Diffstat: 11 files changed, 122 insertions(+), 122 deletions(-). Every changed line begins with `*`
or `/**`; a filter over `git diff -U0` for changed lines that are not comment lines returns nothing.
The only changed tag line is the `@returns` in `src/core/errors.ts`; no `@example`, `@param`,
`@remarks`, or `@throws` line moved.

## Gates

| Command | Exit |
| --- | --- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 |

No failure excerpt: no step failed. `npm run lint` and `npm run format` were not needed, because
`format:check` passed on the first run. Observation on timing: `npm test` ran inside this unit's own
exec and every project passed; the authoritative run is the Orchestrator's landing chain.

Acceptance instrument re-run after the sweep, from `/home/user/scaffold`:
`node .orkestrel/campaign/instruments/voice-scan.mjs` reports
`brief files= 12 blocks= 123 imperative= 0 verbless= 0 returnsBad= 0`, and its `--list brief` mode
prints no line.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-brief.diff`
- `/home/user/scaffold/tmp/units/voice/voice-brief.status`

## Deviations

none.
