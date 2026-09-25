# J-PLACEMENT-141-FIX-DESIGN — the subjective lane's proposal (planner on Opus 5.5, 2026-09-25; brief units/j-placement-141-fix-design-brief.md)

**Lane:** I held the subjective lane: shape, naming, ergonomics, and design fit. Veneer's `refs/heads/main` reads `d33b27c1d216190c6410828082d903b182cef7f7`. I read every file at that tree.

## 1. The ruling

**Ruling: candidate A.** In `Dropdown.show`, the menu's `shown` token write moves ahead of the placement. `Placement` does not change. The show then renders the menu first and places it second. The hide already does the reverse: it removes the placement, then removes the rendering.

**Evidence for A**
- **A is the only candidate the 141 reading already covers.** The `display` variant renders the menu before both the promotion and the anchoring. It anchors on Chromium 141 (`VARIANT display pass=true anchored=true`, `.orkestrel/veneer/units/native141/j-placement-141-probe-141.log.txt:225`), including its second show (`gap: 2`, same log :185). It also anchors on Chromium 153 (`units/j-placement-141-probe-153-orchestrator.log.txt:217`).
  - The `.show` token gives the same computed state as that variant. The cascade hides the menu at `_dropdown.scss:151`, and `.dropdown-menu.show { display: block }` sits at `_dropdown.scss:269-271`.
- **The hidden interval comes from the show's write order.** The show places the menu at `Dropdown.ts:273`, which runs `showPopover()` at `Placement.ts:138` and the anchoring writes at `Placement.ts:166-178`. The token arrives only later, at `Dropdown.ts:291-294`.
  - For this reason the constructor's own `update()` at `Placement.ts:185` finds nothing to measure: the `side` getter reads `checkVisibility()` at `Placement.ts:197`. The later `placement.update()` step at `Dropdown.ts:299-301` exists only to cover that gap.
- **The show becomes the mirror of the hide.** `#conceal` destroys the placement first (`Dropdown.ts:460`) and then removes the token (`Dropdown.ts:464-467`). With A, the menu is placed only while it renders, at every step of both calls.
- **A changes no public contract.** The `DropdownInterface.show` return sentence (`types.ts:1091`) stays true word for word. `Placement.ts` code, `Tooltip.ts`, and `Popover.ts` do not change.
- **The dropdown is the only consumer that places a cascade-hidden element.** The other `Placement` consumer is `Tooltip.ts:803`. Its tips have no `display: none` in `_tooltip.scss`, and `_popover.scss:158` hides only an empty header. So the fix belongs to the dropdown.

**Alternatives**
- **B, where `Placement` defers anchoring until the element renders.** Refused:
  - **B is unmeasured.** B still promotes a hidden element and writes `position-anchor` and the anchor name for the first time after render. No probe variant tested that. `restyle` and `anchorInsets` rewrite the positioning after render and still fail on 141 (141 log:633, 480). So B needs another 141 round trip before anyone could adopt it.
  - **B breaks synchronous completion or adds a second state.** Learning when the element renders needs an observer, so anchoring would land after `shown.vn.dropdown`, which E32 refuses (`decisions.md:310-328`). The synchronous form keeps a "promoted but not anchored" state inside `Placement` that `checkVisibility()` already derives, against the Derive state law.
  - **B puts one consumer's cascade fact into a shared mechanism** that `Tooltip` does not need.
- **C, a third shape where the show places the menu last, after the toggle's token.** C keeps Bootstrap's synchronous order at the focus and `aria-expanded` reactions exactly, and it keeps one list for the returning step. It loses to A for these reasons:
  - A refused promotion would then happen after focus and after the `aria-expanded` and token writes. It would leave the toggle focused and flip `aria-expanded` to true and back. That breaks the guarantee pinned at `Dropdown.test.ts:1890` and stated at `guide veneer.md:1652-1654`.
  - The synchronous order C preserves is invisible to the oracle, which records only the settled state after each action (`setupServer.ts:5660-5716`).
  - C moves the placement across three writes. A moves one write.

## 2. The exact order of writes and takes in `Dropdown.show` after the change

1. **Refusal read.** `#refused(true, true)` (`Dropdown.ts:246`). No write.
2. **Pre-change dispatch.** `show.vn.dropdown` (`:248`). Door: `#halted(prior, true)` (`:253`). Unchanged.
3. **Change start.** Identity and `#changing` (`:254-256`). `expected` reads the token (`:257`).
4. **Snapshot.** `#save()` (`:262`) records both `shown` tokens and `aria-expanded` for destruction. Unchanged. J-RELEASE-RECORD later converts it to write-through.
5. **Release of a replaced placement.** `replaced?.destroy()` (`:267-269`). This runs consumer code. Door: `#holds(change, expected)` (`:270`). Unchanged. It is the only door left that reads no token.
6. **Moved: the menu's `shown` token.** Formerly at `:291-294`.
   - **Record (new):** `recordHostWrite([], { category: 'token', element: menu, name: shown }, shown)`. This records nothing when a `show` listener already added the token (`helpers.ts:965`).
   - **Write:** `if (!this.shown) menu.classList.add(shown)` through `#apply`.
   - **Door:** `#holds(change, true)`. On failure, `#rehide(change, marked)`, where `marked` is the list holding the menu's record. From here on, every door requires the token (E24, `decisions.md:160`).
7. **Take: `#place()`** (`:273`). The `Placement` constructor makes these writes, recorded in its own snapshot:
   - the `popover` attribute;
   - `showPopover()`, which fires the opening `beforetoggle`;
   - the write-backs of `POPOVER_PROPERTIES`;
   - the anchoring declarations;
   - the reference's `anchor-name`;
   - then its own `update()`, which now measures a rendered menu and writes `data-popper-placement`.
   
   Exits:
   - **Refused promotion:** `return this.#rehide(change, marked)` replaces `return false` (`:274`). It writes the menu's token back.
   - **Thrown construction** (for example, a `show` listener removed the menu, so `Placement.ts:94-98` throws): the show writes the menu's token back the same way, then rethrows. This follows the rule `Placement` already keeps: restore what you wrote before the error reaches the caller (`Placement.ts:45-48`).
   - **Otherwise:** `#placement = placement` (`:275`). Door: `#holds(change, true)`, then `#rehide(change, written)` (`:276`).
8. **Focus.** `host.focus()` with door `true` (`:277`).
9. **`aria-expanded`.** Record (`:286`), write, door `true` (`:287-289`).
10. **Toggle's `shown` token.** Record (`:295`), write, door `true` (`:296-298`).
11. **Removed:** the `placement.update()` step and its door (`:299-301`). The constructor's `update()` in step 7 now writes the side on a rendered menu.
12. **Completion.** `#changing = false`, then `shown.vn.dropdown` (`:302-303`).

**The returning step `#rehide`** (`:395-404`) is unchanged. It still runs in reverse order of first writes: the toggle's token, `aria-expanded`, then the placement's destruction.
- After step 7, `written` excludes the menu's record. On every later stop either the host has already taken the menu's token back (a takeover), or the call no longer owns the dropdown, so `rewindHostWrites` writes nothing (`helpers.ts:982-989`).
- Only the refused or thrown placement returns the menu's record. No placement exists at that point, so the reverse order holds on every path.

## 3. What it keeps and what it risks

**Bootstrap parity**
- Kept:
  - The events stay `show` then `shown`, both synchronous.
  - The state at `shown` is unchanged: focus on the toggle, `aria-expanded="true"`, both tokens, the side attribute, and the promoted menu.
  - The census reads settled states, so the dropdown rows (`setupServer.ts:846-870`) do not move.
- Changed:
  - A consumer's toggle `focus` listener or `aria-expanded` reaction now finds the menu shown and promoted.
  - From my knowledge of `dropdown.js`, Bootstrap writes focus and `aria-expanded` before the menu's token, so its listener finds the menu hidden. This is unverified: I did not read the pinned bundle. The unit confirms it against the pinned bundle and records one sentence in the guide's departures list (`guide veneer.md:1843-1877`).

**E24**
- Every write A reorders keeps its door. The menu's token gains a record.
- The agreement window shrinks to the pre-change dispatch and the replaced placement's release. The promotion, focus, and `aria-expanded` doors now follow the token step, so a host that removes the token there takes the change over.
- Tables this makes false, which the unit rewrites:
  - `DROPDOWN_SHOW_DOORS` (`setupBrowser.ts:3244-3249`);
  - `DROPDOWN_SHOW_REVERSALS` (`setupBrowser.ts:3268-3274`);
  - the agreement case (`Dropdown.test.ts:1191-1326`). Its `promotion` row adds a token that is already present, which fires an echo, so `echoes: 0` goes false.
  - The guide's agreement paragraph (`guide veneer.md:1781-1789`).
  - The sentence "destroys its placement, its first write" (`guide veneer.md:1798-1799`, `Dropdown.ts:73-74`).
- The `[undefined, 'side']` reversal row stays reachable, at the door after `#place`.

**E35**
- The show still has one take: the placement's construction. J-RELEASE-POPUPS holds it right before `new Placement`, as E35 requires (`decisions.md:437`).
- The only new write before the take is the menu's token, which the snapshot records. A destruction inside the opening `beforetoggle` drains newest first. It releases the placement, then restores the token, so the menu is never placed while hidden, even during a drain.
- A `hold` that returns `false` stops the show, and the snapshot returns the token.

**E32.** The show stays synchronous and waits for no motion. The cascade declares none on the menu (`_dropdown.scss:269-271`).

**Chromium 153**
- Every 153 probe variant anchors except the `missingAnchor` control (153 log:646).
- The existing end-state readings stay true on 153: `gap: 2`, `side: 'bottom'`, `display: 'block'` (`Dropdown.test.ts:1322`), and the refusal case's end states (`:1882-1896`).

**Risks**
- **Direct `Placement` consumers.** A consumer who constructs `Placement` on an element the cascade hides still meets the 141 fault. The unit adds one prerequisite sentence to the `Placement` remarks and to the guide's `Placement` paragraph (`guide veneer.md:1680-1694`).
- **Removing the late `update()`.** If the toggle's `shown` token moves the reference, the side would be measured before the move. The `ResizeObserver` covers size only.
- **Thrown placement.** The thrown path is new: before A it left no token written.

## 4. The unit

**J-PLACEMENT-141-FIX** is `opus` on Opus 5.5, native, because its proofs run in Chromium (Bench law 5). Its audit runs `analyst` on GPT-6 Astra and `reviewer` on Opus 5.5. The authoritative gates are `verifier` on Sonnet. The styles session supplies the 141 readings on the Orchestrator's request.

**Owned files**
- `src/browser/Dropdown.ts`: `show` and the class remarks. Leave `#rehide` unchanged unless the objective lane rules otherwise.
- `tests/src/browser/Dropdown.test.ts`.
- `tests/setupBrowser.ts`: the two show tables and their TSDoc. This is a report-only patch while another unit holds the file.
- `guides/veneer.md` § Dropdown: the show paragraph, the refusal sentence, the agreement and returning paragraphs, the departures list, and the `Placement` paragraph's prerequisite sentence.
- `src/browser/Placement.ts`: the class `@remarks` prerequisite sentence only.

**Off-limits:** `Placement.ts` code, `types.ts`, `constants.ts`, `helpers.ts`, `Tooltip.ts`, `Popover.ts`, and J-RELEASE-CORE's files.

**Order:** dispatch now. J-SAMEWAY-ENGINES-B has landed, and J-RELEASE-CORE is disjoint. Land it before J-RELEASE-RECORD and J-RELEASE-POPUPS, and send the new record and order to their briefs.

**Red-first proofs**
1. **Render witness, red on 153 at `d33b27c`.**
   - Setup: a menu `beforetoggle` listener (`newState === 'open'`) reads `getComputedStyle(menu).display` and `menu.checkVisibility()`.
   - Before the fix it reads `none` and `false`. After, it reads `block` and `true`.
   - Mutation: moving the token write back after `#place` reddens it.
2. **Gap case (the brief's).**
   - Setup: the probe's fixture, with the toggle in a 300×150 scroller.
   - Steps: a trusted `userEvent.click` on the toggle, then `show()`, then read the menu's top minus the toggle's bottom (2). Then `hide()`, a trusted key press, `show()` again, and read the gap again. The second show is required because the fault recurs there (141 log:32, 236).
   - Before the fix it is red on 141 and green on 153. After, it is green on both.
3. **Return proofs.**
   - A refused promotion writes the menu's token and then writes it back: a mutation record on the menu's `class`.
   - A thrown placement leaves the menu with no token.
4. **The probe.** The styles session runs `j-placement-141-probe.test.ts` unchanged (SHA-256 `28e0cd12…`) at the unit's tip. Acceptance is `VARIANT baseline pass=true anchored=true`.

**Acceptance criteria, cheap first**
1. The scoped typecheck and lint pass.
2. Proof 1 runs red at `d33b27c` and green at the tip. Record the command and its counts.
3. `Dropdown.test.ts` passes on 153.
4. `npm run test:guides` passes.
5. The styles session's 141 readings of proofs 2 and 4.

**J-ORACLE-FIX-PLACEMENT does not join this unit.** Run it next, serialized after this one:
- It changes `Placement.update` and every consumer's attribute, including `Tooltip`.
- It raises an API-shape question: the `side` key (`constants.ts:261-264`) would name an attribute that carries more than the side.
- Its acceptance is the 153 census, not the 141 reading.
- Keep proof 2 off the side attribute's value, so the ORACLE fix does not turn it red.

## 5. What I could not settle, and the probes that would

**Why input is a condition.** The data says "trusted input", not "trusted pointer press":
- `noClick`'s second show fails after only a trusted Escape key press (`gap: -279`, 141 log:236).
- `entryFocus`'s second show fails after focus moved away (141 log:287). That refutes the idea that the failure is only about focus not moving.

Hypothesis: trusted input aimed at the reference changes its interaction state (`:hover`, `:active`, or `:focus-visible`). An invalidation pending on the reference when a hidden menu is promoted leaves Chromium 141's anchor lookup unresolved. To test it, add these variants on 141:
- `hoverOnly`: hover over the toggle, with no press;
- `pressAway`: press, then move the pointer off the toggle before `show()`;
- `syntheticClick`: dispatch an untrusted click;
- `keyOnly`: focus the toggle programmatically, then send a trusted key press.

The design does not rest on this answer.

**Whether B would repair 141** remains unmeasured. A 141 variant would settle it: promote the hidden menu, then write `position-anchor` and the reference's name for the first time after `.show`.

**Whether the 141 reading holds at `d33b27c`.** The probe ran at `21c821a` (141 log:2), which I cannot relate to `d33b27c` without running `git`. Proof 2 run red on 141 at `d33b27c` settles it.

**Whether removing the late `update()` is safe.** Settle it with a case where the toggle's `.show` rule changes its box, reading the side at `shown`.

**Where the brief and evidence disagree with the code or files**
- The 141 log is at `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/native141/j-placement-141-probe-141.log.txt`, not under `engine/units/native141/`.
- `guides/veneer.md` has no § Placement. The `Placement` paragraph sits inside § Dropdown (`:1680-1694`), and `PlacementInterface` sits under § Methods (`:407`).
- The Dropdown gap case cannot be red-first on this host. Chromium 153 anchors already (153 log:64), so proof 1 carries the 153 red.
- The probe's `control.baseline.round3.chromium141` pins the failing geometry `[2,2,2]` (`j-placement-141-probe.test.ts:670-673`, `:758`). A fixed run will fail that control, print `VOID`, and turn the file red. Read the fixed run by its `VARIANT baseline` line and the other controls. Alternatively, have the Orchestrator issue a successor probe copy that pins the anchored geometry.
