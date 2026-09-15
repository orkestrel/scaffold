# P8 — re-entry probe against the U8b ToolManager emitter (Orchestrator, 2026-09-15 09:06Z)

Instrument: `tool/tmp/probe/ToolManager.test.ts` (retained beside this file), run as `npm run test:probe -- tmp/probe/ToolManager.test.ts` in the tool checkout on the U8b working tree.

Reading: 3 failed, 1 passed.

- `replacement reentry preserves publication consistency` — FAILED: a `remove` listener that removes the name mid-replacement leaves `add` published for an instance the registry no longer holds (`seenInAddListener` undefined). A8 analyst claim 2 is BROKEN.
- `replacement without reentry is consistent (control)` — passed.
- `destroy finishes with an empty registry` — FAILED: a `clear` listener re-adding during `destroy` leaves `count` 1 with the emitter destroyed. A8 analyst claim 3a is BROKEN.
- `destroy prevents subsequent listener delivery` — FAILED: a sibling listener runs after a listener destroyed the manager mid-emit (`destroyedWhenRan` true). This is the emitter package's synchronous snapshot fan-out; ruled a documentation fact for `ToolManager`, not a defect to code around (A8 analyst claim 3b).
