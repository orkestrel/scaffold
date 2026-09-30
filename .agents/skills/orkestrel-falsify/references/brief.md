# Writing the claims brief

Write every claim sharply enough to be broken. A claim too vague to attack returns a confirmation that proves nothing.

## Rows

Give every claims brief these rows.

- **Subject.** The whole chain, not the last commit: the tip, the branch, and one line per prior round on what it claimed to close.
- **What the round decides.** One sentence, such as "this decides whether the package is bumped and consumed downstream" or "this decides whether the fix is accepted".
- **Already established.** What the Orchestrator verified directly, so no lane re-derives it or re-reports it. State that the Orchestrator verified each item itself.
- **Review evidence.** The actual diff and the actual `git status --porcelain` output, by path. For a rendered or externally driven surface, the capture; source is corroboration.
- **Numbered falsifiable claims.** Written to `tmp/units/<unit>-claims.md`, one file both lanes read. Each claim names a property a concrete input, state, or interleaving could show false. Assign a primary lane where the lanes differ in strength; no lane skips a claim. The claim set is the round's scope: cover what the subject owns, then hold it closed. An attack against something no claim names enters the verdict only when substantiated to the `BROKEN` standard; otherwise it is a claim for the successor brief.
- **Unknowns.** What the Orchestrator does not know that the round needs, and how the lane reports on it.
- **The threshold.** State that a finding is worth more than a clean pass: the alternative is a consumer finding it after publication.

## The lane's brief

- Give a lane every row of § Rows plus **Role and lane** (the role, its engine, which lane it holds) and **Output** (the verdict shape and its single terminal line from `SKILL.md` § Verdict shape).
- Omit the writer rows: owned, shared, and off-limits files; acceptance criteria stated as gate commands. Keep the sentence that the lane performs the assignment itself and spawns nothing.
- Never hand a lane with no shell a gate criterion; it can only rule on the writer's report.

## The successor brief

A re-run takes a successor brief named per `.agents/orchestration.md` § Dispatch. It never restates the round from scratch and never edits the brief that ran.

- Add the successor round to the chain table.
- Move the closed findings into "already established".
- State what changed in the brief itself.
- Add a claim for each ruling the previous round made: an input refused rather than carried, a widening called deliberate, a site called sound and unchanged. Attack those first.

## Claims that find defects

- "The containment has no remaining door." Require the lane to enumerate the surface itself, never a registry, table, or sweep the writer produced.
- "No refusal was widened into a regression." Require the broken legitimate caller pattern to be named.
- "The instruments bind." Attack the instrument's rule: name a change it would not catch.
- "No instrument is vacuous." Require a control that cannot produce its failing verdict; name a tautology a previous round shipped.
- "The guide is true." Ask whether a false universal was replaced by an unfalsifiable one.
- "The package is coherent as a whole. Would you ship this?"
- "The self-declared sound-and-unchanged verdicts are sound." Require the lane to attack the ones it judges most likely wrong.

## Sentences that change lane behavior

- "CONFIRMED requires naming the attack you tried that failed."
- "A claim you cannot decide is UNRESOLVED, not CONFIRMED; say what would settle it."
- "Assume this chain has one more." Name the prior rounds and the defect a previous round believed closed.
- "Do not hedge toward an imagined consensus."
- Never write "an audit returning only confirmations has not tried"; a lane that manufactures a finding to satisfy the brief costs a fix unit and the credibility of the true findings beside it. Test the adequacy of an all-confirmed round afterwards, against the brief.

## Keep out of a brief

- A law already binding from `AGENTS.md` and the rule files: reference it. Where the executor's tree holds a vendored copy the canon has superseded, quote the landed text with its canonical path and mark the quotation as superseding the copy.
- Any hint of what the other lane is finding or has found.
- Your own hypothesis about where the defect is, beyond what the claims state.
