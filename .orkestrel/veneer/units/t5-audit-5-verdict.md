# T5 TEST-FRAME audit, round 5 — the Orchestrator's reconciliation (2026-09-24)

Claims: `t5-audit-5-claims.md`. Lanes that ran, blind to each other on that one claims file: the objective lane,
`analyst` on GPT-6 Astra (`t5-audit-5-objective-verdict.md`, thread `01a0d4d5-2aba-7d20-bd76-1e4a80f60e99`); the
subjective lane, `reviewer` on Opus 5.5 (`t5-audit-5-subjective-verdict.md`); and `checker` on Sonnet
(`t5-audit-5-checker-verdict.md`). The unit was written by `opus` on Opus 5.5, so the objective lane ran on an engine
that did not write it.

Deviation: the subjective lane's brief carried the round-4 Focus line (the leaf's name and the SVG assumption) because
the derivation script rewrote that brief's lane sentence and not its Output focus. The lane named the defect (its R5),
ruled every claim, and read the stale focus against round-5 subjects. Its verdicts stand.

## Rulings

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 | CONFIRMED | CONFIRMED | BROKEN | Held. The checker's break is the Orchestrator's probe logs (`t5-5-build.log.txt`, `t5-5-guides.log.txt`), which record their exits in `t5-veneer-probe-5.log.txt` rather than at each log's end. The claim over-reached to them; every unit gate log ends on its own `exit 0`. |
| 2 | CONFIRMED | CONFIRMED | — | Held. |
| 3 | CONFIRMED | CONFIRMED | — | Held. |
| 4 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 5 | BROKEN | CONFIRMED | — | **Broken.** The objective lane's executed counterexamples stand, and the Orchestrator's rerun (`t5-instruments-5/t5-offset-probe.log.txt`) reproduces each: `computeOffset` rounds an overflowing edge up without bounding the move by the opposite edge, so `(0, 0.5, 100, 513)` in an 800 by 513 window moves by -1 and starts at -0.5, and a box that already ends inside a fractional window moves. The subjective lane's R1 names the same input. |
| 6 | CONFIRMED | CONFIRMED | — | Held. |
| 7 | CONFIRMED | CONFIRMED | — | Held. |
| 8 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |
| 9 | CONFIRMED | CONFIRMED | — | Held. The RP unit's control adds a consumer-side reading: Veneer's origin-touching case fails on the registry's 0.0.23 and passes on the round-5 build (`rp-instruments/rp-control.log.txt`). |
| 10 | CONFIRMED | CONFIRMED | CONFIRMED | Held. |

## Findings and carriers

| Finding | Source | Carrier |
| --- | --- | --- |
| C5: the unbounded rounding in `computeOffset` | objective claim 5; subjective R1 | round 6, item 1 |
| F1: the `releasePointer` remarks and the guide bullet say no offset puts content under the park point; the offset does lay the frame over (-1, -1), and the promise holds because the browser hit-tests nothing outside the runner page's viewport | subjective F1; the Orchestrator's park probe records the covering | round 6, item 2 |
| F2: the hover proof is named for a held pointer it never holds | subjective F2 | round 6, item 3 |
| R3: no mutation reddens the both-edges `computeOffset` case | subjective R3 | round 6, item 1 (its bounded cases and the `unbounded` mutation) |
| R2: no proof drives a rejected `releasePane` | subjective R2 | Retained as ruled: no real implementation rejects the release without module replacement, which `AGENTS.md` forbids; the objective lane confirmed the nested `finally` by reading. No carrier. |
| Step 1's "370 passed" has no retained log | both lanes | Dropped: an intermediate reading the final green run supersedes. Round 6 keeps every log it writes. |

## Correction to the park ruling

`t5-park-ruling-verdict.md` P1 says no staging, scroll, offset, or restore puts content under the parked pointer. The
Orchestrator's own probe (`t5-instruments-4/t5-park-probe.log.txt`) offsets the frame over (-1, -1). P1's invariant
reads, from this verdict: the park point lies outside the runner page's viewport, where the browser hit-tests nothing,
so no element takes a `mouseover` event or hover paint from the parked pointer until the next pointer verb, even where
a staging, scroll, or offset lays content over that point.

## Next

Round 6 (`t5-test-frame-brief-6.md`) on `opus`, the round-5 writer, resumed with its context. Its audit: `analyst` on
GPT-6 Astra and `checker`. Then the release.

VERDICT: FAIL 5; outside the claims: F1, F2
