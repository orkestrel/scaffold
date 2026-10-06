# Unit task75-U7c — dismiss the other popover before arranging a popover specimen

## Role and engine

`astra` implementation unit on `gpt-6-astra` (effort high) through the Codex CLI. You are the sole writer in the checkout `/home/user/.wave/veneer-containment` (a detached veneer worktree at `6a976a0`, which carries units U3 to U6; `node_modules` installed, `dist` built). Owned files: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`. Commit nothing; the Orchestrator lands.

## Objective

Remove the cause of the popover table's spread. The `showcase statecharts > drives the 'popover' table through its controls with motion=true` case read 60.2 to 230.3 s across the day's full runs (ratio up to 3.8; held by rule R5) while motion=false read 10.8 to 13.3 s. Unit U7a timed every wait and found the spread inside the clicks on the `Billing status` trigger (1 to 66 s each), not in any settle wait or engine code. The Orchestrator's hit-test probe (`runs/task75-u7c-hit-probe`, 2026-10-06) read the element under that trigger's center at click time: in every slow click it is `div.popover-body` of another popover, the previous specimen's right-placed panel (left 674 to 950, top 372 to 484 at 1280 px) covering the `Billing status` trigger (left 674 to 803, top 409 to 447). Playwright's click refuses an obstructed target and retries, each retry re-scrolling the trigger (`scrollTop` moving 100 to 300 px per click) under Bootstrap's `scroll-behavior: smooth` (`src/bootstrap/_reset.scss:14`, motion=true only), until the obstruction clears; under reduced motion the retries resolve in about a second. The statechart arranges the next popover specimen without closing the previous specimen's popover, so a real user would meet the same obstruction. The arrangement must dismiss any other open popover first.

Governing verdict: `/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/showcase/timing-2026-10-06/design-verdict.md` § Rulings 4 and § Units U7 (the probe findings supersede the verdict's "stage B only if engine code" branch: the cause is the arrangement). The probe logs: `/home/user/veneer/tmp/units/fleet-pins/u7b-click-probe.txt` and `u7c-hit-probe.txt`; the U7a report `/home/user/scaffold/tmp/codex/task75-u7a-last.md`.

## Context

- `arrangePopoverVisibility(context, state)` in `tests/setupBrowser.ts` clicks the specimen's own trigger through `clickAccessibleWithin(context.region, 'button', context.control)` when focus is elsewhere, then again when the visibility differs from `state`; `POPOVER_SCENARIOS` lists the rows; `readTipVisibility(context)` reads the trigger's described state; `assertTipVisibility(context, state)` waits for the phase and the described state and then the animations.
- A shown popover panel is a direct child of `body` carrying `CLASS_NAMES.bootstrap.components.popover.base` and `show`, bound to its trigger through the trigger's `aria-describedby`; `readStrayTipPanels(panel)` (unit U3) returns the direct children of `body` with a tip base class other than a given panel. Pressing `{Escape}` while a popover trigger has focus hides that popover (the `escape` row of the table); clicking a trigger toggles its popover.
- The dismissal must go through the interface (a keystroke or a click a user could make), never through the engine API, and must wait for the dismissed popover's panel to leave the document (U3's wait, `COMPONENT_WAIT`), so the next click meets no obstruction.
- Host rule: every Chromium command runs through `flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/task75-u7c-NAME --kind KIND --cwd /home/user/.wave/veneer-containment -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH COMMAND`, a fresh NAME per run; a file or filtered run takes `--kind command` with an absolute `--outputFile` when it reports JSON; a full journey takes `--kind journey` with `CAPTURE=0 ./node_modules/.bin/vitest run --config configs/app/vite.journey.config.ts --configLoader runner --no-cache --reporter=dot --reporter=json --outputFile=/home/user/veneer/tmp/units/journey-cost/runs/task75-u7c-NAME/report.json`; never `cd`; no bash, PowerShell, or Python scripts; one re-run for a Vite optimizer import failure before any test body; the journey host-bound set is empty.

## Scope

- **Change.**
  1. Before `arrangePopoverVisibility` clicks the specimen's trigger, dismiss every shown popover whose panel is not this specimen's: for each such panel, find its trigger (the element whose `aria-describedby` names the panel), click that trigger through `clickAccessibleWithin` with its region and accessible name (or focus it and press `{Escape}`; settle one way and record it), then wait under `COMPONENT_WAIT` until no popover panel other than this specimen's remains (`readStrayTipPanels` scoped to the popover base class). Export the helper (name it `dismissOtherPopovers` unless the code's vocabulary says otherwise, and record the name).
  2. Keep every row of `POPOVER_SCENARIOS` and its order; change no title.
- **Off-limits (must not change).** `POPOVER_SCENARIOS`, `actOnTipControl`, `assertTipVisibility`, the engine (`src/`), any row or Journal entry, any title, `compare.ts`.

## Acceptance criteria

1. Format and lint on both owned files exit 0; `tsc --noEmit --project tsconfig.json` through the queue exits 0.
2. A proof case in `tests/setupBrowser.test.ts` (queued `setup:browser` file run) opens one popover, arranges a second specimen's popover through `arrangePopoverVisibility`, and reads the first popover's panel gone before the second trigger is clicked (observe with a `MutationObserver` or by reading `readStrayTipPanels` inside the sequence) and `document.elementFromPoint` at the second trigger's center returning the trigger itself.
3. A queued filtered run of the popover table in the `journey:light-1280` project (`-t "drives the 'popover' table"`, `--kind command`) passes both motion values, and the motion=true table reads under 30 s (report the two durations from the JSON report); then a queued full journey passes 94 of 94 and the Orchestrator compares it against the U3 baseline pair (expected: exit 0, no row changes).
4. `git status --porcelain` lists only the two owned files.

## Output

Final message: the diff; `git status --porcelain`; each gate's command, folder, exit, and bare result line; the two popover table durations before (from `runs/task75-u5-journey-1/report.json`: 132,150 ms at motion=true) and after; every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
