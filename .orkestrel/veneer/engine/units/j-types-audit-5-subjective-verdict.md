# J-TYPES audit round 5 — the subjective lane's verdict (returned 2026-09-23 by `reviewer` on Opus 5.5, native subagent; retained from the subagent's return text)

**Lane: subjective**, held in full by `reviewer` on Opus 5.5 (alias `opus`, native subagent). Opus 5.5 wrote the work under audit, so I attacked it harder for that reason.

Subject: `C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts` and `C:/Users/mikes/WebstormProjects/veneer-types/guides/veneer.md`, read in the worktree against `j-types-5.diff`. Line numbers are approximate; find each site by the symbol named.

## Numbered verdicts

1. **CONFIRMED.**
   - **Attack:** I searched both files for any surviving `Snapshot*` name, alias, or row.
   - **Result:** In `types.ts`, the only matches are the `HostSnapshotCategory`, `HostSnapshotTarget`, and `HostSnapshotInterface` declarations and references (around lines 208–233). In the guide, the only matches are rows 48–50 and the heading `#### \`HostSnapshotInterface\`` (around line 225).
   - **Proof mutation:** reintroducing `export type SnapshotCategory = HostSnapshotCategory` would add a line to the Orchestrator's criterion-3 grep. That grep therefore separates the two states.

2. **CONFIRMED.**
   - **`.vn.` names:** every `{Entity}EventMap` member names its `.vn.` event.
   - **Cancelable wording:** pre-change keys read "whose prevention refuses …". Completed keys read "…; it is not cancelable", including `ButtonEventMap.toggle`, `ScrollSpyEventMap.activate`, and both `prevent` members.
   - **`DropdownDetail`:** it is `{ readonly click: MouseEvent | undefined }`. Its description names the toggle as the event's target. The Tab, ScrollSpy, Modal, Offcanvas, and Carousel detail types keep `relatedTarget`.
   - **Old wording:** a search for `hydrate|mirrored|own property|\.bs\.|clickEvent|hidePrevented` in `types.ts` returns nothing.
   - **Subjective attack on `prevent`:**
     - The risk: a consumer might read the `prevent` event as firing whenever a listener prevents `hide`.
     - Why it held: the member's TSDoc scopes it to "a static backdrop or a disabled Escape refuses a hide". The `DismissOptions` leaves say "dispatches the `prevent` event". The word matches the Mailbox and Elements prior art the reconciliation cites.
   - **Proof mutation:** changing the `EventWire` template back to `` `${TKey & string}.${string}` `` makes probe lines 16 and 22 compile. The log would then lose its two TS2322 lines, so the probe separates the two states.

3. **CONFIRMED.**
   - **Structure:** every entity and mechanism in the mapping table declares its maps. Each group is `Partial<…>` and carries the "read from the constructor alone; an absent key keeps its default" sentence. `BackdropOptions.classes` replaces `class`. The Popover maps extend the Tooltip maps, and `PopoverOptions` overrides the inherited groups.
   - **Literal exception:** `DropdownClassMap.center` is a nested object, not a `readonly string`, and carries no Default of its own; its two leaves do. I read "each key" as each leaf, because claim 4 carries that nesting as ruling R10 (bound B1).
   - **Ruling on the Unknown, `Pick` groups against one `Pick`-free vocabulary type:** the `Pick` groups are the right shape.
     - Each `Pick<{Entity}Options, …>` has one source, so a map change reaches the delegate group with no second declaration to drift.
     - A shared vocabulary type would put Tooltip's slot keys on Button, which the reconciliation already refused.
     - The spread form `new Collapse(panel, { ...vocabulary.collapse, parent })` reads cleanly.
     - The Button group omits `attributes`, and Button has no attribute map, so the two agree.
     - A shortfall I considered and accepted: `DelegateOptions` cannot hold the Tooltip, Popover, or ColorMode vocabulary. Those entities are not routed, so the delegate object is the vocabulary of the routed entities only. That is consistent with routing, not a defect.

4. **BROKEN.** Two keys fail § Question 1's key rule: a key names the fact its token marks, and shares a word with a getter or option only when both mean the same fact.
   - **`ScrollSpySelectorMap.link`** (around line 984) collides with the `ScrollSpyInterface.link` getter (around line 1023).
     - The getter reads "the active link", one of the target's `[href]` links. Bootstrap tracks those through `SELECTOR_TARGET_LINKS = '[href]'` (`scrollspy.js:32`, `:205`).
     - The key's default, `.nav-link, .nav-item > .nav-link, .list-group-item`, is used only by `_activateParents` (`scrollspy.js:247`) to find the parent links before a nested list.
     - Failing input: a consumer with custom markup sets `selectors: { link: '.menu-link' }`, expecting the tracked links to follow. Tracking still runs on `[href]`, and only parent activation changes.
     - Fix: rename the key to `parent`: "Selects the parent links that precede a nested list and turn active with a link inside it. Default: `.nav-link, .nav-item > .nav-link, .list-group-item`." ScrollSpy has no other `parent` member.
   - **`TooltipClassMap.auto`** (around line 1347), and `PopoverClassMap.auto` (around line 1556), collides with the `'auto'` member of `PlacementPosition` (around line 370), which `TooltipOptions.placement.position` accepts.
     - Bootstrap writes `bs-${NAME}-auto` on every tip, whatever the placement (`tooltip.js:313`).
     - Failing input: a consumer who reads `classes.auto` beside `placement: { position: 'auto' }` predicts a class written only for automatic placement. That prediction is false.
     - Smallest fix: keep the key and add "written on every tip, whatever `placement.position` names" to both TSDoc sentences. Alternatively, rename the key to the fact it marks and match the guide's own row wording (see B5). The Orchestrator chooses.
   - **What held in this claim:**
     - `transition`, for `collapsing` and for Toast's `showing`: names the phase, collides with no getter, and R11's split from Offcanvas's `showing`/`hiding` is sound.
     - `entry`, for `dropdown-item`: `DropdownSelectorMap.entry`'s TSDoc says "menu entries", which matches.
     - `wrapper`: Tab has no competing member.
     - The nested `center` group (R10): `classes.up` and `classes.center.up` read unambiguously, and the one-word leaves obey `names.md` § Group options by entity.
     - R1 to R3, R5 to R7, R9, R12, and R13 follow the membership rules. R5 was checked against source: `tab.js:231` tests `CLASS_DROPDOWN` with `classList.contains`, and `scrollspy.js:239` matches `SELECTOR_DROPDOWN` with `closest`, so the kinds follow use.
     - Defaults and R8 belong to the objective lane (see Referrals).

5. **CONFIRMED.**
   - **Port shape:** `write(element: Element, html: string): void` is one verb, and its TSDoc states the synchronous replacement, the propagation of a failure, and that neither argument is retained, with an `@example`.
   - **Adapter options:** `NativeSanitizerOptions.config` states both the absence case and the empty-dictionary case. `config` is the spelling `names.md` § Rejected naming prescribes.
   - **Tooltip option:** `TooltipOptions.sanitizer` uses the dictated sentence and names no class. A search for `\bSanitizer\b|NativeSanitizer\b|SANITIZER` returns nothing.
   - **Deletions and corrections:** `SanitizeOptions` and `SanitizeAllowlist` are gone from both files. The `attributes` and `SetHTMLOptions` defaults match probe 4 (`j-types-4-probe-sanitizer-4.log.txt`: no options keeps `title` alone; an empty dictionary keeps every attribute but `onclick`). The listed-`data-*` sentence follows the standard, which round 4's reconciliation made the authority.
   - **Attack:** I looked for a second write path or for the port leaking the native adapter. Neither exists.

6. **CONFIRMED.** Evidence is the Orchestrator's run (`j-types-probe-5.log.txt`), not the writer's report.
   - **Refusals:** the log shows exactly five refusals, at probe lines 16, 22, 27, 28, and 29, and every acceptance line compiles.
   - **Source:** `CollapseOptions` (around line 620) has no `toggle`. `animated` is present on `TooltipOptions` (around line 1391) and `ToastOptions`. `ButtonOptions.signal` is present (around line 69). A search for `data-bs-config` in `types.ts` returns nothing.
   - **Proof mutation:** restoring `readonly toggle?: boolean` removes the TS2353 at probe line 28. Removing `CollapseOptions.classes` adds a diagnostic at line 38. The probe separates both.

7. **CONFIRMED.**
   - **Gates:** the gates and status are the Orchestrator's own run (`j-types-gates-5.log.txt`).
   - **Rows:** I walked every added export against § Surface rows 10–161, and each has one row.
   - **Methods tables:** `#### \`HostSnapshotInterface\`` and `#### \`SanitizerInterface\`` match their call-signature members.
   - **Voice:** the new rows keep one pattern ("Names the … a … writes/reads/matches with; its/each default is …").
   - Guide sentences that the contract contradicts are finding F2. Wording is in the Bounds.

8. **CONFIRMED.**
   - **The two sentences:** `SanitizerConfig.attributes` (around line 532) and `dataAttributes` (around line 534) carry the corrected statements.
   - **B4:** "the subset of the dictionary the engine supports" appears at both mirrors (around lines 511 and 527).
   - **Search:** `safe baseline|tip sanitizer` returns nothing in either file.

## Findings outside the claims

- **F1 — Four composite selector defaults embed another key's default, so one token has two homes and an override does not follow it.**
  - Where:
    - `DropdownSelectorMap.trigger` (around line 743) has the default `[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)`. It embeds `DropdownClassMap.disabled` (around line 708).
    - `DropdownSelectorMap.entry` (around line 749) has the default `.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)`. It embeds `menu` (around line 745) and `disabled`.
    - `TabSelectorMap.link` (around line 890) embeds `TabSelectorMap.toggle` (`.dropdown-toggle`, around line 892) three times.
    - `ScrollLockSelectorMap.fixed` (around line 335) embeds `ScrollLockSelectorMap.sticky` (`.sticky-top`, around line 337).
    - Bootstrap source: `dropdown.js:55` and `:60`, `tab.js:47`, and `util/scrollbar.js:16-17`.
  - What goes wrong: with `classes: { disabled: 'is-off' }`, the `trigger` selector still refuses `.disabled` toggles and routes `.is-off` toggles, while the `disabled` key's TSDoc promises that a disabled toggle "neither opens nor closes its menu". This breaks `AGENTS.md` § Design laws "Derive state" and the reconciliation's intent that selectors built from the entity's own tokens are derived rather than stored.
  - What right looks like: each member carries only its foreign part, and the engine composes the rest from the resolved keys with `:is()` and `:not()`, as the Chromium floor allows:
    - `trigger: '[data-bs-toggle="dropdown"]'`, with `:not(.{disabled}):not(:disabled)` derived;
    - `entry: '.dropdown-item'`, composed as `{menu} :is({entry}):not(.{disabled}):not(:disabled)`;
    - Tab `link: '.nav-link, .list-group-item, [role="tab"]'`, with `:is({link}):not({toggle})` derived;
    - ScrollLock `fixed: '.fixed-top, .fixed-bottom, .is-fixed'`, with the padding set derived as `:is({fixed}, {sticky})`.
  - Each TSDoc must state the composition. The shape verdict's membership rules must gain the sentence "a composite selector's own-token part is derived", because they cover selectors built only from own tokens.

- **F2 — Unchanged sentences state fixed class tokens that the same file makes replaceable.**
  - Where, in `types.ts`:
    - "adds / removes the `show` class" on `BackdropInterface.show` and `hide` (around lines 296 and 306);
    - "the `pointer-event` class" on `SwipeInterface.destroy` (around line 471);
    - "carries the `show` class" on the `shown` getters of `CollapseInterface`, `DropdownInterface`, `ModalInterface`, `OffcanvasInterface`, `TooltipInterface`, `PopoverInterface`, and `ToastInterface` (around lines 639, 788, 1141, 1278, 1450, 1599, and 1830);
    - "carries the `active` class" on `TabInterface.active` (around line 917).
  - Where, in the guide: § Methods rows for `BackdropInterface` `show` and `hide` (around lines 242–243) and for `SwipeInterface` `destroy` (around line 263).
  - What goes wrong: under `classes: { shown: 'is-open' }` each of these sentences is false. The unit already rewrote the sibling sentences to token language ("through its fade token" on `BackdropOptions.animated`, and "the body's open token" on `ScrollLockInterface.destroy`), so the rule is applied unevenly. The fixed-token wording is also a marker of the earlier shape, which E6 forbids.
  - What right looks like: "Reads whether the panel carries its shown token", "adds its shown token", "removes its pointer token", and the same form at each site, with the guide cells following. Interface descriptions that identify a component by its default markup, such as "a `.collapse` panel", are identification rather than a behaviour claim, and are excluded.

- **F3 — `TooltipOptions` (and `PopoverOptions`, by inheritance) carries both `selector` and `selectors`, with unrelated meanings.**
  - Where: `selector?: string` (around line 1433) delegates the tooltip to descendants. `selectors?: Partial<TooltipSelectorMap>` (around line 1439) replaces the slot vocabulary. `TooltipAttributeMap.selector` (around line 1377) feeds the first.
  - What goes wrong: a singular/plural pair on one options object tells a consumer that one is a collection of the other. That breaks `names.md` ("A consumer can predict them without documentation") and "One concept, one term". The compiler catches a swapped value, but the reader is still misled.
  - What right looks like: rename the delegation option and its attribute key to a word that does not pluralize into the vocabulary group. For example, `descendants?: string` ("Delegates the tooltip to descendants of the host matching this selector, mirroring Bootstrap's `selector` option") and `TooltipAttributeMap.descendants` with the default `data-bs-selector`. The option name came from R11, so the ruling belongs to the Orchestrator.

- **F4 — An overlay's backdrop writes tokens that the overlay's options give no path to replace.**
  - Where:
    - `BackdropClassMap.host`'s TSDoc (around line 273) names only the backdrop token as passed in by the owning overlay.
    - `ModalClassMap.shown` and `fade` (around line 1076) do not say they also reach the backdrop.
    - `OffcanvasClassMap` (around line 1219) has no `fade` key, yet Bootstrap's offcanvas backdrop is always animated (`offcanvas.js:180-183`, `isAnimated: true`; `util/backdrop.js:115-116` writes `fade`).
  - What goes wrong: E9 makes every class token the engine writes a replaceable default. As declared, a Modal's or an Offcanvas panel's backdrop writes `show` and `fade`, and neither `ModalOptions`, `OffcanvasOptions`, nor `DelegateOptions` reaches them. A later implementing unit would have to invent the pass-through.
  - What right looks like: state the pass-through in the contract. The overlay passes its `backdrop`, `shown`, and `fade` tokens as Backdrop's `host`, `shown`, and `fade`. Say so on the `ModalClassMap.shown` and `fade` leaves and in `BackdropClassMap`'s description, and give `OffcanvasClassMap` a `fade` key with the default `fade`. If the backdrop's tokens are deliberately fixed instead, the contract must say so and record the E9 exception.

## Attacked and held

- **Carousel `classes.start` against `carousel.start()`:** they are different parts of speech inside a named group. `start` and `end` are a logical-side pair consistent with Dropdown's. No one reading them would conflate the two.
- **`host` as a selector key on ScrollSpy but a class key elsewhere:** it names the same fact, the entity's host, in whichever kind the entity uses. ScrollSpy's `selectors.host` matches its `host` getter.
- **Two `up` keys in `DropdownClassMap`:** `classes.up` and `classes.center.up` are unambiguous by path.
- **R4:** Modal's `host: 'modal'` and Tooltip's `modal: 'modal'` give one token a home per entity. That is the per-entity design the reconciliation adopted, not duplication.
- **`PopoverClassMap` extending `TooltipClassMap` and redeclaring `auto` only to change its default:** this is the minimal form.
- **Carousel's routing selector against every other entity's:** Carousel's is derived from `attributes.ride`, while the others store `[data-bs-toggle=…]` as `trigger`. This follows the rule, because `data-bs-toggle` is never read as an attribute.

## Referrals (to the objective lane)

- **R8:** Chrome and Edge on iOS run WebKit. Rule whether E11's "Chromium family" includes them. If it does, the `dropdown.js:145` touch-listener condition that R8 excluded applies again.
- **`center` (R10):** the resolved-table step, the frozen default table, and `isClassToken` validation must each handle the lone nested map value. Rule whether the reconciliation's resolution rules cover it.
- **`SanitizerConfig.dataAttributes`:** its Default says "dropped when `attributes` is given", while the `false` branch says a listed `data-*` name survives. Rule whether the default case keeps listed names too.
- **Scroll lock on Offcanvas:** rule whether the Offcanvas panel's scroll lock writes `ScrollLockClassMap.open` (`modal-open`). Bootstrap's offcanvas never writes it (the only writer is `modal.js:116`), and `OffcanvasClassMap` has no `open` key.

## Bounds

- **B1:** claim 3's "each key a `readonly string`" is false for `DropdownClassMap.center` by design (R10). Word the successor claim as "each leaf".
- **B2:** the key `CarouselSelectorMap.entry` names the carousel's items, while every Carousel sentence calls them "items" ("Selects the carousel's items"). The TSDoc can bridge the two words.
- **B3:** `CarouselAttributeMap.slide` shares its word with `slide(index)` but feeds `next()` and `previous()`. R12's own alignment argument points to `step`.
- **B4:** the key `popper`, on the Dropdown and Placement attribute maps, names a library the engine does not use. I found no fact word that avoids colliding with Dropdown's `static`.
- **B5:** the `PopoverClassMap` row says "the popover's own arrow token" for the `auto` token. The arrow element token (`.popover-arrow`) is excluded under R13.
- **B6:** `ScrollLockOptions` gained "markup vocabulary" in its description, but `BackdropOptions`, `PlacementOptions`, and `SwipeOptions` did not, and `ColorModeOptions` says "attribute name".
- **B7:** `DropdownDetail` says "the toggle that dispatches it". The engine dispatches the event on the toggle.
- **B8:** "Maps each … event to the verb that names it" reads opposite to the map's direction, which runs verb to event.
- **B9:** the § Surface paragraph "the `Delegate` class [is] shaped around Button" (around guide lines 186–190) now contradicts `DelegateOptions`' routed groups. The report names J-BINDER round 2 as the carrier. Confirm that carrier before landing.
- **B10:** the `DelegateOptions` key `scrollspy` and the type prefix `ScrollSpy` case the same term differently.

VERDICT: FAIL 4; outside the claims: F1, F2, F3, F4
