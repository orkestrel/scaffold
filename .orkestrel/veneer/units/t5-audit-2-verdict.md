# T5 TEST-FRAME audit, round 2 — the Orchestrator's reconciliation (2026-09-24)

Lanes that ran, blind to each other on `t5-audit-2-claims.md`: the objective lane, `analyst` on GPT-6 Astra (thread
`01a0d46f-c073-7f60-a7b6-dd4052b27b4d`, `t5-audit-2-objective-verdict.md`); the subjective lane, `reviewer` on Opus 5.5
(`t5-audit-2-subjective-verdict.md`); and `checker` on Sonnet for claims 1, 7, and 8 (`t5-audit-2-checker-verdict.md`).

Orchestrator evidence: `t5-instruments-2/t5-veneer-probe-2.log.txt` (Test built from the round-2 tree, exit 0;
`npm run test:guides` 51 passed; Veneer `82e1120` at `journey:light-390` against the packed build, 62 of 62, the
round-1 pointer guard included) and `t5-instruments-2/t5-2-guides-host.log.txt`.

| Claim | Objective | Subjective | Checker | Ruling |
| --- | --- | --- | --- | --- |
| 1 Scope and gates | CONFIRMED | UNRESOLVED | CONFIRMED | CONFIRMED for the file set; the authoritative gates are the release chain's `prepublishOnly` run |
| 2 Declared geometry | CONFIRMED | CONFIRMED | — | CONFIRMED |
| 3 Hand-back | CONFIRMED | UNRESOLVED | — | BROKEN on one path: a rejected `releasePane` skips the scroll restore (RA) |
| 4 Scope | CONFIRMED | CONFIRMED | — | CONFIRMED; the frame's own `style` attribute is the right scope |
| 5 Pointer | BROKEN | BROKEN | — | BROKEN: a document scroll and a horizontal offset each can put a short element on the park point |
| 6 Proofs | BROKEN | BROKEN | — | BROKEN: the below-pane and scope fixtures stop forcing their move on a window 844 rows or taller, the fixed panel expects 253.2 rows on a window near 400, and the held-hover proof fails in setup under the restore mutation |
| 7 Sized refusal | CONFIRMED | CONFIRMED | CONFIRMED | CONFIRMED |
| 8 Prose | BROKEN | BROKEN | CONFIRMED | BROKEN |

## Findings carried into round 3

- **P5 (claim 5).** After the scroll and the offset are computed, the capture checks whether the element's final box
  contains the runner page's origin. Where it does, the capture moves one further row or column away from the origin
  wherever the pane and the window leave room. The document does not scroll for an element that the document's scroll
  does not move. The TSDoc names the residual case where no room is left. Proofs: a flush-left element above a scrolled
  tester, and a flush-left element placed by a horizontal offset, each with the pointer parked, receive no `mouseover`
  event, and each reddens on the round-2 code.
- **RA (claim 3).** Restore the scroll even when `releasePane` rejects.
- **H6 (claim 6).** The below-pane and scope proofs declare a pane taller than the runner window, so the element lies
  past the window after the scroll on any host. The fixed panel's declared height always gives a whole number of rows.
  Credit the restore mutation to the attribute assertion, not to the held-hover setup.
- **RB, RC (reviewer).** Retain each mutation's exact text in a file, and run the red and mutation runs on the final test
  file.
- **RD (reviewer).** Prove the branch that restores a frame carrying no `style` attribute, or state why the installed
  runner never reaches it.
- **W8 (claim 8, F3).** Limit the scroll sentences to elements the document's scroll moves; prove or delete the sentence
  on a fixed element extending past the declared pane; write "is not offset" where "moves nothing" is false; write "the
  `captureFrame` function stages" in `guides/test.md`; correct the scope proof's comment on the second frame.

VERDICT: FAIL 3, 5, 6, 8; outside the claims: F3 — round 3 on `t5-test-frame-brief-3.md`.
