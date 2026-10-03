**Answer.** Put the resource lifecycle in `@orkestrel/pool`, in this campaign, as a bounded expansion. The pool gains a warm floor, `start()`, loss reported through a `watch` hook, a loss the holder declares through the token's `destroy()`, and a refill bound. This is not a full build-out: the holder field and named-record event payloads stay out because no code reads them.

A separate package loses on two counts. It would be a second engine beside `Pool.ts`, and `@orkestrel/lease` collides with `@orkestrel/supervisor`'s `Lease`. A build inside `@orkestrel/browser` also loses. Two consumers the user ruled on 2026-10-03 need the capability in this campaign: `browse` D1 and D2, and probe ROADMAP item 1. A private ledger would be thrown away when the capability moves out.

Expanding pool for its first real consumer is what `AGENTS.md:65` allows. Two choices belong to you:
- the explicit request that adds `@orkestrel/pool` to `@orkestrel/browser` (`AGENTS.md:38`);
- whether D1 and D2 can wait for a pool publish.

If you refuse either one, ruling 4 gives the fallback.

Lane: judge over both lanes. Objective rulings cite code and rules. Naming rulings are marked subjective.

## Rulings

**1. Timing: build the shared capability in this campaign, in pool.**
- **The need is ruled, not forecast.**
  - D1 and D2 come first (`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\status.md:12`). Even with one browser they need an eager start, replacement driven by death, a bound, and one teardown.
  - D3's unmeasured spare therefore changes only the size, not the need.
  - Probe item 1 asks to "replace a worker that exits as soon as it exits", ruled "for every tool server" (`C:\Users\mikes\WebstormProjects\probe\ROADMAP.md:5`).
- **The gap fits seams the pool already has.**
  - The floor is a second way into `#startCreate` (`C:\Users\mikes\WebstormProjects\pool\src\core\Pool.ts:263-291`).
  - A loss goes through `#dispose`, which can be called twice safely (`Pool.ts:485-501`).
  - A record stays counted until `Pool.ts:518`, and capacity counts it (`:272`). So a refill waits for its predecessor's destroy hook.
- **The rules point to pool.**
  - `AGENTS.md:65` gates on the first real consumer.
  - `architecture.md:311` says "Centralize any pattern repeated twice". Probe's `#recycle` (`C:\Users\mikes\WebstormProjects\probe\src\server\Probe.ts:536-575`) is the existing copy.
  - `quality.md:50` says to fix a reusable defect in the lowest package that owns the mechanism.
  - The research's restraint is "where the consumer demonstrates the need" (`reliability-assessment.md:342`), and browse demonstrates it.
- **Gate the publish on a probe mapping.**
  - Run probe item 1's mapping (read-only) in parallel with P1.
  - P3 publishes only after the mapping reports that each stage fits on `create`, `destroy`, `watch`, and the token's `destroy` without adding a hook.
  - A missing hook then lands before the release, not in a second release.

**2. Shape: one engine, `Pool`, in `@orkestrel/pool`. Each public addition is sized to a named consumer.**
- **`min`: the floor.**
  - Browse sets it to `spares + 1`; probe sets it to 1.
  - While `min` is set, the pool creates only to restore the floor. Refuse `min < max` as `invalid`, because no consumer needs capacity above the floor, and lifting the refusal later is additive. `max` defaults to `min`.
- **`start()`:** the fixed verb "Begin or restart" (`C:\Users\mikes\WebstormProjects\scaffold\.claude\rules\names.md:224`).
  - It resolves when the floor is full.
  - It rejects with `create`, carrying the last cause, when the bound is spent.
  - Called again, it restarts a spent floor.
- **`watch(value, signal)`:** the promise settles when the record is lost. The signal aborts when the record's disposal begins (see V4).
- **`PoolToken.destroy()`.**
  - Browse calls it on a failed per-call ping. Probe calls it for its deadline recycle, and the token's per-record latch replaces the identity check at `Probe.ts:560-573`.
  - Subjective: I chose `destroy` over `evict` (`names.md:231`), because the pool already names record teardown `destroy`, in both the hook and the event.
- **The bound.**
  - It is required whenever `min` is set, with no default (D5, `eager\design-brief.md:18`).
  - Subjective: the name `restarts` over `limit` or `strikes`.
- **Not built:**
  - a holder;
  - `acquire(options)`;
  - event payloads;
  - a token `signal`;
  - a `retire` event;
  - a second keeper class.

**3. Browse seam: browse composes `Pool<BrowserSlot>`.**
- `BrowserSlot` holds the browser, the profile, and the toolset. It is declared in `src/server/types.ts`, and `architecture.md:51` exports it.
- The hooks map as follows:
  - `create` is the warm-up: profile, launch, `connect`, `isolate`, page, toolset `start`.
  - `destroy` releases the toolset, then the browser, then the profile.
  - `validate` is `ping`.
  - `watch` settles on `disconnect` (`C:\Users\mikes\WebstormProjects\browser\src\server\Browser.ts:416-419`) or on a `crash` of the toolset's current view.
- The session holds one token across calls.
- Policy stays in browse:
  - the profile sweep;
  - the handshake gate;
  - the loss text, with no replay;
  - the per-call ping;
  - `BROWSE_SPARES`.
- Browse removes `#session`, `#browser`, and `#profile` (`C:\Users\mikes\WebstormProjects\browser\src\server\BrowserMCPServer.ts:85-88`). It never adds the `#slots`, `#ready`, `#strikes`, `#releasing`, `#change`, or `#wait` fields (`eager\proposal-server.md:226-235`).

**4. Trigger.**
- **This campaign:** the trigger is already met. Browse D1 and D2 are the first real consumer, and probe item 1 is a second consumer, ruled on the same day.
- **Fallback, if you rule against the publish or the dependency:**
  - Build browse on proposal-server's private shape, with `#warm` and `#release` written as the `create` and `destroy` hooks a pool takes.
  - Build no generic engine (see V10).
  - The move becomes due at probe item 1's design round. The destination is fixed as pool, per V11.

**5. Roadmap text, ready to paste.**

Item 13 goes in `C:\Users\mikes\WebstormProjects\browser\ROADMAP.md`. Check the number against the merged main file; it is the highest item there (`:9`) plus 1.
```markdown
- **13.** Start `browse`'s browsers at server start and replace one that dies, on `@orkestrel/pool`'s warm floor: `start()` (`src/server/BrowserMCPServer.ts:131-139`) serves stdio and launches nothing, the first tool call launches one Chromium (`#open` and `#launch`, `:199-250`), a launch that succeeded stays in `#session` (`:85`, `:201-202`) after its browser exits, and nothing subscribes to the browser's `disconnect` (`src/server/Browser.ts:416-419`), so a crashed browser leaves every later call on a dead page. Declare `@orkestrel/pool` `^0.0.14`, the release that adds the floor, the `watch` hook, the token's `destroy`, and the refill bound, and build the server on one pool whose floor equals its size: `create` warms one `PID-UUID` profile, browser, isolated context, page, and started toolset; `destroy` releases the toolset, the browser, then the profile; `validate` calls the browser's `ping`; `watch` settles on `disconnect` or on a `crash` of the toolset's current page. `start()` removes the profiles of dead pids, starts the pool, and serves stdio after the session's first lease; a per-call check that fails destroys the session's token; a lost lease answers the next call with a coded loss that names the last URL and replays nothing, and the call after it leases again; `destroy()` (`:141-167`) destroys the pool. Size the floor from `BROWSE_SPARES` plus the session's browser, and keep the default spare count at 0 until the user rules on the spare's measured value (D3, 2026-10-03).
```
This sentence goes at the end of item 1 in `C:\Users\mikes\WebstormProjects\probe\ROADMAP.md`:
```markdown
Build that replacement on `@orkestrel/pool` 0.0.14's warm floor before writing a loop of its own: one pool of one per stage, `create` constructing the stage (`src/server/Probe.ts:137-139`), `destroy` calling the stage's `destroy` (`:545`), `watch` settling on the Oxlint client's `exit` (`src/server/stages/LintStage.ts:156`), and the deadline recycle (`#recycle`, `src/server/Probe.ts:536-575`) calling the leased token's `destroy`, whose per-record latch replaces the identity check at `:560-573`; write a local loop only for a stage that needs a hook the pool lacks, and name that hook in the commit; re-pin `@orkestrel/contract` to the range pool 0.0.14 pins, because this package pins `^0.0.18` (`package.json:95`).
```
Pool and worker keep no ROADMAP (`eager\capabilities.md:12`, `:26`), so create none. Record W1 in the campaign status instead.

If you rule the fallback, use this text as browser item 13 instead:
```markdown
- **13.** Move `browse`'s browser ledger onto `@orkestrel/pool` when probe ROADMAP item 1 reaches its design round: the eager start and the recovery live in `BrowserMCPServer` as `#warm` and `#release`, written as the `create` and `destroy` hooks a pool takes, because `@orkestrel/pool` 0.0.13 creates only for a queued acquire (that package's `src/core/Pool.ts:263-291`), observes no death, and keeps no floor. Expand `@orkestrel/pool` with a warm floor, a `watch` hook, the token's `destroy`, and a refill bound; declare it here; delete the server's slot fields, `#warm`, and `#release` in the same change; and release this package.
```
In the fallback, append this to probe item 1:
```markdown
Before writing the replacement, map each stage onto the hooks `@orkestrel/browser` ROADMAP item 13 names; when every stage maps with no hook added, expand `@orkestrel/pool` instead of writing a second loop.
```

**6. Cost.**

Units B1, B4, B5, and B6 are common to every option.

| Option | Units in this campaign | Releases in this campaign | Owed later |
| --- | --- | --- | --- |
| Pool 0.0.14 (ruled) | P1 engine, P2 review, P3 gates, S1 mirror, B2 dependency, B3 browse on the pool, Q1 probe mapping (parallel) | pool 0.0.14 (added), browser (owed anyway) | probe adopts at item 1 (its release is owed anyway); W1 at worker's next visit |
| Browse-private, then move | B3 with a private ledger | browser | P1 to P3, S1, migration of browse, a second browser release, probe adoption, W1; the ledger is thrown away |
| Generic `BrowserPool<T>` in browser | the previous row, plus a types block, a lint override, an `INTERNAL` row, and guide rows | browser | the previous row, plus a rewrite into `Pool.ts` and removal of public types from `@orkestrel/browser/server` |
| Separate package | repository, types, engine, tests, guide, README, parity, scaffold mirror, B2 | the package's first release, browser | worker stays on `Pool`, leaving two engines (`AGENTS.md:65`) |

No live reading compares the placements. `status.md:19` bears on D3 only.

## Verdicts on lane claims

1. **V1, now lane: "a refill … never runs beside a dying Chromium". FAILS.**
   - `Pool.ts:510-520` deletes the record and settles the cleanup whether or not the hook failed. `Browser.destroy` rejects when the process survives SIGKILL (`Browser.ts:1139-1141`).
   - Breaking input: the leased Chromium hangs past SIGKILL, `watch` fires, and the hook rejects. `:518` frees capacity, and the refill launches beside the survivor, against D6 and D8 (`eager\design-brief.md:19`, `:21`).
   - Probe takes the opposite policy: it installs the replacement either way (`Probe.ts:541-543`).
   - **Required change in P1's spec:** state that the ordering holds only for a destroy hook that resolves. Rule on the rejected case. I recommend refilling, counting a strike, and recording the failure so `destroy()` rejects with `cleanup`. Add an acceptance case for it.
2. **V2, now lane: `restarts` with a default of 0. FAILS.**
   - Under the lane's strike rule, an idle loss with `min: 2` gives 1 strike, which exceeds 0, so the pool never refills.
   - So P1's own case "calls `destroy` one time, then `create` one time" fails unless the case sets `restarts`. The documented meaning ("after the first") contradicts the rule.
   - **Required change:** make the bound required whenever `min` is set, with no default. Add cases that pin the last allowed failure and the first refused one.
3. **V3, both pool lanes: D7 against the create-on-acquire branch.**
   - `Pool.ts:272-276` stays live under `min`. The shape lane keeps creates on acquire uncounted.
   - Breaking input: an acquire is queued while the floor is below `min` and no refill is reserved, either between a failed refill and the next one, or after the destroy hook rejects. `#pump` then launches on the caller's demand, against `eager\design-brief.md:20`. In the shape lane that loop has no bound.
   - **Required change:** under `min`, never create for a waiter. Acceptance: with an acquire queued during a failed refill, the `create` calls equal the refills.
4. **V4, now lane: `watch(value)` takes no signal.**
   - A record disposed by `validate`, `clear`, or `destroy` leaves its watch armed. The pool's `.then` on that watch promise keeps the value reachable for as long as its death source lives.
   - **Required change:** use `watch(value, signal)`, with the signal aborted when disposal begins. Accept by checking the abort on each of the three disposal paths.
5. **V5, now lane: pool-wide strikes, reset only by a lease grant.**
   - Browse holds one token across calls, so no lease grant happens during a session.
   - Breaking input (`restarts: 1`):
     - the spare dies while idle twice, hours apart, and both refills succeed;
     - the pool is now exhausted;
     - the leased browser then crashes and is not replaced, even though every create succeeded.
   - Both browse lanes count per slot and would recover the leased slot (`eager\proposal-server.md:68`; `eager\proposal-library.md:69-74`).
   - **Required change:** P1 rules on this case and tests it. I recommend that a leased loss always gets one refill attempt, even when the bound is spent, and that a failure of that attempt counts a strike.
6. **V6, shape lane: holder, payloads, `acquire(options)`, `token.signal`. Refused for this release.**
   - No code reads any of them (`eager\resource-consumers.md:184`, and the lane's own Concessions).
   - `acquire(options)` breaks `C:\Users\mikes\WebstormProjects\worker\src\core\Worker.ts:154`, and `PoolEventMap<T>` changes the `on` hooks forwarded at `Worker.ts:85`.
   - Whether D7 requires a readable holder in the pool is your call.
7. **V7, shape lane: "the limit belongs to the record" is inconsistent.** Its spec counts across the whole pool ("reset the count on each delivery", "stop all creates"). The V5 ruling settles the counting.
8. **V8, defer lane: "pool, then worker, then browser must publish before D1 and D2". FALSE.**
   - Worker pins `^0.0.13` (`eager\capabilities.md:25`). On 0.0.x a caret admits only that version (`eager\proposal-library.md:374`).
   - Browser does not depend on worker (`C:\Users\mikes\WebstormProjects\browser\package.json:105-113`).
   - So W1 is off the D1/D2 path.
9. **V9, defer lane: `reliability-assessment.md:289` read as a rule that needs two consumers. Misread.** The restraint at `:342` says "the consumer", singular, and `AGENTS.md:65` gates on the first consumer.
10. **V10, defer lane: "extraction a move rather than a rewrite". FAILS on the lane's own concessions.**
    - `C:\Users\mikes\WebstormProjects\browser\src\server\index.ts:1` publishes every type in the engine block.
    - Moving into pool means rewriting the engine inside `Pool.ts`.
11. **V11, defer lane: named singletons might point at a separate package. Weakened by existing code.**
    - The fleet already runs a single resource as a pool of one behind a queue limited to one job at a time: `Worker.ts:67`, `:84`, `:154-158`.
    - Probe's stages sit behind exactly such queues (`Probe.ts:144-158`) and are replaced by a fresh instance of the same class (`:562-573`).

## Findings outside the claims

- **USER: the dependency request.** The brief's request is to reuse a package "whose semantics match" (`eager\design-brief.md:8`). Pool 0.0.13 does not match (`C:\Users\mikes\WebstormProjects\scaffold\guides\pool.md:7-8`). So adding pool to browser, and later to probe, needs your explicit request under `AGENTS.md:38`. `eager\capabilities.md:298` treats the brief as that request; I do not accept that reading.
- **USER: the remaining policy calls.**
  - whether D1 and D2 can wait for the pool publish;
  - the spare count under D3, after M3 and M4;
  - whether a spare that cannot start fails at onset (`eager\proposal-analyst.md:24`) or the server runs with fewer browsers (`eager\proposal-server.md:11`);
  - the holder (V6).
- **Probe needs a re-pin.** Probe pins contract `^0.0.18` (`C:\Users\mikes\WebstormProjects\probe\package.json:95`), so adopting pool 0.0.14 needs a contract re-pin. The probe roadmap text covers this.
- **The `release` event's wording.** A refill reaches idle through `#recycle` and emits `release` (`Pool.ts:475-483`), but the event's contract says "a released resource became immediately idle" (`C:\Users\mikes\WebstormProjects\pool\src\core\types.ts:40-41`). P1 must make the guide row and that wording agree.
- **UNRESOLVED: the dependency loop.** Pool has a development dependency on probe (`C:\Users\mikes\WebstormProjects\pool\package.json:78`), and probe would depend on pool. The only evidence that this installs cleanly is the writer's statement.

## Attacked and held

- **No overlap when the destroy hook resolves:** the record is counted until `Pool.ts:518`, and capacity counts it (`:272`).
- **`#dispose`:** a repeat call is safe, and it removes the record from the idle list, the validation set, and the lease set (`Pool.ts:485-501`).
- **The lost-record race guards are needed.**
  - Validation resumes after `:363` with no ownership check before `#prepare` (`:386-388`).
  - `#commit` hands out results already waiting in `#ready` (`:425-444`).
  - `destroy()` avoids this only by skipping records that are validating (`:185`).
  - The mutation P1's control names, removing the guards, fails both race cases.
- **W1 is required:** `Worker.ts:81-89` forwards only the keys it names.
- **The `Lease` collision:** `C:\Users\mikes\WebstormProjects\supervisor\src\core\types.ts:28`, `:671`; `names.md:126`.
- **The contract pin mismatch:** pool pins `^0.0.18` (`pool\package.json:72`) and browser pins `^0.0.19` (`browser\package.json:105`).
- **`watch` covers every browse record:** `disconnect` fires only for a connected browser (`Browser.ts:416-419`), and browse's `create` includes `connect`.

VERDICT: PLACE THE BOUNDED SUBSET IN @orkestrel/pool 0.0.14 IN THIS CAMPAIGN; V1-V5 REQUIRED BEFORE P1; USER DECIDES THE DEPENDENCY REQUEST, THE PUBLISH ON THE D1/D2 PATH, D3, THE HOLDER, AND THE SPARE-STARTUP POLICY