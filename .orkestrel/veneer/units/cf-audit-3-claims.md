# Audit claims — FADE (`cf`), round 3

Subject: round 3's record — the shared patch `cf-shared-3.patch` (against `42fd88e`, superseding
`cf-shared-2.patch` whole), the interdiff `cf-instruments/cf-3-interdiff.txt`, the report
`b-cross-cf-report-3.md`, and the gate logs `cf-instruments/cf-3-gates.log.txt` and `cf-3-gate-*` —
against the successor brief `b-cross-cf-brief-3.md` (F-e) and the round-2 verdict `cf-audit-2-verdict.md`.

1. **F-e.** The interdiff of `cf-shared-3.patch` against `cf-shared-2.patch` deletes the clause "as on
   every inactive tab pane" and changes nothing else, and the edited sentence reads true.
2. **Gates.** `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build:src`, and
   `npm run test:setup` exit 0 in the scratch copy with `cf-shared-3.patch` and `cf-offlimits.patch`
   applied, as the logs show.
3. **Report.** The report follows every code token with its noun and states no temporal word.
