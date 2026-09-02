# Unit voice-queue — report

Every TSDoc block under `src/` of `/home/user/fleet/queue` opens with a third-person `-s` verb
sentence, and every boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0
at every step. The tree is uncommitted. The package has no `app/` directory.

## Counts by kind

- First sentence from the imperative: 37
- First sentence given a verb: 29
- First sentence reworded to drop the symbol's name: 1 (`QueueError`, `Error carrying …` →
  `Represents a failure carrying …`)
- Boolean `@returns` rewritten: 5

Blocks touched: 67 of the 72 the scan counts. The rest already satisfied the rule: `readOption` and
`validateOption` in `src/core/helpers.ts`, `isStoredEntry` in `src/core/validators.ts`, and the
`signal` property and `QueueHandler` in `src/core/types.ts`.

## Files touched

- `/home/user/fleet/queue/src/core/types.ts` — 34 blocks: interfaces and type aliases take
  `Represents …`, properties take `Holds …` or `Counts …`, `QueueEventMap` members take
  `Signals that …`, the boolean `paused` and `stopped` take `Reports the … state: true …; false
  otherwise`, and the nine `QueueInterface` methods move to the third person.
- `/home/user/fleet/queue/src/core/Queue.ts` — 11 blocks: the class doc and every lifecycle method.
- `/home/user/fleet/queue/src/core/validators.ts` — 4 first sentences and 4 boolean `@returns`.
- `/home/user/fleet/queue/src/core/errors.ts` — the class doc, the constructor, `isQueueError`, and
  its boolean `@returns`.
- `/home/user/fleet/queue/src/core/factories.ts` — 3 `Create` → `Creates`.
- `/home/user/fleet/queue/src/core/stores/DatabaseQueueStore.ts` — 6 blocks.
- `/home/user/fleet/queue/src/core/stores/MemoryQueueStore.ts` — 6 blocks.

## Voice decisions

The wording follows the packages the wave already migrated, so this package reads like the fleet:

- `Represents …` for an interface, a type alias, and a class-level noun phrase
  (`pool/src/core/Pool.ts`, `abort/src/core/types.ts`).
- `Holds …` for a data property and `Counts …` for a numeric one (`pool/src/core/types.ts:66-71`).
- `Signals that …` for an event-map member (`pool/src/core/types.ts:26-32`), which keeps each
  member's past-tense clause and its payload tail byte-identical after the prefix.
- `Reports the … state: true …; false otherwise` for a boolean property
  (`emitter/src/core/types.ts:45`), which adds the verb and keeps the boolean form the property
  already carried.
- The `isQueueError` return now reads: True if the value is a real QueueError instance; false
  otherwise, including for a hostile value. That keeps the substance of the launch text, which said
  hostile values return false.

## Gates

Run from `/home/user/fleet/queue` in the order the shared brief names. No mutating `lint` or
`format` run was needed: `format:check` passed on the first attempt.

| Command                | Exit | Result                                              |
| ---------------------- | ---- | --------------------------------------------------- |
| `npm run format:check` | 0    | All matched files use the correct format (48 files) |
| `npm run lint:check`   | 0    | No diagnostic                                       |
| `npm run check`        | 0    | Root project and `configs/src/tsconfig.core.json`   |
| `npm run build`        | 0    | Built `dist/src/core/index.cjs` in 2.37s            |
| `npm test`             | 0    | 151, 111, 46, 1, and 23 tests passed across the projects |

`npm test` ran inside this unit's own exec; the Orchestrator's landing chain is the authoritative
run.

## Acceptance instrument

`node .orkestrel/campaign/instruments/voice-scan.mjs` from `/home/user/scaffold`:

- Before: `queue files= 9 blocks= 72 imperative= 43 verbless= 23 returnsBad= 5`
- After: `queue files= 9 blocks= 72 imperative= 0 verbless= 0 returnsBad= 0`

The instrument's `returnsBad` check needs `; false otherwise` unbroken on one line. The
`isQueueTimeout` rewrite first wrapped between `false` and `otherwise` and the scan still flagged it;
the line now wraps after `range,` instead.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-queue.diff`
- `/home/user/scaffold/tmp/units/voice/voice-queue.status`

`git status --short` lists exactly the seven `src/` files. `git diff -U0` changes no line outside a
comment: every added and removed line opens with `*` or `/**`, and no `@param`, `@remarks`,
`@throws`, `@example`, or `@typeParam` line appears in the diff.

## Deviations

None.

## Observations

- `guides/queue.md` keeps imperative method-table descriptions (lines 142-161), and the store rows
  at 158-161 quote the launch TSDoc nearly verbatim (the `save` row still reads Upsert rather
  than Upserts). The guide is
  off-limits to this wave and `tests/guides.test.ts` compares names, method sets, examples, and
  links rather than sentences, so `npm run test:guides` stays green. The guide's own voice needs a
  carrier unit if the campaign wants it aligned.
- Three comment lines now exceed 100 columns: `src/core/types.ts` lines 62, 97, and 217. `oxfmt`
  does not reflow comments and no lint rule caps line length, so `format:check` and `lint:check`
  both pass. The file already carried a longer comment line at 191 before this unit.
