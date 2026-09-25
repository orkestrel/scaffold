# E-ID-RECORD round 2 audit — checker

## Role and engine

`checker` on Sonnet: mechanical conformance evidence, beside the objective lane on GPT-6 Astra. The round-1 subjective lane's prescriptions were adopted verbatim, so this read closes them.

## Objective

Verdicts on claims 1, 4, and 5 of `/home/user/scaffold/.orkestrel/veneer/units/eir-audit-2-claims.md` by reading alone: each verbatim text against `/home/user/scaffold/.orkestrel/veneer/units/e-id-record-brief-2.md` character for character, the status and diff against the round-1 files, and the gate logs' exit lines. Also rule whether every round-1 finding the brief names (claims 5 and 6, `button-alias-table`, F1, F2) is closed in the diff. Where a clause needs a command you cannot run, rule it UNRESOLVED and name the command.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{documentation,writing,quality}.md`; the skill `/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references. Evidence, all read-only: the claims file and every file it names under `/home/user/scaffold/.orkestrel/veneer/units/`, and the worktree `/home/user/veneer-eir`. Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run nothing; use absolute paths.

## Output

The `orkestrel-falsify` verdict shape and nothing else, for claims 1, 4, and 5 and the round-1 findings — per-claim verdicts with `file:line`; findings outside the claims to the BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims: <names or none>`.
