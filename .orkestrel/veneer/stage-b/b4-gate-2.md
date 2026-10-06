stage-b-b4 finished after 661 s: exit=0 signal=none capped=false duration_ms=638355
**drop.** The probe failed before producing height readings. All edits were reverted to `9fb2be1`; the probe was deleted. This does not establish whether intrinsic sizing passes the intended gate.

The readings are unavailable:

| Chromium | Engine on | Engine off | Bootstrap | Unchanged control |
|---|---|---|---|---|
| 141.0.7390.37 | Not recorded | Not reached | Not reached | Not reached |
| 153 executable requested; full version not recorded | Not recorded | Not reached | Not reached | Not reached |

Both runs used this command form, with `WT=/home/user/.wave/veneer-b4` and `RUNS=/home/user/veneer/tmp/units/journey-cost/runs`:

```bash
flock -w 7200 /home/user/.wave/journey.lock \
  node /home/user/veneer/tmp/units/journey-cost/run.ts \
  --folder "$RUNS/$NAME" --kind command --cwd "$WT" -- \
  env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH \
  [153 environment override] \
  "$WT/node_modules/.bin/vitest" run \
  --config "$WT/vite.config.ts" --configLoader runner \
  --no-cache --reporter=dot --project src:browser \
  "$WT/tests/src/browser/intrinsic.probe.test.ts"
```

The 153 override was `PLAYWRIGHT_EXECUTABLE_PATH=/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome`.

| Gate / folder | Exit | Bare result |
|---|---:|---|
| [stage-b-b4-gate-141-r2](/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-gate-141-r2/start.json) | 1 | 1 file failed; 1 test failed |
| [stage-b-b4-gate-153-r2](/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-gate-153-r2/start.json) | 1 | 1 file failed; 1 test failed |
| `git -C "$WT" diff --check` — direct | 0 | Empty output |

The remaining gates were not run after the required drop.

Final `git -C "$WT" diff` and `git -C "$WT" status --porcelain` both exited 0 with empty output.

Deviation: completion was expected after the open event and one frame, with both inline slots cleared. My probe used a 1,000 ms event-wait budget against a 1,000 ms transition. Both runs reported `Event "panel shown" was not delivered within 1000ms`; see the [141 failure log](/home/user/veneer/tmp/units/journey-cost/runs/stage-b-b4-gate-141-r2/stderr.log). Hypothesis: the wait expired before transition completion. Measurement remains incomplete; rollback and cleanup are done.

[exited with code 0]
