# Review evidence — F5e SETUP-CONVENTION (working tree over `a162c91`, captured 2026-09-22 after the Orchestrator's serial patch)

The status output (`git status --porcelain`; the renames are staged as renames):
`/home/user/scaffold/.orkestrel/veneer/units/f5e-status.txt`.

The diff against HEAD with rename detection: `/home/user/scaffold/.orkestrel/veneer/units/f5e.diff`. It includes
the Orchestrator's serial patch of the two TSDoc lines in `tests/setupBrowser.ts` that the unit
reported as its one deviation (the file was off-limits to the unit).

The unit's report: `/home/user/scaffold/.orkestrel/veneer/units/f5e-report.md`. Its brief:
`/home/user/scaffold/.orkestrel/veneer/units/f5e-brief.md`.

The Orchestrator's gate log: `/home/user/scaffold/.orkestrel/veneer/units/f5e-gates.log.txt` (copied when it
completes; absent means not yet complete).

The base for the export comparison: `git show a162c91:<path>` in `/home/user/veneer`.
