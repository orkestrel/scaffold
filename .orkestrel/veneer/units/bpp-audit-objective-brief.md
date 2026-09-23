# Audit lane — `reviewer` on Opus 5.5 holding the objective lane (Astra dark on quota), B-PASSIVE-PROSE (`bpp`)

`reviewer` on Opus 5.5 (native subagent, clean context, read-only), substituted for the `analyst` route because the Codex bench reported its usage limit at 13:34 UTC (journal `tmp/codex/bpp-audit-analyst.jsonl`, thread `01a0ce4f-7555-7033-83cc-7991995c4bba`); the subject tree is
`/home/user/veneer-bpp`. You hold the **objective** lane over the claims in
`/home/user/scaffold/.orkestrel/veneer/units/bpp-audit-claims.md`, which names the evidence; the
unit was written by `builder` on Sonnet, and a `checker` lane rules the mechanical claims blind
beside you. The unit's brief is `/home/user/scaffold/.orkestrel/veneer/units/b-passive-prose-brief.md`
and its report `/home/user/scaffold/.orkestrel/veneer/units/b-passive-prose-report.md`; the review
evidence is `/home/user/scaffold/.orkestrel/veneer/units/bpp.diff` (the whole diff against
`87ff1d0`) and `bpp-status.txt`; the ruling is R9 in
`/home/user/scaffold/.orkestrel/veneer/b-passive-close-design-verdict.md`. Law:
`/home/user/scaffold/AGENTS.md` and
`/home/user/scaffold/.claude/rules/{writing,tests,typescript,names}.md`. Perform the audit
directly and spawn nothing. Bound: rule within 12 minutes.

Standing conditions: you have Read, Grep, and Glob only (no shell): rule claim 2 by grepping the two
files for the pattern yourself; rule claim 4 from the code and the report's recorded run, naming
the mutation and whether the assertions distinguish it; list every `{@link}` tag followed directly
by a verb outside claim 2's regex as a finding outside the claims (the carrier's input), never as a
BROKEN claim. Never edit the worktree. Never read `.env*`, `.npmrc`, `auth.json`, or any credential
file.

Output: the `orkestrel-falsify` verdict shape and nothing else — numbered verdicts with `file:line`
(for a CONFIRMED verdict, the attack that failed; for a claim about a proof, the mutation and
whether the assertions distinguish it), findings outside the claims to the `BROKEN` standard, and
one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or
none>`.
