# Unit U3-policy-gate — authoritative gates for the scaffold policy change

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the scaffold checkout, with the uncommitted policy change in its working tree,
passes its full gate chain.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/scaffold`. The working tree is dirty on purpose:
`git status --porcelain` lists `.claude/rules/styles.md`, `guides/scaffold.md`, `host.json`,
`tests/policy.test.ts`, `tests/setupPolicy.ts`, plus untracked files under `.orkestrel/` and
`tmp/`, and nothing else tracked. `node_modules` is installed.

**Host.** Windows, Git Bash. Run every command from that checkout with `npm run <name>`. The
`build` script regenerates `dist/` and `host.json`; after it `host.json` must match what the
tree already carries (`git diff --stat -- host.json` reads the same before and after).

## Scope

**Owned.** Nothing. **Off-limits.** Every file. **Tools.** `Bash` for the commands named, `Read`
for their logs.

## Execution

Perform the assignment directly and spawn nothing. Run, in this order, stopping for nothing (a red
gate is a reading, not a reason to stop), and capture each command's last twelve lines:

1. `git status --porcelain` (tracked lines only: pipe through `grep -v '^??'`)
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build`
6. `npm test` (the whole chain)
7. `git status --porcelain | grep -v '^??'` again, and `git diff --stat -- host.json`
8. `node -e "const p=require('./package.json');console.log(p.version, JSON.stringify(p.engines))"`

Write nothing into the checkout. Keep each command's output in your context only as far as the
report needs it.

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
