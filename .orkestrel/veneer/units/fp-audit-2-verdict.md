# PASSIVE-FRAMES (`fp`) audit round 2 — the Orchestrator's verdict

Claims: `fp-audit-2-claims.md`. Lanes, blind on that one file:

- the objective lane, `analyst` on GPT-6 Astra (`fp-audit-2-objective-verdict.md`);
- the subjective lane, `reviewer` on Opus 5.5 (`fp-audit-2-subjective-verdict.md`), run because the round re-shot frames;
- the checker, `checker` on Sonnet, on claims 1, 5, and 8 (`fp-audit-2-checker-verdict.md`).

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 2 Pressed faces | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 3 Dark pressed row | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 4 Disabled check | BROKEN | CONFIRMED | — | BROKEN: the assertion reads a shared signature |
| 5 One population | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 6 Spinner | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 7 Frames | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 8 Law and report | BROKEN | BROKEN | CONFIRMED | Report defects accepted on the record |

- **Claim 4.** The disabled case asserts that the hosts share one variant signature, so every host carrying
  `btn-primary btn-secondary` still passes (the objective lane's in-memory evaluation). The successor asserts one
  variant class on each host and runs that mutation red.
- **Claim 8.** The paraphrased journey commands, "from here", the tallies, the overwritten failed setup log (a timing
  failure in `tests/setupServer.test.ts`, a file the unit does not touch), and the misstated unchanged-frame and runner
  lines (F-A) are report defects. By the user's instruction to put implementation first, they are accepted on the
  record rather than carried.

## Outside the claims

| Finding | Lane | Ruling | Carrier |
| --- | --- | --- | --- |
| F-A: the report's unchanged-frame list and runner line | subjective | Report defect, accepted on the record | — |
| F-B: the `DRIVEN_CONTRAST` TSDoc and case comment claim a perceptual boundary and record audit history | subjective | Confirmed; one plain sentence at each site | PASSIVE-FRAMES round 3 |
| R-A: hand-edited gate log heads | subjective referral | Accepted on the record with claim 8 | — |
| R-B: the guide backticks `MODE_TOKEN`, a test constant rather than a public export | subjective referral | Confirmed against the parity rule | PASSIVE-FRAMES round 3 |

VERDICT: FAIL 4; outside the claims: F-B, R-B — carried by PASSIVE-FRAMES round 3 (`b-passive-frames-brief-3.md`).
