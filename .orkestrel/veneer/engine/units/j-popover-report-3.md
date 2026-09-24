# J-POPOVER round 3 — the writer's report (opus on Opus 5.5, native; retained from its final message, 2026-09-24)

The door-stop release is deleted and every gate is green. `#build` returns the moved elements from a `catch` that rethrows; the `filled` flag is gone; a comment where the stop paths return states that destruction, the only takeover inside a build, returns those elements itself. Both throw rows still redden their named case, the destruction row still reddens the round-2 case, and the acceptance chain reads 813 of 813 browser tests.

`#build` this round (against `tmp/j-popover/Tooltip.round2.ts`): `let filled = false`, `filled = true`, and the `finally { if (!filled) this.#release(…) }` removed; `catch (error) { this.#release((_element, slot) => !tip.contains(slot)); throw error }` added, with the comment "A content write or the sanitizer that throws leaves the tooltip live, so the build returns every element it moved into the unfinished tip before the error propagates". The class TSDoc sentence "A build that stops returns every element it moved into the unfinished tip" stays true through destruction's release.

Rings: `Tooltip.test.ts` 57 of 57; Popover, Placement, and Dropdown 64 of 64.

Instrument (`tmp/j-popover/mutations.py`, round-3 successor, retained as `j-popover-mutations-3.py`, log `j-popover-mutations-3.log.txt`): both throw rows re-anchored to the `catch`; the two door-stop controls removed with their path; one run, every mutation row EXACT or JOINED, no MISSED or error row, `receipt: restored byte for byte`. "The build releases nothing it moved into an unfinished tip" EXACT; "a throwing step stops the build without releasing" EXACT; "destruction releases nothing" JOINED (6 failed of 57, the round-2 case named); control "the dropdown reads no owner door" HELD. Green: Popover 9, Tooltip 57, Placement 20, Dropdown 35, helpers 61, validators 32, index 3.

Acceptance (run once after the instrument): Chromium 153.0.8010.12; typecheck, lint, format exit 0; `test:src:browser` 813 of 813; guides 20; policy 109 and 1 skipped; the three builds; conformance 26; setup 319; `check` exit 0.

Status: `M` guides/veneer.md, Placement.ts, Tooltip.ts, constants.ts, index.ts, types.ts, validators.ts, Placement.test.ts, Tooltip.test.ts, index.test.ts, validators.test.ts; `A` Popover.ts, Popover.test.ts. `git diff --stat`: 13 files, 1433 insertions, 409 deletions. Deviation state: none; no shared-file patch; no `types.ts` change this round.

The Orchestrator's replay (`j-popover-mutations-3-orchestrator.log.txt`) re-ran the rows rounds 2 and 3 changed ("releases nothing", "throwing", "owner door", "dispatch reads no container", "supplies no door"): every row EXACT or JOINED, the Dropdown control HELD, every source restored byte for byte by the Orchestrator's own digest.
