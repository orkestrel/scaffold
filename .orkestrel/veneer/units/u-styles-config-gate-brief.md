# Unit U-styles-config-gate — authoritative gates for the styles-axis wiring

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Veneer checkout, with the uncommitted U-styles-config change in its working
tree, passes its gates on managed Chromium and the named projects on Edge, and whether the Node
proofs that read the styles setup module pass with no `dist/` at all.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/veneer`, HEAD `a05e9ff`. The working tree is dirty
on purpose: `configs/src/vite.styles.config.ts`, `tests/setupStyles.ts`, and `package.json`
(scripts) from U-styles-config, plus untracked files under `tmp/`. `node_modules` carries
`@orkestrel/scaffold` 0.0.76 from the registry and the `@orkestrel/test` 0.0.18 tarball installed
`--no-save`; run no install. No writer is live. `scaffold audit` is expected to print a `setup`
question for `tests/setupListeners.ts` and three advisory `dependencies` lines and exit 0; report
what it prints.

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
2. `npm run clean` (removes `dist/`), then `ls dist` (expected: no such directory)
3. `npm run test:setup` (with no `dist/`; expected: exactly two cases red, both in
   `tests/setupStyles.test.ts` and both reading the built artifacts by design —
   `requires the directional outputs from npm run build:src:styles` and
   `ships an RTL cascade that needs no flipping, over a cascade that declares treatments` — and
   every other case green; report the failing case titles verbatim and the counts)
4. `npm run test:conformance` (with no `dist/`; expected green)
5. `npm run format:check`
6. `npm run lint:check`
7. `npm run check`
8. `npm run build`
9. `npm run test:src` (expected to report the `src:core`, `src:browser`, and `src:styles` projects)
10. `npm test` (the whole chain)
11. `npm run test:distribution`
12. `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`
13. `PLAYWRIGHT_CHANNEL=msedge npm run test:src`
14. `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`
15. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` (read-only)
16. `git status --porcelain | grep -v '^?? tmp/'` again

Write nothing into the checkout except the `npm test` log under `tmp/`.

## Output

Your final message is: one table `Step | Command | Exit | Final lines` with every step; the exact
failure excerpt for every non-zero exit; the project names step 9 reports; the audit's full
output; both status readings verbatim; and nothing else. No process diary.

## Deviation contract

Stop and report only when a command cannot start. Everything else is a reading.

## Acceptance criteria

Every step ran and has a row; every non-zero exit has its excerpt.

## Review evidence

The report itself.
