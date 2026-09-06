# Audit verdict — U2 policy-plugin, round 3 over the tidy fix (2026-09-06)

Lanes run: subjective (`reviewer`, Opus 5), objective (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), `checker` (Sonnet), `verifier` (Sonnet). Every lane ran; none returned empty. Verifier: `GATES: GREEN` (`u2-fix-2-verify-report.md`), which also closes the objective lane's referral F (round-3 gate evidence rested on the builder's report alone at the time that lane read).

## Per claim

Claims 1 to 7: PASS on the subjective lane and on the objective lane. The checker fails claim 7 on `guides/scaffold.md:1790-1791` as a write outside the round-3 owned set. Refuted: that bullet was rewritten in round 2 by edit F4, whose brief owned `guides/scaffold.md` (`u2-fix-brief.md` § Scope; `u2-fix.diff.txt`), and the round-3 status (`u2-fix-2.status.txt`) names the same tracked set as the round-2 status; round 3 added no tracked path.

## Findings outside the claims, each with its ruling

- Subjective F1 (required): `tests/config.test.ts:1378` uses `below` as a pointer. Carried: the Orchestrator's integration edit, "the following absence assertion".
- Objective A: the manifest reader at `tests/setupPolicy.ts:1254-1256` keeps an inline record test the guard now serves. Carried: the same integration edit routes it through `isPolicyRecord`.
- Objective B: `overrideRules === undefined ||` is a dead disjunct beside `isPolicyRecord`. Carried: the same integration edit.
- Objective D: a root `cwd` strips to the empty string and the prefix becomes the separator alone, which is the correct prefix for a workspace at the filesystem root. Carried: one sentence in the helper's TSDoc; the code stands.
- Objective C (not evidenced by that lane): whether `RuleTester` passes a case's `filename` unresolved. Settled by measurement: `m8m13-report.md` § Run 4 records `filename` as the oxlint package directory with the declared name appended, so under `RuleTester` every case file sits under `cwd` and the TSDoc clause holds. Recorded; no edit.
- Objective E: the `Proves` cells omit the wiring reader's own controls. Ruled in round 2: those controls are the reader's, not a workspace law; the cells stay. No edit.
- Subjective F2: after the rename, `inspectPolicyConfiguration` and `inspectPolicyWiring` are two readers of one file whose names no longer divide the subject. Ruled a successor seam of the policy readers, outside this unit's fixed scope; carried to the campaign's roadmap carry list for U6.
- Subjective referral: the TSDoc first sentences on module helpers open with a noun phrase across both files, from earlier rounds and repository-wide. A conformance question for the fleet, not this unit; carried to the same roadmap list.

## The integration edit

Four one-line edits prescribed verbatim by the lanes are applied by the Orchestrator as `U2-fix-3`, briefed in `u2-fix-3-brief.md`, and audited by `checker` and `verifier` (engines the Orchestrator does not share) before the unit commits.

VERDICT: PASS on the claims; U2-fix-3 (integration) then commit
