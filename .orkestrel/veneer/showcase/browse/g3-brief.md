# Lane G3: where the browse server's replay and tool calls spend their time

Read-only absorption. You read files and answer; you edit nothing and run nothing. Cite every fact as `path:line` relative to the workspace root (`/home/user/browser`, `@orkestrel/browser` 0.0.20, branch `ccr-d15a48b1-yyyll6`), or as an absolute path outside it.

## Evidence of the lag

An agent drove a Bootstrap showcase page through the `browse` MCP server on 2026-10-02. A saved journey of 42 steps (clicks and key presses on one page, no navigation) replayed in 83.17 s, about 2 s per step; a 10-step journey and a 9-step journey also replayed. Transcript: `/home/user/.wave/veneer-wt-sc/tmp/codex/b2/transcript.txt` with an index at `/home/user/.wave/veneer-wt-sc/tmp/codex/b2/index.txt`; run results with per-step data at `/home/user/.wave/veneer-wt-sc/tmp/codex/b2/runs.json`; the saved journeys and their run folders under `/home/user/.wave/veneer-wt-sc/tmp/browsers/b2/`. Read the per-step timings there if they exist.

## Questions

1. For one replayed step (a click, a key press) and for one live tool call (`click`, `press`, `look`, `wait`), list every wait, timeout, settle, poll, capture, and screenshot on its path, in order, with its duration or bound and the code that sets it (`src/core/BrowserReplay.ts`, `src/core/BrowserToolset.ts`, `src/core/BrowserJourneyToolset.ts`, `src/core/constants.ts`, `src/core/elements/`, `src/core/BrowserPage.ts`, and what they call).
2. Which of those costs a step pays whether or not the page changed: a fixed delay, a settle that waits a fixed span after the last mutation, a screenshot per step, an accessibility snapshot per step, a capture the caller never reads. For each, say what claim or feature it serves (a replay capture the run folder keeps, the view receipt a model reads) and whether a step needs it every time.
3. Account for the 2 s per step from the run data where you can; otherwise estimate from the bounds, and say which costs dominate.
4. Propose the substantive cuts only: a superfluous wait or capture removed, or paid once instead of per step, keeping every documented behaviour (`guides/browser.md`) and every test claim. Do not propose fine-tuning a constant without a reason a step does not need the span. For each, give the code it changes and the expected saving per step.

## Output

Your final message is the distillate: one section per question with citations, then the proposals ranked by saving. End with every input you could not resolve.
