# J-TYPES audit round 6 — the subjective lane's verdict (returned 2026-09-23 by `reviewer` on Opus 5.5, native subagent, 44 tool uses, 410 s; retained from the subagent's return text)

**Lane: subjective**, held by `reviewer` on Opus 5.5 (alias `opus`, native subagent). Opus 5.5 wrote these rounds and the round-5 subjective verdict they answer, so I attacked both harder for that reason.

Subject: `C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts` and `C:/Users/mikes/WebstormProjects/veneer-types/guides/veneer.md`, read against `j-types-7.diff`. Line numbers are approximate; find each site by its symbol.

## Numbered verdicts

1. **BROKEN.** The tooltip half holds; the `parent` sentence states a fact that both the same file and Bootstrap contradict.
   - **Site:** `ScrollSpySelectorMap.parent` (around line 975) says "the tracked links are the host's `[href]` links, which `link` reports".
   - **What the same file says:**
     - `ScrollSpyInterface.host` is "the scrolling element" (around line 1011).
     - `ScrollSpyInterface.target` is "the navigation whose links follow the scroll" (around line 1013).
     - `ScrollSpySelectorMap.host` selects the scrolling elements.
   - **What Bootstrap does:** it finds the tracked links in the target, not the host: `SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target)` (`scrollspy.js:205`), with the click listener on `this._config.target` (`:135`).
   - **Failing state:** take `<main data-bs-spy="scroll" data-bs-target="#toc">` with `#toc` outside `main`. Following the TSDoc, a consumer expects `main`'s own `[href]` anchors to be tracked. The engine tracks `#toc`'s links instead.
   - **Second problem:** "which `link` reports" puts the removed key's name, as a bare code token, inside its successor's TSDoc. It also claims the getter reports all the tracked links, when it reports only the active one.
   - **Smallest fix:** "…; the tracked links are the target's `[href]` links, and the `link` getter reports the active one. Default: …". Apply the same change to the claim wording.
   - **Tooltip half, attacked and held:** `TooltipClassMap.auto` and `PopoverClassMap.auto` now say "Marks every tip whatever `placement.position` names". `tooltip.js:313` adds `` `bs-${NAME}-auto` `` unconditionally in `_createTipElement`.
   - **Stale citation in the claim:** there is no `_getBasicClassPrefix` in 5.3.8's `tooltip.js`. A grep for it returns nothing, and the write is at `:313`. This does not affect the TSDoc.
   - **Held:** `ScrollSpyInterface.link` is still the getter (around line 1015).

2. **BROKEN.** The claim says no selector default carries another key's token. One does.
   - **Site:** `CarouselSelectorMap.image` has the default `.carousel-item img` (around line 1927). That embeds `CarouselSelectorMap.entry`'s `.carousel-item`.
   - **Rule it breaks:** the amended membership rule, "a member carries only the part no key of the entity names" (`j-engine-shape-verdict.md`, around line 9). Bootstrap's source is `SELECTOR_ITEM_IMG = '.carousel-item img'` (`carousel.js:60`), read at `:220`.
   - **Failing input:** `new Carousel(host, { selectors: { entry: '.slide-panel' } })` over items that carry `.slide-panel` and not `.carousel-item`. The carousel moves between `.slide-panel` items. The drag refusal still queries `.carousel-item img`, finds nothing, and leaves item images natively draggable during a pen swipe.
   - **Why it slipped:** the Orchestrator's grep covered three patterns and no composite built with a descendant combinator. Round 5's F1 sweep, my own engine's, missed it too.
   - **Smallest fix:** give `image` the default `img` with the TSDoc "Selects the images inside the items, whose native drag the carousel refuses; the engine matches `:is({entry}) :is({image})`. Default: `img`."
   - **What held:** the four F1 compositions, with every default substituted, match exactly what Bootstrap's constants match:
     - `:is([data-bs-toggle="dropdown"]):not(.disabled, :disabled)` equals `dropdown.js:55`.
     - `:is(.dropdown-menu) :is(.dropdown-item):not(.disabled, :disabled)` equals `:60`.
     - `:is(.nav-link, .list-group-item, [role="tab"]):not(.dropdown-toggle)` equals `tab.js:47`, and appending `, {trigger}` gives `:49`.
     - `:is({fixed}, {sticky})` equals `util/scrollbar.js:16`.
   - **`sticky` sentence:** it matches `scrollbar.js:43-44`. Sticky elements are in the padding set and also take the margin.

3. **CONFIRMED.**
   - **Attack:** I grepped `types.ts` for every backticked class-map default and every `data-*` name outside a "Default:" sentence.
   - **Result:** every remaining hit is one of these:
     - a "Default:" sentence on a map key;
     - an attribute value (`next` or `prev`);
     - a name no map replaces (`aria-modal`, the native `title`, `--bs-position`);
     - the `PopoverOptions` `@remarks`, which lists Bootstrap's defaults (held under the claim's identification exception).
   - **Getters and methods:** all seven `shown` getters, `TabInterface.active`, `ButtonInterface.pressed` and `destroy`, `BackdropInterface.show` and `hide`, and `SwipeInterface.destroy` use the token language.
   - **Key language:** `PlacementSide`, `PlacementInterface.update`, `PlacementOptions.static`, `DropdownOptions.placement.static`, and `PopoverOptions.content` name the key.
   - **Guide cells:** the matching cells follow (diff rows around lines 211 and 213, and the Methods tables for `ButtonInterface`, `BackdropInterface`, `PlacementInterface`, and `SwipeInterface`).
   - **Proof mutation:** reverting any `shown` getter to "carries the `show` class" gives a hit on the criterion-3 grep, and reverting `PlacementInterface.update` adds a non-Default `data-popper-placement` hit to the E30 grep. Both instruments tell the two states apart.
   - **Wording:** the pronoun in "its `X` key" is a bound (B1).

4. **CONFIRMED.**
   - **Probe:** the Orchestrator's run (`j-types-gates-6.log.txt`, criterion-4 block) refuses probe lines 12 to 15 once each (TS2353, TS2561, TS2353, TS2353) and reports nothing for lines 18 to 21.
   - **Control:** the same run shows the instrument failing on the negative lines, so it can fail.
   - **Proof mutation:** restoring `readonly selector?: string` removes the line-13 TS2561, and restoring `link` beside `parent` removes the line-12 error. Either change leaves the log with three refusals, so the probe tells the two states apart.
   - **Source:**
     - `TooltipAttributeMap.descendants` has the default `data-bs-selector`, and no `selector` member remains (around lines 1347–1374).
     - `CarouselAttributeMap.step` exists, and `CarouselClassMap.slide` stays (around lines 1890 and 1906).
   - **Subjective attack:** I checked whether `descendants` reads as an element collection rather than a selector string. The TSDoc says "matching this selector", and the pair no longer pluralizes into `selectors`.
   - **Result:** `step` reads as the fact beside `next()`, `previous()`, and `slide(index)`.

5. **CONFIRMED.** I ruled this from source.
   - **The overlay side:** the Backdrop description and its `host`, `shown`, and `fade` leaves say that the overlay passes its `backdrop`, `shown`, and `fade` tokens.
   - **The overlay's leaves:** `ModalClassMap.shown`, `fade`, and `backdrop`, and `OffcanvasClassMap.shown`, `backdrop`, and `fade`, say "receives it as the backdrop's `…` token".
   - **Result:** both sides describe the same mapping.
   - **Offcanvas fade:** `OffcanvasClassMap.fade` matches `offcanvas.js:183` (`isAnimated: true`) and `util/backdrop.js:115-116`.
   - **Scroll lock and `modal-open`:** `ScrollLockClassMap` and `ScrollLockOptions.classes` are gone, and `ScrollLockInterface.destroy` no longer names the open token. The only `modal-open` writers are `modal.js:116` and `:253`, which `ModalClassMap.open`'s sentence matches.
   - **Attack held:** Offcanvas's `fade` marks only the backdrop, while Modal's marks the modal and its backdrop. Each leaf states its own referent, and one override has the same effect on the backdrop in both.

6. **BROKEN.**
   - **Site:** `PopoverOptions`' description reads "…the tooltip options, a body slot, the popover vocabulary, and the popover defaults." (around line 1568; guide row around line 287).
   - **Why it breaks the claim:** `PopoverOptions` carries `classes`, `attributes`, and `selectors` groups, so the claim's "every options interface … names 'markup vocabulary'" is false for it.
   - **Failing reading:** "popover vocabulary" can be read as a term separate from the markup vocabulary every sibling names, which breaks "one concept, one term".
   - **Smallest fix:** "Configures a popover: the tooltip options, a body slot, the popover's markup vocabulary, and the popover defaults.", with the guide cell following.
   - **What held:**
     - all twelve `{Entity}EventMap` descriptions, plus `EventHooks` and `EventWire`, read verb-to-event;
     - `DropdownDetail`, `CarouselSelectorMap.entry`, and `PopoverClassMap` carry the fixed sentences;
     - `BackdropOptions`, `PlacementOptions`, `SwipeOptions`, `ColorModeOptions`, and `ScrollLockOptions` name "markup vocabulary";
     - the changed Summary cells equal their description paragraphs (the diff's rows, and `test:guides` 19/19 in the Orchestrator's run).
   - **`dataAttributes` evidence:** see referral R2.

7. **UNRESOLVED.** I ruled this from source.
   - **What checks out:** the line citations in both rows resolve: `offcanvas.js:267`, `:111`, and `:147`, and `scrollbar.js:79`, which writes `data-bs-overflow`, `data-bs-padding-right`, and `data-bs-margin-right` through `Manipulator.setDataAttribute`.
   - **Where the reasoning gaps:** "every panel that query finds has a live owner" holds only for panels whose `aria-modal` Bootstrap's own `show` wrote. Authored markup such as `<div class="offcanvas-lg show" aria-modal="true">` is also found by the document-wide query, and Bootstrap then calls `getOrCreateInstance(element).hide()` on it (`:269`). A registry walk skips that panel.
   - **What remains open:** the claim's completeness clause needs the full source walk the objective lane owns.
   - **What would settle it:** the objective lane rules on whether an authored-`aria-modal` panel the engine never constructed is in scope, and completes the walk. See referral R3.

8. **CONFIRMED.**
   - **Status:** the status file lists exactly `guides/veneer.md` and `src/browser/types.ts`.
   - **Gates:** in the Orchestrator's own run, after round 7 (15:22:33 against round 7's 15:21:48), every named gate exits 0: `test:guides` passes 19 of 19, and `test:policy` passes 109 with 1 skipped.
   - **Surface rows:** there is no `ScrollLockClassMap` row, and a grep of the guide for it returns nothing.
   - **Methods cells:** the changed cells for `ButtonInterface`, `BackdropInterface`, `PlacementInterface`, and `SwipeInterface` equal their TSDoc.
   - **Added lines:** they carry no `any`, `as` assertion, `!`, `@ts-`, `eslint-disable`, `null`, `public`, `protected`, `private`, or `import`. Each added property (`parent`, `fade`, `descendants` twice, and `step`) is `readonly`.
   - **Old names:** a grep of the worktree for `ScrollLockClassMap`, `selectors.link`, and `attributes.slide` finds no surviving name. The `.selector` hits are CSS test files unrelated to the tooltip option.
   - **Proof mutation:** deleting a Surface row makes `findDrift` report the undocumented export, so `test:guides` tells the two states apart.

## Findings outside the claims

None. Each defect I substantiated sits under claim 1, 2, or 6.

## Rulings on the brief's Unknowns

- **The brace form:** the composition sentences read as the rule the engine applies, not as a literal selector.
  - Most sentences start with "the engine matches".
  - `.{disabled}` marks a class-key placeholder, while `{menu}` and `{entry}` mark selector keys.
  - Each Dropdown sentence says which group supplies `disabled`.
  - ScrollLock's sentence lacks the "engine matches" opening (B9).
- **The renamed keys:** `parent`, `descendants`, and `step` each read as the fact they name without Bootstrap's vocabulary. The trailing Bootstrap constant names add nothing a consumer can use (B2).
- **The pass-through sentences:** they say the same thing from each side (claim 5).

## Attacked and held

- **Tab's shared token:** `TabSelectorMap.link` and `wrapper` both list `.list-group-item`. They are independent alternatives, not a composite: Bootstrap lists the token separately in `SELECTOR_OUTER` and `SELECTOR_INNER` (`tab.js:46-47`), and deriving either from the other would be wrong.
- **Carousel naming:** "entries" in `CarouselSelectorMap.entry` beside "items" everywhere else is the minimal bridge. `item` is a rejected generic word in `names.md`.
- **Popover's template remarks:** `PopoverOptions` `@remarks` names `.popover-header` and `.popover-body` while listing Bootstrap's defaults. This is identification of default markup, not a behaviour claim.
- **`EventHooks` against `EventWire`:** both now state the verb-to-event direction.

## Referrals (to the objective lane)

- **R1:** `TabSelectorMap.link`'s TSDoc says the engine matches `:is({link}):not({toggle})` on its own, and the `SELECTOR_INNER_ELEM` form as well. In 5.3.8, Bootstrap reads only `SELECTOR_INNER_ELEM` (`tab.js:180`, `:259`); `SELECTOR_INNER` appears only inside its definition (`:49`). Rule whether the contract names a matching site that has no Bootstrap counterpart, which would invite an implementing unit to invent one.
- **R2:** Probe 4 (`j-types-4-probe-sanitizer-4.log.txt`) supports only the "kept when `attributes` is absent" clause of `SanitizerConfig.dataAttributes`. The "dropped when `attributes` is given" and "a listed `data-*` name is kept either way" clauses rest on a cited standard, not a run. Two `setHTML` calls over `data-x` and `data-y` would settle both: `{ elements: ['b'], attributes: ['title'] }` and `{ elements: ['b'], attributes: ['title', 'data-x'] }`.
- **R3:** For claim 7, rule on the authored-`aria-modal` panel (`offcanvas.js:267-269`), and on the completeness clause.

## Bounds

- **B1 — pronouns:** "its `side` key", "its `popper` key", and "the trigger's attribute its `content` key names" read as though the key belongs to the element or the trigger. The file already uses a path form (`placement.position`, `dismiss.backdrop`); `attributes.side`, `attributes.popper`, and `attributes.content` would remove the ambiguity.
- **B2 — Bootstrap constants:** `SELECTOR_LINK_ITEMS` and `SELECTOR_INNER_ELEM` are private Bootstrap constants a consumer cannot see, and each is a code token with no following noun. State the fact instead, for example "for the sibling triggers the arrow keys move between".
- **B3 — table width:** `BackdropClassMap`'s long description widened the whole § Surface table, which is why the guide diff re-pads every row. Each leaf already states the pass-through.
- **B4 — two idioms:** the token language uses "its shown token" in some places and "its `shown` token" in others. "pressed token membership" is awkward.
- **B5 — `parent`:** `parent` means a container on `CollapseOptions` and `BackdropOptions`, and a preceding link on `ScrollSpySelectorMap`. Nothing collides inside ScrollSpy, and the Orchestrator ruled the name.
- **B6 — `EventWire`:** "the wire name the bubbling DOM event it names carries" nests two relative clauses and does not read on the first pass.
- **B7 — "placement token":** `PopoverClassMap`'s "placement token" sits beside a leaf that says the token does not vary with placement. "arrow-placement token" would hold both.
- **B8 — Backdrop naming:** `BackdropClassMap.host` marks the element that `BackdropInterface` exposes as `element`. This predates these rounds.
- **B9 — ScrollLock framing:** `ScrollLockSelectorMap.fixed`'s composition lacks the "the engine matches" opening its sibling sentences use.

VERDICT: FAIL 1, 2, 6, 7; outside the claims: none
