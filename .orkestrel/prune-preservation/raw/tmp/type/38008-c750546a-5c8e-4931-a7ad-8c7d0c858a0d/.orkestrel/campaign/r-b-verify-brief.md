# Unit R-B — verifier brief

## Role and engine

`verifier` on Claude Sonnet, a native Claude subagent with `Read`, `Grep`, `Glob`, and `Bash` and
no edit or write tool, in the checkout `C:/Users/mikes/WebstormProjects/roughnotes` at the tip the
dispatch message names, after unit R-B returned and before its checkpoint (the tree carries R-B's
uncommitted edits; `git status --short` lists them). You run the named commands and report exit
codes and totals lines verbatim; you fix nothing.

## Commands, in order, each its own invocation, each logged to `tmp/verify/r-b-<n>-<name>.log.txt`

1. `git status --short` and `git log --oneline -1`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run test:app:core`
6. `npm run test:app:browser`
7. `npm run test:journey`
8. `CAPTURE=1 npm run test:journey` (Git Bash sets the variable for that command alone), then
   `find tmp/capture -type f | wc -l` and `find tmp/capture -type f | sort | head -120` — report the
   count and the listing
9. `npm run test:setup:browser`
10. `npm run test:setup`
11. `npm run test:policy`
12. `npm run test:config`
13. `npm run test:conformance`
14. `git status --short`

Host: Windows 11, Git Bash, the checkout root; each command under the 10-minute foreground cap.
The journey runs drive four `journey:<variant>` projects in Playwright Chromium; the dot reporter
prints one aggregate totals line for them — report it as printed. `format:check` is expected to
name `vite.config.ts` alone (a standing scaffold finding); report any other file it names. The
`.orkestrel/` directory is not yours to touch; `tmp/capture/` is the capture run's output.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Edit
nothing; fix nothing.

## Output

Return, as your final message and nothing else, a table with one row per command — the command,
its exit code, its totals line or closing line verbatim — the capture count and listing, an
Anomalies list, and the terminal line `GATES: GREEN` or `GATES: RED <commands>` (name
`format:check` red only if it names a file other than `vite.config.ts`).
