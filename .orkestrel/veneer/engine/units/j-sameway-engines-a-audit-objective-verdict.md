# J-SAMEWAY-ENGINES-A audit — the objective lane (analyst on GPT-6 Astra, journal tmp/codex/j-sameway-engines-a-audit.jsonl; brief units/j-sameway-engines-a-audit-analyst-brief.md; claims units/j-sameway-engines-a-audit-claims.md)

Thread `01a0d683-b0bc-7a51-b7fc-2cd1d3f53aaf`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-sameway-engines-a-audit.jsonl` (launch copy under `tmp/codex/`); 21 commands; 511 s; usage {"input_tokens":2165690,"cached_input_tokens":1979392,"cache_write_input_tokens":0,"output_tokens":14338,"reasoning_output_tokens":5215}. Retained verbatim from the exec's last message.

---

Source review at `7511b82`, against base `8bc940d`. No tests were run. The failing inputs below are source deductions; executed evidence comes from the retained Orchestrator logs. The source snapshot matches the commit’s Git objects, and its SHA-256 digests match the mutation log.

The claims receive these rulings.

| Claim | Ruling | Evidence and proof distinction |
|---|---|---|
| **1. A1: agreement completes** | **CONFIRMED** | Under E24’s observation rule, the accepted call samples agreement after dispatch and at its token step. Before agreement is observed, its doors don’t require the change token: `src/browser/Collapse.ts:197`, `:290`, `:407`; `Toast.ts:183`, `:227`, `:289`; `Tab.ts:197`, `:317`; `Carousel.ts:351`, `:611`. The token steps skip an already completed token change (`Collapse.ts:251`, `:320`; `Toast.ts:201`, `:244`; `Tab.ts:244`; `Carousel.ts:532`). Initial refusal reads remain outside the accepted change. **Mutations:** `A1-collapse-show-event`, `A1-collapse-show-sibling`, `A1-collapse-hide-event`, `A1-collapse-hide-size`, `A1-toast-show-fade`, `A1-toast-hide-event`, `A1-tab-event`, `A1-tab-skip`, and the `A1-carousel-*` rows. **Assertions distinguish them: yes**, through the result, completed events, resulting state, and skipped token mutation (`tests/src/browser/Collapse.test.ts:990`, `:1279`; `Toast.test.ts:1431`, `:1473`; `Tab.test.ts:1477`, `:1534`; `Carousel.test.ts:2114`, `:2166`, `:2189`). |
| **2. A2: takeover returns exactly the change’s writes** | **FAIL** | Ownership checks precede each return entry, but the entries don’t always describe the writes that need returning. Tab records dropdown token entries even when `toggle(token, false)` changes nothing, then adds those tokens during return (`src/browser/Tab.ts:505`, `:520`, `:351`, `:372`). When the controls share a dropdown, later return entries overwrite the restoration made by earlier entries. Carousel removes pre-existing order/direction tokens without recording their removal (`src/browser/Carousel.ts:442`, `:486`, `:509`, `:514`, `:552`, `:558`). **Mutations:** the retained `A2-*` rows distinguish omitted returns on their fixtures. **Assertions distinguish these inputs: no**; the dropdown proof uses a control outside the outgoing dropdown, and the Carousel fixtures begin without the order/direction tokens (`tests/src/browser/Tab.test.ts:1597`; `Carousel.test.ts:2056`, `:2221`, `:2263`). |
| **3. A3: Toast’s stuck `showing` is gone** | **CONFIRMED** | A hide that starts shown carries `expected = undefined` through the transition write and wait. Removing `shown` there doesn’t stop it. Its completing step removes `transition`, dispatches `hidden`, and resolves true (`src/browser/Toast.ts:227`, `:234`, `:239`, `:244`, `:249`). **Mutation:** `A3-toast-hide-transition` requires `shown` at the transition door again. **Assertions distinguish it: yes**: the case asserts the successful hide, removal of `showing`, `hidden`, and successful later show/hide calls (`tests/src/browser/Toast.test.ts:1400`). The retained mutation fails through an assertion (`units/j-sameway-engines-a-mutations-orchestrator.log.txt:22`). |
| **4. A4: the enumeration is complete** | **FAIL** | The report describes Carousel’s completion removals as ending earlier addition entries. That isn’t exhaustive: an order/direction token already present creates no addition entry, but completion still removes it. Neither the returning arrays nor an acquisition/release exception covers that removal (`src/browser/Carousel.ts:442`, `:461`, `:486`, `:509`, `:552`). Tab’s table also treats unconditional dropdown token entries as actual changed-presence writes. The complete exit accounting follows. **Mutations:** `PHASE-collapse`, `PHASE-toast`, `PHASE-tab`, and `PHASE-carousel` distinguish returns after the sampled phase stops; `ORDER-tab` distinguishes reading the control before the list. **Assertions distinguish the missing removal entries: no**; no retained mutation or fixture covers them. |
| **5. The writer’s rulings hold under E24** | **FAIL** | The changed-presence ruling doesn’t hold for Tab’s dropdown tokens: `#selection` always produces those entries (`src/browser/Tab.ts:520`). Its forward-order inversion also fails for a shared dropdown. The identity rulings do hold: Toast compares identity across dispatch, and Collapse, Toast, and Tab retain the latest identity after completion (`Toast.ts:174`, `:180`, `:213`; `Collapse.ts:270`; `Tab.ts:281`). Carousel’s attribute entries carry the prior `aria-current` value (`Carousel.ts:373`, `:404`, `:656`). Timer releases, Tab’s blur, and an already dispatched `hidden` aren’t reversed. **Proof distinction:** moving Toast’s identity assignment before dispatch would break the prevented-nested-call assertions at `tests/src/browser/Toast.test.ts:1014`; clearing identity after a completed nested show would break `:979`. Those assertions distinguish identity behavior, not dropdown presence accounting. |
| **6. The proofs bind** | **CONFIRMED** | The retained base run names assertion failures for the reported cases (`units/j-sameway-engines-a-red-orchestrator.log.txt:3`). Reading the base sources confirms the stated indistinguishable agreement doors: their writes produce the same class value when the token already has its destination state. The instrument selects the named case, rejects suite errors and non-assertion failures, and distinguishes passed cases (`units/j-sameway-engines-a-mutations.py:156`, `:179`, `:211`). **Mutations:** the `A1-*`, `A2-*`, `A3-*`, `PHASE-*`, and `ORDER-tab` rows report assertion failures; `BOOM` and `UNBOUND` are refused; `CONTROL` holds (`units/j-sameway-engines-a-mutations-orchestrator.log.txt:10`, `:39`, `:40`, `:41`). **Assertions distinguish them: yes, within the named fixtures.** This doesn’t establish coverage of the failing inputs below. |
| **7. The integrated sentences are true** | **FAIL** | The agreement clauses follow the code, but the return descriptions overstate it. Tab doesn’t always restore the dropdown’s prior open state (`guides/veneer.md:1383`; `src/browser/Tab.ts:351`, `:518`). Carousel can remove order/direction tokens it didn’t add, contrary to the described return (`guides/veneer.md:1975`; `src/browser/Carousel.ts:509`, `:514`, `:552`). These are behavioral contradictions, not prose-voice findings. **Proof distinction:** `A2-tab-dropdown` and `A2-carousel-direction` distinguish missing returns on the existing fixtures, but those assertions don’t distinguish shared targets or pre-existing transition tokens. |
| **8. Greenfield and scope** | **CONFIRMED** | The commit comparisons match the reported engine and test paths for `9019d81`; `7511b82` changes only `src/browser/types.ts` and `guides/veneer.md`. The retained status agrees (`units/j-sameway-engines-a-status.txt:1`). `#writeTriggers` and `#select` have no remaining declaration or caller in the audited implementations. Their replacements are called from the change paths (`src/browser/Collapse.ts:233`, `:332`; `Tab.ts:234`, `:249`). The added ownership, door, and return helpers have callers; no unused compatibility path was found. No behavioral mutation applies. |

The following accounting covers every explicit return from the audited change methods. An entry list preserves its displayed order. At each entry, destruction or changed call identity suppresses the write. A phase failure that invalidates identity suppresses the entire return; Carousel does that by finishing the slide (`Collapse.ts:415`; `Toast.ts:297`; `Tab.ts:322`; `Carousel.ts:622`).

For Collapse, `T` means the transition entry, `H` the host-removal entry when the host token was present, `D` the dimension entry, and `M` the ordered trigger entries. `M≤i` means the prefix through the write that stopped.

| Collapse exit | Returning step receives |
|---|---|
| Show refused, prevented, destroyed, superseded, or transitioning after dispatch (`src/browser/Collapse.ts:180`, `:182`, `:193`) | No returning step |
| Show stops while hiding siblings (`:198`) | No returning step; sibling writes belong to their own changes |
| Show stops after adding transition (`:214`) | `[T]` |
| Show stops after removing host (`:224`) | `[T] + H` |
| Show stops after zero size (`:230`) | `[T] + H + [D]` |
| Show stops during trigger writes (`:234`) | `[T] + H + [D] + M≤i` |
| Show stops after scroll size or the wait (`:245`, `:248`) | `[T] + H + [D] + M` |
| Show stops after its host/shown write (`:257`) | `[T, D] + M` |
| Show stops after removing transition (`:261`) | `[D] + M` |
| Show stops after clearing size (`:268`) | `M` |
| Show completes (`:271`) | No return; dispatches `shown`, then returns the lifetime reading |
| Hide refused, prevented, destroyed, superseded, or transitioning after dispatch (`:276`, `:278`, `:286`) | No returning step |
| Hide stops after measured size (`:307`) | `[D]` |
| Hide stops after adding transition (`:311`) | `[D, T]` |
| Hide stops after host/shown removal (`:324`) | `[D, T] + H` |
| Hide stops during trigger writes (`:333`) | `[D, T] + H + M≤i` |
| Hide stops after clearing size or the wait (`:338`, `:341`) | `[T] + H + M` |
| Hide stops after adding host (`:347`) | `[T] + M` |
| Hide stops after removing transition (`:352`) | `M` |
| Hide completes (`:355`) | No return; dispatches `hidden`, then returns the lifetime reading |

Collapse’s return writes have these meanings (`src/browser/Collapse.ts:433`, `:448`, `:471`, `:488`).

| Entry | Stopped show writes | Stopped hide writes |
|---|---|---|
| `T` | Removes transition | Removes transition |
| `H` | Adds host | Adds host |
| `D` | Removes the inline dimension | Removes the inline dimension |
| Trigger `collapsed` | Adds collapsed, provided no target panel is shown | Removes collapsed |
| Trigger `expanded` | Sets `aria-expanded="false"`, provided no target panel is shown | Sets `aria-expanded="true"` |

The dimension writes share a state-based clearing entry. Adding host, removing transition, and clearing size retire the corresponding temporary entries. The change token itself is left as the host moved it. Snapshot holdings remain for destruction. Pruning an owned sibling destroys that sibling under its own lifetime; acquiring and hiding siblings isn’t reversed by this panel’s return (`Collapse.ts:534`, `:550`, `:565`, `:577`).

For Toast, `F` is `[fade]` only when the animated show found fade absent.

| Toast exit | Returning step receives and writes |
|---|---|
| Show refused, prevented, destroyed, or superseded after dispatch (`src/browser/Toast.ts:173`, `:175`, `:180`) | No returning step |
| Show stops after fade (`:196`) | `F`; removes fade |
| Show stops after shown/transition or its wait (`:205`, `:208`) | `F + [transition]`; removes each token in that order |
| Show stops after transition removal (`:211`) | `F`; removes fade |
| Show completes (`:215`) | No return; dispatches `shown`, attempts timer arming, returns lifetime |
| Hide refused, prevented, destroyed, or superseded after dispatch (`:219`, `:221`, `:224`) | No returning step |
| Hide stops after adding transition or its wait (`:235`, `:240`) | `[transition]`; removes transition |
| Hide stops after completing removal (`:248`) | `[]`; writes nothing |
| Hide completes (`:250`) | No return; dispatches `hidden`, returns lifetime |

Toast’s accepted-call timer clearing remains a release. Its completed show arms through `#arm`; it isn’t a return entry (`Toast.ts:184`, `:214`, `:228`, `:353`). Fade is recorded by presence; transition starts absent under the refusal checks.

For Tab, `W` is the ordered list accumulated before a step. A selection list contains the control’s selection and tab stop, followed by its dropdown toggle, menu, and wrapper entries where present. Pane entries are included only for tokens the call actually adds or removes.

| Tab exit | Returning step receives |
|---|---|
| Refused, destroyed during the sibling dispatch, prevented, superseded, or sibling changed after dispatch (`src/browser/Tab.ts:177`, `:185`, `:187`, `:193`) | No returning step |
| Stops after outgoing active removal or blur (`:218`, `:221`) | `[[outgoing, active, false]]` |
| Stops after outgoing pane removal (`:230`) | Previous entries plus each outgoing pane token that was present |
| Stops during outgoing selection (`:237`) | `W` plus the written selection prefix |
| Stops at incoming control activation (`:247`) | All outgoing entries |
| Stops during incoming selection (`:252`) | `W` plus the written selection prefix |
| Stops after incoming pane active (`:263`) | `W`, including its active addition when absent beforehand |
| Stops after incoming pane shown, fade wait, or outgoing `hidden` dispatch (`:270`, `:274`, `:279`) | All accumulated entries |
| Completes (`:282`) | No return; dispatches `shown`, returns lifetime |

Tab inverts each entry’s boolean in forward order (`Tab.ts:350`). Active/shown entries toggle the token; selected/expanded entries set the corresponding ARIA boolean; selected tabindex removes the attribute, while deselected tabindex sets `-1` (`:366`). The control’s own active token has no return entry. Blur stays where it moved focus. A delivered `hidden.vn.tab` can’t be withdrawn.

This inventory exposes the Tab defects: the selection list doesn’t test token presence, and separate entries can name the same dropdown target.

For Carousel, `I` is the completed indicator-entry list. `O` adds an incoming order entry only if the token was absent; `U` then adds an outgoing direction entry only if absent; `V` then adds an incoming direction entry only if absent. `L` removes incoming order/direction entries from `V`. `R` removes outgoing direction entries from `L` and appends `[outgoing, active, false]`.

| Carousel exit | Returning step receives |
|---|---|
| `slide` finds destruction, no active item, an unavailable destination, or the destination already active (`src/browser/Carousel.ts:260`, `:264`) | No returning step |
| `next`/`previous` step finds destruction, an in-flight slide, no active item, or no distinct destination (`:298`, `:301`, `:305`) | No returning step |
| Move prevented, destroyed, superseded, or invalid after dispatch (`:332`, `:346`) | No returning step |
| Stops after a leaving indicator’s active removal (`:386`) | Earlier indicator entries plus that token-removal entry |
| Stops after a leaving indicator’s attribute removal (`:400`) | Previous entries plus its prior `aria-current` value |
| Stops after an arriving indicator’s active addition (`:420`) | Earlier entries plus its token-addition entry, if absent beforehand |
| Stops after an arriving indicator’s attribute write (`:437`) | Previous entries plus its prior `aria-current` value |
| Stops after incoming order (`:458`) | `O` |
| Stops after outgoing direction (`:478`) | `U` |
| Stops after incoming direction or transition wait (`:499`, `:504`) | `V` |
| Stops after incoming order/direction removal (`:529`) | `L` |
| Stops after incoming active (`:549`) | `L` |
| Stops after outgoing completion removal (`:572`) | `R` |
| Completes (`:578`) | No return; finishes the slide, dispatches `slid`, applies the interaction ride, returns lifetime |

Every move that entered the `try` also executes `finally`: it finishes that identity and attempts re-arming when a timer had been running (`Carousel.ts:579`). This timer behavior is the stated exception.

Carousel’s return inverts token entries and restores each recorded `aria-current` value, removing the attribute when its prior value was null (`Carousel.ts:653`). The incoming active token belongs to the host’s takeover and isn’t returned. The inventory has no entry for completion’s removal of a pre-existing order/direction token.

The failing inputs are as follows.

- **Tab returns a dropdown token it never changed.** Put the active outgoing tab inside a closed dropdown whose toggle lacks `active` and whose menu lacks `show`. Put the incoming tab outside that dropdown; neither needs a pane. On the outgoing control’s `hidden.vn.tab`, remove the incoming control’s `active` token. The outgoing selection’s `toggle(token, false)` calls changed no token presence, but their unconditional entries survive. The return adds `active` to the dropdown toggle and `show` to the menu. Those additions reverse no write the swap made (`Tab.ts:234`, `:372`, `:520`). The existing proof instead first opens the outgoing dropdown (`tests/src/browser/Tab.test.ts:1622`).

- **Tab closes the restored sibling’s shared dropdown.** Put the outgoing and incoming controls in the same `.nav-item.dropdown`, with the outgoing control active, the dropdown toggle active, the menu shown, and the wrapper expanded. Neither control needs a pane. On the outgoing control’s `hidden.vn.tab`, remove the incoming control’s active token. The return restores the outgoing control and reopens the dropdown through its outgoing entries. It then processes the incoming entries for those same targets and closes the dropdown again. The method resolves false with the outgoing control active but its toggle inactive, its menu hidden, and its wrapper `aria-expanded="false"` (`Tab.ts:234`, `:249`, `:278`, `:350`, `:518`). Returning a shared target must preserve its pre-swap state across later entries.

- **Carousel loses a pre-existing order token.** Use the completing-write fixture at `tests/src/browser/Carousel.test.ts:2037`, but initialize the incoming item with `carousel-item carousel-item-next`. Keep its reaction that removes `active` when the slide adds it. No indicators or animated host are needed. The incoming order addition creates no entry because the token already exists (`Carousel.ts:442`). Completion removes that token (`:514`). The active-write reaction takes over the slide, whose return receives `L`, containing no entry to restore the removed order token (`:549`). The method resolves false with the pre-existing token gone. The same missing-entry pattern applies to pre-existing direction tokens removed at completion. These removals need their own accounting; they aren’t reversals of additions the slide made.

The requested return-reaction traces follow directly from the entry executors. In each row, the reaction changes only the call’s token back toward its requested end, without starting another engine call.

| Returning write | Effect of moving the call’s token back inside that write |
|---|---|
| Collapse show: remove transition, add host, or clear dimension | Adding `shown` doesn’t stop the remaining panel entries. Later trigger entries re-evaluate their explicit target-panel filter and skip a trigger that now names a shown panel (`Collapse.ts:456`, `:459`, `:498`). |
| Collapse show: add a trigger’s collapsed token or set its expanded value | The current write completes. If its reaction adds panel `shown`, subsequent trigger entries can be skipped by that same target-panel rule; the return doesn’t resume the show. |
| Collapse hide: clear dimension, remove transition, add host, remove trigger collapsed, or set expanded true | Removing panel `shown` doesn’t stop later entries. The return continues expanding the entries supplied to it, resolves false, and dispatches no completed event (`Collapse.ts:477`, `:498`). |
| Toast show: remove fade or transition | Re-adding `shown` doesn’t stop later entries. For example, a reaction to fade removal can add `shown`; transition removal still follows (`Toast.ts:320`, `:339`). |
| Toast hide: remove transition | Removing `shown` inside that write doesn’t restart or complete the hide; the return resolves false (`Toast.ts:329`). |
| Tab: toggle active/shown, set selected/expanded, or remove/set tabindex | Re-adding the incoming control’s active token doesn’t stop any later entry. The return reads neither that token nor the list, so it can leave that control active alongside the restored sibling (`Tab.ts:350`, `:359`, `:366`). |
| Carousel: toggle a token, restore `aria-current`, or remove `aria-current` | Re-adding incoming active doesn’t stop later entries. The return completes its supplied list, then `finally` finishes the slide and applies timer re-arming (`Carousel.ts:653`, `:665`, `:579`). |

Destruction does stop subsequent entries. For example, let a reaction to a stopped Toast show’s fade removal call `toast.destroy()`. Destruction aborts the lifetime, clears its timer, releases its claim, and restores its snapshot (`Toast.ts:253`). The returning loop’s next transition entry fails `#owns`, so it writes nothing after that restoration (`:272`, `:320`, `:339`). Removing the ownership guard would distinguish this trace by a transition write after destruction; the retained mutation instrument doesn’t plant that mutation.

No additional behavior defect outside the claims was substantiated.

VERDICT: FAIL 2, 4, 5, 7
