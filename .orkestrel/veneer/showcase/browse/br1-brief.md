# Unit BR1: remove the superfluous outline work from browse clicks, presses, and replays

## Role and engine

GPT-6 Astra implementation lane through `codex exec`, sandbox `danger-full-access` on the Linux cloud host. Perform the work yourself and spawn nothing.

## Objective

Make a browse `click` or `press` cost what its work needs, not about 2 s on a large page, by removing two superfluous costs, with every documented behaviour and every test claim kept.

## Context

- **Checkout.** `/home/user/browser` (`@orkestrel/browser` 0.0.20), branch `ccr-d15a48b1-yyyll6` at `bff1abe`, clean. You are its only writer. Run `export PATH=/home/user/.wave/npm11/node_modules/.bin:$PATH npm_config_prefer_online=true` before every `npm` or `node` command. Another lane runs Chromium journeys on this host: wrap every command that starts a browser (browser test projects, the measurement replays) in `flock /home/user/.wave/journey.lock`.
- **The measured lag.** An agent drove veneer's showcase through the `browse` server on 2026-10-02: a 42-step replay took 83.17 s. Each click and press took 1.5 to 2.6 s inside its action timer, while each `wait` step took about 7 ms. `/home/user/.wave/cursor/g3-result.md` is a cited read-only map of where the time goes; verify each citation you use.
- **Cause 1, a quadratic parent scan.** `renderBrowserOutline` (`src/core/helpers.ts:158-198`) calls `nodes.find` for every `StaticText` node to find its parent (`:175-177`), so the render is quadratic in the accessibility tree's size. Every `click`, `press`, and `look` renders the outline for its receipt; the toolset then keeps the first 4,000 characters.
- **Cause 2, an outline no replay reads.** A replayed step runs `follow`, which builds the same receipt outline through `#settle` and `#capture` (`src/core/BrowserToolset.ts`), but the stored step keeps only the action line, `follow` drops the tool body, and the run renders one view after the last step (`src/core/BrowserToolset.ts:452-470`, `:652`; `src/core/helpers.ts:2774`; `guides/browser.md` § the replay render). Verify each of these before removing the capture.
- **Canon.** `AGENTS.md` and `.claude/rules/` in this checkout resolve to scaffold's (`/home/user/scaffold/AGENTS.md`, `/home/user/scaffold/.claude/rules/`), as the checkout's `AGENTS.md` says; `tests.md`, `names.md`, `typescript.md`, and `writing.md` rule the proofs, names, and comments.

## Do

1. **Measure first.** Write a scratch driver under `tmp/` (start from `/home/user/.wave/veneer-wt-sc/tmp/codex/b2/driver.ts`) that serves veneer's showcase from `/home/user/.wave/veneer-wt-sc` (`./node_modules/.bin/vite preview --config configs/app/vite.showcase.config.ts --port 4790 --strictPort`) and replays the saved journey `b2-disclosures` (42 steps, under `/home/user/.wave/veneer-wt-sc/tmp/browsers/b2/`) through a `browse` binary given by path, with a client timeout of at least 300 s. Run it against the installed 0.0.20 binary (`/home/user/.wave/veneer-wt-sc/node_modules/@orkestrel/browser/dist/bin/main.js`) and record the run's total and per-step times. Also time one live `click`, one live `press`, and one `look` on the showcase. Then read where the time goes with `performance.now` readings in a scratch copy (the accessibility tree fetch, the outline render, the observer evaluates), deleted after.
2. **Index the parents once.** In `renderBrowserOutline`, build a map from each node's session and id before the loop and read the parent from it. The rendered text stays byte-identical: prove it with the existing outline proofs plus one case whose tree holds several sessions sharing an id.
3. **Drop the outline from a replayed step** only where no reader consumes it: keep the action line, the navigation and popup settlement, the submit observer, the per-step PNG, and the single view after the run. Prove it with a case that fails before the change (a replayed step leaves the receipt outline unbuilt, read through a counting double or the element manager's call count) and passes after, and keep every existing replay proof green.
4. **Measure again** with the local build (`npm run build`, then the driver against `/home/user/browser/dist/bin/main.js`) and report before and after: the replay total, per-step times, and the live `click`, `press`, and `look` times.
5. **Stop at the substantive cut.** When the two changes bring a click and a press well under their present cost, stop. Propose any further cut in the report instead of implementing it.
6. **Gates**, each read bare with its exit code: `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `flock /home/user/.wave/journey.lock npm test`, and `npm run test:policy` if `npm test` does not include it.
7. **Commit** as one unit in the repository's message style with the trailers `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>` and `Claude-Session: https://claude.ai/code/session_017fwYCgxCd9JhL43kVBLBJV` on their own lines; the message cites the before and after timings. Never push. No installs, no network, no edits outside `src/core/` and `tests/` of this checkout (and the guide only where a sentence the change makes false needs correcting).

## Output

Your final message is the report: the before and after table, where the time went with the readings, each change with its proof (the red-first excerpt), each gate with its exit code and counts, the commit hash, and any further cut you propose but did not implement.

## Deviation contract

Stop and report when a reader of the replay outline exists that this brief did not name, when a cut would change a documented behaviour or a published type, or when the sandbox refuses an action. Never work around a refusal with another write mechanism.
