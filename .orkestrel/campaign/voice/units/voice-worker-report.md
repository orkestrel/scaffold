# Unit voice-worker — report

Every TSDoc block under `src/` of `/home/user/fleet/worker` opens with a third-person `-s` verb
sentence, and the one boolean `@returns` reads `True if …; false otherwise`. The gate chain exits 0
at every step. No `app/` directory exists in this package, so the sweep covered `src/` alone.

## Counts by kind

| Kind                                          | Blocks |
| --------------------------------------------- | ------ |
| First sentence from the imperative             | 12     |
| First sentence given a verb (was verbless)     | 20     |
| First sentence reworded to drop the symbol name | 1     |
| Boolean `@returns` rewritten                   | 1      |

The name-drop row is a subset of the verbless row, not an addition: `src/core/Worker.ts` opened
`A resource-backed job worker`, which is both verbless and the class's own name, and one rewrite
closed both. Blocks changed: 32 of the 33 the launch scan counted. `WorkerHandler` in
`src/core/types.ts` already read `Runs one worker job with a leased pool resource.` and stays
byte-identical.

Three blocks the launch instrument bucketed as third person are bare noun phrases the brief's
standing conditions name explicitly (`Options for …` matches the classifier's `[A-Z][a-z]+s`
opener). Ruling by reading rather than by bucket, the three options blocks were rewritten to
`Configures …`, matching the form `@orkestrel/lsp` already carries. They are counted in the
verbless row, which is why that row reads 20 against the launch scan's 13.

`restore` in `src/core/types.ts` could not take the mechanical imperative-to-third-person
transform: `Re-enqueues` still reads as imperative to the acceptance instrument, whose
`[A-Z][a-z]+s` opener test stops at the hyphen. The sentence was recast to
`Loads outstanding entries from the store and re-enqueues them; no-op without a store.`, which
keeps every noun and the trailing clause verbatim.

## Files touched

- `/home/user/fleet/worker/src/core/Worker.ts` — class first sentence gains a verb and drops the symbol's name
- `/home/user/fleet/worker/src/core/factories.ts` — `createWorker` first sentence to third person
- `/home/user/fleet/worker/src/core/types.ts` — event map, its members, both options blocks, `WorkerInterface` and its methods
- `/home/user/fleet/worker/src/server/Dispatch.ts` — internal entity first sentence gains a verb
- `/home/user/fleet/worker/src/server/NodeWorker.ts` — internal entity first sentence gains a verb
- `/home/user/fleet/worker/src/server/Thread.ts` — internal entity first sentence gains a verb, wrapped to two lines
- `/home/user/fleet/worker/src/server/factories.ts` — `createJSONQueueStore` and `createNodeWorker` to third person
- `/home/user/fleet/worker/src/server/handlers.ts` — `serveWorker` to third person
- `/home/user/fleet/worker/src/server/helpers.ts` — `spawnThread`, `dispatch`, `isReply` to third person, plus the boolean `@returns`
- `/home/user/fleet/worker/src/server/types.ts` — `Reply`, `NodeThread`, and both options blocks gain verbs

Diffstat: 10 files changed, 34 insertions, 33 deletions.

## Gates

| Command             | Exit | Result                                                                     |
| ------------------- | ---- | -------------------------------------------------------------------------- |
| `npm run format:check` | 0 | All matched files use the correct format (72 files)                          |
| `npm run lint:check`   | 0 | No diagnostics                                                              |
| `npm run check`        | 0 | Root, `src:core`, and `src:server` projects clean                           |
| `npm run build`        | 0 | Core and server bundles and declarations built                              |
| `npm test`             | 0 | src 106, policy 111, config 46, setup 9, guides 14 — every project passed   |

No failure excerpt: no gate failed, and no mutating `lint` or `format` run was needed to converge.
`npm test` timing is an observation; the Orchestrator's landing chain is the authoritative run.

## Acceptance evidence

- The re-run of the acceptance instrument reports `FILES 12 {"blocks":33,"imperative":0,"verbless":0,"returnsBad":0}` against the launch reading of `files=12, blocks=33, imperative=16, verbless=13, returnsBad=1`.
- `git diff -U0` filtered to lines whose content is not a comment (`*`, `/**`, `//`) returns nothing, so the change is comment text only.
- `git diff -U0` filtered to TSDoc tag lines returns the single `@returns` pair, so every `@example`, `@param`, `@remarks`, `@throws`, and `@typeParam` is byte-identical to the launch tree.
- `/home/user/scaffold/tmp/units/voice/voice-worker.diff`
- `/home/user/scaffold/tmp/units/voice/voice-worker.status`

## Deviations

none. The tree is uncommitted and unstaged.
