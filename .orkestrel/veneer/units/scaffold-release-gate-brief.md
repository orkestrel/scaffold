# Unit scaffold-release-gate — authoritative gates for the vendored-only release

## Role and engine

`verifier` on native Sonnet. You are a native subagent: perform the assignment directly and spawn
nothing. You run the commands named here, read their output, and report exit codes with exact
failure excerpts. You edit nothing and fix nothing.

## Objective

Report whether the scaffold checkout at its committed tip passes its full gate chain, so the
vendored-only release can be bumped and published.

## Context

**Checkout.** `C:/Users/mikes/WebstormProjects/scaffold` at commit `307516e7` (`git log --oneline
-1`). The tracked tree is clean: `git status --porcelain | grep -v '^??'` prints nothing; untracked
files under `tmp/`, `prompt.txt`, and `tenets.txt` are expected. `node_modules` is installed.

**Host.** Windows, Git Bash. Run every command from that checkout with `npm run <name>`. The
`build` script regenerates `dist/` and `host.json`; after it `host.json` must be unchanged
(`git diff --stat -- host.json` prints nothing).

**A known flake outside this unit.** `test:config` has one case (`rolls one face into a single
declaration…`, `tests/config.test.ts` near line 2535) that reads the operating system's temporary
directory and reddens while another checkout is building. A writer is live in the Veneer checkout
beside this one. Report the red as a reading with its excerpt; do not re-run it yourself.

## Scope

**Owned.** Nothing. **Off-limits.** Every file. **Tools.** `Bash` for the commands named, `Read`
for their logs.

## Execution

Perform the assignment directly and spawn nothing. Run, in this order, stopping for nothing (a red
gate is a reading, not a reason to stop), and capture each command's last twelve lines. The whole
chain can take longer than ten minutes: run `npm test` as a background command writing to a log
under the scaffold `tmp/` directory and poll that log until it ends.

1. `git log --oneline -1` and `git status --porcelain | grep -v '^??'`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build`
6. `npm test` (the whole chain)
7. `git status --porcelain | grep -v '^??'` again, and `git diff --stat -- host.json`
8. `node -e "const p=require('./package.json');console.log(p.version, JSON.stringify(p.engines))"`

Write nothing into the checkout except the `npm test` log under `tmp/`.

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
