# J-TYPES audit round 6 — the objective lane's verdict (analyst on GPT-6 Astra)

Thread `01a0cfba-859d-7962-9873-dff348823996`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-types-audit-6.jsonl` (launch copy under `tmp/codex/`); 47 commands; 376 s; usage {"input_tokens":1938270,"cached_input_tokens":1783424,"cache_write_input_tokens":0,"output_tokens":9579,"reasoning_output_tokens":1632}. Retained verbatim from the exec's last message.

---

Objective lane (`analyst`).

1. **BROKEN — ScrollSpy names the wrong link container.** [types.ts:975](C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:975) says tracking reads the host’s `[href]` links. Bootstrap reads them from `_config.target` at [scrollspy.js:205](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/scrollspy.js:205), then finds their sections inside the scrolling host at `:213`.

   **Counterexample:** navigation outside the scrolling host contains `<a href="#section">`; the host contains the visible `#section` section and no links. Bootstrap tracks the navigation link, contradicting the sentence. **Smallest fix:** replace “host’s” with “target’s”.

   The `parent` rename, retained `link` getter, and parent-selector default hold. The attack using explicit tooltip placement also fails: [tooltip.js:313](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/tooltip.js:313) adds the `auto` token unconditionally.

2. **CONFIRMED — Default selector compositions preserve the matched sets.** I substituted every default and attacked disabled controls, nested menus, overlapping classes, and Tab’s independently admitted data triggers.

   | Composition after substitution | Comparison |
   |---|---|
   | `:is([data-bs-toggle="dropdown"]):not(.disabled, :disabled)` | Equals `SELECTOR_DATA_TOGGLE` at [dropdown.js:55](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/dropdown.js:55). |
   | `:is(.dropdown-menu) :is(.dropdown-item):not(.disabled, :disabled)` | Equals `SELECTOR_VISIBLE_ITEMS` at [dropdown.js:60](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/dropdown.js:60). |
   | `:is(.nav-link, .list-group-item, [role="tab"]):not(.dropdown-toggle)` | Equals `SELECTOR_INNER` at [tab.js:47](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/tab.js:47). |
   | `:is(.nav-link, .list-group-item, [role="tab"]):not(.dropdown-toggle), [data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]` | Equals `SELECTOR_INNER_ELEM` at [tab.js:49](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/tab.js:49). |
   | `:is(.fixed-top, .fixed-bottom, .is-fixed, .sticky-top)` | Equals `SELECTOR_FIXED_CONTENT` at [util/scrollbar.js:16](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/util/scrollbar.js:16). |

   No distinguishing element exists for these default pairs. A `.dropdown-item` inside nested `.dropdown-menu` elements matches each dropdown composition: the descendant relationship does not require the nearest menu. `:not(.disabled, :disabled)` means neither condition matches, exactly as `:not(.disabled):not(:disabled)` does.

   Sticky elements receive padding and margin compensation at `util/scrollbar.js:43` and `:44`, subject to its width guard. The revised selector defaults contain no duplicated own-token exclusions.

3. **CONFIRMED — Replaceable-token sentences follow the effective keys.** I attacked the named getters and methods with nondefault `shown`, `pressed`, `pointer`, `side`, `popper`, and `content` values. Their descriptions no longer require the default spelling. The changed method cells match their TSDoc.

   The attribute-name hits are confined to map defaults at [types.ts:381](C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:381), `:383`, `:726`, `:728`, `:1372`, and `:1555`. Using `popper` rather than `static` is correct: the former names the output attribute; Dropdown’s `static` attribute key names the configuration input.

4. **CONFIRMED — Renames and refusals hold.** I attacked the possibility that the captured probe rejected an acceptance line or retained an obsolete member. [j-types-gates-6.log.txt:68](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-gates-6.log.txt:68) records the refusals for `link`, `selector`, `classes`, and `slide`; its acceptance lines have no diagnostic. The declarations agree at `types.ts:976`, `:1223`, `:1371`, `:1427`, and `:1906`. `CarouselClassMap.slide` remains a distinct class key.

5. **CONFIRMED — Backdrop token ownership is expressible.** I attacked an Offcanvas override of `fade` independently of panel animation, and a Modal override of its backdrop tokens. [types.ts:271](C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:271), `:1071`, and `:1214` expressly connect overlay `backdrop`, `shown`, and `fade` to backdrop `host`, `shown`, and `fade`.

   [offcanvas.js:183](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/offcanvas.js:183) requests an animated backdrop; `util/backdrop.js:116` writes its fade token. Modal instead derives backdrop animation from its panel at `modal.js:161`. The pass-through permits that distinction.

   The attack that Offcanvas’s scroll lock requires `modal-open` fails: the writes belong to Modal at [modal.js:116](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/modal.js:116) and `:253`. Removing the scroll-lock class map is consistent.

6. **BROKEN — The sanitizer default omits element-local restrictions.** [types.ts:526](C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:526) promises that an unlisted data attribute survives when global `attributes` is absent. The supported mirror also admits element-local attribute lists.

   **Counterexample:** sanitize `<b data-x="1" title="t">t</b>` with `{ elements: [{ name: 'b', attributes: ['title'] }] }`. Global `attributes` and `dataAttributes` are absent, but the [HTML Standard’s attribute-filtering algorithm](https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#sanitization-algorithms) removes `data-x` because the element-local list excludes it. This conclusion follows from the normative algorithm; the supplied probe does not execute this combination.

   **Smallest fix:** state that absent global `attributes` preserves an unlisted data attribute only when no applicable element-local list excludes it. Preserve the explicit-list exception for the global-list case.

   The event-map direction, Carousel terminology, placement-token description, and changed guide summaries hold.

7. **BROKEN — The Offcanvas exclusion promises an unavailable registry walk and overstates ownership.**

   **Contract counterexample:** a delegate creates and shows a responsive panel. The proposed resize handler must enumerate live owners, but [RegistryInterface at types.ts:169](C:/Users/mikes/WebstormProjects/veneer-types/src/browser/types.ts:169) exposes only `claim`, `find`, and `release`. [Design R4](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/j-engine-design-verdict.md:14) specifies a `WeakMap`, which supplies no enumeration. The report’s walk cannot be implemented through this contract.

   **Source counterexample:** show a responsive Bootstrap panel, let showing finish, then call `dispose()`. [offcanvas.js:160](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/offcanvas.js:160) leaves the panel’s classes and `aria-modal` untouched; [base-component.js:40](C:/Users/mikes/WebstormProjects/veneer/node_modules/bootstrap/js/src/base-component.js:40) removes its owner. The query at `offcanvas.js:267` still matches it. Therefore a query match does not prove a live owner.

   **Smallest fix:** replace the registry-walk promise with a concrete lifecycle mechanism, such as an owner-bound resize listener released on destruction, and bound the exclusion to live managed panels. Do not require reproducing Bootstrap’s disposed-owner behavior.

   The requested citations resolve: `offcanvas.js:111` writes the attribute, `:147` removes it after hiding, and `:267` performs the query. `util/scrollbar.js:79` begins the scratch-saving method; `:82` performs the write through `Manipulator`. The scratch-attribute exclusion is sound against `HostSnapshotInterface`. No other name identified as unaccounted in the preceding objective walk remains unaccounted.

8. **CONFIRMED — Scope, parity, recorded gates, and replacement cleanup hold.** I attacked surface parity with a TypeScript AST comparison against the actual guide. Every export has its matching summary row; deleting the `BackdropClassMap` row in memory makes the comparison fail. Changed method summaries also match.

   AST inspection finds no prohibited syntax or mutable property; the negative control reports `mutable value` and `AnyKeyword`. The captured diff and [status](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-7-status.txt:1) name only the authorized files. The [Orchestrator’s gate log](C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-types-gates-6.log.txt:16) records successful acceptance commands. No obsolete alias or renamed member survives.

**Findings fitting no claim:** none.

**Attacked and held:** Tab’s data-trigger branch correctly admits a `.dropdown-toggle` carrying `data-bs-toggle="tab"`; the ordinary link branch excludes it. Native disabled state remains independent of the replaceable disabled class. Popover’s inherited vocabulary remains valid without a backdrop map.

**Referrals:** J-OFFCANVAS needs the concrete resize-lifecycle ruling from claim 7. J-TOOLTIP needs the element-local sanitizer case from claim 6 in its runtime proof.

**Bounds:** These are source and contract rulings, supported by the supplied execution records and the in-memory parity checks. No build or browser test was rerun. The disposed-panel attack disproves the ownership premise; it does not require Veneer to retain Bootstrap’s disposal behavior. `PopoverOptions` says “popover vocabulary,” rather than the literal “markup vocabulary” asserted by claim 6; this is recorded as a prose bound.

VERDICT: FAIL 1, 6, 7; outside the claims: none
