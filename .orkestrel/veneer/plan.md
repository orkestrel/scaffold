# Veneer execution plan

The executable plan of record is the `ROADMAP.md` file in the Veneer checkout at
`/home/user/veneer`, on branch `claude/inspiring-allen-t4qzv1` of
`https://github.com/mikesaintsg/veneer`, pushed to `main` at every gated landing. Read that file
first. It carries the tenets verbatim, the standing and design rulings, the routing, the standing
host conditions, the exit criterion, the phase queue with its family keys, the carrier register, and
the open decisions. Read the live state from the runs that recompute it (`git log` in each
repository, the conformance run, the gate chain), never from this file.

This folder keeps only what the open units read. Git history archives every closed round, and each
prune commit's message is the promotion record for what that commit removed.

## What the folder holds

- `f8-design-verdict.md` (amended by `f8c-design-verdict.md`), `b-passive-design-verdict.md`,
  `b-sweep-design-verdict.md`, and `b-forms-design-verdict.md` are the design rulings the live
  units execute. `units/decisions-round-2.md` carries the user's rulings D2 to D13 verbatim and the
  Orchestrator's rulings from D14 on. `units/b-passive-family.md` and `units/b-passive-baseline.md`
  bind every B unit. `units/b-forms-terrain-report.md`, `units/f8-terrain-report.md`,
  `units/f8-terrain-3-report.md`, and the `units/f8-tailwind-intersection.*` measurement are the
  terrain records the open briefs point at.
- A live or unlanded unit's brief, report, audit claims, lane briefs, lane verdicts, round verdicts,
  launchers, diffs, status files, plant instruments, and logs sit under `units/` by unit prefix
  (`b-forms-<key>-*` for the writing unit and `bf<letter>-*` for its audit rounds; `f8b-*` and
  `f8c-*` for the F8 SERVICE line) until the unit lands on Veneer `main`, and the prune commit that
  follows the landing removes them.
- The landing instruments: `units/land-unit.sh` (diff3 through `units/resolve-diff3.py`,
  `units/resolve-hunks.py`, and `units/resolve-files-table.py`), `units/sort-inventories.py` (sorted
  literal arrays and the shipped-key Set), `units/regen-portfolio.sh`, each landing's
  `units/verify-<unit>.sh` chain and `units/fold-<n>.py` roadmap fold while that landing is open,
  and `units/codex-queue-2.sh` (the bench launcher queue; each lane launcher under `tmp/codex/` is a
  copy of the retained `units/<unit>-audit-analyst.sh`).
- `units/x-retention-carry-brief.md` and `units/x-retention-carry-distillate.md` are the carry
  register X-RETENTION reads.

## Landing procedure

Run `units/land-unit.sh` (the worktree commits on `unit/<u>` and cherry-picks onto the session
branch; a conflict takes `git merge-file --diff3` and `units/resolve-diff3.py`), then
`units/sort-inventories.py`, the unit's integration edits, and the ledger merge; then the
verification sequence (the refresh loop, the portfolio regeneration per variant with the plain
journey, the authoritative chain); then the roadmap fold, the push of the session branch, and the
push to `main` after the chain is green. The regeneration precedes the chain because the portfolio
guard requires every registered frame whenever any frame is present. F8c lands as one squashed
commit from `unit/f8b` (`commit-tree` over the worktree's tree with parent `0783b2b`, tagged
`land/f8c`), cherry-picked the same way.

## Process corrections (2026-09-23, the conventions audit)

- A fix round runs both lanes on its claims file (`analyst` on Astra and `reviewer` on Opus, blind),
  at least one on an engine that did not write the round; a single-lane fix audit is a deviation.
- The landing chain is the verifier's evidence, never a lane claim: a claims file carries no "Gates"
  claim; a lane runs the scoped command it can run and reports its exit code as evidence for the
  claim that names it.
- A reviewer lane's targets are numbered claims in the round's shared claims file, never a
  "beyond the claims" paragraph in the lane brief.
- A brief's Evidence and Measurements rows paste the command and its output; a derivation is an
  Unknown the unit measures first.
- A file sits in one Scope row: Shared means the unit returns a patch, so a shared file is not also
  off-limits.
- A retained artifact names retained paths in full (`/home/user/scaffold/.orkestrel/veneer/units/…`);
  the journal and last-message paths stay under `tmp/codex/` as the launch record.
- The round verdict's terminal line keeps the fixed shape; referral routing and settlements sit in
  the body. A round accepts on a PASS terminal line after reconciliation drops the claims-file
  faults on the record; a FAIL that stands needs a fix round.
- An Orchestrator ruling appended to a lane's returned verdict is a defect: the ruling goes to the
  round verdict file, and the lane file stays as returned.
- A claims file states the rules' requirements and nothing beyond them: the 100-column bar on prose
  and comments is not a house gate (oxfmt preserves prose wrap and does not reflow comments, base
  lines exceed it, and no rule states it), so it leaves the claims files; a rewrap rides a round
  that already edits the paragraph and never opens a round by itself.
- A claims file or lane brief that cites a pruned record names it by its history path
  (`git -C /home/user/scaffold show <prune-commit>~1:.orkestrel/veneer/units/<file>`), never by the
  working-tree path the prune removed; a lane cannot check a citation that resolves to nothing.
