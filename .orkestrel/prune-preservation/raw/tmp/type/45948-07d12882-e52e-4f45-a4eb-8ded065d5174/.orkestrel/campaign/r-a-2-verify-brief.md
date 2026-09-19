# Unit R-A-2 — verifier brief

## Role and engine

`verifier` on Claude Sonnet, a native Claude subagent with `Read`, `Grep`, `Glob`, and `Bash` and
no edit or write tool, in the checkout `C:/Users/mikes/WebstormProjects/roughnotes` at the tip the
dispatch message names, after unit R-A-2 returned and before its checkpoint (the tree carries R-A's
uncommitted edits; `git status --short` lists them). You run the named commands and report exit
codes and totals lines verbatim; you fix nothing.

## Commands, in order, each its own invocation, each logged to `tmp/verify/r-a-2-<n>-<name>.log.txt`

1. `git status --short` and `git log --oneline -1`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run test:app:browser`
6. `npm run test:journey`
7. `npm run test:policy`
8. `npm run test:config`
9. `git status --short`

Host: Windows 11, Git Bash, the checkout root; each command under the 10-minute foreground cap.
The `test:journey` run drives four `journey:<variant>` projects in Playwright Chromium; report each
project's totals line. The `.orkestrel/` and `tmp/` directories are not yours to touch.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Edit
nothing; fix nothing.

## Output

Return, as your final message and nothing else, a table with one row per command — the command,
its exit code, its totals line or closing line verbatim — followed by an Anomalies list and the
terminal line `GATES: GREEN` or `GATES: RED <commands>`.
