# Audit lane — `checker` on Sonnet, mechanical conformance, B-PASSIVE-CLOSE-B (`bpb`)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 4, 5, and 6
of `/home/user/scaffold/.orkestrel/veneer/units/bpb-audit-claims.md` by reading alone: claim 1
(the diff against `a56ca7e` and the status; the guide hunks' regions; the off-limits files
unchanged), claim 4 (each sentence and each row against the quoted text, verbatim apart from
wrapping; the rows' position after the `form-range` row and their column padding against the
neighbouring rows; the `btn-close` key against the guide's existing `btn-close` rows), claim 5
(`writing.md` conformance of every changed comment, sentence, and row: no count, no banned term
from the substitution table, each code token followed by a noun with a CSS token counting as its
own noun; the test titles; no `any`, `as`, `!`, suppression, mock, or nested function beyond a
callback passed directly; no helper duplicating an installed `@orkestrel/test` browser export, read
`node_modules/@orkestrel/test/dist/src/browser/index.d.ts` under `/home/user/veneer-bpb`), and
claim 6 (the report's criterion lines, the red and green runs, the recorded deviation, against the
diff). The subject tree is `/home/user/veneer-bpb` (uncommitted writes over `a56ca7e`); the
evidence is `/home/user/scaffold/.orkestrel/veneer/units/bpb.diff`, `bpb-status.txt`, the brief
`b-passive-close-b-brief.md`, and the report `b-passive-close-b-report.md`. Law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{writing,tests,styles}.md`.
Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
4, 5, and 6 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
