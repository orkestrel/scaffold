# E-ID-ANCHOR audit round 3 — claims

Subject: E-ID-ANCHOR round 3 in `/home/user/veneer-anchor` (branch `unit/anchor`, committed as `ebce3fe` over the
round-2 checkpoint `98bd1b0`), briefed by `e-id-anchor-brief-3.md`, whose Items the Orchestrator wrote from
`anchor-audit-2-verdict.md`. Applied by `builder` on Sonnet and reported in `e-id-anchor-report-3.md`. Evidence:
`anchor-instruments/r3/` (`anchor-3.diff`, `git diff 98bd1b0`; the status; the two plant logs; the gate logs), the probe
logs `native141/j-native-probe-3-141.log.txt` and `/home/user/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3-153.log.txt`,
the probe file `/home/user/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3.test.ts`, and
`/home/user/scaffold/.orkestrel/veneer/engine/units/j-placement-141-diagnosis-verdict.md`. All other paths sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A plant counts as a kill only when its log names an `AssertionError`.
Rule every claim; compare words, not line wrapping.

1. **The Items.** `anchor-3.diff` applies Items 1 to 4 as written, changes nothing else, and every `src/styles/**` hunk is
   a comment.
2. **The dropdown text is true.** The guide's Dropdown classes sentence, the dropdown Reason cell, and the dropdown
   include comment are each true of the probe rows `V.clip.dropdown` and `V.focus` on both logs and of the J-PLACEMENT-141
   diagnosis: on Chromium 153 a menu whose toggle a scroll container clips entirely is not painted; on Chromium 141 it
   is not painted when the engine opened it without a pointer press, and is painted when a pointer press on the toggle
   opened it, because the engine does not anchor that menu there. Name any sentence that claims more than the rows
   record.
3. **The tooltip and popover text and the mixin comment are true.** The tooltip and popover include comments and Reason
   cells are true of `V.tooltip` and `V.popover` on both logs; the mixin comment states what the mixin emits, the
   computed values, and the override by layer order, and no painting claim; and every site names Chromium 141 and 153
   where it says what both builds do.
4. **The plants.** `anchor-plant-important.log.txt` fails each anatomy case at its consumer-twin reading and the mixins
   `position-visibility` case with an `AssertionError`; `anchor-plant-closed.log.txt` fails each anatomy case with an
   `AssertionError`; each log records the mixin's digest before and after as equal. For each, say whether the
   assertions distinguish the plant from the passing case.
5. **Gates.** Every gate log ends with exit 0, and each Reason cell fits its column.
