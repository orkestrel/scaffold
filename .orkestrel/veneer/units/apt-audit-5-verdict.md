# AP-TYPE audit, round 5 — the Orchestrator's reconciliation (2026-09-24)

Claims: `apt-audit-5-claims.md`. Lanes that ran blind on that one claims file: the objective lane, `analyst` on GPT-6
Astra (`apt-audit-5-objective-verdict.md`, thread `01a0d5a1-5eb5-7cc2-beba-052e55b09d3c`); the subjective lane,
`reviewer` on Opus 5.5 (`apt-audit-5-subjective-verdict.md`); and `checker` on Sonnet (`apt-audit-5-checker-verdict.md`).
The unit was written by `builder` on Sonnet, so both lanes ran on engines that did not write it.

## Rulings

| Claim | Objective | Subjective | Ruling |
| --- | --- | --- | --- |
| 1 | CONFIRMED | UNRESOLVED (the `cmp` log named no operands) | Held: the objective lane ran `cmp` with a control, and the Orchestrator's logged run records both SHA-256 digests equal (`apt-instruments-5/apt-5-cmp-orchestrator.log.txt`). |
| 2 | BROKEN | BROKEN | Broken at `guides/veneer.md` § Form check classes: "This partial writes none of either" follows `_button.scss`, which writes the `.btn-check` rules; the sentence means `_form-check.scss`. Every edited sentence holds. |
| 3 | CONFIRMED | CONFIRMED | Held. |
| 4 | BROKEN | per its verdict | Broken on the report only: `xxl-cap` does move `.fs-3` at 1280 (24.24px); the named cases pass because their assertions compare relationships. The code needs nothing. |

## Carriers and record corrections

- **Q1** (claim 2): the sentence becomes, verbatim, "The `_form-check.scss` partial writes none of either." Both lanes
  prescribe it, so it closes on a checker read of the exact line and the guides test, per `.claude/rules/quality.md` §
  Rounds and verdicts; AP-TYPE round 6 (`ap-type-brief-6.md`) carries it.
- **Record corrections, not reopened**: the report's erratum explanation (claim 4) reads correctly as "the named cases
  compare relationships, so they stay true under mutations that move the absolute size, `xxl-cap` included"; the
  report's navbar predecessor is `_input-group.scss`, not `_button.scss`. The report is a campaign record that the
  prune removes and that changes nothing Veneer ships, so from this round a report's prose is corrected here rather
  than by a further round.

VERDICT: FAIL 2, 4; outside the claims: none
