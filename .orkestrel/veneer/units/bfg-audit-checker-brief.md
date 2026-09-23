# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-GROUP

`checker` on Sonnet (native subagent, clean context, read-only). Rule mechanically on the claims in
`.orkestrel/veneer/units/bfg-audit-claims.md` that are countable or checkable by inspection: the inventory's selector
population for `input-group`, `valid-feedback`, `valid-tooltip`, `invalid-feedback`, `invalid-tooltip` in `/home/user/veneer-bfg/tests/fixtures/oracle/inventory.json` against the selectors the diff's
`_input-group.scss` emits and the built cascade the report greps; the `listed` entries at sorted positions;
the compatibility rows; the departure and addition rows by key and category under the guide's
§ Tokens › § Departures and § Additions tables (cells per row, one table per key); the deferral rows
struck and added; the guide heading placed where the claims say against `src/styles/index.scss`
barrel order; a sweep of the added guide prose and comments for `should`, `simply`, `just`, `easy`,
`currently`, `via`, `e.g.`, `etc.`, and a stated count; the status against the brief's owned and
shared lists in `/home/user/veneer-bfg/tmp/units/b-forms-group-brief.md` § Scope; `ls /home/user/veneer-bfg/tmp/probe` empty or absent; the
off-limits partials absent from the diff. Evidence: `.orkestrel/veneer/units/bfg.diff`, `bfg-status.txt`,
`bfg-report.md`. Also run the export-name probe: every function or constant the diff adds to
`tests/**` against `/home/user/veneer-bfg/node_modules/@orkestrel/test/dist/src/browser/index.d.ts` and
`.../server/index.d.ts` by job. Edit nothing, spawn nothing. Use absolute paths.

Output: per-claim verdicts (CONFIRMED, BROKEN, or UNRESOLVED) with `file:line` evidence and the
exact command behind each count, findings outside the claims to the `BROKEN` standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
