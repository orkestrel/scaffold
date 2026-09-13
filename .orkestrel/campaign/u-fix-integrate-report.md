# Integration report — u-fix-integrate

Ran on 2026-09-13 after the U-fix implementer returned `u-fix-report.md`.

- `npm run build` exit 0; `host.json` regenerated; the `guides/scaffold.md` digest moved to
  `bb6cb29f5304481b9be666c104d15cdf892d9754c70936bd928b820b66e58d61`, which the objective lane
  recomputed independently.
- `npm run test:config` exit 0 after the regeneration; before it the inventory case failed naming
  `guides/scaffold.md` stale, which is the reading `u-fix-report.md:44-45` records from inside the unit.
- Gate chain `final-verify2.sh`: every row exit 0, `final2.status.txt` and `final-verify2.log.txt`.
- Committed as `373d29e` with the unit's report. Diffstat retained at `tmp/evidence/u-fix.diffstat.txt`
  until the sweep; it names `host.json` beside the unit's owned files.

Defect in the record: this pair was written after the fix-round audit flagged its absence, not at
dispatch. The U-fix-2 integration writes its pair before it runs.
