# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-CLOSE-TABLES (`bft`)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 2, 7, and
9 of `/home/user/scaffold/.orkestrel/veneer/units/bft-audit-claims.md` by reading alone (claim
9's `npm run check` instruction addresses the objective lane; rule its remaining parts): claim 1
(the diff against `d02bd46` touches only the seven owned files; the status lists those and nothing
else; a search for `INPUT_GROUP_ROUNDING` over `src`, `tests`, `guides`, and `app` in
`/home/user/veneer-bft` returns nothing), claim 2's mechanical parts (every named remnant of the
fixture is gone; the freeze case's title; the "until the control family lands" sentence), claim 7
(the remark sentences' presence and `writing.md` conformance: no count, no banned term from the
substitution table, each code token followed by a noun), and claim 9's reading parts (no `any`,
`as`, `!`, or suppression in the diff; no nested function beyond a callback passed directly;
readonly interface properties; the off-limits files untouched). Also probe the diff for a helper
whose job an installed `@orkestrel/test` or `@orkestrel/contract` export does (read
`node_modules/@orkestrel/test/dist/src/server/index.d.ts` and
`node_modules/@orkestrel/contract/dist/index.d.ts` under `/home/user/veneer-bft` for a
declaration-reads or cascade-block helper by name). The subject tree is `/home/user/veneer-bft`
(uncommitted writes over `d02bd46`); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bft.diff`, `bft-status.txt`, the brief
`b-forms-close-tables-brief.md`, and the report `b-forms-close-tables-report.md`. Law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{writing,tests,typescript}.md`.
Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
2, 7, and 9 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
