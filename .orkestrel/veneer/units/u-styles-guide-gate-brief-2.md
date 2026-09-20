# Unit U-styles-guide-gate 2 — the gates a guide section reaches, after brief 2

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Veneer checkout, with the uncommitted U-styles-guide change in its working tree
(`guides/veneer.md`, `guides/README.md`), passes the gates that read the guides and the whole
chain.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/veneer`, HEAD `fbbda43`. The working tree is dirty
on purpose: the two guide files, plus untracked files under `tmp/`. `node_modules` carries
`@orkestrel/scaffold` 0.0.76 from the registry and the `@orkestrel/test` 0.0.18 tarball installed
`--no-save`; run no install. No writer is live. `scaffold audit` is expected to print a `setup`
question for `tests/setupListeners.ts` and three advisory `dependencies` lines and exit 0; report
what it prints.

**Host.** Windows, Git Bash. Run every command from that checkout with `npm run <name>`. The
whole chain can exceed ten minutes: run `npm test` as a background command writing to a log under
the checkout's `tmp/` directory and poll that log until it ends.

## Scope

**Owned.** Nothing. **Off-limits.** Every file. **Tools.** `Bash` for the commands named, `Read`
for their logs.

## Execution

Perform the assignment directly and spawn nothing. Run, in this order, stopping for nothing, and
capture each command's last twelve lines:

1. `git status --porcelain | grep -v '^?? tmp/'` and `git log --oneline -1`
2. `npm run format:check`
3. `npm run test:guides`
4. `npm run test:policy`
5. `npm run build`
6. `npm test` (the whole chain)
7. `node node_modules/@orkestrel/scaffold/dist/bin/main.js audit --target .` (read-only)
8. `git status --porcelain | grep -v '^?? tmp/'` again

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
