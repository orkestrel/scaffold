# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-VALIDATION

`checker` on Sonnet (native subagent, clean context, read-only). Rule mechanically on the claims in
`/home/user/scaffold/tmp/audit/bfv-audit-claims.md` that are countable or checkable by inspection:
claim 1 (every inventory selector under the three keys appears in the partial's compiled output —
read `tests/fixtures/oracle/inventory.json` for the selector lists and the diff for the partial),
claim 7 (the `listed` entries, the six compatibility rows, the sixteen departure rows, each row's
seven cells filled), claim 8 (heading order in `guides/veneer.md` against `src/styles/index.scss`
barrel order; a sweep of the added prose for `should`, `simply`, `just`, `easy`, `currently`,
`via`, `e.g.`, `etc.`, and a stated count), and claim 9 (the status against the brief's owned and
shared lists in `/home/user/veneer-bfv/tmp/units/b-forms-validation-brief.md` § Scope; `grep -rn
'tmp/probe' /home/user/veneer-bfv/tests /home/user/veneer-bfv/src` empty; every hunk in
`tests/setupStyles.ts` in the diff is an addition). Evidence: `/home/user/scaffold/tmp/audit/bfv.diff`,
`bfv-status.txt`, `bfv-report.md`. Also run the export-name probe: list every function the diff adds
to `tests/**` and check none duplicates an export of `node_modules/@orkestrel/test/dist/src/browser/index.d.ts`
or `node_modules/@orkestrel/test/dist/src/server/index.d.ts` by job. Edit nothing, spawn nothing.

Output: per-claim verdicts (CONFIRMED, BROKEN, or UNRESOLVED) with `file:line` evidence and the
exact command behind each count, findings outside the claims to the `BROKEN` standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
