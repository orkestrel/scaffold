# J-TYPES audit round 9 — the subjective lane's verdict (returned 2026-09-23 by `reviewer` on Opus 5.5, native subagent, 37 tool uses, 301 s; retained from the subagent's return text)

**Lane: subjective.** I held it as `reviewer` on Opus 5.5 (model `claude-opus-5-5`, native subagent). Opus 5.5 wrote this round and my round-8 verdict, so I attacked the adopted wording as if it were someone else's.

I read `j-types-9.diff`, `j-types-9-status.txt`, `j-types-report-9.md`, `j-types-gates-9.log.txt`, `j-types-probe-6.ts`, the round-8 verdicts, and brief 9, all under `C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/`. I also read `C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts`, `C:/Users/mikes/WebstormProjects/veneer-types/guides/veneer.md`, and Bootstrap's `tab.js`, `offcanvas.js`, and `base-component.js`. Line numbers are approximate, so find each site by its symbol.

## Numbered verdicts

1. **CONFIRMED.**
   - **Site:** `TabSelectorMap` (around line 874) holds `wrapper` (`.nav-item`), `entry` (`.list-group-item`), and `link` (`.nav-link, [role="tab"]`), each with the brief's TSDoc.
   - **Outer set:** substituting the defaults gives `:is(.nav-item, .list-group-item)`. Read through `closest`, that matches the same elements as `SELECTOR_OUTER` (`tab.js:46`, read at `:264`).
   - **Inner set:** substituting the defaults gives `:is(.nav-link, [role="tab"], .list-group-item):not(.dropdown-toggle), [data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]`. That matches the same elements as `SELECTOR_INNER_ELEM` (`:47-49`, read at `:180` and `:259`).
   - **No shared tokens:** I compared all seven Tab keys in pairs. `.list-group` against `.list-group-item`, `.nav` against `.nav-item` and `.nav-link`, and `[role="tablist"]` against `[role="tab"]` are distinct tokens. I found no hit in the ScrollSpy, Dropdown, Carousel, ScrollLock, or Modal selector maps either.
   - **Naming attack that failed:** I looked for a reading where `entry` conflicts across the file.
     - Everywhere it appears, `entry` names the element Bootstrap's markup marks `-item` that is itself the unit a user sees or operates: `.dropdown-item` on Dropdown, `.carousel-item` on Carousel, `.list-group-item` on Tab, and the `dropdown-item` class on `ScrollSpyClassMap`.
     - `names.md` § Rejected naming bars `item`, so `entry` is the sanctioned term. The owning map and option group scope each key, so a consumer can't confuse `selectors.entry` on a tab with `classes.entry` on a scrollspy.
     - `.nav-item` is not the unit (it wraps `.nav-link`), so naming it `wrapper` by its role is consistent. The key order wrapper → entry → link reads outer → both → inner.

2. **BROKEN.** The `types.ts` sentence holds as a contract. The report's statement that the lifetime listener "hides the same set" is contradicted by the source.
   - **What holds:**
     - `OffcanvasInterface.show`'s `@remarks` (around line 1281) carries the E42 sentence word for word, and no disclaimer sentence remains.
     - The contract reads plainly: it holds for the panel's lifetime, it fires on window resize, and it hides when the panel is shown and its computed position is not `fixed`. "Shown" is the file's own term (the `shown` getter), and "hides itself" matches `ToastInterface.show`.
     - The citations resolve and state what they claim: `offcanvas.js:69`, `:129-131`, `:260-263`, `:267-269`, and `base-component.js:65-66`.
   - **The false statement:** Bootstrap's resize handler also hides a panel that is still sliding in. The engine doesn't.
     - The handler's selector `[aria-modal][class*=show][class*=offcanvas-]` (`:267`) matches the `showing` token as a substring (`:33`, added at `:113`).
     - `_isShown` is already true at `:104`, so `hide()` goes ahead during the slide-in.
     - The engine hides only "when it is shown". The `shown` getter reads the `shown` token, which lands only when the slide-in completes (`OffcanvasClassMap.showing` "Marks the panel while it slides in"). In any case, the engine's `hide` "resolves false when … a transition was in flight".
     - Result: a resize past the breakpoint during the slide-in leaves the engine's panel shown, with its backdrop and scroll lock, until the next resize. Bootstrap hides it.
   - **Why it matters:** `plan.md` row 41 repeats "the same set Bootstrap's resize handler hides" and tells J-OFFCANVAS to write the guide's Compatibility row from it. The row would then omit a real departure. That is the same class of defect round 8 broke claim 4 for.
   - **Right looks like:**
     - The departure paragraph and `plan.md` row 41 state that Bootstrap's handler also hides a panel in its slide-in (`offcanvas.js:33`, `:104`, `:113`, `:267`), and that the engine doesn't because its `hide` refuses while a transition is in flight.
     - Either J-OFFCANVAS records that departure, or the engine's contract changes to match Bootstrap. The objective lane rules which (R1).
     - The `types.ts` sentence can stay.

3. **CONFIRMED.**
   - **The wording:**
     - `ButtonInterface`'s description and its `host` leaf (around line 72) carry the E43 text.
     - `PlacementSide` (around line 376) carries the E44 text.
     - `DropdownInterface.update`, `TooltipInterface.update`, and `PopoverInterface.update` each read "rewrites the attribute `attributes.side` names".
     - Both `@typeParam TMap` sentences read "keyed by the verb that names each event".
   - **Guide cells:** the `ButtonInterface` and `PlacementSide` rows and the Dropdown, Tooltip, and Popover `update` cells equal their TSDoc in the diff.
   - **Attacks that failed:**
     - **Does the path resolve?** `attributes.side` resolves in each owner: `PlacementAttributeMap.side`, `DropdownAttributeMap.side`, and `TooltipAttributeMap.side`, which `PopoverAttributeMap` inherits.
     - **Is the direction consistent?** "the verb that names each event" agrees with every `{Entity}EventMap` description ("Maps each verb to the … event it names") and with `EventHooks` and `EventWire`.
     - **Do old phrases remain?** My grep over `src/**/*.ts` for `placement attribute|pressed class|managed class|verb each wire event|not its to hide|Maps each event|to the verb that names it` returned no hit.
     - **Guide residue:** the guide's two hits are outside the claim. Line 172 ("active membership") is carried to J-BINDER round 2 by the round-8 B1 ruling. Line 1683 ("the placement attribute") is prose about the styles cascade test, not a TSDoc cell.

4. **CONFIRMED.**
   - **Scope:** `j-types-9-status.txt` lists exactly `guides/veneer.md` and `src/browser/types.ts`.
   - **Gates:** in the Orchestrator's `j-types-gates-9.log.txt`, `build:src:browser`, `check:src:browser`, oxlint, and oxfmt exit 0. `test:guides` passes 19 of 19, and `test:policy` passes 109 with 1 skipped. The round-6 and round-8 absent greps exit 1, which is the pass.
   - **Probe:** it reports exactly the TS2353 or TS2561 refusals on lines 12 to 15 and nothing on lines 18 to 21.
   - **Proof mutations:**
     - Restoring `readonly link: string` on `ScrollSpySelectorMap` drops the line-12 refusal, and restoring `ScrollLockOptions.classes` drops line 14. The four-diagnostic reading tells either mutation apart.
     - A Summary cell edited apart from its TSDoc fails `findDrift` in `test:guides`.
   - **Guide diff:** outside the changed cells it is re-padding, plus the `ScrollLockClassMap` row removed with its export (hunk `-7,158 +7,157`).
   - **Added lines and E6:**
     - No added line carries `any`, `null`, `@ts-`, `eslint-disable`, `@deprecated`, an accessibility modifier, or `import`. Every `as` is English prose, and every added property is `readonly`.
     - My grep for `ScrollLockClassMap`, `selectors: { link`, and `readonly selector?:` across `src`, `tests`, and `guides` finds no survivor.
     - The `readonly slide` hits are `CarouselEventMap.slide` and `CarouselClassMap.slide`, which are other members, not the renamed attribute key.

## Findings outside the claims

None.

## Attacked and held

- **Composition idiom on Tab:** `:not({toggle})` uses a selector key, so it takes no leading dot. `.{disabled}` on Dropdown uses a class key, so it does. The two are consistent.
- **"reads `closest` with" on `wrapper`:** the verb fits, because `tab.js:264` uses the outer set only through `closest`.
- **B5 (round 8):** closed at its own site. `link` no longer says "triggers" twice. The wider drift of that term is bound B2.
- **B6 (round 8):** the ruling declined it, and I did not re-argue it.

## Referrals

- **R1 (to the objective lane):** confirm claim 2's slide-in case from `offcanvas.js:33`, `:104`, `:113`, and `:267-269` against the engine's transition refusal on `OffcanvasInterface.hide`. Then rule whether J-OFFCANVAS records it as a departure or the contract changes to hide, abandoning the slide-in. Either way, `plan.md` row 41's "the same set" wording is corrected with the report's paragraph.

## Bounds

- **B1 — `TabSelectorMap.entry`:** "which the engine adds to both sets" names sets that no Tab key defines. Neither `wrapper` nor `link` calls its composition a set. A plainer form is "which the engine adds to the `wrapper` and `link` compositions".
- **B2 — "trigger" in Tab:** `TabInterface`'s description ("sibling triggers"), `TabSelectorMap.list` ("a trigger and its siblings"), and `TabClassMap.disabled` ("a disabled trigger") name the population that `link` now calls "the list's controls". "Trigger" also names the `trigger` key's narrower population, so one concept has two terms and one term covers two concepts.
- **B3 — where the resize remark lives:** a lifetime behaviour sits in `show`'s `@remarks`, which a reader of `hide`, `destroy`, or the interface does not see.
  - `OffcanvasInterface.destroy` doesn't name the resize listener it releases, while `TabInterface.destroy` names its key listener and `DelegateInterface.destroy` its click listener.
  - A better home is the interface block's `@remarks`, with `destroy` naming the listener.
- **B4 — `ButtonInterface` token beside a literal:** "the `pressed` token and the `aria-pressed` attribute" puts a class-map key (default `active`) and a fixed attribute name in the same backticked form. A guide reader can take `pressed` for the class the button writes. The token idiom is file-wide, and J-BINDER round 2 already owns the Button prose.

VERDICT: FAIL 2; outside the claims: none
