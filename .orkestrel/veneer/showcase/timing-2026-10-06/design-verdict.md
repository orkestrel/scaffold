# Verdict: task 75, the timing-sensitive journey readings

Every reading in task 75 ends on a signal or a settle predicate in veneer's test layer. Stage B gets a row only if unit U7 traces the popover excess into engine code. Under the revised Rule R, the eligible band is six full runs on one test tree, with a band ratio of 1.1637 (618.627 s over 531.623 s, `durations-2026-10-06.md:13-14`). The popover motion=true table (60228.0 to 165767.6 ms, ratio 2.75) and every other title that fails the R5 inversion test keep their present bounds until the Orchestrator rules on U7's diagnosis.

## Rulings

Cited lines resolve in `/home/user/.wave/veneer-containment` (veneer `90b96bb`) unless a path is absolute. Run folders are under `/home/user/veneer/tmp/units/journey-cost/runs/`.

### 1. Kinds, properties, signals, and sizing

Readings 1 to 6 fall into three kinds:

- **Reading 1 is a read cost.** The case at `tests/integration.test.ts:678` is synchronous and has no third argument. The `sheetProject` function sets no `testTimeout` value (`vite.config.ts:157-177`). Vitest fails a synchronous case after it returns when the elapsed time reaches the timeout (`node_modules/@vitest/runner/dist/chunk-artifact.js:2288-2294`). The case needs a bound and has no signal.
- **Reading 2 is a budget.** The 120_000 ms value (`tests/app/browser/integration.test.ts:2052`) is the header table's test timeout, and the rows end on their own predicates. A separate settle wait (`tests/app/browser/Showcase.test.ts:416-420`) polls every header button for `getAnimations().length === 0` under the 1,000 ms library default.
- **Reading 3 is a budget in two layers.** The inner ceilings are the `COMPONENT_WAIT` constant on the phase-and-described condition (`tests/setupBrowser.ts:4435-4439`) and the bare `waitForAnimations` call on the tip (`:4445`). The outer layer is the table timeout (`integration.test.ts:2112`).
- **Reading 4 is a budget.** It is a ceiling on the `waitForAnimations` helper. The helper waits on each animation's `finished` promise and reads the list again after a completion or a cancellation (`@orkestrel/test/dist/src/browser/index.js:1329-1374`).
- **Reading 5 is a budget.** It is a wait per key press inside a loop that must terminate.
- **Reading 6 is a window.** The observer covers a fixed span after the act (`tests/setupBrowser.ts:3515-3516`).

Rule R in the following section governs every figure.

A test timeout fails any case that runs past it, whether the case is slow or hung (`chunk-artifact.js:2288-2294`). The harness continues after a failed row (`index.js:3858-3883`). The `executeShowcaseHarness` function reads announcements only after `execute` returns (`tests/setupBrowser.ts:3630-3637`), so a timeout during a failure that spans several rows loses every named cause. Unit U6 therefore logs each failed row when the harness announces it; the harness sets its failure state before the announcement (`index.js:3879-3882`). The log preserves the causes announced before a timeout. It does not change what a timeout fails. R4 adds one inner ceiling to every timeout for that reason.

### 2. Modal refusal window

As built, the window is wrong for a refused action on the static dialog. The observer starts before the engine's bounce has ended, and a 5 ms window plus one frame is sound only after the bounce.

Both refusals of the static dialog enter `#prevent` (`src/browser/Modal.ts:232-257`). The act marks Escape as refused when `data-bs-keyboard` is `false`, and the backdrop as refused when `data-bs-backdrop` is `static` (`tests/setupBrowser.ts:5164-5166`). The specimen declares no initial inline overflow (`app/browser/sections/modal.html:82-90`). The other modal rows, hidden Escape and trapped Tab (`tests/setupBrowser.ts:5300-5334`), need no bounce wait.

The `#prevent` method runs these steps in this order:

1. It emits `hidePrevented` (`Modal.ts:233`).
2. It writes inline `overflow-y` only when the host does not overflow (`:242-243`).
3. It adds `modal-static` (`:244`).
4. It arms `awaitTransition` on the dialog with `animated` forced to true (`:247`).
5. It focuses the host (`:248`).
6. It awaits the armed wait (`:249`). With no transition running, that wait is a padded timer (`src/browser/helpers.ts:935-945`).
7. It removes `modal-static` (`:251`).
8. It waits a second pad (`:252`).
9. It restores `overflow-y` (`:254`).

The `#prevent` method writes no `aria-*` attribute. `Trap.ts` writes no attribute or class. The observer's filter ignores `style` records (`tests/setupBrowser.ts:3519-3527`). The one late mutation the filter counts is therefore the class removal at `Modal.ts:251`.

Under reduced motion, the `waitForAnimations` call on the host (`tests/setupBrowser.ts:5180`) finds nothing running and returns at once. Under load, the 5 ms timer can then land after the single frame (`:5181`) and inside the observation. This sequence admits the failure. It does not identify it: the `jb2b-1` report records only the aggregate refusal error, so the mutation that failed `jb2b-1` is unidentified. U4's file case records the mutation records it observes.

How the motion=true rows pass is not established. The `awaitTransition` helper races the transition's `finished` chain against the padded timer (`helpers.ts:945-949`), and no report shows which path completed.

The act must wait for the settle predicate the engine's own tests use: no `modal-static` class and no `overflow-y` in the `style` attribute (`tests/src/browser/Modal.test.ts:409-415`, `:464-470`). That predicate cannot hold before the bounce starts. The emit at `Modal.ts:233` and the class addition at `:244` run in one synchronous span before the first await (`:249`), and the act's condition wait (`tests/setupBrowser.ts:5175-5179`) evaluates outside that span.

The window stays a timer because an absence has no event. Its 5 ms is the engine's pad, which makes it a contract figure (`helpers.ts:935-939`, documented at `tests/setupBrowser.ts:3432`).

This ruling refuses three alternatives:

- Filtering `modal-static` out of the observer would hide a class that never comes off.
- Widening the window gives a clock that load can still beat.
- An engine completion event for the bounce has no counterpart among Bootstrap's wire events (`src/browser/constants.ts:93-99`). `AGENTS.md` § Design laws also requires: "Create or substantively expand a capability with its first real consumer".

A synchronous `hidePrevented` listener reads the class as absent, because the emit at `Modal.ts:233` precedes the addition at `:244`. The premise case therefore uses a `MutationObserver` instance (unit U4).

### 3. Preservation count

The preceding journey's owned panels are gone before each iteration. The chain is synchronous:

- `buildJourney` calls `buildShowcase` (`tests/setupBrowser.ts:1417-1423`).
- `buildShowcase` calls `destroyShowcase` (`:1398-1402`).
- `destroyShowcase` calls `journeyVeneer.destroy()` (`:1494-1499`).
- The veneer destroys its owned components synchronously (`src/browser/Veneer.ts:115-128`).
- `Tip.destroy` removes the panel (`src/browser/Tip.ts:267-291`).

The "reuses the mounted showcase" comment belongs to the `buildComponent` function (`tests/setupBrowser.ts:3663-3669`).

Teardown does not prove that the act creates the stray. The same iteration also mounts, applies a theme, boots the engine, and arranges the scenario before it acts (`integration.test.ts:1248-1267`). Each of those steps is a candidate source beside the act. Unit U2 logs the stray set after the `buildJourney` call, after the arrange step, and at the count.

The count splits across runs. The following readings come from `journey/dark-390.txt` in nine runs (lines `:356`/`:363` at 1280 px and `:370`/`:377` at 390 px; `completion-b4-journey` at `:362`/`:369`/`:376`/`:383`):

- Every 1280 px tooltip row reads `excluded` 10763.
- At 390 px, 15 of 18 rows read 10766. Only `jb2b-1` light, `jb2b-2` light, and `completion-b3-journey-after-4` dark read 10763.
- Both J-B2 runs read light 10763 and dark 10766, so the baseline pair itself holds one outcome of the race.

The signal is that the panel disconnects. The `#disposePanel` method is the only path that removes a panel (`Tip.ts:284-292`). Two other candidates cannot prove that the panel left:

- `hidden.bs.tooltip`: the hide completion returns early with the panel connected while any trigger flag is active (`Tip.ts:318-320`). When the trigger is hovered, it emits the event (`:324`) without disposing the panel (`:322`).
- The `phase` getter reads `hidden` whenever no completion is pending and the tip is not visible (`:127-135`), and the panel can still be connected (`:318-322`).

The reader must wait after the binding (`integration.test.ts:1278-1308`) and before the count (`:1317`). The wait ends when no direct child of `document.body` carries the tooltip or popover base class, other than the bound panel. Engine panels append to `body` (`Tip.ts:203`), and `app/browser` sets no `data-bs-container` attribute and no `container` option. A direct-child query skips the static specimens nested inside `main` (`app/browser/sections/tooltips.html:57`, `popovers.html:50`). Waiting before the `buildJourney` call cannot see a stray that a later step creates.

No run records the classes of the 3 extra elements. Two candidates fit:

- a panel still fading out after the act's Tab traversal;
- a panel shown by hover for a trigger that scrolled under the stationary pointer after the Contents link click (`tests/setupBrowser.ts:4480-4482`).

The `hide()` method clears `#active` and `#hovered` (`Tip.ts:234-235`). A hidden panel therefore stays connected only when an enter or trigger event arrives during the fade. The `#enter` method then schedules `show()` (`:335-337`), which disposes the old panel (`:166`) unless `show()` returns early (`:151-164`). The bounded wait reports the stray by name in every case.

The `excluded` field stays in the row as a count and a leak detector. Moving it to the Journal changes nothing, because the compare reads the Journal too (`compare.ts:536-547`).

### 4. Per-table bounds

Each table must get its own bound, sized by Rule R from that table's own durations at each motion value. The expression `10_000 + max(scenarios) × 2500` (`integration.test.ts:2112`) gives every table the bound of the largest table, and no measurement stands behind it.

One shared per-row cost is refused. Over the six eligible runs, popover motion=true reads 60228.0 to 165767.6 ms and popover motion=false reads 10714.4 to 13307.7 ms (`durations-2026-10-06.md:66-67`).

Popover motion=true is held by R5. Its own ratio is 2.75 against the band ratio of 1.1637. Its inversion witness is `jb2-2` at 109517.0 ms (`outside.seconds` 55.33) against `jb2-1` at 72563.5 ms (62.45), a ratio of 1.51 (`:67`). A 0.15 s fade (`src/bootstrap/components/_transitions.scss:5`) does not explain the cost.

The U1 table marked R5 against the superseded band of 1.2522 (`durations-2026-10-06.md:3`). Under the revised band, R5 holds more titles. Computed by hand from the U1 rows, the following tables of these readings are held:

- popover motion=false: `completion-b4-journey` 13307.7 ms at 57.33 against `jb2-1` 11023.0 ms at 62.45, ratio 1.21 (`:66`)
- offcanvas motion=true: ratio 1.20 (`:64`)
- offcanvas motion=false: ratio 1.17 (`:63`)
- modal motion=false: `jb2b-2`/`jb2-2`, ratio 1.30 (`:57`)
- the pair header: `completion-b4-journey`/`jb2-1`, ratio 1.23 (`:65`)
- preservation at 1280 px: `completion-b4-journey`/`jb2-1`, ratio 1.21 (`:34`)

The following stay unheld:

- the theme header: ratio 1.10 (`:78`)
- scrollspy-390 motion=false: ratio 1.1600 against 1.1637 (`:74`)
- preservation at 390 px: ratio 1.17 with no inverted pair (`:35`)

U1b reproduces this list. A held title keeps its present bound until the Orchestrator rules on U7's diagnosis for it.

Vitest takes one timeout per `it.each` call. Each table therefore registers through `it.each([row])` under the unchanged title template. Titles stay byte-identical, because Vitest formats `$family` and `$motion` from the row object and neither template uses an index placeholder (`chunk-artifact.js:2016-2033`, `:2188-2198`).

The per-table figures live in a `COMPONENT_TABLE_BUDGETS` map in `tests/setupBrowser.ts`, keyed by family and motion. The rows of the `COMPONENT_TABLES` constant describe scenarios, not host measurements.

### 5. Animation budget

Every call to the `waitForAnimations` helper must take a budget. The library accepts one per call (`@orkestrel/test/dist/src/browser/index.d.ts:3161`; `index.js:1329-1331`).

The 774.5 ms comment (`tests/setupBrowser.ts:3199`) records a scroll settle from the j0c2 diagnostics. Those diagnostics passed 66 tests over the four variants (`/home/user/veneer/tmp/codex/j0c4-history.md:26`). The figure is not a settle of a wait this budget bounds, so it cannot size the budget.

The `completion-b3-journey-after-3b` offcanvas failure records 1000.5 ms with `transform` still running (its `report.json`). That is a censored lower bound, not a measured settle. The report names the transition property, not its target or start time. It therefore does not show that one 0.3 s offcanvas transition (`src/bootstrap/components/_offcanvas.scss:20`) ran for the whole second.

That run carried 116.28 CPU seconds of outside load, with a peak of 3.21 CPU seconds per wall second (its `measure.jsonl:5482`). The six eligible runs read 53.69 to 62.45 CPU seconds, with peaks of 1.20 to 1.51, in each run's `measure.jsonl` summary:

- `jb2-1`: `:5342`
- `jb2-2`: `:5355`
- `jb2b-1`: `:5302`
- `jb2b-2`: `:5397`
- `completion-b4-journey`: `:6006`
- `completion-b3-journey-after-4`: `:5195`, peak 1.295

Bounds hold over the eligible band. A failure under an out-of-band run is recorded, not treated as a defect (Rule R, load coverage).

The `COMPONENT_WAIT` constant's 5_000 ms has no measurement behind it. U8 re-derives it by R3 from the `Settle probe` readings U7 emits. The signals floor of "about 1.25 s" is refused, because it was derived from a timeout, not from a settle.

### 6. Scrollspy

Neither the 8-poll predicate nor the 100-press cap is right.

The predicate starts `previous` at -1 and `settled` at 0 (`tests/setupBrowser.ts:5611-5618`). It needs nine evaluations and eight nominal 10 ms delays, about 80 ms plus scheduling and callback cost, followed by a frame (`:5622`; `@orkestrel/test/dist/src/core/index.js:239-251`). Nothing bounds that span from above. It passes a press whose scroll starts later than the span.

The `after-3b` message reads top=160, height=255, and extent=1378. Because 415 < 1378, the region could still move. Focus inside the region does not show which scroller consumed the key: a boundary Home or End scrolls the outer page while focus stays inside (`:5684-5685`). The cause of that failure remains undetermined.

The ruled design has five parts:

- **End a directional press on `scrollend`.** Use the `waitForEvent` helper, which subscribes before its first suspension (`core/index.js:429-455`), around the press. Arm it only when focus is inside the region and the region can move in the key's direction.
- **Then wait for one intersection notification.** Attach a temporary `IntersectionObserver` instance, rooted at the region, to the region's first spied target, and await its first callback, bounded by the `COMPONENT_WAIT` constant. The specification delivers every pending observer's notifications in one task (see [IntersectionObserver task delivery](https://w3c.github.io/IntersectionObserver/#queue-intersection-observer-task)). The engine's observer is registered earlier, so it has run when the temporary one fires. No frame count is used.
- **Keep the boundary key separate.** A boundary Home or End ends on the `settleShowcaseScroll` function (`tests/setupBrowser.ts:3410-3423`) and then the intersection wait. A key with no scroll direction, such as Escape, ends on the intersection wait alone.
- **Keep the activation event as the act's check.** `#activate` returns early only when `#processed` is the same link (`src/browser/Scrollspy.ts:137`). A nonintersecting entry resets `#processed` (`:122-124`), so the event can fire again for the same link. It cannot end every press, and it stays the act's check (`tests/setupBrowser.ts:5719-5720`).
- **Terminate structurally.** The loop ends with the `cannot reach` error when the region cannot move in the key's direction, or after a press that leaves `scrollTop` unchanged.

The "two frames" contract is withdrawn. The HTML processing model orders the scroll steps before the frame callbacks and the intersection update, but the notification is a separately queued task with no ordering against the next frame (see [the HTML event loop processing model](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)).

It is unverified whether Chromium 141.0.7390.37 fires `scrollend` for keyboard scrolls on an element scroller. U5's file case verifies it first.

The signals proposal's rewiring of the calls at `:5672` and `:5711` is refused. `:5672` follows a Tab traversal and a page settle, not a key press, and `:5711` follows a press that has already happened.

### 7. Ownership

Every change is in veneer's test layer, plus the instruments under `/home/user/veneer/tmp/units/journey-cost/`.

The `@orkestrel/test/browser` package needs no change. Per-call `WaitOptions` values exist, and so does the `waitForEvent` helper. Changing the 1,000 ms default would change every consumer's contract to suit one host.

The engine needs no stage B work for these readings:

- Tips expose a `panel` getter (`Tip.ts:141-143`) and emit `hidden.bs.tooltip` and `hidden.bs.popover` events (`constants.ts:155`, `:162`).
- The end of the modal bounce can be observed in the DOM (`Modal.ts:251`, `:254`).

Stage B gets a row only if U7 traces the popover excess into engine code.

## Rule R

Every figure this verdict lands follows these clauses.

1. **Eligibility.** A run is eligible for a title only when three conditions hold:
   - It ran the test code being sized. Commits `ae7d545` through `90b96bb` share the journey test code for every title except the two titles that read B4's `TAILWIND_READINGS` rows (J4, `integration.test.ts:490`, reads at `:496-512`; the resolved-values title, `:1103`, reads at `:1132-1141`; rows named at `/home/user/scaffold/.orkestrel/veneer/lanes.md:89`). The rows fix `9bc0003` changed only a Journal entry. On 2026-10-06 the eligible same-tree full runs are `completion-b3-journey-after-4`, `jb2b-1`, `jb2b-2`, and `completion-b4-journey`. `jb2-1` and `jb2-2` ran on `47c0765`, which has the same test code as `ae7d545`, and count too. For the two `TAILWIND_READINGS` titles, only runs on B4 or later count.
   - The title passed in that run.
   - The run left an `end.json` file, a `measure.jsonl` file, and a `report.json` file.

   Integration-project titles instead use two queued `--kind command` runs with the JSON reporter and no load reading. The host queue stays a launch requirement, not an eligibility test, because no artifact records lock ownership (`measure.ts:194-202`). The lane M runs `jb0-1` and `jb0-2` are ineligible because they ran another checkout (`runs/jb0-2/start.json:13`). The reason is not `jb0-2`'s exit 1 after 1061.414 s (`runs/jb0-2/end.json`).
2. **Margin.** The band ratio is the slowest wall time over the fastest among the eligible same-tree full runs, never across trees. On 2026-10-06 that is 618.627 s (`completion-b4-journey`) over 531.623 s (`completion-b3-journey-after-4`), which is 1.1637 (`durations-2026-10-06.md:9-14`). The margin is the larger of the band ratio and the title's own slowest-over-fastest ratio, so every figure needs at least two eligible runs. `completion-b3-journey-before` ran `ec37454` and is excluded from the band.
3. **Wait budget.** A wait budget is the slowest reading times the margin, rounded up to the next 100 ms. Its readings come from the `Settle probe` entries U7 emits and the `Statechart duration` rows U6 emits, never from a `report.json` file. The budget must be less than the slack of the enclosing test, which is that test's timeout minus its slowest duration. The timeout comes from the source, because no report carries it; U1b takes it as an input. An R4 timeout leaves at least one inner ceiling of slack, so a budget no larger than that ceiling meets this clause under an R4 timeout. Amendment of 2026-10-06 (unit U8): `Settle probe` readings pool per family, motion, and description, and each eligible run contributes one reading to a pool, its slowest. A per-run reading counts toward a pool's own ratio only when it is at least the engine's shortest declared transition, 150 ms (`$transition-fade`): a shorter reading did not wait out a transition, and the ratio of two such readings measures scheduling jitter, not a settle's variability (over the four U7 runs the largest per-pool ratio reads 9.47 with a 10 ms floor, 3.31 at 20 ms, 2.18 at 50 ms, 1.91 at 100 ms, 1.69 at 150 ms and at 200 ms, and 1.23 at 300 ms; `settle-pools-threshold.out` in the record folder). A pool's own ratio is the slowest counting per-run reading over the fastest and needs two counting runs. A shared budget, one constant that bounds every description's wait, takes as its margin the largest of the band ratio and every pool's own ratio, because the budget must survive the host's jitter on whichever settle it reaches. This amendment replaces the ruling of 2026-10-06 that computed the own ratio over every individual reading at or above the poll interval (`lanes.md`, unit U7b entry), under which a first-poll return of 11.0 ms set a 54.37 ratio for `animations div.modal` and a 32,600 ms budget above the slack of ten titles (`runs/task75-u8-analysis-1/report.md`). Over `task75-u7-probe-1`, `-2`, `task75-u7b-header-1`, and `-2`: the slowest settle is `showcase scroll settles` at 888.3 ms (scrollspy-390, motion true, `task75-u7-probe-2`; 840.8 ms in `-1`); the largest own ratio is 1.6915 (`the close button closes the end panel`, journey J8, 354.2 ms in `-2` over 209.4 ms in `-1`), above the band under clause 2 (1.1637) and as the instrument reads it over the thirteen journey runs of 2026-10-06 across trees (1.2653); `COMPONENT_WAIT` is ceil(888.3 × 1.6915 / 100) × 100 = 1,600 ms, below the smallest slack of a test that reaches it (9,460.0 ms, the Showcase z-index title; `runs/task75-u8-analysis-1/enclosing-slack.json`), the smallest slack of any timed title (4,934.5 ms, `Showcase changes alignment at each mapped sm boundary under every face`), and the smallest setup-caller slack (3,360.7 ms, the 390 px dark specimen readings; `runs/task75-u8-analysis-1/setup-slack.json`).
4. **Test timeout.** A test timeout is the slowest reading times the margin, rounded up to the next whole second, plus the largest single inner ceiling the test uses. After U8, that ceiling is the `COMPONENT_WAIT` budget. A test with no inner wait adds nothing. Amendment of 2026-10-06 (unit U9): the band ratio for any figure is never below the ruled band of clause 2 (1.1637), because a population of two same-tree runs cannot establish a tighter band (the U9 lane's two eligible runs read 1.0404, and per-title readings on the same tree vary by 1.1 to 1.27 between runs, `u9-hold-report.txt`). A measured figure lands only where it raises the bound it replaces or where that bound fails the adequacy check: a bound passes when it is at least the slowest eligible reading times the margin, rounded as the clause requires, plus the inner ceiling. A bound that passes keeps its figure and gains the rule R7 comment naming the slowest reading, the margin, and the run; lowering it buys failure-detection latency alone and risks false failures on hosts this session cannot measure, because the suites also run on the user's desktop. Under this amendment the component tables' shared expression (230,000 ms at 88 scenarios) passes against the slowest table (`scrollspy-390`, motion true, 73,352.0 ms over the post-U7c runs); the header families' 120,000 ms passes against the slowest family (`face`, 37,215.6 ms); the preservation case's 300,000 ms passes against 100,081.4 ms (1280 px); the witness case's 15,000 ms Vitest default passes against 6,833.6 ms × 1.1637 and becomes explicit; and the earlier 5,000 ms `COMPONENT_WAIT` passes against the 1,600 ms rule R3 figure and stays, every call that had the library's 1,000 ms default raised to it (this reverses the 1,600 ms landed at veneer `ee10c3c` within the same day). The U9 lane's derivation (seven tables at margins 1.04 to 1.08 over the 1.0404 band, an 8,000 ms witness figure, 35 titles held by rule R5 against that band) is recorded in `u9-report.md` and not landed; under the 1.1637 floor nine titles hold (own ratio 1.17 to 1.43 with an inversion pair) and none approaches its bound, so no diagnosis unit opens.
5. **Hold.** A title is held when two conditions hold: its own ratio exceeds the band ratio, and some eligible pair has slow over fast above the band ratio with the slow run's `outside.seconds` at or below the fast run's. This is the test the U1 instrument implements (`/home/user/veneer/tmp/units/journey-cost/durations.ts:249-262`). A held title's figure waits until the Orchestrator rules on its diagnosis.
6. **Re-derivation.** Re-derive a figure when a timing reading exceeds its bound divided by its margin. Each reading maps to its bound as follows:
   - a `Statechart duration` entry maps to its table's or header family's timeout;
   - a `Settle probe` wait maps to the `COMPONENT_WAIT` constant;
   - any other `report.json` duration maps to its title's timeout.
7. **Record.** Record each figure as a constant whose comment names the runs, the slowest reading, and the margin.

**Load coverage.** Bounds hold over the eligible band, whose `outside.seconds` readings run from 53.69 to 62.45. A run is out of band when its `outside.seconds` exceeds the band's largest reading (62.45, `jb2-1`) by more than the margin. This verdict applies the band ratio here, because load belongs to a run and not to a title. Under that reading the threshold is 72.67, and `completion-b3-journey-after-3b` at 116.28 is out of band. That run is also outside R1's eligible set, so no figure on 2026-10-06 depends on which margin applies. A failure under an out-of-band run is recorded, not treated as a defect.

## Readings

The following table gives each reading's kind, property, signal, sizing, and owner. Rule R governs every sizing cell. Figures come from `durations-2026-10-06.md` over the six eligible runs.

| Reading | Kind | Property | Signal | Sizing | Owner |
| --- | --- | --- | --- | --- | --- |
| 1 Witness longhands, `tests/integration.test.ts:678` | Read cost | The synchronous reads finish inside the case's explicit bound | None; Vitest fails the case after it returns (`chunk-artifact.js:2288-2294`) | R4 with no inner ceiling, from two queued integration-project `--kind command` runs; margin is the larger of 1.1637 and the case's own ratio; no R5 test; no report under `runs/` carries the title | veneer tests |
| 2 Header statechart, `integration.test.ts:1977-2052`; settle wait `Showcase.test.ts:416-420` | Budget | The timeout bounds the slowest measured duration times the margin plus one inner ceiling; the settle wait lets the contrast reads see settled paint | Rows end on their own predicates and `waitForPaint` (`tests/setupBrowser.ts:1592-1595`); the settle wait polls every header button for no running animation | R4 per family from U6 entries. Theme 10464.1 to 11537.4 ms, unheld (`:78`); pair 25448.6 to 32533.7 ms, held (`:65`); face 24081.8 to 32700.6 ms pooled over two variants, unattributed until U6 (`:56`) | veneer tests |
| 3 Popover table, motion=true | Budget, two layers | Inner ceilings bound signal-ended waits; the table timeout bounds the slowest duration plus margin and ceiling | Phase and described state (`tests/setupBrowser.ts:4435-4439`), `finished` (`:4445`), tip events (`:4471-4499`) | 60228.0 to 165767.6 ms, ratio 2.75, held by R5 (`:67`); sized by R4 after the Orchestrator rules on U7's diagnosis | veneer tests; stage B only if U7 points at engine code |
| 4 Offcanvas, motion=true, `tests/setupBrowser.ts:5078`, `:5180` | Budget | The host's transitions have finished before the backdrop, focus, and announcement reads | Each animation's `finished` promise (`index.js:1329-1374`) | The `COMPONENT_WAIT` budget by R3 from U7's `Settle probe` readings; table 26608.9 to 31865.1 ms over the eligible runs, held (`:64`) | veneer tests |
| 5 Scrollspy, 390 px, motion=false, `:5609-5644` | Budget | Each press's scroll ends and the engine's intersection callback has run before the selection is read; the loop terminates by geometry | `scrollend` through `waitForEvent`, then one intersection notification; a boundary key ends on `settleShowcaseScroll`; a key with no scroll direction ends on the notification | The `COMPONENT_WAIT` budget per wait; no press count; table 64728.1 to 75082.5 ms, ratio 1.1600, unheld (`:74`) | veneer tests |
| 6 Modal refusal, `:3478-3534` | Window | Nothing changes after the refused action's own transient has settled | The act settles on `isModalSettled` for Escape and backdrop refusals; the window is the engine pad | Keep `readShowcaseWindow` (`:3434-3471`); its 5 ms is the engine contract (`helpers.ts:935-939`); table motion=false 19164.3 to 24877.0 ms over five eligible runs, held (`:57`) | veneer tests |
| 7 Preservation `excluded`, `integration.test.ts:1317-1337` | Row shape | A count of document elements outside the bound state, read with no unowned engine tip panel connected | No direct child of `body` with the tooltip or popover base class other than the bound panel | The `COMPONENT_WAIT` budget on the predicate wait; the case timeout (`:1707`) by R4 from post-U3 runs | veneer tests |
| 8 Journey wall time | Read cost | The input for every margin, not a bound | None; `end.json` `seconds` (`run.ts:217-230`) | Band 531.623 to 618.627 s, ratio 1.1637; `outside.seconds` 53.69 to 62.45; peaks 1.20 to 1.51 | Orchestrator records |

## Units

Owned paths resolve in the veneer checkout the Orchestrator assigns. Paths under `/home/user/veneer/tmp/units/journey-cost/` are absolute. Run one writer per checkout. U1b and U2 can run beside each other in different checkouts. U3 to U9 run in order.

Every Chromium command runs through the host queue in the following form. Every folder and `--outputFile` path is absolute, whatever the checkout:

```text
flock /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/RUN_FOLDER --kind journey --cwd CHECKOUT -- ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/RUN_FOLDER/report.json
node /home/user/veneer/tmp/units/journey-cost/compare.ts --baseline BASELINE_A --baseline BASELINE_B --candidate /home/user/veneer/tmp/units/journey-cost/runs/RUN_FOLDER --host-bound /home/user/veneer/tmp/units/journey-cost/host-bound.md --registration 94/0 --out /home/user/veneer/tmp/units/journey-cost/runs/RUN_FOLDER/compare.md
```

The placeholders are as follows:

- `RUN_FOLDER` is a fresh folder name for each run.
- `CHECKOUT` is the unit's checkout.
- `BASELINE_A` and `BASELINE_B` are the absolute folders of U3's pair.

The `run.ts` launcher resolves `--folder` against the shell's directory and `--outputFile` against `CHECKOUT`. It refuses a journey run whose report path differs from the folder's report path (`run.ts:278`, `:293-306`).

A filtered or file run takes `--kind command` with its own Vitest command and an absolute `--outputFile` path. A command run leaves `end.json`, `stdout.log`, and `stderr.log`, and no `measure.jsonl` file or journey artifacts (`run.ts:124-153`, `:155`, `:197-215`).

The compare accepts one or more baselines. It exits 0 when every gate holds and 67 on a difference (`compare.ts:1-4`). The host-bound set lists no journey title (`host-bound.md:8`), so any journey failure fails the gate.

### U1 Duration table instrument (done)

- **Output:** `/home/user/veneer/tmp/units/journey-cost/durations.ts` and its table `/home/user/veneer/tmp/units/journey-cost/durations-2026-10-06.md`.
- **Popover reading:** The popover motion=true row reads 60228.0 ms (`completion-b3-journey-after-4`) to 165767.6 ms (`completion-b4-journey`), with ratio 2.752334, marked R5 (`:67`). The range stands under the revised R1, because the excluded `completion-b3-journey-after-3b` reading of 62091.3 ms lies inside it.
- **Superseded parts:** The table used the superseded band ratio 1.252227 (`:3`) and seven runs, including `completion-b3-journey-after-3b` (`:15`). Its R3 and R4 columns and its R5 marks are superseded. U1b regenerates them.

### U1b Extend the duration instrument

- **Role and engine:** executor, `astra`. It starts no Chromium and takes no lock.
- **Owned files:** `/home/user/veneer/tmp/units/journey-cost/durations.ts`, and the fixture folder `/home/user/veneer/tmp/units/journey-cost/fixtures/durations/`.
- **Depends on:** U1.
- **Change:**
  - Compute the band ratio from the journey runs passed in. First take the wall ratio over every journey input. Mark out of band each run whose `outside.seconds` exceeds the largest `outside.seconds` of the other inputs times that ratio. Recompute the band ratio over the runs left. An out-of-band run stays in the header and contributes no reading.
  - Remove the `618.6/494.0` default (`durations.ts:320`). Keep `--band A/B` only for an invocation that passes no journey run, and exit 64 when neither a journey run nor `--band` is given.
  - Add a repeatable-pair input `--omit FILE`: a JSON array of `{ "run": FOLDER_NAME, "title": TITLE }` objects. Each omitted pair contributes no reading. Use it to omit `completion-b4-journey` for the two `TAILWIND_READINGS` titles until later runs exist.
  - Read a folder with `report.json` and `end.json` but no `measure.jsonl` file as a command run. Its readings carry no load and take the larger of the band ratio and their own ratio as the margin. They take no R5 test.
  - Read `Settle probe` lines (`{ variant, family, motion?, waits: [{ description, milliseconds }] }`) from `journey/*.txt` and from `stdout.log`. Per family, motion, and description, print the reading count, minimum, maximum, ratio, and R3 figure, and the slowest run with its `seconds` and `outside.seconds` values.
  - Print the minimum and maximum milliseconds per table and row name from the `rows` field of `Statechart duration` entries.
  - Add `--timeouts FILE`: a JSON object from title to timeout in milliseconds. Print each title's slack as its timeout minus its maximum. Mark each `Settle probe` R3 figure that is not below the slack of its family and motion's table.
  - Keep `--ceiling MS` and the exit codes 0, 64, and 67.
- **Acceptance:**
  - Over `jb2-1`, `jb2-2`, `jb2b-1`, `jb2b-2`, `completion-b3-journey-after-4`, and `completion-b4-journey`, the instrument prints the band ratio 1.163657. It prints popover motion=true from 60228.0 to 165767.6 ms with ratio 2.752334, marked R5.
  - It lists the held and unheld titles that ruling 4 computes by hand.
  - With `completion-b3-journey-after-3b` added, it marks that run out of band (116.28 against 72.67), and every figure equals the six-run output.
  - A fixture folder with planted `Settle probe` lines, and a command-run fixture with no `measure.jsonl` file, read as specified.
  - A usage refusal exits 64, and an unreadable report exits 67.
- **Must not change:** veneer source or tests, `compare.ts`, `run.ts`, `measure.ts`, or any run folder.

### U2 Name the preservation stray (probe; lands nothing)

- **Role and engine:** executor, `astra`, in a scratch worktree at veneer `90b96bb`.
- **Owned files:** a scratch copy of `tests/app/browser/integration.test.ts`.
- **Depends on:** nothing.
- **Change:**
  - Emit `console.info('Preservation stray probe', JSON.stringify({ width, theme, state, step, strays, outside, excluded }))` at three points:
    - after the `buildJourney` call (`:1248`), with `step` set to `built`;
    - after the arrange step (`:1265`), with `step` set to `arranged`;
    - after `:1337`, with `step` set to `counted`. Only this point carries `excluded`.
  - `strays` lists each direct child of `document.body` that carries the tooltip or popover base class from `CLASS_NAMES`, other than `panel`. For each element, record:
    - its id and classes;
    - its owner, found by checking every tooltip and popover trigger for `component.panel === element` through the registry read at `tests/setupBrowser.ts:4430-4434`;
    - whether any trigger's `aria-describedby` attribute names it;
    - the owner's `phase` value;
    - whether the owner matches `:hover`;
    - whether the owner equals `document.activeElement`.
  - `outside` lists the classes of the collected elements outside `main` and outside the population.
  - Run the filtered command in the following form. The 390 px case runs in the `journey:dark-390` project (`tests/setupBrowser.ts:5819-5822`):

    ```text
    flock /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/RUN_FOLDER --kind command --cwd SCRATCH -- ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --project journey:dark-390 --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/RUN_FOLDER/report.json -t 'attributes every component departure of the tailwindcss face to a declared cause other than preflight at 390 px'
    ```

    `SCRATCH` is the scratch worktree.
  - After each run, copy the scratch worktree's `tmp/journey/dark-390.txt` file into that run folder. A command run copies no journey artifact (`run.ts:197-215`), and Journal lines land in that file (form at `runs/jb2b-1/journey/light-390.txt:462`).
  - Repeat until a 390 px tooltip row reads 10766, or until three consecutive runs read 10763 on both 390 px tooltip rows.
- **Acceptance:** Report either way, with the probe output of every run cited to its run folder. When a 10766 reading occurs, name the 3 extra elements at the `counted` step and the earliest step at which they appear. Also name the stray-free count the 390 px rows read. The report rules U3's branch:
  - a hover holder means park the pointer, then wait;
  - any other tip panel, or no reproduction, means wait only;
  - an element that is not a tip panel means stop and report to the Orchestrator.
- **Must not change:** anything in a landing tree.

### U3 Settle stray tip panels before the count, then re-baseline

- **Role and engine:** executor, `astra`.
- **Owned files:** `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`.
- **Depends on:** U2.
- **Change:**
  - Export a `readStrayTipPanels` function from `tests/setupBrowser.ts`. It returns the direct children of `document.body` that carry the tooltip or popover base class from `CLASS_NAMES` and are not the owned panel passed in.
  - In the reader, after `:1308` and before `:1312`, call `parkShowcasePointer` (`tests/setupBrowser.ts:3256`) only on U2's hover branch.
  - Then call `waitForCondition('no engine tip panel outside the bound state remains', …, COMPONENT_WAIT)`. When the wait is exhausted, throw an error that names each remaining stray's id and classes and carries the wait's error as its cause.
  - Never wait on `hidden.bs.tooltip` or on the `phase` getter.
- **Acceptance:**
  - A queued `--kind command` file run of `tests/setupBrowser.test.ts` in the `setup:browser` project passes. Its added case shows that the helper returns a planted direct child of `body` with the tooltip class and omits both the owned panel and a tooltip specimen inside a `main` element.
  - Two queued full journey runs are made. Each is compared against `completion-b4-journey` alone, which is the same tree and already carries B4's rows. Each comparison differs only on the 390 px tooltip preservation rows.
  - Compared with one as the baseline of the other, the two runs exit 0.
  - Their 390 px tooltip rows read the stray-free count U2 reports.
  - When the runs disagree or the wait times out, land nothing and report.
  - The pair becomes `BASELINE_A` and `BASELINE_B` for every later compare.
- **Must not change:** the `excluded` field, the summary keys or their order, the theme and state loops, scenario selection (`:1249-1261`), the `buildJourney` and `buildComponent` functions, any other row, engine files, or `compare.ts`.

### U4 Settle the modal bounce inside the refused act

- **Role and engine:** executor, `astra`.
- **Owned files:** `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/src/browser/Modal.test.ts`.
- **Depends on:** U3.
- **Change:**
  - Export an `isModalSettled` predicate. It is true when the element lacks the modal static class from `CLASS_NAMES` and its `style` attribute carries no `overflow-y`.
  - Use the predicate in place of the inline predicates at `Modal.test.ts:409-415` and `:464-470`.
  - In the `actOnOverlayControl` function, when `refused` is true, add `waitForCondition(…, () => isModalSettled(host), COMPONENT_WAIT)` after `:5175-5179` and before `:5180`. This covers both Escape and backdrop refusals. The predicate holds at once for an offcanvas host, because its refusal writes no class (`src/browser/Offcanvas.ts:54-55`, `:68`).
- **Acceptance:**
  - Queued file cases run under `stageMedia({ motion: false })` on the mounted showcase's static dialog, one for Escape and one for a backdrop click. A `MutationObserver` instance attached before the input records every mutation record it observes until the predicate holds. Each case prints the record list for the report and asserts the addition and the removal of `modal-static` on the host.
  - A further case drives the static-dialog Escape and backdrop rows through the `guardShowcaseScenarios` function (`:3584`). The predicate holds when the act returns.
  - A queued `setup:browser` file run passes.
  - A queued `src:browser` run of `Modal.test.ts` fails on no title outside `host-bound.md`.
  - A queued full journey run compares Equal against U3's pair, and the modal motion=false table passes.
- **Must not change:** `readShowcaseWindow`, `REFUSAL_ATTRIBUTES`, the filter at `:3519-3529`, the order inside `observeShowcaseStability`, or `src/browser/Modal.ts`. It must add no branch on motion.

### U5 End each scrollspy press on its signal

- **Role and engine:** executor, `astra`.
- **Owned files:** `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`.
- **Depends on:** U4.
- **Change:**
  - Replace the `waitForComponentScroll` function (`:5609-5623`) with an exported `pressScrollKey` function. It reads the key's direction:
    - down: `{ArrowDown}`, `{End}`, `{PageDown}`;
    - up: `{ArrowUp}`, `{Home}`, `{PageUp}`;
    - any other key: none.
  - The region can move up when `scrollTop > 0`, and down when `Math.ceil(scrollTop + clientHeight) < scrollHeight`.
  - When the key has a direction and the region can move that way:
    - If focus is outside the region, throw and name the focused element.
    - Otherwise await `Promise.all([waitForEvent(region, 'scrollend', …, COMPONENT_WAIT), pressKeys(key)])`.
  - When the key has a direction and the region cannot move, press the key and await `settleShowcaseScroll()`, because the outer page can scroll instead.
  - When the key has no direction, press the key.
  - On every path, end with the intersection wait. Attach an `IntersectionObserver` instance rooted at the region to the section that the navigation's first link names (lookup as at `:5657-5659`). Use a `createRecorder` handler, call `waitForCondition(…, () => recorder.count > 0, COMPONENT_WAIT)`, and disconnect in a `finally` block.
  - In the `scrollComponentTo` function, remove `attempt < 100`. Throw the `cannot reach` message (`:5640-5642`) before a press when the region cannot move in the key's direction, and after a press that leaves `scrollTop` unchanged.
  - Route the presses at `:5637`, `:5680`, and `:5710` through the helper. Delete the waits at `:5672`, `:5683`, and `:5711`.
- **Acceptance:**
  - A queued file case runs first. On a movable region at motion=true and at motion=false, ArrowDown fires `scrollend` on the region within the `COMPONENT_WAIT` budget in Chromium 141.0.7390.37. When the event does not fire, U5 stops and reports with the case's output.
  - File cases show the following:
    - The selection has updated when the intersection wait resolves.
    - A region at its bottom, with a destination that needs ArrowDown, throws `cannot reach` without arming a wait.
    - A boundary `{End}` at the bottom resolves through the page settle with focus inside the region.
    - Escape resolves with `scrollTop` unchanged.
  - A grep finds no `attempt < 100`, no `settled >= 8`, and no `waitForComponentScroll`.
  - A queued `setup:browser` file run passes.
  - A queued full journey run compares Equal against U3's pair, and both scrollspy tables pass at both motion values.
- **Must not change:** `SCROLLSPY_SCENARIOS`, `readScrollspySelection`, the boundary key choice (`:5680-5682`), the route restore (`:5686`), the act's checks (`:5712-5724`), the predicate of `settleShowcaseScroll`, or `src/browser/Scrollspy.ts`.

### U6 Statechart timing entries and per-row failure log

- **Role and engine:** executor, `astra`.
- **Owned files:** `tests/app/browser/integration.test.ts`, `tests/setupBrowser.ts`.
- **Depends on:** U5.
- **Change:**
  - In both statechart tests, record `performance.now()` at the start and at each `build` call.
  - In `finally`, emit `console.info('Statechart duration', JSON.stringify({ variant: VARIANT, family, motion, seconds, rows: [{ name, milliseconds }] }))`. Omit `motion` for header tables, matching the shape U1 parses (`durations.ts:75-92`).
  - In the observer callback of `executeShowcaseHarness` (`tests/setupBrowser.ts:3623-3626`), call `console.error('Statechart row failed', JSON.stringify({ row, cause }))` for each name in `harness.failures` that has not yet been logged.
- **Acceptance:**
  - A queued full journey run compares Equal against U3's pair. The duration entries carry `seconds` and `milliseconds`, so they are timing entries (`compare.ts:101-108`). No entry name starts with a `GATED` name (`compare.ts:29-49`).
  - Each statechart test leaves one duration entry.
  - U1 over that run prints the face header as two rows keyed by variant.
  - In a scratch run that is not landed, a planted failing row prints its line before the harness summary.
- **Must not change:** the `Header statechart` entry, any row, the `GATED` list, or any title.

### U7 Settle and popover probe (lands nothing)

- **Role and engine:** executor, `astra`, in a probe worktree that carries U3 to U6.
- **Owned files:** scratch copies of `tests/setupBrowser.ts`, `tests/app/browser/integration.test.ts`, and `tests/app/browser/Showcase.test.ts`.
- **Depends on:** U6 and U1b.
- **Change:**
  - In all three copies, shadow the imports of `waitForCondition`, `waitForAnimations`, and `waitForEvent` with local functions of the same signatures. Each local function records the elapsed milliseconds per wait description.
  - Print `console.info('Settle probe', JSON.stringify({ variant, family, motion, waits: [{ description, milliseconds }] }))` for each table and test.
  - For popover, time each await in `arrangePopoverVisibility` (`tests/setupBrowser.ts:4544-4554`), `actOnTipControl` (`:4468-4503`), `assertTipVisibility` (`:4428-4454`), and `observeShowcaseStability` (`:3478-3534`). Print `Popover probe` entries carrying `milliseconds`.
  - Run full journeys with `--kind journey` in the probe worktree, so that the `measure.jsonl` file and the artifacts exist. A probe needs no compare.
  - Repeat until the popover motion=true readings span at least the band ratio (1.1637), or until four runs are done.
  - Add two queued `--kind command` runs of `vitest run --config vite.config.ts --project app:browser tests/app/browser/Showcase.test.ts` with the JSON reporter. The header settle wait runs only there (`vite.config.ts:316-320`, `:410`). These runs carry no load reading, as R1's command-run form allows. It is unverified whether the browser console reaches `stdout.log` in a command run; the first such run verifies it, and U7 reports if it does not.
- **Acceptance:**
  - U1b over the probe runs, with `--timeouts` set to the probe tree's timeouts, names the slowest settle for each wait description. It names the run folder, the `seconds` value from `end.json`, and `outside.seconds`.
  - The report names the popover steps that account for the motion=true excess, run by run, and states whether the probe runs reproduced the 2.75 range.
  - For every title that U1b holds over the six eligible runs, the report names the waits that account for its excess, or reports that none was found.
  - When the cause is a test wait, the Orchestrator opens a test unit. When the cause is engine code, stage B gets a row with its `file:line`.
- **Must not change:** anything in a landing tree.

### U8 Derive `COMPONENT_WAIT` and budget every animation settle

- **Role and engine:** executor, `astra`.
- **Owned files:** `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `tests/app/browser/integration.test.ts`, `tests/app/browser/Showcase.test.ts`.
- **Depends on:** U7.
- **Change:**
  - Set the `COMPONENT_WAIT` budget by R3 from U7's `Settle probe` readings. Replace the comment at `:3199` with the runs, the slowest reading, and the margin.
  - Pass `COMPONENT_WAIT` to each `waitForAnimations` call:
    - `tests/setupBrowser.ts` `:1594`, `:1949`, `:1971`, `:3905`, `:4058`, `:4163`, `:4445`, `:4623`, `:4671`, `:4799`, `:4828`, `:4838`, `:4896`, `:5078`, `:5180`, `:5353`;
    - `tests/app/browser/integration.test.ts` `:837` and `:1001`.
  - Replace the literal budget at `tests/setupBrowser.ts:3422` with `COMPONENT_WAIT`.
  - Keep the predicate at `Showcase.test.ts:416-420`, which requires every header button to have no running animation, and pass `COMPONENT_WAIT` as the third argument of its `waitForCondition` call.
  - The control at `tests/setupBrowser.test.ts:501-519` is a `waitForCondition` control and stays. Its animation lasts 1,100 ms (`:504`) and must last longer than the 1,000 ms default and less than the derived budget. If the budget is 1,100 ms or less, set the duration inside that interval and comment both bounds.
  - No budgeted `waitForAnimations` control exists, because no call appears in `tests/setupBrowser.test.ts`. Add one that animates for a duration in the same interval and awaits `waitForAnimations(root, COMPONENT_WAIT)`.
- **Acceptance:**
  - When the derived budget is 1,000 ms or less, U8 stops and reports.
  - A grep of the four files finds no single-argument `waitForAnimations(` call.
  - Queued `setup:browser` and `app:browser` file runs pass.
  - A queued full journey run compares Equal against U3's pair.
  - U1b, with `--timeouts` naming the value the expression at `integration.test.ts:2112` yields for each table and 120_000 for each header family (`:2052`), shows the budget below every slack.
- **Must not change:** the library default, any predicate, `readShowcaseWindow`, any test timeout, or the oracle frame budget at `tests/setupBrowser.ts:6224`.

### U9 Measured test timeouts

- **Role and engine:** executor, `astra`.
- **Owned files:** `tests/setupBrowser.ts`, `tests/app/browser/integration.test.ts`, `tests/integration.test.ts`.
- **Depends on:** U8, U1b, and the Orchestrator's ruling on U7's diagnosis for the popover table and each other held title.
- **Change:**
  - Take queued full journey runs on the U8 tree until at least two pass every title. Run U1b over them and U8's acceptance run, with `--ceiling` set to the `COMPONENT_WAIT` budget.
  - Add the `COMPONENT_TABLE_BUDGETS` map, keyed by family and motion, holding each unheld table's R4 timeout with an R7 comment.
  - Register each table through `it.each([row])` under the unchanged title template. The timeout is the map entry, or the expression at `:2112` for a table the map lacks.
  - Add a `HEADER_TABLE_BUDGETS` map keyed by family, built the same way. The subjective lane did not rule this name; it follows the ruled map's form. Unheld header families take their R4 timeout from U6 entries, pooling both face variants at their slowest. A family the map lacks keeps 120_000.
  - Re-derive the 300_000 at `:1707` from the preservation case's own durations on the U8 tree.
  - Give `tests/integration.test.ts:678` an explicit timeout by R4. Take it from two queued `--kind command` runs of `vitest run --config vite.config.ts --project integration` with the JSON reporter. Use the case's own ratio against the band ratio, no inner ceiling, and no R5 test.
  - A held title lands its figure only after the Orchestrator's ruling, and the popover table is one of them.
- **Acceptance:**
  - Every journey title is byte-identical to its title in `runs/jb2b-1/report.json`.
  - The witness title is byte-identical to its title in the integration command runs.
  - A queued full journey run compares Equal against U3's pair, with no `Host-bound title absent` line.
  - U1b reproduces each figure and lists each held title, and neither map has an entry for a held title.
  - The integration project passes through the queue.
- **Must not change:** scenario lists or their order, the harness, inner budgets, or `compare.ts`.

## Records to amend

The following records conflict with the tree or the runs:

- **`/home/user/scaffold/.orkestrel/veneer/lanes.md:89`, the B4 entry.** "read once in six full runs" is wrong: at 390 px, 15 of 18 tooltip rows across nine runs read 10766, and the J-B2 pair is split. "the reader must wait for the prior state's panel to leave the document" is also wrong: teardown removes the preceding journey's panels (ruling 3). The Orchestrator records this correction separately.
- **Brief reading 7, the tip.** The tip exposes a `panel` getter and emits `hidden.bs.tooltip` and `hidden.bs.popover` events. It does not offer only a `phase` getter.
- **Brief reading 7, `buildJourney`.** The `buildJourney` function mounts a fresh showcase. The comment at `tests/setupBrowser.ts:3663` belongs to the `buildComponent` function.
- **Brief § Objective, the landing gate.** U3's two runs replace the J-B2 pair as the baseline for every later compare.
- **Compare invocation.** Every compare must pass `--host-bound` and `--out` (`compare.ts:1`, `:26-27`).
- **Launch form.** Every run folder path and `--outputFile` path is absolute under `/home/user/veneer/tmp/units/journey-cost/runs/`, whatever the checkout (`run.ts:278`, `:293-306`).
- **Brief reading 3 and the comment at `tests/setupBrowser.ts:3199`.** The 774.5 ms figure is a scroll settle from the j0c2 diagnostics, which passed 66 tests over the four variants (`/home/user/veneer/tmp/codex/j0c4-history.md:26`). It is not a settle of a wait this budget bounds.
- **Brief reading 4.** Record the `completion-b3-journey-after-3b` load beside the failure: 116.28 outside CPU seconds with a peak of 3.21 (`measure.jsonl:5482`). The scrollspy failure (reading 5) occurred in the same run.
- **Brief reading 8.** The band is 531.623 to 618.627 s over the six eligible runs, a ratio of 1.1637. `completion-b3-journey-before` (494.0 s) ran commit `ec37454` and leaves the band. Record each run's `outside.seconds` reading beside its wall time. "No other lock holder" rests on the writer's report, because `measure.jsonl` measures visible process CPU, not lock ownership (`measure.ts:194-202`).
- **Brief readings 1 to 3, lane M.** The lane M folders are `jb0-1` and `jb0-2`, from the `/home/user/.wave/journey-cost/M` checkout (`runs/jb0-2/start.json:13`). `jb0-2` exited 1 after 1061.414 s. They are ineligible because of their checkout.
- **Brief reading 5.** The `scrollspy-ab-*` folders exist, and their figures stand. The 56.1 to 56.7 s values are the scrollspy assertion's durations (56166.0, 56736.8, 56459.6, and 56112.7 ms), and the walls are 68.0 to 73.5 s.

## Open

The following items need stage B:

- **Stage B: tip parity.** Rule whether the `phase` getter reading `hidden` while the panel stays connected (`Tip.ts:318-322`) is a parity defect. No unit here depends on it.
- **Stage B: popover cost.** Take a row only if U7 traces the popover motion=true excess into engine code, such as the placement setup at `Tip.ts:210-216`.

No item needs the user.

## Check

The Astra check upheld ruling 2 (with the correction that the predicate covers both static-dialog refusals), ruling 3 (teardown, the direct-child scope, and the 15 of 18 split), and ruling 4 (the popover readings and title preservation). This verdict keeps all three. The check refuted the following, and the verdict answers each:

- **Ruling 5's peak range.** It is 1.20 to 1.51. The offcanvas claim drops to what the report shows.
- **Ruling 6.**
  - The polling arithmetic becomes about 80 ms plus scheduling, with no upper bound.
  - The two-case diagnosis gives way to an undetermined cause.
  - The two-frame contract is withdrawn in favor of a temporary `IntersectionObserver` wait.
  - Boundary keys and keys with no scroll direction are separated.
  - The Chromium `scrollend` behavior is gated by U5's first file case.
  - The activation claim is corrected to `#processed`.
- **Rule R.** R1 names the eligible commits and runs, requires the three artifacts, and gives integration titles a command-run form. R2 computes the band ratio on one tree, giving 1.1637. R3 takes its readings from U7's `Settle probe` entries and U6's rows through U1b, with timeouts as an input. R5 takes the U1 instrument's operational test. R6 names its mapping. `jb0-2` is excluded by checkout.
- **Units.**
  - U2 gets a bounded stop and probes the earlier steps.
  - U3 compares against `completion-b4-journey`.
  - U4 covers both refusals and records observed mutations.
  - U7 uses `--kind journey` and shadows three files.
  - U8 keeps the Showcase predicate under `waitForCondition` and adds a `waitForAnimations` control.
  - U9 scopes byte identity to journey titles and sizes the witness from command runs.
  - The launch form uses absolute paths.
- **Records.** The 774.5 ms correction is reworded to the j0c2 scroll settle. The `scrollspy-ab-*` figures stand as assertion durations.
- **Other refuted claims.**
  - The motion=true modal mechanism is stated as unestablished.
  - The act is no longer the only stray source.
  - A timeout is described as failing any slow case, with logging preserving only causes announced before it.
