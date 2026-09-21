# Unit U7c-gate — authoritative gates for the Veneer checkout

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Veneer checkout, with the uncommitted U7c change in its working tree and the
Test-paint tarball in `node_modules`, passes its full gate chain on managed Chromium, its app
browser project on Edge, and its capture run.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/veneer`, HEAD as the dispatch message states (the
U7b landing). The working tree is dirty on purpose: the U7c files (a subset of `app/browser/**`,
`tests/app/browser/**`, `tests/setup.ts`, `tests/setup.test.ts`, `tests/setupBrowser.ts`,
`tests/setupBrowser.test.ts`, `tests/distribution.test.ts`), plus untracked files under `tmp/`.
Run no install. No writer is live.

**Host.** Windows, Git Bash. Run every command from that checkout with `npm run <name>`. Edge
runs through the `PLAYWRIGHT_CHANNEL=msedge` environment variable; the capture run is selected
as `configs/src/vite.browser.config.ts` and `tests/setupBrowser.ts` declare (read them; the
`capture` injection). The whole chain can exceed ten minutes: run `npm test` as a background
command writing to a log under the checkout's `tmp/` directory and poll that log until it ends.
A timing failure under load is reported as a reading, never diagnosed.

## Scope

**Owned.** Nothing. **Off-limits.** Every file. **Tools.** `Bash` for the commands named, `Read`
for their logs.

## Execution

Perform the assignment directly and spawn nothing. Run, in this order, stopping for nothing, and
capture each command's last twelve lines:

1. `git status --porcelain --untracked-files=all | grep -v '^?? tmp/'` and `git log --oneline -1`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build`
6. `npm run test:setup`
7. `npm run test:app:browser`
8. the capture run of the app browser project as the config selects it (state the exact command)
9. `npm run test:distribution`
10. `npm test` (the whole chain)
11. `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser`
12. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` (read-only)
13. `ls tmp/capture/states | head -40` (the capture files the run wrote, names only)
14. `git status --porcelain --untracked-files=all | grep -v '^?? tmp/'` again

Write nothing into the checkout except the `npm test` log under `tmp/` and the captures the
run itself writes.

## Output

Your final message is: one table `Step | Command | Exit | Final lines` with every step; the exact
failure excerpt for every non-zero exit; the audit's full output; the capture listing; both
status readings verbatim; and nothing else. No process diary.

## Deviation contract

Stop and report only when a command cannot start. Everything else is a reading.

## Acceptance criteria

Every step ran and has a row; every non-zero exit has its excerpt.

## Review evidence

The report itself.
