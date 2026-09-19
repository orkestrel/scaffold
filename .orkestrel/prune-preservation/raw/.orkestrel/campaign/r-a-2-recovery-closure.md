# Record the recovered R-A-2 evidence

Use `r-a-2-recovered-report.md` for the interrupted Opus writer's recovered controls, census states, original mutation and gate readings. Keep that historical report immutable. Use `r-a-2-recovery-gates.md` for the independent full-chain readings on 2026-09-18.

The independent verifier replayed the original scoped commands after recovery:

| Command, run from Roughnotes | Observed result |
| --- | --- |
| `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/App.test.ts -t "in any state the guide declares"` | Exit0; 1 passed, 14 filter skips |
| `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/App.test.ts -t "hides the compact menu"` | Exit0; 2 passed, 13 filter skips |
| `npx.cmd vitest run --config vite.config.ts --no-cache --reporter=verbose --project app:browser tests/app/browser/helpers.test.ts -t "buildName"` | Exit0; 1 passed, 15 filter skips |

The Orchestrator ran the builder-authored exact empty-products/media Contact reproduction at1280x800 and390x844. The probe asserts no refusal and resolves the bare Contact link to #/contact after the empty notice paints. Its control appends a visible duplicate Contact link, asserts the ambiguity refusal, removes the duplicate, and asserts recovery.

`npx.cmd vitest run --config tmp/probe/ra2-recovery/vite.config.ts` exited0 with2 passed in5.31s on2026-09-18. Retain the probe and `result-page.log.txt` under `r-a-2-recovery-probe/`.

The initial probe failed because readPerception excludes the main landmark role. The installed0.0.17 declaration limits it to named region/dialog/table/tab-panel/alert readings. The corrected probe uses published readPage for the painted notice. That correction changes the observation instrument, not application source or the Contact assertions.

The canonical source patch was exported with `git diff --no-ext-diff --output=...`; git apply --check passes against86a9ef6. The recovery worktree replays it unchanged before R-B. The original dirty Roughnotes source and untracked .codex configuration remain preserved.

Keep full-chain closure pending R-B's optimizeDeps wrapper migration and Scaffold0.0.75 generated-format repair. The independent full chain's lint, type and build gates pass; full npm test fails at the known conformance expectation. The format gate identifies generated vite.config.ts and the original checkout's unrelated user .codex/hooks.json.
