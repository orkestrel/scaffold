# Unit U1-conform-gate — authoritative gates for the conformed Veneer tree

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Veneer checkout, with the uncommitted U1-conform change and the manifest step
in its working tree, passes its full gate chain on managed Chromium and the named projects on
Edge, and what `scaffold audit` reports.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/veneer`, HEAD `d8b0e65`. The working tree is dirty
on purpose: the U1-conform files (moved classes, renamed helpers, the new `tests/setupListeners.ts`,
the guide) plus `package.json` and `package-lock.json` from the removal of `@tailwindcss/vite` and
`tailwindcss`, plus untracked files under `tmp/`. `node_modules` carries `@orkestrel/scaffold`
0.0.76 from the registry and the `@orkestrel/test` 0.0.18 tarball installed `--no-save`; run no
install. No writer is live. `scaffold audit` is expected to print a `setup` question for
`tests/setupListeners.ts` and three advisory `dependencies` lines and exit 0; report what it
prints.

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

1. `git status --porcelain | grep -v '^?? tmp/'` and `git log --oneline -1`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build`
6. `npm test` (the whole chain)
7. `npm run test:distribution`
8. `PLAYWRIGHT_CHANNEL=msedge npm run test:src`
9. `PLAYWRIGHT_CHANNEL=msedge npm run test:app`
10. `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`
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
