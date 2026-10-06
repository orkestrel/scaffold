# Lane 4: place the pieces by measured slack (item 12 of the journey run-cost verdict)

Route: astra (implementation). You are the sole writer in your checkout `/home/user/.wave/journey-cost/4` (veneer `4d21de7` plus the integrated layer 1 candidate, applied as `tmp/units/journey-cost/integrated-2/candidate.patch`, lanes 0, 3 without item 5, 2, and 1; built `dist/`, own `node_modules`). No other process writes there.

## Objective

Item 12 of `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/journey-cost-2026-10-05/verdict.md` (adopted change row "12, placement by measured slack (layer 2)", lane 4) and `plan-v3.md` § Adopted changes "Item 12" (lines 294-327) and step 10 (lines 634-638): move the pieces that may move to the journey projects with measured slack, with the fewest moves, so the four projects end closer together. Only the host project changes; every case, assertion, control, reading, and logged line stays. The user ruled Q1 yes on 2026-10-05 (verdict § 9): each per-width preservation and partition half may run in another journey project while it builds its page from the light-1280 variant object, and the theme header table may run outside light-390 with its rows unchanged. Item 9 (the CDP domain cleanup, lane 3) is in the integrated candidate with P-H green, so light-390 and dark-390 are admitted destinations; dark-1280 wins a tie because it holds no host-bound title.

## Governing texts (read first)

- The verdict rows and plan sections named in the objective; the plan's gaps 10 and 11; `plan-v3.md:422` (the tail allowance) and `:455` (the load-independent check).
- The checkpoint readings (the Orchestrator's two full runs on the integrated candidate): the two checkpoint runs on the integrated candidate without item 5 (`runs/checkpoint2-journey-1` and `checkpoint2-journey-2`; wall 659.27 s and 528.32 s; each ran alone under the queue lock; `integrated-2/spans.txt`). Per project, from `report.json`'s per-file entries (start and end relative to the run's first start; the variant is identified by the titles each entry holds, which you confirm against the `journey/<variant>.txt` artifacts and cite):

| Run | Project | Start | End | Span | Cases | Failed (host-bound) |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | light-1280 (holds the four halves) | +0.0 s | +644.1 s | 644.1 s | 24 | none |
| 1 | dark-1280 | +0.7 s | +504.9 s | 504.2 s | 26 | none |
| 1 | light-390 (holds the theme header table) | +0.7 s | +486.0 s | 485.3 s | 22 | J8; accordion |
| 1 | dark-390 | +0.6 s | +422.1 s | 421.5 s | 20 | collapse |
| 2 | light-1280 | +5.1 s | +517.1 s | 512.1 s | 24 | none |
| 2 | dark-1280 | +2.0 s | +488.4 s | 486.4 s | 26 | none |
| 2 | light-390 | +0.0 s | +468.8 s | 468.8 s | 22 | J8; accordion |
| 2 | dark-390 | +0.3 s | +401.1 s | 400.8 s | 20 | tooltip; collapse |

The movable pieces' durations at their current hosts come from the same reports (the four halves `attributes every component departure … at 1280 px`, `… at 390 px`, `partitions the shared names … at 1280 px`, `… at 390 px` in light-1280; the theme header table `drives the 'theme' header table through the header buttons` in light-390). The checkpoint credit table is `integrated-2/credit.md`.
- The anonymous memory peaks and the cgroup limit from those runs' `measure.jsonl`: anonymous peaks read from `runs/checkpoint2-journey-1/measure.jsonl` and `checkpoint2-journey-2/measure.jsonl` (the `anonymous` field; the first checkpoint read 5 757 513 728 and 5 328 527 360 bytes against the cgroup limit of 14 345 031 680 bytes; the `renderers` field carries the per-renderer readings, which you read for the largest single-renderer peak); `oom` null in both.
- The contention factor on record, 1.15 to 1.67 (`plan-v3.md:298`; the J4 and partition readings it cites).
- The host-bound set: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/lanes.md` § Host-bound set. No host-bound title moves.
- The files: `JOURNEY_PLACEMENTS` and its comment in `tests/setupBrowser.ts` (near 5339-5346 at 4d21de7; re-resolve), `guides/veneer.md` § Variant placement (near 2336-2371 at 4d21de7; re-resolve: lane 0 edited the two titles and the section).
- The mutation targets: the coupling target for a preservation half and the partition target for a partition half (`tmp/units/journey-cost/mutation-targets.json`, names `coupling` and `partition`).

## Scope

- **Owned.** `tests/setupBrowser.ts` (`JOURNEY_PLACEMENTS` and its comment only), `guides/veneer.md` (§ Variant placement only), the report folder `/home/user/veneer/tmp/units/journey-cost/lane-4/`, and your checkout's `tmp/units/journey-cost/probes/`.
- **Off-limits.** Every other line; every case body; the host-bound titles' placement.

## The work

1. **Compute the placement.** From the checkpoint spans: for each project, its end time (the last case's end); for each movable piece (the four halves and the theme header table), its duration in its current project. Inflate light-1280's alone-phase work by the contention factor before balancing. Choose the assignment with the fewest moves that minimizes the largest project end, subject to: no host-bound title moves; a half's destination may be any of the four projects (light-390 and dark-390 admitted because item 9 is in the candidate); dark-1280 wins a tie. Record the computation (inputs, candidates considered, the chosen assignment, the predicted ends) in the report as a table; the figures are readings and predictions, not credits.
2. **Apply it** in `JOURNEY_PLACEMENTS` and its comment; update § Variant placement's prose to name the host of each piece and that each half still reads the light-1280 variant at its width.
3. **P4 (price window; the Orchestrator starts these):** prepare one scoped command per moved piece at its destination (the piece alone, `--project` the destination, `-t` its title), and one mutation command per moved piece through the queue (`mutations.ts` with the coupling target for a preservation half, the partition target for a partition half, the project set to the destination). Write them to `lane-4/prepared-commands.txt`. Run only the mutation commands yourself (through the queue, `--kind command`); the scoped duration runs are price readings the Orchestrator takes.
4. **P5 (the placement trial; the Orchestrator runs it):** prepare the full-run command with the sampler (`--kind journey`) and the comparison against both J-B0 runs (`compare.ts … --registration 92/0`). The trial must hold: `oom_kill` unchanged; the anonymous peak plus the largest single-renderer peak at or under the live cgroup limit; each host-bound title fails in the trial only if it failed in at least one J-B0 run; the line gate (the theme table's `Header statechart` line may name its new host in `variant`); the rows multiset equal after removing the reading-variant prefix; 92 registered, 0 skipped.
5. **Your gate:** `npm run test:setup:browser -- --configLoader runner`, `npm run check`, `lint:check`, `format:check`, `test:guides` (the guide titles must resolve), through the queue with distinct folders under `runs/lane4-*`.

## Host queue

Every Chromium or CPU-loading command runs through `flock -x /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/lane4-NAME --kind command --cwd /home/user/.wave/journey-cost/4 -- COMMAND`, one folder per run; the runner refuses a reused folder with exit 65. Never `--kind journey` yourself.

## Forbidden

No change to any case body, assertion, control, reading, or logged line; no move of a host-bound title; no install, commit, push, stash, or second writer; no figure typed from memory where a reading exists (cite the run folder for every number).

## Deviation contract

Stop and report when a moved piece reads red at its destination for a cause other than a host-bound title, when the fewest-moves assignment ties with no dark-1280 resolution, or when a guide title stops resolving. A red run of a probe you are writing is iteration.

## Return shape

`lane-4/report.md`: the placement computation table, the applied `JOURNEY_PLACEMENTS`, the prepared P4 and P5 commands, the mutation results by folder, the gate results by folder, the caller mapping for `JOURNEY_PLACEMENTS`, and `git diff --stat`. Your final message is the report's first paragraph and the path.

## Appended ruling (2026-10-05, after the deviation stop: one objective over both checkpoint runs)

The computation is accepted as read (`lane-4/computation.json`, `runs/lane4-computation`): under C1 the optimum places every half in dark-1280, under C2 five four-move assignments tie with the halves in light-390 and dark-390, and dark-1280 cannot break the C2 tie because it already sets C2's largest end. The brief gave no rule to collapse the two runs. Ruling, in this order:

1. **One objective over both runs and both factors.** For each assignment, predict the largest project end under C1 at f=1.15, C1 at f=1.67, C2 at f=1.15, and C2 at f=1.67 (the same model you ran), and score the assignment by the maximum of those four. Choose the assignment with the smallest score: the placement that is never worse than that bound on either checkpoint.
2. **Ties, in order:** the fewest moves; then the smallest spread between the largest and the smallest predicted project end, summed over the four scenarios; then the most pieces assigned to dark-1280; then the earliest in piece order (P1280, P390, Q1280, Q390, T) by destination order (light-1280, dark-1280, light-390, dark-390). State every tie that each rule broke.
3. **Report the chosen assignment beside the two per-run optima**, with its predicted ends under all four scenarios and the difference from each run's own optimum, so the cost of one placement serving both readings is on the record. No host-bound title moves; the theme header table may stay in light-390 or move as the objective says.

Then continue the brief from item 2 (apply the placement to `JOURNEY_PLACEMENTS` and § Variant placement) through item 5 (the mutations through the queue, the prepared P4 and P5 commands, and your gate: `test:setup:browser`, `check`, `lint:check`, `format:check`, `test:guides`). Write the report over `report.md`, keeping the current one as `report-1.md`.
