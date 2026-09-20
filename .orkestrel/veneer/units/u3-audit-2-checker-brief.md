# U3 audit round 2 — checker brief

## Role and engine

`checker` on native Sonnet, clean context. Mechanical conformance alone: file existence, names,
placement rows, control removal, scope honesty, parity presence. Perform the assignment directly
and spawn nothing. You edit nothing and run nothing; you have no write tools.

## Objective

Check the mechanically checkable claims of
`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/u3-audit-claims-2.md` — 1 (file presence and
the three pointers), 7 (module homes and case presence), 8 (the export set of
`tests/setupBrowser.ts` against the installed `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
export names), 10 (name sweeps: `palette-each`, `resetSpecimens`, `readBootstrapVariables`, the
lane-named cases, every `read*` export's meaning), 12 (every owned file against the placement
rows, listed one per line), and the scope-honesty half of 13 (`git status --porcelain` in the
Veneer checkout against the owned, granted, and integrated files briefs 4 and 5 name) — and
report each as `PASS` or `FAIL` with the exact site. Read the live tree at
`C:/Users/mikes/WebstormProjects/veneer` and the two reports
(`C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/u3-report-2.md`, `u3-report-3.md`)
for the file lists, never the reports alone.

## Output

A table `Claim | Check | PASS/FAIL | Site`, one row per check; then the placement table (owned
file, placing rule row); then one line naming any file the tree holds that no brief owns. No
verdict line, no process diary.
