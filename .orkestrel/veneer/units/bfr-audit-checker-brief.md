# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-RANGE

`checker` on Sonnet (native subagent, clean context, read-only). Rule mechanically on the claims in
`/home/user/scaffold/tmp/audit/bfr-audit-claims.md` that are countable or checkable by inspection:
claim 1 (every inventory selector under `form-range` in
`/home/user/veneer-bfr/tests/fixtures/oracle/inventory.json` is emitted by the partial's `@each`
over its engine list, read from the diff), claim 5 (the `listed` entry and the Set-literal entry at
sorted positions, the one compatibility row, the 29 departure rows with seven cells each under
`#### \`form-range\``), claim 7 (the three fix-round patches present in the diff exactly as the
RANGE report's D1, D2, and D3 wrote them), claim 6 (heading order against `src/styles/index.scss` barrel
order; a sweep of the added guide prose for `should`, `simply`, `just`, `easy`, `currently`,
`via`, `e.g.`, `etc.`, and a stated count; that every removed guide line is a repadded table row
or the struck deferral row), and claim 8 (the status against the brief's owned and shared lists in
`/home/user/veneer-bfr/tmp/units/b-forms-range-brief.md` § Scope; `ls /home/user/veneer-bfr/tmp/probe`
empty or absent; the off-limits partials absent from the diff). Evidence:
`/home/user/scaffold/tmp/audit/bfr.diff`, `bfr-status.txt`, `bfr-report.md`. Also run the export-name
probe: every function or constant the diff adds to `tests/**` against
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` and `.../server/index.d.ts` by job.
Edit nothing, spawn nothing.

Output: per-claim verdicts (CONFIRMED, BROKEN, or UNRESOLVED) with `file:line` evidence and the
exact command behind each count, findings outside the claims to the `BROKEN` standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
