**Second pass — 2026-10-05**

The requested implementation and validation are complete on detached veneer `96065a7`. Every queued command exited 0. Both full journey runs passed 94 registered tests, skipped none, and reported no failed titles.

`observeShowcaseRefusal` selects the trigger and its `aria-controls` and `aria-describedby` targets for tooltip and popover specimens. Their live figures contain independent specimens, so a sibling's lifecycle and ARIA activity cannot describe the observed specimen. Other families retain their figure roots because their state spans the figure's contents and the traces showed no corresponding sibling leak. The root-selection TSDoc records these reasons. The specimen's `Refusal changed state` check and the stability observer's contract are unchanged.

The first-pass repairs stand: accepted disclosure activations come from the panel's lifecycle events, and J8 waits for `show` without `showing` before reading the original upload text. The retained collapse trace at `/home/user/veneer/tmp/units/completion-b1/completion-b1-trace-full-2-trace.jsonl` proves the undercount: both trigger-capture availability readings were false, while show/shown/hide/hidden completed by 70.2 ms. No assertion or wait was loosened.

The root-selection proofs passed for tooltip and popover in `completion-b1-second-setup-focused`: 2 passed, with 177 nonmatching tests excluded by the command filter. Each proof records one delivered sibling lifecycle event inside the same figure and accepts the observation despite that event and the sibling's ARIA write. Each separately rejects events on the trigger, its controlled tip inside the figure, and its described tip outside the figure with `Refusal emitted a delayed lifecycle event`. Removing the trigger's description during the action still rejects with the existing specimen-state error. These are planted DOM events proving the recorder boundary; the focused and full journeys exercise the real engine.

The full setup/browser project passed 179 tests with none skipped. The focused journey readings were accordion 2 passed, dark-390 7 passed, and J8 1 passed. Their command filters excluded 20, 17, and 21 nonmatching tests respectively; no skip declaration was added. The dark filter also selects the paired-state matrix case.

The table records every queued command. `R` is `/home/user/veneer/tmp/units/journey-cost/runs`, `F` is the row's folder, and `K` is its kind. Each command ran through:

```text
flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder R/F --kind K --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

`J` expands to the following command, with the row's absolute folder substituted for `R/F`:

```text
CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=R/F/report.json
```

| Folder | Kind | COMMAND | Exit | Runner seconds |
| --- | --- | --- | --- | --- |
| completion-b1-second-format-owned | command | `./node_modules/.bin/oxfmt --config .oxfmtrc.json --write tests/setupBrowser.ts tests/setupBrowser.test.ts tests/app/browser/integration.test.ts` | 0 | 0.302 |
| completion-b1-second-format-check | command | `npm run format:check` | 0 | 4.457 |
| completion-b1-second-lint-check | command | `npm run lint:check` | 0 | 1.837 |
| completion-b1-second-check | command | `npm run check` | 0 | 60.792 |
| completion-b1-second-setup-focused | command | `npm run test:setup:browser -- --configLoader runner -t 'excludes a planted sibling' --reporter=json --outputFile=R/F/report.json` | 0 | 13.720 |
| completion-b1-second-setup-browser | command | `npm run test:setup:browser -- --configLoader runner --reporter=json --outputFile=R/F/report.json` | 0 | 184.322 |
| completion-b1-second-build | command | `npm run build` | 0 | 21.886 |
| completion-b1-second-accordion | command | `J --project 'journey:light-390*' -t 'accordion'` | 0 | 62.962 |
| completion-b1-second-dark | command | `J --project 'journey:dark-390*' -t 'tooltip\|collapse\|navbar-390'` | 0 | 193.012 |
| completion-b1-second-j8 | command | `J --project 'journey:light-390*' -t 'J8'` | 0 | 28.561 |
| completion-b1-journey-1 | journey | `J` | 0 | 484.177 |
| completion-b1-journey-2 | journey | `J` | 0 | 470.817 |

Each folder's `start.json` retains the expanded command; `end.json` supplies the exits and seconds. The build preceded every second-pass journey. No import-reload rerun was needed, and no failure outside the host-bound set appeared.

The full-run results are:

| Folder | Registered | Passed | Skipped | Failed titles | Seconds from end.json |
| --- | --- | --- | --- | --- | --- |
| completion-b1-journey-1 | 94 | 94 | 0 | None | 484.177 |
| completion-b1-journey-2 | 94 | 94 | 0 | None | 470.817 |

The comparison baselines are J-B1 `runs/jb1-1` and `runs/jb1-2`, as ruled, rather than the brief's older J-B0 references. The Orchestrator owns the comparison and acceptance.

The exact proposed unified diff for `/home/user/scaffold/.orkestrel/veneer/lanes.md` and `/home/user/veneer/tmp/units/journey-cost/host-bound.md` is [host-bound.patch](/home/user/veneer/tmp/units/completion-b1/host-bound.patch). It replaces each journey bullet with:

```markdown
- `journey`, `tests/app/browser/integration.test.ts`: none.
```

Neither shared file was edited. The refreshed review artifacts are [candidate.patch](/home/user/veneer/tmp/units/completion-b1/candidate.patch), [status.txt](/home/user/veneer/tmp/units/completion-b1/status.txt), and [report.md](/home/user/veneer/tmp/units/completion-b1/report.md). `git diff --check` passed. No commit or sub-agent was used; only the owned test files and authorized evidence artifacts were written. The readings cover this host's configured Chromium engine.

The final `git status --porcelain` is:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```