# Unit U1-conform-gate 5 — the gates a doc-block rewrap can reach

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the Veneer checkout, after brief 6 rewrapped one doc-block tag in
`tests/setupConformance.ts` on top of the tree `units/u1-conform-gate-report-4.md` proved green,
still passes the gates that read that file.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/veneer`, HEAD `d8b0e65`, the U1-conform change
uncommitted on purpose (the round-4 report's status plus nothing). `node_modules` carries
`@orkestrel/scaffold` 0.0.76 from the registry and the `@orkestrel/test` 0.0.18 tarball installed
`--no-save`; run no install. No writer is live.

**Host.** Windows, Git Bash. Run every command from that checkout with `npm run <name>`.

## Scope

**Owned.** Nothing. **Off-limits.** Every file. **Tools.** `Bash` for the commands named.

## Execution

Perform the assignment directly and spawn nothing. Run, in this order, stopping for nothing, and
capture each command's last twelve lines:

1. `git status --porcelain | grep -v '^?? tmp/'`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run test:setup`
6. `npm run test:conformance`
7. `npm run test:distribution`
8. `git status --porcelain | grep -v '^?? tmp/'` again

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
