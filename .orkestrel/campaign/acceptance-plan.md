# 0.0.50 — the exit criterion, and the rules the campaign stopped following

Written 2026-08-23, after the user observed the goalposts moving. This is the plan the rest of the
campaign follows without deviation.

## What I got wrong

`.claude/rules/quality.md` § Rounds and verdicts was invoked at the selector seam's fifth round and
then not followed. Four rules beside it were skipped:

- **Line 86-87.** The strategy switch **ends the depth search**. I wrote the ruling and then ran two
  more fix-then-audit cycles in exactly the shape the ruling was supposed to replace. A ruling
  followed by more depth search is not a strategy switch; it is a depth search with a document in
  front of it.
- **Line 83.** "A fix that adopts the auditor's prescription verbatim may close with a **mutation
  probe in place of a fresh audit round**." Several fixes adopted prescriptions verbatim and got a
  full cross-engine round anyway. That is spending two engines to re-derive a bound the auditor
  already wrote and the probe already pinned.
- **Line 89.** "A subject that reprices itself on every edit — a count, a census, a total over prose —
  has no closing condition and is not a seam. Drop the claim, or recast it." The writing-contract
  sweep over campaign reports repriced every single round, because each round writes new report prose
  containing new counts. I carried it forward every time instead of dropping it. It has no closing
  condition by construction.
- **Line 90.** "Write the round count down… so it is a fact rather than a feeling. A seam that has
  consumed more rounds than the rest of the matrix combined has already answered the question." Never
  written down. It is written down now, in the following table, and the answer it gives is that the
  seam is closed.

`AGENTS.md:114` states it plainest: **scope closed and gates green, stop — another pass over the same
surface is a new instruction, not diligence.**

## The round count, as a fact

| seam | rounds |
| ---- | ------ |
| the CommonJS decision | design, W-units, then A, G/H/I, J, L, K, M/N, P, Q, R, S, T with an audit between most |
| everything else in this version combined | fewer |

The seam has consumed more than the rest of the matrix combined. Per line 90 it has already answered
its question, and the answer is the declaration-authority ruling, which held under the round that
followed it: neither lane attacked the invariant, and the subjective lane re-asked every repaired case
at every entry point and broke none.

## The exit criterion

Fixed here, and not reopened by an auditor's finding. From the user's own instruction: scaffold is
ready to publish once it propagates as planned, tested against the real packages first.

1. Both self-fulfilling derivations closed — the distribution proof and the setup proof.
2. The candidate propagates across the real fleet, with the presence-owned proof deleted per target so
   the regenerated one is what runs.
3. The authoritative gates green under an independent verifier.
4. The publish approval surfaced to the user, whose credential and decision it is.

**Not** "no auditor can find anything." That criterion is unbounded, it is what I have been chasing,
and `.agents/orchestration.md` names the failure exactly: accept when the exit criterion is met and
the gates are green, not when the last engine runs out of appetite.

## What closes now, and how

- **FIX-T closes under line 83, with no further audit round.** It adopted the prescription verbatim —
  the bound came from the FIX-R subjective lane, the Orchestrator wrote it into the brief unchanged,
  and the unit implemented that and nothing else. It carries two mutation probes and both fired,
  including one proving the own-key check is load-bearing rather than implied. The probe is the
  regression guard the rule asks for.
- **The writing-contract sweep is dropped as an audit claim, under line 89.** Every hit across the
  last rounds sat in `.orkestrel/campaign/` files, which prune at acceptance and reach no consumer.
  Recast to the property the tally stood in for: **the bytes a target receives carry no banned term**,
  which is checkable once at acceptance over the vendored set rather than repriced every round.
- **Sol's parity caveat becomes a roadmap row, not a round.** Exact parity with TypeScript outside the
  measured condition, fallback, substitution, and package-scope shapes is a bounded acknowledgment.
  `AGENTS.md:91` directs a finding outside current scope to the capability that owns it, for the next
  change.

## The remaining work, in order

1. Fleet sweep: all eleven targets, `--offline`, proof deleted per target, five gates plus the
   release-mode proof each.
2. Independent `verifier` on the authoritative gates, `prepublishOnly` included.
3. Recast writing check over the vendored bytes.
4. Surface the publish approval.

Nothing else. A finding outside this list is recorded against the capability that owns it.
