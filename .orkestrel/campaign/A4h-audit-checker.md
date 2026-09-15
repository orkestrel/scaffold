<!-- A4h — checker (Sonnet, native), mechanical lane over A4h-u4k-only.patch.txt and the U4k report, with the chain walk. Retained from the completion notification, 2026-09-15 (50 s, 13 tool uses). -->

VERDICT (checker, MECHANICAL lane):

1. CONFIRMED — `finally` wraps prune in both callers: `ModelContext.ts:276-280` (`#sync`), `:289-293` (`#publish`); `kept` built from projections at `:389`; `#destroyed` read moved to `#prune` entry `:388`.
2. CONFIRMED — `refuse(name)` fixture member added (`tests/fixtures/modelContext.ts:214`, `:249-255`), rejecting inside `registerTool` (`:224-226`); pin `releases what the manager dropped when a registration fails` (`tests/src/browser/ModelContext.test.ts:265-287`); the report's red reading against the live U4j tree (SHA-256 `c373ff768f72fd2d`, matching P16's control-baseline hash) is a distinct control from P16's, and recovery is asserted at lines 280-286.
3. CONFIRMED — recorder added at `ModelContext.test.ts:297`, asserting `change` count 1 for a registered-name release and 0 for a never-registered addition (`:313`, `:321`); the `describeWebMCPTool` sentence at `types.ts:508-509` and `guides/mcp.md:4098-4101` reads "answers `undefined` for a name `definitions()` still lists" verbatim.
4. CONFIRMED — `#prune` comment (`ModelContext.ts:370-383`) states "still releases the names it dropped" and "kept is read from the projections rather than from the registrations"; `types.ts:499-500` reads "releases"; `destroy` clears `#pendingManager` at `ModelContext.ts:190`.
5. CONFIRMED — `A4h-u4k-only.patch.txt` touches exactly `guides/mcp.md`, `src/browser/ModelContext.ts`, `src/browser/types.ts`, `tests/fixtures/modelContext.ts`, `tests/src/browser/ModelContext.test.ts`; no new export introduced; `collide3-mcp-after-u4k.txt` reports `collisions: none` over 469 export names, 98 files.
6. CONFIRMED — P16's Control A and Control B reproduce the writer's cited red readings (byte-identical SHA-256 `c373ff768f72fd2d` before and after), closing A4g analyst claims 2 and 3.
7. CONFIRMED — every FAIL from A4 through A4g closes: A4-P9→U4c/d/f; A4b-P11→U4f; A4c-P12→U4g; A4d-P13/P13b→U4h (plus the A4d-O generation-exemption ruling); A4f-P14→U4j; A4g analyst FAIL 2,3→P16, and FAIL 4,9 plus reviewer F9-F12/R7 close in this round's carriers 2-4. R8 (the `describe*` naming) is carried to a design round per A4g-reviewer's own record. `U4-chain-audit-verdict.md` records the round-level lane substitutions with their reasons, closing R9.
8. Outside the mechanical lane's scope — a shipping decision.

outside: none — chain closed on the mechanical evidence.

VERDICT: PASS
