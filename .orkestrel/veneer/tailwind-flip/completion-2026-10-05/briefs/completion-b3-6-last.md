## Sixth launch — 2026-10-06

All requested gates pass. The after journey completes with [report.json](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-journey-after-2/report.json): **94 registered, 94 passed, 0 failed, 0 skipped, 0 todo**. Failed titles: none. The queue runner exits 0 after **509.066 s**; Vitest reports 507.35 s. The empty journey host-bound set requires no exception.

The main-region geometry and computed-longhand reading runs once per theme per width, in the closed state. Each open state restricts the measured population to its bound panel subtree and trigger before taking those readings. Each state rebuilds signatures and the matched-rule index; ancestors remain attribution witnesses. Every condition compares the mapped, copy-free `tunedBootstrap` baseline with `recipe`.

The following populations occur in both themes at both widths in the isolated and full runs:

| State | Measured population and binding | Component elements |
| --- | --- | ---: |
| Closed | Main region | 10,546 |
| Tooltip | Trigger plus panel subtree resolved through its `aria-describedby` | 4 |
| Popover | Trigger plus panel subtree resolved through its `aria-describedby`; exactly one `h3.popover-header` required | 5 |
| Dropdown | Trigger plus `.dropdown-menu.show[data-popper-placement]` subtree | 5 |
| Modal | Trigger plus `.modal.show[aria-modal="true"]` subtree | 12 |
| Offcanvas | Trigger plus `.offcanvas.show[aria-modal="true"]` subtree | 8 |
| Toast | Opener plus panel subtree resolved through its `aria-controls` | 5 |

Both runs emit all 28 width/theme/state readings: four closed-page conditions and 24 scoped open conditions. Every condition reports zero preflight departures, unattributed departures, and lost boxes. Open-state undeclared censuses are empty. Closed states retain the icon tokens, `md:flex`, `mt-[1rem]`, and `slide`. The description-list admission expectations and existing reader controls remain in their applicable closed states.

The Fifth launch's oversized message was the artifact-writing `commands.writeFile('tmp/journey/dark-390.txt', ...)` request, which combines `rows` with captured `JOURNAL.output`. This identification follows from the [stdout log](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-journey-after/stdout.log), the [receiver failure](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-journey-after/stderr.log), and the writer/Journal implementation. Individual preservation console messages reached stdout; the largest was 2,975,257 bytes, at light/1280/offcanvas. The dark-390 artifact remained stale while the other variants wrote theirs.

Reconstructing only the preservation contribution gives 82,958,475 bytes of result rows plus 82,986,763 bytes of Journal entries: **165,945,239 bytes** joined, or **202,232,344 bytes** as the serialized string argument. That alone exceeds the installed WebSocket limit of **104,857,600 bytes**. This is a measured lower bound for the rejected request, not an exact captured wire-frame size: the logs retain neither that frame nor the remaining artifact content.

The case's Journal entries and result rows now contain condition identifiers, cause and exclusion counts, population counts, durations, and the undeclared census. Control entries contain counts. They contain no per-element departure arrays or element markup; rejected departures and lost boxes stay in assertion output. The largest `Component` log entry measures 729 bytes in the isolated run and 727 bytes in the full run. The completed [dark-390 artifact](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-journey-after-2/journey/dark-390.txt) is 430,563 bytes.

Every command ran sequentially through the requested queue, with a fresh folder and npm 11 first on PATH:

```text
flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder FOLDER --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

The table's aliases expand as follows; `FOLDER` is the row's linked directory:

```text
FORMAT = ./node_modules/.bin/oxfmt --config .oxfmtrc.json --write tests/setupStyles.ts tests/setupStyles.test.ts tests/setupBrowser.ts tests/setupBrowser.test.ts tests/src/tailwindcss/index.test.ts tests/app/browser/integration.test.ts
PRESERVATION = env CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --project journey:dark-390 -t "attributes every component departure"
AFTER = env CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=FOLDER/report.json
```

Exits and seconds come from each folder's `end.json`:

| Queue folder | Kind | Command | Exit | Seconds |
| --- | --- | --- | ---: | ---: |
| [completion-b3-format-6](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-format-6) | command | `FORMAT` | 0 | 0.479 |
| [completion-b3-format-check-6](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-format-check-6) | command | `npm run format:check` | 0 | 4.533 |
| [completion-b3-lint-check-6](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-lint-check-6) | command | `npm run lint:check` | 0 | 1.561 |
| [completion-b3-check-6](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-check-6) | command | `npm run check` | 0 | 60.419 |
| [completion-b3-preservation-6](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-preservation-6) | command | `PRESERVATION` | 0 | 138.072 |
| [completion-b3-setup-browser-6](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-setup-browser-6) | command | `npm run test:setup:browser` | 0 | 187.342 |
| [completion-b3-journey-after-2](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-journey-after-2) | journey | `AFTER` | 0 | 509.066 |

The isolated run passes both preservation titles, with 22 tests skipped by its title filter. Browser setup passes 187 tests.

The emitted `Component preservation duration` readings are:

| Run | 1280 px | 390 px |
| --- | ---: | ---: |
| Isolated, Sixth launch | 61.7978 s | 55.6951 s |
| Full journey, Sixth launch | 73.9084 s | 66.4087 s |
| Isolated, Fifth launch | 102.2415 s | 96.6469 s |
| Full journey, Fifth launch | 139.4077 s | 118.6077 s |

The completed after journey is **15.104 s above** the 493.962 s before run, **15.948 s below** J-B1's 525.014 s run, and **19.168 s below** its 528.234 s run. J-B1's repeat spread is 3.220 s. These are individual queued measurements; cost acceptance remains with the Orchestrator. The full run includes concurrent journey variants and the requested sampler; its measurements and manifest are retained in the run folder. Readings are bounded to Chromium 141.0.7390.37.

The checkout remains detached at `ec37454`. No commit or sub-agent was created. This launch changes only the owned preservation case; the other standing edits, including the ruled index repair, remain. Final `git status --porcelain`:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/tailwindcss/index.test.ts
```

Regenerated [candidate.patch](/home/user/veneer/tmp/units/completion-b3/candidate.patch) and [status.txt](/home/user/veneer/tmp/units/completion-b3/status.txt). This section is appended to [report.md](/home/user/veneer/tmp/units/completion-b3/report.md).