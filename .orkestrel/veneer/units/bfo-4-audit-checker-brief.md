# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-CONTROL round 4 (the two-sentence micro-round)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1 and 3 of
`/home/user/scaffold/.orkestrel/veneer/units/bfo-4-audit-claims.md` by reading alone (claim 3's
`npm run check` instruction addresses the objective lane; rule its remaining parts): claim 1 (the
delta between `bfo-3.diff` and `bfo-4.diff` is the two edits `b-forms-control-brief-4.md` § Edits
prescribes, inside the `FORM_CONTROL_CASES` remark of `tests/setupStyles.ts`, and nothing else; the
status is the round-3 set and nothing else), and claim 3's reading parts. The subject tree is
`/home/user/veneer-bfo` (uncommitted writes); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bfo-4.diff` (the whole diff against `2c10329`),
`bfo-4-status.txt`, the round-3 diff `bfo-3.diff`, the brief `b-forms-control-brief-4.md`, and the
report `b-forms-control-report-4.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,documentation,tests}.md`. Edit nothing, run nothing,
spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1
and 3 with `file:line`, findings outside those claims to the BROKEN standard, and one terminal
line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
