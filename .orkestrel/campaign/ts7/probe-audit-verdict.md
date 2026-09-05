# Audit verdict — ts7-probe and ts7-probe-2 (the bridge loader in probe), round 1

Subject: the uncommitted working tree of `/home/user/fleet/probe` at `b331d93` plus the two units' edits and the Orchestrator's receipt-fence fix (nine files). Brief: `audit-probe-brief.md`. Evidence: `tmp/units/ts7-probe.diff.txt` and `ts7-probe.status.txt`.

## Lanes

| Lane | Role | Engine | Ran | Terminal line |
| --- | --- | --- | --- | --- |
| Subjective | `reviewer` | Opus 5 | yes, Workflow `wf_218bbb85-35e` node `probe-audit:subjective` | `VERDICT: FAIL 7; outside the claims: F1, F2, F3` |
| Objective | `reviewer` | Opus 5, the recorded substitution for the dark Sol bench | yes, node `probe-audit:objective` | `VERDICT: FAIL 3; outside the claims: F1, F2, F3, F4, F5, F6, F7, F8` |
| Checker | `checker` | Sonnet | yes, node `probe-audit:checker` | `VERDICT: PASS; outside the claims: none` |

No verifier lane in this round: the Orchestrator's own deciding runs (`orchestrator-measurements.md` § The probe deciding run and § The second probe deciding run) carry the gate evidence — `format:check`, `lint:check`, `check`, `build` exit 0; the whole suite red only on the Oxlint `initialize` deadline under load; the bin file and `Probe.test.ts` green alone.

## Reconciliation per claim

| Claim | Ruling | Basis |
| --- | --- | --- |
| 1 resolution order, one require, TSDoc | CONFIRMED | both lanes |
| 2 error contract, `malformed` fit | CONFIRMED, with the message's overstatement carried | objective F1 |
| 3 `collectRangeMajors` | REFUTED on the comparator boundary | objective lane: `'^6.0.3 <6.5.0'` returns `['6']` against the `@remarks` |
| 4 fixtures, the positive row | CONFIRMED | objective lane; the row can fail on the defect it pins; what it does not prove is objective F5 |
| 5 type imports, untouched files | CONFIRMED | every lane |
| 6 manifest, peers, lockfile | CONFIRMED, the `libc` loss carried | objective F6 |
| 7 guide parity and prose | REFUTED | subjective lane: `types.ts:244` false for a bridged workspace, the missing consequence sentence, the garden path at `:43`, the hard-coded `6.0.3`, the `loadWorkspaceModule` row; objective F3 |
| 8 scope, no commit or revert | CONFIRMED | checker and objective lane (reflog read) |

## Findings outside the claims

| Finding | Ruling | Carrier |
| --- | --- | --- |
| Subjective F1 duplicated rationale in `Probe.ts` | accepted | `probe-fix` item 5 |
| Subjective F2 `@example` unasserted | accepted | `probe-fix` item 8 |
| Subjective F3 and objective F5 the bridge never drives an inspection | accepted | `probe-fix` item 9 |
| Objective F1 message falsifiable by ordering | accepted; one message for every way the bridge cannot serve | `probe-fix` item 6 |
| Objective F2 bridge value unchecked | accepted | `probe-fix` item 6 |
| Objective F3 the guide's "neither" | accepted | `probe-fix` item 3 |
| Objective F4 declarations import the bridge's types | recorded, not changed: the same shape as `b331d93`, whose declarations imported the optional `typescript` peer's types; the guide names the consumer's install | `probe-fix` item 3 (the sentence); the commit message |
| Objective F6 the lockfile lost its `libc` rows | accepted; the Orchestrator regenerates with npm 11 after the fix unit exits | Orchestrator step |
| Objective F7 major-versus-range comparison | noted; predates the change | none (recorded here) |
| Objective F8 duplicated fixtures | accepted, `tests/setupServer.ts` granted | `probe-fix` item 10 |

Terminal: FAIL 3, 7 → fix round `probe-fix` dispatched on Opus `implementer`; its audit runs on Opus lanes under the same substitution.
