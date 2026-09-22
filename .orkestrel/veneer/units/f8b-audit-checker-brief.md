# Audit lane — `checker` on Sonnet, mechanical conformance, F8b SHARED-PREFLIGHT

`checker` on Sonnet (native subagent, clean context, read-only). Rule mechanically on the claims in
`/home/user/scaffold/tmp/audit/f8b-audit-claims.md` that are checkable by inspection: claim 1 (the
fixture against the guide's `tailwind` fence line by line), claim 5 (the four moved readers present
verbatim in `tests/setupStyles.ts` and absent from `tests/setupServer.ts` except the import and the
call sites; every inventory in `tests/setupStyles.test.ts`, `tests/setupBrowser.test.ts`, and
`tests/setupServer.test.ts` naming every export of its module; no nested function declarations in the
added code; the export-name probe of every added function against
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` and `.../server/index.d.ts` by job),
claim 6 (the § Files rows present, a sweep of the added guide prose for `should`, `simply`, `just`,
`easy`, `currently`, `via`, `e.g.`, `etc.`, a stated count, and the temporal `once`), and claim 7
(the status against the brief `/home/user/veneer-f8b/tmp/units/f8b-brief.md` § Scope;
`ls /home/user/veneer-f8b/tmp/probe` absent). Evidence: `/home/user/scaffold/tmp/audit/f8b.diff`,
`f8b-status.txt`, `f8b-report.md`. Use absolute paths. Edit nothing, spawn nothing.

Output: per-claim verdicts (CONFIRMED, BROKEN, or UNRESOLVED) with `file:line` evidence and the
exact command behind each count, findings outside the claims to the `BROKEN` standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
