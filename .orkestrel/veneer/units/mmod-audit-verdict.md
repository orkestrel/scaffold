# E-ID-MOTION-MODAL audit — verdict

The Orchestrator's reconciliation of the audit round over E-ID-MOTION-MODAL, on one claims file
(`mmod-audit-claims.md`): the objective lane, `analyst` on GPT-6 Astra (`mmod-audit-objective-verdict.md`, thread
`01a0d760-ab77-7e52-b9d7-c04d9b3c88da`), and the subjective lane, `reviewer` on Opus 5.5
(`mmod-audit-subjective-verdict.md`), blind to each other. The writer was `opus` on Opus 5.5, so the objective lane ran
on an engine that did not write the work. No checker ran: the conformance gate reads every ledger row, and both lanes
compared the rows with its output.

**Verdict: FAIL 5, 7; outside the claims: F1, F2, F3, R1, R2, R3.** The rules, the rendered motion, the backdrop
mixin, the design fit, the engine and showcase readings, the § Factors patch, and the gates hold. Round 2 fixes the
prose, the offcanvas proof's shape, and the kill standard of two cases (`e-id-motion-modal-brief-2.md`). Claim 5 and F1
are carried by other units, named below.

## Claims

| Claim | Objective (Astra) | Subjective (Opus 5.5) | Ruling |
| --- | --- | --- | --- |
| 1 The dialog motion | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 The host fade | CONFIRMED | CONFIRMED | CONFIRMED, with R1 |
| 3 The backdrop fade | CONFIRMED | CONFIRMED | CONFIRMED |
| 4 The proofs | CONFIRMED | CONFIRMED | CONFIRMED, with R2 and R3 |
| 5 The ledger rows | BROKEN | CONFIRMED | BROKEN; carried by LEDGER-RETUNE |
| 6 Engine and showcase | CONFIRMED | CONFIRMED | CONFIRMED |
| 7 The guide prose | CONFIRMED | BROKEN | BROKEN |
| 8 The design verdict | CONFIRMED | CONFIRMED | CONFIRMED |
| 9 The § Factors patch | CONFIRMED | CONFIRMED | CONFIRMED; the paragraph is F1 |
| 10 Scope and gates | CONFIRMED | CONFIRMED | CONFIRMED |

- **Claim 2.** Both lanes rule the load-order form the right shape: the host writes on the `.modal` selector the release
  records, as the backdrops write on their recorded `.fade` compounds, and the host case pins the order with an
  assertion. The reviewer notes the guide already states the same order-based tie for the fade and collapse rules.
- **Claim 5.** Both lanes read the rows equal to the gate's output and the six additions correctly classed. Both find
  the dialog transition's `tokenized` cell false under the § Departures legend, because `250ms` on the panel curve
  does not preserve the release's `0.3s ease-out`. The cell is the classifier's, which checks for a token reference
  and compares no resolved value; the ledger-values design verdict records that legend as false until LEDGER-RETUNE
  lands. **Carrier: LEDGER-RETUNE.** Whichever of this unit and LEDGER-RETUNE lands second regenerates the two dialog
  rows from `npm run test:conformance`; both lanes expect `retuned` on each.
- **Claim 7 (subjective).** The following sentences fail "true, read once":
  - (a) The backdrop paragraph says the mixin writes the transition "on the `.modal-backdrop.fade` compound …, so the
    offcanvas backdrop takes the same motion". The offcanvas backdrop moves because it includes the same mixin.
  - (b) The same paragraph calls the timing "the host's own timing" before the host is introduced.
  - (c) "scales the dialog to a `1.02` factor" gives "factor" a second sense beside the motion factor.
  - (d) "because the barrel loads the modal partial after the fade partial at one specificity" attaches the
    specificity to the loading.
  - (e) The offcanvas backdrop's Reason cell and the mixin comment name the timing by one caller's element ("the
    panel timing the modal host fades on").
  - The re-wrapped paragraphs around lines 2599 and 5982 of the guide break the paragraph wrap.

## Findings outside the claims

- **F1 (both lanes), carried by E-ID-MOTION-FACTOR round 2.** After this unit's patch, the § Factors paragraph's
  second sentence still says a scaled duration resolves to the release's value at a factor of `1`, which the dialog,
  the host, and both backdrops falsify. FACTOR round 2 (`e-id-motion-factor-brief-2.md`, Execution step 2) rewrites
  that paragraph so the release-value equality is stated only for the transitions that keep a release duration. The
  strike this unit returned (`the collapse, modal dialog, offcanvas panel,` becomes `the collapse, offcanvas panel,`)
  applies at whichever of the two landings comes second, and that landing re-reads the paragraph against the built
  cascade.
- **F2 (subjective), accepted.** The offcanvas backdrop case's title ends "and still under the reduced-motion
  preference", which reads as the opposite of what it asserts.
- **F3 (subjective), accepted.** The offcanvas backdrop case pushes the hidden opacity into the easing and midpoint
  slots when no transition runs, a sentinel `AGENTS.md` § Design laws forbids.
- **R1 (subjective referral), accepted as prose.** The `.modal` rule declares its opacity transition on every modal, so
  a plain modal whose opacity a consumer changes animates. "A modal without the `fade` class holds its opacity, so no
  transition runs on it" states the engine's case only; round 2 qualifies it.
- **R2 (subjective referral), accepted.** Deleting the static-bounce rule or the dialog's transition makes the bounce
  and entrance cases throw from `requireValue`, a plain `Error`, not an `AssertionError`. Round 2 asserts the
  transition's presence first, so each deletion kills with an assertion.
- **R3 (subjective referral), accepted.** The plants ran on an intermediate test file. Round 2 re-runs them on the final
  file.
- **R4 (subjective referral), settled.** The objective lane read that removing the settlement of either the host's or
  the dialog's motion fails the completion assertions in `tests/src/browser/Modal.test.ts`, which pin no duration.
- **R5 (subjective referral), settled.** Claim 5's carrier and F1's carrier, recorded here.

## The engine section

The hunk in the offcanvas paragraph under `## Engine` (around line 2599 of the guide) is in a section the engine
session owns. It corrects a sentence this unit's cascade change makes false, and both lanes read it true. The
Orchestrator keeps it in this unit and tells the engine session in `plan.md` § Intersession state before the landing,
so the engine session merges it by hunk.
