# J-CONCERNS-A report (opus on Opus 5.5)

Retained verbatim from the unit's final message in its completion notification on 2026-09-25, because its transcript file was empty. The brief is `units/j-concerns-a-brief.md`.

---

# J-CONCERNS-A report

All five cells are closed by cases. Every case I added went red against its named mutation, and each mutation was reverted with its digest checked. I found no source defect, so `src/**` is unchanged and I have no report-only patches. `npm run check`, `npm run lint:check`, and `npm run format:check` all exit 0, and both owned test files pass.

## Files touched

In the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/concerns-a` on branch `unit/concerns-a`, base `0865c67`:
- `tests/src/browser/ScrollSpy.test.ts`: four cases added and the viewport smooth-scroll case strengthened.
- `tests/src/browser/Button.test.ts`: two cases added, plus an `afterEach(() => scene.clear())` hook and imports of the token and button cascades.
- `tmp/j-concerns-a/` (ignored by git), which holds:
  - the mutation instrument `mutate.cjs` and its runner `mutations.sh`;
  - the pristine source copies;
  - the logs `mutations-final.log.txt`, `owned-green.log.txt`, `check.log.txt`, `lint-check.log.txt`, and `format-check.log.txt`;
  - `j-concerns-a.diff` and `j-concerns-a-status.txt`.

Diffstat:
```
 tests/src/browser/Button.test.ts    |  59 +++++++++++-
 tests/src/browser/ScrollSpy.test.ts | 183 +++++++++++++++++++++++++++++++++++-
 2 files changed, 237 insertions(+), 5 deletions(-)
```

## Cells

Each mutation was run against the whole test file for its engine through `bash tmp/j-concerns-a/mutations.sh <mutation>`. After each run, `node tmp/j-concerns-a/mutate.cjs restore` checked the pristine digests: `8d39eba2…9545` for `ScrollSpy.ts` and `993c63d0…2e4` for `Button.ts`.

### S-CANCEL: a ruling, with an added case

**Case added:** `activates every entering link of a delivery when a listener prevents each activate event, reading none as prevented`

**Bootstrap source:**
- `scrollspy.js:233` triggers `activate.bs.scrollspy` and never reads `defaultPrevented`.
- `dom/event-handler.js:282` builds the event with `cancelable: true`.
- A prevention therefore changes nothing in Bootstrap, and none changes anything here.

| Mutation | Red reading, verbatim |
| --- | --- |
| `scrollspy-cancel`: `if (!emitEvent(..., true)) return false`, so the event becomes cancelable and a prevention stops the delivery | `AssertionError: expected [ [ …(3) ], …(1) ] to deeply equal [ [ …(3) ], …(2) ]`, with the added case at `:166` |

The same mutation also turns the existing `activates the lower entering section…` case red, through its `cancelable` read: `expected [ …(5) ] to deeply equal [ …(5) ]`. The file read `2 failed | 30 passed (32)`.

### S-FOCUS: a ruling, with two added cases

**Bootstrap source:** `scrollspy.js` moves no focus. Its smooth branch at lines 135 to 149 prevents the click and scrolls, and nothing else.

**Case 1:** `leaves focus on the element that held it when a scroll activates another link`

| Mutation | Red reading, verbatim |
| --- | --- |
| `scrollspy-focus-link`: `link.focus()` before the dispatch | `AssertionError: expected [ <a …(2)></a>, <a …(2)></a> ] to deeply equal [ <a …(2)></a>, …(1) ]` (`1 failed | 31 passed`) |

**Case 2:** `keeps focus on the link a keyboard activation of the smooth scroll pressed, where the fragment navigation it prevents moves it`

| Mutation | Red reading, verbatim |
| --- | --- |
| `scrollspy-focus-section`: `section.tabIndex = -1; section.focus({ preventScroll: true })` in `#scrollTo` | `AssertionError: expected <section id="spy-four" …(2)></section> to be <a class="nav-link active" …(1)></a> // Object.is equality` (`1 failed | 31 passed`) |
| `scrollspy-navigate`: `event.preventDefault()` removed | `AssertionError: expected '#spy-four' to be '' // Object.is equality`. The same mutation also turns four existing or added cases red (`5 failed | 27 passed`). |

Case 2 has a built-in control. The link whose section sits outside the host is not handled by the scrollspy, so its native fragment navigation runs, and that navigation moves focus off the link.

### S-MOTION: an existing case, one strengthened case, and one added case

**Existing case:** `scrolls the host smoothly to the section a clicked link names, preventing the click, and leaves a section outside the host alone`.

| Mutation | Red reading, verbatim |
| --- | --- |
| `scrollspy-instant-host`: the host's `behavior: 'smooth'` becomes `'instant'` | `AssertionError: expected false to be true // Object.is equality`, from its intermediate-position assertion (`2 failed | 30 passed`) |

This case tells the mutation apart from the passing case.

**Existing case, strengthened:** `scrolls the document smoothly when the host does not clip its overflow`.

| Mutation | Reading |
| --- | --- |
| `scrollspy-instant-view`: the viewport's `'smooth'` becomes `'instant'` | Green at first (`32 passed`), so the case did not prove what its title claims. I added an assertion on the window's intermediate scroll positions. It then read `AssertionError: expected false to be true // Object.is equality` (`1 failed | 31 passed`). |

**Case added:** `scrolls the host smoothly under staged reduced motion, reading no motion preference`.

| Mutation | Red reading, verbatim |
| --- | --- |
| `scrollspy-reduced`: `matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'` | `AssertionError: expected false to be true // Object.is equality` (`1 failed | 31 passed`) |

### B-FOCUS: a ruling, with an added case

**Case added:** `leaves focus where it is at each toggle, on its host or on another control`

**Bootstrap source:** `button.js:36-39` writes the class and `aria-pressed` and nothing else. Its data API at lines 57 to 64 prevents the click and toggles, with no focus call.

| Mutation | Red reading, verbatim |
| --- | --- |
| `button-focus`: `this.#host.focus()` after the dispatch | `AssertionError: expected <button type="button" …(2)></button> to be <button type="button"></button> // Object.is equality` (`1 failed | 45 passed`) |
| `button-blur`: `this.#host.blur()` after the dispatch | `AssertionError: expected <body><div>…(2)</div></body> to be <button type="button" …(2)></button> // Object.is equality` (`1 failed | 45 passed`) |

### B-MOTION: a ruling, with an added case

**Case added:** `completes a toggle and dispatches its event while the shipped cascade still transitions the host`. It loads the shipped `_tokens.scss` and `_button.scss` cascades.

**Bootstrap source:** `button.js:38` toggles the class and sets the attribute in one statement, without waiting on any transition.

| Mutation | Red reading, verbatim |
| --- | --- |
| `button-motion`: `if (this.#host.getAnimations().length === 0) emitEvent(...)` | `AssertionError: expected [] to deeply equal [ Array(1) ]` (`1 failed | 45 passed`) |

Only this case goes red. Every existing Button case stays green under this mutation, because they use detached or unstyled hosts.

## Unknowns, measured on this host (Chromium 153)

- **Reduced motion.** Chromium does not honour `prefers-reduced-motion` for `scrollTo({ behavior: 'smooth' })`. I staged reduced motion with `stageMedia({ motion: false })` and took these readings in a probe, which I then deleted:

  | Scroll | Scroll events under reduced motion | Scroll events with no preference |
  | --- | --- | --- |
  | Host, smooth | 38 | 37 |
  | Window, smooth | 44 | 44 |
  | Host, instant | 1 | 1 |

  Bootstrap passes the same smooth request, so it scrolls smoothly under reduced motion in Chromium too. The added reduced-motion case pins that parity. If you rule later that the engine must honour the preference, this case is the one you flip.
- **Trusted verb.** The focus proof does not need a real pointer. I used `traverseAccessible` with `pressKeys('{Enter}')`, starting from `mountTraversalStart`. In the probe, a trusted `clickAccessible` also left focus on the link. Native fragment navigation moved focus off the link.

## Defects

I found no source defect, so there is no failing-first reading for a source fix. The one proof gap was the viewport case: its assertions did not tell a smooth scroll from an instant one. I closed it in the test file, as shown under S-MOTION.

## Report-only patches

None. No sentence in `guides/veneer.md` is made false, and I added no reusable helper to `tests/setupBrowser.ts`.

## Acceptance output

```
format:check exit=0   (All matched files use the correct format. Finished in 10849ms on 476 files using 16 threads.)
lint:check exit=0     (oxlint --config .oxlintrc.json --deny-warnings . — no diagnostics)
check exit=0          (tsc root, check:src core/browser/styles, check:app vue-tsc)
npx vitest run --config vite.config.ts --no-cache --project src:browser tests/src/browser/ScrollSpy.test.ts tests/src/browser/Button.test.ts
 Test Files  2 passed (2)
      Tests  78 passed (78)
```

## `git status --short`

```
 M tests/src/browser/Button.test.ts
 M tests/src/browser/ScrollSpy.test.ts
```

## Deviation state

None. I settled these within the brief's scope:
- **Case placement.** The cancellation and activation-focus cases sit after `clears the active link…`. The keyboard-focus and reduced-motion cases sit after the viewport smooth case. The Button cases sit before `releases hooks…`.
- **The viewport case.** I strengthened the existing case rather than adding a duplicate, because its title already claims smoothness.
- **Orchestrator note.** The fragment-navigation control in the keyboard-focus case changes the test page's `location.hash`. A `history.replaceState` call in `onTestFinished` restores it. The whole suite run is yours to take.
