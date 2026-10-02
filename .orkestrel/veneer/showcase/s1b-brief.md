# Unit S1b: finish and tune the showcase component statecharts

## Role and engine

GPT-6 Astra implementation lane through `codex exec`, sandbox `danger-full-access` on the Linux cloud host. Perform the work yourself and spawn nothing.

## Objective

Finish the component statecharts that unit S1 started, and cut their cost so the whole journey gate stays near the speed unit J0b reached, without dropping a distinct transition or a refusal.

## Context

- **Checkout.** `/home/user/.wave/veneer-wt-sc`, branch `sc/statecharts` at `ba41d97`, clean, with its own `node_modules`. You are its only writer. Run `export PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm_config_prefer_online=true` before every `npm` or `node` command, and vite and vitest through `./node_modules/.bin/`. Run `npm run build` before any journey.
- **A second lane runs beside you** in `/home/user/veneer`. Wrap every journey run, scoped or full, in `flock /home/user/.wave/journey.lock`.
- **Where S1 stopped.** Read `/home/user/.wave/codex/s1-brief.md` (the unit, its canon, its rules) and `/home/user/.wave/codex/s1-last.md` (its report). Groups (a) to (e) are committed: button, alert, collapse, accordion, tab with pill and list, dropdown, tooltip, and popover, 485 rows. Scoped runs took 32 s for button and alert, 175 s for collapse and accordion, 65 s for tabs, 86 s for dropdowns, and 57 s for tooltip and popover. The J0b gate ran each variant project in 152 to 176 s and the whole gate in 188.79 s. `/home/user/.wave/cursor/g2-result.md` maps the families still to do.
- **The toast blocker, ruled.** Four dismiss buttons named `Close` share the Toasts region. Give each dismiss button in `app/browser/sections/toasts.html` an accessible name that names its toast (for example `Close the build pipeline toast`, `Close the invoice toast`, `Close the Mira Patel toast`, `Close the calendar toast`), changing only those `aria-label` attributes, and rebuild `showcase/browser.html` with `npm run build:showcase`.

## Do

1. **Tune the committed tables first.** A row earns its place when it proves a distinct pair of state and door, a refusal, or that a specimen is wired. Keep every distinct pair once per family on one representative specimen; for every other specimen of that family that shares the representative's markup contract and engine path (the dropup, dropend, and dropstart toggles, the split button, the flush accordion, the horizontal collapse), keep one wiring row set (one door into the state and one door back) plus any row its own markup changes; keep every refusal and unchanged-state row. Report rows per table before and after.
2. **Budget, measured.** After tuning and after the remaining groups, the statechart tests in each variant project take at most 45 s together in that project's full run, and the full `npm run test:journey` takes at most 235 s on this host. Measure with the JSON reporter; when a table cannot meet the budget without dropping a distinct pair or a refusal, keep the rows and report the table with its time.
3. **Finish groups (f) to (j)** under the S1 brief's rules: (f) toast, through its `aria-controls` show button and the renamed dismiss buttons; (g) carousel; (h) the offcanvas edge panels, then the modals, including `#modal-live-static` and the live dialog that nests the menu and the hint; (i) the navbar togglers and the responsive drawers in each width they render at; (j) the scrollspy, by scrolling `#engine-demo`. Commit after each group is green in its scoped run, red-first as before.
4. **Balance.** Spread the variant-independent tables across the four projects by measured time so the projects finish close together.
5. **Gates** after the last group, each read bare with its exit code: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run test:app:browser`, `npm run test:setup:browser`, `flock /home/user/.wave/journey.lock npm run test:journey` (all four variants green, with the per-project wall times), and `npm run test:policy`.
6. **Commits** in the repository's message style with the trailers `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_017fwYCgxCd9JhL43kVBLBJV` on their own lines. Never push. No installs, no network, no edits outside `tests/app/browser/`, `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, the four `aria-label` attributes in `app/browser/sections/toasts.html`, and `showcase/browser.html`.

## Output

Your final message is the report: rows per table before and after with each table's time and variant; per family its states, doors, refusal rows, and red-first excerpt for the groups this run adds; each gate with its exit code and counts; per-project wall times; the commit hashes; and any deviation (expected, found, evidence), including every door G2 lists that the page cannot drive.

## Deviation contract

When a gate fails, find the cause and fix it inside the owned files. Stop and report when a door needs any other page change, when a component departs from Bootstrap's documented behaviour (record it with the evidence for the engine session and leave the row out), or when the sandbox refuses an action. Never work around a refusal with another write mechanism.
