# U8 fix-round report — implementer (Opus 5), returned 2026-08-15T13:29Z

All six items are closed and the gates are green. Final report.

## Touched files

| File | Change |
| --- | --- |
| `/workspace/supervisor/app/browser/styles/focus.css` | Added `.btn-check:focus-visible + .btn` to the ring's selector list; rewrote the mechanism comment to name `[tabindex]` as the load-bearing term (items 2, 3) |
| `/workspace/supervisor/tests/setupBrowser.ts` | Added `readRing`, the accessibility describers (`isRendered`, `collapseText`, `resolveRole`, `resolveName`, `resolveStates`, `describeTree`, `describeFocus`, `describeSurface`), the `Journal` recorder + `JOURNAL`, `fillField`; journal wiring in `mountShell`/`pressControl` and a release hook. **Purely additive: 506 insertions, 0 deletions — every existing reader is byte-identical** (items 2, 5) |
| `/workspace/supervisor/tests/app/browser/contrast.test.ts` | Added `measureRing` and the `readFilters` pass; reading count 29 → 30 (item 2) |
| `/workspace/supervisor/tests/app/browser/portfolio.test.ts` | Added the directory-membership proof; `shoot` writes each frame's accessibility snapshot; `retain` writes each scenario's steps and console logs; `note` records programmatic drives (items 1, 5) |
| `/workspace/supervisor/app/browser/helpers.ts` | `deriveAddress` → `deriveLineage`, TSDoc restated (item 4) |
| `/workspace/supervisor/app/browser/components/{PhaseView,TaskView,WorkflowView}.vue` | Consumer rename (item 4) |
| `/workspace/supervisor/tests/app/browser/helpers.test.ts` | Consumer rename; the mis-named test renamed to what it asserts, with the collapse decision recorded beside it (items 4, 6) |

```
 app/browser/components/PhaseView.vue    |   4 +-
 app/browser/components/TaskView.vue     |   4 +-
 app/browser/components/WorkflowView.vue |   4 +-
 app/browser/helpers.ts                  |  18 +-
 app/browser/styles/focus.css            |  23 +-
 tests/app/browser/contrast.test.ts      |  54 +++-
 tests/app/browser/helpers.test.ts       |  29 +-
 tests/app/browser/portfolio.test.ts     | 168 ++++++++++-
 tests/setupBrowser.ts                   | 506 ++++++++++++++++++++++++++++++++
 9 files changed, 762 insertions(+), 48 deletions(-)
```

## Per item

**1 — Portfolio membership enumerates the directory.** New always-on proof `Portfolio registry > holds only registered artifacts on disk, each with bytes in it`. Membership comes from `import.meta.glob` over the real directory (resolved at transform time, so it reads what the previous run left); bytes come through `commands.readFile`. It covers the new `.txt` artifacts as well as the frames, so it is also the drift check on the artifact names.

Both limbs shown able to fail, separately:

```
# orphan planted: : > __screenshots__/portfolio/orphan-narrow-dark.png
FAIL tests/app/browser/portfolio.test.ts > Portfolio registry > holds only registered frames on disk…
AssertionError: expected [ 'orphan-narrow-dark.png' ] to deeply equal []
 Tests  1 failed | 20 skipped (21)

# orphan removed, login-narrow-dark.png truncated to 0 bytes
AssertionError: expected [ 'login-narrow-dark.png' ] to deeply equal []
 Tests  1 failed | 20 skipped (21)

# frame restored
 Tests  1 passed | 20 skipped (21)
```

**2 — The register filters wear the ring.** The label reading ran red before the stylesheet change and green after, same command (`npx vitest run --project app:browser tests/app/browser/contrast.test.ts`):

| | light | dark |
| --- | --- | --- |
| before (halfmoon halo on the label) | **2.25:1** | **1.93:1** |
| after (app ring on the label) | **4.34:1** | **4.83:1** |
| bar | 3:1 | 3:1 |

Red: `Tests 2 failed (2)`, both themes reporting `focus ring: register filter` under bar. Green: `Tests 2 passed (2)`.

The reading targets the label (`findText(element, 'label', 'Records')`) and the focus stays on the input it addresses, via the new `readRing(control, worn)`. The measured resting surface is the *checked* label's primary fill — the harder of the two cases, since an unchecked label is transparent and the ring reads far higher against the pane.

Shipped-cascade verification, from `dist/app/browser/assets/index-*.css`:

```css
.btn-check:focus-visible+.btn,.btn:focus-visible{…;box-shadow:var(--bs-btn-focus-box-shadow);outline:0}
…
.btn-check:focus-visible+.btn{outline:var(--bs-focus-ring-width) solid var(--app-focus-color);outline-offset:var(--app-focus-offset)}
```

Equal weight (0,3,0), app rule last. The guide sentence "every control now wears the same opaque ring" now reads true against the shipped cascade.

**Spot-check of the (0,2,0) bound** (every halfmoon rule declaring `outline:0`/`outline:none`, enumerated from `node_modules/halfmoon/css/halfmoon.min.css`). Nothing found above the bound that competes:

- at (0,2,0), losing to source order as the reviewer bounded them: `.accordion-button:focus`, `.btn-close:focus`, `.btn:focus-visible`, `.carousel-control-{next,prev}:{focus,hover}`, `.form-check-input:focus`, `.form-control:focus`, `.form-control-plaintext:focus`, `.form-range:focus`, `.form-select:focus`, `.nav-link:focus-visible`, `.navbar-toggler:focus-visible`, `.page-link:focus`;
- at (0,1,0), unconditional: `.modal`, `.modal-content`, `.offcanvas`, `.sidebar` — below the bound;
- **two above it, neither a defect.** `button:focus:not(:focus-visible)` is (0,2,1) but matches only the complement of `:focus-visible`, so it never competes. `.focus-ring:focus` carries `outline:0 !important` and would beat any unimportant rule — but `.focus-ring` is used nowhere in `app/` (`grep -rn "focus-ring" app/` returns only this stylesheet's own comment and its `--bs-focus-ring-width` reference). Reported, not fixed; nothing to fix while the class is unused.
- The only competing rule above (0,2,0) is `.btn-check:focus-visible+.btn` at (0,3,0), which item 2 closes. `.btn-check` appears exactly once in `app/` (`FeedList.vue:117`).

**3 — `focus.css` records its real mechanism.** The comment now states that `[tabindex]` is an attribute selector weighing as much as a class, that it is the most specific `:is()` argument and therefore lifts the compound to (0,2,0), and that removing it drops the compound to (0,1,1) and loses the tie. The false "element beside the state / class beside the state weigh the same" claim is gone.

**4 — One concept, one term.** `deriveAddress` (app) → `deriveLineage`; every consumer updated in the same change. `grep -rn "deriveAddress" app/ tests/` now returns only `tests/src/core/helpers.test.ts` (the published `src/core` symbol, untouched) and one deliberate mention in the new TSDoc explaining why the app-side helper cannot hold that name. The rendered "Address" label and the `address` computed in each view are unchanged.

**5 — The capture run retains the full portfolio.** Per the reference's three rows, written beside the frames in `tests/app/browser/__screenshots__/portfolio/` (already gitignored by `tests/**/__screenshots__/`):

- `<state>-<viewport>-<theme>-tree.txt` — accessible tree (roles, names, states) plus focus order, taken after the frame under the same viewport, named for the frame it belongs to;
- `<state>-steps.txt` — the interaction log as an action/trigger/observed-result table;
- `<state>-console.txt` — everything the page emitted while that scenario ran.

The steps are produced *by* the interaction rather than narrated beside it: `mountShell`, `pressControl` and the new `fillField` record their own trigger and read the result off the surface (`describeSurface`). `fillField` reads the value back off the field, so a field that refused or reformatted input says so. Only the programmatic drives (operator calls, seeded transport events) are noted by hand, and each is noted after the wait that observed it.

Full capture re-run; `find … -size 0` returns 0. Directory now holds 182 files: 80 png (20 states × 4 variants) + 68 trees (17 shell states × 4) + 17 steps + 17 console.

Eyeballed sample (`prompted-wide-light-tree.txt` excerpt):

```
main
  heading "Attempt 1"
  group "Attempt commands"
    button "Stop this attempt"
    button "Steer" [collapsed]
    button "Reply" [expanded]
…
    group "Feed registers"
      checkbox "Records" [checked]
```

**Defect the preflight caught in my own harness, and fixed.** The first snapshot listed `button "Close"` in the focus order while the tree correctly omitted it. Cause: `getComputedStyle(child).display` is the *child's own* value under a `display:none` container, so a control inside the closed `offcanvas-lg` header read as laid out. `isRendered` now uses `element.checkVisibility()` (answers for the box tree, so an ancestor counts) plus inherited `visibility`. After the fix the narrow snapshot correctly shows the collapsed drawer's contents absent from both tree and focus order, while the clip-rectangle `btn-check` inputs remain present — which is the distinction that idiom depends on.

**6 — A test named for what it proves.** `keeps a segment that already contains the separator readable as one segment` → `prints a segment containing the separator as it stands, collapsing into its neighbours`, with a comment recording the collapse as deliberate: the separator is a rendering rather than an encoding, nothing decodes the line back, and escaping it would put the machinery the address exists to hide back in front of the reader.

## Report-only patch: `guides/src/supervisor.md`

Required. Without it `npm run test:guides` is red on exactly one assertion, which I ran to confirm:

```
FAIL |guides| tests/guides/src/parity.test.ts > Supervisor > documents every source export
AssertionError: expected [ 'function deriveLineage' ] to deeply equal []
 Tests  1 failed | 373 passed (374)
```

I verified this patch out of tree (copy under scratchpad) against `oxfmt --config .oxfmtrc.json --check` — `All matched files use the correct format`. The table row is padded to the table's exact 140-character width.

```diff
--- a/guides/src/supervisor.md
+++ b/guides/src/supervisor.md
@@ -2290,6 +2290,7 @@
 | `deriveUnitRowStatus`            | function | Project a unit's boxed outcome or terminal parent truth into rendered status.              |
 | `snapshotToRows`                 | function | Project one snapshot, live pause fact, and durable units into the complete context stack.  |
 | `matchesLineage`                 | function | Decide tuple-prefix lineage by decoding both values rather than comparing text.            |
+| `deriveLineage`                  | function | Derive the readable lineage path one stack row's tuple id states.                          |
 | `deriveTone`                     | function | Derive the badge class one stack status renders with.                                      |
 
 The composition is three composables, four factories, and the entities they wire together.
@@ -2557,6 +2558,7 @@
 	BrowserApplicationError,
 	createOperatorStore,
 	describeCommandRefusal,
+	deriveLineage,
 	deriveResponseErrorCode,
 	deriveTone,
 	deriveUnitRowStatus,
@@ -2594,6 +2596,7 @@
 const rows = snapshotToRows(snapshot, units, false)
 freezeDeep(rows)
 matchesLineage('["build","verify"]', '["build","verify","test",1]')
+deriveLineage('["build","verify","test"]')
 hasDetail({ operations: [], constraints: [] })
 deriveTone('running')
 const attempt = units[0]
```

## Gate evidence

| Gate | Result |
| --- | --- |
| `npx vitest run --project app:browser` | **38 files, 447 tests passed** |
| `npm run format:check` | green (373 files) |
| `npm run lint:check` | green |
| `npm run check` | green (root + 5 scoped projects, incl. `vue-tsc` on app/browser) |
| `npm run build` | green (src core/server, app browser/server) |
| `npm run test:src` | 22 files, 251 passed |
| `npm run test:app:core` | 4 files, 106 passed |
| `npm run test:policy` | 1 file, 17 passed |
| `npx vitest run --project app:browser:integration` | 3 files, 14 passed (journey frames still land) |
| `npm run test:guides` | **1 failed / 373 passed** — the guide patch above, off-limits to me |

`git status --porcelain` — every path inside the owned list, `guides/**` untouched:

```
 M app/browser/components/PhaseView.vue
 M app/browser/components/TaskView.vue
 M app/browser/components/WorkflowView.vue
 M app/browser/helpers.ts
 M app/browser/styles/focus.css
 M tests/app/browser/contrast.test.ts
 M tests/app/browser/helpers.test.ts
 M tests/app/browser/portfolio.test.ts
 M tests/setupBrowser.ts
```

## Deviations and recorded decisions

**No deviation stopped the unit.** Three ancillary decisions, recorded per the contract:

1. **Item 5 covers the shell capture run, not the journey half.** The 3 journey states keep frames only. The two halves run in different execution contexts — vitest in-page vs a Node-side Playwright driver — and the describers cannot cross that boundary: `tests/setupBrowser.ts` imports Vue and the compiled cascade, so the Node project cannot import it, and Playwright cannot evaluate a multi-module serializer in the page. The only alternatives were a second implementation of the same serializer (a duplicate helper, which the tests rule calls a defect) or Playwright's own `ariaSnapshot` in a different format inside one portfolio — the competing format the brief forbids. **This needs an Orchestrator ruling**: which single snapshot format the whole portfolio uses. The membership proof names the exclusion in a comment so it cannot be silently forgotten.

2. **`readRing` duplicates ~20 lines of `readFocus`'s measurement.** Unavoidable under the byte-identical constraint: `readFocus(x)` is exactly `readRing(x, x)`, and the general form should replace the special one. `readRing`'s TSDoc says so. If the constraint lifts, delete `readFocus` and update its two callers.

3. **The `Journal` stands in front of `console`** to record the console/error artifact — a browser exposes no listener for its own output. It forwards every call to the real console (proved: the Vue injection warning from `useOperator.test.ts` still reaches stderr in the full run) and restores on `release()`, which runs both in the capture run's `finally` and in a setup-level `afterEach`.