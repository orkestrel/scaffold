# Unit J-BINDER — successor brief 4: the round-3 audit's findings

This brief supersedes `j-binder-brief-3.md` for the unit's fourth round, run by the same executor on the same uncommitted tree. What changed and why: the round-3 audit (`units/j-binder-audit-3-verdict.md`, reconciling the objective lane's `FAIL 2, 5`, the subjective lane's `FAIL 2, 4, 6` with F1, and the checker) found the residual restoration path reachable through supported delegate configurations and ruled a closure inside `HostSnapshot` that makes the delegate's hold unnecessary, renamed two types, and corrected one guide sentence. Every ruling is an edit here. Round 2's and round 3's report-only patches stay report-only and integrate at landing; do not apply them.

## Role and engine

`opus` on Opus 5.5, the native subagent that ran rounds 2 and 3, resumed; the sole writer in the worktree `C:/Users/mikes/WebstormProjects/veneer-binder` (branch `unit/binder`, tip `cea3359`, rounds 2 and 3 uncommitted in the tree).

## Objective

Close the restoration hazard for every engine and every path with a handoff inside the snapshot, drop the delegate's hold, state the teardown contract on the interfaces, land the two renames and the declared parser map, and correct the guide, with the round-2 acceptance commands green again.

## Context

**Evidence.** `units/j-binder-audit-3-verdict.md` (every ruling), `units/j-binder-audit-3-objective-verdict.md` (claim 2: the reaction-boundary table and the exact failing interleaving with its citations; the delegate-initiated and cross-delegate paths), `units/j-binder-audit-3-subjective-verdict.md` (claim 2's traces and the handoff design; claim 4's names; claim 6's sentence; F1; R3 and R5), the HTML standard's custom-element reaction ordering (a `class`, `style`, or attribute write invokes `attributeChangedCallback` before returning; a `MutationObserver` delivers through a microtask). Locate each site by its symbol.

**Law, host, and standing conditions.** As in `j-binder-brief-3.md`, with this grant: `src/browser/types.ts` is owned this round for the sentences and declarations D3 and D4 name and nothing else.

## The edits

- **D1 (claim 2): the snapshot handoff.** In `HostSnapshot`, keep one class-static registry of restorations in progress, keyed weakly by element, holding each pending target (category and name) with its recorded original (value, priority, and the element's recorded `class`-attribute bit for a token). `restore()` publishes its records there before its first write, writes in the documented order, and unpublishes at the end; a `save(target)` called while that element's target is pending takes the pending original instead of reading the live element, records it as its own, and marks the target as taken over, and the restoring snapshot skips every target taken over (its later writes never touch a value another engine now owns). The `class`-attribute bit follows the token records the same way. `Button.destroy` keeps abort, release the claim, restore. In `Delegate`, delete `#held`, `#restore`, and the held drive: `#release` calls `engine.destroy()` directly, `#activate` drives at once, and a click that arrives during a restoration finds no owner (the claim is released first), constructs a fresh engine whose snapshot takes the pending originals, and toggles it. Rename `#settle` to a verb that says "stop observing when nothing is owned".
- **D2 (claim 2): the proofs, red first.** In `tests/src/browser/HostSnapshot.test.ts`: a snapshot saved for a target while another snapshot restores it records the pending original and the restoring snapshot skips that target (assert the element's final state and both snapshots' restores). In `tests/src/browser/Button.test.ts`: the objective lane's interleaving: a registered custom element with no `class` and no `aria-pressed`, constructed and toggled, whose `class` reaction constructs and toggles a replacement during `destroy` at the token write; assert after the destroy that the replacement is registered and pressed with `aria-pressed="true"`, and after the replacement's own destroy that the host carries neither `class` tokens nor `aria-pressed`. In `tests/src/browser/Delegate.test.ts`: the subjective lane's R5 cases: a consumer destroys a delegate-acquired custom element through `Button.find(host)?.destroy()` and its `class` reaction clicks it (assert `aria-pressed` after the restoration and after the replacement's destroy); nested delegates where the outer acquired the host and the inner is constructed later, the reaction moving and clicking the host into the inner root; keep the round-3 restoration proofs, retitled where the hold's wording no longer holds, and delete the "holds a click…" proof with the hold. Every new proof reads red before D1 and green after; record both readings.
- **D3 (R3): the contract states the order.** In `src/browser/types.ts`, `HostSnapshotInterface.restore`'s TSDoc states the write order (tokens, emptied `class` attributes, inline properties, attributes last) and the handoff (a snapshot saved for a pending target during a restoration takes the original and the restoring snapshot skips it); `ButtonInterface.destroy`'s TSDoc states that the claim is released before the host is restored. The guide's § Methods cells follow.
- **D4 (claim 4, F1): the names.** `AttributeNames<TKey>` becomes `AttributeMap<TKey>` (every `{Entity}AttributeMap` is an `AttributeMap<keyof …>`), carried through `helpers.ts`, the § Surface row, and the guide sentence; the `parsers` parameter's mapped type becomes `ParserMap<T, TKey>` declared in `types.ts` ("Maps each declared option key to the parser that coerces its attribute value") with TSDoc and a § Surface row; `CallRecording` becomes `CallRecordingInterface` in `tests/setupBrowser.ts` and in the report-only setup-test patch (return a refreshed `j-binder4-setuptest.diff` that supersedes `j-binder3-setuptest.diff`). Repeat the fleet-name sweep for `AttributeMap`, `ParserMap`, and `CallRecordingInterface`.
- **D5 (claim 6, bounds).** The `## Engine` paragraph says an option inside a group has an attribute-table key but no top-level option key of that name, so the resolver cannot pair them by one key, and the first engine that declares one rules how its attribute projects; wrap the two unwrapped guide lines; `HostSnapshot`'s record type is declared in `types.ts` only if it is public, else stays private (rule under `architecture.md` and say so).
- **D6 (parity).** Every changed description's Summary cell and every changed § Methods cell updated; the export list; the instrument extended into a round-4 file naming each mutation once, with rows for the handoff (the pending original not taken; the taken target not skipped; the registry not unpublished) and for the delegate's direct destroy.

## Unknowns

1. Whether the handoff must also cover a replacement saved during a restoration by a different engine class on the same host (a Collapse over a Button's host): rule; the registry is per element and per target, so a lane expects yes, and a proof with two `HostSnapshot` instances alone settles it.
2. Whether a `MutationObserver` delivery (a microtask) can interleave with a restoration: rule from the standard (it cannot, a restoration being synchronous) and say so in the remark.

## Scope

**Owned.** As in `j-binder-brief-3.md`, with `src/browser/types.ts` for D3 and D4 alone and `tests/setupBrowser.ts` for F1 alone. **Shared (report-only).** `tests/setupBrowser.test.ts` (the refreshed patch), `tests/setup.ts`, `app/**`, `tests/app/**`, `ROADMAP.md`. **Off-limits.** Every other file, the vendored files included. **Tools and limits.** As in `j-binder-brief-2.md`.

## Execution

**A native subagent:** perform the assignment directly and spawn nothing.

## Output

Return the report as your final message: per edit D1 to D6, what changed and the finding it closes; the handoff's exact rule as implemented; each new proof's red and green readings; the Unknowns' answers; the refreshed setup-test patch; the mutation rows for every new or rewritten proof; the output of the round-2 acceptance criteria 1 to 6 verbatim; `git status --short` and `git diff --stat`.

## Acceptance criteria

Criteria 1 to 6 of `j-binder-brief-2.md`; every D2 proof present, red before and green after; `grep -rn "#held\|#restore\|AttributeNames\|CallRecording\b" src/browser tests/src/browser tests/setupBrowser.ts guides/veneer.md` returns no hit.

## Review evidence

The actual diff (`git diff HEAD` with the renames intent-to-add) and status of the worktree, captured by the Orchestrator as `j-binder-4.diff` and `j-binder-4-status.txt` (rounds 2 to 4 together), and the report.
