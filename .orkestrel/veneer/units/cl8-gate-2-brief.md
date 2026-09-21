# Unit CL8-gate round 2 — authoritative gates for the Veneer checkout

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Veneer checkout, with the uncommitted CL8 change after its fix round in its working tree, passes its
full gate chain on managed Chromium and its styles, browser-setup, and app-browser projects on Edge.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/veneer`, HEAD the CL7 landing `a9172df` (read it
from `git log --oneline -1`). The working tree is dirty on purpose: the CL8 files, which are the
grid partial and its proof, the styles barrel, `tests/setupStyles.ts` and its proof,
`tests/conformance.test.ts`, `guides/veneer.md`, the layout showcase section and its proof, and
`app/browser/constants.ts`, `index.ts`, and `Showcase.ts`, plus `src/styles/_mixins.scss` and
`src/styles/components/_container.scss` from the extraction, `tests/setupConformance.test.ts` from
the granted assertion, and untracked files under `tmp/`. The fix round moved only test files: the
styles setup module and its proof, the grid proof, and the layout section proof. Run no install; no
writer is live when you start.

**Host.** Windows, Git Bash. Run every command from that checkout with `npm run <name>`. Edge runs
through the `PLAYWRIGHT_CHANNEL=msedge` environment variable. The whole chain can exceed ten
minutes: run `npm test` as a background command writing to a log under the checkout's `tmp/`
directory (a `.log.txt` name) and poll that log until its exit marker appears; the log, not the
harness's notification, is the exit-code source. A timing failure under load is reported as a
reading, never diagnosed.

**Expected non-gate output.** The scaffold audit reports a setup module with no covering proof and
several dependency floors behind the registry. Those readings are standing conditions in this
checkout, not failures of this change. Report them as they come and do not act on them.

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
6. `npm run test:src:core`
7. `npm run test:src:styles`
8. `npm run test:setup`
9. `npm run test:setup:browser`
10. `npm run test:conformance`
11. `npm run test:guides`
12. `npm run test:policy`
13. `npm run test:app:browser`
14. `npm run test:journey`
15. `npm test` (the whole chain, as a background command logged under `tmp/`)
16. `PLAYWRIGHT_CHANNEL=msedge npm run test:src:styles`
17. `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`
18. `PLAYWRIGHT_CHANNEL=msedge npm run test:app:browser`
19. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` (read-only)
20. `git status --porcelain --untracked-files=all | grep -v '^?? tmp/'` again

Write nothing into the checkout except the `npm test` log under `tmp/`.

## Output

Your final message is: one table `Step | Command | Exit | Final lines` with every step; the exact
failure excerpt for every non-zero exit; the audit's full output; both status readings verbatim;
and nothing else. No process diary.
