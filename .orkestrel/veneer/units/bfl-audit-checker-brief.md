# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-LABEL-CASCADE (`bfl`)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 2, 7, 8, and
9 of `/home/user/scaffold/.orkestrel/veneer/units/bfl-audit-claims.md` by reading alone: claim 1
(the diff and the status; the off-limits files unchanged), claim 2 (each declaration of the
partial against the quoted bindings; the barrel line's position), claim 7 (each guide obligation
against the worktree file: the § Files row, the section and its position, the section order, the
deferral rows gone, the § Compatibility rows, the `#### col` and `#### row-gap` tables' positions,
the split per-key tables in sort order, the style-proof link, the § Showcase paragraph verbatim
against the brief's quoted sentence, § Tests unchanged in the diff), claim 8 (`writing.md`
conformance of every changed comment, doc block, and guide sentence: no count, no banned term from
the substitution table, each code token followed by a noun with a CSS token counting as its own
noun; the test titles; no `any`, `as`, `!`, suppression, mock, or nested function beyond a callback
passed directly; no helper duplicating an installed `@orkestrel/test` export, read
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` and `.../server/index.d.ts` under
`/home/user/veneer-bfl`), and claim 9's report parts (the criterion lines, the failing-first run,
the mutation table, the two findings recorded). The subject tree is `/home/user/veneer-bfl`
(uncommitted writes over `a56ca7e`); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bfl.diff`, `bfl-status.txt`, the brief
`b-forms-label-cascade-brief.md`, and the report `b-forms-label-cascade-report.md`. Law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{writing,styles,tests,documentation}.md`.
Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
2, 7, 8, and 9 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
