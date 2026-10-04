Stopped under the [brief’s timeout rule](/home/user/scaffold/tmp/codex/flip-journeys-brief.md:269). **U6 is incomplete; nothing was committed.**

The partition case’s limit remained 300 seconds. It stayed in progress for **302.524 seconds after its last in-case output**, then the runner killed it at 420.122 seconds:

```text
exit=null signal=SIGKILL capped=true duration_ms=420122
```

The runner returned **124**. Vitest emitted no final case duration or timeout message. All recorded child processes exited. [Timeout evidence](/home/user/veneer/tmp/units/flip-journeys/stop-evidence.json).

**Hypothesis:** repeated CSSOM scans in `collectPartition`/`attributeDeparture` occupied the browser thread and delayed the result and timeout callback. This was not profiled.

The [complete report](/home/user/veneer/tmp/units/flip-journeys/report.md) includes every scenario row, case disposition, gate result, and all 67 artifact paths.

Findings:

- **Statecharts:** nine face rows and six pair rows implemented and successfully exercised by the setup case. Amended journey harness counts per variant remain unmeasured. [Rows](/home/user/veneer/tmp/units/flip-journeys/statechart-rows.json).
- **Specimens:** all 23 triples repeated exactly across two logged setup runs. No P5 or caption departure was found.
- **Partition:** no clause, skip, attribution, or page-control counts were produced. All three final snapshots held `Motion` active. The helper’s planted/removed fixture control passed.
- **Census, light-1280:** Bootstrap had 33 expected undeclared tokens; both Tailwind faces had 21. [Exact lists](/home/user/veneer/tmp/units/flip-journeys/census.json).
- **Engine output, light-1280:** alert, popover, carousel, modal, and scrollspy-1280 matched across all three faces. All six shown-popover face switches passed. The case took 45.049 seconds.
- **390-pixel header:** measurement implemented, but not run before the stop.

Triples below are **bootstrap / unexcluded / tailwindcss**:

| Row | Reading | 1280 px | 390 px |
|---|---|---|---|
| 1 | Button padding-left | 12px / 32px / 32px | 12px / 32px / 32px |
| 2 | `.mt-3` margin-top | 16px / 16px / 12px | 16px / 16px / 12px |
| 3 | `.gap-4` column-gap | 24px / 24px / 16px | 24px / 24px / 16px |
| 4 | `.rounded` radius | 6px / 6px / 4px | 6px / 6px / 4px |
| 5 | `.collapse` display | block / block / block | block / block / block |
| 6 | `.collapse` visibility | visible / collapse / visible | visible / collapse / visible |
| 7 | `.container` padding-left | 12px / 12px / 12px | 12px / 12px / 12px |
| 8 | `.container` max-width | 1140px / 1280px / 1140px | none / none / none |
| 9 | Pill radius | 800px / 800px / 800px | 800px / 800px / 800px |
| 10 | `.grid` display | block / grid / grid | block / grid / grid |
| 11 | `.md:flex` display | block / flex / flex | block / block / block |
| 12 | Arbitrary margin-top | 0px / 16px / 16px | 0px / 16px / 16px |
| 13 | Bare heading font-size | 20px / 20px / 16px | 20px / 20px / 16px |
| 14 | `.h5` font-size | 20px / 20px / 20px | 20px / 20px / 20px |
| 15 | `.card-title` font-weight | 500 / 500 / 500 | 500 / 500 / 500 |
| 16 | `.card-text` margin-bottom | 16px / 16px / 16px | 16px / 16px / 16px |
| 17 | Bare paragraph margin-bottom | 16px / 16px / 0px | 16px / 16px / 0px |
| 18 | Bare image display | inline / block / block | inline / block / block |
| 19 | Bare list marker | disc / none / none | disc / none / none |
| 20 | `svg.bi` display | inline / block / inline | inline / block / inline |
| 21 | `[hidden]` display | flex / none / none | flex / none / none |
| 22 | `.border-1` border width | 0px / 1px / 1px | 0px / 1px / 1px |
| 23 | Responsive text alignment | left / left / left | center / center / center |

Row 23 at **768 px** read **left / left / left**. [Measurement records](/home/user/veneer/tmp/units/flip-journeys/tailwind-readings.json).

The baseline full journey wall was **314.30 seconds**, against the **235-second budget**, with 40 failures and 48 passes. No amended full-run wall was obtained. The complete light-1280 iteration took **396.72 seconds**, with 19 passes and one partition-arrangement failure. No JSON project spans or runner-reported peak memory were produced.

| Checkpoint | Exit | Result |
|---|---:|---|
| Baseline build | 0 | Passed |
| Baseline setup | 1 | 119 passed, 9 failed |
| Baseline journeys | 1 | 48 passed, 40 failed |
| `check` | 0 | Passed |
| `lint:check` | 0 | Passed |
| `format:check` | 0 | Passed |
| Full amended setup | 0 | 130 passed |
| Focused helper confirmation | 0 | 2 passed |
| Complete light-1280 iteration | 1 | 19 passed, 1 failed |
| Focused partition arrangement | 1 | Condition wait failed |
| Final focused partition | 124 | Runner cap reached |
| Bootstrap digest | 0 | Matched |
| `git diff --check` | 0 | Passed |

Successful checks preceded the final mount-arrangement change and **do not establish final acceptance**. Every intermediate exit and baseline failing title is preserved in the [gate records](/home/user/veneer/tmp/units/flip-journeys/gates.json) and [failure list](/home/user/veneer/tmp/units/flip-journeys/baseline-failures.txt).

The [case inventory](/home/user/veneer/tmp/units/flip-journeys/case-inventory.md) marks:

- `setupBrowser.test.ts`: 78 kept, 9 amended, 2 added.
- `app/browser/integration.test.ts`: 8 kept, 9 amended.
- `setupStyles.test.ts`: all 36 kept.
- No complete case deleted; the obsolete matrix controls and equality assertions were replaced as specified.

Not run after the stop: final acceptance gates on the latest edit, acceptance rebuild, `build:showcase`, amended full journeys, `test:app:browser`, remaining variants, header harness placements, 390-pixel header measurement, and page partition controls. These commands have no generated skip line because they were never launched; the exact stopping record is quoted above.

Edited files:

- [tests/setupBrowser.ts](/home/user/veneer/tests/setupBrowser.ts)
- [tests/setupBrowser.test.ts](/home/user/veneer/tests/setupBrowser.test.ts)
- [tests/app/browser/integration.test.ts](/home/user/veneer/tests/app/browser/integration.test.ts)

The protected engine sections and disclosure functions remain unchanged. [Diff](/home/user/veneer/tmp/units/flip-journeys/changes.patch) · [Artifact manifest](/home/user/veneer/tmp/units/flip-journeys/artifact-manifest.txt).

`showcase/browser.html` before and after:

```text
2332e9458dc3eef3574c207d32b39f72d950ac1213073c4613e3f403c7612699
```

Bootstrap before and after:

```text
7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f
```

Final `git status --porcelain`:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```

The 110 ignored files belonging to `flip-probe-3` under `tmp/probes/flip4` are **not this unit’s changes**. They were untouched by this unit and appear in the [foreign-file inventory](/home/user/veneer/tmp/units/flip-journeys/foreign-files.txt).