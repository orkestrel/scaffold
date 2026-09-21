<!-- Retained from veneer/tmp/units/u7f-fix-report-2.md. Native lane: opus on Opus 5 (Agent dispatch, clean context), over Veneer 7f6d5f6 with the brief-1 result in the tree, 2026-09-21; brief u7f-fix-brief-2.md. Five test-sufficiency findings closed red-then-green (measured); the deviation on finding 1 measured (the handed-back layout reads the opposite of the frame; the readings are taken in the pane re-staged at the shot geometry); every gate exit 0 on Chromium and Edge; the capture run last, artifacts in step. -->

# Unit U7f-fix report 2

Every test-sufficiency finding the brief carries is closed, in the owned files
`tests/app/browser/integration.test.ts` and `tests/app/browser/Showcase.test.ts`, each with a
red-then-green pair measured on this tree. Findings 1 and 2 are measured rather than reasoned,
because running the analyst's replay and the lost-hover condition cost less than arguing them.
Finding 1 could not be closed at the position the brief names: the reading it prescribes is taken
after the capture has already handed the pane back, and it reports the opposite of the frame. That
is recorded under Deviation state with the measurement that settles it, and the finding is closed
a line later, in the layout the shot was taken in. No file outside those two changed.

## Finding 3, the teardown that leaves a staged pane

Landed at `tests/app/browser/integration.test.ts`, the `afterEach` hook: `releasePane` joins
`releasePointer` and `releaseMedia` in the independently attempted releases, and the preceding
comment names the staged pane beside the held pointer and the staged preference. `releasePane` is
declared safe with nothing staged — "Calling this on an unstaged pane finds no such value, so it
changes nothing and resizes nothing" (`node_modules/@orkestrel/test/dist/src/browser/index.d.ts`) —
so the hook attempts it every case.

Red first. A plant, held only for its runs, put a case that stages the pane and then throws before
the placement in front of a case reading `window.innerWidth`:

```text
npx.cmd vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=default -t "PLANT"
```

| Run | Deciding case | Result |
| --- | --- | --- |
| Red, before `releasePane` joined the hook | `PLANT finds the pane released by the teardown` | `Tests 8 failed / 88 skipped (96)`; `expected 320 to be 1280` on the 1280 variants and `expected 320 to be 390` on the 390 variants |
| Green, after | same case | `Tests 4 failed / 4 passed / 88 skipped (96)`; the four remaining failures are the planted `throw` itself, one per variant |

The plant was removed after the green run. The case that follows a failure between the staging and
the placement inherited a 320-pixel viewport before the fix and the run's own viewport after it.

## Finding 5, the invariant the `header button` rule rests on

Landed at `tests/app/browser/Showcase.test.ts`, the case `mounts its sections after the region and
destroys them before removing the nodes`. It gains the header and `main` references and the
assertions that pin the invariant: the header's buttons are exactly the mode control, no section
sits outside `main`, and no `.btn` specimen sits outside `main`. Each population is queried at the
assertion rather than taken from the collections earlier in the case, so each assertion reports the
tree as it stands there. The file gains the `requireValue` import from `@orkestrel/test`.

Red first, one plant per assertion, each appended to the header after the case's existing
assertions and each removed before the next:

```text
npx.cmd vitest run --config vite.config.ts --no-cache --reporter=default --project app:browser tests/app/browser/Showcase.test.ts
```

| Plant | Assertion that fired | Result |
| --- | --- | --- |
| `build('button', { classes: BUTTON_CLASS })` in the header | header holds the control and no other button | `Tests 1 failed / 3 passed (4)`; `expected [ <button …(2)></button>, …(1) ] to strictly equal [ Array(1) ]` |
| `build('a', { classes: BUTTON_CLASS })` in the header | no `.btn` specimen outside `main` | `Tests 1 failed / 3 passed (4)`; `expected [ <a class="btn"></a> ] to strictly equal []` |
| `build('section', { attributes: { 'aria-label': 'Planted' } })` in the header | no section outside `main` | `Tests 1 failed / 3 passed (4)`; `expected [ <section …(1)></section> ] to strictly equal []` |

Green with every plant removed: `Tests 4 passed (4)`.

The anchor plant is why the specimen assertion is there beside the button one: the `.btn` population
includes anchor hosts, which a header-button assertion cannot see, and the brief's condition is that
a `.btn` specimen landing in the header reds.

## Finding 4, the hover mix on the `home-dark` frame

Landed at `tests/app/browser/integration.test.ts`, the case `switches the announced and painted mode
through the control`. The case resolves the control once, then parks the pointer with
`releasePointer()` and waits out the mix with `waitForAnimations(control)` before placing
`home-dark`, and reads `control.matches(':hover')` straight after the placement. The restoring click
follows unchanged.

The control's `:hover` reading at the shot, in every variant:

```text
npx.cmd vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot -t "switches the announced and painted mode"
```

| Run | Reading at the shot | Result |
| --- | --- | --- |
| Red, the reading added and the pointer still resting on the control | `true` in light-1280, dark-1280, light-390, dark-390 | `Tests 4 failed / 84 skipped (88)`; `expected true to be false` |
| Green, after `releasePointer()` and the wait | `false` in all four | `Tests 4 passed / 84 skipped (88)` |

The regenerated frames carry it: in `home-dark--dark-1280.png` and `home--light-1280.png` the mode
control shows the same bordered, unfilled affordance, where the round-1 pair differed by the
bare-button hover fill.

## Finding 2, the arrival record the predicate could not see

Landed at `tests/app/browser/integration.test.ts`, the `portfolio` case `records the toggle host as
pressed at the moment its frame was shot`. The arrival record is selected by a line only a tree
carries, `region "Buttons"`, together with the absence of `button "Toggle" [pressed=true]`, and the
case asserts that the pressed records are there, that the arrival records are there, and that every
arrival record announces the `Toggle` host. The pressed suffix rather than a bare `[pressed=true]`
is what excludes the pressed trees, because a dark variant's arrival tree announces the mode control
as `button "Dark mode" [pressed=true]`.

Red first, by the analyst's replay: `ARTIFACT.push(describeTree(mounted.host))` was removed from the
arrival case for the replay runs and restored after.

```text
npx.cmd vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot
```

| Run | Predicate | Result |
| --- | --- | --- |
| The replay against the existing proof | `entry.includes('button "Toggle"')` | `Tests 84 passed / 4 skipped (88)`, exit 0 — the proof does not bind |
| The replay against the landed proof | `region "Buttons"` and not the pressed suffix | `Tests 4 failed / 80 passed / 4 skipped (88)`; `expected [] to not strictly equal []` on `arrival`, in all four variants |
| The arrival push restored, landed proof | same | green, in the gate runs that follow |

A replay that replaces the arrival tree with the pressed tree rather than removing it reds the same
way and for the same reason: the replacement carries the pressed suffix, so it is excluded from
`arrival` and the collection is empty.

The retained artifacts show the population the predicate reads. `grep -c` over each
`tmp/capture/<variant>.txt` after the final capture run reports 3 for `region "Buttons"` — the
arrival tree and a pressed tree per mode — and 2 for `button "Toggle" [pressed=true]`. The focus
inventory in the same file carries `25. button "Toggle"`, which is the line the round-1 predicate
was matching.

## Finding 1, the readings that decide the hover frame

Landed at `tests/app/browser/integration.test.ts`, the case `repaints a host under the pointer while
it is hovered and while it is held`. The deciding readings, the host's `:hover` state and its
`background-color`, are taken before `releasePane()` and before any re-hover, as the brief requires,
and in the layout the shot was taken in: the case stages the pane again at the geometry the shot
used, with the pointer untouched, then reads and asserts there — hovered, and equal to the settled
mix read before the shot. The collections keep their end-of-loop assertions, and the re-hover after
`releasePane()` serves only the hold that follows.

Why the readings sit a line past the position the brief names is measured, not argued. See Deviation
state.

Red first, by removing the pre-staged pane the round-1 fix added, which is the condition in which
the capture loses the hover:

```text
CAPTURE=1 npx.cmd vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot -t "repaints a host under the pointer"
```

| Run | Result |
| --- | --- |
| Red, pre-staged pane removed | `Tests 4 failed / 84 skipped (88)`; `expected false to be true` on `framedHover`, in all four variants |
| Green, pre-staged pane restored | `Tests 4 passed / 84 skipped (88)` |

The round-1 reading position under the same condition, measured for comparison: with the readings
taken after `releasePane()` and the re-hover, and the pre-staged pane removed, the same capture run
reported `Tests 4 passed / 84 skipped (88)`. That is the audit's claim, measured — the proof that
shipped in round 1 stays green against a capture that lost the hover, and the landed proof reds
against it.

## Deviation state

A deviation, settled inside the owned files and continued rather than stopped.

Finding 1's remedy as the brief words it does not close the finding. "Take the deciding readings
straight after the placement, before `releasePane()` and before any re-hover" puts them in the
layout the capture hands back, and `PORTFOLIO.place` releases the pane itself before it returns.
The readings there report the state that followed the frame.

The measurement, taken on `journey:light-1280` with a probe that dumped the handed-back reading and
the re-staged reading in one run:

| Condition | Reading in the handed-back layout | Reading with the pane staged again at the shot's geometry |
| --- | --- | --- |
| Pre-staged pane present, frame correct | `false`, `oklch(0.48 0.255 264)` (the rest fill) | `true`, `color(srgb 0.0288046 0.226321 0.817248)` (the settled hover mix) |
| Pre-staged pane removed, frame lost the hover | `true`, the hover mix | `false`, the rest fill |

The row with the pre-staged pane present is what settles it: the frame that round 1 proved carries
the settled hover mix is read as unhovered and at its rest fill in the handed-back layout. A reading
there cannot pass on a correct frame, so it cannot be the assertion. The row with the pane removed
was measured once in that shape; an earlier run of the same condition read the handed-back position
as `false` as well, so the handed-back reading is reported here only as not tracking the frame,
rather than as reliably inverted.

The reading that ships instead stages the pane again at `window.innerWidth` by
`window.innerHeight` — the geometry the pre-stage used — without moving the pointer, and reads
there. `stagePane` is documented safe to call on an already-staged pane ("Staging an already-staged
pane leaves that value alone"), which is what keeps the non-capture journey, where the pre-staged
pane is still in place, reading the same thing. The readings satisfy the finding's requirement:
they are taken before `releasePane()` and before any re-hover, and a capture that loses the hover
reds them.

The `restored` collection holds the at-shot paint for the hover placement and the after-placement
paint for the active one. Each is the paint the host carries across its placement, so the name and
the end-of-loop comment stand unchanged.

## Gates

Run in the brief's order, each read from its own run, against the working tree this report
describes. Every gate exits 0. The full-suite run's exit code comes from `tmp/u7f2-npm-test.sh`,
which writes `tmp/u7f2-npm-test.log.txt`.

| Gate | Engine | Exit | Final lines |
| --- | --- | --- | --- |
| `npm run format:check` | none | 0 | `All matched files use the correct format.`, `Finished in 794ms on 96 files using 16 threads.` |
| `npm run lint:check` | none | 0 | no diagnostic output |
| `npm run check` | none | 0 | `vue-tsc --noEmit -p configs/app/tsconfig.browser.json` |
| `npm run test:app:browser` | Chromium | 0 | `Test Files  3 passed (3)`, `Tests  11 passed (11)` |
| `npm run test:journey` | Chromium | 0 | `Test Files  4 passed (4)`, `Tests  84 passed / 4 skipped (88)` |
| `npm test` | Chromium | 0 | final project `guides`: `Test Files  1 passed (1)`, `Tests  18 passed (18)`, then `exit=0` |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser` | Edge | 0 | `Test Files  3 passed (3)`, `Tests  11 passed (11)` |
| `PLAYWRIGHT_CHANNEL=msedge npm run test:journey` | Edge | 0 | `Test Files  4 passed (4)`, `Tests  84 passed / 4 skipped (88)` |
| `CAPTURE=1 npm run test:journey` | Chromium | 0 | `Test Files  4 passed (4)`, `Tests  88 passed (88)` |

The capture run is last, so the portfolio and the per-variant artifacts are in step. Each
`tmp/capture/<variant>.txt` ends with its frame paths, and the capture case asserts that a run's
paths are exactly the registered states for its variant. `grep -c "capture/states/"` over each
artifact after that run reports 12, which is the registered state set:

| Artifact | `grep -c` | Last line |
| --- | --- | --- |
| `tmp/capture/light-1280.txt` | 12 | `.../states/button-primary-pressed-dark--light-1280.png` |
| `tmp/capture/dark-1280.txt` | 12 | `.../states/button-primary-pressed-dark--dark-1280.png` |
| `tmp/capture/light-390.txt` | 12 | `.../states/button-primary-pressed-dark--light-390.png` |
| `tmp/capture/dark-390.txt` | 12 | `.../states/button-primary-pressed-dark--dark-390.png` |

## Tree

`git status --porcelain --untracked-files=all`:

```text
 M app/browser/styles/_shell.scss
 M tests/app/browser/Showcase.test.ts
 M tests/app/browser/integration.test.ts
```

`git diff --stat`:

```text
 app/browser/styles/_shell.scss        |  18 ++++--
 tests/app/browser/Showcase.test.ts    |  63 +++++++++++++++++++-
 tests/app/browser/integration.test.ts | 108 ++++++++++++++++++++++++++++++++--
 3 files changed, 179 insertions(+), 10 deletions(-)
```

The files are brief 1's, and this round changed only `tests/app/browser/integration.test.ts` and
`tests/app/browser/Showcase.test.ts`. The reports, the regenerated portfolio, and the full-suite log
sit under `tmp/`, which the repository ignores, so none of them appears in the status.

## Bounds recorded, not acted on

- The hover frame's proof depends on a pane the journey stages before the pointer is placed and
  stages again after the shot. Each is here because `captureFrame` does not re-establish the
  pointer after it stages the pane, and does not leave the pane staged when it returns. The durable
  repair is Test-side and outside this checkout; round 1 recorded the staging half of it and this
  round measures the hand-back half.
- The handed-back reading is left unasserted deliberately. Pinning it would pin the capture's
  hand-back behaviour as it stands, and the Test-side repair named earlier would red it.
