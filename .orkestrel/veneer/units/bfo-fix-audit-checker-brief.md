# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-CONTROL round 2 (the fix round)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 6 and 10 of
`/home/user/scaffold/.orkestrel/veneer/units/bfo-fix-audit-claims.md` by reading alone (claim 10's
`npm run check` instruction addresses the objective lane; rule its remaining parts): claim 6 (every
changed sentence in the guide, the TSDoc, and the comments under `writing.md`: a noun after each
code token, no banned term from the substitution table, no count of a growable set, no prose line
past 100 columns; the report's ROADMAP rows and the restated carrier cell name one carrier each;
the FLOATING carrier sentence's text-control half), and claim 10 (the status lists the round-1 set
plus `tests/src/styles/components/validation.test.ts` and `src/styles/_mixins.scss` and nothing
else; `tmp/probe/` absent; no file outside the Owned list of
`/home/user/veneer-bfo/tmp/units/b-forms-control-brief-2.md` § Scope changed, with
`src/styles/_mixins.scss` granted by the D40 ruling under `## D40` in
`/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`). The subject tree is
`/home/user/veneer-bfo` (uncommitted writes); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bfo-2.diff` (the whole diff against `2c10329`),
`bfo-2-status.txt`, the round-1 diff `bfo.diff` (for the delta), and the report
`b-forms-control-report-2.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,documentation,styles,tests}.md`. Edit nothing, run
nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 6
and 10 with `file:line`, findings outside those claims to the BROKEN standard, and one terminal
line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
