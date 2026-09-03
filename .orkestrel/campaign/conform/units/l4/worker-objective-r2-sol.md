## Per-claim verdicts

1. **CONFIRMED.** The disposition table covers every named row as `applied` or `noop` (`conform-worker-report.md:27-47`). The corresponding changes and noop evidence are present.

2. **REFUTED.** Worker-subj-6 leaves “The pool's `max` defaults to `concurrency`” in public TSDoc (`src/core/factories.ts:11`), despite the required “Default: …” form (`typescript.md:79`). The report grants an unsupported exception (`conform-worker-report.md:175`). Rewrite it using `Default: …`.

3. **CONFIRMED.** Sweeps over `src`, `tests`, `guides/worker.md`, `guides/README.md`, and `README.md` used `\bspawnThread\b`, case-insensitive `\b(spawnThreads?|spawnThreaded|spawnThreading)\b`, `` `dispatch`|\bdispatch\(|import .*\bdispatch\b ``, case-insensitive `\b(dispatches|dispatched|dispatching)\b`, and `\bQueueExecution\b`. Old forms are absent. Inflection hits at `src/server/Dispatch.ts:10`, `src/server/types.ts:34`, `tests/src/server/helpers.test.ts:52,537`, and `guides/worker.md:225,320` are permitted English senses. The report records these sweeps (`conform-worker-report.md:343-345`).

4. **REFUTED.** Worker-obj-10 has no negative control (`conform-worker-report.md:142-144`). Worker-obj-1 and worker-subj-2 use narrow red commands but broad server-project runs for green (`conform-worker-report.md:61,162`), not the same command. Run each exact narrow command after restoration. Supply a deterministic worker-obj-10 control or record that row as stopped.

5. **CONFIRMED.** The `AGENTS[^\n]*§` sweep over the owned `src`, `tests`, `guides/worker.md`, `guides/README.md`, and `README.md` population is empty. `WorkerInterface` methods (`src/core/types.ts:95-118`) match the guide table (`guides/worker.md:131-139`); readonly data appears at `guides/worker.md:110,117-120`; published-specifier fences are transcribed at `tests/guides.test.ts:199-255`.

6. **CONFIRMED.** Breaking exports, replacements, and the `QueueExecution` → `QueueContext` change are recorded (`conform-worker-report.md:280-289`). Sweeps for `\bspawnThread\b` and imports from `@orkestrel/worker` across `/home/user/fleet` and `/home/user/scaffold/src` found no external consumer.

7. **CONFIRMED.** Current `git status --short` and `git diff --name-only HEAD` list only Owned paths. The `@deprecated|compatib|\bshim\b|export…spawnThread|dispatch…as` sweep over `src` and `tests` found no compatibility surface. `package-lock.json`, `node_modules`, and off-limits paths are untouched.

8. **CONFIRMED for source; NOT-EVIDENCED for gates.** Added-line and owned-tree sweeps found no `.skip(`, `.only(`, `.todo(`, framework retry, inflated framework timeout, TODO, or debugger. The timeout at `tests/src/server/helpers.test.ts:251` is a per-entry deadline. The report names the required gate commands (`conform-worker-report.md:270-274`); the Orchestrator’s landing run settles them.

9. **CONFIRMED.** Added-line sweeps for `TODO|FIXME|debugger|console\.` and owned-tree sweeps excluding vendored tests found only executable examples at `guides/worker.md:78-80` and `src/server/Dispatch.ts:50`. No deferred row, commented-out implementation, or debug residue entered the tree. The disposition table agrees with the changed paths.

## Findings outside the claims

O1. Added prose uses forbidden positional pointers: `tests/guides.test.ts:3,195` and `tests/src/server/helpers.test.ts:19`. Replace `below` and `above` with `following` and `preceding`.

O2. `tests/setupServer.test.ts:77` uses temporal `now`, forbidden by `writing.md:41,92`. Remove `now`.

O3. The report contains stale and false pointers. Examples include `conform-worker-report.md:70,107-109`, whose evidence is at `tests/src/server/factories.test.ts:38,54,78` and `tests/src/server/helpers.test.ts:239,275,727`. It also claims a `guides/README.md` See-also introduction exists (`conform-worker-report.md:196`), but that section was deleted. Refresh the pointers and record the deletion.

## Referrals to the Orchestrator

R1. Will the landing run record the deciding results for `format:check`, `lint:check`, `check`, `build`, and `test`?

R2. Where is the ruling that permits worker-obj-10 to close without a negative control?

R3. Does the campaign inventory name a consumer outside `/home/user/fleet` for the breaking server exports?

FAIL 2, 4