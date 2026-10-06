# Unit task75-U5 — end each scrollspy press on its signal

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI. You are the sole writer in the checkout `/home/user/.wave/veneer-containment` (a detached veneer worktree at `8e4f38c`, which carries units U3 and U4; `node_modules` installed, `dist` built). Owned files: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`. Commit nothing; the Orchestrator lands.

## Objective

Make each scrollspy key press in the showcase statechart end on a signal instead of a poll count and a press cap. Today `waitForComponentScroll` (`tests/setupBrowser.ts`, near `scrollComponentTo`) ends a press when `scrollTop` stays unchanged for 8 consecutive polls at the 10 ms default interval (about 80 ms plus scheduling, with no upper bound on when the scroll starts), and `scrollComponentTo` caps the loop at 100 presses and throws `cannot reach` when the scroll did not move; the scrollspy table at 390 px with motion=false failed once that way (`completion-b3-journey-after-3b`, under 116.28 outside CPU seconds). A press must end on the region's `scrollend` event, then on one intersection notification, so the engine's observer has run before the selection is read; the loop terminates by geometry.

Governing verdict: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/design-verdict.md` § Rulings 6 and § Units U5 (read both first; line numbers there were read at veneer `90b96bb`; re-locate every target by its text in `/home/user/.wave/veneer-containment`).

## Context

- `waitForEvent` (`@orkestrel/test`, core) subscribes before its first suspension, so `Promise.all([waitForEvent(region, 'scrollend', …, COMPONENT_WAIT), pressKeys(key)])` arms the wait before the press. `createRecorder` and `waitForCondition` come from the same package; `COMPONENT_WAIT` is the per-condition budget; `settleShowcaseScroll` settles the outer page.
- The HTML update-the-rendering steps run the scroll steps, then animation frame callbacks, then the intersection computations, which queue one notification task per document for every pending observer; a temporary `IntersectionObserver` registered after the engine's own observer is notified in the same task, after it. A frame count is not a contract (the Astra check withdrew the two-frame rule).
- The engine's `activate.bs.scrollspy` event fires when the active link changes (`src/browser/Scrollspy.ts`, the `#processed` check), so it cannot end every press; it stays the act's check.
- A boundary `{Home}` or `{End}` at the region's edge scrolls the outer page while focus stays inside the region (the existing comment near the boundary key choice); a key with no scroll direction (Escape) scrolls nothing.
- Whether Chromium 141.0.7390.37 fires `scrollend` on an element scroller for a keyboard-driven scroll is unverified: the first file case verifies it, and the unit stops and reports if it does not fire.
- Host rule: every Chromium command runs through `flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u5-NAME --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`, a fresh NAME per run; a file or filtered run takes `--kind command`; a full journey takes `--kind journey` with `CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u5-NAME/report.json`; never `cd`; no bash, PowerShell, or Python scripts; one re-run for a Vite optimizer import failure before any test body; the journey host-bound set is empty.

## Scope

- **Change.**
  1. Replace `waitForComponentScroll` with an exported `pressScrollKey(region: HTMLElement, key: string, navigation …)` function (settle the exact signature yourself and record it). It reads the key's direction: down for `{ArrowDown}`, `{End}`, `{PageDown}`; up for `{ArrowUp}`, `{Home}`, `{PageUp}`; none otherwise. The region can move up when `scrollTop > 0` and down when `Math.ceil(scrollTop + clientHeight) < scrollHeight`.
     - Direction and movable: if `document.activeElement` is outside the region, throw and name the focused element; else `await Promise.all([waitForEvent(region, 'scrollend', …, COMPONENT_WAIT), pressKeys(key)])`.
     - Direction and not movable: press the key, then `await settleShowcaseScroll()` (the outer page can scroll).
     - No direction: press the key.
     - Every path ends with the intersection wait: an `IntersectionObserver` rooted at the region, observing the section the navigation's first link names (the lookup `scrollComponentTo` already uses), with a `createRecorder` handler; `waitForCondition(…, () => recorder.count > 0, COMPONENT_WAIT)`; disconnect in `finally`.
  2. In `scrollComponentTo`: remove the `attempt < 100` cap; throw the `cannot reach` message before a press when the region cannot move in the key's direction, and after a press that leaves `scrollTop` unchanged.
  3. Route the three press sites (`scrollComponentTo`'s loop, `arrangeScrollspySelection`, `actOnScrollspyControl`) through `pressScrollKey`; delete the three standalone scroll waits that followed them.
- **Off-limits (must not change).** `SCROLLSPY_SCENARIOS`, `readScrollspySelection`, the boundary key choice, the route restore, the act's checks, the predicate of `settleShowcaseScroll`, every file under `src/`, any row or Journal entry, `compare.ts`.

## Acceptance criteria

1. The first queued file case (a `setup:browser` filtered run): on a movable scrollspy region at motion=true and at motion=false, an ArrowDown press fires `scrollend` on the region within `COMPONENT_WAIT` in Chromium 141.0.7390.37. If it does not fire, stop and report with the case's output; write nothing else.
2. Further file cases: the selection has updated when the intersection wait resolves; a region at its bottom with a destination needing ArrowDown throws `cannot reach` without arming a wait; a boundary `{End}` at the bottom resolves through the page settle with focus inside the region; Escape resolves with `scrollTop` unchanged.
3. Format and lint on both owned files exit 0; `tsc --noEmit --project tsconfig.json` through the queue exits 0; a grep finds no `attempt < 100`, no `settled >= 8`, and no `waitForComponentScroll`.
4. A queued `setup:browser` file run of `setupBrowser.test.ts` passes.
5. A queued full journey run passes 94 of 94; the Orchestrator compares it against U3's baseline pair (expected: exit 0); both scrollspy tables pass at both motion values.
6. `git status --porcelain` lists only the two owned files.

## Output

Final message: the diff; `git status --porcelain`; each gate's command, folder, exit, and bare result line; the `scrollend` case's output; every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
