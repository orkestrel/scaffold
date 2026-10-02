## 1. Waits on one replayed step and one live call

A replayed step is `follow` then, when the run store is present, a viewport PNG. The step timer in `run.json` is `BrowserAction.elapsed`, which starts at `perform` and stops before the PNG. A live `click` or `press` is that same `perform` without the PNG. Nothing on these paths sleeps a fixed quiet period after the last mutation. `BROWSER_TOOL_TIMEOUT_MS` (5 000) and `BROWSER_TOOL_CAPTURE_MS` (1 000) are deadline caps. `BROWSER_DEFAULT_TIMEOUT_MS` (30 000) is the CDP cap when a call passes no timeout.

**Replayed click** (`b2-disclosures` s1, action timer 2 051 ms). Order:

1. Target resolution, before the timer. `follow` calls `elements.find` (`src/core/BrowserToolset.ts:463`). `find` waits in `#ready` only until this document's DOMContentLoaded is already recorded (`src/core/BrowserPage.ts:1084`), then `Accessibility.enable` and `Accessibility.getFullAXTree`, plus `DOM.describeNode` for each iframe (`src/core/elements/BrowserElementManager.ts:114`, `:303`). No mutation settle.
2. Submit observer. `Runtime.evaluate` installs it on the target frame (`src/core/BrowserToolset.ts:770`, `:1533`).
3. Trusted click. `DOM.scrollIntoViewIfNeeded`, then the actionability function waits `BROWSER_STABLE_FRAME_COUNT` animation frames (2), and restarts that count if the box moves (`src/core/constants.ts:153`, `src/core/compilers.ts:640`, `src/core/elements/BrowserPageElement.ts:370`). Then layout metrics, `DOM.getNodeForLocation`, `mousePressed`, `mouseReleased`. No key delay.
4. Settlement. The navigation record's `wait` is raced against the click and not awaited if the click wins (`src/core/BrowserToolset.ts:1295`). `record.settle` returns in the same turn when no destination is known and no navigation has started (`src/core/BrowserNavigationRecord.ts:141`). Popup `settle` returns in the same turn when `opened === 0` (`src/core/BrowserPage.ts:1527`). One more `evaluate` reads the submit observer, bounded by the receipt deadline, not slept (`src/core/BrowserToolset.ts:1558`).
5. Receipt outline. `#capture` calls `elements.outline`: `#ready`, the full accessibility tree, `document.title`, then `renderBrowserOutline` (`src/core/BrowserToolset.ts:1368`, `:1737`, `src/core/elements/BrowserElementManager.ts:82`, `src/core/helpers.ts:158`). The outline's CDP timeout is 5 000 (`src/core/BrowserToolset.ts:1734`). For every `StaticText` node the renderer scans the whole node array for the parent (`src/core/helpers.ts:175`).
6. Observer removal. One `evaluate`, CDP timeout 1 000, awaited only until it returns or the receipt deadline (`src/core/BrowserToolset.ts:1648`).
7. After the timer. `view.screenshot()` with no options: `Page.captureScreenshot` of the viewport. The animation-freeze script is not installed (`src/core/BrowserReplay.ts:344`, `src/core/BrowserPage.ts:650`, `src/core/compilers.ts:287`). The bytes go to `sN.png`.

**Replayed press** (s2 Tab, 1 993 ms) is the same from step 2, with these differences. There is no `find`. The observer is installed on every frame `page.frames()` returns (`src/core/BrowserToolset.ts:937`). `keyboard.press` sends keyDown and keyUp and sleeps only when `options.delay > 0`; the tool passes no delay (`src/core/BrowserKeyboard.ts:73`). Popup settlement runs only for Enter (`src/core/BrowserToolset.ts:940`). There is no stable-frame loop. The receipt outline and the PNG still run.

**Live `click` and `press`** are steps 2–6 only. The model already holds `ref`, so there is no `find` and no PNG. The outline string is what the tool returns, then `boundBrowserText` keeps 4 000 characters (`src/core/constants.ts:384`, `src/core/helpers.ts:351`).

**Live `look`** is only the outline in step 5 (`src/core/BrowserToolset.ts:689`).

**Live `wait`** sets its deadline from the `timeout` argument in seconds, default 5 000, cap 30 000 (`src/core/BrowserToolset.ts:1030`, `src/core/constants.ts:395`, `:463`). `page.wait` reads readiness, then runs `compileTextWaitExpression`: the text is checked immediately and again on the animation frame after a mutation, and `setTimeout` is only the deadline (`src/core/BrowserPage.ts:435`, `src/core/compilers.ts:54`, `:66`). No outline and no screenshot.

After all replayed steps, the run write is raced against a 1 000 ms abort (`src/core/BrowserReplay.ts:352`), and the replay tool calls `look` once for the final view (`src/core/BrowserJourneyToolset.ts:432`, `:558`).

## 2. What a step pays even when the page did not change

The receipt outline is paid on every `click`, `press`, and `look`, including a Tab that only moves focus. It is the view half of the receipt a live model reads (`guides/browser.md:392` area, `renderBrowserReceipt`; the cut footer is `BROWSER_TOOL_VIEW_FOOTER`, `src/core/constants.ts:445`). On this page the tool then discards everything past 4 000 characters. The transcript's receipts are `characters 0–4000 of 62351` through `62471` (`/home/user/.wave/veneer-wt-sc/tmp/codex/b2/index.txt:5`). A live step needs that prefix and the reference binding, because later clicks use `e513` and above. It does not need the static-text tail, and it does not need the parent scan that builds the tail. A replayed step does not need the outline at all: `perform` stores only the line before the blank line (`src/core/BrowserToolset.ts:652`), `follow` drops the tool body (`src/core/BrowserToolset.ts:469`), and `renderBrowserRun` appends one view after the run (`src/core/helpers.ts:2774`, `guides/browser.md:3013`). The per-step outline is a capture the replay caller never reads.

The PNG is paid on every executed replay step, waits included (`src/core/BrowserReplay.ts:108`, `guides/browser.md:3048` and the `sN.png` row at `guides/browser.md:3048`). It is the run-folder capture. The page-placement contract and `tests/src/core/BrowserReplay.test.ts:959` require one file per step. The model that called `replay` does not read the bytes.

The submit-observer install, read, and removal run on every click and every press, including Tab, Shift+Tab, and Escape. They serve the documented submission settlement (`guides/browser.md:3122`). They are not a fixed sleep.

The two stable frames run only on a click, and only while the target's box is still moving. The succeeded `wait` steps show the text check is not a fixed span: s5 is 5.64 ms against a 2 s bound (`/home/user/.wave/veneer-wt-sc/tmp/browsers/b2/b2-disclosures/runs/2026-10-02T20-55-19.498Z-e9cd/run.json`).

## 3. Where the 2 s goes

`b2-disclosures` is 83 171 ms for 42 steps, 1 980 ms per step (`/home/user/.wave/veneer-wt-sc/tmp/codex/b2/runs.json:137`). The 42 step timers sum to about 74.9 s. The other about 8.3 s (about 197 ms per step) is everything outside `perform`: six target-resolution accessibility walks, 42 PNGs, and the run write.

Inside the timer, the seven `wait` steps are 5.6–8.7 ms (sum about 49 ms). The six clicks are 1 839–2 377 ms (mean about 2.07 s). The 29 presses are 1 507–2 644 ms (mean about 2.15 s). Clicks and presses match, and the click-only work (stable frames, hit-testing, and `find`, which is outside the timer) is not the 2 s. `wait` skips the outline and is about 7 ms, so the outline is the action timer. Navigation settle, popup settle, and the text wait did not spend their bounds on these steps.

The same shape is in the other two runs: `b2-contents` 26 174 ms for 9 clicks, each step 1.87–2.49 s (`/home/user/.wave/veneer-wt-sc/tmp/browsers/b2/b2-contents/runs/2026-10-02T20-49-58.817Z-b13b/run.json`); `b2-dialog-panel` 19 779 ms for 10 steps, with waits at 12.9 ms and 8.4 ms and the clicks and presses at 1.6–2.7 s; `b2-scrollspy` 21 612 ms for 9 steps (`runs.json:495`).

The six `find` walks plus 42 PNGs plus the write fit in 8.3 s, so an accessibility walk that does not call `renderBrowserOutline` is well under 2 s. The receipt does call it, and that render is the work `find` does not do. The dominant cost is building the full outline string, in particular the per-`StaticText` scan of the whole node array, on every click and press. The PNG is the next cost, about a fifth of a second if the residual is spread across the 42 steps. The client gave up at 60 s while this run continued (`index.txt:669`); that cap is not in this package.

## Proposals

**1. Do not outline inside `follow`.** `src/core/BrowserToolset.ts` `#settle` / `#capture`, reached from `follow` (`:453`). Keep the action line, the navigation and popup settlement, the submit observer, the final `look` in `BrowserJourneyToolset.#view`, and every `sN.png`. The stored step result and the replay render already omit the per-step view (`guides/browser.md:3016`). Saving: the measured ~2.1 s on each replayed click and press. On this 42-step run that is 35 of the 42 steps, about 74 s, which is what pushed the run past 60 s.

**2. Stop the outline render once it has passed the tool limit, and index parents once.** `src/core/helpers.ts:175`, called from `BrowserElementManager.outline` for every live `click`, `press`, and `look`. `boundBrowserText` already returns the first 4 000 characters (`src/core/helpers.ts:351`). Emit the same prefix, then stop appending `StaticText` and headings; keep walking so references past the 150-element action cap (`src/core/constants.ts:305`) still bind. An unlimited `outline()` for non-tool callers stays intact if the budget is an argument the toolset passes. Saving: the render portion of the same ~2.1 s on every live `click`, `press`, and `look`. The run files do not split CDP from render; the 8.3 s residual is the upper bound on how small the non-render part can be, and the parent scan is the only large step `find` does not share.

The PNG stays. The guide and `tests/src/core/BrowserReplay.test.ts:959` require one capture per step, and it is not the 2 s.

## Unresolved

The run files have no span inside the ~2.1 s action, so the split between `getFullAXTree`, the parent scan, and the three observer evaluates is inferred. Live `click`, `press`, `look`, and `wait` have no timings in `runs.json`. The node count of this page's accessibility tree is not in the artifacts, only the rendered character counts in `index.txt`. The 60 s limit that aborted the client's `replay` call is not in this repository.