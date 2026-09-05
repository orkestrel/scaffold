# Audit verdict — ts7-probe-fix (the bridge loader in probe), round 2

Subject: the uncommitted working tree of `/home/user/fleet/probe` over `b331d93` after the two landing units, the fix unit, and the Orchestrator's lockfile pass. Brief: `audit-probe-fix-brief.md`. Evidence: `tmp/units/ts7-probe-fix.diff.txt` and `ts7-probe-fix.status.txt`.

## Lanes

| Lane | Role | Engine | Ran | Terminal line |
| --- | --- | --- | --- | --- |
| Subjective | `reviewer` | Opus 5 | yes, Workflow `wf_771a9101-0fb` node `r2:probe-subjective` | `VERDICT: FAIL 5; outside the claims: F1, F2, F3, F4, F5, F6, F7` |
| Objective | `reviewer` | Opus 5, the recorded substitution for the dark Sol bench | yes, on the resume of the same run after the first attempt failed on the session limit, node `r2:probe-objective` | `VERDICT: FAIL 3, 5; outside the claims: F1, F2, F3, F4, F5` |
| Checker | `checker` | Sonnet | yes, on the same resume | `VERDICT: PASS none; outside the claims: none` |

Gate evidence: the Orchestrator's deciding runs (`orchestrator-measurements.md` § Probe deciding run 2): the whole suite red only on the Oxlint `initialize` deadline, the file green alone.

## Reconciliation per claim

| Claim | Ruling | Basis |
| --- | --- | --- |
| 1 loader branches, message, `cause` | CONFIRMED | both lanes |
| 2 parser anchored, boundaries pinned | CONFIRMED | both lanes |
| 3 contract and prose | REFUTED on the `loadWorkspaceModule` Surface row: "carrying the native fault as `cause`" is false for the bridge that loads and cannot serve | objective lane |
| 4 the bridged inspection row | CONFIRMED | both lanes |
| 5 the factory at every scratch site | REFUTED as worded: the brief's five sites and the new row all call it; the disposed-compiler proxy site and the three real-link sites express installations the factory does not, correctly | both lanes; no tree change |
| 6 `@example` asserted, `missing` row | CONFIRMED | both lanes |
| 7 no mocks | CONFIRMED | both lanes |
| 8 scope | CONFIRMED | checker and objective lane |

## Findings outside the claims

| Finding | Ruling | Carrier |
| --- | --- | --- |
| Subjective F1 the `Toolchain` summary line | accepted | `probe-fix-2` edit 1 |
| Subjective F2 the earlier bullet's "resolved versions" | accepted | `probe-fix-2` edit 3 |
| Subjective F3 "the second term" names a position | accepted | `probe-fix-2` edit 6 |
| Subjective F4 and objective F3 the bridge branch's alias | accepted as the symmetric shape: both branches read the required value through the same guard and return that value; a binding typed `unknown` cannot be returned under the overloads because the guard narrows to a record carrying `createProgram`, not to the module type | `probe-fix-2` edit 7 |
| Subjective F5 and objective F1 the inline bridgeless workspace in `errors.test.ts` | accepted, `tests/src/core/errors.test.ts` granted | `probe-fix-2` edit 8 |
| Subjective F6 `carried` naming | not adopted: the brief delegated the name and the TSDoc states it; recorded | this verdict |
| Subjective F7 the two-expression signature cell | not adopted: the parity suite accepts the cell and the brief prescribed both overloads; recorded | this verdict |
| Objective claim 3 the Surface row's `cause` clause | accepted | `probe-fix-2` edit 4 |
| Objective F2 the bridged rows ungated on a host without directory links | accepted: gate with `it.runIf(DIRECTORY_LINKS)` as the runtime rows do | `probe-fix-2` edit 9 |
| Objective F4 the `oxlint` and `vitest` member docs in the resolved vocabulary | accepted | `probe-fix-2` edit 2 |
| Objective F5 the receipt section's missing caveat | accepted, one sentence | `probe-fix-2` edit 5 |

Terminal: FAIL 3, 5 (wording) → round 3 `probe-fix-2` on `builder` (Sonnet), every edit exact.
