# Routing ledger for the `@orkestrel/agent` context campaign

Every dispatch, its engine, and every substitution, newest first. The briefing benchmark lives in the agent checkout's `tmp/bench3/`; its results live under `tmp/bench/results/v9/`.

## Bench readings

| Date | Bench | Reading |
| --- | --- | --- |
| 2026-10-09 | Codex (GPT-6 Astra) | live: `bench.ts --codex`, `codex-cli 0.160.1`, sandbox `read-only`, 11.1 s round trip, session `01a11fb5-6bbe-7dd3-8c21-e56a76a3e2d8` |
| 2026-10-09 | Cursor (Grok) | not probed; no Grok lane ran |

## Dispatches of 2026-10-09

| Unit | Role and engine | Required by `.agents/orchestration.md` | Remedy |
| --- | --- | --- | --- |
| Blind pass audit of `v9` (162 scorer passes, 9 chunks) | workflow nodes as `checker` on Haiku 5.5, effort high, run `wf_e1b4eff3-968` | as required | Astra checks its verdicts after it returns |
| `records-port` design round | `planner` on Opus 5.5 (native) and `analyst` driver on Haiku 5.5 with the lane on GPT-6 Astra, session `01a12049-5172-71e0-833d-81517acdb0a9`, 940.3 s; one brief, blind to each other | as required | none |
| Final check stage 1 (`f4-*`, `t2-*`, copies 1 to 4) | live runs through `launch.ts` under a 7,100 s cap, `series.ts` over `run-one.ts`, budget 5,400 s per launch | as required | none |
| Thinking probe | the Orchestrator's instrument `probes/think-probe.ts` on the 2B through `launch.ts`; 10 calls, completions 69 to 666 tokens | as required | none |
| Records port reconnaissance | `scout` on Haiku 5.5, read-only map of the bench3 ledger, `records.mjs`, `@orkestrel/agent` seams, and the desk | as required | none |
| `score-audit-2` check (batches 2 and 3) | `analyst` driver on Haiku 5.5; lane on GPT-6 Astra, session `01a12025-2e72-7552-9c5b-ee74c2930137`, 129.1 s, `VERDICT: PASS`; verdict `records-series-verdict.md` | as required | none |
| Blind scorer audit, batch 3 | workflow nodes as `checker` on Haiku 5.5, effort high, run `wf_ba6a53a7-759`; 18 items, 0 splits | as required | none |
| Records series `a5-records-v1`–`v8` | live runs through `launch.ts` under a 1,200 s cap, `run-one.ts`; 415.8 s to 472.5 s each | as required | none |
| Relevance probe | the Orchestrator's instrument `probes/judge-relevance.ts` on Mica through `launch.ts`, 86.7 s | as required | none |
| Records harness install gates | `verifier` on Haiku 5.5: `node --check` both files exit 0, `records-check.mjs` 253 of 253, `--check-ledger` refined and roundA exit 0; installed sha256 `59609d38417fd056…`, frozen files kept as `*.frozen-3d75138e` | as required | none |
| `records-candidate` audit | `analyst` driver on Haiku 5.5; lane on GPT-6 Astra, session `01a11fd9-ca6a-7020-b9ac-1c9b7f4c1b9d`, 1,027.5 s; verdict `records-candidate-audit-verdict.md` | as required | none |
| `records-final` | `builder` on Sonnet 5.5, brief `tmp/units/records-final-brief.md`; the report patch (`###` heading regex, byte tail comparison) applied by the Orchestrator | as required | none |
| Blind scorer audit, batch 2 | workflow nodes as `checker` on Haiku 5.5, effort high, run `wf_2feddc43-5a1`; 13 items, 0 splits | as required | Astra check queued with the records series audit |
| `scorer-revert` gates | `verifier` on Haiku 5.5; its field diff misread the backup with `require()`, so the Orchestrator reran the diff and the exit codes: `check.mjs` exit 0, `scorer-check.ts` exit 0 (26 of 26), fields equal `scenario.json.pre-negation` plus the `no … room` pattern | as required | none |
| `scorer-revert` | `builder` on Sonnet 5.5, brief `tmp/units/scorer-revert-brief.md`; accepted | as required | none |
| `score-audit` check | `analyst` driver on Haiku 5.5; lane on GPT-6 Astra, session `01a11fc0-2370-7072-93fe-96244da6da2c`, 233.8 s; verdict `score-audit-verdict.md` | as required | none |
| `frozen-harness` audit | `analyst` driver on Haiku 5.5; lane on GPT-6 Astra, journal `tmp/codex/frozen-harness.jsonl`, session `01a11fba-2f2f-7e63-940c-b0742935a992`, 668.5 s; verdict `frozen-harness-audit-verdict.md` | as required | none |
| Blind scorer audit (both designs' failures) | workflow nodes on Haiku 5.5 with no role and no effort, on the user's instruction to score with Haiku; resumed by run id `wf_704d43f9-b92` on the user's instruction to keep finished work | `checker` on Haiku 5.5 with an effort | Astra checks its verdicts after it returns |
| Records rulings (candidate) | `opus` on Opus 5.5 (apply), `verifier` on Opus 5.5, `reviewer` on Opus 5.5; resumed by run id `wf_e293b50f-c7b` on the user's instruction | `builder` on Sonnet 5.5, `verifier` on Haiku 5.5, `analyst` on Astra | Astra audits the records candidate before its series |
| Records wiring (candidate) | `opus`, `verifier`, `reviewer`, all on Opus 5.5 | objective implementation on `astra`; `verifier` on Haiku 5.5; correctness review on `analyst` (Astra live, unprobed) | Astra audits the records candidate |
| Records module (`tmp/bench3/records.mjs`) | `opus`, `verifier`, `reviewer`, all on Opus 5.5 | as for the wiring | covered by the records candidate audit |
| Records plan (`RECORDS-PLAN.md`) | `opus` writer, `reviewer` attack, `opus` repair, all on Opus 5.5 | design round of `planner` and `analyst`, blind to each other | Astra holds the missing objective design lane |
| Answer-run fixes and the credit-check scorer | `opus` writers, `verifier` and `reviewer` on Opus 5.5 | objective implementation on `astra`; `verifier` on Haiku 5.5; review on `analyst` | `frozen-harness` audit |
| Tail fix and scorer negation | as the preceding row | as the preceding row | `frozen-harness` audit |
| Answer-gap fix (answer cue, recall budget) | as the preceding row | as the preceding row | `frozen-harness` audit |

Substitution not recorded at the time: Opus 5.5 held the objective review and implementation lanes while the Astra bench was live and unprobed; no bench reading made Astra dark. Gates that ran on Opus 5.5 in place of Haiku 5.5 report exit codes and need no re-run.

## Long-running commands

Live runs through `a4-refined-v6` ran from `tmp/bench/results/v7/tools/run-one.sh`, a bash script outside `launch.ts`. From `a4-refined-v7` on, each live run launches through the dispatch skill's `launch.ts` under a cap, running `tmp/bench/results/v7/tools/run-one.ts`.
