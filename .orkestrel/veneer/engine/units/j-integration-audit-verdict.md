# J-INTEGRATION audit, round 1 — the reconciled verdict (the Orchestrator, 2026-09-24)

Lanes: `analyst` on GPT-6 Astra (objective; thread `01a0d51f-6ee9-7562-8dc2-be17f47cdd13`, `j-integration-audit-objective-verdict.md`) and `checker` on Sonnet (`j-integration-audit-checker-verdict.md`), one claims file `j-integration-audit-claims.md`. Opus wrote the unit; the objective lane ran on Astra. No subjective lane this round (the user's pace ruling: round-1 audits run the objective lane and the checker; no public shape changed beyond the `BackdropInterface.show` remarks). The Orchestrator's gates (`j-integration-gates.log.txt`) read green: 805 of 805, guides 20, policy 109.

| Claim | Objective | Checker | Ruling |
|---|---|---|---|
| 1 INT1 shipped cascade | CONFIRMED | CONFIRMED | CONFIRMED |
| 2 INT2 Modal held backdrop | CONFIRMED (backdrop state, not host visibility) | CONFIRMED | CONFIRMED as far as it goes; the host's visibility is claim 5's failure |
| 3 INT2 Offcanvas held backdrop | FAIL | CONFIRMED | FAIL: the post-removal door returns without restoring, so a panel whose host retakes `show` inside the removal keeps no backdrop |
| 4 Modal removal door | CONFIRMED | CONFIRMED | CONFIRMED; the objective lane's out-of-claim defect (a Modal whose host retakes `show` inside the removal loses its backdrop) joins round 2 |
| 5 Restore's reach | FAIL | UNRESOLVED | FAIL: no later call can supersede an in-flight hide (both engines refuse through `#changing`; the Orchestrator's reading of `Modal.ts` and `Offcanvas.ts` `#refused` agrees), but the restored backdrop can stand over a host the hide already made invisible (`display: none` and the ARIA writes before the Modal's backdrop fade; the Offcanvas `hiding` token, which the shipped cascade keeps off screen) |
| 6 INT3 route half | CONFIRMED | CONFIRMED | CONFIRMED |
| 7 INT5 backdrop writes | CONFIRMED | CONFIRMED | CONFIRMED |
| 8 Backdrop insertion door | CONFIRMED (the destruction case does not distinguish removing only the identity check) | CONFIRMED | CONFIRMED, with the proof gap carried into round 2 |
| 9 Scope and law | CONFIRMED | CONFIRMED | CONFIRMED |
| 10 Mutation evidence | CONFIRMED | CONFIRMED | CONFIRMED |

INT4 is ruled by the Orchestrator: the repetition of `HostSnapshot`'s private shapes stays (the one declaration form the tools accept publishes them; `plan.md` records the reasons).

## Re-baseline

Claims 3 and 5 fail on the defect class the writer observed and `plan.md` carried to J-HELD: a change the host takes over leaves the host's visibility and the backdrop disagreeing. Returning the backdrop alone is half of the INT2 repair, so the carried J-HELD rows fold into J-INTEGRATION round 2 under E22 (a change the host takes over returns what it wrote to the state the host chose), and J-HELD is struck as a separate unit. This is a re-baseline of units, not of the exit criterion: the campaign's exit criterion already requires every engine's cancellation to leave a coherent state.

## Round 2 (successor brief `j-integration-brief-2.md`)

- **H1** a stopped hide (at every door after its first write, the backdrop's removal included, on Modal and Offcanvas) returns the host's display, ARIA state, `hiding` token, and backdrop to the shown state per E22, with the user-perceived state asserted.
- **H2** a stopped show returns the backdrop it inserted and its `showing` token to the hidden state.
- **H3** a Backdrop case in which a reaction inside the insertion starts another call (rather than destroying the backdrop) distinguishes removing the insertion-time identity check.

RULING: round 2 on H1 to H3; then the landing audit (the objective lane and the checker) and the landing
