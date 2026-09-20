# Unit U6-gate — authoritative gates for the Test journey additions

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Test checkout, at `HEAD f49bc7f` with the uncommitted U6 diff in its working
tree, passes its full gate chain on managed Chromium, its browser project on Edge, and the
`scaffold audit` reading.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/test`. `HEAD` is `f49bc7f`; the working tree is
dirty on purpose: `git status --porcelain` lists `guides/test.md`, `src/browser/constants.ts`,
`src/browser/helpers.ts`, `src/browser/types.ts`, `tests/setup.ts`, and
`tests/src/browser/helpers.test.ts`, and nothing else. `node_modules` is installed.

**Host.** Windows, Git Bash. Run every command from that checkout. Use `npm run <name>` (Git Bash
resolves `npm`). Managed Chromium is installed; Edge `153.0.4234.48` is installed and Playwright
reaches it through `PLAYWRIGHT_CHANNEL=msedge` (the config's `resolveBrowser` reads that
variable). No network is needed.

**Standing conditions.** `scaffold audit` may report `dependencies` advisories on major versions;
report them verbatim, they are not failures. A `Port ... is in use, trying another one` line
from Vitest is informational. The browser project runs its files serially, so `test:src` takes
about half a minute; `Boom`, `Refused`, and `Ignored` lines printed during it come from a journal
fixture and are not failures. The build prints an API Extractor TypeScript-version advisory that
is not a failure.

## Scope

**Owned.** Nothing. **Off-limits.** Every file. **Tools.** `Bash` for the commands named, `Read`
for their logs.

## Execution

Perform the assignment directly and spawn nothing. Run, in this order, stopping for nothing (a red
gate is a reading, not a reason to stop), and capture each command's last twelve lines:

1. `git status --porcelain` and `git diff --stat`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build`
6. `npm test` (the whole chain, on managed Chromium)
7. `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser`
8. `node ../scaffold/dist/bin/main.js audit --target .`
9. `ls dist/src/browser`
10. `grep -c "hoverAccessible\|holdAccessible\|releasePointer\|stageMedia\|releaseMedia\|sendProtocol" dist/src/browser/index.d.ts`
11. `git status --porcelain` again (the gates must not have changed the tree)

Write nothing into the checkout. Keep each command's output in your context only as far as the
report needs it.

## Output

Your final message is: one table `Step | Command | Exit | Final lines` with every step; the exact
failure excerpt (the assertion, the diagnostic, or the missing file) for every non-zero exit; the
`audit` lines verbatim; both `git status --porcelain` outputs verbatim; the `ls` and `grep`
readings verbatim; the browser user agent line from the Edge run; and nothing else. No process
diary.

## Deviation contract

Stop and report only when a command cannot start (missing binary, missing checkout). Everything
else is a reading.

## Acceptance criteria

Every step ran and has a row; every non-zero exit has its excerpt.

## Review evidence

The report itself.
