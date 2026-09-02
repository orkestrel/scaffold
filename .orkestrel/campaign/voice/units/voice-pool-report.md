# Unit voice-pool — report

Every TSDoc block under `src/` of `/home/user/fleet/pool` opens with a third-person `-s` verb and
every boolean `@returns` reads `True if …; false otherwise`. The scan's buckets are empty:
`blocks=42 imperative=0 verbless=0 returnsBad=0`. The gate chain exits 0 at every step. The
package has no `app/` directory.

## Blocks rewritten by kind

- First sentence from the imperative: 13
- First sentence given a verb: 29
- First sentence reworded to drop the symbol's name: 0
- Boolean `@returns`: 3

All 42 blocks were rewritten: 13 + 29 first sentences, and 3 of those blocks also carried a
boolean `@returns` in another wording.

## Files touched

- `/home/user/fleet/pool/src/core/types.ts` — 25 first sentences: type aliases and interfaces take
  `Represents`/`Names`, data properties take `Holds`, the count getters take `Counts`, the
  `PoolEventMap` members take `Signals that …`, and the imperative `acquire`, `clear`, `destroy`,
  and `PoolToken.release` sentences take the `-s` form.
- `/home/user/fleet/pool/src/core/Pool.ts` — 9 first sentences: the class block, the constructor,
  the four accessors, and the `acquire`, `clear`, and `destroy` methods.
- `/home/user/fleet/pool/src/core/errors.ts` — 5 first sentences and 1 boolean `@returns`.
- `/home/user/fleet/pool/src/core/validators.ts` — 2 first sentences and 2 boolean `@returns`.
- `/home/user/fleet/pool/src/core/factories.ts` — 1 first sentence.

Wording decisions inside the rule:

- `release()` keeps `Returns this exact lease once`, because `Releases` would repeat the symbol's
  name.
- `destroy()` takes `Tears down the pool permanently and returns …`, because `Destroys` would
  repeat the symbol's name and a leading adverb is not a verb.
- The `PoolEventMap` members keep their original past-tense clauses verbatim behind
  `Signals that …`, so every referent and tense survives.
- The `Pool` class block and the `PoolError` class block rewrap by one line, because the added
  lead pushed the first line past the 100-column `printWidth` value.

## Gates

| Command                | Exit | Note                                                             |
| ---------------------- | ---- | ---------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` (37 files)           |
| `npm run lint:check`   | 0    | No diagnostic printed                                            |
| `npm run check`        | 0    | Root project and `configs/src/tsconfig.core.json` both clean     |
| `npm run build`        | 0    | `dist/src/core/index.js` and `index.cjs` built, declarations copied |
| `npm test`             | 0    | `src:core`, `policy`, `config` (46), `setup` (3), `guides` (13) all passed |

No mutating `lint` or `format` run was needed: `format:check` passed on the first run.

`npm test` timing is an observation; the Orchestrator's landing chain is the authoritative run.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-pool.diff`
- `/home/user/scaffold/tmp/units/voice/voice-pool.status` — lists only the five `src/core/*.ts`
  files, all modified

The diff's hunks sit inside `/** … */` blocks only; no non-comment token changed. Every
`@example`, `@param`, `@remarks`, `@throws`, `@typeParam`, and later sentence is byte-identical to
the launch tree, apart from the three boolean `@returns` lines the wave rules.

## Deviations

none
