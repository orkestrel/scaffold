# J-SAMEWAY-ENGINES-B audit — the checker

## Role and engine

`checker` on Sonnet, a native read-only Claude subagent (Read, Grep, and Glob). Perform the assignment directly and spawn nothing.

## Read first

`C:/Users/mikes/WebstormProjects/scaffold/AGENTS.md`, then the claims file `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-sameway-engines-b-audit-claims.md`, then the writer's report `units/j-sameway-engines-b-report.md` beside it.

## Subject

The snapshot of Veneer `b8a8805` at `C:/Users/mikes/AppData/Local/Temp/claude/C--Users-mikes-WebstormProjects-scaffold/ae9013d2-d803-4f77-889d-b615fd892f79/scratchpad/snapshot-engines-b-b8a8805/`, with the diff `j-sameway-engines-b.diff` and the status `j-sameway-engines-b-status.txt` beside it. Read no other checkout.

## Focus

Rule mechanically on these three things only.

- **The B4 tables against the source.** For every row of the report's B4 tables (Dropdown show, Dropdown hide, Tooltip and Popover show, and Tooltip and Popover hide), find the write in `src/browser/Dropdown.ts`, `Tooltip.ts`, or `Popover.ts`. Confirm the entry the table gives is recorded at that exit, and that the returning step (`#rehide` or `#reshow`) writes the return the table gives. Then list every write in `show` and `hide` that no row names.
- **Claims 6 and 9.** Confirm that the status lists exactly the eight unit paths plus `src/browser/types.ts` and `guides/veneer.md`. Confirm that the three test files hold no door or reversal table this unit wrote, and that no exported table in `tests/setupBrowser.ts` uses `'none'` for absence. For each private method and field the diff adds, report whether it has a use.
- **The case titles.** Confirm that each case title the B4 tables quote exists in its test file.

Rule on no behaviour and no prose.

## Output

- A table of B4 rows: engine, direction, write, found at `file:line`, entry at `file:line`, return at `file:line`, and match (yes or no).
- The writes no row names.
- The reading of claims 6 and 9.
- The titles not found.
- One terminal line: `CHECK: PASS` or `CHECK: FAIL <items>`.
