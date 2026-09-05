# Unit docs-proposal-verify — the authoritative gates over the tree with `PROPOSAL.md` present

## Role and engine

`verifier` on Sonnet, a native Claude Code subagent. Perform the assignment directly and spawn nothing. Run exactly the commands named; fix nothing.

## Objective

Report exit-code truth for the gates a Markdown-only change can affect, over the whole tree at its current state (`PROPOSAL.md` untracked at the root; `.orkestrel/campaign/docs-proposal/` partly untracked).

## Commands, in order

1. `npm run format:check`
2. `npm run lint:check`
3. `git diff --check` (after `git add -N PROPOSAL.md` so the untracked file is included; `git add -N` is the only staging permitted)
4. `npx oxfmt --config .oxfmtrc.json --check PROPOSAL.md`

## Host

`/home/user/scaffold`, bash. No network. No install, no build, no test run beyond the commands named.

## Output

For each command: the exact command, its exit code, and the last three lines of its output. Then `GATES: GREEN` if every exit code is 0, else `GATES: RED <command numbers>`.
