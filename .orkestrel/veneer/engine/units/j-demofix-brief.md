# Unit J-DEMOFIX — the Engine region moves to the end of the showcase

## Role and engine

The Orchestrator (Opus 5.5) wrote this unit directly in the worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/demofix` (branch `unit/demofix`, cut from Veneer `main` `1ee0faf`), because it is a two-line reorder with its proof already measured. The audit is `checker` on Sonnet, an engine the Orchestrator does not share.

## Objective

The `setup:browser` project reads green on Veneer `main` again. The styles session reported it red on `e42b5fa` (its `plan.md` § Intersession state, 18:50 UTC), and the Orchestrator reproduced it on `1ee0faf` on Chromium 153: `tests/setupBrowser.test.ts` fails "preserves the pressed-state failure on its own when the pointer release succeeds" (the cover's hit test reads `undefined`, because the Toggle host sits at `top: 1603px`, below the viewport) and "names the focused control rather than the page when focus rests somewhere else" (the Tab traversal never reaches "Dark mode"). J-DEMO put the Engine region first in the page, which moved every later region down and changed the focus order those cases read. J-DEMO's landing chain did not run `test:setup:browser`, so the red landed.

## The change

- `app/browser/Showcase.ts`: the `EngineSection` constructor call moves from the head of the section list to its end, after `ColorModeSection`.
- `tests/app/browser/Showcase.test.ts`: the region-order and specimen-order assertions move `'Engine'` and `...ENGINE_SPECIMENS` to the end to match.

## Acceptance

1. `npx vitest run --config vite.config.ts --project setup:browser` reads 2 failed of 83 on `main` `1ee0faf` (`j-demofix-red-setup-browser.log.txt`) and 83 passed with the change (`j-demofix-green-setup-browser.log.txt`).
2. `test:app` 222 passed and `test:journey` 248 passed with the change (`j-demofix-green-journey.log.txt`).
3. The landing chain's static gates (`format:check`, `lint:check`, `check`, `test:policy`, `build:app`) exit 0.
4. The diff touches only the two files named.

## Carried

- The landing chain for any unit that changes `app/**` or `tests/setup*` adds `test:setup:browser`, `test:app`, and `test:journey` (the J-DEMO gap).
- The styles session's third red, "drives dark and light variants" (`applyTheme` finds "Dark mode" ambiguous across 2 elements), reproduces only on its Chromium 141 host; it is read again after J-SANITIZER lands the fallback for a platform without `setHTML`.
