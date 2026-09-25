# J-RELEASE-SWEEP slice S3 — the lens map (2026-09-25)

`reviewer` on Opus 5.5, holding the objective lens, in Workflow run `wf_29efd986-1c7`. The brief is `units/j-release-sweep-brief.md`. The lens's final message follows verbatim.

**Source review, objective lens, slice S3.** I held the objective lens. I ran nothing. Every ruling comes from reading the files at `C:/Users/mikes/WebstormProjects/veneer/src/browser/`. I could not check that the tree is at `main` `1290162`, because I can't run `git`. All five slice files resolved at that root. I also read the helpers the slice's releases depend on: `HostSnapshot.ts`, `Registry.ts`, and, from `helpers.ts`, `settleAnimations`, `reflow`, `readScrollbarWidth`, `readHostValue`, `writeHostValue`, `recordHostWrite`, and `rewindHostWrites`. Line numbers are approximate, so locate each site by its symbol.

## 1. Station table

### Modal.ts

**M1. `show`, stopped at the scroll-lock door (~265–272).**
- **Holding:** the `ScrollLock`.
- **Taken:** the lock is constructed at ~266.
- **Given back:** not given back on a stop, per E22. `#lock` keeps it and `destroy` releases it through the signal.
- **I1:** n/a. **I2:** holds. During construction the lock's abort listener (ScrollLock.ts ~68) reaches it before `#lock` is assigned.

**M2. `show`, stopped at the `open` or `#adjust` door (~273–278).**
- **Holding:** the body's `open` token, and `padding-left` or `padding-right` on the host.
- **Taken:** ~274–275 and ~278 (`#adjust` ~596–602).
- **Given back:** the token stays held, per E22. The padding is returned by no returning step: no `#rehide` list (~522–545) names it.
- **I1:** n/a. See finding F1. **I2:** holds, because `#open` and `#snapshot` are readonly fields.

**M3. `show`, stopped after the backdrop (`#rehide` with `shade`, ~282–294 and ~296–298).**
- **Holding:** the backdrop's insertion and its `shown` token.
- **Taken:** `shade` is recorded at ~289–291, then `held.show` runs at ~292.
- **Given back:** `#rehide` 'connection' at ~537–540 and 'token' at ~541.
- **I1: violates (low).** The record is `isConnected`, but `Backdrop.show` moves the element whenever `parentNode !== parent` (Backdrop.ts ~77–78). A backdrop the consumer moved while it stayed connected is recorded as `['token']`, so its move back into `body` is never returned.
  - **Input:** after a stopped hide leaves the backdrop in `#backdrop`, move `.modal-backdrop` into another `div`. Call `show()`. Remove `show` from the host in a focus listener. The backdrop stays in `body`.
  - **Reachability:** shipped code plus a consumer DOM move.
- **I2: violates (letter only).** `this.#backdrop = undefined` runs at ~538, before `backdrop.destroy()` at ~539. The only consumer code inside `Backdrop.destroy` is a disconnection reaction, and it runs after the element's single removal. Nothing is observable.

**M4. `show`, stopped after the host writes (`#rehide` with `written`, ~300–341).**
- **Holding:** the host's `display`, `aria-hidden`, `aria-modal`, and `role`.
- **Taken:** ~300–311. Nothing records the prior values: `#save` (~580–591) feeds only the snapshot.
- **Given back:** `#rehide` ~531–534 writes constants: `display:none`, `aria-hidden="true"`, and removal of `aria-modal` and `role`.
- **I1: violates.** The step acts on constants, not on the record. It writes `aria-hidden` when the show's removal changed nothing, and it removes a `role` the host carried before.
  - **Input:** `<div class="modal" role="dialog" tabindex="-1">`, then `new Modal(host, { backdrop: false })`, then `host.addEventListener('focus', () => host.classList.remove('show'), { once: true })`, then `await modal.show()`. The result is `role` absent and `aria-hidden="true"`, though neither was so before.
  - **Reachability:** shipped code, through the documented takeover (E22).
  - **Referral:** E22 amendment item 2 prescribes "hidden display and ARIA state". The invariant and E22 disagree on this point.
- **I2:** holds.

**M5. `show` appends the host to `body` (~295–299).**
- **Holding:** the host's placement.
- **Taken:** ~296, when `body` does not contain the host.
- **Given back:** never. No `#rehide` entry, `hide`, or `destroy` moves the host back.
- **I1: violates.**
  - **Input:** a host inside a shadow root, or the TSDoc example's detached host (~93–100). Call `show()`, then `hide()`, then `destroy()`. The host stays in `document.body`.
  - **Reachability:** shipped code. This matches Bootstrap, so it is a referral on whether parity governs.
- **I2:** n/a.

**M6. `show`, stopped during the isolation's construction (~327–337).**
- **Holding:** the `Isolation`, held in a local.
- **Taken:** ~328.
- **Given back:** `isolation.destroy()` at ~335. `destroy` reaches it through the signal listener (Isolation.ts ~94).
- **I1:** holds. **I2:** holds.

**M7. `hide` releases the isolation (~363–365).**
- **Holding:** `#isolation`.
- **Taken:** in `show`, ~338.
- **Given back:** `this.#isolation = undefined` runs at ~364, before `isolation?.destroy()` at ~365.
- **I1:** holds, because the claims are records.
- **I2: violates.** A nested `destroy()` cannot reach the release in progress, because Isolation.ts ~126 returns at once and the isolation's own abort already removed its listener on the modal's signal.
  - **Input:** a sibling `customElements.define('x-side', class extends HTMLElement { static observedAttributes = ['inert']; attributeChangedCallback() { modal.destroy() } })` placed before a `<main>`. Show the modal, then call `hide()`. When the nested `destroy()` returns, `main.inert` is still `true`.
  - **Reachability:** shipped code plus a custom-element reaction. E24's amendment ruled this conforming, so the Orchestrator must settle whether E24 or I2 governs.

**M8. `hide` fades and removes the backdrop (~392–404).**
- **Holding:** the backdrop's token and its connection.
- **Taken:** `faded` is recorded at ~393–394, before `held.hide()` at ~396. `place` is recorded at ~399, before the removal at ~402.
- **Given back:** `#reshow` 'connection' and 'token'.
- **I1:** holds for both records. `place` records the parent but not the sibling position, so `append` at ~509 can change the element's order (low).
- **I2:** holds. `#backdrop` stays set until ~422.

**M9. `hide` returns the body's `open` token (~406).**
- **Holding:** the shared `open` record.
- **Taken:** ~274.
- **Given back:** `#open.restore()`.
- **I1:** holds (the record). **I2:** holds.

**M10. `hide` returns the host's padding (~409–414).**
- **Holding:** `padding-left` and `padding-right`.
- **Taken:** `#adjust`.
- **Given back:** `removeProperty`, which is a constant, not the prior value.
- **I1: violates.**
  - **Input:** `<div class="modal" style="padding-right:8px">` with a classic scrollbar. Call `show()`, then `hide()`. The consumer's `8px` is gone.
  - **Reachability:** shipped code. This matches Bootstrap: referral.
- **I2:** holds.

**M11. `hide` returns the host's attributes on a completed hide (~375–386).**
- **Holding:** `display`, `aria-hidden`, `aria-modal`, and `role`.
- **Taken:** in `show`, ~300–311.
- **Given back:** constants.
- **I1: violates.**
  - **Input:** `role="dialog"` in the markup. Call `show()`, then `hide()`. `role` ends absent, and `aria-hidden="true"` is added though it was never taken.
  - **Reachability:** shipped code. This matches Bootstrap: referral.
- **I2:** holds.

**M12. `hide` releases the scroll lock (~405, ~415–416).**
- **Holding:** `#lock`.
- **Taken:** M1.
- **Given back:** `this.#lock = undefined` runs at ~415, before `lock?.destroy()` at ~416.
- **I1:** holds (the snapshot).
- **I2: violates.** ScrollLock.ts ~129 aborts the lock's own controller first, so a nested `destroy()` cannot reach the lock's restoration in progress.
  - **Input:** a full-width `sticky-top` custom element with `observedAttributes = ['style']` whose callback calls `modal.destroy()`. Show the modal with a classic scrollbar, then call `hide()`. When the nested call returns, the element's `margin-right` is still compensated.
  - **Reachability:** shipped code plus a reaction. E24 ruled this conforming: referral.

**M13. `hide` destroys the backdrop (~422–423).**
- **Holding:** `#backdrop`.
- **Given back:** the field is cleared at ~422, before `held?.destroy()` at ~423.
- **I1:** holds.
- **I2: violates (letter only).** The same as M3. Consumer code runs only after the single removal.

**M14. Stopped `hide` (`#reshow`, ~493–514).**
- **Holding:** the host's attributes, and the backdrop's connection and token.
- **Given back:** constants at ~503–506. The 'token' entry calls `void backdrop.show(...)` at ~510.
- **I1: violates.**
  - The host values are constants, not the values recorded when the hide took them.
    - **Input:** on a shown modal with `backdrop: true`, call `host.setAttribute('role','alertdialog')`, then `new MutationObserver(() => host.classList.add('show')).observe(host, { attributeFilter: ['role'] })`, then `await modal.hide()`. The result is `false`, with `role="dialog"`.
    - **Reachability:** shipped code.
  - The 'token' step runs `Backdrop.show`, which moves a backdrop the consumer relocated during the fade back into its parent (Backdrop.ts ~77–78). That is a write the hide never made.
    - **Reachability:** shipped code plus a DOM move.
- **I2:** holds.

**M15. `destroy` (~441–455).**
- **Holding:** every holding: the lock and the isolation through the signal, then `#backdrop`, `#open`, and `#snapshot`.
- **Given back:** `abort` at ~443, then ~450–454.
- **I1:** holds. Every release acts on a record or a snapshot.
- **I2: violates.** Consumer code runs inside `abort`: the lock's style reactions, the isolation's inert reactions, and `trigger.focus()` (Isolation.ts ~132). A nested `destroy()` there returns at ~442 before the backdrop, `#open`, and `#snapshot` are restored.
  - **Input:** `button.addEventListener('focus', () => { modal.destroy(); seen = document.querySelector('.modal-backdrop') !== null })`. Call `await modal.show(button)`, then `modal.destroy()`. `seen` is `true`.
  - **Reachability:** shipped code, through the documented `trigger` argument.

**M16. `#bounce` (~624–642).**
- **Holding:** the `static` token.
- **Taken:** ~637, only when the host lacks the token (~630).
- **Given back:** ~641. On destruction the snapshot restores it.
- **I1:** holds. **I2:** holds.

### Offcanvas.ts

**O1. `show`, stopped at the lock door (~258–261).** The same as M1. I1 n/a, I2 holds.

**O2. `show`, stopped after the backdrop (~267–294, `#rehide` ~519–527).**
- The `shade` record at ~284–286 has the same `isConnected`-against-`parentNode` mismatch as M3.
- **I1: violates (low).** Input and reachability as in M3.
- **I2: violates (letter only).** `#backdrop` is cleared at ~522, before `destroy()` at ~525. `#listening` is aborted before it is cleared (~523–524), which holds.

**O3. `show`, stopped after the host writes (`#rehide`, ~295–333, ~516–518).**
- `#rehide` removes `aria-modal` and `role` and removes `showing` unconditionally.
- **I1: violates.**
  - **Input:** `<div class="offcanvas offcanvas-start" role="region" tabindex="-1">`, then `new Offcanvas(host, { backdrop: false, scroll: false })`, then a one-time focus listener that removes `show`, then `await offcanvas.show()`. `role` ends absent.
  - **Reachability:** shipped code. E22 conflict: referral.
- **I2:** holds.

**O4. Isolation construction during a takeover (~318–329).** Reached through the signal. I1 holds, I2 holds.

**O5. `hide` releases the isolation (~359–361).** The field is cleared before the release.
- **I1:** holds. **I2: violates.** The same as M7, with the same input shape.

**O6. Stopped `hide` (`#reshow`, ~481–499).**
- **I1: violates.** The constants at ~490–491 and the relocating 'token' step at ~495 are the same as M14. The 'hiding' entry removes a token the hide might not have added (~363).
  - **Input:** a custom-element host with `observedAttributes = ['role']` that adds `show` when `role` is removed, after the consumer set `role="alertdialog"` on the shown panel. Call `hide()`. The result is `role="dialog"`.
  - **Reachability:** shipped code.
- **I2:** holds.

**O7. `hide` removes the tokens (~383).**
- `remove(hiding, showing)` also removes a `showing` token the change never wrote.
- **I1: violates (low).**
  - **Input:** markup `class="offcanvas show showing"`, then `hide()`.
  - **Reachability:** markup only.
- **I2:** holds.

**O8. `hide` returns the attributes (~386–392).** Constants.
- **I1: violates.** Input: `role="region"` in the markup, then `show()`, then `hide()`. `role` ends absent. This matches Bootstrap: referral.
- **I2:** holds.

**O9. `hide` removes the backdrop (~397–401).** `place` is recorded before the write. I1 holds, I2 holds.

**O10. `hide` releases the lock (~402–406).** `#lock` is cleared at ~403, before `destroy` at ~404.
- **I1:** holds. **I2: violates.** The same as M12.

**O11. `hide` releases the listener and the backdrop (~410–415).**
- **I1:** holds.
- **I2:** `#listening` holds. `#backdrop` is cleared at ~412 before `destroy` at ~413: violates by the letter only.

**O12. `destroy` (~425–442).** The same shape as M15.
- **I1:** holds.
- **I2: violates.** A nested `destroy` inside `abort` (~427) returns at ~426 before the backdrop is destroyed (~439) and the snapshot restored (~441). Input: a focus listener on the trigger, as in M15.

### Backdrop.ts

**B1. `show`, stopped after the insertion (~77–80).**
- The element stays in the parent, and its owner returns it (M3, O2).
- **I1:** n/a. **I2:** holds (`#element` is readonly).

**B2. `hide` (~87–96).**
- It removes only a token that is present, on the engine's own element.
- **I1:** holds. **I2:** holds.

**B3. Supersession during settle (~83–84, ~94–95).**
- The later call owns the token.
- **I1:** holds. **I2:** holds.

**B4. `destroy` (~98–102).**
- It aborts, then makes the element's single removal. Consumer reactions run only after that removal.
- **I1:** holds. **I2:** holds.

### Isolation.ts

**I1s. Construction stopped by an abort (~100–118).**
- `#claim` saves the record and adds the element to `#claimed` before its write (~139–145).
- **I1:** holds. **I2:** holds.

**I2s. Observer claims (~55–62).**
- The observer is disconnected first in `destroy` (~128).
- **I1:** holds. **I2:** holds.

**I3s. Hand-off in `destroy` (`#release`, ~129 and ~150–161).**
- It writes the newest remaining claim's recorded `inert` value.
- **I1:** holds.
- **I2: violates.** A reaction to a write in progress that calls the owner's `destroy()` returns at ~126 before `#claimed` and the snapshot are released. This is the root of M7 and O5.

**I4s. Snapshot restoration (~131).**
- **I1:** holds.
- **Bound: violates (low).** `#claim` saves even when `toggleAttribute` changes nothing (~139). For a sibling already carrying `inert`, the restoration then calls `setAttribute('inert','')`, which queues a mutation record and a reaction for a write the engine never made.
  - **Input:** `<aside inert>` beside the host with a `MutationObserver`. Create the isolation, then destroy it. One `inert` mutation record appears.
  - **Reachability:** shipped code.
- **I2:** the same class as I3s.

**I5s. Focus return (~132).**
- The trigger is recorded at ~79. Its consumer code runs after every write.
- **I1:** holds. **I2:** holds.

### ScrollLock.ts

**S1. Construction stopped (~64–66, ~89, ~108, ~118).**
- The record is published at ~85 before any write, and each save comes before its write.
- **I1:** holds. **I2:** holds.

**S2. `destroy` by a holder that is not last (~130–132).**
- **I1:** holds. **I2:** holds.

**S3. `destroy` by the last holder (~135–136).**
- **I1:** holds.
- **I2: violates.** `#locks.delete` at ~135 runs before `snapshot.restore()` at ~136, and ~129 aborts first, so a nested owner `destroy()` returns before the restoration finishes. This is the root of M12 and O10. Input as in M12.
- **Referral (a take station, outside I1 and I2):** a lock taken in a reaction during that restoration reads a computed `padding-right` the old lock has not yet restored (~103–107). It writes double compensation, while its record joins the original value.

## 2. Consumer code each station runs

**`Modal.show` and `Offcanvas.show`:**
- **`show.vn.*` dispatch:** no holdings yet.
- **`ScrollLock` construction:** style reactions on `body` and on fixed or sticky elements. The lock is reachable only through its signal listener, because `#lock` is not yet assigned.
- **`open` token and `#adjust`:** body-class and host-style reactions. `#lock` is set.
- **Backdrop insertion:** connection reactions inside a retained backdrop. `#backdrop` is set.
- **Settle awaits:** any task, observer, timer, or transition listener. Every field is set.
- **`body.append(host)`:** connection reactions.
- **Host attribute and class writes:** host reactions.
- **`Isolation` construction:** inert reactions. The isolation is a local, reached through the signal.
- **`host.focus()`:** focus, focusin, blur, and focusout listeners. `#isolation` is set.
- **`shown.vn.*` dispatch:** every field is set.

**`Modal.hide` and `Offcanvas.hide`:**
- **`hide.vn.*` dispatch:** every field is set.
- **`isolation.destroy()`:** inert reactions, then trigger focus and blur. `#isolation` is already cleared (M7, O5).
- **Host writes and the settle awaits:** `#backdrop` and `#lock` are set.
- **Backdrop removal:** disconnection reactions. `#backdrop` is set.
- **`#open.restore()` and the padding removal:** body and host reactions. `#lock` and `#backdrop` are set.
- **`lock.destroy()`:** style reactions. `#lock` is already cleared (M12, O10), and `#backdrop` is set.
- **`held.destroy()`:** disconnection reactions after the removal. `#backdrop` is already cleared.
- **`hidden.vn.*` dispatch:** fields are cleared.

**Returning steps:** host reactions, backdrop insertion and removal reactions, and focus from `isolation.destroy()` at M6 and O4. Nothing touches the fields, except that `#backdrop` is cleared inside 'connection'.

**`destroy`:** `abort` runs the lock's style reactions, then the isolation's inert reactions and focus, with `#backdrop`, `#lock`, and `#isolation` still set. After that come the backdrop's disconnection reactions and the restore reactions of `#open` and `#snapshot`. A nested `destroy` returns early at every one of these points.

**Other:**
- **`#bounce`:** `prevent.vn.modal`, `host.focus()`, the `static` token reaction, and the settle.
- **Offcanvas `#press` and `#resize`:** each only calls `hide`.

## 3. The source

Every release primitive in the slice is guarded by `if (aborted) return` and aborts before it restores, and every owner clears its field before it calls the release. So a `destroy()` nested in consumer code inside a release returns before that release finishes. Only `HostSnapshot.restore` completes a nested call. Separately, `Modal` and `Offcanvas` return their host writes as hard-coded constants in `hide`, `#rehide`, and `#reshow`. Their siblings `Collapse`, `Toast`, `Tab`, and `Carousel` use the `recordHostWrite` and `rewindHostWrites` record in `helpers.ts` (~950–989) instead.

**One change at the source would close both.** Give each engine one pending-release record: an entry per take, holding the value recorded through `recordHostWrite` or the resource with its release. Have every `hide`, returning step, and `destroy` drain that record. Have a nested `destroy` drain whatever is still pending before it returns, and clear each entry only after its release returns.

## 4. Claims I could not break

- A returning step writes nothing after its call is superseded or the engine is destroyed (`#revert` at Modal ~550 and Offcanvas ~536, with `#owns`).
- The `faded`, `place`, and `shade` records are read immediately before the write they describe. The only gap is the granularity of `shade` (M3, O2).
- An isolation stopped during construction is released through its signal before any field holds it.
- The `Isolation` claim hand-off, in any destruction order, acts on the claim records and never on a fresh read.
- The `ScrollLock` reference count is published before its first write, and a construction aborted part-way restores what it wrote.
- `Backdrop.show` writes no token after `owned()` returns `false` or after a later call supersedes it.
- Offcanvas `#listening` is always aborted before it is cleared.
- A restoration nested inside the same snapshot's restoration completes (`HostSnapshot.restore` ~131–170).
- `Registry.release` runs before any restoration, so an engine constructed during the restoration joins the shared records.

## Findings outside the station rows

- **F1.** `#adjust` padding written by a stopped Modal show is returned by no `#rehide`. It lasts until the next show and its hide, or until destruction (Modal ~278 and ~522–545).
- **F2. Referrals to the Orchestrator:**
  - I2 conflicts with E24's amendment, which ruled a restoration completing inside `Isolation.destroy` or `ScrollLock.destroy` conforming (M7, M12, O5, O10, I3s, S3).
  - I1 conflicts with E22's hard-coded "hidden state" (M4, O3).
  - I1 conflicts with Bootstrap parity for the completed-hide constants and the host append (M5, M10, M11, O8).

**Dispatch:** there is no dispatch defect. The brief names no report path and assigns no command.
