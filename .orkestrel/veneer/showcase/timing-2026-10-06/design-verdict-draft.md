# Verdict: task 75, the timing-sensitive journey readings

This verdict covers the objective lane: correctness, signals, and what the contracts permit. It adopts the sizing proposal and grafts six parts of the signals proposal into it. Every contradiction and breach in the inputs was re-read against `/home/user/.wave/veneer-containment` and against the run folders under `/home/user/veneer/tmp/units/journey-cost/runs/`.

## Rulings

### 1. Kinds, properties, signals, and the sizing rule

Readings 1 to 6 fall into three kinds.

- **Reading 1 is a read cost.** The case at `tests/integration.test.ts:678-695` is synchronous, has no third argument, and contains no wait. `sheetProject` sets no `testTimeout` (`vite.config.ts:157-177`). Vitest fails a synchronous case after it returns when the elapsed time reaches the timeout (`node_modules/@vitest/runner/dist/chunk-artifact.js:2288-2294`). The case needs a bound but has no signal.
- **Reading 2 is a budget.** The 120_000 ms value at `tests/app/browser/integration.test.ts:2052` is a test timeout. It guards against a hang across rows that each end on their own predicates. `Showcase.test.ts:416-420` is a separate settle wait. It polls `getAnimations().length === 0` under the 1,000 ms default.
- **Reading 3 is a budget in two layers.** The inner ceilings are `COMPONENT_WAIT` on the phase-and-described condition (`tests/setupBrowser.ts:4435-4439`) and the bare `waitForAnimations(tip)` (`:4445`). The outer layer is the table timeout at `integration.test.ts:2112`.
- **Reading 4 is a budget.** It is a ceiling on `waitForAnimations`, which waits on each animation's `finished` promise and reads the list again after each one finishes (`node_modules/@orkestrel/test/dist/src/browser/index.js:1329-1371`).
- **Reading 5 is a budget.** It is a wait per key press plus a loop that must terminate.
- **Reading 6 is a window.** The observer covers a fixed span after the act (`tests/setupBrowser.ts:3515-3516`).

Rule R is the one home for every figure this verdict lands, and each figure must follow it:

1. Take readings only from full journey runs started by `run.ts` under the host lock, on the tree being sized, in which the measured test passed. Beside each reading, record its run folder, the `seconds` value from its `end.json`, and `outside.seconds` from the summary line in its `measure.jsonl` (`tmp/units/journey-cost/measure.ts:194-204`).
2. The margin is the larger of two ratios: the band ratio 618.6/494.0 = 1.252 (brief reading 8), and the reading's own slowest/fastest ratio across the eligible runs. A ratio needs two readings, so every figure needs at least two eligible runs.
3. A wait budget is the slowest reading times the margin, rounded up to the next 100 ms. It must be less than the slack of the test that encloses it: that test's timeout minus its slowest duration.
4. A test timeout is the slowest reading times the margin, rounded up to the next whole second, plus the largest single inner ceiling the test uses.
5. Sometimes a reading's own ratio exceeds the band ratio and its slow readings do not follow `outside.seconds`. In that case the figure waits until the excess is diagnosed.
6. Re-derive a figure when a timing entry exceeds the bound divided by the margin.
7. Record each figure as a constant. Its comment names the runs, the slowest reading, and the margin.

The lane M readings size nothing under R1. `jb0-2` ran from the checkout `/home/user/.wave/journey-cost/M` (`runs/jb0-2/start.json:13`) and exited 1 after 1061.414 s (`runs/jb0-2/end.json:3-8`). That puts it on another tree, and it failed. Neither folder records whether the run held the lock, so the queue rule is not the basis for excluding them.

The harness keeps going after a failed row (`@orkestrel/test/dist/src/browser/index.js:3858-3883`). `executeShowcaseHarness` reads announcements only after `execute` returns (`tests/setupBrowser.ts:3630-3637`). As a result, a Vitest timeout during a failure that spans several rows loses every named cause. The ruling is to log each failed row at the moment the harness announces it (unit U6). With that in place, a test timeout only guards against hangs and cannot hide a named failure, so R4 adds one inner ceiling and does not need one per failing row.

### 2. Modal refusal window

As built, the window is wrong. A 5 ms window plus one frame is correct only after the engine's bounce has ended, and the observer starts before that.

A refused Escape on the static dialog runs `#prevent` (`src/browser/Modal.ts:59-60`, `:232-257`), in this order:

1. It emits `hidePrevented` (`:233`).
2. It writes inline `overflow-y` (`:243`).
3. It adds `modal-static` (`:244`).
4. It focuses the host with no attribute write (`:248`).
5. It waits on `awaitTransition` with `animated` forced to true (`:247`). With no transition running, that wait is a padded timer task (`src/browser/helpers.ts:935-945`).
6. It removes `modal-static` (`:251`).
7. It waits a second pad (`:252`).
8. It restores `overflow-y` (`:254`).

`#prevent` writes no `aria-*` attribute, and `Trap.ts` writes no attribute or class (a grep for `setAttribute|classList|removeAttribute` finds nothing). The one late mutation the filter counts is therefore the class removal at `:251`. The `style` writes pass the filter (`tests/setupBrowser.ts:3519-3527`).

The act treats `hidePrevented` as completion (`:5164-5179`). Under reduced motion nothing animates, so `waitForAnimations(host)` (`:5180`) returns at once. When the host is under load, the 5 ms timer can then land after the single frame (`:5181`), inside the observation.

The pass at motion=true has a different explanation from the one sizing gave. Its re-read claim (`index.js:1308-1310`) is unproven as a mechanism. What happens is this: the engine removes the class in a microtask chain that hangs off the first transition's `finished` promise (`helpers.ts:947-949`). That chain completes before the frame at `:5181` ends, and the second transition's end writes only `style` (`Modal.ts:254`).

The observer cannot wait for an engine event, because the bounce emits none (`Modal.ts:232-257`). The act must instead wait for the settle predicate the engine's own tests use: no `modal-static` class and no `overflow-y` in the `style` attribute (`tests/src/browser/Modal.test.ts:409-415`, `:464-470`). The window stays a timer because an absence has no event. Its 5 ms is the engine's pad, which makes it a contract figure (`helpers.ts:935-939`, documented at `tests/setupBrowser.ts:3432`).

Three alternatives are refused:

- Filtering `modal-static` out of the observer would hide a class that never comes off.
- Widening the window is a clock that load can still beat.
- An engine completion event for the bounce has no counterpart among Bootstrap's wire events (`src/browser/constants.ts:93-99`). `AGENTS.md` § Design laws also requires "Create or substantively expand a capability with its first real consumer".

The signals premise case is refuted. A synchronous `hidePrevented` listener reads the class as absent, because the emit at `:233` comes before the add at `:244`. The premise case must use a `MutationObserver` instead (unit U4).

### 3. Preservation count

The previous state's panel is not the source of the stray. `buildJourney` calls `buildShowcase`, which calls `destroyShowcase`, which calls `journeyVeneer.destroy()` (`tests/setupBrowser.ts:1417-1424`, `:1398-1404`, `:1494-1500`). `Tip.destroy` removes the panel in the same task (`src/browser/Tip.ts:279`, `:289`). The "reuses the mounted showcase" comment at `:3663` belongs to `buildComponent`, not `buildJourney`. The stray therefore comes from the act inside the same iteration.

The run corpus refutes the brief's "once" and the signals claim that "the J-B2 pair agree on it (10763)". The following figures come from `journey/dark-390.txt` in nine runs, at lines `:356`/`:363` for 1280 px and `:370`/`:377` for 390 px (`completion-b4-journey` at `:362`/`:369`/`:376`/`:383`):

- Every 1280 px tooltip row reads `excluded` 10763.
- At 390 px, 15 of 18 rows read 10766. Only `jb2b-1` light, `jb2b-2` light, and `completion-b3-journey-after-4` dark read 10763.
- Both J-B2 runs read light 10763 and dark 10766. The baseline pair itself therefore holds one race outcome.

The signal is that the panel disconnects. `#disposePanel` is the only path that removes it (`Tip.ts:284-292`). Two other candidates cannot prove the panel left:

- `hidden.bs.tooltip` (`constants.ts:155`, `Tip.ts:324`) fires while hover keeps the panel connected (`Tip.ts:322`).
- `phase` reads `hidden` while an active trigger keeps the panel connected (`Tip.ts:127-135`, `:318-320`).

The reader must wait after the binding (`integration.test.ts:1278-1308`) and before the count (`:1317`). The wait ends when no direct child of `document.body` with the tooltip or popover base class remains other than the bound panel. Engine panels append to `body` (`Tip.ts:203`), and `app/browser` sets no `data-bs-container` and no `container:` option. That scope matters: sizing's unscoped predicate never empties, because static specimens sit inside `main` (`app/browser/sections/tooltips.html:57`, `:67`, `:76`, `:84`, `:112`; `popovers.html:50`, `:76`, `:99`, `:121`, `:146`). Waiting before `buildJourney` cannot see a stray that the act creates.

The mechanism is not evidenced. No run records the classes of the 3 extra elements. Two candidates fit:

- a panel still fading out after the act's Tab traversal;
- a panel shown by hover, for a trigger that scrolled under the stationary pointer after the act clicked the Contents link (`tests/setupBrowser.ts:4480-4482`).

Unit U2 names the mechanism. Unit U3 parks the pointer only if U2 names the hover case.

The critic's "held permanently" claim is partly refuted. `hide()` clears `#active` and `#hovered` (`Tip.ts:234-235`), so a hidden panel stays connected only when an enter or trigger event arrives during the fade. `#enter` then schedules `show()` (`:335-337`), which disposes the old panel (`:166`). The panel stays only when `show()` returns early (`:151-164`). Either way, the bounded wait reports it by name.

The `excluded` field stays in the row. It is a count and a detector for leaked engine panels. Moving it to the Journal changes nothing, because the Journal is compared too (`compare.ts:536-547`). Counting only the owned elements already exists as `signatures` (`:1323-1334`).

### 4. Per-table bounds

Each table gets its own bound, taken from its own measured durations by rule R. The bound must scale with the table's own row count at each motion value. Today `10_000 + max(scenarios) × 2500` (`:2112`) gives every table the bound of the largest table, and nothing measured stands behind that.

One shared per-row cost is refused. Across the six band runs, popover motion=true reads 69.6 to 165.8 s while motion=false reads 10.8 to 13.3 s. The motion=true durations were verified in each `report.json`: 102631.9 ms in `jb2b-1`, 69602.4 ms in `jb2b-2`, and 165767.6 ms in `completion-b4-journey`.

Popover motion=true triggers R5. Its own ratio is 2.38 against the band ratio of 1.252, and it does not follow load: `outside.seconds` reads 57.33 in `completion-b4-journey` and 53.69 in `jb2b-2` (each run's `measure.jsonl` summary). A 0.15 s fade (`src/bootstrap/components/_transitions.scss:5`) cannot explain that cost. The popover figure therefore waits for the U7 diagnosis.

Vitest takes one timeout per `it.each` call. Register each table with `it.each([row])` under the unchanged title template, so titles stay byte-identical. Where the measured cost lives is for the subjective lane to decide. It can be a field on the rows of the `COMPONENT_TABLES` constant or a separate map.

### 5. Animation budget

`waitForAnimations` must take a budget at every call site. The library already accepts one per call (`index.js:1329-1331`).

The 774.5 ms reading at `tests/setupBrowser.ts:3199` cannot size this budget. It was a scroll settle from the j0c2 diagnostic runs, with walls of 305.69 s and 319.32 s over 66 tests (`/home/user/veneer/tmp/codex/j0c4-history.md:26`).

The `completion-b3-journey-after-3b` failure ("waited 1000.5ms … transform", its `report.json`) is a censored lower bound, not a measured settle. That run carried 116.28 CPU seconds of outside load, with a peak of 3.21 CPU seconds per wall second. The six band runs carried 41.9 to 62.45 CPU seconds, with peaks of 1.20 to 1.50 (each run's `measure.jsonl` summary).

A 0.3 s offcanvas transform (`src/bootstrap/components/_offcanvas.scss:20`) was still running past 1 s, and nothing in the tree explains it. A budget sized from the band does not promise to cover that load (see § Open).

The margin is two-sided, as R3 states. `COMPONENT_WAIT` at 5_000 ms has no measurement behind it, so it must be re-derived from U7. The signals floor of "about 1.25 s" is refused because it was derived from a timeout, not from a settle.

### 6. Scrollspy

Neither the 8-poll predicate nor the 100-press cap is right.

The 8-poll predicate is a clock of 70 to 80 ms: eight polls at the 10 ms default interval (`node_modules/@orkestrel/test/dist/src/core/index.js:241`, `:251`). It passes a press whose scroll starts late. The `after-3b` message reads top=160, height=255, extent=1378. Because 160 + 255 < 1378, the region could still move. Either the predicate ended before the scroll, or the key scrolled the outer page instead (`tests/setupBrowser.ts:5684-5685`). A precheck that focus is inside the region separates the two cases.

The ruled design has four parts:

- **End each press on a signal.** End each press on the region's `scrollend`, through `waitForEvent` (`core/index.js:429-461`), whose subscribe runs before the press. Arm it only when focus is inside the region and the region can move in the key's direction.
- **Wait two frames.** After `scrollend`, wait two frames. In the HTML Standard's update-the-rendering steps, the scroll steps come first, then the animation frame callbacks, then the step that updates intersection observations and queues the notification task. The first frame callback therefore comes before the intersection reading, and the second normally comes after the notification task. That makes the count a contract ordering, not a figure chosen by eye. Chromium 141's behavior on this host is still unverified, and the U5 file case gates it.
- **Keep the activation event as the act's check.** `activate.bs.scrollspy` fires only when the active link changes (`src/browser/Scrollspy.ts:136-137`, `:167`). It cannot end a press, and it stays the act's check (`tests/setupBrowser.ts:5719`).
- **Terminate structurally.** The loop ends when the region cannot move in the key's direction, or when a press leaves `scrollTop` unchanged.

The signals rewiring of the calls at `:5672` and `:5711` is refuted. `:5672` follows a Tab traversal, not a key press. `:5711` follows a press that already happened.

### 7. Ownership

Every change is in veneer's test layer, plus instruments under `tmp/units/journey-cost/`.

`@orkestrel/test/browser` needs no change. Per-call `WaitOptions` exist, and so does `waitForEvent`. Changing the 1,000 ms default would change every consumer's contract to suit one host.

The engine needs no stage B work for these readings. Tips emit `hidden.bs.tooltip` and `hidden.bs.popover` (`constants.ts:155`, `:162`) and expose `panel` (`Tip.ts:141-143`). The brief's "phase getter only" is wrong. The end of the modal bounce can be observed in the DOM.

Stage B gets a row only if U7 traces the popover excess into engine code, for example `Placement`. Stage B can also rule on parity for the case where `phase` reads `hidden` while the panel stays connected (`Tip.ts:318-322`). No unit here depends on that ruling.

## Readings

The following table gives each reading's kind, property, signal, sizing rule, and owner. Rule R in ruling 1 governs every sizing cell.

| Reading | Kind | Property | Signal | Sizing rule | Owner |
| --- | --- | --- | --- | --- | --- |
| 1 Witness longhands, `tests/integration.test.ts:678-695` | Read cost | The synchronous reads finish inside the case's explicit bound at the band's slow end | None; Vitest fails the case after it returns (`chunk-artifact.js:2288-2294`) | R4 without an inner ceiling, from two queued integration-project readings; none exists (no report under `runs/` carries the title) | veneer tests |
| 2 Header statechart, `integration.test.ts:1977-2053`; `Showcase.test.ts:416-420` | Budget | The timeout trips only on a hang; the settle wait lets the contrast reads see settled paint | Rows end on their own predicates and `waitForPaint` (`tests/setupBrowser.ts:1592-1595`); the settle wait uses `waitForAnimations` on the header | R4 per family, from U6 entries, which attribute the two `face` durations per run to their variants; band readings: face 22.7 to 32.7 s, theme 9.4 to 11.5 s, pair 25.7 to 32.5 s (six band runs) | veneer tests |
| 3 Popover table, motion=true, light-1280 | Budget, two layers | Inner ceilings bound signal-ended waits; the table timeout trips only on a hang | Phase and described state (`:4435-4439`), `finished` (`:4445`), tip events (`:4471-4499`) | Blocked by R5 (69.6 to 165.8 s, ratio 2.38); size by R4 after the U7 diagnosis is ruled | veneer tests; stage B only if U7 points at engine code |
| 4 Offcanvas, motion=true, `:5078`, `:5180` | Budget | The host's transitions have finished before the backdrop, focus, and announcement reads | Each animation's `finished` promise (`index.js:1350-1370`) | `COMPONENT_WAIT` re-derived by R3 from U7; less than the table slack | veneer tests |
| 5 Scrollspy, 390 px, motion=false, `:5609-5644` | Budget | Each press's scroll ends, and the intersection reading lands, before the selection is read; the loop terminates by geometry | `scrollend` through `waitForEvent`, then two frames by contract order | `COMPONENT_WAIT` per press; no press count | veneer tests |
| 6 Modal refusal, `:3478-3534` | Window | Nothing changes after the refused action's own transient has settled | The act settles on no `modal-static` and no inline `overflow-y`; the window is the engine pad | Keep `readShowcaseWindow` (`:3434-3471`); its 5 ms is the engine contract | veneer tests |
| 7 Preservation `excluded`, `integration.test.ts:1317-1337`, `:1449` | Row shape | A count of document elements outside the bound state, read with no unowned engine tip panel connected | No direct child of `body` with the tooltip or popover base class remains other than the bound panel | `COMPONENT_WAIT` on the predicate wait | veneer tests |
| 8 Journey wall time, 494.0 to 618.6 s | Read cost | The input for every margin; not a bound | None; `end.json` `seconds` (`run.ts:196-230`) | Band ratio 1.252; `outside.seconds` 41.9 to 62.45 in the six band runs | Orchestrator records |

## Units

Paths in this section are relative to the veneer checkout the Orchestrator assigns, except paths under `tmp/units/journey-cost/`, which resolve in `/home/user/veneer`. Run one writer per checkout, and run U3 to U9 in order.

Every Chromium command runs through the host queue, using the form recorded in `runs/jb0-2/start.json:3-13`:

```text
flock /home/user/.wave/journey.lock node tmp/units/journey-cost/run.ts --folder tmp/units/journey-cost/runs/RUN_FOLDER --kind journey --cwd CHECKOUT -- ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --reporter=json --outputFile=tmp/units/journey-cost/runs/RUN_FOLDER/report.json
node tmp/units/journey-cost/compare.ts --baseline BASELINE_A --baseline BASELINE_B --candidate tmp/units/journey-cost/runs/RUN_FOLDER --host-bound tmp/units/journey-cost/host-bound.md --registration 94/0 --out tmp/units/journey-cost/runs/RUN_FOLDER/compare.md
```

The placeholders are as follows:

- `RUN_FOLDER` is a fresh folder name for each run.
- `CHECKOUT` is the unit's checkout.
- `BASELINE_A` and `BASELINE_B` are the pair U3 records.

A file test or a filtered run takes `--kind command` with its own Vitest command. The compare passes when it exits 0 (`compare.ts:1-4`). The host-bound set lists no journey title (`host-bound.md:8`), so any journey failure fails the gate.

### U1 Duration table instrument

- **Role and engine:** executor, `astra`. Starts no Chromium and takes no lock.
- **Owned files:** `/home/user/veneer/tmp/units/journey-cost/durations.ts`.
- **Depends on:** nothing.
- **Change:** Write a Node TypeScript instrument that uses `node:` imports only, like `compare.ts`.
  - Usage: `node durations.ts --run DIR [--run DIR ...] --out FILE`. `--run` repeats.
  - Exit codes: 0 when the file is written, 64 on a usage refusal, 67 on an unreadable report.
  - For each run, read `report.json` (title and duration), `end.json` `seconds`, the `measure.jsonl` summary `outside.seconds`, and the `Statechart duration` timing entries from `journey/*.txt`.
  - Print per title, keyed by variant where an entry names one, the minimum, the maximum, the ratio, and the R3 and R4 figures. Mark each R5 case.
  - Mark repeated titles that carry no variant as unattributed.
- **Acceptance:**
  - Over the six band runs, it reproduces popover motion=true 102631.9 ms (`jb2b-1`), 69602.4 ms (`jb2b-2`), and 165767.6 ms (`completion-b4-journey`).
  - It reproduces `outside.seconds` 58.14 (`jb2b-1`) and 116.28 (`completion-b3-journey-after-3b`).
  - It marks popover motion=true as an R5 case.
- **Must not change:** veneer source or tests, `compare.ts`, `run.ts`, or any run folder.

### U2 Name the preservation stray (probe; lands nothing)

- **Role and engine:** executor, `astra`, in a scratch worktree.
- **Owned files:** a scratch copy of `tests/app/browser/integration.test.ts`.
- **Depends on:** nothing.
- **Change:**
  - Before `:1317`, emit `console.info('Preservation stray probe', JSON.stringify({ width, theme, state, strays, outside }))`.
  - `strays` lists each direct child of `body` with the tooltip or popover base class, other than `panel`. For each one it carries the id, the classes, the trigger whose `aria-describedby` names it, that tip's `phase`, and whether the trigger matches `:hover` and whether it equals `document.activeElement`.
  - `outside` lists the classes of the collected elements that lie outside `main` and outside the population.
  - Run the 390 px journey projects filtered with `-t 'attributes every component departure'` under `--kind command`. Repeat until a 390 tooltip row reads 10766.
- **Acceptance:** It names the 3 extra elements and, for a tip panel, its phase and its hover or focus holder, cited to the run folder. It also rules which branch U3 takes:
  - a hover holder means park the pointer, then wait;
  - any other tip panel means wait only;
  - anything that is not a tip panel means stop and report to the Orchestrator.
- **Must not change:** anything in a landing tree.

### U3 Settle stray tip panels before the count, then re-baseline

- **Role and engine:** executor, `astra`.
- **Owned files:** `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`.
- **Depends on:** U2.
- **Change:**
  - Export a helper from `tests/setupBrowser.ts` that returns the direct children of `document.body` that carry the tooltip or popover base class from `CLASS_NAMES` and are not the owned panel.
  - In the reader, after `:1308` and before `:1312`, add the parking step from the U2 branch when it applies (`parkShowcasePointer`, `tests/setupBrowser.ts:3256-3260`).
  - Then call `waitForCondition('no engine tip panel outside the bound state remains', …, COMPONENT_WAIT)`.
  - When the wait is exhausted, throw with each stray's id and classes.
  - Never wait on `hidden.bs.tooltip` or on `phase` (ruling 3).
- **Acceptance:**
  - A queued file case in `tests/setupBrowser.test.ts` passes. The helper returns a planted direct child of `body` with the tooltip class, and omits both the owned panel and a tooltip specimen inside a `main` element.
  - Two queued full journey runs read the same `excluded` value on all four tooltip rows, and compared against each other they report Equal. Both runs are expected to read 10763 at both widths.
  - Compared against `jb2b-1` and `jb2b-2`, each run differs only on the 390 tooltip preservation rows.
  - When the two runs disagree or the wait times out, land nothing and report.
  - The Orchestrator records the pair as `BASELINE_A` and `BASELINE_B`.
- **Must not change:** the `excluded` field, the summary keys or their order, the theme and state loops, scenario selection (`:1249-1261`), `buildJourney`, `buildComponent`, any other row, engine files, or `compare.ts`.

### U4 Settle the modal bounce inside the refused act

- **Role and engine:** executor, `astra`.
- **Owned files:** `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/src/browser/Modal.test.ts`.
- **Depends on:** U3.
- **Change:**
  - Export one predicate: true when the element lacks the modal static class from `CLASS_NAMES` and its `style` attribute carries no `overflow-y`.
  - Use it in place of the inline predicates at `Modal.test.ts:409-415` and `:464-470`.
  - In `actOnOverlayControl`, when `refused` is true, add `waitForCondition(…, () => predicate(host), COMPONENT_WAIT)` after `:5175-5179` and before `:5180`. The predicate holds at once for an offcanvas host, because its refusal writes no class (`Offcanvas.ts:54-55`, `:68`).
- **Acceptance:**
  - A queued file case runs under `stageMedia({ motion: false })` on the mounted showcase's static dialog. A `MutationObserver` attached before Escape records both the addition and the removal of `modal-static` on the host.
  - A second case drives the static-dialog escape row through `guardShowcaseScenarios` (`:3584`). The host lacks the class when the act returns.
  - Queued runs of the `setup:browser` file and of `src:browser` `Modal.test.ts` pass.
  - A queued full journey run compares Equal against U3's pair, and the modal motion=false table passes.
- **Must not change:** `readShowcaseWindow`, `REFUSAL_ATTRIBUTES`, the filter at `:3519-3529`, the order inside `observeShowcaseStability`, or `src/browser/Modal.ts`. It must add no branch on motion.

### U5 End each scrollspy press on `scrollend`

- **Role and engine:** executor, `astra`.
- **Owned files:** `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`.
- **Depends on:** U4.
- **Change:**
  - Replace `waitForComponentScroll` (`:5609-5623`) with an exported key helper. It reads the key's direction:
    - down: `{ArrowDown}`, `{End}`, `{PageDown}`;
    - up: `{ArrowUp}`, `{Home}`, `{PageUp}`;
    - any other key: none.
  - The region can move up when `scrollTop > 0`, and down when `Math.ceil(scrollTop + clientHeight) < scrollHeight`.
  - When the region can move:
    - If focus is outside the region, throw and name the focused element.
    - Otherwise await `Promise.all([waitForEvent(…scrollend…, COMPONENT_WAIT), pressKeys(key)])`. The `Promise.all` call handles a rejected press, so no rejection goes unhandled.
  - When the region cannot move, press the key and then call `settleShowcaseScroll()`, because the outer page can scroll instead.
  - Both paths end with two `waitForFrame` calls.
  - In `scrollComponentTo`, remove `attempt < 100`. Before each press, throw the `cannot reach` message (`:5640-5642`) when the region cannot move in the key's direction. Throw it after a press that leaves `scrollTop` unchanged.
  - Route the presses at `:5680` and `:5710` through the helper. Delete the waits at `:5672`, `:5683`, and `:5711`.
- **Acceptance:**
  - Queued file cases show that an ArrowDown on a movable region resolves on `scrollend` at both motion values, and that the selection has updated after the two frames.
  - A region at its bottom, with a destination that needs ArrowDown, throws `cannot reach` without arming a wait.
  - A grep finds no `attempt < 100` and no `settled >= 8`.
  - A queued full journey run compares Equal against U3's pair, and both scrollspy tables pass at both motion values.
- **Must not change:** `SCROLLSPY_SCENARIOS`, `readScrollspySelection`, the boundary key choice (`:5680-5682`), the act's checks (`:5712-5724`), the predicate of `settleShowcaseScroll`, or `src/browser/Scrollspy.ts`.

### U6 Statechart timing entries and per-row failure log

- **Role and engine:** executor, `astra`.
- **Owned files:** `tests/app/browser/integration.test.ts`, `tests/setupBrowser.ts`.
- **Depends on:** U5.
- **Change:**
  - In both statechart tests, record `performance.now()` at the start and at each `build` call.
  - In `finally`, emit `console.info('Statechart duration', JSON.stringify({ variant: VARIANT, family, motion, seconds, rows: [{ name, milliseconds }] }))`. Omit `motion` for header tables.
  - In the observer callback of `executeShowcaseHarness`, call `console.error('Statechart row failed', JSON.stringify({ row, cause }))` once for each name in `harness.failures` that has not been logged yet. The harness sets the result attribute before the announcement (`index.js:3879-3882`).
- **Acceptance:**
  - A queued full journey run compares Equal against U3's pair. The duration entries are timing entries (`compare.ts:101-108`, `:226-228`), and no entry name starts with a `GATED` name (`compare.ts:29-49`).
  - Each statechart test leaves one duration entry.
  - In a scratch run (not landed), a planted failing row prints its line before the harness summary.
- **Must not change:** the `Header statechart` entry, any row, the `GATED` list, or any title.

### U7 Settle and popover probe (lands nothing)

- **Role and engine:** executor, `astra`, in a scratch worktree that carries U3 to U6.
- **Owned files:** a scratch copy of `tests/setupBrowser.ts`.
- **Depends on:** U6.
- **Change:**
  - Shadow the imports of `waitForCondition`, `waitForAnimations`, and `waitForEvent` with local functions of the same signatures. They record the elapsed milliseconds for each wait description.
  - Print `console.info('Settle probe', JSON.stringify({ variant, family, motion, waits }))` for each table.
  - For popover, time each await in `arrangePopoverVisibility` (`:4544-4554`), `actOnTipControl` (`:4468-4503`), `assertTipVisibility` (`:4428-4454`), and `observeShowcaseStability` (`:3478-3534`), and print `Popover probe` entries.
  - Repeat queued full runs with `--kind command` until popover motion=true readings span at least the band ratio, so the slow mode is captured.
- **Acceptance:**
  - Names the slowest settle for each wait description, with the run folder, the `seconds` from `end.json`, and `outside.seconds`.
  - Names the popover steps that account for the motion=true excess.
  - When the cause is a test wait, the Orchestrator opens a test unit. When the cause is engine code, stage B gets a row with the `file:line`.
- **Must not change:** anything in a landing tree.

### U8 Derive `COMPONENT_WAIT` and budget every animation settle

- **Role and engine:** executor, `astra`.
- **Owned files:** `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`.
- **Depends on:** U7.
- **Change:**
  - Set the budget of the `COMPONENT_WAIT` constant by R3 from the U7 readings, and replace the comment at `:3199` with the runs, the slowest reading, and the margin.
  - Pass `COMPONENT_WAIT` to each `waitForAnimations` call:
    - `tests/setupBrowser.ts` `:1594`, `:1949`, `:1971`, `:3905`, `:4058`, `:4163`, `:4445`, `:4623`, `:4671`, `:4799`, `:4828`, `:4838`, `:4896`, `:5078`, `:5180`, `:5353`;
    - `tests/app/browser/integration.test.ts` `:837` and `:1001`.
  - Replace the literal budget at `:3422` with `COMPONENT_WAIT`.
  - Replace `Showcase.test.ts:416-420` with `waitForAnimations` on the page's `header` element under `COMPONENT_WAIT`.
  - Derive the animation duration of the control at `tests/setupBrowser.test.ts:501-519` between the library default and the derived budget.
  - The change at `:1594` reaches every header row and the preservation reader through `waitForPaint`.
- **Acceptance:**
  - A grep of the four files finds no single-argument `waitForAnimations(` call.
  - Queued `setup:browser` and `app:browser` file runs pass.
  - A queued full journey run compares Equal against U3's pair.
  - U1 shows the budget is less than each table's slack.
  - When the derived budget is 1,000 ms or less, stop, because the control's premise fails.
- **Must not change:** the library default, any predicate, `readShowcaseWindow`, or any test timeout.

### U9 Measured test timeouts

- **Role and engine:** executor, `astra`.
- **Owned files:** `tests/setupBrowser.ts`, `tests/app/browser/integration.test.ts`, `tests/integration.test.ts`.
- **Depends on:** U8, and the Orchestrator's ruling on the U7 popover diagnosis.
- **Change:**
  - Take two queued full runs on the U8 tree and run U1 over them.
  - Size each component table and motion pair by R4 with `COMPONENT_WAIT` as the inner ceiling. The figure scales with `scenarios.length` at the measured per-row cost.
  - Size each header family by R4 with `COMPONENT_WAIT` as the ceiling.
  - Register each table with `it.each([row])` under the same title template, and delete the expression at `:2112` and the 120_000 at `:2052`.
  - Re-derive the 300_000 at `:1707` from the preservation case's own durations.
  - Give `tests/integration.test.ts:678` an explicit timeout from two queued `--kind command` runs of the integration project that use a JSON reporter.
- **Acceptance:**
  - Every title is byte-identical to its title in `runs/jb2b-1/report.json`.
  - A queued full journey run compares Equal against U3's pair, with no `Host-bound title absent` line.
  - U1 reproduces each figure.
  - The integration project passes through the queue.
- **Must not change:** scenario lists or their order, the harness, inner budgets, or `compare.ts`.

## Records to amend

The following records conflict with the tree or the runs and need amending.

- **Brief reading 7, the count.** At 390 px, 10766 is the majority reading: 15 of 18 rows across nine runs. The J-B2 pair is split, light 10763 and dark 10766.
- **Brief reading 7, the tip.** The tip exposes `panel` and emits `hidden.bs.tooltip` and `hidden.bs.popover`, so it does not offer only `phase`.
- **Brief reading 7, `buildJourney`.** `buildJourney` mounts a fresh showcase. The comment at `:3663` belongs to `buildComponent`.
- **Brief § Objective, the landing gate.** The J-B2 pair can no longer serve as the landing gate after U3. The pair U3 records replaces it.
- **Compare invocation.** Every compare invocation must pass `--host-bound tmp/units/journey-cost/host-bound.md` and `--out` (`compare.ts:1`).
- **Brief reading 3 and the comment at `tests/setupBrowser.ts:3199`.** The 774.5 ms figure is a scroll settle from j0c2 (`j0c4-history.md:26`), not a settle from a passing four-project run.
- **Brief reading 4.** Record the `outside.seconds` reading of `completion-b3-journey-after-3b`: 116.28, about twice the band's 41.9 to 62.45. The scrollspy failure (reading 5) occurred in the same run.
- **Brief reading 8.** Record the band's `outside.seconds` beside each wall time. "No other lock holder" rests on the writer's report; `measure.jsonl` is the check.
- **Brief readings 1 to 3.** The lane M folders are `jb0-1` and `jb0-2` under `runs/`, from another checkout. `jb0-2` exited 1 after 1061.414 s.
- **Brief reading 5.** No `scrollspy-ab-*` folder appears among the runs read for this verdict, so the 56.1 to 56.7 s figures are unverified.

## Open

The following items need the user, the Orchestrator, the subjective lane, or stage B.

- **Orchestrator: baseline.** Rule on replacing the J-B2 baseline with U3's pair as the landing gate.
- **Orchestrator: load coverage.** Rule whether bounds must hold at the outside load of `after-3b` (116.28 CPU seconds, peak 3.21) or of lane M. Rule R covers the band only.
- **Orchestrator: popover.** Rule on the U7 popover diagnosis before U9 lands that figure. Stage B gets a row only if the cause is engine code.
- **Orchestrator: witness case.** The witness case could lower its read cost instead of taking a larger timeout. This verdict sizes a timeout and leaves the reader unchanged.
- **Orchestrator: U8 control.** Rule on the control if U8 derives a budget of 1,000 ms or less.
- **Subjective lane: names and placement.** Name the stray-panel helper, the modal-settle predicate, the key helper, the `Statechart duration` and `Statechart row failed` entries, and where the per-row cost lives (a field on `COMPONENT_TABLES` rows or a separate map). Also rule on the one-row `it.each([row])` registration.
- **Stage B: tip parity.** Rule whether `phase` reading `hidden` with a connected panel (`Tip.ts:318-322`) is a parity defect. No unit here depends on it.
- **Unverified, gated by units:** whether Chromium 141 fires `scrollend` on an element scroller for keyboard scrolls (U5), the mechanism behind the 3 extra elements (U2), and the record type behind the `jb2b-1` refusal failure (U4).