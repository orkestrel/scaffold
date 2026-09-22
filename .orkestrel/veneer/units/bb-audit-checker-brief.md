# Audit lane — `checker` on Sonnet, mechanical conformance, B-PASSIVE-B

`checker` on Sonnet (native subagent, clean context, read-only). Rule mechanically on the claims in
`/home/user/scaffold/tmp/audit/bb-audit-claims.md` that are countable or checkable by inspection:
claim 1 (every inventory selector under `btn-group` and `btn-toolbar` in
`/home/user/veneer-bb/tests/fixtures/oracle/inventory.json` appears in the partial's text in the
diff except the six deferred forms the claims name), claim 5 (the `listed` entries at sorted
positions, the compatibility rows, the 32 struck deferral rows against the report's list, the six
kept rows still present), claim 6 (heading order against `src/styles/index.scss` barrel
order; a sweep of the added guide prose for `should`, `simply`, `just`, `easy`, `currently`,
`via`, `e.g.`, `etc.`, and a stated count; that every removed guide line is a repadded table row
or the struck deferral row), and claim 8 (the status against the brief's owned and shared lists in
`/home/user/veneer-bb/tmp/units/b-passive-b-brief.md` § Scope; `ls /home/user/veneer-bb/tmp/probe`
empty or absent; the off-limits partials absent from the diff). Evidence:
`/home/user/scaffold/tmp/audit/bb.diff`, `bb-status.txt`, `bb-report.md`. Also run the export-name
probe: every function or constant the diff adds to `tests/**` against
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` and `.../server/index.d.ts` by job.
Edit nothing, spawn nothing.

Output: per-claim verdicts (CONFIRMED, BROKEN, or UNRESOLVED) with `file:line` evidence and the
exact command behind each count, findings outside the claims to the `BROKEN` standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
