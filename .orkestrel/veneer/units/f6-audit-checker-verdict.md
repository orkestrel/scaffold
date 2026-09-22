# F6 FOUNDATION — checker lane verdict (`checker` on Sonnet, 2026-09-22)

Lane: mechanical. Worktree `/home/user/veneer-f6` at `07fc3c3` plus the unit's writes plus the Orchestrator's three integration patches.

- Claim 3 CONFIRMED on the diff (`f6.diff:55-80` drops the `veneer-logical-rtl` plugin; `:484-498` and `:866-` the proof removals); the report's `grep -rn 'rtl'` residue table (`f6-report.md:59-86`: Bootstrap-artifact digests, F5b fixtures, D11 `dir="rtl"` proofs, `partly` substrings) is report-only evidence this lane cannot re-run, referred.
- Claim 5 BROKEN, as the evidence index pre-ruled (`f6-audit-evidence.md:18-22`): `validators.ts` (`f6.diff:348-362`) and `errors.ts` (`:363-376`) carry `@remarks` additions only; no `@orkestrel/contract` import; obligation 5 goes to the fix unit.
- Claim 8 CONFIRMED: no `setupPolicy` hunk in the diff.
- Claim 9 UNRESOLVED: the gate log ends mid `test:src:browser` (`f6-gates.log.txt:160`) with no `=== gates done` line.
- Claim 10 CONFIRMED against the evidence index's scope: the twenty status lines are the owned list plus the three named integration files; no fixture, `ROADMAP.md`, or `setupPolicy.ts`; the probe-residue sub-clause is referred (no shell).
- Claim 11 CONFIRMED on the diff text.
- Claims 1, 2, 4, 6, 7, 12 referred to the subjective and objective lanes.

VERDICT: FAIL 9; outside the claims: none
