# Contexts proposal — planner lane (Opus 5.5), 2026-10-05

Read-only planner over `contexts-design-brief.md`; subjective lane (shape, names, bounds, ergonomics, guide voice). Citations checked against browser `main` and pool 0.0.15.

## Rulings

1. **Unit and bounds.** A pooled browser is a process with its profile; a holder is one isolated CDP context on one browser with one page and one started toolset (a "seat"); the shared holder is a seat that ends only with the server. `BROWSE_POOL` keeps meaning the number of warm browsers (now failover and process isolation, not capacity); a new `BROWSE_HOLDERS` bounds the holders `acquire` admits across all browsers, the shared seat not counted; `0` means shared-only (0.0.24 at size 1), and `BROWSE_POOL=2` with `BROWSE_HOLDERS=0` is D10's hot spare. Library option `pool: { size, holders }`; constants `BROWSER_SERVER_HOLDERS` and `BROWSER_SERVER_HOLDER_LIMIT`; out of range answers `BROWSER_SERVER_OPTIONS`, a malformed variable `BROWSER_SERVER_ENVIRONMENT`. At `BROWSE_POOL=1`, `acquire` succeeds up to `BROWSE_HOLDERS` on one browser.
2. **Assignment.** Fewest seats wins (the shared seat counted), ties to the earliest-warmed browser, the same rule at `acquire`, re-seating, and setup; no rebalancing; a pure tested `selectBrowserSlot(slots, seats)`; seat counts derived.
3. **Browser crash.** Every seat on it is lost; the owner token is destroyed once (owing a refill); each holder keeps its id and gets one `BROWSER_SERVER_CRASH:` note; re-seating is eager onto a live browser (none on the call path at size 2; at size 1 every holder shares the refill wait); strikes stay per browser; a seat failure is never a pool strike.
4. **Turnover.** `destroy` runs `toolset.destroy()`, then `context.close()` (which sends `Target.disposeBrowserContext`, `BrowserContext.ts:376-381`), then removes the seat's downloads folder; never `context.destroy()`, which keeps the remote context and makes a later `close()` dispose nothing (`BrowserContext.ts:160-176`). Downloads move per holder to `ROOT/.profiles/PID-UUID/downloads/HOLDER_ID/` through `isolate({ downloads })`. A browser is recycled only on loss or at server end until a turnover soak says otherwise.
5. **Liveness.** A browser watch (`disconnect` into the pool's `watch`, the ping at hand-out and after a failed call) and a seat watch: a crash of the holder's current page closes that context, notes, and re-seats that holder only, leaving the browser and its other seats; a background tab crash is not a loss.
6. **Isolation.** The guide states the isolation matrix as proved facts (cookies, localStorage, sessionStorage, IndexedDB, Cache Storage, service workers, permission overrides, downloads) and what seats share (process, CPU, memory, crash domain); the matrix is the objective lane's.
7. **Pool shape.** `Pool<BrowserSlot>` of browsers stays, browse holding every token for the server's life; browse owns seats, assignment, and admission; `@orkestrel/pool` gains nothing this round.
8. **Throttling and tabs.** One page per seat; each seat's page must report visible and an animation-frame-waiting click must succeed with every seat busy, headless and headed; tabs within a holder stay as they are with the hidden-tab throttle stated as a limit, focus emulation a later item.
9. **Measurement.** M1 at library level before any constant (browsers against contexts at rising holder counts, repeats from the pilot spread, wall and tails, peak and idle private memory, CPU, processes, acquire and destroy latency, a turnover soak, holders lost per kill and loss-to-success at 1 and 2 browsers, the isolation matrix, ticks per seat; quiet and under the `test:src:core` loop); M2 with the H6 instrument at the ruled defaults and their neighbours. Rule: `BROWSER_SERVER_HOLDERS` is the largest count at one browser that beats one fewer by more than the spread with the load passing; the limit is the largest count M1 covered; `BROWSE_POOL` stays 1 unless the user accepts an idle browser's cost for the measured failover gain.
10. **Units.** M1 (instrument, Astra; Orchestrator runs), C1 seats in browse (Astra; Opus review on the concurrency seam), C2 real-Chromium proofs (Astra), C3 guide and roadmap (Opus), M2 confirmation, release. The wire contract is unchanged; only the `acquire` and `destroy` descriptions change.

## Type sketch

`BrowserSlot { browser, profile }`; `BrowserSeat { slot, context, toolset, downloads }`; `BrowserSlotWatch`, `BrowserSeatWatch`; `BrowserMCPServerOptions.pool { size, holders }`; `BrowserServerHolder { id, purpose, abort }`; `BrowserServerMirror { seat, added, removed, cleared }`.

## Alternatives rejected

Re-meaning `BROWSE_POOL` as holders (silently changes existing configurations); a per-browser seat cap (fewest-seats already bounds the steady state; no measured basis); packing one browser first (browsers are warm anyway; one crash domain); shared leases in `@orkestrel/pool` (the context lifecycle stays in browse; breaks `PoolToken.destroy`; no second consumer); two pools (coupled floors and strikes); tabs as holders (throttled, no clean slate); destroying the browser on holder end (kills co-hosted holders; 1.5 to 1.8 s against 0.24 to 0.37 s); downloads outside the profile; recycling after a fixed count; a programmatic holder API.

## Tensions and questions for the user

- Q1 `BROWSE_HOLDERS` excludes the shared seat (recommended) or includes it as 0.0.24 counted.
- Q2 a total bound only (recommended) or a per-browser `BROWSE_SEATS`.
- Q3 `BROWSE_POOL` keeps "number of browsers" (recommended) or is re-meant as holders.
- Q4 no warm seat, `acquire` creates the context and M1 measures its latency (recommended), or one warm seat per browser.
- Q5 publish `e931740` as browser 0.0.25 now and ship contexts after M2 (recommended), or fold it into the contexts release.
- Objective-lane questions: a failed context creation on a pingable browser; a rejected `disposeBrowserContext` leaking a live context; what an off-the-record context leaves in the process; whether each context's first target stays foreground; whether a hung renderer needs a page-level ping. The name `BrowserSeat` is open if "seat" reads as a metaphor. This round supersedes `synthesis.md`'s "an ended holder destroys its browser"; the clean-slate ruling stands and the C2 proofs must back it.

## Risks

Disposal order (pinned by a `Target.getBrowserContexts` assertion); a wider blast radius at size 1; a silent capacity change for existing `BROWSE_POOL=3` configurations (stated in the guide); seats concentrating on a survivor after a loss; visibility unproved for concurrent context pages (the C2 visibility case gates the release).
