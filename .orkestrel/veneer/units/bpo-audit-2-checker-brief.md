# Audit lane — `checker` on Sonnet, mechanical conformance, B-PASSIVE-ORDER (`bpo`), round 2

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 3, 4, and 5 of
`/home/user/scaffold/.orkestrel/veneer/units/bpo-audit-2-claims.md` by reading alone: claim 1 (the
diff against `87ff1d0` and the status), claim 3 (each prose token in the added conformance case's
comment followed by a noun, read in `/home/user/veneer-bpo/tests/conformance.test.ts`), claim 4
(each heading the corrected move list in the report names checked against
`/home/user/veneer-bpo/guides/veneer.md`, which is the guide at `87ff1d0`; name any omission or
misplacement), and claim 5 (`writing.md` conformance of the added case and comment; no `any`, `as`,
`!`, suppression, mock, or nested function beyond a callback passed directly; no helper duplicating
an installed `@orkestrel/test` export; no count in the report's prose; the report's criterion lines
against the diff). The subject tree is `/home/user/veneer-bpo` (uncommitted writes over
`87ff1d0`); the evidence is `/home/user/scaffold/.orkestrel/veneer/units/bpo-2.diff`,
`bpo-2-status.txt`, the briefs `b-passive-order-brief.md` and `b-passive-order-brief-2.md`, the
reports `b-passive-order-report.md` and `b-passive-order-report-2.md`, and the round-1 verdict
`bpo-audit-verdict.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,tests,names,styles}.md`. Edit nothing, run nothing,
spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
3, 4, and 5 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
