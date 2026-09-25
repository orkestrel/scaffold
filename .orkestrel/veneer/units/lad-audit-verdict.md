# LEDGER-ADDITIONS audit — verdict

The Orchestrator reconciled this round on 2026-09-25. Both lanes ran on `lad-audit-claims.md`, blind to each other.

- **Objective lane:** `analyst` on GPT-6 Astra, thread `01a0d6e7-83c0-71e2-9214-b5fa035c822c`, exit 0
  (`lad-audit-objective-verdict.md`). `VERDICT: FAIL 4, 6; outside the claims: none`.
- **Subjective lane:** `reviewer` on Opus 5.5 (`lad-audit-subjective-verdict.md`).
  `VERDICT: FAIL 6; outside the claims: F1, F2`.
- **No checker ran.** Guide-row parity is the conformance gate's equality, which both lanes read green. The deviation is
  this round's: the design verdict named a checker for row parity, and the executed gate covers it.

## Claims

| Claim | Objective | Subjective | Ruling |
| --- | --- | --- | --- |
| 1 Additions carry values | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 Unattributed rules report | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 The ownership rule is narrow | CONFIRMED | CONFIRMED, noting no case kills a dropped layer clause | CONFIRMED; the missing kill is carried as R2 |
| 4 The owner rows are true | BROKEN | CONFIRMED | BROKEN on the equivalence clause. Every owner matches its partial on both lanes, but `attributeSelector('button.page-link', …)` answers `undefined`. The rows-probe substituted `.page-link` for it, rather than only removing `:where()` |
| 5 Shipped keys from the inventory | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 Rows measured, not written | UNRESOLVED | BROKEN | BROKEN. The owner rows' `Component` cells were seeded by hand in `lad-rows-probe.ts.txt`, and `attributeBlock` returns the row's component unchanged, so the green run cannot check that cell. The table writer's input, output, and run log are also absent |
| 7 Plants | CONFIRMED | CONFIRMED | CONFIRMED |
| 8 The report-only patch | CONFIRMED | CONFIRMED | CONFIRMED |
| 9 Scope, law, and gates | CONFIRMED | CONFIRMED | CONFIRMED |

## Findings outside the claims

- **F1 (subjective), accepted.** Attribution must read the classes inside a `:where()` or `:is()` argument as the
  subject's own, never those inside `:not()` or `:has()`, and must keep `collectSelectorClasses`' contract for its other
  callers.
  - The reset rules then attribute by measurement.
  - Owner rows remain only for rules the measurement still leaves unattributed: `.caption-bottom`, and any rule the
    class tier cannot place, as claim 4's `button.page-link` reading shows.
  - The § Additions preamble then names an owning row's `Component` cell as the one cell besides `Reason` that no
    measurement fixes, and the paragraph naming the `:where()` rules corrects.
- **F2 (subjective), accepted.** The preamble clause "a `declaration` the release omits at a site it does write or that
  an added selector carries" reads two ways.
- **R2 (subjective referral), accepted.** No case kills a dropped layer clause in `attributeBlock`, and no case kills
  de-duplicating a custom property by name across two sites.
- **R3 (subjective referral), accepted, as part of F1.** Before the `:where()` reading lands, sweep every emitted
  selector containing `:is(` or `:where(` and confirm no other attribution or departure moves.
- **R1 (subjective referral), carried to LEDGER-RETUNE.** A canonical token declared under a selector other than `:root`
  or a mode scope has a value neither ledger reads. Ruling 3's canonical-value comparison is that unit's.

## Carrier

LEDGER-ADDITIONS round 2 (`ledger-additions-brief-2.md`, `opus` on Opus 5.5) carries claims 4 and 6, F1, F2, R2, R3,
and the report-only § Outside the ledger patch, which the round now owns. R1 goes to LEDGER-RETUNE's brief.

## Ruling

FAIL 4 and 6, plus F1. Rulings 4 to 6 hold on both lanes. The hand-seeded owners and the unretained table run go to
round 2.
