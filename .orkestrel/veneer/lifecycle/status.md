# Browser lifecycle: status

The user asked (2026-10-03) whether journeys, tests, and `browse` start a browser per test or file or reuse one with cleanup, whether several browsers stay alive to run work in parallel, and whether a browser stays warm as `probe` keeps its workers warm.

## Findings from the maps

- `veneer-tests-map.md`: each `vitest run` launches one Chromium per browser project and reuses it for every file in that project, one tester iframe per file on one page. A full `npm test` is 15 Vitest processes chained with `&&` and 17 launches, each with its own Vite server. The four journey variants run at once, four browsers, the only parallelism; every other browser project runs its files one after another (`fileParallelism: false`) except `setup:browser`. Nothing stays warm between scripts. `configs/browsers.ts` already connects to `PLAYWRIGHT_WS_ENDPOINT` when set, and no script sets it.
- `browser-browse-map.md`: the `browse` server launches Chromium on the first tool call and keeps one browser and one isolated context for the server's life; `replay` reuses them. It has no idle shutdown and no recovery after a successful launch, so a crashed browser leaves later calls on a dead page. `test:service` performs about 24 launches, 17 of them per test in `tests/service/browser.test.ts`. `src:browser` and `setup:browser` each launch 2 more in a global setup. `probe` starts its workers on the first `prove`, not at server start, and keeps them resident.

## Open

- The journey proofs repair (`showcase-proofs-6`, veneer worktree `veneer-wt-page`) measures journey wall, per-project, and per-test time before and after replacing fixed observation windows with windows derived from the engine's timing.
- Measure on a quiet host: a cold Chromium launch, a context, and a page; the launch and Vite startup share of each script; then rule on shared browsers across service tests, the `browse` crash recovery, a warm start for `browse`, and file parallelism for the journey and `src:browser`, each with its measured saving.
