# Eager `browse`: the design of record

The ruled design is `pool-design-3.md`, the third round of the revise-and-attack loop over `@orkestrel/pool` 0.0.14 (2026-10-03), on the user's decisions D1 to D13 in `design-brief.md`. `browse` composes one `Pool<BrowserSlot>` (`min` equal to the size, `restarts` set to `BROWSER_SERVER_RESTARTS`) and supplies only policy: what a slot is and how it is built and torn down, what counts as a loss, the session's one held lease, the operation-lifecycle texts, the handshake gate (`@orkestrel/mcp` 0.0.36), the profile record and the sweep, `BROWSE_POOL`, and logging. The browse-side layer of `revision-3.md` (W1 to W8) is not built.

Its last attack (`pool-design-3-attack.md`) read the pool at `9e316a1` and held every row of the design's pool table line for line, the ceiling, the launch counts, the V4 cases, a failed per-call ping racing a watch loss, the one-turn close, the handshake, and the pins; it failed one required item. The earlier rounds' P-1 (an acquire parking forever on a blocked floor) is fixed in pool `445a4ba`. The Orchestrator rules the remainder into the units:

- **Required 1 → U7.** "Missing executable after start" runs at size 1 (at size 2 the next call takes the spare), names how the executable goes missing after start on each host, and marks the hosts it cannot reach `NOT-EVIDENCED`.
- **A2.** `#hold` refuses a slot `browse` already recorded as lost: it calls `token.destroy()`, leaves `#lease` unset, and refuses; add the U7 case that kills the double from inside a `version` handler's continuation, and state in the design the event-order invariant that keeps it from arising today.
- **A3.** A pending loss note is never overwritten; the note carries every pending loss; add the U7 case.
- **A4.** `UNAVAILABLE` renders through `describeBrowserServerLoss`, so it names the pid where the error carries one.
- **A5.** A hook-time `rm` failure stays out of `#faults` while its folder is still recorded; only the shutdown recheck's failure reaches `destroy()`.
- **A6.** The sweep removes the folder of a parsed record whose pid `probeProcess` reports gone, with a U6 case.
- **A7.** The V5 case reads the launch count before `release()` and asserts the later refill as T2's effect.
- **A8.** Log writes use the write callback and add its error to `#faults`; browse never listens on a stream the host supplies; widen the U6 log case to a destroyed stream.
- **A9.** A failed `browse.json` write or rename fails the warm (the slot tears down and strikes), so no folder ever runs without its record.
- **A10 / T4.** A spare that fails is reported: each failed warm runs `browse`'s own `create`, which logs it, and the spent floor is reported when the next acquire rejects with `create`. No user ruling is needed.
- **A11.** The probe roadmap sentence states that probe's `destroy` hook carries the stage deadline (a destroy hook that never settles blocks every replacement).
- **A12.** `#serve` rethrows the call's own abort reason; cite `MCPLegacy.ts:117-119` and `helpers.ts:1883` for the stdio path.
- **A13 (2026-10-04, from U6's first attempt).** The killed-server case (X-10) is host-conditional by the launch's process model: `spawnBrowserProcess` detaches only off Windows (browser `src/server/helpers.ts:431`), so on Windows libuv's kill-on-close job ends the browser with its Node server, which answers M6 for `SIGKILL` and `TerminateProcess` on that host (measured on Windows with Edge, 2026-10-04: the recorded browser was alive before the kill and gone before the replacement started). The case branches on that condition; the sweep's live-record branch is proven on every host by a synthesized orphan (a test-owned browser recorded under an exited server pid).
- **U2 port probe (2026-10-04, from `eager-base`'s first attempt).** The explicit-port case guards that the gate keeps the probe; its red removes the probe call. The unset-port branch stays T11.
- **Referred (subjective):** fold `#race(promise, signal)` into a shared helper with `Browser.#raceAbort` if the leaf test in `architecture.md` § Functions and orchestration admits it.
- **Pool assumptions the units pin:** the five behaviors the attack lists under Findings (the owed credit spent by any refill, `start()` resolving only with no refill running, a fulfilled late watch ignored by `#lose`'s guards, `#refill` arming a watch after `#ending` and relying on `#recycle`, a failed validation striking only a never-leased record); a pool change to any reruns U6 and U7.

The Windows helper processes the service diagnosis found outliving their browsers (`../../showcase/browse/service-flakes/findings.md`) bear on the sweep: the units measure whether `browse`'s teardown leaves any, and report them.

## Release order

The user chose (2026-10-03) to hold `@orkestrel/mcp` 0.0.36 and `@orkestrel/pool` 0.0.14 until the eager build consumes them. The build stages both as local tarballs (`npm install --no-save`, per the release contract's rule for an unpublished dependency) on a branch from browser `main` after release 0.0.22. Then `@orkestrel/mcp` 0.0.36 and `@orkestrel/pool` 0.0.14 publish, `@orkestrel/browser` re-pins them and ships 0.0.23, and `@orkestrel/probe` gains its roadmap sentence.
