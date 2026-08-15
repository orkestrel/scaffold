# U5 closing audit — the fix round at 419aafb

Successor to `u5-audit-brief.md`. Subject: commit 419aafb (baseline 7c0ddd3), writer Opus
implementer per `u5-brief-2.md`; the auditor is Sol, the engine that did not write it. One round;
a PASS closes U5 pending the reviewer's portfolio re-rule on the round-1 NOT-EVIDENCED claims.

Established (Orchestrator-verified, not this audit's subject):
- Full chain at 419aafb: format:check, lint:check, check, build green (`tmp/redesign/u5-gates-2.log`);
  `npm test` per-project: 232, 654 (+2 fault proofs over round 1), 17 all passed; the only red is
  the declared U7 parity set of four, membership unchanged (`tmp/redesign/u5-test-2.log`).
- Orchestrator rulings taken on the writer's reports, already recorded: the drawer's Tab-escape
  asymmetry is ACCEPTED for U5 (backdrop blocks pointers, not focus; no aria-modal claim is made;
  containment would need `inert` with resize edge cases) with carriers J1 (resolver must represent
  the asymmetry) and U8 (surface coherence); the OpenPanel fault double-echo goes to the H6/
  OpenPanel round. Neither is your subject.

Evidence: diff `/home/user/scaffold/tmp/redesign/u5-2.diff` (git show 419aafb, 390 lines); the
tree at 419aafb in `/workspace/supervisor`; the fix brief `/home/user/scaffold/tmp/redesign/u5-brief-2.md`;
round-1 verdicts `u5-analyst-verdict.md` and `u5-checker-report.md`.

Claims (falsify shape; CONFIRMED names the failed attack; one terminal line; no diary):

1. **Trusted input everywhere it is asserted.** No `dispatchEvent` and no bare `.click()`
   remains on any asserted interaction path in `tests/app/browser/ApplicationView.test.ts`; the
   conversions preserve the original assertions and both viewport cases; Escape travels as
   `userEvent.keyboard('{Escape}')` from a focus position established by real interaction. Attack
   the one resolution change: the drawer control now resolves via `[aria-controls="rail"]`
   because its accessible name carries live counts — is that locator a stable-fact resolution or
   a cheat past a naming defect the tests should have surfaced?
2. **The fault surface is correct.** `operator.fault` renders exactly once in the rail as
   `That did not go through: {message}.`, with no live region; it clears on the next success;
   the stacking order is notice above fault at the top of the offcanvas body; `Operator.ts` and
   every other controller are untouched; both widths proved. Attack clearing (does a stale fault
   outlive the state that raised it on any path the tests cover?) and duplication (door open +
   rail line — the known double-echo is carried to H6, but verify this diff adds no third).
3. **The copy repair is complete.** No rendered surface names the deleted Workflow control:
   `grep -rn "Workflow above" app/ tests/` is empty at 419aafb; StackList's test binds the new
   sentence; the glyph and remaining assertions are untouched.
4. **Convergence, not moments.** The two integration count asserts now poll to convergence;
   the poll is a test-side wait on a visible fact (the recorded convergence law), not product
   polling; no timer-settling was introduced elsewhere in the diff.
5. **Scope and probes.** The touched set is exactly the five owned files; no forbidden
   constructs entered (`any`/`as`/`!`/suppressions/mocks/`style`/invented classes/new deps);
   both probes the writer ran were removed (`grep -c PROBE` over the tree returns 0 in the
   owned files); the writer committed nothing (the Orchestrator committed 419aafb).

You are read-only. The tree is clean at 419aafb; no concurrent writer exists.
