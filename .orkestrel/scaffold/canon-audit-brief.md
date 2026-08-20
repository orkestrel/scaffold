# CANON-AUDIT — the round that gates two rules into forty-four packages

## What this round decides

Whether two new rules and nine repairs land in `.claude/rules/writing.md` and the canon around it.
`@orkestrel/scaffold` vendors `.claude/rules/`, `.agents/orchestration.md`, `.claude/agents/`, and
`.agents/skills/` into forty-four packages, so a rule that is wrong here is wrong forty-four times,
and a rule that condemns good prose will be worked around rather than followed.

A finding is worth more than a clean pass.

## The subject

`/home/user/scaffold` on branch `claude/oxlint-conventions-audit-m66uiq`, the uncommitted working
tree over `b7662ba`. Seven files, 39 insertions, 18 deletions.

## How it got here

An adversarial audit of `@orkestrel/process` found the same defect shape in two consecutive rounds:
a number stated in prose disagreeing with what it counts. Its escalation clause says that after
enough findings at one seam the ruling owed is on the design rather than on the next defect. The
Orchestrator drafted two rules; two blind design lanes attacked them and both amended both; a census
over five disjoint slices of this repository found nine live defects against roughly a hundred
correct counts. An implementer then landed the amended rules and repaired the nine.

Two of the nine were written by the Orchestrator in this same session, which is why the round exists.

## Already established — do not re-run

- The implementer re-counted every one of the nine sites itself and found the brief's own table
  wrong twice: row 8's ordinals in `orkestrel-falsify/SKILL.md` agreed with their table and were not
  a count defect, and row 9's `src/bin/helpers.ts` miscount matched neither "seven" nor "nine" under
  any reading of `OPTION_SUMMARY`. Both were repaired on the implementer's own measurement.
- An independent verifier's gate readings are at `.orkestrel/scaffold/canon-gates.md`. Do not re-run
  the gate suite; attack what green does not prove.

## Review evidence

Every path is relative to `/home/user/scaffold`.

- `.orkestrel/scaffold/canon-diff.txt` — the actual diff, 162 lines.
- `.orkestrel/scaffold/canon-brief.md` — what the implementer was told to do.
- `.orkestrel/scaffold/canon-gates.md` — the verifier's gate report.
- The working tree is the subject, so every file reads as it would ship.

## Numbered claims

Attack each. `CONFIRMED` requires naming the attack you tried that failed. A claim you cannot decide
is `UNRESOLVED`, not `CONFIRMED` — say what would settle it.

**1. Rule A condemns every live defect in this repository.** Claim: no sentence anywhere under
`.agents/`, `.claude/`, `AGENTS.md`, `CLAUDE.md`, `guides/`, `src/`, or `tests/` states a number or
an ordinal that disagrees with what it points at. Enumerate the population yourself with your own
patterns — the implementer's patterns are in its report and are exactly what you should not reuse,
because a sweep reports on the population its pattern admits.

**2. Rule A spares every correct sentence.** Claim: no sentence Rule A condemns is one this
repository is right to keep. Pick the ten retained counts you consider most likely to be condemned by
a literal reading of the four bullets, and rule on each. A rule that condemns good writing is worked
around rather than followed, and that failure is invisible until the next audit.

**3. Rule A is decidable without knowing the design.** Claim: a reader who has never seen this
repository can apply the four bullets to a sentence and get the same answer the author intended. The
draft this replaced failed exactly here — its exemption said "a fixed set the design itself fixes",
which requires knowing the design. Attack whether "does more than tally" is any better, and name a
sentence where two competent readers would disagree.

**4. Rule B's inflection claim is true and its instrument obligation is actionable.** Claim: matching
case-insensitively and across inflections reaches every form of every banned term in the preceding
table, and "name the pattern and the paths behind every sweep result" is something an agent can do
without inventing a convention. Check `etc.`, `e.g.`, `i.e.`, `and/or`, and `allows you to`, which
have no ordinary inflections, and say whether the rule reads as false of them.

**5. The nine repairs are correct.** Claim: each of the nine now says something true. Re-count each
site yourself. Two of them — the analyst and sol role files — now say "the two things"; verify
against `.claude/agents/codex.md` that exactly two placeholders are left to the dispatch.

**6. No repair broke a reference.** Claim: every ordinal that was replaced by a name still points at
the same thing, and no other file references the renamed target by its old position. Repairs 4, 5,
and 8 replaced `rule 4`, `the fifth kind`, and two row ordinals with names.

**7. Neither rule contradicts a bullet already in `writing.md`.** Claim: Rule A sits beside "Write a
numeral for a technical quantity, a version, or a count" without producing an unresolvable
instruction, and Rule B sits beside the substitution table without duplicating a rule stated
elsewhere. `AGENTS.md` § Instruction files says a rule gets one home; check that neither rule now has
two.

**8. No instrument in this change is vacuous.** Claim: the repairs are checkable. Rule A and Rule B
are prose rules with no gate — say plainly whether that is acceptable or whether one of them could be
gated by something this repository already runs, and if so which.

**9. Would you vendor this to forty-four packages?** Claim: nothing in this change leaves a seam that
no single file shows.

## Unknowns

- The implementer left two observations it did not repair: `.agents/orchestration.md:412` carries a
  temporal `once`, and `above` still appears in `.claude/rules/architecture.md:113` and elsewhere.
  The `above`/`below` ban's scope is an open question the Orchestrator holds. Rule on the `once` one;
  report on the other without ruling.

## Your verdict

Return exactly the shape `.agents/skills/orkestrel-falsify/SKILL.md` § Verdict shape fixes: numbered
verdicts in this brief's order, then any findings fitting no claim substantiated to the `BROKEN`
standard, then one terminal line and only one.

You are read-only in this sandbox: you can read and run commands, and you write nothing. Where a
claim needs an executed probe you cannot run, say so and name what would settle it.

No process diary.
