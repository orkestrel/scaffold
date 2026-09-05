# Audit verdict — ts7-seven (stage 2 of the TypeScript 7 move in scaffold), round 1

Subject: commit `6c46f547` on the branch (`typescript` `^7.0.2`, the `typescriptCompilerFolder: ''` override in the two checked-in vite configs and the three `dts` templates, `APP_BROWSER_TYPESCRIPT_RANGE` and its spread, the range literals, the prose in `guides/scaffold.md`, `PROPOSAL.md`, and `ROADMAP.md`, the rebuilt `host.json`). Brief: `audit-scaffold-brief.md`. Evidence: `tmp/units/ts7-seven.diff.txt` and `ts7-seven.status.txt`.

## Lanes

| Lane | Role | Engine | Ran | Terminal line |
| --- | --- | --- | --- | --- |
| Subjective | `reviewer` | Opus 5 | yes, Workflow `wf_947dba29-54e` node `audit:subjective` | `VERDICT: FAIL 6; outside the claims: O1, O2, O3, O4` |
| Objective | `reviewer` | Opus 5, the recorded substitution for the dark Sol bench (`codex: command not found` at session start; re-read at dispatch, still dark) | yes, node `audit:objective` | `VERDICT: FAIL 6 broken, 5 and 8 unresolved; outside the claims: F1, F2, F3` |
| Checker | `checker` | Sonnet | yes, node `audit:checker` | `VERDICT: PASS none; outside the claims: helpers.test.ts-green-unresolved, roadmap-new-rule-referral` |
| Verifier | `verifier` | Sonnet | yes, node `verify` | `GATES: GREEN` (the release-mode distribution proof red on the one expected row) |

No lane collapsed; the objective lane is Opus on the recorded substitution, and the Sol bench stayed dark through the round.

## Reconciliation per claim

| Claim | Ruling | Basis |
| --- | --- | --- |
| 1 pin, `tsc --version`, no tsconfig | CONFIRMED | objective lane; verifier printed `Version 7.0.2` |
| 2 the override at five sites, the truthiness guard, byte-identity | CONFIRMED | objective lane read `unplugin-dts` and `CompilerState.js`; byte-identity population is core and server, so the browser template's override is unpinned (objective F1, carried) |
| 3 the browser fork, its test, TSDoc, guide | CONFIRMED | subjective lane, with the fold-in refuted by the `TABLES` invariant |
| 4 range literals | CONFIRMED | objective lane and checker; `helpers.test.ts` green settled by the verifier's `npm test` |
| 5 `host.json` digests | CONFIRMED | membership by the objective lane; values by the verifier's chain (`tests/config.test.ts` regenerates and compares) |
| 6 the prose | REFUTED | subjective S1 to S4 and O1 to O4, objective claim 6 (the `audit` sentence names the wrong actor; ragged lines), checker's `a new rule` referral ruled as a hit to recast |
| 7 scope honesty | CONFIRMED | status and diff by every lane; the "no discarding git command" conjunct rests on the Orchestrator's own dispatch record (the role's allowlist and the report) |
| 8 the gates | CONFIRMED | verifier `GATES: GREEN` |

## Findings outside the claims

| Finding | Ruling | Carrier |
| --- | --- | --- |
| Subjective O1 "ceiling" | accepted | `seven-fix` item 8 |
| Subjective O2 test map | accepted | `seven-fix` item 4 |
| Subjective O3 and objective claim 6 ragged lines | accepted for the four lines the campaign amended; the file's other long lines predate it | `seven-fix` item 9 |
| Subjective O4 "no dependency cost" | accepted | `seven-fix` item 10 |
| Objective F1 browser override unpinned | accepted | `seven-fix` item 11 |
| Objective F2 duplicated packuments | accepted, `tests/setupServer.ts` granted to the fix unit | `seven-fix` item 12 |
| Objective F3 the bundled 5.9.3 lib set for every generated workspace | accepted as a recorded tradeoff, not a mechanism change | `seven-fix` item 2 |
| Objective noted: the fresh-install `ERESOLVE` reaches this repository's own manifest | carried by reconciliation R6 (the `probe` release precedes `main`) | ledger |

Terminal: FAIL 6 → fix round `seven-fix` dispatched on Opus `implementer`; its audit runs on Opus lanes again under the same substitution.
