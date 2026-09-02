# Unit voice-workflow — report

Every TSDoc first sentence under `src/` of `/home/user/fleet/workflow` now opens with a
third-person `-s` verb, and every boolean `@returns` reads `True if …; false otherwise`. The
gate chain exits 0 at every step. No code token changed.

## Counts by kind

| Kind | Count |
| ---- | ----- |
| First sentence rewritten from the imperative | 161 |
| First sentence given a verb (bare noun phrase) | 197 |
| First sentence reworded to drop the symbol's name | 1 |
| Boolean `@returns` rewritten | 11 |

- The one name-drop is `WorkflowFunction` in `src/core/types.ts`: `A registered workflow
  function — the behavior a \`function\`-form …` became `Declares the registered behavior a
  \`function\`-form …`. It is also inside the 197 verbless total, because its opener carried no
  verb either.
- The verbless total is 197, not the launch scan's 192. The scan misbucketed 8 noun-phrase
  openers as third-person (`This …`, `Options …` both end in `s`, so its `THIRD` pattern
  matched), and it bucketed 3 description-less blocks as verbless. 189 scan-verbless + 8
  misbucketed = 197.
- Of the 11 boolean `@returns`, 10 were reworded. The eleventh,
  `src/core/helpers.ts` `isTaskResult`, already read `True if …; false otherwise` but wrapped
  across a line break between `;` and `false`, so the scan's contiguity pattern missed it. It
  was reflowed, not reworded.

## Files touched

All 30 under `src/`:

`src/browser/BrowserScheduler.ts`, `src/browser/FrameScheduler.ts`,
`src/browser/IdleScheduler.ts`, `src/browser/constants.ts`, `src/browser/factories.ts`,
`src/core/Collection.ts`, `src/core/Controller.ts`, `src/core/Runner.ts`,
`src/core/Scheduler.ts`, `src/core/Workflow.ts`, `src/core/WorkflowManager.ts`,
`src/core/WorkflowPersistence.ts`, `src/core/WorkflowRunner.ts`, `src/core/cloners.ts`,
`src/core/constants.ts`, `src/core/errors.ts`, `src/core/factories.ts`, `src/core/helpers.ts`,
`src/core/phases/Phase.ts`, `src/core/phases/PhaseManager.ts`, `src/core/shapers.ts`,
`src/core/stores/DatabaseWorkflowStore.ts`, `src/core/stores/MemoryWorkflowStore.ts`,
`src/core/tasks/Task.ts`, `src/core/tasks/TaskController.ts`, `src/core/tasks/TaskManager.ts`,
`src/core/types.ts`, `src/core/validators.ts`, `src/server/NodeScheduler.ts`,
`src/server/factories.ts`

Diffstat: `30 files changed, 376 insertions(+), 376 deletions(-)`.

## Gates

Run from `/home/user/fleet/workflow` on 2026-09-02.

| Command | Exit |
| ------- | ---- |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |
| `npm test` | 0 |

No failure excerpt: no gate failed. `npm run lint` and `npm run format` were never needed;
`format:check` passed on the first run. `npm test` reported `Test Files 32 passed`,
`Tests 1133 passed` across the `src`, `policy`, `config`, `setup`, and `guides` projects. Read
that run as the unit's own reading; the Orchestrator's landing chain is authoritative for
timing.

## Acceptance evidence

1. `git diff` changes comment text only. Every added and removed line, stripped of its `+`/`-`,
   matches `^\s*(\*|/\*\*)`; the filter returned nothing outside that set.
2. `node .orkestrel/campaign/instruments/voice-scan.mjs` after landing:
   `workflow files= 35 blocks= 375 imperative= 0 verbless= 3 returnsBad= 0`
   (launch: `imperative=161 verbless=192 returnsBad=11`).
3. A block-by-block comparison against `HEAD` reports 0 violations: no `@example`, `@param`,
   `@remarks`, or `@throws` section changed, and no sentence after the first changed. The only
   tag text in the diff is `@returns`.
4. The gate chain exits 0 at every step.
5. `git status --short` lists 30 paths, all under `src/`.

## Evidence paths

- `/home/user/scaffold/tmp/units/voice/voice-workflow.diff`
- `/home/user/scaffold/tmp/units/voice/voice-workflow.status`

## Deviations

None. Three observations the Orchestrator needs when it re-runs the instrument:

1. **`voice-scan.mjs` still reports `verbless= 3`.** The three are description-less blocks in
   `src/core/types.ts` that open directly with `@remarks` and carry no first sentence:
   `TaskDefinition.retries` (line 40), `TaskDefinition.timeout` (line 49), and
   `PhaseDefinition.bail` (line 77). No transform in the wave applies — there is no first
   sentence to migrate, and writing one would edit `@remarks` prose that acceptance criterion 3
   requires byte-identical. Left untouched.
2. **All-caps and adverb-leading verbs were normalized to sentence case.** `FORCE` became
   `Forces` (5 blocks), `MINT` became `Mints` (3 blocks), and `Permanently end the runner`
   became `Ends the runner permanently` (2 blocks). The rule's form is `Creates` / `Returns`,
   and the scan's third-person pattern reads neither an all-caps opener nor an adverb. Every
   mid-sentence emphasis cap (`BUILDS`, `EXECUTES`, `GATED`, `PERSISTED`) is untouched.
3. **Event-map members took a uniform `Signals that …` opener.** `The workflow began — its
   \`id\`.` became `Signals that the workflow began — its \`id\`.` across the workflow, phase,
   task, and runner event maps. The tuple's substance and every code token are unchanged.
