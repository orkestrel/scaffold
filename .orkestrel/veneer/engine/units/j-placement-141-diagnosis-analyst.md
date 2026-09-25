# J-PLACEMENT-141 diagnosis, the objective lane (analyst on GPT-6 Astra)

Thread `01a0d6cc-2d65-72c1-ad2d-e357ccf2681e`; journal `C:/Users/mikes/WebstormProjects/scaffold/tmp/codex/j-placement-141-diagnosis.jsonl` (launch copy under `tmp/codex/`); 22 commands; 336 s; usage {"input_tokens":1087981,"cached_input_tokens":969856,"cache_write_input_tokens":0,"output_tokens":9290,"reasoning_output_tokens":2073}. Retained verbatim from the exec's last message.

---

## The cause or causes, ranked by the evidence

**Leading inference: Chromium 141 fails to establish or retain the dropdown’s initial anchor geometry in the scroller case.** The unresolved branch is whether the trigger is the menu’s DOM ancestry, the show sequence’s layout invalidation, or their interaction. The readings do **not** establish a scroll-compensation-only defect.

The failure precedes scrolling: `top: 2` equals the dropdown’s requested margin offset, whereas Chromium 153 reads `283`. This supports an ineffective anchor relationship, but does not prove failed name lookup specifically. The stylesheet restores the menu’s dimensions and visibility successfully.

### Complete dropdown-row comparison

I parsed and recursively compared every field. The following are the complete differences between [the Chromium 141 log](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/native141/j-native-probe-3-141.log.txt:114) and [the Chromium 153 log](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3-153.log.txt:121).

| Row and field | Chromium 141 | Chromium 153 |
|---|---|---|
| `V.clip.dropdown`, candidate and always, `before.rect.top` | `2` | `283` |
| Same, `clipped.rect.top` | `2` | `182` |
| Same, `restored.rect.top` | `2` | `283` |
| Same, candidate `clipped.hitIsOverlay` | `true` | `false` |
| Same, candidate `clipped.hit` | `"a.dropdown-item"` | `"div"` |
| Same, `differs` | `false` | `true` |
| `V.partial`, candidate and always, `before.rect.top` | `2` | `283` |
| Same, `clipped.rect.top` | `2` | `212` |
| Same, `restored.rect.top` | `2` | `283` |
| `V.viewport` | Every field identical | Every field identical |

The brief’s `182` after scrolling applies to the full-clip row. The partial-clip row reads `212` on Chromium 153.

All remaining fields match:

- Every dropdown rectangle retains `left: 0`, `width: 162`, and `height: 44`.
- Full clipping uses `distance: 101`, `scrollTop: 101`; partial clipping uses `71`, `71`.
- Viewport containment, visibility checks, computed `visibility`, explicit `positionVisibility`, and open/shown states match.
- Focus, Escape, hide, second show, destruction, and every event entry match.
- Partial clipping retains its hit target under either rule on either build.
- The viewport row reads `223 → -2 → 223` under either rule on either build.

Sources: [141 partial/viewport rows](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/native141/j-native-probe-3-141.log.txt:118), [153 partial/viewport rows](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3-153.log.txt:125).

### Placement differences

These are the placement-relevant differences read from the implementation and fixture. Inline values are derived from the code, **not recorded computed-style measurements**.

| Surface | Dropdown | Tooltip |
|---|---|---|
| Reference | Resolved reference; the fixture uses its toggle | Its trigger |
| Element | Existing menu retained inside `.dropdown`, inside the scroller | Generated tip appended to `body` in this fixture |
| Popover mode | Omitted; defaults to `manual` | Explicit `hint` |
| Preferred position | `bottom-start` | `top` |
| Offset | `[0, 2]` | `[0, 6]` |
| Fallback input | Omitted | `['top', 'right', 'bottom', 'left']` |
| Static option | Explicit false here; navbar ancestry can enable it | Omitted; defaults false |
| Ownership callback | Omitted | Callback checks the ongoing show and tip ownership |
| Attributes | Supplies popper and side names | Supplies side name; popper name defaults identically |
| Arrow | Absent | Generated arrow supplied to Placement |
| Resulting `position-area` | `bottom span-right` | `top` |
| Resulting `position-try-fallbacks` | `flip-block` | `top, right, bottom, left` |
| Resulting margins, top/right/bottom/left | `2px 0px 0px 0px` | `0px 0px 6px 0px` |

Sources: [Dropdown.ts:305](/C:/Users/mikes/WebstormProjects/veneer/src/browser/Dropdown.ts:305), [Dropdown.ts:393](/C:/Users/mikes/WebstormProjects/veneer/src/browser/Dropdown.ts:393), [Tooltip.ts:692](/C:/Users/mikes/WebstormProjects/veneer/src/browser/Tooltip.ts:692), [constants.ts:255](/C:/Users/mikes/WebstormProjects/veneer/src/browser/constants.ts:255), [constants.ts:563](/C:/Users/mikes/WebstormProjects/veneer/src/browser/constants.ts:563).

The shared writes are `position: fixed`, every physical inset `auto`, a generated `position-anchor`, an appended reference anchor name, and `position-try-order: normal`. The same promotion-restoration algorithm conditionally restores border, padding, background, color, and overflow; the actual restored values differ with each component’s cascade. See [Placement.ts:130](/C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts:130) and [constants.ts:293](/C:/Users/mikes/WebstormProjects/veneer/src/browser/constants.ts:293).

The cascade and construction differences matter:

- The dropdown wrapper is `position: relative`. Its menu starts `position: absolute; display: none; margin: 0`, then `.show` supplies `display: block`. Placement runs **before** that class is added. The fixture’s toggle lacks `.dropdown-toggle`, so the caret rules do not apply. See [_dropdown.scss:61](/C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_dropdown.scss:61), [_dropdown.scss:149](/C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_dropdown.scss:149), [Dropdown.ts:226](/C:/Users/mikes/WebstormProjects/veneer/src/browser/Dropdown.ts:226).
- The tooltip starts `display: block; opacity: 0`. Its show sequence places it, explicitly reads layout, then adds `.show`. Its generated markup includes an arrow, inner content, ID, role, automatic-placement class, and fade class. See [_tooltip.scss:43](/C:/Users/mikes/WebstormProjects/veneer/src/styles/components/_tooltip.scss:43), [Tooltip.ts:432](/C:/Users/mikes/WebstormProjects/veneer/src/browser/Tooltip.ts:432), [Tooltip.ts:583](/C:/Users/mikes/WebstormProjects/veneer/src/browser/Tooltip.ts:583).
- The menu’s minimum width, padding, border, and typography differ from the tooltip’s inner-box sizing and text reset. These can affect fallback selection. Neither named partial declares a transform, containment, container type, or anchor name on the relevant menu/toggle/tip. The dropdown divider’s `overflow: hidden` is irrelevant: the fixture contains no divider.
- Both fixtures use the same `overflow:auto; position:relative` scroller. The dropdown adds its positioned wrapper and existing menu; the tooltip trigger sits directly in the slot. See [probe:857](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3.test.ts:857).
- The Popover component shares the tooltip’s construction and body insertion, but uses `manual`, preferred `right`, and offset `[0,8]`. Its successful tracking therefore weighs against popover mode alone. See [Popover.ts:51](/C:/Users/mikes/WebstormProjects/veneer/src/browser/Popover.ts:51).

### Ranked candidates

**Leading: initial anchor/layout failure involving the scroller-resident menu.** The menu’s DOM ancestry distinguishes it from the working tips; removing the scroller in `V.viewport` removes the failure. However, ancestry alone is insufficient: Chromium 141’s `V.focus` candidate loses its hit target under clipping. That row skips the pre-show click and focuses the menu entry after showing. It records no rectangle, so it establishes conditional hiding, not correct geometry. See [141 log:126](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/native141/j-native-probe-3-141.log.txt:126), [probe:1045](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3.test.ts:1045), [probe:1173](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3.test.ts:1173).

**Next: hidden-to-visible initialization or stale layout state.** The dropdown receives anchoring declarations while its component rule still hides it; the tooltip already generates a box. The different `V.focus` preparation strengthens this candidate. The working viewport dropdown refutes an unconditional display-order failure.

**Next: `position-area` or fallback interaction with the scroller.** Dropdown uses a spanning area and a flip tactic; tooltip uses a centered area and explicit alternatives. The viewport control refutes general rejection of the dropdown syntax. Tooltip geometry also differs across builds: Chromium 141 reads `(left:53.78, top:253, width:66.36)` versus Chromium 153’s `(0,225,59.44)`, despite tracking by `101px`. Its successful tracking does not establish identical placement decisions. See [141 log:122](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/native141/j-native-probe-3-141.log.txt:122), [153 log:129](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3-153.log.txt:129).

**Weak or refuted as sole causes:**

- **Anchor-name lists:** no existing name is declared by this fixture or its relevant cascade. Placement uses the same naming algorithm for every component. A list-specific defect remains untested, but is not supported as this row’s cause.
- **Visibility policy:** `always` has the same bad geometry. The initial policy differs across builds, but these rows explicitly override it. See [141 support:106](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/units/native141/j-native-probe-3-141.log.txt:106), [153 support:113](/C:/Users/mikes/WebstormProjects/scaffold/.orkestrel/veneer/engine/units/j-native-probe-3-153.log.txt:113).
- **Missing `scrollend` update:** the initial position is already wrong. Moreover, `update()` measures and writes the side and arrow; it does not calculate menu coordinates. See [Placement.ts:181](/C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts:181), [Placement.ts:211](/C:/Users/mikes/WebstormProjects/veneer/src/browser/Placement.ts:211).
- **Ordinary ancestor clipping/containing-block behavior:** fixed top-layer boxes are intended to escape that layout ancestry. An ancestry-dependent failure would implicate implementation behavior, not justify adding `overflow:visible` as a general repair. See [CSS Positioned Layout’s top-layer definition](https://www.w3.org/TR/css-position-4/#top-layer).

## The fix per cause

These are **conditional fix proposals**, not verified cross-build repairs.

| Cause established by probe | Proposed fix for Chromium 141 and 153 |
|---|---|
| DOM ancestry determines failure | Place the promoted menu in an overlay container outside the scroller, following the working tip arrangement. Preserve inherited styling, ownership, delegated menu lookup, and restoration to its original location. |
| Hidden initialization determines failure | Establish a rendered, measurable menu and its anchor relationship before initial placement evaluation. Preserve show cancellation and restoration semantics. Do not depend on user focus to repair layout. |
| Flip tactic determines failure | Express the opposite placement explicitly while retaining start alignment; verify collision fallback as well as scrolling. Removing fallback is only a diagnostic. |
| Spanning `position-area` determines failure | Use explicit anchor-relative insets for bottom/start alignment, with an explicit opposite-side fallback. This still requires working anchor resolution. |
| Anchor list determines failure | Use a dedicated anchor-bearing reference/proxy without discarding existing anchor names; preserve the original reference’s geometry and lifecycle. |
| Native anchor behavior remains unreliable | Use viewport-coordinate placement from the reference rectangle, updated on captured scroll and relevant resize/layout changes. Clear native anchoring/fallback effects in that mode and handle clipped-anchor visibility separately. This is the broader fallback, not a proven requirement. |

The specification distinguishes anchor-based layout from scroll compensation, and permits explicit anchor-relative insets. That supports the proposed mechanism distinctions, not a claim about Chromium 141 implementation correctness. See [CSS Anchor Positioning](https://www.w3.org/TR/css-anchor-position-1/#scroll).

## The deciding probe row

Run **`D.initialization` on Chromium 141**, using fresh `buildScrolledDropdown` fixtures and the existing cascade. Preserve the current baseline exactly, including the trusted pre-show click. Run each variant under the candidate and `always` rules, with full clipping, partial clipping, and restoration.

Change one factor per variant:

| Variant | Runtime change | Deciding reading |
|---|---|---|
| `baseline` | None | Must reproduce `2 → 2`; otherwise the instrument missed the failure |
| `body` | After Dropdown construction, move only its retained menu to `body`, before `show()` | Correct initial gap and tracking isolates a DOM-location dependency |
| `display` | Keep ancestry; set menu `display:block` and force layout before `show()` | Repair isolates rendered-state/layout preparation |
| `noClick` | Omit only the trusted pre-show click | Repair isolates pre-show interaction/layout history |
| `entryFocus` | Keep baseline preparation; focus the menu entry after showing | Record geometry before and after focus to explain `V.focus` |
| `noFallback` | After showing, set `position-try-fallbacks:none` | Repair implicates fallback evaluation |
| `plainArea` | After showing, change only `position-area` to `bottom` | Repair implicates the spanning-area path; horizontal alignment will differ |
| `anchorInsets` | Disable area and fallbacks; use `top:anchor(bottom)` and `left:anchor(left)`, retaining the bottom gap | Success distinguishes area evaluation from general anchor resolution |
| `singleName` | Retain only the generated name on this disposable reference | A change implicates name-list handling; no change is expected when the reference already has only that name |
| `missingAnchor` | Point `position-anchor` at a nonexistent name | Negative control for whether the geometry instrument detects loss of anchoring |

Record the reference and overlay rectangles, scroller/document offsets, parent identity, inline styles, and computed position/insets/margins/anchor/area/fallback/display/overflow at every phase. Record hit testing and lifecycle fields as the existing row does.

For the unchanged bottom-start geometry, require `menu.top − reference.bottom = 2px`, then movement matching the actual reference movement. Also require the candidate to lose its hit target only when fully clipped, while `always` retains it. A passing hit test alone is insufficient: the existing control passes with the menu incorrectly at `top:2`.

Repeat the successful variant on Chromium 153 and exercise collision fallback before treating its corresponding fix as cross-build evidence.

## The unknowns

- The supplied logs do not identify the selected anchor, used fallback, computed placement declarations, or reference rectangles.
- `V.focus` does not reveal whether omitting the click, focusing the entry, incidental scrolling, or layout invalidation changes the result.
- No proposed repair was run on either browser during this read-only diagnosis; none is certified for both builds.
- The exact Chromium defect and shipping milestone remain for the independent research lane.
- Repository inspection confirmed `HEAD` at `094a71e` and no `src/browser` difference from `0865c67`. No files were changed.

DIAGNOSIS: Chromium 141 likely loses initial anchor geometry for the scroller-resident dropdown during placement initialization
