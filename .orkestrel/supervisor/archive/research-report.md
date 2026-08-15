# R-UX Research Report — Login and Live-List UX Constraints

## Login ergonomics

**1. WCAG 2.2 SC 3.3.8 Accessible Authentication (Minimum) — Level AA**

- The SC prohibits requiring "a cognitive function test (such as remembering a password or solving a puzzle) ... for any step in an authentication process" unless the step provides an alternative method, an assistive mechanism, or falls under the object-recognition / personal-content-recognition exceptions. Username+password itself is a cognitive function test (recall), so the SC's practical bite is on *how* that recall is supported, not on banning passwords. (https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html)
- Constraint: paste must work in both the username and password fields. Blocking paste (a legacy anti-phishing pattern) fails this SC because it forces manual transcription from a password manager. (https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html)
- Constraint: the form must not actively block browser/third-party password-manager autofill (e.g. via `autocomplete="off"`, JS that clears autofilled values, or field masking that defeats fill detection). (https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html)
- Inference: because ours is username+password with no puzzle/CAPTCHA/transcription step, SC 3.3.8 is satisfiable by (a) allowing paste and (b) correct `autocomplete` wiring below — it does not require redesigning the credential model.

**2. HTML `autocomplete` tokens for login (WHATWG primary source)**

- Verified fact: the token for the identifier field is `autocomplete="username"` — "A username," free-form text, no newlines. (https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
- Verified fact: the token for a login password field is `autocomplete="current-password"` — "The current password for the account identified by the username field (e.g. when logging in)," distinct from `new-password` used at signup/change. (https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
- Constraint: the password input must be `type="password"` for password-manager heuristics to engage correctly with the `current-password` token. (https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
- Constraint: both fields must sit inside one `<form>` so the user agent associates username and password as one credential pair for autofill/save prompts. (https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill)
- Inference: use `autocomplete="username"` (not `email`, since the identifier is a username) and `autocomplete="current-password"` (not the bare `password` legacy value) on the two inputs, in one `<form>`, to satisfy both SC 3.3.8's autofill requirement and password-manager reliability.

**3. Remembering the username — mixed sourcing, thin primary coverage**

- No dedicated NN/g (or other primary) article on username-persistence-in-localStorage was found by direct search of nngroup.com; adjacent NN/g articles surfaced instead ("Marking Required Fields," "Checklist for Registration and Login Forms on Mobile," "Login Walls Stop Users in Their Tracks," "Human Factors of Password Security"), none of which state a localStorage-vs-autofill-only recommendation. Say plainly: primary sources are thin here. (searched nngroup.com, no on-point result)
- Verified fact from the primary autofill spec: the browser-native mechanism for "remembering" the username is the `autocomplete="username"` token itself feeding the password manager's saved-credential store — this is the WHATWG-sanctioned mechanism, not an app-level cache. (https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill), secondary corroboration only (non-NN/g roundup) that browser/password-manager autofill is the standard mechanism, labelled secondary.
- Inference (not sourced to NN/g): given the "shared vs personal device" framing in the brief and the absence of primary guidance recommending an app-level non-secret cache, the defensible default is to rely on `autocomplete="username"` + browser autofill only, and not add a bespoke localStorage username cache, since no primary source found endorses that pattern's risk tradeoff for this context. Flag this as inference requiring a design decision, not a sourced constraint.

**4. Focus and error placement on small login forms**

- Verified fact (WAI-ARIA APG, keyboard interface guidance): auto-moving initial focus on page load is generally discouraged, with an explicit exception — "The page offers a single, primary function that nearly all users employ immediately after page load" — which a dedicated login page/form plausibly satisfies. (https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/)
- Verified fact (WAI tutorial on form notifications): "it is convenient to set the focus to the first `<input>` element that contains an error" after a failed submission. (https://www.w3.org/WAI/tutorials/forms/notifications/)
- Verified fact (WAI tutorial): each error message should "reference the label of the corresponding form control," give "a concise description of the error," and, for AJAX/dynamic error containers, use `role="alert"`. (https://www.w3.org/WAI/tutorials/forms/notifications/)
- Inference: since the server refuses login uniformly (no "wrong password" vs "wrong username" distinction, by design), the single error message cannot reference one specific control per WAI's normal per-field guidance; instead apply `role="alert"` to a single shared error region and move focus to the username field (not to the error text) on refusal, since WAI's generic "focus the first field with an error" rule doesn't cleanly map to a uniform-refusal design — labelled as adapted inference, not verbatim WAI guidance for this exact case.

## Live-updating lists

**5. ARIA for a live-updating list — Feed pattern does not apply**

- Verified fact (APG Feed pattern): the `feed`/`article` role pattern is built for content that "appears to scroll infinitely" and is explicitly a structure for infinite-scroll-style loading, using `aria-posinset`/`aria-setsize`/`aria-busy` to manage that scroll contract. (https://www.w3.org/WAI/ARIA/apg/patterns/feed/)
- Inference, directly answering the brief's question: a short operational list (bounded set of active workflows) is not the Feed pattern's target case; it is closer to a plain list with a live region than to infinite-scroll content, because there is no scroll-driven loading contract to maintain. Use `aria-live` on the list container instead. (https://www.w3.org/WAI/ARIA/apg/patterns/feed/)
- Verified fact (MDN): `aria-live="polite"` waits until the user is idle before announcing, versus `assertive` which interrupts immediately; `aria-relevant="additions removals"` scopes announcements to rows entering/leaving rather than every text mutation; `aria-atomic` controls whether the whole region or just the changed node is read. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)
- Constraint to avoid spam: set the live region up empty in the initial DOM before any dynamic content lands (MDN best practice), use `polite` not `assertive` for ordinary arrivals, and debounce/coalesce rapid consecutive updates rather than firing one announcement per row when several arrive together. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)

**6. Insertion UX for real-time lists**

- No NN/g article titled specifically for "real-time activity feed insertion" was reachable by direct search; the closest on-point primary material found was NN/g's scrolling/content-update guidance, used here as the nearest primary source, labelled as adjacent rather than exact-topic. (https://www.nngroup.com/articles/saving-scroll-position/, https://www.nngroup.com/articles/infinite-scrolling-tips/)
- Verified fact (NN/g, adjacent topic): "Never allow the page to scroll automatically when new content becomes available" at the top of a list — provide a notification and let the user choose to scroll, rather than yanking their viewport. (https://www.nngroup.com/articles/saving-scroll-position/) — directly answers "avoid yanking content out from under a pointer": do not auto-reflow/auto-scroll under an active pointer position; if new rows must insert above the fold, either queue-and-notify or use a stable insertion point that doesn't displace what the user is currently over.
- Verified fact (NN/g, same source): when content is highly time-sensitive, resetting scroll position to show the newest content is acceptable only "with a clear visual indicator to show that the content has changed." (https://www.nngroup.com/articles/saving-scroll-position/)
- Inference (not directly sourced): highlight-then-fade for new arrivals is a common convention but no primary source above specifies it; treat it as implementation-level polish, not a sourced requirement.
- Verified fact (`prefers-reduced-motion`, already fixed by the governing skill per the brief — not re-derived here): any highlight/fade/insertion animation must have a `prefers-reduced-motion` no-motion fallback; this is the skill's existing rule, restated only to flag it binds new-row highlighting too.

**7. Disappearance — primary sources are thin**

- No W3C/WHATWG/NN/g primary source was found directly addressing whether a completed/ended list row should be removed outright or marked-ended-in-place. Say plainly: primary sources are thin here.
- The nearest applicable primary constraint is the live-region `aria-relevant="removals"` mechanism (MDN, cited under Q5), which covers the accessibility announcement of a removal, but not the visual-design choice of remove-vs-decay. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions)
- Inference: whichever choice is made, if a row is removed while under the user's pointer/keyboard focus, apply the same "don't yank content out from under interaction" constraint from Q6 (NN/g, saving-scroll-position) — do not remove instantaneously if the user is mid-interaction with that row.

**8. Selection continuity**

- Verified fact: the APG listbox pattern explicitly distinguishes "DOM focus (the active element)" from "the selected state" as functionally distinct concepts implementers must track separately. (https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
- Verified gap: the APG listbox pattern acknowledges dynamic scenarios ("listboxes with accompanying toolbars where options can be added, moved, and removed") exist but does not specify what happens to selection/focus when a selected option is deleted or the list reorders. This is a named gap in the primary source, not an oversight in this research. (https://www.w3.org/WAI/ARIA/apg/patterns/listbox/)
- Inference, reasoned from the focus/selection distinction above: when the selected row's underlying item ends or the list reorders, keep the item logically "selected" and the detail pane showing its (now-final) state rather than silently clearing selection, and only move focus elsewhere if the DOM node itself is removed — because collapsing "selection" and "DOM presence" into one event contradicts the pattern's own focus/selection distinction. Labelled as reasoned extension of APG semantics, not verbatim guidance.

## Closing table

| Constraint | Binds |
|---|---|
| Paste must work in both username and password fields (SC 3.3.8) | login form |
| Do not block or defeat password-manager autofill (SC 3.3.8) | login form |
| `autocomplete="username"` on the identifier field | login form |
| `autocomplete="current-password"` (not `new-password`, not bare `password`) on the password field, `type="password"` | login form |
| Both inputs inside one `<form>` for autofill pairing | login form |
| No dedicated primary source endorses an app-level localStorage username cache; default to autofill-only unless a design decision overrides this | login form |
| Do not steal initial focus on load unless the page's single primary function is immediate use (login page plausibly qualifies) | login form |
| On uniform refusal, use one `role="alert"` shared error region; move focus to the username field | login form |
| Feed/article ARIA pattern does not apply to a bounded operational list — use plain list + `aria-live` instead | live list |
| `aria-live="polite"` + `aria-relevant="additions removals"` on the list container, region present empty before first update | live list |
| Debounce/coalesce rapid consecutive announcements rather than one per row | live list |
| Never auto-scroll the viewport when new rows arrive; notify-and-let-user-choose, or reset scroll only with a visible "content changed" indicator | live list |
| Do not remove/reflow a row the user is actively interacting with (pointer/keyboard) at the moment it changes | live list |
| Row removal vs. decay-in-place: primary sources thin — treat as open design decision | live list |
| `prefers-reduced-motion` fallback applies to new-row highlight/fade animations (skill's existing rule, restated for scope) | live list |
| Keep the row "selected" and its detail pane showing final state when the underlying item ends, unless the DOM node itself is removed | live list |
| Track selection state and DOM focus as distinct (APG listbox distinction) when list contents change dynamically | live list |
| SC 3.3.8 permits a username+password model as-is; it constrains *how* recall is supported, not the credential model | both |

## Fetch failures / thin coverage, named

- `https://www.nngroup.com/articles/remember-me/` returned 404; no equivalent NN/g URL was found by search. Answered from WHATWG spec + labelled inference instead (Q3).
- No NN/g (or other primary) source was found on-topic for real-time list row insertion/highlighting specifically; nearest primary (NN/g scroll-position/infinite-scroll articles) used as adjacent-topic substitute, labelled (Q6).
- No primary source found on row disappearance (remove vs. decay); said plainly as thin (Q7).
- APG listbox pattern has a named gap on selection continuity under dynamic list mutation; answered by reasoned extension of its stated focus/selection distinction, labelled as such (Q8).