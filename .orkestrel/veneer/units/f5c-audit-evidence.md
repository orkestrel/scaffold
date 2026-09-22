# F5c TOKENS-TRUTH — audit evidence index

The subject is the worktree `/home/user/veneer-f5c`, detached at `07fc3c3` with the unit's
uncommitted writes plus the Orchestrator's integration of the unit's exact returned patch set for
obligation 4 (the highlight pair): `src/core/constants.ts` (the two `highlight` registry keys
removed), `src/styles/_mixins.scss` (the two `--vn-*-highlight` declarations removed and
`--bs-highlight-color` and `--bs-highlight-bg` bound to the underlying values), and
`guides/veneer.md` § Text and surface (the two rows removed and the paragraph naming the retained
Bootstrap variables added). The unit stopped on that obligation because the registry file was
off-limits; the patch set is the unit's own, applied verbatim.

- `/home/user/scaffold/tmp/audit/f5c-status.txt` — `git status --porcelain` over the subject.
- `/home/user/scaffold/tmp/audit/f5c.diff` — `git diff` against `07fc3c3` (the actual diff).
- `/home/user/scaffold/tmp/audit/f5c-report.md` — the unit's returned report.
- `/home/user/scaffold/tmp/audit/f5c-terrain.md` — the terrain record the brief pointed at.
- `/home/user/veneer-f5c/tmp/units/f5c-brief.md` — the brief the unit ran.
- `/home/user/scaffold/tmp/audit/f5c-gates.log.txt` — the Orchestrator's gate chain over the
  subject worktree, complete when its last line reads `=== gates done`; read it last.

Rulings taken before this round: the § Departures row the report returns for `--vn-link-base` goes
to F5b's ledger (F5b's comparison measures it); the unit's journey timing failure is re-run by the
Orchestrator's gate chain on the worktree and ruled from that log.
