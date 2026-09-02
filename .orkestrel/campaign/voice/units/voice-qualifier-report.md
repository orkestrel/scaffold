# Unit voice-qualifier — report

Every TSDoc block under `src/` of `@orkestrel/qualifier` now opens with a third-person `-s` verb
sentence that does not repeat the symbol's name, and every boolean `@returns` reads
`True if …; false otherwise`. The package has no `app/` directory. The gate chain exits 0 at every
step. Deviations: none.

## Blocks rewritten, by kind

| Kind                                             | Count |
| ------------------------------------------------ | ----- |
| First sentence from the imperative                | 32    |
| First sentence given a verb                       | 24    |
| First sentence reworded to drop the symbol's name | 2     |
| Boolean `@returns`                                | 6     |

The population held 67 doc blocks. 58 blocks took a first-sentence rewrite; 9 already satisfied the
rule and stayed byte-identical (`Qualifies`, `Validates`, and `Destroys` on both
`QualifierInterface` and `Qualifier`, and the three `Describes …` helpers). The 6 boolean `@returns`
rewrites sit inside blocks the first-sentence sweep already counted, so they do not add to the 58.

## Files touched

- `/home/user/fleet/qualifier/src/core/Qualifier.ts` — class doc reworded to drop `A qualifier —`
  and open on `Runs`; the `emitter` getter's first sentence given `Holds`.
- `/home/user/fleet/qualifier/src/core/constants.ts` — four constant docs given `Holds`, `Names`,
  `Lists`, and `Maps`.
- `/home/user/fleet/qualifier/src/core/errors.ts` — `QualifierError` given `Represents`;
  `Narrow` → `Narrows`.
- `/home/user/fleet/qualifier/src/core/factories.ts` — `Create` → `Creates`.
- `/home/user/fleet/qualifier/src/core/helpers.ts` — 20 imperative openers moved to third person,
  plus the `hasReservedKey` boolean `@returns`.
- `/home/user/fleet/qualifier/src/core/types.ts` — 18 verbless type and interface docs given
  `Represents`, `Carries`, or `Holds`; `QualifierInterface` reworded to drop `One qualifier —`.
- `/home/user/fleet/qualifier/src/core/validators.ts` — 10 `Determine whether` → `Determines
  whether`, plus five boolean `@returns`.

Diffstat: 7 files changed, 65 insertions(+), 65 deletions(-).

## Wording decisions inside the rule

- The `Qualifier` class and the `QualifierInterface` interface both opened on the symbol's own name
  followed by an em-dash verb phrase (`A qualifier — runs …`, `One qualifier — owns or borrows …`).
  Promoting the verb phrase drops the name and supplies the `-s` verb in one move, so the class
  reads `Runs ordered passes over one reason engine and returns eligibility.` and the interface
  reads `Owns or borrows one reason engine and returns eligibility.` No substance is lost.
- `Copy-on-write merge one pass projection into the context.` became
  `Merges one pass projection into the context, copy-on-write.` because `Copy-on-write merges` is
  ungrammatical; the modifier moves to the tail and keeps its referent.
- `Options for …` and `Optional fields accepted by …` took `Carries`, matching the fleet's
  established form for an options bag.
- A `{@link …}` token is a code token the shared brief orders kept, so `Builds a
  {@link QualificationDefinition}.` retains its link even though the function is
  `qualificationDefinition`.

## Gate chain

| Command                | Exit | Result                                                             |
| ---------------------- | ---- | ------------------------------------------------------------------ |
| `npm run format:check` | 0    | All matched files use the correct format (43 files)                |
| `npm run lint:check`   | 0    | No output                                                          |
| `npm run check`        | 0    | `tsconfig.json` and `configs/src/tsconfig.core.json` both clean    |
| `npm run build`        | 0    | Built in 3.85s; `dist/src/core/index.js` 43.47 kB                  |
| `npm test`             | 0    | src 162, policy 111, config 46, setup 12, guides 18 — all passed   |

No gate needed the mutating `npm run lint` / `npm run format` pass: `format:check` was clean on the
first run.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-qualifier.diff`
- `/home/user/scaffold/tmp/units/voice/voice-qualifier.status`

`git status --short` lists only the seven `src/core/*.ts` files. A filter over the diff for changed
lines that are not comment lines returns nothing, so every hunk sits inside comment text. No changed
line carries `@param`, `@remarks`, `@throws`, or `@example`.

## Deviations

none.
