# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-FLOATING

`checker` on Sonnet (native subagent, clean context, read-only). Rule mechanically on the claims in
`.orkestrel/veneer/units/bff-audit-claims.md` that are countable or checkable by inspection:
the inventory's selector population for `form-floating` in `/home/user/veneer-bff/tests/fixtures/oracle/inventory.json`
against the selectors the diff's `_form-floating.scss` emits and the report's stated split (the
`.input-group` and `.was-validated` entries withheld); the `listed` entry at its sorted position;
the compatibility row; the departure rows by key and category under the guide's § Tokens ›
§ Departures table (cells per row); the guide heading placed where the claims say against
`src/styles/index.scss` barrel order; a sweep of the added guide prose and comments for `should`,
`simply`, `just`, `easy`, `currently`, `via`, `e.g.`, `etc.`, and a stated count; the status against
the briefs' owned and shared lists in `/home/user/veneer-bff/tmp/units/b-forms-floating-brief.md`
and `b-forms-floor-brief.md` § Scope; `ls /home/user/veneer-bff/tmp/probe` empty or absent; the
off-limits files absent from the diff; the frame population under `/home/user/veneer-bff/tmp/capture/states/`
(7 scenarios × 4 variants as `.png`, 6 subjects × 4 variants as `-accessibility.txt`); the
`findDuplication` change (the arm's expression, the TSDoc's numbers, each boundary case's title and
block sizes against the new floor). Evidence: `.orkestrel/veneer/units/bff.diff`,
`bff-status.txt`, `bff-report.md`, `bff-floor-report.md`. Also run the export-name probe: every
function or constant the diff adds to `tests/**` (`grep -n '^+export' bff.diff`) against
`/home/user/veneer-bff/node_modules/@orkestrel/test/dist/src/browser/index.d.ts` and
`.../server/index.d.ts` by job. Edit nothing, spawn nothing. Use absolute paths.

Output: per-claim verdicts (CONFIRMED, BROKEN, or UNRESOLVED) with `file:line` evidence and the
exact search or reading behind each count, findings outside the claims to the `BROKEN` standard, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
