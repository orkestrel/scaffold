# Audit lane — `checker` on Sonnet, mechanical conformance, bfo

`checker` on Sonnet (native subagent, clean context, read-only). You rule on the mechanical
acceptance criteria among the numbered claims in
`/home/user/scaffold/.orkestrel/veneer/units/bfo-audit-claims.md`: claim 6 (the ledger rows are
present and categorized as the claim states; the two re-attributed rows are absent from the
validation tables and present in the `form-control` table; the four `Excluded` rows; the § Files
row, the § Tests link, and the § Compatibility row), claim 9 (every changed sentence under
`writing.md`: a noun after each code token, no banned term from the substitution table, no count of
a growable set, no prose line past 100 columns; the ROADMAP rows name one carrier each), and claim
10 (the status file lists the owned set and nothing else; the four new files; `tmp/probe/` absent;
`validation.test.ts` untouched in the tree; no file outside the brief's Owned list changed, per
`/home/user/veneer-bfo/tmp/units/b-forms-control-brief.md` § Scope). The subject tree is
`/home/user/veneer-bfo` (uncommitted writes); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bfo.diff`, `bfo-status.txt`, and
`b-forms-control-report.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,documentation,styles,tests}.md`. Edit nothing, run
nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 6, 9,
and 10 with `file:line`, findings outside those claims to the BROKEN standard, and one terminal
line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
