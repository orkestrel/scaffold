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
- The live units, each in its own worktree from Veneer commit `3a9202a` unless named otherwise, are
  in their fix rounds after one audit round each (analyst on Astra, reviewer on Opus, checker on
  Sonnet): `units/b-passive-a-brief-2.md` (`veneer-ba`), `units/b-passive-b-brief-2.md`
  (`veneer-bb`), `units/b-passive-c-brief-2.md` (`veneer-bc`), `units/b-passive-d-brief-2.md`
  (`veneer-bd`), `units/b-passive-e-brief-3.md` (`veneer-be`), `units/b-forms-range-brief-4.md`
  (`veneer-bfr`); B-FORMS-VALIDATION (`veneer-bfv`, round 2 audited, `bfv-fix-2-audit-analyst-verdict.md`)
  and B-SWEEP (`veneer-bsw`, from `aca0423`, `units/b-sweep-brief-3.md` after its audit) land first,
  in that order; F8b SHARED-PREFLIGHT (`veneer-f8b`, from `0783b2b`) is audited and folds into F8c
  SERVICE, whose design round runs on `units/f8c-design-brief.md` under D19. Their audit claims,
  lane briefs, verdicts, and reports sit beside them as each round runs.
- `units/decisions-round-2.md` also carries the Orchestrator's rulings D14 to D22 taken in this
  wave (the ledger's home, the coincidence predicate and its amendment, the import placement, the
  animation-only frame, the module loads, the service proof, the driven-key lists, the flat-fill
  frame, and the multi-key attribution).
- Landing order after B-SWEEP and VALIDATION: B, D, E, A, RANGE, C, each with its ledger merge, the
  Set-literal, `ButtonSection` exclusion, and `CAPTURE_KEYS` spread rewrites as exact integration
  edits, scoped gates, one verifier chain at the family's close, the deciding journey re-run alone,
  the roadmap fold, and the push to `main`.
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
