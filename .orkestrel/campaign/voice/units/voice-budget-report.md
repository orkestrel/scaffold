# Unit voice-budget — report

Every TSDoc block under `src/` of `/home/user/fleet/budget` now opens with a third-person `-s` verb
sentence that does not repeat the symbol's name, and every boolean `@returns` reads
`True if …; false otherwise`. The gate chain exits 0 at every step. No deviation.

The package has no `app/` directory, so the sweep covered `src/core/` alone. The measured
population held: 6 files, 32 blocks. 27 blocks changed; 5 already satisfied the rule and stayed
byte-identical (`createBudget`, `createTokenConsumer`, `createTokenBudget`, `validateBudgetOptions`,
and the `BudgetOptions.consumer` member).

## Blocks rewritten by kind

| Kind                                            | Count |
| ----------------------------------------------- | ----- |
| First sentence from the imperative              | 8     |
| First sentence given a verb                     | 19    |
| First sentence reworded to drop the symbol name | 0     |
| Boolean `@returns`                              | 4     |

The 4 boolean `@returns` rewrites sit inside 4 of the 8 imperative blocks, so the blocks touched
total 27.

Verb choices, following the wave brief's prescription for a verbless opener: `Represents` for a
class, an interface, or a record type; `Holds` for a data property; `Names` for a value drawn from a
literal union (`TokenScope`, `TokenBudgetOptions.scope`); `Indicates whether` for the boolean
`BudgetInterface.exhausted` property, whose `Whether …` opener carries no main verb.

## Files touched

- `/home/user/fleet/budget/src/core/Budget.ts` — the `Budget` class block gains `Represents`.
- `/home/user/fleet/budget/src/core/helpers.ts` — `validateTokenBudgetOptions` moves to
  `Validates and normalizes`.
- `/home/user/fleet/budget/src/core/types.ts` — every interface, type alias, member, and method
  block moves to a third-person opener.
- `/home/user/fleet/budget/src/core/validators.ts` — 4 `Determine` openers move to `Determines`, and
  4 boolean `@returns` lines take the ruled form.

`src/core/factories.ts` and `src/core/index.ts` are unchanged.

## Gates

Run from `/home/user/fleet/budget` on 2026-09-02, in the chain's order.

| Command               | Exit | Excerpt                                                       |
| --------------------- | ---- | ------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` (39 files)        |
| `npm run lint:check`   | 0    | no diagnostics                                                |
| `npm run check`        | 0    | `tsc --noEmit` clean for the root and `src:core` projects     |
| `npm run build`        | 0    | `Copied: dist/src/core/index.d.ts to dist/src/core/index.d.cts` |
| `npm test`             | 0    | `src` 111, `policy`/`config` 46, `setup` 6, `guides` 18 passed |

No gate failed, so no re-run was needed. `npm test` timing is an observation: the whole chain ran
inside this unit's exec, and the Orchestrator's landing chain is the authoritative run.
`test:distribution` is outside the chain and was not run. No `npm install` ran.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-budget.diff` — `git diff` after the sweep.
- `/home/user/scaffold/tmp/units/voice/voice-budget.status` — `git status --short`, listing only the
  4 files under `src/core/`.
- Instrument:
  `/tmp/claude-0/-home-user-scaffold/249f2596-6386-5f66-868c-31383bbd6eeb/scratchpad/voice-budget.mjs`
  — the exact-line replacement script, which asserts each anchor's occurrence count before writing
  and reports any line past the 100-column `printWidth` (none).

Acceptance checks run here: a filter over `git diff -U0` added and removed lines returned no line
outside a comment; every `@example`, `@param`, `@remarks`, and `@throws` line is absent from the
diff; the tree is uncommitted and unstaged.

## Deviations

None.
