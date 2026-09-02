# Unit voice-toolbox — report

Every TSDoc block under `src/` of `/home/user/fleet/toolbox` opens with a third-person `-s` verb
that does not repeat the symbol's own identifier, and every boolean `@returns` reads
`True if …; false otherwise`. The tree has no `app/` directory. The gate chain exits 0 at every
step. The tree is uncommitted.

## Blocks rewritten by kind

- First sentence from the imperative: 50
- First sentence given a verb (was a bare noun phrase): 115
- First sentence reworded to drop the symbol's own name: 3 — `src/core/types.ts:56` (`behavior`),
  `src/core/types.ts:105` (`name`), `src/core/types.ts:125` (`status`); each was also verbless and
  is counted here only
- Boolean `@returns`: 4

Doc blocks touched: 168. Changed lines: 173 (168 first-sentence openers, 1 first-sentence
continuation line in `src/core/helpers.ts`, 4 `@returns` lines). `git diff --numstat` totals 173
added and 173 deleted.

The launch measurement (`imperative=56`, `verbless=102`) reconciles with the reading exactly:
6 blocks the scan bucketed imperative open with a noun (`Flat`, `Max`, `Failure`, `Raw`, `Extra`,
`Which`) and are counted verbless here, and 10 `Options for …` blocks passed the scan's
third-person regex and needed the sweep. 158 scan hits + 10 = 168.

## Files touched

- `src/core/constants.ts` — 36 constant blocks given `Holds …` / `Lists …`
- `src/core/types.ts` — 57 interface, type, union-member, and property blocks given
  `Represents …` / `Holds …` / `Names …` / `Counts …` / `Caps …` / `Sets …` / `Reports whether …`,
  and the workspace operation variants moved from the imperative to `Reads` / `Lists` / `Writes` /
  `Splices` / `Prepends` / `Appends` / `Re-keys` / `Removes` / `Re-points`
- `src/core/shapers.ts` — 26 shape constants given `Describes …`
- `src/core/factories.ts` — 16 factory blocks moved from `Wrap` / `Build` / `Create` / `Compose` /
  `Compile` to their `-s` forms
- `src/core/databases/DatabaseResolver.ts` — 7 blocks, plus the boolean `@returns` of `has`
- `src/core/helpers.ts` — 6 blocks moved from `Complete` / `Expand` / `Clamp`
- `src/core/validators.ts` — 5 `Narrow` → `Narrows`, plus 2 boolean `@returns`
- `src/server/types.ts` — 5 blocks given `Represents …`
- `src/core/errors.ts` — 2 blocks, plus the boolean `@returns` of `isToolboxError`
- `src/core/stores/DatabaseDefinitionStore.ts` — 2 blocks
- `src/server/terminals/TerminalConnection.ts` — 3 blocks (`Own` / `Create` / `Open`)
- `src/server/constants.ts` — 2 constant blocks
- `src/core/stores/MemoryDefinitionStore.ts` — 1 class block

## Gate chain

Run from `/home/user/fleet/toolbox`, in order, each exiting 0.

| Command                | Exit | Evidence                                                            |
| ---------------------- | ---- | ------------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` (70 files)              |
| `npm run lint:check`   | 0    | no output                                                            |
| `npm run check`        | 0    | root `tsc --noEmit`, then the core and server scoped projects       |
| `npm run build`        | 0    | `✓ built in 2.32s`, both entries emitted and declarations copied    |
| `npm test`             | 0    | src 451, policy 111, config 46, setup 17, guides 28 — all passed    |

`npm run lint` and `npm run format` were not needed: `format:check` passed on the first run.
`npm test` timing is an observation; the Orchestrator's landing chain is the authoritative run.

## Acceptance evidence

- Comment-only diff: `git diff -U0` filtered to lines outside a `*` or `/**` prefix returns
  nothing.
- Token parity: a per-hunk comparison of every backticked token, `{@link …}`, and URL between each
  removed and added line reports one difference, the mandated `@returns` rewrite in
  `src/core/errors.ts` (`` `true` when `value` … `` → `True if `value` … ; false otherwise`).
- No `@param`, `@remarks`, `@example`, `@throws`, `@deprecated`, or `@see` line appears in the diff.
- The acceptance instrument reports `toolbox files=18 blocks=193 imperative=0 verbless=0
  returnsBad=0`.
- `git status --short` lists 13 files, all under `src/`.

Evidence paths:

- `/home/user/scaffold/tmp/units/voice/voice-toolbox.diff`
- `/home/user/scaffold/tmp/units/voice/voice-toolbox.status`

## Observations

- Two first sentences keep a code token that matches the documented symbol's identifier, because
  each token points at a different symbol: `src/core/types.ts:72` (`PhaseDraft.bail`) names the
  workflow-level `bail` it inherits from, and `src/core/types.ts:492`
  (`DatabaseDefinitionRow`) names the token inside the type expression
  `TableInterface<DatabaseDefinitionRow>`. Dropping either would remove a pointer rather than a
  restatement.
- `src/core/helpers.ts:127-128` and `src/core/factories.ts:1043,1293` carried a second imperative
  verb inside the same first sentence. Where the function is the subject the verb moved to the
  `-s` form (`synthesizes`, `defaults`, `builds`); where the built tool is the subject the clause
  gained the pronoun `it` so the tool, not the factory, performs the listed operations
  (`— it creates, queries, and mutates …`, `— it traverses and edits …`).

## Deviations

none.
