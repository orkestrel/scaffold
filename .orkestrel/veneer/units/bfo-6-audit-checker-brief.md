# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-CONTROL round 6 (the round-5 prose findings)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 3, and 4 of
`/home/user/scaffold/.orkestrel/veneer/units/bfo-6-audit-claims.md` by reading alone (claim 4's
`npm run check` instruction addresses the objective lane; rule its remaining parts): claim 1 (the
delta between `bfo-5.diff` and `bfo-6.diff` is the six edits `b-forms-control-brief-6.md` § Edits
prescribes and their rewraps, and nothing else; the status is the round-5 set and nothing else),
claim 3 (the changed comments under `writing.md`: no `below`, a noun after each identifier token
with a CSS property, value, function, or `!important` token counting as its own noun per
`bfo-3-audit-verdict.md` claim 2, no banned term from the substitution table, no count of a
growable set), and claim 4's reading parts. The subject tree is `/home/user/veneer-bfo5`
(uncommitted writes over `f82de43`); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bfo-6.diff` (the whole diff against `f82de43`),
`bfo-6-status.txt`, the round-5 diff `bfo-5.diff`, the brief `b-forms-control-brief-6.md`, and
the report `b-forms-control-report-6.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,documentation,tests}.md`. Edit nothing, run nothing,
spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
3, and 4 with `file:line`, findings outside those claims to the BROKEN standard, and one terminal
line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
