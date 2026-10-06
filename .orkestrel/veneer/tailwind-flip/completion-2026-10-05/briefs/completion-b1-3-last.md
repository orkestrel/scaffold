**Third pass — 2026-10-05**

The requested repairs and validation are complete on detached veneer `96065a7`. The static gates, full setup/browser suite, focused journeys, and full journey run all passed. `completion-b1-journey-3` passed 94 tests, skipped none, and reported no failed titles in 456.593 runner seconds.

The review findings are applied in the owned files:

- **Refusal roots:** every non-tip family observes the trigger’s figure (or region) plus its targets from the engine’s exported `resolveTargets`, imported through the setup module’s existing browser barrel. This reuses the engine’s `data-bs-target` and `href` resolution exactly. Tooltip and popover retain the trigger plus `aria-controls` and `aria-describedby`. The added modal proof plants a target outside the figure without `aria-controls`: delayed `hide.bs.modal` on that target rejects, while the same event on an unrelated outside element is accepted and its delivery is asserted.
- **Disclosure sufficiency:** the proof of immediate completion requires `hidden` after `{Enter}{Enter}` and exactly `show`, `shown`, `hide`, `hidden` in order. It has no either-outcome branch. The initial stricter reading failed with `expected 'shown' to be 'hidden'`: the zero-duration sheet still depended on the engine’s completion timer. The fixture finishes the panel’s native height transitions on click, making both activations eligible before the next key. Its separate delayed-transition section still proves the refused second activation and excludes an unrelated panel’s lifecycle. Engine code and wait budgets are unchanged.
- **Revert evidence:** the disclosure count, stability filter, and refusal roots were each reverted, observed red, restored, and observed green. Refusal roots have separate tip and non-tip reverts in the following readings.
- **TSDoc and comments:** root-selection TSDoc states each family’s roots and identifies a sibling inside a tip figure as an independent specimen. The count comment states: “The engine emits show.bs.collapse or hide.bs.collapse only for an activation it accepts.” The probe narrative and figure-wide state premise are removed.
- **Host-bound proposal:** the amended patch removes journey-member prose from `lanes.md:61` and `host-bound.md:3` and records the requested departure sentence in both journey bullets. The Orchestrator supplies the landing SHA.

The revert readings failed only the selected defect proofs; every restoration passed:

| Revert | Red assertion or error | Red → green result |
| --- | --- | --- |
| Trigger-capture availability count | `Condition "Expand details completes {Enter}{Enter}" did not hold within 5000ms (waited 5001.10000000149ms)` | 1 failed → 1 passed |
| Removed stability `contains` filter | `Refusal emitted a delayed lifecycle event` while accepting the unrelated sibling | 1 failed → 1 passed |
| Figure root for tooltip and popover | `Refusal emitted a delayed lifecycle event` while accepting the sibling inside the figure | 2 failed → 2 passed |
| Missing non-tip engine targets | `promise resolved "undefined" instead of rejecting` at the modal target’s `.rejects.toThrow('Refusal emitted a delayed lifecycle event')` | 1 failed → 1 passed |

Every queued command is recorded in the following table. `R` is `/home/user/veneer/tmp/units/journey-cost/runs`, and `F` is the folder in its row. All rows use `--kind command` except `completion-b1-journey-3`, which uses `--kind journey`. Each command runs through:

```text
flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder R/F --kind K --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

`B` and `J` expand as follows, with the row’s absolute folder substituted for `R/F`:

```text
B = npm run test:setup:browser -- --configLoader runner --reporter=json --outputFile=R/F/report.json
J = CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=R/F/report.json
```

The pattern names in the command column expand to `D = 'settles accepted disclosure bursts'`, `S = 'filters delayed sibling'`, `T = 'excludes a planted sibling'`, and `M = 'observes an engine target'`. `D|S|T|M` means the single alternation pattern containing those exact strings. Expanded argument order is retained in each folder’s `start.json`; exits and runner seconds come from `end.json`.

| Folder | COMMAND | Exit | Runner seconds |
| --- | --- | --- | --- |
| completion-b1-third-setup-initial | `B -t 'D\|S\|T\|M'` | 1 | 11.129 |
| completion-b1-third-count-initial | `B -t D` | 0 | 13.158 |
| completion-b1-third-count-red | `B -t D` | 1 | 20.014 |
| completion-b1-third-count-green | `B -t D` | 0 | 15.020 |
| completion-b1-third-stability-red | `B -t S` | 1 | 13.105 |
| completion-b1-third-stability-green | `B -t S` | 0 | 12.746 |
| completion-b1-third-tip-roots-red | `B -t T` | 1 | 14.906 |
| completion-b1-third-tip-roots-green | `B -t T` | 0 | 12.802 |
| completion-b1-third-engine-targets-red | `B -t M` | 1 | 15.561 |
| completion-b1-third-engine-targets-green | `B -t M` | 0 | 11.232 |
| completion-b1-third-format-owned | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --write tests/setupBrowser.ts tests/setupBrowser.test.ts tests/app/browser/integration.test.ts` | 0 | 0.289 |
| completion-b1-third-format-check | `npm run format:check` | 0 | 4.038 |
| completion-b1-third-lint-check | `npm run lint:check` | 0 | 1.409 |
| completion-b1-third-check | `npm run check` | 0 | 58.039 |
| completion-b1-third-setup-browser | `B` | 0 | 185.582 |
| completion-b1-third-build | `npm run build` | 0 | 20.877 |
| completion-b1-third-accordion | `J --project 'journey:light-390*' -t 'accordion'` | 0 | 62.470 |
| completion-b1-third-dark | `J --project 'journey:dark-390*' -t 'tooltip\|collapse\|navbar-390'` | 0 | 174.539 |
| completion-b1-third-j8 | `J --project 'journey:light-390*' -t 'J8'` | 0 | 24.966 |
| completion-b1-journey-3 | `J` (`--kind journey`) | 0 | 456.593 |

The full setup/browser suite passed 180 tests with none skipped. The focused accordion, dark-390, and J8 runs passed 2, 7, and 1 tests respectively; their filters excluded 20, 17, and 21 nonmatching tests. The dark filter also selects the paired-state matrix. No skip declaration was added. No import-reload rerun was needed. The build preceded all third-pass journey runs.

The full journey reading is `completion-b1-journey-3`: 94 registered, 94 passed, 0 skipped, and no failed titles. Its `end.json` records exit 0 and 456.593 seconds; Vitest reports 454.59 seconds. The runner recorded no artifact or sampler errors. Together with the second pass’s `completion-b1-journey-1` and `-2`, this supplies the requested passing journey evidence for the proposed empty journey host-bound set.

The exact amended shared-file proposal is [host-bound.patch](/home/user/veneer/tmp/units/completion-b1/host-bound.patch). It retains the `src:browser` provenance in each introduction and removes the historical journey-membership clauses. Both journey bullets become:

```markdown
- `journey`, `tests/app/browser/integration.test.ts`: none. The J8, accordion, tooltip, collapse, and navbar-390 titles left the set at veneer `<landing sha>` (`completion-b1-journey-1`, `-2`, `-3`).
```

Neither shared file was edited. The comparison baselines are J-B1 `runs/jb1-1` and `runs/jb1-2`; the Orchestrator owns acceptance and the landing SHA.

The refreshed artifacts are [candidate.patch](/home/user/veneer/tmp/units/completion-b1/candidate.patch), [status.txt](/home/user/veneer/tmp/units/completion-b1/status.txt), and the appended [report.md](/home/user/veneer/tmp/units/completion-b1/report.md). `git diff --check` passed. Only the owned tracked files changed; no commit or sub-agent was used. The final status is:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```