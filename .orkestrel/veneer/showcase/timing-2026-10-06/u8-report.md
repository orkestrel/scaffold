`COMPONENT_WAIT` is **32,600 ms**. Execution gates passed; **R3’s enclosing-slack criterion remains unmet** and is reported for U9.

The controlling description is `animations div.modal`: maximum **598.1 ms** in `task75-u7-probe-2`, minimum **11.0 ms** in `task75-u7-probe-1`, and own ratio **54.372727**. That ratio exceeds both band ratios, **1.1637** and **1.265340**:

`ceil(598.1 × 54.372727 / 100) × 100 = 32,600 ms`

The derivation includes both U7 journey probes and both U7b header runs, excluding sub-10 ms readings from own ratios.

[Full diff](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/change.patch) · [Complete output with verbatim commands and evidence](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/report.md)

Each command link contains its exact invocation. Run folders below are under `/home/user/veneer/tmp/units/journey-cost/runs/`.

| Gate / command | Folder | Exit | Bare result |
|---|---|---:|---|
| [Format](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/report.md:15) | Checkout | 0 | `All matched files use the correct format.` |
| [Lint](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/report.md:28) | Checkout | 0 | No output |
| [Single-argument grep](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/report.md:41) | Checkout | 1 | No matches |
| [Diff whitespace](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/report.md:54) | Checkout | 0 | No output |
| [TypeScript](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/report.md:195) | `task75-u8-typecheck-1` | 0 | No output |
| [Setup browser](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/report.md:208) | `task75-u8-setup-1` | 0 | `Tests 147 passed (147)` |
| [Showcase browser](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/report.md:222) | `task75-u8-showcase-1` | 0 | `Tests 22 passed (22)` |
| [Full journey](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/report.md:236) | `task75-u8-journey-1` | 0 | `Tests 94 passed (94)` |
| [Duration instrument](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/report.md:83) | `task75-u8-analysis-1` | 0 | `Wrote /home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/durations.md` |

Deviations:

- **Slack:** 10 journey/Showcase titles and 43 setup callers have insufficient measured slack. [Every affected title is recorded](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/report.md:250); timeouts remain unchanged for U9. Hypothesis: the modal description combines residual and complete transitions, producing the large own ratio.
- **Instrument coverage:** its existing ratio calculation retains sub-poll minima and omits non-statechart settle families. Supplemented its unchanged output with the ruled derivation and enclosing-test slack checks.
- **Queue violation:** an ancillary `run.ts` invocation without `flock` executed Chromium `--version`. It then exited 64 because stdin was closed. The direct Node instrument invocation passed. The queue deviation cannot be undone; [evidence is retained](/home/user/veneer/tmp/units/journey-cost/runs/task75-u8-analysis-1/report.md:317).
- **Metadata export:** a quoting error exited 2 before execution; corrected with a quoted Node heredoc.
- **Literal location:** the described non-oracle `5_000` literal belonged to `settleShowcaseScroll`; replaced it while preserving its predicate.

The Orchestrator’s comparison remains pending against `task75-u3-journey-1` and `task75-u3-journey-2`.

`git status --porcelain` lists only the owned files. Nothing was committed.

```text
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```