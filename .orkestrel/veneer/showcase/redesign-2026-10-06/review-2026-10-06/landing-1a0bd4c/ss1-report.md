Implemented SS1. All required gates passed. No commits.

See the [complete diff](/home/user/.wave/veneer-ss/tmp/units/ss1.diff) and [evidence report](/home/user/.wave/veneer-ss/tmp/units/ss1-report.md).

The protocol uses **shape (a)**: a fresh observer in each root’s realm, created after the spy, with matching targets, root, margin, and thresholds. Initial entries provide a witness even when selection and classes remain unchanged. `waitForCondition` checks that witness from a timer under a 5000 ms deadline, after the notification task finishes. This follows the specification’s [observation update](https://www.w3.org/TR/intersection-observer/#update-intersection-observations-algo) and [notification algorithms](https://www.w3.org/TR/intersection-observer/#notify-intersection-observers-algo), consistent with [Chromium’s delivery implementation](https://raw.githubusercontent.com/chromium/chromium/main/third_party/blink/renderer/core/intersection_observer/intersection_observer_controller.cc).

All **50 calls / 25 authored pairs** were observer waits:

| Cases | Pairs | Calls |
|---|---:|---:|
| Current selection and hook payload | 2 | 4 |
| Explicit options | 2 | 4 |
| Empty target and destruction before callback | 2 | 4 |
| Hidden/disabled admission | 3 | 6 |
| Appending/removing sections | 5 | 10 |
| Load initialization: oracle and engine scope | 2 | 4 |
| Disposal | 3 | 6 |
| Typed detail departure | 2 | 4 |
| Down/up scrolling: element, viewport, navigation variants, offsets, margin, thresholds, veto | 2 | 4 |
| Smooth clicks: plain, encoded, viewport | 2 | 4 |
| **Total** | **25** | **50** |

Layout waits: **0**. Smooth-scroll completion waits: **0**; those cases already awaited `scrollend`. Their subsequent pairs awaited observer effects. Empty/disposed spies use fixture targets to witness a delivery opportunity before asserting silence.

The mutation control retains native user-blocking task pressure and an initial-selection assertion in the hidden-section case:

| Folder | Wait | Exit | Reading |
|---|---|---:|---|
| `ss1-mutation-priority` | Restored two-frame wait | 1 | **1 failed**: first link expected active, received inactive |
| `ss1-mutation-protocol` | Delivery protocol | 0 | **1 passed**: initial selection and transcript assertions pass |

Both used `-t 'skips the hidden section'`; the other 25 cases were filtered out. No skip was added.

For the queued gates, `WT=/home/user/.wave/veneer-ss`, `RUNS=/home/user/veneer/tmp/units/journey-cost/runs`, and `V` means `$WT/node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot`. Every row used:

```sh
flock -w 7200 /home/user/.wave/journey.lock \
  node /home/user/veneer/tmp/units/journey-cost/run.ts \
  --folder "$RUNS/FOLDER" --kind command --cwd "$WT" -- \
  env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND
```

`P153` below means `PLAYWRIGHT_EXECUTABLE_PATH=/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome`.

| Folder | Command | Exit | Bare result |
|---|---|---:|---|
| `ss1-typecheck-final` | `$WT/node_modules/.bin/tsc --noEmit -p $WT/tsconfig.json` | 0 | No output |
| `ss1-alone141-final` | `V --project src:browser tests/src/browser/Scrollspy.test.ts` | 0 | 1 file passed; **26/26** |
| `ss1-alone153` | `P153 V --project src:browser tests/src/browser/Scrollspy.test.ts` | 0 | 1 file passed; **26/26** |
| `ss1-setup-browser` | `V --project setup:browser` | 0 | 2 files passed; **205/205** |
| `ss1-full141-1` | `V --project src:browser` | 0 | 26 files passed; **799/799** |
| `ss1-full141-2` | `V --project src:browser` | 0 | 26 files passed; **799/799** |
| `ss1-full141-3` | `V --project src:browser` | 0 | 26 files passed; **799/799** |
| `ss1-full153` | `P153 V --project src:browser` | 0 | 26 files passed; **799/799** |

The mutation rows used the same wrapper with `V --project src:browser tests/src/browser/Scrollspy.test.ts -t 'skips the hidden section'`.

Direct gates ran in `WT`:

| Command | Exit | Bare result |
|---|---:|---|
| `node_modules/.bin/oxfmt --config .oxfmtrc.json --check tests/src/browser/Scrollspy.test.ts tests/setupBrowser.ts tests/setupBrowser.test.ts` | 0 | All matched files use the correct format |
| `node_modules/.bin/oxlint --config .oxlintrc.json --deny-warnings tests/src/browser/Scrollspy.test.ts tests/setupBrowser.ts tests/setupBrowser.test.ts` | 0 | No output |
| `git -C /home/user/.wave/veneer-ss diff --check` | 0 | No output |
| `git -C /home/user/.wave/veneer-ss status --porcelain` | 0 | Owned files only, below |

Resolved deviations:

- The preliminary MessageChannel workload was expected to expose the mutation but passed in `ss1-mutation-frames`. Replaced it with user-blocking scheduler tasks and the explicit initial-selection reading. Hypothesis: ordinary message tasks permitted observer delivery between frames.
- Initial lint found a duplicate `createOracle` import. Removed the added duplicate and reused the existing import; final lint passed. The existing declaration was in a later import block.

No optimizer retry or unresolved deviation. Final status:

```text
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
 M tests/src/browser/Scrollspy.test.ts
```