# Unit voice-timeout — report

## Outcome

Every TSDoc block under `src/` of `/home/user/fleet/timeout` opens with a third-person `-s` verb
sentence, and both boolean `@returns` lines read `True if …; false otherwise`. The gate chain exits
0 at every step. The tree has no `app/` directory, so the wave's `app/**` scope is empty here.

Post-edit `voice-scan.mjs` reading for this package:
`timeout files=7 blocks=17 imperative=0 verbless=0 returnsBad=0`.

## Blocks rewritten by kind

- **First sentence from the imperative — 13.** `Trace label …` (twice), `Integer deadline …`,
  `Native parent signal …`, `Validated integer deadline …`, `Native signal …`,
  `Largest timeout duration …`, `Arm or re-arm …`, `Cancel an armed deadline …`,
  `Determine whether …` (twice), `Validate and normalize …`, `Create a controllable deadline …`.
  This matches the launch measurement's `imperative=13` exactly.
- **First sentence given a verb — 4.** `A controllable deadline exposing …` (the `TimeoutInterface`
  interface), `A controllable deadline whose …` (the `Timeout` class), `Whether the owned signal …`
  (the `expired` property), and `Options for constructing a timeout deadline.` (the
  `TimeoutOptions` interface).
  The launch measurement recorded `verbless=3` because `voice-scan.mjs` classifies
  `Options for constructing …` as third person: its `THIRD` pattern `^(?:[A-Z][a-z]+s|…)` matches
  the plural noun `Options`. The sentence states no verb, so the unit's objective covers it. The
  rewrite opens with `Represents`, which the same pattern still matches, so the acceptance instrument
  reads 0 in every bucket.
- **First sentence reworded to drop the symbol's name — 0.** No first sentence repeated its symbol's
  name.
- **Boolean `@returns` — 2.** Both in the `src/core/validators.ts` file, matching the launch
  measurement's `returnsBad=2`.

The imperative rewrites use the third-person form the wave brief prescribes. The verbless rewrites
use `Holds …` for a data property, `Represents …` for an interface and a class, `Names …` for the
`MAX_TIMEOUT_MS` constant, and `Reports whether …` for the derived boolean `expired` property.

## Files touched

- `/home/user/fleet/timeout/src/core/types.ts` — 11 first sentences (interface descriptions,
  property descriptions, and the `start` and `clear` method descriptions).
- `/home/user/fleet/timeout/src/core/validators.ts` — 2 first sentences and 2 boolean `@returns`.
- `/home/user/fleet/timeout/src/core/constants.ts` — 1 first sentence.
- `/home/user/fleet/timeout/src/core/helpers.ts` — 1 first sentence.
- `/home/user/fleet/timeout/src/core/Timeout.ts` — 1 first sentence.
- `/home/user/fleet/timeout/src/core/factories.ts` — 1 first sentence.

Diffstat: 6 files changed, 19 insertions(+), 19 deletions(-).

## Gates

Run from `/home/user/fleet/timeout`. The mutating `lint` and `format` pair never ran, because
`format:check` passed on the first attempt.

| Command                | Exit | Excerpt                                                                    |
| ---------------------- | ---- | -------------------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` on 40 files                    |
| `npm run lint:check`   | 0    | no output                                                                  |
| `npm run check`        | 0    | `tsc --noEmit` for the root project and `configs/src/tsconfig.core.json`   |
| `npm run build`        | 0    | `✓ built in 2.08s`; `dist/src/core/index.d.ts` copied to `index.d.cts`     |
| `npm test`             | 0    | src:core 61, policy 111, config 46, setup 2, guides 18 — every test passed |

`npm test` timing is an observation: the Orchestrator's landing chain is the authoritative run.
`test:distribution` is outside this chain and did not run.

## Acceptance evidence

1. Comment text only: `git diff -U0`, filtered to changed lines that are not a comment line, returns
   nothing. Every changed line begins with ` * ` or `/** `.
2. `voice-scan.mjs` reports `imperative=0 verbless=0 returnsBad=0` for `timeout`.
3. No `@param`, `@remarks`, `@throws`, or `@example` line appears in the diff. The only changed
   `@`-tag lines are the two boolean `@returns` lines.
4. Every gate exits 0.
5. `git status --short` lists six files, all under `src/core/`.

Evidence paths:

- `/home/user/scaffold/tmp/units/voice/voice-timeout.diff`
- `/home/user/scaffold/tmp/units/voice/voice-timeout.status`

## Deviations

none.
