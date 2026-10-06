# Unit stage-b-P0 — the anchor-visibility probe (read-only)

## Role and engine

`astra` probe unit on `gpt-6-astra` (effort high) through the Codex CLI. You are the sole writer in the checkout `/home/user/.wave/veneer-p0` (a detached veneer worktree at `ab7a8e7`; `node_modules` copied from the main checkout; `dist` built). You may create probe files under `tests/src/browser/` named `anchor-visibility.probe.test.ts` (one file; helpers inline) and you must delete them before reporting: `git status --porcelain` is empty at the end. Commit nothing. Edit nothing under `src/`, nothing in any other test, nothing under `/home/user/veneer`.

## Objective

Measure the anchor-visibility seam the stage B verdict names as a stage A risk (`/home/user/.wave/scaffold-main-wt/.orkestrel/veneer/browser-stage-b-verdict.md`, ruling 7 "The other DOM APIs" near line 815 to 835, and the W5 table row `P0 anchor-visibility` near line 1117): after its anchor scrolls out of a scroller, the engine's body tooltip stopped being hit-testable while Bootstrap's stayed hit-testable, and `position-visibility: always` did not restore it; for a dropdown kept inside the scroller both menus were clipped, and `always` made the engine's menu hit-testable while Bootstrap's stayed clipped (`stage-b/browser-feasibility-report.md`, the check's anchor-visibility finding). Output the measured seam and an acceptance control for a stage A repair, or "no repair". No `always` write lands anywhere; the probe may measure `always` and `no-overflow` as readings.

## Pointers to read first

- `src/browser/Placement.ts` (the anchor lifetime from line 47; the `anchor-name` reads at 58 to 70; the default anchor near line 211) and `src/browser/Tip.ts` (tooltip and popover hosts), `src/browser/Dropdown.ts`.
- `tests/src/browser/Placement.test.ts`, the `popper-visibility-attributes` case (around lines 908 to 961): the model for an engine-against-Bootstrap comparison inside the `src:browser` project, including how that project boots the engine and Bootstrap side by side.
- `tests/setupBrowser.ts` for the mount, boot, and wait helpers the `src:browser` project uses; `vite.config.ts` for the `src:browser` project.

## Method

For each engine in {veneer engine, Bootstrap 5.3.8} and each floater in {body tooltip (a tooltip whose container is `body`), dropdown menu}, under each anchor condition:

1. the anchor visible (the control);
2. the anchor inside an `overflow: auto` scroller, scrolled out of the scroller's box after the floater opened;
3. the anchor inside a transformed ancestor (`transform: translateZ(0)` or an equivalent containing-block-forming transform) with `overflow: hidden`, clipped.

Bootstrap's ordinary clipped case is the control. After opening (and scrolling where the condition says), wait two rendering frames (two chained `requestAnimationFrame` callbacks) before each hit test, then read: the floater's computed `position-visibility`; whether it carries `.show`; the hit at the floater's center (`document.elementFromPoint`: the floater or a descendant, or something else, named); the floater's bounding box against the viewport and against the clipping ancestor's box; the computed `background-color` of the element the hit returned. Then, as experimental readings on a copy of the same arrangement, set `position-visibility: always` and then `no-overflow` as an inline style on the floater and read the same five values. Print one line per reading as `console.info('Anchor visibility', JSON.stringify({ chromium, engine, floater, condition, experiment, visibility, show, hit, box, color }))`.

Run the probe file through the host queue twice: under the host's Chromium 141 (the default resolution), and under Chromium 153 with `PLAYWRIGHT_EXECUTABLE_PATH` set to the chrome binary under `/home/user/.wave/pw-153/chromium-1243` (find it with `find /home/user/.wave/pw-153/chromium-1243 -name chrome -type f`; `configs/browsers.ts` honors that variable first). Queue form, a fresh folder per run:

`flock -w 7200 /home/user/.wave/journey.lock node /home/user/veneer/tmp/units/journey-cost/run.ts --folder /home/user/veneer/tmp/units/journey-cost/runs/stage-b-p0-NAME --kind command --cwd /home/user/.wave/veneer-p0 -- env PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH [PLAYWRIGHT_EXECUTABLE_PATH=…] /home/user/.wave/veneer-p0/node_modules/.bin/vitest run --config /home/user/.wave/veneer-p0/vite.config.ts --configLoader runner --no-cache --reporter=dot --project src:browser /home/user/.wave/veneer-p0/tests/src/browser/anchor-visibility.probe.test.ts`

Collect the readings from each folder's `stdout.log`. Never `cd`; never run vitest outside the queue; a reused folder exits 65.

## Output

Final message: the seam table (rows: chromium × engine × floater × condition × experiment; columns: visibility, show, hit, box in or out of the clip, color), the diagnosis in one paragraph with pointers into `Placement.ts` or `Tip.ts` or `Dropdown.ts` for the difference between the engines, an acceptance control for a stage A repair (a case description with the expected readings, one that fails today and passes after the repair) or "no repair" with the reason, the exact commands with folders and exits, confirmation that the probe file is deleted and `git status --porcelain` is empty, and every deviation (expected, found, evidence, done or not, one hypothesis). No process diary.
