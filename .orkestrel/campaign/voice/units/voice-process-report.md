# Unit voice-process — report

Every TSDoc block under `src/` of `/home/user/fleet/process` opens with a third-person `-s` verb
sentence, no first sentence repeats its symbol's name, and every boolean `@returns` reads
`True if …; false otherwise`. The acceptance instrument reports
`process files=13 blocks=252 imperative=0 verbless=0 returnsBad=0`. The gate chain exits 0 at every
step. The repository has no `app/` directory.

## Blocks rewritten, by kind

| Kind | Count |
| ---- | ----- |
| First sentence moved from the imperative | 48 |
| First sentence given a verb (bare noun phrase, gerund, or `Options for …` opener) | 140 |
| First sentence reworded to drop the symbol's name | 0 |
| Boolean `@returns` moved to `True if …; false otherwise` | 21 |

Of the 140 verbless rewrites, 131 sat in the launch scan's `verbless` bucket and 9 sat in its
`third-person` bucket as false negatives: `Milliseconds …` and `Options for …` openers whose first
word ends in `s`. Two of the 131 were `strict` option docs opening "If `false`, …"; each moved to
the rule's boolean-parameter form "If `true`, …; if `false`, …".

## Vocabulary chosen

- Single-value constant → `Names …`; collection constant → `Lists …`.
- Interface, type alias, and class describing a thing → `Represents …`.
- Module overview block → `Declares …`.
- Options interface → `Configures …`.
- Data property → `Holds …`; optional present-when field → `Carries …`; identifier or path field →
  `Names …`; numeric bound or window option → `Sets …`; boolean property → `Reports whether …`.
- Event-map member → `Reports …`.
- Promise-valued property → `Settles with …` / `Settles at …`; `AsyncIterable` property → `Yields …`.
- Method with an imperative opener → the third-person `-s` form of the same verbs.

Two blocks needed a lead-in rather than a prefix, because their `true`/`false` clauses carry
substance the negation does not:

- `ProcessExit.drained` reads: Reports how the terminal moment arrived: true when the child's
  streams closed; false when the `drain` bound elapsed first and later diagnostics may have existed.
- A boolean `@returns` whose false branch enumerated causes keeps them in a trailing parenthetical.
  The `send` and `write` line reads: True if the host accepted the bytes without reporting a fault;
  false otherwise (the channel was closed, destroyed, ended, failed, or the write remained
  unconfirmed through `delivery`).

## Files touched

| File | Change |
| ---- | ------ |
| `src/core/constants.ts` | Nine constant docs moved to `Names …` and `Lists …`. |
| `src/core/errors.ts` | Class doc to `Represents …`, `result` property to `Carries …`, constructor to `Creates …`, and the `isProcessError` boolean `@returns`. |
| `src/core/types.ts` | Module overview, every contract, every option, every event-map member, every data property, every method opener, and eight boolean `@returns` lines. |
| `src/server/types.ts` | Module overview, `ProcessChildInterface`, `SupervisorFace`, their members, and the `kill` boolean `@returns`. |
| `src/server/Process.ts` | Constructor, every getter doc, `send`, and two boolean `@returns` lines. |
| `src/server/Session.ts` | Constructor, every getter doc, and two boolean `@returns` lines. |
| `src/server/Supervisor.ts` | Constructor, every getter doc, and two boolean `@returns` lines. |
| `src/server/ProcessManager.ts` | Class doc, constructor, every member doc, and two boolean `@returns` lines. |
| `src/server/helpers.ts` | Five boolean `@returns` lines; every first sentence already read third-person. |

Diffstat: 9 files changed, 209 insertions(+), 209 deletions(-).

## Gates

| Command | Exit | Result |
| ------- | ---- | ------ |
| `npm run format:check` | 0 | All matched files use the correct format. 54 files. |
| `npm run lint:check` | 0 | No output. |
| `npm run check` | 0 | Root, `src:core`, and `src:server` projects clean. |
| `npm run build` | 0 | Core and server bundles and declarations built. |
| `npm test` | 0 | `test:src` 184 passed / 8 skipped; `test:policy` 111 passed; `test:config` 46 passed; `test:setup` 10 passed; `test:guides` 102 passed / 1 skipped. |

`npm test` is reported as an observation for timing, per the brief. The suite ran on this container
under this unit's own exec.

## Scope evidence

- `git diff` changes comment text only: every `+`/`-` line in the diff begins with `*` or `/**`,
  and a block-by-block comparison of the 248 blocks in the changed files finds every byte outside a
  `/** … */` block identical to `HEAD`.
- Every block's tail — `@remarks`, `@param`, `@throws`, `@example`, and every later sentence — is
  byte-identical to the launch tree. Only the first line and boolean `@returns` lines moved.
- `git status --short` lists only files under `src/`.
- The strings `tests/guides.test.ts` pins against `src/core/types.ts` all sit in `@remarks` and are
  unchanged.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-process.diff`
- `/home/user/scaffold/tmp/units/voice/voice-process.status`

## Deviations

none.

## Observations

The brief's launch measurement reads `verbless=137`. Running `voice-scan.mjs` on the launch tree at
commit `8aa5dce` before editing reported `verbless=131`, with `files=13`, `blocks=252`,
`imperative=48`, and `returnsBad=21` matching the brief. The discrepancy did not change the sweep:
every block was read and ruled individually rather than by bucket, and the post-sweep scan reports
zero in all three buckets.
