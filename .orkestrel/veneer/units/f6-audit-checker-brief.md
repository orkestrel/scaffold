# Audit lane — `checker` on Sonnet, mechanical conformance, F6 FOUNDATION

## Role and lane

`checker` on Sonnet, a fresh subagent with Read, Grep, and Glob. You hold the **mechanical** lane:
acceptance criteria, scope honesty, and parity. Say which lane you held. Perform the audit directly
and spawn nothing. You are dispatched in addition to the subjective and objective lanes, never in
place of one.

## Subject, evidence, and claims

`/home/user/scaffold/tmp/audit/f6-audit-claims.md` is the one claims file every lane reads.
`/home/user/scaffold/tmp/audit/f6-audit-evidence.md` names the review evidence: the status
output `f6-status.txt`, the diff `f6.diff` (against `07fc3c3`), the unit's report, the brief, and
the gate log `f6-gates.log.txt` when present (absent, or without a final `=== gates done` line,
means not yet complete: rule claim 9 UNRESOLVED and say so). The subject is the worktree
at `/home/user/veneer-f6`, never the main checkout at `/home/user/veneer`. You hold no shell. Rule on claims
3, 5, 8, 9, 10, 11 with `file:line` evidence, and refer every other claim to the subjective and
objective lanes as UNRESOLVED with one sentence on what you saw.

## Law

`/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/` (`tests.md`, `workspace.md`,
`documentation.md`, `writing.md`); `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md`.

## Output

The `orkestrel-falsify` verdict shape and nothing else, with one terminal line of the form
`VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <names or none>`. Cite
`file:line` for every verdict. No process diary. Your final message is the verdict.
