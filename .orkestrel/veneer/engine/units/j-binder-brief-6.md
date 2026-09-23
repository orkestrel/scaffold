# Unit J-BINDER — successor brief 6: the round-5 audit's findings

This brief supersedes `j-binder-brief-5.md` for the unit's sixth round, run by the same executor on the same uncommitted tree. What changed and why: the round-5 audit (`units/j-binder-audit-5-verdict.md`, reconciling the objective lane's `FAIL 3, 4`, the subjective lane's `FAIL 2, 3, 4`, and the checker) confirmed the liveness re-checks and every restoration path, ruled on both lanes' evidence that the per-call ownership object derives nothing the snapshot identity and the captured lists do not already carry, broke one guide sentence that the withdraw-after-write contradicts, and referred one further interleaving in the write sequences (a reaction that re-enters the same engine's method rather than destroying it). Every ruling is an edit here. The report-only patches stay unapplied.

## Role and engine

`opus` on Opus 5.5, the native subagent that ran rounds 2 to 5, resumed; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` (branch `unit/binder`, tip `cea3359`, rounds 2 to 5 uncommitted in the tree).

## Objective

Make the snapshot the owner of what its restoration publishes, make every write sequence read the host again after a reaction-capable write for what it writes next and returns, make the guide's sentences true, with red-first proofs, and the round-2 acceptance commands green again.

## Context

**Evidence.** `units/j-binder-audit-5-verdict.md` (every ruling), `units/j-binder-audit-5-objective-verdict.md` (claim 2's traces; claim 3's counterexample; claim 4's referral on the throwing-write mutation), `units/j-binder-audit-5-subjective-verdict.md` (claim 2's smallest correct change and what over-correcting would break; claim 3's wording; R1's interleaving; the bounds), `units/j-binder-mutations-5-orchestrator.log.txt` (the Orchestrator's replay, with the cleanup-only probe row). Locate each site by its symbol.

**Law, host, and standing conditions.** As in `j-binder-brief-4.md` (the `types.ts` grant covers the sentences F1 and F3 name).

## The edits

- **F1 (claim 2): the snapshot owns.** In `HostSnapshot`, delete the per-call `invocation` object and its comment; the pending entry's field and the `#publish`, `#writeBack`, and `#withdraw` parameters become `owner: HostSnapshot`, `restore()` passes `this`, and `#take` withdraws through `entry.owner`. Keep the owner comparison in `#writeBack` and `#withdraw` (it carries the first-publisher rule across snapshots), keep the `finally` walk over the call's captured records and class map, keep the unconditional self-take, and keep withdraw-after-write. Rewrite `restore`'s comment to name the mechanism that bounds a nested restore: the `finally` walks this call's captured records, and every save made in between took its target first. Use one term, "restoration", for a single `restore` call everywhere the round-5 text says "restoration invocation" or "invocation" (`HostSnapshotInterface.restore`'s remark, the class remark's second paragraph, the guide's § Ownership and restoration); write "the restoration that started first" where the text says "the first to publish it". Drop the "entries owned by the snapshot, not the invocation" mutation row: it is the code.
- **F2 (claim 3): the guide sentence.** In `guides/veneer.md` § Ownership and restoration, the sentence beginning "An engine constructed in reaction to any restoration write therefore records the host as it was before the destroyed engine touched it" becomes: an engine constructed in reaction to any restoration write records none of the destroyed engine's writes; it takes each value the restoration has still to write back and reads each target already written back from the host, edits you made included, and no later write of the destroyed engine overwrites it.
- **F3 (R1 and R2): the write sequence reads the host again.** A reaction inside a reaction-capable write can call the same engine's method again rather than destroy it, and the outer call then resumes with a stale local (`Button.toggle`: the outer's `pressed` local after an inner `toggle` removed the token; `ColorMode.apply`: the outer's `mode` after an inner `apply` wrote the other mode). Rule: after each reaction-capable write, the sequence reads the host for every value it writes next and for what it returns. `Button.toggle` writes `aria-pressed` from `this.pressed` read after the token write, dispatches its event with that same read, and returns `this.pressed` read after the dispatch (a listener can run inside the dispatch); `ColorMode.apply` writes storage from `this.mode` read after the attribute write. The guide's rule sentence in § Ownership and restoration says both halves for every engine: after each write or event dispatch a reaction or a listener can run inside, a write sequence reads its lifetime and the host again, stops when destroyed, and takes what it writes next and returns from that read; name a custom element's attribute reaction and a synchronous listener as the two doors. The contract sentences on `toggle` ("Toggles the live host, or returns its state without writing after destruction"; "Flips the mode and returns the applied mode…") already say the live host; change neither.
- **F4 (claim 4, the instrument).** Extend the instrument into a round-6 file with the rows of round 5 minus the dropped one, plus: the cleanup-only throwing-write row (the `finally` block withdraws nothing while the exception still propagates, as the Orchestrator's probe row in `j-binder-mutations-5-orchestrator.log.txt`), a row for each F3 re-read (the `aria-pressed` value and the event detail from the stale local; the return from the stale local; the storage write from the stale `mode`), and a row for the F1 owner comparison removed from `#writeBack` (which the cross-snapshot proofs must redden). Each mutation named once.
- **F5 (the proofs, red first).** `Button.test.ts`: a host observing `class` whose one-shot reaction to the token write calls `toggle()` again; assert the host ends without the token, with `aria-pressed="false"`, the last event carrying `pressed: false`, and the outer call returning `false`. `ColorMode.test.ts`: a root whose one-shot reaction to the theme attribute write applies the other mode; assert the attribute and storage agree afterwards and `toggle` returns the mode the root carries. Each reads red on the round-5 source and green after; record both. Every round-5 proof stays green; the re-entry proof and the R1, R2, and throwing-write proofs keep their assertions.
- **F6 (parity).** Every changed cell; the § Methods cells; the guide paragraph's wording under F1 to F3.

## Unknowns

1. Whether `Button.toggle`'s event detail after an inner `toggle` inside its token write is the live state (the ruling: yes, one read after the token write serves the attribute and the detail); report the proof's reading of the two events' order and details.
2. Whether any other engine-level sequence re-reads a stale local (`ColorMode.toggle`'s `this.mode === 'dark'` read before `apply` is a read of the host, not a local): rule and report.

## Scope, execution, tools, and limits

As in `j-binder-brief-4.md`. The brief-5 criterion (`grep -n "owner: this\|owner === this" src/browser/HostSnapshot.ts` returning no hit) is retired by F1.

## Output

Return the report as your final message: per edit F1 to F6, what changed and the finding it closes; each new proof's red and green readings; the Unknowns' answers; the mutation rows for every new or rewritten proof and the rows whose tallies moved; the output of the round-2 acceptance criteria 1 to 6 verbatim; `git status --short` and `git diff --stat`.

## Acceptance criteria

Criteria 1 to 6 of `j-binder-brief-2.md`; every F5 proof present, red before and green after; `grep -n "invocation" src/browser/HostSnapshot.ts src/browser/types.ts guides/veneer.md` returns no hit; `grep -n "as it was before the destroyed engine" guides/veneer.md` returns no hit.

## Review evidence

The actual diff (`git diff HEAD` with the renames intent-to-add) and status of the worktree, captured by the Orchestrator as `j-binder-6.diff` and `j-binder-6-status.txt` (rounds 2 to 6 together), and the report.
