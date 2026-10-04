Completed the owned showcase proofs on `showcase-proofs`. Commit: `3807993ba74ff7659e60ab7af906c4b98d66275c`. No push, publication, external installation, or agent delegation.

The commands below use `V` for `node node_modules/vitest/vitest.mjs run`, `H` for `--config tmp/probes/proofs5-helpers.config.ts tests/setupBrowser.test.ts`, and `J` for `--config configs/app/vite.journey.config.ts`. Mutation values name the `PROOFS_MUTANT` environment variable; green runs unset it. Each run used the installed dispatch launcher with separate `.log` and `.err` files under `tmp/codex/`.

| Command | Invocation | Red result | Green result |
| --- | --- | --- | --- |
| H1 | `V H -t 'chrome changes\|censuses controls\|delayed collapse\|missing leaves\|roleless computed\|generated first-letter' --reporter=dot` | `helpers`: 6 failed; `proofs5-helpers-red` | 6 passed; `proofs5-controls-green` |
| H2 | `V H -t 'missing leaves\|roleless computed' --reporter=dot` | `secondary`: 2 failed; `proofs5-secondary-red` | Both pass within H1's 6 passing tests |
| H3 | `V H -t 'censuses controls' --reporter=dot` | `pointer`: 1 failed; `proofs5-pointer-red`. `scroll`: 1 failed; `proofs5-scroll-red2` | Passes within H1's 6 passing tests |
| H4 | `V H -t 'inserted open popover' --reporter=dot` | `open`: 1 failed; `proofs5-open-red` | 1 passed; `proofs5-open-green` |
| H5 | `V H -t 'missing leaves' --reporter=dot` | `classes`: 1 failed; `proofs5-classes-red` | 1 passed; `proofs5-classes-green` |
| H6 | `V H -t 'scrollspy keyboard route' --reporter=dot` | `spy`: 1 failed on the offscreen target; `proofs5-spy-red` | 1 passed; `proofs5-spy-green` |
| D | `V --config tmp/probes/proofs5-refusal.config.ts tmp/probes/proofs5-refusal.test.ts --reporter=dot` | `disabled`: 18 failed; `proofs5-refusal-red` | 18 passed; `proofs5-refusal-green` |
| M | `V --config tmp/probes/proofs5-main.config.ts tests/app/browser/main.test.ts --reporter=dot` | `leak`: 1 failed; `proofs5-main-red` | 1 passed; `proofs5-main-green` |
| B | `V --config tmp/probes/proofs5-journey.config.ts -t 'J1 arrives\|J3 browses\|J4 compares' --reporter=dot` | `boot`: 3 failed; `proofs5-boot-red` | 4 passed including the no-capture case, selected with `-t 'J1 arrives\|J3 browses\|J4 compares\|writes no capture'`; `proofs5-boot-green` |
| C | `V --config tmp/probes/proofs5-journey.config.ts -t 'writes no capture' --reporter=dot` | `capture`: 1 failed on the actual PNG; `proofs5-capture-red` | Passes in B's four-test green run |
| T | `V J -t 'motion=' --reporter=dot` | Restored draft assumptions: 9 failed, 27 passed; `proofs5-motion` | All 36 component-table cases pass in the final journey gate |

For reproduction, the launcher form is `node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/codex/NAME.log --errors tmp/codex/NAME.err --cap SECONDS -- COMMAND`. Caps were 180 seconds for helper suites, 120 for individual controls and departure, 240 for disabled mutations, 600 for T, and 900 for final journeys. The named artifacts preserve the measured exits and counts.

The repaired scrollspy route also passed four complete narrow-screen table repetitions against each engine: 72 rows for Veneer and 72 for Bootstrap 5.3.8. Command: `V --config tmp/probes/proofs5-spy.config.ts tmp/probes/proofs5-spy.test.ts --reporter=verbose`, with `SPY_ENGINE` unset for Veneer and `SPY_ENGINE=bootstrap` for Bootstrap. Each run passed its single repeated-sequence test, with a 360-second launcher cap; artifacts `proofs5-spy-proof-veneer` and `proofs5-spy-proof-bootstrap`.

| Carried item | Proof and mutation sensitivity |
| --- | --- |
| 12 | Unchanged rows observe rendered state and family lifecycle records for 650 ms after the act. A real collapse hide scheduled 150 ms later is rejected. Removing the observation fails H1. |
| 11 | Nine disabled triggers run at both widths: six keyboard routes, three ruled default-action routes with computed pointer refusal and post-boot `tabIndex === -1`. Removing restrictions, or the dropdown selector/class guards, changes every target and fails all 18 D cases. Factory focus assertions now run after boot. |
| 15 | All 18 component tables run under both motion preferences. Burst expectations follow independently recorded admitted input and require its lifecycle sequence and destination. Tip/overlay/carousel waits include completion of the padded transition. T supplies the failing draft and final 36-case result. |
| 4, 5 | Comparisons cover chrome and paired component states, including inserted tips and switching a shown popover between faces. Omitting chrome fails H1; omitting inserted-tip readings fails H4. A generated `::first-letter` outside the preflight list is detected; removing that inventory entry fails H1. |
| 2 | Registry leaves are censused after component rows, including closes and dismissals, and after cumulative alert dismissal. Removing every remaining `alert-dismissible` witness is detected; disabling the census fails H5. Its application helper loads only when this showcase census runs, preserving the published-source environment boundary. |
| 7 | The frozen population comes from markup, including active navigation and engine-state figures. Classes and ARIA remain byte-identical through boot, individual clicks/keys, Escape, outside click, and resize. Omitting active navigation fails H2. |
| 10 | Global duplicate-ID and reference checks run after every table and on component assertions, including inserted descriptions. Planted duplicate IDs and dangling tip references are detected; disabling the reader fails H2. |
| 13 | Both mutations were measured across all 21 tables, as recorded below. No no-op mutation survives. |
| 14 | Async showcase cases park the real pointer at `(-1, -1)` in `finally`; teardown also parks it. Disabling parking leaves actual `:hover` active and fails H1. |
| 16 | J3 derives horizontal scrollers from computed overflow and geometry. Removing a scroller's optional role preserves its census membership; restoring the role filter fails H1. |
| 17 | Each no-capture project receives an isolated empty directory. Tests read its real files before work and after disabled placement. Forcing capture writes `arrival--light-390.png` and fails C. |
| 20 | Both widths census native Tab stops and pointer routes, including wrapped-link fragments and labelled checkbox buttons, and refuse disabled controls. Measured Tab populations were 558 at 390 px and 574 at 1280 px, with no omissions. The occlusion-blind pointer mutant fails H3; D verifies all disabled engine routes. |
| 9 | The departure test remounts the departed controls and observes placeholder-click cancellation. Omitting `Showcase` listener abort leaves cancellation active and fails M. |
| F5, F6 | Capture journeys boot before placement and assert the resulting roving tabindex. Omitting boot fails B. Scroll placement waits for settled frames; removing the wait fails H3 while smooth scrolling is still in progress. |

The claim-13 commands were `V --config tmp/probes/proofs5-noop.config.ts tmp/probes/proofs5-noop.test.ts --reporter=verbose` and the corresponding `proofs5-sibling.config.ts` / `proofs5-sibling.test.ts` command. The no-op probe recorded 21 expected rejections (21 probe tests passed). The sibling run recorded 19 kills and one measured survivor before a narrow-scrollspy setup timeout; rerunning both scrollspy tables with `-t 'scrollspy'` passed both measurement cases and recorded both survivors. Artifacts: `proofs5-noop`, `proofs5-sibling`, and `proofs5-sibling2`.

| Table | No-op act | Sibling reader |
| --- | --- | --- |
| face | Killed | Killed |
| theme | Killed | Killed |
| pair | Killed | Killed |
| button | Killed | Killed |
| alert | Killed | Killed |
| tooltip | Killed | Killed |
| popover | Killed | Killed |
| tab | Killed | Killed |
| dropdown | Killed | Killed |
| collapse | Killed | Killed |
| accordion | Killed | Killed |
| toast | Killed | Killed |
| carousel | Killed | Killed |
| offcanvas | Killed | Killed |
| modal | Killed | Killed |
| scrollspy-390 | Killed | Survived |
| scrollspy-1280 | Killed | Survived |
| navbar-390 | Killed | Killed |
| navbar-1280 | Killed | Killed |
| responsive-offcanvas-390 | Killed | Killed |
| responsive-offcanvas-1280 | Killed | Killed |

The two scrollspy mutations resolve the same single Examples navigation through the alternate-width context; their survival is recorded without claiming independent sibling isolation. Header mutations read the opposite button within the same axis while retaining the original branch meanings; the pair reader substitutes both opposite buttons. Those three final header mutations passed their measurement cases using `-t "sibling reader '(face|theme|pair)'"`; artifact `proofs5-sibling-headers`.

Acceptance ran after the last source edit, in the required order. Each exit was read from the completed command.

| Gate | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | 0 | Passed |
| `npm run lint:check` | 0 | Passed |
| `npm run check` | 0 | Passed |
| `npm run build` | 0 | Passed |
| `npm run test:setup:browser` | 0 | 110 passed (110); 83.70 s |
| `npm run test:app:browser` | 0 | 226 passed (226); 23.34 s |
| `npm run test:journey` | 0 | 90 passed (90); 579.40 s |
| `CAPTURE=1 npm run test:journey` | 0 | 90 passed (90); 611.87 s |
| `npm run test:guides` | 0 | 15 passed (15); 1.56 s |
| `npm run test:policy` | 0 | 119 passed, 1 skipped (120); 3.30 s |
| `npm run test:src:browser` | 0 | 787 passed (787); 171.55 s |
| `git diff --check` | 0 | Clean |

The emptied `tmp/captures/states/` contains 304 verified PNGs: 76 states in each of the four variants. The reset and complete file census are recorded in `proofs5-capture-reset.json` and `proofs5-capture-census.json`. `tmp/codex/proofs5-gates.json` names every final gate journal and error log.

Bootstrap references below resolve under the installed `node_modules/bootstrap/` version 5.3.8.

| Adapted premise | Bootstrap reference and adopted proof |
| --- | --- |
| Every disabled trigger is keyboard/pointer reachable | `js/src/tab.js:163,205`, `scss/_nav.scss:50`, `scss/_list-group.scss:70`: inactive disabled tabs are removed from Tab order and pointer hit testing. The three default-action rows follow the fourth brief; the other six retain keyboard activation. |
| Every disabled family is guarded by `restricted: true` | `js/src/dropdown.js:55,125,160`: dropdowns instead filter disabled toggles and check disabled state. Its mutation removes those guards. |
| Reduced motion completes immediately | `js/src/util/index.js:229–256`: Bootstrap pads transition completion by 5 ms. Assertions wait for lifecycle/phase completion even when CSS duration is zero. |
| An unchanged row emits no lifecycle events | `js/src/toast.js:75`: showing an already shown toast emits `show`/`shown` again. The proof retains the act's expected events, then requires that record and state to remain stable through the observation window. |
| Double Enter always produces one fixed outcome | `js/src/collapse.js:112,125,167` and the padded callback above: a second input is ignored while transitioning, but accepted after completion. The proof records admission before the engine handles each real click and checks the corresponding events/state. The direct Bootstrap probe recorded `hide, hidden` for a reduced-motion burst. |
| The first carousel animation frame always has two slides | `js/src/carousel.js:301–365`: both slides remain during a pending transition; only the destination remains after completion. The first-frame proof distinguishes those phases and still requires the correct count. |
| Every enabled control accepts direct pointer hit testing | `scss/forms/_form-check.scss:168–177`: `.btn-check` uses its label. `scss/helpers/_visually-hidden.scss:6` exposes the skip link on focus. `scss/_utilities.scss:704` intentionally supplies pointer-refusing interaction examples. Native radio groups retain their browser-defined sequential focus stop. |
| Disposing an open overlay closes its presentation | `js/src/modal.js:143–151`: disposal releases handlers/backdrop/focus trap without performing hide. Owned fixtures now close through the interface before replacement. |
| A focused scrollspy region remains a usable keyboard target after boundary keys | Bootstrap and Veneer both reproduced lost scrolling with the focused region outside the viewport after Home. Arrangement now restores visibility through Contents and real Tab traversal before each input; H6 rejects omission. Bootstrap's observer reads actual root scrolling (`js/src/scrollspy.js:162–195`); keyboard scrolling itself belongs to Chromium. |

Deviations and limits: no engine source, public types, or page markup were changed. The frozen-state case received a 120-second budget after the expanded real-input sequence exceeded its former 15-second default. Four concurrent journey projects remain configured. A shown modal disposed beside frozen `.modal.show` markup was observed to leave `modal-open`; closing the owned fixture before disposal prevents that state leaking into the next proof.

The chrome comparison normalizes selected-face announcements and temporarily excludes the intentionally different Tailwind example section from the Contents column's stretched height; the Tailwind matrix reads that section separately. Open-state comparisons sample each table's first changing row, with generated identifiers normalized. Pseudo coverage includes generated before/after, applicable form/backdrop/marker pseudos, and first-letter/first-line on rendered blocks with direct text; it does not certify all browser-owned pseudos or every possible component state. These are the coverage limits for the separately owned guide unit.

Final `git status --porcelain`: empty.
