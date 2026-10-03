# Eager `browse`: the design of record

The ruled design is `revision-3.md` (its own title reads "revision 4"), the third round of the revise-and-attack loop (2026-10-03) over the user's decisions D1 to D12 in `design-brief.md`. Its attack (`revision-3-attack.md`) held the ceiling under every ordering tried, the hand-out wake-ups, the closing races, the stdio handshake, the forced kill, the contract-copy ruling (no `@orkestrel/pool` release), and the operation-lifecycle semantics, and failed it on three required findings. The Orchestrator rules them into the units instead of a fourth design round:

- **Attack 1 → U1.** The HTTP session middleware decides the mint from the dispatch outcome recorded in `context.state`, never from the response body's framing, because `createMCPPostHandler` frames a 200 answer as an SSE `data:` event when the client accepts `text/event-stream` (`mcp/src/server/handlers.ts:74`, `:209-214`). U1 adds twins of case h with an SSE-accepting client, with and without a hook.
- **Attack 2 → U8.** The V4 acceptance loses the record through a ping on the `clear()` path (a `silent` spare whose hand-out ping times out) and on the validation path (a lease whose per-call ping a `version` handler rejects after the snapshot), so the watch is still armed when disposal begins, and asserts the three listener counts there.
- **Attack 3 → U8.** The "unmirror at loss" case cannot fail; drop its "fails without" claim and record `#unmirror` in `#lose` as hygiene no case observes.
- **Advisories 4 to 12** go to the unit that owns each file: bound a call that loses its lease twice in one `#serve` (refuse with the note instead of looping); derive `#mirrored` from `#lease`; route every `log` write through one catching method and keep a sweep folder whose record read fails with anything but `ENOENT`; give the watch promise a rejection path; build the sweep read-failure fixture as a mode `0o300` directory on POSIX, probed at runtime; emit SIGTERM from a later `end` listener; assert the orphan outlived its parent before the second `start()`; assert `destroy()` resolves in the silent-spare case; probe the host's `mkdir` error code before asserting it.
- **Referred to the subjective lane:** `formatBrowserServerLoss` becomes `renderBrowserServerLoss` (`names.md` § helper prefixes); the bound keeps the name `restarts` unless the guide finds a clash; the watch's listener map becomes a named type in `src/server/types.ts`, as `BrowserToolsetWatch` sets the precedent.

## For the user

D12 asked that the later move into `@orkestrel/pool` be a move, not a rewrite. The attack found that holds only in part: the warm floor, the watch, the loss, the bound, and the survivor rule map to the five pool members, but the hand-out path (`#promote`, `#spares`, `#change`) and the owner's acquire loop map to none of them, because Pool 0.0.13 hands out only to a caller's `acquire`. When the move happens (`probe` item 1 or a second consumer), that path is replaced by `pool.acquire()` with `validate` as the ping, which is a rewrite of the hand-out. The price of starting in `browse` on an unchanged pool is that rewrite.

## Release order

The design's release order names browser 0.0.22; that version carries items 11 and 12 and the reading change. The eager server ships in `@orkestrel/browser` 0.0.23:

1. `@orkestrel/mcp` 0.0.36 (U1), the user publishes.
2. `@orkestrel/browser` 0.0.23: U2 to U14 after release 0.0.22 lands, U15 gates, the user publishes.
3. `@orkestrel/pool`: no release.
4. `@orkestrel/probe`: a roadmap sentence only (U16).
