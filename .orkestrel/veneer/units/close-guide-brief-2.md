# Unit CLOSE-GUIDE — successor brief 2

## What changed and why

The first run of `close-guide-brief.md` (`opus` on Opus 5.5 in `/home/user/veneer-cg`) was stopped
by a session interrupt at 2026-09-23 12:01:50 UTC while it was rewrapping the guide; it is not a
deviation and not a permission denial, and it left no report and no sweep ledger. The worktree
keeps its uncommitted edits: `guides/veneer.md`, `tests/guides.test.ts`, and
`tests/src/styles/integration.test.ts` (last written 12:01; the diff against `88684bc` is retained
as `/home/user/scaffold/.orkestrel/veneer/units/cg-1-partial.diff` with `cg-1-partial-status.txt`).
Nothing else touched the worktree. This successor completes the unit from that state.

## Instruction

Read `/home/user/scaffold/.orkestrel/veneer/units/close-guide-brief.md` whole, then the design
verdict and the terrain it names, and execute it exactly, with these additions:

1. Start by reading the diff `git -C /home/user/veneer-cg diff 88684bc` and checking each of the
   original brief's criteria and rulings (R1, R4, R5, R6, R7, R9, R10 of the design verdict)
   against the current text of the three files. Keep every edit that satisfies a ruling; finish or
   correct the rest. Do not restart from `88684bc` and do not use `git checkout`, `git restore`,
   `git stash`, `git reset`, or `git clean` to discard anything; undo an edit only by editing it.
2. The rewrap in progress: code spans must not split across lines (the run's last action). Finish
   that pass over the sections you rewrote, then take the post-edit measurements the brief names.
3. Run the scoped gates the brief names and record each command with its exit.
4. Write `/home/user/veneer-cg/tmp/units/cg-report.md` and `/home/user/veneer-cg/tmp/units/cg-sweep.md`
   as the original brief's Output section specifies, and return the report's content as your final
   message.

Everything else in the original brief stands: the owned files, the report-only files, the
off-limits files, the deviation contract, and the acceptance criteria. Work directly and spawn
nothing. Run `export PATH="/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/npm11/node_modules/.bin:$PATH"`
first in every shell. No commit, push, or install.
