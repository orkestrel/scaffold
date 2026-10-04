# U6 eighth-run report

**Stopped on the deviation contract.** Both full journey runs report **85 passed, 4 failed, 3 skipped**, exit **1**, in **448.98 s** and **486.50 s**. Run 2 introduces the dark-390 navbar motion=false failure outside the brief's named exceptions. U6 acceptance remains unmet. Nothing is committed.

The additional failing title is `drives the 'navbar-390' table through its controls with motion=false`. Run 1 passes in 21.78 s; run 2 fails in 26.66 s. Its reading is `Field notes hidden through {Enter}{Enter}: Condition "Toggle navigation completes {Enter}{Enter}" did not hold within 5000ms (waited 5001.79999999702ms)`. The harness records 33 passed and 1 failed of 34. This has a pass/fail timing pattern, but it is not silently admitted to the named exception set. Hypothesis: it shares the protected disclosure observer's accepted-input undercount. No trace establishes that cause for this navbar failure. The already-running second suite finishes for its full-run evidence; no repair or further browser gate follows the stop.

The failing-title inventory and repeat readings are:

| Variant | Exact title | Run 1 | Run 2 | Class |
| --- | --- | --- | --- | --- |
| light-390 | `J8 drives the engine through the component sections and opens nothing on arrival` | Fail, 10.10 s | Fail, 12.91 s | Ruling 2: reproduces in both; toast perception before showing finishes |
| light-390 | `drives the 'accordion' table through its controls with motion=false` | Fail, 18.34 s | Fail, 22.72 s | Ruling 3: protected observer; reproduces in both |
| dark-390 | `drives the 'tooltip' table through its controls with motion=true` | Fail, 40.95 s | Pass, 43.60 s | Ruling 3 protected observer; load-sensitive by the repeat criterion |
| dark-390 | `drives the 'collapse' table through its controls with motion=false` | Fail, 11.42 s | Fail, 16.42 s | Ruling 2: reproduces in both; burst-observer wait, individual cause remains unproved |
| dark-390 | `drives the 'navbar-390' table through its controls with motion=false` | Pass, 21.78 s | Fail, 26.66 s | Outside the named exceptions: stop |

J8 reads `Named region "Uploads" is not visible` in both runs. The seventh-run diagnostic reads `#toasts-live-toast.toast.fade.show.showing` at (24, 743), 350 × 85, with populated text, display `block`, visibility `visible`, and opacity `0`; Bootstrap's `.toast.showing { opacity: 0; }` wins. These full runs reproduce the refusal, not a fresh opacity trace.

Accordion run 1 times out on Billing cycle → Cancelling a plan, waiting 5008.4 ms. Run 2 times out on Warranty coverage → Returns and exchanges (5003.9 ms) and Billing cycle → Adding seats (5003.3 ms). All use `{Enter}{Enter}`. The seventh trace records seats-panel show/shown/hide/hidden at **26705.4 / 26731.8 / 26732.5 / 26754.9 ms**: both transitions finish within 49.5 ms while the observer later times out. The engine dispatches in document capture before the trigger-capture observer reads `collapsing`, undercounting accepted inputs.

Tooltip run 1 reads `Hint to the left through {Escape}: Refusal emitted a delayed lifecycle event`; run 2 passes. The seventh trace records Escape at **26657.3–26658.4 ms**, sibling Hint to the right mouseover at **26846.8 ms**, then show/hide/hidden at **26852.7 / 26883.2 / 27046.5 ms**. The document-wide refusal recorder includes sibling events. The pointer crossing's origin remains undetermined. The Orchestrator's pre-flip base reading and host-bound versus flip-induced ruling remain outstanding for these protected observers.

Collapse run 1 times out on Delivery details hidden through the Enter burst (5007.3 ms). Run 2 times out on Delivery details shown (5006.1 ms) and Expand details shown (5004 ms). The protected helper is shared with accordion, but the seventh focused collapse diagnostic passed and supplied no failing burst trace. Its individual cause remains unproved.

The light-1280 `drives the 'popover' table through its controls with motion=true` case passes in both runs, **17.43 / 15.33 s**. The seventh run's `Billing status description is shown` timeout does not reproduce in either required run. See the [first run summary](eighth-journey-1-summary.json), [second run summary](eighth-journey-2-summary.json), and [seventh diagnostic](seventh-diagnosis.md).

The retitled case is **`compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover`**. It passes in all variants in both full runs. It compares sorted class tokens, inline style, `data-popper-placement`, `data-bs-popper`, and body style. The outer faces retain their panel-text assertions and read visibility `visible`; the middle face reads `collapse` on every expanded controlled panel. The protected arranger prepares disclosure state under Bootstrap, then the interface switches to the tested face before the act. The engine observers are unchanged.

**The exclusion control stays.** It removes the `.collapse` rule from the served unexcluded sheet's CSSOM, reproducing that utility's exclusion without recompiling. Each panel becomes `visible` and the `collapse` assertion fails; restoring the rule restores `collapse`. The controls take **13.1–126.5 ms** each in run 1 and **14.4–46.6 ms** in run 2. The focused paired run passes 4 cases in 70.88 s. The setup proof detects removing the engine's `show` class and returns to equality after restoration.

The budget is reported, not met:

| Measurement | Run 1 | Run 2 |
| --- | ---: | ---: |
| Primary Vitest wall | 448.98 s | 486.50 s |
| Whole command wall, launcher | 450.722 s | 488.165 s |
| Above the 235 s budget | 213.98 s | 251.50 s |
| Partition internal timer | 68.6208 s | 67.1148 s |
| Partition case, runner timing | 69.0565 s | 67.5907 s |
| Case duration / full wall | 15.4% | 13.9% |

Partition time overlaps other variants and is not an additive wall-time contribution. Both widths retain 1,665 signatures covering 8,112 elements, zero violations, and effective planted-spacing, withheld-important, inverse-face, and stripped-curation controls. The three skips are the partition case outside light-1280. Both full commands add verbose and JSON reporters for timing evidence; the ordinary dot reporter's first Duration line supplies the wall above.

The longest ten cases in each run appear together below. A dash means the case is outside that run's longest ten. “Paired” denotes the retitled case. “Partition” denotes `partitions the shared names under the three faces at both widths`. Each family/motion label denotes `drives the 'FAMILY' table through its controls with motion=VALUE`.

| Case | Variant | Run 1 rank / seconds | Run 2 rank / seconds |
| --- | --- | ---: | ---: |
| scrollspy-390, true | light-390 | 1 / 76.41 | 1 / 79.24 |
| Partition | light-1280 | 2 / 69.06 | 3 / 67.59 |
| scrollspy-390, false | light-390 | 3 / 60.31 | 4 / 61.93 |
| Paired | light-1280 | 4 / 60.18 | 2 / 75.29 |
| Paired | dark-1280 | 5 / 60.02 | 5 / 60.25 |
| carousel, true | light-1280 | 6 / 59.02 | 6 / 58.78 |
| accordion, true | light-390 | 7 / 45.10 | 8 / 46.93 |
| scrollspy-1280, true | light-1280 | 8 / 43.25 | 9 / 45.38 |
| navbar-390, true | dark-390 | 9 / 42.13 | — |
| Paired | dark-390 | 10 / 41.08 | 7 / 51.01 |
| tooltip, true | dark-390 | — | 10 / 43.60 |

The acceptance exits on the final tree are:

| Command | Exit / result |
| --- | --- |
| `npm run check` | 0 |
| `npm run lint:check` | 0 |
| `npm run format:check` | 0 |
| `npm run test:setup:browser` | 0 — 134 passed |
| `npm run build` | 0 |
| `npm run build:showcase` | 0 |
| `npm run test:journey`, run 1 | 1 — 85 passed, 4 failed, 3 skipped |
| `npm run test:journey`, run 2 | 1 — 85 passed, 4 failed, 3 skipped |
| `npm run test:app:browser` | Not run after the deviation stop; the seventh run's 234 passed is not a fresh result |
| `git diff --check` | 0 |
| `sha256sum dist/src/bootstrap/index.css` | 0 — required digest matches |

The initial lint attempt exits 1 on conditional `expect` calls and a missing throw message. The corrected assertions use the case's existing `assert` form with an explicit message; the final sequence reruns check and lint and passes. No timeout is raised, no retry added, no case deleted, and no source, sheet, record, or protected engine section is changed. See the [unit patch](eighth-unit.patch) and [protected-section comparison](eighth-preserved.json).

The Bootstrap digest is `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`. The showcase digest is `2332e9458dc3eef3574c207d32b39f72d950ac1213073c4613e3f403c7612699`, unchanged across the build. Evidence is Chromium-only.

Final `git status --porcelain` is:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```
