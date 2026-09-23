# J-TYPES audit round 2 — the objective lane's verdict (returned 2026-09-23 by analyst on GPT-6 Astra, gpt-6-astra at high effort, read-only codex exec)

Thread `01a0cf45-3471-77d0-af68-9b2d6023ff8d`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-types-audit-2.jsonl` (launch copy under `tmp/codex/`); 47 commands; 438 s; usage {"input_tokens":1714961,"cached_input_tokens":1584768,"cache_write_input_tokens":0,"output_tokens":11850,"reasoning_output_tokens":2651}. Retained verbatim from the exec's last message.

---

1. **CONFIRMED — objective lane.** Attacked placement leakage through Tooltip, inherited Popover, and Dropdown. The supplied compiler evidence rejects Tooltip’s `static` and Dropdown’s `position`; my in-memory compiler attack also rejects Popover’s `static` and Dropdown’s `fallbacks` with `TS2353`. The mechanism still accepts its complete options. Declaration inspection finds no component option typed `PlacementOptions`. The leaf defaults match Bootstrap’s `tooltip.js:58`, `popover.js:20`, and `dropdown.js:71`, including Popover’s inherited placement documentation.

2. **CONFIRMED.** Attacked the replacement using the obsolete `hint` member and the forbidden `'auto'` value. My compiler run rejects `hint` with `TS2353`; the Orchestrator’s supplied probe rejects `'auto'` with `TS2322` and accepts `'manual'` and `'hint'`. [PlacementInput](C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:314) names the HTML attribute and documents `manual` as its default. No `hint` member remains.

3. **BROKEN.** The promise signatures and awaited examples hold, but the refusal contract is incomplete at [TooltipInterface.fill](C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:1051) and [PopoverInterface.fill](C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:1174).

   Failing interleaving: show an enabled, connected tip with nonempty content and an active fade; after the tip acquires `show`, but before `shown`, call `fill` with replacement content. Bootstrap adds `show` before queuing completion (`tooltip.js:217–239`), `_isShown()` reads that class (`:369`), and `setContent()` consequently calls `show()` (`:326–331`). The fixed getter likewise reports this tip as shown. R6 and the fixed `show` contracts require the rebuild to refuse while the transition remains in flight. The `fill` lists omit that refusal. Waiting instead would introduce an unrecorded departure from the immediate rebuild and refusal rules.

   A separate reachable state exposes the same incomplete delegation: after a successful show, set the trigger’s inline `display` to `none`, then call `fill`. The adopted `show` contract resolves false, but `fill` omits that condition too.

   Smallest correction: make each `fill` sentence resolve as the rebuild’s complete `show` contract resolves. The Tooltip sentence must say:

   > Resolves true after the content is written and, when the tip is shown, after the rebuilt tip’s `shown` event; false when the tooltip is destroyed, or when a shown tip’s rebuild is refused because the tooltip is disabled or has no content, the trigger is not connected to its document or its inline `display` is `none`, a listener prevented `show`, or a transition is in flight.

   Use “popover” in the corresponding contract. Preserve the hidden-tip update’s successful result; a hidden tip requires no rebuild. This is a contract contradiction established from the declarations, source, and R6, not a browser-runtime finding.

4. **CONFIRMED.** Attacked repeated show after completion, detached triggers, inline `display: none`, and show during a transition. [Tooltip’s show contract](C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:999) and [Popover’s counterpart](C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:1122) distinguish those states correctly under the adopted rulings. Bootstrap’s `show()` has no already-shown guard, checks content/enabled state and attachment/prevention, and throws for inline `display: none` (`tooltip.js:184–239`). The documented false result, destruction rule, and R6’s in-flight refusal are authorized departures.

5. **CONFIRMED.** Attacked Collapse with an idle target and a transitioning accordion sibling; its refusal names the sibling, matching `collapse.js:125`. Attacked Carousel with a single active item and wrapping enabled; `next` and `previous` name the computed item equaling the active item, matching `carousel.js:309`. Comparing parsed return tags against the reconstructed round-1 tree finds changes only to these methods and the Tooltip/Popover `show` and `fill` contracts addressed by E3 and E4.

6. **CONFIRMED.** Attacked the rename through declarations and guide references. [ScrollSpyInterface](C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:703) exposes `link: HTMLElement | undefined` with the unchanged summary. Only Tab declares `readonly active`. The guide’s ScrollSpy rows and examples contain no obsolete member reference. The supplied compiler probe rejects the old object shape and accepts `link: undefined`.

7. **CONFIRMED.** Attacked hook compatibility and unauthorized seed changes. In-memory compilation accepts assignments between the alias, `EventHooks<ButtonEventMap>`, and the original explicit listener shape. Changing mapped listeners to return `boolean` breaks that compatibility, demonstrating the check discriminates. The alias and unchanged `ButtonOptions.on` appear at `types.ts:37–42`; the guide marks the alias as `type`. Reversing only the authorized hook declaration and ColorMode summary changes makes the seed byte-identical to `376d84a`, apart from the appended boundary newline.

8. **CONFIRMED.** Attacked the bounds against their underlying facts. Carousel’s readonly fields say “Carries”; the sanitizer summary omits the toolchain clause and its remarks identify TypeScript 6.0.3; Backdrop destruction names abandoning the fade. The installed DOM declarations expose `Sanitizer` and `setHTMLUnsafe`, but lack `setHTML`. For backdrop dismissal, `modal.js:238` checks backdrop configuration, and `offcanvas.js:178–185` supplies its click callback only when visible. The fixed coupling sentence preserves those conditions and the adopted TSDoc forms.

9. **CONFIRMED.** Attacked evidence identity, guide scope, and declaration constraints. The supplied cumulative diff matches the actual worktree diff; changing a declaration in the comparison control makes it fail. Reconstructing the trees from their diffs shows that this round changes only the specified guide rows, without re-padding other rows. TypeScript AST inspection finds no mutable properties or arrays, forbidden type/assertion/modifier constructs, or imports; replacing `readonly code: string` with `code: any` detects the intended violations. The supplied status and Orchestrator logs establish the authorized files, passing gates, and expected probe diagnostics. I did not rerun those established gates or the substitution sweep.

10. **BROKEN.** Claim 3’s reachable states violate the reconciled ruling that `fill` resolves as its rebuild’s `show` resolves. The correction is the same bounded contract repair described there.

    The required round-1 attacks otherwise hold on the fixed tree:

    - **Round-1 claim 1:** compared dispatched Bootstrap events with event-map keys, including listener-only constants and Popover’s inherited namespace. No extra or missing key appeared.
    - **Round-1 claim 2:** attacked programmatic Dropdown hides, Tab activation without an active sibling, and trigger-free Modal/Offcanvas events. Their absent payload fields compile; removing `undefined` in the control produces `TS2322`.
    - **Round-1 claim 5:** compared interface members with the adopted Components table and R12. The renames, excluded static/internal methods, and authorized ScrollSpy getter repair hold.
    - **Round-1 claim 8:** repeated the TypeScript AST inspection and mutable-`any` control described under claim 9.
    - **Round-1 claim 10:** the wrong wire produces `TS2322`, and an unknown hook produces `TS2353`. Widening the wire or adding a hook index signature admits the corresponding bad input. Boolean-return listeners break the void-return assertion and Button compatibility. Tooltip and Popover interfaces remain mutually assignable.
    - **Round-1 claim 14:** an unguarded `HTMLElement.setHTML` call produces `TS2551`; the structural contract accepts the safe call. Adding the native method in an in-memory declaration control removes that diagnostic.

    The original placement, default, signature, refusal, promotion-mode, and ScrollSpy attacks are repaired as specified. No other round-1 confirmed property was contradicted by the fixed-tree inspection or supplied gate evidence. Compiler execution establishes type semantics; source comparisons establish contract correspondence. No browser test ran.

Findings fitting no claim: none.

**Attacked and held**

- A hidden tip’s `fill` can succeed while showing is disabled: no rebuild calls `show`. Do not broaden the repair into unconditional show prerequisites.
- Repeated settled Tooltip/Popover show rebuilds; repeated Toast show likewise remains supported by Bootstrap.
- Static placement remains valid on the mechanism and Dropdown. Its exclusion from Tooltip and Popover is intentional.
- `EventWire` constrains the event verb, not the namespace. Namespace tightening remains outside the adopted contract.
- Guide parity and example presence do not establish component runtime behavior.

VERDICT: FAIL 3, 10; outside the claims: none
