# Unit voice-test — report

Every TSDoc block under `src/` of `/home/user/fleet/test` opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0 at
every step. The package has no `app/` directory.

## Blocks rewritten, by kind

| Kind                                        | Count |
| ------------------------------------------- | ----- |
| First sentence from the imperative           | 0     |
| First sentence given a verb                  | 94    |
| First sentence reworded to drop the name     | 0     |
| Boolean `@returns`                           | 7     |

The launch scan measured `imperative=0`, so no imperative opener existed to convert. The measured
`verbless=87` bucket under-counts: the classifier's `THIRD` pattern accepts a first word ending in
`s`, so the `Options for …` openers in `src/browser/types.ts` and `src/server/types.ts` and the
`Files to write on allocation …` opener in `src/server/types.ts` scored as third person while
carrying no verb. Reading every block, as the brief directs, found those 7 beyond the bucket:
94 = 87 + 7. No first sentence repeated its own symbol's name.

A chunk-level comparison against `HEAD` confirms the change set: 94 description chunks and 7
`@returns` chunks differ, and every other chunk — `@param`, `@remarks`, `@throws`, `@example`, and
every later paragraph — is identical as text. The block count is unchanged at 229.

## Files touched

- `/home/user/fleet/test/src/browser/constants.ts` — 8 constant first sentences take `Names …`.
- `/home/user/fleet/test/src/browser/types.ts` — 33 first sentences: `Represents` for a type or
  interface, `Configures` for an options shape, `Holds` or `Lists` for a property.
- `/home/user/fleet/test/src/browser/helpers.ts` — 4 boolean `@returns` lines.
- `/home/user/fleet/test/src/core/types.ts` — 28 first sentences.
- `/home/user/fleet/test/src/server/constants.ts` — 3 constant first sentences.
- `/home/user/fleet/test/src/server/helpers.ts` — 2 boolean `@returns` lines.
- `/home/user/fleet/test/src/server/types.ts` — 22 first sentences and 1 boolean `@returns` line.

Diffstat: 7 files changed, 115 insertions(+), 112 deletions(-).

## Gates

| Command                | Exit | Note                                                        |
| ---------------------- | ---- | ----------------------------------------------------------- |
| `npm run format:check` | 0    | 58 files, correct format. No mutating run was needed.        |
| `npm run lint:check`   | 0    | No output.                                                   |
| `npm run check`        | 0    | Root project plus the core, browser, and server projects.    |
| `npm run build`        | 0    | Core, browser, and server bundles emitted.                   |
| `npm test`             | 0    | src 450 passed / 8 skipped, policy 111, config 46, setup 24, guides 38. Timing is an observation; the Orchestrator's landing chain is authoritative. |

## Acceptance instrument

`node .orkestrel/campaign/instruments/voice-scan.mjs` from the scaffold checkout, after landing:

```text
test        files= 15 blocks= 229 imperative=   0 verbless=   0 returnsBad=  0
```

Launch reading, same instrument: `imperative=0 verbless=87 returnsBad=7`.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-test.diff`
- `/home/user/scaffold/tmp/units/voice/voice-test.status`

`git status --short` lists only the 7 files under `src/`. `git diff -U0` restricted to changed
lines outside a comment returns nothing, so no code token moved.

## Judgment calls the brief left to me

- The instrument's positive form `@returns True if …; false otherwise` matches across a line break
  nowhere, because it demands a literal space in `; false otherwise`. The `has` method's rewritten
  `@returns` is therefore wrapped before `missing;` rather than after it, keeping the clause on one
  line.
- Wrapping stays at 100 columns for a paragraph the rewrite lengthened. Where collapsing a
  single-line block's neighbours would break the local rhythm — `JournalInterface.output`,
  `ScratchInterface`, `LoopbackInterface` — the line stays single at 101 or 102 columns, which the
  touched files already carry elsewhere (`src/browser/types.ts` lines 5, 6, and 15 run 105, 103, and
  102).
- `isRendered` stated its condition in the negative (`false` when hidden). The rewrite states the
  positive condition the rule's form requires: `True if the element is presented to assistive
  technology and to sight; false otherwise`.

## Deviations

none.
