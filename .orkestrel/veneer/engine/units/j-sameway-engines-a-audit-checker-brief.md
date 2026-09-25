# J-SAMEWAY-ENGINES-A audit — the checker

## Role and engine

`checker` on Sonnet, a native read-only Claude subagent (Read, Grep, and Glob). Perform the assignment directly and spawn nothing.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, then the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-a-audit-claims.md`, then the writer's report `units/j-sameway-engines-a-report.md` beside it.

## Subject

The snapshot of Veneer `7511b82` at `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-engines-a-7511b82/`, with the diff `j-sameway-engines-a.diff` and the status `j-sameway-engines-a-status.txt` beside it. Read no other checkout.

## Focus

Rule mechanically on these three things only.

- **The A4 tables against the source.** For every row of the report's A4 tables (Collapse show, Collapse hide, Toast show, Toast hide, Tab show, and Carousel slide), find the write in `src/browser/Collapse.ts`, `Toast.ts`, `Tab.ts`, or `Carousel.ts`. Confirm the entry the table gives is recorded at that exit, and that the returning step (`#rehide`, `#reshow`, or `#rewind`) writes the return the table gives. Then list every write in `show`, `hide`, or `slide` that no row names.
- **Claim 8.** Confirm that the status lists exactly the eight unit paths plus `src/browser/types.ts` and `guides/veneer.md`. Search the four sources for `#writeTriggers` and `#select`, and report each hit. For each private method and field the diff adds, report whether it has a use.
- **The case titles.** Confirm that each case title the A4 tables quote exists in its test file.

Rule on no behaviour and no prose.

## Output

- A table of A4 rows: engine, direction, write, found at `file:line`, entry at `file:line`, return at `file:line`, and match (yes or no).
- The writes no row names.
- Claim 8's reading.
- The titles not found.
- One terminal line: `CHECK: PASS` or `CHECK: FAIL <items>`.
