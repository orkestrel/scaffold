# E-ID-CODE round 3 audit — checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra and the subjective lane on Opus 5.5.

## Objective

Verdicts on claims 1, 6, and 8 of `/home/user/scaffold/.orkestrel/veneer/units/eic-audit-3-claims.md` by reading alone: the status and diff file lists against the briefs' grants, the guide rows against the diff, and every added sentence, comment, and test title against the count law, the banned-term rows, and the token-noun rule. Where a clause needs a command you cannot run, rule it UNRESOLVED and name the command. Rule a clause only on the sites you read, and name them.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{documentation,writing,quality}.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references. Evidence, all read-only: the claims file and every file it names under `/home/user/scaffold/.orkestrel/veneer/units/`, and the worktree `/home/user/veneer-eic`. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 6, and 8 — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
