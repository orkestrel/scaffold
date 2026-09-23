# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-CLOSE-TABLES (`bft`), round 2

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 2, 6, and 7 of
`/home/user/scaffold/.orkestrel/veneer/units/bft-2-audit-claims.md` by reading alone (claim 7's
`npm run check` instruction addresses the objective lane; rule its remaining parts): claim 1 (the
round-2 delta per the report's "Diff summary" table against `bft-2.diff`; the status; the floating
case's expressions untouched), claim 2 (each of the five sentences against
`b-forms-close-tables-brief-2.md` criterion 1, verbatim apart from wrapping), claim 6 (`writing.md`
conformance of every added or changed comment and TSDoc in the round-2 delta: no count, no banned
term from the substitution table, each code token followed by a noun with a CSS token counting as
its own noun, the `@example` data fictional and descriptive), and claim 7's reading parts (no `any`,
`as`, `!`, or suppression; no nested function beyond a callback passed directly; readonly
parameters and returns; no helper duplicating an installed export, read
`node_modules/@orkestrel/test/dist/src/server/index.d.ts` and
`node_modules/@orkestrel/contract/dist/src/core/index.d.ts` under `/home/user/veneer-bft`; the
off-limits files untouched). The subject tree is `/home/user/veneer-bft`
(uncommitted writes over `d02bd46`); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bft-2.diff`, `bft-2-status.txt`, the brief
`b-forms-close-tables-brief.md`, and the round-2 report `b-forms-close-tables-report-2.md` and round 1's report `b-forms-close-tables-report.md`. Law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{writing,tests,typescript}.md`.
Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
2, 6, and 7 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
