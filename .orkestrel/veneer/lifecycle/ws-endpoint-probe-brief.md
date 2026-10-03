# Unit ws-endpoint-probe — does `PLAYWRIGHT_WS_ENDPOINT` let veneer's tests reuse a warm browser?

## Role and engine

`astra` on GPT-6 Astra, reached as `codex exec` with reasoning effort high and `--sandbox danger-full-access`. Probe in the veneer checkout `C:\Users\mikes\WebstormProjects\veneer` (branch `main` at `c6d831c`). Change no tracked file and make no commit; author files only under `tmp/units/ws-endpoint/` and `tmp/codex/`. The `npm` scripts this brief names may write their own git-ignored output (`dist/`, `tmp/captures/`, and any other ignored path they build into); `git status --porcelain` must stay empty. Your first run stopped on that boundary (`tmp/codex/ws-endpoint-probe-last.md`); this ruling lifts the stop. Every script is TypeScript run by `node` (`AGENTS.md`). Never push, publish, or install. Perform the assignment yourself and spawn nothing.

## The question

`configs/browsers.ts:299-301` turns `PLAYWRIGHT_WS_ENDPOINT` into `connectOptions.wsEndpoint`, and the Vitest Playwright provider then calls `playwright.chromium.connect(wsEndpoint, …)` instead of launching (`node_modules/@vitest/browser-playwright/dist/index.js:910-925`). `connect` speaks Playwright's own protocol, so the endpoint comes from a Playwright browser server, not from a raw CDP endpoint. The user wants to know whether a browser kept running this way works the way it appears to, before anything is built on it. Today every `vitest run` launches its own Chromium and nothing stays warm between runs (`C:\Users\mikes\WebstormProjects\scaffold\.orkestrel\veneer\lifecycle\veneer-tests-map.md`).

## Establish, each with evidence

1. **Attach without a launch.** Start a browser server with the installed `playwright` package (`chromium.launchServer`, headless) in a launcher script, then run a real browser project with `PLAYWRIGHT_WS_ENDPOINT` set to its endpoint: `test:src:vue` first, then `test:src:browser`. Show that the run starts no Chromium of its own (process census before, during, and after, by command line and parent), that the tests run headless, and that pass and fail counts equal a cold run of the same script.
2. **Cleanup per run.** After a connected run exits, show what it left in the server's browser: contexts, pages, and targets. If the Playwright side cannot list them, launch the server's browser with a CDP port as well and read `/json/list`. Run the same script twice back to back on one server and show that the second run starts clean and passes the same.
3. **The launch-options header.** The provider sends `x-playwright-launch-options` on connect. Read in the installed `playwright-core` what `launchServer` does with it and what `run-server` does (a shared browser, or a browser per connection), and say which of the two keeps one browser warm.
4. **Parallel projects.** Run `test:journey` (four projects at once) against one server. Report whether each passes, and whether one browser with four contexts behaves as four browsers do for focus, viewport, and pointer state. If it does not, try one server per project and report that.
5. **Failure at the onset.** With the endpoint set and the server stopped, and with the server's browser killed in the middle of a run, report what Vitest does and how soon: a refusal at connect, a hang, or a failure partway through.
6. **One browser for both protocols.** Report whether a browser started through `launchServer` with a CDP port can also be attached by `@orkestrel/browser`'s `createBrowser({ cdp: { endpoint } })` (from veneer's `node_modules`, if installed; otherwise from `C:\Users\mikes\WebstormProjects\browser-wt-browse`'s build, read-only) while a Playwright client is connected, and what each side sees of the other's contexts.
7. **Cost, preliminary.** Time a cold run against a connected run of the same script, with sample counts sized to the noise you observe, and report the host's other load (`Get-Process chrome,msedge,node,codex`). Other writers run tests on this host now, so mark these numbers preliminary; a quiet-host run comes later. Separate the launch's share from Vite's startup where the logs allow it. No figure here is a target.

## Output

Write `tmp/codex/ws-endpoint-probe-report.md` and return it as your final message: one section per item with the commands, the evidence, and the answer; the scripts kept under `tmp/units/ws-endpoint/`, each with its usage line; and `## Unknowns`. No process diary, no recommendations.

## Deviation contract

Stop if a probe would need a tracked file changed or a package installed, and report: expected, found, evidence, and one hypothesis.
