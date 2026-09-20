# Unit U1-gate — authoritative gates for the Veneer adoption

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Veneer checkout at the commit named under § Context passes its full gate chain
on managed Chromium, its browser projects on Edge, and the `scaffold audit` reading.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/veneer`, at the commit the dispatch message names,
clean (`git status --porcelain` empty except ignored paths). `node_modules` is installed.

**Host.** Windows, Git Bash. Run every command from that checkout. Use `npm run <name>` (Git Bash
resolves `npm`). Managed Chromium `1243` is installed; Edge `153.0.4234.48` is installed and
Playwright reaches it through `PLAYWRIGHT_CHANNEL=msedge`. No network is needed; a
`[requires the registry]` case in `tests/distribution.test.ts` skips without `--mode release`,
and that is the expected reading here.

**Standing conditions.** `scaffold audit` reports three `dependencies` advisories
(`@vitest/browser-playwright` major 4 versus 5, `typescript` 6 versus 7, `vitest` 4 versus 5); those
stay and are not failures. A `Port ... is in use, trying another one` line from Vitest is
informational.

## Scope

**Owned.** Nothing. **Off-limits.** Every file. **Tools.** `Bash` for the commands named, `Read`
for their logs.

## Execution

Perform the assignment directly and spawn nothing. Run, in this order, stopping for nothing (a red
gate is a reading, not a reason to stop), and capture each command's last twelve lines:

1. `npm run format:check`
2. `npm run lint:check`
3. `npm run check`
4. `npm run build`
5. `npm test` (the whole chain, on managed Chromium)
6. `PLAYWRIGHT_CHANNEL=msedge npm run test:src`
7. `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`
8. `PLAYWRIGHT_CHANNEL=msedge npm run test:app`
9. `PLAYWRIGHT_CHANNEL=msedge npm run test:journey`
10. `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`
11. `node ../scaffold/dist/bin/main.js audit --target .`
12. `git status --porcelain`
13. `ls dist/src/styles dist/src/core dist/src/browser`

Write nothing into the checkout. Keep each command's output in your context only as far as the
report needs it.

## Output

Your final message is: one table `Step | Command | Exit | Final lines` with every step; the exact
failure excerpt (the assertion, the diagnostic, or the missing file) for every non-zero exit; the
`audit` lines verbatim; the `git status --porcelain` output verbatim; the `ls` listing; and nothing
else. No process diary.

## Deviation contract

Stop and report only when a command cannot start (missing binary, missing checkout). Everything
else is a reading.

## Acceptance criteria

Every step ran and has a row; every non-zero exit has its excerpt.

## Review evidence

The report itself.
