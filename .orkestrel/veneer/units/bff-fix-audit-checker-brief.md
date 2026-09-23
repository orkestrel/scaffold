# Audit lane — `checker` on Sonnet, mechanical conformance, bff-fix

`checker` on Sonnet (native subagent, clean context, read-only). You rule on the mechanical
acceptance criteria among the numbered claims in
`/home/user/scaffold/.orkestrel/veneer/units/bff-fix-audit-claims.md`: claim 4 (the ledger rows are
present, each `tokenized`, each `padding-top` row directly before its selector's `padding-bottom`
row, no `declared` height row left; the `reads` additions in `FORM_FLOATING_CASES`), claim 7 (the
`### Validation classes` patch applies to the tree's text; every changed guide sentence under
`writing.md`: a noun after each code token, no banned term from the substitution table, no count of a
growable set, no line past 100 columns), claim 8 (each ROADMAP row names exactly one carrier), and
claim 9 (the status file lists the round-1 file set and nothing else; the four untracked owned files;
`tmp/probe/` absent; no file outside the brief's Owned list changed, per
`/home/user/veneer-bff/tmp/units/b-forms-floating-brief-2.md` § Scope). The subject tree is
`/home/user/veneer-bff` (uncommitted writes); the evidence is
`/home/user/scaffold/.orkestrel/veneer/units/bff-2.diff`, `bff-2-status.txt`, and
`b-forms-floating-report-2.md`. Law: `/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,documentation,styles,tests}.md`. Edit nothing, run
nothing, spawn nothing. Use absolute paths.

Output: the `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts for claims 4, 7,
8, and 9 with `file:line`, findings outside those claims to the BROKEN standard, and one terminal
line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
