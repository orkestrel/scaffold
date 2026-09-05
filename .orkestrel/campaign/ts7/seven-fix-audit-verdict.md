# Audit verdict — ts7-seven-fix (stage 2 in scaffold), round 2

Subject: the fix unit's uncommitted tree over `c4bee5da`. Brief: `audit-scaffold-fix-brief.md`. Evidence: `tmp/units/ts7-seven-fix.diff.txt` and `ts7-seven-fix.status.txt`.

## Lanes

| Lane | Role | Engine | Ran | Terminal line |
| --- | --- | --- | --- | --- |
| Subjective | `reviewer` | Opus 5 | yes, Workflow `wf_771a9101-0fb` node `r2:scaffold-subjective` | `VERDICT: FAIL 1, 2; outside the claims: F1, F2, F3, F4` |
| Objective | `reviewer` | Opus 5, the recorded substitution for the dark Sol bench | yes, node `r2:scaffold-objective` | `VERDICT: FAIL 1,2,4,5; outside the claims: F1,F2,F3` |
| Checker | `checker` | Sonnet | yes, node `r2:scaffold-checker` | `VERDICT: FAIL 1; outside the claims: none` |
| Verifier | `verifier` | Sonnet | not run: the node failed on the session limit (`You've hit your session limit · resets 4:10pm (UTC)`) before its first command; round 3's verifier runs the chain over the tree that carries both rounds' edits |

## Reconciliation per claim

| Claim | Ruling | Basis |
| --- | --- | --- |
| 1 prose as prescribed and lawful | REFUTED | every lane: "reports one non-blocking `dependencies` question" is a count of a set `releasesToQuestions` grows (the brief's own prescribed text); the checker: "That range" attaches to the wrong noun |
| 2 § Dependency floors true of the code | REFUTED on the same sentence; every enumerated pointer CONFIRMED | both reviewer lanes |
| 3 the added test and its control | CONFIRMED | both reviewer lanes |
| 4 `buildPackument` | CONFIRMED on the builder; the report's leftover record REFUTED | objective lane: `CLI.test.ts:1336` is an `/oxfmt` row and `:3586-3592` a third inline packument the report omits |
| 5 `PROPOSAL.md` | CONFIRMED on the rewraps and the fallback sentence; REFUTED on the C12 clause | both reviewer lanes: "7.1 replaces" outruns the record, which says a different API with no stability promise |
| 6 `host.json` | CONFIRMED on membership; the values by the verifier | both |
| 7 scope | CONFIRMED | every lane |

## Findings outside the claims

| Finding | Ruling | Carrier |
| --- | --- | --- |
| Subjective F1 the test name contradicts its bin control | accepted | `seven-fix-2` edit 4 |
| Subjective F2 destructure then rebuild | accepted | `seven-fix-2` edit 5 |
| Subjective F3 and objective claim 4: the report's leftover record | accepted as a record correction, not a code change: the inline packuments remaining in `tests/src/bin/CLI.test.ts` are the `/typescript` row at `:1273` and the `/oxfmt` rows at `:1336` and `:3586`, each a per-test override; a swap to the builder adds `name` and `version` to every record and needs its own run | this verdict; a successor item |
| Subjective F4 and objective claim 5: the C12 clause | accepted | `seven-fix-2` edit 8 |
| Objective F1 the multi-version row cannot discriminate the tag | accepted | `seven-fix-2` edit 6 |
| Objective F2 and subjective R1: the empty-array throw untested | accepted | `seven-fix-2` edit 7 |
| Objective F3 "fails the rollup" unproven | accepted; the weaker sentence the mechanism carries | `seven-fix-2` edit 1 |

Terminal: FAIL 1, 2, 4 (record), 5 → round 3 `seven-fix-2` on `builder` (Sonnet), every edit exact.
