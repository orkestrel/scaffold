# Fix report: queue

## Dispositions

- **s16-19** applied (src/core/helpers.ts, src/core/Queue.ts, src/core/index.ts, src/core/types.ts, guides/queue.md, tests/src/core/helpers.test.ts): Applied the DRIFT-RESHAPE correction. Added src/core/helpers.ts with two exported leaves and barrelled it from src/core/index.ts: `readOption(options, option, message)` reads one named entry option once inside a boundary that turns a throwing getter into the coded read failure, and `validateOption(value, guard, option, message)` applies a `Guard<T>` from @orkestrel/contract and throws the coded invalid-value failure. Per the reshape, `validateOption` is called from both sites and `readOption` from `enqueue` alone; the constructor keeps its bare reads. Every error message, code, context, read count, and fail-fast order is preserved verbatim, so the pinning tests at Queue.test.ts:1632, 1790, 2055, 2138, 2154 pass unchanged. Added the Helpers Surface section with rows plus a fence to guides/queue.md and a mirrored tests/src/core/helpers.test.ts, since a centralized file's declarations are exported, barrelled, and testable. `validateOption`'s `option` parameter needed a named type, so `QueueOption` was added to src/core/types.ts and `QueueErrorContext.option` now references it — additive and structurally identical.
- **s16-20** applied (src/core/Queue.ts): Deleted the `#aborted` and `#destroyed` fields and read `this.#abortPromise !== undefined` / `this.#destroyPromise !== undefined` at every read site, taking only the first branch as both lanes directed. Kept `#stopped` and kept both latches, which `stop`, `abort`, and `destroy` return as their reentrant barriers. Behaviour is identical: each deleted flag was assigned on the line immediately after its latch in the sole method that set it, and nothing read either between those two lines.
- **s16-22** applied (src/core/types.ts, src/core/Queue.ts): Added a one-line TSDoc to each of the five `QueueInterface` data members, stating what each reports (`count` = reserved live entries, `active` = claimed in flight, `stopped` = stopped or aborted), and added `@returns` to `restore`, `stop`, `clear`, and `destroy` on the class. Struck `abort` from that list as both lanes directed — it already carries `@param` and `@returns`. Applied only what the lanes share: the class getters, which one lane added and the other did not name, were left alone. The four methods' existing first sentences were kept verbatim rather than reworded, so this change does not smuggle in the voice conversion s16-26 defers; the sentences I authored use the third-person form.
- **s16-23** applied (src/core/validators.ts, src/core/Queue.ts, src/core/stores/MemoryQueueStore.ts, guides/queue.md, tests/src/core/validators.test.ts): Added `isStoredEntry` to src/core/validators.ts as a total guard over `StoredEntry<unknown>` (isRecord, string `id`, `input` present, `isQueueRetries(attempts)`, wrapped so a hostile accessor answers false), and routed both sites through it exactly as both lanes corrected: each site materializes its single foreign reads into an owned `candidate` first and guards that copy, never the caller's object, so the one-read count MemoryQueueStore.test.ts:234 fixes is unchanged. Added the Guards row and fence entry to guides/queue.md and a mirrored tests/src/core/validators.test.ts.
- **s16-24** applied (src/core/validators.ts): Applied only the half both lanes share: `isQueueTimeout` now reads `MAX_TIMEOUT_MS` imported from @orkestrel/timeout instead of the bare `2_147_483_647` literal, and no local `MAX_TIMEOUT` was declared. The `DEFAULT_CONCURRENCY` / `DEFAULT_RETRIES` / `DEFAULT_TIMEOUT` half is a genuine lane conflict and is reported as a deviation rather than resolved, so no src/core/constants.ts was created. The `2_147_483_647` literals in the types.ts prose were left as written — see deviations.
- **s16-26** deferred_wave: The finding's only repair is the TSDoc first-sentence voice conversion from imperative to third person across validators.ts, errors.ts, Queue.ts, the two stores, and (per the reshape) types.ts:212-229. The fleet ruling defers that to the dedicated wave, so nothing was applied. The TSDoc sentences this unit authored for other findings — `isStoredEntry`, `readOption`, `validateOption`, the five interface data members — already use the third-person form and the `True if …; false otherwise` boolean `@returns` form, so the wave will find them conformant.

## Gates

- npm run format:check: pass — First run reported issues in guides/queue.md and src/core/Queue.ts (files this unit wrote). Converged with `npm run lint` then `npm run format` as the brief directs, then re-ran the non-mutating chain from the top: "All matched files use the correct format. Finished in 2121ms on 48 files using 4 threads."
- npm run lint:check: pass — oxlint --config .oxlintrc.json --deny-warnings . — no output, exit 0
- npm run check: pass — tsc --noEmit --project tsconfig.json and tsc --noEmit -p configs/src/tsconfig.core.json both clean
- npm run build: pass — 10 modules transformed; dist/src/core/index.js 34.88 kB, dist/src/core/index.cjs 35.63 kB; declaration files built in 2364ms; built in 2.56s
- npm test: pass — src:core 6 files / 151 tests passed; policy 111 passed; config 46 passed; setup 1 passed; guides 23 passed. Baseline before any edit was src:core 4 files / 133 tests; the 18 added tests are the new helpers and validators suites.

## Diffstat

```text
 guides/queue.md                     |  69 ++++++++----
 src/core/Queue.ts                   | 218 ++++++++++++++++++------------------
 src/core/index.ts                   |   1 +
 src/core/stores/MemoryQueueStore.ts |  11 +-
 src/core/types.ts                   |  17 ++-
 src/core/validators.ts              |  33 +++++-
 6 files changed, 207 insertions(+), 142 deletions(-)

Untracked (not counted by git diff --stat): src/core/helpers.ts 67 lines, tests/src/core/helpers.test.ts 105 lines, tests/src/core/validators.test.ts 58 lines.
```

- dist moves: true

## Deviations

1. s16-24 lane conflict, unresolved by design. The two DRIFT-RESHAPE corrections contradict each other on the defaults half: one says "Drop the DEFAULT_CONCURRENCY / DEFAULT_RETRIES / DEFAULT_TIMEOUT half, the cited rule governs module-scope constants and these are inline literals in a constructor body"; the other says "add src/core/constants.ts (barrelled) with DEFAULT_CONCURRENCY, DEFAULT_RETRIES, and DEFAULT_TIMEOUT, and read them from the constructor". Re-verification cannot settle it — both readings of the constructor's literals are defensible and the choice decides whether three new symbols enter the published surface. Per the brief I applied only what they share (the MAX_TIMEOUT_MS import) and report the rest. The work order needs a ruling on whether queue publishes DEFAULT_CONCURRENCY / DEFAULT_RETRIES / DEFAULT_TIMEOUT.

2. s16-24 prose, deliberately not changed. One lane also asked to "reference the named constants from the types.ts:163-168 prose". I left the `2_147_483_647` literals in the types.ts remarks as written. `MAX_TIMEOUT_MS` is exported by @orkestrel/timeout and not re-exported by @orkestrel/queue, so naming it in queue's own TSDoc would point a consumer at an identifier they cannot import from this package — worse for the reader than the literal. The finding's substantive complaint (one enforced ceiling, not two) is closed by the validator now reading the imported constant.

3. s16-22 lane difference, resolved by taking the shared substance. One lane asked for the one-line TSDoc on "the five interface members and the five class getters"; the other named the interface members only, as did the finding's own repair line. I documented the interface members and left the class getters undocumented.

4. Scope note, not a blocked item. Two dossier repairs direct new barrelled exports (helpers.ts, isStoredEntry). AGENTS.md § Design laws requires exported reusable logic to be tested, so I created tests/src/core/helpers.test.ts and tests/src/core/validators.test.ts at their mirror locations and added their rows to the guide's Tests section. The brief permits creating a test "where a repair requires it"; flagging it because it is the only file creation beyond the two the dossier names.

5. No off-limits file was touched. `git status` lists only src/core/**, tests/src/core/**, and guides/queue.md. The tree is uncommitted and unstaged. `npm run build` regenerated dist/, which is gitignored here and so does not appear in status.
