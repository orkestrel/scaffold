# Veneer execution plan

The executable plan of record is the `ROADMAP.md` file in the Veneer checkout at
`/home/user/veneer`, on branch `claude/inspiring-allen-t4qzv1` of
`https://github.com/mikesaintsg/veneer`, pushed to `main` at every gated landing. Read that file
first. It carries the tenets verbatim, the standing and design rulings, the routing, the standing
host conditions, the exit criterion, the phase queue with its family keys, the carrier register, and
the open decisions.

This folder keeps only what the open units still read; git history archives every closed round:

- `tenets.txt` is the judging standard for the design and every implementation unit.
- `units/decisions-round-2.md` carries the user's rulings D2 to D13 verbatim.
- `f8-design-verdict.md`, `b-passive-design-verdict.md`, and `b-forms-design-verdict.md` are the
  design rulings the live units execute; `units/b-passive-family.md` and
  `units/b-passive-baseline.md` bind every B unit, and `units/b-forms-terrain-report.md`,
  `units/b-passive-terrain-report.md`, and `units/f8-terrain-report.md` are the terrain records
  their briefs point at.
- The live units, each in its own worktree from Veneer commit `3a9202a`: `units/b-passive-a-brief.md`
  through `units/b-passive-e-brief.md` (worktrees `veneer-ba` to `veneer-be`),
  `units/b-forms-validation-brief.md` (`veneer-bfv`), `units/b-forms-range-brief.md`
  (`veneer-bfr`), and `units/f8b-brief.md` (F8b SHARED-PREFLIGHT in `veneer-f8b`, from `0783b2b`),
  with their audit claims, lane briefs, and verdicts beside them as each round runs.
- Closed on the session branch and on `main`, their artifacts pruned with a promotion record in
  the prune commit: F8a (`0783b2b`), L1 (`ec816c5`), F5b, F5c, F6, F7, F5d, F5e, F5a, F4, F3, and
  the Test releases; `veneer-audit-verdict.md` and `cl13-verdict.md` are the verdicts those briefs cited.
- Queued: B-FORMS GROUP, CHECK, FLOATING, CONTROL,
  SELECT, and CLOSE in the landing order the B-FORMS verdict fixes; F7b CAPTION-SPECIMEN after the
  B-PASSIVE integration; B-COLLAPSE through B-CROSS per the roadmap's family queue; then
  P1 SCAFFOLD-PROPAGATE, X-EXIT, and X-RETENTION.

A unit's report, audit lanes, verdict, instruments, and gate evidence are retained here while it
runs and pruned in the commit that follows its acceptance, with the promotion record in that
commit's message.
