# E-ID-ANCHOR audit round 3 — verdict

The Orchestrator's reconciliation of the check of E-ID-ANCHOR round 3 (`anchor-audit-3-claims.md`): `analyst` on GPT-6
Astra (`anchor-audit-3-objective-verdict.md`, thread `01a0d7dd-2ca7-7761-9004-886a8f5d1860`) on the Orchestrator's
text, and `checker` on Sonnet (`anchor-audit-3-checker-lane.md`) on the Items, with the Orchestrator's measurement of the
column widths appended there. The round checks the Orchestrator's own text, and Astra wrote none of it.

**Verdict: FAIL 2; outside the claims: F-RESTORATION-RECORD.** The Items, the tooltip and popover text, the mixin
comment, the plants' assertion failures, the gates, and the column widths hold (claims 1, 3, 4, 5; checker PASS).

- **Claim 2, the Orchestrator's error.** "when a pointer press on the toggle opened the menu" is narrower than the
  evidence: in `V.clip.dropdown` the click on the toggle does not open the menu, and the engine shows it afterwards
  (`engine/units/j-native-probe-3.test.ts`, around line 1045); the J-PLACEMENT-141 diagnosis names a trusted pointer
  press **before** the show. Round 4 states that condition at the three dropdown sites (`e-id-anchor-brief-4.md`).
- **F-RESTORATION-RECORD, accepted as a report defect.** `e-id-anchor-report-3.md` gives the unplanted mixin digest
  `abe6a891…` as each plant log's before and after, while each log records its planted digest at both ends
  (`edaefb70…` and `9c454441…`). Restoration stands on other evidence: the committed round-3 diff changes comment lines
  only in `src/styles/**` (claim 1, both lanes), so no planted declaration or selector remained. The report's digest
  table is corrected here; no rerun is needed.

## Carriers

`e-id-anchor-brief-4.md` (`builder` on Sonnet, over `ebce3fe`) carries claim 2. F-RESTORATION-RECORD is closed by this
verdict.
