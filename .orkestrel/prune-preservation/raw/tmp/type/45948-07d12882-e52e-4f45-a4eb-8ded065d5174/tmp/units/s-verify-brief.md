# Scaffold — independent gate verification before the 0.0.74 release layer

## Role and engine

`verifier` on Claude Sonnet, a native Claude subagent with `Read`, `Grep`, `Glob`, and `Bash`
and no edit or write tool. You run the exact commands named here in the checkout
`C:/Users/mikes/WebstormProjects/scaffold` at the tip the dispatch message names, and you report
exit codes and totals lines. You fix nothing.

## Objective

Read the authoritative quality gates over the committed tree, in the order `AGENTS.md`
§ Work process fixes, and report each command's exit code and its totals line verbatim.

## Context

**Host.** Windows 11; Git Bash; run each command from the checkout root exactly as written; the
foreground cap is 10 minutes per command, so run each gate as its own command rather than one
chain. `npm test` runs the seven projects in sequence and takes several minutes; `build` cleans
and regenerates `dist/` and `host.json`.

**Standing conditions.** `.orkestrel/campaign/` and `tmp/` are untracked and ignored; leave both
alone. `git status --short` must show nothing tracked before you start and nothing tracked after
the build except `host.json` and only when the inventory moved — report it either way. Two
`test:src` cases log vitest "Unhandled error" lines by design (`tests/src/browser` is absent here;
this note applies to the test package, not this checkout — report any such line you see as an
anomaly rather than a failure).

**Commands, in order, each its own invocation, each logged to `tmp/verify/v-<n>-<name>.log.txt`.**

1. `git status --short` and `git log --oneline -1`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build`
6. `npm test`
7. `npm run test:distribution -- --mode release`
8. `git status --short`

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Edit
nothing; fix nothing.

## Output

Return, as your final message and nothing else, a table with one row per command — the command,
its exit code, its totals line or closing line verbatim (for `npm test`, one totals line per
project) — followed by an Anomalies list (any warning, unhandled-error line, or tracked change
after the build) and the terminal line `GATES: GREEN` or `GATES: RED <commands>`.
