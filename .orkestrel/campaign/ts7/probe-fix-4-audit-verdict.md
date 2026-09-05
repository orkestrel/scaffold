# Audit verdict — ts7-probe-fix-4 (the bridge loader in probe), round 4, the close

Subject: the uncommitted tree of `/home/user/fleet/probe` over `b331d93` after the round-4 builder. Brief: `audit-probe-fix-4-brief.md`. Evidence: `tmp/units/ts7-probe-fix-4.diff.txt` and `ts7-probe-fix-4.status.txt`.

## Lanes

| Lane | Role | Engine | Ran | Terminal line |
| --- | --- | --- | --- | --- |
| Subjective | `reviewer` | Opus 5 | not run this round: round 3's subjective lane prescribed the edits this round transcribed verbatim | round 3: `VERDICT: FAIL 1, 3; outside the claims: F1, F2, F3` |
| Objective | `reviewer` | Opus 5 (substitution for the dark Sol bench) | not run this round, for the same reason | round 3: `VERDICT: FAIL 1, 2, 3; outside the claims: F1, F2, F3` |
| Checker | `checker` | Sonnet | yes, Workflow `wf_51c9d6b8-ef2` node `r4p:checker` | `VERDICT: FAIL 2, 3; outside the claims: none` |
| Gates | Orchestrator | — | deciding chain 4 (`instruments/probe-decide-4.sh`) and the direct timing instruments | `orchestrator-measurements.md` § Probe deciding chain 4 and § The deadline's cause |

## Reconciliation per claim

| Claim | Ruling | Basis |
| --- | --- | --- |
| 1 the eight edits | CONFIRMED | checker |
| 2 one `Toolchain` account everywhere | REFUTED at one untouched site: `src/core/types.ts:453`, `ProbeInterface.toolchain`'s doc line in the retired vocabulary | checker; carried by `probe-fix-5` edit 1 |
| 3 the prose and the fill | REFUTED on the split row's stale comment ("a second workspace inside the same scratch … both cases") | checker; carried by `probe-fix-5` edit 2 |
| 4 the two rows | CONFIRMED | checker |
| 5 scope | CONFIRMED | checker |

## The gates

`format:check`, `lint:check`, `check`, and `build` exit 0 over the final tree, as do `test:setup`, `test:policy`, `test:config`, and every scoped run of `helpers.test.ts`, `TypeStage.test.ts`, and `errors.test.ts`; `Probe.test.ts` passes alone. The bin file's rows, the guides receipt row, and the Probe rows that mint a token red intermittently on the Oxlint `initialize` deadline, which the direct measurements trace to the type stage's cold program build (2.0 to 2.3 s on this four-CPU host) sharing the event loop with the lint client's 2 s deadline; the change touches neither, the same rows passed alone earlier in the day, and the seam is recorded as a successor item for `probe`'s next visit. The gates that the change can move are green; the timing rows are carried to the record rather than diagnosed as this change's.

Terminal: the two refutations close in `probe-fix-5` (two exact sentences), verified by the Orchestrator's presence check over the final tree; then the landing commit.
