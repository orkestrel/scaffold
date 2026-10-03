# Resource lifecycle: the supervised record in `@orkestrel/pool`

Lane: subjective (shape, naming, design fit). Every code claim cites `path:line`. Paths are relative to `C:\Users\mikes\WebstormProjects\` unless noted. Lifecycle notes are under `scaffold\.orkestrel\veneer\lifecycle\`.

## Position

The reusable unit is the supervised record inside `@orkestrel/pool`. It is not a separate class and not a separate package. Expand the `Pool` class so that each record it owns:

- starts eagerly through the `min` option and a `start()` method;
- is watched for death through the record's own events, with a `watch` hook;
- is evicted by its holder on a missed deadline, with an `evict` method on the token;
- is replaced by a fresh create after its destroy hook settles;
- counts toward retirement after `limit` consecutive failures that no holder saw.

The lending side also names its records and their holders in its events.

A single supervised resource is that pool at `min: 1, max: 1`. The fleet already expresses one resource that way: `Worker` defaults its pool to one record (`worker\src\core\Worker.ts:67`, `:84`).

The pool ends a lease with code `lost` and does nothing more. It never repeats the holder's work and never calls an interrupted operation failed, because re-execution has one owner, the holder (`reliability-assessment.md:261-267`).

`browse` and the probe server are the first real consumers of the expansion. `@orkestrel/worker` fits it without needing it. No other surveyed consumer fits. No package is added, and every added name sits under the `Pool` prefix that `@orkestrel/pool` already owns.

## Argument

### The shape

These are the changed and added declarations in `pool\src\core\types.ts`. Every other declaration stays as it is.

```ts
export type PoolCode = 'invalid' | 'destroyed' | 'create' | 'cleanup' | 'lost' | 'retired'

export type PoolEventMap<T> = {
	readonly create: readonly [value: T]
	readonly acquire: readonly [value: T, holder: string | undefined]
	readonly release: readonly [value: T]
	readonly evict: readonly [value: T, reason: unknown]
	readonly retire: readonly [error: unknown]
	readonly destroy: readonly [value: T]
}

export interface PoolToken<T> {
	readonly value: T
	readonly signal: AbortSignal
	release(): void
	evict(reason?: unknown): void
}

export interface PoolLeaseOptions {
	readonly signal?: AbortSignal
	readonly holder?: string
}

export interface PoolOptions<T> {
	readonly on?: EmitterHooks<PoolEventMap<T>>
	readonly error?: EmitterErrorHandler
	readonly create: (signal: AbortSignal) => Promise<T> | T
	readonly destroy?: (value: T) => Promise<void> | void
	readonly validate?: (value: T) => Promise<boolean> | boolean
	readonly watch?: (value: T, signal: AbortSignal) => Promise<unknown>
	readonly min?: number
	readonly max?: number
	readonly limit?: number
}

export interface PoolInterface<T> {
	readonly emitter: EmitterInterface<PoolEventMap<T>>
	readonly size: number
	readonly idle: number
	readonly active: number
	start(): Promise<void>
	acquire(options?: PoolLeaseOptions): Promise<PoolToken<T>>
	clear(): Promise<void>
	destroy(): Promise<void>
}
```

The contract has two layers, and one engine runs both:

- **Record lifecycle** (the single-resource layer): create → watch → evict → refill under `limit` → destroy.
- **Assignment** (the pool layer): the oldest idle record goes first, tokens are exclusive, the holder is recorded, and `validate` runs at handoff.

### The gap lands on seams `Pool` already has

The survey measures every gap item against `Pool.ts` (`resource-consumers.md:178-186`):

- **Floor.** This is a second entry into `#startCreate` beside `#pump`, which today creates only for a waiter (`pool\src\core\Pool.ts:263-276`, `:284-290`).
- **Eviction.** This is a subscription feeding the existing `#dispose` path (`Pool.ts:485-501`).
- **Named records.** These are payloads on the existing emit sites (`Pool.ts:335`, `:442`, `:482`, `:523`).
- **Holder.** This is a datum on the existing lease set (`Pool.ts:37`, `:440`).
- **Limit.** This is a counter before the existing re-pump (`Pool.ts:386-408`).

The survey states that named records and the holder are "not a second lifecycle" (`resource-consumers.md:182`, `:184`).

A separate package has two choices, and both cost more:

- Rebuild FIFO settlement, cancellation, exact release, cleanup aggregation, and the teardown barrier (`scaffold\guides\pool.md:104-173`).
- Wrap `Pool`, which still needs the same gap closed.

`AGENTS.md:45` and `:65` ("one minimal interface and one shared engine") rule against both.

### One resource is a pool of one here

The consumers already use one resource at a time:

- `Worker` builds its single-resource case as a pool at `max` 1 (`Worker.ts:67`, `:84`). It acquires inside the queue handler and releases in a `finally` block (`Worker.ts:153-159`).
- The probe runs each stage behind a queue at `concurrency: 1` (`probe\src\server\Probe.ts:144-158`). That is the same queue-plus-pool composition worker uses, minus the pool.
- `browse` holds one browser per session across calls (`eager\proposal-server.md:84-91`).

No consumer in `resource-consumers.md` § Consumer table shares one live resource among concurrent holders. An exclusive token therefore loses nothing.

### The records are interchangeable where the layer applies

- Each `browse` browser starts fresh at `about:blank` (`eager\proposal-server.md:57-58`).
- Each probe stage is replaced by a fresh instance of its own class (`Probe.ts:562-573`).
- The two `tests/setupGlobal.ts` browsers are "two distinct endpoints, not an interchangeable pool" (`resource-consumers.md:19`). That file is not a consumer.

### The limit belongs to the record and counts only what no holder saw

Both browse proposals reached the same rule independently: a failed launch, or a death before any lease, counts; a death while leased never counts; a lease resets the count (`eager\proposal-server.md:68-71`; `eager\proposal-library.md:69-74`).

The rule also matches the operation boundary. A served record's death reaches the operation owner, who owns the budget to repeat the work. Counting it in the pool as well would create a second re-execution budget, which `reliability-assessment.md:265` warns against.

### The pool keeps its no-I/O, no-timer identity

The hooks stay the caller's (`pool.md:7-9`):

- `watch` settles on the caller's own events.
- Deadlines stay with the holders: probe's `#bound` (`Probe.ts:509-531`) and the browser's CDP command timeout. They reach the pool through `token.evict`.
- `validate` keeps its own bound.

No timer enters `Pool.ts`. A floor and event-driven eviction break no rule. The guide sentence "no warm floor" changes, and "no eviction timer, acquire timeout, or polling loop" stays true.

### The operation boundary

The two layers stay distinct (`status.md:26`):

- **The pool says something about the record only.** `token.signal` aborts with `PoolError` code `lost` when the leased record dies. It never aborts on the holder's own `release` or `evict`.
- **The pool has no handle on the holder's operation.** A replacement create replaces a resource; it never re-runs work. The operation owners are elsewhere:
  - the queue's `retries`, meaning extra attempts per job (`queue\src\core\types.ts:152-153`, `:179`; `worker\src\server\types.ts:71`);
  - the probe's `retries: 0`, which its comment explains: "a stage that exceeded its deadline is recycled rather than retried" (`Probe.ts:140-143`).
- **The holder reads `lost` as unresolved, not failed** (`reliability-assessment.md:116-122`, `:203-217`):
  - `browse` reports the loss, says the action might have taken effect, requires a fresh observation, and never resends (`eager\proposal-analyst.md:109-111`).
  - The probe fails the claim with its deadline refusal and does not retry.

### Consumers by layer

The following table maps each surveyed consumer to the layer it uses, what the pool retires, and what stays.

| Consumer | Layer | Hooks it supplies | Hand-rolled code the pool retires | What stays with the consumer |
| --- | --- | --- | --- | --- |
| `BrowserMCPServer` (`browse`) | Record lifecycle and assignment, `min = max` | `create` is the `#launch` body (`browser\src\server\BrowserMCPServer.ts:211-250`); `destroy` is the toolset, then browser, then profile order (`:156-166`); `watch` is `disconnect` (`browser\src\server\Browser.ts:409-418`) plus a crash of the current view; `validate` is a `Browser` round trip | The lazy memo and retry in `#open` (`BrowserMCPServer.ts:196-209`); the session, browser, and profile fields (`:85-88`); the private slot machine each proposal would write (`eager\proposal-server.md:223-235`, `:329-395`; `eager\proposal-library.md:172-259`, `:450-465`) | The profile sweep after a kill (the pool runs in-process, `eager\capabilities.md:184`), session affinity, the loss text, and the handshake gate |
| `Probe` stages | Record lifecycle at `min: 1, max: 1`, one pool per stage kind | `create` is `new TypeStage`, `new LintStage`, and `new RuntimeStage` (`Probe.ts:137-139`); `destroy` is `stage.destroy()` raced with the deadline (`Probe.ts:541-552`); `watch` is the stage's exit, latched at `probe\src\server\stages\LintStage.ts:156`, `:173-175` | `#recycle` and its identity swap (`Probe.ts:533-575`); the mutable stage fields (`Probe.ts:105-107`); and it adds what probe `ROADMAP.md:5` asks for, a replacement as soon as a worker exits | Arming and `#ready` (`Probe.ts:221-242`), because those are operation policy. `RuntimeStage`'s rotation (`probe\src\server\stages\RuntimeStage.ts:655-683`) stays unless the probe moves it to `token.evict()` so the replacement warms outside a call |
| `Worker` / `NodeWorker` | Assignment (existing) | Its existing hooks | Optional: the `Thread` `#alive` field and `evict` method (`worker\src\server\Thread.ts:23`, `:52-54`, `:64-78`) and `validate` (`worker\src\server\NodeWorker.ts:69-71`), replaced by `watch` plus `token.evict` at `worker\src\server\Dispatch.ts:166` | Everything else. Its next re-pin must change the `acquire` call (`Worker.ts:154`) |
| `tests/setupGlobal.ts` | Neither | — | None | Distinct endpoints (`resource-consumers.md:19`) |
| mcp and lsp stdio transports; process `Process`, `Session`, and `ProcessManager` | Neither: these are the resources a record wraps | — | None | Restart stays the caller's `start()` (`mcp\src\server\transports\StdioClientTransport.ts:251-258`; `lsp\src\server\transports\StdioClientTransport.ts:97-100`) |
| database, sqlite, indexeddb, server, websocket, toolbox | Neither | — | None | No eager need demonstrated (`resource-consumers.md:128-136`) |

### Names

All of the following fit `.claude\rules\names.md:27-33`:

- **Package, class, and factory:** `@orkestrel/pool`, `Pool`, and `createPool`, all unchanged.
- **Options:** `create`, `destroy`, `validate`, `watch`, `min`, `max`, `limit`, `on`, and `error`. The hook options stay verbs, as `create` and `destroy` already are.
- **Methods:** `start`, which per `names.md:224` means "Begin or restart", plus `acquire`, `clear`, and `destroy`.
- **Token:** `value`, `signal`, `release`, and `evict`. `evict` is fleet vocabulary already (`Thread.ts:64-66`).
- **Lease options:** `PoolLeaseOptions` with `signal` and `holder`.
- **Events:** `create`, `acquire`, `release`, `evict`, `retire`, and `destroy`.
- **Codes:** `lost` and `retired` are added.
- **Guard:** `isPoolMax` (`pool\src\core\validators.ts:15-17`) becomes `isPoolBound`, because the same positive-safe-integer predicate now bounds `min`, `max`, and `limit`.

### Alternatives

There are two real alternatives. Both lose.

- **A separate core package.** Its best form is `@orkestrel/keeper` with a `Keeper<T>` class: members `start`, `wait`, `evict`, and `destroy`; events `create`, `evict`, `retire`, and `destroy`. No fleet guide claims `Keeper`. A fixed-set lender would sit on top of it. It loses for three reasons:
  - The lender either re-implements Pool's FIFO, cancellation, and barrier or wraps `Pool`.
  - Splitting the limit across two classes lets a set-level replacement reset a keeper's count.
  - No consumer needs the non-exclusive access a keeper would add.

  The user's candidate names fare worse. `@orkestrel/lease` collides with the supervisor package's `Lease` and `LeaseOptions` (`scaffold\guides\supervisor.md:56`, `:69`; `names.md:124-137`). `Resource` names the thing kept rather than the keeper, close to the generic words `names.md:238` rejects.
- **Private slots in `@orkestrel/browser` with a roadmap item** (`eager\proposal-server.md`; `eager\proposal-library.md` is the public, browser-only variant). This is the cheapest path for `browse` alone. As the ecosystem answer it loses: probe `ROADMAP.md:5` asks for the same eager start and replace-on-exit, and the user ruled it "for every tool server". `.claude\rules\architecture.md:311` says "Centralize any pattern repeated twice", and `.claude\rules\quality.md:50` says "Fix a reusable defect in the lowest package that owns the mechanism".

### Constraints

These facts bound the change:

- The constructor creates nothing (`Pool.ts:65-80`). Create runs only for a waiter (`Pool.ts:263-276`, `:284-290`).
- Release recycles without `validate`; `validate` runs at handoff (`Pool.ts:293-305`, `:470-483`; `pool.md:150`).
- A failed `validate` disposes the record and pumps the same waiter again (`Pool.ts:386-408`).
- Disposal frees capacity whether the destroy hook failed or not (`Pool.ts:518-519`).
- Event tuples are empty (`pool\src\core\types.ts:35-44`). The token is `{ value, release }` (`types.ts:50-58`). The signature is `acquire(signal?)` (`types.ts:106`). `PoolContext.failures` already names cleanup failures (`types.ts:16`).
- The engine re-checks terminal and waiter state after every hook and emit (`pool.md:204-205`).
- Worker is the only production caller (`resource-consumers.md:144-161`; `Worker.ts:80-89`, `:154`; `worker\src\core\types.ts:75`).
- The pool's `@orkestrel/contract` pin `^0.0.18` disagrees with the browser's `^0.0.19` (`eager\capabilities.md:304`).
- `AGENTS.md:38` requires an explicit request before a dependency is added. `eager\design-brief.md:8` records the user's reuse request for `browse`.

### Refusals

Each refused option is quoted against the rule that forecloses it:

- **A periodic liveness check:** "No polling architecture. Park idle work on events and abort signals." (`AGENTS.md:68`)
- **The pool retrying the holder's work:** "Mechanism, not product policy." (`AGENTS.md:67`) and "One component must own the decision and budget to repeat a business effect." (`reliability-assessment.md:263`)
- **`retries` or `failures` as the key for the limit:** "One concept, one term." (`AGENTS.md:54`). `retries` already means operation attempts (`queue\src\core\types.ts:179`), and `failures` already means cleanup failures (`types.ts:16`).
- **`@orkestrel/supervisor` or `@orkestrel/process`'s `Supervisor` class:** ruled out by the user (`eager\design-brief.md:8`).
- **A `status` event:** "Never publish a generic `status` event carrying a transition value" (`.claude\rules\patterns.md:105`).
- **Keeping `acquire(signal)` beside `acquire(options)`:** "No compatibility shims. Update every consumer in the same change." (`AGENTS.md:66`)

## Concessions

- **Ceremony for one resource.** A pool of one makes the probe and a one-browser `browse` acquire and release a token where reading a field would do. The worker precedent makes this normal, but the cost is real.
- **Engine risk.** `Pool.ts` is the fleet's most concurrency-dense core file (`pool.md:204-205`). The floor, `watch`, lost leases, and retirement add branches to it. A separate class would isolate that risk.
- **`holder` has no reader yet.** It has no functional consumer while `browse` serves one stdio session (`eager\proposal-server.md:518`). It is carried for D7 alone.
- **No shared resource.** A multiplexed connection that many concurrent holders share would need a non-exclusive primitive. No surveyed consumer needs one.
- **No reclaim after a kill.** The pool cannot reclaim anything after an uncatchable kill (`eager\capabilities.md:184`, `:371`; `eager\proposal-analyst.md:6`).
- **Breaking release.** The pool release changes the `acquire` signature, the event payloads, and the guard name.

### Tensions

Each of these needs a ruling. My ruling comes first, then the competing view.

- **T1 — Counting rule.** Served deaths never count, and a delivered token resets the count. Against this: non-replenishing replacement credits per owner lifetime (`eager\proposal-analyst.md:117-119`).
- **T2 — Rejected destroy hook during an eviction.** Free the capacity as today (`Pool.ts:518-519`) and count one failure. Against this: hold the capacity and retire, which D6 implies with "never grows ... past its configured size" (`eager\design-brief.md:19`, `eager\proposal-analyst.md:348`).
- **T3 — `holder`.** Carry it now for D7 (`eager\design-brief.md:20`), or defer it until a second holder exists.
- **T4 — Naming the limit.** Use `limit` beside `min` and `max`, against `strikes`, or against a grouped `floor` key holding a size and a limit.
- **T5 — When `start()` resolves.** At a full floor, against resolving at the first live record (`eager\proposal-server.md:11`, `:35`).
- **T6 — Release and the token signal.** `token.signal` does not abort on release, against aborting on release as well (`eager\proposal-library.md:243-244`).
- **T7 — Probe dependency.** Adding `@orkestrel/pool` to `@orkestrel/probe` needs the user's explicit request (`AGENTS.md:38`).

### Risks

- A regression in Pool's FIFO or reentrancy contract.
- A `watch` hook that ignores its signal leaks listeners on every replacement.
- Refills run with no delay, so a create that fails at its own deadline costs that deadline `limit` times before retirement.
- `browse` installs two `@orkestrel/contract` copies unless the pool re-pins.
- A served record that dies on every use is replaced on every use, and only the holder can stop that.
- A graph holding both worker on `^0.0.13` and `browse` installs two pool copies until worker re-pins.

## Cost

### Measurements

- **Supplied** (`status.md:19`, preliminary, loaded host, 2026-10-03): a headless-shell launch took 80.5 ms, and provider setup took 99 ms median cold against 26.5 ms connected. These readings bear on the value of a spare (D3), not on the shape.
- **Missing:** refill latency, the idle cost of a floor member, real crash frequency, and the revised engine's high-contention timing. The values of `min` and `limit` come from the consumer's case (D5). The pool sets no default.

### Units

- **U1 — Contract and engine** (role `astra`, engine GPT-6, repository `pool`).
  - **Owns:** `src\core\types.ts`, `src\core\Pool.ts`, `src\core\errors.ts` (messages for `lost` and `retired`), `src\core\validators.ts` (`isPoolBound`), `tests\src\core\Pool.test.ts`, and `tests\src\core\validators.test.ts`.
  - **Depends on:** rulings T1 to T6.
  - **Spec:** the type sketch, plus these rules:
    - **`start()`:** every call returns one promise. Without `min` it resolves. After `destroy()` it rejects with `destroyed`. Otherwise it reserves floor creates and resolves when `min` owned records not being disposed are reached. It rejects with `retired` or `destroyed` if either comes first.
    - **Refill:** between `start()` and retirement or teardown, after each disposal settles and each failed floor create, reserve creates while owned plus reserved is below `min`. A floor record enters the idle list through the release path.
    - **Watch:** call `watch(value, signal)` when a record is owned. The signal aborts when disposal begins. The first settlement evicts the record:
      1. Emit `evict(value, reason)`.
      2. If the record is leased, abort its token signal with code `lost` and the reason as cause.
      3. If it is idle, remove it from the idle list.
      4. If it is validating, discard that validation and pump the waiter.
      5. Dispose the record.
    - **Holder eviction:** `token.evict(reason)` evicts the same way without aborting its own signal. Repeat calls and calls after `release()` do nothing.
    - **Count:** add one failure for a failed floor create, and for an eviction or failed validation of a record never delivered. Reset the count on each delivery. On-demand create failures still reject their own acquire (`Pool.ts:314-329`) and do not count.
    - **Retire:** at `limit`, emit `retire` one time, stop all creates, reject a pending `start()`, and reject waiters with `retired` while the pool owns no record.
    - **Teardown:** `destroy()` aborts the create signal, the leased token signals (code `destroyed`), and the watch signals. It then runs the existing barrier (`Pool.ts:170-188`, `:574-587`).
  - **Accept,** with deterministic tests on real `Pool` and recorder hooks and no fake clock:
    - **Floor:** at `min: 2, max: 2`, `start()` creates twice with no acquire.
    - **Idle death:** a dead idle record is destroyed and refilled with no acquire.
    - **Leased death:** it aborts `token.signal` with `lost`, and `release()` afterwards does nothing.
    - **Holder eviction:** `evict()` refills and does not count.
    - **Limit:** a create that always fails runs exactly `limit` times, then `retire` fires, and `start()` and `acquire()` reject with `retired`.
    - **Reset:** a delivery resets the count.
    - **Served deaths:** they never retire the pool.
    - **Unserved failed validation:** it counts.
    - **Teardown:** `destroy()` aborts a pending create's signal.
    - **Invalid options:** `min` without `limit`, `limit` without `min`, `min` greater than `max`, and a non-integer each throw `invalid` synchronously.
    - **Rotation:** two records alternate.
    - **Existing suite:** it passes with only the signature and payload edits.
    - **No timers:** a text search finds no `setTimeout` or `setInterval` in `src\core` (coverage: text only).
    - **Review:** one review pass by a reviewer who did not write the code.
- **U2 — Guide, README, and version** (role `builder`, engine Sonnet 5.5).
  - **Owns:** the pool guide, the README pitch, `package.json` at 0.0.14 with `@orkestrel/contract` re-pinned to `^0.0.19`, and `tests\guides.test.ts`.
  - **Depends on:** U1.
  - **Accept:** `npm run test:guides` is green, and every floor, eviction, or retirement claim is backed by a U1 assertion.
- **U3 — Publish `@orkestrel/pool` 0.0.14.** The user publishes; `verifier` runs the gates first and records the pack integrity. Depends on U1 and U2.
- **U4 — Scaffold mirror** (role `builder`). Refresh `scaffold\guides\pool.md`. Depends on U3.
- **U5 — `browse` adopts the pool** (role `astra`). Use the hooks from the consumer table and the acceptance in `eager\proposal-server.md:363-407`, re-expressed on the pool. Release `@orkestrel/browser`. Depends on U3.
- **U6 — Probe adopts the pool** (role `astra`). Make three pools at `min: 1, max: 1`. `token.evict` on deadline expiry replaces `#recycle`. Construct at server start, which closes `ROADMAP.md:5`. Release `@orkestrel/probe`. Depends on U3 and T7.
- **U7 — Worker re-pin** (role `builder`, optional). Change `Worker.ts:154` to `acquire({ signal: context.signal })`. Release at worker's next visit.

### Released packages

- **This design:** one breaking release of `@orkestrel/pool`, plus one adopting release each of `@orkestrel/browser` and `@orkestrel/probe`. Worker re-pins at its next visit, and scaffold carries the refreshed mirror in its next release. No package is created.
- **The separate-package alternative:** the same consumer releases, plus scaffolding, a guide, parity, a first publish, and a mirror for one more package.
- **The private-slots alternative:** a `@orkestrel/browser` release alone, with the probe writing its own copy in its own release.