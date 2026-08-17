# Unit T6-design — expand @orkestrel/test from the fleet's measured demand

One brief, two blind lanes. Your dispatch names your lane: **SUBJECTIVE** (Opus 5
`planner`) or **OBJECTIVE** (GPT-5.6 Sol `analyst`). Hold only your lane; you never see
the other's answer. Perform the assignment directly and spawn nothing. Read-only.

## Authority

`AGENTS.md` (Design laws — single-word entity APIs, minimal public API with first real
consumer, no superfluous wrappers, mechanism not policy, ecosystem reuse),
`.claude/rules/names.md`, `.claude/rules/tests.md`, `.claude/rules/patterns.md`,
`.claude/rules/architecture.md`. The subject package is `/home/user/test`
(@orkestrel/test 0.0.3): read `src/core/types.ts`, `src/server/types.ts`, and both
barrels first. Its guide is `guides/`.

## Evidence — read these three distillates; they are the demand ground truth

- `.orkestrel/test/sweep1-distillate.md` — supervisor + middleware (live checkouts).
- `.orkestrel/test/sweep2-A-distillate.md` — 21 fleet source trees (abort…program).
- `.orkestrel/test/sweep2-B-distillate.md` — 19 fleet trees + the test package + scaffold.

Together they cover 42 of the fleet's ~44 package trees; private form/table unread.

## Probed standing facts (verified this round; trust them)

1. Published `roundTripJSON` 0.0.3 accepts interface-typed values: a `tsc --strict
--noEmit` probe with an interface snapshot exits 0. The workflow/workspace/agent
   local copies and their comments rest on a stale belief.
2. `Promise.withResolvers` is a native function on the fleet's Node and the test
   package's tsconfig targets ESNext with ESNext lib.
3. `isBrowserVuePath` appears nowhere in the scaffold repository's own source or tests —
   the ~40 identical copies are hand-carried boilerplate, not template output.
4. The existing 13 exports: waitForDelay, captureError, requireValue, collect,
   collectStream, roundTripJSON, resolveRoot, createRecorder (core); resolveContained,
   matchesIdentity, isExcluded, readInventory, createScratch (server).

## The question

Which capabilities move INTO @orkestrel/test, with what names and shapes; which clusters
resolve instead as deletions, native-API adoptions, or adoption sweeps of the existing
surface; and which stay in their packages. The demand gate binds: promote a shape only
where at least two packages exercise matching semantics today; name the consumer set for
every proposal.

Clusters the distillates establish (verify pointers yourself; numbers are theirs):

- Emitter recorder bundle (`createErrorRecorder`/`recordEmitterEvents`/`isTotal`): 14
  packages, thin compose over `createRecorder`, drifted error strings.
- Deferred gate (`createGate`/`createDeferred` + inline `Promise.withResolvers`): ~8
  packages, ~150 sites. Standing fact 2 bears directly.
- Loopback fixtures: start-and-keep servers in ~7 packages (router, server-unused,
  websocket, terminal, scaffold, mcp, middleware); reserve-then-release ports in 2
  (supervisor, browser). Prior ruling P1 (debrief) held reserve local until a third
  consumer; browser is now the second reserve consumer and the family is nine wide.
- Predicate/deadline waits: waitForCondition (browser), retryUntil (ollama AND
  supervisor, near-twins), waitForRequest (ollama), waitForSettlement (mcp), inline
  loops (supervisor).
- Teardown registrars: createTeardown (mcp, worker — near-twins), createCleanups
  (indexeddb, database), destroyTempDirectories (browser).
- requireElement (queue, terminal); deepFreeze (reason, rater); invokeRaw (reason,
  rater, interpret); seeded mulberry32 PRNG (sse, websocket); injected timer (terminal
  flush-all vs toolbox fire-by-index); manual clock (mcp, middleware); chunk-invariance
  corpus feedAll/chunkings/partition (sse, ndjson); hostile-input builders (qualifier,
  reason, workspace, scaffold, contract, html — shapes differ); signal instrumentation
  (mcp createSignalRecorder + waitForAbort, workflow instrumentSignal, supervisor
  waitForAbort); SSE/NDJSON framed readers (mcp, supervisor) — note @orkestrel/sse and
  @orkestrel/ndjson exist as runtime packages, so ecosystem reuse binds; IndexedDB trio
  (indexeddb, database) — @orkestrel/test has no browser entry today; waitForEvent
  (supervisor); ApplicationCookieJar (supervisor); hasProcess + process-exit waits
  (supervisor, browser); guarded narrow `assertAndNarrow` (csv) beside `requireValue`.
- Adoption gaps needing no API change: resolveRoot (0 adopters; ~5 packages hand-roll
  the constant), collect (database collectRows ~80 sites; supervisor), collectStream
  (csv), roundTripJSON (workflow, workspace, agent + inline), createScratch (supervisor
  createTemporaryDirectory ~70 sites; sqlite; test's own helpers.test.ts), requireValue
  (sse expectDefined; supervisor readGuideText), readInventory (brief, supervisor),
  waitForDelay (ollama waitForRequest).
- The 40-copy `isBrowserVuePath` and the line-aligned `config.test.ts` mkdtemp sites:
  rule where the fix belongs (test export, scaffold template, deletion) — standing
  fact 3 bears.

## SUBJECTIVE lane (Opus 5 planner)

The coherent API: which capabilities join, under what single-word names, in which entry
(core/server/and whether a browser entry is warranted now); the vocabulary (one concept
one term across the new and existing exports); what the guide's story becomes; at most
two real alternatives for the contested shapes (gate-vs-native, one-wait-vs-two,
serve+reserve naming, recorder-bundle shape); bounded units with role AND engine;
Tensions for the other lane; risks.

## OBJECTIVE lane (GPT-5.6 Sol analyst)

Correctness and constraints: reserve-then-release TOCTOU semantics versus start-and-keep
and what each consumer actually needs; whether the recorder bundle's `isTotal` guard
survives generic typing; withResolvers migration validity at every consumer's TS/Node
floor; the ecosystem-reuse conflict on SSE/NDJSON readers; JSONValue-bound adoption
consequences at the three local-copy sites; PRNG determinism contract; teardown
registrar failure semantics (allSettled + AggregateError vs reverse-order dispose);
which proposed shapes would violate the mocks/fake-clock law and which injected-time
shapes are legitimate inert stubs; the browser-entry build/config cost in the test
package; per-cluster verdict on the demand gate with the exact consumer list.

## Scope

Read-only. Off-limits: `tmp/**`, `node_modules/**`, `.git/**`, credentials, and
`.orkestrel/test/matrix.md` if present (the Orchestrator's working notes).

## Output

Numbered proposals, each: capability, name(s) and entry point, shape sketch (types-first,
readonly), consumer list from the evidence, migration note (what each consumer deletes),
and — for a cluster you rule OUT — the reason (native API, ecosystem reuse, domain
policy, insufficient demand). End with exactly one line: `DESIGN <LANE>: <n> proposals`.
