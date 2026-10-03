# Build the browse pool inside `@orkestrel/browser` first, extract it later: the case for deferring extraction

**Lane:** objective. This document argues the defer side, using what the code, the rules, and the user's rulings permit. Naming calls go to Tensions for the subjective lane.

## Position

Build the browse pool in this change inside `@orkestrel/browser/server`, as one internal engine class. It holds only the gap items: an eager floor, eviction of a resource that dies, named member records, a holder on each lease, and a restart bound. It imports no browser code and stays off the barrel through the package's `INTERNAL` list. The `browse` server supplies every Chromium and operation fact through hooks. Record the extraction as `@orkestrel/browser` ROADMAP item 13, with a pointer from probe item 1. Move the engine when a second package's design round maps its own resource onto the engine's hooks without adding a hook.

Four reasons support this:

- **The first decisions need no upstream release.** The user's D1 and D2 come first and need one supervised browser.
- **The lease half does no work yet.** It needs a second browser, which waits on D3's measurement, and a second holder, which a stdio server does not have.
- **The nearest second consumer has a different shape.** Probe's item 1 supervises named, unlike stages. Until it is designed, nobody knows whether the shared part is a pool with leases or a supervised singleton.
- **Choosing the destination from one consumer is a guess.** Picking `@orkestrel/pool` or a separate package with one consumer is the guess the extraction rule exists to prevent.

## Argument

1. **What the user ruled comes first needs a single supervised browser.**
   - D1 and D2 "come first", then the spare (`status.md:12`). D3 measures the spare's value before keeping it (`design-brief.md:16`).
   - Both proposals default to one browser until that ruling: `BROWSER_SERVER_SPARES = 0` (`proposal-server.md:211`, `:299`) and a default size of 1 (`proposal-library.md:113`).
   - D1 and D2 need eager start, death eviction, replacement, and a restart bound on that one browser. Building in `@orkestrel/pool` or a separate package puts at least one upstream publish in front of them.

2. **The lease and holder items have no second holder to serve in `browse`.**
   - The holder is "the MCP session, the only holder a stdio server has" (`proposal-server.md:85`), and balancing only differs once a second holder exists (`proposal-server.md:518`).
   - Today the server holds one session (`browser-wt-browse/src/server/BrowserMCPServer.ts:85-88`).
   - D7 asks for the lease record regardless (`design-brief.md:20`), so the engine builds it. A public, generalized holder API would still rest on a consumer whose holder never varies.

3. **The second consumer is scheduled but has a different shape.**
   - Probe ROADMAP item 1 replaces "a worker that exits as soon as it exits" (`probe/ROADMAP.md:5`).
   - Probe's resources are three named, unlike stages (`probe/src/server/Probe.ts:137-139`), each behind its own queue with concurrency 1 (`Probe.ts:144-158`). They are replaced by identity (`Probe.ts:536-575`). The Oxlint exit is recorded, not replaced (`probe/src/server/stages/LintStage.ts:156`, `:173-175`).
   - That shape needs floor, eviction, and a bound per stage, and probably no lease or holder. Browse needs every gap item.
   - Which half is shared decides the destination. Leasing interchangeable members points at `@orkestrel/pool`, which matches the worker's shape (`worker/src/core/Worker.ts:80-89`). Supervising named resources without leases points at a separate package. One consumer cannot decide this.

4. **The rules tie extraction to repetition and to another consumer.**
   - "Centralize any pattern repeated twice" (`.claude/rules/architecture.md:311`).
   - The reliability research ends: "then extract only the mechanisms that another application actually needs" (`reliability-assessment.md:289`; restraint at `:342-350`).
   - "Keep everything generic/reusable and free of unrelated-project logic" (`architecture.md:312`) and "Mechanism, not product policy" (`AGENTS.md:67`) justify the engine and adapter split even with one consumer.

5. **The pool engine is a poor fit for an in-place edit right away.**
   - `Pool` creates only for a queued waiter (`pool/src/core/Pool.ts:263-290`). A floor has no waiter, so it is a separate entry into `create` (`resource-consumers.md:178`).
   - Death while leased or idle is not a branch: there is no subscription and no evict method (`resource-consumers.md:180`; `Pool.ts:470-483`).
   - Changing `PoolEventMap` (`pool/src/core/types.ts:35-44`) or `acquire` reaches `@orkestrel/worker`'s public type. It re-exposes `PoolOptions` (`worker/src/core/types.ts:2`, `:75`) and passes `on` through (`Worker.ts:85`).
   - `@orkestrel/pool` pins `@orkestrel/contract` `^0.0.18` (`pool/package.json:72`) against browser's `^0.0.19` (`browser-wt-browse/package.json:105`). Pool therefore needs a re-pin release before browser can declare it (`capabilities.md:304`).

6. **Keeping the engine internal keeps the operation layer separate.**
   - The user keeps the resource lifecycle and the operation lifecycle distinct (`status.md:26`).
   - The in-flight call's unresolved outcome stays `browse` policy: a coded loss and no replay (`proposal-analyst.md:109`).
   - A public lease-loss signal published before the operation contract exists (`reliability-assessment.md:293-313`) could be read as an operation outcome. An internal engine leaves that boundary open.

## Design

The design has three parts: the seam, the trigger, and the roadmap item.

**The seam** keeps extraction a move rather than a rewrite through these rules:

- **One class, `BrowserPool<T>`, in `src/server/BrowserPool.ts`.** It is generic over the resource. It imports only `@orkestrel/emitter`, `@orkestrel/contract` (both declared, `browser-wt-browse/package.json:105-106`), and `./types.js`, `./constants.js`, and `./errors.js`. One `.oxlintrc.json` override for that file refuses `@src/core`, `./Browser.js`, `./BrowserMCPServer.js`, `./factories.js`, `./helpers.js`, and `node:*`. It repeats the `src/server/**` patterns (`.oxlintrc.json:278-322`), because how overrides merge is unverified.
- **The contract is the gap items and nothing else, in one contiguous block of `src/server/types.ts`.** The options are `size`, `strikes`, `create(signal)`, `destroy(value)`, `watch(value, fault) => unwatch`, `validate?(value, signal)`, `on`, and `error`. The member record has `id`, `generation`, `status` (`warming | ready | leased | retired`), `value`, and `holder`. Events (`ready`, `acquire`, `release`, `fault`, `retire`, `error`, `destroy`) carry the member. The lease has `value`, `signal`, `holder`, and an idempotent, generation-checked `release`. No field names a browser fact: pid, endpoint, and profile live in `T`, the adapter's slot. That avoids the drift in `proposal-library.md:187-194`.
- **The class stays off the barrel.** Add `'class BrowserPool'` to `INTERNAL` (`browser-wt-browse/tests/guides.test.ts:34-45`), following the precedent of `FileBrowserStore` (`src/server/stores/FileBrowserStore.ts:24`, consumed at `FileBrowserRunStore.ts:37` and `FileBrowserJourneyStore.ts:34`).
- **Its mirrored test drives inert resources only.** It uses a recording `create` that returns `{ id, emitter }` and no Chromium, so the test file moves with the class.
- **`BrowserMCPServer` is the adapter.** Its hooks hold every browser fact: the `PID-UUID` profile, launch options, `disconnect` and current-page `crash` as `watch`, `ping` as `validate`, and the toolset build and mirror. They also hold every operation fact: the loss notice and no replay. The server keeps no member state beside the engine and its lease. Spreading slots across the server's private fields would make extraction a rewrite (`proposal-server.md:223-235`).

**The trigger:** extraction is due at the first design round in a package other than `@orkestrel/browser` whose ruling needs an eager floor, death eviction, and a replacement bound on a resource it owns.

- The named candidate is probe ROADMAP item 1.
- The evidence is a written mapping of that resource onto `create`, `destroy`, `watch`, and `validate`, with no hook added and no browser term.
- The destination follows from that mapping. A consumer that leases interchangeable members goes into `@orkestrel/pool`. A consumer that supervises named resources without leases goes into a separate package.
- A second consumer inside `@orkestrel/browser` does not trigger extraction. Examples are the shared `tests/service` browser and `tests/setupGlobal.ts:286-328`. The probe on 2026-10-03 also found that a warm browser shows no end-to-end gain for those scripts (`status.md:19`).

**Where the roadmap item lives.** Put it in `@orkestrel/browser`'s `ROADMAP.md`, because the code lives there and pool keeps no roadmap (`capabilities.md:12`). Do not create a pool roadmap, because the destination is not ruled. Use the next unused number: 13, unless a higher number was ever assigned (numbering rule at `browser/ROADMAP.md:1`; the highest visible item is 12, at `:9`). The item text follows:

```markdown
- **13.** Move the browse pool's engine into a shared package when a second package needs it: `BrowserPool` (`src/server/BrowserPool.ts`, kept off the barrel through `INTERNAL` in `tests/guides.test.ts`) starts a fixed set of resources at `start()`, evicts and replaces a resource whose `watch` hook reports its death, names the member in every event, records the holder of each lease, and retires a member after `BROWSER_POOL_STRIKES` failed lives in a row, through its `create`, `destroy`, `watch`, and `validate` hooks; `@orkestrel/pool` 0.0.13 creates only inside `acquire` (`src/core/Pool.ts:263-290`), observes no death (`src/core/Pool.ts:470-483`), and emits empty payloads (`src/core/types.ts:35-44`). The engine imports no browser code (`.oxlintrc.json`) and its tests drive inert resources. When another package's design round maps a resource it owns onto those hooks with none added (`@orkestrel/probe` ROADMAP item 1, which replaces a worker that exits, is the named candidate), move the engine's types, constants, error codes, and tests into `@orkestrel/pool` if that consumer leases interchangeable members, or into a separate package if it supervises named resources without leases; publish that package, re-pin it here, and delete the local engine and its `guides/browser.md` rows in the same change.
```

Append this sentence to probe item 1 (`probe/ROADMAP.md:5`):

```markdown
Before writing the replacement, map each stage onto the hooks of `@orkestrel/browser`'s pool engine (that package's ROADMAP item 13); when every stage maps with no hook added, this item extracts that engine instead of writing a second one.
```

## Concessions

The evidence goes against this position on these points:

- **The minimal public API law permits expanding pool in this change.** It gates on "its first real consumer" (`AGENTS.md:65`), and `browse` is one. Nothing in the law requires a second consumer.
- **The ecosystem-reuse rule points at pool.** "Fix a reusable defect in the lowest package that owns the mechanism; keep product policy downstream" (`.claude/rules/quality.md:50`). The gap is a missing capability rather than a defect, but the rule's direction is pool.
- **The user has already ruled the capability fits.** A resource or lease package "fits the ecosystem and answers what is needed" (`status.md:26`). This case can argue timing only.
- **The pattern already repeats, written by hand in several places.** Eager start, death detection, and replacement appear in browser, probe, worker, mcp, and lsp (`resource-consumers.md:192-218`). Probe's `#recycle` (`Probe.ts:536-575`) and its re-arm bounded to one per call (`Probe.ts:229-242`) are an engine in miniature. A reader can hold that `architecture.md:311` is already met.
- **Probe item 1 is ruled, not hypothetical** (`status.md:13`). If extraction is certain, building here and moving later costs more than building once at the destination.
- **Two of the gap items are cheap inside pool.** Named records are a payload on the four existing emits (`Pool.ts:335`, `:442`, `:482`, `:523`). The holder is a field beside `#leased` (`Pool.ts:37`, `:440`). Only the floor, death eviction, and the restart bound are new control paths.
- **Inside the package is not private.** `export * from './types.js'` (`src/server/index.ts:1`) publishes every engine type. The `INTERNAL` check refuses to list a name the barrel exports (`tests/guides.test.ts:432-435`), and every public export needs a guide row (`documentation.md:33`; precedent at `guides/browser.md:1371`). Extraction then removes public types from `@orkestrel/browser/server`.
- **The seam keeps extraction a move only toward a separate package.** Inside `@orkestrel/pool`, "one minimal interface and one shared engine" (`AGENTS.md:65`) forces a merge into `Pool.ts`'s pump. Only the contract and the tests move; the engine code is rewritten, and `acquire(options)` replaces pool's `acquire(signal)`, which the worker calls (`resource-consumers.md:41`).
- **A generic `T` with hooks is partly the speculation this case objects to.** `browse` alone needs the mechanism and policy split, not the type parameter. If probe never adopts the engine, that generality was unneeded.
- **D6 expects two browsers.** The user expects two, three at most (`design-brief.md:19`), so the lease half is the user's expected design, not a remote option.

## Cost

Some units are common to every placement and are not counted here: the `Browser` `endpoint` and `ping` members, the browse adapter's eager start and recovery, the bin variable, the measurement, and the `@orkestrel/mcp` hook if D9 is ruled. The placement-specific cost follows:

| Path | Units in this change | Releases before D1 and D2 ship | Units at extraction | Releases at extraction |
| --- | --- | --- | --- | --- |
| Inside browser (this position) | the engine (types block, class, inert tests, `INTERNAL` row, lint override, guide rows); roadmap item 13 plus the probe pointer | `@orkestrel/browser` | move the class, types, constants, and tests into the destination and rename the prefix; the destination guide and parity; re-pin browser and delete the local engine and guide rows; into pool, merge into `Pool.ts` | the destination (`@orkestrel/pool` or the separate package's first release), `@orkestrel/worker` if pool's public types change, `@orkestrel/browser` again, `@orkestrel/probe` |
| Expand `@orkestrel/pool` in this change | pool types (floor, `watch`, member payload, holder, strikes); the floor, eviction, and bound paths in `Pool.ts`; pool tests and guide; pool's contract re-pin; the worker re-pin for `PoolOptions` and `PoolEventMap`; browser adds the `@orkestrel/pool` runtime dependency | `@orkestrel/pool`, then `@orkestrel/worker`, then `@orkestrel/browser` | none | none |
| Separate package in this change | the repository from scaffold; types, engine, tests, guide, README, and parity; the scaffold guide mirror; browser adds the dependency | the separate package's first release, then `@orkestrel/browser`; scaffold carries the mirror at its next release | none | none |

Deferring is cheaper only if the trigger never fires, or if probe's design changes the shape enough to save a redesign at the destination.

## Alternatives

The alternatives lose for these reasons:

- **Expand `@orkestrel/pool` in this change.** It loses because pool, then worker, then browser must publish before D1 and D2 ship (`status.md:12`). It also generalizes the holder from a consumer whose holder never varies (`proposal-server.md:85`).
- **A separate package in this change.** It loses because its shape (pool with leases, or supervised singleton) would be decided before probe item 1 shows which half is shared (`Probe.ts:137-158`).
- **Slots kept as private fields of `BrowserMCPServer`** (`proposal-server.md:223-235`). This is smaller for `browse` alone. It loses because extracting it later would be a rewrite, not a move.

## Constraints

- `Pool` creates only for a queued waiter: `pool/src/core/Pool.ts:263-290`. Its constructor creates nothing: `Pool.ts:65-80`. Release recycles with no validate: `Pool.ts:470-483`.
- Pool's events carry empty payloads (`pool/src/core/types.ts:35-44`), and its token has no holder (`types.ts:50-58`). The guide states there is no warm floor: `scaffold/guides/pool.md:7-9`.
- Only `@orkestrel/worker` declares pool (`worker/package.json:89`). The worker re-exposes `PoolOptions` (`worker/src/core/types.ts:2`, `:75`) and passes `on` through (`Worker.ts:80-89`).
- Pin mismatch: pool pins `@orkestrel/contract` `^0.0.18` (`pool/package.json:72`), browser pins `^0.0.19` (`browser-wt-browse/package.json:105`). Browser does not declare pool (`package.json:105-113`).
- The server barrel exports every type (`src/server/index.ts:1`). `INTERNAL` is at `tests/guides.test.ts:34-45`, and its barrel check at `:432-435`.
- Browse launches one session on the first call: `BrowserMCPServer.ts:85-88`, `:199-209`.
- Laws: `AGENTS.md:45`, `:64`, `:65`, `:66`, `:67`, `:68`; `architecture.md:48`, `:307-308`, `:311-312`, `:318`; `quality.md:49-51`; `documentation.md:25`, `:33`.

## Refusals

These options are closed by a rule or by a user ruling:

- **`@orkestrel/supervisor` and `@orkestrel/process`'s `Supervisor`.** Closed by the user's ruling (`design-brief.md:8`).
- **Re-exporting the extracted engine from browser.** "Never re-export a symbol originating in another package; fix consumer imports to the originating package." (`architecture.md:276`)
- **Keeping browser's engine beside the extracted one.** "No compatibility shims. Update every consumer in the same change." (`AGENTS.md:66`)
- **A browser class that renames pool's class after extraction.** "never wrap one to rename it" (`AGENTS.md:45`)
- **Listing the engine's types under `INTERNAL`.** "Every declaration in a centralized file is exported." (`architecture.md:51`), and the barrel check at `tests/guides.test.ts:432-435` enforces it.
- **A member record type in `BrowserPool.ts`.** "It contains no module-scope interface, type, constant, or free function" (`architecture.md:48`)
- **A liveness timer in the engine.** "No polling/busy loops ... Park idle work on an event/abort wakeup" (`architecture.md:318`)

## Measurements

**Readings supplied.** The only readings are from `ws-endpoint-probe` (2026-10-03, loaded host, preliminary): a headless-shell launch of 80.5 ms, and provider setup falling from a 99 ms median cold to 26.5 ms connected (`status.md:19`). They cover test scripts, not `browse`, and say nothing about placement.

**Readings missing:**

- D3's spare value (`proposal-server.md` M3 and M4). It decides whether the lease half does work in `browse`.
- Probe item 1's mapping of each stage onto the engine hooks. This is the trigger's evidence.
- Any recorded cost of a worker thread that dies while idle. It is found only at the next validate (`resource-consumers.md:39`), and no defect is recorded.

## Units

**U1: the engine.**

- **Role and engine:** `astra`. It is a concurrency engine, so it gets one review by a reviewer who did not write it.
- **Owns:**
  - `src/server/types.ts` (one block) and `src/server/constants.ts` (`BROWSER_POOL_STRIKES`);
  - `src/server/errors.ts` (codes, per Tensions) and `src/server/BrowserPool.ts`;
  - `tests/src/server/BrowserPool.test.ts`, `tests/guides.test.ts` (the `INTERNAL` row), `.oxlintrc.json` (one override), and `guides/browser.md` (type rows).
- **Depends:** none.
- **Spec:**
  - The constructor checks `size` and `strikes` inline as positive safe integers.
  - `start()` creates members serially and resolves when member 0 is `ready`. If member 0 fails, it destroys everything and rejects with code `start`.
  - `watch` is attached after each `create` resolves.
  - A fault bumps `generation` synchronously, aborts a lease's `signal` with code `lost` and the cause, and clears its holder. It strikes only an unleased member, calls `destroy(value)`, and re-creates after that settles. It retires the member at `strikes`.
  - Granting a lease resets the member's strikes.
  - `acquire({ holder, signal })` never creates. It serves FIFO waiters with the longest-ready member and runs `validate` at handoff. A failed `validate` counts as a strike and moves to the next member. It rejects with code `retired` when no member remains.
  - `destroy()` is one barrier. It aggregates failures and emits `destroy` last.
  - No timer exists anywhere in the engine.
- **Accept:** inert resources from a recording `create`, for each of these cases:
  - size 2 creates in order;
  - `acquire` calls no `create`;
  - an idle death gives one `fault` naming the member, one `destroy`, a re-create after it settles, and one strike;
  - a leased death aborts the lease with `lost`, counts no strike, and clears the holder;
  - two unleased deaths in a row retire the member;
  - a failed `validate` hands out the next member;
  - a stale `release` is a no-op;
  - `destroy` destroys every live value once, rejects waiters, and creates nothing afterwards.

  The lint control: a scratch `./Browser.js` import in `BrowserPool.ts` fails `npm run lint:check`, and the `src/server/**` restrictions still refuse there. Revert the scratch afterwards.
- **Run:** `npx vitest run --config vite.config.ts --project src:server tests/src/server/BrowserPool.test.ts`, `npm run test:guides`, and `npm run lint:check`.

**U2: browse on the engine.**

- **Role and engine:** `astra`.
- **Owns:** `src/server/BrowserMCPServer.ts` and its tests.
- **Depends:** U1 and the `Browser` `endpoint` and `ping` unit.
- **Accept:** the accepted design's real-Chromium proofs, and `BrowserMCPServer` holds no member state beside the engine and its lease.

**U3: the roadmap entries.**

- **Role and engine:** `opus`.
- **Owns:** `browser-wt-browse/ROADMAP.md` (item 13) and `probe/ROADMAP.md` (the sentence appended to item 1).
- **Depends:** U1.
- **Accept:** every cited path exists; the number is above every number used in the merged main file; and a case-insensitive sweep of both items for `should`, `now`, `new`, and `just` comes back clean.

## Tensions

- **Destination merge.** Into pool, the engine merges into `Pool.ts`, and only the contract and tests move. Rule whether to write the engine against pool's vocabulary in this change.
- **Names.** `BrowserPool` for an engine that is generic over `T`; `size` against pool's `max` plus a floor named `min`; `validate`; and `acquire(options)` against `acquire(signal)`.
- **Error class.** `BrowserError` codes, which need a `@src/core` import, against an error class shaped like pool's `PoolError` (`code`, `cause`, `context`).
- **Warm-up order.** Serial (`proposal-library.md:100`) or concurrent (`proposal-server.md:94`). This is not a placement question, and U1 assumes serial.
- **Trigger evidence.** Whether a supervised singleton in probe triggers extraction on its own, and whether worker counts without a recorded defect.

## Risks

- **Probe builds a second engine by hand,** as `#recycle` shows the habit (`Probe.ts:536-575`). The pointer in probe item 1 is the guard.
- **Browser terms creep into the engine** and turn the move into a rewrite. The lint override and the inert tests are the guard.
- **Extraction removes public types from `@orkestrel/browser/server`.** That breaks any outside importer (`src/server/index.ts:1`).
- **Browser publishes twice,** at this change and at extraction.
- **The worker's gap stays open:** a thread that dies while idle is found late (`resource-consumers.md:39`).
- **The item number can collide.** The worktree's `ROADMAP.md` lacks items 9 to 11 (`browser-wt-browse/ROADMAP.md:3-6` against `browser/ROADMAP.md:3-9`), so choose the number against the merged file.