# J-TOOLTIP audit round 2 — the subjective lane's verdict (`reviewer` on Opus 5.5, retained verbatim from the agent's return, 2026-09-24)

Lane: `reviewer` on Opus 5.5, native subagent, read-only, briefed by `j-tooltip-audit-2-reviewer-brief.md` over `j-tooltip-audit-claims-2.md`. The Orchestrator's rulings are in `j-tooltip-audit-2-verdict.md`; the dispatch defects it names are the Orchestrator's.

---

Subjective lane, held by `reviewer` on Opus 5.5 (the alias served `claude-opus-5-5[1m]`), native and read-only.

**Dispatch defects:**
- The brief `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-tooltip-audit-2-reviewer-brief.md` was copied from another unit's round and never rewritten:
  - Line 5 names the landed pattern as `Collapse.ts` and `Button.ts`, and lists "the delegate route as an API, the shared patches' shape".
  - Line 9 lists `Delegate.ts` as a subject file.
  - J-TOOLTIP has no delegate route and changes no shared patch.
  - I followed the dispatch message instead (`Toast.ts`, `Modal.ts`, `Dropdown.ts`, `NativeSanitizer`, the `Placement` arrow).
- Round-2 brief item A names a `#### Placement` guide section that does not exist. The writer reported this.

## Verdicts

1. **CONFIRMED.** Checked against `src/browser/Tooltip.ts`, the constructor, around lines 139–247.
   - Order: host guard, then `resolveVocabulary` over the three groups under `TOOLTIP_OPTION_INVALID`, then `resolveOptions` over the top keys, the `tip` group, and the `placement` group, using the named parsers. The `descendants` selector is refused. Then the claim, `bindEventMap`, the per-trigger listeners, the closest modal, `#retitle`, and the `signal`.
   - Attack 1: `_fixTitle` parity when `selector` is set. It held: Bootstrap `tooltip.js:127` skips `_fixTitle`, and `Tooltip.ts:224` skips it too.
   - Attack 2: a constructor `delay` or `trigger` partial skips the attribute layer, unlike `placement`. It held: this matches Dropdown's `parseDismiss` whole-group precedent (`parsers.ts:122`), and the guide's attribute table says "unless the constructor supplies it".
   - I ruled the mechanism from source. The EXACT and JOINED readings come from the writer's log, and the Orchestrator's replay settles them.
2. **CONFIRMED.**
   - `buildTip`, `fillSlot`, and `writeContent` in `helpers.ts` match the claim. So does `#build` (around lines 435–460): tokens, id, slots, and the `toggle` listener. So does `#describe` (around 533–543), which removes the attribute when it empties.
   - `NativeSanitizer` sits in `sanitizers/` as R13 (amended) requires.
   - Attack: the guide sentence "Like Bootstrap's sanitizer … removes a `javascript:` URL attribute while keeping its element, and keeps a `data:` URL". It held against `util/sanitizer.js` lines 66, 101, and 110.
   - `Sanitizer` appears only in a comment saying no file names it.
3. **CONFIRMED.**
   - `show` checks after each step, per `#holds` and the door sequence (around lines 281–328).
   - `hide` covers the takeover and the re-show when `#entered` holds (around 330–360).
   - `toggle`, `update`, and `shown` match the claim.
   - Attack: `toggle` against Bootstrap's `toggle`, which routes through `_enter` and `_leave`. The claim's text holds. The difference is a guide omission (F4).
4. **CONFIRMED.**
   - `#over`, `#out`, `#focus`, `#blur`, and `#click` match, and `#inside` reads the related target against the descendant's own host.
   - `#enter`, `#leave`, `#arm`, and `#disarm` match. `#context` excludes `descendants`, `on`, and `signal` and constructs with the container's signal.
   - Attack: the descendant options leave out the container's attributes. It held as a recorded departure (guide around line 2512).
5. **CONFIRMED.**
   - The modal listener, `destroy` ordering, the `#retitle` abort check, and `#dismiss` all match (around 560–568). The re-promote condition reads `this.#tip === tip && this.shown && !:popover-open`.
   - The E17 departure is stated at guide around 2366–2371 and 2498–2500.
6. **CONFIRMED for the claim as written.**
   - In `Placement.ts`, `update` (around lines 186–204) writes `position: absolute`, clears the declaration on the other axis, measures, and writes `(clientWidth − width) / 2`. Each write goes through `#write` and the snapshot.
   - Validation includes the arrow, and `#readArrow` passes it. `Dropdown.ts` is not in the status.
   - The red-first readings are writer logs. I ruled the mechanism only.
   - Centring on the tip's own edge is the wrong reference point whenever the tip is not centred on its trigger. That is F2, outside this claim.
7. **CONFIRMED.**
   - `#build` records the original parent and sibling before the first move and keeps originals across moves.
   - `#return` leaves alone an element moved out of its slot, detaches an element that had no parent, and appends when the recorded sibling has moved.
   - `fill` returns the elements of changed slots, a rebuild returns elements not placed, and `destroy` returns all.
   - The guide's content paragraph states this.
   - The added steps' rows are writer log.
8. **UNRESOLVED.** `j-tooltip-mutations-2-orchestrator.log.txt` is absent, as the brief expects. The rest held on my reading:
   - The tables are frozen and placed in their kind files, and the barrel adds both lines.
   - The `types.ts` hunks stay within the granted declarations.
   - `#### Tooltip` follows `#### Toast` with the named paragraphs and tables.
   - The fence imports `@orkestrel/veneer/browser`, and the plugin row reads `shipped` with its proof path.
   - The status lists only owned files, and `as const` is permitted (`typescript.md:29`).
   - The gate counts are the Orchestrator's own log (established, not re-run).

## Findings outside the claims

**F1 — The vocabulary proof R17 (amended) requires is missing.**
- **Where:** `tests/src/browser/Tooltip.test.ts`. The only group input is the refusal case, around line 1009 (`classes: { shown: 'is shown' }`), which throws before any write. No case constructs with replaced `classes`, `attributes`, or `selectors`. `j-tooltip-mutations-2.log.txt` has no "the group is ignored" row.
- **Why it matters:** R17 (amended) requires one such case per entity. Every landed sibling has it: `Toast.test.ts:643`, `Dropdown.test.ts:598`, `Modal.test.ts:743`, `Collapse.test.ts:578`, `Tab.test.ts:593`, `ScrollSpy.test.ts:487`, `Carousel.test.ts:1974`, `Alert.test.ts:267`. Without it, nothing distinguishes a write site that reads `TOOLTIP_CLASSES` or `TOOLTIP_SELECTORS` directly from one that reads `this.#classes` or `this.#selectors`. The affected sites are `#build`'s `shown`, `fade`, and `auto`; the `modal` lookup; `#readArrow`; the `side` attribute; and the content key.
- **What right looks like:** add a case titled "writes, tests, reads, and matches only the replacing values when every group is replaced". Replace every key in all three groups: the tokens written on the tip, the `modal` ancestor, each declared attribute read, the `side` attribute written, and the title and arrow slots. Assert that only the replacing values appear. Add the instrument row "the group is ignored".

**F2 — The arrow points at the tip's centre, not the trigger's.**
- **Where:** `src/browser/Placement.ts`, `update` (around lines 199–203). The offset is `(this.#element.clientWidth − size.width) / 2`, and no reference geometry is read.
- **Why it's wrong:** `PlacementInput.arrow` (`types.ts:542`) describes the arrow as the element "that points at the reference". The guide (around line 2362) says the placement centres it "where Popper's arrow modifier wrote its position", and Popper points the arrow at the reference's centre.
- **Vector:** `new Tooltip(narrowTrigger, { title: 'A longer tooltip text', placement: { position: 'top-start' } })`. `PLACEMENT_AREAS['top-start']` is `top span-right` (`constants.ts:269`), which aligns the tip's start edge with the trigger, so the arrow lands at the tip's centre, away from the trigger.
- **Reachability:** the unit's own `parsePosition` admits `-start` and `-end` from `data-bs-placement`. The arrow case covers only the four centred sides.
- **Evidence:** this finding comes from reading the source. The run is referred to the objective lane (OR1).
- **What right looks like:** compute the offset along the edge from the trigger's centre relative to the tip's box: `ref.left + ref.width/2 − tip.left − tip.clientLeft − size.width/2`, and the vertical analogue. Clamp it to `[0, clientWidth − size.width]`. Add a `top-start` case.

**F3 — `#entered` has a third state that no code reads.**
- **Where:** `src/browser/Tooltip.ts`. It is declared `boolean | undefined` (around line 126), and `hide` sets it to `undefined` (around 341). Every read is `=== true` or `!== true` (around 355, 642, 648, 658).
- **Why it's wrong:** `undefined` and `false` never behave differently. The field comment describes a distinction that does not exist, which breaks the "Real domain states only" law in `AGENTS.md`.
- **What right looks like:** make it a `boolean` that `hide` sets to `false`, and delete the "undefined after a hide" clause from the comment. Behaviour does not change.

**F4 — The guide's contract misstates or omits two departures.**
- **Omission (guide around line 2319):** `toggle()` shows or hides at once, ignoring `delay` and the active-trigger record. Bootstrap's `toggle` goes through `_enter` and `_leave` (`tooltip.js:158–169`), so it waits the delay and keeps a tip that focus holds. The departure list (around line 2480) does not mention this. A consumer moving from Bootstrap with `delay: 500` gets an immediate toggle.
- **Wrong fact (around line 2508):** the guide says "A `title` option that resolves empty leaves the title slot empty." In the code, `title: ''` wins over the fallback (`Tooltip.ts:226`), `#filled` reads it as no content, and `show` resolves `false`. The tip never shows with an empty slot.
- **What right looks like:** add a departure bullet for `toggle`. Rewrite the empty-title bullet to say the tooltip has no content and refuses to show, unless another slot has content.

**F5 — The origin record uses a positional tuple with two names for one field.**
- **Where:** `src/browser/Tooltip.ts`. `#origins` (around line 130) is `readonly [Node | null, Node | null, Node | null, string]`. `#build` writes it as `[parent, sibling, …]` (around 448–453), and `#return` reads it as `[parent, next, slot, selector]` (around 480).
- **Why it's wrong:** three positions share a type, so swapping them compiles, and one datum carries two names, which breaks "one concept, one term".
- **What right looks like:** use an inline readonly object type `{ parent, sibling, slot, selector }` and the same name at both sites.

## Attacked and held

- **Click toggle and light dismiss:** a second click on a click-trigger tooltip could close the tip on pointer-down and then reopen it on click. The case at `Tooltip.test.ts` around lines 835–836 asserts that it hides.
- **`update`:** its one-line forward is not a wrapper violation. It is an interface member, as in Dropdown.
- **Class names and imports:** `NativeSanitizer`, `isSanitizeTarget`, `SANITIZER_UNSUPPORTED`, and `TIP_TEMPLATE_INVALID` fit their forms.
- **Public helpers:** `buildTip`, `fillSlot`, and `writeContent` justify being public; the guide states you can build a tip with them.
- **Allowlist:** the `SANITIZER_ALLOWLIST` ARIA list covers WAI-ARIA 1.2 plus the 1.3 additions.
- **R9:** `boundary` and `popperConfig` are recorded as excluded.
- **R11:** no `data-bs-config` is read, and `animated`, `tip`, `delay`, `trigger`, and `placement` are grouped as R11 names.
- **R12:** member names hold.

## Referrals

**To the objective lane:**
- **OR1:** run F2's vector: a 30 px trigger, a long title, and `top-start`. Measure the arrow's centre against the trigger's centre.
- **OR2:** two tooltips whose `hide.vn.tooltip` listeners both prevent can loop. B shows and the platform closes A. A's hide is prevented, so A promotes again and the platform closes B. B's hide is prevented, so B promotes again, and so on through `#dismiss` (around lines 560–568) with no bound.
- **OR3:** the "the default offset is zero" row reddens only the constants-table assertion, which restates the constant. No behavioural case measures the default 6 px distance.
- **OR4:** two problems in `#context` (around lines 572–591):
  - It constructs a descendant's tooltip inside the container's listener, so a descendant whose own attribute fails coercion, such as `data-bs-trigger="press"`, throws out of the listener on every interaction.
  - A tooltip a consumer constructed on a descendant, with its own triggers, is driven twice: by its own listeners and by the container's.
- **OR5:** the mutation binding for F1's case.

**To the Orchestrator:**
- **ORC1:** R12 and routing for J-POPOVER.
  - The routing table gives J-POPOVER `Popover.ts` only.
  - `Tooltip.ts` hardcodes `TOOLTIP_EVENTS` and `TOOLTIP_DEFAULTS`, the `TOOLTIP_*` error codes, the `vn-tooltip-` id prefix, and `isTooltipEvent`.
  - The shared static `Tooltip.#registry` would make a popover and a tooltip on one host collide on `TOOLTIP_HOST_OWNED`; Bootstrap keeps one data key per class.
  - `#context` constructs with `new Tooltip`.
  - A `new.target` profile seam therefore needs `Tooltip.ts`. Either grant it to J-POPOVER or run a seam unit first.
  - The inherited `PopoverSelectorMap.arrow` default (`.tooltip-arrow`) is the carried mirror.
- **ORC2:** the dispatch defects stated at the top.
- **ORC3:** `Placement` has no guide home of its own. Its mechanism is described in `#### Dropdown` (around line 1503) and its arrow in `#### Tooltip`.

## Bounds

These are wording or minor items, not blocking.
- **`#context`:** a noun used as a method name. Dropdown's `#position` is a precedent. `#acquire` would match `Delegate`'s "acquires".
- **`#describe`:** collides with the project-wide `describe*` helper meaning.
- **`#parent`:** holds what the option and guide call the "container".
- **`#return`:** the method is named with a JavaScript keyword.
- **`parsePosition`:** its inline list (`parsers.ts` around line 311) repeats the keys of `PLACEMENT_AREAS`.
- **`parseFallbacks` and `parseThreshold`:** both repeat the comma-or-JSON list reading.
- **`TooltipInterface.show`:** its `@returns` omits the inline `display: none` refusal that `fill` lists. `types.ts` says "transition in flight" where the guide and E15 say "change in flight".
- **`TooltipOptions.title`:** its "Default: the trigger's `title` attribute" is not true for a container that sets `descendants` (a J-TYPES sentence).
- **`TOOLTIP_DEFAULTS` type:** its inline composite type and `#delay` repeat a shape that Dropdown names as `DropdownDefaults`. Carrier: J-POPOVER.
- **`static #count` and `#identify`:** these do the job R15's `generateId` names.
- **`aria-*` limit:** it sits only in the sanitizer paragraph, not in the departure list.
- **Case title:** "Bootstrap attributes and selector" is singular, but there are two selectors after the arrow was added.

VERDICT: FAIL 8; outside the claims: F1, F2, F3, F4, F5
