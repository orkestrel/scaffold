# L6 evaluation command lookup

Lookup only; no plan, run, inference, or comparison command was executed. Source forms below assume the scaffold checkout root for built command paths. Stage output paths are prospective and reserved under `tmp/units`; the evaluation base is `results/l14/evaluation`.

## Pilot refusal and stage contents

A strict aggregate-pilot refusal does not by itself block feasible records/full-view evaluation. The matrix planner always requires a frozen manifest and an accepted resource manifest for each selected key/thinking setting. It emits records cells from those inputs; it emits full cells only if that configuration also has an accepted full-view manifest. For aggregate, a missing or `accepted !== true` pilot is omitted and written to that plan's `.infeasible.json` as `aggregate pilot absent or infeasible`. Thus refusal remains explicit and does not turn into an empty aggregate treatment. This matches the matrix rule to retain infeasibility and continue feasible records/full-view comparisons ([matrix protocol](.orkestrel/agent/instruments/units/aggregates/matrix.md:43); [planner prerequisites and omission](.orkestrel/agent/instruments/harness/bench5/matrix/Matrix.ts:365), [aggregate/full eligibility and emitted entries](.orkestrel/agent/instruments/harness/bench5/matrix/Matrix.ts:404)).

Required inputs for each `ROOT/KEY-thinkN` are `freeze/manifest.json` and `resource/manifest.json`; a feasible full arm additionally requires accepted `full/manifest.json`. Accepted aggregate cells require the pilot manifest and its referenced fit. Stage selections are fixed: A is q2 on copies 2–5; B is g2, g4, q4 on copies 2–5; C is q2, g2, g4, q4 on copies 6–8. The planner includes both `think0` and `think1` for every selected key ([stage constants](.orkestrel/agent/instruments/harness/bench5/matrix/constants.ts:8); [stage planning loop and manifests](.orkestrel/agent/instruments/harness/bench5/matrix/Matrix.ts:365)).

## Prospective l14 commands

From the scaffold root, create three distinct plans:

```text
node .orkestrel/agent/instruments/harness/.build/bench5/matrix.js plan --root .orkestrel/agent/instruments/results/l14 --stage A --out tmp/units/aggregate-final-evaluation-l14-A.json
node .orkestrel/agent/instruments/harness/.build/bench5/matrix.js plan --root .orkestrel/agent/instruments/results/l14 --stage B --out tmp/units/aggregate-final-evaluation-l14-B.json
node .orkestrel/agent/instruments/harness/.build/bench5/matrix.js plan --root .orkestrel/agent/instruments/results/l14 --stage C --out tmp/units/aggregate-final-evaluation-l14-C.json
```

Each plan is create-only. It also writes adjacent execution manifests under `executions/`, cache directories beneath each `KEY-thinkN/cache/`, and `<plan>.infeasible.json`. Each eligible cell's plan entry names `--run --live --copy COPY --manifest MANIFEST --cache CACHE`; the explicit execution manifest binds the l6 key, thinking setting, arm, copy, freeze, resource, and, for full, the accepted full-view bound. Plan creation accepts `--root DIR --stage A|B|C --out PATH`; model phases require `--live` ([entry usage and plan dispatch](.orkestrel/agent/instruments/harness/bench5/matrix/Matrix.ts:66); [plan entry construction](.orkestrel/agent/instruments/harness/bench5/matrix/Matrix.ts:471)).

To execute a generated stage serially, the harness series runner consumes its plan and dispatches each entry through `run-one`; `--base` is the run output root and `--budget` is seconds. Prospective l14 forms:

```text
node .orkestrel/agent/instruments/harness/.build/tools/series.js --plan tmp/units/aggregate-final-evaluation-l14-A.json --base .orkestrel/agent/instruments/results/l14/evaluation --budget SECONDS
node .orkestrel/agent/instruments/harness/.build/tools/series.js --plan tmp/units/aggregate-final-evaluation-l14-B.json --base .orkestrel/agent/instruments/results/l14/evaluation --budget SECONDS
node .orkestrel/agent/instruments/harness/.build/tools/series.js --plan tmp/units/aggregate-final-evaluation-l14-C.json --base .orkestrel/agent/instruments/results/l14/evaluation --budget SECONDS
```

The runner supplies the per-cell output directory as `--out` via `run-one`; the matrix-generated `args` carry the explicit manifest/cache/copy flags. It stops at the budget boundary, returns 1 on a run failure and 2 for an unfinished run. Long execution must use the dispatch launch wrapper under a hard cap; no duration/budget choice is made here ([series usage and semantics](.orkestrel/agent/instruments/harness/tools/series.ts:1), [dispatch to run-one](.orkestrel/agent/instruments/harness/tools/series.ts:108), [run-one adds output path](.orkestrel/agent/instruments/harness/tools/run-one.ts:139), [launch contract](.agents/skills/orkestrel-dispatch/references/launch.md:1)).

The matrix comparison command accepts repeated `--plan FILE`; it reads completed l6 runs under the given base and includes each plan's infeasibility records in the report. Example report form is `node .orkestrel/agent/instruments/harness/.build/bench5/compare.js report --base .orkestrel/agent/instruments/results/l14/evaluation --plan tmp/units/aggregate-final-evaluation-l14-A.json --plan tmp/units/aggregate-final-evaluation-l14-B.json --plan tmp/units/aggregate-final-evaluation-l14-C.json --out tmp/units/aggregate-final-evaluation-l14-report.json`. The executable accepts repeated `--plan` and `--shadow` flags ([comparison argv](.orkestrel/agent/instruments/harness/bench5/matrix/Comparison.ts:28); [comparison entry](.orkestrel/agent/instruments/harness/bench5/compare.ts:1)).

## Separate judge-shadow command

Judge shadow is an independent operation over a valid maintained aggregate run, not a score substituted for an answer-model cell. L6 shadow refuses an aggregate run with parsing/feasibility failures or a non-aggregate arm. Its exact form is `node .orkestrel/agent/instruments/harness/.build/bench5/shadow.js --run RUN_DIR --cache CACHE_DIR --out SHADOW.json --live [--url URL] [--copies COPIES_DIR]`. `--live` permits fresh judge requests; without it the shadow is cache-only and requires the cache's `judge.jsonl`. To place the result in the separate judge table, add `--shadow SHADOW.json` to the comparison `report` command above (repeat for additional shadows) ([shadow CLI](.orkestrel/agent/instruments/harness/bench5/shadow.ts:1), [l6 aggregate validity gate](.orkestrel/agent/instruments/harness/bench5/shadow.ts:702), [cache-only/live behavior](.orkestrel/agent/instruments/harness/bench5/shadow.ts:737), [separate report table](.orkestrel/agent/instruments/harness/bench5/matrix/Comparison.ts:346), [matrix report description](.orkestrel/agent/instruments/units/aggregates/matrix.md:47)).

## Scope and uncertainty

This lookup confirms command contracts and stage selection only. It does not verify that every l14 key has the required accepted freeze/resource/full inputs, select a launch budget, or determine which cells the prospective plans would emit. Those depend on the manifests present when a plan is created. The exact per-cell arguments are generated from those manifests rather than safely knowable in advance.
