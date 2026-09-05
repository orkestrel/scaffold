# Audit verdict — ts7-probe-fix-2 and ts7-probe-fix-3 (the bridge loader in probe), round 3

Subject: the uncommitted tree of `/home/user/fleet/probe` over `b331d93` after the landing units, the round-2 fix unit, the lockfile pass, the round-3 builder, and its successor. Brief: `audit-probe-fix-2-brief.md`. Evidence: `tmp/units/ts7-probe-fix-2.diff.txt` and `ts7-probe-fix-2.status.txt`.

## Lanes

| Lane | Role | Engine | Ran | Terminal line |
| --- | --- | --- | --- | --- |
| Subjective | `reviewer` | Opus 5 | yes, Workflow `wf_742cd5c9-418` node `r3p:subjective` | `VERDICT: FAIL 1, 3; outside the claims: F1, F2, F3` |
| Objective | `reviewer` | Opus 5, the recorded substitution for the dark Sol bench | yes, node `r3p:objective` | `VERDICT: FAIL 1, 2, 3; outside the claims: F1, F2, F3` |
| Checker | `checker` | Sonnet | yes, node `r3p:checker` | `VERDICT: FAIL 1; outside the claims: none` |

Gate evidence: the Orchestrator's deciding runs (`orchestrator-measurements.md`), with the solo runs over the final tree after round 4.

## Reconciliation per claim

| Claim | Ruling | Basis |
| --- | --- | --- |
| 1 the nine edits and their prose | REFUTED on two grounds: the brief still named `probe-fix-2`'s edit 8 (its successor `probe-fix-3` replaced it, which the brief's Subject recorded and its claim did not), and the guide sentence at `:455-456` hands the reader the workspace's `package.json` as the source of tool versions | every lane |
| 2 one `Toolchain` account | REFUTED: the summary and the member docs say "the target workspace's own manifest", the `@remarks` says "that tool's own manifest in the target workspace" | objective lane; subjective F4 |
| 3 the guide's one account | REFUTED: the prerequisite bullet, the receipt bullet's singular "the target workspace's manifest", and the `isToolchain` row's retired vocabulary | both lanes |
| 4 the loader shape and `check` green | CONFIRMED on the shape by both lanes; the gate by the Orchestrator's own `npm run check` over the final tree | both lanes, deciding chain |
| 5 the gated rows | CONFIRMED | every lane |
| 6 the errors fixture | CONFIRMED | both lanes |
| 7 scope | CONFIRMED | objective lane, checker |

## Findings outside the claims

| Finding | Ruling | Carrier |
| --- | --- | --- |
| Both lanes F1: `src/core/validators.ts:198` and the `isToolchain` row keep the retired vocabulary | accepted, `src/core/validators.ts` granted (TSDoc only) | `probe-fix-4` edits 3 and 4 |
| Subjective F2: the `bridged` TSDoc sentence's pronoun and "runs under" | accepted | `probe-fix-4` edit 7 |
| Subjective F3, objective F2: the fixture's default shape proved only under the gate | accepted: the row splits, the default half ungated | `probe-fix-4` edit 8 |
| Subjective F4: three spellings of one account | accepted: the `@remarks` form everywhere | `probe-fix-4` edits 1, 2, 5, 6 |
| Objective F3: the overloads' return rests on the runtime guard, both returns being `any` from `require` | recorded, no change; the comment in `helpers.ts` states it | this verdict |
| Checker: the round-3 brief asserted shape parity by analogy and the successor had to correct it | lesson recorded: a brief that claims two sites typecheck alike names the compile that proved it, or leaves the shape to the unit under a criterion | this verdict, the campaign debrief |

Terminal: FAIL 1, 2, 3 (vocabulary) → round 4 `probe-fix-4` on `builder` (Sonnet), every edit exact; its close is the checker over the transcriptions and the Orchestrator's deciding runs, the reviewer lanes having prescribed the text.
