# Unit voice-browser — report

Every TSDoc block under `src/` of `/home/user/fleet/browser` opens with a third-person `-s` verb
sentence, no first sentence repeats its symbol's identifier, and every boolean `@returns` reads
`True if …; false otherwise`. The package has no `app/` directory. The gate chain exits 0 at every
step.

## Blocks rewritten, by kind

| Kind                                             | Blocks |
| ------------------------------------------------ | ------ |
| First sentence inflected from the imperative     | 111    |
| First sentence given a verb (bare noun phrase)   | 269    |
| First sentence reworded to drop the symbol's name | 2     |
| Boolean `@returns` rewording                     | 15     |
| Total changed lines                              | 397    |

The launch scan bucketed 250 imperative and 95 verbless. Reading each block moved most of the
imperative bucket into the verbless kind: the classifier reads a leading capitalized word as a
verb, so `Viewport dimensions for a browser page.` and `Accessibility snapshot options.` counted
imperative while both are bare noun phrases.

Beyond the scan's 345 hits, reading found 35 more bare noun phrases the scan accepted as third
person because their leading word ends in `s` — 29 `Options for …` openers plus `Diagnostics`,
`Overrides`, `Standards-shaped`, `Operations`, `Flags`, and `Windows`. The name check found 2 first
sentences containing their own symbol's identifier (`update` and `close` members).

Verb choices: `Represents` for an entity, `Describes` for a data shape or an options object,
`Names` for a literal union or a constant's value, `Maps` for an event map or a lookup table,
`Lists` for a constant collection, `Sets`/`Caps`/`Bounds` for a numeric constant, `Provides` for a
capability interface, and the plain `-s` inflection for every imperative verb.

## Files touched

44 files under `src/core/` and `src/server/`, listed in
`/home/user/scaffold/tmp/units/voice/voice-browser.status`. `src/core/BrowserContext.ts`,
`src/core/index.ts`, `src/core/parsers.ts`, `src/server/Browser.ts`, `src/server/index.ts`, and
`src/core/BrowserCodegen.ts` needed no change.

## Gates

| Command                | Exit | Result                                            |
| ---------------------- | ---- | ------------------------------------------------- |
| `npm run format:check` | 0    | All matched files use the correct format (115)    |
| `npm run lint:check`   | 0    | no output                                         |
| `npm run check`        | 0    | `src:core` and `src:server` projects clean        |
| `npm run build`        | 0    | build and `copy` step completed                   |
| `npm test`             | 0    | 29+1+1+2+1 files, 515+111+46+42+68 tests passed   |

No mutating `lint` or `format` run was needed: `format:check` passed on the first attempt.

## Acceptance evidence

- Wave scan after landing: `browser files=50 blocks=427 imperative=0 verbless=0 returnsBad=0`.
- Every changed line lies inside comment text: `git diff -U0` yields 0 changed lines whose
  stripped text does not begin with `*` or `/**`.
- No `@param`, `@example`, `@remarks`, `@throws`, `@deprecated`, `@see`, or `@defaultValue` line
  appears in the diff; the only tag lines changed are the 15 `@returns` rewordings.
- `git status --short` lists 44 entries, all `M src/…`.
- Diff: `/home/user/scaffold/tmp/units/voice/voice-browser.diff`
- Status: `/home/user/scaffold/tmp/units/voice/voice-browser.status`

## Deviations

One, reported rather than acted on beyond the unit's own recovery:

- **Expected:** the session scratchpad
  `/tmp/claude-0/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/scratchpad` holds only
  this unit's instruments.
- **Found:** a concurrent unit overwrote this unit's `apply.mjs` mid-run with its own script. The
  batch failed loudly with `SyntaxError: Unexpected token 's' … is not valid JSON` from an
  `apply.mjs` whose first line reads `// Apply exact-string comment rewrites from a JSON edit list`,
  which this unit did not write. The directory listing shows hundreds of files from other units,
  with timestamps interleaved with this unit's.
- **Done or not:** done. No repository write was lost — the failed batch wrote nothing, and the two
  batches that had already applied were verified intact by `git diff --stat` before continuing.
  Every instrument moved to `scratchpad/unit-voice-browser/` and the batch re-ran there.
- **Hypothesis:** the scratchpad path is shared across concurrent units rather than private per
  unit, so a common instrument name such as `apply.mjs` collides.

No rewrite changed meaning, no test pins a sentence this unit changed, and no gate failed.
