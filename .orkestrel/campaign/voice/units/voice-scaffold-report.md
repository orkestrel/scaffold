# Unit voice-scaffold — report

Every TSDoc block under `src/` of `/home/user/scaffold` now opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The acceptance
instrument reports `TOTAL {"files":27,"blocks":429,"imperative":0,"verbless":0,"returnsBad":0}`.
The repository has no `app/` directory.

## Blocks rewritten, by kind

| Kind                                        | Blocks |
| ------------------------------------------- | ------ |
| First sentence from the imperative          | 236    |
| First sentence given a verb                 | 168    |
| First sentence reworded to drop the name    | 0      |
| Boolean `@returns` reworded                 | 27     |

- The verbless bucket is 162 blocks the launch scan flagged plus 6 the scan classified as
  third-person because their opening noun ends in `s`: four `Options for …` openers and two
  `Columns …` openers. The brief names that misclassification, and each was ruled by reading.
- A twenty-eighth boolean `@returns`, on `isDeferred` in `src/core/helpers.ts`, already read
  `True if …; false otherwise` and was only re-wrapped so the clause sits on one line; the
  instrument's pattern requires a space before `false otherwise`.
- No first sentence repeated its symbol's identifier, so no block needed the name-dropping rewrite.
  A check over every block against the identifier declared beneath it returns three hits —
  `catalog` in `Materializer.catalog` and `MaterializerInterface.catalog`, `copy` in
  `WriteTransaction.copy` — and each is a domain noun in the pre-existing wording (`catalog agent
  file`, `byte-for-byte copy`) rather than the identifier.

## Verb vocabulary

`Builds`, `Caps`, `Captures`, `Catalogs`, `Compares`, `Compiles`, `Computes`, `Constructs`,
`Declares`, `Derives`, `Describes`, `Determines`, `Encodes`, `Establishes`, `Exposes`, `Extracts`,
`Fetches`, `Holds`, `Infers`, `Lists`, `Looks`, `Marks`, `Matches`, `Names`, `Narrows`, `Opens`,
`Orders`, `Projects`, `Promotes`, `Reads`, `Regenerates`, `Renders`, `Replaces`, `Reports`,
`Represents`, `Reserves`, `Resolves`, `Rewrites`, `Runs`, `Selects`, `Serializes`, `Sets`,
`Snapshots`, `Stages`, `Tears`, `Tests`, `Writes`. The set follows the accepted diffs of the
earlier packages in this wave, held in `.orkestrel/campaign/voice/units/*.diff`.

## Files touched

Twenty-three files, all under `src/`:

`src/bin/CLI.ts`, `src/bin/constants.ts`, `src/bin/errors.ts`, `src/bin/helpers.ts`,
`src/bin/types.ts`, `src/core/Compiler.ts`, `src/core/cloners.ts`, `src/core/compilers.ts`,
`src/core/constants.ts`, `src/core/errors.ts`, `src/core/factories.ts`, `src/core/helpers.ts`,
`src/core/parsers.ts`, `src/core/templates.ts`, `src/core/types.ts`, `src/core/validators.ts`,
`src/server/Materializer.ts`, `src/server/Upstream.ts`, `src/server/WriteTransaction.ts`,
`src/server/constants.ts`, `src/server/helpers.ts`, `src/server/types.ts`,
`src/server/validators.ts`.

Diffstat: 23 files changed, 476 insertions(+), 446 deletions(-).

## Gate chain, run 2026-09-02 from the repository root

| Command                | Exit | Result                                                                  |
| ---------------------- | ---- | ----------------------------------------------------------------------- |
| `npm run format:check` | 0    | `All matched files use the correct format.` (213 files)                 |
| `npm run lint:check`   | 0    | no diagnostics                                                          |
| `npm run check`        | 0    | root, `src:core`, `src:server`, `src:bin`                               |
| `npm run build`        | 0    | `build-host: staged 116 file(s)`, `build-inventory: staged 116 file(s)` |
| `npm test`             | 0    | 1226 tests passed across 19 files, no failures                          |

`npm run lint` and `npm run format` were not needed: `format:check` passed on the first run, so no
mutating pass ran. `npm test` is reported as an observation; the Orchestrator's landing chain is the
authoritative run. `npm run build` regenerated `dist/` and rewrote `host.json` to identical bytes,
so neither appears in `git status --short`.

## Evidence

- `/home/user/scaffold/tmp/units/voice/voice-scaffold.diff`
- `/home/user/scaffold/tmp/units/voice/voice-scaffold.status`

`git diff -U0` carries no added or removed line outside a comment: every changed line begins with
`*` or `/**`. No `@example`, `@param`, `@remarks`, or `@throws` line appears among the removed
lines. `git diff --check` exits 0, the diff carries no replacement character, and every added line
fits 100 columns with tabs expanded at 2, which the emitted-template width proof in
`tests/src/core/templates.test.ts` requires.

## Decisions the deviation contract left to me

- **The generated-source TSDoc inside `src/core/templates.ts` was rewritten.** Ten of that file's
  blocks sit inside the template literal that emits `configs/browsers.ts` into a generated
  workspace, so they are string data here and TSDoc there. The acceptance instrument reads them as
  doc blocks, and a generated workspace obeys the same rule, so they were swept. Every rewritten
  line stays within 100 columns at `TAB_WIDTH` 2, which the emitted-line width proof at
  `tests/src/core/templates.test.ts:529` requires, and the `templates` and `compilers` suites pass.
- **A boolean `@returns` clause is never split across the `;`.** The acceptance instrument matches
  `True if …; false otherwise` with a literal space, so a line break there reads as a miss. Where
  the clause would exceed 100 columns, the break goes earlier in the sentence.
- **Verb choices follow the accepted diffs of the earlier packages in this wave** rather than being
  invented here, so the fleet reads as one voice.

## Deviations

None.
