# J-POPOVER round 2 — the writer's report (opus on Opus 5.5, native; retained from its final message, 2026-09-24)

F2 and F3 closed; the acceptance chain and the instrument each ran once, green. F1 partly closed, as a deviation: removing the build's release on a door stop cannot redden any case, because the only door that fails inside `#build` is destruction, and `destroy()` returns every recorded element itself before the build reads its door. The release on a throw and destruction's own release are each pinned.

## F1 (deviation)

Inside a build, `#holds(change, undefined)` fails only when the tooltip is aborted or `#change` moved on. `#change` is written only by `show` and `#conceal` (around lines 406 and 788); `show` is refused while a change is in flight; `#conceal` needs `shown`, and `#discard` clears `#tip` before the build starts. Destruction is the only takeover, and `destroy()` runs `this.#release(() => false)` (around line 494), with custom-element reactions running after the move completes, so every element still in its slot is home before the build's door fails.

Probe (`tmp/j-popover/release-probe.py`, log retained as `j-popover-release-probe-2.log.txt`): "a slot write stops without releasing" HELD (2 passed, 55 skipped of 57); "the release step stops without releasing" HELD; unmutated green; restored byte for byte. In the first round-2 instrument run, removing destruction's release alone left the new case (then asserting only end state) green because the stop-path release returned the elements instead (`MISSED exit=1 | destruction releases nothing | … | named: []`, `tmp/j-popover/mutations-2-first.stdout.txt`).

New Tooltip case: "returns every element a build moved into the unfinished tip when a reaction to a later slot move destroys the tooltip" (a two-slot template; the second element's `disconnectedCallback` destroys the tooltip; both parents read at the moment `destroy()` returns, then each element's parent and next sibling, and no tip left). Green across Tooltip, Placement, Popover, and Dropdown (121 of 121); reddened by removing destruction's release (JOINED, named).

Hypothesis and options: the door-stop half of the single release site duplicates destruction's release. Delete it (the release site becomes a `catch` that returns the elements and rethrows), or keep it as defence in depth with the two control rows as the record.

## F2

`Placement`'s constructor reads the door inside a `try`; a throwing door makes the placement call `this.destroy()` (hiding the element and restoring its writes) and rethrow the original error unchanged; the `owned` TSDoc, the class remarks, and the constructor `@throws` state it. Case "restores what it wrote, the promotion included, before an error its owner door throws reaches the caller": red `AssertionError: expected true to be false` (the element still `:popover-open`), `1 failed | 19 skipped (20)`; green `1 passed | 19 skipped (20)`.

## F3

No behaviour change. `TooltipProfile.attributes` is `TooltipAttributeMap & Partial<Pick<PopoverAttributeMap, 'content'>>` and `.selectors` its twin; `TooltipProfile.popover` is `NonNullable<PlacementInput['popover']>`; `Tooltip.ts` passes `TooltipAttributeMap` and `TooltipSelectorMap` to `resolveVocabulary` as explicit type arguments (its constraint refuses an optional key; the runtime still copies and validates every key the table names); the private fields are typed from `TooltipProfile`, so the `Popover*Map` imports are gone. The `owned` TSDoc adds the throwing case.

## Instrument (`tmp/j-popover/mutations.py`, retained as `j-popover-mutations-2.py`; log `j-popover-mutations-2.log.txt`)

The placement's door read (re-anchored to `held = options?.owned?.() !== false`) JOINED; "a throwing door leaves the promotion" EXACT; "the build releases nothing it moved into an unfinished tip" EXACT; "a throwing step stops the build without releasing" EXACT; "destruction releases nothing" JOINED with the new case named; controls HELD: the dropdown reads no owner door, a slot write stops without releasing, the release step stops without releasing. Every round-1 row reddens as before. Green: Popover 9, Tooltip 57, Placement 20, Dropdown 35, helpers 61, validators 32, index 3. Restored byte for byte.

## Acceptance (run alone after the instrument)

Chromium 153.0.8010.12; typecheck, lint, format exit 0; `test:src:browser` 813 of 813; guides 20; policy 109 and 1 skipped; the three builds exit 0; conformance 26; setup 319; `check` exit 0.

## Status

`M` guides/veneer.md, Placement.ts, Tooltip.ts, constants.ts, index.ts, types.ts, validators.ts, Placement.test.ts, Tooltip.test.ts, index.test.ts, validators.test.ts; `A` Popover.ts, Popover.test.ts (added to the index since round 1 by the Orchestrator's intent-to-add). `git diff --stat`: 13 files, 1435 insertions, 412 deletions. No shared-file patch. Not touched as briefed: the `resolveOptions` enumeration, the subclass bound, the `owned` name.
