# Unit J-BINDER — successor brief 8: the round-7 audit's findings

This brief supersedes `j-binder-brief-7.md` for the unit's eighth round, run by the same executor on the same uncommitted tree. What changed and why: the round-7 audit (`units/j-binder-audit-7-verdict.md`, reconciling the objective lane's `FAIL 5`, the subjective lane's `FAIL 3, 4, 5`, and the checker) confirmed the three reads in `toggle`, the overlap proof, and the owner sentence, and found two prose defects and one weak assertion: the rule paragraph scopes the takeover stop to the `await` door while the canonical takeover happens at the dispatch door; one comment in `HostSnapshot.ts` still names a restoration as the owner; and the overlap proof's later-save assertion cannot tell a live `earlier` from a leaked pending one. Every ruling is an edit here, each with the exact wording the lanes proposed. The report-only patches stay unapplied.

## Role and engine

`opus` on Opus 5.5, the native subagent that ran rounds 2 to 7, resumed; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` (branch `unit/binder`, tip `cea3359`, rounds 2 to 7 uncommitted in the tree).

## Objective

Make the rule paragraph's takeover stop apply at every door, make every owner sentence name the snapshot, strengthen the overlap proof's last assertion, and keep the round-2 acceptance commands green.

## Context

**Evidence.** `units/j-binder-audit-7-verdict.md` (every ruling), `units/j-binder-audit-7-subjective-verdict.md` (claim 3's interleaving and the paragraph's wording; claim 4's surviving site and its wording), `units/j-binder-audit-7-objective-verdict.md` (the bound on the overlap proof's later-save assertion). Locate each site by its symbol.

**Law, host, and standing conditions.** As in `j-binder-brief-4.md`.

## The edits

- **H1 (claim 3): the takeover stop at every door.** In `guides/veneer.md` § Ownership and restoration, the rule paragraph's `await` sentences become: a sequence that awaits meets a third door at each `await`, because any code can run before it resumes; at each of its doors (every write, dispatch, and `await`) it reads its lifetime and the host again, and it stops, an asynchronous sequence resolving `false`, when the engine was destroyed or when the host shows that another call has taken the change over; each engine's own subsection states what that reads as for its host. The synchronous rule's own stop sentence stays as it is (a synchronous sequence with no takeover reading has nothing to read).
- **H2 (claim 4): one owner noun everywhere.** In `HostSnapshot.ts`, the `#publish` comment becomes: publishes one value a restoration has still to write back, unless another snapshot already owns that target on the element; the restoration that started first writes it. Sweep `HostSnapshot.ts`, `types.ts`, and the guide with `restoration[a-z ]* owns` and `restoration[a-z ]* own ` and change every hit to the snapshot as owner.
- **H3 (the bound): the overlap proof's last assertion.** In the overlap case, before the later snapshot saves, give the host a distinct live value (the case already writes `later` after the save; write a distinct value such as `live` before the save instead, then `later` after it) so the final assertion `toBe('live')` tells a live read from a leaked pending `earlier`. Confirm the three G2 mutation rows still redden the case and record their tallies.
- **H4 (the criterion).** The round-8 acceptance sweep is `grep -n -i "restoration[a-z ]* owns\|restoration[a-z ]* own " src/browser/HostSnapshot.ts src/browser/types.ts guides/veneer.md` returning no hit, and `grep -n "every write, dispatch, and" guides/veneer.md` returning the rule paragraph.

## Unknowns

None.

## Scope, execution, tools, and limits

As in `j-binder-brief-4.md`.

## Output

Return the report as your final message: per edit H1 to H4, what changed; the exact new sentences; the H3 case's green reading and the three G2 rows' tallies after it; the output of the round-2 acceptance criteria 1 to 6 verbatim; the H4 sweeps' output; `git status --short` and `git diff --stat`.

## Acceptance criteria

Criteria 1 to 6 of `j-binder-brief-2.md`; the H4 sweeps as stated; the three G2 mutation rows each redden the overlap case.

## Review evidence

The actual diff (`git diff HEAD` with the renames intent-to-add) and status of the worktree, captured by the Orchestrator as `j-binder-8.diff` and `j-binder-8-status.txt` (rounds 2 to 8 together), and the report.
