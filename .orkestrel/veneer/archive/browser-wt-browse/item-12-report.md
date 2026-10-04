Item 12 is implemented in three local commits. Every final gate passed. Nothing was pushed, published, or installed.

The commits and their evidence are:

| Commit | Changes | Acceptance evidence |
| --- | --- | --- |
| `c797e1a76463e299e33cb3e464ecfb13a648632c` — U1 | Renamed `BrowserWaitOptions`; implemented text absence in both engines; added transition/animation wakes and listener cleanup. | P1: 2 failed before, 2 passed after, 48 skipped. Typecheck and build passed; setup 176 passed/3 skipped; core 1,213 passed; browser 444 passed/1 skipped. |
| `629e52b85358801a4fc4031401231193f05a1357` — U2 | Added boolean validation, absence receipts, interruption wording, journey listing, recording/editing/replay proofs, and copy bound. | Focused core: 6 failed before, 6 passed after, 343 skipped. Journey feature-removal control: 1 failed; implementation: 1 passed, 32 skipped. Core 1,221 passed; browser 444 passed/1 skipped; build passed. |
| `5900987a503844b59b4afcab1649bf666db570c4` — U3 | Updated API summaries, text semantics, navigation/shadow limits, receipts, listing, and bound; removed roadmap item 12. Re-read every citation in remaining items 6–8. | Guide parity: 4 failed/246 passed before, 250 passed after. Policy: 119 passed/1 skipped. |

The red and green proof commands were:

```text
npx vitest run --config vite.config.ts --project src:browser --project service tests/src/browser/BrowserDOMView.test.ts tests/service/browser.test.ts -t 'item 12 P1'
npx vitest run --config vite.config.ts --project src:core tests/src/core/BrowserToolset.test.ts tests/src/core/validators.test.ts tests/src/core/BrowserJourneyToolset.test.ts tests/src/core/recorders/BrowserRecorder.test.ts -t 'item 12'
npx vitest run --config vite.config.ts --project service tests/service/journey.test.ts -t 'item 12'
npm run test:guides
```

The journey red control restored pre-U2 source temporarily and restored the implementation afterward. The U1 acceptance commands were `npm run check`, `npm run test:setup`, `npm run test:src:core`, `npm run test:src:browser`, `npm run build`, and `npm run test:service`. U2 repeated core, browser, build, and service. U3 ran guides and policy.

The P1–P5 probe command, `npm run test:probe -- tmp/probes/item-12.test.ts`, passed its test on Edge/Chromium `154.0.4258.53`. Its readings were:

| Probe | Reading |
| --- | --- |
| P1 | Both worlds received `transitionend` for visibility; text remained at 100 ms and was absent at 300 ms. The no-transition control removed text without an event. |
| P2 | Both worlds received `display` and `opacity` transition completion; text was absent in the following frame. Opacity-only control retained text. |
| P3 | Both worlds received `animationend`; visibility animation removed text, while opacity-only animation retained it. |
| P4 | Shadow-root listeners received the event; document listeners didn’t. `composed` was `false`. |
| P5 | Closed-details body and `hidden="until-found"` text were absent. Opening details included its body. |

P1 was promoted into DOM and CDP tests. The item’s probe files were deleted.

The trimmed tool definitions measure **6,675 UTF-16 code units**, versus the brief’s earlier **6,559**. The bound is **6,700**, the smallest multiple of 50 holding 6,675; the test comment and guide state that derivation. `npm run test:probe -- tmp/probes/item-12-copy.test.ts` passed and recorded the measurement.

Before the cost run, the rejection criterion was a sustained additional 100 ms after the text changed, or a several-fold latency increase, because that would noticeably delay a journey beyond the component animation. `npm run test:probe -- tmp/probes/item-12-cost.test.ts` passed five samples against veneer's served showcase. Host CPU utilization was 23–25% across 16 logical processors, with 102 GiB free of 128 GiB.

| Showcase wait | Median total, ms | Total range, ms | Latency from frame-observed text change, ms |
| --- | ---: | ---: | ---: |
| Toast appearance | 9 | 6–36 | −9–30 |
| Toast absence | 174 | 164–184 | 2–3 |
| Collapse appearance | 4 | 4–9 | −9–−3 |
| Collapse absence | 369 | 355–375 | 1–5 |

Exit totals include the component animations. Negative appearance latency means the wait completed before the next sampling frame; this instrument can’t establish a precise ratio at that scale. It found no sustained 100 ms added delay. No performance tuning or timeout increase was made.

After U3, `node tmp/codex/merge-gates.ts item-12` ran the prescribed gates in order. Their logs are `tmp/codex/item-12-*.log`; the exit table is `tmp/codex/item-12.json`.

| Gate (`npm run …`) | Exit | Tests passed / skipped |
| --- | ---: | ---: |
| `format:check` | 0 | — |
| `lint:check` | 0 | — |
| `check` | 0 | — |
| `test:src:core` | 0 | 1,221 / 0 |
| `test:src:browser` | 0 | 444 / 1 |
| `test:src:server` | 0 | 253 / 9 |
| `test:src:bin` | 0 | 4 / 1 |
| `test:guides` | 0 | 250 / 0 |
| `test:policy` | 0 | 119 / 1 |
| `test:setup` | 0 | 176 / 3 |
| `test:setup:browser` | 0 | 22 / 0 |
| `build` | 0 | — |
| `test:service` | 0 | 152 / 0 |

The U1 full service run returned exit 1: 150 passed and one existing secret-journey `Runtime.callFunctionOn` timeout. The isolated command `npx vitest run --config vite.config.ts --project service tests/service/journey.test.ts` returned exit 0 with 32 passed. U2 returned exit 1: 151 passed and one existing appearance-control replay assertion failed; the same isolated command returned exit 0 with 33 passed. Both reruns kept their original budgets.

The final full service run passed all 152 tests, exit 0. The complete final gate command returned exit 0, and `git diff --check` returned exit 0.

Deviations and limits: the initial combined cost probe exceeded the existing 5-second per-test limit, so its samples were split into separate tests. The installed discovery script returned exit 1 for browser instance-name mismatches; actual browser gates collected and ran those tests. No scaffold-owned file was changed. Execution and gates were performed without delegation, as the brief directs; no independent review was run.

Final `git status --porcelain` is empty. The report is saved at `tmp/codex/item-12-report.md`.
