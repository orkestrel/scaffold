stage-b-b4 finished after 180 s: exit=0 signal=none capped=false duration_ms=145760
**Gate verdict: drop.** All changes reverted to `9fb2be1`; the probe was deleted.

Chromium: `141.0.7390.37` (browser user agent: `HeadlessChrome/141.0.0.0`).

| Reading | Late height, px | Completion height, px | Inline target |
|---|---:|---:|---|
| Engine on, growing content | 196 | 240 | `auto` |
| Engine off, growing content | 98 | 240 | `120px` |
| Bootstrap, growing content | 97.984375 | 240 | `120px` |
| Unchanged control: on / off / Bootstrap | 97.96875 / 97.96875 / 97.984375 | **119.984375 / 120 / 120** | `auto` / `120px` / `120px` |

Growth passed; unchanged-content completion equality failed.

The gate command was:

```bash
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-probe-1 --kind command --cwd /home/user/.wave/veneer-b4 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH /home/user/.wave/veneer-b4/node_modules/.bin/vitest run --config /home/user/.wave/veneer-b4/vite.config.ts --configLoader runner --no-cache --reporter=dot --project src:browser /home/user/.wave/veneer-b4/tests/src/browser/intrinsic.probe.test.ts
```

| Gate | Folder | Exit | Bare result |
|---|---|---:|---|
| Probe | `stage-b-b4-probe-1` under the specified runs directory | 1 | 1 test failed; expected `[120,120,120]`, received `[119.984375,120,120]` |
| `git -C /home/user/.wave/veneer-b4 diff --check` | Direct | 0 | Empty |
| Formatter, lint, both typechecks, individual suites, browser project, guide parity, policy | None | — | Not run: gate failure required revert and stop |

Evidence: [probe output](/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-probe-1/stdout.log), [assertion failure](/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-probe-1/stderr.log), [exit record](/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-probe-1/end.json).

Final `git diff` and `git status --porcelain` both produced **empty output**.

Deviations:

- **Expected:** equal unchanged-content completion heights. **Found:** intrinsic height differed by `0.015625px`. **Evidence:** probe readings and assertion failure. **Done:** dropped and reverted; no retry. **Hypothesis:** completion sampled a residual interpolation frame; unverified.
- **Expected reference browser:** Chromium `153.0.8010.12`. **Found:** host Chromium `141.0.7390.37`. **Evidence:** [run metadata](/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-probe-1/start.json). **Done:** recorded host version; browser unchanged. **Hypothesis:** browser-version behavior may affect the completion reading; unverified.

[exited with code 0]
