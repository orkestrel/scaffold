# Unit voice-terminal — report

Every TSDoc block under `src/` of `/home/user/fleet/terminal` now opens with a third-person `-s`
verb sentence, and every boolean `@returns` reads `True if …; false otherwise`. The tree has no
`app/` directory. The acceptance instrument reports the package clean:

```text
terminal    files= 18 blocks= 192 imperative=   0 verbless=   0 returnsBad=  0
```

## Blocks rewritten, by kind

Counts come from re-classifying each changed block's baseline first sentence with the instrument's
own buckets (`instruments/voice-scan.mjs` regexes applied to `git show HEAD:<file>`):

- First sentence from the imperative: 78
- First sentence given a verb: 92
- First sentence reworded to drop the symbol's name: 7
- Boolean `@returns`: 8

Total first-sentence rewrites: 170. Read the name-drop row as an overlap, not a fourth disjoint
bucket: each of those blocks also lands in the imperative or verbless row. The launch measurement
counted 78 imperative and 88 verbless; the extra 4 verbless are the `Options for …` openers the
instrument buckets as third-person because `Options` ends in `s`, and the brief names that
mis-bucketing.

The instrument's imperative bucket also over-approximates the other way: the 12 control-byte
constants in `src/core/constants.ts` (`Carriage return (…)`, `Tab (…)`, `Ctrl+C (…)`) open with a
noun, and each took `Names the … byte`, not a verb conjugation.

The 7 name-drop rewrites:

| Symbol                     | File                       | Baseline opener                          |
| -------------------------- | -------------------------- | ---------------------------------------- |
| `TerminalManager`          | `src/core/TerminalManager.ts` | `The multi-endpoint terminal MANAGER — …` |
| `TerminalManagerInterface` | `src/core/types.ts`        | `The multi-endpoint terminal MANAGER — …` |
| `PromptOptions`            | `src/core/types.ts`        | `Options for {@link …createPrompt} …`     |
| `PromptClientOptions`      | `src/core/types.ts`        | `Options for {@link …createPromptClient} …` |
| `TerminalManagerOptions`   | `src/core/types.ts`        | `Options for {@link …createTerminalManager} …` |
| `TerminalOptions`          | `src/server/types.ts`      | `Options for {@link …createTerminal} …`   |
| `Terminal`                 | `src/server/Terminal.ts`   | `The interactive terminal form DRIVER — …` |

## Files touched

```text
 src/core/Prompt.ts                       |  2 +-
 src/core/PromptClient.ts                 |  2 +-
 src/core/TerminalManager.ts              |  7 ++-
 src/core/constants.ts                    | 52 ++++++++++-----------
 src/core/errors.ts                       | 10 ++--
 src/core/factories.ts                    | 10 ++--
 src/core/helpers.ts                      | 50 ++++++++++----------
 src/core/stores/DatabaseTerminalStore.ts | 10 ++--
 src/core/stores/MemoryTerminalStore.ts   |  2 +-
 src/core/types.ts                        | 78 ++++++++++++++++----------------
 src/core/validators.ts                   | 12 ++---
 src/server/Terminal.ts                   | 64 +++++++++++++-------------
 src/server/constants.ts                  | 36 +++++++--------
 src/server/factories.ts                  |  2 +-
 src/server/helpers.ts                    | 24 +++++-----
 src/server/types.ts                      |  6 +--
 16 files changed, 183 insertions(+), 184 deletions(-)
```

`src/core/index.ts` and `src/server/index.ts` carry no TSDoc block, so the sweep left them alone.

Every changed line begins with `*` or `/**`. This command returns nothing, so no non-comment token
moved:

```text
git diff -U0 | grep -E '^[+-]' | grep -vE '^(\+\+\+|---)' | grep -vE '^[+-]\s*(\*|/\*\*)'
```

No `@param`, `@remarks`, `@example`, `@throws`, or `@deprecated` line appears in the diff.

## Gates

| Command                | Exit | Note                                                        |
| ---------------------- | ---- | ----------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` (67 files)       |
| `npm run lint:check`   | 0    | no diagnostics                                               |
| `npm run check`        | 0    | root, `src:core`, and `src:server` projects                  |
| `npm run build`        | 0    | core and server bundles plus the `.d.cts` copies             |
| `npm test`             | 0    | 127, 111, 46, 24, 48, and 2 tests passed across the projects |

`npm test` timing is an observation from inside this unit's own exec; the Orchestrator's landing
chain is the authoritative run. No mutating convergence step was needed: `format:check` passed
first try, so `npm run lint` and `npm run format` never ran.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-terminal.diff`
- `/home/user/scaffold/tmp/units/voice/voice-terminal.status`

`git status --short` lists 16 modified files, all under `src/`.

## Deviations

None.
