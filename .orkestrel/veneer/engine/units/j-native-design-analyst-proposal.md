# J-NATIVE design round — the objective lane's proposal (analyst on GPT-6 Astra)

Thread `01a0d5e2-e458-7f30-b7f7-dcb6fe8bed18`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-native-design-analyst.jsonl` (launch copy under `tmp/codex/`); 19 commands; 219 s; usage {"input_tokens":964410,"cached_input_tokens":854528,"cache_write_input_tokens":0,"output_tokens":5945,"reasoning_output_tokens":873}. Retained verbatim from the exec's last message.

---

This proposal uses Veneer `main` at `6d27028`. **Read** identifies inspected evidence; **inferred** identifies conclusions beyond recorded measurements. No files were edited, tests run, or agents spawned. E21 requires availability on Chromium 141 and 153; E5’s standing gate exceptions do not waive that requirement. **Read:** [decisions.md:23](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:23), [decisions.md:132](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/decisions.md:132).

1. **Invoker commands: retain the delegate’s click routing.**

   **Read:** Chromium 153 exposes `CommandEvent`, `command`, and `commandForElement`; the terrain measured presence, not routing equivalence. See [j-engine-terrain-platform.log.txt:29](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-platform.log.txt:29). **Chromium 141: supported, inferred** from the documented introduction in [Chrome 135](https://developer.chrome.com/release-notes/135); the supplied terrain contains no Chromium 141 command measurement.

   Native invocation requires a button with `commandfor="panel-id"` and a command value. Bootstrap-compatible delegation accepts anchor triggers, target selectors, and selectors naming multiple collapse panels. **Read:** [Delegate.ts:635](C:/Users/mikes/WebstormProjects/veneer/src/browser/Delegate.ts:635). Custom commands such as `--toggle` still require JavaScript to perform the component operation; built-in popover and dialog commands perform different operations. See [Chrome’s command documentation](https://developer.chrome.com/blog/command-and-commandfor).

   **Inferred:** replacing routing would require consumers to change trigger elements and target syntax, while retaining a selector-based route for the existing contract. Translating existing clicks into commands would add an intermediary without removing target resolution, engine acquisition, conflict handling, or nested-root deduplication. Native `show-modal` also contradicts R8’s decision to preserve ordinary-element stacking. **Read:** [j-engine-design-verdict.md:18](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md:18).

   **REFUSE — commands do not replace the retained Bootstrap trigger and target contract; keep the existing markup and delegate routes.**

2. **Intrinsic-size transitions: measure a replacement for Collapse’s pixel endpoints.**

   **Read:** showing reads `scrollHeight` or `scrollWidth`; hiding measures the rendered dimension. See [Collapse.ts:181](C:/Users/mikes/WebstormProjects/veneer/src/browser/Collapse.ts:181), [Collapse.ts:223](C:/Users/mikes/WebstormProjects/veneer/src/browser/Collapse.ts:223). Terrain establishes syntax support for `interpolate-size` and `calc-size()`, not a working collapse transition. See [j-engine-terrain-platform.test.ts:100](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-platform.test.ts:100). **Chromium 141: supported, inferred** from their introduction in [Chrome 129](https://developer.chrome.com/release-notes/129).

   Probe the existing implementation against `0px ↔ auto` with an engine-owned, snapshotted `interpolate-size: allow-keywords`, and against `0px ↔ calc-size(auto, size)`. Consumer markup must remain unchanged. Preserve effective class tokens, trigger ARIA, accordion coordination, vetoes, lifetime checks, restoration, and `settleAnimations`. Retain the layout flush that establishes the starting style; removing size arithmetic does not establish that reflow is unnecessary. **Read:** [j-engine-terrain-platform-2.log.txt:19](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-platform-2.log.txt:19).

   Run on the styles session’s Chromium 141 and recorded Chromium `153.0.8010.12`. Measure opening and closing intermediate geometry, final geometry, active transition properties, and completion-event order under the shipped cascade. Include horizontal panels, constrained dimensions, padding and borders, changing content, reduced motion, destruction, and a root reset to `numeric-only`. Explicitly compare horizontal `auto` against the content width the existing algorithm selects; equivalence is **inferred, unproved**. A control disabling intrinsic interpolation must fail the intermediate-motion assertion.

   **MEASURE — presence and the root declaration do not prove equivalent animation. Proposed unit J-NATIVE-SIZE owns `engine/units/j-native-size-probe.test.ts`, `j-native-size-probe.config.ts`, host-specific logs, and `j-native-size-report.md`; any adoption must separately assign `src/browser/Collapse.ts`, its mirrored test, and scoped shared-file patches after J-SAMEWAY-ENGINES.**

3. **`hidden="until-found"` and `beforematch`: refuse as the baseline Collapse hiding mechanism.**

   **Read:** terrain records the handler’s presence and attribute reflection, without exercising find-in-page. See [j-engine-terrain-platform.test.ts:108](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-platform.test.ts:108). **Chromium 141: supported, inferred** from the documented introduction in [Chrome 102](https://developer.chrome.com/docs/css-ui/hidden-until-found?hl=en).

   The shipped `.collapse:not(.show)` rule sets `display: none`. **Read:** [_collapse.scss:13](C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_collapse.scss:13). The HTML standard specifies that an until-found element with that display value cannot be revealed by find-in-page; eligible until-found elements retain a box, including borders, padding, and margins. See the [hidden attribute specification](https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute).

   **Inferred:** adding the attribute alone cannot deliver the proposed capability. Making it work requires replacing the collapsed display contract, addressing retained box geometry, and synchronizing browser revelation with class-derived state, trigger ARIA, accordion behavior, and cancelable `show`. Construction also promises no writes, so automatic initial enrollment changes another contract. **Read:** [guides/veneer.md:995](C:/Users/mikes/WebstormProjects/veneer/guides/veneer.md:995), [types.ts:842](C:/Users/mikes/WebstormProjects/veneer/src/browser/types.ts:842).

   Consumers therefore make no markup change under this proposal. Searchable collapse remains a separately scoped capability requiring an explicit cascade and behavior decision.

   **REFUSE — the existing collapsed display contract prevents native revelation, and replacing that contract changes observable layout and initialization behavior.**

4. **Anchor-positioned arrows: measure replacement of the cross-axis arithmetic.**

   **Read:** `Placement.update()` measures arrow, surface, and reference rectangles, subtracts the surface border, clamps the offset, and writes pixels. See [Placement.ts:206](C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts:206). Terrain’s `anchor()` evidence is a syntax-support check. See [j-engine-terrain-platform.test.ts:95](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-engine-terrain-platform.test.ts:95). **Chromium 141: supported, inferred** from anchor positioning’s introduction in Chrome 125 and the property renames in Chrome 129. See [Chrome’s anchor-positioning documentation](https://developer.chrome.com/blog/anchor-positioning-api?authuser=2&hl=en).

   Probe an absolutely positioned arrow referencing the trigger’s generated anchor name, using `anchor(... center)` on the cross axis, percentage translation for its own center, and CSS clamping against the surface’s usable edge. Compare rendered rectangles against the existing implementation on Chromium 141 and `153.0.8010.12`.

   Exercise tooltip and popover cascades, preferred and flipped sides, viewport edges, asymmetric borders, offsets, oversized arrows, arbitrary consumer-provided arrow sizes, nested arrow containers, resizing, scrolling, and restoration after consumer edits. A wrong anchor name must fail centering; removing the clamp must fail an edge case. Syntax acceptance alone cannot close either claim.

   Consumer markup must remain unchanged. Even if arithmetic moves into CSS, retain side measurement and the effective placement attribute for Bootstrap’s side-dependent arrow styling, plus promotion, fallback selection, and snapshots. **Read:** [types.ts:572](C:/Users/mikes/WebstormProjects/veneer/src/browser/types.ts:572), [_popover.scss:104](C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_popover.scss:104).

   **MEASURE — native anchoring is available in principle, but descendant anchoring, arbitrary arrow sizing, and edge clamping remain unproved. Proposed unit J-NATIVE-ARROW owns `engine/units/j-native-arrow-probe.test.ts`, `j-native-arrow-probe.config.ts`, host-specific logs, and `j-native-arrow-report.md`; adoption would assign `src/browser/Placement.ts`, its mirrored test, and scoped contract and guide patches.**

PROPOSAL: Retain delegated toggles and the baseline collapsed display contract, and require Chromium 141 and 153 behavior proofs before replacing Collapse’s pixel sizing or Placement’s arrow arithmetic.
