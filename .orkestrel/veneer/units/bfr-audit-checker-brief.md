# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-RENAME (D40a)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 4, and 5 of
`/home/user/scaffold/.orkestrel/veneer/units/bfr-audit-claims.md` by reading alone (claim 5's
`npm run check` instruction addresses the objective lane; rule its remaining parts): claim 1 (the
diff against `53628aa` is the two mixin renames with their comments, the six include lines, and the
`INPUT_GROUP_CASES` remark's `reads` paragraph, and nothing else; the status lists the owned files
and nothing else; a search for `control-type` and `control-border` over `src`, `tests`, `guides`,
and `app` in `/home/user/veneer-bfr` returns nothing), claim 4 (the `INPUT_GROUP_CASES` and
`FORM_CONTROL_CASES` remarks carry the same two sentences about the map, the empty map, and the
moved token), and claim 5's reading parts. The subject tree is `/home/user/veneer-bfr`
(uncommitted writes over `53628aa`); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bfr.diff` (the whole diff against `53628aa`),
`bfr-status.txt`, the brief `b-forms-rename-brief.md`, and the report `b-forms-rename-report.md`.
Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,styles,tests}.md`. Edit nothing, run nothing, spawn
nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
4, and 5 with `file:line`, findings outside those claims to the BROKEN standard, and one terminal
line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
