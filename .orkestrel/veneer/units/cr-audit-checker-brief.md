# Audit lane — `checker` on Sonnet, mechanical conformance, CLOSE-REGISTRY (`cr`)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 3, and 6 of
`/home/user/scaffold/.orkestrel/veneer/units/cr-audit-claims.md` by reading alone: claim 1 (the
diff against `7398772` and the status; the off-limits files unchanged), claim 3 (the retired-name
grep and the `_KEYS` grep rerun by you over `/home/user/veneer-cr`; the report's two readings
compared line by line), and claim 6 (`writing.md` conformance of every changed doc block, comment,
and title: no count, no banned term from the substitution table, each code token followed by a
noun with a CSS token counting as its own noun; no `any`, `as`, `!`, suppression, mock, or nested
function beyond a callback passed directly; no helper duplicating an installed `@orkestrel/test`
export, read `node_modules/@orkestrel/test/dist/src/browser/index.d.ts` under
`/home/user/veneer-cr`; the report's criterion lines, readings, grep, and mutation cases against
the diff). The subject tree is `/home/user/veneer-cr` (uncommitted writes over `a56ca7e`); the
evidence is `/home/user/scaffold/.orkestrel/veneer/units/bpb.diff`, `bpb-status.txt`, the brief
`b-passive-close-b-brief.md`, and the report `b-passive-close-b-report.md`. Law:
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{writing,tests,names}.md`.
Edit nothing, run nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
3, and 6 with `file:line`, findings outside those claims to the BROKEN standard, and one
terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
