# Unit J-BINDER — successor brief 5: the round-4 audit's findings

This brief supersedes `j-binder-brief-4.md` for the unit's fifth round, run by the same executor on the same uncommitted tree. What changed and why: the round-4 audit (`units/j-binder-audit-4-verdict.md`, reconciling the objective lane's `FAIL 1, 2, 5`, the subjective lane's `FAIL none` with F1, and the checker) confirmed the handoff on every round-3 path and found two further interleavings, one in the button's write sequence and one in a re-entered restoration, plus one over-claiming sentence and two referrals. Every ruling is an edit here. The report-only patches stay unapplied.

## Role and engine

`opus` on Opus 5.5, the native subagent that ran rounds 2 to 4, resumed; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` (branch `unit/binder`, tip `cea3359`, rounds 2 to 4 uncommitted in the tree).

## Objective

Make every write sequence and every restoration invocation safe against a reaction that destroys or re-enters it, with red-first proofs, and make the interface's sentences exact, with the round-2 acceptance commands green again.

## Context

**Evidence.** `units/j-binder-audit-4-verdict.md` (every ruling), `units/j-binder-audit-4-objective-verdict.md` (claim 1's exact interleaving with its citations; claim 5's exact interleaving; the paths that held), `units/j-binder-audit-4-subjective-verdict.md` (F1; R1's trace; R2; the bounds). Locate each site by its symbol.

**Law, host, and standing conditions.** As in `j-binder-brief-4.md` (the `types.ts` grant covers the sentences E3 names).

## The edits

- **E1 (claim 1): the write sequence re-checks liveness.** In `Button.toggle`, after `classList.toggle` (a reaction-capable write) and before the `aria-pressed` write and the event dispatch, re-check the controller: when the engine was destroyed during the write, stop, writing nothing further and dispatching nothing, and return the host's state as the contract's after-destruction sentence says. Apply the same rule to every other reaction-capable write sequence in `Button` and `ColorMode` (`apply` writes one attribute, so it needs only its existing check; say so in the report). The guide's § Ownership and restoration states the rule for every engine: a write sequence re-checks its lifetime after each write a reaction can run inside, so a component unit inherits it.
- **E2 (claim 5, R1, R2): restoration invocations own their entries.** In `HostSnapshot`, each `restore()` invocation publishes its entries under an invocation token (a fresh object per call) rather than the snapshot; `#owns`, `#take`, and `#unpublish` compare that token, so a nested `restore()` on the same snapshot withdraws only its own entries and the outer invocation keeps and writes its own; each target is withdrawn right after its write (the `classed` entry after the class pass), so an entry published is one still to write back; `#take` takes any pending entry, including one the same snapshot's earlier invocation published (a snapshot saving during its own restoration records the pending original, which its next restore writes back). Say in `#take`'s comment that withdrawing the entry is what makes the restoring invocation skip the target and lets a later save read the element.
- **E3 (F1, the interface sentences).** In `src/browser/types.ts`, `HostSnapshotInterface.restore`'s remark says each `class` attribute the snapshot recorded as absent and the tokens left empty is removed, that a token's first save records whether the `class` attribute was present, that a target is withdrawn as soon as it is written back, that each restoration invocation owns its own entries, and that where two restorations overlap on one target the first to publish writes it (the precedence question for two engine classes on one host being the first such unit's to rule); `HostSnapshotInterface.save`'s description gains one sentence on the handoff; the guide's cells follow.
- **E4 (the proofs, red first).** `Button.test.ts`: the objective lane's claim-1 interleaving (a registered custom element observing `class`; A destroyed with a reaction constructing B and toggling it; B's token write's reaction destroys B and constructs C without toggling; assert C is registered and unpressed, the host carries no `aria-pressed`, and B dispatched no event after its destruction). `HostSnapshot.test.ts`: the claim-5 interleaving (S records an absent token and an attribute; a `class` reaction during S's token pass saves a new attribute through S, writes it, and calls `S.restore()`; assert the outer restoration still writes its attribute and the `classed` bit and the nested one removes the new attribute); R1's case (a reaction to the last write edits the host and then constructs a replacement, whose snapshot must read the live element for the already-written target); R2's case (a consumer-constructed snapshot whose reaction saves a pending target through the restoring snapshot itself). Each reads red on the round-4 source and green after; record both.
- **E5 (parity and instruments).** Every changed cell; the instrument extended into a round-5 file with rows for the liveness re-check, the invocation ownership, the withdraw-after-write, and the self-take; each mutation named once.

## Unknowns

1. Whether `Button.toggle`'s return value after a mid-write destruction is the host's live state or the state the engine last knew: rule under the contract's after-destruction sentence ("returns its state without writing") and say which; the Orchestrator expects the host's live state read through the resolved token.
2. Whether withdrawing after each write changes any round-4 proof's expectation (the "pending targets never unpublished" mutation row in particular): re-run the round-4 rows and report the ones whose tallies moved.

## Scope, execution, tools, and limits

As in `j-binder-brief-4.md`.

## Output

Return the report as your final message: per edit E1 to E5, what changed and the finding it closes; each new proof's red and green readings; the Unknowns' answers; the mutation rows for every new or rewritten proof; the output of the round-2 acceptance criteria 1 to 6 verbatim; `git status --short` and `git diff --stat`.

## Acceptance criteria

Criteria 1 to 6 of `j-binder-brief-2.md`; every E4 proof present, red before and green after; `grep -n "owner: this\|owner === this" src/browser/HostSnapshot.ts` returns no hit.

## Review evidence

The actual diff (`git diff HEAD` with the renames intent-to-add) and status of the worktree, captured by the Orchestrator as `j-binder-5.diff` and `j-binder-5-status.txt` (rounds 2 to 5 together), and the report.
