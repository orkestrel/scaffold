# Audit lane — `checker` on Sonnet, mechanical conformance, B-PASSIVE-E

`checker` on Sonnet (native subagent, clean context, read-only). Rule mechanically on the claims in
`/home/user/scaffold/tmp/audit/be-audit-claims.md` that are countable or checkable by inspection:
claim 1 (every inventory selector under `progress`, `spinner`, and `placeholder` in
`/home/user/veneer-be/tests/fixtures/oracle/inventory.json` appears in the partials' text in the
diff, and the report's built-cascade grep table is consistent with the diff), claim 5 (the `listed`
entries at sorted positions, the compatibility rows, the eight departure rows with seven cells
each, the struck deferral row), claim 6 (heading order against `src/styles/index.scss` barrel
order; a sweep of the added guide prose for `should`, `simply`, `just`, `easy`, `currently`,
`via`, `e.g.`, `etc.`, and a stated count; that every removed guide line is a repadded table row
or the struck deferral row), and claim 8 (the status against the brief's owned and shared lists in
`/home/user/veneer-be/tmp/units/b-passive-e-brief.md` § Scope; `ls /home/user/veneer-be/tmp/probe`
empty or absent; the off-limits partials absent from the diff). Evidence:
`/home/user/scaffold/tmp/audit/be.diff`, `be-status.txt`, `be-report.md`. Also run the export-name
probe: every function or constant the diff adds to `tests/**` against
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` and `.../server/index.d.ts` by job.
Edit nothing, spawn nothing.

Output: per-claim verdicts (CONFIRMED, BROKEN, or UNRESOLVED) with `file:line` evidence and the
exact command behind each count, findings outside the claims to the `BROKEN` standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
