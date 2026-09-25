<!-- The J-SAMEWAY-ENGINES-A writer's final message (opus on Opus 5.5, native subagent a12dcaa7387e25508), retained from its completion notification because its transcript file was empty; brief: units/j-sameway-engines-a-brief.md with the decision units/j-holders-decision-2.md; worktree tmp/worktrees/engines-a on unit/engines-a from 8bc940d. One substitution: the report's two inline diffs under "Report-only patches" are the files it names, retained byte for byte as units/j-sameway-engines-a-types.patch and units/j-sameway-engines-a-guide.patch, and are not repeated here. The red-reading block's 36 case lines are in the unit's tmp/j-engines-a/base-red.log.txt, which the Orchestrator's replay re-derives (units/j-sameway-engines-a-red-orchestrator.log.txt); the report's first three and its A3 line are kept. Every other line is the report verbatim. The instrument is units/j-sameway-engines-a-mutations.py with its log. -->

# J-SAMEWAY-ENGINES-A report

E24 now holds in `Collapse`, `Toast`, `Tab`, and `Carousel`. When the host moves an engine's token toward the change's end, the change completes and resolves `true`. When the host moves it back, the change returns its own writes one entry at a time, dispatches nothing more, and resolves `false`. The acceptance chain exits 0 and the four owned files pass (198 tests). 36 cases fail on `8bc940d`'s sources and pass on the unit's. The instrument ran 32 rows with no misses and restored every source byte for byte. Nothing is committed. There was no stop; the deviation state at the end lists the criteria that cannot read red and two rule breaks.

## Files touched
All paths are under `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-a/`.

- **`src/browser/Collapse.ts`**:
  - Adds `#owns`, `#holds`/`#apply` with the call's expected end, `#rehide`, `#reshow`, `#undo`, `#revert`, and `#mark`.
  - The re-reads compare the change identity and no longer read `shown`.
  - The token writes skip `shown` when the panel already carries it.
  - `#writeTriggers` is gone.
  - The class TSDoc states the rule.
- **`src/browser/Toast.ts`**:
  - Same mechanism, with `#rehide` and `#reshow`.
  - The identity is compared across the dispatch instead of being taken before it (E24 bullet 3).
  - The hide transition door no longer requires `shown`, which fixes A3.
- **`src/browser/Tab.ts`**:
  - Same mechanism. Entries are `[element, facet, value]`, with `#write` and `#selection` replacing `#select`.
  - `#holds` reads the list before the host's token, so a sibling's own swap stays a stop.
- **`src/browser/Carousel.ts`**:
  - Same mechanism, keyed on the incoming item's `active` token, with `#owns` and `#rewind`.
  - Entries are token triples and `aria-current` pairs that carry the prior value.
- **Tests**: `tests/src/browser/{Collapse,Toast,Tab,Carousel}.test.ts`. Existing takeover cases are rewritten to their new outcomes, new A1, A2, and A3 cases are added, and one list assertion is added to the Tab case "resolves false for the swap a sibling takes over by a reaction to its control write, with no panes to read".
- **Instruments** in `tmp/j-engines-a/`:
  - `mutations.py`, with logs `mutations.log.txt` and `mutations-1.log.txt`
  - `base-red.py`, with log `base-red.log.txt`
  - `acceptance.sh` and `owned.sh`
  - `splice.py` and `carousel-move.txt`, which spliced in the Carousel body
  - `shared/` holds the scratch copies behind the patches.

Diffstat: `8 files changed, 1890 insertions(+), 379 deletions(-)`

## A4 table
Every door also reads lifetime and identity. The returning step writes only while the call still owns the change.

When a stop reads something other than the token, the call ends its change: Collapse, Toast, and Tab move the identity, and Carousel finishes the slide. The returning step then writes nothing. The PHASE mutation rows prove this. These are the phase reads:
- **Collapse**: `transition` and `host`
- **Toast**: `transition`
- **Tab**: the list and the pane
- **Carousel**: items, order and direction tokens, and indicators

**Collapse show**
| Write | Entry | Return or rule | Case |
|---|---|---|---|
| Open siblings hidden through their own engines | — | Not returned: each hide is that sibling's own change | "completes a show whose open sibling hide listener adds the shown token…" |
| Add `transition` | `transition` | Removed | "returns a show whose listener added the shown token and whose transition-token write…" |
| Remove `host` | `host`, only if the panel carried it | Added back | "…zero-size write… adding back the host token…"; "returns a show of a panel without the host token…" (no entry) |
| Size `0px`, then the scroll size | `height`/`width` | Property removed | "…zero-size write…"; "returns a show whose completing token write…" |
| Each trigger: remove `collapsed`, set `aria-expanded="true"` | `[trigger,'collapsed']`, `[trigger,'expanded']` | Adds `collapsed` and sets `aria-expanded="false"`, but only on a trigger naming no shown panel | "returns a show whose transition removal…" |
| Token write: `host`, plus `shown` unless present | Ends the `host` entry | `shown` is the host's move | "completes a show whose listener adds the shown token…" |
| Remove `transition`, then clear the size | Ends those entries | — | "returns a show whose transition removal…" |

**Collapse hide**
| Write | Entry | Return or rule | Case |
|---|---|---|---|
| Size px | size entry | Removed | "returns a hide whose host-and-shown removal…" |
| Add `transition` | `transition` | Removed | same |
| Token write: remove `host` (entry only if present), plus `shown` unless absent | `host` | Added back | same |
| Trigger `collapsed` and `aria-expanded="false"` | one entry per write | Removes `collapsed`, sets `aria-expanded="true"` | "returns a hide whose trigger write…" (the value it never wrote stays unwritten) |
| Clear the size; add `host`; remove `transition` | Ends each entry | — | "…size clearing…", "…completing token write…" |

**Toast show**
| Write | Entry | Return or rule | Case |
|---|---|---|---|
| Clear the timer | — | A release stays released (E22 amendment 3). A pointer or focus leave, or a later show, arms it | existing "clears a pending delay when a show is accepted, even when that show stops…" |
| Add `fade` (animated) | `fade`, only if the toast lacked it | Removed | "returns a show of a shown toast…", "returns a show whose completing removal…" |
| Token write: `transition`, plus `shown` unless present | `transition` | Removed | "returns a show whose token write…" |
| Remove `transition` | Ends it | — | "returns a show whose completing removal…" |

**Toast hide**
| Write | Entry | Return or rule | Case |
|---|---|---|---|
| Clear the timer | — | Release | existing "clears the pending delay when a hide is accepted…" |
| Add `transition` | `transition` | Removed | "returns a hide whose listener removed the shown token and whose transition-token write…" |
| Token write: `transition`, plus `shown` unless absent | Ends it | Nothing left to return | existing "stops a hide whose completing removal…" |

**Tab show**
| Write | Entry | Return or rule | Case |
|---|---|---|---|
| Remove the sibling's `active` | `[sibling,'active',false]` | Added back | "returns a swap whose control-activation write…", "…listener activated the control and whose sibling token write…" |
| Blur the sibling | — | Not returned (focus, as in Modal) | — |
| Remove the sibling pane's `active` and `shown` (one write) | One entry per token it carried | Each added back | "…loses its active token during the pane fade, reactivating the sibling…" |
| Sibling selection: `aria-selected`, `tabindex`, toggle, menu, wrapper | One entry each | Returned to the selected state | control-activation case; "…reopening the dropdown that holds the sibling" |
| Token write: the control's `active` unless present | — | The host's move | "completes a swap whose sibling token write…" (no write on the control) |
| Control selection | One entry each | Returned to the deselected state | pane-fade case |
| Pane `active` and `shown` | One entry each, only when lacking | Removed | pane-fade case |
| `hidden.vn.tab` | — | A dispatch; the door after it can still return the writes | — |

**Carousel slide**
| Write | Entry | Return or rule | Case |
|---|---|---|---|
| Disarm the timer | — | Re-armed in `finally` where it ran | existing "keeps its timer running after a slide a reaction took over" |
| Leaving indicator: remove `active`, remove `aria-current` | `[ind,active,false]`, `[ind,prior]` | Added back, prior value restored | "returns a slide whose outgoing removal…" |
| Arriving indicator: add `active` (when lacking), set `aria-current` | `[ind,active,true]`, `[ind,prior]` | Removed, prior value restored | same |
| Incoming order; outgoing direction; incoming direction (each when lacking) | One entry each | Removed | "…order-token write…deactivating it", "…loses that token during the transition…", "returns a slide whose completing write…" |
| Remove the incoming order and direction | Ends both | — | "returns a slide whose completing write…" |
| Token write: incoming `active` unless present | — | The host's move | "completes a slide whose listener activates the incoming item, writing no active token on it and dispatching slid" |
| Remove the outgoing `active`, order, and direction | `[outgoing,active,false]`; ends the direction entry | Added back | "returns a slide whose outgoing removal…" |

## Red and green readings
**Red.** `python tmp/j-engines-a/base-red.py` runs the final test files against `8bc940d`'s four sources and then restores the unit's (log `tmp/j-engines-a/base-red.log.txt`):
```
Tests 36 failed | 162 passed (198)
restored byte for byte
```
Each failing case's first line, verbatim (the first three of 36; the rest are in the unit's log, see the header):
```
| Carousel returns a slide whose completing write a reaction answers by removing the incoming active token, taking the direction token off the outgoing item and dispatching no slid | AssertionError: expected [] to deeply equal [ [ 'one', …(1) ] ] |
| Carousel completes a slide whose listener activates the incoming item, writing no active token on it and dispatching slid | AssertionError: expected false to be true // Object.is equality |
| Carousel completes a slide whose indicator write a reaction answers by activating the incoming item, dispatching slid | AssertionError: expected false to be true // Object.is equality |
```
A3 is the Toast case "completes a hide whose transition-token write…"; it reads red first as `expected false to be true`.

**Green.** The same four files with the unit's sources: `Tests  198 passed (198)`.

## Mutation table (`tmp/j-engines-a/mutations.log.txt`)
Every KILLED row's cause is an `AssertionError`.

| Row | Obligation | Expected | Verdict | First line |
|---|---|---|---|---|
| A1-collapse-show-event, -show-sibling, -hide-event, -hide-size | A1 | KILLED | KILLED ×4 | `expected false to be true` |
| A2-collapse-transition, -trigger, -filter, -host, -host-return | A2 | KILLED | KILLED ×5 | record-list mismatches |
| PHASE-collapse | PHASE | KILLED | KILLED | `expected [ MutationRecord{} ] to deeply equal []` |
| A1-toast-show-fade, A1-toast-hide-event | A1 | KILLED | KILLED ×2 | `expected false to be true` |
| A3-toast-hide-transition | A3 | KILLED | KILLED | `expected false to be true` |
| A2-toast-transition, A2-toast-fade | A2 | KILLED | KILLED ×2 | record-list mismatches |
| PHASE-toast | PHASE | KILLED | KILLED | `expected [ MutationRecord{} ] to deeply equal []` |
| A1-tab-event, A1-tab-skip | A1 | KILLED | KILLED ×2 | `expected false to be true`; `expected [ MutationRecord{} ] to deeply equal []` |
| A2-tab-selected, A2-tab-dropdown | A2 | KILLED | KILLED ×2 | record mismatch; `expected 'false' to be 'true'` |
| ORDER-tab, PHASE-tab | ORDER, PHASE | KILLED | KILLED ×2 | `expected [ 'home-tab', 'contact-tab' ] to deeply equal [ 'conta…` |
| A1-carousel-event, -indicator, -transition | A1 | KILLED | KILLED ×3 | `expected false to be true` |
| A2-carousel-current, -outgoing, -direction | A2 | KILLED | KILLED ×3 | record-list or class-list mismatches |
| PHASE-carousel | PHASE | KILLED | KILLED | `expected [ MutationRecord{} ] to deeply equal []` |
| CONTROL (the Toast hide-return guard spelled as a length test) | control | HELD | HELD | — |
| BOOM | refusal | REFUSED | REFUSED | `Error: boom` |
| UNBOUND | refusal | REFUSED | REFUSED | `ReferenceError: unboundToken is not defined` |

The log ends with `restored byte for byte` and `rows 32, missed 0`.

The first run (`mutations-1.log.txt`) planted the two Toast A2 rows as an arrow function whose body was an `if` statement. That fails the transform, and both rows read REFUSED with the setup import failure, so the rule refused a broken plant. The instrument now plants a block body.

## Report-only patches
`git apply --check` passes for both. They are also on disk as `tmp/j-engines-a/types.patch` and `tmp/j-engines-a/guide.patch`.

No `tests/setupBrowser.ts` patch is needed. Each door is its own `it` case with no row table, because a shared table could not reach the scoped run before integration.

`src/browser/types.ts`: the `@returns` sentences of `CollapseInterface.show` and `.hide`, `TabInterface.show`, `ToastInterface.show` and `.hide`, and `CarouselInterface.next`, `.previous`, and `.slide` (see the header's substitution).

`guides/veneer.md`, covering the door paragraphs of § Collapse (plus its departure list), § Tab, § Carousel, and § Toast (see the header's substitution).

## Acceptance output (`bash tmp/j-engines-a/acceptance.sh`)
```
check-src-browser exit 0
lint-check exit 0
format-check exit 0
tsc-root exit 0
owned-files exit 0 |  Tests 198 passed (198)
done
```
`git diff --check` is clean, and every touched file reads LF.

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
No stop, and no public type change was needed.

**Part of A1 cannot read red.** At these doors `8bc940d` already completes, and skipping the token write leaves the same class value, so no case can distinguish base from fix:
- `Collapse`: every write-stage door of the show (`transition`, `host`, the size writes, the triggers, the wait) and the hide's transition-token door.
- `Toast`: the show's re-read.

For those tokens, `add(host, shown)` and `add(host)`, and `add(shown, transition)` and `add(transition)`, produce one identical mutation. In `Tab` and `Carousel`, one case per door read stands for the write-stage doors that share it: the blur, the sibling pane, and the selection doors in `Tab`, and the order and direction doors in `Carousel`.

**Rulings I made** under the deviation contract:
1. **Phase reads stay stops without a return.** The door ends the change so the returning step writes nothing. `Tab` reads the list before the host's token, so a sibling's own swap is never returned. ORDER-tab proves this.
2. **Returns are state-based, as in `Modal`.** Presence-only token entries (`fade`, `host`, pane tokens, carousel tokens) are recorded only when the write changed presence. A collapse show's trigger return keeps the hide's rule and skips a trigger that names a shown panel. `aria-current` returns to its prior value.
3. **Toast's identity is now compared across the dispatch** instead of being taken before it, as E24 bullet 3 requires. So "resolves both calls false… prevents that nested show" becomes "completes the one show… the nested call resolving false", and the guide's Toast paragraph changes with it.
4. **`#change` no longer resets to `undefined`** in `Collapse`, `Toast`, and `Tab`. This lets the comparison see a nested call that completed inside the dispatch.
5. **Not returned**: the Toast timer (a release), the Carousel timer (re-armed where it ran), the Tab blur, and a `hidden.vn.tab` already dispatched.

**J-HOLDERS presence rule.** One owned case asserts the old rule: Tab.test.ts "restores the markup after a tab refused on its active control swaps back after a sibling, in either destruction order" (`b?.hasAttribute('class')` is `false` after the earlier destruction). A grep for `hasAttribute`/`getAttribute` of `class` and `style` across the four owned files found no other case that asserts intermediate presence while another holder lives. None of my cases asserts it.

**Rule breaks:**
- One command used an empty heredoc to create a placeholder script, which `printf` then overwrote.
- One Python `write_text` converted `Collapse.test.ts` to CRLF. I converted it back to LF and checked it.

Both fix-up scripts are deleted.
