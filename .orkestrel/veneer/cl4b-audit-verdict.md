# CL4b audit verdict — CL4's two carried proof obligations

Subject: unit CL4b in Veneer over the base `bc580c1` (the CL4 landing), written by `builder` on
native Sonnet under `units/cl4b-brief.md`. Report: `units/cl4b-report.md`. Claims:
`cl4b-audit-claims.md`. Evidence: `units/cl4b-diff.patch.txt`, `units/cl4b-status.txt`, and the
Orchestrator's own probe `units/cl4b-probe.sh` with `units/cl4b-plant.mjs` and
`units/cl4b-probe.log.txt`.

## Round 1 (2026-09-21)

Lanes, launched together and blind: analyst on Astra holding the OBJECTIVE lane
(`units/cl4b-audit-analyst-report.md`, thread `01a0c4b0-a077-7300-9d62-224a1af214e5`, exit 0; a
Sonnet builder wrote the unit, so neither lane shares the writer's engine and the lanes take
their default places); reviewer on Opus 5 holding the SUBJECTIVE lane
(`units/lane-cl4b-reviewer.md`, workflow `wf_ca97c924-a8a`); checker on Sonnet
(`units/lane-cl4b-checker.md`); verifier on Sonnet (`units/lane-cl4b-verifier.md`) over
`units/cl4b-gate-brief.md`.

| Claim | Analyst (objective, Astra) | Reviewer (subjective, Opus) | Checker | Verifier and probe |
| --- | --- | --- | --- | --- |
| 1 the border reset is pinned | CONFIRMED (every case is built through the mode map, and the proof reads every key for each mode) | CONFIRMED (the addition is purely additive, the proof derives its read set from the table, and the new keys use the vocabulary a sibling table already uses) | CONFIRMED | `test:src:styles` exit 0 |
| 2 the pin is falsifiable and isolated | UNDECIDABLE in full, isolation supported (see the correction) | CONFIRMED by construction (the mixin's emission is the only source of those three widths anywhere under `src/styles`) | report-only on the run, structurally sound | the Orchestrator's probe reddens exactly the three entries and restores green |
| 3 the control is independent | CONFIRMED (a hand-written expectation the table can disagree with) | CONFIRMED (transcription checked entry by entry against the table, complete and in order) | CONFIRMED (checked element by element) | — |
| 4 the control catches a rename | CONFIRMED (the section reads names from the table, so both existing assertions move together) | CONFIRMED by construction (the literal is the only assertion in the file a rename can break) | report-only on the run, structurally sound | the probe reddens the new assertion alone and restores green |
| 5 nothing shipped moves | CONFIRMED | CONFIRMED | CONFIRMED | — |
| 6 scope, law, gates | CONFIRMED on scope and law; gate half UNDECIDABLE | CONFIRMED on scope and law; gate half UNDECIDABLE | CONFIRMED on scope and law; gate half UNRESOLVED | every step exit 0, both Edge runs green, status identical before and after |

Reconciliation. Every claim's substance is CONFIRMED by every lane that could rule on it. Two
open items are closed here rather than sent back.

- **The gate half.** Three lanes ruled it undecidable because each ran blind and none could see
  the verifier's record. The verifier lane ran the whole chain over this unit's tree, including
  `npm test`, both Edge runs, the journeys, and the scaffold audit, with the status identical
  before and after. The checker's terminal line asks for exactly that dispatch, so its fix-round
  call is discharged by the round's own verifier rather than by a further round.
- **The mutation runs.** No lane could re-execute them, so the Orchestrator took the readings
  itself after the unit exited and before the landing, through `units/cl4b-probe.sh`. Dropping
  the mixin's border emission while keeping the margin and the colour reddens exactly
  `border-inline-start-width`, `border-inline-end-width`, and `border-block-end-width`, with the
  margin, the block-start width and style, and the opacity matching in the same object; restoring
  it passes. Renaming the first specimen reddens the new literal assertion alone; restoring it
  passes. The probe's final status lists only the unit's two owned files.

**The Orchestrator's own defect, the second of this class.** Claim 2 said the red run leaves the
colour passing. The analyst lane refuted that: `tests/src/styles/elements/hr.test.ts:23` reads
the colour after the object assertion, so a failing object assertion aborts the case and the
colour never runs. The Orchestrator's probe confirms the lane. The honest statement is that
within the object assertion only the three new entries differed, and the colour assertion's state
in that run is unknown. **The rule this establishes:** a claim about what a failing run left
passing is a claim about assertions that may never have executed, so state only what the failing
assertion itself reports.

Findings:

- **Reviewer 7 (carried to CL5).** The markup assertion still has no independent control.
  `tests/app/browser/sections/ContentSection.test.ts` compares rendered markup against the
  specimen table's own `markup` values, and the tag sequence controls element names alone, so
  changing an attribute value or a code sample's text inside a specimen leaves every assertion in
  the file green. CL4's verdict stated the obligation as the name **and markup** assertions, and
  CL4b's brief scoped it to names, which the unit closed exactly. **The under-scoping is the
  Orchestrator's, not the unit's.** CL5 owns that file and carries this.
- **Reviewer 8 (observation).** The new literal control sits between the two rendered-versus-table
  comparisons while the file's existing control sits after its subject, so the case now places
  its two controls on opposite sides of what they control. The brief granted the unit that
  choice and the assertion is correct where it stands. Recorded for the next unit that edits the
  case.

### Findings carried out of CL4b

1. Reviewer 7: an independent control for the content section's markup assertion, to CL5, which
   owns that file.

### Terminal (round 1)

Verdict: accept. CL4b lands at this tree.
