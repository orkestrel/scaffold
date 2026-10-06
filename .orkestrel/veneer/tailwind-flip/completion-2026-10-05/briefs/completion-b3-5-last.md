## Fifth launch — 2026-10-06

The lookup repair passes both widened preservation halves. Formatting, lint, typecheck, and browser setup pass. Acceptance remains incomplete because the after journey crashes with `RangeError: Max payload size exceeded` (`WS_ERR_UNSUPPORTED_MESSAGE_LENGTH`, WebSocket status 1009). Its child exits 1; the queue runner exits 65 because the crash leaves no `report.json`.

The widened halves bind their open panels as follows:

| State | Lookup |
| --- | --- |
| Tooltip | Read the opened trigger's `aria-describedby` and resolve that element by ID. |
| Popover | Read the opened trigger's `aria-describedby` and resolve that element by ID; collect `h3.popover-header` only inside it. |
| Dropdown | Select `.dropdown-menu.show[data-popper-placement]`, carrying the engine's open and placement markers. |
| Modal | Select `.modal.show[aria-modal="true"]`, carrying the engine's open and modal markers. |
| Offcanvas | Select `.offcanvas.show[aria-modal="true"]`, carrying the engine's open and modal markers. |
| Toast | Read the opener's `aria-controls` and resolve that element by ID, the same relation the showcase consumes to show the toast through its engine. |

The panel-count expectation runs unconditionally and requires one panel for each open state and zero for closed. The header expectation also runs unconditionally, requiring exactly one `h3.popover-header` for popover and zero collected headers for other states. The preservation population includes the main region and this bound panel's subtree, replacing the broad body-level tip selector. No lint suppression was added.

Every command ran in the requested order through this wrapper, with a fresh folder:

```text
flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder FOLDER --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

The table's command aliases expand exactly as follows; `FOLDER` is the row's linked directory:

```text
FORMAT = ./node_modules/.bin/oxfmt --config .oxfmtrc.json --write tests/setupStyles.ts tests/setupStyles.test.ts tests/setupBrowser.ts tests/setupBrowser.test.ts tests/src/tailwindcss/index.test.ts tests/app/browser/integration.test.ts
PRESERVATION = env CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --project journey:dark-390 -t "attributes every component departure"
AFTER = env CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=FOLDER/report.json
```

Seconds and exits come from each folder's `end.json`:

| Queue folder | Kind | Command | Exit | Seconds |
| --- | --- | --- | ---: | ---: |
| [completion-b3-format-5](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-format-5) | command | `FORMAT` | 0 | 0.308 |
| [completion-b3-format-check-5](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-format-check-5) | command | `npm run format:check` | 0 | 4.256 |
| [completion-b3-lint-check-5](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-lint-check-5) | command | `npm run lint:check` | 0 | 1.567 |
| [completion-b3-check-5](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-check-5) | command | `npm run check` | 0 | 62.472 |
| [completion-b3-preservation-5](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-preservation-5) | command | `PRESERVATION` | 0 | 214.641 |
| [completion-b3-setup-browser-5](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-setup-browser-5) | command | `npm run test:setup:browser` | 0 | 192.659 |
| [completion-b3-journey-after](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-journey-after) | journey | `AFTER` | 65 (child 1) | 634.844 |

The isolated preservation run passes both selected tests, with 22 tests skipped by the title filter; Vitest reports 212.55 s. Browser setup passes 187 tests, with Vitest reporting 190.87 s. Both the isolated preservation run and the after journey emit all 28 width/theme/state readings with zero preflight departures, zero unattributed departures, and zero lost boxes.

The `Component preservation duration` readings, rounded to four decimal places, are:

| Run | 1280 px | 390 px |
| --- | ---: | ---: |
| `completion-b3-preservation-5` | 102.2415 s | 96.6469 s |
| `completion-b3-journey-after` | 139.4077 s | 118.6077 s |

The after journey's failed titles are unavailable: the runner crashes before producing the JSON test report or final Vitest totals. This is not a zero-failure result. The [stderr log](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-journey-after/stderr.log) records the WebSocket receiver failure; [end.json](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-journey-after/end.json) records 634.844 runner seconds, child exit 1, and the missing-report error. The cost sampler's `measure.jsonl` and manifest remain in the run folder, but the runner did not collect the journey artifact set after the missing report. The empty host-bound set admits no exception for this failed run. No completed-run cost verdict against the 493.962 s before run or acceptance comparison against `jb1-1` and `jb1-2` is claimed.

The checkout remains detached at `ec37454`. No commit or sub-agent was created. This launch's source change is confined to the owned preservation case; the other standing edits, including the ruled index repair, remain. The final `git status --porcelain` is:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/tailwindcss/index.test.ts
```

Regenerated artifacts: [candidate.patch](/home/user/veneer/tmp/units/completion-b3/candidate.patch) and [status.txt](/home/user/veneer/tmp/units/completion-b3/status.txt). This section is appended to [report.md](/home/user/veneer/tmp/units/completion-b3/report.md).