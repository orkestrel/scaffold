<!-- The J-SAMEWAY-ENGINES-A round-2 writer's final message (opus on Opus 5.5, native subagent a12dcaa7387e25508, resumed), retained verbatim; brief: units/j-sameway-engines-a-brief-2.md; worktree tmp/worktrees/engines-a on unit/engines-a over 2760f7e. -->

I've applied the round-2 rule to all four engines. When the host takes a change over, the returning step now puts each target the call changed back to the value it held before the call's first write to it, in reverse order of those first writes. The three audit witnesses fail on `7511b82`'s sources and pass now. The acceptance chain exits 0 with 205 tests passing, and the instrument ran 42 rows with none missed. Nothing is committed.

## Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-a/`. Worktree tip: `2760f7e`.

- **Sources.** Each engine keeps a call-local list of `[HostSnapshotTarget, prior]` entries and has a `#record` method and a `#rewind` method; each class TSDoc states the rule once.
  - **`Collapse.ts` and `Tab.ts`:** replace their per-direction returning steps with the shared shape (`#rewind` and `#read` in both, plus `#write` in `Tab.ts`). `#mark` and `#undo` are gone. `Tab.ts`'s `#selection` now yields target and value pairs.
  - **`Toast.ts`:** records its host's tokens only; toggling a token with `force` changes nothing when it already matches, so its `#rewind` needs no read.
  - **`Carousel.ts`:** every removal records its targets, the completion's included.
- **Tests:** `tests/src/browser/{Collapse,Toast,Tab,Carousel}.test.ts`. Existing cases now expect reverse-order records, and eight cases are new: the three witnesses and five further inputs.
- **Instruments in `tmp/j-engines-a/`:**
  - `mutations-2.py` succeeds round 1's `mutations.py`; its log is `mutations-2.log.txt`.
  - `base-red.py` now uses `BASE = '7511b82'`; its log is `base-red.log.txt`.
  - `acceptance.sh` and `splice.py` are unchanged. Round 1's outputs are in `round1/`.

Diffstat: `8 files changed, 583 insertions(+), 299 deletions(-)`

## Changed A4 rows
Every entry is `[target, value before the call's first changing write]`. A write that changes nothing adds no entry, and a target already recorded is not recorded again. The return runs in reverse order and skips any target already at its recorded value. The engine's own token (`shown`, the control's `active`, the incoming item's `active`) is never recorded.

| Engine | Write | Entry now | Return |
|---|---|---|---|
| Collapse show | Add `transition`; remove `host`; size `0px`, then the scroll size | One entry each; the size is recorded once, at `0px`, with its prior value, which can be a pre-existing inline size | Prior token, or prior property (set or removed) |
| Collapse show | Trigger `collapsed` removal; `aria-expanded="true"` | Only when the write changes the value | Prior value; a missing `aria-expanded` is removed again. The old filter for triggers naming a shown panel is gone, because an already-expanded trigger records nothing |
| Collapse show | Token write adds `host`; remove `transition`; clear the size | Targets already recorded, so no new entry | Skipped when the target is already at its prior value |
| Collapse hide | Size px, `transition`, `host` removal, trigger `collapsed` and `aria-expanded="false"`; later writes to the same targets | First changing write only | Prior value |
| Toast show | `fade` (when absent), `transition` | Token and prior presence | Reverse order: `transition`, then `fade` |
| Toast show, completed | `#arm()` (the checker's gap) | Not recorded | Not a return: a completed call takes no returning step. It sits in the same place as the timer clear, which is a release |
| Toast hide | `transition` | Token and prior presence | Removed |
| Tab | Sibling `active`; sibling pane `active`/`shown` (when carried) | First changing write | Prior presence |
| Tab | Each selection write: `aria-selected`, `tabindex`, toggle `active`, menu `shown`, wrapper `aria-expanded` | Only when it changes the value, and once per target even when two controls share a dropdown | Prior value. A closed dropdown stays closed and a shared dropdown returns to open (the lane's witnesses 1 and 2) |
| Tab | Pane `active`/`shown` | When absent | Removed |
| Carousel | Indicator `active` and `aria-current` | Only when changed | Prior presence or value |
| Carousel | Incoming order, outgoing direction, incoming direction (adds) | When absent | Removed |
| Carousel | Completion: incoming `remove(direction, order)`; outgoing `remove(active, order, direction)` | Each target is recorded if this is its first changing write, including a token the item carried before the slide | Prior presence. A pre-existing order or direction token comes back (the lane's witness 3) |

## Witnesses: red and green
**Red.** `python tmp/j-engines-a/base-red.py` against `7511b82`'s four sources (`Tests 17 failed | 188 passed (205)`, `restored byte for byte`). The three witness lines, verbatim:
```
| Tab returns a swap whose control loses its active token on the sibling hidden event, leaving the closed dropdown that holds the sibling closed | AssertionError: expected [ 'nav-link', 'dropdown-toggle', …(1) ] to deeply equal [ 'nav-link', 'dropdown-toggle' ] |
| Tab returns a swap between two controls of one open dropdown whose control loses its active token on the sibling hidden event, leaving that dropdown open | AssertionError: expected [ 'nav-link', 'dropdown-toggle' ] to deeply equal [ 'nav-link', 'dropdown-toggle', …(1) ] |
| Carousel returns a slide whose completing write a reaction answers by removing the incoming active token, restoring an order token the incoming item carried before the slide | AssertionError: expected [ 'carousel-item' ] to deeply equal [ 'carousel-item', …(1) ] |
```
The other 14 red lines are in `base-red.log.txt`. They cover:
- the further inputs: a pre-existing outgoing direction token, a pre-existing inline size with a missing `aria-expanded`, and a trigger value the host wrote that the show never changed;
- the existing return cases, whose record order is now reversed.

**Green**, verbose run of the three witnesses:
```
 ✓ |src:browser (chromium)| tests/src/browser/Carousel.test.ts:2087:2 > Carousel > returns a slide whose completing write a reaction answers by removing the incoming active token, restoring an order token the incoming item carried before the slide 8ms
 ✓ |src:browser (chromium)| tests/src/browser/Tab.test.ts:1643:2 > Tab > returns a swap whose control loses its active token on the sibling hidden event, leaving the closed dropdown that holds the sibling closed 3ms
 ✓ |src:browser (chromium)| tests/src/browser/Tab.test.ts:1707:2 > Tab > returns a swap between two controls of one open dropdown whose control loses its active token on the sibling hidden event, leaving that dropdown open 1ms
      Tests  3 passed | 113 skipped (116)
```
One new case passes on the base too: the Tab case "…leaving a toggle token the host added that the swap never changed". It exists so the `R1-tab-unchanged` mutation has a case that can kill it.

## Mutation table (`tmp/j-engines-a/mutations-2.log.txt`)
A passed case reads HELD only when the report's `success` is true and it counts no failed test and no failed suite. Every KILLED row fails on an `AssertionError`.

| Row | Obligation | Expected | Verdict |
|---|---|---|---|
| A1-collapse-show-event, -show-sibling, -hide-event, -hide-size | A1 | KILLED | KILLED ×4 |
| A2-collapse-token, -trigger, -host | A2 | KILLED | KILLED ×3 |
| R1-collapse-unchanged, -attribute, -property, -order | R1 | KILLED | KILLED ×4 |
| PHASE-collapse | PHASE | KILLED | KILLED |
| A1-toast-show-fade, A1-toast-hide-event | A1 | KILLED | KILLED ×2 |
| A3-toast-hide-transition | A3 | KILLED | KILLED |
| A2-toast-fade, A2-toast-transition | A2 | KILLED | KILLED ×2 |
| R1-toast-order | R1 | KILLED | KILLED |
| PHASE-toast | PHASE | KILLED | KILLED |
| A1-tab-event, A1-tab-skip | A1 | KILLED | KILLED ×2 |
| A2-tab-attribute, A2-tab-dropdown | A2 | KILLED | KILLED ×2 |
| R1-tab-unchanged, -order, -inverse (closed-dropdown witness), -last (shared-dropdown witness) | R1 | KILLED | KILLED ×4 |
| ORDER-tab, PHASE-tab | ORDER, PHASE | KILLED | KILLED ×2 |
| A1-carousel-event, -indicator, -transition | A1 | KILLED | KILLED ×3 |
| A2-carousel-current, -outgoing, -direction | A2 | KILLED | KILLED ×3 |
| R1-carousel-order (order-token witness), -direction, -order-return | R1 | KILLED | KILLED ×3 |
| PHASE-carousel | PHASE | KILLED | KILLED |
| CONTROL | control | HELD | HELD |
| BOOM | refusal | REFUSED | REFUSED (`Error: boom`) |
| UNBOUND | refusal | REFUSED | REFUSED (`ReferenceError: unboundToken is not defined`) |

The log ends `restored byte for byte` and `rows 42, missed 0`.

The first round-2 run missed 5 rows, and each miss was a case that could not see its mutation. The PHASE rows for Collapse and Toast, and `R1-collapse-unchanged`, `R1-tab-unchanged`, and `R1-tab-order`, read HELD. The return skips a target already at its recorded value, so on those fixtures each mutation left the final state unchanged. I moved those rows onto cases that can see the mutation, adding the two host-edit cases for this, and added the `-inverse` and `-last` rows for the Tab witnesses. The final run is the one tabled above.

## Report-only patches
- **`tmp/j-engines-a/guide-2.patch`**: `git apply --check` passes against `2760f7e`. It rewrites the returning-step sentences in § Collapse, § Tab, § Carousel, and § Toast to state the rule. It corrects the Tab and Carousel descriptions the lane found overstated. It also states that Collapse, Tab, and Carousel read each target's value before writing it back.
- **`src/browser/types.ts`**: no patch. Its contract sentences for these four engines don't describe the return, so nothing in them becomes false.

## Acceptance output (`bash tmp/j-engines-a/acceptance.sh`)
```
check-src-browser exit 0
lint-check exit 0
format-check exit 0
tsc-root exit 0
owned-files exit 0 |  Tests 205 passed (205)
done
```
`git diff --check` is clean, and every touched file is LF.

## `git status --short`
```
 M src/browser/Carousel.ts
 M src/browser/Collapse.ts
 M src/browser/Tab.ts
 M src/browser/Toast.ts
 M tests/src/browser/Carousel.test.ts
 M tests/src/browser/Collapse.test.ts
 M tests/src/browser/Tab.test.ts
 M tests/src/browser/Toast.test.ts
```

## Deviation state
There was no stop, and no public type or off-limits file changed. These points need your decision or review:

1. **Duplicated leaf.** `Collapse`, `Tab`, and `Carousel` each carry an almost identical `#record` / `#read` / `#rewind` set. That leaf belongs in `helpers.ts`, which this unit may not edit. R1 doesn't require the shared helper, so I didn't stop. It needs a carrier; J-SAMEWAY-ENGINES-B probably needs the same helper.
2. **The return now reads each target before writing it** in Collapse, Tab, and Carousel. It still never reads the engine's own token. The TSDoc and the guide patch say so, because "reads only the identity and lifetime" is no longer true.
3. **Two host-edit cases (one Collapse, one Tab) cover a consequence of R1.** A target the call never changed is never restored, even when the host changed it before the takeover.
4. **Visible reorderings from reverse-order restores.** The pane class order in two Tab cases is now `['tab-pane', 'fade', 'show', 'active']`, and several expected record orders flipped.
5. **J-HOLDERS presence rule.** None of the new cases asserts an intermediate emptied `class` or `style` attribute.
