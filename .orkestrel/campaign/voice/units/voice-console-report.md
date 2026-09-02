# Unit voice-console — report

Package `@orkestrel/console` at `/home/user/fleet/console`, branch
`claude/orkestrel-npm-audit-deps-14ibta`, baseline commit `5a75c04`. Every TSDoc block under
`src/` now opens with a third-person `-s` verb, and every boolean `@returns` reads
`True if …; false otherwise`. The tree has no `app/` directory, so the sweep covered `src/` only.

## Counts by kind

| Kind                                          | Blocks |
| --------------------------------------------- | ------ |
| First sentence from the imperative            | 70     |
| First sentence given a verb (was verbless)    | 148    |
| First sentence reworded to drop the symbol's name | 1  |
| Boolean `@returns` rewritten                  | 5      |

Total edited lines: 224 (224 insertions, 224 deletions; one line per edit). Blocks left untouched
because they already satisfied the rule: 16 of the 235 scanned.

The name-drop rewrite is the `width` helper in `src/core/helpers.ts`: `The visible width of
` + "`text`" + ` — …` became `Measures how many visible columns ` + "`text`" + ` occupies — …`, so the
sentence no longer repeats the symbol's own name.

Boolean `@returns` rewrites: `src/core/errors.ts` (`isConsoleError`), `src/core/helpers.ts`
(`meetsLevel`), `src/server/helpers.ts` (`inferStyled`), `src/server/validators.ts`
(`isStreamTarget`, `isBufferEncoding`). The two `@returns` lines that merely mention
`` `false` `` while returning rendered text (`src/core/Styler.ts`, `src/core/types.ts`) were left
alone; they are not boolean returns.

## Vocabulary applied

Matches the wave's landed vocabulary in the sibling packages: `Implements` for a class,
`Declares` for an interface or event map, `Represents` for a record type, `Names` for a literal
union or an identifier token, `Holds` / `Lists` / `Sets` / `Maps` for constants, `Configures` for
an options interface, `Reports whether` for a boolean state member, `Checks whether` for a guard,
`Fires after` / `Fires on` for an event member, and the plain third-person verb for a method.

## Files touched

- `src/browser/constants.ts` — third-person openers for the palette, attribute-CSS, and directive constants.
- `src/browser/helpers.ts` — third-person openers for `ansiToConsole`, `escapePercent`, `parseParameters`.
- `src/browser/types.ts` — verbs for the palette, sink-options, output, and accumulator interfaces.
- `src/core/ANSIRenderer.ts` — class doc and the `render` method doc.
- `src/core/Capture.ts` — class doc.
- `src/core/Logger.ts` — class doc.
- `src/core/LoggerManager.ts` — class doc.
- `src/core/Progress.ts` — class doc.
- `src/core/Reporter.ts` — class doc.
- `src/core/Retention.ts` — class doc.
- `src/core/Spinner.ts` — class doc.
- `src/core/Styler.ts` — class doc plus the `style`, `enabled`, `surface`, and `render` members.
- `src/core/constants.ts` — verbs for every exported constant's first sentence.
- `src/core/errors.ts` — error class, guard, and the guard's boolean `@returns`.
- `src/core/helpers.ts` — third-person openers for every exported helper, plus one boolean `@returns`.
- `src/core/types.ts` — every type, interface, event map, and interface member.
- `src/server/ProcessCapture.ts` — class doc.
- `src/server/constants.ts` — verbs for the stream, cap, columns, and projection constants.
- `src/server/factories.ts` — `createProcessCapture` opener.
- `src/server/helpers.ts` — `inferStyled` and `decodeChunk` openers, plus one boolean `@returns`.
- `src/server/types.ts` — every type, interface, event map, and interface member.
- `src/server/validators.ts` — both guards and both boolean `@returns` lines.

## Gates

| Command                | Exit |
| ---------------------- | ---- |
| `npm run format:check` | 0    |
| `npm run lint:check`   | 0    |
| `npm run check`        | 0    |
| `npm run build`        | 0    |
| `npm test`             | 0    |

No failures, so no excerpt. `npm test` ran the `src:core`, `src:browser`, `src:server`, `policy`,
`config`, `setup`, and `guides` projects; the guides project passed 68 tests, so no parity test
pins a rewritten sentence. Timing is an observation: the run happened inside this unit's own exec,
and the Orchestrator's landing chain is the authoritative run.

## Acceptance evidence

- `git diff` changes comment text only: filtering the diff for changed lines that are not `*`,
  `/**`, or `//` lines returns nothing.
- The re-run of `voice-scan.mjs` reports `console files=27 blocks=235 imperative=0 verbless=0
  returnsBad=0`, against the launch reading of `imperative=77 verbless=125 returnsBad=5`.
- A first-word tally over all 235 blocks returns only third-person `-s` verbs.
- `@example`, `@param`, `@remarks`, and `@throws` lines are byte-identical: no such line appears in
  the diff, and the only changed `@returns` lines are the 5 boolean ones.
- `git status --short` lists 22 modified files, all under `src/`.

Evidence paths:

- `/home/user/scaffold/tmp/units/voice/voice-console.diff`
- `/home/user/scaffold/tmp/units/voice/voice-console.status`

## Deviations

none.
