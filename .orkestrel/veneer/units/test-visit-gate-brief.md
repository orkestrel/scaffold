# Unit test-visit-gate — authoritative gates for the Test checkout after the 0.0.76 re-pin

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Test checkout (`@orkestrel/test`), re-pinned to scaffold `0.0.76` with its
vendored files repaired and its mirror refreshed, passes its full gate chain, including the
`test:setup:browser` project the manifest now declares.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/test`. The working tree is dirty on purpose: the
re-pin (`package.json`, `package-lock.json`), the declared script and its chain (`package.json`),
the repaired planned paths (`vite.config.ts`, `configs/browsers.ts`, `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`), and the catalog refresh
(`.claude/agents/orkestrel.md`, `guides/scaffold.md`); untracked files under `tmp/`. `node_modules`
carries the registry's scaffold `0.0.76`. No writer is live. Run no install.

**Host.** Windows, Git Bash. Run every command from that checkout with `npm run <name>`. Edge
runs through `PLAYWRIGHT_CHANNEL=msedge`. `test:distribution -- --mode release` packs and installs
into a temporary consumer and needs the registry. Run `npm test` as a background command writing
to a log under the checkout's `tmp/` directory and poll it until it ends.

## Scope

**Owned.** Nothing. **Off-limits.** Every file. **Tools.** `Bash` for the commands named, `Read`
for their logs.

## Execution

Perform the assignment directly and spawn nothing. Run, in this order, stopping for nothing, and
capture each command's last twelve lines:

1. `git status --porcelain | grep -v '^??'`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build`
6. `npm test` (the whole chain; it must reach `test:setup:browser`)
7. `PLAYWRIGHT_CHANNEL=msedge npm run test:src:browser`
8. `PLAYWRIGHT_CHANNEL=msedge npm run test:setup:browser`
9. `npm run test:distribution -- --mode release`
10. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .`
11. `git status --porcelain | grep -v '^??'` again

Write nothing into the checkout except the test log under `tmp/`.

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
