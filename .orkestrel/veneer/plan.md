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
- `f8-design-verdict.md` (amended by `f8c-design-verdict.md`), `b-passive-design-verdict.md`,
  `b-sweep-design-verdict.md`, and `b-forms-design-verdict.md` are the
  design rulings the live units execute; `units/b-passive-family.md` and
  `units/b-passive-baseline.md` bind every B unit, and `units/b-forms-terrain-report.md`,
  `units/b-passive-terrain-report.md`, and `units/f8-terrain-report.md` are the terrain records
  their briefs point at.
- The live B-FORMS units, each in its own worktree from Veneer `main` (`2c10329`) with its own
  `node_modules`: B-FORMS-GROUP (`veneer-bfg`, `units/b-forms-group-brief.md`, `opus`) and
  B-FORMS-CHECK (`veneer-bfc`, `units/b-forms-check-brief.md`, `opus`), in parallel; each is audited
  (`analyst` on Astra, `reviewer` on Opus, `checker` where mechanical) and landed serially through
  the landing procedure recorded later in this file.
- The live unit: F8c-B MOVE (`veneer-f8b`, `units/f8c-b-brief.md`, `opus`, dispatched from the
  checkpoint `b9c0b0a` that holds F8c-A READERS as accepted after its round-3 audit,
  `units/f8c-a-fix-3-audit-verdict.md`); it carries D24 (the forbidden-runtime scan's exemption for
  the service tree) and the round-3 claim 8 (readiness refuses a remote endpoint). Its audit
  (`analyst` on Astra and `reviewer` on Opus), the Orchestrator's chain in the worktree, and the
  landing of F8c on `main` follow. Their audit claims, lane briefs, verdicts, and reports sit
  beside them as each round runs.
- `units/decisions-round-2.md` carries the user's rulings D2 to D13 verbatim.
- `f8-design-verdict.md` (amended by `f8c-design-verdict.md`), `b-passive-design-verdict.md`,
  `b-sweep-design-verdict.md`, and `b-forms-design-verdict.md` are the
  design rulings the live units execute; `units/b-passive-family.md` and
  `units/b-passive-baseline.md` bind every B unit, and `units/b-forms-terrain-report.md`,
  `units/b-passive-terrain-report.md`, and `units/f8-terrain-report.md` are the terrain records
  their briefs point at.
- The live units: B-PASSIVE-A (`veneer-ba`, `units/b-passive-a-brief-3.md`, fix-audited,
  `units/ba-fix-3-audit-verdict.md`) landed on the session branch as `8281b79` with its integration
  edits (`units/ba-integration-edit.py`, the D22 regroup `units/ba-ledger-regroup.py`) and is under
  its verification sequence (`units/verify-ba.sh`: refresh, portfolio regeneration, chain) before
  fold 19 and the push to `main`. F8c SERVICE under D19: F8c-A READERS was audited
  (`units/f8c-a-audit-verdict.md`), D23 amended rulings 1 and 3, the Orchestrator regenerated the
  root configuration (checkpoint `5099318`, `units/f8c-repair.log.txt`), and the fix round
  `units/f8c-a-brief-3.md` runs on `opus`; its audit (`analyst` on Astra,
  `units/f8c-a-fix-3-audit-analyst-brief.md`) and the deciding `test:setup` re-run follow, then
  F8c-B MOVE. Their audit claims, lane briefs, verdicts, and reports sit beside them as each round
  runs.
- `units/decisions-round-2.md` carries the user's rulings D2 to D13 verbatim.
- `f8-design-verdict.md` (amended by `f8c-design-verdict.md`), `b-passive-design-verdict.md`,
  `b-sweep-design-verdict.md`, and `b-forms-design-verdict.md` are the
  design rulings the live units execute; `units/b-passive-family.md` and
  `units/b-passive-baseline.md` bind every B unit, and `units/b-forms-terrain-report.md`,
  `units/b-passive-terrain-report.md`, and `units/f8-terrain-report.md` are the terrain records
  their briefs point at.
- The live units, each in its own worktree from Veneer commit `3a9202a` unless named otherwise,
  have returned from their fix rounds and are under their fix audits (`analyst` on Astra alone,
  the writer having been Opus): `units/b-passive-a-brief-3.md` (`veneer-ba`, claims
  `units/ba-fix-3-audit-claims.md`), `units/b-passive-c-brief-3.md` (`veneer-bc`, claims
  `units/bc-fix-3-audit-claims.md`); B-FORMS-RANGE (`veneer-bfr`, `units/b-forms-range-brief-5.md`)
  is audited and lands next; B-PASSIVE-E landed on the session branch as `70a7487` (its cascade
  rows moved back into `CASCADE_KEYS` after the merge misplaced them; `units/resolve-diff3.py`
  carries the rule) and folds to `main` under its chain. F8b SHARED-PREFLIGHT (`veneer-f8b`,
  checkpointed at `d9c03a2`) folded into F8c SERVICE under D19: F8c-A READERS
  (`units/f8c-a-brief.md`, `f8c-a-brief-2.md`, report `units/f8c-a-report.md`) is under audit
  (`analyst` on Astra, `reviewer` on Opus; claims `units/f8c-a-audit-claims.md`); the Orchestrator
  regenerates the root configuration next, then dispatches F8c-B MOVE. Their audit claims, lane
  briefs, verdicts, and reports sit beside them as each round runs.
- `units/decisions-round-2.md` carries the user's rulings D2 to D13 verbatim.
- `f8-design-verdict.md` (amended by `f8c-design-verdict.md`), `b-passive-design-verdict.md`,
  `b-sweep-design-verdict.md`, and `b-forms-design-verdict.md` are the
  design rulings the live units execute; `units/b-passive-family.md` and
  `units/b-passive-baseline.md` bind every B unit, and `units/b-forms-terrain-report.md`,
  `units/b-passive-terrain-report.md`, and `units/f8-terrain-report.md` are the terrain records
  their briefs point at.
- The live units, each in its own worktree from Veneer commit `3a9202a` unless named otherwise, are
  in their fix rounds after one audit round each (analyst on Astra, reviewer on Opus, checker on
  Sonnet): `units/b-passive-a-brief-2.md` (`veneer-ba`), `units/b-passive-b-brief-2.md`
  (`veneer-bb`), `units/b-passive-c-brief-2.md` (`veneer-bc`), `units/b-passive-d-brief-2.md`
  (`veneer-bd`), `units/b-passive-e-brief-3.md` (`veneer-be`), `units/b-forms-range-brief-4.md`
  (`veneer-bfr`); B-SWEEP and B-FORMS-VALIDATION have landed on the session branch; F8b SHARED-PREFLIGHT (`veneer-f8b`, checkpointed at `d9c03a2`) is audited and folds into F8c
  SERVICE under D19: `f8c-design-verdict.md` reconciles the two design lanes into F8c-A READERS
  (`units/f8c-a-brief.md`, live) and F8c-B MOVE, with the root configuration regenerated by the
  Orchestrator between them. Their audit claims,
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
  the prune commit: the whole passive family — B-PASSIVE-D (`bcf938c`, fold 14 at `06eb3c1`), B
  (`7b922b6`, fold 15 at `16b2590`), E (`70a7487`, fold 16 at `7981fd1`), C (`6cce83f`, fold 18 at
  `808cf53`), A (`62ff1a6`, fold 19 at `2c10329`), and B-SWEEP (`71b7388`) — with B-FORMS-VALIDATION
  (`d4f78e5`, fold 13 at `e0d04ba`), B-FORMS-RANGE (`376255a`, fold 17 at `49548e2`), and J1
  JOURNEY-BUDGET (`fc228f2`); every landed worktree is removed and `veneer-f8b` alone remains.
- Landing procedure as run from E on: `units/land-unit.sh` (diff3 with `units/resolve-diff3.py`),
  the inventory sorter `units/sort-inventories.py` (sorted literal arrays and the shipped-key Set),
  the unit's integration edits, the ledger merge, then the verification sequence (refresh loop,
  portfolio regeneration per variant with the plain journey, the authoritative chain), the roadmap
  fold, and the push. The regeneration precedes the chain because the portfolio guard requires
  every registered frame once any frame is present.
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
