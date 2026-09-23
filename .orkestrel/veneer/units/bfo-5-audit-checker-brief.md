# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-CONTROL round 5 (the landing's consequences)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 4, and 5 of
`/home/user/scaffold/.orkestrel/veneer/units/bfo-5-audit-claims.md` by reading alone (claim 5's
`npm run check` instruction addresses the objective lane; rule its remaining parts): claim 1 (the
diff against `f82de43` is the four edits `b-forms-control-brief-5.md` § Edits prescribes and
nothing else; the status lists the owned files and nothing else), claim 4 (the two comments and the
guide sentence under `writing.md`: a noun after each identifier token, with a CSS property, value,
function, or `!important` token counting as its own noun per `bfo-3-audit-verdict.md` claim 2; no
banned term from the substitution table; no count of a growable set), and claim 5's reading parts.
The subject tree is `/home/user/veneer-bfo5` (uncommitted writes over `f82de43`); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bfo-5.diff` (the whole diff against `f82de43`),
`bfo-5-status.txt`, the brief `b-forms-control-brief-5.md`, and the report
`b-forms-control-report-5.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,documentation,tests}.md`. Edit nothing, run nothing,
spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
4, and 5 with `file:line`, findings outside those claims to the BROKEN standard, and one terminal
line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
