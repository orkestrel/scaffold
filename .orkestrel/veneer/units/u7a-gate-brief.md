# Unit U7a-gate — authoritative gates for the Veneer checkout

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Veneer checkout, with the uncommitted U7a change in its working tree and the
Test-paint tarball in `node_modules`, passes its full gate chain on managed Chromium, and its
styles and conformance projects on Edge.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/veneer`, HEAD `2bc922d`. The working tree is dirty
on purpose: the U7a files (a subset of `src/styles/**`, `src/core/constants.ts`,
`src/core/types.ts`, `tests/src/styles/**`, `tests/src/core/index.test.ts`,
`tests/conformance.test.ts`, `guides/veneer.md`), plus untracked files under `tmp/`. Run no
install. No writer is live. `dist/` may be stale at start; step 5 rebuilds it and the presence
check in step 9 reads the rebuilt cascade.

**Host.** Windows, Git Bash. Run every command from that checkout with `npm run <name>`. Edge
runs through the `PLAYWRIGHT_CHANNEL=msedge` environment variable. The whole chain can exceed
ten minutes: run `npm test` as a background command writing to a log under the checkout's `tmp/`
directory and poll that log until it ends. A timing failure under load is reported as a reading,
never diagnosed.

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
6. `npm run test:src:core`
7. `npm run test:src:styles`
8. `npm run test:setup`
9. `npm run test:conformance`
10. `npm run test:guides`
11. `npm test` (the whole chain)
12. `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`
13. `PLAYWRIGHT_CHANNEL=msedge npm run test:conformance`
14. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` (read-only)
15. `sha256sum dist/src/styles/index.css`
16. `git status --porcelain | grep -v '^?? tmp/'` again

Write nothing into the checkout except the `npm test` log under `tmp/`.

## Output

Your final message is: one table `Step | Command | Exit | Final lines` with every step; the exact
failure excerpt for every non-zero exit; the audit's full output; the cascade digest; both status
readings verbatim; and nothing else. No process diary.

## Deviation contract

Stop and report only when a command cannot start. Everything else is a reading.

## Acceptance criteria

Every step ran and has a row; every non-zero exit has its excerpt.

## Review evidence

The report itself.
