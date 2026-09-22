# F5d PHYSICAL — audit evidence index

Every path is relative to the Veneer checkout at `/home/user/veneer`, whose working tree is the
subject (the F5d unit's writes plus the Orchestrator's integration of the unit's exact returned
patches to `tests/distribution.test.ts`, `tests/app/browser/integration.test.ts`,
`configs/src/vite.styles.config.ts`, and the guide rows the report lists under "Shared and
off-limits patches").

- `tmp/audit/f5d-status.txt` — `git status --porcelain` over the subject tree.
- `tmp/audit/f5d.diff` — `git diff` over the subject tree (the actual diff).
- `tmp/audit/f5d-report.md` — the unit's returned report.
- `tmp/audit/f5d-terrain.md` — the terrain record the brief pointed at.
- `tmp/units/f5d-brief.md` — the brief the unit ran.
- `tmp/audit/f5d-gates.log.txt` — the Orchestrator's authoritative gate chain over the subject
  tree. It is being written while the lanes run and is complete when its last line reads
  `=== gates done`; read it last, and rule on a gate claim only from a complete log.

Rulings the Orchestrator took on the report's findings before this round: finding 1 (the
`overflow-inline` to `overflow-x` change) stands under D11; finding 2 (the `_body.scss`
`text-align` fallback) is carried by unit F5b with a file grant, not by this round; finding 3's
patches are applied in the subject tree.
