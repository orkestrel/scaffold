# E-ID-FLOW-2 audit — verdict (2026-09-25)

The Orchestrator's reconciliation of the E-ID-FLOW-2 audit on `flow2-audit-claims.md`. Three lanes ran blind to each
other: the objective lane, `analyst` on GPT-6 Astra (`flow2-audit-objective-verdict.md`; journal
`tmp/codex/flow2-audit-analyst.jsonl`, thread `01a0d64b-ffd8-7cb3-902a-e81703966a3e`); the subjective lane, `reviewer`
on Opus 5.5 (`flow2-audit-subjective-verdict.md`); and `checker` on Sonnet on claims 4, 6, and 7
(`flow2-audit-checker-verdict.md`). The subject was written by `opus` on Opus 5.5 (round 1) and `builder` on Sonnet
(round 2); the objective lane ran on an engine that wrote neither.

## Claims

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Release margins | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 2 Density proofs | CONFIRMED | CONFIRMED | — | CONFIRMED: each kill is an `AssertionError` in its named case |
| 3 Figure placement | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 Ledger rows | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 5 Calibration records | CONFIRMED | CONFIRMED | — | CONFIRMED on the facts; see F1 for the wording |
| 6 Mixin retirement | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 7 Scope and law | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |

## Findings outside the claims

- **F1 (subjective lane), accepted.** The `FLOW_MARGIN` doc block's head sentence in `tests/setupStyles.ts` calls the
  constant a block-end margin and then places it on both block edges of `hr`, and it names a description-list rule
  apart from the release's single `ol, ul, dl` rule. The objective lane confirmed the facts the sentence states, so
  only the wording changes. Carrier: E-ID-FLOW-2 round 3 (`e-id-flow-2-brief-4.md`), `builder` on Sonnet applying the
  lane's sentence verbatim, closed by a mechanical read.

## Referral

The subjective lane asked whether a gate checks the `reboot` ledger rows against the compiled cascade. The conformance
project does: its guide-ledger case compares each recorded row with the declarations it reads from the built cascade,
and round 1's report records it printing the rows to update before the ledger edit. No carrier.

## Ruling

The code is accepted. The unit lands after F1 closes.
