# STATES audit — verdict

The Orchestrator reconciled this round on 2026-09-25. Both lanes ran on `sts-audit-claims.md`, blind to each other.

- **Objective lane:** `analyst` on GPT-6 Astra, thread `01a0d6ea-1c65-7230-b073-76cf7580ea6c`, exit 0
  (`sts-audit-objective-verdict.md`). `VERDICT: FAIL 3, 5, 7; outside the claims: none`.
- **Subjective lane:** `reviewer` on Opus 5.5 (`sts-audit-subjective-verdict.md`).
  `VERDICT: FAIL none; outside the claims: F1, F2, F3`.

## Claims

| Claim | Objective | Subjective | Ruling |
| --- | --- | --- | --- |
| 1 Press from paint | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 Disabled from paint and hit testing | CONFIRMED | CONFIRMED | CONFIRMED |
| 3 The transition from paint | BROKEN | CONFIRMED | BROKEN. A reduced-motion twin declaring `transition: box-shadow 7.5s ease` still collapses the fill, and it passes both the centre pixel and the transition-only declaration filter. Dropping the `transition-property: none` and `0s` readings lost the only assertions that tell it apart, and the release requires `none` (`inventory.json`) |
| 4 The disabled link button | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 No fake motion, load-resilient | BROKEN | CONFIRMED | BROKEN on load resilience. The `waitForCondition` predicate discards its accepted frame and shoots again, and it admits a completed frame. So a transition that finishes between the two shots makes `moving` equal `held`, and correct CSS reads red |
| 6 The prose | CONFIRMED | CONFIRMED | CONFIRMED |
| 7 Scope, law, and gates | BROKEN | CONFIRMED, with F3 | BROKEN. The centre-region calculation repeats at the form-range sites, and `.claude/rules/architecture.md` routes a repeated calculation through one export |

## Findings outside the claims

- **F1 (subjective), accepted.** The guide states that Chromium lists no animation for the thumb in
  `document.getAnimations()`, and no assertion checks it.
- **F2 (subjective), accepted.** The guide's sentence about the gauge's rounding describes how the instrument was built,
  and nothing checks it.
- **F3 (subjective), accepted, with claim 7.** The centre-region helper serves the form-range sites and the centre read
  in `tests/app/browser/integration.test.ts`.
- **R1 (subjective referral), covered.** The `settled` reading's timing dependence closes once the declaration readings
  return, under claim 3.
- **R2 (subjective referral), dropped on the record.** The `<button disabled>` row's opacity is also written by the
  elements layer. The anchor row binds the `.btn` group, and the button row's rendered result is true.

## Carrier

STATES round 2 (`states-brief-2.md`, `opus` on Opus 5.5) carries claims 3, 5, and 7, and F1, F2, and F3.

## Ruling

FAIL 3, 5, and 7, plus F1 and F2. The press, disabled, and link-button proofs hold on both lanes.
