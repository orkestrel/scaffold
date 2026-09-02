# Unit voice-sea — report

The TSDoc voice migration of `@orkestrel/sea` is complete. The gate chain exits 0 at every step.

## Counts by kind

Disjoint buckets over the blocks whose first sentence changed, plus the boolean `@returns` lines.

| Kind                                                | Blocks |
| --------------------------------------------------- | ------ |
| First sentence conjugated from the imperative        | 33     |
| First sentence given a leading verb                  | 55     |
| First sentence reworded to drop the symbol's name    | 10     |
| Boolean `@returns` rewritten to `True if …; false otherwise` | 7 |

The first three buckets sum to 98 first sentences. With the 7 `@returns` lines that is 105 changed
lines, matching `git diff --stat` exactly. The name-drop bucket is the options interfaces and the
compression manifest, where the rewrite replaced the noun echoing the identifier with the verb:
`Options controlling Brotli compression of one or more directories.` became
`Controls Brotli compression of one or more directories.`, and
`Manifest summarizing all compressed assets.` became `Summarizes all compressed assets.`

## Files touched

| File                       | Changed lines |
| -------------------------- | ------------- |
| `src/server/constants.ts`  | 30            |
| `src/server/errors.ts`     | 6             |
| `src/server/factories.ts`  | 4             |
| `src/server/helpers.ts`    | 31            |
| `src/server/types.ts`      | 32            |
| `src/server/validators.ts` | 2             |

No `app/` directory exists in this checkout. `src/server/index.ts`, `src/server/assets/Asset.ts`,
`src/server/assets/AssetManager.ts`, and `src/server/seals/SEA.ts` carry no TSDoc block, so the
sweep left them untouched.

## Verb choices

- A numeric or string constant holding a binary-format value takes `Holds`; a constant whose value
  is a name, key, or extension takes `Names`; the skip set takes `Lists`; a PE section
  characteristic takes `Marks`.
- A data interface takes `Represents` or `Holds`; a literal union takes `Names`; an event map takes
  `Lists`; an options interface takes the verb its own sentence carried (`Controls`, `Configures`,
  `Describes`), which is what drops the `Options` echo.
- `should` in `File extensions that should NOT be Brotli-compressed` and in
  `Check if a file should be Brotli-compressed based on its extension.` stayed, because removing the
  modal changes what the sentence claims and that word is outside this wave.

## Gate results

| Command               | Exit | Note                                                              |
| --------------------- | ---- | ----------------------------------------------------------------- |
| `npm run format:check` | 0   | `All matched files use the correct format.` on 52 files            |
| `npm run lint:check`   | 0   | No diagnostic                                                      |
| `npm run check`        | 0   | Root project and `configs/src/tsconfig.server.json` both clean     |
| `npm run build`        | 0   | 12 modules transformed, `dist/src/server/index.cjs` 94.48 kB       |
| `npm test`             | 0   | Every project passed; setup 18, guides 28, and integration 4 tests in the tail |

No mutating `lint` or `format` run was needed: `format:check` passed on the first attempt.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-sea.diff` — 105 insertions and 105 deletions across the files the table names.
- `/home/user/scaffold/tmp/units/voice/voice-sea.status` — one ` M src/server/…` row per file the table names, and nothing else.

## Acceptance evidence

1. Comment-only diff: a line-by-line comparison of every changed line against `git show HEAD:<file>`
   reports 105 changed lines, each either a single-line `/** … */` block, the first body line after
   a `/**` opener, or an `@returns` line, and no file changed its line count. No non-comment token
   moved.
2. `voice-scan.mjs` after the sweep: `sea files=11 blocks=110 imperative=0 verbless=1 returnsBad=0`,
   against the launch reading `imperative=58 verbless=24 returnsBad=7`. The residual `verbless=1` is
   the observation named later.
3. The diff's only changed tag lines are the 7 `@returns` pairs. Every `@example`, `@param`,
   `@remarks`, and `@throws` line is byte-identical to the launch tree.
4. The gate chain exits 0 at every step, per the preceding table.
5. `git status --short` lists only `src/` files.

## Observations

- The launch brief recorded `imperative=59`; `voice-scan.mjs` run against the launch tree at commit
  `93fd98a` reported `imperative=58`. The sweep worked from the reading it took itself.
- The residual `verbless=1` in the acceptance scan is `src/server/injectors/Injector.ts:1`, a
  file-header block outside the wave's population: it is attached to no declaration, and each of its lines already carries a third-person `-s` verb
  (`PE  — adds an RT_RCDATA resource via resource directory rebuild.`). The classifier buckets it
  verbless because the line opens with the format name `PE`, which its third-person pattern cannot
  match. Rewriting it would either destroy the per-format table or add a summary sentence the
  block never had, so the sweep left it byte-identical.
- `Recursively walk a directory and return all file paths.` became
  `Walks a directory recursively and returns all file paths.` rather than
  `Recursively walks …`, because an adverb-led sentence still reads as a bare opener to the
  acceptance instrument and the verb belongs first.
- `npm test` timing is an observation, not a claim: the run happened inside this unit's own exec.

## Deviations

none.
