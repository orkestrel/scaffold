# Audit lane — `checker` on Sonnet, mechanical conformance, B-FORMS-CONTROL round 3 (the prose micro-round)

`checker` on Sonnet (native subagent, clean context, read-only). You rule on claims 1, 2, and 5 of
`/home/user/scaffold/.orkestrel/veneer/units/bfo-3-audit-claims.md` by reading alone (claim 5's
`npm run check` instruction addresses the objective lane; rule its remaining parts): claim 1 (the
delta between `bfo-2.diff` and `bfo-3.diff` is the edits `b-forms-control-brief-3.md` § Edits
prescribes and nothing else, with every word of the rewrapped guide paragraphs kept; the status is
the round-2 set and nothing else; `tmp/probe/` absent), claim 2 (every changed sentence under
`writing.md`: a noun after each code token, no banned term from the substitution table, no count of
a growable set, the temporal `once` gone from the driven-case comment), and claim 5's reading
parts. The subject tree is `/home/user/veneer-bfo` (uncommitted writes); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bfo-3.diff` (the whole diff against `2c10329`),
`bfo-3-status.txt`, the round-2 diff `bfo-2.diff`, the brief `b-forms-control-brief-3.md`, and the
report `b-forms-control-report-3.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,documentation,tests}.md`. Edit nothing, run nothing,
spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 1,
2, and 5 with `file:line`, findings outside those claims to the BROKEN standard, and one terminal
line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
