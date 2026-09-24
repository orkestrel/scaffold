# T5 TEST-FRAME audit, round 3 — claims

Subject: the round-3 change in `/home/user/test-tf` (uncommitted over `80c419e`), briefed by `t5-test-frame-brief-3.md`
and reported in `t5-test-frame-report-3.md`. The diff is `t5-3.diff`, the status `t5-3-status.txt`, and the logs,
instruments, and retained mutation files `t5-instruments-3/`, all beside this file. Round 2's reconciliation is
`t5-audit-2-verdict.md`. Each claim is falsifiable; rule every one.

1. **Scope and gates.** The status lists exactly `guides/test.md`, `src/browser/helpers.ts`, and
   `tests/src/browser/helpers.test.ts`, and each gate log under `t5-instruments-3/` ends with the exit status its run
   wrote, each 0.
2. **The park point (P5).** After the scroll and the offset, an element frame's final box never covers the runner page's
   origin, except where the element fits the window only by filling both its height and its width, which the TSDoc and
   the guide name. The document scrolls only for an element its scroll moves: the `offsetParent` walk ends on a fixed box
   exactly when the viewport is the element's containing block, including a fixed box inside a transformed or
   paint-contained ancestor, which the walk treats as moving with the scroll.
3. **Round-2 behavior holds.** The declared geometry (T5-FIT), the calling frame's own `style` attribute as the offset's
   scope (T5-SCOPE), the scroll restore on the passing and refusal paths (T5-BACK), and `readFrame` are unchanged from
   round 2 except where P5 and RA change them.
4. **The rejected release (RA).** A rejected `releasePane` still restores the tester's scroll, through the `try` and
   `finally` structure the report names; no proof covers that path, and the report says so.
5. **Host-independent proofs (H6).** The below-pane, scope, and fixed-panel fixtures force their move on any runner
   window size and expect whole rows.
6. **The retained mutations (RB, RC, RD).** Every mutation file under `t5-instruments-3/t5-3-mutations/` applies as
   written, runs on the final test file (whose digest is checked before and after), and reddens the proofs the report's
   table names, with assertions that distinguish it from the passing case. The no-attribute restore branch is proved,
   and its mutation reddens that proof.
7. **The new proofs.** The two parked-pointer P5 proofs and the fixed-element scroll proof ran red on the round-2 code
   (3 failed, 23 passed, 334 skipped) and green on the final code (26 passed, 334 skipped).
8. **Prose (W8).** Every changed TSDoc sentence and guide sentence states what ships, follows each code token with its
   noun, possessivizes none, and states no count.
