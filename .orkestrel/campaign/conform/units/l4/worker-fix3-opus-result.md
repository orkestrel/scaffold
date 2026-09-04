## The three literal commands

`…` replaced with the command that produced each capture. A capture's head records the Vitest banner and the dot glyphs, not the invocation, so each reconstruction was checked against the population its capture reports (`(9)` for the factories file, `(48)` for the helpers file) and re-run against the restored tree.

- worker-obj-1 (report `:61`) and worker-subj-2 (report `:164`) — `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/factories.test.ts`
- worker-obj-6 (report `:91`) — `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts`
- worker-obj-8 (report `:115`, `:118`) carried the same abbreviation and took the helpers command; acceptance criterion 1 reaches a report command wherever it sits. Recorded as an ancillary decision.

The worker-obj-1 and worker-subj-2 paragraphs called a red whole-file run and a green `-t`-narrowed run "the exact same command". Each now reports the restored whole-file run (`9 passed (9)`, this round) beside the narrowed one.

## The regenerated inventory's paths

`git status --short` order, repository-relative, all 28 rows — `tests/setup.ts` and `tests/src/core/factories.test.ts` were the omissions:

`README.md`, `guides/README.md`, `guides/worker.md`, `src/core/Worker.ts`, `src/core/factories.ts`, `src/core/types.ts`, `src/server/Dispatch.ts`, `src/server/NodeWorker.ts`, `src/server/factories.ts`, `src/server/handlers.ts`, `src/server/helpers.ts`, `src/server/index.ts`, `src/server/types.ts`, `tests/guides.test.ts`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/src/core/Worker.test.ts`, `tests/src/core/factories.test.ts`, `tests/src/server/factories.test.ts`, `tests/src/server/fixtures/abortable.ts`, `tests/src/server/fixtures/crash.ts`, `tests/src/server/fixtures/identify.ts`, `tests/src/server/fixtures/load-throw.ts`, `tests/src/server/fixtures/slow.ts`, `tests/src/server/fixtures/throw-async.ts`, `tests/src/server/handlers.test.ts`, `tests/src/server/helpers.test.ts`

The "26 files changed" diffstat line and the "lists 26 entries" status statement are deleted; the replacements point at `/home/user/work/evidence/conform-worker.diff` (taken after fix round 2, predating this round) and name the table as the path list. The worker-obj-6 pointers read `guides/worker.md:213` and `tests/src/server/helpers.test.ts:613-639`, and its failing case reads `:614` (the `it` carrying the reported name, verified in the tree).

## Each rewrite, before and after

O3, in `/home/user/fleet/worker`. Every rewrite holds its file's line count, so no `file:line` pointer elsewhere in the report went stale.

- `tests/src/server/helpers.test.ts:203` — "in the eviction tests below" → "in the \`in-flight signal abort\` eviction suite"
- `tests/src/server/helpers.test.ts:206` — "That handoff now re-validates the released resource" → "That handoff re-validates the released resource"
- `tests/src/server/helpers.test.ts:273` — "the dead one the (now-validated) handoff drops" → "the dead one the re-validating handoff drops"
- `tests/src/server/helpers.test.ts:505` — "the direct post-death dispatch spec below pins the latch" → "the \`latched-death path\` suite pins the latch"
- `tests/src/server/helpers.test.ts:804` — "the round-trip tests above are the real proof" → "the \`createNodeWorker\` round-trip suites are the proof"
- `tests/src/core/Worker.test.ts:851` — "the (now-destroyed) pool" → "the already-destroyed pool"
- `tests/src/core/Worker.test.ts:1207-1209` — "the emit-safety guarantee — a throwing observer leaves the worker fully functional (jobs still run against pooled resources, counts balanced), yet the `error` handler fires" → "the emitter's listener isolation — one listener's throw never prevents a sibling listener and reaches the emitter's `error` handler, while the worker stays fully functional (jobs still run against pooled resources, counts balanced)"
- `guides/worker.md:384-386` — "the listener-isolation safety guarantee (the same guarantee applies here — the Worker's bridge never throws, so a buggy worker observer can never corrupt the inner queue or pool)" → "their listener isolation, which holds here too: one listener's throw never prevents a sibling listener, and the throw reaches the emitter's `error` handler, so a buggy worker observer leaves the inner queue and pool intact"
- `guides/worker.md:351` — "the durability guarantees" → "what a store must persist across restarts"

O2, in `/home/user/scaffold/tmp/units/conform/conform-worker-report.md` (line numbers after this round):

- `:95` — "The three local `fixture` declarations" → the declarations named by the files that held them (`tests/setupServer.test.ts`, `tests/src/server/handlers.test.ts`, `tests/src/server/helpers.test.ts`), with `tests/src/server/factories.test.ts`'s prior inline `new URL('./fixtures/double.ts', import.meta.url)` and `new URL('./fixtures/echo-data.ts', import.meta.url)` written out
- `:105` — "replaces all three" → "replaces each"
- `:200`, `:316` — "the three §Patterns fences" → the fences named: `### A resource-backed worker`, `### CPU-parallel jobs over threads`, `### Durable jobs across restarts`
- Report-wide re-sweep, same class: `:22` "the six source files" → "the source files it named"; `:63` "both empty" → "each empty"; `:111` "Both abort specs warm" → "Each abort spec warms"; `:164` "the two spread lines" → "the `on` and `error` spread lines"; `:173` "the same three sentences on the same three bullets" → "the same sentences on the same `concurrency`, `retries`, and `timeout` bullets"; `:219` "Four asserted continuity" → "These asserted continuity"

Report structure: `## Fix round 3` appended, naming both lanes' files, each item, and the sweep; the R1 static-conformance ruling stated under the worker-obj-10 paragraph; the `guides/README.md` inventory row corrected to drop the See-also list fix round 1 deleted; fix round 2's O2 paragraph updated to record that this round closes its open hits; `:322` "should know" restated as a direct claim.

## The sweep, with rulings

`grep -rniE '\b(above|below|now|guarantee|guarantees|guaranteed|ensure|ensures)\b'` over `src tests/src tests/setup.ts tests/setupServer.ts tests/setupServer.test.ts tests/guides.test.ts guides/worker.md guides/README.md README.md`, run in `/home/user/fleet/worker`.

Before the rewrites — 14 hits, ruled:

| Hit | Ruling |
| --- | ------ |
| `tests/src/server/fixtures/slow.ts:10,12`, `tests/src/server/fixtures/identify.ts:13,14` | permitted — the `performance.now()` code token |
| `tests/src/server/helpers.test.ts:203,804` | forbidden — `below` / `above` as pointers; rewritten |
| `tests/src/server/helpers.test.ts:206,273`, `tests/src/core/Worker.test.ts:851` | forbidden — temporal `now`; rewritten |
| `tests/src/server/helpers.test.ts:505` | forbidden — `below` as a pointer; rewritten |
| `tests/src/core/Worker.test.ts:1207`, `guides/worker.md:384,385` | forbidden — `guarantee` as a claim about behaviour; rewritten |
| `guides/worker.md:351` | forbidden — "the durability guarantees" as a claim about behaviour; rewritten. Not named in the Sites; the brief's `guarantees` alternative surfaced it and criterion 2 requires it closed. The line is untouched pre-existing prose, so no edit the unit made was disturbed. |

`ensure` and `ensures` matched nothing at any point.

After the rewrites — only permitted hits:

```
tests/src/server/fixtures/slow.ts:10:		const deadline = performance.now() + value
tests/src/server/fixtures/slow.ts:12:		while (performance.now() < deadline) {
tests/src/server/fixtures/identify.ts:13:		const deadline = performance.now() + value
tests/src/server/fixtures/identify.ts:14:		while (performance.now() < deadline) {
```

Report-side `…` sweep: the remaining hits are `:128` `describe('worker.md fences return the values they claim', …)` and `:227` `describe('isBrowserVuePath', …)` — code elisions, not commands. Ruled permitted.

## `git status --short`

```
 M README.md
 M guides/README.md
 M guides/worker.md
 M src/core/Worker.ts
 M src/core/factories.ts
 M src/core/types.ts
 M src/server/Dispatch.ts
 M src/server/NodeWorker.ts
 M src/server/factories.ts
 M src/server/handlers.ts
 M src/server/helpers.ts
 M src/server/index.ts
 M src/server/types.ts
 M tests/guides.test.ts
 M tests/setup.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/Worker.test.ts
 M tests/src/core/factories.test.ts
 M tests/src/server/factories.test.ts
 M tests/src/server/fixtures/abortable.ts
 M tests/src/server/fixtures/crash.ts
 M tests/src/server/fixtures/identify.ts
 M tests/src/server/fixtures/load-throw.ts
 M tests/src/server/fixtures/slow.ts
 M tests/src/server/fixtures/throw-async.ts
 M tests/src/server/handlers.test.ts
 M tests/src/server/helpers.test.ts
```

The unit's paths and nothing new. `git diff --stat`: `28 files changed, 791 insertions(+), 433 deletions(-)`.

## Exit codes

| Command | Exit code | Reading |
| ------- | --------- | ------- |
| `npm run format:check` | 0 | `All matched files use the correct format`, 72 files |
| `npm run lint:check` | 0 | no diagnostic |
| `npm run check` | 0 | `check:src:core` and `check:src:server` clean |
| `npm run test:guides` | 0 | `18 passed (18)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/helpers.test.ts` | 0 | `48 passed (48)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core tests/src/core/Worker.test.ts` | 0 | `35 passed (35)` |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/factories.test.ts` | 0 | `9 passed (9)` (the literal-command check) |

Every reading was taken inside this exec with its harness resident; the deciding run belongs to you after this unit exits. No capture file was written, because `/home/user/work/evidence/` is outside this round's Owned set.

**Deviation state: none.** No gate reddened. Ancillary decisions taken and recorded in the report's `## Fix round 3` § Ancillary decisions: the `guides/worker.md:351` closure outside the named Sites, the `:115` and `:118` commands made literal outside the named rows, the `:322` `should` restated, the worker-obj-10 opening capitalized, the `guides/README.md` inventory row corrected, and fix round 2's O2 paragraph updated.

Files touched: `/home/user/fleet/worker/tests/src/server/helpers.test.ts` (five comment rewrites), `/home/user/fleet/worker/tests/src/core/Worker.test.ts` (temporal `now`, listener-isolation property), `/home/user/fleet/worker/guides/worker.md` (listener-isolation property, store durability), `/home/user/scaffold/tmp/units/conform/conform-worker-report.md` (literal commands, regenerated inventory, tallies, pointers, `## Fix round 3`).
