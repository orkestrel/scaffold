# Unit U6 terrain-reference — report

## Headline

`tests/app/browser/integration.test.ts` carries the journey, refusal, matrix, statechart, and
capture families on the published `@orkestrel/test/browser` layer, and `tokens.test.ts` now measures
through `readRing`, `rootToken`, `style`, and `pixels`. Every acceptance gate is green.

One blocking layer defect stopped one required step: `@orkestrel/test` 0.0.11 cannot resolve a
control or a region whose accessible name comes from its own content next to a decorative
`aria-hidden` icon. The refusal family therefore asserts the two refusals it can express and does
not open the CSV menu. Details under **Layer finding**.

## Layer finding — `includeHidden: true` folds `aria-hidden` glyphs into the computed name

`resolveRendered`, and therefore `resolveAccessible`, `clickAccessible`, `traverseAccessible`,
`readValue`, and `readPerception`, ask the role locator for `{ name, exact: true, includeHidden:
true }`. `includeHidden: true` makes the accessible-name computation include `aria-hidden`
descendants, so a Bootstrap Icons glyph beside a control's text joins the computed name and the
exact match never fires.

Measured in Chromium against the mounted shell, with the surface holding the dropzone's
`<button><i class="bi bi-plus-lg" aria-hidden="true"></i>Add building</button>`:

```text
getByRole('button', { name: 'Add building' })                                    → 1
getByRole('button', { name: 'Add building', exact: true })                       → 1
getByRole('button', { name: 'Add building', includeHidden: true })               → 1
getByRole('button', { name: 'Add building', exact: true, includeHidden: true })  → 0
getByRole('button', { name: 'Add building', exact: false, includeHidden: true }) → 1
getByRole('dialog', { name: 'Quick reference', exact: true, includeHidden: true })  → 0
getByRole('dialog', { name: 'Quick reference', exact: false, includeHidden: true }) → 1
getByRole('region', { name: 'Build a carrier-ready schedule', exact: true, includeHidden: true }) → 1
```

The last row is the control: that region's label carries no icon, so it resolves. The pattern is
exact — every name the layer resolves on this surface comes from an `aria-label`, and every name
that comes from content or from an icon-bearing `aria-labelledby` heading is reported absent.

The voices the defect produced:

- `No interactive element has the accessible name "CSV"` — the CSV menu's toggle, which is rendered
  and reachable.
- `No interactive element has the accessible name "Help"`, `"Add building"`, `"Import CSV file"` —
  the same cause.
- `Named region "Quick reference" is not visible` — the first-run dialog, open and on screen.

Consequences carried in the suite:

- The refusal family cannot open the CSV menu, because no journey verb resolves its toggle. The
  "assert it becomes reachable" half of that case is absent, with the reason in a comment above the
  test.
- `mountSurface` reads the first-run dialog through its `Close` control rather than through its own
  region name. Every other dialog on the page keeps its `Close` hidden, so exactly one is reachable
  while one dialog is open, which makes that a sound reading — but it is a workaround for the
  defect, not a preference.

## Surface findings the layer exposed

- **The Quick Reference opens over the first-run empty schedule at `md` and up.** Every journey's
  first act is closing it. `openActions` and `dismissReference` in `tests/app/browser/setup.ts` name
  the two conditional human acts the shell requires: the dialog at `md` and up, and the navbar
  toggle below `lg`.
- **A closed Bootstrap modal keeps `style="display: none"` on its root.** `extractStyles` of the
  mounted app reports `<div id="quickReference" class="modal fade d-print-none" … style="display:
  none;">` after the journey closes the dialog. The matrix family names that one exemption in
  `isAuthoredEscape` and requires every other escape to be empty.
- **The `btn-check` and label pair cannot be pressed through the layer.** The label carries no
  interactive role and the radio that carries the name is `pointer-events: none`, so no resolver
  reaches the thing a person clicks. `tokens.test.ts` presses that one control through the runner
  and says so in a comment beside it.
- **The row checkbox's accessible name repeats per row.** `Select building for deletion` answers for
  every row, so it is unambiguous only on a one-row schedule, which is what the journey and the
  statechart drive. A two-row journey would meet
  `Interactive target "Select building for deletion" is ambiguous across 2 elements`.

## Families and the tests that carry them

`tests/app/browser/integration.test.ts`, `describe('app browser journeys')`:

| Family     | Test                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------- |
| journey    | `adds a building through the keyboard, deletes it, and reads focus back on the primary command` |
| journey    | `speaks none of the engine words the interface translates`                                      |
| refusal    | `withholds Delete until a row is selected and Import while the CSV menu is closed`               |
| matrix     | `reads the primary command above its contrast bars in every declared variant`                    |
| statechart | `drives every declared Delete transition through the interface`                                  |
| capture    | `expands the registry across every declared variant into unique filenames`                       |
| capture    | `writes this run's frames and reads every one of them back` (under the flag)                     |
| —          | `proves every declared family and claims no family it did not prove`                             |
| —          | `places every registered state and places nothing else`                                          |

The journey adds through `traverseAccessible('Add new building')` then `pressKeys('{Enter}')`, so
forward Tab reachability and keyboard commit are both proven on the toolbar. It asserts
`readPerception('Building schedule')` contains `1 building`, asserts the empty-state sentence is
gone from `readPage()` beside it, and ends on `readFocus()` reading `Add building` with
`document.activeElement` identical to `resolveRendered('Add new building')`.

The statechart table and its scenarios are data in `tests/app/browser/setup.ts`:
`DELETE_TRANSITIONS` and `DELETE_SCENARIOS`, typed on `DeleteState` and `DeleteEvent`, run through
`executeScenarios(DELETE_SCENARIOS, buildJourneySurface)`. Rows:

- `idle × select → armed, through the row checkbox`
- `armed × deselect → idle, through the row checkbox`
- `armed × delete → idle, through Delete selected buildings`

Each row builds its own surface by mounting the shell and adding one building through the interface.
Every phase asserts by throwing, so `setup.ts` holds no `expect`.

## Refusal voices asserted

Exact string equality, one voice each:

- `Interactive target "Delete selected buildings" is not visible and focus-reachable` — present and
  gated, with nothing selected. Exported as `DELETE_UNREACHABLE` and reused by the statechart's
  `idle` assertion.
- `Interactive target "Import buildings from CSV" is not visible and focus-reachable` — present
  inside the closed CSV menu.
- `No interactive element has the accessible name "Import every building"` — absent, which is the
  proof that the suite tells an absent control apart from a gated one.

## Variant and flag environment names

- `VITE_VARIANT` — one of `light-1280`, `dark-1280`, `light-390`, `dark-390`. Default `light-1280`.
- `VITE_CAPTURE` — `true` enables the portfolio. Anything else leaves it unset.

One capture run per variant:

```bash
VITE_CAPTURE=true VITE_VARIANT=dark-390 npx vitest run --config vite.config.ts --project app:browser tests/app/browser/integration.test.ts
```

Both were run. `tmp/capture/states/` holds `schedule-empty--dark-390.png`,
`schedule-populated--dark-390.png`, `delete-armed--dark-390.png`,
`schedule-empty--light-1280.png`, `schedule-populated--light-1280.png`, and
`delete-armed--light-1280.png`. `tmp` is git-ignored.

No `vite.config.ts` patch is needed. Vite injects `VITE_`-prefixed process environment names into
`import.meta.env` without configuration, and `tests/config.test.ts` stays green because no project
entry changed.

## Decisions recorded

- **Every run resizes to its variant.** `resizeViewport` in `tests/app/browser/setup.ts` calls
  `stagePane` and hands the pane straight back. The brief's sentence "so an ordinary run resizes and
  writes nothing" reads as though an ordinary run must not resize; a run that does not resize renders
  at the runner's default viewport while naming the variant `light-1280`, which is the filename-lie
  the skill forbids. The run therefore resizes and writes nothing.
- **The pane is released immediately after staging.** A pane left pinned at 800 px tall puts its
  lower half beyond pointer reach on this host, and the first attempt failed exactly that way:
  `element is outside of the viewport` while clicking `Close`. Staging sets the viewport; the pin is
  only for a shot, and `place` stages it again for its own.
- **The variant's theme is applied after the mount, never before.** The controller writes the
  persisted theme onto `<html>` during its boot, so a variant applied first is overwritten. Applied
  after the mount it survives: the matrix family read all four variants with the theme it set, and
  the watcher never reverted it. This answers the brief's unknown.
- **Bounded waits are 3000 ms at a 25 ms interval** (`SETTLE_BUDGET`, `SETTLE_INTERVAL`), sized from
  Bootstrap's 150 ms modal fade and 350 ms collapse transition plus the controller's boot.
- **The authored-class population floor is 40.** The mounted shell walks well above it in every
  variant.

## Scope deviation

`tests/app/browser/components/BuildingTable.test.ts` is the only importer of the removed
`typeInput` and `commitInput`. The brief directs re-pointing importers and lists `npm run check`
green as a criterion, and the same brief lists every other test file as off-limits. I made the
one-line change rather than leave the tree red, and the whole patch is:

```diff
-import { commitInput, TEARDOWNS, typeInput } from '../../../setupBrowser.js'
+import { TEARDOWNS } from '../../../setupBrowser.js'
+import { commitInput, typeInput } from '@orkestrel/test/browser'
```

Revert it and re-add the two helpers to `tests/setupBrowser.ts` if you want that file untouched.
`tests/app/browser/components/BuildingTable.test.ts` runs 35 passed with the change.

## Claims I could not close

- **The statechart harness and its gate.** `statechart.md` asks for a rendered harness page with
  `STATECHART_ATTRIBUTES` on it and a route deep link. Terrain ships no such page, and building one
  is an `app/**` change, which is off-limits. The table is declared once and driven by the automated
  run alone.
- **The transport family.** The schedule persists through the driver, so the surface meets that
  family's trigger and the skill would refuse a declaration that omits it. The brief fixed the scope
  to the other families, so the file declares those and the comment above `FAMILIES` records the
  omission rather than hiding it.
- **The written artifact per variant.** `decide.md` asks for a `describeTree` and `describeFocus`
  file per variant under `tmp/`. The brief's family list does not name it and no test writes one.
- **`readPerception` on the first-run dialog.** Blocked by the layer finding; read through its
  `Close` control instead.

## Gate evidence

`npm run format:check`:

```text
Checking formatting...
All matched files use the correct format.
Finished in 2073ms on 295 files using 16 threads.
```

`npm run lint:check`: no output, exit 0.

`npm run check`: no diagnostics from `tsc --noEmit --project tsconfig.json`,
`tsc --noEmit -p configs/app/tsconfig.core.json`, or `vue-tsc --noEmit -p
configs/app/tsconfig.browser.json`.

`npm run test:config`:

```text
 Test Files  1 passed (1)
      Tests  10 passed (10)
```

`npm run test:policy`:

```text
 Test Files  1 passed (1)
      Tests  57 passed (57)
```

`npx vitest run --config vite.config.ts --project app:browser tests/app/browser/integration.test.ts
tests/app/browser/styles/tokens.test.ts --reporter=verbose`:

```text
 ✓ integration.test.ts > adds a building through the keyboard, deletes it, and reads focus back on the primary command 1342ms
 ✓ integration.test.ts > speaks none of the engine words the interface translates 1037ms
 ✓ integration.test.ts > withholds Delete until a row is selected and Import while the CSV menu is closed 1010ms
 ✓ integration.test.ts > reads the primary command above its contrast bars in every declared variant 3352ms
 ✓ integration.test.ts > drives every declared Delete transition through the interface 3502ms
 ✓ integration.test.ts > expands the registry across every declared variant into unique filenames 38ms
 ↓ integration.test.ts > writes this run's frames and reads every one of them back
 ✓ integration.test.ts > proves every declared family and claims no family it did not prove 53ms
 ✓ integration.test.ts > places every registered state and places nothing else 46ms
 ✓ tokens.test.ts > resolves the light identity and separates sheets from the canvas 2ms
 ✓ tokens.test.ts > resolves the dark identity through the sky ramp 2ms
 ✓ tokens.test.ts > resolves a strictly decreasing heading ramp 6ms
 ✓ tokens.test.ts > keeps the heading, monospace, and focus-width tokens invariant across themes 3ms
 ✓ tokens.test.ts > paints every focus indicator above 3:1 in both themes and leaves an untreated control under it 486ms
 ✓ tokens.test.ts > does not render the authored ring on pointer-only controls after a mouse click 349ms
 Test Files  2 passed (2)
      Tests  14 passed | 1 skipped (15)
```

`VITE_CAPTURE=true VITE_VARIANT=dark-390 …` and `VITE_CAPTURE=true VITE_VARIANT=light-1280 …` on the
same file: `Tests 9 passed (9)` each, with the frames listed earlier on disk.

Observation, not a criterion — `npm run test:app:browser`:

```text
 Test Files  48 passed (48)
      Tests  449 passed | 1 skipped (450)
   Duration  50.12s
```

## Review evidence

`git diff --stat`:

```text
 tests/app/browser/components/BuildingTable.test.ts |   3 +-
 tests/app/browser/setup.ts                         | 316 ++++++++++++++++++
 tests/app/browser/styles/tokens.test.ts            | 366 +++++++++------------
 tests/setupBrowser.ts                              |  28 +-
 4 files changed, 481 insertions(+), 232 deletions(-)
```

`git status --porcelain`:

```text
D  package-lock.json
 M tests/app/browser/components/BuildingTable.test.ts
 M tests/app/browser/setup.ts
 M tests/app/browser/styles/tokens.test.ts
 M tests/setupBrowser.ts
?? package-lock.json
?? tests/app/browser/integration.test.ts
```

The lockfile rows are the standing condition the brief named. Nothing staged, restored, or rewrote
them. No commit was made, nothing was installed, and `package.json` is untouched.
