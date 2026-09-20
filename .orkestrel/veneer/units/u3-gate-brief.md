# Unit U3-gate — authoritative gates for the Veneer token contract

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Veneer checkout, with the uncommitted U3 change in its working tree, passes its
full gate chain on managed Chromium and the named projects on Edge.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/veneer`. The working tree is dirty on purpose: the
U3 files (report 3 lists them) plus untracked files under `tmp/`. `node_modules` carries the U6
Test tarball and the scaffold tip tarball installed `--no-save`; run no install. No writer is
live.

**Host.** Windows, Git Bash. Run every command from that checkout with `npm run <name>`. Edge
runs through the `PLAYWRIGHT_CHANNEL=msedge` environment variable. `test:distribution` packs the
package and installs the tarball into a temporary consumer; it needs the registry and can take
several minutes. The whole chain can exceed ten minutes: run `npm test` as a background command
writing to a log under the checkout's `tmp/` directory and poll that log until it ends.

## Scope

**Owned.** Nothing. **Off-limits.** Every file. **Tools.** `Bash` for the commands named, `Read`
for their logs.

## Execution

Perform the assignment directly and spawn nothing. Run, in this order, stopping for nothing (a red
gate is a reading, not a reason to stop), and capture each command's last twelve lines:

1. `git status --porcelain` (tracked lines only: pipe through `grep -v '^??'`) and the untracked
   list outside `tmp/`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build`
6. `npm test` (the whole chain)
7. `npm run test:distribution`
8. `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`
9. `PLAYWRIGHT_CHANNEL=msedge npm run test:src`
10. `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`
11. `node ../scaffold/dist/bin/main.js audit --target .` (read-only; reports drift against the
    installed scaffold's plan)
12. `git status --porcelain | grep -v '^??'` again

Write nothing into the checkout except the `npm test` log under `tmp/`.

## Output

Your final message is: one table `Step | Command | Exit | Final lines` with every step; the exact
failure excerpt for every non-zero exit; both status readings verbatim; and nothing else. No
process diary.

## Deviation contract

Stop and report only when a command cannot start. Everything else is a reading.

## Acceptance criteria

Every step ran and has a row; every non-zero exit has its excerpt.

## Review evidence

The report itself.
