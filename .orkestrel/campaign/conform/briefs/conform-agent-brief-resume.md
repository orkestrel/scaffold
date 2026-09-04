# Unit conform-agent — resumption successor to the brief (the first Opus unit was interrupted)

## What changed and why

The `implementer` dispatched on `/home/user/scaffold/tmp/units/conform/conform-agent-brief.md` at 02:07 UTC 2026-09-04 was terminated by the Anthropic session limit (HTTP 429 on `claude-opus-5`, "resets 5:10am (UTC)") after its last message "Now AgentRegistry.ts." It wrote no report. The tree it left in `/home/user/fleet/agent` at 09:29 UTC is uncommitted and partial:

```
 M guides/agent.md
 M src/core/Agent.ts
 M src/core/AgentRegistry.ts
 M src/core/errors.ts
 M src/core/helpers.ts
 M src/core/types.ts
 M tests/guides.test.ts
 M tests/src/core/AgentRegistry.test.ts
 8 files changed, 76 insertions(+), 47 deletions(-)
```

The brief, its addendum, and every rule they cite are unchanged and remain binding. This successor adds only the resumption steps.

## Resumption steps, before any row

1. Read `git status --short` and `git diff` in `/home/user/fleet/agent` in full. Treat every hunk as an unverified proposal from an interrupted writer: for each hunk, name the brief row (or addendum item) it serves, and keep it only where it implements that row's operative repair exactly; correct or complete it otherwise. Never discard a hunk with a git command; undo by editing.
2. Record, in the report's `## Consumer edits taken` and `## Rows` tables, which rows the partial tree already carried and which this resumption completed, so the dispositions are true of the final tree.
3. Then perform the brief from its first unfinished row, in the brief's order, through every gate the brief's § Acceptance criteria names.

## Everything else

As `conform-agent-brief.md` and `conform-agent-brief-addendum.md` state: the addendum's consumer edits first (item 3 reads the landed workflow report at `/home/user/scaffold/.orkestrel/campaign/conform/reports/conform-workflow-report.md` § Breaking and § Shared-file patches and records `noop` where no agent consumer exists), then the rows, the fleet rows, the method, the output (write `/home/user/scaffold/tmp/units/conform/conform-agent-report.md` and return it), the deviation contract, and the acceptance criteria. The standing conditions hold: the closure in `node_modules` is staged on the landed tips and no command rewrites it or the lockfile; the vendored set is off-limits; never `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; never commit or push; every gate reading runs inside your own exec and the Orchestrator takes the deciding run after you exit.
