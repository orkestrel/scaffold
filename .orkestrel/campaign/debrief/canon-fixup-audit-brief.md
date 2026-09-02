# Audit brief — unit canon-fixup

## Role and lane

One read-only lane: `reviewer` on Claude Opus 5 in a clean context, holding the objective lane as the recorded substitution for the dark GPT-5.6 Sol bench. A Sonnet `builder` wrote the subject, so this round is cross-engine.

## Subject

The unit's uncommitted changes in `/home/user/scaffold`: the diff at `tmp/units/canon-fixup.diff` (`git diff HEAD`), the status at `tmp/units/canon-fixup.status`, the writer's report at `tmp/units/canon-fixup-report.md`, and the rows at `tmp/units/canon-fixup-brief.md`. The round before it is retained under `.orkestrel/campaign/debrief/canon-audit-*.md`, whose findings the rows close. The baseline is commit `18eb2fc`.

## What the round decides

Whether the refined canon is committed and propagated to every fleet target, or goes back for another fix round.

## Already established

The rulings behind the rows (in `.orkestrel/campaign/debrief.md` and the canon-audit verdicts) are not under audit; disagreement with a ruling is a referral.

## Claims

1. Every row of `tmp/units/canon-fixup-brief.md` is `applied` with the row's exact text at the named place, or `stopped` with a deviation naming the text not found; no row is silently skipped or paraphrased.
2. Each finding the rows exist to close is closed by the landed text: the grok mirror's `session_id` clause (row 1); the Execution-line retention in the audit-lane brief section (row 2); the qualified `kind`/`type` absolute beside the wire-body exception (row 3); the writer's-report value in the `UNRESOLVED` row (row 4); the lane-count pointer replacing the restatement (row 5); the `should` repairs (rows 6, 7); the opus mirror's authority pointer (row 8); the checker's referral addressee (row 9); the planner `Measurements` obligation a read-only lane can meet, mirrored (rows 10, 11); the grok mirror's `.err` reading (row 12); § The engines pointing at step 5 and step 5 recording the checker (rows 13, 14); the wave-shape sentences moved to § Fixing a dependency before it publishes with the order sentence alone remaining in § Publishing (row 15); item 1 of § Writing concurrency pointing at § Permission floor (row 16); the serialization vocabulary in every named charter and transport (row 17); the reviewer description (row 18); the audit-lane brief section naming every § Anatomy row plus its own two (row 19); item 3's scope sentence (row 20); the `entity` bullet reflowed with no word changed (row 21).
3. One home per rule still holds after the moves: no landed sentence restates a law another file owns, and the moved wave sentences appear once.
4. The writing sweep over every touched file is clean: `\b(should|robust|performant|utilize|leverage)\b` returns nothing outside `.claude/rules/writing.md`; every `just` or `via` hit in a touched file is on an untouched line in a permitted sense (name each).
5. `git status --short` lists only the files the rows name plus `host.json`; no file outside them moved.
6. Every landed line is a directive per `AGENTS.md` § Instruction files, with no count in prose.

## Unknowns

None.

## Output

The `orkestrel-falsify` verdict shape: numbered per-claim verdicts with `file:line` evidence, findings outside the claims, referrals, attacked and held, and exactly one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>; outside the claims: <finding ids or none>`. Say in your first line which lane you held and the engine substitution.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing. Read-only; edit nothing.
