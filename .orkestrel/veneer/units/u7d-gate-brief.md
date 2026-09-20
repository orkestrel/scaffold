# Unit U7d-gate — authoritative gates for the Veneer checkout

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Veneer checkout, with the uncommitted U7d change in its working tree, passes
its full gate chain on managed Chromium and the conformance project on Edge.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/veneer`, HEAD `1b80ccb`. The working tree is
dirty on purpose: the U7d files (`tests/setupConformance.ts`, `tests/setupConformance.test.ts`,
`tests/conformance.test.ts`, `tests/setupStyles.ts`, `guides/veneer.md`), plus untracked files
under `tmp/`. Run no install. No writer is live.

**Host.** Windows, Git Bash. Run every command from that checkout with `npm run <name>`. Edge
runs through the `PLAYWRIGHT_CHANNEL=msedge` environment variable. The whole chain can exceed
ten minutes: run `npm test` as a background command writing to a log under the checkout's `tmp/`
directory and poll that log until it ends. The conformance project records a live Bootstrap
oracle through Playwright and reads a compatibility table; a timing failure under load is
reported as a reading, never diagnosed.

## Scope

**Owned.** Nothing. **Off-limits.** Every file. **Tools.** `Bash` for the commands named, `Read`
for their logs.

## Execution

Perform the assignment directly and spawn nothing. Run, in this order, stopping for nothing, and
capture each command's last twelve lines:

1. `git status --porcelain | grep -v '^?? tmp/'` and `git log --oneline -1`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build`
6. `npm run test:setup`
7. `npm run test:conformance`
8. `npm run test:guides`
9. `npm test` (the whole chain)
10. `PLAYWRIGHT_CHANNEL=msedge npm run test:conformance`
11. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` (read-only)
12. `git status --porcelain | grep -v '^?? tmp/'` again

Write nothing into the checkout except the `npm test` log under `tmp/`.

## Output

Your final message is: one table `Step | Command | Exit | Final lines` with every step; the exact
failure excerpt for every non-zero exit; the audit's full output; both status readings verbatim;
and nothing else. No process diary.

## Deviation contract

Stop and report only when a command cannot start. Everything else is a reading.

## Acceptance criteria

Every step ran and has a row; every non-zero exit has its excerpt.

## Review evidence

The report itself.
