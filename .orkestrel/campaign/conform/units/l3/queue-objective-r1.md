## Lane held

**Objective** — correctness, constraints, and what the code and contracts actually permit. Recorded substitution for the dark GPT-5.6 Sol bench. My own engine wrote the subject; I re-derived every sweep the distillate reported rather than adopting its readings, and opened each site it marked moved, missing, or mismatched.

---

## Per-claim verdicts

**1. Every row dispositioned, none silently skipped — CONFIRMED**
The report's table (`/home/user/scaffold/tmp/units/conform/conform-queue-report.md:10-31`) carries a disposition for every numbered row and both fleet rows. `fleet-F1` and `fleet-F2` are `noop` with the paths read; I confirmed neither subject exists — no `isBrowserVuePath` in `/home/user/fleet/queue/tests/setup.ts:1-141`, and no public `readonly id: string` field in the implementation classes. The one non-standard closure, `queue-obj-4`, is disclosed in full at `conform-queue-report.md:33-40`, not omitted. No row is absent and no row is silent.

**2. Each `applied` row implements the refuter's operative repair — CONFIRMED, with one recorded exception (F-1)**
I opened each site rather than trusting the report. The refuter's *amendments* were followed over the finders' originals at every point they diverge: `tests/setup.ts:74-93` records into plain arrays, not `RecorderInterface`; `tests/setup.ts:33-49` moves `QUEUE_EVENTS` and `QueueEvent` unconditionally; `src/core/types.ts:148-153` leaves the `QueueEntryOptions` `retries` and `timeout` bullets untouched; `guides/queue.md:341` and `guides/README.md:59-60` write rule references as plain prose, not markdown links. `src/core/Queue.ts:141`, `src/core/factories.ts:26-28`, `:88`, `src/core/types.ts:173-178`, `src/core/stores/DatabaseQueueStore.ts:5` all read as ruled. Exception: `queue-obj-4` (F-1).

**3. No old name survives — CONFIRMED**
My own sweep, `\b(entryOf|memoryStore|failingSaveStore|QueueExecution)\b` case-insensitive over `/home/user/fleet/queue` excluding `node_modules`: no matches. A second sweep, `§[0-9]|AGENTS §|\bQueueExecution\b|\bexecution\b` over `{src,tests}/**/*.ts`, returns only the ordinary English noun the row expressly permits (`src/core/types.ts:106,231,235,237`; `src/core/Queue.ts:78,140,253,285,291,633`; `tests/src/core/Queue.test.ts:685,829`). `guides/queue.md` and `guides/README.md` return no banned inflection. The report's Sweeps table (`conform-queue-report.md:89-97`) names `src`, `tests`, `guides/queue.md`, `guides/README.md`, and `README.md`. One recorded pattern is malformed (F-2); the tree state is verified independently of it.

**4. Failing-first proofs and old-form sweeps — CONFIRMED**
`queue-obj-3`: same command both runs, `npm --prefix /home/user/fleet/queue run test:guides`; red `Tests 2 failed | 24 passed (26)` at `/home/user/work/evidence/queue-proofs/queue-obj-3-guides-red.txt:52`, green `Tests 26 passed (26)` at `queue-obj-3-guides-green.txt:11`, 14 seconds apart. The red file's excerpts (`:21-27`, `:40-44`) show the planted assertions failing at the live sites, so the transcription genuinely executes `isQueueTimeout` and the store. `queue-obj-5`: red `2 failed | 5 passed (7)`, green `7 passed (7)`, failures at `tests/setup.test.ts:30` and `:51`. The tests naming both defects are in the diff (`conform-queue.diff:515`, `:669`). Documentation and placement rows carry sweeps.

**5. Guide parity — CONFIRMED**
`guides/queue.md:141-151` lists exactly `QueueInterface`'s call-signature members at `src/core/types.ts:227-244`; `:157-162` matches `QueueStoreInterface` at `:286-291`. The readonly data members stay Surface rows (`guides/queue.md:79`, `:131`). The rename lands in the Types table at `:75-76`. Every fence imports the published specifier `@orkestrel/queue` (`:40`, `:106`, `:125`, `:186`). I checked the parity risk the refuter flagged: `guides/README.md`'s new mirror bullets register no manifest entry, because `parseManifest` reads only tables under the manifest section (`node_modules/@orkestrel/guide/dist/src/core/index.js:1518-1528`), and the concept and directory tables are unchanged at `guides/README.md:6-16`. No numbered `AGENTS §` citation survives in any touched file.

**6. Breaking change named with consumers and edits — CONFIRMED, with F-3 recorded**
`conform-queue-report.md:143-149` names `queue-subj-13` breaking, states no alias was added, and explains the re-pin timing. § Shared-file patches (`:151-261`) gives an exact substitution for every consumer site the brief named. My external sweep confirms the source population is exactly those files: `worker/src/{core/types.ts,core/Worker.ts,server/types.ts,server/Dispatch.ts,server/helpers.ts,server/NodeWorker.ts}`, `workflow/src/core/Runner.ts`, `agent/src/core/helpers.ts`. Nothing in this package renames or removes a published symbol without an entry. One consumer file outside the brief's named sites needs an edit the report describes but does not patch (F-3).

**7. Scope and no shims — CONFIRMED**
`/home/user/work/evidence/conform-queue.diff` carries exactly 13 `diff --git` headers, matching `/home/user/work/evidence/conform-queue.status:1-13` and the report's Files touched table one for one. Every path is under the brief's Owned row. `package-lock.json`, `node_modules/`, `package.json`, `configs/`, `tsconfig.json`, `vite.config.ts`, `.claude/`, `tests/setupPolicy.ts`, `tests/policy.test.ts`, and `tests/config.test.ts` are all untouched. No compatibility alias, re-export, or shim: `QueueExecution` has zero occurrences anywhere in the package, and `src/core/index.ts` is not in the diff.

**8. First conjunct CONFIRMED; independent gate run NOT-EVIDENCED**
No `.skip(`, `.only(`, or `.todo(` appears on any `+` line of the diff, and none exists in `/home/user/fleet/queue/tests`. No `testTimeout`, `hookTimeout`, or retry option was added; every `retry` and `timeout` hit on a `+` line is queue-domain vocabulary or a scripted case. The report's § Gates (`conform-queue-report.md:110-122`) names `format:check`, `lint:check`, `check`, `build`, and `test`, each with its command, exit 0, and a captured file. The independent gate reading is **NOT-EVIDENCED**: no read-only lane can take it, and the Orchestrator's deciding run at landing settles it.

**9. Nothing hidden — CONFIRMED**
No added `TODO`, `FIXME`, `console.*`, `debugger`, `@ts-ignore`, `@ts-expect-error`, `@ts-nocheck`, or `eslint-disable` on any `+` line. No commented-out code: the only `+` line matching a commented-statement pattern is prose at `conform-queue.diff:578`. No `as` type assertion entered the tree; the single `as const` at `tests/setup.ts:41` is expressly permitted by `.claude/rules/typescript.md:29` and is used for exactly the sanctioned purpose, deriving the `QueueEvent` literal union at `tests/setup.ts:49`. The disposition table matches the diff at every row I sampled.

---

## Findings outside the claims

**F-1 — `queue-obj-4`'s disposition label overstates what landed.**
`conform-queue-report.md:13` records `applied`. No edit implements the row's operative repair; the type import ceased to exist when `queue-obj-5` deleted `entryOf` (`tests/src/core/stores/MemoryQueueStore.test.ts:1-4` is now value-only). The rule at `.claude/rules/typescript.md` § Syntax and imports is satisfied vacuously, and applying the repair literally would have reddened `check` under `noUnusedLocals`, so the outcome is right. The label is not: `applied` reads as "the ruled edit was made". **Right looks like:** change the Evidence cell's disposition to `noop by composition` (or `applied by queue-obj-5`), keep the Composition note at `:33-40` as its evidence, and state in that note that the row's precondition was removed by a same-brief row rather than that the repair was performed.

**F-2 — one recorded sweep pattern cannot run as written.**
`conform-queue-report.md:92` records `queueexecution\|entryOf\|memoryStore(\|failingSaveStore`. After table-escaping, the pattern is `queueexecution|entryOf|memoryStore(|failingSaveStore` — an unclosed group, which `rg` rejects rather than returning empty. The result column reads `empty`, which no run of that pattern could produce. The tree is in fact clean; I verified it with `\b(entryOf|memoryStore|failingSaveStore|QueueExecution)\b`. **Right looks like:** replace the cell with the pattern actually run, and re-record its result.

**F-3 — a consumer guide edit the rename obliges is named but not patched.**
`/home/user/fleet/worker/guides/worker.md:103` and `:198` carry `QueueExecution` by name, and `:98` documents `WorkerHandler` as `(input, resource, execution) => …`, whose third parameter the report's own patch renames to `context` at `worker/src/core/types.ts:44`. The report states the obligation in prose (`conform-queue-report.md:268-270`) with no path, line, or patch. **Right looks like:** the worker unit's brief carries `worker/guides/worker.md:98`, `:103`, and `:198` as owned sites with the substitution `QueueExecution` → `QueueContext` and `execution` → `context` in the shape row and Surface row, alongside the prose mentions at `:19`, `:149`, `:152`, `:199`, `:204`, `:280`, `:283`, `:427`.

**F-4 — the renamed type's own TSDoc still calls it an execution handle.**
`src/core/types.ts:106` reads `Represents the per-attempt execution handle a queue handler receives.` above `export interface QueueContext` at `:114`. No confirmed row names this line, so the unit was right to leave it; the guide's matching row at `guides/queue.md:75` already says "The per-attempt handle a handler receives". **Right looks like:** the queue-prose follow-on rewrites `:106` as `Represents the per-attempt context a queue handler receives.`

**F-5 — the report's recorded out-of-scope findings point at stale lines.**
`conform-queue-report.md:306` cites `DatabaseQueueStore.test.ts:206`; the pointer is at `:194`. `:310` cites `MemoryQueueStore.test.ts:11`; `four-method` is at `:12`. `:311` cites `tests/guides.test.ts:36`; `the second assertion below` is at `:47`. The follow-on brief is built from these. **Right looks like:** correct the three line numbers in the report before the queue-prose follow-on is briefed from it.

---

## Referrals to the Orchestrator

**R-1 — vendored `guides/queue.md` mirrors go stale at publish.** `worker/guides/queue.md`, `workflow/guides/queue.md`, `agent/guides/queue.md`, and `probe/guides/queue.md` each still contain `QueueExecution`. They are byte-identical mirrors this unit was correctly forbidden to touch, and a mirror is refreshed rather than rewritten. Sequence the re-vendor into each consumer's unit after `@orkestrel/queue` publishes.

**R-2 — the fleet-wide `execution` binding vocabulary.** The refuter routed the finder's closing question to you and it was settled for the type name only. Whether the consumers' *prose and local bindings* follow `context` is a naming and design-fit question; the subjective lane is not running this round, so I record it rather than ruling it.

---

## Claims attacked and held

I re-derived every sweep in the distillate with my own patterns and paths, opened all thirteen changed files at the sites the rows name, read the four control logs rather than the report's counts, read `parseManifest` in the installed `@orkestrel/guide` to test the manifest-drift risk myself, read `.claude/rules/typescript.md:29` to test the `as const` question, and ran the external `QueueExecution` sweep over the whole fleet rather than the distillate's narrower glob — which is what surfaced F-3 and R-1. Claim 8's independent gate reading is the only thing this lane cannot settle.

PASS
