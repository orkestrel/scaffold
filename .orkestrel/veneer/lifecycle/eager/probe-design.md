# Probe item 1: design of record (judged, 2026-10-04)

## The user's rulings (2026-10-04)

- **T1 onset:** `initialize` waits for the full arm; U4 measures the Windows onset, and when it exceeds Codex's default startup budget the guide documents `startup_timeout_sec` for Codex.
- **T1 revised by the user (2026-10-05), after U4 and the veneer readings (`probe-readings.md`, and probe `tmp/codex/eager-probe-veneer2-last.md`):**
  - **The evidence:** veneer's type warm takes 37.2 s at the median (36.4 to 50.0 s), and its whole arm 46.4 s. The eager build refused `initialize` on veneer in 3 runs of 3. Published 0.0.20 refused its first two `prove` calls on veneer and recovered only after an idle replacement warm.
  - **Ruling 1:** `initialize` waits for the lint and runtime stages only. The type stage starts warming at server start and keeps warming behind the handshake. A `prove` that needs the type stage waits for its warm. A type warm failure is reported at the next call, and its replacement follows the pool's `restarts` bound.
  - **Ruling 2:** the warm has its own bound, separate from the inspection deadline (`PROBE_DEADLINE`, 30 s). Its default leaves clear room above veneer's slowest measured warm, and it is overridable per instance like `deadline`. Inspections keep their deadline.
- **T2 restarts:** `PROBE_RESTARTS = 1`, as browse.
- **The critic's eight gaps bind the build:** L-3 re-ruled against the lsp `timeout` rejection (the child confirmed alive); teardown during onset stays `destroyed` with no wrapped refusal, no `error` event, and no stderr line; `TypeStage.resolve` calls `start()` first; the onset refusal unwraps a `PoolError`'s cause; `Probe.start()` calls every pool's `start()` on every call (no kick inside `#lease`); the lint fixture counts spawns; a teardown signal cuts a warm in flight; the deadline path catches `token.destroy()`.

## Shape

Lane: objective. This lane rules correctness against the code and what pool 0.0.14, mcp 0.0.36, and probe 0.0.20 permit. Base: the mirror proposal. It moves the warm into the pool's `create`, drops the queues, keeps the rejection from `Probe.destroy`, and destroys the pools before it awaits the boot. Grafts from the minimal proposal:
- the promise-valued `exit` member in place of an emitter;
- T-18 closed on the contract precedent, with no install unit;
- `destroy` at end of input, as browse does;
- `#prove` left as a join, with no call-signal race;
- the pid-kill recovery test;
- the suite wall-time reading.

DESIGN
1. Stages (`src/server/stages/*.ts`)
   - Constructors do no I/O.
   - `StageInterface.start()` begins the warm, or joins the warm already begun (`??=`). `inspect` calls it.
   - `LintStageInterface.exit: Promise<never>` rejects with today's fault `The Oxlint language server exited with code N`, only while `#closing` is undefined. It never fulfills and is observed internally once.
   - `LintStage.#retire` records `#ending` only before teardown.
   - `#translate` reads `#ending` before the closing latch.
2. Pools (`Probe.ts`). The constructor reads the toolchain and builds three pools with no I/O. Each pool is `createPool({ create, destroy, error, min: 1, restarts: PROBE_RESTARTS })`. The lint pool adds `watch: (stage) => stage.exit`. No pool sets `validate`.
   - `create` constructs the stage, then awaits `stage.start()` raced against the probe deadline. On failure or expiry it awaits `#dispose(stage)` and rethrows, so the pool strikes.
   - `destroy` is `#dispose` (see the L-3 ruling).
   - `error` is `#surface`.
3. Leases
   - Every stage inspection and every project resolution calls `acquire()` synchronously, before its first await, so arrival order holds. Then it runs `#bound`.
   - Success, or a failure other than the deadline, calls `release()`.
   - A deadline refusal awaits `token.destroy()`, emits `expire` unless `#closing` is set, then throws the refusal.
   - `#lease(pool)` maps the pool errors:
     - `PoolError` `destroyed` becomes `createDestroyedError('probe')`.
     - `create` calls `void pool.start().catch(() => {})` once, because a spent floor resets its strikes at Pool.ts:157. It then rethrows the cause.
     - `cleanup` rethrows its cause.
   - Delete the three queues, `#typeTail`, `#admitType`, `#recycle`, `#destroyStage`, the identity branch of `#emitExpiry`, and the mutable stage fields. Remove `@orkestrel/queue` from package.json.
4. Arming. `Probe.start()` is public and is today's `#ready` contract.
   - It joins an attempt in flight and begins one replacement after a refused attempt.
   - `#arm` checks support, creates the workbench, then awaits the three pools' `start()` inside the boot's wrapping `try`, so every rejection is a `ProbeError` (`The probe could not arm: …`). It then runs the boot controls and emits `arm`.
   - `prove` calls `start()`.
5. Teardown (`Probe.#destroy`)
   - Set `#closing`, then call `destroy()` on each pool and collect the barriers. This abandons a boot in flight.
   - Await `#arming` with its rejection caught, so the boot's `finally` removes its files first.
   - Await the barriers and rethrow the first failure cause from a `cleanup` `PoolError`, which keeps Probe.ts:673.
   - Destroy the emitter in `finally`.
6. Server (`ProbeServer.ts`)
   - `start(): Promise<void>` is `#starting ??= #setup()`, observed internally.
   - `#setup` runs today's forwarders, signals, and `transport.start()`. It adds input end → `destroy()`, then constructs the probe through `#resolveProbe` and awaits `probe.start()`.
   - The `handshake` hook races `#starting` against the request signal and detaches its listener. A `ProbeError` becomes `MCPError('[origin] code: message', JSONRPC_SERVER_ERROR, { origin, code })`.
   - `#prove` is unchanged. `#resolveProbe` joins the construction or retries a refused one, and `probe.prove` joins the arm or begins one replacement.
   - `destroy` keeps today's order, removes the end listener, destroys the probe, and catches the `#starting` rejection.
7. Bin. Await `start()`. On a `ProbeError`, print one `[origin] code: message` line, set exit code 1, and keep serving until input ends.
8. Package. Add `@orkestrel/pool` ^0.0.14. contract ^0.0.19 and mcp ^0.0.36 are already pinned (probe package.json:95, :98). Pool needs no change.

ALTERNATIVES
- One `Pool<Probe>` held in ProbeServer (browse's slot shape). Rejected because:
  - A lint exit re-arms all three stages plus the boot, which measured 12.2 s from construction to `arm` (guides/probe.md:1142, Linux, 2026-09-06).
  - The deadline recycle stays hand-written.
  - A library user of `Probe` gets no recovery.
- The minimal proposal's synchronous `create` with the queues kept. Rejected because:
  - The pool never learns of a warm that fails without a process exit. The constructor warm (LintStage.ts:78-84) rethrows through `#warmed` (:162-166) at every later inspection, so that stage refuses for the life of the process unless T-5's `clear()` is added.
  - `pool.start()` resolves before any worker answers, so the onset health rests on the boot alone.
  - It keeps two serializers per stage.

CONSTRAINTS
- Pool:
  - Pool.ts:150-160: `start` resets a spent floor.
  - Pool.ts:178-199 and :340-389: FIFO waiters; under `min` an acquire never creates and breaks to wait.
  - Pool.ts:351-366: refusal while a survivor is held.
  - Pool.ts:368-378: a spent floor refuses with `create`.
  - Pool.ts:408-409: an owed refill outranks a spent floor.
  - Pool.ts:431-443: a refill create failure strikes.
  - Pool.ts:445-466: the watch; a fulfilment or a rejection is a loss.
  - Pool.ts:476 and :488-491: a leased loss is owed and does not strike.
  - Pool.ts:671: a grant resets the strikes.
  - Pool.ts:730: the watch aborts before the destroy hook.
  - Pool.ts:754-760: a rejected hook under `min` keeps a survivor.
- Probe:
  - Probe.ts:137-139 and :159-163: construction warms and arms.
  - Probe.ts:140-158: the queues.
  - Probe.ts:229-242: one replacement per call.
  - Probe.ts:509-531: the deadline arms after admission.
  - Probe.ts:536-575: the recycle installs a replacement either way.
  - Probe.ts:580-586: the type chain.
  - Probe.ts:639-675: teardown swallows only the deadline.
- LintStage:
  - LintStage.ts:142-157: the warm and the exit listener.
  - LintStage.ts:173-175: `#retire` records unconditionally.
  - LintStage.ts:242-246: closing is checked before ending.
- ProbeServer:
  - ProbeServer.ts:105-126: `start` is synchronous.
  - ProbeServer.ts:134-159: teardown.
  - ProbeServer.ts:168-170: input close only ends the stream.
  - ProbeServer.ts:204-209: no handshake hook.
  - ProbeServer.ts:234-246: lazy construction that retries after a refusal.
- Browse:
  - BrowserMCPServer.ts:153-162: the pool composition.
  - BrowserMCPServer.ts:184: handshake.
  - BrowserMCPServer.ts:198-227: one setup place; :210 input end → teardown.
  - BrowserMCPServer.ts:229-239: one teardown place.
- names.md:224: `start` means "Begin or restart".

REFUSALS
- `@orkestrel/supervisor`: the user's rule of 2026-10-03.
- Keeping `#recycle`, or writing a strike counter or respawn loop by hand: refused by AGENTS.md "Reuse a primitive whose semantics match".
- Keeping the queues beside the pools: refused by "Remove duplication" (Consolidate) and "one shared engine".
- A `validate` ping for Oxlint: refused by "No polling architecture. Park idle work on events and abort signals."
- A pid on LintStage so the hook can reject while the process is confirmed alive: refused by "Minimal public API. Create or substantively expand a capability with its first real consumer".
- A synchronous `ProbeServer.start` beside the async one: refused by "No compatibility shims".
- A stored lint-dead flag: refused by "Derive state". `#ending` is the fact.
- A mocked Oxlint: refused by "NEVER use mocks…". Use the protocol-faithful lint fixture.
- A spare stage (`min: 2`) or a fixed handshake budget: refused because no reading supports either (measured performance only).

MEASUREMENTS
Supplied:
- guides/probe.md:1139-1147 (Linux, 2026-09-06): spawn to lazy `initialize` 497-561 ms; spawn to the first admitted call 16.2-16.8 s; construction to `arm` 12.2 s.
- probe constants.ts:108: Oxlint `initialize` 155 ms (2026-08-27).
- readings.md:20: the D-3 ruling. clients.md:19: Codex startup default 10 s.
- The contract checkout holds a registry `@orkestrel/contract` 0.0.18 nested through its probe dev edge (the T-18 precedent).

Missing, all taken in U4:
- M-A: spawn to the `initialize` answer under the arm gate on this Windows host, over probe, scaffold, and veneer.
- M-B: an Oxlint kill to the replacement's `initialize`.
- M-C: wall time of `test:src:server` and `test:src:bin` before and after.
- M-D: whether a Vitest threads worker persists between `runTestSpecifications` calls.
- M-E: client readings for Claude Code and Codex.

TENSIONS
- T1 (user). The `initialize` gate waits for the full arm, measured at 12.2 s on Linux against Codex's 10 s default.
  - Ruled: keep the full-arm gate per D-3.
  - Derive the Codex `startup_timeout_sec` sentence from M-A.
  - Alternative: gate only on the stage floors.
- T2 (user). `PROBE_RESTARTS = 1`, copying browse's T6.
- T3 (Orchestrator). L-3 departs from the reassessment's "reject while confirmed alive".
- T4 (Orchestrator). A refused setup retries once per call, where browse refuses permanently.
- T5 (subjective). An Oxlint exit during an inspection emits two `error` events: the loss from the watch and the claim failure from `prove`. They are distinct faults, and the guide names which event carries which.
- T6 (Orchestrator). End of input destroys the server, which cuts a `prove` still in flight. This matches BrowserMCPServer.ts:210 and amends the guide's "signals are the whole set" (guides/probe.md:1096-1099).
- T7 (Orchestrator). No call-signal race during setup. Today `prove` ignores cancellation through arming and inspection alike, so adding the race only at setup would be inconsistent.
- T8 (Orchestrator). Exit code 1 persists after a refused onset even when a later call arms.
- T9 (Orchestrator). The deadline bounds each warm inside `create`, so a claim waiting behind a refill is not charged for it. This rewrites guides/probe.md:1043-1046.
- T10 (Orchestrator). Drop `@orkestrel/queue`.

## Rulings

- **L-3: a stage destroy hook that times out or rejects, against pool's survivor refusal:** `#dispose(stage)` is both the destroy hook and the `create` cleanup. It races `stage.destroy()` against the probe deadline.
- Fulfilled: resolve.
- Deadline: resolve and abandon the stage, observing its pending destroy, as `#recycle` does.
- Rejection outside teardown: emit `error` through `#surface` and resolve.
- Rejection while `#closing` is set: reject, so `pool.destroy()` aggregates it and `Probe.destroy()` keeps today's rejection.
Outside teardown no survivor forms. The reassessment's 'reject while confirmed alive' is refused. Evidence: - Pool.ts:754-760 keeps a rejected record as a survivor under `min`. Pool.ts:351-366 then refuses every waiter with `cleanup` while size >= min, so at min 1 the stage is out for the life of the process. That is the outcome #recycle exists to prevent (Probe.ts:541-543).
- The lint stage's own teardown escalates to a kill and resolves after the child exits (installed lsp server index.d.ts:92-105). Its grace window is LINT_DEADLINE / 2 (LintStage.ts:150), well inside the probe deadline.
- The confirmed-alive branch needs a pid with no other consumer.
- Teardown keeps Probe.ts:673 (a non-deadline teardown failure rejects).
- The minimal proposal's T-7 (never reject) is a contract change that nothing requests.
- **T-18: pool devDepends on probe while probe depends on pool at runtime:** Harmless. Break nothing and add no install unit. Publish in runtime-edge order: pool 0.0.14 is already published, and probe follows. When pool later re-pins its dev edge to probe >= 0.0.21, a registry copy of pool nests under probe in pool's own checkout, as contract's does today. Evidence: - Release order ignores development edges (scaffold .agents/skills/orkestrel-publish/references/release.md:30).
- npm installs devDependencies only for the root project.
- The same dev loop already exists for seven of probe's runtime dependencies: contract package.json:76, emitter :78, queue :83, lsp :94, mcp :111, timeout :78, and tool :78.
- contract/node_modules/@orkestrel/contract is 0.0.18 beside its own 0.0.19, and its gates are green.
- pool package.json:78 pins probe ^0.0.19, which has no pool edge.
- **Shape: pool per stage, pool of Probes, or another composition:** One pool per stage, owned by `Probe`. `create` constructs the stage and awaits `stage.start()` under the deadline, as browse's `create` awaits its launch. Evidence: - ROADMAP.md:5 names one pool per stage.
- Probe owns the stages (Probe.ts:137-139).
- A `Pool<Probe>` re-arms everything for one lint loss: 12.2 s (guides/probe.md:1142) against a 155 ms Oxlint `initialize` (constants.ts:108).
- With the warm in `create`, a warm that fails without an exit strikes and is replaced (Pool.ts:431-443). With a synchronous `create` it stays refused (LintStage.ts:78-84, :162-166).
- BrowserMCPServer.ts:153-162 is the reference.
- **Lease: held per stage or acquired per prove:** Acquire once per stage inspection and once per project resolution, before the first await. Release on return, and call `token.destroy()` on deadline expiry. The pools replace the three queues and `#admitType`. Evidence: - A prove resolves, then inspects the case, then the control (Probe.ts:184-190), and concurrent proves interleave per stage (Probe.ts:140-143, :436-447). A lease per prove would serialize whole proves.
- At max = min = 1, acquire is FIFO: #pump walks waiters in order and breaks to wait under `min` (Pool.ts:340-389), and #commit resolves only the head (:643-675). That is the one-deep, arrival-order admission the queues give.
- The deadline still arms after admission (Probe.ts:515-516).
- Browse holds a lease for page state (BrowserMCPServer.ts:375-402), and probe stages carry none across inspections (guides/probe.md:1010-1014).
- **Size and restarts:** `min: 1` per stage, with `max` defaulting to `min`, and `restarts: PROBE_RESTARTS = 1` in src/core/constants.ts. The user owns the value (T2). Evidence: - One inspection runs per stage at a time (Probe.ts:144-158).
- `min` requires `restarts` (Pool.ts:90-102).
- Browse's restarts were ruled 1 by the user (readings.md:49-51).
- No reading supports a spare.
- **Onset: what `initialize` and `prove` answer while setup warms and after a refused setup:** While setup warms:
- Legacy `initialize` waits on `#starting` through the handshake hook.
- `tools/list` and modern discovery answer at once.
- `prove` joins the arm through `probe.start()`.
After a refused setup:
- `initialize` answers -32000 with `[origin] code: message` and data `{ origin, code }`.
- The bin prints that line and exits 1 at end of input.
- Each `prove` retries a refused construction once, or begins one replacement arm. It answers a verdict or the current refusal. Evidence: - D-3 keeps the refusal at `initialize`, and Codex with `required = true` shows its cause (readings.md:20). Claude Code meets it at the first call (readings.md:12).
- Browse's gate is BrowserMCPServer.ts:184 and :198-227.
- The retry carries today's contract (Probe.ts:221-242, ProbeServer.ts:230-246) because probe's onset faults are workspace faults repaired at runtime.
- The Codex budget conflict is T1.
- **Recovery: Oxlint or a Vitest worker exiting between proves:** Oxlint:
- The lint pool watches `stage.exit`.
- An idle exit is a loss. The pool disposes the stage and refills it with no call, and `#surface` reports the loss once.
- An exit during an inspection fails that claim with the instrument fault, because `#translate` reads `#ending` first. The owed refill serves the next claim.
- A promise holds its settlement, so an exit between warm and watch is not missed.
Vitest: no watch. It runs in-process, and a worker failure lands in that run's issues. M-D confirms whether any thread persists, and a yes reopens this before U5.
Type stage: nothing resident, so nothing to watch. Evidence: - Today the exit is recorded (LintStage.ts:156, :173-175) and reported only to a later inspection (:242-246), so a dead Oxlint fails every later prove (LintStage.test.ts:1192-1225).
- The watch is at Pool.ts:445-466, the owed refill at :476 and :759, and the watch aborts before destroy at :730.
- RuntimeStage.ts:341-366 runs Vitest with threads in-process.
- TypeStage spawns its checker per run (TypeStage.ts:561-620).
- The mirror proposal's emitter `exit` event can fire between `stage.start()` resolving and `#insert` arming the watch. Its own risks name that race.
- **Spent floor after a successful arm:** When `#lease` meets a `PoolError` `create`, it calls `void pool.start().catch(() => {})` once and rethrows the cause, so the next claim meets a fresh warm. Each restart is bounded by demand: one per refused claim. Evidence: - A spent floor with nothing owed refuses every acquire (Pool.ts:368-378).
- `start()` resets the strikes (Pool.ts:157).
- `Probe.start()` resolves after a successful arm without re-running `#arm` (Probe.ts:229-233), so the minimal proposal's restart-in-#arm alone never reaches this case.
- **Teardown order and end of input:** `Probe.#destroy`:
- Destroy the pools first.
- Await `#arming` (caught).
- Await the barriers and rethrow the first cleanup cause.
- Destroy the emitter in `finally`.
ProbeServer adds input end → `destroy()` in `#setup`, as browse does. Evidence: - Destroying first rejects the boot's waiters with `destroyed` (Pool.ts:233-254) rather than waiting out a 12 s boot (Probe.ts:642).
- The boot's `finally` (Probe.ts:419-433) still removes its files before destroy settles.
- Eager setup holds Oxlint and Vitest from spawn, and today input close only ends the stream (ProbeServer.ts:168-170).
- Browse: BrowserMCPServer.ts:210, :233.
- **Does pool need any change:** No. Probe uses `create`, `destroy`, `watch`, `error`, `min`, `restarts`, `start`, `acquire`, `release`, `token.destroy`, and pool `destroy` as built in 0.0.14. Evidence: - No survivor forms outside teardown (L-3), so Pool.ts:351-366 is never reached.
- `create` is bounded by the deadline, which satisfies guides/pool.md:118-120.
- A spent floor recovers through `start()` (Pool.ts:157).
- One holder per stage means D-5's multi-holder strike reset does not arise beyond the per-grant reset at Pool.ts:671.
- **validate:** None on any pool. Evidence: - The lint exit is the only liveness source (LintStage.ts:156), and the watch reads it.
- The type and runtime stages hold no resident child.
- A hung stage is caught by the inspection deadline.
- A ping is polling (AGENTS.md § Design laws).

## Types

Kind files are `src/server/types.ts`, `src/core/types.ts`, and `src/core/constants.ts`. Write TSDoc in the shape typescript.md prescribes. The block's comments state the contract; the writer phrases the TSDoc.

```ts
// src/server/types.ts
export interface StageInterface {
	readonly stage: Stage
	readonly progress: number
	/** Begins the stage's warm or joins the warm already begun; rejects with the warm refusal. */
	start(): Promise<void>
	/** Calls start() first. */
	inspect(subject: Case): Promise<Check>
	destroy(): Promise<void>
}

export interface LintStageInterface extends StageInterface {
	/**
	 * Rejects with the instrument fault naming how the language server exited, when it exits before
	 * teardown begins; never fulfills; stays pending after teardown begins.
	 */
	readonly exit: Promise<never>
	inspect(subject: Case, options?: InspectionOptions): Promise<Check>
}
// TypeStageInterface keeps its members and inherits start().

export interface ProbeServerInterface {
	/**
	 * Serves stdio, constructs the probe, and resolves after it arms. Rejects with the construction
	 * or arming refusal while it keeps serving; a repeat call returns the same promise; a call after
	 * teardown rejects with `destroyed`.
	 */
	start(): Promise<void>
	destroy(): Promise<void>
}

// src/core/types.ts
export interface ProbeInterface {
	readonly emitter: EmitterInterface<ProbeEventMap>
	readonly toolchain: Toolchain
	/**
	 * Fills every stage's floor and runs the boot controls; joins an attempt in flight; after a
	 * refused attempt begins one replacement. Rejects only with a ProbeError; with `destroyed` after
	 * teardown begins.
	 */
	start(): Promise<void>
	/** Calls start() first. */
	prove(claim: Claim): Promise<Verdict>
	destroy(): Promise<void>
}
// Delete the remark "there is no `start`" (core/types.ts:457-458).
// Revise the docs of three events:
// - `arm`: the event start() emits.
// - `expire`: fires after the expired stage's lease is destroyed; its floor replaces it.
// - `error`: also names a lint loss the pool observed.
// ProbeEventMap keys are unchanged.

// src/core/constants.ts
/** Bounds the consecutive failed warms or unused losses of one stage's floor before it is spent. */
export const PROBE_RESTARTS = 1
```

The private shape of Probe.ts, which is not public:
- Fields: `readonly #type: PoolInterface<TypeStage>`, `readonly #lint: PoolInterface<LintStage>`, `readonly #runtime: PoolInterface<RuntimeStage>`, `#arming: Promise<void> | undefined`, and `#closing`.
- `#warm<T extends StageInterface>(stage: T): Promise<T>` races `stage.start()` against the deadline, and on failure awaits `#dispose` and rethrows.
- `#dispose(stage: StageInterface): Promise<void>` follows the L-3 ruling.
- `#lease<T>(pool: PoolInterface<T>): Promise<PoolToken<T>>` maps `destroyed`, `create` (plus the start kick), and `cleanup`.
- Deleted: the queues, `#typeTail`, `#admitType`, `#recycle`, `#destroyStage`, `#ready` (it becomes `start`), and the identity branch of `#emitExpiry`.

The private shape of ProbeServer.ts:
- `#starting: Promise<void> | undefined`
- `#handshake(options: MCPMethodOptions): Promise<void>`
- `#end` bound once and removed by identity

package.json: add `@orkestrel/pool` ^0.0.14 and remove `@orkestrel/queue`.

## Units

- **U1-stages:** Writer, Astra. Types first.
Owns:
- probe src/server/types.ts (StageInterface.start, LintStageInterface.exit)
- src/server/stages/LintStage.ts, TypeStage.ts, RuntimeStage.ts
- tests/src/server/stages/*.test.ts
Work:
- Move each constructor's warm into `start()` with `??=`. `inspect` awaits `start()`.
- LintStage: back `exit` with `Promise.withResolvers<never>()`, observed once internally.
- LintStage: reject `exit` from the exit listener only while `#closing` is undefined, and record `#ending` only while `#closing` is undefined.
- LintStage: in `#translate`, check `#ending` before the closing latch.
- RuntimeStage keeps its dead-owner sweep in the warm.
Depends on nothing. The tree stays green because today's Probe calls `inspect`, which starts the stage.
Run `npx vitest run --config vite.config.ts --project src:server tests/src/server/stages/<file>`. Accept: Each new case is red before the change.
- A `LintStage` constructed then destroyed leaves the fixture's spawn marker absent.
- `start()` resolves after `initialize`, and a second `start()` returns the same settlement. With no Oxlint binary, `start()` rejects with today's warm-failure text.
- With the fixture's `frail` marker, `exit` rejects with a ProbeError whose message is 'The Oxlint language server exited with code 7', with origin 'instrument', code 'malformed', and context { stage: 'lint' }.
- After `destroy()`, `exit` stays pending: a race against a resolved marker yields the marker.
- With `frail` set and `destroy()` called from the `exit` rejection handler while an inspection is in flight, the inspection rejects with the exit message, not 'The lint stage has been destroyed'.
- `TypeStage` creates no mirror directory until `start()`.
- `RuntimeStage` leaves a planted dead-owner specification in place until `start()`.
- The existing LintStage.test.ts:1150-1233 cases stay green.
- `npm run test:src:server` and `npm run check` pass.
- **U2-probe-pools:** Writer, Astra.
Owns:
- probe src/core/types.ts (ProbeInterface.start, the event docs)
- src/core/constants.ts (PROBE_RESTARTS) and its core test
- src/server/Probe.ts
- package.json and package-lock.json: `npm install @orkestrel/pool@^0.0.14` and `npm uninstall @orkestrel/queue`
- tests/src/server/Probe.test.ts
Work: implement Design items 2-5 exactly as written, including:
- the synchronous acquire before the first await
- `token.destroy()` before `expire` and the throw
- the spent-floor kick in `#lease`
- `#arm` awaiting the pools inside the boot's ProbeError wrapper
Depends on U1. Accept: Each new case is red today.
- A1, idle recovery: arm over the lint fixture and read `server.pid`, then kill that pid. With no call made, `server.pid` names a different live pid, the error recorder holds one exit fault, and a later `prove` returns a verdict.
- A2, exit during a prove: arm, then write `frail`. `prove` rejects with origin 'instrument' and 'The Oxlint language server exited with code 7'. Remove `frail`, and the next `prove` returns a verdict.
- A3, spent floor: with `unanswered-initialize`, `start()` rejects with 'The probe could not arm: …' after exactly PROBE_RESTARTS + 1 spawns. Remove the marker, and the next `prove` arms and answers.
- A4: `new Probe()` spawns nothing before `start()` or `prove()`. Concurrent `start()` calls emit one `arm`. `start()` after `destroy()` rejects with 'destroyed'.
- A5: `destroy()` during the boot settles with no `arm-type` or `arm-runtime` file and no mirror directory left.
- A6, POSIX only, in the FIFO pattern of Probe.test.ts:1564-1644: after a runtime expiry whose `vitest.close()` outlives the deadline, the next claim is served. It is red if `#dispose` rejects. It skips on Windows with a stated reason.
- These stay green: 'replaces a type stage its deadline destroyed', 'replaces a lint stage its deadline destroyed', 'expires only the active inspection…', 'expires caller-named project resolution…', 'serializes project resolution against a live type inspection', 'admits one inspection per stage at a time, in arrival order', 'bounds teardown while a runtime specification is blocked', and 'publishes exactly the events its map declares'.
- `npm ls @orkestrel/queue` reports it absent.
- `npm run check`, `npm run test:src:core`, and `npm run test:src:server` pass.
- **U3-server-onset:** Writer, Astra.
Owns:
- probe src/server/types.ts (the ProbeServerInterface block)
- src/server/ProbeServer.ts
- src/bin/main.ts
- tests/src/server/ProbeServer.test.ts
- tests/src/bin/main.test.ts
- tests/setupServer.ts, only if a host helper must change
Work: implement Design items 6-7:
- async `start` with `??=`, observed internally
- `#setup` with input end → `destroy()`
- the `handshake` hook with listener detach and the ProbeError → MCPError mapping
- `#prove` unchanged
- `destroy` removing the end listener
- the bin's one line and exit code 1
Depends on U2. Accept: Each new case is red today.
- B1: the fixture's `server.pid` names a live process when `initialize` answers, before any `tools/call`. A legacy `initialize` is answered after `arm`, by recorder order.
- B2: with `tmp/probes` as a regular file, `start()` rejects with a ProbeError. `initialize` answers -32000 with '[workspace] <code>: The probe could not create the boot workbench (…)' and data { origin, code }. A `tools/call` answers the same refusal. After the file is removed, the next `tools/call` returns a verdict.
- B3: with no TypeScript installed, setup is refused at `initialize`, and each `tools/call` retries construction once.
- B4: closing input ends the process, and the `server.pid` process is gone.
- B5: `destroy()` before `start()` loads no workspace tools. `destroy()` during setup settles and destroys the probe. `start()` after `destroy()` rejects with 'destroyed'.
- B6: the built bin against a refusing workspace writes exactly one '[origin] code: message' line to stderr, answers `tools/list`, and exits 1 at end of input. Against a healthy workspace it exits 0.
- Existing lazy-construction and stdin-flow cases are rewritten to the eager and end-of-input contract. None is deleted without a replacement.
- `npm run test:src:server`, `npm run test:src:bin`, and `npm run check` pass.
- **U4-readings:** Instrument, Astra, on this Windows host. Runs after U3 builds.
Owns:
- probe tmp/onset/*.ts (TypeScript run by Node; never under tmp/probes)
- the record file scaffold .orkestrel/veneer/lifecycle/eager/probe-readings.md
Readings:
- M-A: spawn to the `initialize` answer for `dist/bin/main.js` over probe, scaffold, and veneer, 3 runs each.
- M-B: an Oxlint kill to the replacement's `initialize`.
- M-C: `test:src:server` and `test:src:bin` wall time at the U2 parent commit and at U3.
- M-D: active resources after a settled `runTestSpecifications`, read with `process.getActiveResourcesInfo()`.
- M-E: client readings in the shape of readings.md:9-14:
  - Claude Code, healthy and refusing
  - Codex with `required = true`, refusing
  - Codex at the default startup timeout, healthy
Negative control: a build with the gate removed answers `initialize` before `arm`.
Depends on U3. Accept: - Every reading names its host, date, versions, run count, and samples. A failed control voids the readings.
- M-A states whether any median exceeds Codex's 10 s (clients.md:19), which rules T1 for U5.
- M-D states yes or no with the listing. A yes reopens the runtime watch before U5.
- **U5-docs:** Writer, Astra.
Owns probe guides/probe.md:
- Surface rows for PROBE_RESTARTS, `StageInterface.start`, `LintStageInterface.exit`, `ProbeInterface.start`, and `ProbeServerInterface.start`
- the Methods tables
- § Lifecycle: eager onset, one pool per stage, L-3, Oxlint recovery, the M-D finding, the retry-once departure, end-of-input teardown, and the deadline in `create` (rewrite of guides/probe.md:1043-1046)
- § Registering the server: Codex `required = true`, plus `startup_timeout_sec` per T1
- § Cost: M-A and M-B
Also owns:
- guides/README.md
- README.md
- the guides/pool.md mirror added with `npx scaffold catalog`, and removal of the guides/queue.md mirror
- ROADMAP.md: delete item 1 without renumbering the others
Depends on U2, U3, U4, and the T1 ruling. Accept: - `npm run test:guides` passes.
- Every behavioral sentence in § Lifecycle names the U1-U3 test that breaks when it goes false.
- No 'there is no start' sentence and no queue reference remains.
- No Surface row names a symbol missing from the barrel.
- ROADMAP.md no longer carries item 1.
- **U6-review:** Reviewer, opus. The reader wrote none of U1-U5. Owns the findings file only.
One pass on the contract and the risky seams:
- `#dispose` branches, teardown against non-teardown
- `exit` settlement against the `#translate` order
- acquire-before-await order in every inspection and resolution path
- release against `token.destroy()` on every path
- the spent-floor kick and its rejection observation
- teardown during the boot
- the handshake race and its listener detach
- ProbeError-only rejections from `Probe.start()`
- unobserved promises: `exit`, `#starting`, and each pool `start`
Depends on U5. Accept: Each finding cites a file:line and names a red case. Each finding the Orchestrator accepts is repaired by its owning unit with red-then-green evidence before U7.
- **U7-gates:** Verifier. Edits no source. Runs in probe: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, and `npm test`. Depends on U6's repairs. Accept: - Every gate exits 0, read bare, with each closing line quoted.
- The version bump and publish are a separate visit run by the user.

## Risks

- Codex onset (T1). The arm measured 12.2 s on Linux (guides/probe.md:1142), against Codex's 10 s default (clients.md:19). With the gate at `initialize`, an unconfigured Codex drops probe; today `initialize` answers in about 0.5 s. M-A decides the guide sentence. Whether Codex treats a timeout like a refusal is unknown (clients.md:24-31).
- Eager cost. Every spawned session pays a full arm even if it never proves, and every server-host test arms at spawn. M-C reads the suite growth.
- Abandoned stages. Under L-3, a `vitest.close()` that outlives the deadline stays in-process until the host exits, as with today's `#recycle`. Repeated expiries leak one stage each, bounded by demand.
- Hung-teardown evidence. The hung-teardown case (A6) is POSIX-only, so it is NOT-EVIDENCED on Windows.
- Respawn after use. A grant resets the strikes (Pool.ts:671), so an Oxlint that dies after every use is respawned once per claim. `restarts` bounds only the idle crash loop. This is the same D-5 shape as browse.
- The deadline moves (T9). A claim can wait behind a refill's warm, which is bounded by deadline × (restarts + 1) and not charged to that claim. Expiry attribution for a slow warm moves from the claim to `create`.
- Lint ordering. If the lsp client rejects a pending request before it emits its exit event, the inspection reads neither ending nor closing and reports the client's failure. U1 pins the order on this host only.
- End-of-input teardown (T6) cuts a `prove` still in flight when a client closes input early.
- Exit code 1 persists after a refused onset that a later call repairs (T8).
- Pool assumptions. Probe joins browse in relying on pool 0.0.14's owed refill, strike, start reset, and watch abort. A pool change reruns U2's cases as well as browse's.
- Teardown timing. The 2.2-2.3 s signal-to-exit figure at guides/probe.md:1100-1103 goes stale. U5 restates it from a reading or drops it.

## Where the proposals disagreed

The proposals agree on a pool per stage, `min` 1, `restarts` 1, no `validate`, no Vitest watch, a hook that never rejects outside teardown, T-18 being harmless, the handshake text, the full-arm gate with T1 measured, and no change to pool. They disagree as follows, with the ruling for each:

1. Where the warm runs. Mirror awaits `stage.start()` inside `create`; minimal keeps `create` synchronous and the warm charged to the inspection. Ruled for mirror:
   - The constructor warm rethrows its refusal at every later inspection (LintStage.ts:78-84, :162-166). A synchronous `create` never strikes on a warm that fails without an exit, so that stage refuses for the life of the process. Minimal's own T-5 and risks concede this.
   - Browse's `create` awaits its launch (BrowserMCPServer.ts:153-154).
   - `pool.start()` then reports worker health at the onset, which is the user's rule.
2. Lint exit signal. Mirror uses an emitter `exit` event with a `LintStageOptions` type; minimal uses `exit: Promise<never>`. Ruled for minimal:
   - The promise keeps its settlement, so an exit between `stage.start()` resolving and the watch arming at `#insert` (Pool.ts:445-451) is still seen. Mirror's own risks name the missed-event race.
   - It adds no emitter and no options type, which is the smaller public API.
3. Queues. Mirror deletes them; minimal acquires inside them. Ruled for mirror. At max 1, pool acquire is already FIFO and one at a time (Pool.ts:340-389, :643-675), so keeping the queues is two serializers per stage. AGENTS.md Consolidate and "one shared engine" refuse that.
4. Rejection from `Probe.destroy`. Minimal (T-7) stops rejecting; mirror keeps it by rejecting the hook only while `#closing` is set. Ruled for mirror, because it keeps Probe.ts:673 with no contract change. A survivor during pool teardown is harmless.
5. Spent floor after a successful arm. Minimal restarts pools only inside `#arm`, which never re-runs after a successful arm (Probe.ts:229-233), so a lint floor spent later refuses permanently (Pool.ts:368-378). Ruled for mirror's kick in `#lease` on `create`.
6. Teardown order. Minimal awaits the arm first; mirror destroys the pools first. Ruled for mirror. Pool destroy rejects the boot's waiters (Pool.ts:233-254), so teardown does not wait out a 12 s boot, and the boot's `finally` still removes its files before destroy settles.
7. End-of-input teardown. Minimal adds it as T-4; mirror omits it. Ruled for minimal: eager start holds Oxlint and Vitest from spawn, ProbeServer.ts:168-170 only ends the stream, and browse destroys on input end (BrowserMCPServer.ts:210).
8. Call-signal race in `#prove` during setup. Mirror adds it; minimal leaves `#prove` unchanged. Ruled for minimal (T7). Probe honors no call cancellation anywhere else, and the join through `probe.start()` already answers the call.
9. T-18 confirmation. Mirror adds an install unit; minimal cites the contract checkout's nested 0.0.18. Ruled for minimal: the precedent is an existing reading of the same loop shape, so a further install proves nothing extra.
10. Probe and stage constructors. Minimal leaves arming in the constructor; mirror moves it to `start()`. Ruled for mirror:
    - `start` means "Begin or restart" (names.md:224).
    - It gives one setup place.
    - A destroy before start spawns nothing (A4, B5).
    - No rule requires the constructor to arm.
11. Engines. Mirror names Astra and minimal names Sonnet 5.5. Ruled Astra for writers and opus for review. The user's model routing records that the desktop `sonnet` alias serves Sonnet 5, which must not be used here.

## Critic gaps

- The L-3 ruling misstates the lint teardown contract, and the design does not rule the branch where teardown rejects while the child is still alive. Outside teardown, `#dispose` turns that rejection into an `error` event and resolves. The pool then deletes the record (Pool.ts:757-759) and refills, so a second Oxlint spawns while the first one lives. This repeats once per occurrence, no case covers it, and no risk names it. The design refuses the reassessment's 'reject while confirmed alive' because it 'needs a pid with no other consumer', but the transport's own rejection already says the child is not confirmed stopped. That branch needs no new public member. Evidence: - probe node_modules/@orkestrel/lsp/dist/src/server/index.d.ts:91-106: `close()` resolves 'after the child has exited', and is '@throws An `LSPError` coded `timeout` when the process package cannot confirm the child stopped; the transport keeps the still-live child'.
- LintStage.ts:135-137: `#destroy` awaits `#client?.destroy()`, which closes that transport.
- The design's L-3 evidence quotes only the resolve branch ('escalates to a kill and resolves after the child exits', index.d.ts:92-105).
- The reassessment, scaffold .orkestrel/veneer/lifecycle/reassessment-2026-10-04.md:53, recommends rejecting while the process is confirmed alive.
- Pool.ts:754-760 keeps a rejected record as a survivor; Pool.ts:757-759 deletes a resolved one and refills. Fix: Re-rule L-3 against the full declaration, in two parts.
- (a) In `#dispose`, branch on the stage's rejection. A lint `destroy()` rejection whose cause is the lsp `timeout` means the child is confirmed alive. Either reject the hook there (a survivor, per reassessment rank 8, and state that the lint floor then refuses until the process ends), or resolve and record in Risks and the guide's § Lifecycle that one live Oxlint can leak per occurrence, with its bound.
- (b) Delete the 'needs a pid' refusal. The transport rejection is the signal.
- **Re-ruled by the Orchestrator (2026-10-05), after unit `eager-probe2` stopped on (a):**
  - Pool retains a record whose destroy hook rejects for the life of the pool instance. It aborts the record's watch before running the hook, ignores the loss of a retained record, and never retries the hook (pool `guides/pool.md` § Warm floor and loss). The unit's instrument showed this against the 0.0.16 build: probe `tmp/codex/eager-probe2-survivor.ts` and `tmp/codex/eager-probe2-last.md`.
  - So "the lint floor then refuses until the process ends" cannot hold. Keep branch (a) with the corrected consequence: a lint `destroy()` rejection whose cause is the lsp `timeout` rejects the hook, and pool keeps the survivor. The lint floor then refuses with `cleanup` until the server restarts.
  - The lsp transport's `timeout` already follows its own kill escalation (lsp `close()`: "escalates to a kill and resolves after the child exits", and throws `timeout` when it cannot confirm the child stopped). So that refusal marks an Oxlint child that outlived a kill. Probe never spawns a second Oxlint beside it.
  - The guide's § Lifecycle and the Risks state that limit.
- **Extended by the Orchestrator (2026-10-05), after unit `eager-probe3` stopped on the failed-warm branch:**
  - Pool inserts a record only after `create` fulfills (pool `src/core/Pool.ts:467-477`). A lint cleanup that rejects with the lsp `timeout` inside a failed warm's `create` therefore adds a creation strike and retains nothing, and `restarts` lets pool call `create` again while the first child lives. The unit reproduced overlapping real children: probe `tmp/codex/eager-probe3-create-survivor.ts`, `tmp/codex/eager-probe3-last.md`.
  - **Rule:** probe holds such a stage as an owned survivor. While a lint survivor is held, the lint pool's `create` refuses at once with a `ProbeError` naming the surviving child, and spawns nothing. Each refusal is a creation strike, so the floor spends within `PROBE_RESTARTS` and the lint stage refuses until the server restarts.
  - Probe's teardown destroys every held survivor again and reports a failure through its teardown result.
  - **Reworded after U6 (2026-10-05):** `LintStage.destroy` memoizes its first close, so a second destroy makes no second kill. The lsp transport's `timeout` already follows its own kill escalation, and no fixture can drive a child that survives a kill. Teardown therefore re-reads each held survivor and reports it through its teardown result; it makes no second kill attempt.
  - **Added after U6:** lint disposal is bounded by the larger of the probe `deadline` and the lint teardown bound (`LINT_DEADLINE` plus the transport's grace and escalation). Without that, a `deadline` shorter than lint's own teardown abandons the disposal, the later lsp `timeout` goes unobserved, and a second Oxlint can spawn beside the first. With it, L-3 holds for any configured `deadline`.
  - The survivor set is owned resources, not a status flag; it empties only at teardown.
  - Both L-3 branches now end the same way: no second Oxlint beside a live one, and a lint refusal until restart.
- Add a U2 case per branch that the fixture can drive, or mark the branch NOT-EVIDENCED with the reason.
- Teardown during onset turns into an arm refusal, which contradicts `ProbeInterface.start`'s own contract ('with `destroyed` after teardown begins').
- Design item 5 destroys the pools before awaiting `#arming`, so the boot's acquires and the pools' `start()` reject with `destroyed`.
- Design item 4 wraps every `#arm` rejection as 'The probe could not arm: …' and `#surface`s it, which emits an `error` event during teardown.
- `ProbeServer.#setup` then rejects, so the bin (design item 7) prints an `[instrument] malformed` line and sets exit code 1 on a SIGTERM or input end during warm-up.
- Today `#destroy` awaits the arm first (Probe.ts:641-643), so none of this happens.
- B5 asserts only that teardown settles. Evidence: - Probe.ts:257-267: the catch in `#arm` wraps the error and calls `#surface`.
- Design item 3: `#lease` maps PoolError `destroyed` to `createDestroyedError('probe')`, which then reaches that catch.
- Pool.ts:238 and :240-244: `destroy()` rejects `#starting` and every waiter with `destroyed`.
- Browse guards every step against teardown: `if (this.#closing !== undefined) return` at BrowserMCPServer.ts:216, :220, and :223. Fix: In `#arm`'s catch, when `#closing` is set, rethrow `createDestroyedError('probe')` without wrapping or surfacing it. In `ProbeServer.#setup`, return when `#closing` is set after each await, as browse does at :216, :220, and :223. Add these assertions:
- B5: no `error` event and no rejection from `start()` other than `destroyed`.
- B6: the built bin, signalled or with input closed during setup, writes no stderr line and exits 0.
Each must be red against the design as written.
- `TypeStage.resolve` is not gated on `start()`. The design says only that `inspect` calls `start()`, but `resolve` works on an unstarted stage: `#configure` refreshes the mirror (its `mkdirSync` creates the directory) and runs `tsc` inside it. That breaks three things:
- U1's acceptance 'TypeStage creates no mirror directory until start()' can be false through `resolve()`.
- A mirror created that way has no `.probe/mirror.txt` marker, so `#sweep` never removes it after the host dies.
- U1's 'tree stays green' claim rests on today's Probe, which resolves first on a freshly recycled stage. Evidence: - TypeStage.ts:150-152 and :211-217: `resolve` and `#resolve` never touch `#warming`.
- TypeStage.ts:416-417: `#configure` runs `#refresh()`, then spawns `tsc --showConfig` with `this.#mirror` as its working directory.
- TypeStage.ts:360: `#place` runs `mkdirSync`. TypeStage.ts:275-285: only the warm writes the marker. TypeStage.ts:305-308: the sweep requires that marker.
- tests/src/server/stages/TypeStage.test.ts:571-581 resolves on unstarted stages.
- Probe.ts:184 resolves before inspecting, and Probe.ts:563 constructs the replacement stage. Fix: Add 'Calls start() first' to `resolve` in the `TypeStageInterface` types block, so `#resolve` begins the warm (or awaits it) before `#configure`. Add a U1 case that is red today: `resolve()` on a fresh stage leaves `.probe/mirror.txt` in its mirror and the dead-owner sweep can remove it.
- The onset refusal reports pool vocabulary instead of the stage fault. Pool `start()` rejects with a PoolError, and `#arm` wraps that error. The line that Codex (with `required = true`) and the bin show then reads 'The probe could not arm: pool create failed: <cause>', and the ProbeError's `cause` is the PoolError instead of the stage refusal. Evidence: - pool src/core/errors.ts:31-40: the PoolError message is 'pool create failed' followed by the cause message.
- Probe.ts:261: the arm message is built with `describeUnknown(error)`, and probe src/server/helpers.ts:821-822 returns `error.message`.
- Browse unwraps the cause: `isPoolError(error) ? (error.cause ?? …) : error` at BrowserMCPServer.ts:225 and :433. Fix: In `#arm`, and in `#lease` for `create` and `cleanup`, unwrap `error.cause` from a PoolError before wrapping, as browse does. B2 and A3 assert that the refusal text contains no 'pool ' substring and that `cause` is the stage's ProbeError.
- `Probe.start()`'s documented contract ('Fills every stage's floor …') is false after a successful arm.
- `start()` joins the fulfilled `#arming` and never touches a spent pool. A host that calls `start()` to restore a spent lint floor gets a resolved promise while every claim refuses.
- The design patches this with a hidden `pool.start()` kick inside the `#lease` error mapping. That fails one claim before any recovery and splits restart across two places.
- The cheaper shape fixes both. Pool `start()` is idempotent and cheap: it joins a fill in flight, resets a spent floor, and resolves at once when the floor is live. Evidence: - Pool.ts:150-160: `start` returns the pending fill, resets the strikes when spent, and pumps.
- Pool.ts:404-407: the fill resolves `#starting` at once when live >= min.
- Probe.ts:229-233: the join resolves without re-arming.
- names.md:224 defines `start` as 'Begin or restart'.
- Design item 3: the kick inside `#lease`. Fix: Make `Probe.start()` call every pool's `start()` on every call, mapping a rejection to a ProbeError. Re-run the boot only after a refused boot, as `#ready` does today. Delete the kick from `#lease`. Because `prove` calls `start()`, the next claim recovers a spent floor before it acquires.
- Add a U2 case: after a successful arm, spend the lint floor (the fixture deleted, then two idle kills), restore the fixture, and call `start()`. It must refill, and the next `prove` must return a verdict with no claim failing first.
- A3's acceptance 'after exactly PROBE_RESTARTS + 1 spawns' has nothing to read. The lint fixture overwrites its pid files on every spawn, and nothing counts spawns. A mutation to `restarts: 0` or `2` therefore passes A3 unchanged. Also, under `unanswered-initialize` the fixture exits after 250 ms, so A3 exercises a warm failure by exit, not by the deadline. Evidence: - tests/setupServer.ts:473 rewrites `server.pid` with `writeFileSync('server.pid', …)`.
- tests/setupServer.ts:516-518 rewrites `initialized` on each spawn, then calls `process.exit(0)` after 250 ms. Fix: Have the fixture append each pid to a `spawns` file, for example `appendFileSync('spawns', pid + '\n')` beside the `server.pid` write. A3 then asserts the line count equals PROBE_RESTARTS + 1, and states that it covers the exit branch. Cover the deadline branch with `silent-initialize` (setupServer.ts:521) under a short `deadline`.
- Teardown during warm-up still waits for every warm in flight, so the teardown evidence holds only for the boot controls. Pool `destroy()` settles only after its refill finishes, and the refill finishes only when the `create` hook settles. The design's `create` races `stage.start()` only against the probe deadline (30 s), so a SIGTERM at onset waits up to one deadline plus one dispose per stage. The design's claim that teardown 'does not wait out a 12 s boot' does not cover this. Evidence: - Pool.ts:411-417: the refill is a tracked operation.
- Pool.ts:820: `#finish` returns while `#operations.size > 0`.
- Pool.ts:432 checks for teardown only before `create`. Pool.ts:441-442 disposes the created record afterwards, through `#recycle` and `#own`.
- probe constants.ts:98: PROBE_DEADLINE is 30_000.
- Browse cuts its launch with a teardown signal: BrowserMCPServer.ts:238 (`#abort.abort()`) and :561 (`signal: this.#abort.signal`).
- TypeStage.ts:224-227: `destroy()` terminates the running children. Fix: Give Probe a teardown AbortController that `#destroy` aborts before it calls the pools' `destroy()`. In `create`, race `stage.start()` against both the deadline and that signal; on abort, await `#dispose(stage)` and rethrow. Add an A5 bound: `destroy()` called during the type warm settles within the stage teardown time, well under PROBE_DEADLINE. This case must be red without the signal.
- On the deadline path, `await token.destroy()` can reject during teardown. Then a raw PoolError escapes `prove` instead of the deadline refusal, which also breaks the 'ProbeError-only' rejections that U6 is told to review. This happens because the design's hook rejects while `#closing` is set, and the token passes that rejection on. Today `#recycle` swallows the old stage's teardown failure. Evidence: - Pool.ts:301-305: `token.destroy()` returns the pending cleanup and maps a rejection to `PoolError({ code: 'cleanup' })`.
- Design L-3: the hook rejects 'while `#closing` is set'.
- Design item 3: 'A deadline refusal awaits `token.destroy()` … then throws the refusal', with no catch.
- Probe.ts:553-555: today's swallow. Fix: Write `await token.destroy().catch(() => {})` on the deadline path, because the pool's barrier already carries the failure to `Probe.destroy()` (keeping Probe.ts:673). Then throw the held refusal. Add one more U6 review seam: a deadline that fires after `destroy()` begins rejects `prove` with the deadline ProbeError.
