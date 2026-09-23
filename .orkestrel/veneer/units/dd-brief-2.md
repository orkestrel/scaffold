# Unit DROPDOWN (`dd`) — successor brief 2

## What changed and why

The first run of `b-collapse-dd-brief.md` (`opus` on Opus 5 in `/home/user/veneer-dd`) was stopped by a
container restart at 2026-09-23 13:06 UTC; it is not a deviation and not a permission denial, and
it left no report. The worktree keeps its uncommitted edits (`git -C /home/user/veneer-dd status
--short` lists them; a unit that had written nothing yet starts from `87ff1d0` unchanged). This
successor completes the unit from that state.

## Instruction

Read `/home/user/scaffold/.orkestrel/veneer/units/b-collapse-dd-brief.md` whole (its copy sits at
`/home/user/veneer-dd/tmp/units/dd-brief.md`), then the family record, the design verdict, and
the terrain it names, and execute it exactly. Start by reading `git diff` and `git status` in the
worktree and checking each file already written against the brief; keep every edit that satisfies
the brief, finish or correct the rest, and do not restart from scratch or discard anything with
`git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`. Everything else in the
original brief stands: the owned files, the report-only files, the off-limits files, the deviation
contract, the acceptance criteria, and the report at `/home/user/veneer-dd/tmp/units/dd-report.md`
returned as the final message.
