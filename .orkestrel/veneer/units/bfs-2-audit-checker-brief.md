# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-CLOSE-SPECIMENS (`bfs`), round 2

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 2, 5, and 6 of
`/home/user/scaffold/.orkestrel/veneer/units/bfs-2-audit-claims.md` by reading alone (claim 6's
`npm run check` instruction addresses the objective lane; rule its remaining parts): claim 1 (the
round-2 delta against `bfs-2.diff` and the status), claim 2 (each sentence against
`b-forms-close-specimens-brief-2.md` criterion 1, verbatim apart from wrapping; the block names no
member; the date), claim 5 (`writing.md` and `AGENTS.md` § Writing conformance of every added or
changed comment and doc block: no count, no position name, no banned term from the substitution
table, each code token followed by a noun with a CSS token counting as its own noun), and claim 6's
reading parts (no `any`, `as`, `!`, or suppression; no nested function beyond a callback passed
directly; no helper duplicating an installed `@orkestrel/test` browser export, read
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` under `/home/user/veneer-bfs`; the
off-limits files untouched). The subject tree is `/home/user/veneer-bfs` (uncommitted writes over
`d02bd46`); the evidence is `/home/user/scaffold/.orkestrel/veneer/units/bfs-2.diff`,
`bfs-2-status.txt`, the brief `b-forms-close-specimens-brief.md`, the round-2 report
`b-forms-close-specimens-report-2.md`, round 1's report `b-forms-close-specimens-report.md`, and `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/bfs-setup.log.txt`.
Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,tests,browser}.md`. Edit nothing, run nothing, spawn
nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
2, 5, and 6 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
