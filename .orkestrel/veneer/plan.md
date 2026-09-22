# Veneer execution plan

The executable plan of record is the `ROADMAP.md` file in the Veneer checkout at
`/home/user/veneer`, on branch `claude/inspiring-allen-t4qzv1` of
`https://github.com/mikesaintsg/veneer`. Read that file first. It carries the tenets verbatim, the
standing and design rulings, the routing, the standing host conditions, the exit criterion, the
phase queue with its family keys, the carrier register, and the open decisions.

This folder keeps only what the open units still read; git history archives every closed round:

- `tenets.txt` is the judging standard for the design and every implementation unit.
- `units/decisions-round-2.md` carries the user's rulings D2 to D13 verbatim.
- `veneer-audit-verdict.md` and `cl13-verdict.md` are the verdicts the F5c, F6, and F7 briefs cite.
- `units/f5-terrain-report.md`, `units/f6-terrain-report.md`, and `units/f7-terrain-report.md`
  are the terrain records the queued briefs point at, with
  `units/f5-plan.md`, `units/value-gap-probe.mjs`, and `units/cl13-portfolio-observations.md`.
- `units/f5b-brief.md`, `units/f5c-brief.md`, `units/f6-brief.md`, and `units/f7-brief.md` are the
  live units, each in its own worktree from Veneer commit `07fc3c3`, with their audit claims and
  lane briefs beside them.

A unit's report, audit lanes, verdict, instruments, and gate evidence are retained here while it
runs and pruned in the commit that follows its acceptance, with the promotion record in that
commit's message.
