# J-TYPES audit round 8 — the subjective lane's verdict (returned 2026-09-23 by `reviewer` on Opus 5.5, native subagent, 36 tool uses, 365 s; retained from the subagent's return text)

**Lane: subjective.** I held it as `reviewer` on Opus 5.5 (alias `opus`, native subagent). Opus 5.5 wrote this round and the round-6 subjective verdict it answers, so I attacked both harder, including my own round-6 referral R3.

Subject: `C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts` and `C:/Users/mikes/WebstormProjects/veneer-types/guides/veneer.md`, read against `j-types-8.diff`. Line numbers are approximate; find each site by its symbol.

## Numbered verdicts

1. **CONFIRMED.**
   - **Site:** `ScrollSpySelectorMap.parent` (around line 975) carries the E31 sentence word for word.
   - **Source check:** the tracked links are `SelectorEngine.find(SELECTOR_TARGET_LINKS, this._config.target)` (`scrollspy.js:205`). The Default equals the expansion of `SELECTOR_LINK_ITEMS` (`:37`), which `_activateParents` reads at `:247`.
   - **Attack that failed:** I looked for a sentence the same file contradicts. `ScrollSpyInterface.target` is "the navigation whose links follow the scroll", and `ScrollSpyInterface.link` is "the active link". Both agree with the sentence.
   - **Constant names:** a grep of `types.ts` for `SELECTOR_|CLASS_NAME` returns no hit.
   - **Code tokens:** "the `link` getter" is a code token followed by a noun, as `writing.md` requires. `[href]` names no map key, so no key makes it replaceable.

2. **CONFIRMED.**
   - **Carousel:** `CarouselSelectorMap.image` has the Default `img` and states `:is({entry}) :is({image})`. With the defaults this is `:is(.carousel-item) :is(img)`, the same set as `.carousel-item img` (`carousel.js:60`, read at `:220` through `SelectorEngine.find`).
   - **Tab:** `TabSelectorMap.link` states one composition. With the defaults it expands to `:is(.nav-link, .list-group-item, [role="tab"]):not(.dropdown-toggle), [data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]`, which equals `SELECTOR_INNER_ELEM` (`tab.js:49`). The only reads are `:180` and `:259`, and the TSDoc names no first-half-only site.
   - **Sweep:** I checked every `{Entity}SelectorMap` default against the same entity's class and selector keys: Button, Collapse, Dropdown, Tab, ScrollSpy, ScrollLock, Modal, Offcanvas, Tooltip, Popover, Alert, Toast, and Carousel.
     - No default embeds another key's token by compound, by `:not()`, or by a descendant combinator.
   - **Hits I named and ruled outside the claim's forms:**
     - `TabSelectorMap.wrapper` and `link` both list `.list-group-item` as a separate selector-list alternative. Bootstrap lists it separately in `SELECTOR_OUTER` and `SELECTOR_INNER` (`tab.js:46-47`).
     - `ScrollSpySelectorMap.parent`'s `.nav-item > .nav-link` is a combinator inside one key, with no other ScrollSpy key naming `.nav-item`.
     - The attribute values in `[data-bs-dismiss="modal"]`, `"offcanvas"`, and similar are attribute values, not class tokens.

3. **CONFIRMED.**
   - **`PopoverOptions`:** the description (around line 1572) and its guide cell (diff row around line 287) both read "…the popover's markup vocabulary…".
   - **`SanitizerConfig.dataAttributes`:** the Default carries the E35 sentence.
   - **Probe 8 readings (Chromium 153):**
     - `elementsOnly` keeps every attribute.
     - `globalList` and `localListNoGlobal` keep `title` alone.
     - `globalListNamesDataX` and `localListNamesDataX` keep `data-x` and `title`.
     - `localAndGlobal` keeps the locally listed `data-y` beside the global `title`, which supports "kept either way".
   - **Proof mutation:** if the platform kept unlisted `data-*` attributes under an element-local list alone, `localListNoGlobal` would print `data-x` and `data-y`. The `elementsOnly` reading is the control that shows the probe can print that state. The readings tell the two states apart.

4. **BROKEN.** The `types.ts` sentence is present and the registry clause holds. The report's departure attributes to `offcanvas.js:267-269` an effect that code does not have.
   - **What holds:**
     - `OffcanvasInterface.show`'s `@remarks` (around line 1279) carries the E36 sentence.
     - `RegistryInterface` exposes only `claim`, `find`, and `release`.
     - A grep of `types.ts` for `registry|walk|resize` finds only the interface and the remark.
     - Report 8's row says "no document query and no registry walk".
   - **The false departure:** report 8 says Bootstrap's resize handler calls `getOrCreateInstance(element).hide()` on "a panel shown by markup alone", and that the engine departs because such a panel "is not hidden past its breakpoint". Bootstrap does not hide that panel either:
     - `getOrCreateInstance` returns `new this(element, …)` when no instance exists (`base-component.js:65-66`).
     - The constructor sets `this._isShown = false` (`offcanvas.js:69`).
     - `hide()` returns at once when `!this._isShown` (`:129-131`).
     - So `:267-269` hides only panels whose live instance Bootstrap itself showed. That is the same set the engine's per-instance listener covers. A disposed panel gets a fresh instance and is not hidden either.
     - My round-6 R3 carried the same wrong premise, and the round-6 ruling and `plan.md` § Carried findings ("which also reached panels it never showed and panels it disposed") inherited it.
   - **The departures that remain:**
     - The resize handler constructs an instance for a matched panel that has none. This is a side effect, and it hides nothing.
     - The load handler, which no artifact cites, adopts and *shows* every `.offcanvas.show` panel at window load (`offcanvas.js:260-263`). A panel shown in markup at load becomes live in Bootstrap and later hides past its breakpoint.
   - **Why it matters:** the Compatibility row that J-OFFCANVAS lands would publish a behavioural difference that does not exist, and it would miss the one that might.
   - **Right looks like:**
     - Report 8's departure paragraph and `plan.md` row 41 state that `:267-269` hides only panels Bootstrap showed.
     - The instance that code creates for an unowned panel is a side effect that hides nothing (`:69`, `:129-131`).
     - The markup-shown-at-load case is `:260-263`, recorded for J-OFFCANVAS to rule on.
     - The `types.ts` sentence can stay.
   - **Unknown ruled:** "a panel this engine never showed is not its to hide" reads as a disclaimer, not as an observable contract. It also sits against the same file's `shown` getter, "whether the panel carries its `shown` token".
     - On a panel constructed over markup that already carries `show`, `shown` reads true, so "While shown, the panel listens" says the listener is armed.
     - `show()` resolves false "when the panel was shown", so no `show` call can arm the listener.
     - The contract leaves that case to the implementing unit (see referral R1).

5. **CONFIRMED.**
   - **Path form:** `PlacementSide`, `PlacementInterface.update`, `PlacementOptions.static`, `DropdownOptions.placement.static`, and `PopoverOptions.content` use it. Each path resolves in every options interface that owns it: `attributes.side` in Placement, Dropdown, and Tooltip; `attributes.popper` in Placement and Dropdown; `attributes.content` in Popover.
   - **Token idiom:** the backticked key appears on all seven `shown` getters, Backdrop `show` and `hide`, Tab `active`, Button `pressed` and `destroy`, Swipe `destroy`, and `BackdropOptions.animated`.
   - **Grep:** mine for the unbackticked idiom, `token membership`, `popover vocabulary`, the constant names, and `carousel-item img` found no hit. The remaining attribute-default hits are "Default:" sentences.
   - **E39 sites:** `BackdropClassMap`, `EventWire`, `PopoverClassMap`, and `ScrollLockSelectorMap.fixed` carry the E39 text. The Backdrop leaves keep the pass-through.
   - **Guide cells:** every changed description's cell equals it, including the § Methods cells.
   - **Attack:** I swept every `class`/`token` sentence for a third idiom. `ButtonInterface`'s description ("Controls the pressed class…") and its `host` ("the managed class") name the `pressed` token in class language. They sit outside the token-language population B4 ruled on, so I record them as bound B1 rather than as a counterexample.
   - **Unknown ruled:** at `PlacementSide`, `attributes.side` reads as an options path. The file already uses the path form with no options in view (`placement.position` on `TooltipClassMap.auto`, and `tip.class` and `dismiss.backdrop` on attribute leaves). The sentence around it is bound B2.

6. **CONFIRMED.**
   - **Status:** `j-types-8-status.txt` lists exactly `guides/veneer.md` and `src/browser/types.ts`.
   - **Gates:** in `j-types-gates-8.log.txt`, build, check, oxlint, and oxfmt exit 0, `test:guides` passes 19 of 19, and `test:policy` passes 109 with 1 skipped.
   - **Round-6 probe:** it refuses lines 12 to 15 once each and reports nothing for lines 18 to 21.
   - **Proof mutations:**
     - Restoring `readonly link: string` beside `parent` drops the line-12 TS2353, leaving three refusals. The probe tells the two states apart.
     - Editing a Summary cell apart from its TSDoc makes `findDrift` fail `test:guides`.
   - **Guide diff:** the only content changes are the changed descriptions, the removed `ScrollLockClassMap` row, and the § Methods cells. Every other line is re-padding.
   - **Added lines:** no `any`, type assertion, `!`, `@ts-`, `eslint-disable`, `null`, `public`, `protected`, `private`, or `import`. Every "as" is English prose.
   - **E6:** `ScrollLockClassMap`, `selector?:` on the tooltip options, `link` on the scrollspy selector map, and `slide` on the carousel attribute map have no survivor.

## Findings outside the claims

None. The one substantiated defect sits under claim 4.

## Attacked and held

- **Composition idiom:** every composition sentence opens "the engine matches", and the brace placeholders stay consistent (`.{disabled}` is a class key; `{menu}` and `{entry}` are selector keys).
- **"arrow-placement token":** it now agrees with the `auto` leaf's "whatever `placement.position` names".
- **`EventWire` and `EventHooks`:** both descriptions read verb to event.
- **"each key names the overlay token it receives":** it holds because `BackdropOptions` names the owner as always a modal or an offcanvas panel.
- **`fade` for `animated`:** `BackdropOptions`' "fade" for the `animated` option matches the idiom `ToastOptions` already uses.

## Referrals (to the objective lane)

- **R1:** rule on an Offcanvas constructed over markup that already carries `show`. The `shown` getter reads true, `show()` resolves false, and no resize listener is ever armed. Bootstrap's load handler (`offcanvas.js:260-263`) adopts and shows such a panel. Rule whether the contract must state this case (for example, "the listener is armed by a `show` call that resolves true"), and whether J-OFFCANVAS or the delegate owns the load adoption.
- **R2:** confirm the claim-4 ruling from `base-component.js:65-66`, `offcanvas.js:69`, and `:129-131`, and correct `plan.md` row 41 to match.

## Bounds

- **B1 — Button idioms:** `ButtonInterface`'s description and guide cell ("Controls the pressed class and accessibility attribute on a host") and its `host` leaf ("the managed class") name the `pressed` token differently from the getter and `destroy` two lines later. The guide paragraph around line 172 still says "restores the active membership", which the shipped `Button.ts` still does through `BUTTON_ACTIVE`. The Button implementation unit carries all three.
- **B2 — `PlacementSide`:** "as the attribute `attributes.side` names carries it" stacks a relative clause before its verb, which is the construction B6 removed from `EventWire`. A plainer form is "the value a placement writes to the attribute `attributes.side` names".
- **B3 — sibling `update` methods:** `DropdownInterface.update`, `TooltipInterface.update`, and `PopoverInterface.update` say "rewrites its placement attribute", while `PlacementInterface.update` uses the path form. On Tooltip, "placement attribute" can be misread as `attributes.position` (`data-bs-placement`).
- **B4 — `@typeParam TMap`:** `EventHooks` says "keyed by the verb each wire event mirrors" and `EventWire` says "keyed by the verb that names each event". That is one concept in two phrasings.
- **B5 — "triggers" twice:** `TabSelectorMap.link` says "Selects the triggers inside a list… for the list's triggers". `TabSelectorMap.trigger` also "Selects the triggers", so "triggers" names two key populations.
- **B6 — table width:** the shortened `BackdropClassMap` description still widens the § Surface table from 192 to 201 characters, so every row re-pads. B3 was met in part.

VERDICT: FAIL 4; outside the claims: none
