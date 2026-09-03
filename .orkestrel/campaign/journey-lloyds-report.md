# Unit J-lloyds — lloyds' primary surface proved on `@orkestrel/test/browser`

`implementer` on Opus 5, sole writer in `C:\Users\mikes\WebstormProjects\lloyds`, standing in for the
Sol implementer. Nothing committed, nothing installed, no `app/**`, `configs/**`, or vendored file
edited, the lockfile pair untouched. No shared-file patch is owed.

## Headline

The journey suite exists and every declared family is proved on the published layer. The ordinary
run is green at every declared variant; `npm test` is green at exit 0. **One deviation stands: the
capture run cannot produce a frame at 390 in either theme.** `captureFrame`'s restaging loop in
`@orkestrel/test` 0.0.12 needs a document whose height stops growing with the pane, and this shell's
`min-vh-100` desk under a stacked top bar measures pane + 42 px at every pane, so the loop diverges
and refuses. That is the layer defect the brief said never to work around, so the 390 capture runs
are left red and reported here rather than exempted.

## The families and their proofs

`FAMILIES` is declared in `tests/app/browser/integration.test.ts` and read back by the file's own
`proves every declared family and claims no family it did not prove`.

| Family     | Proofs                                                                                                                                                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| journey    | `adds a building through the keyboard, answers the confirmation, and empties the schedule`; `names each schedule row for the building it holds`; `speaks none of the engine words`                                                                   |
| refusal    | `withholds the destructive command until a row is selected, and the export until one exists`; `names no results view on an empty schedule, and withholds it until a building rates`; `withholds every schedule command while an import is in flight` |
| matrix     | `reads every command above its contrast bar in every declared variant`                                                                                                                                                                               |
| statechart | `drives every declared Delete transition through the interface`; `walks the statechart harness through its own play-all control`; `offers one deep link per declared transition`                                                                     |
| transport  | `hands a saved schedule back to a second session`; `refuses the boot on settings storage that will not open, and opens on the retry`; `says the import failed when the storage refuses it`                                                           |
| capture    | `expands the registry across every declared variant into unique filenames`; `writes every frame this run owes` (under the flag); `places every registered state and places nothing else`                                                             |

Every journey path resolves its target by role and accessible name through `@orkestrel/test/browser`
and reaches no selector, component instance, or store. The three `document.querySelector` calls in
the file read `STATECHART_ATTRIBUTES` off the harness root, its badge, and its rows, which is what
`statechart.md` § Gate the harness prescribes and the layer publishes no reader for.

## The variants and the readings per variant

Each variant pairs a theme with a viewport, because this shell renders one layout at 1280 — the
command rail and the auto-opening first-run reference — and another at 390 — the compact top bar and
no reference.
Readings are from `tmp/journeys/<variant>.txt`, written by the run that took them.

| Variant    | Add building contrast | Add ring | Armed Delete contrast | Delete ring | Keep selection | Delete selection | Authored classes |
| ---------- | --------------------- | -------- | --------------------- | ----------- | -------------- | ---------------- | ---------------- |
| light-1280 | 8.388                 | 1.307    | 4.990                 | 1.669       | 11.696         | 4.990            | 205              |
| dark-1280  | 6.778                 | 2.751    | 4.990                 | 1.669       | 7.704          | 4.990            | 205              |
| light-390  | 8.388                 | 1.307    | 4.990                 | 1.669       | 11.696         | 4.990            | 200              |
| dark-390   | 6.778                 | 2.751    | 4.990                 | 1.669       | 7.704          | 4.990            | 200              |

- **Text bar: 4.5, asserted, met by every command in every variant.** The primary command, the
  destructive command, and each of the confirmation's answers paint their own solid fill.
- **Census floor: 150, asserted.** The reading is `readClasses(host)` of the entered surface minus
  `readCascade()`, and the difference is exactly the negative controls — a token fed to the
  reading and an SVG-borne token appended to the walked root. No authored token the surface renders
  is undeclared by the cascade in any variant.
- **Style escapes: the appended control alone.** At 1280 the only other hit is the closed Quick
  Reference modal carrying Bootstrap's own `display: none`, exempted by tag; at 390 no modal opens
  and the reading is the control alone.
- **The focus ring is measured but not barred.** `readRing` returns a number for the primary command
  and for the armed destructive command in every variant, so the surface paints real focus chrome and
  the instrument reads it. The assertion is that a number came back, and the instrument's negative
  control — a 3 px ring in the backdrop's own colour — reads under 3 in the same run. Every value
  sits under the 3:1 non-text bar. See **Claims not closed**.

## The refusal voices asserted

Each is asserted as one exact sentence, never a pattern that would accept a second voice.

| State                       | Control                        | Voice                                                                               |
| --------------------------- | ------------------------------ | ----------------------------------------------------------------------------------- |
| Nothing selected            | `Delete selected buildings`    | `Interactive target "Delete selected buildings" is not visible and focus-reachable` |
| Empty schedule              | `Export buildings to CSV`      | `Interactive target "Export buildings to CSV" is not visible and focus-reachable`   |
| Any state                   | `Undo the deletion`            | `No interactive element has the accessible name "Undo the deletion"`                |
| Confirmation closed         | `Delete selection`             | `Interactive target "Delete selection" is not visible and focus-reachable`          |
| Confirmation closed         | `Keep selection`               | `Interactive target "Keep selection" is not visible and focus-reachable`            |
| Empty schedule              | `Results`                      | `No interactive element has the accessible name "Results"`                          |
| One building, nothing rated | `Results`                      | `Interactive target "Results" is not visible and focus-reachable`                   |
| Import in flight            | `Import buildings from CSV`    | `Interactive target "Import buildings from CSV" is not visible and focus-reachable` |
| Import in flight            | `Add building`                 | `Interactive target "Add building" is not visible and focus-reachable`              |
| Two-row schedule            | `Select building for deletion` | `No interactive element has the accessible name "Select building for deletion"`     |
| Failed settings boot        | `Retry loading`                | `No interactive element has the accessible name "Retry loading"`                    |

The absence and the unreachability halves are reported as different findings, and the `Results` view
supplies both: an empty schedule renders no tab at all, and a schedule holding an unrated building
renders the tab and refuses it.

## The transport proofs

- **Persistence and restart.** One session adds a building over a memory driver; a second session
  over the same driver restores it and the ledger reads `1 building`. The control that keeps the
  reading honest is a third session over empty storage, which opens on the first-run panel and shows
  no building.
- **A refused opening read.** `failBootDriver` refuses the settings store's first `scan`.
  `app.start()` rejects with `boot failure`, the latch clears, and the shell's own `start` retries to
  completion, so the workspace opens. The proof records what the person is told: nothing. It asserts
  the page carries no sentence matching `/storage|could not|unavailable/i` and that no `Retry loading`
  control exists.
- **A refused write, and the sentence it produces.** `failWriteDriver` (new, in the test setup)
  serves every read and refuses every write. The import raises the persistent danger toast
  `Error importing CSV file. Please check the file format.`, the ledger stays empty, and
  `clickAccessible('Close')` clears it through the layer.

The import is raised through the application's own `import` command rather than through the
interface, because this workspace imports through a platform file picker and a drag-and-drop
listener. Neither is drivable by a journey verb, and the layer publishes none for either; the
refusals and the sentence are read and driven through the layer. Recorded as a named limit.

## The capture readings per frame

Each written frame is read back off disk and judged against what the surface measured at the shot:
the variant's width, at least the document's scroll height, and the colour its bottom row paints.
Which floor reading applies follows the shell the width renders: from `lg` up the rail stands beside
the desk, so the bottom row crosses two surfaces and no single colour answers for it, and a frame the
pane cut short would end on the runner's one flat canvas and report one; below `lg` the desk spans
the page and the bottom row is the surface's own background.

| Frame                                | Width | Floor                                      |
| ------------------------------------ | ----- | ------------------------------------------ |
| `schedule-empty--light-1280.png`     | 1280  | more than one colour, as the rail requires |
| `schedule-populated--light-1280.png` | 1280  | more than one colour                       |
| `delete-armed--light-1280.png`       | 1280  | more than one colour                       |
| `delete-confirming--light-1280.png`  | 1280  | more than one colour                       |
| the same registry at `dark-1280`     | 1280  | more than one colour                       |
| every `*-390` frame                  | —     | never written; see the deviation           |

## The harness gate reading

The gate mounts `StatechartHarness`, clears the route's query, asserts the inventory before the
tally, presses `Play every transition` through `clickAccessible`, and polls the status attribute to a
terminal reading. In every variant run it read:

```text
status: passed   passed: 5   failed: 0   total: 5   state after the demonstration step: armed
rows: idle × select → armed · armed × deselect → idle · armed × delete → confirming ·
      confirming × cancel → armed · confirming × confirm → idle
```

The same rows also run in the suite's own runner through `executeScenarios(DELETE_SCENARIOS,
buildJourneyDriver)`, over the same `DELETE_TRANSITIONS` table and the same scenario phases in
`app/browser/helpers.ts`. The suite's driver reads `armed` as `!confirming() && isCommandReachable()`,
because `showModal()` leaves the command behind it painted and reachable to the layer.

## The artifact filenames

One per variant, written by `commands.writeFile` in an `afterAll`, under the git-ignored tree:

```text
tmp/journeys/light-1280.txt
tmp/journeys/dark-1280.txt
tmp/journeys/light-390.txt
tmp/journeys/dark-390.txt
```

Each carries the variant and viewport, the accessible tree and focus order of the populated
schedule, the resolved-style rows for that variant, the journal's steps and page output, and the
capture frames the run wrote.

## The setup proofs

`vite.config.ts` gained the browser-enabled `setup` project — label `setup`, include
`tests/setup*.test.ts`, one setup file `./tests/setup.ts` — which is the shape the vendored
`tests/config.test.ts:129-138` requires the moment a `tests/setup*.test.ts` proof exists.
`package.json` gained `test:setup` and chains it after `test:config`.

```text
npm run test:setup   →  exit 0,  Test Files 2 passed (2),  Tests 41 passed (41)
npm run test:config  →  exit 0,  Test Files 1 passed (1),  Tests 46 passed (46)
```

`tests/setup.test.ts` covers `createRecorder`, `recordEmitterEvents`, `isTotal`, `waitForDelay`,
`captureError`, `isDeeplyFrozen`, `createRecordingDriver` including its duplicate-key refusal, and
`ADVERSARIAL_VALUE_SUBJECT`. `tests/setupBrowser.test.ts` covers the module's own load — the modern
core on the document and the real cascade resolving a Bootstrap rule — plus `TEARDOWNS` and its
drain, `uniqueName`, `createTestDatabase`, `deleteDatabase`, `createCleanups`, `seedUsers`, and
`seedStore`.

## The duplicate-verb call sites

Nothing needed re-pointing: lloyds carried no journey suite before this unit, so no journey-path call
site sat on a local `querySelector` helper. The new suite and the journey block in
`tests/app/browser/setup.ts` were written on the layer's verbs throughout.

What I did remove is a straight duplication the layer forbids: `tests/setupBrowser.ts` declared
`typeInput` and `commitInput`, which `@orkestrel/test/browser` publishes under those exact names.
Neither carried a call site in the repository. A comment in their place names the layer as the import.

Remaining call sites, from `grep -rn "querySelector\|requireElement(" tests/ --include=*.ts` with the
vendored files excluded:

| Site                                       | What it reads                                            | Why it stays                                                 |
| ------------------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ |
| `tests/app/browser/integration.test.ts` ×3 | `STATECHART_ATTRIBUTES` on the harness root, badge, rows | `statechart.md` prescribes it; the layer publishes no reader |
| `tests/app/browser/setup.test.ts` ×3       | `requireElement`, its own proof                          | The helper under test                                        |
| `tests/app/browser/setup.ts` ×2            | `requireElement` inside `modalRoot` and `filePicker`     | The helpers' own bodies                                      |
| `tests/setupBrowser.test.ts` ×2            | The teardown drain's own host node                       | The node is unnamed; no verb resolves it                     |
| `tests/app/browser/helpers.test.ts` ×1     | `downloadFile`'s anchor is gone                          | A `download` anchor carries no accessible name               |

`modalRoot` and `filePicker` have no consumer at all: lloyds ships no component tests. Recorded as a
finding rather than removed, because their capability belongs to a suite this workspace does not yet
have.

## Run summaries

Every command run bare from the repository root; exit codes read from the shell.

| Run                                      | Exit | Reading                                                                  |
| ---------------------------------------- | ---- | ------------------------------------------------------------------------ |
| journey suite, `VITE_VARIANT=light-1280` | `0`  | 16 passed, 1 skipped (17), 28.3 s                                        |
| journey suite, `VITE_VARIANT=dark-1280`  | `0`  | 16 passed, 1 skipped (17), 28.0 s                                        |
| journey suite, `VITE_VARIANT=light-390`  | `0`  | 16 passed, 1 skipped (17), 16.1 s                                        |
| journey suite, `VITE_VARIANT=dark-390`   | `0`  | 16 passed, 1 skipped (17), 16.2 s                                        |
| capture run, `light-1280`                | `0`  | 17 passed (17), 28.8 s                                                   |
| capture run, `dark-1280`                 | `0`  | 17 passed (17), 29.3 s                                                   |
| capture run, `light-390`                 | `1`  | 3 failed, 14 passed (17) — the deviation                                 |
| capture run, `dark-390`                  | `1`  | 3 failed, 14 passed (17) — the deviation                                 |
| `npm run test:app:browser`               | `0`  | 25 files, 287 passed, 1 skipped (288), 35.1 s                            |
| `npm run test:setup`                     | `0`  | 2 files, 41 passed (41)                                                  |
| `npm run format:check`                   | `0`  | `All matched files use the correct format.` — 220 files                  |
| `npm run lint:check`                     | `0`  | no diagnostics                                                           |
| `npm run check`                          | `0`  | `tsc` app:core, `vue-tsc` app:browser, `vue-tsc` root                    |
| `npm test` (observation)                 | `0`  | app:core 484, app:browser 287+1 skipped, policy 111, config 46, setup 41 |

The skipped case in an ordinary run is the disk-membership proof, which `it.runIf(CAPTURING)` leaves
out where no frame was written. `npm test` and the timings are observations taken on this host; the
authoritative timing reading is the Orchestrator's.

The journey suite's own logs are in `tmp/units/journey-<variant>.log` and
`tmp/units/capture-<variant>.log`; the gate logs are `tmp/units/check-journey.txt`,
`tmp/units/fmt-journey.txt`, `tmp/units/lint-journey.txt`, and `tmp/units/test-journey.txt`.

## Deviation state

**One deviation. The capture family cannot produce a frame at 390 in either theme, and I made no
workaround.**

- **Expected.** `VITE_CAPTURE=true` at each declared variant writes every registered state and the
  disk-membership proof reads them back.
- **Found.** At `light-390` and `dark-390` the first `place` throws before any frame is written:

  ```text
  Error: Capture frame at ../../../tmp/capture/states/schedule-empty--light-390.png
    never settled after 4 restagings: 1376 over a 1334 pane
  ```

  Both 1280 runs write their whole registry and pass. The ordinary runs are green at all four
  variants.

- **Evidence.** `captureFrame` restages until `measureContent()` equals the pane it staged
  (`node_modules/@orkestrel/test/dist/src/browser/index.js:1910-1923`). I measured what this shell's
  content does as the pane grows, through `stagePane` and `measureContent` directly:

  ```text
  390 wide:   staged 844 → content 956    staged 1200 → content 1242   staged 1600 → content 1642
  1280 wide:  staged 800 → content 800    staged 1200 → content 1200
  ```

  At 390 the content is the pane plus 42 px at every pane, so no pane height satisfies the loop and
  the declared 844 height is not the cause — no height would be. At 1280 the content equals the pane
  and the loop never runs.

- **Hypothesis.** Below `lg` the shell stacks a sticky top bar above a `main` carrying `min-vh-100`,
  so the document is always the viewport plus the bar. `captureFrame`'s loop assumes a document
  height that converges as the pane grows, and its `growth` term makes a viewport-relative layout
  diverge instead.
- **Done.** Everything else in the brief: the suite, the families, the setup module's journey block,
  the harness gate, the artifact per variant, the setup proofs and their project and script, the
  guide, and the scoped gates.
- **Not done.** The 390 half of the capture family. Every registered state owes a light and a dark
  frame at that width, and none of them exists.

Deciding this needs an engine that owns either `@orkestrel/test` or `app/**`; both are outside this
unit.

## Decisions I made and record here

- **The variants.** 1280×800 and 390×844, each in both themes. `LG_MEDIA` (992 px) swaps the rail for
  the top bar and `MD_MEDIA` (768 px) gates the first-run reference, so 1280 and 390 straddle them.
- **The bars.** Text contrast 4.5, asserted. Focus chrome asserted as measured rather than barred, for
  the reason under **Claims not closed**. Census floor 150, from an undriven reading of 199 at 390 and
  204 at 1280.
- **The budgets.** Journey 30 s, transport 30 s, matrix 60 s, harness `HARNESS_BASE + DELETE_TRANSITIONS.length * (HARNESS_PACE + HARNESS_ROW)`. The measured harness walk is 2.3 s.
- **The registry.** `schedule-empty`, `schedule-populated`, `delete-armed`, `delete-confirming` — the
  ladder a design review rules on, each placed from the journey that reaches it.
- **The ledger's perception name.** The table carries no accessible name, so the populated readings
  quote the tab panel, whose name the tab's own count badge composes: `Buildings 1`, `Buildings 2`.
  Declared as constants, not derived. A reading that has to name the count is a surface smell and is
  listed under the findings.
- **`failWriteDriver`.** New in the test setup: a real memory driver whose writes refuse and whose
  reads flow, so the workspace still opens over it.
- **The inert `createDeleteDriver`.** Extended with the confirmation's answers, so the scenario
  phases in `app/browser/helpers.ts` are proved with no browser and no mounted surface.
- **Removing `typeInput` and `commitInput`** from `tests/setupBrowser.ts`, as recorded earlier.

## Claims not closed

1. **The focus ring misses the 3:1 non-text bar in every variant.** Measured: `Add building` 1.307
   light / 2.751 dark, armed `Delete selected buildings` 1.669 in both. The chrome is real and the
   instrument reads it, so this is a value the surface earns rather than an instrument failure. The
   fix is an `app/**` change to the focus style.
2. **A confirmed removal leaves focus on the document body.** Measured: `document.activeElement` is
   `BODY` after `Delete selection`. The journey proves instead that a forward Tab walk reaches
   `Add building` again, so a person is not stranded, and the skill's law that focus land on a
   visible announced location is unmet. The fix is an `app/**` change.
3. **A settings-storage failure is silent.** The shell's own retry succeeds, so the workspace opens,
   but there is no failure sentence and no retry control. `App.vue` calls `void app.start()` with no
   catch, so a boot that stays failed would also raise an unhandled rejection.
4. **The import cannot be driven through the interface.** A platform file picker and a
   `document`-level drop listener are the only doors, and the layer publishes no verb for either.
   The transport family arranges through `app.import` and reads the result through the layer.
5. **`vite.config.ts` will read stale to `scaffold audit`.** The canonical `setup` project template is
   node-only; this workspace's is browser-enabled because `tests/setupBrowser.ts` sets `data-bs-core`,
   loads Halfmoon, and opens IndexedDB. `ROADMAP.md` § 1 carries that row against scaffold, measured
   the same way in terrain.
6. **`modalRoot` and `filePicker` have no consumer** in `tests/app/browser/setup.ts`. Their capability
   belongs to component tests lloyds does not ship.
7. **`uniqueName` in `tests/setupBrowser.ts` defaults to the prefix `terrain-idb`.** The proof asserts
   what it does today. Renaming it is outside this unit's scope.
8. **The dark rail's separation and the drop zone's dark panel are still unmeasured**, as the chrome
   unit recorded. The matrix family reads the commands, not those surfaces.

## Review evidence

`git diff --stat`:

```text
 guides/README.md                  |  63 ++++-
 package.json                      |   3 +-
 tests/app/browser/helpers.test.ts | 202 +++++++++++++++-
 tests/app/browser/setup.ts        | 484 ++++++++++++++++++++++++++++++++++++++
 tests/setupBrowser.ts             |  29 +--
 vite.config.ts                    |  23 +-
 6 files changed, 766 insertions(+), 38 deletions(-)
```

`git status --porcelain`:

```text
 M guides/README.md
D  package-lock.json
 M package.json
 M tests/app/browser/helpers.test.ts
 M tests/app/browser/setup.ts
 M tests/setupBrowser.ts
 M vite.config.ts
?? package-lock.json
?? tests/app/browser/integration.test.ts
?? tests/setup.test.ts
?? tests/setupBrowser.test.ts
```

The staged-deletion and untracked `package-lock.json` rows are the standing condition the brief
named. Nothing staged, restored, or rewrote them. `app/**`, `configs/**`, and every vendored file are
untouched.
