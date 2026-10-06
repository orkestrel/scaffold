hb1 finished after 1683 s: exit=0 signal=none capped=false duration_ms=1742210
Completed HB1. Both Chromium versions pass all **799 browser tests**. No assertions were weakened, no tests were skipped, and nothing was committed.

The [full diff](/home/user/.wave/veneer-hb1/tmp/units/hb1/hb1.patch) changes four files, with 21 insertions and 12 deletions:

- `Placement.ts` rounds the target position before subtracting the anchored position, and computes the arrow from the unrounded target.
- `Placement.test.ts` consumes a host-independent departure row and asserts the measured dimension behavior below/at Chromium 153.
- `Tip.test.ts` moves the trigger from x = 150 to x = 20.
- `guides/veneer.md` changes only the `config-popover-flip` row.

The readings use **box/arrow maximum absolute distance**, in CSS pixels, across x, y, width, height, right, and bottom. Full geometry is in [readings.json](/home/user/.wave/veneer-hb1/tmp/units/hb1/readings.json).

| Title | Before 141 | After 141 | Before 153 | After 153 |
|---|---|---|---|---|
| `'Popover'-'scroll'` | 0.40625 / 1.390625, fail | 0.015625 / 0, pass | 0.40625 / 1.390625, fail | 0.015625 / 0, pass |
| `'Popover'-'transform'` | 0.40625 / 1.390625, fail | 0.015625 / 0, pass | 0.40625 / 1.390625, fail | 0.015625 / 0, pass |
| `records the config-popover-flip transient departure and compares the settled box` | 0.40625 / 0.40625; literal row fails | 0.015625 / 0; row consumed | 0.8125 / 0.8125; literal row fails | 0.015625 / 0; row consumed |
| `consumes every selected departure` | `config-popover-flip` unused | `unused=[]`, `unproven=[]` | `config-popover-flip` unused | `unused=[]`, `unproven=[]` |
| `measures the perpendicular keyword dimension swap warrant for constructed rules` | 120 × 80; fails swap assertion | 120 × 80; explicit below-floor assertion passes | 80 × 120; passes | 80 × 120; passes |
| `Tip initialization: popover > projects markup leaves and refuses the tooltip config and sanitizer attributes` | `top`, fail | `right`, pass | `top`, fail | `right`, pass |

For scroll and transform, the original **x** distances were 0.390625 px for the box and 1.390625 px for the arrow. Both x distances are zero after the repair.

The departure’s transient remains **4 px** on both versions. Its cells change as follows:

| Cell | Before | After |
|---|---|---|
| Bootstrap | `Initial (401,269,155.984375,107.1875,556.984375,376.1875); settled (401,265,155.984375,107.1875,556.984375,372.1875)` | `Initial y offset: 4px` |
| Engine | `Settled (401.03125,265.40625,155.96875,107.1875,557,372.59375)` | `Settled box within 1px: true` |

For **each** additional case listed next, the before reading was **0.609375 / 0.59375 on 141**, passing, and **0.40625 / 1.390625 on 153**, failing. After readings are identical on 141 and 153; every case passes.

| Case | After box | After arrow |
|---|---:|---:|
| `Popover-top-center-ltr` | 0.1875 | 0.1875 |
| `Popover-top-top-ltr` | 0.015625 | 0 |
| `Popover-top-bottom-ltr` | 0.1875 | 0.1875 |
| `Popover-right-center-ltr` | 0.1875 | 0.1875 |
| `Popover-right-top-ltr` | 0.015625 | 0 |
| `Popover-right-bottom-ltr` | 0.1875 | 0.1875 |
| `Popover-bottom-center-ltr` | 0.015625 | 0 |
| `Popover-bottom-top-ltr` | 0.015625 | 0 |
| `Popover-bottom-bottom-ltr` | 0.1875 | 0.1875 |
| `Popover-left-center-ltr` | 0.1875 | 0.1875 |
| `Popover-left-top-ltr` | 0.015625 | 0 |
| `Popover-left-bottom-ltr` | 0.1875 | 0.1875 |
| `Popover-auto-center-ltr` | 0.015625 | 0 |
| `Popover-auto-top-ltr` | 0.015625 | 0 |
| `Popover-auto-bottom-ltr` | 0.1875 | 0.1875 |
| `Popover-top-center-rtl` | 0.1875 | 0.1875 |
| `Popover-top-top-rtl` | 0.015625 | 0 |
| `Popover-top-bottom-rtl` | 0.1875 | 0.1875 |
| `Popover-right-center-rtl` | 0.1875 | 0.1875 |
| `Popover-right-top-rtl` | 0.015625 | 0 |
| `Popover-right-bottom-rtl` | 0.1875 | 0.1875 |
| `Popover-bottom-center-rtl` | 0.015625 | 0 |
| `Popover-bottom-top-rtl` | 0.015625 | 0 |
| `Popover-bottom-bottom-rtl` | 0.1875 | 0.1875 |
| `Popover-left-center-rtl` | 0.1875 | 0.1875 |
| `Popover-left-top-rtl` | 0.015625 | 0 |
| `Popover-left-bottom-rtl` | 0.1875 | 0.1875 |
| `Popover-auto-center-rtl` | 0.015625 | 0 |
| `Popover-auto-top-rtl` | 0.015625 | 0 |
| `Popover-auto-bottom-rtl` | 0.1875 | 0.1875 |
| `popover-custom-offset` | 0.1875 | 0.1875 |
| `Popover-resize` | 0.015625 | 0 |

The queued commands used this wrapper, with a fresh folder each. Exact recorded arguments and exits are in [gates.json](/home/user/.wave/veneer-hb1/tmp/units/hb1/gates.json).

```text
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/FOLDER --kind command --cwd /home/user/.wave/veneer-hb1 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH [BROWSER] COMMAND
```

For 141, `BROWSER` is omitted. For 153, it is:

```text
PLAYWRIGHT_EXECUTABLE_PATH=/home/user/.wave/pw-153/chromium-1243/chrome-linux64/chrome
```

The command labels in the result table expand to:

```text
T = /home/user/.wave/veneer-hb1/node_modules/.bin/tsc --noEmit -p /home/user/.wave/veneer-hb1/configs/src/tsconfig.browser.json

F = /home/user/.wave/veneer-hb1/node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser tests/src/browser/Placement.test.ts tests/src/browser/Tip.test.ts

P = /home/user/.wave/veneer-hb1/node_modules/.bin/vitest run --config vite.config.ts --no-cache --reporter=dot --project src:browser
```

| Folder | Chromium | Command | Exit | Bare result |
|---|---:|---|---:|---|
| `hb1-before-141` | 141 | F | 1 | 2 files failed; 6 failed, 351 passed |
| `hb1-before-153` | 153 | F | 1 | 2 files failed; 37 failed, 320 passed |
| `hb1-typecheck` | — | T | 0 | No output |
| `hb1-after-141` | 141 | F | 0 | 2 files passed; 357 passed |
| `hb1-after-153` | 153 | F | 0 | 2 files passed; 357 passed |
| `hb1-project-141` | 141 | P | 0 | 26 files passed; 799 passed |
| `hb1-project-153` | 153 | P | 0 | 26 files passed; 799 passed |

The direct gates ran with cwd `/home/user/.wave/veneer-hb1`; they have no queue folder.

| Command | Exit | Bare result |
|---|---:|---|
| `node_modules/.bin/oxfmt --check src/browser/Placement.ts src/browser/helpers.ts tests/src/browser/Placement.test.ts tests/src/browser/Tip.test.ts guides/veneer.md` | 0 | All matched files use the correct format |
| `node_modules/.bin/oxlint --deny-warnings src/browser/Placement.ts src/browser/helpers.ts tests/src/browser/Placement.test.ts tests/src/browser/Tip.test.ts guides/veneer.md` | 0 | No output |
| `node --experimental-strip-types /home/user/.wave/veneer-hb1/tests/guides.test.ts` | 0 | 1 file passed; 20 passed |
| `git -C /home/user/.wave/veneer-hb1 diff --check` | 0 | No output |
| `git -C /home/user/.wave/veneer-hb1 status --porcelain` | 0 | Output follows |

```text
 M guides/veneer.md
 M src/browser/Placement.ts
 M tests/src/browser/Placement.test.ts
 M tests/src/browser/Tip.test.ts
```

The deviations and their disposition are:

- **Popper’s whole-pixel premise:** The baselines show fractional coordinates, including dropdown x = 86.53125 and popover top y = 200.8125. The retained 1 px comparisons pass after repair. Hypothesis: Popper’s adaptive bottom/right positioning preserves fractions from box dimensions and containing-block geometry.
- **Arrow helper location:** `computeArrow` already implements Popper’s unrounded formula; rounding occurs in its caller. The repair therefore changes `Placement.ts`, leaving `helpers.ts` unchanged. Both oracle populations pass. Hypothesis, supported by the before/after readings: supplying the rendered box caused the extra rounding step.
- **Formatting:** The first format check exited 1 because shortening the row’s Reason cell changed the table’s required padding. The final wording preserves the column width and changes only the owned row; the final check exits 0. Hypothesis: the longest Reason cell determines that column’s padding.
- **153 wrapper metadata:** The runner’s `chromium.stdout.log` reports its default 141 executable. The child command explicitly selects the 153 path, which `configs/browsers.ts:295` prioritizes; the baseline swap behavior also distinguishes the runs. The unowned runner was unchanged. Hypothesis: its metadata probe runs before the child’s `env` override.

No optimizer retry was needed.

[exited with code 0]
