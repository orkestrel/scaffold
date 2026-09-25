# J-SAMEWAY round-3 audit — the checker

## Role and engine

`checker` on Sonnet, a native read-only Claude subagent (Read, Grep, and Glob). Perform the assignment directly and spawn nothing.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, then the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-audit-claims-3.md`, then the writer's report `units/j-sameway-report-3.md` beside it.

## Subject

The snapshot of Veneer `e557bfe` at `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-sameway3-e557bfe/`, and the diff `units/j-sameway-3.diff` with its status `units/j-sameway-3-status.txt`. Read no other checkout.

## Focus

Rule mechanically on these three things only.

- **The D1 table against the source.** For every row of the report's four D1 tables (Modal show, Modal hide, Offcanvas show, and Offcanvas hide), find the write in `src/browser/Modal.ts` or `src/browser/Offcanvas.ts`. Confirm the entry name the table gives appears at that exit's `#rehide` or `#reshow` call, and that the returning step writes the return the table gives for that entry name. Then list every write in `show` and `hide` that no row names.
- **Claim 7.** Confirm the changed paths are exactly the five the report names. Confirm `types.ts` and `tests/setupBrowser.ts` are unchanged. Search the two sources for `#revert`, `BackdropInterface`, and the removed `backdrop` parameter name, and report each hit with its use.
- **The case titles.** Confirm that each case title the D1 tables quote exists in `tests/src/browser/Modal.test.ts` or `Offcanvas.test.ts`.

Rule on no behaviour and no prose.

## Output

- A table of D1 rows: engine, direction, write, found at `file:line`, entry at `file:line`, return at `file:line`, and match (yes or no).
- The writes no row names.
- Claim 7's reading.
- The case titles not found.
- One terminal line: `CHECK: PASS` or `CHECK: FAIL <items>`.
