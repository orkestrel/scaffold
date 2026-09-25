# J-RELEASE-SWEEP slice S2 — the lens map (2026-09-25)

`reviewer` on Opus 5.5, holding the objective lens, in Workflow run `wf_29efd986-1c7`. The brief is `units/j-release-sweep-brief.md`. The lens's final message follows verbatim.

**Source review: slice S2 (`Tooltip.ts`, `Popover.ts` at engines-b `3bb9afb`), objective lens, reviewer on Opus 5.5.** No lane executed anything. Every ruling comes from reading the source, and each witness still has to be run red-first. Both slice files resolved at the engines-b root. Line numbers are approximate; locate each site by its symbol.

The slice breaks the invariants at three stations and one record:
- **`#discard` and `#rehide` break I2.** Both clear the placement and tip fields before `Placement.destroy`, which runs consumer code.
- **Four paths break I1.** The hide, the refused-show discard and `destroy()` release a fresh `tip.id` or ignore the show's prior-membership and prior-presence records. `#occupy` reuses a stale content origin.
- **A hide or return the host takes over forgets a tip it leaves in the container.** `destroy()` can then never remove that tip.

`Popover.ts` adds no station. `Popover` is `Tooltip` under the popover profile (Popover.ts:44–61), so every Tooltip row applies to it. The popover's `manual` value changes only which platform closes happen, not the release logic.

### 1. Station table

Paths in the table are relative to `C:/Users/mikes/WebstormProjects/veneer/tmp/worktrees/engines-b/src/browser/`.

| # | Station (Tooltip.ts) | Holding | Taken | Given back | I1 | I2 | Smallest input · reachability |
|---|---|---|---|---|---|---|---|
| 1 | `destroy` claim, abort and timer (~541–549) | registry claim; `#controller` listeners, placement and descendants through the signal; `#timer` | ~373, ~378–397, `#arm` ~1057 | `registry.release` ~546 (by identity, Registry.ts:44–46); `abort` ~547; `#disarm` ~549 | holds | holds (every field is still set while `abort` runs `Placement.destroy`, Placement.ts:121,241) | — |
| 2 | `destroy` id removal (~555–556) | `#linked` id in `aria-describedby` | `#link` ~859 | `#link(linked,false)` ~556 → ~862–866 | **violates**: acts on the recorded id but not on the show's `added` or `described` record (locals ~475–476). It removes an id the call did not add, and removes an emptied attribute that was present before (~865). | holds | Trigger `aria-describedby=""`; `tooltip.show()`; `popover.show()`; `popover.hide()`; `tooltip.destroy()` → the attribute is absent while the popover lives. The tooltip's restore writes nothing because it is not the last holder (HostSnapshot.ts:196–197); the `""` value returns only at `popover.destroy()`. Shipped code plus consumer markup. |
| 3 | `destroy` content and snapshot (~557–558) | `#origins`; `#snapshot` (`aria-describedby`, `aria-label`, `title`) | `#occupy` ~742; `#link` ~864; `#retitle` ~874, ~878 | `#release` ~774–787; `restore` HostSnapshot.ts:131 | holds (record-based; except row 10) | holds (each record is deleted before its move ~777; re-entry is handled by HostSnapshot's ownership) | — |
| 4 | `#discard` (~831–850), shared by the hide (~941), the rebuild (~455), the refused placement (~483) and `destroy` (~550) | `#placement`, `#tip`, `#container` | ~486, ~460–461 | `placement.destroy()` ~839; `tip.remove()` ~846 | see rows 5 and 6 | **violates**: the fields are cleared at ~835–838 before `placement.destroy()` ~839, whose `hidePopover` dispatches the closing `beforetoggle` (Placement.ts:250). A `destroy()` there finds `#placement` and `#tip` undefined and returns with the tip connected and the trigger's inline `anchor-name` still written. The outer call restores both only after the inner `destroy()` has returned. | In an `inserted.vn.tooltip` listener, find the tip through `aria-describedby` and add a `beforetoggle` listener: `if (e.newState==='closed') { tooltip.destroy(); record(tip.isConnected, trigger.style.getPropertyValue('anchor-name')) }`. Then `await show(); await hide()` → records `true` and a non-empty value. Documented event (closing `beforetoggle`, named at ~114 and ~122 and in `hide` remarks types.ts:1874–1876). |
| 5 | `#discard` id removal (~848) | linked id | `#link` ~859 | `#link(tip.id,false)` ~848 | **violates**: releases a fresh `tip.id`, not `#linked`, and ignores `added` and `described`, so it removes an emptied attribute that was present before (~865). | **violates**: `#link` sets `#linked = undefined` (~859) even when `tip.id !== #linked`, so `destroy` loses the id. | (a) An `inserted.vn.tooltip` listener sets `tip.id='moved'`; `show(); hide()` → `aria-describedby` still names `vn-tooltip-N` after a completed hide. `destroy()` removes it only if the tooltip is the last holder of the record. Documented event. (b) Trigger `aria-describedby=""`; `show(); hide()` → the attribute is removed. Shipped code. |
| 6 | Hide (`#conceal`) taken over inside its discard (~844, ~836, ~941) | the tip the show inserted | `container.append` ~465 | never | holds | **violates**: a tip with its `shown` token added back is not removed (~844) but is forgotten (~836). `destroy` cannot reach it, which breaks "no holding outlives `destroy()`" and the `destroy` summary "removes the tip" (types.ts:1934). | Closing `beforetoggle` listener: `tip.classList.add('show')`; `await hide()` → `false`; `destroy()` → `tip.isConnected === true`. Documented event. TSDoc ~113–116 states the forgetting, so the repair also owns that sentence. |
| 7 | `show` rebuild discard (~451–456) | the settled tip and its placement | an earlier show | `#discard(false)` ~455 | as row 5 | as row 4 | Row 4's witness with `fill({...})` or a second `show()` on a settled shown tip in place of `hide()`. Documented event. |
| 8 | `show` with the promotion refused (~481–485) | tip, container, link | ~460–477 | Placement's own restore (Placement.ts:272–279) and then `#discard(false)` ~483 | Placement: holds. Discard: **violates**, as row 5. | as row 4 | Opening `beforetoggle` listener calls `preventDefault()` and changes `tip.id` → the recorded id stays linked. Documented event. |
| 9 | `#rehide`, the returning step after a host takeover (~632–659) | placement, link, tip | ~465, ~477, ~486 | `placement.destroy` ~644; `#link(linked,false,described)` ~647; `tip.remove` ~655 | holds (recorded `linked`, `added` and `described`, ~469–476; this matches the E24 prior-value amendment) | **violates** twice. (i) `#placement` is cleared at ~643 before `destroy()` ~644, so a `destroy()` in the closing `beforetoggle` returns with Placement's writes (such as the trigger's `anchor-name`) still on the page. (ii) The fields are cleared at ~651–653 whether or not the tip is removed (~654); a tip whose token a listener re-added stays in the container, forgotten. | `animated: true`; during the wait, `tip.classList.remove('show')`; a closing `beforetoggle` listener calls `tooltip.destroy()` (i) or `tip.classList.add('show')` then later `destroy()` (ii). Documented event plus a direct token write (the E24 takeover seam). |
| 10 | `#occupy` re-record (~742–748) with `#release` (~774–787) | a content element's origin | first move ~744–745 | `#release` ~779–784 | **violates**: an existing record keeps its first origin even after consumer code moved the element out of the recorded slot, so the later return uses a stale parent. | holds | `el` in `body`; `new Tooltip(t,{title: el})`; `show(); hide()` (`el` stays in the removed tip); `Y.append(el)`; `show(); destroy()` → `el.parentNode === body`, expected `Y`. Documented option. |
| 11 | Build stop and throw (~697, ~701–711) | elements moved into the unfinished tip | `#occupy` ~742 then ~752 | `destroy`'s `#release`; catch ~710 | holds | holds (records are published before the move; `destroy` is the only takeover during a build, ~693–695) | — |
| 12 | `fill` (~526–534) | elements of refilled slots | `#occupy` | `#release` ~532 | holds (subject to row 10) | holds | — |
| 13 | `#dismiss` re-promotion (~896–903) | re-opened promotion; `#promoted` | `showPopover` ~899 | through `#placement` (Placement.ts:248–251); `#promoted` cleared ~838, ~653 | holds | holds (`#placement` stays set) | — |
| 14 | `show` stopped by a moved tip (~465, ~483, ~487) | tip, container, link | ~460–477 | none now; the next show's discard or `destroy` | n/a | holds (fields stay set; the tip is left in place per E18) | — |
| 15 | Change release (~498/~502, ~942/~948) | `#change` | ~444, ~914 | cleared only if still the same (~502, ~948) | n/a | holds | — |
| 16 | Constructor failure and `#retitle` (~398–400, ~871–880) | claim, listeners, `title` and `aria-label` | ~373, ~874–879 | `destroy` | holds (saved before the write) | holds (lifetime read ~876) | — |

### 2. Consumer code each station runs, and which fields are still set

- **`destroy`.** `abort` runs `Placement.destroy` → `hidePopover` → the closing `beforetoggle` (Placement.ts:250), and each descendant's `destroy`. All of `#placement`, `#tip`, `#container`, `#linked`, `#origins` and `#snapshot` are still set, so a re-entrant `destroy` reaches everything. After that, custom-element reactions to tip removal, host attribute writes and content moves run with the fields cleared, but their writes have already landed.
- **`#discard`, reached from the hide (~941), the rebuild (~455) and the refused show (~483).** The closing `beforetoggle` runs with `#placement`, `#tip`, `#container` and `#promoted` already cleared, and `#linked` and `#change` still set. This is the source of rows 4, 7 and 8. The removal and `#link` reactions run with `#linked` already cleared before the write (~859).
- **`#conceal` before the discard.** `hide.vn.*` and any code during `settleAnimations` run with every field set.
- **`#rehide`.** The closing `beforetoggle` runs with `#placement` cleared and `#tip`, `#container` and `#linked` set. The host attribute reaction runs with `#linked` cleared before the write. The tip removal runs with every field cleared.
- **Build, occupy and fill.** Content functions, `sanitizer.write`, and `replaceChildren`/`insertBefore` custom-element reactions run with the `#origins` record set before each move.
- **Placement construction.** The opening `beforetoggle` runs while `#tip`, `#container` and `#linked` are set and `#placement` is not. The placement is still reachable through the tooltip's signal (Placement.ts:121).

### 3. The source

Every release step is written by hand. It reads take-time facts from `show`'s frame (`linked`, `added` and `described` live only in locals ~469–476) or from the DOM again (`tip.id` ~848), and `#discard` and `#rehide` clear their holding fields before the release that runs consumer code (~835–839, ~643–644, ~651–653), deliberately according to the comment at ~827–828. One change would close rows 2, 4–9 and the `#linked` part of row 5: one held link record `{ id, added, described }` plus clear-after-release, clear-if-same for `#placement` and `#tip`. `Placement.destroy` already tolerates re-entry (Placement.ts:245–261).

### 4. Claims I could not break

- A `destroy()` inside `destroy()`'s own abort, through the closing `beforetoggle`, reaches `#placement` because `#discard` has not run yet, and it restores everything before it returns.
- A `destroy()` inside the opening `beforetoggle` during Placement construction reaches the unfinished placement through the signal.
- Content records are published before each move (~742 then ~752) and deleted before each return (~777). A re-entrant `#release` skips deleted entries.
- `#rehide`'s link return honours `added` and `described`, and reads only the call's identity before each write (~664–666).
- The registry releases by identity, and the timer cannot fire after `destroy` (~1055–1056, ~1064–1067).
- A refused or prevented `show` or `hide` writes nothing.
- `#retitle` saves before each write and stops on a destroyed tooltip (~876).

### Findings outside I1 and I2

- **A completed hide leaves element content in the removed tip.** Tooltip.ts ~71–74 documents that the element returns only on `destroy`, `fill`, a rebuild or a slot takeover. This conflicts with the brief's "a completed `hide` returns every write its `show` made". Smallest input: row 10's first half. Both pieces of evidence are documented, so this needs a ruling, not a repair.

### Referrals to the Orchestrator

- **Rows 4 and 9(i) may conflict with Law.** The E24 J-REENTRY-SWEEP amendment rules conforming "a restoration already running inside … `destroy` … completes", which accepts page-end restoration after the inner `destroy()` returns. The brief's I2 requires the restoration to finish before `destroy()` returns. Rule which one binds the Placement leg.
- **Row 5(a) needs a scope decision.** Decide whether changing a tip's `id` is inside the contract, or excluded the way E24's round-3 amendment excludes backdrop tampering. The repair is the same one-record change either way.
