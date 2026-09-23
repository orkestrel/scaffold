# Audit verdict — T4 TEST-CLIP, round 2 (the fix round)

Subject: the round-2 claims in `t4-audit-claims-2.md` over `/home/user/test` (the working tree over `936bc4a`, retained as `t4-2.diff` and `t4-2-status.txt`), the brief `t4-test-clip-brief-2.md`, and the gate logs `t4-2-gates.log.txt` and `t4-full-gates.log.txt`. The unit was written by the Orchestrator (Opus 5.5 in this harness, served by Fable 5.1 this session).

## Lanes

| Lane | Role and engine | Verdict file | Terminal line |
| --- | --- | --- | --- |
| Objective | `analyst` on GPT-6 Astra (`codex-queue-25.sh`, thread `01a0d011-cdf7-7042-8178-f7fac1c83ccc`) | `t4-audit-2-objective-verdict.md` | `FAIL 1, 3, 5; outside the claims: none` |
| Checker | `checker` on Sonnet (claims 4, 5) | `t4-audit-2-checker-verdict.md` | `PASS` |
| Subjective | not run | — | — |

The subjective lane is not run for this bounded repair's own reason: a measurement rule with no API shape or naming choice beyond two `{verb}{Noun}` helpers. The lanes ran on the one claims file, blind.

## Reconciliation

1. **The cap: BROKEN.** The objective lane's counterexample holds on the specification: the `overflow-clip-margin` length expands from the selected visual box, the padding box by default, so a frame with a 3-row bottom border and a 100-row margin clips at 500 where the round-2 code caps at 503, and a `content-box` keyword over a 20-row bottom padding clips at 500 where the code caps at 520. The border subtraction the round removed is dead logic only at a zero margin. Carried to round 3 as E9: the cap becomes the frame's overflow clip edge, read by a `readClipEdge` helper from the selected box (the border-box bottom less the bottom border, less the bottom padding for the `content-box` keyword, or the border-box bottom itself for the `border-box` keyword) plus the margin where it applies; the frame's own contribution stays its border-box bottom plus its bottom margin.
2. **The clip margin: CONFIRMED** by the objective lane; the checker's note that the barrel re-exports the helpers through its wildcard holds.
3. **The proofs: BROKEN on the claim's wording, the assertions confirmed.** The claim's "the pane's height with the clip dropped" was wrong: the child is 600 rows fixed, so that mutation reads 600 under either pane, still distinct from 500; the lane's table records every mutation as distinguished except the border subtraction in the bordered fixture, which round 3's clip-edge cases distinguish (the border-and-margin case reads 500, not 503; the `content-box` case 500, not 520; the `border-box` case 503).
4. **The guide: CONFIRMED** in every lane.
5. **Law and scope: CONFIRMED as narrowed.** The objective lane found inline matrices at the test file's head that predate this unit (the implicit-role and field-role matrices); the claim is narrowed to the matrices this unit moved. The pre-existing matrices are a finding for the test package's own backlog, carried by a TEST-MATRICES unit that moves them into `tests/setupBrowser.ts`, not by this repair.

## Carriers

Round 3 (`t4-test-clip-brief-3.md`, the Orchestrator's own unit again, audited by `analyst` on Astra and `checker`) carries claim 1 and the claim-3 wording; TEST-MATRICES carries the pre-existing matrices. The release waits on round 3.

VERDICT: FAIL 1, 3 (wording), 5 (narrowed); outside the claims: TEST-MATRICES (carried)
