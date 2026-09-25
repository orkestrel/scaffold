# ER-MECH round 4 — closing checker

## Role and engine

`checker` on Sonnet: the mechanical read that closes ER-MECH round 4 under `erm-audit-3-verdict.md` (a verbatim
prescription closes on a mechanical read and the plant log).

## Objective

Rule three numbered claims by reading alone:

1. **Verbatim sentence.** `/home/user/veneer-erm/guides/veneer.md` § Hosts carries, word for word once line breaks read
   as spaces, the sentence `er-mech-brief-4.md` item 1 gives, and no other sentence in § Hosts still says both readers
   admit `—`.
2. **Plant.** `erm-instruments/r4/logs/erm-4-plant-receipts-platform.log.txt` reads the receipts scratch-guide case
   failing with an `AssertionError` and equal before and after digests.
3. **Scope.** `erm-4-status.txt` names the same paths as `erm-3-status.txt`, and `erm-4.diff` differs from `erm-3.diff`
   only in `guides/veneer.md`'s § Hosts sentence.

## Context

Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/{documentation,writing,quality}.md`; the skill
`/home/user/scaffold/.agents/skills/orkestrel-falsify/SKILL.md` and its references. Evidence, all read-only: the files
this brief names under `/home/user/scaffold/.orkestrel/veneer/units/` and the worktree `/home/user/veneer-erm`.
Execution: a native subagent, clean context; perform the assignment directly and spawn nothing; edit nothing; run
nothing; use absolute paths.

## Output

The `orkestrel-falsify` verdict shape and nothing else — per-claim verdicts with `file:line`; findings outside the
claims to the BROKEN standard; one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>; outside the claims:
<names or none>`.
