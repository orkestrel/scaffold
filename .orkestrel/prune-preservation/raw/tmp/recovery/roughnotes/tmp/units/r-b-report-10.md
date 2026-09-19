# R-B successor10 report

The owned animation adoption is complete. The navigation registry and placement now produce the compact navigation frame and pass the existing membership assertions. The capture run also emits a genuine unhandled rejection from the unowned setup theme hook. Source is frozen pending Orchestrator triage of that boundary; the capture proof is not clean.

## Scope and dispositions

`tests/app/browser/styles/theme.test.ts` now imports `waitForAnimations` directly from installed `@orkestrel/test/browser` and calls `await waitForAnimations(button)` in place of the local `Promise.all(button.getAnimations().map((animation) => animation.finished))`. Existing paint, ring, fixture and contrast assertions remain unchanged. This closes primitive adoption; it does not claim a demonstrated stylesheet defect.

`tests/app/browser/integration.test.ts` registers `navigation` in `STATES` and places it immediately after `openSite()` and the Shop keyboard traversal, before `closeSite()`. The membership assertions remain unchanged. Product behavior, setup helpers, generated host configuration, dependencies, config wrappers and predecessor reports remain unchanged by this successor.

## Measured proof

- Adoption red: the retained expression search found the local wait at theme.test.ts:63. See `animation-adoption-10-red.log.txt`. The replacement removes that expression and reuses the published primitive directly.
- Existing theme green: `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=dot --project app:browser tests/app/browser/styles/theme.test.ts` exited0; tests9 passed(9),21.46s. See `theme-10-green.log.txt`.
- Navigation membership red: set `CAPTURE=1`, run `npm.cmd run test:journey -- --project journey:light-390`, then restore the prior environment in `finally`. Before placement, this exact command exited1; tests2 failed|42 passed(44),47.81s. `writes every frame this run owes` lacked `navigation--light-390.png`; `places every registered state and places nothing else` lacked `navigation`. See `navigation-capture-10-red.log.txt`.
- Navigation membership after placement: the same capture command exited0; tests44 passed(44),48.33s. See `navigation-capture-10-after.log.txt`. This run emitted the unhandled rejection described below, so its exit0 does not establish clean capture execution.
- Owned `oxfmt --check`, owned `oxlint --config .oxlintrc.json --deny-warnings`, and `npm.cmd run check:app:browser` each exited0. The scoped paths were theme.test.ts and integration.test.ts.

## Ownership deviation

Expected: capture navigation through the existing Cartesian portfolio without an emitted rejection. Found: the run emitted `Unhandled rejection: Error: Interactive target "Use dark theme" is not visible and focus-reachable` and a trusted `PromiseRejectionEvent` in the content continuation journey.

The exact stack reaches `applyTheme` at `tests/setupBrowser.ts:1061`, the variant `apply` callback at setupBrowser.ts:1088, installed portfolio `place` at browser/index.js:2600, integration `place` at integration.test.ts:179 and navigation placement at integration.test.ts:509. The installed portfolio invokes the callback without awaiting it. The current callback returns the asynchronous theme operation. Its strict control observation encounters the header theme button while the compact modal covers that control.

Done: direct animation primitive adoption, named missing-frame red, declared navigation placement, written compact frame, unchanged membership assertions, scoped checks. Not done: clean navigation capture proof. Hypothesis: the variant hook reobserves the already painted theme through a covered interactive target during the modal capture. No setup helper or portfolio mechanism was changed. Orchestrator triage is required under the deviation protocol because setupBrowser.ts is report-only in this successor.

## Capture and freeze evidence

`tmp/capture/states/navigation--light-390.png` was written by the actual capture run and inspected locally. Its measured dimensions are390×7567px and its file size is40386bytes. The frame shows the open Menu, its close control, navigation destinations and focused Shop. Independent image review remains the parent's responsibility.

`r-b-baseline-hashes-10.json` retains the pre-unit hashes. `r-b-frozen-hashes-10.tsv`, `r-b-status-10.txt`, `r-b-diffstat-10.txt`, `r-b-actual-10.diff`, `r-b-new-setup-proof-10.diff` and `r-b-shared-10.diff` preserve the frozen checkout evidence. Full tracked diffs include inherited R-A-2 and prior R-B work; this successor's source delta is limited to the paths named above.

Parent obligations remain final generated-host/cold-cache acceptance, broad gates, the complete variant capture run and inventory refresh, independent capture review, and a ruling on the emitted theme-hook rejection. No registry publication proof is claimed. No installs, dependencies, commits or delegation occurred.
