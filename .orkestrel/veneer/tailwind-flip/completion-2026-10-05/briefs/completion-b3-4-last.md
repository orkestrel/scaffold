## Fourth launch — 2026-10-06

Acceptance remains incomplete: formatting, lint, typecheck, browser setup, and Tailwind passed, but both widened preservation halves failed. The stop is for failing test titles outside the empty journey host-bound set.

The popover header expectation runs unconditionally: the popover state collects `h3.popover-header` nodes and expects one; other states supply an empty collection and expect zero. No lint rule is suppressed. The placement assertion uses the report's `toEqual({ element, cause })` correction, retaining the element markup in failure output without passing an extra argument to `expect`. An initial attempt to put the message on Chai's `.to.equal` matcher failed `vitest/valid-expect`; the object comparison passes.

Sequencing deviation: `check-4` started before the failed `lint-check-4` result was inspected. It passed, but does not serve as the ordered acceptance run. After correcting the assertion, formatting, format check, lint check, and typecheck ran again in order with fresh folders.

Every command used this queue wrapper, with the folder and command from the table. All runs in this launch used `--kind command`.

```text
flock -w 1800 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder FOLDER --kind command --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

In the table, `FORMAT` expands to this exact command:

```text
./node_modules/.bin/oxfmt --config .oxfmtrc.json --write tests/setupStyles.ts tests/setupStyles.test.ts tests/setupBrowser.ts tests/setupBrowser.test.ts tests/src/tailwindcss/index.test.ts tests/app/browser/integration.test.ts
```

`PRESERVATION` expands to this exact command:

```text
env CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --project journey:dark-390 -t "attributes every component departure"
```

The queue results follow; seconds come from each folder's `end.json`.

| Queue folder | Command | Exit | Seconds |
| --- | --- | ---: | ---: |
| [completion-b3-format-4](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-format-4) | `FORMAT` | 0 | 0.311 |
| [completion-b3-format-check-4](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-format-check-4) | `npm run format:check` | 0 | 4.070 |
| [completion-b3-lint-check-4](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-lint-check-4) | `npm run lint:check` | 1 | 1.744 |
| [completion-b3-check-4](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-check-4) | `npm run check` | 0 | 60.446 |
| [completion-b3-format-4b](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-format-4b) | `FORMAT` | 0 | 0.325 |
| [completion-b3-format-check-4b](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-format-check-4b) | `npm run format:check` | 0 | 4.062 |
| [completion-b3-lint-check-4b](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-lint-check-4b) | `npm run lint:check` | 0 | 1.658 |
| [completion-b3-check-4b](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-check-4b) | `npm run check` | 0 | 60.380 |
| [completion-b3-setup-browser-4](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-setup-browser-4) | `npm run test:setup:browser` | 0 | 189.519 |
| [completion-b3-tailwindcss-4](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-tailwindcss-4) | `npm run test:src:tailwindcss` | 0 | 28.173 |
| [completion-b3-preservation-4](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-preservation-4) | `PRESERVATION` | 1 | 57.267 |

Browser setup passed 187 tests. Tailwind passed 10 tests, including the mapped scoped-witness baseline and removed-repair controls. The isolated preservation run failed both selected tests; 22 other tests were skipped by the title filter. Vitest reported 55.72 s; the queue runner reported 57.267 s.

The failed titles in `journey:dark-390 (chromium)`, `tests/app/browser/integration.test.ts:1215`, are:

- `showcase matrix > attributes every component departure of the tailwindcss face to a declared cause other than preflight at 1280 px`
- `showcase matrix > attributes every component departure of the tailwindcss face to a declared cause other than preflight at 390 px`

Both report `strict mode violation: getByRole('tooltip', { name: /^Held at customs/ }) resolved to 6 elements`. The locator matches the static popover specimens and the engine-built panel before reaching the unconditional header expectation. See the [preservation failure log](/home/user/veneer/tmp/units/journey-cost/runs/completion-b3-preservation-4/stderr.log). The completed readings cover light closed and tooltip states only; the popover lookup aborts each half, so these durations do not measure the complete widened matrix.

The emitted `Component preservation duration` readings are:

| Width | Seconds | Result |
| ---: | ---: | --- |
| 1280 px | 20.2414 | Aborted at the light popover lookup |
| 390 px | 19.4002 | Aborted at the light popover lookup |

`completion-b3-journey-after` was not launched after these failures under the stated stop clause. There are no after-journey failed-title results, runner seconds, or completed half durations to report. No cost comparison against the 493.962 s before run or J-B1 acceptance comparison is claimed.

The checkout remains detached at `ec37454`. No commit or sub-agent was created. Tracked edits remain confined to the owned files and the standing ruled index repair. The final `git status --porcelain` is:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/setupStyles.test.ts
 M tests/setupStyles.ts
 M tests/src/tailwindcss/index.test.ts
```

Regenerated artifacts: [candidate.patch](/home/user/veneer/tmp/units/completion-b3/candidate.patch) and [status.txt](/home/user/veneer/tmp/units/completion-b3/status.txt). This section is appended to [report.md](/home/user/veneer/tmp/units/completion-b3/report.md).