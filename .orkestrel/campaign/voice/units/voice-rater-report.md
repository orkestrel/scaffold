# Unit voice-rater — report

Done. Every TSDoc block under `src/` of `/home/user/fleet/rater` opens with a third-person `-s`
verb sentence, and every boolean `@returns` reads `True if …; false otherwise`. The gate chain
exits 0 at every step. No `app/` directory exists in this package.

## Counts by kind

| Kind                                                | Count |
| --------------------------------------------------- | ----- |
| First sentence from the imperative                  | 11    |
| First sentence given a verb                         | 19    |
| First sentence reworded to drop the symbol's name   | 0     |
| Boolean `@returns` rewritten                        | 11    |

Blocks touched: 32 of the 42 the scan counts. Diffstat: 7 files changed, 41 insertions(+),
41 deletions(-).

The launch scan reported `imperative=12, verbless=17, returnsBad=11`. The two buckets shift by one
against my report because the classifier files `Rating-domain constants.` under imperative (it
opens with a capitalized word the exclusion list does not carry) and files
`Options for \`createRater\` / the \`Rater\` constructor.` under third person (`Options` matches its
`-s` pattern). Both are bare noun phrases, so both are counted here as given a verb. The scan after
landing reads `rater files=8 blocks=42 imperative=0 verbless=0 returnsBad=0`.

## Files touched

- `/home/user/fleet/rater/src/core/Rater.ts` — the `Rater` class block opens `Orchestrates rating — …`.
- `/home/user/fleet/rater/src/core/constants.ts` — the module block opens `Holds the rating-domain constants.`.
- `/home/user/fleet/rater/src/core/errors.ts` — `RaterError` gains `Represents`, `isRaterError` moves to `Narrows` and to the boolean `@returns` form.
- `/home/user/fleet/rater/src/core/factories.ts` — `createRater` moves to `Creates`.
- `/home/user/fleet/rater/src/core/helpers.ts` — `worksheetStep` moves to `Builds`.
- `/home/user/fleet/rater/src/core/types.ts` — 16 blocks gain a verb (`Names` for the two literal unions, `Represents` for the types and interfaces, `Fires when …` for the `rate` event member, `Configures` for `RaterOptions`).
- `/home/user/fleet/rater/src/core/validators.ts` — 8 guards move from `Determine whether` to `Determines whether`, and all 10 boolean `@returns` lines take the `True if …; false otherwise` form.

`src/core/index.ts` carries no TSDoc block and is unchanged.

## Gates

| Command                | Exit | Excerpt                                                  |
| ---------------------- | ---- | -------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` (43 files)   |
| `npm run lint:check`   | 0    | no output                                                |
| `npm run check`        | 0    | `tsc --noEmit` over the root and core projects, no output |
| `npm run build`        | 0    | `✓ built in 2.14s`; `dist/src/core/index.js 24.18 kB`    |
| `npm test`             | 0    | src, policy, config (46), setup (14), guides (18) all passed |

No mutating `lint` or `format` run was needed: `format:check` passed on the first attempt.

`npm test` timing is an observation, not a claim about the authoritative run; the Orchestrator's
landing chain decides that.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-rater.diff`
- `/home/user/scaffold/tmp/units/voice/voice-rater.status`

`git status --short` lists only the 7 modified files under `src/core/`. The diff's changed lines
sit inside comment text only; no `@param`, `@remarks`, `@throws`, `@example`, or later sentence
appears on either side of a hunk.

## Deviations

none.
