# Audit lane — `reviewer` on Opus 5.5 holding the objective lane (Astra dark on quota), B-PASSIVE-PROSE (`bpp`) round 2

`reviewer` on Opus 5.5 (native subagent, clean context, read-only), substituted for the `analyst` route because the Codex bench reported its usage limit at 2026-09-23 13:34 UTC (ROADMAP § Standing conditions); the subject tree is `/home/user/veneer-bpp`. You hold the **objective** lane over the claims in
`/home/user/scaffold/.orkestrel/veneer/units/bpp-audit-2-claims.md`, which names the evidence; the
unit was written by `builder` on Sonnet, so you run on an engine that did not write it, and a `checker` lane rules the mechanical claims blind
beside you. The effective brief is `/home/user/scaffold/.orkestrel/veneer/units/b-passive-prose-brief-3.md`
(read `b-passive-prose-brief-2.md` for the findings it carries) and the report
`/home/user/scaffold/.orkestrel/veneer/units/b-passive-prose-report-2.md`; the review
evidence is `/home/user/scaffold/.orkestrel/veneer/units/bpp-2.diff` (the whole diff against
`87ff1d0`) and `bpp-2-status.txt`; the round-1 verdict is `bpp-audit-verdict.md` and its lane verdicts sit beside it; the ruling is R9 in
`/home/user/scaffold/.orkestrel/veneer/b-passive-close-design-verdict.md`; D42 is in `/home/user/scaffold/.orkestrel/veneer/units/decisions-round-2.md`. Law:
`/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,tests,typescript,names}.md`. Perform the audit
directly and spawn nothing. Bound: rule within 12 minutes.

Standing conditions: you have Read, Grep, and Glob only (no shell): rule claim 2 by grepping the two
files for `\{@link ` yourself with multiline matching where the tag ends a line, and check each hit's line against the report's ledger tables; rule claim 6 from the code and the report's recorded run, naming
the mutation and whether the assertions distinguish it; list every count the report states as one finding outside the claims (the report is retained as returned). Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential
file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and
whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or
none>`.
