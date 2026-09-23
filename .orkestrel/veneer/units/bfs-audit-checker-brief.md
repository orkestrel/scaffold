# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-SELECT

`checker` on Sonnet (native subagent, clean context, read-only). Rule mechanically on the claims in
`.orkestrel/veneer/units/bfs-audit-claims.md` that are countable or checkable by inspection:
the inventory's selector population for `form-select` in `/home/user/veneer-bfs/tests/fixtures/oracle/inventory.json`
against the selectors the diff's `_form-select.scss` emits and the report's stated split (the
floating, input-group, and validation selectors withheld); the `listed` entry at its sorted position;
the compatibility rows; the departure rows by key and category under the guide's § Tokens ›
§ Departures tables (cells per row, one table per key; the two `is-*:focus` rows present in the
`form-select` table and absent from the `is-valid` and `is-invalid` tables); the guide heading placed
where the claims say against `src/styles/index.scss` barrel order; a sweep of the added guide prose
and comments for `should`, `simply`, `just`, `easy`, `currently`, `via`, `e.g.`, `etc.`, and a stated
count; the status against the brief's owned and shared lists in
`/home/user/veneer-bfs/tmp/units/b-forms-select-brief.md` § Scope; `ls /home/user/veneer-bfs/tmp/probe`
empty or absent; the off-limits files absent from the diff; the frame population under
`/home/user/veneer-bfs/tmp/capture/states/` (7 scenarios × 4 variants as `.png`, 6 subjects × 4
variants as `-accessibility.txt`). Evidence: `.orkestrel/veneer/units/bfs.diff`, `bfs-status.txt`,
`bfs-report.md`. Also run the export-name probe: every function or constant the diff adds to
`tests/**` (`grep -n '^+export' bfs.diff`) against `/home/user/veneer-bfs/node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
and `.../server/index.d.ts` by job. Edit nothing, spawn nothing. Use absolute paths.

Output: per-claim verdicts (CONFIRMED, BROKEN, or UNRESOLVED) with `file:line` evidence and the
exact search or reading behind each count, findings outside the claims to the `BROKEN` standard, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
