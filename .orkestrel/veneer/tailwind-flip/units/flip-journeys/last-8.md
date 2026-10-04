**Stopped on the deviation contract.** Both journey runs report **85 passed, 4 failed, and 3 skipped**, exit **1**. Run 2 introduces a navbar failure outside the brief’s named exceptions. U6 acceptance remains unmet; nothing was committed.

| Measurement | Run 1 | Run 2 |
|---|---:|---:|
| Journey wall time | 448.98 s | 486.50 s |
| Over the 235 s budget | 213.98 s | 251.50 s |
| Partition internal timer | 68.6208 s | 67.1148 s |
| Partition runner duration | 69.0565 s | 67.5907 s |
| Partition duration / wall | 15.4% | 13.9% |

Partition time overlaps other variants. Both runs retain zero violations at both widths and every partition control.

Every failing title and its classification follows:

| Variant and title | Run 1 | Run 2 | Classification |
|---|---|---|---|
| light-390 — `J8 drives the engine through the component sections and opens nothing on arrival` | Fail, 10.10 s | Fail, 12.91 s | Ruling 2: reproduces in both |
| light-390 — `drives the 'accordion' table through its controls with motion=false` | Fail, 18.34 s | Fail, 22.72 s | Ruling 3: protected observer; reproduces in both |
| dark-390 — `drives the 'tooltip' table through its controls with motion=true` | Fail, 40.95 s | Pass, 43.60 s | Protected observer; load-sensitive |
| dark-390 — `drives the 'collapse' table through its controls with motion=false` | Fail, 11.42 s | Fail, 16.42 s | Ruling 2: reproduces in both; individual cause unproved |
| dark-390 — `drives the 'navbar-390' table through its controls with motion=false` | Pass, 21.78 s | Fail, 26.66 s | **Outside named exceptions: stop** |

The navbar reading is:

> Field notes hidden through {Enter}{Enter}: Condition "Toggle navigation completes {Enter}{Enter}" did not hold within 5000ms (waited 5001.79999999702ms)

Its harness reports 33 passed and 1 failed of 34. A shared disclosure-observer undercount is a hypothesis, not an established navbar diagnosis.

J8 reads `Named region "Uploads" is not visible` in both runs. The seventh diagnostic found the populated, on-screen toast at `opacity: 0` under `.toast.showing`. These runs reproduce the refusal without taking a fresh opacity trace.

Accordion’s Enter-burst failures affect Cancelling a plan in run 1, and Returns and exchanges plus Adding seats in run 2. The seventh trace records show/shown/hide/hidden at **26705.4 / 26731.8 / 26732.5 / 26754.9 ms**. Both transitions finish within 49.5 ms, while the protected observer undercounts accepted inputs after document-capture dispatch sets `collapsing`.

Tooltip’s first-run reading is `Hint to the left through {Escape}: Refusal emitted a delayed lifecycle event`. The seventh trace records Escape at **26657.3–26658.4 ms**, sibling mouseover at **26846.8 ms**, then show/hide/hidden at **26852.7 / 26883.2 / 27046.5 ms**. The document-wide recorder includes sibling events. The pointer crossing’s origin remains undetermined. Host-bound versus flip-induced classification remains for the Orchestrator’s base reading.

Collapse times out on the Delivery details Enter burst in both runs, and Expand details in run 2. Its shared observer is implicated, but an exact failing event trace remains unavailable.

The light-1280 popover motion=true case **passes both runs**, taking **17.43 / 15.33 s**. Its earlier `Billing status description is shown` timeout does not reproduce.

The retitled case is:

`compares paired open engine states under bootstrap, unexcluded, and tailwindcss, reads the documented collapse departure, and switches a shown popover`

It passes in every variant in both full runs. Engine equality includes class tokens, inline styles, Popper attributes, and body style. Outer faces retain panel-text assertions and `visibility: visible`; the middle face asserts `visibility: collapse`.

**The exclusion control stays.** Removing `.collapse` from the served unexcluded sheet’s CSSOM makes the panels visible and fails the departure assertion; restoration returns them to collapse. Controls cost **13.1–126.5 ms** each in run 1 and **14.4–46.6 ms** in run 2.

The longest ten cases per run are combined below. “Paired” denotes the retitled case; family labels denote `drives the 'FAMILY' table through its controls with motion=VALUE`. A dash means outside that run’s longest ten.

| Case | Variant | Run 1 rank / seconds | Run 2 rank / seconds |
|---|---|---:|---:|
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

The acceptance exits are:

| Command | Exit / result |
|---|---|
| `npm run check` | 0 |
| `npm run lint:check` | 0 |
| `npm run format:check` | 0 |
| `npm run test:setup:browser` | 0 — 134 passed |
| `npm run build` | 0 |
| `npm run build:showcase` | 0 |
| `npm run test:journey`, run 1 | 1 |
| `npm run test:journey`, run 2 | 1 |
| `npm run test:app:browser` | Not run after the deviation stop |
| `git diff --check` | 0 |
| `sha256sum dist/src/bootstrap/index.css` | 0 — required digest matches |

Bootstrap digest: `7932f7a573bbacf39037481c0e0bbc94a0de59c029b4d494fd1956f301c6d49f`

Showcase digest: `2332e9458dc3eef3574c207d32b39f72d950ac1213073c4613e3f403c7612699`

No timeout was raised, retry added, or case deleted. Protected engine sections and disclosure helpers remain byte-equal to HEAD. See the [complete report and evidence links](/home/user/veneer/tmp/units/flip-journeys/eighth-report.md).

Final `git status --porcelain`:

```text
 M tests/app/browser/integration.test.ts
 M tests/setupBrowser.test.ts
 M tests/setupBrowser.ts
```