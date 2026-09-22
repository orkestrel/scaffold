# Unit CL8b-gate round 2 — authoritative gates for the Veneer checkout

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Veneer checkout, with the uncommitted CL8b change after its fix round in its working tree, passes its
full gate chain on managed Chromium and its styles, browser-setup, and app-browser projects on Edge.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/veneer`, HEAD the CL8 landing `d2c5bb3` (read it
from `git log --oneline -1`). The working tree is dirty on purpose: the CL8b files, which are the new
utilities partial `src/styles/utilities/_gap.scss` and its proof
`tests/src/styles/utilities/gap.test.ts`, both untracked; the styles barrel; `src/styles/_tokens.scss`
and `src/core/constants.ts` for the step scale; `tests/setupStyles.ts` and its proof;
`tests/conformance.test.ts` and `tests/setupConformance.test.ts`; `guides/veneer.md`; and
`app/browser/constants.ts` with `tests/app/browser/sections/LayoutSection.test.ts`. The fix round
added `src/styles/_mixins.scss` and `src/styles/components/_grid.scss`, which its brief granted for
extracting a loop preamble the two partials shared. Untracked files under `tmp/` are also expected.
Run no install; no writer is live when you start.

**Write your logs under the checkout's own `tmp/` directory.** The round-1 verifier wrote an
intermediate log outside the checkout entirely; the readings were unaffected, but keep them inside.

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
