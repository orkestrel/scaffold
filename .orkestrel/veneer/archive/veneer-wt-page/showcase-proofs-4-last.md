Stopped under the third brief’s authority rule: claim 15 exposes an engine defect outside this unit’s ownership. No completed proof repair or acceptance pass is claimed.

- **Expected:** With reduced motion, closing the start offcanvas panel through its backdrop restores focus to “Open the start panel,” as Bootstrap 5.3.8 does.
- **Found:** Veneer closes the panel and briefly focuses the opener, then focus moves to `main#content`. Bootstrap restores and retains opener focus under the same shipped markup, reduced-motion preference, and real pointer interaction.
- **Evidence:** The both-motion table run failed only the reduced-motion offcanvas backdrop row. The isolated table reproduced it. The direct comparison recorded Veneer’s sequence as `focus:opener → focus:panel → hidden:body → focus:opener → focus:content`; Bootstrap finished on the opener. Logs: `tmp/codex/proofs4-motion.{log,err}`, `proofs4-offcanvas-isolated.{log,err}`, and `proofs4-focus2.{log,err}`.
- **Done:** Drafted proof changes within the owned files, exercised the tables under both motion preferences, reproduced the failure without contention, compared Bootstrap, and ran the diagnostic control described below. Preserved the unfinished work in [showcase-proofs-4-draft.patch](C:/Users/mikes/WebstormProjects/veneer-wt-page/tmp/codex/showcase-proofs-4-draft.patch) and `tmp/codex/showcase-proofs-4-draft/`. Restored this run’s tracked edits; the worktree is clean. Removed the runtime probes, retaining their source as `tmp/codex/proofs4*.ts.txt`.
- **Not done:** The complete mutation campaign, final acceptance gates, capture portfolio, and commit. Repairing the observed behavior requires an engine change; weakening the focus assertion or changing the pointer interaction would not repair it.
- **Hypothesis:** `src/browser/helpers.ts:933` resolves an animated transition immediately when no CSS transition exists. Reduced motion therefore lets backdrop removal and focus restoration finish before the pointer’s default focus action. Bootstrap retains its 5 ms completion padding even at zero duration.

The diagnostic control changes only the Vite-transformed engine module in memory: replace `if (transitions.length === 0) return Promise.resolve()` with a promise resolved by `realm.setTimeout(resolve, 5)`. No engine file was written. Both comparison cases then passed. This identifies a repair candidate, not an accepted engine fix; cancellation and other consumers remain untested.

The executed commands and measurements are:

```text
A: node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/codex/proofs4-motion.log --errors tmp/codex/proofs4-motion.err --cap 600 -- node node_modules/vitest/vitest.mjs run --config configs/app/vite.journey.config.ts -t 'table through its controls' --reporter=dot

B: node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/codex/proofs4-offcanvas-isolated.log --errors tmp/codex/proofs4-offcanvas-isolated.err --cap 180 -- node node_modules/vitest/vitest.mjs run --config configs/app/vite.journey.config.ts --project journey:dark-1280 -t "drives the 'offcanvas' table through its controls with motion=false" --reporter=verbose

C: node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/codex/proofs4-focus2.log --errors tmp/codex/proofs4-focus2.err --cap 90 -- node node_modules/vitest/vitest.mjs run --config tmp/probes/proofs4-focus.config.ts tmp/probes/proofs4-focus.test.ts --reporter=verbose

D: Set PROOFS4_FOCUS_CONTROL=1, then run C with journal proofs4-focus-control.log and errors proofs4-focus-control.err.

E: node node_modules/@orkestrel/scaffold/dist/agents/skills/orkestrel-dispatch/scripts/launch.js --journal tmp/codex/proofs4-refusal2.log --errors tmp/codex/proofs4-refusal2.err --cap 300 -- node node_modules/vitest/vitest.mjs run --config tmp/probes/proofs4.config.ts tmp/probes/proofs4.test.ts --reporter=verbose

F: node node_modules/vitest/vitest.mjs run --config vite.config.ts --project setup:browser tests/setupBrowser.test.ts -t 'delayed collapse|missing leaves|roleless computed|generated first-letter' --reporter=verbose
```

Command D used PowerShell’s `$env:PROOFS4_FOCUS_CONTROL='1'`. Commands A–F refer to the preserved draft and diagnostic sources, not the restored tree.

| Run | Exit | Tests | Vitest duration | Launcher duration |
| --- | ---: | --- | ---: | ---: |
| A: both-motion component tables | 1 | 35 passed, 1 failed, 44 filtered | 277.52 s | 278.687 s |
| B: isolated reduced-motion offcanvas table | 1 | 1 failed, 24 filtered | 24.39 s | 25.247 s |
| C: Veneer / Bootstrap comparison | 1 | Veneer failed; Bootstrap passed | 4.33 s | 5.387 s |
| D: 5 ms diagnostic control | 0 | 2 passed | 9.74 s | 11.406 s |
| E: disabled routes at both widths | 0 | 2 passed; each exercised all nine triggers | 68.27 s | 69.088 s |
| F: helper controls | 1 | 3 passed, 1 failed, 77 filtered | 4.76 s | — |

No launcher reached its cap. F’s failing assertion expected an existing roleless scroller; the repaired page supplies roles. The draft correction removes one scroller’s role and requires the computed census to retain it; that correction was not rerun before the stop.

The carried items remain unaccepted:

| Item | Proof and mutation status; red-before / green-after evidence |
| --- | --- |
| Claim 12 | Draft wraps unchanged component rows in lifecycle/state observation for 650 ms. A real collapse hide scheduled 150 ms after Escape is detected by F’s passing regression. No guard-removal red-before run or completed green-after gate. |
| Claim 11 | E passes the six keyboard routes and the ruled tab/pill/list default-action routes at 390 and 1280 px. Draft moves the factory focus assertions after boot. Restriction-removal mutations and final green-after run not performed. |
| Claim 15 | Draft adapts double-Enter collapse/accordion/navbar expectations and runs every component table under both preferences. A and B are red on reduced-motion offcanvas focus. C is red and D green for the engine diagnostic control only. |
| Claims 4 and 5 | Chrome/open-state face comparison unfinished. Draft adds first-letter/first-line readings; F detects the first-letter color control outside the preflight list. No inventory-removal red-before run or final green-after gate. |
| Claim 2 | Draft adds registry-leaf census after component-row assertions. F detects removal of `alert-dismissible` carriers. Complete dismissal/close campaign and red-before/green-after pair unfinished. |
| Claim 7 | Draft derives frozen roots from markup, includes static active navigation, and compares class/ARIA serialization through interaction and resize. Complete journey and mutation not run. |
| Claim 10 | Draft adds global ID/reference checks after component rows and tables. F detects a duplicate ID and dangling tip reference. Completed mutation pair not run. |
| Claim 13 | No-op-act and sibling-reader campaign not run; survival table follows. |
| Claim 14 | Draft adds pointer parking to case cleanup and selected `finally` blocks; diagnostic cases park in `finally`. Full ownership sweep and cleanup mutation unfinished. |
| Claim 16 | Draft replaces J3’s role selector with computed overflow and geometry. F exposed the control-premise correction described above. No green-after run of that correction. |
| Claim 17 | Draft provides isolated initially empty no-capture directories and filesystem inventory assertions. Final no-capture journey and planted-PNG mutation not run. |
| Claim 20 | Exploratory centre-point census read 564 controls at 390 px and 584 at 1280 px; wrapped inline links require fragment hit testing. Fragment-aware rerun, Tab census, and complete refusal census unfinished. These diagnostics establish no page blocker. |
| Claim 9 | Draft remounts the owned `main` and records placeholder-link cancellation before/after departure to distinguish a leaked listener. Listener-removal mutation and validation not run. |
| F5 / F6 | Draft boots the capture journeys and waits for settled scroll frames. Capture and mutation runs not performed. |

Claim 13 has no measured survival results:

| Table | No-op-act survivors | Sibling-reader survivors |
| --- | --- | --- |
| face | Unknown | Unknown |
| theme | Unknown | Unknown |
| pair | Unknown | Unknown |
| button | Unknown | Unknown |
| alert | Unknown | Unknown |
| tooltip | Unknown | Unknown |
| popover | Unknown | Unknown |
| tab | Unknown | Unknown |
| dropdown | Unknown | Unknown |
| collapse | Unknown | Unknown |
| accordion | Unknown | Unknown |
| toast | Unknown | Unknown |
| carousel | Unknown | Unknown |
| offcanvas | Unknown | Unknown |
| modal | Unknown | Unknown |
| scrollspy-390 | Unknown | Unknown |
| navbar-390 | Unknown | Unknown |
| responsive-offcanvas-390 | Unknown | Unknown |
| scrollspy-1280 | Unknown | Unknown |
| navbar-1280 | Unknown | Unknown |
| responsive-offcanvas-1280 | Unknown | Unknown |

The acceptance gate status is:

| Gate | Exit | Result |
| --- | --- | --- |
| `npm run format:check` | — | Not run |
| `npm run lint:check` | — | Not run |
| `npm run check` | — | Not run; scoped browser TypeScript checks passed during drafting |
| `npm run build` | — | Not run |
| `npm run test:setup:browser` | — | Full gate not run; F is a filtered development run |
| `npm run test:app:browser` | — | Not run as an acceptance gate |
| `npm run test:journey` | — | Full gate not run; A’s filtered run took 277.52 s and failed |
| `CAPTURE=1 npm run test:journey` | — | Not run; existing portfolio not emptied |
| `npm run test:guides` | — | Not run |
| `npm run test:policy` | — | Not run |
| `npm run test:src:browser` | — | Not run |
| `git diff --check` | 0 | Clean after preserving and removing the draft edits |

The premises adapted under the supplied authority are:

| Premise | Adaptation or limit | Bootstrap 5.3.8 reference |
| --- | --- | --- |
| Disabled tab/pill/list controls have ordinary keyboard/pointer activation routes | Used the fourth brief’s default-action ruling; measured `pointer-events: none` and post-boot `tabIndex === -1`. | `node_modules/bootstrap/scss/_nav.scss:50`, `_list-group.scss:70`; `js/src/tab.js:163`, `:195` |
| Dropdown refusal is a `restricted: true` route | Identified the selector exclusion and component guard as the required mutation targets. Mutation not run. | `node_modules/bootstrap/js/src/dropdown.js:55`, `:124` |
| Every unchanged row emits no lifecycle events | An already shown toast emits `show`/`shown` again. Draft retains the act’s expected-event assertion and observes record stability afterwards. Both toast motion cases passed in A. | `node_modules/bootstrap/js/src/toast.js:75` |
| Double Enter always causes one collapse toggle | Draft expects the second activation under reduced motion; retains both real inputs. Corresponding collapse, accordion, and navbar cases passed in A. | `node_modules/bootstrap/js/src/collapse.js:112`, `:138`, `:169`; transition completion at `js/src/util/index.js:229` |
| Reduced-motion offcanvas completion may be treated as synchronous | Cannot adapt: Bootstrap retains completion padding and restores opener focus. Veneer differs in the executed comparison; repair requires engine ownership. | `node_modules/bootstrap/js/src/util/index.js:235`, `js/src/offcanvas.js:157`, `:244` |

Commit: none. HEAD remains `8f6c9982f12d43127f33f3fbe2df6a9bfb35ac69` on `showcase-proofs`; `git status --porcelain` is empty. No subagents, push, publication, or installation occurred. The sole blocking deviation is the reduced-motion offcanvas focus defect.