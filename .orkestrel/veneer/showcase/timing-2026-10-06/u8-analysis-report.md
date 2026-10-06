COMPONENT_WAIT is 32,600 ms. The execution gates passed; acceptance criterion 5 (budget less than every enclosing slack) is NOT MET. Test timeouts remain unchanged for U9. Nothing was committed.

R3 inputs: task75-u7-probe-1, task75-u7-probe-2, task75-u7b-header-1, and task75-u7b-header-2. Read stdout once per run and pool by wait description. Exclude readings shorter than the library’s 10 ms poll interval only when computing the own ratio. The largest derived requirement is animations div.modal: minimum 11.0 ms in task75-u7-probe-1 (dropdown, dark-1280); maximum 598.1000000089407 ms in task75-u7-probe-2 (modal, light-1280); own ratio 54.372727273540065. This exceeds both band ratios, 1.1637 (eligible same-tree) and 1.265340 (U7b’s thirteen journeys). ceil(598.1000000089407 × 54.372727273540065 / 100) × 100 = 32,600 ms.

The largest raw settle is showcase scroll settles: 888.3 ms in task75-u7-probe-2, minimum 41.8 ms, own ratio 21.251196; its derived requirement is 18,900 ms. U7 journey outside CPU seconds: 75.21 in probe-1 and 67.62 in probe-2. Header command runs have no load readings. U8 full journey: 602.110 seconds, outside CPU seconds 65.31, outside peak 1.39213 CPU seconds per wall second.

Full diff: [change.patch](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/change.patch). Detailed description derivation: [derivation.json](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/derivation.json). The existing 1,100 ms condition control remains; the added animation control also lasts 1,100 ms. Both exceed 1,000 ms and are shorter than 32,600 ms.

All 19 animation calls take COMPONENT_WAIT. Existing condition predicates, test timeouts, readShowcaseWindow, the oracle frame budget, source files, rows, and journal definitions are unchanged. The six Showcase condition calls take the budget.

The grep gate exits 1 because it finds no single-argument call. An independent TypeScript AST check prints: Animation calls: 19; without COMPONENT_WAIT: 0. A predicate comparison against HEAD prints: Existing waitForCondition predicates unchanged in all four files.

Every gate command, folder, exit, and bare result follows. An empty result means the command emitted no stdout.

**Format**

Folder: `/home/user/.wave/veneer-containment`. Exit: 0.

```text
/home/user/.wave/veneer-containment/node_modules/.bin/oxfmt --config /home/user/.wave/veneer-containment/.oxfmtrc.json --check /home/user/.wave/veneer-containment/tests/setupBrowser.ts /home/user/.wave/veneer-containment/tests/setupBrowser.test.ts /home/user/.wave/veneer-containment/tests/app/browser/integration.test.ts /home/user/.wave/veneer-containment/tests/app/browser/Showcase.test.ts
```

Bare result:
```text
All matched files use the correct format.
```

**Lint**

Folder: `/home/user/.wave/veneer-containment`. Exit: 0.

```text
/home/user/.wave/veneer-containment/node_modules/.bin/oxlint --config /home/user/.wave/veneer-containment/.oxlintrc.json --deny-warnings /home/user/.wave/veneer-containment/tests/setupBrowser.ts /home/user/.wave/veneer-containment/tests/setupBrowser.test.ts /home/user/.wave/veneer-containment/tests/app/browser/integration.test.ts /home/user/.wave/veneer-containment/tests/app/browser/Showcase.test.ts
```

Bare result:
```text

```

**Single-argument grep**

Folder: `/home/user/.wave/veneer-containment`. Exit: 1.

```text
rg -n -U --pcre2 'waitForAnimations\((?:[^(),]|(?<nested>\((?:[^()]|(?&nested))*\)))*\)' /home/user/.wave/veneer-containment/tests/setupBrowser.ts /home/user/.wave/veneer-containment/tests/setupBrowser.test.ts /home/user/.wave/veneer-containment/tests/app/browser/integration.test.ts /home/user/.wave/veneer-containment/tests/app/browser/Showcase.test.ts
```

Bare result:
```text

```

**Diff whitespace**

Folder: `/home/user/.wave/veneer-containment`. Exit: 0.

```text
git -C /home/user/.wave/veneer-containment diff --check
```

Bare result:
```text

```

**Status**

Folder: `/home/user/.wave/veneer-containment`. Exit: 0.

```text
git -C /home/user/.wave/veneer-containment status --porcelain
```

Bare result:
```text
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

**Duration instrument (successful direct invocation)**

Folder: `/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/`. Exit: 0.

```text
node /home/user/veneer/tmp/units/journey-cost/durations.ts --run /home/user/veneer/tmp/units/journey-cost/runs/jb2-1 --run /home/user/veneer/tmp/units/journey-cost/runs/jb2-2 --run /home/user/veneer/tmp/units/journey-cost/runs/jb2b-1 --run /home/user/veneer/tmp/units/journey-cost/runs/jb2b-2 --run /home/user/veneer/tmp/units/journey-cost/runs/completion-b3-journey-after-4 --run /home/user/veneer/tmp/units/journey-cost/runs/completion-b4-journey --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u3-journey-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u3-journey-2 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u4-journey-2 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u5-journey-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u6-journey-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7b-header-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7b-header-2 --timeouts /home/user/veneer/tmp/units/journey-cost/timeouts-6a976a0.json --ceiling 32600 --omit /dev/stdin --out /home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/durations.md <<'OMISSIONS'
[
  {
    "run": "jb2-1",
    "title": "showcase journeys J4 compares the three faces through the Stylesheets buttons"
  },
  {
    "run": "jb2-1",
    "title": "showcase matrix reads resolved values, Tailwind readings, the census, and contrast under its declared variant"
  },
  {
    "run": "jb2-2",
    "title": "showcase journeys J4 compares the three faces through the Stylesheets buttons"
  },
  {
    "run": "jb2-2",
    "title": "showcase matrix reads resolved values, Tailwind readings, the census, and contrast under its declared variant"
  },
  {
    "run": "jb2b-1",
    "title": "showcase journeys J4 compares the three faces through the Stylesheets buttons"
  },
  {
    "run": "jb2b-1",
    "title": "showcase matrix reads resolved values, Tailwind readings, the census, and contrast under its declared variant"
  },
  {
    "run": "jb2b-2",
    "title": "showcase journeys J4 compares the three faces through the Stylesheets buttons"
  },
  {
    "run": "jb2b-2",
    "title": "showcase matrix reads resolved values, Tailwind readings, the census, and contrast under its declared variant"
  },
  {
    "run": "completion-b3-journey-after-4",
    "title": "showcase journeys J4 compares the three faces through the Stylesheets buttons"
  },
  {
    "run": "completion-b3-journey-after-4",
    "title": "showcase matrix reads resolved values, Tailwind readings, the census, and contrast under its declared variant"
  }
]
OMISSIONS
```

Bare result:
```text
Wrote /home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/durations.md
```

**Duration instrument (failed wrapper invocation)**

Folder: `/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/`. Exit: 64.

```text
node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1 --kind command --cwd /home/user/.wave/veneer-containment -- node /home/user/veneer/tmp/units/journey-cost/durations.ts --run /home/user/veneer/tmp/units/journey-cost/runs/jb2-1 --run /home/user/veneer/tmp/units/journey-cost/runs/jb2-2 --run /home/user/veneer/tmp/units/journey-cost/runs/jb2b-1 --run /home/user/veneer/tmp/units/journey-cost/runs/jb2b-2 --run /home/user/veneer/tmp/units/journey-cost/runs/completion-b3-journey-after-4 --run /home/user/veneer/tmp/units/journey-cost/runs/completion-b4-journey --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u3-journey-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u3-journey-2 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u4-journey-2 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u5-journey-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u6-journey-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7-probe-2 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7b-header-1 --run /home/user/veneer/tmp/units/journey-cost/runs/task75-u7b-header-2 --timeouts /home/user/veneer/tmp/units/journey-cost/timeouts-6a976a0.json --ceiling 32600 --omit /dev/stdin --out /home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/durations.md <<'OMISSIONS'
[
  {
    "run": "jb2-1",
    "title": "showcase journeys J4 compares the three faces through the Stylesheets buttons"
  },
  {
    "run": "jb2-1",
    "title": "showcase matrix reads resolved values, Tailwind readings, the census, and contrast under its declared variant"
  },
  {
    "run": "jb2-2",
    "title": "showcase journeys J4 compares the three faces through the Stylesheets buttons"
  },
  {
    "run": "jb2-2",
    "title": "showcase matrix reads resolved values, Tailwind readings, the census, and contrast under its declared variant"
  },
  {
    "run": "jb2b-1",
    "title": "showcase journeys J4 compares the three faces through the Stylesheets buttons"
  },
  {
    "run": "jb2b-1",
    "title": "showcase matrix reads resolved values, Tailwind readings, the census, and contrast under its declared variant"
  },
  {
    "run": "jb2b-2",
    "title": "showcase journeys J4 compares the three faces through the Stylesheets buttons"
  },
  {
    "run": "jb2b-2",
    "title": "showcase matrix reads resolved values, Tailwind readings, the census, and contrast under its declared variant"
  },
  {
    "run": "completion-b3-journey-after-4",
    "title": "showcase journeys J4 compares the three faces through the Stylesheets buttons"
  },
  {
    "run": "completion-b3-journey-after-4",
    "title": "showcase matrix reads resolved values, Tailwind readings, the census, and contrast under its declared variant"
  }
]
OMISSIONS
```

Bare result:
```text
Error: /dev/stdin: SyntaxError: Unexpected end of JSON input
```

**TypeScript**

Folder: `/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-typecheck-1`. Exit: 0. Wall seconds: 55.851.

```text
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u8-typecheck-1 --kind command --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH /home/user/.wave/veneer-containment/node_modules/.bin/tsc --noEmit --project /home/user/.wave/veneer-containment/tsconfig.json
```

Bare result:
```text

```

**Setup browser**

Folder: `/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-setup-1`. Exit: 0. Wall seconds: 248.386.

```text
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u8-setup-1 --kind command --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH /home/user/.wave/veneer-containment/node_modules/.bin/vitest run --config /home/user/.wave/veneer-containment/vite.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-setup-1/report.json --project setup:browser /home/user/.wave/veneer-containment/tests/setupBrowser.test.ts
```

Bare result:
```text
 Test Files  1 passed (1)
      Tests  147 passed (147)
```

**Showcase browser**

Folder: `/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-showcase-1`. Exit: 0. Wall seconds: 147.957.

```text
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u8-showcase-1 --kind command --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH /home/user/.wave/veneer-containment/node_modules/.bin/vitest run --config /home/user/.wave/veneer-containment/vite.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-showcase-1/report.json --project app:browser /home/user/.wave/veneer-containment/tests/app/browser/Showcase.test.ts
```

Bare result:
```text
 Test Files  1 passed (1)
      Tests  22 passed (22)
```

**Full journey**

Folder: `/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-journey-1`. Exit: 0. Wall seconds: 602.11.

```text
flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u8-journey-1 --kind journey --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH CAPTURE=0 /home/user/.wave/veneer-containment/node_modules/.bin/vitest run --config /home/user/.wave/veneer-containment/configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-journey-1/report.json
```

Bare result:
```text
 Test Files  4 passed (4)
      Tests  94 passed (94)
```

**Slack and deviations**

Expected: 32,600 ms is less than every enclosing slack. Found: the following journey and Showcase titles fail that requirement over the historical population plus the U8 runs. Evidence: [durations.md](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/durations.md) and [enclosing-slack.json](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/enclosing-slack.json). Done: measured and reported. Not done: timeout changes, assigned to U9. One unverified hypothesis: pooling residual and complete modal transitions under the same description keeps the own ratio large even after excluding sub-poll returns.

| Enclosing title | Minimum measured slack ms |
| --- | ---: |
| Showcase holds each z-index panel at half its stage under every face | 9460.0 |
| showcase journeys J1 arrives on the showcase and reads its header, state, and contents | 10140.4 |
| showcase journeys J6 speaks no engine vocabulary under each face | 10791.2 |
| Showcase keeps the compact sticky header neutral under every face at narrow and wide viewports | 28495.7 |
| showcase matrix compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover | 27945.3 |
| showcase portfolio places every registered state and writes the variant artifact | 13004.2 |
| showcase portfolio writes no capture when the isolated output is disabled | 12593.5 |
| Showcase reads every header button at 4.5:1 or more, pressed or not, in both color modes | 9541.1 |
| showcase refusals refuses disabled and aria-disabled controls and the fieldset-disabled form | 12430.1 |
| Showcase shows the example toast and follows the example dialog through the engine until destroyed | 13862.9 |

Setup-helper callers also have insufficient slack. Their source timeout and U8 duration are recorded in [setup-slack.json](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/setup-slack.json). The table includes only callers that reach a budgeted wait; declaration-only and early-rejection cases were excluded after source inspection. These are one-run slack observations, not an R4 sizing population.

| Setup title | Timeout ms | Duration ms | Slack ms |
| --- | ---: | ---: | ---: |
| showcase mount prepares every journey mount at its declared viewport and color mode | 15000 | 2651.1 | 12348.9 |
| showcase mount declares motion false before mounting the engine page | 15000 | 1132.7 | 13867.3 |
| showcase mount declares motion true before mounting the engine page | 15000 | 1331.1 | 13668.9 |
| showcase mount refuses default motion while a reduced stage holds | 15000 | 850.6 | 14149.4 |
| component statechart setup removes the preceding popover before clicking the next specimen | 30000 | 2298.4 | 27701.6 |
| component statechart setup fires scrollend for ArrowDown with motion=true | 15000 | 2756.0 | 12244.0 |
| component statechart setup fires scrollend for ArrowDown with motion=false | 15000 | 2857.1 | 12142.9 |
| component statechart setup reads scrollspy selection after the intersection wait with motion=true | 15000 | 4278.8 | 10721.2 |
| component statechart setup reads scrollspy selection after the intersection wait with motion=false | 15000 | 4039.3 | 10960.7 |
| component statechart setup settles a boundary End through the outer page and leaves Escape unchanged | 15000 | 2596.4 | 12403.6 |
| component statechart setup refuses an unreachable scrollspy destination at the bottom before input or a scroll wait | 15000 | 2143.9 | 12856.1 |
| component statechart setup records the modal bounce through 'escape:shown' under reduced motion | 15000 | 1563.7 | 13436.3 |
| component statechart setup records the modal bounce through 'backdrop:shown' under reduced motion | 15000 | 1725.2 | 13274.8 |
| component statechart setup settles the static dialog refusals before guarded acts return under reduced motion | 15000 | 2013.9 | 12986.1 |
| component statechart setup settles accepted disclosure bursts and excludes refused clicks and sibling lifecycles | 15000 | 3015.5 | 11984.5 |
| component statechart setup settles disclosure arrangement at 'hidden' when no CSS animation runs | 15000 | 4464.8 | 10535.2 |
| component statechart setup settles disclosure arrangement at 'shown' when no CSS animation runs | 15000 | 2706.5 | 12293.5 |
| component statechart setup waits for a component animation beyond the default condition budget | 15000 | 1151.5 | 13848.5 |
| component statechart setup waits for a component animation beyond the default animation budget | 15000 | 1182.9 | 13817.1 |
| component statechart setup opens nested controls before reading their names and retains the region inventory | 30000 | 1348.3 | 28651.7 |
| component statechart setup reuses one engine mount and restores a dismissed specimen before the next row | 30000 | 3487.6 | 26512.4 |
| component statechart setup restores a dismissed toast only when the requested specimen has no show door | 30000 | 2799.9 | 27200.1 |
| waitForPaint waits for a running finite animation to finish | 15000 | 97.8 | 14902.2 |
| applyFace and applyTheme select a face and a color mode through the header buttons | 15000 | 4447.3 | 10552.7 |
| specimen readings maps each token caption reading from its rendered Bootstrap subject through the record in both modes | 15000 | 6318.0 | 8682.0 |
| specimen readings documents the dark dropdown color outside the mapReading context prerequisite | 15000 | 1963.9 | 13036.1 |
| specimen readings documents the dark mark highlight background outside the mapReading context prerequisite | 15000 | 1977.3 | 13022.7 |
| specimen readings maps palette and scale readings while keeping modal width independent of container width | 15000 | 2057.5 | 12942.5 |
| specimen readings at 1280 px reads every Tailwind reading the caption claims under the three faces in light color mode | 15000 | 11367.0 | 3633.0 |
| specimen readings at 1280 px reads every Tailwind reading the caption claims under the three faces in dark color mode | 15000 | 10482.4 | 4517.6 |
| specimen readings at 390 px reads every Tailwind reading the caption claims under the three faces in light color mode | 15000 | 10593.3 | 4406.7 |
| specimen readings at 390 px reads every Tailwind reading the caption claims under the three faces in dark color mode | 15000 | 11639.3 | 3360.7 |
| statechart tables reads engine attributes while detecting and removing inline and class output changes | 15000 | 3002.1 | 11997.9 |
| statechart tables derives unchanged observation windows from computed collapse timing and reduced motion | 15000 | 1438.2 | 13561.8 |
| statechart tables keeps the scrollspy keyboard route visible after a boundary key scrolls the outer page | 30000 | 6441.0 | 23559.0 |
| statechart tables detects a style departure on an inserted open popover | 15000 | 2429.7 | 12570.3 |
| statechart tables detects chrome changes outside the specimen sections and restores normalization | 15000 | 2336.2 | 12663.8 |
| statechart tables rejects a delayed collapse reaction during an unchanged row | 30000 | 2572.0 | 27428.0 |
| statechart tables detects missing leaves, global duplicate ids, and dangling inserted-tip references | 15000 | 1049.2 | 13950.8 |
| statechart tables includes roleless computed scrollers and static active tabs in its census | 15000 | 1367.5 | 13632.5 |
| statechart tables retains each failing row name and the error recorded by the harness | 30000 | 2244.0 | 27756.0 |
| statechart tables drives every face and color-mode row through the header buttons | 60000 | 50315.8 | 9684.2 |
| statechart tables names the row whose assertion reads a state the button did not reach | 30000 | 3602.1 | 26397.9 |

Expected: the supplied instrument implements the ruled R3 ratio and every enclosing family. Found: it retains sub-poll minima and maps settle entries only to statechart titles. Evidence: durations.ts renderProbes and the U7b report. Done: ran the instrument unchanged with 230,000 ms for each component table, 120,000 ms for each header family, and ceiling 32,600; supplemented it with raw-stdout derivation and source-filtered slack tables. Its old per-description R3 column is not the ruled U8 derivation.

Expected: every Chromium command uses the queue. Found: the ancillary run.ts duration-instrument attempt was launched without flock; run.ts:56 executes Chromium --version. Evidence: task75-u8-analysis-1/start.json and chromium.stdout.log. That attempt exited 64 because the wrapper closed stdin, leaving /dev/stdin empty. Done: ran the duration instrument directly with Node, exit 0. The version-probe queue deviation cannot be undone. Browser test and TypeScript runs used the prescribed queue.

Expected: metadata export succeeds. Found: a node -e export command had a shell quoting syntax error, exit 2, before execution. Done: rewrote the export invocation as a quoted Node heredoc, exit 0; commands.json exists. No source file changed in either export attempt.

Expected location: the brief calls the non-oracle literal an isRendered-style wait. Found: the sole 5_000 literal near the helpers is settleShowcaseScroll. Done: replaced that literal with COMPONENT_WAIT and kept its predicate; the oracle budget: 5000 remains unchanged.

Orchestrator compare: not run by this unit, as assigned in the brief. Candidate: /home/user/veneer/tmp/units/journey-cost/runs/task75-u8-journey-1. Baselines: /home/user/veneer/tmp/units/journey-cost/runs/task75-u3-journey-1 and /home/user/veneer/tmp/units/journey-cost/runs/task75-u3-journey-2. The host-bound journey set is empty.

Final git status --porcelain:
```text
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```
