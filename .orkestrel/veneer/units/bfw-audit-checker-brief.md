# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-LABEL-SHOW (`bfw`)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 3, 4, 7,
and 8 of `/home/user/scaffold/.orkestrel/veneer/units/bfw-audit-claims.md` by reading alone
(claim 8's `npm run check` instruction addresses the objective lane; rule its remaining parts):
claim 1 (the diff against `dd855e9` and the status; the off-limits files unchanged), claim 3 (the
constructor order in `Showcase.ts`; the export; the three proofs' literals), claim 4 (the union
order, the five rows' scenario, selector, and property, no driven scenario, the check's regex and
comment), claim 7 (the returned sentence and rows in `b-forms-label-show-report.md` against the
rendered order in `Showcase.ts` and `writing.md`), and claim 8's reading parts (no `any`, `as`,
`!`, or suppression; no nested function beyond a callback passed directly; no helper duplicating an
installed `@orkestrel/test` browser export, read
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` under `/home/user/veneer-bfw`;
`writing.md` conformance of every changed comment and doc block: no count, no position name, no
banned term from the substitution table, each code token followed by a noun with a CSS token
counting as its own noun; the off-limits files untouched). The subject tree is
`/home/user/veneer-bfw` (uncommitted writes over `dd855e9`); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bfw.diff`, `bfw-status.txt`, the briefs
`b-forms-label-show-brief.md` and `-2.md`, and the reports `b-forms-label-show-report.md` and
`-2.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,tests,browser}.md`. Edit nothing, run nothing, spawn
nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
3, 4, 7, and 8 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
