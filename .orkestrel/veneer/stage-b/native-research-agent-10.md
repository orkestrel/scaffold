**Question:** Does Chromium 153.0.8010.12 add an implicit aria-expanded and aria-details to popovertarget, commandfor and interestfor invokers, an expanded state to `summary`, and aria-modal to a dialog opened with showModal? And if Bootstrap writes aria-expanded or aria-describedby itself, does that override or clash with the implicit mapping?

Short answer: Chromium 153 does all of these except aria-expanded on interestfor invokers. The native state beats an author aria-expanded. An author aria-details, aria-describedby or aria-modal beats the native value.

Method: I read Chromium source at tag `153.0.8010.12` (GitHub mirror, found with Sourcegraph line search). I compared it with `main` where line numbers differ. HTML-AAM text comes from the `w3c/aria` repo file `html-aam/index.html`, which is the source the ED changelog points to. The rendered ED (w3c.github.io/html-aam, Editor's Draft, 29 July 2026) was cut short when I fetched it, so I could not read those rows there.

## Facts

| # | Claim | Source | Date | Quote |
|---|---|---|---|---|
| F1 | `AXNodeObject::IsExpanded()` returns undefined when the role does not support aria-expanded. | https://github.com/chromium/chromium/blob/main/third_party/blink/renderer/modules/accessibility/ax_node_object.cc#L3499 | main, 2026-10 | "if (!SupportsARIAExpanded()) return kExpandedUndefined;" |
| F2 | commandfor branch: if the command is a valid popover command, expanded follows `popoverOpen()`. It is checked before popovertarget. | ax_node_object.cc @153 L3459; main L3512-3525 | 153.0.8010.12 | "aria-expanded may be set depending on the command type… takes precedence over popovertarget" |
| F3 | popovertarget branch: expanded follows `popoverOpen()`, except when the invoker sits inside the popover (for example a close button). | @153 L3476; main L3530-3538 | 153 | "if (!form_control->IsDescendantOrShadowDescendantOf(popover))" |
| F4 | summary branch: a summary whose parent is `details` gets expanded or collapsed from the `open` attribute. | @153 L3491; main L3549-3555 | 153 | "IsA<HTMLDetailsElement>(element->parentNode())" … "FastHasAttribute(html_names::kOpenAttr)" |
| F5 | The author's `aria-expanded` is read only after the commandfor, popovertarget, menu-submenu and summary branches have returned. Native state wins when those apply. | @153 L3502; main L3560 | 153 | "if (AriaBooleanAttribute(html_names::kAriaExpandedAttr, &expanded))" |
| F6 | `IsExpanded()` has no interestfor branch. In ax_node_object.cc, interestfor only appears in name/description code. | Sourcegraph search of ax_node_object.cc @153 (matches at L7039, L8043 only) | 153 | — |
| F7 | `SupportsARIAExpanded()` lists the disclosure-triangle roles, which summary maps to. | https://github.com/chromium/chromium/blob/main/third_party/blink/renderer/modules/accessibility/ax_object.cc#L5675-L5692 | main | "case ax::mojom::blink::Role::kDisclosureTriangle:" |
| F8 | Details relations are built in this order: author aria-details, then interestfor, then commandfor, then popovertarget, then scroll-marker. If the author's aria-details attribute is present, even an empty one, no automatic relation is added. | ax_object.cc @153 L2586-2624 | 153 | "aria-details attribute is understood to mean that no automatic relation" |
| F9 | Chromium's own test confirms F8: a button with `popovertarget` and `aria-details=""` gets no detailsIds. The plain invoker gets `detailsFrom=popoverTarget`. | https://github.com/chromium/chromium/blob/153.0.8010.12/content/test/data/accessibility/html/popover-api.html#L43 and popover-api-expected-blink.txt L71 | 153 | `<button popovertarget=popover2 aria-details="">` |
| F10 | popovertarget aria-details needs an open popover. Plain-content `popover=hint` targets are excluded. | ax_object.cc @153 L2685-2700 | 153 | "if (!popover \|\| !popover->popoverOpen())" |
| F11 | commandfor aria-details needs an open popover and a command of toggle-popover, show-popover or hide-popover. | ax_object.cc @153 L2708-2732 | 153 | "action != CommandEventType::kTogglePopover &&" |
| F12 | interestfor gets the `kHasInterestFor` state. It also gets aria-details when the target is a visible, "rich" popover that is not the next element. Interest targets count as tooltips whatever their popover type. | ax_object.cc main L2601-2608, L2739-2757; @153 L2598-2605, L2740 | 153 | "Interest targets act as tooltips regardless of popover type." |
| F13 | Description order: author aria-describedby (`kRelatedElement`) is tried first and returns when non-null. interestfor (L8040) and popovertarget-hint (L8075) are only reached later. | ax_node_object.cc @153 L7828-7864, L8040, L8075 | 153 | "description_from = ax::mojom::blink::DescriptionFrom::kRelatedElement;" |
| F14 | interestfor and popovertarget-hint descriptions are skipped when that same source already supplied the name. | ax_node_object.cc main L8131, L8163 | main | "if (name_from != ax::mojom::blink::NameFrom::kInterestFor)" |
| F15 | `AXObject::IsModal()` only applies to the dialog and alertdialog roles. An author `aria-modal` is returned first. Otherwise the result is the element's `IsInTopLayer()`. | ax_object.cc @153 L4137-4148 | 153 | "if (AriaBooleanAttribute(html_names::kAriaModalAttr, &modal)) {" / "return To<Element>(GetNode())->IsInTopLayer();" |
| F16 | Serialization puts the `kModal` bool on dialog roles. | ax_object.cc main L2050-2052 | main | "if (ui::IsDialog(node_data->role)) {" |
| F17 | While `document.ActiveModalDialog()` exists, nodes outside it are ignored in the AX tree. This is separate from aria-modal. | ax_object.cc main L4005-4008 | main | "if (HTMLDialogElement* dialog = document.ActiveModalDialog()) {" |
| F18 | HTML-AAM, popovertarget: shown popover means aria-expanded=true; hidden means false; ancestor or missing means undefined; not a valid popover means no mapping. | https://github.com/w3c/aria/blob/main/html-aam/index.html#L13736-L13747 (rendered at #att-popovertarget) | ED 2026-07-29 | "If the associated element is not a valid popover element: no aria-expanded mapping." |
| F19 | HTML-AAM, popovertarget: user agents MUST expose aria-details, except when the action is hide, the popover is the next accessibility sibling, or an auto-state invoker sits inside the popover. | html-aam/index.html L13783-13789 | ED | "MUST expose an aria-details relation with the associated popover element except under the" |
| F20 | HTML-AAM, command/commandfor: same aria-expanded mapping for the toggle, show and hide popover states, plus a MUST for aria-details. The close and show-modal states add no mappings. Added 2 April 2025. | html-aam/index.html L9337-9357, L9392-9396, L9427, L17062 (rendered at #att-commandfor) | ED | "A command attribute in the close and show-modal states provide no additional accessibility mappings" |
| F21 | HTML-AAM: dialog `open` set by showModal() means aria-modal=true. Set by show() or written by the author, it means aria-modal=false. | html-aam/index.html L13346-13351 | ED | "If the open attribute is set via the showModal() method then aria-modal=\"true\"" |
| F22 | HTML-AAM: the details `open` attribute sets aria-expanded true or false on the summary. | html-aam/index.html L13296, L13325 | ED | "aria-expanded=\"true \| false\"" / "Set properties on the summary element." |
| F23 | HTML-AAM has no interestfor mapping. | Sourcegraph search of html-aam/index.html (no interestfor match) | ED | — |
| F24 | Core-AAM: when a host language declares an ARIA attribute in direct conflict with a native one, the UA MUST ignore the ARIA attribute. HTML-AAM §3.2 defers to this rule. | https://w3c.github.io/core-aam/#mapping_conflicts | ED 2026-07-02 | "user agents MUST ignore the WAI-ARIA attribute and instead use the host language attribute" |
| F25 | ARIA in HTML, summary of a details: allows only global aria-*, aria-disabled and aria-haspopup. It also says authors SHOULD NOT specify both a native attribute and its aria-* equivalent. | https://w3c.github.io/html-aria/ (summary row; author guidance) | ED (date not shown) | "Authors SHOULD NOT specify both the native HTML attribute and the equivalent aria-* attribute" |
| F26 | Bootstrap 5.3.8 writes aria-expanded (collapse, dropdown, tab), aria-modal (modal, offcanvas) and aria-describedby (tooltip, popover) on its elements. | C:\Users\mikes\WebstormProjects\veneer\node_modules\bootstrap\js\src\collapse.js:251, dropdown.js:152,207, tab.js:244, modal.js:179, offcanvas.js:111, tooltip.js:206 | 5.3.8 | "this._element.setAttribute('aria-describedby', tip.getAttribute('id'))" |

## Matrix

| Row | Evidence for | Evidence against / caveat |
|---|---|---|
| Implicit aria-expanded on popovertarget invoker in 153 | F3, F5, F18 | Not exposed when the invoker is inside the popover (F3). Role must support expanded (F1). |
| Implicit aria-expanded on commandfor invoker in 153 | F2, F20 | Only for popover commands. Dialog commands (show-modal, close) get none (F2, F20). |
| Implicit aria-expanded on interestfor invoker in 153 | None | F6 and F23: no code and no spec mapping. Only the `kHasInterestFor` state plus details (F12). |
| Implicit aria-details on popovertarget invoker | F8, F9, F10, F19 | Only while the popover is open. Plain-content hint popovers excluded (F10). Chromium has no explicit "action=hide" exclusion; the test at L51 says a hide button pointing to a showing manual popover does get details (F9). |
| Implicit aria-details on commandfor invoker | F8, F11, F20 | Open popover plus popover command only (F11). |
| Implicit aria-details on interestfor invoker | F12 | Only for a visible, rich, non-adjacent popover target (F12). |
| Expanded state on summary | F4, F7, F22 | Only a summary whose parent is `details` (F4). |
| aria-modal on a showModal dialog | F15, F16, F21 | Chromium computes it from `IsInTopLayer()`, not from showModal itself (F15). L4144-4147 unread, see Unknowns. |
| Author aria-expanded overrides native (collapse/dropdown/tab triggers that also carry popovertarget/commandfor, or a summary) | None | F5: native wins inside Chromium. Matches Core-AAM (F24). The author value is silently ignored, even if wrong. |
| Author aria-expanded used when no native branch applies (invoker inside popover, interestfor, plain button) | F5 (fall-through) | — |
| Author aria-details suppresses automatic popover/commandfor/interestfor details | F8, F9 | An author aria-details (even empty) blocks all automatic relations, including interestfor. |
| Author aria-describedby (Bootstrap tooltip) overrides interestfor/hint description | F13 | Only the description is overridden. Name-from-interestfor/hint (F14, main L7111-7128) is a separate path. |
| Author aria-modal overrides native modal flag | F15 (author checked first) | HTML-AAM says showModal means true (F21). Chromium would expose an author `aria-modal="false"` on a showModal dialog as non-modal, but background content is still pruned (F17). Bootstrap writes `true` (F26), so its value agrees. |

## Unknowns

- `IsExpanded()` lines between the gate and the select branch (main L3501-3507) are unread. One early `return kExpandedUndefined` (L3504) has a condition I could not see.
- The commandfor branch condition is partly unread (main L3522-3523), including whether it excludes invokers inside the popover.
- `IsModal()` lines L4144-4147 at 153 (main L4148-4150) are unread. I can't tell whether a non-modal dialog in the top layer (for example also a popover) would report modal.
- Lines L2589-2597 at 153 (the early exit after author aria-details) are unread. The suppression rests on the comment at L2586 and the F9 test.
- F17 (pruning outside the active modal dialog) was read on main only, not at the 153 tag.
- I did not read the full `SupportsARIAExpanded()` role list. That `button` and `input type=button` roles are in it is inferred from F9's expected dump, not read.
- I did not read the exact HTML-AAM wording around L13296-13325 (the summary mapping) or its conformance keyword.
- Whether w3c.github.io/html-aam is built from `w3c/aria/html-aam/index.html` is unconfirmed. The rendered ED was cut short when I fetched it.
- The base interestfor and command runtime flags are absent from `runtime_enabled_features.json5` @153. Only `HTMLInterestForInterestButtonPseudo` matched. "Shipped and flag removed" is an inference.
- Whether platform layers (UIA/IA2/AX) act on `kHasInterestFor` or `DetailsFrom` was not checked.
- How Core-AAM's conflict rule applies to popovertarget/commandfor-derived aria-expanded (not a same-named native attribute) is not stated in any spec I read.
- ARIA in HTML leaves aria-expanded off the summary row; whether conformance checkers flag Bootstrap writing it there was not checked.