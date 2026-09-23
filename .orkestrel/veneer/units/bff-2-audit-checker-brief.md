# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-CLOSE-FORCED (`bff`), rounds 2 and 3

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 2, 5, and 7 of
`/home/user/scaffold/.orkestrel/veneer/units/bff-2-audit-claims.md` by reading alone (claim 7's
`npm run check` instruction addresses the objective lane; rule its remaining parts): claim 1 (the
rounds 2 and 3 delta against `bff-2.diff` and round 1's `bff.diff`; the status), claim 2 (the five
titles against `b-forms-close-forced-brief-2.md` criterion 1; a search for `system highlight` and
`system-highlight` over the five proofs), claim 5 (each sentence and the comment against criterion
4 of that brief, verbatim apart from wrapping; `writing.md` conformance: no count, no banned term,
each code token followed by a noun with a CSS token counting as its own noun), and claim 7's
reading parts (no `any`, `as`, `!`, or suppression; no nested function beyond a callback passed
directly; no helper duplicating an installed `@orkestrel/test` export; the off-limits files
untouched). The subject tree is `/home/user/veneer-bff` (uncommitted writes over
`ccb10a7`); the evidence is `/home/user/scaffold/.orkestrel/veneer/units/bff-2.diff`,
`bff-2-status.txt`, the brief `b-forms-close-forced-brief.md`, and the reports
`b-forms-close-forced-report-2.md` and `-3.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,styles,tests}.md`. Edit nothing, run nothing, spawn
nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
2, 5, and 7 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
