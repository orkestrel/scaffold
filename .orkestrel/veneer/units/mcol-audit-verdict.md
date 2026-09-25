# E-ID-MOTION-COLLAPSE audit — verdict

The Orchestrator's reconciliation of the audit of E-ID-MOTION-COLLAPSE (`mcol-audit-claims.md`, the unit at `9e1fe4e`):
the objective lane, `analyst` on GPT-6 Astra (`mcol-audit-objective-verdict.md`, thread
`01a0d7f8-92a4-7f20-a9b4-77e4f0b3ae53`, journal `tmp/codex/mcol-audit-analyst.jsonl`); and the subjective lane,
`reviewer` on Opus 5.5 (`mcol-audit-subjective-verdict.md`). The lanes ran blind to each other. The writer was `opus` on
Opus 5.5, so the objective lane ran on an engine that did not write the work.

**Verdict: FAIL 3, 6, 7; claim 1 BROKEN as the Orchestrator wrote it, with no defect in the change; outside the claims:
F1, F2, F3.** The panel motion, the chevron's rendered timing, the rows, the engine and showcase evidence, and the scope
and gates hold.

## Claims

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 The panel motion | BROKEN | CONFIRMED | BROKEN in the claim's wording; the change holds |
| 2 The chevron motion | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 The proofs | BROKEN | CONFIRMED | BROKEN |
| 4 The ledger rows | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 Engine and showcase | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 The guide prose | BROKEN | BROKEN | BROKEN |
| 7 The design verdict | BROKEN | CONFIRMED | BROKEN |
| 8 Scope and gates | CONFIRMED | CONFIRMED | CONFIRMED |

- **Claim 1, the Orchestrator's error.** The claim says no root `interpolate-size` is written. The cascade has shipped
  `html { interpolate-size: allow-keywords }` in `src/styles/elements/_html.scss` since U3 (`6ddaa3c`), recorded in
  § Additions (`reboot | html { interpolate-size }`); this change writes none, and the collapse motion does not depend on
  it, because the engine writes pixel sizes in both directions (both lanes). The design verdict's Collapse panel row means
  that the collapse unit adds no root `interpolate-size` and leaves the size mechanism to the engine (E27); it does not
  retire the baseline declaration. No change follows.
- **Claims 3 and 7, the objective lane's executed assertion block.** The chevron case reads the pseudo-element's computed
  longhands and its immediate frames, so a turn that runs at a positive factor but stays frozen at its start frame passes
  it: no midpoint or later frame is read. The design verdict's § Proof requires the running transition's timing and a
  midpoint seek. The subjective lane distinguished every mutation the claim names, and the objective lane found one it
  does not; the executed reading rules. The unit's returned `sampleTransition` patch, which reads a pseudo-element's
  running transition, is the mechanism the proof needs, so this unit carries it rather than J-MOTION-RECORDER; its hunk
  goes to the engine session as a pending shared change before the landing.
- **Claim 6.** Three sentences are false or incomplete:
  - "and ends at the release's own `rotate(-180deg)` half turn" states one direction; a button taking the `collapsed`
    class turns back to `none` (subjective, from the unit's own zero-factor reading);
  - the chevron proof paragraph describes readings of a held, running turn that the case does not take (objective);
  - the departure bullet "decelerates into its end size" names no difference from the release's `ease`, which also ends
    at zero slope (subjective).
- **Claim 7** also asks that the design row's `interpolate-size` wording be reconciled with the baseline; claim 1's ruling
  does that.

## Findings outside the claims

- **F1 (both lanes), accepted.** The accordion partial's header says every value is Bootstrap's apart from the
  forced-colors outline; the chevron now turns at `0.15s ease` against the release's `0.2s ease-in-out`. The comment
  "the half turn it ends at" has claim 6's one-direction fault.
- **F2 (subjective F1), accepted.** The collapse partial's comment "An engine writes the size each move ends at inline"
  is false for a closing panel, which ends at the rule's `height: 0` after the engine clears the inline size.
- **F3 (subjective), accepted.** The fade case's comment says it pins none of the collapsing rule's values, and its
  `expect(closing?.[0]).toBe('height')` pins that rule's property.
- **Referral R1 (subjective), carried with the patch.** The patch's `KeyframeEffect` filter makes the `sampleTransition`
  doc block's no-effect `@throws` line and its `requireValue` guard unreachable.

## Carriers

`e-id-motion-collapse-brief-3.md` (the same `opus` writer, resumed) carries claims 3, 6, and 7, F1 to F3, and R1.
Claim 1 needs no carrier.
