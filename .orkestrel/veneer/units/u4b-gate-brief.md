# Unit U4b-gate — authoritative gates for the conformance oracle

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Veneer checkout, with the uncommitted U4b change in its working tree, passes
its full gate chain on managed Chromium and the conformance project on Edge, and whether the
oracle's live recording matches its committed fixture on both engines.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/veneer`, HEAD `ef1a563`. The working tree is dirty
on purpose: the U4b files (`tests/conformance.test.ts`, `tests/setupConformance.ts`,
`tests/setupConformance.test.ts`, `tests/fixtures/oracle/**`, `guides/veneer.md`, and
`guides/README.md` if touched), plus untracked files under `tmp/`. `node_modules` carries
`@orkestrel/scaffold` 0.0.76 from the registry and the `@orkestrel/test` 0.0.18 tarball installed
`--no-save`; run no install. No writer is live. The `conformance` project now launches Playwright
Chromium from a Node worker; the first run after a cold start can take longer than the case's
timeout on a loaded host, so run step 6 twice if it reds on a timeout and report both readings.
`scaffold audit` is expected to print a `setup` question for `tests/setupListeners.ts` and three
advisory `dependencies` lines and exit 0; report what it prints.

**Host.** Windows, Git Bash. Run every command from that checkout with `npm run <name>`. Edge
runs through the `PLAYWRIGHT_CHANNEL=msedge` environment variable. The whole chain can exceed
ten minutes: run `npm test` as a background command writing to a log under the checkout's `tmp/`
directory and poll that log until it ends.

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
6. `npm run test:conformance` (report every case title with its state)
7. `npm run test:setup`
8. `npm run test:guides`
9. `npm run test:policy`
10. `npm test` (the whole chain)
11. `npm run test:distribution`
12. `PLAYWRIGHT_CHANNEL=msedge npm run test:conformance`
13. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` (read-only)
14. `git status --porcelain | grep -v '^?? tmp/'` again (the oracle must write no fixture on an
    ordinary run: the status must equal step 1's)

Write nothing into the checkout except the `npm test` log under `tmp/`.

## Output

Your final message is: one table `Step | Command | Exit | Final lines` with every step; the exact
failure excerpt for every non-zero exit; step 6's case titles and states; the audit's full output;
both status readings verbatim; and nothing else. No process diary.

## Deviation contract

Stop and report only when a command cannot start. Everything else is a reading.

## Acceptance criteria

Every step ran and has a row; every non-zero exit has its excerpt.

## Review evidence

The report itself.
