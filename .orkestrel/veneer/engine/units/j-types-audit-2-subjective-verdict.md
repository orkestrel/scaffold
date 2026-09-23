# J-TYPES audit round 2 — the subjective lane's verdict (returned 2026-09-23 by reviewer on Opus 5.5, native subagent `claude-opus-5-5[1m]`, 45 tool uses, 412 s; retained verbatim from the subagent's final message, HTML entities decoded)

---

**Lane: subjective.** I ran as the `reviewer` role on Opus 5.5, reached as a native Claude subagent (`claude-opus-5-5[1m]`). Opus 5.5 also wrote this fix round.

**Dispatch note.** The brief is complete. I ran no command. Where a claim rests on a run, I cite the Orchestrator's logs `j-types-gates-2.log.txt` and `j-types-probe-2.log.txt`.

## Numbered verdicts

1. **CONFIRMED** (my lane decides).
   - **Declarations.** `TooltipOptions.placement` (`src/browser/types.ts` around lines 970 to 977) is an inline group with only `position`, `offset`, and `fallbacks`. Each leaf names the Bootstrap option it mirrors and states `top`, `[0, 6]`, and `['top', 'right', 'bottom', 'left']`, which match `tooltip.js:65,67,68`. The `position` and `offset` leaves also state `right` and `[0, 8]`, which match `popover.js:23,24`.
   - `DropdownOptions.placement` (around lines 538 to 543) has only `offset` (`[0, 2]`, `dropdown.js:75`) and `static` (default `false`, from `display: 'dynamic'` at `dropdown.js:74`).
   - `PlacementOptions` appears only at its own declaration (around line 302), and it keeps all four leaves with the mechanism's defaults.
   - No group sentence states a default, so no contradictory pair remains on a `placement` path. The `PopoverOptions` `@remarks` statement ("`right` … `[0, 8]`") agrees with the leaves.
   - **Unknown ruled: the three declarations are the right shape.** They share one vocabulary: each leaf word means the same thing at every site, which is what "one concept, one term" asks for. They serve two concepts:
     - the component's consumer option, with that entity's Bootstrap defaults;
     - the mechanism's construction input, carrying resolved values.
   - **Attack 1.** Could `Pick<PlacementOptions, …>` replace the Tooltip group? No. `Pick` carries each leaf's JSDoc, so every hover would show `bottom` and `[0, 0]` again. That is the round-1 claim-4 defect, so separate declarations are the only way to give each entity its own leaf defaults.
   - **Attack 2.** Would named `TooltipPlacement` and `DropdownPlacement` types read better? Each group has one declaration site: Popover reaches Tooltip's group through `extends`. The inline form is the form `patterns.md` § Options shows.
   - **Attack 3.** A variable typed `PlacementOptions` is structurally assignable to both groups: a non-literal skips the excess-property check, and each group is a weak type sharing members. So `static` can reach Tooltip through a named variable. This is TypeScript structural typing. The round-1 failing input was the literal, which is now refused (the probe's line 20). The `PlacementOptions` summary marks it as the mechanism's type.
   - No attack produced a failing input.

2. **CONFIRMED** (my lane decides).
   - The member reads `readonly popover?: 'manual' | 'hint'` (around line 320). Its TSDoc names the HTML `popover` attribute and states "Default: `manual`". A grep for `hint` returns only lines 319 and 320.
   - The values match R9: `manual` for the menu and the popover tip, and `hint` for the tooltip tip (`j-engine-design-verdict.md` line 17).
   - **Attack 1.** `popover` collides with the Popover entity name. It held: the name mirrors the HTML attribute, as the mirrored-name rule in `names.md` § General vocabulary requires. The TSDoc names that source, and no other member is named `popover`.
   - **Attack 2.** `mode` would be vaguer and would drop the mirror. It held.
   - **Proof.** The probe's line 22 fails with `TS2322 … '"manual" | "hint"'`. Widening the member to `string` or adding `'auto'` to the union makes line 22 compile. The diagnostic names the union, so the probe tells the two apart. The controls on lines 28 and 29 compile in the Orchestrator's log.

3. **CONFIRMED** (ruled from the source; not my lane's to decide).
   - Both `fill` signatures return `Promise<boolean>` (around lines 1057 and 1180), and both examples await the call.
   - The `@returns` statement lists exactly these refusals: destroyed; disabled or no content (`tooltip.js:189`); trigger not connected (`:195-197`); prevented (`:197`). This matches `setContent` (`:326-331`).
   - The probe's line 23 fails `TS2322`. Reverting the return type to `void` makes line 23 compile, so the probe tells the two apart.
   - Open question: Referral R1.

4. **CONFIRMED** (ruled from the source).
   - "the tip was shown" is gone from the `show` statement.
   - Each listed refusal traces to `tooltip.js:189`, `:195-197`, or `:197`, except the in-flight refusal, which is R6.
   - The `@remarks` paragraph records the rebuild of a settled shown tip and the `display: none` case that resolves `false` (`:185-187`) on both `TooltipInterface` and `PopoverInterface`.

5. **CONFIRMED** (ruled from the source).
   - The `CollapseInterface.show` statement names "on the panel or on an open accordion sibling", matching `collapse.js:112` and `:125`. The `hide` statement keeps its own check only, matching `:167`.
   - The `next` and `previous` statements match `carousel.js:307-311`.
   - The delta changes `@returns` only at E3 to E6.

6. **CONFIRMED** (my lane decides).
   - The member reads `readonly link: HTMLElement | undefined` (around line 709), with its summary unchanged.
   - A grep for `readonly active` returns only `TabInterface.active` at line 646.
   - The guide has no fence or sentence naming a scrollspy member. Its only `spy` hits are § Surface rows and the § Methods row.
   - **Attack 1.** `link` against `ScrollSpyDetail.relatedTarget` ("Carries the link that became active"). It held: that field mirrors Bootstrap's name.
   - **Attack 2.** `link` against the guide's `link` token-family column (around lines 3317 onward). It held: that is a CSS family label, not an API member.
   - **Attack 3.** Could a singular `link` be read as the navigation's link list? It held, because the summary says "the active link".
   - **Proof.** The probe's line 24 fails with `TS2353`. Restoring `active` makes it compile, and the control on line 30 compiles.

7. **CONFIRMED** (my lane decides).
   - The line reads `export type ButtonHooks = EventHooks<ButtonEventMap>` (around line 37), with its doc block unchanged. `ButtonOptions.on` keeps its type. The guide's row at line 31 reads `type`.
   - Before `EventHooks`, the diff changes only the `ColorModeInterface.toggle` hunk (`@@ -17`) and this `ButtonHooks` hunk (`@@ -34`).
   - **Unknown ruled: keep the doc block.** Every sibling `{Entity}Hooks` alias carries the same form ("Configures the initial DOM event subscriptions for a {entity}."). The § Surface `Summary` cell must equal a doc-block description (`documentation.md` § Parity). An alias with no doc block leaves that row without a source and fails `no-malformed-summary`.
   - **Attack.** The alias refers to `EventHooks` about 42 lines before its declaration. It held: type aliases hoist, and moving `EventHooks` into the seed would break the seed's byte-identity.
   - **Proof limit.** The probe's lines 31 and 32 compile in the log. They would still compile if `ButtonHooks` gained an extra optional member, so they do not prove identity. The alias declaration proves identity by definition.

8. **CONFIRMED** (ruled from the source).
   - `CarouselDetail.from` and `to` (around lines 1317 to 1319) open with "Carries the position".
   - The `SanitizeTargetInterface` summary drops the toolchain clause, and its `@remarks` names 6.0.3.
   - `BackdropInterface.destroy` opens as the bound requires.
   - The `DismissOptions.backdrop` coupling matches `modal.js:233-240` and `offcanvas.js:168-185`.

9. **CONFIRMED** (ruled from the source; the checker's claim).
   - **Status.** The status lists only the two files.
   - **Guide rows.** Lines 31, 56, 65, and 201 equal their doc blocks.
   - **Re-padding.** No column widened, so no row could re-pad:
     - The § Surface Summary width is still set by the `TOKEN_NAMES` row.
     - The Name width is still set by `SanitizeTargetInterface`.
     - The width of the `BackdropInterface` table is set by the `hide` row.
   - **Sweep.** My grep of `types.ts` found `as`, `once`, and `new` only in prose, "at once", and `new Sanitizer()`. It found no `null`, `any`, `@ts-`, or `import`. Every added leaf is `readonly`.
   - **Gates.** In the gates log, check, oxlint, and oxfmt exit 0; `test:guides` passes 19 of 19; `test:policy` passes 109 with 1 skipped.
   - **Probe.** The probe log reports exactly lines 20 to 24, with exit 2.

10. **BROKEN** (my lane decides). This round's Dropdown text departs from R9.
    - **Failing input.** A dropdown whose toggle sits inside `.navbar`, with `placement.static` omitted or `false`.
    - **What the contract states.** The group summary (around line 537), "selects whether it is anchored", and the `static` leaf (around line 541), "if `false`, anchors it in the top layer", say this menu is anchored.
    - **What the source and the verdict require.** `dropdown.js:312-313` disables positioning for `this._inNavbar || display === 'static'`. R9 (`j-engine-design-verdict.md` line 17) writes `data-bs-popper="static"` "with no promotion and no anchoring for `display: 'static'` and a menu inside `.navbar`".
    - **Origin.** Both sentences are new in this round's delta (delta lines 73 and 77). They restate the round-1 mechanism leaf in Dropdown's own contract, and no round-1 lane tested that leaf against `.navbar`. The mechanism's own leaf (around line 309) stays correct, because Dropdown resolves `static` before it constructs `Placement`.

    Every other part of the claim holds on the fixed tree:
    - Round-1 claims 3, 4, 6, 7, and 9 and finding F1: their failing inputs now fail to compile (probe lines 20 to 24) or read as the source does (claims 4 and 5 here).
    - Round-1 claim 5: the member sets are unchanged apart from `active` becoming `link`.
    - Round-1 claim 9: `popover` stays in `PlacementInput`. `static` stays on the mechanism under the R1 ruling. Consumer names in the `popover` TSDoc describe the mechanism's callers and are not a member leak.
    - Round-1 claim 13: `popover`, `link`, `static`, and `fallbacks` are each one word.
    - Round-1 claim 14: the names are unchanged.
    - My round-1 "Attacked and held" list:
      - `PopoverInterface` duplication: both `fill` members changed identically, and probe line 35 compiles.
      - The `DismissOptions` name: its backdrop leaf now names the owning component's `backdrop` option.
      - `SnapshotCategory` `'property'`: unchanged.
      - `SanitizeOptions.filter`: unchanged.
      - The two uses of `trigger`: unchanged.
      - The `EventWire` namespace: unchanged.
      - The shared `SwipeDirection`: unchanged.
      - The separate `PlacementInput` object: stronger now, because the `popover` mode stays out of the consumer's group.
      - The required `handler` and `code` members: unchanged.

    **Required change** in `C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts`, `DropdownOptions.placement`:
    - **What is wrong.** The group summary (around line 537) and the `static` leaf (around line 541) state that a `.navbar` menu with `static: false` is anchored in the top layer.
    - **Why it matters.** J-DROPDOWN implements against this base. The contract text sends it against R9 and `dropdown.js:313`.
    - **What right looks like:**
      - The summary scopes the anchoring choice to a menu outside a `.navbar`.
      - The leaf's `false` branch reads "anchors it in the top layer, except a menu inside a `.navbar`, which stays in flow either way".
      - The leaf keeps "Default: `false`".
    - No guide row changes, because neither sentence reaches a § Surface summary.

## Findings outside the claims

None.

## Attacked and held

- **Inline groups against a named shared type** (claim 1, attacks 1 to 3): held.
- **Structural leak of a `PlacementOptions` variable into Tooltip:** held. This is TypeScript structural typing, and the literal path is refused.
- **The Dropdown group is named `placement` but has no side leaf:** held. R11 fixes the group noun, and `placement: { static: true }` reads naturally.
- **`popover` as a member name next to the Popover entity:** held (claim 2).
- **The `link` getter against the `link` token family and `relatedTarget`:** held (claim 6).
- **`ButtonHooks` forward reference and its own doc block:** held (claim 7).

## Referrals

- **R1, to the objective lane.** The `fill` statement's refusal list (around lines 1051 and 1174) and the `show` statement's list (around lines 999 and 1122) disagree.
  - `fill` rebuilds through `show`. `_isShown()` is true as soon as `show()` adds the `show` class at `tooltip.js:217`, so `fill` during a show fade reaches the rebuild. The contract's `show` refuses in flight, but `fill`'s list does not name that refusal.
  - `fill` also omits the inline `display: none` case, which `show`'s `@remarks` statement resolves `false`.
  - Rule one of two ways. If the rebuild refuses in flight, name it in `fill`'s list. If it rebuilds in flight as `setContent` does, state that the rebuild bypasses the in-flight refusal.

## Bounds (TSDoc wording, not findings)

- **Two conventions for the Popover defaults.** The `placement` leaves name Popover's values. The `trigger.hover`, `trigger.focus`, `trigger.click`, and `tip.template` leaves (around lines 949 to 963) state only Tooltip's values, while `popover.js:25,30` differ. By the unit's own ruling 2, those leaves carry the same contradiction on the Popover path. Extend the "and … for a popover" clause to those leaves.
- **"the mechanism" in the `PlacementOptions` summary.** Name the `Placement` class after it is exported. Parity forbids backticking it before then.
- **Refusal order in `show`.** Tooltip's and Popover's statements list the in-flight refusal after "a listener prevented `show`". Sibling contracts list it before. Order them the same way.
- **The in-flight departure in `show`'s `@remarks` statement.** It implies the in-flight departure through "settled" but does not state it. Say it there, or leave it to J-TOOLTIP's guide departures as ruled.
- **Carousel wording.** "the computed following item is the active item" uses implementation vocabulary. "no other item follows" reads better for a consumer.
- **Two senses of "popover".** The `PlacementInput.popover` TSDoc uses the word for the attribute and for the component in one sentence. "a Popover component's tip" separates them.

VERDICT: FAIL 10; outside the claims: none
