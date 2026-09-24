# Unit J-POPOVER, round 2 — the stop-path release proof, the throwing door, and the profile's types

Successor to `j-popover-brief.md` (which stays in force for everything this file does not change). What changed and why: the landing audit (`j-popover-audit-verdict.md`, reconciling the objective lane on Astra, the subjective lane on Opus 5.5, and the checker) confirmed the seam, the registries, the profile, the door, the rebuild dispatch, and the scope, and found three items. Each carries the lane or run that found it.

## Role and engine

`opus` on Opus 5.5, the same writer, resumed with its context, in the same worktree `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/popover` (uncommitted, base `1ee0faf`). Perform the assignment directly and spawn nothing.

## Obligations

- **F1 — the stop path of `#build`'s release is unpinned** (claim 8; the objective lane's FAIL and the subjective lane's UNRESOLVED, settled by the Orchestrator's probe `j-popover-release-probe-orchestrator.log.txt` in the `units/` folder). Removing the release when a slot write's door fails (the probe's R2) leaves all 56 Tooltip cases green. Add a Tooltip case, red first against that mutation, in which a reaction takes the change over while an element moves into the unfinished tip (for example a custom element's `connectedCallback` that hides or destroys the tooltip), and assert that every element the build moved into the unfinished tip returns to its parent and sibling. Pin the second stop site the same way: the release step's own door (`this.#apply(change, undefined, () => this.#release(…))` in `#build`). Then add to `tmp/j-popover/mutations.py` one row per release path: no release at all; a slot write's stop without release; the release step's stop without release; a throw without release. Each must redden its named case. The probe's mutation text is in `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-popover-release-probe.py`.
- **F2 — a throwing `owned` leaks the promotion** (the subjective lane's referral, adopted). In `Placement`'s constructor the `owned` read sits outside the `try` that guards `showPopover`, so a door that throws leaves the `popover` attribute written and the element open, with no instance to restore it. Restore what the placement wrote before the error propagates, as the `showPopover` refusal path does, and state it in the `owned` TSDoc and the class remarks. Add a Placement case, red first, in which a throwing `owned` leaves the element unpromoted, with no attribute or declaration the placement wrote, and the error reaching the caller.
- **F3 — the profile's declared types** (the subjective lane's optional tightening, adopted). Declare `TooltipProfile.attributes` as `TooltipAttributeMap & Partial<Pick<PopoverAttributeMap, 'content'>>` and `.selectors` with the selector twin, so the body slot is visible in the public type and the private fields drop their own intersection. Type `TooltipProfile.popover` from `NonNullable<PlacementInput['popover']>`, so the literal union has one home. No behaviour change; the suites stay green.

## Not in this round (ruled in the verdict)

The claim-4 enumeration finding is `resolveOptions`'s pre-existing contract and is carried to J-GUARDS; the exotic-subclass widening is a recorded bound; `owned` keeps its name. Touch none of them.

## Scope, tools, output, deviation

As `j-popover-brief.md`, with `src/browser/Placement.ts` and `tests/src/browser/Placement.test.ts` owned for F2. Test in widening rings: the one case while it is red, then `Tooltip`, `Placement`, `Popover`, and `Dropdown`, then the whole browser suite once. Re-run the acceptance chain (`tmp/j-popover/acceptance.sh`) and the whole instrument once at the end, never beside each other. Return the round-2 report in the brief's Output shape: the new cases with their red and green readings, the `types.ts` diff, the new instrument rows copied from the log, the acceptance output, `git status --short`, and the deviation state.
