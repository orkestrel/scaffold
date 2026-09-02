# Unit voice-ndjson — successor brief (re-run after the container restart)

Supersedes `voice-ndjson-brief.md` for this launch. Every section of that brief and of the shared
brief `.orkestrel/campaign/fix/tsdoc-wave-brief.md` binds unchanged except the clause amended
here.

## What changed and why

The first run of this unit was killed by a container restart before it reported. It left a
partial sweep in the tree: `git diff --stat` shows `src/core/NDJSONParser.ts`,
`src/core/factories.ts`, and `src/core/types.ts` with comment-line changes and nothing else.
The original brief's "committed clean at launch" no longer holds.

## Amended standing condition

- The tree at `/home/user/fleet/ndjson` carries that partial sweep, uncommitted, at commit
  `73a203b`. Read `git diff` first. Those rewrites are yours to keep, correct, or redo; the unit
  finishes the whole sweep from that state and reports on the whole diff, not only on the lines
  it adds. Do not revert the partial edit with a discarding `git` command; where a rewrite is
  wrong, edit it.
