# J-SNAPSHOT audit round 1 — the objective lane's verdict (GPT-6 Astra, retained 2026-09-24)

Thread `01a0d3da-3dd7-7b33-b3ca-b502320afc33`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-snapshot-audit.jsonl` (launch copy under `tmp/codex/`); 25 commands; 422 s; usage {"input_tokens":1891219,"cached_input_tokens":1729664,"cache_write_input_tokens":0,"output_tokens":11575,"reasoning_output_tokens":5017}. Retained verbatim from the exec's last message.

---

OBJECTIVE lane — source review against the supplied execution evidence; no browser tests or mutations executed by this lane.

1. **CONFIRMED — shared attribute presence.**  
   I attacked restoration order, overlapping restores, saves during another snapshot’s write, saves during the restoring snapshot’s own write, and reuse after a completed restoration. The presence record survives while another holder remains; a save during its own restoration moves the holding back into `#joined`; an old departure checks current membership before acting. These attacks did not expose premature removal or loss of the successor’s holding. Evidence: `src/browser/HostSnapshot.ts:192`, `:211`, `:296`, `:309`.

   The supplied proofs distinguish the relevant mutations:

   | Proof in `tests/src/browser/HostSnapshot.test.ts` | Distinguishing mutation and assertion |
   |---|---|
   | Button-write interleaving, `:492` | Delete the remaining-holder branch. The final `hasAttribute('class') === false` distinguishes premature departure. |
   | Outer restoration empties the list after the nested restore, `:524` | The same deletion loses the absent-presence record before the final token disappears; `:554` distinguishes it. |
   | Sequential restoration in either order, `:557` | Read presence per snapshot and judge every departure. Assertions at `:575` distinguish empty attributes left behind for class and style. |
   | Shared Button/Collapse trigger, `:580` | Delete the remaining-holder branch. The trigger-presence assertion at `:612` distinguishes it; the panel and ARIA assertions also check restoration. |
   | Save during its own restoration, `:618` | Replace the take-back branch with unconditional joining. The subsequent restoration’s absence assertion at `:642` distinguishes the lost holding. |

   The whole-file `JOINED` rows bind these assertions: the instrument changes presence handling, preserves collection, and identifies the affected cases individually. They establish sensitivity to those mutations, not universal interleaving coverage. Evidence: `j-snapshot-mutations.py:30`; `j-snapshot-mutations.log.txt:2`.

2. **BROKEN — the Dropdown proof does not establish its no-later-writes assertion.**  
   The implementation’s hand-off survived the source attacks, but the proof-binding portion has a concrete timing defect.

   `tests/src/browser/HostSnapshot.test.ts:757` constructs a mutation observer whose callback discards delivered records. The reaction starts observing after nested destruction at `:764`; the test then awaits `dropdown.hide()` at `:766` before calling `takeRecords()` at `:768`. A synchronous write after nested destruction queues observer delivery before that await resumes. Delivery empties the observer’s queue and passes the records to the discarded callback. Consequently, the empty `takeRecords()` result does not distinguish no write from an already-delivered write. This follows from the [DOM mutation-observer delivery algorithm](https://dom.spec.whatwg.org/#notify-mutation-observers).

   **Concrete counter-control, derived from source:** after the outer restoration’s `removeAttribute('popover')` returns at `src/browser/HostSnapshot.ts:176`, write `data-popper-placement="late"` on that menu. The nested-return reading already captured `[null, null]`; the late mutation is delivered to the empty observer callback before the await resumes; the remaining assertions do not inspect the side attribute. This control was not executed under this lane’s restrictions.

   **Smallest fix:** retain callback deliveries in a recorder and assert that neither delivered records nor queued records exist. Alternatively, inspect the queue immediately after calling `hide()`, before awaiting its promise. Add a negative control that writes after nested destruction while leaving the nested-return reading correct.

   **Bound:** this is a proof defect, not evidence that the passing implementation currently performs that late write. The hand-off mutation row fails the state-at-return assertion at `:767`; it therefore binds that assertion, but cannot certify the independent no-later-writes assertion.

   The other S2 proofs have these bindings:

   | Proof | Binding |
   |---|---|
   | Interrupted restoration completed before nested return, `HostSnapshot.test.ts:645` | Dropping accumulation into `#published` and `#leaving` leaves `data-second` changed at the nested-return reading. Its observer check is synchronous and retains the relevant queue. |
   | Dropdown reproduction, `:727` | The same mutation leaves the side attribute `bottom` at nested return. The recorded whole-file row binds that reading only. |
   | Write once, `:688` | Removing the `entry.written` check permits recursive writes. The recorder assertion distinguishes it; the supplied row reports 44 writes instead of 1. |
   | Retained re-entry case, `:200` | Dropping accumulation also discards pending outer work during nested cleanup; the original-state assertion distinguishes that mutation. |
   | Retained takeover case, `:157` | Disabling `#take` would let the old restoration overwrite the successor’s state. The intermediate and final value assertions distinguish that behavior. |

   Evidence: `src/browser/HostSnapshot.ts:134`, `:252`, `:273`; `j-snapshot-mutations.py:48`; `j-snapshot-mutations.log.txt:7`.

3. **CONFIRMED — the edited contract describes the implemented restoration mechanism.**  
   I attacked the contract by comparing its presence lifetime, ordering, takeover, nested restoration, and throwing-withdrawal sentences with the actual state transitions. No remaining E13 presence or same-snapshot hand-off bound survives in the edited passages. Evidence: `src/browser/types.ts:344`; `src/browser/HostSnapshot.ts:7`; `guides/veneer.md:819`, `:1590`, `:2043`.

   The Modal case now asserts absence after distinct open-token holders release: `tests/src/browser/Modal.test.ts:608`. The unchanged Tab and Carousel paragraphs describe shared **target-value** ownership, which this presence registry does not implement: `guides/veneer.md:1224`, `:1800`.

   The engine comparison bounds that confirmation:

   | Consumer | Effect of this repair |
   |---|---|
   | Modal | Distinct body open tokens share presence through their separate snapshots; same-token reference counting remains in Modal. `Modal.ts:422`. |
   | Dropdown | Re-entrant destruction reaches Placement’s snapshot again and completes pending restoration. `Dropdown.ts:250`; `Placement.ts:187`. |
   | Button | Its token shares presence with Collapse’s trigger token. Repeated destruction itself returns at the aborted guard. `Button.ts:106`. |
   | Collapse | Its panel properties and trigger tokens use the shared presence mechanism. `Collapse.ts:386`. |
   | Tab | Presence becomes shared; separately recorded token and attribute values retain their documented bound. `Tab.ts:340`. |
   | Carousel | Presence becomes shared; the later Swipe restoration and its target-value bound remain. `Carousel.ts:265`, `:576`. |

   Bootstrap 5.3.8 supplies the compared token/ARIA sequences, but its `dispose()` does not promise Veneer’s snapshot restoration. Evidence: `node_modules/bootstrap/js/src/button.js:36`, `collapse.js:250`, `dropdown.js:187`, `modal.js:245`, `tab.js:104`, `carousel.js:300`, `base-component.js:39`.

4. **UNRESOLVED — independent mutation replay remains outstanding.**  
   The supplied log contains the stated `LANDED`, mutation, green, digest, and restoration-receipt rows. The current `HostSnapshot.ts` SHA-256 matches its recorded digest, `b55e55d9317395d806e43c92c285370826cd3de4d4a182e6edeaaa720ee326b4`. The script reads whole-file results and names individual failures; it does not itself turn a `JOINED` result into proof of every assertion in that case. Evidence: `j-snapshot-mutations.py:68`; `j-snapshot-mutations.log.txt:1`.

   I attacked the scope statement against the live status and diff. The changed paths match the retained status; the added source contains one class plus imports, readonly record fields, and no prohibited construct identified by this claim. The report explicitly records no `prove` call. Evidence: `j-snapshot-status.txt:1`; `j-snapshot-report.md:5`; `src/browser/HostSnapshot.ts:52`.

   The Orchestrator’s supplied gate results are accepted as established, without rerunning them. To settle the unresolved clause, supply its independent mutation replay, including the named failures and byte-restoration receipt. The observer control under claim 2 needs its own reading.

5. **CONFIRMED — objective shape checks.**  
   I attacked `written` as redundant state and the presence axis as an artificial mode. `written` distinguishes an entry whose write is executing from an unwritten pending entry; ownership alone cannot make that distinction. `class` and `style` identify actual attributes whose presence is recorded. The named members are single words, and the retitled Modal case names its asserted outcome. Evidence: `src/browser/HostSnapshot.ts:58`, `:74`, `:192`, `:264`; `tests/src/browser/Modal.test.ts:608`. No objective naming or prose contradiction was found.

**Findings fitting no claim:** none.

**Attacked and held**

- Nested restoration reached through another snapshot’s reaction, and deeper re-entry: pending ownership and the pre-write `written` mark prevent recursive rewriting of the active entry. `HostSnapshot.ts:261`.
- A nested throwing write: `finally` withdraws the captured published targets, including inherited targets. Custom-element callback exceptions are reported by the platform; they need not propagate through the outer DOM write. Evidence: `HostSnapshot.ts:180`; `HostSnapshot.test.ts:311`; [HTML reaction invocation](https://html.spec.whatwg.org/multipage/custom-elements.html#invoke-custom-element-reactions).
- A successor saves during restoration: `#records` remains separate from the captured targets, and `#hold` protects its presence holding. Preserving that successor for a subsequent restore is correct.
- A holder never restores: removal remains pending while that holder exists. An originally present empty attribute also remains present. Neither behavior falsifies restoration of recorded absence.
- E12 reachability: Button’s trigger and Collapse’s panel are distinct driven hosts in the shared-trigger proof. Delegate marks use route and driven host; Collapse checks containment before marking. `Delegate.ts:506`, `:571`, `:885`. The restoration change does not alter guards, parsers, or routing.

**Referrals**

- J-SNAPSHOT proof repair: retain observer deliveries and execute the late-write counter-control under claim 2.
- Orchestrator: supply the independent replay required by claim 4.
- Brief maintenance: the named `engine/units/j-w2-terrain-record.md` is absent at the supplied path; provide the intended evidence.

**Bounds**

This lane performed source and platform-specification review using the supplied execution records. It ran no browser test, build, mutation, or gate, wrote no files, spawned no agents, and read no other lane’s verdict. Tool discovery exposed `mcp__probe__prove`, contrary to the brief’s availability statement; it was not invoked because the brief prohibits the browser/mutation execution needed here. No refused `prove` call or probe receipt was produced.

VERDICT: FAIL 2, 4; outside the claims: none
