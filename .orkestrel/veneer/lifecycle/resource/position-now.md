# Build the resource lifecycle into `@orkestrel/pool` 0.0.14, before the browse pool

Lane: this document argues the build-in-this-campaign side of the build-against-defer question. It argues shape and fit, which is the subjective lane. It also states every contract fact it relies on, with a citation, which is the objective lane.

Citations name files under `C:\Users\mikes\WebstormProjects\`. For example, `pool\src\core\Pool.ts:518` means `C:\Users\mikes\WebstormProjects\pool\src\core\Pool.ts:518`. Records named without a repository, such as `status.md` and `eager\design-brief.md`, sit under `C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\`.

## Position

Expand `@orkestrel/pool` to 0.0.14 and build the browse pool on it in the same campaign. The expansion adds five things:

- a warm floor (the `min` option);
- event-driven loss detection (the `watch` hook);
- a bounded refill (the `restarts` option);
- a way for the holder to declare its resource lost (the `PoolToken.destroy` method);
- a `start()` method that fills the floor.

It adds no holder field, no record snapshot, and no event payload, because no consumer reads any of them. The browse server is the first real consumer that `scaffold\AGENTS.md:65` requires. Probe's `ROADMAP.md` item 1 asks for the same refill-on-exit mechanism and was ruled the same day. Without a shared capability, that loop gets hand-rolled twice and extracted later, at the price of two migrations and a second release of each package.

This is a bounded expansion of a ledger the engine already keeps, not a full build-out and not a separate package. Each gap item lands as a branch or field on existing records. The case is weakest on timing:

- D1 and D2 need no pool, but they would wait behind a pool release.
- The spare (D3), the only reason browse needs more than one browser, is unmeasured.

## Argument

### The need is ruled, not forecast

Both consumers rest on user rulings from 2026-10-03:

- **Browse.** D1, D2, D6, D7, and D8 (`status.md:12`, `:14`; `eager\design-brief.md:14-21`) require:
  - every browser launched when the owner decides, never on a caller's demand;
  - liveness tracked, and leases recorded;
  - each browser warm before work arrives;
  - one setup place and one teardown place.
- **Probe.** `probe\ROADMAP.md:5` says to "replace a worker that exits as soon as it exits". It was ruled "for every tool server".
- **The reliability research.** It says to extract a capability only where a consumer demonstrates the need (`reliability-assessment.md:342-350`). Its own map credits "resource ownership, replacement" to `queue, worker, pool` (`reliability-assessment.md:55`). Pool 0.0.13 owns resources but replaces one only at the next acquire (`pool\src\core\Pool.ts:386-408`).

### The gap is branches on the existing ledger

Each gap item maps to code `Pool.ts` already has:

- **Warm floor.**
  - Today, creation runs only for a queued waiter (`Pool.ts:263-276`, `:284-291`), and the guide states the pool has no floor (`scaffold\guides\pool.md:7-8`).
  - A floor needs a create path with no waiter, plus a refill started where a record leaves the ledger (`Pool.ts:518`).
- **Loss of an idle or leased record.**
  - `#dispose` already removes a record from the idle list, the validation set, and the lease set (`Pool.ts:492-495`).
  - `destroy()` already disposes leased records (`Pool.ts:184-186`).
  - A `watch` hook calls that same `#dispose`.
- **Loss declared by the holder.** The token's release-once latch (`Pool.ts:217-228`) gains a second exit, `destroy()`, which calls `#dispose` instead of `#release`.
- **Restart limit.** A strike counter, checked before each refill.
- **No overlap between a dead browser and its replacement.**
  - A disposed record stays counted until its destroy hook settles (`Pool.ts:503-520`; `pool.md:155-156`).
  - Capacity counts owned records plus create reservations (`Pool.ts:272`; `pool.md:111-113`).
  - So a refill started at `Pool.ts:518` never runs beside a dying Chromium. The private design builds that ordering by hand (`eager\proposal-server.md:58`).
- **Teardown in one place.**
  - `destroy()` is one barrier: it rejects waiters, disposes idle and leased records, waits for creates in flight, and destroys the emitter last (`Pool.ts:170-189`, `:574-587`; `pool.md:164-173`).
  - This covers D8's single teardown place for every generic part.

The survey reads the gap the same way: a holder is "a field on the current lease, not a different lifecycle" (`eager\resource-consumers.md:182`, `:184`).

### Why pool, and not a separate package

- **One shared engine.** `scaffold\AGENTS.md:65` says to "prefer one minimal interface and one shared engine". A `@orkestrel/resource` package with its own ledger would be a second resource-ownership engine beside `Pool.ts:34-56`.
- **A wrapper would not be enough.** A package that wraps `Pool` cannot evict a leased record:
  - `PoolToken` carries only `value` and `release` (`pool\src\core\types.ts:50-58`);
  - `release` returns the record to idle without validating it (`Pool.ts:470-483`).

  Such a package would still need this pool change, and it would add a repository, a guide, parity tests, and a release on top.
- **`@orkestrel/lease` collides on names.** `Lease` and `LeaseOptions` belong to `@orkestrel/supervisor` (`supervisor\src\core\types.ts:28`, `:671`).

### Why pool, and not inside `@orkestrel/browser`

- **The private design rebuilds the pool's ledger.** Its fields `#slots`, `#ready`, `#strikes`, `#releasing`, `#change`, and `#wait` (`eager\proposal-server.md:226-235`) duplicate create, capacity, waiter, and teardown bookkeeping that `Pool.ts` already owns. `scaffold\AGENTS.md:45` says to "reuse a primitive whose semantics match".
- **Mechanism belongs in the lowest package.** `scaffold\.claude\rules\quality.md:50` says to fix a reusable defect in the lowest package that owns the mechanism. The floor, loss, and bound loop is mechanism. Profiles, ports, crash text, and the handshake are browse policy and stay in browse.
- **Probe cannot reach it.** Probe cannot import a pool that lives in `@orkestrel/browser`. The public `BrowserPool` variant (`eager\proposal-library.md:7`) serves browse alone.
- **Deferring costs a second migration.** `scaffold\AGENTS.md:66` allows no compatibility shims, so a later extraction migrates browse and probe in the same change and releases both again.

## Design

The following sketch revises `pool\src\core\types.ts`. `PoolCode` and `PoolEventMap` stay unchanged.

```ts
export interface PoolOptions<T> {
	readonly on?: EmitterHooks<PoolEventMap>
	readonly error?: EmitterErrorHandler
	readonly create: () => Promise<T> | T
	readonly destroy?: (value: T) => Promise<void> | void
	readonly validate?: (value: T) => Promise<boolean> | boolean
	/** Settles when the value can no longer serve; the pool then destroys its record, idle or leased. */
	readonly watch?: (value: T) => Promise<unknown>
	readonly max?: number
	/** Keeps this many records warm from `start()` on and refills each loss; at most `max`. */
	readonly min?: number
	/** Bounds consecutive failed refills after the first; a lease grant resets the count. Requires `min`. Default: 0 */
	readonly restarts?: number
}

export interface PoolToken<T> {
	readonly value: T
	release(): void
	/** Destroys this exact record instead of returning it; a repeat call, and a call after `release()`, are no-ops. */
	destroy(): Promise<void>
}

export interface PoolInterface<T> {
	// emitter, size, idle, active, acquire, clear, destroy unchanged
	/** Fills the floor; resolves when `min` live records are owned, rejects `create` when the refill bound is spent, and restarts a spent floor. */
	start(): Promise<void>
}
```

The engine follows these rules:

- **Construction.**
  - The constructor still creates nothing (`Pool.ts:65-80`).
  - It throws `invalid` for:
    - a `min` that is not a positive safe integer, or that exceeds `max`;
    - a `restarts` that is not a non-negative safe integer, or that is set without `min`;
    - a `watch` that is not a function.
- **`start()`.**
  - After `destroy()`, it rejects with `destroyed`.
  - Otherwise it resets the strike count and starts a refill for each missing floor record.
  - It returns the pending fill promise:
    - it resolves when the live records (owned, not destroying) reach `min`;
    - it rejects with `create`, carrying the last failure as `cause`, when the strike count exceeds `restarts`.
  - Without `min`, it resolves immediately.
- **Refill.**
  - A refill is a create with no waiter. It is tracked in `#operations`, so the destroy barrier waits for it.
  - It counts against capacity beside `#reservations`.
  - A record from a refill takes the existing path for a record whose waiter left (`Pool.ts:343-346`): it becomes idle, the pump runs, and the `release` event fires.
  - A refill starts after `#resources.delete` (`Pool.ts:518`) and before the cleanup promise settles (`:519-520`). A waiter woken by that cleanup therefore finds the capacity reserved and waits for the refill instead of creating on demand. That ordering is D7's "never by a caller's demand".
- **Loss.**
  - `watch` runs exactly one time per record, after the record enters the ledger.
  - Its resolution, its rejection, or a synchronous throw disposes the record, unless the record is already destroying or the pool is ending.
  - A lost record is never handed out, even mid-handoff. This covers one still validating (after the await at `Pool.ts:363`, before `#prepare` at `:386-388`) and one with a ready result waiting in `#ready` (`Pool.ts:46-50`, `#commit` at `:425-444`). Its waiter goes back to the pump.
- **Strikes.**
  - These add a strike:
    - a refill whose create rejects;
    - the loss, or failed validation, of a record that is not leased.
  - A lease grant (`Pool.ts:440`) resets the count.
  - These add none:
    - the loss of a leased record;
    - `token.destroy()`.
- **Exhaustion.**
  - While strikes exceed `restarts`, the pool starts no refill and no on-demand create.
  - If it then owns no record and runs no create, it rejects every queued and later acquire with `create`. If it still owns a record, waiters wait for a release.
  - "Exhausted" is derived from the counter, never stored.
- **Pools without `min`.** They keep the 0.0.13 behavior. The one difference: with `watch` set, a lost record is disposed early.

Browse composes the pool through its hooks:

- `create` is browse's warm-up: profile, launch, `connect`, `isolate`, page, and toolset `start`.
- `destroy` releases the toolset, the browser, and the profile.
- `validate` is `browser.ping()`.
- `watch` settles on the browser's `disconnect` event (`browser\src\server\Browser.ts:416-419`) or on a `crash` event from the current view.
- `min` and `max` are both `spares + 1`.
- `restarts` is a browse constant.
- The session holds one token across calls.
- A failed per-call `ping` calls `token.destroy()`.
- `destroy()` on the server calls `pool.destroy()`.

These parts are consumers, adopted at different times:

- **Same campaign, first: browse (unit B3).**
- **Same campaign, after the browser release, gated on probe's design round for item 1: probe.**
  - The Oxlint server's exit becomes a `watch`. Today the exit is recorded (`probe\src\server\stages\LintStage.ts:156`, `:173-175`) and reported only when a later inspection reaches it (`:242-246`).
  - The deadline recycle becomes `token.destroy()`. It lives at `probe\src\server\Probe.ts:536-575`. Its identity check at `:560-573` is what an opaque record gives for free.
- **Next fleet wave: worker.** It must forward or refuse the added keys:
  - `WorkerOptions.pool` is typed `PoolOptions` (`worker\src\core\types.ts:75`);
  - but `Worker` forwards only the keys it lists (`worker\src\core\Worker.ts:81-89`).
- **Not a consumer:** the two fixed browsers in browser's `tests\setupGlobal.ts`, which are two distinct endpoints (`eager\resource-consumers.md:19`).

## Concessions

The evidence goes against this design on the following points:

- **D1 and D2 come first, and they need no pool** (`status.md:12`). An eager launch in `start()` and recovery of one browser need no pool. Built on the pool, they wait behind P1, P2, and the user publishing pool 0.0.14 from their terminal.
- **The spare is unmeasured** (D3, D5).
  - The only reading (`status.md:19`) comes from a different case: the test runner, on a loaded host, preliminary. It found no end-to-end gain from a warm browser.
  - If D3 cuts the spare, browse runs with `min: 1, max: 1`. The floor, `watch`, and `restarts` still serve it, but nothing about it is a pool of more than one.
- **Browse has one holder.** A stdio server has one session (`eager\proposal-server.md:84-91`). The pool's FIFO waiter queue, reservations, and `clear()` method give browse nothing; a Map and a promise would do its job.
- **The risk sits in a shared concurrency engine.**
  - `Pool.ts` is 588 lines (`eager\resource-consumers.md:169`) of reentrant pumping, an in-order commit barrier, and cleanup ordered by microtasks (`Pool.ts:253-282`, `:425-444`, `:503-526`).
  - Refill, the loss guards, and exhaustion touch each of those.
  - A defect reaches worker at its next re-pin.
- **Most browse work stays in browse either way:**
  - the profile sweep and port 9222;
  - the renderer crash on the current page;
  - `ping` and `endpoint`;
  - the loss text, the toolset rebuild, and the handshake.

  The pool removes only the slot ledger.
- **Restart counting is pool-wide.**
  - Records are anonymous (`pool.md:13-15`), so the pool cannot count strikes per slot as both browse lanes do (`eager\proposal-server.md:68`; `eager\proposal-library.md:69-74`).
  - A spare that dies idle twice stops refills for the whole pool, including replacing the leased browser after a later loss.
- **Named records and the holder are not built.**
  - The user's gap list names them, but no reader exists (`eager\resource-consumers.md:184`), and `scaffold\AGENTS.md:65` refuses surface without a consumer.
  - D7's "tracked and known" is met by browse's own `create` and `destroy` hooks, not by the pool.
- **Probe as a consumer is a forecast.**
  - Item 1 has had no design round.
  - Of its three asks, only "replace a worker that exits" maps to the pool. Arming at server start and reporting before a call do not (`probe\src\server\ProbeServer.ts:230-244`, per `eager\resource-consumers.md:33`).
  - The `RuntimeStage` recycle at 64 specifications (`RuntimeStage.ts:655-682`) and the `TypeStage` per-check children (`TypeStage.ts:561-607`) do not map.
  - Probe's design round can refuse a pool of one per stage beside its per-stage queues (`Probe.ts:140-158`).
- **Worker is not free.** Its re-pin owes a unit, because `Worker.ts:81-89` silently drops keys its type accepts.
- **Each adopter adds a runtime dependency.**
  - Neither `browser\package.json:104-113` nor `probe\package.json:95-101` declares pool.
  - `scaffold\AGENTS.md:38` allows a dependency only on the user's explicit request (`eager\capabilities.md:298`).
- **The pool solves neither of two harder problems:**
  - It does not detect an idle browser that hangs silently; no event exists for that (`eager\proposal-analyst.md:5`, `:85`).
  - It leaves the operation lifecycle (`status.md:26`; `reliability-assessment.md:261-267`) wholly in browse. `restarts` re-creates resources and never re-runs work.

## Cost

The following table compares the two paths in units and released packages. The unit IDs are defined in the Units section.

| Path | Units in this campaign | Releases in this campaign | Owed later |
| --- | --- | --- | --- |
| Build in pool | P1, P2, P3, S1, B1, B2, B3, B4, B5, B6, R1; probe Q1 to Q3 on the pool | pool 0.0.14 (added); browser 0.0.22 and the next probe release, both owed anyway | W1 and a worker release in the next wave |
| Keep in browser | B1, B3 with the private ledger, B4, B5, B6, R1; probe item 1 hand-rolled | browser 0.0.22; the next probe release | at extraction: P1 to P3 and S1, plus B7 (migrate browse) and Q4 (migrate probe), a second release of browser and of probe, and W1 |

Building in this campaign:

- **Adds:** pool 0.0.14, units P1 to P3, S1, and B2, and puts the pool publish on the D1/D2 critical path.
- **Removes:** the private ledger from B3, and probe's hand-rolled refill loop.

Deferring:

- **Adds at extraction:** B7, Q4, and a second release of browser and of probe.
- **Throws away:** the private ledger and probe's loop.

The user records that a resource package "fits the ecosystem and answers what is needed" (`status.md:26`). If the extraction happens, deferral costs more in total. If it never happens, deferral saves P1 to P3, S1, B2, W1, and the pool release.

## Units

Order matters for commits and releases. B1 can run in parallel with P1 to P3.

1. **P1 — Pool floor, watch, token destroy, and restarts.**
   - **Role and engine:** astra (GPT-6). The types are written and typechecked first, inside the unit.
   - **Repository:** `C:\Users\mikes\WebstormProjects\pool`.
   - **Owns:**
     - `src\core\types.ts` and `src\core\Pool.ts`;
     - `src\core\validators.ts` and `tests\src\core\validators.test.ts`, only if the guard tension rules for an export;
     - `tests\src\core\Pool.test.ts`;
     - `guides\pool.md`, which replaces the no-floor claim at `:7-8` and adds `start`, the token's `destroy`, and the option rows;
     - `README.md` (the pitch equals the tagline);
     - `package.json`: version 0.0.14, and `@orkestrel/contract` re-pinned to `^0.0.19`.
   - **Depends:** the user's placement ruling.
   - **Spec:** the Design rules.
   - **Accept** (real `Pool`; values are inert stubs; each loss signal is a test-owned deferred promise):
     - With `min` set, construction creates nothing.
     - `start()` calls `create` exactly `min` times, then resolves, and `idle` equals `min`.
     - The invalid values in the construction rule throw `invalid` synchronously.
     - Settling an idle record's `watch`:
       - calls `destroy` one time, then `create` one time;
       - starts that `create` only after the `destroy` hook settles;
       - never lets `size` exceed `max` at any emit.
     - A leased record's loss disposes it; the holder's later `release()` is a no-op; `active` drops; the floor refills.
     - A waiter queued during a loss receives the refill, and `create` runs one time for that loss.
     - A loss during validation, and a loss while a ready result waits behind a slower head, never hand the lost record to its waiter.
     - `token.destroy()`:
       - refills and counts no strike;
       - is a no-op when repeated, or when called after `release()`;
       - makes a later `release()` a no-op.
     - With `restarts: 1`:
       - two consecutive refill failures stop creation;
       - `start()` and the queued acquires reject with `create`, carrying the last failure as `cause`;
       - a later `start()` creates again.
     - The sequence fail, lease, fail keeps refilling. A leased loss counts no strike.
     - When exhausted with one leased record, a waiter waits, and that record's loss rejects the waiter.
     - `destroy()` during a floor create:
       - waits for the create and disposes the late record;
       - emits `destroy` last;
       - makes a pending `start()` reject with `destroyed`.
     - Every existing `Pool.test.ts` case passes unchanged.
     - Control: the writer reports the two lost-record race cases failing on an engine that has the floor but not the guards.
   - **Run:** the pool's core project for `tests\src\core\Pool.test.ts`, then `npm run test:<project>`, then `npm run test:guides`.
2. **P2 — Review.**
   - **Role:** reviewer (Opus 5.5), not the writer of P1.
   - **Scope:** the P1 diff: the refill ordering, the exhaustion rejection, the race guards, the token latch, and the destroy barrier.
   - **Accept:** findings closed, or a pass.
3. **P3 — Gates and release.**
   - `verifier` runs the tree-wide gates.
   - The user publishes pool 0.0.14 from their terminal.
   - The Orchestrator records the pack integrity.
4. **S1 — Mirror.**
   - **Role:** builder (Sonnet 5.5).
   - **Work:** refresh `C:\Users\mikes\WebstormProjects\scaffold\guides\pool.md` from the published package.
   - **Accept:** `npm run test:guides` is green.
5. **B1 — `Browser` gains `endpoint` and `ping`.**
   - **Role:** builder (Sonnet 5.5).
   - **Spec and acceptance:** as written at `eager\proposal-server.md:305-327`.
   - **Depends:** nothing.
6. **B2 — Dependency.**
   - **Role:** builder (Sonnet 5.5).
   - **Owns:** `package.json` (`@orkestrel/pool` `^0.0.14`), the lockfile, and a vendored `guides\pool.md`.
   - **Depends:** P3, and the user's explicit request under `scaffold\AGENTS.md:38`.
   - **Accept:**
     - `npm ci --ignore-scripts`, `npm run check`, and `npm run test:src` are green;
     - `npm ls @orkestrel/contract` shows one installed copy.
7. **B3 — Browse on the pool.**
   - **Role:** astra (GPT-6).
   - **Owns:**
     - `src\server\BrowserMCPServer.ts`;
     - the server block of `src\server\types.ts`;
     - `src\server\constants.ts`;
     - the `src\server\factories.ts` docs;
     - `tests\src\server\BrowserMCPServer.test.ts` and `tests\service\browse.test.ts`;
     - the server rows of `guides\browser.md`.
   - **Depends:** B1 and B2.
   - **Spec:**
     - Use the hook mapping in Design.
     - `start()` sweeps profiles, calls `pool.start()` and observes its result, awaits `pool.acquire(signal)` for the session token, and then follows the handshake ruling (`eager\proposal-server.md:28-38` or `eager\proposal-library.md:29-49`).
     - A lost lease answers the crash text, and the next call acquires again.
     - Remove `#slots`, `#ready`, `#strikes`, `#releasing`, `#change`, and `#wait`.
   - **Accept** (real Chromium):
     - `start()` resolves only after the leased browser reports `connected`.
     - After the floor fills, `create` has run `spares + 1` times.
     - Killing the leased pid after `navigate`:
       - the next call answers the crash text with that URL;
       - the call after it runs on another pid;
       - exactly one replacement is created, and its `connect()` starts after its predecessor's `destroy()` settles.
     - A POSIX `SIGSTOP` on the leased pid makes the per-call `ping` fail, `token.destroy()` run, and the next call run on another pid.
     - Killing a spare gives no crash text and exactly one replacement.
     - When later launches use a missing executable:
       - killing the spare stops creation;
       - after that, killing the leased pid gives the crash text, then `BROWSER_SERVER_UNAVAILABLE` naming `ENOENT`.
     - After `destroy()`:
       - every recorded pid returns `ESRCH`;
       - every endpoint refuses connections;
       - no profile carries this server's pid prefix;
       - the signal listener counts are back at baseline.
8. **B4, B5, B6 — Bin, measurement, prose.** As specified at `eager\proposal-server.md:410-443`. `BROWSE_SPARES` sets `min` and `max`.
9. **R1 — Browser 0.0.22.** `verifier` runs the gates, then the user publishes.
10. **Q1, Q2, Q3 — Probe item 1.**
    - **Q1, design round (Opus 5.5):** rule whether the Oxlint exit and the deadline recycle run on a pool of one per stage.
    - **Q2:** implement on that ruling.
    - **Q3:** release probe.
11. **W1 — Worker re-pin to pool 0.0.14, in the next fleet wave.**
    - **Role:** builder (Sonnet 5.5).
    - **Work:** `Worker.ts:81-89` either forwards the added keys or `WorkerOptions.pool` refuses them (see Tensions).
    - **Accept:**
      - the worker suite is green;
      - a test proves each forwarded key takes effect, or that the type refuses each one not forwarded.

## Alternatives

- **Pool inside `@orkestrel/browser`**, private (`eager\proposal-server.md:458`) or public as `BrowserPool` (`eager\proposal-library.md:7`), with a roadmap item for extraction.
  - It wins on timing for D1 and D2.
  - It loses because probe item 1 hand-rolls the same loop, and the later extraction forces a migration of both consumers and a second release of each (`scaffold\AGENTS.md:66`).
- **A separate package, `@orkestrel/resource`.**
  - It would be a second engine beside `Pool.ts` (`scaffold\AGENTS.md:65`).
  - It still needs a pool change to evict a leased record (`pool\src\core\types.ts:50-58`).
  - It adds a repository, a guide, parity tests, and a release.

## Constraints

The design works within these existing facts:

- The constructor creates nothing; creation is bound to a waiter (`Pool.ts:65-80`, `:263-291`).
- A record leaves the ledger only after its destroy hook settles (`Pool.ts:518`).
- `#dispose` is idempotent: it returns the pending cleanup, or a resolved promise once the record is gone (`Pool.ts:485-501`).
- Validation continues after its await without re-checking the record (`Pool.ts:363`, `:386-388`).
- Events carry no payload (`pool\src\core\types.ts:35-44`), and the options are as listed at `types.ts:70-77`.
- The installed contract versions differ: pool pins `@orkestrel/contract` `^0.0.18` (`pool\package.json:72`), and browser pins `^0.0.19` (`browser\package.json:105`).
- Pool has a dev dependency on `@orkestrel/probe` `^0.0.19` (`pool\package.json:78`).
- Browse launches lazily on the first tool call (`browser\src\server\BrowserMCPServer.ts:199-211`).
- `Browser` emits `disconnect` on an exit only if it was connected (`Browser.ts:416-419`).
- Worker's options type accepts keys that `Worker` drops (`worker\src\core\types.ts:75`; `Worker.ts:81-89`).
- `@orkestrel/supervisor` and `@orkestrel/process`'s `Supervisor` class are ruled out (`eager\design-brief.md:8`).

## Refusals

These options are closed by a rule, quoted:

- **`@orkestrel/lease` exporting `Lease` or `LeaseOptions`.** `names.md:126`: "Give every bare exported name one owning package across the `@orkestrel` fleet."
- **Compound option keys such as `warmFloor` or `restartLimit`.** `names.md:29`: "Ungrouped option keys: one word."
- **`token.evict()`, `pool.refill()`, or `pool.restart()`.** `names.md:234`: "Never introduce synonyms … for these meanings." The fixed verbs already cover these: `start` means "Begin or restart" (`:224`), and `destroy` means "Tear down and release resources" (`:231`).
- **A heartbeat to meet D7's "at all times".** `scaffold\AGENTS.md:68`: "No polling architecture. Park idle work on events and abort signals."
- **A holder field, a record snapshot, or event payloads in this release.** `scaffold\AGENTS.md:65`: "Create or substantively expand a capability with its first real consumer."
- **A stored `exhausted` flag.** `scaffold\AGENTS.md:58`: "never store a second flag or label that can drift."
- **Adding pool to browser or probe without the user's request.** `scaffold\AGENTS.md:38`: "NEVER add an npm package unless the user explicitly requests it."

## Measurements

Readings supplied:

- `status.md:19` (ws-endpoint-probe, 2026-10-03, loaded host, preliminary):
  - a headless-shell launch took 80.5 ms;
  - provider setup to a ready context fell from a 99 ms median cold to 26.5 ms connected;
  - a warm browser showed no end-to-end gain for test scripts.
- These readings bear on D3, not on where the capability lives.

Readings missing:

- The D3 readings: failover time with and without a spare, and the spare's idle cost (`eager\proposal-server.md:286-291`). They are the same under either placement.
- No reading compares the two placements. This proposal makes no performance claim.
- Worker's suite at W1 is the regression reading for the unchanged lazy path. It has not been run.

## Tensions

These judgment calls are open for the Orchestrator or the other lane:

- **Timing.** The pool publish sits on the D1/D2 critical path, against "both come first" (`status.md:12`). B1 runs in parallel; B3 cannot.
- **Restart counting.** Pool-wide counting against the per-slot counting both browse lanes use.
- **`restarts` or `retries`.** The queue's `retries` re-runs work. Re-creating a resource is a different concept (`scaffold\AGENTS.md:54`).
- **Flat or grouped options.** Flat `min` plus `restarts`, cross-validated, against a grouped `floor: { size, restarts }` (`names.md:30`), which makes an inert `restarts` impossible to write.
- **The guard for `min`.** Reuse `isPoolMax` internally, or export `isPoolMin` and `isPoolRestarts`.
- **The hook's name.** `watch`, or another verb for the loss hook.
- **What `start()` waits for.** `start()` resolves only at the full floor; browse gates its handshake on its first `acquire`. Whether a spare that cannot start is a startup failure (`eager\proposal-analyst.md:24`) or just a smaller pool (`eager\proposal-server.md:11`) is browse policy.
- **W1.** Forward the added keys, with `Worker.start` calling `#pool.start()`, or narrow `WorkerOptions.pool`.
- **`clear()` on a floor pool.** It refills immediately.
- **Probe adoption.** It waits on probe's own design round.

## Risks

- **Engine regression.** A defect in the race guards or the refill ordering in `Pool.ts` reaches worker at W1.
- **Publish delay.** The pool publish is a manual step by the user, and it delays B2 and B3.
- **A dependency loop.** If probe takes pool, the loop pool, then `@orkestrel/probe` as a dev dependency, then pool installs a published pool inside pool's own checkout. Unverified whether that resolves cleanly.
- **A second contract copy.** If P1 skips the `^0.0.19` re-pin, a second `@orkestrel/contract` copy installs in browser (`eager\capabilities.md:304`).
- **A floor of one.** If D3 cuts the spare, browse runs a floor of one.
- **Silent exhaustion.** No event reports it. After `start()` settles, browse learns of it only at its next `acquire`.